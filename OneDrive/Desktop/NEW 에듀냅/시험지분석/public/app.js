import { SUBJECTS, DIFF5, KINDS, SOURCES, examStats, studentStats, parseStudents, esc, noText, noNum, byNoOrder } from './lib.js';
import { unitsFor, GRADES } from './curriculum.js';
import { schoolPage, studentPage, explainPages } from './report.js';
import { shareCards } from './share.js';
import { slideDeck } from './slides.js';
import { pickBrandColor, PALETTE } from './color.js';

export const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
export const state = { academy: null, meta: null, items: [] };

const store = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 저장 못 해도 이번 화면에서는 쓴다 */ } },
};

export function show(sel) {
  $(sel).hidden = false;
  $(sel).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function setStatus(sel, text, isError = false) {
  $(sel).textContent = text;
  $(sel).classList.toggle('error', isError);
}

// 리딩브레인 선생님들만 쓰는 화면이다. 원장님이 정한 암호 하나로 연다.
// 한 번 넣으면 이 기기에 적어 두고, 틀리면 다시 묻는다.
const PW_KEY = 'rb-exam-pw';
let PW = (() => { try { return localStorage.getItem(PW_KEY) || ''; } catch { return ''; } })();

function askPassword() {
  const p = prompt('리딩브레인 시험지분석 — 암호를 넣어 주세요');
  if (!p) return false;
  PW = p;
  try { localStorage.setItem(PW_KEY, p); } catch { /* 시크릿 창이면 이번만 쓴다 */ }
  return true;
}

export async function api(path, body) {
  for (let 번째 = 0; 번째 < 2; 번째 += 1) {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(PW ? { authorization: `Bearer ${PW}` } : {}) },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;
    // 암호가 틀렸으면 한 번만 다시 묻고 그대로 보낸다 (사진을 다시 고르게 하지 않는다)
    if (res.status === 401 && 번째 === 0) {
      PW = '';
      try { localStorage.removeItem(PW_KEY); } catch { /* 시크릿 창 */ }
      if (askPassword()) continue;
    }
    throw new Error(data.error || '잠시 후 다시 시도해 주세요');
  }
  throw new Error('암호가 맞지 않습니다');
}

// ---------- 사진 줄이기 ----------
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`${file.name} 을(를) 열지 못했습니다. JPG·PNG 사진으로 올려 주세요`));
    img.src = URL.createObjectURL(file);
  });
}

async function shrink(file, edge, type = 'image/jpeg', quality = 0.75) {
  const img = await loadImage(file);
  const scale = Math.min(1, edge / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const g = canvas.getContext('2d');
  if (type === 'image/jpeg') { g.fillStyle = '#fff'; g.fillRect(0, 0, canvas.width, canvas.height); }
  g.drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(img.src);
  return canvas.toDataURL(type, quality);
}

// ---------- PDF → 쪽 그림 ----------
// PDF 는 쪽마다 그림으로 바꿔 사진과 같은 길(줄이기 → AI)로 보낸다. pdf.js 는 설치 때 복사된다 (scripts/vendor-pdfjs.js).
const PDFJS = new URL('vendor/pdfjs/', location.href).href;
const isPdf = (file) => file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
const tooMany = (label, max, n) => new Error(`${label}는 ${max}쪽까지 올릴 수 있습니다 (지금 ${n}쪽)`);

async function pdfToImages(file, max, label) {
  let pdfjs;
  try {
    pdfjs = await import(`${PDFJS}pdf.min.mjs`); // 설치 때 복사되지 않았으면 브라우저 영어 오류가 뜬다 → 원장님 말로 바꾼다
  } catch {
    throw new Error('PDF 읽기 기능을 불러오지 못했습니다. 우선 사진으로 올려 주세요 (설치가 끝나지 않았을 수 있습니다)');
  }
  pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS}pdf.worker.min.mjs`;
  const task = pdfjs.getDocument({
    data: await file.arrayBuffer(),
    cMapUrl: `${PDFJS}cmaps/`, standardFontDataUrl: `${PDFJS}standard_fonts/`, wasmUrl: `${PDFJS}wasm/`,
  });
  try {
    let doc;
    try {
      doc = await task.promise;
    } catch (err) {
      throw new Error(err?.name === 'PasswordException' ? `${file.name} 에 비밀번호가 걸려 있습니다. 풀고 올려 주세요` : `${file.name} 을(를) 열지 못했습니다. PDF 가 깨졌는지 확인해 주세요`);
    }
    if (doc.numPages > max) throw tooMany(label, max, doc.numPages);
    const out = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: 2000 / Math.max(base.width, base.height) }); // 줄이기(1800px)보다 조금 크게
      const canvas = Object.assign(document.createElement('canvas'), { width: Math.round(viewport.width), height: Math.round(viewport.height) });
      // intent:'print' 로 그린다. 화면용으로 그리면 pdf.js 가 requestAnimationFrame 으로 이어 그리는데,
      // 원장님이 다른 창으로 넘어가면 그 호출이 멈춰 변환이 끝나지 않는다 (pdf.mjs useRequestAnimationFrame: !intentPrint).
      await page.render({ canvas, viewport, intent: 'print' }).promise;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
      out.push(new File([blob], `${file.name}-${n}.jpg`, { type: 'image/jpeg' }));
    }
    return out;
  } finally {
    task.destroy();
  }
}

// ---------- 한글(.hwp·.hwpx) → 쪽 그림 ----------
// 학교가 시험지를 한글 파일로 주는 일이 많다. rhwp 가 쪽마다 SVG 로 그려 주면
// 그것을 그림으로 바꿔 사진·PDF 와 똑같은 길로 보낸다. wasm 이 10MB 라 한글을 올릴 때만 불러온다.
const RHWP = new URL('vendor/rhwp/', location.href).href;
const isHwp = (file) => /\.hwpx?$/i.test(file.name);
let rhwpReady = null;

function loadRhwp() {
  rhwpReady ??= (async () => {
    // rhwp 는 글자 너비를 호스트에 묻는다. 글자 하나씩 묻기 때문에 글꼴별로 모아 둔다.
    const ctx = document.createElement('canvas').getContext('2d');
    const 너비 = new Map();
    globalThis.measureTextWidth = (font, text) => {
      let 표 = 너비.get(font);
      if (!표) 너비.set(font, (표 = new Map()));
      let w = 표.get(text);
      if (w === undefined) { ctx.font = font; 표.set(text, (w = ctx.measureText(text).width)); }
      return w;
    };
    const rhwp = await import(`${RHWP}rhwp.js`);
    await rhwp.default({ module_or_path: `${RHWP}rhwp_bg.wasm` });
    return rhwp;
  })().catch((e) => { rhwpReady = null; throw e; });
  return rhwpReady;
}

// SVG 글자를 캔버스에 그리려면 그림으로 먼저 바꿔야 한다. <img> 에 통째로 실어 그린다.
async function svgToFile(svg, name, scale) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('한글 쪽을 그림으로 바꾸지 못했습니다'));
      el.src = url;
    });
    const canvas = Object.assign(document.createElement('canvas'), {
      width: Math.round(img.width * scale), height: Math.round(img.height * scale),
    });
    const g = canvas.getContext('2d');
    g.fillStyle = '#fff';                      // SVG 바탕이 비어 있어 흰 종이를 먼저 깐다
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    return new File([blob], name, { type: 'image/jpeg' });
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function hwpToImages(file, max, label) {
  let rhwp;
  try {
    rhwp = await loadRhwp();
  } catch {
    throw new Error('한글 파일 읽기 기능을 불러오지 못했습니다. 한글에서 PDF 로 저장해 올려 주세요');
  }
  let viewer;
  try {
    try {
      // HwpViewer 가 문서를 가져간다. 그래서 문서를 따로 free 하면 터진다 (null pointer passed to rust)
      viewer = new rhwp.HwpViewer(new rhwp.HwpDocument(new Uint8Array(await file.arrayBuffer())));
    } catch {
      throw new Error(`${file.name} 을(를) 열지 못했습니다. 한글에서 PDF 로 저장해 올려 주세요`);
    }
    const 쪽수 = viewer.pageCount();
    if (쪽수 > max) throw tooMany(label, max, 쪽수);
    const out = [];
    for (let n = 0; n < 쪽수; n++) {
      const svg = viewer.renderPageSvg(n);
      out.push(await svgToFile(svg, `${file.name}-${n + 1}.jpg`, 2000 / 794)); // A4 폭 794 → 2000px
    }
    return out;
  } finally {
    viewer?.free();
  }
}

// 고른 파일(사진·PDF·한글 섞어도 됨)을 고른 순서대로 쪽 그림 목록으로
async function toImages(files, max, label) {
  const out = [];
  for (const f of files) {
    if (isPdf(f)) out.push(...await pdfToImages(f, max, label));
    else if (isHwp(f)) out.push(...await hwpToImages(f, max, label));
    else out.push(f);
  }
  if (out.length > max) throw tooMany(label, max, out.length);
  return out;
}

const MAX_BODY_CHARS = 4_000_000; // Vercel 요청 4.5MB 제한 안쪽

async function encodeAll(files) {
  for (const edge of [1800, 1400, 1100]) {
    const out = await Promise.all(files.map((f) => shrink(f, edge).then((url) => url.split(',')[1])));
    if (out.reduce((s, d) => s + d.length, 0) < MAX_BODY_CHARS) return out;
  }
  throw new Error('사진 용량이 너무 큽니다. 장수를 줄여 주세요');
}

// ---------- 학원 정보 (한 번 적으면 이 브라우저에 기억한다) ----------
const academyForm = $('#academy-form');
const showAcademy = () => { $('#academy-now').textContent = state.academy ? `· ${state.academy.name}` : '· 아직 없음'; };

$('#academy-form').elements.logo.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = await shrink(file, 400, 'image/png');
  $('#logo-preview').src = url;
  $('#logo-preview').hidden = false;
  const 색 = await logoColor(url);
  if (색) { academyForm.elements.color.value = 색; markSwatch(색); }
});

// 로고 그림에서 대표 색을 뽑는다. 색을 고르는 규칙은 color.js 에 있고 여기서는 픽셀만 읽어 넘긴다.
async function logoColor(url) {
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = url;
    });
    const w = Math.max(1, Math.min(120, img.width));
    const h = Math.max(1, Math.round((img.height / img.width) * w));
    const canvas = Object.assign(document.createElement('canvas'), { width: w, height: h });
    const g = canvas.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0, w, h);
    return pickBrandColor(g.getImageData(0, 0, w, h).data);
  } catch {
    return ''; // 색을 못 뽑아도 로고는 그대로 쓴다
  }
}

// 색판 — 누르면 대표 색이 바뀐다
const markSwatch = (hex) => $$('#swatches button').forEach((b) => {
  b.setAttribute('aria-pressed', String(b.dataset.hex.toUpperCase() === String(hex).toUpperCase()));
});
$('#swatches').innerHTML = PALETTE.map(([name, hex]) => `
  <button type="button" data-hex="${hex}" style="background:${hex}" title="${name}" aria-label="${name}" aria-pressed="false"></button>`).join('');
$('#swatches').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  academyForm.elements.color.value = b.dataset.hex;
  markSwatch(b.dataset.hex);
});
academyForm.elements.color.addEventListener('input', (e) => markSwatch(e.target.value));

academyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = academyForm.elements;
  state.academy = { name: f.academyName.value.trim(), phone: f.phone.value.trim(), color: f.color.value, logo: $('#logo-preview').hidden ? '' : $('#logo-preview').src, prep: f.prep.value.trim(), slogan: f.slogan.value.trim(), cover: f.cover.checked, a4: f.a4.checked, cards: f.cards.checked };
  store.set('academy', state.academy);
  // 이미 만들어 둔 결과에도 바로 비친다 — 색을 보려고 다시 돌리지 않으셔도 된다
  $('#pages').style.setProperty('--brand', state.academy.color);
  showAcademy();
  academyForm.closest('details').open = false;
});

// ---------- 1. 사진 올리기 ----------
$('#upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target.elements;
  const button = e.submitter;
  button.disabled = true;
  try {
    setStatus('#upload-status', '시험지 파일을 준비하는 중…');
    const pages = await toImages([...f.pages.files], 6, '시험지');
    const encoded = await encodeAll(pages);
    setStatus('#upload-status', 'AI가 문항을 읽고 직접 풀어 정답까지 적고 있습니다. 1~3분 걸립니다…');
    const result = await api('/api/extract', { pages: encoded, subject: f.subject.value, grade: f.grade.value });
    state.meta = result.meta;
    state.items = result.items;
    $('#confirm-notes').textContent = result.notes;
    renderMeta();
    renderItems();
    setStatus('#upload-status', '');
    show('#step-confirm');
    $('#step-students').hidden = false;
    // 원장님이 더 누르지 않아도 되게 바로 분석까지 간다. 고칠 곳이 있으면 문항표에서 고치고
    // '리포트 만들기' 를 다시 누르면 새로 만들어진다. 학원 정보가 없는 등 못 가는 경우는
    // make-report 가 그 자리에서 이유를 알려 준다.
    $('#make-report').click();
  } catch (err) {
    setStatus('#upload-status', `${err.message} — 버튼을 다시 누르면 다시 시도합니다`, true);
  } finally {
    button.disabled = false;
  }
});

// ---------- 2. 확인 표 ----------
const options = (list, value) => list.map((o) => `<option${o === value ? ' selected' : ''}>${esc(o)}</option>`).join('');
const areasNow = () => SUBJECTS[state.meta.subject];

// 시험 정보: AI 가 머리글에서 읽은 값. 못 읽어 빈 학교·학년은 금색으로 표시한다.
function renderMeta() {
  const f = $('#meta-form').elements;
  f.subject.innerHTML = options(Object.keys(SUBJECTS), state.meta.subject);
  for (const k of ['school', 'grade', 'term', 'exam', 'date', 'range']) {
    f[k].value = state.meta[k] ?? '';
    f[k].classList.toggle('unsure', !state.meta[k] && (k === 'school' || k === 'grade'));
  }
  f.minutes.value = state.meta.minutes || '';
}

$('#meta-form').addEventListener('input', (e) => {
  const { name, value } = e.target;
  state.meta[name] = name === 'minutes' ? Number(value) || 0 : value.trim();
  e.target.classList.remove('unsure');
  if (name === 'grade') drawUnitList();
  if (name !== 'subject') return;
  // 과목을 바꾸면 그 과목에 없는 영역은 첫 영역으로 두고 다시 확인하게 한다
  state.items.forEach((it) => {
    if (!areasNow().includes(it.area)) { it.area = areasNow()[0]; it.unsure = [...new Set([...it.unsure, 'area'])]; }
  });
  renderItems();
});

// 단원 칸에서 고를 수 있는 목록. 교과서 목차(있으면)와 이 시험지에 이미 적은 단원을 모은다.
// 같은 단원을 '5과'·'Lesson 5'·'5단원'으로 갈라 적지 않게 하는 것이 목적이다. 자유 입력은 그대로 된다.
function drawUnitList() {
  const 이미쓴것 = state.items.map((it) => (it.unit ?? '').trim()).filter(Boolean);
  const 목록 = [...new Set([...unitsFor(state.meta.subject, state.meta.grade), ...이미쓴것])];
  $('#unit-list').innerHTML = 목록.map((u) => `<option value="${esc(u)}"></option>`).join('');
}

function renderItems() {
  $('#items tbody').innerHTML = state.items.map((it, i) => {
    const cell = (field, html) => `<td data-field="${field}" class="${it.unsure.includes(field) ? 'unsure' : ''}">${html}</td>`;
    const no = esc(it.no);
    return `<tr data-i="${i}">
      ${cell('no', `<input value="${no}" aria-label="${no}번 번호" placeholder="7">`)}
      ${cell('kind', `<select aria-label="${no}번 유형">${options(KINDS, it.kind)}</select>`)}
      ${cell('points', `<input type="number" step="0.1" min="0" value="${esc(it.points)}" aria-label="${no}번 배점">`)}
      ${cell('unit', `<input list="unit-list" value="${esc(it.unit ?? '')}" aria-label="${no}번 단원" placeholder="5과">`)}
      ${cell('area', `<select aria-label="${no}번 영역">${options(areasNow(), it.area)}</select>`)}
      ${cell('subtype', `<input value="${esc(it.subtype)}" aria-label="${no}번 세부유형">`)}
      ${cell('difficulty', `<select aria-label="${no}번 난이도">${options(DIFF5, it.difficulty)}</select>`)}
      ${cell('source', `<select aria-label="${no}번 출처"><option value=""${it.source ? '' : ' selected'}>— 모름</option>${options(SOURCES, it.source)}</select>`)}
      ${cell('answer', `<input value="${esc(it.answer)}" aria-label="${no}번 정답">`)}
      <td class="c"><input type="checkbox" data-key${it.key ? ' checked' : ''} aria-label="${no}번 대표 문항"></td>
      <td class="reason">${esc(it.reason)}</td>
      <td><button type="button" class="ghost" data-del aria-label="${no}번 삭제">삭제</button></td>
    </tr>`;
  }).join('');
  drawUnitList();
  updateTotal();
}

// 번호가 비었거나 겹치면 리포트 숫자가 틀어진다 → 고칠 때까지 만들지 않는다
// 번호는 글자다 — 학교가 `논술형2-1` 처럼 매기기 때문이다.
function itemProblem() {
  if (state.items.some((it) => !noText(it.no))) return '번호가 비어 있는 문항이 있습니다';
  const nos = state.items.map((it) => noText(it.no));
  const dups = [...new Set(nos.filter((n, i) => nos.indexOf(n) !== i))];
  return dups.length ? `${dups.join(', ')}번이 두 번 있습니다` : '';
}

function updateTotal() {
  const { count, total } = examStats(state.items);
  const notes = [total !== 100 && '100점이 아닙니다. 배점을 확인해 주세요', itemProblem()].filter(Boolean);
  $('#confirm-total').textContent = `${count}문항 · 배점 합계 ${total}점${notes.length ? ` — ${notes.join(' · ')}` : ''}`;
  $('#confirm-total').classList.toggle('warn', notes.length > 0);
  checkStudents(); // 학생 번호 확인도 지금 번호로
}

$('#items').addEventListener('input', (e) => {
  const td = e.target.closest('td[data-field]');
  if (!td) return;
  const it = state.items[Number(td.parentElement.dataset.i)];
  const field = td.dataset.field;
  it[field] = field === 'points' ? Number(e.target.value) : e.target.value;
  it.unsure = it.unsure.filter((name) => name !== field);
  td.classList.remove('unsure');
  if (field === 'unit') drawUnitList();
  if (field === 'points' || field === 'no') updateTotal();
});

$('#items').addEventListener('change', (e) => {
  if (!e.target.matches('[data-key]')) return;
  state.items[Number(e.target.closest('tr').dataset.i)].key = e.target.checked;
});

$('#items').addEventListener('click', (e) => {
  const tr = e.target.closest('[data-del]')?.closest('tr');
  if (!tr) return;
  state.items.splice(Number(tr.dataset.i), 1);
  renderItems();
});

$('#add-item').addEventListener('click', () => {
  // 숫자 번호 중 가장 큰 것 다음. 글자 번호(논술형2-1)는 세지 않는다
  const no = String(Math.max(0, ...state.items.map((it) => (noNum(it.no) === Infinity ? 0 : noNum(it.no)))) + 1);
  state.items.push({ no, key: false, kind: '객관식', points: 0, unit: '', area: areasNow()[0], subtype: '', difficulty: '중', source: '', answer: '', reason: '원장님 추가', unsure: [] });
  renderItems();
});

// ---------- 4. 학생 입력 ----------
function checkStudents() {
  const result = parseStudents($('#students').value, state.items.map((it) => it.no));
  $('#students-problems').textContent = result.problems.join('\n');
  return result;
}
$('#students').addEventListener('input', checkStudents);

// ---------- 5. 리포트 만들기 ----------
// 최대 limit 개만 동시에 부른다. 결과는 넣은 순서대로. 하나가 실패하면 남은 호출은 시작하지 않는다.
async function runLimited(tasks, limit) {
  const out = [];
  let next = 0;
  const worker = async () => {
    while (next < tasks.length) {
      const i = next++;
      try { out[i] = await tasks[i](); } catch (err) { next = tasks.length; throw err; }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return out;
}

const GROUP = 5; // 학생 5명씩 한 번
const IN_FLIGHT = 3; // 동시에 3개까지 (학교 분석 포함)

$('#make-report').addEventListener('click', async (e) => {
  const itemIssue = itemProblem();
  if (itemIssue) return setStatus('#report-status', `${itemIssue} — 문항표에서 번호를 고쳐 주세요`, true);
  if (!state.meta.school || !state.meta.grade) return setStatus('#report-status', '문항표 위 시험 정보에 학교와 학년을 적어 주세요', true);
  if (!state.academy) {
    academyForm.closest('details').open = true;
    return setStatus('#report-status', '리포트에 들어갈 학원 정보를 한 번 저장해 주세요 (STEP 01 아래)', true);
  }
  const { students, problems } = checkStudents();
  if (problems.length) return;
  const button = e.currentTarget;
  button.disabled = true;
  const items = [...state.items].sort(byNoOrder).map(({ unsure, ...it }) => it);
  const groups = [];
  for (let i = 0; i < students.length; i += GROUP) groups.push(students.slice(i, i + GROUP));
  try {
    setStatus('#report-status', `분석 글을 쓰는 중입니다${students.length ? ` (학생 ${students.length}명)` : ''}. 1~3분 걸립니다…`);
    const [school, ...parts] = await runLimited([
      () => api('/api/report', { mode: 'school', meta: state.meta, items }),
      ...groups.map((group) => () => api('/api/report', { mode: 'students', meta: state.meta, items, students: group })),
    ], IN_FLIGHT);
    const written = parts.flatMap((p) => p.students); // 서버가 학생 수·순서를 맞춰 돌려준다
    const ctx = { academy: state.academy, meta: state.meta, items, stats: examStats(items) };
    $('#pages').style.setProperty('--brand', state.academy.color);
    // 학교 분석은 발표 슬라이드 한 벌이 기본이다 (원장님 결정 2026-10-01 — 여러 형태를 한꺼번에 쏟지 않는다).
    // A4 종이와 정사각 카드는 원장님이 켜실 때만 뒤에 붙는다.
    $('#pages').innerHTML = slideDeck(ctx, school)
      + (state.academy.cards ? shareCards(ctx, school) : '')
      + (state.academy.a4 ? schoolPage(ctx, school) : '')
      + students.map((s, i) => studentPage(ctx, s, studentStats(items, s.wrong), written[i])).join('')
      + explainPages(ctx); // 학원용 문항 해설은 맨 뒤에 (학부모 종이와 섞이지 않게)
    // 버튼은 이번에 실제로 나온 것만 보여 준다 — 눌러도 아무 일 없는 버튼을 두지 않는다
    const 카드 = document.querySelectorAll('#pages .sheet.card-news').length;
    $('#save-cards').hidden = !카드;
    $('#save-cards').textContent = `카드 ${카드}장 한 번에 받기`;
    $('#print-slides').textContent = `슬라이드 ${document.querySelectorAll('#pages .sheet.slide').length}장 PDF 저장 (가로)`;
    setStatus('#report-status', '');
    show('#step-result');
    fitAll();
    fitSlides();
    document.fonts.ready.then(fitAll); // 제목 웹폰트가 늦게 들어오면 높이가 바뀐다
  } catch (err) {
    setStatus('#report-status', `${err.message} — 버튼을 다시 누르면 다시 시도합니다`, true);
  } finally {
    button.disabled = false;
  }
});

// 슬라이드(1280px)는 창보다 넓다. 화면에서 볼 때만 줄인다. PNG 는 원래 크기로 받는다.
const SLIDE_W = 1280;
function fitSlides() {
  // 창을 못 재는 자리(화면이 아직 안 뜬 때)에는 1 로 둔다 — 줄이지 않는 쪽이 안전하다
  const w = $('#pages').clientWidth || document.documentElement.clientWidth || innerWidth || 0;
  $('#pages').style.setProperty('--slide-zoom', w ? Math.min(1, w / SLIDE_W) : 1);
}
addEventListener('resize', fitSlides);

// ---------- A4 한 장 맞추기 ----------
// 넘치면 글자 배율(--fit)을 조금씩 줄인다. 고친 글이 짧아지면 다시 커지도록 매번 1 부터 계산한다.
// 인쇄 반올림 여유 2px: 잴 때만 종이를 2px 짧게 두고 맞춘다 (scrollHeight 는 clientHeight 보다 작아지지 않으므로 빼기로는 못 잰다)
function fitPage(page) {
  const overflows = () => page.scrollHeight > page.clientHeight;
  const paper = getComputedStyle(page).height; // A4 는 297mm, 카드뉴스는 1080px
  page.style.height = `calc(${paper} - 2px)`;
  let fit = 1;
  page.style.setProperty('--fit', fit);
  while (overflows() && fit > 0.72) {
    fit = Math.round((fit - 0.03) * 100) / 100;
    page.style.setProperty('--fit', fit);
  }
  page.closest('.sheet').querySelector('.fit-warn').hidden = !overflows();
  page.style.height = '';
}
const fitAll = () => document.querySelectorAll('#pages .page').forEach(fitPage);

$('#pages').addEventListener('input', (e) => {
  const page = e.target.closest('.page');
  if (page) fitPage(page);
});

// ---------- 6. 내려받기 ----------
$('#pages').addEventListener('click', async (e) => {
  const button = e.target.closest('[data-png]');
  if (!button) return;
  const page = button.closest('.sheet').querySelector('.page');
  button.disabled = true;
  try {
    const url = await htmlToImage.toPng(page, { pixelRatio: 2, backgroundColor: '#ffffff' });
    Object.assign(document.createElement('a'), { href: url, download: `${button.dataset.png}.png` }).click();
  } catch {
    alert('이미지를 만들지 못했습니다. [전체 인쇄 / PDF 저장]을 써 주세요');
  } finally {
    button.disabled = false;
  }
});

// 카드 3장을 차례로 저장한다. 한꺼번에 여러 파일을 받으면 브라우저가 막을 수 있어 하나씩 기다린다.
$('#save-cards').addEventListener('click', async (e) => {
  const buttons = [...document.querySelectorAll('.sheet.card-news [data-png]')];
  if (!buttons.length) return;
  const button = e.currentTarget;
  button.disabled = true;
  try {
    for (const b of buttons) {
      b.click();
      await new Promise((r) => setTimeout(r, 600));
    }
  } finally {
    button.disabled = false; // 중간에 실패해도 다시 누를 수 있게 되돌린다
  }
});

// ---------- 리포트 디자인 고르기 ----------
// 다섯 가지는 style.css 의 #pages[data-theme] 에 있다. 글꼴이 바뀌면 높이도 바뀌므로 다시 한 장에 맞춘다.
const THEMES = ['classic', 'news', 'modern', 'soft', 'bold'];
function setTheme(name) {
  const theme = THEMES.includes(name) ? name : 'bold'; // 원장님이 고른 기본값 (2026-10-01)
  $('#pages').dataset.theme = theme;
  $('#theme').value = theme;
  store.set('theme', theme);
  fitAll();
  document.fonts.ready.then(fitAll); // 처음 고른 글꼴은 늦게 들어온다
}
$('#theme').addEventListener('change', (e) => setTheme(e.target.value));

// 슬라이드는 16:9 라 A4 세로에 잘린다. 슬라이드만 남기고 종이를 가로로 돌려 인쇄한다.
// @page 는 요소 선택자를 못 쓰므로 인쇄하는 동안만 <style> 을 끼워 넣는다.
$('#print-slides').addEventListener('click', () => {
  const style = Object.assign(document.createElement('style'), {
    textContent: '@media print { @page { size: A4 landscape; margin: 0 } }',
  });
  const 되돌리기 = () => { style.remove(); document.body.classList.remove('print-slides'); };
  document.head.append(style);
  document.body.classList.add('print-slides');
  addEventListener('afterprint', 되돌리기, { once: true });
  window.print();
  setTimeout(되돌리기, 60_000); // afterprint 가 안 오는 브라우저를 위한 안전장치
});

// ---------- 시작 ----------
const saved = store.get('academy');
if (saved) {
  state.academy = saved;
  const f = academyForm.elements;
  f.academyName.value = saved.name;
  f.phone.value = saved.phone;
  f.color.value = saved.color;
  f.prep.value = saved.prep ?? '';
  f.slogan.value = saved.slogan ?? '';
  f.cover.checked = !!saved.cover;
  f.a4.checked = !!saved.a4;
  f.cards.checked = !!saved.cards;
  if (saved.logo) { $('#logo-preview').src = saved.logo; $('#logo-preview').hidden = false; }
  markSwatch(f.color.value);
}
showAcademy();
setTheme(store.get('theme')); // 기억해 둔 디자인을 처음부터 입힌다

// 올리기 화면의 과목·학년은 고르면 더 정확해지는 것일 뿐, 비워 두면 AI 가 머리글에서 읽는다.
const uploadPick = $('#upload-form').elements;
uploadPick.subject.insertAdjacentHTML('beforeend', options(Object.keys(SUBJECTS), ''));
uploadPick.grade.insertAdjacentHTML('beforeend', options(GRADES, ''));
