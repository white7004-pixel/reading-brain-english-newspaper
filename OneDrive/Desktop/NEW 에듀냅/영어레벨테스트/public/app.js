// 첫 화면: 학생 정보로 시험을 시작하고, 학원 정보를 이 브라우저에 기억한다 (에듀냅에서는 로그인 정보를 쓴다).
import { GRADES } from './core/scale.js';
import { checkName, parseBooks } from './core/student.js';
import { nextSet } from './core/forms.js';

const $ = (s) => document.querySelector(s);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const status = (sel, text, kind = '') => { const el = $(sel); el.textContent = text; el.className = `status ${kind}`; };
const today = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD, 이 기기 시간

const a = load('elt:academy', {});
const sf = $('#student-form');
sf.grade.innerHTML = GRADES.map((g) => `<option${g === '중2' ? ' selected' : ''}>${g}</option>`).join('');
sf.start.value = today();
if (load('elt:session', null)) $('#resume').hidden = false;

sf.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = sf.name.value.trim();
  const problem = checkName(name);
  if (problem) return status('#student-status', problem, 'error');
  const academy = load('elt:academy', {});
  const date = today();
  const set = nextSet(load('elt:lastSet', null));
  const session = { id: `${name}:${date}:${Date.now().toString(36)}`, name, grade: sf.grade.value, date, start: sf.start.value || date, academy, set, stage: 1, s1: { i: 0, log: [], started: false }, w2: { i: 0, log: [], started: false }, shownAt: null, sectionIdx: 0, states: {}, used: [], current: null, plays: 0 };
  if (!save('elt:session', session)) return status('#student-status', '이 브라우저에 저장할 수 없습니다 (사생활 보호 모드인지 확인해 주세요)', 'error');
  save('elt:lastSet', set);
  location.href = 'test.html';
});

const af = $('#academy-form');
for (const k of ['name', 'phone', 'color']) if (a[k]) af[k].value = a[k];
af.books.value = a.booksText || '';
$('#academy-now').textContent = a.name ? `· ${a.name}` : '· 아직 없음';

af.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { books, problems } = parseBooks(af.books.value);
  if (problems.length) return status('#academy-status', problems.join('\n'), 'error');
  const file = af.logo.files[0];
  let logo = a.logo;
  try { if (file) logo = await readImage(file); } catch { return status('#academy-status', '로고 그림을 읽지 못했습니다', 'error'); }
  const next = { name: af.name.value.trim(), phone: af.phone.value.trim(), color: af.color.value, books, booksText: af.books.value, logo };
  if (!save('elt:academy', next)) return status('#academy-status', '저장하지 못했습니다 (로고가 너무 크면 작은 그림으로 바꿔 주세요)', 'error');
  Object.assign(a, next);
  $('#academy-now').textContent = `· ${next.name}`;
  status('#academy-status', '저장했습니다');
});

// 로고는 긴 변 400px PNG 로 줄여 저장한다 (localStorage 용량)
function readImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, 400 / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
