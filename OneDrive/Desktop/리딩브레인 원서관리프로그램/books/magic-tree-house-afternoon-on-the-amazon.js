// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 2.6)
// Afternoon on the Amazon (Magic Tree House #6) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3252.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭(여덟 살) / 여동생 애니(일곱 살) / 생쥐 피넛(Peanut) / 마법의 나무 집을 타고 /
//   아마존 열대우림(Amazon rain forest)으로 가서 / 길을 잃는다 / 거기에는 사나운 야생 동물이 산다 /
//   소개글이 이름을 댄 동물 넷 — giant ants · flesh-eating piranhas · hungry crocodiles · wild jaguars /
//   책의 첫 문장은 "Hurry, Jack!" shouted Annie.
// 결말은 근거가 말하지 않는다. 장서 요약이 "Will they find their way back home?" 이라는
// 물음에서 멈춘다. 그래서 evidence.ending 에 그대로 적어 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3252",
  slug: "magic-tree-house-afternoon-on-the-amazon",
  title: "Afternoon on the Amazon",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #6",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권과 같이 맞췄다.
  level: { ar: "2.6", lexile: "510L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/7283554-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3252 요약 + 오픈라이브러리 /works/OL69763W (소개글 · 첫 문장 \"Hurry, Jack!\" shouted Annie. · 주제어 Rain forests/Rain forest animals/Tree houses/Magic/Time travel/Adventure and adventurers · 장소 Amazon River Valley · 70쪽 · 1995년)",
    characters: ["Jack", "Annie", "Peanut the mouse"],
    beats: [
      "Jack (eight), his seven-year-old sister Annie, and Peanut the mouse ride in the magic tree house",
      "the tree house takes them to the Amazon rain forest, where they find themselves lost",
      "fierce wild animals live there — giant ants, flesh-eating piranhas, hungry crocodiles, and wild jaguars"
    ],
    ending: "근거에 결말이 없다. 장서 요약이 \"Will they find their way back home?\" 이라는 물음에서 멈추고, 소개글도 동물들을 만나는 데서 멈춘다. 두 아이와 생쥐가 집으로 돌아가는지, 어떻게 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"Jack, Annie, and Peanut the mouse\", \"a magic tree house\", \"lost in the Amazon rainforest\", \"fierce wild animals\")과 소개글(\"Eight-year-old Jack, his seven-year-old sister, Annie, and Peanut the mouse\", \"ride in a tree house to the Amazon rain forests\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(잭 여덟 살 · 애니 일곱 살 · 동물 네 종류의 이름)은 요약과 부딪히지 않아 남겼다. 주제어 Rain forests/Rain forest animals/Tree houses/Time travel 과 장소 Amazon River Valley 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 여기 밖의 사건·인물·결말은 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Afternoon on the Amazon\" read aloud",
    searchUrl: "https://youtu.be/2fMzYq7a1xk",
    videos: [
      { url: "https://youtu.be/2fMzYq7a1xk", title: "The Magic Treehouse Series #6 Afternoon On The Amazon\" Read Aloud",
        channel: "Faerie Book Mama", views: "47,949", length: "31:30" },
      { url: "https://youtu.be/HJgwjP5JAiU", title: "Afternoon on the Amazon - Magic Tree House 6 - Audiobook",
        channel: "Triple A English 👏", views: "5,615", length: "38:51" },
      { url: "https://youtu.be/hpE-7oGsL7A", title: "Magic Tree House |#6 Afternoon on the Amazon | MARY POPE OSBORNE | New York Times Bestselling Series",
        channel: "EUNICE books and words", views: "23,218", length: "34:12" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "rain forest", pos: "n.",   en: "a thick, wet forest where it rains a lot and many animals live", ko: "열대우림",
      ex: "The tree house takes them to the Amazon {{rain forest}}.", ex_ko: "나무 집은 그들을 아마존 열대우림으로 데려가요.", pic: "🌴" },
    { word: "lost",        pos: "adj.", en: "not knowing where you are or how to get back", ko: "길을 잃은",
      ex: "In the rain forest, Jack and Annie are {{lost}}.", ex_ko: "열대우림에서 잭과 애니는 길을 잃어요.", pic: "🧭" },
    { word: "fierce",      pos: "adj.", en: "wild and dangerous, ready to attack", ko: "사나운",
      ex: "The rain forest is full of {{fierce}} wild animals.", ex_ko: "열대우림에는 사나운 야생 동물이 가득해요.", pic: "😾" },
    { word: "jaguar",      pos: "n.",   en: "a large wild cat with spots that lives in the rain forest", ko: "재규어",
      ex: "Wild {{jaguars}} live in the Amazon.", ex_ko: "아마존에는 야생 재규어가 살아요.", pic: "🐆" },
    { word: "piranha",     pos: "n.",   en: "a small river fish with sharp teeth that eats flesh", ko: "피라냐",
      ex: "Flesh-eating {{piranhas}} swim in the water.", ex_ko: "살을 먹는 피라냐가 물속에서 헤엄쳐요.", pic: "🐟" },
    { word: "crocodile",   pos: "n.",   en: "a big animal with short legs and long jaws that lives in water", ko: "악어",
      ex: "Hungry {{crocodiles}} live in rivers.", ex_ko: "배고픈 악어가 강에 살아요.", pic: "🐊" },
    { word: "giant",       pos: "adj.", en: "very, very big", ko: "거대한",
      ex: "Jack and Annie meet {{giant}} ants.", ex_ko: "잭과 애니는 거대한 개미를 만나요.", pic: "🐘" },
    { word: "mouse",       pos: "n.",   en: "a very small animal with soft fur and a long thin tail", ko: "생쥐",
      ex: "Peanut the {{mouse}} travels with Jack and Annie.", ex_ko: "생쥐 피넛이 잭과 애니와 함께 가요.", pic: "🐭" },
    { word: "hurry",       pos: "v.",   en: "to move or do something quickly", ko: "서두르다",
      ex: "The book begins, \"{{Hurry}}, Jack!\"", ex_ko: "책은 \"서둘러, 잭!\" 하고 시작해요.", pic: "⏰" },
    { word: "shout",       pos: "v.",   en: "to say something in a very loud voice", ko: "소리치다, 외치다",
      ex: "Annie {{shouted}} to her brother.", ex_ko: "애니가 오빠에게 소리쳤어요.", pic: "📣" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // "Hurry, Jack!" shouted Annie. 만은 책의 첫 문장이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Plural -s", ko: "복수형",
        sent: "Jack and Annie meet giant [[ants]], hungry [[crocodiles]], and wild [[jaguars]].",
        why_ko: "하나가 아니라 여럿이면 이름씨 뒤에 -s 를 붙여요. ant → ants, jaguar → jaguars. 동물이 한 마리가 아니라 여러 마리라는 표시예요.",
        why: "Add -s to a noun when there is more than one: ant → ants, jaguar → jaguars.",
        try: "I have two {{books}} and three {{pens}}." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Annie [[shouted]] to Jack, and they [[traveled]] to the Amazon rain forest.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. shout → shouted, travel → traveled.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} home and {{opened}} the door." },
      { name: "Imperative", ko: "명령문",
        sent: "The book begins, \"[[Hurry]], Jack!\" A command has no subject — just the plain verb.",
        why_ko: "명령문은 주어 없이 동사원형으로 시작해요. \"Hurry!\" 는 '서둘러!' 라는 뜻이에요. -s 도 -ing 도 붙이지 않아요.",
        why: "A command starts with the plain verb and has no subject: \"Hurry!\"",
        try: "{{Look}} at the jaguar! {{Run}} to the tree house!" }
    ],
    find: "책에서 -s 로 끝나는 복수 이름씨(동물 이름)를 세 개 찾아 쓰세요. · Find three plural animal nouns ending in -s.",
    exam: {
      choose: [
        { q: "Jack and Annie meet giant (ant / ants).", a: "ants",
          why_ko: "개미가 한 마리가 아니에요. 소개글에도 giant ants 라고 여럿으로 적혀 있어요." },
        { q: "Flesh-eating (piranha / piranhas) swim in the water.", a: "piranhas",
          why_ko: "피라냐가 여러 마리예요. 여럿이면 -s 를 붙여 piranhas." },
        { q: "Annie (shout / shouted) \"Hurry, Jack!\"", a: "shouted",
          why_ko: "책의 첫 문장이 shouted 예요. 이미 일어난 일이라 과거형이에요." },
        { q: "Jack and Annie (travel / traveled) to the Amazon rain forest.", a: "traveled",
          why_ko: "아마존에 간 것은 지난 일이에요. travel 의 과거형은 traveled." },
        { q: "(Hurry / Hurries), Jack!", a: "Hurry",
          why_ko: "명령문은 동사원형 그대로예요. 주어가 없으니 -s 를 붙이지 않아요." }
      ],
      fix: [
        { q: "Annie [[shout]] to Jack at the very beginning of the book.", a: "shouted",
          why_ko: "책의 첫 문장은 \"Hurry, Jack!\" shouted Annie. 예요. 과거형 shouted 로 고쳐요." },
        { q: "They meet wild [[jaguar]] in the rain forest.", a: "jaguars",
          why_ko: "소개글은 wild jaguars 라고 여럿으로 말해요. -s 를 붙여 jaguars." },
        { q: "[[Hurrying]], Jack!", a: "Hurry",
          why_ko: "명령문은 -ing 가 아니라 동사원형으로 시작해요. Hurry, Jack!" }
      ],
      write: [
        { ko: "그들은 아마존 열대우림에서 길을 잃었다.", cond: "get lost, 과거형", a: "They got lost in the Amazon rain forest.",
          why_ko: "get 의 과거형은 got 이에요. got lost 가 '길을 잃었다' 예요." },
        { ko: "서둘러, 잭!", cond: "명령문", a: "Hurry, Jack!",
          why_ko: "명령문은 주어 없이 동사원형으로 시작해요. 책의 첫 문장 그대로예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who travels in this book?",
      frame: "They are {{Jack (eight), his seven-year-old sister Annie, and Peanut the mouse}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What do they ride in, and where does it take them?",
      frame: "They ride in {{a magic tree house}}, and it takes them to {{the Amazon rain forest}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What happens to them in the rain forest, and what kind of animals live there?",
      frame: "They find themselves {{lost}}, and {{fierce wild}} animals live there." },
    { ref: "책 첫 문장", skill: "어휘", q: "The book begins, \"Hurry, Jack!\" shouted Annie. What does the word \"Hurry\" tell you about that moment?",
      frame: "It tells me {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "Our summary ends with the question \"Will they find their way back home?\" What is the big problem of this story?",
      frame: "The big problem is that {{they are lost in the Amazon rain forest}}." },
    { ref: "책 전체", skill: "추론·예측", q: "Peanut is only a mouse. Why do you think a mouse comes along on this adventure?",
      frame: "I think it is because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If the tree house left you in the Amazon rain forest for one afternoon, what would you do first? Say why.",
      frame: "First, I would {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who travels with Jack and Annie in this book?",
      a: ["A dog", "Peanut the mouse", "A parrot", "Their father"], c: 1,
      why_ko: "생쥐 피넛(Peanut the mouse)이에요. 장서 요약과 소개글이 둘 다 \"Peanut the mouse\" 라고 적어요.",
      why: "Peanut the mouse. Both the catalog summary and the description name him." },
    { q: "How old is Jack in this story?",
      a: ["Five", "Six", "Eight", "Twelve"], c: 2,
      why_ko: "소개글이 \"Eight-year-old Jack\" 이라고 적고 있어요. 여덟 살이에요.",
      why: "The description begins \"Eight-year-old Jack.\"" },
    { q: "How old is Annie?",
      a: ["Seven", "Nine", "Ten", "Three"], c: 0,
      why_ko: "\"his seven-year-old sister, Annie\" — 일곱 살이에요. 잭보다 한 살 어려요.",
      why: "\"His seven-year-old sister, Annie\" — one year younger than Jack." },
    { q: "What do Jack, Annie, and Peanut ride in?",
      a: ["A boat", "A magic tree house", "An airplane", "A time machine"], c: 1,
      why_ko: "마법의 나무 집이에요. 배도 비행기도 기계도 아니에요. 요약과 소개글이 둘 다 나무 집이라고 말해요.",
      why: "A magic tree house. Both sources say the tree house." },
    { q: "Where does the tree house take them?",
      a: ["The Sahara Desert", "The Arctic", "The Amazon rain forest", "The Middle Ages"], c: 2,
      why_ko: "아마존 열대우림이에요. 오픈라이브러리의 장소 기록도 Amazon River Valley 라고 적고 있어요.",
      why: "The Amazon rain forest. Open Library also records the place as the Amazon River Valley." },
    { q: "What happens to Jack and Annie in the rain forest?",
      a: ["They go straight home", "They find themselves lost", "They fall asleep", "They build a house"], c: 1,
      why_ko: "길을 잃어요. 요약이 \"find themselves lost in the Amazon rainforest\" 라고 분명히 말해요.",
      why: "They get lost — \"find themselves lost in the Amazon rainforest.\"" },
    { q: "Which word does the catalog summary use for the wild animals there?",
      a: ["Gentle", "Fierce", "Shy", "Sleepy"], c: 1,
      why_ko: "\"fierce wild animals\" — 사나운 동물들이에요. 나머지 셋은 근거 어디에도 없어요.",
      why: "\"Fierce wild animals.\" The other three appear nowhere in our sources." },
    { q: "Which of these animals does the description name?",
      a: ["Penguins", "Polar bears", "Jaguars", "Camels"], c: 2,
      why_ko: "재규어예요. 소개글이 이름을 댄 동물은 giant ants · piranhas · crocodiles · jaguars 넷이에요.",
      why: "Jaguars. The four animals named are giant ants, piranhas, crocodiles, and jaguars." },
    { q: "What kind of ants does the description name?",
      a: ["Tiny ants", "Giant ants", "Flying ants", "Sleeping ants"], c: 1,
      why_ko: "거대한 개미(giant ants)예요. 소개글에 그대로 적혀 있어요.",
      why: "Giant ants — the description's own words." },
    { q: "How does the description describe the piranhas?",
      a: ["Friendly", "Flesh-eating", "Very slow", "Blind"], c: 1,
      why_ko: "\"flesh-eating piranhas\" — 살을 먹는 피라냐예요.",
      why: "\"Flesh-eating piranhas.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Hurry, Jack!\" shouted Annie.", "\"Jack couldn't sleep.\"", "\"It was a hot afternoon.\"", "\"The river was quiet.\""], c: 0,
      why_ko: "첫 문장은 \"Hurry, Jack!\" shouted Annie. 예요. 오픈라이브러리에 그대로 적혀 있어요. 애니가 서두르라고 외치며 이야기가 시작돼요.",
      why: "\"Hurry, Jack!\" shouted Annie. That is the recorded first line of the book." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#1", "#2", "#6", "#10"], c: 2,
      why_ko: "6권이에요. 장서 목록 제목이 \"#06. Afternoon on the Amazon\" 이고 요약 끝에도 Book #6 라고 적혀 있어요.",
      why: "Book #6 — the catalog title is \"#06. Afternoon on the Amazon.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who travels in the tree house", "Where the tree house takes them", "How the story ends", "What animals they meet"], c: 2,
      why_ko: "결말이에요. 우리가 가진 요약은 \"Will they find their way back home?\" 이라는 물음에서 멈춰요. 어떻게 끝나는지는 책을 읽어야 알 수 있어요.",
      why: "The ending. Our summary stops at the question \"Will they find their way back home?\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(때·바람·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{the Amazon rain forest}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack, his younger sister Annie, and Peanut the mouse}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 세 일행이 무엇을 바랐는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "But",      v: "{{they got lost in the Amazon rain forest}}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "Jack, Annie, and Peanut the mouse ride in the magic tree house.",
        frame: "The tree house takes them to {{the Amazon rain forest}}." },
      { label: "Lost",
        given: "",
        frame: "In the rain forest they find themselves {{lost}}." },
      { label: "The Animals",
        given: "",
        frame: "Fierce wild animals live there: {{giant ants}}, {{piranhas}}, {{crocodiles}}, and {{jaguars}}." },
      { label: "The Ending",
        given: "우리 자료는 \"집으로 돌아갈 수 있을까?\" 라는 물음까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Afternoon on the Amazon",
    branches: [
      { label: "Jack",           ask: "Jack is eight. In the book's first sentence, Annie is shouting at him to hurry. What does that tell you about him?",
        deeper: "Why do you think a book would open with someone calling your name?" },
      { label: "Annie",          ask: "Annie is seven, one year younger than Jack, and she speaks the book's first words. What kind of sister is she?",
        deeper: "Does the younger one in a family always have to follow?" },
      { label: "Peanut",         ask: "Peanut the mouse goes with them. What can a tiny animal do that two children cannot?",
        deeper: "Why would a story give the children a small companion instead of a big, strong one?" },
      { label: "The Rain Forest", ask: "What do you picture when you hear \"the Amazon rain forest\"?",
        deeper: "Why is a place so full of life also a hard place to be lost in?" },
      { label: "The Animals",    ask: "Giant ants, piranhas, crocodiles, jaguars. What do these four have in common?",
        deeper: "Are these animals fierce — or are they simply at home, while Jack and Annie are not?" },
      { label: "Me",             ask: "If you were lost in a rain forest for one afternoon, what would you look for first?",
        deeper: "What is the difference between being brave and being careless?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Environment", "Danger", "Survival"],
    globalContext: "Sharing the planet — 사람과 야생 동물은 같은 곳에서 어떻게 지내는가",
    statement: "A rain forest is home to its animals, and a visitor who gets lost there has to move through someone else's home.",
    factual: [
      "Who rides in the magic tree house in this book?",
      "Where does the tree house take them?",
      "What happens to them in the rain forest, and what animals live there?"
    ],
    conceptual: [
      "Why is being lost more frightening in a wild place than in a town?",
      "What makes us call an animal \"fierce\"?"
    ],
    debatable: [
      "Should people visit wild places where dangerous animals live?",
      "Is an animal that attacks a person doing something wrong?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "사나운 야생 동물이 사는 아마존에서 길을 잃는다" 까지만 말한다.
    // 그래서 옳고 그름의 판단을 아이에게 맡기는 물음으로 세웠다.
    prompt: "Jack, Annie, and Peanut get lost in the Amazon rain forest, where fierce wild animals live. Should people visit wild places like that? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "책에 나오는 동물 한 가지를 넣을 것 · Use one animal from the book"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Into the Rain Forest", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people should visit wild places, but only with a guide.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie get lost in the Amazon and meet wild jaguars.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows a wild place can turn dangerous very fast.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say wild places are too risky, but we learn by seeing them.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe we should visit carefully, not never.", lines: 2 }
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
      en: "Students retell how Jack, Annie, and Peanut ride the magic tree house to the Amazon rain forest, get lost, and meet fierce animals, then take a side on visiting wild places.",
      ko: "잭과 애니와 생쥐 피넛이 마법의 나무 집으로 아마존 열대우림에 가서 길을 잃고 사나운 동물들을 만나는 흐름을 말하고, 야생의 장소를 찾아가는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever been lost, even for a short time? Where were you?",
        do: "책을 펴기 전에 한다. '길을 잃음'을 아이 입에서 먼저 꺼내야 이 책이 읽힌다. 서너 명만.",
        exp: "I was lost in a big store. / I lost my mom at the market.",
        stuck: "선생님이 먼저 한 문장 한다. \"Once I was lost at the subway station.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Afternoon on the Amazon.\" What is the Amazon?",
        do: "제목의 Amazon 하나만 푼다. 줄거리는 말하지 않는다.",
        exp: "It is a big river. / It is a jungle in South America.",
        stuck: "표지를 가리킨다. \"Look at the cover. What do you see around them?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "열대우림 → rain forest / 사나운 → fierce / 길을 잃은 → lost",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does it take them...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to the Amazon rain forest.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence is \"Hurry, Jack!\" shouted Annie. Not a description — someone shouting. What does that do?",
        do: "칠판에 그 문장만 쓴다. 첫 줄부터 급한 이야기라는 걸 느끼게 한다.",
        exp: "Something is happening already. / They are in a rush.",
        stuck: "\"Who is the first person to speak in this book? Is she calm?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack, Annie, Peanut / But: they got lost — Wanted·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Where do they go?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Animals)", min: "",
        say: "Stop at The Animals. Don't just list them — tell me what giant ants, piranhas, crocodiles, and jaguars have in common.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "They all live in the rain forest. / They can all hurt you. / It is their home, not ours.",
        stuck: "\"You named them. Now — why is Jack afraid of them, but they are not afraid of the forest?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should people visit wild places where dangerous animals live? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think no, because the animals live there and we do not.",
        stuck: "손을 들게 한다. \"Go into the rain forest? Or stay out?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say wild places are too dangerous, but Jack and Annie learned about the rain forest.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about the Amazon rain forest?", ko: "아마존 열대우림에 대해 이미 아는 게 있니?" },
        { en: "Have you ever been lost, even for a short time?", ko: "짧게라도 길을 잃어 본 적이 있니?" },
        { en: "Why would a mouse come along on a dangerous trip?", ko: "위험한 여행에 생쥐는 왜 따라갔을까?" }
      ],
      during: [
        { en: "Which animal do you think Jack and Annie meet first?", ko: "잭과 애니는 어떤 동물을 가장 먼저 만날 것 같니?" },
        { en: "If you were lost there, would you walk or stay still? Why?", ko: "네가 거기서 길을 잃으면 걸을래, 가만히 있을래? 왜?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Were the animals really fierce, or just at home?", ko: "그 동물들은 정말 사나웠니, 아니면 그냥 자기 집에 있었던 걸까?" },
        { en: "Where should the tree house go next, and why?", ko: "나무 집은 다음에 어디로 가야 할까? 왜?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "동물 이름 철자(piranha, crocodile, jaguar)는 5분 제한에서 특히 오래 걸린다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Animals' 가지에서 반드시 멈춘다.", miss: "→ 칸에 동물 이름만 또 늘어놓는다." },
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
    scene: "잭과 애니와 생쥐 피넛이 마법 나무집을 타고 아마존 열대우림으로 가서 길을 잃는 이야기",
    text: "\"[[Be quick|Hurry]], Jack!\" [[called|shouted]] Annie. Jack, his seven-year-old sister Annie, and Peanut the [[little animal|mouse]] rode in the magic tree house. It carried them to the Amazon [[jungle|rain forest]]. Soon the three of them were [[far from the way home|lost]]. All around lived [[wild and dangerous|fierce]] animals — [[huge|giant]] ants, piranhas, crocodiles, and [[spotted wild cats|jaguars]]. Will they find their way back home? Open the book and find out."
  }
};
