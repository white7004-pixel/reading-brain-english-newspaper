// 결과리포트 하나 (10/2 원장 결정): 표지 → 응시한 영역마다 1쪽 → 문항별 결과. 한 시험·예전 1차·1차+2차 결과 모두 같은 모양.
// 숫자는 전부 core 가 계산한다. 여기서는 그리기만. AI 는 총평 문장만 쓰고, 실패하면 틀 문장이 남는다. 글은 눌러서 고칠 수 있다.
import { ACADEMY } from './core/academy.js';
import { SECTIONS, SECTION_KO, SECTION_TOPIC, MIN_STEP, labelOf } from './core/scale.js';
import { project, position, score, levelOf, gradePos, gapText, ym, track, earlyText, END } from './core/progress.js';
import { commentFacts, templateComment, shaky, nextLabel, estLabel, nextUnits } from './core/summary.js';
import { areaLevels, phonicsNote, writeSummary, stage2Sections, stageText, kindTally, AREA_KO, STAGE_KO, AREA_BLOCKS } from './core/forms.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
// 학교가 있으면 "OO중 중2" (예전 결과에는 학교가 없다)
const schoolGrade = (r) => [r.school, r.grade].filter(Boolean).join(' ');
const status = (text, kind = '') => { $('#report-status').textContent = text; $('#report-status').className = `status no-print ${kind}`; };
const EN = { vocab: 'Vocabulary', grammar: 'Grammar', reading: 'Reading', listening: 'Listening' };
const COUNT = ['', '한', '두', '세', '네'];
const dotDate = (d) => esc(String(d ?? '').replaceAll('-', '.'));
// 지금 자리: 2차 문제지 결과는 학년 단위("중2 과정 수준"), 예전 적응형 결과는 단원 단위
const where = (s) => (s.level ? stageText(s.level) : estLabel(s.est));
// 한 시험 log, 아니면 예전 1차 + 2차(또는 2차 쓰기) log 를 잇는다
const logOf = (r) => r.test?.log ?? [...(r.stage1?.log ?? []), ...(r.stage2?.log ?? r.write2?.log ?? [])];
const doneLabel = (road) => (road.months === 0 ? '이미 도달' : road.done ? road.points.at(-1).when : '10년 넘게');

const id = new URLSearchParams(location.search).get('id');
let result = null;
try { result = JSON.parse(localStorage.getItem(`elt:result:${id}`)); } catch { /* 아래에서 안내 */ }

if (!result) {
  status('결과를 찾지 못했습니다. 시험을 본 기기와 브라우저에서 열어 주세요.', 'error');
} else {
  result.academy = ACADEMY; // 학원 정보·로고는 리딩브레인으로 고정 (예전 결과도)
  document.documentElement.style.setProperty('--brand', ACADEMY.color);
  $('#print').onclick = () => window.print();
  const log = logOf(result);
  if (log.length) result.sections = stage2Sections(log);
  const start = result.start || result.date;
  const taken = SECTIONS.filter((k) => result.sections[k]?.est);
  const ests = Object.fromEntries(taken.map((k) => [k, result.sections[k].est]));
  const proj = project({ grade: result.grade, start, ests });
  const facts = commentFacts(result, proj);
  for (const f of facts.sections) f.level = where(result.sections[f.key]);
  const c = templateComment(facts);
  const pages = 2 + taken.length; // 표지 + 영역 쪽 + 문항별 결과
  $('#report').innerHTML = cover(result, proj, c, facts, start, pages)
    + taken.map((k, i) => sectionPage(result, proj, k, i + 1, start, pages)).join('')
    + (log.length ? detailPage(result, c, log, pages) : director(result, c, pages));
  fitCover();
  document.fonts?.ready.then(fitCover);
  $('#summary')?.addEventListener('input', fitCover);
  fillComment(facts);
}

// 표지는 A4 한 쪽 고정이라 총평이 길어지면 바닥 줄과 겹친다: 글자 → 줄 간격 순으로 줄이고, 그래도 넘치면 알린다 (몰래 자르지 않음)
function fitCover() {
  const sheet = $('#report .sheet.cover');
  if (!sheet) return;
  const foot = sheet.querySelector('.foot').getBoundingClientRect().top - 6;
  const over = () => [...sheet.querySelectorAll('.sec')].at(-1).getBoundingClientRect().bottom > foot;
  sheet.classList.remove('tight', 'tighter');
  if (over()) sheet.classList.add('tight');
  if (over()) sheet.classList.add('tighter');
  const msg = '표지 총평이 길어 한 쪽에 다 들어가지 않습니다. 총평을 조금 줄여 주세요.';
  if (over()) status(msg, 'warn');
  else if ($('#report-status').textContent === msg) status('글자는 눌러서 고칠 수 있습니다');
}

function logoSrc(r) { return r.academy?.logo ?? ''; }

// 로고 판(흰 바탕) + 학원 이름
function brandMark(r) {
  const src = logoSrc(r);
  return `<span class="mark">${src ? `<span class="plate"><img src="${esc(src)}" alt=""></span>` : ''}${esc(r.academy?.name)}</span>`;
}

// 문항별 결과 쪽 머리
function band(r, kicker, title) {
  return `<header class="shead"><div><span class="cap">${esc(kicker)}</span><h2>${esc(title)}</h2></div><div class="r">${brandMark(r)}</div></header>`;
}

function foot(r, middle = '', page = '') {
  const a = r.academy || {};
  const src = logoSrc(r);
  return `<div class="foot"><span>${src ? `<img src="${esc(src)}" alt="">` : ''}<b>${esc(a.name)}</b>${a.phone ? ` · ${esc(a.phone)}` : ''}</span><span>${esc(middle)}</span><span>${esc(page)}</span></div>`;
}

// 편집 격자 한 줄: 왼쪽 번호 칸 + 본문. label 은 코드에 적은 글만 (<br> 허용)
function sec(n, label, cls, body, style = '') {
  return `<section class="sec"${style ? ` style="${style}"` : ''}><div class="lbl"><b>${n}</b><span>${label}</span></div><div class="body ${cls}">${body}</div></section>`;
}

// 한 시험: 멈춘 영역(영역별로 묶어 푼 결과) 또는 멈춘 단계(예전 결과)와 쓰기(영작) 한 줄.
function stageLine(r) {
  const log = logOf(r);
  const w = writeSummary(log.filter((x) => x.area === 'sentence'));
  const stops = Object.entries(r.test?.stops ?? {}).map(([k, lv]) => `${AREA_BLOCKS.find((b) => b.key === k)?.label ?? esc(k)} ${esc(STAGE_KO[lv] ?? lv)}`);
  const stop = !r.test ? '' : r.test.order === 'area' ? (stops.length ? `두 단계 연속 절반 미만으로 멈춘 영역: ${stops.join(' · ')}` : '모든 영역을 끝까지 풀었습니다') : r.test.stopped ? `${esc(STAGE_KO[r.test.stopped] ?? r.test.stopped)} 단계까지 풀고 끝났습니다` : '모든 단계를 풀었습니다';
  const wtext = w.total ? `쓰기 ${w.correct}/${w.total} (${w.missed.length ? `다시 볼 문법: ${esc(w.missed.join(', '))}` : '모두 맞힘'})` : '';
  const line = [stop, wtext].filter(Boolean).join(' · ');
  return `${line ? `<p class="fine">${line}</p>` : ''}`;
}

function gauge(sc) {
  const C = 2 * Math.PI * 74;
  const arc = sc ? `<circle cx="88" cy="88" r="74" fill="none" stroke="#E7BDB8" stroke-width="5" stroke-linecap="round" stroke-dasharray="${((C * sc) / 100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 88 88)"/>` : '';
  return `<svg viewBox="0 0 176 176" aria-label="환산 점수 ${sc ?? '-'}점">
    <circle cx="88" cy="88" r="74" fill="none" stroke="rgba(247,243,235,.14)" stroke-width="5"/>${arc}
    <circle cx="88" cy="88" r="62" fill="none" stroke="rgba(247,243,235,.1)" stroke-width="1"/>
    <text x="88" y="92" text-anchor="middle" font-family="Noto Sans KR" font-size="50" font-weight="600" fill="#f7f3eb">${sc ?? '-'}</text>
    <text x="88" y="114" text-anchor="middle" font-family="Noto Sans KR" font-size="10.5" fill="rgba(247,243,235,.6)" letter-spacing="2">/ 100</text>
    <text x="88" y="130" text-anchor="middle" font-family="Noto Sans KR" font-size="9.5" fill="rgba(231,214,188,.85)">환산 점수</text></svg>`;
}

function cover(r, proj, c, facts, start, pages) {
  const now = gradePos(r.grade, r.date);
  const taken = SECTIONS.filter((k) => r.sections[k]?.est);
  const pos = Object.fromEntries(taken.map((k) => [k, position(r.sections[k].est)]));
  const avg = taken.length ? taken.reduce((sum, k) => sum + pos[k], 0) / taken.length : null;
  const road = proj?.perSection[proj.overall.section];
  const early = road ? earlyText(road, proj.left) : '';
  const earlyLine = early === '이미 도달' ? '이미 고3 과정 수준에 도달했습니다' : early === '졸업 뒤' ? '고3 졸업 전에 마치기 어렵습니다' : early === '졸업 무렵' ? '고3 졸업 무렵에 마칩니다' : early ? `고3 졸업보다 ${early}` : '';
  const hero = `<header class="top">
    <div class="mast">${brandMark(r)}<span class="cap">결과리포트</span></div>
    <div class="top-grid">
      <div><p class="kick cap">영어 레벨테스트 결과</p><h1>현재 수준과<br><strong>앞으로의 진도</strong></h1>
        <p class="who"><span>${esc(r.name)}</span><span>${esc(schoolGrade(r))}</span><span>응시 ${dotDate(r.date)}</span></p></div>
      <div class="gauge">${gauge(avg == null ? null : score(avg))}</div>
    </div>
    <div class="kpis">
      <div><span>전체 수준</span><b>${avg == null ? '-' : levelOf(avg)}</b><small>${taken.map((k) => SECTION_KO[k]).join(' · ')} 평균</small></div>
      <div><span>학년 대비</span><b>${avg == null ? '-' : gapText(avg, now)}</b><small>현재 ${levelOf(now)} 기준</small></div>
      <div class="gold"><span>고3 과정 완료 예상</span><b>${esc(proj?.overall.label ?? '-')}</b><small>${esc(earlyLine)}</small></div>
    </div></header>`;

  const nowX = score(now) / 100;
  const rows = SECTIONS.map((k) => {
    const s = r.sections[k] || {};
    if (!s.est) return `<div class="pos-r off"><div class="nm"><i></i>${SECTION_KO[k]}</div><div class="skip">${esc(s.skipped || '이번에 응시하지 않았습니다')}</div></div>`;
    const p = pos[k];
    const x = score(p);
    const g = Math.round(p - now);
    const align = x < 10 ? ' l' : x > 90 ? ' r' : '';
    return `<div class="pos-r" style="--c:var(--${k})"><div class="nm"><i></i>${SECTION_KO[k]}</div>
      <div class="tr"><div class="fill" style="width:${x}%"></div><div class="dot" style="left:${x}%"></div><div class="tip${align}" style="left:${x}%">${esc(where(s))}</div></div>
      <div class="gp ${g > 0 ? 'up' : g < 0 ? 'down' : ''}">${gapText(p, now)}</div><div class="sc">${x}<small>점</small></div></div>`;
  }).join('');
  const levels = `<div class="pos-h"><span></span><div class="g"><span>중1</span><span>중2</span><span>중3</span><span>고1</span><span>고2</span><span>고3</span></div><span class="r">학년 대비</span><span class="r">환산 점수</span></div>
    <div class="pos-rows"><div class="nowline" style="left:calc(66px + (100% - 220px) * ${nowX})"></div>${rows}</div>
    <p class="fine"><span class="red">┆ 빨간 점선: 현재 학년(${levelOf(now)})</span> · 환산 점수는 중1 1학기 시작을 0점, 고3 과정 끝을 100점으로 계산한 점수이며 맞힌 문항 수가 아닙니다.</p>${stageLine(r)}`;

  const weak = [...facts.sections].sort((a, b) => a.gap - b.gap).slice(0, 3);
  const dirs = weak.map((x, i) => `<div><b>${i + 1}</b><p><strong>${esc(x.name)}</strong>${esc(SECTION_TOPIC[x.key].slice(x.name.length))} ${esc(x.next)}부터 수업을 시작합니다.</p></div>`).join('');

  return `<article class="sheet cover">${hero}
    ${sec('01', '총평', '', `<p id="summary" class="quote" contenteditable>${esc(c.summary)}</p>`, 'margin-top:28px')}
    ${sec('02', '영역별 수준', 'pos', levels)}
    ${weak.length ? sec('03', '수업 시작 단원', 'dirs', dirs) : ''}
    ${proj ? sec('04', '영역별 완료 예상', '', eta(r, proj, start)) : ''}
    ${foot(r, pages > 1 ? '영역별 결과는 다음 쪽에 있습니다' : '', `1 / ${pages}`)}</article>`;
}

// 가로 시간선: 지금 → 영역별 완료 → 졸업(고3 2월). 이름표가 붙으면 한 칸 위로 올린다.
function eta(r, proj, start) {
  const taken = Object.keys(proj.perSection);
  const grad = proj.left - 1; // 고3 2월의 달 번호 (수업 시작 달 = 0)
  const span = Math.max(grad, ...taken.map((k) => proj.perSection[k].months), 1);
  const x = (m) => (m / span) * 100;
  const t = track({ est: r.sections[taken[0]].est, grade: r.grade, start }); // 학년 3월 눈금만 쓴다
  const ticks = t.points.map((p, i) => (i > 0 && p.month.endsWith('-03') ? `<span class="tk" style="left:${x(i)}%">${p.month.slice(0, 4)}.3 ${esc(p.when.split(' ')[0])}</span>` : '')).join('');
  const order = [...taken].sort((a, b) => proj.perSection[a].months - proj.perSection[b].months);
  const last = order.at(-1);
  const stations = [
    { at: 0, cls: 'start', dot: 'var(--ink)', b: '지금', small: dotDate(start.slice(0, 7)) },
    ...order.map((k) => {
      const road = proj.perSection[k];
      const all = k === last && taken.length > 1 ? ` · ${COUNT[taken.length]} 영역 모두 완료` : '';
      return { at: road.done ? road.months : span, cls: all ? 'gold' : '', dot: `var(--${k})`, color: `var(--${k})`, b: SECTION_KO[k], small: esc(doneLabel(road)) + all };
    }),
    { at: grad, cls: 'grad', b: '졸업', small: '고3 2월' },
  ].sort((a, b) => a.at - b.at);
  const edge = (s) => (x(s.at) <= 0 ? ' start' : x(s.at) >= 100 ? ' end' : '');
  // 이름표 너비를 글자 수로 어림(시간선 약 590px)해 겹치면 한 칸 위로
  const placed = [];
  for (const s of stations) {
    const w = (Math.max(s.b.length * 14, s.small.replace(/&[a-z#0-9]+;/g, '.').length * 9) / 590) * 100;
    const from = edge(s) === ' start' ? x(s.at) : edge(s) === ' end' ? x(s.at) - w : x(s.at) - w / 2;
    s.level = 0;
    while (placed.some((q) => q.level === s.level && from < q.to + 2 && q.from < from + w + 2)) s.level++;
    placed.push({ level: s.level, from, to: from + w });
  }
  const lift = Math.max(...stations.map((s) => s.level));
  const doneAt = x(proj.perSection[last].done ? proj.perSection[last].months : span);
  return `<div class="eta" style="--lift:${lift}">
    <div class="axis" style="background:linear-gradient(90deg, var(--ink) 0 ${doneAt}%, #d3ccbf ${doneAt}%)"></div>${ticks}
    ${stations.map((s) => `<i class="pt${s.cls === 'grad' ? ' hollow' : ''}" style="left:${x(s.at)}%${s.dot ? `;background:${s.dot}` : ''}"></i>
      <span class="st ${s.cls}${edge(s)}" style="left:${x(s.at)}%;--up:${s.level}"><b${s.color ? ` style="color:${s.color}"` : ''}>${s.b}</b><small>${s.small}</small></span>`).join('')}
  </div>`;
}

function sectionPage(r, proj, k, n, start, pages) {
  const est = r.sections[k].est;
  const p = position(est);
  const now = gradePos(r.grade, r.date);
  const road = proj.perSection[k];
  const g = Math.round(p - now);
  const need = road.months === 0 ? '완료' : road.done ? ym(road.months) : '10년 넘게';
  const head = road.months === 0 ? '이미 고3 과정 도달' : road.done ? `${doneLabel(road)} 완료 예상` : '10년 넘게 걸림';
  const until = proj.left - 1; // 수업 시작 달부터 고3 2월까지 (끝나는 달 번호 road.months 와 같은 셈)
  const max = Math.max(until, road.done ? road.months : 0, 1);
  const w = (m) => Math.max(1, Math.round((m / max) * 1000) / 10);
  const early = earlyText(road, proj.left);
  const note = early === '이미 도달' ? '이미 고3 과정 수준에 도달했습니다.'
    : early === '졸업 뒤' ? '지금 진도로는 학교 졸업 전에 고3 과정을 마치기 어렵습니다.'
    : early === '졸업 무렵' ? '학교 졸업 무렵에 고3 과정을 마칩니다.'
    : `학교 졸업보다 <b>${esc(early)}</b> 고3 과정을 마칩니다.`;
  const units = nextUnits(k, est, 4);
  const steps = units.length
    ? `<div class="body steps" style="--k:${units.length}">${units.map((u, i) => `<div${i ? '' : ' class="first"'}><i>${i + 1}</i><b>${esc(u.name)}</b><span>${esc(u.label)}</span></div>`).join('')}</div>`
    : `<div class="body"><p class="quote">${est.step < MIN_STEP ? `${esc(labelOf(est.step))} 과정부터 시작합니다` : '고3 과정 복습'}</p></div>`;
  return `<article class="sheet section-page" style="--c:var(--${k})">
    <header class="shead"><div><span class="cap">영역별 결과 · ${String(n).padStart(2, '0')}</span><h2>${SECTION_KO[k]}<small>${EN[k]}</small></h2></div>
      <div class="r">${esc(r.name)} · ${esc(schoolGrade(r))}<b>${esc(head)}</b></div></header>
    ${sec('01', '현재 수준', 'stats', `<div><span>${r.sections[k].level ? '현재 수준' : '현재 단원'}</span><b>${esc(where(r.sections[k]))}</b></div><div><span>환산 점수</span><b>${score(p)} <small>/ 100</small></b></div><div><span>학년 대비</span><b class="${g > 0 ? 'up' : g < 0 ? 'down' : ''}">${gapText(p, now)}</b></div><div><span>완료까지 걸리는 기간</span><b>${need}</b></div>`, 'margin-top:30px')}
    ${sec('02', '남은 기간', 'dur', `<div class="ln"><span>고3 2월까지 남은 기간</span><div class="bar grey" style="width:${w(until)}%"></div><span class="v">${ym(until)}</span></div>
      <div class="ln"><span>고3 과정까지 걸리는 기간</span><div class="bar" style="width:${road.done ? w(road.months) : 100}%"></div><span class="v">${need}</span></div>
      <p class="gapnote">→ ${note}</p>`)}
    ${sec('03', '학교 진도와<br>우리 학원 진도', 'chart', stair(r, est, start, where(r.sections[k])))}
    <section class="sec"><div class="lbl"><b>04</b><span>다음 단원</span></div>${steps}</section>
    ${foot(r, '4 · 6 · 9 · 11월은 시험 기간이라 진도 계산에서 뺐습니다', `${n + 1} / ${pages}`)}</article>`;
}

// 계단 그래프: 학원 진도(계단)와 학교 진도(점선). 숫자는 core 의 track 이 준다.
function stair(r, est, start, now) {
  const { points, ahead, done } = track({ est, grade: r.grade, start });
  if (points.length < 2) return '<p class="fine">고3 2월까지 한 달만 남아 그래프는 그리지 않습니다.</p>';
  const W = 560, H = 380, L = 44, R = 12, T = 22, B = 30;
  const N = Math.max(1, points.length - 1);
  let LO = Math.floor(Math.min(points[0].ours, points[0].school));
  if (LO % 2 === 0) LO -= 1; // 학년 첫 학기(홀수 단계)에서 시작
  LO = Math.max(-1, Math.min(LO, END - 2));
  const x = (i) => L + (i / N) * (W - L - R);
  const y = (p) => T + ((END - Math.max(LO, p)) / (END - LO)) * (H - T - B);
  let s = '';
  points.forEach((p, i) => { if (i > 0 && p.exam) s += `<rect x="${x(i - 0.5)}" y="${T}" width="${x(1) - x(0)}" height="${H - T - B}" fill="#f2eee6"/>`; });
  for (let p = LO; p <= END; p += 2) {
    s += `<line x1="${L}" x2="${W - R}" y1="${y(p)}" y2="${y(p)}" stroke="#e6e1d6"/>`;
    s += p < END ? `<text x="${L - 8}" y="${y(p + 1) + 4}" text-anchor="end" font-size="10" fill="#646c78">${esc(labelOf(p).split(' ')[0])}</text>`
      : `<text x="${L - 8}" y="${y(END) + 4}" text-anchor="end" font-size="10" font-weight="700" fill="#7d1d1e">완료</text>`;
  }
  points.forEach((p, i) => {
    if (i > 0 && p.month.endsWith('-03') && i < N - 3) s += `<line x1="${x(i)}" x2="${x(i)}" y1="${H - B}" y2="${H - B + 4}" stroke="#646c78"/><text x="${x(i)}" y="${H - B + 16}" text-anchor="middle" font-size="9.5" fill="#646c78">${p.month.slice(0, 4)}.3 ${esc(p.when.split(' ')[0])}</text>`;
  });
  s += `<text x="${x(N)}" y="${H - B + 16}" text-anchor="end" font-size="9.5" fill="#646c78">${esc(points.at(-1).when)}</text>`;
  s += `<polyline points="${points.map((p, i) => `${x(i)},${y(p.school)}`).join(' ')}" fill="none" stroke="#8e959e" stroke-width="1.5" stroke-dasharray="4 4"/>`;
  const stop = done ?? points.length - 1;
  let d = `M${x(0)},${y(points[0].ours)}`;
  for (let i = 1; i <= stop; i++) if (points[i].ours !== points[i - 1].ours) d += ` H${x(i)} V${y(points[i].ours)}`;
  if (!done) d += ` H${x(N)}`; // 못 마치거나 이미 마친 학생은 끝까지 한 줄
  s += `<path d="${d}" fill="none" style="stroke:var(--c)" stroke-width="2.5" stroke-linejoin="round"/>`;
  const y0 = y(points[0].ours);
  const ly = y0 + 16 < H - B ? y0 + 14 : y0 - 8; // 아래 눈금 글자와 겹치면 점 위에
  s += `<circle cx="${x(0)}" cy="${y0}" r="4" style="fill:var(--c)"/><text x="${x(0) + 8}" y="${ly}" font-size="10" font-weight="700" style="fill:var(--c)">지금 · ${esc(now)}</text>`;
  if (ahead != null) {
    const [ax, ay] = [x(ahead), y(points[ahead].school)];
    const right = ax > W - 190;
    s += `<circle cx="${ax}" cy="${ay}" r="3.5" fill="#fcfbf8" stroke="#15202c" stroke-width="1.5"/><text x="${right ? ax - 8 : ax + 8}" y="${ay + 14}" text-anchor="${right ? 'end' : 'start'}" font-size="10" fill="#15202c">학교 진도보다 앞서는 때 · ${esc(points[ahead].when)}</text>`;
  }
  if (done != null) {
    const dx = x(done);
    const left = dx > W / 2;
    s += `<circle cx="${dx}" cy="${y(END)}" r="6" fill="#7d1d1e" stroke="#fcfbf8" stroke-width="2"/><text x="${left ? dx - 10 : dx + 10}" y="${y(END) - 9}" text-anchor="${left ? 'end' : 'start'}" font-size="11" font-weight="700" fill="#7d1d1e">${done ? `${esc(points[done].when)} · 고3 과정 완료` : '이미 고3 과정 완료'}</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="학교 진도와 우리 학원 진도">${s}</svg>
    <div class="legend"><span><i></i>우리 학원 진도 (한 해 3학기)</span><span><i class="dash"></i>학교 진도</span><span><i class="band"></i>내신 시험 기간</span></div>`;
}

// function 선언: 위쪽 최상위 코드가 먼저 실행되므로 const 면 초기화 전에 불려 오류가 난다
function mark(x) { return x.correct ? '○' : x.timeout ? '시간' : x.dontKnow ? '모름' : '×'; }
// 유형별 정답 한 줄
function tally(log, area) { return kindTally(log, area).map((t) => `${t.kind ? `${esc(t.kind)} ` : ''}${t.correct}/${t.total}`).join(' · ') || '문항 없음'; }

function formLog(title, log) {
  return `<div><h2>${esc(title)}</h2><table><thead><tr><th>번호</th><th>영역</th><th>수준</th><th>정오</th><th>쓴 답</th><th>초</th></tr></thead><tbody>
    ${log.map((x, k) => `<tr class="${x.correct ? '' : 'wrong'}"><td>${k + 1}</td><td>${AREA_KO[x.area] ?? esc(x.area)}</td><td>${esc(x.level)}</td><td>${mark(x)}</td><td>${Array.isArray(x.given) ? esc(x.given.join(' / ')) : typeof x.given === 'number' ? '①②③④⑤'[x.given] : ''}</td><td>${Math.round(x.ms / 1000)}</td></tr>`).join('')}
    </tbody></table></div>`;
}

// 문항별 결과: 문항표, 시간 초과·파닉스·유형별 맞힌 수, 멈춘 단계·쓰기, 지도 방향(눌러서 고침)
function detailPage(r, c, log, pages) {
  const ph = areaLevels(log);
  const lines = [
    `시간 초과 ${log.filter((x) => x.timeout).length}`,
    ph.phonics.total ? `파닉스 ${ph.phonics.correct}/${ph.phonics.total}${phonicsNote(ph) ? ` (${phonicsNote(ph)})` : ''}` : '',
    ...['vocab', 'grammar', 'form', 'reading', 'listening', 'sentence'].filter((a) => log.some((x) => x.area === a)).map((a) => `${AREA_KO[a]} · ${tally(log, a)}`),
  ].filter(Boolean);
  const title = r.test ? `레벨테스트 (${r.test.set}세트)` : r.stage2?.log?.length ? '1차 + 2차' : '1차';
  return `<article class="sheet plain">${band(r, '결과리포트', '문항별 결과')}<p class="meta">${esc(r.name)} · ${esc(schoolGrade(r))} · 응시일 ${esc(r.date)}</p>
    <div class="logs">${formLog(title, log)}</div>${lines.map((l) => `<p class="small">${l}</p>`).join('')}${stageLine(r)}
    <h2>지도 방향</h2><ol id="directions" contenteditable>${c.directions.map((d) => `<li>${esc(d)}</li>`).join('')}</ol>
    ${foot(r, '', `${pages} / ${pages}`)}</article>`;
}

// 예전 적응형 결과(sections 에 log): 영역별 문항표를 마지막 쪽으로
function director(r, c, pages) {
  const logs = SECTIONS.map((k) => {
    const s = r.sections[k] || { log: [] };
    if (!s.log?.length) return `<div><h2>${SECTION_KO[k]}</h2><p class="small">${esc(s.skipped || '응시하지 않음')}</p></div>`;
    const range = shaky(s.log);
    return `<div><h2>${SECTION_KO[k]}</h2>
      <table><thead><tr><th>#</th><th>학기</th><th>단원</th><th>유형</th><th>정오</th><th>초</th></tr></thead><tbody>
      ${s.log.map((x, i) => `<tr class="${x.correct ? '' : 'wrong'}"><td>${i + 1}</td><td>${labelOf(x.step)}</td><td>${x.unit}</td><td>${esc(x.kind)}</td><td>${mark(x)}</td><td>${Math.round(x.ms / 1000)}</td></tr>`).join('')}
      </tbody></table>
      <p class="small">시간 초과 ${s.log.filter((x) => x.timeout).length} · ${range ? `흔들린 구간 ${labelOf(range.from)} ~ ${labelOf(range.to)}` : '흔들린 구간 없음'} · 다음 시작 ${s.est ? esc(nextLabel(k, s.est)) : '-'}</p></div>`;
  }).join('');
  return `<article class="sheet plain">${band(r, '결과리포트', '문항별 결과')}<p class="meta">${esc(r.name)} · ${esc(schoolGrade(r))} · 응시일 ${esc(r.date)}</p><div class="logs">${logs}</div>
    <h2>지도 방향</h2><ol id="directions" contenteditable>${c.directions.map((d) => `<li>${esc(d)}</li>`).join('')}</ol>
    ${foot(r, '', `${pages} / ${pages}`)}</article>`;
}

async function fillComment(facts) {
  if (!facts.sections.length) return;
  status('AI 총평을 쓰는 중…');
  try {
    const r = await fetch('/api/comment', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ facts }) });
    const body = await r.json();
    if (!r.ok) throw new Error(body.error);
    $('#summary').textContent = body.summary;
    $('#directions').innerHTML = body.directions.map((d) => `<li>${esc(d)}</li>`).join('');
    status('글자는 눌러서 고칠 수 있습니다');
  } catch (e) {
    status(`${e.message || '기본 총평을 넣었습니다'} · 글자는 눌러서 고칠 수 있습니다`, 'warn');
  }
  fitCover(); // AI 총평이 들어간 뒤 다시 잰다
}
