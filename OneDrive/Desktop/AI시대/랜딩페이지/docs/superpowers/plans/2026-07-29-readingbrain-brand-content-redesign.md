# Reading Brain Brand and Content Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Reading Brain landing page around its navy-and-burgundy identity, lifelong-English philosophy, authentic academy media, verified Naver reviews, and a corrected three-clip hero video.

**Architecture:** Keep the existing static HTML/CSS/JavaScript structure and Vercel deployment model. Add one focused PowerShell verification script, update the existing video build script, curate optimized media under `images/`, and make scoped edits to `index.html`, `curriculum-detail.html`, and `new_styles.css`.

**Tech Stack:** Static HTML5, CSS3, vanilla JavaScript, PowerShell, FFmpeg/FFprobe, Vercel CLI.

## Global Constraints

- Brand colors are deep navy `#0C354D`, burgundy `#8B1E24`, ivory `#F6F2E9`, muted gold `#B89A62`, and ink `#18242D`.
- Recommended visual ratio is navy 60%, ivory 30%, burgundy 8%, and gold 2%.
- Primary copy is “입시를 넘어, 평생 쓰는 영어.”
- Primary supporting copy is “AI 시대의 글로벌 문해력과 생각하는 힘은 영어원서에서 시작됩니다.”
- Do not use decorative emoji or AI/stock-feeling imagery.
- Functional phone, location, and time markers use monochrome SVG or text, not photos.
- The first source clip appears exactly once per composite hero sequence.
- Review excerpts preserve meaning, mask author identity, identify Naver Place as the source, and link to the official review page.
- Claims about Daechi-dong proof or guaranteed grade outcomes require publishable evidence; otherwise use non-guaranteeing language.
- Preserve autoplay, muted, loop, `playsinline`, mobile readability, and reduced-motion fallback behavior.
- Deploy only the curated static package, not the raw-media-heavy workspace root.

---

## File Structure

- Modify `index.html`: brand copy, semantic media cards, review cards, official-content links, icon cleanup.
- Modify `curriculum-detail.html`: replace external/stock media and align colors and wording.
- Modify `new_styles.css`: define the approved color system and responsive styles for media and reviews.
- Modify `scripts/build-hero-video.ps1`: remove looping from clip one and rebuild the crossfade sequence.
- Modify `scripts/verify-hero-video.ps1`: verify video format, duration, and source-one duration behavior.
- Create `scripts/verify-brand-refresh.ps1`: assert required copy, palette, sources, links, and absence of decorative emoji/Unsplash.
- Create `images/reviews/`: locally stored, optimized Naver review images selected from the public Reading Brain Place page.
- Create or update `images/academy/`: optimized authentic academy photos used by program cards.
- Update `images/hero/hero-books-crossfade.mp4` and `images/hero/hero-books-poster.jpg`: final hero assets.

### Task 1: Add Automated Brand and Content Guardrails

**Files:**
- Create: `scripts/verify-brand-refresh.ps1`
- Test: `scripts/verify-brand-refresh.ps1`

**Interfaces:**
- Consumes: `index.html`, `curriculum-detail.html`, `new_styles.css`.
- Produces: a zero exit code when the approved copy, colors, links, and asset rules are satisfied.

- [ ] **Step 1: Write the failing verification script**

```powershell
$ErrorActionPreference = 'Stop'

$index = Get-Content -Raw -LiteralPath '.\index.html'
$detail = Get-Content -Raw -LiteralPath '.\curriculum-detail.html'
$css = Get-Content -Raw -LiteralPath '.\new_styles.css'
$allMarkup = $index + "`n" + $detail

$requiredCopy = @(
  '입시를 넘어, 평생 쓰는 영어.',
  'AI 시대의 글로벌 문해력과 생각하는 힘은 영어원서에서 시작됩니다.',
  '해외에 가지 않아도, 영어로 생각하는 아이가 됩니다.',
  '시험이 끝난 뒤에도 살아 있는 영어'
)

foreach ($copy in $requiredCopy) {
  if (-not $index.Contains($copy)) {
    throw "Missing approved copy: $copy"
  }
}

$requiredColors = @('#0C354D', '#8B1E24', '#F6F2E9', '#B89A62', '#18242D')
foreach ($color in $requiredColors) {
  if (-not $css.Contains($color)) {
    throw "Missing brand color: $color"
  }
}

if ($allMarkup -match 'images\.unsplash\.com') {
  throw 'Unsplash imagery remains in the site.'
}

if ($allMarkup -notmatch 'pcmap\.place\.naver\.com/place/1447511520/review/visitor') {
  throw 'Official Naver Place review link is missing.'
}

$decorativeEmojiPattern = '[📖🧠🌍🏆🔤📰💪🎯🏅📘📗📏📚🎧📝🗣️📍☎️]'
if ($allMarkup -match $decorativeEmojiPattern) {
  throw 'Decorative emoji remains in page content.'
}

Write-Host 'Brand refresh verification passed.'
```

- [ ] **Step 2: Run the script and verify it fails against the current page**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-brand-refresh.ps1
```

Expected: FAIL on missing approved copy, missing palette values, remaining Unsplash URLs, or remaining decorative emoji.

- [ ] **Step 3: Commit the guardrail**

```powershell
git add -- scripts/verify-brand-refresh.ps1
git commit -m "test: add Reading Brain brand refresh guardrails"
```

### Task 2: Correct the Hero Video Sequence

**Files:**
- Modify: `scripts/build-hero-video.ps1`
- Modify: `scripts/verify-hero-video.ps1`
- Update: `images/hero/hero-books-crossfade.mp4`
- Update: `images/hero/hero-books-poster.jpg`

**Interfaces:**
- Consumes: the three existing academy source clips in the workspace root.
- Produces: H.264 1280×720 muted composite video and JPEG poster referenced by `index.html`.

- [ ] **Step 1: Extend the video verification to reject a repeated first clip**

Add a duration assertion that the first source contributes only its natural duration plus the configured crossfade overlap:

```powershell
$firstDuration = [double](& ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 $FirstClip)
if ($firstDuration -gt 1.25) {
  throw "Unexpected first source duration: $firstDuration"
}

$outputDuration = [double](& ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 $OutputVideo)
if ($outputDuration -lt 8 -or $outputDuration -gt 12) {
  throw "Composite duration outside expected non-looped range: $outputDuration"
}
```

- [ ] **Step 2: Run video verification and confirm the current 13.4-second looped build fails**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-hero-video.ps1
```

Expected: FAIL because the composite duration reflects the looped four-second first segment.

- [ ] **Step 3: Remove `-stream_loop -1` from the first input only**

Build the first normalized segment at its natural duration and retain looping/trimming only where needed for source clips two and three:

```powershell
& ffmpeg -y `
  -i $FirstClip `
  -stream_loop -1 -i $SecondClip `
  -stream_loop -1 -i $ThirdClip `
  -filter_complex $FilterGraph `
  -map '[vout]' -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart $OutputVideo
```

Set crossfade offsets from probed segment durations rather than a hard-coded four-second first segment.

- [ ] **Step 4: Rebuild the video and poster**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-hero-video.ps1
```

Expected: `images/hero/hero-books-crossfade.mp4` and `images/hero/hero-books-poster.jpg` are regenerated.

- [ ] **Step 5: Verify the rebuilt media**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-hero-video.ps1
```

Expected: PASS; H.264, 1280×720, no audio, and total duration within the non-looped range.

- [ ] **Step 6: Commit the hero correction**

```powershell
git add -- scripts/build-hero-video.ps1 scripts/verify-hero-video.ps1 images/hero/hero-books-crossfade.mp4 images/hero/hero-books-poster.jpg
git commit -m "fix: show first academy hero clip once"
```

### Task 3: Curate and Optimize Authentic Academy Media

**Files:**
- Create: `images/academy/`
- Create: `images/reviews/`
- Modify: `index.html`
- Modify: `curriculum-detail.html`

**Interfaces:**
- Consumes: existing local Reading Brain photos and the public Naver Place review-photo assets already identified.
- Produces: web-ready local JPEG/WebP assets below 350 KB each, with descriptive filenames and documented page usage.

- [ ] **Step 1: Inventory every current visual slot**

Run:

```powershell
rg -n '(<img|<video|data-img=|images\.unsplash\.com|phil-icon|program-badge|heidi-icon|diag-icon|loc-icon)' index.html curriculum-detail.html
```

Expected: a complete list of hero, philosophy, program, diagnostic, review, and detail-page image slots.

- [ ] **Step 2: Match authentic assets to the approved semantic roles**

Use these mappings unless visual inspection shows a stronger authentic alternative:

```text
academy-interior-1.jpg                -> exposure environment
classroom-interactive-board.jpg       -> US curriculum
individual-consultation.jpg           -> 1:1 coaching
newspaper-nonfiction-class.jpg        -> nonfiction/current affairs
phonics-class-actual.jpg              -> foundations
students-test-environment.jpg         -> AR TEST
personalized-learning-report.jpg      -> monthly tracking
signature-advanced-class.jpg          -> entrance/global pathway
speaking-contest.jpg                  -> speech/presentation
usa-curriculum-workbook.jpg           -> curriculum detail
```

- [ ] **Step 3: Download only the selected public review images through the already inspected Naver Place page-assets workflow**

Select images attached to the text-rich reviews chosen for publication. Store them with neutral filenames:

```text
images/reviews/naver-review-consultation.jpg
images/reviews/naver-review-four-skills.jpg
images/reviews/naver-review-personalized.jpg
images/reviews/naver-review-longterm.jpg
```

Do not store reviewer profile photos or names in filenames or metadata.

- [ ] **Step 4: Optimize selected assets**

Run an FFmpeg conversion for each selected source, preserving aspect ratio:

```powershell
ffmpeg -y -i .\images\academy-interior-1.jpg -vf "scale='min(1280,iw)':-2" -q:v 4 .\images\academy\exposure-environment.jpg
```

Repeat with role-specific output names. Verify:

```powershell
Get-ChildItem .\images\academy,.\images\reviews -File |
  Where-Object Length -gt 358400
```

Expected: no output.

- [ ] **Step 5: Replace all external/stock URLs with curated local paths**

Replace every `images.unsplash.com` URL in `index.html` and `curriculum-detail.html` with a matching `images/academy/*.jpg` path.

- [ ] **Step 6: Verify asset paths resolve locally**

Run:

```powershell
$html = Get-Content -Raw .\index.html
[regex]::Matches($html, '(?:src|data-img)="(images/[^"]+)"') |
  ForEach-Object { $_.Groups[1].Value } |
  Sort-Object -Unique |
  ForEach-Object { if (-not (Test-Path -LiteralPath $_)) { throw "Missing asset: $_" } }
```

Expected: PASS with no missing asset.

- [ ] **Step 7: Commit authentic media**

```powershell
git add -- images/academy images/reviews index.html curriculum-detail.html
git commit -m "feat: replace stock visuals with academy media"
```

### Task 4: Apply the Brand Palette and Education Philosophy

**Files:**
- Modify: `index.html`
- Modify: `curriculum-detail.html`
- Modify: `new_styles.css`

**Interfaces:**
- Consumes: approved palette and copy from the design spec.
- Produces: a consistent navy, burgundy, ivory, and gold experience across both HTML pages.

- [ ] **Step 1: Define canonical CSS variables**

Add or replace the root variables in `new_styles.css`:

```css
:root {
  --brand-navy: #0C354D;
  --brand-burgundy: #8B1E24;
  --brand-ivory: #F6F2E9;
  --brand-gold: #B89A62;
  --brand-ink: #18242D;
  --brand-white: #FFFFFF;
}
```

Map legacy color variables to these canonical values until all components are migrated.

- [ ] **Step 2: Replace the hero copy**

Use:

```html
<div class="hero-offer">Reading Is The Only Way</div>
<h1 class="hero-title">입시를 넘어,<br><em>평생 쓰는 영어.</em></h1>
<p class="hero-subtitle">AI 시대의 글로벌 문해력과 생각하는 힘은 영어원서에서 시작됩니다.</p>
<p class="hero-description">
  영어는 외우는 과목이 아니라 충분히 노출되어 체득하는 언어입니다.
  해외에 가지 않아도 리딩브레인에서 영어로 읽고 생각하는 환경을 만듭니다.
</p>
```

- [ ] **Step 3: Build the three-message page narrative**

Use these headings exactly once each:

```html
<h2>해외에 가지 않아도, 영어로 생각하는 아이가 됩니다.</h2>
<h2>원서로 키운 영어는 입시에서 증명되고, 세계에서 사용됩니다.</h2>
<h2>시험이 끝난 뒤에도 살아 있는 영어를 만듭니다.</h2>
```

Remove nearby paragraphs that repeat the same assertion without adding evidence, program detail, or a next step.

- [ ] **Step 4: Apply restrained brand color usage**

Use navy for navigation, primary structure, and dark backgrounds; ivory for alternating reading sections; burgundy for primary CTAs and emphasized words; gold only for verified metrics, awards, and fine divider accents.

- [ ] **Step 5: Align `curriculum-detail.html`**

Import `new_styles.css` if it is not already shared, use the canonical variables, and replace conflicting teal/pink inline values.

- [ ] **Step 6: Run the brand guardrail**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-brand-refresh.ps1
```

Expected: it may still fail only on review links or remaining emoji, which are addressed in Task 5.

- [ ] **Step 7: Commit palette and copy**

```powershell
git add -- index.html curriculum-detail.html new_styles.css
git commit -m "feat: apply Reading Brain brand and lifelong English copy"
```

### Task 5: Replace Decorative Emoji and Add Linked Official Media

**Files:**
- Modify: `index.html`
- Modify: `new_styles.css`

**Interfaces:**
- Consumes: optimized `images/academy/` media and verified official URLs.
- Produces: accessible linked media cards and monochrome functional icons.

- [ ] **Step 1: Replace philosophy and program emoji blocks with media cards**

Use a common card structure:

```html
<a class="content-media-card"
   href="https://blog.naver.com/jadeacademy/224160237798"
   target="_blank"
   rel="noopener noreferrer">
  <img src="images/academy/exposure-environment.jpg"
       alt="리딩브레인 영어원서 노출 환경">
  <span class="content-media-source">리딩브레인 블로그에서 자세히 보기</span>
</a>
```

Use exact official links already verified:

```text
Original-book environment: https://pf.kakao.com/_KnBMb/112800577
National reading/AI-era philosophy: https://blog.naver.com/jadeacademy/224160237798
US literacy assignment: https://blog.naver.com/jadeacademy/224152133212
Mock examination result: https://blog.naver.com/jadeacademy/224165534214
AI education/news: https://pf.kakao.com/_KnBMb/113382476
Entrance/original reading connection: https://pf.kakao.com/_KnBMb/113236703
```

- [ ] **Step 2: Replace functional emoji with inline monochrome SVG**

Use the same presentation contract:

```html
<span class="utility-icon" aria-hidden="true">
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.54 3.6.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.18 2.5.54 3.6a1 1 0 0 1-.24 1z"/>
  </svg>
</span>
```

Give each icon an adjacent text label so meaning never depends on the icon alone.

- [ ] **Step 3: Add responsive media styling**

```css
.content-media-card {
  display: grid;
  gap: 0.75rem;
  color: inherit;
  text-decoration: none;
}

.content-media-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 1rem;
}

.utility-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}
```

- [ ] **Step 4: Verify emoji and official-link cleanup**

Run:

```powershell
rg -n --pcre2 '\p{Extended_Pictographic}' index.html curriculum-detail.html
rg -n 'blog\.naver\.com/jadeacademy|pf\.kakao\.com/_KnBMb|place/1447511520' index.html
```

Expected: no decorative emoji; official links appear only on semantically matched cards.

- [ ] **Step 5: Commit linked real media**

```powershell
git add -- index.html new_styles.css
git commit -m "feat: replace decorative emoji with official academy media"
```

### Task 6: Add Photo-Backed Naver Parent Reviews

**Files:**
- Modify: `index.html`
- Modify: `new_styles.css`
- Test: `scripts/verify-brand-refresh.ps1`

**Interfaces:**
- Consumes: selected `images/reviews/*.jpg` and public Naver Place excerpts.
- Produces: four to six anonymized, photo-backed review cards linked to the official review page.

- [ ] **Step 1: Add four evidence-rich review cards**

Use this exact link on each card:

```text
https://pcmap.place.naver.com/place/1447511520/review/visitor
```

Use concise excerpts based on the inspected public reviews:

```text
“상담 분위기가 편안했고 커리큘럼을 체계적으로 설명해 주셨어요. 아이도 첫 수업이 재미있었다고 했습니다.”
“원서 읽기뿐 아니라 라이팅과 스피치까지 영어의 네 영역을 고르게 지도해 주세요.”
“아이의 학습 속도에 맞춰 지도하고, 행사와 이벤트도 준비해 주어 즐겁게 다니고 있어요.”
“저학년부터 꾸준히 다니며 자연스럽게 영어를 배우고 익히고 있습니다.”
```

- [ ] **Step 2: Use a privacy-preserving card structure**

```html
<article class="parent-review-card">
  <img src="images/reviews/naver-review-consultation.jpg"
       alt="네이버 방문자 리뷰에 첨부된 리딩브레인 학원 사진">
  <blockquote>“상담 분위기가 편안했고 커리큘럼을 체계적으로 설명해 주셨어요.”</blockquote>
  <div class="parent-review-meta">
    <span>네이버 방문자 리뷰</span>
    <a href="https://pcmap.place.naver.com/place/1447511520/review/visitor"
       target="_blank" rel="noopener noreferrer">원문 리뷰 보기</a>
  </div>
</article>
```

Do not include profile pictures, full usernames, or claims not present in the selected source review.

- [ ] **Step 3: Add responsive review styles**

```css
.parent-review-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.parent-review-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

@media (max-width: 720px) {
  .parent-review-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run the complete static guardrail**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-brand-refresh.ps1
```

Expected: PASS.

- [ ] **Step 5: Commit the reviews**

```powershell
git add -- index.html new_styles.css images/reviews scripts/verify-brand-refresh.ps1
git commit -m "feat: add verified Naver parent reviews"
```

### Task 7: Browser Verification and Production Deployment

**Files:**
- Verify: `index.html`
- Verify: `curriculum-detail.html`
- Verify: `new_styles.css`
- Verify: `images/`
- Verify: `vercel.json`

**Interfaces:**
- Consumes: completed static site and curated Vercel project metadata.
- Produces: verified production deployment on `readingbrain.co.kr` and `www.readingbrain.co.kr`.

- [ ] **Step 1: Run all local verification scripts**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-brand-refresh.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify-hero-video.ps1
```

Expected: both PASS.

- [ ] **Step 2: Start a local static server**

Run:

```powershell
python -m http.server 4173
```

Expected: the site is available at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify desktop layout in Chrome**

Check:

```text
Viewport: 1440×900
Primary copy visible without scrolling
Hero video plays clip one once, then clips two and three
Navy/ivory structure and burgundy CTA are visually consistent
All authentic media cards have meaningful alt text and valid official links
Review cards show photos, source label, and no full reviewer names
No horizontal scrolling or text overlap
```

- [ ] **Step 4: Verify mobile and reduced motion**

Check:

```text
Viewport: 390×844
Hero copy remains readable over the video
Media and review grids collapse to one column
Tap targets remain at least 44×44 CSS pixels
With prefers-reduced-motion: reduce, poster replaces moving hero
```

- [ ] **Step 5: Build a curated deployment directory**

Copy only:

```text
index.html
curriculum-detail.html
new_styles.css
director.png
logo.jpg
vercel.json
images/
.vercel/project.json
```

Do not copy raw root photos, source clips, `.deploy-*`, or documentation.

- [ ] **Step 6: Deploy production**

From the curated deployment directory, run:

```powershell
npx --yes vercel@latest --prod --yes
```

Expected: production deployment completes and aliases to the Reading Brain domain.

- [ ] **Step 7: Verify production endpoints**

Run:

```powershell
$urls = @(
  'https://readingbrain.co.kr/',
  'https://www.readingbrain.co.kr/',
  'https://www.readingbrain.co.kr/images/hero/hero-books-crossfade.mp4',
  'https://www.readingbrain.co.kr/images/hero/hero-books-poster.jpg'
)
foreach ($url in $urls) {
  $response = Invoke-WebRequest -Uri $url -MaximumRedirection 5
  if ($response.StatusCode -ne 200) { throw "$url returned $($response.StatusCode)" }
}
```

Expected: all final endpoints return HTTP 200 after redirects.

- [ ] **Step 8: Compare production copy with the local source**

Run:

```powershell
$served = (Invoke-WebRequest -Uri 'https://www.readingbrain.co.kr/').Content
if (-not $served.Contains('입시를 넘어, 평생 쓰는 영어.')) {
  throw 'Production is not serving the approved hero copy.'
}
```

Expected: PASS.

- [ ] **Step 9: Commit deployment-ready source changes**

```powershell
git add -- index.html curriculum-detail.html new_styles.css images scripts vercel.json
git commit -m "feat: complete Reading Brain brand content redesign"
```

