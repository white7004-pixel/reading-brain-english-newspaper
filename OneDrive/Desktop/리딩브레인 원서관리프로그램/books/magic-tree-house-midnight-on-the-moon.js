// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 2.8)
// Midnight on the Moon (Magic Tree House #8) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3254.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 두 아이를 미래의 달 기지(a moon base)로 데려간다 /
//   두 아이는 네 번째 물건(the fourth thing)을 찾아야 한다 /
//   그 물건으로 친구 Morgan 을 마법의 주문(a magician's spell)에서 풀어 준다 /
//   책의 첫 문장은 "Jack!" whispered a voice.
// 근거가 말하지 않아 한 줄도 쓰지 않은 것:
//   Morgan 이 누구인지 · 앞 권에서 무슨 일이 있었는지 · 나머지 세 물건이 무엇인지 ·
//   네 번째 물건이 무엇인지 · 두 아이의 나이와 손위손아래 · 결말.
// 그 빈자리는 아이에게 묻는 물음으로 바꾸어 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3254",
  slug: "magic-tree-house-midnight-on-the-moon",
  title: "Midnight on the Moon",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #8",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권(AR 2.9)이 정독 1단계라 그에 맞췄다.
  level: { ar: "2.8", lexile: "490L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/423894-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3254 요약 + 오픈라이브러리 /works/OL81792W (소개글 · 첫 문장 \"Jack!\" whispered a voice. · 주제어 Magic/Science fiction/Time travel/Tree houses · 장소 Moon · 76쪽 · 1996년)",
    characters: ["Jack", "Annie", "Morgan"],
    beats: [
      "the magic tree house takes Jack and Annie to a moon base in the future",
      "there they search for the fourth thing they need",
      "that fourth thing is what will free their friend Morgan from a magician's spell"
    ],
    ending: "근거에 결말이 없다. 요약도 소개글도 \"네 번째 물건을 찾아야 한다\"는 데서 멈추고, 두 아이가 그것을 찾았는지·그 물건이 무엇인지·Morgan 이 풀려났는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"a moon base in the future\", \"the fourth thing\", \"free their friend Morgan from the magic spell\")과 소개글(\"a moon base in the future\", \"the fourth thing\", \"free their friend Morgan from the magician's spell\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(주문을 건 이가 magician 이라는 것 · \"continue to search\" 즉 찾는 일이 앞서부터 이어진다는 것)은 요약과 부딪히지 않아 남겼다. 주제어 Magic/Science fiction/Time travel/Tree houses 와 장소 Moon 이 같은 것을 가리켜 한 번 더 받쳐 주었다. Morgan 이 누구인지·나머지 세 물건·네 번째 물건의 정체·두 아이의 나이는 어느 출처도 말하지 않아 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Midnight on the Moon\" read aloud",
    searchUrl: "https://youtu.be/BliXbs4EVy8",
    videos: [
      { url: "https://youtu.be/BliXbs4EVy8", title: "Midnight on the Moon - Magic Tree House 8 - Audiobook",
        channel: "Triple A English 👏", views: "3,137", length: "44:06" },
      { url: "https://youtu.be/uptHYkTi7MM", title: "[영어 원서] 매직 트리 하우스 8권 읽기 챕터 1 - 5 🌳 Magic Tree House - 8. Midnight on the Moon #매트하 #MTH",
        channel: "올리비아Olivia", views: "5,058", length: "27:55" },
      { url: "https://youtu.be/SNiImo7kurA", title: "Magic Tree House | #8 Midnight on the Moon | MARY POPE OSBORNE | New York Times Bestselling Series",
        channel: "EUNICE books and words", views: "20,579", length: "43:13" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "moon",     pos: "n.",   en: "the big round thing that shines in the night sky and goes around the earth", ko: "달",
      ex: "The tree house takes them to the {{moon}}.", ex_ko: "나무 집이 그들을 달로 데려가요.", pic: "🌙" },
    { word: "base",     pos: "n.",   en: "a place where people live and work, built far from home", ko: "기지",
      ex: "Jack and Annie go to a moon {{base}}.", ex_ko: "잭과 애니는 달 기지로 가요.", pic: "🏗️" },
    { word: "future",   pos: "n.",   en: "the time that has not come yet", ko: "미래, 앞날",
      ex: "The moon base is in the {{future}}.", ex_ko: "그 달 기지는 미래에 있어요.", pic: "🚀" },
    { word: "magic",    pos: "adj.", en: "using powers that seem impossible or mysterious", ko: "마법의, 신기한",
      ex: "They travel in a {{magic}} tree house.", ex_ko: "그들은 마법의 나무 집을 타고 가요.", pic: "✨" },
    { word: "spell",    pos: "n.",   en: "magic words that hold someone or change them", ko: "주문, 마법",
      ex: "Morgan is held by a {{spell}}.", ex_ko: "모건은 주문에 걸려 있어요.", pic: "🪄" },
    { word: "magician", pos: "n.",   en: "a person who uses magic", ko: "마법사",
      ex: "A {{magician}} put the spell on Morgan.", ex_ko: "어떤 마법사가 모건에게 주문을 걸었어요.", pic: "🧙" },
    { word: "free",     pos: "v.",   en: "to let someone out, so they are not held any more", ko: "풀어 주다, 자유롭게 하다",
      ex: "Jack and Annie want to {{free}} their friend.", ex_ko: "잭과 애니는 친구를 풀어 주고 싶어 해요.", pic: "🕊️" },
    { word: "search",   pos: "v.",   en: "to look carefully for something you need", ko: "찾다, 뒤지다",
      ex: "They {{search}} for the fourth thing.", ex_ko: "그들은 네 번째 물건을 찾아요.", pic: "🔎" },
    { word: "whisper",  pos: "v.",   en: "to speak in a very quiet voice", ko: "속삭이다",
      ex: "At the start of the book, a voice {{whispers}} Jack's name.", ex_ko: "책이 시작할 때 어떤 목소리가 잭의 이름을 속삭여요.", pic: "🤫" },
    { word: "voice",    pos: "n.",   en: "the sound a person makes when speaking or singing", ko: "목소리",
      ex: "A {{voice}} calls Jack's name at the start of the book.", ex_ko: "책이 시작할 때 어떤 목소리가 잭의 이름을 불러요.", pic: "🗣️" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // "Jack!" whispered a voice. 만은 책의 첫 문장이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Ordinal numbers", ko: "순서를 나타내는 수",
        sent: "Jack and Annie must find the [[fourth]] thing, not the [[four]] things.",
        why_ko: "개수는 one, two, three, four. 순서는 first, second, third, fourth 예요. '네 개'가 아니라 '네 번째'일 때 fourth 를 써요.",
        why: "Use first, second, third, fourth for order — not one, two, three, four.",
        try: "This is my {{first}} book and my {{fourth}} pencil." },
      { name: "need to + 동사원형", ko: "~해야 한다",
        sent: "They [[need to find]] the fourth thing, and they [[need to free]] Morgan.",
        why_ko: "need 다음에는 to + 동사원형이 와요. need find(X), need to find(O). 시험에 자주 나오는 자리예요.",
        why: "After \"need\" use \"to\" and then the plain verb: need to find, need to free.",
        try: "I {{need to read}} this book, and I {{need to write}} my name." },
      { name: "\"...\" + 말한 동사 + 주어", ko: "대사 뒤에 오는 말",
        sent: "The book begins, \"Jack!\" [[whispered]] a voice. — 말한 사람이 [[a voice]] 예요.",
        why_ko: "대사를 따옴표 안에 쓰고, 그 뒤에 '어떻게 말했는지'와 '누가 말했는지'를 붙여요. 여기서는 whispered(속삭였다) + a voice(어떤 목소리가).",
        why: "Put the speech in quotation marks, then the speaking verb, then who spoke.",
        try: "\"Come here!\" {{shouted}} my friend." }
    ],
    find: "책에서 따옴표(\" \")로 된 대사를 세 개 찾아 쓰세요. · Find three lines of speech in quotation marks.",
    exam: {
      choose: [
        { q: "Jack and Annie need (find / to find) the fourth thing.", a: "to find",
          why_ko: "need 다음에는 to + 동사원형이에요. need to find 가 맞아요." },
        { q: "This is the (four / fourth) thing they need.", a: "fourth",
          why_ko: "개수가 아니라 순서를 말하고 있어요. 네 번째는 fourth." },
        { q: "\"Jack!\" (whisper / whispered) a voice.", a: "whispered",
          why_ko: "책의 첫 문장이에요. 이미 일어난 일이니 과거형 whispered." },
        { q: "They need (to free / to frees) their friend Morgan.", a: "to free",
          why_ko: "to 다음에는 언제나 동사원형이에요. to frees 는 없는 꼴이에요." },
        { q: "Book #8 comes right after the (seven / seventh) book.", a: "seventh",
          why_ko: "순서를 말하니 seventh 예요. seven 은 '일곱 개'라는 뜻이에요." }
      ],
      fix: [
        { q: "Jack and Annie need [[finding]] the fourth thing.", a: "to find",
          why_ko: "need 뒤에는 to + 동사원형이에요. finding 이 아니라 to find." },
        { q: "They look for the [[four]] thing they need.", a: "fourth",
          why_ko: "'네 번째 물건'이니 순서를 나타내는 fourth 로 고쳐요." },
        { q: "\"Jack!\" [[whisper]] a voice.", a: "whispered",
          why_ko: "이야기 속에서 이미 일어난 일이에요. 과거형 whispered 가 맞아요." }
      ],
      write: [
        { ko: "그들은 네 번째 물건을 찾아야 한다.", cond: "need to, fourth", a: "They need to find the fourth thing.",
          why_ko: "'~해야 한다'는 need to + 동사원형. '네 번째'는 fourth 예요." },
        { ko: "\"잭!\" 하고 어떤 목소리가 속삭였다.", cond: "whispered, a voice", a: "\"Jack!\" whispered a voice.",
          why_ko: "따옴표 안에 대사를 쓰고, 그 뒤에 whispered + a voice 를 붙여요. 이것이 이 책의 첫 문장이에요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Where does the magic tree house take Jack and Annie?",
      frame: "It takes them to {{a moon base}}, in {{the future}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What are Jack and Annie trying to find there?",
      frame: "They are trying to find {{the fourth thing they need}}." },
    { ref: "책 전체", skill: "사실찾기", q: "Why do they need it? Who are they trying to help?",
      frame: "They want to free their friend {{Morgan}} from {{a magician's spell}}." },
    { ref: "책 첫 문장", skill: "어휘", q: "The book begins, \"Jack!\" whispered a voice. What does the word \"whispered\" tell you about how that voice spoke?",
      frame: "It tells me the voice was {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "추론·예측", q: "Our information never says what the fourth thing is. What do you think it might be? Say why.",
      frame: "I think it might be {{                    }}, because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Jack and Annie go all the way to a moon base to help a friend. What is the hardest thing you would do for a friend?",
      frame: "I would {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a magician", "Two moon scientists"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약과 소개글이 둘 다 \"Jack and Annie\" 라고 말해요. 모건은 함께 가는 아이가 아니라 도우려는 친구예요.",
      why: "Jack and Annie. Both the catalog summary and the description name them." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To a moon base", "To a castle", "To a jungle", "To a ship at sea"], c: 0,
      why_ko: "달 기지(a moon base)예요. 소개글과 요약이 둘 다 그렇게 말하고, 오픈라이브러리 장소 목록에도 Moon 이 있어요.",
      why: "A moon base. Both sources say so, and \"Moon\" is listed as the place." },
    { q: "What time do they travel to?",
      a: ["Long ago", "The future", "Last week", "The Middle Ages"], c: 1,
      why_ko: "미래예요. \"a moon base in the future\" 라고 두 출처가 똑같이 적고 있어요.",
      why: "The future — \"a moon base in the future.\"" },
    { q: "What carries Jack and Annie there?",
      a: ["A rocket they build", "The magic tree house", "A magic carpet", "A moon car"], c: 1,
      why_ko: "마법의 나무 집이에요. 로켓도 양탄자도 아니에요. 주제어 목록에도 Tree houses 가 있어요.",
      why: "The magic tree house. \"Tree houses\" is one of the listed subjects." },
    { q: "What are Jack and Annie searching for?",
      a: ["The fourth thing they need", "A new tree house", "A map of the moon", "A magician's hat"], c: 0,
      why_ko: "네 번째 물건이에요. 요약과 소개글이 똑같이 \"the fourth thing\" 이라고 말해요.",
      why: "The fourth thing they need — both sources use those words." },
    { q: "Who are they trying to help?",
      a: ["Their teacher", "Their friend Morgan", "A moon scientist", "The magician"], c: 1,
      why_ko: "친구 모건이에요. 두 출처 모두 \"their friend Morgan\" 이라고 적어요. 모건이 누구인지까지는 말해 주지 않아요.",
      why: "Their friend Morgan. Both sources say \"their friend Morgan.\"" },
    { q: "What is holding Morgan?",
      a: ["A locked door", "A spell", "A deep hole", "A long journey"], c: 1,
      why_ko: "주문(spell)이에요. 요약은 \"the magic spell\", 소개글은 \"the magician's spell\" 이라고 해요.",
      why: "A spell — \"the magic spell\" / \"the magician's spell.\"" },
    { q: "Who put that spell on Morgan, according to our information?",
      a: ["A magician", "A knight", "A king", "A robot"], c: 0,
      why_ko: "마법사예요. 오픈라이브러리 소개글이 \"the magician's spell\" 이라고 적어요. 기사도 왕도 로봇도 어느 출처에도 없어요.",
      why: "A magician — the description says \"the magician's spell.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#6", "#8", "#10"], c: 2,
      why_ko: "8권이에요. 장서 목록 제목이 \"#08. Midnight on the Moon\" 이고 요약 끝에도 Book #8 이라고 적혀 있어요.",
      why: "Book #8 — the catalog title is \"#08. Midnight on the Moon.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack!\" whispered a voice.", "Jack couldn't sleep.", "The moon was very bright.", "Annie ran to the tree house."], c: 0,
      why_ko: "첫 문장은 \"Jack!\" whispered a voice. 예요. 오픈라이브러리에 그대로 적혀 있어요. 어떤 목소리가 잭을 부르며 이야기가 시작돼요.",
      why: "\"Jack!\" whispered a voice. That is the recorded first line." },
    { q: "In that first sentence, what does \"whispered\" mean?",
      a: ["Shouted very loudly", "Spoke in a very quiet voice", "Sang a song", "Laughed out loud"], c: 1,
      why_ko: "속삭였다는 뜻이에요. 아주 작은 소리로 말하는 거예요. 소리를 지른 것도, 노래한 것도, 웃은 것도 아니에요.",
      why: "To whisper is to speak very quietly — not shout, sing or laugh." },
    { q: "Our sources list this book's subjects. Which one is on that list?",
      a: ["Science fiction", "Cooking", "Sports", "Poetry"], c: 0,
      why_ko: "Science fiction 이에요. 주제어 목록에 Magic · Science fiction · Time travel · Tree houses 가 있어요. 요리도 운동도 시도 없어요.",
      why: "Science fiction. The subject list has Magic, Science fiction, Time travel, Tree houses." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where the tree house takes them", "Who they want to free", "What the fourth thing is", "Who wrote the book"], c: 2,
      why_ko: "네 번째 물건이 무엇인지예요. 우리 자료는 \"네 번째 물건을 찾아야 한다\" 에서 멈춰요. 그게 무엇인지는 책을 읽어야 알 수 있어요.",
      why: "What the fourth thing is. Our sources stop at \"the fourth thing they need\" — read the book to find out." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to find the fourth thing that frees their friend Morgan}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{they searched a moon base in the future}}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "Jack and Annie use the magic tree house.",
        frame: "It takes them to {{a moon base}}, in {{the future}}." },
      { label: "The Moon Base",
        given: "",
        frame: "There they {{search}} for something they need." },
      { label: "The Fourth Thing",
        given: "",
        frame: "They are looking for the {{fourth}} thing, and it will {{free}} their friend Morgan from a spell." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Midnight on the Moon",
    branches: [
      { label: "Jack and Annie", ask: "What do Jack and Annie have to do in this book?",
        deeper: "Why do you think two children — and not grown-ups — are the ones sent to do it?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie?",
        deeper: "Why do you think a tree house, and not a rocket, is what carries them to the moon?" },
      { label: "The Moon Base",  ask: "What do you expect to find at a base on the moon?",
        deeper: "Our sources say the base is in the future. What would be different there from today?" },
      { label: "The Fourth Thing", ask: "Our sources never say what the fourth thing is. What could it be?",
        deeper: "Why do you think the story makes them collect things one by one instead of all at once?" },
      { label: "Morgan",         ask: "All we are told is that Morgan is their friend, held by a spell. What else would you like to know about Morgan?",
        deeper: "Write down your question, then read the book and see if it answers you." },
      { label: "Me",             ask: "What would you carry with you to a moon base?",
        deeper: "What would you be most careful about there, and why?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Friendship", "Searching", "The Future"],
    globalContext: "Orientation in space and time — 아주 먼 곳과 아직 오지 않은 때는 지금 여기와 어떻게 다른가",
    statement: "People will go a very long way — even into the future — to free a friend.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What are they searching for there?",
      "Who are they trying to free, and from what?"
    ],
    conceptual: [
      "Why would a base on the moon feel so different from home?",
      "Why do people keep searching for something even when it takes a long time?"
    ],
    debatable: [
      "Should you go somewhere dangerous to help a friend?",
      "Is it better to know what you are looking for, or to go and find out?"
    ],
    learnerProfile: ["Inquirer", "Caring", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "친구 Morgan 을 풀어 줄 네 번째 물건을 찾아야 한다" 까지만 말한다.
    // 그 일이 얼마나 위험했는지는 적혀 있지 않으므로, 판단을 아이에게 맡기는 물음으로 세웠다.
    prompt: "Jack and Annie travel to a moon base in the future to find the one thing that will free their friend. Should you go somewhere far and strange to help a friend? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Going Far for a Friend", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think you should go far to help a friend who needs you.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie go to a moon base in the future to find one thing.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they cared more about Morgan than about how far it was.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a strange place is too risky, but a friend under a spell cannot wait.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe helping a friend is worth the journey.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to a moon base in the future to search for the fourth thing that will free their friend Morgan, then take a side on going far to help a friend.",
      ko: "마법의 나무 집이 잭과 애니를 미래의 달 기지로 데려가고, 두 아이가 친구 모건을 주문에서 풀어 줄 네 번째 물건을 찾는 흐름을 말하고, 친구를 돕기 위해 먼 곳까지 가는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "If the magic tree house took you to the moon tonight, what would you pack?",
        do: "책을 펴기 전에 한다. 달과 미래를 아이 입에서 먼저 꺼내야 이 책이 읽힌다. 서너 명만.",
        exp: "I would pack water. / I would pack a camera.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would pack my warm coat.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Midnight on the Moon.\" What is midnight? What is the moon like at midnight?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Midnight is twelve at night. The moon is dark and quiet.",
        stuck: "표지를 가리킨다. \"Look at the cover. What do you see?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "기지 → base / 주문 → spell / 속삭이다 → whisper",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does the tree house take them...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to a moon base, in the future.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence is four words: \"Jack!\" whispered a voice. Who is speaking? We are not told.",
        do: "칠판에 그 네 낱말만 쓴다. 첫 문장부터 모르는 것이 있다는 걸 보게 한다.",
        exp: "Someone quiet. / Someone who does not want to be heard.",
        stuck: "\"Why would a person whisper instead of shout? When do YOU whisper?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: the fourth thing, to free Morgan — But·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they looking for?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Two boxes are empty: But, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those two boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Fourth Thing)", min: "",
        say: "Stop at The Fourth Thing. Our information never says what it is. So guess — and tell me WHY you guessed that.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 답이 아니라 까닭을 받는다.",
        exp: "Maybe it is something from the moon, because that is where they are sent.",
        stuck: "\"You gave me an answer. Now give me the reason behind it.\"" },

      { stage: "Mind Map (Morgan)", min: "",
        say: "We know only three words about Morgan: their friend Morgan. Write one question you want to ask about Morgan.",
        do: "모르는 것을 물음으로 바꾸는 연습이다. 지어내지 않고 묻는다는 것을 몸에 익힌다.",
        exp: "Who is Morgan? / How did Morgan get the spell?",
        stuck: "\"What is the first thing you would ask if Morgan sat here?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should you go somewhere dangerous to help a friend? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Morgan could not get free alone.",
        stuck: "손을 들게 한다. \"Go and help? Or stay home safe?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say the moon is too dangerous for children, but their friend was waiting.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about the moon?", ko: "달에 대해 이미 아는 게 있니?" },
        { en: "Would you rather travel to the past or to the future?", ko: "과거로 갈래, 미래로 갈래?" },
        { en: "The title says midnight. Why midnight and not noon?", ko: "제목은 왜 한낮이 아니라 자정일까?" }
      ],
      during: [
        { en: "What do you think the fourth thing is?", ko: "네 번째 물건은 무엇일 것 같니?" },
        { en: "Who do you think whispered Jack's name at the very start?", ko: "맨 처음에 잭의 이름을 속삭인 건 누구일까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was the fourth thing? Were you close?", ko: "네 번째 물건은 무엇이었니? 네 짐작과 가까웠니?" },
        { en: "Now that you have read it, who is Morgan?", ko: "다 읽고 나서, 모건은 누구였니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·Then 두 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Fourth Thing' 가지에서 반드시 멈춘다. 짐작에 까닭을 붙이게 한다.", miss: "선생님이 답을 안다는 듯 말해 버린다. 우리도 모른다고 그대로 말한다." },
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
    scene: "잭과 애니가 마법 나무집을 타고 미래의 달 기지로 가서 네 번째 물건을 찾는 이야기",
    text: "\"Jack!\" [[said very quietly|whispered]] a [[speaking sound|voice]]. Then the magic tree house took Jack and Annie to a [[station on the moon|moon base]], far away in the [[time to come|future]]. There the two children had to [[look hard|search]] for the [[number four|fourth]] thing they needed. That thing would [[let go|free]] their friend Morgan from a [[magician's magic words|spell]]. Did they find it? Open the book and see."
  }
};
