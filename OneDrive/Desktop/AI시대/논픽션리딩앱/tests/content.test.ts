import { getArticleById, getPublishedArticles } from "@/lib/content";
import { saveStudioState } from "@/lib/studio-store";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "@/tests/studio-fixtures";

describe("learner-safe content repository", () => {
  it("returns only reviewed and published articles", () => {
    const articles = getPublishedArticles();
    expect(articles.length).toBeGreaterThanOrEqual(6);

    for (const article of articles) {
      expect(article.status).toBe("published");
      expect(article.review.approvedBy.length).toBeGreaterThan(0);
      expect(article.sources.length).toBeGreaterThanOrEqual(2);
      expect(article.estimatedMinutes).toBe(3);
      expect(article.pages.length).toBeGreaterThanOrEqual(3);
      expect(article.pages.join(" ").length).toBeGreaterThanOrEqual(900);
      expect(article.pages.join(" ").length).toBeLessThanOrEqual(1150);
      expect(article.pages.join(" ")).toContain(article.keySentence);
      expect(article.vocabulary.length).toBeGreaterThanOrEqual(4);
      expect(article.quiz).toHaveLength(3);
    }
  });

  it("keeps identifiers and connected article references valid", () => {
    const articles = getPublishedArticles();
    expect(new Set(articles.map((article) => article.id)).size).toBe(articles.length);
    for (const article of articles) {
      if (article.connectedArticleId) expect(getArticleById(article.connectedArticleId)).toBeDefined();
      for (const question of article.quiz) {
        expect(question.options[question.correctIndex]).toBeTruthy();
        expect(question.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it("uses supplied studio storage for published article lookups", () => {
    const storage = createMemoryStorage();
    const draft = makeStudioArticle({ id: "draft" });
    const published = makePublishedArticle({ id: "live", title: "Visible review" });
    saveStudioState(storage, { schemaVersion: 3, articles: [draft, published] });

    expect(getPublishedArticles(storage).map((article) => article.id)).toEqual(["live"]);
    expect(getArticleById("live", storage)?.title).toBe("Visible review");
    expect(getArticleById("draft", storage)).toBeUndefined();
  });

  it("restores a seeded hero photo for an older saved learner article", () => {
    const storage = createMemoryStorage();
    const published = makePublishedArticle({ id: "stars-shine", title: "Why Do Stars Shine?", heroImage: undefined });
    saveStudioState(storage, { schemaVersion: 3, articles: [published] });

    expect(getPublishedArticles(storage)[0]?.heroImage?.src).toMatch(/^\/article-images\//);
  });

  it("falls back to seeded public articles when corrupt storage cannot be backed up", () => {
    const storage = {
      getItem: () => "{corrupt studio state",
      setItem: () => { throw new Error("Quota exceeded"); },
    };

    const articles = getPublishedArticles(storage);

    expect(articles).toHaveLength(6);
    expect(articles[0]?.title).toBe("Why Do Stars Shine?");
  });
});
