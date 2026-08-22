# Calm Mission OS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Monggle's primary mobile experience around one current action, a professional four-tab shell, grouped settings, and a restrained accessible visual system without changing stored data or domain behavior.

**Architecture:** Keep repositories and domain components intact. Refactor presentation at the app shell, Today composition, settings composition, and CSS-token layers; new UI components receive domain data and callbacks rather than accessing storage directly.

**Tech Stack:** React 19, TypeScript 5.9, React Router 7, Vitest, Testing Library, Vite, Playwright, Capacitor

**Spec:** `docs/superpowers/specs/2026-08-22-calm-mission-os-redesign-design.md`

## Global Constraints

- Preserve all existing repository schemas, task calculations, messages, routines, focus-session behavior, and existing URLs.
- Use exactly four primary navigation tabs: `오늘`, `계획`, `집중`, `나`.
- Keep touch targets at least 48px and the primary action at least 52px high.
- Respect `prefers-reduced-motion` and prevent fixed UI from covering content at 360px and wider.
- Do not introduce a new icon, animation, or CSS-component dependency.
- Write each behavioral test first and observe its expected failure before production edits.

---

### Task 1: Professional App Shell and Four-Tab Navigation

**Files:**
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/app/App.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/app/AppShell.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/app/BottomNav.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/app/AppShell.test.tsx`

**Interfaces:**
- `BottomNav(): JSX.Element` continues to use `NavLink` and exposes four icon-and-label links.
- `AppShell({ children }: { children: ReactNode }): JSX.Element` keeps background, mission nudges, companion and child routes but no longer owns a duplicate profile selector.
- Existing `/messages`, `/routines`, and `/settings` routes remain available; `/plan` and `/me` become the primary navigation destinations.

- [ ] **Step 1: Replace the five-tab assertion with a failing four-tab accessibility test**

```tsx
it('exposes four icon-and-label primary destinations', () => {
  render(<App />)
  const nav = screen.getByRole('navigation', { name: '주요 메뉴' })
  expect(within(nav).getAllByRole('link').map((link) => link.textContent)).toEqual([
    '오늘', '계획', '집중', '나',
  ])
  for (const link of within(nav).getAllByRole('link')) {
    expect(link.querySelector('svg')).not.toBeNull()
  }
})

it('does not render the profile selector in the global header', () => {
  render(<App />)
  expect(screen.queryByLabelText('사용자 유형')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test -- src/app/AppShell.test.tsx --run`

Expected: FAIL because five text-only tabs and the header profile selector still exist.

- [ ] **Step 3: Implement the four destinations and semantic header**

Define tab objects `{ label, href, icon }`; render local inline SVG icons with `aria-hidden="true"`. Route `/plan` to `RoutinesScreen`, `/me` to `SettingsScreen`, and retain legacy routes. Replace the header select with the Monggle wordmark plus a Korean date generated for `Asia/Seoul`.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- src/app/AppShell.test.tsx --run`

Expected: all AppShell tests pass.

- [ ] **Step 5: Commit the shell change**

```powershell
git add -- OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/app
git commit -m "feat: simplify Monggle app navigation"
```

---

### Task 2: Current-Action-First Today Screen

**Files:**
- Create: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/today/TodayHeader.tsx`
- Create: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/today/UpcomingPreview.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/today/NowCard.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/missions/CurrentMissionCard.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/today/TodayScreen.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/today/TodayScreen.test.tsx`

**Interfaces:**
- `TodayHeader({ date, energy, onEnergyChange })` renders greeting/date and a compact three-state segmented control.
- `UpcomingPreview({ tasks, limit = 2 })` renders at most two scheduled open tasks, sorted by `dueAt`.
- Existing mission callbacks and persistence flow remain unchanged.

- [ ] **Step 1: Write failing tests for first-view hierarchy and compact upcoming preview**

```tsx
it('puts the current action before task capture and planning details', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([openTask])
  render(<TodayScreen dependencies={deps} />)
  const current = await screen.findByRole('region', { name: '지금 할 일' })
  const capture = screen.getByRole('button', { name: '할 일 빠르게 적기' })
  expect(current.compareDocumentPosition(capture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

it('shows no more than two upcoming scheduled tasks', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([scheduledOne, scheduledTwo, scheduledThree])
  render(<TodayScreen dependencies={deps} />)
  expect(await screen.findAllByTestId('upcoming-item')).toHaveLength(2)
})
```

- [ ] **Step 2: Run Today tests and verify RED**

Run: `npm test -- src/features/today/TodayScreen.test.tsx --run`

Expected: FAIL because capture precedes the current task and no compact upcoming preview exists.

- [ ] **Step 3: Implement the Today presentation components and disclosure flow**

Move energy into `TodayHeader`; render the current mission/Now card immediately after it; add `UpcomingPreview`; replace the always-open capture form with `할 일 빠르게 적기` that expands `QuickCapture`. Place commitment review, priority list, and timeline in a `details` region titled `오늘 전체 계획`. Preserve draft review and mission recovery behavior.

- [ ] **Step 4: Run Today and mission tests and verify GREEN**

Run: `npm test -- src/features/today/TodayScreen.test.tsx src/features/missions/CurrentMissionCard.test.tsx --run`

Expected: all selected tests pass.

- [ ] **Step 5: Commit the Today hierarchy**

```powershell
git add -- OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/today OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/missions
git commit -m "feat: focus Today on the current action"
```

---

### Task 3: Grouped Settings Experience

**Files:**
- Create: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/settings/SettingsSection.tsx`
- Create: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/settings/SettingsRow.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/settings/SettingsScreen.tsx`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/settings/SettingsScreen.test.tsx`

**Interfaces:**
- `SettingsSection({ title, children })` renders a labelled group.
- `SettingsRow({ title, description, children, onClick })` renders one 56px-or-taller setting row.
- `SettingsScreen` remains repository-backed and keeps all current controls and connector components.

- [ ] **Step 1: Write failing group and progressive-disclosure tests**

```tsx
it('organizes settings into four professional groups', () => {
  render(<SettingsScreen />)
  expect(screen.getAllByRole('group').map((group) => group.getAttribute('aria-label'))).toEqual([
    '프로필', '집중 환경', '화면', '연결',
  ])
})

it('keeps advanced connection editors collapsed initially', () => {
  render(<SettingsScreen />)
  expect(screen.queryByLabelText('카테고리 관리')).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /카테고리 관리/ })).toBeVisible()
})
```

- [ ] **Step 2: Run Settings tests and verify RED**

Run: `npm test -- src/features/settings/SettingsScreen.test.tsx --run`

Expected: FAIL because settings are one grid and connection editors are all expanded.

- [ ] **Step 3: Implement grouped rows and collapsible advanced panels**

Render profile, focus environment, appearance, and connections in explicit `SettingsSection` groups. Keep native inputs accessible inside rows. Open appearance, category manager and calendar details from their rows; retain message status as a connection row. Do not change `settingsRepository` keys.

- [ ] **Step 4: Run Settings, appearance, category and calendar tests and verify GREEN**

Run: `npm test -- src/features/settings/SettingsScreen.test.tsx src/features/settings/CategoryManager.test.tsx src/features/appearance/AppearanceScreen.test.tsx src/features/calendar/CalendarSettings.test.tsx --run`

Expected: all selected tests pass.

- [ ] **Step 5: Commit grouped settings**

```powershell
git add -- OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/settings
git commit -m "feat: organize settings into focused groups"
```

---

### Task 4: Restrained Visual System and Collision-Free Companion

**Files:**
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/core/theme/tokens.css`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/core/theme/global.css`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/core/theme/studioTheme.test.ts`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/companion/companion.css`
- Modify: `OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/companion/MonggleCompanion.test.tsx`

**Interfaces:**
- CSS tokens become the single source for 16px page spacing, 18px card radius, 48px tap target, subtle elevation, and bottom safe-area clearance.
- Companion remains event-driven but occupies a non-overlapping 64–80px presentation zone.

- [ ] **Step 1: Write failing design-token and reduced-motion assertions**

```ts
it('uses restrained mobile product tokens', () => {
  expect(css).toContain('--space-page: 16px')
  expect(css).toContain('--tap-min: 48px')
  expect(css).toContain('--radius-card: 18px')
})

it('provides a reduced-motion rule', () => {
  expect(globalCss).toContain('@media (prefers-reduced-motion: reduce)')
})
```

- [ ] **Step 2: Run theme tests and verify RED**

Run: `npm test -- src/core/theme/studioTheme.test.ts src/features/companion/MonggleCompanion.test.tsx --run`

Expected: FAIL on old 20/44/24 tokens and missing complete reduced-motion/collision rules.

- [ ] **Step 3: Implement the visual token and layout reset**

Reduce lavender to actions and state, replace glass-heavy surfaces with neutral solid surfaces, limit shadows, apply the typography scale from the spec, style the four-tab navigation with safe-area padding, reserve bottom scroll space, make settings rows compact, and position the companion within the content flow or a collision-free reserved area. Add keyboard-visible focus and reduced-motion overrides.

- [ ] **Step 4: Run theme/component tests and verify GREEN**

Run: `npm test -- src/core/theme/studioTheme.test.ts src/features/companion/MonggleCompanion.test.tsx --run`

Expected: all selected tests pass.

- [ ] **Step 5: Commit the visual system**

```powershell
git add -- OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/core/theme OneDrive/Desktop/AI시대/ADHD집중관리앱/web/src/features/companion/companion.css
git commit -m "style: establish calm professional visual system"
```

---

### Task 5: Full Regression and Mobile Visual Verification

**Files:**
- Modify if required by observed regressions: files already listed in Tasks 1–4
- Evidence only: screenshots saved under the system temporary directory, not the repository

**Interfaces:** No new production interfaces.

- [ ] **Step 1: Run the complete unit test suite**

Run: `npm test -- --run`

Expected: zero failing tests.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: TypeScript and Vite finish with exit code 0.

- [ ] **Step 3: Start the dev server and capture mobile states**

Run: `npm run dev -- --host 127.0.0.1`

Capture `/`, `/plan`, `/focus`, and `/me` at 360×800 and Pixel 7. Verify the current action appears without scrolling, all controls remain within the viewport width, the companion does not cover content, and the bottom navigation does not cover the last interactive element.

- [ ] **Step 4: Verify desktop resilience and accessibility basics**

Capture the same routes at 1440×1000. Tab through header, primary action, disclosures, settings controls and bottom navigation; verify visible focus. Emulate reduced motion and verify decorative movement is disabled.

- [ ] **Step 5: Correct any observed regression using a new failing test first**

For each behavioral defect, add the narrowest Testing Library test, observe RED, apply the minimal fix, and rerun the focused test before repeating Steps 1–4.

- [ ] **Step 6: Record final repository state**

Run: `git status --short && git log -5 --oneline`

Expected: only intentional tracked changes; all redesign commits visible.
