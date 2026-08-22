import { evaluateQuestReadiness } from "@/lib/quest-readiness";
import type { QuestMetadata } from "@/lib/quest-types";
import { projectWorkingArticle } from "@/components/studio/studio-preview";
import { parsePublicArticle } from "@/lib/public-article-schema";
import { getPublishedArticles } from "@/lib/content";
import { makeStudioArticle } from "@/tests/studio-fixtures";
import type { Article } from "@/lib/types";

const heroImage = {
  src: "/article-images/ar1-batch-07/owl-flight.jpg",
  altKo: "날개를 편 채 나는 올빼미",
  sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
  title: "Example owl",
  creator: "Example Creator",
  licenseName: "CC BY-SA 4.0" as const,
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  isModified: false as const,
};

const quest: QuestMetadata = {
  curiosityQuestionKo: "올빼미는 어떻게 조용히 날까?",
  knowledgeTakeawayKo: "부드러운 깃털 가장자리가 공기 소리를 줄인다.",
  collectionId: "ar1-living-world",
  mapOrder: 1,
  prerequisiteArticleIds: ["ar1-night-animals"],
  nextArticleIds: ["ar1-ocean-tides"],
};

function readyArticle(overrides: Partial<Article> = {}): Article {
  return {
    ...projectWorkingArticle(makeStudioArticle({
      id: "ar1-owl-flight",
      heroImage,
      quest,
      pages: ["One", "Two", "Three"],
      vocabulary: [{ word: "silent", pronunciation: "SY-lent", meaningKo: "조용한", definitionEn: "making little or no sound", exampleSentence: "Owls fly silently." }],
      quiz: [
        { id: "q1", type: "comprehension", prompt: "One?", options: ["A", "B"], correctIndex: 0, explanation: "A", evidence: "One" },
        { id: "q2", type: "comprehension", prompt: "Two?", options: ["A", "B"], correctIndex: 0, explanation: "A", evidence: "Two" },
        { id: "q3", type: "inference", prompt: "Three?", options: ["A", "B"], correctIndex: 0, explanation: "A", evidence: "Three" },
        { id: "q4", type: "vocabulary", prompt: "Four?", options: ["A", "B"], correctIndex: 0, explanation: "A", evidence: "Three" },
      ],
      sources: [
        { title: "One", publisher: "One", url: "https://example.org/one", publishedAt: "2026-01-01", materialType: "article", supportedFact: "One" },
        { title: "Two", publisher: "Two", url: "https://example.org/two", publishedAt: "2026-01-02", materialType: "article", supportedFact: "Two" },
      ],
      reviewRecords: { age: { actor: "age-reviewer", completedAt: "2026-08-21T00:00:00.000Z", workingVersion: 1, checklistItemIds: ["age.topic-fit"], provenance: "explicit" } },
      previewReview: { actor: "editor", reviewedAt: "2026-08-21T00:00:00.000Z", workingVersion: 1 },
    })),
    ...overrides,
  };
}

describe("Knowledge Quest readiness", () => {
  it("reports all eight checks for a complete quest", () => {
    const result = evaluateQuestReadiness(readyArticle());

    expect(result).toMatchObject({ ready: true, passed: 8, total: 8 });
    expect(result.checks.map((check) => check.id)).toEqual([
      "curiosity", "takeaway", "photography", "map-placement", "learning-materials", "sources", "age-review", "mobile-preview",
    ]);
  });

  it.each([
    ["curiosity", { quest: { ...quest, curiosityQuestionKo: " " } }],
    ["takeaway", { quest: { ...quest, knowledgeTakeawayKo: " " } }],
    ["photography", { heroImage: { ...heroImage, creator: " " } }],
    ["map-placement", { quest: { ...quest, collectionId: " ", mapOrder: 0 } }],
    ["learning-materials", { quiz: readyArticle().quiz.slice(0, 3) }],
    ["sources", { sources: readyArticle().sources.slice(0, 1) }],
    ["age-review", { review: { ...readyArticle().review, ageChecked: false } }],
    ["mobile-preview", { mobilePreviewAcknowledged: false }],
  ] as Array<[string, Partial<Article>]>)("flags missing %s", (id, patch) => {
    expect(evaluateQuestReadiness(readyArticle(patch)).checks).toContainEqual(expect.objectContaining({ id, passed: false }));
  });

  it.each([
    ["malformed prerequisite ID", { ...quest, prerequisiteArticleIds: ["bad id"] }],
    ["self link", { ...quest, prerequisiteArticleIds: ["ar1-owl-flight"] }],
    ["duplicate relationship", { ...quest, prerequisiteArticleIds: ["ar1-night-animals"], nextArticleIds: ["ar1-night-animals"] }],
  ])("flags invalid map placement for %s", (_description, invalidQuest) => {
    expect(evaluateQuestReadiness(readyArticle({ quest: invalidQuest })).checks)
      .toContainEqual(expect.objectContaining({ id: "map-placement", passed: false }));
  });

  it("leaves legacy articles valid at the public boundary while reporting missing quest fields", () => {
    const legacy = getPublishedArticles()[0];
    const result = evaluateQuestReadiness(legacy);

    expect(parsePublicArticle(legacy).ok).toBe(true);
    expect(result).toMatchObject({ ready: false, total: 8 });
    expect(result.checks.filter((check) => !check.passed).map((check) => check.id))
      .toEqual(expect.arrayContaining(["curiosity", "takeaway", "map-placement"]));
  });
});
