const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

assert.match(html, /id="bqQuizArea"[\s\S]*?class="panel bq-quest-card game-surface"/);
assert.ok(!html.includes('id="bqMascot"'), "bookquiz must not duplicate the shared Liv mascot");
assert.match(html, /id="livGuide"[^>]*aria-live="polite"[\s\S]*?class="liv-mascot"/);
assert.match(html, /class="bq-question-bubble"[\s\S]*?id="bqQuizQuestion"/);
assert.ok(!html.includes('id="bqQuizSpeakBtn"'), "word quizzes play pronunciation automatically without a duplicate button");

assert.match(css, /\.book-quest[\s\S]*?box-shadow/);
assert.match(css, /#bqQuizArea \.bq-question-stage\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*640px\)[\s\S]*?justify-content:\s*center/);
assert.match(css, /#bqQuizArea \.bq-question-bubble::before\s*\{[\s\S]*?display:\s*none/);
assert.match(css, /#bqQuizArea #bqQuizQuestion[\s\S]*?overflow-wrap:\s*anywhere/);
assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);

assert.match(app, /function newBQQuiz\(\)[\s\S]*?ReadingBrainGameUI\?\.setMascot\?\.\("guide"/);
assert.match(app, /function newBQQuiz\(\)[\s\S]*?speakBookquizItem\(item\);[\s\S]*?function /, "the word/expression must be spoken automatically as soon as the question renders");
assert.match(app, /"뜻에 맞는 영어 단어는\?"[\s\S]*?"이 영어 단어의 뜻은\?"/);
assert.match(app, /"뜻에 맞는 영어 표현은\?"[\s\S]*?"이 영어 표현의 뜻은\?"/);
assert.match(app, /function checkBQAnswer[\s\S]*?ReadingBrainGameUI\?\.setMascot\?\.\(selectedId === correctId \? "correct" : "wrong"\)/);
const answerFlow = app.slice(app.indexOf("function checkBQAnswer"), app.indexOf("async function init()"));
const countAdvanceAt = answerFlow.indexOf("state.bqQuizCount += 1;");
const nextQuestionAt = answerFlow.indexOf("scheduleCourseAdvance(advanceToken, 1100, () =>");
assert.ok(countAdvanceAt >= 0, "answering must advance the Bookquiz question number");
assert.ok(nextQuestionAt > countAdvanceAt, "answering must schedule one guarded Bookquiz question after feedback");

console.log("bookquiz 3D quiz tests passed");
