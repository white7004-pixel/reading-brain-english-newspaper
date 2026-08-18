import {
  REVIEW_CHECKLISTS,
  applyArticleEdit,
  completeStage,
  setChecklistItemAttestation,
} from "@/lib/studio-workflow";
import { makeStudioArticle } from "@/tests/studio-fixtures";

describe("semantic review checklist attestations", () => {
  it("uses stable explicit IDs for every approved checklist item", () => {
    expect(REVIEW_CHECKLISTS.facts.map((item) => item.id)).toEqual([
      "facts.source-present",
      "facts.source-trust",
      "facts.publication-valid",
      "facts.supported-facts",
      "facts.independent-reconstruction",
      "facts.media-rights",
    ]);
    expect(REVIEW_CHECKLISTS.language.map((item) => item.id)).toEqual([
      "language.grammar",
      "language.difficulty-fit",
      "language.three-minute",
      "language.vocabulary-context",
      "language.quiz-evidence",
    ]);
    expect(REVIEW_CHECKLISTS.age.map((item) => item.id)).toEqual([
      "age.topic-fit",
      "age.young-reader-clarity",
      "age.safety-flags",
      "age.concept-integrity",
    ]);
  });

  it("requires every current-version fact attestation before stage completion", () => {
    const source = makeStudioArticle();

    expect(() => completeStage(source, "facts", "fact-checker", "2026-08-18T01:00:00.000Z"))
      .toThrow("사실·출처 체크리스트를 모두 확인해 주세요.");

    const attested = REVIEW_CHECKLISTS.facts.reduce(
      (article, item, index) => setChecklistItemAttestation(
        article,
        item.id,
        true,
        "fact-checker",
        `2026-08-18T00:0${index}:00.000Z`,
      ),
      source,
    );
    const reviewed = completeStage(attested, "facts", "fact-checker", "2026-08-18T01:00:00.000Z");

    expect(reviewed.reviewRecords.facts).toMatchObject({
      actor: "fact-checker",
      workingVersion: 1,
      checklistItemIds: REVIEW_CHECKLISTS.facts.map((item) => item.id),
    });
    expect(Object.values(reviewed.checklistAttestations)).toHaveLength(REVIEW_CHECKLISTS.facts.length);
  });

  it("does not reuse attestations after an affected edit or for a new version", () => {
    const attested = REVIEW_CHECKLISTS.facts.reduce(
      (article, item) => setChecklistItemAttestation(
        article,
        item.id,
        true,
        "fact-checker",
        "2026-08-18T00:00:00.000Z",
      ),
      makeStudioArticle(),
    );
    const reviewed = completeStage(attested, "facts", "fact-checker", "2026-08-18T01:00:00.000Z");
    const edited = applyArticleEdit(
      reviewed,
      { sourceNotes: "Changed source analysis" },
      "2026-08-18T02:00:00.000Z",
    );

    expect(edited.reviewRecords.facts).toBeUndefined();
    expect(edited.checklistAttestations).toEqual({});
    expect(() => completeStage(edited, "facts", "fact-checker", "2026-08-18T03:00:00.000Z"))
      .toThrow("사실·출처 체크리스트를 모두 확인해 주세요.");
  });
});
