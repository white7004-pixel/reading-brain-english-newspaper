import { AR_BANDS, bandForAr, countWords, longestSentenceWords } from "@/lib/ar-bands";
import { LIBRARY_SEEDS } from "@/lib/library";
import { AR1_BATCH_07 } from "@/lib/library/ar1-07";
import { buildLibraryDraft } from "@/lib/library/build-draft";
import { validateStage } from "@/lib/studio-workflow";

const normalize = (value: string) => value.toLocaleLowerCase().replace(/[’']/g, "'");

it("includes one hundred reviewed AR 1 passages after the seventh batch", () => {
  expect(LIBRARY_SEEDS.filter((seed) => bandForAr(seed.ar) === "ar1")).toHaveLength(100);
});

it("meets the standard AR 1 format in every seventh-batch passage", () => {
  const offenders = AR1_BATCH_07.flatMap((seed) => {
    const problems: string[] = [];
    const words = countWords(seed.pages);
    const quizTypes = seed.quiz.map((question) => question.type);

    if (words < 160 || words > 220) problems.push(`${seed.id}: ${words} words outside 160-220`);
    if (longestSentenceWords(seed.pages) > 10) problems.push(`${seed.id}: sentence longer than 10 words`);
    if (quizTypes.filter((type) => type === "comprehension").length !== 2) problems.push(`${seed.id}: needs 2 comprehension questions`);
    if (quizTypes.filter((type) => type === "inference").length !== 1) problems.push(`${seed.id}: needs 1 inference question`);
    if (quizTypes.filter((type) => type === "vocabulary").length !== 1) problems.push(`${seed.id}: needs 1 vocabulary question`);
    return problems;
  });

  expect(offenders).toEqual([]);
});

it("authors every passage inside its AR band targets", () => {
  const offenders = LIBRARY_SEEDS.flatMap((seed) => {
    if (AR1_BATCH_07.some((item) => item.id === seed.id)) return [];
    const bandId = bandForAr(seed.ar);
    if (!bandId) return [`${seed.id}: AR ${seed.ar} has no band`];
    const band = AR_BANDS[bandId];
    const words = countWords(seed.pages);
    const longest = longestSentenceWords(seed.pages);
    const problems: string[] = [];
    if (words < band.minWords || words > band.maxWords) problems.push(`${seed.id}: ${words} words outside ${band.minWords}-${band.maxWords}`);
    if (longest > band.maxSentenceWords) problems.push(`${seed.id}: longest sentence ${longest} > ${band.maxSentenceWords}`);
    if (seed.words.length !== band.vocabularyCount) problems.push(`${seed.id}: ${seed.words.length} vocabulary items, expected ${band.vocabularyCount}`);
    if (seed.quiz.length !== band.quizCount) problems.push(`${seed.id}: ${seed.quiz.length} quiz questions, expected ${band.quizCount}`);
    return problems;
  });

  expect(offenders).toEqual([]);
});

it("gives every passage a unique id", () => {
  const ids = LIBRARY_SEEDS.map((seed) => seed.id);
  expect(new Set(ids).size).toBe(ids.length);
});

it("teaches vocabulary that actually appears in the passage", () => {
  const offenders = LIBRARY_SEEDS.flatMap((seed) => {
    const body = normalize(seed.pages.join(" "));
    return seed.words
      .filter(([word, , , , example]) => !body.includes(normalize(word)) || !body.includes(normalize(example)))
      .map(([word]) => `${seed.id}: "${word}" is not grounded in the passage`);
  });

  expect(offenders).toEqual([]);
});

it("backs every quiz answer with evidence from the passage", () => {
  const offenders = LIBRARY_SEEDS.flatMap((seed) => {
    const body = normalize(seed.pages.join(" "));
    return seed.quiz.flatMap((question, index) => {
      const problems: string[] = [];
      if (question.correct < 0 || question.correct >= question.options.length) problems.push(`${seed.id} q${index + 1}: answer index out of range`);
      if (new Set(question.options).size !== question.options.length) problems.push(`${seed.id} q${index + 1}: duplicate options`);
      if (!body.includes(normalize(question.evidence))) problems.push(`${seed.id} q${index + 1}: evidence is not in the passage`);
      return problems;
    });
  });

  expect(offenders).toEqual([]);
});

it("cites at least two sources per passage and never invents a publication date", () => {
  const offenders = LIBRARY_SEEDS.flatMap((seed) => {
    const problems: string[] = [];
    if (seed.sources.length < 2) problems.push(`${seed.id}: fewer than two sources`);
    for (const [title, publisher, url, , supportedFact] of seed.sources) {
      if (!url.startsWith("https://")) problems.push(`${seed.id}: "${title}" is not an https source`);
      if (!publisher.trim()) problems.push(`${seed.id}: "${title}" has no publisher`);
      if (!supportedFact.trim()) problems.push(`${seed.id}: "${title}" records no supported fact`);
    }
    return problems;
  });

  expect(offenders).toEqual([]);
});

it("enters the studio as drafts that only need source verification", () => {
  const offenders = LIBRARY_SEEDS.flatMap((seed) => {
    const draft = buildLibraryDraft(seed);
    const problems: string[] = [];
    if (draft.workflowStatus !== "draft") problems.push(`${seed.id}: not a draft`);
    for (const stage of ["language", "age"] as const) {
      const issues = validateStage(draft, stage);
      if (issues.length) problems.push(`${seed.id}: ${stage} incomplete (${issues.map((issue) => issue.code).join(", ")})`);
    }
    const factIssues = validateStage(draft, "facts");
    const unexpected = factIssues.filter((issue) => issue.code !== "source_date_required");
    if (unexpected.length) problems.push(`${seed.id}: unexpected fact issues (${unexpected.map((issue) => issue.code).join(", ")})`);
    return problems;
  });

  expect(offenders).toEqual([]);
});

it("spreads each band across the knowledge domains", () => {
  for (const bandId of ["ar1", "ar2", "ar3"] as const) {
    const inBand = LIBRARY_SEEDS.filter((seed) => bandForAr(seed.ar) === bandId);
    if (inBand.length < 6) continue;
    expect(new Set(inBand.map((seed) => seed.domain)).size).toBeGreaterThanOrEqual(5);
  }
});
