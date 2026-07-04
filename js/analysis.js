/* =====================================================================
 * 리딩브레인 학습영상 분석 엔진 (규칙 기반)
 * 전사 텍스트 + 발화 시간으로 활동별 5개 영역 성취도를 산출한다.
 * ===================================================================== */
(function (global) {
  "use strict";

  const ACTIVITIES = {
    havruta: {
      name: "문법 하브루타",
      axes: ["발화 지속력", "질문 생성력", "문법 용어 활용", "논리 전개", "유창성"],
    },
    reading: {
      name: "독해 읽고 해석",
      axes: ["낭독 분량", "영어 낭독", "해석 완성도", "문장 완성도", "유창성"],
    },
    vocab: {
      name: "단어 구술테스트",
      axes: ["암기량", "응답 속도", "정확도", "영·한 짝짓기", "유창성"],
    },
  };

  const FILLERS = ["음", "어", "그", "아", "막", "뭐지", "그니까", "um", "uh", "erm", "hmm", "like"];
  const CONNECTIVES = [
    "왜냐하면", "그래서", "그러니까", "따라서", "예를 들어", "예를들어", "즉", "먼저", "다음으로",
    "반면에", "그런데", "결론적으로", "because", "so", "therefore", "for example", "first", "then", "however",
  ];
  const QUESTION_WORDS = [
    "왜", "어떻게", "무엇", "뭐야", "뭘까", "일까", "인가요", "할까", "어때", "맞아", "맞나",
    "why", "how", "what", "which", "when", "who", "right?",
  ];
  const GRAMMAR_TERMS = [
    "주어", "동사", "목적어", "보어", "수식", "관계대명사", "관계부사", "관계사", "분사", "분사구문",
    "부정사", "to부정사", "동명사", "수동태", "능동태", "가정법", "시제", "현재완료", "과거완료", "미래완료",
    "접속사", "전치사", "형용사", "부사", "명사절", "부사절", "형용사절", "비교급", "최상급", "원급",
    "도치", "강조", "생략", "수일치", "일치", "문장성분", "5형식", "4형식", "3형식", "2형식", "1형식",
    "구", "절", "선행사", "의문사", "조동사", "사역동사", "지각동사",
  ];

  /* ---------- 기초 지표 ---------- */
  function baseMetrics(transcript, durationSec) {
    const text = (transcript || "").trim();
    const tokens = text.length ? text.split(/\s+/).filter(Boolean) : [];
    const isEng = (t) => /[a-zA-Z]/.test(t) && !/[가-힣]/.test(t);
    const isKor = (t) => /[가-힣]/.test(t);

    const englishTokens = tokens.filter(isEng);
    const koreanTokens = tokens.filter(isKor);
    const minutes = Math.max(durationSec, 1) / 60;

    const lower = text.toLowerCase();
    const countOcc = (list) =>
      list.reduce((n, w) => {
        let i = 0, c = 0;
        const needle = w.toLowerCase();
        while ((i = lower.indexOf(needle, i)) !== -1) { c++; i += needle.length; }
        return n + c;
      }, 0);

    const fillerCount = tokens.filter((t) =>
      FILLERS.includes(t.replace(/[.,!?~…]/g, "").toLowerCase())
    ).length;

    const sentences = text.split(/[.!?。\n]+/).map((s) => s.trim()).filter((s) => s.length > 1);
    const uniqueTokens = new Set(tokens.map((t) => t.toLowerCase()));

    let questionCount = (text.match(/\?/g) || []).length;
    questionCount += countOcc(QUESTION_WORDS.filter((w) => w !== "right?"));

    return {
      durationSec,
      minutes,
      totalWords: tokens.length,
      englishWords: englishTokens.length,
      koreanWords: koreanTokens.length,
      englishRatio: tokens.length ? englishTokens.length / tokens.length : 0,
      koreanRatio: tokens.length ? koreanTokens.length / tokens.length : 0,
      wpm: tokens.length / minutes,
      fillerCount,
      fillerRate: tokens.length ? fillerCount / tokens.length : 0,
      sentenceCount: sentences.length,
      avgSentenceLen: sentences.length
        ? sentences.reduce((n, s) => n + s.split(/\s+/).length, 0) / sentences.length
        : 0,
      uniqueRatio: tokens.length ? uniqueTokens.size / tokens.length : 0,
      questionCount,
      connectiveCount: countOcc(CONNECTIVES),
      grammarTermCount: countOcc(GRAMMAR_TERMS),
      tokens,
    };
  }

  /* 목표 구간 기반 점수화: value가 [lo, hi] 안이면 100, 밖이면 선형 감점 */
  function bandScore(value, lo, hi, zero) {
    if (value >= lo && value <= hi) return 100;
    if (value < lo) return clamp(100 * (value / Math.max(lo, 0.0001)), 0, 100);
    // hi 초과: zero 지점에서 40점까지 감소
    const over = value - hi;
    const range = Math.max(zero - hi, 0.0001);
    return clamp(100 - (over / range) * 60, 40, 100);
  }
  /* 목표치 도달 비율 점수화 */
  function ratioScore(value, target) {
    return clamp((value / Math.max(target, 0.0001)) * 100, 0, 100);
  }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  const round = (v) => Math.round(v);

  /* ---------- 활동별 채점 ---------- */
  function scoreHavruta(m) {
    const fluency = clamp(100 - m.fillerRate * 400 - (m.wpm < 40 ? (40 - m.wpm) : 0), 0, 100);
    return [
      { axis: "발화 지속력", score: round(ratioScore(m.durationSec, 150) * 0.6 + ratioScore(m.totalWords, 200) * 0.4) },
      { axis: "질문 생성력", score: round(ratioScore(m.questionCount / m.minutes, 3)) },
      { axis: "문법 용어 활용", score: round(ratioScore(m.grammarTermCount, 8)) },
      { axis: "논리 전개", score: round(ratioScore((m.connectiveCount / Math.max(m.totalWords, 1)) * 100, 3)) },
      { axis: "유창성", score: round(fluency) },
    ];
  }

  function scoreReading(m) {
    const fluency = clamp(100 - m.fillerRate * 400, 0, 100);
    return [
      { axis: "낭독 분량", score: round(ratioScore(m.totalWords, 150) * 0.6 + ratioScore(m.durationSec, 120) * 0.4) },
      { axis: "영어 낭독", score: round(bandScore(m.englishRatio, 0.3, 0.7, 1.0)) },
      { axis: "해석 완성도", score: round(ratioScore(m.koreanWords, 60) * 0.6 + ratioScore(m.sentenceCount, 8) * 0.4) },
      { axis: "문장 완성도", score: round(bandScore(m.avgSentenceLen, 6, 18, 35)) },
      { axis: "유창성", score: round(fluency) },
    ];
  }

  function parseVocabList(raw) {
    if (!raw) return [];
    return raw.split(/\n+/).map((line) => {
      const parts = line.split(/[-–—:=]/);
      if (parts.length < 2) return null;
      const word = parts[0].trim().toLowerCase();
      const meaning = parts.slice(1).join(" ").trim();
      return word && meaning ? { word, meaning } : null;
    }).filter(Boolean);
  }

  function scoreVocab(m, transcript, vocabList) {
    const fluency = clamp(100 - m.fillerRate * 400, 0, 100);
    // 영어 토큰 뒤에 한국어 토큰이 따라오는 "단어-뜻" 짝 감지
    let pairCount = 0;
    for (let i = 0; i < m.tokens.length - 1; i++) {
      const cur = m.tokens[i], next = m.tokens[i + 1];
      if (/[a-zA-Z]/.test(cur) && !/[가-힣]/.test(cur) && /[가-힣]/.test(next)) pairCount++;
    }

    let accuracy;
    let accuracyDetail = null;
    if (vocabList && vocabList.length) {
      const lower = (transcript || "").toLowerCase();
      let hit = 0;
      const missed = [];
      vocabList.forEach(({ word, meaning }) => {
        const meaningCore = meaning.replace(/[^가-힣a-zA-Z]/g, "").slice(0, 4);
        const saidWord = lower.includes(word);
        const saidMeaning = meaningCore.length >= 2 && lower.includes(meaningCore.slice(0, 2));
        if (saidWord && saidMeaning) hit++;
        else missed.push(word);
      });
      accuracy = round((hit / vocabList.length) * 100);
      accuracyDetail = { hit, total: vocabList.length, missed: missed.slice(0, 10) };
    } else {
      // 리스트가 없으면 짝 패턴 밀도로 추정
      accuracy = round(ratioScore(pairCount, Math.max(m.englishWords * 0.7, 5)));
    }

    return {
      axes: [
        { axis: "암기량", score: round(ratioScore(m.englishWords, 20)) },
        { axis: "응답 속도", score: round(bandScore(m.wpm, 50, 130, 220)) },
        { axis: "정확도", score: accuracy },
        { axis: "영·한 짝짓기", score: round(ratioScore(pairCount, 15)) },
        { axis: "유창성", score: round(fluency) },
      ],
      accuracyDetail,
    };
  }

  /* ---------- 피드백 문구 ---------- */
  const FEEDBACK = {
    havruta: {
      "발화 지속력": {
        good: "충분한 시간 동안 끊기지 않고 설명을 이어갔어요. 하브루타의 기본기가 탄탄합니다.",
        bad: "발화 시간이 짧아요. 개념 하나를 설명할 때 '정의 → 예문 → 이유' 3단계로 말하면 자연스럽게 길어집니다.",
      },
      "질문 생성력": {
        good: "스스로 질문을 만들어 던지는 힘이 좋아요. 하브루타의 핵심을 잘 실천하고 있습니다.",
        bad: "질문이 적었어요. 설명 중간에 '왜 이렇게 될까?', '이 자리에 다른 게 오면 어떻게 될까?' 같은 질문을 최소 3개 이상 던져보세요.",
      },
      "문법 용어 활용": {
        good: "관계대명사, 분사구문 같은 문법 용어를 정확하게 사용하며 설명했어요.",
        bad: "문법 용어 사용이 부족해요. '이거', '저거' 대신 주어·동사·선행사 같은 정확한 용어로 바꿔 말하는 연습을 해보세요.",
      },
      "논리 전개": {
        good: "'왜냐하면', '예를 들어' 같은 연결 표현으로 논리적으로 설명했어요.",
        bad: "설명이 나열식이에요. '왜냐하면 ~', '예를 들어 ~', '그래서 ~' 연결어를 넣어 이유와 예시가 있는 설명으로 만들어 보세요.",
      },
      "유창성": {
        good: "군더더기 없이 또렷하게 말했어요. 전달력이 좋습니다.",
        bad: "'음', '어' 같은 추임새가 많아요. 말하기 전에 머릿속으로 문장을 한 번 완성한 뒤 말하면 훨씬 매끄러워집니다.",
      },
    },
    reading: {
      "낭독 분량": {
        good: "충분한 분량을 읽고 해석했어요. 꾸준한 훈련량이 느껴집니다.",
        bad: "읽은 분량이 적어요. 한 번에 최소 한 단락(5~8문장)을 목표로 낭독해 보세요.",
      },
      "영어 낭독": {
        good: "영어 원문을 소리 내어 읽는 비중이 적절해요. 낭독과 해석의 균형이 좋습니다.",
        bad: "영어 낭독 비중이 목표 구간을 벗어났어요. '영어 문장 낭독 → 우리말 해석' 순서를 문장 단위로 지켜 보세요.",
      },
      "해석 완성도": {
        good: "우리말 해석이 풍부하고 문장 단위로 완결되어 있어요.",
        bad: "해석이 부족하거나 끊겨 있어요. 단어 뜻 나열이 아니라 '완성된 우리말 문장'으로 해석을 끝맺는 연습이 필요합니다.",
      },
      "문장 완성도": {
        good: "문장을 알맞은 길이로 끊어 읽고 해석했어요. 구문 감각이 좋습니다.",
        bad: "문장이 너무 짧게 끊기거나 길게 늘어져요. 주어+동사 단위로 의미 덩어리(청킹)를 나눠 읽어 보세요.",
      },
      "유창성": {
        good: "머뭇거림 없이 읽고 해석했어요. 유창성이 좋습니다.",
        bad: "머뭇거림이 잦아요. 같은 지문을 3회 반복 낭독한 뒤 촬영하면 유창성 점수가 크게 올라갑니다.",
      },
    },
    vocab: {
      "암기량": {
        good: "많은 단어를 소화했어요. 어휘 훈련량이 충분합니다.",
        bad: "말한 단어 수가 적어요. 하루 목표 단어(20개 이상)를 정하고 전부 소리 내어 테스트해 보세요.",
      },
      "응답 속도": {
        good: "단어를 보자마자 뜻이 나오는 속도예요. 암기가 장기기억으로 잘 넘어갔습니다.",
        bad: "응답 속도가 느려요. 3초 안에 뜻이 안 나오는 단어는 '모르는 단어'로 분류해 별도로 복습하세요.",
      },
      "정확도": {
        good: "단어와 뜻을 정확하게 연결했어요. 정답률이 높습니다.",
        bad: "틀리거나 빠뜨린 단어가 있어요. 틀린 단어만 모아 미니 테스트를 다시 진행해 보세요.",
      },
      "영·한 짝짓기": {
        good: "'영어 단어 → 우리말 뜻' 형식을 일정하게 지키며 테스트했어요.",
        bad: "단어와 뜻이 짝을 이루지 않는 구간이 있어요. 반드시 '단어 말하기 → 뜻 말하기' 순서를 지켜 주세요.",
      },
      "유창성": {
        good: "발음이 명료하고 흐름이 끊기지 않았어요.",
        bad: "중간에 멈칫하는 구간이 많아요. 자신 없는 단어일수록 더 크고 또렷하게 발음해 보세요.",
      },
    },
  };

  function grade(total) {
    if (total >= 95) return "A+";
    if (total >= 90) return "A";
    if (total >= 85) return "B+";
    if (total >= 80) return "B";
    if (total >= 70) return "C+";
    if (total >= 60) return "C";
    return "D";
  }

  /**
   * 메인 진입점.
   * @returns {{activity, activityName, axes:[{axis,score}], total, grade, metrics, strengths, improvements, accuracyDetail}}
   */
  function analyze({ activity, transcript, durationSec, vocabListRaw }) {
    const m = baseMetrics(transcript, durationSec);
    let axes, accuracyDetail = null;

    if (activity === "havruta") axes = scoreHavruta(m);
    else if (activity === "reading") axes = scoreReading(m);
    else {
      const r = scoreVocab(m, transcript, parseVocabList(vocabListRaw));
      axes = r.axes;
      accuracyDetail = r.accuracyDetail;
    }

    const total = round(axes.reduce((n, a) => n + a.score, 0) / axes.length);
    const fb = FEEDBACK[activity];
    const strengths = [];
    const improvements = [];
    axes.forEach(({ axis, score }) => {
      if (score >= 80) strengths.push(fb[axis].good);
      else if (score < 70) improvements.push(fb[axis].bad);
    });
    if (!strengths.length) strengths.push("영상을 촬영해 스스로 점검한 것 자체가 큰 발전이에요. 꾸준함이 실력을 만듭니다!");
    if (!improvements.length) improvements.push("전 영역이 고르게 우수해요. 다음에는 난도를 한 단계 올려 도전해 보세요.");
    if (accuracyDetail && accuracyDetail.missed.length) {
      improvements.push(`다시 복습할 단어: ${accuracyDetail.missed.join(", ")}`);
    }

    return {
      activity,
      activityName: ACTIVITIES[activity].name,
      axes, total, grade: grade(total),
      metrics: m, strengths, improvements, accuracyDetail,
    };
  }

  global.RBAnalysis = { analyze, ACTIVITIES };
})(window);
