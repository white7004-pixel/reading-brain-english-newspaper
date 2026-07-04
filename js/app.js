/* =====================================================================
 * 리딩브레인 학습영상 분석 웹앱 — UI / 촬영 / 음성인식 / 차트 / 저장
 * ===================================================================== */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const STORAGE_KEY = "rb_records_v1";
  const APIKEY_KEY = "rb_api_key";
  const KAKAO_KEY = "rb_kakao_key";
  const KAKAO_CHANNEL = "rb_kakao_channel";

  const state = {
    activity: null,
    stream: null,
    recorder: null,
    chunks: [],
    videoBlob: null,
    recognition: null,
    recogLang: "ko-KR",
    finalTranscript: "",
    recordStart: 0,
    timerId: null,
    uploadDuration: 0,
    result: null,
    resultSaved: false,
    aiFeedbackText: "",
  };

  /* ================= 탭/화면 전환 ================= */
  function showView(id) {
    $$(".view").forEach((v) => v.classList.remove("active"));
    $("#view-" + id).classList.add("active");
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.view === id));
    window.scrollTo({ top: 0 });
  }
  $$(".tab").forEach((t) =>
    t.addEventListener("click", () => {
      if (t.dataset.view === "history") renderHistory();
      showView(t.dataset.view);
    })
  );

  /* ================= 활동 선택 ================= */
  $$(".activity-card").forEach((card) =>
    card.addEventListener("click", () => {
      $$(".activity-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      state.activity = card.dataset.activity;
      $("#vocabListCard").hidden = state.activity !== "vocab";
      $("#btnStartRecord").disabled = false;
      $("#btnUpload").disabled = false;
      // 활동별 기본 인식 언어
      state.recogLang = state.activity === "vocab" ? "en-US" : "ko-KR";
    })
  );

  function validateStudent() {
    if (!$("#studentName").value.trim()) {
      alert("학생 이름을 입력해 주세요.");
      return false;
    }
    if (!state.activity) {
      alert("활동을 선택해 주세요.");
      return false;
    }
    return true;
  }

  /* ================= 촬영 ================= */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  $("#btnStartRecord").addEventListener("click", async () => {
    if (!validateStudent()) return;
    try {
      state.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (e) {
      alert("카메라/마이크 권한이 필요합니다. 브라우저 설정에서 허용해 주세요.");
      return;
    }
    $("#recordTitle").textContent = RBAnalysis.ACTIVITIES[state.activity].name + " 촬영 중";
    $("#preview").srcObject = state.stream;
    $("#liveTranscript").innerHTML = "";
    state.finalTranscript = "";
    state.chunks = [];
    state.videoBlob = null;

    state.recorder = new MediaRecorder(state.stream);
    state.recorder.ondataavailable = (e) => e.data.size && state.chunks.push(e.data);
    state.recorder.start(1000);

    state.recordStart = Date.now();
    state.timerId = setInterval(updateTimer, 500);

    syncLangChips();
    startRecognition();
    showView("record");
  });

  function updateTimer() {
    const s = Math.floor((Date.now() - state.recordStart) / 1000);
    $("#recTimer").textContent =
      String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }

  function startRecognition() {
    if (!SR) {
      $("#liveTranscript").innerHTML =
        '<span class="interim">이 브라우저는 실시간 음성 인식을 지원하지 않습니다. 촬영 후 전사 내용을 직접 입력할 수 있습니다.</span>';
      return;
    }
    stopRecognition();
    const rec = new SR();
    rec.lang = state.recogLang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) state.finalTranscript += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      const box = $("#liveTranscript");
      box.innerHTML =
        escapeHtml(state.finalTranscript) +
        (interim ? '<span class="interim">' + escapeHtml(interim) + "</span>" : "");
      box.scrollTop = box.scrollHeight;
    };
    rec.onend = () => {
      // 사용자가 종료한 게 아니면 자동 재시작 (크롬은 주기적으로 세션을 끊음)
      if (state.recognition === rec) {
        try { rec.start(); } catch (_) {}
      }
    };
    rec.onerror = () => {};
    state.recognition = rec;
    try { rec.start(); } catch (_) {}
  }

  function stopRecognition() {
    if (state.recognition) {
      const r = state.recognition;
      state.recognition = null; // onend 재시작 방지
      try { r.stop(); } catch (_) {}
    }
  }

  // 인식 언어 전환 (독해: 영어 낭독 ↔ 한국어 해석)
  $("#langToggle").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    state.recogLang = btn.dataset.lang;
    syncLangChips();
    if (state.recognition) startRecognition();
  });
  function syncLangChips() {
    $$("#langToggle .chip").forEach((c) =>
      c.classList.toggle("active", c.dataset.lang === state.recogLang)
    );
  }

  $("#btnStopRecord").addEventListener("click", () => {
    const durationSec = Math.max(Math.round((Date.now() - state.recordStart) / 1000), 1);
    stopRecognition();
    clearInterval(state.timerId);

    const recorder = state.recorder;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = () => {
        state.videoBlob = new Blob(state.chunks, { type: recorder.mimeType || "video/webm" });
        cleanupStream();
        runAnalysis(state.finalTranscript, durationSec, true);
      };
      recorder.stop();
    } else {
      cleanupStream();
      runAnalysis(state.finalTranscript, durationSec, true);
    }
  });

  $("#btnCancelRecord").addEventListener("click", () => {
    stopRecognition();
    clearInterval(state.timerId);
    if (state.recorder && state.recorder.state !== "inactive") {
      state.recorder.onstop = null;
      state.recorder.stop();
    }
    cleanupStream();
    showView("home");
  });

  function cleanupStream() {
    if (state.stream) {
      state.stream.getTracks().forEach((t) => t.stop());
      state.stream = null;
    }
    $("#preview").srcObject = null;
  }

  /* ================= 업로드 ================= */
  $("#btnUpload").addEventListener("click", () => {
    if (!validateStudent()) return;
    $("#fileInput").click();
  });

  $("#fileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const video = $("#uploadPreview");
    video.src = url;
    video.onloadedmetadata = () => {
      state.uploadDuration = isFinite(video.duration) ? Math.round(video.duration) : 60;
    };
    state.videoBlob = file;
    $("#manualTranscript").value = "";
    showView("upload");
    e.target.value = "";
  });

  $("#btnAnalyzeUpload").addEventListener("click", () => {
    const transcript = $("#manualTranscript").value.trim();
    if (!transcript) {
      if (!confirm("전사 내용 없이 분석하면 발화 내용 기반 점수가 낮게 나옵니다. 계속할까요?")) return;
    }
    runAnalysis(transcript, state.uploadDuration || 60, false);
  });
  $("#btnCancelUpload").addEventListener("click", () => showView("home"));

  /* ================= 분석 실행 & 결과 렌더링 ================= */
  function runAnalysis(transcript, durationSec, fromRecording) {
    const result = RBAnalysis.analyze({
      activity: state.activity,
      transcript,
      durationSec,
      vocabListRaw: state.activity === "vocab" ? $("#vocabList").value : "",
    });
    result.student = {
      name: $("#studentName").value.trim(),
      grade: $("#studentGrade").value,
      klass: $("#studentClass").value.trim(),
    };
    result.transcript = transcript;
    result.date = new Date().toISOString();
    state.result = result;
    state.resultSaved = false;
    renderResult(result, fromRecording);
    showView("result");
  }

  function renderResult(r, fromRecording) {
    $("#resultActivityName").textContent = r.activityName + " 분석 결과";
    $("#resultMeta").textContent =
      `${r.student.name} · ${r.student.grade}${r.student.klass ? " · " + r.student.klass : ""} · ` +
      new Date(r.date).toLocaleString("ko-KR") +
      ` · 발화 ${fmtDur(r.metrics.durationSec)}`;
    $("#totalScore").textContent = r.total;
    $("#gradeLabel").textContent = r.grade + " 등급";

    // 지표 타일
    const m = r.metrics;
    const tiles = [
      ["총 단어 수", m.totalWords, "개"],
      ["말 속도", Math.round(m.wpm), "단어/분"],
      ["영어 비율", Math.round(m.englishRatio * 100), "%"],
      ["추임새", m.fillerCount, "회"],
    ];
    if (r.activity === "havruta") tiles.push(["질문 횟수", m.questionCount, "회"], ["문법 용어", m.grammarTermCount, "회"]);
    if (r.activity === "reading") tiles.push(["문장 수", m.sentenceCount, "문장"]);
    if (r.accuracyDetail) tiles.push(["단어 정답", `${r.accuracyDetail.hit}/${r.accuracyDetail.total}`, "개"]);
    $("#metricTiles").innerHTML = tiles
      .map(
        ([label, value, unit]) =>
          `<div class="metric-tile"><div class="m-label">${label}</div>` +
          `<div class="m-value">${value}<span class="m-unit"> ${unit}</span></div></div>`
      )
      .join("");

    renderRadar(r.axes);
    $("#axisBars").innerHTML = r.axes
      .map(
        (a) =>
          `<div class="axis-bar-row"><div class="axis-bar-head"><span>${a.axis}</span>` +
          `<span class="val">${a.score}점</span></div>` +
          `<div class="axis-bar-track"><div class="axis-bar-fill" style="width:${a.score}%"></div></div></div>`
      )
      .join("");

    $("#strengthsList").innerHTML = r.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    $("#improvementsList").innerHTML = r.improvements.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    $("#finalTranscript").textContent = r.transcript || "(전사 내용 없음)";

    $("#aiFeedback").hidden = true;
    $("#aiFeedback").textContent = "";
    $("#aiHint").hidden = !!localStorage.getItem(APIKEY_KEY);
    state.aiFeedbackText = "";
    $("#teacherComment").value = "";
    updateReportPreview();

    $("#btnDownloadVideo").hidden = !state.videoBlob;
  }

  /* ---------- 레이더 차트 (SVG) ---------- */
  function renderRadar(axes) {
    const W2 = 400, H2 = 320, cx = W2 / 2, cy = H2 / 2 + 6, R = 105;
    const n = axes.length;
    const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
    const pt = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];

    let svg = `<svg viewBox="0 0 ${W2} ${H2}" width="${W2}" height="${H2}" role="img" aria-label="영역별 성취도 레이더 차트">`;
    // 배경 그리드 (25점 간격)
    for (let level = 1; level <= 4; level++) {
      const r = (R * level) / 4;
      const pts = axes.map((_, i) => pt(i, r).map((v) => v.toFixed(1)).join(",")).join(" ");
      svg += `<polygon points="${pts}" fill="none" stroke="var(--grid)" stroke-width="1"/>`;
    }
    // 축선 + 라벨
    axes.forEach((a, i) => {
      const [x, y] = pt(i, R);
      svg += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--baseline)" stroke-width="1"/>`;
      const [lx, ly] = pt(i, R + 24);
      const anchor = Math.abs(lx - cx) < 8 ? "middle" : lx > cx ? "start" : "end";
      svg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="12" fill="var(--text-secondary)">${a.axis}</text>`;
      svg += `<text x="${lx.toFixed(1)}" y="${(ly + 14).toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="11" font-weight="700" fill="var(--text-primary)">${a.score}</text>`;
    });
    // 데이터 폴리곤
    const dataPts = axes.map((a, i) => pt(i, (R * a.score) / 100).map((v) => v.toFixed(1)).join(",")).join(" ");
    svg += `<polygon points="${dataPts}" fill="var(--series-1)" fill-opacity="0.18" stroke="var(--series-1)" stroke-width="2" stroke-linejoin="round"/>`;
    axes.forEach((a, i) => {
      const [x, y] = pt(i, (R * a.score) / 100);
      svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="var(--series-1)" stroke="var(--surface-1)" stroke-width="2"><title>${a.axis}: ${a.score}점</title></circle>`;
    });
    svg += "</svg>";
    $("#radarChart").innerHTML = svg;
  }

  /* ================= 결과 저장/다운로드 ================= */
  $("#btnSaveResult").addEventListener("click", () => {
    if (!state.result) return;
    if (state.resultSaved) { alert("이미 저장된 결과입니다."); return; }
    const records = loadRecords();
    const r = state.result;
    records.push({
      id: Date.now(),
      date: r.date,
      activity: r.activity,
      activityName: r.activityName,
      student: r.student,
      total: r.total,
      grade: r.grade,
      axes: r.axes,
      metrics: {
        durationSec: r.metrics.durationSec,
        totalWords: r.metrics.totalWords,
        wpm: Math.round(r.metrics.wpm),
        fillerCount: r.metrics.fillerCount,
      },
      aiFeedback: state.aiFeedbackText,
      teacherComment: $("#teacherComment").value.trim(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    state.resultSaved = true;
    alert("기록이 저장되었습니다. '성장 기록' 탭에서 추이를 확인하세요.");
  });

  $("#btnDownloadVideo").addEventListener("click", () => {
    if (!state.videoBlob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(state.videoBlob);
    const name = state.result ? state.result.student.name : "video";
    a.download = `리딩브레인_${name}_${new Date().toISOString().slice(0, 10)}.webm`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $("#btnNewAnalysis").addEventListener("click", () => showView("home"));

  /* ================= 기록 / 추이 차트 ================= */
  let historyFilter = "all";
  $("#historyFilter").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    historyFilter = btn.dataset.filter;
    $$("#historyFilter .chip").forEach((c) => c.classList.toggle("active", c === btn));
    renderHistory();
  });

  function loadRecords() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (_) { return []; }
  }

  function renderHistory() {
    const all = loadRecords().sort((a, b) => new Date(a.date) - new Date(b.date));
    const records = historyFilter === "all" ? all : all.filter((r) => r.activity === historyFilter);
    renderTrend(records);

    const list = $("#historyList");
    if (!records.length) {
      list.innerHTML = '<div class="empty-msg">저장된 기록이 없습니다. 분석 후 "기록 저장"을 눌러 보세요.</div>';
      return;
    }
    list.innerHTML = records
      .slice()
      .reverse()
      .map(
        (r) =>
          `<div class="history-item"><div class="h-info"><strong>${escapeHtml(r.student.name)}</strong> · ${r.activityName}` +
          `<div class="h-meta">${new Date(r.date).toLocaleString("ko-KR")} · ${fmtDur(r.metrics.durationSec)} · ${r.metrics.totalWords}단어</div></div>` +
          `<div class="h-score">${r.total}점 <small>${r.grade}</small></div>` +
          `<button class="h-del" data-id="${r.id}" title="삭제">✕</button></div>`
      )
      .join("");
    list.querySelectorAll(".h-del").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (!confirm("이 기록을 삭제할까요?")) return;
        const remain = loadRecords().filter((r) => String(r.id) !== btn.dataset.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remain));
        renderHistory();
      })
    );
  }

  /* ---------- 성장 추이 라인 차트 (SVG) ---------- */
  function renderTrend(records) {
    const wrap = $("#trendChart");
    if (records.length < 2) {
      wrap.innerHTML = '<div class="empty-msg">기록이 2개 이상 쌓이면 성장 추이 그래프가 표시됩니다.</div>';
      return;
    }
    const W = Math.max(560, records.length * 60), H = 260;
    const padL = 40, padR = 20, padT = 16, padB = 34;
    const x = (i) => padL + (i / (records.length - 1)) * (W - padL - padR);
    const y = (v) => padT + (1 - v / 100) * (H - padT - padB);

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="점수 성장 추이">`;
    // y축 그리드
    [0, 25, 50, 75, 100].forEach((v) => {
      svg += `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="var(--grid)" stroke-width="1"/>`;
      svg += `<text x="${padL - 8}" y="${y(v)}" text-anchor="end" dominant-baseline="middle" font-size="10" fill="var(--muted)">${v}</text>`;
    });
    // 라인
    const path = records.map((r, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(r.total).toFixed(1)}`).join(" ");
    svg += `<path d="${path}" fill="none" stroke="var(--series-1)" stroke-width="2" stroke-linejoin="round"/>`;
    // 포인트 + x라벨
    records.forEach((r, i) => {
      const d = new Date(r.date);
      svg += `<circle class="trend-pt" data-i="${i}" cx="${x(i).toFixed(1)}" cy="${y(r.total).toFixed(1)}" r="5" fill="var(--series-1)" stroke="var(--surface-1)" stroke-width="2"/>`;
      svg += `<text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="10" fill="var(--muted)">${d.getMonth() + 1}/${d.getDate()}</text>`;
    });
    svg += "</svg>";
    wrap.innerHTML = svg;

    // hover 툴팁
    const tip = getTooltip();
    wrap.querySelectorAll(".trend-pt").forEach((c) => {
      c.addEventListener("mouseenter", (e) => {
        const r = records[+c.dataset.i];
        tip.innerHTML =
          `<div class="t-title">${r.total}점 (${r.grade})</div>` +
          `<div class="t-sub">${escapeHtml(r.student.name)} · ${r.activityName}<br>${new Date(r.date).toLocaleDateString("ko-KR")}</div>`;
        tip.style.display = "block";
        positionTip(tip, e);
      });
      c.addEventListener("mousemove", (e) => positionTip(tip, e));
      c.addEventListener("mouseleave", () => (tip.style.display = "none"));
    });
  }

  function getTooltip() {
    let tip = $(".viz-tooltip");
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "viz-tooltip";
      document.body.appendChild(tip);
    }
    return tip;
  }
  function positionTip(tip, e) {
    tip.style.left = Math.min(e.clientX + 14, window.innerWidth - 180) + "px";
    tip.style.top = e.clientY - 10 + "px";
  }

  /* ================= Claude API 공통 호출 ================= */
  async function callClaude(system, userContent) {
    const key = localStorage.getItem(APIKEY_KEY);
    if (!key) {
      alert("설정 탭에서 Anthropic API 키를 먼저 등록해 주세요.");
      showView("settings");
      return null;
    }
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 1500,
        system,
        messages: [{ role: "user", content: userContent }],
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API 오류 (${res.status})`);
    }
    const data = await res.json();
    if (data.stop_reason === "refusal") throw new Error("AI가 이 요청을 처리하지 못했습니다.");
    return (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
  }

  function resultContext(r) {
    return (
      `활동: ${r.activityName}\n학생: ${r.student.name} (${r.student.grade}${r.student.klass ? " " + r.student.klass : ""})\n` +
      `발화 시간: ${fmtDur(r.metrics.durationSec)}\n` +
      `자동 분석 점수: 총점 ${r.total}점(${r.grade}) / ` +
      r.axes.map((a) => `${a.axis} ${a.score}점`).join(", ") +
      `\n\n--- 전사 내용 ---\n${r.transcript}`
    );
  }

  /* ================= AI 심층 피드백 (학생용) ================= */
  $("#btnAiFeedback").addEventListener("click", async () => {
    const r = state.result;
    if (!r) return;
    if (!r.transcript) { alert("전사 내용이 없어 AI 피드백을 생성할 수 없습니다."); return; }
    const btn = $("#btnAiFeedback");
    const out = $("#aiFeedback");
    btn.disabled = true;
    btn.textContent = "분석 중...";
    out.hidden = false;
    out.textContent = "AI 선생님이 영상 내용을 분석하고 있어요...";
    try {
      const text = await callClaude(
        "당신은 리딩브레인 영어학원 중고등특목2관의 베테랑 영어 강사입니다. " +
          "학생의 학습 활동 영상 전사 내용과 자동 분석 지표를 보고, 따뜻하지만 구체적인 한국어 피드백을 작성하세요. " +
          "형식: ① 오늘 잘한 점 2~3가지 (전사 내용에서 실제 표현을 인용) ② 고칠 점 2~3가지 (틀린 문법 용어 설명이나 어색한 해석이 있으면 정확히 짚고 교정) ③ 다음 학습 미션 1가지. " +
          "중고등학생이 읽기 쉽게, 500자 내외로 작성하세요.",
        resultContext(r)
      );
      if (text !== null) {
        out.textContent = text || "응답이 비어 있습니다.";
        state.aiFeedbackText = text || "";
        updateReportPreview();
      } else {
        out.hidden = true;
      }
    } catch (e) {
      out.textContent = "AI 피드백 요청 실패: " + e.message + "\nAPI 키와 네트워크 연결을 확인해 주세요.";
    } finally {
      btn.disabled = false;
      btn.textContent = "AI 피드백 받기";
    }
  });

  /* ================= 선생님 코멘트 AI 초안 ================= */
  $("#btnTeacherDraft").addEventListener("click", async () => {
    const r = state.result;
    if (!r) return;
    if (!r.transcript) { alert("전사 내용이 없어 초안을 생성할 수 없습니다."); return; }
    const btn = $("#btnTeacherDraft");
    btn.disabled = true;
    btn.textContent = "초안 작성 중...";
    try {
      const existing = $("#teacherComment").value.trim();
      const text = await callClaude(
        "당신은 리딩브레인 영어학원 중고등특목2관 담당 선생님입니다. " +
          "학부모님(어머님)께 카카오톡으로 보낼 코멘트를 선생님의 목소리로 작성하세요. " +
          "존댓말로 정중하고 따뜻하게, 오늘 학생이 잘한 점 → 보완할 점 → 가정에서 도와주실 부분 순서로, 300자 내외. " +
          "인사말(예: '어머님, 안녕하세요. 리딩브레인 중고등특목2관입니다.')로 시작하세요." +
          (existing ? " 선생님이 미리 적어 둔 메모를 자연스럽게 반영하세요: " + existing : ""),
        resultContext(r)
      );
      if (text !== null) {
        $("#teacherComment").value = text.trim();
        updateReportPreview();
      }
    } catch (e) {
      alert("초안 생성 실패: " + e.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "🤖 AI 초안 생성";
    }
  });
  $("#teacherComment").addEventListener("input", updateReportPreview);

  /* ================= 학부모 리포트 생성/전송 ================= */
  function buildReport() {
    const r = state.result;
    if (!r) return "";
    const lines = [
      "📚 리딩브레인 영어학원 중고등특목2관",
      "오늘의 학습 리포트",
      "─────────────────",
      `학생: ${r.student.name} (${r.student.grade}${r.student.klass ? " · " + r.student.klass : ""})`,
      `활동: ${r.activityName}`,
      `일시: ${new Date(r.date).toLocaleString("ko-KR")}`,
      `발화 시간: ${fmtDur(r.metrics.durationSec)}`,
      "",
      `🏆 종합 성취도: ${r.total}점 (${r.grade} 등급)`,
      ...r.axes.map((a) => `  · ${a.axis}: ${a.score}점`),
      "",
      "✅ 잘한 점",
      ...r.strengths.map((s) => `  · ${s}`),
      "",
      "📈 개선할 점",
      ...r.improvements.map((s) => `  · ${s}`),
    ];
    if (state.aiFeedbackText) {
      lines.push("", "🤖 AI 선생님 심층 피드백", state.aiFeedbackText);
    }
    const teacher = $("#teacherComment").value.trim();
    if (teacher) {
      lines.push("", "👩‍🏫 담당 선생님 코멘트", teacher);
    }
    lines.push("", "─────────────────", "리딩브레인 영어학원 중고등특목2관 드림");
    return lines.join("\n");
  }

  function updateReportPreview() {
    const el = $("#reportPreview");
    if (el) el.textContent = buildReport();
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }

  $("#btnCopyReport").addEventListener("click", async () => {
    const ok = await copyText(buildReport());
    alert(ok ? "리포트가 복사되었습니다. 카카오톡 대화방에 붙여넣어 전송하세요." : "복사에 실패했습니다.");
  });

  /* ---------- 카카오 SDK ---------- */
  function ensureKakao() {
    return new Promise((resolve) => {
      const key = localStorage.getItem(KAKAO_KEY);
      if (!key) return resolve(null);
      if (window.Kakao && window.Kakao.isInitialized()) return resolve(window.Kakao);
      if (window.Kakao) {
        try { window.Kakao.init(key); } catch (_) {}
        return resolve(window.Kakao.isInitialized() ? window.Kakao : null);
      }
      const s = document.createElement("script");
      s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
      s.crossOrigin = "anonymous";
      s.onload = () => {
        try { window.Kakao.init(key); resolve(window.Kakao); }
        catch (_) { resolve(null); }
      };
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
    });
  }

  $("#btnKakaoShare").addEventListener("click", async () => {
    const report = buildReport();
    if (!report) return;
    // 전문은 항상 클립보드에 (카카오 텍스트 템플릿은 200자 제한)
    await copyText(report);
    const kakao = await ensureKakao();
    if (kakao && kakao.Share) {
      const r = state.result;
      const summary =
        `[리딩브레인] ${r.student.name} 학생 ${r.activityName} 리포트\n` +
        `종합 ${r.total}점 (${r.grade} 등급) · ${new Date(r.date).toLocaleDateString("ko-KR")}\n` +
        `상세 리포트 전문은 이어지는 메시지로 붙여넣어 보내드립니다.`;
      try {
        kakao.Share.sendDefault({
          objectType: "text",
          text: summary.slice(0, 200),
          link: { webUrl: location.href, mobileWebUrl: location.href },
        });
        alert("카카오톡 공유창이 열렸습니다.\n리포트 전문은 이미 복사되어 있으니, 같은 대화방에 붙여넣어 이어서 보내주세요.");
        return;
      } catch (_) { /* 아래 폴백으로 */ }
    }
    // 폴백: 기기 공유 → 안내
    if (navigator.share) {
      try {
        await navigator.share({ title: "리딩브레인 학습 리포트", text: report });
        return;
      } catch (_) { /* 사용자가 취소했거나 미지원 */ }
    }
    alert(
      "리포트가 복사되었습니다!\n카카오톡에서 어머님 대화방을 열어 붙여넣기 하시면 바로 전송됩니다.\n\n" +
      "(설정 탭에 카카오 JavaScript 키를 등록하면 공유창이 바로 열립니다.)"
    );
  });

  /* 영상 + 리포트 함께 보내기: 모바일 공유시트(카카오톡 선택) → 폴백: 다운로드+복사 */
  $("#btnShareVideo").addEventListener("click", async () => {
    const report = buildReport();
    if (!state.videoBlob) {
      alert("이번 분석에는 영상 파일이 없습니다. 촬영 또는 업로드한 영상이 있을 때 사용할 수 있어요.");
      return;
    }
    const r = state.result;
    const file = new File(
      [state.videoBlob],
      `리딩브레인_${r ? r.student.name : "학습"}영상.${(state.videoBlob.type || "").includes("mp4") ? "mp4" : "webm"}`,
      { type: state.videoBlob.type || "video/webm" }
    );
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "리딩브레인 학습 리포트",
          text: report,
        });
        return;
      } catch (e) {
        if (e.name === "AbortError") return; // 사용자가 공유 취소
      }
    }
    // PC 등 파일 공유 미지원: 영상 다운로드 + 리포트 복사
    await copyText(report);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(state.videoBlob);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
    alert(
      "이 기기에서는 파일 공유창을 지원하지 않아,\n① 영상 파일을 다운로드했고 ② 리포트를 복사해 두었습니다.\n" +
      "카카오톡 어머님 대화방에 영상 파일을 첨부하고 리포트를 붙여넣어 함께 보내주세요.\n\n" +
      "(휴대폰에서 열면 공유 버튼 한 번으로 영상+리포트가 카카오톡으로 바로 전송됩니다.)"
    );
  });

  $("#btnChannelChat").addEventListener("click", () => {
    const channel = (localStorage.getItem(KAKAO_CHANNEL) || DEFAULT_CHANNEL).trim();
    const id = channel.startsWith("_") ? channel : "_" + channel;
    window.open(`https://pf.kakao.com/${id}/chat`, "_blank", "noopener");
  });

  /* ================= 채널 소식글 생성 (채널 어투 학습) ================= */
  const DEFAULT_CHANNEL = "_KnBMb"; // 리딩브레인 영어학원 공식 채널
  const SAMPLES_KEY = "rb_channel_samples";
  // 채널 게시글 샘플이 없을 때 사용하는 기본 어투 프로필
  const DEFAULT_STYLE =
    "밝고 활기찬 학원 공지 어투. 존댓말 사용, 문장 끝에 어울리는 이모지(📚✨💪🎉😊👏🔥)를 자연스럽게 1개씩 배치. " +
    "'안녕하세요! 리딩브레인 영어학원입니다 😊' 류의 인사로 시작, 핵심 내용은 짧은 문단·줄바꿈으로 보기 좋게 구성, " +
    "학생 칭찬을 아끼지 않고, 마지막은 '오늘도 리딩브레인과 함께 성장해요! 💙' 같은 응원 문구로 마무리.";

  $("#btnChannelPost").addEventListener("click", async () => {
    const r = state.result;
    if (!r) return;
    const btn = $("#btnChannelPost");
    btn.disabled = true;
    btn.textContent = "작성 중...";
    try {
      const samples = (localStorage.getItem(SAMPLES_KEY) || "").trim();
      const styleGuide = samples
        ? "아래는 우리 채널의 실제 게시글들이다. 문체, 인사말, 이모지 사용 패턴, 문단 구성을 그대로 따라 하라.\n\n--- 채널 게시글 샘플 ---\n" + samples
        : "채널 어투 가이드: " + DEFAULT_STYLE;
      const text = await callClaude(
        "당신은 리딩브레인 영어학원(중고등특목2관) 카카오톡 채널 운영자입니다. " +
          "학생의 오늘 학습 성과를 소개하는 채널 소식글을 작성하세요. 이모지를 적극 활용하고, " +
          "학생 개인정보 보호를 위해 이름은 성만 남기고 'ㅇ' 처리하세요(예: 김ㅇㅇ 학생). 400자 내외.\n\n" + styleGuide,
        resultContext(r)
      );
      if (text !== null) {
        $("#channelPost").hidden = false;
        $("#channelPost").value = text.trim();
        $("#channelPostActions").hidden = false;
      }
    } catch (e) {
      alert("소식글 생성 실패: " + e.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "✍️ 채널 어투 소식글 생성";
    }
  });

  $("#btnCopyChannelPost").addEventListener("click", async () => {
    const ok = await copyText($("#channelPost").value);
    alert(ok ? "소식글이 복사되었습니다. 채널 관리자센터의 '소식 올리기'에 붙여넣으세요." : "복사에 실패했습니다.");
  });
  $("#btnOpenChannelAdmin").addEventListener("click", () => {
    window.open("https://center-pf.kakao.com/", "_blank", "noopener");
  });

  /* ================= 카드뉴스 생성 (Canvas) ================= */
  const BRAND_NAVY = "#16395e";
  const BRAND_BURGUNDY = "#8e1f24";

  /* 원본 로고 파일(assets/logo.png)이 있으면 우선 사용, 없으면 인라인 SVG 재현본 사용 */
  function logoImage() {
    return new Promise((resolve) => {
      const png = new Image();
      png.onload = () => resolve(png);
      png.onerror = () => {
        const svgEl = document.querySelector(".brand-logo");
        if (!svgEl) return resolve(null);
        const clone = svgEl.cloneNode(true);
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clone.setAttribute("width", "400");
        clone.setAttribute("height", "404");
        const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
        img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
        img.src = url;
      };
      png.src = "assets/logo.png";
    });
  }

  /* 원본 로고가 있으면 헤더 SVG도 원본으로 교체 */
  (function swapHeaderLogo() {
    const png = new Image();
    png.onload = () => {
      const svgEl = document.querySelector(".brand-logo");
      if (!svgEl) return;
      const img = document.createElement("img");
      img.src = "assets/logo.png";
      img.alt = "Reading Brain 로고";
      img.className = "brand-logo";
      svgEl.replaceWith(img);
    };
    png.src = "assets/logo.png";
  })();

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = text.split(/\s+/).filter(Boolean);
    let line = "", lines = 0;
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines++;
        if (maxLines && lines >= maxLines) {
          // 마지막 허용 줄: 남은 텍스트를 전부 시도하고, 넘치면 말줄임
          let rest = [w, ...words.slice(i + 1)].join(" ");
          let lastLine = line + " " + rest;
          if (ctx.measureText(lastLine).width <= maxWidth) {
            ctx.fillText(lastLine, x, y);
          } else {
            while (ctx.measureText(line + "…").width > maxWidth && line.length > 1) line = line.slice(0, -1);
            ctx.fillText(line + "…", x, y);
          }
          return y + lineHeight;
        }
        ctx.fillText(line, x, y);
        y += lineHeight;
        line = w;
      } else line = test;
    }
    if (line) { ctx.fillText(line, x, y); y += lineHeight; }
    return y;
  }

  function newCard() {
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1080;
    const ctx = c.getContext("2d");
    return [c, ctx];
  }
  const FONT = "'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif";
  const PAPER = "#faf8f4", INK = "#22211f", INK_MUTE = "#8b8880", TRACK = "#e7e3da", TINT = "#eef2f7";
  const MARGIN = 90;

  function setSpacing(ctx, px) { try { ctx.letterSpacing = px + "px"; } catch (_) {} }

  /* 상단 헤더: 영문 아이브로우 + 한글 타이틀 + 헤어라인 */
  function cardHeader(ctx, eyebrow, title) {
    ctx.textAlign = "left";
    ctx.fillStyle = BRAND_BURGUNDY;
    ctx.font = "700 26px " + FONT;
    setSpacing(ctx, 6);
    ctx.fillText(eyebrow.toUpperCase(), MARGIN, 140);
    setSpacing(ctx, 0);
    ctx.fillStyle = BRAND_NAVY;
    ctx.font = "800 64px " + FONT;
    ctx.fillText(title, MARGIN, 226);
    ctx.strokeStyle = "#d9d4c8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(MARGIN, 268);
    ctx.lineTo(1080 - MARGIN, 268);
    ctx.stroke();
  }

  /* 하단 푸터: 페이지 도트 + 브랜드 캡션 */
  function cardFooter(ctx, pageNo, total, dark) {
    const cy = 1002;
    for (let i = 0; i < total; i++) {
      ctx.beginPath();
      ctx.arc(540 + (i - (total - 1) / 2) * 34, cy, i + 1 === pageNo ? 7 : 5, 0, Math.PI * 2);
      if (dark) ctx.fillStyle = i + 1 === pageNo ? "#ffffff" : "rgba(255,255,255,0.35)";
      else ctx.fillStyle = i + 1 === pageNo ? BRAND_BURGUNDY : "#cfcabd";
      ctx.fill();
    }
    ctx.fillStyle = dark ? "rgba(255,255,255,0.55)" : INK_MUTE;
    ctx.font = "600 22px " + FONT;
    setSpacing(ctx, 4);
    ctx.textAlign = "center";
    ctx.fillText("READING BRAIN · 중고등특목2관", 540, 1046);
    setSpacing(ctx, 0);
    ctx.textAlign = "left";
  }

  /* 라벨 칩 */
  function labelChip(ctx, text, x, y, color) {
    ctx.font = "700 28px " + FONT;
    const w = ctx.measureText(text).width + 44;
    ctx.fillStyle = color;
    roundRect(ctx, x, y - 34, w, 48, 24);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x + 22, y);
    return w;
  }

  async function generateCardNews() {
    const r = state.result;
    if (!r) return [];
    const logo = await logoImage();
    const cards = [];
    const maskedName = r.student.name.length > 1 ? r.student.name[0] + "ㅇ".repeat(r.student.name.length - 1) : r.student.name;
    const dateStr = new Date(r.date).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

    /* ================= 1. 표지 ================= */
    {
      const [c, ctx] = newCard();
      // 네이비 그라운드 + 은은한 대형 링 장식
      ctx.fillStyle = BRAND_NAVY;
      ctx.fillRect(0, 0, 1080, 1080);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 90;
      ctx.beginPath(); ctx.arc(1020, 80, 320, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(40, 1040, 260, 0, Math.PI * 2); ctx.stroke();

      // 로고 메달리온 (이중 링)
      ctx.beginPath(); ctx.arc(540, 360, 218, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff"; ctx.fill();
      ctx.beginPath(); ctx.arc(540, 360, 244, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 3; ctx.stroke();
      if (logo) ctx.drawImage(logo, 362, 172, 356, 360);

      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "700 26px " + FONT;
      setSpacing(ctx, 8);
      ctx.fillText("READING BRAIN LEARNING REPORT", 540, 682);
      setSpacing(ctx, 0);

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 88px " + FONT;
      ctx.fillText("오늘의 학습 리포트", 540, 786);

      // 버건디 포인트 라인
      ctx.fillStyle = BRAND_BURGUNDY;
      ctx.fillRect(508, 822, 64, 6);

      ctx.font = "700 42px " + FONT;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(r.activityName, 540, 894);
      ctx.font = "500 32px " + FONT;
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.fillText(`${maskedName} 학생 · ${r.student.grade} · ${dateStr}`, 540, 946);

      cardFooter(ctx, 1, 3, true);
      cards.push(c);
    }

    /* ================= 2. 성취도 ================= */
    {
      const [c, ctx] = newCard();
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, 1080, 1080);
      cardHeader(ctx, "Achievement Report", "성취도 분석");

      // 도넛 게이지
      const dx = 290, dy = 520, dr = 158;
      ctx.lineWidth = 36;
      ctx.lineCap = "round";
      ctx.strokeStyle = TRACK;
      ctx.beginPath(); ctx.arc(dx, dy, dr, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = BRAND_NAVY;
      ctx.beginPath();
      ctx.arc(dx, dy, dr, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (r.total / 100));
      ctx.stroke();
      ctx.lineCap = "butt";
      ctx.textAlign = "center";
      ctx.fillStyle = BRAND_NAVY;
      ctx.font = "800 118px " + FONT;
      ctx.fillText(String(r.total), dx, dy + 24);
      ctx.fillStyle = INK_MUTE;
      ctx.font = "600 28px " + FONT;
      ctx.fillText("종합 점수", dx, dy + 74);
      // 등급 필
      ctx.font = "800 34px " + FONT;
      const gw = ctx.measureText(r.grade + " 등급").width + 60;
      ctx.fillStyle = BRAND_BURGUNDY;
      roundRect(ctx, dx - gw / 2, dy + 208, gw, 62, 31);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(r.grade + " 등급", dx, dy + 251);

      // 영역별 바
      ctx.textAlign = "left";
      const bx = 560, bw = 430;
      let y = 360;
      r.axes.forEach((a) => {
        ctx.fillStyle = INK;
        ctx.font = "700 32px " + FONT;
        ctx.fillText(a.axis, bx, y);
        ctx.fillStyle = BRAND_NAVY;
        ctx.font = "800 32px " + FONT;
        ctx.textAlign = "right";
        ctx.fillText(a.score, bx + bw, y);
        ctx.textAlign = "left";
        ctx.fillStyle = TRACK;
        roundRect(ctx, bx, y + 18, bw, 20, 10);
        ctx.fillStyle = BRAND_NAVY;
        roundRect(ctx, bx, y + 18, Math.max(bw * a.score / 100, 20), 20, 10);
        y += 106;
      });

      // 하단 지표 스트립
      ctx.fillStyle = TINT;
      roundRect(ctx, MARGIN, 856, 1080 - MARGIN * 2, 104, 16);
      const stats = [
        ["발화 시간", fmtDur(r.metrics.durationSec)],
        ["총 단어", r.metrics.totalWords + "개"],
        ["말 속도", Math.round(r.metrics.wpm) + "단어/분"],
      ];
      const cellW = (1080 - MARGIN * 2) / 3;
      stats.forEach(([label, val], i) => {
        const cxm = MARGIN + cellW * i + cellW / 2;
        ctx.textAlign = "center";
        ctx.fillStyle = INK_MUTE;
        ctx.font = "600 24px " + FONT;
        ctx.fillText(label, cxm, 898);
        ctx.fillStyle = BRAND_NAVY;
        ctx.font = "800 34px " + FONT;
        ctx.fillText(val, cxm, 942);
        if (i) {
          ctx.strokeStyle = "#d9d4c8"; ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(MARGIN + cellW * i, 880);
          ctx.lineTo(MARGIN + cellW * i, 936);
          ctx.stroke();
        }
      });
      ctx.textAlign = "left";

      cardFooter(ctx, 2, 3, false);
      cards.push(c);
    }

    /* ================= 3. 선생님 한마디 ================= */
    {
      const [c, ctx] = newCard();
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, 1080, 1080);
      cardHeader(ctx, "Teacher's Note", "선생님 한마디");

      let y = 340;
      const teacher = $("#teacherComment").value.trim();
      const quote = teacher || state.aiFeedbackText || r.strengths[0] || "";
      if (quote) {
        // 인용 블록: 좌측 버건디 룰 + 큰 따옴표
        ctx.fillStyle = BRAND_BURGUNDY;
        ctx.fillRect(MARGIN, y - 44, 6, 250);
        ctx.font = "800 120px Georgia, serif";
        ctx.fillStyle = "rgba(142,31,36,0.25)";
        ctx.fillText("“", MARGIN + 34, y + 26);
        ctx.fillStyle = INK;
        ctx.font = "500 36px " + FONT;
        y = wrapText(ctx, quote, MARGIN + 110, y, 1080 - MARGIN * 2 - 130, 58, 5);
        y += 56;
      }

      // 잘한 점
      labelChip(ctx, "오늘 잘한 점", MARGIN, y, BRAND_NAVY);
      y += 56;
      ctx.font = "400 32px " + FONT;
      for (const s of r.strengths.slice(0, 2)) {
        ctx.fillStyle = BRAND_NAVY;
        ctx.fillRect(MARGIN + 6, y - 22, 12, 12);
        ctx.fillStyle = INK;
        y = wrapText(ctx, s, MARGIN + 40, y, 1080 - MARGIN * 2 - 40, 46, 2) + 14;
      }
      y += 34;
      // 보완할 점
      labelChip(ctx, "함께 보완할 점", MARGIN, y, BRAND_BURGUNDY);
      y += 56;
      ctx.font = "400 32px " + FONT;
      for (const s of r.improvements.slice(0, 2)) {
        if (y > 930) break;
        ctx.fillStyle = BRAND_BURGUNDY;
        ctx.fillRect(MARGIN + 6, y - 22, 12, 12);
        ctx.fillStyle = INK;
        y = wrapText(ctx, s, MARGIN + 40, y, 1080 - MARGIN * 2 - 40, 46, 2) + 14;
      }

      cardFooter(ctx, 3, 3, false);
      cards.push(c);
    }
    return cards;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  }

  let cardCanvases = [];
  $("#btnCardNews").addEventListener("click", async () => {
    const btn = $("#btnCardNews");
    btn.disabled = true;
    btn.textContent = "생성 중...";
    try {
      cardCanvases = await generateCardNews();
      const wrap = $("#cardNewsWrap");
      wrap.innerHTML = "";
      cardCanvases.forEach((c) => {
        c.className = "cardnews-canvas";
        wrap.appendChild(c);
      });
      wrap.hidden = false;
      $("#cardNewsActions").hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = "🖼️ 카드뉴스 생성";
    }
  });

  $("#btnDownloadCards").addEventListener("click", () => {
    const name = state.result ? state.result.student.name : "리포트";
    cardCanvases.forEach((c, i) => {
      const a = document.createElement("a");
      a.href = c.toDataURL("image/png");
      a.download = `리딩브레인_카드뉴스_${name}_${i + 1}.png`;
      a.click();
    });
  });

  /* ================= 설정 ================= */
  $("#apiKey").value = localStorage.getItem(APIKEY_KEY) || "";
  $("#kakaoKey").value = localStorage.getItem(KAKAO_KEY) || "";
  $("#kakaoChannel").value = localStorage.getItem(KAKAO_CHANNEL) || "_KnBMb";
  $("#channelSamples").value = localStorage.getItem(SAMPLES_KEY) || "";

  $("#btnSaveKakao").addEventListener("click", () => {
    localStorage.setItem(KAKAO_KEY, $("#kakaoKey").value.trim());
    localStorage.setItem(KAKAO_CHANNEL, $("#kakaoChannel").value.trim() || "_KnBMb");
    alert("카카오톡 연결 정보가 저장되었습니다.");
  });
  $("#btnSaveSamples").addEventListener("click", () => {
    localStorage.setItem(SAMPLES_KEY, $("#channelSamples").value.trim());
    alert("채널 어투 샘플이 저장되었습니다. 이제 소식글을 이 어투로 작성합니다.");
  });
  $("#btnSaveKey").addEventListener("click", () => {
    const v = $("#apiKey").value.trim();
    if (!v) { alert("API 키를 입력해 주세요."); return; }
    localStorage.setItem(APIKEY_KEY, v);
    alert("API 키가 이 브라우저에 저장되었습니다.");
  });
  $("#btnDeleteKey").addEventListener("click", () => {
    localStorage.removeItem(APIKEY_KEY);
    $("#apiKey").value = "";
    alert("API 키가 삭제되었습니다.");
  });

  $("#btnExportData").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(loadRecords(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `리딩브레인_기록_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("#btnClearData").addEventListener("click", () => {
    if (!confirm("모든 학습 기록을 삭제할까요? 되돌릴 수 없습니다.")) return;
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
    alert("모든 기록이 삭제되었습니다.");
  });

  /* ================= 유틸 ================= */
  function fmtDur(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return m ? `${m}분 ${s}초` : `${s}초`;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
})();
