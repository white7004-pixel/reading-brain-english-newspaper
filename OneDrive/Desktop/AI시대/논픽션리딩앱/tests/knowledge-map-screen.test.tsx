import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KnowledgeMapScreen } from "@/components/knowledge-map-screen";
import type { KnowledgeMapNode } from "@/lib/knowledge-quest-map";
import { SAMPLE_ARTICLES } from "@/lib/sample-content";

const nodes: KnowledgeMapNode[] = [
  { article: SAMPLE_ARTICLES[0], articleId: "stars-shine", collectionId: "space", order: 1, state: "completed" },
  { article: SAMPLE_ARTICLES[1], articleId: "silk-road", collectionId: "space", order: 2, state: "recommended" },
  { article: SAMPLE_ARTICLES[2], articleId: "great-wave", collectionId: "space", order: 3, state: "locked" },
];

it("presents the map in stable order with text status for every node", () => {
  render(<KnowledgeMapScreen nodes={nodes} onStart={() => {}} />);

  expect(screen.getByRole("heading", { name: "나의 지식지도" })).toBeVisible();
  expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    expect.stringContaining("Why Do Stars Shine?"),
    expect.stringContaining("What Was the Silk Road?"),
    expect.stringContaining("How Did the Great Wave Travel?"),
  ]);
  expect(screen.getByText("완료한 탐험")).toBeVisible();
  expect(screen.getByText("다음 추천 탐험")).toBeVisible();
  expect(screen.getByText("이전 탐험을 완료하면 열려요")).toBeVisible();
  expect(screen.getByRole("button", { name: /How Did the Great Wave Travel.*잠김/ })).toBeDisabled();
});

it("starts an available recommendation without relying on motion", async () => {
  const user = userEvent.setup();
  const onStart = vi.fn();
  render(<KnowledgeMapScreen nodes={nodes} onStart={onStart} />);

  const recommendation = screen.getByRole("button", { name: /다음 추천.*What Was the Silk Road/ });
  expect(recommendation).toBeEnabled();
  await user.click(recommendation);

  expect(onStart).toHaveBeenCalledWith(SAMPLE_ARTICLES[1]);
});

it("explains the empty map when published quests are unavailable", () => {
  render(<KnowledgeMapScreen nodes={[]} onStart={() => {}} />);

  expect(screen.getByText("아직 지식지도를 만들 탐험이 없어요.")).toBeVisible();
});
