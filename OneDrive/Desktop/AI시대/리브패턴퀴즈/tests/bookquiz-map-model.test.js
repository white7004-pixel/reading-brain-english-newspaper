const assert = require("node:assert/strict");
const model = require("../bookquiz-map-model.js");

let map = model.createMap();
assert.equal(map.round, 1);
assert.equal(map.maxRounds, 2);
assert.equal(map.currentNode, "word-study");
assert.equal(model.canOpenNode(map, "pattern-study"), false);

for (const node of model.NODES) map = model.completeNode(map, node);
assert.equal(map.roundCompleted, true);
assert.equal(map.allRoundsCompleted, false);
assert.equal(map.rewardApplied, false);

map = model.startSecondRound(map);
assert.equal(map.round, 2);
assert.equal(map.currentNode, "word-study");
assert.deepEqual(map.completedStageIds, []);

for (const node of model.NODES) map = model.completeNode(map, node);
assert.equal(map.round, 2);
assert.equal(map.allRoundsCompleted, true);
assert.equal(map.rewardApplied, false);

const reviewed = model.openReview(map, "word-quiz");
assert.equal(reviewed.reviewNode, "word-quiz");
assert.equal(reviewed.round, 2);
assert.equal(reviewed.allRoundsCompleted, true);
assert.equal(reviewed.rewardApplied, false);

const recovered = model.resumeMap({
  ...map,
  round: 3,
  currentNode: "unknown",
  completedStageIds: ["word-study", "unknown", "word-study"],
});
assert.equal(recovered.round, 2);
assert.equal(recovered.currentNode, "pattern-quiz");
assert.deepEqual(recovered.completedStageIds, ["word-study"]);

console.log("bookquiz map model tests passed");
