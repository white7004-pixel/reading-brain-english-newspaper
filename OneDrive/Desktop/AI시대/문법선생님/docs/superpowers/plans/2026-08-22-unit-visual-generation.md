# 98 Unit-Matched Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 승인된 98개 강의 각각에 내용과 직접 대응하는 고유 16:9 이미지를 한 번 생성하고 정적 앱에 연결한다.

**Architecture:** 강의 데이터에서 결정론적인 이미지 명세와 프롬프트를 만들고, 이미지 제공자와 재개 가능한 실행기가 PNG를 저장한다. 단원 ID가 이미지 레지스트리의 키가 되며 기존 12개 문법군 이미지는 실패 시 폴백으로 유지한다.

**Tech Stack:** Node.js ES modules, OpenAI JavaScript SDK Images API, Node built-in test runner, local PNG assets, Playwright

**Spec:** `docs/superpowers/specs/2026-08-22-pdf-one-time-grammar-generation-design.md`

## Global Constraints

- 이미지 모델은 `OPENAI_IMAGE_MODEL`로 명시하고 코드에 최신 모델명을 고정하지 않는다.
- 이미지마다 단원 제목, `hook`, `analogy`, 첫 대표 예문 중 적어도 두 요소와 장면이 대응해야 한다.
- 공통 스타일은 한국 중학생 실사 장면, 고급 교육 광고 품질, 네이비·샴페인 골드, 16:9, 글자·로고·워터마크 없음이다.
- 승인된 이미지와 일치하는 해시는 재생성하지 않는다.
- 학생 실행 시 외부 네트워크 요청이 없어야 한다.
- 각 코드 변경은 실패 테스트 → 최소 구현 → 전체 테스트 → 해당 경로만 커밋 순서로 진행한다.

---

### Task 1: 단원별 이미지 명세와 프롬프트

**Files:**
- Create: `js/generation/visual-specs.js`
- Create: `tests/visual-specs.test.js`
- Create: `scripts/build_visual_specs.mjs`

**Interfaces:**
- Produces: `buildVisualSpec(lesson): VisualSpec`, `buildVisualPrompt(spec): string`

- [ ] **Step 1: 강의 내용 대응 실패 테스트 작성**

```js
test('visual prompt includes the unit concept and representative situation', () => {
  const spec = buildVisualSpec(LESSONS['b1-c5-u1']);
  const prompt = buildVisualPrompt(spec);
  assert.match(prompt, /셀 수 있는 명사와 셀 수 없는 명사/);
  assert.match(prompt, new RegExp(escapeRegExp(LESSONS['b1-c5-u1'].analogy.slice(0, 12))));
  assert.match(prompt, /no text|글자 없음/i);
});
```

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/visual-specs.test.js`
Expected: FAIL

- [ ] **Step 3: 명세와 프롬프트 구현**

명세는 `unitId`, `title`, `concept`, `situation`, `exampleMeaning`, `alt`, `fallbackKey`, `promptHash`를 가진다. 영어 문장 자체를 이미지 속 글자로 요구하지 않고 한국어 의미를 장면으로 변환한다. 공통 스타일과 금지 항목은 한 함수에서만 정의한다.

- [ ] **Step 4: 98개 명세 검사**

Run: `node scripts/build_visual_specs.mjs`
Expected: `generated/specs/visuals/`에 98개 JSON, 빈 상황·대체 텍스트 0개.

- [ ] **Step 5: 테스트와 커밋**

```powershell
npm test
git add -- js/generation/visual-specs.js tests/visual-specs.test.js scripts/build_visual_specs.mjs generated/specs/visuals
git commit -m "feat: derive 98 lesson-matched visual prompts"
```

---

### Task 2: 이미지 생성 제공자와 파일 검사

**Files:**
- Create: `js/generation/openai-images.js`
- Create: `js/generation/png-inspection.js`
- Create: `tests/openai-images.test.js`
- Create: `tests/png-inspection.test.js`

**Interfaces:**
- Produces: `createImageGenerator({ client, model }): { generate(prompt): Promise<Buffer> }`, `inspectPng(buffer): { width,height,colorType }`

- [ ] **Step 1: 가짜 API 응답 디코딩 실패 테스트 작성**

가짜 client는 16:9 PNG fixture의 base64를 반환한다. 생성기가 Buffer를 반환하고 검사기가 실제 폭·높이·PNG 서명을 읽는지 확인한다.

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/openai-images.test.js tests/png-inspection.test.js`
Expected: FAIL

- [ ] **Step 3: 제공자와 PNG 검사 구현**

실행 시점에 설치된 SDK와 공식 OpenAI 이미지 생성 문서를 대조한다. 제공자는 `OPENAI_IMAGE_MODEL`과 16:9에 가장 가까운 지원 크기를 사용하고 base64 결과를 Buffer로 변환한다. 검사기는 PNG 서명, IHDR 폭·높이, 최소 1,000,000픽셀, 비율 1.65–1.85를 검증한다.

- [ ] **Step 4: 테스트 실행**

Run: `node --test tests/openai-images.test.js tests/png-inspection.test.js && npm test`
Expected: PASS, 실제 네트워크 호출 0회.

- [ ] **Step 5: 커밋**

```powershell
git add -- js/generation/openai-images.js js/generation/png-inspection.js tests/openai-images.test.js tests/png-inspection.test.js
git commit -m "feat: generate and validate local lesson images"
```

---

### Task 3: 재개 가능한 98개 이미지 생성 CLI

**Files:**
- Create: `js/generation/run-images.js`
- Create: `scripts/generate_lesson_images.mjs`
- Create: `tests/generate-images.test.js`
- Create: `assets/lesson-visuals/.gitkeep`

**Interfaces:**
- Produces: `runImageGeneration({ specs, manifest, generate, writeImage, forceIds }): GenerationSummary`

- [ ] **Step 1: 건너뛰기·원자 저장·실패 격리 테스트 작성**

세 단원 fixture로 완료 1개 건너뛰기, 성공 1개 저장, 실패 1개 상태 보존을 검증한다. 임시 파일이 성공 후 `<unit-id>.png`로 바뀌고 실패 시 남지 않는지도 확인한다.

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/generate-images.test.js`
Expected: FAIL

- [ ] **Step 3: 실행기와 CLI 구현**

CLI는 `--dry-run`, `--limit <n>`, `--force <unit-id>`를 제공한다. 각 성공 후 `assets/lesson-visuals/<unit-id>.png`와 매니페스트를 즉시 저장한다. 자격 증명과 모델 환경 변수가 없으면 호출 전 종료한다.

- [ ] **Step 4: dry-run과 1장 실제 생성**

Run: `node scripts/generate_lesson_images.mjs --dry-run`
Expected: 생성 예정·건너뜀·예상 경로 출력, 호출 0회.

환경 변수가 준비된 경우 Run: `node scripts/generate_lesson_images.mjs --limit 1`
Expected: 첫 단원 PNG 1개 생성, 크기·비율 검사 통과, 매니페스트 기록.

- [ ] **Step 5: 테스트와 커밋**

```powershell
npm test
git add -- js/generation/run-images.js scripts/generate_lesson_images.mjs tests/generate-images.test.js assets/lesson-visuals generated/manifest.json
git commit -m "feat: add resumable 98-image generation"
```

---

### Task 4: 98개 이미지 생성과 시각 검수 목록

**Files:**
- Create: `scripts/build_visual_review.mjs`
- Create: `generated/reports/visual-review.html`
- Create: `tests/visual-review.test.js`
- Modify: `generated/manifest.json`

**Interfaces:**
- Produces: 단원 제목·핵심·예문·이미지를 나란히 보여 주는 로컬 검수 페이지

- [ ] **Step 1: 검수 페이지 계약 실패 테스트 작성**

`tests/visual-review.test.js`에서 98개 `<article data-unit-id>`와 각 단원의 이미지·제목·hook·대표 예문이 포함되는지 검사한다.

- [ ] **Step 2: 실패 확인**

Run: `node --test tests/visual-review.test.js`
Expected: FAIL

- [ ] **Step 3: 검수 페이지 생성기 구현**

외부 스크립트·폰트 없이 로컬 HTML을 만든다. 각 카드는 이미지, 단원 ID, 제목, 핵심, 첫 예문, 대체 텍스트, 승인 상태를 표시한다.

- [ ] **Step 4: 나머지 이미지 생성**

Run: `node scripts/generate_lesson_images.mjs`
Expected: 완료 항목은 건너뛰고 미완료 항목만 생성하여 총 98개 PNG를 확보한다.

Run: `node scripts/build_visual_review.mjs`
Expected: 98개 비교 카드 생성. 불일치 이미지는 `node scripts/generate_lesson_images.mjs --force <unit-id>`로 해당 단원만 한 번 재생성한다.

- [ ] **Step 5: 테스트와 커밋**

```powershell
node --test tests/visual-review.test.js
git add -- scripts/build_visual_review.mjs tests/visual-review.test.js generated/reports/visual-review.html generated/manifest.json assets/lesson-visuals
git commit -m "feat: generate and review 98 matched lesson visuals"
```

---

### Task 5: 단원 ID 이미지 레지스트리 연결

**Files:**
- Modify: `js/visuals.js`
- Modify: `js/app.js`
- Modify: `tests/content.test.js`
- Modify: `tests/static.test.js`

**Interfaces:**
- Produces: `getVisualForLesson(lesson): { src, alt }`

- [ ] **Step 1: 모든 단원의 고유 이미지 실패 테스트 작성**

```js
test('every lesson resolves to its own local visual', () => {
  const sources = Object.values(LESSONS).map(lesson => getVisualForLesson(lesson).src);
  assert.equal(new Set(sources).size, 98);
  for (const lesson of Object.values(LESSONS)) {
    const visual = getVisualForLesson(lesson);
    assert.match(visual.src, new RegExp(`${lesson.id}\\.png$`));
    assert.ok(fs.existsSync(visual.src));
    assert.ok(visual.alt.includes(lesson.title));
  }
});
```

- [ ] **Step 2: 기존 12개 공유 레지스트리로 실패 확인**

Run: `node --test tests/content.test.js tests/static.test.js`
Expected: FAIL — 고유 경로 수가 12개다.

- [ ] **Step 3: 레지스트리와 앱 연결 구현**

`getVisualForLesson`은 승인된 `assets/lesson-visuals/<id>.png`가 있으면 이를 반환하고, 없으면 기존 `visualKey`의 12개 문법군 이미지를 반환한다. 앱은 `getVisual(lesson.visualKey)` 대신 새 함수를 호출한다.

- [ ] **Step 4: 단위·정적 테스트 실행**

Run: `npm test`
Expected: PASS, 고유 이미지 98개, 누락 0개.

- [ ] **Step 5: 커밋**

```powershell
git add -- js/visuals.js js/app.js tests/content.test.js tests/static.test.js
git commit -m "feat: connect unit-specific lesson visuals"
```

---

### Task 6: 브라우저·모바일·재실행 최종 검증

**Files:**
- Modify: `tests/browser.spec.mjs`
- Modify: `tests/generate-lessons.test.js`
- Modify: `tests/generate-images.test.js`
- Modify: `README.md`

**Interfaces:**
- Produces: 1·2·3권 대표 단원의 이미지·내용 일치 및 오프라인 실행 증거

- [ ] **Step 1: 대표 단원 이미지 경로 브라우저 테스트 추가**

`b1-c5-u1`, `b2-c4-u1`, `b3-c10-u1`을 열고 이미지 `src`가 각각 같은 ID로 끝나며 `naturalWidth > 0`, 가로 스크롤 없음, 콘솔 오류 0개인지 검사한다.

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:browser`
Expected: 앱 연결 전에는 고유 ID 경로 검사가 실패한다.

- [ ] **Step 3: 재실행 0호출 검사 추가**

완료 매니페스트와 모든 파일이 있는 fixture에서 강의·이미지 실행기를 다시 호출하고 가짜 제공자의 호출 횟수가 0인지 단위 테스트한다.

- [ ] **Step 4: 전체 검증과 문서 갱신**

Run: `npm test && npm run test:browser`
Expected: 모든 테스트 PASS.

Run: `node scripts/generate_lessons.mjs --dry-run` 및 `node scripts/generate_lesson_images.mjs --dry-run`
Expected: 생성 호출 예정 0개.

README에는 PDF 세 파일, 환경 변수, dry-run, 제한 생성, 특정 단원 강제 재생성, 검수·승격, 학생 실행 시 무 API 원칙을 기록한다.

- [ ] **Step 5: 커밋**

```powershell
git add -- tests/browser.spec.mjs tests/generate-lessons.test.js tests/generate-images.test.js README.md
git commit -m "test: verify one-time offline grammar generation"
```
