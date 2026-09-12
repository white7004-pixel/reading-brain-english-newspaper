# Plan 001: Separate core learning, speaking practice, and reward games

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving on. Use test-driven development. If a STOP condition occurs, stop and report rather than improvising. When done, update this plan's row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat a2621ab6d..HEAD -- app.js index.html styles.css pattern-hub-model.js interpretation-model.js tests/pattern-hub-model.test.js tests/interpretation-model.test.js tests/learning-flow.test.js`
> This plan was written while the working tree already contained uncommitted learning-flow changes. Also run `git diff -- app.js index.html pattern-hub-model.js tests/pattern-hub-model.test.js` and compare the live symbols with the Current state section. Stop if the named symbols are absent or materially different.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `a2621ab6d`, 2026-08-19

## Why this matters

The app currently presents every activity as a peer navigation item but silently enforces a linear `card → quiz → match → interpretation → blast` state machine. This makes speaking practice unavailable when the learner wants it, makes a reward game part of section completion, and conflicts with both the visible tab order and the original interpretation-test design. The target structure is: core course `card → quiz → match → section complete`; interpretation is optional speaking practice available at any time; Blast is an optional reward game.

## Current state

- `index.html:214-221` renders tabs in the order `hub, study, quiz, match, blast, review, leaderboard, interpret`, which differs from the enforced sequence.
- `app.js:25` loads `flowProgress` directly from `rb-flow-progress`.
- `app.js:515-524` writes per-section flow steps and asks `patternHub.isLearningModeUnlocked` whether a mode is available.
- `app.js:804` requires both card completion and prior flow steps before interpretation can open.
- `app.js:1086-1122` marks interpretation progress and automatically moves a passing learner to Blast.
- `app.js:1828-1831` completes a section quiz after five questions and automatically opens matching.
- `app.js:1903-1905` automatically moves a completed matching board to interpretation.
- `app.js:2242-2250` marks the section cleared only after Blast game over.
- `app.js:2305-2314` silently redirects a requested locked mode to the first incomplete mode.
- `docs/superpowers/specs/2026-08-18-interpretation-test-and-polish-design.md` describes interpretation as a final assessment unlocked at 100% cards. This plan intentionally supersedes only that locking/product-role decision: interpretation becomes optional speaking practice and no longer controls section progress.
- Pure browser-independent behavior follows the UMD model pattern in `pattern-hub-model.js`; tests use Node assertions and explicit `run()` functions as in `tests/pattern-hub-model.test.js`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Syntax | `node --check app.js && node --check pattern-hub-model.js && node --check interpretation-model.js` | exit 0 |
| Flow tests | `node tests/learning-flow.test.js` | `learning-flow tests passed` |
| Existing tests | `node tests/duolingo-palette.test.js && node tests/pattern-hub-model.test.js && node tests/interpretation-model.test.js && node tests/learning-dashboard-model.test.js && node tests/word-games-model.test.js` | all five pass |
| Server smoke | Start `node server.js`, then request `http://127.0.0.1:4174/` | HTTP 200 |

## Scope

**In scope**:

- `app.js`
- `index.html`
- `pattern-hub-model.js`
- `interpretation-model.js` only if a pure item-scope helper belongs there
- `tests/learning-flow.test.js` (create)
- `tests/pattern-hub-model.test.js`
- `tests/interpretation-model.test.js`
- `tests/duolingo-palette.test.js` only for cache-version assertions
- `styles.css` baseline carry-forward only: copy the user's current uncommitted version into the isolated worktree so the existing palette regression test has its required fixture; do not make new edits to this file
- `plans/README.md` status update

**Out of scope**:

- `server.js` and server-side progress schema
- visual palette or layout redesign beyond tab order, labels, and minimal scope controls
- speech-recognition scoring thresholds
- verb and book-quiz modes
- leaderboard scoring rules
- clearing or migrating existing learner data

## Git workflow

- Use branch `advisor/001-learning-mode-separation` if branch creation is requested.
- Match conventional commit style visible in history, for example `feat: separate learning flow from optional practice`.
- Do not push, merge, or open a PR without explicit instruction.

## Steps

### Step 1: Characterize the target product rules in a pure flow model

Create `tests/learning-flow.test.js` first. Test a pure API exported from `pattern-hub-model.js` (or a focused new UMD model only if the existing file would become unclear):

- core sequence is exactly `study → quiz → match`;
- completing matching returns a terminal core-course result rather than `interpret`;
- `interpret` and `blast` are always directly available for a valid selected section;
- section completion depends on core steps only;
- optional activities never unlock or block core steps;
- malformed/missing progress input safely becomes an empty record.

Run the new test and confirm it fails because the current model still defines interpretation and Blast as linear prerequisites. Then minimally change the model until it passes. Remove or replace `LEARNING_FLOW`, `nextLearningMode`, and `isLearningModeUnlocked` if their current semantics no longer match the product.

**Verify**: `node tests/learning-flow.test.js` — prints `learning-flow tests passed`.

### Step 2: Make card, quiz, and matching the only core course

In `app.js`:

- preserve the existing card-completion transition to section quiz;
- preserve the five-question section-quiz transition to matching;
- when the matching board completes, mark the section cleared, persist `rb-cleared`, show a concise completion message, and stop automatic navigation;
- offer explicit buttons/actions for `블래스트 하기` and `허브로 돌아가기`; do not auto-open either activity;
- ensure cumulative quiz remains free practice and does not alter core-course completion;
- remove the Blast game-over call to `markSectionCleared`;
- remove silent mode redirection in `setMode`; direct tab clicks must open the requested valid view.

Do not infer section completion from Blast or interpretation results.

**Verify**: `node tests/learning-flow.test.js && node --check app.js` — both exit 0.

### Step 3: Turn interpretation into always-available speaking practice

In `app.js` and, if useful, `interpretation-model.js`:

- remove card/quiz/match gating from `renderInterpretEntry`;
- hide or remove the `잠김` badge and locked panel for normal valid sections;
- allow entry whenever a concrete section is selected; if `category === "all"`, send the learner to the hub or ask them to select a section rather than creating an undefined test;
- add two explicit scopes on the intro screen: `공부한 표현` (default) and `섹션 전체`;
- for `공부한 표현`, use items in the selected section whose IDs are in `state.mastered`; if none exist, explain that one card must be studied or allow switching to `섹션 전체`;
- for `섹션 전체`, use all items in the selected section;
- retain the existing speech-recognition and self-scoring fallback;
- retain pass percentage as speaking feedback/badge information, but do not call `markSectionCleared`, mutate core flow progress, or auto-open Blast;
- change the result actions to `다시 도전`, `블래스트 하기`, and `허브로 돌아가기`.

Add model tests for learned-only filtering, empty learned scope, and full-section scope. Keep item filtering pure and independent of DOM.

**Verify**: `node tests/interpretation-model.test.js && node tests/learning-flow.test.js && node --check app.js` — all pass.

### Step 4: Make Blast an optional reward game

Keep Blast directly accessible from its tab. On matching completion and interpretation result screens, present Blast as an optional CTA. `blastGameOver` may award score, but must not set core progress or section clearance. Its game-over copy should say `게임 종료` or `보너스 점수 획득`, not `섹션 완료`.

**Verify**: `rg -n 'markSectionCleared|completeFlowStep' app.js` — matches may exist in the matching core-completion path, but none may occur inside `finishInterpretRun` or `blastGameOver`.

### Step 5: Align navigation and cache versions

In `index.html`, order the tabs as:

`허브 | 카드학습 | 퀴즈 | 매칭 | 통역 테스트 | 블래스트 | 복습 | 랭킹`

Remove the interpretation lock badge if it is no longer used. Update the cache query for every changed JavaScript model and `app.js` to `v=20260819-open-practice`. Update the existing cache assertion test accordingly.

**Verify**: `node tests/duolingo-palette.test.js` — passes and confirms the new cache versions.

### Step 6: Run complete verification

Run all syntax and test commands from the Commands table. Start the local server and manually verify these exact paths:

1. Select a fresh section and open interpretation immediately; the intro opens without completing all cards.
2. Default interpretation scope contains only mastered expressions.
3. Switching to full-section scope includes unmastered expressions.
4. Complete five section-quiz questions; matching opens.
5. Complete matching; the section clears and no automatic interpretation/Blast navigation occurs.
6. Open Blast directly; game over does not change section clearance.

**Verify**: all automated commands exit 0 and the server returns HTTP 200.

## Test plan

- Create `tests/learning-flow.test.js` using the assertion/run style from `tests/pattern-hub-model.test.js`.
- Extend `tests/interpretation-model.test.js` with learned-only/full-section item selection tests.
- Keep current normalization, scoring boundary, dashboard, word-game, and palette tests passing.
- If DOM behavior cannot be isolated without a browser, extract only the decision logic to a pure model; do not introduce a test framework or dependency solely for this task.

## Done criteria

- [ ] `node --check app.js`, `pattern-hub-model.js`, and `interpretation-model.js` all exit 0.
- [ ] New flow tests fail before implementation and pass afterward.
- [ ] All five existing test files pass.
- [ ] Matching, not interpretation or Blast, is the only place that clears a section.
- [ ] Interpretation opens for a selected section regardless of card/quiz/match completion.
- [ ] Interpretation offers learned-only and full-section scopes.
- [ ] Blast never alters section completion.
- [ ] Direct mode tabs no longer silently redirect to another mode.
- [ ] Navigation order matches the target order.
- [ ] No files outside Scope are modified.
- [ ] `plans/README.md` status row is updated.

## STOP conditions

- Stop if a valid interpretation run requires a server schema change; report the required data contract instead.
- Stop if matching completion cannot be associated with a concrete section because `state.category` is `all`; propose a UI selection rule rather than clearing an arbitrary section.
- Stop if existing uncommitted user changes overlap the named flow functions in a way that cannot be preserved.
- Stop if a verification command fails twice after a reasonable correction.
- Stop rather than modifying verb or book-quiz flows to imitate this pattern.

## Maintenance notes

- `rb-flow-progress` becomes unnecessary once core completion is derived from `mastered` plus `rb-cleared`. Preserve existing local data but stop relying on optional-step flags; deleting old keys is unnecessary and risks user data.
- If per-device progress consistency becomes important later, design a separate server synchronization change. It is intentionally excluded here.
- Reviewers should focus on whether optional activities can accidentally mutate `rb-cleared` and whether `category === "all"` is handled explicitly.
