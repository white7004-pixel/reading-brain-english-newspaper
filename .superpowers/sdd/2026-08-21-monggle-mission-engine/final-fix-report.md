# Required Mission Engine Final Fix Report

## FINAL FIX WAVE

Date: 2026-08-21 (Asia/Seoul)

Implementation commit: `ef1b53e` (`fix: finalize required mission engine behavior`)

### Outcome

- `tomorrow` now derives the next calendar day in `Asia/Seoul`, persists the required mission as `deferred`, keeps its original `commitmentDay`, and stores the next Seoul midnight as a real `scheduledStart` eligibility time.
- Shared selection now excludes future-deferred work and uses one precedence everywhere: active mission, oldest unfinished `commitmentDay`, due time, then priority.
- App and widget extended labeling is derived from the selected mission, so a different prior-day mission cannot label a current-day active mission as extended.
- Android and iOS widgets derive extended state from `commitmentDay` plus their native Seoul day while retaining `escalationLevel == widget` as a legacy fallback. Both platforms request a 30-minute native refresh, so a stored pre-midnight snapshot can render extended after midnight without opening the app.
- Nudge and native-widget completion paths now preserve the explicit completion invariant: `status`, `completedAt`, and `updatedAt` are written together; required missions use `completeMission`.
- Playwright owns its server (`reuseExistingServer: false`, `strictPort`) and supports a local `MONGGLE_E2E_PORT` override without accepting an unrelated process.

### RED evidence

Focused web regressions were added before production changes.

Command (from `web`):

```powershell
npm run test:run -- src/features/rescue/reschedulePlan.test.ts src/features/today/selectNowTask.test.ts src/features/missions/extendedDay.test.ts src/features/nudges/nudgePolicy.test.ts src/features/widgets/mergeWidgetEvents.test.ts src/features/widgets/widgetSnapshot.test.ts src/app/AppShell.test.tsx
```

Observed output:

```text
Test Files  7 failed (7)
Tests       10 failed | 24 passed (34)
```

Expected failure evidence included:

- pre-09:00 KST `tomorrow`: expected day `2026-08-22`, received `2026-08-21`; `scheduledStart` absent;
- deferred eligibility: expected `null`, received the deferred required task;
- mixed commitment ordering: expected `prior`, received `current-due`;
- selected-mission labeling: expected `normal`, received `extended`;
- nudge/widget explicit completion: expected `completedAt`, received `undefined`;
- app integration: an extended-mode region was present for a current-day active mission.

Native contract RED command (from `web`):

```powershell
node scripts/verify-native-widget-contract.mjs
```

Observed first failure:

```text
AssertionError [ERR_ASSERTION]: Android must derive the current day in Seoul
```

The self-review then exposed Android's disabled autonomous refresh. A second contract was added before changing XML.

Observed second failure:

```text
AssertionError [ERR_ASSERTION]: Android must refresh the widget after midnight without an app launch
actual: android:updatePeriodMillis="0"
expected: /updatePeriodMillis="1800000"/
```

### GREEN evidence

Focused regressions:

```powershell
npm run test:run -- src/features/rescue/reschedulePlan.test.ts src/features/today/selectNowTask.test.ts src/features/missions/extendedDay.test.ts src/features/nudges/nudgePolicy.test.ts src/features/widgets/mergeWidgetEvents.test.ts src/features/widgets/widgetSnapshot.test.ts src/app/AppShell.test.tsx
```

```text
Test Files  7 passed (7)
Tests       34 passed (34)
```

Production build:

```powershell
npm run build
```

```text
tsc -b && vite build
105 modules transformed
built in 1.66s
exit 0
```

Single full web-suite run:

```powershell
npm run test:run
```

```text
Test Files  48 passed (48)
Tests       146 passed (146)
exit 0
```

Mobile and desktop E2E with an owned strict-port server:

```powershell
npm run e2e -- required-mission-flow.spec.ts
```

```text
ok [mobile] keeps the unfinished required mission current through midnight
ok [desktop] keeps the unfinished required mission current through midnight
2 passed (23.5s)
```

Android + iOS source contracts (Windows):

```powershell
node scripts/verify-native-widget-contract.mjs
```

```text
Native widget source contracts passed (Android + iOS)
```

Android compilation:

```powershell
$env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
$env:ANDROID_HOME = 'C:\Users\white\AppData\Local\Android\Sdk'
.\gradlew.bat compileDebugJavaWithJavac
```

```text
BUILD SUCCESSFUL in 6s
38 actionable tasks: 6 executed, 32 up-to-date
```

Direct Android widget policy tests (the exact command compiled production and test Java with release 17, then invoked JUnitCore):

```powershell
$directWidgetTestDir = Join-Path ([System.IO.Path]::GetTempPath()) ("monggle-widget-tests-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $directWidgetTestDir | Out-Null
$junitJar = 'C:\Users\white\.gradle\caches\modules-2\files-2.1\junit\junit\4.13.2\8ac9e16d933b6fb43bc7f576336b8f4d7eb5ba12\junit-4.13.2.jar'
$hamcrestJar = 'C:\Users\white\.gradle\caches\modules-2\files-2.1\org.hamcrest\hamcrest-core\1.3\42a25dc3219429f0e5d060061f71acb49bf010a0\hamcrest-core-1.3.jar'
$testClasspath = "$junitJar;$hamcrestJar"
& 'C:\Program Files\Android\Android Studio\jbr\bin\javac.exe' --release 17 -cp $testClasspath -d $directWidgetTestDir 'app\src\main\java\app\monggle\focus\WidgetRenderPolicy.java' 'app\src\test\java\app\monggle\focus\WidgetRenderPolicyTest.java'
& 'C:\Program Files\Android\Android Studio\jbr\bin\java.exe' -cp "$directWidgetTestDir;$testClasspath" org.junit.runner.JUnitCore app.monggle.focus.WidgetRenderPolicyTest
```

```text
JUnit version 4.13.2
.....
OK (5 tests)
```

Repository hygiene:

```powershell
git diff --check
```

```text
exit 0; no whitespace errors (only Git's existing LF-to-CRLF notices)
```

### Files

Shared web behavior:

- `web/src/core/time/seoulDay.ts`
- `web/src/features/rescue/reschedulePlan.ts`
- `web/src/features/today/selectNowTask.ts`
- `web/src/features/missions/extendedDay.ts`
- `web/src/features/nudges/nudgePolicy.ts`
- `web/src/features/widgets/mergeWidgetEvents.ts`
- `web/src/features/widgets/widgetSnapshot.ts`
- `web/src/app/AppShell.tsx`
- `web/playwright.config.ts`

Native behavior:

- `web/android/app/src/main/java/app/monggle/focus/WidgetRenderPolicy.java`
- `web/android/app/src/main/res/xml/monggle_widget_info.xml`
- `web/ios/MonggleWidget/MonggleWidget.swift`
- `web/scripts/verify-native-widget-contract.mjs`

Regression coverage:

- `web/src/features/rescue/reschedulePlan.test.ts`
- `web/src/features/today/selectNowTask.test.ts`
- `web/src/features/missions/extendedDay.test.ts`
- `web/src/features/nudges/nudgePolicy.test.ts`
- `web/src/features/widgets/mergeWidgetEvents.test.ts`
- `web/src/features/widgets/widgetSnapshot.test.ts`
- `web/src/app/AppShell.test.tsx`
- `web/android/app/src/test/java/app/monggle/focus/WidgetRenderPolicyTest.java`
- `web/ios/App/AppTests/MonggleWidgetSnapshotTests.swift`

### Self-review

- Confirmed `tomorrow` never calls `uncommitMission`; only explicit cancel still uncommits.
- Confirmed repository persistence still returns future-deferred required missions; eligibility filtering occurs at selector/surface boundaries, preventing accidental data loss.
- Confirmed app, widget snapshot, and nudge all consume `selectCurrentMission`; active and mixed-day behavior is covered independently and through AppShell.
- Confirmed extended UI state is computed from the selected mission rather than `some()` prior-day mission.
- Confirmed both explicit completion paths set `completedAt == updatedAt`; native required completion routes through `completeMission`.
- Confirmed Android legacy escalation data and iOS legacy snapshot behavior remain accepted.
- Confirmed Playwright no longer reuses a process already listening on the configured port.
- Did not modify or suppress the pre-existing `CategoryManager` warning.

### Concerns / environment notes

- iOS compilation and XCTest execution are unavailable on Windows. The Swift regression is present, and the Windows source-contract command verifies Seoul-day derivation, legacy fallback, selected-mission promotion, and the autonomous timeline refresh policy.
- Android Studio's bundled JBR is Java 25. Its Gradle `testDebugUnitTest` task fails during task construction with `Type T not present`, before compiling tests. Android production compilation passed through Gradle, and the policy suite was compiled with `javac --release 17` and run directly through JUnitCore (5/5).
- Android and iOS may defer periodic widget refreshes according to OS power policy; the snapshot itself is no longer frozen, and the next native render derives the correct Seoul-day state without an app launch.
- Playwright printed environment-only `NO_COLOR`/`FORCE_COLOR` warnings; both browser projects passed.
