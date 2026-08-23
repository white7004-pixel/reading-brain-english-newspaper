# Task 7 report — Adaptive persistent Monggle coaching

## Status

Complete. The punitive tone model is replaced by a persistent, humane three-stage coach with exact stage actions, quiet/calendar suppression, active-focus support, determined-mode cadence, exact five-minute reminders, safe legacy check-in reads, and accessible 48px actions.

## Files

- `web/src/features/nudges/taskMastery.ts`
- `web/src/features/nudges/taskMastery.test.ts`
- `web/src/features/nudges/taskCheckIn.ts`
- `web/src/features/nudges/taskCheckIn.test.ts`
- `web/src/features/nudges/nudgePolicy.ts`
- `web/src/features/nudges/nudgePolicy.test.ts`
- `web/src/features/nudges/PersistentNowTask.tsx`
- `web/src/features/nudges/PersistentNowTask.test.tsx`
- `web/src/features/today/MonggleCoachPanel.tsx`
- `web/src/features/today/MonggleCoachPanel.test.tsx`
- `web/src/app/AppShell.tsx`
- `web/src/app/AppShell.test.tsx`
- `web/src/features/companion/MonggleCompanion.tsx`
- `web/src/features/companion/MonggleCompanion.test.tsx`
- `web/src/features/companion/companion.css`
- `web/src/core/theme/global.css`
- `web/src/core/theme/studioTheme.test.ts`

## RED / GREEN / build

- RED: `npm test -- --run src/features/nudges src/features/today/MonggleCoachPanel.test.tsx` failed 24 new/updated assertions for missing coach decisions, actions, legacy validation, live regions, callbacks, and suppression.
- GREEN: the exact focused command passes 5 files and 46 tests.
- Build: `npm run build` passes TypeScript and Vite/PWA production output.
- Integration: companion and quiet-hour shell regressions pass. Broader existing checks still include an AppShell assertion for `추천 퀘스트` although `FeaturedQuest` exposes `메인 퀘스트`, plus a Studio-theme assertion that rejects the Task 6 `.monggle-coach-panel .pet-hero` rule.

## Decisions

- The visible Korean stage labels are `부드럽게 시작`, `한번 다시 보기`, and `지금 결정하기`.
- Active focus replaces the competing `start` action with `done` and uses continuation copy.
- Quiet/calendar suppression keeps the coach content visible while changing the live region to `aria-live="off"` and removing `role="status"`.
- `reschedule` and `cancel` call explicit parent callbacks; neither component mutates a task.
- Legacy `done | in_progress | later` records remain readable while new records support all coach actions.
- Shell cadence uses 60 minutes normally and 30 minutes in determined mode; `remind_5` always uses a dedicated exact five-minute calculation.

## Commit

- `feat: add adaptive persistent coaching` (this report is included in the task-only commit)

## Self-review

- Confirmed the three exact stage/action arrays, focus exception, completion reset, non-incrementing start, single reminder increment, quiet/busy null schedule, and copy scan.
- Confirmed no punitive stage names or styling remain in the modified coaching path.
- Confirmed all action buttons use the shared `coach-action` 48px class and persistent controls remain covered by the global tap-size guardrail.
- Confirmed `git diff --check` reports no whitespace errors.

## Concerns

- The unrelated existing `AppShell.test.tsx` assertion for `추천 퀘스트` does not match the current `FeaturedQuest` accessible label `메인 퀘스트`; it was not changed as part of Task 7.
- The unrelated existing `studioTheme.test.ts` pet-hero guard rejects the Task 6 `.monggle-coach-panel .pet-hero` layout rule; Task 7's updated stage-selector assertions pass within that file.
- Calendar-busy state is represented and tested at the policy contract boundary; the current shell has no calendar-busy source to wire yet.
