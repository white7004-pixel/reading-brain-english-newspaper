import { isArticleHeroImage } from "./public-article-schema";
import type { Article } from "./types";
import type { QuestMetadata, QuestReadinessCheck, QuestReadinessResult } from "./quest-types";

const ARTICLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function evaluateQuestReadiness(article: Article): QuestReadinessResult {
  const quest = article.quest;
  const checks: QuestReadinessCheck[] = [
    check("curiosity", "호기심 질문", "quest.curiosityQuestionKo", Boolean(quest?.curiosityQuestionKo.trim()), "한국어 호기심 질문을 입력해 주세요."),
    check("takeaway", "지식 한 줄", "quest.knowledgeTakeawayKo", Boolean(quest?.knowledgeTakeawayKo.trim()), "한국어 지식 한 줄을 입력해 주세요."),
    check("photography", "사진·출처 정보", "heroImage", isArticleHeroImage(article.heroImage), "로컬 사진, 한국어 대체 텍스트, 제작자와 라이선스 정보를 확인해 주세요."),
    check("map-placement", "지식 지도 위치", "quest", hasValidMapPlacement(article.id, quest), "컬렉션, 순서, 연결할 콘텐츠 ID를 확인해 주세요."),
    check("learning-materials", "학습 자료", "pages", hasLearningMaterials(article), "본문, 어휘, 이해·추론·어휘 문제 네 개를 준비해 주세요."),
    check("sources", "근거 출처", "sources", article.sources.length >= 2, "서로 다른 근거 출처를 두 개 이상 등록해 주세요."),
    check("age-review", "연령 적합성 검토", "review.ageChecked", article.review.ageChecked, "연령 적합성 검토를 완료해 주세요."),
    check("mobile-preview", "모바일 미리보기", "mobilePreviewAcknowledged", article.mobilePreviewAcknowledged === true, "현재 작업 버전의 모바일 미리보기를 확인해 주세요."),
  ];
  const passed = checks.filter((item) => item.passed).length;
  return { ready: passed === checks.length, passed, total: checks.length, checks };
}

function check(id: QuestReadinessCheck["id"], labelKo: string, field: string, passed: boolean, messageKo: string): QuestReadinessCheck {
  return { id, labelKo, passed, field, messageKo };
}

function hasValidMapPlacement(articleId: string, quest: QuestMetadata | undefined): boolean {
  if (!quest || !quest.collectionId.trim() || !Number.isInteger(quest.mapOrder) || quest.mapOrder < 1) return false;
  const relationships = [...quest.prerequisiteArticleIds, ...quest.nextArticleIds];
  return relationships.every((id) => ARTICLE_ID.test(id) && id !== articleId)
    && new Set(relationships).size === relationships.length;
}

function hasLearningMaterials(article: Article): boolean {
  const quizTypes = article.quiz.map((question) => question.type);
  return article.pages.some((page) => page.trim())
    && article.vocabulary.length > 0
    && article.quiz.length >= 4
    && quizTypes.filter((type) => type === "comprehension").length >= 2
    && quizTypes.includes("inference")
    && quizTypes.includes("vocabulary");
}
