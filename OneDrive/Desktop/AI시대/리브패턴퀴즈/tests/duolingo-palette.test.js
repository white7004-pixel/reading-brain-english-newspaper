const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const paletteStart = css.lastIndexOf("SOFT INDIGO PALETTE");
const palette = css.slice(paletteStart);

assert.ok(paletteStart >= 0, "the unified palette override must exist");
assert.ok(
  /styles\.css\?v=[^"']+/.test(html),
  "the page must invalidate cached CSS for the soft indigo theme",
);
assert.ok(html.includes('pattern-hub-model.js?v=20260819-open-interpret'), "flow model cache must be refreshed");
assert.match(html, /app\.js\?v=[^"']+/, "the app script must keep a cache-busting version");
assert.ok(!html.includes('id="pmodeInterpretLock"'), "interpretation must not show a locked badge");
assert.ok(!html.includes('id="interpretLocked"'), "interpretation must not render a locked screen");
assert.ok(!html.includes('id="markKnownBtn"'), "study must not show the known button");
assert.ok(!html.includes('id="markUnsureBtn"'), "study must not show the unsure button");

assert.match(
  html,
  /<div class="panel quiz-panel[^"]*">[\s\S]*?id="quizPrompt"/,
  "the section quiz must use its dedicated, evenly spaced card layout",
);
assert.match(
  css,
  /\.quiz-panel\s*\{[\s\S]*?padding:[^;]+;[\s\S]*?row-gap:[^;]+;/,
  "the section quiz card must provide breathing room around and between its content",
);
assert.match(
  css,
  /\.quiz-panel\s+#quizPrompt\s*\{[\s\S]*?margin:\s*0;[\s\S]*?line-height:[^;]+;/,
  "the section quiz prompt must not inherit crowding heading margins",
);
assert.match(
  css,
  /\.quiz-panel\s+\.options\s+button[\s\S]*?justify-content:\s*center;[\s\S]*?text-align:\s*center;/,
  "section quiz answers must center their labels",
);
assert.match(
  css,
  /#quizView\s+\.panel-head\s*\{[\s\S]*?justify-content:\s*center;[\s\S]*?text-align:\s*center;/,
  "the visible section quiz metadata must sit on the center axis",
);
assert.match(
  css,
  /#quizView\s+:is\(#quizScopeText,\s*#quizPrompt\)\s*\{[\s\S]*?text-align:\s*center\s*!important;/,
  "the visible section quiz scope and prompt must override legacy left alignment",
);
assert.match(
  css,
  /#quizView\s+#quizOptions\s+button\s*\{[\s\S]*?text-align:\s*center\s*!important;/,
  "the visible section quiz answers must override legacy left alignment",
);
assert.match(
  html,
  /<style id="quizAlignmentGuard">[\s\S]*?#quizView \.quiz-panel[\s\S]*?text-align: center !important;/,
  "quiz alignment must have an inline cache-proof guard",
);

const modeOrder = [...html.matchAll(/class="pmode-btn[^>]*data-pmode="([^"]+)"/g)].map(
  (match) => match[1],
);
assert.deepEqual(modeOrder, ["hub", "study", "quiz", "interpret"]);
assert.match(
  html,
  /id="leaderboardNavBtn"[^>]*data-mode="leaderboard"/,
  "ranking must live in the left sidebar",
);

for (const token of [
  "--joy-green: #5965d8",
  "--joy-green-dark: #434cad",
  "--joy-blue: #7b84d8",
  "--joy-red: #c76067",
  "--joy-grey: #d8dbe8",
  "--paper: #f8f8fa",
]) {
  assert.ok(palette.includes(token), `missing palette token: ${token}`);
}

for (const selector of [
  ".vtype-btn.active",
  ".vmode-btn.active",
  ".dashboard-metrics > div",
  ".option-grid button.correct",
  ".option-grid button.wrong",
  ".match-item.matched",
  ".match-item.selected",
  ".interpret-verdict.fail",
  ".interpret-result-actions .btn-primary",
  ".login-card button",
]) {
  assert.ok(palette.includes(selector), `palette does not cover ${selector}`);
}

for (const selector of [".option-grid button", ".match-item", ".blast-option"]) {
  const centeredRule = new RegExp(
    `${selector.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}[\\s\\S]*?text-align:\\s*center`,
  );
  assert.ok(centeredRule.test(palette), `${selector} text must be centered`);
}

for (const legacy of [
  "#f0b429",
  "#9c2127",
  "#2da89a",
  "#4caf50",
  "#2f80ed",
  "#e5484d",
  "#fff7dd",
  "#fdf6f3",
]) {
  assert.ok(!palette.toLowerCase().includes(legacy), `legacy color remains in palette override: ${legacy}`);
}

console.log("duolingo palette tests passed");
