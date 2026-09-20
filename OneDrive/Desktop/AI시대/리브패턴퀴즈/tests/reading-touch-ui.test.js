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

// --- Task 3: 북퀴즈 단계 탭 + A·B·C·D 보기 ---
const bookquizView = html.slice(html.indexOf('id="bookquizView"'), html.indexOf('id="verbView"'));
assert.match(bookquizView, /class="rt-steps"/, "북퀴즈 4단계는 가로 단계 탭이어야 한다");
assert.match(bookquizView, /class="rt-step"[^>]*data-bookquiz-node="word-study"/, "단계 탭은 기존 단계 버튼을 그대로 쓴다");
assert.match(bookquizView, /id="bqQuizOptions"[^>]*class="[^"]*rt-choices/, "북퀴즈 보기는 A·B·C·D 알약이어야 한다");
assert.match(bookquizView, /class="rt-stage"/, "북퀴즈 카드도 리딩터치 학습판이어야 한다");
assert.match(
  app,
  /button\.dataset\.locked = String\(!bookquizMapModel\.canOpenNode/,
  "잠금 표시는 기존 단계 모델(canOpenNode)이 정한 그대로 따라야 한다",
);
assert.match(app, /dataset\.choice = "ABCD"/, "보기 버튼에 A·B·C·D 글자를 붙여야 한다");

// 보기 알약은 styles.css 의 옛 규칙(#bqQuizArea #bqQuizOptions button)보다 세야 실제로 보인다.
assert.match(
  css,
  /#bqQuizArea\s+#bqQuizOptions\.rt-choices\s+button\s*\{[\s\S]*?border-radius:\s*999px/,
  "보기 알약 모양이 옛 네모 규칙을 이겨야 한다",
);
assert.match(
  css,
  /#bqQuizArea\s+#bqQuizOptions\.rt-choices\s+button\s*\{[\s\S]*?text-align:\s*left\s*!important/,
  "보기 글은 A·B·C·D 옆에서 왼쪽으로 읽혀야 한다",
);
assert.match(
  css,
  /#bqQuizArea\s+#bqQuizOptions\.rt-choices\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  "보기는 한 줄에 하나씩 쌓여야 한다",
);

// --- 계획의 전역 제약 지키기 ---
// 색은 viva 토큰만 쓴다. 흰색(#fff)만 예외로 둔다 — 비바북 테마가 이미 카드 바탕으로 쓴다.
const hexes = [...css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase());
const strayHex = hexes.filter((h) => h !== "#fff" && h !== "#ffffff");
assert.deepEqual(strayHex, [], `새 색을 하드코딩하지 않는다. 발견: ${strayHex.join(", ")}`);

// 눌렀을 때 내려앉는 움직임도 '움직임 줄이기' 설정에서 멈춰야 한다.
const reduceBlock = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
assert.match(reduceBlock, /\.rt-speak:active[\s\S]{0,120}transform:\s*none/, "발음 버튼의 눌림 움직임을 멈춰야 한다");
assert.match(reduceBlock, /rt-dock-next:active[\s\S]{0,120}transform:\s*none/, "다음 버튼의 눌림 움직임을 멈춰야 한다");
