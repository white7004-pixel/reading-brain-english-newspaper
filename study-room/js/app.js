/* ─────────────────────────────────────────────
 * 관리형 독서실 · 관제 대시보드 앱 로직
 * ───────────────────────────────────────────── */

const state = {
  view: 'admin',
  search: '',
  branch: 'all',
  mode: 'all',
  sort: 'name',
  mask: true,
  selectedAppStudent: null,
  notifications: [],
  unread: 0,
  aiEvents: [],
};

/* ───────── 유틸 ───────── */

const $ = (sel) => document.querySelector(sel);

function maskName(name) {
  if (!state.mask || name.length < 2) return name;
  return name[0] + 'O' + name.slice(2);
}

function fmtMin(min) {
  const h = Math.floor(min / 60);
  const m = Math.floor(min % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function fmtMinKor(min) {
  const h = Math.floor(min / 60);
  const m = Math.floor(min % 60);
  return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
}

function nowClock() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// 재원중(학습·수면)인데 진행률 대비 성취율이 낮으면 경고 대상
function isWarning(s) {
  return (s.status === 'studying' || s.status === 'sleeping')
    && s.progress >= 50 && s.achieve < 40;
}

function isPresent(s) {
  return s.status !== 'left' && s.status !== 'absent';
}

/* ───────── 아바타 (SVG 얼굴) ───────── */

const HAIRS = {
  shortBlack: `<path d="M15 42 Q15 12 50 12 Q85 12 85 42 L85 36 Q82 20 50 20 Q18 20 15 36 Z" fill="#26221f"/>
               <path d="M15 40 Q15 13 50 13 Q85 13 85 40 Q78 22 50 22 Q22 22 15 40 Z" fill="#26221f"/>`,
  bowlBlack:  `<path d="M13 46 Q13 10 50 10 Q87 10 87 46 L80 46 Q80 24 50 24 Q20 24 20 46 Z" fill="#1e1a18"/>`,
  brownRound: `<path d="M14 44 Q14 11 50 11 Q86 11 86 44 L79 42 Q79 22 50 22 Q21 22 21 42 Z" fill="#6b4a2f"/>`,
  brownShort: `<path d="M15 42 Q15 12 50 12 Q85 12 85 42 L85 34 Q80 19 50 19 Q20 19 15 34 Z" fill="#7a5230"/>`,
  headband:   `<path d="M14 42 Q14 11 50 11 Q86 11 86 42 L80 40 Q80 21 50 21 Q20 21 20 40 Z" fill="#3a2c22"/>
               <rect x="17" y="27" width="66" height="9" rx="4.5" fill="#e0455a"/>`,
};

const MOUTHS = {
  happy:   `<path d="M40 66 Q50 76 60 66" stroke="#8a4b3a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  neutral: `<line x1="42" y1="68" x2="58" y2="68" stroke="#8a4b3a" stroke-width="3" stroke-linecap="round"/>`,
  sad:     `<path d="M41 71 Q50 63 59 71" stroke="#8a4b3a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
};

function avatarSVG(s, size = 120) {
  const sleeping = s.status === 'sleeping';
  const eyes = sleeping
    ? `<path d="M32 52 Q37 56 42 52" stroke="#3a2e28" stroke-width="3" fill="none" stroke-linecap="round"/>
       <path d="M58 52 Q63 56 68 52" stroke="#3a2e28" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<circle cx="37" cy="52" r="3.6" fill="#2c2320"/><circle cx="63" cy="52" r="3.6" fill="#2c2320"/>`;
  return `
  <svg viewBox="0 0 100 100" width="${size}" height="${size}" class="avatar-svg" aria-hidden="true">
    <circle cx="50" cy="50" r="38" fill="#f6c9a0"/>
    <circle cx="28" cy="62" r="7" fill="#f2a284" opacity="0.7"/>
    <circle cx="72" cy="62" r="7" fill="#f2a284" opacity="0.7"/>
    ${eyes}
    ${MOUTHS[s.mood] || MOUTHS.neutral}
    ${HAIRS[s.hair] || HAIRS.shortBlack}
    ${sleeping ? `<text x="74" y="30" font-size="16" fill="#fff">💤</text>` : ''}
  </svg>`;
}

function moodFace(s) {
  if (s.mood === 'happy')   return `<span class="mood mood-happy">😊</span>`;
  if (s.mood === 'neutral') return `<span class="mood mood-neutral">😐</span>`;
  return `<span class="mood mood-sad">☹️</span>`;
}

/* ───────── 상단 통계 카드 ───────── */

function renderStats() {
  const total = STUDENTS.length;
  const present = STUDENTS.filter(isPresent);
  const studying = STUDENTS.filter((s) => s.status === 'studying');
  const warnings = STUDENTS.filter(isWarning);
  const avgAchieve = studying.length
    ? Math.round(studying.reduce((a, s) => a + s.achieve, 0) / studying.length) : 0;
  const avgPure = Math.round(STUDENTS.reduce((a, s) => a + s.tPure, 0) / total);

  const cards = [
    { title: '평균 성취율', value: `${avgAchieve}%`, sub: `${studying.length}명 기준`, color: 'teal',   dot: 'dot-teal' },
    { title: '출석률',      value: `${Math.round((present.length / total) * 100)}%`, sub: `${present.length}/${total}명 등원`, color: 'green', dot: 'dot-green' },
    { title: '학습중',      value: `${studying.length}명`, sub: `전체 ${total}명`, color: 'blue',   dot: 'dot-blue' },
    { title: '경고 대상',   value: `${warnings.length}명`, sub: '학습중 진행↑성취↓', color: 'red',   dot: 'dot-red' },
    { title: '평균 순공',   value: fmtMinKor(avgPure), sub: '1인 기준', color: 'yellow', dot: 'dot-yellow' },
  ];

  $('#statRow').innerHTML = cards.map((c) => `
    <div class="stat-card">
      <div class="stat-top"><span class="stat-title">${c.title}</span><span class="stat-dot ${c.dot}"></span></div>
      <div class="stat-value stat-${c.color}">${c.value}</div>
      <div class="stat-sub">${c.sub}</div>
    </div>`).join('');
}

/* ───────── 학생 카드 그리드 ───────── */

function filteredStudents() {
  let list = STUDENTS.slice();
  if (state.search) {
    const q = state.search.toLowerCase();
    list = list.filter((s) =>
      s.name.toLowerCase().includes(q) || s.school.toLowerCase().includes(q));
  }
  if (state.branch !== 'all') list = list.filter((s) => s.branch === state.branch);
  if (state.mode !== 'all') list = list.filter((s) => s.mode === state.mode);

  const sorters = {
    name: (a, b) => a.name.localeCompare(b.name, 'ko'),
    achieve: (a, b) => b.achieve - a.achieve,
    eff: (a, b) => b.eff - a.eff,
    warn: (a, b) => (isWarning(b) - isWarning(a)) || (a.achieve - b.achieve),
  };
  list.sort(sorters[state.sort] || sorters.name);
  return list;
}

function videoArea(s) {
  if (!s.cameraOn) {
    return `
      <div class="video offline">
        <div class="offline-msg">
          <div class="offline-icon">📷̸</div>
          <div class="offline-t1">카메라 오프라인</div>
          <div class="offline-t2">태블릿 전원 꺼짐</div>
        </div>
      </div>`;
  }
  let aiOverlay = '';
  if (s.ai === 'drowsy') {
    aiOverlay = `<div class="ai-box ai-drowsy"><span class="ai-tag red">졸음 감지</span></div>`;
  } else if (s.ai === 'away') {
    aiOverlay = `<div class="ai-box ai-away"><div class="ai-desk">🪑</div><span class="ai-tag purple">자리 이탈</span></div>`;
  }
  const showAvatar = s.ai !== 'away';
  return `
    <div class="video">
      ${showAvatar ? `<div class="video-avatar">${avatarSVG(s)}</div>` : ''}
      ${aiOverlay}
      <span class="live-pill"><span class="live-dot"></span>LIVE</span>
    </div>`;
}

function batteryHTML(s) {
  if (s.battery == null) return `<span class="bat bat-off">🔋 —</span>`;
  const cls = s.battery < 25 ? 'bat-red' : s.battery < 45 ? 'bat-orange' : 'bat-green';
  return `<span class="bat ${cls}">▮ ${s.battery}%</span>`;
}

function studentCard(s) {
  const st = STATUS_META[s.status];
  const warn = isWarning(s);
  return `
  <article class="student-card ${warn ? 'warned' : ''}" data-id="${s.id}">
    <div class="video-wrap">
      <span class="status-pill ${st.cls}">${st.label}</span>
      <button class="expand-btn" title="크게 보기">⛶</button>
      ${videoArea(s)}
      <div class="video-meta">
        <span class="tablet-info">📹 태블릿 ${String(s.tablet).padStart(2, '0')} · ${s.room}</span>
        ${batteryHTML(s)}
      </div>
    </div>

    <div class="card-body">
      <div class="name-row">
        <span class="s-name">${maskName(s.name)}</span>
        <span class="s-school">${s.school} ${s.grade}</span>
        <span class="mode-chip ${MODE_CLS[s.mode]}">${s.mode}</span>
      </div>
      <div class="sub-row">
        <span class="days">${DAY_NAMES.map((d, i) => `<i class="${s.days[i] ? 'on' : ''}">${d}</i>`).join(' ')}</span>
        <span class="plan">${s.plan}</span>
      </div>
      <div class="time-row">
        <b>${s.timeLabel}</b> ${s.inTime ? `${s.inTime} ~ ${s.outTime}` : s.outTime}
      </div>

      <div class="bar-row">
        <span class="bar-pct">${s.progress}%</span>
        <div class="bar"><div class="bar-fill fill-teal" style="width:${Math.min(s.progress, 100)}%"></div></div>
        <span class="bar-label">진행</span>
        ${moodFace(s)}
      </div>
      <div class="bar-row">
        <span class="bar-pct">${s.achieve}%</span>
        <div class="bar"><div class="bar-fill fill-yellow" style="width:${Math.min(s.achieve, 100)}%"></div></div>
        <span class="bar-label">성취</span>
      </div>

      <div class="stats-strip">
        <div class="strip-cell eff"><span class="strip-k">학습효율</span><span class="strip-v eff-v">${s.eff}%</span></div>
        <div class="strip-cell"><span class="strip-k">진행</span><span class="strip-v">${fmtMin(s.tStudy)}</span></div>
        <div class="strip-cell"><span class="strip-k">순공</span><span class="strip-v">${fmtMin(s.tPure)}</span></div>
        <div class="strip-cell"><span class="strip-k">외출</span><span class="strip-v">${fmtMin(s.tOut)}</span></div>
        <div class="strip-cell"><span class="strip-k">기타</span><span class="strip-v">${fmtMin(s.tEtc)}</span></div>
      </div>
    </div>
  </article>`;
}

function renderGrid() {
  const list = filteredStudents();
  $('#cardGrid').innerHTML = list.length
    ? list.map(studentCard).join('')
    : `<div class="empty">조건에 맞는 학생이 없습니다.</div>`;
}

/* ───────── 학생 상세 모달 ───────── */

function openModal(id) {
  const s = STUDENTS.find((x) => x.id === id);
  if (!s) return;
  const st = STATUS_META[s.status];
  $('#studentModal').innerHTML = `
    <button class="modal-close" id="modalClose">✕</button>
    <div class="modal-head">
      <div class="modal-avatar">${avatarSVG(s, 84)}</div>
      <div>
        <div class="modal-name">${maskName(s.name)}
          <span class="mode-chip ${MODE_CLS[s.mode]}">${s.mode}</span>
          <span class="status-pill inpage ${st.cls}">${st.label}</span>
        </div>
        <div class="modal-school">${s.school} ${s.grade} · ${s.plan} · 태블릿 ${String(s.tablet).padStart(2, '0')}</div>
        <div class="modal-time">${s.timeLabel} ${s.inTime ? `${s.inTime} ~ ${s.outTime}` : s.outTime}</div>
      </div>
    </div>
    <div class="modal-grid">
      <div class="m-cell"><span>진행률</span><b>${s.progress}%</b></div>
      <div class="m-cell"><span>성취율</span><b>${s.achieve}%</b></div>
      <div class="m-cell"><span>학습효율</span><b>${s.eff}%</b></div>
      <div class="m-cell"><span>진행 시간</span><b>${fmtMin(s.tStudy)}</b></div>
      <div class="m-cell"><span>순공 시간</span><b>${fmtMin(s.tPure)}</b></div>
      <div class="m-cell"><span>외출 시간</span><b>${fmtMin(s.tOut)}</b></div>
    </div>
    ${isWarning(s) ? `<div class="modal-warn">⚠️ 경고 대상 — 진행률 대비 성취율이 낮습니다. 학습 코칭이 필요합니다.</div>` : ''}
    <div class="modal-actions">
      <button class="m-btn" data-act="msg">📨 학생앱 메시지</button>
      <button class="m-btn" data-act="parent">👪 학부모 알림</button>
      <button class="m-btn danger" data-act="wake">⏰ 깨우기 알림</button>
    </div>`;
  $('#modalBackdrop').classList.remove('hidden');

  $('#modalClose').onclick = closeModal;
  document.querySelectorAll('.m-btn').forEach((b) => {
    b.onclick = () => {
      const label = { msg: '학생앱 메시지', parent: '학부모 알림', wake: '깨우기 알림' }[b.dataset.act];
      pushNotify(`✅ ${maskName(s.name)} 학생에게 "${label}"을(를) 전송했습니다.`);
      closeModal();
    };
  });
}

function closeModal() {
  $('#modalBackdrop').classList.add('hidden');
}

/* ───────── 알림 ───────── */

function pushNotify(text) {
  state.notifications.unshift({ text, time: nowClock() });
  state.unread++;
  if (state.notifications.length > 50) state.notifications.pop();
  renderNotify();
}

function renderNotify() {
  $('#notifyCount').textContent = state.unread;
  $('#notifyCount').style.display = state.unread > 0 ? 'flex' : 'none';
  $('#notifyList').innerHTML = state.notifications.length
    ? state.notifications.map((n) => `
        <div class="notify-item"><span class="n-time">${n.time}</span><span class="n-text">${n.text}</span></div>`).join('')
    : `<div class="notify-empty">알림이 없습니다.</div>`;
}

/* ───────── 보고서 ───────── */

function renderReport() {
  $('#reportDate').textContent = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  const present = STUDENTS.filter(isPresent);
  const best = STUDENTS.slice().sort((a, b) => b.achieve - a.achieve)[0];
  const totalPure = STUDENTS.reduce((a, s) => a + s.tPure, 0);

  $('#reportSummary').innerHTML = `
    <div class="rs-card"><span>등원 인원</span><b>${present.length} / ${STUDENTS.length}명</b></div>
    <div class="rs-card"><span>총 순공 시간</span><b>${fmtMinKor(totalPure)}</b></div>
    <div class="rs-card"><span>최고 성취 학생</span><b>${maskName(best.name)} (${best.achieve}%)</b></div>
    <div class="rs-card"><span>경고 대상</span><b class="red">${STUDENTS.filter(isWarning).length}명</b></div>`;

  const tbody = $('#reportTable tbody');
  tbody.innerHTML = STUDENTS.slice()
    .sort((a, b) => b.achieve - a.achieve)
    .map((s) => {
      const st = STATUS_META[s.status];
      return `<tr>
        <td class="td-name">${maskName(s.name)}</td>
        <td>${s.school} ${s.grade}</td>
        <td><span class="mode-chip ${MODE_CLS[s.mode]}">${s.mode}</span></td>
        <td><span class="status-pill inpage ${st.cls}">${st.label}</span></td>
        <td>${s.progress}%</td>
        <td>${s.achieve}%</td>
        <td>${s.eff}%</td>
        <td>${fmtMin(s.tStudy)}</td>
        <td>${fmtMin(s.tPure)}</td>
        <td>${fmtMin(s.tOut)}</td>
        <td>${fmtMin(s.tEtc)}</td>
        <td>${isWarning(s) ? '⚠️' : ''}</td>
      </tr>`;
    }).join('');
}

/* ───────── AI 감지 로그 ───────── */

function pushAiEvent(s, type) {
  const label = type === 'drowsy' ? '졸음 감지' : '자리 이탈';
  state.aiEvents.unshift({
    time: nowClock(), name: s.name, tablet: s.tablet, type, label,
  });
  if (state.aiEvents.length > 100) state.aiEvents.pop();
  pushNotify(`🚨 [AI] ${maskName(s.name)} — ${label} (태블릿 ${String(s.tablet).padStart(2, '0')})`);
  if (state.view === 'aidetect') renderAiLog();
}

function renderAiLog() {
  $('#aiLog').innerHTML = state.aiEvents.length
    ? state.aiEvents.map((e) => `
      <div class="ai-row">
        <span class="ai-time">${e.time}</span>
        <span class="ai-tag inline ${e.type === 'drowsy' ? 'red' : 'purple'}">${e.label}</span>
        <span class="ai-name">${maskName(e.name)}</span>
        <span class="ai-tab">태블릿 ${String(e.tablet).padStart(2, '0')}</span>
      </div>`).join('')
    : `<div class="notify-empty">아직 감지된 이벤트가 없습니다. 실시간으로 기록됩니다.</div>`;
}

/* ───────── 학생앱 미리보기 ───────── */

function renderStudentApp() {
  const picker = $('#studentPicker');
  picker.innerHTML = STUDENTS.map((s) => `
    <button class="picker-btn ${state.selectedAppStudent === s.id ? 'active' : ''}" data-id="${s.id}">
      ${maskName(s.name)}
    </button>`).join('');
  picker.querySelectorAll('.picker-btn').forEach((b) => {
    b.onclick = () => { state.selectedAppStudent = Number(b.dataset.id); renderStudentApp(); };
  });

  const s = STUDENTS.find((x) => x.id === state.selectedAppStudent) || STUDENTS[1];
  const st = STATUS_META[s.status];
  $('#phoneScreen').innerHTML = `
    <div class="pa-head">
      <div class="pa-avatar">${avatarSVG(s, 56)}</div>
      <div>
        <div class="pa-name">${maskName(s.name)}</div>
        <div class="pa-school">${s.school} ${s.grade}</div>
      </div>
      <span class="status-pill inpage ${st.cls}">${st.label}</span>
    </div>
    <div class="pa-timer">
      <div class="pa-timer-label">오늘 순공 시간</div>
      <div class="pa-timer-value">${fmtMin(s.tPure)}</div>
    </div>
    <div class="pa-bars">
      <div class="pa-bar-row"><span>진행률</span>
        <div class="bar"><div class="bar-fill fill-teal" style="width:${Math.min(s.progress, 100)}%"></div></div><b>${s.progress}%</b></div>
      <div class="pa-bar-row"><span>성취율</span>
        <div class="bar"><div class="bar-fill fill-yellow" style="width:${Math.min(s.achieve, 100)}%"></div></div><b>${s.achieve}%</b></div>
    </div>
    <div class="pa-plan">
      <div class="pa-plan-title">📚 오늘의 학습 플랜</div>
      <label class="pa-todo done"><input type="checkbox" checked disabled/> 영어 단어 50개 암기</label>
      <label class="pa-todo done"><input type="checkbox" checked disabled/> 영자신문 1면 독해</label>
      <label class="pa-todo"><input type="checkbox" disabled/> 수학 문제집 4단원</label>
      <label class="pa-todo"><input type="checkbox" disabled/> 국어 비문학 2지문</label>
    </div>
    <div class="pa-msg">💬 원장님: 오늘도 화이팅! 순공 목표 3시간 도전 🔥</div>`;
}

/* ───────── 뷰 전환 ───────── */

function switchView(view) {
  state.view = view;
  document.querySelectorAll('.side-btn[data-view]').forEach((b) =>
    b.classList.toggle('active', b.dataset.view === view));
  document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
  $(`#view-${view}`).classList.remove('hidden');
  if (view === 'report') renderReport();
  if (view === 'aidetect') renderAiLog();
  if (view === 'studentapp') renderStudentApp();
}

/* ───────── 실시간 시뮬레이션 ───────── */

function simulateTick() {
  STUDENTS.forEach((s) => {
    if (s.status === 'studying') {
      // 순공/진행 시간 증가 (3초 틱 = 3초분)
      s.tPure += 0.05;
      s.tStudy += 0.05;
      s.progress = Math.min(150, s.progress + (Math.random() < 0.15 ? 1 : 0));
      if (Math.random() < 0.1) s.achieve = Math.min(100, s.achieve + 1);
      s.eff = s.tStudy > 0 ? Math.round((s.achieve / Math.max(s.progress, 1)) * (s.tPure / s.tStudy) * 160) : 0;
    }
    if (s.battery != null && Math.random() < 0.05) {
      s.battery = Math.max(1, s.battery - 1);
    }
  });

  // 무작위 AI 이벤트
  if (Math.random() < 0.12) {
    const candidates = STUDENTS.filter((s) => s.cameraOn && isPresent(s));
    const s = candidates[Math.floor(Math.random() * candidates.length)];
    if (s) {
      const type = Math.random() < 0.6 ? 'drowsy' : 'away';
      if (s.ai !== type) {
        s.ai = type;
        pushAiEvent(s, type);
        // 8~15초 후 해제
        setTimeout(() => { if (s.ai === type) { s.ai = null; refreshAdmin(); } }, 8000 + Math.random() * 7000);
      }
    }
  }

  refreshAdmin();
}

function refreshAdmin() {
  if (state.view !== 'admin') return;
  renderStats();
  renderGrid();
}

/* ───────── 이벤트 바인딩 ───────── */

function bindEvents() {
  document.querySelectorAll('.side-btn[data-view]').forEach((b) =>
    b.addEventListener('click', () => switchView(b.dataset.view)));

  $('#searchInput').addEventListener('input', (e) => {
    state.search = e.target.value.trim();
    renderGrid();
  });

  $('#branchGroup').addEventListener('click', (e) => {
    const btn = e.target.closest('.chip'); if (!btn) return;
    state.branch = btn.dataset.branch;
    document.querySelectorAll('#branchGroup .chip').forEach((c) =>
      c.classList.toggle('active', c === btn));
    renderGrid();
  });

  $('#modeGroup').addEventListener('click', (e) => {
    const btn = e.target.closest('.chip'); if (!btn) return;
    state.mode = btn.dataset.mode;
    document.querySelectorAll('#modeGroup .chip').forEach((c) =>
      c.classList.toggle('active', c === btn));
    renderGrid();
  });

  $('#sortGroup').addEventListener('click', (e) => {
    const btn = e.target.closest('.chip'); if (!btn) return;
    state.sort = btn.dataset.sort;
    document.querySelectorAll('#sortGroup .chip').forEach((c) =>
      c.classList.toggle('active', c === btn));
    renderGrid();
  });

  $('#maskToggle').addEventListener('change', (e) => {
    state.mask = e.target.checked;
    renderGrid();
    if (state.view === 'report') renderReport();
  });

  $('#cardGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.student-card');
    if (card) openModal(Number(card.dataset.id));
  });

  $('#modalBackdrop').addEventListener('click', (e) => {
    if (e.target === $('#modalBackdrop')) closeModal();
  });

  $('#btnNotify').addEventListener('click', () => {
    const panel = $('#notifyPanel');
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      state.unread = 0;
      renderNotify();
    }
  });

  $('#notifyClear').addEventListener('click', () => {
    state.notifications = [];
    state.unread = 0;
    renderNotify();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); $('#notifyPanel').classList.add('hidden'); }
  });
}

/* ───────── 초기화 ───────── */

function init() {
  bindEvents();
  renderStats();
  renderGrid();
  renderNotify();
  pushNotify('👋 관리형 독서실 관제 시스템에 접속했습니다.');
  state.unread = 0;
  renderNotify();
  setInterval(simulateTick, 3000);
}

init();
