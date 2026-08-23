# Monggle Studio 3D Mascot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Monggle to the approved purple Studio 3D visual system and add a persistent, responsive 3D mascot without disturbing core ADHD workflows.

**Architecture:** Extend the existing CSS-token design system, then mount one presentation-only `MonggleCompanion` inside `AppShell` so route changes do not recreate it. A small event bus carries short-lived reactions from feature screens; persisted settings and reduced-motion media queries determine whether it wanders, rests, or stays hidden.

**Tech Stack:** React 19, TypeScript, CSS transforms/animations, localStorage settings repository, Vitest, Testing Library, Vite PWA, Playwright

**Spec:** `docs/superpowers/specs/2026-08-20-monggle-studio-3d-mascot-design.md`

## Global Constraints

- Preserve the current five tabs, route order, information architecture, and feature behavior.
- Use pearl white, lavender, muted violet, and limited silver; avoid primary-color game styling, scores, and levels.
- Use the approved `web/public/assets/mascot/monggle-3d-approved-v1.png` without mirroring or changing its aspect ratio.
- Do not add WebGL, a real-time 3D engine, voice, costumes, purchases, or external AI/API dependencies.
- Animate only `transform` and `opacity`; keep one mascot instance and one concurrent mascot animation.
- The mascot must never intercept pointer or keyboard input or cover primary controls.
- `prefers-reduced-motion` or persisted `reducedMotion` must stop all wandering and breathing.

---

### Task 1: Studio 3D Design Tokens and Surfaces

**Files:**
- Modify: `web/src/core/theme/tokens.css`
- Modify: `web/src/core/theme/global.css`
- Create: `web/src/core/theme/studioTheme.test.ts`

**Interfaces:**
- Consumes: existing `[data-theme='dark']` theme selector and current semantic color tokens
- Produces: `--color-glass`, `--color-glass-line`, `--shadow-card-3d`, `--shadow-control-3d`, `--glow-lavender`, and reusable `.glass-card`, `.studio-surface` classes

- [ ] **Step 1: Write the failing token contract test**

```ts
import { expect, it } from 'vitest'
import tokens from './tokens.css?raw'
import globalStyles from './global.css?raw'

it('defines the approved Studio 3D surface contract', () => {
  for (const token of ['--color-glass', '--color-glass-line', '--shadow-card-3d', '--shadow-control-3d', '--glow-lavender']) {
    expect(tokens).toContain(token)
  }
  expect(globalStyles).toContain('.studio-surface')
  expect(globalStyles).toContain('.glass-card')
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `cd web && npm run test:run -- src/core/theme/studioTheme.test.ts`

Expected: FAIL because the new tokens and shared surface classes do not exist.

- [ ] **Step 3: Add light and dark Studio 3D tokens**

Add this semantic contract to `:root` and tuned dark equivalents to `[data-theme='dark']`:

```css
--color-glass: rgb(255 255 255 / 72%);
--color-glass-line: rgb(255 255 255 / 88%);
--shadow-card-3d: 0 24px 55px rgb(58 42 92 / 15%), inset 0 1px 0 rgb(255 255 255 / 88%);
--shadow-control-3d: 0 10px 24px rgb(92 70 155 / 20%), inset 0 1px 0 rgb(255 255 255 / 45%);
--glow-lavender: radial-gradient(circle, rgb(191 172 255 / 42%), transparent 68%);
```

- [ ] **Step 4: Restyle existing surfaces without changing layout**

Apply `.studio-surface` to the app backdrop and `.glass-card` rules to existing card selectors. Keep current spacing, DOM order, breakpoints, and tap target sizes. Use two shadow layers maximum and disable backdrop blur under `@supports not (backdrop-filter: blur(1px))` by retaining an opaque surface color.

- [ ] **Step 5: Run theme and full component tests**

Run: `cd web && npm run test:run -- src/core/theme/studioTheme.test.ts src/app src/features`

Expected: PASS; existing content and tab-order assertions remain unchanged.

- [ ] **Step 6: Commit the visual foundation**

```bash
git add -- web/src/core/theme/tokens.css web/src/core/theme/global.css web/src/core/theme/studioTheme.test.ts
git commit -m "feat: add Studio 3D visual system"
```

### Task 2: Persistent Mascot Preferences

**Files:**
- Modify: `web/src/core/model/settings.ts`
- Modify: `web/src/features/settings/settingsRepository.ts`
- Modify: `web/src/features/settings/settingsRepository.test.ts`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Create: `web/src/features/settings/SettingsScreen.test.tsx`

**Interfaces:**
- Consumes: `settingsRepository.load()` and `settingsRepository.save(settings)`
- Produces: `MonggleSettings.mascotVisible: boolean`, persisted default `true`, and a checkbox labeled `몽글 캐릭터 표시`

- [ ] **Step 1: Add failing migration and screen tests**

```ts
it('migrates old settings with the mascot visible by default', () => {
  localStorage.setItem('monggle.settings.v1', JSON.stringify({ profile: 'worker', theme: 'light' }))
  expect(settingsRepository.load().mascotVisible).toBe(true)
})

it('persists the mascot visibility preference', async () => {
  render(<SettingsScreen />)
  await userEvent.click(screen.getByRole('checkbox', { name: '몽글 캐릭터 표시' }))
  expect(settingsRepository.load().mascotVisible).toBe(false)
})
```

- [ ] **Step 2: Run settings tests and verify RED**

Run: `cd web && npm run test:run -- src/features/settings`

Expected: FAIL because `mascotVisible` and the checkbox are absent.

- [ ] **Step 3: Extend the model and backward-compatible defaults**

Add `mascotVisible: boolean` to `MonggleSettings`, set it to `true` in `defaultSettings`, and preserve the existing `{ ...defaultSettings, ...saved }` migration behavior.

- [ ] **Step 4: Add the setting control**

Add this control beside reduced motion without changing route structure:

```tsx
<label className="check-row">
  <input type="checkbox" checked={settings.mascotVisible}
    onChange={(event) => update({ mascotVisible: event.target.checked })} />
  몽글 캐릭터 표시
</label>
```

- [ ] **Step 5: Run tests and commit**

Run: `cd web && npm run test:run -- src/features/settings`

Expected: PASS.

```bash
git add -- web/src/core/model/settings.ts web/src/features/settings
git commit -m "feat: persist mascot preferences"
```

### Task 3: Persistent Companion State and Safe-Point Motion

**Files:**
- Create: `web/src/features/companion/companionState.ts`
- Create: `web/src/features/companion/companionState.test.ts`
- Create: `web/src/features/companion/MonggleCompanion.tsx`
- Create: `web/src/features/companion/MonggleCompanion.test.tsx`
- Create: `web/src/features/companion/companion.css`
- Modify: `web/src/app/AppShell.tsx`

**Interfaces:**
- Produces: `CompanionMode = 'resting' | 'wandering' | 'reacting' | 'hidden'`
- Produces: `nextSafePoint(current: SafePoint): SafePoint`, where `SafePoint = 'top-right' | 'middle-left' | 'bottom-right'`
- Produces: `<MonggleCompanion reducedMotion mascotVisible event />`
- Consumes: `/assets/mascot/monggle-3d-approved-v1.png`, persisted settings, current route, and optional reaction event

- [ ] **Step 1: Write failing deterministic-state tests**

```ts
it.each([
  ['top-right', 'middle-left'],
  ['middle-left', 'bottom-right'],
  ['bottom-right', 'top-right'],
] as const)('moves from %s to %s', (current, expected) => {
  expect(nextSafePoint(current)).toBe(expected)
})

it('rests instead of wandering when motion is reduced', () => {
  render(<MonggleCompanion reducedMotion mascotVisible event={null} />)
  expect(screen.getByTestId('monggle-companion')).toHaveAttribute('data-mode', 'resting')
})

it('is absent when the user hides it', () => {
  render(<MonggleCompanion reducedMotion={false} mascotVisible={false} event={null} />)
  expect(screen.queryByTestId('monggle-companion')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run companion tests and verify RED**

Run: `cd web && npm run test:run -- src/features/companion`

Expected: FAIL because the companion modules do not exist.

- [ ] **Step 3: Implement deterministic state helpers**

Use a constant safe-point sequence and return the next entry modulo its length. Do not generate screen coordinates or use randomness. Derive mode with priority `hidden`, `reacting`, `resting`, `wandering`.

- [ ] **Step 4: Implement the presentation-only component**

Render one wrapper with `aria-hidden="true"`, `inert`, `pointer-events: none`, an empty-alt image, `data-mode`, and `data-point`. Advance safe points every 23 seconds only in `wandering`; clear the interval during mode changes and unmount.

- [ ] **Step 5: Add safe movement CSS**

Use fixed positioning inside the app viewport, width `clamp(72px, 13vw, 128px)`, z-index below the bottom navigation, and transforms for the three safe points. Add:

```css
@media (prefers-reduced-motion: reduce) {
  .monggle-companion { animation: none !important; transition: none !important; }
}
```

Ensure `.monggle-companion` has `pointer-events: none` and never animates shadow properties.

- [ ] **Step 6: Mount exactly once in AppShell**

Read settings at the shell boundary and render `MonggleCompanion` as a sibling of `<main>`, not inside individual routes. Keep `BottomNav` after main content so its stacking order stays above the mascot.

- [ ] **Step 7: Run companion, shell, and build verification**

Run: `cd web && npm run test:run -- src/features/companion src/app && npm run build`

Expected: PASS; the PWA build includes the mascot asset.

- [ ] **Step 8: Commit the persistent companion**

```bash
git add -- web/src/features/companion web/src/app/AppShell.tsx
git commit -m "feat: add persistent Monggle companion"
```

### Task 4: Feature Reaction Events

**Files:**
- Create: `web/src/features/companion/companionEvents.ts`
- Create: `web/src/features/companion/companionEvents.test.ts`
- Modify: `web/src/app/AppShell.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/features/focus/FocusScreen.tsx`
- Modify: `web/src/features/messages/MessagesScreen.tsx`
- Modify: `web/src/features/routines/RoutinesScreen.tsx`

**Interfaces:**
- Produces: `CompanionEventType = 'focus_started' | 'task_completed' | 'message_scheduled' | 'routine_completed'`
- Produces: `emitCompanionEvent(type)` and `subscribeCompanionEvents(listener): () => void`
- Consumes: shell-level `<MonggleCompanion event={event} />`

- [ ] **Step 1: Write a failing subscribe/unsubscribe test**

```ts
it('delivers events until unsubscribed', () => {
  const listener = vi.fn()
  const unsubscribe = subscribeCompanionEvents(listener)
  emitCompanionEvent('focus_started')
  unsubscribe()
  emitCompanionEvent('message_scheduled')
  expect(listener).toHaveBeenCalledTimes(1)
  expect(listener).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus_started' }))
})
```

- [ ] **Step 2: Run the event test and verify RED**

Run: `cd web && npm run test:run -- src/features/companion/companionEvents.test.ts`

Expected: FAIL because the event module does not exist.

- [ ] **Step 3: Implement a typed browser-local event bus**

Use one `EventTarget`, `CustomEvent<{ type: CompanionEventType; id: string }>`, and a returned cleanup function. Create event IDs with `crypto.randomUUID()` and never persist reaction events.

- [ ] **Step 4: Subscribe at AppShell and expire reactions**

Set the latest event on receipt, pass it into `MonggleCompanion`, and clear it after 1,800ms. Clear timeout and listener on unmount.

- [ ] **Step 5: Emit only after successful user actions**

Emit after focus changes from stopped to running, a task is marked complete, a valid message schedule is saved, and the final routine step completes. Do not emit on validation failure, pause, skip, or canceled actions.

- [ ] **Step 6: Add and run component assertions**

Spy on `emitCompanionEvent` in existing feature tests and assert the exact event type after each successful action. Run:

`cd web && npm run test:run -- src/features/companion src/features/today src/features/focus src/features/messages src/features/routines`

Expected: PASS.

- [ ] **Step 7: Commit reaction wiring**

```bash
git add -- web/src/features/companion web/src/app/AppShell.tsx web/src/features/today web/src/features/focus web/src/features/messages web/src/features/routines
git commit -m "feat: react to completed focus actions"
```

### Task 5: Mobile, Accessibility, and PWA Verification

**Files:**
- Create: `web/e2e/studio-3d-mascot.spec.ts`
- Modify: `web/playwright.config.ts`
- Create: `docs/testing/monggle-pwa-foundation.md`
- Create: `README.md`

**Interfaces:**
- Consumes: completed Studio 3D UI, companion settings, safe-point motion, five routes, PWA build
- Produces: repeatable Chromium mobile verification and documented commands

- [ ] **Step 1: Write the mobile collision and motion tests**

```ts
test('mascot never covers the primary action or bottom navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const mascot = await page.getByTestId('monggle-companion').boundingBox()
  const nav = await page.getByRole('navigation', { name: '주요 메뉴' }).boundingBox()
  expect(mascot && nav && mascot.y + mascot.height <= nav.y).toBeTruthy()
})

test('reduced motion leaves the mascot resting', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByTestId('monggle-companion')).toHaveAttribute('data-mode', 'resting')
})
```

- [ ] **Step 2: Run E2E and verify any uncovered issue fails**

Run: `cd web && npm run build && npm run e2e -- studio-3d-mascot.spec.ts`

Expected: tests execute against the configured Vite preview server; any overlap or incorrect reduced-motion state fails with a specific assertion.

- [ ] **Step 3: Fix only verified layout or configuration defects**

Adjust safe-point inset values in `companion.css` or the Playwright `webServer` command until both 390×844 and 320×568 viewports pass. Do not change tab order, card order, or content copy.

- [ ] **Step 4: Run the complete verification suite**

Run:

```bash
cd web
npm run test:run
npm run build
npm run e2e
```

Expected: all unit/component tests pass, TypeScript and PWA build pass, all E2E journeys pass, and `dist/` contains the approved mascot asset.

- [ ] **Step 5: Document behavior and recovery commands**

Document the mascot toggle, reduced-motion behavior, local-only data constraint, `npm run dev`, `npm run test:run`, `npm run build`, and `npm run e2e`. Record that automatic KakaoTalk sending remains unsupported and unrelated to the visual redesign.

- [ ] **Step 6: Commit final verification**

```bash
git add -- web/e2e/studio-3d-mascot.spec.ts web/playwright.config.ts docs/testing/monggle-pwa-foundation.md README.md
git commit -m "test: verify Studio 3D mascot experience"
```
