// 시험 화면 (설계서 2026-09-30): 1차 문제지 → 80점 이상이면 2차 적응형 4영역 → 2차 쓰기 블록 → 결과.
// 진행은 localStorage(elt:session)에 두어 새로고침해도 이어진다. 문항마다 90초, 객관식에는 모름.
import { SECTIONS, SECTION_KO, startStep, stepData } from './core/scale.js';
import { start, nextQuery, answer, skip, stop, LIMITS, adaptiveRail } from './core/engine.js';
import { usable, pick, readiness } from './core/bank.js';
import { usableForm, checkWrite, isWrite, stage1Score, levelStep, railFor, MIN_STAGE1, PASS } from './core/forms.js';
import { showMC, showWrite, startTimer, stopTimer, picking } from './form-ui.js';

const $ = (s) => document.querySelector(s);
const WPM_AT_RATE_1 = 170; // [추정] 브라우저 음성 rate 1.0 의 분당 단어 수. 실제 기기에서 재서 맞춘다.
const MAX_PLAYS = 2;
const INTRO = {
  vocab: '낱말의 뜻과 쓰임을 고릅니다. 모르면 "모름"을 고르세요.',
  grammar: '문장에 맞는 말이나 틀린 곳을 고릅니다.',
  reading: '영어 글을 읽고 물음에 답합니다.',
  listening: '▶ 듣기를 눌러 대화나 담화를 듣고 답합니다. 문항마다 두 번까지 들을 수 있고, 첫 듣기가 끝나면 90초를 셉니다. 이어폰을 확인해 주세요.',
};

const load = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const status = (text, kind = '') => { $('#test-status').textContent = text; $('#test-status').className = `status ${kind}`; };
const keep = () => save('elt:session', session);
// 안내·1차 결과 단추는 뜬 뒤 400ms 동안 누름을 받지 않는다 (마지막 문항의 두 번 누름이 넘어오지 않게)
const armed = (fn) => { const t = performance.now(); return () => { if (performance.now() - t >= 400) fn(); }; };

const session = load('elt:session');
if (!session) {
  location.replace('index.html');
} else {
  session.stage ??= 2; // 두 단계 이전에 시작한 시험은 2차로 이어간다
  $('#who').textContent = session.name;
  const { items: bank, sample: bankSample } = await loadBank();
  const forms = await loadForms(session.set || 'A');
  const voices = await englishVoices();
  if (!voices) forms.stage1 = forms.stage1.filter((i) => i.area !== 'listening'); // 영어 음성이 없으면 1차 듣기는 빼고 센다
  route();

  function route() {
    stopTimer();
    $('#sample').hidden = !(session.stage === 1 || session.stage === 'write' ? forms.sample : session.stage === 2 && bankSample);
    if (session.stage === 1) return stage1();
    if (session.stage === 'gate') return gate();
    if (session.stage === 2) return next();
    if (session.stage === 'write') return write2();
    return finishTest();
  }

  function show(id) {
    for (const s of ['#intro', '#item', '#gate']) $(s).hidden = s !== id;
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

  // ── 1차 문제지 ──
  function stage1() {
    if (!forms.stage1.length) { show(''); return status('1차 문제지가 없습니다. 문제지 검수에서 문항을 통과시켜 주세요.', 'error'); }
    const it = forms.stage1[session.s1.i];
    if (!it) { session.stage = 'gate'; keep(); return route(); }
    top(`1차 ${session.set || 'A'}`, railFor(forms.stage1, session.s1.i), session.s1.i + 1, forms.stage1.length);
    if (!session.s1.started) {
      const listen = forms.stage1.some((i) => i.area === 'listening') ? `듣기, 영어 글 읽기, 소리, 문법, 쓰기 문제입니다. ${INTRO.listening}` : '영어 글 읽기, 소리, 문법, 쓰기 문제입니다.';
      return intro(`1차 (${forms.stage1.length}문항)`, `${listen} 문항마다 90초 안에 답합니다. 모르면 "모름"을 고르세요.`, () => { session.s1.started = true; keep(); route(); });
    }
    ask(it, (rec) => { session.s1.log.push(rec); session.s1.i += 1; });
  }

  function gate() {
    const r = stage1Score(session.s1.log);
    show('#gate');
    top('1차 결과', railFor(forms.stage1, forms.stage1.length));
    $('#gate-title').textContent = `1차 점수 ${r.score}점`;
    $('#gate-text').textContent = r.passed ? `${PASS}점 이상이라 2차로 넘어갑니다. 2차는 단어·문법·독해·듣기와 쓰기입니다.` : '1차 시험이 끝났습니다. 결과지를 보여 드립니다.';
    $('#gate-go').textContent = r.passed ? '2차 시작' : '결과 보기';
    $('#gate-go').onclick = armed(() => { session.stage = r.passed ? 2 : 'end'; keep(); route(); });
  }

  // ── 2차 쓰기 블록 ──
  function write2() {
    const it = session.w2 && forms.write2[session.w2.i];
    if (!it) { session.stage = 'end'; keep(); return route(); }
    top(`2차 쓰기 ${session.set || 'A'}`, [{ key: 'write', label: '쓰기', done: session.w2.i, total: forms.write2.length, current: true }], session.w2.i + 1, forms.write2.length);
    if (!session.w2.started) {
      return intro(`쓰기 (${forms.write2.length}문항)`, '주어진 낱말을 알맞은 꼴로 바꾸거나, 한 칸에 한 낱말씩 영어 문장을 씁니다. 문항마다 90초입니다.', () => { session.w2.started = true; keep(); route(); });
    }
    ask(it, (rec) => { session.w2.log.push(rec); session.w2.i += 1; });
  }

  // 문제지 문항(1차·쓰기) 하나: 답하거나 시간이 다 되면 기록하고 다음으로
  // 듣기 문항은 첫 듣기가 끝난 때부터 90초
  function ask(it, push) {
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
      const correct = !res.timeout && !res.dontKnow && (isWrite(it) ? checkWrite(it, res.entries) : res.choice === it.answer);
      push({ id: it.id, no: it.no, area: it.area, level: it.level, point: it.point || '', correct, dontKnow: !!res.dontKnow, timeout: !!res.timeout, ms: session.shownAt ? (res.at ?? Date.now()) - session.shownAt : 0, given: res.entries ?? res.choice ?? null });
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
      $('#play').onclick = () => play(it, done);
    }
    if (session.shownAt) startTimer(session.shownAt, () => done({ timeout: true }));
  }

  // ── 2차 적응형 4영역 ──
  function next() {
    const section = SECTIONS[session.sectionIdx];
    if (!section) { session.stage = 'write'; keep(); return route(); }
    const st = session.states[section];
    if (!st) {
      if (section === 'listening' && !voices) return endSection(section, '이 기기에서는 영어 음성을 낼 수 없어 듣기를 건너뛰었습니다');
      if (!readiness(bank, section).ready) return endSection(section, '검수된 문항이 모자라 건너뛰었습니다');
      return showIntro(section);
    }
    if (st.done) return endSection(section);
    const q = nextQuery(st);
    let item = session.current && bank.find((i) => i.id === session.current);
    if (!item) {
      item = pick(bank, section, q.step, q.unit, new Set(session.used));
      if (!item) {
        session.states[section] = q.unit == null ? stop(st) : skip(st);
        keep();
        return next();
      }
      session.current = item.id;
      session.plays = 0;
      session.shownAt = null;
      keep();
    }
    showItem(section, item);
  }

  function endSection(section, skipped) {
    if (skipped) session.states[section] = { skipped, done: true, log: [], est: null };
    session.sectionIdx += 1;
    session.current = null;
    keep();
    route();
  }

  function showIntro(section) {
    top('2차', adaptiveRail(session.states, session.sectionIdx));
    intro(`${SECTION_KO[section]} (최대 ${LIMITS[section]}문항)`, INTRO[section], () => {
      session.states[section] = start(section, startStep(session.grade));
      keep();
      route();
    });
  }

  function showItem(section, item) {
    show('#item');
    top('2차', adaptiveRail(session.states, session.sectionIdx), session.states[section].log.length + 1, `최대 ${LIMITS[section]}`);
    const listening = section === 'listening';
    $('#listen').hidden = !listening;
    let fired = false;
    const done = (res) => { if (!fired) { fired = true; choose(section, item, res); } };
    showMC(listening ? { ...item, passage: '' } : item, done);
    if (listening) {
      $('#plays').textContent = playsText();
      $('#play').disabled = session.plays >= MAX_PLAYS;
      $('#play').onclick = () => play(item, done);
      if (session.shownAt) startTimer(session.shownAt, () => done({ timeout: true }));
    } else {
      if (!session.shownAt) { session.shownAt = Date.now(); keep(); }
      startTimer(session.shownAt, () => done({ timeout: true }));
    }
  }

  function choose(section, item, res) {
    stopTimer();
    window.speechSynthesis?.cancel();
    const rec = { itemId: item.id, step: item.step, unit: item.unit, kind: item.kind, correct: !res.timeout && !res.dontKnow && res.choice === item.answer, dontKnow: !!res.dontKnow, timeout: !!res.timeout, ms: session.shownAt ? (res.at ?? Date.now()) - session.shownAt : 0 };
    session.states[section] = answer(session.states[section], rec);
    session.used.push(item.id);
    session.current = null;
    session.shownAt = null;
    keep();
    route();
  }

  // 위 띠: 학년·단계와 영역 진행 막대(칸 너비는 문항 수 비례). n 이 있으면 큰 문항 번호와 아래 띠 "n / of"
  function top(label, rail, n, of) {
    $('#section-name').textContent = `${session.grade} · ${label}`;
    const now = (c) => `${c.label} ${Math.min(c.done + 1, c.total)}/${c.total}`;
    const cur = rail.find((c) => c.current);
    $('#dots').setAttribute('aria-label', cur ? `영역 진행: ${now(cur)}` : '영역 진행');
    $('#dots').replaceChildren(...rail.map((c) => {
      const d = document.createElement('div');
      d.className = c.current ? 'cur' : c.skipped ? 'off' : '';
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

  // 첫 재생이 끝나면 90초를 센다
  async function play(item, done) {
    if (session.plays >= MAX_PLAYS) return;
    session.plays += 1;
    keep();
    $('#play').disabled = true;
    $('#plays').textContent = playsText(true);
    const rate = Math.min(1.3, Math.max(0.6, stepData(item.step ?? levelStep(item.level)).gen.wpm / WPM_AT_RATE_1));
    await say(item.script ?? item.passage, rate, item.id);
    if (session.current !== item.id || picking()) return; // 듣는 사이에 답했다 (고른 줄을 칠해 둔 사이 포함)
    if (!session.shownAt) { session.shownAt = Date.now(); keep(); startTimer(session.shownAt, () => done({ timeout: true })); }
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
    const s1 = session.s1 ? stage1Score(session.s1.log) : null;
    const cut = s1 && !s1.passed ? '1차에서 끝남' : '응시하지 않음';
    const sections = Object.fromEntries(SECTIONS.map((k) => {
      const st = session.states[k] || { skipped: cut, log: [], est: null };
      return [k, { skipped: st.skipped || '', est: st.est, log: st.log }];
    }));
    const result = {
      id: session.id, name: session.name, grade: session.grade, date: session.date, start: session.start || session.date, academy: { ...session.academy, logo: undefined },
      stage1: s1 && { set: session.set, ...s1, log: session.s1.log },
      write2: s1?.passed ? { set: session.set, log: session.w2.log } : null,
      sections,
    };
    if (!save(`elt:result:${result.id}`, result)) return status('결과를 이 브라우저에 저장하지 못했습니다. 저장 공간을 비운 뒤 이 화면을 새로고침해 주세요.', 'error');
    localStorage.removeItem('elt:session');
    location.replace(`report.html?id=${encodeURIComponent(result.id)}`);
  }
}

// 검수된 은행(items.json)이 없으면 샘플로 연다
async function loadBank() {
  for (const [file, sample] of [['data/items.json', false], ['data/items.sample.json', true]]) {
    try {
      const r = await fetch(file, { cache: 'no-store' });
      if (!r.ok) continue;
      const items = usable(await r.json());
      if (items.length) return { items, sample };
    } catch { /* 다음 파일 */ }
  }
  return { items: [], sample: false };
}

// 문제지: 고른 세트의 1차 통과 문항이 MIN_STAGE1 개 이상이면 forms.json, 아니면 샘플
async function loadForms(set) {
  for (const [file, sample] of [['data/forms.json', false], ['data/forms.sample.json', true]]) {
    try {
      const r = await fetch(file, { cache: 'no-store' });
      if (!r.ok) continue;
      const d = await r.json();
      const stage1 = usableForm(d?.stage1?.[set]);
      if (stage1.length < (sample ? 1 : MIN_STAGE1)) continue;
      return { stage1, write2: usableForm(d?.write2?.[set]), sample };
    } catch { /* 다음 파일 */ }
  }
  return { stage1: [], write2: [], sample: false };
}

// 영어 목소리 목록. 늦게 오는 브라우저가 있어 잠깐 기다린다. speechSynthesis 가 없는 기기(일부 웹뷰)도 있다.
async function englishVoices() {
  if (!('speechSynthesis' in window)) return null;
  const en = () => speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  if (!en().length) await new Promise((r) => { speechSynthesis.addEventListener('voiceschanged', r, { once: true }); setTimeout(r, 1500); });
  return en().length ? en() : null;
}
