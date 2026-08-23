# Task 5 report — Persona-aware capture and review candidates

## Status

Complete. Local classification, duplicate-safe candidate storage, explicit candidate review, Seoul-aware candidate-to-task conversion, and persona-aware task-draft review are implemented.

## Files

- `web/src/features/personas/personaClassifier.ts`
- `web/src/features/personas/personaClassifier.test.ts`
- `web/src/features/inbox/candidatePolicy.ts`
- `web/src/features/inbox/candidatePolicy.test.ts`
- `web/src/features/inbox/CandidateInbox.tsx`
- `web/src/features/inbox/CandidateInbox.test.tsx`
- `web/src/core/storage/questCandidateRepository.ts`
- `web/src/core/storage/questCandidateRepository.test.ts`
- `web/src/core/model/task.ts`
- `web/src/features/today/taskDraft.ts`
- `web/src/features/today/TaskDraftReview.tsx`
- `web/src/features/today/TaskDraftReview.test.tsx`
- `web/src/features/today/TodayScreen.tsx`
- `web/src/features/today/TodayScreen.test.tsx`

## RED evidence

- `npm test -- --run src/features/personas/personaClassifier.test.ts`
  - Initial module RED confirmed the classifier was absent; executable stub RED then failed 12 of 14 tests for academy classification, multi-role matching, corrections, archived exclusion, tie-breaking, and category rules.
- `npm test -- --run src/features/inbox/candidatePolicy.test.ts`
  - Initial module RED confirmed the policy was absent; executable stub RED then failed all 12 tests for identity/defaults, terminal dedupe, Seoul conversion, source metadata, and category mapping.
- `npm test -- --run src/core/storage/questCandidateRepository.test.ts`
  - Failed as expected because the repository module was absent.
- `npm test -- --run src/features/inbox/CandidateInbox.test.tsx src/features/today/TaskDraftReview.test.tsx`
  - Candidate inbox module was absent and the draft-review persona test failed because no role control existed.
- `npm test -- --run src/features/today/TodayScreen.test.tsx -t "saves reviewed tasks and shows the first focus action"`
  - Failed as expected because explicit draft persona selections were not copied into persisted tasks.

## GREEN and build evidence

- `npm test -- --run src/features/personas/personaClassifier.test.ts src/features/inbox src/core/storage/questCandidateRepository.test.ts src/features/today/TaskDraftReview.test.tsx`
  - 5 test files passed; 38 tests passed; 0 failed.
- `npm test -- --run src/features/today/TodayScreen.test.tsx -t "saves reviewed tasks and shows the first focus action"`
  - 1 focused regression passed; 0 failed.
- `npm run build`
  - `tsc -b && vite build` passed; 126 modules transformed; production bundle and PWA service worker generation completed.

## Decisions

- Normalized classification phrases with NFC, collapsed whitespace, and Latin lowercase matching; exact normalized corrections return before keyword scoring.
- Scored active personas by distinct matched keywords, ordered ties by persona order and ID, and suppressed duplicate shared-keyword role assignments while retaining independent multi-role matches.
- Used explicit quest-category keyword rules and the required `personal`/`other` fallback.
- Canonicalized candidate IDs as `${source}:${sourceRef}` and gave accepted records higher deterministic dedupe precedence than dismissed and pending records.
- Kept accepted/dismissed candidate records in Dexie. Duplicate `put` calls return the existing record and cannot revive terminal states.
- Extended `TaskSource` with the three candidate sources so accepted tasks retain source plus `sourceRef`; mapped quest categories into legacy `Task.category` and stable `categoryId` values.
- Used Asia/Seoul for candidate deadline editing and accepted task days. Candidate conversion remains pure and does not persist by itself.
- Kept `TaskDraft.personaIds` optional so existing local parsing remains backward compatible, while reviewed selections are explicitly returned and persisted.
- Reused the established 48 px app-shell/check-row target contract and added a candidate-specific tap-target class to review actions and role labels.

## Commit

- `feat: review and classify incoming work`

## Self-review

- Confirmed KakaoTalk, KakaoWork, and Google Calendar candidates remain pending until an explicit accept callback.
- Confirmed Google confirmed-event storage is untouched; no implicit event-to-task conversion was added.
- Confirmed repository accept/dismiss transitions update instead of delete and terminal records survive re-import attempts.
- Confirmed title and estimate validation, Korean accessible labels, visible text status, and multi-persona checkbox behavior.
- Confirmed all changed Korean source text is valid UTF-8 and no dependencies were added.
- Confirmed task-only staging paths exclude unrelated generated MediaPipe changes.

## Concerns

- `CandidateInbox` is intentionally not composed into the Today dashboard in Task 5; Task 6 owns that integration boundary.
- Existing unrelated generated MediaPipe asset changes remain in the working tree and are excluded from this task.

## Fix round 1

### Status

- Corrected candidate persistence to use `${source}:${sourceRef}` as the sole duplicate and terminal-update identity.
- Added schema v8 with a non-unique candidate `sourceRef` index while preserving every existing store and all other index contracts.

### RED evidence

- `npm test -- --run src/core/storage/questCandidateRepository.test.ts src/core/storage/personaDashboardMigration.test.ts`
  - 2 of 8 tests failed as intended.
  - Repository RED returned `kakaotalk:shared-X` for both the KakaoTalk and KakaoWork inserts.
  - Schema RED raised a `ConstraintError` when two canonical IDs reused `sourceRef: external-item-X` across providers.

### GREEN and build evidence

- `npm test -- --run src/features/inbox/candidatePolicy.test.ts src/core/storage/questCandidateRepository.test.ts src/core/storage/personaDashboardMigration.test.ts`
  - 3 test files passed; 20 tests passed; 0 failed.
- `npm run build`
  - `tsc -b && vite build` passed; 126 modules transformed; production bundle and PWA service worker generation completed.

### Decisions and self-review

- Replaced repository `sourceRef` queries in `put` and `accept` with primary-key `get(canonical.id)` calls; `dismiss` already accepted the canonical ID directly.
- Kept `sourceRef` indexed in v8 for future source-local queries, but removed global uniqueness so equal provider-native references can coexist.
- Copied every v7 store into v8 unchanged except `questCandidates: '&id,sourceRef,status'`, preventing an upgrade from dropping unrelated stores.
- Regression coverage proves cross-source coexistence, accepts only the KakaoTalk canonical record, and leaves the KakaoWork record pending and unchanged.
- Task-only staging continues to exclude unrelated generated MediaPipe changes.

### Commit

- `fix: scope candidate identity by source`

### Concerns

- None in fix-round scope.
