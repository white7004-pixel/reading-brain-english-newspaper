/**
 * 예약 메시지 발송기 - HTTP 서버.
 *
 * 외부 패키지 없이 Node 내장 http 모듈만 사용한다.
 *  - /            관리 화면 (public/)
 *  - /api/*       예약·설정·로그 REST API
 *  - /oauth/kakao 카카오 로그인 콜백 (토큰 자동 저장)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { Store } from './src/store.js';
import { Scheduler, renderMessage } from './src/scheduler.js';
import { channelCatalog, getChannel, CHANNEL_KEYS } from './src/channels/index.js';
import * as kakaotalk from './src/channels/kakaotalk.js';
import { parseCron, buildCron, describeCron, nextRunAfter } from './src/cron.js';
import { parseLocalDateTime, formatInZone, isValidTimeZone } from './src/time.js';
import { quickPresets, resolveQuickPreset, isQuietTime, nextMorning, titleFromMessage, dayLabel } from './src/quick.js';
import { loadDotEnv, seedChannelsFromEnv } from './src/env.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
loadDotEnv(ROOT);

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const APP_PASSWORD = process.env.APP_PASSWORD || '';

const store = new Store(DATA_DIR);
store.load();
seedChannelsFromEnv(store);

const scheduler = new Scheduler(store);
scheduler.start();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer(async (req, res) => {
  try {
    if (!authorized(req)) {
      res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm="msg-scheduler"',
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end('로그인이 필요합니다.');
      return;
    }
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    if (url.pathname.startsWith('/oauth/kakao')) return await handleKakaoOAuth(req, res, url);
    return serveStatic(req, res, url);
  } catch (err) {
    const status = Number(err.status) || 500;
    if (status >= 500) console.error('[server]', err);
    sendJson(res, status, { error: err.message || '서버 오류' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`예약 메시지 발송기: http://localhost:${PORT}`);
  console.log(`데이터 파일: ${path.join(DATA_DIR, 'db.json')}`);
  if (!APP_PASSWORD) console.log('경고: APP_PASSWORD 가 없어 접속 제한이 없습니다. 외부 공개 시 반드시 설정하세요.');
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`\n[${signal}] 종료합니다.`);
    scheduler.stop();
    store.saveSync();
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 2000).unref();
  });
}

// ---------------------------------------------------------------- 인증

function authorized(req) {
  if (!APP_PASSWORD) return true;
  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) return false;
  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const password = decoded.slice(decoded.indexOf(':') + 1);
  const a = Buffer.from(password);
  const b = Buffer.from(APP_PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------------------------------------------------------------- 정적 파일

function serveStatic(req, res, url) {
  const rel = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\/+/, '');
  const filePath = path.join(ROOT, 'public', rel);
  if (!filePath.startsWith(path.join(ROOT, 'public'))) {
    res.writeHead(403).end('forbidden');
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('찾을 수 없습니다.');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

// ---------------------------------------------------------------- API

async function handleApi(req, res, url) {
  const { pathname } = url;
  const method = req.method;
  const segments = pathname.split('/').filter(Boolean); // ['api', ...]

  if (pathname === '/api/health') return sendJson(res, 200, { ok: true, now: Date.now() });

  if (pathname === '/api/bootstrap' && method === 'GET') {
    return sendJson(res, 200, {
      timeZone: store.settings.timeZone,
      channels: channelCatalog(),
      channelConfigs: maskedConfigs(),
      jobs: store.jobs.map(decorateJob),
      logs: store.listLogs({ limit: 100 }),
      recipients: store.recipients,
      lastRecipientIds: store.settings.lastRecipientIds,
      presets: currentPresets(),
      dayHours: store.settings.dayHours,
      quietHours: store.settings.quietHours,
      passwordProtected: Boolean(APP_PASSWORD),
    });
  }

  if (pathname === '/api/jobs' && method === 'GET') {
    return sendJson(res, 200, store.jobs.map(decorateJob));
  }

  if (pathname === '/api/jobs' && method === 'POST') {
    const body = await readJson(req);
    const job = store.addJob(buildJobRecord(body));
    return sendJson(res, 201, decorateJob(job));
  }

  if (segments[1] === 'jobs' && segments[2]) {
    const id = segments[2];
    const job = store.getJob(id);
    if (!job) return sendJson(res, 404, { error: '예약을 찾을 수 없습니다.' });

    if (segments.length === 3 && method === 'PUT') {
      const body = await readJson(req);
      const updated = store.updateJob(id, { ...buildJobRecord(body, job), state: job.state || {} });
      return sendJson(res, 200, decorateJob(updated));
    }
    if (segments.length === 3 && method === 'DELETE') {
      store.removeJob(id);
      return sendJson(res, 200, { ok: true });
    }
    if (segments[3] === 'toggle' && method === 'POST') {
      const updated = store.updateJob(id, { enabled: !job.enabled });
      return sendJson(res, 200, decorateJob(updated));
    }
    if (segments[3] === 'run' && method === 'POST') {
      const results = await scheduler.runJob(job, { manual: true });
      return sendJson(res, 200, { results, logs: store.listLogs({ jobId: id, limit: 20 }) });
    }
    if (segments[3] === 'preview' && method === 'GET') {
      return sendJson(res, 200, {
        message: renderMessage(job.message, { tz: job.timeZone || store.settings.timeZone }),
      });
    }
  }

  // ---- 빠른 예약: 메시지만 쓰고 버튼 하나로 예약 ----

  if (pathname === '/api/quick/presets' && method === 'GET') {
    return sendJson(res, 200, { presets: currentPresets(), timeZone: store.settings.timeZone });
  }

  // 저장 전에 "이 시각이 새벽은 아닌지" 확인하고 아침 대안을 제안한다.
  if (pathname === '/api/quick/check' && method === 'POST') {
    const body = await readJson(req);
    const tz = store.settings.timeZone;
    let atMs;
    if (body.presetKey) {
      const preset = resolveQuickPreset(body.presetKey, Date.now(), tz, quickOptions());
      if (!preset) return sendJson(res, 400, { error: '이미 지난 시각입니다.' });
      atMs = preset.atMs;
    } else if (body.runAt) {
      atMs = parseLocalDateTime(body.runAt, tz);
    } else {
      return sendJson(res, 400, { error: '시각이 없습니다.' });
    }
    const quiet = isQuietTime(atMs, tz, store.settings.quietHours);
    const morningMs = nextMorning(atMs, tz, quickOptions());
    return sendJson(res, 200, {
      atMs,
      when: `${dayLabel(atMs, tz)} ${formatInZone(atMs, tz).slice(11)}`,
      past: atMs <= Date.now(),
      quiet,
      morning: {
        atMs: morningMs,
        runAt: formatInZone(morningMs, tz).replace(' ', 'T'),
        when: `${dayLabel(morningMs, tz)} ${formatInZone(morningMs, tz).slice(11)}`,
      },
    });
  }

  if (pathname === '/api/quick' && method === 'POST') {
    const body = await readJson(req);
    const message = String(body.message || '').trim();
    if (!message) throw new HttpError(400, '보낼 내용을 입력하세요.');

    const tz = store.settings.timeZone;
    let runAtMs;
    if (body.presetKey) {
      const preset = resolveQuickPreset(body.presetKey, Date.now(), tz, quickOptions());
      if (!preset) throw new HttpError(400, '이미 지난 시각입니다. 다른 시간을 골라주세요.');
      runAtMs = preset.atMs;
    } else if (body.runAt) {
      runAtMs = parseLocalDateTime(body.runAt, tz);
    } else {
      throw new HttpError(400, '보낼 시각을 골라주세요.');
    }
    if (runAtMs <= Date.now()) throw new HttpError(400, '이미 지난 시각입니다. 다른 시간을 골라주세요.');

    const targets = resolveTargets(body);
    if (!targets.length) throw new HttpError(400, '보낼 곳을 하나 이상 고르세요.');

    const job = store.addJob({
      name: String(body.name || '').trim() || titleFromMessage(message),
      message,
      timeZone: tz,
      targets,
      schedule: { type: 'once', runAt: formatInZone(runAtMs, tz).replace(' ', 'T'), runAtMs },
      enabled: true,
      state: {},
    });
    if (Array.isArray(body.recipientIds) && body.recipientIds.length) store.rememberRecipients(body.recipientIds);

    return sendJson(res, 201, {
      job: decorateJob(job),
      when: `${dayLabel(runAtMs, tz)} ${formatInZone(runAtMs, tz).slice(11)}`,
      quiet: isQuietTime(runAtMs, tz, store.settings.quietHours),
    });
  }

  // ---- 주소록: 자주 보내는 곳 ----

  if (pathname === '/api/recipients' && method === 'GET') {
    return sendJson(res, 200, store.recipients);
  }

  if (pathname === '/api/recipients' && method === 'POST') {
    const body = await readJson(req);
    const label = String(body.label || '').trim();
    if (!label) throw new HttpError(400, '받는 곳 이름을 입력하세요. (예: 김선생님, 학원 공지방)');
    if (!CHANNEL_KEYS.includes(body.channel)) throw new HttpError(400, `알 수 없는 채널: ${body.channel}`);
    return sendJson(res, 201, store.addRecipient({ label, channel: body.channel, target: body.target || {} }));
  }

  if (segments[1] === 'recipients' && segments[2]) {
    const id = segments[2];
    if (!store.getRecipient(id)) return sendJson(res, 404, { error: '받는 곳을 찾을 수 없습니다.' });
    if (method === 'PUT') {
      const body = await readJson(req);
      return sendJson(res, 200, store.updateRecipient(id, {
        label: String(body.label || '').trim() || undefined,
        channel: CHANNEL_KEYS.includes(body.channel) ? body.channel : undefined,
        target: body.target || undefined,
      }));
    }
    if (method === 'DELETE') {
      store.removeRecipient(id);
      return sendJson(res, 200, { ok: true });
    }
  }

  if (pathname === '/api/settings' && method === 'GET') {
    return sendJson(res, 200, { timeZone: store.settings.timeZone, channelConfigs: maskedConfigs() });
  }

  if (pathname === '/api/settings' && method === 'PUT') {
    const body = await readJson(req);
    if (body.timeZone && !isValidTimeZone(body.timeZone)) {
      return sendJson(res, 400, { error: `알 수 없는 타임존: ${body.timeZone}` });
    }
    store.updateSettings(body);
    return sendJson(res, 200, {
      timeZone: store.settings.timeZone,
      channelConfigs: maskedConfigs(),
      dayHours: store.settings.dayHours,
      quietHours: store.settings.quietHours,
      presets: currentPresets(),
    });
  }

  if (segments[1] === 'channels' && segments[2] && segments[3] === 'test' && method === 'POST') {
    const key = segments[2];
    if (!CHANNEL_KEYS.includes(key)) return sendJson(res, 404, { error: '알 수 없는 채널' });
    const body = await readJson(req);
    const message = renderMessage(body.message || '[테스트] 예약 메시지 발송기 연결 확인 {{datetime}}', {
      tz: store.settings.timeZone,
    });
    try {
      const { detail } = await getChannel(key).send({
        config: { ...store.getChannelConfig(key) },
        target: body.target || {},
        message,
        timeZone: store.settings.timeZone,
        saveConfig: (patch) => store.setChannelConfig(key, patch),
      });
      store.addLog({ jobId: null, jobName: '(연결 테스트)', channel: key, status: 'sent', detail, message });
      return sendJson(res, 200, { ok: true, detail });
    } catch (err) {
      store.addLog({ jobId: null, jobName: '(연결 테스트)', channel: key, status: 'failed', detail: err.message, message });
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  if (pathname === '/api/logs' && method === 'GET') {
    return sendJson(res, 200, store.listLogs({
      jobId: url.searchParams.get('jobId') || undefined,
      limit: Number(url.searchParams.get('limit') || 200),
    }));
  }

  if (pathname === '/api/logs' && method === 'DELETE') {
    store.clearLogs();
    return sendJson(res, 200, { ok: true });
  }

  if (pathname === '/api/cron/preview' && method === 'POST') {
    const body = await readJson(req);
    try {
      const expression = body.cron ? String(body.cron) : buildCron(body.preset || {});
      const parsed = parseCron(expression);
      const tz = body.timeZone || store.settings.timeZone;
      const upcoming = [];
      let cursor = Date.now();
      for (let i = 0; i < 5; i += 1) {
        cursor = nextRunAfter(parsed, cursor, tz);
        if (!cursor) break;
        upcoming.push(formatInZone(cursor, tz));
      }
      return sendJson(res, 200, { cron: expression, description: describeCron(expression), upcoming });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  return sendJson(res, 404, { error: `경로를 찾을 수 없습니다: ${method} ${pathname}` });
}

// ---------------------------------------------------------------- 카카오 OAuth

async function handleKakaoOAuth(req, res, url) {
  const config = store.getChannelConfig('kakaotalk');
  if (url.pathname === '/oauth/kakao/start') {
    const scope = url.searchParams.get('scope') || 'talk_message';
    try {
      res.writeHead(302, { Location: kakaotalk.authorizeUrl(config, scope) }).end();
    } catch (err) {
      sendHtml(res, 400, '카카오 인증 시작 실패', err.message);
    }
    return;
  }

  if (url.pathname === '/oauth/kakao/callback') {
    const error = url.searchParams.get('error');
    if (error) {
      return sendHtml(res, 400, '카카오 인증이 취소되었습니다', `${error}: ${url.searchParams.get('error_description') || ''}`);
    }
    const code = url.searchParams.get('code');
    if (!code) return sendHtml(res, 400, '인증 코드가 없습니다', 'code 파라미터를 찾지 못했습니다.');
    try {
      const patch = await kakaotalk.exchangeCode({ config, code });
      store.setChannelConfig('kakaotalk', patch);
      return sendHtml(res, 200, '카카오톡 연결 완료', '토큰이 저장되었습니다. 이 창을 닫고 관리 화면으로 돌아가세요.');
    } catch (err) {
      return sendHtml(res, 400, '토큰 발급 실패', err.message);
    }
  }

  sendHtml(res, 404, '없는 경로', url.pathname);
}

// ---------------------------------------------------------------- 검증/변환

function quickOptions() {
  return { dayHours: store.settings.dayHours, quietHours: store.settings.quietHours };
}

function currentPresets() {
  return quickPresets(Date.now(), store.settings.timeZone, quickOptions());
}

/** 주소록에서 고른 것과 직접 입력한 대상을 하나의 targets 배열로 합친다. */
function resolveTargets(body) {
  const targets = [];
  for (const id of body.recipientIds || []) {
    const recipient = store.getRecipient(id);
    if (!recipient) throw new HttpError(400, `받는 곳을 찾을 수 없습니다: ${id}`);
    targets.push({ channel: recipient.channel, target: recipient.target || {}, recipientId: recipient.id });
  }
  for (const t of body.targets || []) {
    if (!CHANNEL_KEYS.includes(t.channel)) throw new HttpError(400, `알 수 없는 채널: ${t.channel}`);
    targets.push({ channel: t.channel, target: t.target || {} });
  }
  return targets;
}

function buildJobRecord(body, existing = null) {
  const message = String(body.message || '').trim();
  if (!message) throw new HttpError(400, '보낼 메시지를 입력하세요.');
  // 새벽에 이름까지 짓게 하지 않는다. 비워두면 첫 줄에서 만든다.
  const name = String(body.name || '').trim() || titleFromMessage(message);

  const timeZone = body.timeZone || existing?.timeZone || store.settings.timeZone;
  if (!isValidTimeZone(timeZone)) throw new HttpError(400, `알 수 없는 타임존: ${timeZone}`);

  const targets = resolveTargets(body);
  if (!targets.length) throw new HttpError(400, '보낼 곳을 하나 이상 선택하세요.');

  const schedule = buildSchedule(body.schedule || {}, timeZone);

  return {
    name,
    message,
    timeZone,
    targets,
    schedule,
    enabled: body.enabled !== false,
    state: existing?.state || {},
  };
}

function buildSchedule(schedule, timeZone) {
  if (schedule.type === 'once') {
    if (!schedule.runAt) throw new HttpError(400, '발송 일시를 입력하세요.');
    const runAtMs = parseLocalDateTime(schedule.runAt, timeZone);
    return { type: 'once', runAt: schedule.runAt, runAtMs };
  }

  if (schedule.type === 'cron') {
    let expression = schedule.cron;
    if (!expression && schedule.preset) expression = buildCron(schedule.preset);
    if (!expression) throw new HttpError(400, '반복 조건을 지정하세요.');
    try {
      parseCron(expression);
    } catch (err) {
      throw new HttpError(400, err.message);
    }
    return { type: 'cron', cron: expression, preset: schedule.preset || null };
  }

  throw new HttpError(400, `알 수 없는 예약 유형: ${schedule.type}`);
}

function decorateJob(job) {
  const tz = job.timeZone || store.settings.timeZone;
  const nextMs = scheduler.nextRunMs(job);
  return {
    ...job,
    description:
      job.schedule.type === 'once'
        ? `1회 · ${dayLabel(job.schedule.runAtMs, tz)} ${formatInZone(job.schedule.runAtMs, tz).slice(11)}`
        : safeDescribe(job.schedule.cron),
    nextRunMs: nextMs,
    nextRunText: nextMs ? formatInZone(nextMs, tz) : null,
    nextRunWhen: nextMs ? `${dayLabel(nextMs, tz)} ${formatInZone(nextMs, tz).slice(11)}` : null,
  };
}

function safeDescribe(expression) {
  try {
    return `반복 · ${describeCron(expression)}`;
  } catch {
    return `반복 · ${expression}`;
  }
}

/** 비밀값은 내려보내지 않고 "설정됨" 여부만 알려준다. */
function maskedConfigs() {
  const out = {};
  for (const meta of channelCatalog()) {
    const config = store.getChannelConfig(meta.key);
    const masked = {};
    const secretsSet = {};
    for (const field of meta.fields) {
      const value = config[field.key];
      if (field.secret) {
        secretsSet[field.key] = Boolean(value);
        masked[field.key] = '';
      } else {
        masked[field.key] = value ?? field.default ?? '';
      }
    }
    out[meta.key] = { values: masked, secretsSet, configured: isConfigured(meta, config) };
  }
  return out;
}

function isConfigured(meta, config) {
  switch (meta.key) {
    case 'slack':
      return Boolean(config.webhookUrl || config.botToken);
    case 'kakaotalk':
      return Boolean(config.accessToken || config.refreshToken);
    case 'kakaowork':
      return Boolean(config.appKey);
    case 'sms':
      return Boolean(config.apiKey && config.apiSecret && config.from);
    case 'webhook':
      return Boolean(config.url);
    default:
      return false;
  }
}

// ---------------------------------------------------------------- 응답 도우미

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) throw new HttpError(413, '요청 본문이 너무 큽니다.');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new HttpError(400, '본문이 올바른 JSON이 아닙니다.');
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

function sendHtml(res, status, title, detail) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<body style="font-family:system-ui;padding:40px;line-height:1.6">
<h1>${escapeHtml(title)}</h1><p>${escapeHtml(detail)}</p><p><a href="/">관리 화면으로</a></p></body>`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

process.on('unhandledRejection', (err) => console.error('[unhandledRejection]', err));

export { server, store, scheduler, HttpError };
