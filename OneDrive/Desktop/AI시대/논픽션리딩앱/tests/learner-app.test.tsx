import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LearnerApp } from "@/components/learner-app";
import { createDefaultLearnerState } from "@/lib/learner-store";

beforeEach(() => localStorage.clear());

it("uses Today as the default destination and keeps the four learner destinations available", async () => {
  const user = userEvent.setup();
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;

  render(<LearnerApp initialState={state} storage={localStorage} />);

  expect(screen.getByRole("button", { name: "오늘" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("button", { name: "오늘의 발견 시작하기" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "지식지도" }));
  expect(screen.getByRole("heading", { name: "지식지도" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "탐험" }));
  expect(screen.getByRole("button", { name: "탐험" })).toHaveAttribute("aria-current", "page");
  await user.click(screen.getByRole("button", { name: "나" }));
  expect(screen.getByRole("button", { name: "나" })).toHaveAttribute("aria-current", "page");
});
