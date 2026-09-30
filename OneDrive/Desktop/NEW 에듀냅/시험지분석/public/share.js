// 카톡·블로그에 올릴 카드뉴스 3장. A4 분석지와 같은 ctx·같은 AI 글·같은 표를 쓰고 숫자를 새로 계산하지 않는다.
// 공개용이므로 학생 정보는 받지도, 그리지도 않는다.
import { esc } from './lib.js';
import { sheet, header, footer, examName, examLine, kpi, trendList, composeTable, areaTable, unitTable, pointsTable, keyTable, strategyTable } from './report.js';

const CARD = 'card-news';

export function shareCards({ academy, meta, items, stats }, school) {
  const name = `${examName(meta)} ${meta.subject}`;
  const file = (n) => `${meta.school}-${meta.grade}-${meta.subject}-카드${n}`;
  const unit = unitTable(stats);

  // 1장: 한눈에 — 시험 정보, 핵심 수치, 한 줄 총평, 출제 경향
  const one = sheet(file(1), `
    ${header(academy, `${name} 분석`, '한눈에 보는 이번 시험')}
    ${examLine(meta, stats)}
    ${kpi(stats)}
    <section class="r-verdict"><b>한 줄 총평</b><p>${esc(school.overview)}</p></section>
    ${school.trends?.length ? `<section class="c-fill"><h3>출제 경향 요약</h3>${trendList(school.trends)}</section>` : ''}
    ${footer(academy)}`, CARD);

  // 2장: 어떻게 나왔나 — 단원(없으면 영역)과 시험 구성
  const two = sheet(file(2), `
    ${header(academy, '어떻게 나왔나', name)}
    <section><h3>${unit ? '단원별 출제' : '영역별 출제'}</h3>${unit || areaTable(stats)}</section>
    <section class="c-fill"><h3>시험 구성</h3>${composeTable(stats)}</section>
    ${footer(academy)}`, CARD);

  // 3장: 다음 시험 준비
  const three = sheet(file(3), `
    ${header(academy, '다음 시험 준비', name)}
    <section><h3>점수가 갈린 문항</h3>${keyTable(items, school.keyItems)}</section>
    <section class="c-mid"><h3>영역마다 이렇게 준비합니다</h3>${strategyTable(school.strategy)}</section>
    <section><h3>배점이 큰 문항</h3>${pointsTable(stats)}</section>
    ${footer(academy, '자세한 분석표는 상담 때 보여 드립니다')}`, CARD);

  return one + two + three;
}
