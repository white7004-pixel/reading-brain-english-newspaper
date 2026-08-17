import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { HomeScreen } from "@/components/home-screen";
import { getPublishedArticles } from "@/lib/content";
import { createDefaultLearnerState } from "@/lib/learner-store";

it("presents one clear daily lesson action and learner metrics", () => {
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  state.profile.estimatedDifficulty = 1.8;
  render(<HomeScreen state={state} articles={getPublishedArticles()} onStart={vi.fn()} onExplore={vi.fn()} />);
  expect(screen.getByRole("button", { name: "오늘의 지식 시작하기" })).toBeVisible();
  expect(screen.getByText("논픽션랩 추정 난이도 1.8")).toBeVisible();
  expect(screen.getByText(/관심 분야 탐험/)).toBeVisible();
});
