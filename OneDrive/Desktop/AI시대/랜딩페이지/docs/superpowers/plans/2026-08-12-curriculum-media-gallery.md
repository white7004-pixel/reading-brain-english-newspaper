# Curriculum Media Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the five primary curriculum cards' small single images with large, responsive galleries made from the user's existing class and textbook media.

**Architecture:** Keep the current single-file landing page structure and introduce one reusable gallery markup pattern plus shared CSS. A focused Node verification script will assert gallery counts, media assignments, retained links, accessibility labels, and responsive rules.

**Tech Stack:** Static HTML5, CSS, Node.js verification script

## Global Constraints

- Use only media already present in the project.
- Enhance only the five primary curriculum cards.
- Preserve existing curriculum descriptions, external detail links, and textbook showcases.
- Use lazy-loaded images with descriptive Korean alt text.
- Provide a responsive horizontal gallery on screens 720px wide or narrower.

---

### Task 1: Add curriculum gallery verification

**Files:**
- Create: `scripts/verify-curriculum-media-galleries.mjs`
- Test: `scripts/verify-curriculum-media-galleries.mjs`

**Interfaces:**
- Consumes: `index.html` as UTF-8 text
- Produces: exit code 0 only when five galleries, all assigned media, accessibility attributes, retained links, and responsive CSS are present

- [ ] **Step 1: Write the failing verification script**

Create assertions for exactly five `data-curriculum-gallery` elements; the 15 image paths listed in the design; `href="#admissions-management"`; five distinct gallery `aria-label` values; `.curriculum-media-feature`; and the 720px horizontal-scroll rule.

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/verify-curriculum-media-galleries.mjs`

Expected: FAIL because gallery markup and styles do not exist.

- [ ] **Step 3: Commit the failing verification**

```powershell
git add -- scripts/verify-curriculum-media-galleries.mjs
git commit -m "test: cover curriculum media galleries"
```

### Task 2: Implement shared large gallery styling

**Files:**
- Modify: `index.html` in the program media CSS block near `.program-media-link`
- Test: `scripts/verify-curriculum-media-galleries.mjs`

**Interfaces:**
- Consumes: `.curriculum-media-gallery`, `.curriculum-media-feature`, `.curriculum-media-thumbs`, `.curriculum-media-thumb`, `.curriculum-media-actions`
- Produces: large desktop feature media, two-column supporting media, and mobile horizontal scrolling

- [ ] **Step 1: Add the minimal shared CSS**

Add a full-width feature image with a 16:9 ratio and minimum 300px display height, two equal supporting thumbnails, overlay captions, hover/focus treatment, and action links.

- [ ] **Step 2: Add responsive CSS**

Inside `@media (max-width: 720px)`, reduce the feature minimum height, set the thumbnail row to `display:flex; overflow-x:auto`, and give each thumbnail a stable width so it remains legible.

- [ ] **Step 3: Run the verifier**

Run: `node scripts/verify-curriculum-media-galleries.mjs`

Expected: FAIL only on missing HTML galleries and media assignments.

### Task 3: Add galleries to the five curriculum cards

**Files:**
- Modify: `index.html` program cards `pc-1` through `pc-5`
- Test: `scripts/verify-curriculum-media-galleries.mjs`

**Interfaces:**
- Consumes: shared gallery classes from Task 2 and existing project media paths
- Produces: five accessible galleries and retained curriculum-detail navigation

- [ ] **Step 1: Replace each single image block**

For each target card, insert one feature image and two supporting images using the exact assignments in the design. Add unique Korean `alt`, visible captions, `loading="lazy"`, and an `aria-label` on every original-image link.

- [ ] **Step 2: Restore existing detail destinations as actions**

Keep each current Kakao or Naver Blog destination below its gallery. Add `href="#admissions-management"` to the middle/high school card as the video action.

- [ ] **Step 3: Preserve textbook content**

Leave `.textbook-showcase` sections directly after the new gallery/action area for the middle/high school and newspaper cards.

- [ ] **Step 4: Run the focused verifier**

Run: `node scripts/verify-curriculum-media-galleries.mjs`

Expected: PASS with five galleries and all 15 assigned media paths.

### Task 4: Final regression verification

**Files:**
- Verify: `index.html`
- Verify: `scripts/verify-curriculum-media-galleries.mjs`
- Verify: `scripts/verify-program-curriculum-names.mjs`

**Interfaces:**
- Consumes: completed landing-page change
- Produces: fresh evidence that gallery and curriculum-name requirements coexist without whitespace errors

- [ ] **Step 1: Run both focused verifiers**

```powershell
node scripts/verify-curriculum-media-galleries.mjs
node scripts/verify-program-curriculum-names.mjs
```

Expected: both commands print `PASS` and exit 0.

- [ ] **Step 2: Check the patch**

Run: `git diff --check -- index.html scripts/verify-curriculum-media-galleries.mjs`

Expected: exit 0 with no whitespace errors.

- [ ] **Step 3: Inspect final scoped diff**

Run: `git diff -- index.html scripts/verify-curriculum-media-galleries.mjs`

Expected: only the shared gallery CSS, five gallery blocks, and focused verifier are part of this feature.
