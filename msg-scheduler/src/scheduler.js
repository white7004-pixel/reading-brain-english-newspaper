/**
 * 예약 실행기.
 *
 * 20초마다 한 번씩 깨어나 (1) 지금 보낼 예약, (2) 서버가 꺼져 있는 동안 놓친 예약,
 * (3) 실패해서 재시도 대기 중인 건을 처리한다.
 * 같은 분에 두 번 나가는 중복 발송은 minuteKey로 막는다.
 */

import { getChannel } from './channels/index.js';
import { parseCron, cronMatches, matchesBetween, nextRunAfter } from './cron.js';
import { minuteKey, formatInZone } from './time.js';

const TICK_MS = 20_000;
const RETRY_DELAYS_MS = [60_000, 5 * 60_000, 15 * 60_000];
/** 서버가 꺼져 있던 동안의 예약을 얼마나 거슬러 올라가 복구할지. */
const CATCHUP_WINDOW_MS = 2 * 60 * 60 * 1000;

export class Scheduler {
  constructor(store, { onEvent } = {}) {
    this.store = store;
    this.timer = null;
    this.running = false;
    this.onEvent = onEvent || (() => {});
  }

  start() {
    if (this.timer) return;
    this.tick().catch((err) => console.error('[scheduler] 첫 tick 실패:', err));
    this.timer = setInterval(() => {
      this.tick().catch((err) => console.error('[scheduler] tick 실패:', err));
    }, TICK_MS);
    this.timer.unref?.();
    console.log(`[scheduler] 시작 (${TICK_MS / 1000}초 주기, 타임존 ${this.timeZone})`);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  get timeZone() {
    return this.store.settings.timeZone || 'Asia/Seoul';
  }

  async tick(now = Date.now()) {
    if (this.running) return; // 발송이 느릴 때 tick이 겹치지 않게
    this.running = true;
    try {
      for (const job of [...this.store.jobs]) {
        try {
          await this.evaluateJob(job, now);
        } catch (err) {
          console.error(`[scheduler] 예약 "${job.name}" 평가 실패:`, err.message);
        }
      }
      await this.processRetries(now);
    } finally {
      this.running = false;
    }
  }

  async evaluateJob(job, now) {
    if (!job.enabled) return;
    const tz = job.timeZone || this.timeZone;
    const state = (job.state ||= {});

    if (job.schedule.type === 'once') {
      const runAt = job.schedule.runAtMs;
      if (now < runAt) return;
      const tooOld = now - runAt > CATCHUP_WINDOW_MS;
      if (tooOld && !state.lastRunMs) {
        this.store.updateJob(job.id, {
          enabled: false,
          state: { ...state, lastStatus: 'missed', lastRunMs: now },
        });
        this.store.addLog({
          jobId: job.id,
          jobName: job.name,
          channel: '-',
          status: 'missed',
          detail: `예정 시각(${formatInZone(runAt, tz)})이 복구 한도(${CATCHUP_WINDOW_MS / 3600000}시간)를 지나 발송하지 않았습니다.`,
        });
        return;
      }
      await this.runJob(job, { firedAtMs: runAt });
      this.store.updateJob(job.id, { enabled: false });
      return;
    }

    // cron
    const parsed = parseCron(job.schedule.cron);
    const currentKey = minuteKey(now, tz);

    // 서버가 멈춰 있던 구간에 지나간 실행 시각이 있으면 한 번 보충 발송한다.
    const since = state.lastCheckedMs || now - TICK_MS;
    const catchupFrom = Math.max(since, now - CATCHUP_WINDOW_MS);
    const missed = matchesBetween(parsed, catchupFrom, now - 60_000, tz);

    const dueNow = cronMatches(parsed, now, tz) && state.lastMinuteKey !== currentKey;
    const fireAt = missed.length ? missed[missed.length - 1] : dueNow ? now : null;

    if (fireAt === null) {
      this.store.updateJob(job.id, { state: { ...state, lastCheckedMs: now } });
      return;
    }

    const fireKey = minuteKey(fireAt, tz);
    if (state.lastMinuteKey === fireKey) {
      this.store.updateJob(job.id, { state: { ...state, lastCheckedMs: now } });
      return;
    }

    this.store.updateJob(job.id, { state: { ...state, lastMinuteKey: fireKey, lastCheckedMs: now } });
    await this.runJob(job, { firedAtMs: fireAt, catchUp: missed.length > 0 && !dueNow });
  }

  /** 예약 한 건을 모든 대상 채널로 발송한다. */
  async runJob(job, { firedAtMs = Date.now(), catchUp = false, manual = false } = {}) {
    const tz = job.timeZone || this.timeZone;
    const message = renderMessage(job.message, { tz, firedAtMs });
    const results = [];

    for (const [index, targetSpec] of job.targets.entries()) {
      const result = await this.deliver({ job, targetSpec, index, message, attempt: 1, manual, catchUp });
      results.push(result);
    }

    const anyFail = results.some((r) => !r.ok);
    this.store.updateJob(job.id, {
      state: {
        ...(job.state || {}),
        lastRunMs: Date.now(),
        lastStatus: anyFail ? 'partial' : 'sent',
        lastMessagePreview: message.slice(0, 80),
      },
    });
    this.onEvent({ type: 'job-run', jobId: job.id, results });
    return results;
  }

  /** 채널 한 곳으로 실제 전송. 실패하면 재시도 큐에 넣는다. */
  async deliver({ job, targetSpec, index, message, attempt, manual = false, catchUp = false }) {
    const channelKey = targetSpec.channel;
    const tags = [manual ? '수동' : null, catchUp ? '복구발송' : null, attempt > 1 ? `재시도 ${attempt - 1}회` : null]
      .filter(Boolean)
      .join(' · ');

    try {
      const channel = getChannel(channelKey);
      const config = { ...this.store.getChannelConfig(channelKey) };
      const { detail } = await channel.send({
        config,
        target: targetSpec.target || {},
        message,
        timeZone: job.timeZone || this.timeZone,
        saveConfig: (patch) => this.store.setChannelConfig(channelKey, patch),
      });
      this.store.addLog({
        jobId: job.id,
        jobName: job.name,
        channel: channelKey,
        status: 'sent',
        attempt,
        detail: [detail, tags].filter(Boolean).join(' | '),
        message: message.slice(0, 500),
      });
      return { ok: true, channel: channelKey, detail };
    } catch (err) {
      const willRetry = !manual && attempt <= RETRY_DELAYS_MS.length;
      this.store.addLog({
        jobId: job.id,
        jobName: job.name,
        channel: channelKey,
        status: willRetry ? 'retrying' : 'failed',
        attempt,
        detail: [err.message, tags].filter(Boolean).join(' | '),
        message: message.slice(0, 500),
      });
      if (willRetry) {
        this.store.addRetry({
          jobId: job.id,
          targetIndex: index,
          attempt: attempt + 1,
          message,
          nextAttemptMs: Date.now() + RETRY_DELAYS_MS[attempt - 1],
        });
      }
      this.onEvent({ type: 'job-error', jobId: job.id, channel: channelKey, error: err.message });
      return { ok: false, channel: channelKey, error: err.message };
    }
  }

  async processRetries(now) {
    for (const retry of [...this.store.retries]) {
      if (retry.nextAttemptMs > now) continue;
      this.store.removeRetry(retry.id);
      const job = this.store.getJob(retry.jobId);
      if (!job) continue;
      const targetSpec = job.targets[retry.targetIndex];
      if (!targetSpec) continue;
      await this.deliver({
        job,
        targetSpec,
        index: retry.targetIndex,
        message: retry.message,
        attempt: retry.attempt,
      });
    }
  }

  /** 예약의 다음 발송 예정 시각(ms). 없으면 null. */
  nextRunMs(job, now = Date.now()) {
    if (!job.enabled) return null;
    const tz = job.timeZone || this.timeZone;
    if (job.schedule.type === 'once') {
      return job.schedule.runAtMs > now ? job.schedule.runAtMs : null;
    }
    try {
      return nextRunAfter(parseCron(job.schedule.cron), now, tz);
    } catch {
      return null;
    }
  }
}

/**
 * 메시지 안의 치환자를 채운다.
 * {{date}} 2026-08-20 / {{time}} 09:30 / {{datetime}} / {{weekday}} 목
 */
export function renderMessage(template, { tz, firedAtMs = Date.now() } = {}) {
  const formatted = formatInZone(firedAtMs, tz);
  const [date, time] = formatted.split(' ');
  const weekday = new Intl.DateTimeFormat('ko-KR', { timeZone: tz, weekday: 'short' }).format(new Date(firedAtMs));
  return String(template)
    .replaceAll('{{date}}', date)
    .replaceAll('{{time}}', time)
    .replaceAll('{{datetime}}', formatted)
    .replaceAll('{{weekday}}', weekday);
}
