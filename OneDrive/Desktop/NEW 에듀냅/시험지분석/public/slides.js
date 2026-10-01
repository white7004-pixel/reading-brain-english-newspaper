// 발표 슬라이드 (프리미엄 다크) — 설명회·상담에서 넘기며 말하는 자리의 물건.
// A4 리포트·정사각 카드·학원용 해설과 별개의 네 번째 산출물이다.
// 숫자는 examStats 에서만 오고, 모든 글은 esc 를 지난다.
// 지문·선택지 원문과 정답·풀이는 **싣지 않는다** (원장님 결정 2026-10-01, 시험지는 학교 저작물).
import { esc, nosText, difficultyFlow, donutSlices } from './lib.js';
import { sheet, badge, examName, examLine, crossTable, composeTable, areaTable, unitTable, abbr } from './report.js';

const SLIDE = 'slide';

// 장 하나. 머리글(학교·과목)과 바닥글(학원)이 늘 같은 자리에 선다.
const slide = (file, cls, body, { academy, meta }, n = '') => sheet(file, `
  <div class="s-wrap ${cls}">
    <header class="s-head">
      <p class="s-mark"><b>${esc(academy.name)}</b>${academy.logo ? `<img src="${esc(academy.logo)}" alt="">` : ''}</p>
      <p class="s-sub">${esc(`${meta.school} ${meta.grade} · ${meta.subject}`)}${n ? `<span class="s-no">${esc(n)}</span>` : ''}</p>
    </header>
    ${body}
    <footer class="s-foot"><span>${esc(examName(meta))}</span><span>${esc(academy.name)}${academy.phone ? ` · ${esc(academy.phone)}` : ''}</span></footer>
  </div>`, SLIDE);

// 장 제목: 작은 윗줄 + 큰 제목(마지막 낱말만 강조색) + 설명 한 줄
const title = (over, head, accent, lead = '') => `
  <div class="s-title">
    ${over ? `<p class="s-over">${esc(over)}</p>` : ''}
    <h2>${esc(head)}${accent ? ` <b>${esc(accent)}</b>` : ''}</h2>
    ${lead ? `<p class="s-lead" contenteditable>${esc(lead)}</p>` : ''}
  </div>`;

// 번호가 붙은 흰 판 (01 전체 난이도 …)
const panel = (no, head, body, cls = '') => `
  <section class="s-panel${cls ? ` ${cls}` : ''}">
    <h3><i>${esc(no)}</i>${esc(head)}</h3>${body}
  </section>`;

// 동그란 번호가 붙은 줄들 — 제목은 굵게, 설명은 뒤에 이어 붙인다
const steps = (rows) => `<ol class="s-steps">${rows.map(([t, d]) => `
  <li><b>${esc(t)}</b>${d ? `<span contenteditable> — ${esc(d)}</span>` : ''}</li>`).join('')}</ol>`;

// 숫자 번호면 `7번`, 학교가 따로 매긴 표기면 그대로 (`서답형 2`)
const noLabel = (no) => (/^\d+$/.test(no) ? `${no}번` : no);

const chips = (pairs) => `<p class="s-chips">${pairs.filter(([, v]) => v !== '' && v != null)
  .map(([k, v]) => `<span>${esc(k)} : ${esc(v)}</span>`).join('')}</p>`;

// ── 그림 ─────────────────────────────────────────────────────
// 난도 흐름 꺾은선. 참고 자료가 "뒤로 갈수록 어려워졌다"를 보여 줄 때 쓰는 그림이다.
// 어려워지는 구간(hardFrom 뒤)은 선과 점을 따로 그려 색을 달리한다.
export function flowChart(flow) {
  const { points, max, hardFrom } = flow;
  if (!points.length) return '';
  const W = 1000;
  const H = 300;
  const px = (p) => (points.length === 1 ? W / 2 : (p.x / (points.length - 1)) * (W - 40) + 20);
  const py = (p) => H - 30 - (p.y / max) * (H - 60);
  const line = (list, cls) => (list.length < 2 ? '' : `<polyline class="${cls}" points="${list.map((p) => `${px(p).toFixed(1)},${py(p).toFixed(1)}`).join(' ')}"/>`);
  const dots = (list, cls) => list.map((p) => `<circle class="${cls}" cx="${px(p).toFixed(1)}" cy="${py(p).toFixed(1)}" r="7"><title>${esc(p.no)}번 ${esc(p.difficulty)}</title></circle>`).join('');
  const 앞 = hardFrom == null ? points : points.slice(0, hardFrom + 1);
  const 뒤 = hardFrom == null ? [] : points.slice(hardFrom);
  const 뒤점 = hardFrom == null ? [] : points.slice(hardFrom + 1);
  const 눈금 = ['상', '중', '하'].map((label, i) => {
    const y = H - 30 - ((4 - i * 2) / max) * (H - 60);
    return `<line class="f-grid" x1="20" x2="${W - 20}" y1="${y}" y2="${y}"/><text class="f-tick" x="0" y="${y + 5}">${label}</text>`;
  }).join('');
  return `<svg class="s-flow" viewBox="0 0 ${W} ${H}" role="img" aria-label="문항 번호별 난이도 흐름">
    ${눈금}${line(앞, 'f-easy')}${line(뒤, 'f-hard')}${dots(앞, 'd-easy')}${dots(뒤점, 'd-hard')}
    <text class="f-tick" x="20" y="${H - 6}">${esc(points[0].no)}</text>
    <text class="f-tick f-end" x="${W - 20}" y="${H - 6}">${esc(points[points.length - 1].no)}</text>
  </svg>`;
}

// 난이도 도넛. conic-gradient 한 줄로 그린다 (인쇄에서도 색이 그대로 나온다).
export function donut(stats) {
  const slices = donutSlices(stats.byDifficulty);
  if (!slices.length) return '';
  const stops = slices.map((s) => `var(--d-${s.label}) ${s.from.toFixed(2)}deg ${s.to.toFixed(2)}deg`).join(', ');
  return `<div class="s-donut">
    <div class="s-ring" style="background: conic-gradient(${stops})"><span><i>체감 난이도</i><b>${esc(stats.overallLabel)}</b></span></div>
    <ul class="s-legend">${slices.map((s) => `<li><i class="d-${esc(s.label)}"></i>${esc(s.label)} <b>${esc(s.count)}문항</b> <span>${esc(s.pct)}%</span></li>`).join('')}</ul>
  </div>`;
}

// ── 장들 ─────────────────────────────────────────────────────
const 연도 = (meta) => (/^(\d{4})-/.test(meta.date || '') ? `${meta.date.slice(0, 4)}학년도 ` : '');

const cover = (ctx, school) => slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-표지`, 's-cover', `
  ${title(`${연도(ctx.meta)}${ctx.meta.school} ${ctx.meta.grade} ${ctx.meta.subject}`, '이번 시험', '분석', '')}
  <p class="s-quote" contenteditable>${esc(school.overview)}</p>
  ${school.keywords?.length ? `<div class="s-keys"><h3>이번 시험의 핵심 키워드</h3>
    <ul>${school.keywords.slice(0, 4).map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>` : ''}
  ${examLine(ctx.meta, ctx.stats)}`, ctx);

const glance = (ctx) => slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-한눈에`, 's-glance', `
  ${title('01', '시험', '한눈에')}
  <div class="s-row">
    ${panel('01', '전체 난이도', donut(ctx.stats))}
    ${panel('02', '시험 구성', `<ul class="s-kpi">
      <li><b>${esc(ctx.stats.count)}</b><span>전체 문항 (${esc(ctx.stats.total)}점)</span></li>
      <li><b>${esc(ctx.stats.hard.count)}</b><span>중상 이상 (${esc(ctx.stats.hard.points)}점)</span></li>
      <li><b>${esc(ctx.stats.essayPointsPct)}%</b><span>서술형 배점 (${esc(ctx.stats.essayCount)}문항)</span></li>
      <li><b>${esc(ctx.stats.textbookPct)}%</b><span>교과서에서 출제</span></li></ul>`)}
  </div>`, ctx);

const flowSlide = (ctx, school) => {
  const flow = difficultyFlow(ctx.items);
  const 뒤 = flow.hardFrom == null ? null : ctx.items[flow.hardFrom];
  return slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-난도흐름`, 's-flowpage', `
    ${title('02', '난도', '흐름', 뒤
      ? `${뒤.no}번 뒤로 중상 이상이 이어집니다. 뒤쪽에서 시간과 점수가 함께 갈렸습니다.`
      : '난도가 한쪽으로 몰리지 않고 고르게 퍼진 시험이었습니다.')}
    <div class="s-row s-flowrow">
      ${panel('02', '문항 번호별 난이도', flowChart(flow))}
      ${school.flow?.length ? panel('03', '문항은 이렇게 나왔습니다', steps(school.flow.map((l) => [l, '']))) : ''}
    </div>`, ctx);
};

const compose = (ctx) => slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-구성`, 's-compose', `
  ${title('03', '시험', '구성', '무엇을 얼마나 물었는지 한 장에 모았습니다.')}
  <div class="s-row">
    ${panel('01', '유형 · 난이도 · 배점 눈금', composeTable(ctx.stats))}
    ${panel('02', ctx.stats.byUnit.length ? '단원별 · 영역별 출제' : '영역별 출제',
    (ctx.stats.byUnit.length ? unitTable(ctx.stats) : '') + areaTable(ctx.stats))}
  </div>`, ctx);

const cross = (ctx) => slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-교차표`, 's-cross', `
  ${title('04', '영역 ×', '난이도', '어느 영역을 어렵게 냈는지 한 장에 보입니다.')}
  ${panel('01', '영역 × 난이도', crossTable(ctx.stats, ctx.items))}`, ctx);

const whyHard = (ctx, school) => (school.whyHard?.length ? slide(
  `${ctx.meta.school}-${ctx.meta.subject}슬라이드-이유`, 's-why', `
  ${title('05', '이번 시험이', '어려웠던 이유', '무엇을 요구한 시험이었는지 셋으로 나눠 봤습니다.')}
  <div class="s-row s-three">${school.whyHard.slice(0, 3).map((w, i) => panel(
    String(i + 1).padStart(2, '0'), w.title, `<p contenteditable>${esc(w.detail)}</p>`, 's-tall')).join('')}</div>`, ctx) : '');

const prepSlide = (ctx) => (ctx.academy.prep?.trim() ? slide(
  `${ctx.meta.school}-${ctx.meta.subject}슬라이드-대비`, 's-prep', `
  ${title('06', `${ctx.academy.name}은`, '이렇게 대비했습니다', '')}
  ${panel('01', '우리가 해 둔 것', steps(String(ctx.academy.prep).split('\n').map((l) => l.trim()).filter(Boolean).map((l) => [l, ''])))}`, ctx) : '');

const keySlide = (ctx, school) => {
  const byNo = new Map(ctx.items.map((it) => [it.no, it]));
  const list = school.keyItems.filter((k) => byNo.has(k.no));
  if (!list.length) return '';
  return slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-대표문항`, 's-key', `
    ${title('07', '대표', '문항', '점수가 갈린 자리입니다.')}
    <div class="s-row s-three">${list.slice(0, 3).map((k, i) => {
    const it = byNo.get(k.no);
    return panel(String(i + 1).padStart(2, '0'), noLabel(k.no),
      `<p class="s-what">${esc([it.area, it.subtype].filter(Boolean).join(' · '))}</p>
       ${chips([['배점', `${it.points}점`], ['난이도', it.difficulty], ['단원', it.unit]])}`, 's-tall');
  }).join('')}</div>`, ctx);
};

const deepSlides = (ctx, school) => {
  const byNo = new Map(ctx.items.map((it) => [it.no, it]));
  return school.keyItems.filter((k) => byNo.has(k.no)).slice(0, 3).map((k, i) => {
    const it = byNo.get(k.no);
    return slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-심층${i + 1}`, 's-deep', `
      ${title(`심층 분석 ${i + 1}`, noLabel(k.no), '', '')}
      ${panel('01', '무엇을 묻는 문항인가', `<p class="s-deep-why" contenteditable>${esc(k.why)}</p>
        ${chips([['배점', `${it.points}점`], ['난이도', it.difficulty], ['영역', [it.area, it.subtype].filter(Boolean).join(' · ')], ['단원', it.unit]])}`)}
      <p class="s-note">문항 지문은 싣지 않습니다 — 시험지는 학교 저작물입니다.</p>`, ctx);
  }).join('');
};

const strategySlide = (ctx, school) => (school.strategy?.length ? slide(
  `${ctx.meta.school}-${ctx.meta.subject}슬라이드-학습방향`, 's-strategy', `
  ${title('08', '다음 시험', '학습 방향', '이번 시험이 가리킨 곳부터 메웁니다.')}
  ${panel('01', '영역별 준비 방법', steps(school.strategy.map((s) => [s.area, s.tip])))}`, ctx) : '');

// 총평 — 한 장에 블록을 깔아 두는 대시보드. 참고 자료의 마지막 장이 이 모양이다.
const verdict = (ctx, school) => {
  const flow = difficultyFlow(ctx.items);
  const byNo = new Map(ctx.items.map((it) => [it.no, it]));
  const keys = school.keyItems.filter((k) => byNo.has(k.no)).slice(0, 3);
  return slide(`${ctx.meta.school}-${ctx.meta.subject}슬라이드-총평`, 's-verdict', `
    ${title(`${연도(ctx.meta)}${ctx.meta.school} ${ctx.meta.grade} ${ctx.meta.subject}`, '이번 시험', '총평', school.overview)}
    <div class="s-board">
      ${panel('01', '전체 난이도', donut(ctx.stats))}
      ${panel('02', '이번 시험의 특징', steps((school.trends || []).slice(0, 3).map((t) => [t, ''])))}
      ${panel('03', '대표 변별 문항', keys.length
    ? `<ul class="s-keylist">${keys.map((k) => {
      const it = byNo.get(k.no);
      return `<li><b>${esc(k.no)}</b><span>${esc(abbr(it.area))}${it.subtype ? ` · ${esc(it.subtype)}` : ''}</span>${badge(it.difficulty)}</li>`;
    }).join('')}</ul>` : '<p>—</p>')}
      ${panel('04', '난도 흐름', flowChart(flow))}
      ${panel('05', '어려웠던 이유', steps((school.whyHard || []).map((w) => [w.title, w.detail])))}
      ${panel('06', '학습 방향', steps((school.strategy || []).map((s) => [s.area, s.tip])))}
    </div>
    ${school.message ? `<div class="s-msg"><p class="s-msg-no">07 · 이번 시험이 주는 메시지</p>
      <p class="s-msg-big" contenteditable>${esc(school.message)}</p>
      <ul class="s-msg-cards">${(school.strategy || []).slice(0, 5).map((s, i) => `<li><b>${esc(String(i + 1).padStart(2, '0'))} ${esc(s.area)}</b><span>${esc(s.tip)}</span></li>`).join('')}</ul></div>` : ''}`, ctx);
};

export function slideDeck(ctx, school) {
  return [
    cover(ctx, school),
    glance(ctx),
    flowSlide(ctx, school),
    compose(ctx),
    cross(ctx),
    whyHard(ctx, school),
    prepSlide(ctx),
    keySlide(ctx, school),
    deepSlides(ctx, school),
    strategySlide(ctx, school),
    verdict(ctx, school),
  ].filter(Boolean).join('');
}
