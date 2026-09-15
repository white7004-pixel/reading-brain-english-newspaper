import test from 'node:test';
import assert from 'node:assert/strict';
import { EXTRACT_SCHEMA, SCHOOL_SCHEMA, STUDENTS_SCHEMA, extractRequest, reportRequest } from '../lib/rules.js';
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
  [EXTRACT_SCHEMA, SCHOOL_SCHEMA, STUDENTS_SCHEMA].forEach((s) => strict(s));
});

const img = Buffer.from('fake image').toString('base64');
const meta = { school: '에듀냅중학교', grade: '중2', term: '1학기', exam: '중간고사' };

test('extractRequest 는 사진을 이미지 블록으로 만들고 결과를 번호순으로 정리한다', () => {
  const r = extractRequest({ meta, pages: [img, img], answers: [img] });
  assert.equal(r.schema, EXTRACT_SCHEMA);
  assert.equal(r.content.filter((b) => b.type === 'image').length, 3);
  assert.match(r.content.at(-1).text, /에듀냅중학교/);
  const out = r.finish({ items: [{ no: 2, unsure: [] }, { no: 1, unsure: ['answer'] }], notes: '' });
  assert.deepEqual(out.items.map((i) => i.no), [1, 2]);
});

test('extractRequest 는 잘못된 입력을 막는다', () => {
  assert.throws(() => extractRequest({ meta, pages: [] }), UserError);
  assert.throws(() => extractRequest({ meta, pages: Array(7).fill(img) }), UserError);
  assert.throws(() => extractRequest({ meta, pages: [img], answers: Array(3).fill(img) }), UserError);
  assert.throws(() => extractRequest({ meta, pages: ['<script>'] }), UserError);
  assert.throws(() => extractRequest({ meta: { school: '' }, pages: [img] }), UserError);
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
  assert.equal(r.schema, STUDENTS_SCHEMA);
  assert.doesNotMatch(r.content[0].text, /99/);
  const one = { summary: 's', causes: [], directions: [] };
  const out = r.finish({ students: [{ label: '김OO 학생', ...one }, { label: 'B', ...one }] });
  assert.equal(out.students[0].label, '김OO');
  assert.throws(() => r.finish({ students: [] }));
  assert.throws(() => reportRequest({ mode: 'students', meta, items, students: Array(11).fill(students[1]) }), UserError);
  assert.throws(() => reportRequest({ mode: 'x', meta, items }), UserError);
  assert.throws(() => reportRequest({ mode: 'school', meta, items: [{ ...items[0], area: '문학' }] }), UserError);
});
