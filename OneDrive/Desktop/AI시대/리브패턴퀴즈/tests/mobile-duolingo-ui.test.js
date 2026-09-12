const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = ["styles.css", "mint-galaxy.css"]
  .map((name) => fs.readFileSync(path.join(root, name), "utf8"))
  .join("\n");

const mobileModes = [...html.matchAll(/data-mobile-mode="([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(mobileModes, ["hub", "study", "quiz", "menu"]);
assert.match(html, /<nav class="mobile-bottom-nav\s+mg-bottom-nav"[^>]*aria-label="모바일 학습 메뉴"/);
assert.match(app, /function syncMobileBottomNav\(mode\)/);
assert.match(app, /\$\$\("\[data-mobile-mode\]"\)/);

const mobileLayer = css.slice(css.lastIndexOf("MOBILE DUOLINGO UI"));
assert.ok(mobileLayer.length > 0, "mobile redesign layer must exist");
for (const token of ["--game-green", "--game-blue", "--game-red", "--game-lip", "--bottom-nav-height"]) {
  assert.ok(mobileLayer.includes(token), `missing ${token}`);
}
assert.match(mobileLayer, /\.mobile-bottom-nav[\s\S]*?env\(safe-area-inset-bottom\)/);
assert.match(mobileLayer, /@media \(prefers-reduced-motion: reduce\)/);

for (const viewId of ["studyView", "quizView", "interpretView"]) {
  assert.match(html, new RegExp(`id="${viewId}"[\\s\\S]*?class="[^"]*game-surface`), `${viewId} must expose a game surface`);
}
assert.match(mobileLayer, /\.game-surface[\s\S]*?border-radius:\s*24px/);
assert.match(mobileLayer, /#quizView #quizOptions button[\s\S]*?min-height:\s*64px/);

assert.match(html, /styles\.css\?v=[^"']+/);
assert.match(html, /app\.js\?v=[^"']+/);

assert.match(css, /FULL CENTERED TYPOGRAPHY/);
assert.match(css, /main\s+:is\(\.topbar,\s*\.student-dashboard,\s*\.view\)\s*\{[\s\S]*?text-align:\s*center\s*!important;/);
assert.match(css, /main\s+\.panel-head\s*\{[\s\S]*?justify-content:\s*center\s*!important;/);
assert.match(css, /main\s+:is\(\.options button,\s*\.option-grid button,\s*\.mj-card,\s*\.match-item\)\s*\{[\s\S]*?text-align:\s*center\s*!important;/);
assert.match(css, /\.dashboard-main,[\s\S]*?\.dashboard-metrics\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*!important;/);
assert.ok(!html.includes('data-pmode="blast"'), "pattern blast navigation must be removed");
assert.ok(!html.includes('data-pmode="review"'), "pattern review navigation must be removed");
assert.ok(!html.includes('id="blastView"'), "pattern blast view must be removed");
assert.ok(!html.includes('id="reviewView"'), "pattern review view must be removed");
assert.ok(!html.includes('data-bqmode="blast"'), "bookquiz blast navigation must be removed");
assert.ok(!html.includes('id="bqBlastArea"'), "bookquiz blast section must be removed");
assert.ok(!html.includes('data-vmode="blast"'), "verb blast navigation must be removed");
assert.ok(!html.includes('id="verbBlastArea"'), "verb blast section must be removed");
assert.ok(!html.includes('id="dashboardReviewCount"'), "wrong-answer dashboard section must be removed");
assert.ok(!html.includes('data-pmode="match"'), "pattern match navigation must be removed");
assert.ok(!html.includes('id="matchView"'), "pattern match section must be removed");
assert.ok(!html.includes('data-bqmode="match"'), "bookquiz match navigation must be removed");
assert.ok(!html.includes('id="bqMatchArea"'), "bookquiz match section must be removed");
assert.ok(!html.includes('data-mobile-mode="match"'), "mobile match navigation must be removed");
assert.ok(!html.includes('data-quiz-type="cumulative"'), "cumulative quiz tab must be removed");
assert.ok(!html.includes('누적퀴즈'), "cumulative quiz label must be removed");
assert.ok(!html.includes('추천 학습 루틴'), "recommended routine section must be removed");
assert.ok(!html.includes('id="routineSteps"'), "dashboard routine host must be removed");
assert.ok(!html.includes('id="hubRoutineSteps"'), "hub routine host must be removed");
assert.ok(!html.includes('data-pmode="leaderboard"'), "ranking must be removed from the pattern tab bar");
assert.ok(html.includes('id="leaderboardNavBtn" data-mode="leaderboard"'), "ranking must be available in the left sidebar");
assert.ok(html.includes('id="dashboardProgressRing"'), "dashboard must include a compact circular progress chart");
assert.match(css, /COMPACT LEARNING DASHBOARD[\s\S]*?\.dashboard-progress-ring[\s\S]*?conic-gradient/);
assert.match(css, /\.student-dashboard \.dashboard-metrics[\s\S]*?repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
assert.match(app, /function currentStudyCards\(\)[\s\S]*?slice\(0,\s*3\)/);
assert.doesNotMatch(app, /function currentStudyGroup\(\)/);
assert.doesNotMatch(
  app,
  /function markKnown\([\s\S]*?setTimeout\(\(\) => setMode\("quiz"\)/,
  "finishing study cards must not force-open the quiz",
);
assert.match(
  app,
  /\$\("#nextButton"\)\.addEventListener\("click",\s*\(\) => moveCard\(1\)\)/,
  "the next button must move directly to the next study card",
);
assert.match(html, /id="pwaStatus"[^>]*aria-live="polite"/);
assert.match(html, /id="pwaInstallButton"[^>]*>앱 설치</);
assert.match(html, /id="pwaUpdateButton"[^>]*>업데이트 적용</);
assert.match(css, /\.pwa-status[\s\S]*?overflow-wrap:\s*anywhere/);
assert.match(css, /\.pwa-status button[\s\S]*?min-height:\s*48px/);
assert.match(app, /pwaApi\.createPwaController/);

console.log("mobile duolingo UI tests passed");
