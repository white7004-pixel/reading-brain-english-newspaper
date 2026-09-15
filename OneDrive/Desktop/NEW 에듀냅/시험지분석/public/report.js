// A4 틀. AI 글과 계산된 숫자를 정해진 자리에 넣는다. 모든 글은 esc 로 넣는다.
import { esc, to3 } from './lib.js';

const sheet = (fileName, html) => `
<div class="sheet">
  <div class="tools"><button type="button" data-png="${esc(fileName)}">PNG 받기</button></div>
  <article class="page">${html}</article>
</div>`;

const header = (academy, title, sub) => `
<header class="r-head">
  ${academy.logo ? `<img class="r-logo" src="${esc(academy.logo)}" alt="${esc(academy.name)} 로고">` : ''}
  <div>
    <p class="r-academy">${esc(academy.name)}</p>
    <h2 contenteditable>${esc(title)}</h2>
    <p class="r-sub">${esc(sub)}</p>
  </div>
</header>`;

const footer = (academy) => `<footer class="r-foot">${esc(academy.name)}${academy.phone ? ` · ${esc(academy.phone)}` : ''}</footer>`;

const bars = (rows, caption) => `<ul class="bars">${rows.map((r) => `<li><span>${esc(r.label)}</span><i style="--w:${r.pct}%"></i><b>${esc(caption(r))}</b></li>`).join('')}</ul>`;

const badge = (d, shown = d) => `<em class="d d-${esc(to3(d))}">${esc(shown)}</em>`;

function itemTables(items, { wrong = new Set(), threeLevel = false } = {}) {
  const rows = items.map((it) => `
    <tr class="${wrong.has(it.no) ? 'wrong' : ''}">
      <td>${wrong.has(it.no) ? '✕ ' : ''}${it.no}</td><td>${esc(it.area)}</td><td>${esc(it.subtype)}</td>
      <td>${badge(it.difficulty, threeLevel ? to3(it.difficulty) : it.difficulty)}</td><td>${it.points}</td>
    </tr>`);
  const table = (part) => `<table class="r-table"><thead><tr><th>번호</th><th>영역</th><th>세부유형</th><th>난이도</th><th>배점</th></tr></thead><tbody>${part.join('')}</tbody></table>`;
  if (rows.length <= 20) return `<div class="r-tables single">${table(rows)}</div>`;
  const half = Math.ceil(rows.length / 2);
  return `<div class="r-tables">${table(rows.slice(0, half))}${table(rows.slice(half))}</div>`;
}

const examName = (meta) => `${meta.school} ${meta.grade} ${meta.term} ${meta.exam}`;

export function schoolPage({ academy, meta, items, stats }, school) {
  const byNo = new Map(items.map((it) => [it.no, it]));
  return sheet(`${meta.school}-${meta.grade}-영어분석`, `
    ${header(academy, `${examName(meta)} 영어 분석`, `${stats.count}문항 · ${stats.total}점 만점`)}
    <section class="r-block">
      <h3>총평 ${badge(stats.overall, `전체 난이도 ${stats.overall}`)}</h3>
      <p contenteditable>${esc(school.overview)}</p>
    </section>
    <section class="r-nums">
      <div><b>${stats.count}</b><span>문항</span></div>
      <div><b>${stats.essayPointsPct}%</b><span>서술형 배점 비율</span></div>
      <div><b>${stats.hardPct}%</b><span>중상 이상 문항</span></div>
    </section>
    <section class="r-two">
      <div><h3>영역별 문항</h3>${bars(stats.byArea, (r) => `${r.count}문항 · ${r.points}점`)}</div>
      <div><h3>난이도 분포</h3>${bars(stats.byDifficulty, (r) => `${r.count}문항`)}</div>
    </section>
    <section class="r-block"><h3>문항별 분석</h3>${itemTables(items)}</section>
    <section class="r-block">
      <h3>변별 문항</h3>
      <ol class="r-key">${school.keyItems.map((k) => {
        const it = byNo.get(k.no);
        return `<li><b>${k.no}번</b> <span>${esc(it ? `${it.subtype} · ${it.difficulty} · ${it.points}점` : '')}</span><p contenteditable>${esc(k.why)}</p></li>`;
      }).join('')}</ol>
    </section>
    <section class="r-block">
      <h3>다음 시험 대비 전략</h3>
      <dl class="r-strategy">${school.strategy.map((s) => `<dt>${esc(s.area)}</dt><dd contenteditable>${esc(s.tip)}</dd>`).join('')}</dl>
    </section>
    ${footer(academy)}`);
}

export function studentPage({ academy, meta, items }, student, stats, text) {
  const wrong = new Set(student.wrong.map((w) => w.no));
  const byNo = new Map(items.map((it) => [it.no, it]));
  const causes = text.causes.length
    ? text.causes.map((c) => {
      const it = byNo.get(c.no) || {};
      return `<article>
        <header><b>${c.no}번</b><span>${esc(it.area)} · ${esc(it.subtype)} · 난이도 ${esc(to3(it.difficulty))}</span><em>${esc(c.cause)}</em></header>
        <p contenteditable>${esc(c.explain)}</p>
      </article>`;
    }).join('')
    : '<p>틀린 문항이 없습니다.</p>';
  return sheet(`${student.label}-영어리포트`, `
    ${header(academy, `${student.label} 학생 시험 분석 리포트`, `${examName(meta)} 영어`)}
    <section class="r-nums">
      <div><b>${stats.score}<small> / ${stats.total}</small></b><span>추정 점수*</span></div>
      <div><b>${stats.wrongCount}</b><span>틀린 문항</span></div>
      <div><b>${esc(stats.weakAreas.join(' · ') || '없음')}</b><span>보완할 영역</span></div>
    </section>
    <section class="r-block"><h3>시험 총평</h3><p contenteditable>${esc(text.summary)}</p></section>
    <section class="r-block"><h3>문항별 결과 <small>✕ 틀린 문항</small></h3>${itemTables(items, { wrong, threeLevel: true })}</section>
    <section class="r-block"><h3>영역별 정답률</h3>${bars(stats.byArea, (r) => `${r.correct} / ${r.count}`)}</section>
    <section class="r-block"><h3>오답 분석</h3><div class="r-causes">${causes}</div></section>
    <section class="r-block"><h3>학원 지도 방향</h3><ol class="r-dir">${text.directions.map((d) => `<li contenteditable>${esc(d)}</li>`).join('')}</ol></section>
    <p class="r-note">* 추정 점수는 서술형 부분점수를 반영하지 않았습니다.</p>
    ${footer(academy)}`);
}
