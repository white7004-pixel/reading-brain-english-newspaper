// 에듀냅이 서명해 보낸 학원 토큰을 받아들인다.
// 서명 방식은 에듀냅(blog-cloud lib/auth.js)과 **글자 하나까지 같아야** 한다.
// 그래서 이 검사는 에듀냅 쪽 코드를 그대로 베껴 만든 토큰으로 확인한다.
import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { verifyAcademyToken } from '../lib/edunap.js';
import { makeHandler } from '../lib/http.js';

// ── 에듀냅 blog-cloud lib/auth.js 의 signAcademyToken 을 그대로 옮긴 것 ──
const mac = (data, secret) => crypto.createHmac('sha256', secret).update(data).digest('base64url');
const b64 = (s) => Buffer.from(String(s)).toString('base64url');
function signAcademyToken(academyId, secret, ttlSec = 3600, now = Date.now(), name = null, reg = null) {
  const regPart = reg && (reg.blogUrl || (reg.placeUrls || []).length)
    ? b64(JSON.stringify({ blogUrl: reg.blogUrl || '', placeUrls: reg.placeUrls || [] })) : null;
  const body = [b64(academyId), Math.floor(now / 1000) + ttlSec,
    ...(regPart ? [name ? b64(name) : '', regPart] : name ? [b64(name)] : [])].join('.');
  return `${body}.${mac(body, secret)}`;
}

const SECRET = '에듀냅-공유-비밀';

test('에듀냅이 서명한 토큰에서 학원 id 와 이름을 읽는다', () => {
  assert.deepEqual(verifyAcademyToken(signAcademyToken('a1', SECRET), SECRET), { id: 'a1', name: null, reg: null });
  const 이름 = verifyAcademyToken(signAcademyToken('a1', SECRET, 3600, Date.now(), '리딩브레인영어학원'), SECRET);
  assert.deepEqual([이름.id, 이름.name], ['a1', '리딩브레인영어학원']);
  // 블로그·플레이스 주소까지 실어 보내는 꼴도 받는다
  const 전체 = verifyAcademyToken(signAcademyToken('a1', SECRET, 3600, Date.now(), '리딩브레인', { blogUrl: 'https://blog.naver.com/x', placeUrls: [] }), SECRET);
  assert.equal(전체.reg.blogUrl, 'https://blog.naver.com/x');
});

test('서명이 다르거나 시간이 지난 토큰은 받지 않는다', () => {
  assert.equal(verifyAcademyToken(signAcademyToken('a1', '다른비밀'), SECRET), null);
  assert.equal(verifyAcademyToken(signAcademyToken('a1', SECRET, -10), SECRET), null); // 만료
  assert.equal(verifyAcademyToken(signAcademyToken('a1', SECRET) + 'x', SECRET), null);
  assert.equal(verifyAcademyToken('', SECRET), null);
  assert.equal(verifyAcademyToken(signAcademyToken('a1', SECRET), ''), null); // 비밀이 없으면 늘 거절
});

// ── 처리기 ──
const call = async (headers, env) => {
  const old = { ...process.env };
  Object.assign(process.env, env);
  for (const k of ['EDUNAP_SHARED_SECRET', 'VERCEL']) if (!(k in env)) delete process.env[k];
  const res = { statusCode: 0, body: '', setHeader() {}, end(b) { this.body = b; } };
  await makeHandler(async () => ({ ok: true }))({ method: 'POST', headers, body: {} }, res);
  process.env = old;
  return { status: res.statusCode, body: JSON.parse(res.body) };
};

test('에듀냅 안에서는 학원 토큰이 있어야 연다', async () => {
  const token = signAcademyToken('a1', SECRET, 3600, Date.now(), '리딩브레인');
  const env = { EDUNAP_SHARED_SECRET: SECRET };
  assert.equal((await call({ authorization: `Edunap ${token}` }, env)).status, 200);
  assert.equal((await call({ authorization: `Bearer ${token}` }, env)).status, 401); // 꼴이 다르면 거절
  assert.equal((await call({}, env)).status, 401);
  assert.equal((await call({ authorization: 'Edunap 아무거나' }, env)).status, 401);
});

test('이 PC 에서는 토큰 없이 열리고, 인터넷에서는 비밀 없이 열리지 않는다', async () => {
  assert.equal((await call({}, {})).status, 200); // npm run local
  const 막힘 = await call({}, { VERCEL: '1' });
  assert.equal(막힘.status, 500);
  assert.match(막힘.body.error, /에듀냅/);
});
