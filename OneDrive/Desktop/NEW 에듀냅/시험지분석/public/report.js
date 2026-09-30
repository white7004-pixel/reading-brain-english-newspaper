// A4 한 장 틀. AI 글과 계산된 숫자를 정해진 자리에 넣는다. 모든 글은 esc 로 넣는다.
// 글자·간격은 .page 의 --fit 배율(em)을 따라 함께 줄어든다 (app.js fitPage).
import { esc, to3, nosText } from './lib.js';

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

export const badge = (d, shown = d) => `<em class="d d-${esc(to3(d))}">${esc(shown)}</em>`;

// 칸이 좁아 긴 영역 이름은 줄여 쓰고, 줄인 것만 범례에 풀어 적는다
const ABBR = { 대화문: '대화', 서술형: '서술', '화법과 작문': '화작', '수와 연산': '수·연산', '문자와 식': '문자·식', '확률과 통계': '확통', 생명과학: '생명', 지구과학: '지구', 일반사회: '일사' };
export const abbr = (area) => ABBR[area] || area;
const abbrLegend = (items) => [...new Set(items.map((it) => it.area))].filter((a) => ABBR[a]).map((a) => ` · ${ABBR[a]}=${a}`).join('');
const SRC = { 교과서: '교과', 부교재: '부교', 기출변형: '기출' };
const srcAbbr = (s) => SRC[s] || s || '—';

// ---------- 분석표 ----------
// 머리글 이름 앞에 # 를 붙이면 숫자 칸(오른쪽 정렬)
export const table = (head, rows, cls = '') => `<table class="t${cls ? ` ${cls}` : ''}">
  <thead><tr>${head.map((h) => `<th${h.startsWith('#') ? ' class="num"' : ''}>${esc(h.replace(/^#/, ''))}</th>`).join('')}</tr></thead>
  <tbody>${rows.join('')}</tbody></table>`;
export const num = (v) => `<td class="num">${esc(v)}</td>`;
// 비율 칸은 숫자 옆에 작은 막대를 둬 표만 보고도 비중이 보이게 한다
export const barCell = (pct, text) => `<td class="bar"><i style="--w:${Number(pct) || 0}%"></i><span>${esc(text)}</span></td>`;
// 구분(유형·난이도·출처)을 한 칸으로 묶은 줄들
const groupRows = (label, rows) => rows.map((r, i) => `<tr>${i ? '' : `<th class="grp" rowspan="${rows.length}" scope="rowgroup">${esc(label)}</th>`}<td>${esc(r.label)}</td>${num(r.count)}${num(r.points)}${barCell(r.pct, `${r.pct}%`)}</tr>`);

// ---------- A4 와 카드가 함께 쓰는 표 조각 (숫자는 examStats 값 그대로) ----------
export const kpi = (stats) => nums([
  [esc(stats.count), '전체 문항'],
  [esc(stats.total), '총 배점'],
  [`${esc(stats.essayPointsPct)}%`, `서술형 배점 (${esc(stats.essayCount)}문항)`],
  [`${esc(stats.hard.pct)}%`, `중상 이상 (${esc(stats.hard.count)}문항 · ${esc(stats.hard.points)}점)`],
]);

export const composeTable = (stats) => table(['구분', '항목', '#문항', '#배점', '#비율'], [
  ...groupRows('유형', stats.byKind),
  ...groupRows('난이도', stats.byDifficulty),
  ...(stats.bySource.length ? groupRows('출처', stats.bySource) : []),
]);

export const areaTable = (stats) => table(['영역', '문항 번호', '#문항', '#배점', '#비율'],
  stats.byArea.map((r) => `<tr><td>${esc(r.label)}</td><td class="pt">${esc(nosText(r.nos))}</td>${num(r.count)}${num(r.points)}${barCell(r.pct, `${r.pct}%`)}</tr>`));

export const pointsTable = (stats) => table(['#배점', '#문항 수', '문항 번호'],
  stats.byPoints.map((r) => `<tr>${num(`${r.points}점`)}${num(r.count)}<td class="pt">${esc(nosText(r.nos))}</td></tr>`));

// 변별 문항: 왜 어려웠는지까지. 문항표에 없는 번호는 AI 글에서 이미 걸러져 온다.
export const keyTable = (items, keyItems) => {
  const byNo = new Map(items.map((it) => [it.no, it]));
  return table(['#번호', '영역 · 세부유형', '#배점', '난이도', '왜 어려웠나'], keyItems.map((k) => {
    const it = byNo.get(k.no) || {};
    return `<tr>${num(k.no)}<td>${esc([it.area, it.subtype].filter(Boolean).join(' · '))}</td>${num(it.points ?? '')}<td class="c">${it.difficulty ? badge(it.difficulty) : ''}</td><td contenteditable>${esc(k.why)}</td></tr>`;
  }));
};

export const strategyTable = (strategy) => table(['영역', '준비 방법'],
  strategy.map((s) => `<tr><td>${esc(s.area)}</td><td contenteditable>${esc(s.tip)}</td></tr>`), 't-2');

// 전 문항 표. 한 장에 담으려 반으로 갈라 나란히 둔다.
const ITEM_HEAD = ['#번호', '유형', '영역', '세부 포인트', '#배점', '난이도', '출처'];
export function itemsTable(items) {
  const rows = (list) => list.map((it) => `<tr>${num(it.no)}<td class="c">${esc(it.kind[0])}</td><td>${esc(abbr(it.area))}</td><td class="pt">${esc(it.subtype)}</td>${num(it.points)}<td class="c">${badge(it.difficulty)}</td><td class="c">${esc(srcAbbr(it.source))}</td></tr>`);
  const half = Math.ceil(items.length / 2);
  return `<div class="r-row r-row-tight">${table(ITEM_HEAD, rows(items.slice(0, half)))}${table(ITEM_HEAD, rows(items.slice(half)))}</div>
    <p class="r-legend">유형: 객=객관식, 서=서술형 · 출처: 교과=교과서, 부교=부교재, 기출=기출변형, —=확인 안 됨${esc(abbrLegend(items))}</p>`;
}

// 문항 칸 격자: 한 줄 10칸
export const grid = (items, cell) => `<ol class="r-grid">${items.map(cell).join('')}</ol>`;

export const examName = (meta) => `${meta.school} ${meta.grade} ${meta.term} ${meta.exam}`;

export const nums = (cards) => `<div class="r-nums">${cards.map(([value, label]) => `<div><b>${value}</b><span>${esc(label)}</span></div>`).join('')}</div>`;

// 학교 시험 분석 A4 한 장. 학원 블로그의 분석 글처럼 표로 읽히도록 짰다.
// ① 핵심 수치 ② 총평 ③ 시험 구성·영역·배점 표 ④ 변별 문항 표 ⑤ 전 문항 표 ⑥ 대비 표
export function schoolPage({ academy, meta, items, stats }, school) {
  return sheet(`${meta.school}-${meta.grade}-${meta.subject}분석`, `
    ${header(academy, `${examName(meta)} ${meta.subject} 분석`, `${stats.count}문항 · ${stats.total}점 만점 · 전체 난이도 ${stats.overall}`)}
    ${kpi(stats)}
    <section class="r-sum"><h3>이번 시험 총평 ${badge(stats.overall, `전체 난이도 ${stats.overall}`)}</h3><p contenteditable>${esc(school.overview)}</p></section>
    <section class="r-row">
      <div><h3>시험 구성</h3>${composeTable(stats)}</div>
      <div><h3>영역별 출제</h3>${areaTable(stats)}<h3 class="r-sub-h">배점 구성</h3>${pointsTable(stats)}</div>
    </section>
    <section><h3>변별 문항 — 점수가 갈린 곳</h3>${keyTable(items, school.keyItems)}</section>
    <section class="r-items"><h3>전 문항 분석표</h3>${itemsTable(items)}</section>
    <section><h3>다음 시험 이렇게 준비합니다</h3>${strategyTable(school.strategy)}</section>
    ${footer(academy, '문항 난이도·출처는 시험지를 바탕으로 학원에서 분류한 것입니다.')}`);
}

// 학생 리포트도 학교 분석지와 같은 표로 (영역별 결과 / 오답 분석)
const studentAreaTable = (stats) => table(['영역', '#문항', '#맞힘', '틀린 번호', '#정답률'],
  stats.byArea.map((r) => `<tr><td>${esc(r.label)}</td>${num(r.count)}${num(r.correct)}<td class="pt">${esc(nosText(r.nos)) || '—'}</td>${barCell(r.pct, `${r.pct}%`)}</tr>`));

const causeTable = (items, causes) => {
  const byNo = new Map(items.map((it) => [it.no, it]));
  return table(['#번호', '영역 · 세부유형', '#배점', '난이도', '오답 원인', '무엇이 부족했나'], causes.map((c) => {
    const it = byNo.get(c.no) || {};
    return `<tr>${num(c.no)}<td>${esc([it.area, it.subtype].filter(Boolean).join(' · '))}</td>${num(it.points ?? '')}<td class="c">${it.difficulty ? badge(it.difficulty) : ''}</td><td class="c cause">${esc(c.cause)}</td><td contenteditable>${esc(c.explain)}</td></tr>`;
  }));
};

export function studentPage({ academy, meta, items }, student, stats, text) {
  const wrong = new Set(student.wrong.map((w) => w.no));
  const causes = text.causes.length ? causeTable(items, text.causes) : '<p>틀린 문항이 없습니다.</p>';
  return sheet(`${student.label}-${meta.subject}리포트`, `
    ${header(academy, `${student.label} 학생 시험 분석 리포트`, `${examName(meta)} ${meta.subject}`)}
    <section class="r-row">
      ${nums([
        [`${esc(stats.score)}<small> / ${esc(stats.total)}</small>`, '추정 점수*'],
        [esc(stats.wrongCount), '틀린 문항'],
        [esc(stats.weakAreas.join(' · ') || '없음'), '보완할 영역'],
      ])}
      <div><h3>영역별 결과</h3>${studentAreaTable(stats)}</div>
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
      <div class="r-sum"><h3>시험 총평</h3><p contenteditable>${esc(text.summary)}</p></div>
      <div class="r-sum"><h3>학원 지도 방향</h3><ol class="r-dir">${text.directions.map((d) => `<li contenteditable>${esc(d)}</li>`).join('')}</ol></div>
    </section>
    ${footer(academy, '* 추정 점수는 서술형 부분점수를 반영하지 않았습니다.')}`);
}
