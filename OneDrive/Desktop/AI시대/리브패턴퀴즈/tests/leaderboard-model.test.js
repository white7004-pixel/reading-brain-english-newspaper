const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const modelPath = path.join(__dirname, "..", "leaderboard-model.js");
assert.ok(fs.existsSync(modelPath), "leaderboard view model must exist");

const { buildLeaderboardView } = require(modelPath);

const leaders = [
  { name: "student01", displayName: "민지", points: 980, masteredCount: 20, reviewCount: 2 },
  { name: "student02", displayName: "준호", points: 870, masteredCount: 16, reviewCount: 4 },
  { name: "student03", displayName: "서연", points: 760, masteredCount: 14, reviewCount: 1 },
  { name: "student04", displayName: "도윤", points: 650, masteredCount: 11, reviewCount: 3 },
];

const view = buildLeaderboardView(leaders, "준호");
assert.deepEqual(view.podium.map((student) => student.rank), [1, 2, 3]);
assert.deepEqual(view.ranking.map((student) => student.rank), [4]);
assert.equal(view.podium[1].displayName, "준호");
assert.equal(view.podium[1].isCurrent, true);
assert.equal(view.podium[0].pointsText, "980 P");
assert.equal(view.podium[0].progressText, "마스터 20개 · 복습 2개");

const empty = buildLeaderboardView(null, "민지");
assert.deepEqual(empty, { podium: [], ranking: [] });

console.log("leaderboard model tests passed");
