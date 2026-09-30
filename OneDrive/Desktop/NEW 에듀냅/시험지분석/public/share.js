// 카톡·블로그에 올릴 카드뉴스 3장. A4 분석지와 같은 ctx·같은 AI 글을 쓰고 숫자를 새로 계산하지 않는다.
// 공개용이므로 학생 정보는 받지도, 그리지도 않는다.
import { esc } from './lib.js';
import { sheet, header, footer, bars, badge, nums, grid, abbr, examName } from './report.js';

const CARD = 'card-news';

export function shareCards({ academy, meta, items, stats }, school) {
  const name = `${examName(meta)} ${meta.subject}`;
  const file = (n) => `${meta.school}-${meta.grade}-${meta.subject}-카드${n}`;
  const byNo = new Map(items.map((it) => [it.no, it]));

  const one = sheet(file(1), `
    ${header(academy, `${name} 분석`, '한눈에 보는 이번 시험')}
    <section class="c-lead"><h3>총평 ${badge(stats.overall, `전체 난이도 ${stats.overall}`)}</h3><p>${esc(school.overview)}</p></section>
    <section class="c-grid"><h3>문항 한눈에</h3>
      ${grid(items, (it) => `<li><b>${esc(it.no)}</b>${badge(it.difficulty)}<span>${esc(abbr(it.area))}</span></li>`)}
    </section>
    ${nums([[esc(stats.count), '문항'], [`${esc(stats.essayPointsPct)}%`, '서술형 배점'], [`${esc(stats.hardPct)}%`, '중상 이상']])}
    ${footer(academy)}`, CARD);

  const two = sheet(file(2), `
    ${header(academy, '무엇이 나왔나', name)}
    <section class="c-bars"><h3>영역별 문항</h3>${bars(stats.byArea, (r) => `${r.count}문항 · ${r.points}점`)}</section>
    <section class="c-bars"><h3>난이도 분포</h3>${bars(stats.byDifficulty, (r) => `${r.count}문항`)}</section>
    ${footer(academy)}`, CARD);

  const three = sheet(file(3), `
    ${header(academy, '다음 시험 준비', name)}
    <section><h3>어려웠던 문항</h3><ol class="c-key">${school.keyItems.map((k) => {
    const it = byNo.get(k.no);
    return `<li><b>${esc(k.no)}번</b> <span>${esc(it ? `${it.subtype} · ${it.difficulty} · ${it.points}점` : '')}</span><p>${esc(k.why)}</p></li>`;
  }).join('')}</ol></section>
    <section><h3>이렇게 준비합니다</h3><dl class="c-strategy">${school.strategy.map((s) => `<dt>${esc(s.area)}</dt><dd>${esc(s.tip)}</dd>`).join('')}</dl></section>
    ${footer(academy, '자세한 분석은 상담 때 보여 드립니다')}`, CARD);

  return one + two + three;
}
