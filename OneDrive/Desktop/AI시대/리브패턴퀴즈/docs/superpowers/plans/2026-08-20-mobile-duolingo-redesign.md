# Mobile Duolingo-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 학습 기능을 유지하면서 모바일 우선의 선명하고 입체적인 게임형 UI와 하단 내비게이션을 구축한다.

**Architecture:** 기존 `index.html`, `styles.css`, `app.js` 구조를 유지하고 새 의존성 없이 점진적으로 덮어쓴다. 하단 내비게이션은 기존 `setMode(mode)`를 유일한 모드 전환 경계로 재사용하며, 시각 체계는 CSS 토큰과 화면별 컴포넌트 규칙으로 통일한다.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Node.js `node:test`/`assert`

**Spec:** `docs/superpowers/specs/2026-08-20-mobile-duolingo-redesign-design.md`

## Global Constraints

- 이미지 생성, 유료 API, 외부 플러그인을 사용하지 않는다.
- 기존 데이터 모델, 로그인 API, 학습 진행 저장 방식을 변경하지 않는다.
- 모바일 터치 영역은 최소 48px을 확보한다.
- 초록은 주요 행동과 완료, 파랑은 정보와 현재 위치, 빨강은 오답과 위험 상태에만 사용한다.
- 긴 한국어와 영어 문장은 중앙 정렬과 균형 잡힌 줄바꿈을 기본으로 한다.
- 모바일 안전 영역에 `env(safe-area-inset-bottom)`을 적용한다.

---

## File Structure

- `index.html`: 모바일 하단 내비게이션 구조와 접근성 레이블, 캐시 버전 갱신
- `styles.css`: 최종 디자인 토큰, 입체 버튼, 모바일 셸, 화면별 카드 및 반응형 규칙
- `app.js`: 하단 내비게이션 이벤트와 현재 모드 동기화
- `tests/mobile-duolingo-ui.test.js`: 구조, 모드 매핑, 핵심 CSS 계약 회귀 테스트
- `tests/duolingo-palette.test.js`: 기존 팔레트와 퀴즈 정렬 계약 유지

### Task 1: 모바일 하단 내비게이션 구조와 모드 매핑

**Files:**
- Modify: `index.html:100-250`
- Modify: `app.js:2284-2470`
- Create: `tests/mobile-duolingo-ui.test.js`

**Interfaces:**
- Consumes: 기존 `setMode(mode: string): void`
- Produces: `.mobile-bottom-nav`, `[data-mobile-mode]`, `syncMobileBottomNav(mode: string): void`

- [ ] **Step 1: 하단 내비게이션 구조와 모드 매핑 실패 테스트 작성**

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

const mobileModes = [...html.matchAll(/data-mobile-mode="([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(mobileModes, ["hub", "study", "quiz", "match", "menu"]);
assert.match(html, /<nav class="mobile-bottom-nav"[^>]*aria-label="모바일 학습 메뉴"/);
assert.match(app, /function syncMobileBottomNav\(mode\)/);
assert.match(app, /\$\$\("\[data-mobile-mode\]"\)/);
```

- [ ] **Step 2: 실패 확인**

Run: `node tests/mobile-duolingo-ui.test.js`

Expected: FAIL because `.mobile-bottom-nav` and `syncMobileBottomNav` do not exist.

- [ ] **Step 3: HTML에 하단 내비게이션 추가**

`</main>` 뒤, `.app-shell` 내부 마지막에 다음 구조를 추가한다.

```html
<nav class="mobile-bottom-nav" aria-label="모바일 학습 메뉴">
  <button class="mobile-bottom-item active" data-mobile-mode="hub" type="button"><svg class="pmode-ico"><use href="#ico-hub" /></svg><span>홈</span></button>
  <button class="mobile-bottom-item" data-mobile-mode="study" type="button"><svg class="pmode-ico"><use href="#ico-card" /></svg><span>카드</span></button>
  <button class="mobile-bottom-item" data-mobile-mode="quiz" type="button"><svg class="pmode-ico"><use href="#ico-quiz" /></svg><span>퀴즈</span></button>
  <button class="mobile-bottom-item" data-mobile-mode="match" type="button"><svg class="pmode-ico"><use href="#ico-match" /></svg><span>매칭</span></button>
  <button class="mobile-bottom-item" data-mobile-mode="menu" type="button"><svg class="pmode-ico"><use href="#ico-menu" /></svg><span>전체</span></button>
</nav>
```

- [ ] **Step 4: 기존 모드 전환과 동기화 구현**

`app.js`에서 `setMode`가 화면을 갱신한 뒤 호출하도록 추가한다.

```js
function syncMobileBottomNav(mode) {
  $$("[data-mobile-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mobileMode === mode);
  });
}

$$("[data-mobile-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mobileMode;
    if (mode === "menu") {
      openMobileNav();
      return;
    }
    closeMobileNav();
    setMode(mode);
  });
});
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `node tests/mobile-duolingo-ui.test.js`

Expected: PASS.

- [ ] **Step 6: 커밋**

```bash
git add index.html app.js tests/mobile-duolingo-ui.test.js
git commit -m "feat: add mobile learning navigation"
```

### Task 2: 공통 게임형 디자인 토큰과 모바일 셸

**Files:**
- Modify: `styles.css:5584-end`
- Modify: `index.html:4-25`
- Test: `tests/mobile-duolingo-ui.test.js`

**Interfaces:**
- Consumes: `.mobile-bottom-nav`, `.mobile-bottom-item`, 기존 `--joy-*` 토큰
- Produces: `MOBILE DUOLINGO UI` 최종 CSS 레이어와 `--game-*` 토큰

- [ ] **Step 1: 디자인 토큰과 모바일 셸 실패 테스트 추가**

```js
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const mobileLayer = css.slice(css.lastIndexOf("MOBILE DUOLINGO UI"));
assert.ok(mobileLayer.length > 0, "mobile redesign layer must exist");
for (const token of ["--game-green", "--game-blue", "--game-red", "--game-lip", "--bottom-nav-height"]) {
  assert.ok(mobileLayer.includes(token), `missing ${token}`);
}
assert.match(mobileLayer, /\.mobile-bottom-nav[\s\S]*?env\(safe-area-inset-bottom\)/);
assert.match(mobileLayer, /@media \(prefers-reduced-motion: reduce\)/);
```

- [ ] **Step 2: 실패 확인**

Run: `node tests/mobile-duolingo-ui.test.js`

Expected: FAIL with `mobile redesign layer must exist`.

- [ ] **Step 3: 최종 디자인 토큰과 공통 버튼 규칙 추가**

`styles.css` 마지막에 `MOBILE DUOLINGO UI` 레이어를 추가한다. 토큰은 `--game-green: #58cc02`, `--game-green-dark: #46a302`, `--game-blue: #1cb0f6`, `--game-red: #ff4b4b`, `--game-bg: #f7f7f7`, `--game-lip: 4px`, `--bottom-nav-height: 72px`로 정의한다. `.primary`, `.ghost`, `.quiz-tab`, `.mobile-bottom-item`은 2px 테두리와 `0 var(--game-lip)` 아래 그림자를 공유하고 `:active`에서 아래로 이동한다.

- [ ] **Step 4: 모바일 셸과 하단 내비게이션 구현**

`max-width: 760px`에서 `.mobile-bottom-nav`를 고정하고 `main`의 하단 패딩을 `calc(var(--bottom-nav-height) + env(safe-area-inset-bottom) + 24px)`로 설정한다. 각 항목은 최소 높이 56px, 아이콘과 레이블의 세로 배열, 활성 항목은 초록색으로 표시한다. 761px 이상에서는 하단 내비게이션을 숨긴다.

- [ ] **Step 5: 모션 감소 규칙 추가**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `node tests/mobile-duolingo-ui.test.js`

Expected: PASS.

- [ ] **Step 7: 커밋**

```bash
git add styles.css index.html tests/mobile-duolingo-ui.test.js
git commit -m "style: establish mobile game UI system"
```

### Task 3: 핵심 학습 화면을 단일 카드 흐름으로 통일

**Files:**
- Modify: `styles.css:760-1300, 3450-3655, 4700-end`
- Modify: `index.html:210-470`
- Test: `tests/mobile-duolingo-ui.test.js`
- Test: `tests/duolingo-palette.test.js`

**Interfaces:**
- Consumes: 기존 `.view`, `.panel`, `.study-layout`, `.quiz-panel`, `.match-panel`, `.mahjong-board`
- Produces: `.game-surface` 공통 구조 클래스와 화면별 모바일 레이아웃

- [ ] **Step 1: 핵심 화면 공통 카드 실패 테스트 작성**

```js
for (const viewId of ["studyView", "quizView", "matchView", "interpretView", "reviewView"]) {
  assert.match(html, new RegExp(`id="${viewId}"[\\s\\S]*?class="[^"]*game-surface`), `${viewId} must expose a game surface`);
}
assert.match(mobileLayer, /\.game-surface[\s\S]*?border-radius:\s*24px/);
assert.match(mobileLayer, /#quizView #quizOptions button[\s\S]*?min-height:\s*64px/);
assert.match(mobileLayer, /#matchView \.mahjong-board[\s\S]*?repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
```

- [ ] **Step 2: 실패 확인**

Run: `node tests/mobile-duolingo-ui.test.js`

Expected: FAIL because views do not have `.game-surface`.

- [ ] **Step 3: 핵심 화면 루트에 공통 클래스 추가**

카드, 퀴즈, 매칭, 통역, 복습 화면의 기존 최상위 내부 컨테이너에 `game-surface`를 추가한다. 기존 ID와 기능 클래스는 유지한다.

- [ ] **Step 4: 카드·퀴즈·매칭 모바일 규칙 구현**

`.game-surface`는 흰 배경, 2px 회색 테두리, 24px 반경, 20px 패딩을 사용한다. `#quizView`의 메타 정보부터 선택지까지 중앙축을 유지하고 선택지는 모바일 한 열과 최소 64px 높이를 사용한다. `#matchView .mahjong-board`는 모바일 2열, 360px 이하에서는 문장 보호를 위해 1열로 바꾼다.

- [ ] **Step 5: 허브·통역·블래스트·결과 화면 토큰 통일**

각 화면의 주요 행동에는 초록, 정보에는 파랑, 오답에는 빨강을 적용한다. 기존 정답·오답 클래스명과 JavaScript 동작은 변경하지 않는다. 결과 화면은 점수, 피드백, 다음 행동 순으로 시각적 크기를 설정한다.

- [ ] **Step 6: 기존 정렬 및 팔레트 테스트 실행**

Run: `node tests/duolingo-palette.test.js && node tests/mobile-duolingo-ui.test.js`

Expected: both PASS.

- [ ] **Step 7: 커밋**

```bash
git add index.html styles.css tests/mobile-duolingo-ui.test.js tests/duolingo-palette.test.js
git commit -m "style: unify learning screens as game surfaces"
```

### Task 4: 전체 회귀 검증과 캐시 갱신

**Files:**
- Modify: `index.html:7, 655-665`
- Modify: `tests/mobile-duolingo-ui.test.js`
- Test: `tests/*.test.js`

**Interfaces:**
- Consumes: Tasks 1-3의 HTML, CSS, JavaScript
- Produces: 배포 가능한 캐시 버전과 전체 회귀 증거

- [ ] **Step 1: 캐시 버전 실패 테스트 추가**

```js
assert.ok(html.includes('styles.css?v=20260820-mobile-game-ui'));
assert.ok(html.includes('app.js?v=20260820-mobile-game-ui'));
```

- [ ] **Step 2: 실패 확인**

Run: `node tests/mobile-duolingo-ui.test.js`

Expected: FAIL because the new asset version is absent.

- [ ] **Step 3: CSS와 JavaScript 캐시 버전 갱신**

`index.html`의 `styles.css`와 `app.js` 쿼리 버전을 모두 `20260820-mobile-game-ui`로 변경한다.

- [ ] **Step 4: 전체 자동 테스트 실행**

Run: `node --test tests/*.test.js`

Expected: all tests PASS with zero failures.

- [ ] **Step 5: 정적 오류 검사**

Run: `git diff --check -- index.html styles.css app.js tests/mobile-duolingo-ui.test.js tests/duolingo-palette.test.js`

Expected: exit 0 with no whitespace errors.

- [ ] **Step 6: 로컬 서버 확인**

Run: `node server.js`

Expected: server listens on port 4174. Open `http://localhost:4174/?v=20260820-mobile-game-ui` and verify mobile widths 360px, 390px, 760px plus desktop width 1280px. Check the hub, card, quiz, matching, interpretation, review, book quiz, and verb learning screens.

- [ ] **Step 7: 최종 커밋**

```bash
git add index.html styles.css app.js tests/mobile-duolingo-ui.test.js tests/duolingo-palette.test.js
git commit -m "test: verify mobile game UI redesign"
```
