// A4 한 장 틀. AI 글과 계산된 숫자를 정해진 자리에 넣는다. 모든 글은 esc 로 넣는다.
// 글자·간격은 .page 의 --fit 배율(em)을 따라 함께 줄어든다 (app.js fitPage).
import { esc, to3 } from './lib.js';

// cls 는 종류(예: card-news). 공유 카드가 같은 틀을 쓰되 크기만 다르게 한다.
export const sheet = (fileName, html, cls = '') => `
<div class="sheet${cls ? ` ${cls}` : ''}">
  <div class="tools"><span class="fit-warn" hidden>내용이 많아 한 장을 넘습니다 — 글을 조금 줄여 주세요</span><button type="button" data-png="${esc(fileName)}">PNG 받기</button></div>
  <article class="page${cls ? ` ${cls}` : ''}">${html}</article>
</div>`;

export const header = (academy, title, sub) => `
<header class="r-head">
  <p class="r-academy">${academy.logo ? `<img class="r-logo" src="${esc(academy.logo)}" alt="${esc(academy.name)} 로고">` : ''}<span>${esc(academy.name)}</span></p>
  <h2 contenteditable>${esc(title)}</h2>
  <p class="r-sub">${esc(sub)}</p>
</header>`;

export const footer = (academy, note = '') => `<footer class="r-foot">${note ? `<span>${esc(note)}</span>` : ''}<span class="r-contact"><b>${esc(academy.name)}</b>${academy.phone ? ` · ${esc(academy.phone)}` : ''}</span></footer>`;

export const bars = (rows, caption) => `<ul class="bars">${rows.map((r) => `<li><span>${esc(r.label)}</span><i style="--w:${Number(r.pct) || 0}%"></i><b>${esc(caption(r))}</b></li>`).join('')}</ul>`;

export const badge = (d, shown = d) => `<em class="d d-${esc(to3(d))}">${esc(shown)}</em>`;

// 칸이 좁아 긴 영역 이름은 줄여 쓰고, 줄인 것만 범례에 풀어 적는다
const ABBR = { 대화문: '대화', 서술형: '서술', '화법과 작문': '화작', '수와 연산': '수·연산', '문자와 식': '문자·식', '확률과 통계': '확통', 생명과학: '생명', 지구과학: '지구', 일반사회: '일사' };
const abbr = (area) => ABBR[area] || area;
const abbrLegend = (items) => [...new Set(items.map((it) => it.area))].filter((a) => ABBR[a]).map((a) => ` · ${ABBR[a]}=${a}`).join('');

// 문항 칸 격자: 한 줄 10칸
const grid = (items, cell) => `<ol class="r-grid">${items.map(cell).join('')}</ol>`;

export const examName = (meta) => `${meta.school} ${meta.grade} ${meta.term} ${meta.exam}`;

export const nums = (cards) => `<div class="r-nums">${cards.map(([value, label]) => `<div><b>${value}</b><span>${esc(label)}</span></div>`).join('')}</div>`;

export function schoolPage({ academy, meta, items, stats }, school) {
  const byNo = new Map(items.map((it) => [it.no, it]));
  return sheet(`${meta.school}-${meta.grade}-${meta.subject}분석`, `
    ${header(academy, `${examName(meta)} ${meta.subject} 분석`, `${stats.count}문항 · ${stats.total}점 만점`)}
    <section class="r-row r-top">
      <div><h3>총평 ${badge(stats.overall, `전체 난이도 ${stats.overall}`)}</h3><p contenteditable>${esc(school.overview)}</p></div>
      ${nums([[esc(stats.count), '문항'], [`${esc(stats.essayPointsPct)}%`, '서술형 배점 비율'], [`${esc(stats.hardPct)}%`, '중상 이상 문항']])}
    </section>
    <section class="r-row">
      <div><h3>영역별 문항</h3>${bars(stats.byArea, (r) => `${r.count}문항 · ${r.points}점`)}</div>
      <div><h3>난이도 분포</h3>${bars(stats.byDifficulty, (r) => `${r.count}문항`)}</div>
    </section>
    <section>
      <h3>문항별 분석</h3>
      ${grid(items, (it) => `<li><b>${esc(it.no)}</b><span>${esc(it.points)}점</span>${badge(it.difficulty)}<span>${esc(abbr(it.area))}</span><small>${esc(it.subtype)}</small></li>`)}
      <p class="r-legend">칸: 번호·배점 / 난이도·영역 / 세부유형${esc(abbrLegend(items))}</p>
    </section>
    <section class="r-row">
      <div>
        <h3>변별 문항</h3>
        <ol class="r-key">${school.keyItems.map((k) => {
          const it = byNo.get(k.no);
          return `<li><b>${esc(k.no)}번</b> <span>${esc(it ? `${it.subtype} · ${it.difficulty} · ${it.points}점` : '')}</span><p contenteditable>${esc(k.why)}</p></li>`;
        }).join('')}</ol>
      </div>
      <div>
        <h3>다음 시험 대비 전략</h3>
        <dl class="r-strategy">${school.strategy.map((s) => `<dt>${esc(s.area)}</dt><dd contenteditable>${esc(s.tip)}</dd>`).join('')}</dl>
      </div>
    </section>
    ${footer(academy)}`);
}

export function studentPage({ academy, meta, items }, student, stats, text) {
  const wrong = new Set(student.wrong.map((w) => w.no));
  const byNo = new Map(items.map((it) => [it.no, it]));
  const causes = text.causes.length
    ? `<ol class="r-causes${text.causes.length > 6 ? ' two' : ''}">${text.causes.map((c) => {
      const it = byNo.get(c.no) || {};
      return `<li><b>${esc(c.no)}번</b> <span class="r-meta">${esc(it.area)} ${esc(it.subtype)}</span> ${badge(it.difficulty, to3(it.difficulty))} <strong>${esc(c.cause)}</strong> <span contenteditable>${esc(c.explain)}</span></li>`;
    }).join('')}</ol>`
    : '<p>틀린 문항이 없습니다.</p>';
  return sheet(`${student.label}-${meta.subject}리포트`, `
    ${header(academy, `${student.label} 학생 시험 분석 리포트`, `${examName(meta)} ${meta.subject}`)}
    <section class="r-row">
      ${nums([
        [`${esc(stats.score)}<small> / ${esc(stats.total)}</small>`, '추정 점수*'],
        [esc(stats.wrongCount), '틀린 문항'],
        [esc(stats.weakAreas.join(' · ') || '없음'), '보완할 영역'],
      ])}
      <div><h3>영역별 정답률</h3>${bars(stats.byArea, (r) => `${r.correct} / ${r.count}`)}</div>
    </section>
    <section>
      <h3>문항별 결과</h3>
      ${grid(items, (it) => {
        const x = wrong.has(it.no);
        return `<li${x ? ' class="wrong"' : ''}><b>${esc(it.no)}</b><i>${x ? '✕' : ''}</i><span>${esc(abbr(it.area))}</span>${badge(it.difficulty, to3(it.difficulty))}</li>`;
      })}
      <p class="r-legend"><i class="r-x">✕</i> 틀린 문항 · 칸: 번호 / 영역·난이도(상·중·하)${esc(abbrLegend(items))}</p>
    </section>
    <section><h3>오답 분석</h3>${causes}</section>
    <section class="r-row">
      <div><h3>시험 총평</h3><p contenteditable>${esc(text.summary)}</p></div>
      <div><h3>학원 지도 방향</h3><ol class="r-dir">${text.directions.map((d) => `<li contenteditable>${esc(d)}</li>`).join('')}</ol></div>
    </section>
    ${footer(academy, '* 추정 점수는 서술형 부분점수를 반영하지 않았습니다.')}`);
}
