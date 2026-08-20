# Monggle Required Mission Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users explicitly commit required missions, execute one next action at a time, and retain unfinished missions across midnight until explicit completion.

**Architecture:** Extend the existing local-first `Task` aggregate with commitment and execution fields, then isolate state transitions in pure domain functions. Repositories persist the state in Dexie; Today, Focus, nudges, and widgets consume the same selector so every surface shows the same mission.

**Tech Stack:** React 19, TypeScript 5.9, Dexie 4, Vitest, Testing Library, Playwright, Capacitor widget bridge

**Spec:** `docs/superpowers/specs/2026-08-21-monggle-mission-calendar-island-design.md`

## Global Constraints

- Users choose required missions without an app-enforced count limit.
- Required missions remain required until explicit completion or explicit uncommit.
- Midnight never rolls an unfinished required mission to another day or resets progress.
- Completion requires an explicit user action; elapsed time is insufficient.
- Quiet hours remain authoritative for notifications.
- Core mission execution must work offline.

---

### Task 1: Required mission domain model and persistence

**Files:**
- Modify: `web/src/core/model/task.ts`
- Modify: `web/src/core/storage/database.ts`
- Modify: `web/src/core/storage/taskRepository.ts`
- Modify: `web/src/core/storage/repositories.test.ts`
- Create: `web/src/features/missions/missionState.ts`
- Test: `web/src/features/missions/missionState.test.ts`

**Interfaces:**
- Produces: `MissionCommitment`, `commitMission(task, input, now)`, `uncommitMission(task, now)`, `completeMission(task, now)`, `listRequiredOpen()`.
- Consumes: existing `Task`, `MonggleDatabase`, and task repository normalization.

- [ ] **Step 1: Write failing model and repository tests**

```ts
it('keeps an unfinished required mission in its original commitment', async () => {
  const committed = commitMission(task(), { firstAction: '책 펼치기', scheduledStart: '2026-08-21T23:50:00+09:00', timeLocked: false }, new Date('2026-08-21T09:00:00+09:00'))
  await taskRepository.put(committed)
  expect(await taskRepository.listRequiredOpen()).toMatchObject([{ id: 'task-1', required: true, commitmentDay: '2026-08-21' }])
})

it('does not complete without explicit completion', () => {
  expect(commitMission(task(), { firstAction: '책 펼치기', timeLocked: false }, now).status).toBe('open')
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `cd web && npm run test:run -- src/features/missions/missionState.test.ts src/core/storage/repositories.test.ts`

Expected: FAIL because commitment fields and `listRequiredOpen` do not exist.

- [ ] **Step 3: Add the minimal domain fields and transitions**

```ts
export interface MissionCommitment {
  required: boolean
  commitmentDay: string
  firstAction: string
  scheduledStart?: string
  timeLocked: boolean
  committedAt: string
  completedAt?: string
}

// Add these migration-safe properties to the existing Task interface.
required?: boolean
commitmentDay?: string
firstAction?: string
scheduledStart?: string
timeLocked?: boolean
committedAt?: string
completedAt?: string

export function completeMission(task: Task, now: Date): Task {
  if (!task.required) throw new Error('MISSION_NOT_COMMITTED')
  return { ...task, status: 'completed', completedAt: now.toISOString(), updatedAt: now.toISOString() }
}
```

Add Dexie version 4 with `tasks: '&id,day,status,dueAt,categoryId,required,commitmentDay'`. Normalize legacy tasks to `required: false` and add `listRequiredOpen()` using `required` plus an in-memory status filter.

- [ ] **Step 4: Run focused and full tests**

Run: `cd web && npm run test:run -- src/features/missions/missionState.test.ts src/core/storage/repositories.test.ts && npm run test:run`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/core/model/task.ts web/src/core/storage/database.ts web/src/core/storage/taskRepository.ts web/src/core/storage/repositories.test.ts web/src/features/missions
git commit -m "feat: add required mission lifecycle"
```

### Task 2: Commitment review and one-mission execution UI

**Files:**
- Create: `web/src/features/missions/MissionCommitmentReview.tsx`
- Test: `web/src/features/missions/MissionCommitmentReview.test.tsx`
- Create: `web/src/features/missions/CurrentMissionCard.tsx`
- Test: `web/src/features/missions/CurrentMissionCard.test.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/features/today/selectNowTask.ts`
- Modify: `web/src/core/theme/global.css`

**Interfaces:**
- Consumes: `commitMission`, `completeMission`, `TaskRepository.listRequiredOpen()`.
- Produces: `selectCurrentMission(tasks, now): Task | null` and UI callbacks `onStart`, `onDelay`, `onComplete`, `onReschedule`.

- [ ] **Step 1: Write failing component and selector tests**

```tsx
it('requires explicit confirmation before tasks become required missions', async () => {
  render(<MissionCommitmentReview tasks={[task]} onConfirm={confirm} />)
  await userEvent.type(screen.getByLabelText('첫 행동'), '책 펼치기')
  await userEvent.click(screen.getByRole('button', { name: '필수 미션 확정' }))
  expect(confirm).toHaveBeenCalledWith([expect.objectContaining({ required: true, firstAction: '책 펼치기' })])
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `cd web && npm run test:run -- src/features/missions/MissionCommitmentReview.test.tsx src/features/missions/CurrentMissionCard.test.tsx src/features/today/selectNowTask.test.ts`

Expected: FAIL because the components and required-mission selector do not exist.

- [ ] **Step 3: Implement the review and current mission card**

```ts
export function selectCurrentMission(tasks: Task[], now = new Date()) {
  return selectNowTask(tasks.filter((task) => task.required && task.status !== 'completed' && task.status !== 'canceled'), now)
}
```

Render the first action and `3분만 시작`, `5분 후 다시 알림`, and `일정 다시 잡기`. Keep completion out of timer expiry; only the `완료했어요` action calls `completeMission`.

- [ ] **Step 4: Run component tests and build**

Run: `cd web && npm run test:run -- src/features/missions src/features/today && npm run build`

Expected: tests and TypeScript build PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/features/missions web/src/features/today web/src/core/theme/global.css
git commit -m "feat: add required mission cockpit"
```

### Task 3: Midnight extension, escalation surfaces, and end-to-end verification

**Files:**
- Create: `web/src/features/missions/extendedDay.ts`
- Test: `web/src/features/missions/extendedDay.test.ts`
- Modify: `web/src/app/AppShell.tsx`
- Modify: `web/src/features/nudges/nudgePolicy.ts`
- Modify: `web/src/features/nudges/PersistentNowTask.tsx`
- Modify: `web/src/features/widgets/widgetSnapshot.ts`
- Modify: `web/src/features/widgets/nativeWidgetBridge.ts`
- Create: `web/e2e/required-mission-flow.spec.ts`

**Interfaces:**
- Consumes: `TaskRepository.listRequiredOpen()`, `selectCurrentMission`, settings quiet hours.
- Produces: `missionMode(tasks, now): 'normal' | 'extended'` and a widget snapshot containing `commitmentDay`, `firstAction`, and `escalationLevel`.

- [ ] **Step 1: Write failing midnight, nudge, widget, and E2E tests**

```ts
it('enters extended mode after midnight without changing commitmentDay', () => {
  expect(missionMode([requiredTask({ commitmentDay: '2026-08-21' })], new Date('2026-08-22T00:10:00+09:00'))).toBe('extended')
})
```

The Playwright test must commit two missions, complete one, reload, advance the stored clock fixture past midnight, and assert that the other remains current in `오늘 연장 완료 모드`.

- [ ] **Step 2: Run tests and verify failure**

Run: `cd web && npm run test:run -- src/features/missions/extendedDay.test.ts src/features/nudges src/features/widgets`

Expected: FAIL because extension mode and escalation metadata do not exist.

- [ ] **Step 3: Implement shared extension and escalation state**

```ts
export function missionMode(tasks: Task[], now: Date) {
  const today = dayInSeoul(now)
  return tasks.some((task) => task.required && task.status !== 'completed' && task.commitmentDay < today) ? 'extended' : 'normal'
}
```

Use the same selected mission in the app shell, widget snapshot, and nudge. Escalate presentation from push to widget emphasis to app-entry priority without bypassing `isQuietTime`.

- [ ] **Step 4: Run all verification**

Run: `cd web && npm run test:run && npm run build && npm run e2e -- required-mission-flow.spec.ts`

Expected: all commands PASS on mobile and desktop projects.

- [ ] **Step 5: Commit**

```bash
git add web/src/features/missions web/src/app/AppShell.tsx web/src/features/nudges web/src/features/widgets web/e2e/required-mission-flow.spec.ts
git commit -m "feat: keep required missions active through midnight"
```
