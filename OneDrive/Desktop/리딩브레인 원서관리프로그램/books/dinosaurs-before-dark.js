// 리딩브레인 원서프로그램 — 2점대 책 (AR 2.6)
// Dinosaurs Before Dark (Magic Tree House #1) - Jack and Annie of Frog Creek, PA
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3013",
  slug: "dinosaurs-before-dark",
  title: "Dinosaurs Before Dark",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #1",
  publisher: "Random House",
  level: { ar: "2.6", lexile: "510L", rb: "정독 1단계" },
  awards: [],
  defSource: "",
  cover: "assets/covers/dinosaurs-before-dark.jpg",

  shadowing: {
    query: "\"Dinosaurs Before Dark\" read aloud",
    searchUrl: "https://youtu.be/7z-J7kVB2S4",
    qr: "assets/qr/dinosaurs-before-dark.png",
    videos: [
      { url: "https://youtu.be/7z-J7kVB2S4", title: "Magic Tree House Book #1  \"Dinosaurs Before Dark\"  Read Aloud", channel: "Faerie Book Mama", views: "198,507", length: "" },
      { url: "https://youtu.be/_3Etg0hk4U0", title: "Dinosaurs Before Dark | Full Children's Audiobook | Magic Tree House Book 1 by Mary Pope Osborne", channel: "The Story Harbor", views: "182,448", length: "" },
      { url: "https://youtu.be/ymnovd-vg44", title: "Magic Tree House #1: Dinosaurs Before Dark - read aloud by Mary Pope Osborne with Q&A!", channel: "Brightly Storytime", views: "128,100", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "dinosaur", pos: "n.", audio: "assets/audio/dinosaurs-before-dark/dinosaur.mp3", en: "a large animal that lived on Earth millions of years ago", ko: "공룡",              ex: "They saw a {{dinosaur}} in the forest.", ex_ko: "그들은 숲에서 공룡을 봤어요.", pic: "🦕" },
    { word: "tree",     pos: "n.", audio: "assets/audio/dinosaurs-before-dark/tree.mp3", en: "a large plant with a thick brown stem and green leaves", ko: "나무",              ex: "A big {{tree}} stood on a hill.", ex_ko: "큰 나무가 언덕에 서 있었어요.", pic: "🌳" },
    { word: "house",    pos: "n.", audio: "assets/audio/dinosaurs-before-dark/house.mp3", en: "a building where people live", ko: "집",               ex: "The tree had a {{house}} in it.", ex_ko: "그 나무 안에는 집이 있었어요.", pic: "🏠" },
    { word: "magic",    pos: "adj.", audio: "assets/audio/dinosaurs-before-dark/magic.mp3", en: "using powers that seem impossible or mysterious", ko: "마법의, 신기한",      ex: "The tree was {{magic}}.", ex_ko: "그 나무는 신기했어요.", pic: "✨" },
    { word: "book",     pos: "n.", audio: "assets/audio/dinosaurs-before-dark/book.mp3", en: "a thing made of pages with words or pictures to read", ko: "책",               ex: "Jack found a small {{book}} in the tree.", ex_ko: "잭은 나무에서 작은 책을 찾았어요.", pic: "📚" },
    { word: "time",     pos: "n.", audio: "assets/audio/dinosaurs-before-dark/time.mp3", en: "a point in the past, present, or future", ko: "시간",              ex: "The tree went back in {{time}}.", ex_ko: "그 나무는 시간을 거슬러 갔어요.", pic: "⏰" },
    { word: "forest",   pos: "n.", audio: "assets/audio/dinosaurs-before-dark/forest.mp3", en: "a large area covered with many trees", ko: "숲",               ex: "A dark {{forest}} was full of dinosaurs.", ex_ko: "어두운 숲에는 공룡이 가득했어요.", pic: "🌲" },
    { word: "danger",   pos: "n.", audio: "assets/audio/dinosaurs-before-dark/danger.mp3", en: "something that can hurt you or cause harm", ko: "위험",              ex: "The dinosaurs brought {{danger}}.", ex_ko: "공룡들은 위험을 가져왔어요.", pic: "⚠️" },
    { word: "run",      pos: "v.", audio: "assets/audio/dinosaurs-before-dark/run.mp3", en: "to move very fast on your feet", ko: "달리다",              ex: "They had to {{run}} from the dinosaur.", ex_ko: "그들은 공룡으로부터 달아나야 했어요.", pic: "🏃" },
    { word: "escape",   pos: "v.", audio: "assets/audio/dinosaurs-before-dark/escape.mp3", en: "to get away from a place or situation where you are trapped", ko: "탈출하다",           ex: "They {{escape}}d back to the tree.", ex_ko: "그들은 나무로 돌아가 탈출했어요.", pic: "🏃" }
  ],

  // ── ①-2 문법 ─────────────────────────────────────────────
  grammar: {
    points: [
      { name: "Simple Past -ed", ko: "과거형 규칙",
        sent: "Jack [[looked]] at the tree, and Annie [[asked]] a question.",
        why_ko: "규칙 동사의 과거형은 -ed! look → looked, climb → climbed. 이미 끝난 일을 말할 때 써요.",
      why: "When something already finished, add -ed: look → looked, ask → asked.",
        try: "They {{climbed}} the ladder and {{looked}} at the books." },
      { name: "Simple Past irregular", ko: "과거형 불규칙",
        sent: "Jack [[saw]] a dinosaur, and they [[went]] back quickly.",
        why_ko: "불규칙 동사는 모양이 확 바뀌어요. see → saw, go → went, run → ran, find → found. 표로 외워 두세요!",
      why: "Some verbs change completely: see → saw, go → went, run → ran.",
        try: "Jack {{found}} a book, and Annie {{saw}} the magic tree." },
      { name: "There is / There are", ko: "There is/are",
        sent: "[[There was]] a magic tree house, and [[there were]] dinosaurs in the forest.",
        why_ko: "'~이 있다'는 There is/are. 하나면 is, 여럿이면 are, 과거면 was/were! There were dinosaurs = 공룡들이 있었다.",
      why: "Use there is (singular) and there are (plural) to show that something exists.",
        try: "{{There was}} a book in the tree, and {{there were}} many dinosaurs." }
    ],
    find: "책에서 과거형을 다섯 개 찾아 원형과 함께 쓰세요. · Find five past tense verbs.",
    exam: {
      choose: [
        {"q": "Jack (find / found) a gold medallion.", "a": "found", why_ko: "잭이 이미 찾은 일이니 과거형이에요. find는 불규칙이라 found!" },
        {"q": "Annie (go / went) up the ladder first.", "a": "went", why_ko: "go는 불규칙 동사예요. 과거형은 goed가 아니라 went!" },
        {"q": "There (was / were) many books in the tree house.", "a": "were", why_ko: "books는 여러 권(복수)이에요. 복수의 과거는 There were!" },
        {"q": "There (was / were) a big dinosaur in the forest.", "a": "was", why_ko: "a big dinosaur는 한 마리(단수)예요. 단수의 과거는 There was!" },
        {"q": "Yesterday Jack (looked / looks) at a Triceratops.", "a": "looked", why_ko: "Yesterday는 과거 신호! look에 -ed를 붙여 looked예요." }
      ],
      fix: [
        {"q": "Jack [[seed]] a Pteranodon.", "a": "saw", why_ko: "see는 불규칙 동사예요. 과거형은 seed가 아니라 saw!" },
        {"q": "There [[was]] three dinosaurs near the nest.", "a": "were", why_ko: "three dinosaurs는 복수예요. There was가 아니라 There were!" },
        {"q": "They [[runned]] back to the tree house.", "a": "ran", why_ko: "run은 불규칙 동사예요. 과거형은 runned가 아니라 ran!" }
      ],
      write: [
        {"ko": "잭은 책을 찾았다.", "cond": "find, book", "a": "Jack found a book.", why_ko: "find의 과거형 found! Jack found a book." },
        {"ko": "숲에는 많은 공룡이 있었다.", "cond": "There, dinosaurs", "a": "There were many dinosaurs in the forest.", why_ko: "'~이 있었다'는 There was/were예요. 공룡이 여러 마리니까 There were many dinosaurs!" }
      ]
    }
  },

  // ── ② 독해 ────────────────────────────────────────────────
  comprehension: [
    { ref: "ch. 1",  skill: "사실찾기",   q: "Where did Jack and Annie find the magic tree house?",
      frame: "They found the tree {{on a hill at the edge of the woods}}." },
    { ref: "ch. 1",  skill: "어휘",       q: "What was special about the tree house?",
      frame: "The tree house {{was full of books}}, and Jack opened {{a book about dinosaurs}}." },
    { ref: "ch. 2",  skill: "추론·예측",  q: "What did Jack think when he opened the dinosaur book?",
      frame: "Jack {{was scared and surprised}}, because {{the book seemed to make them go back in time}}." },
    { ref: "ch. 3",  skill: "사실찾기",   q: "What time period did they go to?",
      frame: "They went to {{the time of dinosaurs, millions of years ago}}." },
    { ref: "ch. 4~5", skill: "추론·예측",  q: "Why did Jack and Annie run back to the tree quickly?",
      frame: "They {{were afraid of the dinosaurs}}, especially {{the big meat-eating dinosaur that was chasing them}}." },
    { ref: "ch. 5", skill: "사실찾기",   q: "Who helped Jack escape from the dinosaur?",
      frame: "A {{Pteranodon}} {{carried Jack to safety}} and {{took him back to the tree}}." },
    { ref: "ch. 6", skill: "주제·요점",  q: "How did Jack and Annie get back to their own time?",
      frame: "They {{found the Pennsylvania book}} in {{the tree house}} and {{used it to go home}}." }
  ],

  // ── ②-2 북퀴즈 ────────────────────────────────────────────
  quiz: [
    { q: "Where did Jack and Annie first find the tree house?",
      a: ["In their yard", "On a hill near the woods", "In a park", "Near school"], c: 1,
      why_ko: "숲 가장자리의 언덕 위예요. 아이들은 그곳에서 우연히 신기한 나무를 발견했죠.",
      why: "On a hill at the edge of the woods. That is where the magic tree house was." },
    { q: "What did Jack and Annie find in the tree house?",
      a: ["A treasure box", "Lots of books", "A map", "A sword"], c: 1,
      why_ko: "나무 집 안은 책으로 가득했어요. 그중 공룡 책을 펼치고 소원을 빈 게 모험의 시작이에요. 메달은 나중에 공룡 시대 땅에서 찾아요. 순서 헷갈리지 마세요!",
      why: "The tree house was full of books. Jack wished over the dinosaur book, and the adventure began. The medallion comes later, in the dinosaur land." },
    { q: "What time period did they travel to?",
      a: ["Ancient Egypt", "The age of dinosaurs", "Medieval times", "The future"], c: 1,
      why_ko: "공룡 시대로 갔어요! 백만 년 전의 숲. 얼마나 무섭고 신나는 경험이었겠어요?",
      why: "The age of dinosaurs, millions of years in the past. Very scary and very exciting." },
    { q: "What kinds of dinosaurs did they see?",
      a: ["Only big meat-eaters", "Pteranodon, Triceratops, and Anatosaurus", "Only long-necked dinosaurs", "Small dinosaurs only"], c: 1,
      why_ko: "익룡 Pteranodon, Triceratops, 그리고 오리 부리 같은 Anatosaurus를 봤어요. 각각 다른 모양이고 다른 습성을 가졌죠.",
      why: "Pteranodon (flying dinosaur), Triceratops (three-horned), and Anatosaurus (duck-billed). All very different." },
    { q: "Who chased Jack and Annie in the forest?",
      a: ["A Pteranodon", "A Triceratops", "A Tyrannosaurus", "Many small dinosaurs"], c: 2,
      why_ko: "티라노사우루스, 커다란 육식 공룡이 그들을 쫓았어요! 가장 위험한 공룡이죠.",
      why: "A Tyrannosaurus — the big meat-eating dinosaur. The most dangerous one." },
    { q: "Who saved Jack from the Tyrannosaurus?",
      a: ["Annie", "A Pteranodon", "A Triceratops", "Another dinosaur"], c: 1,
      why_ko: "익룡이 잭을 안전하게 나무로 데려가 줬어요! 무섭지만 소위 도움을 주기도 했던 거죠.",
      why: "A Pteranodon carried Jack to safety and brought him back to the tree." },
    { q: "What did Jack find on the ground when they went back in time?",
      a: ["A bone", "A dinosaur egg", "A gold medallion", "Nothing special"], c: 2,
      why_ko: "금메달을 찾았어요. 그 메달에 M이라는 표시가 있었죠. 누가 놓고 간 거 같았어요.",
      why: "A gold medallion with the letter M on it. Someone left it there for them to find." },
    { q: "How did they get back to their own time?",
      a: ["They walked back", "The tree automatically sent them back", "They found the Pennsylvania book and used it", "A Pteranodon flew them back"], c: 2,
      why_ko: "Pennsylvania 책을 찾아서 그 책으로 현재로 돌아갔어요. 그게 마법 나무 집의 비결이에요.",
      why: "They found the Pennsylvania book in the tree house and used it to return to their time." },
    { q: "What does the gold medallion mean?",
      a: ["It is a treasure they found", "Someone who lives in the tree house left it", "It is just decoration", "We still do not know"], c: 1,
      why_ko: "누군가 의도적으로 그 나무 집에 놓고 간 거 같아요. 아마도 그 사람이 M이라는 이름의 사람인 것 같죠.",
      why: "Someone left it there. That person probably uses the letter M. Mystery!" },
    { q: "What is this book really about?",
      a: ["Learning dinosaur facts", "Adventure, discovery, and courage",
          "Solving a mystery", "Traveling through time"], c: 1,
      why_ko: "모험, 발견, 용기예요. 공룡이 나오지만 진짜 핵심은 아이들의 용감한 마음과 신비한 나무 집이에요.",
      why: "Adventure through time, discovering new worlds, and being brave enough to face danger. The dinosaurs are exciting, but the real story is about the magic." }
  ],

  // ── ③ 요약 지도 ────────────────────────────────────────────
  summaryMap: {
    setting: { place: "{{the magic tree house, the dinosaur forest}}", time: "{{modern day, then millions of years ago}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie of Frog Creek, Pennsylvania}}" },
      { k: "Wanted",   v: "{{to explore the magic tree house and find out who the medallion belonged to}}" },
      { k: "But",      v: "{{the dinosaur book took them back in time to a dangerous world}}" },
      { k: "So",       v: "{{they had to escape from the Tyrannosaurus and find a way home}}" },
      { k: "Then",     v: "{{they used the Pennsylvania book to return home safely}}" }
    ],
    scenes: [
      { label: "Discovery",
        given: "Jack and Annie find a strange tree house on a hill.",
        frame: "Inside {{they find the tree house full of books}}." },
      { label: "The Book",
        given: "",
        frame: "When {{Jack opens the dinosaur book}}, {{it takes them back millions of years}}." },
      { label: "Dinosaurs",
        given: "They see many dinosaurs in the ancient forest.",
        frame: "They {{see Pteranodon}}, {{Triceratops}}, and {{a duck-billed dinosaur}}." },
      { label: "The Chase",
        given: "A big Tyrannosaurus starts chasing them.",
        frame: "Jack {{runs back to the tree}}, and {{a Pteranodon saves him}}." },
      { label: "Home",
        given: "They find the Pennsylvania book in the tree house.",
        frame: "They {{use it to go back to their own time}}, {{safe and excited about their next adventure}}." }
    ]
  },

  // ── ④ 마인드맵 ────────────────────────────────────────────
  mindMap: {
    center: "Dinosaurs Before Dark",
    branches: [
      { label: "Jack",        ask: "What kind of person is Jack? Is he brave or careful?",
        deeper: "What does Jack do when he is scared?" },
      { label: "Annie",       ask: "How is Annie different from Jack?",
        deeper: "Who is more curious about the dinosaurs?" },
      { label: "The Tree",    ask: "What can the magic tree house do?",
        deeper: "How does the book make them travel?" },
      { label: "Dinosaurs",   ask: "Which dinosaur is the most dangerous?",
        deeper: "Which dinosaur helps them?" },
      { label: "The Mystery", ask: "Who is M and why did they leave the medallion?",
        deeper: "Will Jack and Annie find out?" },
      { label: "Me",          ask: "Would you travel back in time if you could?",
        deeper: "Would you be brave enough?" }
    ]
  },

  // ── ⑤ IB 탐구 ────────────────────────────────────────────
  ib: {
    keyConcept: "Discovery",
    relatedConcepts: ["Exploration", "Time", "Courage"],
    globalContext: "Orientation in space and time — how different time periods are different from our own",
    statement: "Adventure happens when curiosity meets courage, even when there is real danger.",
    factual: [
      "What do Jack and Annie find in the tree house?",
      "What time period does the book take them to?"
    ],
    conceptual: [
      "Why did Jack and Annie go into the forest even though it was dangerous?",
      "How is the dinosaur time different from their Pennsylvania home?"
    ],
    debatable: [
      "Should children explore dangerous places?",
      "Is courage more important than safety?"
    ],
    learnerProfile: ["Curious", "Brave", "Adventurous", "Thoughtful"]
  },

  // ── ⑥ 논술형 ────────────────────────────────────────────
  essay: {
    prompt: "Jack and Annie traveled back in time to the dinosaur age. Do you think they should have gone? Tell why or why not.",
    conditions: [
      "4문장 이상 쓸 것 · Write at least 4 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 쓸 것 · Use \"because\" once",
      "책의 한 부분을 넣을 것 · Use one part from the book"
    ],
    steps: [
      { part: "Title",     ask: "What is your writing about?",
        eg: "Should They Go to the Dinosaurs?", lines: 1 },
      { part: "Opinion",   ask: "Should they have gone? Yes or no?",
        eg: "I think they should have gone.", lines: 2 },
      { part: "Reason",    ask: "Why do you think so?",
        eg: "This is because they were brave and wanted to explore.", lines: 2 },
      { part: "Example",   ask: "What part of the book shows this?",
        eg: "They went to the forest and saw many dinosaurs.", lines: 2 },
      { part: "Ending",    ask: "Say your opinion again.",
        eg: "So I think they should have gone.", lines: 1 }
    ],
    expressions: [
      "I think they should / should not have gone.",
      "This is because ...",
      "In the book, ...",
      "So I think ..."
    ],
    rubric: [
      { c: "의견",  d: "yes 또는 no 를 분명히 했나요? · Did I pick a side?" },
      { c: "까닭",  d: "왜 그렇게 생각하는지 말했나요? · Did I give a reason?" },
      { c: "근거",  d: "책에서 한 가지를 썼나요? · Did I use the book?" },
      { c: "글씨",  d: "대문자와 마침표를 다시 봤나요? · Did I check capitals and periods?" }
    ]
  },

  // ── ⑦ 교사용 ────────────────────────────────────────────
  teaching: {
    goal: {
      en: "Students retell the story and explain whether they would travel through time like Jack and Annie.",
      ko: "이야기를 다시 말하고, 자신도 잭과 애니처럼 시간 여행을 할 건지 자기 생각을 말한다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "If you could travel back in time, where would you go?",
        do: "책을 펴기 전에 아이의 상상부터 꺼낸다. 다섯 명쯤.",
        exp: "I would go to see the dinosaurs.",
        stuck: "선생님이 먼저 말한다. \"I would go to ancient Egypt.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning. I say the Korean, you say the English.",
        do: "숙제 확인. 열 개 중 다섯 개만.",
        exp: "공룡 → dinosaur / 마법 → magic / 위험 → danger",
        stuck: "예문을 읽어 준다." },

      { stage: "Comprehension", min: "12~25분",
        say: "Read the question. Turn it into the first half of your answer.",
        do: "화살표로 한 번 보여 준다.",
        exp: "They found the tree on a hill near the woods.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Grammar", min: "25~35분",
        say: "Look at the red words. Read them out loud. What changed?",
        do: "규칙을 먼저 말하지 않는다. 아이가 먼저 알아차리게.",
        exp: "They end with -ed. They are past tense.",
        stuck: "원형을 만든다. \"find → found / go → went\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then YOU TRY. Write one sentence with a past verb.",
        do: "한 문장만 쓰면 끝.",
        exp: "Jack found a book in the tree.",
        stuck: "주어를 준다. \"Jack {{___}} ... Annie {{___}} ...\"" },

      { stage: "Summary Map", min: "35~43분",
        say: "Somebody — Wanted — But — So — Then. The whole book in five boxes.",
        do: "다섯 칸을 손가락으로 짚으며 외운다.",
        exp: "Somebody: Jack and Annie / Wanted: to explore the tree house",
        stuck: "\"Who are they? What do they want?\" 첫 두 칸만." },

      { stage: "Mind Map", min: "43~53분",
        say: "Top lines first. Those answers are in the book. Go fast.",
        do: "윗줄은 5분.",
        stuck: "한 가지를 고르고 같이 채운다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow. Don't tell me what happened — tell me what it MEANS.",
        do: "→ 칸에서 멈춘다.",
        exp: "It means they were brave even though they were scared.",
        stuck: "\"You told me the action. Now — so what? Why?\"" },

      { stage: "IB Inquiry", min: "53~61분",
        say: "Should children be brave or should they be careful? Pick one.",
        do: "1·2단은 말로. 3단만 글로.",
        exp: "Children should be brave because it helps them learn.",
        stuck: "손을 들게 한다. \"Brave? Careful?\" 몸으로 정하면 글이 나온다." },

      { stage: "Writing", min: "61~73분",
        say: "Read the four conditions out loud with me.",
        do: "조건 넷을 소리 내어 읽는다.",
        stuck: "조건을 손가락으로 세게 한다." },

      { stage: "Wrap-up", min: "73~78분",
        say: "One person, read your first sentence. Just the first one.",
        do: "첫 문장만 발표.",
        stuck: "자원자가 없으면 선생님이 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "If you could travel in time, what time would you visit?", ko: "시간 여행을 할 수 있다면 언제로 가고 싶니?" },
        { en: "Are you afraid of dinosaurs? Why or why not?", ko: "공룡이 무서워? 왜?" },
        { en: "Would you explore a dangerous place with a friend?", ko: "위험한 곳을 친구와 탐험할까?" }
      ],
      during: [
        { en: "Do you think the tree is really magic?", ko: "그 나무가 진짜 마법일까?" },
        { en: "Would you do what Annie did if you saw a Tyrannosaurus?", ko: "티라노사우루스를 봤다면 넌 어떻게 했을까?" }
      ],
      after: [
        { en: "Should Jack and Annie have gone to the dinosaur time?", ko: "잭과 애니가 공룡 시대로 갔어야 할까?" },
        { en: "What do you think will happen next?", ko: "다음엔 뭐가 일어날 것 같니?" },
        { en: "Would you use the magic tree if you found it?", ko: "넌 그 마법의 나무를 찾았다면 쓸까?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "숙제로 세 번 읽어 오게 한다.", miss: "뜻만 외운다." },
      { sheet: "Comprehension", point: "질문을 문장으로 바꾸기부터.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",      point: "빨간 부분만 읽는다. 규칙은 아이가.", miss: "규칙을 읽어 주려 한다." },
      { sheet: "Summary Map",   point: "SWBST를 먼저. 장면은 그 다음.", miss: "책에서 베낀다." },
      { sheet: "Mind Map",      point: "→ 칸에서 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상을 쓴다." }
    ],
    scoring: [
      { c: "의견 Opinion",     pt: 5, yes: "yes 또는 no 를 분명히 했다", no: "둘 다 괜찮다는 식으로 썼다" },
      { c: "까닭 Reason",      pt: 5, yes: "왜 그렇게 생각하는지 말했다", no: "까닭이 없다" },
      { c: "근거 Example",     pt: 5, yes: "책에서 한 부분을 썼다", no: "책과 상관없다" },
      { c: "글씨 Writing",     pt: 5, yes: "대문자·마침표를 다시 봤다", no: "빠진 부분이 있다" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "잭과 애니가 공룡 시대로 가는 장면", "text": "Jack and Annie find a tree house in the [[woods|forest]]. It is full of books! They open a book about dinosaurs and make a wish. The [[enchanted|magic]] tree house spins, and they land in the time of the dinosaurs. Jack finds a gold medallion. Then a huge Tyrannosaurus comes. It is a big [[threat|danger]]! A Pteranodon helps Jack [[get away|escape]], and they [[dash|run]] up the ladder. They wish on a book about Frog Creek and go home."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Where We Are in Place and Time",
 "themeKo": "우리가 속한 공간과 시간",
 "profile": [
  {
   "attr": "Inquirer",
   "how": "Like Jack, write down facts and check them in a book."
  },
  {
   "attr": "Risk-taker",
   "how": "Like Annie, step forward bravely, then talk about when brave becomes careless."
  }
 ],
 "hook": [
  "A closed box labeled 'Tree House': if one book could take you anywhere, where?",
  "Show a timeline rope: where are we, and where were the dinosaurs?"
 ],
 "connections": [
  {
   "subject": "Science",
   "idea": "Dinosaurs and fossils: plant eaters and meat eaters."
  },
  {
   "subject": "History",
   "idea": "A long timeline: dinosaurs, castles, grandparents, now."
  },
  {
   "subject": "Research skills",
   "idea": "Keep a fact notebook like Jack's: one fact, one picture."
  }
 ],
 "speaking": [
  "Think-Pair-Share: are you more like Jack or Annie? Why?",
  "Be a time-travel guide: describe what you see, hear and smell."
 ],
 "writing": [
  "Write Jack's notebook page for one dinosaur.",
  "Write where the tree house should go next, and why."
 ]
};
