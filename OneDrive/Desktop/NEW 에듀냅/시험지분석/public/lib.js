// 브라우저·서버·테스트가 함께 쓰는 기준값과 계산. 리포트의 숫자는 여기서만 만든다.
// 과목별 영역. 과목끼리 이름이 겹치지 않아야 영역만 보고 통계를 낼 수 있다.
export const SUBJECTS = {
  영어: ['어휘', '어법', '대화문', '독해', '듣기'],
  국어: ['문학', '독서', '문법', '화법과 작문', '매체'],
  수학: ['수와 연산', '문자와 식', '함수', '기하', '확률과 통계'],
  과학: ['물리', '화학', '생명과학', '지구과학'],
  '사회·역사': ['지리', '일반사회', '역사'],
};
export const AREAS = [...new Set(Object.values(SUBJECTS).flat())];
export const DIFF5 = ['하', '중하', '중', '중상', '상'];
export const KINDS = ['객관식', '서술형'];
// 학원 분석 글이 늘 따지는 출처. 시험지만 보고 알기 어려우면 AI 가 확인 칸(unsure)으로 표시한다.
export const SOURCES = ['교과서', '부교재', '외부', '기출변형'];

const TO3 = { 하: '하', 중하: '하', 중: '중', 중상: '상', 상: '상' };
export const to3 = (d) => TO3[d] || d;

// 배점 기준 눈금. 절대 점수가 아니라 그 시험의 평균 배점에 견준다 —
// 영어 25문항·수학 21문항처럼 문항 수가 다르면 같은 5점의 무게가 다르다.
// 평균 4점 시험에서는 표준 1~3점대 / 응용 4점대 / 고난도 5점 이상이 된다.
// 체감 난이도(difficulty)와 합치지 않는다. 둘이 어긋나는 문항이 변별 문항이다.
export const WEIGHTS = ['표준', '응용', '고난도'];
export const weightTier = (points, avg) => {
  const p = Number(points) || 0;
  if (!avg) return '표준';
  return p >= avg * 1.25 ? '고난도' : p >= avg ? '응용' : '표준';
};

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

const round1 = (n) => Math.round(n * 10) / 10;
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const sumPoints = (items) => round1(items.reduce((s, it) => s + (Number(it.points) || 0), 0));

function tally(items, key, order) {
  return order
    .map((label) => {
      const hit = items.filter((it) => it[key] === label);
      // nos: 학원 분석표가 늘 함께 적는 문항 번호 ("독해 3,7,11~14")
      return { label, count: hit.length, points: sumPoints(hit), pct: pct(hit.length, items.length), nos: hit.map((it) => Number(it.no)) };
    })
    .filter((r) => r.count > 0);
}

// 체감 난이도: 다섯 칸 중 몇째인지와 학부모가 읽을 말
const FEEL = ['쉬움', '조금 쉬움', '보통', '조금 어려움', '어려움'];

// 단원은 학교·교과서마다 달라 미리 정할 수 없다. 시험지에 나온 순서대로 묶는다.
function byValue(items, key) {
  const order = [];
  const groups = new Map();
  for (const it of items) {
    const label = String(it?.[key] ?? '').trim();
    if (!label) continue;
    if (!groups.has(label)) { groups.set(label, []); order.push(label); }
    groups.get(label).push(it);
  }
  return order.map((label) => {
    const hit = groups.get(label);
    return { label, count: hit.length, points: sumPoints(hit), pct: pct(hit.length, items.length), nos: hit.map((it) => Number(it.no)) };
  });
}

// 배점이 큰 것부터: 배점 / 문항 수 / 번호들 ("5점 문항 5개가 전부 어법")
function byPoints(items) {
  const groups = new Map();
  for (const it of items) {
    const points = Number(it.points) || 0;
    if (!groups.has(points)) groups.set(points, []);
    groups.get(points).push(Number(it.no));
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0])
    .map(([points, nos]) => ({ points, count: nos.length, nos: nos.sort((a, b) => a - b) }));
}

export function examStats(items) {
  const total = sumPoints(items);
  const essay = items.filter((it) => it.kind === '서술형');
  const hard = items.filter((it) => it.difficulty === '중상' || it.difficulty === '상');
  const killer = items.filter((it) => it.difficulty === '상'); // 학원 글이 말하는 킬러 문항
  const weighted = items.reduce((s, it) => s + DIFF5.indexOf(it.difficulty) * (Number(it.points) || 0), 0);
  const overall = DIFF5[Math.round(total ? weighted / total : 2)];
  return {
    count: items.length,
    total,
    essayCount: essay.length,
    essayPointsPct: pct(sumPoints(essay), total),
    hardPct: pct(hard.length, items.length),
    overall,
    overallScore: DIFF5.indexOf(overall) + 1,
    overallLabel: FEEL[DIFF5.indexOf(overall)],
    byArea: tally(items, 'area', AREAS),
    byDifficulty: tally(items, 'difficulty', DIFF5),
    byKind: tally(items, 'kind', KINDS),
    bySource: tally(items, 'source', SOURCES),
    byPoints: byPoints(items),
    byWeight: tally(items.map((it) => ({ ...it, weight: weightTier(it.points, items.length ? total / items.length : 0) })), 'weight', WEIGHTS),
    byUnit: byValue(items, 'unit'),
    hard: { count: hard.length, points: sumPoints(hard), pct: pct(hard.length, items.length) },
    killer: { count: killer.length, points: sumPoints(killer), pct: pct(killer.length, items.length) },
    textbookPct: pct(items.filter((it) => it.source === '교과서').length, items.length),
  };
}

// 번호 목록을 분석표에 쓰는 모양으로 줄인다: [1,2,3,7,9,10] → "1~3, 7, 9, 10"
export function nosText(nos) {
  const s = [...nos].sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < s.length;) {
    let j = i;
    while (j + 1 < s.length && s[j + 1] === s[j] + 1) j++;
    out.push(j - i >= 2 ? `${s[i]}~${s[j]}` : s.slice(i, j + 1).join(', '));
    i = j + 1;
  }
  return out.join(', ');
}

export function studentStats(items, wrong) {
  const wrongNos = new Set(wrong.map((w) => w.no));
  const byArea = AREAS.map((label) => {
    const inArea = items.filter((it) => it.area === label);
    const missed = inArea.filter((it) => wrongNos.has(it.no));
    const correct = inArea.length - missed.length;
    // nos: 그 영역에서 틀린 문항 번호 (리포트 표에 그대로 적는다)
    return { label, count: inArea.length, correct, pct: pct(correct, inArea.length), nos: missed.map((it) => Number(it.no)) };
  }).filter((r) => r.count > 0);
  const total = sumPoints(items);
  return {
    score: round1(total - sumPoints(items.filter((it) => wrongNos.has(it.no)))),
    total,
    wrongCount: wrongNos.size,
    byArea,
    weakAreas: byArea.filter((r) => r.pct < 100).sort((a, b) => a.pct - b.pct).slice(0, 2).map((r) => r.label),
  };
}

// "김OO 4(③), 9, 25" 한 줄에 한 명. 다 맞으면 "김OO 0".
export function parseStudents(text, itemNos) {
  const known = new Set(itemNos);
  const students = [];
  const problems = [];
  text.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line, i) => {
    const m = line.match(/^(.+?)\s+(\d.*)$/);
    if (!m) return problems.push(`${i + 1}번째 줄: 이름 뒤에 틀린 번호를 적어 주세요 (다 맞으면 0)`);
    const label = m[1].trim();
    if (/[가-힣]{2,}/.test(label)) problems.push(`${label}: 전체 이름 대신 성+OO 또는 이니셜로 적어 주세요`);
    const seen = new Set();
    const wrong = [];
    for (const [, no, chosen] of m[2].matchAll(/(\d+)\s*(?:\(([^)]*)\))?/g)) {
      const n = Number(no);
      if (n === 0 || seen.has(n)) continue;
      seen.add(n);
      wrong.push({ no: n, chosen: (chosen || '').trim() });
    }
    const unknown = wrong.filter((w) => !known.has(w.no)).map((w) => w.no);
    if (unknown.length) problems.push(`${label}: 시험에 없는 번호 ${unknown.join(', ')}`);
    students.push({ label, wrong: wrong.filter((w) => known.has(w.no)) });
  });
  return { students, problems };
}
