const expressions = window.EXPRESSIONS || [];
const verbs = window.VERBS || [];
const bqPatterns = window.BOOKQUIZ_PATTERNS || [];
const bqWords = window.BOOKQUIZ_WORDS || [];
const learningModel = window.ReadingBrainLearningModel || {};
const patternHub = window.ReadingBrainPatternHub || {};
const wordGames = window.ReadingBrainWordGames || {};

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
  quizItem: null,
  quizAnswer: null,
  quizCount: 1,
  quizType: "section",
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
  cardBackEnglish: $("#cardBackEnglish"),
  quizCount: $("#quizCount"),
  quizPrompt: $("#quizPrompt"),
  quizScopeText: $("#quizScopeText"),
  quizQuestion: $("#quizQuestion"),
  quizOptions: $("#quizOptions"),
  quizFeedback: $("#quizFeedback"),
  englishColumn: $("#englishColumn"),
  koreanColumn: $("#koreanColumn"),
  matchStatus: $("#matchStatus"),
  reviewSummary: $("#reviewSummary"),
  reviewList: $("#reviewList"),
  leaderboardSummary: $("#leaderboardSummary"),
  leaderboardList: $("#leaderboardList"),
  dashboardGreeting: $("#dashboardGreeting"),
  dashboardFocus: $("#dashboardFocus"),
  dashboardProgressText: $("#dashboardProgressText"),
  dashboardProgressBar: $("#dashboardProgressBar"),
  dashboardProgressDetail: $("#dashboardProgressDetail"),
  dashboardCategory: $("#dashboardCategory"),
  dashboardCategoryCount: $("#dashboardCategoryCount"),
  dashboardReviewCount: $("#dashboardReviewCount"),
  dashboardScore: $("#dashboardScore"),
  dashboardStreak: $("#dashboardStreak"),
  routineSteps: $("#routineSteps"),
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
  if (state.token) {
    apiRequest("/api/progress", {
      method: "POST",
      body: JSON.stringify(progressPayload()),
    })
      .then(() => {
        if (state.mode === "leaderboard") renderLeaderboard();
      })
      .catch((error) => {
        if (elements.loginMessage) elements.loginMessage.textContent = error.message;
      });
  }
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

function currentItem() {
  const items = filteredItems();
  state.index = ((state.index % items.length) + items.length) % items.length;
  return items[state.index];
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

function routineSteps() {
  const getRoutineSteps = learningModel.getRoutineSteps || (() => []);
  return getRoutineSteps({ reviewCount: state.review.size });
}

function renderDashboard() {
  if (!elements.dashboardGreeting) return;

  const snapshot = dashboardSnapshot();
  elements.dashboardGreeting.textContent = `${state.studentName}님, 오늘은 짧게 한 바퀴 돌아볼까요?`;
  elements.dashboardFocus.textContent = snapshot.focusMessage;
  elements.dashboardProgressText.textContent = `${snapshot.progressPercent}%`;
  elements.dashboardProgressBar.style.width = `${snapshot.progressPercent}%`;
  elements.dashboardProgressDetail.textContent =
    `${snapshot.masteredCount} / ${snapshot.totalExpressions} 표현 마스터`;
  elements.dashboardCategory.textContent = snapshot.categoryLabel;
  elements.dashboardCategoryCount.textContent = `${snapshot.categorySize}개 표현`;
  elements.dashboardReviewCount.textContent = snapshot.reviewCount;
  elements.dashboardScore.textContent = snapshot.scoreText;
  elements.dashboardStreak.textContent = `${snapshot.streakText} 콤보`;

  const steps = routineSteps();
  [elements.routineSteps, $("#hubRoutineSteps")].forEach((host) => {
    if (host) renderRoutineInto(host, steps);
  });
}

function renderRoutineInto(host, steps) {
  host.innerHTML = "";
  steps.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `routine-step ${step.primary ? "primary-routine" : ""}`;
    button.disabled = Boolean(step.disabled);
    button.dataset.mode = step.mode;
    button.innerHTML = `
      <span class="routine-number">${index + 1}</span>
      <span class="routine-content">
        <strong>${step.title}</strong>
        <small>${step.detail}</small>
      </span>
      <span class="routine-badge">${step.badge}</span>
    `;
    button.addEventListener("click", () => setMode(step.mode));
    host.appendChild(button);
  });
}

// ──────────── 패턴 영어 허브 ────────────

const DAILY_GOAL = { cards: 20, correct: 10 };
const HUB_STATUS_LABEL = { new: "시작 전", learning: "학습 중", done: "완료" };
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

function patternSections() {
  if (!patternHub.buildSections) return [];
  return patternHub.buildSections(expressions, state.mastered);
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
          <button class="pnav-row status-${section.status}${section.key === state.category ? " active" : ""}"
                  type="button" data-section="${escapeHtml(section.key)}">
            <span class="pnav-row-no">${section.number === null ? "·" : String(section.number).padStart(2, "0")}</span>
            <span class="pnav-row-body">
              <span class="pnav-row-title">${escapeHtml(section.title)}</span>
              <span class="pnav-row-track"><i style="width:${section.percent}%"></i></span>
            </span>
            <span class="pnav-row-count">${section.mastered}/${section.total}</span>
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

function renderHub(sections) {
  const grid = $("#hubGrid");
  if (!grid || !patternHub.groupSections) return;

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
      .map(
        (group) => `
        <button class="hub-tab${group.id === state.hubGroup ? " active" : ""}" type="button"
                role="tab" aria-selected="${group.id === state.hubGroup}" data-group="${group.id}">
          <strong>${escapeHtml(group.label)}</strong>
          <small>${matchedCounts.get(group.id) || 0}개 섹션 · ${group.percent}% 완료</small>
        </button>`,
      )
      .join("");
  }

  const visible = matched.filter((section) => section.group === state.hubGroup);
  grid.innerHTML = visible
    .map(
      (section) => `
      <button class="hub-card status-${section.status}${section.key === state.category ? " current" : ""}"
              type="button" data-section="${escapeHtml(section.key)}">
        <span class="hub-card-ring" style="--p:${section.percent}"><em>${section.percent}<i>%</i></em></span>
        <span class="hub-card-body">
          <span class="hub-card-no">${section.number === null ? "SECTION" : `SECTION ${String(section.number).padStart(2, "0")}`}</span>
          <strong>${escapeHtml(section.title)}</strong>
          <small>${section.total}표현 · ${section.mastered} 마스터</small>
        </span>
        <span class="hub-card-badge">${HUB_STATUS_LABEL[section.status]}</span>
      </button>`,
    )
    .join("");
  const emptyEl = $("#hubEmpty");
  if (emptyEl) emptyEl.classList.toggle("hidden", visible.length > 0);
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
  const next =
    section && section.percent >= 100 && patternHub.findNextSection
      ? patternHub.findNextSection(sections, section.key)
      : null;
  banner.classList.toggle("hidden", !next);
  if (next) {
    banner.dataset.section = next.key;
    $("#sectionDoneNext").textContent = `다음은 ${sectionLabel(next)} · ${next.total}표현`;
  }
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
  updateReviewBadge();
  if (state.mode === "hub") renderHub(sections);
}

function updateStats() {
  elements.scoreText.textContent = state.score;
  elements.streakText.textContent = state.streak;
  elements.studentNameText.textContent = state.studentName;
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
  const items = filteredItems();
  elements.flashcard.classList.remove("flipped");
  elements.cardMeta.textContent = `${item.category}`;
  const indexEl = $("#cardIndexDisplay");
  if (indexEl) indexEl.textContent = `${state.index + 1} / ${items.length}`;
  renderNewWords(item);
  elements.cardEnglish.textContent = item.english;
  elements.cardKorean.textContent = item.korean;
  elements.cardBackEnglish.textContent = item.english;
  saveLastPosition();
  updateStats();
}

function moveCard(step = 1) {
  const items = filteredItems();
  const newIndex = state.index + step;
  if (newIndex < 0) return;
  if (step > 0) bumpDaily("cards");
  if (step > 0 && newIndex >= items.length && state.category !== "all") {
    const categories = [...new Set(expressions.map((e) => e.category))].sort();
    const currentIdx = categories.indexOf(state.category);
    if (currentIdx !== -1 && currentIdx < categories.length - 1) {
      state.category = categories[currentIdx + 1];
      state.index = 0;
      elements.categorySelect.value = state.category;
      renderStudy();
      return;
    }
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
  moveCard(1);
}

async function speakCurrent() {
  const item = currentItem();
  await speakExpression(item, 2);
}

const SPEECH_RATE = 0.9;
const SPEECH_PITCH = 1;
const NATIVE_AUDIO_MODE = "native";

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

async function speakExpression(item, repeat = 1) {
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
  try {
    for (let i = 0; i < repeat; i++) {
      await playNeuralTTS(spokenText);
      if (i < repeat - 1) await new Promise((r) => setTimeout(r, 350));
    }
    return true;
  } catch (_) {
    // 서버 음원 생성이 막힌 경우에만 설치된 미국 영어 음성을 사용한다.
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
  return false;
}

function playNeuralTTS(word) {
  return new Promise((resolve, reject) => {
    const url = `/api/tts?text=${encodeURIComponent(word)}`;
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.onended = () => resolve(true);
    audio.onerror = () => reject(new Error("gtts-failed"));
    audio.play().catch(reject);
  });
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
  try {
    await playVerbAudio(verb, form);
  } catch {
    await speakEnglish(verb[form], 1);
  }
}

async function speakAllVerbForms(button = null) {
  const verb = currentVerb();
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
      if (button) button.textContent = `▶ ${label} 듣는 중`;
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

function cumulativeItems() {
  const learnedIds = new Set([...state.mastered, ...state.review]);
  const scope = gameItems();
  const learned = scope.filter((item) => learnedIds.has(item.id));
  return learned.length ? learned : scope;
}

function quizItems() {
  return state.quizType === "cumulative" ? cumulativeItems() : gameItems();
}

function quizTitle() {
  return state.quizType === "cumulative" ? "누적퀴즈" : "섹션퀴즈";
}

function updateQuizTabs() {
  $$(".quiz-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.quizType === state.quizType);
  });
}

function newQuiz() {
  const pool = quizItems();
  const item = shuffle(pool)[0];
  const askKorean = Math.random() > 0.45;
  state.quizItem = item;
  state.quizAnswer = item.id;
  elements.quizFeedback.textContent = "";
  elements.quizCount.textContent = `${quizTitle()} · 문제 ${state.quizCount}`;
  elements.quizScopeText.textContent =
    state.quizType === "cumulative"
      ? `현재 선택 범위 안에서 누적 학습한 표현 ${cumulativeItems().length}개에서 출제됩니다.`
      : `현재 패턴 섹션 ${pool.length}개 표현에서 출제됩니다.`;
  elements.quizPrompt.textContent = askKorean ? "뜻에 맞는 영어 표현은?" : "영어 표현의 뜻은?";
  elements.quizQuestion.textContent = askKorean ? item.korean : item.english;

  const optionKey = askKorean ? "english" : "korean";
  elements.quizOptions.innerHTML = "";
  makeOptions(item, optionKey, pool).forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.dataset.id = option.id;
    button.addEventListener("click", () => checkQuiz(button, option.id));
    elements.quizOptions.appendChild(button);
  });
}

function checkQuiz(button, id) {
  const buttons = $$("#quizOptions button");
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
  state.quizCount += 1;
  setTimeout(newQuiz, 950);
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
      elements.matchStatus.textContent = "🎉 완성! 보너스 50점! 새 판이 시작됩니다…";
      setTimeout(renderMatch, 2200);
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

// ── 동사 블래스트 게임 ─────────────────────────────────────────
let verbBlast = {
  active: false, lives: 3, score: 0, wave: 1, correct: 0, currentVerb: null, enemyTimer: null,
};

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
  verbBlast = { active: true, lives: 3, score: 0, wave: 1, correct: 0, currentVerb: null, enemyTimer: null };
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
  const duration = Math.max(1.5, 5.5 - (verbBlast.wave - 1) * 0.4);
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
    if (verbBlast.correct % 5 === 0) verbBlast.wave += 1;
    state.score += 5;
    saveState();
    updateStats();
    updateVerbBlastHUD();
    verbBlast.enemyTimer = setTimeout(spawnVerbBlastEnemy, 700);
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
  verbBlast.enemyTimer = setTimeout(spawnVerbBlastEnemy, 1200);
}

function updateVerbBlastHUD() {
  const hearts = "❤️".repeat(Math.max(0, verbBlast.lives)) + "🖤".repeat(Math.max(0, 3 - verbBlast.lives));
  const livesEl = $("#verbBlastLivesText");
  if (livesEl) livesEl.textContent = hearts;
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
}

// ── 블래스트 게임 ──────────────────────────────────────────────
let blast = {
  active: false, lives: 3, score: 0, wave: 1, correct: 0, currentItem: null, enemyTimer: null,
};

function initBlastScreen() {
  blast.active = false;
  const overlay = $("#blastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    $("#blastOverlayTitle").textContent = "🚀 블래스트!";
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
  blast = { active: true, lives: 3, score: 0, wave: 1, correct: 0, currentItem: null, enemyTimer: null };
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
  const duration = Math.max(1.5, 5.5 - (blast.wave - 1) * 0.4);
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
    if (blast.correct % 5 === 0) blast.wave += 1;
    state.score += 5;
    saveState();
    updateStats();
    updateBlastHUD();
    blast.enemyTimer = setTimeout(spawnBlastEnemy, 700);
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
  blast.enemyTimer = setTimeout(spawnBlastEnemy, 1200);
}

function updateBlastHUD() {
  const hearts = "❤️".repeat(Math.max(0, blast.lives)) + "🖤".repeat(Math.max(0, 3 - blast.lives));
  const livesEl = $("#blastLivesText");
  if (livesEl) livesEl.textContent = hearts;
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
  state.score += blast.score;
  saveState();
  updateStats();
}

function renderReview() {
  const scope = filteredItems();
  const items = scope.filter((item) => state.review.has(item.id));
  elements.reviewSummary.textContent = items.length
    ? `${state.category} 안에서 ${items.length}개의 표현을 다시 보면 좋아요.`
    : `${state.category} 안에는 아직 복습할 표현이 없습니다.`;
  elements.reviewList.innerHTML = items
    .slice(0, 40)
    .map(
      (item) => `
        <div class="review-row">
          <strong>${item.english}</strong>
          <span>${item.korean}</span>
        </div>
      `,
    )
    .join("");
}

async function renderLeaderboard() {
  elements.leaderboardSummary.textContent = "랭킹을 불러오는 중입니다...";
  elements.leaderboardList.innerHTML = "";
  try {
    const data = await apiRequest("/api/leaderboard");
    const leaders = data.leaders || [];
    elements.leaderboardSummary.textContent = leaders.length
      ? "로그인한 학생들의 누적 포인트 순위입니다."
      : "아직 랭킹에 표시할 학생 데이터가 없습니다.";
    elements.leaderboardList.innerHTML = leaders
      .map(
        (student, index) => `
          <div class="leaderboard-row ${index < 3 ? "top-rank" : ""}">
            <div class="rank-number">${index + 1}</div>
            <div class="rank-student">
              <strong>${student.name}</strong>
              <span>마스터 ${student.masteredCount}개 · 오답 ${student.reviewCount}개</span>
            </div>
            <div class="rank-points">${student.points.toLocaleString()} P</div>
          </div>
        `,
      )
      .join("");
  } catch (error) {
    elements.leaderboardSummary.textContent = error.message;
  }
}

const PATTERN_MODES = ["hub", "study", "quiz", "match", "blast", "review", "leaderboard"];

function setMode(mode) {
  if (mode === "wordgames" || !$(`#${mode}View`)) mode = "study";
  state.mode = mode;
  $$(".mode-button").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  $$(".guide-step").forEach((step) => step.classList.toggle("active", step.dataset.guideMode === mode));
  const patternBar = $("#patternModeBar");
  if (patternBar) {
    patternBar.classList.toggle("hidden", !PATTERN_MODES.includes(mode));
    $$(".pmode-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.pmode === mode));
  }
  const dashboard = $("#studentDashboard");
  if (dashboard) dashboard.classList.toggle("hidden", mode === "hub");
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#${mode}View`).classList.add("active");
  elements.screenTitle.textContent = {
    hub: "패턴 허브",
    study: "카드 학습",
    quiz: "퀴즈",
    match: "매칭 게임",
    review: "오답 복습",
    leaderboard: "포인트 랭킹",
    verb: "동사 3단 변화",
    blast: "블래스트 게임",
    bookquiz: "북퀴즈 학습",
  }[mode];

  if (mode === "study") renderStudy();
  if (mode === "quiz") {
    updateQuizTabs();
    newQuiz();
  }
  if (mode === "match") renderMatch();
  if (mode === "review") renderReview();
  if (mode === "leaderboard") renderLeaderboard();
  if (mode === "verb") initVerbMode();
  if (mode === "blast") initBlastScreen();
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

  const hubGrid = $("#hubGrid");
  if (hubGrid) {
    hubGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".hub-card");
      if (card) selectSection(card.dataset.section, "study");
    });
  }

  const resume = $("#hubResume");
  if (resume) {
    resume.addEventListener("click", () => {
      selectSection(resume.dataset.section, "study", resume.dataset.index);
    });
  }

  const knownBtn = $("#markKnownBtn");
  if (knownBtn) knownBtn.addEventListener("click", () => markKnown(true));
  const unsureBtn = $("#markUnsureBtn");
  if (unsureBtn) unsureBtn.addEventListener("click", () => markKnown(false));

  const doneBtn = $("#sectionDoneBtn");
  if (doneBtn) {
    doneBtn.addEventListener("click", () => {
      const key = $("#sectionDoneBanner").dataset.section;
      if (key) selectSection(key, "study");
    });
  }

  document.addEventListener("keydown", handleStudyShortcut);
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

  const key = event.key.toLowerCase();
  if (event.key === "ArrowLeft") { moveCard(-1); }
  else if (event.key === "ArrowRight") { moveCard(1); }
  else if (event.key === " " || event.key === "Enter") { elements.flashcard.classList.toggle("flipped"); }
  else if (key === "s") { speakCurrent(); }
  else if (event.key === "1") { markKnown(true); }
  else if (event.key === "2") { markKnown(false); }
  else return;

  event.preventDefault();
}

function bindEvents() {
  elements.loginForm.addEventListener("submit", loginStudent);
  elements.logoutButton.addEventListener("click", logoutStudent);

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
  bindPatternHubEvents();

  elements.flashcard.addEventListener("click", () => elements.flashcard.classList.toggle("flipped"));
  elements.flashcard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") elements.flashcard.classList.toggle("flipped");
  });
  $("#prevButton").addEventListener("click", () => moveCard(-1));
  $("#nextButton").addEventListener("click", () => moveCard(1));
  $("#speakButton").addEventListener("click", speakCurrent);
  $$(".quiz-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.quizType = button.dataset.quizType;
      state.quizCount = 1;
      updateQuizTabs();
      newQuiz();
    });
  });
  $("#refreshLeaderboardButton").addEventListener("click", renderLeaderboard);
  $("#newQuizButton").addEventListener("click", newQuiz);
  $("#resetMatchButton").addEventListener("click", renderMatch);
  $("#blastStartBtn").addEventListener("click", startBlast);
  $("#verbBlastStartBtn").addEventListener("click", startVerbBlast);
  elements.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    state.index = 0;
    state.quizCount = 1;
    setMode("study");
  });

  $$(".vtype-btn").forEach((btn) => btn.addEventListener("click", () => setVerbType(btn.dataset.vtype)));
  $$(".vmode-btn").forEach((btn) => btn.addEventListener("click", () => setVerbMode(btn.dataset.vmode)));
  $("#verbPrevBtn").addEventListener("click", () => { state.verbIndex--; renderVerbCard(); setTimeout(speakAllVerbForms, 150); });
  $("#verbNextBtn").addEventListener("click", () => { state.verbIndex++; renderVerbCard(); setTimeout(speakAllVerbForms, 150); });
  $("#verbCard").addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    $("#verbCard").classList.toggle("flipped");
  });
  $("#verbCard").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") $("#verbCard").classList.toggle("flipped");
  });
  $$(".vf-speak-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const verb = currentVerb();
      const form = btn.dataset.vf;
      speakVerb(verb, form);
    });
  });
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
  $("#bqPrevBtn").addEventListener("click", () => { state.bqIndex--; renderBQCard(); });
  $("#bqNextBtn").addEventListener("click", () => { state.bqIndex++; renderBQCard(); });
  $("#bqCard").addEventListener("click", (event) => {
    if (event.target.closest("#bqSpeakBtn")) return;
    $("#bqCard").classList.toggle("flipped");
  });
  $("#bqCard").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      $("#bqCard").classList.toggle("flipped");
    }
  });
  $("#bqSpeakBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    speakBQCard();
  });
  $("#bqQuizSpeakBtn").addEventListener("click", speakBQQuizQuestion);
  $("#newBQQuizBtn").addEventListener("click", () => { state.bqQuizCount++; newBQQuiz(); });
  $("#resetBQMatchBtn").addEventListener("click", renderBQMatch);
  $("#bqBlastStartBtn").addEventListener("click", startBQBlast);

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
  $("#verbCard").classList.remove("flipped");
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
  $("#verbTypeBadge2").textContent = badge;
  $("#verbTypeBadge2").className = cls;
  const [ex1, ex2, ex3] = verbExamples(verb);
  $("#verbEx1").innerHTML = ex1;
  $("#verbEx2").innerHTML = ex2;
  $("#verbEx3").innerHTML = ex3;
}

function newVerbQuiz() {
  const pool = filteredVerbs();
  if (!pool.length) return;
  const item = shuffle(pool)[0];
  const askPP = Math.random() > 0.5;
  state.verbQuizItem = item;
  state.verbQuizAsk = askPP ? "pp" : "past";
  $("#verbQuizFeedback").textContent = "";
  $("#verbQuizCount").textContent = `문제 ${state.verbQuizCount}`;
  $("#verbQuizPrompt").textContent = askPP ? "다음 동사의 과거분사형(P.P.)은?" : "다음 동사의 과거형(Past)은?";
  $("#verbQuizBase").textContent = item.base;
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
  state.verbQuizCount += 1;
  setTimeout(newVerbQuiz, 1300);
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
  $("#verbBlastArea").classList.toggle("hidden", mode !== "blast");
  if (mode !== "blast") stopVerbBlast();
  if (mode === "card") renderVerbCard();
  else if (mode === "quiz") { state.verbQuizCount = 1; newVerbQuiz(); }
  else if (mode === "blast") initVerbBlastScreen();
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
  $("#verbBlastArea").classList.add("hidden");
  stopVerbBlast();
  renderVerbCard();
}

// ──────────── 북퀴즈 패턴 학습 ────────────

function bqPool() {
  return state.bqType === "pattern" ? bqPatterns : bqWords;
}

function initBookquizMode() {
  state.bqType = "word";
  state.bqSubMode = "card";
  state.bqIndex = 0;
  $$(".bqtype-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqtype === "word"));
  $$(".bqmode-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqmode === "card"));
  $("#bqCardArea").classList.remove("hidden");
  $("#bqQuizArea").classList.add("hidden");
  $("#bqMatchArea").classList.add("hidden");
  $("#bqBlastArea").classList.add("hidden");
  stopBQBlast();
  renderBQCard();
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
  else if (state.bqSubMode === "match") renderBQMatch();
  else if (state.bqSubMode === "blast") initBQBlastScreen();
}

function setBQSubMode(mode) {
  stopBQBlast();
  state.bqSubMode = mode;
  $$(".bqmode-btn").forEach((b) => b.classList.toggle("active", b.dataset.bqmode === mode));
  $("#bqCardArea").classList.toggle("hidden", mode !== "card");
  $("#bqQuizArea").classList.toggle("hidden", mode !== "quiz");
  $("#bqMatchArea").classList.toggle("hidden", mode !== "match");
  $("#bqBlastArea").classList.toggle("hidden", mode !== "blast");
  if (mode === "card") renderBQCard();
  else if (mode === "quiz") { state.bqQuizCount = 1; newBQQuiz(); }
  else if (mode === "match") renderBQMatch();
  else if (mode === "blast") initBQBlastScreen();
}

function renderBQCard() {
  const pool = bqPool();
  const total = pool.length;
  state.bqIndex = ((state.bqIndex % total) + total) % total;
  const item = pool[state.bqIndex];
  $("#bqCardEnglish").textContent = item.english;
  $("#bqCardKorean").textContent = item.korean;
  $("#bqCardBackEnglish").textContent = item.english;
  $("#bqCard").classList.remove("flipped");
  $("#bqCardMeta").textContent = `${state.bqIndex + 1} / ${total}`;
  $("#bqIndexDisplay").textContent = `${state.bqIndex + 1} / ${total}`;
  $("#bqCardBadge").textContent = state.bqType === "pattern" ? "질문 패턴" : "핵심 단어";
}

function speakBQCard() {
  speakBookquizItem(bqPool()[state.bqIndex]);
}

function speakBQQuizQuestion() {
  const item = state.bqQuizItem;
  if (!item) return;
  // 문제 방향과 관계없이 학습할 영어 표현을 미국 영어로 들려준다.
  speakBookquizItem(item);
}

function newBQQuiz() {
  const pool = bqPool();
  if (!pool.length) {
    $("#bqQuizQuestion").textContent = "학습 데이터가 없습니다.";
    $("#bqQuizOptions").innerHTML = "";
    return;
  }
  const item = shuffle([...pool])[0];
  state.bqQuizItem = item;
  const askKorean = Math.random() < 0.5;
  state.bqAskDir = askKorean ? "toEn" : "toKo";
  $("#bqQuizFeedback").textContent = "";
  $("#bqQuizCount").textContent = `문제 ${state.bqQuizCount}`;
  $("#bqQuizPrompt").textContent = askKorean ? "뜻에 맞는 영어 표현은?" : "영어 표현의 뜻은?";
  const questionText = askKorean ? item.korean : item.english;
  $("#bqQuizQuestion").textContent = questionText;
  if (!askKorean) speakBookquizItem(item);

  const ansKey = askKorean ? "english" : "korean";
  const distractors = shuffle(pool.filter((p) => p.id !== item.id && p[ansKey] !== item[ansKey])).slice(0, 3);
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
      if (status) status.textContent = "🎉 완성! 보너스 50점! 새 판이 시작됩니다…";
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
let bqBlast = {
  active: false, lives: 3, score: 0, wave: 1, correct: 0, currentItem: null, enemyTimer: null,
};

function initBQBlastScreen() {
  bqBlast.active = false;
  if (bqBlast.enemyTimer) { clearTimeout(bqBlast.enemyTimer); bqBlast.enemyTimer = null; }
  const overlay = $("#bqBlastOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.querySelector("h2").textContent = "🚀 북퀴즈 블래스트!";
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
  bqBlast = { active: true, lives: 3, score: 0, wave: 1, correct: 0, currentItem: null, enemyTimer: null };
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
  const duration = Math.max(2.0, 6.0 - (bqBlast.wave - 1) * 0.4);
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
    if (bqBlast.correct % 5 === 0) bqBlast.wave += 1;
    state.score += 5;
    saveState();
    updateStats();
    updateBQBlastHUD();
    bqBlast.enemyTimer = setTimeout(spawnBQBlastEnemy, 700);
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
  bqBlast.enemyTimer = setTimeout(spawnBQBlastEnemy, 1200);
}

function updateBQBlastHUD() {
  const hearts = "❤️".repeat(Math.max(0, bqBlast.lives)) + "🖤".repeat(Math.max(0, 3 - bqBlast.lives));
  const livesEl = $("#bqBlastLivesText");
  if (livesEl) livesEl.textContent = hearts;
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
    $("#bqQuizFeedback").textContent = "정답입니다! ✅";
  } else {
    clickedBtn.classList.add("wrong");
    state.streak = 0;
    const correctText = correctItem ? correctItem[ansKey] : "";
    $("#bqQuizFeedback").textContent = `틀렸어요. 정답: ${correctText}`;
  }
  saveState();
  updateStats();
}

async function init() {
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", () => { _cachedVoice = null; });
  }
  renderCategories();
  bindEvents();
  updateStats();
  renderStudy();
  if (location.protocol === "file:") {
    elements.loginMessage.textContent = "⚠️ 파일로 직접 열면 로그인이 안 됩니다. 브라우저에서 http://localhost:4174 로 접속해 주세요.";
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
