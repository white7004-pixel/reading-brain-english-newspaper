// 예상 진도 (설계서 5.1). 숫자는 전부 여기서 계산하고 AI 에는 결과만 넘긴다.
import { SECTIONS, GRADES, MAX_STEP, gradeIndex, labelOf, termOf } from './scale.js';

export const DEFAULT_PACE = 3; // 한 해에 오르는 학기 수 (학교의 1.5배)
export const END = MAX_STEP + 1; // 고3 2학기 4단원까지 마친 자리

// ponytail: 단원을 확인하지 못한 영역은 그 학기의 절반(2단원)으로 본다.
export function position(est) {
  return est.step + (est.unit ?? 2) / 4;
}

// 학년은 3월에 오른다
export function schoolYear(date) {
  const y = Number(date.slice(0, 4));
  return Number(date.slice(5, 7)) >= 3 ? y : y - 1;
}

export function addMonths(date, n) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}

export function gradeAt(grade, from, to) {
  const gi = gradeIndex(grade) + schoolYear(to) - schoolYear(from);
  return gi > 12 ? '고3 졸업 이후' : `${GRADES[gi - 1]} ${termOf(to)}학기`;
}

const round1 = (n) => Math.round(n * 10) / 10;

function doneLabel(grade, date, years) {
  return years <= 0 ? '고3 과정 완료' : gradeAt(grade, date, addMonths(date, Math.round(years * 12)));
}

export function project({ grade, date, ests, pace = DEFAULT_PACE }) {
  const taken = SECTIONS.filter((k) => ests[k]);
  if (!taken.length) return null;
  const p = pace >= 1 && pace <= 6 ? pace : DEFAULT_PACE;
  const years = (k, v) => Math.max(0, END - position(ests[k])) / v;
  const at = (v) => {
    const section = taken.reduce((a, k) => (years(k, v) > years(a, v) ? k : a));
    const y = years(section, v);
    return { years: round1(y), label: doneLabel(grade, date, y), section };
  };
  const overall = at(p);
  const rows = [];
  const last = Math.min(6, Math.max(1, Math.ceil(years(overall.section, p))));
  for (let n = 0; n <= last; n++) {
    const when = addMonths(date, 12 * n);
    rows.push({
      when: `${n === 0 ? '지금' : `${n}년 뒤`} (${gradeAt(grade, date, when)})`,
      cells: Object.fromEntries(taken.map((k) => {
        const pos = position(ests[k]) + p * n;
        return [k, pos >= END ? '완료' : labelOf(Math.floor(pos))];
      })),
    });
  }
  return {
    pace: p,
    perSection: Object.fromEntries(taken.map((k) => [k, { years: round1(years(k, p)), label: doneLabel(grade, date, years(k, p)) }])),
    overall, low: at(p - 0.5), high: at(p + 0.5), rows,
  };
}
