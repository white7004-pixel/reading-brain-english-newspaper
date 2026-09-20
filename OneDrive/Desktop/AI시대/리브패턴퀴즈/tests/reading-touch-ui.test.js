// 학습 화면(카드학습·북퀴즈)이 리딩터치 구성을 지키는지 본다.
// 계획: docs/superpowers/plans/2026-09-20-reading-touch-learning-mode.md
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "reading-touch.css"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

// --- Task 1: 뼈대 ---
assert.match(css, /\.rt-dock\s*\{[^}]*position:\s*sticky/, "아래 버튼 바는 화면 아래에 붙어 있어야 한다");
assert.match(css, /\.rt-step\[data-locked="true"\]/, "잠긴 단계 탭에 표시가 있어야 한다");
assert.match(css, /prefers-reduced-motion/, "움직임을 줄이는 설정을 존중해야 한다");
assert.ok(
  html.indexOf("reading-touch.css") > html.indexOf("viva-theme.css"),
  "학습 화면 스타일은 비바북 테마 뒤에 실려야 색을 덮어쓸 수 있다",
);
const rtVersion = html.match(/reading-touch\.css\?v=([^"']+)/)?.[1];
assert.ok(rtVersion, "index.html 이 reading-touch.css 를 버전과 함께 불러야 한다");
assert.ok(
  serviceWorker.includes(`/reading-touch.css?v=${rtVersion}`),
  "오프라인에서도 학습 화면이 같으려면 서비스워커가 현재 버전을 담아야 한다",
);

// --- Task 2: 카드학습 화면 ---
const studyView = html.slice(html.indexOf('id="studyView"'), html.indexOf('id="quizView"'));
assert.match(studyView, /class="rt-stage"/, "카드학습 가운데는 리딩터치 학습판이어야 한다");
assert.match(studyView, /id="studySpeakBtn"/, "학습판 오른쪽 위에 발음 버튼이 있어야 한다");
assert.match(studyView, /class="rt-dock"[\s\S]*id="prevButton"[\s\S]*id="nextButton"[\s\S]*<\/div>/,
  "이전·다음 버튼은 아래 고정 바 안에 있어야 한다");
assert.match(studyView, /id="cardEnglish"[^>]*class="[^"]*rt-word/, "영어 표현은 크게 보여 주는 자리에 있어야 한다");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert.match(app, /studySpeakBtn[\s\S]{0,200}addEventListener\("click"/, "발음 버튼이 실제로 발음을 재생해야 한다");
