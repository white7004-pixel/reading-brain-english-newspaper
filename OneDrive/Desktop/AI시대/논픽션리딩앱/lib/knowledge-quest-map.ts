import type { Article } from "./types";

export type KnowledgeMapNode = {
  article: Article;
  articleId: string;
  collectionId: string;
  order: number;
  state: "available" | "recommended" | "completed" | "locked";
};

/**
 * Builds the learner-facing map from publication-safe articles only.
 * Drafts stay available to Studio previews but cannot become learner quests.
 */
export function buildKnowledgeMap(articles: readonly Article[], completedIds: readonly string[]): KnowledgeMapNode[] {
  const completed = new Set(completedIds);
  const questArticles = articles
    .filter((article) => article.status === "published" && article.quest)
    .sort(compareQuestArticles);
  const unlocked = questArticles.filter((article) => article.quest!.prerequisiteArticleIds
    .every((id) => completed.has(id)));
  const recommendedId = unlocked.find((article) => !completed.has(article.id))?.id;

  return questArticles.map((article) => ({
    article,
    articleId: article.id,
    collectionId: article.quest!.collectionId,
    order: article.quest!.mapOrder,
    state: completed.has(article.id)
      ? "completed"
      : article.id === recommendedId
        ? "recommended"
        : unlocked.some((candidate) => candidate.id === article.id)
          ? "available"
          : "locked",
  }));
}

/** Returns the first published map node explicitly linked from the current quest. */
export function nextQuestFromMap(nodes: readonly KnowledgeMapNode[], articleId: string): KnowledgeMapNode | undefined {
  const current = nodes.find((node) => node.articleId === articleId);
  if (!current?.article.quest) return undefined;

  return current.article.quest.nextArticleIds
    .map((nextId) => nodes.find((node) => node.articleId === nextId))
    .find((node): node is KnowledgeMapNode => node !== undefined);
}

function compareQuestArticles(left: Article, right: Article): number {
  const leftQuest = left.quest!;
  const rightQuest = right.quest!;
  return leftQuest.collectionId.localeCompare(rightQuest.collectionId)
    || leftQuest.mapOrder - rightQuest.mapOrder
    || left.id.localeCompare(right.id);
}
