import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const serviceWorkerSource = readFileSync(resolve(process.cwd(), "public/sw.js"), "utf8");

it("versions and bounds the representative offline cache", () => {
  expect(serviceWorkerSource).toContain('const CACHE_NAME = "nonfiction-lab-v3"');
  expect(serviceWorkerSource).toContain('"/article-images/ar1-batch-07/owl-flight.jpg"');
  expect(serviceWorkerSource).not.toContain("cache.addAll(all100Photographs)");
});

it("caches only successful same-origin GET requests and removes older app caches", () => {
  expect(serviceWorkerSource).toContain('request.method !== "GET"');
  expect(serviceWorkerSource).toContain("url.origin !== self.location.origin");
  expect(serviceWorkerSource).toContain("response.ok");
  expect(serviceWorkerSource).toMatch(/key\.startsWith\("nonfiction-lab-"\)/);
  expect(serviceWorkerSource).toContain('url.pathname.startsWith("/studio")');
});
