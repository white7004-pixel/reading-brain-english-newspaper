// 문항 검수: 영역·학기로 골라 문항을 고치고 통과/버리기. 시험판은 브라우저에 임시 저장하고 items.json 으로 내려받는다.
import { SCALE, SECTIONS, SECTION_KO, labelOf, unitName } from './core/scale.js';
import { validateItem, coverage } from './core/bank.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const KEY = 'elt:review';
const STATUS_KO = { draft: '검수 전', ok: '통과', rejected: '버림' };
const status = (t, k = '') => { $('#review-status').textContent = t; $('#review-status').className = `status ${k}`; };

let items = await loadItems();
$('#f-section').innerHTML = SECTIONS.map((k) => `<option value="${k}">${SECTION_KO[k]}</option>`).join('');
$('#f-step').innerHTML = '<option value="">전체</option>' + SCALE.map((s) => `<option value="${s.step}">${labelOf(s.step)}</option>`).join('');
for (const sel of ['#f-section', '#f-step', '#f-status']) $(sel).onchange = draw;
$('#file').onchange = async (e) => {
  try {
    const data = JSON.parse(await e.target.files[0].text());
    if (!Array.isArray(data)) throw new Error();
    items = data;
    keep();
    draw();
  } catch {
    status('items.json 모양의 파일이 아닙니다', 'error');
  }
};
$('#download').onclick = download;
draw();

async function loadItems() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(d)) return d; } catch { /* 파일에서 */ }
  try { const r = await fetch('data/items.json', { cache: 'no-store' }); if (r.ok) return await r.json(); } catch { /* 빈 은행 */ }
  return [];
}

function keep() {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { status('이 브라우저에 임시 저장하지 못했습니다. 자주 내려받아 주세요.', 'warn'); }
}

function draw() {
  const sec = $('#f-section').value;
  const step = Number($('#f-step').value) || null;
  const st = $('#f-status').value;
  const shown = items.filter((i) => i.section === sec && (!step || i.step === step) && (!st || i.status === st));
  const short = coverage(items);
  $('#short-count').textContent = `${short.length}개`;
  $('#short').innerHTML = short.map((s) => `<div>${SECTION_KO[s.section]} ${labelOf(s.step)} ${s.unit}단원 — 통과 ${s.n}개</div>`).join('');
  $('#list').replaceChildren(...shown.slice(0, 50).map(card));
  status(`${shown.length}개${shown.length > 50 ? ' 중 50개만 보입니다 (학기를 골라 주세요)' : ''} · 은행 전체 ${items.length}개`);
}

function card(it) {
  const el = document.createElement('section');
  el.className = 'card review-item';
  let where = `${labelOf(it.step)} ${it.unit}단원`;
  try { where += ` · ${unitName(it.section, it.step, it.unit)}`; } catch { where += ' · 척도에 없는 자리'; }
  const hasPassage = it.section === 'reading' || it.section === 'listening';
  el.innerHTML = `
    <div><span class="tag ${esc(it.status)}">${STATUS_KO[it.status] || esc(it.status)}</span><span class="tag">${esc(where)}</span><span class="tag">${esc(it.kind)}</span></div>
    ${hasPassage ? `<label>${it.section === 'reading' ? '지문' : '대본 (학생에게는 들려만 줍니다)'}<textarea data-k="passage" rows="6">${esc(it.passage)}</textarea></label>` : ''}
    <label>질문<textarea data-k="question" rows="2">${esc(it.question)}</textarea></label>
    ${it.choices.map((c, i) => `<label class="choice"><input type="radio" name="a-${esc(it.id)}" value="${i}"${i === it.answer ? ' checked' : ''}><input data-c="${i}" value="${esc(c)}"></label>`).join('')}
    <label>해설<input data-k="explain_ko" value="${esc(it.explain_ko)}"></label>
    <p class="status error" data-problems></p>
    <div class="row"><button data-act="ok" type="button">통과</button><button data-act="rejected" type="button" class="btn-ghost">버리기</button></div>`;
  el.addEventListener('input', () => { read(el, it); keep(); });
  el.addEventListener('change', () => { read(el, it); keep(); });
  for (const b of el.querySelectorAll('[data-act]')) {
    b.onclick = () => {
      read(el, it);
      const p = validateItem(it);
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
  it.choices = [...el.querySelectorAll('[data-c]')].map((f) => f.value);
  const a = el.querySelector('input[type=radio]:checked');
  if (a) it.answer = Number(a.value);
}

function download() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(items, null, 1)], { type: 'application/json' }));
  a.download = 'items.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
