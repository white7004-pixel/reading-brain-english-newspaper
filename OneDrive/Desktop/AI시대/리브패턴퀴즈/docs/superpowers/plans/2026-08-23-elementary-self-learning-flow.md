# Elementary Self-Learning Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 세 학습 섹션과 제공 자료를 유지하면서 초등학생이 약 10분 코스를 혼자 시작하고, 자동 진행·3회 녹음·오답 복습·저장 복귀·보상까지 완료하도록 만든다.

**Architecture:** DOM과 저장소에 직접 얽힌 흐름을 `daily-learning-model.js`의 순수 상태 전이 함수로 분리하고 `app.js`가 화면 렌더링과 브라우저 API를 담당한다. 패턴영어, 북퀴즈, 3단 동사는 같은 `answer → feedback → persist → advance` 규칙을 사용하되 각 섹션의 단계 목록과 콘텐츠 선택기는 별도로 유지한다.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, Web Speech API, MediaRecorder API, LocalStorage, Node.js `node:assert`, 기존 정적 서버

**Spec:** `docs/superpowers/specs/2026-08-23-elementary-self-learning-flow-design.md`

## Global Constraints

- 학습 콘텐츠는 `data/expressions.js`, `data/bookquiz.js`, `data/verbs.js`만 사용한다.
- 최상위 섹션은 패턴영어, 북퀴즈 질문학습, 3단 동사변화 학습으로 유지한다.
- 기본 학습 시간은 약 10분이며 정답·오답·모르겠어요 모두 다음 문제로 정확히 한 번 이동해야 한다.
- 녹음은 통과 점수로 사용하지 않으며 마이크 거부 시에도 코스를 완료할 수 있어야 한다.
- 녹음 파일은 외부로 전송하지 않고 코스 종료 또는 페이지 종료 시 제거한다.
- 기본 동사 코스는 `level === "초등"`인 61개만 사용한다.
- 새 UI는 작은 휴대전화부터 태블릿까지 가로 스크롤과 콘텐츠 잘림 없이 동작해야 한다.

---

## File Structure

- Create `daily-learning-model.js`: 코스 생성, 단계 전이, 오답 대기열, 학년군 설정, 저장 상태 검증을 담당하는 순수 모델
- Create `speech-practice-model.js`: 3회 녹음 단계와 마이크 대체 경로를 담당하는 순수 모델
- Modify `learning-dashboard-model.js`: 홈에 표시할 오늘의 코스와 이어서 하기 요약 생성
- Modify `index.html`: 홈 CTA, 세 섹션 카드, 코스 진행 헤더, 녹음 연습, 완료 화면 마크업
- Modify `app.js`: 모델 연결, 저장·복귀, 공통 답변 처리, 섹션별 코스 어댑터, MediaRecorder 수명 관리
- Modify `mint-galaxy.css`: 새 홈·코스·녹음·완료 화면과 반응형/접근성 스타일
- Create `tests/daily-learning-model.test.js`: 코스 전이·중복 방지·오답·복구 테스트
- Create `tests/speech-practice-model.test.js`: 3회 연습과 권한 거부 대체 경로 테스트
- Modify `tests/learning-dashboard-model.test.js`: 오늘의 코스/이어하기 요약 테스트
- Modify `tests/core-learning-game-ui.test.js`: 공통 진행 UI와 화면 연결 회귀 테스트
- Modify `tests/bookquiz-3d-quiz.test.js`: 단어→질문 자동 전환과 한 번만 이동하는지 검사
- Modify `tests/supporting-game-ui.test.js`: 초등 동사 필터와 동사 코스 완료 검사
- Modify `tests/mobile-duolingo-ui.test.js`: 모바일 잘림·버튼 크기·학습 중 내비게이션 검사

---

### Task 1: Pure daily course state model

**Files:**
- Create: `daily-learning-model.js`
- Create: `tests/daily-learning-model.test.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `createCourse(section, itemIds, options)`, `answerCurrent(course, result)`, `advanceCourse(course)`, `resumeCourse(saved, catalog)`, `gradeBand(grade)`, `elementaryVerbs(verbs)`
- Course shape: `{ version, section, stage, stageIndex, itemIds, itemIndex, answeredToken, reviewIds, completed, grade }`

- [ ] **Step 1: Write the failing model test**

```js
const assert = require("node:assert/strict");
const model = require("../daily-learning-model.js");

const course = model.createCourse("pattern", [1, 2, 3, 4, 5], { grade: 3 });
assert.equal(course.stage, "study");
assert.equal(model.gradeBand(1), "lower");
assert.equal(model.gradeBand(4), "middle");
assert.equal(model.gradeBand(6), "upper");

const wrong = model.answerCurrent(course, { token: "pattern:study:1", correct: false, itemId: 1 });
assert.deepEqual(wrong.reviewIds, [1]);
assert.equal(model.answerCurrent(wrong, { token: "pattern:study:1", correct: true, itemId: 1 }), wrong);

const verbs = [{ id: 1, level: "초등" }, { id: 2, level: "중등" }];
assert.deepEqual(model.elementaryVerbs(verbs).map((item) => item.id), [1]);
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run: `node tests/daily-learning-model.test.js`
Expected: FAIL because `daily-learning-model.js` does not exist.

- [ ] **Step 3: Implement the UMD model with immutable transitions**

```js
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainDailyLearning = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const STAGES = {
    pattern: ["study", "listen", "quiz", "speech", "interpret", "review", "reward"],
    bookquiz: ["word-study", "word-quiz", "pattern-study", "pattern-quiz", "review", "reward"],
    verb: ["study", "listen", "speak", "quiz", "review", "reward"],
  };

  function gradeBand(grade) {
    const value = Math.min(6, Math.max(1, Number(grade) || 1));
    return value <= 2 ? "lower" : value <= 4 ? "middle" : "upper";
  }

  function elementaryVerbs(verbs) {
    return (Array.isArray(verbs) ? verbs : []).filter((item) => item.level === "초등");
  }

  function createCourse(section, itemIds, options = {}) {
    const stages = STAGES[section];
    if (!stages || !Array.isArray(itemIds) || !itemIds.length) return null;
    return { version: 1, section, stage: stages[0], stageIndex: 0, itemIds: itemIds.slice(), itemIndex: 0,
      answeredToken: "", reviewIds: [], completed: false, grade: Math.min(6, Math.max(1, Number(options.grade) || 1)) };
  }

  function answerCurrent(course, result) {
    if (!course || !result?.token || course.answeredToken === result.token) return course;
    const reviewIds = result.correct || course.reviewIds.includes(result.itemId)
      ? course.reviewIds.slice() : [...course.reviewIds, result.itemId];
    return { ...course, answeredToken: result.token, reviewIds };
  }

  return { STAGES, gradeBand, elementaryVerbs, createCourse, answerCurrent, advanceCourse, resumeCourse };
});
```

Implement `advanceCourse` so it advances the item until the stage length is met, then advances to the next `STAGES[section]` entry, and marks `completed: true` after `reward`. Implement `resumeCourse` so unknown versions, missing sections, or missing content IDs fall back to the last valid stage and clamp `itemIndex`.

- [ ] **Step 4: Load the model before `app.js` and verify green**

Add `<script src="daily-learning-model.js?v=20260823"></script>` before `app.js` in `index.html`.

Run: `node tests/daily-learning-model.test.js`
Expected: PASS with duplicate answer tokens ignored and only elementary verbs selected.

- [ ] **Step 5: Commit the model**

```bash
git add daily-learning-model.js tests/daily-learning-model.test.js index.html
git commit -m "feat: add daily learning course model"
```

### Task 2: Student course persistence and recovery

**Files:**
- Modify: `app.js`
- Modify: `tests/daily-learning-model.test.js`
- Modify: `tests/core-learning-game-ui.test.js`

**Interfaces:**
- Consumes: `ReadingBrainDailyLearning.createCourse`, `resumeCourse`
- Produces: `loadLearningProfile()`, `saveLearningProfile()`, `startDailyCourse(section)`, `resumeDailyCourse()`
- Storage key: `rb-learning-profile-v1`

- [ ] **Step 1: Add failing recovery assertions**

```js
const catalog = { pattern: new Set([1, 2, 3, 4, 5]) };
const damaged = { version: 1, section: "pattern", stage: "quiz", stageIndex: 99,
  itemIds: [1, 999], itemIndex: 8, reviewIds: [999], grade: 3 };
const restored = model.resumeCourse(damaged, catalog);
assert.deepEqual(restored.itemIds, [1]);
assert.deepEqual(restored.reviewIds, []);
assert.equal(restored.itemIndex, 0);
```

Add source assertions that `app.js` stores `grade`, `activeCourse`, `dailyStats`, `stars`, `badges`, and `streakDays` under `rb-learning-profile-v1`.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node tests/daily-learning-model.test.js && node tests/core-learning-game-ui.test.js`
Expected: FAIL because recovery and profile persistence are incomplete.

- [ ] **Step 3: Implement one versioned profile record**

```js
const LEARNING_PROFILE_KEY = "rb-learning-profile-v1";

function loadLearningProfile() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEARNING_PROFILE_KEY) || "null");
    return parsed?.version === 1 ? parsed : { version: 1, grade: 3, activeCourse: null,
      dailyStats: {}, stars: 0, badges: [], streakDays: 0 };
  } catch {
    return { version: 1, grade: 3, activeCourse: null, dailyStats: {}, stars: 0, badges: [], streakDays: 0 };
  }
}
```

Call `saveLearningProfile()` after an accepted answer, a stage transition, a recording completion, a course exit, and a reward completion. Reconcile the profile with existing `rb-score`, `rb-review`, `rb-daily`, and `rb-last-position` values without deleting the legacy keys.

- [ ] **Step 4: Verify persistence tests**

Run: `node tests/daily-learning-model.test.js && node tests/core-learning-game-ui.test.js`
Expected: PASS.

- [ ] **Step 5: Commit persistence**

```bash
git add app.js tests/daily-learning-model.test.js tests/core-learning-game-ui.test.js
git commit -m "feat: persist and resume daily learning courses"
```

### Task 3: Home CTA and the three original learning sections

**Files:**
- Modify: `learning-dashboard-model.js`
- Modify: `tests/learning-dashboard-model.test.js`
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`

**Interfaces:**
- Produces: `buildDailyHome(input)` returning `{ ctaLabel, ctaMode, sectionLabel, stepLabel, percent, metrics }`
- Consumes: persisted `activeCourse`, `dailyStats`, `stars`, and existing section totals

- [ ] **Step 1: Write failing dashboard model assertions**

```js
const fresh = buildDailyHome({ activeCourse: null, todayMinutes: 0, stars: 12 });
assert.equal(fresh.ctaLabel, "오늘의 10분 학습");
assert.equal(fresh.ctaMode, "start");

const resumed = buildDailyHome({
  activeCourse: { section: "bookquiz", stage: "pattern-quiz", stageIndex: 3, completed: false },
  todayMinutes: 6,
  stars: 32,
});
assert.equal(resumed.ctaLabel, "이어서 학습하기");
assert.equal(resumed.sectionLabel, "북퀴즈 질문학습");
```

- [ ] **Step 2: Run the dashboard test and verify failure**

Run: `node tests/learning-dashboard-model.test.js`
Expected: FAIL because `buildDailyHome` is not exported.

- [ ] **Step 3: Implement dashboard summary and markup**

Add `buildDailyHome` to `learning-dashboard-model.js`. Replace the current dashboard hero with:

```html
<button id="dailyCourseCta" class="daily-course-cta" type="button">
  <span id="dailyCourseEyebrow">오늘의 학습 · 약 10분</span>
  <strong id="dailyCourseTitle">패턴영어</strong>
  <span id="dailyCourseStep">새 표현 배우기</span>
</button>
<div class="learning-section-grid" aria-label="학습 섹션">
  <button data-course-section="pattern">패턴영어</button>
  <button data-course-section="bookquiz">북퀴즈 질문학습</button>
  <button data-course-section="verb">3단 동사변화 학습</button>
</div>
```

Wire the CTA to `resumeDailyCourse()` when a valid active course exists and to `startDailyCourse("pattern")` otherwise. Keep the existing hub map available inside 패턴영어 rather than as a competing top-level CTA.

- [ ] **Step 4: Verify dashboard and shell tests**

Run: `node tests/learning-dashboard-model.test.js && node tests/mint-galaxy-shell.test.js && node tests/mobile-duolingo-ui.test.js`
Expected: PASS.

- [ ] **Step 5: Commit the home experience**

```bash
git add learning-dashboard-model.js tests/learning-dashboard-model.test.js index.html app.js mint-galaxy.css
git commit -m "feat: make daily learning the primary home action"
```

### Task 4: Shared single-advance answer controller

**Files:**
- Modify: `daily-learning-model.js`
- Modify: `tests/daily-learning-model.test.js`
- Modify: `app.js`
- Modify: `tests/core-learning-game-ui.test.js`
- Modify: `tests/bookquiz-3d-quiz.test.js`
- Modify: `tests/supporting-game-ui.test.js`

**Interfaces:**
- Produces: `createAdvanceGuard() -> { run(token, callback), cancel(), pendingToken() }`
- Consumes: `checkQuiz`, `checkBQAnswer`, `checkVerbQuiz`

- [ ] **Step 1: Write a failing duplicate-advance test**

```js
const guard = model.createAdvanceGuard();
let advances = 0;
assert.equal(guard.run("q:1", () => { advances += 1; }), true);
assert.equal(guard.run("q:1", () => { advances += 1; }), false);
assert.equal(advances, 1);
guard.cancel();
assert.equal(guard.pendingToken(), "");
```

Add source-level assertions that all three answer handlers call the same `scheduleCourseAdvance(token, delay, next)` wrapper rather than raw `setTimeout(newQuiz...)`, `setTimeout(newBQQuiz...)`, or `setTimeout(newVerbQuiz...)`.

- [ ] **Step 2: Run three focused suites and verify failure**

Run: `node tests/daily-learning-model.test.js && node tests/core-learning-game-ui.test.js && node tests/bookquiz-3d-quiz.test.js && node tests/supporting-game-ui.test.js`
Expected: FAIL because answer handlers use independent timers.

- [ ] **Step 3: Implement the shared controller**

```js
const answerAdvance = dailyLearning.createAdvanceGuard();

function scheduleCourseAdvance(token, delay, next) {
  return answerAdvance.run(token, () => {
    window.setTimeout(() => {
      answerAdvance.cancel();
      next();
    }, delay);
  });
}
```

In each answer handler: disable choices first, compute a stable token from section/stage/item/count, call `answerCurrent`, persist, then call `scheduleCourseAdvance`. Cancel a pending advance when leaving a course or switching sections.

- [ ] **Step 4: Verify all answer paths**

Run: `node tests/daily-learning-model.test.js && node tests/core-learning-game-ui.test.js && node tests/bookquiz-3d-quiz.test.js && node tests/supporting-game-ui.test.js`
Expected: PASS with one accepted answer and one scheduled transition per token.

- [ ] **Step 5: Commit shared progression**

```bash
git add daily-learning-model.js tests/daily-learning-model.test.js app.js tests/core-learning-game-ui.test.js tests/bookquiz-3d-quiz.test.js tests/supporting-game-ui.test.js
git commit -m "fix: unify quiz feedback and next-question flow"
```

### Task 5: Three-round recording practice before interpretation

**Files:**
- Create: `speech-practice-model.js`
- Create: `tests/speech-practice-model.test.js`
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Modify: `tests/interpret-console-ui.test.js`

**Interfaces:**
- Produces: `createPractice(itemId)`, `completeRound(practice, recordingUrl)`, `skipRecording(practice)`, `canStartInterpret(practice)`
- Practice shape: `{ itemId, round, completedRounds, recordingUrls, fallbackUsed, complete }`

- [ ] **Step 1: Write the failing three-round test**

```js
const assert = require("node:assert/strict");
const speech = require("../speech-practice-model.js");
let practice = speech.createPractice(17);
assert.equal(practice.round, 1);
practice = speech.completeRound(practice, "blob:one");
practice = speech.completeRound(practice, "blob:two");
practice = speech.completeRound(practice, "blob:three");
assert.equal(practice.complete, true);
assert.equal(speech.canStartInterpret(practice), true);
assert.equal(speech.skipRecording(speech.createPractice(17)).fallbackUsed, true);
```

- [ ] **Step 2: Run and verify missing module failure**

Run: `node tests/speech-practice-model.test.js`
Expected: FAIL because `speech-practice-model.js` does not exist.

- [ ] **Step 3: Implement the model and recording UI**

Add the UMD model and load it before `app.js`. Add `#speechPracticeView` containing round indicators, prompt, record, stop, playback, re-record, `연습했어요`, and `통역 테스트 시작` controls.

In `app.js`, keep recorder resources in one object:

```js
const speechCapture = { recorder: null, stream: null, chunks: [], urls: [] };

function releaseSpeechCapture() {
  speechCapture.stream?.getTracks().forEach((track) => track.stop());
  speechCapture.urls.forEach((url) => URL.revokeObjectURL(url));
  speechCapture.recorder = null;
  speechCapture.stream = null;
  speechCapture.chunks = [];
  speechCapture.urls = [];
}
```

Request `navigator.mediaDevices.getUserMedia({ audio: true })` only after the record button is pressed. On denial or unsupported MediaRecorder, show `음성을 듣고 연습한 뒤 계속할 수 있어요` and enable `연습했어요`. Never upload blobs or persist blob URLs to LocalStorage.

- [ ] **Step 4: Verify speech and interpretation tests**

Run: `node tests/speech-practice-model.test.js && node tests/interpret-console-ui.test.js && node tests/interpretation-model.test.js`
Expected: PASS, including the fallback route.

- [ ] **Step 5: Commit speech practice**

```bash
git add speech-practice-model.js tests/speech-practice-model.test.js index.html app.js mint-galaxy.css tests/interpret-console-ui.test.js
git commit -m "feat: add three-round speaking practice"
```

### Task 6: Connect Bookquiz and verb content to complete courses

**Files:**
- Modify: `app.js`
- Modify: `index.html`
- Modify: `tests/bookquiz-3d-quiz.test.js`
- Modify: `tests/supporting-game-ui.test.js`

**Interfaces:**
- Consumes: Bookquiz word IDs 8001–8021, pattern IDs 9001–9022, `elementaryVerbs(verbs)`
- Produces: `startBookquizCourse()`, `advanceBookquizStage()`, `startVerbCourse()`, `advanceVerbStage()`

- [ ] **Step 1: Add failing section-flow assertions**

```js
assert.match(app, /function startBookquizCourse\(/);
assert.match(app, /"word-study"[\s\S]*"word-quiz"[\s\S]*"pattern-study"[\s\S]*"pattern-quiz"/);
assert.match(app, /dailyLearning\.elementaryVerbs\(verbs\)/);
assert.doesNotMatch(app.slice(app.indexOf("function startVerbCourse"), app.indexOf("function bqPool")), /verbs\.filter\([^)]*중등/);
```

- [ ] **Step 2: Run focused suites and verify failure**

Run: `node tests/bookquiz-3d-quiz.test.js && node tests/supporting-game-ui.test.js`
Expected: FAIL because the existing card/quiz tabs are not a persisted course.

- [ ] **Step 3: Implement the two course adapters**

Bookquiz starts with five word items per short session and automatically changes `state.bqType` from `word` to `pattern` at the stage boundary. Preserve manual card/quiz tabs for free practice, but hide them during an active daily course.

Verb daily sessions select five items from `dailyLearning.elementaryVerbs(verbs)`, ordered so unseen IDs appear before mastered IDs. The quiz must ask both `past` and `pp` across the session, and its review stage repeats only missed verb IDs.

- [ ] **Step 4: Verify Bookquiz and verb suites**

Run: `node tests/bookquiz-3d-quiz.test.js && node tests/supporting-game-ui.test.js && node tests/card-content-alignment.test.js`
Expected: PASS.

- [ ] **Step 5: Commit section adapters**

```bash
git add app.js index.html tests/bookquiz-3d-quiz.test.js tests/supporting-game-ui.test.js tests/card-content-alignment.test.js
git commit -m "feat: connect bookquiz and verb daily courses"
```

### Task 7: Review, reward, grade assistance, and completion UI

**Files:**
- Modify: `daily-learning-model.js`
- Modify: `tests/daily-learning-model.test.js`
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Modify: `tests/game-feedback-ui.test.js`

**Interfaces:**
- Produces: `rewardForCourse(course, stats)`, `assistanceForGrade(grade)`, `finishDailyCourse()`
- Reward shape: `{ stars, retrySuccesses, badgeId, streakDays }`

- [ ] **Step 1: Write failing reward and assistance tests**

```js
assert.deepEqual(model.assistanceForGrade(1), { band: "lower", hintVisible: true, maxWords: 4 });
assert.deepEqual(model.assistanceForGrade(4), { band: "middle", hintVisible: false, maxWords: 8 });
assert.deepEqual(model.assistanceForGrade(6), { band: "upper", hintVisible: false, maxWords: 14 });
const reward = model.rewardForCourse({ completed: true }, { correct: 8, retrySuccesses: 2, streakDays: 3 });
assert.equal(reward.stars, 30);
assert.equal(reward.badgeId, "streak-3");
```

- [ ] **Step 2: Run and verify failure**

Run: `node tests/daily-learning-model.test.js && node tests/game-feedback-ui.test.js`
Expected: FAIL because reward and grade assistance functions are absent.

- [ ] **Step 3: Implement review and completion screens**

Render review items from `course.reviewIds`, count an item once when answered correctly in review, and show `다시 도전 성공` without removing previous stars. `finishDailyCourse()` applies the reward once, clears `activeCourse`, retains cumulative stats, releases recordings, and returns to the updated home.

Use `assistanceForGrade` only for display density and default hint visibility; never delete higher-level source content based on grade.

- [ ] **Step 4: Verify reward behavior**

Run: `node tests/daily-learning-model.test.js && node tests/game-feedback-ui.test.js && node tests/learning-dashboard-model.test.js`
Expected: PASS with idempotent rewards.

- [ ] **Step 5: Commit review and reward**

```bash
git add daily-learning-model.js tests/daily-learning-model.test.js index.html app.js mint-galaxy.css tests/game-feedback-ui.test.js tests/learning-dashboard-model.test.js
git commit -m "feat: add review and daily course rewards"
```

### Task 8: Responsive accessibility and full release gate

**Files:**
- Modify: `mint-galaxy.css`
- Modify: `index.html`
- Modify: `tests/mobile-duolingo-ui.test.js`
- Modify: `tests/card-content-alignment.test.js`
- Modify: `tests/mint-galaxy-release-gate.test.js`

**Interfaces:**
- Consumes: all new `[data-course-*]`, `.daily-course-*`, `.speech-practice-*`, `.course-reward-*` elements
- Produces: release gate covering mobile, tablet, keyboard focus, no-overflow, reduced motion

- [ ] **Step 1: Add failing responsive and accessibility assertions**

```js
assert.match(css, /\.daily-course-cta[\s\S]*min-height:\s*48px/);
assert.match(css, /\.course-question[\s\S]*overflow-wrap:\s*anywhere/);
assert.match(css, /@media\s*\(max-width:\s*480px\)/);
assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
assert.match(html, /aria-live="polite"/);
assert.match(html, /aria-label="학습 진행률"/);
```

- [ ] **Step 2: Run visual contract tests and verify failure**

Run: `node tests/mobile-duolingo-ui.test.js && node tests/card-content-alignment.test.js && node tests/mint-galaxy-release-gate.test.js`
Expected: FAIL on missing course-specific responsive rules and ARIA status regions.

- [ ] **Step 3: Implement responsive and reduced-motion rules**

Use fluid widths (`width: min(100%, ...)`), centered grids, `minmax(0, 1fr)`, and `overflow-wrap: anywhere`. At 480px collapse all answer and section grids to one column. Keep the primary action within thumb reach and ensure every interactive element has a 48px minimum block size. Under reduced motion, remove reward bursts and shorten automatic feedback transitions without removing status text.

- [ ] **Step 4: Run syntax, full suite, diff, and server checks**

Run:

```powershell
node --check app.js
node --check daily-learning-model.js
node --check speech-practice-model.js
$tests = Get-ChildItem -LiteralPath tests -Filter '*.test.js' | Sort-Object Name
foreach ($test in $tests) { node $test.FullName; if ($LASTEXITCODE -ne 0) { throw $test.Name } }
git diff --check
(Invoke-WebRequest -Uri 'http://localhost:4174' -UseBasicParsing -TimeoutSec 10).StatusCode
```

Expected: all tests PASS, `git diff --check` exits 0, and the app returns HTTP 200.

- [ ] **Step 5: Manually verify the critical student journeys**

At 360×800, 412×915, and 768×1024 verify:

- fresh student → grade selection → 오늘의 10분 학습
- pattern card → quiz → three recordings → interpretation → review → reward
- microphone denied → 연습했어요 → interpretation
- Bookquiz word → word quiz → question pattern → question quiz → reward
- elementary verb study → past/pp quiz → review → reward
- close during quiz → reload → exact question restored without duplicate score

- [ ] **Step 6: Commit the release gate**

```bash
git add index.html mint-galaxy.css tests/mobile-duolingo-ui.test.js tests/card-content-alignment.test.js tests/mint-galaxy-release-gate.test.js
git commit -m "test: gate elementary daily learning release"
```

## Android Store Follow-Up

After the web learning flow passes Task 8, create a separate Android release plan covering Android 16/API 36 packaging, microphone permission messaging, local recording lifecycle verification, Play Billing choice, privacy policy, Data safety declarations, Families policy review, store assets, and physical-device testing. That work is intentionally excluded from this implementation plan so the web learning experience remains independently testable.

