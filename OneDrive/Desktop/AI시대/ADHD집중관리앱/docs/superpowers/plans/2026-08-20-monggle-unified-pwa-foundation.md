# Monggle Unified PWA Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an installable, local-first Monggle PWA whose stable five-tab interface unifies task capture, “Now One Thing” focus, message drafts, routines, and settings for middle-school students through adults.

**Architecture:** Create a React/TypeScript application in `web/`, with feature folders owning UI and domain logic and a typed IndexedDB repository as the local source of truth. This foundation models scheduled messages and connector states but does not transmit messages; live Slack, Telegram, KakaoWork, and KakaoTalk delivery will be implemented in separate connector plans after the local journey is stable.

**Tech Stack:** React 19, TypeScript 5, Vite 7, vite-plugin-pwa, React Router 7, Dexie 4, Vitest, Testing Library, Playwright, plain CSS design tokens

**Spec:** `docs/superpowers/specs/2026-08-20-monggle-unified-focus-messaging-design.md`

## Global Constraints

- The target audience is middle-school students through adults; user type changes copy and recommendations, never navigation or layout.
- Bottom navigation is fixed to `오늘`, `집중`, `메시지`, `루틴`, `설정` in that order.
- The home screen prioritizes one current action and reaches focus mode in no more than two interactions.
- The default visual language is a calm, workplace-appropriate character UI with a neutral light background and one lavender accent.
- Theme changes modify tokens only; they never modify layout.
- Character random movement is prohibited, and reduced-motion mode disables decorative animation.
- Incomplete or deferred work never removes rewards or uses shaming copy.
- Message content and recipients are sensitive data and remain local in this plan.
- No platform access token is stored or requested in this plan.
- No external generative-AI API, paid cloud service, or usage-based credit is called by the foundation.
- Brain-dump parsing, task breakdown, tone transformation, and personal time estimates run locally with deterministic rules.
- Every task follows red-green-refactor, ends with its focused tests passing, and creates a Git checkpoint.

---

## File Map

- `web/src/app/`: app shell, routes, providers, fixed navigation
- `web/src/core/model/`: shared task, message, routine, profile, and settings types
- `web/src/core/storage/`: Dexie schema, repositories, migration tests
- `web/src/core/theme/`: design tokens, theme persistence, reduced-motion behavior
- `web/src/features/today/`: quick capture, Now One Thing, unified timeline
- `web/src/features/rescue/`: energy check-in and plan-collapse recovery actions
- `web/src/features/focus/`: resilient focus timer and task-step execution
- `web/src/features/messages/`: local message draft, schedule review, status list
- `web/src/features/routines/`: ordered routine runner
- `web/src/features/settings/`: user type, theme, motion, quiet-hour settings
- `web/e2e/`: cross-feature mobile journeys and visual screenshots

### Task 1: Scaffold the installable PWA and test harness

**Files:**
- Create: `web/package.json`
- Create: `web/tsconfig.json`
- Create: `web/vite.config.ts`
- Create: `web/index.html`
- Create: `web/src/main.tsx`
- Create: `web/src/app/App.tsx`
- Create: `web/src/app/App.test.tsx`
- Create: `web/public/icons/icon.svg`
- Create: `web/playwright.config.ts`

**Interfaces:**
- Produces: `App(): JSX.Element`, npm scripts `dev`, `test`, `test:run`, `build`, `e2e`

- [ ] **Step 1: Create the package manifest and failing smoke test**

```json
{
  "name": "monggle-web",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest",
    "test:run": "vitest run",
    "e2e": "playwright test"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "dexie": "^4.2.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.8.0"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "jsdom": "latest",
    "typescript": "^5.9.0",
    "vite": "^7.1.0",
    "vite-plugin-pwa": "latest",
    "vitest": "latest"
  }
}
```

```tsx
it('renders the Monggle product name', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: '몽글' })).toBeVisible()
})
```

- [ ] **Step 2: Install dependencies and verify the test fails**

Run: `cd web && npm install && npm run test:run -- src/app/App.test.tsx`

Expected: FAIL because `App` or its rendered heading does not exist.

- [ ] **Step 3: Implement the smallest app and PWA configuration**

```tsx
export function App() {
  return <main><h1>몽글</h1></main>
}
```

Configure `VitePWA({ registerType: 'prompt', manifest: { name: '몽글', short_name: '몽글', display: 'standalone', theme_color: '#7567d8', background_color: '#f8f7fc', icons: [{ src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] } })`.

- [ ] **Step 4: Run the smoke gate**

Run: `cd web && npm run test:run && npm run build`

Expected: all tests PASS and `web/dist/manifest.webmanifest` exists.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web
git commit -m "build: scaffold Monggle PWA"
```

### Task 2: Add typed local models and IndexedDB repositories

**Files:**
- Create: `web/src/core/model/task.ts`
- Create: `web/src/core/model/message.ts`
- Create: `web/src/core/model/routine.ts`
- Create: `web/src/core/model/settings.ts`
- Create: `web/src/core/storage/database.ts`
- Create: `web/src/core/storage/taskRepository.ts`
- Create: `web/src/core/storage/messageRepository.ts`
- Test: `web/src/core/storage/repositories.test.ts`

**Interfaces:**
- Produces: `Task`, `ScheduledMessage`, `Routine`, `MonggleSettings`
- Produces: `taskRepository.put(task)`, `taskRepository.listForDay(day)`, `messageRepository.put(message)`, `messageRepository.listByStatus(status)`

- [ ] **Step 1: Write repository contract tests**

```ts
it('updates a task without duplicating its id', async () => {
  await taskRepository.put(task({ id: 'task-1', title: '초안' }))
  await taskRepository.put(task({ id: 'task-1', title: '보고서 초안' }))
  expect(await taskRepository.listForDay('2026-08-20')).toHaveLength(1)
  expect((await taskRepository.listForDay('2026-08-20'))[0].title).toBe('보고서 초안')
})

it('stores a scheduled message without platform credentials', async () => {
  await messageRepository.put(message({ id: 'msg-1', platform: 'slack', status: 'scheduled' }))
  expect(await messageRepository.listByStatus('scheduled')).toMatchObject([{ id: 'msg-1' }])
})
```

- [ ] **Step 2: Run the repository tests and confirm failure**

Run: `cd web && npm run test:run -- src/core/storage/repositories.test.ts`

Expected: FAIL because the models and repositories do not exist.

- [ ] **Step 3: Implement models and Dexie schema**

```ts
export type MessagePlatform = 'kakaotalk' | 'kakaowork' | 'slack' | 'telegram'
export type MessageStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed' | 'canceled' | 'manual_action_required'
export interface ScheduledMessage {
  id: string
  platform: MessagePlatform
  recipientLabel: string
  body: string
  scheduledAt: string
  timeZone: string
  status: MessageStatus
  deliveryMode: 'automatic' | 'manual'
  createdAt: string
  updatedAt: string
}
```

Use `version(1).stores({ tasks: '&id,day,status,dueAt', messages: '&id,status,scheduledAt,platform', routines: '&id', settings: '&key' })` and inject the database into repositories so tests can use an isolated database name.

- [ ] **Step 4: Run storage tests**

Run: `cd web && npm run test:run -- src/core/storage/repositories.test.ts`

Expected: PASS with no duplicate task and no credential field in `ScheduledMessage`.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web/src/core
git commit -m "feat: add local Monggle data model"
```

### Task 3: Establish the fixed design system and five-tab shell

**Files:**
- Create: `web/src/core/theme/tokens.css`
- Create: `web/src/core/theme/global.css`
- Create: `web/src/core/theme/theme.ts`
- Create: `web/src/app/AppShell.tsx`
- Create: `web/src/app/BottomNav.tsx`
- Create: `web/src/app/routes.tsx`
- Modify: `web/src/app/App.tsx`
- Test: `web/src/app/AppShell.test.tsx`

**Interfaces:**
- Produces: `ThemeMode = 'light' | 'dark' | 'system'`, `applyTheme(mode)`, `AppShell`
- Consumes: persisted `MonggleSettings`

- [ ] **Step 1: Write navigation and layout stability tests**

```tsx
it('keeps the five tabs in the approved order', () => {
  render(<App />)
  expect(screen.getAllByRole('link').map(link => link.textContent)).toEqual(['오늘', '집중', '메시지', '루틴', '설정'])
})

it('does not change navigation when profile type changes', async () => {
  const before = screen.getAllByRole('link').map(link => link.getAttribute('href'))
  await userEvent.selectOptions(screen.getByLabelText('사용자 유형'), 'worker')
  expect(screen.getAllByRole('link').map(link => link.getAttribute('href'))).toEqual(before)
})
```

- [ ] **Step 2: Verify the shell tests fail**

Run: `cd web && npm run test:run -- src/app/AppShell.test.tsx`

Expected: FAIL because the navigation and settings control do not exist.

- [ ] **Step 3: Implement fixed routes and design tokens**

Define `--color-bg: #f8f7fc`, `--color-surface: #ffffff`, `--color-text: #24222d`, `--color-muted: #6d6878`, `--color-accent: #7567d8`, `--radius-card: 24px`, `--space-page: 20px`, and `--tap-min: 44px`. Use the same DOM structure for every theme and profile. Add `@media (prefers-reduced-motion: reduce)` to disable animation and transitions.

- [ ] **Step 4: Run shell and accessibility assertions**

Run: `cd web && npm run test:run -- src/app/AppShell.test.tsx && npm run build`

Expected: PASS; the five routes build and the bottom bar is unchanged by profile or theme.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web/src/app web/src/core/theme
git commit -m "feat: add stable Monggle app shell"
```

### Task 4: Build Today with quick capture, Now One Thing, and unified timeline

**Files:**
- Create: `web/src/features/today/selectNowTask.ts`
- Create: `web/src/features/today/buildTimeline.ts`
- Create: `web/src/features/today/QuickCapture.tsx`
- Create: `web/src/features/today/NowCard.tsx`
- Create: `web/src/features/today/Timeline.tsx`
- Create: `web/src/features/today/TodayScreen.tsx`
- Test: `web/src/features/today/selectNowTask.test.ts`
- Test: `web/src/features/today/TodayScreen.test.tsx`

**Interfaces:**
- Produces: `selectNowTask(tasks, now): Task | null`
- Produces: `buildTimeline(tasks, messages, events): TimelineItem[]`
- Produces: `recommendForEnergy(tasks, energy, now): Task | null`
- Consumes: task and message repositories

- [ ] **Step 1: Write priority and home journey tests**

```ts
it('selects active, overdue, nearest due, then highest priority', () => {
  expect(selectNowTask([tomorrowHigh, overdueLow, active], now)?.id).toBe(active.id)
  expect(selectNowTask([tomorrowHigh, overdueLow], now)?.id).toBe(overdueLow.id)
})

it('uses energy only after active and overdue constraints', () => {
  expect(recommendForEnergy([overdueHard, shortEasy], 'low', now)?.id).toBe(overdueHard.id)
  expect(recommendForEnergy([tomorrowHard, shortEasy], 'low', now)?.id).toBe(shortEasy.id)
})
```

```tsx
it('creates a task and exposes one focus action', async () => {
  render(<TodayScreen />)
  await userEvent.type(screen.getByLabelText('빠른 캡처'), '영어 수행평가 자료 열기')
  await userEvent.click(screen.getByRole('button', { name: '할 일로 저장' }))
  expect(await screen.findByRole('heading', { name: '영어 수행평가 자료 열기' })).toBeVisible()
  expect(screen.getByRole('button', { name: '집중 시작' })).toBeVisible()
})
```

- [ ] **Step 2: Run focused Today tests and verify failure**

Run: `cd web && npm run test:run -- src/features/today`

Expected: FAIL because selectors and components do not exist.

- [ ] **Step 3: Implement the Today flow**

Quick capture offers exactly `할 일로 저장`, `메시지 분석`, and `답장 예약`. The Now card shows one title, estimate, and `집중 시작`, `완료`, `10분 미루기`. A three-value energy control (`낮음`, `보통`, `높음`) may refine the recommendation but never displaces active or overdue work. Timeline items use a shared shape `{ id, at, kind: 'task' | 'message' | 'event', title, statusLabel }` and sort by `at` ascending.

- [ ] **Step 4: Run Today and repository tests**

Run: `cd web && npm run test:run -- src/features/today src/core/storage`

Expected: PASS; a captured task becomes the Now item and scheduled messages can appear in the same timeline.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web/src/features/today
git commit -m "feat: add Today capture and next action"
```

### Task 5: Add the resilient focus timer and task breakdown

**Files:**
- Create: `web/src/features/focus/focusTimer.ts`
- Create: `web/src/features/focus/taskBreakdown.ts`
- Create: `web/src/features/focus/timeEstimate.ts`
- Create: `web/src/features/focus/FocusScreen.tsx`
- Test: `web/src/features/focus/focusTimer.test.ts`
- Test: `web/src/features/focus/FocusScreen.test.tsx`

**Interfaces:**
- Produces: `startTimer(taskId, minutes, now): FocusTimerState`, `remaining(timer, now): number`, `extend(timer, minutes): FocusTimerState`
- Produces: `breakIntoSteps(title): TaskStep[]` with deterministic local rules in this plan
- Produces: `personalEstimate(records): number | null`

- [ ] **Step 1: Write absolute-time restoration tests**

```ts
it('restores remaining time from an absolute end time', () => {
  const timer = startTimer('task-1', 15, new Date('2026-08-20T00:00:00Z'))
  expect(remaining(timer, new Date('2026-08-20T00:05:00Z'))).toBe(600)
})

it('never allows a second active timer', () => {
  expect(() => startTimer('task-2', 10, now, activeTimer)).toThrow('FOCUS_TIMER_ACTIVE')
})

it('waits for three samples before suggesting a personal estimate', () => {
  expect(personalEstimate([20, 25])).toBeNull()
  expect(personalEstimate([20, 25, 30])).toBe(26)
})
```

- [ ] **Step 2: Run focus tests and verify failure**

Run: `cd web && npm run test:run -- src/features/focus`

Expected: FAIL because the timer functions do not exist.

- [ ] **Step 3: Implement focus state and screen**

Persist `{ taskId, startedAt, endsAt, pausedAt, accumulatedPauseSeconds, status }`. Render one title, a visual progress ring, remaining time, checklist, and `시작/일시정지`, `완료`, `5분 추가`. On completion store estimated and actual minutes; after three matching category samples, calculate an exponentially weighted rounded estimate and require confirmation before applying it. The character stays in a fixed decorative slot and never crosses the controls.

- [ ] **Step 4: Run focus and Today tests**

Run: `cd web && npm run test:run -- src/features/focus src/features/today`

Expected: PASS; refresh restoration uses `endsAt`, and Today starts the selected task.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web/src/features/focus web/src/features/today
git commit -m "feat: add focused one-task execution"
```

### Task 6: Add local message capture, review, and scheduling states

**Files:**
- Create: `web/src/features/messages/parseSharedText.ts`
- Create: `web/src/features/messages/messagePolicy.ts`
- Create: `web/src/features/messages/transformTone.ts`
- Create: `web/src/features/messages/MessageComposer.tsx`
- Create: `web/src/features/messages/MessageReview.tsx`
- Create: `web/src/features/messages/MessageList.tsx`
- Create: `web/src/features/messages/MessagesScreen.tsx`
- Test: `web/src/features/messages/parseSharedText.test.ts`
- Test: `web/src/features/messages/MessagesScreen.test.tsx`

**Interfaces:**
- Produces: `parseSharedText(text, receivedAt): ParsedMessageDraft`
- Produces: `deliveryModeFor(platform, capability): 'automatic' | 'manual'`
- Produces: `transformTone(body, tone): string` for local deterministic preview copy
- Consumes: `messageRepository`

- [ ] **Step 1: Write parsing and platform-policy tests**

```ts
it('requires confirmation when a date phrase is ambiguous', () => {
  expect(parseSharedText('다음 주에 보내줘', receivedAt).requiresDateConfirmation).toBe(true)
})

it.each([
  ['slack', true, 'automatic'],
  ['telegram', true, 'automatic'],
  ['kakaowork', true, 'automatic'],
  ['kakaotalk', false, 'manual'],
] as const)('%s capability maps to %s', (platform, capability, expected) => {
  expect(deliveryModeFor(platform, capability)).toBe(expected)
})

it('keeps tone transformations in draft status', () => {
  const result = transformDraft(originalDraft, 'business')
  expect(result.status).toBe('draft')
  expect(result.body).not.toBe(originalDraft.body)
})
```

- [ ] **Step 2: Run message tests and verify failure**

Run: `cd web && npm run test:run -- src/features/messages`

Expected: FAIL because parsing, policy, and screens do not exist.

- [ ] **Step 3: Implement local-only scheduling UX**

The review screen requires platform, recipient label, body, local date/time, and timezone. It offers `정중하게`, `업무용`, `짧고 친근하게` previews, keeps every transformation editable and in `draft`, and displays platform, recipient, and time before `예약 저장`. Saving creates `status: 'scheduled'`; it never sends a network request. Unsupported KakaoTalk targets display `예약 시 직접 보내기 필요` and store `deliveryMode: 'manual'`.

- [ ] **Step 4: Run message, timeline, and storage tests**

Run: `cd web && npm run test:run -- src/features/messages src/features/today src/core/storage`

Expected: PASS; a message can be saved, edited, canceled, and displayed in Today without transmission.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web/src/features/messages web/src/features/today
git commit -m "feat: add local message scheduling journey"
```

### Task 7: Add routine runner and persistent settings

**Files:**
- Create: `web/src/features/routines/routineRunner.ts`
- Create: `web/src/features/routines/RoutinesScreen.tsx`
- Create: `web/src/features/settings/SettingsScreen.tsx`
- Create: `web/src/features/settings/settingsRepository.ts`
- Create: `web/src/features/rescue/reschedulePlan.ts`
- Test: `web/src/features/routines/routineRunner.test.ts`
- Test: `web/src/features/settings/SettingsScreen.test.tsx`

**Interfaces:**
- Produces: `advanceRoutine(state, action): RoutineRunState`
- Produces: `settingsRepository.load()`, `settingsRepository.save(settings)`
- Produces: `reschedulePlan(tasks, decisions, now): RescheduleResult`

- [ ] **Step 1: Write routine and persistence tests**

```ts
it('adds time without skipping the current routine step', () => {
  const next = advanceRoutine(runningStepOne, { type: 'ADD_MINUTES', minutes: 5 })
  expect(next.currentStepIndex).toBe(0)
  expect(next.endsAt).toBe('2026-08-20T09:35:00+09:00')
})

it('persists profile, theme, and reduced motion without changing routes', async () => {
  await settingsRepository.save({ profile: 'high_school', theme: 'dark', reducedMotion: true })
  expect(await settingsRepository.load()).toMatchObject({ profile: 'high_school', theme: 'dark', reducedMotion: true })
})

it('supports keep, tomorrow, five-minute, and cancel decisions', () => {
  const result = reschedulePlan(tasks, { a: 'keep', b: 'tomorrow', c: 'five_minute', d: 'cancel' }, now)
  expect(result.items.map(item => item.status)).toEqual(['open', 'deferred', 'open', 'canceled'])
  expect(result.items.find(item => item.id === 'c')?.estimateMinutes).toBe(5)
})
```

- [ ] **Step 2: Run focused tests and verify failure**

Run: `cd web && npm run test:run -- src/features/routines src/features/settings`

Expected: FAIL because the runner and settings repository do not exist.

- [ ] **Step 3: Implement routine controls and stable settings**

Routine controls are `시작`, `완료`, `건너뛰기`, `5분 추가` and always show the projected finish time. The plan rescue sheet supports `오늘 꼭 하기`, `내일로 이동`, `5분 버전`, `취소` and previews the new finish time before applying. Settings provide profile values `middle_school`, `high_school`, `university`, `worker`; theme values `light`, `dark`, `system`; reduced motion; quiet hours defaulting to `23:00–07:00`; and read-only connector status cards.

- [ ] **Step 4: Run all unit and component tests**

Run: `cd web && npm run test:run`

Expected: PASS; reloading settings preserves color and content preferences while route structure stays fixed.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add web/src/features/routines web/src/features/settings web/src/core/theme
git commit -m "feat: add routines and persistent preferences"
```

### Task 8: Verify mobile journeys, accessibility, and offline installation

**Files:**
- Create: `web/e2e/core-journey.spec.ts`
- Create: `web/e2e/layout-stability.spec.ts`
- Create: `web/e2e/offline.spec.ts`
- Create: `docs/testing/monggle-pwa-foundation.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: all foundation routes and repositories
- Produces: reproducible verification commands and mobile screenshots

- [ ] **Step 1: Write failing end-to-end journeys**

```ts
test('capture, focus, complete, and schedule a reply', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('빠른 캡처').fill('수학 오답 3개 풀기')
  await page.getByRole('button', { name: '할 일로 저장' }).click()
  await page.getByRole('button', { name: '집중 시작' }).click()
  await expect(page.getByRole('heading', { name: '수학 오답 3개 풀기' })).toBeVisible()
  await page.getByRole('link', { name: '메시지' }).click()
  await page.getByRole('button', { name: '새 예약' }).click()
  await page.getByLabel('플랫폼').selectOption('slack')
  await page.getByLabel('받는 곳').fill('#study-team')
  await page.getByLabel('메시지').fill('자료를 오전에 공유할게요.')
  await page.getByRole('button', { name: '예약 저장' }).click()
  await expect(page.getByText('예약됨')).toBeVisible()
})
```

- [ ] **Step 2: Run E2E tests and confirm the first failure**

Run: `cd web && npx playwright install chromium && npm run e2e`

Expected: FAIL on the first missing or inaccessible locator.

- [ ] **Step 3: Fix only verified integration gaps and document operation**

Configure Playwright for Pixel 7 and desktop 1280×800. Assert no horizontal overflow at 320, 390, and 1280 pixels; every primary control has at least a 44-pixel bounding box; reduced-motion removes nonessential animation; profile changes preserve the same five navigation hrefs; and a previously visited shell loads with the browser offline. Document `npm install`, `npm run dev`, `npm run test:run`, `npm run build`, and `npm run e2e` in README.

- [ ] **Step 4: Run the complete foundation gate**

Run: `cd web && npm run test:run && npm run build && npm run e2e`

Expected: all unit, component, build, mobile layout, and offline tests PASS.

- [ ] **Step 5: Record evidence and commit the checkpoint**

Write test date, browser version, viewport results, accessibility notes, and remaining connector limitation in `docs/testing/monggle-pwa-foundation.md`.

```bash
git add web README.md docs/testing/monggle-pwa-foundation.md
git commit -m "test: verify Monggle PWA foundation"
```

## Follow-on Plan Boundaries

After this plan passes, write and execute these independent plans in order:

1. `monggle-scheduling-backend`: authenticated API, encrypted connector secrets, idempotent job queue, timezone-safe scheduler, audit log, retry policy.
2. `monggle-slack-telegram-connectors`: Slack OAuth and `chat.scheduleMessage`; Telegram bot setup, target discovery, send and cancel flows.
3. `monggle-kakao-connectors`: KakaoWork Bot API; KakaoTalk consent/template capability detection and manual-action fallback.

Each connector plan must include sandbox accounts, token redaction tests, provider rate-limit tests, duplicate-delivery tests, and explicit user-facing capability labels before any live message is sent.
