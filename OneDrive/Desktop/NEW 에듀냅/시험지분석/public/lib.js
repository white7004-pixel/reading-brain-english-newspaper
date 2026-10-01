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

// 문항 번호는 글자다. 학교가 `논술형2-1`·`서답형 3` 처럼 매기기 때문이다 (실제 리포트에서 확인).
// 줄 세우기와 범위 줄이기에만 앞머리 숫자를 쓰고, 숫자가 아닌 번호는 뒤로 보낸다.
export const noText = (no) => String(no ?? '').trim();
export const noNum = (no) => {
  const m = noText(no).match(/^\d+/);
  return m ? Number(m[0]) : Infinity;
};
export const byNoOrder = (a, b) => noNum(a.no) - noNum(b.no) || noText(a.no).localeCompare(noText(b.no), 'ko');

const round1 = (n) => Math.round(n * 10) / 10;
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const sumPoints = (items) => round1(items.reduce((s, it) => s + (Number(it.points) || 0), 0));

function tally(items, key, order) {
  return order
    .map((label) => {
      const hit = items.filter((it) => it[key] === label);
      // nos: 학원 분석표가 늘 함께 적는 문항 번호 ("독해 3,7,11~14")
      return { label, count: hit.length, points: sumPoints(hit), pct: pct(hit.length, items.length), nos: hit.map((it) => noText(it.no)) };
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
    return { label, count: hit.length, points: sumPoints(hit), pct: pct(hit.length, items.length), nos: hit.map((it) => noText(it.no)) };
  });
}

// 배점이 큰 것부터: 배점 / 문항 수 / 번호들 ("5점 문항 5개가 전부 어법")
function byPoints(items) {
  const groups = new Map();
  for (const it of items) {
    const points = Number(it.points) || 0;
    if (!groups.has(points)) groups.set(points, []);
    groups.get(points).push(noText(it.no));
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0])
    .map(([points, nos]) => ({ points, count: nos.length, nos: nos.sort((a, b) => noNum(a) - noNum(b) || a.localeCompare(b, 'ko')) }));
}

// ── 발표 슬라이드가 그림으로 쓰는 숫자 (그리기는 slides.js 가 한다) ──
// 문항 차례대로 난이도를 0~4 로 놓는다. 학원 분석 슬라이드가 "뒤로 갈수록 어려워졌다"를
// 보여 줄 때 쓰는 꺾은선이다. 어디서부터 어려워졌는지는 **중상 이상이 연달아 둘** 나오는
// 첫 자리로 잡는다 — 한 문항만 튀는 것은 구간이 아니다.
export function difficultyFlow(items) {
  const points = items.map((it, i) => {
    const y = DIFF5.indexOf(it.difficulty);
    return { x: i, y: y < 0 ? 2 : y, no: noText(it.no), difficulty: it.difficulty, hard: y >= 3 };
  });
  let hardFrom = null;
  for (let i = 0; i + 1 < points.length; i++) {
    if (points[i].hard && points[i + 1].hard) { hardFrom = i; break; }
  }
  return { points, hardFrom, max: DIFF5.length - 1, count: points.length };
}

// 도넛 한 바퀴를 비율대로 나눈다. 반올림이 쌓여 틈이 생기지 않게 마지막은 360 으로 닫는다.
export function donutSlices(rows) {
  const total = rows.reduce((n, r) => n + r.count, 0);
  if (!total) return [];
  let at = 0;
  return rows.map((r, i) => {
    const from = at;
    at = i === rows.length - 1 ? 360 : from + (r.count / total) * 360;
    return { label: r.label, count: r.count, pct: pct(r.count, total), from, to: at };
  });
}

// 두 기준을 한 장에 겹쳐 본다 (영역 × 난이도). 따로 보면 "어느 영역을 어렵게 냈나"가 안 보인다.
// 줄은 나온 순서대로, 칸은 정해진 차례대로. 아무도 없는 줄·칸은 싣지 않는다 (빈 칸만 늘어난다).
// rowOrder 를 주면 그 차례대로 (영역별 표와 줄 순서를 맞추려고). 없으면 시험지에 나온 순서대로.
// weigh 를 주면 그 칸(보통 'points')을 더한다. 안 주면 문항 수를 센다.
// 참고 리포트가 "유형별 배점 분포"와 "유형별 난이도 분포"를 둘 다 막대로 보여 주기 때문이다.
export function crossTab(items, rowKey, colKey, colOrder, rowOrder = null, weigh = null) {
  const 세기 = (list) => (weigh ? sumPoints(list) : list.length);
  const cols = colOrder.filter((c) => items.some((it) => it[colKey] === c));
  const order = [];
  for (const it of items) {
    const label = String(it?.[rowKey] ?? '').trim();
    if (label && !order.includes(label)) order.push(label);
  }
  if (rowOrder) order.sort((a, b) => rowOrder.indexOf(a) - rowOrder.indexOf(b));
  const rows = order.map((label) => {
    const hit = items.filter((it) => String(it?.[rowKey] ?? '').trim() === label);
    return { label, cells: cols.map((c) => 세기(hit.filter((it) => it[colKey] === c))), total: 세기(hit) };
  });
  return {
    cols, rows,
    totals: cols.map((c) => 세기(items.filter((it) => it[colKey] === c))),
    count: 세기(items),
  };
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
    // 참고 리포트가 장마다 머리에 다는 통계칩 셋 — 최고 배점·최다 출제 단원·출제 영역 가짓수
    maxPoints: items.reduce((m, it) => Math.max(m, Number(it.points) || 0), 0),
    // byValue 는 시험지에 나온 순서다. 최다 단원은 개수로 따로 고른다
    topUnit: byValue(items, 'unit').reduce((a, b) => (b.count > a.count ? b : a), { label: '', count: 0 }).label,
    areaKinds: new Set(items.map((it) => it.area).filter(Boolean)).size,
  };
}

// 번호 목록을 분석표에 쓰는 모양으로 줄인다: [1,2,3,7,9,10] → "1~3, 7, 9, 10"
export function nosText(nos) {
  const all = [...nos].map(noText).filter(Boolean);
  // 숫자 번호만 물결로 줄인다. `논술형2-1` 같은 번호는 줄일 수 없으니 순서대로 뒤에 붙인다.
  const n = all.filter((x) => /^\d+$/.test(x)).map(Number).sort((a, b) => a - b);
  const rest = all.filter((x) => !/^\d+$/.test(x));
  const out = [];
  for (let i = 0; i < n.length;) {
    let j = i;
    while (j + 1 < n.length && n[j + 1] === n[j] + 1) j++;
    out.push(j - i >= 2 ? `${n[i]}~${n[j]}` : n.slice(i, j + 1).join(', '));
    i = j + 1;
  }
  return [...out, ...rest].join(', ');
}

export function studentStats(items, wrong) {
  const wrongNos = new Set(wrong.map((w) => w.no));
  const byArea = AREAS.map((label) => {
    const inArea = items.filter((it) => it.area === label);
    const missed = inArea.filter((it) => wrongNos.has(it.no));
    const correct = inArea.length - missed.length;
    // nos: 그 영역에서 틀린 문항 번호 (리포트 표에 그대로 적는다)
    return { label, count: inArea.length, correct, pct: pct(correct, inArea.length), nos: missed.map((it) => noText(it.no)) };
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
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function parseStudents(text, itemNos) {
  const known = new Set([...itemNos].map(noText));
  // `논술형2-1` 처럼 숫자로 시작하지 않는 번호는 시험마다 다르므로 그 시험의 번호만 알아본다.
  // 긴 것부터 맞춰야 `논술형2-1` 이 `논술형2` 에서 잘리지 않는다.
  const labels = [...known].filter((n) => !/^\d/.test(n)).sort((a, b) => b.length - a.length).map(reEsc);
  const alt = labels.join('|');
  const line1 = new RegExp(`^(.+?)\\s+(${labels.length ? `(?:\\d|${alt})` : '\\d'}.*)$`);
  const token = new RegExp(`(${labels.length ? `${alt}|` : ''}\\d+)\\s*(?:\\(([^)]*)\\))?`, 'g');
  const students = [];
  const problems = [];
  text.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line, i) => {
    const m = line.match(line1);
    if (!m) return problems.push(`${i + 1}번째 줄: 이름 뒤에 틀린 번호를 적어 주세요 (다 맞으면 0)`);
    const label = m[1].trim();
    if (/[가-힣]{2,}/.test(label)) problems.push(`${label}: 전체 이름 대신 성+OO 또는 이니셜로 적어 주세요`);
    const seen = new Set();
    const wrong = [];
    for (const [, no, chosen] of m[2].matchAll(token)) {
      if (no === '0' || seen.has(no)) continue;
      seen.add(no);
      wrong.push({ no, chosen: (chosen || '').trim() });
    }
    const unknown = wrong.filter((w) => !known.has(w.no)).map((w) => w.no);
    if (unknown.length) problems.push(`${label}: 시험에 없는 번호 ${unknown.join(', ')}`);
    students.push({ label, wrong: wrong.filter((w) => known.has(w.no)) });
  });
  return { students, problems };
}
