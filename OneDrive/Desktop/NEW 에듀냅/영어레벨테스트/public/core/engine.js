// 적응 규칙 (설계서 4장). 순수 함수 — 상태를 받아 새 상태를 돌려준다.
// ponytail: 계단식 규칙이다. 응시 기록이 쌓이면 문항 반응 이론(IRT)으로 바꿀 자리는 nextQuery·answer 둘뿐이다.
import { MIN_STEP, MAX_STEP } from './scale.js';

export const LIMITS = { vocab: 15, grammar: 15, reading: 12, listening: 12 };
const clamp = (n) => Math.min(MAX_STEP, Math.max(MIN_STEP, n));

export function start(section, step) {
  return { section, phase: 1, step: clamp(step), lastDir: 0, turns: 0, edge: 0, unitStep: null, unit: 1, extra: false, log: [], done: false, est: null };
}

export function nextQuery(s) {
  if (s.done) return null;
  if (s.phase === 1) return { step: s.step, unit: null };
  return s.extra ? { step: s.unitStep + 1, unit: 1 } : { step: s.unitStep, unit: s.unit };
}

// rec = { itemId, step, unit, kind, correct, ms } — step·unit 은 실제로 낸 문항의 값
export function answer(s, rec) {
  if (s.done) return s;
  let n = { ...s, log: [...s.log, { ...rec, phase: s.phase }] };
  n = s.phase === 1 ? afterPhase1(n, rec.correct, rec.step) : afterPhase2(n, rec.correct);
  return !n.done && n.log.length >= LIMITS[n.section] ? stop(n) : n;
}

export function phase1Estimate(log) {
  const last = log.filter((r) => r.phase === 1).slice(-4);
  return Math.round(last.reduce((a, r) => a + r.step, 0) / last.length);
}

function afterPhase1(s, correct, at) {
  const dir = correct ? 1 : -1;
  const turns = s.lastDir && dir !== s.lastDir ? s.turns + 1 : s.turns;
  const next = clamp(at + (correct ? 2 : -1));
  const edge = next === at ? s.edge + 1 : 0; // 맨 위에서 또 맞힘, 맨 아래에서 또 틀림
  const moved = { ...s, step: next, turns, lastDir: dir, edge };
  if (edge >= 2) return toPhase2(moved, at);
  if (turns >= 3) return toPhase2(moved, phase1Estimate(s.log));
  return moved;
}

function toPhase2(s, step) {
  return { ...s, phase: 2, unitStep: step, unit: 1, extra: false };
}

function afterPhase2(s, correct) {
  if (s.extra) return finish(s, correct ? { step: s.unitStep + 1, unit: 1 } : { step: s.unitStep, unit: 4 });
  if (!correct) return finish(s, s.unit > 1 || s.unitStep === MIN_STEP ? { step: s.unitStep, unit: s.unit - 1 } : { step: s.unitStep - 1, unit: 4 });
  return advance(s);
}

function advance(s) {
  if (s.unit < 4) return { ...s, unit: s.unit + 1 };
  if (s.unitStep < MAX_STEP) return { ...s, extra: true };
  return finish(s, { step: s.unitStep, unit: 4 });
}

// 2마당에서 그 단원 문항이 없으면 확인한 데까지로 끝낸다.
export const skip = stop;

// 문항 상한, 또는 1마당에서 문항을 더 찾지 못했을 때: 있는 답으로 끝낸다.
export function stop(s) {
  if (s.done) return s;
  if (s.phase === 1) return finish(s, s.log.length ? { step: phase1Estimate(s.log), unit: null } : null);
  if (!s.log.some((r) => r.phase === 2)) return finish(s, { step: s.unitStep, unit: null });
  return finish(s, s.extra ? { step: s.unitStep, unit: 4 } : { step: s.unitStep, unit: s.unit - 1 });
}

function finish(s, est) {
  return { ...s, done: true, est };
}
