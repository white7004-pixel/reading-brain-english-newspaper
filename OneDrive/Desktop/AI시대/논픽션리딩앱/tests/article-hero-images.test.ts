import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { AR1_BATCH_07 } from "@/lib/library/ar1-07";
import { AR1_BATCH_07_IMAGES } from "@/lib/library/ar1-07-images";
import { SAMPLE_ARTICLES } from "@/lib/sample-content";

const ALLOWED_LICENSES = new Set([
  "CC BY 2.0", "CC BY 3.0", "CC BY 4.0",
  "CC BY-SA 2.0", "CC BY-SA 3.0", "CC BY-SA 4.0",
  "Public domain",
]);

it("provides one distinct attributed local photograph for every seventh-batch article", () => {
  const ids = AR1_BATCH_07.map((seed) => seed.id);
  const images = ids.map((id) => AR1_BATCH_07_IMAGES[id]);

  expect(Object.keys(AR1_BATCH_07_IMAGES)).toHaveLength(15);
  expect(images.every(Boolean)).toBe(true);
  expect(new Set(images.map((image) => image.src)).size).toBe(15);

  for (const [index, image] of images.entries()) {
    const assetPath = join(process.cwd(), "public", image.src);
    expect(image.altKo.trim(), `${ids[index]} altKo`).not.toBe("");
    expect(image.creator.trim(), `${ids[index]} creator`).not.toBe("");
    expect(image.title.trim(), `${ids[index]} title`).not.toBe("");
    expect(image.sourcePageUrl.startsWith("https://commons.wikimedia.org/wiki/File:"), `${ids[index]} source`).toBe(true);
    expect(image.licenseUrl.startsWith("https://"), `${ids[index]} license URL`).toBe(true);
    expect(ALLOWED_LICENSES.has(image.licenseName), `${ids[index]} license`).toBe(true);
    expect(image.isModified).toBe(false);
    expect(existsSync(assetPath), `${ids[index]} missing ${assetPath}`).toBe(true);
    expect(statSync(assetPath).size, `${ids[index]} empty asset`).toBeGreaterThan(0);
  }
});

it("attaches the manifest photograph to every exported seventh-batch seed", () => {
  for (const seed of AR1_BATCH_07) {
    expect(seed.heroImage).toEqual(AR1_BATCH_07_IMAGES[seed.id]);
    expect(seed.quest).toBeDefined();
  }
});

it("attaches a local hero photograph to every published learner article", () => {
  for (const article of SAMPLE_ARTICLES.filter((item) => item.status === "published")) {
    expect(article.heroImage, `${article.id} heroImage`).toBeDefined();
    expect(article.heroImage?.src.startsWith("/article-images/"), `${article.id} local image`).toBe(true);
    expect(existsSync(join(process.cwd(), "public", article.heroImage?.src ?? "")), `${article.id} missing image`).toBe(true);
  }
});
