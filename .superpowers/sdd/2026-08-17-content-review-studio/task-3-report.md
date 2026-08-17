# Task 3: Content Studio Dashboard Report

## Delivered

- Added the `/studio` route and browser-local studio app shell.
- Added a responsive dashboard with workflow summary cards, title/topic search, workflow/domain/estimated-AR/recommended-age filters, newest-first content list, and a new-content control.
- Kept workflow states distinguishable with Korean text and icons in addition to visual styling.
- Added persistence initialization through the existing `loadStudioState` and `saveStudioState` interfaces without changing the domain or storage contracts.
- Added dashboard coverage for workflow totals, title search, and the exported workflow summary helper.

## TDD evidence

1. Added `tests/studio-dashboard.test.tsx` before dashboard production files existed.
2. Ran `npm test -- tests/studio-dashboard.test.tsx`; it failed because `@/components/studio/studio-dashboard` could not be resolved.
3. Implemented the smallest dashboard route, app shell, and dashboard components needed by that behavior.
4. Re-ran the focused test successfully.

## Verification

- `npm test -- tests/studio-dashboard.test.tsx` — 2 passing tests.
- `npm run lint` — TypeScript exited 0.
- `npm test` — 13 test files and 42 tests passing.
- `npm run build` — Next.js production build passed and includes `/studio`.
- `git diff --check` — no whitespace errors.

## Scope and concerns

The dashboard exposes `onCreate` and `onOpen` callbacks, but their editor behavior intentionally remains a no-op in `StudioApp`: article creation and editing are Task 4 scope. No domain or storage interface was redesigned.

## Fix Round 1

### Delivered

- Corrected the summary boundaries: `검수 중` counts only the incomplete facts and language review states, while `승인 대기` counts the fully reviewed `age_reviewed` state that awaits final approval.
- Added the actionable `다음 검수 필요` queue. It maps draft, facts-reviewed, language-reviewed, age-reviewed, and approved articles to their next facts, language, age, approval, and publication actions respectively. Published and withdrawn items are excluded. Every queued item exposes the existing open callback.
- Added accessible names for the content list and next-action queue.
- Expanded dashboard coverage to title/topic search, all filters, newest-first ordering, create/open callbacks, next-action mappings, and workflow count boundaries.

### TDD evidence

1. Added the boundary, queue, filter, ordering, and callback regression tests before changing dashboard production code.
2. Ran `npm test -- tests/studio-dashboard.test.tsx`; 3 of 6 tests failed as expected:
   - `검수 중 2` was absent because the dashboard reported 4.
   - the `다음 검수 필요 목록` queue was absent.
   - the content list lacked its required accessible name.
3. Updated only the dashboard rendering and responsive styles required to make those behaviors observable.
4. Re-ran the focused suite successfully: 6 of 6 tests passed.

### Fix Round 1 verification

- `npm test -- tests/studio-dashboard.test.tsx` — 1 test file, 6 passing tests.
- `npm run lint` — `tsc --noEmit` exited 0.
- `npm test` — 13 test files and 46 tests passing.
- `npm run build` — Next.js production build compiled successfully and generated `/studio`.
