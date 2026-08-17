import { SAMPLE_ARTICLES } from "./sample-content";
import type { StudioArticle } from "./studio-types";
import type { StudioState } from "./studio-store";
import type { Article } from "./types";

export function createSeedStudioState(): StudioState {
  return {
    schemaVersion: 1,
    articles: SAMPLE_ARTICLES.map(createSeedStudioArticle),
  };
}

function createSeedStudioArticle(article: Article): StudioArticle {
  const { review, ...articleFields } = article;

  return {
    ...articleFields,
    status: "published",
    workingVersion: article.version,
    publishedSnapshot: cloneAndFreezePublishedSnapshot(article),
    workflowStatus: "published",
    reviewRecords: {
      facts: { actor: review.approvedBy, completedAt: review.approvedAt },
      language: { actor: review.approvedBy, completedAt: review.approvedAt },
      age: { actor: review.approvedBy, completedAt: review.approvedAt },
    },
    approval: { actor: review.approvedBy, approvedAt: review.approvedAt },
    withdrawnAt: null,
    editor: review.approvedBy,
    updatedAt: review.approvedAt,
    changeLog: [],
    ageRange: article.interestBand,
    learningGoal: article.summaryKo,
    keySentence: article.pages[0],
    keyConcept: article.domain,
    sourceNotes: article.sources.map((source) => source.title).join(", "),
    media: [],
  };
}

export function cloneAndFreezePublishedSnapshot(article: Article): Readonly<Article> {
  return deepFreeze({
    ...article,
    difficulty: { ...article.difficulty },
    pages: [...article.pages],
    vocabulary: article.vocabulary.map((item) => ({ ...item })),
    quiz: article.quiz.map((question) => ({ ...question, options: [...question.options] })),
    sources: article.sources.map((source) => ({ ...source })),
    review: { ...article.review },
  });
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }
    Object.freeze(value);
  }

  return value;
}
