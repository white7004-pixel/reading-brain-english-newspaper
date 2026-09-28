import test from 'node:test';
import assert from 'node:assert/strict';
import { start, nextQuery, answer, skip, stop, LIMITS } from '../public/core/engine.js';

// 엔진이 묻는 단계(단원)의 문항을 냈다고 치고 답한다
const run = (s, answers) => answers.reduce((st, correct) => {
  const q = nextQuery(st);
  return answer(st, { itemId: `i${st.log.length}`, step: q.step, unit: q.unit ?? 1, kind: 't', correct, ms: 1000 });
}, s);

test('1마당: 맞히면 +2, 틀리면 −1, 첫 질문은 단원을 가리지 않는다', () => {
  let s = start('grammar', 11);
  assert.deepEqual(nextQuery(s), { step: 11, unit: null });
  s = run(s, [true]);
  assert.equal(s.step, 13);
  s = run(s, [false]);
  assert.equal(s.step, 12);
  assert.equal(start('grammar', 3).step, 9); // 척도 밖은 끝에 붙는다
});

test('방향이 세 번 바뀌면 마지막 4문항 평균으로 2마당에 들어간다', () => {
  const s = run(start('grammar', 11), [true, false, true, false]); // 11,13,12,14 → 12.5 → 13
  assert.equal(s.phase, 2);
  assert.equal(s.unitStep, 13);
  assert.deepEqual(nextQuery(s), { step: 13, unit: 1 });
});

test('맨 위에서 두 번 맞히면 20단계로 2마당', () => {
  const s = run(start('grammar', 17), [true, true, true, true]); // 17,19,20,20
  assert.equal(s.phase, 2);
  assert.equal(s.unitStep, 20);
});

test('2마당: 처음 틀린 단원의 앞 단원까지', () => {
  const p2 = run(start('grammar', 11), [true, false, true, false]);
  const s = run(p2, [true, true, false]);
  assert.equal(s.done, true);
  assert.deepEqual(s.est, { step: 13, unit: 2 });
  assert.equal(nextQuery(s), null);
});

test('2마당 1단원에서 틀리면 앞 학기 4단원, 9단계면 unit 0', () => {
  const p2 = run(start('grammar', 11), [true, false, true, false]);
  assert.deepEqual(run(p2, [false]).est, { step: 12, unit: 4 });
  const bottom = run(start('grammar', 9), [false, false]); // 9에서 두 번 틀림 → 9단계 2마당
  assert.equal(bottom.unitStep, 9);
  assert.deepEqual(run(bottom, [false]).est, { step: 9, unit: 0 });
});

test('4단원을 다 맞히면 다음 학기 1단원을 하나 더 본다', () => {
  const p2 = run(start('grammar', 11), [true, false, true, false]);
  const four = run(p2, [true, true, true, true]);
  assert.equal(four.extra, true);
  assert.deepEqual(nextQuery(four), { step: 14, unit: 1 });
  assert.deepEqual(run(four, [true]).est, { step: 14, unit: 1 });
  assert.deepEqual(run(four, [false]).est, { step: 13, unit: 4 });
});

test('20단계 4단원까지 맞히면 거기서 끝', () => {
  const top = run(start('grammar', 17), [true, true, true, true]);
  assert.deepEqual(run(top, [true, true, true, true]).est, { step: 20, unit: 4 });
});

test('문항 상한: 1마당에서 닿으면 단원은 null', () => {
  // 9,11,13,15,17 맞힘 → 19에서부터 10까지 틀림 = 15문항, 마지막 4개 13,12,11,10 → 11.5 → 12
  const s = run(start('vocab', 9), [true, true, true, true, true, ...Array(10).fill(false)]);
  assert.equal(s.log.length, LIMITS.vocab);
  assert.equal(s.done, true);
  assert.deepEqual(s.est, { step: 12, unit: null });
});

test('skip 은 이제 stop 과 같다: 2마당에서 그 단원 문항이 없으면 확인한 데까지로 끝낸다', () => {
  const p2 = run(start('grammar', 11), [true, false, true, false]);
  assert.deepEqual(skip(p2), stop(p2));
  assert.equal(skip(p2).est.unit, null); // 2마당 답이 하나도 없을 때 skip 하면 unit 이 null
  assert.deepEqual(stop(p2).est, { step: 13, unit: null });
  assert.deepEqual(stop(run(p2, [true, true])).est, { step: 13, unit: 2 });
  assert.equal(stop(start('grammar', 11)).est, null);
  assert.deepEqual(stop(run(start('grammar', 11), [true, true])).est, { step: 12, unit: null }); // 11,13 → 12
});
