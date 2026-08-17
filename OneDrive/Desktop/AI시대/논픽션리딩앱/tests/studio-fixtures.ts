import type { StudioArticle } from "@/lib/studio-types";
import { approveArticle, completeStage, publishArticle } from "@/lib/studio-workflow";

export function makeStudioArticle(overrides: Partial<StudioArticle> = {}): StudioArticle {
  return {
    id: "rainforests",
    title: "Rainforests",
    titleKo: "열대우림",
    summaryEn: "Why rainforests matter to life and climate.",
    summaryKo: "열대우림이 지구에 중요한 이유를 소개합니다.",
    domain: "science",
    subtopic: "ecosystems",
    interestBand: "upper-elementary",
    difficulty: { value: 620, method: "nonfiction-lab-estimate", label: "NF Lab estimate" },
    minAge: 10,
    maxAge: 12,
    estimatedReadingSeconds: 180,
    safetyFlags: [],
    safetyReviewed: true,
    estimatedMinutes: 3,
    wordCount: 360,
    status: "draft",
    version: 1,
    pages: ["Rainforests are home to many plants and animals.", "They help regulate climate.", "Protecting them matters."],
    vocabulary: [{ word: "canopy", pronunciation: "KAH-nuh-pee", meaningKo: "수관", definitionEn: "the upper layer of a forest", exampleSentence: "The canopy shelters many rainforest animals." }],
    quiz: [{ id: "q1", type: "comprehension", prompt: "Why do rainforests matter?", options: ["They regulate climate", "They are deserts"], correctIndex: 0, explanation: "Rainforests help regulate climate and support diverse life.", evidence: "They help regulate climate." }],
    sources: [{ title: "Rainforest", publisher: "National Geographic", url: "https://www.nationalgeographic.com/environment/article/rain-forests", publishedAt: "2025-01-01", materialType: "article", supportedFact: "Rainforests regulate climate and support biodiversity." }],
    connectedArticleId: "water-cycle",
    visualTheme: "forest",
    workingVersion: 1,
    publishedSnapshot: null,
    workflowStatus: "draft",
    reviewRecords: {},
    approval: null,
    previewReview: { actor: "editor-1", reviewedAt: "2026-08-17T00:00:00.000Z", workingVersion: 1 },
    withdrawnAt: null,
    editor: "editor-1",
    updatedAt: "2026-08-17T00:00:00.000Z",
    changeLog: [],
    ageRange: "10-12",
    learningGoal: "Explain how rainforests support life and climate.",
    keySentence: "Rainforests help regulate the Earth's climate.",
    keyConcept: "ecosystem",
    sourceNotes: "Sources are included for facts and follow-up reading.",
    reconstructionConfirmed: true,
    rightsNotes: "Source links and media use conditions were checked.",
    media: [],
    ...overrides,
  };
}

export function makePublishedArticle(overrides: Partial<StudioArticle> = {}): StudioArticle {
  const factsReviewed = completeStage(makeStudioArticle(overrides), "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
  const languageReviewed = completeStage(factsReviewed, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
  const ageReviewed = completeStage(languageReviewed, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");
  const approved = approveArticle(ageReviewed, "approver", "2026-08-17T04:00:00.000Z");

  return publishArticle(approved, "2026-08-17T05:00:00.000Z");
}

export function createMemoryStorage(initial: Record<string, string> = {}): Storage {
  const entries = new Map(Object.entries(initial));

  return {
    get length() {
      return entries.size;
    },
    clear() {
      entries.clear();
    },
    getItem(key) {
      return entries.get(key) ?? null;
    },
    key(index) {
      return [...entries.keys()][index] ?? null;
    },
    removeItem(key) {
      entries.delete(key);
    },
    setItem(key, value) {
      entries.set(key, value);
    },
  };
}
