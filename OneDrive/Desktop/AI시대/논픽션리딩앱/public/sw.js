const CACHE_NAME = "nonfiction-lab-v3";
const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
  "/article-images/ar1-batch-07/owl-flight.jpg",
  "/article-images/ar1-batch-07/reading-focus.jpg",
  "/article-images/ar1-batch-07/fingerprints.jpg",
  "/article-images/ar1-batch-07/glassblower.jpg",
  "/article-images/ar1-batch-07/group-decisions.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("nonfiction-lab-") && key !== CACHE_NAME).map((key) => caches.delete(key)))));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || request.headers.has("range") || url.pathname.startsWith("/studio")) return;

  event.respondWith(fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  }).catch(async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") return caches.match("/");
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }));
});
