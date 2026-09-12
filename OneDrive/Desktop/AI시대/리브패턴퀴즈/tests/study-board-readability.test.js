const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

assert.match(
  html,
  /id="verbCard"[^>]*class="[^"]*study-board[^"]*"[\s\S]*?id="verbEx1"[\s\S]*?id="verbEx3"/,
  "the verb study board must show the three forms and examples together",
);
assert.match(
  html,
  /id="bqCard"[^>]*class="[^"]*study-board[^"]*"[\s\S]*?id="bqCardEnglish"[\s\S]*?id="bqCardKorean"/,
  "the bookquiz study board must show English and Korean together",
);
assert.ok(!html.includes('id="bqCardBackEnglish"'), "the bookquiz study board must render its English expression only once");
assert.ok(!app.includes('$("#bqCardBackEnglish")'), "bookquiz rendering must update only the single visible English expression");
assert.doesNotMatch(html, /우리말\s*뜻/, "cards must show the Korean meaning without a redundant label");
assert.doesNotMatch(app, /#verbCard"\)\.classList\.toggle\("flipped"\)/, "verb cards must not hide examples behind a flip");
assert.doesNotMatch(app, /#bqCard"\)\.classList\.toggle\("flipped"\)/, "bookquiz cards must not hide meanings behind a flip");

const readabilityLayer = css.slice(css.lastIndexOf("LARGE STUDY BOARDS"));
assert.ok(readabilityLayer.length > 0, "the large study board style layer must exist");
assert.match(readabilityLayer, /\.verb-forms strong[\s\S]*?font-size:\s*clamp\(24px,/);
assert.match(readabilityLayer, /\.verb-examples p[\s\S]*?font-size:\s*clamp\(18px,/);
assert.match(readabilityLayer, /\.bq-card-english[\s\S]*?font-size:\s*clamp\(32px,/);
assert.match(readabilityLayer, /\.bq-card-korean[\s\S]*?font-size:\s*clamp\(22px,/);
assert.match(readabilityLayer, /@media \(max-width:\s*640px\)[\s\S]*?\.verb-forms[\s\S]*?grid-template-columns:\s*1fr/);

console.log("large study board readability tests passed");
