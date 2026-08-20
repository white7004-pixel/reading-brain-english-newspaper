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

  await user.click(screen.getByRole("button", { name: "오늘의 발견 시작하기" }));
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
  expect(loadLearnerState(localStorage).attempts[0]).toMatchObject({
    articleTitle: article.title,
    articleVersion: article.version,
  });
  expect(loadLearnerState(localStorage).profile.xp).toBe(35);
  expect(loadLearnerState(localStorage).activeQuest).toBeNull();

  const continuation = getPublishedArticles().find((candidate) => candidate.id === article.connectedArticleId);
  expect(continuation).toBeDefined();
  await user.click(screen.getByRole("button", { name: "다음 지식 탐험하기" }));
  expect(screen.getByRole("heading", { name: continuation?.title })).toBeVisible();
});

it("persists reader and quiz progress across a remount, then clears it on exit", async () => {
  const user = userEvent.setup();
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  const article = getPublishedArticles()[0];
  const view = render(<LearnerApp initialState={state} storage={localStorage} />);

  await user.click(screen.getByRole("button", { name: "오늘의 발견 시작하기" }));
  await user.click(screen.getByRole("button", { name: "\uB2E4\uC74C \uD398\uC774\uC9C0" }));
  expect(loadLearnerState(localStorage).activeQuest).toEqual({ articleId: article.id, phase: "reader", pageIndex: 1 });

  view.unmount();
  const resumedView = render(<LearnerApp initialState={loadLearnerState(localStorage)} storage={localStorage} />);
  expect(screen.getByText(`2 / ${article.pages.length}`)).toBeVisible();

  await user.click(screen.getByRole("button", { name: "\uB2E4\uC74C \uD398\uC774\uC9C0" }));
  await user.click(screen.getByRole("button", { name: /\uD034\uC988/ }));
  expect(loadLearnerState(localStorage).activeQuest).toEqual({ articleId: article.id, phase: "quiz", pageIndex: 2 });

  resumedView.unmount();
  render(<LearnerApp initialState={loadLearnerState(localStorage)} storage={localStorage} />);
  expect(screen.getByText("QUIZ")).toBeVisible();

  await user.click(screen.getByRole("button", { name: "\uD034\uC988 \uC885\uB8CC" }));
  expect(loadLearnerState(localStorage).activeQuest).toBeNull();
});

it("keeps an unfinished quest focused without persistent navigation", async () => {
  const user = userEvent.setup();
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  const article = getPublishedArticles()[0];
  render(<LearnerApp initialState={state} storage={localStorage} />);

  await user.click(screen.getByRole("button", { name: "오늘의 발견 시작하기" }));
  await user.click(screen.getByRole("button", { name: "\uB2E4\uC74C \uD398\uC774\uC9C0" }));

  expect(loadLearnerState(localStorage).activeQuest).toEqual({ articleId: article.id, phase: "reader", pageIndex: 1 });
  expect(screen.getByText(`2 / ${article.pages.length}`)).toBeVisible();
  expect(screen.queryByRole("navigation", { name: "주요 메뉴" })).not.toBeInTheDocument();
});
