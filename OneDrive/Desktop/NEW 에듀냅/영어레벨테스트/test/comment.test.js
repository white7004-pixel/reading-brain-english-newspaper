import test from 'node:test';
import assert from 'node:assert/strict';
import { commentRequest, checkComment, COMMENT_SCHEMA } from '../lib/comment.js';
import { UserError } from '../lib/http.js';

const facts = {
  grade: '중2', overall: '중3 2학기', pace: 3, skipped: ['듣기'],
  sections: [{ key: 'grammar', name: '문법', position: '중2 1학기 3단원(수동태 기본)까지 이해', level: '중2 1학기 3단원', next: '중2 1학기 4단원(접속사)', gap: -1 }],
};

test('commentRequest 는 사실만 JSON 으로 넘기고 스키마를 붙인다', () => {
  const req = commentRequest({ facts });
  assert.equal(req.schema, COMMENT_SCHEMA);
  const sent = JSON.parse(req.content[0].text);
  assert.deepEqual(sent.sections[0], { name: '문법', position: facts.sections[0].position, level: '중2 1학기 3단원', next: '중2 1학기 4단원(접속사)', gap: -1 });
  assert.deepEqual(sent.skipped, ['듣기']);
  assert.equal(sent.name, undefined); // 학생 이름은 보내지 않는다
  assert.match(req.system, /학생 이름을 쓰지 않고/);
});

test('commentRequest 는 모양이 틀리면 UserError', () => {
  assert.throws(() => commentRequest({}), UserError);
  assert.throws(() => commentRequest({ facts: { ...facts, sections: [] } }), UserError);
  assert.throws(() => commentRequest({ facts: { ...facts, sections: [{ ...facts.sections[0], position: 'x'.repeat(300) }] } }), UserError);
});

test('checkComment 는 다듬고 세 개로 자른다', () => {
  assert.deepEqual(checkComment({ summary: ' 좋습니다. ', directions: ['a', 'b', 'c', 'd'] }), { summary: '좋습니다.', directions: ['a', 'b', 'c'] });
  assert.throws(() => checkComment({ summary: '', directions: ['a'] }));
  assert.throws(() => checkComment({ summary: 'x', directions: [] }));
});
