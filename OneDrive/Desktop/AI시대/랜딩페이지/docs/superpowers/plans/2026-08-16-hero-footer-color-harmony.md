# Hero Message and Footer Color Harmony Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the five hero audience messages, add the AI-era Korean hero statement, and harmonize the consultation and location sections with the approved navy, gold, and ivory palette.

**Architecture:** Keep the single-page static architecture and change only the existing hero markup and relevant CSS rules. Mirror style changes in `index.html` and `new_styles.css`, then enforce the approved copy and palette with a focused PowerShell regression script.

**Tech Stack:** HTML5, CSS custom properties, PowerShell static verification

## Global Constraints

- Use `#0C354D`, `#164D69`, `#B89A62`, `#F6F2E9`, and `#FFFFFF` for the approved footer palette.
- Preserve all existing layout, links, content order, animation hooks, and responsive structure.
- Replace the English hero offer with `AI 시대를 리드하는 영어독서의 힘`.
- Restore exactly five hero credential badges and ensure they wrap without horizontal overflow.
- Remove the pink consultation button treatment from both inline and mirrored stylesheet sources.

---

### Task 1: Hero messaging and footer palette

**Files:**
- Create: `scripts/verify-hero-footer-harmony.ps1`
- Modify: `index.html:389-445,1349-1391,2372-2380`
- Modify: `new_styles.css:300-356,1189-1231`

**Interfaces:**
- Consumes: Existing CSS variables `--brand-navy`, `--navy-2`, `--brand-gold`, `--brand-ivory`, and existing classes `.hero-offer`, `.hero-credentials`, `.cta-section`, `.cta-kakao`, `.location-map`, `.loc-item`, `.loc-icon`.
- Produces: Updated static hero copy, five `.hero-cred` elements, and synchronized approved palette rules in both style sources.

- [ ] **Step 1: Write the failing static regression test**

Create `scripts/verify-hero-footer-harmony.ps1` with checks for the exact Korean hero offer, the five required credential texts, exactly five `.hero-cred` spans inside `.hero-credentials`, and required CSS declarations in both `index.html` and `new_styles.css`:

```powershell
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$htmlPath = Join-Path $root 'index.html'
$cssPath = Join-Path $root 'new_styles.css'
$html = Get-Content -Encoding UTF8 -Raw $htmlPath
$css = Get-Content -Encoding UTF8 -Raw $cssPath

$requiredCopy = @(
  'AI 시대를 리드하는 영어독서의 힘',
  'AI 시대 사고력 · 문해력 · 집중력',
  '사립초 · 국제학교 · 특목자사고',
  '유학 · 리터니 · 주재원 자녀',
  '1:1 원서정독 밀착코칭',
  '중등에 가장 빠른 수능 1등급 완성'
)

foreach ($copy in $requiredCopy) {
  if (-not $html.Contains($copy)) { throw "Missing hero copy: $copy" }
}

$credentialBlock = [regex]::Match($html, '(?s)<div class="hero-credentials">(.*?)</div>').Groups[1].Value
$credentialCount = ([regex]::Matches($credentialBlock, '<span class="hero-cred">')).Count
if ($credentialCount -ne 5) { throw "Expected 5 hero credentials, found $credentialCount" }

$requiredRules = @(
  'background: linear-gradient(135deg, var(--brand-navy) 0%, var(--navy-2) 100%);',
  'background: var(--brand-gold); color: var(--white);',
  'border: 1px solid rgba(184,154,98,0.38);',
  'box-shadow: 0 18px 44px rgba(12,53,77,0.12);',
  'background: var(--navy-dim);',
  'color: var(--brand-navy);'
)

foreach ($fileContent in @($html, $css)) {
  foreach ($rule in $requiredRules) {
    if (-not $fileContent.Contains($rule)) { throw "Missing approved palette rule: $rule" }
  }
  $consultRule = [regex]::Match($fileContent, '(?s)\.cta-kakao\s*\{.*?\}').Value
  if (-not $consultRule.Contains('background: var(--brand-gold)')) { throw 'Consultation button is not gold.' }
}

Write-Output 'Hero and footer color harmony verification passed.'
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-hero-footer-harmony.ps1
```

Expected: FAIL because the Korean hero offer, five restored badges, and approved color rules are not yet present.

- [ ] **Step 3: Update the hero copy in `index.html`**

Replace the offer and credential markup with:

```html
<div class="hero-offer">AI 시대를 리드하는 영어독서의 힘</div>
```

Replace the existing `.hero-credentials` block independently with:

```html
<div class="hero-credentials">
  <span class="hero-cred">AI 시대 사고력 · 문해력 · 집중력</span>
  <span class="hero-cred">사립초 · 국제학교 · 특목자사고</span>
  <span class="hero-cred">유학 · 리터니 · 주재원 자녀</span>
  <span class="hero-cred">1:1 원서정독 밀착코칭</span>
  <span class="hero-cred">중등에 가장 빠른 수능 1등급 완성</span>
</div>
```

Keep the current hero title, subtitle, buttons, and animation class names unchanged.

- [ ] **Step 4: Apply the approved palette in both style sources**

In `index.html` and `new_styles.css`, set the relevant rules to:

```css
.hero-offer { letter-spacing: 0.04em; }
.hero-credentials { max-width: 760px; }
.hero-cred { white-space: normal; }

.cta-section {
  background: linear-gradient(135deg, var(--brand-navy) 0%, var(--navy-2) 100%);
}
.cta-kakao { background: var(--brand-gold); color: var(--white); }
.cta-kakao:hover { background: #A48650; transform: translateY(-2px); }
.cta-phone { background: var(--white); color: var(--brand-navy); }

.location-map {
  border: 1px solid rgba(184,154,98,0.38);
  box-shadow: 0 18px 44px rgba(12,53,77,0.12);
}
.loc-item { border-color: rgba(184,154,98,0.38); }
.loc-icon { background: var(--navy-dim); color: var(--brand-navy); }
```

Preserve existing sizing, spacing, radii, iframe behavior, and hover transforms when merging these declarations into the current rules.

- [ ] **Step 5: Run the focused regression test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-hero-footer-harmony.ps1
```

Expected: `Hero and footer color harmony verification passed.`

- [ ] **Step 6: Run related existing checks and perform browser verification**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-hero-colors.ps1
powershell -ExecutionPolicy Bypass -File scripts/verify-hero-overlay.ps1
```

Then serve the site locally and inspect the home page at desktop and mobile widths. Verify the five hero badges wrap cleanly, CTA controls remain readable, the map and location cards use the approved border treatment, and no error overlay or blank content appears.

- [ ] **Step 7: Commit only the scoped implementation files**

```powershell
git add -- index.html new_styles.css scripts/verify-hero-footer-harmony.ps1
git commit -m "style: harmonize hero and footer branding"
```
