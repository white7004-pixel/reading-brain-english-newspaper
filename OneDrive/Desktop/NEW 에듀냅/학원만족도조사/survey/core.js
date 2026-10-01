// 설문 화면·결과 화면이 함께 쓰는 검사·집계·저장 통로. node 에서도 읽힌다(check.js).
(function () {
  function items(survey) {
    var out = [];
    survey.sections.forEach(function (s) { out = out.concat(s.items); });
    return out;
  }
  function empty(v) {
    return v === undefined || v === null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length);
  }
  function round2(x) { return Math.round(x * 100) / 100; }

  // 빠진 필수 문항 id 목록
  function missing(survey, answers) {
    return items(survey).filter(function (i) { return i.required && empty(answers[i.id]); })
      .map(function (i) { return i.id; });
  }

  // 거르기: { 문항id: 고른 값 } — 여러 개 고르기 답이면 그 안에 있으면 통과
  function filterRows(rows, f) {
    return rows.filter(function (r) {
      var a = r.answers || {};
      return Object.keys(f).every(function (id) {
        return !f[id] || [].concat(a[id] === undefined ? [] : a[id]).indexOf(f[id]) >= 0;
      });
    });
  }

  // 응답이 생긴 설문을 고칠 때: 옛 문항이 같은 id·종류·보기로 남아 있어야 한다 (서버 survey_save_form 과 같은 규칙)
  // 지켜지지 않은 옛 문항 id 목록을 돌려준다
  function lockCheck(oldDef, newDef) {
    var now = {};
    items(newDef).forEach(function (i) { now[i.id] = i; });
    return items(oldDef).filter(function (o) {
      var n = now[o.id];
      return !n || n.type !== o.type || JSON.stringify(n.options || null) !== JSON.stringify(o.options || null);
    }).map(function (o) { return o.id; });
  }

  // 저장 전에 고칠 곳을 사람 말로
  function validateDef(def) {
    var errs = [], ids = {}, n = 0;
    if (!String(def.kicker || '').trim()) errs.push('설문 이름을 적어 주세요.');
    if (!def.sections || !def.sections.length) { errs.push('문항이 하나도 없습니다.'); return errs; }
    def.sections.forEach(function (sec, si) {
      var name = sec.title ? '「' + sec.title + '」' : (si + 1) + '번째';
      if (!sec.items.length) errs.push(name + ' 섹션에 문항이 없습니다. 문항을 넣거나 섹션을 지워 주세요.');
      sec.items.forEach(function (it) {
        n++;
        if (!String(it.label || '').trim()) errs.push(n + '번 문항: 문항 글을 적어 주세요.');
        if ((it.type === 'single' || it.type === 'multi') && (it.options || []).length < 2) errs.push(n + '번 문항: 보기를 두 개 이상 적어 주세요.');
        if (it.type === 'scale' && (it.options || []).some(function (o) { return !String(o.label || '').trim(); })) errs.push(n + '번 문항: 5점 척도의 말을 모두 적어 주세요.');
        if (ids[it.id]) errs.push(n + '번 문항: 다른 문항과 번호표(id)가 겹칩니다.');
        ids[it.id] = true;
      });
    });
    return errs;
  }

  function newId(def) {
    var used = {}, k = 1;
    items(def).forEach(function (i) { used[i.id] = true; });
    while (used['q' + k]) k++;
    return 'q' + k;
  }

  var OLD = ['parent', 'student', 'teacher']; // 처음부터 있던 짧은 주소
  function linkOf(slug) { return OLD.indexOf(slug) >= 0 ? '/' + slug : '/s/' + slug; }
  function slugOk(slug) {
    return /^[a-z0-9][a-z0-9-]{1,39}$/.test(slug || '') && ['s', 'results', 'dashboard', 'index'].indexOf(slug) < 0;
  }

  // 문항별 개수·평균, 섹션별 5점 평균
  function summarize(survey, rows) {
    var res = { n: rows.length, items: {}, sections: [] };
    survey.sections.forEach(function (sec) {
      var total = 0, cnt = 0;
      sec.items.forEach(function (it) {
        if (it.type === 'text') return;
        var counts = {};
        it.options.forEach(function (o) { counts[typeof o === 'object' ? o.v : o] = 0; });
        var sum = 0, k = 0;
        rows.forEach(function (r) {
          var v = (r.answers || {})[it.id];
          if (empty(v)) return;
          (Array.isArray(v) ? v : [v]).forEach(function (x) { if (x in counts) counts[x]++; });
          if (it.type === 'scale' && typeof v === 'number') { sum += v; k++; }
        });
        var s = { counts: counts, answered: rows.filter(function (r) { return !empty((r.answers || {})[it.id]); }).length };
        if (it.type === 'scale' && !it.noAvg) {
          s.avg = k ? round2(sum / k) : null;
          total += sum; cnt += k;
        }
        res.items[it.id] = s;
      });
      var hasScale = sec.items.some(function (i) { return i.type === 'scale' && !i.noAvg; });
      res.sections.push({ title: sec.title, avg: hasScale && cnt ? round2(total / cnt) : null });
    });
    return res;
  }

  // flag 문항(학생 20번)에 글이 있는 응답
  function flagged(survey, rows) {
    var f = items(survey).filter(function (i) { return i.flag; });
    return rows.filter(function (r) {
      return f.some(function (i) { return !empty((r.answers || {})[i.id]); });
    });
  }

  // 날짜별 응답 수: 첫 응답일 ~ 오늘(한국 시간), 빈 날은 0
  function daily(rows, now) {
    if (!rows.length) return [];
    var day = function (t) { return kst(new Date(t).toISOString()).slice(0, 10); };
    var counts = {}, first = null;
    rows.forEach(function (r) {
      var d = day(r.created_at);
      counts[d] = (counts[d] || 0) + 1;
      if (!first || d < first) first = d;
    });
    var out = [], end = day(now), t = Date.parse(first + 'T00:00:00Z');
    for (var d = first; d <= end; t += 86400000, d = new Date(t).toISOString().slice(0, 10)) {
      out.push({ day: d, n: counts[d] || 0 });
    }
    return out;
  }

  function csvCell(v) {
    var s = v === undefined || v === null ? '' : String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function kst(iso) {
    if (!iso) return '';
    var d = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
    return d.toISOString().slice(0, 16).replace('T', ' ');
  }
  function toCSV(survey, rows) {
    var its = items(survey);
    var lines = [['제출 시각'].concat(its.map(function (i) { return i.label; }))];
    rows.forEach(function (r) {
      var a = r.answers || {};
      lines.push([kst(r.created_at)].concat(its.map(function (i) {
        var v = a[i.id];
        return Array.isArray(v) ? v.join(' / ') : v;
      })));
    });
    return '﻿' + lines.map(function (l) { return l.map(csvCell).join(','); }).join('\r\n');
  }

  // 저장 통로: config.js 가 비어 있으면 이 브라우저에만 저장하는 연습 모드(비밀번호 demo)
  var api = {
    demo: function () {
      var c = (typeof window !== 'undefined' && window.RB_CONFIG) || {};
      return !c.url || !c.key;
    },
    rpc: function (fn, body) {
      var c = window.RB_CONFIG;
      return fetch(c.url.replace(/\/$/, '') + '/rest/v1/rpc/' + fn, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: c.key, Authorization: 'Bearer ' + c.key },
        body: JSON.stringify(body)
      }).then(function (res) {
        if (!res.ok) throw new Error('서버 응답 ' + res.status);
        return res.json();
      });
    },
    submit: function (surveyId, answers) {
      if (api.demo()) {
        var all = demoRows();
        all.push({ survey: surveyId, created_at: new Date().toISOString(), answers: answers });
        localStorage.setItem('rb-demo-rows', JSON.stringify(all));
        return Promise.resolve(true);
      }
      return api.rpc('survey_submit', { p_survey: surveyId, p_answers: answers });
    },
    // 비밀번호가 틀리면 null
    results: function (password, surveyId) {
      if (api.demo()) {
        return Promise.resolve(password !== 'demo' ? null :
          demoRows().filter(function (r) { return r.survey === surveyId; }));
      }
      return api.rpc('survey_results', { p_password: password, p_survey: surveyId });
    },
    // 설문 하나 {slug, status, def} — 없으면 null
    form: function (slug) {
      if (api.demo()) return Promise.resolve(demoForms().filter(function (f) { return f.slug === slug; })[0] || null);
      return api.rpc('survey_form', { p_slug: slug });
    },
    // 설문 관리 목록 — 비밀번호가 틀리면 null
    adminForms: function (password) {
      if (api.demo()) {
        if (password !== 'demo') return Promise.resolve(null);
        var rows = demoRows();
        return Promise.resolve(demoForms().map(function (f) {
          return Object.assign({}, f, { responses: rows.filter(function (r) { return r.survey === f.slug; }).length });
        }));
      }
      return api.rpc('survey_admin_forms', { p_password: password });
    },
    // 아래 셋은 {ok:true} 또는 {error:'password'|'slug'|'exists'|'missing'|'locked'|'empty'|'dup'|'bad'|'has_responses'}
    saveForm: function (password, slug, def, isNew) {
      if (api.demo()) {
        var all = demoForms(), old = all.filter(function (f) { return f.slug === slug; })[0];
        var err = password !== 'demo' ? 'password' : !slugOk(slug) ? 'slug' : !items(def).length ? 'empty'
          : isNew && old ? 'exists' : !isNew && !old ? 'missing'
          : old && demoRows().some(function (r) { return r.survey === slug; }) && lockCheck(old.def, def).length ? 'locked' : null;
        if (err) return Promise.resolve({ error: err });
        def = Object.assign({}, def, { id: slug });
        if (old) old.def = def; else all.push({ slug: slug, status: 'open', def: def });
        saveDemoForms(all);
        return Promise.resolve({ ok: true });
      }
      return api.rpc('survey_save_form', { p_password: password, p_slug: slug, p_def: def, p_new: !!isNew });
    },
    setStatus: function (password, slug, status) {
      if (api.demo()) {
        var all = demoForms();
        all.forEach(function (f) { if (f.slug === slug) f.status = status; });
        saveDemoForms(all);
        return Promise.resolve({ ok: true });
      }
      return api.rpc('survey_set_status', { p_password: password, p_slug: slug, p_status: status });
    },
    deleteForm: function (password, slug) {
      if (api.demo()) {
        if (demoRows().some(function (r) { return r.survey === slug; })) return Promise.resolve({ error: 'has_responses' });
        saveDemoForms(demoForms().filter(function (f) { return f.slug !== slug; }));
        return Promise.resolve({ ok: true });
      }
      return api.rpc('survey_delete_form', { p_password: password, p_slug: slug });
    }
  };
  function demoRows() {
    try { return JSON.parse(localStorage.getItem('rb-demo-rows') || '[]'); } catch (e) { return []; }
  }
  // 연습 모드 설문: 처음엔 questions.js 의 학부모·학생 설문
  function demoForms() {
    try {
      var saved = JSON.parse(localStorage.getItem('rb-demo-forms') || 'null');
      if (saved) return saved;
    } catch (e) {}
    var S = window.SURVEYS || {};
    return Object.keys(S).map(function (k) { return { slug: k, status: 'open', def: S[k] }; });
  }
  function saveDemoForms(all) { localStorage.setItem('rb-demo-forms', JSON.stringify(all)); }

  var RB = { items: items, empty: empty, missing: missing, filterRows: filterRows, summarize: summarize,
    flagged: flagged, toCSV: toCSV, kst: kst, daily: daily, lockCheck: lockCheck, validateDef: validateDef,
    newId: newId, linkOf: linkOf, slugOk: slugOk, api: api };
  if (typeof module !== 'undefined') module.exports = RB;
  else window.RB = RB;
})();
