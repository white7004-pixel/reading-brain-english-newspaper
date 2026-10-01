import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkWrite, validateForm, usableForm, marked, nextSet, blanks, stage1Score, areaLevels, startLevel, phonicsNote, writeSummary, levelStep, railFor, choiceCount, secondsFor, stage2Levels, kindTally, stage2Est, stage2Sections, stageText } from '../public/core/forms.js';

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

test('railFor: 문제지 순서의 영역 묶음마다 한 칸, 지금 칸과 끝난 칸', () => {
  const areas = ['listening', 'listening', 'phonics', 'reading', 'reading', 'reading', 'grammar', 'form', 'sentence'];
  const list = areas.map((area, n) => ({ area, no: n + 1 }));
  assert.deepEqual(railFor(list, 4), [
    { key: 'listening', label: '듣기', done: 2, total: 2, current: false },
    { key: 'phonics', label: '소리', done: 1, total: 1, current: false },
    { key: 'reading', label: '독해', done: 1, total: 3, current: true },
    { key: 'grammar', label: '문법', done: 0, total: 1, current: false },
    { key: 'form', label: '어형', done: 0, total: 1, current: false },
    { key: 'sentence', label: '영작', done: 0, total: 1, current: false },
  ]);
  assert.deepEqual(railFor(list, 0).map((c) => [c.key, c.done, c.current]).slice(0, 2), [['listening', 0, true], ['phonics', 0, false]]);
  assert.ok(railFor(list, list.length).every((c) => c.done === c.total && !c.current), '다 끝나면 모두 가득');
});

test('railFor: 세트에 없는 영역은 칸이 없다', () => {
  const list = [{ area: 'phonics' }, { area: 'reading' }, { area: 'form' }];
  assert.deepEqual(railFor(list, 1).map((c) => c.label), ['소리', '독해', '어형']);
  assert.deepEqual(railFor([], 0), []);
});

const s2 = (o = {}) => ({ id: 's2-A-1', no: 1, area: 'reading', level: '중2', kind: '주제', question: '주제는?', passage: 'p', choices: ['a', 'b', 'c', 'd', 'e'], answer: 4, status: 'ok', ...o });

test('choiceCount·secondsFor: 1차 4지 90초, 2차 어휘 3지 20초, 문법 60초, 그 밖 5지 90초', () => {
  assert.equal(choiceCount(mc()), 4);
  assert.equal(choiceCount(s2({ area: 'vocab' }), 2), 3);
  assert.equal(choiceCount(s2(), 2), 5);
  assert.deepEqual(['vocab', 'grammar', 'reading', 'listening', 'sentence'].map((area) => secondsFor({ area }, 2)), [20, 60, 90, 90, 90]);
  assert.equal(secondsFor(mc()), 90);
});

test('validateForm 2차: 영역·단계·선택지 수를 2차 기준으로', () => {
  assert.deepEqual(validateForm(s2(), 2), []);
  assert.deepEqual(validateForm(s2({ area: 'vocab', passage: '', choices: ['a', 'b', 'c'], answer: 2 }), 2), []);
  assert.deepEqual(validateForm(s2({ choices: ['a', 'b', 'c', 'd'], answer: 0 }), 2), ['선택지 5개']);
  assert.deepEqual(validateForm(s2({ level: '고3' }), 2), ['수준']);
  assert.deepEqual(validateForm(s2({ area: 'phonics' }), 2), ['영역']);
  assert.deepEqual(validateForm(s2({ area: 'listening', passage: '', script: '' }), 2), ['대본']);
  assert.deepEqual(validateForm(wr({ area: 'sentence', level: '고2' }), 2), []);
  assert.deepEqual(validateForm(s2(), 1), ['선택지 4개']); // 1차 기준이면 5지선다는 안 된다
  assert.deepEqual(usableForm([s2({ id: 'b', no: 2 }), s2({ id: 'a', no: 1 }), s2({ id: 'c', status: 'draft' })], 2).map((i) => i.id), ['a', 'b']);
});

test('stage2Levels: 단계마다 3분의 2, 처음 못 넘은 단계에서 멈추고 정답률은 모두 낸다', () => {
  const R = (area, level, correct, kind = 'k') => ({ area, level, correct, kind });
  const log = [
    R('reading', '중1', true), R('reading', '중1', true), R('reading', '중1', false),
    R('reading', '중2', true), R('reading', '중2', false), R('reading', '중2', false),
    R('reading', '중3', true), R('reading', '중3', true), R('reading', '중3', true),
    R('grammar', '중1', false), R('grammar', '중1', true),
    R('listening', '중1', true), R('listening', '중2', true), R('listening', '중3', true), R('listening', '고1', true), R('listening', '고2', true),
    R('sentence', '중1', true),
  ];
  const lv = stage2Levels(log);
  assert.equal(lv.reading.level, '중1');
  assert.deepEqual(lv.reading.steps, [{ level: '중1', correct: 2, total: 3 }, { level: '중2', correct: 1, total: 3 }, { level: '중3', correct: 3, total: 3 }]);
  assert.equal(lv.grammar.level, '중1 수준 아래');
  assert.equal(lv.listening.level, '고2');
  assert.equal(lv.writing.level, '중1');
  assert.deepEqual(lv.vocab, { level: null, steps: [] });
});

test('kindTally 와 stage2Est', () => {
  const log = [{ area: 'reading', kind: '주제', correct: true }, { area: 'reading', kind: '빈칸', correct: false }, { area: 'reading', kind: '주제', correct: false }, { area: 'grammar', kind: '짝', correct: true }];
  assert.deepEqual(kindTally(log, 'reading'), [{ kind: '주제', correct: 1, total: 2 }, { kind: '빈칸', correct: 0, total: 1 }]);
  assert.equal(stage2Est(null), null);
  assert.deepEqual(stage2Est('중1 수준 아래'), { step: 9, unit: 0 });
  assert.deepEqual(stage2Est('중2'), { step: 13, unit: 0 });
  assert.deepEqual(stage2Est('고2'), { step: 19, unit: 0 });
});

test('샘플 2차 A: 모두 validateForm(it, 2) 통과, 번호는 1..n, 영역·단계 순서', () => {
  const sample = JSON.parse(readFileSync(new URL('../public/data/forms.sample.json', import.meta.url), 'utf8'));
  const a = [...sample.stage2.A].sort((x, y) => x.no - y.no);
  assert.deepEqual(a.map((x) => x.no), a.map((_, i) => i + 1));
  assert.deepEqual(a.map((x) => x.area), ['vocab', 'grammar', 'reading', 'listening', 'sentence']);
  for (const it of a) assert.deepEqual(validateForm(it, 2), [], it.id);
  assert.equal(usableForm(a, 2).length, a.length);
  assert.equal(a[0].choices.length, 3);
  assert.ok(a[1].keepOrder && a[1].passage && a[2].keepOrder && a[2].given);
  assert.deepEqual(sample.stage2.B, []);
});

test('stage2Sections: 2차 수준을 결과지 sections 로 (쓰기는 빼고, 없는 영역은 응시하지 않음)', () => {
  const R = (area, level, correct) => ({ area, level, correct, kind: '' });
  const s = stage2Sections([R('vocab', '중1', true), R('vocab', '중2', true), R('grammar', '중1', false), R('listening', '고2', true), R('sentence', '중1', true)]);
  assert.deepEqual(Object.keys(s), ['vocab', 'grammar', 'reading', 'listening']);
  assert.deepEqual(s.vocab, { est: { step: 13, unit: 0 }, level: '중2', log: [], skipped: '' });
  assert.deepEqual(s.grammar, { est: { step: 9, unit: 0 }, level: '중1 수준 아래', log: [], skipped: '' });
  assert.deepEqual(s.reading, { est: null, level: null, log: [], skipped: '응시하지 않음' });
  assert.equal(s.listening.est.step, 19);
});

test('stageText: 2차 수준을 학년 단위 문장으로', () => {
  assert.equal(stageText('중2'), '중2 과정 수준');
  assert.equal(stageText('고2'), '고2~3 과정 수준');
  assert.equal(stageText('중1 수준 아래'), '중1 과정 전 단계');
  assert.equal(stageText(null), '');
});
