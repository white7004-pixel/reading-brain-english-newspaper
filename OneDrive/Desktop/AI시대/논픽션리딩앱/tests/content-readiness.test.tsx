import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleEditor } from "@/components/studio/article-editor";
import { ContentReadiness } from "@/components/studio/content-readiness";
import { projectWorkingArticle } from "@/components/studio/studio-preview";
import { makeStudioArticle } from "@/tests/studio-fixtures";

it("shows all eight readiness checks and links missing work to its editor field", () => {
  const article = makeStudioArticle();

  render(<ContentReadiness article={projectWorkingArticle(article)} />);

  expect(screen.getAllByTestId("readiness-check")).toHaveLength(8);
  expect(screen.getByText("사진·출처 정보")).toBeVisible();
  expect(screen.getByRole("link", { name: "사진·출처 정보 수정" })).toHaveAttribute("href", "#studio-field-heroImage");
  expect(screen.getByText(/0\/8|1\/8|2\/8|3\/8|4\/8|5\/8|6\/8|7\/8|8\/8/)).toBeVisible();
});

it("announces a ready quest while retaining field links for review", () => {
  const article = makeStudioArticle({
    heroImage: {
      src: "/article-images/ar1-batch-07/owl-flight.jpg",
      altKo: "소리 없이 나는 올빼미",
      title: "Owl in flight",
      creator: "Example Author",
      sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Owl.jpg",
      licenseName: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      isModified: false,
    },
    quest: {
      curiosityQuestionKo: "올빼미는 어떻게 조용히 날까요?",
      knowledgeTakeawayKo: "깃털 가장자리가 비행 소리를 줄여요.",
      collectionId: "living-world",
      mapOrder: 1,
      prerequisiteArticleIds: [],
      nextArticleIds: [],
    },
    quiz: [
      ...makeStudioArticle().quiz,
      { id: "q2", type: "comprehension", prompt: "What helps?", options: ["Feathers", "Rain"], correctIndex: 0, explanation: "Feathers help.", evidence: "feathers" },
      { id: "q3", type: "inference", prompt: "Why quiet?", options: ["To hunt", "To sing"], correctIndex: 0, explanation: "Quiet flight helps hunting.", evidence: "quiet" },
      { id: "q4", type: "vocabulary", prompt: "What is flight?", options: ["Moving through air", "Sleeping"], correctIndex: 0, explanation: "Flight means moving through air.", evidence: "flight" },
    ],
    sources: [
      ...makeStudioArticle().sources,
      { title: "Owls", publisher: "Smithsonian", url: "https://example.com/owls", publishedAt: "2025-01-02", materialType: "article", supportedFact: "Owl feathers reduce noise." },
    ],
    workflowStatus: "age_reviewed",
    reviewRecords: { age: { actor: "reviewer", completedAt: "2026-08-21T00:00:00.000Z", workingVersion: 1, checklistItemIds: ["age.topic-fit"], provenance: "explicit" } },
  });

  render(<ContentReadiness article={{ ...projectWorkingArticle(article), mobilePreviewAcknowledged: true }} />);

  expect(screen.getByText("8/8 준비 완료")).toBeVisible();
  expect(screen.getAllByTestId("readiness-check")).toHaveLength(8);
});

it("edits quest metadata with selectable article relationships and keeps photo attribution read-only", async () => {
  const user = userEvent.setup();
  const onDraftChange = vi.fn();
  const article = makeStudioArticle({
    heroImage: {
      src: "/article-images/ar1-batch-07/owl-flight.jpg",
      altKo: "소리 없이 나는 올빼미",
      title: "Owl in flight",
      creator: "Example Author",
      sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Owl.jpg",
      licenseName: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      isModified: false,
    },
  });

  render(<ArticleEditor article={article} onArticleChange={() => ({ ok: true })} onDraftChange={onDraftChange} connectionOptions={[{ id: "next-quest", title: "Next Quest" }]} />);

  await user.type(screen.getByLabelText("호기심 질문"), "왜 조용히 날까요?");
  await user.selectOptions(screen.getByLabelText("다음 퀘스트"), "next-quest");

  expect(onDraftChange).toHaveBeenLastCalledWith(expect.objectContaining({
    quest: expect.objectContaining({ nextArticleIds: ["next-quest"] }),
  }));
  expect(screen.getByText(/Example Author/)).toBeVisible();
  expect(screen.queryByLabelText("사진 저작자")).not.toBeInTheDocument();
});
