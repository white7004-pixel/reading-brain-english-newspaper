import test from 'node:test';
import assert from 'node:assert/strict';
import { sheet, header, barCell, examName, table, schoolPage } from '../public/report.js';
import { examStats } from '../public/lib.js';

test('sheet 는 넘긴 종류(cls)를 .page 에 붙인다', () => {
  assert.match(sheet('이름', '<p>가</p>', 'card-news'), /class="page card-news"/);
  assert.match(sheet('이름', '<p>가</p>'), /class="page"/);
});

test('리포트 조각은 글자를 esc 로 넣는다', () => {
  assert.doesNotMatch(header({ name: '<b>학원', logo: '' }, '<script>', ''), /<script>|<b>학원/);
  assert.doesNotMatch(barCell(10, '<u>10%'), /<u>10/);
  assert.equal(examName({ school: 'ㄱ중', grade: '중2', term: '1학기', exam: '중간고사' }), 'ㄱ중 중2 1학기 중간고사');
});

test('table 은 # 로 시작하는 머리글을 숫자 칸으로 둔다', () => {
  const html = table(['영역', '#배점'], ['<tr><td>독해</td><td class="num">5</td></tr>']);
  assert.match(html, /<th>영역<\/th><th class="num">배점<\/th>/);
  assert.doesNotMatch(html, /#/);
});

const items = [
  { no: 1, kind: '객관식', points: 30, area: '어휘', subtype: '문맥 어휘', difficulty: '하', source: '교과서' },
  { no: 2, kind: '객관식', points: 30, area: '독해', subtype: '빈칸', difficulty: '중상', source: '외부' },
  { no: 3, kind: '서술형', points: 40, area: '서술형', subtype: '조건 영작', difficulty: '상', source: '' },
];
const ctx = {
  academy: { name: '에듀냅학원', phone: '031-000-0000', logo: '' },
  meta: { subject: '영어', school: '에듀냅중학교', grade: '중2', term: '1학기', exam: '중간고사' },
  items,
  stats: examStats(items),
};
const school = {
  overview: '서술형 배점이 높았습니다.',
  keyItems: [{ no: 3, why: '조건이 세 개였습니다' }],
  strategy: [{ area: '독해', tip: '지문 요약 쓰기' }],
};

test('학교 분석 A4 는 표 여섯 개로 이뤄진다', () => {
  const html = schoolPage(ctx, school);
  // 시험 구성 · 영역별 · 배점 구성 · 변별 문항 · 전 문항 두 쪽 · 대비
  assert.equal(html.match(/<table/g).length, 7);
  ['시험 구성', '영역별 출제', '배점 구성', '변별 문항', '전 문항 분석표', '다음 시험 이렇게 준비합니다'].forEach((h) => assert.match(html, new RegExp(h)));
  // 구분 칸은 항목 수만큼 묶인다 (객관식·서술형 두 줄)
  assert.match(html, /rowspan="2" scope="rowgroup">유형/);
  // 비율 칸에 막대 너비가 붙는다
  assert.match(html, /<i style="--w:67%"><\/i>/);
  // 출처가 빈 문항은 — 로, 있는 문항은 줄여서
  assert.match(html, /<td class="c">교과<\/td>/);
  assert.match(html, /<td class="c">—<\/td>/);
  // 영역별 표에는 문항 번호가 함께
  assert.match(html, /조건이 세 개였습니다/);
});

test('A4 도 AI 글을 그대로 넣지 않는다', () => {
  assert.doesNotMatch(schoolPage(ctx, { ...school, overview: '<script>나쁨</script>' }), /<script>나쁨/);
});
