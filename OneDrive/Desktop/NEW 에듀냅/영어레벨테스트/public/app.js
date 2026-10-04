// 첫 화면: 학생 정보로 시험을 시작한다. 학원 정보는 리딩브레인으로 고정 (core/academy.js).
import { GRADES } from './core/scale.js';
import { checkName } from './core/student.js';
import { nextSet } from './core/forms.js';
import { ACADEMY } from './core/academy.js';

const $ = (s) => document.querySelector(s);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const status = (sel, text, kind = '') => { const el = $(sel); el.textContent = text; el.className = `status ${kind}`; };
const today = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD, 이 기기 시간

const sf = $('#student-form');
sf.grade.innerHTML = GRADES.map((g) => `<option${g === '중2' ? ' selected' : ''}>${g}</option>`).join('');
if (load('elt:session', null)) $('#resume').hidden = false;

sf.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = sf.name.value.trim();
  const problem = checkName(name);
  if (problem) return status('#student-status', problem, 'error');
  const date = today();
  const set = nextSet(load('elt:lastSet', null));
  const session = { id: `${name}:${date}:${Date.now().toString(36)}`, name, school: sf.school.value.trim(), grade: sf.grade.value, date, start: date, academy: ACADEMY, set, stage: 'test', t: { i: 0, log: [], started: false, order: 'area' }, shownAt: null, current: null, plays: 0 };
  if (!save('elt:session', session)) return status('#student-status', '이 브라우저에 저장할 수 없습니다 (사생활 보호 모드인지 확인해 주세요)', 'error');
  save('elt:lastSet', set);
  location.href = 'test.html';
});
