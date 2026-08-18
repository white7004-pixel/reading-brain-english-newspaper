import { parsePublicArticle } from "@/lib/public-article-schema";
import { getPublishedArticles } from "@/lib/content";

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
});
