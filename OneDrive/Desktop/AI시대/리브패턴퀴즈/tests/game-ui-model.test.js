const assert = require("node:assert/strict");

const { normalizeMascotState, feedbackFor } = require("../game-ui-model.js");

assert.equal(normalizeMascotState("guide"), "guide");
assert.equal(normalizeMascotState("COMPLETE"), "default");
assert.equal(normalizeMascotState(null), "default");

assert.deepEqual(feedbackFor("default"), { label: "함께 시작해 볼까요?", tone: "neutral" });
assert.deepEqual(feedbackFor("guide"), { label: "리브를 따라와요!", tone: "info" });
assert.deepEqual(feedbackFor("listening"), { label: "잘 듣고 있어요!", tone: "info" });
assert.deepEqual(feedbackFor("correct"), { label: "정답이에요! 별을 획득했어요!", tone: "success" });
assert.deepEqual(feedbackFor("wrong"), { label: "괜찮아요. 다시 확인해 봐요!", tone: "error" });
assert.deepEqual(feedbackFor("complete"), { label: "퀘스트 완료!", tone: "reward" });
assert.deepEqual(feedbackFor("not-a-state"), { label: "함께 시작해 볼까요?", tone: "neutral" });

console.log("game UI model tests passed");
