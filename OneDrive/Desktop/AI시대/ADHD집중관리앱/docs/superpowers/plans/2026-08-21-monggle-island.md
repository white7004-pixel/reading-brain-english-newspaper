# Growing Monggle Island Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn explicit real-world mission completion and recovery into permanent growth of a personal Monggle island.

**Architecture:** A deterministic reward ledger converts mission events into idempotent rewards, while a separate island reducer applies materials and build progress. React renders four zones using approved 3D raster assets and lightweight CSS motion; no real-time 3D engine is introduced in this phase.

**Tech Stack:** React 19, TypeScript, Dexie, Vitest, Testing Library, Playwright, CSS animations, approved Monggle PNG assets

**Spec:** `docs/superpowers/specs/2026-08-21-monggle-mission-calendar-island-design.md`

## Global Constraints

- Island progress is permanent and never resets daily.
- Rewards require explicit mission completion or a recorded recovery action.
- Each mission event grants its reward at most once.
- No random loot, paid pressure, failure penalty, streak reset, or infinite mini-game.
- Reduced-motion mode removes nonessential animation.
- World browsing remains secondary to the next required mission.

---

### Task 1: Reward ledger and island state

**Files:**
- Create: `web/src/core/model/island.ts`
- Modify: `web/src/core/storage/database.ts`
- Create: `web/src/features/island/islandRepository.ts`
- Test: `web/src/features/island/islandRepository.test.ts`
- Create: `web/src/features/island/rewardPolicy.ts`
- Test: `web/src/features/island/rewardPolicy.test.ts`

**Interfaces:**
- Produces: `IslandState`, `IslandZone`, `RewardLedgerEntry`, `rewardForMissionEvent(event)`, `applyReward(state, reward)`.
- Consumes: explicit mission completion and recovery events from plan 1.

- [ ] **Step 1: Write failing idempotency and zone tests**

```ts
it('rewards one completion only once', async () => {
  await repository.applyEvent(completionEvent)
  await repository.applyEvent(completionEvent)
  expect((await repository.load()).materials.seed).toBe(1)
})

it('routes recovery to the return harbor', () => {
  expect(rewardForMissionEvent({ type: 'mission_recovered', eventId: 'e1', taskId: 't1' }).zone).toBe('return_harbor')
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `cd web && npm run test:run -- src/features/island`

Expected: FAIL because island models and repositories do not exist.

- [ ] **Step 3: Implement deterministic reward state**

```ts
export type IslandZone = 'focus_garden' | 'time_forest' | 'completion_village' | 'return_harbor'
export interface RewardLedgerEntry { eventId: string; taskId: string; zone: IslandZone; material: 'seed' | 'wood' | 'stone' | 'light'; amount: number; grantedAt: string }
```

Add Dexie version 6 with singleton `islandState` and unique `rewardLedger` event IDs. Apply completion, all-required-complete, quick-start, time-reflection, and recovery rewards without randomness.

- [ ] **Step 4: Run focused and full tests**

Run: `cd web && npm run test:run -- src/features/island src/core/storage/repositories.test.ts && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/core/model/island.ts web/src/core/storage/database.ts web/src/features/island
git commit -m "feat: add persistent island reward ledger"
```

### Task 2: Four-zone island and short reward flow

**Files:**
- Create: `web/src/features/island/IslandScreen.tsx`
- Test: `web/src/features/island/IslandScreen.test.tsx`
- Create: `web/src/features/island/IslandZoneCard.tsx`
- Create: `web/src/features/island/RewardMoment.tsx`
- Test: `web/src/features/island/RewardMoment.test.tsx`
- Create: `web/src/features/island/island.css`
- Modify: `web/src/app/App.tsx`
- Modify: `web/src/app/BottomNav.tsx`

**Interfaces:**
- Consumes: `IslandState`, pending reward ledger entries, current required mission.
- Produces: island route, four zone views, and `다음 필수 미션으로` action.

- [ ] **Step 1: Write failing rendering and reduced-motion tests**

```tsx
it('shows all four permanent zones and prioritizes the next mission', () => {
  render(<IslandScreen state={state} nextMission={task} reducedMotion />)
  expect(screen.getAllByRole('region')).toHaveLength(4)
  expect(screen.getByRole('button', { name: '다음 필수 미션으로' })).toBeVisible()
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `cd web && npm run test:run -- src/features/island/IslandScreen.test.tsx src/features/island/RewardMoment.test.tsx`

Expected: FAIL because island UI does not exist.

- [ ] **Step 3: Implement the lightweight visual world**

Render `집중 정원`, `시간의 숲`, `완성 마을`, and `귀환 항구`, using level-specific 3D raster layers and CSS transforms. Reward moments auto-dismiss within 3 seconds and always expose `다음 필수 미션으로`; reduced motion renders the final state immediately.

- [ ] **Step 4: Run component tests and visual build**

Run: `cd web && npm run test:run -- src/features/island && npm run build`

Expected: PASS with no missing assets.

- [ ] **Step 5: Commit**

```bash
git add web/src/features/island web/src/app/App.tsx web/src/app/BottomNav.tsx
git commit -m "feat: render the growing Monggle island"
```

### Task 3: Mission integration, full-day builds, and end-to-end journey

**Files:**
- Create: `web/src/features/island/missionRewards.ts`
- Test: `web/src/features/island/missionRewards.test.ts`
- Modify: `web/src/features/missions/missionState.ts`
- Modify: `web/src/features/focus/FocusScreen.tsx`
- Modify: `web/src/features/nudges/nudgePolicy.ts`
- Create: `web/e2e/monggle-island.spec.ts`

**Interfaces:**
- Consumes: mission completion, all-required-complete, first-action-started, time-reflected, and mission-recovered events.
- Produces: idempotent island reward events and next-island unlock state.

```ts
export type MissionEvent =
  | { type: 'mission_completed' | 'mission_recovered' | 'first_action_started'; taskId: string; occurredAt: string }
  | { type: 'time_reflected'; taskId: string; occurredAt: string; estimatedMinutes: number; actualMinutes: number }
  | { type: 'all_required_completed'; taskId: 'mission-set'; occurredAt: string; commitmentDay: string }
```

- [ ] **Step 1: Write failing integration and E2E tests**

```ts
it('advances a major build only when every required mission is explicitly complete', () => {
  expect(buildMissionRewards(tasksWithOneOpen, event)).not.toContainEqual(expect.objectContaining({ type: 'major_build' }))
  expect(buildMissionRewards(allCompleted, event)).toContainEqual(expect.objectContaining({ type: 'major_build' }))
})
```

The Playwright journey commits two missions, completes both explicitly, sees one major build step, reloads without duplicate rewards, and opens the island with permanent progress intact.

- [ ] **Step 2: Run and confirm failure**

Run: `cd web && npm run test:run -- src/features/island/missionRewards.test.ts`

Expected: FAIL because mission reward integration does not exist.

- [ ] **Step 3: Emit and consume domain events once**

```ts
export function missionEventId(type: MissionEvent['type'], taskId: string, occurredAt: string) {
  return `${type}:${taskId}:${occurredAt}`
}
```

Persist event IDs before presenting rewards, unlock a new themed island only after every build stage of the current island is complete, and never grant progress from timer expiry alone.

- [ ] **Step 4: Run all verification**

Run: `cd web && npm run test:run && npm run build && npm run e2e -- monggle-island.spec.ts`

Expected: PASS on mobile and desktop, including reload idempotency and reduced motion.

- [ ] **Step 5: Commit**

```bash
git add web/src/features/island web/src/features/missions/missionState.ts web/src/features/focus/FocusScreen.tsx web/src/features/nudges/nudgePolicy.ts web/e2e/monggle-island.spec.ts
git commit -m "feat: grow the island from completed missions"
```
