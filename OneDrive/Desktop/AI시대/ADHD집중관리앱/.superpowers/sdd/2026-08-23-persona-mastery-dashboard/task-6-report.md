# Task 6 report — Today dashboard composition

## Status

Complete. The Today screen now composes the approved persona-aware dashboard while preserving focus, reward recovery, widget projection, quick add, draft review, rescheduling, commitment review, priority, timeline, and collapsed planning tools.

## Files

- Created web/src/features/recurring/RecurringChecklist.tsx
- Created web/src/features/recurring/RecurringChecklist.test.tsx
- Created web/src/features/today/MonggleCoachPanel.tsx
- Created web/src/features/today/TodayDashboard.tsx
- Created web/src/features/today/TodayDashboard.test.tsx
- Modified web/src/features/today/TodayScreen.tsx
- Modified web/src/features/today/TodayScreen.test.tsx
- Modified web/src/features/today/FeaturedQuest.tsx
- Modified web/src/features/pet/PetHero.tsx
- Modified web/src/features/pet/PetHero.test.tsx
- Modified web/src/core/theme/global.css
- Extended web/src/core/storage/recurringRepository.ts and its test with instance completion

## RED / GREEN / build evidence

- RED: dashboard/recurring imports were absent; PetHero failed the 3D 몽글 코치 label and 200px contract.
- GREEN: dashboard order, persona filtering, recurring joins/status/target/completion, and PetHero accessibility tests passed (7/7).
- RED: TodayScreen repository integration was absent and recurring repository had no complete method.
- GREEN: persona/recurring/candidate loads, recurring completion, candidate accept/dismiss/error retention, archived selection reset, and recurring persistence tests passed.
- Regression GREEN: all 28 TodayScreen tests passed after reconciling the new featured/remaining split and coach live status.
- Final focused suite: 13 files, 62 tests passed.
- Final production build: TypeScript and Vite/PWA build completed with exit code 0.

## Decisions

- TodayDashboard is presentation-only and receives plain state plus focused callbacks.
- The featured task is selected after persona filtering and excluded from the remaining quest list.
- Multi-persona tasks and recurring templates remain visible for every linked persona.
- Recurring completion persists the recurring instance directly; rewards remain deferred to Task 8.
- Candidate acceptance persists the converted Task before marking the candidate accepted; failures retain the candidate and expose a role alert.
- Candidate inbox is omitted when no pending candidates exist.
- Pet artwork is decorative inside one labeled 3D 몽글 코치 region to prevent duplicate announcements.
- Existing planning tools remain in the collapsed details region after the primary dashboard.

## Commit

feat: compose persona-aware today dashboard

## Self-review

- Verified the seven required labeled regions render in order when populated.
- Verified only the featured quest uses the dark #292735 quest surface.
- Verified new interactive targets are at least 48px, with responsive and reduced-motion rules.
- Verified repository failures do not remove pending candidates.
- Verified unrelated dirty files are excluded from the task commit.

## Concerns

- The repository root spans multiple unrelated projects and contains pre-existing dirty files; staging is explicitly limited to Task 6 paths.

## Review fix round 1

### Changes

- Nested quick add inside the allowed `남은 퀘스트` region and made the dashboard test assert the complete direct-child labeled-region sequence, including the brief's exact `매일 반복업무` label.
- Made converted task IDs deterministic from the canonical candidate source and source reference (`candidate:<source>:<sourceRef>`), so a terminal-state retry upserts one task.
- Added a synchronous per-candidate in-flight guard in TodayScreen and disabled accept/dismiss actions with a textual `수락 중` state while acceptance is pending.
- Added policy, CandidateInbox, and TodayScreen integration coverage for deterministic identity, failed-terminal retry recovery, and rapid double-click deduplication.

### RED evidence

Command:

```text
npm test -- --run src/features/today/TodayDashboard.test.tsx src/features/inbox/candidatePolicy.test.ts src/features/inbox/CandidateInbox.test.tsx src/features/today/TodayScreen.test.tsx -t "renders the approved|converts an accepted|disables candidate actions|retries a failed|guards rapid"
```

Output:

```text
Test Files  4 failed (4)
Tests  5 failed | 44 skipped (49)
```

The failures showed the interleaved `빠른 할 일 입력` direct child, random UUIDs on retry, two rapid persistence calls, and missing in-flight disabled state.

Exact-label RED command:

```text
npm test -- --run src/features/today/TodayDashboard.test.tsx -t "renders the approved"
```

Output:

```text
Test Files  1 failed (1)
Tests  1 failed | 1 skipped (2)
Expected "매일 반복업무"; received "매일 반복 업무".
```

### Final GREEN evidence

Command:

```text
npm test -- --run src/features/today src/features/recurring/RecurringChecklist.test.tsx src/features/pet/PetHero.test.tsx src/features/inbox/CandidateInbox.test.tsx src/features/inbox/candidatePolicy.test.ts
```

Output:

```text
Test Files  15 passed (15)
Tests  81 passed (81)
```

Command:

```text
npm run build
```

Output:

```text
> tsc -b && vite build
✓ 137 modules transformed.
✓ built in 2.59s
PWA v1.3.0
files generated
  dist/sw.js
  dist/workbox-2fbc6a65.js
```

### Review fix commit

`fix: make candidate acceptance idempotent`

### Review concerns

- Candidate task persistence and terminal candidate persistence remain separate operations, but deterministic task identity makes retries idempotent in both storage and Today UI.
