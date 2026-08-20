import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TodayScreen } from "@/components/today-screen";
import { createDefaultLearnerState } from "@/lib/learner-store";
import { getPublishedArticles } from "@/lib/content";
import type { Article } from "@/lib/types";

const questArticle = (): Article => ({
  ...getPublishedArticles()[0],
  id: "today-quest",
  title: "How Owls Fly Quietly",
  heroImage: {
    src: "/article-images/ar1-batch-07/owl-flight.jpg",
    altKo: "날개를 펼쳐 조용히 나는 부엉이",
    sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Owl_flying.jpg",
    title: "Owl flying",
    creator: "Tarvo Kuus",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    isModified: false,
  },
  quest: {
    curiosityQuestionKo: "부엉이는 어떻게 조용히 날까요?",
    knowledgeTakeawayKo: "부드러운 깃털 가장자리가 비행 소리를 줄입니다.",
    collectionId: "living-world",
    mapOrder: 1,
    prerequisiteArticleIds: [],
    nextArticleIds: [],
  },
});

it("starts the daily discovery and reports map completion", async () => {
  const user = userEvent.setup();
  const onStart = vi.fn();
  const onOpenMap = vi.fn();
  const article = questArticle();
  const state = createDefaultLearnerState();

  render(<TodayScreen state={state} articles={[article]} onStart={onStart} onOpenMap={onOpenMap} onExplore={vi.fn()} />);

  await user.click(screen.getByRole("button", { name: "오늘의 발견 시작하기" }));
  expect(onStart).toHaveBeenCalledWith(article);
  expect(screen.getByText("지식 지도 0% 완성")).toBeVisible();
  expect(screen.getByRole("img", { name: "날개를 펼쳐 조용히 나는 부엉이" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "지식 지도 열기" }));
  expect(onOpenMap).toHaveBeenCalledOnce();
});

it("resumes the saved quest instead of replacing it with a new recommendation", async () => {
  const user = userEvent.setup();
  const onStart = vi.fn();
  const article = questArticle();
  const state = createDefaultLearnerState();
  state.activeQuest = { articleId: article.id, phase: "reader", pageIndex: 1 };

  render(<TodayScreen state={state} articles={[article]} onStart={onStart} onOpenMap={vi.fn()} onExplore={vi.fn()} />);

  await user.click(screen.getByRole("button", { name: "이어서 읽기" }));
  expect(onStart).toHaveBeenCalledWith(article);
});

it("offers exploration when no published learner article is available", async () => {
  const user = userEvent.setup();
  const onExplore = vi.fn();

  render(<TodayScreen state={createDefaultLearnerState()} articles={[]} onStart={vi.fn()} onOpenMap={vi.fn()} onExplore={onExplore} />);

  expect(screen.getByText("오늘의 발견을 준비하고 있어요")).toBeVisible();
  await user.click(screen.getByRole("button", { name: "탐색으로 이동" }));
  expect(onExplore).toHaveBeenCalledOnce();
});
