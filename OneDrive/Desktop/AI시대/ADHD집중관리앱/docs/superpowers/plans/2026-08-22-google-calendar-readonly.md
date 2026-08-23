# Google Calendar Read-Only Availability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect Monggle to Google Calendar with minimum read-only availability access, use fresh busy blocks to propose local mission moves, and never mutate Google events.

**Architecture:** A small Fastify service owns Google OAuth refresh tokens and exposes account status plus free/busy windows only. The PWA stores connection metadata and short-lived availability snapshots in Dexie, while pure scheduling functions create explicit local proposals that the user applies or dismisses and can undo once.

**Tech Stack:** TypeScript, React 19, Dexie, Fastify, googleapis, better-sqlite3, AES-256-GCM, Vitest, Testing Library, Playwright

**Spec:** `docs/superpowers/specs/2026-08-21-monggle-mission-calendar-island-design.md`

## Global Constraints

- Request `https://www.googleapis.com/auth/calendar.events.freebusy` first; add calendar-list metadata scopes only if the implementation cannot identify selected calendars without them.
- Never request an event-write scope or call Google event insert, update, patch, or delete APIs.
- Never retrieve or persist Google event title, description, attendee, or location data.
- A stale snapshot can be displayed with its age but cannot trigger automatic rescheduling.
- Locked missions never move automatically.
- Applying a proposal changes only local Monggle missions and stores one-step undo data.
- Authentication, quota, and network failures never block local mission start, completion, or persistence.
- Tests use a mocked Google adapter; live credentials are not required.

---

### Task 1: Availability models, cache, proposals, and undo

**Files:**
- Create: `web/src/core/model/calendarAvailability.ts`
- Modify: `web/src/core/storage/database.ts`
- Create: `web/src/features/calendar/availabilityRepository.ts`
- Test: `web/src/features/calendar/availabilityRepository.test.ts`
- Create: `web/src/features/calendar/availabilityPlanner.ts`
- Test: `web/src/features/calendar/availabilityPlanner.test.ts`

**Interfaces:**
- Produces: `BusyBlock`, `AvailabilitySnapshot`, `CalendarConnection`, `MissionMove`, `RescheduleProposal`, `AvailabilityRepository`, `planMissionMoves(tasks, snapshot, now)`, `applyMissionMoves(tasks, proposal, now)`, `undoMissionMoves(tasks, proposal, now)`.
- Consumes: existing `Task`, Seoul-day utilities, and Dexie database patterns.

- [ ] **Step 1: Write failing repository and planning tests**

```ts
it('rejects stale availability for automatic proposals', () => {
  const stale = snapshot({ fetchedAt: '2026-08-22T00:00:00.000Z', expiresAt: '2026-08-22T00:15:00.000Z' })
  expect(planMissionMoves([unlockedMission], stale, new Date('2026-08-22T00:15:01.000Z'))).toEqual({ kind: 'stale', moves: [] })
})

it('moves only unlocked missions and restores their exact prior times', () => {
  const proposal = planMissionMoves([lockedMission, unlockedMission], freshSnapshot, now)
  expect(proposal.moves.map((move) => move.taskId)).toEqual(['unlocked'])
  const applied = applyMissionMoves([lockedMission, unlockedMission], proposal, now)
  expect(undoMissionMoves(applied, proposal, later)).toMatchObject([lockedMission, unlockedMission])
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `cd web && npm run test:run -- src/features/calendar/availabilityRepository.test.ts src/features/calendar/availabilityPlanner.test.ts`

Expected: FAIL because the availability modules and Dexie stores do not exist.

- [ ] **Step 3: Implement models, Dexie version, and repository**

```ts
export interface BusyBlock { start: string; end: string }
export interface AvailabilitySnapshot {
  accountId: string
  timeZone: string
  rangeStart: string
  rangeEnd: string
  fetchedAt: string
  expiresAt: string
  busy: BusyBlock[]
}
export interface MissionMove { taskId: string; from?: string; to: string }
export type RescheduleProposal =
  | { kind: 'fresh'; createdAt: string; moves: MissionMove[] }
  | { kind: 'stale' | 'no_connection'; moves: [] }
```

Add `calendarConnections` and `availabilitySnapshots` stores. Repository writes replace the previous snapshot for the same account and expose `latest(accountId)` plus `clear(accountId)`.

- [ ] **Step 4: Implement pure planning, apply, and undo functions**

Normalize and merge overlapping busy blocks, preserve mission duration, skip `timeLocked === true`, and search forward inside the snapshot range. Return no partial mutation when a mission has no available slot. `applyMissionMoves` and `undoMissionMoves` must update `scheduledStart` and `updatedAt` only.

- [ ] **Step 5: Run focused tests and build**

Run: `cd web && npm run test:run -- src/features/calendar src/core/storage/repositories.test.ts && npm run build`

Expected: all selected tests pass and TypeScript production build succeeds.

- [ ] **Step 6: Commit**

```bash
git add web/src/core/model/calendarAvailability.ts web/src/core/storage/database.ts web/src/features/calendar
git commit -m "feat: plan missions around calendar availability"
```

### Task 2: Minimum-scope OAuth and free/busy service

**Files:**
- Create: `sync-server/package.json`
- Create: `sync-server/tsconfig.json`
- Create: `sync-server/src/config.ts`
- Test: `sync-server/src/config.test.ts`
- Create: `sync-server/src/tokenVault.ts`
- Test: `sync-server/src/tokenVault.test.ts`
- Create: `sync-server/src/googleAvailability.ts`
- Test: `sync-server/src/googleAvailability.test.ts`
- Create: `sync-server/src/server.ts`
- Test: `sync-server/src/server.test.ts`

**Interfaces:**
- Produces: `GET /oauth/google/start`, `GET /oauth/google/callback`, `GET /calendar/status`, `POST /calendar/availability`, `DELETE /calendar/connection`.
- Consumes: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `TOKEN_ENCRYPTION_KEY`, a mocked `GoogleAvailabilityGateway` in tests.

- [ ] **Step 1: Write failing scope, vault, privacy, and route tests**

```ts
it('requests only the freebusy scope', () => {
  expect(buildGoogleScopes()).toEqual(['https://www.googleapis.com/auth/calendar.events.freebusy'])
})

it('returns normalized busy blocks without event details', async () => {
  const response = await app.inject({ method: 'POST', url: '/calendar/availability', payload: requestWindow })
  expect(response.json()).toEqual({ accountId: 'acct-1', timeZone: 'Asia/Seoul', busy: [{ start, end }], fetchedAt })
  expect(response.body).not.toContain('summary')
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `cd sync-server && npm test`

Expected: FAIL because the service has not been created.

- [ ] **Step 3: Implement secure configuration and encrypted token vault**

Validate a 32-byte base64 encryption key. Encrypt refresh tokens using AES-256-GCM with a random 12-byte IV and authentication tag. Store OAuth state as an expiring, single-use nonce and issue only HTTP-only, same-site session cookies.

- [ ] **Step 4: Implement a narrow Google gateway**

```ts
export interface GoogleAvailabilityGateway {
  authorizationUrl(state: string): string
  exchangeCode(code: string): Promise<{ accountId: string; refreshToken: string }>
  freeBusy(refreshToken: string, input: { timeMin: string; timeMax: string; timeZone: string }): Promise<BusyBlock[]>
  revoke(refreshToken: string): Promise<void>
}
```

The production adapter may call only OAuth token endpoints and `freebusy.query`. Reject response fields other than calendar errors and busy start/end pairs before returning to routes.

- [ ] **Step 5: Implement routes and failure behavior**

Return `401` for missing or expired connections, `429` for quota responses, and `503` for temporary Google failures. Never log tokens or upstream response bodies. Disconnect revokes when possible, deletes the encrypted token regardless of revoke outcome, and returns success idempotently.

- [ ] **Step 6: Run service tests and build**

Run: `cd sync-server && npm test && npm run build`

Expected: tests pass with mocked Google calls and TypeScript build succeeds.

- [ ] **Step 7: Commit**

```bash
git add sync-server
git commit -m "feat: add read only calendar availability service"
```

### Task 3: Connection UI, local proposal flow, and browser verification

**Files:**
- Create: `web/src/features/calendar/calendarClient.ts`
- Test: `web/src/features/calendar/calendarClient.test.ts`
- Create: `web/src/features/calendar/CalendarSettings.tsx`
- Test: `web/src/features/calendar/CalendarSettings.test.tsx`
- Create: `web/src/features/calendar/RescheduleProposalCard.tsx`
- Test: `web/src/features/calendar/RescheduleProposalCard.test.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/core/storage/repositories.ts`
- Create: `web/e2e/calendar-availability.spec.ts`

**Interfaces:**
- Consumes: Task 1 repository/planner and Task 2 HTTP routes.
- Produces: `CalendarClient`, settings connection panel, availability refresh, proposal preview, apply, dismiss, and one-step undo.

- [ ] **Step 1: Write failing client and UI tests**

```tsx
it('explains read-only access before connecting', () => {
  render(<CalendarSettings state={disconnected} onConnect={vi.fn()} onRefresh={vi.fn()} onDisconnect={vi.fn()} />)
  expect(screen.getByText('일정 내용은 읽지 않고 바쁜 시간만 확인해요')).toBeVisible()
  expect(screen.getByRole('button', { name: 'Google Calendar 연결' })).toBeEnabled()
})

it('shows every proposed local move before applying it', () => {
  render(<RescheduleProposalCard proposal={proposal} tasks={tasks} onApply={vi.fn()} onDismiss={vi.fn()} />)
  expect(screen.getByText('수학 숙제')).toBeVisible()
  expect(screen.getByText('오후 7:00 → 오후 8:00')).toBeVisible()
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `cd web && npm run test:run -- src/features/calendar`

Expected: FAIL because the client and UI components do not exist.

- [ ] **Step 3: Implement client and settings panel**

`CalendarClient` calls only status, availability, connect, and disconnect endpoints. The settings panel displays disconnected, connected, refreshing, stale, authentication-expired, quota, and offline states. It always states that Google events are not changed.

- [ ] **Step 4: Connect Today proposal, apply, and undo flow**

Fetch a bounded availability window only after explicit connection. Save the normalized snapshot, compute a proposal, and show every move before apply. Applying updates local tasks in one repository transaction and shows `되돌리기`; dismissing changes nothing. Expired snapshots show their age and a refresh action but no apply action.

- [ ] **Step 5: Add mocked mobile and desktop E2E coverage**

```ts
test('connects read-only availability and applies then undoes a local move', async ({ page }) => {
  await page.route('**/calendar/**', calendarApiFixture)
  await page.goto('/settings')
  await page.getByRole('button', { name: 'Google Calendar 연결' }).click()
  await page.goto('/')
  await expect(page.getByText('Google 일정에 맞춘 새 배치안')).toBeVisible()
  await page.getByRole('button', { name: '이 배치 적용' }).click()
  await page.getByRole('button', { name: '되돌리기' }).click()
  await expect(page.getByText('원래 시간으로 되돌렸어요')).toBeVisible()
})
```

- [ ] **Step 6: Run full verification**

Run: `cd web && npm run test:run && npm run build && npm run e2e -- calendar-availability.spec.ts`

Run: `cd sync-server && npm test && npm run build`

Expected: all web and service tests pass, production builds succeed, and mobile plus desktop E2E pass without live Google credentials.

- [ ] **Step 7: Commit**

```bash
git add web/src/features/calendar web/src/features/settings/SettingsScreen.tsx web/src/features/today/TodayScreen.tsx web/src/core/storage/repositories.ts web/e2e/calendar-availability.spec.ts
git commit -m "feat: connect read only calendar availability"
```
