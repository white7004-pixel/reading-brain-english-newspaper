import { render, screen } from "@testing-library/react";
import { CompletionScreen } from "@/components/completion-screen";
import { createDefaultLearnerState } from "@/lib/learner-store";
import { getPublishedArticles } from "@/lib/content";

it("hides the continuation action when no valid next article is resolved", () => {
  const article = { ...getPublishedArticles()[0], connectedArticleId: undefined };

  render(
    <CompletionScreen
      article={article}
      result={{ correct: 1, total: 1, answers: [0] }}
      state={createDefaultLearnerState()}
      onHome={() => {}}
    />,
  );

  expect(screen.queryByRole("button", { name: "다음 지식 탐험하기" })).not.toBeInTheDocument();
  expect(screen.queryByText("지식 연결 추천")).not.toBeInTheDocument();
});
