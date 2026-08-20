# Mint Galaxy Game Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Reading Brain web UI as a cohesive, mobile-first Mint Galaxy learning game while preserving all login, progress, scoring, speech, quiz, and ranking behavior.

**Architecture:** Add one final theme stylesheet that owns visual tokens and shared game components instead of adding more rules to the legacy stylesheet. Add one small DOM-independent mascot-state model and one browser UI adapter; existing learning logic continues to own data and passes state changes to the adapter. Convert screens in independently testable slices, removing replaced legacy rules only after each slice passes.

**Tech Stack:** HTML5, CSS custom properties, inline SVG, vanilla JavaScript, Node.js `node:assert` tests, existing Node HTTP server.

**Spec:** `docs/superpowers/specs/2026-08-21-mint-galaxy-game-redesign-design.md`

## Global Constraints

- Preserve existing login, progress, score, speech, quiz grading, and ranking APIs and data formats.
- Use Deep Navy `#24345B`, Mint `#35C6A8`, Sky `#4DB8FF`, Star Yellow `#FFC857`, Coral `#FF6B6B`, background `#F5F8FC`, surface `#FFFFFF`, and line `#DDE5EF`.
- Use Mint only for success/progress, Coral only for errors, Sky only for listening/information, and Yellow only for rewards/current quests.
- Do not add external fonts, paid assets, image-generation APIs, WebGL, or a 3D library.
- Use inline SVG and CSS for mascot and depth effects.
- Primary mobile targets are 360, 390, 768, 1024, and 1440px widths.
- Main mobile actions must be at least 56px high; secondary actions must be at least 48px high.
- Mobile core learning text must remain at least 24px.
- Support keyboard focus, WCAG AA color contrast, safe areas, and `prefers-reduced-motion`.
- Run every changed test once failing before implementation, then passing after implementation.

## File Structure

- Create `mint-galaxy.css`: final visual tokens, shared components, screen themes, responsive rules, and reduced-motion rules.
- Create `game-ui-model.js`: pure mascot and feedback state normalization for browser and Node tests.
- Create `game-ui.js`: DOM adapter for mascot state, status text, and reward effects; no score or grading logic.
- Modify `index.html`: load new files and add semantic component hooks and the reusable Liv SVG host.
- Modify `app.js`: forward existing mode, speech, correct, wrong, and completion events to `ReadingBrainGameUI`.
- Modify `styles.css`: remove only legacy rules proven replaced after each screen migration.
- Create focused test files under `tests/` for tokens, mascot model, shell, hub, learning flows, supporting flows, responsiveness, and accessibility.

---

### Task 1: Mint Galaxy Tokens and Shared 3D Components

**Files:**
- Create: `mint-galaxy.css`
- Modify: `index.html`
- Create: `tests/mint-galaxy-theme.test.js`

**Interfaces:**
- Produces CSS tokens `--mg-ink`, `--mg-mint`, `--mg-sky`, `--mg-star`, `--mg-coral`, `--mg-bg`, `--mg-surface`, `--mg-line`, `--mg-radius-sm`, `--mg-radius-md`, `--mg-radius-lg`, `--mg-depth-sm`, `--mg-depth-md`, `--mg-depth-lg`.
- Produces classes `.mg-surface`, `.mg-card`, `.mg-button`, `.mg-chip`, `.mg-star`, `.mg-focus-ring`, and `.mg-speech-bubble` used by later tasks.

- [ ] **Step 1: Write the failing theme contract test**

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const theme = fs.readFileSync(path.join(root, "mint-galaxy.css"), "utf8");

assert.ok(html.includes('href="mint-galaxy.css?v=20260821"'));
for (const token of [
  "--mg-ink: #24345B", "--mg-mint: #35C6A8", "--mg-sky: #4DB8FF",
  "--mg-star: #FFC857", "--mg-coral: #FF6B6B", "--mg-bg: #F5F8FC",
  "--mg-surface: #FFFFFF", "--mg-line: #DDE5EF",
]) assert.ok(theme.includes(token), `missing ${token}`);
for (const selector of [".mg-surface", ".mg-card", ".mg-button", ".mg-chip", ".mg-speech-bubble"]) {
  assert.ok(theme.includes(selector), `missing ${selector}`);
}
assert.match(theme, /\.mg-button[\s\S]*?min-height:\s*56px[\s\S]*?box-shadow/);
assert.match(theme, /\.mg-button:active[\s\S]*?translateY/);
```

- [ ] **Step 2: Run the test and verify the missing stylesheet failure**

Run: `node tests/mint-galaxy-theme.test.js`

Expected: FAIL because `mint-galaxy.css` does not exist.

- [ ] **Step 3: Create the theme entry point and token layer**

Add after `styles.css` in `index.html`:

```html
<link rel="stylesheet" href="mint-galaxy.css?v=20260821" />
```

Start `mint-galaxy.css` with:

```css
:root {
  --mg-ink: #24345B;
  --mg-mint: #35C6A8;
  --mg-sky: #4DB8FF;
  --mg-star: #FFC857;
  --mg-coral: #FF6B6B;
  --mg-bg: #F5F8FC;
  --mg-surface: #FFFFFF;
  --mg-line: #DDE5EF;
  --mg-radius-sm: 16px;
  --mg-radius-md: 20px;
  --mg-radius-lg: 28px;
  --mg-depth-sm: 4px;
  --mg-depth-md: 6px;
  --mg-depth-lg: 8px;
}

.mg-surface { background: var(--mg-surface); border: 2px solid var(--mg-line); border-radius: var(--mg-radius-lg); }
.mg-card { background: var(--mg-surface); border: 2px solid var(--mg-line); border-radius: var(--mg-radius-md); box-shadow: 0 var(--mg-depth-md) 0 #CAD4E0; }
.mg-button { min-height: 56px; border: 2px solid currentColor; border-radius: var(--mg-radius-sm); box-shadow: 0 var(--mg-depth-sm) 0 color-mix(in srgb, currentColor 75%, #24345B); }
.mg-button:active { transform: translateY(var(--mg-depth-sm)); box-shadow: none; }
.mg-chip { display: inline-flex; align-items: center; min-height: 32px; padding: 4px 12px; border-radius: 999px; }
.mg-speech-bubble { position: relative; padding: 20px; background: #fff; border: 2px solid var(--mg-line); border-radius: var(--mg-radius-md); }
```

- [ ] **Step 4: Run the theme test**

Run: `node tests/mint-galaxy-theme.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the theme foundation**

```bash
git add index.html mint-galaxy.css tests/mint-galaxy-theme.test.js
git commit -m "feat: add mint galaxy design system"
```

### Task 2: Reusable Liv Mascot State Model and UI Adapter

**Files:**
- Create: `game-ui-model.js`
- Create: `game-ui.js`
- Modify: `index.html`
- Create: `tests/game-ui-model.test.js`

**Interfaces:**
- Produces `normalizeMascotState(value): "default" | "guide" | "listening" | "correct" | "wrong" | "complete"`.
- Produces `feedbackFor(state): { label: string, tone: "neutral" | "info" | "success" | "error" | "reward" }`.
- Produces browser API `ReadingBrainGameUI.setMascot(state, message?)`, `setMode(mode)`, and `clearReward()`.

- [ ] **Step 1: Write failing pure-model tests**

```js
const assert = require("node:assert/strict");
const { normalizeMascotState, feedbackFor } = require("../game-ui-model.js");

assert.equal(normalizeMascotState("correct"), "correct");
assert.equal(normalizeMascotState("unknown"), "default");
assert.deepEqual(feedbackFor("listening"), { label: "잘 듣고 있어요!", tone: "info" });
assert.deepEqual(feedbackFor("wrong"), { label: "괜찮아요. 다시 확인해 봐요!", tone: "error" });
```

- [ ] **Step 2: Run and verify module-not-found failure**

Run: `node tests/game-ui-model.test.js`

Expected: FAIL because `game-ui-model.js` is missing.

- [ ] **Step 3: Implement the UMD model**

```js
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainGameUIModel = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const STATES = new Set(["default", "guide", "listening", "correct", "wrong", "complete"]);
  const FEEDBACK = {
    default: { label: "함께 시작해 볼까요?", tone: "neutral" },
    guide: { label: "이 퀘스트를 따라와요!", tone: "info" },
    listening: { label: "잘 듣고 있어요!", tone: "info" },
    correct: { label: "정답이에요! 별을 획득했어요!", tone: "success" },
    wrong: { label: "괜찮아요. 다시 확인해 봐요!", tone: "error" },
    complete: { label: "퀘스트 완료!", tone: "reward" },
  };
  function normalizeMascotState(value) { return STATES.has(value) ? value : "default"; }
  function feedbackFor(value) { return FEEDBACK[normalizeMascotState(value)]; }
  return { normalizeMascotState, feedbackFor };
});
```

- [ ] **Step 4: Add the shared SVG host and browser adapter**

Add before the closing app shell in `index.html`:

```html
<aside id="livGuide" class="liv-guide" data-state="default" aria-live="polite">
  <svg class="liv-mascot" viewBox="0 0 180 180" aria-hidden="true">
    <ellipse cx="90" cy="158" rx="58" ry="13" fill="#24345B" opacity=".16" />
    <path d="M32 50Q63 35 88 55v88Q61 124 32 139Z" fill="#35C6A8" stroke="#24345B" stroke-width="5" />
    <path d="M148 50Q117 35 92 55v88q27-19 56-4Z" fill="#4DB8FF" stroke="#24345B" stroke-width="5" />
    <path d="M90 56v87" stroke="#fff" stroke-width="5" opacity=".75" />
    <circle class="liv-eye" cx="66" cy="83" r="7" fill="#24345B" />
    <circle class="liv-eye" cx="115" cy="83" r="7" fill="#24345B" />
    <path class="liv-mouth" d="M77 101q13 14 27 0" fill="none" stroke="#24345B" stroke-width="5" stroke-linecap="round" />
    <path d="M31 91 14 78M149 91l17-13" stroke="#24345B" stroke-width="7" stroke-linecap="round" />
    <path d="m52 45 8-18 12 17M108 44l12-17 8 19" fill="#FFC857" stroke="#C9901C" stroke-width="4" />
  </svg>
  <p id="livMessage">함께 시작해 볼까요?</p>
</aside>
<script src="game-ui-model.js?v=20260821"></script>
<script src="game-ui.js?v=20260821"></script>
```

Implement `game-ui.js` so `setMascot` normalizes the state, updates `#livGuide.dataset.state`, and updates `#livMessage` with the explicit message or `feedbackFor(state).label`. It must not change `state.score`, `state.streak`, or persisted data.

- [ ] **Step 5: Run model and syntax tests**

Run: `node tests/game-ui-model.test.js && node --check game-ui.js`

Expected: PASS.

- [ ] **Step 6: Commit the mascot boundary**

```bash
git add index.html game-ui-model.js game-ui.js tests/game-ui-model.test.js
git commit -m "feat: add reusable liv mascot states"
```

### Task 3: App Shell and Mobile Navigation

**Files:**
- Modify: `index.html`
- Modify: `mint-galaxy.css`
- Modify: `app.js`
- Create: `tests/mint-galaxy-shell.test.js`

**Interfaces:**
- Consumes `ReadingBrainGameUI.setMode(mode)` from Task 2.
- Produces shell classes `.mg-app-shell`, `.mg-sidebar`, `.mg-topbar`, and `.mg-bottom-nav`.

- [ ] **Step 1: Write the failing shell test**

Test that the app shell exposes `mg-app-shell`, the mobile nav labels remain exactly `홈`, `학습`, `퀴즈`, `전체`, the theme contains `env(safe-area-inset-bottom)`, and every `.mobile-bottom-item` rule has `min-height: 56px`.

```js
assert.match(html, /class="app-shell mg-app-shell"/);
assert.deepEqual([...html.matchAll(/data-mobile-mode="[^"]+"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/g)].map(m => m[1]), ["홈", "학습", "퀴즈", "전체"]);
assert.match(theme, /\.mobile-bottom-nav[\s\S]*?env\(safe-area-inset-bottom\)/);
assert.match(theme, /\.mobile-bottom-item[\s\S]*?min-height:\s*56px/);
assert.match(app, /ReadingBrainGameUI\?\.setMode\?\.\(mode\)/);
```

- [ ] **Step 2: Run and verify failure**

Run: `node tests/mint-galaxy-shell.test.js`

Expected: FAIL because the shell hook and new labels are missing.

- [ ] **Step 3: Add shell hooks and final responsive rules**

Add `mg-app-shell` to `.app-shell`, rename visible mobile labels, call `window.ReadingBrainGameUI?.setMode?.(mode)` at the end of `setMode`, and style the desktop sidebar/topbar plus fixed mobile bottom nav in `mint-galaxy.css`.

At `max-width: 760px`, hide the desktop sidebar by default, reserve `calc(var(--bottom-nav-height) + env(safe-area-inset-bottom))`, and keep the existing sidebar drawer controls functional.

- [ ] **Step 4: Run shell and existing mobile tests**

Run: `node tests/mint-galaxy-shell.test.js && node tests/mobile-duolingo-ui.test.js`

Expected: PASS. If the old test asserts the previous labels, update it to the approved four labels while retaining mode-order assertions.

- [ ] **Step 5: Commit the shell migration**

```bash
git add index.html app.js mint-galaxy.css tests/mint-galaxy-shell.test.js tests/mobile-duolingo-ui.test.js
git commit -m "feat: redesign app shell for mint galaxy"
```

### Task 4: Galaxy Quest Hub

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Create: `tests/galaxy-hub-ui.test.js`

**Interfaces:**
- Consumes the existing `patternHub.buildUnits`, `section.pathStatus`, `section.percent`, `section.unlocked`, and `section.cleared` values.
- Produces semantic classes `.galaxy-map`, `.planet-node`, `.status-locked`, `.status-learning`, `.status-done`, and `.current` without changing section selection behavior.

- [ ] **Step 1: Write failing hub structure tests**

Assert `renderPathUnit` renders `planet-node status-${section.pathStatus}`, retains `data-section`, `disabled aria-disabled="true"`, and renders both text and icon status. Assert theme rules define distinct locked, learning, done, and current states and a one-column small-screen layout.

- [ ] **Step 2: Run and verify missing planet-node failure**

Run: `node tests/galaxy-hub-ui.test.js`

Expected: FAIL on missing `planet-node`.

- [ ] **Step 3: Convert only hub markup and styles**

Keep `data-section` and all click handlers unchanged. Add the new classes to existing path markup, use yellow for current, mint for done, neutral line color for locked, and display explicit `잠김`, `${percent}%`, or `완료` text beside icons.

- [ ] **Step 4: Run hub model and UI tests**

Run: `node tests/galaxy-hub-ui.test.js && node tests/pattern-hub-model.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the hub**

```bash
git add app.js mint-galaxy.css tests/galaxy-hub-ui.test.js
git commit -m "feat: turn learning hub into galaxy quest map"
```

### Task 5: Card Learning and Quiz Game Surfaces

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Create: `tests/core-learning-game-ui.test.js`

**Interfaces:**
- Consumes existing `renderStudy`, `markKnown`, `markUnsure`, `newQuiz`, and answer-checking functions.
- Calls `ReadingBrainGameUI.setMascot("correct" | "wrong" | "complete")` only after existing score and state updates.
- Produces `.quest-card`, `.answer-grid`, `.answer-card`, `.action-know`, and `.action-review`.

- [ ] **Step 1: Write failing card and quiz tests**

Assert learning and quiz hosts expose `mg-surface`, the main English text remains a single element, action buttons keep their IDs, answer buttons have at least 68px height, and `app.js` forwards correct/wrong/complete states to the UI adapter.

- [ ] **Step 2: Run and verify failure**

Run: `node tests/core-learning-game-ui.test.js`

Expected: FAIL because the new surface and adapter hooks are missing.

- [ ] **Step 3: Add component hooks without changing event bindings**

Add classes to existing elements rather than replacing IDs. Style the English sentence as the largest content, keep Korean meaning secondary, and use Mint for know/correct, Coral for review/wrong, Sky for speech, and Yellow only for rewards.

- [ ] **Step 4: Forward result states**

After the existing correct branch completes its score/state update, call:

```js
window.ReadingBrainGameUI?.setMascot?.("correct");
```

Use `wrong` in the wrong branch and `complete` only when the existing completion condition is true. Do not move or duplicate score mutations.

- [ ] **Step 5: Run learning tests**

Run: `node tests/core-learning-game-ui.test.js && node tests/study-board-readability.test.js && node tests/duolingo-palette.test.js`

Expected: PASS.

- [ ] **Step 6: Commit core learning screens**

```bash
git add index.html app.js mint-galaxy.css tests/core-learning-game-ui.test.js
git commit -m "feat: redesign core cards and quizzes as game surfaces"
```

### Task 6: Interpretation Communication Console

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Create: `tests/interpret-console-ui.test.js`

**Interfaces:**
- Consumes existing interpretation phases `idle`, `countdown`, `listening`, and `verdict` plus the existing self-score fallback.
- Maps `listening` to mascot `listening`, pass to `correct`, fail to `wrong`, and end-of-run to `complete`.

- [ ] **Step 1: Write failing phase-mapping and accessibility tests**

Assert the interpretation host has `.communication-console`, the microphone control retains its ID and accessible name, every visible phase has text plus a class, and the self-score controls remain present.

- [ ] **Step 2: Run and verify missing console failure**

Run: `node tests/interpret-console-ui.test.js`

Expected: FAIL on `.communication-console`.

- [ ] **Step 3: Add console hooks and phase styling**

Style idle neutral, countdown Yellow, listening Sky, pass Mint, and fail Coral. Add the adapter calls at the same points where existing phase text changes. Keep speech recognition construction, timers, and fallback untouched.

- [ ] **Step 4: Run interpretation tests**

Run: `node tests/interpret-console-ui.test.js && node tests/interpretation-model.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the interpretation console**

```bash
git add index.html app.js mint-galaxy.css tests/interpret-console-ui.test.js
git commit -m "feat: redesign interpretation as communication console"
```

### Task 7: Verb, Bookquiz, and Ranking Integration

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Modify: `styles.css`
- Create: `tests/supporting-game-ui.test.js`

**Interfaces:**
- Consumes current verb form IDs, bookquiz IDs, `buildLeaderboardView`, and existing Liv reactions.
- Produces `.verb-orb`, `.quest-journal`, `.book-quest`, `.space-podium`, and `.explorer-ranking`.

- [ ] **Step 1: Write failing integration tests**

Assert the three verb form blocks use the same `verb-orb` class, examples use `quest-journal`, bookquiz has no duplicate English or redundant Korean-meaning label, ranking exposes `space-podium`, and current-student highlighting remains.

- [ ] **Step 2: Run and verify missing class failure**

Run: `node tests/supporting-game-ui.test.js`

Expected: FAIL on missing shared classes.

- [ ] **Step 3: Add hooks and migrate approved screen styles**

Apply the shared token colors and depths. Reuse the common Liv host; remove the page-specific duplicate mascot only after the shared host reacts to bookquiz answers. Keep all element IDs and data attributes used by `app.js`.

- [ ] **Step 4: Remove replaced legacy blocks**

Delete only legacy rules whose selectors are now covered by `mint-galaxy.css`: `BOOKQUIZ 3D QUEST`, `LARGE STUDY BOARDS`, and `POINT RANKING PODIUM`. Re-run the focused tests after each block removal; restore any rule that still owns functional layout.

- [ ] **Step 5: Run supporting feature tests**

Run: `node tests/supporting-game-ui.test.js && node tests/bookquiz-3d-quiz.test.js && node tests/leaderboard-model.test.js && node tests/study-board-readability.test.js`

Expected: PASS after updating visual-selector assertions to the new final theme while retaining behavioral assertions.

- [ ] **Step 6: Commit supporting screens**

```bash
git add index.html app.js styles.css mint-galaxy.css tests/supporting-game-ui.test.js tests/bookquiz-3d-quiz.test.js tests/study-board-readability.test.js
git commit -m "feat: unify supporting learning games"
```

### Task 8: Error and Empty-State Feedback

**Files:**
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Create: `tests/game-feedback-ui.test.js`

**Interfaces:**
- Consumes existing caught errors and empty-data branches.
- Calls `ReadingBrainGameUI.setMascot("wrong", message)` with user-safe text.
- Produces `.mg-empty-state`, `.mg-error-state`, and visible retry affordances where an existing retry action exists.

- [ ] **Step 1: Write failing feedback tests**

Assert leaderboard network failure, empty bookquiz data, TTS failure, and unsupported speech recognition each produce visible Korean guidance and do not remove navigation. Assert state is not conveyed by color alone.

- [ ] **Step 2: Run and verify failure**

Run: `node tests/game-feedback-ui.test.js`

Expected: FAIL because the shared feedback adapter is not called in all branches.

- [ ] **Step 3: Route existing errors to friendly feedback**

Use explicit messages such as `랭킹을 불러오지 못했어요. 새로고침을 눌러 다시 시도해 주세요.` and `이 기기에서는 음성 인식을 사용할 수 없어 자가 채점으로 진행해요.` Preserve original control flow and fallback behavior.

- [ ] **Step 4: Run feedback and syntax tests**

Run: `node tests/game-feedback-ui.test.js && node --check app.js && node --check game-ui.js`

Expected: PASS.

- [ ] **Step 5: Commit feedback states**

```bash
git add app.js mint-galaxy.css tests/game-feedback-ui.test.js
git commit -m "feat: add friendly game feedback states"
```

### Task 9: Responsive, Accessibility, and Performance Release Gate

**Files:**
- Modify: `mint-galaxy.css`
- Modify: `index.html`
- Create: `tests/mint-galaxy-release-gate.test.js`
- Modify: existing tests only where old visual selectors were intentionally replaced.

**Interfaces:**
- Validates all components produced by Tasks 1–8.
- Produces no new product behavior.

- [ ] **Step 1: Write the failing release-gate test**

The test must assert:

```js
assert.match(theme, /@media \(max-width:\s*360px\)/);
assert.match(theme, /@media \(prefers-reduced-motion:\s*reduce\)/);
assert.match(theme, /:focus-visible[\s\S]*?outline/);
assert.match(theme, /padding-bottom:[^;]*env\(safe-area-inset-bottom\)/);
assert.ok(!html.match(/https?:\/\/[^"']+\.(woff2?|ttf|glb|gltf)/i));
```

Also scan interactive selectors for 48/56px minimum targets and ensure the Liv SVG is `aria-hidden` while `#livGuide` is `aria-live="polite"`.

- [ ] **Step 2: Run and verify any missing release requirement**

Run: `node tests/mint-galaxy-release-gate.test.js`

Expected: FAIL on the first missing responsive or accessibility contract.

- [ ] **Step 3: Add the exact missing final rules**

Add a 360px compact layout, reduced-motion overrides for every mascot and reward animation, a high-contrast `:focus-visible` ring, safe-area padding, balanced wrapping, and overflow containment. Do not add new decorative effects in this task.

- [ ] **Step 4: Run the complete automated suite**

Run:

```powershell
$failed = $false
Get-ChildItem tests -Filter *.test.js | Sort-Object Name | ForEach-Object {
  node $_.FullName
  if ($LASTEXITCODE -ne 0) { $failed = $true }
}
if ($failed) { exit 1 }
node --check app.js
node --check game-ui.js
node --check game-ui-model.js
```

Expected: every test prints its pass message and the command exits 0.

- [ ] **Step 5: Verify the live server**

Run:

```powershell
$response = Invoke-WebRequest -Uri 'http://localhost:4174' -UseBasicParsing -TimeoutSec 5
if ($response.StatusCode -ne 200) { exit 1 }
Write-Output "HTTP $($response.StatusCode)"
```

Expected: `HTTP 200`.

- [ ] **Step 6: Perform browser viewport verification**

At 360, 390, 768, 1024, and 1440px, verify hub, card, quiz, interpretation, verb, bookquiz, and ranking screens. Record a failure if `document.documentElement.scrollWidth > document.documentElement.clientWidth`, any main action is under 56px, text clips, keyboard focus is hidden, or state depends on color alone.

- [ ] **Step 7: Run diff hygiene checks**

Run: `git diff --check`

Expected: exit 0 with no whitespace errors. Existing unrelated worktree changes must remain untouched.

- [ ] **Step 8: Commit the release gate**

```bash
git add index.html mint-galaxy.css tests
git commit -m "test: verify mint galaxy release quality"
```
