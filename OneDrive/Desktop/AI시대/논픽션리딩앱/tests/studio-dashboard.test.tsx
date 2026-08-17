import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { StudioDashboard, summarizeStudioArticles } from "@/components/studio/studio-dashboard";
import { makePublishedArticle, makeStudioArticle } from "./studio-fixtures";

function makeReviewArticle(
  title: string,
  workflowStatus: "facts_reviewed" | "language_reviewed" | "age_reviewed" | "approved",
) {
  return makeStudioArticle({ id: title, title, status: "review", workflowStatus });
}

function contentList() {
  return within(screen.getByRole("list", { name: "콘텐츠 목록" }));
}

it("shows workflow totals and filters the content list by title or topic", async () => {
  const user = userEvent.setup();
  render(
    <StudioDashboard
      articles={[
        makeStudioArticle({ title: "Stars", keyConcept: "astronomy" }),
        makePublishedArticle({ id: "tea", title: "Tea", keyConcept: "plants" }),
      ]}
      onCreate={vi.fn()}
      onOpen={vi.fn()}
    />,
  );

  expect(screen.getByText("초안 1")).toBeInTheDocument();
  expect(screen.getByText("발행 완료 1")).toBeInTheDocument();

  await user.type(screen.getByRole("searchbox", { name: "콘텐츠 검색" }), "Tea");

  expect(contentList().queryByText("Stars")).not.toBeInTheDocument();
  expect(contentList().getByText("Tea")).toBeInTheDocument();

  await user.clear(screen.getByRole("searchbox", { name: "콘텐츠 검색" }));
  await user.type(screen.getByRole("searchbox", { name: "콘텐츠 검색" }), "astronomy");

  expect(contentList().getByText("Stars")).toBeInTheDocument();
  expect(contentList().queryByText("Tea")).not.toBeInTheDocument();
});

it("keeps incomplete reviews, approval pending, and publication-ready items in their correct boundaries", () => {
  render(
    <StudioDashboard
      articles={[
        makeStudioArticle({ title: "Draft" }),
        makeReviewArticle("Facts", "facts_reviewed"),
        makeReviewArticle("Language", "language_reviewed"),
        makeReviewArticle("Age one", "age_reviewed"),
        makeReviewArticle("Age two", "age_reviewed"),
        makeReviewArticle("Approved", "approved"),
        makePublishedArticle({ id: "published", title: "Published" }),
      ]}
      onCreate={vi.fn()}
      onOpen={vi.fn()}
    />,
  );

  expect(screen.getByText("초안 1")).toBeInTheDocument();
  expect(screen.getByText("검수 중 2")).toBeInTheDocument();
  expect(screen.getByText("승인 대기 2")).toBeInTheDocument();
  expect(screen.getByText("발행 완료 1")).toBeInTheDocument();
});

it("shows each non-terminal item with its next required action and opens it from the queue", async () => {
  const user = userEvent.setup();
  const onOpen = vi.fn();
  render(
    <StudioDashboard
      articles={[
        makeStudioArticle({ title: "Needs facts" }),
        makeReviewArticle("Needs language", "facts_reviewed"),
        makeReviewArticle("Needs age", "language_reviewed"),
        makeReviewArticle("Needs approval", "age_reviewed"),
        makeReviewArticle("Needs publication", "approved"),
        makePublishedArticle({ id: "published", title: "Published" }),
      ]}
      onCreate={vi.fn()}
      onOpen={onOpen}
    />,
  );

  const queue = screen.getByRole("list", { name: "다음 검수 필요 목록" });
  expect(within(queue).getByText("Needs facts")).toBeInTheDocument();
  expect(within(queue).getByText("사실·출처 검수 필요")).toBeInTheDocument();
  expect(within(queue).getByText("영어·AR 검수 필요")).toBeInTheDocument();
  expect(within(queue).getByText("연령 적합성 검수 필요")).toBeInTheDocument();
  expect(within(queue).getByText("최종 승인 필요")).toBeInTheDocument();
  expect(within(queue).getByText("발행 필요")).toBeInTheDocument();
  expect(within(queue).queryByText("Published")).not.toBeInTheDocument();

  await user.click(within(queue).getByRole("button", { name: "Needs approval 열기" }));
  expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ title: "Needs approval" }));
});

it("filters by status, domain, estimated AR, and recommended age", async () => {
  const user = userEvent.setup();
  render(
    <StudioDashboard
      articles={[
        makeStudioArticle({ title: "Science", domain: "science", difficulty: { value: 420, method: "nonfiction-lab-estimate", label: "NF Lab estimate" }, ageRange: "7-9" }),
        makeReviewArticle("History", "facts_reviewed"),
        makeReviewArticle("Arts", "language_reviewed"),
      ].map((article) => article.title === "History"
        ? { ...article, domain: "history" as const, difficulty: { ...article.difficulty, value: 620 }, ageRange: "10-12" }
        : article.title === "Arts"
          ? { ...article, domain: "arts" as const, difficulty: { ...article.difficulty, value: 750 }, ageRange: "13-15" }
          : article)}
      onCreate={vi.fn()}
      onOpen={vi.fn()}
    />,
  );

  await user.selectOptions(screen.getByLabelText("상태"), "facts_reviewed");
  expect(contentList().getByText("History")).toBeInTheDocument();
  expect(contentList().queryByText("Science")).not.toBeInTheDocument();

  await user.selectOptions(screen.getByLabelText("상태"), "all");
  await user.selectOptions(screen.getByLabelText("분야"), "arts");
  expect(contentList().getByText("Arts")).toBeInTheDocument();
  expect(contentList().queryByText("History")).not.toBeInTheDocument();

  await user.selectOptions(screen.getByLabelText("분야"), "all");
  await user.selectOptions(screen.getByLabelText("논픽션랩 추정 AR"), "700-and-over");
  expect(contentList().getByText("Arts")).toBeInTheDocument();
  expect(contentList().queryByText("Science")).not.toBeInTheDocument();

  await user.selectOptions(screen.getByLabelText("논픽션랩 추정 AR"), "all");
  await user.selectOptions(screen.getByLabelText("권장 연령"), "7-9");
  expect(contentList().getByText("Science")).toBeInTheDocument();
  expect(contentList().queryByText("Arts")).not.toBeInTheDocument();
});

it("sorts the content list by newest update and invokes creation and open callbacks", async () => {
  const user = userEvent.setup();
  const onCreate = vi.fn();
  const onOpen = vi.fn();
  render(
    <StudioDashboard
      articles={[
        makeStudioArticle({ id: "older", title: "Older", updatedAt: "2026-08-16T00:00:00.000Z" }),
        makePublishedArticle({ id: "newer", title: "Newer", updatedAt: "2026-08-18T00:00:00.000Z" }),
      ]}
      onCreate={onCreate}
      onOpen={onOpen}
    />,
  );

  const listItems = within(screen.getByRole("list", { name: "콘텐츠 목록" })).getAllByRole("listitem");
  expect(within(listItems[0]).getByText("Newer")).toBeInTheDocument();
  expect(within(listItems[1]).getByText("Older")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "새 콘텐츠" }));
  await user.click(within(listItems[0]).getByRole("button", { name: "Newer 열기" }));
  expect(onCreate).toHaveBeenCalledTimes(1);
  expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "newer" }));
});

it("summarizes every workflow status for dashboard cards", () => {
  const summary = summarizeStudioArticles([
    makeStudioArticle(),
    makePublishedArticle({ id: "tea" }),
  ]);

  expect(summary).toMatchObject({ draft: 1, published: 1, withdrawn: 0 });
});
