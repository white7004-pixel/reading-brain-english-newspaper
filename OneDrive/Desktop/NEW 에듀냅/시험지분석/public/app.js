import { SUBJECTS, DIFF5, KINDS, examStats, studentStats, parseStudents, esc } from './lib.js';
import { schoolPage, studentPage } from './report.js';

export const $ = (sel) => document.querySelector(sel);
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

const MAX_BODY_CHARS = 4_000_000; // Vercel 요청 4.5MB 제한 안쪽

async function encodeAll(files) {
  for (const edge of [1800, 1400, 1100]) {
    const out = await Promise.all(files.map((f) => shrink(f, edge).then((url) => url.split(',')[1])));
    if (out.reduce((s, d) => s + d.length, 0) < MAX_BODY_CHARS) return out;
  }
  throw new Error('사진 용량이 너무 큽니다. 장수를 줄여 주세요');
}

// ---------- 학원 정보 (시험판만. 에듀냅 안에서는 로그인한 학원 정보가 들어온다) ----------
const academyForm = $('#academy-form');
const showAcademy = () => { $('#academy-now').textContent = state.academy ? `· ${state.academy.name}` : '· 아직 없음'; };

$('#academy-form').elements.logo.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = await shrink(file, 400, 'image/png');
  $('#logo-preview').src = url;
  $('#logo-preview').hidden = false;
});

academyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = academyForm.elements;
  state.academy = { name: f.academyName.value.trim(), phone: f.phone.value.trim(), color: f.color.value, logo: $('#logo-preview').hidden ? '' : $('#logo-preview').src };
  store.set('academy', state.academy);
  showAcademy();
  academyForm.closest('details').open = false;
});

// ---------- 1. 사진 올리기 ----------
$('#upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target.elements;
  const button = e.submitter;
  const pages = [...f.pages.files];
  const answers = [...f.answers.files];
  if (pages.length > 6 || answers.length > 2) return setStatus('#upload-status', '시험지는 6장, 정답지는 2장까지 올릴 수 있습니다', true);
  button.disabled = true;
  try {
    setStatus('#upload-status', '사진을 줄이는 중…');
    const encoded = await encodeAll([...pages, ...answers]);
    setStatus('#upload-status', 'AI가 문항을 읽고 있습니다. 1~3분 걸립니다…');
    const result = await api('/api/extract', { pages: encoded.slice(0, pages.length), answers: encoded.slice(pages.length) });
    state.meta = result.meta;
    state.items = result.items;
    $('#confirm-notes').textContent = result.notes;
    renderMeta();
    renderItems();
    setStatus('#upload-status', '');
    show('#step-confirm');
    $('#step-students').hidden = false;
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
  for (const k of ['school', 'grade', 'term', 'exam']) {
    f[k].value = state.meta[k];
    f[k].classList.toggle('unsure', !state.meta[k] && (k === 'school' || k === 'grade'));
  }
}

$('#meta-form').addEventListener('input', (e) => {
  const { name, value } = e.target;
  state.meta[name] = value.trim();
  e.target.classList.remove('unsure');
  if (name !== 'subject') return;
  // 과목을 바꾸면 그 과목에 없는 영역은 첫 영역으로 두고 다시 확인하게 한다
  state.items.forEach((it) => {
    if (!areasNow().includes(it.area)) { it.area = areasNow()[0]; it.unsure = [...new Set([...it.unsure, 'area'])]; }
  });
  renderItems();
});

function renderItems() {
  $('#items tbody').innerHTML = state.items.map((it, i) => {
    const cell = (field, html) => `<td data-field="${field}" class="${it.unsure.includes(field) ? 'unsure' : ''}">${html}</td>`;
    const no = esc(it.no);
    return `<tr data-i="${i}">
      ${cell('no', `<input type="number" min="1" step="1" value="${no}" aria-label="${no}번 번호">`)}
      ${cell('kind', `<select aria-label="${no}번 유형">${options(KINDS, it.kind)}</select>`)}
      ${cell('points', `<input type="number" step="0.1" min="0" value="${esc(it.points)}" aria-label="${no}번 배점">`)}
      ${cell('area', `<select aria-label="${no}번 영역">${options(areasNow(), it.area)}</select>`)}
      ${cell('subtype', `<input value="${esc(it.subtype)}" aria-label="${no}번 세부유형">`)}
      ${cell('difficulty', `<select aria-label="${no}번 난이도">${options(DIFF5, it.difficulty)}</select>`)}
      ${cell('answer', `<input value="${esc(it.answer)}" aria-label="${no}번 정답">`)}
      <td class="reason">${esc(it.reason)}</td>
      <td><button type="button" class="ghost" data-del aria-label="${no}번 삭제">삭제</button></td>
    </tr>`;
  }).join('');
  updateTotal();
}

// 번호가 비었거나 겹치면 리포트 숫자가 틀어진다 → 고칠 때까지 만들지 않는다
function itemProblem() {
  if (state.items.some((it) => !Number.isInteger(it.no) || it.no < 1)) return '번호가 비어 있는 문항이 있습니다';
  const nos = state.items.map((it) => it.no);
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
  it[field] = field === 'points' || field === 'no' ? Number(e.target.value) : e.target.value;
  it.unsure = it.unsure.filter((name) => name !== field);
  td.classList.remove('unsure');
  if (field === 'points' || field === 'no') updateTotal();
});

$('#items').addEventListener('click', (e) => {
  const tr = e.target.closest('[data-del]')?.closest('tr');
  if (!tr) return;
  state.items.splice(Number(tr.dataset.i), 1);
  renderItems();
});

$('#add-item').addEventListener('click', () => {
  const no = Math.max(0, ...state.items.map((it) => Number(it.no) || 0)) + 1;
  state.items.push({ no, kind: '객관식', points: 0, area: areasNow()[0], subtype: '', difficulty: '중', answer: '', reason: '원장님 추가', unsure: [] });
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
  const items = [...state.items].sort((a, b) => a.no - b.no).map(({ unsure, ...it }) => it);
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
    $('#pages').innerHTML = schoolPage(ctx, school)
      + students.map((s, i) => studentPage(ctx, s, studentStats(items, s.wrong), written[i])).join('');
    setStatus('#report-status', '');
    show('#step-result');
    fitAll();
    document.fonts.ready.then(fitAll); // 제목 웹폰트가 늦게 들어오면 높이가 바뀐다
  } catch (err) {
    setStatus('#report-status', `${err.message} — 버튼을 다시 누르면 다시 시도합니다`, true);
  } finally {
    button.disabled = false;
  }
});

// ---------- A4 한 장 맞추기 ----------
// 넘치면 글자 배율(--fit)을 조금씩 줄인다. 고친 글이 짧아지면 다시 커지도록 매번 1 부터 계산한다.
// 인쇄 반올림 여유 2px: 잴 때만 종이를 2px 짧게 두고 맞춘다 (scrollHeight 는 clientHeight 보다 작아지지 않으므로 빼기로는 못 잰다)
function fitPage(page) {
  const overflows = () => page.scrollHeight > page.clientHeight;
  page.style.height = 'calc(297mm - 2px)';
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

$('#print').addEventListener('click', () => window.print());

// ---------- 시작 ----------
const saved = store.get('academy');
if (saved) {
  state.academy = saved;
  const f = academyForm.elements;
  f.academyName.value = saved.name;
  f.phone.value = saved.phone;
  f.color.value = saved.color;
  if (saved.logo) { $('#logo-preview').src = saved.logo; $('#logo-preview').hidden = false; }
}
showAcademy();
