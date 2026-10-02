import test from 'node:test';
import assert from 'node:assert/strict';
import { makeHandler, UserError } from '../lib/http.js';

async function call(run, { method = 'POST', body = { a: 1 }, req } = {}) {
  const res = { statusCode: 0, headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(s) { this.body = JSON.parse(s); } };
  await makeHandler(run)(req || { method, headers: {}, body }, res);
  return res;
}

test('요청 본문을 읽다 실패하면 400 으로 알린다', async () => {
  const req = { method: 'POST', headers: {}, get body() { throw new SyntaxError('Unexpected token 김'); } };
  const res = await call(async () => ({}), { req });
  assert.deepEqual([res.statusCode, res.body.error], [400, '요청을 읽지 못했습니다']);
});

test('POST 면 결과를 돌려주고, 다른 방식은 막는다', async () => {
  const res = await call(async (body) => ({ got: body.a }));
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { got: 1 });
  assert.equal((await call(async () => ({}), { method: 'GET' })).statusCode, 405);
});

test('UserError 는 400 과 메시지, 나머지는 502 와 일반 문구', async () => {
  const bad = await call(async () => { throw new UserError('학교를 적어 주세요'); });
  assert.deepEqual([bad.statusCode, bad.body.error], [400, '학교를 적어 주세요']);
  const boom = await call(async () => { throw new Error('secret detail'); });
  assert.deepEqual([boom.statusCode, boom.body.error], [502, '잠시 후 다시 시도해 주세요']);
});

// 암호는 두지 않는다 (2026-10-02 원장 결정). 들어오는 사람을 가리지 않고, 그냥 열린다.
test('암호 없이 그냥 열린다 — 인터넷에 올라가 있어도', async () => {
  process.env.VERCEL = '1';
  try {
    assert.deepEqual((await call(async () => ({ ok: 1 }))).body, { ok: 1 });
  } finally { delete process.env.VERCEL; }
});
