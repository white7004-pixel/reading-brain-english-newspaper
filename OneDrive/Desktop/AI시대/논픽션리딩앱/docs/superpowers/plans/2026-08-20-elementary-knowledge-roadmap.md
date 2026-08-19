# Elementary Knowledge Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a locally stored elementary grade 1–6 nonfiction knowledge roadmap with Korean grade and AR range labels, plus links to available readings.

**Architecture:** A typed static data module owns the 72 roadmap entries and query helpers. A focused client component renders grade tabs and topic cards, while the existing explore screen composes it above the current article filters and supplies the existing `onOpen` callback.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 7, Vitest 4, Testing Library, global CSS

**Spec:** `docs/superpowers/specs/2026-08-20-elementary-knowledge-roadmap-design.md`

## Global Constraints

- Cover Korean elementary grades 1 through 6.
- Provide exactly 12 topics per grade and 72 topics total.
- Cover science, history, society, world culture, arts, and philosophy/self-development in every grade.
- Display Korean grade and recommended AR range together.
- Distinguish `읽기 가능` from `준비 중`; do not create placeholder articles.
- Use only local TypeScript, the existing Next.js app, and existing test tools; do not call external AI, paid APIs, remote databases, or web services.
- Preserve the existing search, domain, difficulty filters, and reading flow.
- Store one exact key sentence and existing core vocabulary for every public article; grade learner selections entirely in the browser without external calls.

---

### Task 1: Typed roadmap data and validation

**Files:**
- Create: `lib/knowledge-roadmap.ts`
- Create: `tests/knowledge-roadmap.test.ts`

**Interfaces:**
- Consumes: `KnowledgeDomain` and published article IDs from `lib/types.ts` and `lib/sample-content.ts` conventions.
- Produces: `ElementaryGrade`, `RoadmapDomain`, `KnowledgeRoadmapItem`, `KNOWLEDGE_ROADMAP`, `ELEMENTARY_GRADES`, `ROADMAP_DOMAIN_LABELS`, and `roadmapForGrade(grade)`.

- [ ] **Step 1: Write the failing data contract tests**

```ts
import {
  ELEMENTARY_GRADES,
  KNOWLEDGE_ROADMAP,
  ROADMAP_DOMAIN_LABELS,
  roadmapForGrade,
} from "@/lib/knowledge-roadmap";

it("provides twelve ordered nonfiction topics for every elementary grade", () => {
  expect(ELEMENTARY_GRADES).toEqual([1, 2, 3, 4, 5, 6]);
  for (const grade of ELEMENTARY_GRADES) {
    const items = roadmapForGrade(grade);
    expect(items).toHaveLength(12);
    expect(items.map((item) => item.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  }
  expect(KNOWLEDGE_ROADMAP).toHaveLength(72);
});

it("covers all roadmap domains in every grade", () => {
  const domains = Object.keys(ROADMAP_DOMAIN_LABELS).sort();
  for (const grade of ELEMENTARY_GRADES) {
    expect([...new Set(roadmapForGrade(grade).map((item) => item.domain))].sort()).toEqual(domains);
  }
});

it("keeps ids and AR ranges valid", () => {
  expect(new Set(KNOWLEDGE_ROADMAP.map((item) => item.id)).size).toBe(72);
  for (const item of KNOWLEDGE_ROADMAP) {
    expect(item.arMin).toBeGreaterThanOrEqual(1);
    expect(item.arMax).toBeGreaterThanOrEqual(item.arMin);
    expect(item.goal.trim().length).toBeGreaterThan(10);
  }
});
```

- [ ] **Step 2: Run the test and verify the module is missing**

Run: `npm test -- tests/knowledge-roadmap.test.ts`

Expected: FAIL because `@/lib/knowledge-roadmap` does not exist.

- [ ] **Step 3: Implement the typed local roadmap module**

Create the following exact public types and helpers:

```ts
export type ElementaryGrade = 1 | 2 | 3 | 4 | 5 | 6;
export type RoadmapDomain = "science" | "history" | "society" | "world-culture" | "arts" | "philosophy";
export type KnowledgeRoadmapItem = {
  id: string;
  grade: ElementaryGrade;
  domain: RoadmapDomain;
  titleKo: string;
  goal: string;
  arMin: number;
  arMax: number;
  order: number;
  articleId?: string;
};

export const ELEMENTARY_GRADES: ElementaryGrade[] = [1, 2, 3, 4, 5, 6];
export const ROADMAP_DOMAIN_LABELS: Record<RoadmapDomain, string> = {
  science: "과학",
  history: "역사",
  society: "사회",
  "world-culture": "세계문화",
  arts: "예술",
  philosophy: "철학·자기계발",
};
export function roadmapForGrade(grade: ElementaryGrade): KnowledgeRoadmapItem[] {
  return KNOWLEDGE_ROADMAP.filter((item) => item.grade === grade).sort((a, b) => a.order - b.order);
}
```

Populate two entries per domain per grade. Within each row below, assign topics in order to `science`, `science`, `history`, `history`, `society`, `society`, `world-culture`, `world-culture`, `arts`, `arts`, `philosophy`, `philosophy`:

```ts
const GRADE_TOPICS = {
  1: ["생물과 무생물", "날씨와 계절", "우리 가족의 역사", "옛날과 오늘", "교실의 규칙", "우리 동네의 일", "세계의 인사", "세계의 집", "색과 모양", "음악과 리듬", "감정 알아보기", "선택과 결과"],
  2: ["동물의 서식지", "식물의 한살이", "마을의 변화", "시간과 연표", "지도와 방향", "필요와 욕구", "세계의 음식", "세계의 명절", "미술 속 무늬", "그림으로 전하는 이야기", "작은 습관", "공정함이란 무엇일까"],
  3: ["힘과 운동", "물의 순환", "고대 사람들의 생활", "발명품의 변화", "지방 정부의 역할", "생산자와 소비자", "무역로와 교류", "세계의 언어", "건축과 생활", "악기와 소리", "사실과 의견", "목표와 연습"],
  4: ["생태계의 연결", "움직이는 지구", "사람들의 이동", "초기 문명의 탄생", "권리와 책임", "자원과 무역", "차 문화와 교류", "문화가 만날 때", "판화의 원리", "미술 속 원근법", "통제와 대응", "믿을 만한 출처"],
  5: ["별과 태양계", "물질과 에너지", "탐험과 만남", "산업의 변화", "민주주의의 원리", "경제적 선택", "세계의 믿음", "세계의 상호의존", "디자인과 기술", "공공 미술", "윤리적 딜레마", "회복탄력성"],
  6: ["기후 시스템", "세포와 유전", "제국과 저항", "현대 세계사의 흐름", "헌법의 역할", "미디어 리터러시", "세계화", "문화유산 보존", "시각적 설득", "예술과 정체성", "주장과 근거", "나의 가치관"],
} as const;

const GRADE_AR = {
  1: [1.0, 1.9], 2: [1.5, 2.4], 3: [2.0, 2.9],
  4: [2.5, 3.4], 5: [3.0, 3.9], 6: [3.5, 4.5],
} as const;

const ARTICLE_BY_TITLE: Partial<Record<string, string>> = {
  "작은 습관": "small-habits",
  "무역로와 교류": "silk-road",
  "차 문화와 교류": "tea-cultures",
  "판화의 원리": "great-wave",
  "통제와 대응": "stoic-control",
  "별과 태양계": "stars-shine",
};
```

Build `KNOWLEDGE_ROADMAP` by flattening these literal titles. Generate IDs as `grade-${grade}-${order}`, use sequential order 1–12, and set each distinct learning goal to `${titleKo}의 핵심 원리와 생활 속 의미를 설명한다.`. Use `ARTICLE_BY_TITLE[titleKo]` only for the six direct matches above.

- [ ] **Step 4: Run the data tests and verify they pass**

Run: `npm test -- tests/knowledge-roadmap.test.ts`

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the data module**

```powershell
git add lib/knowledge-roadmap.ts tests/knowledge-roadmap.test.ts
git commit -m "feat: add elementary knowledge roadmap data"
```

---

### Task 2: Grade roadmap component

**Files:**
- Create: `components/knowledge-roadmap.tsx`
- Create: `tests/knowledge-roadmap-screen.test.tsx`

**Interfaces:**
- Consumes: `Article` from `lib/types.ts`; `ELEMENTARY_GRADES`, `roadmapForGrade`, and `ROADMAP_DOMAIN_LABELS` from Task 1.
- Produces: `KnowledgeRoadmap({ articles, onOpen })` React client component.

- [ ] **Step 1: Write failing interaction tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KnowledgeRoadmap } from "@/components/knowledge-roadmap";
import { getPublishedArticles } from "@/lib/content";

it("switches between elementary grades and shows both grade and AR labels", async () => {
  const user = userEvent.setup();
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={() => {}} />);
  expect(screen.getAllByTestId("roadmap-topic")).toHaveLength(12);
  expect(screen.getByText("초등 1학년")).toBeVisible();
  await user.click(screen.getByRole("tab", { name: "초4" }));
  expect(screen.getByText("초등 4학년")).toBeVisible();
  expect(screen.getByText("차 문화와 교류")).toBeVisible();
  expect(screen.getByText(/AR 2\.5–3\.4/)).toBeVisible();
});

it("opens an available reading and marks unavailable topics as preparing", async () => {
  const user = userEvent.setup();
  const onOpen = vi.fn();
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={onOpen} />);
  await user.click(screen.getByRole("tab", { name: "초5" }));
  await user.click(screen.getByRole("button", { name: /별과 태양계 읽기 시작/ }));
  expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "stars-shine" }));
  expect(screen.getAllByText("준비 중").length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run the test and verify the component is missing**

Run: `npm test -- tests/knowledge-roadmap-screen.test.tsx`

Expected: FAIL because `@/components/knowledge-roadmap` does not exist.

- [ ] **Step 3: Implement the client component**

Use `useState<ElementaryGrade>(1)`. Render a section with heading `학년별 논픽션 지식`, a `role="tablist"` containing six tabs, and a visible `초등 N학년` label. Group selected items by domain in `ROADMAP_DOMAIN_LABELS` order. For each item, find `articles.find((article) => article.id === item.articleId)`; render `읽기 시작` only when found, otherwise render `준비 중`. The reading button accessible name must be `${item.titleKo} 읽기 시작`.

- [ ] **Step 4: Run the interaction tests and verify they pass**

Run: `npm test -- tests/knowledge-roadmap-screen.test.tsx`

Expected: 2 tests PASS.

- [ ] **Step 5: Commit the component**

```powershell
git add components/knowledge-roadmap.tsx tests/knowledge-roadmap-screen.test.tsx
git commit -m "feat: add grade roadmap browser"
```

---

### Task 3: Explore-screen integration and styling

**Files:**
- Modify: `components/explore-screen.tsx`
- Modify: `tests/explore.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `KnowledgeRoadmap({ articles, onOpen })` from Task 2.
- Produces: Explore screen with roadmap above existing search and filters.

- [ ] **Step 1: Add a failing integration assertion**

Add this test to `tests/explore.test.tsx`:

```tsx
it("places the grade roadmap before the existing knowledge library", () => {
  render(<ExploreScreen articles={getPublishedArticles()} onOpen={() => {}} initialDomain={null} />);
  const roadmap = screen.getByRole("heading", { name: "학년별 논픽션 지식" });
  const library = screen.getByRole("heading", { name: "무엇이 궁금한가요?" });
  expect(roadmap.compareDocumentPosition(library) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
```

- [ ] **Step 2: Run the explore test and verify the roadmap heading is absent**

Run: `npm test -- tests/explore.test.tsx`

Expected: FAIL because the roadmap heading cannot be found.

- [ ] **Step 3: Read the installed Next.js CSS and client-component guides before editing**

Run:

```powershell
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/11-css.md
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
```

If the second path differs in the installed package, resolve the exact `05-server-and-client-components.md` path under `node_modules/next/dist/docs/01-app/01-getting-started/` and read it completely.

- [ ] **Step 4: Compose the roadmap into ExploreScreen**

Import `KnowledgeRoadmap` and render `<KnowledgeRoadmap articles={articles} onOpen={onOpen} />` as the first child inside the existing `<section className="explore-screen">`. Wrap the existing library heading and controls in a sibling section labelled by the existing `무엇이 궁금한가요?` heading. Do not change `filterArticles`, search labels, filter options, or article cards.

- [ ] **Step 5: Add responsive roadmap styles**

Add focused classes to `app/globals.css`: `.knowledge-roadmap`, `.grade-tabs`, `.roadmap-grade-heading`, `.roadmap-domain`, `.roadmap-topic-grid`, `.roadmap-topic`, `.roadmap-topic__meta`, and `.roadmap-topic__status`. Keep grade tabs horizontally scrollable on narrow screens; use a one-column card grid by default and two columns only within the app's existing wide-screen media query. Available reading buttons must meet a 44px minimum touch target, and disabled status text must remain visually distinct without relying on color alone.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- tests/knowledge-roadmap-screen.test.tsx tests/explore.test.tsx`

Expected: 4 existing/new roadmap and explore tests PASS, with the exact total adjusted to include all pre-existing tests in those files.

- [ ] **Step 7: Commit integration and styles**

```powershell
git add components/explore-screen.tsx tests/explore.test.tsx app/globals.css
git commit -m "feat: show roadmap in knowledge library"
```

---

### Task 4: Core-word and key-sentence finding activity

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/sample-content.ts`
- Modify: `lib/public-article-schema.ts`
- Modify: `lib/studio-workflow.ts`
- Modify: `components/reader-screen.tsx`
- Modify: `app/globals.css`
- Modify: `tests/public-article-schema.test.ts`
- Modify: `tests/studio-workflow.test.ts`
- Modify: `tests/reader-screen.test.tsx`

**Interfaces:**
- Consumes: existing `Article.vocabulary`, studio `keySentence`, and reader page text.
- Produces: required `Article.keySentence: string` and a local `핵심 찾기` selection-and-check interaction.

- [ ] **Step 1: Write failing public-data tests**

Add assertions that `parsePublicArticle` rejects an empty `keySentence`, `clonePublicArticle` preserves it, `publishArticle` carries `StudioArticle.keySentence` into the learner snapshot, and every sample article's key sentence appears exactly within `article.pages.join(" ")`.

- [ ] **Step 2: Run the public-data tests and verify failure**

Run: `npm test -- tests/public-article-schema.test.ts tests/studio-workflow.test.ts tests/content.test.ts`

Expected: FAIL because public `Article` has no required `keySentence` and publishing drops the studio value.

- [ ] **Step 3: Preserve the key sentence in public articles**

Add `keySentence: string` to `Article`. Validate it with `required(issues, value.keySentence, "keySentence")`, clone it in `clonePublicArticle`, and assign `keySentence: article.keySentence` in `createLearnerSnapshot`. Extend `Seed` in `sample-content.ts` with optional `keySentence`; set each sample article's public value to `seed.keySentence ?? seed.pages[0].split(/(?<=[.!?])\s+/)[0]`. This keeps every answer grounded in its passage without any generated runtime data.

- [ ] **Step 4: Run the public-data tests and verify they pass**

Run: `npm test -- tests/public-article-schema.test.ts tests/studio-workflow.test.ts tests/content.test.ts`

Expected: all focused public-data tests PASS.

- [ ] **Step 5: Write the failing reader interaction test**

```tsx
it("lets the learner choose core words and a key sentence before checking locally", async () => {
  const user = userEvent.setup();
  const article = getPublishedArticles()[0];
  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);
  await user.click(screen.getByRole("button", { name: "핵심 찾기" }));
  await user.click(screen.getAllByRole("button", { name: /핵심단어로 선택/ })[0]);
  await user.click(screen.getByRole("button", { name: `${article.keySentence} 핵심문장으로 선택` }));
  await user.click(screen.getByRole("button", { name: "정답 확인" }));
  expect(screen.getByText("핵심문장을 찾았어요!" )).toBeVisible();
  expect(screen.getByText(/핵심단어 정답/)).toBeVisible();
});
```

- [ ] **Step 6: Run the reader test and verify controls are absent**

Run: `npm test -- tests/reader-screen.test.tsx`

Expected: FAIL because `핵심 찾기` does not exist.

- [ ] **Step 7: Implement local selection and grading**

In `ReaderScreen`, add state for activity visibility, selected vocabulary words, selected sentence, and checked result. Split the current page into sentences with `page.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [page]`. In activity mode render each non-empty vocabulary occurrence with a separate `${word} 핵심단어로 선택` control and each sentence with `${sentence.trim()} 핵심문장으로 선택`. Grade selected words against `article.vocabulary.map(({ word }) => word.toLocaleLowerCase())` and the selected sentence against `article.keySentence.trim()`. `정답 확인` must only compare these local strings, then show the correct words and key sentence; `다시 찾기` clears selections and result.

- [ ] **Step 8: Style the activity and rerun reader tests**

Add `.key-finder`, `.key-finder__toolbar`, `.key-finder__sentence`, `.key-finder__word`, `.key-finder__result`, and selected/correct state classes. Keep all interactive controls at least 44px high and do not encode correctness by color alone.

Run: `npm test -- tests/reader-screen.test.tsx`

Expected: all reader tests PASS.

- [ ] **Step 9: Commit the reading activity**

```powershell
git add lib/types.ts lib/sample-content.ts lib/public-article-schema.ts lib/studio-workflow.ts components/reader-screen.tsx app/globals.css tests/public-article-schema.test.ts tests/studio-workflow.test.ts tests/reader-screen.test.tsx tests/content.test.ts
git commit -m "feat: add key finding activity to every reading"
```

---

### Task 5: Full verification

**Files:**
- Verify only; modify files solely to correct failures caused by Tasks 1–3.

**Interfaces:**
- Consumes: completed roadmap data and UI.
- Produces: verified application behavior with no regression.

- [ ] **Step 1: Run all unit and component tests**

Run: `npm test`

Expected: all test files PASS with zero failed tests.

- [ ] **Step 2: Run full type checking**

Run: `npm run lint`

Expected: Next route generation and all three TypeScript projects complete with exit code 0.

- [ ] **Step 3: Run a production build**

Run: `npm run build`

Expected: Next.js production build completes with exit code 0.

- [ ] **Step 4: Verify the running app responds locally**

Run:

```powershell
$response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing
if ($response.StatusCode -ne 200) { throw "Unexpected HTTP status $($response.StatusCode)" }
```

Expected: no exception and HTTP status 200.

- [ ] **Step 5: Review the final scoped diff**

Run: `git diff -- lib/knowledge-roadmap.ts components/knowledge-roadmap.tsx components/explore-screen.tsx app/globals.css tests/knowledge-roadmap.test.ts tests/knowledge-roadmap-screen.test.tsx tests/explore.test.tsx`

Expected: only roadmap data, roadmap UI, integration, styles, and their tests are present; no unrelated files appear.
