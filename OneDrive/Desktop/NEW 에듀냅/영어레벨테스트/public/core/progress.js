// 예상 진도 (Klai형 설계서 3장). 숫자는 전부 여기서 계산하고 AI 에는 결과만 넘긴다.
import { SECTIONS, GRADES, MIN_STEP, MAX_STEP, gradeIndex, labelOf, currentStep } from './scale.js';

export const END = MAX_STEP + 1; // 고3 2학기 4단원까지 마친 자리
export const EXAM_MONTHS = [4, 6, 9, 11]; // 시험 기간 — 진도가 나가지 않는 달
export const PACE = 3; // 한 해에 나아가는 학기 수 — 수업 횟수와 관계없이, 중등·고등 같은 속도
const MAX_MONTHS = 120;
const MAX_POINTS = 10;

// ponytail: 단원을 확인하지 못한 영역은 그 학기의 절반(2단원)으로 본다.
export function position(est) {
  return est.step + (est.unit ?? 2) / 4;
}

// 중1 1학기 시작 0점 ~ 고3 과정 끝 100점
export function score(pos) {
  return Math.max(0, Math.min(100, Math.round(((pos - MIN_STEP) / (END - MIN_STEP)) * 100)));
}

export function levelOf(pos) {
  return pos >= END ? '고3 과정 완료' : labelOf(Math.floor(pos));
}

// 지금 학년의 학기 한가운데
export function gradePos(grade, date) {
  return currentStep(grade, date) + 0.5;
}

export function gapText(pos, now) {
  const n = Math.round(pos - now);
  return n > 0 ? `${n}학기 앞섬` : n < 0 ? `${-n}학기 뒤` : '학년 수준';
}

// 학년은 3월에 오른다. date 는 'YYYY-MM-DD' 또는 'YYYY-MM'
export function schoolYear(date) {
  const y = Number(date.slice(0, 4));
  return Number(date.slice(5, 7)) >= 3 ? y : y - 1;
}

const monthIndex = (date) => Number(date.slice(0, 4)) * 12 + Number(date.slice(5, 7)) - 1;
const monthOf = (i) => `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, '0')}`;

export function monthLabel(grade, start, month) {
  const gi = gradeIndex(grade) + schoolYear(month) - schoolYear(start);
  return gi > GRADES.length ? '고3 졸업 이후' : `${GRADES[gi - 1]} ${Number(month.slice(5, 7))}월`;
}

// 수업 시작 달부터 고3 2월까지 (두 달 모두 셈)
export function monthsLeft(grade, start) {
  const endYear = schoolYear(start) + GRADES.length - gradeIndex(grade) + 1; // 고3 학년도의 이듬해 2월
  return Math.max(0, monthIndex(`${endYear}-02`) - monthIndex(start) + 1);
}

export function ym(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y && m ? `${y}년 ${m}개월` : y ? `${y}년` : `${m}개월`;
}

function thin(points) {
  if (points.length <= MAX_POINTS) return points;
  const k = (points.length - 1) / (MAX_POINTS - 1);
  return Array.from({ length: MAX_POINTS }, (_, i) => points[Math.round(i * k)]);
}

// 수업 시작 달부터 한 달씩: 시험 달이 아니면 같은 만큼 나아가고, 학기가 바뀔 때마다 점을 찍는다.
export function roadmap({ est, grade, start }) {
  const perMonth = PACE / (12 - EXAM_MONTHS.length);
  const first = monthIndex(start);
  let pos = position(est);
  const point = (i, done = false) => {
    const month = monthOf(first + i);
    return { month, when: monthLabel(grade, start, month), level: done ? '고3 과정 완료' : levelOf(pos), done };
  };
  if (pos >= END) return { months: 0, done: true, points: [point(0, true)] };
  const points = [point(0)];
  for (let i = 1; i <= MAX_MONTHS; i++) {
    if (EXAM_MONTHS.includes(((first + i) % 12) + 1)) continue;
    const before = Math.floor(pos);
    pos += perMonth;
    if (pos >= END) return { months: i, done: true, points: thin([...points, point(i, true)]) };
    if (Math.floor(pos) > before) points.push(point(i));
  }
  return { months: MAX_MONTHS, done: false, points: thin(points) };
}

export function project({ grade, start, ests }) {
  const taken = SECTIONS.filter((k) => ests[k]);
  if (!taken.length) return null;
  const perSection = Object.fromEntries(taken.map((k) => [k, roadmap({ est: ests[k], grade, start })]));
  const slow = taken.reduce((a, k) => (perSection[k].months > perSection[a].months ? k : a));
  const r = perSection[slow];
  const label = r.months === 0 ? '고3 과정 완료' : r.done ? r.points.at(-1).when : '고3 졸업 이후';
  return { perSection, left: monthsLeft(grade, start), overall: { section: slow, months: r.months, label } };
}
