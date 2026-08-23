# Installable PWA and Offline Learning Design

Date: 2026-08-23

## Goal

Turn the existing Reading Brain web application into an installable progressive web app. A student who has signed in on a device must be able to reopen the app, study the existing learning content, complete quizzes and reviews, and retain progress without a network connection. Server-generated speech remains an online enhancement and must never block learning.

## Scope

### Included

- Home-screen installation through a web app manifest.
- Standalone display with the existing Reading Brain visual identity.
- Offline loading of the application shell and the three primary learning sections:
  - Pattern English
  - Bookquiz question learning
  - Elementary irregular verbs
- Offline persistence of the active course, daily statistics, stars, badges, streak, review state, and pending progress events.
- Deferred synchronization of pending progress events after connectivity returns.
- Explicit online, offline, update-ready, and synchronization status messages.
- Graceful handling of unavailable online speech.
- Automated PWA, cache-boundary, persistence, and synchronization tests.

### Excluded

- Android or iOS native packaging.
- Offline generation or bulk download of all speech audio.
- Caching login responses, session credentials, administrator APIs, TTS responses, or student API responses in the service worker.
- Background Sync API as a required dependency. Synchronization must work through normal page lifecycle and connectivity events even when Background Sync is unsupported.
- Changes to curriculum content.

## User Experience

### Installation

The browser may offer installation when its platform criteria are met. The app also exposes an in-app install action when a `beforeinstallprompt` event is available. On iOS, where that event is unavailable, the app provides concise instructions for adding the app to the Home Screen.

The installed app opens in standalone mode at `/` and uses the existing responsive layout. Installation is optional; the normal website remains fully usable.

### First Offline Use

A student must successfully load the app online at least once. After a successful login, the app prepares the static learning resources needed by the current release. The interface reports when offline learning is ready.

If a student opens the app offline before any successful online load, the service worker returns a small offline fallback explaining that one online visit is required.

### Offline Learning

When connectivity is lost:

- The current course remains usable.
- Answers, stage transitions, rewards, and review changes continue to save locally.
- A persistent but unobtrusive status indicates that the app is offline and progress will synchronize later.
- Speech controls remain visible but disabled. Activating one displays `음성은 인터넷 연결 시 이용할 수 있어요.` without interrupting the course.
- Recording practice remains local because microphone capture does not require uploading. Existing browser permission and MediaRecorder fallbacks continue to apply.

### Reconnection

When the browser reports connectivity and the student has a valid server session, the app sends pending progress events in creation order. Successfully acknowledged events are removed from the queue. Failed events remain queued and retry during a later online lifecycle event.

Synchronization must be idempotent. Every queued event has a stable client-generated ID, and the server records processed IDs per student so a retry cannot duplicate points, mastery, or logs.

### Updates

The service worker never forces a mid-session reload. When a new worker is waiting, the app shows an update-ready action. Activating it asks the worker to take control and then reloads once. The active course is saved before applying the update.

## Architecture

### Web App Manifest

Create `manifest.webmanifest` with:

- App name and short name in Korean.
- `start_url: "/"` and `scope: "/"`.
- `display: "standalone"`.
- Existing mint/navy theme and background colors.
- Purpose-built 192×192 and 512×512 PNG icons, plus a maskable 512×512 icon.
- A stable application identifier.

`index.html` links the manifest, theme color, Apple touch icon, and mobile-web-app metadata.

### Service Worker

Create `service-worker.js` without introducing a build tool or Workbox.

The worker maintains versioned caches:

- `rb-shell-<version>` for the minimal navigation shell and offline fallback.
- `rb-content-<version>` for learning models, curriculum data, styles, scripts, and essential images.

Caching policies:

- Navigation: network first with a short timeout, then cached `index.html`, then the offline fallback.
- Versioned local scripts, styles, curriculum data, fonts, and images: cache first, with background refresh when practical.
- Same-origin static GET requests not present in the initial manifest: stale while revalidate.
- `/api/**`, non-GET requests, blob URLs, browser-extension URLs, and cross-origin requests: never stored by the service worker.
- Audio responses from `/api/tts`: network only.

Installation precaches only files essential for the three learning sections. Activation removes only old caches whose names use the Reading Brain cache prefix; unrelated origin caches remain untouched.

### Client PWA Controller

Create `pwa-controller.js` as a small UMD module with testable pure helpers and browser integration. It is responsible for:

- Service-worker registration.
- Install prompt state.
- Online/offline status.
- Update-ready notification and activation.
- Static content readiness messages.

The controller communicates state changes to `app.js` through callbacks or custom DOM events. It does not own course state or student data.

### Offline Progress Queue

Extend the versioned learning profile rather than create several unrelated LocalStorage records. The version-1 record gains a backward-compatible `pendingSync` array. Missing arrays normalize to an empty array during load.

Each event contains:

```js
{
  id: "device-session-sequence",
  createdAt: "ISO timestamp",
  type: "progress",
  payload: { /* existing progress fields */ }
}
```

Queue operations are pure functions in a dedicated `offline-sync-model.js` module:

- `enqueue(queue, event)` ignores duplicate IDs.
- `acknowledge(queue, ids)` removes only acknowledged events.
- `nextBatch(queue, limit)` preserves creation order.
- `normalizeQueue(value)` rejects malformed records safely.

`app.js` persists a learning action locally before attempting any network request. Online synchronization sends a small ordered batch, acknowledges successful IDs, persists the shortened queue, and continues until empty or a request fails.

### Server Idempotency

The existing progress endpoint accepts an optional `eventId`. Each student record stores a bounded list of recently processed event IDs. If the server receives an already processed ID, it returns a successful duplicate acknowledgement without applying the progress payload again.

The processed-ID list is capped to prevent unbounded growth. Legacy clients without `eventId` continue to use the existing behavior.

## Error Handling

- Storage parsing failures fall back to a valid profile while preserving the legacy recovery behavior.
- Cache installation fails atomically: the new worker does not activate with a partially populated required shell.
- Optional assets may fail without blocking worker installation.
- A failed progress request leaves the event in the queue.
- Authentication failures stop automatic synchronization and ask the student to sign in when online; local progress remains intact.
- Quota errors show a clear storage warning and do not falsely claim offline readiness.
- Speech failures use the existing visual feedback region and never advance or cancel the course unexpectedly.

## Security and Privacy

- Service-worker caches contain only public static application resources.
- Authentication responses, student records, PINs, session tokens, administrator responses, recordings, and TTS responses are never cached.
- Recording blobs and blob URLs remain memory-only and are released through the existing recording lifecycle.
- Pending progress contains only the minimum fields already sent to the progress endpoint.
- Logging must not print PINs, session identifiers, or queued payload contents.

## Accessibility and Responsive Behavior

- Connectivity, synchronization, and update messages use a polite live region.
- Status color is accompanied by text and an icon.
- Install and update actions meet the existing 48px target requirement.
- Offline messages do not cover answer controls or move keyboard focus unexpectedly.
- Reduced-motion mode disables install/update flourish animations.
- The existing 360×800, 412×915, and 768×1024 release sizes remain mandatory.

## Testing

### Unit and Source Contract Tests

- Manifest contains required installability fields and icons.
- Service-worker static asset list contains all required learning resources.
- Service worker excludes `/api/**`, non-GET requests, and audio from storage.
- Queue normalization, deduplication, ordering, batching, and acknowledgement.
- Learning profile migration adds `pendingSync` without losing existing fields.
- Server applies an event ID once and acknowledges duplicates.
- Speech controls expose the offline fallback message.

### Browser Verification

- First online visit registers the worker and reaches offline-ready state.
- Reloading offline renders meaningful content instead of a blank page.
- Pattern, Bookquiz, and verb course entry points open offline.
- An offline answer survives reload.
- Reconnection synchronizes a queued event once.
- A waiting worker updates only after the user activates the update action.
- Mobile and tablet widths have no horizontal overflow.

### Release Gate

The existing 21-test suite must remain green. New tests, JavaScript syntax checks, `git diff --check`, HTTP 200, service-worker registration, offline reload, and reconnection behavior are required before completion.

## Rollout

Ship the PWA as a web-only enhancement. Existing students keep their current profiles through normalization. The service worker uses a new cache version for every release that changes precached assets. If a release must be rolled back, publishing the prior static bundle with a new cache version restores behavior without requiring students to clear browser storage.

## Success Criteria

- The app is installable on supported desktop and Android browsers and provides iOS installation guidance.
- A previously signed-in student can launch the app offline and enter all three primary learning sections.
- Offline progress survives refresh and browser restart.
- Reconnection uploads pending progress without duplicate scoring.
- Speech unavailability never blocks course completion.
- Updates do not interrupt an active learning session.
- No private API data or recordings enter the service-worker cache.
