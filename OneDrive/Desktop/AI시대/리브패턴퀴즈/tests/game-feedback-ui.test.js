const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const theme = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");

assert.match(app, /function renderLeaderboard[\s\S]*?catch \(error\)[\s\S]*?랭킹을 불러오지 못했어요[\s\S]*?setMascot\?\.\("wrong"/);
assert.match(app, /function newBQQuiz[\s\S]*?if \(!pool\.length\)[\s\S]*?학습 데이터가 없어요[\s\S]*?setMascot\?\.\("wrong"/);
assert.match(app, /function speakEnglish[\s\S]*?발음을 재생하지 못했어요[\s\S]*?setMascot\?\.\("wrong"/);
assert.match(app, /if \(!supported\)[\s\S]*?음성 인식을 사용할 수 없어 자가 채점으로 진행해요[\s\S]*?setMascot\?\.\("wrong"/);

assert.match(theme, /\.mg-empty-state/);
assert.match(theme, /\.mg-error-state/);
assert.match(theme, /\.mg-error-state::before[\s\S]*?content:/, "error feedback needs a non-color cue");
assert.match(theme, /\.mg-empty-state::before[\s\S]*?content:/, "empty feedback needs a non-color cue");

console.log("game feedback UI tests passed");
