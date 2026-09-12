const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const cssPath = path.join(root, "mint-galaxy.css");
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf8") : "";

const stylesLink = html.indexOf('<link rel="stylesheet" href="styles.css');
const mintLink = html.indexOf('<link rel="stylesheet" href="mint-galaxy.css');
assert.ok(stylesLink >= 0, "the existing styles.css link must remain present");
assert.ok(mintLink > stylesLink, "Mint Galaxy CSS must follow the existing styles.css link");

for (const token of [
  "--mg-ink: #0F172A",
  "--mg-mint: #2563EB",
  "--mg-sky: #0EA5E9",
  "--mg-star: #F59E0B",
  "--mg-coral: #DC2626",
  "--mg-bg: #EFF6FF",
  "--mg-surface: #FFFFFF",
  "--mg-line: #E4ECFC",
  "--mg-radius-sm: 16px",
  "--mg-radius-md: 20px",
  "--mg-radius-lg: 28px",
  "--mg-depth-sm: 4px",
  "--mg-depth-md: 6px",
  "--mg-depth-lg: 8px",
]) assert.ok(css.includes(token), `missing Mint Galaxy token: ${token}`);

for (const selector of [".mg-surface", ".mg-card", ".mg-button", ".mg-chip", ".mg-star", ".mg-focus-ring", ".mg-speech-bubble"]) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(css, new RegExp(`${escapedSelector}\\s*(?:,|\\{)`), `missing shared selector: ${selector}`);
}

assert.match(css, /\.mg-button\s*\{[\s\S]*?min-height:\s*56px[\s\S]*?box-shadow:/);
assert.match(css, /\.mg-button:active\s*\{[\s\S]*?transform:\s*translateY\([^)]*\)/);
assert.match(css, /\.mg-focus-ring(?::focus|:focus-visible)?[\s\S]*?outline:/);
assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);

console.log("mint galaxy theme tests passed");
