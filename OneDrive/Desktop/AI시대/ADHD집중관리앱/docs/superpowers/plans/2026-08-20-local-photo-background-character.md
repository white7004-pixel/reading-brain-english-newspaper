# Local Photo Background and Character Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users privately turn a local photo into an original background or deterministic Monggle-style portrait for the background, profile, or both, while always falling back to the approved default mascot.

**Architecture:** Store normalized image blobs and appearance selections in a new Dexie schema version. Keep file validation, resizing, segmentation, composition, storage, and UI in separate modules; MediaPipe runs from bundled WASM and a bundled selfie-segmentation model, while Canvas produces deterministic preset renders without any server upload.

**Tech Stack:** React 19, TypeScript, Dexie 4, Canvas 2D, `@mediapipe/tasks-vision@1.0.1`, Vitest, Testing Library, Playwright, Vite PWA

**Spec:** `docs/superpowers/specs/2026-08-20-local-photo-background-character-design.md`

## Global Constraints

- Accept only JPEG, PNG, and WebP files no larger than 12MB.
- Normalize the long image edge to at most 2048px before persistence or segmentation.
- Never upload photo pixels, names, paths, masks, or face information to a server or analytics endpoint.
- Use only local IndexedDB blobs, bundled WASM, bundled TFLite model, and deterministic Canvas composition; no external AI API or paid credits.
- Keep `monggle-3d-approved-v1.png` active until the user explicitly applies a valid replacement.
- Provide `cloud_suit`, `studio_3d`, and `lavender_figure` presets and `background`, `profile`, and `both` targets.
- Any missing, corrupt, deleted, unsupported, or failed asset falls back to the Studio purple background and approved default Monggle.

---

### Task 1: Appearance Models and Atomic Local Storage

**Files:**
- Create: `web/src/core/model/appearance.ts`
- Modify: `web/src/core/storage/database.ts`
- Create: `web/src/features/appearance/appearanceRepository.ts`
- Test: `web/src/features/appearance/appearanceRepository.test.ts`

**Interfaces:**
- Produces: `PhotoAsset`, `CharacterRender`, `AppearanceSettings`, `AppearanceTarget`, `CharacterPreset`
- Produces: `appearanceRepository.savePhoto(asset)`, `saveRender(render)`, `loadSettings()`, `apply(settings)`, `deleteAllPersonalization()`
- Consumes: existing `MonggleDatabase` and `crypto.randomUUID()`

- [ ] **Step 1: Write the failing repository tests**

```ts
it('starts with default Monggle and Studio purple', async () => {
  expect(await repository.loadSettings()).toMatchObject({
    background: { kind: 'preset', preset: 'studio_purple' },
    profile: { kind: 'default_monggle' },
  })
})

it('deletes personal blobs and atomically restores defaults', async () => {
  await repository.savePhoto(photo)
  await repository.saveRender(render)
  await repository.apply(personalSettings)
  await repository.deleteAllPersonalization()
  expect(await database.photoAssets.count()).toBe(0)
  expect(await database.characterRenders.count()).toBe(0)
  expect(await repository.loadSettings()).toEqual(defaultAppearanceSettings)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `cd web && npm run test:run -- src/features/appearance/appearanceRepository.test.ts`

Expected: FAIL because the model and repository modules do not exist.

- [ ] **Step 3: Define exact data contracts**

```ts
export type CharacterPreset = 'cloud_suit' | 'studio_3d' | 'lavender_figure'
export type BuiltInBackground = 'studio_purple' | 'lavender_glass' | 'night_sky' | 'calm_desk'
export type AppearanceTarget = 'background' | 'profile' | 'both'
export interface PhotoAsset { id: string; blob: Blob; mimeType: 'image/jpeg'|'image/png'|'image/webp'; width: number; height: number; createdAt: string }
export interface CharacterRender { id: string; sourcePhotoId: string; preset: CharacterPreset; blob: Blob; createdAt: string }
export type BackgroundSource = { kind: 'preset'; preset: BuiltInBackground } | { kind: 'photo'|'character'; assetId: string }
export type ProfileSource = { kind: 'default_monggle' } | { kind: 'photo'|'character'; assetId: string }
export interface AppearanceSettings { key: 'main'; background: BackgroundSource; profile: ProfileSource; brightness: number; blur: number; violetOverlay: number }
```

- [ ] **Step 4: Upgrade Dexie and implement transaction boundaries**

Add version 2 stores `photoAssets: '&id,createdAt'`, `characterRenders: '&id,sourcePhotoId,preset,createdAt'`, and `appearanceSettings: '&key'`. Implement deletion and default restoration inside one `database.transaction('rw', ...)` call.

- [ ] **Step 5: Run all storage tests and commit**

Run: `cd web && npm run test:run -- src/core/storage src/features/appearance/appearanceRepository.test.ts`

Expected: PASS.

```bash
git add -- web/src/core/model/appearance.ts web/src/core/storage/database.ts web/src/features/appearance
git commit -m "feat: store local appearance assets"
```

### Task 2: File Validation and Memory-Safe Normalization

**Files:**
- Create: `web/src/features/appearance/photoValidation.ts`
- Create: `web/src/features/appearance/photoValidation.test.ts`
- Create: `web/src/features/appearance/normalizePhoto.ts`
- Create: `web/src/features/appearance/normalizePhoto.test.ts`

**Interfaces:**
- Produces: `validatePhoto(file): { ok: true } | { ok: false; reason: 'unsupported_type'|'too_large' }`
- Produces: `normalizePhoto(file, maxEdge = 2048): Promise<NormalizedPhoto>`
- `NormalizedPhoto` is `{ blob, mimeType, width, height }`

- [ ] **Step 1: Write failing validation and size tests**

```ts
it.each(['image/jpeg', 'image/png', 'image/webp'])('accepts %s', (type) => {
  expect(validatePhoto(new File(['x'], 'photo', { type }))).toEqual({ ok: true })
})

it('rejects HEIC and files over 12MB', () => {
  expect(validatePhoto(new File(['x'], 'a.heic', { type: 'image/heic' }))).toMatchObject({ reason: 'unsupported_type' })
  expect(validatePhoto(new File([new Uint8Array(12 * 1024 * 1024 + 1)], 'a.jpg', { type: 'image/jpeg' }))).toMatchObject({ reason: 'too_large' })
})

it('keeps the aspect ratio and caps the long edge', async () => {
  const result = await normalizePhoto(landscape4096x2048)
  expect(result).toMatchObject({ width: 2048, height: 1024, mimeType: 'image/jpeg' })
})
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `cd web && npm run test:run -- src/features/appearance/photoValidation.test.ts src/features/appearance/normalizePhoto.test.ts`

Expected: FAIL because validation and normalization do not exist.

- [ ] **Step 3: Implement validation before decode**

Use exact MIME allowlist and `12 * 1024 * 1024` byte limit. Return Korean UI messages from a separate `photoErrorMessage(reason)` function so logic remains locale-independent.

- [ ] **Step 4: Implement decode, resize, and cleanup**

Use `createImageBitmap(file)`, calculate `scale = Math.min(1, maxEdge / Math.max(width, height))`, render to an `OffscreenCanvas` when available or detached `<canvas>`, export with JPEG quality `0.9` or preserve PNG/WebP MIME, call `bitmap.close()`, and release temporary references in `finally`.

- [ ] **Step 5: Run appearance tests and commit**

Run: `cd web && npm run test:run -- src/features/appearance`

Expected: PASS.

```bash
git add -- web/src/features/appearance/photoValidation* web/src/features/appearance/normalizePhoto*
git commit -m "feat: validate and normalize local photos"
```

### Task 3: Built-In and Personal Background Rendering

**Files:**
- Create: `web/src/features/appearance/backgroundPresets.ts`
- Create: `web/src/features/appearance/AppBackground.tsx`
- Create: `web/src/features/appearance/AppBackground.test.tsx`
- Create: `web/src/features/appearance/appearance.css`
- Modify: `web/src/app/AppShell.tsx`
- Modify: `web/src/core/theme/tokens.css`

**Interfaces:**
- Produces: `<AppBackground settings assetUrl />`
- Produces: `backgroundPresets: Record<BuiltInBackground, { label: string; className: string }>`
- Consumes: `AppearanceSettings`, a resolved object URL, and the existing fixed AppShell

- [ ] **Step 1: Write the failing fallback and personal-photo tests**

```tsx
it('uses Studio purple when there is no personal asset', () => {
  render(<AppBackground settings={defaultAppearanceSettings} assetUrl={null} />)
  expect(screen.getByTestId('app-background')).toHaveAttribute('data-background', 'studio_purple')
})

it('applies a personal URL and readable overlay controls', () => {
  render(<AppBackground settings={photoSettings} assetUrl="blob:photo" />)
  expect(screen.getByTestId('app-background')).toHaveStyle({ backgroundImage: 'url(blob:photo)' })
  expect(screen.getByTestId('app-background-overlay')).toHaveStyle({ opacity: '0.45' })
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `cd web && npm run test:run -- src/features/appearance/AppBackground.test.tsx`

Expected: FAIL because background components do not exist.

- [ ] **Step 3: Implement four bundled CSS presets and one personal image layer**

Keep the background component as the first child of AppShell, fixed behind content, `aria-hidden`, and `pointer-events: none`. Clamp brightness to `0.45–1`, blur to `0–18px`, and violet overlay to `0.2–0.75` before setting CSS custom properties.

- [ ] **Step 4: Resolve and revoke Blob URLs in AppShell**

Load appearance settings once, fetch the referenced blob, call `URL.createObjectURL`, and revoke the previous URL on replacement or unmount. If lookup fails, pass `null` and default settings to `AppBackground`.

- [ ] **Step 5: Run shell and appearance tests and commit**

Run: `cd web && npm run test:run -- src/app src/features/appearance`

Expected: PASS.

```bash
git add -- web/src/features/appearance/AppBackground* web/src/features/appearance/backgroundPresets.ts web/src/features/appearance/appearance.css web/src/app/AppShell.tsx web/src/core/theme/tokens.css
git commit -m "feat: add selectable app backgrounds"
```

### Task 4: Bundled Person Segmentation and Deterministic Character Composer

**Files:**
- Modify: `web/package.json`
- Create: `web/scripts/copy-mediapipe-assets.mjs`
- Create: `web/public/models/selfie_segmenter.tflite`
- Create: `web/public/mediapipe/wasm/` bundled runtime files
- Create: `web/src/features/appearance/personSegmenter.ts`
- Create: `web/src/features/appearance/personSegmenter.test.ts`
- Create: `web/src/features/appearance/composeCharacter.ts`
- Create: `web/src/features/appearance/composeCharacter.test.ts`
- Create: `web/public/assets/character/cloud-suit.svg`
- Create: `web/public/assets/character/studio-3d.svg`
- Create: `web/public/assets/character/lavender-figure.svg`

**Interfaces:**
- Produces: `createPersonSegmenter(): Promise<{ segment(source): Promise<ImageData>; close(): void }>`
- Produces: `composeCharacter(source, mask, preset): Promise<Blob>`
- Consumes: normalized image source, bundled MediaPipe runtime/model, and three original overlay assets

- [ ] **Step 1: Install and pin the local runtime**

Run: `cd web && npm install @mediapipe/tasks-vision@1.0.1`

Add `postinstall: "node scripts/copy-mediapipe-assets.mjs"`. The script copies the package WASM files into `public/mediapipe/wasm`. Download the official selfie segmenter once into the repo:

```powershell
Invoke-WebRequest -Uri "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite" -OutFile "public/models/selfie_segmenter.tflite"
```

- [ ] **Step 2: Write failing adapter and deterministic composition tests**

```ts
it('configures MediaPipe with bundled local paths', async () => {
  const segmenter = await createPersonSegmenter(fakeVisionRuntime)
  expect(fakeVisionRuntime.fileset).toBe('/mediapipe/wasm')
  expect(fakeVisionRuntime.model).toBe('/models/selfie_segmenter.tflite')
  segmenter.close()
})

it.each(['cloud_suit', 'studio_3d', 'lavender_figure'] as const)('composes %s without network calls', async (preset) => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch')
  const blob = await composeCharacter(source, personMask, preset, testAssets)
  expect(blob.type).toBe('image/webp')
  expect(fetchSpy).not.toHaveBeenCalled()
})
```

- [ ] **Step 3: Run focused tests and verify RED**

Run: `cd web && npm run test:run -- src/features/appearance/personSegmenter.test.ts src/features/appearance/composeCharacter.test.ts`

Expected: FAIL because adapters and composer do not exist.

- [ ] **Step 4: Implement MediaPipe adapter with explicit failure modes**

Initialize `FilesetResolver.forVisionTasks('/mediapipe/wasm')` and `ImageSegmenter.createFromOptions` with local model path, `runningMode: 'IMAGE'`, and confidence masks. Convert no-person confidence into a typed `PersonNotFoundError`; always call `close()` after each wizard session.

- [ ] **Step 5: Implement Canvas layer order**

Draw in this exact order: transparent canvas, preset back layer, masked source person, preset front layer, lavender rim light. Use `destination-in` for the confidence mask and `source-over` for assets. Export WebP at quality `0.9`; if WebP export returns another MIME, export PNG.

- [ ] **Step 6: Run tests, build offline assets, and commit**

Run: `cd web && npm run test:run -- src/features/appearance && npm run build`

Expected: PASS; `dist/models/selfie_segmenter.tflite` and `dist/mediapipe/wasm` exist.

```bash
git add -- web/package.json web/package-lock.json web/scripts web/public/models web/public/mediapipe web/public/assets/character web/src/features/appearance
git commit -m "feat: compose private local characters"
```

### Task 5: Appearance Wizard, Explicit Apply, and Default Recovery

**Files:**
- Create: `web/src/features/appearance/AppearanceScreen.tsx`
- Create: `web/src/features/appearance/AppearanceScreen.test.tsx`
- Create: `web/src/features/appearance/AppearancePreview.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Modify: `web/src/features/settings/SettingsScreen.test.tsx`
- Modify: `web/src/app/AppShell.tsx`

**Interfaces:**
- Produces: wizard states `idle | validating | previewing | segmenting | composing | saving | applied | error`
- Consumes: validation, normalization, repository, segmenter, composer, and background renderer from Tasks 1–4
- Produces: `monggle:appearance-changed` browser event after successful apply or delete

- [ ] **Step 1: Write failing explicit-apply and recovery journeys**

```tsx
it('does not replace the default Monggle when upload is canceled', async () => {
  render(<AppearanceScreen dependencies={fakes} />)
  await userEvent.upload(screen.getByLabelText('사진 선택'), validPhoto)
  await userEvent.click(screen.getByRole('button', { name: '취소' }))
  expect(fakes.repository.apply).not.toHaveBeenCalled()
  expect(screen.getByText('기본 몽글 사용 중')).toBeVisible()
})

it('applies a Studio 3D character to both targets only after confirmation', async () => {
  render(<AppearanceScreen dependencies={fakes} />)
  await userEvent.upload(screen.getByLabelText('사진 선택'), validPhoto)
  await userEvent.click(screen.getByLabelText('몽글 스타일'))
  await userEvent.click(screen.getByLabelText('세련된 Studio 3D'))
  await userEvent.click(screen.getByLabelText('배경과 프로필 모두'))
  await userEvent.click(screen.getByRole('button', { name: '적용' }))
  expect(fakes.repository.apply).toHaveBeenCalledWith(expect.objectContaining({
    background: { kind: 'character', assetId: 'render-1' },
    profile: { kind: 'character', assetId: 'render-1' },
  }))
})
```

- [ ] **Step 2: Run the screen test and verify RED**

Run: `cd web && npm run test:run -- src/features/appearance/AppearanceScreen.test.tsx`

Expected: FAIL because the screen does not exist.

- [ ] **Step 3: Implement two focused settings entry points**

Add `배경 꾸미기` and `내 캐릭터 만들기` buttons that open the same wizard with different initial target. Keep photo mode, preset, target, brightness, blur, and overlay as pending state until `적용` succeeds.

- [ ] **Step 4: Implement progress, error, apply, reset, and delete UI**

Use visible Korean status text for every processing state. Map `unsupported_type`, `too_large`, `person_not_found`, `model_load_failed`, and `quota_exceeded` to specific recovery copy. `기본 몽글로 돌아가기` restores profile only; `개인 사진 모두 삭제` requires a confirmation dialog and calls atomic deletion.

- [ ] **Step 5: Refresh AppShell without reload**

After apply/delete, dispatch `new Event('monggle:appearance-changed')`. AppShell subscribes once, revokes its current Object URLs, reloads settings and blobs, and preserves the mounted BottomNav and companion instance.

- [ ] **Step 6: Run component tests and commit**

Run: `cd web && npm run test:run -- src/features/appearance src/features/settings src/app`

Expected: PASS.

```bash
git add -- web/src/features/appearance web/src/features/settings web/src/app/AppShell.tsx
git commit -m "feat: add private appearance wizard"
```

### Task 6: Offline, Mobile, Accessibility, and Privacy Verification

**Files:**
- Create: `web/e2e/photo-personalization.spec.ts`
- Modify: `web/vite.config.ts`
- Modify: `docs/testing/monggle-pwa-foundation.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: all photo personalization modules and bundled inference assets
- Produces: reproducible offline and privacy verification

- [ ] **Step 1: Write failing browser journeys**

```ts
test('cancel keeps default Monggle and apply survives reload', async ({ page }) => {
  await page.goto('/settings')
  await page.getByRole('button', { name: '내 캐릭터 만들기' }).click()
  await page.getByLabel('사진 선택').setInputFiles('e2e/fixtures/person.webp')
  await page.getByRole('button', { name: '취소' }).click()
  await expect(page.getByTestId('monggle-companion')).toHaveAttribute('data-source', 'default')
})

test('processing sends no image request', async ({ page }) => {
  const requests: string[] = []
  page.on('request', request => requests.push(request.url()))
  await runStudioCharacterJourney(page)
  expect(requests.filter(url => !url.startsWith('http://127.0.0.1:4173'))).toEqual([])
})
```

- [ ] **Step 2: Run E2E and verify RED**

Run: `cd web && npm run e2e -- photo-personalization.spec.ts`

Expected: FAIL until settings entry points and fixture journey are wired.

- [ ] **Step 3: Add PWA precache patterns**

Configure `workbox.globPatterns` to include `**/*.{js,css,html,svg,png,webp,tflite,wasm}` and set `maximumFileSizeToCacheInBytes: 12 * 1024 * 1024`. Do not cache personal Blob URLs.

- [ ] **Step 4: Verify 320px layout, keyboard flow, offline model, and deletion**

Add Playwright assertions for a 320×568 viewport, tab order through upload/mode/preset/target/apply, successful processing after `context.setOffline(true)` following initial installation, and zero personal records after deletion.

- [ ] **Step 5: Run the full clean verification suite**

```bash
cd web
npm ci
npm run test:run
npm run build
npm run e2e
```

Expected: all unit/component tests pass, production PWA build passes with local WASM/TFLite files, and all mobile/desktop/offline Playwright tests pass.

- [ ] **Step 6: Document controls and commit**

Document supported formats, 12MB/2048px limits, default fallback, local-only processing, storage deletion, model size, and verification commands.

```bash
git add -- web/e2e/photo-personalization.spec.ts web/vite.config.ts docs/testing/monggle-pwa-foundation.md README.md
git commit -m "test: verify private photo personalization"
```
