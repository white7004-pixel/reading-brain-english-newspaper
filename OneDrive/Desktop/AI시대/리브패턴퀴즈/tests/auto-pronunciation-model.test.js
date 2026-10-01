const assert = require("node:assert/strict");
const audio = require("../auto-pronunciation-model.js");

assert.equal(
  audio.createToken({ section: "pattern", stage: "study", itemId: 17 }),
  "pattern:study:17",
);
assert.equal(
  audio.createToken({ section: "bookquiz", stage: "word-study", itemId: 8003, round: 2 }),
  "bookquiz:word-study:8003:round-2",
);

const guard = audio.createPronunciationGuard();
assert.equal(guard.shouldPlay("pattern:study:17", true), true);
assert.equal(guard.shouldPlay("pattern:study:17", true), false);
assert.equal(guard.shouldPlay("pattern:study:18", true), true);
assert.equal(guard.shouldPlay("pattern:study:19", false), false);
assert.equal(guard.currentToken(), "pattern:study:18");
guard.cancel();
assert.equal(guard.currentToken(), "");

console.log("automatic pronunciation model tests passed");

// 카드가 저절로 넘어가는 시간 — 원어민 소리가 끝나기 전에 넘기면 안 된다.
// 소리가 끝난 뒤에도 따라 읽을 틈(1.2초)을 준다.
assert.equal(audio.studyAdvanceDelay(0), 3200, "소리를 못 들려줬으면 예전처럼 3.2초를 기다린다");
assert.equal(audio.studyAdvanceDelay(2000), 1200, "짧은 소리는 끝난 뒤 따라 읽을 틈을 준다");
assert.equal(audio.studyAdvanceDelay(1200), 2000, "아주 짧은 소리도 카드는 최소 3.2초 머문다");
assert.equal(audio.studyAdvanceDelay(4080), 1200, "긴 문장은 소리가 다 끝난 뒤에 넘어간다");
assert.equal(audio.studyAdvanceDelay(-5), 3200, "이상한 값이 와도 기본 시간을 지킨다");
assert.equal(audio.studyAdvanceDelay(NaN), 3200);
assert.equal(audio.studyAdvanceDelay(999999), 1200, "소리가 끝나지 않아도 결국 넘어간다");
