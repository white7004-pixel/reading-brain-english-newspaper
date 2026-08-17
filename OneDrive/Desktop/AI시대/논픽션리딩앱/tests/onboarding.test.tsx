import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Onboarding } from "@/components/onboarding";

it("saves a user-entered AR value as external input", async () => {
  const user = userEvent.setup();
  const onComplete = vi.fn();
  render(<Onboarding onComplete={onComplete} />);

  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "2.4");
  await user.click(screen.getByRole("button", { name: "이 수준으로 시작" }));

  expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ enteredAr: 2.4, estimatedDifficulty: null, onboardingComplete: true }));
});

it("labels a level-test result as a Nonfiction Lab estimate", async () => {
  const user = userEvent.setup();
  const onComplete = vi.fn();
  render(<Onboarding onComplete={onComplete} />);

  await user.click(screen.getByRole("button", { name: "3분 레벨 테스트" }));
  for (let question = 0; question < 6; question++) {
    await user.click(screen.getAllByRole("button", { name: /선택지/ })[0]);
    await user.click(screen.getByRole("button", { name: question === 5 ? "결과 보기" : "다음 문제" }));
  }

  expect(screen.getByText(/논픽션랩 추정 난이도/)).toBeVisible();
  await user.click(screen.getByRole("button", { name: "추천 수준으로 시작" }));
  expect(onComplete.mock.calls[0][0].enteredAr).toBeNull();
  expect(onComplete.mock.calls[0][0].estimatedDifficulty).toBeTypeOf("number");
});

it("starts at the easiest level without a test", async () => {
  const user = userEvent.setup();
  const onComplete = vi.fn();
  render(<Onboarding onComplete={onComplete} />);

  await user.click(screen.getByRole("button", { name: "가장 쉬운 단계부터" }));
  expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ enteredAr: null, estimatedDifficulty: 0.5 }));
});
