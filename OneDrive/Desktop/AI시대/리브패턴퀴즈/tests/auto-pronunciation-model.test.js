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
