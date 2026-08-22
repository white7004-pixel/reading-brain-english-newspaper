import { AR_BANDS } from "@/lib/ar-bands";
import { buildLibraryDraft, type LibrarySeed } from "@/lib/library/build-draft";
import { validateStage } from "@/lib/studio-workflow";
import type { QuestMetadata } from "@/lib/quest-types";

const seed: LibrarySeed = {
  id: "ar1-honey-bees",
  ar: 1.4,
  domain: "science",
  subtopic: "동물",
  title: "How Bees Make Honey",
  titleKo: "꿀벌은 꿀을 어떻게 만들까?",
  summaryEn: "Bees turn flower nectar into honey and store it in the hive.",
  summaryKo: "꿀벌이 꽃의 꿀물을 모아 꿀로 바꾸는 과정을 알아봅니다.",
  learningGoal: "꿀벌이 먹이를 모아 저장하는 과정을 이해한다.",
  keyConcept: "동물은 먹이를 모으고 저장하는 저마다의 방법을 가진다.",
  visualTheme: "meadow",
  pages: [
    "Bees fly from flower to flower. They drink a sweet liquid called nectar.",
    "A bee keeps the nectar in a special stomach. Back home, it passes the nectar to another bee.",
    "The bees fan the nectar with their wings. The water dries up, and thick honey is left.",
  ],
  words: [
    ["nectar", "/ˈnektər/", "꽃꿀", "a sweet liquid inside a flower", "They drink a sweet liquid called nectar."],
    ["hive", "/haɪv/", "벌집", "the home where bees live", "Back home, it passes the nectar to another bee."],
    ["fan", "/fæn/", "부채질하다", "to move air onto something", "The bees fan the nectar with their wings."],
    ["thick", "/θɪk/", "걸쭉한", "not runny or watery", "The water dries up, and thick honey is left."],
  ],
  quiz: [
    { type: "comprehension", prompt: "What do bees drink from flowers?", options: ["Nectar", "Sand", "Milk"], correct: 0, explanation: "The passage says bees drink nectar from flowers.", evidence: "They drink a sweet liquid called nectar." },
    { type: "inference", prompt: "Why do bees fan the nectar?", options: ["To dry the water", "To make noise", "To cool the sun"], correct: 0, explanation: "Fanning dries the water so honey is left.", evidence: "The water dries up, and thick honey is left." },
    { type: "vocabulary", prompt: "What does ‘thick’ mean here?", options: ["Not watery", "Very cold", "Very loud"], correct: 0, explanation: "Thick describes honey that is not runny.", evidence: "The water dries up, and thick honey is left." },
  ],
  sources: [
    ["Honey Bee", "Smithsonian Institution", "https://www.si.edu/spotlight/bees", "article", "꿀벌이 꽃꿀을 모아 벌집에 저장한다."],
    ["Honeybee", "Encyclopaedia Britannica", "https://www.britannica.com/animal/honeybee", "article", "꿀벌은 꽃꿀의 수분을 날려 꿀로 만든다."],
  ],
};

const heroImage = {
  src: "/article-images/ar1-batch-07/owl-flight.jpg",
  altKo: "날개를 펼쳐 낮게 나는 올빼미",
  sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
  title: "Example owl",
  creator: "Example Creator",
  licenseName: "CC BY-SA 4.0" as const,
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  isModified: false as const,
};

it("builds an unreviewed draft from a library seed", () => {
  const draft = buildLibraryDraft(seed);

  expect(draft.id).toBe("ar1-honey-bees");
  expect(draft.workflowStatus).toBe("draft");
  expect(draft.workingVersion).toBe(1);
  expect(draft.reviewRecords).toEqual({});
  expect(draft.checklistAttestations).toEqual({});
  expect(draft.approval).toBeNull();
  expect(draft.previewReview).toBeNull();
  expect(draft.activePublicationVersion).toBeNull();
  expect(draft.versionHistory).toEqual([]);
});

it("derives audience and difficulty fields from the AR band", () => {
  const draft = buildLibraryDraft(seed);
  const band = AR_BANDS.ar1;

  expect(draft.difficulty.value).toBe(1.4);
  expect(draft.difficulty.method).toBe("nonfiction-lab-estimate");
  expect(draft.interestBand).toBe(band.interestBand);
  expect(draft.minAge).toBe(band.minAge);
  expect(draft.maxAge).toBe(band.maxAge);
  expect(draft.wordCount).toBe(draft.pages.join(" ").split(/\s+/).filter(Boolean).length);
});

it("leaves language and age review structurally complete", () => {
  const draft = buildLibraryDraft(seed);

  expect(validateStage(draft, "language")).toEqual([]);
  expect(validateStage(draft, "age")).toEqual([]);
});

it("leaves only the source publication date for the editor to verify", () => {
  const draft = buildLibraryDraft(seed);
  const issues = validateStage(draft, "facts");

  expect(issues.length).toBeGreaterThan(0);
  expect(issues.every((issue) => issue.code === "source_date_required")).toBe(true);
  expect(issues).toHaveLength(seed.sources.length);
  expect(draft.sources.every((source) => source.publishedAt === undefined)).toBe(true);
});

it("rejects a seed whose AR falls outside the authored bands", () => {
  expect(() => buildLibraryDraft({ ...seed, ar: 7.5 })).toThrow("AR 7.5는 제작 대상 대역이 아닙니다.");
});

it("preserves an attributed hero photograph in the studio draft", () => {
  const draft = buildLibraryDraft({ ...seed, heroImage });

  expect(draft.heroImage).toEqual(heroImage);
  expect(draft.heroImage).not.toBe(heroImage);
});

it("clones optional quest metadata into the studio draft", () => {
  const quest: QuestMetadata = {
    curiosityQuestionKo: "꿀벌은 왜 춤출까?", knowledgeTakeawayKo: "춤은 꽃의 위치를 알린다.",
    collectionId: "ar1-living-world", mapOrder: 1, prerequisiteArticleIds: [], nextArticleIds: ["ar1-owl-flight"],
  };

  const draft = buildLibraryDraft({ ...seed, quest });
  draft.quest?.nextArticleIds.push("ar1-ocean-tides");

  expect(draft.quest).toEqual({ ...quest, nextArticleIds: ["ar1-owl-flight", "ar1-ocean-tides"] });
  expect(quest.nextArticleIds).toEqual(["ar1-owl-flight"]);
});
