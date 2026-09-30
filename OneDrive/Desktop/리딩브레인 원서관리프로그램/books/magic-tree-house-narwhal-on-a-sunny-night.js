// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.4)
// Narwhal on a Sunny Night (Magic Tree House #33) — 우리는 이 책을 읽지 않았다.
// 이 책은 31권보다도 근거가 얇다. 오픈라이브러리 기록이 두 건 있으나 두 건 모두
// 소개글(desc)이 비어 있고 첫 문장(first)도 없다. 주제어는 한 건에 "Children's fiction"
// 하나뿐이고 다른 한 건은 주제어조차 비어 있다. 인물·지명 목록도 둘 다 비어 있다.
// 우리가 가진 것은 학원 장서 목록의 한 줄 요약과 발문 세 개가 전부다.
// 그래서 분량을 채우지 않았다. 근거가 버티는 만큼만 만들고, 버티지 않는 자리는 비워 두었다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 그린란드(Greenland)로 휙 데려간다(whisks) /
//   거기서 두 아이의 임무(mission)는 일각고래 한 마리(a narwhal)를 구하는 것이다 /
//   주제어는 Children's fiction · 112쪽(다른 기록은 85쪽) · 2020년 /
//   이 시리즈의 33권 · 제목은 "Narwhal on a Sunny Night"
// 일각고래에 대해서는 한 글자도 쓰지 않았다. 뿔이 무엇인지, 어디에 사는지, 무엇을 먹는지,
// 왜 도움이 필요한지 — 어느 것도 근거에 없다. 장서 발문이 "What do you think a narwhal
// looks like?" 라고 아이에게 되묻는다. 우리도 답을 주지 않고 그대로 되물었다.
// 그린란드도 마찬가지다. 얼음·북극·이누이트·기후 — 한 글자도 쓰지 않았다.
// 쓸 수 있는 말은 지명 Greenland 하나뿐이다.
// 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 시작 줄을 모두 뺐다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3937",
  slug: "magic-tree-house-narwhal-on-a-sunny-night",
  title: "Narwhal on a Sunny Night",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #33",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)·31권(AR 3.7)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.4", lexile: "440L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/10306630-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약과 발문 세 개를 바닥으로 삼았다. 오픈라이브러리 기록 두 건은 열어 보았으나 가져올 것이 주제어 한 줄과 쪽수·출간연도뿐이었다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3937 요약(\"The magic tree house whisks Jack and Annie to Greenland, where their mission is to save a narwhal.\")과 발문 세 개(\"What is Jack and Annie's mission in Greenland?\" / \"Have you ever tried to help an animal in trouble?\" / \"What do you think a narwhal looks like?\") + 오픈라이브러리 /works/OL21352506W (주제어 Children's fiction 하나 · 112쪽 · 2020년 · 소개글 없음 · 첫 문장 없음 · 인물 목록 비어 있음 · 지명 목록 비어 있음) + 오픈라이브러리 /works/OL39189706W (주제어 없음 · 85쪽 · 2020년 · 소개글 없음 · 첫 문장 없음)",
    characters: ["Jack", "Annie"],
    beats: [
      "the magic tree house whisks Jack and Annie to Greenland",
      "there, their mission is to save a narwhal"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"their mission is to save a narwhal\" 에서 그대로 끝난다. 두 아이가 일각고래를 구했는지, 어떻게 구했는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "우리가 모르는 것을 또렷이 적어 둔다. ① 일각고래가 어떻게 생겼는지 — 장서 발문 자체가 아이에게 \"What do you think a narwhal looks like?\" 라고 되묻는다. 우리도 답을 모른다. 뿔·이빨·크기·빛깔 — 한 글자도 근거에 없다. ② 일각고래가 어디에 살고 무엇을 먹는지 — 없다. ③ 일각고래가 왜 구해져야 하는지, 무엇이 그를 위험에 빠뜨렸는지 — 없다. 요약은 \"구하는 것이 임무다\" 에서 끊긴다. ④ 두 아이가 일각고래를 구했는지 — 없다. ⑤ 그린란드가 어떤 곳인지 — 지명 Greenland 말고는 한 줄도 없다. 날씨·얼음·바다·사는 사람들 — 아무것도 없다. ⑥ 제목의 \"Sunny Night\" 가 무엇을 말하는지 — 없다. 밤인데 해가 있다는 말이 무슨 뜻인지 어느 출처도 설명하지 않는다. ⑦ 임무를 누가 주었는지, 모건이나 수수께끼가 나오는지 — 없다. ⑧ 등장인물은 잭과 애니 둘이 전부다. 오픈라이브러리 인물 목록이 비어 있다. ⑨ 두 아이의 나이, 누가 손위인지 — 없다. ⑩ 책의 첫 문장 — 두 기록 어디에도 없다. ⑪ 장(chapter) 구성과 각 장에서 무슨 일이 일어나는지 — 없다. 그래서 이 학습지에는 장 번호가 한 번도 나오지 않는다",
    checked: "장서 요약의 낱말(magic tree house / whisks / Greenland / mission / save / a narwhal)과 제목 낱말(Narwhal · Sunny · Night), 장서 발문 세 줄, 오픈라이브러리 주제어(Children's fiction)를 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 오픈라이브러리 두 기록은 desc 와 first 가 모두 빈 칸이었다 — 없는 것을 있는 것처럼 적지 않았다. 쪽수가 112쪽과 85쪽으로 서로 달라 판이 다른 것으로 보고 어느 쪽도 학습지에 쓰지 않았다. 일각고래를 '동물' 로 부른 것은 장서 발문이 \"save a narwhal\" 바로 옆에 \"help an animal in trouble\" 을 나란히 놓았기 때문이고, 거기까지가 우리 근거다. 그 밖의 일각고래 지식(뿔·북극·먹이·멸종위기)과 그린란드 지식(얼음·북극·이누이트·백야)은 한 글자도 쓰지 않았다. 31권과 마찬가지로 첫 문장이 없어 첫 문장을 묻는 문항과 문법 보기를 뺐고, 퀴즈는 14개가 아니라 11개로 줄였다 (2026-09-30)",
  },

  // 낭독 영상 — S3937.json 의 videos 에서 제목을 하나하나 확인해 골랐다 (2026-09-30).
  // 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 이 권은 통본(책 한 권 전체) 낭독 영상을 확인하지 못했다. 첫 영상은 1~2장만 읽은
  // 12분짜리라 앞에 놓고, 나머지 둘을 뒤에 두었다. 뒷부분은 아이가 책으로 읽는다.
  // 따로 받아 둔 영상 후보 목록(vid-S3937.json)에 있던 "MAGIC TREE HOUSE FUN: Narwhal on a
  // Sunny Night!"(Shaler Library Televison, 32:57)는 도서관 행사 영상이라 낭독이 아니어서 넣지 않았다.
  shadowing: {
    query: "\"Narwhal on a Sunny Night\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/DXJtHrqU7go",
    videos: [
      { url: "https://youtu.be/DXJtHrqU7go", title: "Magic Tree House #33 Narwhal on a Sunny Night by Mary Pope Osborne - Chapter 1-2 | Read aloud",
        channel: "Quynh Giang English", views: "2,370", length: "11:59" },
      { url: "https://youtu.be/XQC9135a11Y", title: "Narwhal on a Sunny Night Book 33 by Mary Pope Osborne · Audiobook preview",
        channel: "", views: "", length: "" },
      { url: "https://youtu.be/ZEed62Nd8wc", title: "Narwhal on a Sunny Night 2",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 장서 요약 한 줄 · 책 제목 · 장서 발문 · 장서 목록의 갈래(Adventure)에
  // 실제로 나오는 말에서만 골랐다.
  // 일각고래의 생태를 설명하는 낱말(tusk, Arctic, ice, whale ...)은 한 개도 끌어오지 않았다.
  // narwhal 은 뜻을 적지 않고 되물었다 — 장서 발문 자체가 아이에게 되묻고 있기 때문이다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "magic",       pos: "adj.", en: "having special powers that cannot happen in real life", ko: "마법의",
      ex: "The {{magic}} tree house takes Jack and Annie away.", ex_ko: "마법의 나무 집이 잭과 애니를 데려가요.", pic: "🪄" },
    { word: "tree house",  pos: "n.",   en: "a small house built up in the branches of a tree", ko: "나무 위의 집",
      ex: "The magic {{tree house}} whisks them to Greenland.", ex_ko: "마법의 나무 집이 둘을 그린란드로 데려가요.", pic: "🌳" },
    { word: "whisk",       pos: "v.",   en: "to take someone away quickly and suddenly", ko: "휙 데려가다",
      ex: "The tree house {{whisks}} Jack and Annie to Greenland.", ex_ko: "나무 집이 잭과 애니를 그린란드로 휙 데려가요.", pic: "💨" },
    { word: "Greenland",   pos: "n.",   en: "the place the magic tree house takes Jack and Annie to in this book", ko: "그린란드 — 이 책에서 나무 집이 두 아이를 데려가는 곳",
      ex: "They travel to {{Greenland}}.", ex_ko: "그들은 그린란드로 갑니다.", pic: "📍" },
    { word: "mission",     pos: "n.",   en: "an important job that someone is sent to do", ko: "임무",
      ex: "Their {{mission}} is to save a narwhal.", ex_ko: "그들의 임무는 일각고래를 구하는 거예요.", pic: "📜" },
    { word: "save",        pos: "v.",   en: "to keep someone or something safe from harm", ko: "구하다",
      ex: "Jack and Annie must {{save}} a narwhal.", ex_ko: "잭과 애니는 일각고래를 구해야 해요.", pic: "🆘" },
    { word: "narwhal",     pos: "n.",   en: "the animal Jack and Annie are sent to save — our records do not say what it looks like, so read the book and find out", ko: "일각고래 — 잭과 애니가 구하러 가는 동물. 생김새는 우리 자료에 적혀 있지 않다",
      ex: "Their mission is to save a {{narwhal}}.", ex_ko: "그들의 임무는 일각고래 한 마리를 구하는 것이에요.", pic: "❓" },
    { word: "sunny",       pos: "adj.", en: "with the sun shining", ko: "햇빛이 비치는, 맑은",
      ex: "The title of this book is \"Narwhal on a {{Sunny}} Night.\"", ex_ko: "이 책의 제목에 들어 있는 낱말이에요.", pic: "☀️" },
    { word: "night",       pos: "n.",   en: "the time between evening and morning, when the sun has usually gone down", ko: "밤",
      ex: "The title names a time of day: a sunny {{night}}.", ex_ko: "제목이 하루 중 한때를 말해요 — 밤이에요.", pic: "🌙" },
    { word: "adventure",   pos: "n.",   en: "an exciting trip where something new or risky happens", ko: "모험",
      ex: "Jack and Annie go on another {{adventure}}.", ex_ko: "잭과 애니는 또 한 번 모험을 떠나요.", pic: "🗺️" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아, 10권과 달리 '첫 문장으로 배우는 과거진행형' 을 넣지 않았다.
  // 대신 장서 요약 한 줄이 현재형으로 쓰여 있다는 점을 그대로 살려 3인칭 단수 -s 를 세웠고,
  // 요약 안에 실제로 들어 있는 "to save"(구하는 것)를 세 번째 항목으로 삼았다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie go on [[an]] adventure and take [[a]] mission to Greenland.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a mission.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "They have {{a}} mission and {{an}} adventure." },
      { name: "3인칭 단수 현재형 -s", ko: "현재형 동사의 -s",
        sent: "The magic tree house [[whisks]] Jack and Annie to Greenland.",
        why_ko: "주어가 he·she·it 처럼 '하나' 이고 지금 이야기하듯 말할 때는 동사 뒤에 -s 를 붙여요. The tree house (=it) → whisks. 주어가 둘 이상이면 붙이지 않아요.",
        why: "Add -s to the verb when the subject is one person or thing: the tree house whisks.",
        try: "The tree house {{whisks}} them away, but the children {{travel}} together." },
      { name: "to + 동사원형 (~하는 것)", ko: "부정사",
        sent: "Their mission is [[to save]] a narwhal.",
        why_ko: "'무엇을 하는 것' 을 말할 때 to + 동사원형을 써요. to save = 구하는 것. to 뒤에는 늘 동사원형! to saved(X), to save(O).",
        why: "Use \"to\" plus the plain form of a verb to name the job: to save.",
        try: "Their mission is {{to save}} a narwhal." }
    ],
    find: "책에서 -s 로 끝나는 현재형 동사를 세 개 찾아 쓰세요. · Find three present-tense verbs ending in -s.",
    exam: {
      choose: [
        { q: "Jack and Annie have (a / an) mission in Greenland.", a: "a",
          why_ko: "mission 은 '미'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "This book is (a / an) adventure story.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "The magic tree house (whisk / whisks) Jack and Annie to Greenland.", a: "whisks",
          why_ko: "주어 The magic tree house 는 하나(it)예요. 현재형에 -s 를 붙여 whisks!" },
        { q: "Jack and Annie (travel / travels) to Greenland together.", a: "travel",
          why_ko: "주어가 두 사람이에요. 복수 주어에는 -s 를 붙이지 않아요." },
        { q: "Their mission is (to save / to saved) a narwhal.", a: "to save",
          why_ko: "to 뒤에는 언제나 동사원형이 와요. to save 가 맞아요." }
      ],
      fix: [
        { q: "The magic tree house [[whisk]] Jack and Annie to Greenland.", a: "whisks",
          why_ko: "주어가 하나예요. 현재형 동사에 -s 를 붙여 whisks 로 고쳐요." },
        { q: "Their mission [[are]] to save a narwhal.", a: "is",
          why_ko: "mission 은 하나예요. 하나짜리 주어에는 is 를 써요." },
        { q: "Their mission is [[to saving]] a narwhal.", a: "to save",
          why_ko: "to 다음에는 동사원형! to save 로 고쳐요." }
      ],
      write: [
        { ko: "마법의 나무 집이 잭과 애니를 그린란드로 휙 데려간다.", cond: "whisk, Greenland, 현재형", a: "The magic tree house whisks Jack and Annie to Greenland.",
          why_ko: "주어가 하나라서 whisk 에 -s 를 붙여 whisks 가 돼요." },
        { ko: "그들의 임무는 일각고래 한 마리를 구하는 것이다.", cond: "mission, to save", a: "Their mission is to save a narwhal.",
          why_ko: "'구하는 것' 은 to + 동사원형, 곧 to save 예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 네 문항은 답을 비워 두었다. 우리 근거가 거기까지 말하지 않기 때문이다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what whisks them away?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} whisks them away." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where does the magic tree house whisk Jack and Annie?",
      frame: "It whisks them to {{Greenland}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What is Jack and Annie's mission in Greenland?",
      frame: "Their mission is {{to save a narwhal}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Narwhal on a Sunny Night.\" Which word tells the weather, and which word tells the time of day?",
      frame: "The weather word is {{sunny}}, and the time word is {{night}}. Those two words together sound strange to me because {{                    }}." },
    { ref: "장서 요약", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "장서 질문", skill: "추론·예측", q: "What do you think a narwhal looks like? Write your guess before you read. Then read the book and write what it really is.",
      frame: "I guessed a narwhal was {{                    }}. In the book it is {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Have you ever tried to help an animal in trouble? Tell what happened, or what you would do.",
      frame: "I {{did / would}} help, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 이 책은 근거가 얇아 11문항만 냈다. 억지로 14개를 채우지 않았다.
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장을 묻는 문항은 뺐다 — 두 기록 어디에도 이 책의 첫 문장이 없다.
  // 일각고래가 어떻게 생겼는지 묻는 문항도 내지 않았다. 우리가 답을 모른다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a sailor", "Two narwhals"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"whisks Jack and Annie to Greenland\" 라고 두 이름을 그대로 적어요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What whisks Jack and Annie away in this book?",
      a: ["A magic tree house", "A ship", "A plane", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"The magic tree house whisks...\" 로 시작해요. 배도 비행기도 기계도 근거에 없어요.",
      why: "The magic tree house — the summary begins \"The magic tree house whisks...\"" },
    { q: "Where does the magic tree house whisk Jack and Annie?",
      a: ["Greenland", "Egypt", "Rome", "The wild west"], c: 0,
      why_ko: "그린란드(Greenland)예요. 요약이 \"to Greenland\" 라고 적고 있어요. 로마는 31권, 서부는 10권이에요.",
      why: "Greenland. The summary says \"to Greenland.\" Rome is book #31 and the wild west is book #10." },
    { q: "What is Jack and Annie's mission in Greenland?",
      a: ["To save a narwhal", "To find a treasure", "To meet an emperor", "To build a tree house"], c: 0,
      why_ko: "일각고래를 구하는 것이에요. 요약이 \"their mission is to save a narwhal\" 이라고 말해요.",
      why: "To save a narwhal — \"their mission is to save a narwhal.\"" },
    { q: "In the summary, the tree house \"whisks\" Jack and Annie away. What does \"whisk\" mean here?",
      a: ["To take someone away quickly and suddenly", "To wait for a long time", "To hide someone", "To wake someone up"], c: 0,
      why_ko: "whisk 는 '휙 데려가다' 예요. 눈 깜짝할 사이에 데려간다는 뜻이에요.",
      why: "To whisk someone away is to take them off quickly and suddenly." },
    { q: "The summary calls it a \"mission.\" What is a mission?",
      a: ["An important job someone is sent to do", "A long holiday", "A kind of boat", "A song"], c: 0,
      why_ko: "mission 은 누군가에게 맡겨진 중요한 일, 곧 임무예요. 휴가도 배도 노래도 아니에요.",
      why: "A mission is an important job someone is sent to do." },
    { q: "How many narwhals does the summary say Jack and Annie must save?",
      a: ["One", "Two", "Three", "A whole group"], c: 0,
      why_ko: "한 마리예요. 요약이 \"a narwhal\" 이라고 한 마리를 말해요. 여러 마리라고는 적혀 있지 않아요.",
      why: "One. The summary says \"a narwhal,\" not narwhals." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#23", "#31", "#33"], c: 3,
      why_ko: "33권이에요. 장서 목록 제목이 \"#33 Narwhal on a Sunny Night\" 예요.",
      why: "Book #33 — the catalog title is \"#33 Narwhal on a Sunny Night.\"" },
    { q: "Which time of day is named in the title of this book?",
      a: ["Morning", "Noon", "Afternoon", "Night"], c: 3,
      why_ko: "밤이에요. 제목이 \"Narwhal on a Sunny Night\" 예요.",
      why: "Night. The title is \"Narwhal on a Sunny Night.\"" },
    { q: "Our records list this book as \"Children's fiction.\" What does that tell us?",
      a: ["It is a made-up story for children", "It is a true science book", "It is a book of poems", "It is a dictionary"], c: 0,
      why_ko: "fiction 은 지어낸 이야기라는 뜻이에요. 주제어가 \"Children's fiction\" 하나뿐이라 과학책이 아니라 아이들을 위한 이야기책이에요.",
      why: "Fiction means a made-up story. The only listed subject is \"Children's fiction.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who the two children are", "Where the tree house takes them", "What their mission is", "What a narwhal looks like"], c: 3,
      why_ko: "일각고래가 어떻게 생겼는지예요. 우리 근거는 \"일각고래를 구하는 것이 임무다\" 에서 딱 끊겨요. 장서 발문도 우리에게 답을 주는 대신 \"What do you think a narwhal looks like?\" 라고 되물어요. 책을 읽어야 알 수 있어요.",
      why: "What a narwhal looks like. Our summary stops at \"their mission is to save a narwhal,\" and our own catalog question asks the reader to guess." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // Wanted·But·So·Then 과 The Ending 은 근거가 말하지 않는다. 비워 두었다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Greenland}}", time: "{{a sunny night}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 하려 했는지는 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie away.",
        frame: "They go to {{Greenland}}." },
      { label: "The Mission",
        given: "",
        frame: "There, their {{mission}} is to {{save a narwhal}}." },
      { label: "The Narwhal",
        given: "우리 자료는 일각고래가 어떻게 생겼는지도, 왜 도움이 필요한지도 말해 주지 않는다.",
        frame: "In the book, the narwhal is {{                    }}, and it needs help because {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 'The Narwhal' 가지와 'Greenland' 가지는 답을 주지 않고 되묻기만 한다. 우리가 답을 모른다.
  mindMap: {
    center: "Narwhal on a Sunny Night",
    branches: [
      { label: "Jack & Annie",   ask: "The magic tree house whisks Jack and Annie away again. What do you think they take with them?",
        deeper: "Why do you think the same two children are sent again and again?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "\"Whisks\" is a quick, sudden word. Why not say the tree house \"carried\" them?" },
      { label: "Greenland",      ask: "Greenland is the one place name our records give us. What does that name make you picture?",
        deeper: "Find Greenland on a map. Was it where you expected it to be?" },
      { label: "The Mission",    ask: "Their mission is to save a narwhal. What is the difference between a mission and a trip?",
        deeper: "Who do you think gives a mission like this? Our records do not say — what is your guess?" },
      { label: "The Narwhal",    ask: "What do you think a narwhal looks like? Draw it before you read.",
        deeper: "After reading, how close was your drawing? What surprised you?" },
      { label: "Me",             ask: "Have you ever tried to help an animal in trouble? What did you do?",
        deeper: "Would you travel far away to help an animal you had never seen? Why or why not?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Responsibility", "Rescue", "Curiosity"],
    globalContext: "Sharing the planet — 사람과 다른 생명은 서로에게 무엇인가",
    statement: "A mission can send you far from home to help a living thing you have never seen.",
    factual: [
      "What whisks Jack and Annie away in this book?",
      "Where does the tree house take them?",
      "What is their mission there?"
    ],
    conceptual: [
      "What is the difference between a mission and a trip you choose yourself?",
      "Why is it harder to help something you have never seen?"
    ],
    debatable: [
      "Is it worth travelling far away to help one animal?",
      "Should you say yes to a mission before you know how hard it will be?"
    ],
    learnerProfile: ["Caring", "Inquirer", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "일각고래를 구하는 것이 임무다" 까지만 말한다. 두 아이가 구했는지 적혀 있지 않으므로,
    // 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "The tree house whisks Jack and Annie to Greenland to save a narwhal. Is it worth going far away to help one animal? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Worth the Long Trip", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think one animal is worth a long trip.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "The tree house whisks Jack and Annie all the way to Greenland for one narwhal.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows their mission was worth the trip, even for one animal.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say one animal is too small a reason, but I do not think so.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would take the mission too.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and Annie to Greenland on a mission to save a narwhal, say clearly what our sources do not tell them — above all what a narwhal is — and then take a side on whether it is worth travelling far to help one animal.",
      ko: "마법의 나무 집이 잭과 애니를 그린란드로 데려가 일각고래 한 마리를 구하는 임무를 맡긴다는 흐름을 말하고, 우리 자료가 말해 주지 않는 것 — 무엇보다 일각고래가 무엇인지 — 을 스스로 짚은 뒤, 한 마리를 구하러 멀리 가는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이고, 그 양이 아주 적다.
    // 그래서 이 수업의 절반은 '모르는 것을 모른다고 말하는 연습' 이다.
    // 선생님도 일각고래를 설명하지 않는다. 뿔·북극·먹이·멸종위기 — 근거에 없다.
    // 그린란드의 날씨·얼음·사람들도 꺼내지 않는다. 우리가 가진 것은 지명 하나뿐이다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever tried to help an animal in trouble? What happened?",
        do: "책을 펴기 전에 한다. 오늘 글쓰기의 물음을 미리 입에 올려 두는 것이다. 서너 명만.",
        exp: "A bird hit our window. / I found a cat in the rain.",
        stuck: "선생님이 먼저 한 문장 한다. \"I once moved a snail off the road.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Narwhal on a Sunny Night.\" A sunny night. Can a night be sunny?",
        do: "제목의 이상한 점만 짚는다. 답을 주지 않는다 — 우리도 모른다. 아이가 궁금해하는 채로 책을 펴게 둔다.",
        exp: "No, night is dark. / Maybe somewhere it is different.",
        stuck: "제목을 칠판에 쓰고 sunny 와 night 두 낱말에만 동그라미를 친다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "임무 → mission / 구하다 → save / 휙 데려가다 → whisk",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at the word narwhal. Its meaning box does not tell you what it is. That is on purpose.",
        do: "빈 뜻 칸을 손가락으로 짚는다. 선생님도 모른다고 그대로 말한다. 여기서 이 수업의 태도가 정해진다.",
        exp: "(아이가 '선생님은 알잖아요' 라고 한다. 그때 \"Our paper does not say. Yours will, tonight.\")",
        stuck: "\"Guess now. Draw it in the margin. We check it tomorrow.\"" },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What is their mission...' becomes 'Their mission is...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "Their mission is to save a narwhal.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Questions five, six and seven have no answer on this sheet. Not because I hid it — because nobody wrote it down for us.",
        do: "이 수업에서 가장 중요한 한 마디다. 모르는 것을 모른다고 말하는 본보기를 선생님이 먼저 보인다.",
        exp: "(아이가 '그럼 어떻게 해요' 라고 묻는다. 그때 \"You read the book\" 한 마디면 된다)",
        stuck: "\"Our paper stops at 'save a narwhal.' The book keeps going. You go with it.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. Today only the first one is filled.",
        do: "다섯 칸을 손가락으로 짚는다. 한 칸만 차 있는 것을 아이 눈으로 보게 한다.",
        exp: "Somebody: Jack and Annie — 나머지 네 칸은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those four boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in our summary.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Narwhal)", min: "",
        say: "Stop at The Narwhal. Draw your guess in the box. A guess is allowed — as long as you call it a guess.",
        do: "→ 칸에서 반드시 멈춘다. 추측과 사실을 가르는 연습이 여기서 일어난다. 선생님은 답을 말하지 않는다.",
        exp: "I guess it lives far from here, because Jack and Annie have to travel all the way to Greenland.",
        stuck: "\"Say it like this: 'I guess..., because...' Then we check it in the book.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, our summary answers it. Step 2, the summary helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "One animal. All the way to Greenland. Worth it or not? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because that one animal has nobody else.",
        stuck: "손을 들게 한다. \"Go? Or stay home?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say one animal is too small a reason, but I do not think so.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you think a narwhal looks like? Draw it before you read.", ko: "일각고래는 어떻게 생겼을 것 같니? 읽기 전에 그려 보자." },
        { en: "Where is Greenland? Find it on a map before you open the book.", ko: "그린란드는 어디일까? 책을 펴기 전에 지도에서 찾아보자." },
        { en: "The title says a sunny night. How can a night be sunny?", ko: "제목이 '맑은 밤' 이라고 해. 밤이 어떻게 맑을 수 있을까?" }
      ],
      during: [
        { en: "Have you seen the narwhal yet? Was your drawing close?", ko: "일각고래가 나왔니? 네가 그린 그림과 비슷했니?" },
        { en: "Why does the narwhal need saving?", ko: "일각고래는 왜 도움이 필요하니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie finish their mission? How?", ko: "잭과 애니는 임무를 끝냈니? 어떻게 했니?" },
        { en: "Now that you have read it — how can a night be sunny?", ko: "다 읽고 나니, 밤이 어떻게 맑을 수 있었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "whisk 와 mission 두 낱말은 요약 한 줄에 실제로 있는 말이다. 꼭 짚는다.", miss: "narwhal 의 뜻을 선생님이 설명해 버린다. 그러면 오늘 수업의 절반이 사라진다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "뒤쪽 네 문항은 빈칸이 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 북극·고래 이야기를 대신 채워 준다. 그건 이 책의 내용이 아니다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Narwhal' 가지에서 반드시 멈춘다. 그리게 하고, 정답은 주지 않는다.", miss: "추측을 사실처럼 적는다. 'I guess' 를 붙이게 한다." },
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
  // 근거(장서 요약 한 줄 · 장서 발문 · 책 제목)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 남아 있지 않아, 10권처럼 책의 첫 줄로 시작하지 않는다.
  // 일각고래가 어떻게 생겼는지도, 결말도 근거가 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "마법 나무집이 잭과 애니를 그린란드로 데려가 일각고래 한 마리를 구하게 하는 이야기",
    text: "The [[wonderful|magic]] tree house [[carried|whisked]] Jack and Annie to Greenland. There, their [[job|mission]] was [[to rescue|to save]] a narwhal. The name of this book is \"Narwhal on a Sunny Night.\" What does a narwhal look like? Why does it need help? How can a night be sunny? Our [[papers|records]] do not say. Open the book and find out."
  }
};
