// 1차 문제지·2차 쓰기 블록 (설계서 2026-09-30). 순수 함수 — 채점, 검사, 수준 판정. 브라우저·Node 공용.
export const LEVELS = ['초3', '초4', '초5', '초6', '중1', '중2', '중3', '고1', '고2', '고3'];
export const MC_AREAS = ['listening', 'reading', 'phonics', 'grammar'];
export const WRITE_AREAS = ['form', 'sentence'];
export const AREA_KO = { listening: '듣기', reading: '독해', phonics: '파닉스', grammar: '문법', form: '어형', sentence: '영작', vocab: '어휘' };
// 2차 넬트식 문제지 (A/B). '고2' 단계는 고2~3.
export const STAGES2 = ['중1', '중2', '중3', '고1', '고2'];
export const STAGE_KO = { 중1: '중1', 중2: '중2', 중3: '중3', 고1: '고1', 고2: '고2~3' };
export const S2_AREAS = ['vocab', 'grammar', 'reading', 'listening', 'sentence'];
export const PASS = 80;
export const MIN_STAGE1 = 20;
export const SECONDS = 90;

// 문장 틀(template)이 있으면 직접 쓰기. 어형·영작도 선택지로 내면 객관식 (원장 결정 10/1: 시험에서 직접 쓰기는 뺀다)
export const isWrite = (it) => WRITE_AREAS.includes(it?.area) && it?.template != null;
export const blanks = (template) => (String(template ?? '').match(/\{\}/g) || []).length;
export const nextSet = (last) => (last === 'A' ? 'B' : 'A');
// 듣기 수준(중1~고3) → 그 학년 1학기 단계. 말 빠르기(scale 의 wpm)를 찾을 때 쓴다.
export const levelStep = (level) => 9 + 2 * (LEVELS.indexOf(level) - LEVELS.indexOf('중1'));

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/[‘’]/g, "'").replace(/[.,!?]+$/, '').replace(/\s+/g, ' ').trim();

// 칸마다 인정 답 중 하나와 같아야 하고, 모든 칸이 맞아야 정답
export function checkWrite(it, entries) {
  return it.answers.every((ok, i) => ok.some((a) => norm(a) === norm(entries?.[i])));
}

// 선택지 수: 1차 4, 2차 어휘 3 · 그 밖 5
export const choiceCount = (it, stage = 1) => (stage === 2 ? (it?.area === 'vocab' ? 4 : 5) : 4);
// 문항당 제한 시간(초): 2차 어휘 20 · 문법 60 · 그 밖 90, 1차 90
export const secondsFor = (it, stage = 1) => (stage === 2 ? { vocab: 20, grammar: 60 }[it?.area] ?? SECONDS : SECONDS);

export function validateForm(it, stage = 1) {
  const p = [];
  const areas = stage === 2 ? S2_AREAS : [...MC_AREAS, ...WRITE_AREAS];
  const n = choiceCount(it, stage);
  if (!it?.id) p.push('id');
  if (!areas.includes(it?.area)) p.push('영역');
  if (!(stage === 2 ? STAGES2 : LEVELS).includes(it?.level)) p.push('수준');
  if (!Number.isInteger(it?.no) || it.no < 1) p.push('번호');
  if (!String(it?.question ?? '').trim()) p.push('질문');
  if (isWrite(it)) {
    const b = blanks(it.template);
    if (!b) p.push('문장 틀');
    const a = it.answers;
    if (!Array.isArray(a) || !a.length || !a.every((x) => Array.isArray(x) && x.length && x.every((y) => String(y).trim()))) p.push('인정 답');
    else if (a.length !== b) p.push('칸 수');
  } else if (areas.includes(it?.area)) {
    const c = it.choices;
    const okCount = Array.isArray(c) && c.length === n;
    if (!okCount || c.some((x) => !String(x).trim())) p.push(`선택지 ${n}개`);
    else if (new Set(c.map((x) => String(x).trim())).size !== n) p.push('선택지 중복');
    // 선택지 수가 틀리면 정답 번호는 따지지 않는다 (선택지 문제 하나만 알린다)
    if (okCount && (!Number.isInteger(it.answer) || it.answer < 0 || it.answer >= n)) p.push('정답');
    if (it.area === 'reading' && !String(it.passage ?? '').trim()) p.push('지문');
    if (it.area === 'listening' && !String(it.script ?? '').trim()) p.push('대본');
  }
  return p;
}

export function usableForm(list, stage = 1) {
  return (Array.isArray(list) ? list : []).filter((i) => i?.status === 'ok' && !validateForm(i, stage).length).sort((a, b) => a.no - b.no);
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
// __말__ → 밑줄. 빈칸(____)과 겹치지 않게 앞뒤가 밑줄 문자·빈칸이 아닌 것만.
export const marked = (s) => esc(s).replace(/(?<!_)__([^_\s](?:[^_]*[^_\s])?)__(?!_)/g, '<u>$1</u>');

// ── 1차 점수와 수준 (설계서 7장) ──
export const LEVEL_AREAS = { listening: '듣기', reading: '독해', grammar: '문법', writing: '쓰기' };
const GROUP = { listening: 'listening', reading: 'reading', grammar: 'grammar', form: 'grammar', sentence: 'writing' };

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
// 듣기(중1~고3 문항)는 수업 시작 수준을 정하는 데 넣지 않는다
export function startLevel(levels) {
  const vals = ['reading', 'grammar', 'writing'].map((k) => levels[k]).filter(Boolean);
  return vals.length ? vals.reduce((a, b) => (rank(b) < rank(a) ? b : a)) : null;
}

export const phonicsNote = (levels) => (levels.phonics.total && levels.phonics.correct < levels.phonics.total ? '파닉스 복습 권장' : '');

export function writeSummary(log) {
  const wrong = log.filter((x) => !x.correct);
  return { correct: log.length - wrong.length, total: log.length, missed: [...new Set(wrong.map((x) => x.point).filter(Boolean))] };
}

// ── 시험 화면 위 띠의 단계 진행 막대 (10/2: 문제지가 학년 단계 순) ──
export const RAIL_KO = { vocab: '어휘', listening: '듣기', phonics: '소리', reading: '독해', grammar: '문법', form: '어형', sentence: '영작' };
// 문제지(번호 순) 에서 이어지는 같은 단계를 한 칸으로. i = 지금 문항 자리(다 끝났으면 list.length)
export function railFor(list, i) {
  const cells = [];
  list.forEach((it, n) => {
    let c = cells.at(-1);
    if (c?.key !== it.level) cells.push(c = { key: it.level, label: STAGE_KO[it.level] ?? it.level, done: 0, total: 0, current: false });
    c.total += 1;
    if (n < i) c.done += 1;
    if (n === i) c.current = true;
  });
  return cells;
}

// 문제지 순서 검사 (설계 10/2): 번호 순으로 단계가 내려가지 않고, 같은 단계 안은 이 영역 차례
export const AREA_ORDER = ['listening', 'phonics', 'vocab', 'grammar', 'form', 'reading', 'sentence'];
export function checkOrder(list) {
  const s = [...list].sort((a, b) => a.no - b.no);
  const p = [];
  s.slice(1).forEach((x, k) => {
    const prev = s[k];
    const d = LEVELS.indexOf(x.level) - LEVELS.indexOf(prev.level);
    if (d < 0) p.push(`${x.no}번 ${x.level} 이 ${prev.no}번 ${prev.level} 보다 낮음`);
    else if (d === 0 && AREA_ORDER.indexOf(x.area) < AREA_ORDER.indexOf(prev.area)) p.push(`${x.no}번 ${x.area} 가 같은 단계 ${prev.no}번 ${prev.area} 뒤`);
  });
  return p;
}

// ── 2차 영역별 수준 (단계마다 3분의 2) ──
const S2_GROUP = { vocab: 'vocab', grammar: 'grammar', reading: 'reading', listening: 'listening', sentence: 'writing' };

// 중1부터 올라가며 그 단계 문항을 3분의 2 이상 맞혀야 다음 단계. 처음 못 넘은 단계에서 멈추되 정답률은 모든 단계에서 낸다.
export function stage2Levels(log) {
  const out = {};
  for (const g of ['vocab', 'grammar', 'reading', 'listening', 'writing']) {
    const mine = log.filter((x) => S2_GROUP[x.area] === g);
    const steps = [];
    let level = null;
    let stopped = false;
    for (const lv of STAGES2) {
      const at = mine.filter((x) => x.level === lv);
      if (!at.length) continue;
      const correct = at.filter((x) => x.correct).length;
      steps.push({ level: lv, correct, total: at.length });
      if (stopped) continue;
      if (correct * 3 >= at.length * 2) level = lv;
      else { level ??= `${lv} 수준 아래`; stopped = true; }
    }
    out[g] = { level, steps };
  }
  return out;
}

// 문제지 순서(처음 나온 순서)대로 유형별 정답 수
export function kindTally(log, area) {
  const m = new Map();
  for (const x of log) {
    if (x.area !== area) continue;
    const t = m.get(x.kind) ?? { kind: x.kind, correct: 0, total: 0 };
    t.total += 1;
    if (x.correct) t.correct += 1;
    m.set(x.kind, t);
  }
  return [...m.values()];
}

// 영역 수준 → 리포트 est (통과한 단계의 다음 학기 앞)
export function stage2Est(level) {
  if (!level) return null;
  if (/ 수준 아래$/.test(level)) return { step: 9, unit: 0 };
  return { step: levelStep(level) + 2, unit: 0 };
}

// 2차 결과 → 결과지 sections (단어·문법·독해·듣기). log 는 비운다 — 원장용 적응형 표는 2차 문제지 표로 대신한다.
export function stage2Sections(log) {
  const lv = stage2Levels(log);
  return Object.fromEntries(['vocab', 'grammar', 'reading', 'listening'].map((k) => {
    const { level } = lv[k];
    return [k, { est: stage2Est(level), level, log: [], skipped: level ? '' : '응시하지 않음' }];
  }));
}

// 2차 수준 → 학년 단위 문장 ('중2' → '중2 과정 수준')
export function stageText(level) {
  if (!level) return '';
  const m = /^(.+) 수준 아래$/.exec(level);
  return m ? `${STAGE_KO[m[1]] ?? m[1]} 과정 전 단계` : `${STAGE_KO[level] ?? level} 과정 수준`;
}
