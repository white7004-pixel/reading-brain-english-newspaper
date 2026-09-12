const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const layer = css.slice(css.lastIndexOf("CARD CONTENT ALIGNMENT"));

assert.ok(layer.length > 0, "a final shared card alignment layer must exist");
assert.match(layer, /:is\(\.card-face,\s*\.quiz-panel,\s*\.verb-front,\s*\.bq-front\)[\s\S]*?align-items:\s*center/);
assert.match(layer, /:is\(#cardEnglish,\s*#quizQuestion,\s*#verbMeaningDisplay,\s*#bqCardEnglish\)[\s\S]*?max-width:\s*22ch[\s\S]*?text-align:\s*center/);
assert.match(layer, /:is\(#cardKorean,\s*#quizPrompt,\s*#verbMeaningDisplay,\s*#bqCardKorean\)[\s\S]*?text-align:\s*center/);
assert.match(layer, /:is\(\.verb-examples p,\s*\.review-row,\s*\.rank-student\)[\s\S]*?text-align:\s*left/);
assert.match(layer, /@media \(max-width:\s*640px\)[\s\S]*?padding-inline:\s*16px/);

console.log("card content alignment tests passed");
