// 문제지 검수: 1차 A·B, 2차(넬트식) A·B 를 번호 순으로 고치고 통과/버리기. 브라우저에 임시 저장하고 forms.json 으로 내려받는다.
import { validateForm, isWrite, AREA_KO, STAGE_KO } from './core/forms.js';
import { openNotes } from './notes.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const KEY = 'elt:review-forms';
const STATUS_KO = { draft: '검수 전', ok: '통과', rejected: '버림' };
const BOOKS = [['stage1', 'A', '1차 A'], ['stage1', 'B', '1차 B'], ['stage2', 'A', '2차 A'], ['stage2', 'B', '2차 B']];
const arr = (x) => (Array.isArray(x) ? x.filter((i) => i && i.id) : []);
const status = (t, k = '') => { $('#review-status').textContent = t; $('#review-status').className = `status ${k}`; };

const forms = await loadForms();
const where = new Map(BOOKS.flatMap(([book, set, ko]) => forms[book][set].map((i) => [i.id, `${ko} ${i.no}번`])));
const notes = await openNotes('forms', { labelOf: (id) => where.get(id) ?? id });
notes.onName = draw;
$('.hero').after(notes.bar);
$('#f-book').innerHTML = BOOKS.map(([, , ko], i) => `<option value="${i}">${ko}</option>`).join('');
$('#f-book').onchange = draw;
$('#f-status').onchange = draw;
$('#download').onclick = download;
draw();

// 임시 저장이 있으면 그것을 먼저, 파일에만 있는 문항은 뒤에 붙인다 (review.js 와 같은 방식)
async function loadForms() {
  let file = null;
  let saved = null;
  try { const r = await fetch('data/forms.json', { cache: 'no-store' }); if (r.ok) file = await r.json(); } catch { /* 없음 */ }
  try { saved = JSON.parse(localStorage.getItem(KEY)); } catch { /* 없음 */ }
  const out = { ...file }; // write2 처럼 이 화면이 다루지 않는 묶음도 내려받을 때 그대로 둔다
  for (const [book, set] of BOOKS) {
    out[book] = { ...out[book] };
    const s = arr(saved?.[book]?.[set]);
    const ids = new Set(s.map((i) => i.id));
    out[book][set] = [...s, ...arr(file?.[book]?.[set]).filter((i) => !ids.has(i.id))];
  }
  return out;
}

function keep() {
  try { localStorage.setItem(KEY, JSON.stringify(forms)); } catch { status('이 브라우저에 임시 저장하지 못했습니다. 자주 내려받아 주세요.', 'warn'); }
}

function draw() {
  const [book, set] = BOOKS[$('#f-book').value];
  const st = $('#f-status').value;
  const list = forms[book][set].slice().sort((a, b) => a.no - b.no);
  $('#list').replaceChildren(...list.filter((i) => !st || i.status === st).map((i) => card(i, book)));
  status(`${list.length}문항 · 통과 ${list.filter((i) => i.status === 'ok').length}개`);
}

function card(it, book) {
  const stage = book === 'stage2' ? 2 : 1;
  const el = document.createElement('section');
  el.className = 'card review-item';
  const write = isWrite(it);
  el.innerHTML = `
    <div><span class="tag ${esc(it.status)}">${STATUS_KO[it.status] || esc(it.status)}</span><span class="tag">${esc(it.no)}번</span><span class="tag">${esc(AREA_KO[it.area] || it.area)}</span><span class="tag">${esc((stage === 2 && STAGE_KO[it.level]) || it.level)}</span>${it.kind && it.kind !== AREA_KO[it.area] ? `<span class="tag">${esc(it.kind)}</span>` : ''}${it.point ? `<span class="tag">${esc(it.point)}</span>` : ''}</div>
    ${it.area === 'reading' || it.passage || (stage === 2 && it.area === 'grammar') ? `<label>${it.area === 'grammar' ? '문장 (빈칸은 _____, 줄마다 a. b. …)' : '지문 (밑줄은 __말__)'}<textarea data-k="passage" rows="${it.area === 'reading' ? 6 : 4}">${esc(it.passage)}</textarea></label>` : ''}
    ${it.given !== undefined || it.kind === '문장 삽입' ? `<label>주어진 문장<textarea data-k="given" rows="2">${esc(it.given)}</textarea></label>` : ''}
    ${it.area === 'listening' ? `<label>대본 (한 줄에 한 사람, 여자는 W: · 남자는 M:)<textarea data-k="script" rows="8">${esc(it.script)}</textarea></label>` : ''}
    <label>질문<textarea data-k="question" rows="2">${esc(it.question)}</textarea></label>
    ${write ? `
      <label>문장 틀 (칸 자리는 {})<input data-k="template" value="${esc(it.template)}"></label>
      <label>뜻·조건 (선택)<input data-k="hint_ko" value="${esc(it.hint_ko)}"></label>
      <label>인정 답 — 한 줄에 한 칸, 여러 답은 / 로<textarea data-answers rows="${Math.max(2, it.answers?.length || 1)}">${esc((it.answers || []).map((a) => a.join(' / ')).join('\n'))}</textarea></label>`
    : (it.choices || []).map((c, i) => `<label class="choice"><input type="radio" name="a-${esc(it.id)}" value="${i}"${i === it.answer ? ' checked' : ''}><input data-c="${i}" value="${esc(c)}"></label>`).join('')}
    <label>해설<input data-k="explain_ko" value="${esc(it.explain_ko)}"></label>
    <p class="status error" data-problems></p>
    <div class="row"><button data-act="ok" type="button">통과</button><button data-act="rejected" type="button" class="btn-ghost">버리기</button></div>`;
  notes.lock(el);
  el.append(notes.block(it.id));
  el.addEventListener('input', () => { read(el, it); keep(); });
  el.addEventListener('change', () => { read(el, it); keep(); });
  for (const b of el.querySelectorAll('[data-act]')) {
    b.onclick = () => {
      read(el, it);
      const p = validateForm(it, stage);
      if (b.dataset.act === 'ok' && p.length) { el.querySelector('[data-problems]').textContent = `고칠 곳: ${p.join(', ')}`; return; }
      it.status = b.dataset.act;
      keep();
      draw();
    };
  }
  return el;
}

function read(el, it) {
  for (const f of el.querySelectorAll('[data-k]')) it[f.dataset.k] = f.value;
  if (isWrite(it)) {
    it.answers = el.querySelector('[data-answers]').value.split('\n').filter((l) => l.trim()).map((l) => l.split('/').map((x) => x.trim()).filter(Boolean));
  } else {
    it.choices = [...el.querySelectorAll('[data-c]')].map((f) => f.value);
    const a = el.querySelector('input[type=radio]:checked');
    if (a) it.answer = Number(a.value);
  }
}

function download() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(forms, null, 1)], { type: 'application/json' }));
  a.download = 'forms.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
