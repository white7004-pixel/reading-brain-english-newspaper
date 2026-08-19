import {
  acknowledgePreview,
  applyArticleEdit,
  approveArticle,
  completeStage,
  publishArticle,
  validateMediaEmbeds,
  validateStage,
  withdrawArticle,
} from "@/lib/studio-workflow";
import { completeAttestedStage, makeStudioArticle } from "@/tests/studio-fixtures";
import type { ArticleEditPatch, ReviewStage, StudioArticle } from "@/lib/studio-types";

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

  it.each([
    ["title", { title: "" }, "title_required"],
    ["titleKo", { titleKo: "" }, "title_ko_required"],
    ["summaryEn", { summaryEn: "" }, "summary_en_required"],
    ["summaryKo", { summaryKo: "" }, "summary_ko_required"],
    ["subtopic", { subtopic: "" }, "subtopic_required"],
    ["sources.0.title", { sources: [{ ...makeStudioArticle().sources[0], title: "" }] }, "source_title_required"],
    ["sources.0.publisher", { sources: [{ ...makeStudioArticle().sources[0], publisher: "" }] }, "source_publisher_required"],
    ["sources.0.url", { sources: [{ ...makeStudioArticle().sources[0], url: "not-a-url" }] }, "source_url_invalid"],
    ["sources.0.publishedAt", { sources: [{ ...makeStudioArticle().sources[0], publishedAt: "" }] }, "source_date_required"],
    ["sources.0.publishedAt", { sources: [{ ...makeStudioArticle().sources[0], publishedAt: "not-a-date" }] }, "source_date_invalid"],
    ["sources.0.supportedFact", { sources: [{ ...makeStudioArticle().sources[0], supportedFact: "" }] }, "source_fact_required"],
    ["sources.0.materialType", { sources: [{ ...makeStudioArticle().sources[0], materialType: "" as never }] }, "source_material_type_invalid"],
    ["sourceNotes", { sourceNotes: "" }, "source_notes_required"],
    ["reconstructionConfirmed", { reconstructionConfirmed: false }, "reconstruction_confirmation_required"],
    ["rightsNotes", { rightsNotes: "" }, "rights_notes_required"],
    ["media.0.embedUrl", { media: [{ kind: "video", provider: "youtube", embedUrl: "https://example.com/video", alt: "Forest", usageConfirmed: true }] }, "unsupported_embed_url"],
    ["media.0.alt", { media: [{ kind: "video", provider: "youtube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "", usageConfirmed: true }] }, "media_alt_required"],
    ["media.0.usageConfirmed", { media: [{ kind: "video", provider: "youtube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "Forest", usageConfirmed: false }] }, "media_usage_confirmation_required"],
  ] as Array<[string, Partial<StudioArticle>, string]>)('reports the exact facts-review issue for %s', (field, overrides, code) => {
    expect(validateStage(makeStudioArticle(overrides), "facts")).toContainEqual({ field, code });
  });

  it.each([
    ["pages", { pages: [] }, "body_required"],
    ["pages.0", { pages: ["   "] }, "body_page_required"],
    ["vocabulary", { vocabulary: [] }, "vocabulary_required"],
    ["vocabulary.0.word", { vocabulary: [{ ...makeStudioArticle().vocabulary[0], word: "" }] }, "vocabulary_word_required"],
    ["vocabulary.0.definitionEn", { vocabulary: [{ ...makeStudioArticle().vocabulary[0], definitionEn: "" }] }, "vocabulary_definition_required"],
    ["vocabulary.0.exampleSentence", { vocabulary: [{ ...makeStudioArticle().vocabulary[0], exampleSentence: "" }] }, "vocabulary_example_required"],
    ["quiz", { quiz: [] }, "quiz_required"],
    ["quiz.0.prompt", { quiz: [{ ...makeStudioArticle().quiz[0], prompt: "" }] }, "quiz_prompt_required"],
    ["quiz.0.type", { quiz: [{ ...makeStudioArticle().quiz[0], type: "" as never }] }, "quiz_type_invalid"],
    ["quiz.0.options", { quiz: [{ ...makeStudioArticle().quiz[0], options: ["only one"] }] }, "quiz_options_required"],
    ["quiz.0.correctIndex", { quiz: [{ ...makeStudioArticle().quiz[0], correctIndex: 8 }] }, "quiz_answer_invalid"],
    ["quiz.0.explanation", { quiz: [{ ...makeStudioArticle().quiz[0], explanation: "" }] }, "quiz_explanation_required"],
    ["quiz.0.evidence", { quiz: [{ ...makeStudioArticle().quiz[0], evidence: "" }] }, "quiz_evidence_required"],
    ["difficulty.value", { difficulty: { ...makeStudioArticle().difficulty, value: 0 } }, "ar_required"],
    ["difficulty.label", { difficulty: { ...makeStudioArticle().difficulty, label: "" } }, "ar_note_required"],
    ["wordCount", { wordCount: 0 }, "word_count_required"],
    ["estimatedReadingSeconds", { estimatedReadingSeconds: 181 }, "reading_time_invalid"],
    ["keySentence", { keySentence: "" }, "key_sentence_required"],
  ] as Array<[string, Partial<StudioArticle>, string]>)('reports the exact language-review issue for %s', (field, overrides, code) => {
    expect(validateStage(makeStudioArticle(overrides), "language")).toContainEqual({ field, code });
  });

  it.each([
    ["minAge", { minAge: 0 }, "minimum_age_invalid"],
    ["maxAge", { minAge: 13, maxAge: 8 }, "age_range_invalid"],
    ["learningGoal", { learningGoal: "" }, "learning_goal_required"],
    ["safetyReviewed", { safetyReviewed: false }, "safety_review_required"],
    ["keyConcept", { keyConcept: "" }, "key_concept_required"],
  ] as Array<[string, Partial<StudioArticle>, string]>)('reports the exact age-review issue for %s', (field, overrides, code) => {
    expect(validateStage(makeStudioArticle(overrides), "age")).toContainEqual({ field, code });
  });

  it("requires the prior review stage before language review", () => {
    expect(() => completeStage(makeStudioArticle(), "language", "editor-1", "2026-08-17T01:00:00.000Z")).toThrow(
      "이전 검수 단계를 먼저 완료해 주세요.",
    );
  });

  it("records each review only after its validation and prerequisites pass", () => {
    const source = makeStudioArticle();
    const facts = completeAttestedStage(source, "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
    const language = completeAttestedStage(facts, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
    const age = completeAttestedStage(language, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");

    expect(age.workflowStatus).toBe("age_reviewed");
    expect(age.reviewRecords).toEqual({
      facts: expect.objectContaining({ actor: "fact-checker", completedAt: "2026-08-17T01:00:00.000Z", workingVersion: 1, provenance: "explicit" }),
      language: expect.objectContaining({ actor: "language-reviewer", completedAt: "2026-08-17T02:00:00.000Z", workingVersion: 1, provenance: "explicit" }),
      age: expect.objectContaining({ actor: "age-reviewer", completedAt: "2026-08-17T03:00:00.000Z", workingVersion: 1, provenance: "explicit" }),
    });
    expect(source.reviewRecords).toEqual({});
  });

  it("invalidates language, age, and approval when pages change while preserving facts review", () => {
    const facts = completeAttestedStage(makeStudioArticle(), "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
    const language = completeAttestedStage(facts, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
    const age = completeAttestedStage(language, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");
    const approved = approveArticle(age, "approver", "2026-08-17T04:00:00.000Z");
    const edited = applyArticleEdit(approved, { pages: ["New first page", "New second page", "New third page"] }, "2026-08-17T05:00:00.000Z");

    expect(edited.reviewRecords).toEqual({ facts: expect.objectContaining({ actor: "fact-checker", completedAt: "2026-08-17T01:00:00.000Z" }) });
    expect(edited.workflowStatus).toBe("facts_reviewed");
    expect(edited.approval).toBeNull();
    expect(approved.reviewRecords.age).toBeDefined();
    expect(approved.pages[0]).not.toBe("New first page");
  });

  it("preserves a published snapshot while creating one new working version for edits", () => {
    const published = publishReviewedArticle();
    const firstSnapshot = published.versionHistory[0].snapshot;
    const edited = applyArticleEdit(published, { title: "Rainforests revised" }, "2026-08-17T05:00:00.000Z");
    const editedAgain = applyArticleEdit(edited, { summaryKo: "새로운 요약" }, "2026-08-17T06:00:00.000Z");

    expect(edited.workingVersion).toBe(2);
    expect(editedAgain.workingVersion).toBe(2);
    expect(edited.versionHistory[0].snapshot).toBe(firstSnapshot);
    expect(edited.versionHistory[0].snapshot.title).toBe("Rainforests");

    const republished = publishArticle(
      approveArticle(
        acknowledgePreview(completeAttestedStage(
          completeAttestedStage(
            completeAttestedStage(edited, "facts", "fact-checker", "2026-08-17T07:00:00.000Z"),
            "language",
            "language-reviewer",
            "2026-08-17T08:00:00.000Z",
          ),
          "age",
          "age-reviewer",
          "2026-08-17T09:00:00.000Z",
        ), "previewer", "2026-08-17T09:30:00.000Z"),
        "approver",
        "2026-08-17T10:00:00.000Z",
      ),
      "2026-08-17T11:00:00.000Z",
    );

    expect(republished.versionHistory[1].snapshot).not.toBe(firstSnapshot);
    expect(republished.versionHistory[1].snapshot.title).toBe("Rainforests revised");
    expect(republished.versionHistory[1].snapshot.version).toBe(2);
  });

  it("withdraws the active publication while leaving an edited replacement intact", () => {
    const published = publishReviewedArticle();
    const replacement = applyArticleEdit(
      published,
      { title: "Replacement draft" },
      "2026-08-17T06:00:00.000Z",
    );

    const withdrawn = withdrawArticle(replacement, "2026-08-17T07:00:00.000Z");
    const lifecycle = withdrawn as StudioArticle & {
      activePublicationVersion?: number | null;
      versionHistory?: Array<{ version: number; withdrawnAt: string | null }>;
    };

    expect(withdrawn.title).toBe("Replacement draft");
    expect(withdrawn.workingVersion).toBe(2);
    expect(withdrawn.workflowStatus).toBe("draft");
    expect(lifecycle.activePublicationVersion).toBeNull();
    expect(lifecycle.versionHistory).toEqual([
      expect.objectContaining({ version: 1, withdrawnAt: "2026-08-17T07:00:00.000Z" }),
    ]);
  });

  it("records an immutable publication audit for each version and atomically replaces the active one", () => {
    const first = publishReviewedArticle();
    const edited = applyArticleEdit(first, { title: "Rainforests revised" }, "2026-08-17T06:00:00.000Z");
    const facts = completeAttestedStage(edited, "facts", "fact-checker-2", "2026-08-17T07:00:00.000Z");
    const language = completeAttestedStage(facts, "language", "language-reviewer-2", "2026-08-17T08:00:00.000Z");
    const age = completeAttestedStage(language, "age", "age-reviewer-2", "2026-08-17T09:00:00.000Z");
    const previewed = acknowledgePreview(age, "previewer-2", "2026-08-17T09:30:00.000Z");
    const approved = approveArticle(previewed, "approver-2", "2026-08-17T10:00:00.000Z");
    const replacement = publishArticle(approved, "2026-08-17T11:00:00.000Z");
    const lifecycle = replacement as StudioArticle & {
      activePublicationVersion?: number | null;
      versionHistory?: Array<{
        version: number;
        snapshot: { title: string };
        reviewRecords: Partial<Record<ReviewStage, { actor: string }>>;
        publishedAt: string;
        withdrawnAt: string | null;
      }>;
    };

    expect(lifecycle.activePublicationVersion).toBe(2);
    expect(lifecycle.versionHistory).toHaveLength(2);
    expect(lifecycle.versionHistory?.[0]).toMatchObject({
      version: 1,
      snapshot: { title: "Rainforests" },
      publishedAt: "2026-08-17T05:00:00.000Z",
      withdrawnAt: "2026-08-17T11:00:00.000Z",
    });
    expect(lifecycle.versionHistory?.[1]).toMatchObject({
      version: 2,
      snapshot: { title: "Rainforests revised" },
      reviewRecords: { age: { actor: "age-reviewer-2" } },
      publishedAt: "2026-08-17T11:00:00.000Z",
      withdrawnAt: null,
    });
    expect(replacement.auditHistory.filter((entry) => entry.kind === "published" || entry.kind === "withdrawn")).toEqual([
      { kind: "published", version: 1, at: "2026-08-17T05:00:00.000Z" },
      { kind: "withdrawn", version: 1, at: "2026-08-17T11:00:00.000Z" },
      { kind: "published", version: 2, at: "2026-08-17T11:00:00.000Z" },
    ]);
  });

  it("rejects learner snapshots that cannot round-trip through the public schema", () => {
    const reviewed = reviewThroughAge();
    const approved = approveArticle(reviewed, "approver", "2026-08-17T04:00:00.000Z");

    expect(() => publishArticle({ ...approved, id: "" }, "2026-08-17T05:00:00.000Z")).toThrow(
      "학습자 공개 데이터가 올바르지 않습니다.",
    );
  });

  it("guards approval, creates immutable learner snapshots, and records withdrawal", () => {
    expect(() => approveArticle(makeStudioArticle(), "approver", "2026-08-17T01:00:00.000Z")).toThrow();

    const published = publishReviewedArticle();
    expect(published.versionHistory[0].snapshot.status).toBe("published");
    expect(published.versionHistory[0].snapshot.keySentence).toBe(published.keySentence);
    expect(published.versionHistory[0].snapshot.review).toEqual({
      approvedBy: "approver",
      approvedAt: "2026-08-17T04:00:00.000Z",
      factsChecked: true,
      languageChecked: true,
      ageChecked: true,
    });
    expect(Object.isFrozen(published.versionHistory[0].snapshot)).toBe(true);
    expect(Object.isFrozen(published.versionHistory[0].snapshot.pages)).toBe(true);
    expect(Object.isFrozen(published.versionHistory)).toBe(true);
    expect(Object.isFrozen(published.versionHistory[0])).toBe(true);
    expect(Object.isFrozen(published.versionHistory[0].reviewRecords.facts)).toBe(true);
    expect(Object.isFrozen(published.auditHistory)).toBe(true);
    expect(Object.isFrozen(published.auditHistory[0])).toBe(true);
    expect(() => {
      (published.versionHistory[0].reviewRecords.facts as { actor: string }).actor = "tampered";
    }).toThrow();

    const withdrawn = withdrawArticle(published, "2026-08-17T06:00:00.000Z");
    expect(withdrawn.workflowStatus).toBe("withdrawn");
    expect(withdrawn.activePublicationVersion).toBeNull();
    expect(withdrawn.versionHistory[0].withdrawnAt).toBe("2026-08-17T06:00:00.000Z");
    expect(published.workflowStatus).toBe("published");
  });

  it("rejects an upstream review repeat after the workflow has reached age review", () => {
    const ageReviewed = reviewThroughAge();

    expect(() => completeStage(ageReviewed, "facts", "fact-checker", "2026-08-17T04:00:00.000Z")).toThrow(
      "이전 검수 단계를 먼저 완료해 주세요.",
    );
    expect(ageReviewed.workflowStatus).toBe("age_reviewed");
    expect(ageReviewed.reviewRecords.age).toBeDefined();
  });

  it("clears stale downstream records before approval or publication can be reached", () => {
    const ageReviewed = reviewThroughAge();
    const staleFactsState = { ...ageReviewed, workflowStatus: "facts_reviewed" as const };
    const languageReviewed = completeAttestedStage(staleFactsState, "language", "language-reviewer", "2026-08-17T04:00:00.000Z");

    expect(languageReviewed.reviewRecords).toEqual({
      facts: expect.objectContaining({ actor: "fact-checker", completedAt: "2026-08-17T01:00:00.000Z" }),
      language: expect.objectContaining({ actor: "language-reviewer", completedAt: "2026-08-17T04:00:00.000Z" }),
    });
    expect(() => approveArticle(languageReviewed, "approver", "2026-08-17T05:00:00.000Z")).toThrow();
    expect(() => publishArticle(languageReviewed, "2026-08-17T05:00:00.000Z")).toThrow();
  });

  it("revalidates every stage at approval and publication boundaries", () => {
    const ageReviewed = reviewThroughAge();
    const staleFacts = { ...ageReviewed, sources: [{ ...ageReviewed.sources[0], supportedFact: "" }] };
    expect(() => approveArticle(staleFacts, "approver", "2026-08-17T05:00:00.000Z")).toThrow("모든 검수 단계를 다시 확인해 주세요.");

    const approved = approveArticle(ageReviewed, "approver", "2026-08-17T05:00:00.000Z");
    const staleLanguage = { ...approved, pages: [] };
    expect(() => publishArticle(staleLanguage, "2026-08-17T06:00:00.000Z")).toThrow("모든 검수 단계를 다시 확인해 주세요.");
  });

  it("rejects explicit current reviews with missing or wrong-stage checklist attestations", () => {
    const reviewed = reviewThroughAge();
    const forgedReviews = {
      ...reviewed.reviewRecords,
      facts: { ...reviewed.reviewRecords.facts!, checklistItemIds: ["language.grammar" as const] },
    };

    expect(() => approveArticle({ ...reviewed, reviewRecords: forgedReviews }, "approver", "2026-08-17T05:00:00.000Z"))
      .toThrow();

    const approved = approveArticle(reviewed, "approver", "2026-08-17T05:00:00.000Z");
    expect(() => publishArticle({ ...approved, reviewRecords: forgedReviews }, "2026-08-17T06:00:00.000Z"))
      .toThrow();
  });

  it("requires a durable current-version preview acknowledgement for approval and publication", () => {
    const ageReviewed = { ...reviewThroughAge(), previewReview: null };
    expect(() => approveArticle(ageReviewed, "approver", "2026-08-17T05:00:00.000Z")).toThrow("모바일 미리보기를 확인해 주세요.");

    const acknowledged = acknowledgePreview(ageReviewed, "previewer", "2026-08-17T05:00:00.000Z");
    expect(acknowledged.previewReview).toEqual({ actor: "previewer", reviewedAt: "2026-08-17T05:00:00.000Z", workingVersion: 1 });
    const approved = approveArticle(acknowledged, "approver", "2026-08-17T06:00:00.000Z");
    expect(() => publishArticle({ ...approved, previewReview: null }, "2026-08-17T07:00:00.000Z")).toThrow("모바일 미리보기를 확인해 주세요.");
  });

  it("invalidates preview acknowledgement only for learner-facing edits", () => {
    const article = makeStudioArticle();
    expect(applyArticleEdit(article, { title: "Visible edit" }, "2026-08-17T01:00:00.000Z").previewReview).toBeNull();
    expect(applyArticleEdit(article, { sourceNotes: "Internal editorial note" }, "2026-08-17T01:00:00.000Z").previewReview).toEqual(article.previewReview);
  });

  it.each([
    ["title", "facts"], ["titleKo", "facts"], ["summaryEn", "facts"], ["summaryKo", "facts"], ["domain", "facts"], ["subtopic", "facts"],
    ["sources", "facts"], ["sourceNotes", "facts"], ["reconstructionConfirmed", "facts"], ["rightsNotes", "facts"], ["media", "facts"], ["connectedArticleId", "facts"], ["visualTheme", "facts"],
    ["difficulty", "language"], ["estimatedReadingSeconds", "language"], ["wordCount", "language"], ["pages", "language"], ["vocabulary", "language"], ["quiz", "language"], ["keySentence", "language"], ["audioUrl", "language"],
    ["interestBand", "age"], ["minAge", "age"], ["maxAge", "age"], ["safetyFlags", "age"], ["safetyReviewed", "age"], ["learningGoal", "age"], ["keyConcept", "age"],
  ] as Array<[keyof ArticleEditPatch, ReviewStage]>)('invalidates %s from the %s stage', (field, stage) => {
    const reviewed = reviewThroughAge();
    const edited = applyArticleEdit(reviewed, { [field]: reviewed[field] } as ArticleEditPatch, "2026-08-17T04:00:00.000Z");
    const expectedStages = stage === "facts" ? [] : stage === "language" ? ["facts"] : ["facts", "language"];
    expect(Object.keys(edited.reviewRecords)).toEqual(expectedStages);
  });

  it("starts a new working version when withdrawn content is edited", () => {
    const withdrawn = withdrawArticle(publishReviewedArticle(), "2026-08-17T06:00:00.000Z");
    const edited = applyArticleEdit(withdrawn, { title: "Reissued title" }, "2026-08-17T07:00:00.000Z");
    expect(edited.workingVersion).toBe(2);
    expect(edited.versionHistory[0].snapshot.version).toBe(1);
  });

  it("accepts an official YouTube embed URL", () => {
    const media = [{ kind: "video" as const, provider: "youtube" as const, embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "Rainforest footage", usageConfirmed: true }];

    expect(validateMediaEmbeds(media)).toEqual([]);
    expect(applyArticleEdit(makeStudioArticle(), { media }, "2026-08-17T01:00:00.000Z").media).toEqual(media);
  });

  it("persists partial media drafts and defers strict URL checks to facts review", () => {
    const media = [{ kind: "video" as const, provider: "youtube" as const, embedUrl: "https://example.com/embed/not-official", alt: "", usageConfirmed: false }];

    expect(validateMediaEmbeds(media)).toEqual([{ field: "media.0.embedUrl", code: "unsupported_embed_url" }]);
    expect(applyArticleEdit(makeStudioArticle(), { media }, "2026-08-17T01:00:00.000Z").media).toEqual(media);
  });
});

function publishReviewedArticle() {
  const approved = approveArticle(reviewThroughAge(), "approver", "2026-08-17T04:00:00.000Z");
  return publishArticle(approved, "2026-08-17T05:00:00.000Z");
}

function reviewThroughAge(source = makeStudioArticle()) {
  const facts = completeAttestedStage(source, "facts", "fact-checker", "2026-08-17T01:00:00.000Z");
  const language = completeAttestedStage(facts, "language", "language-reviewer", "2026-08-17T02:00:00.000Z");
  return completeAttestedStage(language, "age", "age-reviewer", "2026-08-17T03:00:00.000Z");
}
