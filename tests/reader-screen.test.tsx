import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ReaderScreen } from "@/components/reader-screen";
import { getPublishedArticles } from "@/lib/content";

it("opens vocabulary help and completes every reading page", async () => {
  const user = userEvent.setup();
  const onFinish = vi.fn();
  render(<ReaderScreen article={getPublishedArticles()[0]} onFinish={onFinish} onBack={() => {}} onEvent={() => {}} />);

  await user.click(screen.getAllByRole("button", { name: /star 뜻 보기/i })[0]);
  expect(screen.getByRole("dialog", { name: "star" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "단어 설명 닫기" }));
  await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  await user.click(screen.getByRole("button", { name: "이해 퀴즈 시작" }));

  expect(onFinish).toHaveBeenCalledTimes(1);
});

it("keeps reading available when audio cannot play", async () => {
  const user = userEvent.setup();
  render(<ReaderScreen article={getPublishedArticles()[0]} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);
  await user.click(screen.getByRole("button", { name: "원어민 오디오로 듣기" }));
  expect(screen.getByText("오디오는 지금 사용할 수 없어요")).toBeVisible();
  expect(screen.getByText((_, element) => element?.classList.contains("article-copy") === true && element.textContent?.includes("Stars look like tiny lights") === true)).toBeVisible();
});
