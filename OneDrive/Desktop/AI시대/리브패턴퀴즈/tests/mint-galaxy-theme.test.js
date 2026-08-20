const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const cssPath = path.join(root, "mint-galaxy.css");
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf8") : "";

assert.match(html, /<link rel="stylesheet" href="styles\.css\?v=20260820-quiz-button-fix"\s*\/?>[\s\S]*?<link rel="stylesheet" href="mint-galaxy\.css\?v=20260821"\s*\/?>/);

for (const token of [
  "--mg-ink: #24345B",
  "--mg-mint: #35C6A8",
  "--mg-sky: #4DB8FF",
  "--mg-star: #FFC857",
  "--mg-coral: #FF6B6B",
  "--mg-bg: #F5F8FC",
  "--mg-surface: #FFFFFF",
  "--mg-line: #DDE5EF",
  "--mg-radius-sm: 16px",
  "--mg-radius-md: 20px",
  "--mg-radius-lg: 28px",
  "--mg-depth-sm: 4px",
  "--mg-depth-md: 6px",
  "--mg-depth-lg: 8px",
]) assert.ok(css.includes(token), `missing Mint Galaxy token: ${token}`);

for (const selector of [".mg-surface", ".mg-card", ".mg-button", ".mg-chip", ".mg-star", ".mg-focus-ring", ".mg-speech-bubble"]) {
  assert.match(css, new RegExp(`\\${selector}\\s*\\{`), `missing shared selector: ${selector}`);
}

assert.match(css, /\.mg-button\s*\{[\s\S]*?min-height:\s*56px[\s\S]*?box-shadow:/);
assert.match(css, /\.mg-button:active\s*\{[\s\S]*?transform:\s*translateY\([^)]*\)/);
assert.match(css, /\.mg-focus-ring(?::focus|:focus-visible)?[\s\S]*?outline:/);
assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);

console.log("mint galaxy theme tests passed");
