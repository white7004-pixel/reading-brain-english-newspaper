// 카톡·블로그에 올릴 카드뉴스 3장. A4 분석지와 같은 ctx·같은 AI 글·같은 표를 쓰고 숫자를 새로 계산하지 않는다.
// 공개용이므로 학생 정보는 받지도, 그리지도 않는다.
import { esc } from './lib.js';
import { sheet, header, footer, examName, examLine, kpi, trendList, composeTable, areaTable, unitTable, pointsTable, keyTable, strategyTable, typeTable } from './report.js';

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

  // 문항표 카드 — 학부모가 가장 많이 들여다보는 장이라 카드를 꽉 채운다 (원장님 요청 2026-10-02).
  // 두 단으로 나눠 한 장에 24문항. 넘치면 장이 늘어난다. 지문·정답은 싣지 않는다.
  const 줄 = 20;
  const 장수 = Math.max(1, Math.ceil(items.length / 줄));
  // 장이 둘 이상이면 고르게 나눈다 — 22문항을 20+2 로 두면 뒷장이 휑하다
  const 장당 = Math.ceil(items.length / 장수) || 줄;
  const 두단 = (몫) => {
    const 반 = Math.ceil(몫.length / 2);
    return `<div class="r-row r-row-tight">${typeTable(몫.slice(0, 반))}${typeTable(몫.slice(반))}</div>`;
  };
  const 문항표 = Array.from({ length: 장수 }, (_, i) => sheet(`${file(`문항표${i + 1}`)}`, `
    ${header(academy, '문항별 유형과 난이도', `${name}${장수 > 1 ? ` · ${i + 1} / ${장수}` : ''}`)}
    <section class="c-fill">${두단(items.slice(i * 장당, (i + 1) * 장당))}</section>
    ${footer(academy)}`, CARD)).join('');

  // 3장: 다음 시험 준비
  const three = sheet(file(3), `
    ${header(academy, '다음 시험 준비', name)}
    <section><h3>점수가 갈린 문항</h3>${keyTable(items, school.keyItems)}</section>
    <section class="c-mid"><h3>영역마다 이렇게 준비합니다</h3>${strategyTable(school.strategy)}</section>
    <section><h3>배점이 큰 문항</h3>${pointsTable(stats)}</section>
    ${footer(academy, '자세한 분석표는 상담 때 보여 드립니다')}`, CARD);

  return one + two + 문항표 + three;
}
