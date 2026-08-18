# 콘텐츠 검수·승인 스튜디오 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 한 명의 편집자가 콘텐츠를 작성하고 순차 검수·승인·발행하며, 승인된 발행 버전만 학습자 앱에 노출되는 로컬 콘텐츠 스튜디오를 구현한다.

**Architecture:** 편집 가능한 `StudioArticle`과 학습자용 `Article`을 분리하고, 순수 도메인 함수가 상태 전이·검증·발행 스냅샷 생성을 담당한다. 버전이 있는 localStorage 저장소가 편집 데이터와 발행 스냅샷을 보존하며 `/studio` UI와 학습자 앱은 저장소의 공개 조회 인터페이스를 공유한다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 7, browser localStorage, Vitest, Testing Library, Playwright

## Global Constraints

- 첫 버전은 단일 로컬 편집자 프로필을 사용하며 로그인·서버 데이터베이스·실시간 협업은 구현하지 않는다.
- 워크플로는 `초안 → 사실·출처 검수 완료 → 영어·AR 검수 완료 → 연령 적합성 검수 완료 → 최종 승인 → 발행` 순서를 강제한다.
- 논픽션랩 추정 AR과 권장 연령은 별도 필드로 저장하고 공식 ATOS 인증 점수로 표현하지 않는다.
- 미승인 콘텐츠와 발행 취소 콘텐츠는 학습자 공개 조회 결과에서 제외한다.
- 발행 후 편집은 새 작업 버전에서 수행하며 새 버전 발행 전까지 기존 발행 스냅샷을 유지한다.
- 원문 복제나 외부 자료 자동 수집은 하지 않으며 공식적으로 허용된 임베드 URL만 저장한다.
- 기존 학습자 데이터 스키마와 완료 기록을 손상하지 않는다.

---

## 파일 구조

- `lib/studio-types.ts`: 편집 콘텐츠, 검수 단계, 버전, 공개 스냅샷 타입
- `lib/studio-workflow.ts`: 검증, 순차 상태 전이, 수정 영향 범위, 발행 규칙
- `lib/studio-store.ts`: 버전이 있는 localStorage 직렬화와 공개 콘텐츠 조회
- `lib/studio-seed.ts`: 기존 샘플 콘텐츠를 초기 발행 스냅샷으로 변환
- `components/studio/studio-app.tsx`: 스튜디오 화면 상태와 저장소 연결
- `components/studio/studio-dashboard.tsx`: 상태 요약과 콘텐츠 목록
- `components/studio/article-editor.tsx`: 콘텐츠 필드 편집
- `components/studio/review-panel.tsx`: 단계별 체크리스트와 승인·발행 동작
- `components/studio/studio-preview.tsx`: 학습자용 모바일 미리보기
- `app/studio/page.tsx`: 스튜디오 진입점
- `tests/studio-workflow.test.ts`: 도메인 규칙
- `tests/studio-store.test.ts`: 저장·복구·공개 조회
- `tests/studio-dashboard.test.tsx`: 목록·필터·상태 집계
- `tests/studio-editor.test.tsx`: 편집·검증·검수 흐름
- `tests/content-integration.test.tsx`: 학습자 앱 공개 콘텐츠 연동
- `e2e/studio-publishing.spec.ts`: 초안부터 발행과 발행 취소까지 모바일 통합 여정

---

### Task 1: 콘텐츠 스튜디오 도메인 모델과 순차 검수 규칙

**Files:**
- Create: `lib/studio-types.ts`
- Create: `lib/studio-workflow.ts`
- Create: `tests/studio-workflow.test.ts`
- Create: `tests/studio-fixtures.ts`

**Interfaces:**
- Produces: `StudioArticle`, `ReviewStage`, `WorkflowStatus`, `ValidationIssue`, `validateStage(article, stage)`, `completeStage(article, stage, actor, now)`, `applyArticleEdit(article, patch, now)`, `approveArticle(article, actor, now)`, `publishArticle(article, now)`, `withdrawArticle(article, now)`
- Consumes: 기존 `Article`, `KnowledgeDomain`, `InterestBand`, `VocabularyItem`, `QuizQuestion`, `SourceRef`

- [x] **Step 1: 실패하는 워크플로 테스트 작성**

```ts
import { describe, expect, test } from "vitest";
import { completeStage, validateStage } from "@/lib/studio-workflow";
import { makeStudioArticle } from "./studio-fixtures";

test("출처가 없으면 사실 검수를 완료하지 못한다", () => {
  const article = makeStudioArticle({ sources: [] });
  expect(validateStage(article, "facts")).toContainEqual(
    expect.objectContaining({ field: "sources", code: "source_required" }),
  );
  expect(() => completeStage(article, "facts", "편집자", "2026-08-17T10:00:00.000Z"))
    .toThrow("사실·출처 검수를 완료할 수 없습니다.");
});

test("앞 단계를 건너뛸 수 없다", () => {
  const article = makeStudioArticle();
  expect(() => completeStage(article, "language", "편집자", "2026-08-17T10:00:00.000Z"))
    .toThrow("이전 검수 단계를 먼저 완료해 주세요.");
});
```

- [x] **Step 2: 테스트가 기능 부재로 실패하는지 확인**

Run: `npm test -- tests/studio-workflow.test.ts`
Expected: FAIL because `@/lib/studio-workflow` and its exports do not exist.

- [x] **Step 3: 타입과 최소 순수 함수 구현**

`StudioArticle`에는 `workingVersion`, `publishedSnapshot`, `workflowStatus`, `reviewRecords`, `editor`, `updatedAt`, `changeLog`, `ageRange`, `learningGoal`, `keySentence`, `keyConcept`, `sourceNotes`, `media`를 정의한다. `completeStage`는 `facts → language → age` 순서를 검사하고 단계별 `ValidationIssue[]`가 비어 있을 때만 새 객체를 반환한다.

- [x] **Step 4: 수정 무효화·승인·발행 테스트를 먼저 추가**

```ts
test("본문 수정은 영어 검수 이후 기록과 승인을 해제한다", () => {
  const reviewed = makeFullyReviewedArticle();
  const edited = applyArticleEdit(reviewed, { pages: ["Changed text."] }, "2026-08-18T09:00:00.000Z");
  expect(edited.reviewRecords.facts).not.toBeNull();
  expect(edited.reviewRecords.language).toBeNull();
  expect(edited.reviewRecords.age).toBeNull();
  expect(edited.approval).toBeNull();
});

test("새 작업 버전은 재발행 전까지 기존 발행 스냅샷을 유지한다", () => {
  const published = makePublishedArticle();
  const edited = applyArticleEdit(published, { title: "New title" }, "2026-08-18T09:00:00.000Z");
  expect(edited.publishedSnapshot?.title).toBe(published.publishedSnapshot?.title);
  expect(edited.workingVersion).toBe(published.workingVersion + 1);
});
```

- [x] **Step 5: 테스트 실패 확인 후 최소 승인·발행 규칙 구현**

Run: `npm test -- tests/studio-workflow.test.ts`
Expected: FAIL on missing invalidation and snapshot behavior; implement field-to-stage invalidation map, approval guard, snapshot creation, and withdrawal timestamp.

- [x] **Step 6: 도메인 테스트 통과 확인 및 커밋**

Run: `npm test -- tests/studio-workflow.test.ts`
Expected: PASS with all workflow tests.

```bash
git add lib/studio-types.ts lib/studio-workflow.ts tests/studio-workflow.test.ts tests/studio-fixtures.ts
git commit -m "feat: add content review workflow domain"
```

---

### Task 2: 버전형 로컬 저장소와 학습자 공개 조회

**Files:**
- Create: `lib/studio-store.ts`
- Create: `lib/studio-seed.ts`
- Create: `tests/studio-store.test.ts`
- Modify: `tests/studio-fixtures.ts`
- Modify: `lib/content.ts`

**Interfaces:**
- Consumes: `StudioArticle`, `PublishedSnapshot`, `SAMPLE_ARTICLES`
- Produces: `loadStudioState(storage)`, `saveStudioState(storage, state)`, `upsertStudioArticle(state, article)`, `getPublicArticles(state)`, `backupCorruptStudioState(storage, raw)`, `createSeedStudioState()`

- [x] **Step 1: 저장·공개 조회 실패 테스트 작성**

```ts
test("승인되어 발행된 스냅샷만 공개한다", () => {
  const draft = makeStudioArticle({ id: "draft" });
  const published = makePublishedArticle({ id: "live" });
  const withdrawn = withdrawArticle(makePublishedArticle({ id: "off" }), "2026-08-18T10:00:00.000Z");
  expect(getPublicArticles({ schemaVersion: 1, articles: [draft, published, withdrawn] }).map((item) => item.id))
    .toEqual(["live"]);
});

test("손상된 저장값을 백업하고 시드 상태로 복구한다", () => {
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": "{" });
  const state = loadStudioState(storage);
  expect(state.articles.length).toBeGreaterThan(0);
  expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBe("{");
});
```

- [x] **Step 2: 기능 부재로 실패 확인**

Run: `npm test -- tests/studio-store.test.ts`
Expected: FAIL because the store functions do not exist.

- [x] **Step 3: 저장소와 기존 샘플 시드 변환 구현**

저장 키는 `nonfiction-lab:studio:v1`, 손상 백업 키는 `nonfiction-lab:studio:corrupt-backup`으로 고정한다. 기존 여섯 샘플은 승인·발행된 `PublishedSnapshot`으로 변환해 첫 실행에서도 학습자 앱 콘텐츠가 유지되게 한다.

- [x] **Step 4: 공개 조회 테스트 통과 및 `lib/content.ts` 어댑터 구현**

`getPublishedArticles(storage?: Storage)`는 브라우저 저장소가 전달되면 스튜디오 공개 스냅샷을 반환하고, 서버 렌더링이나 테스트에서 저장소가 없으면 기존 샘플을 반환한다. `getArticleById(id, storage?)`도 같은 경로를 사용한다.

- [x] **Step 5: 저장소와 기존 회귀 테스트 실행 및 커밋**

Run: `npm test -- tests/studio-store.test.ts tests/content.test.ts`
Expected: PASS.

```bash
git add lib/studio-store.ts lib/studio-seed.ts lib/content.ts tests/studio-store.test.ts tests/studio-fixtures.ts tests/content.test.ts
git commit -m "feat: persist reviewed content versions locally"
```

---

### Task 3: 스튜디오 대시보드와 콘텐츠 탐색

**Files:**
- Create: `app/studio/page.tsx`
- Create: `components/studio/studio-app.tsx`
- Create: `components/studio/studio-dashboard.tsx`
- Create: `tests/studio-dashboard.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `loadStudioState`, `saveStudioState`, `StudioArticle`, `WorkflowStatus`
- Produces: `StudioApp`, `StudioDashboard`, `StudioFilter`, `summarizeStudioArticles(articles)`

- [x] **Step 1: 대시보드 실패 테스트 작성**

```tsx
test("상태별 수를 표시하고 제목과 상태로 필터링한다", async () => {
  const user = userEvent.setup();
  render(<StudioDashboard articles={[makeStudioArticle({ title: "Stars" }), makePublishedArticle({ title: "Tea" })]} onCreate={vi.fn()} onOpen={vi.fn()} />);
  expect(screen.getByText("초안 1")).toBeInTheDocument();
  expect(screen.getByText("발행 완료 1")).toBeInTheDocument();
  await user.type(screen.getByRole("searchbox"), "Tea");
  expect(screen.queryByText("Stars")).not.toBeInTheDocument();
  expect(screen.getByText("Tea")).toBeInTheDocument();
});
```

- [x] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/studio-dashboard.test.tsx`
Expected: FAIL because dashboard components do not exist.

- [x] **Step 3: 대시보드와 `/studio` 셸 최소 구현**

대시보드는 상태 카드, 검색, 상태·분야·AR·연령 필터, 최근 수정순 목록, 새 콘텐츠 버튼을 제공한다. 상태는 색상뿐 아니라 한국어 텍스트와 아이콘으로 구분한다.

- [x] **Step 4: 반응형 스튜디오 디자인 구현**

기존 CSS 변수와 포레스트 그린·라임 색을 재사용한다. 데스크톱은 정보 밀도 높은 목록, 모바일은 카드 목록으로 전환하고 모든 폼 컨트롤에 레이블과 포커스 스타일을 둔다.

- [x] **Step 5: 대시보드 테스트·타입 검사 및 커밋**

Run: `npm test -- tests/studio-dashboard.test.tsx && npm run lint`
Expected: PASS and TypeScript exits 0.

```bash
git add app/studio/page.tsx components/studio/studio-app.tsx components/studio/studio-dashboard.tsx app/globals.css tests/studio-dashboard.test.tsx
git commit -m "feat: add content studio dashboard"
```

---

### Task 4: 콘텐츠 편집기와 단계별 검수 패널

**Files:**
- Create: `components/studio/article-editor.tsx`
- Create: `components/studio/review-panel.tsx`
- Create: `components/studio/studio-preview.tsx`
- Create: `tests/studio-editor.test.tsx`
- Modify: `components/studio/studio-app.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `validateStage`, `completeStage`, `applyArticleEdit`, `approveArticle`, `publishArticle`, `withdrawArticle`, `ReaderScreen`
- Produces: `ArticleEditor`, `ReviewPanel`, `StudioPreview`

- [x] **Step 1: 편집과 검수 실패 테스트 작성**

```tsx
test("누락된 출처를 표시하고 사실 검수 완료를 막는다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ sources: [] })} />);
  await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));
  expect(screen.getByText("출처를 한 개 이상 추가해 주세요.")).toBeInTheDocument();
  expect(screen.queryByText("사실·출처 검수 완료됨")).not.toBeInTheDocument();
});

test("모든 단계를 완료한 뒤에만 승인과 발행이 활성화된다", () => {
  render(<StudioEditorHarness initialArticle={makeFullyReviewedArticle()} />);
  expect(screen.getByRole("button", { name: "최종 승인" })).toBeEnabled();
  expect(screen.getByRole("button", { name: "발행" })).toBeDisabled();
});
```

- [x] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/studio-editor.test.tsx`
Expected: FAIL because editor components do not exist.

- [x] **Step 3: 섹션형 콘텐츠 편집기 구현**

기본 정보, 난이도·연령, 학습 내용, 어휘, 퀴즈, 출처·미디어, 운영 기록을 독립 섹션으로 만든다. 배열 항목은 추가·수정·제거가 가능하며 변경마다 `applyArticleEdit`를 호출하고 저장 상태를 표시한다.

- [x] **Step 4: 검수 패널과 단계별 오류 연결 구현**

각 단계는 완료 조건, 완료자·시간, 누락 필드로 이동하는 링크를 표시한다. 승인 버튼은 세 단계 완료 후에만, 발행 버튼은 현재 작업 버전 승인 후에만 활성화한다. 발행 취소는 확인 UI를 거친다.

- [x] **Step 5: 실제 리더를 재사용한 모바일 미리보기 구현**

`StudioPreview`는 작업 버전을 `Article` 형태로 투영해 `ReaderScreen`을 읽기 전용으로 렌더링한다. 미리보기 동작은 저장이나 학습 기록을 만들지 않는다.

- [x] **Step 6: 편집기 테스트·접근성 쿼리·타입 검사 및 커밋**

Run: `npm test -- tests/studio-editor.test.tsx && npm run lint`
Expected: PASS and no TypeScript errors.

```bash
git add components/studio/article-editor.tsx components/studio/review-panel.tsx components/studio/studio-preview.tsx components/studio/studio-app.tsx app/globals.css tests/studio-editor.test.tsx
git commit -m "feat: add staged article review editor"
```

---

### Task 5: 학습자 앱과 발행 콘텐츠 실시간 연동

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/learner-app.tsx`
- Modify: `lib/content.ts`
- Create: `tests/content-integration.test.tsx`
- Modify: `tests/learning-flow.test.tsx`

**Interfaces:**
- Consumes: `getPublicArticles`, browser `Storage`
- Produces: 저장소에서 발행 스냅샷을 읽는 `LearnerApp`; 기존 props와 학습 기록 동작은 유지

- [x] **Step 1: 공개 콘텐츠 연동 실패 테스트 작성**

```tsx
test("학습자 홈에는 발행 콘텐츠만 나타난다", () => {
  const storage = createStudioStorage([makeStudioArticle({ title: "Hidden" }), makePublishedArticle({ title: "Visible" })]);
  render(<LearnerApp initialState={createOnboardedState()} storage={storage} />);
  expect(screen.getByText("Visible")).toBeInTheDocument();
  expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
});
```

- [x] **Step 2: 기존 정적 조회 때문에 실패하는지 확인**

Run: `npm test -- tests/content-integration.test.tsx`
Expected: FAIL because `LearnerApp` still reads static sample content.

- [x] **Step 3: 학습자 앱 조회를 저장소 기반으로 변경**

렌더 시 한 번 공개 콘텐츠를 읽고, 홈·탐색·연결 콘텐츠가 동일한 배열을 사용하게 한다. 저장소가 비어 있는 첫 실행에는 시드 발행 콘텐츠를 초기화한다.

- [x] **Step 4: 발행 취소와 기존 학습 기록 보존 테스트 추가·구현**

발행 취소된 콘텐츠가 추천·탐색에서 사라져도 `LearnerState.attempts`의 기존 `articleId`, 점수, XP는 그대로 유지되는지 검증한다.

- [x] **Step 5: 학습자 회귀 테스트와 타입 검사 및 커밋**

Run: `npm test -- tests/content-integration.test.tsx tests/learning-flow.test.tsx tests/home-screen.test.tsx tests/explore.test.tsx && npm run lint`
Expected: PASS.

```bash
git add app/page.tsx components/learner-app.tsx lib/content.ts tests/content-integration.test.tsx tests/learning-flow.test.tsx
git commit -m "feat: show approved studio content to learners"
```

---

### Task 6: 전체 발행 여정 E2E와 최종 검증

**Files:**
- Create: `e2e/studio-publishing.spec.ts`
- Modify: `playwright.config.ts` only if `/studio` is not reachable with the existing server configuration
- Modify: `README.md` only if it is already tracked; otherwise document commands in the committed plan only

**Interfaces:**
- Consumes: 완성된 `/studio`, `/`, localStorage 저장소
- Produces: 초안 생성부터 학습자 노출·발행 취소까지 검증하는 브라우저 테스트

- [x] **Step 1: 실패하는 E2E 여정 작성**

```ts
test("편집자가 검수한 콘텐츠만 학습자에게 발행한다", async ({ page }) => {
  await page.goto("/studio");
  await page.getByRole("button", { name: "새 콘텐츠" }).click();
  await fillValidThreeMinuteArticle(page, { title: "How Ants Work Together" });
  await page.getByRole("button", { name: "사실·출처 검수 완료" }).click();
  await page.getByRole("button", { name: "영어·AR 검수 완료" }).click();
  await page.getByRole("button", { name: "연령 적합성 검수 완료" }).click();
  await page.getByRole("button", { name: "최종 승인" }).click();
  await page.getByRole("button", { name: "발행" }).click();
  await page.goto("/");
  await expect(page.getByText("How Ants Work Together")).toBeVisible();
});
```

- [x] **Step 2: E2E 실패 원인을 확인하고 테스트용 입력 헬퍼 완성**

Run: `npm run test:e2e -- e2e/studio-publishing.spec.ts`
Expected: FAIL only on an incomplete UI behavior or selector; fix the product behavior, not assertions that express the approved spec.

- [x] **Step 3: 발행 취소 후 비노출되는 여정 추가**

같은 브라우저 컨텍스트에서 `/studio`로 돌아가 콘텐츠를 발행 취소한 뒤 `/`의 홈과 탐색에서 제목이 사라지는지 확인한다.

- [x] **Step 4: 전체 검증 실행**

Run: `npm run verify` (= `npm test && npm run lint && npm run build && npm run test:e2e`)
Expected: 모든 Vitest 파일 통과, TypeScript exit 0, Next.js production build exit 0, 기존 학습자 및 새 스튜디오 Playwright 여정 통과.

E2E는 `reuseExistingServer: false`로 항상 자체 dev 서버를 띄운다. 남아 있는 dev 서버를 재사용하면 정적 청크가 403이어도 url 확인은 200을 돌려주기 때문에 모든 테스트가 30초 타임아웃으로 잘못 실패한다.

- [x] **Step 5: 요구사항 대조와 최종 커밋**

설계서의 완료 조건을 한 줄씩 대조해 누락이 없는지 확인하고, `git diff --check`로 공백 오류가 없는지 확인한다.

```bash
git add e2e/studio-publishing.spec.ts playwright.config.ts
git commit -m "test: cover studio publishing journey"
```
