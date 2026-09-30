import test from 'node:test';
import assert from 'node:assert/strict';
import { position, score, levelOf, gradePos, gapText, schoolYear, monthLabel, monthsLeft, ym, roadmap, project, track, earlyText, END, PACE } from '../public/core/progress.js';

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

const near = (a, b) => Math.abs(a - b) < 1e-9;

test('track: 달마다 학원·학교 위치 (학교는 3월 시작, 한 달에 1/6학기, 달 끝 기준)', () => {
  const t = track({ est: { step: 11, unit: 3 }, grade: '중2', start: '2026-10-05' });
  assert.equal(t.points.length, monthsLeft('중2', '2026-10-05')); // 2026-10 ~ 2031-02
  const [p0, p1, p2] = t.points;
  assert.deepEqual([p0.month, p0.when, p0.ours, p0.exam], ['2026-10', '중2 10월', 11.75, false]);
  assert.ok(near(p0.school, 11 + 8 / 6)); // 3월 ~ 10월 끝 = 8달
  assert.deepEqual([p1.month, p1.exam, p1.ours], ['2026-11', true, 11.75]); // 시험 달은 쉼
  assert.equal(p2.ours, 12.125);
  const last = t.points.at(-1);
  assert.deepEqual([last.month, last.when], ['2031-02', '고3 2월']);
  assert.ok(near(last.school, 21)); // 고3 2월 끝에 학교도 고3 과정 끝
  // 2027-02: 학원 12.875 < 학교 13 → 2027-03: 13.25 ≥ 13.17 — 처음 앞서는 달
  assert.equal(t.ahead, 5);
  assert.equal(t.points[5].when, '중3 3월');
  // 완료 달은 roadmap 과 같다
  assert.equal(t.done, roadmap({ est: { step: 11, unit: 3 }, grade: '중2', start: '2026-10-05' }).months);
  assert.equal(t.points[t.done].ours, 21);
  assert.ok(t.points[t.done - 1].ours < 21);
  assert.ok(t.points.every((p) => p.ours <= 21));
});

test('track: 처음부터 앞선 학생·졸업 뒤에 끝나는 학생·이미 끝난 학생', () => {
  const ahead = track({ est: { step: 15, unit: 1 }, grade: '중2', start: '2026-10-05' });
  assert.equal(ahead.ahead, null);
  const late = track({ est: { step: 9, unit: 0 }, grade: '고2', start: '2026-03-02' });
  assert.equal(late.done, null);
  assert.equal(late.points.length, 24);
  const fin = track({ est: { step: 20, unit: 4 }, grade: '고2', start: '2026-09-28' });
  assert.equal(fin.done, 0);
  assert.equal(fin.ahead, null);
  assert.ok(fin.points.every((p) => p.ours === 21));
  assert.deepEqual(track({ est: { step: 11, unit: 1 }, grade: '고3', start: '2027-02-10' }).points.map((p) => p.when), ['고3 2월']);
});

test('earlyText: 끝나는 달과 고3 2월(달 번호 left − 1)의 차이', () => {
  assert.equal(earlyText({ months: 0, done: true }, 53), '이미 도달');
  assert.equal(earlyText({ months: 38, done: true }, 53), '1년 2개월 먼저'); // 고3 2월 = 52번 달
  assert.equal(earlyText({ months: 51, done: true }, 53), '1개월 먼저');
  assert.equal(earlyText({ months: 52, done: true }, 53), '졸업 무렵');
  assert.equal(earlyText({ months: 53, done: true }, 53), '졸업 뒤');
  assert.equal(earlyText({ months: 120, done: false }, 200), '졸업 뒤');
  // 중3 2026-03 시작, 독해 중1 1학기 2단원: 고3 2월에 끝남 → "1개월 먼저"가 아니다
  const p = project({ grade: '중3', start: '2026-03-02', ests: { reading: { step: 9, unit: 2 } } });
  assert.equal(p.overall.label, '고3 2월');
  assert.equal(earlyText(p.perSection.reading, p.left), '졸업 무렵');
});
