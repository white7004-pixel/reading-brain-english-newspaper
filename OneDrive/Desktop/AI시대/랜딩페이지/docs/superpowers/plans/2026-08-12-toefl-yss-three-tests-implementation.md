# TOEFL YSS 3종 시험 카드 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 랜딩페이지에 리딩브레인이 시행하는 TOEFL Primary Step 1·2와 TOEFL Junior Standard를 정확하고 읽기 쉬운 진단 카드로 반영한다.

**Architecture:** 기존 단일 `주니어토플시험` 카드를 넓은 이미지, 세 시험 비교 영역, 활용 흐름, 공식 인증서 링크를 가진 `diag-card-toefl` 컴포넌트로 교체한다. 인라인 스타일이 실제 페이지를 구성하고 `new_styles.css`가 동일 스타일의 관리 사본이므로 두 파일을 같은 규칙으로 동기화하며, PowerShell 정적 검증으로 문구·구조·링크·이미지를 확인한다.

**Tech Stack:** HTML5, CSS Grid/Flexbox, PowerShell 정적 검증

## Global Constraints

- 시험은 TOEFL Primary Step 1, TOEFL Primary Step 2, TOEFL Junior Standard 세 종류만 표시한다.
- 시행 시험에 Speaking과 Writing을 포함하지 않는다.
- 공식 인증서 안내는 `https://www.toeflyss.or.kr/gd/certificate/tab1`로 새 탭에서 연결한다.
- 기존 로컬 이미지 `images/67337063_1773900869051.png`를 사용한다.
- 720px 이하에서는 시험 비교 카드와 활용 흐름을 한 열로 표시한다.
- 확인 근거가 명확하지 않은 `광명시 최다 응시 학원 선정`과 자체 성과 수치는 제거한다.

---

### Task 1: TOEFL YSS 콘텐츠 정적 검증

**Files:**
- Create: `scripts/verify-toefl-yss-card.ps1`
- Test: `scripts/verify-toefl-yss-card.ps1`

**Interfaces:**
- Consumes: `index.html`, `new_styles.css`
- Produces: 요구 문구·시험 수치·링크·CSS 선택자를 검사하고 위반 시 비정상 종료하는 PowerShell 스크립트

- [ ] **Step 1: 실패하는 검증 스크립트 작성**

  `index.html`에서 `TOEFL YSS 공식 인증시험`, 세 시험명, `72문항 · 60분`, `72문항 · 65분`, `126문항 · 115분`, CEFR·Lexile 문구, 공식 URL과 `target="_blank"`, 네 단계 활용 흐름을 요구한다. `Reading · Listening · Speaking 통합 평가`, `광명시 최다 응시 학원`, `80% 최고등급`, `50% 최고등급`은 금지한다. `index.html`과 `new_styles.css` 양쪽에서 `.toefl-test-grid`, `.toefl-usage-flow`와 720px 반응형 규칙을 요구한다.

- [ ] **Step 2: 검증이 올바른 이유로 실패하는지 확인**

  Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-toefl-yss-card.ps1`

  Expected: `Missing TOEFL YSS card title` 메시지로 FAIL.

- [ ] **Step 3: 검증 스크립트만 커밋**

  Run: `git add -- scripts/verify-toefl-yss-card.ps1 && git commit -m "test: define TOEFL YSS card requirements" -- scripts/verify-toefl-yss-card.ps1`

### Task 2: 진단 카드와 관련 문구 구현

**Files:**
- Modify: `index.html` 진단 CSS, 프로그램 카드, 진단 5 카드, 명예의 전당 카드
- Modify: `new_styles.css` 진단 CSS 및 반응형 CSS
- Test: `scripts/verify-toefl-yss-card.ps1`

**Interfaces:**
- Consumes: Task 1의 정적 검증 기준
- Produces: `.diag-card-toefl`, `.toefl-test-grid`, `.toefl-test`, `.toefl-usage-flow`, `.toefl-official-link` HTML/CSS

- [ ] **Step 1: 최소 HTML 구현**

  기존 진단 5 카드를 `TOEFL YSS 공식 인증시험`으로 교체한다. 이미지에는 시험 시행 안내를 설명하는 대체 텍스트를 넣고, 세 비교 카드에 다음 값을 표시한다: Step 1 `Reading 36 · Listening 36`, `72문항 · 60분`; Step 2 `Reading 36 · Listening 36`, `72문항 · 65분`; Junior Standard `Listening 42 · Language Form and Meaning 42 · Reading 42`, `126문항 · 115분`. CEFR·Lexile 결과와 네 단계 활용 흐름, 외부 사이트 표시 링크를 추가한다.

- [ ] **Step 2: 관련 프로그램·성과 문구 정리**

  프로그램 카드의 인증센터 표현을 `TOEFL YSS 공식 지정센터`로 바꾸고 검증되지 않은 최다 응시·최고등급 수치를 제거한다. 명예의 전당 설명은 `Primary Step 1·2 · Junior Standard 인증서`로 구체화한다.

- [ ] **Step 3: 데스크톱·모바일 스타일 구현**

  TOEFL 카드는 전체 진단 그리드 너비를 사용하며 이미지는 `aspect-ratio: 16/7; object-fit: cover`로 표시한다. 세 시험은 데스크톱에서 3열, 활용 흐름은 4열로 배치한다. 720px 이하에서는 양쪽 모두 1열로 변경하고 긴 평가 영역이 줄바꿈되도록 `min-width: 0`을 적용한다. 같은 규칙을 `index.html`과 `new_styles.css`에 넣는다.

- [ ] **Step 4: 검증 통과 확인**

  Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-toefl-yss-card.ps1`

  Expected: `TOEFL YSS card verification passed.`

- [ ] **Step 5: 구현 파일만 커밋**

  Run: `git add -- index.html new_styles.css && git commit -m "feat: add TOEFL YSS three-test diagnostic card" -- index.html new_styles.css`

### Task 3: 회귀 및 화면 검증

**Files:**
- Verify: `index.html`
- Verify: `new_styles.css`
- Verify: `scripts/verify-*.ps1`

**Interfaces:**
- Consumes: 완성된 TOEFL YSS 카드
- Produces: 기존 랜딩페이지 진단 기능을 보존했다는 검증 결과

- [ ] **Step 1: 관련 정적 검증 전체 실행**

  Run: `Get-ChildItem scripts/verify-*.ps1 | ForEach-Object { & $_.FullName }`

  Expected: 모든 검증 스크립트가 종료 코드 0으로 완료된다.

- [ ] **Step 2: 로컬 페이지 시각 검증**

  `http://127.0.0.1:4173/index.html#diagnostic`에서 데스크톱과 360px 화면을 확인한다. 세 시험 정보가 잘리지 않고, 이미지와 카드 비율이 다른 진단 카드와 조화를 이루며, 공식 링크가 새 탭으로 열리는지 확인한다.

- [ ] **Step 3: 변경 범위 확인**

  Run: `git diff --check HEAD^ -- index.html new_styles.css scripts/verify-toefl-yss-card.ps1`

  Expected: 공백 오류가 없고 변경 파일이 계획 범위와 일치한다.
