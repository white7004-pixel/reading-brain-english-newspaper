import test from 'node:test';
import assert from 'node:assert/strict';
import { SCALE, SECTIONS, GRADES, MIN_STEP, MAX_STEP, stepOf, labelOf, termOf, currentStep, startStep, unitName, positionText, nextUnit } from '../public/core/scale.js';

test('척도는 9~20단계, 영역마다 단원 4개와 생성 조건이 있다', () => {
  assert.equal(MIN_STEP, 9);
  assert.equal(MAX_STEP, 20);
  assert.deepEqual(SCALE.map((s) => s.step), [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  for (const s of SCALE) {
    for (const k of SECTIONS) assert.equal(s[k].length, 4, `${s.step} ${k}`);
    assert.ok(s.gen.readWords[0] < s.gen.readWords[1] && s.gen.wpm > 0);
  }
});

test('단계 ↔ 학년·학기가 왕복한다', () => {
  assert.equal(stepOf('초3', 1), 1);
  assert.equal(stepOf('중1', 1), 9);
  assert.equal(stepOf('고3', 2), 20);
  for (const g of GRADES.slice(2)) for (const t of [1, 2]) assert.equal(labelOf(stepOf(g, t)), `${g} ${t}학기`);
  assert.equal(labelOf(0), '초1~2 기초');
});

test('학기는 3~8월 1학기, 9~2월 2학기', () => {
  assert.equal(termOf('2026-03-02'), 1);
  assert.equal(termOf('2026-08-31'), 1);
  assert.equal(termOf('2026-09-01'), 2);
  assert.equal(termOf('2027-02-10'), 2);
  assert.equal(currentStep('중2', '2026-09-28'), 12);
});

test('시작 단계는 학년 1학기, 척도 밖이면 끝에 붙는다', () => {
  assert.equal(startStep('초5'), 9);
  assert.equal(startStep('중2'), 11);
  assert.equal(startStep('고3'), 19);
});

test('단원 이름과 위치 문장', () => {
  assert.equal(unitName('grammar', 11, 3), '수동태 기본');
  assert.equal(unitName('vocab', 9, 2), '어휘대 2');
  assert.equal(positionText('grammar', { step: 11, unit: 3 }), '중2 1학기 3단원(수동태 기본)까지 이해');
  assert.equal(positionText('grammar', { step: 9, unit: 0 }), '중1 1학기 1단원(be동사·일반동사 현재) 전 단계');
  assert.equal(positionText('grammar', { step: 11, unit: null }), '중2 1학기 수준 (단원은 확인하지 못함)');
  assert.equal(positionText('grammar', null), '응시하지 않음');
});

test('다음 단원', () => {
  assert.deepEqual(nextUnit({ step: 11, unit: 2 }), { step: 11, unit: 3 });
  assert.deepEqual(nextUnit({ step: 11, unit: 4 }), { step: 12, unit: 1 });
  assert.deepEqual(nextUnit({ step: 11, unit: null }), { step: 11, unit: 1 });
  assert.equal(nextUnit({ step: 20, unit: 4 }), null);
});
