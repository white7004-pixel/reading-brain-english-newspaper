# Installable PWA and Offline Learning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Reading Brain installable and keep its three primary learning courses usable offline while safely synchronizing locally queued progress after reconnection.

**Architecture:** A dependency-free service worker caches only the public application shell and curriculum resources. Pure UMD modules own queue behavior and PWA state, while `app.js` integrates them with the existing versioned learning profile. The server accepts stable event IDs and acknowledges retries without applying progress twice.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, Service Worker API, Web App Manifest, LocalStorage, Node.js `node:assert`, existing Node HTTP server, Playwright CLI for browser verification

**Spec:** `docs/superpowers/specs/2026-08-23-installable-pwa-offline-learning-design.md`

## Global Constraints

- Keep the project build-free; do not add Workbox or another runtime dependency.
- Cache only public same-origin static resources. Never cache `/api/**`, non-GET requests, recordings, blob URLs, authentication data, administrator data, or TTS responses.
- Do not precache `assets/native-audio/**` or `assets/bookquiz-audio/**`; speech remains an online enhancement.
- Offline learning must preserve `activeCourse`, `dailyStats`, `stars`, `badges`, `streakDays`, reviews, and pending progress.
- Queue synchronization must work without relying on the Background Sync API.
- Never force a reload while a course is active; updates require a user action.
- Preserve legacy progress clients that do not send an `eventId`.
- Maintain the 360×800, 412×915, and 768×1024 responsive release sizes.
- Use strict test-first red-green-refactor cycles for every behavior change.

---

## File Structure

- Create `offline-sync-model.js`: pure queue normalization, deduplication, batching, and acknowledgement.
- Create `pwa-controller.js`: service-worker registration, install prompt, connection status, and update activation.
- Create `service-worker.js`: cache policy and worker lifecycle.
- Create `manifest.webmanifest`: install metadata.
- Create `offline.html`: first-visit offline fallback.
- Create `assets/icons/icon-192.png`, `assets/icons/icon-512.png`, `assets/icons/icon-maskable-512.png`, and `assets/icons/apple-touch-icon.png`: install icons derived from the existing brand logo.
- Modify `daily-learning-model.js`: normalize `pendingSync` on version-1 learning profiles.
- Modify `app.js`: enqueue-first progress persistence, ordered synchronization, offline speech fallback, and PWA UI integration.
- Modify `server.js`: idempotent `eventId` handling and manifest MIME type.
- Modify `index.html`: manifest metadata, PWA status/actions, and script loading.
- Modify `mint-galaxy.css`: install, connection, update, and offline styles.
- Create `tests/offline-sync-model.test.js`: queue behavior.
- Create `tests/pwa-controller.test.js`: pure PWA state behavior.
- Create `tests/service-worker.test.js`: execute worker handlers against controlled cache/fetch fakes.
- Create `tests/pwa-installability.test.js`: validate the manifest and local icon files.
- Create `tests/offline-progress-server.test.js`: run the real server against a temporary student store and verify duplicate acknowledgement.
- Create `tests/pwa-browser.spec.js`: Playwright online-install/offline-reload/reconnection journey.
- Modify existing UI and release-gate tests for observable PWA behavior.

---

### Task 1: Offline progress queue model

**Files:**
- Create: `offline-sync-model.js`
- Create: `tests/offline-sync-model.test.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `ReadingBrainOfflineSync.normalizeQueue(value)`, `enqueue(queue, event)`, `acknowledge(queue, ids)`, `nextBatch(queue, limit)`, `createEventId(deviceId, sessionId, sequence)`
- Event shape: `{ id: string, createdAt: string, type: "progress", payload: object }`

- [ ] **Step 1: Write failing real-behavior queue tests**

```js
const assert = require("node:assert/strict");
const sync = require("../offline-sync-model.js");

const first = { id: "device-a:session-a:1", createdAt: "2026-08-23T00:00:00.000Z", type: "progress", payload: { score: 10 } };
const second = { id: "device-a:session-a:2", createdAt: "2026-08-23T00:00:01.000Z", type: "progress", payload: { score: 20 } };

assert.deepEqual(sync.normalizeQueue([first, null, { id: "", payload: {} }]), [first]);
assert.deepEqual(sync.enqueue([first], first), [first]);
assert.deepEqual(sync.enqueue([first], second), [first, second]);
assert.deepEqual(sync.nextBatch([first, second], 1), [first]);
assert.deepEqual(sync.acknowledge([first, second], [first.id]), [second]);
assert.equal(sync.createEventId("device-a", "session-a", 3), "device-a:session-a:3");
console.log("offline sync model tests passed");
```

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run: `node tests/offline-sync-model.test.js`

Expected: FAIL with `Cannot find module '../offline-sync-model.js'`.

- [ ] **Step 3: Implement immutable queue operations in a UMD module**

```js
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainOfflineSync = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function validEvent(event) {
    return Boolean(event && typeof event.id === "string" && event.id && event.type === "progress"
      && event.payload && typeof event.payload === "object" && !Array.isArray(event.payload)
      && typeof event.createdAt === "string" && !Number.isNaN(Date.parse(event.createdAt)));
  }
  function normalizeQueue(value) {
    const seen = new Set();
    return (Array.isArray(value) ? value : []).filter((event) => {
      if (!validEvent(event) || seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    }).map((event) => ({ ...event, payload: { ...event.payload } }));
  }
  function enqueue(queue, event) {
    const current = normalizeQueue(queue);
    return !validEvent(event) || current.some((item) => item.id === event.id)
      ? current : [...current, { ...event, payload: { ...event.payload } }];
  }
  function acknowledge(queue, ids) {
    const accepted = new Set(Array.isArray(ids) ? ids : []);
    return normalizeQueue(queue).filter((event) => !accepted.has(event.id));
  }
  function nextBatch(queue, limit) {
    return normalizeQueue(queue).slice(0, Math.max(1, Number(limit) || 1));
  }
  function createEventId(deviceId, sessionId, sequence) {
    return `${String(deviceId)}:${String(sessionId)}:${Math.max(1, Number(sequence) || 1)}`;
  }
  return { normalizeQueue, enqueue, acknowledge, nextBatch, createEventId };
});
```

- [ ] **Step 4: Load the model before `app.js` and verify green**

Add `<script src="offline-sync-model.js?v=20260823"></script>` before `app.js`.

Run: `node tests/offline-sync-model.test.js`

Expected: PASS with `offline sync model tests passed`.

- [ ] **Step 5: Commit the queue model**

```powershell
git add offline-sync-model.js tests/offline-sync-model.test.js index.html
git commit -m "feat: add offline progress queue model"
```

### Task 2: Profile migration and enqueue-first persistence

**Files:**
- Modify: `daily-learning-model.js`
- Modify: `app.js`
- Modify: `tests/daily-learning-model.test.js`
- Modify: `tests/core-learning-game-ui.test.js`

**Interfaces:**
- Consumes: `ReadingBrainOfflineSync.enqueue`, `normalizeQueue`, `createEventId`
- Produces: profile field `pendingSync: Array<ProgressEvent>`, `queueProgressEvent(payload)`

- [ ] **Step 1: Add failing profile and UI behavior tests**

Add to `tests/daily-learning-model.test.js`:

```js
const migrated = model.parseLearningProfile(JSON.stringify({ version: 1, grade: 3, stars: 7 }), {});
assert.deepEqual(migrated.pendingSync, []);
assert.equal(migrated.stars, 7);
```

Add a VM-based behavior test to `tests/core-learning-game-ui.test.js` that supplies real LocalStorage and a failing `fetch`, invokes the exported test hook `queueProgressEvent({ score: 25 })`, reloads the stored `rb-learning-profile-v1`, and asserts one event with `payload.score === 25` remains in `pendingSync`.

- [ ] **Step 2: Run focused tests and verify the intended failures**

Run:

```powershell
node tests/daily-learning-model.test.js
node tests/core-learning-game-ui.test.js
```

Expected: FAIL because profile normalization omits `pendingSync` and `queueProgressEvent` is absent.

- [ ] **Step 3: Normalize the profile and implement enqueue-first persistence**

Extend every default version-1 profile with `pendingSync: []`. In `parseLearningProfile`, normalize the saved value through `ReadingBrainOfflineSync.normalizeQueue`.

In `app.js`, create stable device/session state without storing credentials:

```js
const OFFLINE_DEVICE_KEY = "rb-offline-device-v1";
const offlineSessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
let offlineSequence = 0;

function queueProgressEvent(payload) {
  if (!state.learningProfile) state.learningProfile = loadLearningProfile();
  let deviceId = localStorage.getItem(OFFLINE_DEVICE_KEY);
  if (!deviceId) {
    deviceId = crypto.randomUUID?.() || `device-${Date.now().toString(36)}`;
    localStorage.setItem(OFFLINE_DEVICE_KEY, deviceId);
  }
  const event = {
    id: offlineSync.createEventId(deviceId, offlineSessionId, ++offlineSequence),
    createdAt: new Date().toISOString(),
    type: "progress",
    payload: { ...payload },
  };
  state.learningProfile.pendingSync = offlineSync.enqueue(state.learningProfile.pendingSync, event);
  saveLearningProfile();
  return event;
}
```

Replace direct fire-and-forget progress posting with local queueing followed by a synchronization attempt. Keep the existing legacy LocalStorage keys intact.

- [ ] **Step 4: Verify persistence and existing learning tests**

Run:

```powershell
node tests/offline-sync-model.test.js
node tests/daily-learning-model.test.js
node tests/core-learning-game-ui.test.js
```

Expected: all three PASS, including retention after failed network access.

- [ ] **Step 5: Commit profile persistence**

```powershell
git add daily-learning-model.js app.js tests/daily-learning-model.test.js tests/core-learning-game-ui.test.js
git commit -m "feat: queue learning progress before network sync"
```

### Task 3: Idempotent server acknowledgements and client synchronization

**Files:**
- Modify: `server.js`
- Modify: `app.js`
- Create: `tests/offline-progress-server.test.js`
- Modify: `tests/core-learning-game-ui.test.js`

**Interfaces:**
- Consumes request: `{ eventId?: string, ...existingProgressFields }`
- Produces response: `{ ok: true, acknowledgedEventIds: string[], duplicate?: boolean }`
- Produces client function: `syncPendingProgress() -> Promise<{ synced: number, remaining: number }>`

- [ ] **Step 1: Write a failing real-server duplicate test**

Create a temporary working copy of `data/students.json`, start `server.js` with `STUDENTS_PATH` and `PORT` environment overrides, log in as the fixture student, POST the same `{ eventId: "device:test:1", score: 10 }` twice, and assert:

```js
assert.equal(first.status, 200);
assert.deepEqual(first.body.acknowledgedEventIds, ["device:test:1"]);
assert.equal(second.body.duplicate, true);
assert.deepEqual(second.body.acknowledgedEventIds, ["device:test:1"]);
const saved = JSON.parse(fs.readFileSync(tempStudentsPath, "utf8"));
assert.equal(saved.students.test01.log.filter((entry) => entry.eventId === "device:test:1").length, 1);
```

- [ ] **Step 2: Run the integration test and verify failure**

Run: `node tests/offline-progress-server.test.js`

Expected: FAIL because the server does not accept an alternate student-store path or acknowledge duplicate event IDs.

- [ ] **Step 3: Implement bounded idempotency on the server**

Read `studentsPath` from `process.env.STUDENTS_PATH || path.join(dataDir, "students.json")`. On POST `/api/progress`:

```js
const eventId = typeof body.eventId === "string" ? body.eventId.trim().slice(0, 160) : "";
student.processedEventIds = Array.isArray(student.processedEventIds) ? student.processedEventIds : [];
if (eventId && student.processedEventIds.includes(eventId)) {
  sendJson(res, 200, { ok: true, duplicate: true, acknowledgedEventIds: [eventId] });
  return;
}
// Apply the existing progress mutation exactly once here.
if (eventId) student.processedEventIds = [...student.processedEventIds, eventId].slice(-500);
```

Include `eventId` in the appended progress log entry and return `acknowledgedEventIds: eventId ? [eventId] : []`. Legacy requests without an ID continue unchanged.

- [ ] **Step 4: Implement ordered client synchronization**

```js
let progressSyncPromise = null;
function syncPendingProgress() {
  if (progressSyncPromise) return progressSyncPromise;
  progressSyncPromise = (async () => {
    let synced = 0;
    while (navigator.onLine !== false) {
      const [event] = offlineSync.nextBatch(state.learningProfile?.pendingSync, 1);
      if (!event) break;
      const result = await apiRequest("/api/progress", {
        method: "POST",
        body: JSON.stringify({ ...event.payload, eventId: event.id }),
      });
      const ids = Array.isArray(result.acknowledgedEventIds) ? result.acknowledgedEventIds : [];
      if (!ids.includes(event.id)) break;
      state.learningProfile.pendingSync = offlineSync.acknowledge(state.learningProfile.pendingSync, ids);
      saveLearningProfile();
      synced += 1;
    }
    return { synced, remaining: state.learningProfile?.pendingSync?.length || 0 };
  })().finally(() => { progressSyncPromise = null; });
  return progressSyncPromise;
}
```

Call it after login, after enqueueing while online, on the window `online` event, and during startup when a valid session exists. Authentication or network failure leaves the current event queued.

- [ ] **Step 5: Verify server and client behavior**

Run:

```powershell
node tests/offline-progress-server.test.js
node tests/core-learning-game-ui.test.js
```

Expected: PASS with one applied server log and an empty client queue only after acknowledgement.

- [ ] **Step 6: Commit idempotent synchronization**

```powershell
git add server.js app.js tests/offline-progress-server.test.js tests/core-learning-game-ui.test.js
git commit -m "feat: sync offline progress idempotently"
```

### Task 4: Manifest and install assets

**Files:**
- Create: `manifest.webmanifest`
- Create: `assets/icons/icon-192.png`
- Create: `assets/icons/icon-512.png`
- Create: `assets/icons/icon-maskable-512.png`
- Create: `assets/icons/apple-touch-icon.png`
- Create: `tests/pwa-installability.test.js`
- Modify: `index.html`
- Modify: `server.js`

**Interfaces:**
- Produces install metadata at `/manifest.webmanifest`
- Consumes existing `assets/reading-brain-logo.jpg` as the icon source

- [ ] **Step 1: Write a failing manifest behavior test**

Parse the real manifest and inspect the real files:

```js
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
assert.equal(manifest.id, "/reading-brain");
assert.equal(manifest.start_url, "/");
assert.equal(manifest.scope, "/");
assert.equal(manifest.display, "standalone");
for (const icon of manifest.icons) {
  const file = path.join(root, icon.src.replace(/^\//, ""));
  assert.ok(fs.statSync(file).size > 1000, `${icon.src} must contain a real icon`);
}
assert.ok(manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose.includes("maskable")));
```

- [ ] **Step 2: Run and verify missing-manifest failure**

Run: `node tests/pwa-installability.test.js`

Expected: FAIL with missing `manifest.webmanifest`.

- [ ] **Step 3: Create the manifest and brand icons**

Create the manifest with Korean app name `리딩브레인 학습`, short name `리딩브레인`, theme `#2f3651`, background `#f4f8fc`, orientation `any`, and the four declared icon files. Generate centered, padded icons from the existing logo with a local image conversion command; the maskable icon must keep the logo inside the central 80% safe zone.

Add to `<head>`:

```html
<link rel="manifest" href="manifest.webmanifest" />
<meta name="theme-color" content="#2f3651" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png" />
```

Map `.webmanifest` to `application/manifest+json; charset=utf-8` in `server.js`.

- [ ] **Step 4: Verify install assets and HTTP content type**

Run:

```powershell
node tests/pwa-installability.test.js
node server.js
```

In a second shell run:

```powershell
(Invoke-WebRequest -Uri 'http://localhost:4174/manifest.webmanifest' -UseBasicParsing).Headers['Content-Type']
```

Expected: test PASS and content type `application/manifest+json; charset=utf-8`.

- [ ] **Step 5: Commit install metadata**

```powershell
git add manifest.webmanifest assets/icons index.html server.js tests/pwa-installability.test.js
git commit -m "feat: add Reading Brain install manifest"
```

### Task 5: Service worker cache policy

**Files:**
- Create: `service-worker.js`
- Create: `offline.html`
- Create: `tests/service-worker.test.js`

**Interfaces:**
- Produces worker messages: `{ type: "SKIP_WAITING" }`, `{ type: "CACHE_REQUIRED_CONTENT" }`
- Produces caches: `rb-shell-20260823`, `rb-content-20260823`

- [ ] **Step 1: Write failing executable service-worker tests**

Run the real worker source inside `vm` with controlled `self`, `caches`, and `fetch`. Capture registered handlers and assert observable effects:

```js
await handlers.install({ waitUntil(promise) { pending.push(promise); } });
await Promise.all(pending);
assert.ok(cachedUrls.includes("/index.html"));
assert.ok(cachedUrls.includes("/data/expressions.js"));
assert.ok(!cachedUrls.some((url) => url.includes("native-audio")));

const apiRequest = new Request("https://example.test/api/tts?text=hello");
const response = await dispatchFetch(apiRequest);
assert.equal(response.headers.get("x-test-source"), "network");
assert.equal(cachePutUrls.some((url) => url.includes("/api/tts")), false);
```

Also verify activation deletes `rb-shell-old` and `rb-content-old` but keeps `unrelated-cache`.

- [ ] **Step 2: Run and verify missing-worker failure**

Run: `node tests/service-worker.test.js`

Expected: FAIL because `service-worker.js` does not exist.

- [ ] **Step 3: Implement worker lifecycle and fetch strategies**

Define explicit arrays for shell and required content. Include `/`, `/index.html`, `/offline.html`, current CSS, all model scripts, `app.js`, `game-ui.js`, `data/expressions.js`, `data/bookquiz.js`, `data/verbs.js`, and the logo. Do not include audio directories.

Implement:

- Install: atomically `addAll` required shell and content; do not call `skipWaiting()` automatically.
- Activate: remove only obsolete names beginning `rb-shell-` or `rb-content-`; call `clients.claim()`.
- Fetch: ignore non-GET, cross-origin, `/api/`, and blob requests; use network-first navigation with cached `/index.html` and `/offline.html` fallbacks; use cache-first with background refresh for declared static assets.
- Message: call `skipWaiting()` only for `SKIP_WAITING`; cache declared required content for `CACHE_REQUIRED_CONTENT`.

- [ ] **Step 4: Run worker tests and syntax validation**

Run:

```powershell
node tests/service-worker.test.js
node --check service-worker.js
```

Expected: PASS with no API or audio cache writes.

- [ ] **Step 5: Commit the worker**

```powershell
git add service-worker.js offline.html tests/service-worker.test.js
git commit -m "feat: cache Reading Brain learning shell offline"
```

### Task 6: PWA controller, installation, connection, and update UI

**Files:**
- Create: `pwa-controller.js`
- Create: `tests/pwa-controller.test.js`
- Modify: `index.html`
- Modify: `app.js`
- Modify: `mint-galaxy.css`
- Modify: `tests/mobile-duolingo-ui.test.js`

**Interfaces:**
- Produces: `createPwaController(env) -> { start(), promptInstall(), applyUpdate(), state() }`
- State shape: `{ supported, installAvailable, installed, online, offlineReady, updateReady, syncing }`
- Emits UI changes through supplied `onStateChange(state)` callback

- [ ] **Step 1: Write failing controller behavior tests**

Use small real event-target fakes and a real controller instance. Verify:

```js
const controller = pwa.createPwaController({ window: fakeWindow, navigator: fakeNavigator, onStateChange: (value) => states.push(value) });
await controller.start();
assert.equal(registrations[0], "/service-worker.js");
fakeWindow.dispatch("offline");
assert.equal(controller.state().online, false);
fakeWindow.dispatch("beforeinstallprompt", installEvent);
assert.equal(controller.state().installAvailable, true);
await controller.promptInstall();
assert.equal(installEvent.promptCalls, 1);
await controller.applyUpdate();
assert.deepEqual(waitingWorker.messages, [{ type: "SKIP_WAITING" }]);
```

- [ ] **Step 2: Run and verify missing-controller failure**

Run: `node tests/pwa-controller.test.js`

Expected: FAIL because the controller module does not exist.

- [ ] **Step 3: Implement the controller without global course knowledge**

Inject `window`, `navigator`, and callbacks so tests exercise real state transitions without mocking controller internals. Register `/service-worker.js`, listen for `beforeinstallprompt`, `appinstalled`, `online`, `offline`, `updatefound`, and `controllerchange`, and send `SKIP_WAITING` only from `applyUpdate()`.

- [ ] **Step 4: Add accessible PWA UI and integration**

Add one polite live region and explicit actions:

```html
<aside class="pwa-status" id="pwaStatus" aria-live="polite" hidden>
  <span id="pwaStatusText"></span>
  <button id="pwaInstallButton" type="button" hidden>앱 설치</button>
  <button id="pwaUpdateButton" type="button" hidden>업데이트 적용</button>
</aside>
```

Load `pwa-controller.js` before `app.js`. In `app.js`, map controller state to Korean status copy, call `syncPendingProgress()` when online, send `CACHE_REQUIRED_CONTENT` after login, save the active profile before applying an update, and show iOS Home Screen instructions only when standalone mode is false and the user agent is iOS.

Style the banner and actions with 48px minimum targets, no content overlap, `overflow-wrap: anywhere`, and reduced-motion rules.

- [ ] **Step 5: Verify controller and responsive UI**

Run:

```powershell
node tests/pwa-controller.test.js
node tests/mobile-duolingo-ui.test.js
node tests/mint-galaxy-release-gate.test.js
```

Expected: PASS with one live region and no automatic update activation.

- [ ] **Step 6: Commit PWA interaction UI**

```powershell
git add pwa-controller.js tests/pwa-controller.test.js index.html app.js mint-galaxy.css tests/mobile-duolingo-ui.test.js tests/mint-galaxy-release-gate.test.js
git commit -m "feat: add install and offline status controls"
```

### Task 7: Online-only speech fallback

**Files:**
- Modify: `app.js`
- Modify: `tests/speech-practice-model.test.js`
- Modify: `tests/supporting-game-ui.test.js`

**Interfaces:**
- Produces: `canUseOnlineSpeech() -> boolean`, `showOfflineSpeechMessage() -> void`
- Consumes: `navigator.onLine`, existing speech feedback region

- [ ] **Step 1: Write failing behavior tests for offline speech**

Execute the speech action through the existing UI test harness with `navigator.onLine = false`. Assert that no `/api/tts` request occurs, the visible feedback text equals `음성은 인터넷 연결 시 이용할 수 있어요.`, and the current course item and stage remain unchanged.

- [ ] **Step 2: Run and verify the current online request failure**

Run:

```powershell
node tests/speech-practice-model.test.js
node tests/supporting-game-ui.test.js
```

Expected: FAIL because the speech path attempts online playback or lacks the offline message.

- [ ] **Step 3: Guard every online speech entry point**

```js
function canUseOnlineSpeech() {
  return navigator.onLine !== false;
}
function showOfflineSpeechMessage() {
  showToast("음성은 인터넷 연결 시 이용할 수 있어요.");
}
```

Before `/api/tts`, online Web Speech voices, or remote audio playback, return early with the message when offline. Do not call course advancement, scoring, answer handling, or recording cleanup in that branch. Local microphone recording continues to use the existing permission flow.

- [ ] **Step 4: Verify speech and all three course entry points**

Run:

```powershell
node tests/speech-practice-model.test.js
node tests/supporting-game-ui.test.js
node tests/bookquiz-3d-quiz.test.js
node tests/core-learning-game-ui.test.js
```

Expected: PASS and unchanged course state after the offline speech action.

- [ ] **Step 5: Commit the fallback**

```powershell
git add app.js tests/speech-practice-model.test.js tests/supporting-game-ui.test.js
git commit -m "fix: keep learning available when speech is offline"
```

### Task 8: Browser offline journey and complete release gate

**Files:**
- Create: `tests/pwa-browser.spec.js`
- Modify: `tests/mint-galaxy-release-gate.test.js`
- Modify: `docs/CURRENT_CHECKPOINT.md`

**Interfaces:**
- Consumes the completed manifest, service worker, queue, synchronization, and UI
- Produces release evidence for installation, offline reload, offline persistence, and reconnection

- [ ] **Step 1: Write the failing Playwright journey**

Use a persistent Chromium context and the real local server. The test must:

1. Log in as an isolated fixture student.
2. Wait until `navigator.serviceWorker.controller` is present.
3. Start the Pattern course and record the stored active item ID.
4. Set the browser context offline and reload.
5. Assert meaningful page content, visible offline status, no horizontal overflow, and the same active item ID.
6. Answer once offline and assert one `pendingSync` event in LocalStorage.
7. Restore connectivity and wait until `pendingSync.length === 0`.
8. Read the temporary server store and assert the event ID appears once.
9. Repeat the offline entry assertion for Bookquiz and verb section buttons.

- [ ] **Step 2: Run the browser journey and verify any uncovered integration failure**

Run:

```powershell
npx --yes playwright test tests/pwa-browser.spec.js --reporter=line
```

Expected before final integration adjustments: FAIL at the first browser-observable contract not yet connected; record the exact failure before changing production code.

- [ ] **Step 3: Make only the minimal integration corrections required by the failing journey**

For each failure, add or refine one assertion first, rerun to confirm the expected failure, then change the responsible production file. Do not weaken offline, privacy, idempotency, or update requirements to make the journey pass.

- [ ] **Step 4: Run the full automated release gate**

```powershell
node --check app.js
node --check offline-sync-model.js
node --check pwa-controller.js
node --check service-worker.js
node --check server.js
$tests = Get-ChildItem -LiteralPath tests -Filter '*.test.js' | Sort-Object Name
foreach ($test in $tests) { node $test.FullName; if ($LASTEXITCODE -ne 0) { throw $test.Name } }
npx --yes playwright test tests/pwa-browser.spec.js --reporter=line
git diff --check -- app.js index.html mint-galaxy.css server.js daily-learning-model.js offline-sync-model.js pwa-controller.js service-worker.js manifest.webmanifest offline.html tests docs/CURRENT_CHECKPOINT.md
```

Expected: zero syntax failures, every Node test PASS, Playwright PASS, and `git diff --check` exit 0.

- [ ] **Step 5: Manually verify supported install and update journeys**

At 360×800, 412×915, and 768×1024 verify:

- Android/desktop install action appears only after a captured install prompt.
- iOS non-standalone mode shows Add to Home Screen guidance without claiming automatic installation.
- Offline first visit shows `offline.html` rather than a blank page.
- Previously loaded app opens offline and enters Pattern, Bookquiz, and verb learning.
- Speech displays its offline message and the student can continue.
- An offline answer survives browser restart.
- Reconnection clears the queue after one server application.
- A waiting update remains waiting until `업데이트 적용` is activated.
- Applying the update retains the exact active course position.

- [ ] **Step 6: Update the checkpoint and commit the release gate**

Record the new test count, supported offline scope, excluded speech behavior, local URL, and future deployment requirement in `docs/CURRENT_CHECKPOINT.md`.

```powershell
git add tests/pwa-browser.spec.js tests/mint-galaxy-release-gate.test.js docs/CURRENT_CHECKPOINT.md
git commit -m "test: gate installable offline learning PWA"
```

## Completion Criteria

- All eight tasks are committed independently.
- The service worker caches no private or online-only resources.
- Existing profiles migrate without data loss.
- Offline answers remain queued through reload and browser restart.
- The server applies each stable event ID at most once.
- All three core learning sections open offline after preparation.
- Speech failure does not block course completion.
- Updates require explicit student action and retain course position.
- The complete Node and Playwright release gates pass with fresh evidence.
