# PDF One-Time Lesson Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 제공된 PDF 3권을 한 번 분석해 현재 98개 단원과 대조하고, 검증된 강의 데이터 초안을 재실행 가능한 방식으로 생성한다.

**Architecture:** Python은 PDF의 페이지 텍스트와 목차 후보만 추출하고, Node.js 파이프라인은 단원 명세·해시·생성 상태를 관리한다. OpenAI 호출은 얇은 제공자 모듈 뒤에 두며 테스트에서는 가짜 제공자를 사용한다. 생성 초안은 검증 후에만 `js/content/`로 승격한다.

**Tech Stack:** Python 3, `pdfplumber`, Node.js ES modules, OpenAI JavaScript SDK, Node built-in test runner, SHA-256, JSON Schema

**Spec:** `docs/superpowers/specs/2026-08-22-pdf-one-time-grammar-generation-design.md`

## Global Constraints

- PDF에서 목차, 단원명, 문법 범위, 페이지 참조만 추출하고 본문·예문·문제를 복제하지 않는다.
- 학생 실행 시 외부 API 호출이 없어야 한다.
- API 키는 `OPENAI_API_KEY`에서만 읽고 파일·브라우저 코드에 저장하지 않는다.
- 텍스트 모델은 `OPENAI_TEXT_MODEL`로 명시하며 코드에 최신 모델명을 고정하지 않는다.
- 입력 해시와 프롬프트 해시가 같은 완료 단원은 재호출하지 않는다.
- 각 코드 변경은 실패 테스트 → 최소 구현 → 전체 테스트 → 해당 경로만 커밋 순서로 진행한다.

---

### Task 1: 생성 매니페스트와 해시 계약

**Files:**
- Create: `js/generation/manifest.js`
- Create: `tests/generation-manifest.test.js`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `sha256(value): string`, `loadManifest(path): Manifest`, `saveManifest(path, manifest): void`, `shouldGenerate(entry, inputHash, promptHash): boolean`

- [ ] **Step 1: 완료 항목을 건너뛰는 실패 테스트 작성**

```js
test('shouldGenerate skips an existing approved artifact with matching hashes', () => {
  const entry = { inputHash: 'pdf-a', promptHash: 'prompt-a', status: 'approved', artifact: 'generated/drafts/b1-c1-u1.json' };
  assert.equal(shouldGenerate(entry, 'pdf-a', 'prompt-a', path => path.endsWith('.json')), false);
  assert.equal(shouldGenerate(entry, 'pdf-b', 'prompt-a', () => true), true);
});
```

- [ ] **Step 2: 실패 확인**

Run: `node --test tests/generation-manifest.test.js`
Expected: FAIL — `js/generation/manifest.js`가 없다.

- [ ] **Step 3: 원자적 저장과 해시 구현**

`saveManifest`는 같은 폴더의 `.tmp` 파일에 JSON을 쓴 뒤 `renameSync`로 교체한다. 기본 스키마는 `{ version:1, sources:{}, units:{} }`이다. `shouldGenerate`는 항목 부재, 해시 불일치, `status !== 'approved'`, 산출물 부재 중 하나라도 참이면 `true`를 반환한다.

- [ ] **Step 4: 테스트와 회귀 검사**

Run: `node --test tests/generation-manifest.test.js && npm test`
Expected: PASS

- [ ] **Step 5: 커밋**

```powershell
git add -- js/generation/manifest.js tests/generation-manifest.test.js .gitignore
git commit -m "feat: track resumable grammar generation"
```

---

### Task 2: PDF 세 권의 안전한 추출

**Files:**
- Modify: `scripts/extract_pdf_outline.py`
- Create: `tests/pdf-extraction.test.js`
- Create: `generated/outlines/.gitkeep`

**Interfaces:**
- Consumes: PDF 경로와 JSON 출력 경로
- Produces: `{ source, sha256, pages, pageTexts:[{page,text}], candidates:[{page,text}] }`

- [ ] **Step 1: 임시 PDF를 대상으로 실패 테스트 작성**

테스트는 Python으로 2페이지 PDF fixture를 만든 뒤 스크립트를 실행하고 `pages === 2`, 64자리 `sha256`, `CHAPTER 01` 후보 존재를 확인한다.

- [ ] **Step 2: 기존 텍스트 출력 때문에 실패 확인**

Run: `node --test tests/pdf-extraction.test.js`
Expected: FAIL — 출력이 JSON 계약을 만족하지 않는다.

- [ ] **Step 3: 추출 스크립트 변경**

각 페이지의 정규화 텍스트를 JSON에 기록하되 연속 공백만 정리한다. 후보는 `CHAPTER`, `Chapter`, `UNIT`, `Unit`이 포함된 줄로 제한한다. PDF 파일의 SHA-256은 바이너리 스트림으로 계산한다.

- [ ] **Step 4: 실제 PDF 세 권 추출**

```powershell
python scripts/extract_pdf_outline.py 'C:\Users\white\Downloads\천일문그래머_1권.pdf' generated/outlines/book1.json
python scripts/extract_pdf_outline.py 'C:\Users\white\Downloads\천일문그래머_2권_본문(학생용).pdf' generated/outlines/book2.json
python scripts/extract_pdf_outline.py 'C:\Users\white\Downloads\천일문 중등 그래머_3권_본문.pdf' generated/outlines/book3.json
```

Expected: 세 파일 모두 `pages > 0`, 해시 존재, 빈 `pageTexts` 없음.

- [ ] **Step 5: 테스트와 커밋**

```powershell
node --test tests/pdf-extraction.test.js
git add -- scripts/extract_pdf_outline.py tests/pdf-extraction.test.js generated/outlines
git commit -m "feat: extract hashed PDF lesson outlines"
```

---

### Task 3: 98개 단원 생성 명세 작성

**Files:**
- Create: `js/generation/build-specs.js`
- Create: `scripts/build_generation_specs.mjs`
- Create: `tests/generation-specs.test.js`

**Interfaces:**
- Consumes: `ALL_UNITS`, 세 outline JSON
- Produces: `buildGenerationSpecs(units, outlines): GenerationSpec[]`, `generated/specs/<unit-id>.json`

- [ ] **Step 1: 정확한 98개 ID와 페이지 참조 실패 테스트 작성**

```js
test('buildGenerationSpecs preserves every curriculum unit exactly once', () => {
  const specs = buildGenerationSpecs(ALL_UNITS, outlines);
  assert.equal(specs.length, 98);
  assert.deepEqual(specs.map(x => x.id).sort(), ALL_UNITS.map(x => x.id).sort());
  assert.ok(specs.every(x => x.title && x.pageReference && x.sourceHash));
});
```

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/generation-specs.test.js`
Expected: FAIL

- [ ] **Step 3: 명세 빌더 구현**

명세는 `id`, `book`, `chapter`, `title`, `pageReference`, `sourceHash`, `sourcePages`, `generationRules`를 가진다. 현재 curriculum과 outline의 단원 제목 정규화 결과가 매칭되지 않으면 조용히 추측하지 않고 오류 배열을 반환한다.

- [ ] **Step 4: 명세 생성과 검사**

Run: `node scripts/build_generation_specs.mjs`
Expected: `generated/specs/`에 정확히 98개 JSON, 불일치 0개.

- [ ] **Step 5: 테스트와 커밋**

```powershell
npm test
git add -- js/generation/build-specs.js scripts/build_generation_specs.mjs tests/generation-specs.test.js generated/specs
git commit -m "feat: build 98 PDF-backed lesson specifications"
```

---

### Task 4: OpenAI 강의 생성 제공자

**Files:**
- Create: `js/generation/openai-lessons.js`
- Create: `js/generation/lesson-schema.js`
- Create: `tests/openai-lessons.test.js`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `createLessonGenerator({ client, model }): { generate(spec): Promise<Lesson> }`

- [ ] **Step 1: 요청 내용과 JSON 검증 실패 테스트 작성**

가짜 client는 요청 객체를 보관하고 `output_text`에 완전한 fixture JSON을 반환한다. 테스트는 모델 값이 전달되고 프롬프트에 `교재 문장 복제 금지`, 단원 제목, 페이지 범위가 포함되며 반환값이 `validateLesson`을 통과하는지 확인한다.

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/openai-lessons.test.js`
Expected: FAIL

- [ ] **Step 3: SDK와 제공자 구현**

`openai` 패키지를 설치한다. 실행 시점에 설치된 SDK와 공식 OpenAI Responses 문서를 대조한다. 제공자는 `client.responses.create`를 한 번 호출하고 JSON 출력을 파싱한다. 프롬프트에는 원문 복제 금지, 중학생 수준, 필드 계약, 고유 예문, 한국어 해설을 명시한다. 응답은 `validateLesson`과 단원 ID 일치 검사를 통과하지 못하면 오류로 처리한다.

- [ ] **Step 4: 테스트와 회귀 검사**

Run: `node --test tests/openai-lessons.test.js && npm test`
Expected: PASS, 테스트 중 실제 네트워크 호출 0회.

- [ ] **Step 5: 커밋**

```powershell
git add -- package.json package-lock.json js/generation/openai-lessons.js js/generation/lesson-schema.js tests/openai-lessons.test.js
git commit -m "feat: generate schema-validated grammar lessons"
```

---

### Task 5: 재개 가능한 98개 강의 생성 CLI

**Files:**
- Create: `scripts/generate_lessons.mjs`
- Create: `js/generation/run-lessons.js`
- Create: `tests/generate-lessons.test.js`

**Interfaces:**
- Produces: `runLessonGeneration({ specs, manifest, generate, forceIds, writeDraft }): GenerationSummary`

- [ ] **Step 1: 완료 단원 건너뛰기와 실패 격리 테스트 작성**

세 명세 중 하나는 완료, 하나는 성공, 하나는 생성 오류 fixture로 구성한다. 결과가 `{ skipped:1, generated:1, failed:1 }`이고 성공 초안과 실패 상태가 모두 보존되는지 확인한다.

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/generate-lessons.test.js`
Expected: FAIL

- [ ] **Step 3: 실행기와 CLI 구현**

CLI는 `--dry-run`, `--force <unit-id>`, `--limit <n>`을 지원한다. `OPENAI_API_KEY`와 `OPENAI_TEXT_MODEL`이 없으면 실제 호출 전 종료한다. 매 단원 완료 직후 초안과 매니페스트를 저장해 중단 후 재개할 수 있게 한다.

- [ ] **Step 4: dry-run과 제한 생성 검증**

Run: `node scripts/generate_lessons.mjs --dry-run`
Expected: 예정 98, 기존 완료·호출 예정·예상 파일 목록 출력, 네트워크 호출 0회.

API 환경 변수가 준비된 경우 Run: `node scripts/generate_lessons.mjs --limit 1`
Expected: 초안 1개 생성 및 검증. 준비되지 않은 경우 이 단계는 명확한 자격 증명 차단 메시지로 종료하고 실제 생성 단계에서 재개한다.

- [ ] **Step 5: 테스트와 커밋**

```powershell
npm test
git add -- scripts/generate_lessons.mjs js/generation/run-lessons.js tests/generate-lessons.test.js
git commit -m "feat: add resumable one-time lesson generation"
```

---

### Task 6: 초안 검수와 최종 콘텐츠 승격

**Files:**
- Create: `js/generation/review-lessons.js`
- Create: `scripts/review_lessons.mjs`
- Create: `tests/review-lessons.test.js`
- Modify: `js/content/book1.js`
- Modify: `js/content/book2.js`
- Modify: `js/content/book3.js`

**Interfaces:**
- Produces: `reviewDrafts({ units, drafts }): ReviewReport`, `promoteDrafts(report): void`

- [ ] **Step 1: 중복·누락·원문 과다 일치 실패 테스트 작성**

fixture에 중복 영어 예문, 누락 ID, PDF 추출문과 12단어 연속 일치를 넣고 각각 오류가 보고되는지 확인한다.

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/review-lessons.test.js`
Expected: FAIL

- [ ] **Step 3: 검수기와 승격 구현**

검수기는 98개 ID 정확 일치, `validateLesson`, 영어 예문 중복, 퀴즈 정답 범위, 12단어 연속 원문 일치를 검사한다. `--promote`는 오류 0개이고 모든 단원이 승인 상태일 때만 권별 모듈을 원자적으로 교체한다.

- [ ] **Step 4: 전체 검증**

Run: `node scripts/review_lessons.mjs`
Expected: 검수 보고서 출력. 오류가 있으면 파일과 단원 ID를 명시하고 승격하지 않는다.

Run after approval: `node scripts/review_lessons.mjs --promote`
Expected: 98개 최종 콘텐츠가 권별 모듈에 반영된다.

- [ ] **Step 5: 커밋**

```powershell
npm test
git add -- js/generation/review-lessons.js scripts/review_lessons.mjs tests/review-lessons.test.js js/content/book1.js js/content/book2.js js/content/book3.js generated/manifest.json
git commit -m "feat: review and promote PDF-generated lessons"
```

