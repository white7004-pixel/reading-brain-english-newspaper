import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkWrite, validateForm, usableForm, marked, nextSet, blanks } from '../public/core/forms.js';

const mc = (o = {}) => ({ id: 'm', no: 13, area: 'grammar', level: '초4', question: '알맞은 것은?', choices: ['a', 'b', 'c', 'd'], answer: 0, status: 'ok', ...o });
const wr = (o = {}) => ({ id: 'w', no: 38, area: 'form', level: '초5', question: '[break] 알맞은 꼴로', template: 'He {} the cup.', answers: [['broke']], status: 'ok', ...o });

test('checkWrite: 대소문자·앞뒤 빈칸·끝 마침표·둥근 따옴표는 따지지 않는다', () => {
  assert.equal(checkWrite(wr(), [' Broke. ']), true);
  const neg = wr({ template: 'I {} it.', answers: [['didn\'t', 'did not']] });
  assert.equal(checkWrite(neg, ['didn\'t']), true);
  assert.equal(checkWrite(neg, ['did  not']), true);
  assert.equal(checkWrite(neg, ['dont']), false);
});

test('checkWrite: 칸이 모두 맞아야 정답, 빈칸은 틀림', () => {
  const two = wr({ template: 'We {} {} under the tree.', answers: [['were'], ['sitting']] });
  assert.equal(checkWrite(two, ['were', 'sitting']), true);
  assert.equal(checkWrite(two, ['was', 'sitting']), false);
  assert.equal(checkWrite(two, ['were', '']), false);
  assert.equal(checkWrite(two, ['were']), false);
});

test('validateForm 은 문제를 이름으로 돌려준다', () => {
  assert.deepEqual(validateForm(mc()), []);
  assert.deepEqual(validateForm(wr()), []);
  assert.deepEqual(validateForm(mc({ area: 'reading' })), ['지문']);
  assert.deepEqual(validateForm(mc({ choices: ['a', 'a', 'c', 'd'] })), ['선택지 중복']);
  assert.deepEqual(validateForm(mc({ level: '초2', no: 0, answer: 4 })), ['수준', '번호', '정답']);
  assert.deepEqual(validateForm(wr({ answers: [['a'], ['b']] })), ['칸 수']);
  assert.deepEqual(validateForm(wr({ answers: [[' ']] })), ['인정 답']);
  assert.deepEqual(validateForm(wr({ template: 'no blank', answers: [['a']] })), ['문장 틀', '칸 수']);
  assert.deepEqual(validateForm(wr({ area: 'essay' })), ['영역']);
});

test('usableForm: 통과했고 올바른 문항만, 번호 순', () => {
  const list = [mc({ id: 'b', no: 20 }), wr({ id: 'a', no: 5 }), mc({ id: 'c', status: 'draft' }), mc({ id: 'd', choices: [] })];
  assert.deepEqual(usableForm(list).map((i) => i.id), ['a', 'b']);
  assert.deepEqual(usableForm(undefined), []);
});

test('marked: __말__ 은 밑줄, 빈칸 ____ 은 그대로, 글자는 이스케이프', () => {
  assert.equal(marked('If you remember (a) __these tips__, you'), 'If you remember (a) <u>these tips</u>, you');
  assert.equal(marked('c__a__t'), 'c<u>a</u>t');
  assert.equal(marked('The ____ was ____ and ____.'), 'The ____ was ____ and ____.');
  assert.equal(marked('<b>'), '&lt;b&gt;');
  assert.equal(marked(null), '');
});

test('marked: 지금 문항 768개의 빈칸을 밑줄로 바꾸지 않는다', () => {
  const items = JSON.parse(readFileSync(new URL('../public/data/items.json', import.meta.url), 'utf8'));
  const hit = items.filter((i) => [i.passage, i.question, ...i.choices].some((t) => marked(t).includes('<u>')));
  assert.deepEqual(hit.map((i) => i.id), []);
});

test('nextSet 과 blanks', () => {
  assert.equal(nextSet(null), 'A');
  assert.equal(nextSet('A'), 'B');
  assert.equal(nextSet('B'), 'A');
  assert.equal(blanks('{} {} x {}'), 3);
  assert.equal(blanks(undefined), 0);
});
