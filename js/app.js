/* =====================================================================
 * 리딩브레인 학습영상 분석 웹앱 — UI / 촬영 / 음성인식 / 차트 / 저장
 * ===================================================================== */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const STORAGE_KEY = "rb_records_v1";
  const APIKEY_KEY = "rb_api_key";

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

  /* ================= AI 심층 피드백 (Claude API) ================= */
  $("#btnAiFeedback").addEventListener("click", async () => {
    const key = localStorage.getItem(APIKEY_KEY);
    if (!key) {
      alert("설정 탭에서 Anthropic API 키를 먼저 등록해 주세요.");
      showView("settings");
      return;
    }
    const r = state.result;
    if (!r) return;
    if (!r.transcript) {
      alert("전사 내용이 없어 AI 피드백을 생성할 수 없습니다.");
      return;
    }
    const btn = $("#btnAiFeedback");
    btn.disabled = true;
    btn.textContent = "분석 중...";
    const out = $("#aiFeedback");
    out.hidden = false;
    out.textContent = "AI 선생님이 영상 내용을 분석하고 있어요...";

    try {
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
          system:
            "당신은 리딩브레인 영어학원 중고등특목2관의 베테랑 영어 강사입니다. " +
            "학생의 학습 활동 영상 전사 내용과 자동 분석 지표를 보고, 따뜻하지만 구체적인 한국어 피드백을 작성하세요. " +
            "형식: ① 오늘 잘한 점 2~3가지 (전사 내용에서 실제 표현을 인용) ② 고칠 점 2~3가지 (틀린 문법 용어 설명이나 어색한 해석이 있으면 정확히 짚고 교정) ③ 다음 학습 미션 1가지. " +
            "중고등학생이 읽기 쉽게, 500자 내외로 작성하세요.",
          messages: [
            {
              role: "user",
              content:
                `활동: ${r.activityName}\n학생: ${r.student.name} (${r.student.grade})\n` +
                `발화 시간: ${fmtDur(r.metrics.durationSec)}\n` +
                `자동 분석 점수: 총점 ${r.total}점 / ` +
                r.axes.map((a) => `${a.axis} ${a.score}점`).join(", ") +
                `\n\n--- 전사 내용 ---\n${r.transcript}`,
            },
          ],
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API 오류 (${res.status})`);
      }
      const data = await res.json();
      if (data.stop_reason === "refusal") {
        out.textContent = "AI가 이 요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      } else {
        const text = (data.content || [])
          .filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("\n");
        out.textContent = text || "응답이 비어 있습니다.";
      }
    } catch (e) {
      out.textContent = "AI 피드백 요청 실패: " + e.message +
        "\nAPI 키가 올바른지, 네트워크 연결이 되어 있는지 확인해 주세요.";
    } finally {
      btn.disabled = false;
      btn.textContent = "AI 피드백 받기";
    }
  });

  /* ================= 설정 ================= */
  $("#apiKey").value = localStorage.getItem(APIKEY_KEY) || "";
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
