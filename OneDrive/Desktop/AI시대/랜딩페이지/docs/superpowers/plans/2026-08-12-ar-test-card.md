# AR TEST 카드 개선 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 AR TEST 진단 카드에 자체 시험 사진, 정확한 AR 지수 설명, AR 2.5 예시와 네 단계 활용 흐름을 추가한다.

**Architecture:** `index.html`의 첫 번째 진단 카드만 의미론적인 HTML로 교체하고, `new_styles.css`와 페이지 내 인라인 스타일에 AR 카드 전용 반응형 규칙을 추가한다. PowerShell 검증 스크립트는 필수 설명과 이미지, 외부 블로그 링크 부재, 기존 TQ 링크 보존을 검사한다.

**Tech Stack:** HTML5, CSS3, PowerShell

## Global Constraints

- `images/students-test-environment.jpg`만 AR TEST 이미지로 사용한다.
- AR TEST 카드에는 외부 링크를 추가하지 않는다.
- AR 지수와 학생의 읽기 수준 진단을 같은 지표라고 표현하지 않는다.
- `AR 2.5`는 미국 초등학교 2학년 5개월 수준의 도서 난이도 예시로만 사용한다.
- 기존 TQ TEST 및 다른 진단 카드의 링크와 내용은 유지한다.
- 확인되지 않은 성과 수치와 결과 보장 표현을 제거한다.

---

### Task 1: AR TEST 카드 구조와 반응형 표현

**Files:**
- Create: `scripts/verify-ar-test-card.ps1`
- Modify: `index.html`의 `.diag-grid` 첫 번째 카드와 인라인 스타일
- Modify: `new_styles.css`
- Test: `scripts/verify-ar-test-card.ps1`

**Interfaces:**
- Consumes: 기존 `.diag-card`, `.diag-list`, `images/students-test-environment.jpg`
- Produces: `.diag-card-ar`, `.ar-test-media`, `.ar-example`, `.ar-usage-flow`, `.ar-usage-step`

- [ ] **Step 1: 실패하는 검증 스크립트 작성**

```powershell
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$html = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'index.html')
$css = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'new_styles.css')

foreach ($needle in @('class="diag-card diag-card-ar"','class="ar-test-media"','class="ar-example"','class="ar-usage-flow"','AR 2.5')) {
  if (-not $html.Contains($needle)) { throw "Missing AR TEST content: $needle" }
}
if (([regex]::Matches($html, 'class="ar-usage-step"')).Count -ne 4) { throw 'Expected 4 AR usage steps' }
if (-not $html.Contains('images/students-test-environment.jpg')) { throw 'Missing AR TEST image' }
if (-not $html.Contains('https://www.sfcenter.co.kr/info/?action=lab&amp;sub=reading')) { throw 'Existing TQ TEST link changed or missing' }
if (-not $css.Contains('.ar-usage-flow')) { throw 'Missing AR TEST responsive styles' }

$cardStart = $html.IndexOf('class="diag-card diag-card-ar"')
$cardEnd = $html.IndexOf('class="diag-card diag-card-tq"')
$arCard = $html.Substring($cardStart, $cardEnd - $cardStart)
if ($arCard.Contains('look_laha') -or $arCard.Contains('blog.naver.com')) { throw 'AR TEST card must not link to the reference blog' }

Write-Output 'AR TEST card verification passed.'
```

- [ ] **Step 2: 검증 실패 확인**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-ar-test-card.ps1`

Expected: FAIL with `Missing AR TEST content: class="diag-card diag-card-ar"`.

- [ ] **Step 3: AR TEST 카드 마크업 교체**

```html
<div class="diag-card diag-card-ar">
  <div class="ar-test-media"><img src="images/students-test-environment.jpg" alt="리딩브레인 학생이 영어 읽기 수준 진단 테스트에 참여하는 모습" loading="lazy"></div>
  <h3>AR TEST</h3>
  <div class="diag-sub">Reading Level &amp; Book Level · 진단 1</div>
  <p><strong>AR 지수는 학생 점수가 아니라 영어 원서의 난이도</strong>입니다. 문장 길이와 어휘 수·난이도 등을 종합해 책이 어느 수준의 독자에게 적합한지 보여줍니다.</p>
  <div class="ar-example"><strong>AR 2.5</strong><span>미국 초등학교 2학년 5개월 수준의 도서 난이도</span></div>
  <p class="ar-test-note">학생의 현재 읽기 수준은 별도의 진단 결과로 확인하고, 그 수준에 맞는 AR 도서를 연결합니다.</p>
  <ol class="ar-usage-flow" aria-label="AR TEST 활용 과정">
    <li class="ar-usage-step">읽기 수준 진단</li><li class="ar-usage-step">적정 원서 선정</li><li class="ar-usage-step">이해도 확인</li><li class="ar-usage-step">성장 추적</li>
  </ol>
  <div class="diag-stat">진단 결과 → 개인별 원서 로드맵 설계</div>
</div>
```

- [ ] **Step 4: 전용 스타일을 외부·인라인 CSS에 동일하게 추가**

```css
.diag-card-ar { padding-top: 24px; }
.ar-test-media { margin: -8px -8px 18px; overflow: hidden; border: 1px solid var(--gray-200); border-radius: 10px; }
.ar-test-media img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.ar-example { display: flex; gap: 12px; align-items: center; margin: 16px 0 10px; padding: 13px 14px; border-radius: 10px; background: var(--brand-ivory, #f8f5ef); }
.ar-example strong { color: var(--brand-burgundy, #8b1e24); font-size: 22px; white-space: nowrap; }
.ar-example span, .ar-test-note { color: var(--text-muted); font-size: 12px; line-height: 1.6; }
.ar-usage-flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 7px; margin: 16px 0 0; padding: 0; list-style: none; }
.ar-usage-step { padding: 9px 6px; border: 1px solid rgba(12,53,77,.14); border-radius: 8px; color: var(--brand-navy, #0c354d); background: #fff; font-size: 10px; font-weight: 800; text-align: center; }
@media (max-width: 720px) { .ar-example { align-items: flex-start; flex-direction: column; } .ar-usage-flow { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: 검증 통과 확인**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-ar-test-card.ps1`

Expected: `AR TEST card verification passed.`

- [ ] **Step 6: 변경 파일 검사**

Run: `git diff --check -- index.html new_styles.css scripts/verify-ar-test-card.ps1`

Expected: exit code 0.

- [ ] **Step 7: 구현 커밋**

```powershell
git add -- index.html new_styles.css scripts/verify-ar-test-card.ps1
git commit -m "feat: improve AR test diagnostic card"
```
