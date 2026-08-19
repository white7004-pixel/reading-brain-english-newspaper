# Priority Category Task List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 오늘의 모든 할 일을 기본·사용자 분류로 필터링하고 우선순위와 마감 순서대로 한눈에 보여준다.

**Architecture:** 분류는 IndexedDB의 독립 테이블에 저장하고 할 일은 안정적인 `categoryId`로 참조한다. 정렬·필터는 순수 함수로 분리하며, 오늘 화면은 저장소에서 할 일과 분류를 함께 로드해 현재 집중 카드와 우선순위 목록에 전달한다.

**Tech Stack:** React 19, TypeScript, Dexie/IndexedDB, Vitest, Testing Library, Capacitor, Android Gradle

**Spec:** `docs/superpowers/specs/2026-08-20-priority-category-task-list-design.md`

## Global Constraints

- 기본 분류 ID는 `work`, `personal`, `exercise`, `reading`, `hobby`다.
- 기존 `study`, `life`, `rest`는 각각 `personal`, `personal`, `hobby`로 변환한다.
- 기본 분류는 삭제할 수 없고 사용자 분류 삭제 시 연결 할 일을 `personal`로 이동한다.
- 정렬 순서는 미완료, active, 우선순위 3→1, 빠른 마감, 빠른 생성 시각이다.
- 색상만으로 의미를 전달하지 않고 텍스트 라벨을 함께 표시한다.
- 사용자 분류를 AI 의미 추론 대상으로 사용하지 않는다.
- 새 외부 패키지나 유료 AI API를 추가하지 않는다.

---

### Task 1: 분류 모델과 기존 할 일 호환 변환

**Files:**
- Create: `web/src/core/model/category.ts`
- Modify: `web/src/core/model/task.ts`
- Create: `web/src/core/model/taskCategoryMigration.ts`
- Test: `web/src/core/model/taskCategoryMigration.test.ts`

**Interfaces:**
- Produces: `Category`, `CategoryId`, `DEFAULT_CATEGORIES`, `normalizeCategoryId(value?: string): CategoryId`
- Produces: `Task.categoryId: CategoryId`; 읽기 호환용 `Task.category?: string`

- [ ] **Step 1: Write the failing migration tests**

```ts
expect(normalizeCategoryId('study')).toBe('personal')
expect(normalizeCategoryId('life')).toBe('personal')
expect(normalizeCategoryId('rest')).toBe('hobby')
expect(normalizeCategoryId('work')).toBe('work')
expect(normalizeCategoryId('missing')).toBe('personal')
expect(DEFAULT_CATEGORIES.map(({ id }) => id)).toEqual(['work', 'personal', 'exercise', 'reading', 'hobby'])
```

- [ ] **Step 2: Verify RED**

Run: `npm run test:run -- src/core/model/taskCategoryMigration.test.ts`
Expected: FAIL because the migration module does not exist.

- [ ] **Step 3: Implement the model and normalization**

Define `Category` with `id`, `name`, `color`, `isDefault`, `createdAt`, `updatedAt`. Define the five Korean default records and a legacy mapping. Change new task creation contracts to require `categoryId`, retaining optional `category` only for records created by older app versions.

- [ ] **Step 4: Verify GREEN and type build**

Run: `npm run test:run -- src/core/model/taskCategoryMigration.test.ts && npm run build`
Expected: test and TypeScript production build PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/core/model/category.ts web/src/core/model/task.ts web/src/core/model/taskCategoryMigration.ts web/src/core/model/taskCategoryMigration.test.ts
git commit -m "feat: add task category model"
```

### Task 2: IndexedDB 분류 저장소와 안전한 삭제

**Files:**
- Modify: `web/src/core/storage/database.ts`
- Create: `web/src/core/storage/categoryRepository.ts`
- Test: `web/src/core/storage/categoryRepository.test.ts`
- Modify: `web/src/core/storage/taskRepository.ts`
- Test: `web/src/core/storage/taskRepository.test.ts`

**Interfaces:**
- Produces: `createCategoryRepository(database)` with `ensureDefaults()`, `list()`, `add(input)`, `update(id, patch)`, `remove(id)`
- Produces: task repository normalization from legacy `category` to `categoryId`

- [ ] **Step 1: Write failing repository tests**

```ts
await repository.ensureDefaults()
await repository.ensureDefaults()
expect(await repository.list()).toHaveLength(5)

await expect(repository.add({ name: '  ', color: '#5F53D6' })).rejects.toThrow('분류 이름')
await repository.add({ name: '프로젝트', color: '#5F53D6' })
await expect(repository.add({ name: ' 프로젝트 ', color: '#7A6DE0' })).rejects.toThrow('이미 있는 분류')

await repository.remove(custom.id)
expect((await taskRepository.listForDay('2026-08-20'))[0].categoryId).toBe('personal')
await expect(repository.remove('work')).rejects.toThrow('기본 분류')
```

Add a legacy task fixture with `category: 'study'` and assert repository reads it with `categoryId: 'personal'`.

- [ ] **Step 2: Verify RED**

Run: `npm run test:run -- src/core/storage/categoryRepository.test.ts src/core/storage/taskRepository.test.ts`
Expected: FAIL because the category table and repository are absent.

- [ ] **Step 3: Implement database version and repository**

Add a Dexie schema version containing `categories: 'id, name, isDefault, createdAt'`. Use a transaction over `categories` and `tasks` for deletion. Validate names after trimming and normalized lowercase comparison. Accept only palette colors exported by the category model.

- [ ] **Step 4: Implement task read/write normalization**

On every task `put`, `putMany`, and read, populate `categoryId` from `categoryId ?? category`; remove reliance on the legacy field without deleting it during the first compatibility release.

- [ ] **Step 5: Verify GREEN**

Run: `npm run test:run -- src/core/storage/categoryRepository.test.ts src/core/storage/taskRepository.test.ts`
Expected: all repository and migration tests PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/core/storage/database.ts web/src/core/storage/categoryRepository.ts web/src/core/storage/categoryRepository.test.ts web/src/core/storage/taskRepository.ts web/src/core/storage/taskRepository.test.ts
git commit -m "feat: persist custom task categories"
```

### Task 3: 우선순위 필터·정렬과 목록 UI

**Files:**
- Create: `web/src/features/today/sortPriorityTasks.ts`
- Test: `web/src/features/today/sortPriorityTasks.test.ts`
- Create: `web/src/features/today/PriorityTaskList.tsx`
- Test: `web/src/features/today/PriorityTaskList.test.tsx`
- Modify: `web/src/core/theme/global.css`

**Interfaces:**
- Produces: `sortPriorityTasks(tasks: Task[], categoryId: string | 'all'): Task[]`
- Produces: `<PriorityTaskList tasks categories activeTaskId selectedCategoryId onSelectCategory />`

- [ ] **Step 1: Write failing sort tests**

Build fixtures covering completed/open/active, priorities 1–3, due/no-due, and creation times. Assert exact IDs:

```ts
expect(sortPriorityTasks(tasks, 'all').map(({ id }) => id))
  .toEqual(['active', 'high-due', 'high-no-due', 'medium', 'low', 'completed'])
expect(sortPriorityTasks(tasks, 'exercise').every((task) => task.categoryId === 'exercise')).toBe(true)
```

- [ ] **Step 2: Verify sort RED**

Run: `npm run test:run -- src/features/today/sortPriorityTasks.test.ts`
Expected: FAIL because `sortPriorityTasks` does not exist.

- [ ] **Step 3: Implement stable pure sorting**

Filter without mutating the input. Compare completion status, active status, descending priority, defined/ascending `dueAt`, ascending `createdAt`, then original index for deterministic stability.

- [ ] **Step 4: Verify sort GREEN**

Run: `npm run test:run -- src/features/today/sortPriorityTasks.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing component tests**

Render multiple categories and tasks. Assert `전체` and every category filter exists, selecting `운동` hides work tasks, the active row contains `지금 집중`, completed content uses accessible text `완료`, and priority/time labels are visible.

- [ ] **Step 6: Verify component RED**

Run: `npm run test:run -- src/features/today/PriorityTaskList.test.tsx`
Expected: FAIL because the component does not exist.

- [ ] **Step 7: Implement component and modern compact styling**

Use a horizontally scrollable filter row and semantic ordered list. Keep each row at least 44px high; render rank, title, category name, `높음/보통/낮음`, estimated minutes, formatted deadline, active/completed state. Add a clear empty state.

- [ ] **Step 8: Verify component GREEN**

Run: `npm run test:run -- src/features/today/PriorityTaskList.test.tsx src/features/today/sortPriorityTasks.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add web/src/features/today/sortPriorityTasks.ts web/src/features/today/sortPriorityTasks.test.ts web/src/features/today/PriorityTaskList.tsx web/src/features/today/PriorityTaskList.test.tsx web/src/core/theme/global.css
git commit -m "feat: show priority sorted task list"
```

### Task 4: 할 일 입력의 분류 추천·선택·직접 추가

**Files:**
- Modify: `web/src/features/today/taskDraft.ts`
- Modify: `web/src/features/today/parseTaskDrafts.ts`
- Modify: `web/src/features/today/parseTaskDrafts.test.ts`
- Create: `web/src/features/today/CategoryPicker.tsx`
- Test: `web/src/features/today/CategoryPicker.test.tsx`
- Modify: `web/src/features/today/TaskDraftReview.tsx`
- Modify: `web/src/features/today/TaskDraftReview.test.tsx`

**Interfaces:**
- Task drafts produce `categoryId: CategoryId`
- `CategoryPicker` consumes categories/current ID and emits `onSelect(id)` and `onCreate({ name, color })`

- [ ] **Step 1: Write failing parser tests**

Assert `회의 자료 만들기 → work`, `저녁에 달리기 → exercise`, `책 30쪽 읽기 → reading`, `기타 입력 → personal`.

- [ ] **Step 2: Verify parser RED**

Run: `npm run test:run -- src/features/today/parseTaskDrafts.test.ts`
Expected: FAIL because drafts have no category recommendation.

- [ ] **Step 3: Implement minimal keyword recommendation**

Add explicit Korean keyword groups for work, exercise, reading, and hobby; fall back to personal. Do not inspect user-created category names.

- [ ] **Step 4: Verify parser GREEN**

Run: `npm run test:run -- src/features/today/parseTaskDrafts.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing picker/review tests**

Assert changing the select updates a draft's `categoryId`; adding `프로젝트` calls `onCreate` with a palette color; blank names show an inline error and do not submit.

- [ ] **Step 6: Verify picker RED**

Run: `npm run test:run -- src/features/today/CategoryPicker.test.tsx src/features/today/TaskDraftReview.test.tsx`
Expected: FAIL because category controls are absent.

- [ ] **Step 7: Implement picker and review integration**

Render the current categories, an `분류 추가` disclosure, trimmed name input, palette buttons with text labels, inline validation, and category selection per draft.

- [ ] **Step 8: Verify picker GREEN**

Run: `npm run test:run -- src/features/today/CategoryPicker.test.tsx src/features/today/TaskDraftReview.test.tsx src/features/today/parseTaskDrafts.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add web/src/features/today/taskDraft.ts web/src/features/today/parseTaskDrafts.ts web/src/features/today/parseTaskDrafts.test.ts web/src/features/today/CategoryPicker.tsx web/src/features/today/CategoryPicker.test.tsx web/src/features/today/TaskDraftReview.tsx web/src/features/today/TaskDraftReview.test.tsx
git commit -m "feat: categorize tasks during capture"
```

### Task 5: 분류 관리 화면과 오늘 화면 통합

**Files:**
- Create: `web/src/features/settings/CategoryManager.tsx`
- Test: `web/src/features/settings/CategoryManager.test.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/features/today/TodayScreen.test.tsx`
- Modify: `web/src/app/AppShell.tsx`

**Interfaces:**
- `CategoryManager` consumes category repository operations and refreshes its list after mutation.
- `TodayDependencies` adds `listCategories`, `addCategory`; `TodayScreen` owns selected filter ID.

- [ ] **Step 1: Write failing category manager tests**

Assert defaults have no delete button, a custom category can be renamed/recolored, deleting a custom category requires confirmation, and repository errors remain visible with the input retained.

- [ ] **Step 2: Verify manager RED**

Run: `npm run test:run -- src/features/settings/CategoryManager.test.tsx`
Expected: FAIL because `CategoryManager` does not exist.

- [ ] **Step 3: Implement category manager**

Use inline edit controls and the approved palette. Disable duplicate submissions while pending. On failure show `role="alert"`; on success reload categories. Clearly state that deleted categories' tasks move to 개인.

- [ ] **Step 4: Verify manager GREEN**

Run: `npm run test:run -- src/features/settings/CategoryManager.test.tsx`
Expected: PASS.

- [ ] **Step 5: Write failing Today integration test**

Inject two categories and three tasks. Assert Today loads both resources, renders the priority list below NowCard, category creation refreshes options, a single quick task saves as `personal`, and reviewed drafts preserve selected `categoryId`.

- [ ] **Step 6: Verify Today RED**

Run: `npm run test:run -- src/features/today/TodayScreen.test.tsx`
Expected: FAIL because Today does not load categories or render the list.

- [ ] **Step 7: Wire Today and Settings**

Initialize defaults once, load categories and today's tasks, pass categories to draft review/list, use `personal` for single capture, and render `PriorityTaskList` directly after `NowCard`. Mount `CategoryManager` in settings without changing existing Monggle options.

- [ ] **Step 8: Verify Today GREEN**

Run: `npm run test:run -- src/features/today/TodayScreen.test.tsx src/features/settings/CategoryManager.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add web/src/features/settings/CategoryManager.tsx web/src/features/settings/CategoryManager.test.tsx web/src/features/settings/SettingsScreen.tsx web/src/features/today/TodayScreen.tsx web/src/features/today/TodayScreen.test.tsx web/src/app/AppShell.tsx
git commit -m "feat: integrate task category management"
```

### Task 6: 전체 회귀검증, 네이티브 동기화, 실제 화면 확인

**Files:**
- Modify only files required by failures directly caused by Tasks 1–5.
- Output: `web/android/app/build/outputs/apk/debug/app-debug.apk`

**Interfaces:**
- Consumes all preceding task outputs.
- Produces a verified web build and Android debug APK.

- [ ] **Step 1: Run complete web verification**

Run: `npm run test:run && npm run build`
Expected: all tests PASS and production build exits 0.

- [ ] **Step 2: Synchronize Capacitor**

Run: `npx cap sync`
Expected: Android and iOS web assets sync; Windows may report expected CocoaPods/xcodebuild warnings only.

- [ ] **Step 3: Run Android verification**

From `web/android`, with project JDK and Android SDK environment configured, run:

```powershell
.\gradlew.bat :app:testDebugUnitTest :app:lintDebug :app:assembleDebug --no-daemon --console=plain
```

Expected: `BUILD SUCCESSFUL` and APK exists.

- [ ] **Step 4: Install and visually verify**

Install with `adb install -r`, force-stop and relaunch `app.monggle.focus`, add tasks across at least two categories and priorities, then verify the list order, filters, active emphasis, completed placement, custom-category creation, and 44px touch targets in the emulator.

- [ ] **Step 5: Commit verification fixes if any**

Run `git status --short`, inspect every changed path, stage only files modified to resolve a Task 6 failure with explicit `git add -- path/to/file`, then commit them with `git commit -m "fix: complete category list verification"`. If no verification fix was needed, do not create an empty commit.

- [ ] **Step 6: Confirm clean worktree**

Run: `git status --short`
Expected: no output.
