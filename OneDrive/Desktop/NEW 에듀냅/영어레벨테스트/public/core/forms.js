// 1차 문제지·2차 쓰기 블록 (설계서 2026-09-30). 순수 함수 — 채점, 검사, 수준 판정. 브라우저·Node 공용.
export const LEVELS = ['초3', '초4', '초5', '초6', '중1', '중2', '중3', '고1', '고2', '고3'];
export const MC_AREAS = ['reading', 'phonics', 'grammar'];
export const WRITE_AREAS = ['form', 'sentence'];
export const AREA_KO = { reading: '독해', phonics: '파닉스', grammar: '문법', form: '어형 쓰기', sentence: '영작' };
export const PASS = 80;
export const MIN_STAGE1 = 20;
export const SECONDS = 90;

export const isWrite = (it) => WRITE_AREAS.includes(it?.area);
export const blanks = (template) => (String(template ?? '').match(/\{\}/g) || []).length;
export const nextSet = (last) => (last === 'A' ? 'B' : 'A');

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/['']/g, "'").replace(/[.,!?]+$/, '').replace(/\s+/g, ' ').trim();

// 칸마다 인정 답 중 하나와 같아야 하고, 모든 칸이 맞아야 정답
export function checkWrite(it, entries) {
  return it.answers.every((ok, i) => ok.some((a) => norm(a) === norm(entries?.[i])));
}

export function validateForm(it) {
  const p = [];
  if (!it?.id) p.push('id');
  if (![...MC_AREAS, ...WRITE_AREAS].includes(it?.area)) p.push('영역');
  if (!LEVELS.includes(it?.level)) p.push('수준');
  if (!Number.isInteger(it?.no) || it.no < 1) p.push('번호');
  if (!String(it?.question ?? '').trim()) p.push('질문');
  if (isWrite(it)) {
    const n = blanks(it.template);
    if (!n) p.push('문장 틀');
    const a = it.answers;
    if (!Array.isArray(a) || !a.length || !a.every((x) => Array.isArray(x) && x.length && x.every((y) => String(y).trim()))) p.push('인정 답');
    else if (a.length !== n) p.push('칸 수');
  } else if (MC_AREAS.includes(it?.area)) {
    const c = it.choices;
    if (!Array.isArray(c) || c.length !== 4 || c.some((x) => !String(x).trim())) p.push('선택지 4개');
    else if (new Set(c.map((x) => String(x).trim())).size !== 4) p.push('선택지 중복');
    if (![0, 1, 2, 3].includes(it.answer)) p.push('정답');
    if (it.area === 'reading' && !String(it.passage ?? '').trim()) p.push('지문');
  }
  return p;
}

export function usableForm(list) {
  return (Array.isArray(list) ? list : []).filter((i) => i?.status === 'ok' && !validateForm(i).length).sort((a, b) => a.no - b.no);
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
// __말__ → 밑줄. 빈칸(____)과 겹치지 않게 앞뒤가 밑줄 문자·빈칸이 아닌 것만.
export const marked = (s) => esc(s).replace(/(?<!_)__([^_\s](?:[^_]*[^_\s])?)__(?!_)/g, '<u>$1</u>');

// ── 1차 점수와 수준 (설계서 7장) ──
export const LEVEL_AREAS = { reading: '독해', grammar: '문법', writing: '쓰기' };
const GROUP = { reading: 'reading', grammar: 'grammar', form: 'grammar', sentence: 'writing' };

export function stage1Score(log) {
  const total = log.length;
  const correct = log.filter((x) => x.correct).length;
  const score = total ? Math.round((correct / total) * 100) : 0;
  return { correct, total, score, passed: total > 0 && score >= PASS };
}

// 초3부터 올라가며 그 학년 문항을 3분의 2 이상 맞혀야 다음 학년. 그 학년 문항이 없으면 건너뛴다.
export function areaLevels(log) {
  const out = {};
  for (const g of Object.keys(LEVEL_AREAS)) {
    const mine = log.filter((x) => GROUP[x.area] === g);
    let level = null;
    for (const lv of LEVELS) {
      const at = mine.filter((x) => x.level === lv);
      if (!at.length) continue;
      if (at.filter((x) => x.correct).length * 3 >= at.length * 2) { level = lv; continue; }
      level ??= `${lv} 수준 아래`;
      break;
    }
    out[g] = level;
  }
  const ph = log.filter((x) => x.area === 'phonics');
  out.phonics = { correct: ph.filter((x) => x.correct).length, total: ph.length };
  return out;
}

const rank = (s) => { const m = /^(.+) 수준 아래$/.exec(s); return m ? LEVELS.indexOf(m[1]) - 0.5 : LEVELS.indexOf(s); };
export function startLevel(levels) {
  const vals = Object.keys(LEVEL_AREAS).map((k) => levels[k]).filter(Boolean);
  return vals.length ? vals.reduce((a, b) => (rank(b) < rank(a) ? b : a)) : null;
}

export const phonicsNote = (levels) => (levels.phonics.total && levels.phonics.correct < levels.phonics.total ? '파닉스 복습 권장' : '');

export function writeSummary(log) {
  const wrong = log.filter((x) => !x.correct);
  return { correct: log.length - wrong.length, total: log.length, missed: [...new Set(wrong.map((x) => x.point).filter(Boolean))] };
}
