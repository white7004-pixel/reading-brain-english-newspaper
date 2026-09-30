// 리포트 (Klai형 설계서): 학부모용 = 표지 + 응시한 영역마다 1쪽, 원장용 = 1쪽. 교재명은 원장용에만.
// 숫자는 전부 core 가 계산한다. AI 는 총평 문장만 쓰고, 실패하면 틀 문장이 남는다. 글은 눌러서 고칠 수 있다.
import { SECTIONS, SECTION_KO, labelOf } from './core/scale.js';
import { project, position, score, levelOf, gradePos, gapText, ym } from './core/progress.js';
import { commentFacts, templateComment, shaky, bookFor, nextLabel, estLabel } from './core/summary.js';
import { areaLevels, startLevel, phonicsNote, writeSummary, LEVEL_AREAS, AREA_KO, PASS } from './core/forms.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const status = (text, kind = '') => { $('#report-status').textContent = text; $('#report-status').className = `status no-print ${kind}`; };

const id = new URLSearchParams(location.search).get('id');
let result = null;
try { result = JSON.parse(localStorage.getItem(`elt:result:${id}`)); } catch { /* 아래에서 안내 */ }

if (!result) {
  status('결과를 찾지 못했습니다. 시험을 본 기기와 브라우저에서 열어 주세요.', 'error');
} else {
  if (/^#[0-9a-f]{6}$/i.test(result.academy?.color ?? '')) document.documentElement.style.setProperty('--brand', result.academy.color);
  $('#print-parent').onclick = () => printOnly('print-parent');
  $('#print-director').onclick = () => printOnly('print-director');
  $('#png').onclick = png;
  if (result.stage1 && (!result.stage1.passed || !SECTIONS.some((k) => result.sections[k].est))) {
    const s1 = result.stage1;
    $('#parent').innerHTML = stage1Page(result);
    $('#director').innerHTML = `${band(result, '레벨테스트 상세 (원장용)')}<p class="meta">${esc(result.name)} · ${esc(result.grade)} · 응시일 ${esc(result.date)}</p><div class="logs">${formLog(`1차 (${s1.set}세트)`, s1.log)}<p class="small">모름 ${s1.log.filter((x) => x.dontKnow).length} · 시간 초과 ${s1.log.filter((x) => x.timeout).length}</p>${result.write2?.log.length ? formLog('2차 쓰기', result.write2.log) : ''}</div>${footer(result)}`;
  } else {
    const start = result.start || result.date;
    const taken = SECTIONS.filter((k) => result.sections[k].est);
    const ests = Object.fromEntries(taken.map((k) => [k, result.sections[k].est]));
    const proj = project({ grade: result.grade, start, ests });
    const facts = commentFacts(result, proj);
    const c = templateComment(facts);
    $('#parent').innerHTML = cover(result, proj, c) + taken.map((k, i) => sectionPage(result, proj, k, i + 1, start)).join('');
    $('#director').innerHTML = director(result, c);
    fillComment(facts);
  }
}

function logoMark(r) {
  const a = r.academy || {};
  let logo = a.logo;
  if (!logo) {
    try { logo = JSON.parse(localStorage.getItem('elt:academy'))?.logo; } catch { /* 로고 없이 이름만 */ }
  }
  return /^data:image\//.test(logo ?? '') ? `<img src="${esc(logo)}" alt="">` : `<b>${esc(a.name)}</b>`;
}

function band(r, title) {
  return `<div class="band"><div class="band-logo">${logoMark(r)}</div><div class="band-title">${esc(title)}</div></div>`;
}

function footer(r) {
  const a = r.academy || {};
  return `<footer><span>${esc(a.name)}</span><span>${esc(a.phone)}</span></footer>`;
}

function info(r) {
  const a = r.academy || {};
  return `<div class="info"><div><b>시험</b><span>영어 레벨테스트</span></div><div><b>이름</b><span>${esc(r.name)}</span></div><div><b>학원(학년)</b><span>${esc(a.name)} (${esc(r.grade)})</span></div><div><b>응시일</b><span>${esc(r.date)}</span></div></div>`;
}

// 2차까지 본 학생 표지: 1차 점수와 쓰기 결과
function stageBox(r) {
  if (!r.stage1) return '';
  const w = r.write2?.log.length ? writeSummary(r.write2.log) : null;
  const wrow = w ? `<tr><td>쓰기</td><td><b>${w.correct}</b> / ${w.total}</td><td colspan="2">${w.missed.length ? `다시 볼 문법: ${esc(w.missed.join(', '))}` : '모두 맞힘'}</td></tr>` : '';
  return `<h2>1차 · 쓰기</h2><table class="scores"><tbody><tr><td>1차</td><td><b>${r.stage1.score}</b>점</td><td colspan="2">통과 (${PASS}점 이상)</td></tr>${wrow}</tbody></table>`;
}

function cover(r, proj, c) {
  const now = gradePos(r.grade, r.date);
  const taken = SECTIONS.filter((k) => r.sections[k].est);
  const pos = Object.fromEntries(taken.map((k) => [k, position(r.sections[k].est)]));
  const avg = taken.length ? taken.reduce((sum, k) => sum + pos[k], 0) / taken.length : null;
  const rows = SECTIONS.map((k) => {
    const s = r.sections[k];
    if (!s.est) return `<tr class="off"><td>${SECTION_KO[k]}</td><td colspan="3">${esc(s.skipped || '응시하지 않음')}</td></tr>`;
    return `<tr><td>${SECTION_KO[k]}</td><td>${esc(estLabel(s.est))}</td><td>${gapText(pos[k], now)}</td><td><b>${score(pos[k])}</b> / 100</td></tr>`;
  }).join('');
  const total = avg == null ? '' : `<tr class="total"><td>전체</td><td>${levelOf(avg)}</td><td>${gapText(avg, now)}</td><td><b>${score(avg)}</b> / 100</td></tr>`;
  const hrow = (cls, p, text) => `<div class="hrow"><div class="hbar ${cls}"><i style="width:${score(p)}%"></i></div><span>${esc(text)}</span></div>`;
  const pair = (title, p, cls = '') => `<div class="pair ${cls}"><h3>${esc(title)}</h3>${hrow('me', p, `${levelOf(p)} · ${score(p)}점`)}${hrow('grade', now, `지금 학년 · ${score(now)}점`)}</div>`;
  const bars = avg == null ? '' : `<div class="legend"><span class="me">본인</span><span class="grade">지금 학년</span></div>
    <div class="pairs">${pair('전체', avg, 'total')}${taken.map((k) => pair(SECTION_KO[k], pos[k])).join('')}</div>`;
  return `<article class="sheet cover">${band(r, '영어 레벨테스트 결과')}
    ${info(r)}
    <h2>테스트 결과</h2>
    <div class="boxes3"><div><b>전체 수준</b><strong>${avg == null ? '-' : levelOf(avg)}</strong></div><div><b>학년 대비</b><strong>${avg == null ? '-' : gapText(avg, now)}</strong></div><div><b>고3 과정 완료 예상</b><strong>${esc(proj?.overall.label ?? '-')}</strong></div></div>
    <p id="summary" class="summary" contenteditable>${esc(c.summary)}</p>
    <h2>영역별 점수</h2>
    <table class="scores"><thead><tr><th>영역</th><th>현재 수준</th><th>학년 대비</th><th>점수</th></tr></thead><tbody>${rows}${total}</tbody></table>
    ${bars}
    ${stageBox(r)}
    <p class="small">점수는 중1 1학기 시작을 0점, 고3 과정 끝을 100점으로 둔 위치입니다. 맞힌 개수가 아닙니다.</p>
    ${footer(r)}</article>`;
}

function sectionPage(r, proj, k, n, start) {
  const est = r.sections[k].est;
  const p = position(est);
  const now = gradePos(r.grade, r.date);
  const road = proj.perSection[k];
  const max = Math.max(proj.left, road.months, 1);
  const w = (m) => Math.round((m / max) * 100);
  const need = !road.done ? '10년 넘게' : road.months ? ym(road.months) : '완료';
  const late = road.done && road.months > proj.left ? ' · 학교 졸업 뒤' : '';
  return `<article class="sheet section-page">
    <div class="page-head"><div><p class="kicker">영역별 분석</p><h2>${n}. ${SECTION_KO[k]}</h2></div><span class="small">수업 시작일 ${esc(start)}</span></div>
    <div class="panel">
      <h3>▶ 테스트 결과</h3>
      <div class="result-grid">
        <div>
          <div class="span"><span>고3 2월까지<br>남은 기간</span><div><div class="sbar grey" style="width:${w(proj.left)}%">${ym(proj.left)}</div></div></div>
          <div class="span"><span>우리 학원 진도로<br>고3 과정까지</span><div><div class="sbar dark" style="width:${w(road.months)}%">${need}${late}</div></div></div>
        </div>
        <div class="boxes"><div><b>현재 수준</b><strong>${esc(estLabel(est))}</strong></div><div><b>학년 대비</b><strong>${gapText(p, now)}</strong></div></div>
      </div>
      <hr>
      <h3>▶ 진도 설정</h3>
      <p class="small">한 해 3학기씩 나아갑니다. 시험 기간(4·6·9·11월)은 빼고 셉니다.</p>
      <h3>▶ 목표: 고3 과정 완료</h3>
      <div class="card-w">${goal(p, now, road)}</div>
      <h3>▶ 학습 로드맵</h3>
      <div class="card-w">${timeline(road.points)}</div>
    </div>
    ${footer(r)}</article>`;
}

function goal(p, now, road) {
  const end = road.months === 0 ? '도달' : road.done ? `${road.points.at(-1).when} 예상` : '고3 졸업 이후';
  return `<div class="goal"><div class="goal-line"></div>
    <div class="pin" style="left:${score(p)}%"><small>${esc(levelOf(p))}</small><span>본인</span></div>
    <div class="tick" style="left:${score(now)}%">▲<b>지금 학년</b></div>
    <div class="tick" style="left:100%">▲<b>고3 과정 완료</b><small>${esc(end)}</small></div></div>`;
}

// 점이 5개를 넘으면 두 줄 (둘째 줄은 거꾸로 — ㄹ자)
function timeline(points) {
  const rows = [];
  for (let i = 0; i < points.length; i += 5) rows.push(points.slice(i, i + 5));
  return `<div class="road">${rows.map((row, i) => `<div class="road-row${i % 2 ? ' rev' : ''}">${row.map((pt) => `<div class="road-pt${pt.done ? ' done' : ''}"><b>${esc(pt.level)}</b><i></i><span>${esc(pt.when)}</span></div>`).join('')}</div>`).join('')}</div>`;
}

// function 선언: 위쪽 최상위 코드가 먼저 실행되므로 const 면 초기화 전에 불려 오류가 난다
function mark(x) { return x.correct ? '○' : x.timeout ? '시간' : x.dontKnow ? '모름' : '×'; }

// 1차에서 끝난 학생: A4 한 쪽 (설계서 8장)
function stage1Page(r) {
  const s = r.stage1;
  const lv = areaLevels(s.log);
  const rows = Object.entries(LEVEL_AREAS).map(([k, ko]) => `<tr><td>${ko}</td><td>${esc(lv[k] ?? '응시하지 않음')}</td></tr>`).join('')
    + (lv.phonics.total ? `<tr><td>파닉스</td><td>${lv.phonics.total}문항 중 ${lv.phonics.correct}개</td></tr>` : '');
  const note = phonicsNote(lv);
  const wrong = s.log.filter((x) => !x.correct).map((x) => x.no);
  return `<article class="sheet cover">${band(r, '영어 레벨테스트 결과 (1차)')}
    ${info(r)}
    <h2>1차 결과</h2>
    <div class="boxes3"><div><b>1차 점수</b><strong>${s.score}점</strong></div><div><b>맞힌 문항</b><strong>${s.correct} / ${s.total}</strong></div><div><b>추천 시작 수준</b><strong>${esc(startLevel(lv) ?? '-')}</strong></div></div>
    ${note ? `<p class="summary">${note}</p>` : ''}
    <h2>영역별 수준</h2>
    <table class="scores"><thead><tr><th>영역</th><th>수준</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="small">수준은 초3부터 한 학년씩 올라가며 그 학년 문항을 3분의 2 이상 맞힌 데까지입니다. ${s.passed ? '1차는 통과했지만 2차 문항이 아직 준비되지 않아 2차 결과는 없습니다.' : `중·고등 과정을 보는 2차는 1차 ${PASS}점 이상일 때 봅니다.`}</p>
    <p class="small">틀린 문항 번호: ${wrong.length ? wrong.join(', ') : '없음'}</p>
    ${footer(r)}</article>`;
}

function formLog(title, log) {
  return `<div><h2>${esc(title)}</h2><table><thead><tr><th>번호</th><th>영역</th><th>수준</th><th>정오</th><th>쓴 답</th><th>초</th></tr></thead><tbody>
    ${log.map((x) => `<tr class="${x.correct ? '' : 'wrong'}"><td>${x.no}</td><td>${AREA_KO[x.area] ?? esc(x.area)}</td><td>${esc(x.level)}</td><td>${mark(x)}</td><td>${Array.isArray(x.given) ? esc(x.given.join(' / ')) : typeof x.given === 'number' ? '①②③④'[x.given] : ''}</td><td>${Math.round(x.ms / 1000)}</td></tr>`).join('')}
    </tbody></table></div>`;
}

function director(r, c) {
  const logs = SECTIONS.map((k) => {
    const s = r.sections[k];
    if (!s.log.length) return `<div><h2>${SECTION_KO[k]}</h2><p class="small">${esc(s.skipped || '응시하지 않음')}</p></div>`;
    const range = shaky(s.log);
    const book = s.est ? bookFor(r.academy?.books, k, s.est.step) : '';
    return `<div><h2>${SECTION_KO[k]}</h2>
      <table><thead><tr><th>#</th><th>학기</th><th>단원</th><th>유형</th><th>정오</th><th>초</th></tr></thead><tbody>
      ${s.log.map((x, i) => `<tr class="${x.correct ? '' : 'wrong'}"><td>${i + 1}</td><td>${labelOf(x.step)}</td><td>${x.unit}</td><td>${esc(x.kind)}</td><td>${mark(x)}</td><td>${Math.round(x.ms / 1000)}</td></tr>`).join('')}
      </tbody></table>
      <p class="small">모름 ${s.log.filter((x) => x.dontKnow).length} · 시간 초과 ${s.log.filter((x) => x.timeout).length} · ${range ? `흔들린 구간 ${labelOf(range.from)} ~ ${labelOf(range.to)}` : '흔들린 구간 없음'} · 다음 시작 ${s.est ? esc(nextLabel(k, s.est)) : '-'}${book ? ` · 교재 ${esc(book)}` : ''}</p></div>`;
  }).join('');
  return `${band(r, '레벨테스트 상세 (원장용)')}<p class="meta">${esc(r.name)} · ${esc(r.grade)} · 응시일 ${esc(r.date)}</p><div class="logs">${logs}</div>${r.stage1 ? `<div class="logs">${formLog(`1차 (${r.stage1.set}세트)`, r.stage1.log)}${r.write2 ? formLog('2차 쓰기', r.write2.log) : ''}</div>` : ''}
    <h2>지도 방향</h2><ol id="directions" contenteditable>${c.directions.map((d) => `<li>${esc(d)}</li>`).join('')}</ol>
    ${footer(r)}`;
}

// 인쇄할 쪽만 남긴다 (나머지는 print CSS 가 숨김)
function printOnly(cls) {
  document.body.classList.add(cls);
  addEventListener('afterprint', () => document.body.classList.remove(cls), { once: true });
  print();
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
}

async function png() {
  try {
    const url = await window.htmlToImage.toPng($('#parent .sheet'), { pixelRatio: 2, backgroundColor: '#ffffff' });
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.name}-레벨테스트-표지.png`;
    a.click();
  } catch {
    status('그림으로 저장하지 못했습니다. 인쇄 / PDF 를 써 주세요.', 'error');
  }
}
