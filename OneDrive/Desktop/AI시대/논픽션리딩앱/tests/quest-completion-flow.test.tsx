import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LearnerApp } from "@/components/learner-app";
import { getPublishedArticles } from "@/lib/content";
import { createDefaultLearnerState, loadLearnerState } from "@/lib/learner-store";

beforeEach(() => localStorage.clear());

it("records one enriched attempt and awards the result reward only once", async () => {
  const user = userEvent.setup();
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  const article = getPublishedArticles(localStorage)[0];
  render(<LearnerApp initialState={state} storage={localStorage} />);

  await user.click(screen.getByRole("button", { name: "오늘의 발견 시작하기" }));
  for (let index = 1; index < article.pages.length; index += 1) {
    await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  }
  await user.click(screen.getByRole("button", { name: "이해 퀴즈 시작" }));
  for (let index = 0; index < article.quiz.length; index += 1) {
    await user.click(screen.getByRole("button", { name: article.quiz[index].options[article.quiz[index].correctIndex] }));
    await user.click(screen.getByRole("button", { name: index === article.quiz.length - 1 ? "결과 보기" : "다음 문제" }));
  }

  expect(screen.getByText("+35")).toBeVisible();
  expect(loadLearnerState(localStorage)).toMatchObject({
    activeQuest: null,
    attempts: [expect.objectContaining({
      articleId: article.id,
      xpAwarded: 35,
      domain: article.domain,
      keyFinderCorrect: false,
      keyFinderSelections: [],
    })],
  });
  expect(loadLearnerState(localStorage).attempts).toHaveLength(1);
});
