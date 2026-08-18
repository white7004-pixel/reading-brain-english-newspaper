import { LIBRARY_SEEDS } from "@/lib/library";
import { SAMPLE_ARTICLES } from "@/lib/sample-content";
import { createSeedStudioState } from "@/lib/studio-seed";
import { getPublicArticles } from "@/lib/studio-store";

it("adds the authored library to the studio as drafts", () => {
  const state = createSeedStudioState();
  const drafts = state.articles.filter((article) => article.workflowStatus === "draft");

  expect(state.articles).toHaveLength(SAMPLE_ARTICLES.length + LIBRARY_SEEDS.length);
  expect(drafts).toHaveLength(LIBRARY_SEEDS.length);
  expect(drafts.map((article) => article.id).sort()).toEqual(LIBRARY_SEEDS.map((seed) => seed.id).sort());
});

it("keeps unreviewed library drafts away from learners", () => {
  const publicIds = getPublicArticles(createSeedStudioState()).map((article) => article.id);

  for (const seed of LIBRARY_SEEDS) {
    expect(publicIds).not.toContain(seed.id);
  }
  expect(publicIds).toHaveLength(SAMPLE_ARTICLES.length);
});
