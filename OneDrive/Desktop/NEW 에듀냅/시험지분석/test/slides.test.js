import test from 'node:test';
import assert from 'node:assert/strict';
import { slideDeck, flowChart, donut } from '../public/slides.js';
import { examStats, difficultyFlow } from '../public/lib.js';

const items = [
  { no: '1', kind: '객관식', points: 4, unit: '5과', area: '어휘', subtype: '영영풀이', difficulty: '하', source: '교과서', answer: '③', teach: '풀이' },
  { no: '2', kind: '객관식', points: 4, unit: '5과', area: '독해', subtype: '빈칸', difficulty: '중', source: '외부', answer: '②', teach: '풀이' },
  { no: '3', kind: '객관식', points: 6, unit: '6과', area: '어법', subtype: '관계대명사', difficulty: '중상', source: '', answer: '①', teach: '풀이' },
  { no: '서답형 1', kind: '서술형', points: 6, unit: '6과', area: '어법', subtype: '조건 영작', difficulty: '상', source: '', answer: 'x', teach: '풀이' },
];
const ctx = {
  academy: { name: '에듀냅학원', phone: '031-000-0000', logo: '', color: '#03392A' },
  meta: { subject: '영어', school: '에듀냅중학교', grade: '중2', term: '1학기', exam: '중간고사', date: '2026-04-23' },
  items,
  stats: examStats(items),
};
const school = {
  overview: '후반부에서 변별이 갈린 시험이었습니다.',
  trends: ['교과서 안에서 대부분 나왔습니다.', '어법 비중이 높았습니다.'],
  flow: ['1~2번은 기본 유형이었습니다.'],
  keyItems: [{ no: '3', why: '관계대명사 두 용법을 함께 물었습니다. 앞 절만 보고 고르면 틀립니다.' }],
  strategy: [{ area: '어법', tip: '두 용법을 문장으로 구분해 쓰기' }],
  keywords: ['후반부 난도 상승', '어법 비중 확대', '교과서 중심', '서술형 조건 영작'],
  whyHard: [
    { title: '조건 해석', detail: '조건을 모두 지켜야 점수가 났습니다.' },
    { title: '개념 연결', detail: '두 용법을 한 문항에서 함께 물었습니다.' },
    { title: '시간 배분', detail: '뒤쪽에 어려운 문항이 몰렸습니다.' },
  ],
  message: '많이 푸는 것보다 왜 그 답인지 말할 수 있어야 합니다.',
};

const 장들 = (html) => html.match(/class="page slide"/g) || [];

// 제목은 `시험 <b>한눈에</b>` 처럼 마지막 낱말만 강조색이라, 태그를 걷고 읽는다
const 글자 = (html) => html.replace(/<[^>]+>/g, '');

test('슬라이드는 16:9 한 벌로 나오고, 표지부터 총평까지 이어진다', () => {
  const html = slideDeck(ctx, school);
  assert.ok(장들(html).length >= 10, `장수 ${장들(html).length}`);
  const 글 = 글자(html);
  ['이번 시험 분석', '시험 한눈에', '난도 흐름', '시험 구성', '영역 × 난이도',
    '어려웠던 이유', '대표 문항', '학습 방향', '이번 시험 총평'].forEach((t) => assert.ok(글.includes(t), t));
});

test('표지에는 핵심 키워드 넷과 한 줄 총평이 들어간다', () => {
  const html = slideDeck(ctx, school);
  school.keywords.forEach((k) => assert.match(html, new RegExp(k)));
  assert.match(html, /후반부에서 변별이 갈린 시험이었습니다/);
});

test('심층분석은 대표 문항마다 한 장, 최대 세 장까지', () => {
  const 다섯 = { ...school, keyItems: ['1', '2', '3', '서답형 1', '1'].map((no, i) => ({ no, why: `이유${i}` })) };
  const html = slideDeck(ctx, 다섯);
  assert.equal((html.match(/심층 분석/g) || []).length, 3);
  // 문항표에 없는 번호는 장을 만들지 않는다
  assert.doesNotMatch(slideDeck(ctx, { ...school, keyItems: [{ no: '없음', why: 'x' }] }), /심층 분석/);
});

test('우리 학원 대비 장은 원장님이 적어 두었을 때만 나온다', () => {
  assert.doesNotMatch(slideDeck(ctx, school), /이렇게 대비했습니다/);
  const 적음 = slideDeck({ ...ctx, academy: { ...ctx.academy, prep: '4주 전부터 대비했습니다.' } }, school);
  assert.match(적음, /이렇게 대비했습니다/);
  assert.match(적음, /4주 전부터 대비했습니다/);
});

test('슬라이드에 학생 이름·점수와 지문·정답이 새지 않는다', () => {
  const html = slideDeck(ctx, school);
  assert.doesNotMatch(html, /김OO|학생/);
  assert.doesNotMatch(html, /정답/);
  assert.doesNotMatch(html, /풀이/); // teach 는 학원용 해설에만
});

test('AI 글은 그대로 넣지 않는다', () => {
  const html = slideDeck(ctx, { ...school, overview: '<script>나쁨</script>', message: '<b>굵게' });
  assert.doesNotMatch(html, /<script>나쁨|<b>굵게/);
});

test('꺾은선은 문항 수만큼 점을 찍고 어려워지는 구간을 따로 그린다', () => {
  const svg = flowChart(difficultyFlow(items));
  assert.equal((svg.match(/<circle/g) || []).length, 4);
  assert.match(svg, /class="f-hard"/);     // 중상·상이 연달아 둘 → 뒤 구간
  assert.match(svg, /<svg[^>]*viewBox=/);
  // 어려운 구간이 없으면 뒷선도 없다
  const 쉬움 = difficultyFlow(items.map((it) => ({ ...it, difficulty: '중' })));
  assert.doesNotMatch(flowChart(쉬움), /class="f-hard"/);
});

test('도넛은 비율대로 한 바퀴를 채우고 가운데에 체감 난이도를 쓴다', () => {
  const html = donut(ctx.stats);
  assert.match(html, /conic-gradient/);
  assert.match(html, /보통|조금 어려움|어려움/); // overallLabel
  ctx.stats.byDifficulty.forEach((r) => assert.match(html, new RegExp(`${r.label}`)));
});

test('빈 문항표로도 터지지 않는다', () => {
  const 빈 = { ...ctx, items: [], stats: examStats([]) };
  const html = slideDeck(빈, { ...school, keyItems: [], strategy: [], trends: [], whyHard: [], keywords: [] });
  assert.ok(장들(html).length >= 6);
});
