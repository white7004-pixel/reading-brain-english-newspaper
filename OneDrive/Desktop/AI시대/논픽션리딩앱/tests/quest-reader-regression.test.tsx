import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReaderScreen } from "@/components/reader-screen";
import { getPublishedArticles } from "@/lib/content";

it("reports a correct key finder check without blocking the reader", async () => {
  const user = userEvent.setup();
  const article = getPublishedArticles()[0];
  const events: Array<{ type: string; detail?: string }> = [];
  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={(event) => events.push(event)} />);

  await user.click(screen.getByRole("button", { name: "핵심 찾기" }));
  await user.click(screen.getAllByRole("button", { name: /핵심단어로 선택/ })[0]);
  await user.click(screen.getByRole("button", { name: `${article.keySentence} 핵심문장으로 선택` }));
  await user.click(screen.getByRole("button", { name: "정답 확인" }));

  expect(events).toContainEqual(expect.objectContaining({
    type: "key_finder_check",
    detail: "correct",
    keyFinderSelections: [article.vocabulary[0].word],
  }));
  expect(screen.getByText((_, element) => element?.classList.contains("article-copy") === true && element.textContent?.includes("Stars look like tiny lights") === true)).toBeVisible();
});
