import test from 'node:test';
import assert from 'node:assert/strict';
import { makeHandler, UserError } from '../lib/http.js';

// 암호가 없는 자리(이 PC, npm run local)가 기본이다. 암호를 보는 일은 맨 아래에서 따로 본다.
delete process.env.APP_PASSWORD;

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

test('암호를 정해 두면 맞는 사람만 들어온다', async () => {
  process.env.APP_PASSWORD = '리딩브레인1234';
  try {
    const 없이 = await call(async () => ({ ok: 1 }));
    assert.deepEqual([없이.statusCode, 없이.body.error], [401, '암호가 맞지 않습니다']);

    const 틀림 = await call(async () => ({ ok: 1 }), { req: { method: 'POST', headers: { authorization: 'Bearer 아무거나' }, body: {} } });
    assert.equal(틀림.statusCode, 401);

    const 맞음 = await call(async () => ({ ok: 1 }), { req: { method: 'POST', headers: { authorization: 'Bearer 리딩브레인1234' }, body: {} } });
    assert.deepEqual([맞음.statusCode, 맞음.body], [200, { ok: 1 }]);
  } finally { delete process.env.APP_PASSWORD; }
});

test('인터넷에 올렸는데 암호가 없으면 열지 않는다', async () => {
  process.env.VERCEL = '1';
  try {
    const res = await call(async () => ({ ok: 1 }));
    assert.deepEqual([res.statusCode, res.body.error], [500, '서버에 암호가 설정되지 않았습니다']);
  } finally { delete process.env.VERCEL; }
});
