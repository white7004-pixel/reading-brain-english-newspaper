const CACHE_VERSION = "20260920-rt-3";
const SHELL_CACHE = `rb-shell-${CACHE_VERSION}`;
const CONTENT_CACHE = `rb-content-${CACHE_VERSION}`;
const CACHE_PREFIXES = ["rb-shell-", "rb-content-"];

const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.webmanifest",
  "/styles.css?v=20260920-rt-3",
  "/mint-galaxy.css?v=20260920-rt-3",
  "/viva-theme.css?v=20260920-rt-3",
  "/reading-touch.css?v=20260920-rt-3",
  "/assets/fonts/jua-subset.woff2",
  "/assets/reading-brain-logo.jpg",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
];

const CONTENT_ASSETS = [
  "/data/expressions.js",
  "/data/verbs.js",
  "/data/bookquiz.js",
  "/learning-dashboard-model.js?v=20260627-dashboard",
  "/daily-learning-model.js?v=20260823",
  "/auto-pronunciation-model.js?v=20260823",
  "/bookquiz-map-model.js?v=20260823",
  "/leaderboard-model.js?v=20260821-podium",
  "/pattern-hub-model.js?v=20260819-open-interpret",
  "/interpretation-model.js?v=20260818-path",
  "/game-ui-model.js?v=20260821",
  "/game-ui.js?v=20260821",
  "/offline-sync-model.js?v=20260823",
  "/app.js?v=20260920-rt-3",
  "/assets/mascot/default.webp",
  "/assets/mascot/guide.webp",
  "/assets/mascot/listening.webp",
  "/assets/mascot/correct.webp",
  "/assets/mascot/wrong.webp",
  "/assets/mascot/complete.webp",
];

async function cacheRequiredContent() {
  const [shell, content] = await Promise.all([caches.open(SHELL_CACHE), caches.open(CONTENT_CACHE)]);
  await shell.addAll(SHELL_ASSETS);
  await content.addAll(CONTENT_ASSETS);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheRequiredContent());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((name) => {
      const owned = CACHE_PREFIXES.some((prefix) => name.startsWith(prefix));
      const current = name === SHELL_CACHE || name === CONTENT_CACHE;
      return owned && !current ? caches.delete(name) : Promise.resolve(false);
    }));
    await self.clients.claim();
  })());
});

async function navigationResponse(request) {
  try {
    return await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error("navigation timeout")), 3000)),
    ]);
  } catch {
    return (await caches.match("/index.html")) || caches.match("/offline.html");
  }
}

async function staticResponse(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response?.ok) {
    const cache = await caches.open(CONTENT_CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.protocol === "blob:" || url.pathname.startsWith("/api/")) return;
  if (request.mode === "navigate") {
    event.respondWith(navigationResponse(request));
    return;
  }
  event.respondWith(staticResponse(request));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (event.data?.type === "CACHE_REQUIRED_CONTENT") {
    event.waitUntil(cacheRequiredContent());
  }
});
