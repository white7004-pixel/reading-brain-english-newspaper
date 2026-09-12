const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));

assert.equal(manifest.id, "/reading-brain");
assert.equal(manifest.start_url, "/");
assert.equal(manifest.scope, "/");
assert.equal(manifest.display, "standalone");
assert.equal(manifest.theme_color, "#2f3651");

for (const icon of manifest.icons) {
  const file = path.join(root, icon.src.replace(/^\//, ""));
  assert.ok(fs.statSync(file).size > 1000, `${icon.src} must contain a real icon`);
}
assert.ok(manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose.includes("maskable")));

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(html, /rel="manifest" href="manifest\.webmanifest"/);
assert.match(html, /rel="apple-touch-icon" href="assets\/icons\/apple-touch-icon\.png"/);

console.log("PWA installability tests passed");
