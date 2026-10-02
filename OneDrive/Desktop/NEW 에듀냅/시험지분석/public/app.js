import { SUBJECTS, DIFF5, KINDS, SOURCES, examStats, esc, noText, noNum, byNoOrder, hitInput } from './lib.js';
import { unitsFor, GRADES } from './curriculum.js';
import { subtypesFor, sourcesFor } from './subtypes.js';
import { schoolPage, explainPages } from './report.js';
import { draftSchool } from './draft.js';
import { cardDeck } from './cards.js';
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

// 암호 없이 그냥 연다 (2026-10-02 원장 결정).
export async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '잠시 후 다시 시도해 주세요');
  return data;
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
const showAcademy = () => {
  $('#academy-now').textContent = state.academy ? `· ${state.academy.name}` : '· 아직 없음';
  $('#side-academy').textContent = state.academy?.name || '아직 적지 않았습니다';
};

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

// ---------- 1. 문항표부터 직접 적기 (기본 길) ----------
// 사진 한 장으로 24문항을 정확히 읽어 내기는 어렵다 (2026-10-02 원장 판단).
// 그래서 빈 문항표를 먼저 깔고, 문항마다 유형·난이도를 원장님이 정하신다.
$('#start-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target.elements;
  const 수 = (name, max) => Math.min(max, Math.max(0, Number(f[name].value) || 0));
  const [선택, 단답, 서술] = [수('choice', 80), 수('short', 40), 수('essay', 40)];
  if (!(선택 + 단답 + 서술)) return setStatus('#upload-status', '문항 수를 적어 주세요', true);

  state.meta = {
    subject: f.subject.value, school: f.school.value.trim(), grade: f.grade.value,
    term: f.term.value.trim(), exam: f.exam.value.trim(), date: f.date.value, minutes: 0, range: '',
  };
  // 번호는 학교가 쓰는 꼴로 미리 매겨 둔다 — 선택형은 1부터, 서답형은 "서답형 1" 부터.
  let 서답번호 = 0;
  state.items = [
    ...Array.from({ length: 선택 }, (_, i) => blankItem(String(i + 1), '객관식')),
    ...Array.from({ length: 단답 }, () => blankItem(`서답형 ${++서답번호}`, '단답형')),
    ...Array.from({ length: 서술 }, () => blankItem(`서답형 ${++서답번호}`, '서술형')),
  ];
  $('#confirm-notes').textContent = '문항마다 배점·영역·난이도를 정해 주세요. 여러 줄을 골라 한 번에 넣으실 수 있습니다.';
  renderMeta();
  renderItems();
  setStatus('#upload-status', '');
  show('#step-confirm');
  $('#step-confirm').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- 1-나. 시험지 사진으로 초안 받기 (접어 둔 길) ----------
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
const sourcesNow = () => sourcesFor(state.meta.grade); // 고등은 모의고사·EBS 가 더 보인다

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
  if (name === 'grade') { drawUnitList(); return renderItems(); } // 중등↔고등이면 세부유형·출처가 통째로 바뀐다
  if (name !== 'subject') return;
  // 과목을 바꾸면 그 과목에 없는 영역은 첫 영역으로 두고 다시 확인하게 한다
  state.items.forEach((it) => {
    if (!areasNow().includes(it.area)) { it.area = areasNow()[0]; it.unsure = [...new Set([...it.unsure, 'area'])]; }
  });
  renderItems();
});

// 단원 칸에서 고를 수 있는 목록. 교과서 목차(있으면)와 이 시험지에 이미 적은 단원을 모은다.
// 같은 단원을 '5과'·'Lesson 5'·'5단원'으로 갈라 적지 않게 하는 것이 목적이다. 자유 입력은 그대로 된다.
// 세부유형 고르기 목록. 영역마다 하나씩 만들고 줄은 제 영역 것을 가리킨다.
// 중등·고등이 다른 유형을 쓰므로 학년을 바꾸면 목록도 바뀐다 (subtypes.js).
const stId = (i) => `st-${i}`;
function drawSubtypeLists() {
  $('#subtype-lists').innerHTML = areasNow().map((area, i) =>
    `<datalist id="${stId(i)}">${subtypesFor(state.meta.subject, state.meta.grade, area)
      .map((t) => `<option value="${esc(t)}"></option>`).join('')}</datalist>`).join('');
}

function drawUnitList() {
  const 이미쓴것 = state.items.map((it) => (it.unit ?? '').trim()).filter(Boolean);
  const 목록 = [...new Set([...unitsFor(state.meta.subject, state.meta.grade), ...이미쓴것])];
  $('#unit-list').innerHTML = 목록.map((u) => `<option value="${esc(u)}"></option>`).join('');
}

function renderItems(keepPicked = null) {
  $('#items tbody').innerHTML = state.items.map((it, i) => {
    const cell = (field, html) => `<td data-field="${field}" class="${it.unsure.includes(field) ? 'unsure' : ''}">${html}</td>`;
    const no = esc(it.no);
    return `<tr data-i="${i}" class="k-${esc(it.kind)}">
      <td class="c"><input type="checkbox" data-pick aria-label="${no}번 줄 선택"></td>
      ${cell('no', `<input value="${no}" aria-label="${no}번 번호" placeholder="7">`)}
      ${cell('kind', `<select aria-label="${no}번 유형">${options(KINDS, it.kind)}</select>`)}
      ${cell('points', `<input type="number" step="0.1" min="0" value="${esc(it.points)}" aria-label="${no}번 배점">`)}
      ${cell('unit', `<input list="unit-list" value="${esc(it.unit ?? '')}" aria-label="${no}번 단원" placeholder="5과">`)}
      ${cell('area', `<select aria-label="${no}번 영역">${options(areasNow(), it.area)}</select>`)}
      ${cell('subtype', `<input list="${stId(areasNow().indexOf(it.area))}" value="${esc(it.subtype)}" aria-label="${no}번 세부유형" placeholder="고르거나 적기">`)}
      ${cell('difficulty', `<select aria-label="${no}번 난이도">${options(DIFF5, it.difficulty)}</select>`)}
      ${cell('source', `<select aria-label="${no}번 출처"><option value=""${it.source ? '' : ' selected'}>— 모름</option>${options(sourcesNow(), it.source)}</select>`)}
      ${cell('answer', `<input value="${esc(it.answer)}" aria-label="${no}번 정답">`)}
      ${cell('note', `<input value="${esc(it.note ?? '')}" aria-label="${no}번 한 줄 설명" placeholder="무엇을 물었고 왜 갈렸나">`)}
      <td class="c"><input type="checkbox" data-key${it.key ? ' checked' : ''} aria-label="${no}번 대표 문항"></td>
      <td class="reason">${esc(it.reason)}</td>
      <td><button type="button" class="ghost" data-del aria-label="${no}번 삭제">삭제</button></td>
    </tr>`;
  }).join('');
  // 일괄 지정을 누른 뒤에는 고른 줄을 그대로 둔다 — 같은 줄에 난이도도 이어서 넣게
  if (keepPicked) {
    const 그대로 = new Set(keepPicked);
    $$('#items tbody [data-pick]').forEach((c, i) => { c.checked = 그대로.has(i); });
  }
  마지막선택 = -1; // 줄이 지워지거나 늘어났으니 Shift 범위의 기준을 버린다
  drawSubtypeLists();
  fillBulkPickers();
  drawBulk();
  drawUnitList();
  updateTotal();
}

// 지금 문항표가 어떤 시험인지 한 줄로 — 배점 합, 유형별, 난이도 분포.
// 다 적고 나서 세어 보는 것이 아니라 적는 동안 보이게 둔다.
function drawTally() {
  const s = examStats(state.items);
  if (!s.count) return ($('#tally').innerHTML = '');
  const 칩 = (label, value, cls = '') => `<span class="${cls}"><b>${esc(value)}</b>${esc(label)}</span>`;
  const 유형 = s.byKind.filter((r) => r.count).map((r) => 칩(r.label, `${r.count}문항 ${r.points}점`)).join('');
  const 막대 = s.byDifficulty.filter((r) => r.count).map((r) =>
    `<i class="d-${esc(r.label)}" style="--w:${r.pct}%" title="${esc(r.label)} ${r.count}문항"><b>${esc(r.label)} ${r.count}</b></i>`).join('');
  $('#tally').innerHTML = `
    <div class="tally-row">
      ${칩('문항', s.count)}
      ${칩('배점 합', `${s.total}점`, s.total === 100 ? 'ok' : 'warn')}
      ${유형}
      ${칩('체감 난이도', `${s.overallLabel} ${s.overallScore}/5`)}
    </div>
    <div class="tally-bar">${막대}</div>`;
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
  $('#confirm-total').textContent = notes.length ? notes.join(' · ') : `${count}문항 · 배점 합계 ${total}점 — 다 채우셨습니다`;
  $('#confirm-total').classList.toggle('warn', notes.length > 0);
  drawTally();
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
  if (field === 'area') { // 영역이 바뀌면 그 줄이 가리키는 세부유형 목록도 바뀐다
    const 칸 = td.parentElement.querySelector('[data-field=subtype] input');
    if (칸) 칸.setAttribute('list', stId(areasNow().indexOf(it.area)));
  }
  if (field === 'points' || field === 'no') updateTotal();
});

$('#items').addEventListener('change', (e) => {
  if (e.target.matches('[data-pick]')) return drawBulk(); // 줄을 고르면 일괄 지정 바가 뜬다
  if (!e.target.matches('[data-key]')) return;
  state.items[Number(e.target.closest('tr').dataset.i)].key = e.target.checked;
});

// 줄 하나를 누르고 Shift 를 누른 채 다른 줄을 누르면 그 사이가 다 골라진다 — 서답형 여섯 줄을 한 번에
let 마지막선택 = -1;
$('#items').addEventListener('click', (e) => {
  const box = e.target.closest('[data-pick]');
  if (!box) return;
  const i = Number(box.closest('tr').dataset.i);
  if (e.shiftKey && 마지막선택 >= 0) {
    const [a, b] = [Math.min(마지막선택, i), Math.max(마지막선택, i)];
    $$('#items tbody [data-pick]').forEach((c, n) => { if (n >= a && n <= b) c.checked = box.checked; });
    drawBulk();
  }
  마지막선택 = i;
});

$('#items').addEventListener('click', (e) => {
  const tr = e.target.closest('[data-del]')?.closest('tr');
  if (!tr) return;
  state.items.splice(Number(tr.dataset.i), 1);
  renderItems();
});

// 빈 문항 한 줄. 원장님이 직접 적는 길에서도, 줄 추가에서도 이것 하나를 쓴다.
const blankItem = (no, kind = '객관식') => ({
  no, key: false, kind, points: 0, unit: '', area: areasNow()[0],
  subtype: '', difficulty: '중', source: '', answer: '', note: '', reason: '', unsure: [],
});

// 숫자 번호 중 가장 큰 것 다음. 글자 번호(논술형2-1)는 세지 않는다
const nextNo = () => String(Math.max(0, ...state.items.map((it) => (noNum(it.no) === Infinity ? 0 : noNum(it.no)))) + 1);

const addRows = (n) => {
  for (let i = 0; i < n; i += 1) state.items.push(blankItem(nextNo()));
  renderItems();
};

$('#add-item').addEventListener('click', () => addRows(1));
$('#add-many').addEventListener('click', () => addRows(Math.min(40, Math.max(1, Number($('#add-n').value) || 1))));

// 번호 다시 매기기 — 선택형은 1부터, 서답형(단답형·서술형)은 "서답형 1" 부터.
// 가운데 줄을 지우고 나면 번호가 비는데, 그때 한 번 누르면 정리된다.
$('#renumber').addEventListener('click', () => {
  let 선택 = 0;
  let 서답 = 0;
  state.items.forEach((it) => {
    it.no = it.kind === '객관식' ? String(++선택) : `서답형 ${++서답}`;
  });
  renderItems();
});

// ---------- 2-1. 고른 줄에 한 번에 넣기 ----------
const picked = () => $$('#items tbody [data-pick]:checked').map((c) => Number(c.closest('tr').dataset.i));

function drawBulk() {
  const n = picked().length;
  $('#bulk').hidden = !n;
  $('#bulk .bulk-n').textContent = `${n}줄 선택`;
  const all = $$('#items tbody [data-pick]');
  $('#pick-all').checked = !!all.length && n === all.length;
  $('#pick-all').indeterminate = n > 0 && n < all.length;
}

// 일괄 지정 바의 고르는 칸들. 영역은 과목을 바꾸면 따라 바뀐다.
function fillBulkPickers() {
  const 비움 = '<option value="">— 그대로</option>';
  $('[data-bulk=kind]').innerHTML = 비움 + options(KINDS, null);
  $('[data-bulk=difficulty]').innerHTML = 비움 + options(DIFF5, null);
  $('[data-bulk=area]').innerHTML = 비움 + options(areasNow(), null);
  $('[data-bulk=source]').innerHTML = 비움 + options(sourcesNow(), null);
}

$('#bulk-apply').addEventListener('click', () => {
  const 줄 = picked();
  if (!줄.length) return;
  for (const el of $$('#bulk [data-bulk]')) {
    const value = el.value.trim();
    if (!value) continue;
    const field = el.dataset.bulk;
    줄.forEach((i) => {
      state.items[i][field] = field === 'points' ? Number(value) : value;
      state.items[i].unsure = state.items[i].unsure.filter((name) => name !== field);
    });
  }
  renderItems(줄);
});

$('#bulk-copy').addEventListener('click', () => {
  const 줄 = picked();
  if (!줄.length) return;
  // 뒤에서부터 넣어야 앞 줄의 자리가 밀리지 않는다
  [...줄].reverse().forEach((i) => state.items.splice(i + 1, 0, { ...state.items[i], key: false, unsure: [] }));
  renderItems();
});

$('#bulk-del').addEventListener('click', () => {
  const 줄 = new Set(picked());
  if (!줄.size) return;
  state.items = state.items.filter((_, i) => !줄.has(i));
  renderItems();
});

$('#pick-all').addEventListener('change', (e) => {
  $$('#items tbody [data-pick]').forEach((c) => { c.checked = e.target.checked; });
  drawBulk();
});

// ---------- 기출 적중 (선택) ----------
// 올리는 사진은 학원 교재 사진이다 (2026-10-02 원장 확인). 시험지 사진이 아니다.
// 사진은 이 브라우저 안에만 둔다 — 서버로 보내지 않는다.
const 교재사진 = [];

$('#hit-on').addEventListener('change', (e) => {
  $('#hit-fields').hidden = !e.target.checked;
});

$('#hit-photos').addEventListener('change', async (e) => {
  const 고른것 = [...e.target.files];
  e.target.value = ''; // 같은 파일을 다시 골라도 change 가 또 오게
  if (!고른것.length) return;
  const 남은자리 = 4 - 교재사진.length;
  if (남은자리 <= 0) return setStatus('#hit-status', '사진은 넉 장까지입니다. 지우고 다시 올려 주세요', true);
  try {
    for (const f of 고른것.slice(0, 남은자리)) 교재사진.push(await shrink(f, 1000));
    const 넘침 = 고른것.length - 남은자리;
    setStatus('#hit-status', 넘침 > 0
      ? `${남은자리}장만 넣었습니다. 사진은 넉 장까지입니다`
      : `${교재사진.length}장 올렸습니다`, 넘침 > 0);
  } catch (err) {
    setStatus('#hit-status', `사진을 읽지 못했습니다 (${err.message})`, true);
  }
  drawShots();
});

function drawShots() {
  $('#hit-shots').innerHTML = 교재사진.map((src, i) => `<figure>
    <img src="${esc(src)}" alt="">
    <button type="button" data-shot="${i}" aria-label="${i + 1}번째 사진 빼기">빼기</button>
  </figure>`).join('');
}

$('#hit-shots').addEventListener('click', (e) => {
  const i = e.target.dataset.shot;
  if (i === undefined) return;
  교재사진.splice(Number(i), 1);
  drawShots();
  setStatus('#hit-status', 교재사진.length ? `${교재사진.length}장 남았습니다` : '');
});

// ---------- 4. 분석 자료 만들기 ----------
// 학교 시험지 분석이므로 학생별 리포트는 만들지 않는다 (2026-10-02 원장 결정 — "step3는 없애줘").
$('#make-report').addEventListener('click', async (e) => {
  const itemIssue = itemProblem();
  if (itemIssue) return setStatus('#report-status', `${itemIssue} — 문항표에서 번호를 고쳐 주세요`, true);
  if (!state.meta.school || !state.meta.grade) return setStatus('#report-status', '문항표 위 시험 정보에 학교와 학년을 적어 주세요', true);
  if (!state.academy) {
    academyForm.closest('details').open = true;
    return setStatus('#report-status', '리포트에 들어갈 학원 정보를 한 번 저장해 주세요 (STEP 01 아래)', true);
  }
  const button = e.currentTarget;
  button.disabled = true;
  const items = [...state.items].sort(byNoOrder).map(({ unsure, ...it }) => it);
  try {
    const ctx = { academy: state.academy, meta: state.meta, items, stats: examStats(items) };
    // 기출 적중은 켜셨을 때만. 맞힌 수는 hitInput 이 전체 문항 안으로 깎는다.
    state.적중 = hitInput({
      켬: $('#hit-on').checked, 맞힌: $('#hit-n').value, 자료: $('#hit-src').value, 사진: 교재사진,
    }, items.length);
    // 분석지 글은 문항표에서 짓는다 — 문항마다 적어 두신 한 줄과 숫자가 재료다.
    // AI 는 원장님이 켜실 때만 부르고, 실패해도 지어 둔 글로 그대로 낸다.
    let 말 = '';
    let school = draftSchool(ctx);
    if ($('#use-ai').checked) {
      setStatus('#report-status', 'AI 가 글을 다듬는 중입니다. 1~3분 걸립니다…');
      try {
        school = await api('/api/report', { mode: 'school', meta: state.meta, items });
      } catch (err) {
        말 = `AI 글은 받지 못했습니다 (${err.message}) — 문항표로 지은 글로 만들었습니다`;
      }
    }
    $('#pages').style.setProperty('--brand', state.academy.color);
    // 학교 분석은 발표 슬라이드 한 벌이 기본이다 (원장님 결정 2026-10-01 — 여러 형태를 한꺼번에 쏟지 않는다).
    // A4 종이와 정사각 카드는 원장님이 켜실 때만 뒤에 붙는다.
    $('#pages').innerHTML = slideDeck(ctx, school)
      + (state.academy.cards ? cardDeck(ctx, school, { 적중: state.적중 }) : '')
      + (state.academy.a4 ? schoolPage(ctx, school) : '')
      + explainPages(ctx); // 학원용 문항 해설은 맨 뒤에 (학부모 종이와 섞이지 않게)
    // 버튼은 이번에 실제로 나온 것만 보여 준다 — 눌러도 아무 일 없는 버튼을 두지 않는다
    const 카드 = document.querySelectorAll('#pages .sheet.card-news').length;
    $('#save-cards').hidden = !카드;
    $('#save-cards').textContent = `카드 ${카드}장 한 번에 받기`;
    $('#print-slides').textContent = `슬라이드 ${document.querySelectorAll('#pages .sheet.slide').length}장 PDF 저장 (가로)`;
    setStatus('#report-status', 말, !!말);
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

// 직접 적는 길의 과목·학년은 비워 둘 수 없다 — 영역 목록과 교육과정이 여기서 갈린다.
const startPick = $('#start-form').elements;
startPick.subject.innerHTML = options(Object.keys(SUBJECTS), '영어');
startPick.grade.innerHTML = options(GRADES, '중2');

// ---------- 왼쪽 차림표 ----------
// 아직 안 열린 단계는 눌러도 갈 데가 없으니 흐리게 두고, 보고 있는 단계에 표시를 옮긴다.
const 오늘 = new Date();
$('#today').textContent = `${오늘.getFullYear()}. ${String(오늘.getMonth() + 1).padStart(2, '0')}. ${String(오늘.getDate()).padStart(2, '0')}`;
$('#today-dow').textContent = `${'일월화수목금토'[오늘.getDay()]}요일`;

function drawNav() {
  const 보임 = $$('[data-nav]').filter((a) => !$(`#${a.dataset.nav}`).hidden);
  $$('[data-nav]').forEach((a) => a.setAttribute('aria-disabled', String($(`#${a.dataset.nav}`).hidden)));
  // 화면 위쪽(1/3 지점)을 지난 것 중 마지막 것이 지금 보고 있는 단계다
  const 기준 = window.innerHeight / 3;
  const 지금 = 보임.filter((a) => $(`#${a.dataset.nav}`).getBoundingClientRect().top <= 기준).at(-1) || 보임[0];
  $$('[data-nav]').forEach((a) => a.setAttribute('aria-current', String(a === 지금)));
}
addEventListener('scroll', drawNav, { passive: true });
addEventListener('resize', drawNav);
new MutationObserver(drawNav).observe(document.querySelector('.app'), { attributes: true, attributeFilter: ['hidden'], subtree: true });
drawNav();
