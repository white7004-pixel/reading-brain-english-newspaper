/** 관리 화면 프런트엔드. 빌드 도구 없이 브라우저에서 그대로 실행된다. */

const DRAFT_KEY = 'msgsched.draft';

const state = {
  channels: [],
  channelConfigs: {},
  jobs: [],
  logs: [],
  recipients: [],
  presets: [],
  timeZone: 'Asia/Seoul',
  dayHours: {},
  quietHours: {},
  // 빠른 예약
  selectedPreset: null,
  customAt: '',
  quickRecipients: new Set(),
  // 반복 예약 폼
  editingId: null,
  scheduleType: 'cron',
  selectedChannels: new Set(),
  formRecipients: new Set(),
  weekdays: new Set([1, 2, 3, 4, 5]),
  // 받는 곳 모달
  editingRecipientId: null,
};

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const STATUS_BADGE = {
  sent: ['ok', '성공'],
  failed: ['err', '실패'],
  retrying: ['warn', '재시도 대기'],
  missed: ['warn', '발송 누락'],
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// ---------------------------------------------------------------- 공통

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `요청 실패 (HTTP ${res.status})`);
  return data;
}

function toast(message, kind = '') {
  // 새 알림이 이전 알림을 가리지 않도록 항상 하나만 띄운다.
  $$('.toast').forEach((old) => old.remove());
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), kind === 'err' ? 6000 : 3600);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function channelLabel(key) {
  return state.channels.find((c) => c.key === key)?.label || key || '-';
}

function channelMeta(key) {
  return state.channels.find((c) => c.key === key);
}

/** 받는 곳을 "김선생님 · 문자(01012345678)" 처럼 한 줄로. */
function recipientDetail(recipient) {
  const values = Object.values(recipient.target || {}).filter(Boolean);
  return values.length ? `${channelLabel(recipient.channel)} · ${values.join(' / ')}` : channelLabel(recipient.channel);
}

// ---------------------------------------------------------------- 부팅

async function boot() {
  const data = await api('/api/bootstrap');
  Object.assign(state, {
    channels: data.channels,
    channelConfigs: data.channelConfigs,
    jobs: data.jobs,
    logs: data.logs,
    recipients: data.recipients,
    presets: data.presets,
    timeZone: data.timeZone,
    dayHours: data.dayHours,
    quietHours: data.quietHours,
  });
  state.quickRecipients = new Set((data.lastRecipientIds || []).filter((id) => state.recipients.some((r) => r.id === id)));

  $('#tzLabel').textContent = `· ${data.timeZone}`;
  $('#timeZone').value = data.timeZone;
  $('#hourMorning').value = data.dayHours.morning;
  $('#hourLunch').value = data.dayHours.lunch;
  $('#hourEvening').value = data.dayHours.evening;
  $('#quietStart').value = data.quietHours.start;
  $('#quietEnd').value = data.quietHours.end;

  restoreDraft();
  renderPresets();
  renderRecipientChips();
  renderRecipientList();
  renderWeekdayChips();
  renderTargetPicker();
  renderJobs();
  renderChannelSettings();
  renderLogs();
}

// ---------------------------------------------------------------- 탭

// 상단 탭(넓은 화면)과 하단 탭바(모바일)가 같은 핸들러를 공유한다.
$$('[data-tab]').forEach((btn) => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

function switchTab(name) {
  $$('[data-tab]').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  $$('section.tab-panel').forEach((s) => s.classList.toggle('active', s.id === `tab-${name}`));
  window.scrollTo({ top: 0 });
  if (name === 'quick') refreshPresets();
}

$('#goQuick').addEventListener('click', () => switchTab('quick'));

// ---------------------------------------------------------------- 빠른 예약: 임시저장

let draftTimer = null;

$('#quickMessage').addEventListener('input', () => {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(saveDraft, 400);
});

function saveDraft() {
  const message = $('#quickMessage').value;
  try {
    if (message.trim()) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ message, at: Date.now() }));
      $('#draftNote').textContent = '자동 저장됨';
    } else {
      localStorage.removeItem(DRAFT_KEY);
      $('#draftNote').textContent = '';
    }
  } catch {
    // 시크릿 모드 등에서 localStorage가 막혀 있어도 예약 자체는 동작해야 한다.
  }
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (draft?.message) {
      $('#quickMessage').value = draft.message;
      $('#draftNote').textContent = '이전에 쓰던 내용을 불러왔습니다';
    }
  } catch {
    /* 무시 */
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* 무시 */
  }
  $('#draftNote').textContent = '';
}

// ---------------------------------------------------------------- 빠른 예약: 시각

function renderPresets() {
  const box = $('#presetChips');
  const chips = state.presets
    .map(
      (p) => `<button type="button" class="chip time ${p.key === state.selectedPreset ? 'on' : ''} ${p.quiet ? 'moon' : ''}"
        data-preset="${p.key}">${escapeHtml(p.label)}<small>${escapeHtml(p.when)}</small></button>`,
    )
    .join('');
  const customOn = state.selectedPreset === '__custom__';
  box.innerHTML = `${chips}<button type="button" class="chip time ${customOn ? 'on' : ''}" data-preset="__custom__">직접 고르기<small>날짜·시각 지정</small></button>`;

  box.querySelectorAll('[data-preset]').forEach((chip) => {
    chip.addEventListener('click', () => selectPreset(chip.dataset.preset));
  });
  $('#customTimeBox').style.display = customOn ? 'block' : 'none';
  updateSubmitLabel();
}

async function selectPreset(key) {
  state.selectedPreset = key;
  renderPresets();
  if (key === '__custom__') {
    $('#quickCustomAt').focus();
    await checkTime();
    return;
  }
  const preset = state.presets.find((p) => p.key === key);
  showQuietNotice(preset?.quiet ? { when: preset.when } : null);
  updateSubmitLabel();
}

$('#quickCustomAt').addEventListener('change', () => {
  state.customAt = $('#quickCustomAt').value;
  checkTime();
});

/** 고른 시각이 심야인지 서버에 물어보고(타임존 계산은 서버가 정확하다) 안내를 띄운다. */
async function checkTime() {
  const body = pickedTime();
  if (!body) {
    showQuietNotice(null);
    return;
  }
  try {
    const data = await api('/api/quick/check', { method: 'POST', body });
    if (data.past) {
      showQuietNotice(null, '이미 지난 시각입니다. 다른 시간을 골라주세요.');
      return;
    }
    showQuietNotice(data.quiet ? data : null);
    updateSubmitLabel(data.when);
  } catch (err) {
    showQuietNotice(null, err.message);
  }
}

function showQuietNotice(quietData, errorText) {
  const box = $('#quietNotice');
  if (errorText) {
    box.style.display = 'block';
    box.innerHTML = escapeHtml(errorText);
    return;
  }
  if (!quietData) {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }
  box.style.display = 'block';
  const morning = quietData.morning;
  box.innerHTML = `🌙 <b>${escapeHtml(quietData.when)}</b>은 한밤중이라 상대방을 깨울 수 있습니다.
    ${morning ? `<button type="button" id="moveToMorning" data-at="${morning.runAt}">${escapeHtml(morning.when)}에 보내기</button>` : ''}`;
  const button = $('#moveToMorning');
  if (button) {
    button.addEventListener('click', () => {
      state.selectedPreset = '__custom__';
      state.customAt = button.dataset.at;
      renderPresets();
      $('#quickCustomAt').value = button.dataset.at;
      checkTime();
    });
  }
}

function pickedTime() {
  if (state.selectedPreset === '__custom__') {
    return state.customAt ? { runAt: state.customAt } : null;
  }
  return state.selectedPreset ? { presetKey: state.selectedPreset } : null;
}

function updateSubmitLabel(whenOverride) {
  const button = $('#quickSubmit');
  let when = whenOverride;
  if (!when && state.selectedPreset && state.selectedPreset !== '__custom__') {
    when = state.presets.find((p) => p.key === state.selectedPreset)?.whenFull;
  }
  if (!when && state.selectedPreset === '__custom__' && state.customAt) {
    when = state.customAt.replace('T', ' ');
  }
  button.textContent = when ? `${when}에 예약하기` : '예약하기';
}

/** 시간이 흐르면 "오늘 오전 9시" 같은 후보가 지나가므로 주기적으로 새로 받아온다. */
async function refreshPresets() {
  try {
    const data = await api('/api/quick/presets');
    state.presets = data.presets;
    if (state.selectedPreset && state.selectedPreset !== '__custom__' && !data.presets.some((p) => p.key === state.selectedPreset)) {
      state.selectedPreset = null;
    }
    renderPresets();
  } catch {
    /* 네트워크가 잠깐 끊겨도 화면은 그대로 둔다 */
  }
}

setInterval(refreshPresets, 60_000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refreshPresets();
});

// ---------------------------------------------------------------- 빠른 예약: 받는 곳

function renderRecipientChips() {
  const render = (box, selected) => {
    box.innerHTML = state.recipients
      .map(
        (r) => `<button type="button" class="chip ${selected.has(r.id) ? 'on' : ''}" data-recipient="${r.id}"
          title="${escapeHtml(recipientDetail(r))}">${escapeHtml(r.label)}</button>`,
      )
      .join('');
    box.querySelectorAll('[data-recipient]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.recipient;
        if (selected.has(id)) selected.delete(id);
        else selected.add(id);
        chip.classList.toggle('on');
      });
    });
  };
  render($('#recipientChips'), state.quickRecipients);
  render($('#formRecipientChips'), state.formRecipients);
  $('#noRecipients').style.display = state.recipients.length ? 'none' : 'block';
}

$('#quickSubmit').addEventListener('click', async () => {
  const message = $('#quickMessage').value.trim();
  if (!message) {
    toast('보낼 내용을 적어주세요.', 'err');
    $('#quickMessage').focus();
    return;
  }
  const time = pickedTime();
  if (!time) {
    toast('언제 보낼지 골라주세요.', 'err');
    return;
  }
  if (!state.quickRecipients.size) {
    toast('보낼 곳을 하나 이상 골라주세요.', 'err');
    return;
  }

  const button = $('#quickSubmit');
  button.disabled = true;
  try {
    const data = await api('/api/quick', {
      method: 'POST',
      body: { message, ...time, recipientIds: [...state.quickRecipients] },
    });
    toast(`${data.when}에 발송됩니다.`, 'ok');
    $('#quickMessage').value = '';
    clearDraft();
    state.selectedPreset = null;
    state.customAt = '';
    $('#quickCustomAt').value = '';
    showQuietNotice(null);
    renderPresets();
    await reloadJobsAndLogs();
  } catch (err) {
    toast(err.message, 'err');
  } finally {
    button.disabled = false;
  }
});

// ---------------------------------------------------------------- 곧 나갈 메시지

function renderUpcoming() {
  const rows = state.jobs
    .filter((j) => j.enabled && j.nextRunMs)
    .sort((a, b) => a.nextRunMs - b.nextRunMs)
    .slice(0, 5);
  $('#upcomingCard').style.display = rows.length ? 'block' : 'none';
  $('#upcomingList').innerHTML = rows
    .map(
      (job) => `<div class="upcoming-row">
        <span class="what">${escapeHtml(job.message.split('\n')[0])}</span>
        <span class="when">${escapeHtml(job.nextRunWhen || job.nextRunText)}</span>
      </div>`,
    )
    .join('');
}

// ---------------------------------------------------------------- 예약 목록

function renderJobs() {
  const list = $('#jobList');
  const activeCount = state.jobs.filter((j) => j.enabled).length;
  $$('.job-count').forEach((el) => (el.textContent = activeCount || ''));
  renderUpcoming();

  if (!state.jobs.length) {
    list.innerHTML = '<div class="card empty">아직 예약이 없습니다. [빠른 예약]에서 첫 메시지를 적어보세요.</div>';
    return;
  }
  list.innerHTML = state.jobs
    .slice()
    .sort((a, b) => (a.nextRunMs || Infinity) - (b.nextRunMs || Infinity))
    .map(jobCard)
    .join('');

  list.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => handleJobAction(btn.dataset.action, btn.dataset.id));
  });
}

function jobCard(job) {
  const channels = job.targets.map((t) => recipientNameFor(t)).join(', ');
  const status = job.state?.lastStatus;
  const statusBadge = status
    ? `<span class="badge ${STATUS_BADGE[status]?.[0] || 'muted'}">${STATUS_BADGE[status]?.[1] || status}</span>`
    : '';
  const next = job.enabled
    ? job.nextRunWhen
      ? `다음 발송 ${escapeHtml(job.nextRunWhen)}`
      : '예정된 발송 없음'
    : '중지됨';

  return `
  <div class="job ${job.enabled ? '' : 'off'}">
    <div class="job-head">
      <div>
        <div class="job-title">${escapeHtml(job.name)}</div>
        <div class="job-meta">${escapeHtml(job.description)} · ${escapeHtml(channels)}</div>
        <div class="job-meta">${next}</div>
      </div>
      <div class="stack">
        ${statusBadge}
        <span class="badge ${job.enabled ? 'ok' : 'muted'}">${job.enabled ? '켜짐' : '꺼짐'}</span>
      </div>
    </div>
    <div class="job-msg">${escapeHtml(job.message)}</div>
    <div class="job-actions">
      <button class="btn tonal small" data-action="run" data-id="${job.id}">지금 보내기</button>
      <button class="btn ghost small" data-action="toggle" data-id="${job.id}">${job.enabled ? '중지' : '재개'}</button>
      <button class="btn ghost small" data-action="edit" data-id="${job.id}">수정</button>
      <button class="btn danger small" data-action="delete" data-id="${job.id}">삭제</button>
    </div>
  </div>`;
}

/** 주소록에서 온 대상이면 저장해둔 이름으로 보여준다. */
function recipientNameFor(target) {
  if (target.recipientId) {
    const recipient = state.recipients.find((r) => r.id === target.recipientId);
    if (recipient) return recipient.label;
  }
  return channelLabel(target.channel);
}

async function handleJobAction(action, id) {
  const job = state.jobs.find((j) => j.id === id);
  try {
    if (action === 'run') {
      if (!confirm(`"${job.name}" 을(를) 지금 바로 보낼까요?`)) return;
      const { results } = await api(`/api/jobs/${id}/run`, { method: 'POST' });
      const failed = results.filter((r) => !r.ok);
      if (failed.length) toast(`일부 실패: ${failed.map((f) => `${channelLabel(f.channel)} - ${f.error}`).join(' / ')}`, 'err');
      else toast('발송 완료', 'ok');
      await reloadJobsAndLogs();
      return;
    }
    if (action === 'toggle') {
      await api(`/api/jobs/${id}/toggle`, { method: 'POST' });
      await reloadJobsAndLogs();
      return;
    }
    if (action === 'edit') {
      fillForm(job);
      switchTab('new');
      return;
    }
    if (action === 'delete') {
      if (!confirm(`"${job.name}" 예약을 삭제할까요?`)) return;
      await api(`/api/jobs/${id}`, { method: 'DELETE' });
      toast('삭제했습니다.', 'ok');
      await reloadJobsAndLogs();
    }
  } catch (err) {
    toast(err.message, 'err');
  }
}

async function reloadJobsAndLogs() {
  state.jobs = await api('/api/jobs');
  state.logs = await api('/api/logs?limit=200');
  renderJobs();
  renderLogs();
}

$('#refreshJobs').addEventListener('click', () => reloadJobsAndLogs().catch((e) => toast(e.message, 'err')));

// ---------------------------------------------------------------- 받는 곳 관리

function renderRecipientList() {
  const list = $('#recipientList');
  if (!state.recipients.length) {
    list.innerHTML = '<div class="empty-inline">등록된 받는 곳이 없습니다.</div>';
    return;
  }
  list.innerHTML = state.recipients
    .map(
      (r) => `<div class="recipient-row">
        <div>
          <div class="who">${escapeHtml(r.label)}</div>
          <div class="where">${escapeHtml(recipientDetail(r))}</div>
        </div>
        <button class="btn ghost small" data-edit-recipient="${r.id}">수정</button>
      </div>`,
    )
    .join('');
  list.querySelectorAll('[data-edit-recipient]').forEach((btn) => {
    btn.addEventListener('click', () => openRecipientModal(btn.dataset.editRecipient));
  });
}

function openRecipientModal(id = null) {
  state.editingRecipientId = id;
  const recipient = id ? state.recipients.find((r) => r.id === id) : null;
  $('#recipientModalTitle').textContent = recipient ? '받는 곳 수정' : '받는 곳 추가';
  $('#recipientLabel').value = recipient?.label || '';
  $('#recipientChannel').innerHTML = state.channels
    .map((c) => `<option value="${c.key}" ${c.key === recipient?.channel ? 'selected' : ''}>${escapeHtml(c.label)}</option>`)
    .join('');
  renderRecipientTargetFields(recipient?.target || {});
  $('#deleteRecipient').style.display = recipient ? 'inline-block' : 'none';
  $('#recipientModal').style.display = 'flex';
  if (!recipient) $('#recipientLabel').focus();
}

function renderRecipientTargetFields(values = {}) {
  const meta = channelMeta($('#recipientChannel').value);
  $('#recipientTargetFields').innerHTML = (meta?.targetFields || [])
    .map((field) => {
      const id = `rt_${field.key}`;
      if (field.type === 'select') {
        const options = field.options
          .map((o) => `<option value="${o}" ${o === (values[field.key] || field.default) ? 'selected' : ''}>${o}</option>`)
          .join('');
        return `<label class="field"><span>${escapeHtml(field.label)}</span><select id="${id}" data-rt="${field.key}">${options}</select></label>`;
      }
      return `<label class="field"><span>${escapeHtml(field.label)}</span>
        <input type="text" id="${id}" data-rt="${field.key}" value="${escapeHtml(values[field.key] || '')}"
          placeholder="${escapeHtml(field.placeholder || '')}" /></label>`;
    })
    .join('');
  const help = meta?.help ? `<p class="hint" style="margin-top:4px">${escapeHtml(meta.help)}</p>` : '';
  $('#recipientTargetFields').insertAdjacentHTML('beforeend', help);
}

$('#recipientChannel').addEventListener('change', () => renderRecipientTargetFields());
$('#addRecipient').addEventListener('click', () => openRecipientModal());
$('#addRecipientQuick').addEventListener('click', () => openRecipientModal());
$('#closeRecipientModal').addEventListener('click', () => closeRecipientModal());
$('#recipientModal').addEventListener('click', (event) => {
  if (event.target.id === 'recipientModal') closeRecipientModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeRecipientModal();
});

function closeRecipientModal() {
  $('#recipientModal').style.display = 'none';
}

$('#saveRecipient').addEventListener('click', async () => {
  const label = $('#recipientLabel').value.trim();
  const channel = $('#recipientChannel').value;
  const target = {};
  $$('[data-rt]').forEach((input) => {
    if (input.value.trim()) target[input.dataset.rt] = input.value.trim();
  });
  try {
    if (state.editingRecipientId) {
      await api(`/api/recipients/${state.editingRecipientId}`, { method: 'PUT', body: { label, channel, target } });
    } else {
      const created = await api('/api/recipients', { method: 'POST', body: { label, channel, target } });
      state.quickRecipients.add(created.id); // 방금 만든 곳은 바로 선택해준다
    }
    state.recipients = await api('/api/recipients');
    closeRecipientModal();
    renderRecipientChips();
    renderRecipientList();
    toast('저장했습니다.', 'ok');
  } catch (err) {
    toast(err.message, 'err');
  }
});

$('#deleteRecipient').addEventListener('click', async () => {
  if (!state.editingRecipientId) return;
  if (!confirm('이 받는 곳을 삭제할까요? 기존 예약에는 영향이 없습니다.')) return;
  try {
    await api(`/api/recipients/${state.editingRecipientId}`, { method: 'DELETE' });
    state.quickRecipients.delete(state.editingRecipientId);
    state.formRecipients.delete(state.editingRecipientId);
    state.recipients = await api('/api/recipients');
    closeRecipientModal();
    renderRecipientChips();
    renderRecipientList();
    toast('삭제했습니다.', 'ok');
  } catch (err) {
    toast(err.message, 'err');
  }
});

// ---------------------------------------------------------------- 반복 예약 폼

$$('#scheduleType button').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.scheduleType = btn.dataset.type;
    $$('#scheduleType button').forEach((b) => b.classList.toggle('active', b === btn));
    $('#onceBox').style.display = state.scheduleType === 'once' ? 'block' : 'none';
    $('#cronBox').style.display = state.scheduleType === 'cron' ? 'block' : 'none';
    $('#upcoming').textContent = '';
  });
});

$('#repeatType').addEventListener('change', syncRepeatFields);

function syncRepeatFields() {
  const type = $('#repeatType').value;
  $('#weekdayField').style.display = type === 'weekly' ? 'block' : 'none';
  $('#monthDayField').style.display = type === 'monthly' ? 'block' : 'none';
  $('#customCronField').style.display = type === 'custom' ? 'block' : 'none';
  $('#hourField').style.display = type === 'hourly' ? 'none' : 'block';
  $('#upcoming').textContent = '';
}

function renderWeekdayChips() {
  const box = $('#weekdayChips');
  box.innerHTML = WEEKDAY_LABELS.map(
    (label, i) => `<button type="button" class="chip ${state.weekdays.has(i) ? 'on' : ''}" data-day="${i}">${label}</button>`,
  ).join('');
  box.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const day = Number(chip.dataset.day);
      if (state.weekdays.has(day)) state.weekdays.delete(day);
      else state.weekdays.add(day);
      chip.classList.toggle('on');
    });
  });
}

function renderTargetPicker() {
  const box = $('#targetPicker');
  box.innerHTML = state.channels
    .map((meta) => {
      const configured = state.channelConfigs[meta.key]?.configured;
      const fields = meta.targetFields.map((f) => targetFieldHtml(meta.key, f)).join('');
      return `
      <div class="target-box" data-channel="${meta.key}">
        <div class="stack" style="justify-content:space-between">
          <label class="stack" style="cursor:pointer;font-weight:600">
            <input type="checkbox" data-pick="${meta.key}" style="width:auto" />
            ${escapeHtml(meta.label)}
          </label>
          <span class="badge ${configured ? 'ok' : 'muted'}">${configured ? '설정됨' : '설정 필요'}</span>
        </div>
        <div class="target-fields" data-fields="${meta.key}" style="display:none;margin-top:10px">${fields}</div>
      </div>`;
    })
    .join('');

  box.querySelectorAll('[data-pick]').forEach((cb) => {
    if (state.selectedChannels.has(cb.dataset.pick)) {
      cb.checked = true;
      box.querySelector(`[data-fields="${cb.dataset.pick}"]`).style.display = 'block';
    }
    cb.addEventListener('change', () => {
      const key = cb.dataset.pick;
      if (cb.checked) state.selectedChannels.add(key);
      else state.selectedChannels.delete(key);
      box.querySelector(`[data-fields="${key}"]`).style.display = cb.checked ? 'block' : 'none';
    });
  });
}

function targetFieldHtml(channelKey, field) {
  const id = `t_${channelKey}_${field.key}`;
  if (field.type === 'select') {
    const options = field.options
      .map((o) => `<option value="${o}" ${o === field.default ? 'selected' : ''}>${o}</option>`)
      .join('');
    return `<label class="field"><span>${escapeHtml(field.label)}</span><select id="${id}" data-target="${channelKey}.${field.key}">${options}</select></label>`;
  }
  return `<label class="field"><span>${escapeHtml(field.label)}</span>
    <input type="text" id="${id}" data-target="${channelKey}.${field.key}" placeholder="${escapeHtml(field.placeholder || '')}" /></label>`;
}

function collectSchedule() {
  if (state.scheduleType === 'once') return { type: 'once', runAt: $('#onceAt').value };
  const repeat = $('#repeatType').value;
  if (repeat === 'custom') return { type: 'cron', cron: $('#customCron').value.trim() };
  return {
    type: 'cron',
    preset: {
      repeat,
      hour: Number($('#repeatHour').value),
      minute: Number($('#repeatMinute').value),
      weekdays: [...state.weekdays],
      day: Number($('#repeatDay').value),
    },
  };
}

function collectTargets() {
  return [...state.selectedChannels].map((channelKey) => {
    const target = {};
    $$(`[data-target^="${channelKey}."]`).forEach((input) => {
      const field = input.dataset.target.split('.')[1];
      if (input.value.trim()) target[field] = input.value.trim();
    });
    return { channel: channelKey, target };
  });
}

$('#previewSchedule').addEventListener('click', async () => {
  const schedule = collectSchedule();
  if (schedule.type === 'once') {
    $('#upcoming').textContent = schedule.runAt ? `1회 발송: ${schedule.runAt.replace('T', ' ')}` : '발송 일시를 입력하세요.';
    return;
  }
  try {
    const data = await api('/api/cron/preview', {
      method: 'POST',
      body: { cron: schedule.cron, preset: schedule.preset, timeZone: state.timeZone },
    });
    $('#upcoming').textContent = `${data.description} (${data.cron}) → 다음 발송: ${data.upcoming.join(' · ')}`;
  } catch (err) {
    $('#upcoming').textContent = `오류: ${err.message}`;
  }
});

$('#jobForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    name: $('#jobName').value.trim(),
    message: $('#jobMessage').value,
    timeZone: state.timeZone,
    schedule: collectSchedule(),
    targets: collectTargets(),
    recipientIds: [...state.formRecipients],
    enabled: true,
  };
  try {
    if (state.editingId) {
      await api(`/api/jobs/${state.editingId}`, { method: 'PUT', body: payload });
      toast('예약을 수정했습니다.', 'ok');
    } else {
      await api('/api/jobs', { method: 'POST', body: payload });
      toast('예약을 등록했습니다.', 'ok');
    }
    resetForm();
    await reloadJobsAndLogs();
    switchTab('jobs');
  } catch (err) {
    toast(err.message, 'err');
  }
});

$('#cancelEdit').addEventListener('click', () => {
  resetForm();
  switchTab('jobs');
});

function resetForm() {
  state.editingId = null;
  $('#formTitle').textContent = '반복 예약 만들기';
  $('#saveJob').textContent = '예약 저장';
  $('#cancelEdit').style.display = 'none';
  $('#jobName').value = '';
  $('#jobMessage').value = '';
  $('#onceAt').value = '';
  $('#customCron').value = '';
  $('#upcoming').textContent = '';
  state.selectedChannels.clear();
  state.formRecipients.clear();
  renderRecipientChips();
  $$('[data-pick]').forEach((cb) => {
    cb.checked = false;
    $(`[data-fields="${cb.dataset.pick}"]`).style.display = 'none';
  });
  $$('[data-target]').forEach((input) => {
    if (input.tagName === 'SELECT') input.selectedIndex = 0;
    else input.value = '';
  });
}

function fillForm(job) {
  resetForm();
  state.editingId = job.id;
  $('#formTitle').textContent = '예약 수정';
  $('#saveJob').textContent = '수정 저장';
  $('#cancelEdit').style.display = 'inline-block';
  $('#jobName').value = job.name;
  $('#jobMessage').value = job.message;

  const type = job.schedule.type;
  $$('#scheduleType button').forEach((b) => b.classList.toggle('active', b.dataset.type === type));
  state.scheduleType = type;
  $('#onceBox').style.display = type === 'once' ? 'block' : 'none';
  $('#cronBox').style.display = type === 'cron' ? 'block' : 'none';

  if (type === 'once') {
    $('#onceAt').value = job.schedule.runAt || '';
  } else if (job.schedule.preset) {
    const p = job.schedule.preset;
    $('#repeatType').value = p.repeat;
    $('#repeatHour').value = p.hour ?? 9;
    $('#repeatMinute').value = p.minute ?? 0;
    $('#repeatDay').value = p.day ?? 1;
    state.weekdays = new Set(p.weekdays || []);
    renderWeekdayChips();
  } else {
    $('#repeatType').value = 'custom';
    $('#customCron').value = job.schedule.cron;
  }
  syncRepeatFields();

  for (const t of job.targets) {
    if (t.recipientId && state.recipients.some((r) => r.id === t.recipientId)) {
      state.formRecipients.add(t.recipientId);
      continue;
    }
    state.selectedChannels.add(t.channel);
    const cb = $(`[data-pick="${t.channel}"]`);
    if (cb) {
      cb.checked = true;
      $(`[data-fields="${t.channel}"]`).style.display = 'block';
    }
    for (const [field, value] of Object.entries(t.target || {})) {
      const input = $(`[data-target="${t.channel}.${field}"]`);
      if (input) input.value = value;
    }
  }
  renderRecipientChips();
}

// ---------------------------------------------------------------- 설정

function renderChannelSettings() {
  $('#channelSettings').innerHTML = state.channels.map(channelSettingCard).join('');
  $$('[data-save-channel]').forEach((btn) => btn.addEventListener('click', () => saveChannel(btn.dataset.saveChannel)));
  $$('[data-test-channel]').forEach((btn) => btn.addEventListener('click', () => testChannel(btn.dataset.testChannel)));
  $('#findTelegramChats')?.addEventListener('click', findTelegramChats);
  $('#findLineSources')?.addEventListener('click', findLineSources);
}

/** 웹훅으로 수집된 LINE 발신원 중 하나를 골라 기본 받는 사람에 넣어준다. */
async function findLineSources() {
  try {
    const { sources } = await api('/api/channels/line/sources');
    if (!sources.length) {
      toast('아직 수집된 사람이 없습니다. LINE 콘솔에 웹훅 URL(이 서버의 /webhooks/line)을 등록하고, 봇에게 메시지를 보내달라고 한 뒤 다시 눌러주세요.', 'err');
      return;
    }
    const input = $('[data-conf="line.defaultTo"]');
    if (sources.length === 1) {
      if (input) input.value = sources[0].id;
      toast(`"${sources[0].name}" (${sources[0].id})을 기본 받는 사람에 넣었습니다. [설정 저장]을 눌러주세요.`, 'ok');
      return;
    }
    const lines = sources.map((s, i) => `${i + 1}. ${s.name} (${s.type}) — ${s.id}`).join('\n');
    const pick = prompt(`수집된 발신원입니다. 번호를 입력하면 기본 받는 사람에 넣어드립니다.\n\n${lines}`, '1');
    const chosen = sources[Number(pick) - 1];
    if (chosen && input) {
      input.value = chosen.id;
      toast(`"${chosen.name}" (${chosen.id}) 선택됨. [설정 저장]을 눌러주세요.`, 'ok');
    }
  } catch (err) {
    toast(err.message, 'err');
  }
}

/** 봇이 받은 최근 메시지에서 chat_id를 찾아, 하나면 바로 입력칸에 넣어준다. */
async function findTelegramChats() {
  try {
    const { chats } = await api('/api/channels/telegram/chats');
    if (!chats.length) {
      toast('아직 봇이 받은 메시지가 없습니다. 봇에게 아무 메시지나 보낸 뒤 다시 눌러주세요.', 'err');
      return;
    }
    const input = $('[data-conf="telegram.defaultChatId"]');
    if (chats.length === 1) {
      if (input) input.value = chats[0].id;
      toast(`"${chats[0].name}" (${chats[0].id})을 기본 대화방에 넣었습니다. [설정 저장]을 눌러주세요.`, 'ok');
      return;
    }
    const lines = chats.map((c, i) => `${i + 1}. ${c.name} (${c.type}) — ${c.id}`).join('\n');
    const pick = prompt(`찾은 대화방입니다. 번호를 입력하면 기본 대화방에 넣어드립니다.\n\n${lines}`, '1');
    const chosen = chats[Number(pick) - 1];
    if (chosen && input) {
      input.value = chosen.id;
      toast(`"${chosen.name}" (${chosen.id}) 선택됨. [설정 저장]을 눌러주세요.`, 'ok');
    }
  } catch (err) {
    toast(err.message, 'err');
  }
}

function channelSettingCard(meta) {
  const conf = state.channelConfigs[meta.key] || { values: {}, secretsSet: {} };
  const fields = meta.fields
    .map((field) => {
      const id = `c_${meta.key}_${field.key}`;
      const isSet = conf.secretsSet?.[field.key];
      const label = `${escapeHtml(field.label)}${field.secret && isSet ? ' <span class="badge ok">저장됨</span>' : ''}`;
      if (field.type === 'select') {
        const current = conf.values[field.key] || field.default;
        const options = field.options
          .map((o) => `<option value="${o}" ${o === current ? 'selected' : ''}>${o}</option>`)
          .join('');
        return `<label class="field"><span>${label}</span><select id="${id}" data-conf="${meta.key}.${field.key}">${options}</select></label>`;
      }
      if (field.type === 'textarea') {
        return `<label class="field"><span>${label}</span><textarea id="${id}" data-conf="${meta.key}.${field.key}" style="min-height:70px"
          placeholder="${escapeHtml(field.placeholder || field.default || '')}">${escapeHtml(conf.values[field.key] || '')}</textarea></label>`;
      }
      const placeholder = field.secret && isSet ? '••••••• (비워두면 기존 값 유지)' : field.placeholder || '';
      return `<label class="field"><span>${label}</span>
        <input type="${field.secret ? 'password' : 'text'}" id="${id}" data-conf="${meta.key}.${field.key}"
          value="${escapeHtml(field.secret ? '' : conf.values[field.key] || '')}" placeholder="${escapeHtml(placeholder)}" /></label>`;
    })
    .join('');

  const extra =
    meta.key === 'kakaotalk'
      ? '<a class="btn ghost small" href="/oauth/kakao/start" target="_blank" rel="noopener">카카오 인증하기</a>'
      : meta.key === 'telegram'
        ? '<button type="button" class="btn ghost small" id="findTelegramChats">대화방 찾기</button>'
        : meta.key === 'line'
          ? '<button type="button" class="btn ghost small" id="findLineSources">보낸 사람 찾기</button>'
          : '';

  return `
  <div class="card">
    <div class="stack" style="justify-content:space-between">
      <h2 style="margin:0">${escapeHtml(meta.label)}</h2>
      <span class="badge ${conf.configured ? 'ok' : 'muted'}">${conf.configured ? '설정됨' : '미설정'}</span>
    </div>
    <p class="hint">${escapeHtml(meta.help || '')}${meta.docs ? ` <a href="${meta.docs}" target="_blank" rel="noopener">문서</a>` : ''}</p>
    ${fields}
    <div class="stack">
      <button class="btn small" data-save-channel="${meta.key}">설정 저장</button>
      <button class="btn ghost small" data-test-channel="${meta.key}">테스트 발송</button>
      ${extra}
    </div>
  </div>`;
}

async function saveChannel(key) {
  const values = {};
  $$(`[data-conf^="${key}."]`).forEach((input) => {
    values[input.dataset.conf.split('.')[1]] = input.value;
  });
  try {
    const data = await api('/api/settings', { method: 'PUT', body: { channels: { [key]: values } } });
    state.channelConfigs = data.channelConfigs;
    renderChannelSettings();
    renderTargetPicker();
    toast(`${channelLabel(key)} 설정을 저장했습니다.`, 'ok');
  } catch (err) {
    toast(err.message, 'err');
  }
}

async function testChannel(key) {
  const message = prompt('테스트로 보낼 메시지', '[테스트] 예약 메시지 발송기 연결 확인 {{datetime}}');
  if (message === null) return;
  const target = {};
  $$(`[data-target^="${key}."]`).forEach((input) => {
    if (input.value.trim()) target[input.dataset.target.split('.')[1]] = input.value.trim();
  });
  try {
    const data = await api(`/api/channels/${key}/test`, { method: 'POST', body: { message, target } });
    toast(`테스트 성공: ${data.detail}`, 'ok');
  } catch (err) {
    toast(`테스트 실패: ${err.message}`, 'err');
  }
  await reloadJobsAndLogs();
}

$('#saveTimeSettings').addEventListener('click', async () => {
  try {
    const data = await api('/api/settings', {
      method: 'PUT',
      body: {
        timeZone: $('#timeZone').value.trim(),
        dayHours: {
          morning: Number($('#hourMorning').value),
          lunch: Number($('#hourLunch').value),
          evening: Number($('#hourEvening').value),
        },
        quietHours: { start: Number($('#quietStart').value), end: Number($('#quietEnd').value) },
      },
    });
    state.timeZone = data.timeZone;
    state.dayHours = data.dayHours;
    state.quietHours = data.quietHours;
    state.presets = data.presets;
    $('#tzLabel').textContent = `· ${data.timeZone}`;
    renderPresets();
    toast('저장했습니다.', 'ok');
    await reloadJobsAndLogs();
  } catch (err) {
    toast(err.message, 'err');
  }
});

// ---------------------------------------------------------------- 기록

function renderLogs() {
  const body = $('#logBody');
  if (!state.logs.length) {
    body.innerHTML = '<tr><td colspan="5" class="empty">아직 발송 기록이 없습니다.</td></tr>';
    return;
  }
  body.innerHTML = state.logs
    .map((log) => {
      const [kind, label] = STATUS_BADGE[log.status] || ['muted', log.status];
      return `<tr>
        <td>${new Date(log.at).toLocaleString('ko-KR')}</td>
        <td>${escapeHtml(log.jobName || '-')}</td>
        <td>${escapeHtml(channelLabel(log.channel))}</td>
        <td><span class="badge ${kind}">${escapeHtml(label)}</span></td>
        <td class="detail">${escapeHtml(log.detail || '')}</td>
      </tr>`;
    })
    .join('');
}

$('#refreshLogs').addEventListener('click', async () => {
  state.logs = await api('/api/logs?limit=200');
  renderLogs();
});

$('#clearLogs').addEventListener('click', async () => {
  if (!confirm('발송 기록을 모두 지울까요?')) return;
  await api('/api/logs', { method: 'DELETE' });
  state.logs = [];
  renderLogs();
});

// ----------------------------------------------------------------

syncRepeatFields();
boot().catch((err) => toast(`초기화 실패: ${err.message}`, 'err'));
