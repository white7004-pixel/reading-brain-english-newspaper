// 리포트: 학부모용 1장(위치·막대·예상 진도·총평), 원장용 1장(문항 기록·흔들린 구간·다음 단원·교재·지도 방향).
// 숫자는 전부 core 가 계산한다. AI 는 총평 문장만 쓰고, 실패하면 틀 문장이 남는다. 글은 눌러서 고칠 수 있다.
import { SECTIONS, SECTION_KO, MIN_STEP, labelOf, positionText, currentStep } from './core/scale.js';
import { project, position, END } from './core/progress.js';
import { commentFacts, templateComment, shaky, bookFor, nextLabel } from './core/summary.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const status = (text, kind = '') => { $('#report-status').textContent = text; $('#report-status').className = `status no-print ${kind}`; };

const id = new URLSearchParams(location.search).get('id');
let result = null;
try { result = JSON.parse(localStorage.getItem(`elt:result:${id}`)); } catch { /* 아래에서 안내 */ }

if (!result) {
  status('결과를 찾지 못했습니다. 시험을 본 기기와 브라우저에서 열어 주세요.', 'error');
} else {
  const ests = Object.fromEntries(SECTIONS.filter((k) => result.sections[k].est).map((k) => [k, result.sections[k].est]));
  const proj = project({ grade: result.grade, date: result.date, ests, pace: result.pace });
  const facts = commentFacts(result, proj);
  const c = templateComment(facts);
  if (/^#[0-9a-f]{6}$/i.test(result.academy?.color ?? '')) document.documentElement.style.setProperty('--brand', result.academy.color);
  $('#sheet1').innerHTML = sheet1(result, proj, c);
  $('#sheet2').innerHTML = sheet2(result, c);
  $('#print').onclick = () => print();
  $('#png1').onclick = () => png('#sheet1', '학부모용');
  $('#png2').onclick = () => png('#sheet2', '원장용');
  fillComment(facts);
}

function header(r, title) {
  const a = r.academy || {};
  let logo = a.logo;
  if (!logo) {
    try { logo = JSON.parse(localStorage.getItem('elt:academy'))?.logo; } catch { /* 로고 없이 이름만 */ }
  }
  const mark = /^data:image\//.test(logo ?? '') ? `<img src="${esc(logo)}" alt="">` : `<b>${esc(a.name)}</b>`;
  return `<header><div><h1>${esc(title)}</h1><div class="meta">${esc(r.name)} · ${esc(r.grade)} · 응시일 ${esc(r.date)}</div></div>${mark}</header>`;
}

function footer(r) {
  const a = r.academy || {};
  return `<footer><span>${esc(a.name)}</span><span>${esc(a.phone)}</span></footer>`;
}

function sheet1(r, proj, c) {
  const now = currentStep(r.grade, r.date);
  const pct = (p) => Math.max(0, Math.min(100, ((p - MIN_STEP) / (END - MIN_STEP)) * 100));
  const rows = SECTIONS.map((k) => {
    const s = r.sections[k];
    if (!s.est) return `<b>${SECTION_KO[k]}</b><span>${esc(s.skipped || '응시하지 않음')}</span>`;
    return `<b>${SECTION_KO[k]}</b><span class="${s.est.step > now ? 'up' : ''}">${esc(positionText(k, s.est))}</span>`;
  }).join('');
  const bars = SECTIONS.filter((k) => r.sections[k].est).map((k) => {
    const est = r.sections[k].est;
    return `<div class="bar"><b>${SECTION_KO[k]}</b><div class="track"><div class="fill${est.step > now ? ' up' : ''}" style="width:${pct(position(est))}%"></div><div class="now" style="left:${pct(now + 0.5)}%"></div></div></div>`;
  }).join('');
  const done = proj?.overall.label === '고3 과정 완료';
  const road = proj ? `
    <h2>우리 학원 예상 진도</h2>
    <p class="big" contenteditable>${done ? '이미 고3 과정 수준에 도달했습니다' : `우리 학원에서 <b>${esc(proj.overall.label)}</b>에 고3 과정 완료 예상`}</p>
    <table class="roadmap"><thead><tr><th>시기</th>${Object.keys(proj.rows[0].cells).map((k) => `<th>${SECTION_KO[k]}</th>`).join('')}</tr></thead>
    <tbody>${proj.rows.map((row) => `<tr><td>${esc(row.when)}</td>${Object.values(row.cells).map((v) => `<td class="${v === '완료' ? 'done' : ''}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <p class="small">한 해에 ${proj.pace}학기씩 나아갈 때의 예상입니다 (학교 진도는 한 해 2학기). 조금 빠르면 ${esc(proj.high.label)}, 조금 느리면 ${esc(proj.low.label)}입니다.</p>` : '';
  return `${header(r, '영어 레벨테스트 결과')}
    <h2>영역별 현재 위치</h2><div class="pos">${rows}</div>
    <h2>학년 대비 위치</h2><div class="bars">${bars}</div>
    <p class="small">막대는 중1 1학기부터 고3 2학기까지 얼마나 왔는지, 붉은 선은 지금 학년입니다. 금색은 학년보다 앞선 영역입니다.</p>
    ${road}
    <h2>총평</h2><p id="summary" contenteditable>${esc(c.summary)}</p>
    ${footer(r)}`;
}

function sheet2(r, c) {
  const logs = SECTIONS.map((k) => {
    const s = r.sections[k];
    if (!s.log.length) return `<div><h2>${SECTION_KO[k]}</h2><p class="small">${esc(s.skipped || '응시하지 않음')}</p></div>`;
    const range = shaky(s.log);
    const book = s.est ? bookFor(r.academy?.books, k, s.est.step) : '';
    return `<div><h2>${SECTION_KO[k]}</h2>
      <table><thead><tr><th>#</th><th>학기</th><th>단원</th><th>유형</th><th>정오</th><th>초</th></tr></thead><tbody>
      ${s.log.map((x, i) => `<tr class="${x.correct ? '' : 'wrong'}"><td>${i + 1}</td><td>${labelOf(x.step)}</td><td>${x.unit}</td><td>${esc(x.kind)}</td><td>${x.correct ? '○' : '×'}</td><td>${Math.round(x.ms / 1000)}</td></tr>`).join('')}
      </tbody></table>
      <p class="small">${range ? `흔들린 구간 ${labelOf(range.from)} ~ ${labelOf(range.to)}` : '흔들린 구간 없음'} · 다음 시작 ${s.est ? esc(nextLabel(k, s.est)) : '-'}${book ? ` · 교재 ${esc(book)}` : ''}</p></div>`;
  }).join('');
  return `${header(r, '레벨테스트 상세 (원장용)')}<div class="logs">${logs}</div>
    <h2>지도 방향</h2><ol id="directions" contenteditable>${c.directions.map((d) => `<li>${esc(d)}</li>`).join('')}</ol>
    ${footer(r)}`;
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

async function png(sel, label) {
  try {
    const url = await window.htmlToImage.toPng($(sel), { pixelRatio: 2, backgroundColor: '#ffffff' });
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.name}-레벨테스트-${label}.png`;
    a.click();
  } catch {
    status('그림으로 저장하지 못했습니다. 인쇄 / PDF 를 써 주세요.', 'error');
  }
}
