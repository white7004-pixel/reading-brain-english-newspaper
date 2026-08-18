/** 의존성 없는 단위 테스트. 실행: npm test */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { parseCron, cronMatches, nextRunAfter, matchesBetween, buildCron, describeCron } from '../src/cron.js';
import { parseLocalDateTime, formatInZone, minuteKey, partsInZone, isValidTimeZone } from '../src/time.js';
import { chunkText, smsByteLength } from '../src/channels/http.js';
import { renderMessage, Scheduler } from '../src/scheduler.js';
import { quickPresets, resolveQuickPreset, isQuietTime, nextMorning, titleFromMessage, hourLabel, dayLabel } from '../src/quick.js';
import { Store } from '../src/store.js';

const KST = 'Asia/Seoul';

test('타임존: KST 벽시계 시각을 UTC로 정확히 변환한다', () => {
  const ms = parseLocalDateTime('2026-08-20T09:30', KST);
  assert.equal(new Date(ms).toISOString(), '2026-08-20T00:30:00.000Z');
  assert.equal(formatInZone(ms, KST), '2026-08-20 09:30');
  assert.equal(minuteKey(ms, KST), '2026-08-20T09:30');
});

test('타임존: 서머타임이 있는 지역도 벽시계 기준으로 계산한다', () => {
  const summer = parseLocalDateTime('2026-07-01T12:00', 'America/New_York');
  const winter = parseLocalDateTime('2026-01-01T12:00', 'America/New_York');
  assert.equal(new Date(summer).toISOString(), '2026-07-01T16:00:00.000Z'); // EDT (UTC-4)
  assert.equal(new Date(winter).toISOString(), '2026-01-01T17:00:00.000Z'); // EST (UTC-5)
});

test('타임존: 잘못된 이름을 걸러낸다', () => {
  assert.equal(isValidTimeZone('Asia/Seoul'), true);
  assert.equal(isValidTimeZone('Mars/Olympus'), false);
});

test('cron: 기본 필드를 파싱한다', () => {
  const parsed = parseCron('30 9 * * 1-5');
  assert.deepEqual([...parsed.minute], [30]);
  assert.deepEqual([...parsed.hour], [9]);
  assert.deepEqual([...parsed.dow], [1, 2, 3, 4, 5]);
  assert.equal(parsed.dowRestricted, true);
  assert.equal(parsed.domRestricted, false);
});

test('cron: 증분·목록·이름 표기를 지원한다', () => {
  assert.deepEqual([...parseCron('*/15 * * * *').minute], [0, 15, 30, 45]);
  assert.deepEqual([...parseCron('0 9,18 * * *').hour], [9, 18]);
  assert.deepEqual([...parseCron('0 9 * * MON,WED').dow], [1, 3]);
  assert.deepEqual([...parseCron('0 9 1 JAN *').month], [1]);
  assert.deepEqual([...parseCron('0 9 * * 7').dow], [0]); // 7도 일요일
});

test('cron: 잘못된 식은 예외를 던진다', () => {
  assert.throws(() => parseCron('0 9 * *'), /5개 필드/);
  assert.throws(() => parseCron('99 9 * * *'), /범위/);
  assert.throws(() => parseCron('0 9 * * 9'), /범위/);
});

test('cron: 평일 09:30 조건을 정확히 판정한다', () => {
  const parsed = parseCron('30 9 * * 1-5');
  const monday = parseLocalDateTime('2026-08-17T09:30', KST);
  const sunday = parseLocalDateTime('2026-08-16T09:30', KST);
  const wrongTime = parseLocalDateTime('2026-08-17T09:31', KST);
  assert.equal(cronMatches(parsed, monday, KST), true);
  assert.equal(cronMatches(parsed, sunday, KST), false);
  assert.equal(cronMatches(parsed, wrongTime, KST), false);
});

test('cron: 일/요일이 모두 지정되면 OR로 판정한다 (cron 표준)', () => {
  const parsed = parseCron('0 9 1 * 0');
  const firstDay = parseLocalDateTime('2026-09-01T09:00', KST); // 화요일 1일
  const sunday = parseLocalDateTime('2026-09-06T09:00', KST); // 일요일 6일
  const neither = parseLocalDateTime('2026-09-02T09:00', KST);
  assert.equal(cronMatches(parsed, firstDay, KST), true);
  assert.equal(cronMatches(parsed, sunday, KST), true);
  assert.equal(cronMatches(parsed, neither, KST), false);
});

test('cron: 다음 실행 시각을 찾는다', () => {
  const parsed = parseCron('0 8 * * *');
  const from = parseLocalDateTime('2026-08-18T09:00', KST);
  assert.equal(formatInZone(nextRunAfter(parsed, from, KST), KST), '2026-08-19 08:00');
});

test('cron: 서버가 꺼져 있던 구간의 놓친 실행을 찾아낸다', () => {
  const parsed = parseCron('0 * * * *');
  const from = parseLocalDateTime('2026-08-18T08:30', KST);
  const to = parseLocalDateTime('2026-08-18T11:10', KST);
  const missed = matchesBetween(parsed, from, to, KST).map((ms) => formatInZone(ms, KST));
  assert.deepEqual(missed, ['2026-08-18 09:00', '2026-08-18 10:00', '2026-08-18 11:00']);
});

test('간편 설정이 올바른 cron으로 변환된다', () => {
  assert.equal(buildCron({ repeat: 'daily', hour: 8, minute: 0 }), '0 8 * * *');
  assert.equal(buildCron({ repeat: 'weekday', hour: 9, minute: 30 }), '30 9 * * 1-5');
  assert.equal(buildCron({ repeat: 'weekly', hour: 19, minute: 5, weekdays: [4, 2] }), '5 19 * * 2,4');
  assert.equal(buildCron({ repeat: 'monthly', hour: 10, minute: 0, day: 25 }), '0 10 25 * *');
  assert.throws(() => buildCron({ repeat: 'weekly', hour: 9, minute: 0, weekdays: [] }), /요일/);
  assert.throws(() => buildCron({ repeat: 'daily', hour: 25, minute: 0 }), /시\(hour\)/);
});

test('cron 설명이 한국어로 나온다', () => {
  assert.equal(describeCron('30 9 * * 1-5'), '평일(월~금) 09시 30분');
  assert.equal(describeCron('0 8 * * *'), '매일 08시 00분');
  assert.equal(describeCron('0 9 1 * *'), '매월 1일 09시 00분');
});

test('메시지 치환자가 채워진다', () => {
  const ms = parseLocalDateTime('2026-08-20T09:30', KST);
  const out = renderMessage('{{date}} ({{weekday}}) {{time}} / {{datetime}}', { tz: KST, firedAtMs: ms });
  assert.equal(out, '2026-08-20 (목) 09:30 / 2026-08-20 09:30');
});

test('SMS 바이트 계산과 긴 글 분할', () => {
  assert.equal(smsByteLength('abc'), 3);
  assert.equal(smsByteLength('가나다'), 6);
  const chunks = chunkText('가'.repeat(500), 190);
  assert.equal(chunks.length, 3);
  assert.equal(chunks.join('').length, 500);
});

test('저장소: 저장 후 다시 읽어도 데이터가 유지된다', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msgsched-'));
  const store = new Store(dir);
  store.load();
  const job = store.addJob({ name: '테스트', message: '안녕', targets: [], schedule: { type: 'cron', cron: '0 9 * * *' }, enabled: true });
  store.addLog({ jobId: job.id, jobName: '테스트', channel: 'slack', status: 'sent', detail: 'ok' });
  store.saveSync();

  const reopened = new Store(dir);
  reopened.load();
  assert.equal(reopened.jobs.length, 1);
  assert.equal(reopened.jobs[0].name, '테스트');
  assert.equal(reopened.listLogs().length, 1);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('저장소: 빈 문자열로 들어온 비밀값은 기존 값을 덮어쓰지 않는다', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msgsched-'));
  const store = new Store(dir);
  store.load();
  store.updateSettings({ channels: { slack: { webhookUrl: 'https://hooks.example/aaa', defaultChannel: '#a' } } });
  store.updateSettings({ channels: { slack: { webhookUrl: '', defaultChannel: '#b' } } });
  assert.equal(store.getChannelConfig('slack').webhookUrl, 'https://hooks.example/aaa');
  assert.equal(store.getChannelConfig('slack').defaultChannel, '#b');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('스케줄러: 1회 예약은 시간이 지나면 발송되고 자동으로 꺼진다', async () => {
  const { dir, store, scheduler, received, server } = await withMockChannel();
  const runAt = Date.now() - 5_000;
  const job = store.addJob({
    name: '1회 발송',
    message: '한 번만 보냅니다',
    targets: [{ channel: 'webhook', target: {} }],
    schedule: { type: 'once', runAtMs: runAt },
    enabled: true,
    state: {},
  });

  await scheduler.tick();
  assert.equal(received.length, 1);
  assert.equal(received[0].text, '한 번만 보냅니다');
  assert.equal(store.getJob(job.id).enabled, false);

  await scheduler.tick(); // 두 번 나가면 안 된다
  assert.equal(received.length, 1);
  await cleanup(dir, server, store);
});

test('스케줄러: 예정 시각을 한참 지난 1회 예약은 발송하지 않고 누락으로 남긴다', async () => {
  const { dir, store, scheduler, received, server } = await withMockChannel();
  const job = store.addJob({
    name: '오래된 예약',
    message: '지각',
    targets: [{ channel: 'webhook', target: {} }],
    schedule: { type: 'once', runAtMs: Date.now() - 5 * 60 * 60 * 1000 },
    enabled: true,
    state: {},
  });

  await scheduler.tick();
  assert.equal(received.length, 0);
  assert.equal(store.getJob(job.id).enabled, false);
  assert.equal(store.getJob(job.id).state.lastStatus, 'missed');
  await cleanup(dir, server, store);
});

test('스케줄러: 반복 예약은 같은 분에 두 번 나가지 않는다', async () => {
  const { dir, store, scheduler, received, server } = await withMockChannel();
  const now = Date.now();
  const p = partsInZone(now, KST);
  store.addJob({
    name: '매분 발송',
    message: '{{time}} 알림',
    targets: [{ channel: 'webhook', target: {} }],
    schedule: { type: 'cron', cron: `${p.minute} ${p.hour} * * *` },
    enabled: true,
    state: { lastCheckedMs: now },
  });

  await scheduler.tick(now);
  await scheduler.tick(now + 1000);
  await scheduler.tick(now + 2000);
  assert.equal(received.length, 1);
  await cleanup(dir, server, store);
});

test('스케줄러: 전송 실패하면 재시도 큐에 쌓인다', async () => {
  const { dir, store, scheduler, server } = await withMockChannel({ fail: true });
  store.addJob({
    name: '실패 예약',
    message: '실패할 메시지',
    targets: [{ channel: 'webhook', target: {} }],
    schedule: { type: 'once', runAtMs: Date.now() - 1000 },
    enabled: true,
    state: {},
  });

  await scheduler.tick();
  assert.equal(store.retries.length, 1);
  assert.equal(store.listLogs()[0].status, 'retrying');
  await cleanup(dir, server, store);
});

// ---- 빠른 예약 ----

test('빠른 예약: 새벽 3시40분에는 몇 시간 뒤인 "오늘 오전 9시"가 후보로 뜬다', () => {
  const dawn = parseLocalDateTime('2026-08-19T03:40', KST);
  const presets = quickPresets(dawn, KST);
  const today9 = presets.find((p) => p.key === 'today-morning');
  assert.ok(today9, '오늘 오전 9시 후보가 있어야 한다');
  assert.equal(today9.at, '2026-08-19 09:00');
  assert.equal(today9.quiet, false);
  assert.equal(today9.when, '8/19(수)');
  assert.equal(today9.whenFull, '8/19(수) 09:00', '확인 버튼에는 시각이 보여야 한다');
});

test('빠른 예약: 이미 지난 시각은 후보에서 빠진다', () => {
  const evening = parseLocalDateTime('2026-08-18T20:00', KST);
  const keys = quickPresets(evening, KST).map((p) => p.key);
  assert.ok(!keys.includes('today-morning'), '지난 오전은 빠져야 한다');
  assert.ok(!keys.includes('today-evening'), '지난 저녁은 빠져야 한다');
  assert.ok(keys.includes('tomorrow-morning'));
});

test('빠른 예약: 새벽에 걸리는 후보는 심야로 표시된다', () => {
  const dawn = parseLocalDateTime('2026-08-19T03:40', KST);
  const inOneHour = quickPresets(dawn, KST).find((p) => p.key === 'in-1h');
  assert.equal(inOneHour.quiet, true);
  assert.equal(inOneHour.at, '2026-08-19 04:40');
});

test('빠른 예약: N시간 뒤는 5분 단위로 정렬된다', () => {
  const now = parseLocalDateTime('2026-08-18T14:03', KST);
  const inThree = quickPresets(now, KST).find((p) => p.key === 'in-3h');
  assert.equal(inThree.at, '2026-08-18 17:05');
});

test('빠른 예약: 다음 월요일은 오늘이 월요일이면 일주일 뒤다', () => {
  const monday = parseLocalDateTime('2026-08-17T10:00', KST);
  const next = quickPresets(monday, KST).find((p) => p.key === 'monday-morning');
  assert.equal(next.at, '2026-08-24 09:00');
});

test('빠른 예약: 프리셋 키를 시각으로 되돌린다', () => {
  const now = parseLocalDateTime('2026-08-18T14:00', KST);
  assert.equal(resolveQuickPreset('tomorrow-morning', now, KST).at, '2026-08-19 09:00');
  assert.equal(resolveQuickPreset('today-morning', now, KST), null); // 이미 지난 키
});

test('심야 판정: 자정을 넘는 구간(22시~7시)을 올바르게 다룬다', () => {
  const at = (v) => parseLocalDateTime(v, KST);
  assert.equal(isQuietTime(at('2026-08-18T23:30'), KST), true);
  assert.equal(isQuietTime(at('2026-08-19T03:00'), KST), true);
  assert.equal(isQuietTime(at('2026-08-19T06:59'), KST), true);
  assert.equal(isQuietTime(at('2026-08-19T07:00'), KST), false);
  assert.equal(isQuietTime(at('2026-08-19T21:59'), KST), false);
});

test('심야 대안: 새벽이면 그날 아침, 밤이면 다음 날 아침을 제안한다', () => {
  const dawn = parseLocalDateTime('2026-08-19T03:40', KST);
  const night = parseLocalDateTime('2026-08-18T23:30', KST);
  assert.equal(formatInZone(nextMorning(dawn, KST), KST), '2026-08-19 09:00');
  assert.equal(formatInZone(nextMorning(night, KST), KST), '2026-08-19 09:00');
});

test('예약 이름은 메시지 첫 줄에서 자동으로 만들어진다', () => {
  assert.equal(titleFromMessage('교재 주문 확인 부탁'), '교재 주문 확인 부탁');
  assert.equal(titleFromMessage('첫 줄입니다\n둘째 줄'), '첫 줄입니다');
  assert.equal(titleFromMessage('가'.repeat(40)).length, 25); // 24자 + 말줄임표
  assert.equal(titleFromMessage('   '), '메모');
});

test('시각 라벨이 오전/오후로 읽힌다', () => {
  assert.equal(hourLabel(9), '오전 9시');
  assert.equal(hourLabel(12), '낮 12시');
  assert.equal(hourLabel(19), '오후 7시');
  assert.equal(dayLabel(parseLocalDateTime('2026-08-19T09:00', KST), KST), '8/19(수)');
});

test('주소록: 추가·수정·삭제가 저장된다', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msgsched-'));
  const store = new Store(dir);
  store.load();
  const recipient = store.addRecipient({ label: '김선생님', channel: 'sms', target: { to: '01012345678' } });
  store.rememberRecipients([recipient.id]);
  store.updateRecipient(recipient.id, { label: '김선생님(담임)' });
  store.saveSync();

  const reopened = new Store(dir);
  reopened.load();
  assert.equal(reopened.recipients[0].label, '김선생님(담임)');
  assert.deepEqual(reopened.settings.lastRecipientIds, [recipient.id]);

  reopened.removeRecipient(recipient.id);
  assert.equal(reopened.recipients.length, 0);
  assert.deepEqual(reopened.settings.lastRecipientIds, [], '삭제하면 최근 목록에서도 빠져야 한다');
  fs.rmSync(dir, { recursive: true, force: true });
});

// ---- 텔레그램 ----

test('텔레그램: 봇 API 형식으로 메시지를 보낸다', async () => {
  const { server, base, calls } = await mockTelegram();
  const telegram = await import('../src/channels/telegram.js');
  const result = await telegram.send({
    config: { botToken: 'TOKEN', apiBase: base },
    target: { chatId: '12345' },
    message: '안녕하세요',
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].path, '/botTOKEN/sendMessage');
  assert.deepEqual(calls[0].body, { chat_id: '12345', text: '안녕하세요' });
  assert.match(result.detail, /12345/);
  await new Promise((r) => server.close(r));
});

test('텔레그램: 4000자를 넘으면 나눠 보낸다', async () => {
  const { server, base, calls } = await mockTelegram();
  const telegram = await import('../src/channels/telegram.js');
  await telegram.send({
    config: { botToken: 'TOKEN', defaultChatId: '77', apiBase: base },
    message: '가'.repeat(9000),
  });
  assert.equal(calls.length, 3);
  assert.match(calls[0].body.text, /\(1\/3\)$/);
  assert.equal(calls[0].body.chat_id, '77', '대상을 안 주면 기본 chat_id를 쓴다');
  await new Promise((r) => server.close(r));
});

test('텔레그램: 대화방 목록을 getUpdates에서 중복 없이 뽑는다', async () => {
  const updates = [
    { message: { chat: { id: 111, type: 'private', first_name: '김', last_name: '선생' } } },
    { message: { chat: { id: 111, type: 'private', first_name: '김', last_name: '선생' } } },
    { message: { chat: { id: -100200, type: 'group', title: '학원 공지방' } } },
  ];
  const { server, base } = await mockTelegram({ updates });
  const telegram = await import('../src/channels/telegram.js');
  const chats = await telegram.listChats({ config: { botToken: 'TOKEN', apiBase: base } });
  assert.equal(chats.length, 2);
  assert.deepEqual(chats[0], { id: 111, name: '김 선생', type: 'private' });
  assert.deepEqual(chats[1], { id: -100200, name: '학원 공지방', type: 'group' });
  await new Promise((r) => server.close(r));
});

async function mockTelegram({ updates = [] } = {}) {
  const http = await import('node:http');
  const calls = [];
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      if (req.url.includes('/getUpdates')) {
        res.end(JSON.stringify({ ok: true, result: updates }));
        return;
      }
      calls.push({ path: req.url, body: body ? JSON.parse(body) : null });
      res.end(JSON.stringify({ ok: true, result: { message_id: calls.length } }));
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}`, calls };
}

// ---- LINE ----

test('LINE: push 형식으로 메시지를 보낸다', async () => {
  const { server, base, calls } = await mockLine();
  const line = await import('../src/channels/line.js');
  const result = await line.send({
    config: { channelAccessToken: 'TOKEN', apiBase: base },
    target: { to: 'U123' },
    message: '안녕하세요',
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].path, '/v2/bot/message/push');
  assert.equal(calls[0].auth, 'Bearer TOKEN');
  assert.deepEqual(calls[0].body, { to: 'U123', messages: [{ type: 'text', text: '안녕하세요' }] });
  assert.match(result.detail, /U123/);
  await new Promise((r) => server.close(r));
});

test('LINE: broadcast 모드는 to 없이 전체 발송 주소로 보낸다', async () => {
  const { server, base, calls } = await mockLine();
  const line = await import('../src/channels/line.js');
  const result = await line.send({
    config: { channelAccessToken: 'TOKEN', apiBase: base },
    target: { mode: 'broadcast' },
    message: '전체 공지',
  });
  assert.equal(calls[0].path, '/v2/bot/message/broadcast');
  assert.equal(calls[0].body.to, undefined);
  assert.match(result.detail, /broadcast/);
  await new Promise((r) => server.close(r));
});

test('LINE: 긴 글은 나누고 요청당 5개 제한을 지킨다', async () => {
  const { server, base, calls } = await mockLine();
  const line = await import('../src/channels/line.js');
  // 4900자 기준 7조각 → 5개 + 2개, 두 번의 요청
  await line.send({
    config: { channelAccessToken: 'TOKEN', defaultTo: 'U9', apiBase: base },
    message: '가'.repeat(4900 * 6 + 100),
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].body.messages.length, 5);
  assert.equal(calls[1].body.messages.length, 2);
  assert.match(calls[0].body.messages[0].text, /\(1\/7\)$/);
  await new Promise((r) => server.close(r));
});

test('LINE: 웹훅 서명을 검증한다', async () => {
  const line = await import('../src/channels/line.js');
  const crypto = await import('node:crypto');
  const body = JSON.stringify({ events: [] });
  const good = crypto.createHmac('sha256', 'SECRET').update(body).digest('base64');
  assert.equal(line.verifySignature(body, good, 'SECRET'), true);
  assert.equal(line.verifySignature(body, good, 'WRONG'), false);
  assert.equal(line.verifySignature(body, 'bogus', 'SECRET'), false);
  assert.equal(line.verifySignature(body, good, ''), false, '시크릿 미설정이면 거절');
});

test('LINE: 웹훅 이벤트에서 발신원을 뽑고 중복 없이 합친다', async () => {
  const line = await import('../src/channels/line.js');
  const events = [
    { source: { type: 'user', userId: 'U1' } },
    { source: { type: 'group', groupId: 'C1', userId: 'U2' } },
    { source: { type: 'user', userId: 'U1' } },
    { type: 'unfollow' }, // source 없는 이벤트는 무시
  ];
  const sources = line.extractSources(events);
  assert.deepEqual(sources.map((s) => s.id), ['U1', 'C1', 'U1']);

  const merged = line.mergeSources(
    [{ id: 'U1', type: 'user', name: '기존' }],
    [{ id: 'U1', type: 'user', name: '새값' }, { id: 'C1', type: 'group', name: '(그룹)' }],
  );
  assert.equal(merged.length, 2);
  assert.equal(merged.find((s) => s.id === 'U1').name, '새값', '새로 들어온 값이 우선');
});

async function mockLine() {
  const http = await import('node:http');
  const calls = [];
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      calls.push({ path: req.url, auth: req.headers.authorization, body: body ? JSON.parse(body) : null });
      res.writeHead(200, { 'Content-Type': 'application/json' }).end('{}');
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}`, calls };
}

// ---- 테스트용 로컬 수신 서버 (웹훅 채널을 그대로 쓴다) ----

async function withMockChannel({ fail = false } = {}) {
  const http = await import('node:http');
  const received = [];
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      if (fail) {
        res.writeHead(500).end('boom');
        return;
      }
      received.push(JSON.parse(body));
      res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msgsched-'));
  const store = new Store(dir);
  store.load();
  store.setChannelConfig('webhook', { url: `http://127.0.0.1:${port}/hook`, bodyTemplate: '{"text":"{{message}}"}' });
  const scheduler = new Scheduler(store);
  return { dir, store, scheduler, received, server };
}

async function cleanup(dir, server, store) {
  if (server) await new Promise((resolve) => server.close(resolve));
  await store?.writing; // 비동기 저장이 끝난 뒤 지워야 경고가 안 뜬다
  fs.rmSync(dir, { recursive: true, force: true });
}
