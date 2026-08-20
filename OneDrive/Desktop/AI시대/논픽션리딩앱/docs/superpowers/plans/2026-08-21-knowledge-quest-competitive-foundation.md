# Knowledge Quest Competitive Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Build the approved competitive Knowledge Quest loop, preserve all 100 AR 1 seeds and learner history, and make the photographed batch-07 collection readiness-aware without bypassing editorial publication.

**Architecture:** Add optional quest metadata and readiness as pure domain modules, migrate learner state to version 3 for resumable quests and growth reporting, then rebuild the learner shell around Today, Knowledge Map, Explore, and Me. Existing publication remains the only route into the learner catalog.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 7, localStorage, Vitest, Testing Library, Playwright, CSS, existing service worker.

**Spec:** \`docs/superpowers/specs/2026-08-21-knowledge-quest-competitive-upgrade-design.md\`

## Global Constraints

- Preserve all 100 seed IDs, passages, vocabulary, quiz, source, and review data.
- Preserve Studio approval/publication; never publish seed content automatically.
- Accounts, subscriptions, Play Billing, and Android packaging are excluded.
- Use local attributed photography with theme fallback.
- Preserve all learner profile/history fields during migration.
- Support reduced motion, visible focus, semantic labels, and 44-pixel targets.
- Read installed Next.js 16 image/public-folder docs before image changes.
- Use TDD, focused commits, and never stage unrelated user changes.

## File Map

- \`lib/quest-types.ts\`: quest, readiness, map, reward, growth interfaces.
- \`lib/quest-readiness.ts\`: deterministic eight-check evaluator.
- \`lib/quest-progress.ts\`: resume transitions.
- \`lib/quest-rewards.ts\`, \`lib/growth-report.ts\`: feedback aggregation.
- \`lib/knowledge-quest-map.ts\`: map-node derivation.
- \`lib/library/ar1-07-quests.ts\`: representative 15 metadata.
- \`components/today-screen.tsx\`, \`knowledge-map-screen.tsx\`, \`quest-result-screen.tsx\`, \`growth-report.tsx\`: learner experience.
- \`components/studio/content-readiness.tsx\`: field-linked checklist.

---

### Task 1: Quest Metadata and Readiness

**Files:**
- Create: \`lib/quest-types.ts\`, \`lib/quest-readiness.ts\`
- Modify: \`lib/types.ts\`, \`lib/library/build-draft.ts\`, \`lib/studio-types.ts\`, \`lib/studio-store.ts\`, \`lib/studio-workflow.ts\`, \`lib/studio-seed.ts\`, \`components/studio/studio-preview.tsx\`, \`lib/public-article-schema.ts\`
- Test: \`tests/quest-readiness.test.ts\` plus existing draft/store/workflow/public-schema tests

**Interfaces:** Produce \`QuestMetadata\`, \`QuestReadinessResult\`, and \`evaluateQuestReadiness(article: Article)\`. Add \`Article.quest?: QuestMetadata\` and matching Studio fields.

- [ ] **Step 1: Write failing propagation/readiness tests**

~~~ts
const quest: QuestMetadata = {
  curiosityQuestionKo: "올빼미는 어떻게 조용히 날까?",
  knowledgeTakeawayKo: "부드러운 깃털 가장자리가 공기 소리를 줄인다.",
  collectionId: "ar1-living-world", mapOrder: 1,
  prerequisiteArticleIds: [], nextArticleIds: ["ar1-ocean-tides"],
};
expect(buildLibraryDraft({ ...seed, quest }).quest).toEqual(quest);
expect(evaluateQuestReadiness({ ...article, quest, heroImage }).checks)
  .toEqual(expect.arrayContaining([expect.objectContaining({ id: "photography", passed: true })]));
~~~

Add negative cases for curiosity, takeaway, attribution, map placement, four questions, two sources, age review, preview acknowledgement, malformed IDs, self-links, and duplicate links. Legacy articles without \`quest\` must still parse.

- [ ] **Step 2: Run focused tests; expect missing-contract failures**

~~~powershell
npm test -- --run tests/quest-readiness.test.ts tests/library-draft.test.ts tests/studio-store.test.ts tests/studio-workflow.test.ts tests/public-article-schema.test.ts
~~~

- [ ] **Step 3: Implement exact types and eight pure checks**

~~~ts
export type QuestMetadata = {
  curiosityQuestionKo: string; knowledgeTakeawayKo: string;
  collectionId: string; mapOrder: number;
  prerequisiteArticleIds: string[]; nextArticleIds: string[];
};
export type QuestReadinessCheckId = "curiosity" | "takeaway" | "photography" | "map-placement" | "learning-materials" | "sources" | "age-review" | "mobile-preview";
export type QuestReadinessCheck = { id: QuestReadinessCheckId; labelKo: string; passed: boolean; field: string; messageKo: string };
export type QuestReadinessResult = { ready: boolean; passed: number; total: number; checks: QuestReadinessCheck[] };
~~~

Reuse \`isArticleHeroImage\`; clone relationship arrays through persistence/publication.

- [ ] **Step 4: Verify and commit**

~~~powershell
npm test -- --run tests/quest-readiness.test.ts tests/library-draft.test.ts tests/studio-store.test.ts tests/studio-workflow.test.ts tests/public-article-schema.test.ts
npm run typecheck
git add lib/quest-types.ts lib/quest-readiness.ts lib/types.ts lib/library/build-draft.ts lib/studio-types.ts lib/studio-store.ts lib/studio-workflow.ts lib/studio-seed.ts components/studio/studio-preview.tsx lib/public-article-schema.ts tests/quest-readiness.test.ts tests/library-draft.test.ts tests/studio-store.test.ts tests/studio-workflow.test.ts tests/public-article-schema.test.ts
git commit -m "feat: add Knowledge Quest readiness contract"
~~~

### Task 2: Learner State v3 and Resume

**Files:** Create \`lib/quest-progress.ts\`; modify learner store/app/reader; test \`quest-progress\`, learner-store, reader.

**Interfaces:** Produce \`ActiveQuestProgress\`, \`setActiveQuest\`, \`advanceActiveQuest\`, \`clearActiveQuest\`.

- [ ] **Step 1: Write failing migration/transition tests**

~~~ts
expect(loadLearnerState(storageWithV2)).toMatchObject({ schemaVersion: 3, activeQuest: null });
const started = setActiveQuest(state, "ar1-owl-flight");
expect(started.activeQuest).toEqual({ articleId: "ar1-owl-flight", phase: "reader", pageIndex: 0 });
expect(clearActiveQuest(started).activeQuest).toBeNull();
~~~

Also test page-2 remount, negative indices, and cross-article transitions.

- [ ] **Step 2: Implement v3 and flow wiring**

~~~ts
export type ActiveQuestProgress = { articleId: string; phase: "reader" | "quiz"; pageIndex: number };
export type LearnerState = {
  schemaVersion: 3; profile: LearnerProfile; attempts: LearningAttempt[];
  completedArticleIds: string[]; savedWords: Array<{ articleId: string; word: string }>;
  activeQuest: ActiveQuestProgress | null;
};
~~~

Migrate v1→v2→v3 without field loss. Persist open/page/phase, resume from Today, clear after recorded completion or explicit exit.

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/quest-progress.test.ts tests/learner-store.test.ts tests/reader-screen.test.tsx
npm run typecheck
git add lib/quest-progress.ts lib/learner-store.ts components/learner-app.tsx components/reader-screen.tsx tests/quest-progress.test.ts tests/learner-store.test.ts tests/reader-screen.test.tsx
git commit -m "feat: preserve resumable quest progress"
~~~

### Task 3: Rewards and Weekly Growth

**Files:** Create \`lib/quest-rewards.ts\`, \`lib/growth-report.ts\`; modify learner store; add focused tests.

**Interfaces:** Produce \`calculateQuestReward\` and \`buildWeeklyGrowth\`; add optional historical attempt fields \`domain\`, \`keyFinderCorrect\`, \`keyFinderSelections\`.

- [ ] **Step 1: Write failing deterministic tests**

~~~ts
expect(calculateQuestReward({ correct: 4, total: 4, keyFinderCorrect: true }))
  .toEqual({ xp: 40, accuracyPercent: 100, masteryLabelKo: "핵심을 정확히 찾았어요" });
expect(buildWeeklyGrowth(attempts, "2026-08-23"))
  .toMatchObject({ activeDays: 5, questCount: 5, totalMinutes: 18, quizAccuracyPercent: 92 });
~~~

Cover zero attempts, duplicate dates, week boundaries, legacy fields, divide-by-zero.

- [ ] **Step 2: Implement exact outputs**

~~~ts
export type QuestReward = { xp: 25 | 30 | 35 | 40; accuracyPercent: number; masteryLabelKo: string };
export type WeeklyGrowth = {
  startLocalDate: string; endLocalDate: string; activeDays: number; questCount: number;
  totalMinutes: number; quizAccuracyPercent: number; keyFinderAccuracyPercent: number | null;
  domainCounts: Partial<Record<KnowledgeDomain, number>>;
  dailyMinutes: Array<{ localDate: string; minutes: number }>;
};
~~~

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/quest-rewards.test.ts tests/growth-report.test.ts tests/learner-store.test.ts
npm run typecheck
git add lib/quest-rewards.ts lib/growth-report.ts lib/learner-store.ts tests/quest-rewards.test.ts tests/growth-report.test.ts tests/learner-store.test.ts
git commit -m "feat: calculate quest rewards and weekly growth"
~~~

### Task 4: Representative Metadata and Map Model

**Files:** Create \`lib/library/ar1-07-quests.ts\`, \`lib/knowledge-quest-map.ts\`; modify batch 07; test map/library/images.

**Interfaces:** Produce \`buildKnowledgeMap(articles, completedIds)\` and \`nextQuestFromMap(nodes, articleId)\`.

- [ ] **Step 1: Write failing content/relationship tests**

~~~ts
expect(Object.keys(AR1_BATCH_07_QUESTS)).toHaveLength(15);
expect(AR1_BATCH_07.every((seed) => seed.quest && seed.heroImage)).toBe(true);
expect(buildKnowledgeMap(articles, ["ar1-owl-flight"]))
  .toEqual(expect.arrayContaining([expect.objectContaining({ articleId: "ar1-owl-flight", state: "completed" })]));
~~~

Assert unique collection/order, resolved references, no self-link, reciprocal next/prerequisite.

- [ ] **Step 2: Implement coherent short collections and map states**

~~~ts
export type KnowledgeMapNode = {
  article: Article; articleId: string; collectionId: string; order: number;
  state: "available" | "recommended" | "completed" | "locked";
};
~~~

Only published articles enter learner maps; Studio may project drafts in preview.

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/knowledge-quest-map.test.ts tests/library.test.ts tests/article-hero-images.test.ts
npm run typecheck
git add lib/library/ar1-07-quests.ts lib/knowledge-quest-map.ts lib/library/ar1-07.ts tests/knowledge-quest-map.test.ts tests/library.test.ts tests/article-hero-images.test.ts
git commit -m "content: connect representative quests to the knowledge map"
~~~

### Task 5: Learner Shell and Visual System

**Files:** Modify app shell, learner app, three CSS files; test app shell/learner app.

**Interfaces:** \`Destination = "today" | "map" | "explore" | "profile" | "learn"\`; persistent labels 오늘/지식지도/탐험/나.

- [ ] **Step 1: Read required installed Next.js docs to EOF**

~~~powershell
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/public-folder.md
~~~

- [ ] **Step 2: Write failing navigation/accessibility tests**

~~~ts
expect(screen.getByRole("button", { name: "오늘" })).toHaveAttribute("aria-current", "page");
expect(screen.getByRole("button", { name: "지식지도" })).toBeVisible();
expect(screen.getByRole("navigation", { name: "주요 메뉴" }).querySelectorAll("button")).toHaveLength(4);
~~~

- [ ] **Step 3: Implement local CSS/SVG icons, 44px targets, focus and reduced motion**

No icon dependency. Hide persistent navigation during focused learning. Alias existing colors to semantic tokens.

- [ ] **Step 4: Verify and commit**

~~~powershell
npm test -- --run tests/app-shell.test.tsx tests/learner-app.test.tsx
npm run typecheck
git add components/app-shell.tsx components/learner-app.tsx app/globals.css app/key-finder.css app/knowledge-map.css tests/app-shell.test.tsx tests/learner-app.test.tsx
git commit -m "feat: introduce the Knowledge Quest learner shell"
~~~

### Task 6: Today and Photography-Led Explore

**Files:** Create \`today-screen.tsx\`; modify home, explore, learner app, CSS; add Today/Explore tests.

**Interfaces:** \`TodayScreen({ state, articles, onStart, onOpenMap, onExplore })\`; consumes ranking, photo, resume, map completion.

- [ ] **Step 1: Write failing UI/filter tests**

~~~ts
expect(screen.getByRole("button", { name: "오늘의 발견 시작하기" })).toBeVisible();
expect(screen.getByText(/지식지도 \d+% 완성/)).toBeVisible();
~~~

Cover 이어 읽기, empty catalog, photo fallback, query/domain/AR/collection combinations, legacy articles.

- [ ] **Step 2: Implement one dominant action and preserve legacy Explore**

Legacy articles group under \`기존 라이브러리\`; never disappear because quest metadata is absent.

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/today-screen.test.tsx tests/explore.test.tsx tests/recommendation.test.ts
npm run typecheck
git add components/today-screen.tsx components/home-screen.tsx components/explore-screen.tsx components/learner-app.tsx app/globals.css tests/today-screen.test.tsx tests/explore.test.tsx tests/recommendation.test.ts
git commit -m "feat: focus discovery on the daily Knowledge Quest"
~~~

### Task 7: Reader and One-Screen Result

**Files:** Create knowledge card/result; modify reader/completion/learner app/CSS; add result and regression tests.

**Interfaces:** Consume \`QuestReward\` and optional quest metadata; emit \`{ type: "key_finder_check"; detail: "correct" | "incorrect" }\`.

- [ ] **Step 1: Write failing result/reader tests**

~~~ts
expect(screen.getByText(article.quest!.knowledgeTakeawayKo)).toBeVisible();
expect(screen.getByText("+40")).toBeVisible();
expect(screen.getByRole("button", { name: "지식지도에서 확인" })).toBeVisible();
~~~

Assert one primary action, legacy copy, key-finder events, resume, safe credits, photo/audio failure.

- [ ] **Step 2: Implement single reward calculation and result**

Calculate in LearnerApp, record enriched attempt, clear progress, pass reward to UI. Never recalculate XP in a component.

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/quest-result-screen.test.tsx tests/reader-screen.test.tsx tests/learner-app.test.tsx
npm run typecheck
git add components/knowledge-card.tsx components/quest-result-screen.tsx components/reader-screen.tsx components/completion-screen.tsx components/learner-app.tsx app/globals.css app/key-finder.css tests/quest-result-screen.test.tsx tests/reader-screen.test.tsx tests/learner-app.test.tsx
git commit -m "feat: complete quests with meaningful knowledge feedback"
~~~

### Task 8: Knowledge Map and Growth Report

**Files:** Create map/growth components; modify profile/learner app/CSS; add three component tests.

**Interfaces:** Consume \`KnowledgeMapNode[]\`, \`WeeklyGrowth\`; produce accessible completed/recommended/locked controls and text chart summaries.

- [ ] **Step 1: Write failing component tests**

~~~ts
expect(screen.getByRole("heading", { name: "나의 지식지도" })).toBeVisible();
expect(screen.getByRole("button", { name: /다음 추천/ })).toBeEnabled();
expect(screen.getByText(/이번 주.*5개/)).toBeVisible();
~~~

Cover lock text, stable order, broken links, reduced motion, empty report, nullable key-finder accuracy.

- [ ] **Step 2: Implement vertical-first responsive map/report**

At 320px use an ordered vertical path; alternate nodes only when wide. Keep existing level/reset below growth.

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/knowledge-map-screen.test.tsx tests/growth-report-component.test.tsx tests/profile-screen.test.tsx
npm run typecheck
git add components/knowledge-map-screen.tsx components/growth-report.tsx components/profile-screen.tsx components/learner-app.tsx app/knowledge-map.css app/globals.css tests/knowledge-map-screen.test.tsx tests/growth-report-component.test.tsx tests/profile-screen.test.tsx
git commit -m "feat: visualize knowledge and weekly reading growth"
~~~

### Task 9: Studio Readiness UI

**Files:** Create readiness component; modify editor/dashboard/app/validation labels/CSS; add readiness/dashboard/workflow tests.

**Interfaces:** Consume \`evaluateQuestReadiness(projectWorkingArticle(article))\`; produce eight field links without changing approval predicates.

- [ ] **Step 1: Write failing panel/publication tests**

~~~ts
expect(screen.getAllByTestId("readiness-check")).toHaveLength(8);
expect(screen.getByText("사진·출처 정보")).toBeVisible();
expect(screen.getByRole("link", { name: "사진·출처 정보 수정" }))
  .toHaveAttribute("href", "#studio-field-heroImage");
~~~

Prove 8/8 cannot bypass fact/language/age/preview/final approval. Legacy publication remains unchanged.

- [ ] **Step 2: Implement checklist and metadata controls**

Use selectable article IDs for relationships, not CSV. Seed photo attribution remains read-only in this milestone.

- [ ] **Step 3: Verify and commit**

~~~powershell
npm test -- --run tests/content-readiness.test.tsx tests/studio-dashboard.test.tsx tests/studio-workflow.test.ts
npm run typecheck
git add components/studio/content-readiness.tsx components/studio/article-editor.tsx components/studio/studio-dashboard.tsx components/studio/studio-app.tsx lib/studio-validation-ui.ts app/globals.css tests/content-readiness.test.tsx tests/studio-dashboard.test.tsx tests/studio-workflow.test.ts
git commit -m "feat: expose Knowledge Quest readiness in Studio"
~~~

### Task 10: Offline and Release Verification

**Files:** Modify service worker/register, mobile E2E, Studio E2E, README; create desktop E2E and offline test.

**Interfaces:** Produce cache \`nonfiction-lab-v3\`, bounded representative caching, complete evidence.

- [ ] **Step 1: Write failing offline tests**

~~~ts
expect(serviceWorkerSource).toContain('const CACHE_NAME = "nonfiction-lab-v3"');
expect(serviceWorkerSource).toContain("/article-images/ar1-batch-07/owl-flight.jpg");
expect(serviceWorkerSource).not.toContain("cache.addAll(all100Photographs)");
~~~

Require shell/representative precache, same-origin successful runtime cache, old-cache cleanup, no Studio mutations/external pages.

- [ ] **Step 2: Extend E2E**

Publish one representative quest through existing Studio review helpers, then exercise Today → Reader → Find → Quiz → Result → Map. Add reload resume, image/audio failure, persisted completion, and 390x844/768x1024/1440x1000 overflow checks.

- [ ] **Step 3: Implement bounded caching/update notice**

Cache only successful same-origin GET. Apply new worker on next navigation, never during an active quest.

- [ ] **Step 4: Run complete verification**

~~~powershell
npm run verify
git diff --check
~~~

- [ ] **Step 5: Browser visual QA**

Inspect Today, Reader, Result, Map, Explore, Me, Studio at phone/tablet sizes. Confirm content, no overlay/console errors, crops, credits, focus, reduced motion.

- [ ] **Step 6: Document and commit**

README documents four destinations, Quest loop, readiness, attribution, offline behavior, and milestone exclusions.

~~~powershell
git add public/sw.js components/service-worker-register.tsx e2e/learner-journey.spec.ts e2e/studio-publishing.spec.ts e2e/knowledge-quest.desktop.spec.ts tests/offline-assets.test.ts README.md
git commit -m "test: verify the competitive Knowledge Quest foundation"
~~~

## Follow-On Plans

1. Curate and attribute photographs for the remaining 85 seeds.
2. Build the 35-quest core paths, then complete all 100 relationships.
3. Add cloud accounts, synchronization, subscriptions, Play Billing, and Android packaging.

