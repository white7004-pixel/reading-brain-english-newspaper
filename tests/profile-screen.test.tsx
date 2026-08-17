import { render, screen } from "@testing-library/react";
import { ProfileScreen } from "@/components/profile-screen";
import { createDefaultLearnerState } from "@/lib/learner-store";

it("shows entered AR and app-estimated difficulty as separate values", () => {
  const state = createDefaultLearnerState();
  state.profile.enteredAr = 2.4;
  state.profile.estimatedDifficulty = 2.7;
  render(<ProfileScreen state={state} onReset={() => {}} />);
  expect(screen.getByText("입력한 AR 지수")).toBeVisible();
  expect(screen.getByText("2.4")).toBeVisible();
  expect(screen.getByText("논픽션랩 추정 난이도")).toBeVisible();
  expect(screen.getByText("2.7")).toBeVisible();
});
