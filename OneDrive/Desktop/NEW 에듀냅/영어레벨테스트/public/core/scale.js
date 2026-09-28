// 척도 읽기 — 단계 ↔ 학년·학기, 단원 이름, 리포트 위치 문장. 브라우저와 Node 가 같이 쓴다.
import { SCALE } from '../data/scale.js';

export { SCALE };
export const SECTIONS = ['vocab', 'grammar', 'reading', 'listening'];
export const SECTION_KO = { vocab: '단어', grammar: '문법', reading: '독해', listening: '듣기' };
export const SECTION_TOPIC = { vocab: '단어는', grammar: '문법은', reading: '독해는', listening: '듣기는' };
export const GRADES = ['초1', '초2', '초3', '초4', '초5', '초6', '중1', '중2', '중3', '고1', '고2', '고3'];
export const MIN_STEP = SCALE[0].step;
export const MAX_STEP = SCALE.at(-1).step;
const BY_STEP = new Map(SCALE.map((s) => [s.step, s]));

export function gradeIndex(grade) {
  const i = GRADES.indexOf(grade);
  if (i < 0) throw new Error(`모르는 학년: ${grade}`);
  return i + 1;
}

// 초3-1 = 1, 중1-1 = 9, 고3-2 = 20
export function stepOf(grade, term) {
  return (gradeIndex(grade) - 3) * 2 + term;
}

export function labelOf(step) {
  if (step < 1) return '초1~2 기초';
  return `${GRADES[Math.floor((step - 1) / 2) + 2]} ${((step - 1) % 2) + 1}학기`;
}

// 학교 학기: 3~8월 1학기, 9~2월 2학기 (1·2월은 앞 학년의 2학기)
export function termOf(date) {
  const m = Number(date.slice(5, 7));
  return m >= 3 && m <= 8 ? 1 : 2;
}

export function currentStep(grade, date) {
  return stepOf(grade, termOf(date));
}

export function startStep(grade) {
  return Math.min(MAX_STEP, Math.max(MIN_STEP, stepOf(grade, 1)));
}

export function stepData(step) {
  const s = BY_STEP.get(step);
  if (!s) throw new Error(`척도에 없는 단계: ${step}`);
  return s;
}

export function unitName(section, step, unit) {
  const u = stepData(step)[section][unit - 1];
  return typeof u === 'string' ? u : u.name;
}

// est = { step, unit } — unit 0 은 그 학기 1단원 전, null 은 단원을 확인하지 못함
export function positionText(section, est) {
  if (!est) return '응시하지 않음';
  const { step, unit } = est;
  if (unit == null) return `${labelOf(step)} 수준 (단원은 확인하지 못함)`;
  if (unit === 0) return `${labelOf(step)} 1단원(${unitName(section, step, 1)}) 전 단계`;
  return `${labelOf(step)} ${unit}단원(${unitName(section, step, unit)})까지 이해`;
}

export function nextUnit(est) {
  const { step, unit } = est;
  if (unit == null) return { step, unit: 1 };
  if (unit < 4) return { step, unit: unit + 1 };
  return step < MAX_STEP ? { step: step + 1, unit: 1 } : null;
}
