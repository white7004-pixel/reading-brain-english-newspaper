import {
  applyArticleEdit,
  approveArticle,
  completeStage,
  publishArticle,
  validateStage,
  withdrawArticle,
} from "@/lib/studio-workflow";
import { makeStudioArticle } from "@/tests/studio-fixtures";

describe("content review workflow", () => {
  it("requires a source before facts review can complete", () => {
    const article = makeStudioArticle({ sources: [] });

    expect(validateStage(article, "facts")).toEqual(
      expect.arrayContaining([{ field: "sources", code: "source_required" }]),
    );
    expect(() => completeStage(article, "facts", "editor-1", "2026-08-17T01:00:00.000Z")).toThrow(
      "사실·출처 검수를 완료할 수 없습니다.",
    );
  });

  it("requires the prior review stage before language review", () => {
    expect(() => completeStage(makeStudioArticle(), "language", "editor-1", "2026-08-17T01:00:00.000Z")).toThrow(
      "이전 검수 단계를 먼저 완료해 주세요.",
    );
  });

  it("records each review only after its validation and prerequisites pass", () => {
    const source = makeStudioArticle();
    const facts = completeStage(source, "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
    const language = completeStage(facts, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
    const age = completeStage(language, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");

    expect(age.workflowStatus).toBe("age_reviewed");
    expect(age.reviewRecords).toEqual({
      facts: { actor: "fact-checker", completedAt: "2026-08-17T01:00:00.000Z" },
      language: { actor: "language-reviewer", completedAt: "2026-08-17T02:00:00.000Z" },
      age: { actor: "age-reviewer", completedAt: "2026-08-17T03:00:00.000Z" },
    });
    expect(source.reviewRecords).toEqual({});
  });

  it("invalidates language, age, and approval when pages change while preserving facts review", () => {
    const facts = completeStage(makeStudioArticle(), "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
    const language = completeStage(facts, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
    const age = completeStage(language, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");
    const approved = approveArticle(age, "approver", "2026-08-17T04:00:00.000Z");
    const edited = applyArticleEdit(approved, { pages: ["New first page", "New second page", "New third page"] }, "2026-08-17T05:00:00.000Z");

    expect(edited.reviewRecords).toEqual({ facts: { actor: "fact-checker", completedAt: "2026-08-17T01:00:00.000Z" } });
    expect(edited.workflowStatus).toBe("facts_reviewed");
    expect(edited.approval).toBeNull();
    expect(approved.reviewRecords.age).toBeDefined();
    expect(approved.pages[0]).not.toBe("New first page");
  });

  it("preserves a published snapshot while creating one new working version for edits", () => {
    const published = publishReviewedArticle();
    const firstSnapshot = published.publishedSnapshot;
    const edited = applyArticleEdit(published, { title: "Rainforests revised" }, "2026-08-17T05:00:00.000Z");
    const editedAgain = applyArticleEdit(edited, { summaryKo: "새로운 요약" }, "2026-08-17T06:00:00.000Z");

    expect(edited.workingVersion).toBe(2);
    expect(editedAgain.workingVersion).toBe(2);
    expect(edited.publishedSnapshot).toBe(firstSnapshot);
    expect(edited.publishedSnapshot?.title).toBe("Rainforests");

    const republished = publishArticle(
      approveArticle(
        completeStage(
          completeStage(
            completeStage(edited, "facts", "fact-checker", "2026-08-17T07:00:00.000Z"),
            "language",
            "language-reviewer",
            "2026-08-17T08:00:00.000Z",
          ),
          "age",
          "age-reviewer",
          "2026-08-17T09:00:00.000Z",
        ),
        "approver",
        "2026-08-17T10:00:00.000Z",
      ),
      "2026-08-17T11:00:00.000Z",
    );

    expect(republished.publishedSnapshot).not.toBe(firstSnapshot);
    expect(republished.publishedSnapshot?.title).toBe("Rainforests revised");
    expect(republished.publishedSnapshot?.version).toBe(2);
  });

  it("guards approval, creates immutable learner snapshots, and records withdrawal", () => {
    expect(() => approveArticle(makeStudioArticle(), "approver", "2026-08-17T01:00:00.000Z")).toThrow();

    const published = publishReviewedArticle();
    expect(published.publishedSnapshot?.status).toBe("published");
    expect(published.publishedSnapshot?.review).toEqual({
      approvedBy: "approver",
      approvedAt: "2026-08-17T04:00:00.000Z",
      factsChecked: true,
      languageChecked: true,
      ageChecked: true,
    });
    expect(Object.isFrozen(published.publishedSnapshot)).toBe(true);
    expect(Object.isFrozen(published.publishedSnapshot?.pages)).toBe(true);

    const withdrawn = withdrawArticle(published, "2026-08-17T06:00:00.000Z");
    expect(withdrawn.workflowStatus).toBe("withdrawn");
    expect(withdrawn.status).toBe("withdrawn");
    expect(withdrawn.withdrawnAt).toBe("2026-08-17T06:00:00.000Z");
    expect(published.workflowStatus).toBe("published");
  });
});

function publishReviewedArticle() {
  const facts = completeStage(makeStudioArticle(), "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
  const language = completeStage(facts, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
  const age = completeStage(language, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");
  const approved = approveArticle(age, "approver", "2026-08-17T04:00:00.000Z");
  return publishArticle(approved, "2026-08-17T05:00:00.000Z");
}
