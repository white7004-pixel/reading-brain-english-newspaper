const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

assert.match(html, /class="[^"]*app-shell[^"]*mg-app-shell[^"]*"/);
assert.match(html, /class="[^"]*sidebar[^"]*mg-sidebar[^"]*"/);
assert.match(html, /class="[^"]*topbar[^"]*mg-topbar[^"]*"/);
assert.match(html, /class="[^"]*mobile-bottom-nav[^"]*mg-bottom-nav[^"]*"/);

const mobileDestinations = [...html.matchAll(/data-mobile-mode="([^"]+)"[\s\S]*?<span>([^<]+)<\/span>/g)]
  .map((match) => [match[1], match[2]]);
assert.deepEqual(mobileDestinations, [
  ["hub", "홈"],
  ["study", "학습"],
  ["quiz", "해석"],
  ["menu", "전체"],
]);

assert.match(css, /\.mg-bottom-nav[\s\S]*?env\(safe-area-inset-bottom\)/);
assert.match(css, /--bottom-nav-height:\s*\d+px/);
assert.match(css, /\.mg-bottom-nav[\s\S]*?\.mobile-bottom-item[\s\S]*?min-height:\s*56px/);
assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.mg-sidebar[\s\S]*?transform:\s*translateX\(-100%\)/);
assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?main[\s\S]*?env\(safe-area-inset-bottom\)/);
assert.match(app, /window\.ReadingBrainGameUI\?\.setMode\?\.\(mode\)/);

console.log("mint galaxy shell tests passed");
