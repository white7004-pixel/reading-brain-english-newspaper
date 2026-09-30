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

test('extractRequest 는 사진을 이미지 블록으로 만들고 결과를 번호순으로 정리한다', () => {
  const r = extractRequest({ pages: [img, img], answers: [img] });
  assert.equal(r.schema, EXTRACT_SCHEMA);
  assert.equal(r.content.filter((b) => b.type === 'image').length, 3);
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
  assert.throws(() => extractRequest({ pages: [img], answers: Array(3).fill(img) }), UserError);
  assert.throws(() => extractRequest({ pages: ['<script>'] }), UserError);
});

const items = [
  { no: 1, kind: '객관식', points: 50, area: '어휘', subtype: '문맥 어휘', difficulty: '하', answer: '③', reason: '기본 어휘' },
  { no: 2, kind: '서술형', points: 50, area: '서술형', subtype: '조건 영작', difficulty: '상', answer: 'I wish I were', reason: '조건 3개' },
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
