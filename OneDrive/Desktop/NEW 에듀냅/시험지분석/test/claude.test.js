import test from 'node:test';
import assert from 'node:assert/strict';
import { readJson } from '../lib/claude.js';
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
  assert.throws(() => readJson({ stop_reason: 'refusal', content: [] }), UserError);
  assert.throws(() => readJson({ stop_reason: 'max_tokens', content: [text('{"a":')] }), UserError);
});

test('readJson 은 JSON 이 깨지면 내용을 오류 메시지에 담지 않는다', () => {
  assert.throws(
    () => readJson({ stop_reason: 'end_turn', content: [text('{"label": 김OO')] }),
    (e) => !(e instanceof UserError) && e instanceof Error && !e.message.includes('김OO'),
  );
});
