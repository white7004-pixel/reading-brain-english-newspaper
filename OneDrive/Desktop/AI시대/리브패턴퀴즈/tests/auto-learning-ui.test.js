const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

assert.doesNotMatch(html, /id="speakButton"/);
assert.match(html, /id="bqSpeakBtn"[^>]*class="rt-speak"/, "리딩터치 구성에서는 다시 듣기 버튼을 학습판에 둔다");
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

// 비바북 테마와 둥근 글꼴도 오프라인에서 똑같이 보여야 한다
const vivaVersion = html.match(/viva-theme\.css\?v=([^"']+)/)?.[1];
assert.ok(vivaVersion, "index.html must load viva-theme.css after the other stylesheets");
assert.ok(html.indexOf("viva-theme.css") > html.indexOf("mint-galaxy.css"), "viva-theme.css must load last so it wins ties");
assert.ok(serviceWorker.includes(`/viva-theme.css?v=${vivaVersion}`), "the service worker must cache the current viva-theme.css version");
assert.ok(serviceWorker.includes("/assets/fonts/jua-subset.woff2"), "the service worker must cache the Jua font");
assert.ok(fs.existsSync(path.join(root, "assets/fonts/jua-subset.woff2")), "the Jua font file must ship with the app");

// 카드 자동 넘김은 원어민 소리가 끝난 뒤에 예약되어야 한다.
assert.match(app, /const sound = scheduleCardPronunciation\(\{ section: "pattern"/, "카드학습은 발음 재생을 기다릴 수 있어야 한다");
assert.match(app, /scheduleStudyCardAdvance\(sound\)/, "자동 넘김에 그 소리를 넘겨야 한다");
assert.match(app, /autoPronunciation\.studyAdvanceDelay\?\./, "기다리는 시간은 모델이 정한다");
assert.match(app, /STUDY_CARD_SOUND_WAIT_CAP/, "소리가 끝나지 않아도 결국 넘어가야 한다");

// 오늘의 학습에서 '배운 것'으로 세는 카드는 화면에 떠 있던 그 카드여야 한다.
assert.match(app, /const item = currentItem\(\) \|\| cards\[dailyCourse\.itemIndex % cards\.length\]/,
  "화면의 카드를 그대로 기록해야 한다");
assert.match(app, /if \(total\) state\.index = \(Number\(course\.itemIndex\) \|\| 0\) % total;/,
  "이어서 할 카드부터 보여 줘야 한다");
