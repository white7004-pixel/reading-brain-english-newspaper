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
