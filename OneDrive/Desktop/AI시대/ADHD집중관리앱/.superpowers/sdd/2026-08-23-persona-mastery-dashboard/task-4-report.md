# Task 4 report — Mature visual system and five-tab shell

## Status

Complete. The active dashboard uses the mature color, typography, card, and five-tab shell contract. `/monthly` now renders an accessible, independently usable monthly shell with Asia/Seoul month initialization and year-boundary navigation.

## Files

- `web/src/core/theme/tokens.css`
- `web/src/core/theme/global.css`
- `web/src/app/App.tsx`
- `web/src/app/BottomNav.tsx`
- `web/src/features/monthly/MonthlyScreen.tsx`
- `web/src/features/monthly/MonthlyScreen.test.tsx`
- `web/src/app/App.test.tsx`
- `web/src/app/AppShell.test.tsx`
- `web/src/core/theme/studioTheme.test.ts`

## RED evidence

- `npm test -- --run src/app/App.test.tsx src/app/AppShell.test.tsx src/core/theme/studioTheme.test.ts`
  - Failed as expected: 3 test files failed; 4 tests failed and 9 passed.
  - Missing `월간` link/route, four-link navigation instead of five, and missing mature token/typography values.
- `npm test -- --run src/features/monthly/MonthlyScreen.test.tsx`
  - Failed as expected because `MonthlyScreen` did not exist.
- Theme follow-up RED: `npm test -- --run src/core/theme/studioTheme.test.ts`
  - Failed 1 of 6 tests because the calm default page and dark quest surface overrides were not yet present.

## GREEN and build evidence

- `npm test -- --run src/app src/core/theme/studioTheme.test.ts src/features/monthly/MonthlyScreen.test.tsx`
  - 4 test files passed; 17 tests passed; 0 failed.
- `npm run build`
  - `tsc -b && vite build` passed; 125 modules transformed; production bundle completed in 6.56 s.

## Decisions

- Kept the compatibility routes while making the five required destinations the only primary tabs.
- Used explicit SVG geometry for the new monthly icon and retained the existing Monggle paw asset treatment.
- Initialized the current month through `Intl.DateTimeFormat(..., { timeZone: 'Asia/Seoul' })` and stored numeric year/month state so December↔January transitions do not depend on browser-local time.
- Applied a late, scoped mature-shell CSS layer to remove glass effects from standard dashboard cards while leaving `.pet-hero` untouched.
- Preserved customized appearance backgrounds; only the default studio-purple preset is normalized to the approved page background.

## Commit

- `feat: apply mature five-tab dashboard shell`

## Self-review

- Confirmed five labels and routes are exact and ordered.
- Confirmed touched navigation and monthly controls are at least 48 px.
- Confirmed valid UTF-8 Korean in all modified TS/TSX files and no replacement/mojibake markers.
- Confirmed reduced-motion rules remain and `.pet-hero` is absent from mature card overrides.
- `git diff --check` reports no whitespace errors (only the repository's existing LF-to-CRLF advisory).

## Concerns

- None in Task 4 scope. Existing unrelated dirty files, including generated MediaPipe assets, were preserved and excluded from staging.

## Fix round 1

### Status

- Addressed all round-1 Important findings: five-route controls now have a cascade-safe 48 px minimum; prompt/mission and late-loaded standard surfaces use the mature card contract; decorative dashboard copy no longer uses action lavender.
- Preserved `.pet-hero` depth and reward/action color states.

### RED evidence

- `npm test -- --run src/core/theme/studioTheme.test.ts`
  - First RED: 3 of 9 tests failed as intended: persistent prompt controls resolved to 36 px, the extended mission surface retained its 2 px/glossy contract, and decorative copy retained `--color-accent`.
  - Bundle-order follow-up RED: 2 of 10 tests failed as intended: the default studio background and late-loaded `.appearance-wizard`/`.room-item` rules lacked cascade-safe overrides.

### GREEN and build evidence

- `npm test -- --run src/app src/core/theme/studioTheme.test.ts src/features/monthly/MonthlyScreen.test.tsx`
  - 4 test files passed; 21 tests passed; 0 failed.
- `npm run build`
  - `tsc -b && vite build` passed; 125 modules transformed; production bundle completed in 7.12 s.

### Decisions and self-review

- Added selector-level regression tests that read the final declaration for every specifically reported undersized control, prompt/mission surface, and decorative label.
- Added an `!important` 48 px floor to interactive descendants of `.app-shell`; this is intentional because feature CSS is bundled after `global.css` and otherwise reintroduces 36–44 px controls.
- Reset `extended-mission-entry`, all persistent prompt tones, and `mission-reschedule` to a 16 px radius, neutral 1 px border, opaque white surface, one subtle shadow, and no backdrop filter.
- Normalized other reachable standard surfaces (`category-manager`, calendar cards, appearance wizard, room item) while explicitly leaving `.pet-hero` outside the mature override.
- Neutralized only non-action eyebrow/status copy; primary buttons, active controls, progress/reward states, and Monggle reward visuals retain their intended accent colors.

### Commit

- `fix: enforce mature shell visual contracts`

### Concerns

- None. Unrelated workspace changes remain excluded.

## Fix round 2

### Status

- Removed the blanket 48 px height override from all inputs.
- Text-like inputs retain the 48 px control contract; checkbox, radio, file, and color controls retain intrinsic sizing.
- Checkbox/radio labels and known focus/mission/settings control rows now provide a minimum 48 px surrounding hit area.

### RED evidence

- `npm test -- --run src/core/theme/studioTheme.test.ts`
  - Initial RED: 3 of 12 tests failed as intended because text-like selectors were absent, `.app-shell input` still forced every input to 48 px, and checkbox/radio wrappers had no explicit 48 px hit-area contract.
  - Focus-row RED: 1 of 12 tests failed as intended because the direct focus-step checkbox row had no 48 px minimum.

### GREEN and build evidence

- `npm test -- --run src/app src/core/theme/studioTheme.test.ts src/features/monthly/MonthlyScreen.test.tsx`
  - 4 test files passed; 23 tests passed; 0 failed.
- `npm run build`
  - `tsc -b && vite build` passed; 125 modules transformed; production bundle completed in 5.46 s; PWA service worker generation completed.

### Decisions and self-review

- Used an explicit positive list of text-like input types rather than a negative selector, preventing hidden/range/native picker controls from inheriting the text-field height contract.
- Added explicit `min-height: auto !important` guards for checkbox, radio, file, and color inputs so later CSS cannot recreate the round-2 regression.
- Kept intrinsic checkbox/radio visuals while assigning 48 px minimums to `label:has(...)`, `.switch`, mission selection/check rows, and focus-step rows.
- Regression tests assert the blanket selector is absent, intrinsic types are restored, every text-like selector stays 48 px, and wrapper hit areas remain 48 px.

### Commit

- `fix: preserve intrinsic form control sizing`

### Concerns

- None. Unrelated workspace changes remain excluded.
