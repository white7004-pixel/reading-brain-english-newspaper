// 에듀냅 영어 척도 — 중1-1(9) ~ 고3-2(20). 초등 단계(0~8)는 나중에 붙인다.
// 근거: docs/research/*.md 와 docs/research/척도-초안.md. 교재명은 리포트에 나오지 않는다 (vocab.src 는 내부용).
// 한 학기 = 한 단계, 영역마다 단원 4개(순서 있음).

// 단어: 원장님 지시 "능률 단어 내용 위주". 학년마다 능률 VOCA 한 권을 두 학기로 나누고, 학기 안을 Day 로 4등분한다.
// ponytail: 학년당 한 권 배치는 [추정]. 학원이 쓰는 권이 다르면 BOOKS 와 아래 vocab() 호출만 바꾼다.
const BOOKS = {
  중등기본: { name: '능률 VOCA 중등 기본', words: 1000, days: 50 },
  중등필수: { name: '능률 VOCA 중등 필수', words: 1200, days: 50 },
  중등고난도: { name: '능률 VOCA 중등 고난도', words: 1200, days: 40 },
  고교필수: { name: '능률 VOCA 고교필수 2000', words: 2000, days: 70 },
  수능필수: { name: '능률 VOCA 수능 필수', words: 2000, days: 60 },
  수능고난도: { name: '능률 VOCA 수능 고난도', words: 2000, days: 50 },
};

function vocab(book, from, to) {
  const n = to - from + 1;
  return [0, 1, 2, 3].map((i) => ({
    name: `어휘대 ${i + 1}`,
    src: { book: BOOKS[book].name, days: [from + Math.round((n * i) / 4), from + Math.round((n * (i + 1)) / 4) - 1] },
  }));
}

// 고등 독해·듣기는 모의고사 번호 묶음으로 같은 네 단원을 쓰고, 학기마다 모의고사 시기(수준)가 오른다.
const HIGH_READING = [
  '사실 확인 (목적·심경·내용 일치·안내문 — 18·19·25~28번형)',
  '중심 내용 (주장·요지·주제·제목 — 20·22~24번형)',
  '글의 흐름 (무관한 문장·순서·삽입 — 35~39번형)',
  '추론 (함축 의미·빈칸·요약 — 21·31~34·40번형)',
];
const HIGH_LISTENING = [
  '사실 파악 (그림 불일치·금액·도표·언급 안 된 것 — 4·6·8~10번형)',
  '의도 파악 (목적·의견·요지·이유 — 1~3·7번형)',
  '이어질 응답 (짧은 대화·긴 대화 — 11~14번형)',
  '담화 (상황에 맞는 말·세트 담화 — 15~17번형)',
];

export const SCALE = [
  {
    step: 9, grade: '중1', term: 1,
    grammar: ['be동사·일반동사 현재', '현재진행형', '과거시제 (be동사·일반동사)', '미래 표현 (will · be going to)'],
    vocab: vocab('중등기본', 1, 25),
    reading: ['안내문·광고 세부 정보', '짧은 이야기 내용 일치', '짧은 설명문 주제', '편지·메일 목적'],
    listening: ['알맞은 그림 고르기', '대화 장소·관계', '세부 정보 (시각·숫자)', '짧은 대화 이어질 응답'],
    gen: { readWords: [60, 90], sentLen: 9, listenWords: [40, 70], wpm: 125 },
  },
  {
    step: 10, grade: '중1', term: 2,
    grammar: ['조동사 (can · may · must · should)', '비교 (원급·비교급·최상급)', 'to부정사 명사적 용법', '동명사 (주어·목적어)'],
    vocab: vocab('중등기본', 26, 50),
    reading: ['도표·안내문 내용 일치', '인물 심경', '주제·제목', '지칭 대상'],
    listening: ['부탁한 일·할 일', '세부 정보 (날짜·장소)', '대화 목적', '짧은 대화 이어질 응답'],
    gen: { readWords: [80, 110], sentLen: 10, listenWords: [50, 80], wpm: 130 },
  },
  {
    step: 11, grade: '중2', term: 1,
    grammar: ['현재완료 (경험·계속·완료·결과)', 'to부정사 형용사적·부사적 용법', '수동태 기본', '접속사 (when · because · if · that)'],
    vocab: vocab('중등필수', 1, 25),
    reading: ['설명문 내용 일치', '요지·주장', '빈칸 (낱말)', '무관한 문장'],
    listening: ['의견', '금액 (간단한 계산)', '언급되지 않은 것', '이어질 응답'],
    gen: { readWords: [90, 120], sentLen: 11, listenWords: [60, 90], wpm: 135 },
  },
  {
    step: 12, grade: '중2', term: 2,
    grammar: ['관계대명사 who · which · that', '5형식 (지각·사역동사, want + 목적어 + to)', '가주어 it · 의문사 + to부정사', '분사 (현재분사·과거분사 수식)'],
    vocab: vocab('중등필수', 26, 50),
    reading: ['목적·심경', '제목', '글의 순서', '빈칸 (구)'],
    listening: ['이유', '도표', '내용 불일치', '상황에 알맞은 말'],
    gen: { readWords: [100, 130], sentLen: 12, listenWords: [70, 100], wpm: 140 },
  },
  {
    step: 13, grade: '중3', term: 1,
    grammar: ['관계대명사 what · 소유격 whose', '현재완료진행 · 과거완료', '간접의문문', '조동사 수동태 · 4·5형식 수동태'],
    vocab: vocab('중등고난도', 1, 20),
    reading: ['안내문·도표 (선택지 함정)', '요지·주제', '문장 삽입', '빈칸 (구)'],
    listening: ['목적·요지', '금액 (할인 계산)', '언급되지 않은 것 (담화)', '긴 대화 이어질 응답'],
    gen: { readWords: [110, 140], sentLen: 13, listenWords: [80, 110], wpm: 145 },
  },
  {
    step: 14, grade: '중3', term: 2,
    grammar: ['가정법 과거', '관계부사 where · when · why · how', '분사구문 기초', 'so ~ that · too ~ to · 의미상 주어'],
    vocab: vocab('중등고난도', 21, 40),
    reading: ['목적·심경 (고1 3월형 입문)', '주제·제목 (고1 3월형 입문)', '순서·삽입 (고1 3월형 입문)', '빈칸·요약 (고1 3월형 입문)'],
    listening: ['사실 파악 (고1 3월형 입문)', '의도 파악 (고1 3월형 입문)', '이어질 응답 (고1 3월형 입문)', '상황에 알맞은 말 (고1 3월형 입문)'],
    gen: { readWords: [120, 150], sentLen: 14, listenWords: [90, 120], wpm: 150 },
  },
  {
    step: 15, grade: '고1', term: 1, mock: '고1 3·6월 모의고사 수준',
    grammar: ['문장 구조 (긴 주어·수일치)', '준동사 판별 (동사 자리 vs 준동사)', '관계사 계속적 용법 · 전치사 + 관계대명사', '분사구문 심화 (수동·완료)'],
    vocab: vocab('고교필수', 1, 35),
    reading: HIGH_READING, listening: HIGH_LISTENING,
    gen: { readWords: [130, 170], sentLen: 16, listenWords: [100, 140], wpm: 155 },
  },
  {
    step: 16, grade: '고1', term: 2, mock: '고1 9·11월 모의고사 수준',
    grammar: ['가정법 과거완료 · 혼합가정법', 'I wish · as if · without / but for', '조동사 + have p.p.', '명사절 (whether · 동격 that)'],
    vocab: vocab('고교필수', 36, 70),
    reading: HIGH_READING, listening: HIGH_LISTENING,
    gen: { readWords: [140, 175], sentLen: 17, listenWords: [100, 150], wpm: 160 },
  },
  {
    step: 17, grade: '고2', term: 1, mock: '고2 3·6월 모의고사 수준',
    grammar: ['복합관계사 (whoever · whatever · however)', '도치 (부정어·장소 부사구·so / neither)', '강조 (it ~ that · do 강조)', '병렬 구조'],
    vocab: vocab('수능필수', 1, 30),
    reading: HIGH_READING, listening: HIGH_LISTENING,
    gen: { readWords: [140, 180], sentLen: 18, listenWords: [110, 150], wpm: 160 },
  },
  {
    step: 18, grade: '고2', term: 2, mock: '고2 9·11월 모의고사 수준',
    grammar: ['수일치 심화 (부분 표현·the number of)', '특수 수동태 (be said to · 동사구 수동)', '생략·대동사', '동격·삽입'],
    vocab: vocab('수능필수', 31, 60),
    reading: HIGH_READING, listening: HIGH_LISTENING,
    gen: { readWords: [150, 185], sentLen: 19, listenWords: [110, 160], wpm: 165 },
  },
  {
    step: 19, grade: '고3', term: 1, mock: '고3 3·6월 모의고사 수준',
    grammar: ['어법 판단: 동사 vs 준동사 종합', '어법 판단: what · that · which', '어법 판단: 능동 vs 수동', '어법 판단: 대명사·형용사 vs 부사'],
    vocab: vocab('수능고난도', 1, 25),
    reading: HIGH_READING, listening: HIGH_LISTENING,
    gen: { readWords: [150, 190], sentLen: 20, listenWords: [120, 160], wpm: 170 },
  },
  {
    step: 20, grade: '고3', term: 2, mock: '고3 9월·수능 수준',
    grammar: ['가정법 도치 (Were I · Had I)', '도치·강조 구문 해석', '긴 문장 구조 (삽입·동격·생략)', '수능 어법 종합'],
    vocab: vocab('수능고난도', 26, 50),
    reading: HIGH_READING, listening: HIGH_LISTENING,
    gen: { readWords: [150, 200], sentLen: 21, listenWords: [120, 170], wpm: 175 },
  },
];
