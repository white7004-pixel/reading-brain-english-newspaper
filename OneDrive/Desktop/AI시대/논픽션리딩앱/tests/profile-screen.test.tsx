import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileScreen } from "@/components/profile-screen";
import { createDefaultLearnerState } from "@/lib/learner-store";

it("shows entered AR and app-estimated difficulty as separate values", () => {
  const state = createDefaultLearnerState();
  state.profile.enteredAr = 2.4;
  state.profile.estimatedDifficulty = 2.7;
  render(<ProfileScreen state={state} onReset={() => {}} onLevelChange={() => {}} />);
  expect(screen.getByText("입력한 AR 지수")).toBeVisible();
  expect(screen.getByText("2.4")).toBeVisible();
  expect(screen.getByText("논픽션랩 추정 난이도")).toBeVisible();
  expect(screen.getByText("2.7")).toBeVisible();
});

it("lets the learner pick an AR value again without losing progress", async () => {
  const user = userEvent.setup();
  const onLevelChange = vi.fn();
  const state = createDefaultLearnerState();
  state.profile.estimatedDifficulty = 2.3;
  state.completedArticleIds = ["stars-shine"];
  render(<ProfileScreen state={state} onReset={() => {}} onLevelChange={onLevelChange} />);

  await user.click(screen.getByRole("button", { name: "레벨 다시 확인하기" }));
  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "3.4");
  await user.click(screen.getByRole("button", { name: "이 수준으로 시작" }));

  expect(onLevelChange).toHaveBeenCalledWith({ enteredAr: 3.4, estimatedDifficulty: null });
  expect(screen.getByText("완료한 지식")).toBeVisible();
  expect(screen.getByText("1개")).toBeVisible();
});

it("returns to the profile when the level check is cancelled", async () => {
  const user = userEvent.setup();
  const onLevelChange = vi.fn();
  render(<ProfileScreen state={createDefaultLearnerState()} onReset={() => {}} onLevelChange={onLevelChange} />);

  await user.click(screen.getByRole("button", { name: "레벨 다시 확인하기" }));
  await user.click(screen.getByRole("button", { name: "돌아가기" }));

  expect(screen.getByText("나의 읽기 수준")).toBeVisible();
  expect(onLevelChange).not.toHaveBeenCalled();
});
