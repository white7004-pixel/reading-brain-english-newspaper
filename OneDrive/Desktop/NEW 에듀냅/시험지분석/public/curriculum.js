// 교육과정 자료를 학년으로 찾아 주는 얇은 층. 계산도 화면도 여기서 하지 않는다.
// 모르는 과목·학년이면 빈 배열을 준다 — 부르는 쪽이 지금 동작으로 물러설 수 있게.
import 국어 from './curriculum/국어.js';
import 영어 from './curriculum/영어.js';
import 영어문법 from './curriculum/영어문법.js';

const 자료 = { 국어, 영어 };
export const GRADES = ['중1', '중2', '중3', '고1', '고2', '고3'];

const 과정들 = (과목, 학년) => (자료[과목]?.과정 ?? []).filter((c) => c.학년.includes(학년));
const 모아서 = (list) => [...new Set(list)];

export const areasFor = (과목, 학년) => 모아서(과정들(과목, 학년).flatMap((c) => c.영역.map((d) => d.이름)));

// 단원 후보: 그 학년 교과서 목차가 있으면 그것, 없으면 교육과정 영역
export const unitsFor = (과목, 학년) => {
  const 목차 = (자료[과목]?.교과서 ?? []).filter((b) => b.학년 === 학년).flatMap((b) => b.단원);
  return 목차.length ? 모아서(목차) : areasFor(과목, 학년);
};

export const pointsFor = (과목, 학년) =>
  모아서(과정들(과목, 학년).flatMap((c) => c.영역.flatMap((d) => d.성취기준.map((s) => s.요약))));

// 영어 문법은 교육과정에 없다. 학원 분류표(./curriculum/영어문법.js)에서 학년대로 찾는다.
export const grammarFor = (학년) =>
  모아서(영어문법.묶음.filter((g) => g.학년대.includes(학년)).flatMap((g) => g.항목));
