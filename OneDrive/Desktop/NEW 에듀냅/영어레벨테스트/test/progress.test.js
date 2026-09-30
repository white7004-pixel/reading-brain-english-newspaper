import test from 'node:test';
import assert from 'node:assert/strict';
import { position, score, levelOf, gradePos, gapText, schoolYear, monthLabel, monthsLeft, ym, roadmap, project, END, PACE } from '../public/core/progress.js';

test('위치·점수·수준', () => {
  assert.equal(END, 21);
  assert.equal(position({ step: 11, unit: 2 }), 11.5);
  assert.equal(position({ step: 11, unit: null }), 11.5);
  assert.equal(position({ step: 20, unit: 4 }), 21);
  assert.deepEqual([9, 14.5, 21, 7.5, 22].map(score), [0, 46, 100, 0, 100]);
  assert.equal(levelOf(14.5), '중3 2학기');
  assert.equal(levelOf(21), '고3 과정 완료');
});

test('학년 대비', () => {
  const now = gradePos('중2', '2026-09-28');
  assert.equal(now, 12.5);
  assert.equal(gapText(14.5, now), '2학기 앞섬');
  assert.equal(gapText(12.4, now), '학년 수준');
  assert.equal(gapText(11.5, now), '1학기 뒤');
});

test('달 도우미', () => {
  assert.equal(schoolYear('2027-02'), 2026);
  assert.equal(monthLabel('중3', '2026-09-01', '2027-02'), '중3 2월');
  assert.equal(monthLabel('중3', '2026-09-01', '2027-03'), '고1 3월');
  assert.equal(monthLabel('고3', '2026-09-01', '2027-03'), '고3 졸업 이후');
  assert.equal(monthsLeft('중1', '2026-03-02'), 72);
  assert.equal(monthsLeft('중2', '2026-09-28'), 54);
  assert.equal(monthsLeft('고3', '2027-02-10'), 1);
  assert.deepEqual([0, 8, 12, 38].map(ym), ['0개월', '8개월', '1년', '3년 2개월']);
});

test('로드맵: 시험 달(4·6·9·11월)은 쉬고, 끝나면 완료 점', () => {
  const r = roadmap({ est: { step: 19, unit: 4 }, grade: '중3', start: '2026-09-01' });
  // 10월 20.375 → 11월 쉼 → 12월 20.75 → 1월 21.125 완료
  assert.equal(r.months, 4);
  assert.equal(r.perWeek, undefined);
  assert.deepEqual(r.points, [
    { month: '2026-09', when: '중3 9월', level: '고3 2학기', done: false },
    { month: '2027-01', when: '중3 1월', level: '고3 과정 완료', done: true },
  ]);
});

test('로드맵: 수업 횟수와 관계없이 한 해 3학기, 점은 10개까지', () => {
  assert.equal(PACE, 3);
  const two = roadmap({ est: { step: 9, unit: 0 }, grade: '중1', start: '2026-03-02' });
  assert.equal(two.months, 48);
  assert.equal(two.points.length, 10);
  assert.deepEqual(two.points[0], { month: '2026-03', when: '중1 3월', level: '중1 1학기', done: false });
  assert.deepEqual(two.points.at(-1), { month: '2030-03', when: '고2 3월', level: '고3 과정 완료', done: true });
  assert.ok(two.points.slice(1).every((p) => !['04', '06', '09', '11'].includes(p.month.slice(5))));
});

test('로드맵: 이미 끝난 학생', () => {
  const r = roadmap({ est: { step: 20, unit: 4 }, grade: '고2', start: '2026-09-28' });
  assert.equal(r.months, 0);
  assert.equal(r.done, true);
  assert.deepEqual(r.points.map((p) => p.level), ['고3 과정 완료']);
});

test('project: 가장 느린 영역이 전체 완료 시점', () => {
  const p = project({ grade: '중1', start: '2026-03-02', ests: { vocab: { step: 9, unit: 0 }, grammar: { step: 19, unit: 4 } } });
  assert.equal(p.perSection.vocab.months, 48);
  assert.equal(p.perSection.grammar.months, 5); // 5월 20.375 · 7월 20.75 · 8월 21.125
  assert.deepEqual(p.overall, { section: 'vocab', months: 48, label: '고2 3월' });
  assert.equal(p.left, 72);
  assert.equal(project({ grade: '중1', start: '2026-03-02', ests: {} }), null);
  assert.equal(project({ grade: '고2', start: '2026-09-28', ests: { grammar: { step: 20, unit: 4 } } }).overall.label, '고3 과정 완료');
});
