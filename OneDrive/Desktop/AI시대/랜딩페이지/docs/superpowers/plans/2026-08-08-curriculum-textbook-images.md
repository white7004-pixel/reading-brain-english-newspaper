# Curriculum Textbook Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 실제 사용 교재 표지를 커리큘럼 카드와 상위 학습 사례에 연결해 각 수업의 교재 라인을 시각적으로 증명한다.

**Architecture:** 공식 출판사·판매처에서 확인한 표지 이미지를 `images/textbooks/`에 로컬 WebP 자산으로 저장한다. `index.html`에는 재사용 가능한 교재 콜라주 마크업을 추가하고 `new_styles.css`에서 데스크톱 2열·모바일 1열 반응형 레이아웃을 제공한다. PowerShell 검증 스크립트가 필수 교재, 로컬 파일, 접근성 문구, 금지된 해커스 문법 교재와 외부 이미지 링크를 검사한다.

**Tech Stack:** 정적 HTML5, CSS3, PowerShell 검증 스크립트, ImageMagick 또는 Pillow 기반 WebP 최적화

## Global Constraints

- 실제 교재 표지만 사용하고 AI로 유사 표지를 생성하지 않는다.
- 외부 이미지 URL에 런타임 의존하지 않고 모든 표지를 `images/textbooks/`에 저장한다.
- 기존 수업 사진, 링크, 설명, 카드 순서를 유지한다.
- 해커스 일반 문법 교재는 표시하지 않는다.
- 성인 TOEFL 이미지는 상위 학습 수준 예시라는 캡션과 함께 표시한다.
- 데스크톱에서는 교재 그룹 2열, 모바일에서는 1열로 표시한다.

---

### Task 1: 교재 이미지 계약 검증

**Files:**
- Create: `scripts/verify-textbook-images.ps1`
- Test: `scripts/verify-textbook-images.ps1`

**Interfaces:**
- Consumes: `index.html`, `new_styles.css`, `images/textbooks/*`
- Produces: 누락된 마크업·이미지·접근성 속성·반응형 CSS를 비정상 종료로 알리는 검증 명령

- [ ] **Step 1: Write the failing test**

```powershell
$requiredImages = @(
  'grammar-is-writing.webp', 'cheonilmun-grammar-1.webp',
  'cheonilmun-grammar-2.webp', 'cheonilmun-grammar-3.webp',
  'reading-tutor.webp', 'ne-times.webp', 'reading-explorer.webp',
  'wonderful-world.webp', 'mother-tong-reading.webp',
  'mother-tong-grammar.webp', 'piltong-grammar.webp', 'hackers-apex-reading.webp'
)
```

각 파일이 디스크에 존재하고 HTML에서 참조되는지 검사한다. `.textbook-showcase`, `.textbook-group`, `.textbook-stack`, `.toefl-proof-media`, `loading="lazy"`, 구체적인 `alt`, 상위 수준 예시 캡션을 검사한다. `http`로 시작하는 `<img src>`와 `Hackers Grammar` 문자열은 실패시킨다.

- [ ] **Step 2: Run test to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File .\scripts\verify-textbook-images.ps1`

Expected: FAIL with `Missing textbook image` because the new assets and markup do not exist.

- [ ] **Step 3: Commit the failing verification contract**

```powershell
git add scripts/verify-textbook-images.ps1
git commit -m "test: define textbook image requirements"
```

---

### Task 2: 실제 교재 표지 로컬 자산

**Files:**
- Create: `images/textbooks/grammar-is-writing.webp`
- Create: `images/textbooks/cheonilmun-grammar-1.webp`
- Create: `images/textbooks/cheonilmun-grammar-2.webp`
- Create: `images/textbooks/cheonilmun-grammar-3.webp`
- Create: `images/textbooks/reading-tutor.webp`
- Create: `images/textbooks/ne-times.webp`
- Create: `images/textbooks/reading-explorer.webp`
- Create: `images/textbooks/wonderful-world.webp`
- Create: `images/textbooks/mother-tong-reading.webp`
- Create: `images/textbooks/mother-tong-grammar.webp`
- Create: `images/textbooks/piltong-grammar.webp`
- Create: `images/textbooks/hackers-apex-reading.webp`

**Interfaces:**
- Consumes: 출판사 또는 공식 판매처에서 확인한 실제 표지 이미지
- Produces: 긴 변 900px 이하, 식별 가능한 표지 글자, 로컬 WebP 파일 12개

- [ ] **Step 1: Verify each source visually and semantically**

교재명과 시리즈가 정확히 일치하는지 공식 페이지에서 확인한다. `Wonderful World`는 사용자가 지정한 시리즈의 대표 표지를 선택하고, 판본이 불명확하면 제목이 명확한 현재 판매 대표판을 사용한다.

- [ ] **Step 2: Save and optimize assets**

원본을 임시 폴더에 내려받고 WebP로 변환한다. 표지를 자르지 않고 비율을 유지하며 긴 변을 900px 이하로 줄인다. 최종 파일만 `images/textbooks/`에 둔다.

- [ ] **Step 3: Run the verification contract**

Run: `powershell -ExecutionPolicy Bypass -File .\scripts\verify-textbook-images.ps1`

Expected: FAIL with `Missing textbook reference` because assets exist but HTML does not yet reference them.

- [ ] **Step 4: Commit the assets**

```powershell
git add images/textbooks
git commit -m "assets: add curriculum textbook covers"
```

---

### Task 3: 교재 콜라주 마크업과 반응형 스타일

**Files:**
- Modify: `index.html:2303`
- Modify: `index.html:2520-2590`
- Modify: `new_styles.css:650-720`
- Modify: `new_styles.css:1425-1465`
- Test: `scripts/verify-textbook-images.ps1`

**Interfaces:**
- Consumes: Task 2의 `images/textbooks/*.webp`
- Produces: `.textbook-showcase`, `.textbook-group`, `.textbook-stack`, `.textbook-cover`, `.toefl-proof-media` HTML/CSS 구성

- [ ] **Step 1: Add minimal semantic markup**

추천 대상 증거 문장 뒤에 `Hackers APEX Reading for TOEFL iBT` 표지와 `현재 재원생이 학습하는 상위 교재 수준의 예시입니다.` 캡션을 추가한다. 중고등 특목 2관에는 초등 문법, 중고등 문법, 단계별 리딩, 고등 독해·문법의 네 그룹을 추가한다. 영자신문·논픽션반에는 NE Times, Reading Explorer, Wonderful World 세 표지를 추가한다. 모든 `<img>`에 `loading="lazy"`, `width`, `height`, 구체적인 `alt`를 제공한다.

- [ ] **Step 2: Add the minimal responsive CSS**

`.textbook-showcase`를 기본 2열 그리드로 만들고 720px 이하에서 1열로 변경한다. `.textbook-stack` 안의 표지는 `object-fit: contain`으로 보존하고, 약한 회전과 그림자만 적용한다. TOEFL 증거 이미지는 문장과 나란히 배치하되 모바일에서 세로로 쌓는다.

- [ ] **Step 3: Run focused verification**

Run: `powershell -ExecutionPolicy Bypass -File .\scripts\verify-textbook-images.ps1`

Expected: PASS with `Textbook image verification passed.`

- [ ] **Step 4: Run existing regression checks**

Run: `powershell -ExecutionPolicy Bypass -File .\scripts\verify-brand-refresh.ps1`

Expected: PASS with `Brand refresh verification passed.`

Run: `powershell -ExecutionPolicy Bypass -File .\scripts\verify-blog-media.ps1`

Expected: PASS with `Blog media verification passed.`

- [ ] **Step 5: Commit the page implementation**

```powershell
git add index.html new_styles.css
git commit -m "feat: show curriculum textbook lines"
```

---

### Task 4: 브라우저 시각 검증

**Files:**
- Verify: `index.html`
- Verify: `new_styles.css`

**Interfaces:**
- Consumes: 완성된 정적 랜딩페이지
- Produces: 데스크톱·모바일에서 겹침, 잘림, 누락이 없다는 시각 검증 결과

- [ ] **Step 1: Start a local server**

Run: `python -m http.server 4173 --bind 127.0.0.1`

- [ ] **Step 2: Verify desktop layout**

브라우저에서 `http://127.0.0.1:4173/index.html`을 열고 추천 대상, 중고등 특목 2관, 영자신문·논픽션반을 확인한다. 표지 제목 식별, 2열 그룹, 기존 수업 이미지와 링크 보존을 확인한다.

- [ ] **Step 3: Verify mobile layout**

390×844 뷰포트에서 같은 세 구간을 확인한다. 그룹이 1열로 쌓이고 가로 넘침이 없으며 캡션이 읽히는지 확인한다.

- [ ] **Step 4: Run final verification suite**

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-textbook-images.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify-brand-refresh.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify-blog-media.ps1
git diff --check
```

Expected: 모든 스크립트 PASS, `git diff --check` 출력 없음.

- [ ] **Step 5: Commit any visual-only corrections**

```powershell
git add index.html new_styles.css
git commit -m "fix: polish textbook showcase responsiveness"
```
