export type QuestMetadata = {
  curiosityQuestionKo: string;
  knowledgeTakeawayKo: string;
  collectionId: string;
  mapOrder: number;
  prerequisiteArticleIds: string[];
  nextArticleIds: string[];
};

export type QuestReadinessCheckId =
  | "curiosity"
  | "takeaway"
  | "photography"
  | "map-placement"
  | "learning-materials"
  | "sources"
  | "age-review"
  | "mobile-preview";

export type QuestReadinessCheck = {
  id: QuestReadinessCheckId;
  labelKo: string;
  passed: boolean;
  field: string;
  messageKo: string;
};

export type QuestReadinessResult = {
  ready: boolean;
  passed: number;
  total: number;
  checks: QuestReadinessCheck[];
};

export function cloneQuestMetadata(quest: QuestMetadata): QuestMetadata {
  return {
    curiosityQuestionKo: quest.curiosityQuestionKo,
    knowledgeTakeawayKo: quest.knowledgeTakeawayKo,
    collectionId: quest.collectionId,
    mapOrder: quest.mapOrder,
    prerequisiteArticleIds: [...quest.prerequisiteArticleIds],
    nextArticleIds: [...quest.nextArticleIds],
  };
}

export function isQuestMetadata(value: unknown): value is QuestMetadata {
  if (!isRecord(value)
    || !isString(value.curiosityQuestionKo)
    || !isString(value.knowledgeTakeawayKo)
    || !isString(value.collectionId)
    || !isFiniteNumber(value.mapOrder)
    || !isStringArray(value.prerequisiteArticleIds)
    || !isStringArray(value.nextArticleIds)) return false;
  return true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isString(value: unknown): value is string { return typeof value === "string"; }
function isStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every(isString); }
function isFiniteNumber(value: unknown): value is number { return typeof value === "number" && Number.isFinite(value); }
