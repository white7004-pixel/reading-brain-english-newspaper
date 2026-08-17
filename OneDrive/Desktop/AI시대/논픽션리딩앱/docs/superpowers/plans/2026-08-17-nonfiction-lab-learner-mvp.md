# Nonfiction Lab Learner MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished mobile-first PWA where a learner can set an AR starting level, receive a personalized three-minute nonfiction article, read with vocabulary help, complete a quiz, and retain progress locally.

**Architecture:** Create a new Next.js App Router application in this folder while keeping the existing Design Component prototype as a visual reference only. Domain logic lives in framework-independent TypeScript modules, UI is split by learner journey, and the first release uses seeded reviewed content plus versioned `localStorage`; future backend services can replace repositories without rewriting screens.

**Tech Stack:** Next.js 16.3.1, React 19.2.8, TypeScript 7.0.2, Tailwind CSS 4.3.3, Vitest 4.1.10, Testing Library 16.3.2, Playwright 1.62.1

## Global Constraints

- Product name is `논픽션랩` and English name is `Nonfiction Lab`.
- Primary slogan is `매일 3분, 영어로 세상을 읽다`.
- Mobile web/PWA is the initial platform; the core viewport is 390–430 px wide.
- Visual system uses deep forest green, bright lime, warm off-white, rounded cards, and restrained gamification.
- Every interactive target is at least 44×44 CSS pixels.
- A learner may enter an existing AR value, take a short estimate, or start at the easiest level.
- User-entered AR and app-estimated recommendation are stored separately.
- The app must call non-official values `논픽션랩 추정 난이도`, never official AR certification.
- Interest-driven recommendations target 70%; knowledge-expansion recommendations target 30%.
- Published learning content must include sources, review metadata, interest age, reading difficulty, and version.
- AI draft or unreviewed content must never appear in the learner app.
- Child profiles have no advertising, public profile, or messaging.
- Current article reading remains usable offline after it has been cached.
- Existing files `지식리딩 앱.dc.html`, `ios-frame.jsx`, `support.js`, and `README.md` remain reference artifacts and are not runtime dependencies.

---

## File Structure

```text
app/
  globals.css                 # tokens, typography, reset, reusable utilities
  layout.tsx                  # metadata, viewport, font and service worker registration
  page.tsx                    # route entry; renders learner application
  manifest.ts                 # installable PWA manifest
components/
  app-shell.tsx               # persistent header, main viewport and bottom navigation
  onboarding.tsx              # AR entry, estimate and easiest-start choices
  home-screen.tsx             # daily lesson and knowledge-domain discovery
  explore-screen.tsx          # searchable/filterable reviewed-content library
  reader-screen.tsx           # paged article, audio control and vocabulary popover
  quiz-screen.tsx             # one-question-at-a-time comprehension quiz
  completion-screen.tsx       # score, XP, streak and connected-topic action
  profile-screen.tsx          # AR values, interests and progress summary
  ui/button.tsx               # shared 44 px minimum button
  ui/chip.tsx                 # category and metric chip
  ui/progress-bar.tsx         # accessible determinate progress
lib/
  content.ts                  # seeded, reviewed sample content repository
  learner-store.ts            # versioned local persistence and hydration
  recommendation.ts           # deterministic level and content ranking rules
  types.ts                    # shared domain types and state union
  sample-content.ts           # complete reviewed seed articles
public/
  icons/icon-192.svg          # PWA icon
  icons/icon-512.svg          # PWA icon
  sw.js                       # minimal app-shell/current-article cache policy
tests/
  setup.ts                    # DOM and matcher setup
  content.test.ts             # review-state and metadata invariants
  learner-store.test.ts       # persistence and migration behavior
  recommendation.test.ts      # 70/30 pool and gradual level adjustment
  onboarding.test.tsx         # three onboarding paths
  learning-flow.test.tsx      # reader-to-completion integration
  explore.test.tsx            # category and difficulty filtering
e2e/learner-journey.spec.ts   # mobile browser happy path and reload retention
package.json
postcss.config.mjs
tsconfig.json
vitest.config.ts
playwright.config.ts
next.config.ts
```

---

### Task 1: Application Shell and Design Tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `tests/setup.ts`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `components/app-shell.tsx`, `components/ui/button.tsx`, `components/ui/chip.tsx`, `components/ui/progress-bar.tsx`
- Test: `tests/app-shell.test.tsx`

**Interfaces:**
- Produces: `Button`, `Chip`, `ProgressBar`, and `AppShell` React components used by every later screen.
- Produces: CSS tokens `--forest-950`, `--forest-800`, `--lime-300`, `--paper`, `--sage-100`, `--ink`, `--muted`.

- [ ] **Step 1: Add the failing shell accessibility test**

```tsx
import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/app-shell";

it("exposes four primary destinations with 44px targets", () => {
  render(<AppShell active="home" onNavigate={() => {}}><p>content</p></AppShell>);
  expect(screen.getAllByRole("button", { name: /홈|탐험|학습|나/ })).toHaveLength(4);
  expect(screen.getByRole("main")).toHaveTextContent("content");
});
```

- [ ] **Step 2: Run the test and confirm the missing-module failure**

Run: `npm install && npm test -- tests/app-shell.test.tsx`

Expected: FAIL because `@/components/app-shell` does not exist.

- [ ] **Step 3: Scaffold Next.js, Vitest, Tailwind, tokens, and shared UI**

Use scripts `dev`, `build`, `lint`, `test`, `test:watch`, and `test:e2e`. Implement `Button` with `min-h-11`, `ProgressBar` with `role="progressbar"` plus `aria-valuenow`, and `AppShell` with a fixed four-item mobile bottom bar. Make `app/page.tsx` render the shell with a temporary `논픽션랩` heading.

- [ ] **Step 4: Verify shell tests and production build**

Run: `npm test -- tests/app-shell.test.tsx && npm run build`

Expected: test PASS and Next.js production build completes.

- [ ] **Step 5: Commit the shell**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts app components/ui components/app-shell.tsx tests/setup.ts tests/app-shell.test.tsx
git commit -m "feat: scaffold Nonfiction Lab learner shell"
```

### Task 2: Domain Model and Reviewed Seed Content

**Files:**
- Create: `lib/types.ts`, `lib/sample-content.ts`, `lib/content.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: `KnowledgeDomain`, `Difficulty`, `InterestBand`, `SourceRef`, `ReviewRecord`, `Article`, `QuizQuestion`.
- Produces: `getPublishedArticles(): Article[]` and `getArticleById(id: string): Article | undefined`.

- [ ] **Step 1: Write metadata invariant tests**

```ts
import { getPublishedArticles } from "@/lib/content";

it("returns only reviewed and published articles", () => {
  const articles = getPublishedArticles();
  expect(articles.length).toBeGreaterThanOrEqual(6);
  for (const article of articles) {
    expect(article.status).toBe("published");
    expect(article.review.approvedBy.length).toBeGreaterThan(0);
    expect(article.sources.length).toBeGreaterThan(0);
    expect(article.estimatedMinutes).toBe(3);
  }
});
```

- [ ] **Step 2: Confirm the content module is missing**

Run: `npm test -- tests/content.test.ts`

Expected: FAIL resolving `@/lib/content`.

- [ ] **Step 3: Define exact domain types and six complete articles**

Define `Article.status` as `"draft" | "review" | "published" | "withdrawn"`; define `Difficulty` with `value`, `method: "external-user-entry" | "nonfiction-lab-estimate"`, and `label`. Seed six three-minute articles across science, history, arts, philosophy, self-development, and world culture. Each article includes 3–5 reading pages, 4–6 vocabulary items, 3 quiz questions with explanations, at least two sources, a connected article id, interest band, review record, and version.

- [ ] **Step 4: Implement a learner-safe repository**

```ts
export function getPublishedArticles(): Article[] {
  return SAMPLE_ARTICLES.filter((article) => article.status === "published");
}

export function getArticleById(id: string): Article | undefined {
  return getPublishedArticles().find((article) => article.id === id);
}
```

- [ ] **Step 5: Verify content invariants and commit**

Run: `npm test -- tests/content.test.ts`

Expected: PASS for published state, sources, review, quiz answers, connected ids, and unique ids.

```bash
git add lib tests/content.test.ts
git commit -m "feat: add reviewed nonfiction seed library"
```

### Task 3: Versioned Learner Store

**Files:**
- Create: `lib/learner-store.ts`
- Test: `tests/learner-store.test.ts`

**Interfaces:**
- Consumes: `KnowledgeDomain` and `Difficulty` from `lib/types.ts`.
- Produces: `LearnerProfile`, `LearningAttempt`, `LearnerState`, `loadLearnerState(storage)`, `saveLearnerState(storage, state)`, `recordAttempt(state, attempt)`.

- [ ] **Step 1: Write persistence, corrupt-data, and migration tests**

```ts
it("keeps entered and estimated AR values separate", () => {
  const state = createDefaultLearnerState();
  state.profile.enteredAr = 2.4;
  state.profile.estimatedDifficulty = 2.1;
  saveLearnerState(localStorage, state);
  expect(loadLearnerState(localStorage).profile).toMatchObject({ enteredAr: 2.4, estimatedDifficulty: 2.1 });
});

it("recovers from corrupt storage", () => {
  localStorage.setItem(STORAGE_KEY, "not-json");
  expect(loadLearnerState(localStorage)).toEqual(createDefaultLearnerState());
});
```

- [ ] **Step 2: Run tests and verify missing exports**

Run: `npm test -- tests/learner-store.test.ts`

Expected: FAIL because store functions do not exist.

- [ ] **Step 3: Implement schema version 1 and immutable attempt recording**

Use key `nonfiction-lab:learner:v1`. Store onboarding status, entered AR, estimated difficulty, interests, streak, XP, completed ids, saved vocabulary, and attempts. `recordAttempt` returns a new state, adds XP once per attempt id, and never overwrites `enteredAr`.

- [ ] **Step 4: Verify store tests and commit**

Run: `npm test -- tests/learner-store.test.ts`

Expected: PASS including duplicate-attempt prevention.

```bash
git add lib/learner-store.ts tests/learner-store.test.ts
git commit -m "feat: persist learner profile and progress"
```

### Task 4: Onboarding and AR Starting Paths

**Files:**
- Create: `components/onboarding.tsx`
- Modify: `app/page.tsx`
- Test: `tests/onboarding.test.tsx`

**Interfaces:**
- Consumes: `LearnerProfile` from `lib/learner-store.ts`.
- Produces: `Onboarding({ onComplete(profile) })`.
- Emits profiles for `enter`, `estimate`, and `easiest` paths without conflating official and estimated values.

- [ ] **Step 1: Write tests for all three entry paths**

```tsx
it("saves a user-entered AR value as external input", async () => {
  const onComplete = vi.fn();
  render(<Onboarding onComplete={onComplete} />);
  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "2.4");
  await user.click(screen.getByRole("button", { name: "이 수준으로 시작" }));
  expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ enteredAr: 2.4, estimatedDifficulty: null }));
});
```

Also assert that the estimate path labels its result `논픽션랩 추정 난이도` and that easiest start returns `estimatedDifficulty: 0.5`.

- [ ] **Step 2: Confirm tests fail without onboarding UI**

Run: `npm test -- tests/onboarding.test.tsx`

Expected: FAIL resolving `components/onboarding`.

- [ ] **Step 3: Implement three-step onboarding**

Screen 1 presents the brand and three choices. AR entry accepts 0.1–20.0. The estimate uses six fixed reviewed questions and calculates the highest consistently answered band; it must describe the value as an estimate. Interest selection allows 1–4 domains and defaults to science, world culture, and arts when skipped.

- [ ] **Step 4: Wire hydration and first-run routing in `app/page.tsx`**

Hydrate once on the client, render a neutral branded loading state before hydration, show onboarding when incomplete, and persist the completed profile before showing home.

- [ ] **Step 5: Verify tests and commit**

Run: `npm test -- tests/onboarding.test.tsx && npm run build`

Expected: PASS and no hydration warning in build output.

```bash
git add components/onboarding.tsx app/page.tsx tests/onboarding.test.tsx
git commit -m "feat: add flexible AR onboarding"
```

### Task 5: Recommendation Rules and Modern Home

**Files:**
- Create: `lib/recommendation.ts`, `components/home-screen.tsx`
- Modify: `app/page.tsx`
- Test: `tests/recommendation.test.ts`, `tests/home-screen.test.tsx`

**Interfaces:**
- Consumes: `Article[]`, `LearnerState`.
- Produces: `rankArticles(articles, state, seed): Article[]` and `nextEstimatedDifficulty(attempts, current): number`.
- Produces: `HomeScreen({ state, articles, onStart, onNavigate })`.

- [ ] **Step 1: Write deterministic recommendation tests**

```ts
it("limits a single level adjustment to 0.3", () => {
  const attempts = successfulAttempts(8);
  expect(nextEstimatedDifficulty(attempts, 2.4)).toBe(2.7);
});

it("mixes interests with expansion candidates", () => {
  const ranked = rankArticles(fixtureArticles, learnerInterestedInScience, 7);
  expect(ranked.slice(0, 10).filter((a) => a.domain === "science")).toHaveLength(7);
});
```

- [ ] **Step 2: Confirm failures before implementing rules**

Run: `npm test -- tests/recommendation.test.ts tests/home-screen.test.tsx`

Expected: FAIL for missing modules.

- [ ] **Step 3: Implement gradual difficulty and 70/30 candidate ranking**

Clamp change to ±0.3, require at least five recent completed attempts, raise only when mean score is at least 0.85 with low hint use, and lower only when mean score is below 0.6. Rank unpublished content nowhere because callers only receive the learner-safe repository.

- [ ] **Step 4: Build the approved knowledge-explorer home**

Implement the forest hero card, `오늘의 지식 시작하기` CTA, streak/AR/XP chips, four domain cards, and four-item bottom navigation. Use semantic headings and no emoji-only accessible names.

- [ ] **Step 5: Verify recommendation, home, and visual constraints**

Run: `npm test -- tests/recommendation.test.ts tests/home-screen.test.tsx && npm run build`

Expected: PASS; home test confirms one primary CTA and readable difficulty label.

- [ ] **Step 6: Commit**

```bash
git add lib/recommendation.ts components/home-screen.tsx app/page.tsx tests/recommendation.test.ts tests/home-screen.test.tsx
git commit -m "feat: add personalized knowledge home"
```

### Task 6: Three-Minute Reader and Vocabulary Help

**Files:**
- Create: `components/reader-screen.tsx`
- Modify: `app/page.tsx`
- Test: `tests/reader-screen.test.tsx`

**Interfaces:**
- Consumes: `Article`.
- Produces: `ReaderScreen({ article, pageIndex, onPageChange, onFinish, onEvent })`.
- Emits events `page_view`, `word_open`, `audio_play`, and `reader_complete` with article id and timestamp.

- [ ] **Step 1: Write interaction tests**

```tsx
it("opens a vocabulary definition and completes all pages", async () => {
  const onFinish = vi.fn();
  render(<ReaderHarness article={publishedArticle} onFinish={onFinish} />);
  await user.click(screen.getByRole("button", { name: /energy 뜻 보기/i }));
  expect(screen.getByRole("dialog", { name: "energy" })).toBeVisible();
  for (let i = 1; i < publishedArticle.pages.length; i++) await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  await user.click(screen.getByRole("button", { name: "이해 퀴즈 시작" }));
  expect(onFinish).toHaveBeenCalled();
});
```

- [ ] **Step 2: Run and confirm missing reader failure**

Run: `npm test -- tests/reader-screen.test.tsx`

Expected: FAIL resolving reader screen.

- [ ] **Step 3: Implement paged reading UI**

Render the approved serif article title/body, page progress, article visual, audio control, focus-safe word dialog, source drawer, save button, and easy/deep version links when available. If audio is unavailable or errors, keep all text and navigation usable and show `오디오는 지금 사용할 수 없어요`.

- [ ] **Step 4: Verify keyboard, progress, and fallback tests**

Run: `npm test -- tests/reader-screen.test.tsx`

Expected: PASS for dialog focus return, page progress, and audio failure.

- [ ] **Step 5: Commit**

```bash
git add components/reader-screen.tsx app/page.tsx tests/reader-screen.test.tsx
git commit -m "feat: add accessible three-minute reader"
```

### Task 7: Quiz, Completion, and Progress Recording

**Files:**
- Create: `components/quiz-screen.tsx`, `components/completion-screen.tsx`
- Modify: `app/page.tsx`
- Test: `tests/learning-flow.test.tsx`

**Interfaces:**
- Consumes: `Article.quiz`, `recordAttempt`, and current session events.
- Produces: `QuizScreen({ questions, onComplete })` with `{ correct, total, answers }`.
- Produces: `CompletionScreen({ article, result, state, onNext, onHome })`.

- [ ] **Step 1: Write the end-to-end component test**

```tsx
it("records one attempt and shows score, XP, streak, and next topic", async () => {
  render(<LearnerApp initialState={onboardedState} />);
  await user.click(screen.getByRole("button", { name: "오늘의 지식 시작하기" }));
  await completeReaderAndQuiz(user);
  expect(screen.getByText(/새로운 지식 발견/)).toBeVisible();
  expect(screen.getByText(/이해도/)).toBeVisible();
  expect(screen.getByText(/획득 XP/)).toBeVisible();
  expect(loadLearnerState(localStorage).attempts).toHaveLength(1);
});
```

- [ ] **Step 2: Run and confirm missing quiz/completion failure**

Run: `npm test -- tests/learning-flow.test.tsx`

Expected: FAIL before quiz and completion screens exist.

- [ ] **Step 3: Implement question feedback and completion summary**

Lock each answer after submission, show a concise explanation, require an explicit next action, calculate percentage as `Math.round(correct / total * 100)`, award 25 base XP plus 10 for a perfect score, and increment streak once per local calendar day.

- [ ] **Step 4: Connect the complete app state machine**

Use a discriminated union: `onboarding | home | explore | reader | quiz | completion | profile`. Save the attempt before rendering completion. Reopening completion or double-clicking must not duplicate XP or attempts.

- [ ] **Step 5: Verify integration and commit**

Run: `npm test -- tests/learning-flow.test.tsx tests/learner-store.test.ts && npm run build`

Expected: PASS with one persisted attempt.

```bash
git add components/quiz-screen.tsx components/completion-screen.tsx app/page.tsx tests/learning-flow.test.tsx
git commit -m "feat: complete reading quiz and reward loop"
```

### Task 8: Explore Library and Learner Profile

**Files:**
- Create: `components/explore-screen.tsx`, `components/profile-screen.tsx`
- Modify: `app/page.tsx`
- Test: `tests/explore.test.tsx`, `tests/profile-screen.test.tsx`

**Interfaces:**
- Consumes: `Article[]`, `LearnerState`.
- Produces: `filterArticles(articles, { query, domain, minDifficulty, maxDifficulty, interestBand })`.
- Produces: editable interest preferences without editing entered AR implicitly.

- [ ] **Step 1: Write exact filtering and profile-label tests**

```tsx
it("filters by domain and estimated difficulty", async () => {
  render(<ExploreScreen articles={articles} onOpen={() => {}} />);
  await user.click(screen.getByRole("button", { name: "철학" }));
  await user.selectOptions(screen.getByLabelText("읽기 난이도"), "2-4");
  expect(screen.getAllByTestId("article-card").every((card) => card.textContent?.includes("철학"))).toBe(true);
});
```

Profile test must show `입력한 AR 지수` and `논픽션랩 추정 난이도` as separate rows.

- [ ] **Step 2: Confirm missing-screen failures**

Run: `npm test -- tests/explore.test.tsx tests/profile-screen.test.tsx`

Expected: FAIL resolving both screens.

- [ ] **Step 3: Implement library search and filters**

Support Korean/English title search, domain chips, difficulty ranges, interest age, saved items, and a no-results reset action. Each card shows domain, difficulty method, interest band, and three-minute duration.

- [ ] **Step 4: Implement profile and progress summary**

Show entered AR, app estimate, completed count, average comprehension, streak, XP, interests, retest action, and `모든 학습 데이터 삭제` behind a confirmation dialog. Do not show ranking or public identity.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- tests/explore.test.tsx tests/profile-screen.test.tsx && npm run build`

Expected: PASS.

```bash
git add components/explore-screen.tsx components/profile-screen.tsx app/page.tsx tests/explore.test.tsx tests/profile-screen.test.tsx
git commit -m "feat: add knowledge library and learner profile"
```

### Task 9: PWA, Offline Safety, and Browser Verification

**Files:**
- Create: `app/manifest.ts`, `public/sw.js`, `public/icons/icon-192.svg`, `public/icons/icon-512.svg`
- Create: `playwright.config.ts`, `e2e/learner-journey.spec.ts`
- Modify: `app/layout.tsx`, `next.config.ts`, `package.json`
- Test: `e2e/learner-journey.spec.ts`

**Interfaces:**
- Consumes: the complete learner flow.
- Produces: installable metadata and cache `nonfiction-lab-v1` for app shell plus previously fetched same-origin article assets.

- [ ] **Step 1: Write the mobile learner journey test**

```ts
test.use({ viewport: { width: 390, height: 844 } });

test("onboards, completes a lesson, and retains progress after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "가장 쉬운 단계부터" }).click();
  await page.getByRole("button", { name: "오늘의 지식 시작하기" }).click();
  await finishCurrentLesson(page);
  await expect(page.getByText("새로운 지식 발견!")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "나" }).click();
  await expect(page.getByText("완료한 지식 1개")).toBeVisible();
});
```

- [ ] **Step 2: Run and confirm the initial browser-test failure**

Run: `npx playwright install chromium && npm run test:e2e`

Expected: FAIL because manifest, helper, or finished flow is not yet wired.

- [ ] **Step 3: Add manifest, icons, and conservative service worker**

Use `display: "standalone"`, theme `#173f34`, background `#f3f5ef`, and start URL `/`. Cache successful same-origin GET responses only; never cache mutation requests. Serve cached navigation shell when offline and leave uncached audio/video failures to the reader fallback.

- [ ] **Step 4: Register the worker only in production**

Add a tiny client component in `app/layout.tsx` that calls `navigator.serviceWorker.register("/sw.js")` only when `process.env.NODE_ENV === "production"`.

- [ ] **Step 5: Run complete verification**

Run: `npm test && npm run build && npm run test:e2e`

Expected: all unit/component tests PASS, production build PASS, mobile journey PASS, and reload retains exactly one attempt.

- [ ] **Step 6: Perform a manual mobile checklist**

At 390×844 and 430×932 verify: no horizontal scroll; bottom navigation does not cover CTAs; every target is at least 44 px; keyboard focus is visible; body copy remains readable at 200% zoom; offline reload opens the cached home/current article; audio failure leaves text usable.

- [ ] **Step 7: Commit the release-ready learner MVP**

```bash
git add app/layout.tsx app/manifest.ts next.config.ts package.json package-lock.json public playwright.config.ts e2e
git commit -m "feat: make learner MVP installable and offline-ready"
```

## Deferred Plans

The following approved subsystems remain intentionally outside this learner MVP and require separate implementation plans:

1. Content Studio: source ingestion, AI draft generation, reviewer queues, versioning, withdrawal, and audit history.
2. Parent Dashboard: child linking, consent, progress reporting, vocabulary insights, account recovery, and deletion.
3. Backend and Auth: persistent multi-device accounts, child-safe authorization, analytics ingestion, and server-side recommendations.
4. Media Pipeline: licensed video embeds, managed narration, image rights, transcripts, and offline media limits.

