import test from 'node:test';
import assert from 'node:assert/strict';
import { validateItem, usable, pick, coverage, readiness } from '../public/core/bank.js';

const item = (o = {}) => ({ id: 'x', section: 'grammar', step: 11, unit: 1, kind: '빈칸 어법', passage: '', question: '빈칸에 알맞은 것은?', choices: ['a', 'b', 'c', 'd'], answer: 0, explain_ko: '', status: 'ok', ...o });

test('validateItem 은 문제를 이름으로 돌려준다', () => {
  assert.deepEqual(validateItem(item()), []);
  assert.deepEqual(validateItem(item({ section: 'reading' })), ['지문']);
  assert.deepEqual(validateItem(item({ section: 'listening' })), ['대본']);
  assert.deepEqual(validateItem(item({ choices: ['a', 'a', 'c', 'd'] })), ['선택지 중복']);
  assert.deepEqual(validateItem(item({ choices: ['a', 'b', 'c'] })), ['선택지 4개']);
  assert.deepEqual(validateItem(item({ step: 8, unit: 5, answer: 4 })), ['단계', '단원', '정답']);
});

test('usable 은 통과했고 올바른 문항만 남긴다', () => {
  const list = [item({ id: '1' }), item({ id: '2', status: 'draft' }), item({ id: '3', question: ' ' })];
  assert.deepEqual(usable(list).map((i) => i.id), ['1']);
});

test('pick: 단원이 있으면 그 단원만, 쓴 문항은 빼고, 없으면 null', () => {
  const list = [item({ id: 'a', unit: 1 }), item({ id: 'b', unit: 2 })];
  assert.equal(pick(list, 'grammar', 11, 2, new Set()).id, 'b');
  assert.equal(pick(list, 'grammar', 11, 2, new Set(['b'])), null);
  assert.equal(pick(list, 'grammar', 11, 3, new Set()), null);
});

test('pick: 단원이 null 이면 그 단계 아무 단원, 없으면 ±1·±2 단계에서 찾는다', () => {
  const list = [item({ id: 'a', step: 13, unit: 4 })];
  assert.equal(pick(list, 'grammar', 13, null, new Set()).id, 'a');
  assert.equal(pick(list, 'grammar', 12, null, new Set()).id, 'a');
  assert.equal(pick(list, 'grammar', 11, null, new Set()).id, 'a');
  assert.equal(pick(list, 'grammar', 10, null, new Set()), null);
});

test('coverage 와 readiness', () => {
  const list = [item({ id: '1' }), item({ id: '2' })];
  const short = coverage(list);
  assert.equal(short.length, 4 * 12 * 4 - 1); // 문법 11단계 1단원만 2개를 채웠다
  assert.ok(!short.some((s) => s.section === 'grammar' && s.step === 11 && s.unit === 1));
  assert.deepEqual(readiness(list, 'grammar'), { n: 2, ready: false });
});
