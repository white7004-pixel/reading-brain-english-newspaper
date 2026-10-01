import test from 'node:test';
import assert from 'node:assert/strict';
import { sheet, header, barCell, examName, table, schoolPage, studentPage, verdictTitle, explainPages, crossTable, coverPage, backPage, keyCards } from '../public/report.js';
import { examStats, studentStats } from '../public/lib.js';

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
  { no: '1', kind: '객관식', points: 30, area: '어휘', subtype: '문맥 어휘', difficulty: '하', source: '교과서' },
  { no: '2', kind: '객관식', points: 30, area: '독해', subtype: '빈칸', difficulty: '중상', source: '외부' },
  { no: '3', kind: '서술형', points: 40, area: '어법', subtype: '관계대명사 - 조건 영작', difficulty: '상', source: '' },
];
const ctx = {
  academy: { name: '에듀냅학원', phone: '031-000-0000', logo: '' },
  meta: { subject: '영어', school: '에듀냅중학교', grade: '중2', term: '1학기', exam: '중간고사' },
  items,
  stats: examStats(items),
};
const school = {
  overview: '서술형 배점이 높았습니다.',
  keyItems: [{ no: '3', why: '조건이 세 개였습니다' }],
  strategy: [{ area: '독해', tip: '지문 요약 쓰기' }],
};

test('학교 분석 A4 는 정해진 표와 줄로 이뤄진다', () => {
  const html = schoolPage(ctx, school);
  // 시험 구성 · 영역별 · 대비 · 교차표 · 전 문항 두 쪽 (배점 구성은 한 줄, 단원은 이 시험에 없다,
  // 대표 문항은 표가 아니라 카드다)
  assert.equal(html.match(/<table/g).length, 6);
  ['시험 구성', '영역별 출제', '배점 구성', '대표 문항', '전 문항 분석표', '다음 시험 이렇게 준비합니다'].forEach((h) => assert.match(html, new RegExp(h)));
  assert.doesNotMatch(html, /단원별 출제/); // 단원을 적지 않은 문항표에서는 단원 표를 내지 않는다
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

test('단원을 적은 문항표에서는 단원별 출제 표가 붙는다', () => {
  const withUnit = items.map((it, i) => ({ ...it, unit: i ? '6과' : '5과' }));
  const html = schoolPage({ ...ctx, items: withUnit, stats: examStats(withUnit) }, school);
  assert.match(html, /단원별 출제/);
  assert.equal(html.match(/<table/g).length, 7);
});

test('시험 정보 줄에는 날짜·시간·구성·범위가 들어간다', () => {
  const meta = { ...ctx.meta, date: '2026-09-30', minutes: 45, range: '동아(이병민) 5과 · 6과' };
  const html = schoolPage({ ...ctx, meta }, school);
  assert.match(html, /2026\. 9\. 30\./);
  assert.match(html, /45분/);
  assert.match(html, /선택형 2문항 \+ 서술형 1문항 \(100점\)/);
  assert.match(html, /동아\(이병민\) 5과 · 6과/);
  // 못 읽은 칸은 줄에서 빠진다
  assert.doesNotMatch(schoolPage(ctx, school), /분 ·|범위/);
});

test('한 줄 총평과 출제 경향 요약이 들어간다', () => {
  const html = schoolPage(ctx, { ...school, trends: ['교과서 안에서만 나왔습니다.'] });
  assert.match(html, /한 줄 총평/);
  assert.match(html, /출제 경향 요약/);
  assert.match(html, /<li contenteditable>교과서 안에서만 나왔습니다\.<\/li>/);
  assert.doesNotMatch(schoolPage(ctx, school), /출제 경향 요약/); // 글이 없으면 자리도 없다
});

test('고난도(상) 문항은 전 문항 표에서 ★ 로 표시된다', () => {
  const html = schoolPage(ctx, school);
  assert.match(html, /<td class="num">★3<\/td>/);
  assert.match(html, /★ 고난도/);
});

test('전 문항 표는 문항 수와 상관없이 늘 둘째 장이다', () => {
  // 1장 내용만으로 이미 꽉 차서, 표까지 넣으면 글자가 0.7배까지 줄어든다 (브라우저에서 재어 봤다)
  [3, 40].forEach((n) => {
    const list = Array.from({ length: n }, (_, i) => ({ ...items[i % 3], no: String(i + 1) }));
    const html = schoolPage({ ...ctx, items: list, stats: examStats(list) }, school);
    assert.equal(html.match(/class="page"/g).length, 2, `${n}문항`);
    assert.match(html, /1 \/ 2/);
    assert.match(html, /2 \/ 2/);
    // 앞장에는 전 문항 표가 없고 뒷장에만 있다
    assert.equal(html.match(/전 문항 분석표/g).length, 1, `${n}문항`);
  });
});

test('학생 리포트 종이에는 학생 이름이 들어가지 않는다', () => {
  const student = { label: '김OO', wrong: [{ no: '2', chosen: '' }] };
  const stats = studentStats(items, student.wrong);
  const text = { summary: '기본 개념은 안정적입니다.', causes: [{ no: '2', cause: '단서 놓침·추론 오류', explain: '근거를 못 찾았을 수 있습니다.' }], directions: ['오답 재풀이'] };
  const html = studentPage(ctx, student, stats, text);
  // 인쇄되는 종이(.page) 안에는 이름이 없다. 파일 이름(data-png)에만 남아 원장님이 구분한다.
  const page = html.slice(html.indexOf('<article'));
  assert.doesNotMatch(page, /김OO/);
  assert.match(html, /data-png="김OO-영어리포트"/);
  assert.match(page, /학생<\/b>/); // 손으로 적을 자리
});

test('A4 도 AI 글을 그대로 넣지 않는다', () => {
  assert.doesNotMatch(schoolPage(ctx, { ...school, overview: '<script>나쁨</script>' }), /<script>나쁨/);
});

test('제목은 받은 자료가 쓰는 "직후 총평" 꼴을 기본값으로 둔다', () => {
  assert.equal(verdictTitle(ctx.meta), '에듀냅중학교 중2 1학기 영어 중간고사 직후 총평');
  assert.match(schoolPage(ctx, school), /에듀냅중학교 중2 1학기 영어 중간고사 직후 총평/);
});

test('시험 구성 표에 배점 눈금(표준·응용·고난도)이 함께 들어간다', () => {
  const html = schoolPage(ctx, school);
  assert.match(html, /배점 눈금/);
  assert.match(html, /표준/);
});

test('문항 구성(flow)은 받았을 때만 싣는다', () => {
  assert.doesNotMatch(schoolPage(ctx, school), /문항은 이렇게 나왔습니다/);
  const html = schoolPage(ctx, { ...school, flow: ['1~6번은 기본 유형입니다.', '<b>17번'] });
  assert.match(html, /문항은 이렇게 나왔습니다/);
  assert.match(html, /1~6번은 기본 유형입니다/);
  assert.doesNotMatch(html, /<b>17번/); // esc 를 지난다
});

test('우리 학원 대비는 원장님이 적어 둔 것만 싣는다 (AI 가 쓰지 않는다)', () => {
  assert.doesNotMatch(schoolPage(ctx, school), /이렇게 대비했습니다/);
  const withPrep = { ...ctx, academy: { ...ctx.academy, prep: '시험 4주 전부터 자체 교재로 대비했습니다.\n<script>' } };
  const html = schoolPage(withPrep, school);
  assert.match(html, /이렇게 대비했습니다/);
  assert.match(html, /시험 4주 전부터 자체 교재로 대비했습니다/);
  assert.doesNotMatch(html, /<script>/);
  // 다음 시험 전략보다 앞에 온다 (받은 자료의 3부 순서)
  assert.ok(html.indexOf('이렇게 대비했습니다') < html.indexOf('다음 시험 이렇게 준비합니다'));
});

test('문항 해설은 학원용 종이로만 나오고 카드·학부모 리포트로 새지 않는다', () => {
  const 풀이 = items.map((it) => ({ ...it, answer: '③', teach: `${it.no}번풀이ABC` }));
  const c = { ...ctx, items: 풀이, stats: examStats(풀이) };
  const html = explainPages(c);
  assert.match(html, /문항 해설/);
  assert.match(html, /학원 안에서만/); // 외부 배포 금지 경고
  풀이.forEach((it) => assert.match(html, new RegExp(`${it.no}번풀이ABC`)));
  // 정답도 학원용에만 들어간다
  assert.match(html, /③/);

  // 학부모가 받는 종이에는 풀이도 정답도 없다
  const 학교 = schoolPage(c, school);
  assert.doesNotMatch(학교, /번풀이ABC/);
  const 학생 = studentPage(c, { label: '김OO', wrong: [] }, studentStats(풀이, []), { label: '김OO', summary: 's', causes: [], directions: [] });
  assert.doesNotMatch(학생, /번풀이ABC/);
});

test('문항 해설은 문항이 많으면 여러 장으로 나뉜다', () => {
  const many = Array.from({ length: 30 }, (_, i) => ({ ...items[i % 3], no: i + 1, teach: '풀이' }));
  const html = explainPages({ ...ctx, items: many, stats: examStats(many) });
  assert.ok(html.match(/class="page"/g).length > 1);
  assert.match(html, /1 \/ /);
});

test('영역 × 난이도 교차표는 총계 줄까지 한 장에 싣는다', () => {
  const html = crossTable(examStats(items), items);
  assert.match(html, /영역 × 난이도/);
  ['어휘', '어법', '독해', '총계'].forEach((w) => assert.match(html, new RegExp(w)));
  // 아무도 없는 난이도 칸(중하)은 싣지 않는다 — 빈 칸만 늘어난다
  assert.doesNotMatch(html, /중하/);
  // 총계 줄의 마지막 칸은 문항 수
  assert.match(html, /<td class="num">3<\/td><\/tr>\s*<\/tbody>/);
});

test('교차표는 학교 분석 A4 에 들어간다', () => {
  assert.match(schoolPage(ctx, school), /영역 × 난이도/);
});

// ── 표지 · 뒷표지 ──
// 참고앱 리포트는 표지(목차)로 시작하고 뒷표지(학원 한 줄)로 끝난다.
// 학부모가 가장 먼저·마지막으로 보는 쪽인데 우리에겐 없었다.
test('표지에는 학교·학년·과목과 목차가 들어가고 학생 정보는 없다', () => {
  const html = coverPage(ctx, school);
  assert.match(html, /에듀냅중학교/);
  assert.match(html, /중2 · 영어/);
  assert.match(html, /중간고사 분석 리포트/);
  ['시험 구성', '변별 문항', '전 문항 분석표'].forEach((s) => assert.match(html, new RegExp(s)));
  assert.match(html, /<ol class="c-toc">/);
  // 표지에는 숫자를 싣지 않는다 — 무엇이 들어 있는지만 알린다 (목차 글귀는 빼고 센다)
  const 목차뺀표지 = html.replace(/<ol class="c-toc">[\s\S]*?<\/ol>/, '');
  assert.doesNotMatch(목차뺀표지, /\d+점|\d+문항|김OO/);
});

test('목차는 그 리포트에 실제로 있는 자리만 적는다', () => {
  assert.doesNotMatch(coverPage(ctx, school), /출제 경향 요약|이렇게 대비했습니다/);
  const 많은 = coverPage({ ...ctx, academy: { ...ctx.academy, prep: '네 주 전부터' } }, { ...school, trends: ['ㄱ'] });
  assert.match(많은, /출제 경향 요약/);
  assert.match(많은, /이렇게 대비했습니다/);
});

test('뒷표지는 학원 이름·한 줄 문구·연락처만 싣는다', () => {
  const html = backPage({ ...ctx, academy: { ...ctx.academy, slogan: '<b>함께 가는 길' } });
  assert.match(html, /에듀냅학원/);
  assert.match(html, /031-000-0000/);
  assert.match(html, /함께 가는 길/);
  assert.doesNotMatch(html, /<b>함께/); // esc 를 지난다
  assert.doesNotMatch(backPage(ctx), /class="c-slogan"/); // 안 적으면 자리도 없다
});

test('표지·뒷표지는 학교 분석 앞뒤에 붙고, 끄면 두 장만 남는다', () => {
  const 넷 = schoolPage({ ...ctx, academy: { ...ctx.academy, cover: true } }, school);
  assert.equal(넷.match(/class="page"/g).length, 4);
  assert.ok(넷.indexOf('c-toc') < 넷.indexOf('한 줄 총평'));
  assert.ok(넷.indexOf('전 문항 분석표') < 넷.lastIndexOf('c-back'));
  assert.equal(schoolPage(ctx, school).match(/class="page"/g).length, 2); // 기본값은 끔
});

// ── 대표 문항 ──
// 참고앱은 원장님이 1~3개를 체크하고, 그 문항마다 한 문단과 칩 넷(배점·난이도·유형·단원)을 싣는다.
// 우리는 표 한 줄짜리였다. 카드로 키우고 자리는 둘째 장으로 옮긴다 (첫 장은 이미 꽉 찼다).
test('대표 문항은 칩과 문단을 갖춘 카드로 나온다', () => {
  const html = keyCards(items, [{ no: '3', why: '조건이 세 개였습니다.' }]);
  assert.match(html, /대표 문항 1/);
  assert.match(html, /문항 번호 : 3/);
  assert.match(html, /조건이 세 개였습니다/);
  ['배점 : 40', '난이도 : 상', '영역 : 어법'].forEach((c) => assert.match(html, new RegExp(c)));
  assert.doesNotMatch(html, /단원 :/); // 이 문항표에는 단원이 없다
});

test('대표 문항 카드는 문항표에 없는 번호를 싣지 않는다', () => {
  assert.equal(keyCards(items, [{ no: '없음', why: 'x' }]), '');
});

test('대표 문항은 둘째 장으로 가고 첫 장에서는 빠진다', () => {
  const html = schoolPage(ctx, school);
  const 첫장 = html.slice(0, html.indexOf('class="page"', 10));
  assert.doesNotMatch(첫장, /대표 문항/);
  assert.match(html, /대표 문항 — 점수가 갈린 곳/);
});
