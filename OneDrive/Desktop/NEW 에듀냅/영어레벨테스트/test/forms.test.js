import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkWrite, validateForm, usableForm, marked, nextSet, blanks, stage1Score, areaLevels, startLevel, phonicsNote, writeSummary, levelStep } from '../public/core/forms.js';

const mc = (o = {}) => ({ id: 'm', no: 13, area: 'grammar', level: '초4', question: '알맞은 것은?', choices: ['a', 'b', 'c', 'd'], answer: 0, status: 'ok', ...o });
const wr = (o = {}) => ({ id: 'w', no: 38, area: 'form', level: '초5', question: '[break] 알맞은 꼴로', template: 'He {} the cup.', answers: [['broke']], status: 'ok', ...o });

test('checkWrite: 대소문자·앞뒤 빈칸·끝 마침표·둥근 따옴표는 따지지 않는다', () => {
  assert.equal(checkWrite(wr(), [' Broke. ']), true);
  const neg = wr({ template: 'I {} it.', answers: [['didn\'t', 'did not']] });
  assert.equal(checkWrite(neg, ['didn’t']), true);
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

test('validateForm: 듣기는 대본이 있어야 한다', () => {
  const li = mc({ area: 'listening', level: '중2', no: 3, script: 'W: Hi.\nM: Hello.' });
  assert.deepEqual(validateForm(li), []);
  assert.deepEqual(validateForm({ ...li, script: '  ' }), ['대본']);
});

test('levelStep: 듣기 수준을 학기 단계로 (말 빠르기용)', () => {
  assert.deepEqual(['중1', '중2', '중3', '고1', '고2', '고3'].map(levelStep), [9, 11, 13, 15, 17, 19]);
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

const r = (area, level, correct, o = {}) => ({ area, level, correct, ...o });

test('stage1Score: 80점 경계와 반올림', () => {
  const log = (n, of) => Array.from({ length: of }, (_, i) => r('reading', '초3', i < n));
  assert.deepEqual(stage1Score(log(27, 34)), { correct: 27, total: 34, score: 79, passed: false });
  assert.deepEqual(stage1Score(log(28, 34)), { correct: 28, total: 34, score: 82, passed: true });
  assert.equal(stage1Score(log(4, 5)).passed, true); // 80점
  assert.equal(stage1Score(log(39, 50)).passed, false); // 78점
  assert.deepEqual(stage1Score([]), { correct: 0, total: 0, score: 0, passed: false });
});

test('areaLevels: 3분의 2 이상 맞히면 다음 학년, 없는 학년은 건너뛴다', () => {
  const log = [
    r('reading', '초3', true), r('reading', '초3', true),
    r('reading', '초4', true), r('reading', '초4', false), r('reading', '초4', true),
    r('reading', '초5', true), r('reading', '초5', false),
    r('reading', '초6', true),
    r('grammar', '초4', true), r('form', '초5', true), r('form', '중1', true),
    r('sentence', '초5', false),
    r('phonics', '초3', true), r('phonics', '초4', false),
  ];
  assert.deepEqual(areaLevels(log), { listening: null, reading: '초4', grammar: '중1', writing: '초5 수준 아래', phonics: { correct: 1, total: 2 } });
});

test('areaLevels: 듣기는 중1부터 학년마다 두 문항, 둘 다 맞혀야 다음 학년', () => {
  const log = [r('listening', '중1', true), r('listening', '중1', true), r('listening', '중2', true), r('listening', '중2', false), r('listening', '중3', true), r('listening', '중3', true)];
  assert.equal(areaLevels(log).listening, '중1');
  assert.equal(areaLevels([r('listening', '중1', false), r('listening', '중1', true)]).listening, '중1 수준 아래');
});

test('areaLevels: 문항이 없는 영역은 null', () => {
  assert.deepEqual(areaLevels([]), { listening: null, reading: null, grammar: null, writing: null, phonics: { correct: 0, total: 0 } });
});

test('startLevel 은 가장 낮은 수준, phonicsNote 는 하나라도 틀리면', () => {
  assert.equal(startLevel({ reading: '초6', grammar: '초4', writing: '초5' }), '초4');
  assert.equal(startLevel({ reading: '초6', grammar: '초4', writing: '초4 수준 아래' }), '초4 수준 아래');
  assert.equal(startLevel({ reading: '초3 수준 아래', grammar: null, writing: '초4 수준 아래' }), '초3 수준 아래');
  assert.equal(startLevel({ reading: null, grammar: null, writing: null }), null);
  assert.equal(startLevel({ listening: '중1 수준 아래', reading: '초6', grammar: '중1', writing: '초6' }), '초6'); // 듣기는 시작 수준에 넣지 않는다
  assert.equal(phonicsNote({ phonics: { correct: 1, total: 2 } }), '파닉스 복습 권장');
  assert.equal(phonicsNote({ phonics: { correct: 2, total: 2 } }), '');
  assert.equal(phonicsNote({ phonics: { correct: 0, total: 0 } }), '');
});

test('writeSummary: 맞힌 수와 틀린 문법 항목(겹치면 한 번)', () => {
  const log = [r('form', '중2', true, { point: '수동태' }), r('form', '중3', false, { point: '과거완료' }), r('sentence', '고1', false, { point: '과거완료' }), r('form', '고1', false, { point: '부정어 도치' })];
  assert.deepEqual(writeSummary(log), { correct: 1, total: 4, missed: ['과거완료', '부정어 도치'] });
});

test('1차 문제지 순서: 듣기 → 파닉스 → 독해 → 문법 → 어형 쓰기 → 영작, 영역 안에서는 쉬운 것부터', () => {
  const ORDER = ['listening', 'phonics', 'reading', 'grammar', 'form', 'sentence'];
  const LV = ['초3', '초4', '초5', '초6', '중1', '중2', '중3', '고1', '고2', '고3'];
  for (const file of ['forms.json', 'forms.sample.json']) {
    const forms = JSON.parse(readFileSync(new URL(`../public/data/${file}`, import.meta.url), 'utf8'));
    for (const [set, list] of Object.entries(forms.stage1)) {
      const s = [...list].sort((a, b) => a.no - b.no);
      const key = (x) => ORDER.indexOf(x.area) * 100 + LV.indexOf(x.level);
      s.slice(1).forEach((x, i) => assert.ok(key(s[i]) <= key(x), `${file} ${set}: ${s[i].no}번(${s[i].area} ${s[i].level}) 뒤에 ${x.no}번(${x.area} ${x.level})`));
      if (file === 'forms.json') assert.deepEqual(s.map((x) => x.no), Array.from({ length: 46 }, (_, i) => i + 1));
    }
  }
});
