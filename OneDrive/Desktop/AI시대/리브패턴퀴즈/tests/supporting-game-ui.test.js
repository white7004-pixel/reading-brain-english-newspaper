const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const theme = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");

const verbForms = html.match(/<div class="verb-orb">[\s\S]*?<\/div>/g) || [];
assert.equal(verbForms.length, 3, "all three verb forms must share the verb-orb component");
assert.equal((html.match(/class="vf-speak-btn"/g) || []).length, 0, "verb forms must not have individual listen buttons");
assert.equal((html.match(/id="verbAllSpeakBtn"/g) || []).length, 1, "verb cards must keep one listen-all button");
assert.match(html, /class="verb-examples quest-journal"/, "verb examples must use the quest journal");

assert.match(html, /id="verbQuizForms"/, "verb quizzes need a three-form question row");
for (const id of ["verbQuizBase", "verbQuizPast", "verbQuizPP"]) {
  assert.match(html, new RegExp(`id="${id}"`), `verb quizzes need ${id}`);
}
assert.match(
  app,
  /function renderVerbQuizForms\(item, ask\)[\s\S]*?\["past"[\s\S]*?\["pp"[\s\S]*?form === ask/,
  "verb quizzes must place a blank in the requested past or past-participle position",
);
assert.match(
  app,
  /function checkVerbQuiz\(button, answer\)[\s\S]*?verbQuizBlank[\s\S]*?textContent = answer/,
  "selecting an answer must fill the visible blank",
);

assert.equal((html.match(/id="bqCardEnglish"/g) || []).length, 1, "bookquiz needs one English prompt");
assert.equal((html.match(/id="bqCardKorean"/g) || []).length, 1, "bookquiz needs one Korean meaning");
assert.ok(!html.includes("우리말 뜻"), "bookquiz must not add a redundant Korean-meaning label");
assert.match(html, /id="bqCard"[^>]*class="[^"]*rt-stage[^"]*"/, "bookquiz cards use the Reading Touch stage");
assert.ok(!html.includes('id="bqMascot"'), "bookquiz must reuse the shared Liv guide");
assert.match(app, /function checkBQAnswer[\s\S]*?ReadingBrainGameUI\?\.setMascot\?\.\(/, "bookquiz answers must update shared Liv feedback");

assert.match(html, /id="leaderboardPodium"[^>]*class="[^"]*space-podium[^"]*"/, "the top three need a space podium");
assert.match(html, /id="leaderboardList"[^>]*class="[^"]*explorer-ranking[^"]*"/, "the remaining ranks need the explorer list");
assert.match(app, /student\.isCurrent\s*\?\s*"is-current"/, "current-student highlighting must remain");
assert.match(app, /current-student-badge/, "current students need a non-color badge");

assert.match(app, /function canUseOnlineSpeech\(\)[\s\S]*?navigator\.onLine !== false/);
assert.match(app, /function showOfflineSpeechMessage\(\)[\s\S]*?음성은 인터넷 연결 시 이용할 수 있어요\./);
for (const functionName of ["speakExpression", "speakBookquizItem", "speakVerb", "speakAllVerbForms"]) {
  const start = app.indexOf(`async function ${functionName}`);
  assert.ok(start >= 0, `${functionName} must exist`);
  const body = app.slice(start, app.indexOf("\n}", start) + 2);
  assert.match(body, /canUseOnlineSpeech\(\)/, `${functionName} must stop before online audio when offline`);
}

assert.match(app, /function scheduleVerbFormsPronunciation\(verb\)/, "verb cards need a dedicated automatic three-form pronunciation scheduler");
const renderVerbCardStart = app.indexOf("function renderVerbCard()");
const renderVerbCardBody = app.slice(renderVerbCardStart, app.indexOf("\n}", renderVerbCardStart) + 2);
assert.match(
  renderVerbCardBody,
  /scheduleVerbFormsPronunciation\(verb\)/,
  "rendering a verb card must schedule base, past, and past-participle pronunciation",
);
assert.match(
  app,
  /async function speakAllVerbForms\(button = null, verb = currentVerb\(\)\)[\s\S]*?\["base"[\s\S]*?\["past"[\s\S]*?\["pp"/,
  "automatic three-form pronunciation must keep the base, past, pp order for the rendered card",
);

for (const selector of [".verb-orb", ".quest-journal", ".book-quest", ".space-podium", ".explorer-ranking"]) {
  assert.ok(theme.includes(selector), `missing final-theme selector ${selector}`);
}

console.log("supporting game UI tests passed");
