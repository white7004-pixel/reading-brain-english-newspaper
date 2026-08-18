import type { ValidationIssue } from "@/lib/studio-types";

const FIELD_LABELS: Record<string, string> = {
  title: "영문 제목", titleKo: "한글 제목", summaryEn: "영문 요약", summaryKo: "한글 요약", subtopic: "세부 주제",
  sources: "출처", sourceNotes: "출처 메모", reconstructionConfirmed: "독립적 재구성 확인", rightsNotes: "사용 조건 확인 메모",
  pages: "본문 페이지", vocabulary: "어휘", quiz: "퀴즈", "difficulty.value": "논픽션랩 추정 AR", "difficulty.label": "난이도 설명",
  wordCount: "단어 수", estimatedReadingSeconds: "예상 읽기 시간", keySentence: "핵심 문장", minAge: "권장 최소 연령",
  maxAge: "권장 최대 연령", learningGoal: "학습 목표", safetyReviewed: "아동 주의 요소 검토", keyConcept: "핵심 개념",
  visualTheme: "비주얼 테마", connectedArticleId: "연결 콘텐츠 ID",
};

const ISSUE_MESSAGES: Record<string, string> = {
  source_required: "출처를 한 개 이상 추가해 주세요.",
  source_title_required: "출처 제목을 입력해 주세요.",
  source_publisher_required: "출처 기관 또는 저자를 입력해 주세요.",
  source_url_invalid: "유효한 원문 URL을 입력해 주세요.",
  source_date_required: "출처 발행일을 입력해 주세요.",
  source_fact_required: "출처가 뒷받침하는 사실을 입력해 주세요.",
  unsupported_embed_url: "제공자의 공식 임베드 URL을 입력해 주세요.",
  image_url_invalid: "HTTPS 이미지 URL을 입력해 주세요.",
  visual_theme_required: "비주얼 테마를 입력해 주세요.",
  connected_article_invalid: "연결 콘텐츠를 비우거나 유효한 ID를 입력해 주세요.",
  media_alt_required: "미디어 대체 텍스트를 입력해 주세요.",
  media_usage_confirmation_required: "미디어 사용 조건을 확인해 주세요.",
  reconstruction_confirmation_required: "독립적 재구성을 확인해 주세요.",
  rights_notes_required: "사용 조건 확인 메모를 입력해 주세요.",
  body_required: "본문 페이지를 한 개 이상 추가해 주세요.",
  vocabulary_required: "어휘를 한 개 이상 추가해 주세요.",
  quiz_required: "퀴즈를 한 개 이상 추가해 주세요.",
  reading_time_invalid: "예상 읽기 시간을 1초 이상 180초 이하로 입력해 주세요.",
  safety_review_required: "아동 주의 요소 검토를 완료해 주세요.",
};

export function studioControlId(field: string): string {
  return `studio-field-${field.replace(/[^A-Za-z0-9]+/g, "-")}`;
}

export function studioIssueId(issue: ValidationIssue): string {
  return `studio-issue-${issue.field.replace(/[^A-Za-z0-9]+/g, "-")}-${issue.code}`;
}

export function issueMessage(issue: ValidationIssue): string {
  return ISSUE_MESSAGES[issue.code] ?? `${issueFieldLabel(issue.field)} 항목을 확인해 주세요.`;
}

export function issueFieldLabel(field: string): string {
  const source = /^sources\.(\d+)\.(.+)$/.exec(field);
  if (source) return `출처 ${Number(source[1]) + 1} ${sourcePartLabel(source[2])}`;
  const vocabulary = /^vocabulary\.(\d+)\.(.+)$/.exec(field);
  if (vocabulary) return `어휘 ${Number(vocabulary[1]) + 1} ${vocabularyPartLabel(vocabulary[2])}`;
  const quiz = /^quiz\.(\d+)\.(.+)$/.exec(field);
  if (quiz) return `퀴즈 ${Number(quiz[1]) + 1} ${quizPartLabel(quiz[2])}`;
  const media = /^media\.(\d+)\.(.+)$/.exec(field);
  if (media) return `미디어 ${Number(media[1]) + 1} ${mediaPartLabel(media[2])}`;
  const page = /^pages\.(\d+)$/.exec(field);
  if (page) return `본문 페이지 ${Number(page[1]) + 1}`;
  const safetyFlag = /^safetyFlags\.(\d+)$/.exec(field);
  if (safetyFlag) return `주의 요소 ${Number(safetyFlag[1]) + 1}`;
  return FIELD_LABELS[field] ?? field;
}

function sourcePartLabel(part: string): string {
  return ({ title: "제목", publisher: "기관 또는 저자", url: "원문 URL", publishedAt: "발행일", supportedFact: "뒷받침 사실", materialType: "자료 유형" } as Record<string, string>)[part] ?? part;
}
function vocabularyPartLabel(part: string): string {
  return ({ word: "단어", pronunciation: "발음", meaningKo: "한글 뜻", definitionEn: "영문 정의", exampleSentence: "예문" } as Record<string, string>)[part] ?? part;
}
function quizPartLabel(part: string): string {
  return ({ type: "문제 유형", prompt: "질문", options: "선택지", correctIndex: "정답 번호", explanation: "해설", evidence: "본문 근거" } as Record<string, string>)[part] ?? part;
}
function mediaPartLabel(part: string): string {
  return ({ provider: "제공처", embedUrl: "공식 임베드 URL", url: "이미지 URL", alt: "대체 텍스트", usageConfirmed: "사용 조건 확인" } as Record<string, string>)[part] ?? part;
}
