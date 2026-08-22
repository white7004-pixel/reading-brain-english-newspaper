import { buildKnowledgeMap, nextQuestFromMap } from "@/lib/knowledge-quest-map";
import { SAMPLE_ARTICLES } from "@/lib/sample-content";
import type { Article } from "@/lib/types";

const quest = (collectionId: string, mapOrder: number, prerequisiteArticleIds: string[], nextArticleIds: string[]) => ({
  curiosityQuestionKo: "무엇을 발견할 수 있을까요?",
  knowledgeTakeawayKo: "관찰한 사실을 다음 질문과 연결합니다.",
  collectionId,
  mapOrder,
  prerequisiteArticleIds,
  nextArticleIds,
});

const article = (id: string, questMetadata: Article["quest"], status: Article["status"] = "published"): Article => ({
  ...SAMPLE_ARTICLES[0],
  id,
  status,
  quest: questMetadata,
});

describe("knowledge quest map", () => {
  it("keeps Studio drafts out while marking completed and newly unlocked published quests", () => {
    const articles = [
      article("observe", quest("nature", 1, [], ["explain"])),
      article("explain", quest("nature", 2, ["observe"], [])),
      article("draft", quest("nature", 3, ["explain"], []), "draft"),
    ];

    expect(buildKnowledgeMap(articles, ["observe"])).toEqual([
      expect.objectContaining({ articleId: "observe", collectionId: "nature", order: 1, state: "completed" }),
      expect.objectContaining({ articleId: "explain", collectionId: "nature", order: 2, state: "recommended" }),
    ]);
  });

  it("finds the linked next quest from the derived map", () => {
    const nodes = buildKnowledgeMap([
      article("observe", quest("nature", 1, [], ["explain"])),
      article("explain", quest("nature", 2, ["observe"], [])),
    ], []);

    expect(nextQuestFromMap(nodes, "observe")).toEqual(expect.objectContaining({ articleId: "explain" }));
  });

  it("orders unlocked branches deterministically while preserving authored next-link order", () => {
    const nodes = buildKnowledgeMap([
      article("source", quest("nature", 1, [], ["branch-b", "branch-a"])),
      article("branch-a", quest("nature", 2, ["source"], [])),
      article("branch-b", quest("nature", 3, ["source"], [])),
    ], ["source"]);

    expect(nodes.map((node) => [node.articleId, node.state])).toEqual([
      ["source", "completed"],
      ["branch-a", "recommended"],
      ["branch-b", "available"],
    ]);
    expect(nextQuestFromMap(nodes, "source")?.articleId).toBe("branch-b");
  });

  it("keeps a published quest locked when completed IDs include only its Studio-draft prerequisite", () => {
    const nodes = buildKnowledgeMap([
      article("draft-prerequisite", quest("nature", 1, [], ["published-follow-up"]), "draft"),
      article("published-follow-up", quest("nature", 2, ["draft-prerequisite"], [])),
    ], ["draft-prerequisite"]);

    expect(nodes).toEqual([
      expect.objectContaining({ articleId: "published-follow-up", state: "locked" }),
    ]);
  });
});
