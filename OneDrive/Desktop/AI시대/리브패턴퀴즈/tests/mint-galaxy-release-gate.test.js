const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const theme = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");

assert.match(theme, /@media \(max-width:\s*360px\)/);
assert.match(theme, /@media \(prefers-reduced-motion:\s*reduce\)/);
assert.match(theme, /:focus-visible[\s\S]*?outline/);
assert.match(theme, /padding-bottom:[^;]*env\(safe-area-inset-bottom\)/);
assert.ok(!html.match(/https?:\/\/[^"']+\.(woff2?|ttf|glb|gltf)/i));

assert.match(html, /id="livGuide"[^>]*aria-live="polite"/);
assert.match(html, /class="liv-mascot"[^>]*aria-hidden="true"/);
assert.match(theme, /\.mg-button[\s\S]*?min-height:\s*56px/);
assert.match(theme, /\.mobile-bottom-item[\s\S]*?min-height:\s*56px/);
assert.match(theme, /\.mg-chip[\s\S]*?min-height:\s*(?:3[2-9]|[4-9]\d)px/);

console.log("mint galaxy release gate tests passed");
