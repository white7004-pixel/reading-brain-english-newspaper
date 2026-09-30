// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.0)
// Ghost Town at Sundown (Magic Tree House #10) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3255.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 서부(the wild west)로 보낸다 /
//   1895년, Rattlesnake Flats 라는 마을 / 유령 하나 · 소도둑들 · 자리를 잘못 찾은 카우보이를
//   마주친다 / 그 모두가 모건(Morgan)의 수수께끼에 답을 찾는 길이다 /
//   책의 첫 문장은 "Jack and Annie were sitting on the porch of their house."
// 수수께끼의 답도, 결말도 근거가 말하지 않는다. 장서 요약은 "수수께끼를 풀려 한다"에서,
// 소개글은 "in the search to answer..."에서 끊긴다. 그래서 비워 두었다.
// 2권과 달리 이 책의 근거는 두 아이의 나이도, 누가 손위인지도 말하지 않는다. 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3255",
  slug: "magic-tree-house-ghost-town-at-sundown",
  title: "Ghost Town at Sundown",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #10",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권(AR 2.9)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.0", lexile: "510L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424008-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3255 요약 + 오픈라이브러리 /works/OL81779W (소개글 · 첫 문장 \"Jack and Annie were sitting on the porch of their house.\" · 주제어 Tree houses/Frontier and pioneer life/Magic/Time travel/West (U.S.)/Western stories · 78쪽 · 1997년)",
    characters: ["Jack", "Annie", "a ghost", "some rustlers", "a misplaced cowboy"],
    beats: [
      "the magic tree house sends Jack and Annie back to the wild west",
      "they are headed to Rattlesnake Flats, 1895, where they come face-to-face with a ghost, some rustlers, and a misplaced cowboy",
      "all of it is part of their search to answer Morgan's latest riddle, and they meet excitement and danger on the way"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"수수께끼를 풀려 한다(try to solve a riddle)\"에서 멈추고, 소개글은 \"in the search to answer Morgan's latest riddle\"에서 끊긴다. 수수께끼의 답이 무엇인지, 두 아이가 그것을 풀었는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"the wild west\", \"the magic tree house\", \"solve a riddle\", \"excitement and danger\")과 소개글(\"Rattlesnake Flats, 1895\", \"a ghost, some rustlers, and a misplaced cowboy\", \"Morgan's latest riddle\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(마을 이름 · 해 · 마주치는 셋 · 모건의 수수께끼)은 요약과 부딪히지 않아 남겼다. 주제어 Tree houses/Time travel/West (U.S.)/Western stories/Frontier and pioneer life 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 주제어 목록에 지명 Laramie 와 사람 이름 Slim Cooley 가 있으나, 두 아이가 거기 가는지·그가 누구인지는 어느 출처도 말하지 않아 학습지 어디에도 쓰지 않았다. 2권 소개글과 달리 이 책 근거는 나이와 손위손아래를 말하지 않아 '여동생' 같은 말도 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Ghost Town at Sundown\" read aloud",
    searchUrl: "https://youtu.be/aNopDoS70mY",
    videos: [
      { url: "https://youtu.be/aNopDoS70mY", title: "Magic Tree House No. 10 \"Ghost Town at Sundown\" By Mary Pope Osborne",
        channel: "Reisom Resources", views: "7,667", length: "46:20" },
      { url: "https://youtu.be/uAliNb0cvbo", title: "Magic Tree House | #10 Ghost Town at Sundown | MARY POPE OSBORNE | New York Times Bestselling Series",
        channel: "EUNICE books and words", views: "17,213", length: "44:34" },
      { url: "https://youtu.be/SjdvC5lQ8AY", title: "Magic Treehouse Book 10 Ghost Town at Sundown",
        channel: "Koma Audiobooks", views: "12,386", length: "33:11" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "ghost",     pos: "n.",   en: "the spirit of a dead person that some people believe they can see", ko: "유령",
      ex: "Jack and Annie come face-to-face with a {{ghost}}.", ex_ko: "잭과 애니는 유령과 마주쳐요.", pic: "👻" },
    { word: "sundown",   pos: "n.",   en: "the time in the evening when the sun goes down", ko: "해질녘, 일몰",
      ex: "The title of this book is \"Ghost Town at {{sundown}}.\"", ex_ko: "이 책의 제목은 '해질녘의 유령 마을'이에요.", pic: "🌇" },
    { word: "riddle",    pos: "n.",   en: "a puzzling question that you have to think hard to answer", ko: "수수께끼",
      ex: "They try to solve a {{riddle}} from Morgan.", ex_ko: "그들은 모건의 수수께끼를 풀려고 해요.", pic: "❓" },
    { word: "solve",     pos: "v.",   en: "to find the answer to a problem or a puzzle", ko: "풀다, 해결하다",
      ex: "The children try to {{solve}} a riddle.", ex_ko: "아이들은 수수께끼를 풀려고 합니다.", pic: "🔑" },
    { word: "rustler",   pos: "n.",   en: "a person who steals cattle or horses", ko: "소도둑",
      ex: "Some {{rustlers}} appear in this story.", ex_ko: "이 이야기에는 소도둑들이 나와요.", pic: "🐄" },
    { word: "cowboy",    pos: "n.",   en: "a person who rides a horse and looks after cattle in the American West", ko: "카우보이",
      ex: "They meet a misplaced {{cowboy}}.", ex_ko: "그들은 자리를 잘못 찾은 카우보이를 만나요.", pic: "🤠" },
    { word: "west",      pos: "n.",   en: "the direction where the sun goes down; in this book, the old American West", ko: "서쪽, 서부",
      ex: "The tree house sends them to the wild {{west}}.", ex_ko: "나무 집은 그들을 서부로 보냅니다.", pic: "🌵" },
    { word: "frontier",  pos: "n.",   en: "the far edge of a settled land, where few people have lived yet", ko: "변경, 개척지",
      ex: "This story happens on the American {{frontier}}.", ex_ko: "이 이야기는 미국 개척지에서 펼쳐져요.", pic: "🏜️" },
    { word: "danger",    pos: "n.",   en: "the chance that something bad or harmful may happen", ko: "위험",
      ex: "Jack and Annie meet excitement and {{danger}}.", ex_ko: "잭과 애니는 신나는 일과 위험을 함께 겪어요.", pic: "⚠️" },
    { word: "porch",     pos: "n.",   en: "a covered floor built onto the front of a house", ko: "현관, 앞마루",
      ex: "At the start of the book, Jack and Annie sat on the {{porch}}.", ex_ko: "책이 시작할 때 잭과 애니는 현관에 앉아 있었어요.", pic: "🏠" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // were sitting 만은 책의 첫 문장("Jack and Annie were sitting on the porch of their house.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure in [[a]] ghost town.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a ghost town.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} cowboy and {{an}} old horse." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] to 1895 and [[wanted]] to answer a riddle.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, want → wanted.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "was / were + -ing", ko: "과거진행형",
        sent: "The book begins, \"Jack and Annie [[were sitting]] on the porch of their house.\"",
        why_ko: "'그때 ~하고 있었다'는 was/were + 동사-ing 예요. 주어가 둘이면 were! Jack and Annie → were sitting.",
        why: "Use was/were + verb-ing for what was going on at that moment. Two people take \"were.\"",
        try: "I {{was reading}} a book while my friends {{were playing}} outside." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Rattlesnake Flats is (a / an) ghost town.", a: "a",
          why_ko: "ghost 는 '고'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie had (a / an) adventure in 1895.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "Jack and Annie (travel / traveled) back to 1895.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "They (want / wanted) to answer Morgan's riddle.", a: "wanted",
          why_ko: "지난 일이에요. want 에 -ed 를 붙여 wanted!" },
        { q: "Jack and Annie (was / were) sitting on the porch.", a: "were",
          why_ko: "Jack and Annie 는 두 사람, 복수예요. 복수 주어의 과거 be동사는 were." }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] to Rattlesnake Flats in 1895.", a: "traveled",
          why_ko: "1895년은 한참 지난 일이에요. 과거형 traveled 로 고쳐요." },
        { q: "The magic tree house [[send]] them to the wild west.", a: "sent",
          why_ko: "send 는 불규칙 동사예요. 과거형은 sended 가 아니라 sent!" },
        { q: "Jack and Annie [[was]] sitting on the porch of their house.", a: "were",
          why_ko: "주어가 둘이니 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "잭과 애니는 현관에 앉아 있었다.", cond: "were, sit", a: "Jack and Annie were sitting on the porch.",
          why_ko: "'앉아 있었다'는 were + sitting 이에요. sit 은 t 를 하나 더 붙여 sitting." },
        { ko: "그들은 수수께끼를 풀려고 했다.", cond: "try, solve, 과거형", a: "They tried to solve a riddle.",
          why_ko: "try 는 y 를 i 로 바꿔 tried. 뒤에는 to + 동사원형 solve 가 와요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what sends them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} sends them back." },
    { ref: "책 전체", skill: "사실찾기", q: "What town are Jack and Annie headed to, and in what year?",
      frame: "They are headed to {{Rattlesnake Flats}}, in {{1895}}." },
    { ref: "책 전체", skill: "사실찾기", q: "Name the three things Jack and Annie come face-to-face with.",
      frame: "They meet {{a ghost}}, {{some rustlers}}, and {{a misplaced cowboy}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Ghost Town at Sundown.\" What does \"sundown\" mean, and why might a ghost town feel different then?",
      frame: "Sundown means {{when the sun goes down}}. I think a ghost town feels {{                    }} then." },
    { ref: "책 전체", skill: "주제·요점", q: "Everything Jack and Annie do is part of their search to answer Morgan's riddle. In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "책 전체", skill: "추론·예측", q: "The cowboy is called \"misplaced.\" What do you think that word tells us about him?",
      frame: "I think it tells us {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If you had to walk into a ghost town at sundown to answer a riddle, would you go? Say why.",
      frame: "I {{would / would not}} go, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a cowboy", "Two rustlers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"sends Jack and Annie back to the wild west\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["A magic tree house", "A train", "A horse", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 기차도 말도 기계도 아니에요. 주제어 목록에도 Tree houses 와 Time travel 이 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Time travel\" are both listed subjects." },
    { q: "Where does the magic tree house send Jack and Annie?",
      a: ["To the wild west", "To the Middle Ages", "To ancient Egypt", "To the moon"], c: 0,
      why_ko: "서부(the wild west)예요. 중세는 2권이고, 이 책은 카우보이와 개척지의 시대예요.",
      why: "The wild west. The Middle Ages was book #2; this one is the American West." },
    { q: "What is the name of the town Jack and Annie are headed to?",
      a: ["Rattlesnake Flats", "Sundown City", "Ghost Hollow", "Cactus Creek"], c: 0,
      why_ko: "Rattlesnake Flats 예요. 출판사 소개글이 \"headed to Rattlesnake Flats, 1895\" 라고 적고 있어요.",
      why: "Rattlesnake Flats — the description says \"headed to Rattlesnake Flats, 1895.\"" },
    { q: "In what year does this story take place?",
      a: ["1776", "1895", "1950", "1997"], c: 1,
      why_ko: "1895년이에요. 1997년은 이 책이 나온 해지, 이야기가 일어난 해가 아니에요.",
      why: "1895. 1997 is the year the book was published, not the year of the story." },
    { q: "Which three do Jack and Annie come face-to-face with?",
      a: ["A ghost, some rustlers, and a misplaced cowboy", "A knight, a king, and a horse", "A pirate, a parrot, and a ship", "A dinosaur, a cave, and a volcano"], c: 0,
      why_ko: "유령 · 소도둑들 · 자리를 잘못 찾은 카우보이, 이 셋이에요. 소개글이 셋을 나란히 적어 두었어요.",
      why: "A ghost, some rustlers, and a misplaced cowboy — the description lists exactly these three." },
    { q: "Whose riddle are Jack and Annie trying to answer?",
      a: ["Jack's", "Annie's", "Morgan's", "The cowboy's"], c: 2,
      why_ko: "모건(Morgan)의 수수께끼예요. 소개글이 \"Morgan's latest riddle\" 이라고 말해요.",
      why: "Morgan's. The description says \"Morgan's latest riddle.\"" },
    { q: "What does the word \"sundown\" in the title mean?",
      a: ["The time when the sun goes down", "The middle of the night", "Early morning", "The middle of the day"], c: 0,
      why_ko: "sundown 은 해가 지는 저녁 무렵이에요. 제목 Ghost Town at Sundown 은 '해질녘의 유령 마을' 이라는 뜻이에요.",
      why: "Sundown is the time the sun goes down. The title means \"a ghost town at sunset.\"" },
    { q: "What is a \"rustler\"?",
      a: ["Someone who steals cattle", "A kind of horse", "A train driver", "The leader of a town"], c: 0,
      why_ko: "rustler 는 소나 말을 훔치는 사람, 곧 소도둑이에요. 서부 이야기에 자주 나오는 말이에요.",
      why: "A rustler is a person who steals cattle or horses — a common figure in western stories." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack and Annie were sitting on the porch of their house.\"", "\"Jack couldn't sleep.\"", "\"The town was empty.\"", "\"Annie ran down the road.\""], c: 0,
      why_ko: "첫 문장은 \"Jack and Annie were sitting on the porch of their house.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. \"Jack couldn't sleep.\" 은 2권의 첫 문장이에요.",
      why: "That is the recorded first line. \"Jack couldn't sleep.\" opens book #2, not this one." },
    { q: "Which word does the description use for the cowboy?",
      a: ["Misplaced", "Angry", "Famous", "Sleepy"], c: 0,
      why_ko: "소개글이 고른 낱말이 바로 misplaced 예요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The description's own word is \"misplaced.\" The other three appear nowhere in our sources." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#5", "#10", "#20"], c: 2,
      why_ko: "10권이에요. 장서 목록 제목이 \"#10. Ghost Town at Sundown\" 이고 요약 끝에도 Book #10 이라고 적혀 있어요.",
      why: "Book #10 — the catalog title is \"#10. Ghost Town at Sundown.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "Who they meet there", "The answer to Morgan's riddle", "What year the story happens"], c: 2,
      why_ko: "수수께끼의 답이에요. 우리가 가진 글은 '수수께끼에 답을 찾는 길' 에서 멈춰요. 답이 무엇인지는 책을 읽어야 알 수 있어요.",
      why: "The answer to the riddle. Our sources stop at \"in the search to answer Morgan's latest riddle.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Rattlesnake Flats, in the wild west}}", time: "{{1895}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to answer Morgan's riddle}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house sends Jack and Annie back in time.",
        frame: "They go to {{the wild west}}, to a town called {{Rattlesnake Flats}}, in {{1895}}." },
      { label: "The Ghost Town",
        given: "",
        frame: "There they come face-to-face with {{a ghost}}, {{some rustlers}}, and {{a misplaced cowboy}}." },
      { label: "The Riddle",
        given: "",
        frame: "All of it is part of their search to answer {{Morgan's}} riddle." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Ghost Town at Sundown",
    branches: [
      { label: "Jack & Annie",   ask: "The book opens with Jack and Annie sitting on their porch. What are they doing right before the adventure starts?",
        deeper: "Why do you think an adventure so often begins on an ordinary, quiet day?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose the wild west of 1895 for them?" },
      { label: "The Ghost Town", ask: "What do you expect a town to look like when people have left it?",
        deeper: "Why would an empty town feel much stranger at sundown than at noon?" },
      { label: "The Ghost",      ask: "Jack and Annie come face-to-face with a ghost. How would you feel at that moment?",
        deeper: "Is something frightening always something dangerous? Say why." },
      { label: "The Riddle",     ask: "Everything they do is part of a search to answer Morgan's riddle. What makes a riddle hard?",
        deeper: "Why do you think the story makes them travel to find an answer, instead of just telling them?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for the wild west? Why or why not?",
        deeper: "What would you want to find there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Mystery", "Courage", "Evidence"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅은 지금 우리와 어떻게 다른가",
    statement: "Searching for an answer can carry you into a place that is exciting and dangerous at the same time.",
    factual: [
      "Where and when does the magic tree house send Jack and Annie?",
      "Who and what do they come face-to-face with there?",
      "Whose riddle are they trying to answer?"
    ],
    conceptual: [
      "Why would a town with no people left in it feel frightening?",
      "What is the difference between excitement and danger?"
    ],
    debatable: [
      "Is it worth going somewhere dangerous to find an answer?",
      "Should you be afraid of something just because you cannot explain it?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "수수께끼에 답을 찾는 길" 까지만 말한다. 두 아이가 답을 찾았는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie meet a ghost, rustlers, and danger while searching for the answer to a riddle. Is an answer worth going somewhere dangerous for? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Worth the Danger", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think some answers are worth a little danger.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie meet a ghost and rustlers while looking for an answer.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they went on with the search even where there was danger.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say no answer is worth getting hurt for, but Jack and Annie stayed together.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a good question can be worth the risk.", lines: 2 }
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
      en: "Students retell how the magic tree house sends Jack and Annie to Rattlesnake Flats in 1895, where they meet a ghost, rustlers and a misplaced cowboy while searching for the answer to Morgan's riddle, then take a side on whether an answer is worth danger.",
      ko: "마법의 나무 집이 잭과 애니를 1895년 Rattlesnake Flats 로 보내고, 두 아이가 모건의 수수께끼에 답을 찾는 길에서 유령·소도둑들·자리를 잘못 찾은 카우보이를 마주치는 흐름을 말하고, 답을 얻기 위해 위험을 무릅쓰는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "A town where nobody lives any more. What do you call that? What would you see there?",
        do: "책을 펴기 전에 한다. 유령 마을을 아이 입에서 먼저 꺼내야 제목이 읽힌다. 서너 명만.",
        exp: "Empty houses. / No people. / Dust and wind.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would see empty houses and no people.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Ghost Town at Sundown.\" What is sundown? Why not at noon?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Sundown is evening. It is darker, so it feels scarier.",
        stuck: "표지를 가리킨다. \"Look at the cover. What time of day is it?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "유령 → ghost / 수수께끼 → riddle / 소도둑 → rustler",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What town...' becomes 'They are headed to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They are headed to Rattlesnake Flats, in 1895.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack and Annie were sitting on the porch of their house.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to answer Morgan's riddle — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they looking for?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Riddle)", min: "",
        say: "Stop at The Riddle. Don't just tell me they looked for an answer — tell me what makes a riddle HARD.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "A riddle hides the answer in the words. You have to think about it in a new way.",
        stuck: "\"You told me what they did. Now — why could they not just look it up?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is it worth going somewhere dangerous to find an answer? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie kept going even in a ghost town.",
        stuck: "손을 들게 한다. \"Go into the town? Or turn around?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say no answer is worth getting hurt for, but Jack and Annie were together.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about cowboys and the old American West?", ko: "카우보이와 옛 미국 서부에 대해 이미 아는 게 있니?" },
        { en: "Have you ever been somewhere that felt empty and a little scary?", ko: "텅 비어서 조금 무서웠던 곳에 가 본 적 있니?" },
        { en: "The title says sundown. Why is evening a good time for a ghost story?", ko: "제목이 해질녘이라고 해. 저녁은 왜 유령 이야기에 어울릴까?" }
      ],
      during: [
        { en: "The cowboy is called 'misplaced.' What do you think happened to him?", ko: "카우보이를 '자리를 잘못 찾은' 이라고 해. 그에게 무슨 일이 있었을까?" },
        { en: "What kind of riddle do you think Morgan gave them this time?", ko: "모건은 이번에 어떤 수수께끼를 냈을 것 같니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was Morgan's riddle, and what was the answer?", ko: "모건의 수수께끼는 무엇이었고, 답은 무엇이었니?" },
        { en: "Was the ghost frightening in the end, or something else?", ko: "끝까지 읽고 나니 그 유령은 무서웠니, 아니면 다른 무엇이었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Riddle' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 수수께끼의 답도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 1895년 서부의 유령 마을로 가는 이야기",
    text: "Jack and Annie were sitting on the [[front step|porch]] of their house. The magic tree house sent them back to the [[cowboy country|wild west]], to a town called Rattlesnake Flats, in 1895. There they came face-to-face with a [[spirit|ghost]], with some cattle thieves called [[robbers|rustlers]], and with a [[lost|misplaced]] cowboy. All of it was part of their search to answer Morgan's [[puzzle|riddle]]. There was excitement, and there was [[trouble|danger]]. Did they find the answer? Open the book and find out."
  }
};
