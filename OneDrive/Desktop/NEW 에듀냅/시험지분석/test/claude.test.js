import test from 'node:test';
import assert from 'node:assert/strict';
import { readJson, askJson } from '../lib/claude.js';
import { UserError } from '../lib/http.js';

const text = (t) => ({ type: 'text', text: t });

test('readJson 은 글 블록을 JSON 으로 읽는다', () => {
  assert.deepEqual(readJson({ stop_reason: 'end_turn', content: [{ type: 'thinking', thinking: '' }, text('{"a":'), text('1}')] }), { a: 1 });
});

test('readJson 은 대체 모델로 넘어가면 마지막 fallback 뒤의 글만 읽는다', () => {
  const msg = { stop_reason: 'end_turn', content: [text('{"a":'), { type: 'fallback' }, text('{"a":1}')] };
  assert.deepEqual(readJson(msg), { a: 1 });
});

test('readJson 은 거절·길이 초과를 원장님께 보일 오류로 바꾼다', () => {
  // 과목별로 바뀌었으므로 거절 안내에 "영어"가 남아 있으면 안 된다
  assert.throws(() => readJson({ stop_reason: 'refusal', content: [] }), (e) => e instanceof UserError && !e.message.includes('영어'));
  assert.throws(() => readJson({ stop_reason: 'max_tokens', content: [text('{"a":')] }), UserError);
});

test('readJson 은 JSON 이 깨지면 내용을 오류 메시지에 담지 않는다', () => {
  assert.throws(
    () => readJson({ stop_reason: 'end_turn', content: [text('{"label": 김OO')] }),
    (e) => !(e instanceof UserError) && e instanceof Error && !e.message.includes('김OO'),
  );
});

// 키가 없는 것은 "잠시 후 다시" 로 넘길 일이 아니다 — 기다려도 저절로 되지 않는다.
// 2026-10-02 실제로 겪었다: 배포한 서버에 ANTHROPIC_API_KEY 가 없어 502 가 났는데
// 화면에는 "잠시 후 다시 시도해 주세요" 가 떠서 무엇이 잘못됐는지 알 수 없었다.
test('키가 없으면 원장님께 그대로 보일 오류로 알린다', async () => {
  const 원래 = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    await assert.rejects(
      () => askJson({ system: 'x', content: [], schema: {}, maxTokens: 10 }),
      (e) => e instanceof UserError && /키/.test(e.message),
    );
  } finally { if (원래) process.env.ANTHROPIC_API_KEY = 원래; }
});
