import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LevelCheck } from "@/components/level-check";
import { PLACEMENT_QUESTIONS } from "@/lib/placement-test";

it("returns only the directly entered AR value", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<LevelCheck onSubmit={onSubmit} onCancel={vi.fn()} />);

  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "3.4");
  await user.click(screen.getByRole("button", { name: "이 수준으로 시작" }));

  expect(onSubmit).toHaveBeenCalledWith({ enteredAr: 3.4, estimatedDifficulty: null });
});

it("returns only the estimate after the level test", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<LevelCheck onSubmit={onSubmit} onCancel={vi.fn()} />);

  await user.click(screen.getByRole("button", { name: "3분 레벨 테스트" }));
  for (const question of PLACEMENT_QUESTIONS) {
    await user.click(screen.getByRole("button", { name: `선택지 ${question.correct + 1}: ${question.options[question.correct]}` }));
    await user.click(screen.getByRole("button", { name: /다음 문제|결과 보기/ }));
  }
  await user.click(screen.getByRole("button", { name: "추천 수준으로 시작" }));

  expect(onSubmit).toHaveBeenCalledWith({
    enteredAr: null,
    estimatedDifficulty: PLACEMENT_QUESTIONS[PLACEMENT_QUESTIONS.length - 1].level,
  });
});

it("blocks an AR value outside the supported range", async () => {
  const user = userEvent.setup();
  render(<LevelCheck onSubmit={vi.fn()} onCancel={vi.fn()} />);

  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "25");

  expect(screen.getByRole("button", { name: "이 수준으로 시작" })).toBeDisabled();
});

it("reports nothing when the learner backs out", async () => {
  const user = userEvent.setup();
  const onCancel = vi.fn();
  const onSubmit = vi.fn();
  render(<LevelCheck onSubmit={onSubmit} onCancel={onCancel} />);

  await user.click(screen.getByRole("button", { name: "돌아가기" }));

  expect(onCancel).toHaveBeenCalled();
  expect(onSubmit).not.toHaveBeenCalled();
});
