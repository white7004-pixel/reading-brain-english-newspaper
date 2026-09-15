// 브라우저·서버·테스트가 함께 쓰는 기준값과 계산. 리포트의 숫자는 여기서만 만든다.
export const AREAS = ['어휘', '어법', '대화문', '독해', '서술형', '듣기'];
export const DIFF5 = ['하', '중하', '중', '중상', '상'];
export const KINDS = ['객관식', '서술형'];
export const CAUSES = ['어휘 부족', '문법 개념 미흡', '구문 해석 오류', '단서 놓침·추론 오류', '선택지 함정', '조건 누락', '시간 부족·실수'];

const TO3 = { 하: '하', 중하: '하', 중: '중', 중상: '상', 상: '상' };
export const to3 = (d) => TO3[d] || d;

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

const round1 = (n) => Math.round(n * 10) / 10;
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const sumPoints = (items) => round1(items.reduce((s, it) => s + (Number(it.points) || 0), 0));

function tally(items, key, order) {
  return order
    .map((label) => {
      const hit = items.filter((it) => it[key] === label);
      return { label, count: hit.length, points: sumPoints(hit), pct: pct(hit.length, items.length) };
    })
    .filter((r) => r.count > 0);
}

export function examStats(items) {
  const total = sumPoints(items);
  const essay = items.filter((it) => it.kind === '서술형');
  const hard = items.filter((it) => it.difficulty === '중상' || it.difficulty === '상');
  const weighted = items.reduce((s, it) => s + DIFF5.indexOf(it.difficulty) * (Number(it.points) || 0), 0);
  return {
    count: items.length,
    total,
    essayCount: essay.length,
    essayPointsPct: pct(sumPoints(essay), total),
    hardPct: pct(hard.length, items.length),
    overall: DIFF5[Math.round(total ? weighted / total : 2)],
    byArea: tally(items, 'area', AREAS),
    byDifficulty: tally(items, 'difficulty', DIFF5),
  };
}

export function studentStats(items, wrong) {
  const wrongNos = new Set(wrong.map((w) => w.no));
  const byArea = AREAS.map((label) => {
    const inArea = items.filter((it) => it.area === label);
    const correct = inArea.filter((it) => !wrongNos.has(it.no)).length;
    return { label, count: inArea.length, correct, pct: pct(correct, inArea.length) };
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
    if (/^[가-힣]{2,4}$/.test(label)) problems.push(`${label}: 전체 이름 대신 성+OO 또는 이니셜로 적어 주세요`);
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
