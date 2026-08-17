import { getArticleById, getPublishedArticles } from "@/lib/content";

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
      expect(article.vocabulary.length).toBeGreaterThanOrEqual(4);
      expect(article.quiz).toHaveLength(3);
    }
  });

  it("keeps identifiers and connected article references valid", () => {
    const articles = getPublishedArticles();
    expect(new Set(articles.map((article) => article.id)).size).toBe(articles.length);
    for (const article of articles) {
      expect(getArticleById(article.connectedArticleId)).toBeDefined();
      for (const question of article.quiz) {
        expect(question.options[question.correctIndex]).toBeTruthy();
        expect(question.explanation.length).toBeGreaterThan(10);
      }
    }
  });
});
