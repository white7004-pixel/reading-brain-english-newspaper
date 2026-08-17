# Task 4: Content Editor, Review Panel, and Preview Report

## Delivered

- Added `ArticleEditor` with seven independent sections: basic information, difficulty and age, learning content, vocabulary, quiz, sources and media, and operational history.
- Made pages, vocabulary, quizzes, sources, media, and quiz options editable with add/update/remove controls. Every accepted edit runs through `applyArticleEdit`, emits the updated `StudioArticle`, and surfaces saved or failed status.
- Added `ReviewPanel` with sequential facts, language, and age-review stages, reviewer/timestamp records, validation issues, and anchor links to the relevant editor sections.
- Kept final approval disabled until all three review stages are complete, and publication disabled until the current working version is approved.
- Added a two-step withdrawal control so a published article is not withdrawn until the user confirms it.
- Added `StudioPreview`, which clones the working article into the learner `Article` shape and renders the real `ReaderScreen` inside a mobile frame. Learner event, finish, and back callbacks are intentionally no-ops, so preview interaction creates no learning or storage records.
- Wired the Task 3 dashboard callbacks: opening an existing row enters the workspace, creating content persists a valid blank draft and opens it, and all editor/workflow updates are upserted into the existing versioned local store.
- Added responsive workspace, editor, review, validation, and preview styles.

## TDD evidence

1. Added `tests/studio-editor.test.tsx` before the new editor, review, and preview modules existed.
2. Ran `npm test -- tests/studio-editor.test.tsx`; the suite failed during import because `@/components/studio/studio-preview` did not exist.
3. Implemented the components and app-shell integration against the failing behaviors.
4. The first implementation run passed five of six behaviors. The remaining test exposed an ambiguous dashboard query because the same article intentionally appears in both the global review queue and content list; the test was scoped to the accessible content-list boundary.
5. The next run exposed that the visual arrow was part of the back button's accessible name. Added the explicit `목록으로` accessible label and reran the focused suite to green.

## Behavior covered

- Missing sources prevent facts-review completion and provide a link to the source editor.
- Approval and publication unlock in workflow order.
- Editing a published article creates working version 2, reports a saved state, and supports page addition.
- Withdrawal opens confirmation and can be cancelled without changing publication state.
- Preview displays and navigates the working copy without mutating it.
- Existing-article open and new-content creation callbacks reach the editor and persist the new draft.

## Verification

- `npm test -- tests/studio-editor.test.tsx` — 1 test file, 6 passing tests.
- `npm run lint` — TypeScript exited 0.
- `npm test` — 14 test files and 53 tests passing.
- `npm run build` — Next.js 16.3.1 production build compiled, type-checked, and generated `/studio` successfully.
- `git diff --check` — no whitespace errors.

## Design and scope notes

- Followed the installed Next.js 16 documentation for client component boundaries and global CSS. Interactive editor modules are client components and do not introduce server-only imports.
- Applied the React best-practices review after editing the TSX set: imports remain direct, storage uses the existing versioned schema, derived active-article state is calculated during render, and no extra effect-driven derived state or network waterfall was introduced.
- The review UI deliberately delegates completion rules to the existing `validateStage` interface. At this baseline that domain validator reports the required-source rule; adding stricter language or age validation belongs in the workflow contract rather than duplicating rules in the UI.
- Autosave is synchronous and writes each accepted edit, matching the task requirement. If content size or remote persistence grows later, batching/debouncing should be introduced together with explicit pending and retry semantics.

---

## Fix Round 1

### Outcome

Resolved review findings C1, C2, I1-I7 and the touched M1/M2 boundaries.

- Expanded the editable schema to version 2 with English summary, subtopic, minimum/maximum age, reading seconds, safety review/flags, vocabulary examples, quiz type/evidence, source type/supported facts, media-use confirmation, rights/reconstruction confirmation, preview review, and change reasons.
- Added a backward-compatible schema-one migration while keeping the existing storage key. Editable storage now accepts structurally valid partial rows and round-trips incomplete vocabulary, quiz, source, and media drafts without replacing the workspace or losing unrelated articles.
- Added comprehensive, path-specific facts/language/age validators. Facts validate required metadata, source URL/date/type/fact notes, reconstruction, rights, and media conditions; language validates body, all vocabulary fields, quiz type/options/answer/explanation/evidence, AR note/value, word count, key sentence, and the three-minute limit; age validates numeric age bounds, learning goal, safety review/flags, and key concept.
- Approval and publication now rerun all stage validators. Both require review records for the current content and a durable preview acknowledgement for the current working version.
- Replaced partial invalidation sets with an exhaustive compile-time field-to-earliest-stage map. Media invalidates facts, reading-time fields invalidate language, key concept invalidates age, learner-facing edits invalidate preview acknowledgement, and edits after either publication or withdrawal increment the working version.
- Added explicit persistence results, an independent in-memory editor draft, saving/saved/failed states, and retry flows. Initial seed failure and preview-acknowledgement failure are visible and retryable without trapping or discarding the working copy.
- Added accessible controls for every approved editorial field, controlled media provider/URL editing with permissive intermediate rows, captured change reasons, and displayed revision history.
- Added exact issue-to-control IDs, links, `aria-invalid`, and `aria-describedby` associations, including indexed array fields.
- Clamped the real reader's current page when live edits shrink the page array. Preview remains read-only and its navigation does not write studio or learner state.
- Added mobile-only Edit/Review/Preview tabs with tablist/tabpanel semantics, roving tab index, ArrowLeft/ArrowRight wrapping, Home/End navigation, focus management, and preserved desktop layout.

### TDD red/green evidence

1. Store regressions were written first. `npm test -- tests/studio-store.test.ts` failed 2 of 11 tests because partial rows triggered seed replacement and schema-one state did not migrate. Schema-v2 structural validation and migration made all 11 pass.
2. Workflow validation/invalidation tables were written first. The initial run failed 55 of 79 cases. Comprehensive stage validation, approval/publication revalidation, exhaustive invalidation, and withdrawn-version behavior made the suite green. Preview-version guards then failed 1 of 81 until durable acknowledgement was implemented.
3. Throwing-storage UI tests failed before implementation with `QuotaExceededError`; the editor previously lost the persistence result. Explicit results, draft buffering, and retry UI made them pass.
4. Approved-field, controlled-media, and exact-association tests failed 3 of 11 before the missing controls and validation mapping were added.
5. Live preview, acknowledgement, and mobile-tab tests failed 3 of 14 before page clamping, durable acknowledgement UI, and accessible tabs were implemented.
6. Runtime source-type, quiz-type, and key-concept invalidation regressions failed 3 of 83 before the final domain rules were added. Invalid source dates failed 1 of 84 until strict ISO-date validation was added.
7. Preview acknowledgement storage failure failed 1 of 18 before the retryable preview persistence result was surfaced.

### Boundary coverage

- Partial array rows survive save, unmount, reload, and reopen.
- One partial article cannot discard an unrelated article.
- A throwing `setItem` preserves typed editor values and never reports a false saved state.
- Initial seed and preview acknowledgement writes expose retry controls.
- Preview page navigation leaves the serialized studio state byte-for-byte unchanged.
- Confirmed withdrawal reaches the real storage boundary.
- Invalid fields link to the exact indexed control and share a programmatic message relationship.
- Approval/publication cannot bypass stale or invalid stage data.

### Verification

- `npm test -- tests/studio-editor.test.tsx tests/studio-workflow.test.ts tests/studio-store.test.ts` — focused editor/workflow/store coverage green (113 tests in the final focused set).
- `npm test` — 14 files, 141 tests passing.
- `npm run lint` — TypeScript exited 0.
- `npm run build` — Next.js 16.3.1 production build compiled, type-checked, and statically generated `/`, `/_not-found`, `/manifest.webmanifest`, and `/studio`.
- `git diff --check` — no whitespace errors.

### Files and commits

- Domain/storage: `lib/studio-types.ts`, `lib/studio-store.ts`, `lib/studio-seed.ts`, `lib/studio-workflow.ts`, `lib/studio-validation-ui.ts`.
- UI: `components/studio/article-editor.tsx`, `review-panel.tsx`, `studio-app.tsx`, `studio-preview.tsx`, `components/reader-screen.tsx`, and `app/globals.css`.
- Tests: `tests/studio-fixtures.ts`, `studio-store.test.ts`, `studio-workflow.test.ts`, and `studio-editor.test.tsx`.
- Implementation commit: `fb3ce3e` (`fix: harden studio review workflow`).

### Self-review

- Rechecked every C1/C2/I1-I7 item against the final diff and confirmed each has both a production path and regression coverage.
- Applied the React best-practices checklist after the TSX changes: state ownership remains local to the workspace, no server/client boundary was expanded, preview reuses the existing reader, controlled inputs remain controlled, and effects are limited to external synchronization or media-query subscription.
- The public learner `Article` contract remains backward compatible; new studio-only editorial fields stay out of published snapshots unless an existing learner field already represents them.
- No merge, push, worktree cleanup, network call, or learner-event persistence was performed.
