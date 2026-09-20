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

for (const id of ["prevButton", "nextButton", "newQuizButton"]) {
  assert.ok(html.includes(`id="${id}"`), `the existing ${id} action hook must remain`);
}
assert.ok(!html.includes('id="speakButton"'), "study cards autoplay pronunciation without a duplicate button");
assert.ok(!html.includes('id="markKnownBtn"'), "the streamlined study view must not restore the known button");
assert.ok(!html.includes('id="markUnsureBtn"'), "the streamlined study view must not restore the unsure button");

// 카드학습은 리딩터치 구성으로 바뀌었다: 뒤집는 카드 대신 큰 단어가 놓인 학습판이다.
assert.match(html, /class="[^"]*rt-stage[^"]*"[^>]*id="flashcard"/, "the study sentence needs a Reading Touch stage");
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
// 정답은 주색과 갈라 둔다. 주색으로 칠하면 '맞았다'가 신호로 읽히지 않는다.
assert.match(css, /\.answer-card\.correct[\s\S]*?background:\s*var\(--game-green\)/, "correct answers must use the success green");
assert.match(css, /\.answer-card\.wrong[\s\S]*?background:\s*var\(--game-red\)/, "wrong answers must use the error red");
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

const currentItem = functionSlice("function currentItem()", "function dashboardSnapshot");
assert.match(currentItem, /const cards = currentStudyCards\(\);[\s\S]*?return cards\[state\.index\];/, "currentItem must use the mobile study set");
assert.match(app, /const PATTERN_SESSION_SIZE = 3;/, "pattern study and quiz must share a three-item session size");
assert.match(app, /return gameItems\(\)\.slice\(0, PATTERN_SESSION_SIZE\)\.map/, "the daily pattern course must use the same three items as card study");
assert.match(app, /const SECTION_QUIZ_TARGET = PATTERN_SESSION_SIZE;/, "the free pattern quiz must end after the same three items");

const moveCard = functionSlice("function moveCard(step = 1)", "function markKnown(known)");
assert.match(moveCard, /if \(step > 0\) bumpDaily\("cards"\);/, "forward navigation must retain daily card progress");
assert.match(moveCard, /newIndex >= cards\.length[\s\S]*?setMode\("quiz"\)/, "reaching the last card and pressing next must lead straight into the quiz");

const markKnown = functionSlice("function markKnown(known)", "async function speakCurrent");
const markSavedAt = markKnown.indexOf("saveState();");
const markResultAt = markKnown.indexOf('ReadingBrainGameUI?.setMascot?.(known ? "correct" : "wrong")');
const studyMoveAt = markKnown.indexOf("moveCard(1);");
assert.ok(markResultAt > markSavedAt, "study feedback must follow the existing state persistence");
assert.ok(studyMoveAt >= 0, "free study must retain the existing moveCard continuation");
assert.match(markKnown, /progressDailyAnswer\("pattern"[\s\S]*?setMascot/, "daily study must advance its course before feedback");
assert.match(markKnown, /currentStudyCards\(\)\.every[\s\S]*?setMascot\?\.\("complete"\)/, "study completion must follow mastery of the compact set");

const checkQuiz = functionSlice("function checkQuiz(button, id)", "let mahjong");
const quizItems = functionSlice("function quizItems()", "function quizTitle()");
const newQuiz = functionSlice("function newQuiz()", "function checkQuiz(button, id)");
assert.match(quizItems, /return currentStudyCards\(\);/, "pattern quiz questions must come from the same three cards as study");
assert.match(
  newQuiz,
  /pool\[\(state\.quizCount - 1\) % pool\.length\]/,
  "free pattern quiz must ask each studied card in order without random repeats",
);
assert.match(newQuiz, /makeOptions\(item, optionKey, gameItems\(\)\)/, "quiz distractors may use the wider section without changing the studied question set");
const quizResultStateAt = checkQuiz.indexOf('const mascotState = id === state.quizAnswer ? "correct" : "wrong";');
const quizSavedAt = checkQuiz.indexOf("saveState();");
const quizStatsAt = checkQuiz.indexOf("updateStats();", quizSavedAt);
const quizResultAt = checkQuiz.indexOf("ReadingBrainGameUI?.setMascot?.(mascotState)");
const quizIncrementAt = checkQuiz.indexOf("state.quizCount += 1;");
const quizContinuationAt = checkQuiz.indexOf("scheduleCourseAdvance(advanceToken, nextQuizDelay, () =>");
assert.ok(quizResultStateAt >= 0 && quizResultStateAt < quizSavedAt, "quiz must safely capture the result before later state changes");
assert.ok(quizResultAt > quizStatsAt, "quiz feedback must follow existing grading, persistence, and stat updates");
assert.ok(quizContinuationAt > quizIncrementAt, "quiz feedback must use guarded scheduling for the next question");
assert.ok(quizResultAt > quizContinuationAt, "quiz feedback must follow the complete existing counter and next-question continuation");
assert.match(checkQuiz, /quizCount >= SECTION_QUIZ_TARGET[\s\S]*?setMascot\?\.\("complete"\)/, "quiz completion must use the configured target");
assert.match(
  checkQuiz,
  /const nextQuizDelay = id === state\.quizAnswer \? 0 : 950;[\s\S]*?scheduleCourseAdvance\(advanceToken, nextQuizDelay, \(\) =>/,
  "a correct pattern answer must schedule the next quiz immediately",
);

const saveState = functionSlice("function saveState()", "function learningCatalog()");
assert.match(saveState, /queueProgressEvent\(progressPayload\(\)\)/, "progress must enter the durable queue before syncing");
assert.doesNotMatch(saveState, /apiRequest\("\/api\/progress"/, "saveState must not bypass the offline queue");
assert.match(app, /function queueProgressEvent\(payload\)/, "the app needs one durable progress enqueue boundary");
const syncPendingProgress = functionSlice("function syncPendingProgress()", "function cancelScheduledCourseAdvance()");
assert.match(syncPendingProgress, /offlineSync\.nextBatch/, "sync must preserve queue order");
assert.match(syncPendingProgress, /acknowledgedEventIds/, "sync must wait for explicit server acknowledgement");
assert.match(syncPendingProgress, /offlineSync\.acknowledge/, "only acknowledged events may leave the queue");
assert.match(app, /addEventListener\("online",[\s\S]*?syncPendingProgress/, "reconnection must retry queued progress");

console.log("core learning game UI tests passed");
