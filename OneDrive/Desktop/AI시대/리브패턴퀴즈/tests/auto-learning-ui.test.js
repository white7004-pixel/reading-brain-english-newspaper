const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

assert.doesNotMatch(html, /id="speakButton"/);
assert.doesNotMatch(html, /id="bqSpeakBtn"/);
assert.match(html, /auto-pronunciation-model\.js/);
assert.match(html, /bookquiz-map-model\.js/);
assert.match(app, /function scheduleCardPronunciation\(/);
assert.match(
  app,
  /function scheduleCardPronunciation\([^)]*\) \{\s*if \(!pronunciationViewVisible\(/,
  "cards rendered behind the login or hub screen must stay silent",
);
assert.match(
  app,
  /function scheduleVerbFormsPronunciation\(verb\) \{\s*if \(!pronunciationViewVisible\("verb"\)\)/,
  "verb cards rendered off-screen must stay silent",
);
assert.match(app, /const NATIVE_AUDIO_MODE = "tts";/, "pattern cards must speak the current sentence instead of a stale numbered MP3");
assert.match(
  app,
  /async function speakExpression\(item, repeat = 1\)[\s\S]*?const text = cleanSpeechText\(item\?\.english \|\| ""\)[\s\S]*?await speakEnglish\(text, repeat\)/,
  "pattern pronunciation must pass the complete current English sentence to neural TTS",
);
assert.match(app, /scheduleCardPronunciation\(\{\s*section: "pattern"/);
assert.match(app, /scheduleCardPronunciation\(\{\s*section: "bookquiz"/);
assert.match(app, /function openBookquizNode\(nodeId/);
assert.match(app, /function completeBookquizNode\(nodeId/);
assert.match(app, /function startBookquizSecondRound\(/);
assert.match(app, /function finishBookquizTwoPassCourse\(/);
assert.match(app, /\$\$\("\[data-bookquiz-node\]"\)[\s\S]*?addEventListener\("click"/);
assert.match(app, /bookquizSecondRoundBtn[\s\S]*?addEventListener\("click", startBookquizSecondRound\)/);
assert.match(html, /id="bookquizLearningMap"/);
assert.match(html, /data-bookquiz-node="word-study"/);
assert.match(html, /data-bookquiz-node="pattern-quiz"/);
assert.doesNotMatch(app, /key === "s"\) \{ speakCurrent\(\); \}/);
const appVersion = html.match(/app\.js\?v=([^"']+)/)?.[1];
assert.ok(appVersion, "the page must version app.js");
assert.ok(serviceWorker.includes(`/app.js?v=${appVersion}`), "the service worker must cache the current app.js version");
assert.match(serviceWorker, /auto-pronunciation-model\.js/);
assert.match(serviceWorker, /bookquiz-map-model\.js/);

console.log("automatic learning UI tests passed");
