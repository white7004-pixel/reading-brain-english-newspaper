import test from 'node:test';
import assert from 'node:assert/strict';
import { sheet, header, bars, examName } from '../public/report.js';

test('sheet 는 넘긴 종류(cls)를 .page 에 붙인다', () => {
  assert.match(sheet('이름', '<p>가</p>', 'card-news'), /class="page card-news"/);
  assert.match(sheet('이름', '<p>가</p>'), /class="page"/);
});

test('리포트 조각은 글자를 esc 로 넣는다', () => {
  assert.doesNotMatch(header({ name: '<b>학원', logo: '' }, '<script>', ''), /<script>|<b>학원/);
  assert.doesNotMatch(bars([{ label: '<i>', pct: 10 }], () => '<u>'), /<i>|<u>/);
  assert.equal(examName({ school: 'ㄱ중', grade: '중2', term: '1학기', exam: '중간고사' }), 'ㄱ중 중2 1학기 중간고사');
});
