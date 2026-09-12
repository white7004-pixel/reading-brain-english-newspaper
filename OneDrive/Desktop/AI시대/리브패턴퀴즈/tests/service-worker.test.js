const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "service-worker.js"), "utf8");
const handlers = {};
const cachedUrls = [];
const deletedCaches = [];
let claimed = false;

const cache = {
  async addAll(urls) { cachedUrls.push(...urls); },
  async match() { return undefined; },
  async put() {},
};
const caches = {
  async open() { return cache; },
  async keys() { return ["rb-shell-old", "rb-content-old", "unrelated-cache"]; },
  async delete(name) { deletedCaches.push(name); return true; },
  async match() { return undefined; },
};
const self = {
  location: { origin: "https://example.test" },
  clients: { async claim() { claimed = true; } },
  addEventListener(type, handler) { handlers[type] = handler; },
  async skipWaiting() {},
};

vm.runInNewContext(source, {
  self,
  caches,
  fetch: async () => new Response("network", { headers: { "x-test-source": "network" } }),
  Request,
  Response,
  URL,
  setTimeout,
  clearTimeout,
});

async function runExtendable(type, extra = {}) {
  const pending = [];
  handlers[type]({ ...extra, waitUntil(promise) { pending.push(Promise.resolve(promise)); } });
  await Promise.all(pending);
}

(async () => {
  await runExtendable("install");
  assert.ok(cachedUrls.includes("/index.html"));
  assert.ok(cachedUrls.includes("/data/expressions.js"));
  assert.ok(cachedUrls.includes("/data/bookquiz.js"));
  assert.ok(cachedUrls.includes("/data/verbs.js"));
  assert.equal(cachedUrls.some((url) => url.includes("native-audio") || url.includes("bookquiz-audio")), false);

  await runExtendable("activate");
  assert.deepEqual(deletedCaches.sort(), ["rb-content-old", "rb-shell-old"]);
  assert.equal(claimed, true);

  let apiResponsePromise = null;
  handlers.fetch({
    request: new Request("https://example.test/api/tts?text=hello"),
    respondWith(promise) { apiResponsePromise = promise; },
  });
  assert.equal(apiResponsePromise, null, "API requests must bypass service-worker caching");

  let staticResponsePromise = null;
  handlers.fetch({
    request: new Request("https://example.test/app.js"),
    respondWith(promise) { staticResponsePromise = promise; },
  });
  assert.ok(staticResponsePromise, "static GET requests must use the cache strategy");
  await staticResponsePromise;

  console.log("service worker tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
