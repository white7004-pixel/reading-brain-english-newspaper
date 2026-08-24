import { act, render, screen } from "@testing-library/react";
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

it("remounts at the saved page and reports a new page", async () => {
  const user = userEvent.setup();
  const onPageChange = vi.fn();
  const article = getPublishedArticles()[0];
  render(<ReaderScreen article={article} initialPageIndex={1} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} onPageChange={onPageChange} />);

  expect(screen.getByText(`2 / ${article.pages.length}`)).toBeVisible();
  await user.click(screen.getByRole("button", { name: "\uB2E4\uC74C \uD398\uC774\uC9C0" }));

  expect(onPageChange).toHaveBeenCalledWith(2);
});

it("shows the article photo and full credit in the reader", () => {
  const article = { ...getPublishedArticles()[0], heroImage: AR1_BATCH_07_IMAGES["ar1-owl-flight"] };

  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);

  expect(screen.getByRole("img", { name: "날개를 펼쳐 날고 있는 올빼미" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Tarvo Kuus" })).toBeVisible();
  expect(screen.getByRole("link", { name: "CC BY-SA 4.0" })).toBeVisible();
});

it("reads the current page with an English browser voice when no recorded audio exists", async () => {
  const user = userEvent.setup();
  const article = { ...getPublishedArticles()[0], id: "article-without-native-audio" };
  const speak = vi.fn();
  const cancel = vi.fn();
  vi.stubGlobal("SpeechSynthesisUtterance", class {
    text: string;
    lang = "";
    rate = 1;
    voice?: SpeechSynthesisVoice;
    constructor(text: string) { this.text = text; }
  });
  vi.stubGlobal("speechSynthesis", {
    cancel,
    speak,
    getVoices: () => [
      { lang: "ko-KR", name: "Microsoft Heami" },
      { lang: "en-GB", name: "Microsoft Hazel" },
      { lang: "en-US", name: "Microsoft Aria Online (Natural)" },
    ],
  });

  render(<ReaderScreen article={article} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);
  await user.click(screen.getByRole("button", { name: "원어민 오디오로 듣기" }));
  expect(cancel).toHaveBeenCalledTimes(1);
  expect(speak).toHaveBeenCalledTimes(1);
  const utterance = speak.mock.calls[0][0];
  expect(utterance).toMatchObject({ text: article.pages[0], lang: "en-US", rate: 0.9 });
  expect(utterance.voice?.name).toBe("Microsoft Aria Online (Natural)");
  act(() => utterance.onboundary?.({ name: "word", charIndex: 6 }));
  expect(screen.getByText("look", { selector: "mark.audio-follow-highlight" })).toBeVisible();
  act(() => utterance.onend?.());
  expect(screen.queryByText("look", { selector: "mark.audio-follow-highlight" })).not.toBeInTheDocument();
  expect(screen.queryByText("오디오는 지금 사용할 수 없어요")).not.toBeInTheDocument();
  vi.unstubAllGlobals();
});

it("previews the English passage as three Korean summary lines", () => {
  render(<ReaderScreen article={getPublishedArticles()[0]} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);

  expect(screen.getByRole("heading", { name: "한글로 먼저 이해하기" })).toBeVisible();
  expect(screen.getByText("별은 거대한 뜨거운 가스 덩어리이며, 멀리 있어서 작은 빛처럼 보입니다.")).toBeVisible();
  expect(screen.getByText("별의 중심에서는 핵융합이 일어나 빛과 열에너지를 만듭니다.")).toBeVisible();
  expect(screen.getByText("별빛은 아주 먼 우주를 여행하므로 우리는 별의 오래전 모습을 보게 됩니다.")).toBeVisible();
});

it("plays the page-specific native Neural recording when it is available", async () => {
  const user = userEvent.setup();
  const play = vi.fn().mockResolvedValue(undefined);
  const listeners: Record<string, () => void> = {};
  const AudioMock = vi.fn(function (this: { play: typeof play; currentTime: number; duration: number; addEventListener: (name: string, listener: () => void) => void }, src: string) {
    this.play = play;
    this.currentTime = 10.5;
    this.duration = 100;
    this.addEventListener = (name, listener) => { listeners[name] = listener; };
    expect(src).toBe("/audio/native/stars-shine-page-1.mp3");
  });
  vi.stubGlobal("Audio", AudioMock);
  const fetchTimings = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ startMs: 10000, endMs: 12000, charIndex: 6, length: 4 }],
  });
  vi.stubGlobal("fetch", fetchTimings);

  render(<ReaderScreen article={getPublishedArticles()[0]} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);
  await user.click(screen.getByRole("button", { name: "원어민 오디오로 듣기" }));

  expect(AudioMock).toHaveBeenCalledTimes(1);
  expect(play).toHaveBeenCalledTimes(1);
  await act(async () => { await Promise.resolve(); });
  expect(fetchTimings).toHaveBeenCalledWith("/audio/native/stars-shine-page-1.json");
  act(() => listeners.timeupdate?.());
  expect(screen.getByText("look", { selector: "mark.audio-follow-highlight" })).toBeVisible();
  act(() => listeners.ended?.());
  expect(document.querySelector("mark.audio-follow-highlight, .word-button.is-audio-current")).toBeFalsy();
  vi.unstubAllGlobals();
});

it("stops the native recording and clears the follow highlight", async () => {
  const user = userEvent.setup();
  const play = vi.fn().mockResolvedValue(undefined);
  const pause = vi.fn();
  const AudioMock = vi.fn(function (this: { play: typeof play; pause: typeof pause; currentTime: number; duration: number; addEventListener: () => void }) {
    this.play = play;
    this.pause = pause;
    this.currentTime = 12;
    this.duration = 100;
    this.addEventListener = () => {};
  });
  vi.stubGlobal("Audio", AudioMock);

  render(<ReaderScreen article={getPublishedArticles()[0]} onFinish={() => {}} onBack={() => {}} onEvent={() => {}} />);
  await user.click(screen.getByRole("button", { name: "원어민 오디오로 듣기" }));
  await user.click(screen.getByRole("button", { name: "오디오 정지" }));

  expect(pause).toHaveBeenCalledTimes(1);
  expect(AudioMock.mock.instances[0].currentTime).toBe(0);
  expect(screen.getByRole("button", { name: "원어민 오디오로 듣기" })).toBeVisible();
  vi.unstubAllGlobals();
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
