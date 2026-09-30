// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Viking Ships at Sunrise (Magic Tree House #15) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3260.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 배경 지명)만으로 만들었다. 그 밖의 인물 이름·
// 수도사·마을·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지
// 않고 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 중세 아일랜드의 수도원(a monastery in medieval
//   Ireland)으로 데려간다 / 거기서 잃어버린 책 한 권을 되찾으려 한다 /
//   그러는 내내 바이킹 침입자들(Viking raiders)에게 위협을 받는다 /
//   책의 첫 문장은 "Jack opened his eyes."
// 그 책이 무슨 책인지, 두 아이가 그것을 되찾았는지, 어떻게 집으로 돌아가는지는 근거가
// 말하지 않는다. 장서 요약도 소개글도 "menaced by Viking raiders" 에서 끊긴다.
// 그래서 비워 두었다. 10권과 달리 이 책 근거에는 모건(Morgan)도, 연도도 나오지 않아
// 학습지 어디에도 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3260",
  slug: "magic-tree-house-viking-ships-at-sunrise",
  title: "Viking Ships at Sunrise",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #15",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "570L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424173-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·배경 지명을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3260 요약 + 오픈라이브러리 /works/OL81818W (소개글 · 첫 문장 \"Jack opened his eyes.\" · 주제어 Tree houses/Vikings/Monasteries/Ireland/Magic/Juvenile fiction · 배경 Ireland · 80쪽 · 1998년)",
    characters: ["Jack", "Annie", "Viking raiders"],
    beats: [
      "their magic tree house transports Jack and Annie back to a monastery in medieval Ireland",
      "there they attempt to retrieve a lost book",
      "all the while they are being menaced by Viking raiders"
    ],
    ending: "근거에 결말이 없다. 장서 요약도 소개글도 \"while being menaced by Viking raiders\" 에서 멈춘다. 잃어버린 책이 무슨 책인지, 두 아이가 그 책을 되찾았는지, 바이킹 침입자들에게서 어떻게 벗어나는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"transports Jack and Annie back to a monastery in medieval Ireland\", \"attempt to retrieve a lost book\", \"being menaced by Viking raiders\", \"Book #15\")과 소개글(\"takes Jack and Annie back to a monastery in medieval Ireland\", \"try to retrieve a lost book\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 두 글은 동사만 다를 뿐(transports/takes, attempt/try) 같은 내용을 말한다. 주제어 Tree houses/Vikings/Monasteries/Ireland/Magic 과 배경 지명 Ireland 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 10권 소개글에 있던 모건(Morgan)의 수수께끼는 이 책 근거 어디에도 없어 쓰지 않았다. 연도도 없다 — 'medieval(중세)' 까지가 근거가 말하는 전부라 특정 해를 적지 않았다. 수도원이 나오지만 수도사가 등장하는지는 어느 출처도 말하지 않아 인물에 넣지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Viking Ships at Sunrise\" read aloud",
    searchUrl: "https://youtu.be/dBgSh4vmgJY",
    videos: [
      { url: "https://youtu.be/dBgSh4vmgJY", title: "Magic Tree House | #15 Viking Ships at Sunrise | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "15,424", length: "41:56" },
      { url: "https://youtu.be/bSLX1t997SE", title: "Viking Ships at Sunrise - Magic Tree House Audiobook #15",
        channel: "Triple A English", views: "1,310", length: "40:47" },
      { url: "https://youtu.be/_nnDN83tVug", title: "MAGIC TREE HOUSE VIKING SHIPS AT SUNRISE #1",
        channel: "tina shin.English book reader", views: "270", length: "11:51" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "Viking",     pos: "n.",   en: "one of the sea warriors from the north who sailed to other lands long ago", ko: "바이킹",
      ex: "Jack and Annie are menaced by {{Viking}} raiders.", ex_ko: "잭과 애니는 바이킹 침입자들에게 위협을 받아요.", pic: "🪓" },
    { word: "ship",       pos: "n.",   en: "a large boat that can carry people across the sea", ko: "배",
      ex: "The title of this book is \"Viking {{Ships}} at Sunrise.\"", ex_ko: "이 책의 제목은 '해 뜰 녘의 바이킹 배' 예요.", pic: "⛵" },
    { word: "sunrise",    pos: "n.",   en: "the time in the morning when the sun comes up", ko: "해돋이, 해 뜰 녘",
      ex: "The Viking ships come at {{sunrise}}.", ex_ko: "바이킹 배들은 해 뜰 녘에 옵니다.", pic: "🌅" },
    { word: "monastery",  pos: "n.",   en: "a quiet building where monks live, pray, and keep books", ko: "수도원",
      ex: "The tree house takes them to a {{monastery}}.", ex_ko: "나무 집은 그들을 수도원으로 데려갑니다.", pic: "⛪" },
    { word: "medieval",   pos: "adj.", en: "belonging to the Middle Ages, a time long, long ago", ko: "중세의",
      ex: "The story happens in {{medieval}} Ireland.", ex_ko: "이야기는 중세 아일랜드에서 펼쳐져요.", pic: "🏰" },
    { word: "retrieve",   pos: "v.",   en: "to find something that was lost and bring it back", ko: "되찾아 오다",
      ex: "They try to {{retrieve}} a lost book.", ex_ko: "그들은 잃어버린 책을 되찾으려 해요.", pic: "🔎" },
    { word: "lost",       pos: "adj.", en: "not able to be found; missing", ko: "잃어버린",
      ex: "Jack and Annie look for a {{lost}} book.", ex_ko: "잭과 애니는 잃어버린 책을 찾습니다.", pic: "📖" },
    { word: "raider",     pos: "n.",   en: "someone who comes suddenly to attack a place and take things", ko: "침입자, 습격자",
      ex: "Viking {{raiders}} come to the monastery.", ex_ko: "바이킹 침입자들이 수도원에 옵니다.", pic: "⚔️" },
    { word: "menace",     pos: "v.",   en: "to frighten someone by looking as if you will hurt them", ko: "위협하다",
      ex: "The raiders {{menace}} Jack and Annie.", ex_ko: "침입자들이 잭과 애니를 위협해요.", pic: "😨" },
    { word: "transport",  pos: "v.",   en: "to carry someone or something from one place to another", ko: "실어 나르다, 데려가다",
      ex: "The magic tree house {{transports}} them back in time.", ex_ko: "마법의 나무 집이 그들을 과거로 데려갑니다.", pic: "🌀" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // opened 만은 책의 첫 문장("Jack opened his eyes.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"Jack [[opened]] his eyes.\"",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. open → opened, want → wanted.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{opened}} the door and {{walked}} inside." },
      { name: "to + verb", ko: "to부정사",
        sent: "Jack and Annie try [[to retrieve]] a lost book.",
        why_ko: "try, want, hope 뒤에 또 동사가 올 때는 to + 동사원형이에요. try to retrieve, want to go.",
        why: "After verbs like try, want and hope, use \"to\" plus the base verb.",
        try: "I want {{to read}} this book and {{to find}} the answer." },
      { name: "be + p.p. + by", ko: "수동태",
        sent: "Jack and Annie [[are menaced]] by Viking raiders.",
        why_ko: "'내가 ~한다'가 아니라 '내가 ~을 당한다'일 때는 be동사 + 과거분사를 써요. 누가 했는지는 by 뒤에 붙여요.",
        why: "Use be + past participle when something is done TO the subject. Put the doer after \"by.\"",
        try: "The monastery {{is attacked}} by raiders, and the book {{is lost}}." }
    ],
    find: "책에서 to + 동사원형이 들어간 문장을 세 개 찾아 쓰세요. · Find three sentences with \"to\" + verb.",
    exam: {
      choose: [
        { q: "Jack (open / opened) his eyes.", a: "opened",
          why_ko: "책의 첫 문장이에요. 이미 일어난 일이니 과거형 opened 예요." },
        { q: "The magic tree house (take / took) them back in time.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "Jack and Annie try (retrieve / to retrieve) a lost book.", a: "to retrieve",
          why_ko: "try 뒤에 동사가 또 오면 to + 동사원형이에요." },
        { q: "Jack and Annie were (menace / menaced) by Viking raiders.", a: "menaced",
          why_ko: "두 아이가 위협을 '당한' 거예요. be동사 뒤에는 과거분사 menaced 가 와요." },
        { q: "Jack and Annie (was / were) menaced by Viking raiders.", a: "were",
          why_ko: "Jack and Annie 는 두 사람, 복수예요. 복수 주어의 과거 be동사는 were." }
      ],
      fix: [
        { q: "Jack [[open]] his eyes at the start of the book.", a: "opened",
          why_ko: "이미 지난 일이에요. open 에 -ed 를 붙여 opened!" },
        { q: "The magic tree house [[take]] them to a monastery in medieval Ireland.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 took." },
        { q: "They tried [[retrieve]] a lost book.", a: "to retrieve",
          why_ko: "try 뒤에는 to + 동사원형이 와요. tried to retrieve." }
      ],
      write: [
        { ko: "잭은 눈을 떴다.", cond: "open, 과거형", a: "Jack opened his eyes.",
          why_ko: "'떴다'는 과거예요. open 에 -ed 를 붙여 opened. 책의 첫 문장 그대로예요." },
        { ko: "그들은 잃어버린 책을 되찾으려 했다.", cond: "try, retrieve, 과거형", a: "They tried to retrieve a lost book.",
          why_ko: "try 는 y 를 i 로 바꿔 tried. 뒤에는 to + 동사원형 retrieve 가 와요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what transports them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} transports them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where does the magic tree house take Jack and Annie this time?",
      frame: "It takes them to {{a monastery}} in {{medieval Ireland}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What are Jack and Annie trying to retrieve in medieval Ireland?",
      frame: "They are trying to retrieve {{a lost book}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Who menaces Jack and Annie while they search?",
      frame: "{{Viking raiders}} menace them." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Viking Ships at Sunrise.\" What does \"sunrise\" mean, and why might ships at sunrise be frightening?",
      frame: "Sunrise means {{when the sun comes up}}. Ships at sunrise might be frightening because {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "Jack and Annie search for a lost book while raiders menace them. In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Would you stay in a monastery to look for a lost book while raiders were coming? Say why.",
      frame: "I {{would / would not}} stay, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and a monk", "Annie and a Viking", "Two raiders"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"transports Jack and Annie back to a monastery\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["A magic tree house", "A Viking ship", "A horse", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 바이킹 배도 말도 기계도 아니에요. 주제어 목록에도 Tree houses 와 Magic 이 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Magic\" are both listed subjects." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To a monastery in medieval Ireland", "To the wild west", "To ancient Egypt", "To the moon"], c: 0,
      why_ko: "중세 아일랜드의 수도원이에요. 서부는 10권, 이 책은 수도원과 바이킹의 이야기예요.",
      why: "To a monastery in medieval Ireland. The wild west was book #10; this one is a monastery." },
    { q: "In which country does this story take place?",
      a: ["Ireland", "Iceland", "Egypt", "Japan"], c: 0,
      why_ko: "아일랜드예요. 요약도 소개글도 \"medieval Ireland\" 라고 적고, 배경 지명에도 Ireland 가 있어요.",
      why: "Ireland — both the summary and the listed place say so." },
    { q: "What kind of building do Jack and Annie go back to?",
      a: ["A monastery", "A castle", "A school", "A ship"], c: 0,
      why_ko: "수도원(monastery)이에요. 주제어 목록에도 Monasteries 가 있어요.",
      why: "A monastery. \"Monasteries\" is one of the listed subjects." },
    { q: "What are Jack and Annie trying to retrieve there?",
      a: ["A lost book", "A lost sword", "A lost ship", "A lost key"], c: 0,
      why_ko: "잃어버린 책 한 권이에요. 소개글이 \"try to retrieve a lost book\" 이라고 말해요.",
      why: "A lost book — the description says \"try to retrieve a lost book.\"" },
    { q: "Who menaces Jack and Annie in this story?",
      a: ["Viking raiders", "Cowboys", "Pirates", "Knights"], c: 0,
      why_ko: "바이킹 침입자들이에요. 소개글이 \"being menaced by Viking raiders\" 라고 말해요. 주제어에도 Vikings 가 있어요.",
      why: "Viking raiders. The description says \"being menaced by Viking raiders.\"" },
    { q: "What does the word \"medieval\" mean?",
      a: ["From the Middle Ages, long ago", "From today", "From the future", "From the Stone Age"], c: 0,
      why_ko: "medieval 은 '중세의', 곧 아주 오래전 중세 시대의 것이라는 뜻이에요.",
      why: "Medieval means \"of the Middle Ages\" — a time long, long ago." },
    { q: "What does \"retrieve\" mean?",
      a: ["To get something back", "To throw something away", "To hide something", "To buy something"], c: 0,
      why_ko: "retrieve 는 잃어버린 것을 찾아 되가져오는 거예요. 두 아이가 책에 하려는 일이 바로 그거예요.",
      why: "To retrieve is to find something lost and bring it back — what the children try to do." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack opened his eyes.\"", "\"Jack couldn't sleep.\"", "\"The ships came at sunrise.\"", "\"Annie ran to the tree house.\""], c: 0,
      why_ko: "첫 문장은 \"Jack opened his eyes.\" 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line of this book." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#15", "#20"], c: 2,
      why_ko: "15권이에요. 장서 목록 제목이 \"#15. Viking Ships at Sunrise\" 이고 요약 끝에도 Book #15 라고 적혀 있어요.",
      why: "Book #15 — the catalog title is \"#15. Viking Ships at Sunrise.\"" },
    { q: "In the title, what do the Vikings arrive in?",
      a: ["Ships", "Trains", "Wagons", "Balloons"], c: 0,
      why_ko: "배(ships)예요. 제목이 Viking Ships at Sunrise 예요.",
      why: "Ships. The title is \"Viking Ships at Sunrise.\"" },
    { q: "What time of day is in the title?",
      a: ["Sunrise, when the sun comes up", "Midnight", "Noon", "Sundown"], c: 0,
      why_ko: "sunrise, 해가 뜨는 아침이에요. sundown(해질녘)은 10권 제목이에요.",
      why: "Sunrise, the morning. \"Sundown\" is the title of book #10, not this one." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "What they are looking for", "Whether they get the lost book back", "Who menaces them"], c: 2,
      why_ko: "책을 되찾았는지예요. 우리가 가진 글은 '바이킹 침입자들에게 위협을 받는다' 에서 멈춰요. 그 뒤는 책을 읽어야 알 수 있어요.",
      why: "Whether they get the book back. Our sources stop at \"being menaced by Viking raiders.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(그 뒤에 벌어진 일·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{a monastery in medieval Ireland}}", time: "{{the Middle Ages}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to retrieve a lost book}}" },
      { k: "But",      v: "{{Viking raiders menaced them}}" },
      { k: "So",       v: "{{                    }}" },   // 그래서 두 아이가 무엇을 했는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house transports Jack and Annie back in time.",
        frame: "They go to {{a monastery}}, in {{medieval Ireland}}." },
      { label: "The Lost Book",
        given: "",
        frame: "There they attempt to {{retrieve}} a {{lost book}}." },
      { label: "The Raiders",
        given: "",
        frame: "All the while they are menaced by {{Viking raiders}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Viking Ships at Sunrise",
    branches: [
      { label: "Jack & Annie",  ask: "The book opens with \"Jack opened his eyes.\" What do you think he sees first?",
        deeper: "Why might a writer start a story at the moment someone wakes up?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose medieval Ireland for them?" },
      { label: "The Monastery",  ask: "A monastery is a quiet place where monks live and keep books. What would it sound like inside?",
        deeper: "Why would people long ago keep their most important books in a place like that?" },
      { label: "The Lost Book",  ask: "Jack and Annie attempt to retrieve a lost book. What makes a book worth going back in time for?",
        deeper: "If a book were lost forever, what would be lost with it?" },
      { label: "The Raiders",    ask: "Viking raiders menace Jack and Annie. How would you feel if you saw their ships at sunrise?",
        deeper: "Why is it worse to be menaced than simply to be surprised?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for medieval Ireland? Why or why not?",
        deeper: "What would you try to bring back, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Communication",
    relatedConcepts: ["Knowledge", "Courage", "Time"],
    globalContext: "Orientation in space and time — 옛 사람들은 무엇을 지키려 했고, 그것을 어떻게 남겼는가",
    statement: "People have taken great risks to save the words they did not want the world to lose.",
    factual: [
      "Where and when does the magic tree house take Jack and Annie?",
      "What are they attempting to retrieve there?",
      "Who menaces them while they search?"
    ],
    conceptual: [
      "Why would a single book be worth so much trouble?",
      "What is the difference between being frightened and being menaced?"
    ],
    debatable: [
      "Is a book worth risking your safety for?",
      "Should something be saved just because it is very old?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "바이킹 침입자들에게 위협을 받는다" 까지만 말한다. 두 아이가 책을 되찾았는지는
    // 적혀 있지 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie try to retrieve a lost book while Viking raiders menace them. Is a lost book worth that danger? Write your opinion.",
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
        eg: "I think some books are worth a little danger.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, they look for a lost book while Viking raiders menace them.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they kept searching even when the raiders were near.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say no book is worth getting hurt for, but the two stayed together.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe saving a lost book can be worth the risk.", lines: 2 }
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
      en: "Students retell how the magic tree house transports Jack and Annie to a monastery in medieval Ireland, where they attempt to retrieve a lost book while Viking raiders menace them, then take a side on whether a book is worth that danger.",
      ko: "마법의 나무 집이 잭과 애니를 중세 아일랜드의 수도원으로 데려가고, 두 아이가 바이킹 침입자들에게 위협을 받으며 잃어버린 책을 되찾으려 하는 흐름을 말하고, 책 한 권이 그만한 위험을 무릅쓸 값어치가 있는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Long ago, before printing, every book was written by hand. One book, one person, many years. What happens if that book is lost?",
        do: "책을 펴기 전에 한다. '책 한 권이 귀하다'는 감각이 없으면 이 이야기가 안 읽힌다. 서너 명만.",
        exp: "It is gone forever. / Nobody can read it again.",
        stuck: "선생님이 먼저 한 문장 한다. \"Then nobody can ever read it again.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Viking Ships at Sunrise.\" Ships at sunrise sounds beautiful. Why might it be frightening instead?",
        do: "제목 세 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Because the Vikings came to attack. / You see them coming and cannot run.",
        stuck: "표지를 가리킨다. \"Look at the cover. Who is on those ships?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "수도원 → monastery / 되찾아 오다 → retrieve / 침입자 → raider",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to a monastery in medieval Ireland.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack opened his eyes.\" Four words. Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 짧은 시작이 무엇을 여는지 보게 한다.",
        exp: "He is waking up. / We do not know where he is yet.",
        stuck: "\"You open your eyes. What is the first question in your head?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to retrieve a lost book / But: Viking raiders menaced them",
        stuck: "\"Who travels in this story? What are they looking for?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Two boxes are empty: So and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those two boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Lost Book)", min: "",
        say: "Stop at The Lost Book. Don't just tell me they looked for it — tell me what makes a BOOK worth a journey through time.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "If it is the only one, and it is gone, what is inside it is gone too.",
        stuck: "\"You told me what they did. Now — why a book, and not gold?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is a book worth risking your safety for? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie kept looking even with raiders there.",
        stuck: "손을 들게 한다. \"Go back for the book? Or run?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say no book is worth getting hurt for, but they were together.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about the Vikings?", ko: "바이킹에 대해 이미 아는 게 있니?" },
        { en: "Where would you hide something you never wanted to lose?", ko: "절대 잃고 싶지 않은 물건을 어디에 숨기겠니?" },
        { en: "A monastery keeps books. Why were books so precious long ago?", ko: "수도원은 책을 지키는 곳이야. 옛날에 책은 왜 그렇게 귀했을까?" }
      ],
      during: [
        { en: "What kind of book do you think Jack and Annie are looking for?", ko: "잭과 애니가 찾는 책은 어떤 책일 것 같니?" },
        { en: "The word is 'menaced,' not 'met.' What does that change?", ko: "'만났다'가 아니라 '위협받았다'라고 해. 무엇이 달라지니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie retrieve the lost book? What was it?", ko: "잭과 애니는 잃어버린 책을 되찾았니? 그건 무슨 책이었니?" },
        { en: "How did they get away from the Viking raiders?", ko: "두 아이는 바이킹 침입자들에게서 어떻게 벗어났니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "monastery 철자에서 멈춘다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "So·Then 두 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Lost Book' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
    scene: "잭과 애니가 마법 나무집을 타고 중세 아일랜드의 수도원으로 가는 이야기",
    text: "Jack opened his eyes. The magic tree house had [[carried|transported]] him and Annie back to a [[quiet house of monks|monastery]] in [[long-ago|medieval]] Ireland. There they tried to [[get back|retrieve]] a [[missing|lost]] book. All the while, Viking [[attackers|raiders]] [[threatened|menaced]] them. Did they find the book? Open it and read."
  }
};
