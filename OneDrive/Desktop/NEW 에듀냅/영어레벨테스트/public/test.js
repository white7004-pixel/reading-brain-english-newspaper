// 시험 화면: 한 시험(초5~고2~3, 50문항) — 영역별로 묶어 듣기 → 어휘 → 문법 → 독해 → 영작(원장 결정 10/2).
// 중간에 끝나지 않고 모든 문항을 푼다(원장 결정 10/4) → 결과리포트.
// 진행은 localStorage(elt:session)에 두어 새로고침해도 이어진다. 문항마다 제한 시간(secondsFor), 모름 칸은 없다(10/2).
import { stepData } from './core/scale.js';
import { usableTest, testReady, byArea, areaRail, secondsFor, levelStep, checkWrite, isWrite } from './core/forms.js';
import { showMC, showWrite, startTimer, stopTimer, picking } from './form-ui.js';

const $ = (s) => document.querySelector(s);
const WPM_AT_RATE_1 = 170; // [추정] 브라우저 음성 rate 1.0 의 분당 단어 수. 실제 기기에서 재서 맞춘다.
const MAX_PLAYS = 2;
const LISTEN_INTRO = '▶ 듣기를 눌러 대화나 담화를 듣고 답합니다. 문항마다 두 번까지 들을 수 있고, 첫 듣기가 끝나면 90초를 셉니다. 이어폰을 확인해 주세요.';

const load = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const status = (text, kind = '') => { $('#test-status').textContent = text; $('#test-status').className = `status ${kind}`; };
const keep = () => save('elt:session', session);
// 안내 단추는 뜬 뒤 400ms 동안 누름을 받지 않는다 (마지막 문항의 두 번 누름이 넘어오지 않게)
const armed = (fn) => { const t = performance.now(); return () => { if (performance.now() - t >= 400) fn(); }; };

const session = load('elt:session');
if (!session) {
  location.replace('index.html');
} else {
  $('#who').textContent = session.name;
  const set = session.set || 'A';
  const { list: all, sample } = await loadForms(set);
  const voices = await englishVoices();
  const list = byArea(voices ? all : all.filter((i) => i.area !== 'listening')); // 영어 음성이 없으면 듣기는 빼고 센다
  // 예전 세션(1차·2차, 단계 차례로 풀던 것)은 새 시험으로 시작한다
  if ((session.stage !== 'test' && session.stage !== 'end') || !session.t || session.t.order !== 'area') { session.stage = 'test'; session.t = { i: 0, log: [], started: false, order: 'area' }; session.shownAt = null; session.current = null; keep(); }
  route();

  function route() {
    stopTimer();
    $('#sample').hidden = !sample;
    return session.stage === 'end' ? finishTest() : run();
  }

  function show(id) {
    for (const s of ['#intro', '#item']) $(s).hidden = s !== id;
    $('#foot').hidden = id !== '#item';
    status('');
    window.scrollTo(0, 0);
  }

  function intro(title, text, go) {
    show('#intro');
    $('#intro-title').textContent = title;
    $('#intro-text').textContent = text;
    $('#intro-go').onclick = armed(go);
  }

  // ── 한 시험 ──
  function run() {
    if (!list.length) { show(''); return status('문제지가 없습니다. 문제지 검수에서 문항을 통과시켜 주세요.', 'error'); }
    const it = list[session.t.i];
    if (!it) { session.stage = 'end'; keep(); return route(); }
    top(`레벨테스트 ${set}`, areaRail(list, session.t.i), session.t.log.length + 1, list.length);
    if (!session.t.started) {
      const order = areaRail(list, 0).map((c) => c.label).join(' → ');
      const listen = list.some((i) => i.area === 'listening') ? ` ${LISTEN_INTRO}` : '';
      return intro('영어 레벨테스트', `${order} 차례로 풉니다. 영역마다 초5 수준부터 한 단계씩 어려워지고, 모든 문항을 끝까지 풉니다. 어휘는 20초, 문법은 60초, 그 밖은 90초 안에 답합니다.${listen}`, () => { session.t.started = true; keep(); route(); });
    }
    ask(it, (rec) => {
      session.t.log.push({ ...rec, kind: it.kind || '' });
      session.t.i += 1;
    });
  }

  // 문제지 문항 하나: 답하거나 시간이 다 되면 기록하고 다음으로
  // 제한 시간은 secondsFor(it, 2). 듣기 문항은 첫 듣기가 끝난 때부터 센다
  function ask(it, push) {
    const seconds = secondsFor(it, 2);
    show('#item');
    const listening = it.area === 'listening';
    $('#listen').hidden = !listening;
    if (listening && session.current !== it.id) { session.current = it.id; session.plays = 0; session.shownAt = null; keep(); }
    if (!listening && !session.shownAt) { session.shownAt = Date.now(); keep(); }
    let fired = false;
    const done = (res) => {
      if (fired) return;
      fired = true;
      stopTimer();
      window.speechSynthesis?.cancel();
      const correct = !res.timeout && (isWrite(it) ? checkWrite(it, res.entries) : res.choice === it.answer);
      push({ id: it.id, no: it.no, area: it.area, level: it.level, point: it.point || '', correct, timeout: !!res.timeout, ms: session.shownAt ? (res.at ?? Date.now()) - session.shownAt : 0, given: res.entries ?? res.choice ?? null });
      session.shownAt = null;
      session.current = null;
      keep();
      route();
    };
    if (isWrite(it)) showWrite(it, done);
    else showMC(it, done);
    if (listening) {
      $('#plays').textContent = playsText();
      $('#play').disabled = session.plays >= MAX_PLAYS;
      $('#play').onclick = () => play(it, done, seconds);
    }
    if (session.shownAt) startTimer(session.shownAt, () => done({ timeout: true }), seconds);
  }

  // 위 띠: 학년·세트와 영역 진행 막대(칸 너비는 문항 수 비례). n 이 있으면 큰 문항 번호와 아래 띠 "n / of"
  function top(label, rail, n, of) {
    $('#section-name').textContent = `${session.grade} · ${label}`;
    const now = (c) => `${c.label} ${Math.min(c.done + 1, c.total)}/${c.total}`;
    const cur = rail.find((c) => c.current);
    $('#dots').setAttribute('aria-label', cur ? `영역 진행: ${now(cur)}` : '영역 진행');
    $('#dots').replaceChildren(...rail.map((c) => {
      const d = document.createElement('div');
      d.className = c.current ? 'cur' : '';
      d.style.flexGrow = c.total || 1;
      const bar = document.createElement('i');
      const fill = document.createElement('b');
      fill.style.width = `${c.total ? (100 * c.done) / c.total : 0}%`;
      bar.append(fill);
      d.append(bar, c.current ? now(c) : c.label);
      return d;
    }));
    $('#qno').textContent = n ?? '';
    const b = document.createElement('b');
    b.textContent = n ?? '';
    $('#count').replaceChildren(b, ` / ${of ?? ''}`);
  }

  // 듣기 재생기: 큰 줄(#plays 에 넣을 글을 돌려준다)과 작은 줄(#listen-note). 듣는 중이면 파형이 움직인다
  function playsText(playing = false) {
    const left = MAX_PLAYS - session.plays;
    $('#listen').classList.toggle('playing', playing);
    $('#listen-note').textContent = session.shownAt ? `첫 듣기가 끝나 시간을 세고 있습니다 · 남은 듣기 ${left}번` : `남은 듣기 ${left}번 · 첫 듣기가 끝나면 90초를 셉니다`;
    if (playing) return '듣는 중…';
    if (!session.plays) return '▶ 을 눌러 들으세요';
    return left ? '한 번 더 들을 수 있습니다' : '듣기를 모두 썼습니다';
  }

  // 첫 재생이 끝나면 시간을 센다
  async function play(item, done, seconds) {
    if (session.plays >= MAX_PLAYS) return;
    session.plays += 1;
    keep();
    $('#play').disabled = true;
    $('#plays').textContent = playsText(true);
    const rate = Math.min(1.3, Math.max(0.6, stepData(item.step ?? levelStep(item.level)).gen.wpm / WPM_AT_RATE_1));
    await say(item.script ?? item.passage, rate, item.id);
    if (session.current !== item.id || picking()) return; // 듣는 사이에 답했다 (고른 줄을 칠해 둔 사이 포함)
    if (!session.shownAt) { session.shownAt = Date.now(); keep(); startTimer(session.shownAt, () => done({ timeout: true }), seconds); }
    $('#plays').textContent = playsText();
    $('#play').disabled = session.plays >= MAX_PLAYS;
  }

  // 대본 줄마다 "W: " 는 여자 목소리, "M: " 은 남자 목소리 (없으면 있는 목소리로)
  function say(script, rate, id) {
    const female = voices.find((v) => /female|samantha|zira|jenny|aria|susan|karen|moira/i.test(v.name)) || voices[0];
    const male = voices.find((v) => v !== female && /male|david|guy|daniel|mark|alex|fred/i.test(v.name)) || voices.find((v) => v !== female) || female;
    const lines = script.split('\n').map((l) => l.trim()).filter(Boolean);
    return lines.reduce((p, line) => p.then(() => new Promise((resolve) => {
      if (session.current !== id || picking()) return resolve(); // 답해서 다음 문항으로 넘어갔으면 남은 줄은 읽지 않는다
      const m = /^([WM]):\s*(.*)$/.exec(line);
      const u = new SpeechSynthesisUtterance(m ? m[2] : line);
      u.lang = 'en-US';
      u.rate = rate;
      u.voice = m?.[1] === 'M' ? male : female;
      u.onend = u.onerror = () => resolve();
      speechSynthesis.speak(u);
    })), Promise.resolve());
  }

  function finishTest() {
    const result = {
      id: session.id, name: session.name, school: session.school || '', grade: session.grade, date: session.date, start: session.start || session.date, academy: { ...session.academy, logo: undefined },
      test: { set, log: session.t.log, stopped: null, stops: {}, order: 'area' },
      sections: {}, // 결과리포트가 test.log 로 채운다
    };
    if (!save(`elt:result:${result.id}`, result)) return status('결과를 이 브라우저에 저장하지 못했습니다. 저장 공간을 비운 뒤 이 화면을 새로고침해 주세요.', 'error');
    localStorage.removeItem('elt:session');
    location.replace(`report.html?id=${encodeURIComponent(result.id)}`);
  }
}

// 문제지: 고른 세트의 한 시험 통과 문항이 7단계 모두 6개 이상이면 forms.json, 아니면 연습 문항(샘플)
async function loadForms(set) {
  for (const [file, sample] of [['data/forms.json', false], ['data/forms.sample.json', true]]) {
    try {
      const r = await fetch(file, { cache: 'no-store' });
      if (!r.ok) continue;
      const d = await r.json();
      const list = usableTest(d?.test?.[set] ?? (sample ? d?.test?.A : null));
      if (sample ? list.length : testReady(list)) return { list, sample };
    } catch { /* 다음 파일 */ }
  }
  return { list: [], sample: false };
}

// 영어 목소리 목록. 늦게 오는 브라우저가 있어 잠깐 기다린다. speechSynthesis 가 없는 기기(일부 웹뷰)도 있다.
async function englishVoices() {
  if (!('speechSynthesis' in window)) return null;
  const en = () => speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  if (!en().length) await new Promise((r) => { speechSynthesis.addEventListener('voiceschanged', r, { once: true }); setTimeout(r, 1500); });
  return en().length ? en() : null;
}
