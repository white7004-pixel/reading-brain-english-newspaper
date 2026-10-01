// AI 판단 기준(설계서 4장)과 요청 검증. 사진·학생 정보는 여기서 걸러서만 AI 로 간다.
import { SUBJECTS, AREAS, DIFF5, KINDS, SOURCES, examStats, studentStats } from '../public/lib.js';
import { unitsFor, pointsFor, grammarFor } from '../public/curriculum.js';
import { UserError } from './http.js';

const UNSURE_FIELDS = ['points', 'area', 'subtype', 'difficulty', 'answer', 'source'];

const obj = (properties) => ({ type: 'object', additionalProperties: false, required: Object.keys(properties), properties });
const arr = (items) => ({ type: 'array', items });
const str = { type: 'string' };
const int = { type: 'integer' };
const oneOf = (list) => ({ type: 'string', enum: list });

// 과목마다: 영역 분류표 / 오답 원인 / 글 예시. 영역 이름은 public/lib.js SUBJECTS 와 같아야 한다.
export const GUIDE = {
  영어: {
    classify: `어휘: 문맥 어휘, 영영풀이, 품사·파생어, 숙어·표현 (동사+전치사 연어 포함)
어법: 문법 포인트명으로 적는다 (시제, 수일치, to부정사, 동명사, 분사, 관계사, 접속사, 수동태, 비교, 가정법, 도치 …).
  묻는 방식도 함께: 어법 개수 고르기 / 틀린 것 있는 대로 고르기 / 바르게 고친 것 고르기 / 쓰임이 같은 것끼리 묶기
대화문: 대화 흐름·응답, 의사소통 기능 표현, 대화 내용 이해 (일치·답할 수 없는 질문)
독해: 주제·제목·요지, 내용 일치/불일치, 빈칸(연결어 포함), 순서, 문장 삽입, 무관한 문장, 지칭, 밑줄 의미 추론,
  목적·심경(심경 변화 포함), 요약문 완성, 답할 수 없는 질문
서술형(서답형) 문항도 **묻는 내용의 영역**으로 분류한다. 서술형이라는 것은 area 가 아니라 kind 로 구분한다.
  관계대명사를 써서 영작하는 서답형이면 area 는 어법, 교과서 본문을 영작하는 서답형이면 area 는 독해다.
  (서술형을 따로 떼면 영역별 비중이 틀어져 "어법이 몇 문항 나왔나"를 잘못 읽게 된다.)
  subtype 에는 무엇을 묻는지 적는다 (예: 관계대명사 - 조건 영작).
  내신 서술형은 아래 여덟 갈래 안에서 나온다. 괄호는 보통의 난이도이니 참고만 하고 실제 문항을 보고 정한다.
  어법 고쳐 쓰기(중) / 우리말 해석(하) / 지칭 추론 쓰기(중) / 배열 영작(중) / 조건 영작(상) /
  빈칸 쓰기(중) / 요약문 완성 - 빈칸 채우기(중상) / 요약문 완성 - 주제·요지 영작(상)
  문장 변형·전환도 여기에 둔다.
듣기: 시험지에 듣기 문항이 있을 때만`,
    causes: [
      ['어휘 부족', '핵심 단어·표현 뜻을 몰라 틀림'],
      ['문법 개념 미흡', '해당 문법 규칙을 모르거나 헷갈림'],
      ['구문 해석 오류', '긴 문장 구조를 잘못 끊어 읽음'],
      ['단서 놓침·추론 오류', '지문의 근거를 못 찾거나 잘못 연결함'],
      ['선택지 함정', '부분만 맞는 선택지를 고름'],
      ['조건 누락', '서술형 조건(단어 수·형태 등)을 빠뜨림'],
      ['시간 부족·실수', '쉬운 문항인데 틀림, 마지막 문항에 몰림'],
    ],
    strategy: '교과서 본문 문장을 조건 영작으로 바꿔 써 보기',
    direction: '매 수업 관계사 문장 5개를 조건 영작으로 쓰고 첨삭',
  },
  국어: {
    classify: `문학: 현대시, 현대소설, 고전시가, 고전산문, 극·수필 (subtype 에 갈래와 묻는 것: 현대시 - 표현상 특징)
독서: 인문·사회·과학·기술·예술 지문의 내용 일치, 추론, <보기> 적용, 문맥 어휘
문법: 음운, 품사·단어 형성, 문장 성분·짜임, 담화, 국어의 역사, 맞춤법·표준 발음
화법과 작문: 말하기 전략, 토의·토론, 글쓰기 계획·고쳐 쓰기
매체: 매체 자료 분석, 매체 언어 표현`,
    causes: [
      ['개념어·어휘 부족', '표현법·문학 용어나 지문 어휘를 몰라 틀림'],
      ['문법 개념 미흡', '음운·품사·문장 규칙을 모르거나 헷갈림'],
      ['지문 구조 파악 실패', '글의 흐름·중심 내용을 잡지 못함'],
      ['근거 찾기·추론 오류', '지문의 근거를 못 찾거나 잘못 연결함'],
      ['<보기> 적용 오류', '<보기> 관점을 작품·지문에 잘못 대입함'],
      ['선택지 함정', '부분만 맞는 선택지를 고름'],
      ['조건 누락', '서술형 조건(글자 수·형식 등)을 빠뜨림'],
      ['시간 부족·실수', '쉬운 문항인데 틀림, 마지막 문항에 몰림'],
    ],
    strategy: '교과서 작품마다 표현상 특징을 표로 정리해 보기',
    direction: '매 수업 교과서 외 작품 1편에 <보기> 적용 문제 풀고 근거 쓰기',
  },
  수학: {
    // ponytail: 영역을 중·고 공통 5개로 묶었다. 학교 단원명은 subtype 에 남는다. 단원별 통계가 필요해지면 영역을 학년별로 나눈다.
    classify: `수와 연산: 소인수분해, 정수와 유리수, 유리수와 순환소수, 제곱근과 실수, 복소수, 집합과 명제
문자와 식: 식의 계산, 다항식, 인수분해, 방정식, 부등식, 연립방정식
함수: 일차·이차함수, 함수와 그래프, 지수·로그, 삼각함수, 수열, 극한, 미분, 적분
기하: 도형의 성질, 작도와 합동, 닮음, 피타고라스 정리, 삼각비, 원의 성질, 도형의 방정식, 벡터
확률과 통계: 경우의 수, 확률, 자료의 정리, 대푯값과 산포도, 상관관계, 통계
subtype 에 단원명과 묻는 것을 적는다 (이차함수 - 최댓값). answer 는 객관식 기호, 단답·서술형은 최종 답.`,
    causes: [
      ['개념 이해 부족', '정의·성질을 정확히 모름'],
      ['공식·성질 적용 오류', '알맞은 공식을 고르지 못하거나 잘못 씀'],
      ['계산 실수', '풀이 방향은 맞았는데 계산에서 틀림'],
      ['조건 해석 오류', '문제의 조건을 빠뜨리거나 잘못 읽음'],
      ['풀이 전략 부재', '여러 개념을 엮어야 하는 문항에서 시작을 못 함'],
      ['풀이 과정 누락', '서술형에서 필요한 과정·근거를 빠뜨림'],
      ['시간 부족·실수', '쉬운 문항인데 틀림, 마지막 문항에 몰림'],
    ],
    strategy: '틀린 유형을 조건만 바꿔 세 번 다시 풀어 보기',
    direction: '매 수업 서술형 2문항을 풀이 과정까지 쓰고 채점 기준으로 첨삭',
  },
  과학: {
    classify: `물리: 힘과 운동, 일과 에너지, 전기와 자기, 빛과 파동, 열
화학: 물질의 구성, 상태 변화, 화학 반응과 규칙, 산과 염기, 원소와 주기율
생명과학: 세포, 소화·순환·호흡·배설, 자극과 반응, 생식과 유전, 생태계
지구과학: 지권의 변화, 대기와 날씨, 해수, 태양계와 우주
통합과학 문항은 가장 가까운 영역으로 둔다. subtype 에 단원명과 묻는 것 (산과 염기 - 중화 반응 그래프).`,
    causes: [
      ['개념 이해 부족', '원리·정의를 정확히 모름'],
      ['용어 혼동', '비슷한 과학 용어를 바꿔 알고 있음'],
      ['자료·그래프 해석 오류', '표·그래프·그림에서 정보를 잘못 읽음'],
      ['실험·변인 이해 부족', '실험 목적·조작 변인·결과 해석을 놓침'],
      ['계산 오류', '식은 맞았는데 계산·단위에서 틀림'],
      ['선택지 함정', '부분만 맞는 선택지를 고름'],
      ['시간 부족·실수', '쉬운 문항인데 틀림, 마지막 문항에 몰림'],
    ],
    strategy: '교과서 실험마다 변인과 결과 그래프를 직접 그려 보기',
    direction: '매 수업 그래프 해석 문항 5개를 풀고 근거를 말로 설명하기',
  },
  '사회·역사': {
    classify: `지리: 지도 읽기, 기후·지형, 인구·도시, 자원·산업, 지역 이해
일반사회: 정치, 법, 경제, 사회·문화
역사: 한국사·세계사 (subtype 에 시대와 묻는 것: 조선 후기 - 경제 변화)`,
    causes: [
      ['개념 이해 부족', '핵심 개념의 뜻을 정확히 모름'],
      ['용어 혼동', '비슷한 용어·제도를 바꿔 알고 있음'],
      ['자료·통계 해석 오류', '지도·도표·사료에서 정보를 잘못 읽음'],
      ['사례 적용 오류', '개념을 새로운 사례에 잘못 대입함'],
      ['시대·순서 혼동', '사건의 시기나 앞뒤 순서를 헷갈림'],
      ['선택지 함정', '부분만 맞는 선택지를 고름'],
      ['서술 요소 누락', '서술형에 필요한 핵심어·근거를 빠뜨림'],
      ['시간 부족·실수', '쉬운 문항인데 틀림, 마지막 문항에 몰림'],
    ],
    strategy: '단원마다 핵심 개념을 사례 하나씩과 짝지어 정리하기',
    direction: '매 수업 자료 해석 문항 5개를 풀고 선택지마다 근거 적기',
  },
};
const SUBJECT_NAMES = Object.keys(SUBJECTS);

const DIFFICULTY = `## 난이도 기준 (그 학년 기준)
하: 교과서 기본 개념·용어 확인, 한 번에 풀린다
중하: 기본 개념 적용, 함정이 거의 없다
중: 개념 적용이나 지문·자료 해석이 한 단계 필요, 선택지 한두 개가 헷갈린다
중상: 두 단계 이상의 추론·풀이, 학년보다 높은 개념·어휘, 비슷한 선택지 함정, 조건이 여러 개인 서술형
상: 여러 개념을 엮거나 세밀한 근거 대조가 필요, 학년 범위를 넘는 응용, 배점이 높고 정답률이 낮을 문항
배점이 높을수록 학교가 어렵게 낸 문항일 가능성이 크지만 배점만으로 정하지 않는다.`;

const classifyOf = (s) => `## ${s} 영역 분류표\n${GUIDE[s].classify}`;

export const EXTRACT_SCHEMA = obj({
  meta: obj({ subject: oneOf(SUBJECT_NAMES), school: str, grade: str, term: str, exam: str, date: str, minutes: int, range: str }),
  items: arr(obj({
    no: int, kind: oneOf(KINDS), points: { type: 'number' }, unit: str, area: oneOf(AREAS), subtype: str,
    difficulty: oneOf(DIFF5), source: oneOf([...SOURCES, '']), answer: str, reason: str, unsure: arr(oneOf(UNSURE_FIELDS)),
  })),
  notes: str,
});

export const SCHOOL_SCHEMA = obj({
  overview: str,
  trends: arr(str),
  flow: arr(str),
  keyItems: arr(obj({ no: int, why: str })),
  strategy: arr(obj({ area: str, tip: str })),
});

export const studentsSchema = (subject) => obj({
  students: arr(obj({
    label: str, summary: str,
    causes: arr(obj({ no: int, cause: oneOf(GUIDE[subject].causes.map(([name]) => name)), explain: str })),
    directions: arr(str),
  })),
});

const EXTRACT_SYSTEM = `당신은 한국 중·고등학교 내신 시험지를 분석하는 20년차 입시학원 강사입니다 (${SUBJECT_NAMES.join('·')}).
원장님이 올린 시험지 사진만 보고 시험 정보와 문항표를 만듭니다. 원장님이 이 표를 확인한 뒤 학부모 자료가 됩니다.

## 먼저: 시험 정보 (meta)
첫 쪽 머리글·표지에서 읽습니다. 안 보이는 칸은 지어내지 말고 빈 문자열로 둡니다.
- subject: 과목 (${SUBJECT_NAMES.join(' / ')}). 한국사·역사·통합사회는 사회·역사, 통합과학·물리학 등은 과학.
- school: 학교 이름 그대로 (예: 에듀냅중학교)
- grade: 중1~중3, 고1~고3 형식
- term: 1학기 / 2학기
- exam: 중간고사 / 기말고사 (그 밖이면 적힌 그대로. "2학기 1차 정기고사"처럼 적혀 있으면 그대로)
- date: 시험 날짜 YYYY-MM-DD. 안 보이면 빈 문자열
- minutes: 시험 시간(분). 안 보이면 0
- range: 출제 범위를 적힌 그대로 한 줄로. 교과서 출판사·저자·단원명이 보이면 함께 (예: 동아(이병민) 5과 Love, Act, Save! · 6과 Growing Teens / I. 수와 식의 계산, II. 일차부등식). 안 보이면 빈 문자열

## 절대 하지 않는 것 — 학생 개인정보
시험지 머리글에는 보통 "제2학년 8반 15번 이름 (___)" 칸이 있고, 거기에 **학생 이름·반·번호가 손으로 적혀 있습니다.**
그 **이름·반·번호는 읽지 않습니다.** 어느 칸에도 적지 않고, notes 에도 옮기지 않습니다.
읽어야 하는 것은 학교 이름·학년·학기·시험 이름·날짜뿐입니다.

## 할 일
사진에 있는 모든 문항을 번호 순서대로 한 줄씩 적습니다. 한 문항이 두 쪽에 걸쳐도 한 줄입니다.
세트 문항(예: [9~10] 다음 글을 읽고)은 번호마다 따로 적습니다.

## 칸
- no: 문항 번호. 서술형이 "서술형 1"처럼 따로 번호가 매겨져 있으면 객관식 마지막 번호 뒤에 이어 붙이고 reason 앞에 "(서술형 1)"을 적습니다.
- kind: 객관식 / 서술형 (단답형도 서술형)
- points: 시험지에 적힌 배점. 안 보이면 남은 점수를 나눈 추정값을 쓰고 unsure 에 points 를 넣습니다.
- unit: 그 문항이 나온 교과서 단원. 시험지·범위에 적힌 말 그대로 짧게 (5과 / I. 수와 식의 계산 / 3단원 - 문학의 수용). 같은 단원은 늘 똑같이 적습니다. 알 수 없으면 빈 문자열
- area, subtype: 그 과목의 분류표에서만 고릅니다.
- difficulty: 아래 기준으로 5단계.
- source: 문항이 어디서 왔는지 (${SOURCES.join(' / ')}). 교과서=교과서 본문·단어·활동 그대로, 부교재=학교가 쓴 자습서·워크북·프린트 느낌, 외부=교과서 밖 지문·자료, 기출변형=기출 문항의 숫자·조건만 바꾼 꼴.
  시험지만 보고 가늠하기 어려우면 빈 문자열로 두고 unsure 에 source 를 넣습니다. 지어내지 않습니다.
- answer: 정답지는 받지 않습니다. 문항을 직접 풀어서 적습니다. 객관식은 ①~⑤ 기호, 서술형은 모범답안 요지.
  풀어도 확신이 서지 않으면 그 자리를 비우지 말고 가장 그럴듯한 답을 적은 뒤 unsure 에 answer 를 넣습니다.
  지문이 잘려 보이거나 그림·표가 있어야 풀 수 있는 문항도 unsure 에 answer 를 넣습니다.
- reason: 난이도 판단 근거 한 줄(60자 이내). 지문 문장을 옮겨 적지 않습니다.
- unsure: 확신이 없는 칸 이름. 흐려서 읽기 어려움, 배점이 안 보임, 정답이 둘로 갈림, 유형이 둘에 걸침 등. 확신하면 빈 배열.
- notes: 읽지 못한 쪽, 잘린 문항, 시험지가 아닌 사진처럼 원장님이 알아야 할 것. 없으면 빈 문자열.

${DIFFICULTY}

${SUBJECT_NAMES.map(classifyOf).join('\n\n')}`;

const TONE = `## 말투
차분한 전문가의 존댓말. 과장·광고 문구·이모지 없음. 학부모가 한 번에 이해할 쉬운 말.

## 지킬 것
- 숫자는 받은 통계에 있는 값만 그대로 씁니다. 새 숫자를 만들지 않습니다.
- 문항표에 없는 사실(학교 평균, 작년 시험, 교과서 이름, 출제범위, 시험 날짜)을 쓰지 않습니다.
- 지문 문장을 길게 옮겨 적지 않습니다.`;

const schoolSystem = (s) => `당신은 한국 입시학원의 ${s} 내신 분석 담당 강사입니다. 원장님이 확인한 문항표와 계산된 통계로 학부모께 드릴 "학교 시험 분석" 글을 씁니다.

## 쓰는 것
- trends: 출제 경향 3~5개. 한 항목은 한 문장(90자 이내)으로, 원장님이 학부모께 그대로 읽어 줄 수 있게 씁니다.
  받은 통계에서 드러나는 것만 씁니다 (어느 단원·영역에 몰렸는지, 교과서 안에서 나왔는지 밖에서 나왔는지, 어디서 점수가 갈렸는지, 서술형이 무엇을 요구했는지).
  단원 통계(byUnit)가 있으면 단원 이야기를 반드시 한 줄 넣습니다. 통계에 없는 사실을 지어내지 않습니다.
- overview: 총평 2~3문장(180자 이내). 시험의 성격(교과서 기본형인지, 응용·추론형인지, 서술형 비중), 어려웠던 지점, 전체 난이도.
- flow: 문항이 어떤 순서로 흘렀는지 3~4개. 한 항목은 한 문장(100자 이내)이고 **반드시 문항 번호 구간으로 시작**합니다.
  앞쪽 기본 유형 → 중간 대표 유형 → 뒤쪽 변별 문항 → 서술형 순으로 나눕니다 (예: "1~6번은 단원별 기본 개념을 확인하는 문항이었습니다.").
  배점이 큰 문항을 말할 때는 배점을 함께 적습니다 ("17번은 7점 배점의 …"). 번호는 받은 통계(byPoints·byWeight·byDifficulty)의 번호만 씁니다.
- keyItems: 변별 문항 3개. 난이도 중상·상이면서 배점이 높은 문항을 우선합니다. why 는 왜 어려웠는지 1문장(60자 이내) (함정 선택지, 학년보다 높은 개념, 추론 단계).
- strategy: 이 시험에 나온 영역마다 1문장(40자 이내)씩 다음 시험 대비 방법. 구체적인 공부 활동으로 (예: ${GUIDE[s].strategy}).

${TONE}

${DIFFICULTY}

${classifyOf(s)}`;

const studentsSystem = (s) => `당신은 한국 입시학원의 ${s} 담임 강사입니다. 원장님이 확인한 문항표와 학생별 틀린 문항으로 학부모께 보낼 "학생 개인 리포트" 글을 씁니다.
학생은 학생1, 학생2 … 로 받습니다. 글에는 이 표기나 이름을 쓰지 않고 "이 학생"이라고 씁니다.

## 학생마다 쓰는 것 (받은 순서 그대로, 한 명도 빼지 않고)
- label: 받은 표기(학생1 …) 그대로
- summary: 1~2문장(100자 이내). 이 시험의 성격과 이 학생 결과 (통계의 점수·보완할 영역 사용).
- causes: 틀린 문항마다 하나. cause 는 아래 원인 중 가장 가능성 큰 것. explain 은 1~2문장(70자 이내): 이 문항이 무엇을 요구했는지, 왜 틀렸을 가능성이 큰지.
  - 학생이 고른 답(chosen)이 있으면 그 선택지가 왜 매력적이었는지로 원인을 좁힙니다.
  - 고른 답이 없으면 "~했을 가능성이 큽니다"처럼 추정으로 씁니다.
- directions: 학원에서 할 지도 방향 3개. 보완할 영역에 맞춘 구체적인 수업 활동 한 문장씩(각 40자 이내) (예: ${GUIDE[s].direction}).
틀린 문항이 없으면 causes 는 빈 배열, directions 는 지금 수준을 지키고 넓힐 활동으로 씁니다.

## 오답 원인
${GUIDE[s].causes.map(([name, what]) => `${name}: ${what}`).join('\n')}

${TONE}`;

const B64 = /^[A-Za-z0-9+/]+={0,2}$/;
const MAX_IMAGE_CHARS = 2_000_000;

function imageBlocks(list, min, max, label) {
  if (!Array.isArray(list) || list.length < min) throw new UserError(`${label} 사진을 올려 주세요`);
  if (list.length > max) throw new UserError(`${label} 사진은 ${max}장까지 올릴 수 있습니다`);
  return list.map((data) => {
    if (typeof data !== 'string' || data.length > MAX_IMAGE_CHARS || !B64.test(data)) throw new UserError(`${label} 사진을 읽지 못했습니다`);
    return { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data } };
  });
}

function cleanMeta(m) {
  const pick = (k) => String(m?.[k] ?? '').slice(0, 40).trim();
  const out = {
    subject: pick('subject'), school: pick('school'), grade: pick('grade'), term: pick('term'), exam: pick('exam'),
    date: pick('date'), minutes: Math.max(0, Math.min(300, Math.round(Number(m?.minutes) || 0))), range: String(m?.range ?? '').slice(0, 120).trim(),
  };
  if (!Object.hasOwn(SUBJECTS, out.subject)) throw new UserError('과목을 골라 주세요');
  if (!out.school || !out.grade) throw new UserError('학교와 학년을 적어 주세요');
  return out;
}

function cleanItems(list, subject) {
  if (!Array.isArray(list) || list.length < 1 || list.length > 60) throw new UserError('문항표를 다시 만들어 주세요');
  const txt = (v, max) => String(v ?? '').slice(0, max);
  const seen = new Set();
  return list.map((it) => {
    const no = Number(it?.no);
    if (!Number.isInteger(no) || !KINDS.includes(it.kind) || !SUBJECTS[subject].includes(it.area) || !DIFF5.includes(it.difficulty)) {
      throw new UserError(`${it?.no}번 문항의 칸을 확인해 주세요`);
    }
    if (seen.has(no)) throw new UserError(`${no}번 문항이 두 번 있습니다`);
    seen.add(no);
    return {
      no, kind: it.kind, points: Number(it.points) || 0, unit: txt(it.unit, 30).trim(), area: it.area, subtype: txt(it.subtype, 40), difficulty: it.difficulty,
      source: SOURCES.includes(it.source) ? it.source : '', // 모르면 빈 칸 — 원장님이 확인 표에서 고른다
      answer: txt(it.answer, 200), reason: txt(it.reason, 200),
    };
  });
}

function cleanStudents(list, nos) {
  if (!Array.isArray(list) || list.length < 1 || list.length > 10) throw new UserError('학생은 한 번에 1~10명까지 보낼 수 있습니다');
  return list.map((s) => ({
    label: String(s?.label ?? '').slice(0, 20),
    wrong: (Array.isArray(s?.wrong) ? s.wrong : [])
      .filter((w) => nos.has(Number(w?.no)))
      .map((w) => ({ no: Number(w.no), chosen: String(w.chosen ?? '').slice(0, 10) })),
  }));
}

// 과목과 맞지 않는 영역을 고르면 그 과목 첫 영역으로 두고 원장님 확인 칸으로 표시한다
function fitArea(item, subject) {
  if (SUBJECTS[subject].includes(item.area)) return item;
  return { ...item, area: SUBJECTS[subject][0], unsure: [...new Set([...item.unsure, 'area'])] };
}

// 과목·학년을 알면 그 학년 교육과정을 프롬프트에 붙인다. 모르면 빈 문자열이라 지금 동작 그대로다.
// 단원은 enum 으로 묶지 않는다 — 교과서 단원은 목록 밖에 있을 수 있고 시험지에 적힌 말이 우선이다.
// 영어는 GUIDE 에 이미 영역·세부유형 분류가 있어 성취기준을 넣으면 오히려 흐려진다. 대신 문법 항목표를 준다.
function gradeGuide(subject, grade) {
  const units = unitsFor(subject, grade);
  const grammar = subject === '영어' ? grammarFor(grade) : [];
  const points = subject === '영어' ? [] : pointsFor(subject, grade);
  if (!units.length && !grammar.length && !points.length) return '';
  return ['', '', `${grade} ${subject} 교육과정 (2022 개정)`,
    units.length ? `단원 후보: ${units.join(' / ')}` : '',
    units.length ? '  시험지에 적힌 단원 이름을 그대로 적되, 뜻이 같은 것이 위 목록에 있으면 목록의 말로 적습니다.' : '',
    '  단원은 시험지·출제 범위에 적힌 말로 적고, 같은 단원은 한 시험지 안에서 늘 똑같이 적습니다.',
    points.length ? `세부 포인트 후보: ${points.join(' / ')}` : '',
    grammar.length ? `문법 항목 (어법 문항의 세부 포인트는 이 이름으로): ${grammar.join(' / ')}` : '',
  ].filter((line, i) => i < 2 || line).join('\n');
}

export function extractRequest(body) {
  const pages = imageBlocks(body.pages, 1, 6, '시험지');
  const content = [{ type: 'text', text: '시험지 사진 (쪽 순서대로):' }, ...pages];
  content.push({ type: 'text', text: `머리글에서 시험 정보를 읽고 문항표를 만들어 주세요.${gradeGuide(body.subject, body.grade)}` });
  return {
    system: EXTRACT_SYSTEM, schema: EXTRACT_SCHEMA, content, maxTokens: 32000,
    finish: (out) => ({
      meta: out.meta,
      items: [...out.items].sort((a, b) => a.no - b.no).map((it) => fitArea(it, out.meta.subject)),
      notes: out.notes,
    }),
  };
}

export function reportRequest(body) {
  const meta = cleanMeta(body.meta);
  const items = cleanItems(body.items, meta.subject);
  const stats = examStats(items);
  if (body.mode === 'school') {
    return {
      system: schoolSystem(meta.subject), schema: SCHOOL_SCHEMA, maxTokens: 16000,
      content: [{ type: 'text', text: `다음 자료로 학교 시험 분석 글을 써 주세요.\n${JSON.stringify({ 시험: meta, 통계: stats, 문항표: items })}` }],
      finish: (out) => ({ ...out, keyItems: out.keyItems.filter((k) => items.some((it) => it.no === k.no)) }),
    };
  }
  if (body.mode === 'students') {
    const students = cleanStudents(body.students, new Set(items.map((it) => it.no)));
    // 원장님이 적은 표기는 AI 로 보내지 않는다. 학생1.. 로 보내고 finish 에서 순서대로 되돌린다.
    const withStats = students.map((s, i) => ({ label: `학생${i + 1}`, wrong: s.wrong, 통계: studentStats(items, s.wrong) }));
    return {
      system: studentsSystem(meta.subject), schema: studentsSchema(meta.subject), maxTokens: 32000,
      content: [{ type: 'text', text: `다음 자료로 학생 ${students.length}명의 개인 리포트 글을 받은 순서대로 써 주세요.\n${JSON.stringify({ 시험: meta, 시험통계: stats, 문항표: items, 학생들: withStats })}` }],
      finish: (out) => {
        if (out.students.length !== students.length) throw new Error(`학생 수가 맞지 않음 ${out.students.length}/${students.length}`);
        return {
          students: out.students.map((s, i) => {
            const wrong = new Set(students[i].wrong.map((w) => w.no));
            const causes = s.causes.filter((c) => wrong.has(c.no)).sort((a, b) => a.no - b.no);
            return { ...s, causes, label: students[i].label };
          }),
        };
      },
    };
  }
  throw new UserError('mode 는 school 또는 students 입니다');
}
