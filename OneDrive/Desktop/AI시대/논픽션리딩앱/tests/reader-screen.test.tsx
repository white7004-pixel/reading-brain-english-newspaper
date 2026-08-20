import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ReaderScreen } from "@/components/reader-screen";
import { getPublishedArticles } from "@/lib/content";
import type { Article } from "@/lib/types";
import { AR1_BATCH_07_IMAGES } from "@/lib/library/ar1-07-images";

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

it("shows the article photo and full credit in the reader", () => {
  const article = { ...getPublishedArticles()[0], heroImage: AR1_BATCH_07_IMAGES["ar1-owl-flight"] };

  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);

  expect(screen.getByRole("img", { name: "날개를 펼쳐 날고 있는 올빼미" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Tarvo Kuus" })).toBeVisible();
  expect(screen.getByRole("link", { name: "CC BY-SA 4.0" })).toBeVisible();
});

it("keeps reading available when audio cannot play", async () => {
  const user = userEvent.setup();
  render(<ReaderScreen article={getPublishedArticles()[0]} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);
  await user.click(screen.getByRole("button", { name: "원어민 오디오로 듣기" }));
  expect(screen.getByText("오디오는 지금 사용할 수 없어요")).toBeVisible();
  expect(screen.getByText((_, element) => element?.classList.contains("article-copy") === true && element.textContent?.includes("Stars look like tiny lights") === true)).toBeVisible();
});

it("ignores empty and whitespace-only vocabulary drafts while rendering preview text", () => {
  const article = {
    ...getPublishedArticles()[0],
    pages: ["Plain preview text remains intact."],
    vocabulary: [
      { word: "", pronunciation: "", meaningKo: "", definitionEn: "" },
      { word: "   ", pronunciation: "", meaningKo: "", definitionEn: "" },
    ],
  };

  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);

  expect(screen.getByText("Plain preview text remains intact.")).toBeVisible();
  expect(screen.queryByRole("button", { name: /뜻 보기/ })).not.toBeInTheDocument();
});

it("renders safe tagged image and official video media", () => {
  const article = {
    ...getPublishedArticles()[0],
    media: [
      { kind: "image", url: "https://images.example.org/stars.jpg", alt: "Stars in the night sky" },
      { kind: "video", provider: "youtube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "How stars shine" },
    ],
  } as Article;

  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);

  expect(screen.getByRole("img", { name: "Stars in the night sky" })).toHaveAttribute("src", "https://images.example.org/stars.jpg");
  expect(screen.getByTitle("How stars shine")).toHaveAttribute("src", "https://www.youtube.com/embed/dQw4w9WgXcQ");
});

it("lets the learner choose core words and a key sentence before checking locally", async () => {
  const user = userEvent.setup();
  const article = getPublishedArticles()[0];
  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);

  await user.click(screen.getByRole("button", { name: "핵심 찾기" }));
  await user.click(screen.getAllByRole("button", { name: /핵심단어로 선택/ })[0]);
  await user.click(screen.getByRole("button", { name: `${article.keySentence} 핵심문장으로 선택` }));
  await user.click(screen.getByRole("button", { name: "정답 확인" }));

  expect(screen.getByText("핵심문장을 찾았어요!")).toBeVisible();
  expect(screen.getByText(/핵심단어 정답/)).toBeVisible();
});
