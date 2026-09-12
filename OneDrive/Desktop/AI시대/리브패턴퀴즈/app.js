const expressions = window.EXPRESSIONS || [];
const verbs = window.VERBS || [];
const bqPatterns = window.BOOKQUIZ_PATTERNS || [];
const bqWords = window.BOOKQUIZ_WORDS || [];
const learningModel = window.ReadingBrainLearningModel || {};
const patternHub = window.ReadingBrainPatternHub || {};
const leaderboardModel = window.ReadingBrainLeaderboardModel || {};
const interpretation = window.ReadingBrainInterpretation || {};
const wordGames = window.ReadingBrainWordGames || {};
const dailyLearning = window.ReadingBrainDailyLearning || {};
const offlineSync = window.ReadingBrainOfflineSync || {
  normalizeQueue(value) { return Array.isArray(value) ? value : []; },
  enqueue(queue, event) { return [...this.normalizeQueue(queue), event]; },
  acknowledge(queue) { return this.normalizeQueue(queue); },
  nextBatch(queue, limit) { return this.normalizeQueue(queue).slice(0, limit || 1); },
  createEventId(deviceId, sessionId, sequence) { return `${deviceId}:${sessionId}:${sequence}`; },
};
const pwaApi = window.ReadingBrainPwa || {};
const autoPronunciation = window.ReadingBrainAutoPronunciation || {};
const bookquizMapModel = window.ReadingBrainBookquizMap || {};
const cardPronunciationGuard = autoPronunciation.createPronunciationGuard?.();
let pwaController = null;

const LEARNING_PROFILE_KEY = "rb-learning-profile-v1";
const OFFLINE_DEVICE_KEY = "rb-offline-device-v1";
const offlineSessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
let offlineSequence = 0;
let progressSyncPromise = null;
const answerAdvance = dailyLearning.createAdvanceGuard?.() || {
  run(_token, callback) { callback(); return true; },
  cancel() {},
};
let answerAdvanceTimer = null;

function scheduleCardPronunciation({ section, stage, item, round }) {
  const token = autoPronunciation.createToken?.({ section, stage, itemId: item?.id, round });
  if (!cardPronunciationGuard?.shouldPlay(token, navigator.onLine !== false)) return false;
  queueMicrotask(() => {
    const play = section === "bookquiz" ? speakBookquizItem(item) : speakExpression(item, 1);
    Promise.resolve(play).catch(() => {});
  });
  return true;
}

function scheduleVerbFormsPronunciation(verb) {
  const token = autoPronunciation.createToken?.({ section: "verb", stage: "study", itemId: verb?.id });
  if (!cardPronunciationGuard?.shouldPlay(token, navigator.onLine !== false)) return false;
  queueMicrotask(() => {
    Promise.resolve(speakAllVerbForms(null, verb)).catch(() => {});
  });
  return true;
}

const state = {
  mode: "hub",
  index: 0,
  score: Number(localStorage.getItem("rb-score") || 0),
  streak: 0,
  mastered: new Set(JSON.parse(localStorage.getItem("rb-mastered") || "[]")),
  review: new Set(JSON.parse(localStorage.getItem("rb-review") || "[]")),
  token: localStorage.getItem("rb-token") || "",
  studentName: localStorage.getItem("rb-student-name") || "Guest",
  category: "all",
  patternQuery: "",
  hubGroup: "basic",
  navOpenGroups: { basic: true, training: false },
  daily: null,
  cleared: new Set(),
  flowProgress: JSON.parse(localStorage.getItem("rb-flow-progress") || "{}"),
  interpret: null,
  interpretShowingResult: false,
  quizItem: null,
  quizAnswer: null,
  quizCount: 1,
  matchPairs: [],
  selectedEnglish: null,
  selectedKorean: null,
  verbType: "규칙",
  verbMode: "card",
  verbIndex: 0,
  verbQuizItem: null,
  verbQuizAsk: "past",
  verbQuizCount: 1,
  bqType: "word",
  bqSubMode: "card",
  bqIndex: 0,
  bqQuizItem: null,
  bqQuizCount: 1,
  bqWordSession: null,
  bqAskDir: "toEn",
  wordGameTab: "roulette",
  wgWords: [],
  wgWordIndex: 0,
  wgTeamCount: 1,
  wgTimerSeconds: 0,
  wgTimerRemaining: 0,
  wgTimerId: null,
  wgTeamScores: [],
  wgTotalCorrect: 0,
  wgNounPlacements: {},
  wgPosPlacements: {},
  wgNounRound: [],
  wgPosRound: [],
  wgSpeakingIndex: 0,
  wgWritingIndex: 0,
  wgPhonicsCategory: "shortVowels",
  wgPhonicsIndex: 0,
  wgSentenceIndex: 0,
  wgSentencePicked: [],
  wgDictationIndex: 0,
  wgSpellingIndex: 0,
  learningProfile: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  screenTitle: $("#screenTitle"),
  scoreText: $("#scoreText"),
  streakText: $("#streakText"),
  loginScreen: $("#loginScreen"),
  loginForm: $("#loginForm"),
  studentNameInput: $("#studentNameInput"),
  studentPinInput: $("#studentPinInput"),
  loginMessage: $("#loginMessage"),
  studentNameText: $("#studentNameText"),
  logoutButton: $("#logoutButton"),
  categorySelect: $("#categorySelect"),
  flashcard: $("#flashcard"),
  cardMeta: $("#cardMeta"),
  newWords: $("#newWords"),
  cardEnglish: $("#cardEnglish"),
  cardKorean: $("#cardKorean"),
  cardImage: $("#cardImage"),
  quizCount: $("#quizCount"),
  quizPrompt: $("#quizPrompt"),
  quizScopeText: $("#quizScopeText"),
  quizQuestion: $("#quizQuestion"),
  quizOptions: $("#quizOptions"),
  quizFeedback: $("#quizFeedback"),
  leaderboardSummary: $("#leaderboardSummary"),
  leaderboardPodium: $("#leaderboardPodium"),
  leaderboardList: $("#leaderboardList"),
  dashboardGreeting: $("#dashboardGreeting"),
  dashboardFocus: $("#dashboardFocus"),
  dashboardProgressText: $("#dashboardProgressText"),
  dashboardProgressRing: $("#dashboardProgressRing"),
  dashboardProgressDetail: $("#dashboardProgressDetail"),
  dashboardCategory: $("#dashboardCategory"),
  dashboardCategoryCount: $("#dashboardCategoryCount"),
  dashboardScore: $("#dashboardScore"),
  dashboardStreak: $("#dashboardStreak"),
  wgTotalCorrect: $("#wgTotalCorrect"),
};

const WORD_MEANINGS = {
  hello: "안녕",
  name: "이름",
  nice: "좋은",
  meet: "만나다",
  brother: "남자 형제",
  sister: "여자 형제",
  grandfather: "할아버지",
  grandmother: "할머니",
  father: "아버지",
  mother: "어머니",
  where: "어디",
  from: "출신인",
  canada: "캐나다",
  china: "중국",
  brazil: "브라질",
  india: "인도",
  nationality: "국적",
  today: "오늘",
  great: "아주 좋은",
  fine: "괜찮은",
  weather: "날씨",
  sunny: "화창한",
  cloudy: "흐린",
  windy: "바람 부는",
  rainy: "비 오는",
  snowy: "눈 오는",
  time: "시간",
  hungry: "배고픈",
  excited: "신난",
  angry: "화난",
  scared: "무서운",
  happy: "행복한",
  sad: "슬픈",
  birthday: "생일",
  christmas: "크리스마스",
  congratulations: "축하해",
  welcome: "천만에",
  english: "영어",
  math: "수학",
  history: "역사",
  science: "과학",
  cookies: "쿠키",
  meat: "고기",
  spaghetti: "스파게티",
  cake: "케이크",
  pencil: "연필",
  yellow: "노란색",
  book: "책",
  box: "상자",
  crayon: "크레용",
  eraser: "지우개",
  scissors: "가위",
  notebook: "공책",
  textbook: "교과서",
  umbrella: "우산",
  watch: "시계",
  bike: "자전거",
  wallet: "지갑",
  shoes: "신발",
  cooking: "요리하는 중",
  swimming: "수영하는 중",
  cleaning: "청소하는 중",
  studying: "공부하는 중",
  waiting: "기다리는 중",
  drinking: "마시는 중",
  writing: "쓰는 중",
  dance: "춤추다",
  soccer: "축구",
  basketball: "농구",
  baseball: "야구",
  careful: "조심하는",
  borrow: "빌리다",
  picture: "사진",
  pretty: "예쁜",
  strong: "강한",
  scary: "무서운",
  favorite: "가장 좋아하는",
  season: "계절",
  subject: "과목",
  usually: "보통",
  library: "도서관",
  church: "교회",
  curly: "곱슬의",
  freckles: "주근깨",
  dimples: "보조개",
  shy: "수줍은",
  smart: "똑똑한",
  imaginative: "상상력이 풍부한",
  whose: "누구의",
  table: "탁자",
  sweater: "스웨터",
  dollars: "달러",
  amusement: "놀이",
  museum: "박물관",
  worried: "걱정하는",
  presentation: "발표",
  hospital: "병원",
  straight: "똑바로",
  vacation: "방학",
  weekend: "주말",
  amazing: "놀라운",
  boring: "지루한",
  spell: "철자를 말하다",
  tomorrow: "내일",
  grandparents: "조부모님",
  picnic: "소풍",
  homework: "숙제",
  doctor: "의사",
  party: "파티",
  headache: "두통",
  toothache: "치통",
  fever: "열",
  order: "주문",
  sandwich: "샌드위치",
  exercise: "운동하다",
  picture: "그림",
  violin: "바이올린",
  because: "왜냐하면",
  taller: "더 키가 큰",
  stronger: "더 강한",
  recycle: "재활용하다",
  environment: "환경",
  traditional: "전통적인",
  singer: "가수",
  scientist: "과학자",
  astronaut: "우주비행사",
  chef: "요리사",
  dentist: "치과의사",
};

function progressPayload() {
  return {
    mode: state.mode,
    score: state.score,
    streak: state.streak,
    mastered: [...state.mastered],
    review: [...state.review],
  };
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const response = await fetch(path, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "요청을 처리하지 못했습니다.");
  return data;
}

function applyStudent(student) {
  state.studentName = student.displayName || student.name || "Guest";
  state.score = Number(student.score || 0);
  state.streak = Number(student.streak || 0);
  state.mastered = new Set((student.mastered || []).map(Number));
  state.review = new Set((student.review || []).map(Number));
  localStorage.setItem("rb-student-name", state.studentName);
  localStorage.setItem("rb-score", String(state.score));
  localStorage.setItem("rb-mastered", JSON.stringify([...state.mastered]));
  localStorage.setItem("rb-review", JSON.stringify([...state.review]));
  updateStats();
}

function setLoggedIn(loggedIn) {
  elements.loginScreen.classList.toggle("hidden", loggedIn);
  document.body.classList.toggle("locked", !loggedIn);
}

function saveState() {
  localStorage.setItem("rb-score", String(state.score));
  localStorage.setItem("rb-mastered", JSON.stringify([...state.mastered]));
  localStorage.setItem("rb-review", JSON.stringify([...state.review]));
  saveLearningProfile();
  if (state.token) queueProgressEvent(progressPayload());
}

function learningCatalog() {
  return {
    pattern: new Set(expressions.map((item) => item.id)),
    bookquiz: new Set([...bqWords, ...bqPatterns].map((item) => item.id)),
    verb: new Set(
      (dailyLearning.elementaryVerbs ? dailyLearning.elementaryVerbs(verbs) : verbs).map((item) => item.id),
    ),
  };
}

function loadLearningProfile() {
  const parse = dailyLearning.parseLearningProfile;
  if (!parse) return { version: 1, grade: 3, activeCourse: null, dailyStats: {}, stars: 0, badges: [], streakDays: 0, pendingSync: [] };
  return parse(localStorage.getItem(LEARNING_PROFILE_KEY), learningCatalog());
}

function saveLearningProfile() {
  if (!state.learningProfile) return;
  localStorage.setItem(LEARNING_PROFILE_KEY, JSON.stringify(state.learningProfile));
}

function queueProgressEvent(payload) {
  if (!state.learningProfile) state.learningProfile = loadLearningProfile();
  let deviceId = localStorage.getItem(OFFLINE_DEVICE_KEY);
  if (!deviceId) {
    deviceId = globalThis.crypto?.randomUUID?.() || `device-${Date.now().toString(36)}`;
    localStorage.setItem(OFFLINE_DEVICE_KEY, deviceId);
  }
  const event = {
    id: offlineSync.createEventId(deviceId, offlineSessionId, ++offlineSequence),
    createdAt: new Date().toISOString(),
    type: "progress",
    payload: { ...payload },
  };
  state.learningProfile.pendingSync = offlineSync.enqueue(state.learningProfile.pendingSync, event);
  saveLearningProfile();
  if (navigator.onLine !== false) syncPendingProgress().catch(() => {});
  return event;
}

function syncPendingProgress() {
  if (progressSyncPromise) return progressSyncPromise;
  progressSyncPromise = (async () => {
    let synced = 0;
    while (state.token && navigator.onLine !== false) {
      const [event] = offlineSync.nextBatch(state.learningProfile?.pendingSync, 1);
      if (!event) break;
      const result = await apiRequest("/api/progress", {
        method: "POST",
        body: JSON.stringify({ ...event.payload, eventId: event.id }),
      });
      const acknowledgedEventIds = Array.isArray(result.acknowledgedEventIds)
        ? result.acknowledgedEventIds
        : [];
      if (!acknowledgedEventIds.includes(event.id)) break;
      state.learningProfile.pendingSync = offlineSync.acknowledge(
        state.learningProfile.pendingSync,
        acknowledgedEventIds,
      );
      saveLearningProfile();
      synced += 1;
    }
    if (synced && state.mode === "leaderboard") renderLeaderboard();
    return { synced, remaining: state.learningProfile?.pendingSync?.length || 0 };
  })().finally(() => { progressSyncPromise = null; });
  return progressSyncPromise;
}

function renderPwaState(pwaState) {
  const host = $("#pwaStatus");
  const text = $("#pwaStatusText");
  const install = $("#pwaInstallButton");
  const update = $("#pwaUpdateButton");
  if (!host || !text || !install || !update) return;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent || "");
  const isStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches;
  install.hidden = !pwaState.installAvailable;
  update.hidden = !pwaState.updateReady;
  if (!pwaState.online) {
    text.textContent = "오프라인 학습 중 · 진도는 연결되면 저장돼요.";
    host.dataset.kind = "offline";
    host.hidden = false;
  } else if (pwaState.updateReady) {
    text.textContent = "새 버전이 준비됐어요.";
    host.dataset.kind = "ready";
    host.hidden = false;
  } else if (pwaState.installAvailable) {
    text.textContent = "이 기기에 리딩브레인을 설치할 수 있어요.";
    host.dataset.kind = "ready";
    host.hidden = false;
  } else if (isIos && !isStandalone && pwaState.offlineReady) {
    text.textContent = "공유 버튼에서 ‘홈 화면에 추가’를 선택하면 설치할 수 있어요.";
    host.dataset.kind = "ready";
    host.hidden = false;
  } else {
    host.hidden = true;
  }
}

async function initPwa() {
  if (!pwaApi.createPwaController || location.protocol === "file:") return;
  pwaController = pwaApi.createPwaController({ window, navigator, onStateChange: renderPwaState });
  $("#pwaInstallButton")?.addEventListener("click", () => pwaController.promptInstall());
  $("#pwaUpdateButton")?.addEventListener("click", () => {
    saveLearningProfile();
    pwaController.applyUpdate();
  });
  try {
    await pwaController.start();
  } catch {
    renderPwaState({ online: navigator.onLine !== false, updateReady: false, installAvailable: false });
  }
}

function cancelScheduledCourseAdvance() {
  if (answerAdvanceTimer !== null) window.clearTimeout(answerAdvanceTimer);
  answerAdvanceTimer = null;
  answerAdvance.cancel();
}

function scheduleCourseAdvance(token, delay, next) {
  return answerAdvance.run(token, () => {
    answerAdvanceTimer = window.setTimeout(() => {
      answerAdvanceTimer = null;
      answerAdvance.cancel();
      next();
    }, delay);
  });
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function filteredItems() {
  const items = expressions.filter((item) => {
    const categoryOk = state.category === "all" || item.category === state.category;
    return categoryOk;
  });
  return items.length ? items : expressions;
}

function meaningKey(item) {
  return String(item?.korean || "")
    .replace(/[.!?。！？]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function oneExpressionPerMeaning(items) {
  const picked = new Map();
  shuffle(items).forEach((item) => {
    const key = meaningKey(item) || `id:${item.id}`;
    if (!picked.has(key)) picked.set(key, item);
  });
  return [...picked.values()];
}

function gameItems(items = filteredItems()) {
  const uniqueItems = oneExpressionPerMeaning(items);
  return uniqueItems.length ? uniqueItems : items;
}

function currentStudyCards() {
  const course = activeDailyCourse("pattern");
  if (course && dailyLearning.courseItems) {
    const items = dailyLearning.courseItems(course, expressions);
    if (items.length) return items;
  }
  return filteredItems().slice(0, PATTERN_SESSION_SIZE);
}

function currentItem() {
  const cards = currentStudyCards();
  state.index = ((state.index % cards.length) + cards.length) % cards.length;
  return cards[state.index];
}

function dashboardSnapshot() {
  const calculateLearningSnapshot = learningModel.calculateLearningSnapshot || ((input) => ({
    totalExpressions: input.totalExpressions || 0,
    masteredCount: input.masteredCount || 0,
    reviewCount: input.reviewCount || 0,
    categoryLabel: input.category || "패턴 섹션",
    categorySize: input.categorySize || 0,
    progressPercent: 0,
    scoreText: String(input.score || 0),
    streakText: String(input.streak || 0),
    focusMessage: "카드 5개로 오늘 학습을 시작해요.",
  }));

  return calculateLearningSnapshot({
    totalExpressions: expressions.length,
    masteredCount: state.mastered.size,
    reviewCount: state.review.size,
    score: state.score,
    streak: state.streak,
    category: state.category,
    categorySize: filteredItems().length,
  });
}

function dailyHomeSnapshot() {
  const build = learningModel.buildDailyHome;
  if (!build) return null;
  const profile = state.learningProfile || loadLearningProfile();
  const stats = profile.dailyStats?.[todayKey()] || {};
  return build({
    activeCourse: profile.activeCourse,
    todayMinutes: stats.minutes,
    stars: profile.stars,
    correct: stats.correct,
    attempted: stats.attempted,
  });
}

const PATTERN_SESSION_SIZE = 3;

function dailyCourseItemIds(section) {
  if (section === "bookquiz") return bqWords.slice(0, 5).map((item) => item.id);
  if (section === "verb") {
    const elementary = dailyLearning.elementaryVerbs ? dailyLearning.elementaryVerbs(verbs) : verbs;
    return elementary.slice(0, 5).map((item) => item.id);
  }
  return gameItems().slice(0, PATTERN_SESSION_SIZE).map((item) => item.id);
}

function activeDailyCourse(section) {
  const course = state.learningProfile?.activeCourse;
  return course && !course.completed && course.section === section ? course : null;
}

function setActiveDailyCourse(course) {
  if (!state.learningProfile) state.learningProfile = loadLearningProfile();
  state.learningProfile = { ...state.learningProfile, activeCourse: course };
  saveLearningProfile();
  renderDashboard();
}

function progressDailyAnswer(section, result) {
  const course = activeDailyCourse(section);
  if (!course || !dailyLearning.advanceAfterAnswer) return { accepted: false, course, stageChanged: false };
  const transition = dailyLearning.advanceAfterAnswer(course, result);
  if (!transition.accepted) return { ...transition, stageChanged: false };
  let nextCourse = transition.course;
  const stageChanged = nextCourse.stage !== course.stage;
  if (section === "bookquiz" && stageChanged && bookquizMapModel.NODES?.includes(course.stage)) {
    state.bookquizMap = bookquizMapModel.completeNode?.(state.bookquizMap || course.bookquizMap, course.stage) || state.bookquizMap;
    if (state.bookquizMap?.roundCompleted) {
      nextCourse = { ...course, bookquizMap: state.bookquizMap };
    } else {
      nextCourse = { ...nextCourse, bookquizMap: state.bookquizMap };
    }
  }
  if (section === "bookquiz" && stageChanged && nextCourse.stage === "pattern-study") {
    nextCourse = { ...nextCourse, itemIds: bqPatterns.slice(0, 5).map((item) => item.id), itemIndex: 0 };
  }
  if (stageChanged && nextCourse.stage === "review" && dailyLearning.prepareReview) {
    nextCourse = dailyLearning.prepareReview(nextCourse);
  }
  setActiveDailyCourse(nextCourse);
  if (section === "bookquiz" && stageChanged) {
    persistBookquizMap();
    renderBookquizMap();
  }
  return { accepted: true, course: nextCourse, stageChanged, roundCompleted: section === "bookquiz" && Boolean(state.bookquizMap?.roundCompleted) };
}

function continueDailyCourseOr(section, progress, fallback) {
  if (progress.accepted && progress.stageChanged) openDailyCourse(progress.course);
  else fallback();
}

function renderCourseReward() {
  const course = state.learningProfile?.activeCourse;
  if (!course || course.stage !== "reward") return;
  const retries = course.reviewIds.length;
  $("#courseRewardSummary").textContent = retries
    ? `오답 ${retries}개를 다시 연습했어요.`
    : "한 번에 모두 잘 풀었어요.";
  $("#courseRewardStars").textContent = `+${20 + retries * 5} ⭐`;
  const badge = $("#courseRewardBadge");
  badge.classList.add("hidden");
}

function finishDailyCourse() {
  const profile = state.learningProfile;
  const course = profile?.activeCourse;
  if (!course || course.stage !== "reward" || !dailyLearning.advanceStage) return;
  const completed = dailyLearning.advanceStage(course);
  const nextStreak = Math.max(1, Number(profile.streakDays) || 0);
  const reward = dailyLearning.rewardForCourse(completed, {
    retrySuccesses: course.reviewIds.length,
    streakDays: nextStreak,
  });
  const badges = reward.badgeId ? [...new Set([...profile.badges, reward.badgeId])] : profile.badges.slice();
  state.learningProfile = {
    ...profile,
    activeCourse: null,
    stars: profile.stars + reward.stars,
    badges,
    streakDays: reward.streakDays,
  };
  saveLearningProfile();
  setMode("hub");
  renderDashboard();
}

function openDailyCourse(course) {
  if (!course) return;
  if (course.stage === "reward") {
    setMode("reward");
    renderCourseReward();
    return;
  }
  if (course.section === "bookquiz") {
    setMode("bookquiz");
    const patternStage = course.stage.startsWith("pattern") || (course.stage === "review" && course.itemIds[0] >= 9000);
    setBQType(patternStage ? "pattern" : "word");
    setBQSubMode(course.stage.includes("quiz") ? "quiz" : "card");
    return;
  }
  if (course.section === "verb") {
    setMode("verb");
    setVerbMode(course.stage === "quiz" || course.stage === "review" ? "quiz" : "card");
    return;
  }

  const firstItem = expressions.find((item) => item.id === course.itemIds[0]);
  if (firstItem?.category) {
    state.category = firstItem.category;
    if (elements.categorySelect) elements.categorySelect.value = firstItem.category;
  }
  if (course.stage === "interpret") setMode("interpret");
  else setMode(course.stage === "quiz" || course.stage === "review" ? "quiz" : "study");
}

function startDailyCourse(section = "pattern") {
  const create = dailyLearning.createCourse;
  if (!create) return;
  const profile = state.learningProfile || loadLearningProfile();
  let course = create(section, dailyCourseItemIds(section), { grade: profile.grade });
  if (!course) return;
  if (section === "bookquiz") {
    state.bookquizMap = bookquizMapModel.createMap?.() || null;
    course = { ...course, bookquizMap: state.bookquizMap };
  }
  state.learningProfile = { ...profile, activeCourse: course };
  saveLearningProfile();
  renderDashboard();
  openDailyCourse(course);
}

function resumeDailyCourse() {
  const profile = state.learningProfile || loadLearningProfile();
  if (!profile.activeCourse || profile.activeCourse.completed) {
    startDailyCourse("pattern");
    return;
  }
  openDailyCourse(profile.activeCourse);
}

function renderDashboard() {
  if (!elements.dashboardGreeting) return;

  const snapshot = dashboardSnapshot();
  elements.dashboardGreeting.textContent = `${state.studentName}님, 오늘은 짧게 한 바퀴 돌아볼까요?`;
  elements.dashboardFocus.textContent = snapshot.focusMessage;
  elements.dashboardProgressText.textContent = `${snapshot.progressPercent}%`;
  elements.dashboardProgressRing.style.setProperty("--p", snapshot.progressPercent);
  elements.dashboardProgressDetail.textContent =
    `${snapshot.masteredCount} / ${snapshot.totalExpressions} 표현 마스터`;
  elements.dashboardCategory.textContent = snapshot.categoryLabel;
  elements.dashboardCategoryCount.textContent = `${snapshot.categorySize}개 표현`;
  elements.dashboardScore.textContent = snapshot.scoreText;
  elements.dashboardStreak.textContent = snapshot.streakText;

  const dailyHome = dailyHomeSnapshot();
  if (dailyHome) {
    $("#dailyCourseTitle").textContent = dailyHome.sectionLabel;
    $("#dailyCourseStep").textContent = dailyHome.stepLabel;
    $("#dailyCourseCtaLabel").textContent = dailyHome.ctaLabel;
    $("#dailyCourseCta").dataset.ctaMode = dailyHome.ctaMode;
    $("#dailyCourseProgress").style.width = `${dailyHome.percent}%`;
    $("#dailyMinutes").textContent = `${dailyHome.metrics.todayMinutes}분`;
    $("#dailyStars").textContent = String(dailyHome.metrics.stars);
    $("#dailyAccuracy").textContent = `${dailyHome.metrics.accuracy}%`;
  }

}

// ──────────── 패턴 영어 허브 ────────────

const DAILY_GOAL = { cards: 20, correct: 10 };
const UNIT_SIZE = 6;
const SECTION_QUIZ_TARGET = PATTERN_SESSION_SIZE;
const HUB_STATUS_LABEL = { new: "시작 전", learning: "학습 중", done: "완료" };
const PATH_STATUS_LABEL = {
  locked: "잠김",
  available: "시작 전",
  learning: "학습 중",
  cleared: "클리어",
};
const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function dailyRecord() {
  if (!state.daily) {
    try {
      const saved = JSON.parse(localStorage.getItem("rb-daily") || "null");
      if (saved && saved.date === todayKey()) {
        state.daily = {
          date: saved.date,
          cards: Math.max(0, Number(saved.cards) || 0),
          correct: Math.max(0, Number(saved.correct) || 0),
        };
      }
    } catch {
      state.daily = null;
    }
  }
  if (!state.daily || state.daily.date !== todayKey()) {
    state.daily = { date: todayKey(), cards: 0, correct: 0 };
  }
  return state.daily;
}

function bumpDaily(field, amount = 1) {
  const record = dailyRecord();
  record[field] = Math.max(0, (Number(record[field]) || 0) + amount);
  localStorage.setItem("rb-daily", JSON.stringify(record));
}

function loadLastPosition() {
  try {
    const saved = JSON.parse(localStorage.getItem("rb-last-position") || "null");
    if (saved && typeof saved.category === "string" && saved.category) {
      return { category: saved.category, index: Math.max(0, Number(saved.index) || 0) };
    }
  } catch {
    return null;
  }
  return null;
}

function saveLastPosition() {
  if (!state.category || state.category === "all") return;
  localStorage.setItem(
    "rb-last-position",
    JSON.stringify({ category: state.category, index: state.index }),
  );
}

function loadCleared() {
  try {
    const saved = JSON.parse(localStorage.getItem("rb-cleared") || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveCleared() {
  localStorage.setItem("rb-cleared", JSON.stringify([...state.cleared]));
}

function markSectionCleared(key) {
  if (!key || state.cleared.has(key)) return;
  state.cleared.add(key);
  saveCleared();
}

function sectionFlow(key = state.category) {
  if (!key || key === "all") return {};
  return state.flowProgress[key] || {};
}

function completeFlowStep(mode, key = state.category) {
  if (!key || key === "all") return;
  state.flowProgress[key] = { ...sectionFlow(key), [mode]: true };
  localStorage.setItem("rb-flow-progress", JSON.stringify(state.flowProgress));
}

function flowModeUnlocked(mode, key = state.category) {
  if (!patternHub.isLearningModeUnlocked) return true;
  return patternHub.isLearningModeUnlocked(mode, sectionFlow(key));
}

// 경로 상태(잠김 / 진행 / 클리어)까지 입힌 섹션 목록.
function patternSections() {
  if (!patternHub.buildSections) return [];
  const sections = patternHub.buildSections(expressions, state.mastered);
  if (!patternHub.applyPathState) return sections;
  return patternHub.applyPathState(sections, state.cleared);
}

function sectionByKey(sections, key) {
  return sections.find((section) => section.key === key) || null;
}

function sectionLabel(section) {
  if (!section) return "패턴 섹션";
  if (section.number === null) return section.title;
  return `${String(section.number).padStart(2, "0")}. ${section.title}`;
}

function selectSection(key, mode, index = 0) {
  if (!key) return;
  state.category = key;
  state.index = Math.max(0, Number(index) || 0);
  state.quizCount = 1;
  if (elements.categorySelect) elements.categorySelect.value = key;
  saveLastPosition();
  setMode(mode || "study");
}

function syncSearchInputs(source) {
  [$("#patternSearchInput"), $("#hubSearchInput")].forEach((input) => {
    if (input && input !== source && input.value !== state.patternQuery) {
      input.value = state.patternQuery;
    }
  });
}

function renderPatternNav(sections) {
  const host = $("#patternNavGroups");
  if (!host || !patternHub.groupSections) return;

  const totalExpressions = sections.reduce((sum, section) => sum + section.total, 0);
  const totalMastered = sections.reduce((sum, section) => sum + section.mastered, 0);
  const totalEl = $("#patternNavTotal");
  if (totalEl) {
    totalEl.textContent = `${totalExpressions ? Math.round((totalMastered / totalExpressions) * 100) : 0}%`;
  }
  const subEl = $("#patternHubBtnSub");
  if (subEl) {
    subEl.textContent = `${sections.length}개 섹션 · ${totalExpressions.toLocaleString()}표현`;
  }

  const query = state.patternQuery.trim();
  const groups = patternHub.groupSections(patternHub.filterSections(sections, query));
  const emptyEl = $("#patternNavEmpty");
  if (emptyEl) emptyEl.classList.toggle("hidden", groups.length > 0);

  const scrollTop = host.scrollTop;
  host.innerHTML = groups
    .map((group) => {
      const open = query ? true : Boolean(state.navOpenGroups[group.id]);
      const rows = group.sections
        .map(
          (section) => `
          <button class="pnav-row status-${section.pathStatus || section.status}${section.key === state.category ? " active" : ""}"
                  type="button" data-section="${escapeHtml(section.key)}"
                  ${section.unlocked === false ? "disabled aria-disabled=\"true\"" : ""}>
            <span class="pnav-row-no">${section.number === null ? "·" : String(section.number).padStart(2, "0")}</span>
            <span class="pnav-row-body">
              <span class="pnav-row-title">${escapeHtml(section.title)}</span>
              <span class="pnav-row-track"><i style="width:${section.percent}%"></i></span>
            </span>
            ${
              section.cleared
                ? '<svg class="pnav-row-mark"><use href="#ico-check" /></svg>'
                : section.unlocked === false
                  ? '<svg class="pnav-row-mark"><use href="#ico-lock" /></svg>'
                  : `<span class="pnav-row-count">${section.mastered}/${section.total}</span>`
            }
          </button>`,
        )
        .join("");
      return `
        <div class="pnav-group${open ? " open" : ""}">
          <button class="pnav-group-head" type="button" data-group="${group.id}" aria-expanded="${open}">
            <span class="pnav-caret" aria-hidden="true">▸</span>
            <span class="pnav-group-label">${escapeHtml(group.label)}</span>
            <span class="pnav-group-meta">${group.sections.length} · ${group.percent}%</span>
          </button>
          <div class="pnav-group-body">${rows}</div>
        </div>`;
    })
    .join("");
  host.scrollTop = scrollTop;
}

function renderHubResume(sections) {
  const resume = $("#hubResume");
  if (!resume) return;
  const saved = loadLastPosition()
    || (state.category && state.category !== "all" ? { category: state.category, index: state.index } : null);
  const section = saved ? sectionByKey(sections, saved.category) : null;

  resume.classList.toggle("hidden", !section);
  if (!section) return;

  resume.dataset.section = section.key;
  resume.dataset.index = String(saved.index || 0);
  $("#hubResumeSection").textContent = sectionLabel(section);
  $("#hubResumeDetail").textContent =
    `${Math.min((saved.index || 0) + 1, section.total)}번째 카드 · ${section.mastered}/${section.total} 마스터`;
  $("#hubResumeBar").style.width = `${section.percent}%`;
}

function renderHubGoal() {
  if (!patternHub.summarizeDaily) return;
  const summary = patternHub.summarizeDaily(dailyRecord(), DAILY_GOAL);
  const ring = $("#hubGoalRing");
  if (ring) {
    ring.style.setProperty("--p", summary.percent);
    ring.classList.toggle("done", summary.done);
  }
  const percentEl = $("#hubGoalPercent");
  if (percentEl) percentEl.textContent = `${summary.percent}%`;
  const cardsEl = $("#hubGoalCards");
  if (cardsEl) cardsEl.textContent = `${summary.cards} / ${summary.cardGoal}`;
  const correctEl = $("#hubGoalCorrect");
  if (correctEl) correctEl.textContent = `${summary.correct} / ${summary.correctGoal}`;
}

function planetStatus(section) {
  if (section.cleared) return { icon: "#ico-check", text: "\uC644\uB8CC" };
  if (!section.unlocked) return { icon: "#ico-lock", text: "\uC7A0\uAE40" };
  return { icon: "#ico-card", text: `${section.percent}%` };
}

function renderPathUnit(unit, currentKey) {
  const nodes = unit.sections
    .map(
      (section) => {
        const status = planetStatus(section);
        return `
      <li class="planet-node status-${section.pathStatus}${section.cleared ? " status-done" : ""}${section.key === currentKey ? " current" : ""}">
        <button class="planet-button" type="button" data-section="${escapeHtml(section.key)}"
                ${section.unlocked ? "" : "disabled aria-disabled=\"true\""}
                title="${escapeHtml(sectionLabel(section))}">
          <span class="planet-orbit" aria-hidden="true"></span>
          <span class="planet-core" style="--p:${section.unlocked ? section.percent : 0}">
            <svg class="planet-status-icon" aria-hidden="true"><use href="${status.icon}" /></svg>
          </span>
        </button>
        <span class="planet-node-label">
          <strong>${section.number === null ? "" : String(section.number).padStart(2, "0")}</strong>
          ${escapeHtml(section.title)}
        </span>
        <span class="planet-status"><svg class="planet-status-icon" aria-hidden="true"><use href="${status.icon}" /></svg><span class="planet-status-text">${status.text}</span></span>
      </li>`;
      },
    )
    .join("");

  return `
    <section class="galaxy-map${unit.unlocked ? "" : " locked"}">
      <header class="galaxy-map-head">
        <div>
          <span class="path-unit-label">${unit.label} · ${unit.range}</span>
          <strong>${escapeHtml(unit.title)}</strong>
        </div>
        <span class="galaxy-map-progress">
          ${unit.unlocked ? `${unit.clearedCount} / ${unit.total} 클리어` : "잠김"}
        </span>
      </header>
      <ol class="galaxy-map-nodes">${nodes}</ol>
    </section>`;
}

function renderHub(sections) {
  const path = $("#hubPath");
  if (!path || !patternHub.groupSections) return;

  renderHubResume(sections);
  renderHubGoal();

  const matched = patternHub.filterSections(sections, state.patternQuery);
  const matchedCounts = new Map(
    patternHub.groupSections(matched).map((group) => [group.id, group.sections.length]),
  );
  const tabs = $("#hubGroupTabs");
  if (tabs) {
    tabs.innerHTML = patternHub
      .groupSections(sections)
      .map((group) => {
        const clearedCount = group.sections.filter((section) => section.cleared).length;
        return `
        <button class="hub-tab${group.id === state.hubGroup ? " active" : ""}" type="button"
                role="tab" aria-selected="${group.id === state.hubGroup}" data-group="${group.id}">
          <strong>${escapeHtml(group.label)}</strong>
          <small>${matchedCounts.get(group.id) || 0}개 섹션 · ${clearedCount} 클리어</small>
        </button>`;
      })
      .join("");
  }

  const visible = matched.filter((section) => section.group === state.hubGroup);
  const current = patternHub.findCurrentSection
    ? patternHub.findCurrentSection(sections.filter((section) => section.group === state.hubGroup))
    : null;
  const units = patternHub.buildUnits ? patternHub.buildUnits(visible, UNIT_SIZE) : [];

  path.innerHTML = units.map((unit) => renderPathUnit(unit, current ? current.key : null)).join("");
  const emptyEl = $("#hubEmpty");
  if (emptyEl) emptyEl.classList.toggle("hidden", visible.length > 0);
}

// ──────────── 통역 테스트 ────────────
//
// 한글을 보고 영어로 말하면 음성 인식으로 받아 채점한다.
// 인식을 쓸 수 없는 환경에서는 자가 채점으로 넘어간다.

const INTERPRET_COUNTDOWN = 3;
const INTERPRET_LISTEN_MS = 8000;
const INTERPRET_CONSOLE_PHASES = ["idle", "countdown", "listening", "verdict", "pass", "fail", "complete"];
const INTERPRET_MASCOT_STATES = Object.freeze({
  listening: "listening",
  pass: "correct",
  fail: "wrong",
  complete: "complete",
});

function setInterpretConsoleState(phase) {
  const consoleEl = $("#interpretView .communication-console");
  if (!consoleEl || !INTERPRET_CONSOLE_PHASES.includes(phase)) return;
  INTERPRET_CONSOLE_PHASES.forEach((name) => consoleEl.classList.toggle(`is-${name}`, name === phase));
  consoleEl.dataset.interpretPhase = phase;
  const mascotState = INTERPRET_MASCOT_STATES[phase];
  if (mascotState) window.ReadingBrainGameUI?.setMascot?.(mascotState);
}

function speechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function newInterpretRun(section, items) {
  return {
    section,
    items,
    index: 0,
    attempt: 0, // 문장당 0 = 첫 시도, 1 = 재도전
    results: [],
    phase: "idle", // idle | countdown | listening | verdict
    countdown: INTERPRET_COUNTDOWN,
    timers: [],
    recognizer: null,
    selfScored: false,
  };
}

function clearInterpretTimers() {
  const run = state.interpret;
  if (!run) return;
  run.timers.forEach((id) => clearTimeout(id));
  run.timers = [];
  if (run.recognizer) {
    try {
      run.recognizer.abort();
    } catch {
      /* 이미 멈춘 경우는 무시한다 */
    }
    run.recognizer = null;
  }
}

function interpretLater(fn, delay) {
  const run = state.interpret;
  if (!run) return;
  run.timers.push(setTimeout(fn, delay));
}

let interpretResultTimer = null;

function clearInterpretResultTimer() {
  if (interpretResultTimer !== null) window.clearTimeout(interpretResultTimer);
  interpretResultTimer = null;
}

function stopInterpret() {
  clearInterpretTimers();
  clearInterpretResultTimer();
  state.interpret = null;
  state.interpretShowingResult = false;
}

function interpretSectionItems(section) {
  return expressions.filter((item) => item.category === section.key).slice(0, PATTERN_SESSION_SIZE);
}

function showInterpretPane(name) {
  ["interpretIntro", "interpretRun", "interpretResult"].forEach((id) => {
    const el = $(`#${id}`);
    if (el) el.classList.toggle("hidden", id !== name);
  });
}

function renderInterpretEntry(sections) {
  const section = sectionByKey(sections, state.category);
  if (state.mode !== "interpret") return;
  if (state.interpret) return; // 진행 중에는 화면을 갈아끼우지 않는다
  if (state.interpretShowingResult) return; // 결과 화면을 덮지 않는다
  setInterpretConsoleState("idle");

  showInterpretPane("interpretIntro");
  const title = $("#interpretIntroTitle");
  if (title) title.textContent = `${sectionLabel(section)} 통역 테스트`;
  const desc = $("#interpretIntroDesc");
  if (desc) {
    desc.textContent = `${interpretSectionItems(section).length}문장을 한글만 보고 영어로 말합니다.` +
      (section.cleared ? " 이미 클리어한 섹션이에요. 다시 도전할 수 있습니다." : "");
  }

  const note = $("#interpretSupportNote");
  if (note) {
    const supported = Boolean(speechRecognitionCtor());
    note.classList.toggle("hidden", supported);
    if (!supported) {
      note.textContent =
        "이 브라우저는 음성 인식을 지원하지 않아 자가 채점으로 진행합니다. " +
        "정답을 보고 스스로 맞췄는지 눌러 주세요.";
      note.classList.add("mg-error-state");
      window.ReadingBrainGameUI?.setMascot?.(
        "wrong",
        "이 기기에서는 음성 인식을 사용할 수 없어 자가 채점으로 진행해요.",
      );
    } else {
      note.classList.remove("mg-error-state");
    }
  }
}

function startInterpretRun(retryItems) {
  const sections = patternSections();
  const section = sectionByKey(sections, state.category);
  if (!section) return;

  const pool = Array.isArray(retryItems) && retryItems.length ? retryItems : interpretSectionItems(section);
  const items = shuffle(pool);
  if (!items.length) return;

  state.interpretShowingResult = false;
  state.interpret = newInterpretRun(section, items);
  showInterpretPane("interpretRun");
  renderInterpretProgress();
  beginInterpretQuestion();
}

function renderInterpretProgress() {
  const run = state.interpret;
  if (!run) return;
  const progress = $("#interpretProgressText");
  if (progress) progress.textContent = `문장 ${run.index + 1} / ${run.items.length}`;
  const pass = $("#interpretPassText");
  if (pass) pass.textContent = String(run.results.filter((r) => r.verdict === "pass").length);
  const bar = $("#interpretBar");
  if (bar) bar.style.width = `${Math.round((run.index / run.items.length) * 100)}%`;
}

function setInterpretStatus(text, countLabel = "") {
  const status = $("#interpretStatusText");
  if (status) status.textContent = text;
  const count = $("#interpretCount");
  if (count) {
    count.textContent = countLabel;
    count.classList.toggle("hidden", !countLabel);
  }
}

function beginInterpretQuestion() {
  const run = state.interpret;
  if (!run) return;

  // 이전 문장에서 남은 예약(카운트다운·자가채점 노출·자동 진행)을 먼저 끊는다.
  // 남겨 두면 다음 문장 위로 늦게 터져 화면이 어긋난다.
  clearInterpretTimers();

  const item = run.items[run.index];
  run.phase = "countdown";
  run.countdown = INTERPRET_COUNTDOWN;

  $("#interpretKorean").textContent = item.korean;
  $("#interpretHeard").textContent = "";
  $("#interpretVerdict").classList.add("hidden");
  $("#interpretSelf").classList.add("hidden");
  $("#interpretStatus").className = "interpret-status communication-mic";
  renderInterpretProgress();

  const tick = () => {
    const active = state.interpret;
    if (!active || active.phase !== "countdown") return;
    if (active.countdown > 0) {
      setInterpretStatus(
        active.attempt ? "다시 한 번 — 준비하세요" : "준비하세요",
        String(active.countdown),
      );
      active.countdown -= 1;
      setInterpretConsoleState("countdown");
      interpretLater(tick, 700);
      return;
    }
    listenInterpretAnswer();
  };
  tick();
}

function listenInterpretAnswer() {
  const run = state.interpret;
  if (!run) return;
  run.phase = "listening";

  const Recognizer = speechRecognitionCtor();
  if (!Recognizer) {
    run.selfScored = true;
    setInterpretStatus("지금 말해 보세요", "");
    $("#interpretStatus").className = "interpret-status communication-mic listening";
    setInterpretConsoleState("listening");
    interpretLater(() => revealSelfScoring(), 4000);
    return;
  }

  setInterpretStatus("듣고 있어요", "");
  $("#interpretStatus").className = "interpret-status communication-mic listening";
  setInterpretConsoleState("listening");

  let settled = false;
  const recognizer = new Recognizer();
  recognizer.lang = "en-US";
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 3;
  run.recognizer = recognizer;

  const settle = (transcript) => {
    if (settled) return;
    settled = true;
    run.recognizer = null;
    judgeInterpretAnswer(transcript);
  };

  recognizer.onresult = (event) => {
    const alternatives = [...event.results[0]].map((alt) => alt.transcript);
    const expected = run.items[run.index].english;
    // 대안 중 가장 점수가 높은 것을 택한다.
    const best = alternatives.reduce(
      (top, text) => {
        const score = interpretation.scoreAttempt(text, expected);
        return score.ratio > top.ratio ? { text, ratio: score.ratio } : top;
      },
      { text: alternatives[0] || "", ratio: -1 },
    );
    settle(best.text);
  };
  recognizer.onerror = (event) => {
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      run.selfScored = true;
      settled = true;
      run.recognizer = null;
      revealSelfScoring();
      return;
    }
    settle("");
  };
  recognizer.onend = () => settle("");

  try {
    recognizer.start();
  } catch {
    settle("");
    return;
  }
  interpretLater(() => {
    if (!settled && run.recognizer) {
      try {
        run.recognizer.stop();
      } catch {
        settle("");
      }
    }
  }, INTERPRET_LISTEN_MS);
}

function revealSelfScoring() {
  const run = state.interpret;
  if (!run) return;
  run.phase = "verdict";
  const item = run.items[run.index];
  $("#interpretStatus").className = "interpret-status communication-mic";
  setInterpretStatus("정답을 보고 스스로 채점하세요", "");
  setInterpretConsoleState("verdict");
  $("#interpretAnswer").textContent = item.english;
  $("#interpretVerdictLabel").textContent = "정답";
  $("#interpretVerdict").classList.remove("hidden");
  $("#interpretVerdict").className = "interpret-verdict";
  $("#interpretSelf").classList.remove("hidden");
  speakExpression(item, 1);
}

function judgeInterpretAnswer(transcript) {
  const run = state.interpret;
  if (!run) return;
  run.phase = "verdict";

  const item = run.items[run.index];
  const score = interpretation.scoreAttempt(transcript, item.english);
  const heard = $("#interpretHeard");
  if (heard) heard.textContent = transcript ? `들린 말: ${transcript}` : "소리를 듣지 못했어요";

  // 재도전은 문장당 한 번만 준다.
  if (score.verdict === "retry" && run.attempt === 0) {
    run.attempt = 1;
    $("#interpretStatus").className = "interpret-status communication-mic retry";
    setInterpretStatus("거의 맞았어요 — 한 번 더!", "");
    setInterpretConsoleState("verdict");
    interpretLater(beginInterpretQuestion, 1400);
    return;
  }

  const verdict = score.verdict === "pass" ? "pass" : "fail";
  finishInterpretQuestion(verdict, item);
}

function finishInterpretQuestion(verdict, item) {
  const run = state.interpret;
  if (!run) return;
  // 한 문장은 한 번만 채점한다 — 늦게 들어온 클릭이나 인식 결과를 막는다.
  if (run.results.length > run.index) return;

  clearInterpretTimers();
  run.results.push({ verdict, id: item.id, english: item.english, korean: item.korean });

  const box = $("#interpretVerdict");
  box.className = `interpret-verdict ${verdict}`;
  box.classList.remove("hidden");
  $("#interpretVerdictLabel").textContent = verdict === "pass" ? "통과" : "다시 연습";
  $("#interpretAnswer").textContent = item.english;
  $("#interpretSelf").classList.add("hidden");
  $("#interpretStatus").className = `interpret-status communication-mic ${verdict}`;
  setInterpretStatus(verdict === "pass" ? "좋아요!" : "정답을 확인하세요", "");

  if (verdict === "pass") {
    state.score += 15;
    state.mastered.add(item.id);
    bumpDaily("correct");
  } else {
    state.review.add(item.id);
  }
  saveState();
  updateStats();
  renderInterpretProgress();
  setInterpretConsoleState(verdict);

  speakExpression(item, 1);
  interpretLater(advanceInterpret, verdict === "pass" ? 1100 : 1900);
}

function advanceInterpret() {
  const run = state.interpret;
  if (!run) return;
  run.index += 1;
  run.attempt = 0;
  if (run.index >= run.items.length) {
    finishInterpretRun();
    return;
  }
  beginInterpretQuestion();
}

const CONFETTI_COLORS = ["var(--mg-mint)", "var(--mg-sky)", "var(--mg-star)", "var(--mg-coral)"];

// 섹션 클리어 축하 폭죽. 정리는 애니메이션이 끝난 뒤 스스로 한다.
function burstConfetti(count = 60) {
  const host = $("#confettiBurst");
  if (!host) return;
  host.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.setProperty("--confetti-duration", `${1800 + Math.random() * 1200}ms`);
    piece.style.animationDelay = `${Math.random() * 300}ms`;
    host.appendChild(piece);
  }
  window.setTimeout(() => { host.innerHTML = ""; }, 3200);
}

function finishInterpretRun() {
  const run = state.interpret;
  if (!run) return;

  const summary = interpretation.summarizeRun(run.results, interpretation.SECTION_PASS_RATE);
  const sectionKey = run.section.key;
  const missed = run.results.filter((result) => result.verdict !== "pass");
  const missedItems = run.items.filter((item, index) => run.results[index]?.verdict !== "pass");

  clearInterpretTimers();
  state.interpret = null;

  if (summary.cleared) completeFlowStep("interpret", sectionKey);

  state.interpretShowingResult = true;
  showInterpretPane("interpretResult");
  const ring = $("#interpretResultRing");
  if (ring) {
    ring.style.setProperty("--p", summary.percent);
    ring.classList.toggle("cleared", summary.cleared);
  }
  $("#interpretResultPercent").textContent = `${summary.percent}%`;
  $("#interpretResultTitle").textContent = summary.cleared
    ? "섹션 클리어!"
    : `${summary.threshold}% 를 넘기면 클리어예요`;
  $("#interpretResultDetail").textContent = summary.cleared
    ? `${summary.total}문장 중 ${summary.passed}문장 통과 · 다음 섹션이 열렸어요`
    : `${summary.total}문장 중 ${summary.passed}문장 통과 · 놓친 ${missed.length}문장을 다시 테스트할게요`;

  const missedBox = $("#interpretMissed");
  if (missedBox) {
    missedBox.innerHTML = missed.length
      ? `<h4>다시 볼 문장 ${missed.length}개</h4>` +
        missed
          .slice(0, 12)
          .map(
            (result) => `
          <div class="interpret-missed-row">
            <strong>${escapeHtml(result.english)}</strong>
            <span>${escapeHtml(result.korean)}</span>
          </div>`,
          )
          .join("")
      : "";
  }

  saveState();
  updateStats();
  if (summary.cleared) {
    markSectionCleared(sectionKey);
    burstConfetti();
  }
  setInterpretConsoleState("complete");

  // 클리어했으면 버튼 없이 허브(다음 섹션이 열린 지도)로 자동 복귀하고,
  // 80%(3문장 기준 전부)를 못 넘겼으면 놓친 문장만 모아 바로 재시험한다.
  clearInterpretResultTimer();
  interpretResultTimer = window.setTimeout(() => {
    interpretResultTimer = null;
    if (summary.cleared || !missedItems.length) {
      setMode("hub");
    } else {
      startInterpretRun(missedItems);
    }
  }, summary.cleared ? 2600 : 2200);
}

function renderStudyContext(sections) {
  const chip = $("#studyContextChip");
  if (!chip) return;
  const section = sectionByKey(sections, state.category);
  chip.textContent = sectionLabel(section);
  const count = $("#studyContextCount");
  if (count) {
    count.textContent = section ? `${section.mastered} / ${section.total} 마스터 · ${section.percent}%` : "";
  }
  const bar = $("#studyContextBar");
  if (bar) bar.style.width = `${section ? section.percent : 0}%`;

  const banner = $("#sectionDoneBanner");
  if (!banner) return;

  // 카드를 다 마치면 통역 테스트로, 이미 클리어했으면 다음 섹션으로 보낸다.
  const cardsDone = Boolean(section && section.percent >= 100);
  const next = cardsDone && patternHub.findNextSection
    ? patternHub.findNextSection(sections, section.key)
    : null;
  const showBanner = cardsDone && (!section.cleared || Boolean(next));
  banner.classList.toggle("hidden", !showBanner);
  if (!showBanner) return;

  if (!section.cleared) {
    banner.dataset.action = "interpret";
    banner.dataset.section = "";
    banner.querySelector("strong").textContent = "카드를 다 익혔어요!";
    $("#sectionDoneNext").textContent = "이제 통역 테스트를 통과하면 이 섹션이 클리어됩니다.";
    $("#sectionDoneBtn").textContent = "통역 테스트 보기";
    return;
  }

  banner.dataset.action = "next";
  banner.dataset.section = next.key;
  banner.querySelector("strong").textContent = "이 섹션은 클리어했어요!";
  $("#sectionDoneNext").textContent = `다음은 ${sectionLabel(next)} · ${next.total}표현`;
  $("#sectionDoneBtn").textContent = "다음 섹션 시작";
}

function updateReviewBadge() {
  const badge = $("#pmodeReviewCount");
  if (!badge) return;
  badge.textContent = String(state.review.size);
  badge.classList.toggle("hidden", state.review.size === 0);
}

function renderPatternSurfaces() {
  const sections = patternSections();
  renderPatternNav(sections);
  renderStudyContext(sections);
  renderInterpretEntry(sections);
  updateReviewBadge();
  if (state.mode === "hub") renderHub(sections);
}

function updateStats() {
  elements.scoreText.textContent = state.score;
  elements.streakText.textContent = state.streak;
  elements.studentNameText.textContent = state.studentName;
  const mobileScore = $("#mobileScoreText");
  if (mobileScore) mobileScore.textContent = state.score;
  renderDashboard();
  renderPatternSurfaces();
}

async function loginStudent(event) {
  event.preventDefault();
  const name = elements.studentNameInput.value.trim();
  const pin = elements.studentPinInput.value.trim();
  if (!name || !pin) {
    elements.loginMessage.textContent = "이름과 PIN을 모두 입력해 주세요.";
    return;
  }
  elements.loginMessage.textContent = "로그인 중입니다...";
  try {
    const data = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify({ name, pin }),
    });
    state.token = data.token;
    localStorage.setItem("rb-token", state.token);
    applyStudent(data.student);
    setLoggedIn(true);
    renderStudy();
    syncPendingProgress().catch(() => {});
    elements.loginMessage.textContent = "로그인되었습니다.";
  } catch (error) {
    console.error("[login error]", error);
    const isNetworkError = error instanceof TypeError && error.message.toLowerCase().includes("fetch");
    elements.loginMessage.textContent = isNetworkError
      ? "서버에 연결할 수 없습니다. 브라우저에서 http://localhost:4174 로 접속했는지 확인해 주세요."
      : error.message;
  }
}

async function restoreSession() {
  if (!state.token) {
    setLoggedIn(false);
    return;
  }
  try {
    const data = await apiRequest("/api/progress");
    applyStudent(data.student);
    setLoggedIn(true);
    syncPendingProgress().catch(() => {});
  } catch {
    state.token = "";
    localStorage.removeItem("rb-token");
    setLoggedIn(false);
  }
}

function logoutStudent() {
  state.token = "";
  state.studentName = "Guest";
  localStorage.removeItem("rb-token");
  localStorage.removeItem("rb-student-name");
  setLoggedIn(false);
}

function renderCategories() {
  const categories = [...new Set(expressions.map((item) => item.category))].sort();
  elements.categorySelect.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
  if (state.category === "all" || !categories.includes(state.category)) {
    const saved = loadLastPosition();
    if (saved && categories.includes(saved.category)) {
      state.category = saved.category;
      state.index = saved.index;
    } else {
      state.category = categories[0] || "";
    }
    elements.categorySelect.value = state.category;
  }
  renderDashboard();
  renderPatternSurfaces();
}

function renderNewWords(item) {
  const words = [...new Set(item.english.toLowerCase().match(/[a-z']+/g) || [])]
    .filter((word) => WORD_MEANINGS[word])
    .slice(0, 4);
  elements.newWords.innerHTML = words.length
    ? words.map((word) => `<span><strong>${word}</strong> ${WORD_MEANINGS[word]}</span>`).join("")
    : `<span><strong>pattern</strong> 문장 패턴을 익혀보세요</span>`;
}

function renderStudy() {
  const item = currentItem();
  const cards = currentStudyCards();
  elements.flashcard.classList.remove("flipped");
  elements.cardMeta.textContent = `${item.category}`;
  const indexEl = $("#cardIndexDisplay");
  if (indexEl) indexEl.textContent = `${state.index + 1} / ${cards.length}`;
  renderNewWords(item);
  elements.cardEnglish.textContent = item.english;
  elements.cardKorean.textContent = item.korean;
  scheduleCardPronunciation({ section: "pattern", stage: "study", item });
  saveLastPosition();
  updateStats();
  scheduleStudyCardAdvance();
}

const STUDY_CARD_AUTO_ADVANCE_DELAY = 3200;
let studyCardAdvanceTimer = null;

function cancelStudyCardAdvance() {
  if (studyCardAdvanceTimer !== null) window.clearTimeout(studyCardAdvanceTimer);
  studyCardAdvanceTimer = null;
}

// 발음을 듣고 읽을 시간을 준 뒤, 학생이 직접 "다음"을 누르지 않아도 다음 카드로 넘어간다.
// 마지막 카드에서도 그대로 예약하면 moveCard(1)이 알아서 퀴즈로 넘겨준다.
function scheduleStudyCardAdvance() {
  cancelStudyCardAdvance();
  const cards = currentStudyCards();
  if (!cards.length) return;
  studyCardAdvanceTimer = window.setTimeout(() => {
    studyCardAdvanceTimer = null;
    if (state.mode === "study") moveCard(1);
  }, STUDY_CARD_AUTO_ADVANCE_DELAY);
}

function moveCard(step = 1) {
  const cards = currentStudyCards();
  const dailyCourse = activeDailyCourse("pattern");
  if (dailyCourse && step > 0) {
    const item = cards[dailyCourse.itemIndex % cards.length];
    const progress = progressDailyAnswer("pattern", {
      token: `pattern:${dailyCourse.stage}:${item.id}`,
      correct: true,
      itemId: item.id,
    });
    if (progress.accepted) {
      state.index = progress.course.itemIndex;
      if (progress.roundCompleted) renderBookquizMap();
      else if (progress.stageChanged) openDailyCourse(progress.course);
      else renderStudy();
      return;
    }
  }
  const newIndex = state.index + step;
  if (newIndex < 0) return;
  if (step > 0) bumpDaily("cards");
  // 마지막 카드에서 "다음"을 누르면 바로 퀴즈로 이어간다.
  if (step > 0 && newIndex >= cards.length) {
    state.index = cards.length - 1;
    state.quizCount = 1;
    setMode("quiz");
    return;
  }
  state.index = newIndex;
  renderStudy();
}

function markKnown(known) {
  const item = currentItem();
  if (known) {
    state.mastered.add(item.id);
    state.review.delete(item.id);
    state.score += 10 + Math.min(state.streak, 5);
    state.streak += 1;
  } else {
    state.review.add(item.id);
    state.streak = 0;
  }
  saveState();
  const dailyCourse = activeDailyCourse("pattern");
  if (dailyCourse) {
    const progress = progressDailyAnswer("pattern", {
      token: `pattern:${dailyCourse.stage}:${item.id}`,
      correct: known,
      itemId: item.id,
    });
    if (progress.accepted) {
      state.index = progress.course.itemIndex;
      if (progress.stageChanged) openDailyCourse(progress.course);
      else renderStudy();
      window.ReadingBrainGameUI?.setMascot?.(known ? "correct" : "wrong");
      return;
    }
  }
  if (known && currentStudyCards().every((entry) => state.mastered.has(entry.id))) {
    completeFlowStep("study");
    renderStudy();
    renderPatternSurfaces();
    window.ReadingBrainGameUI?.setMascot?.("complete");
    return;
  }
  moveCard(1);
  window.ReadingBrainGameUI?.setMascot?.(known ? "correct" : "wrong");
}

async function speakCurrent() {
  const item = currentItem();
  await speakExpression(item, 2);
}

const SPEECH_RATE = 0.9;
const SPEECH_PITCH = 1;
const NATIVE_AUDIO_MODE = "tts";

function audioPathFor(item) {
  return `assets/native-audio/${String(item.id).padStart(3, "0")}.mp3`;
}

// ──────────────────────────────────────────────
//  Kawaii Canvas Scene Generator
// ──────────────────────────────────────────────
const _kawaiiCache = new Map();

const _EMOJI_MAP = {
  // 인사
  hello:"👋",hi:"✋",goodbye:"👋😢",bye:"👋",welcome:"🤗",
  nice:"😊",glad:"😊✨",meet:"🤝",name:"🏷️",introduce:"🙋",
  // 감정
  happy:"😊",sad:"😢",angry:"😠",tired:"😴",excited:"🤩",
  scared:"😨",love:"❤️",worry:"😟",laugh:"😂",cry:"😭",sorry:"🙇",
  // 학교
  school:"🏫",class:"📚",book:"📖",pen:"✏️",pencil:"✏️",
  paper:"📄",homework:"📝",study:"📚",read:"📖",write:"✍️",
  test:"📝",exam:"📋",teacher:"👩‍🏫",student:"🧑‍🎓",
  // 음식
  eat:"🍽️",food:"🍱",lunch:"🍱",breakfast:"🥞",dinner:"🍛",
  hungry:"😋",delicious:"😋",apple:"🍎",rice:"🍚",milk:"🥛",
  water:"💧",pizza:"🍕",sandwich:"🥪",cake:"🎂",cookie:"🍪",
  juice:"🧃",bread:"🍞",noodle:"🍜",soup:"🍲",chicken:"🍗",
  // 날씨
  rain:"🌧️☂️",sunny:"☀️",cloud:"⛅",snow:"❄️🌨️",wind:"💨",
  hot:"☀️🌡️",cold:"❄️🥶",warm:"🌤️",storm:"⛈️",umbrella:"☂️",
  // 스포츠
  soccer:"⚽",football:"🏈",basketball:"🏀",baseball:"⚾",
  tennis:"🎾",swim:"🏊",swimming:"🏊",run:"🏃",jump:"⬆️",
  dance:"💃",play:"🎮",game:"🎲",bike:"🚲",skate:"⛸️",
  // 동물
  dog:"🐕",cat:"🐱",bird:"🦅",rabbit:"🐰",horse:"🐴",
  elephant:"🐘",bear:"🐻",lion:"🦁",tiger:"🐯",monkey:"🐒",
  panda:"🐼",fish:"🐟",butterfly:"🦋",animal:"🦁",
  // 가족
  family:"👨‍👩‍👧‍👦",mom:"👩❤️",dad:"👨❤️",sister:"👧💕",
  brother:"👦✊",friend:"👫",baby:"👶",grandma:"👵",grandpa:"👴",
  // 장소
  home:"🏠",house:"🏡",park:"🌳🌸",store:"🏪",shop:"🛒",
  hospital:"🏥",restaurant:"🍽️",library:"📚🏛️",pool:"🏊",
  airport:"✈️🛫",station:"🚉",beach:"🏖️",mountain:"⛰️",
  // 교통
  car:"🚗",bus:"🚌",train:"🚆",plane:"✈️",ship:"🚢",walk:"🚶",
  // 자연
  flower:"🌸🌺",tree:"🌳",sun:"☀️",moon:"🌙",star:"⭐✨",
  sky:"🌤️",ocean:"🌊",river:"🌊",
  // 물건
  bag:"🎒",phone:"📱",music:"🎵🎶",present:"🎁",gift:"🎁",
  party:"🎉🎊",money:"💰",toy:"🪀",ball:"⚽",hat:"🎩",
  birthday:"🎂🎉🎈",
  // 동작/기타
  help:"🤝💪",give:"🎁",buy:"🛒",watch:"👀",listen:"👂",
  speak:"💬",think:"🤔",sleep:"😴💤",wake:"⏰",clean:"🧹",
  cook:"👨‍🍳",draw:"🎨",sing:"🎤🎵",travel:"✈️🗺️",vacation:"🏖️",
  recycle:"♻️🌍",borrow:"🙏✏️",message:"💬📱",text:"💬📱",
  special:"⭐🌟",surprise:"😲🎉",order:"📋🍽️",visit:"🏠🚪",
  // Training 동사
  go:"🚶➡️",come:"🚶⬅️",live:"🏠💚",work:"💼👔",
  seem:"🤔💭",feel:"💭❤️",look:"👀",taste:"😋👅",smell:"👃🌸",
  become:"⭐🌟",need:"❗",make:"🛠️✨",hate:"😤❌",enjoy:"😄🎉",
  wear:"👗👔",tell:"💬🗣️",ask:"❓🙋",teach:"📖👩‍🏫",show:"👁️🌟",
  see:"👁️",hear:"👂🎵",want:"🌟💭",send:"📬",bring:"📦",
};

const _CAT_COLORS = [
  ["#FFB3C6","#FFEEF4"],["#B3D4FF","#EEF4FF"],["#B3F0D4","#EEFFF4"],
  ["#FFD4B3","#FFF4EE"],["#D4B3FF","#F4EEFF"],["#B3FFD4","#EEFFF4"],
  ["#FFB3B3","#FFEEEE"],["#B3E4FF","#EEF8FF"],["#FFE4B3","#FFF8EE"],
  ["#E4B3FF","#F8EEFF"],["#B3FFEE","#EEFFF8"],["#FFB3E4","#FFEEF8"],
  ["#B3B3FF","#EEEEFF"],["#FFE4B3","#FFF8EE"],["#C8FFB3","#F0FFEE"],
];

function _getCatColors(item) {
  const m = (item.category || "").match(/^(\d+)\./);
  const n = m ? parseInt(m[1]) : 0;
  if (n >= 31) return _CAT_COLORS[(n - 31) % _CAT_COLORS.length];
  return _CAT_COLORS[(Math.max(0, n - 1)) % _CAT_COLORS.length];
}

function _getEmojis(item) {
  const cat = item.category || "";
  const tm = cat.match(/Training 800 - (\w+)/);
  if (tm) {
    const v = tm[1].toLowerCase();
    if (_EMOJI_MAP[v]) return _EMOJI_MAP[v];
  }
  const words = item.english.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/);
  for (const w of words) {
    for (const [k, e] of Object.entries(_EMOJI_MAP)) {
      if (w === k || (w.length > 4 && w.startsWith(k)) || (k.length > 4 && k.startsWith(w))) {
        return e;
      }
    }
  }
  const fallbacks = ["👋😊","📚✨","💬🌟","❤️😊","🌸⭐","🎉✨","🌈💫"];
  return fallbacks[item.id % fallbacks.length];
}

function drawKawaiiScene(item) {
  if (_kawaiiCache.has(item.id)) return _kawaiiCache.get(item.id);
  const canvas = document.createElement("canvas");
  canvas.width = 480;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");
  const [c1, c2] = _getCatColors(item);

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 480, 300);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, 300);

  // Soft decorative blobs
  ctx.globalAlpha = 0.18;
  [[380,30,65],[25,255,75],[430,200,45],[170,15,38],[90,270,30]].forEach(([x,y,r],i) => {
    ctx.fillStyle = i % 2 === 0 ? "#ffffff" : c1;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#ffffff";
  ctx.font = "14px serif";
  ctx.textAlign = "center";
  [[55,55],[405,75],[245,30],[355,245],[88,205]].forEach(([x,y]) => ctx.fillText("✦",x,y));
  ctx.globalAlpha = 1;

  // Main emoji
  const emojis = _getEmojis(item);
  const glyphs = [...emojis].filter(c => c.codePointAt(0) > 127).length;
  ctx.font = `${glyphs <= 2 ? 108 : 76}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emojis, 240, 158);

  const url = canvas.toDataURL("image/jpeg", 0.9);
  _kawaiiCache.set(item.id, url);
  return url;
}

function localImagePath(item) {
  return `assets/images/${String(item.id).padStart(4, "0")}.jpg`;
}

function fallbackImageUrl(item) {
  const stop = new Set(["a","an","the","is","are","am","was","were","be","been","being",
    "i","you","he","she","it","we","they","my","your","his","her","its","our","their",
    "this","that","these","those","to","of","in","on","at","for","with","by","from",
    "and","or","but","not","do","did","does","have","has","had","will","would","can",
    "could","should","may","might","shall","what","how","when","where","who","which"]);
  const keywords = item.english
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !stop.has(w.toLowerCase()))
    .slice(0, 3)
    .join(",") || "children,learning";
  return `https://loremflickr.com/480/300/${encodeURIComponent(keywords)}?lock=${item.id}`;
}

function imagePathFor(item) {
  return localImagePath(item);
}

function playNativeAudio(item, repeat = 1) {
  return new Promise((resolve, reject) => {
    let played = 0;
    const audio = new Audio(audioPathFor(item));
    audio.preload = "auto";
    audio.onended = () => {
      played += 1;
      if (played < repeat) {
        audio.currentTime = 0;
        audio.play().catch(reject);
      } else {
        resolve(true);
      }
    };
    audio.onerror = () => reject(new Error("native-audio-missing"));
    audio.play().catch(reject);
  });
}

function canUseOnlineSpeech() {
  return navigator.onLine !== false;
}

function showOfflineSpeechMessage() {
  const message = "음성은 인터넷 연결 시 이용할 수 있어요.";
  const status = $("#pwaStatus");
  const statusText = $("#pwaStatusText");
  if (status && statusText) {
    statusText.textContent = message;
    status.dataset.kind = "offline";
    status.hidden = false;
  }
  window.ReadingBrainGameUI?.setMascot?.("guide", message);
}

async function speakExpression(item, repeat = 1) {
  if (!canUseOnlineSpeech()) {
    showOfflineSpeechMessage();
    return false;
  }
  const text = cleanSpeechText(item?.english || "");
  if (!text) return;

  if (NATIVE_AUDIO_MODE === "tts" && window.speechSynthesis) {
    await speakEnglish(text, repeat);
    return;
  }

  try {
    await playNativeAudio(item, repeat);
  } catch {
    if (window.speechSynthesis) await speakEnglish(text, repeat);
  }
}

let _cachedVoice = null;

function cleanSpeechText(text) {
  return String(text || "").replace(/\s*\[.*?\]/g, "").trim();
}

async function getBestEnglishVoice() {
  if (_cachedVoice) return _cachedVoice;
  if (!window.speechSynthesis) return null;
  let voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    await new Promise((r) => {
      const cb = () => { window.speechSynthesis.removeEventListener("voiceschanged", cb); r(); };
      window.speechSynthesis.addEventListener("voiceschanged", cb);
      setTimeout(r, 3000);
    });
    voices = window.speechSynthesis.getVoices();
  }
  if (!voices.length) return null;
  const blockedVoiceTerms = ["korean", "ko-kr", "한국", "대한민국"];
  const americanVoices = voices.filter((voice) => {
    const lang = String(voice.lang || "").toLowerCase();
    const name = String(voice.name || "").toLowerCase();
    const isAmericanEnglish =
      lang === "en-us" ||
      lang === "en_us" ||
      /english.*(?:united states|us\b)|(?:united states|us\b).*english/i.test(voice.name);
    return isAmericanEnglish &&
      !blockedVoiceTerms.some((term) => lang.includes(term) || name.includes(term));
  });
  if (!americanVoices.length) return null;
  const priority = [
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Jenny Online (Natural) - English (United States)",
    "Microsoft Guy Online (Natural) - English (United States)",
    "Microsoft Emma Online (Natural) - English (United States)",
    "Google US English",
    "Microsoft Ava Online (Natural) - English (United States)",
    "Microsoft Andrew Online (Natural) - English (United States)",
    "Microsoft Zira - English (United States)",
    "Microsoft David - English (United States)",
    "Samantha",
    "Alex",
  ];
  for (const name of priority) {
    const v = americanVoices.find((v) => v.name === name);
    if (v) { _cachedVoice = v; return v; }
  }
  const naturalVoice = americanVoices.find((v) => /natural|online|premium/i.test(v.name));
  const fallback = naturalVoice || americanVoices[0] || null;
  _cachedVoice = fallback;
  return _cachedVoice;
}

async function speakEnglish(text, repeat = 1) {
  const spokenText = cleanSpeechText(text);
  if (!spokenText) return false;

  // 서버가 Microsoft Ava Neural 음원을 생성해 캐시한다.
  // 이 PC의 로컬 영어 음성은 오래된 Zira Desktop뿐이므로 Neural 음원을 우선한다.
  // 네트워크 순간 지연 등 일시적 실패로 로봇 음성까지 떨어지지 않도록 한 번 재시도한다.
  try {
    for (let i = 0; i < repeat; i++) {
      await playNeuralTTSWithRetry(spokenText);
      if (i < repeat - 1) await new Promise((r) => setTimeout(r, 350));
    }
    return true;
  } catch (_) {
    // 서버 음원 생성이 재시도까지 막힌 경우에만 설치된 미국 영어 음성을 사용한다.
  }

  if (window.speechSynthesis) {
    const voice = await getBestEnglishVoice();
    if (voice) {
      window.speechSynthesis.cancel();
      const spoken = await new Promise((resolve) => {
        let count = 0;
        let settled = false;
        const finish = (result) => {
          if (settled) return;
          settled = true;
          resolve(result);
        };
        const timeout = setTimeout(() => finish(false), Math.max(10000, repeat * 9000));
        const speakNext = () => {
          const utter = new SpeechSynthesisUtterance(spokenText);
          utter.lang = "en-US";
          utter.rate = SPEECH_RATE;
          utter.pitch = SPEECH_PITCH;
          utter.voice = voice;
          utter.onend = () => {
            count += 1;
            if (count < repeat) {
              setTimeout(speakNext, 300);
            } else {
              clearTimeout(timeout);
              finish(true);
            }
          };
          utter.onerror = () => {
            clearTimeout(timeout);
            finish(false);
          };
          window.speechSynthesis.speak(utter);
        };
        speakNext();
      });
      if (spoken) return true;
    }
  }
  window.ReadingBrainGameUI?.setMascot?.("wrong", "발음을 재생하지 못했어요. 잠시 후 다시 눌러 주세요.");
  return false;
}

let activeCardAudioEl = null;

// 발음 버튼을 연타하거나 카드가 바뀌는 순간 이전 재생과 겹쳐 소리가 끊기는 것을 막는다.
function stopActiveCardAudio() {
  if (!activeCardAudioEl) return;
  activeCardAudioEl.onended = null;
  activeCardAudioEl.onerror = null;
  activeCardAudioEl.pause();
  activeCardAudioEl = null;
}

function playNeuralTTS(word) {
  return new Promise((resolve, reject) => {
    stopActiveCardAudio();
    const url = `/api/tts?text=${encodeURIComponent(word)}`;
    const audio = new Audio(url);
    audio.preload = "auto";
    activeCardAudioEl = audio;
    audio.onended = () => {
      if (activeCardAudioEl === audio) activeCardAudioEl = null;
      resolve(true);
    };
    audio.onerror = () => {
      if (activeCardAudioEl === audio) activeCardAudioEl = null;
      reject(new Error("gtts-failed"));
    };
    audio.play().catch((error) => {
      if (activeCardAudioEl === audio) activeCardAudioEl = null;
      reject(error);
    });
  });
}

// 새 음원 생성이 순간적으로 실패해도 로봇 음성으로 떨어지기 전에 한 번 더 시도한다.
async function playNeuralTTSWithRetry(word, attempts = 2) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await playNeuralTTS(word);
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }
  throw lastError;
}

function playBookquizAudio(item) {
  return new Promise((resolve, reject) => {
    if (!item) {
      reject(new Error("bookquiz-item-missing"));
      return;
    }
    const audio = new Audio(`assets/bookquiz-audio/${item.id}.mp3`);
    audio.preload = "auto";
    audio.onended = () => resolve(true);
    audio.onerror = () => reject(new Error("bookquiz-audio-missing"));
    audio.play().catch(reject);
  });
}

async function speakBookquizItem(item) {
  if (!item) return;
  if (!canUseOnlineSpeech()) {
    showOfflineSpeechMessage();
    return false;
  }
  try {
    await playBookquizAudio(item);
  } catch {
    await speakEnglish(item.english, 1);
  }
}

function playVerbAudio(verb, form) {
  return new Promise((resolve, reject) => {
    if (!verb || !["base", "past", "pp"].includes(form)) {
      reject(new Error("verb-audio-invalid"));
      return;
    }
    const audio = new Audio(`assets/verb-audio/${verb.id}-${form}.mp3`);
    audio.preload = "auto";
    audio.onended = () => resolve(true);
    audio.onerror = () => reject(new Error("verb-audio-missing"));
    audio.play().catch(reject);
  });
}

async function speakVerb(verb, form) {
  if (!verb) return;
  if (!canUseOnlineSpeech()) {
    showOfflineSpeechMessage();
    return false;
  }
  try {
    await playVerbAudio(verb, form);
  } catch {
    await speakEnglish(verb[form], 1);
  }
}

async function speakAllVerbForms(button = null, verb = currentVerb()) {
  if (!canUseOnlineSpeech()) {
    showOfflineSpeechMessage();
    return false;
  }
  if (!verb) return;
  if (button?.disabled) return;

  const originalLabel = button?.textContent || "";
  if (button) button.disabled = true;
  try {
    const sequence = [
      ["base", "원형"],
      ["past", "과거형"],
      ["pp", "과거분사"],
    ];
    for (const [form, label] of sequence) {
      if (button) button.textContent = `${label} 듣는 중`;
      await speakVerb(verb, form);
      await new Promise((r) => setTimeout(r, 550));
    }
  } finally {
    if (button) {
      button.textContent = originalLabel;
      button.disabled = false;
    }
  }
}

function makeOptions(answer, key, sourceItems = expressions) {
  const answerText = answer[key];
  const primaryPool = sourceItems.filter(
    (item) => item.id !== answer.id && item[key] !== answerText && meaningKey(item) !== meaningKey(answer),
  );
  const fallbackPool = expressions.filter(
    (item) =>
      item.id !== answer.id &&
      item[key] !== answerText &&
      meaningKey(item) !== meaningKey(answer) &&
      !primaryPool.some((primary) => primary.id === item.id),
  );
  const options = shuffle([...primaryPool, ...fallbackPool]).slice(0, 3);
  return shuffle([answer, ...options]).map((item) => ({
    id: item.id,
    text: item[key],
  }));
}

function quizItems() {
  return currentStudyCards();
}

function quizTitle() {
  return "섹션퀴즈";
}

function newQuiz() {
  const pool = quizItems();
  const dailyCourse = activeDailyCourse("pattern");
  const dailyItems = dailyCourse && dailyLearning.courseItems
    ? dailyLearning.courseItems(dailyCourse, pool)
    : [];
  const item = dailyItems.length
    ? dailyItems[dailyCourse.itemIndex % dailyItems.length]
    : pool[(state.quizCount - 1) % pool.length];
  const askKorean = Math.random() > 0.45;
  state.quizItem = item;
  state.quizAnswer = item.id;
  elements.quizFeedback.textContent = "";
  elements.quizCount.textContent = `${quizTitle()} · 문제 ${state.quizCount}`;
  elements.quizScopeText.textContent = `현재 패턴 섹션 ${pool.length}개 표현에서 출제됩니다.`;
  elements.quizPrompt.textContent = askKorean ? "뜻에 맞는 영어 표현은?" : "영어 표현의 뜻은?";
  elements.quizQuestion.textContent = askKorean ? item.korean : item.english;

  const optionKey = askKorean ? "english" : "korean";
  elements.quizOptions.innerHTML = "";
  makeOptions(item, optionKey, gameItems()).forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-card";
    button.textContent = option.text;
    button.dataset.id = option.id;
    button.addEventListener("click", () => checkQuiz(button, option.id));
    elements.quizOptions.appendChild(button);
  });
}

function checkQuiz(button, id) {
  const buttons = $$("#quizOptions button");
  const mascotState = id === state.quizAnswer ? "correct" : "wrong";
  buttons.forEach((option) => {
    option.disabled = true;
    if (Number(option.dataset.id) === state.quizAnswer) option.classList.add("correct");
  });

  if (id === state.quizAnswer) {
    button.classList.add("correct");
    state.score += 20 + Math.min(state.streak * 2, 20);
    state.streak += 1;
    state.mastered.add(state.quizItem.id);
    state.review.delete(state.quizItem.id);
    bumpDaily("correct");
    elements.quizFeedback.textContent = "정답입니다!";
  } else {
    button.classList.add("wrong");
    state.streak = 0;
    state.review.add(state.quizItem.id);
    elements.quizFeedback.textContent = `다시 복습해요: ${state.quizItem.english}`;
  }

  saveState();
  updateStats();
  const activePatternCourse = activeDailyCourse("pattern");
  const advanceToken = `pattern:${state.quizCount}:${state.quizAnswer}`;
  const courseProgress = progressDailyAnswer("pattern", {
    token: advanceToken,
    correct: id === state.quizAnswer,
    itemId: state.quizItem.id,
  });
  if (!activePatternCourse && (!state.quizType || state.quizType === "section") && state.quizCount >= SECTION_QUIZ_TARGET) {
    elements.quizFeedback.textContent += ` ${SECTION_QUIZ_TARGET}문제를 완료했습니다! 통역 테스트로 이동합니다.`;
    completeFlowStep("quiz");
    window.ReadingBrainGameUI?.setMascot?.("complete");
    scheduleCourseAdvance(advanceToken, 1400, () => setMode("interpret"));
    return;
  }
  state.quizCount += 1;
  const nextQuizDelay = id === state.quizAnswer ? 0 : 950;
  scheduleCourseAdvance(advanceToken, nextQuizDelay, () => continueDailyCourseOr("pattern", courseProgress, newQuiz));
  window.ReadingBrainGameUI?.setMascot?.(mascotState);
}

// ── 마작 스타일 매칭 게임 ──────────────────────────────────────
let mahjong = { selected: null, matched: new Set(), pairs: [], locked: false };

function renderMatch() {
  const pairs = shuffle(gameItems()).slice(0, 6);
  mahjong = { selected: null, matched: new Set(), pairs, locked: false };

  const cards = [];
  pairs.forEach((item) => {
    cards.push({ id: item.id, type: "english", text: item.english });
    cards.push({ id: item.id, type: "korean",  text: item.korean  });
  });
  const shuffled = shuffle(cards);

  elements.matchStatus.textContent = "영어와 뜻을 찾아서 클릭하세요!";

  const board = $("#mahjongBoard");
  board.classList.remove("hidden");
  board.innerHTML = "";
  shuffled.forEach((card) => {
    const el = document.createElement("div");
    el.className = `mj-card mj-direct ${card.type === "english" ? "mj-english" : "mj-korean"}`;
    el.innerHTML = `<span>${card.text}</span>`;
    el.addEventListener("click", () => handleMahjong(el, card));
    board.appendChild(el);
  });
}

function handleMahjong(el, card) {
  if (mahjong.locked) return;
  if (el.classList.contains("mj-matched")) return;

  if (mahjong.selected?.el === el) {
    el.classList.remove("mj-selected");
    mahjong.selected = null;
    return;
  }

  if (!mahjong.selected) {
    el.classList.add("mj-selected");
    mahjong.selected = { el, card };
    return;
  }

  const { el: prevEl, card: prevCard } = mahjong.selected;
  prevEl.classList.remove("mj-selected");
  mahjong.selected = null;

  if (prevCard.id === card.id && prevCard.type !== card.type) {
    prevEl.classList.add("mj-matched");
    el.classList.add("mj-matched");
    mahjong.matched.add(card.id);
    state.score += 15;
    state.streak += 1;
    state.mastered.add(card.id);
    state.review.delete(card.id);
    saveState();
    updateStats();
    const total = mahjong.pairs.length;
    elements.matchStatus.textContent = `맞췄어요! ${mahjong.matched.size} / ${total} 완성`;
    if (mahjong.matched.size === total) {
      state.score += 50;
      saveState();
      updateStats();
      elements.matchStatus.textContent = "완성! 보너스 50점 · 새 판이 시작됩니다";
      elements.matchStatus.textContent = "매칭 완료! 통역 테스트로 이동합니다.";
      completeFlowStep("match");
      setTimeout(() => setMode("interpret"), 1200);
    }
  } else {
    mahjong.locked = true;
    el.classList.add("mj-wrong");
    prevEl.classList.add("mj-wrong");
    state.streak = 0;
    elements.matchStatus.textContent = "아직 아니에요! 다시 찾아봐요.";
    setTimeout(() => {
      el.classList.remove("mj-wrong");
      prevEl.classList.remove("mj-wrong");
      mahjong.locked = false;
    }, 700);
  }
}

// ── 블래스트 공통 난이도 ───────────────────────────────────────
// 패턴 / 동사 / 북퀴즈 세 게임이 같은 값을 쓴다.
const BLAST_TUNING = {
  lives: 5,
  maxLives: 5,
  waveEvery: 8, // 정답 N개마다 웨이브 상승
  bonusLifeEvery: 3, // 웨이브 N개마다 목숨 +1
  fallStart: 6.5,
  fallMin: 2.2,
  fallStep: 0.25,
  respawnAfterHit: 700,
  respawnAfterMiss: 1200,
};

// 목숨 표시 — 이모지 대신 스프라이트 하트를 채운 개수만큼 켠다.
function blastHeartsMarkup(lives) {
  const filled = Math.max(0, Math.min(BLAST_TUNING.maxLives, lives));
  return Array.from({ length: BLAST_TUNING.maxLives }, (unused, index) =>
    `<svg class="blast-heart${index < filled ? " on" : ""}"><use href="#ico-heart" /></svg>`,
  ).join("");
}

function newBlastGame(extra = {}) {
  return {
    active: false,
    lives: BLAST_TUNING.lives,
    score: 0,
    wave: 1,
    correct: 0,
    enemyTimer: null,
    ...extra,
  };
}

function blastFallDuration(wave) {
  return Math.max(
    BLAST_TUNING.fallMin,
    BLAST_TUNING.fallStart - (wave - 1) * BLAST_TUNING.fallStep,
  );
}

// 정답 처리 뒤 호출한다. 웨이브를 올리고, 주기마다 목숨을 하나 돌려준다.
function blastAdvanceWave(game) {
  if (game.correct % BLAST_TUNING.waveEvery !== 0) return;
  game.wave += 1;
  if (game.wave % BLAST_TUNING.bonusLifeEvery === 0 && game.lives < BLAST_TUNING.maxLives) {
    game.lives += 1;
  }
}

// ── 동사 블래스트 게임 ─────────────────────────────────────────
let verbBlast = newBlastGame({ currentVerb: null });

function initVerbBlastScreen() {
  verbBlast.active = false;
  if (verbBlast.enemyTimer) { clearTimeout(verbBlast.enemyTimer); verbBlast.enemyTimer = null; }
  const overlay = $("#verbBlastOverlay");
  if (overlay) overlay.classList.remove("hidden");
  $("#verbBlastOptions").innerHTML = "";
  $("#verbBlastArena").querySelectorAll(".blast-enemy").forEach((e) => e.remove());
  addVerbBlastStars();
}

function addVerbBlastStars() {
  const arena = $("#verbBlastArena");
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "blast-star";
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${0.3 + Math.random() * 0.6};`;
    arena.appendChild(s);
  }
}

function startVerbBlast() {
  verbBlast = newBlastGame({ currentVerb: null });
  verbBlast.active = true;
  updateVerbBlastHUD();
  $("#verbBlastOverlay").classList.add("hidden");
  spawnVerbBlastEnemy();
}

function stopVerbBlast() {
  verbBlast.active = false;
  if (verbBlast.enemyTimer) { clearTimeout(verbBlast.enemyTimer); verbBlast.enemyTimer = null; }
}

function spawnVerbBlastEnemy() {
  if (!verbBlast.active) return;
  const arena = $("#verbBlastArena");
  if (!arena) return;

  arena.querySelectorAll(".blast-enemy").forEach((e) => e.remove());
  const pool = filteredVerbs();
  const item = pool[Math.floor(Math.random() * pool.length)];
  verbBlast.currentVerb = item;

  const wrongPool = shuffle(pool.filter((v) => v.id !== item.id && v.pp !== item.pp));
  const allVerbs = verbs.filter((v) => v.id !== item.id && v.pp !== item.pp);
  const fallback = allVerbs.filter((v) => !wrongPool.some((w) => w.id === v.id));
  const options = shuffle([item, ...shuffle([...wrongPool, ...fallback]).slice(0, 3)]);

  const enemy = document.createElement("div");
  enemy.className = "blast-enemy";
  enemy.textContent = `${item.base} (${item.meaning})`;
  const duration = blastFallDuration(verbBlast.wave);
  enemy.style.animationDuration = `${duration}s`;
  arena.appendChild(enemy);

  enemy.addEventListener("animationend", () => {
    if (!verbBlast.active || verbBlast.currentVerb?.id !== item.id) return;
    verbBlast.currentVerb = null;
    $$(".blast-option").forEach((b) => (b.disabled = true));
    $$(".blast-option").forEach((b) => {
      if (b.dataset.pp === item.pp) b.classList.add("blast-correct");
    });
    verbBlastLoseLife();
  });

  const optEl = $("#verbBlastOptions");
  optEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "blast-option";
    btn.textContent = opt.pp;
    btn.dataset.pp = opt.pp;
    btn.addEventListener("click", () => {
      if (!verbBlast.active || verbBlast.currentVerb?.id !== item.id) return;
      handleVerbBlastAnswer(opt.id === item.id, btn, enemy, item);
    });
    optEl.appendChild(btn);
  });
}

function handleVerbBlastAnswer(isCorrect, clickedBtn, enemy, correctItem) {
  verbBlast.currentVerb = null;
  enemy.style.animationPlayState = "paused";
  $$(".blast-option").forEach((b) => (b.disabled = true));

  if (isCorrect) {
    enemy.classList.add("blast-hit");
    clickedBtn.classList.add("blast-correct");
    verbBlast.score += 10 + verbBlast.wave * 2;
    verbBlast.correct += 1;
    blastAdvanceWave(verbBlast);
    state.score += 5;
    saveState();
    updateStats();
    updateVerbBlastHUD();
    verbBlast.enemyTimer = setTimeout(spawnVerbBlastEnemy, BLAST_TUNING.respawnAfterHit);
  } else {
    clickedBtn.classList.add("blast-wrong");
    $$(".blast-option").forEach((b) => {
      if (b.dataset.pp === correctItem.pp) b.classList.add("blast-correct");
    });
    verbBlastLoseLife();
  }
}

function verbBlastLoseLife() {
  verbBlast.lives--;
  updateVerbBlastHUD();
  if (verbBlast.lives <= 0) {
    verbBlast.active = false;
    verbBlastGameOver();
    return;
  }
  verbBlast.enemyTimer = setTimeout(spawnVerbBlastEnemy, BLAST_TUNING.respawnAfterMiss);
}

function updateVerbBlastHUD() {
  const hearts = blastHeartsMarkup(verbBlast.lives);
  const livesEl = $("#verbBlastLivesText");
  if (livesEl) livesEl.innerHTML = hearts;
  const scoreEl = $("#verbBlastScoreText");
  if (scoreEl) scoreEl.textContent = verbBlast.score;
  const waveEl = $("#verbBlastWaveText");
  if (waveEl) waveEl.textContent = verbBlast.wave;
}

function verbBlastGameOver() {
  const overlay = $("#verbBlastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.querySelector("h2").textContent = "게임 오버!";
    overlay.querySelector("p").textContent = `${verbBlast.score}점을 획득했어요!\n다시 해볼까요?`;
  }
  state.score += verbBlast.score;
  saveState();
  updateStats();
  const dailyCourse = activeDailyCourse("pattern");
  if (dailyCourse?.stage === "interpret" && dailyLearning.advanceStage) {
    let nextCourse = dailyLearning.advanceStage(dailyCourse);
    if (nextCourse.stage === "review" && dailyLearning.prepareReview) {
      nextCourse = dailyLearning.prepareReview(nextCourse);
    }
    setActiveDailyCourse(nextCourse);
    window.setTimeout(() => openDailyCourse(nextCourse), 1400);
  }
}

// ── 블래스트 게임 ──────────────────────────────────────────────
let blast = newBlastGame({ currentItem: null });

function initBlastScreen() {
  blast.active = false;
  const overlay = $("#blastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    $("#blastOverlayTitle").textContent = "블래스트!";
    $("#blastOverlayMsg").textContent = "떨어지는 한글 뜻을 보고\n맞는 영어 표현을 눌러 격파하세요!";
  }
  $("#blastOptions").innerHTML = "";
  $("#blastArena").querySelectorAll(".blast-enemy").forEach((e) => e.remove());
  addBlastStars();
}

function addBlastStars() {
  const arena = $("#blastArena");
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "blast-star";
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${0.3 + Math.random() * 0.6};`;
    arena.appendChild(s);
  }
}

function startBlast() {
  blast = newBlastGame({ currentItem: null });
  blast.active = true;
  updateBlastHUD();
  const overlay = $("#blastOverlay");
  if (overlay) overlay.classList.add("hidden");
  spawnBlastEnemy();
}

function stopBlast() {
  blast.active = false;
  if (blast.enemyTimer) { clearTimeout(blast.enemyTimer); blast.enemyTimer = null; }
}

function spawnBlastEnemy() {
  if (!blast.active) return;
  const arena = $("#blastArena");
  if (!arena) return;

  arena.querySelectorAll(".blast-enemy").forEach((e) => e.remove());
  const pool = gameItems();
  const item = pool[Math.floor(Math.random() * pool.length)];
  blast.currentItem = item;

  const others = shuffle(pool.filter((p) => p.id !== item.id && meaningKey(p) !== meaningKey(item))).slice(0, 3);
  const options = shuffle([item, ...others]);

  const enemy = document.createElement("div");
  enemy.className = "blast-enemy";
  enemy.textContent = item.korean;
  const duration = blastFallDuration(blast.wave);
  enemy.style.animationDuration = `${duration}s`;
  arena.appendChild(enemy);

  enemy.addEventListener("animationend", () => {
    if (!blast.active || blast.currentItem?.id !== item.id) return;
    blast.currentItem = null;
    $$(".blast-option").forEach((b) => (b.disabled = true));
    $$(".blast-option").forEach((b) => {
      if (b.textContent === item.english) b.classList.add("blast-correct");
    });
    blastLoseLife();
  });

  const optEl = $("#blastOptions");
  optEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "blast-option";
    btn.textContent = opt.english;
    btn.addEventListener("click", () => {
      if (!blast.active || blast.currentItem?.id !== item.id) return;
      handleBlastAnswer(opt.id === item.id, btn, enemy, item);
    });
    optEl.appendChild(btn);
  });
}

function handleBlastAnswer(isCorrect, clickedBtn, enemy, correctItem) {
  blast.currentItem = null;
  enemy.style.animationPlayState = "paused";
  $$(".blast-option").forEach((b) => (b.disabled = true));

  if (isCorrect) {
    enemy.classList.add("blast-hit");
    clickedBtn.classList.add("blast-correct");
    blast.score += 10 + blast.wave * 2;
    blast.correct += 1;
    blastAdvanceWave(blast);
    state.score += 5;
    saveState();
    updateStats();
    updateBlastHUD();
    blast.enemyTimer = setTimeout(spawnBlastEnemy, BLAST_TUNING.respawnAfterHit);
  } else {
    clickedBtn.classList.add("blast-wrong");
    $$(".blast-option").forEach((b) => {
      if (b.textContent === correctItem.english) b.classList.add("blast-correct");
    });
    blastLoseLife();
  }
}

function blastLoseLife() {
  blast.lives--;
  updateBlastHUD();
  if (blast.lives <= 0) {
    blast.active = false;
    blastGameOver();
    return;
  }
  blast.enemyTimer = setTimeout(spawnBlastEnemy, BLAST_TUNING.respawnAfterMiss);
}

function updateBlastHUD() {
  const hearts = blastHeartsMarkup(blast.lives);
  const livesEl = $("#blastLivesText");
  if (livesEl) livesEl.innerHTML = hearts;
  const scoreEl = $("#blastScoreText");
  if (scoreEl) scoreEl.textContent = blast.score;
  const waveEl = $("#blastWaveText");
  if (waveEl) waveEl.textContent = blast.wave;
}

function blastGameOver() {
  const overlay = $("#blastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    $("#blastOverlayTitle").textContent = "게임 오버!";
    $("#blastOverlayMsg").textContent = `${blast.score}점을 획득했어요!\n다시 해볼까요?`;
  }
  completeFlowStep("blast");
  if (flowModeUnlocked("blast")) markSectionCleared(state.category);
  state.score += blast.score;
  saveState();
  updateStats();
}

async function renderLeaderboard() {
  elements.leaderboardSummary.textContent = "랭킹을 불러오는 중입니다...";
  elements.leaderboardPodium.innerHTML = "";
  elements.leaderboardList.innerHTML = "";
  try {
    const data = await apiRequest("/api/leaderboard");
    const leaders = data.leaders || [];
    elements.leaderboardSummary.textContent = leaders.length
      ? "로그인한 학생들의 누적 포인트 순위입니다."
      : "아직 랭킹에 표시할 학생 데이터가 없습니다.";
    const view = leaderboardModel.buildLeaderboardView?.(leaders, state.studentName) || { podium: [], ranking: [] };
    const podiumOrder = [view.podium[1], view.podium[0], view.podium[2]].filter(Boolean);
    elements.leaderboardPodium.innerHTML = podiumOrder
      .map((student) => `
        <article class="podium-card rank-${student.rank} ${student.isCurrent ? "is-current" : ""}">
          <span class="podium-medal" aria-label="${student.rank}위">${student.rank}</span>
          <strong>${escapeHtml(student.displayName)}</strong>
          <b>${escapeHtml(student.pointsText)}</b>
          <small>${escapeHtml(student.progressText)}</small>
          ${student.isCurrent ? '<span class="current-student-badge">나의 순위</span>' : ""}
        </article>
      `)
      .join("");
    elements.leaderboardList.innerHTML = view.ranking
      .map((student) => `
        <article class="leaderboard-row ${student.isCurrent ? "is-current" : ""}">
          <div class="rank-number">${student.rank}</div>
          <div class="rank-student">
            <strong>${escapeHtml(student.displayName)}</strong>
            <span>${escapeHtml(student.progressText)}</span>
          </div>
          <div class="rank-points">${escapeHtml(student.pointsText)}</div>
          ${student.isCurrent ? '<span class="current-student-badge">나의 순위</span>' : ""}
        </article>
      `)
      .join("");
  } catch (error) {
    const message = "랭킹을 불러오지 못했어요. 새로고침을 눌러 다시 시도해 주세요.";
    elements.leaderboardSummary.textContent = message;
    elements.leaderboardSummary.classList.add("mg-error-state");
    window.ReadingBrainGameUI?.setMascot?.("wrong", message);
  }
}

const PATTERN_MODES = ["hub", "study", "quiz", "interpret"];

function syncMobileBottomNav(mode) {
  $$("[data-mobile-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mobileMode === mode);
    button.setAttribute("aria-current", button.dataset.mobileMode === mode ? "page" : "false");
  });
}

function setMode(mode) {
  cancelScheduledCourseAdvance();
  cancelStudyCardAdvance();
  if (mode === "wordgames" || !$(`#${mode}View`)) mode = "study";
  if (mode === "interpret" && state.category === "all") {
    const sections = patternSections();
    const currentSection = patternHub.findCurrentSection?.(sections) || sections[0];
    if (currentSection) {
      state.category = currentSection.key;
      if (elements.categorySelect) elements.categorySelect.value = currentSection.key;
    }
  }
  state.mode = mode;
  $$(".mode-button").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  $$(".guide-step").forEach((step) => step.classList.toggle("active", step.dataset.guideMode === mode));
  const patternBar = $("#patternModeBar");
  if (patternBar) {
    patternBar.classList.toggle("hidden", !PATTERN_MODES.includes(mode));
    $$(".pmode-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.pmode === mode));
  }
  const dashboard = $("#studentDashboard");
  if (dashboard) dashboard.classList.toggle("hidden", mode !== "hub");
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#${mode}View`).classList.add("active");
  elements.screenTitle.textContent = {
    hub: "패턴 허브",
    interpret: "통역 테스트",
    study: "카드 학습",
    quiz: "퀴즈",
    leaderboard: "포인트 랭킹",
    verb: "동사 3단 변화",
    bookquiz: "북퀴즈 학습",
    reward: "오늘의 학습 완료",
  }[mode];
  const mobileTitle = $("#mobileTitle");
  if (mobileTitle) mobileTitle.textContent = elements.screenTitle.textContent;
  syncMobileBottomNav(mode);
  setNavOpen(false);
  window.ReadingBrainGameUI?.setMode?.(mode);

  if (mode !== "interpret") stopInterpret();
  if (mode === "interpret") renderInterpretEntry(patternSections());
  if (mode === "study") renderStudy();
  if (mode === "quiz") {
    newQuiz();
  }
  if (mode === "leaderboard") renderLeaderboard();
  if (mode === "verb") initVerbMode();
  if (mode === "bookquiz") initBookquizMode();
  stopWordGameTimer();
  if (mode !== "blast") stopBlast();
  if (mode !== "verb") stopVerbBlast();
  renderDashboard();
  renderPatternSurfaces();
}

function studyTargetMode() {
  return state.mode === "hub" || !PATTERN_MODES.includes(state.mode) ? "study" : state.mode;
}

function applyPatternQuery(value, source) {
  state.patternQuery = value;
  syncSearchInputs(source);

  const sections = patternSections();
  const matched = patternHub.filterSections ? patternHub.filterSections(sections, value) : sections;
  if (value.trim() && !matched.some((section) => section.group === state.hubGroup)) {
    const fallback = matched[0];
    if (fallback) state.hubGroup = fallback.group;
  }
  renderPatternNav(sections);
  if (state.mode === "hub") renderHub(sections);
}

function bindPatternHubEvents() {
  const hubBtn = $("#patternHubBtn");
  if (hubBtn) hubBtn.addEventListener("click", () => setMode("hub"));

  const navHost = $("#patternNavGroups");
  if (navHost) {
    navHost.addEventListener("click", (event) => {
      const groupHead = event.target.closest(".pnav-group-head");
      if (groupHead) {
        const id = groupHead.dataset.group;
        state.navOpenGroups[id] = !state.navOpenGroups[id];
        renderPatternNav(patternSections());
        return;
      }
      const row = event.target.closest(".pnav-row");
      if (row) selectSection(row.dataset.section, studyTargetMode());
    });
  }

  const navSearch = $("#patternSearchInput");
  if (navSearch) {
    navSearch.addEventListener("input", (event) => applyPatternQuery(event.target.value, event.target));
  }
  const hubSearch = $("#hubSearchInput");
  if (hubSearch) {
    hubSearch.addEventListener("input", (event) => applyPatternQuery(event.target.value, event.target));
  }

  const hubTabs = $("#hubGroupTabs");
  if (hubTabs) {
    hubTabs.addEventListener("click", (event) => {
      const tab = event.target.closest(".hub-tab");
      if (!tab) return;
      state.hubGroup = tab.dataset.group;
      renderHub(patternSections());
    });
  }

  const hubPath = $("#hubPath");
  if (hubPath) {
    hubPath.addEventListener("click", (event) => {
      const node = event.target.closest(".planet-button");
      if (node && !node.disabled) selectSection(node.dataset.section, "study");
    });
  }

  const resume = $("#hubResume");
  if (resume) {
    resume.addEventListener("click", () => {
      selectSection(resume.dataset.section, "study", resume.dataset.index);
    });
  }

  const doneBtn = $("#sectionDoneBtn");
  if (doneBtn) {
    doneBtn.addEventListener("click", () => {
      const banner = $("#sectionDoneBanner");
      if (banner.dataset.action === "interpret") {
        setMode("interpret");
        return;
      }
      if (banner.dataset.section) selectSection(banner.dataset.section, "study");
    });
  }

  bindInterpretEvents();
  bindMobileNavEvents();
  document.addEventListener("keydown", handleStudyShortcut);
}

// ── 모바일 드로어 ──────────────────────────────────────────────
function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  const scrim = $("#navScrim");
  if (scrim) scrim.hidden = !open;
  const toggle = $("#mobileNavBtn");
  if (toggle) toggle.setAttribute("aria-expanded", String(open));
}

function bindMobileNavEvents() {
  const toggle = $("#mobileNavBtn");
  if (toggle) toggle.addEventListener("click", () => setNavOpen(!document.body.classList.contains("nav-open")));

  const close = $("#sidebarCloseBtn");
  if (close) close.addEventListener("click", () => setNavOpen(false));

  const scrim = $("#navScrim");
  if (scrim) scrim.addEventListener("click", () => setNavOpen(false));

  $$("[data-mobile-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mobileMode;
      if (mode === "menu") {
        setNavOpen(true);
        return;
      }
      setNavOpen(false);
      setMode(mode);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNavOpen(false);
  });

  // 사이드바에서 무언가를 고르면 드로어를 닫는다.
  const sidebar = $(".sidebar");
  if (sidebar) {
    sidebar.addEventListener("click", (event) => {
      if (event.target.closest(".pnav-row, .pattern-hub-btn, .mode-button")) setNavOpen(false);
    });
  }
}

function bindInterpretEvents() {
  const start = $("#interpretStartBtn");
  if (start) start.addEventListener("click", startInterpretRun);

  const stop = $("#interpretStopBtn");
  if (stop) {
    stop.addEventListener("click", () => {
      stopInterpret();
      renderInterpretEntry(patternSections());
    });
  }

  const selfPass = $("#interpretSelfPass");
  if (selfPass) {
    selfPass.addEventListener("click", () => {
      const run = state.interpret;
      if (run) finishInterpretQuestion("pass", run.items[run.index]);
    });
  }
  const selfFail = $("#interpretSelfFail");
  if (selfFail) {
    selfFail.addEventListener("click", () => {
      const run = state.interpret;
      if (run) finishInterpretQuestion("fail", run.items[run.index]);
    });
  }
}

function handleStudyShortcut(event) {
  if (state.mode !== "study") return;
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  const target = event.target;
  const canMatch = target && typeof target.closest === "function";
  if (canMatch && (target.closest("input, textarea, select") || target.isContentEditable)) return;
  if (document.body.classList.contains("locked")) return;

  // 카드나 버튼에 포커스가 있으면 Space/Enter 는 해당 요소가 처리한다.
  const selfHandled = event.key === " " || event.key === "Enter";
  if (selfHandled && canMatch && target.closest("button, #flashcard")) return;

  if (event.key === "ArrowLeft") { moveCard(-1); }
  else if (event.key === "ArrowRight") { markKnown(true); }
  else if (event.key === " " || event.key === "Enter") { elements.flashcard.classList.toggle("flipped"); }
  else return;

  event.preventDefault();
}

function bindEvents() {
  elements.loginForm.addEventListener("submit", loginStudent);
  elements.logoutButton.addEventListener("click", logoutStudent);
  $("#dailyCourseCta")?.addEventListener("click", () => {
    if ($("#dailyCourseCta").dataset.ctaMode === "resume") resumeDailyCourse();
    else startDailyCourse("pattern");
  });
  $$('[data-course-section]').forEach((button) => {
    button.addEventListener("click", () => startDailyCourse(button.dataset.courseSection));
  });
  $("#courseRewardDoneBtn")?.addEventListener("click", finishDailyCourse);

  $$(".guide-step").forEach((step) => {
    step.addEventListener("click", () => setMode(step.dataset.guideMode));
    step.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") setMode(step.dataset.guideMode);
    });
  });

  $$(".pmode-btn").forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.pmode));
  });
  $("#verbNavBtn").addEventListener("click", () => setMode("verb"));
  $("#bqNavBtn").addEventListener("click", () => setMode("bookquiz"));
  $("#leaderboardNavBtn").addEventListener("click", () => setMode("leaderboard"));
  bindPatternHubEvents();

  elements.flashcard.addEventListener("click", () => elements.flashcard.classList.toggle("flipped"));
  elements.flashcard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") elements.flashcard.classList.toggle("flipped");
  });
  $("#prevButton").addEventListener("click", () => moveCard(-1));
  $("#nextButton").addEventListener("click", () => moveCard(1));
  $("#refreshLeaderboardButton").addEventListener("click", renderLeaderboard);
  $("#newQuizButton").addEventListener("click", newQuiz);
  $("#blastStartBtn")?.addEventListener("click", startBlast);
  $("#verbBlastStartBtn")?.addEventListener("click", startVerbBlast);
  elements.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    state.index = 0;
    state.quizCount = 1;
    setMode("study");
  });

  $$(".vtype-btn").forEach((btn) => btn.addEventListener("click", () => setVerbType(btn.dataset.vtype)));
  $$(".vmode-btn").forEach((btn) => btn.addEventListener("click", () => setVerbMode(btn.dataset.vmode)));
  $("#verbPrevBtn").addEventListener("click", () => moveVerbCard(-1));
  $("#verbNextBtn").addEventListener("click", () => moveVerbCard(1));
  const verbAllBtn = $("#verbAllSpeakBtn");
  if (verbAllBtn) {
    verbAllBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      await speakAllVerbForms(verbAllBtn);
    });
  }
  $("#newVerbQuizBtn").addEventListener("click", newVerbQuiz);

  $$(".bqtype-btn").forEach((btn) => btn.addEventListener("click", () => setBQType(btn.dataset.bqtype)));
  $$(".bqmode-btn").forEach((btn) => btn.addEventListener("click", () => setBQSubMode(btn.dataset.bqmode)));
  $$("[data-bookquiz-node]").forEach((btn) => {
    btn.addEventListener("click", () => openBookquizNode(btn.dataset.bookquizNode, { review: state.bookquizMap?.allRoundsCompleted }));
  });
  $("#bookquizSecondRoundBtn")?.addEventListener("click", startBookquizSecondRound);
  $("#bqPrevBtn").addEventListener("click", () => moveBQCard(-1));
  $("#bqNextBtn").addEventListener("click", () => moveBQCard(1));
  $("#newBQQuizBtn").addEventListener("click", () => { state.bqQuizCount++; newBQQuiz(); });
  $("#bqBlastStartBtn")?.addEventListener("click", startBQBlast);

  if ($("#wgStartRouletteBtn")) {
  $$(".wg-tab").forEach((btn) => btn.addEventListener("click", () => setWordGameTab(btn.dataset.wgTab)));
  $("#wgFillExampleBtn").addEventListener("click", () => {
    $("#wgWordListInput").value = "apple, 사과\nbanana, 바나나\ncourage, 용기\ndelicious, 맛있는\nschool, 학교\nwater, 물";
    startRouletteGame();
  });
  $("#wgClearWordsBtn").addEventListener("click", () => {
    $("#wgWordListInput").value = "";
    state.wgWords = [];
    $("#wgRouletteWord").textContent = "단어 없음";
    $("#wgRouletteMeaning").textContent = "단어 목록을 입력해 주세요";
  });
  $("#wgStartRouletteBtn").addEventListener("click", startRouletteGame);
  $("#wgSpinBtn").addEventListener("click", () => {
    state.wgWordIndex += 1;
    state.wgTimerRemaining = state.wgTimerSeconds;
    renderRouletteWord();
  });
  $("#wgCorrectBtn").addEventListener("click", () => {
    awardWordGamePoint(1);
    state.wgWordIndex += 1;
    state.wgTimerRemaining = state.wgTimerSeconds;
    renderRouletteWord();
  });
  $("#wgTimerToggleBtn").addEventListener("click", toggleWordGameTimer);
  $("#wgResetScoreBtn").addEventListener("click", () => {
    state.wgTotalCorrect = 0;
    state.wgTeamScores = [];
    updateWordGameScore();
    renderTeamScoreboard();
  });
  $$("#wgTimerOptions button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.wgTimerSeconds = Number(btn.dataset.time || 0);
      state.wgTimerRemaining = state.wgTimerSeconds;
      stopWordGameTimer();
      $$("#wgTimerOptions button").forEach((item) => item.classList.toggle("active", item === btn));
      renderRouletteWord();
    });
  });
  $("#wgCheckNounBtn").addEventListener("click", () => checkSortGame("noun"));
  $("#wgCheckPosBtn").addEventListener("click", () => checkSortGame("pos"));
  $("#wgNewNounSetBtn").addEventListener("click", () => newSortRound("noun"));
  $("#wgNewPosSetBtn").addEventListener("click", () => newSortRound("pos"));
  $("#wgSpeakingCheckBtn").addEventListener("click", checkSpeakingAnswer);
  $("#wgSpeakingListenBtn").addEventListener("click", () => speakEnglish($("#wgSpeakingAnswer").value, 1));
  $("#wgSpeakingNextBtn").addEventListener("click", () => {
    state.wgTotalCorrect += 1;
    state.wgSpeakingIndex += 1;
    updateWordGameScore();
    renderSpeakingGame();
  });
  $("#wgWritingNextTopicBtn").addEventListener("click", () => {
    state.wgWritingIndex += 1;
    renderWritingTopic();
  });
  $("#wgWritingMyTopicBtn").addEventListener("click", () => {
    const custom = prompt("쓰고 싶은 영어 주제를 입력해 주세요.", "My favorite animal");
    if (custom) {
      $("#wgWritingTitle").textContent = custom;
      $("#wgWritingKorean").textContent = "내가 정한 주제";
      $("#wgWritingHelpers").innerHTML = "";
      $("#wgWritingStarter").textContent = `이렇게 시작해도 좋아요: ${custom} is ___.`;
    }
  });
  $("#wgWritingText").addEventListener("input", () => {
    $("#wgWritingSaveStatus").textContent = "수정 중";
    countWritingWords();
  });
  $("#wgWritingSaveBtn").addEventListener("click", saveWritingDraft);
  $("#wgWritingClearBtn").addEventListener("click", () => {
    $("#wgWritingText").value = "";
    $("#wgWritingSaveStatus").textContent = "저장 전";
    countWritingWords();
  });
  $("#wgPhonicsCategories").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-phonics-category]");
    if (!button) return;
    state.wgPhonicsCategory = button.dataset.phonicsCategory;
    state.wgPhonicsIndex = 0;
    renderPhonicsCategories();
    renderPhonicsQuiz();
  });
  $("#wgPhonicsListenBtn").addEventListener("click", () => {
    const item = currentPhonicsItem();
    if (item) speakEnglish(item.word, 1);
  });
  $("#wgPhonicsShowBtn").addEventListener("click", () => {
    const item = currentPhonicsItem();
    if (item) $("#wgPhonicsFeedback").textContent = `정답: ${item.word} (${item.korean})`;
  });
  $("#wgPhonicsNextBtn").addEventListener("click", () => {
    state.wgPhonicsIndex += 1;
    renderPhonicsQuiz();
  });
  $("#wgSentenceCheckBtn").addEventListener("click", checkSentenceBuilder);
  $("#wgSentenceResetBtn").addEventListener("click", () => {
    state.wgSentencePicked = [];
    renderSentenceBuilder();
  });
  $("#wgSentenceNextBtn").addEventListener("click", () => {
    state.wgSentenceIndex += 1;
    state.wgSentencePicked = [];
    renderSentenceBuilder();
  });
  $("#wgDictationListenBtn").addEventListener("click", () => {
    const item = currentDictationItem();
    if (item) speakEnglish(item.text, 1);
  });
  $("#wgDictationCheckBtn").addEventListener("click", checkDictationAnswer);
  $("#wgDictationShowBtn").addEventListener("click", () => {
    const item = currentDictationItem();
    if (item) $("#wgDictationFeedback").textContent = `정답: ${item.text}`;
  });
  $("#wgDictationNextBtn").addEventListener("click", () => {
    state.wgDictationIndex += 1;
    renderDictationGame();
  });
  $("#wgSpellingCheckBtn").addEventListener("click", checkSpellingAnswer);
  $("#wgSpellingListenBtn").addEventListener("click", () => {
    const item = currentSpellingItem();
    if (item) speakEnglish(item.english, 1);
  });
  $("#wgSpellingNextBtn").addEventListener("click", () => {
    state.wgSpellingIndex += 1;
    renderSpellingGame();
  });
  }
}

// ──────────── 동사 3단 변화 ────────────

function verbTypelabel(type) {
  return { "규칙": "규칙 동사", "AAA": "불규칙 AAA", "ABA": "불규칙 ABA", "ABB": "불규칙 ABB", "ABC": "불규칙 ABC", "혼동": "혼동 주의" }[type] || type;
}

function verbBadgeClass(type) {
  return `verb-badge vtype-${type}`;
}

function filteredVerbs() {
  const course = activeDailyCourse("verb");
  if (course && dailyLearning.courseItems) {
    const items = dailyLearning.courseItems(course, verbs);
    if (items.length) return items;
  }
  return verbs.filter((v) => v.type === state.verbType);
}

function currentVerb() {
  const pool = filteredVerbs();
  if (!pool.length) return verbs[0];
  state.verbIndex = ((state.verbIndex % pool.length) + pool.length) % pool.length;
  return pool[state.verbIndex];
}


function verbExamples(v) {
  const base = v.base.replace(/\s*\[.*?\]/g, "").trim();
  return [
    `I <strong>${base}</strong> every day.`,
    `She <strong>${v.past}</strong> yesterday.`,
    `He has <strong>${v.pp}</strong> it before.`,
  ];
}

function renderVerbCard() {
  const pool = filteredVerbs();
  const verb = currentVerb();
  const count = `${state.verbIndex + 1} / ${pool.length}`;
  $("#verbCardMeta").textContent = count;
  $("#verbIndexDisplay").textContent = count;
  const badge = verbTypelabel(verb.type);
  const cls = verbBadgeClass(verb.type);
  $("#verbTypeBadge").textContent = badge;
  $("#verbTypeBadge").className = cls;
  $("#verbBaseDisplay").textContent = verb.base;
  $("#verbPastDisplay").textContent = verb.past;
  $("#verbPPDisplay").textContent = verb.pp;
  $("#verbMeaningDisplay").textContent = verb.meaning;
  const [ex1, ex2, ex3] = verbExamples(verb);
  $("#verbEx1").innerHTML = ex1;
  $("#verbEx2").innerHTML = ex2;
  $("#verbEx3").innerHTML = ex3;
  scheduleVerbFormsPronunciation(verb);
}

function renderVerbQuizForms(item, ask) {
  const forms = [
    ["base", $("#verbQuizBase")],
    ["past", $("#verbQuizPast")],
    ["pp", $("#verbQuizPP")],
  ];
  forms.forEach(([form, element]) => {
    const isBlank = form === ask;
    element.textContent = isBlank ? "_____" : item[form];
    element.classList.toggle("verb-quiz-blank", isBlank);
    element.removeAttribute("data-answer-state");
    if (isBlank) element.dataset.verbQuizBlank = "true";
    else delete element.dataset.verbQuizBlank;
  });
}

function newVerbQuiz() {
  const dailyCourse = activeDailyCourse("verb");
  const dailyItems = dailyCourse && dailyLearning.courseItems
    ? dailyLearning.courseItems(dailyCourse, verbs)
    : [];
  const pool = dailyItems.length ? dailyItems : filteredVerbs();
  if (!pool.length) return;
  const item = dailyCourse ? pool[dailyCourse.itemIndex % pool.length] : shuffle(pool)[0];
  const askPP = Math.random() > 0.5;
  state.verbQuizItem = item;
  state.verbQuizAsk = askPP ? "pp" : "past";
  $("#verbQuizFeedback").textContent = "";
  $("#verbQuizCount").textContent = `문제 ${state.verbQuizCount}`;
  $("#verbQuizPrompt").textContent = askPP ? "다음 동사의 과거분사형(P.P.)은?" : "다음 동사의 과거형(Past)은?";
  renderVerbQuizForms(item, state.verbQuizAsk);
  $("#verbQuizMeaning").textContent = item.meaning;

  const correctKey = askPP ? "pp" : "past";
  const correct = item[correctKey];
  const wrong = [];
  for (const v of shuffle(verbs.filter((v) => v.id !== item.id))) {
    const form = v[correctKey];
    if (form !== correct && !wrong.includes(form)) {
      wrong.push(form);
      if (wrong.length >= 3) break;
    }
  }
  const options = shuffle([correct, ...wrong.slice(0, 3)]);
  $("#verbQuizOptions").innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => checkVerbQuiz(btn, opt));
    $("#verbQuizOptions").appendChild(btn);
  });
}

function checkVerbQuiz(button, answer) {
  const correct = state.verbQuizItem[state.verbQuizAsk];
  const verbQuizBlank = $("[data-verb-quiz-blank]");
  if (verbQuizBlank) {
    verbQuizBlank.textContent = answer;
    verbQuizBlank.dataset.answerState = answer === correct ? "correct" : "wrong";
  }
  $$("#verbQuizOptions button").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
  });
  const v = state.verbQuizItem;
  if (answer === correct) {
    button.classList.add("correct");
    state.score += 15;
    state.streak += 1;
    $("#verbQuizFeedback").textContent = `정답! ${v.base} → ${v.past} → ${v.pp}`;
  } else {
    button.classList.add("wrong");
    state.streak = 0;
    $("#verbQuizFeedback").textContent = `다시 확인해요: ${v.base} → ${v.past} → ${v.pp}`;
  }
  saveState();
  updateStats();
  const advanceToken = `verb:${state.verbQuizCount}:${state.verbQuizItem.id}`;
  const courseProgress = progressDailyAnswer("verb", {
    token: advanceToken,
    correct: answer === correct,
    itemId: state.verbQuizItem.id,
  });
  state.verbQuizCount += 1;
  scheduleCourseAdvance(advanceToken, 1300, () => continueDailyCourseOr("verb", courseProgress, newVerbQuiz));
}

function setVerbType(type) {
  state.verbType = type;
  state.verbIndex = 0;
  $$(".vtype-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.vtype === type));
  if (state.verbMode === "card") renderVerbCard();
  else newVerbQuiz();
}

function setVerbMode(mode) {
  state.verbMode = mode;
  $$(".vmode-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.vmode === mode));
  $("#verbCardArea").classList.toggle("hidden", mode !== "card");
  $("#verbQuizArea").classList.toggle("hidden", mode !== "quiz");
  stopVerbBlast();
  if (mode === "card") renderVerbCard();
  else if (mode === "quiz") { state.verbQuizCount = 1; newVerbQuiz(); }
}

function initVerbMode() {
  state.verbMode = "card";
  state.verbType = "규칙";
  state.verbIndex = 0;
  $$(".vmode-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.vmode === "card"));
  $$(".vtype-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.vtype === "규칙");
  });
  $("#verbCardArea").classList.remove("hidden");
  $("#verbQuizArea").classList.add("hidden");
  stopVerbBlast();
  renderVerbCard();
}

// ──────────── 북퀴즈 패턴 학습 ────────────

function bqPool() {
  return state.bqType === "pattern" ? bqPatterns : bqWords;
}

const BQ_WORD_SESSION_SIZE = 5;

// 자유 학습(데일리 코스 밖)에서 핵심 단어 퀴즈를 매번 21개 전체가 아니라
// 고정된 5개 세트로 돌게 해, 패턴 섹션처럼 "다 풀면 다음 단계로" 진행할 수 있게 한다.
function bqWordSessionItems() {
  if (!state.bqWordSession || !state.bqWordSession.length) {
    state.bqWordSession = shuffle(bqWords).slice(0, Math.min(BQ_WORD_SESSION_SIZE, bqWords.length));
  }
  return state.bqWordSession;
}

function initBookquizMode() {
  const savedMap = state.learningProfile?.activeCourse?.section === "bookquiz"
    ? state.learningProfile.activeCourse.bookquizMap
    : state.learningProfile?.bookquizCompletion;
  state.bookquizMap = bookquizMapModel.resumeMap?.(savedMap || state.bookquizMap || {}) || state.bookquizMap;
  state.bqType = "word";
  state.bqSubMode = "card";
  state.bqIndex = 0;
  $$(".bqtype-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqtype === "word"));
  $$(".bqmode-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqmode === "card"));
  $("#bqCardArea").classList.remove("hidden");
  $("#bqQuizArea").classList.add("hidden");
  stopBQBlast();
  renderBookquizMap();
  renderBQCard();
}

function renderBookquizMap() {
  if (!state.bookquizMap) state.bookquizMap = bookquizMapModel.createMap?.() || null;
  const map = state.bookquizMap;
  if (!map) return;
  $("#bookquizRoundLabel").textContent = `${map.round}회독`;
  $("#bookquizMapProgress").textContent = `${map.completedStageIds.length} / 4 단계 완료`;
  $$("[data-bookquiz-node]").forEach((button) => {
    const node = button.dataset.bookquizNode;
    const complete = map.completedStageIds.includes(node) || map.allRoundsCompleted;
    const current = node === map.currentNode && !map.roundCompleted;
    const reviewing = map.allRoundsCompleted && node === map.reviewNode;
    button.disabled = !bookquizMapModel.canOpenNode?.(map, node);
    button.dataset.state = reviewing ? "review" : complete ? "complete" : current ? "current" : "locked";
    if (current) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
    button.querySelector("small").textContent = reviewing
      ? "복습 중"
      : complete
      ? "완료 · 복습 가능"
      : current ? "현재 단계" : "이전 단계를 먼저 완료하세요";
  });
  $("#bookquizSecondRoundBtn").classList.toggle("hidden", !(map.round === 1 && map.roundCompleted));
  $("#bookquizFinalComplete").classList.toggle("hidden", !map.allRoundsCompleted);
}

function persistBookquizMap() {
  if (!state.bookquizMap || !state.learningProfile) return;
  const activeCourse = state.learningProfile.activeCourse;
  state.learningProfile = {
    ...state.learningProfile,
    activeCourse: activeCourse?.section === "bookquiz" ? { ...activeCourse, bookquizMap: state.bookquizMap } : activeCourse,
    bookquizCompletion: state.bookquizMap.allRoundsCompleted
      ? { ...state.bookquizMap, completedAt: state.learningProfile.bookquizCompletion?.completedAt || new Date().toISOString() }
      : state.learningProfile.bookquizCompletion,
  };
  saveLearningProfile();
}

function openBookquizNode(nodeId, { review = false } = {}) {
  const map = state.bookquizMap || bookquizMapModel.createMap?.();
  if (!map || !bookquizMapModel.canOpenNode?.(map, nodeId)) return false;
  state.bookquizMap = review || map.allRoundsCompleted
    ? bookquizMapModel.openReview(map, nodeId)
    : { ...map, currentNode: nodeId, reviewNode: "" };
  persistBookquizMap();
  const pattern = nodeId.startsWith("pattern-");
  const quiz = nodeId.endsWith("-quiz");
  state.bqType = pattern ? "pattern" : "word";
  state.bqIndex = 0;
  state.bqQuizCount = 1;
  setBQType(state.bqType);
  setBQSubMode(quiz ? "quiz" : "card");
  renderBookquizMap();
  return true;
}

function completeBookquizNode(nodeId) {
  const before = state.bookquizMap || bookquizMapModel.createMap?.();
  if (!before) return false;
  const after = bookquizMapModel.completeNode?.(before, nodeId) || before;
  if (after.currentNode === before.currentNode && after.roundCompleted === before.roundCompleted) return false;
  state.bookquizMap = after;
  persistBookquizMap();
  renderBookquizMap();
  if (after.allRoundsCompleted) finishBookquizTwoPassCourse();
  else if (!after.roundCompleted) openBookquizNode(after.currentNode);
  return true;
}

function startBookquizSecondRound() {
  const next = bookquizMapModel.startSecondRound?.(state.bookquizMap);
  if (!next || next.round !== 2 || next === state.bookquizMap) return false;
  state.bookquizMap = next;
  const profile = state.learningProfile || loadLearningProfile();
  const fresh = dailyLearning.createCourse?.("bookquiz", shuffle(bqWords.slice(0, 5)).map((item) => item.id), { grade: profile.grade });
  state.learningProfile = { ...profile, activeCourse: fresh ? { ...fresh, bookquizMap: next } : profile.activeCourse };
  persistBookquizMap();
  openBookquizNode("word-study");
  return true;
}

function finishBookquizTwoPassCourse() {
  let map = state.bookquizMap;
  if (!map?.allRoundsCompleted) return false;
  if (!map.rewardApplied) {
    const profile = state.learningProfile || loadLearningProfile();
    map = { ...map, rewardApplied: true };
    state.bookquizMap = map;
    state.learningProfile = {
      ...profile,
      stars: (Number(profile.stars) || 0) + 40,
      activeCourse: profile.activeCourse?.section === "bookquiz"
        ? { ...profile.activeCourse, bookquizMap: map }
        : profile.activeCourse,
    };
  }
  persistBookquizMap();
  renderBookquizMap();
  $("#bookquizMapStatus").textContent = "2회독을 모두 완료했습니다. 완료한 단계를 자유롭게 복습할 수 있습니다.";
  return true;
}

const WG_ZONE_LABELS = {
  countable: ["셀 수 있는 명사", "countable"],
  uncountable: ["셀 수 없는 명사", "uncountable"],
  noun: ["명사", "noun"],
  verb: ["동사", "verb"],
  adjective: ["형용사", "adjective"],
  adverb: ["부사", "adverb"],
  pronoun: ["대명사", "pronoun"],
  preposition: ["전치사", "preposition"],
  conjunction: ["접속사", "conjunction"],
  interjection: ["감탄사", "interjection"],
};

const WG_PHONICS_LABELS = [
  { key: "shortVowels", label: "단모음", note: "CVC" },
  { key: "consonants", label: "단자음", note: "ABC sounds" },
  { key: "blends", label: "이중자음", note: "bl, tr, st" },
  { key: "digraphs", label: "묶음자음", note: "sh, ch, th" },
  { key: "longVowels", label: "장모음", note: "silent e" },
  { key: "vowelTeams", label: "이중모음", note: "ai, ee, oa" },
  { key: "rControlled", label: "R모음", note: "ar, er, ir" },
];

function wgDefaultWords() {
  const parseWordList = wordGames.parseWordList || (() => []);
  const input = $("#wgWordListInput");
  return parseWordList(input?.value || "");
}

function updateWordGameScore() {
  if (elements.wgTotalCorrect) elements.wgTotalCorrect.textContent = state.wgTotalCorrect;
}

function renderWordGameBankSummary() {
  const summary = $("#wgBankSummary");
  if (!summary || !wordGames.WORD_GAME_BANK) return;
  const phonicsCount = Object.values(wordGames.WORD_GAME_BANK.phonics || {})
    .reduce((sum, items) => sum + (Array.isArray(items) ? items.length : 0), 0);
  summary.innerHTML = `
    <span>콘텐츠 은행</span>
    <strong>${wordGames.WORD_GAME_BANK.nounDefinition.length}</strong><small>명사 분류</small>
    <strong>${wordGames.WORD_GAME_BANK.partsOfSpeech.length}</strong><small>품사 단어</small>
    <strong>${wordGames.WORD_GAME_BANK.speaking.length}</strong><small>스피킹</small>
    <strong>${wordGames.WORD_GAME_BANK.writing.length}</strong><small>글쓰기 주제</small>
    <strong>${wordGames.WORD_GAME_BANK.sentences.length}</strong><small>문장 만들기</small>
    <strong>${wordGames.WORD_GAME_BANK.dictation.length}</strong><small>받아쓰기</small>
    <strong>${wordGames.WORD_GAME_BANK.spelling.length}</strong><small>스펠링</small>
    <strong>${phonicsCount}</strong><small>파닉스</small>
    <strong>${wordGames.WORD_GAME_BANK.sightWords?.length || 0}</strong><small>사이트워드</small>
    <strong>${wordGames.WORD_GAME_BANK.basicWords?.length || 0}</strong><small>기초단어</small>
  `;
}

function renderTeamScoreboard() {
  const board = $("#wgTeamScoreboard");
  if (!board) return;
  const createTeamScores = wordGames.createTeamScores || ((count) => [{ team: 1, label: count === 1 ? "개인" : "1팀", score: 0 }]);
  if (!state.wgTeamScores.length || state.wgTeamScores.length !== state.wgTeamCount) {
    state.wgTeamScores = createTeamScores(state.wgTeamCount);
  }
  const activeTeam = state.wgTeamCount === 1 ? 1 : ((state.wgWordIndex % state.wgTeamCount) + 1);
  board.innerHTML = state.wgTeamScores
    .map((team) => `
      <div class="wg-team-score ${team.team === activeTeam ? "active" : ""}">
        <span>${team.label}</span>
        <strong>${team.score}</strong>
      </div>
    `)
    .join("");
}

function awardWordGamePoint(delta = 1) {
  const updateTeamScore = wordGames.updateTeamScore || ((scores) => scores);
  const activeTeam = state.wgTeamCount === 1 ? 1 : ((state.wgWordIndex % state.wgTeamCount) + 1);
  state.wgTeamScores = updateTeamScore(state.wgTeamScores, activeTeam, delta);
  state.wgTotalCorrect += Math.max(0, delta);
  updateWordGameScore();
  renderTeamScoreboard();
}

function setWordGameTab(tab) {
  state.wordGameTab = tab;
  $$(".wg-tab").forEach((btn) => btn.classList.toggle("active", btn.dataset.wgTab === tab));
  $$(".wg-panel").forEach((panel) => panel.classList.remove("active"));
  const panelId = `wg${tab.charAt(0).toUpperCase()}${tab.slice(1)}Panel`;
  const panel = $(`#${panelId}`);
  if (panel) panel.classList.add("active");
  if (tab === "noun") renderSortGame("noun");
  if (tab === "pos") renderSortGame("pos");
  if (tab === "speaking") renderSpeakingGame();
  if (tab === "writing") renderWritingTopic();
  if (tab === "phonics") renderPhonicsQuiz();
  if (tab === "sentence") renderSentenceBuilder();
  if (tab === "dictation") renderDictationGame();
  if (tab === "spelling") renderSpellingGame();
}

function renderTeamOptions() {
  const getTeamOptions = wordGames.getTeamOptions || (() => []);
  const wrap = $("#wgTeamOptions");
  if (!wrap) return;
  wrap.innerHTML = "";
  getTeamOptions().forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = option.label;
    btn.classList.toggle("active", option.value === state.wgTeamCount);
    btn.addEventListener("click", () => {
      state.wgTeamCount = option.value;
      state.wgTeamScores = [];
      renderTeamOptions();
      renderRouletteWord();
    });
    wrap.appendChild(btn);
  });
}

function renderRouletteWord() {
  const words = state.wgWords.length ? state.wgWords : wgDefaultWords();
  if (!words.length) return;
  state.wgWords = words;
  state.wgWordIndex = ((state.wgWordIndex % words.length) + words.length) % words.length;
  const item = words[state.wgWordIndex];
  const teamLabel = state.wgTeamCount === 1 ? "개인전" : `${((state.wgWordIndex % state.wgTeamCount) + 1)}팀 차례`;
  $("#wgRouletteTeam").textContent = teamLabel;
  $("#wgRouletteWord").textContent = item.english;
  $("#wgRouletteMeaning").textContent = item.korean || "뜻을 말해보세요";
  updateRouletteTimerDisplay();
  renderTeamScoreboard();
}

function startRouletteGame() {
  state.wgWords = wgDefaultWords();
  state.wgWordIndex = 0;
  state.wgTeamScores = [];
  state.wgTimerRemaining = state.wgTimerSeconds;
  renderRouletteWord();
}

function updateRouletteTimerDisplay() {
  const formatTimer = wordGames.formatTimer || ((seconds) => `${seconds}s`);
  const timer = $("#wgRouletteTimer");
  if (!timer) return;
  if (!state.wgTimerSeconds) {
    timer.textContent = "--";
  } else {
    timer.textContent = formatTimer(state.wgTimerRemaining || state.wgTimerSeconds);
  }
}

function stopWordGameTimer() {
  if (state.wgTimerId) {
    clearInterval(state.wgTimerId);
    state.wgTimerId = null;
  }
  const btn = $("#wgTimerToggleBtn");
  if (btn) btn.textContent = "타이머 시작";
}

function toggleWordGameTimer() {
  if (!state.wgTimerSeconds) {
    $("#wgRouletteTimer").textContent = "--";
    return;
  }
  if (state.wgTimerId) {
    stopWordGameTimer();
    return;
  }
  state.wgTimerRemaining = state.wgTimerRemaining || state.wgTimerSeconds;
  $("#wgTimerToggleBtn").textContent = "타이머 정지";
  state.wgTimerId = setInterval(() => {
    state.wgTimerRemaining = Math.max(0, state.wgTimerRemaining - 1);
    updateRouletteTimerDisplay();
    if (state.wgTimerRemaining <= 0) {
      stopWordGameTimer();
      $("#wgRouletteMeaning").textContent = "시간 종료! 다음 단어로 넘어가세요.";
    }
  }, 1000);
}

function placeSortWord(game, word, answer) {
  const placements = game === "noun" ? state.wgNounPlacements : state.wgPosPlacements;
  placements[word] = answer;
  renderSortGame(game);
}

function newSortRound(game) {
  if (game === "noun") {
    state.wgNounPlacements = {};
    state.wgNounRound = shuffle(wordGames.WORD_GAME_BANK?.nounDefinition || []).slice(0, 10);
    renderSortGame("noun");
    const feedback = $("#wgNounFeedback");
    if (feedback) feedback.textContent = "";
  } else {
    state.wgPosPlacements = {};
    const all = wordGames.WORD_GAME_BANK?.partsOfSpeech || [];
    const byPart = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"]
      .flatMap((part) => shuffle(all.filter((item) => item.answer === part)).slice(0, 2));
    state.wgPosRound = shuffle(byPart);
    renderSortGame("pos");
    const feedback = $("#wgPosFeedback");
    if (feedback) feedback.textContent = "";
  }
}

function renderSortGame(game) {
  const isNoun = game === "noun";
  const bank = isNoun ? $("#wgNounBank") : $("#wgPosBank");
  const zones = isNoun ? $("#wgNounZones") : $("#wgPosZones");
  const placements = isNoun ? state.wgNounPlacements : state.wgPosPlacements;
  if (isNoun && !state.wgNounRound.length) {
    state.wgNounRound = shuffle(wordGames.WORD_GAME_BANK?.nounDefinition || []).slice(0, 10);
  }
  if (!isNoun && !state.wgPosRound.length) {
    const all = wordGames.WORD_GAME_BANK?.partsOfSpeech || [];
    state.wgPosRound = shuffle(["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"]
      .flatMap((part) => shuffle(all.filter((item) => item.answer === part)).slice(0, 2)));
  }
  const data = isNoun ? state.wgNounRound : state.wgPosRound;
  const zoneKeys = isNoun
    ? ["countable", "uncountable"]
    : ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"];
  if (!bank || !zones) return;
  const info = isNoun ? $("#wgNounRoundInfo") : $("#wgPosRoundInfo");
  if (info) {
    const total = wordGames.WORD_GAME_BANK?.[isNoun ? "nounDefinition" : "partsOfSpeech"]?.length || data.length;
    info.textContent = `이번 라운드 ${data.length}개 / 전체 ${total}개`;
  }

  bank.innerHTML = "";
  data.forEach((item) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `word-chip ${placements[item.english] ? "placed" : ""}`;
    chip.textContent = item.english;
    chip.title = item.korean;
    chip.addEventListener("click", () => {
      const currentIndex = zoneKeys.indexOf(placements[item.english]);
      const nextZone = zoneKeys[(currentIndex + 1) % zoneKeys.length];
      placeSortWord(game, item.english, nextZone);
    });
    bank.appendChild(chip);
  });

  zones.innerHTML = "";
  zoneKeys.forEach((key) => {
    const [ko, en] = WG_ZONE_LABELS[key];
    const zone = document.createElement("div");
    zone.className = `sort-zone sort-${key}`;
    zone.innerHTML = `<div class="sort-zone-head"><span></span><strong>${ko}</strong><small>${en}</small><b>0</b></div><div class="sort-drop"></div>`;
    const drop = zone.querySelector(".sort-drop");
    data.filter((item) => placements[item.english] === key).forEach((item) => {
      const placed = document.createElement("button");
      placed.type = "button";
      placed.className = "placed-chip";
      placed.textContent = item.english;
      placed.addEventListener("click", () => {
        delete placements[item.english];
        renderSortGame(game);
      });
      drop.appendChild(placed);
    });
    zone.querySelector("b").textContent = drop.children.length;
    zones.appendChild(zone);
  });
}

function checkSortGame(game) {
  const isNoun = game === "noun";
  const scoreWordSort = wordGames.scoreWordSort || (() => ({ correct: 0, total: 0 }));
  const result = scoreWordSort({
    words: isNoun ? state.wgNounRound : state.wgPosRound,
    placements: isNoun ? state.wgNounPlacements : state.wgPosPlacements,
  });
  state.wgTotalCorrect += result.correct;
  updateWordGameScore();
  const feedback = isNoun ? $("#wgNounFeedback") : $("#wgPosFeedback");
  if (feedback) feedback.textContent = `${result.correct} / ${result.total}개 맞혔어요. 단어를 눌러 다른 상자로 옮길 수 있어요.`;
}

function renderSpeakingGame() {
  const data = wordGames.WORD_GAME_BANK?.speaking || [];
  if (!data.length) return;
  state.wgSpeakingIndex = ((state.wgSpeakingIndex % data.length) + data.length) % data.length;
  const buildSpeakingPrompt = wordGames.buildSpeakingPrompt || ((item) => item);
  const prompt = buildSpeakingPrompt(data[state.wgSpeakingIndex]);
  $("#wgSpeakingWord").textContent = prompt.english;
  $("#wgSpeakingKorean").textContent = `(${prompt.korean})`;
  $("#wgSpeakingHints").innerHTML = prompt.hints.map((hint) => `<span>${hint}</span>`).join("");
  $("#wgSpeakingAnswer").value = prompt.starter;
  $("#wgSpeakingStatus").textContent = "speaking...";
  $("#wgSpeakingProgress").style.width = "100%";
}

function checkSpeakingAnswer() {
  const data = wordGames.WORD_GAME_BANK?.speaking || [];
  const item = data[state.wgSpeakingIndex];
  if (!item) return;
  const scoreSpeakingAnswer = wordGames.scoreSpeakingAnswer || (() => ({ percent: 0, correctHints: 0, totalHints: 0, passed: false }));
  const result = scoreSpeakingAnswer($("#wgSpeakingAnswer").value, item.hints);
  $("#wgSpeakingStatus").textContent =
    result.passed
      ? `좋아요! 힌트 ${result.correctHints}/${result.totalHints}개 포함 (${result.percent}%)`
      : `조금 더 설명해요. 힌트 ${result.correctHints}/${result.totalHints}개 포함 (${result.percent}%)`;
  $("#wgSpeakingProgress").style.width = `${result.percent}%`;
}

function renderWritingTopic() {
  const getWritingTopic = wordGames.getWritingTopic || (() => null);
  const topic = getWritingTopic(state.wgWritingIndex);
  if (!topic) return;
  $("#wgWritingTitle").textContent = topic.title;
  $("#wgWritingKorean").textContent = topic.korean;
  $("#wgWritingHelpers").innerHTML = topic.helpers.map((word) => `<button type="button">${word}</button>`).join("");
  $$("#wgWritingHelpers button").forEach((button) => {
    button.addEventListener("click", () => {
      const textarea = $("#wgWritingText");
      const spacer = textarea.value && !textarea.value.endsWith(" ") ? " " : "";
      textarea.value = `${textarea.value}${spacer}${button.textContent} `;
      textarea.focus();
      $("#wgWritingSaveStatus").textContent = "수정 중";
      countWritingWords();
    });
  });
  $("#wgWritingStarter").textContent = `이렇게 시작해도 좋아요: ${topic.starter}`;
  const saved = localStorage.getItem(`rb-writing-${topic.title}`) || "";
  $("#wgWritingText").value = saved;
  $("#wgWritingSaveStatus").textContent = saved ? "저장됨" : "저장 전";
  countWritingWords();
}

function countWritingWords() {
  const text = $("#wgWritingText")?.value || "";
  const count = wordGames.wordCount ? wordGames.wordCount(text) : (text.match(/[A-Za-z']+/g) || []).length;
  $("#wgWritingCount").textContent = count;
}

function saveWritingDraft() {
  const title = $("#wgWritingTitle")?.textContent || "custom";
  localStorage.setItem(`rb-writing-${title}`, $("#wgWritingText").value);
  $("#wgWritingSaveStatus").textContent = "저장됨";
}

function renderPhonicsCategories() {
  const wrap = $("#wgPhonicsCategories");
  if (!wrap) return;
  wrap.innerHTML = WG_PHONICS_LABELS.map((category) => `
    <button class="${state.wgPhonicsCategory === category.key ? "active" : ""}" data-phonics-category="${category.key}" type="button">
      <strong>${category.label}</strong>
      <small>${category.note}</small>
    </button>
  `).join("");
}

function currentPhonicsItem() {
  const getPhonicsItems = wordGames.getPhonicsItems || ((category) => wordGames.WORD_GAME_BANK?.phonics?.[category] || []);
  const data = getPhonicsItems(state.wgPhonicsCategory);
  if (!data.length) return null;
  state.wgPhonicsIndex = ((state.wgPhonicsIndex % data.length) + data.length) % data.length;
  return data[state.wgPhonicsIndex];
}

function buildPhonicsChoices(item, data) {
  const buildPhonicsQuestion = wordGames.buildPhonicsQuestion || ((question) => ({ ...question, answer: question.word, choices: [question.word] }));
  const question = buildPhonicsQuestion(item, data);
  if (question.choices.length >= 3) return question;
  const extra = shuffle(data)
    .map((candidate) => candidate.word)
    .filter((word) => word && word !== question.answer)
    .slice(0, 3);
  return { ...question, choices: shuffle([question.answer, ...extra]).slice(0, 4) };
}

function renderPhonicsQuiz() {
  const getPhonicsItems = wordGames.getPhonicsItems || (() => []);
  const data = getPhonicsItems(state.wgPhonicsCategory);
  const item = currentPhonicsItem();
  if (!item) return;
  const category = WG_PHONICS_LABELS.find((entry) => entry.key === state.wgPhonicsCategory);
  const question = buildPhonicsChoices(item, data);
  $("#wgPhonicsType").textContent = `${category?.label || "파닉스"} · ${question.sound} · ${question.pattern}`;
  $("#wgPhonicsPrompt").textContent = question.sound;
  $("#wgPhonicsKorean").textContent = `뜻: ${question.korean}`;
  $("#wgPhonicsFeedback").textContent = "";
  $("#wgSightWordPreview").textContent = (wordGames.WORD_GAME_BANK?.sightWords || []).slice(0, 18).join(" · ");
  $("#wgBasicWordPreview").textContent = (wordGames.WORD_GAME_BANK?.basicWords || []).slice(0, 18).join(" · ");
  const choices = $("#wgPhonicsChoices");
  choices.innerHTML = "";
  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => checkPhonicsChoice(choice, question.answer));
    choices.appendChild(button);
  });
}

function checkPhonicsChoice(choice, answer) {
  const scorePhonicsAnswer = wordGames.scorePhonicsAnswer || wordGames.scoreTextAnswer || (() => ({ passed: false }));
  const result = scorePhonicsAnswer(choice, answer);
  $$("#wgPhonicsChoices button").forEach((button) => {
    button.classList.toggle("correct", button.textContent === answer);
    button.classList.toggle("wrong", button.textContent === choice && !result.passed);
    button.disabled = true;
  });
  $("#wgPhonicsFeedback").textContent = result.passed
    ? `좋아요. ${answer} 소리를 정확히 읽었어요.`
    : `다시 읽어볼까요? 정답은 ${answer} 입니다.`;
  if (result.passed) {
    state.wgTotalCorrect += 1;
    updateWordGameScore();
  }
}

function currentSentenceItem() {
  const data = wordGames.WORD_GAME_BANK?.sentences || [];
  if (!data.length) return null;
  state.wgSentenceIndex = ((state.wgSentenceIndex % data.length) + data.length) % data.length;
  return data[state.wgSentenceIndex];
}

function renderSentenceBuilder() {
  const item = currentSentenceItem();
  if (!item) return;
  $("#wgSentenceKorean").textContent = item.korean;
  $("#wgSentencePattern").textContent = item.pattern;
  $("#wgSentenceFeedback").textContent = "";
  const shuffleSentenceWords = wordGames.shuffleSentenceWords || ((text) => text.split(/\s+/));
  const words = shuffleSentenceWords(item.text);
  $("#wgSentenceAnswer").innerHTML = state.wgSentencePicked.map((word, index) =>
    `<button type="button" data-index="${index}">${word}</button>`
  ).join("");
  $$("#wgSentenceAnswer button").forEach((button) => {
    button.addEventListener("click", () => {
      state.wgSentencePicked.splice(Number(button.dataset.index), 1);
      renderSentenceBuilder();
    });
  });
  $("#wgSentenceBank").innerHTML = "";
  words.forEach((word, index) => {
    const usedCount = state.wgSentencePicked.filter((picked) => picked === word).length;
    const totalBefore = words.slice(0, index + 1).filter((candidate) => candidate === word).length;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = word;
    button.disabled = usedCount >= totalBefore;
    button.addEventListener("click", () => {
      state.wgSentencePicked.push(word);
      renderSentenceBuilder();
    });
    $("#wgSentenceBank").appendChild(button);
  });
}

function checkSentenceBuilder() {
  const item = currentSentenceItem();
  if (!item) return;
  const scoreTextAnswer = wordGames.scoreTextAnswer || (() => ({ passed: false }));
  const result = scoreTextAnswer(state.wgSentencePicked.join(" "), item.text);
  $("#wgSentenceFeedback").textContent = result.passed
    ? "정답입니다! 문장 순서가 정확해요."
    : `다시 배열해 보세요. 힌트: ${item.pattern}`;
  if (result.passed) {
    state.wgTotalCorrect += 1;
    updateWordGameScore();
  }
}

function currentDictationItem() {
  const data = wordGames.WORD_GAME_BANK?.dictation || [];
  if (!data.length) return null;
  state.wgDictationIndex = ((state.wgDictationIndex % data.length) + data.length) % data.length;
  return data[state.wgDictationIndex];
}

function renderDictationGame() {
  const item = currentDictationItem();
  if (!item) return;
  $("#wgDictationLevel").textContent = item.level;
  $("#wgDictationKorean").textContent = item.korean;
  $("#wgDictationInput").value = "";
  $("#wgDictationFeedback").textContent = "";
}

function checkDictationAnswer() {
  const item = currentDictationItem();
  if (!item) return;
  const scoreTextAnswer = wordGames.scoreTextAnswer || (() => ({ passed: false }));
  const result = scoreTextAnswer($("#wgDictationInput").value, item.text);
  $("#wgDictationFeedback").textContent = result.passed
    ? "정확히 들었어요!"
    : `조금 달라요. 네 답: ${result.answer || "(비어 있음)"}`;
  if (result.passed) {
    state.wgTotalCorrect += 1;
    updateWordGameScore();
  }
}

function currentSpellingItem() {
  const data = wordGames.WORD_GAME_BANK?.spelling || [];
  if (!data.length) return null;
  state.wgSpellingIndex = ((state.wgSpellingIndex % data.length) + data.length) % data.length;
  return data[state.wgSpellingIndex];
}

function renderSpellingGame() {
  const item = currentSpellingItem();
  if (!item) return;
  const scoreSpellingAnswer = wordGames.scoreSpellingAnswer || (() => ({ hint: "" }));
  $("#wgSpellingKorean").textContent = item.korean;
  $("#wgSpellingHint").textContent = scoreSpellingAnswer("", item.english).hint;
  $("#wgSpellingInput").value = "";
  $("#wgSpellingFeedback").textContent = "";
}

function checkSpellingAnswer() {
  const item = currentSpellingItem();
  if (!item) return;
  const scoreSpellingAnswer = wordGames.scoreSpellingAnswer || (() => ({ passed: false, hint: "" }));
  const result = scoreSpellingAnswer($("#wgSpellingInput").value, item.english);
  $("#wgSpellingFeedback").textContent = result.passed
    ? "철자가 정확해요!"
    : `다시 써보세요. 힌트: ${result.hint}`;
  if (result.passed) {
    state.wgTotalCorrect += 1;
    updateWordGameScore();
  }
}

function initWordGamesMode() {
  renderTeamOptions();
  startRouletteGame();
  renderSortGame("noun");
  renderSortGame("pos");
  renderSpeakingGame();
  renderWritingTopic();
  renderPhonicsCategories();
  renderPhonicsQuiz();
  renderSentenceBuilder();
  renderDictationGame();
  renderSpellingGame();
  updateWordGameScore();
  renderWordGameBankSummary();
}

function setBQType(type) {
  state.bqType = type;
  state.bqIndex = 0;
  $$(".bqtype-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqtype === type));
  const badge = type === "pattern" ? "질문 패턴" : "핵심 단어";
  if ($("#bqCardBadge")) $("#bqCardBadge").textContent = badge;
  if (state.bqSubMode === "card") renderBQCard();
  else if (state.bqSubMode === "quiz") { state.bqQuizCount = 1; newBQQuiz(); }
}

function setBQSubMode(mode) {
  stopBQBlast();
  state.bqSubMode = mode;
  $$(".bqmode-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqmode === mode));
  $("#bqCardArea").classList.toggle("hidden", mode !== "card");
  $("#bqQuizArea").classList.toggle("hidden", mode !== "quiz");
  if (mode === "card") renderBQCard();
  else if (mode === "quiz") { state.bqQuizCount = 1; newBQQuiz(); }
}

function renderBQCard() {
  const course = activeDailyCourse("bookquiz");
  const selected = course && dailyLearning.courseItems ? dailyLearning.courseItems(course, bqPool()) : [];
  const pool = selected.length ? selected : bqPool();
  const total = pool.length;
  state.bqIndex = ((state.bqIndex % total) + total) % total;
  const item = pool[state.bqIndex];
  $("#bqCardEnglish").textContent = item.english;
  $("#bqCardKorean").textContent = item.korean;
  $("#bqCardMeta").textContent = `${state.bqIndex + 1} / ${total}`;
  $("#bqIndexDisplay").textContent = `${state.bqIndex + 1} / ${total}`;
  $("#bqCardBadge").textContent = state.bqType === "pattern" ? "질문 패턴" : "핵심 단어";
  scheduleCardPronunciation({
    section: "bookquiz",
    stage: state.bqType === "pattern" ? "pattern-study" : "word-study",
    item,
    round: state.bookquizMap?.round || 1,
  });
}

function moveBQCard(step) {
  const course = activeDailyCourse("bookquiz");
  if (course && step > 0) {
    const pool = dailyLearning.courseItems(course, bqPool());
    const item = pool[course.itemIndex % pool.length];
    const progress = progressDailyAnswer("bookquiz", {
      token: `bookquiz:${course.stage}:${item.id}`,
      correct: true,
      itemId: item.id,
    });
    if (progress.accepted) {
      state.bqIndex = progress.course.itemIndex;
      if (progress.stageChanged) openDailyCourse(progress.course);
      else renderBQCard();
      return;
    }
  }
  state.bqIndex += step;
  renderBQCard();
}

function moveVerbCard(step) {
  const course = activeDailyCourse("verb");
  if (course && step > 0) {
    const pool = dailyLearning.courseItems(course, verbs);
    const item = pool[course.itemIndex % pool.length];
    const progress = progressDailyAnswer("verb", {
      token: `verb:${course.stage}:${item.id}`,
      correct: true,
      itemId: item.id,
    });
    if (progress.accepted) {
      state.verbIndex = progress.course.itemIndex;
      if (progress.stageChanged) openDailyCourse(progress.course);
      else renderVerbCard();
      return;
    }
  }
  state.verbIndex += step;
  renderVerbCard();
}

function speakBQCard() {
  speakBookquizItem(bqPool()[state.bqIndex]);
}

function newBQQuiz() {
  window.ReadingBrainGameUI?.setMascot?.("guide", "문제를 읽고 알맞은 답을 골라 보세요.");
  const activeCourse = activeDailyCourse("bookquiz");
  const pool = activeCourse?.stage === "review" ? [...bqWords, ...bqPatterns] : bqPool();
  if (!pool.length) {
    const message = "학습 데이터가 없어요. 다른 학습 유형을 선택해 주세요.";
    $("#bqQuizQuestion").textContent = message;
    $("#bqQuizQuestion").classList.add("mg-empty-state");
    $("#bqQuizOptions").innerHTML = "";
    window.ReadingBrainGameUI?.setMascot?.("wrong", message);
    return;
  }
  $("#bqQuizQuestion").classList.remove("mg-empty-state");
  const dailyCourse = activeCourse;
  const dailyItems = dailyCourse && dailyLearning.courseItems
    ? dailyLearning.courseItems(dailyCourse, pool)
    : [];
  const item = dailyItems.length
    ? dailyItems[dailyCourse.itemIndex % dailyItems.length]
    : !activeCourse && state.bqType === "word"
      ? bqWordSessionItems()[(state.bqQuizCount - 1) % bqWordSessionItems().length]
      : shuffle([...pool])[0];
  state.bqQuizItem = item;
  const askKorean = Math.random() < 0.5;
  state.bqAskDir = askKorean ? "toEn" : "toKo";
  $("#bqQuizFeedback").textContent = "";
  $("#bqQuizCount").textContent = `문제 ${state.bqQuizCount}`;
  const isPattern = item.id >= 9000;
  state.bqType = isPattern ? "pattern" : "word";
  $("#bqQuizPrompt").textContent = isPattern
    ? (askKorean ? "뜻에 맞는 영어 표현은?" : "이 영어 표현의 뜻은?")
    : (askKorean ? "뜻에 맞는 영어 단어는?" : "이 영어 단어의 뜻은?");
  const questionText = askKorean ? item.korean : item.english;
  $("#bqQuizQuestion").textContent = questionText;
  // 버튼 없이, 문제가 뜨자마자 영어 발음을 바로 들려준다.
  speakBookquizItem(item);

  const ansKey = askKorean ? "english" : "korean";
  const sameKindPool = pool.filter((candidate) => (candidate.id >= 9000) === isPattern);
  const distractors = shuffle(sameKindPool.filter((p) => p.id !== item.id && p[ansKey] !== item[ansKey])).slice(0, 3);
  const options = shuffle([item, ...distractors]);

  const optEl = $("#bqQuizOptions");
  optEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt[ansKey];
    btn.dataset.id = String(opt.id);
    btn.addEventListener("click", () => checkBQAnswer(btn, opt.id, item.id, ansKey));
    optEl.appendChild(btn);
  });
}

// ── 북퀴즈 카드맞추기 ─────────────────────────────────────────
let bqMahjong = { selected: null, matched: new Set(), pairs: [], locked: false };

function renderBQMatch() {
  const pool = bqPool();
  const pairs = shuffle(pool).slice(0, Math.min(6, pool.length));
  bqMahjong = { selected: null, matched: new Set(), pairs, locked: false };

  const cards = [];
  pairs.forEach((item) => {
    cards.push({ id: item.id, type: "english", text: item.english });
    cards.push({ id: item.id, type: "korean",  text: item.korean  });
  });
  const shuffled = shuffle(cards);

  const status = $("#bqMatchStatus");
  if (status) status.textContent = "영어와 뜻을 찾아서 클릭하세요!";

  const board = $("#bqMatchBoard");
  board.innerHTML = "";
  shuffled.forEach((card) => {
    const el = document.createElement("div");
    el.className = `mj-card mj-direct ${card.type === "english" ? "mj-english" : "mj-korean"}`;
    el.innerHTML = `<span>${card.text}</span>`;
    el.addEventListener("click", () => handleBQMahjong(el, card));
    board.appendChild(el);
  });
}

function handleBQMahjong(el, card) {
  if (bqMahjong.locked) return;
  if (el.classList.contains("mj-matched")) return;

  if (bqMahjong.selected?.el === el) {
    el.classList.remove("mj-selected");
    bqMahjong.selected = null;
    return;
  }

  if (!bqMahjong.selected) {
    el.classList.add("mj-selected");
    bqMahjong.selected = { el, card };
    return;
  }

  const { el: prevEl, card: prevCard } = bqMahjong.selected;
  prevEl.classList.remove("mj-selected");
  bqMahjong.selected = null;

  if (prevCard.id === card.id && prevCard.type !== card.type) {
    prevEl.classList.add("mj-matched");
    el.classList.add("mj-matched");
    bqMahjong.matched.add(card.id);
    state.score += 15;
    state.streak += 1;
    saveState();
    updateStats();
    const total = bqMahjong.pairs.length;
    const status = $("#bqMatchStatus");
    if (status) status.textContent = `맞췄어요! ${bqMahjong.matched.size} / ${total} 완성`;
    if (bqMahjong.matched.size === total) {
      state.score += 50;
      saveState();
      updateStats();
      if (status) status.textContent = "완성! 보너스 50점 · 새 판이 시작됩니다";
      setTimeout(renderBQMatch, 2200);
    }
  } else {
    bqMahjong.locked = true;
    el.classList.add("mj-wrong");
    prevEl.classList.add("mj-wrong");
    state.streak = 0;
    const status = $("#bqMatchStatus");
    if (status) status.textContent = "아직 아니에요! 다시 찾아봐요.";
    setTimeout(() => {
      el.classList.remove("mj-wrong");
      prevEl.classList.remove("mj-wrong");
      bqMahjong.locked = false;
    }, 700);
  }
}

// ── 북퀴즈 블래스트 게임 ──────────────────────────────────────
let bqBlast = newBlastGame({ currentItem: null });

function initBQBlastScreen() {
  bqBlast.active = false;
  if (bqBlast.enemyTimer) { clearTimeout(bqBlast.enemyTimer); bqBlast.enemyTimer = null; }
  const overlay = $("#bqBlastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.querySelector("h2").textContent = "북퀴즈 블래스트!";
    overlay.querySelector("p").textContent = "떨어지는 한글 뜻을 보고\n맞는 영어 표현을 눌러 격파하세요!";
  }
  $("#bqBlastOptions").innerHTML = "";
  const arena = $("#bqBlastArena");
  if (arena) {
    arena.querySelectorAll(".blast-enemy").forEach((e) => e.remove());
    arena.querySelectorAll(".blast-star").forEach((e) => e.remove());
    for (let i = 0; i < 20; i++) {
      const s = document.createElement("div");
      s.className = "blast-star";
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${0.3 + Math.random() * 0.6};`;
      arena.appendChild(s);
    }
  }
}

function startBQBlast() {
  bqBlast = newBlastGame({ currentItem: null });
  bqBlast.active = true;
  updateBQBlastHUD();
  $("#bqBlastOverlay").classList.add("hidden");
  spawnBQBlastEnemy();
}

function stopBQBlast() {
  bqBlast.active = false;
  if (bqBlast.enemyTimer) { clearTimeout(bqBlast.enemyTimer); bqBlast.enemyTimer = null; }
}

function spawnBQBlastEnemy() {
  if (!bqBlast.active) return;
  const arena = $("#bqBlastArena");
  if (!arena) return;

  arena.querySelectorAll(".blast-enemy").forEach((e) => e.remove());
  const pool = bqPool();
  const item = pool[Math.floor(Math.random() * pool.length)];
  bqBlast.currentItem = item;

  const others = shuffle(pool.filter((p) => p.id !== item.id)).slice(0, 3);
  const options = shuffle([item, ...others]);

  const enemy = document.createElement("div");
  enemy.className = "blast-enemy";
  enemy.textContent = item.korean;
  const duration = blastFallDuration(bqBlast.wave);
  enemy.style.animationDuration = `${duration}s`;
  arena.appendChild(enemy);

  enemy.addEventListener("animationend", () => {
    if (!bqBlast.active || bqBlast.currentItem?.id !== item.id) return;
    bqBlast.currentItem = null;
    $$("#bqBlastOptions .blast-option").forEach((b) => (b.disabled = true));
    $$("#bqBlastOptions .blast-option").forEach((b) => {
      if (b.dataset.bqid === String(item.id)) b.classList.add("blast-correct");
    });
    bqBlastLoseLife();
  });

  const optEl = $("#bqBlastOptions");
  optEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "blast-option";
    btn.textContent = opt.english;
    btn.dataset.bqid = String(opt.id);
    btn.addEventListener("click", () => {
      if (!bqBlast.active || bqBlast.currentItem?.id !== item.id) return;
      handleBQBlastAnswer(opt.id === item.id, btn, enemy, item);
    });
    optEl.appendChild(btn);
  });
}

function handleBQBlastAnswer(isCorrect, clickedBtn, enemy, correctItem) {
  bqBlast.currentItem = null;
  enemy.style.animationPlayState = "paused";
  $$("#bqBlastOptions .blast-option").forEach((b) => (b.disabled = true));

  if (isCorrect) {
    enemy.classList.add("blast-hit");
    clickedBtn.classList.add("blast-correct");
    bqBlast.score += 10 + bqBlast.wave * 2;
    bqBlast.correct += 1;
    blastAdvanceWave(bqBlast);
    state.score += 5;
    saveState();
    updateStats();
    updateBQBlastHUD();
    bqBlast.enemyTimer = setTimeout(spawnBQBlastEnemy, BLAST_TUNING.respawnAfterHit);
  } else {
    clickedBtn.classList.add("blast-wrong");
    $$("#bqBlastOptions .blast-option").forEach((b) => {
      if (b.dataset.bqid === String(correctItem.id)) b.classList.add("blast-correct");
    });
    bqBlastLoseLife();
  }
}

function bqBlastLoseLife() {
  bqBlast.lives--;
  updateBQBlastHUD();
  if (bqBlast.lives <= 0) {
    bqBlast.active = false;
    bqBlastGameOver();
    return;
  }
  bqBlast.enemyTimer = setTimeout(spawnBQBlastEnemy, BLAST_TUNING.respawnAfterMiss);
}

function updateBQBlastHUD() {
  const hearts = blastHeartsMarkup(bqBlast.lives);
  const livesEl = $("#bqBlastLivesText");
  if (livesEl) livesEl.innerHTML = hearts;
  const scoreEl = $("#bqBlastScoreText");
  if (scoreEl) scoreEl.textContent = bqBlast.score;
  const waveEl = $("#bqBlastWaveText");
  if (waveEl) waveEl.textContent = bqBlast.wave;
}

function bqBlastGameOver() {
  const overlay = $("#bqBlastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.querySelector("h2").textContent = "게임 오버!";
    overlay.querySelector("p").textContent = `${bqBlast.score}점을 획득했어요! 다시 해볼까요?`;
  }
  state.score += bqBlast.score;
  saveState();
  updateStats();
}

function checkBQAnswer(clickedBtn, selectedId, correctId, ansKey) {
  window.ReadingBrainGameUI?.setMascot?.(selectedId === correctId ? "correct" : "wrong");
  const buttons = $$("#bqQuizOptions button");
  const correctItem = bqPool().find((p) => p.id === correctId);
  buttons.forEach((b) => {
    b.disabled = true;
    if (Number(b.dataset.id) === correctId) b.classList.add("correct");
  });
  if (selectedId === correctId) {
    clickedBtn.classList.add("correct");
    state.score += 10;
    state.streak += 1;
    $("#bqQuizFeedback").textContent = "정답입니다!";
  } else {
    clickedBtn.classList.add("wrong");
    state.streak = 0;
    const correctText = correctItem ? correctItem[ansKey] : "";
    $("#bqQuizFeedback").textContent = `틀렸어요. 정답: ${correctText}`;
  }
  saveState();
  updateStats();
  const advanceToken = `bookquiz:${state.bqType}:${state.bqQuizCount}:${correctId}`;
  const activeBqCourse = activeDailyCourse("bookquiz");
  const courseProgress = progressDailyAnswer("bookquiz", {
    token: advanceToken,
    correct: selectedId === correctId,
    itemId: correctId,
  });
  if (!activeBqCourse && state.bqType === "word" && state.bqQuizCount >= BQ_WORD_SESSION_SIZE) {
    $("#bqQuizFeedback").textContent += ` ${BQ_WORD_SESSION_SIZE}문제를 완료했습니다!`;
    state.bqWordSession = null;
    scheduleCourseAdvance(advanceToken, 1400, () => {
      burstConfetti();
      completeBookquizNode("word-quiz");
    });
    return;
  }
  state.bqQuizCount += 1;
  scheduleCourseAdvance(advanceToken, 1100, () => {
    if (courseProgress.roundCompleted) {
      renderBookquizMap();
      if (state.bookquizMap?.allRoundsCompleted) finishBookquizTwoPassCourse();
      return;
    }
    continueDailyCourseOr("bookquiz", courseProgress, newBQQuiz);
  });
}

async function init() {
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", () => { _cachedVoice = null; });
  }
  state.cleared = loadCleared();
  state.learningProfile = loadLearningProfile();
  window.addEventListener("online", () => syncPendingProgress().catch(() => {}));
  initPwa();
  renderCategories();
  bindEvents();
  updateStats();
  renderStudy();
  if (location.protocol === "file:") {
    elements.loginMessage.textContent = "파일로 직접 열면 로그인이 안 됩니다. 브라우저에서 http://localhost:4174 로 접속해 주세요.";
    return;
  }
  await restoreSession();
  const initialMode = location.hash.replace("#", "");
  if (initialMode && !initialMode.startsWith("wordgames-") && $(`#${initialMode}View`)) {
    setMode(initialMode);
  } else {
    setMode("hub");
  }
}

init();
