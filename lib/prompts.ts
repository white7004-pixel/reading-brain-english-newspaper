interface PromptParams {
  [key: string]: string;
}

const SCHEMAS: Record<string, string> = {
  newspaper: `{
  "masthead": "THE READING BRAIN TIMES",
  "date": "영어 날짜 (예: Friday, July 4, 2026)",
  "issueNo": "Vol. N · No. NN",
  "levelLabel": "레벨 라벨 그대로",
  "articles": [
    { "headline": "...", "subhead": "...", "byline": "...", "body": ["문단1", "문단2", ...], "imageCaption": "..." }
  ],
  "vocabulary": [ { "word": "...", "pos": "n./v./adj.", "meaningKo": "한국어 뜻", "example": "영어 예문" } ],
  "quiz": [ { "question": "...", "options": ["A","B","C","D"], "answer": 0, "explanation": "한국어 해설" } ],
  "teacherTip": "교사용 수업 활용 팁 (한국어)"
}`,
  nblog: `{
  "title": "네이버 블로그 제목 (검색 키워드 포함, 후킹)",
  "sections": [ { "heading": "소제목", "body": "본문 (한국어, 학부모 대상)" } ],
  "hashtags": ["#태그", ...정확히 10개],
  "seoKeywords": ["키워드", ...]
}`,
  insta: `{
  "caption": "인스타그램 캡션 (이모지 포함, 한국어)",
  "slides": [ { "title": "카드 제목", "body": "카드 본문 (짧게)" } ],
  "hashtags": ["#태그", ...8~12개]
}`,
  newsletter: `{
  "title": "소식지 제목",
  "greeting": "인사말",
  "sections": [ { "heading": "소제목", "body": "본문" } ],
  "closing": "맺음말"
}`,
  sms: `{
  "variants": ["문자 시안 1", "문자 시안 2", "문자 시안 3"]
}`,
};

export function buildPrompt(type: string, params: PromptParams): string {
  const p = params;
  const academy = p.academyName || "리딩브레인 영어학원";

  const intros: Record<string, string> = {
    newspaper: `당신은 영어 교육 전문가이자 어린이 영자신문 편집장입니다. 한국 영어학원 "${academy}"의 수업용 영자신문을 만듭니다.

요구사항:
- 주제: ${p.topic || "자유 주제 (아이들이 흥미로워할 시사/과학/문화)"}
- 학습자 레벨: ${p.levelLabel || "초급"} (${p.levelDetail || "CEFR A1-A2, 초등학생"})
- 기사 수: ${p.articleCount || "2"}개 (첫 기사는 메인 기사로 4문단 내외, 나머지는 2~3문단)
- 기사 영어는 반드시 지정된 레벨에 맞는 어휘와 문장 길이로 작성
- vocabulary: 기사에 실제로 등장한 단어 5개 (레벨에 맞는 핵심 어휘)
- quiz: 기사 내용 이해도를 확인하는 4지선다 3문제 (answer는 0부터 시작하는 정답 인덱스)
- teacherTip: 이 신문으로 수업하는 방법을 한국어로 제안`,
    nblog: `당신은 학원 마케팅 전문 블로그 작가입니다. 한국 영어학원 "${academy}"의 네이버 블로그 포스트를 작성합니다.

요구사항:
- 주제: ${p.topic || "초등 영어 리딩 습관"}
- 타겟 독자: 초중등 자녀를 둔 학부모
- SEO 키워드: ${p.keywords || "영어학원, 초등영어, 영어리딩"} (제목과 본문에 자연스럽게 포함)
- 톤: ${p.tone || "전문적이면서 따뜻한"}
- 구성: 공감 유도 도입 → 전문성 있는 정보 → 실천 팁 → 학원 소개/상담 유도 (4~5개 섹션)
- 광고 티가 심하게 나지 않게, 정보성 콘텐츠 중심으로`,
    insta: `당신은 학원 SNS 마케팅 전문가입니다. 한국 영어학원 "${academy}"의 인스타그램 카드뉴스와 캡션을 작성합니다.

요구사항:
- 주제: ${p.topic || "영자신문 수업 소개"}
- 카드뉴스 슬라이드 5장 (표지 1장 + 내용 3장 + CTA 1장)
- 캡션은 이모지를 적절히 사용하고 3~5문장
- 마지막 슬라이드와 캡션에 상담/레벨테스트 유도 문구 포함`,
    newsletter: `당신은 학원 커뮤니케이션 담당자입니다. 한국 영어학원 "${academy}"의 학부모 대상 소식지(가정통신문)를 작성합니다.

요구사항:
- 대상 월: ${p.month || "이번 달"}
- 포함 내용: ${p.highlights || "이달 학습 하이라이트, 학생 칭찬, 다음 달 일정"}
- 톤: 정중하고 따뜻하게, 학부모가 신뢰할 수 있는 문체
- 섹션 3~4개`,
    sms: `당신은 학원 상담 실장입니다. 한국 영어학원 "${academy}"에서 학부모에게 보낼 문자 메시지를 작성합니다.

요구사항:
- 목적: ${p.purpose || "수업 소식 전달"}
- 학생 이름: ${p.studentName || "OO"} 학생
- 길이: 각 시안 200자 이내, [${academy}] 머리말로 시작
- 서로 다른 톤의 시안 3개 (따뜻한 톤 / 정중한 톤 / 간결한 톤)`,
  };

  return `${intros[type] || intros.newspaper}

반드시 아래 JSON 스키마로만 응답하세요. JSON 외의 텍스트, 마크다운 코드블록 없이 순수 JSON만 출력합니다.

${SCHEMAS[type] || SCHEMAS.newspaper}`;
}
