import test from 'node:test';
import assert from 'node:assert/strict';
import { blogPost } from '../public/blog.js';
import { draftSchool } from '../public/draft.js';
import { examStats } from '../public/lib.js';

// 에듀냅 블로그 엔진(packages/blog-engine/src/post.js)이 그대로 읽을 수 있는 원고를 짓는다.
// 강조 개수 기준은 blog-cloud/lib/prompts.js: 형광펜 5 · 밑줄 10 · 굵게 6 · 인용구 3~5 · 구분선 4~5.
const I = (no, kind, points, area, subtype, difficulty, source, unit = '5과', note = '', key = false) =>
  ({ no, kind, points, unit, area, subtype, difficulty, source, answer: '', note, key, reason: '' });

const items = [
  I('1', '객관식', 3, '어휘', '영영풀이', '하', '교과서'),
  I('2', '객관식', 3, '독해', '내용 일치', '중', '교과서'),
  I('3', '객관식', 4, '어법', 'to부정사 - 쓰임 구분', '상', '부교재', '5과', '쓰임이 비슷한 보기 둘을 끝까지 따져야 했습니다', true),
  I('4', '객관식', 3, '독해', '빈칸', '중상', '외부', '6과', '앞뒤 연결어를 놓치면 걸렸습니다'),
  I('5', '객관식', 3, '어법', '시제', '중', '교과서', '6과'),
  I('6', '객관식', 4, '독해', '제목 찾기', '중상', '교과서', '6과'),
  I('7', '객관식', 3, '대화문', '이어질 말', '중', '교과서', '5과'),
  I('서답형 1', '단답형', 6, '어법', '어형 바꿔 쓰기', '중', '교과서', '5과'),
  I('서답형 2', '서술형', 6, '어법', '조건 영작', '상', '부교재', '6과', '조건 세 개를 모두 지켜야 만점이었습니다', true),
];
const meta = { subject: '영어', school: '소래중학교', grade: '중2', term: '1학기', exam: '중간고사', range: '5~6과', date: '2026-04-28' };
const academy = { name: '리딩브레인영어학원' };
const ctx = (list = items) => ({ academy, meta, items: list, stats: examStats(list) });
const 짓기 = (list = items) => { const c = ctx(list); return blogPost(c, draftSchool(c)); };

const 센다 = (s, re) => (s.match(re) || []).length;

test('머리말과 본문을 돌려준다', () => {
  const p = 짓기();
  assert.ok(p.title.includes('소래중학교'), '제목에 학교가 없다');
  assert.ok(p.title.includes('직후 총평'), '참고 자료 100/121 이 쓰는 꼬리말이 없다');
  assert.ok(p.title.startsWith('[리딩브레인영어학원]'), '학원 이름 앞머리가 없다');
  assert.ok(p.hashtags.length >= 3, '해시태그가 모자라다');
  assert.ok(p.markdown.startsWith('---\n'), '머리말이 없다');
  assert.match(p.markdown, /^---\ntitle: .+\nhashtags: .+\n---\n/);
});

test('숫자는 문항표에서만 온다', () => {
  const p = 짓기();
  assert.match(p.body, /9문항/);
  assert.match(p.body, /35점/); // 3+3+4+3+3+4+3+6+6
});

test('강조 개수가 에듀냅 기준 안에 든다', () => {
  const p = 짓기();
  assert.equal(센다(p.body, /==[^=\n]+==/g), 5, '형광펜은 정확히 5곳');
  assert.equal(센다(p.body, /__[^_\n]+__/g), 10, '밑줄은 정확히 10곳');
  const 굵게 = 센다(p.body, /\*\*[^*\n]+\*\*/g);
  assert.ok(굵게 >= 1 && 굵게 <= 6, `굵게는 6곳까지인데 ${굵게}곳`);
  const 인용 = 센다(p.body, /^>{1,2} /gm);
  assert.ok(인용 >= 3 && 인용 <= 5, `인용구는 3~5개인데 ${인용}개`);
  const 구분선 = 센다(p.body, /^---$/gm);
  assert.ok(구분선 >= 4 && 구분선 <= 5, `구분선은 4~5개인데 ${구분선}개`);
});

test('강조는 한 줄에 하나만, 서로 겹치지 않는다', () => {
  const p = 짓기();
  for (const line of p.body.split('\n')) {
    const n = 센다(line, /==[^=\n]+==/g) + 센다(line, /__[^_\n]+__/g) + 센다(line, /\*\*[^*\n]+\*\*/g);
    assert.ok(n <= 1, `한 줄에 강조가 ${n}개: ${line}`);
  }
  assert.doesNotMatch(p.body, /==[^=\n]*(__|\*\*)/, '강조가 겹쳤다');
});

test('카드 사진을 고르게 끼운다 — 카드1은 앞쪽', () => {
  const p = 짓기();
  const 자리 = [...p.body.matchAll(/^\[이미지:(카드\d\.png)\]$/gm)];
  assert.ok(자리.length >= 3, `카드 사진이 ${자리.length}장`);
  assert.equal(자리[0][1], '카드1.png');
  const 끝 = p.body.length;
  assert.ok(자리[0].index < 끝 * 0.3, '카드1이 앞쪽에 없다');
  assert.ok(자리[자리.length - 1].index > 끝 * 0.5, '사진이 앞쪽에만 쏠렸다');
});

test('엔진이 붙이는 것은 원고에 쓰지 않는다', () => {
  const { body } = 짓기();
  assert.doesNotMatch(body, /https?:\/\//, 'URL 이 들어갔다');
  assert.doesNotMatch(body, /#[가-힣A-Za-z]/, '해시태그 목록이 본문에 들어갔다');
  assert.doesNotMatch(body, /0\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}/, '전화번호가 들어갔다');
  assert.doesNotMatch(body, /안녕하세요/, '인사말은 엔진이 붙인다');
  assert.doesNotMatch(body, /문의\s*(주세요|해\s?주세요|바랍니다)/, '문의 맺음문장은 엔진이 붙인다');
});

test('문항표에 없는 사실을 지어내지 않는다', () => {
  const { body } = 짓기();
  assert.doesNotMatch(body, /학교\s*평균/);
  assert.doesNotMatch(body, /예상\s*등급/);
  assert.doesNotMatch(body, /적중/, '분모 없는 적중률은 쓰지 않는다');
  assert.doesNotMatch(body, /1등|최고|무조건/);
});

test('학생 이름 자리가 아예 없다', () => {
  const { markdown } = 짓기();
  assert.doesNotMatch(markdown, /학생\s*이름|점수는|[가-힣]{1}OO/);
});

// 실제 학교 시험은 24문항쯤이다. 그 크기에서 2,000자를 넘어야 블로그 글로 쓸 만하다.
test('실제 크기(24문항)에서 2,000자를 넘는다', () => {
  const 영역 = ['독해', '어법', '어휘', '대화문'];
  const 난 = ['하', '중', '중', '중상', '상'];
  const 많이 = Array.from({ length: 24 }, (_, i) =>
    I(i < 20 ? String(i + 1) : `서답형 ${i - 19}`, i < 20 ? '객관식' : (i < 22 ? '단답형' : '서술형'),
      i < 20 ? 4 : 5, 영역[i % 4], `유형${i % 7}`, 난[i % 5], ['교과서', '부교재', '외부'][i % 3],
      `${(i % 3) + 3}과`, i % 6 === 0 ? `${i + 1}번은 앞뒤 연결을 놓치면 걸렸습니다` : '', i % 8 === 0));
  const p = 짓기(많이);
  assert.ok(p.chars >= 2000, `${p.chars}자로 너무 짧다`);
});

test('문항이 적어도 터지지 않고 강조 개수를 지킨다', () => {
  const p = 짓기(items.slice(0, 2));
  assert.ok(p.body.length > 100);
  assert.ok(센다(p.body, /==[^=\n]+==/g) <= 5);
  assert.ok(센다(p.body, /__[^_\n]+__/g) <= 10);
});

test('문항이 없으면 빈 원고를 돌려준다', () => {
  const p = 짓기([]);
  assert.equal(p.body, '');
  assert.equal(p.chars, 0);
});
