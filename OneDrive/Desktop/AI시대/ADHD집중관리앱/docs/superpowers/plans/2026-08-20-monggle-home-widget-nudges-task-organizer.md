# Monggle Home Widget, Nudges, and Task Organizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Korean natural-language input into reviewed tasks, schedule supportive Monggle nudges, and show today’s tasks on Android and iOS home-screen widgets.

**Architecture:** The React PWA owns the canonical task and nudge models, local parsing, review UI, and IndexedDB persistence. Capacitor packages the existing web app and exposes one typed bridge that copies a minimal widget snapshot into platform shared storage; Android AppWidget/WorkManager and iOS WidgetKit/AppIntent render and mutate that snapshot without duplicating business rules.

**Tech Stack:** React 19, TypeScript, Dexie 4, Vitest, Playwright, Capacitor 7, Kotlin/AppWidget/WorkManager, Swift/WidgetKit/AppIntent, XCTest

**Spec:** `docs/superpowers/specs/2026-08-20-monggle-home-widget-nudges-task-organizer-design.md`

## Global Constraints

- Nudge choices are exactly `0`, `30`, `60`, and `120` minutes; default is `60`.
- Never notify during the existing quiet-hours window and never replay missed notifications afterward.
- Never save parser output until the user presses `모두 저장` after review.
- Natural-language task parsing remains local and deterministic; no external AI API or usage credits.
- Widget shared storage contains only task IDs, display titles, completion state, due time, update time, and one Monggle line.
- Missing native capability falls back to an in-app persistent `지금 할 일` card.
- Preserve the five-tab navigation, Studio 3D visual system, message scheduling, and photo personalization.

---

### Task 1: Extend Task and Nudge Data Contracts

**Files:**
- Modify: `web/src/core/model/task.ts`
- Modify: `web/src/core/model/settings.ts`
- Modify: `web/src/features/settings/settingsRepository.ts`
- Test: `web/src/features/settings/settingsRepository.test.ts`
- Test: `web/src/core/storage/repositories.test.ts`

**Interfaces:**
- Produces: `TaskSource = 'manual' | 'local_parser'`
- Produces: `Task.dueAt?`, `Task.orderAfterTaskId?`, `Task.source`, `Task.parseConfidence?`
- Produces: `NudgeIntervalMinutes = 0 | 30 | 60 | 120`
- Produces: `MonggleSettings.nudgeIntervalMinutes`

- [ ] **Step 1: Write failing compatibility tests**

```ts
it('migrates old settings to a one-hour nudge interval', () => {
  localStorage.setItem('monggle.settings.v1', JSON.stringify({ key: 'main', theme: 'system' }))
  expect(settingsRepository.load().nudgeIntervalMinutes).toBe(60)
})

it('persists parser provenance and task ordering', async () => {
  await repository.save({ ...task, source: 'local_parser', parseConfidence: 0.86, orderAfterTaskId: 'task-1' })
  expect(await repository.listByDay(task.day)).toContainEqual(expect.objectContaining({ source: 'local_parser', orderAfterTaskId: 'task-1' }))
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `cd web && npm run test:run -- src/features/settings/settingsRepository.test.ts src/core/storage/repositories.test.ts`

Expected: FAIL because `nudgeIntervalMinutes`, `source`, and parser metadata do not exist.

- [ ] **Step 3: Add the exact model fields and defaults**

```ts
export type TaskSource = 'manual' | 'local_parser'
export type NudgeIntervalMinutes = 0 | 30 | 60 | 120

// Task additions
dueAt?: string
orderAfterTaskId?: string
source: TaskSource
parseConfidence?: number

// settings default addition
nudgeIntervalMinutes: 60
```

When reading older tasks, normalize missing `source` to `manual` at the repository boundary instead of requiring a destructive migration.

- [ ] **Step 4: Run focused tests and all storage tests**

Run: `cd web && npm run test:run -- src/core/storage src/features/settings`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- web/src/core/model/task.ts web/src/core/model/settings.ts web/src/features/settings/settingsRepository.ts web/src/features/settings/settingsRepository.test.ts web/src/core/storage/repositories.test.ts
git commit -m "feat: add task provenance and nudge settings"
```

### Task 2: Deterministic Korean Task Parser

**Files:**
- Create: `web/src/features/today/taskDraft.ts`
- Create: `web/src/features/today/parseTaskDrafts.ts`
- Create: `web/src/features/today/parseTaskDrafts.test.ts`

**Interfaces:**
- Produces: `TaskDraft { id, title, day, dueAt?, priority, estimateMinutes, orderAfterDraftId?, confidence, needsReview }`
- Produces: `parseTaskDrafts(input: string, now: Date): TaskDraft[]`
- Consumes: Korean separators, relative dates, clock phrases, and sequence phrases from the approved spec

- [ ] **Step 1: Write failing parser examples**

```ts
it('splits tasks and extracts time and sequence locally', () => {
  const drafts = parseTaskDrafts('오늘 영어 단어 30개 외우고 3시에 병원 갔다가 저녁에 엄마에게 문자', new Date('2026-08-20T09:00:00+09:00'))
  expect(drafts.map(({ title }) => title)).toEqual(['영어 단어 30개 외우기', '병원 방문', '엄마에게 문자'])
  expect(drafts[1].dueAt).toBe('2026-08-20T15:00:00+09:00')
  expect(drafts[2].orderAfterDraftId).toBe(drafts[1].id)
})

it('marks ambiguous time instead of inventing one', () => {
  expect(parseTaskDrafts('나중에 보고서 쓰기', now)[0]).toMatchObject({ dueAt: undefined, needsReview: true })
})

it('returns no drafts for blank input', () => {
  expect(parseTaskDrafts('   ', now)).toEqual([])
})
```

- [ ] **Step 2: Run the parser test and verify RED**

Run: `cd web && npm run test:run -- src/features/today/parseTaskDrafts.test.ts`

Expected: FAIL because the parser modules do not exist.

- [ ] **Step 3: Implement small pure parsing stages**

Implement `splitClauses`, `extractDay`, `extractClock`, `normalizeActionTitle`, and `linkSequence` as unexported pure helpers. Use this precedence: explicit date/time, relative day, time-of-day label, unspecified. Set `needsReview` when confidence is below `0.75` or any temporal phrase remains unparsed.

```ts
export function parseTaskDrafts(input: string, now: Date): TaskDraft[] {
  return linkSequence(splitClauses(input).map((clause) => toDraft(clause, now)))
}
```

- [ ] **Step 4: Run focused and Today feature tests**

Run: `cd web && npm run test:run -- src/features/today`

Expected: PASS with no network mocks because parsing has no network path.

- [ ] **Step 5: Commit**

```powershell
git add -- web/src/features/today/taskDraft.ts web/src/features/today/parseTaskDrafts.ts web/src/features/today/parseTaskDrafts.test.ts
git commit -m "feat: organize Korean task input locally"
```

### Task 3: Review-Before-Save Organizer UI

**Files:**
- Create: `web/src/features/today/TaskDraftReview.tsx`
- Create: `web/src/features/today/TaskDraftReview.test.tsx`
- Modify: `web/src/features/today/QuickCapture.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/core/theme/global.css`
- Test: `web/src/features/today/TodayScreen.test.tsx`

**Interfaces:**
- Produces: `<TaskDraftReview drafts onChange onSave onCancel />`
- Consumes: `parseTaskDrafts(input, now)` and `taskRepository.save(task)`
- Emits: `monggle:tasks-changed` after one successful transaction

- [ ] **Step 1: Write failing review journey tests**

```tsx
it('does not save generated drafts before confirmation', async () => {
  render(<TodayScreen dependencies={fakes} />)
  await userEvent.type(screen.getByLabelText('오늘 할 일 한 번에 적기'), '수학 숙제하고 3시에 병원')
  await userEvent.click(screen.getByRole('button', { name: '정리하기' }))
  expect(fakes.saveMany).not.toHaveBeenCalled()
  expect(screen.getAllByLabelText('할 일 제목')).toHaveLength(2)
})

it('saves edited drafts only after 모두 저장', async () => {
  await userEvent.clear(screen.getAllByLabelText('할 일 제목')[0])
  await userEvent.type(screen.getAllByLabelText('할 일 제목')[0], '수학 10문제')
  await userEvent.click(screen.getByRole('button', { name: '모두 저장' }))
  expect(fakes.saveMany).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ title: '수학 10문제', source: 'local_parser' })]))
})
```

- [ ] **Step 2: Run the component tests and verify RED**

Run: `cd web && npm run test:run -- src/features/today/TaskDraftReview.test.tsx src/features/today/TodayScreen.test.tsx`

Expected: FAIL because review UI and dependency boundary do not exist.

- [ ] **Step 3: Implement pending draft state and atomic save**

Keep parsed drafts in React state only. Expose editable title, date, time, priority, and estimate fields. Convert draft sequence IDs to saved task IDs before one Dexie `rw` transaction. `취소` clears only pending drafts and never touches saved tasks.

- [ ] **Step 4: Add compact Studio 3D review styles and run tests**

Run: `cd web && npm run test:run -- src/features/today src/core/storage`

Expected: PASS; keyboard focus follows input → 정리하기 → first draft → 모두 저장.

- [ ] **Step 5: Commit**

```powershell
git add -- web/src/features/today web/src/core/theme/global.css web/src/core/storage
git commit -m "feat: review organized tasks before saving"
```

### Task 4: Supportive Nudge Policy and Persistent In-App Card

**Files:**
- Create: `web/src/features/nudges/nudgePolicy.ts`
- Create: `web/src/features/nudges/nudgePolicy.test.ts`
- Create: `web/src/features/nudges/PersistentNowTask.tsx`
- Create: `web/src/features/nudges/PersistentNowTask.test.tsx`
- Create: `web/src/features/nudges/taskCheckIn.ts`
- Create: `web/src/features/nudges/taskCheckIn.test.ts`
- Modify: `web/src/app/AppShell.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Modify: `web/src/core/theme/global.css`

**Interfaces:**
- Produces: `selectNudgeTask(tasks, now): Task | null`
- Produces: `buildNudgeLine(task, state): string`
- Produces: `isQuietTime(now, start, end): boolean`
- Produces: `<PersistentNowTask task line />`
- Produces: `TaskCheckInResponse` and `applyCheckInResponse(tasks, response, now)`

- [ ] **Step 1: Write failing policy and UI tests**

```ts
it.each([30, 60, 120] as const)('accepts the supported %i minute interval', (minutes) => {
  expect(nextNudgeAt(now, minutes)).toEqual(new Date(now.getTime() + minutes * 60_000))
})

it('does not nudge during overnight quiet hours', () => {
  expect(shouldNudge({ now: at('23:30'), quietStart: '23:00', quietEnd: '07:00', tasks: [task] })).toBe(false)
})

it('renders the next task without covering navigation', () => {
  render(<PersistentNowTask task={task} line="문제 한 개만 먼저 열어볼까?" />)
  expect(screen.getByTestId('persistent-now-task')).toHaveTextContent(task.title)
})

it('asks about only one task and completes it when the user answers 했어', () => {
  const response = { taskId: task.id, action: 'done', respondedAt: now.toISOString() } as const
  expect(applyCheckInResponse([task, nextTask], response, now)).toMatchObject({
    tasks: [expect.objectContaining({ id: task.id, status: 'done' }), nextTask],
    nextTaskId: nextTask.id,
  })
})

it('does not ask again before a later reminder', () => {
  const response = { taskId: task.id, action: 'later', remindAt: oneHourLater.toISOString(), respondedAt: now.toISOString() } as const
  expect(selectNudgeTask([task], thirtyMinutesLater, response)).toBeNull()
})
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm run test:run -- src/features/nudges`

Expected: FAIL because nudge policy and card do not exist.

- [ ] **Step 3: Implement pure scheduling policy and settings control**

Add one select with `끄기`, `30분마다`, `1시간마다`, `2시간마다`. The persistent card subscribes to `monggle:tasks-changed`, reads today’s open tasks, and sits above the bottom navigation with `pointer-events` limited to its own buttons. It shows one task question and exactly three actions: `했어`, `하는 중`, `나중에`. `나중에` opens `30분 뒤`, `1시간 뒤`, `오늘 저녁`; unanswered questions replace the prior pending notification instead of accumulating.

- [ ] **Step 4: Run unit, app-shell, accessibility, and 320px tests**

Run: `cd web && npm run test:run -- src/features/nudges src/features/settings src/app`

Expected: PASS; no nudge line uses shame, threats, or accumulated missed-alert counts.

- [ ] **Step 5: Commit**

```powershell
git add -- web/src/features/nudges web/src/features/settings/SettingsScreen.tsx web/src/app/AppShell.tsx web/src/core/theme/global.css
git commit -m "feat: add supportive Monggle nudge controls"
```

### Task 5: Widget Snapshot and Native Bridge Contract

**Files:**
- Create: `web/src/features/widgets/widgetSnapshot.ts`
- Create: `web/src/features/widgets/widgetSnapshot.test.ts`
- Create: `web/src/features/widgets/nativeWidgetBridge.ts`
- Create: `web/src/features/widgets/nativeWidgetBridge.test.ts`
- Modify: `web/src/features/today/TodayScreen.tsx`

**Interfaces:**
- Produces: `WidgetSnapshot { generatedAt, remainingCount, tasks, nudgeLine }`
- Produces: `buildWidgetSnapshot(tasks, line, now): WidgetSnapshot`
- Produces: `nativeWidgetBridge.update(snapshot)`, `scheduleNudges(config)`, `isAvailable()`
- Consumes: Capacitor plugin name `MonggleWidget`
- Consumes: latest `TaskCheckInResponse` so notification and widget actions share one state transition

- [ ] **Step 1: Write failing minimal-data and fallback tests**

```ts
it('omits descriptions, photos, and parser confidence from widget data', () => {
  expect(buildWidgetSnapshot([task], '한 개만 시작해볼까?', now)).toEqual({
    generatedAt: now.toISOString(), remainingCount: 1,
    tasks: [{ id: task.id, title: task.title, completed: false, dueAt: task.dueAt, updatedAt: task.updatedAt }],
    nudgeLine: '한 개만 시작해볼까?',
  })
})

it('keeps web save successful when native update is unavailable', async () => {
  await expect(nativeWidgetBridge.update(snapshot)).resolves.toEqual({ available: false })
})
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm run test:run -- src/features/widgets`

Expected: FAIL because snapshot and bridge modules do not exist.

- [ ] **Step 3: Implement a typed optional Capacitor plugin wrapper**

```ts
export interface MonggleWidgetPlugin {
  updateWidget(options: { snapshot: WidgetSnapshot }): Promise<void>
  scheduleNudges(options: NativeNudgeConfig): Promise<void>
}
```

Catch only native-unavailable errors as `{ available: false }`; return typed failures for permission denial and scheduling failure so Settings can show distinct recovery text.

- [ ] **Step 4: Run widget and Today tests**

Run: `cd web && npm run test:run -- src/features/widgets src/features/today`

Expected: PASS and existing web behavior remains available without Capacitor.

- [ ] **Step 5: Commit**

```powershell
git add -- web/src/features/widgets web/src/features/today/TodayScreen.tsx
git commit -m "feat: add widget snapshot bridge contract"
```

### Task 6: Capacitor Mobile Shell and Shared Storage Plugin

**Files:**
- Modify: `web/package.json`
- Create: `web/capacitor.config.ts`
- Create: `web/android/`
- Create: `web/ios/`
- Create: `web/android/app/src/main/java/app/monggle/widget/MonggleWidgetPlugin.kt`
- Create: `web/ios/App/App/MonggleWidgetPlugin.swift`
- Test: `web/src/features/widgets/nativeWidgetBridge.test.ts`

**Interfaces:**
- Consumes: `MonggleWidgetPlugin` contract from Task 5
- Produces: native methods `updateWidget(snapshot)` and `scheduleNudges(config)`
- Produces shared container keys `widget_snapshot_v1` and `widget_completion_events_v1`

- [ ] **Step 1: Add pinned Capacitor dependencies and generate platforms**

Run:

```powershell
cd web
npm install --save-exact @capacitor/core@7 @capacitor/android@7 @capacitor/ios@7
npm install --save-dev --save-exact @capacitor/cli@7
npx cap add android
npx cap add ios
```

Set `appId: 'app.monggle.focus'`, `appName: '몽글'`, and `webDir: 'dist'` in `capacitor.config.ts`.

- [ ] **Step 2: Write native contract tests before plugin methods**

Android test asserts JSON writes to `SharedPreferences("group.app.monggle.focus")`; iOS XCTest asserts writes to `UserDefaults(suiteName: "group.app.monggle.focus")`. Both tests use the exact keys above and reject snapshots without `generatedAt`.

- [ ] **Step 3: Run native tests and verify RED**

Run Android: `cd web/android && ./gradlew test`

Run iOS on macOS: `cd web/ios/App && xcodebuild test -scheme App -destination 'platform=iOS Simulator,name=iPhone 16'`

Expected: FAIL because plugin persistence is not implemented.

- [ ] **Step 4: Implement shared storage and register the plugin**

Android parses snapshot JSON, writes atomically with `edit().putString(...).apply()`, then requests AppWidget refresh. iOS writes encoded snapshot data to the App Group suite, then calls `WidgetCenter.shared.reloadTimelines(ofKind: "MonggleWidget")`.

- [ ] **Step 5: Build, sync, test, and commit**

Run:

```powershell
cd web
npm run build
npx cap sync
cd android
./gradlew test assembleDebug
```

On macOS also run the iOS command from Step 3. Expected: all available platform tests PASS.

```powershell
git add -- web/package.json web/package-lock.json web/capacitor.config.ts web/android web/ios
git commit -m "feat: add Capacitor widget bridge"
```

### Task 7: Android Home Widget and WorkManager Nudges

**Files:**
- Create: `web/android/app/src/main/java/app/monggle/widget/MonggleWidgetProvider.kt`
- Create: `web/android/app/src/main/java/app/monggle/widget/MonggleNudgeWorker.kt`
- Create: `web/android/app/src/main/res/layout/monggle_widget_small.xml`
- Create: `web/android/app/src/main/res/layout/monggle_widget_medium.xml`
- Create: `web/android/app/src/main/res/xml/monggle_widget_info.xml`
- Modify: `web/android/app/src/main/AndroidManifest.xml`
- Test: `web/android/app/src/test/java/app/monggle/widget/MonggleWidgetProviderTest.kt`
- Test: `web/android/app/src/test/java/app/monggle/widget/MonggleNudgeWorkerTest.kt`

**Interfaces:**
- Consumes: `widget_snapshot_v1` and native nudge config
- Produces: small and medium AppWidget views, completion broadcast, notification channel `monggle_nudges`
- Produces: notification and widget actions `했어`, `하는 중`, `나중에`

- [ ] **Step 1: Write failing rendering and scheduling tests**

```kotlin
@Test fun mediumWidgetShowsAtMostThreeOpenTasks() {
  val state = renderWidget(snapshotWithOpenTasks(4), WidgetSize.MEDIUM)
  assertEquals(3, state.visibleTasks.size)
}

@Test fun quietHoursSkipWithoutCatchUp() {
  val result = policy.nextRun(now = at("23:30"), quietStart = "23:00", quietEnd = "07:00", interval = 60)
  assertEquals(tomorrowAt("08:00"), result)
}
```

- [ ] **Step 2: Run Android tests and verify RED**

Run: `cd web/android && ./gradlew test`

Expected: FAIL because provider, policy, and worker do not exist.

- [ ] **Step 3: Implement RemoteViews, completion broadcast, and worker**

Render one task for small and three for medium. Action broadcasts write a timestamped `TaskCheckInResponse` to `widget_completion_events_v1`: `했어` completes and advances, `하는 중` keeps the task, and `나중에` opens the defer choices. Update the widget immediately and open the app only when the title/body is tapped. Schedule unique periodic work named `monggle-nudges`; replace it when interval changes and cancel it for interval `0`. Reuse one stable notification ID so unanswered prompts never stack.

- [ ] **Step 4: Run Android unit and instrumentation-safe build checks**

Run: `cd web/android && ./gradlew test lintDebug assembleDebug`

Expected: PASS with manifest receiver exported rules and Android 13 notification permission handled.

- [ ] **Step 5: Commit**

```powershell
git add -- web/android
git commit -m "feat: add Android Monggle home widget"
```

### Task 8: iOS WidgetKit and AppIntent Completion

**Files:**
- Create: `web/ios/MonggleWidget/MonggleWidget.swift`
- Create: `web/ios/MonggleWidget/MonggleTimelineProvider.swift`
- Create: `web/ios/MonggleWidget/CompleteTaskIntent.swift`
- Create: `web/ios/MonggleWidget/Assets.xcassets/`
- Modify: `web/ios/App/App.xcodeproj/project.pbxproj`
- Modify: `web/ios/App/App/App.entitlements`
- Create: `web/ios/MonggleWidget/MonggleWidget.entitlements`
- Test: `web/ios/App/AppTests/MonggleWidgetSnapshotTests.swift`

**Interfaces:**
- Consumes: App Group `group.app.monggle.focus`, `widget_snapshot_v1`
- Produces: `systemSmall` and `systemMedium` widgets
- Produces: `CompleteTaskIntent(taskID: String)`
- Produces: `KeepWorkingIntent` and `RemindLaterIntent`

- [ ] **Step 1: Write failing snapshot decoding and intent tests**

```swift
func testMediumEntryContainsOnlyFirstThreeOpenTasks() throws {
  let entry = try WidgetEntry(snapshot: fixtureWithFourTasks)
  XCTAssertEqual(Array(entry.tasks.prefix(3)).count, 3)
}

func testCompleteIntentWritesTimestampedEvent() async throws {
  _ = try await CompleteTaskIntent(taskID: "task-1").perform()
  XCTAssertEqual(eventStore.events.first?.taskID, "task-1")
}
```

- [ ] **Step 2: Run iOS tests on macOS and verify RED**

Run: `cd web/ios/App && xcodebuild test -scheme App -destination 'platform=iOS Simulator,name=iPhone 16'`

Expected: FAIL because widget target and intent do not exist.

- [ ] **Step 3: Implement WidgetKit views, timeline, App Group, and intent**

Use static Studio-purple gradients and bundled Monggle artwork. Timeline refreshes at the next scheduled nudge but accepts that iOS may defer it. `CompleteTaskIntent`, `KeepWorkingIntent`, and `RemindLaterIntent` append timestamped check-in events and call `WidgetCenter.shared.reloadAllTimelines()`.

- [ ] **Step 4: Run tests and build both app and extension**

Run:

```bash
cd web/ios/App
xcodebuild test -scheme App -destination 'platform=iOS Simulator,name=iPhone 16'
xcodebuild build -scheme App -destination 'generic/platform=iOS Simulator'
```

Expected: PASS with valid App Group entitlements for both targets.

- [ ] **Step 5: Commit**

```bash
git add -- web/ios
git commit -m "feat: add iOS Monggle home widget"
```

### Task 9: Merge Widget Completions and Refresh Scheduling

**Files:**
- Create: `web/src/features/widgets/mergeWidgetEvents.ts`
- Create: `web/src/features/widgets/mergeWidgetEvents.test.ts`
- Modify: `web/src/features/widgets/nativeWidgetBridge.ts`
- Modify: `web/src/app/AppShell.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`

**Interfaces:**
- Produces: `mergeWidgetCompletionEvents(tasks, events): Task[]`
- Adds: `nativeWidgetBridge.readCompletionEvents()` and `clearCompletionEvents(ids)`
- Consumes: most-recent-`updatedAt` conflict policy

- [ ] **Step 1: Write failing conflict and app-resume tests**

```ts
it('keeps the newest update when app and widget disagree', () => {
  expect(mergeWidgetCompletionEvents([taskUpdatedAt('10:05', false)], [eventAt('10:00', true)])[0].status).toBe('open')
  expect(mergeWidgetCompletionEvents([taskUpdatedAt('10:00', false)], [eventAt('10:05', true)])[0].status).toBe('done')
})
```

- [ ] **Step 2: Run and verify RED**

Run: `cd web && npm run test:run -- src/features/widgets/mergeWidgetEvents.test.ts`

Expected: FAIL because event merge does not exist.

- [ ] **Step 3: Implement resume merge and permission recovery UI**

Listen for Capacitor `appStateChange` with `isActive: true`, read events, merge and persist in one transaction, clear only applied event IDs, rebuild the snapshot, and dispatch `monggle:tasks-changed`. Settings distinguishes `알림 권한 필요`, `배터리 제한`, and `홈 위젯을 추가해 주세요`.

- [ ] **Step 4: Run web and native bridge tests**

Run: `cd web && npm run test:run -- src/features/widgets src/app src/features/settings`

Expected: PASS, including stale-event and duplicate-event cases.

- [ ] **Step 5: Commit**

```powershell
git add -- web/src/features/widgets web/src/app/AppShell.tsx web/src/features/settings/SettingsScreen.tsx
git commit -m "feat: sync widget task completions"
```

### Task 10: Full Cross-Platform Verification and Documentation

**Files:**
- Create: `web/e2e/task-organizer-nudges.spec.ts`
- Modify: `web/e2e/studio-3d-mascot.spec.ts`
- Modify: `README.md`
- Modify: `docs/testing/monggle-pwa-foundation.md`
- Create: `docs/testing/monggle-native-widgets.md`

**Interfaces:**
- Consumes: all preceding tasks
- Produces: reproducible web, Android, and iOS verification commands

- [ ] **Step 1: Write failing browser journeys**

```ts
test('review is required and tasks persist after reload', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('오늘 할 일 한 번에 적기').fill('수학 숙제하고 3시에 병원')
  await page.getByRole('button', { name: '정리하기' }).click()
  await expect(page.getByText('수학 숙제')).toBeVisible()
  await page.reload()
  await expect(page.getByText('수학 숙제')).not.toBeVisible()
  // Repeat, press 모두 저장, reload, and expect it to remain.
})
```

- [ ] **Step 2: Run E2E and verify RED before wiring final selectors**

Run: `cd web && npm run e2e -- task-organizer-nudges.spec.ts`

Expected: FAIL until review persistence and fixed-card selectors are complete.

- [ ] **Step 3: Add 320×568, offline, privacy, and overlap assertions**

Assert the persistent card does not intersect the primary action, roaming Monggle, or bottom navigation. Block external network and confirm parsing still works. Verify interval selection survives reload and quiet-hours copy is visible.

- [ ] **Step 4: Run the complete clean suite**

```powershell
cd web
npm ci
npm run test:run
npm run build
npm run e2e
npx cap sync
cd android
./gradlew test lintDebug assembleDebug
```

On macOS additionally run:

```bash
cd web/ios/App
xcodebuild test -scheme App -destination 'platform=iOS Simulator,name=iPhone 16'
xcodebuild build -scheme App -destination 'generic/platform=iOS Simulator'
```

Expected: all web and available native checks PASS; generated widget screenshots show Korean text without clipping.

- [ ] **Step 5: Document platform limits and setup**

Document notification permission, Android battery restrictions, iOS timeline deferral, App Group configuration, widget installation steps, local-only parsing, supported intervals, quiet-hours behavior, and the web fallback.

- [ ] **Step 6: Commit**

```powershell
git add -- web/e2e README.md docs/testing
git commit -m "test: verify task organizer and home widgets"
```
