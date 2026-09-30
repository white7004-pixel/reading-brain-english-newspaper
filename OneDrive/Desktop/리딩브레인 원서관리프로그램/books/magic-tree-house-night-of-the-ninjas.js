// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 2.7)
// Night of the Ninjas (Magic Tree House #5) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3251.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 쪽수 · 펴낸 해)만으로 만들었다. 그 밖의 인물
// 이름·지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니(남매) / 마법의 나무 집 / 시간을 거슬러 옛 일본(ancient Japan)으로 /
//   거기서 닌자 사범(a ninja master)을 만난다 / 남매는 닌자의 방식(the ways of the Ninja)을 배운다 /
//   책의 첫 문장은 "Let's look again, Jack," said Annie. / 80쪽 · 1995년
// 결말은 근거가 말하지 않는다. 그래서 evidence.ending 에 그대로 적어 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3251",
  slug: "magic-tree-house-night-of-the-ninjas",
  title: "Night of the Ninjas",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #5",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권(AR 2.9)이 정독 1단계라 그에 맞췄다.
  level: { ar: "2.7", lexile: "490L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/423891-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3251 요약 + 오픈라이브러리 /works/OL81831W (소개글 · 첫 문장 \"Let's look again, Jack,\" said Annie. · 주제어 Japan/Ninja/Magic/Time travel/Tree houses/History · 80쪽 · 1995년)",
    characters: ["Jack", "Annie", "a ninja master"],
    beats: [
      "the magic tree house whisks Jack and Annie back in time",
      "they go to ancient Japan",
      "there they encounter a ninja master, and the siblings learn about the ways of the Ninja"
    ],
    ending: "근거에 결말이 없다. 요약은 \"닌자 사범을 만난다\" 에서, 소개글은 \"닌자의 방식을 배운다\" 에서 멈춘다. 두 아이가 그 뒤 어떻게 되는지·어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "두 출처가 한 자리에서 어긋났다. 장서 요약은 \"ancient Japan\" 이라 하고 소개글은 \"feudal Japan\" 이라 한다. 규칙대로 장서 요약을 따라 ancient Japan 으로 적었고, feudal 은 아예 쓰지 않았다. 둘 다 말하는 것(일본 · 옛 시대 · 닌자 · 마법의 나무 집 · 시간 여행)은 그대로 두었다. 한쪽에만 있는 것은 그 출처가 말하는 대로만 남겼다 — 요약에만 있는 \"ninja master 를 만난다\", 소개글에만 있는 \"the siblings 가 the ways of the Ninja 를 배운다\". 주제어 Japan/Ninja/Magic/Time travel/Tree houses 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 애니가 여동생인지 언니인지는 이 책의 근거가 말하지 않아 '남매(siblings)' 까지만 적었다. 여기 밖의 사건·인물·결말은 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Night of the Ninjas\" read aloud",
    searchUrl: "https://youtu.be/Q3o10qdiuyI",
    videos: [
      { url: "https://youtu.be/Q3o10qdiuyI", title: "Night of the Ninjas — Magic Tree House #5 (Read Aloud)",
        channel: "The Story Harbor", views: "", length: "42:47" },
      { url: "https://youtu.be/Z3AEK0CPFyI", title: "Night of the Ninjas — Read Aloud",
        channel: "Faerie Book Mama", views: "", length: "33:50" },
      { url: "https://youtu.be/q_B7xAjqhpk", title: "Night of the Ninjas — Magic Tree House #5",
        channel: "EUNICE books and words", views: "", length: "41:43" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "ninja",     pos: "n.",   en: "a fighter of old Japan, trained to move in secret", ko: "닌자",
      ex: "Jack and Annie learn about the {{ninja}} in this book.", ex_ko: "잭과 애니는 이 책에서 닌자에 대해 배워요.", pic: "🥷" },
    { word: "master",    pos: "n.",   en: "a person who is very good at something and can teach it", ko: "사범, 달인",
      ex: "They meet a ninja {{master}} in Japan.", ex_ko: "그들은 일본에서 닌자 사범을 만나요.", pic: "🎓" },
    { word: "ancient",   pos: "adj.", en: "from a time very, very long ago", ko: "아주 옛날의, 고대의",
      ex: "The tree house takes them to {{ancient}} Japan.", ex_ko: "나무 집은 그들을 옛 일본으로 데려가요.", pic: "🏯" },
    { word: "magic",     pos: "adj.", en: "using powers that seem impossible or mysterious", ko: "마법의, 신기한",
      ex: "They travel in a {{magic}} tree house.", ex_ko: "그들은 마법의 나무 집을 타고 가요.", pic: "✨" },
    { word: "travel",    pos: "v.",   en: "to go from one place to another", ko: "여행하다, 이동하다",
      ex: "Jack and Annie {{travel}} back in time.", ex_ko: "잭과 애니는 시간을 거슬러 갑니다.", pic: "🧭" },
    { word: "encounter", pos: "v.",   en: "to meet someone you did not plan to meet", ko: "(뜻밖에) 만나다, 마주치다",
      ex: "In Japan they {{encounter}} a ninja master.", ex_ko: "일본에서 그들은 닌자 사범과 마주쳐요.", pic: "👋" },
    { word: "learn",     pos: "v.",   en: "to come to know something new", ko: "배우다",
      ex: "The siblings {{learn}} about the ways of the Ninja.", ex_ko: "남매는 닌자의 방식에 대해 배워요.", pic: "📖" },
    { word: "way",       pos: "n.",   en: "how a person or a group does things", ko: "방식, 하는 법",
      ex: "This book is about the {{ways}} of the Ninja.", ex_ko: "이 책은 닌자의 방식에 대한 이야기예요.", pic: "🧩" },
    { word: "sibling",   pos: "n.",   en: "a brother or a sister in the same family", ko: "형제자매, 남매",
      ex: "Jack and Annie are {{siblings}}.", ex_ko: "잭과 애니는 남매예요.", pic: "👫" },
    { word: "again",     pos: "adv.", en: "one more time", ko: "다시, 또",
      ex: "The book begins, \"Let's look {{again}}, Jack.\"", ex_ko: "책은 \"다시 한번 보자, 잭\" 하고 시작해요.", pic: "🔁" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // Let's 만은 책의 첫 문장("Let's look again, Jack,")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "[[A]] magic tree house took Jack and Annie back to [[an]] ancient time in Japan.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an ancient, a magic tree house.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} ninja and {{an}} old castle." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] back in time and [[learned]] about the ways of the Ninja.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, learn → learned.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} my book." },
      { name: "Let's + 동사원형", ko: "같이 하자고 말할 때",
        sent: "The book begins, \"[[Let's]] look again, Jack,\" said Annie. It means \"[[Let us]] look again.\"",
        why_ko: "Let's 는 Let us 를 줄인 말이에요. 뒤에는 꼭 동사원형이 와요 — Let's look(O), Let's looks(X).",
        why: "\"Let's\" is short for \"let us,\" and the verb after it never changes: Let's look, Let's go.",
        try: "{{Let's}} read this book together." }
    ],
    find: "책에서 Let's 로 시작하는 문장을 하나, -ed 로 끝나는 과거형 동사를 두 개 찾아 쓰세요. · Find one \"Let's\" sentence and two verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie met (a / an) ninja master.", a: "a",
          why_ko: "ninja 는 '니'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "They went back to (a / an) ancient time in Japan.", a: "an",
          why_ko: "ancient 는 '에이'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "Last night Jack and Annie (learn / learned) about the ways of the Ninja.", a: "learned",
          why_ko: "Last night 은 지난 일이에요. learn 의 과거형은 learned." },
        { q: "Jack and Annie (travel / traveled) back in time in this story.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "Annie said, \"(Lets / Let's) look again.\"", a: "Let's",
          why_ko: "줄임표(')는 빠진 글자 u 자리에 와요. Let us → Let's." }
      ],
      fix: [
        { q: "Last night Jack and Annie [[learn]] about the ways of the Ninja.", a: "learned",
          why_ko: "Last night 은 지난 일이에요. 과거형 learned 로 고쳐요." },
        { q: "They [[travel]] to ancient Japan yesterday.", a: "traveled",
          why_ko: "yesterday 가 보이면 과거형 신호예요. travel → traveled." },
        { q: "Jack and Annie met [[an]] ninja master.", a: "a",
          why_ko: "ninja 는 자음 소리로 시작해요. an 이 아니라 a ninja master." }
      ],
      write: [
        { ko: "그들은 옛 일본으로 시간 여행을 했다.", cond: "travel, 과거형", a: "They traveled to ancient Japan.",
          why_ko: "travel 의 과거형은 traveled. ancient Japan 앞에는 관사를 붙이지 않아요." },
        { ko: "다시 한번 보자.", cond: "Let's, look", a: "Let's look again.",
          why_ko: "Let's 뒤에는 동사원형 look 이 와요. 이 책의 첫 문장이기도 해요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and how are they related?",
      frame: "They are {{Jack and Annie}}, and they are {{siblings}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What takes Jack and Annie back in time?",
      frame: "{{The magic tree house}} takes them back in time." },
    { ref: "책 전체", skill: "사실찾기", q: "What country do they travel to, and what time in that country?",
      frame: "They go to {{Japan}}, to {{ancient}} times." },
    { ref: "책 전체", skill: "사실찾기", q: "Who do they encounter there, and what do the siblings learn about?",
      frame: "They encounter {{a ninja master}}, and they learn about {{the ways of the Ninja}}." },
    { ref: "책 첫 문장", skill: "어휘", q: "The book begins, \"Let's look again, Jack,\" said Annie. What does the word \"again\" tell you they have already done once?",
      frame: "It tells me they have already {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "The title of this book is \"Night of the Ninjas.\" Why do you think the word \"Ninjas\" is in the title?",
      frame: "I think it is because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If a master could teach you one skill for a whole night, what skill would you ask for, and why?",
      frame: "I would ask to learn {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and his friend", "Annie and her cousin", "Two ninjas"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약과 소개글이 둘 다 Jack and Annie 라고 말해요.",
      why: "Jack and Annie. Both the catalog summary and the description name them." },
    { q: "How are Jack and Annie related to each other?",
      a: ["They are classmates", "They are siblings", "They are neighbors", "They are cousins"], c: 1,
      why_ko: "소개글이 두 사람을 \"the siblings\" 라고 불러요. 남매예요. 같은 반 친구도, 이웃도, 사촌도 아니에요.",
      why: "The description calls them \"the siblings.\"" },
    { q: "What takes Jack and Annie back in time?",
      a: ["A time machine", "A magic tree house", "A magic horse", "A ship"], c: 1,
      why_ko: "마법의 나무 집이에요. 기계도 말도 배도 아니에요. 두 출처가 모두 the magic tree house 라고 말해요.",
      why: "The magic tree house. Both sources say so, and \"Tree houses\" is one of the subjects." },
    { q: "Which country do Jack and Annie travel to?",
      a: ["China", "Japan", "Egypt", "France"], c: 1,
      why_ko: "일본이에요. 요약과 소개글이 모두 Japan 이라 하고, 주제어에도 Japan 이 있어요.",
      why: "Japan. Both sources say Japan, and \"Japan\" is listed as a subject and a place." },
    { q: "Which word does our library summary use for the Japan they visit?",
      a: ["Modern", "Ancient", "Future", "Tomorrow's"], c: 1,
      why_ko: "장서 요약이 \"ancient Japan\" 이라고 적고 있어요. 아주 옛날의 일본이에요.",
      why: "The catalog summary says \"ancient Japan.\"" },
    { q: "Who do Jack and Annie encounter in Japan?",
      a: ["A king", "A farmer", "A ninja master", "Their parents"], c: 2,
      why_ko: "닌자 사범이에요. 요약이 \"they encounter a ninja master\" 라고 말해요.",
      why: "A ninja master — the summary says they \"encounter a ninja master.\"" },
    { q: "What do the siblings learn about in this book?",
      a: ["The ways of the Ninja", "The rules of a game", "How to build a house", "How to cook rice"], c: 0,
      why_ko: "닌자의 방식이에요. 소개글이 \"learn about the ways of the Ninja\" 라고 그대로 말해요.",
      why: "\"The ways of the Ninja\" — the description says so in those words." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack couldn't sleep.\"", "\"Let's look again, Jack,\" said Annie.", "\"The night was dark.\"", "\"Annie ran up the ladder.\""], c: 1,
      why_ko: "첫 문장은 \"Let's look again, Jack,\" said Annie. 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "\"Let's look again, Jack,\" said Annie. That is the recorded first line." },
    { q: "Who speaks the first line of the book?",
      a: ["Jack", "Annie", "The ninja master", "Nobody speaks"], c: 1,
      why_ko: "애니예요. 첫 문장 끝에 said Annie 라고 적혀 있어요. 말을 듣는 사람이 잭이에요.",
      why: "Annie. The line ends \"said Annie,\" and she is speaking to Jack." },
    { q: "What does the word \"again\" in the first line mean?",
      a: ["Never", "One more time", "Very slowly", "Tomorrow"], c: 1,
      why_ko: "again 은 '다시, 한 번 더' 예요. 애니는 한 번 더 보자고 말하고 있어요.",
      why: "\"Again\" means one more time. Annie is asking to look one more time." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#1", "#2", "#5", "#10"], c: 2,
      why_ko: "5권이에요. 장서 목록 제목이 \"#05. Night of the Ninjas\" 이고 요약 끝에도 Book #5 라고 적혀 있어요.",
      why: "Book #5 — the catalog title is \"#05. Night of the Ninjas.\"" },
    { q: "About how long is this book?",
      a: ["About 20 pages", "About 50 pages", "About 80 pages", "About 300 pages"], c: 2,
      why_ko: "80쪽이에요. 오픈라이브러리에 80쪽으로 적혀 있어요.",
      why: "80 pages, as recorded in Open Library." },
    { q: "What year is recorded for this book in our library information?",
      a: ["1975", "1985", "1995", "2015"], c: 2,
      why_ko: "1995년이에요. 오픈라이브러리에 적힌 해예요.",
      why: "1995 — the year recorded in Open Library." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who they encounter", "Where they travel to", "How the story ends", "What they learn about"], c: 2,
      why_ko: "결말이에요. 우리 자료는 '닌자의 방식을 배운다' 에서 멈춰요. 이야기가 어떻게 끝나는지는 책을 읽어야 알 수 있어요.",
      why: "The ending. Our sources stop at \"learn about the ways of the Ninja\" — you have to read the book to find out how it ends." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바랐는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{they learned about the ways of the Ninja}}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie back in time.",
        frame: "They travel back to {{ancient}} times in {{Japan}}." },
      { label: "The Ninja Master",
        given: "",
        frame: "In Japan they encounter {{a ninja master}}." },
      { label: "The Ways of the Ninja",
        given: "",
        frame: "The siblings {{learn about the ways of the Ninja}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Night of the Ninjas",
    branches: [
      { label: "Jack",             ask: "Jack is the one Annie speaks to in the very first line. What is he doing at that moment?",
        deeper: "Why do you think the story starts with someone asking to look one more time?" },
      { label: "Annie",            ask: "Annie speaks first in this book. What does that tell you about her?",
        deeper: "Is the one who speaks first always the braver one? Say why." },
      { label: "The Tree House",   ask: "What does the magic tree house do for Jack and Annie?",
        deeper: "Why do you think a tree house — not a machine — is the thing that carries them through time?" },
      { label: "Ancient Japan",    ask: "The tree house takes them to ancient Japan. What do you expect to see there?",
        deeper: "How might a place feel different when you arrive in it hundreds of years too early?" },
      { label: "The Ninja Master", ask: "A master is someone who can teach. What would a ninja master know that Jack and Annie do not?",
        deeper: "Why is it easier to learn a hard thing from a master than on your own?" },
      { label: "Me",               ask: "If the tree house came for you tonight, what time and place would you ask it for?",
        deeper: "What would you want to learn there, and who would you want to learn it from?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Learning", "Skill", "Adventure"],
    globalContext: "Orientation in space and time — 아주 먼 옛날의 다른 나라는 지금 우리와 어떻게 다른가",
    statement: "Travelling into another time puts you among people whose ways you do not know, and learning those ways is how you find your footing.",
    factual: [
      "What takes Jack and Annie back in time?",
      "What country and what time do they travel to?",
      "Who do they encounter there, and what do they learn about?"
    ],
    conceptual: [
      "What does it mean to call someone a \"master\"?",
      "Why do different times and places have different ways of doing things?"
    ],
    debatable: [
      "Is it better to learn a new skill from a master, or to work it out by yourself?",
      "When you visit a place where the ways are not your own, should you change your ways to match?"
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "닌자 사범을 만난다 · 닌자의 방식을 배운다" 까지만 말한다. 사범이 어떻게 가르쳤는지는
    // 적혀 있지 않으므로, 그 판단을 아이에게 맡기는 물음으로 세웠다.
    prompt: "In ancient Japan, Jack and Annie learn about the ways of the Ninja. Is it better to learn a new skill from a master, or to work it out by yourself? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "어느 쪽인지 분명히 할 것 · Say which side you choose",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Learning from a Master", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think it is better to learn a new skill from a master.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie learn about the ways of the Ninja in ancient Japan.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that a master can teach you things you could not find alone.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say you remember more when you try by yourself, but that takes much longer.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a good teacher is worth looking for.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and Annie to ancient Japan, where they encounter a ninja master and learn about the ways of the Ninja, then take a side on learning from a master.",
      ko: "마법의 나무 집이 잭과 애니를 옛 일본으로 데려가고, 거기서 닌자 사범을 만나 닌자의 방식을 배우는 흐름을 말하고, 사범에게 배우는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "What is a ninja? Tell me one thing you think you know.",
        do: "책을 펴기 전에 한다. 닌자를 아이 입에서 먼저 꺼내야 이 책이 읽힌다. 서너 명만.",
        exp: "They move quietly. / They wear black.",
        stuck: "선생님이 먼저 한 문장 한다. \"I think ninjas move without a sound.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Night of the Ninjas.\" Why night, and not morning?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Because it is dark. / Because no one can see them.",
        stuck: "표지를 가리킨다. \"Look at the cover. What do you see?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "사범 → master / 고대의 → ancient / 배우다 → learn",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What takes them back in time...' becomes 'The magic tree house takes...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "The magic tree house takes them back in time.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first line is Annie speaking: \"Let's look again, Jack.\" One word there does a lot of work. Which one?",
        do: "칠판에 그 문장만 쓴다. again 에 동그라미를 치게 한다.",
        exp: "Again — it means they already looked once.",
        stuck: "\"If I say 'let's look AGAIN,' how many times did we look before?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / So: they learned about the ways of the Ninja — Wanted·But·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Where do they go?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, But, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Ninja Master)", min: "",
        say: "Stop at The Ninja Master. Don't just say he is a ninja — tell me what MASTER means.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "A master is so good at something that he can teach it to someone else.",
        stuck: "\"Who is a master in your life? Who taught you something you could not do before?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Learn from a master, or work it out by yourself? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think from a master, because Jack and Annie learned the ways of the Ninja in one night.",
        stuck: "손을 들게 한다. \"From a master? Or by yourself?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say you remember more when you try by yourself, but that takes much longer.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about ninjas?", ko: "닌자에 대해 이미 아는 게 있니?" },
        { en: "Would you rather travel to the past or to the future?", ko: "과거로 갈래, 미래로 갈래?" },
        { en: "The first line is Annie saying \"Let's look again.\" What do you think they are looking for?", ko: "첫 문장에서 애니가 \"다시 보자\"고 해. 둘은 무엇을 찾고 있을까?" }
      ],
      during: [
        { en: "What do you think a ninja master would teach two children?", ko: "닌자 사범은 아이 둘에게 무엇을 가르쳐 줄까?" },
        { en: "Which of the ways of the Ninja would be hardest to learn?", ko: "닌자의 방식 중에 배우기 가장 어려운 건 뭘까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did the ninja master turn out the way you expected?", ko: "닌자 사범은 네가 생각한 그런 사람이었니?" },
        { en: "Where should the tree house go next, and why?", ko: "나무 집은 다음에 어디로 가야 할까? 왜?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Ninja Master' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 이야기가 없으면 근거가 아니다." }
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
    scene: "잭과 애니가 마법 나무집을 타고 옛 일본으로 가서 닌자 사범을 만나는 이야기",
    text: "\"[[Let us|Let's]] look [[one more time|again]], Jack,\" said Annie. Then the [[wonderful|magic]] tree house [[carries|whisks]] Jack and Annie back in time. It takes them to [[very old|ancient]] Japan. There the [[brother and sister|siblings]] [[meet|encounter]] a ninja [[teacher|master]]. They learn about the [[habits|ways]] of the Ninja. What happens after that? Open the book and find out."
  }
};
