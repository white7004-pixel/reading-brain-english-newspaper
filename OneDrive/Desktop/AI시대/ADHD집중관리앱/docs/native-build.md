# Monggle native build notes

## Android

The Android project is in `web/android`. On this Windows machine the reusable, project-local toolchain is stored in `.tools` (JDK 21, Android SDK, and the `Monggle_API_35` AVD), so it does not require a system-wide installation.

Because the workspace path contains Korean characters, use the existing `M:` project alias and `T:` tools alias when running Gradle:

```powershell
$env:JAVA_HOME = 'T:\jdk\jdk-21.0.12.1+1'
$env:ANDROID_HOME = 'T:\android-sdk'
Set-Location M:\web\android
.\gradlew.bat testDebugUnitTest lintDebug assembleDebug --no-daemon
```

Debug APK:

```text
web/android/app/build/outputs/apk/debug/app-debug.apk
```

The home-screen widget supports small and medium sizes. It displays one or three tasks and records `done`, `working`, and `later` actions in the shared native event queue.

## iOS

The Capacitor app, WidgetKit views, AppIntents, App Group entitlements, and shared event-store sources are present under `web/ios`. A macOS machine with Xcode is still required to add/verify the `MonggleWidgetExtension` target, configure signing for `group.app.monggle.focus`, run CocoaPods, and execute the iOS tests.

```bash
cd web
npx cap sync ios
open ios/App/App.xcworkspace
```

After selecting a development team for the app and widget extension, build both targets and test on an iOS 17 or newer simulator/device.
