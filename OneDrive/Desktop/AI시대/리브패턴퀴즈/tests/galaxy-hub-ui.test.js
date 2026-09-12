const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");

assert.match(
  app,
  /function renderPathUnit\(unit, currentKey\)[\s\S]*?class="planet-node status-\$\{section\.pathStatus\}/,
  "each rendered section must remain selectable by data-section and expose its lock state",
);
assert.ok(app.includes('data-section="${escapeHtml(section.key)}"'), "planet buttons must keep data-section");
assert.ok(app.includes('disabled aria-disabled=\\"true\\"'), "locked planet buttons must preserve aria-disabled");
assert.match(
  app,
  /const hubPath = \$\("#hubPath"\)[\s\S]*?event\.target\.closest\("\.planet-button"\)[\s\S]*?selectSection\(node\.dataset\.section, "study"\)/,
  "clicking an unlocked planet must open its study section",
);

assert.match(
  app,
  /function planetStatus\(section\)[\s\S]*?"\\uC644\\uB8CC"[\s\S]*?"\\uC7A0\\uAE40"[\s\S]*?\$\{section\.percent\}%[\s\S]*?function renderPathUnit\(unit, currentKey\)[\s\S]*?planet-status-icon[\s\S]*?planet-status-text/,
  "each planet status must include an icon and a text alternative",
);

assert.match(
  app,
  /return `\s*<section class="galaxy-map[\s\S]*?<ol class="galaxy-map-nodes">/,
  "path units must render as a semantic galaxy map",
);

for (const selector of [
  ".planet-node.status-locked",
  ".planet-node.status-learning",
  ".planet-node.status-done",
  ".planet-node.current",
]) {
  assert.match(css, new RegExp(selector.replaceAll(".", "\\.")), `missing ${selector} presentation`);
}

assert.match(css, /@media \(max-width:\s*640px\)[\s\S]*?\.galaxy-map-nodes\s*\{[\s\S]*?grid-template-columns:\s*1fr;/, "small screens need one planet column");

console.log("galaxy hub UI tests passed");
