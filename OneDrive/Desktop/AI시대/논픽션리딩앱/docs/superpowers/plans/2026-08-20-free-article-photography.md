# Free Article Photography Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add locally hosted, correctly attributed Wikimedia Commons photographs to all 15 AR 1 batch-07 articles across the home, explore, and reader screens without any generative-image or paid-image API.

**Architecture:** A focused `ArticleHeroImage` value flows from a batch-specific manifest into library seeds, studio drafts, published articles, and the three learner screens. A reusable client component owns image rendering and fallback behavior; local assets live under `public/article-images/ar1-batch-07/`, while complete attribution metadata stays in TypeScript data.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 7, Vitest, Testing Library, Wikimedia Commons Action API, local static image assets.

**Spec:** `docs/superpowers/specs/2026-08-20-free-article-photography-design.md`

## Global Constraints

- Apply the pilot only to the 15 exported entries in `AR1_BATCH_07`.
- Use Wikimedia Commons files explicitly marked CC BY, CC BY-SA, or public domain.
- Do not call a generative-image API or a paid image API.
- Store downloaded images below `public/article-images/ar1-batch-07/`; do not hotlink them.
- Preserve the original image ratio and use CSS `object-fit: cover`; do not edit the original pixels.
- Record title, creator, source page, license name, license URL, Korean alt text, and `isModified: false` for every photograph.
- Existing articles without `heroImage` must retain their current theme visuals.
- Before UI code, read `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`, `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, and `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/public-folder.md` completely.

---

### Task 1: Hero-image data contract and publication flow

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/studio-types.ts`
- Modify: `lib/library/build-draft.ts`
- Modify: `lib/studio-workflow.ts`
- Modify: `lib/studio-store.ts`
- Modify: `lib/studio-seed.ts`
- Modify: `lib/public-article-schema.ts`
- Modify: `components/studio/studio-preview.tsx`
- Test: `tests/library-draft.test.ts`
- Test: `tests/public-article-schema.test.ts`
- Test: `tests/studio-workflow.test.ts`
- Test: `tests/studio-store.test.ts`

**Interfaces:**
- Produces: `ArticleHeroImage` and optional `heroImage?: ArticleHeroImage` on `LibrarySeed`, `StudioArticle`, and `Article`.
- Consumes: existing library-seed → studio-draft → published-article conversion functions.

- [ ] **Step 1: Write failing preservation and validation tests**

Add a literal fixture with:

```ts
const heroImage = {
  src: "/article-images/ar1-batch-07/owl-flight.jpg",
  altKo: "날개를 펼쳐 낮게 나는 올빼미",
  sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
  title: "Example owl",
  creator: "Example Creator",
  licenseName: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  isModified: false as const,
};
```

Assert that `buildLibraryDraft`, publication, cloning, persistence migration, and studio preview preserve this value. Add schema cases rejecting blank creator, non-local `src`, non-HTTPS attribution URLs, unsupported licenses, and `isModified: true`. Keep a passing case where `heroImage` is absent.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```powershell
npm test -- --run tests/library-draft.test.ts tests/public-article-schema.test.ts tests/studio-workflow.test.ts tests/studio-store.test.ts
```

Expected: FAIL because `heroImage` is not part of the types or conversion flow.

- [ ] **Step 3: Implement the minimal contract and conversions**

Define:

```ts
export type ArticleHeroImage = {
  src: string;
  altKo: string;
  sourcePageUrl: string;
  title: string;
  creator: string;
  licenseName: "CC BY 2.0" | "CC BY 3.0" | "CC BY 4.0" | "CC BY-SA 2.0" | "CC BY-SA 3.0" | "CC BY-SA 4.0" | "Public domain";
  licenseUrl: string;
  isModified: false;
};
```

Add the optional field to all three article stages, copy it defensively in transformations and persistence, and validate it in `parsePublicArticle`. Accept only `src` values beginning `/article-images/` and HTTPS source/license URLs.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run the Step 2 command. Expected: all focused tests PASS.

- [ ] **Step 5: Commit the contract**

```powershell
git add -- lib/types.ts lib/studio-types.ts lib/library/build-draft.ts lib/studio-workflow.ts lib/studio-store.ts lib/studio-seed.ts lib/public-article-schema.ts components/studio/studio-preview.tsx tests/library-draft.test.ts tests/public-article-schema.test.ts tests/studio-workflow.test.ts tests/studio-store.test.ts
git commit -m "feat: carry article photo attribution through publishing"
```

### Task 2: Curate, download, and validate 15 Commons photographs

**Files:**
- Create: `lib/library/ar1-07-images.ts`
- Create: `scripts/download-ar1-07-images.mjs`
- Create: `public/article-images/ar1-batch-07/*.{jpg,jpeg,png,webp}`
- Modify: `lib/library/ar1-07.ts`
- Test: `tests/article-hero-images.test.ts`

**Interfaces:**
- Consumes: `ArticleHeroImage` and the exact 15 exported IDs in `AR1_BATCH_07`.
- Produces: `AR1_BATCH_07_IMAGES: Record<string, ArticleHeroImage>` and 15 matching local files.

- [ ] **Step 1: Write the failing manifest test**

Assert literals for these behavioral rules:

```ts
expect(Object.keys(AR1_BATCH_07_IMAGES)).toHaveLength(15);
expect(new Set(Object.values(AR1_BATCH_07_IMAGES).map((image) => image.src)).size).toBe(15);
```

For every exported batch-07 seed, require a manifest entry, a nonempty Korean alt, an allowed license, HTTPS source/license URLs, `isModified === false`, and an existing nonempty file at `public${image.src}`. Also assert every resulting seed carries the same `heroImage` value.

- [ ] **Step 2: Run the test and verify RED**

```powershell
npm test -- --run tests/article-hero-images.test.ts
```

Expected: FAIL because the manifest and files do not exist.

- [ ] **Step 3: Select exact Commons files and record metadata**

Search one distinct, child-safe documentary photograph for each subject: owl flight, ocean tides, fingerprints, ancient stone bridges, early glassmaking, ink writing, stone sculpture, orchestra, origami, truth/apology, group decisions, school-bag preparation, reading focus, world tea culture, and kite flying.

For each candidate, query:

```text
const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url|extmetadata&iiextmetadatafilter=Artist|LicenseShortName|LicenseUrl|ObjectName&iiurlwidth=1600&titles=${encodeURIComponent(fileTitle)}`;
```

Reject a file unless its file page and API metadata agree on creator and an allowed license. Prefer photographs without identifiable children; for abstract social topics, use a natural staged still life or adult hands rather than a literal child portrait.

- [ ] **Step 4: Implement the deterministic downloader and manifest**

Create a script whose input array contains the 15 selected Commons file titles and output filenames. It requests `thumburl`, refuses responses missing creator/license/source fields, refuses unsupported licenses, and writes only within `public/article-images/ar1-batch-07/`. Store the verified metadata and Korean alt text in `AR1_BATCH_07_IMAGES`, then attach it while exporting the first 15 candidates:

```ts
heroImage: AR1_BATCH_07_IMAGES[item.id],
```

- [ ] **Step 5: Run the downloader and verify GREEN**

```powershell
node scripts/download-ar1-07-images.mjs
npm test -- --run tests/article-hero-images.test.ts tests/library.test.ts
```

Expected: 15 files downloaded; both test files PASS.

- [ ] **Step 6: Visually inspect all assets**

Create a temporary contact sheet for inspection without altering source images. Reject any photo that is inaccurate, low-resolution, watermarked, duplicated, unsafe, or visually unusable at card crop. Delete the temporary contact sheet after approval.

- [ ] **Step 7: Commit the curated content**

```powershell
git add -- lib/library/ar1-07-images.ts lib/library/ar1-07.ts scripts/download-ar1-07-images.mjs public/article-images/ar1-batch-07 tests/article-hero-images.test.ts
git commit -m "content: add attributed photos for AR 1 batch 07"
```

### Task 3: Reusable photograph with graceful fallback

**Files:**
- Create: `components/article-hero-photo.tsx`
- Test: `tests/article-hero-photo.test.tsx`

**Interfaces:**
- Consumes: `heroImage?: ArticleHeroImage`, `visualTheme: string`, `variant: "home" | "thumb" | "reader"`, and optional child overlay content.
- Produces: `ArticleHeroPhoto`, which renders a local photo, attribution for reader mode, and a theme fallback after load failure.

- [ ] **Step 1: Read the required local Next.js image and public-folder docs**

Read all three files listed in Global Constraints before choosing `<Image>` or `<img>`. Follow the installed Next.js 16 behavior rather than remembered APIs.

- [ ] **Step 2: Write failing component tests**

Test real rendering behavior:

- With metadata, the image uses `src` and `altKo`.
- Reader mode renders creator, source-page, and license links with safe new-tab attributes.
- Home and thumb modes do not crowd the card with visible credit text.
- Without metadata, the theme class and fallback content render.
- Dispatching an image `error` event removes the broken image and renders the theme fallback.

- [ ] **Step 3: Run the component test and verify RED**

```powershell
npm test -- --run tests/article-hero-photo.test.tsx
```

Expected: FAIL because `ArticleHeroPhoto` does not exist.

- [ ] **Step 4: Implement the minimal component**

Use local component state keyed by `heroImage?.src` to reset failures when the article changes. Keep the fallback DOM stable and add variant classes. In reader mode render a `figcaption` containing the title, creator, source link, and license link; do not render empty attribution.

- [ ] **Step 5: Run the component test and verify GREEN**

Run the Step 3 command. Expected: PASS.

- [ ] **Step 6: Commit the component**

```powershell
git add -- components/article-hero-photo.tsx tests/article-hero-photo.test.tsx
git commit -m "feat: add article photograph with theme fallback"
```

### Task 4: Integrate photographs into all learner surfaces

**Files:**
- Modify: `components/home-screen.tsx`
- Modify: `components/explore-screen.tsx`
- Modify: `components/reader-screen.tsx`
- Modify: `app/globals.css`
- Test: `tests/home-screen.test.tsx`
- Test: `tests/explore-screen.test.tsx`
- Test: `tests/reader-screen.test.tsx`

**Interfaces:**
- Consumes: `ArticleHeroPhoto` and article `heroImage` metadata.
- Produces: consistent home-card, list-thumbnail, and reader-hero presentation.

- [ ] **Step 1: Write failing integration tests**

Add hero metadata to one literal article fixture and assert:

- Home recommendation renders its Korean-alt photograph and keeps the title readable.
- Explore result renders its Korean-alt thumbnail.
- Reader renders the photograph plus visible creator and license links.
- A fixture without `heroImage` still renders the previous theme class on all three surfaces.

- [ ] **Step 2: Run the three tests and verify RED**

```powershell
npm test -- --run tests/home-screen.test.tsx tests/explore-screen.test.tsx tests/reader-screen.test.tsx
```

Expected: FAIL because the screens do not consume `ArticleHeroPhoto`.

- [ ] **Step 3: Replace the three visual blocks**

Use `variant="home"` for the daily card, `variant="thumb"` for each explore card, and `variant="reader"` above the article title. Preserve existing click handlers, labels, progress behavior, and theme fallback content.

- [ ] **Step 4: Add responsive styles**

Add focused classes for the three variants. Use `object-fit: cover`, retain the existing 76px thumbnail and 170px reader dimensions, apply a fixed dark overlay only behind home-card text, make credit text wrap, and keep source links at least 44px high where they are independent controls.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run the Step 2 command. Expected: PASS.

- [ ] **Step 6: Commit the UI integration**

```powershell
git add -- components/home-screen.tsx components/explore-screen.tsx components/reader-screen.tsx app/globals.css tests/home-screen.test.tsx tests/explore-screen.test.tsx tests/reader-screen.test.tsx
git commit -m "feat: show article photos across learner screens"
```

### Task 5: Full verification and visual QA

**Files:**
- Modify only if verification exposes an issue in files already listed above.

**Interfaces:**
- Consumes: the complete photo pipeline.
- Produces: fresh automated and browser evidence for the pilot completion criteria.

- [ ] **Step 1: Run all automated verification**

```powershell
npm test
npm run lint
npm run build
```

Expected: 0 failed tests, type checks exit 0, production build exits 0.

- [ ] **Step 2: Start or reuse the dev server and run browser verification**

Open `http://localhost:3000`, wait for network idle, and verify no framework error overlay or blank page. Check at least one photo article in home, explore, and reader flows.

- [ ] **Step 3: Check responsive layouts**

At mobile and desktop viewport widths, verify image cropping, title contrast, Korean alt presence in accessibility snapshot, credit wrapping, safe external-link attributes, and fallback by temporarily dispatching an image error in the browser.

- [ ] **Step 4: Inspect repository scope**

```powershell
git status --short -- .
git diff --check
```

Expected: only planned app files and 15 photo assets are changed; no whitespace errors.

- [ ] **Step 5: Commit any verification-only correction**

If Step 1–4 required a correction, rerun all affected checks and commit only that correction:

Stage only paths shown as modified by `git status --short -- .`, excluding the pre-existing batch-07 content changes unless they were part of the correction, then commit with `git commit -m "fix: complete article photo verification"`.
