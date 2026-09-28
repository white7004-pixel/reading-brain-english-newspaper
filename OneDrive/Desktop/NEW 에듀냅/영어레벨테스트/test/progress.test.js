import test from 'node:test';
import assert from 'node:assert/strict';
import { position, schoolYear, addMonths, gradeAt, project, END } from '../public/core/progress.js';

const all = (est) => ({ vocab: est, grammar: est, reading: est, listening: est });

test('위치와 날짜 도우미', () => {
  assert.equal(END, 21);
  assert.equal(position({ step: 11, unit: 2 }), 11.5);
  assert.equal(position({ step: 11, unit: null }), 11.5);
  assert.equal(position({ step: 20, unit: 4 }), 21);
  assert.equal(schoolYear('2027-02-10'), 2026);
  assert.equal(addMonths('2026-03-10', 38), '2029-05-01'); // addMonths 는 이제 늘 1일로 맞춘다 (학기 계산에는 일자가 안 쓰인다)
  assert.ok(addMonths('2026-08-31', 6).startsWith('2027-02')); // 말일이 다음 달로 넘치지 않는다
  assert.equal(gradeAt('중1', '2026-03-10', '2029-05-10'), '고1 1학기');
  assert.equal(gradeAt('고2', '2026-09-01', '2028-03-02'), '고3 졸업 이후');
});

test('중1 3월에 중2 1학기 2단원 → 한 해 3학기면 고1 1학기에 고3 과정 완료', () => {
  const p = project({ grade: '중1', date: '2026-03-10', ests: all({ step: 11, unit: 2 }), pace: 3 });
  assert.deepEqual(p.overall, { years: 3.2, label: '고1 1학기', section: 'vocab' });
  assert.equal(p.low.label, '고1 2학기');  // 2.5학기/년 → 46개월
  assert.equal(p.high.label, '중3 2학기'); // 3.5학기/년 → 33개월
  assert.equal(p.rows.length, 5);
  assert.deepEqual(p.rows[0], { when: '지금 (중1 1학기)', cells: all('중2 1학기') });
  assert.equal(p.rows[1].when, '1년 뒤 (중2 1학기)');
  assert.equal(p.rows[1].cells.grammar, '중3 2학기');
  assert.equal(p.rows[4].cells.grammar, '완료');
});

test('가장 느린 영역이 전체 시점을 정한다', () => {
  const p = project({ grade: '중2', date: '2026-09-28', ests: { vocab: { step: 11, unit: 2 }, grammar: { step: 15, unit: 4 } }, pace: 3 });
  assert.equal(p.overall.section, 'vocab');
  assert.deepEqual(Object.keys(p.rows[0].cells), ['vocab', 'grammar']);
});

test('이미 끝났거나 응시가 없거나 진도가 이상하면', () => {
  const done = project({ grade: '고1', date: '2026-09-28', ests: { grammar: { step: 20, unit: 4 } } });
  assert.deepEqual(done.overall, { years: 0, label: '고3 과정 완료', section: 'grammar' });
  assert.equal(project({ grade: '중1', date: '2026-09-28', ests: {} }), null);
  assert.equal(project({ grade: '중1', date: '2026-09-28', ests: all({ step: 11, unit: 2 }), pace: 0 }).pace, 3);
});
