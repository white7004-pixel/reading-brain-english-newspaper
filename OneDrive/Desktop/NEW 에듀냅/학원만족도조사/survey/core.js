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

  function filterRows(rows, f) {
    return rows.filter(function (r) {
      var a = r.answers || {};
      if (f.grade && [].concat(a.grade || []).indexOf(f.grade) < 0) return false; // 학부모는 학년 여러 개
      if (f.curriculum && (a.curricula || []).indexOf(f.curriculum) < 0) return false;
      return true;
    });
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
    }
  };
  function demoRows() {
    try { return JSON.parse(localStorage.getItem('rb-demo-rows') || '[]'); } catch (e) { return []; }
  }

  var RB = { items: items, empty: empty, missing: missing, filterRows: filterRows, summarize: summarize,
    flagged: flagged, toCSV: toCSV, kst: kst, daily: daily, api: api };
  if (typeof module !== 'undefined') module.exports = RB;
  else window.RB = RB;
})();
