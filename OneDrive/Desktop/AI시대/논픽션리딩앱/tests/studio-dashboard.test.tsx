import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { StudioDashboard, summarizeStudioArticles } from "@/components/studio/studio-dashboard";
import { makePublishedArticle, makeStudioArticle } from "./studio-fixtures";

it("shows workflow totals and filters the content list by title", async () => {
  const user = userEvent.setup();
  render(
    <StudioDashboard
      articles={[makeStudioArticle({ title: "Stars" }), makePublishedArticle({ id: "tea", title: "Tea" })]}
      onCreate={vi.fn()}
      onOpen={vi.fn()}
    />,
  );

  expect(screen.getByText("초안 1")).toBeInTheDocument();
  expect(screen.getByText("발행 완료 1")).toBeInTheDocument();

  await user.type(screen.getByRole("searchbox", { name: "콘텐츠 검색" }), "Tea");

  expect(screen.queryByText("Stars")).not.toBeInTheDocument();
  expect(screen.getByText("Tea")).toBeInTheDocument();
});

it("summarizes every workflow status for dashboard cards", () => {
  const summary = summarizeStudioArticles([
    makeStudioArticle(),
    makePublishedArticle({ id: "tea" }),
  ]);

  expect(summary).toMatchObject({ draft: 1, published: 1, withdrawn: 0 });
});
