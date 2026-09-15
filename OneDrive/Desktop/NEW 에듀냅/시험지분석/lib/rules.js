// AI 판단 기준(설계서 4장)과 요청 검증. 사진·학생 정보는 여기서 걸러서만 AI 로 간다.
import { AREAS, DIFF5, KINDS, CAUSES, examStats, studentStats } from '../public/lib.js';
import { UserError } from './http.js';

const UNSURE_FIELDS = ['points', 'area', 'subtype', 'difficulty', 'answer'];

const obj = (properties) => ({ type: 'object', additionalProperties: false, required: Object.keys(properties), properties });
const arr = (items) => ({ type: 'array', items });
const str = { type: 'string' };
const int = { type: 'integer' };
const oneOf = (list) => ({ type: 'string', enum: list });

export const EXTRACT_SCHEMA = obj({
  items: arr(obj({
    no: int, kind: oneOf(KINDS), points: { type: 'number' }, area: oneOf(AREAS), subtype: str,
    difficulty: oneOf(DIFF5), answer: str, reason: str, unsure: arr(oneOf(UNSURE_FIELDS)),
  })),
  notes: str,
});

export const SCHOOL_SCHEMA = obj({
  overview: str,
  keyItems: arr(obj({ no: int, why: str })),
  strategy: arr(obj({ area: str, tip: str })),
});

export const STUDENTS_SCHEMA = obj({
  students: arr(obj({
    label: str, summary: str,
    causes: arr(obj({ no: int, cause: oneOf(CAUSES), explain: str })),
    directions: arr(str),
  })),
});

const CLASSIFY = `## 영역 분류표
어휘: 문맥 어휘, 영영풀이, 품사·파생어, 숙어·표현
어법: 문법 포인트명으로 적는다 (시제, 수일치, to부정사, 동명사, 분사, 관계사, 접속사, 수동태, 비교, 가정법, 도치 …), 어법 개수 고르기
대화문: 대화 흐름·응답, 의사소통 기능 표현
독해: 주제·제목·요지, 내용 일치/불일치, 빈칸, 순서, 문장 삽입, 무관한 문장, 지칭, 목적·심경, 요약, 답할 수 없는 질문
서술형: 조건 영작, 문장 변형·전환, 배열 영작, 빈칸 쓰기, 요약 쓰기, 우리말 해석
듣기: 시험지에 듣기 문항이 있을 때만
서술형 문항은 area 를 서술형으로 두고 무엇을 묻는지 subtype 에 적는다 (예: 조건 영작 - 관계대명사).

## 난이도 기준 (그 학년 기준)
하: 교과서 기본 표현·문법 확인, 한 번 읽으면 풀린다
중하: 기본 개념 적용, 함정이 거의 없다
중: 지문 이해나 문법 적용이 한 단계 필요, 선택지 한두 개가 헷갈린다
중상: 추론 두 단계 이상, 학년보다 높은 구문·어휘, 비슷한 선택지 함정, 조건이 여러 개인 서술형
상: 긴 지문 전체 흐름과 세밀한 근거 대조, 학년 범위를 넘는 개념, 배점이 높고 정답률이 낮을 문항
배점이 높을수록 학교가 어렵게 낸 문항일 가능성이 크지만 배점만으로 정하지 않는다.`;

const EXTRACT_SYSTEM = `당신은 한국 중·고등학교 영어 내신 시험지를 분석하는 20년차 입시학원 영어 강사입니다.
원장님이 올린 시험지 사진을 읽고 문항표를 만듭니다. 원장님이 이 표를 확인한 뒤 학부모 자료가 됩니다.

## 할 일
사진에 있는 모든 문항을 번호 순서대로 한 줄씩 적습니다. 한 문항이 두 쪽에 걸쳐도 한 줄입니다.
세트 문항(예: [9~10] 다음 글을 읽고)은 번호마다 따로 적습니다.

## 칸
- no: 문항 번호. 서술형이 "서술형 1"처럼 따로 번호가 매겨져 있으면 객관식 마지막 번호 뒤에 이어 붙이고 reason 앞에 "(서술형 1)"을 적습니다.
- kind: 객관식 / 서술형
- points: 시험지에 적힌 배점. 안 보이면 남은 점수를 나눈 추정값을 쓰고 unsure 에 points 를 넣습니다.
- area, subtype: 아래 분류표에서 고릅니다. 어법은 subtype 에 문법 포인트명을 적습니다 (예: 관계대명사 what).
- difficulty: 아래 기준으로 5단계.
- answer: 정답지 사진이 있으면 그대로 따릅니다. 없으면 직접 풀어서 적습니다. 객관식은 ①~⑤ 기호, 서술형은 모범답안 요지.
- reason: 난이도 판단 근거 한 줄(60자 이내). 지문 문장을 옮겨 적지 않습니다.
- unsure: 확신이 없는 칸 이름. 흐려서 읽기 어려움, 배점이 안 보임, 정답이 둘로 갈림, 유형이 둘에 걸침 등. 확신하면 빈 배열.
- notes: 읽지 못한 쪽, 잘린 문항, 시험지가 아닌 사진처럼 원장님이 알아야 할 것. 없으면 빈 문자열.

${CLASSIFY}`;

const TONE = `## 말투
차분한 전문가의 존댓말. 과장·광고 문구·이모지 없음. 학부모가 한 번에 이해할 쉬운 말.

## 지킬 것
- 숫자는 받은 통계에 있는 값만 그대로 씁니다. 새 숫자를 만들지 않습니다.
- 문항표에 없는 사실(학교 평균, 작년 시험, 교과서 이름, 출제범위, 시험 날짜)을 쓰지 않습니다.
- 지문 문장을 길게 옮겨 적지 않습니다.`;

const SCHOOL_SYSTEM = `당신은 한국 입시학원의 영어 내신 분석 담당 강사입니다. 원장님이 확인한 문항표와 계산된 통계로 학부모께 드릴 "학교 시험 분석" 글을 씁니다.

## 쓰는 것
- overview: 총평 2~3문장(180자 이내). 시험의 성격(교과서 기본형인지, 독해·추론형인지, 서술형 비중), 어려웠던 지점, 전체 난이도.
- keyItems: 변별 문항 3개. 난이도 중상·상이면서 배점이 높은 문항을 우선합니다. why 는 왜 어려웠는지 1문장(60자 이내) (함정 선택지, 학년보다 높은 개념, 추론 단계).
- strategy: 이 시험에 나온 영역마다 1문장(40자 이내)씩 다음 시험 대비 방법. 구체적인 공부 활동으로 (예: 교과서 본문 문장을 조건 영작으로 바꿔 써 보기).

${TONE}

${CLASSIFY}`;

const STUDENTS_SYSTEM = `당신은 한국 입시학원의 영어 담임 강사입니다. 원장님이 확인한 문항표와 학생별 틀린 문항으로 학부모께 보낼 "학생 개인 리포트" 글을 씁니다.
학생은 받은 표기(성+OO, 이니셜) 그대로 부릅니다.

## 학생마다 쓰는 것 (받은 순서 그대로, 한 명도 빼지 않고)
- label: 받은 표기 그대로
- summary: 1~2문장(100자 이내). 이 시험의 성격과 이 학생 결과 (통계의 점수·보완할 영역 사용).
- causes: 틀린 문항마다 하나. cause 는 아래 원인 중 가장 가능성 큰 것. explain 은 1~2문장(70자 이내): 이 문항이 무엇을 요구했는지, 왜 틀렸을 가능성이 큰지.
  - 학생이 고른 답(chosen)이 있으면 그 선택지가 왜 매력적이었는지로 원인을 좁힙니다.
  - 고른 답이 없으면 "~했을 가능성이 큽니다"처럼 추정으로 씁니다.
- directions: 학원에서 할 지도 방향 3개. 보완할 영역에 맞춘 구체적인 수업 활동 한 문장씩(각 40자 이내) (예: 매 수업 관계사 문장 5개를 조건 영작으로 쓰고 첨삭).
틀린 문항이 없으면 causes 는 빈 배열, directions 는 지금 수준을 지키고 넓힐 활동으로 씁니다.

## 오답 원인
어휘 부족: 핵심 단어·표현 뜻을 몰라 틀림
문법 개념 미흡: 해당 문법 규칙을 모르거나 헷갈림
구문 해석 오류: 긴 문장 구조를 잘못 끊어 읽음
단서 놓침·추론 오류: 지문의 근거를 못 찾거나 잘못 연결함
선택지 함정: 부분만 맞는 선택지를 고름
조건 누락: 서술형 조건(단어 수·형태 등)을 빠뜨림
시간 부족·실수: 쉬운 문항인데 틀림, 마지막 문항에 몰림

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
  const out = { school: pick('school'), grade: pick('grade'), term: pick('term'), exam: pick('exam') };
  if (!out.school || !out.grade) throw new UserError('학교와 학년을 적어 주세요');
  return out;
}

function cleanItems(list) {
  if (!Array.isArray(list) || list.length < 1 || list.length > 60) throw new UserError('문항표를 다시 만들어 주세요');
  const txt = (v, max) => String(v ?? '').slice(0, max);
  return list.map((it) => {
    const no = Number(it?.no);
    if (!Number.isInteger(no) || !KINDS.includes(it.kind) || !AREAS.includes(it.area) || !DIFF5.includes(it.difficulty)) {
      throw new UserError(`${it?.no}번 문항의 칸을 확인해 주세요`);
    }
    return { no, kind: it.kind, points: Number(it.points) || 0, area: it.area, subtype: txt(it.subtype, 40), difficulty: it.difficulty, answer: txt(it.answer, 200), reason: txt(it.reason, 200) };
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

export function extractRequest(body) {
  const meta = cleanMeta(body.meta);
  const pages = imageBlocks(body.pages, 1, 6, '시험지');
  const answers = imageBlocks(body.answers ?? [], 0, 2, '정답지');
  const content = [{ type: 'text', text: '시험지 사진 (쪽 순서대로):' }, ...pages];
  if (answers.length) content.push({ type: 'text', text: '정답지 사진:' }, ...answers);
  content.push({ type: 'text', text: `${meta.school} ${meta.grade} ${meta.term} ${meta.exam} 영어 시험입니다. 문항표를 만들어 주세요.` });
  return {
    system: EXTRACT_SYSTEM, schema: EXTRACT_SCHEMA, content, maxTokens: 32000,
    finish: (out) => ({ items: [...out.items].sort((a, b) => a.no - b.no), notes: out.notes }),
  };
}

export function reportRequest(body) {
  const meta = cleanMeta(body.meta);
  const items = cleanItems(body.items);
  const stats = examStats(items);
  if (body.mode === 'school') {
    return {
      system: SCHOOL_SYSTEM, schema: SCHOOL_SCHEMA, maxTokens: 16000,
      content: [{ type: 'text', text: `다음 자료로 학교 시험 분석 글을 써 주세요.\n${JSON.stringify({ 시험: meta, 통계: stats, 문항표: items })}` }],
      finish: (out) => out,
    };
  }
  if (body.mode === 'students') {
    const students = cleanStudents(body.students, new Set(items.map((it) => it.no)));
    const withStats = students.map((s) => ({ ...s, 통계: studentStats(items, s.wrong) }));
    return {
      system: STUDENTS_SYSTEM, schema: STUDENTS_SCHEMA, maxTokens: 32000,
      content: [{ type: 'text', text: `다음 자료로 학생 ${students.length}명의 개인 리포트 글을 받은 순서대로 써 주세요.\n${JSON.stringify({ 시험: meta, 시험통계: stats, 문항표: items, 학생들: withStats })}` }],
      finish: (out) => {
        if (out.students.length !== students.length) throw new Error(`학생 수가 맞지 않음 ${out.students.length}/${students.length}`);
        return { students: out.students.map((s, i) => ({ ...s, label: students[i].label })) };
      },
    };
  }
  throw new UserError('mode 는 school 또는 students 입니다');
}
