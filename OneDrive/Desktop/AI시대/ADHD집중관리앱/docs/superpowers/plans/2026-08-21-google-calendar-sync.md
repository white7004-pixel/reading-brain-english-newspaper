# Google Calendar Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize required missions with an app-owned Google Calendar while using other calendars only for availability and preserving local missions through failures.

**Architecture:** A TypeScript Fastify service owns OAuth refresh tokens, Google API calls, sync tokens, and idempotency in SQLite. The PWA talks to a narrow calendar adapter and persists an offline mutation queue in Dexie; pure conflict functions keep manual changes above automatic changes.

**Tech Stack:** Node.js 22, TypeScript, Fastify, googleapis, better-sqlite3, AES-256-GCM, React, Dexie, Vitest

**Spec:** `docs/superpowers/specs/2026-08-21-monggle-mission-calendar-island-design.md`

## Global Constraints

- Only the app-created `몽글 필수 미션` calendar is writable.
- Other calendars expose free/busy availability, not event details.
- Google deletion never deletes or uncommits a local required mission.
- Manual time changes outrank automatic scheduling changes.
- Offline and authentication failures never block local completion.
- Production requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, and a 32-byte `TOKEN_ENCRYPTION_KEY`.

---

### Task 1: Calendar contracts, local mapping, and offline queue

**Files:**
- Create: `web/src/core/model/calendarSync.ts`
- Modify: `web/src/core/storage/database.ts`
- Create: `web/src/features/calendar/calendarRepository.ts`
- Test: `web/src/features/calendar/calendarRepository.test.ts`
- Create: `web/src/features/calendar/conflictPolicy.ts`
- Test: `web/src/features/calendar/conflictPolicy.test.ts`

**Interfaces:**
- Produces: `CalendarLink`, `CalendarMutation`, `enqueueMutation`, `resolveCalendarChange(local, remote)`.
- Consumes: required mission IDs and timestamps from plan 1.

- [ ] **Step 1: Write failing queue and conflict tests**

```ts
it('turns remote deletion into unassigned time without deleting the mission', () => {
  expect(resolveCalendarChange(localMission, { type: 'deleted', changedAt: now })).toMatchObject({ required: true, scheduledStart: undefined, syncStatus: 'needs_reschedule' })
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `cd web && npm run test:run -- src/features/calendar`

Expected: FAIL because calendar storage and conflict policy do not exist.

- [ ] **Step 3: Implement Dexie version 5 and pure conflict rules**

```ts
export interface CalendarEventDraft { eventId: string; taskId: string; title: string; start: string; end: string; timeLocked: boolean; updatedAt: string }
export type CalendarMutation = { id: string; taskId: string; operation: 'upsert' | 'delete'; payload: CalendarEventDraft; createdAt: string; attempts: number }
export const remoteDeletion = (task: Task): Task => ({ ...task, scheduledStart: undefined, dueAt: undefined, syncStatus: 'needs_reschedule' })
```

Add `calendarLinks`, `calendarMutations`, and `calendarSyncState` stores and repository methods `enqueue`, `peekBatch`, `ack`, and `markFailure`.

- [ ] **Step 4: Run focused and full tests**

Run: `cd web && npm run test:run -- src/features/calendar src/core/storage/repositories.test.ts && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/core/model/calendarSync.ts web/src/core/storage/database.ts web/src/features/calendar
git commit -m "feat: add offline calendar sync contracts"
```

### Task 2: OAuth and Google Calendar sync service

**Files:**
- Create: `sync-server/package.json`
- Create: `sync-server/tsconfig.json`
- Create: `sync-server/src/config.ts`
- Create: `sync-server/src/tokenVault.ts`
- Test: `sync-server/src/tokenVault.test.ts`
- Create: `sync-server/src/googleCalendar.ts`
- Test: `sync-server/src/googleCalendar.test.ts`
- Create: `sync-server/src/server.ts`
- Test: `sync-server/src/server.test.ts`

**Interfaces:**
- Produces: `GET /oauth/google/start`, `GET /oauth/google/callback`, `GET /availability`, `POST /sync/push`, `GET /sync/pull`.
- Consumes: Google OAuth code flow and calendar scopes `calendar.app.created` plus `calendar.events.freebusy`.

- [ ] **Step 1: Write failing vault, scope, idempotency, and route tests**

```ts
it('encrypts refresh tokens at rest', () => {
  const sealed = vault.seal('refresh-token')
  expect(sealed).not.toContain('refresh-token')
  expect(vault.open(sealed)).toBe('refresh-token')
})
```

Mock `googleapis`; assert that startup creates or reuses exactly one calendar named `몽글 필수 미션`, uses custom event IDs, and stores `nextSyncToken`.

- [ ] **Step 2: Run and confirm failure**

Run: `cd sync-server && npm test`

Expected: FAIL until the service modules exist.

- [ ] **Step 3: Implement minimal secure service**

```ts
const scopes = [
  'https://www.googleapis.com/auth/calendar.app.created',
  'https://www.googleapis.com/auth/calendar.events.freebusy',
]
```

Use OAuth `state` with an expiring server-side nonce, HTTP-only same-site session cookies, AES-256-GCM token encryption, SQLite unique keys on `(user_id, task_id)`, and stable Google event IDs. Return `410` recovery as a full remote cache refresh, never a local mission wipe.

- [ ] **Step 4: Run server tests and typecheck**

Run: `cd sync-server && npm test && npm run build`

Expected: PASS with all Google calls mocked.

- [ ] **Step 5: Commit**

```bash
git add sync-server
git commit -m "feat: add Google Calendar sync service"
```

### Task 3: PWA connection, availability scheduling, and recovery UI

**Files:**
- Create: `web/src/features/calendar/calendarClient.ts`
- Test: `web/src/features/calendar/calendarClient.test.ts`
- Create: `web/src/features/calendar/findAvailability.ts`
- Test: `web/src/features/calendar/findAvailability.test.ts`
- Create: `web/src/features/calendar/CalendarSettings.tsx`
- Test: `web/src/features/calendar/CalendarSettings.test.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Create: `web/e2e/calendar-sync.spec.ts`

**Interfaces:**
- Consumes: sync service routes and local queue from Tasks 1–2.
- Produces: `findNextSlot(busy, duration, window)`, `flushCalendarQueue()`, connection and recovery UI.

```ts
export interface CalendarRepository { peekBatch(limit: number): Promise<CalendarMutation[]>; ack(id: string): Promise<void>; markFailure(id: string, message: string): Promise<void> }
export interface CalendarClient { push(mutation: CalendarMutation): Promise<void>; pull(syncToken?: string): Promise<{ changes: RemoteCalendarChange[]; nextSyncToken: string }> }
```

- [ ] **Step 1: Write failing availability, reconnect, and E2E tests**

```ts
it('does not move a locked mission and finds a slot for an unlocked mission', () => {
  expect(findNextSlot(busy, 30, window)).toEqual({ start: '2026-08-21T19:30:00+09:00', end: '2026-08-21T20:00:00+09:00' })
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `cd web && npm run test:run -- src/features/calendar`

Expected: FAIL because client, scheduler, and settings UI do not exist.

- [ ] **Step 3: Implement connection and queue flushing**

```ts
export async function flushCalendarQueue(repo: CalendarRepository, client: CalendarClient) {
  for (const mutation of await repo.peekBatch(20)) {
    try { await client.push(mutation); await repo.ack(mutation.id) }
    catch (error) { await repo.markFailure(mutation.id, String(error)); break }
  }
}
```

Show connected account, last sync, retry, and disconnect. Auto-reschedule only unlocked missions, notify the new time, and retain one-step undo data.

- [ ] **Step 4: Run all verification**

Run: `cd web && npm run test:run && npm run build && npm run e2e -- calendar-sync.spec.ts`

Expected: PASS against a mocked sync service; no live Google account is required in CI.

- [ ] **Step 5: Commit**

```bash
git add web/src/features/calendar web/src/features/settings/SettingsScreen.tsx web/src/features/today/TodayScreen.tsx web/e2e/calendar-sync.spec.ts
git commit -m "feat: connect required missions to Google Calendar"
```
