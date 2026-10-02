import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkWrite, isWrite, validateForm, usableForm, marked, nextSet, blanks, stage1Score, areaLevels, startLevel, phonicsNote, writeSummary, levelStep, railFor, checkOrder, choiceCount, secondsFor, stage2Levels, kindTally, stage2Est, stage2Sections, stageText, TEST_STAGES, testStage, validateTest, usableTest, testReady, stopAfter, testLevels, AREA_BLOCKS, byArea, areaStops, nextIndex, areaRail } from '../public/core/forms.js';

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

test('문제지 순서(실제·샘플): 1차·2차 모두 번호 순으로 단계가 오르고 번호는 1..n, 실제는 1차 46·2차 50', () => {
  for (const file of ['forms.json', 'forms.sample.json']) {
    const forms = JSON.parse(readFileSync(new URL(`../public/data/${file}`, import.meta.url), 'utf8'));
    for (const book of ['stage1', 'stage2']) for (const [set, list] of Object.entries(forms[book])) {
      assert.deepEqual(checkOrder(list), [], `${file} ${book} ${set}`);
      assert.deepEqual([...list].sort((a, b) => a.no - b.no).map((x) => x.no), list.map((_, i) => i + 1), `${file} ${book} ${set} 번호`);
      if (file === 'forms.json') assert.equal(list.length, book === 'stage1' ? 46 : 50, `${book} ${set} 문항 수`);
    }
  }
});

test('railFor: 이어지는 같은 단계마다 한 칸 (2차 고2 는 고2~3), 지금 칸과 끝난 칸', () => {
  const levels = ['초3', '초3', '초4', '중1', '중1', '중1', '고2'];
  const list = levels.map((level, n) => ({ area: 'reading', level, no: n + 1 }));
  assert.deepEqual(railFor(list, 3, 2), [
    { key: '초3', label: '초3', done: 2, total: 2, current: false },
    { key: '초4', label: '초4', done: 1, total: 1, current: false },
    { key: '중1', label: '중1', done: 0, total: 3, current: true },
    { key: '고2', label: '고2~3', done: 0, total: 1, current: false },
  ]);
  const s1 = ['고1', '고2', '고3'].map((level, n) => ({ area: 'listening', level, no: n + 1 }));
  assert.deepEqual(railFor(s1, 0).map((c) => c.label), ['고1', '고2', '고3'], '1차는 고2·고3 따로');
  assert.ok(railFor(list, list.length).every((c) => c.done === c.total && !c.current), '다 끝나면 모두 가득');
  assert.deepEqual(railFor([], 0), []);
});

test('checkOrder: 번호 순으로 단계가 내려가지 않고, 같은 단계 안은 듣기→파닉스→어휘→문법→어형→독해→영작', () => {
  const it = (no, level, area) => ({ id: `x${no}`, no, level, area });
  assert.deepEqual(checkOrder([it(1, '초3', 'phonics'), it(2, '초3', 'reading'), it(3, '초4', 'grammar'), it(4, '중1', 'listening')]), []);
  assert.deepEqual(checkOrder([it(2, '초4', 'reading'), it(1, '초3', 'reading')]), [], '번호 순으로 본다');
  assert.equal(checkOrder([it(1, '중1', 'reading'), it(2, '초6', 'reading')]).length, 1);
  assert.equal(checkOrder([it(1, '중2', 'reading'), it(2, '중2', 'vocab')]).length, 1);
});

const s2 = (o = {}) => ({ id: 's2-A-1', no: 1, area: 'reading', level: '중2', kind: '주제', question: '주제는?', passage: 'p', choices: ['a', 'b', 'c', 'd', 'e'], answer: 4, status: 'ok', ...o });

test('choiceCount·secondsFor: 1차 4지 90초, 2차 어휘 4지 20초, 문법 60초, 그 밖 5지 90초', () => {
  assert.equal(choiceCount(mc()), 4);
  assert.equal(choiceCount(s2({ area: 'vocab' }), 2), 4);
  assert.equal(choiceCount(s2(), 2), 5);
  assert.deepEqual(['vocab', 'grammar', 'reading', 'listening', 'sentence'].map((area) => secondsFor({ area }, 2)), [20, 60, 90, 90, 90]);
  assert.equal(secondsFor(mc()), 90);
});

test('validateForm 2차: 영역·단계·선택지 수를 2차 기준으로', () => {
  assert.deepEqual(validateForm(s2(), 2), []);
  assert.deepEqual(validateForm(s2({ area: 'vocab', passage: '', choices: ['a', 'b', 'c', 'd'], answer: 2 }), 2), []);
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

test('샘플 2차 A: 모두 validateForm(it, 2) 통과, 번호는 1..n, 단계 순서', () => {
  const sample = JSON.parse(readFileSync(new URL('../public/data/forms.sample.json', import.meta.url), 'utf8'));
  const a = [...sample.stage2.A].sort((x, y) => x.no - y.no);
  assert.deepEqual(a.map((x) => x.no), a.map((_, i) => i + 1));
  assert.deepEqual(a.map((x) => x.area), ['vocab', 'grammar', 'reading', 'listening', 'sentence']);
  for (const it of a) assert.deepEqual(validateForm(it, 2), [], it.id);
  assert.equal(usableForm(a, 2).length, a.length);
  assert.equal(a[0].choices.length, 4);
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

test('어형·영작도 객관식으로: 선택지가 있으면 isWrite 아님, 1차 4지·2차 5지로 검사', () => {
  const f = mc({ area: 'form', level: '초5' });
  assert.equal(isWrite(f), false);
  assert.deepEqual(validateForm(f), []);
  assert.deepEqual(validateForm(mc({ area: 'sentence', level: '중1' })), []);
  assert.deepEqual(validateForm(mc({ area: 'sentence', level: '중1', choices: ['a', 'b', 'c', 'd', 'e'], answer: 4 }), 2), []);
  assert.deepEqual(validateForm(mc({ area: 'sentence', level: '중1' }), 2), ['선택지 5개']);
  assert.deepEqual(validateForm(mc({ area: 'form', level: '중1', choices: ['a', 'b', 'c', 'd', 'e'] }), 2), ['영역']);
  assert.equal(isWrite(wr()), true); // 문장 틀이 있으면 여전히 쓰기 (옛 2차 쓰기 블록)
});

test('문제지(실제·샘플)의 1차·2차에는 직접 쓰는 문항이 없다', () => {
  for (const file of ['forms.json', 'forms.sample.json']) {
    const forms = JSON.parse(readFileSync(new URL(`../public/data/${file}`, import.meta.url), 'utf8'));
    for (const book of ['stage1', 'stage2']) for (const [set, list] of Object.entries(forms[book])) {
      for (const it of list) {
        assert.equal(isWrite(it), false, `${file} ${book} ${set} ${it.id}`);
        assert.deepEqual(validateForm(it, book === 'stage2' ? 2 : 1), [], `${file} ${it.id}`);
        assert.ok(!/샘플/.test(it.question), `${file} ${it.id}: 질문에 '샘플'`);
      }
    }
  }
});

const T = (level, area, correct = true, o = {}) => ({ id: `${level}-${area}-${Math.random()}`, level, area, correct, kind: '', ...o });
const stageItems = (level, n = 10) => Array.from({ length: n }, (_, k) => ({ id: `${level}${k}`, level, area: 'reading' }));

test('TEST_STAGES 는 초5~고2 7단계(원장 결정 10/2: 초3·초4·파닉스 뺌), testStage 는 초등 1·중고 2', () => {
  assert.deepEqual(TEST_STAGES, ['초5', '초6', '중1', '중2', '중3', '고1', '고2']);
  assert.equal(testStage({ level: '초6' }), 1);
  assert.equal(testStage({ level: '중1' }), 2);
});

test('validateTest: 초등 어휘 4지 허용, 중고는 2차 규칙', () => {
  const v = { id: 't1', no: 1, area: 'vocab', level: '초5', kind: '영→한', question: '다음 단어의 뜻으로 알맞은 것은? __cat__', choices: ['고양이', '개', '새', '말'], answer: 0, status: 'ok' };
  assert.deepEqual(validateTest(v), []);
  assert.deepEqual(validateTest({ ...v, level: '중1' }), []);
  assert.deepEqual(validateTest({ ...v, level: '중1', area: 'reading', passage: 'p' }), ['선택지 5개']);
  assert.deepEqual(validateTest({ ...v, level: '고3' }), ['수준']);
  assert.deepEqual(validateTest({ ...v, level: '초3' }), ['수준'], '초3·초4 는 시험에서 뺐다');
  assert.deepEqual(validateTest({ ...v, level: '초4' }), ['수준']);
});

test('usableTest·testReady: 통과 문항만, 7단계 모두 6개 이상이어야 열림', () => {
  const mk = (level, k, status = 'ok') => ({ id: `${level}${k}`, no: 0, area: 'vocab', level, kind: '영→한', question: 'q', choices: ['a', 'b', 'c', 'd'], answer: 0, status });
  let no = 0;
  const full = TEST_STAGES.flatMap((lv) => Array.from({ length: 6 }, (_, k) => ({ ...mk(lv, k), no: ++no })));
  assert.equal(usableTest(full).length, 42);
  assert.ok(testReady(usableTest(full)));
  const short = full.filter((x) => !(x.level === '고2' && x.id.endsWith('5')));
  assert.equal(testReady(usableTest(short)), false);
  assert.equal(usableTest([{ ...full[0], status: 'draft' }]).length, 0);
});

test('stopAfter: 마친 단계 중 마지막 두 단계가 모두 절반 미만이면 그 단계', () => {
  const list = [...stageItems('초5'), ...stageItems('초6'), ...stageItems('중1')];
  const answers = (level, right, n = 10) => Array.from({ length: n }, (_, k) => T(level, 'reading', k < right));
  assert.equal(stopAfter(list, [...answers('초5', 4), ...answers('초6', 4)]), '초6');
  assert.equal(stopAfter(list, [...answers('초5', 5), ...answers('초6', 4)]), null, '5/10 은 절반 미만이 아님');
  assert.equal(stopAfter(list, [...answers('초5', 3), ...answers('초6', 9), ...answers('중1', 2)]), null, '연속이 아님');
  assert.equal(stopAfter(list, [...answers('초5', 2), ...answers('초6', 2, 6)]), null, '초6 을 다 풀지 않았으면 세지 않음');
  const nine = [...stageItems('중1', 9), ...stageItems('중2', 9)];
  assert.equal(stopAfter(nine, [...answers('중1', 4, 9), ...answers('중2', 4, 9)]), '중2', '듣기를 뺀 9문항 단계: 4/9 는 절반 미만');
  const seven = [...stageItems('중1', 7), ...stageItems('중2', 7)];
  assert.equal(stopAfter(seven, [...answers('중1', 3, 7), ...answers('중2', 3, 7)]), '중2', '7문항 단계: 3/7 은 절반 미만');
  assert.equal(stopAfter(seven, [...answers('중1', 3, 7), ...answers('중2', 4, 7)]), null, '4/7 은 절반 이상');
});

test('testLevels: 초3부터 영역마다 3분의 2, 어형은 문법, 없는 단계는 건너뜀', () => {
  const log = [
    T('초3', 'vocab'), T('초3', 'vocab'), T('초3', 'vocab', false),
    T('초4', 'vocab', false), T('초4', 'vocab', false), T('초4', 'vocab'),
    T('초4', 'grammar'), T('초4', 'grammar'), T('초5', 'form', false), T('초5', 'grammar', false),
    T('초3', 'reading'), T('초4', 'reading'),
  ];
  const lv = testLevels(log);
  assert.equal(lv.vocab.level, '초3');
  assert.equal(lv.grammar.level, '초4');
  assert.equal(lv.reading.level, '초4');
  assert.equal(lv.listening.level, null);
  assert.equal(testLevels([T('초3', 'vocab', false), T('초3', 'vocab', false)]).vocab.level, '초3 수준 아래');
});

test('stage2Est: 통과한 단계의 다음 학년 1학기(초등도 실제 자리), 수준 아래는 그 학년 1학기', () => {
  assert.deepEqual(stage2Est('초5'), { step: 7, unit: 0 });
  assert.deepEqual(stage2Est('초3 수준 아래'), { step: 1, unit: 0 });
  assert.deepEqual(stage2Est('중1 수준 아래'), { step: 9, unit: 0 });
  assert.deepEqual(stage2Est('중2'), { step: 13, unit: 0 });
});

test('한 시험 문제지(실제): A·B 각 50문항(원장 결정 10/2: 초5 8 · 나머지 7), 파닉스 없음, 영역 빠짐없음, 순서·검사 통과', () => {
  const forms = JSON.parse(readFileSync(new URL('../public/data/forms.json', import.meta.url), 'utf8'));
  for (const set of ['A', 'B']) {
    const list = forms.test[set];
    assert.equal(list.length, 50, set);
    assert.equal(list.filter((x) => x.area === 'phonics').length, 0, `${set} 파닉스`);
    for (const lv of TEST_STAGES) assert.equal(list.filter((x) => x.level === lv).length, lv === '초5' ? 8 : 7, `${set} ${lv}`);
    const MID = ['listening', 'vocab', 'grammar', 'reading', 'sentence'];
    for (const lv of TEST_STAGES.slice(2)) assert.deepEqual(MID.map((a) => list.filter((x) => x.level === lv && x.area === a).length), [1, 2, 1, 2, 1], `${set} ${lv} 구성`);
    assert.deepEqual(checkOrder(list), [], set);
    assert.deepEqual([...list].sort((a, b) => a.no - b.no).map((x) => x.no), list.map((_, i) => i + 1));
    for (const it of list) assert.deepEqual(validateTest(it), [], it.id);
    assert.equal(new Set(list.map((x) => x.id)).size, 50);
  }
});

test('한 시험 샘플: test.A 가 있고 순서·검사 통과, 모두 ok', () => {
  const s = JSON.parse(readFileSync(new URL('../public/data/forms.sample.json', import.meta.url), 'utf8'));
  assert.ok(s.test.A.length >= 5);
  assert.deepEqual(checkOrder(s.test.A), []);
  for (const it of s.test.A) { assert.deepEqual(validateTest(it), [], it.id); assert.equal(it.status, 'ok'); }
});

// ── 영역별로 묶어 풀기 (원장 결정 10/2): 듣기 → 어휘 → 문법(어형 포함) → 독해 → 영작, 영역 안은 초5 → 고2~3 ──
const A = (no, level, area) => ({ id: `${area}${no}`, no, level, area });
const mixed = [
  A(1, '초5', 'vocab'), A(2, '초5', 'grammar'), A(3, '초5', 'form'), A(4, '초5', 'reading'), A(5, '초5', 'sentence'),
  A(6, '중1', 'listening'), A(7, '중1', 'vocab'), A(8, '중1', 'grammar'), A(9, '중1', 'reading'), A(10, '중1', 'sentence'),
  A(11, '중2', 'listening'), A(12, '중2', 'vocab'), A(13, '중2', 'grammar'), A(14, '중2', 'reading'), A(15, '중2', 'sentence'),
];

test('AREA_BLOCKS: 듣기·어휘·문법(어형)·독해·영작 차례', () => {
  assert.deepEqual(AREA_BLOCKS.map((b) => b.label), ['듣기', '어휘', '문법', '독해', '영작']);
  assert.deepEqual(AREA_BLOCKS.find((b) => b.key === 'grammar').areas, ['grammar', 'form']);
});

test('byArea: 영역 묶음 차례, 묶음 안은 단계 → 번호', () => {
  assert.deepEqual(byArea(mixed).map((x) => x.no), [6, 11, 1, 7, 12, 2, 3, 8, 13, 4, 9, 14, 5, 10, 15]);
  assert.notEqual(byArea(mixed), mixed, '원본을 바꾸지 않는다');
});

test('areaStops·nextIndex: 그 영역만 두 단계 연속 절반 미만이면 남은 문항을 건너뛴다', () => {
  const list = byArea(mixed);
  const ans = (no, correct) => ({ ...mixed.find((x) => x.no === no), correct });
  // 듣기 중1·중2 모두 틀림 → 듣기는 끝(남은 듣기 없음), 어휘 초5 맞힘
  let log = [ans(6, false), ans(11, false)];
  assert.deepEqual(areaStops(list, log), { listening: '중2' });
  assert.equal(nextIndex(list, log, 2), 2, '어휘 첫 문항으로');
  // 어휘 초5·중1 틀림 → 어휘 중2 는 건너뛰고 문법 첫 문항(초5 grammar)으로
  log = [...log, ans(1, false), ans(7, false)];
  assert.deepEqual(areaStops(list, log), { listening: '중2', vocab: '중1' });
  assert.equal(list[nextIndex(list, log, 4)].no, 2);
  // 문법: 초5 는 grammar+form 두 문항 중 하나 맞힘(절반 이상) → 계속
  log = [...log, ans(2, true), ans(3, false)];
  assert.deepEqual(areaStops(list, log), { listening: '중2', vocab: '중1' });
  assert.equal(list[nextIndex(list, log, 7)].no, 8);
  // 마지막까지 건너뛰면 list.length
  const allWrong = list.map((x) => ({ ...x, correct: false }));
  assert.equal(nextIndex(list, allWrong, list.length), list.length);
});

test('areaRail: 영역 칸마다 푼 수, 지금 칸, 멈춘 영역은 다 채움', () => {
  const list = byArea(mixed);
  const rail = areaRail(list, 5, { vocab: '중1' }); // 듣기 2 + 어휘 3 지나 문법 첫 문항
  assert.deepEqual(rail.map((c) => [c.label, c.done, c.total, c.current]), [['듣기', 2, 2, false], ['어휘', 3, 3, false], ['문법', 0, 4, true], ['독해', 0, 3, false], ['영작', 0, 3, false]]);
  assert.equal(areaRail(list, 3, { vocab: '초5' })[1].done, 3, '멈춘 영역은 다 채움');
  assert.equal(areaRail(list.filter((x) => x.area !== 'listening'), 0, {}).length, 4, '문항 없는 영역 칸은 없다');
});

test('byArea(실제 문제지): 듣기 5 → 어휘 → 문법 → 독해 → 영작, 같은 지문은 붙어 있다', () => {
  const forms = JSON.parse(readFileSync(new URL('../public/data/forms.json', import.meta.url), 'utf8'));
  for (const set of ['A', 'B']) {
    const list = byArea(forms.test[set]);
    assert.deepEqual(list.slice(0, 5).map((x) => x.area), Array(5).fill('listening'));
    const blocks = list.map((x) => AREA_BLOCKS.findIndex((b) => b.areas.includes(x.area)));
    assert.deepEqual(blocks, [...blocks].sort((a, b) => a - b), `${set} 영역 차례`);
    const seen = new Set();
    list.forEach((x, i) => { if (x.passageId && seen.has(x.passageId)) assert.equal(list[i - 1].passageId, x.passageId, `${set} ${x.id} 지문 떨어짐`); if (x.passageId) seen.add(x.passageId); });
  }
});
