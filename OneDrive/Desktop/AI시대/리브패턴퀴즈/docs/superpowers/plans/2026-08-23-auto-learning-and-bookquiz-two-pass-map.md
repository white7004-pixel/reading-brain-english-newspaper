# Automatic Learning and Bookquiz Two-Pass Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically pronounce new study cards, connect Pattern cards to quiz to interpretation, and guide Bookquiz students through a locked four-node map for exactly two passes.

**Architecture:** Pure model functions extend the existing daily-course state with automatic-pronunciation tokens and validated Bookquiz round/map state. `app.js` remains the browser adapter: it renders maps, invokes audio, persists transitions, and uses the existing single-advance guard. Existing curriculum arrays, PWA profile storage, and offline sync remain the source of content and persistence.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, existing UMD learning models, LocalStorage learning profile, Node.js `node:assert`, Playwright browser verification

**Spec:** `docs/superpowers/specs/2026-08-23-auto-learning-and-bookquiz-two-pass-map-design.md`

## Global Constraints

- Bookquiz uses exactly two passes; no state, control, or copy may create a third pass.
- Bookquiz order is `word-study → word-quiz → pattern-study → pattern-quiz` in both passes.
- Use only `data/bookquiz.js`, `data/expressions.js`, and existing content IDs.
- Remove card-level pronunciation buttons only; keep existing quiz and interpretation audio controls.
- Automatic pronunciation runs only for a newly visible study card and never changes course state.
- Offline automatic pronunciation is skipped without delaying or blocking learning.
- Persist every accepted answer and stage transition before rendering its destination.
- Keep the existing shared single-advance guard for timers and transitions.
- Final rewards must remain idempotent.
- Preserve PWA installability, offline progress, and reconnection synchronization.
- Maintain 360×800, 412×915, and 768×1024 release sizes.
- Use strict test-first red-green-refactor cycles.

---

## File Structure

- Create `auto-pronunciation-model.js`: stable token creation and once-per-current-card scheduling state.
- Create `bookquiz-map-model.js`: valid nodes, two-pass state, locks, completion, review, and recovery.
- Modify `daily-learning-model.js`: streamlined Pattern stages and safe recovery of the new flow.
- Modify `app.js`: automatic audio adapter, Pattern transitions, Bookquiz map adapter, persistence, and review mode.
- Modify `index.html`: remove card audio buttons and add the Bookquiz map and two-pass completion controls.
- Modify `mint-galaxy.css`: connected-node map, current/locked/completed states, responsive layout, and reduced motion.
- Create `tests/auto-pronunciation-model.test.js`.
- Create `tests/bookquiz-map-model.test.js`.
- Modify `tests/core-learning-game-ui.test.js`.
- Modify `tests/bookquiz-3d-quiz.test.js`.
- Modify `tests/supporting-game-ui.test.js`.
- Modify `tests/mobile-duolingo-ui.test.js`.
- Modify `tests/mint-galaxy-release-gate.test.js`.
- Create `tests/auto-learning-browser.spec.js`.
- Modify `docs/CURRENT_CHECKPOINT.md`.

---

### Task 1: Once-per-card automatic pronunciation model

**Files:**
- Create: `auto-pronunciation-model.js`
- Create: `tests/auto-pronunciation-model.test.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `createToken({ section, stage, itemId, round }) -> string`
- Produces: `createPronunciationGuard() -> { shouldPlay(token, online), cancel(), currentToken() }`

- [ ] **Step 1: Write the failing model test**

```js
const assert = require("node:assert/strict");
const audio = require("../auto-pronunciation-model.js");

assert.equal(
  audio.createToken({ section: "pattern", stage: "study", itemId: 17 }),
  "pattern:study:17",
);
assert.equal(
  audio.createToken({ section: "bookquiz", stage: "word-study", itemId: 8003, round: 2 }),
  "bookquiz:word-study:8003:round-2",
);

const guard = audio.createPronunciationGuard();
assert.equal(guard.shouldPlay("pattern:study:17", true), true);
assert.equal(guard.shouldPlay("pattern:study:17", true), false);
assert.equal(guard.shouldPlay("pattern:study:18", true), true);
assert.equal(guard.shouldPlay("pattern:study:19", false), false);
assert.equal(guard.currentToken(), "pattern:study:18");
guard.cancel();
assert.equal(guard.currentToken(), "");
console.log("automatic pronunciation model tests passed");
```

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run: `node tests/auto-pronunciation-model.test.js`

Expected: FAIL with `Cannot find module '../auto-pronunciation-model.js'`.

- [ ] **Step 3: Implement the minimal immutable token guard**

```js
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainAutoPronunciation = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function createToken(input = {}) {
    const base = `${String(input.section || "")}:${String(input.stage || "")}:${String(input.itemId ?? "")}`;
    return input.round ? `${base}:round-${Math.min(2, Math.max(1, Number(input.round) || 1))}` : base;
  }
  function createPronunciationGuard() {
    let token = "";
    return {
      shouldPlay(nextToken, online) {
        if (!online || !nextToken || token === nextToken) return false;
        token = String(nextToken);
        return true;
      },
      cancel() { token = ""; },
      currentToken() { return token; },
    };
  }
  return { createToken, createPronunciationGuard };
});
```

- [ ] **Step 4: Load the model before `app.js` and verify green**

Add `<script src="auto-pronunciation-model.js?v=20260823"></script>` after the other pure models and before `app.js`.

Run:

```powershell
node tests/auto-pronunciation-model.test.js
node tests/mint-galaxy-shell.test.js
```

Expected: both PASS.

- [ ] **Step 5: Commit the pronunciation model**

```powershell
git add auto-pronunciation-model.js tests/auto-pronunciation-model.test.js index.html
git commit -m "feat: add automatic card pronunciation guard"
```

### Task 2: Bookquiz two-pass map state model

**Files:**
- Create: `bookquiz-map-model.js`
- Create: `tests/bookquiz-map-model.test.js`
- Modify: `index.html`

**Interfaces:**
- Produces constant: `NODES = ["word-study", "word-quiz", "pattern-study", "pattern-quiz"]`
- Produces: `createMap(options)`, `completeNode(map, nodeId)`, `startSecondRound(map)`, `canOpenNode(map, nodeId)`, `openReview(map, nodeId)`, `resumeMap(saved)`
- Map shape: `{ version, round, maxRounds, currentNode, completedStageIds, roundCompleted, allRoundsCompleted, reviewNode, rewardApplied }`

- [ ] **Step 1: Write failing two-pass state tests**

```js
const assert = require("node:assert/strict");
const model = require("../bookquiz-map-model.js");

let map = model.createMap();
assert.equal(map.round, 1);
assert.equal(map.currentNode, "word-study");
assert.equal(model.canOpenNode(map, "pattern-study"), false);

for (const node of model.NODES) map = model.completeNode(map, node);
assert.equal(map.roundCompleted, true);
assert.equal(map.allRoundsCompleted, false);
assert.equal(model.startSecondRound(map).round, 2);

map = model.startSecondRound(map);
assert.equal(map.currentNode, "word-study");
assert.deepEqual(map.completedStageIds, []);
for (const node of model.NODES) map = model.completeNode(map, node);
assert.equal(map.allRoundsCompleted, true);
assert.equal(model.startSecondRound(map), map);
assert.equal(model.canOpenNode(map, "pattern-study"), true);
assert.equal(model.openReview(map, "pattern-study").reviewNode, "pattern-study");

const damaged = model.resumeMap({ ...map, round: 9, currentNode: "missing", completedStageIds: ["word-study", "bad"] });
assert.equal(damaged.round, 2);
assert.equal(damaged.currentNode, "pattern-quiz");
assert.deepEqual(damaged.completedStageIds, ["word-study"]);
console.log("Bookquiz map model tests passed");
```

- [ ] **Step 2: Run and verify missing-module failure**

Run: `node tests/bookquiz-map-model.test.js`

Expected: FAIL because the module is absent.

- [ ] **Step 3: Implement ordered completion and exact two-pass rules**

Implement UMD functions with these rules:

```js
const NODES = Object.freeze(["word-study", "word-quiz", "pattern-study", "pattern-quiz"]);
function completeNode(map, nodeId) {
  if (!map || map.currentNode !== nodeId || !NODES.includes(nodeId)) return map;
  const completedStageIds = [...new Set([...map.completedStageIds, nodeId])];
  const index = NODES.indexOf(nodeId);
  if (index < NODES.length - 1) return { ...map, completedStageIds, currentNode: NODES[index + 1], reviewNode: "" };
  return map.round === 1
    ? { ...map, completedStageIds, roundCompleted: true, reviewNode: "" }
    : { ...map, completedStageIds, roundCompleted: true, allRoundsCompleted: true, reviewNode: "" };
}
```

`startSecondRound` accepts only a completed round-one map. `canOpenNode` returns true for the current node, completed nodes, and every node after final completion. `openReview` never changes round or final completion. `resumeMap` clamps round to 1 or 2, filters node IDs, and chooses the latest valid current node.

- [ ] **Step 4: Load the model and verify all boundary cases**

Add `<script src="bookquiz-map-model.js?v=20260823"></script>` before `app.js`.

Run:

```powershell
node tests/bookquiz-map-model.test.js
node --check bookquiz-map-model.js
```

Expected: PASS, including rejection of a third pass.

- [ ] **Step 5: Commit the Bookquiz state model**

```powershell
git add bookquiz-map-model.js tests/bookquiz-map-model.test.js index.html
git commit -m "feat: add two-pass Bookquiz map model"
```

### Task 3: Automatic card audio and pronunciation-button removal

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `tests/core-learning-game-ui.test.js`
- Modify: `tests/bookquiz-3d-quiz.test.js`
- Modify: `tests/supporting-game-ui.test.js`

**Interfaces:**
- Consumes: `ReadingBrainAutoPronunciation.createToken`, `createPronunciationGuard`
- Produces: `scheduleCardPronunciation({ section, stage, item, round }) -> boolean`

- [ ] **Step 1: Add failing UI and integration assertions**

Update the tests to assert:

```js
assert.doesNotMatch(html, /id="speakButton"/);
assert.doesNotMatch(html, /id="bqSpeakBtn"/);
assert.doesNotMatch(html, />원어민 발음 듣기</);
assert.match(app, /function scheduleCardPronunciation\(/);
assert.match(renderStudy, /scheduleCardPronunciation\([\s\S]*?section:\s*"pattern"/);
assert.match(renderBQCard, /scheduleCardPronunciation\([\s\S]*?section:\s*"bookquiz"/);
```

Add source-level assertions that both study renderers call `scheduleCardPronunciation` after updating the visible card. The pure guard test owns duplicate-token and offline behavior; the browser journey in Task 7 verifies the real adapter with stubbed speech playback.

- [ ] **Step 2: Run focused tests and verify failure**

Run:

```powershell
node tests/core-learning-game-ui.test.js
node tests/bookquiz-3d-quiz.test.js
node tests/supporting-game-ui.test.js
```

Expected: FAIL because buttons remain and card rendering does not schedule automatic audio.

- [ ] **Step 3: Remove only the two card-learning buttons**

Delete `#speakButton` from the Pattern card controls and `#bqSpeakBtn` from the Bookquiz card. Remove their event bindings. Keep `#bqQuizSpeakBtn`, interpretation audio, and other quiz-specific controls.

Add visually hidden card text such as `발음은 카드가 바뀔 때 자동으로 재생됩니다.` where needed for accessibility.

- [ ] **Step 4: Implement the shared browser audio adapter**

```js
const autoPronunciation = window.ReadingBrainAutoPronunciation || {};
const cardPronunciationGuard = autoPronunciation.createPronunciationGuard?.();

function scheduleCardPronunciation({ section, stage, item, round }) {
  const token = autoPronunciation.createToken?.({ section, stage, itemId: item?.id, round });
  if (!cardPronunciationGuard?.shouldPlay(token, navigator.onLine !== false)) return false;
  queueMicrotask(() => {
    if (section === "bookquiz") speakBookquizItem(item).catch(() => {});
    else speakExpression(item, 1).catch(() => {});
  });
  return true;
}
```

Call it only after card text and current state are rendered. Cancel the guard on logout, course exit, or a section change that makes the scheduled token stale.

- [ ] **Step 5: Verify automatic audio and retained quiz controls**

Run:

```powershell
node tests/auto-pronunciation-model.test.js
node tests/core-learning-game-ui.test.js
node tests/bookquiz-3d-quiz.test.js
node tests/supporting-game-ui.test.js
```

Expected: PASS with no card pronunciation button, once-per-card playback, offline skip, and retained quiz audio.

- [ ] **Step 6: Commit automatic pronunciation integration**

```powershell
git add index.html app.js tests/core-learning-game-ui.test.js tests/bookquiz-3d-quiz.test.js tests/supporting-game-ui.test.js
git commit -m "feat: autoplay pronunciation on study cards"
```

### Task 4: Pattern cards to quiz to interpretation

**Files:**
- Modify: `daily-learning-model.js`
- Modify: `app.js`
- Modify: `tests/daily-learning-model.test.js`
- Modify: `tests/core-learning-game-ui.test.js`
- Modify: `tests/interpret-console-ui.test.js`

**Interfaces:**
- Produces Pattern route: `study → quiz → interpret → review → reward`
- Produces: `completePatternStudy()`, `completePatternQuiz()`

- [ ] **Step 1: Write failing Pattern route and transition tests**

Change the expected Pattern stages to:

```js
assert.deepEqual(STAGES.pattern, ["study", "quiz", "interpret", "review", "reward"]);
```

Add UI assertions that either accepted final-card completion path (forward navigation at the boundary or the final mastery action) invokes `completePatternStudy()` once. Assert that quiz target completion invokes `completePatternQuiz()`, and each helper schedules its destination through `scheduleCourseAdvance` only after feedback and persistence.

- [ ] **Step 2: Run focused tests and verify failure**

Run:

```powershell
node tests/daily-learning-model.test.js
node tests/core-learning-game-ui.test.js
node tests/interpret-console-ui.test.js
```

Expected: FAIL because Pattern still contains intermediate stages and free-study completion does not force the requested route.

- [ ] **Step 3: Streamline the model and recovery**

Replace Pattern stages with `study`, `quiz`, `interpret`, `review`, `reward`. In `resumeCourse`, migrate saved `listen` or `speech` stages to the closest new valid stage:

- `listen` → `quiz`
- `speech` → `interpret`
- other missing stages → `study`

Keep saved content IDs, item index clamping, review IDs, grade, and completed state.

- [ ] **Step 4: Connect the two automatic boundaries**

Make both last-card entry points call `completePatternStudy()`. That helper persists card completion, renders feedback, then schedules exactly one `setMode("quiz")`. At `SECTION_QUIZ_TARGET`, call `completePatternQuiz()`; it persists the accepted answer and quiz completion, renders feedback, then schedules exactly one `setMode("interpret")` and initializes the interpretation run.

Both tokens include current item and count. Cancel pending transitions on course exit or manual section change.

- [ ] **Step 5: Verify Pattern route and duplicate protection**

Run:

```powershell
node tests/daily-learning-model.test.js
node tests/core-learning-game-ui.test.js
node tests/interpret-console-ui.test.js
node tests/game-feedback-ui.test.js
```

Expected: PASS with one transition at each boundary.

- [ ] **Step 6: Commit the Pattern route**

```powershell
git add daily-learning-model.js app.js tests/daily-learning-model.test.js tests/core-learning-game-ui.test.js tests/interpret-console-ui.test.js tests/game-feedback-ui.test.js
git commit -m "feat: connect pattern cards quiz and interpretation"
```

### Task 5: Bookquiz map UI and automatic four-stage progression

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `daily-learning-model.js`
- Modify: `mint-galaxy.css`
- Modify: `tests/daily-learning-model.test.js`
- Modify: `tests/bookquiz-3d-quiz.test.js`
- Modify: `tests/mobile-duolingo-ui.test.js`

**Interfaces:**
- Consumes: `ReadingBrainBookquizMap` model
- Produces: `renderBookquizMap()`, `startBookquizNode(nodeId, options)`, `completeBookquizNode(nodeId)`
- Persists while active: `state.learningProfile.activeCourse.bookquizMap`
- Persists after final completion: `state.learningProfile.bookquizCompletion`

- [ ] **Step 1: Add failing semantic map assertions**

Require:

```html
<ol id="bookquizLearningMap" class="bookquiz-learning-map" aria-label="북퀴즈 순차 학습 지도">
```

Require four buttons with exact `data-bookquiz-node` values, a `#bookquizRoundLabel`, `#bookquizMapProgress`, polite `#bookquizMapStatus`, `#bookquizSecondRoundBtn`, and `#bookquizFinalComplete`.

Add CSS assertions for 48px targets, `aria-current` rendering, locked/completed selectors, `overflow-wrap: anywhere`, mobile vertical path, and reduced motion.

- [ ] **Step 2: Run map UI tests and verify failure**

Run:

```powershell
node tests/bookquiz-3d-quiz.test.js
node tests/mobile-duolingo-ui.test.js
```

Expected: FAIL because the map markup and renderer are absent.

- [ ] **Step 3: Add accessible map markup and responsive styles**

Each node button includes a number, label, state text, and lock/check icon with text. Use `disabled` for future nodes, `aria-current="step"` for the current node, and `data-state="locked|current|complete|review"` for styling. At 480px, render one vertical connected path. Keep the map centered and free of horizontal overflow at tablet width.

- [ ] **Step 4: Integrate map creation, recovery, and persistence**

Extend `createLearningProfile()` and `resumeCourse()` so `activeCourse.bookquizMap` is validated through `resumeMap()` and preserved while Bookquiz is active. Initialize from `activeCourse.bookquizMap`, otherwise create a new map unless a final `bookquizCompletion` summary exists. Save active progress on every node open, completion, pass start, review open, accepted answer, and course exit. On final completion, copy `{ round: 2, allRoundsCompleted: true, rewardApplied: true, completedAt }` to `bookquizCompletion`; retain it when `activeCourse` is later cleared. `renderBookquizMap()` derives every visible and disabled state from the model rather than separate DOM flags.

Add model tests that a profile round-trip preserves the validated active Bookquiz map, drops unknown node IDs, and retains `bookquizCompletion` after clearing `activeCourse`.

- [ ] **Step 5: Connect the four automatic boundaries**

- Last word card: complete `word-study`, persist, open `word-quiz`.
- Word quiz target: complete `word-quiz`, persist, set Bookquiz type to pattern, open `pattern-study`.
- Last question-pattern card: complete `pattern-study`, persist, open `pattern-quiz`.
- Pattern quiz target: complete `pattern-quiz`, persist, render the pass completion state.

Use tokens shaped like `bookquiz:<round>:<node>:<itemId>:<count>` with the existing single-advance scheduler.

- [ ] **Step 6: Verify map progression and reload recovery**

Run:

```powershell
node tests/daily-learning-model.test.js
node tests/bookquiz-map-model.test.js
node tests/bookquiz-3d-quiz.test.js
node tests/mobile-duolingo-ui.test.js
node tests/card-content-alignment.test.js
```

Expected: PASS with locked future nodes and four ordered transitions.

- [ ] **Step 7: Commit the Bookquiz map**

```powershell
git add index.html app.js daily-learning-model.js mint-galaxy.css tests/daily-learning-model.test.js tests/bookquiz-3d-quiz.test.js tests/mobile-duolingo-ui.test.js tests/card-content-alignment.test.js
git commit -m "feat: add ordered Bookquiz learning map"
```

### Task 6: Second pass, final reward, and review-only completion

**Files:**
- Modify: `app.js`
- Modify: `index.html`
- Modify: `tests/bookquiz-map-model.test.js`
- Modify: `tests/bookquiz-3d-quiz.test.js`
- Modify: `tests/game-feedback-ui.test.js`

**Interfaces:**
- Produces: `startBookquizSecondRound()`, `finishBookquizTwoPassCourse()`, `openBookquizReview(nodeId)`

- [ ] **Step 1: Add failing pass-two and idempotent-reward tests**

Assert that `#bookquizSecondRoundBtn` is shown only for `round === 1 && roundCompleted`, pass two begins at `word-study`, and no source or markup contains `3회독` or a round increment above two.

Call final completion twice through the testable model/adapter boundary and assert stars, points, and badges change only once. Open a completed node and assert `round === 2`, `allRoundsCompleted === true`, and `rewardApplied === true` remain unchanged.

- [ ] **Step 2: Run focused tests and verify failure**

Run:

```powershell
node tests/bookquiz-map-model.test.js
node tests/bookquiz-3d-quiz.test.js
node tests/game-feedback-ui.test.js
```

Expected: FAIL because round-two action and final reward integration are absent.

- [ ] **Step 3: Implement explicit second-pass start**

`startBookquizSecondRound()` accepts only a completed round-one map, calls the pure model, reshuffles word and pattern item IDs independently, resets per-round quiz counts and card positions, persists, and renders `word-study`. It retains cumulative score, stars, badges, mastery, review history, and offline queue.

- [ ] **Step 4: Implement final completion exactly once**

When round-two `pattern-quiz` completes, set `rewardApplied` before applying reward totals, persist the marker and totals together, then render the final completion panel. A repeated call sees the marker and renders existing totals without adding rewards.

- [ ] **Step 5: Enable review without a third pass**

After final completion, enable all node buttons. Opening one sets `reviewNode` and renders the chosen card/quiz surface in free-review mode. Review answers may update ordinary practice statistics but cannot clear completion, change round, start a pass, or apply the final reward.

- [ ] **Step 6: Verify pass two and review mode**

Run:

```powershell
node tests/bookquiz-map-model.test.js
node tests/bookquiz-3d-quiz.test.js
node tests/game-feedback-ui.test.js
node tests/offline-sync-model.test.js
```

Expected: PASS with no third-pass path and one final reward.

- [ ] **Step 7: Commit two-pass completion**

```powershell
git add app.js index.html tests/bookquiz-map-model.test.js tests/bookquiz-3d-quiz.test.js tests/game-feedback-ui.test.js
git commit -m "feat: complete two-pass Bookquiz course"
```

### Task 7: Browser journeys and full release gate

**Files:**
- Create: `tests/auto-learning-browser.spec.js`
- Modify: `tests/mint-galaxy-release-gate.test.js`
- Modify: `docs/CURRENT_CHECKPOINT.md`

**Interfaces:**
- Consumes all completed automatic-flow and two-pass behavior
- Produces end-to-end evidence for audio, transitions, recovery, responsive map, and final completion

- [ ] **Step 1: Write the failing Playwright journeys**

Use a temporary student store and real server. Stub only audio playback at the browser boundary so calls are counted without external TTS. Verify:

1. Pattern first card triggers one call; re-render triggers none; next card triggers one.
2. No Pattern or Bookquiz card pronunciation button exists.
3. Pattern last card opens quiz; quiz target opens interpretation.
4. Bookquiz nodes complete in the exact four-node order for round one.
5. `2회독 시작` appears only after round one.
6. Reload restores round two and the exact node/item.
7. Round-two completion shows final completion.
8. All nodes reopen for review and no third-pass control exists.
9. Offline card render triggers no audio and still permits navigation.

- [ ] **Step 2: Run and record the first browser-observable failure**

Run:

```powershell
npx --yes playwright test tests/auto-learning-browser.spec.js --reporter=line
```

Expected before final integration corrections: FAIL at the first missing or incorrectly connected browser behavior.

- [ ] **Step 3: Fix browser integration one failing assertion at a time**

For every correction: keep the failing assertion, change only the responsible implementation, rerun the focused journey, and preserve model, offline, and idempotency contracts.

- [ ] **Step 4: Run the complete automated release gate**

```powershell
node --check app.js
node --check daily-learning-model.js
node --check auto-pronunciation-model.js
node --check bookquiz-map-model.js
$tests = Get-ChildItem -LiteralPath tests -Filter '*.test.js' | Sort-Object Name
foreach ($test in $tests) { node $test.FullName; if ($LASTEXITCODE -ne 0) { throw $test.Name } }
npx --yes playwright test tests/auto-learning-browser.spec.js --reporter=line
git -c core.whitespace=cr-at-eol diff --check -- app.js index.html mint-galaxy.css daily-learning-model.js auto-pronunciation-model.js bookquiz-map-model.js tests docs/CURRENT_CHECKPOINT.md
```

Expected: all syntax checks, Node tests, browser journeys, and CRLF-aware diff checks PASS.

- [ ] **Step 5: Manually verify required screen sizes**

At 360×800, 412×915, and 768×1024 verify:

- Pattern automatic pronunciation and button removal.
- Pattern cards → quiz → interpretation.
- Bookquiz locked/current/completed map states.
- Round-one completion and explicit second-pass start.
- Round-two final completion and review-only node access.
- Mid-pass reload recovery.
- Offline audio skip and uninterrupted navigation.
- No horizontal overflow, obscured controls, or color-only state.

- [ ] **Step 6: Update checkpoint and commit the release gate**

Record the new Node test count, browser journey result, exact two-pass limit, automatic-pronunciation scope, and local URL in `docs/CURRENT_CHECKPOINT.md`.

```powershell
git add tests/auto-learning-browser.spec.js tests/mint-galaxy-release-gate.test.js docs/CURRENT_CHECKPOINT.md
git commit -m "test: gate automatic two-pass learning flow"
```

## Completion Criteria

- New study cards pronounce once without a card pronunciation button.
- Pattern moves from cards to quiz to interpretation once at each boundary.
- Bookquiz exposes four ordered nodes and exactly two passes.
- Pass one cannot grant the final reward.
- Pass two reward is applied once.
- Completed nodes are reviewable without altering final state.
- Offline audio is skipped and learning remains usable.
- Reload restores exact pass, node, and item.
- All existing PWA, offline sync, learning, responsive, and release tests remain green.
