import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExploreScreen, filterArticles } from "@/components/explore-screen";
import { getPublishedArticles } from "@/lib/content";
import { AR1_BATCH_07_IMAGES } from "@/lib/library/ar1-07-images";
import type { Article } from "@/lib/types";

const collectionQuest = (): Article => ({
  ...getPublishedArticles()[0],
  id: "quest-owl",
  title: "Owl collection quest",
  status: "published",
  difficulty: { value: 1.8, method: "nonfiction-lab-estimate", label: "AR 1.8" },
  quest: {
    curiosityQuestionKo: "부엉이는 어떻게 조용히 날까요?",
    knowledgeTakeawayKo: "부드러운 깃털이 소리를 줄입니다.",
    collectionId: "living-world",
    mapOrder: 1,
    prerequisiteArticleIds: [],
    nextArticleIds: [],
  },
});

it("filters reviewed articles by domain and difficulty", async () => {
  const user = userEvent.setup();
  render(<ExploreScreen articles={getPublishedArticles()} onOpen={() => {}} initialDomain={null} />);
  await user.click(screen.getByRole("button", { name: "철학" }));
  await user.selectOptions(screen.getByLabelText("읽기 난이도"), "4-6");
  expect(screen.getAllByTestId("article-card")).toHaveLength(1);
  expect(screen.getByText("What Can We Control?")).toBeVisible();
});

it("uses an article photo in the library thumbnail", () => {
  const article = { ...getPublishedArticles()[0], heroImage: AR1_BATCH_07_IMAGES["ar1-owl-flight"] };

  render(<ExploreScreen articles={[article]} onOpen={() => {}} initialDomain={null} />);

  expect(screen.getByRole("img", { name: "날개를 펼쳐 날고 있는 올빼미" })).toBeVisible();
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

it("combines query, domain, AR range, and collection filters for published quests", () => {
  const quest = collectionQuest();
  const anotherCollection = { ...quest, id: "other-owl", quest: { ...quest.quest!, collectionId: "earth-and-sky" } };
  const draft = { ...quest, id: "draft-owl", status: "draft" as const };

  expect(filterArticles([quest, anotherCollection, draft], "owl", "science", "0-2", "living-world")).toEqual([quest]);
});

it("keeps published articles without quest metadata under the legacy library", () => {
  const quest = collectionQuest();
  const legacy = { ...getPublishedArticles()[1], id: "legacy-library", status: "published" as const };

  render(<ExploreScreen articles={[quest, legacy]} onOpen={() => {}} initialDomain={null} />);

  expect(screen.getByRole("heading", { name: "지식 퀘스트" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "기존 라이브러리" })).toBeVisible();
  expect(screen.getByText(legacy.title)).toBeVisible();
});

it("only offers reading-time options represented by published articles", () => {
  render(<ExploreScreen articles={getPublishedArticles()} onOpen={() => {}} initialDomain={null} />);

  expect(screen.getByRole("option", { name: "3분 이하" })).toBeVisible();
  expect(screen.queryByRole("option", { name: "4–5분" })).not.toBeInTheDocument();
  expect(screen.queryByRole("option", { name: "6분 이상" })).not.toBeInTheDocument();
});
