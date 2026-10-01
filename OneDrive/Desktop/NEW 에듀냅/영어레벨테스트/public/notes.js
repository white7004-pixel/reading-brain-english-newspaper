// 선생님 검수 의견. 주소에 ?teacher 가 있으면 선생님 화면(문항은 읽기만, 문항마다 "괜찮아요/고칠 점" + 메모를 서버에 자동 저장),
// 없으면 원장 화면(위에 모아보기, 문항마다 선생님들 의견을 보여 줌).
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const NAME_KEY = 'elt:teacher';
const V_KO = { ok: '괜찮아요', fix: '고칠 점 있어요' };

export async function openNotes(page, { labelOf = (id) => id } = {}) {
  const teacher = new URLSearchParams(location.search).has('teacher');
  let all = [];
  let loadError = '';
  try {
    const r = await fetch(`api/notes?page=${page}`, { cache: 'no-store' });
    if (r.ok) all = (await r.json()).teachers;
    else loadError = '선생님 의견을 불러오지 못했습니다';
  } catch { loadError = '선생님 의견을 불러오지 못했습니다'; }

  let name = '';
  try { name = teacher ? (localStorage.getItem(NAME_KEY) || '').normalize('NFC') : ''; } catch { /* 없음 */ }
  let mine = {};
  const pick = () => { mine = { ...(all.find((t) => t.teacher === name)?.notes || {}) }; };
  pick();

  if (teacher) {
    document.body.classList.add('teacher');
    for (const a of document.querySelectorAll('a[href$=".html"]')) a.href += '?teacher'; // 다른 검수 화면으로 가도 선생님 화면
  }

  const bar = document.createElement('section');
  bar.className = 'card notes-bar';
  const say = (t, k = '') => { const p = bar.querySelector('[data-say]'); p.textContent = t; p.className = `status ${k}`; };

  // 저장: 마지막 변경 0.6초 뒤, 바뀐 문항만 보낸다(서버가 합치니 다른 기기에서 쓴 의견을 지우지 않는다). 한 번에 하나만 보낸다.
  const dirty = new Set();
  let timer = null;
  let busy = false;
  let again = false;
  const save = (id) => { dirty.add(id); clearTimeout(timer); say('저장하는 중…'); timer = setTimeout(flush, 600); };
  async function flush() {
    timer = null;
    if (busy) { again = true; return; }
    if (!dirty.size) return;
    busy = true;
    const ids = [...dirty];
    dirty.clear();
    const body = { page, teacher: name, notes: Object.fromEntries(ids.map((id) => [id, mine[id] || { v: '', memo: '' }])) };
    try {
      const r = await fetch('api/notes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) say(`저장됨 · 의견 ${j.saved}개 — 원장님께 바로 전달됩니다`);
      else { say(j.error || '저장하지 못했습니다', 'error'); if (r.status >= 500) ids.forEach((id) => dirty.add(id)); }
    } catch { say('저장하지 못했습니다. 인터넷 연결을 확인해 주세요 — 다음에 고칠 때 함께 보냅니다', 'error'); ids.forEach((id) => dirty.add(id)); }
    busy = false;
    if (again) { again = false; flush(); }
  }
  // 이름을 바꾸기 전에 쓰던 이름으로 남은 의견을 먼저 보낸다
  async function settle() {
    clearTimeout(timer);
    while (busy) await new Promise((r) => setTimeout(r, 100));
    if (dirty.size) await flush();
  }

  const api = { teacher, bar, block, lock, onName: () => {} };

  if (teacher) {
    bar.innerHTML = `<h2>선생님 검토</h2>
      <label>검토하시는 분 이름 (적고 Enter)<input data-name maxlength="20" placeholder="예: 박선생" value="${esc(name)}"></label>
      <p class="hint">문항마다 <b>괜찮아요</b> 또는 <b>고칠 점 있어요</b>를 누르고, 고칠 점은 적어 주세요. 자동으로 저장되어 원장님께 전달됩니다.</p>
      <p data-say class="status" role="status"></p>`;
    const input = bar.querySelector('[data-name]');
    input.addEventListener('change', async () => {
      await settle();
      dirty.clear();
      name = input.value.normalize('NFC').trim();
      try { localStorage.setItem(NAME_KEY, name); } catch { /* 없음 */ }
      pick();
      api.onName();
      hello();
    });
    const hello = () => say(loadError || (name ? `${name} 선생님 · 지금까지 의견 ${Object.keys(mine).length}개` : '이름을 먼저 적어 주세요'), loadError ? 'error' : '');
    hello();
  } else {
    const fixes = all.flatMap((t) => Object.entries(t.notes).filter(([, n]) => n.v === 'fix' || n.memo).map(([id, n]) => ({ id, who: t.teacher, ...n })));
    bar.innerHTML = `<h2>선생님 의견 모아보기</h2>
      <p data-say class="status" role="status"></p>
      ${fixes.length ? `<details><summary>고칠 점·메모 ${fixes.length}건</summary><ul class="notes-list">${fixes
        .sort((a, b) => String(labelOf(a.id)).localeCompare(String(labelOf(b.id)), 'ko', { numeric: true }))
        .map((f) => `<li><b>${esc(labelOf(f.id))}</b> · ${esc(f.who)} ${f.v ? `<span class="tag ${f.v}">${V_KO[f.v]}</span>` : ''} ${esc(f.memo)}</li>`).join('')}</ul></details>` : ''}`;
    say(loadError || (all.length ? all.map((t) => `${t.teacher} ${Object.keys(t.notes).length}개`).join(' · ') : '아직 선생님 의견이 없습니다'), loadError ? 'error' : '');
  }

  // 문항 하나 밑에 붙는 의견 칸
  function block(id) {
    const el = document.createElement('div');
    el.className = 'note-box';
    el.addEventListener('input', (e) => e.stopPropagation()); // 원장용 카드의 고치기 저장으로 번지지 않게
    el.addEventListener('change', (e) => e.stopPropagation());
    if (!teacher) {
      const said = all.map((t) => ({ who: t.teacher, ...t.notes[id] })).filter((n) => n.v || n.memo);
      if (!said.length) return el;
      el.innerHTML = said.map((n) => `<p><b>${esc(n.who)}</b> ${n.v ? `<span class="tag ${n.v}">${V_KO[n.v]}</span>` : ''} ${esc(n.memo)}</p>`).join('');
      return el;
    }
    const n = mine[id] || { v: '', memo: '' };
    const off = name ? '' : ' disabled';
    el.innerHTML = `<div class="row">${Object.entries(V_KO).map(([v, ko]) => `<button type="button" data-v="${v}" aria-pressed="${n.v === v}"${off}>${ko}</button>`).join('')}</div>
      <textarea data-memo rows="2" placeholder="${name ? '고칠 점을 적어 주세요 (괜찮으면 비워 두셔도 됩니다)' : '위에 이름을 먼저 적어 주세요'}"${off}>${esc(n.memo)}</textarea>`;
    const memo = el.querySelector('[data-memo]');
    const put = (v) => {
      const next = { v, memo: memo.value.trim() };
      if (next.v || next.memo) mine[id] = next; else delete mine[id];
      for (const b of el.querySelectorAll('[data-v]')) b.setAttribute('aria-pressed', String(b.dataset.v === next.v));
      save(id);
    };
    for (const b of el.querySelectorAll('[data-v]')) b.onclick = () => put(mine[id]?.v === b.dataset.v ? '' : b.dataset.v);
    memo.addEventListener('input', () => put(mine[id]?.v || ''));
    return el;
  }

  // 선생님 화면에서는 문항을 읽기만: 칸은 잠그고 원장용 단추·상태는 감춘다
  function lock(card) {
    if (!teacher) return;
    for (const f of card.querySelectorAll('input:not([type=radio]), textarea')) f.readOnly = true;
    for (const f of card.querySelectorAll('input[type=radio]')) f.disabled = true;
    card.querySelector(':scope > .row')?.remove();
    card.querySelector('[data-problems]')?.remove();
    card.querySelector('.tag')?.remove();
  }

  return api;
}
