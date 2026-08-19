import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExploreScreen } from "@/components/explore-screen";
import { getPublishedArticles } from "@/lib/content";

it("filters reviewed articles by domain and difficulty", async () => {
  const user = userEvent.setup();
  render(<ExploreScreen articles={getPublishedArticles()} onOpen={() => {}} initialDomain={null} />);
  await user.click(screen.getByRole("button", { name: "철학" }));
  await user.selectOptions(screen.getByLabelText("읽기 난이도"), "4-6");
  expect(screen.getAllByTestId("article-card")).toHaveLength(1);
  expect(screen.getByText("What Can We Control?")).toBeVisible();
});

it("offers a reset action when filters have no result", async () => {
  const user = userEvent.setup();
  render(<ExploreScreen articles={getPublishedArticles()} onOpen={() => {}} initialDomain={null} />);
  await user.type(screen.getByLabelText("지식 검색"), "찾을 수 없는 제목");
  expect(screen.getByText("조건에 맞는 지식이 없어요.")).toBeVisible();
  await user.click(screen.getByRole("button", { name: "필터 초기화" }));
  expect(screen.getAllByTestId("article-card").length).toBeGreaterThan(0);
});

it("places the grade roadmap before the existing knowledge library", () => {
  render(<ExploreScreen articles={getPublishedArticles()} onOpen={() => {}} initialDomain={null} />);
  const roadmap = screen.getByRole("heading", { name: "학년별 논픽션 지식" });
  const library = screen.getByRole("heading", { name: "무엇이 궁금한가요?" });
  expect(roadmap.compareDocumentPosition(library) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
