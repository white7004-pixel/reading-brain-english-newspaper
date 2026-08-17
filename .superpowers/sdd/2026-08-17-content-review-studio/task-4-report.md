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
