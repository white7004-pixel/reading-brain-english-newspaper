// 문항 한 개 그리기와 문항별 시계. 시험 화면(test.js)이 1차·2차 적응형·쓰기 블록에 모두 쓴다.
import { marked, SECONDS } from './core/forms.js';

const $ = (s) => document.querySelector(s);
let tick = null;

function text(it) {
  $('#passage').hidden = !it.passage;
  $('#passage').innerHTML = marked(it.passage);
  $('#question').innerHTML = marked(it.question);
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
  const shownAt = performance.now();
  const pickOne = (res) => { if (performance.now() - shownAt < 300) return; for (const b of $('#choices').children) b.disabled = true; done(res); };
  $('#choices').replaceChildren(
    ...it.choices.map((c, i) => button(`${'①②③④'[i]} ${marked(c)}`, () => pickOne({ choice: i }))),
    button('⑤ 모름', () => pickOne({ dontKnow: true }), 'dont-know'),
  );
}

// 쓰기: template 의 {} 마다 입력칸. Enter 는 다음 칸, 마지막 칸에서 Enter 는 제출. done({ entries })
export function showWrite(it, done) {
  $('#choices').hidden = true;
  $('#write').hidden = false;
  text({ ...it, passage: '' });
  $('#hint').hidden = !it.hint_ko;
  $('#hint').textContent = it.hint_ko || '';
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
  const draw = () => {
    const left = Math.max(0, SECONDS - Math.floor((Date.now() - startedAt) / 1000));
    el.textContent = `남은 시간 ${left}초`;
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
