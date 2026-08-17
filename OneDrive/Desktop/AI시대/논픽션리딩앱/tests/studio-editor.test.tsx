import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleEditor } from "@/components/studio/article-editor";
import { ReviewPanel } from "@/components/studio/review-panel";
import { StudioApp } from "@/components/studio/studio-app";
import { StudioPreview } from "@/components/studio/studio-preview";
import { completeStage } from "@/lib/studio-workflow";
import type { StudioArticle } from "@/lib/studio-types";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "./studio-fixtures";

const NOW = "2026-08-18T09:00:00.000Z";

function makeFullyReviewedArticle(): StudioArticle {
  const facts = completeStage(makeStudioArticle(), "facts", "fact-checker", "2026-08-18T06:00:00.000Z");
  const language = completeStage(facts, "language", "language-reviewer", "2026-08-18T07:00:00.000Z");
  return completeStage(language, "age", "age-reviewer", "2026-08-18T08:00:00.000Z");
}

function StudioEditorHarness({ initialArticle }: { initialArticle: StudioArticle }) {
  const [article, setArticle] = useState(initialArticle);

  return (
    <>
      <ArticleEditor article={article} onArticleChange={setArticle} now={() => NOW} />
      <ReviewPanel article={article} onArticleChange={setArticle} actor="reviewer-1" now={() => NOW} />
    </>
  );
}

test("누락된 출처를 표시하고 사실 검수 완료를 막는다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ sources: [] })} />);

  await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));

  expect(screen.getByText("출처를 한 개 이상 추가해 주세요.")).toBeInTheDocument();
  expect(screen.queryByText("사실·출처 검수 완료됨")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "출처·미디어로 이동" })).toHaveAttribute("href", "#sources-media");
});

test("모든 단계를 완료한 뒤에만 승인과 발행이 활성화된다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeFullyReviewedArticle()} />);

  const approve = screen.getByRole("button", { name: "최종 승인" });
  expect(approve).toBeEnabled();
  expect(screen.getByRole("button", { name: "발행" })).toBeDisabled();

  await user.click(approve);

  expect(screen.getByRole("button", { name: "발행" })).toBeEnabled();
});

test("필드와 배열 항목을 수정할 때 작업 버전을 갱신하고 저장 상태를 표시한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makePublishedArticle()} />);

  const title = screen.getByRole("textbox", { name: "영문 제목" });
  await user.clear(title);
  await user.type(title, "A New Rainforest");
  await user.click(screen.getByRole("button", { name: "본문 페이지 추가" }));

  expect(title).toHaveValue("A New Rainforest");
  expect(screen.getByText("저장됨")).toBeInTheDocument();
  expect(screen.getByText("작업 버전 2")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox", { name: /본문 페이지 \d+/ })).toHaveLength(4);
});

test("발행 취소 전에 확인을 요구한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makePublishedArticle()} />);

  await user.click(screen.getByRole("button", { name: "발행 취소" }));

  const confirmation = screen.getByRole("group", { name: "발행 취소 확인" });
  expect(within(confirmation).getByText("학습자 목록에서 이 콘텐츠를 내릴까요?")).toBeInTheDocument();
  await user.click(within(confirmation).getByRole("button", { name: "취소 유지" }));
  expect(screen.queryByRole("group", { name: "발행 취소 확인" })).not.toBeInTheDocument();
});

test("작업 버전을 실제 리더로 미리 보고 리더 동작을 편집 상태와 분리한다", async () => {
  const user = userEvent.setup();
  const article = makeStudioArticle({
    title: "Working Copy",
    pages: ["First working page.", "Second working page."],
    vocabulary: [],
  });
  const frozenArticle = structuredClone(article);

  render(<StudioPreview article={article} />);

  expect(screen.getByRole("heading", { name: "Working Copy" })).toBeInTheDocument();
  expect(screen.getByText("First working page.")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  expect(screen.getByText("Second working page.")).toBeInTheDocument();
  expect(article).toEqual(frozenArticle);
});

test("대시보드의 열기와 새 콘텐츠 콜백을 편집기로 연결하고 변경을 저장한다", async () => {
  const user = userEvent.setup();
  const initialArticle = makeStudioArticle({ title: "Open me" });
  const storage = createMemoryStorage({
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 1, articles: [initialArticle] }),
  });

  render(<StudioApp storage={storage} />);

  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Open me 열기" }));
  expect(screen.getByRole("heading", { name: "Open me 편집" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "목록으로" }));
  await user.click(screen.getByRole("button", { name: "새 콘텐츠" }));
  expect(screen.getByRole("heading", { name: "새 콘텐츠 편집" })).toBeInTheDocument();

  const saved = JSON.parse(storage.getItem("nonfiction-lab:studio:v1") ?? "null") as { articles: StudioArticle[] };
  expect(saved.articles).toHaveLength(2);
});
