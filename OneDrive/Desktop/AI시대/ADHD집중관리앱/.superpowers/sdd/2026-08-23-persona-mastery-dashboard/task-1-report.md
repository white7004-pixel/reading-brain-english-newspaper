# Task 1 report — Domain contracts and Dexie v7 migration

## Status

DONE

## Files changed

- `web/src/core/model/persona.ts`
- `web/src/core/model/recurrence.ts`
- `web/src/core/model/questCandidate.ts`
- `web/src/core/model/task.ts`
- `web/src/core/storage/database.ts`
- `web/src/core/storage/taskRepository.ts`
- `web/src/core/storage/personaDashboardMigration.test.ts`

## Design decisions

- Added the persona, recurrence, quest-candidate, and external-calendar contracts exactly as specified.
- Kept `Task.personaIds` optional at the model boundary so existing task literals stay compatible; repository reads and writes normalize it to `[]`.
- Kept the existing `TaskSource` union unchanged because no candidate-to-task conversion exists in this task; `Task.sourceRef` is available for a later explicit conversion.
- Added Dexie v7 with all prior stores preserved and the six specified persona dashboard stores added.
- Repository normalization remains non-destructive on reads: the normalized object is returned without writing the legacy record back to IndexedDB.

## Tests and commands

- `npm test -- --run src/core/storage/personaDashboardMigration.test.ts` — expected RED: 2 failures. Legacy read lacked `personaIds`; v7 table property was undefined.
- `npm test -- --run src/core/storage/personaDashboardMigration.test.ts src/core/storage/repositories.test.ts` — PASS: 2 files, 7 tests.
- `npm run build` — PASS (exit code 0): `tsc -b && vite build`.
- `git diff --check -- <task files>` — PASS: no whitespace errors.

## Self-review findings

- Confirmed each new table uses the required primary key and indexes.
- Confirmed the migration test checks both legacy read normalization and that reading does not persist the new field.
- Confirmed the test uses the actual exported domain interfaces and database table properties.
- No unrelated source files were modified.

## Commit

Commit hash: pending

## Concerns

None.
