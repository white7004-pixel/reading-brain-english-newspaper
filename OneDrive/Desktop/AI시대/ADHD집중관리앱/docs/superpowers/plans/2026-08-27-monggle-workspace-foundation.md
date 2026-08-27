# Monggle Workspace Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a usable first milestone with the Warm Clay editorial home, one dominant next action, and persistent `오늘 약속`/`이번 주 약속` sections.

**Architecture:** Add commitments as a small domain linked to existing tasks, stored in a new Dexie table and consumed by TodayScreen. Keep existing task completion and reward settlement authoritative. Recompose TodayDashboard around a work-first hierarchy, then apply scoped visual tokens without changing unrelated feature behavior.

**Tech Stack:** React 19, TypeScript 5.9, Dexie 4, Vitest, Testing Library, Vite, Playwright

**Spec:** `docs/superpowers/specs/2026-08-27-monggle-adult-adhd-workspace-design.md`

## Global Constraints

- Primary user: solo business owners and freelancers who switch among several work roles.
- `오늘 약속` has at most 3 active items; `이번 주 약속` has at most 5.
- A due weekly commitment may appear in Today but remains one entity and produces one reward.
- Existing tasks, personas, recurring instances, completion, reward outbox, calendar data, and pet growth remain authoritative.
- 3D treatment is limited to Monggle and essential status objects; lists and controls stay restrained.
- Use warm cream, charcoal, muted sage, and clay orange; do not introduce purple glow or glass panels.
- No medical assessment, symptom scoring, medication tracking, or automatic punitive state.
- Primary controls remain at least 48 pixels high and reduced motion removes decorative movement.

---

## File Structure

- `web/src/core/model/commitment.ts`: commitment types, period limits, period-key helpers.
- `web/src/core/storage/commitmentRepository.ts`: Dexie persistence and invariant enforcement.
- `web/src/core/storage/database.ts`: schema version 9 and `commitments` table.
- `web/src/features/commitments/commitmentProjection.ts`: projects Today and Week sections without duplication.
- `web/src/features/commitments/CommitmentSection.tsx`: accessible shared commitment list UI.
- `web/src/features/today/WorkNowCard.tsx`: one dominant task, first action, and three-minute start.
- `web/src/features/today/TodayDashboard.tsx`: work-first home composition.
- `web/src/features/today/TodayScreen.tsx`: loads commitments and wires add/remove/complete refresh.
- `web/src/core/theme/global.css`: scoped Warm Clay editorial tokens and Today layout.

### Task 1: Commitment Domain and Period Rules

**Files:**
- Create: `web/src/core/model/commitment.ts`
- Create: `web/src/core/model/commitment.test.ts`

**Interfaces:**
- Produces: `Commitment`, `CommitmentPeriod`, `CommitmentStatus`
- Produces: `commitmentLimit(period): number`
- Produces: `commitmentPeriodKey(period, date): string`

- [ ] **Step 1: Write the failing period-rule tests**

```ts
import { describe, expect, it } from 'vitest'
import { commitmentLimit, commitmentPeriodKey } from './commitment'

describe('commitment rules', () => {
  it('limits Today to 3 and Week to 5', () => {
    expect(commitmentLimit('today')).toBe(3)
    expect(commitmentLimit('week')).toBe(5)
  })

  it('uses Seoul day and Monday-based week keys', () => {
    const date = new Date('2026-08-30T23:30:00Z')
    expect(commitmentPeriodKey('today', date)).toBe('2026-08-31')
    expect(commitmentPeriodKey('week', date)).toBe('2026-W36')
  })
})
```

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run: `cd web && npm test -- --run src/core/model/commitment.test.ts`

Expected: FAIL because `./commitment` does not exist.

- [ ] **Step 3: Implement the model and deterministic keys**

```ts
import { dayInSeoul } from '../../features/missions/extendedDay'

export type CommitmentPeriod = 'today' | 'week'
export type CommitmentStatus = 'active' | 'completed' | 'canceled'

export interface Commitment {
  id: string
  taskId: string
  period: CommitmentPeriod
  periodKey: string
  position: number
  firstAction?: string
  estimateMinutes?: number
  dueAt?: string
  status: CommitmentStatus
  createdAt: string
  updatedAt: string
}

export const commitmentLimit = (period: CommitmentPeriod) => period === 'today' ? 3 : 5

export function commitmentPeriodKey(period: CommitmentPeriod, date: Date) {
  const day = dayInSeoul(date)
  if (period === 'today') return day
  const utc = new Date(`${day}T00:00:00Z`)
  const weekday = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - weekday)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}
```

- [ ] **Step 4: Run the focused test**

Run: `cd web && npm test -- --run src/core/model/commitment.test.ts`

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit the domain unit**

```bash
git add web/src/core/model/commitment.ts web/src/core/model/commitment.test.ts
git commit -m "feat: add commitment period model"
```

### Task 2: Commitment Persistence and Capacity Enforcement

**Files:**
- Modify: `web/src/core/storage/database.ts`
- Create: `web/src/core/storage/commitmentRepository.ts`
- Create: `web/src/core/storage/commitmentRepository.test.ts`

**Interfaces:**
- Consumes: `Commitment`, `CommitmentPeriod`, `commitmentLimit`
- Produces: `createCommitmentRepository(database)` with `listActive`, `put`, `complete`, and `cancel`
- Throws: `CommitmentCapacityError` before writing an over-capacity item

- [ ] **Step 1: Write failing repository tests**

```ts
import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { createDatabase } from './database'
import { CommitmentCapacityError, createCommitmentRepository } from './commitmentRepository'

describe('commitment repository', () => {
  const databases: ReturnType<typeof createDatabase>[] = []
  afterEach(async () => Promise.all(databases.map((db) => db.delete())))

  it('rejects a fourth active Today commitment without changing stored data', async () => {
    const db = createDatabase(`commitments-${crypto.randomUUID()}`)
    databases.push(db)
    const repository = createCommitmentRepository(db)
    for (let position = 0; position < 3; position += 1) {
      await repository.put({ id: `c-${position}`, taskId: `t-${position}`, period: 'today', periodKey: '2026-08-27', position, status: 'active', createdAt: '2026-08-27T00:00:00Z', updatedAt: '2026-08-27T00:00:00Z' })
    }
    await expect(repository.put({ id: 'c-3', taskId: 't-3', period: 'today', periodKey: '2026-08-27', position: 3, status: 'active', createdAt: '2026-08-27T00:00:00Z', updatedAt: '2026-08-27T00:00:00Z' })).rejects.toBeInstanceOf(CommitmentCapacityError)
    expect(await repository.listActive('today', '2026-08-27')).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `cd web && npm test -- --run src/core/storage/commitmentRepository.test.ts`

Expected: FAIL because the repository and database table do not exist.

- [ ] **Step 3: Add Dexie version 9**

Add `commitments!: EntityTable<Commitment, 'id'>`, import `Commitment`, and copy the version 8 store map into `this.version(9).stores(...)` with:

```ts
commitments: '&id,taskId,[period+periodKey],status,position',
```

- [ ] **Step 4: Implement repository invariants**

```ts
export class CommitmentCapacityError extends Error {}

export function createCommitmentRepository(database: MonggleDatabase) {
  const listActive = (period: CommitmentPeriod, periodKey: string) =>
    database.commitments.where('[period+periodKey]').equals([period, periodKey])
      .filter((item) => item.status === 'active').sortBy('position')

  return {
    listActive,
    async put(commitment: Commitment) {
      return database.transaction('rw', database.commitments, async () => {
        const existing = await database.commitments.get(commitment.id)
        if (commitment.status === 'active' && existing?.status !== 'active') {
          const active = await listActive(commitment.period, commitment.periodKey)
          if (active.length >= commitmentLimit(commitment.period)) throw new CommitmentCapacityError(`${commitment.period} commitment limit reached`)
        }
        await database.commitments.put(commitment)
      })
    },
    async complete(id: string, updatedAt: string) {
      await database.commitments.update(id, { status: 'completed', updatedAt })
    },
    async cancel(id: string, updatedAt: string) {
      await database.commitments.update(id, { status: 'canceled', updatedAt })
    },
  }
}
```

- [ ] **Step 5: Run repository and existing storage tests**

Run: `cd web && npm test -- --run src/core/storage/commitmentRepository.test.ts src/core/storage/repositories.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit persistence**

```bash
git add web/src/core/storage/database.ts web/src/core/storage/commitmentRepository.ts web/src/core/storage/commitmentRepository.test.ts
git commit -m "feat: persist limited work commitments"
```

### Task 3: Project Commitments into Today Without Duplication

**Files:**
- Create: `web/src/features/commitments/commitmentProjection.ts`
- Create: `web/src/features/commitments/commitmentProjection.test.ts`

**Interfaces:**
- Consumes: `Task[]`, Today `Commitment[]`, Week `Commitment[]`, current `Date`
- Produces: `projectCommitments(...) => { today: ProjectedCommitment[]; week: ProjectedCommitment[] }`

- [ ] **Step 1: Write the duplicate-projection test**

```ts
it('shows a due weekly item in Today while retaining one task identity', () => {
  const result = projectCommitments({ tasks: [task], today: [], week: [{ ...weekCommitment, dueAt: '2026-08-27T08:00:00+09:00' }], now: new Date('2026-08-27T09:00:00+09:00') })
  expect(result.today.map((item) => item.task.id)).toEqual([task.id])
  expect(result.week.map((item) => item.task.id)).toEqual([task.id])
  expect(result.today[0].commitment.id).toBe(result.week[0].commitment.id)
})
```

- [ ] **Step 2: Run and observe the missing projection failure**

Run: `cd web && npm test -- --run src/features/commitments/commitmentProjection.test.ts`

Expected: FAIL because `projectCommitments` does not exist.

- [ ] **Step 3: Implement a pure projection**

Build one `Map<string, Task>` by task ID, filter missing and completed tasks, project Today commitments, append Week commitments whose Seoul due day equals today only when their commitment ID is absent, and return Week unchanged. Sort both groups by `position`.

- [ ] **Step 4: Run the projection tests**

Run: `cd web && npm test -- --run src/features/commitments/commitmentProjection.test.ts`

Expected: PASS, including missing-task and completed-task cases.

- [ ] **Step 5: Commit projection logic**

```bash
git add web/src/features/commitments/commitmentProjection.ts web/src/features/commitments/commitmentProjection.test.ts
git commit -m "feat: project weekly commitments into today"
```

### Task 4: Accessible Commitment Sections and Work Now Card

**Files:**
- Create: `web/src/features/commitments/CommitmentSection.tsx`
- Create: `web/src/features/commitments/CommitmentSection.test.tsx`
- Create: `web/src/features/today/WorkNowCard.tsx`
- Create: `web/src/features/today/WorkNowCard.test.tsx`

**Interfaces:**
- Consumes: `ProjectedCommitment[]`
- Produces: labeled `오늘 약속` and `이번 주 약속` sections
- Produces: `WorkNowCard({ item, onStart, onComplete })`

- [ ] **Step 1: Write failing component tests**

```tsx
render(<CommitmentSection title="오늘 약속" limit={3} items={[projected]} onStart={vi.fn()} onComplete={vi.fn()} />)
expect(screen.getByRole('region', { name: '오늘 약속' })).toBeInTheDocument()
expect(screen.getByText('1 / 3')).toBeInTheDocument()
expect(screen.getByRole('button', { name: /상담 기록 시작/ })).toBeInTheDocument()
```

```tsx
render(<WorkNowCard item={projected} onStart={onStart} onComplete={vi.fn()} />)
expect(screen.getByText('첫 행동: 상담 메모 파일 열기')).toBeInTheDocument()
await user.click(screen.getByRole('button', { name: '3분 시작' }))
expect(onStart).toHaveBeenCalledWith(projected.task, 3)
```

- [ ] **Step 2: Run and verify missing-component failures**

Run: `cd web && npm test -- --run src/features/commitments/CommitmentSection.test.tsx src/features/today/WorkNowCard.test.tsx`

Expected: FAIL because both components are missing.

- [ ] **Step 3: Implement semantic sections**

Use `<section aria-label={title}>`, an ordered list, text labels for period/due state, and 48-pixel-compatible buttons. Do not encode period or completion through color alone. Show an empty explanation rather than an empty decorative card.

- [ ] **Step 4: Implement the dominant Now card**

Render `지금 · 오늘 약속 1순위`, task title, optional `첫 행동`, estimate, `3분 시작`, and complete. Reuse the approved 3D mascot asset through the existing `PetHero`/`PetAvatar` path rather than adding WebGL.

- [ ] **Step 5: Run focused component tests**

Run: `cd web && npm test -- --run src/features/commitments/CommitmentSection.test.tsx src/features/today/WorkNowCard.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the UI units**

```bash
git add web/src/features/commitments web/src/features/today/WorkNowCard.tsx web/src/features/today/WorkNowCard.test.tsx
git commit -m "feat: add work commitment home sections"
```

### Task 5: Wire Commitments into Today and Complete the Warm Clay Home

**Files:**
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/features/today/TodayDashboard.tsx`
- Modify: `web/src/features/today/TodayDashboard.test.tsx`
- Modify: `web/src/features/today/TodayScreen.test.tsx`
- Modify: `web/src/core/theme/global.css`
- Modify: `web/e2e/required-mission-flow.spec.ts`

**Interfaces:**
- Consumes: repository and projection from Tasks 2 and 3
- Preserves: existing `onStartQuest`, `onCompleteQuest`, reward settlement, personas, recurring work, and candidates

- [ ] **Step 1: Add failing integration expectations**

Update TodayDashboard test fixtures with Today and Week projected commitments, then assert this order:

```ts
const regions = screen.getAllByRole('region').map((node) => node.getAttribute('aria-label'))
expect(regions.indexOf('지금 할 한 가지')).toBeLessThan(regions.indexOf('오늘 약속'))
expect(regions.indexOf('오늘 약속')).toBeLessThan(regions.indexOf('이번 주 약속'))
expect(screen.queryByText('매일 돌봄')).not.toBeInTheDocument()
```

Add a TodayScreen test that completing a commitment calls the existing task completion path and refreshes commitments without a second reward call.

- [ ] **Step 2: Run Today tests and verify failure**

Run: `cd web && npm test -- --run src/features/today/TodayDashboard.test.tsx src/features/today/TodayScreen.test.tsx`

Expected: FAIL because the new props, regions, and repository wiring are absent.

- [ ] **Step 3: Load and refresh commitments in TodayScreen**

Create the repository from the existing database, derive Today and Week keys from the screen date, load both groups with tasks, and refresh after add, complete, cancel, day change, or `monggle:tasks-changed`. Do not copy reward logic into the commitment layer.

- [ ] **Step 4: Recompose TodayDashboard**

Render in order: TodayHeader, persona selector, WorkNowCard, Today CommitmentSection, Week CommitmentSection, Timeline, then existing recurring work, remaining quests, and pending candidates. Remove `DailyCareCard` from the primary work home; do not delete its source because lifestyle features are outside this milestone.

- [ ] **Step 5: Apply scoped Warm Clay editorial styles**

Add `--work-*` variables under `.today-dashboard`, use cream surfaces, charcoal text, muted sage actions, clay mascot accents, solid borders, and physically coherent shadows. Remove purple/dark-glass styling from the Today route. Keep current global accessibility rules and add a two-column desktop layout that collapses to one column below 760 pixels.

- [ ] **Step 6: Run unit and build verification**

Run: `cd web && npm test -- --run src/features/today/TodayDashboard.test.tsx src/features/today/TodayScreen.test.tsx src/features/commitments src/core/storage/commitmentRepository.test.ts`

Expected: PASS.

Run: `cd web && npm run build`

Expected: TypeScript and Vite build succeed.

- [ ] **Step 7: Update and run the browser flow**

Extend `required-mission-flow.spec.ts` to create a task, promote it to `오늘 약속`, start three-minute focus, complete it, return to Today, and assert the same item is completed once with one reward result.

Run: `cd web && npx playwright test e2e/required-mission-flow.spec.ts`

Expected: PASS.

- [ ] **Step 8: Visually verify the running app**

At 390x844 and a desktop viewport, verify the Now card dominates, Today and Week sections are readable, no control is obscured, the layout is not glassy or purple, and reduced motion disables decorative mascot animation.

- [ ] **Step 9: Commit the milestone**

```bash
git add web/src/features/today web/src/core/theme/global.css web/e2e/required-mission-flow.spec.ts
git commit -m "feat: ship work-first Monggle home"
```

## Follow-up Plans

After this milestone is verified, create separate implementation plans for:

1. Inbox capture and organization
2. Waiting work and review dates
3. Rescue proposal and confirmed rescheduling
4. Full navigation migration and planning workspace

