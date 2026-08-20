import { parsePublicArticle } from "@/lib/public-article-schema";
import { getPublishedArticles } from "@/lib/content";

const heroImage = {
  src: "/article-images/ar1-batch-07/owl-flight.jpg",
  altKo: "날개를 펼쳐 낮게 나는 올빼미",
  sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
  title: "Example owl",
  creator: "Example Creator",
  licenseName: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  isModified: false,
};

describe("shared public article schema", () => {
  it("round-trips every learner field and returns a deeply frozen value", () => {
    const source = {
      ...getPublishedArticles()[0],
      connectedArticleId: undefined,
      media: [{ kind: "image" as const, url: "https://images.example.org/star.jpg", alt: "A bright star" }],
    };
    const parsed = parsePublicArticle(JSON.parse(JSON.stringify(source)));

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value).toEqual(source);
    expect(Object.isFrozen(parsed.value)).toBe(true);
    expect(Object.isFrozen(parsed.value.pages)).toBe(true);
    expect(Object.isFrozen(parsed.value.media)).toBe(true);
  });

  it.each([
    ["blank visual theme", { visualTheme: " " }],
    ["blank key sentence", { keySentence: " " }],
    ["unresolved connection", { connectedArticleId: "pending" }],
    ["malformed quiz", { quiz: [{ id: "q", prompt: "?", options: ["one"], correctIndex: 4, explanation: "bad" }] }],
    ["unsafe image", { media: [{ kind: "image", url: "javascript:alert(1)", alt: "unsafe" }] }],
  ])("rejects %s", (_description, patch) => {
    expect(parsePublicArticle({ ...getPublishedArticles()[0], ...patch }).ok).toBe(false);
  });

  it("strips unknown author-only fields at the public boundary", () => {
    const source = getPublishedArticles()[0];
    const parsed = parsePublicArticle({
      ...source,
      internalEditorialNote: "do not publish",
      difficulty: { ...source.difficulty, internalEditorialNote: "private scoring note" },
      media: [{
        kind: "image",
        url: "https://images.example.org/star.jpg",
        alt: "A bright star",
        usageConfirmed: true,
        internalEditorialNote: "licensed internally",
      }],
    });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value).not.toHaveProperty("internalEditorialNote");
    expect(parsed.value.difficulty).not.toHaveProperty("internalEditorialNote");
    expect(parsed.value.media).toEqual([
      { kind: "image", url: "https://images.example.org/star.jpg", alt: "A bright star" },
    ]);
  });

  it("preserves the exact key sentence through the public boundary", () => {
    const source = getPublishedArticles()[0];
    const parsed = parsePublicArticle(JSON.parse(JSON.stringify(source)));

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.keySentence).toBe(source.keySentence);
  });

  it("preserves a valid local hero photograph and its attribution", () => {
    const parsed = parsePublicArticle({ ...getPublishedArticles()[0], heroImage });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.heroImage).toEqual(heroImage);
    expect(parsed.value.heroImage).not.toBe(heroImage);
  });

  it.each([
    ["remote asset path", { ...heroImage, src: "https://upload.wikimedia.org/owl.jpg" }],
    ["blank creator", { ...heroImage, creator: " " }],
    ["unsupported license", { ...heroImage, licenseName: "All rights reserved" }],
    ["insecure source page", { ...heroImage, sourcePageUrl: "http://commons.wikimedia.org/wiki/File:Example.jpg" }],
    ["modified asset", { ...heroImage, isModified: true }],
  ])("rejects hero photography with %s", (_description, invalidHeroImage) => {
    expect(parsePublicArticle({ ...getPublishedArticles()[0], heroImage: invalidHeroImage }).ok).toBe(false);
  });
});
