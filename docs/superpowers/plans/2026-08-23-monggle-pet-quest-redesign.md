# Monggle Pet Quest Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Monggle as a cute, non-punitive pet-quest productivity app where completing real tasks grows a pet and unlocks room customization.

**Architecture:** Keep `Task` as the source of truth for real work and add an isolated game domain containing `PetGameState`, a deterministic reward policy, and an idempotent reward ledger. Screen coordinators connect task completion, focus completion, reward settlement, and widget updates; presentational pet and quest components receive typed state and callbacks only.

**Tech Stack:** React 19, TypeScript 5.9, React Router 7, Dexie 4/IndexedDB, Vitest 3, Testing Library, Vite 7, CSS custom properties, PWA/Capacitor.

**Spec:** `docs/superpowers/specs/2026-08-23-monggle-pet-quest-redesign-design.md`

## Global Constraints

- Core task creation and focus timing remain free, unlimited, ad-free, and available offline.
- Missed days never reduce pet level, inventory, affinity, or owned items.
- A task completion event grants a reward at most once.
- Reward feedback is skippable and must not block persisted task completion.
- Premium controls are previews labeled `출시 준비 중`; no control may imply that a purchase succeeds.
- Preserve keyboard focus visibility, reduced-motion behavior, and touch targets of at least 48px.
- Release artwork is out of scope; the first implementation uses one internally consistent vector pet and room asset set.

## File Structure

- `src/features/pet/model.ts`: game state, inventory, room, and ledger types plus initial state.
- `src/features/pet/rewardPolicy.ts`: deterministic reward calculation with an injected random source.
- `src/features/pet/petRepository.ts`: Dexie-backed state and idempotent reward settlement.
- `src/features/pet/PetAvatar.tsx`: accessible vector pet renderer with mood and level variants.
- `src/features/pet/RewardBurst.tsx`: short, dismissible completion feedback.
- `src/features/pet/PetHero.tsx`: compact home header showing pet status and daily hearts.
- `src/features/pet/PetScreen.tsx`: feeding, level progress, inventory, and room customization.
- `src/features/pet/pet.css`: B2 pet, room, reward, and shop-preview visuals.
- `src/features/today/FeaturedQuest.tsx`: one energy-aware recommended quest and its three-minute action.
- `src/features/today/QuestList.tsx`: compact remaining/completed quest list and completion actions.
- `src/features/today/TodayScreen.tsx`: orchestrates tasks, rewards, pet state, and reward feedback.
- `src/features/focus/FocusScreen.tsx`: reports completed focus duration to its caller.
- `src/features/premium/PremiumPreview.tsx`: honest locked-feature preview.
- `src/app/App.tsx`, `src/app/BottomNav.tsx`: four-tab route structure.
- `src/core/storage/database.ts`: Dexie version 6 game-state and reward-ledger tables.
- `src/core/theme/tokens.css`, `src/core/theme/global.css`: B2 visual tokens and shared controls.

---

### Task 1: Define the deterministic pet reward domain

**Files:**
- Create: `src/features/pet/model.ts`
- Create: `src/features/pet/rewardPolicy.ts`
- Test: `src/features/pet/rewardPolicy.test.ts`

**Interfaces:**
- Produces: `PetGameState`, `RewardGrant`, `RewardEvent`, `initialPetGameState`, and `calculateReward(input, random): RewardGrant`.
- Consumes: `Task` from `src/core/model/task.ts`.

- [ ] **Step 1: Write the failing reward-policy tests**

```ts
import { expect, it } from 'vitest'
import { calculateReward } from './rewardPolicy'

it('grants the fixed base reward for a completed quest', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 0 }, () => 0.99)).toEqual({ xp: 10, coins: 5, food: 0, hearts: 1 })
})

it('adds the three-minute focus bonus and supports deterministic food drops', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 3 }, () => 0.1)).toEqual({ xp: 15, coins: 7, food: 1, hearts: 1 })
})

it('caps long-session bonuses', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 300 }, () => 0.99)).toEqual({ xp: 25, coins: 12, food: 0, hearts: 1 })
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- --run src/features/pet/rewardPolicy.test.ts`
Expected: FAIL because `rewardPolicy.ts` does not exist.

- [ ] **Step 3: Implement the model and minimum reward policy**

```ts
export interface RewardGrant { xp: number; coins: number; food: number; hearts: number }
export interface RewardEvent { id: string; taskId: string; completedAt: string; focusMinutes: number; grant: RewardGrant; settledAt?: string }
export interface PetGameState { key: 'primary'; petName: string; level: number; xp: number; coins: number; food: number; affinity: number; dailyHearts: number; heartDay: string; ownedItemIds: string[]; equippedItemIds: string[] }
export const initialPetGameState: PetGameState = { key: 'primary', petName: '몽글이', level: 1, xp: 0, coins: 0, food: 0, affinity: 0, dailyHearts: 0, heartDay: '', ownedItemIds: [], equippedItemIds: [] }
```

Implement `calculateReward` with the literal base values from the tests, a `focusMinutes >= 3` bonus, a maximum long-session bonus of `xp +10` and `coins +5`, and one food when the injected random value is below `0.2`.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- --run src/features/pet/rewardPolicy.test.ts`
Expected: 3 tests PASS with no warnings.

- [ ] **Step 5: Commit**

```bash
git add src/features/pet/model.ts src/features/pet/rewardPolicy.ts src/features/pet/rewardPolicy.test.ts
git commit -m "feat: define pet quest rewards"
```

### Task 2: Persist pet state and settle each completion once

**Files:**
- Modify: `src/core/storage/database.ts`
- Create: `src/features/pet/petRepository.ts`
- Test: `src/features/pet/petRepository.test.ts`

**Interfaces:**
- Consumes: `PetGameState`, `RewardEvent`, `RewardGrant`, and `initialPetGameState` from Task 1.
- Produces: `createPetRepository(database)` with `loadState()`, `record(event)`, `settle(eventId)`, `listUnsettled()`, `feedPet()`, and `equipItem(itemId)`.

- [ ] **Step 1: Write failing repository tests**

```ts
it('settles the same completion event only once', async () => {
  const database = createDatabase(`pet-${crypto.randomUUID()}`)
  const repository = createPetRepository(database)
  const event = { id: 'task-1@2026-08-23T10:00:00Z', taskId: 'task-1', completedAt: '2026-08-23T10:00:00Z', focusMinutes: 3, grant: { xp: 15, coins: 7, food: 1, hearts: 1 } }
  await repository.record(event)
  await repository.settle(event.id)
  await repository.settle(event.id)
  expect(await repository.loadState()).toMatchObject({ xp: 15, coins: 7, food: 1, dailyHearts: 1 })
})

it('feeding never penalizes an empty inventory', async () => {
  const repository = createPetRepository(createDatabase(`feed-${crypto.randomUUID()}`))
  expect(await repository.feedPet()).toMatchObject({ food: 0, affinity: 0 })
})
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test -- --run src/features/pet/petRepository.test.ts`
Expected: FAIL because the repository and database tables do not exist.

- [ ] **Step 3: Add Dexie version 6 and repository transactions**

Add `petGameStates!: EntityTable<PetGameState, 'key'>` and `rewardEvents!: EntityTable<RewardEvent, 'id'>`. Version 6 must retain every version-5 table and add:

```ts
petGameStates: '&key',
rewardEvents: '&id,taskId,completedAt,settledAt',
```

Implement `record` as an idempotent insert of the pending reward event. Implement `settle(eventId)` in one Dexie read-write transaction over both tables. Return the existing state without mutation when the event already has `settledAt`; reject unknown event IDs. Reset `dailyHearts` when `heartDay` differs from the event's Asia/Seoul calendar day, apply the stored grant, derive level as `Math.floor(totalXp / 100) + 1`, and mark the event settled. A failure after `record` therefore leaves a recoverable item returned by `listUnsettled()`.

- [ ] **Step 4: Run repository tests and the existing storage suite**

Run: `npm test -- --run src/features/pet/petRepository.test.ts src/core/storage/repositories.test.ts`
Expected: all tests PASS and existing tables remain readable.

- [ ] **Step 5: Commit**

```bash
git add src/core/storage/database.ts src/features/pet/petRepository.ts src/features/pet/petRepository.test.ts
git commit -m "feat: persist idempotent pet rewards"
```

### Task 3: Establish the B2 visual system and pet components

**Files:**
- Modify: `src/core/theme/tokens.css`
- Modify: `src/core/theme/global.css`
- Create: `src/features/pet/PetAvatar.tsx`
- Create: `src/features/pet/PetHero.tsx`
- Create: `src/features/pet/RewardBurst.tsx`
- Create: `src/features/pet/pet.css`
- Test: `src/features/pet/PetHero.test.tsx`
- Test: `src/features/pet/RewardBurst.test.tsx`

**Interfaces:**
- Consumes: `PetGameState` and `RewardGrant` from Task 1.
- Produces: `PetHero({ state })`, `PetAvatar({ level, mood, reducedMotion? })`, and `RewardBurst({ grant, onDismiss })`.

- [ ] **Step 1: Write failing accessible-component tests**

```tsx
it('shows pet progress without making the illustration the only label', () => {
  render(<PetHero state={{ ...initialPetGameState, petName: '몽글이', level: 2, xp: 130, dailyHearts: 3 }} />)
  expect(screen.getByRole('img', { name: '기분 좋은 몽글이' })).toBeVisible()
  expect(screen.getByText('레벨 2')).toBeVisible()
  expect(screen.getByRole('progressbar', { name: '몽글이 성장 진행률' })).toHaveAttribute('aria-valuenow', '30')
})

it('lets the user dismiss reward feedback immediately', async () => {
  const onDismiss = vi.fn()
  render(<RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={onDismiss} />)
  await userEvent.click(screen.getByRole('button', { name: '보상 화면 닫기' }))
  expect(onDismiss).toHaveBeenCalledOnce()
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- --run src/features/pet/PetHero.test.tsx src/features/pet/RewardBurst.test.tsx`
Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the vector pet and B2 tokens**

Create a single SVG-based round chick character with cream body, lilac shadow, pink cheeks, and three mouth/eye variants for `calm`, `happy`, and `celebrating`. Use semantic wrapper labels and mark decorative SVG paths hidden. Define tokens `--pet-lilac`, `--pet-pink`, `--pet-cream`, `--pet-ink`, `--pet-shadow`, and `--reward-gold`. Animate only opacity, transform, and confetti particles; disable them inside `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 4: Run focused tests and build**

Run: `npm test -- --run src/features/pet/PetHero.test.tsx src/features/pet/RewardBurst.test.tsx && npm run build`
Expected: tests PASS and TypeScript/Vite build exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/core/theme/tokens.css src/core/theme/global.css src/features/pet
git commit -m "style: add playful pet quest visual system"
```

### Task 4: Turn Today into the pet quest home

**Files:**
- Create: `src/features/today/FeaturedQuest.tsx`
- Create: `src/features/today/QuestList.tsx`
- Modify: `src/features/today/InlineQuickAdd.tsx`
- Modify: `src/features/today/TodayScreen.tsx`
- Modify: `src/features/today/TodayScreen.test.tsx`

**Interfaces:**
- Consumes: `PetHero`, `RewardBurst`, `calculateReward`, `createPetRepository`, existing `recommendForEnergy`, and existing `Task`.
- Produces: `FeaturedQuest({ task, reward, onStart })` and `QuestList({ tasks, onStart, onComplete })`.

- [ ] **Step 1: Replace the cockpit expectation with a failing end-to-end home test**

```tsx
it('moves from recommended quest to one-time pet reward', async () => {
  const deps = dependencies()
  deps.loadPetState = vi.fn().mockResolvedValue({ ...initialPetGameState })
  deps.recordReward = vi.fn().mockResolvedValue(undefined)
  deps.settleReward = vi.fn().mockResolvedValue({ ...initialPetGameState, xp: 10, coins: 5 })
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 한 통 답장하기')])
  render(<TodayScreen dependencies={deps} />)
  expect(await screen.findByRole('heading', { name: '메일 한 통 답장하기' })).toBeVisible()
  expect(screen.getByRole('button', { name: '3분만 시작' })).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: '메일 한 통 답장하기 완료' }))
  expect(await screen.findByRole('dialog', { name: '퀘스트 완료 보상' })).toHaveTextContent('경험치 +10')
  expect(deps.settleReward).toHaveBeenCalledOnce()
})
```

Add a second test that rerenders with the same completion ID and asserts the visible totals do not increase.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- --run src/features/today/TodayScreen.test.tsx`
Expected: FAIL because the pet hero, featured quest, reward dependency, and dialog are absent.

- [ ] **Step 3: Implement the home composition and orchestration**

Extend `TodayDependencies` with `loadPetState(): Promise<PetGameState>`, `recordReward(event: RewardEvent): Promise<void>`, and `settleReward(eventId: string): Promise<PetGameState>`. Default dependencies delegate to `createPetRepository(database)`. On completion, persist the completed task first, create event ID `${task.id}@${completedAt}`, calculate the grant, record the pending event, then settle by ID, update visible pet state, and show `RewardBurst`. If settlement rejects after recording, retain the completed task and show a non-blocking `보상은 다음 실행에서 다시 받을 수 있어요` status. On mount, call `listUnsettled()` through a `recoverRewards(): Promise<PetGameState>` dependency before showing current totals.

Render in this order: compact date/status, `PetHero`, `FeaturedQuest`, one-line `InlineQuickAdd`, `QuestList`, optional reward dialog, collapsed planning tools. Replace the five permanent input rows with one input plus five rotating example suggestions so the pet and recommended quest remain above the fold.

- [ ] **Step 4: Run Today and related mission tests**

Run: `npm test -- --run src/features/today/TodayScreen.test.tsx src/features/missions/CurrentMissionCard.test.tsx src/features/focus/FocusScreen.test.tsx`
Expected: all tests PASS with no unhandled promise rejections.

- [ ] **Step 5: Commit**

```bash
git add src/features/today src/features/pet/RewardBurst.tsx
git commit -m "feat: make Today a pet quest home"
```

### Task 5: Add the pet room and safe customization

**Files:**
- Create: `src/features/pet/roomCatalog.ts`
- Create: `src/features/pet/PetRoom.tsx`
- Create: `src/features/pet/PetScreen.tsx`
- Test: `src/features/pet/PetScreen.test.tsx`
- Modify: `src/features/pet/petRepository.ts`
- Modify: `src/features/pet/petRepository.test.ts`

**Interfaces:**
- Consumes: pet repository from Task 2 and `PetAvatar` from Task 3.
- Produces: `ROOM_ITEMS`, `PetRoom({ equippedItemIds })`, and route component `PetScreen`.

- [ ] **Step 1: Write failing feeding and equipment tests**

```tsx
it('feeds the pet only when food is available', async () => {
  render(<PetScreen dependencies={petDependencies({ ...initialPetGameState, food: 1 })} />)
  await userEvent.click(await screen.findByRole('button', { name: '몽글이에게 먹이 주기' }))
  expect(screen.getByText('친밀도 1')).toBeVisible()
  expect(screen.getByText('먹이 0개')).toBeVisible()
})

it('shows premium room items as non-purchasable previews', async () => {
  render(<PetScreen dependencies={petDependencies(initialPetGameState)} />)
  expect(await screen.findByRole('button', { name: '별빛 침대 출시 준비 중' })).toBeDisabled()
})
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- --run src/features/pet/PetScreen.test.tsx src/features/pet/petRepository.test.ts`
Expected: FAIL because the room screen and catalog are absent.

- [ ] **Step 3: Implement the basic room loop**

Define three free room items with `price: 0 | 20 | 40` and two premium preview items with `premium: true`. `equipItem` must reject unknown IDs, insufficient coins, and premium IDs; buying a free-tier item adds its ID to `ownedItemIds`, deducts coins once, and subsequent equipping is free. `feedPet` consumes one food and adds one affinity only when food is positive. Present errors inline without clearing state.

- [ ] **Step 4: Run pet tests**

Run: `npm test -- --run src/features/pet/PetScreen.test.tsx src/features/pet/petRepository.test.ts`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/pet
git commit -m "feat: add pet growth and room customization"
```

### Task 6: Connect focus completion to the reward ledger

**Files:**
- Modify: `src/features/focus/FocusScreen.tsx`
- Modify: `src/features/focus/FocusScreen.test.tsx`
- Modify: `src/features/today/TodayScreen.tsx`
- Modify: `src/features/today/TodayScreen.test.tsx`

**Interfaces:**
- Consumes: `settleReward` orchestration from Task 4.
- Produces: optional `onComplete(result: { elapsedMinutes: number }): void` contract from `FocusScreen`.

- [ ] **Step 1: Write a failing focus-result test**

```tsx
it('reports elapsed focus minutes when the session completes', async () => {
  vi.useFakeTimers()
  const onComplete = vi.fn()
  render(<FocusScreen title="메일 답장" minutes={3} autoStart onComplete={onComplete} />)
  await vi.advanceTimersByTimeAsync(180_000)
  expect(onComplete).toHaveBeenCalledWith({ elapsedMinutes: 3 })
  vi.useRealTimers()
})
```

Add a Today test asserting a three-minute completion settles `{ xp: 15, coins: 7 }` and dismissing the reward returns to the quest home.

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- --run src/features/focus/FocusScreen.test.tsx src/features/today/TodayScreen.test.tsx`
Expected: FAIL because `onComplete` has no result payload.

- [ ] **Step 3: Implement elapsed-minute reporting and settlement**

Calculate elapsed minutes from the timer's configured total and remaining seconds, round down with a minimum of the completed session length, and pass the result exactly once. Today completes the associated task and creates the reward event using that focus duration.

- [ ] **Step 4: Run focus and Today tests**

Run: `npm test -- --run src/features/focus/FocusScreen.test.tsx src/features/today/TodayScreen.test.tsx`
Expected: all tests PASS and callback fires once.

- [ ] **Step 5: Commit**

```bash
git add src/features/focus src/features/today
git commit -m "feat: reward completed focus quests"
```

### Task 7: Ship the four-tab navigation and premium preview

**Files:**
- Create: `src/features/premium/PremiumPreview.tsx`
- Test: `src/features/premium/PremiumPreview.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/app/BottomNav.tsx`
- Modify: `src/app/AppShell.test.tsx`
- Modify: `src/features/settings/SettingsScreen.tsx`
- Modify: `src/features/settings/SettingsScreen.test.tsx`

**Interfaces:**
- Consumes: `PetScreen` from Task 5.
- Produces routes `/`, `/pet`, `/focus`, `/me` and `PremiumPreview({ features })`.

- [ ] **Step 1: Write failing route and premium-honesty tests**

```tsx
it('shows Today, Pet, Focus, and Me as the four primary tabs', () => {
  renderAppAt('/')
  expect(within(screen.getByRole('navigation', { name: '주요 메뉴' })).getAllByRole('link').map(link => link.textContent)).toEqual(['오늘', '펫', '집중', '나'])
})

it('labels locked features without presenting a working purchase', () => {
  render(<PremiumPreview features={['새로운 펫', '별빛 방']} />)
  expect(screen.getByText('출시 준비 중')).toBeVisible()
  expect(screen.queryByRole('button', { name: /구매|구독|결제/ })).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- --run src/app/AppShell.test.tsx src/features/premium/PremiumPreview.test.tsx src/features/settings/SettingsScreen.test.tsx`
Expected: FAIL because the second tab is still Plan and no premium preview exists.

- [ ] **Step 3: Implement navigation and settings preview**

Route `/pet` to `PetScreen`, change the second tab icon to a paw and label to `펫`, keep legacy `/plan`, `/routines`, `/settings`, and `/messages` routes reachable by direct URL, and add the premium preview under a `몽글 플러스` settings group. Do not render a price or enabled purchase button.

- [ ] **Step 4: Run app-shell and settings tests**

Run: `npm test -- --run src/app/App.test.tsx src/app/AppShell.test.tsx src/features/premium/PremiumPreview.test.tsx src/features/settings/SettingsScreen.test.tsx`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app src/features/premium src/features/settings
git commit -m "feat: add pet navigation and premium preview"
```

### Task 8: Verify accessibility, responsive layout, recovery, and release build

**Files:**
- Modify: `src/core/theme/global.css`
- Modify: `src/features/pet/pet.css`
- Modify: `src/features/today/TodayScreen.test.tsx`
- Create: `e2e/pet-quest.spec.ts`

**Interfaces:**
- Consumes: the complete pet quest flow from Tasks 1–7.
- Produces: a verified Pixel 7-sized PWA flow and a clean production build.

- [ ] **Step 1: Write the failing recovery and browser-flow tests**

Add a Today component test where `settleReward` rejects once; assert the completed task remains completed and the status `보상은 다음 실행에서 다시 받을 수 있어요` appears. Add Playwright flow:

```ts
test('adds, focuses, completes, and rewards a quest on Pixel 7', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 915 })
  await page.goto('/')
  await page.getByRole('textbox', { name: '빠른 할 일 추가' }).fill('컵 치우기')
  await page.getByRole('button', { name: '할 일 추가' }).click()
  await expect(page.getByRole('heading', { name: '컵 치우기' })).toBeVisible()
  await page.getByRole('button', { name: '컵 치우기 완료' }).click()
  await expect(page.getByRole('dialog', { name: '퀘스트 완료 보상' })).toBeVisible()
})
```

- [ ] **Step 2: Run the new tests and verify RED**

Run: `npm test -- --run src/features/today/TodayScreen.test.tsx && npm run e2e -- e2e/pet-quest.spec.ts`
Expected: at least the recovery or responsive flow fails until final integration and selectors are complete.

- [ ] **Step 3: Finish responsive and recovery behavior**

Ensure the pet hero, featured quest, add field, and first quest fit within the initial 915px viewport without horizontal overflow. Keep fixed navigation clear of content with safe-area padding. At widths below 360px, stack featured-quest metadata but keep the primary button full width. Add `aria-live="polite"` to reward and recovery status. Apply reduced motion by removing pet bounce, reward scaling, and confetti transitions.

- [ ] **Step 4: Run complete verification**

Run:

```bash
npm test -- --run
npm run build
npm run e2e -- e2e/pet-quest.spec.ts
git diff --check
```

Expected: 0 failed unit/component tests, production build exit 0, pet-quest Playwright test PASS at 412×915, and no whitespace errors.

- [ ] **Step 5: Manually inspect the release story**

Open `/`, `/pet`, `/focus`, and `/me` at 412×915. Verify: no clipped content; `3분 시작` is visually dominant; completion feedback is dismissible; the pet never appears sick after missed activity; premium previews say `출시 준비 중`; no purchase button is enabled.

- [ ] **Step 6: Commit**

```bash
git add src/core/theme/global.css src/features/pet/pet.css src/features/today/TodayScreen.test.tsx e2e/pet-quest.spec.ts
git commit -m "test: verify pet quest release flow"
```
