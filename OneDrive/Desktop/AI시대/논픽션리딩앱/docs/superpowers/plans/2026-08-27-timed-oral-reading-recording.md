# Timed Oral Reading Recording Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let learners hear the reference audio, record a timed oral reading, replay or replace it locally, and persist completion metadata before key finding.

**Architecture:** Keep timer/result rules in pure modules, wrap browser microphone and IndexedDB APIs behind focused adapters, and render a state-machine-driven client component inside the reader. Only metadata joins learner attempts; audio blobs remain local and replace the previous recording for the same article page.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 7, MediaRecorder, IndexedDB, Vitest/Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-27-oral-reading-grade-ar-expansion-design.md`

## Global Constraints

- Execute `2026-08-27-grade-ar-direct-learning.md` first; this plan consumes `GradeLevel` and article reading-limit fields.
- Request microphone permission only after the learner presses the recording-start control.
- Use a three-second preparation countdown.
- Recordings never leave the browser and the latest recording replaces the previous one for the same article/page.
- Unsupported browsers, denied permission, empty recordings, and storage failure must not crash or block the rest of the app.
- Pronunciation scoring, speech recognition, uploads, sharing, and teacher feedback are out of scope.
- Before changing client components, read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` completely.

---

### Task 1: Pure Oral-Reading Rules

**Files:**
- Create: `lib/oral-reading.ts`
- Test: `tests/oral-reading.test.ts`

**Interfaces:**
- Consumes: `GradeLevel`, `defaultOralReadingLimitSeconds`.
- Produces: `OralReadingResult`, `resolveOralReadingLimit(article)`, `buildOralReadingResult(input)`.

- [ ] **Step 1: Write failing rule tests**

```ts
expect(resolveOralReadingLimit({ gradeLevel: "elementary-1" })).toBe(90);
expect(resolveOralReadingLimit({ gradeLevel: "elementary-1", oralReadingLimitSeconds: 70 })).toBe(70);
expect(resolveOralReadingLimit({})).toBe(60);
expect(buildOralReadingResult({ articleId: "a", pageIndex: 0, durationMs: 69_500, limitSeconds: 70, stoppedByLimit: false, completedAt: "2026-08-27T00:00:00.000Z" })).toMatchObject({ withinLimit: true, stoppedByLimit: false });
```

- [ ] **Step 2: Run `npm test -- tests/oral-reading.test.ts` and verify missing-module failure.**
- [ ] **Step 3: Implement immutable result construction, positive-duration validation, override/default resolution, and `withinLimit = durationMs <= limitSeconds * 1000`.**
- [ ] **Step 4: Run the focused test and commit with `feat: add oral reading rules`.**

### Task 2: Local Recording Repository

**Files:**
- Create: `lib/oral-recording-store.ts`
- Test: `tests/oral-recording-store.test.ts`

**Interfaces:**
- Produces: `createOralRecordingStore(indexedDb: IDBFactory)` returning `{ save(record), load(articleId, pageIndex), delete(articleId, pageIndex) }`, plus `browserOralRecordingStore` created from `window.indexedDB` only in the client.

- [ ] **Step 1: Add failing tests using a minimal fake IndexedDB adapter that save a Blob, replace the same key, preserve another page, and return `null` for a missing record.**
- [ ] **Step 2: Run the focused suite and verify missing-module failure.**
- [ ] **Step 3: Implement one `nonfiction-lab-recordings` database, version 1, `recordings` object store keyed by `${articleId}:${pageIndex}`, promise wrappers for request/transaction completion, and dependency injection through `createOralRecordingStore` so tests never require a real browser database.**
- [ ] **Step 4: Run the focused suite and commit with `feat: persist oral recordings locally`.**

### Task 3: Recording State Machine Component

**Files:**
- Create: `components/oral-reading-recorder.tsx`
- Modify: `app/globals.css`
- Test: `tests/oral-reading-recorder.test.tsx`

**Interfaces:**
- Props: `{ articleId: string; pageIndex: number; limitSeconds: number; enabled: boolean; onComplete(result: OralReadingResult): void }`.
- Produces: UI states `waiting | preparing | recording | result | error` and the latest local playback URL.

- [ ] **Step 1: Add a failing test proving the start control is disabled until `enabled` is true.**
- [ ] **Step 2: Add failing fake-timer tests for `3, 2, 1`, MediaRecorder start, live remaining time, manual stop, and automatic stop at the limit.**
- [ ] **Step 3: Add failing tests for playback, re-record replacement, permission denial copy, unsupported MediaRecorder copy, empty Blob rejection, and IndexedDB failure that still retains session playback.**
- [ ] **Step 4: Run the suite and confirm behavioral failures rather than setup errors.**
- [ ] **Step 5: Implement the state machine with refs for `MediaRecorder`, `MediaStream`, chunks, countdown timer, recording timer, and object URL. Stop every media track on completion/unmount and revoke replaced URLs.**
- [ ] **Step 6: Render privacy copy “녹음은 이 기기에만 저장돼요”, accessible live timer, “녹음 완료”, “다시 녹음”, and playback controls.**
- [ ] **Step 7: Run the focused suite and commit with `feat: add timed oral reading recorder`.**

### Task 4: Reference-Audio Completion and Reader Gating

**Files:**
- Modify: `components/reader-screen.tsx`
- Test: `tests/reader-screen.test.tsx`

**Interfaces:**
- Consumes: `OralReadingRecorder`, `resolveOralReadingLimit`.
- Produces: `ReaderEvent` variants `audio_complete` and `oral_reading_complete`; the latter carries `oralReadingResult?: OralReadingResult`. Key finding becomes available after a valid oral result.

- [ ] **Step 1: Add failing tests asserting the recorder is initially disabled, becomes enabled after recorded audio `ended`, and becomes enabled after speech synthesis `onend`.**
- [ ] **Step 2: Add a failing test asserting a valid oral result reveals/enables the page’s key-finding action and that navigating pages resets audio/recording completion for the new page.**
- [ ] **Step 3: Run `npm test -- tests/reader-screen.test.tsx` and verify current always-visible key-finder behavior fails the new expectations.**
- [ ] **Step 4: Track `referenceAudioCompleted` and `oralReadingResult` per current page, wire both audio completion paths, render the recorder below the audio control, and emit immutable events.**
- [ ] **Step 5: Preserve a recovery action when reference audio is unavailable so a learner can explicitly continue to recording without falsifying an audio-complete event.**
- [ ] **Step 6: Run focused tests and commit with `feat: require timed reading before key finding`.**

### Task 5: Attempt Metadata and Backward Compatibility

**Files:**
- Modify: `lib/learner-store.ts`
- Modify: `components/learner-app.tsx`
- Test: `tests/learner-store.test.ts`
- Test: `tests/learner-app.test.tsx`

**Interfaces:**
- Consumes: latest `oral_reading_complete` event.
- Produces: optional attempt fields `oralReadingDurationMs`, `oralReadingLimitSeconds`, `oralReadingWithinLimit`, `oralReadingCompletedAt`.

- [ ] **Step 1: Add failing tests that a new completed attempt persists all four fields and a schema-version-3 attempt without them still loads unchanged.**
- [ ] **Step 2: Add a failing learner-flow test that the latest page’s valid oral result is copied into `recordAttempt`.**
- [ ] **Step 3: Run focused suites and verify metadata is currently missing.**
- [ ] **Step 4: Extend optional attempt fields and event typing; select the latest valid oral event without assuming every legacy session has one. Do not persist Blob or object URL data.**
- [ ] **Step 5: Run focused suites and commit with `feat: record oral reading completion`.**

### Task 6: Studio and Publication Validation

**Files:**
- Modify: `components/studio/content-readiness.tsx`
- Modify: `lib/studio-validation-ui.ts`
- Test: `tests/studio-checklist.test.ts`
- Test: `tests/content-readiness.test.tsx`

**Interfaces:**
- Consumes: article grade and optional reading limit from the first plan.
- Produces: readiness feedback for invalid limits while allowing legacy articles to use the resolved default.

- [ ] **Step 1: Add failing tests for a zero/negative/non-integer override and for an absent override that resolves from grade/default.**
- [ ] **Step 2: Run focused tests and verify invalid limits currently pass.**
- [ ] **Step 3: Add precise Korean validation labels and keep the field optional in publication gates.**
- [ ] **Step 4: Run focused tests and commit with `feat: validate oral reading settings`.**

### Task 7: Browser Verification and Release Gate

**Files:**
- Modify: `e2e/learner-journey.spec.ts`

**Interfaces:**
- Consumes: complete audio-to-recording-to-key-finder flow.
- Produces: deterministic browser coverage using injected fake media APIs.

- [ ] **Step 1: Add MediaRecorder/getUserMedia init scripts and a deterministic reference-audio completion hook to the Playwright fixture.**
- [ ] **Step 2: Add a journey that completes audio, observes the three-second preparation, starts recording, manually finishes within the limit, replays, and opens key finding.**
- [ ] **Step 3: Add a second journey that advances the fake clock to the limit and verifies automatic completion copy.**
- [ ] **Step 4: Run the focused e2e spec and fix only failures caused by this feature.**
- [ ] **Step 5: Run `npm test`, `npm run typecheck`, `npm run build`, and the relevant Playwright specs.**
- [ ] **Step 6: Open `http://localhost:3001/` in Chrome and manually verify microphone permission guidance, mobile layout, timer readability, recording replacement, and cross-page cleanup.**
- [ ] **Step 7: Commit with `test: verify timed oral reading journey`.**
