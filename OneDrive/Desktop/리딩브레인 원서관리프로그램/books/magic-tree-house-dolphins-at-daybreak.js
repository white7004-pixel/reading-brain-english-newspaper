// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.1)
// Dolphins at Daybreak (Magic Tree House #9) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/M3038.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 바다 깊은 곳으로 데려간다 /
//   둘은 수수께끼(ancient riddle)의 답을 찾는다 /
//   바다에서 돌고래 · 상어 · 문어를 만난다 (장서 요약은 "굶주린 상어와 거대한 문어"라고 적는다) /
//   책의 첫 문장은 "Jack stared out the kitchen window."
// 수수께끼의 답도, 결말도 근거가 말하지 않는다. 장서 요약은 "돌고래가 구해 줄까?" 하고
// 묻기만 하고 답하지 않는다. 그래서 evidence.ending 에 그대로 적어 두었다.
// 애니가 여동생인지 누나인지, 두 아이의 나이가 몇인지는 이 책의 근거에 없어 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3038",
  slug: "magic-tree-house-dolphins-at-daybreak",
  title: "Dolphins at Daybreak",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #9",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권(AR 2.9)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.1", lexile: "540L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424007-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 M3038 요약 + 오픈라이브러리 /works/OL81823W (소개글 · 첫 문장 \"Jack stared out the kitchen window.\" · 주제어 Magic/Marine animals/Riddles/Submarines (Ships)/Tree houses/Time travel · 73쪽 · 1997년)",
    characters: ["Jack", "Annie"],
    beats: [
      "The magic tree house whisks Jack and Annie deep into the ocean",
      "Down in the sea they search for the answer to an ancient riddle",
      "They meet dolphins, sharks and octopi — the catalog summary names a starving shark and a giant octopus"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"Will Jack and Annie end up being dinner? Or will the dolphins save the day?\" 하고 묻기만 하고 답하지 않고, 출판사 소개글은 \"수수께끼의 답을 찾는다\"는 데서 멈춘다. 수수께끼의 답이 무엇인지도 어느 출처도 말하지 않는다. 그래서 둘 다 비워 둔다",
    checked: "두 출처가 바다 생물을 조금 다르게 댄다. 장서 요약은 \"a starving shark and a giant octopus\" 둘만 대고, 출판사 소개글은 \"dolphins, sharks, and octopi\" 셋을 댄다. 둘 다 말하는 것(상어 · 문어 · 수수께끼 찾기 · 마법의 나무 집 · 바다 깊은 곳)은 확실하다고 보고 그대로 썼다. 요약에만 있는 꾸밈말(starving · giant)은 \"장서 요약이 그렇게 적는다\"는 요약 쪽 말로만 썼고, 소개글에만 있는 것(돌고래를 만난다 · ancient riddle)은 소개글 쪽 말로만 썼다. 어긋나면 요약을 따르기로 했으나 실제로 부딪히는 곳은 없었다 — 요약이 둘만 댄 것은 셋을 부정한 것이 아니고, 돌고래는 제목(Dolphins at Daybreak)과 요약의 마지막 물음에도 나온다. 주제어 Marine animals/Riddles/Magic/Tree houses/Time travel 이 같은 것을 한 번 더 받쳐 주었다. 주제어에 Submarines (Ships) 가 있으나 어떤 장면인지 어느 출처도 말하지 않아 이야기로 쓰지 않고 낱말 뜻으로만 다뤘다. 오픈라이브러리 places 칸의 \"West (U.S.)\" · \"Südsee\" 는 요약·소개글 어느 쪽도 뒷받침하지 않아 쓰지 않았다. 여기 밖의 사건·인물·결말·수수께끼의 답은 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Dolphins at Daybreak\" read aloud",
    searchUrl: "https://youtu.be/rWpayg3P7PM",
    videos: [
      { url: "https://youtu.be/rWpayg3P7PM", title: "Magic Tree House No. 9 \"Dolphins at Daybreak\" By Mary Pope Osborne",
        channel: "Reisom Resources", views: "5,187", length: "35:50" },
      { url: "https://youtu.be/Pyw3EAHE3Ro", title: "Dolphins at Daybreak 1",
        channel: "The Halfling Storytime", views: "1,085", length: "4:28" },
      { url: "https://youtu.be/R04tw_pieXs", title: "Magic Tree House | #9 Dolphins at Daybreak | MARY POPE OSBORNE | New York Times Bestselling Series",
        channel: "EUNICE books and words", views: "17,509", length: "35:27" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니고, 책의 장면을 지어내지도 않았다.
  vocabulary: [
    { word: "dolphin",   pos: "n.",   en: "a smart sea animal that breathes air and swims in groups", ko: "돌고래",
      ex: "The title of this book is \"{{Dolphins}} at Daybreak.\"", ex_ko: "이 책의 제목은 '돌고래와 새벽'이에요.", pic: "🐬" },
    { word: "daybreak",  pos: "n.",   en: "the moment in the morning when light first comes", ko: "새벽, 동틀 녘",
      ex: "At {{daybreak}} the sky slowly turns light.", ex_ko: "새벽이 되면 하늘이 천천히 밝아져요.", pic: "🌅" },
    { word: "ocean",     pos: "n.",   en: "a very large body of salt water that covers much of the earth", ko: "바다, 대양",
      ex: "The magic tree house takes Jack and Annie deep into the {{ocean}}.", ex_ko: "마법의 나무 집이 잭과 애니를 바다 깊은 곳으로 데려가요.", pic: "🌊" },
    { word: "riddle",    pos: "n.",   en: "a puzzling question that you must think hard to answer", ko: "수수께끼",
      ex: "Jack and Annie look for the answer to a {{riddle}}.", ex_ko: "잭과 애니는 수수께끼의 답을 찾아요.", pic: "❓" },
    { word: "ancient",   pos: "adj.", en: "from a time very, very long ago", ko: "아주 오래된, 고대의",
      ex: "The description calls it an {{ancient}} riddle.", ex_ko: "출판사 소개글은 그것을 아주 오래된 수수께끼라고 불러요.", pic: "🏺" },
    { word: "search",    pos: "v.",   en: "to look carefully for something you want to find", ko: "찾다, 수색하다",
      ex: "They {{search}} for the answer under the sea.", ex_ko: "그들은 바닷속에서 답을 찾아요.", pic: "🔍" },
    { word: "shark",     pos: "n.",   en: "a large fish with sharp teeth that hunts other sea animals", ko: "상어",
      ex: "In the sea they meet a {{shark}}.", ex_ko: "바다에서 그들은 상어를 만나요.", pic: "🦈" },
    { word: "octopus",   pos: "n.",   en: "a soft sea animal with eight long arms", ko: "문어",
      ex: "They meet an {{octopus}} too.", ex_ko: "그들은 문어도 만나요.", pic: "🐙" },
    { word: "starving",  pos: "adj.", en: "so hungry that it hurts", ko: "굶주린",
      ex: "Our catalog summary calls the shark a {{starving}} shark.", ex_ko: "우리 장서 목록 요약은 그 상어를 '굶주린 상어'라고 적어요.", pic: "🍽️" },
    { word: "giant",     pos: "adj.", en: "much bigger than the usual size", ko: "거대한",
      ex: "Our catalog summary calls the octopus a {{giant}} octopus.", ex_ko: "우리 장서 목록 요약은 그 문어를 '거대한 문어'라고 적어요.", pic: "⛰️" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // stared 만은 책의 첫 문장("Jack stared out the kitchen window.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Plural -s / -es", ko: "명사의 복수형",
        sent: "Jack and Annie meet [[dolphins]], [[sharks]], and octopi.",
        why_ko: "둘 이상이면 이름 뒤에 -s 를 붙여요. dolphin → dolphins, shark → sharks. 그런데 octopus 는 -s 가 아니라 octopi 로도 써요 — 그런 낱말이 몇 개 있어요.",
        why: "Add -s for more than one: dolphin → dolphins. A few words change in their own way: octopus → octopi.",
        try: "I saw two {{dolphins}} and three {{sharks}}." },
      { name: "Present Simple -s", ko: "3인칭 단수 현재형",
        sent: "The magic tree house [[takes]] them into the sea. It [[whisks]] Jack and Annie away.",
        why_ko: "주어가 he·she·it 처럼 하나일 때는 현재형 동사 뒤에 -s 를 붙여요. take → takes, whisk → whisks. they 면 붙이지 않아요.",
        why: "With he, she or it, add -s to the present verb: take → takes.",
        try: "The tree house {{takes}} them away, but Jack and Annie {{take}} their books." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"Jack [[stared]] out the kitchen window.\"",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. stare 처럼 e 로 끝나면 -d 만 붙여요. stare → stared.",
        why: "Add -ed for something already finished. If the verb ends in e, add only -d: stare → stared.",
        try: "Yesterday I {{looked}} out the window and {{opened}} my book." }
    ],
    find: "책에서 -s 로 끝나는 복수 명사를 세 개 찾아 쓰세요. · Find three plural nouns ending in -s.",
    exam: {
      choose: [
        { q: "Jack and Annie meet many (dolphin / dolphins) in the sea.", a: "dolphins",
          why_ko: "many 는 여럿이에요. 여럿이면 -s 를 붙여 dolphins!" },
        { q: "The magic tree house (take / takes) them deep into the ocean.", a: "takes",
          why_ko: "주어 The magic tree house 는 하나(it)예요. 현재형에 -s 를 붙여 takes." },
        { q: "The book begins, \"Jack (stare / stared) out the kitchen window.\"", a: "stared",
          why_ko: "책의 첫 문장이에요. 이미 일어난 일이라 과거형 stared 예요." },
        { q: "They search for the answer to (a / an) ancient riddle.", a: "an",
          why_ko: "ancient 는 '에인'으로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "The description says they meet dolphins, sharks, and (octopus / octopi).", a: "octopi",
          why_ko: "소개글이 쓴 말이 octopi 예요. octopus 의 여럿을 가리키는 말이에요." }
      ],
      fix: [
        { q: "Jack and Annie meet many [[shark]] in the ocean.", a: "sharks",
          why_ko: "many 뒤에는 여럿이 와요. shark 에 -s 를 붙여 sharks." },
        { q: "The magic tree house [[take]] them deep into the sea.", a: "takes",
          why_ko: "주어가 하나(it)예요. 현재형 동사에 -s 를 붙여 takes." },
        { q: "At the start of the book, Jack [[stare]] out the kitchen window.", a: "stared",
          why_ko: "책이 시작할 때 이미 일어난 일이에요. 과거형 stared 로 고쳐요." }
      ],
      write: [
        { ko: "마법의 나무 집이 그들을 바다 깊은 곳으로 데려간다.", cond: "take, deep into the ocean", a: "The magic tree house takes them deep into the ocean.",
          why_ko: "주어가 하나라서 takes 예요. take 라고 쓰면 -s 를 빠뜨린 거예요." },
        { ko: "그들은 수수께끼의 답을 찾는다.", cond: "search, the answer", a: "They search for the answer to the riddle.",
          why_ko: "search 는 for 와 함께 써요. 주어가 They 라서 -s 를 붙이지 않아요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story?",
      frame: "They are {{Jack and Annie}}." },
    { ref: "책 전체", skill: "사실찾기", q: "Where does the magic tree house take Jack and Annie?",
      frame: "It takes them {{deep into the ocean}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What are Jack and Annie searching for under the sea?",
      frame: "They are searching for {{the answer to an ancient riddle}}." },
    { ref: "책 전체", skill: "사실찾기", q: "Which sea animals do Jack and Annie meet?",
      frame: "They meet {{dolphins}}, {{sharks}}, and {{octopi}}." },
    { ref: "제목", skill: "어휘", q: "The title is \"Dolphins at Daybreak.\" What does the word \"daybreak\" mean, and what time of day is it?",
      frame: "Daybreak means {{                    }}, so it is {{                    }}." },
    { ref: "책 첫 문장", skill: "추론·예측", q: "The book begins, \"Jack stared out the kitchen window.\" What do you think he was looking at, or thinking about?",
      frame: "I think he was {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Our summary asks, \"Will the dolphins save the day?\" but never answers. If you were deep in the sea with a hungry shark nearby, what would you do first?",
      frame: "I would {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and his friend", "Annie and her cousin", "Two divers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약과 소개글이 둘 다 \"Jack and Annie\" 라고 적어요.",
      why: "Jack and Annie. Both the catalog summary and the description name them." },
    { q: "What takes Jack and Annie on this adventure?",
      a: ["A magic boat", "The magic tree house", "A whale", "A plane"], c: 1,
      why_ko: "마법의 나무 집이에요. 요약도 소개글도 the magic tree house 라고 말해요.",
      why: "The magic tree house — both sources say so." },
    { q: "Where does the magic tree house take them?",
      a: ["To a castle", "To a desert", "Deep into the ocean", "To the moon"], c: 2,
      why_ko: "바다 깊은 곳이에요. 요약은 \"deep into the ocean\", 소개글은 \"deep into the sea\" 라고 해요.",
      why: "Deep into the ocean — \"deep into the sea\" in the description." },
    { q: "What are Jack and Annie searching for?",
      a: ["A lost ship", "The answer to a riddle", "A pet dolphin", "Gold coins"], c: 1,
      why_ko: "수수께끼의 답이에요. 요약도 소개글도 답을 찾는다고 말해요. 배도 금화도 근거 어디에도 없어요.",
      why: "The answer to a riddle. Neither a ship nor gold appears in our sources." },
    { q: "How does the description describe that riddle?",
      a: ["Easy", "Ancient", "Funny", "New"], c: 1,
      why_ko: "소개글이 고른 낱말이 ancient(아주 오래된)예요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The description's own word is \"ancient.\" The other three appear nowhere." },
    { q: "Which sea animals does the description say they meet?",
      a: ["Whales, seals, and crabs", "Penguins and polar bears", "Dolphins, sharks, and octopi", "Turtles and jellyfish"], c: 2,
      why_ko: "돌고래 · 상어 · 문어예요. 소개글에 그대로 적혀 있어요. 나머지 동물들은 우리 근거에 한 번도 나오지 않아요.",
      why: "Dolphins, sharks, and octopi — the description lists exactly those three." },
    { q: "How does our catalog summary describe the shark?",
      a: ["Sleeping", "Starving", "Friendly", "Tiny"], c: 1,
      why_ko: "장서 요약의 말은 \"a starving shark\" — 굶주린 상어예요.",
      why: "The catalog summary says \"a starving shark.\"" },
    { q: "How does our catalog summary describe the octopus?",
      a: ["Giant", "Baby", "Blue", "Shy"], c: 0,
      why_ko: "장서 요약의 말은 \"a giant octopus\" — 거대한 문어예요.",
      why: "The catalog summary says \"a giant octopus.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack couldn't sleep.\"", "\"Jack stared out the kitchen window.\"", "\"Annie ran to the ladder.\"", "\"The sea was dark.\""], c: 1,
      why_ko: "첫 문장은 \"Jack stared out the kitchen window.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. 부엌 창밖을 내다보는 잭에서 이야기가 시작돼요.",
      why: "\"Jack stared out the kitchen window.\" That is the recorded first line." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#5", "#9", "#20"], c: 2,
      why_ko: "9권이에요. 장서 목록 제목이 \"#09. Dolphins at Daybreak\" 이고 요약 끝에도 Book #9 라고 적혀 있어요.",
      why: "Book #9 — the catalog title is \"#09. Dolphins at Daybreak.\"" },
    { q: "What does \"daybreak\" in the title mean?",
      a: ["Late at night", "The first light of morning", "Lunch time", "A broken day"], c: 1,
      why_ko: "daybreak 은 아침에 빛이 처음 드는 때, 곧 새벽이에요. 제목은 '새벽의 돌고래들' 이라는 뜻이에요.",
      why: "Daybreak is the first light of morning. The title means \"dolphins at first light.\"" },
    { q: "Our summary ends with the question \"Or will the dolphins save the day?\" What does that tell us?",
      a: ["The dolphins definitely save them", "The dolphins definitely do not", "Our summary asks it but does not answer it", "There are no dolphins in the book"], c: 2,
      why_ko: "요약은 묻기만 하고 답하지 않아요. 그러니 우리는 아직 알 수 없어요. 돌고래가 나오는 것은 제목에서도 알 수 있어요.",
      why: "The summary only asks; it never answers. So we cannot know yet." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "Which sea animals they meet", "The answer to the riddle", "What the book's first sentence is"], c: 2,
      why_ko: "수수께끼의 답이에요. 요약도 소개글도 '답을 찾는다'는 데서 멈춰요. 답이 무엇인지는 책을 읽어야 알 수 있어요.",
      why: "The answer to the riddle. Both sources stop at \"they search for the answer.\" You have to read the book." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(뒤에 무슨 일이 일어나는지 · 결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    // 장소는 두 출처가 함께 말한다(바다 깊은 곳). 때는 어느 출처도 말하지 않아 비워 둔다.
    setting: { place: "{{deep in the ocean}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to find the answer to an ancient riddle}}" },
      { k: "But",      v: "{{they met a starving shark and a giant octopus}}" },
      { k: "So",       v: "{{                    }}" },   // 둘이 어떻게 했는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie away.",
        frame: "It takes them deep into {{the ocean}}." },
      { label: "The Riddle",
        given: "",
        frame: "Under the sea they {{search}} for the answer to {{an ancient riddle}}." },
      { label: "The Sea Animals",
        given: "",
        frame: "They meet {{dolphins}}, a {{starving}} shark, and a {{giant}} octopus." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Dolphins at Daybreak",
    branches: [
      { label: "Jack",            ask: "The book's first sentence is \"Jack stared out the kitchen window.\" What do you learn about Jack from that one line?",
        deeper: "Why might a story start with someone just looking, and not with someone doing?" },
      { label: "Annie",           ask: "Annie travels with Jack. Our summary tells us almost nothing else about her. What do you want to find out?",
        deeper: "Why is it easier — or harder — to be brave when someone goes with you?" },
      { label: "The Tree House",  ask: "What does the magic tree house do for Jack and Annie in this book?",
        deeper: "Why is going down into the sea different from going far away on land?" },
      { label: "The Riddle",      ask: "The riddle is called ancient. What do you think makes a riddle old?",
        deeper: "Why would anyone go somewhere dangerous just to answer a question?" },
      { label: "The Sea Animals", ask: "They meet dolphins, sharks and octopi. Which one would you want to see, and which one not?",
        deeper: "Why do people fear some sea animals and love others?" },
      { label: "Me",              ask: "If the tree house dropped you deep in the ocean, what would you look at first?",
        deeper: "What would you be most careful about down there, and why?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Connection",
    relatedConcepts: ["Curiosity", "Danger", "Help"],
    globalContext: "Sharing the planet — 우리는 바다의 생물들과 어떻게 함께 사는가",
    statement: "Searching for an answer can carry us into a place where we are not the strongest creature there.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What are they searching for under the sea?",
      "Which sea animals do they meet?"
    ],
    conceptual: [
      "Why can the deep sea feel beautiful and frightening at the same time?",
      "What makes a riddle different from an ordinary question?"
    ],
    debatable: [
      "Should people go into places where wild animals live?",
      "When danger appears, is it better to keep searching or to turn back?"
    ],
    learnerProfile: ["Inquirer", "Thinker", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "돌고래가 구해 줄까?" 하고 묻기만 하고 답하지 않는다. 그래서 그 판단을 아이에게 맡기는 물음으로 세웠다.
    prompt: "Our summary asks, \"Will the dolphins save the day?\" and never answers it. When you are in danger, should you wait for help or get yourself out? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "wait 또는 get out 중 하나를 고를 것 · Choose one side clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Wait, or Swim?", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think you should try to get yourself out first.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie meet a starving shark deep in the ocean.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "Help may not come, so waiting can be the most dangerous choice.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say you should wait, but our summary never says the dolphins come.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would move first and hope for help later.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie deep into the ocean to search for the answer to an ancient riddle, and who they meet there, then take a side on waiting for help.",
      ko: "마법의 나무 집이 잭과 애니를 바다 깊은 곳으로 데려가 아주 오래된 수수께끼의 답을 찾게 하는 흐름과 거기서 만나는 것들을 말하고, 위험할 때 도움을 기다릴지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Close your eyes. You are deep under the ocean. What is the first thing you see?",
        do: "책을 펴기 전에 한다. 바다 밑을 아이 머릿속에 먼저 띄워야 이 책이 읽힌다. 서너 명만.",
        exp: "Fish. / It is dark. / A big shark.",
        stuck: "선생님이 먼저 한 문장 한다. \"I see blue water and no sky.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Dolphins at Daybreak.\" What is daybreak? Why not \"Dolphins at Night\"?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Daybreak is early morning, when the sun comes up.",
        stuck: "표지를 가리킨다. \"Look at the cover. Is it dark or light?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "수수께끼 → riddle / 굶주린 → starving / 거대한 → giant",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does it take them...' becomes 'It takes them...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them deep into the ocean.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence is \"Jack stared out the kitchen window.\" Not looked — stared. What is the difference?",
        do: "칠판에 그 한 줄만 쓴다. look 과 stare 를 눈으로 흉내 내어 보인다.",
        exp: "Stare means you look for a long time without moving.",
        stuck: "\"When do YOU stare at something? What are you thinking about then?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: the answer to a riddle / But: a starving shark and a giant octopus",
        stuck: "\"Who travels in this story? Where do they go?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Two boxes are empty: So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those two boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Riddle)", min: "",
        say: "Stop at The Riddle. Don't tell me the answer — tell me why anyone would swim into danger for a question.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 수수께끼의 답은 우리 자료에 없다는 것도 말해 준다.",
        exp: "Because they really wanted to know. / Because someone needed the answer.",
        stuck: "\"What is a question YOU would go far to answer?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "When danger appears, keep searching or turn back? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I would turn back, because a starving shark is faster than me.",
        stuck: "손을 들게 한다. \"Keep going? Or swim home?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say you should wait for help, but our summary never says the dolphins come.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about dolphins, sharks and octopuses?", ko: "돌고래·상어·문어에 대해 이미 아는 게 있니?" },
        { en: "Would you rather explore the deep sea or outer space?", ko: "깊은 바다랑 우주 중에 어디를 탐험하고 싶니?" },
        { en: "The title says daybreak. Why would dolphins come at first light?", ko: "제목이 새벽이라고 하네. 돌고래는 왜 동틀 녘에 올까?" }
      ],
      during: [
        { en: "What kind of riddle do you think they are trying to answer?", ko: "그들이 풀려는 수수께끼는 어떤 것일까?" },
        { en: "Our summary calls the shark starving. What does a starving animal do?", ko: "우리 요약은 그 상어가 굶주렸다고 해. 굶주린 동물은 어떻게 할까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was the answer to the riddle? Our summary never says.", ko: "수수께끼의 답은 뭐였니? 우리 요약에는 없었어." },
        { en: "Did the dolphins save the day? Our summary only asked.", ko: "돌고래가 구해 줬니? 우리 요약은 묻기만 했어." }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "So·Then 두 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Riddle' 가지에서 반드시 멈춘다.", miss: "→ 칸에 수수께끼의 답을 지어 쓴다. 우리 자료에는 답이 없다." },
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
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장 · 제목)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 결말도 수수께끼의 답도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 바다 깊은 곳으로 가 수수께끼의 답을 찾는 이야기",
    text: "Jack [[looked|stared]] out the kitchen window. Then the magic tree house took Jack and Annie deep into the [[sea|ocean]]. Down there they went [[looking|searching]] for the answer to an [[old|ancient]] riddle. They met dolphins, a [[very hungry|starving]] shark, and a [[huge|giant]] octopus. Will the dolphins save the day? Our summary asks that question and never answers it. Open the book and find out."
  }
};
