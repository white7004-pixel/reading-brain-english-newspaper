# 미국교과수업 커리큘럼 로드맵 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 미국 공교육 교과 프로그램 카드에 MyUse 준비과정, MyPath 네 단계, 개인별 반복 학습 흐름을 반응형 로드맵으로 추가한다.

**Architecture:** 정적 HTML인 `index.html`에 의미론적인 커리큘럼 마크업을 추가하고, 기존 사이트의 네이비·버건디·아이보리 디자인 토큰을 사용하는 전용 CSS를 `new_styles.css`와 페이지 내 동기화 스타일에 추가한다. PowerShell 검증 스크립트가 필수 단계명, 순서, 학습 흐름, 모바일 규칙을 검사한다.

**Tech Stack:** HTML5, CSS3, PowerShell 검증 스크립트

## Global Constraints

- 기존 미국교과 소개, 대상, 과목 구성, 미디어 링크를 유지한다.
- 공식 단계명 `Pathfinder`, `Adventurer`, `Trailblazer`, `Homesteader`를 이 순서로 사용한다.
- 확인되지 않은 학년, 기간, 점수, 성과 수치를 추가하지 않는다.
- MyUse는 준비과정, MyPath는 본과정으로 명확히 구분한다.
- 360px 모바일에서 한 열로 표시하고 가로 스크롤을 만들지 않는다.

---

### Task 1: 커리큘럼 구조 검증 스크립트

**Files:**
- Create: `scripts/verify-us-curriculum-roadmap.ps1`
- Test: `index.html`
- Test: `new_styles.css`

**Interfaces:**
- Consumes: `index.html`의 `.us-curriculum-roadmap`, `.mypath-stage`, `.learning-loop-step` 마크업과 `new_styles.css`의 모바일 미디어 쿼리
- Produces: 성공 시 `US curriculum roadmap verification passed.`를 출력하고, 누락 시 종료 코드 1을 반환하는 검증 명령

- [ ] **Step 1: 실패하는 검증 스크립트 작성**

```powershell
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$html = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'index.html')
$css = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'new_styles.css')

$requiredHtml = @(
  'class="us-curriculum-roadmap"',
  'class="myuse-prep"',
  'Pathfinder',
  'Adventurer',
  'Trailblazer',
  'Homesteader',
  '진단평가',
  '개인별 학습경로',
  '수업·평가',
  '데이터 기반 조정'
)

foreach ($needle in $requiredHtml) {
  if (-not $html.Contains($needle)) { throw "Missing HTML content: $needle" }
}

$stageOrder = @('Pathfinder', 'Adventurer', 'Trailblazer', 'Homesteader')
$lastIndex = -1
foreach ($stage in $stageOrder) {
  $currentIndex = $html.IndexOf($stage)
  if ($currentIndex -le $lastIndex) { throw "Incorrect MyPath stage order: $stage" }
  $lastIndex = $currentIndex
}

$requiredCss = @('.us-curriculum-roadmap', '.mypath-stage-grid', '.learning-loop', '@media (max-width: 720px)')
foreach ($needle in $requiredCss) {
  if (-not $css.Contains($needle)) { throw "Missing CSS rule: $needle" }
}

Write-Output 'US curriculum roadmap verification passed.'
```

- [ ] **Step 2: 검증 실패 확인**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-us-curriculum-roadmap.ps1`

Expected: FAIL with `Missing HTML content: class="us-curriculum-roadmap"`.

- [ ] **Step 3: 스크립트만 커밋**

```powershell
git add -- scripts/verify-us-curriculum-roadmap.ps1
git commit -m "test: verify US curriculum roadmap"
```

### Task 2: 미국교과 커리큘럼 마크업

**Files:**
- Modify: `index.html:2542`
- Test: `scripts/verify-us-curriculum-roadmap.ps1`

**Interfaces:**
- Consumes: 기존 `.program-card.pc-3`와 프로그램 카드 펼침 동작
- Produces: `.us-curriculum-roadmap` 안의 `.myuse-prep`, 네 개 `.mypath-stage`, 네 개 `.learning-loop-step`

- [ ] **Step 1: 미국교과 상세 목록 아래에 준비과정과 네 단계 추가**

```html
<section class="us-curriculum-roadmap" aria-labelledby="us-curriculum-title">
  <div class="curriculum-roadmap-heading">
    <span>미국 학년 기반 맞춤 로드맵</span>
    <h4 id="us-curriculum-title">준비과정에서 고난도 학술 문해력까지</h4>
  </div>
  <div class="myuse-prep">
    <span class="curriculum-kicker">PREP · MyUse</span>
    <div><strong>영어 기초를 다지는 입문 준비과정</strong><p>초급·중급 학습자가 듣기와 독해의 기반을 쌓은 뒤 MyPath 본과정으로 연결됩니다.</p></div>
  </div>
  <ol class="mypath-stage-grid" aria-label="MyPath 네 단계">
    <li class="mypath-stage"><span>01</span><strong>Pathfinder</strong><p>기초 문해력과 핵심 개념을 형성합니다.</p></li>
    <li class="mypath-stage"><span>02</span><strong>Adventurer</strong><p>학년 수준 독해와 교과 어휘를 확장합니다.</p></li>
    <li class="mypath-stage"><span>03</span><strong>Trailblazer</strong><p>복합 지문을 분석하고 근거를 들어 표현합니다.</p></li>
    <li class="mypath-stage"><span>04</span><strong>Homesteader</strong><p>고난도 학술 문해력과 독립적인 사고·쓰기를 완성합니다.</p></li>
  </ol>
  <div class="learning-loop" aria-label="개인별 반복 학습 흐름">
    <span class="learning-loop-step">진단평가</span><span class="learning-loop-step">개인별 학습경로</span><span class="learning-loop-step">수업·평가</span><span class="learning-loop-step">데이터 기반 조정</span>
  </div>
</section>
```

- [ ] **Step 2: 기존 정보 보존 확인**

Run: `rg -n "17,000\+|Language Arts|Math|Science|Social Studies|blog.naver.com/jadeacademy/224152133212" index.html`

Expected: 기존 콘텐츠 수, 교과 구성, 미디어 링크가 모두 출력된다.

### Task 3: 로드맵 스타일과 반응형 동기화

**Files:**
- Modify: `new_styles.css`
- Modify: `index.html`의 기존 인라인 스타일 블록
- Test: `scripts/verify-us-curriculum-roadmap.ps1`

**Interfaces:**
- Consumes: `--brand-navy`, `--brand-burgundy`, `--brand-ivory`, `--text-muted` 디자인 토큰
- Produces: 데스크톱 4열, 720px 이하 1열 레이아웃과 텍스트 기반 단계 연결 표시

- [ ] **Step 1: 전용 CSS를 `new_styles.css`에 추가**

```css
.us-curriculum-roadmap { margin-top: 22px; padding: 22px; border: 1px solid rgba(12,53,77,.13); border-radius: 14px; background: var(--brand-ivory, #f8f5ef); }
.curriculum-roadmap-heading span, .curriculum-kicker { color: var(--brand-burgundy, #8b1e24); font-size: 11px; font-weight: 900; letter-spacing: .08em; }
.curriculum-roadmap-heading h4 { margin: 5px 0 16px; color: var(--brand-navy, #0c354d); font-size: 20px; }
.myuse-prep { display: flex; gap: 18px; align-items: flex-start; padding: 15px 16px; border-radius: 10px; background: #fff; }
.myuse-prep strong, .myuse-prep p { display: block; }
.myuse-prep p { margin: 5px 0 0; color: var(--text-muted); font-size: 12px; line-height: 1.65; }
.mypath-stage-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 14px 0; padding: 0; list-style: none; }
.mypath-stage { position: relative; min-width: 0; padding: 16px 14px; border-radius: 10px; background: var(--brand-navy, #0c354d); color: #fff; }
.mypath-stage > span { color: #d5bd8c; font-size: 10px; font-weight: 900; }
.mypath-stage strong { display: block; margin: 5px 0 7px; font-size: 14px; overflow-wrap: anywhere; }
.mypath-stage p { margin: 0; color: rgba(255,255,255,.76); font-size: 11px; line-height: 1.55; }
.learning-loop { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.learning-loop-step { padding: 9px 7px; border: 1px solid rgba(139,30,36,.18); border-radius: 999px; color: var(--brand-burgundy, #8b1e24); background: #fff; font-size: 10px; font-weight: 800; text-align: center; }
@media (max-width: 720px) {
  .us-curriculum-roadmap { padding: 17px 14px; }
  .myuse-prep { flex-direction: column; gap: 7px; }
  .mypath-stage-grid, .learning-loop { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: 동일 CSS를 `index.html` 인라인 스타일 블록에도 추가**

`new_styles.css`에 추가한 규칙을 `index.html`의 마지막 `@media (max-width: 720px)` 블록 앞에 동일하게 삽입한다. 외부 스타일 로딩 여부와 관계없이 현재 단일 파일 배포에서 같은 화면이 유지되어야 한다.

- [ ] **Step 3: 검증 스크립트 통과 확인**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-us-curriculum-roadmap.ps1`

Expected: `US curriculum roadmap verification passed.`

- [ ] **Step 4: 기존 관련 검증 실행**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-local-media.ps1`

Expected: exit code 0.

- [ ] **Step 5: 구현 커밋**

```powershell
git add -- index.html new_styles.css
git commit -m "feat: add ChildU curriculum roadmap"
```
