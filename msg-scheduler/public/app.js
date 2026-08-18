/** 관리 화면 프런트엔드. 빌드 도구 없이 브라우저에서 그대로 실행된다. */

const state = {
  channels: [],
  channelConfigs: {},
  jobs: [],
  logs: [],
  timeZone: 'Asia/Seoul',
  editingId: null,
  scheduleType: 'cron',
  selectedChannels: new Set(),
  weekdays: new Set([1, 2, 3, 4, 5]),
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

// ---------------------------------------------------------------- API

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
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), kind === 'err' ? 6000 : 3200);
}

// ---------------------------------------------------------------- 부팅

async function boot() {
  const data = await api('/api/bootstrap');
  state.channels = data.channels;
  state.channelConfigs = data.channelConfigs;
  state.jobs = data.jobs;
  state.logs = data.logs;
  state.timeZone = data.timeZone;

  $('#tzLabel').textContent = `· 기준 시간 ${data.timeZone}`;
  $('#timeZone').value = data.timeZone;

  renderWeekdayChips();
  renderTargetPicker();
  renderJobs();
  renderChannelSettings();
  renderLogs();
}

// ---------------------------------------------------------------- 탭

$$('nav.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function switchTab(name) {
  $$('nav.tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  $$('section.tab-panel').forEach((s) => s.classList.toggle('active', s.id === `tab-${name}`));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('#goNew').addEventListener('click', () => {
  resetForm();
  switchTab('new');
});

// ---------------------------------------------------------------- 예약 목록

function renderJobs() {
  const list = $('#jobList');
  if (!state.jobs.length) {
    list.innerHTML = '<div class="card empty">아직 예약이 없습니다. [새 예약 만들기]로 첫 예약을 등록하세요.</div>';
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
  const channels = job.targets.map((t) => channelLabel(t.channel)).join(', ');
  const status = job.state?.lastStatus;
  const statusBadge = status
    ? `<span class="badge ${STATUS_BADGE[status]?.[0] || 'muted'}">${STATUS_BADGE[status]?.[1] || status}</span>`
    : '';
  const next = job.enabled
    ? job.nextRunText
      ? `다음 발송 ${escapeHtml(job.nextRunText)}`
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
      <button class="btn small" data-action="run" data-id="${job.id}">지금 보내기</button>
      <button class="btn ghost small" data-action="toggle" data-id="${job.id}">${job.enabled ? '중지' : '재개'}</button>
      <button class="btn ghost small" data-action="edit" data-id="${job.id}">수정</button>
      <button class="btn danger small" data-action="delete" data-id="${job.id}">삭제</button>
    </div>
  </div>`;
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

// ---------------------------------------------------------------- 예약 폼

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
      const fields = meta.targetFields
        .map((f) => targetFieldHtml(meta.key, f))
        .join('');
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
    // 설정 저장 등으로 다시 그려도 사용자가 고른 채널은 유지한다.
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
  if (state.scheduleType === 'once') {
    return { type: 'once', runAt: $('#onceAt').value };
  }
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
  $('#formTitle').textContent = '새 예약 만들기';
  $('#saveJob').textContent = '예약 저장';
  $('#cancelEdit').style.display = 'none';
  $('#jobName').value = '';
  $('#jobMessage').value = '';
  $('#onceAt').value = '';
  $('#customCron').value = '';
  $('#upcoming').textContent = '';
  state.selectedChannels.clear();
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
}

// ---------------------------------------------------------------- 채널 설정

function renderChannelSettings() {
  $('#channelSettings').innerHTML = state.channels.map(channelSettingCard).join('');

  $$('[data-save-channel]').forEach((btn) => {
    btn.addEventListener('click', () => saveChannel(btn.dataset.saveChannel));
  });
  $$('[data-test-channel]').forEach((btn) => {
    btn.addEventListener('click', () => testChannel(btn.dataset.testChannel));
  });
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

  const kakaoAuth =
    meta.key === 'kakaotalk'
      ? '<a class="btn ghost small" href="/oauth/kakao/start" target="_blank" rel="noopener">카카오 인증하기</a>'
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
      ${kakaoAuth}
    </div>
  </div>`;
}

async function saveChannel(key) {
  const values = {};
  $$(`[data-conf^="${key}."]`).forEach((input) => {
    const field = input.dataset.conf.split('.')[1];
    values[field] = input.value;
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
    const field = input.dataset.target.split('.')[1];
    if (input.value.trim()) target[field] = input.value.trim();
  });
  try {
    const data = await api(`/api/channels/${key}/test`, { method: 'POST', body: { message, target } });
    toast(`테스트 성공: ${data.detail}`, 'ok');
  } catch (err) {
    toast(`테스트 실패: ${err.message}`, 'err');
  }
  await reloadJobsAndLogs();
}

$('#saveTimeZone').addEventListener('click', async () => {
  try {
    const data = await api('/api/settings', { method: 'PUT', body: { timeZone: $('#timeZone').value.trim() } });
    state.timeZone = data.timeZone;
    $('#tzLabel').textContent = `· 기준 시간 ${data.timeZone}`;
    toast('타임존을 저장했습니다.', 'ok');
    await reloadJobsAndLogs();
  } catch (err) {
    toast(err.message, 'err');
  }
});

// ---------------------------------------------------------------- 발송 기록

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

// ---------------------------------------------------------------- 유틸

function channelLabel(key) {
  return state.channels.find((c) => c.key === key)?.label || key || '-';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

syncRepeatFields();
boot().catch((err) => toast(`초기화 실패: ${err.message}`, 'err'));
