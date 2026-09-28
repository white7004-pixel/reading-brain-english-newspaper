// 문항 은행 — 검사, 고르기, 모자란 단원 찾기.
import { SECTIONS, SCALE, MIN_STEP, MAX_STEP } from './scale.js';

export const MIN_PER_UNIT = 2;
export const MIN_PER_SECTION = 20;

export function validateItem(it) {
  const p = [];
  if (!SECTIONS.includes(it.section)) p.push('영역');
  if (!Number.isInteger(it.step) || it.step < MIN_STEP || it.step > MAX_STEP) p.push('단계');
  if (![1, 2, 3, 4].includes(it.unit)) p.push('단원');
  if (!it.id) p.push('id');
  if (!String(it.question ?? '').trim()) p.push('질문');
  if (!Array.isArray(it.choices) || it.choices.length !== 4 || it.choices.some((c) => !String(c).trim())) p.push('선택지 4개');
  else if (new Set(it.choices.map((c) => String(c).trim())).size !== 4) p.push('선택지 중복');
  if (![0, 1, 2, 3].includes(it.answer)) p.push('정답');
  if ((it.section === 'reading' || it.section === 'listening') && !String(it.passage ?? '').trim()) p.push(it.section === 'reading' ? '지문' : '대본');
  return p;
}

export function usable(items) {
  return items.filter((i) => i.status === 'ok' && validateItem(i).length === 0);
}

// unit 이 있으면 그 단원만. null 이면 그 단계 아무 단원, 없으면 가까운 단계(±1, ±2)에서 찾는다.
export function pick(items, section, step, unit, used = new Set(), rnd = Math.random) {
  const at = (s, u) => items.filter((i) => i.section === section && i.step === s && (u == null || i.unit === u) && !used.has(i.id));
  let pool = at(step, unit);
  for (let d = 1; unit == null && !pool.length && d <= 2; d++) pool = [...at(step - d, null), ...at(step + d, null)];
  return pool.length ? pool[Math.floor(rnd() * pool.length)] : null;
}

export function coverage(items) {
  const ok = usable(items);
  const short = [];
  for (const section of SECTIONS) for (const { step } of SCALE) for (const unit of [1, 2, 3, 4]) {
    const n = ok.filter((i) => i.section === section && i.step === step && i.unit === unit).length;
    if (n < MIN_PER_UNIT) short.push({ section, step, unit, n });
  }
  return short;
}

export function readiness(items, section) {
  const n = usable(items).filter((i) => i.section === section).length;
  return { n, ready: n >= MIN_PER_SECTION };
}
