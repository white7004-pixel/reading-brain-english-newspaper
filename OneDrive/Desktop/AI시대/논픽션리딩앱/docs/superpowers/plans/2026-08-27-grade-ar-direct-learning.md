# Grade and AR Direct Learning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Support twelve school grades and AR 0.x–12.x while allowing any learner, including an elementary grade-one learner, to open and start any published AR-level article directly.

**Architecture:** Add pure grade and AR catalog modules, then extend article and Studio schemas with optional grade metadata. Replace the elementary-only roadmap selector with grouped twelve-grade navigation and add an independent AR shelf whose cards start published articles without grade gates.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 7, Vitest/Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-27-oral-reading-grade-ar-expansion-design.md`

## Global Constraints

- Grades are recommendation metadata, never access-control rules.
- Grade IDs are `elementary-1` through `elementary-6`, `middle-1` through `middle-3`, and `high-1` through `high-3`.
- AR catalog bands are `ar0` through `ar12`; exact article AR values remain in `difficulty.value`.
- Supported exact AR input is 0.1 through 12.9 inclusive.
- Existing articles and stored Studio records without grade metadata remain readable.
- Empty grade or AR selections render a preparation state instead of throwing.
- Before changing Next.js client components, read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` completely.

---

### Task 1: Grade Catalog

**Files:**
- Create: `lib/grade-levels.ts`
- Test: `tests/grade-levels.test.ts`

**Interfaces:**
- Produces: `GradeLevel`, `GRADE_LEVELS`, `GRADE_GROUPS`, `gradeLabel(level)`, `defaultOralReadingLimitSeconds(level)`.

- [ ] **Step 1: Write failing catalog tests**

```ts
import { GRADE_LEVELS, defaultOralReadingLimitSeconds, gradeLabel } from "@/lib/grade-levels";

it("defines all twelve grades in school order", () => {
  expect(GRADE_LEVELS).toEqual([
    "elementary-1", "elementary-2", "elementary-3", "elementary-4", "elementary-5", "elementary-6",
    "middle-1", "middle-2", "middle-3", "high-1", "high-2", "high-3",
  ]);
  expect(gradeLabel("elementary-1")).toBe("초1");
  expect(gradeLabel("high-3")).toBe("고3");
});

it("returns the approved oral-reading defaults", () => {
  expect(defaultOralReadingLimitSeconds("elementary-1")).toBe(90);
  expect(defaultOralReadingLimitSeconds("elementary-4")).toBe(75);
  expect(defaultOralReadingLimitSeconds("elementary-6")).toBe(60);
  expect(defaultOralReadingLimitSeconds("middle-2")).toBe(50);
  expect(defaultOralReadingLimitSeconds("high-2")).toBe(45);
});
```

- [ ] **Step 2: Run `npm test -- tests/grade-levels.test.ts` and verify the missing-module failure.**
- [ ] **Step 3: Implement the exact twelve IDs, grouped labels, and limits from the spec.**
- [ ] **Step 4: Run the focused test and verify it passes.**
- [ ] **Step 5: Commit with `feat: add twelve-grade catalog`.**

### Task 2: AR 0.x–12.x Catalog and Validation

**Files:**
- Create: `lib/ar-catalog.ts`
- Modify: `lib/placement-test.ts`
- Modify: `lib/learner-store.ts`
- Test: `tests/ar-catalog.test.ts`
- Test: `tests/placement-test.test.ts`
- Test: `tests/learner-store.test.ts`

**Interfaces:**
- Produces: `ArCatalogBandId = "ar0" | ... | "ar12"`, `AR_CATALOG_BAND_IDS`, `AR_CATALOG_BANDS`, `catalogBandForAr(value)` supporting 0.1–12.9.

- [ ] **Step 1: Add failing boundary tests**

```ts
expect(AR_CATALOG_BAND_IDS).toHaveLength(13);
expect(catalogBandForAr(0.1)).toBe("ar0");
expect(catalogBandForAr(4.7)).toBe("ar4");
expect(catalogBandForAr(12.9)).toBe("ar12");
expect(catalogBandForAr(13)).toBeNull();
expect(isValidArEntry(12.9)).toBe(true);
expect(isValidArEntry(13)).toBe(false);
```

- [ ] **Step 2: Run the three focused suites and confirm current upper-band failures.**
- [ ] **Step 3: Generate thirteen ordered catalog records containing only `id`, `minAr`, `maxArInclusive`, and `label`, with `ar0` starting at 0.1 and `ar12` ending at 12.9. Keep `lib/ar-bands.ts` unchanged because it defines authored-content word/sentence targets only for bands that already have production rules.**
- [ ] **Step 4: Change `AR_ENTRY_MAX` and learner validation copy to 12.9.**
- [ ] **Step 5: Run focused suites and commit with `feat: extend AR catalog through twelve`.**

### Task 3: Backward-Compatible Article and Studio Grade Fields

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/studio-types.ts`
- Modify: `lib/studio-seed.ts`
- Modify: `lib/studio-store.ts`
- Modify: `lib/public-article-schema.ts`
- Modify: `lib/studio-workflow.ts`
- Test: `tests/studio-store.test.ts`
- Test: `tests/public-article-schema.test.ts`
- Test: `tests/studio-workflow.test.ts`

**Interfaces:**
- Consumes: `GradeLevel` from `lib/grade-levels.ts`.
- Produces: optional `Article.gradeLevel`, `Article.oralReadingLimitSeconds`, matching Studio fields and patches.

- [ ] **Step 1: Add failing schema tests proving a valid grade and positive integer limit round-trip, while a legacy record with neither field still loads.**
- [ ] **Step 2: Add failing validation tests for `gradeLevel: "college-1"`, `oralReadingLimitSeconds: 0`, and `difficulty.value: 13`.**
- [ ] **Step 3: Run the focused suites and verify field-loss/validation failures.**
- [ ] **Step 4: Add optional fields, clone/parse logic, public serialization, and learner-facing workflow invalidation for both fields. Use `GRADE_LEVELS.includes(value)` and `Number.isInteger(limit) && limit > 0`.**
- [ ] **Step 5: Run focused suites and commit with `feat: add grade and reading-limit metadata`.**

### Task 4: Studio Controls

**Files:**
- Modify: `components/studio/article-editor.tsx`
- Modify: `lib/studio-validation-ui.ts`
- Test: `tests/studio-editor.test.tsx`

**Interfaces:**
- Consumes: `GRADE_LEVELS`, `gradeLabel`, `defaultOralReadingLimitSeconds`.
- Produces: editable grade, exact AR 0.1–12.9, and optional per-article oral-reading limit.

- [ ] **Step 1: Add a failing editor test that selects `초1`, enters AR `4.2`, overrides the limit to `70`, then clears it and sees `기본 90초` again.**
- [ ] **Step 2: Run `npm test -- tests/studio-editor.test.tsx` and verify missing-control failures.**
- [ ] **Step 3: Add the grade select, AR input with `min="0.1" max="12.9" step="0.1"`, and optional integer limit with computed default help text.**
- [ ] **Step 4: Run the focused suite and commit with `feat: edit grade AR and reading limits`.**

### Task 5: Twelve-Grade Navigation and Independent AR Shelf

**Files:**
- Modify: `lib/knowledge-roadmap.ts`
- Modify: `components/knowledge-roadmap.tsx`
- Create: `components/ar-library.tsx`
- Modify: `components/explore-screen.tsx`
- Modify: `app/knowledge-map.css`
- Test: `tests/knowledge-roadmap.test.ts`
- Test: `tests/knowledge-roadmap-screen.test.tsx`
- Test: `tests/explore.test.tsx`

**Interfaces:**
- Consumes: published `Article[]`, learner grade, learner AR, and existing `onOpen(article)` callback.
- Produces: grouped twelve-grade selector and `ArLibrary({ articles, currentAr, onOpen })`.

- [ ] **Step 1: Replace elementary-only expectations with failing tests for all twelve grades and a stable empty state for a grade without roadmap content.**
- [ ] **Step 2: Add a failing AR-shelf test**

```tsx
render(<ArLibrary articles={[{ ...article, gradeLevel: "high-1", difficulty: { ...article.difficulty, value: 4.2 } }]} currentAr={4.1} onOpen={onOpen} />);
await user.click(screen.getByRole("button", { name: "AR 4.x" }));
await user.click(screen.getByRole("button", { name: article.title }));
expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: article.id }));
```

- [ ] **Step 3: Run focused suites and confirm the current six-grade/no-shelf failures.**
- [ ] **Step 4: Implement grouped school selectors, retain existing elementary roadmap data, and render “콘텐츠 준비 중” for unpopulated grades.**
- [ ] **Step 5: Implement thirteen AR cards, highlight `catalogBandForAr(currentAr)`, filter only by exact AR catalog range and publication status, and call `onOpen` directly without comparing grade metadata.**
- [ ] **Step 6: Run focused suites and commit with `feat: browse and start any AR level`.**

### Task 6: Browser Journey and Release Verification

**Files:**
- Modify: `e2e/learner-journey.spec.ts`
- Modify: `e2e/knowledge-quest.desktop.spec.ts`

**Interfaces:**
- Consumes: grade navigation and AR shelf.
- Produces: browser regression proving direct cross-grade AR learning.

- [ ] **Step 1: Add an e2e journey that sets or displays 초1, opens AR 4.x, clicks a published AR4 article fixture, and asserts the reader title without a lock or warning dialog.**
- [ ] **Step 2: Run the focused Playwright test and verify it fails before fixture/UI completion.**
- [ ] **Step 3: Add only the deterministic fixture setup needed by the journey.**
- [ ] **Step 4: Run `npm test`, `npm run typecheck`, `npm run build`, and the focused Playwright specs.**
- [ ] **Step 5: Commit with `test: verify direct AR learning across grades`.**
