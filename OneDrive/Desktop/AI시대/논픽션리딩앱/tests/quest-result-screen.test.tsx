import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestResultScreen } from "@/components/quest-result-screen";
import { getPublishedArticles } from "@/lib/content";
import { createDefaultLearnerState } from "@/lib/learner-store";

it("shows one map action with the collected knowledge, reward, and accuracy", async () => {
  const user = userEvent.setup();
  const onOpenMap = vi.fn();
  const article = {
    ...getPublishedArticles()[0],
    quest: {
      curiosityQuestionKo: "별은 왜 빛날까요?",
      knowledgeTakeawayKo: "별은 아주 뜨거운 기체가 에너지를 내며 빛나는 천체입니다.",
      collectionId: "science-stars",
      mapOrder: 1,
      prerequisiteArticleIds: [],
      nextArticleIds: [],
    },
  };
  const state = createDefaultLearnerState();
  state.profile.streak = 3;

  const { container } = render(
    <QuestResultScreen
      article={article}
      reward={{ xp: 40, accuracyPercent: 100, masteryLabelKo: "핵심을 정확히 찾았어요" }}
      state={state}
      onOpenMap={onOpenMap}
      onHome={() => {}}
    />,
  );

  expect(screen.getByText(article.quest.knowledgeTakeawayKo)).toBeVisible();
  expect(screen.getByText("+40")).toBeVisible();
  expect(screen.getByText("정답률 100%")).toBeVisible();
  expect(screen.getByText("핵심을 정확히 찾았어요")).toBeVisible();
  expect(screen.getByRole("heading", { name: "오늘의 지식 카드" })).toBeVisible();
  expect(screen.getByRole("button", { name: "지식 지도에서 확인" })).toBeVisible();
  expect(container.querySelectorAll(".button--primary")).toHaveLength(1);

  await user.click(screen.getByRole("button", { name: "지식 지도에서 확인" }));
  expect(onOpenMap).toHaveBeenCalledTimes(1);
});

it("keeps a meaningful completion message for legacy articles without quest metadata", () => {
  const article = { ...getPublishedArticles()[0], quest: undefined };

  render(
    <QuestResultScreen
      article={article}
      reward={{ xp: 25, accuracyPercent: 25, masteryLabelKo: "다음 퀘스트에서 다시 도전해요" }}
      state={createDefaultLearnerState()}
      onOpenMap={() => {}}
      onHome={() => {}}
    />,
  );

  expect(screen.getByText(`${article.titleKo}에서 읽은 내용을 내 지식에 더했어요.`)).toBeVisible();
});
