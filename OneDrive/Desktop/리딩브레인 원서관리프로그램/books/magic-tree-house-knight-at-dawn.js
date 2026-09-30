// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 2.9)
// The Knight at Dawn (Magic Tree House #2) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3248.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭(여덟 살)과 여동생 애니 / 마법의 나무 집 / 시간을 거슬러 중세(Middle Ages) 영국으로 /
//   성(castle)을 탐험한다 / 신비한 기사(a mysterious knight)가 그들을 돕는다 /
//   책의 첫 문장은 "Jack couldn't sleep."
// 결말은 근거가 말하지 않는다. 그래서 evidence.ending 에 그대로 적어 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3248",
  slug: "magic-tree-house-knight-at-dawn",
  title: "The Knight at Dawn",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #2",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 1권(AR 2.6)이 정독 1단계라 그에 맞췄다.
  level: { ar: "2.9", lexile: "500L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/4851256-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3248 요약 + 오픈라이브러리 /works/OL81785W (소개글 · 첫 문장 \"Jack couldn't sleep.\" · 주제어 Castles/Magic/Knights and knighthood/Middle Ages/Tree houses/Time travel · 71쪽 · 1993년)",
    characters: ["Jack", "Annie", "a mysterious knight"],
    beats: [
      "Jack and his younger sister Annie use the magic tree house to travel back in time",
      "they go to the Middle Ages, in medieval England",
      "they explore a castle, and a mysterious knight helps them"
    ],
    ending: "근거에 결말이 없다. 소개글이 \"신비한 기사가 그들을 돕는다\"는 데서 멈추고, 두 아이가 그 뒤 어떻게 되는지·어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"medieval England\", \"magic tree house\", \"travel back in time\")과 소개글(\"the Middle Ages\", \"the magic treehouse\", \"travel back\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(잭 여덟 살 · 애니가 여동생 · 성을 탐험 · 신비한 기사의 도움)은 요약과 부딪히지 않아 남겼다. 주제어 Castles/Knights and knighthood/Middle Ages/Time travel 이 같은 것을 가리켜 한 번 더 받쳐 주었다. 여기 밖의 사건·인물·결말은 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"The Knight at Dawn\" read aloud",
    searchUrl: "https://youtu.be/Qf9TH12wMh0",
    videos: [
      { url: "https://youtu.be/Qf9TH12wMh0", title: "The Knight at Dawn — Read Aloud Graphic Novel",
        channel: "Brightly Storytime", views: "88,464", length: "7:48" },
      { url: "https://youtu.be/2wb2n0Dx4ao", title: "The Knight at Dawn — Full Audiobook",
        channel: "The Story Harbor", views: "72,166", length: "40:22" },
      { url: "https://youtu.be/gYmFo5_8x-g", title: "The Knight at Dawn — Chapter 3: Across the Bridge",
        channel: "New World English", views: "10,717", length: "6:28" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "knight",     pos: "n.",   en: "a soldier of long ago who wore armor and served a lord or king", ko: "기사",
      ex: "A mysterious {{knight}} helps Jack and Annie.", ex_ko: "신비한 기사가 잭과 애니를 도와줘요.", pic: "🛡️" },
    { word: "dawn",       pos: "n.",   en: "the first light of the morning, when the sun comes up", ko: "새벽, 동틀 녘",
      ex: "The sky turns light at {{dawn}}.", ex_ko: "새벽이 되면 하늘이 밝아져요.", pic: "🌅" },
    { word: "castle",     pos: "n.",   en: "a very large stone building with thick walls, built long ago", ko: "성",
      ex: "Jack and Annie explore a {{castle}}.", ex_ko: "잭과 애니는 성을 탐험해요.", pic: "🏰" },
    { word: "magic",      pos: "adj.", en: "using powers that seem impossible or mysterious", ko: "마법의, 신기한",
      ex: "They travel in a {{magic}} tree house.", ex_ko: "그들은 마법의 나무 집을 타고 가요.", pic: "✨" },
    { word: "travel",     pos: "v.",   en: "to go from one place to another", ko: "여행하다, 이동하다",
      ex: "Jack and Annie {{travel}} back in time.", ex_ko: "잭과 애니는 시간을 거슬러 갑니다.", pic: "🧭" },
    { word: "explore",    pos: "v.",   en: "to look around a new place to find out what is there", ko: "탐험하다",
      ex: "They {{explore}} a castle in the Middle Ages.", ex_ko: "그들은 중세의 성을 탐험해요.", pic: "🔦" },
    { word: "mysterious", pos: "adj.", en: "strange and hard to understand or explain", ko: "신비한, 알 수 없는",
      ex: "A {{mysterious}} knight appears in this story.", ex_ko: "이 이야기에는 신비한 기사가 나와요.", pic: "❓" },
    { word: "medieval",   pos: "adj.", en: "belonging to the Middle Ages, the time of castles and knights", ko: "중세의",
      ex: "They go back to {{medieval}} England.", ex_ko: "그들은 중세 영국으로 갑니다.", pic: "⚔️" },
    { word: "sleep",      pos: "v.",   en: "to rest with your eyes closed, the way you do at night", ko: "잠자다",
      ex: "At the start of the book, Jack could not {{sleep}}.", ex_ko: "책이 시작할 때 잭은 잠을 이룰 수 없었어요.", pic: "😴" },
    { word: "help",       pos: "v.",   en: "to do something that makes things easier for another person", ko: "돕다",
      ex: "The knight {{helps}} Jack and Annie.", ex_ko: "그 기사는 잭과 애니를 도와줘요.", pic: "🤝" }
  ],

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // couldn't 만은 책의 첫 문장("Jack couldn't sleep.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack has [[a]] younger sister, and they have [[an]] amazing tree house.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an amazing, a sister.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I read {{a}} book and ate {{an}} orange." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] back in time and [[explored]] a castle.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, explore → explored.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "couldn't = could not", ko: "could 의 줄임말",
        sent: "The book begins, \"Jack [[couldn't]] sleep.\" It means he [[could not]] sleep.",
        why_ko: "couldn't 는 could not 을 줄인 말이에요. 뜻은 똑같아요 — '~할 수 없었다'.",
        why: "\"Couldn't\" is the short form of \"could not.\" The meaning is the same.",
        try: "I {{couldn't}} find my shoes. = I {{could not}} find my shoes." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Annie is (a / an) eight-year-old boy's sister.", a: "an",
          why_ko: "eight 는 '에이'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "They found (a / an) magic tree house.", a: "a",
          why_ko: "magic 은 '매'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie (travel / traveled) back in time.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "They (explore / explored) a castle in the Middle Ages.", a: "explored",
          why_ko: "중세로 간 것은 지난 일이에요. explore 의 과거형은 explored." },
        { q: "Jack (couldn't / could'nt) sleep.", a: "couldn't",
          why_ko: "줄임표(')는 빠진 글자 o 자리에 와요. could not → couldn't." }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] back in time last night.", a: "traveled",
          why_ko: "last night 은 지난 일이에요. 과거형 traveled 로 고쳐요." },
        { q: "A knight [[help]] them in the castle.", a: "helped",
          why_ko: "이야기 속에서 이미 일어난 일이니 helped 예요." },
        { q: "Annie is [[a]] older sister? No — she is [[a]] younger sister.", a: "an",
          why_ko: "older 는 '오'로 모음 소리로 시작해요. an older 가 맞아요." }
      ],
      write: [
        { ko: "잭은 잠을 잘 수 없었다.", cond: "could not", a: "Jack could not sleep.",
          why_ko: "'~할 수 없었다'는 could not + 동사원형이에요. couldn't sleep 도 맞아요." },
        { ko: "그들은 성을 탐험했다.", cond: "explore, 과거형", a: "They explored a castle.",
          why_ko: "explore 의 과거형은 explored. 관사 a 를 빠뜨리지 마세요." }
      ]
    }
  },

  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story?",
      frame: "They are {{Jack and his younger sister Annie}}." },
    { ref: "책 전체", skill: "사실찾기", q: "How do Jack and Annie travel back in time?",
      frame: "They use {{the magic tree house}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What time and what country do they travel to?",
      frame: "They go back to {{the Middle Ages}}, in {{medieval England}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What big building do they explore, and who helps them there?",
      frame: "They explore {{a castle}}, and {{a mysterious knight}} helps them." },
    { ref: "책 첫 문장", skill: "어휘", q: "The book begins, \"Jack couldn't sleep.\" What do you think that tells us about Jack that night?",
      frame: "I think it tells us {{                    }}." },
    { ref: "책 전체", skill: "추론·예측", q: "The knight is called \"mysterious.\" Why do you think the story calls him that?",
      frame: "I think it is because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If the magic tree house took you to a castle in the Middle Ages, would you go inside and explore it? Say why.",
      frame: "I {{would / would not}} go inside, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and his friend", "Annie and her cousin", "Two knights"], c: 0,
      why_ko: "잭과 여동생 애니예요. 소개글이 \"여덟 살 잭과 그의 여동생 애니\"라고 분명히 말해요.",
      why: "Jack and his younger sister Annie. The description says so directly." },
    { q: "How old is Jack in this story?",
      a: ["Five", "Six", "Eight", "Twelve"], c: 2,
      why_ko: "소개글에 \"Eight-year-old Jack\" 이라고 적혀 있어요. 여덟 살이에요.",
      why: "The description begins \"Eight-year-old Jack.\"" },
    { q: "How is Annie related to Jack?",
      a: ["She is his older sister", "She is his younger sister", "She is his cousin", "She is his classmate"], c: 1,
      why_ko: "\"his younger sister Annie\" — 애니는 잭의 여동생이에요. 언니도, 사촌도, 같은 반 친구도 아니에요.",
      why: "\"His younger sister Annie.\" Not older, not a cousin, not a classmate." },
    { q: "What do Jack and Annie use to travel back in time?",
      a: ["A time machine", "A magic tree house", "A magic horse", "A boat"], c: 1,
      why_ko: "마법의 나무 집이에요. 기계도 말도 배도 아니에요. 요약과 소개글이 둘 다 나무 집이라고 말해요.",
      why: "The magic tree house. Both the catalog summary and the description say the tree house." },
    { q: "What time in history do Jack and Annie travel to?",
      a: ["The age of dinosaurs", "The Middle Ages", "Ancient Egypt", "The future"], c: 1,
      why_ko: "중세(the Middle Ages)예요. 공룡 시대는 1권이고, 이 책은 성과 기사의 시대예요.",
      why: "The Middle Ages. The dinosaurs were book #1; this one is the time of castles and knights." },
    { q: "Which country do they travel to?",
      a: ["France", "England", "Spain", "Italy"], c: 1,
      why_ko: "영국이에요. 학원 장서 목록 요약이 \"medieval England\" 라고 적고 있어요.",
      why: "England. The catalog summary says \"medieval England.\"" },
    { q: "What big building do Jack and Annie explore?",
      a: ["A church", "A school", "A castle", "A palace garden"], c: 2,
      why_ko: "성(castle)이에요. 소개글이 \"they explore a castle\" 라고 말하고, 주제어 목록에도 Castles 가 있어요.",
      why: "A castle. The description says \"they explore a castle,\" and \"Castles\" is one of the subjects." },
    { q: "Who helps Jack and Annie in the Middle Ages?",
      a: ["A king", "A mysterious knight", "A farmer", "Their parents"], c: 1,
      why_ko: "신비한 기사예요. 왕도 농부도 부모님도 아니에요. 소개글이 \"helped by a mysterious knight\" 라고 해요.",
      why: "A mysterious knight — not a king, not a farmer, not their parents." },
    { q: "Which word best describes the knight in this story?",
      a: ["Mysterious", "Funny", "Lazy", "Tiny"], c: 0,
      why_ko: "소개글이 고른 낱말이 바로 mysterious 예요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The description's own word is \"mysterious.\" The other three appear nowhere in our sources." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack couldn't sleep.\"", "\"Annie ran up the ladder.\"", "\"It was a dark night.\"", "\"The castle was quiet.\""], c: 0,
      why_ko: "첫 문장은 \"Jack couldn't sleep.\" 이에요. 오픈라이브러리에 그대로 적혀 있어요. 잠 못 드는 잭에서 이야기가 시작돼요.",
      why: "\"Jack couldn't sleep.\" That is the recorded first line of the book." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#1", "#2", "#3", "#10"], c: 1,
      why_ko: "2권이에요. 장서 목록 제목이 \"#02. The Knight at Dawn\" 이고 요약 끝에도 Book #2 라고 적혀 있어요.",
      why: "Book #2 — the catalog title is \"#02. The Knight at Dawn.\"" },
    { q: "What does the word \"dawn\" in the title mean?",
      a: ["Late at night", "The first light of morning", "The middle of the day", "Winter"], c: 1,
      why_ko: "dawn 은 해가 막 떠오르는 새벽이에요. 제목 The Knight at Dawn 은 '새벽의 기사' 라는 뜻이에요.",
      why: "Dawn is the first light of morning. The title means \"the knight at first light.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who helps Jack and Annie", "Where they travel to", "How the story ends", "What building they explore"], c: 2,
      why_ko: "결말이에요. 우리가 가진 소개글은 '신비한 기사가 돕는다' 에서 멈춰요. 이야기가 어떻게 끝나는지는 책을 읽어야 알 수 있어요.",
      why: "The ending. Our description stops at \"helped by a mysterious knight\" — you have to read the book to find out how it ends." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and his younger sister Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바랐는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{a mysterious knight helped them}}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "Jack and Annie use the magic tree house.",
        frame: "They travel back in time to {{the Middle Ages}}, in {{medieval England}}." },
      { label: "The Castle",
        given: "",
        frame: "In that time they {{explore a castle}}." },
      { label: "The Knight",
        given: "",
        frame: "A {{mysterious}} knight {{helps them}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Knight at Dawn",
    branches: [
      { label: "Jack",            ask: "Jack is eight years old. What do we learn about him in the very first sentence?",
        deeper: "Why might a boy who cannot sleep be the one who finds an adventure?" },
      { label: "Annie",           ask: "Annie is Jack's younger sister. What is it like to travel with a brother or a sister?",
        deeper: "Is it easier or harder to be brave when someone younger is with you?" },
      { label: "The Tree House",  ask: "What does the magic tree house do for Jack and Annie?",
        deeper: "Why do you think a tree house — not a machine — is the thing that carries them through time?" },
      { label: "The Castle",      ask: "What do you expect to find inside a castle in the Middle Ages?",
        deeper: "Why would a castle feel exciting and frightening at the same time?" },
      { label: "The Knight",      ask: "The knight is called mysterious. What makes a person mysterious?",
        deeper: "Why is being helped by someone you do not know both good and a little scary?" },
      { label: "Me",              ask: "If the tree house came for you, what time would you ask it for?",
        deeper: "What would you want to explore there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Adventure", "Courage", "Help"],
    globalContext: "Orientation in space and time — 다른 시대는 우리가 사는 지금과 어떻게 다른가",
    statement: "Travelling into another time turns everything unfamiliar, and help can come from someone you did not expect.",
    factual: [
      "What do Jack and Annie use to travel back in time?",
      "What time and place do they travel to?",
      "Who helps them there?"
    ],
    conceptual: [
      "Why would a castle in the Middle Ages feel so different from home?",
      "What makes a person seem mysterious to us?"
    ],
    debatable: [
      "Should you accept help from someone you do not know when you are lost?",
      "Is it better to explore a new place, or to stay somewhere safe?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Open-minded"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "신비한 기사가 그들을 돕는다" 까지만 말한다. 기사가 아는 사람인지 낯선 사람인지는
    // 적혀 있지 않으므로, 그 판단을 아이에게 맡기는 물음으로 세웠다.
    prompt: "A knight the story calls \"mysterious\" helps Jack and Annie. When you are in a place you do not know at all, is it a good idea to accept help from someone you do not know? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Help from a Stranger", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think it can be a good idea to accept help when you are far from home.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, a mysterious knight helps Jack and Annie in the castle.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows help can come from someone you did not expect.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say never trust someone you do not know, but Jack and Annie were far from home.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe there are times when accepting help is right.", lines: 2 }
    ],
    expressions: [
      "I think / In my opinion, ...",
      "This is because ...",
      "In the book, ...",
      "This shows that ...",
      "Some people say ..., but I believe ...",
      "For this reason, ..."
    ],
    rubric: [
      { c: "A 분석",  d: "책 속 이야기를 근거로 들어 설명했나요? · Did I use the story as evidence?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  },

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  teaching: {
    goal: {
      en: "Students retell how Jack and Annie travel to the Middle Ages, explore a castle and are helped by a mysterious knight, then take a side on accepting help from someone you do not know.",
      ko: "잭과 애니가 마법의 나무 집으로 중세 영국에 가서 성을 탐험하고 신비한 기사의 도움을 받는 흐름을 말하고, 낯선 사람의 도움을 받는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "If a magic tree house came for you tonight, what time would you ask it for?",
        do: "책을 펴기 전에 한다. 시간 여행을 아이 입에서 먼저 꺼내야 이 책이 읽힌다. 서너 명만.",
        exp: "I would go to the time of castles. / I would go to the future.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would go to the Middle Ages.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"The Knight at Dawn.\" What is a knight? What is dawn?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "A knight wears armor. Dawn is early morning.",
        stuck: "표지를 가리킨다. \"Look at the cover. What do you see?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "기사 → knight / 성 → castle / 탐험하다 → explore",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'How do they travel...' becomes 'They use...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They use the magic tree house.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence is just three words: \"Jack couldn't sleep.\" What does that tell you?",
        do: "칠판에 그 세 낱말만 쓴다. 짧은 문장 하나에서 얼마나 나오는지 보게 한다.",
        exp: "He was thinking about something. / Something was on his mind.",
        stuck: "\"When do YOU not fall asleep? What are you thinking about then?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / So: a mysterious knight helped them — Wanted·But·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Where do they go?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Two boxes are empty: But, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those two boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Knight)", min: "",
        say: "Stop at The Knight. Don't just tell me he helped — tell me what makes a person MYSTERIOUS.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "We do not know who he is or why he helps. That is what makes him mysterious.",
        stuck: "\"You said what he did. Now — what do we NOT know about him?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should you accept help from someone you do not know when you are lost? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie were in a time that was not their own.",
        stuck: "손을 들게 한다. \"Accept the help? Or walk away?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the five conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 다섯 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say you should never trust someone you do not know, but Jack and Annie were far from their own time.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about knights and castles?", ko: "기사와 성에 대해 이미 아는 게 있니?" },
        { en: "Would you rather travel to the past or to the future?", ko: "과거로 갈래, 미래로 갈래?" },
        { en: "The title says the knight comes at dawn. Why dawn and not noon?", ko: "기사는 왜 한낮이 아니라 새벽에 올까?" }
      ],
      during: [
        { en: "What do you think Jack and Annie find inside the castle?", ko: "성 안에서 잭과 애니는 무엇을 발견할 것 같니?" },
        { en: "Why do you think the knight helps two children he does not know?", ko: "그 기사는 왜 모르는 아이 둘을 도와줄까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Was the knight really mysterious in the end?", ko: "끝까지 읽고 나서도 그 기사는 신비했니?" },
        { en: "Where should the tree house go next, and why?", ko: "나무 집은 다음에 어디로 가야 할까? 왜?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·Then 두 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Knight' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 5개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 이야기가 없으면 근거가 아니다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",     pt: 5, yes: "책 속 이야기를 들어 설명했다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization", pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",        pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",     pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  },

  // ── 낭독녹음 ───────────────────────────────────────────
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 중세 영국의 성으로 가는 이야기",
    text: "Jack [[could not|couldn't]] sleep. He and his younger sister Annie went to their magic [[treehouse|tree house]]. The tree house took them back in time to the [[medieval period|Middle Ages]], in England. There they explored a great [[building|castle]]. A [[strange|mysterious]] knight helped them. What happened after that? Open the book and find out."
  }
};
