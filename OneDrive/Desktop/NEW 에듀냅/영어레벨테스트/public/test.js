// 시험 화면: 영역 넷을 차례로, 문항마다 엔진이 다음 학기·단원을 정한다. 진행은 localStorage 에 두어 새로고침해도 이어진다.
import { SECTIONS, SECTION_KO, startStep, stepData } from './core/scale.js';
import { start, nextQuery, answer, skip, stop, LIMITS } from './core/engine.js';
import { usable, pick, readiness } from './core/bank.js';

const $ = (s) => document.querySelector(s);
const WPM_AT_RATE_1 = 170; // [추정] 브라우저 음성 rate 1.0 의 분당 단어 수. 실제 기기에서 재서 맞춘다.
const MAX_PLAYS = 2;
const INTRO = {
  vocab: '낱말의 뜻과 쓰임을 고릅니다. 모르면 가장 가까운 것을 고르세요.',
  grammar: '문장에 맞는 말이나 틀린 곳을 고릅니다.',
  reading: '영어 글을 읽고 물음에 답합니다.',
  listening: '▶ 듣기를 눌러 대화나 담화를 듣고 답합니다. 문항마다 두 번까지 들을 수 있습니다. 이어폰을 확인해 주세요.',
};

const load = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const status = (text, kind = '') => { $('#test-status').textContent = text; $('#test-status').className = `status ${kind}`; };

const session = load('elt:session');
if (!session) {
  location.replace('index.html');
} else {
  $('#who').textContent = `${session.name} · ${session.grade}`;
  const bank = await loadBank();
  const voices = await englishVoices();
  let shownAt = 0;

  const notReady = SECTIONS.filter((k) => k !== 'listening' || voices).filter((k) => !readiness(bank, k).ready);
  if (!Object.keys(session.states).length && notReady.length) {
    status(`문항 검수가 더 필요합니다: ${notReady.map((k) => SECTION_KO[k]).join(', ')} (영역마다 통과 문항 20개 이상)`, 'error');
  } else {
    next();
  }

  function next() {
    const section = SECTIONS[session.sectionIdx];
    if (!section) return finishTest();
    $('#section-name').textContent = `${session.sectionIdx + 1} / 4 · ${SECTION_KO[section]}`;
    const st = session.states[section];
    if (!st) {
      if (section === 'listening' && !voices) return endSection(section, '이 기기에서는 영어 음성을 낼 수 없어 듣기를 건너뛰었습니다');
      return showIntro(section);
    }
    if (st.done) return endSection(section);
    const q = nextQuery(st);
    let item = session.current && bank.find((i) => i.id === session.current);
    if (!item) {
      item = pick(bank, section, q.step, q.unit, new Set(session.used));
      if (!item) {
        session.states[section] = q.unit == null ? stop(st) : skip(st);
        save('elt:session', session);
        return next();
      }
      session.current = item.id;
      session.plays = 0;
      save('elt:session', session);
    }
    showItem(section, item);
  }

  function endSection(section, skipped) {
    if (skipped) session.states[section] = { skipped, done: true, log: [], est: null };
    session.sectionIdx += 1;
    session.current = null;
    save('elt:session', session);
    next();
  }

  function showIntro(section) {
    $('#item').hidden = true;
    $('#intro').hidden = false;
    $('#intro-title').textContent = `${SECTION_KO[section]} (최대 ${LIMITS[section]}문항)`;
    $('#intro-text').textContent = INTRO[section];
    dots(0, LIMITS[section]);
    $('#intro-go').onclick = () => {
      session.states[section] = start(section, startStep(session.grade));
      save('elt:session', session);
      $('#intro').hidden = true;
      next();
    };
  }

  function showItem(section, item) {
    $('#intro').hidden = true;
    $('#item').hidden = false;
    dots(session.states[section].log.length, LIMITS[section]);
    const listening = section === 'listening';
    $('#listen').hidden = !listening;
    $('#passage').hidden = listening || !item.passage;
    $('#passage').textContent = listening ? '' : item.passage;
    $('#question').textContent = item.question;
    $('#choices').replaceChildren(...item.choices.map((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = `${'①②③④'[i]} ${c}`;
      b.onclick = () => choose(section, item, i);
      return b;
    }));
    if (listening) {
      $('#plays').textContent = playsText();
      $('#play').disabled = session.plays >= MAX_PLAYS;
      $('#play').onclick = () => play(item);
    }
    status('');
    shownAt = performance.now();
    window.scrollTo(0, 0);
  }

  function choose(section, item, i) {
    for (const b of $('#choices').children) b.disabled = true;
    window.speechSynthesis?.cancel();
    const rec = { itemId: item.id, step: item.step, unit: item.unit, kind: item.kind, correct: i === item.answer, ms: Math.round(performance.now() - shownAt) };
    session.states[section] = answer(session.states[section], rec);
    session.used.push(item.id);
    session.current = null;
    save('elt:session', session);
    next();
  }

  function dots(done, total) {
    $('#dots').replaceChildren(...Array.from({ length: total }, (_, i) => {
      const s = document.createElement('span');
      if (i < done) s.className = 'on';
      return s;
    }));
  }

  function playsText() {
    return `남은 듣기 ${MAX_PLAYS - session.plays}번`;
  }

  async function play(item) {
    if (session.plays >= MAX_PLAYS) return;
    session.plays += 1;
    save('elt:session', session);
    $('#play').disabled = true;
    $('#plays').textContent = '듣는 중…';
    const rate = Math.min(1.3, Math.max(0.6, stepData(item.step).gen.wpm / WPM_AT_RATE_1));
    await say(item.passage, rate);
    $('#plays').textContent = playsText();
    $('#play').disabled = session.plays >= MAX_PLAYS;
  }

  // 대본 줄마다 "W: " 는 여자 목소리, "M: " 은 남자 목소리 (없으면 있는 목소리로)
  function say(script, rate) {
    const female = voices.find((v) => /female|samantha|zira|jenny|aria|susan|karen|moira/i.test(v.name)) || voices[0];
    const male = voices.find((v) => v !== female && /male|david|guy|daniel|mark|alex|fred/i.test(v.name)) || voices.find((v) => v !== female) || female;
    const lines = script.split('\n').map((l) => l.trim()).filter(Boolean);
    return lines.reduce((p, line) => p.then(() => new Promise((resolve) => {
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
    const sections = Object.fromEntries(SECTIONS.map((k) => {
      const st = session.states[k] || { skipped: '응시하지 않음', log: [], est: null };
      return [k, { skipped: st.skipped || '', est: st.est, log: st.log }];
    }));
    const result = { id: session.id, name: session.name, grade: session.grade, date: session.date, start: session.start || session.date, plan: session.plan, academy: { ...session.academy, logo: undefined }, sections };
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
      if (items.length) { $('#sample').hidden = !sample; return items; }
    } catch { /* 다음 파일 */ }
  }
  return [];
}

// 영어 목소리 목록. 늦게 오는 브라우저가 있어 잠깐 기다린다. speechSynthesis 가 없는 기기(일부 웹뷰)도 있다.
async function englishVoices() {
  if (!('speechSynthesis' in window)) return null;
  const en = () => speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  if (!en().length) await new Promise((r) => { speechSynthesis.addEventListener('voiceschanged', r, { once: true }); setTimeout(r, 1500); });
  return en().length ? en() : null;
}
