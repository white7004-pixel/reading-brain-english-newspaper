# Task 2 report — Persona repository, defaults, and direct management

## Status

DONE

## Changed files

- `web/src/core/storage/personaRepository.ts`
- `web/src/core/storage/personaRepository.test.ts`
- `web/src/features/personas/PersonaTabs.tsx`
- `web/src/features/personas/PersonaTabs.test.tsx`
- `web/src/features/personas/PersonaManager.tsx`
- `web/src/features/personas/PersonaManager.test.tsx`

## Decisions

- Seeded the five stable defaults using the specified IDs, Korean names, distinct icons, muted colors, Korean classification keywords, and zero-based ordering.
- Made default seeding additive: existing IDs are read before an insert, so user edits to defaults remain intact.
- Reordering places supplied IDs first and preserves every unlisted persona in its current ordered sequence.
- Kept `PersonaManager` persistence-free. Its `repository` prop exposes only `save`, `archive`, `restore`, and `reorder`; the component owns transient form state and immediately reflects successful callbacks.
- The marketing tab displays the concise `마케팅` label while retaining the persisted `마케터` name in accessible text.

## RED / GREEN evidence

- RED: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas` — expected failure: 3 suites could not resolve the new repository/components before implementation.
- GREEN: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas` — PASS: 3 files, 6 tests.
- Build: `npm run build` — PASS: TypeScript build and Vite production bundle completed.

## Commit

- `8ece2e82e9be8395cdd36be6059066b526160274` — `feat: manage work personas`.

## Self-review

- Verified default seeding is idempotent and preserves an edited default.
- Verified active ordering, archive/restore retention, and unlisted-persona reorder behavior.
- Verified tabs expose `aria-pressed`, icon text, a non-color selection marker, and the required add action.
- Verified manager create, normalization-based validation, editing, reordering, archiving, and restoration callbacks.
- `git diff --check` completed with no whitespace errors for task files.

## Concerns

- The manager receives the complete persona list from its parent because the repository interface intentionally exposes only `listActive`; an integrating screen must retain archived records if it wants them shown in the manager.

## Fix round 1/5

### Findings addressed

- New custom personas now use the highest active order plus one, preventing duplicate active orders after archiving an earlier persona.
- Local reorder state now applies the same complete ordered sequence as the repository: requested active IDs first, then all unlisted personas in their current order. Restoring an archived persona therefore matches a persistence reload.
- The manager synchronizes changed `personas` props while retaining the separately held active edit draft.

### Regression evidence

- RED: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas/PersonaManager.test.tsx` — expected failures: sparse-order creation saved order `1` instead of `2`; restored order put the archived persona first; rerender did not show the newly supplied marketing persona.
- GREEN: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas/PersonaManager.test.tsx` — PASS: 2 files, 8 tests.
- Build: `npm run build` — PASS: TypeScript build and Vite production bundle completed.

## Fix round 2/5

### Findings addressed

- Exported the repository's deterministic `comparePersonasByOrder` comparator and use it for every manager sort, including active and archived displays.
- Replaced unconditional prop copying with semantic reconciliation. Unchanged cloned props are ignored; changed incoming records update local state, while local optimistic records survive when the incoming version still matches the prior external snapshot. Acknowledged or genuinely changed optimistic records become authoritative.

### Regression evidence

- RED: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas/PersonaManager.test.tsx` — expected failures: the manager restored equal-order records in insertion order and a stale cloned prop removed the archived local record. The repository equal-order reload test passed, confirming the mismatch was manager-only.
- GREEN: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas/PersonaManager.test.tsx` — PASS: 2 files, 11 tests.
- Build: `npm run build` — PASS: TypeScript build and Vite production bundle completed.
