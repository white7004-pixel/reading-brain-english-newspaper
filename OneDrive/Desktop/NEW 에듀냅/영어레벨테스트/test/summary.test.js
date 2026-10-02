import test from 'node:test';
import assert from 'node:assert/strict';
import { estLabel, nextLabel, nextUnits, shaky, bookFor, commentFacts, templateComment } from '../public/core/summary.js';

const r = (step, correct, phase = 1) => ({ step, unit: 1, correct, phase });

test('단계 이름들', () => {
  assert.equal(estLabel({ step: 11, unit: 3 }), '중2 1학기 3단원');
  assert.equal(estLabel({ step: 9, unit: 0 }), '중1 1학기 시작 전');
  assert.equal(estLabel({ step: 11, unit: null }), '중2 1학기');
  assert.equal(nextLabel('grammar', { step: 11, unit: 3 }), '중2 1학기 4단원(접속사 (when · because · if · that))');
  assert.equal(nextLabel('grammar', { step: 20, unit: 4 }), '고3 과정 복습');
});

test('흔들린 구간: 틀린 가장 낮은 학기 ~ 맞힌 가장 높은 학기', () => {
  assert.equal(shaky([r(11, true), r(13, false), r(12, true), r(14, false), r(13, true, 2)]), null); // 틀린 최저 13 > 맞힌 최고 12
  assert.deepEqual(shaky([r(11, true), r(13, true), r(15, false), r(14, true), r(16, false)]), null);
  assert.deepEqual(shaky([r(11, true), r(13, false), r(12, false), r(11, true), r(13, true)]), { from: 12, to: 13 });
  assert.equal(shaky([r(11, true)]), null);
});

test('교재 찾기', () => {
  const books = { grammar: [{ from: 11, to: 14, name: 'G2' }] };
  assert.equal(bookFor(books, 'grammar', 12), 'G2');
  assert.equal(bookFor(books, 'grammar', 15), '');
  assert.equal(bookFor(undefined, 'grammar', 12), '');
});

const result = {
  grade: '중2', date: '2026-09-28',
  sections: {
    vocab: { skipped: '', est: { step: 11, unit: 2 }, log: [] },
    grammar: { skipped: '', est: { step: 14, unit: 1 }, log: [] },
    reading: { skipped: '', est: { step: 12, unit: 4 }, log: [] },
    listening: { skipped: '이 기기에서는 영어 음성을 낼 수 없어 듣기를 건너뛰었습니다', est: null, log: [] },
  },
};

const proj = { overall: { label: '고2 12월' }, perSection: {} };

test('commentFacts 는 AI 에 넘길 사실만 모은다', () => {
  const f = commentFacts(result, proj);
  assert.equal(f.grade, '중2');
  assert.deepEqual(f.skipped, ['듣기']);
  // 지금 12.5 기준: 11.5 → −1, 14.25 → 1.75 → 2, 13 → 0.5. 점수 = (위치−9)/12×100
  assert.ok(f.sections.every((s) => !('perWeek' in s)));
  assert.deepEqual(f.sections.map((s) => [s.key, s.level, s.gap, s.score]), [
    ['vocab', '중2 1학기 2단원', -1, 21], ['grammar', '중3 2학기 1단원', 2, 44], ['reading', '중2 2학기 4단원', 0.5, 33],
  ]);
  assert.equal(f.overall, '고2 12월');
  assert.equal(f.pace, undefined);
});

test('templateComment 는 AI 없이도 총평과 지도 방향을 쓴다', () => {
  const f = commentFacts(result, proj);
  const c = templateComment(f);
  assert.match(c.summary, /가장 앞선 영역은 문법\(중3 2학기 1단원, 44점\)/);
  assert.match(c.summary, /가장 보완이 필요한 영역은 단어\(중2 1학기 2단원, 21점\)/);
  assert.match(c.summary, /고2 12월에 고3 과정을 마칠 것으로 예상합니다/);
  assert.match(templateComment({ ...f, overall: '고3 졸업 이후' }).summary, /지금 진도로는 고3 졸업 전에 고3 과정을 모두 마치기 어렵습니다\.$/);
  assert.match(templateComment({ ...f, overall: '고3 과정 완료' }).summary, /이미 고3 과정 수준에 도달했습니다/);
  assert.equal(c.directions.length, 3);
  assert.match(c.directions[0], /^단어는 중2 1학기 3단원\(어휘대 3\)부터 수업을 시작합니다\.$/);
  assert.deepEqual(templateComment({ sections: [], overall: '' }).directions, []);
});

test('nextUnits: 다음 단원 n개, 고3 끝을 넘으면 있는 만큼만', () => {
  assert.deepEqual(nextUnits('reading', { step: 11, unit: 3 }, 4).map((u) => u.label),
    ['중2 1학기 4단원', '중2 2학기 1단원', '중2 2학기 2단원', '중2 2학기 3단원']);
  assert.equal(nextUnits('reading', { step: 11, unit: 3 }, 4)[0].name, '무관한 문장');
  assert.equal(nextUnits('grammar', { step: 11, unit: null }, 1)[0].label, '중2 1학기 1단원');
  assert.deepEqual(nextUnits('grammar', { step: 20, unit: 2 }, 4).map((u) => u.label), ['고3 2학기 3단원', '고3 2학기 4단원']);
  assert.deepEqual(nextUnits('grammar', { step: 20, unit: 4 }, 4), []);
});

test('초등 자리(중1 전 단계)는 단원 없이 과정 이름으로', async () => {
  const { positionText } = await import('../public/core/scale.js');
  const est = { step: 7, unit: 0 };
  assert.equal(positionText('reading', est), '초6 1학기 과정 수준');
  assert.equal(nextLabel('reading', est), '초6 1학기 과정');
  assert.deepEqual(nextUnits('reading', est, 4), []);
  const r = { name: '김OO', grade: '초6', date: '2026-10-02', sections: { reading: { est, level: '초5' } } };
  const f = commentFacts(r, null);
  assert.equal(f.sections[0].next, '초6 1학기 과정');
  assert.ok(templateComment(f).summary);
});

test('예전 1차 듣기 고3 통과도 척도 안에서 (리포트가 비지 않게)', async () => {
  const { stage2Est } = await import('../public/core/forms.js');
  const est = stage2Est('고3');
  assert.deepEqual(est, { step: 20, unit: 4 });
  const r = { name: '김OO', grade: '고1', date: '2026-10-02', sections: { listening: { est, level: '고3' } } };
  assert.doesNotThrow(() => commentFacts(r, null));
});
