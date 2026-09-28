// 문항 초안 만들기 요청과 결과 검사. 키 없이 테스트할 수 있게 부르기(askJson)와 나눴다.
import { SECTION_KO, MIN_STEP, labelOf, stepData, unitName } from '../public/core/scale.js';
import { validateItem } from '../public/core/bank.js';

export const KINDS = {
  vocab: ['뜻 고르기', '문맥 빈칸', '영영풀이', '유의어·반의어'],
  grammar: ['빈칸 어법', '틀린 것 고르기', '문장 전환', '어순'],
  reading: ['세부 정보', '주제·제목', '요지·주장', '목적·심경', '내용 일치', '빈칸', '순서·삽입', '무관한 문장', '함축 의미', '요약'],
  listening: ['세부 정보', '화자 의도', '장소·관계', '이어질 응답', '담화 주제', '금액', '도표', '언급되지 않은 것', '상황에 알맞은 말'],
};

const str = { type: 'string' };
export const ITEMS_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['items'],
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['kind', 'passage', 'question', 'choices', 'answer', 'explain_ko'],
        properties: { kind: str, passage: str, question: str, choices: { type: 'array', items: str }, answer: { type: 'integer' }, explain_ko: str },
      },
    },
  },
};

const SYSTEM = `당신은 한국 중고등학생 영어 레벨테스트 문항 출제자입니다.

공통 규칙
- 모든 지문·대본·문장·선택지는 새로 씁니다. 교과서, 참고서, 단어장, 모의고사, 수능의 지문과 문항을 옮기거나 조금 바꿔 쓰지 않습니다.
- 한 문항은 요청한 "단원" 하나만 묻습니다. 그보다 높은 학기의 문법·어휘를 알아야 풀리는 문항을 만들지 않습니다.
- 선택지는 정확히 4개이고 서로 다르며 정답은 하나입니다. answer 는 정답 선택지의 0부터 센 번호이고, 정답 위치를 골고루 섞습니다.
- 오답 선택지는 그 단원을 모르는 학생이 고를 만한 것으로 만듭니다.
- question 은 한국어 발문(예: "빈칸에 들어갈 말로 가장 알맞은 것은?")에 필요한 영어 문장을 붙인 것, explain_ko 는 원장용 한국어 해설 한 줄입니다.
- kind 는 받은 유형 목록 중 하나를 그대로 씁니다.

영역별
- 단어: passage 는 빈 문자열. 받은 낱말 목록에서만 표제어를 고릅니다.
- 문법: passage 는 빈 문자열. 영어 문장은 question 에 넣습니다.
- 독해: passage 에 영어 지문 하나, 문항당 지문 하나입니다. 지문 단어 수와 평균 문장 길이를 지킵니다.
- 듣기: passage 에 영어 대본. 줄마다 "W: " 또는 "M: " 으로 시작합니다(한 사람의 담화면 한 사람만). 대본 단어 수를 지킵니다. 학생은 대본을 보지 못하고 question 과 choices 만 봅니다.`;

const nameOf = (u) => (typeof u === 'string' ? u : u.name);

export function genRequest({ section, step, unit, count = 4, words = [] }) {
  const s = stepData(step);
  if (section === 'vocab' && !words.length) throw new Error('단어 문항은 그 학기 Day 의 낱말 목록이 필요합니다 (data/words.csv)');
  const learned = [
    ...(step > MIN_STEP ? stepData(step - 1)[section].map(nameOf) : []),
    ...s[section].slice(0, unit - 1).map(nameOf),
  ];
  const ask = {
    영역: SECTION_KO[section],
    학기: labelOf(step),
    수준: s.mock || `${labelOf(step)} 학교 수업 수준`,
    단원: `${unit}단원 — ${unitName(section, step, unit)}`,
    이미_배운_단원: learned,
    유형_목록: KINDS[section],
    문항_수: count,
    ...(section === 'reading' && { 지문_단어_수: s.gen.readWords, 평균_문장_길이: s.gen.sentLen }),
    ...(section === 'listening' && { 대본_단어_수: s.gen.listenWords }),
    ...(section === 'vocab' && { 낱말_목록: words }),
  };
  return {
    system: SYSTEM,
    content: [{ type: 'text', text: `다음 조건으로 문항 ${count}개를 만들어 주세요.\n${JSON.stringify(ask, null, 1)}` }],
    schema: ITEMS_SCHEMA,
    maxTokens: 16000,
  };
}

export function toItems(json, { section, step, unit }, makeId) {
  return (json?.items ?? [])
    .map((x) => ({ id: makeId(), section, step, unit, kind: x.kind, passage: x.passage ?? '', question: x.question, choices: x.choices, answer: x.answer, explain_ko: x.explain_ko, status: 'draft' }))
    .filter((it) => validateItem(it).length === 0);
}

// data/words.csv — 첫 줄 제목, 줄마다 book,day,word,meaning (뜻에 쉼표가 있어도 된다). 엑셀에서 "CSV UTF-8" 로 저장한다.
export function parseWordsCsv(text) {
  return text.replace(/^﻿/, '').split(/\r?\n/).slice(1).filter((l) => l.trim()).map((l) => {
    const [book, day, word, ...meaning] = l.split(',');
    return { book: book.trim(), day: Number(day), word: word?.trim(), meaning: meaning.join(',').trim() };
  }).filter((w) => w.book && w.day && w.word);
}

const flat = (s) => s.replace(/\s/g, '');

export function wordsFor(list, src) {
  return list.filter((w) => flat(w.book) === flat(src.book) && w.day >= src.days[0] && w.day <= src.days[1]).map((w) => `${w.word} (${w.meaning})`);
}
