import {
  getPublicArticles,
  loadStudioState,
  saveStudioState,
  upsertStudioArticle,
} from "@/lib/studio-store";
import { withdrawArticle } from "@/lib/studio-workflow";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "@/tests/studio-fixtures";

describe("versioned studio content store", () => {
  it("returns only approved, published snapshots to learners", () => {
    const draft = makeStudioArticle({ id: "draft" });
    const published = makePublishedArticle({ id: "live" });
    const withdrawn = withdrawArticle(makePublishedArticle({ id: "off" }), "2026-08-18T10:00:00.000Z");

    expect(getPublicArticles({ schemaVersion: 1, articles: [draft, published, withdrawn] }).map((item) => item.id))
      .toEqual(["live"]);
  });

  it("backs up corrupt storage and recovers with seeded reviewed content", () => {
    const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": "{" });

    const state = loadStudioState(storage);

    expect(state.articles.length).toBeGreaterThan(0);
    expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBe("{");
    expect(getPublicArticles(state)).toHaveLength(6);
  });

  it("replaces an existing article and persists the replacement", () => {
    const original = makeStudioArticle({ id: "rainforests", title: "Original" });
    const replacement = { ...original, title: "Revised" };
    const storage = createMemoryStorage();
    const state = upsertStudioArticle({ schemaVersion: 1, articles: [original] }, replacement);

    saveStudioState(storage, state);

    expect(loadStudioState(storage).articles).toEqual([replacement]);
    expect(original.title).toBe("Original");
  });

});
