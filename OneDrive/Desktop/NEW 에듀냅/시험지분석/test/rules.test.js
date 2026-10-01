import test from 'node:test';
import assert from 'node:assert/strict';
import { EXTRACT_SCHEMA, SCHOOL_SCHEMA, studentsSchema, GUIDE, extractRequest, reportRequest } from '../lib/rules.js';
import { SUBJECTS, SOURCES } from '../public/lib.js';
import { UserError } from '../lib/http.js';

function strict(schema, path = '$') {
  if (schema.type === 'object') {
    assert.equal(schema.additionalProperties, false, path);
    assert.deepEqual([...schema.required].sort(), Object.keys(schema.properties).sort(), path);
    for (const [k, v] of Object.entries(schema.properties)) strict(v, `${path}.${k}`);
  }
  if (schema.type === 'array') strict(schema.items, `${path}[]`);
}

test('스키마는 구조화 출력 규칙(모든 칸 필수, 추가 칸 금지)을 지킨다', () => {
  [EXTRACT_SCHEMA, SCHOOL_SCHEMA, ...Object.keys(SUBJECTS).map(studentsSchema)].forEach((s) => strict(s));
  assert.deepEqual(Object.keys(GUIDE), Object.keys(SUBJECTS));
});

const img = Buffer.from('fake image').toString('base64');
const meta = { subject: '영어', school: '에듀냅중학교', grade: '중2', term: '1학기', exam: '중간고사' };

test('extractRequest 는 시험지 사진만 이미지 블록으로 만들고 결과를 번호순으로 정리한다', () => {
  const r = extractRequest({ pages: [img, img] });
  assert.equal(r.schema, EXTRACT_SCHEMA);
  assert.equal(r.content.filter((b) => b.type === 'image').length, 2);
  // 정답지는 받지 않는다. 보내도 사진으로 들어가지 않는다
  assert.equal(extractRequest({ pages: [img], answers: [img, img] }).content.filter((b) => b.type === 'image').length, 1);
  const out = r.finish({ meta: { ...meta, subject: '수학' }, items: [{ no: 2, area: '함수', unsure: [] }, { no: 1, area: '독해', unsure: ['answer'] }], notes: '' });
  assert.deepEqual(out.items.map((i) => i.no), [1, 2]);
  assert.equal(out.meta.subject, '수학');
  // 수학 시험에 영어 영역이 오면 수학 첫 영역으로 두고 확인 칸으로 표시한다
  assert.deepEqual([out.items[0].area, out.items[0].unsure], ['수와 연산', ['answer', 'area']]);
  assert.deepEqual([out.items[1].area, out.items[1].unsure], ['함수', []]);
});

test('extractRequest 는 잘못된 입력을 막는다', () => {
  assert.throws(() => extractRequest({ pages: [] }), UserError);
  assert.throws(() => extractRequest({ pages: Array(7).fill(img) }), UserError);
  assert.throws(() => extractRequest({ pages: ['<script>'] }), UserError);
});

const items = [
  { no: 1, kind: '객관식', points: 50, area: '어휘', subtype: '문맥 어휘', difficulty: '하', answer: '③', reason: '기본 어휘' },
  { no: 2, kind: '서술형', points: 50, area: '어법', subtype: '가정법 - 조건 영작', difficulty: '상', answer: 'I wish I were', reason: '조건 3개' },
];

test('reportRequest school 은 서버에서 계산한 통계를 넘긴다', () => {
  const r = reportRequest({ mode: 'school', meta, items });
  assert.equal(r.schema, SCHOOL_SCHEMA);
  assert.match(r.content[0].text, /"hardPct":50/);
});

test('reportRequest students 는 학생 수를 확인하고 표기를 되돌린다', () => {
  const students = [{ label: '김OO', wrong: [{ no: 2, chosen: '' }, { no: 99, chosen: '' }] }, { label: 'B', wrong: [] }];
  const r = reportRequest({ mode: 'students', meta, items, students });
  assert.deepEqual(r.schema, studentsSchema('영어'));
  assert.doesNotMatch(r.content[0].text, /99/);
  const one = { summary: 's', causes: [], directions: [] };
  const out = r.finish({ students: [{ label: '김OO 학생', ...one }, { label: 'B', ...one }] });
  assert.equal(out.students[0].label, '김OO');
  assert.throws(() => r.finish({ students: [] }));
  assert.throws(() => reportRequest({ mode: 'students', meta, items, students: Array(11).fill(students[1]) }), UserError);
  assert.throws(() => reportRequest({ mode: 'x', meta, items }), UserError);
  assert.throws(() => reportRequest({ mode: 'school', meta, items: [{ ...items[0], area: '문학' }] }), UserError);
  assert.throws(() => reportRequest({ mode: 'school', meta: { ...meta, subject: '체육' }, items }), UserError);
  assert.throws(() => reportRequest({ mode: 'school', meta: { ...meta, subject: 'constructor' }, items }), UserError);
  assert.throws(() => reportRequest({ mode: 'school', meta: { ...meta, school: '' }, items }), UserError);
});

test('문항마다 출처를 받아 통계까지 넘긴다', () => {
  const field = EXTRACT_SCHEMA.properties.items.items.properties.source;
  assert.deepEqual(field.enum, [...SOURCES, '']); // 시험지만 보고 모를 때가 있어 빈 칸도 고를 수 있다
  assert.ok(EXTRACT_SCHEMA.properties.items.items.properties.unsure.items.enum.includes('source'));
  const r = reportRequest({ mode: 'school', meta, items: items.map((it) => ({ ...it, source: '교과서' })) });
  assert.match(r.content[0].text, /"source":"교과서"/);
  assert.match(r.content[0].text, /"bySource":\[\{"label":"교과서","count":2/);
  // 목록에 없는 출처나 빈 출처는 빈 칸으로 둔다 (원장님이 확인 표에서 고른다)
  assert.match(reportRequest({ mode: 'school', meta, items }).content[0].text, /"source":""/);
  assert.match(reportRequest({ mode: 'school', meta, items: items.map((it) => ({ ...it, source: '인터넷' })) }).content[0].text, /"source":""/);
});

test('시험 정보에 날짜·시간·범위를, 문항에 단원을 받는다', () => {
  const m = EXTRACT_SCHEMA.properties.meta.properties;
  ['date', 'minutes', 'range'].forEach((k) => assert.ok(m[k], k));
  assert.ok(EXTRACT_SCHEMA.properties.items.items.properties.unit);
  // 학교 분석 글에는 출제 경향 항목이 들어간다
  assert.ok(SCHOOL_SCHEMA.properties.trends);

  const full = { ...meta, date: '2026-09-30', minutes: 45, range: '동아(이병민) 5과 · 6과' };
  const withUnit = items.map((it, i) => ({ ...it, unit: i ? '6과' : '5과' }));
  const r = reportRequest({ mode: 'school', meta: full, items: withUnit });
  assert.match(r.content[0].text, /"range":"동아\(이병민\) 5과 · 6과"/);
  assert.match(r.content[0].text, /"byUnit":\[\{"label":"5과"/);

  // 날짜·시간·범위·단원은 없어도 된다 (시험지에 안 적혀 있을 수 있다)
  const bare = reportRequest({ mode: 'school', meta, items });
  assert.match(bare.content[0].text, /"date":"","minutes":0,"range":""/);
  assert.match(bare.content[0].text, /"byUnit":\[\]/);
});

test('reportRequest 는 같은 번호가 두 번 있으면 막는다', () => {
  assert.throws(() => reportRequest({ mode: 'school', meta, items: [items[0], { ...items[1], no: 1 }] }), (e) => e instanceof UserError && e.message === '1번 문항이 두 번 있습니다');
});

test('reportRequest students 는 AI 에 학생1.. 로만 보내고 결과에서 표기를 되돌린다', () => {
  const students = [{ label: '김OO', wrong: [{ no: 2, chosen: '' }] }, { label: 'KM', wrong: [] }];
  const r = reportRequest({ mode: 'students', meta, items, students });
  const text = r.content[0].text;
  assert.doesNotMatch(text, /김OO|KM/);
  assert.match(text, /"label":"학생1"/);
  assert.match(text, /"label":"학생2"/);
  const out = r.finish({ students: [
    { label: '학생1', summary: 's', directions: [], causes: [{ no: 2, cause: '조건 누락', explain: 'b' }, { no: 1, cause: '어휘 부족', explain: 'a' }, { no: 2, cause: '조건 누락', explain: 'c' }].reverse() },
    { label: '학생2', summary: 's', directions: [], causes: [{ no: 1, cause: '어휘 부족', explain: 'x' }] },
  ] });
  assert.deepEqual(out.students.map((s) => s.label), ['김OO', 'KM']);
  assert.deepEqual(out.students[0].causes.map((c) => [c.no, c.explain]), [[2, 'c'], [2, 'b']]);
  assert.deepEqual(out.students[1].causes, []);
});

test('reportRequest school 결과는 문항표에 있는 변별 문항만 남긴다', () => {
  const r = reportRequest({ mode: 'school', meta, items });
  const out = r.finish({ overview: 'o', strategy: [], keyItems: [{ no: 7, why: 'x' }, { no: 2, why: 'y' }] });
  assert.deepEqual(out.keyItems, [{ no: 2, why: 'y' }]);
});

test('학년을 알면 그 학년 교육과정을 프롬프트에 넣는다', () => {
  const 안내 = (b) => extractRequest(b).content.map((x) => x.text ?? '').join('\n');

  // 국어·수학은 성취기준을 세부 포인트 후보로 준다
  const 중2국어 = 안내({ pages: [img], subject: '국어', grade: '중2' });
  assert.match(중2국어, /세부 포인트 후보/);
  assert.match(중2국어, /음운 체계/);       // 중학교 국어 성취기준
  assert.doesNotMatch(중2국어, /10공국1/);   // 고1 것이 섞이면 안 된다
  assert.doesNotMatch(중2국어, /문법 항목/); // 영어가 아니면 문법표를 넣지 않는다

  // 교과서 목차를 받기 전에는 단원 후보를 주지 않는다 — 영역을 단원인 척 주면 안 된다
  assert.doesNotMatch(중2국어, /단원 후보/);
  assert.doesNotMatch(중2국어, /이해 \/ 표현/);

  // 영어는 성취기준 대신 학원 문법표를 준다 (GUIDE 에 이미 영역·세부유형 분류가 있다)
  const 중3영어 = 안내({ pages: [img], subject: '영어', grade: '중3' });
  assert.match(중3영어, /문법 항목/);
  assert.match(중3영어, /관계대명사/);
  assert.doesNotMatch(중3영어, /세부 포인트 후보/);
  assert.doesNotMatch(중3영어, /연음이나 축약/);

  // 어느 과목이든 같은 단원을 늘 같은 말로 적으라고 못 박는다
  assert.match(중2국어, /늘 똑같이 적습니다/);
  assert.match(중3영어, /늘 똑같이 적습니다/);

  // 학년을 모르면 지금 그대로다
  assert.doesNotMatch(안내({ pages: [img] }), /교육과정 \(2022 개정\)/);
  assert.doesNotMatch(안내({ pages: [img], subject: '국어', grade: '초5' }), /교육과정 \(2022 개정\)/);
});

test('학교 분석 글은 받은 자료의 틀대로 문항 구성(flow)까지 쓴다', () => {
  assert.ok(SCHOOL_SCHEMA.properties.flow, 'flow 칸이 있어야 한다');
  const r = reportRequest({ mode: 'school', meta, items });
  // 구간을 번호로 나눠 쓰라고 못 박는다 (121건이 모두 그렇게 쓴다)
  assert.match(r.system, /flow:/);
  assert.match(r.system, /문항 번호 구간으로 시작/);
  // 배점 눈금 통계를 글에 쓸 수 있게 넘긴다
  assert.match(r.content[0].text, /"byWeight":/);
});

test('시험지에 적힌 학생 이름·반·번호를 읽어 오지 않는다', () => {
  // 실제 시험지에는 머리글에 "제2학년 8반 15번 이름 (___)" 이 손으로 적혀 있다 (빛가온중 2026 1학기 1차)
  const 계약 = extractRequest({ pages: [img] }).system;
  assert.match(계약, /이름/);
  assert.match(계약, /반·번호|반, 번호/);
  assert.match(계약, /적지 않습니다|읽지 않습니다|옮기지 않습니다/);
});

test('영어 분류표는 실제 시험지에 나온 세부유형을 담는다', () => {
  const 영어 = GUIDE.영어.classify;
  // 빛가온중 2026 1학기 1차(21문항)에서 실제로 나온 것들
  ['있는 대로', '바르게 고친', '밑줄 의미', '대화 내용'].forEach((t) => assert.match(영어, new RegExp(t), t));
  // 서술형 8유형 — 어느 학교든 이 안에서 나온다
  ['배열 영작', '조건 영작', '빈칸 쓰기', '요약문 완성', '우리말 해석', '어법 고쳐 쓰기', '지칭 추론 쓰기'].forEach((t) => assert.match(영어, new RegExp(t), t));
});

test('영어 서답형은 묻는 내용의 영역으로 분류한다 (서술형은 영역이 아니라 kind 다)', () => {
  // 하버드브레인 고덕중 분석표: "서답형 2 | 어법 - 관계대명사 사용한 영작 | 중상"
  // 서답형을 따로 떼면 영역별 비중이 어법 8문항 → 5문항으로 줄어 시험을 잘못 읽게 된다
  assert.ok(!SUBJECTS.영어.includes('서술형'), '영어 영역에 서술형이 남아 있으면 kind 와 이름이 겹친다');
  assert.match(GUIDE.영어.classify, /서답형|서술형 문항도/);
  assert.match(GUIDE.영어.classify, /kind/);
});
