# Monggle Web PWA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-first, installable Monggle web app that turns tasks into immediate focus actions with XP, quests, characters, schedules, and offline support.

**Architecture:** Add an isolated React application under `web/`. Pure domain functions drive tasks, timers, rewards, reminders, and ICS parsing; React screens consume those functions through one persisted app store. IndexedDB is the durable store, with an in-memory fallback when browser storage is unavailable.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, IndexedDB, Service Worker, CSS

**Spec:** `docs/superpowers/specs/2026-08-19-monggle-web-pwa-design.md`

## Global Constraints

- Keep the Android implementation unchanged.
- Do not add a server, account system, cloud database, paid API, or generated images.
- Store user data locally and support JSON backup and restore.
- Use a 390px mobile layout and a centered phone frame on desktop.
- Preserve the existing Monggle prototype's visual tokens, seven characters, and seven worlds.
- Request notification permission only after the user enables notifications.
- Run targeted tests during development and the full verification once at the end.

---

### Task 1: Web App Shell and Domain Model

**Files:**
- Create: `web/package.json`
- Create: `web/index.html`
- Create: `web/src/main.tsx`
- Create: `web/src/App.tsx`
- Create: `web/src/model.ts`
- Create: `web/src/styles.css`
- Create: `web/src/test/setup.ts`
- Create: `web/src/App.test.tsx`

**Interfaces:**
- Produces: `Task`, `FocusSession`, `Progress`, `Settings`, `AppState`, `createInitialState()`
- Consumes: none

- [ ] **Step 1: Write the failing shell test**

```tsx
it("renders the five primary tabs", () => {
  render(<App />);
  for (const name of ["홈", "한눈", "집중", "목표", "설정"]) {
    expect(screen.getByRole("button", { name })).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `cd web && npm test -- App.test.tsx`
Expected: FAIL because the Vite app and `App` do not exist.

- [ ] **Step 3: Create the minimal Vite app and typed initial state**

```ts
export type Tab = "home" | "glance" | "focus" | "goals" | "settings";
export type Task = { id: string; title: string; category: "work" | "growth" | "exercise" | "rest" | "life"; estimateMinutes: number; dueAt?: string; status: "open" | "active" | "done" | "deferred" };
export type Progress = { xp: number; level: number; totalFocusMinutes: number };
export type AppState = { tasks: Task[]; sessions: FocusSession[]; progress: Progress; settings: Settings };
export const createInitialState = (): AppState => ({ tasks: [], sessions: [], progress: { xp: 0, level: 1, totalFocusMinutes: 0 }, settings: defaultSettings });
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `cd web && npm test -- App.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web
git commit -m "feat: scaffold Monggle web app"
```

### Task 2: Local Persistence and Backup

**Files:**
- Create: `web/src/storage/app-storage.ts`
- Create: `web/src/storage/app-storage.test.ts`
- Create: `web/src/store/app-store.tsx`

**Interfaces:**
- Produces: `AppStorage.load(): Promise<AppState>`, `save(state): Promise<void>`, `exportState(state): string`, `importState(raw): AppState`
- Consumes: `AppState`, `createInitialState()`

- [ ] **Step 1: Write failing round-trip and corrupt-data tests**

```ts
it("round trips a valid backup", () => {
  const state = { ...createInitialState(), progress: { xp: 40, level: 1, totalFocusMinutes: 25 } };
  expect(importState(exportState(state))).toEqual(state);
});
it("rejects a corrupt backup", () => expect(() => importState("{}"))).toThrow("올바른 Monggle 백업이 아닙니다."));
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm test -- src/storage/app-storage.test.ts`
Expected: FAIL because storage functions do not exist.

- [ ] **Step 3: Implement IndexedDB with memory fallback and schema validation**

Use database `monggle-web`, object store `app`, key `current`. `AppStoreProvider` loads once, saves after state changes, and exposes `{ state, dispatch, storageWarning }`.

- [ ] **Step 4: Run and verify GREEN**

Run: `cd web && npm test -- src/storage/app-storage.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/storage web/src/store
git commit -m "feat: persist Monggle state locally"
```

### Task 3: Tasks, Message Import, and Home

**Files:**
- Create: `web/src/tasks/task-rules.ts`
- Create: `web/src/tasks/task-rules.test.ts`
- Create: `web/src/tasks/TaskComposer.tsx`
- Create: `web/src/screens/HomeScreen.tsx`
- Create: `web/src/screens/HomeScreen.test.tsx`
- Modify: `web/src/App.tsx`

**Interfaces:**
- Produces: `parseSharedText(text): TaskDraft`, `selectNextTask(tasks, availableMinutes?): Task | null`
- Consumes: app store dispatch actions `task/add`, `task/complete`, `task/defer`

- [ ] **Step 1: Write failing parsing and next-action tests**

```ts
it("extracts a duration from pasted text", () => expect(parseSharedText("오늘 보고서 15분 작성").estimateMinutes).toBe(15));
it("selects an open task that fits the gap", () => expect(selectNextTask([task45, task15], 20)?.id).toBe(task15.id));
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm test -- src/tasks`
Expected: FAIL because task rules do not exist.

- [ ] **Step 3: Implement task rules and home interactions**

Parsing recognizes `N분`, `N시간`, and simple `오늘`/`내일` expressions. Ambiguous dates remain unset. The home hero shows one next task with `바로 시작`, while completion and deferral never subtract XP.

- [ ] **Step 4: Run and verify GREEN**

Run: `cd web && npm test -- src/tasks src/screens/HomeScreen.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/tasks web/src/screens/HomeScreen.tsx web/src/screens/HomeScreen.test.tsx web/src/App.tsx
git commit -m "feat: add task capture and next action home"
```

### Task 4: Restorable Focus Timer

**Files:**
- Create: `web/src/focus/focus-timer.ts`
- Create: `web/src/focus/focus-timer.test.ts`
- Create: `web/src/screens/FocusScreen.tsx`
- Create: `web/src/screens/FocusScreen.test.tsx`
- Modify: `web/src/App.tsx`

**Interfaces:**
- Produces: `startTimer(taskId, minutes, now)`, `remainingSeconds(timer, now)`, `extendTimer(timer, minutes)`, `finishTimer(timer, now)`
- Consumes: selected task and app store focus actions

- [ ] **Step 1: Write failing restoration test**

```ts
it("restores remaining time from an absolute end", () => {
  const timer = startTimer("task-1", 15, new Date("2026-08-19T10:00:00Z"));
  expect(remainingSeconds(timer, new Date("2026-08-19T10:05:00Z"))).toBe(600);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm test -- src/focus`
Expected: FAIL because timer functions do not exist.

- [ ] **Step 3: Implement absolute-time timer and focus screen**

The screen offers 5, 10, 15, 25, 45 minutes, pause, 5-minute extension, and completion. Persist `startedAt` and `endsAt`; never persist a decrementing counter.

- [ ] **Step 4: Run and verify GREEN**

Run: `cd web && npm test -- src/focus src/screens/FocusScreen.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/focus web/src/screens/FocusScreen* web/src/App.tsx
git commit -m "feat: add restorable focus timer"
```

### Task 5: XP, Quests, Characters, and Worlds

**Files:**
- Create: `web/src/game/progression.ts`
- Create: `web/src/game/progression.test.ts`
- Create: `web/src/character/catalog.ts`
- Create: `web/src/character/MonggleCharacter.tsx`
- Create: `web/src/screens/GoalsScreen.tsx`
- Modify: `web/src/screens/HomeScreen.tsx`
- Modify: `web/src/styles.css`

**Interfaces:**
- Produces: `rewardFor(event): number`, `levelForXp(xp): number`, `questsFor(date): DailyQuest[]`, `characters`, `worlds`
- Consumes: completed tasks and focus sessions

- [ ] **Step 1: Write failing reward and unlock tests**

```ts
it("awards task and focus XP without penalties", () => {
  expect(rewardFor("task-complete")).toBe(20);
  expect(rewardFor("focus-complete")).toBe(10);
  expect(rewardFor("task-deferred")).toBe(0);
});
it("unlocks ppyak and mint forest at level three", () => expect(unlocksFor({ level: 3, totalFocusMinutes: 0 }).ids).toEqual(expect.arrayContaining(["ppyak", "mint_forest"])));
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm test -- src/game`
Expected: FAIL because progression rules do not exist.

- [ ] **Step 3: Implement progression and CSS characters**

Use IDs `ppo`, `nyang`, `ppyak`, `mung`, `toto`, `kong`, `duri` and worlds `space_station`, `sunset_city`, `mint_forest`, `butter_cafe`, `peach_room`, `night_library`, `lime_game_room`. Stop character motion during focus and when reduced motion is enabled.

- [ ] **Step 4: Run and verify GREEN**

Run: `cd web && npm test -- src/game src/character`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/game web/src/character web/src/screens web/src/styles.css
git commit -m "feat: add Monggle progression and characters"
```

### Task 6: Glance, Schedules, Settings, and PWA

**Files:**
- Create: `web/src/schedule/ics.ts`
- Create: `web/src/schedule/ics.test.ts`
- Create: `web/src/screens/GlanceScreen.tsx`
- Create: `web/src/screens/SettingsScreen.tsx`
- Create: `web/public/manifest.webmanifest`
- Create: `web/public/sw.js`
- Modify: `web/src/App.tsx`
- Modify: `web/index.html`

**Interfaces:**
- Produces: `parseIcs(text): ScheduleEvent[]`, `exportIcs(events): string`
- Consumes: settings and schedule store actions

- [ ] **Step 1: Write failing ICS round-trip test**

```ts
it("round trips a timed event", () => {
  const event = { id: "event-1", title: "상담", startsAt: "2026-08-20T09:00:00+09:00", endsAt: "2026-08-20T10:00:00+09:00" };
  expect(parseIcs(exportIcs([event]))[0]).toMatchObject(event);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm test -- src/schedule`
Expected: FAIL because ICS functions do not exist.

- [ ] **Step 3: Implement ICS, settings, backup UI, manifest, and cache**

The service worker caches only the app shell and static assets. Settings exposes 1·2·3·4-hour reminders, 23:00–07:00 quiet hours, reduced motion, JSON backup, and confirmed reset.

- [ ] **Step 4: Run and verify GREEN**

Run: `cd web && npm test -- src/schedule src/screens/SettingsScreen.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web
git commit -m "feat: add schedules settings and offline PWA"
```

### Task 7: Browser Verification and Handoff

**Files:**
- Create: `web/e2e/core-journey.spec.ts`
- Create: `web/playwright.config.ts`
- Create: `web/README.md`

**Interfaces:**
- Consumes: complete web app
- Produces: verified dev server and documented commands

- [ ] **Step 1: Write the end-to-end journey**

```ts
test("creates a task, focuses, completes, and earns XP", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "할 일 추가" }).click();
  await page.getByLabel("할 일").fill("보고서 첫 문단");
  await page.getByRole("button", { name: "저장" }).click();
  await page.getByRole("button", { name: "바로 시작" }).click();
  await page.getByRole("button", { name: "완료" }).click();
  await expect(page.getByText(/XP/)).toBeVisible();
});
```

- [ ] **Step 2: Run the targeted browser test**

Run: `cd web && npm run test:e2e`
Expected: PASS on Chromium.

- [ ] **Step 3: Run final verification once**

Run: `cd web && npm test && npm run build && npm run test:e2e`
Expected: all tests pass and `dist/` is generated.

- [ ] **Step 4: Start and visually inspect the app**

Run: `cd web && npm run dev -- --host 127.0.0.1`
Expected: home loads at `http://127.0.0.1:5173`, no blank screen or framework error overlay, and all five tabs are interactive.

- [ ] **Step 5: Commit**

```bash
git add web/e2e web/playwright.config.ts web/README.md
git commit -m "test: verify Monggle web journeys"
```
