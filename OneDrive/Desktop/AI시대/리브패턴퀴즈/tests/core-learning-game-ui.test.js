const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const readGitIndex = process.env.RB_TEST_GIT_INDEX === "1";

function readSource(name) {
  const sourcePath = path.join(root, name);
  if (!readGitIndex) return fs.readFileSync(sourcePath, "utf8");
  const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
  const gitPath = path.relative(gitRoot, sourcePath).split(path.sep).join("/");
  return execFileSync("git", ["show", `:${gitPath}`], { encoding: "utf8" });
}

const html = readSource("index.html");
const app = readSource("app.js");
const css = readSource("mint-galaxy.css");

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

for (const id of ["markKnownBtn", "markUnsureBtn", "speakButton", "prevButton", "nextButton", "newQuizButton"]) {
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
assert.match(
  css,
  /#studyView\s+\.quest-card\s+\.quest-card-english\s*\{[\s\S]*?font-size:\s*clamp\(32px,/,
  "English hierarchy must outrank the legacy .card-face h2 rule",
);
assert.match(
  css,
  /#studyView\s+\.quest-card\s+\.quest-card-meaning\s*\{[\s\S]*?font-size:\s*clamp\(20px,/,
  "the Korean meaning must remain secondary with matching effective specificity",
);
assert.match(
  css,
  /@media \(max-width:\s*640px\)[\s\S]*?#studyView\s+\.quest-card\s+\.quest-card-english\s*\{[\s\S]*?font-size:\s*clamp\(24px,/,
  "mobile English must stay at least 24px",
);
assert.match(
  css,
  /@media \(max-width:\s*640px\)[\s\S]*?#studyView\s+\.quest-card\s+\.quest-card-meaning\s*\{[\s\S]*?font-size:\s*clamp\(18px,/,
  "mobile Korean must stay visibly secondary",
);
assert.ok(
  html.indexOf("styles.css") < html.indexOf("mint-galaxy.css"),
  "the higher-specificity Mint Galaxy layer must load after legacy styles",
);
assert.match(css, /\.action-know[\s\S]*?background:\s*var\(--mg-mint\)/, "know actions must use Mint");
assert.match(css, /\.action-review[\s\S]*?background:\s*var\(--mg-coral\)/, "review actions must use Coral");
assert.match(css, /#speakButton[\s\S]*?background:\s*var\(--mg-sky\)/, "speech actions must use Sky");
assert.match(css, /\.answer-card\.correct[\s\S]*?background:\s*var\(--mg-mint\)/, "correct answers must use Mint");
assert.match(css, /\.answer-card\.wrong[\s\S]*?background:\s*var\(--mg-coral\)/, "wrong answers must use Coral");
assert.match(css, /:focus-visible/, "core game controls need keyboard focus treatment");
assert.match(
  css,
  /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?#quizView\s+#quizOptions\s+\.answer-card\s*\{[\s\S]*?transition:\s*none/,
  "reduced motion must override the high-specificity answer transition",
);
assert.match(
  css,
  /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?#quizView\s+#quizOptions\s+\.answer-card:hover:not\(:disabled\),[\s\S]*?#quizView\s+#quizOptions\s+\.answer-card:active:not\(:disabled\)[\s\S]*?transform:\s*none/,
  "reduced motion must override high-specificity hover and active transforms",
);

assert.ok(!app.includes("currentStudyCards"), "Task 5 must not limit learning to the first three cards");
assert.ok(!app.includes("SECTION_QUIZ_TARGET"), "Task 5 must not invent a five-question completion target");
assert.ok(!app.includes("flowProgress"), "Task 5 must not invent flow completion persistence");

const currentItem = functionSlice("function currentItem()", "function dashboardSnapshot");
assert.match(currentItem, /const items = filteredItems\(\);[\s\S]*?return items\[state\.index\];/, "currentItem must retain the full filtered scope");

const moveCard = functionSlice("function moveCard(step = 1)", "function markKnown(known)");
assert.match(moveCard, /if \(step > 0\) bumpDaily\("cards"\);/, "forward navigation must retain daily card progress");
assert.match(moveCard, /newIndex >= items\.length && state\.category !== "all"[\s\S]*?findNextSection/, "forward navigation must retain next-section behavior");

const markKnown = functionSlice("function markKnown(known)", "async function speakCurrent");
const markSavedAt = markKnown.indexOf("saveState();");
const markResultAt = markKnown.indexOf('ReadingBrainGameUI?.setMascot?.(known ? "correct" : "wrong")');
const studyMoveAt = markKnown.indexOf("moveCard(1);");
assert.ok(markResultAt > markSavedAt, "study feedback must follow the existing state persistence");
assert.ok(markResultAt > studyMoveAt, "study feedback must follow the complete existing moveCard continuation");
assert.ok(!markKnown.includes('setMascot?.("complete")'), "study must not invent a completion hook without a base condition");

const checkQuiz = functionSlice("function checkQuiz(button, id)", "let mahjong");
const quizResultStateAt = checkQuiz.indexOf('const mascotState = id === state.quizAnswer ? "correct" : "wrong";');
const quizSavedAt = checkQuiz.indexOf("saveState();");
const quizStatsAt = checkQuiz.indexOf("updateStats();", quizSavedAt);
const quizResultAt = checkQuiz.indexOf("ReadingBrainGameUI?.setMascot?.(mascotState)");
const quizIncrementAt = checkQuiz.indexOf("state.quizCount += 1;");
const quizContinuationAt = checkQuiz.indexOf("setTimeout(newQuiz, 950);");
assert.ok(quizResultStateAt >= 0 && quizResultStateAt < quizSavedAt, "quiz must safely capture the result before later state changes");
assert.ok(quizResultAt > quizStatsAt, "quiz feedback must follow existing grading, persistence, and stat updates");
assert.ok(quizContinuationAt > quizIncrementAt, "quiz feedback must retain scheduling of the next question");
assert.ok(quizResultAt > quizContinuationAt, "quiz feedback must follow the complete existing counter and next-question continuation");
assert.ok(!checkQuiz.includes('setMascot?.("complete")'), "quiz must not invent a completion hook without a base condition");

console.log("core learning game UI tests passed");
