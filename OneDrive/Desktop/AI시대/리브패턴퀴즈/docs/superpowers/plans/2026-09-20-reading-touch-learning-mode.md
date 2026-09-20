# 학습 모드 리딩터치 구성 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 카드학습·북퀴즈 화면을 라하잉글리시 리딩터치(laha-english.co.kr/리딩터치)와 같은 구성 — 단계 탭(잠금) · 큰 단어 · 아래 고정 버튼 바 — 으로 바꾼다.

**Architecture:** 새 스타일시트 `reading-touch.css` 를 `viva-theme.css` 뒤에 실어 학습 화면만 다시 그린다. 기존 마크업은 최대한 그대로 쓰고, 없는 요소(아래 고정 바, 단계 탭의 자물쇠)만 `index.html` 에 더한다. 단계 잠금 상태는 이미 있는 `bookquiz-map-model.js` 의 `canOpenNode()` 결과를 그대로 읽는다 — 잠금 규칙을 새로 만들지 않는다.

**Tech Stack:** 바닐라 HTML/CSS/JS(빌드 없음), `node --test` 문자열·구조 검증, 서비스워커 사전 캐시(`scripts/bump-cache.js`).

**Spec:** 2026-09-19 대화에서 원장님이 승인한 설계(리딩터치 화면 구성 + 비바북 색). 별도 스펙 문서 없음 — 아래 "설계 요약" 이 스펙이다.

## 설계 요약 (승인본)

| 자리 | 내용 |
|---|---|
| 맨 위 | `←` 뒤로 · 화면 이름 · 학생 이름/점수 흰 알약 (기존 `.topbar` 재사용) |
| 머리말 | 섹션 이름 (북퀴즈는 "1회독") |
| 단계 탭 | 카드학습: `카드학습 · 퀴즈 · 통역` / 북퀴즈: `단어 · 단어퀴즈 · 패턴 · 패턴퀴즈`, 잠긴 탭에 자물쇠 |
| 가운데 | 오른쪽 위 `3 / 21` + 둥근 발음 버튼, 가운데 아주 큰 영어, 아래 뜻 |
| 아래 고정 바 | `이전` · 큰 둥근 `다음 ▶` · `듣기` |
| 퀴즈 | 질문 크게, 보기는 `A B C D` 알약 네 줄 |

**넣지 않는 것:** 녹음 `Start` 버튼과 발음 평가(현재 기능 없음), 단어별 그림(파일 없음).

## Global Constraints

- 오프라인 PWA: 새 정적 파일은 `service-worker.js` 사전 캐시와 `scripts/bump-cache.js` 의 `assets` 배열에 반드시 넣는다.
- 색은 `viva-theme.css` 의 `--viva-*` 토큰만 쓴다. 새 색상 하드코딩 금지.
- 큰 글자 대비 3:1, 본문 4.5:1 이상. 흰 글자는 `--viva-plum`(9.9:1) 이상 바탕에만 올린다.
- 모든 애니메이션에 `@media (prefers-reduced-motion: reduce)` 차단을 붙인다.
- 누르는 버튼은 최소 44×44px.
- 학생 개인정보(`data/students.json`)는 건드리지 않는다.
- 테스트는 `node --test tests/*.test.js` 로 전부 통과해야 한다.

---

### Task 1: 학습 화면 뼈대 스타일시트

**Files:**
- Create: `reading-touch.css`
- Modify: `index.html:14` (스타일시트 링크), `service-worker.js` (사전 캐시), `scripts/bump-cache.js:15` (assets 배열)
- Test: `tests/reading-touch-ui.test.js`

**Interfaces:**
- Consumes: `viva-theme.css` 의 `--viva-plum`, `--viva-plum-deep`, `--viva-soft`, `--viva-display`
- Produces: CSS 클래스 `.rt-steps`, `.rt-step`, `.rt-step[data-locked="true"]`, `.rt-stage`, `.rt-dock`, `.rt-dock-next`, `.rt-speak`

- [ ] **Step 1: 실패하는 테스트를 쓴다**

```js
const css = fs.readFileSync(path.join(root, "reading-touch.css"), "utf8");
assert.match(css, /\.rt-dock\s*\{[^}]*position:\s*sticky/, "아래 버튼 바는 화면 아래에 붙어 있어야 한다");
assert.match(css, /\.rt-step\[data-locked="true"\][^}]*\}/, "잠긴 단계 탭에 표시가 있어야 한다");
assert.ok(html.indexOf("reading-touch.css") > html.indexOf("viva-theme.css"), "학습 화면 스타일은 테마 뒤에 실린다");
assert.ok(serviceWorker.includes("/reading-touch.css?v="), "오프라인에서도 학습 화면이 같아야 한다");
```

- [ ] **Step 2: 테스트가 실패하는지 확인한다** — `node --test tests/reading-touch-ui.test.js` → 파일 없음으로 FAIL

- [ ] **Step 3: `reading-touch.css` 를 만들고 링크·사전 캐시를 더한다**

- [ ] **Step 4: 테스트 통과 확인** — `node scripts/bump-cache.js <태그> && node --test tests/*.test.js`

- [ ] **Step 5: 커밋**

---

### Task 2: 카드학습 화면을 리딩터치 구성으로

**Files:**
- Modify: `index.html:364-402` (studyView), `reading-touch.css`
- Test: `tests/reading-touch-ui.test.js`

**Interfaces:**
- Consumes: 기존 요소 `#cardEnglish`, `#cardKorean`, `#cardIndexDisplay`, `#prevButton`, `#nextButton`, `.pattern-mode-bar`
- Produces: `#studyView .rt-dock` 안의 `#prevButton`/`#nextButton`/`#studySpeakBtn`

- [ ] **Step 1: 실패하는 테스트** — studyView 안에 `rt-dock` 과 `studySpeakBtn` 이 있고, `#prevButton` 이 그 안에 있는지 검사한다.
- [ ] **Step 2: 실패 확인**
- [ ] **Step 3: 마크업 이동 + 발음 버튼 추가. 버튼은 `speakExpression(currentItem(), 1)` 을 부른다(이미 있는 함수).**
- [ ] **Step 4: 테스트 통과 + 브라우저에서 카드 넘김·발음 확인**
- [ ] **Step 5: 커밋**

---

### Task 3: 북퀴즈 4단계를 단계 탭으로, 퀴즈 보기를 A·B·C·D 알약으로

**Files:**
- Modify: `index.html:436-470` (bookquizView), `app.js:3485` (`renderBookquizMap`), `reading-touch.css`
- Test: `tests/reading-touch-ui.test.js`, `tests/bookquiz-map-model.test.js`

**Interfaces:**
- Consumes: `bookquizMapModel.canOpenNode(map, node)`, `state.bookquizMap`
- Produces: `renderBookquizMap()` 이 각 탭에 `data-locked="true|false"` 를 달아 준다

- [ ] **Step 1: 실패하는 테스트** — `renderBookquizMap` 이 `dataset.locked` 를 설정하는지, 퀴즈 보기 마크업에 `A/B/C/D` 표시가 붙는지 검사한다.
- [ ] **Step 2: 실패 확인**
- [ ] **Step 3: 구현** — 지도 카드를 가로 탭으로 바꾸고, 잠긴 탭에 자물쇠. 보기 버튼에 `data-choice="A"` 를 붙인다.
- [ ] **Step 4: 테스트 + 브라우저에서 단계 이동·정답/오답 확인**
- [ ] **Step 5: 커밋**

---

## Self-Review

- **스펙 커버리지:** 맨 위 줄(기존 topbar 재사용, Task 2) · 머리말(Task 3) · 단계 탭(Task 1 스타일 + Task 3 상태) · 큰 단어와 개수·발음 버튼(Task 2) · 아래 고정 바(Task 1·2) · A/B/C/D 퀴즈(Task 3). 빠진 항목 없음.
- **넣지 않기로 한 것:** 녹음·발음평가·단어 그림 — 세 Task 어디에도 없음. 의도된 제외.
- **이름 일관성:** `.rt-dock`, `.rt-step`, `data-locked` 를 Task 1에서 정의하고 2·3에서 같은 이름으로만 쓴다.
