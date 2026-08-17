import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LearnerApp } from "@/components/learner-app";
import { createDefaultLearnerState, loadLearnerState } from "@/lib/learner-store";
import { getPublishedArticles } from "@/lib/content";

beforeEach(() => localStorage.clear());

it("records one attempt and shows score, XP, streak, and next topic", async () => {
  const user = userEvent.setup();
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  state.profile.estimatedDifficulty = 1.8;
  render(<LearnerApp initialState={state} storage={localStorage} />);

  await user.click(screen.getByRole("button", { name: "오늘의 지식 시작하기" }));
  await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  await user.click(screen.getByRole("button", { name: "이해 퀴즈 시작" }));

  const article = getPublishedArticles()[0];
  for (let index = 0; index < article.quiz.length; index++) {
    const question = article.quiz[index];
    await user.click(screen.getByRole("button", { name: question.options[question.correctIndex] }));
    await user.click(screen.getByRole("button", { name: index === article.quiz.length - 1 ? "결과 보기" : "다음 문제" }));
  }

  expect(screen.getByText("새로운 지식 발견!")).toBeVisible();
  expect(screen.getByText("이해도")).toBeVisible();
  expect(screen.getByText("획득 XP")).toBeVisible();
  expect(screen.getByText("1일")).toBeVisible();
  expect(loadLearnerState(localStorage).attempts).toHaveLength(1);
  expect(loadLearnerState(localStorage).profile.xp).toBe(35);
});
