// 문항 한 개 그리기와 문항별 시계. 시험 화면(test.js)이 1차·2차 적응형·쓰기 블록에 모두 쓴다.
import { marked, SECONDS } from './core/forms.js';

const $ = (s) => document.querySelector(s);
let tick = null;
const PICK_MS = 180; // 고른 줄이 칠해진 것을 잠깐 보여 준 뒤 넘어간다
const en = (s) => !/[ㄱ-ㅎ가-힣]/.test(s); // 한글이 없으면 영어 글꼴(Literata)

function text(it) {
  $('#passage').hidden = !it.passage;
  $('#passage').innerHTML = marked(it.passage);
  $('#question').innerHTML = marked(it.question);
  $('#question').classList.toggle('en', en(it.question));
}

// 왼쪽 칸(지문·듣기·우리말 뜻)에 넣을 것이 있으면 두 쪽, 없으면 한 쪽. 아래 띠 안내도 여기서.
function layout(write) {
  const listen = !$('#listen').hidden;
  const passage = !$('#passage').hidden;
  const hint = !$('#hint').hidden;
  $('#item').classList.toggle('one', !(listen || passage || hint));
  $('#pane-label').textContent = listen ? '대화나 담화를 들으세요. 대본은 나오지 않습니다.' : passage ? '다음 글을 읽고 물음에 답하시오.' : hint ? '우리말 뜻' : '';
  $('#foot-note').textContent = listen ? '이어폰으로 들어 주세요' : write ? '대문자·마침표는 따지지 않습니다' : '한 번 고르면 다음 문항으로 넘어갑니다';
}

function button(html, onclick, cls = '') {
  const b = document.createElement('button');
  b.type = 'button';
  b.innerHTML = html;
  if (cls) b.className = cls;
  b.onclick = onclick;
  return b;
}

// 객관식: ①~④ 와 ⑤ 모름. done({ choice }) 또는 done({ dontKnow: true })
export function showMC(it, done) {
  $('#write').hidden = true;
  $('#hint').hidden = true;
  $('#choices').hidden = false;
  text(it);
  layout(false);
  const shownAt = performance.now();
  const pickOne = (res, b) => {
    if (performance.now() - shownAt < 300 || b.disabled) return;
    for (const x of $('#choices').children) x.disabled = true;
    b.classList.add('pick');
    clearInterval(tick); // 칠한 채 기다리는 동안 시간이 다 되어 모름으로 넘어가지 않게
    setTimeout(() => done(res), PICK_MS);
  };
  const row = (mark, html, res, cls) => { const b = button(`<i aria-hidden="true">${mark}</i><span>${html}</span>`, () => pickOne(res, b), cls); return b; };
  $('#choices').replaceChildren(
    ...it.choices.map((c, i) => row(i + 1, marked(c), { choice: i }, en(c) ? 'en' : '')),
    row('?', '모름 — 모르면 짐작하지 말고 이것을 고르세요', { dontKnow: true }, 'dont-know'),
  );
}

// 쓰기: template 의 {} 마다 입력칸. Enter 는 다음 칸, 마지막 칸에서 Enter 는 제출. done({ entries })
export function showWrite(it, done) {
  $('#choices').hidden = true;
  $('#write').hidden = false;
  text({ ...it, passage: '' });
  $('#hint').hidden = !it.hint_ko;
  $('#hint').textContent = it.hint_ko || '';
  layout(true);
  const parts = String(it.template).split('{}');
  const line = $('#write-line');
  const inputs = [];
  const width = Math.max(6, Math.max(...it.answers.flat().map((a) => a.length)) + 2); // 칸마다 길이가 달라 답을 알려 주지 않게 모두 같은 너비
  line.replaceChildren();
  parts.forEach((part, i) => {
    if (part) line.append(document.createTextNode(part));
    if (i === parts.length - 1) return;
    const inp = document.createElement('input');
    inp.style.width = `${width}ch`;
    inp.spellcheck = false;
    inp.setAttribute('autocorrect', 'off');
    inp.setAttribute('autocapitalize', 'off');
    inp.setAttribute('aria-label', `${i + 1}번째 칸`);
    inp.onkeydown = (e) => { if (e.key === 'Enter' && i < parts.length - 2) { e.preventDefault(); inputs[i + 1].focus(); } };
    inputs.push(inp);
    line.append(inp);
  });
  const submit = $('#write button');
  submit.disabled = false;
  $('#write').onsubmit = (e) => { e.preventDefault(); submit.disabled = true; done({ entries: inputs.map((x) => x.value) }); };
  inputs[0]?.focus();
}

// startedAt(ms) 부터 SECONDS 초. 다 되면 onTimeout 한 번.
export function startTimer(startedAt, onTimeout) {
  stopTimer();
  const el = $('#timer');
  el.hidden = false;
  $('#timer-ring').setAttribute('pathLength', SECONDS); // 고리 둘레를 SECONDS 로 두고 남은 초만큼 칠한다
  const draw = () => {
    const left = Math.max(0, SECONDS - Math.floor((Date.now() - startedAt) / 1000));
    $('#timer-sec').textContent = `${left}초`;
    $('#timer-ring').style.strokeDasharray = `${left} ${SECONDS}`;
    el.classList.toggle('low', left <= 10);
    if (!left) { stopTimer(); onTimeout(); }
  };
  tick = setInterval(draw, 250);
  draw();
}

export function stopTimer() {
  clearInterval(tick);
  tick = null;
  $('#timer').hidden = true;
}
