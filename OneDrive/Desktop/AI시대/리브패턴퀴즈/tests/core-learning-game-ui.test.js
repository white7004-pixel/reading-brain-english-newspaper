const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");

function functionSlice(start, end) {
  const startIndex = app.indexOf(start);
  const endIndex = app.indexOf(end, startIndex);
  assert.ok(startIndex >= 0 && endIndex > startIndex, `cannot isolate ${start}`);
  return app.slice(startIndex, endIndex);
}

assert.match(
  html,
  /id="studyView"[\s\S]*?<div class="[^"]*mg-surface[^"]*"/,
  "card learning must live on a Mint Galaxy surface",
);
assert.match(
  html,
  /id="quizView"[\s\S]*?<div class="[^"]*mg-surface[^"]*"/,
  "the section quiz must live on a Mint Galaxy surface",
);

assert.equal((html.match(/id="cardEnglish"/g) || []).length, 1, "the study card needs one main English element");
assert.ok(!html.includes('id="cardBackEnglish"'), "the study card must not visually duplicate its English sentence");
assert.ok(!app.includes("cardBackEnglish"), "renderStudy must update only the single English sentence");
assert.ok(!html.includes("우리말뜻"), "the Korean meaning must not gain a redundant label");

for (const id of ["speakButton", "prevButton", "nextButton", "newQuizButton"]) {
  assert.ok(html.includes(`id="${id}"`), `the existing ${id} action hook must remain`);
}

assert.match(html, /class="[^"]*quest-card[^"]*"[^>]*id="flashcard"/, "the study sentence needs a quest card");
assert.match(html, /id="quizOptions"[^>]*class="[^"]*answer-grid[^"]*"/, "quiz choices need the answer grid hook");
assert.match(app, /button\.className\s*=\s*"answer-card"/, "generated quiz choices need the answer card hook");

assert.match(css, /\.answer-card\s*\{[\s\S]*?min-height:\s*68px\s*;/, "answer cards need a 68px touch target");
assert.match(
  css,
  /#quizView\s+#quizOptions\s+\.answer-card\s*\{[\s\S]*?min-height:\s*68px\s*;/,
  "the 68px answer target must outrank legacy quiz selectors",
);
assert.match(css, /\.quest-card-english\s*\{[\s\S]*?font-size:\s*clamp\(32px,/, "English must be the largest card text");
assert.match(
  css,
  /@media \(max-width:\s*640px\)[\s\S]*?\.quest-card-english\s*\{[\s\S]*?font-size:\s*clamp\(24px,/,
  "mobile English must stay at least 24px",
);
assert.match(css, /\.action-know[\s\S]*?background:\s*var\(--mg-mint\)/, "know actions must use Mint");
assert.match(css, /\.action-review[\s\S]*?background:\s*var\(--mg-coral\)/, "review actions must use Coral");
assert.match(css, /#speakButton[\s\S]*?background:\s*var\(--mg-sky\)/, "speech actions must use Sky");
assert.match(css, /\.answer-card\.correct[\s\S]*?background:\s*var\(--mg-mint\)/, "correct answers must use Mint");
assert.match(css, /\.answer-card\.wrong[\s\S]*?background:\s*var\(--mg-coral\)/, "wrong answers must use Coral");
assert.match(css, /:focus-visible/, "core game controls need keyboard focus treatment");
assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/, "core game motion needs a reduced-motion fallback");

const markKnown = functionSlice("function markKnown(known)", "async function speakCurrent");
const markSavedAt = markKnown.indexOf("saveState();");
const markResultAt = markKnown.indexOf('ReadingBrainGameUI?.setMascot?.(known ? "correct" : "wrong")');
const studyCompleteAt = markKnown.indexOf('completeFlowStep("study")');
const mascotCompleteAt = markKnown.indexOf('ReadingBrainGameUI?.setMascot?.("complete")');
assert.ok(markResultAt > markSavedAt, "study feedback must follow the existing state persistence");
assert.ok(mascotCompleteAt > studyCompleteAt, "study completion feedback must follow the existing completion update");
assert.match(
  markKnown,
  /if \(known && currentStudyCards\(\)\.every[\s\S]*?completeFlowStep\("study"\)[\s\S]*?setMascot\?\.\("complete"\)/,
  "study completion feedback must remain guarded by the mastered-card condition",
);

const checkQuiz = functionSlice("function checkQuiz(button, id)", "let mahjong");
const quizSavedAt = checkQuiz.indexOf("saveState();");
const quizStatsAt = checkQuiz.indexOf("updateStats();", quizSavedAt);
const quizResultAt = checkQuiz.indexOf('ReadingBrainGameUI?.setMascot?.(id === state.quizAnswer ? "correct" : "wrong")');
const quizCompleteAt = checkQuiz.indexOf('completeFlowStep("quiz")');
const quizMascotCompleteAt = checkQuiz.indexOf('ReadingBrainGameUI?.setMascot?.("complete")');
assert.ok(quizResultAt > quizStatsAt, "quiz feedback must follow existing grading, persistence, and stat updates");
assert.ok(quizMascotCompleteAt > quizCompleteAt, "quiz completion feedback must stay inside and follow its completion update");
assert.match(
  checkQuiz,
  /if \(\(!state\.quizType \|\| state\.quizType === "section"\) && state\.quizCount >= SECTION_QUIZ_TARGET\)[\s\S]*?completeFlowStep\("quiz"\)[\s\S]*?setMascot\?\.\("complete"\)/,
  "quiz completion must remain scoped to the existing section-quiz target",
);

console.log("core learning game UI tests passed");
