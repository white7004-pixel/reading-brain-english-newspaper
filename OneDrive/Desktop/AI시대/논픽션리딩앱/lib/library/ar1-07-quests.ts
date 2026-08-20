import type { QuestMetadata } from "../quest-types";

type QuestSeed = Omit<QuestMetadata, "prerequisiteArticleIds" | "nextArticleIds"> & {
  prerequisiteArticleIds?: string[];
  nextArticleIds?: string[];
};

const quest = (value: QuestSeed): QuestMetadata => ({
  ...value,
  prerequisiteArticleIds: value.prerequisiteArticleIds ?? [],
  nextArticleIds: value.nextArticleIds ?? [],
});

/** Representative photographed AR 1 quests, arranged as five short learning paths. */
export const AR1_BATCH_07_QUESTS: Record<string, QuestMetadata> = {
  "ar1-owl-flight": quest({
    curiosityQuestionKo: "올빼미는 어떻게 소리 없이 날 수 있을까요?",
    knowledgeTakeawayKo: "부드러운 깃털 가장자리가 공기 소리를 줄여 줍니다.",
    collectionId: "ar1-science-observers", mapOrder: 1,
    nextArticleIds: ["ar1-ocean-tides"],
  }),
  "ar1-ocean-tides": quest({
    curiosityQuestionKo: "바닷물은 왜 매일 오르내릴까요?",
    knowledgeTakeawayKo: "달의 중력이 바닷물의 규칙적인 움직임에 영향을 줍니다.",
    collectionId: "ar1-science-observers", mapOrder: 2,
    prerequisiteArticleIds: ["ar1-owl-flight"], nextArticleIds: ["ar1-fingerprints"],
  }),
  "ar1-fingerprints": quest({
    curiosityQuestionKo: "손끝의 무늬는 왜 사람마다 다를까요?",
    knowledgeTakeawayKo: "손가락의 융선은 서로 다른 작은 특징을 만들어 냅니다.",
    collectionId: "ar1-science-observers", mapOrder: 3,
    prerequisiteArticleIds: ["ar1-ocean-tides"],
  }),
  "ar1-ancient-bridges": quest({
    curiosityQuestionKo: "옛사람들은 큰 기계 없이 어떻게 다리를 지었을까요?",
    knowledgeTakeawayKo: "아치 구조는 무게를 양옆의 튼튼한 지지대로 보냅니다.",
    collectionId: "ar1-history-makers", mapOrder: 1,
    nextArticleIds: ["ar1-early-glass"],
  }),
  "ar1-early-glass": quest({
    curiosityQuestionKo: "아주 뜨거운 모래는 어떻게 유리가 될까요?",
    knowledgeTakeawayKo: "모래와 다른 재료를 녹이고 식히면 단단한 유리가 됩니다.",
    collectionId: "ar1-history-makers", mapOrder: 2,
    prerequisiteArticleIds: ["ar1-ancient-bridges"], nextArticleIds: ["ar1-ink-writing"],
  }),
  "ar1-ink-writing": quest({
    curiosityQuestionKo: "옛 기록에 쓰인 잉크는 무엇으로 만들었을까요?",
    knowledgeTakeawayKo: "그을음, 물, 끈적한 식물 성분을 섞어 오래 남는 잉크를 만들었습니다.",
    collectionId: "ar1-history-makers", mapOrder: 3,
    prerequisiteArticleIds: ["ar1-early-glass"],
  }),
  "ar1-stone-sculpture": quest({
    curiosityQuestionKo: "단단한 돌 속에서 조각은 어떻게 나타날까요?",
    knowledgeTakeawayKo: "조각가는 필요한 모양이 남도록 돌을 조금씩 덜어 냅니다.",
    collectionId: "ar1-arts-in-making", mapOrder: 1,
    nextArticleIds: ["ar1-orchestra"],
  }),
  "ar1-orchestra": quest({
    curiosityQuestionKo: "많은 악기는 어떻게 하나의 음악을 만들까요?",
    knowledgeTakeawayKo: "연주자들은 듣고 맞추며 함께 하나의 소리를 만듭니다.",
    collectionId: "ar1-arts-in-making", mapOrder: 2,
    prerequisiteArticleIds: ["ar1-stone-sculpture"], nextArticleIds: ["ar1-paper-folding"],
  }),
  "ar1-paper-folding": quest({
    curiosityQuestionKo: "평평한 종이는 어떻게 새로운 모양이 될까요?",
    knowledgeTakeawayKo: "접는 선과 순서를 따르면 종이가 입체적인 형태로 바뀝니다.",
    collectionId: "ar1-arts-in-making", mapOrder: 3,
    prerequisiteArticleIds: ["ar1-orchestra"],
  }),
  "ar1-telling-truth": quest({
    curiosityQuestionKo: "솔직한 말은 어려운 상황을 어떻게 바꿀까요?",
    knowledgeTakeawayKo: "사실을 말하면 필요한 도움과 행동을 더 빨리 시작할 수 있습니다.",
    collectionId: "ar1-thoughtful-actions", mapOrder: 1,
    nextArticleIds: ["ar1-group-decisions"],
  }),
  "ar1-group-decisions": quest({
    curiosityQuestionKo: "여럿이 함께 좋은 결정을 하려면 무엇이 필요할까요?",
    knowledgeTakeawayKo: "안전과 근거를 살피면 함께 더 나은 선택을 비교할 수 있습니다.",
    collectionId: "ar1-thoughtful-actions", mapOrder: 2,
    prerequisiteArticleIds: ["ar1-telling-truth"], nextArticleIds: ["ar1-school-bag"],
  }),
  "ar1-school-bag": quest({
    curiosityQuestionKo: "학교 가방은 어떻게 하루를 준비하게 도와줄까요?",
    knowledgeTakeawayKo: "필요한 물건을 제자리에 두면 다음 일을 차분히 시작할 수 있습니다.",
    collectionId: "ar1-thoughtful-actions", mapOrder: 3,
    prerequisiteArticleIds: ["ar1-group-decisions"], nextArticleIds: ["ar1-reading-focus"],
  }),
  "ar1-reading-focus": quest({
    curiosityQuestionKo: "나에게 맞는 읽기 환경은 어떻게 찾을 수 있을까요?",
    knowledgeTakeawayKo: "짧은 시간과 알맞은 환경을 시험하면 집중 방법을 발견할 수 있습니다.",
    collectionId: "ar1-thoughtful-actions", mapOrder: 4,
    prerequisiteArticleIds: ["ar1-school-bag"],
  }),
  "ar1-world-tea": quest({
    curiosityQuestionKo: "차를 마시는 방법은 왜 지역마다 다를까요?",
    knowledgeTakeawayKo: "차 문화에는 지역의 역사, 재료, 환대 방식이 담겨 있습니다.",
    collectionId: "ar1-cultures-in-motion", mapOrder: 1,
    nextArticleIds: ["ar1-kites"],
  }),
  "ar1-kites": quest({
    curiosityQuestionKo: "연은 바람을 어떻게 타고 하늘로 올라갈까요?",
    knowledgeTakeawayKo: "가벼운 틀과 알맞은 바람, 조심스러운 조종이 안정적인 비행을 만듭니다.",
    collectionId: "ar1-cultures-in-motion", mapOrder: 2,
    prerequisiteArticleIds: ["ar1-world-tea"],
  }),
};
