import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { HomeScreen } from "@/components/home-screen";
import { getPublishedArticles } from "@/lib/content";
import { createDefaultLearnerState } from "@/lib/learner-store";
import { AR1_BATCH_07_IMAGES } from "@/lib/library/ar1-07-images";

it("presents one clear daily lesson action and learner metrics", () => {
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  state.profile.estimatedDifficulty = 1.8;
  render(<HomeScreen state={state} articles={getPublishedArticles()} onStart={vi.fn()} onExplore={vi.fn()} />);
  expect(screen.getByRole("button", { name: "오늘의 발견 시작하기" })).toBeVisible();
  expect(screen.getByText("AR 1.8")).toBeVisible();
  expect(screen.getByText("지식 지도 0% 완성")).toBeVisible();
});

it("shows the daily article photo when the article has one", () => {
  const state = createDefaultLearnerState();
  const article = { ...getPublishedArticles()[0], heroImage: AR1_BATCH_07_IMAGES["ar1-owl-flight"] };

  render(<HomeScreen state={state} articles={[article]} onStart={vi.fn()} onExplore={vi.fn()} />);

  expect(screen.getByRole("img", { name: "날개를 펼쳐 날고 있는 올빼미" })).toBeVisible();
});
