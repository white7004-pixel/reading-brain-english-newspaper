export type ElementaryGrade = 1 | 2 | 3 | 4 | 5 | 6;
export type RoadmapDomain = "science" | "history" | "society" | "world-culture" | "arts" | "philosophy";

export type KnowledgeRoadmapItem = {
  id: string;
  grade: ElementaryGrade;
  domain: RoadmapDomain;
  titleKo: string;
  goal: string;
  arMin: number;
  arMax: number;
  order: number;
  articleId?: string;
};

export const ELEMENTARY_GRADES: ElementaryGrade[] = [1, 2, 3, 4, 5, 6];

export const ROADMAP_DOMAIN_LABELS: Record<RoadmapDomain, string> = {
  science: "과학",
  history: "역사",
  society: "사회",
  "world-culture": "세계문화",
  arts: "예술",
  philosophy: "철학·자기계발",
};

const DOMAIN_ORDER: RoadmapDomain[] = ["science", "history", "society", "world-culture", "arts", "philosophy"];
const TOPIC_ORDER = [0, 2, 4, 6, 8, 10, 1, 3, 5, 7, 9, 11] as const;

const GRADE_TOPICS: Record<ElementaryGrade, readonly string[]> = {
  1: ["생물과 무생물", "날씨와 계절", "우리 가족의 역사", "옛날과 오늘", "교실의 규칙", "우리 동네의 일", "세계의 인사", "세계의 집", "색과 모양", "음악과 리듬", "감정 알아보기", "선택과 결과"],
  2: ["동물의 서식지", "식물의 한살이", "마을의 변화", "시간과 연표", "지도와 방향", "필요와 욕구", "세계의 음식", "세계의 명절", "미술 속 무늬", "그림으로 전하는 이야기", "작은 습관", "공정함이란 무엇일까"],
  3: ["힘과 운동", "물의 순환", "고대 사람들의 생활", "발명품의 변화", "지방 정부의 역할", "생산자와 소비자", "무역로와 교류", "세계의 언어", "건축과 생활", "악기와 소리", "사실과 의견", "목표와 연습"],
  4: ["생태계의 연결", "움직이는 지구", "사람들의 이동", "초기 문명의 탄생", "권리와 책임", "자원과 무역", "차 문화와 교류", "문화가 만날 때", "판화의 원리", "미술 속 원근법", "통제와 대응", "믿을 만한 출처"],
  5: ["별과 태양계", "물질과 에너지", "탐험과 만남", "산업의 변화", "민주주의의 원리", "경제적 선택", "세계의 믿음", "세계의 상호의존", "디자인과 기술", "공공 미술", "윤리적 딜레마", "회복탄력성"],
  6: ["기후 시스템", "세포와 유전", "제국과 저항", "현대 세계사의 흐름", "헌법의 역할", "미디어 리터러시", "세계화", "문화유산 보존", "시각적 설득", "예술과 정체성", "주장과 근거", "나의 가치관"],
};

const GRADE_AR: Record<ElementaryGrade, readonly [number, number]> = {
  1: [1.0, 1.9],
  2: [1.5, 2.4],
  3: [2.0, 2.9],
  4: [2.5, 3.4],
  5: [3.0, 3.9],
  6: [3.5, 4.5],
};

const ARTICLE_BY_TITLE: Partial<Record<string, string>> = {
  "작은 습관": "small-habits",
  "무역로와 교류": "silk-road",
  "차 문화와 교류": "tea-cultures",
  "판화의 원리": "great-wave",
  "통제와 대응": "stoic-control",
  "별과 태양계": "stars-shine",
};

export const KNOWLEDGE_ROADMAP: KnowledgeRoadmapItem[] = ELEMENTARY_GRADES.flatMap((grade) => {
  const [gradeArMin, gradeArMax] = GRADE_AR[grade];
  const challengeArMin = Number((gradeArMin + 0.5).toFixed(1));
  const basicArMax = Number((challengeArMin - 0.1).toFixed(1));
  return TOPIC_ORDER.map((sourceIndex, index) => {
    const titleKo = GRADE_TOPICS[grade][sourceIndex];
    const challenge = index >= 6;
    return {
    id: `grade-${grade}-${index + 1}`,
    grade,
    domain: DOMAIN_ORDER[index % DOMAIN_ORDER.length],
    titleKo,
    goal: `${titleKo}의 핵심 원리와 생활 속 의미를 설명한다.`,
    arMin: challenge ? challengeArMin : gradeArMin,
    arMax: challenge ? gradeArMax : basicArMax,
    order: index + 1,
    ...(ARTICLE_BY_TITLE[titleKo] ? { articleId: ARTICLE_BY_TITLE[titleKo] } : {}),
    };
  });
});

export function roadmapForGrade(grade: ElementaryGrade): KnowledgeRoadmapItem[] {
  return KNOWLEDGE_ROADMAP.filter((item) => item.grade === grade).sort((a, b) => a.order - b.order);
}
