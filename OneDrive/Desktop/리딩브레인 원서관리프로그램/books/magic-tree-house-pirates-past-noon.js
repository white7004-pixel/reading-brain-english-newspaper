// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 2.8)
// Pirates Past Noon (Magic Tree House #4) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3250.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 두 아이를 시간 너머로 데려간다 /
//   사람 없는 섬(deserted islands) · 비밀 지도(secret maps) · 숨겨진 보물(hidden treasure,
//   소개글은 hidden gold) · 무자비한 해적(ruthless pirates, 소개글은 nasty pirates)의 때로 /
//   책의 첫 문장은 "Jack stared out his bedroom window."
// 결말은 근거가 말하지 않는다. 장서 요약이 "Will the children find a buried treasure?" 라는
// 물음으로 끝나기 때문에, 보물을 찾았는지 못 찾았는지를 우리는 모른다. 찾았다고도
// 못 찾았다고도 쓰지 않고, 그 자리를 아이에게 묻는 자리로 삼았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3250",
  slug: "magic-tree-house-pirates-past-noon",
  title: "Pirates Past Noon",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #4",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권(AR 2.9)이 정독 1단계라 그에 맞췄다.
  level: { ar: "2.8", lexile: "490L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/12616282-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3250 요약 + 오픈라이브러리 /works/OL81798W (소개글 · 첫 문장 \"Jack stared out his bedroom window.\" · 주제어 Baumhaus/Zeitreise/Abenteuer/Piraten/Geschwister/versteckt · 67쪽 · 1994년)",
    characters: ["Jack", "Annie", "ruthless pirates"],
    beats: [
      "The magic tree house takes Jack and Annie back in time",
      "they go back to the days of deserted islands, secret maps, and hidden treasure",
      "ruthless pirates are there too, and our summary asks whether the children will find a buried treasure"
    ],
    ending: "근거에 결말이 없다. 장서 요약이 \"Will the children find a buried treasure?\" 라는 물음으로 끝나고, 출판사 소개글은 그 물음조차 없이 해적에서 멈춘다. 그러니 두 아이가 보물을 찾았는지 못 찾았는지 우리는 모른다. 찾았다고도 못 찾았다고도 쓰지 않고 비워 둔다",
    checked: "장서 요약(\"deserted islands, secret maps, hidden treasure, and ruthless pirates\")과 소개글(\"deserted islands, secret maps, hidden gold, and nasty pirates\")을 한 줄씩 맞춰 보았다. 네 가지 가운데 셋은 낱말까지 같고, 어긋나는 곳은 두 군데다 — 보물이 treasure 냐 gold 냐, 해적이 ruthless 냐 nasty 냐. 둘 다 장서 요약을 따라 treasure·ruthless 로 적고, 소개글 쪽 낱말은 퀴즈에서 따로 다루었다. 장서 요약에만 있는 물음 \"Will the children find a buried treasure?\" 는 결말을 말하는 문장이 아니라 묻는 문장이므로 답을 지어 채우지 않았다. 주제어 Baumhaus(나무집)·Zeitreise(시간여행)·Piraten(해적)·Abenteuer(모험)·versteckt(숨겨진)이 같은 것을 가리켜 한 번 더 받쳐 주었다. 주제어에 Bruder·Schwester·Geschwister 가 있으나 잭과 애니 가운데 누가 손위인지는 어느 출처도 말하지 않아 남매 관계는 적지 않았다. 여기 밖의 사건·인물·장소 이름·결말은 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Pirates Past Noon\" read aloud",
    searchUrl: "https://youtu.be/o5j-ZZ5_ASY",
    videos: [
      { url: "https://youtu.be/o5j-ZZ5_ASY", title: "Pirates Past Noon — Magic Tree House #4 (Read Aloud)",
        channel: "The Story Harbor", views: "", length: "43:59" },
      { url: "https://youtu.be/DsND5KD0KEE", title: "Pirates Past Noon — Read Aloud",
        channel: "Faerie Book Mama", views: "", length: "35:53" },
      { url: "https://youtu.be/b-8GroyIm6w", title: "Pirates Past Noon — Magic Tree House #4",
        channel: "EUNICE books and words", views: "", length: "42:08" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "pirate",   pos: "n.",   en: "a robber who sails the sea and takes things from other ships", ko: "해적",
      ex: "Ruthless {{pirates}} are waiting in this story.", ex_ko: "이 이야기에는 무자비한 해적들이 기다리고 있어요.", pic: "🏴‍☠️" },
    { word: "treasure", pos: "n.",   en: "gold, money, or jewels that are worth a lot", ko: "보물",
      ex: "The story is about hidden {{treasure}}.", ex_ko: "이 이야기는 숨겨진 보물에 대한 거예요.", pic: "💰" },
    { word: "island",   pos: "n.",   en: "a piece of land with water all around it", ko: "섬",
      ex: "They go back to the days of deserted {{islands}}.", ex_ko: "그들은 사람 없는 섬들의 시대로 갑니다.", pic: "🏝️" },
    { word: "deserted", pos: "adj.", en: "empty, with nobody living there", ko: "사람이 없는, 버려진",
      ex: "A {{deserted}} island has no people on it.", ex_ko: "사람 없는 섬에는 아무도 살지 않아요.", pic: "🌴" },
    { word: "map",      pos: "n.",   en: "a drawing that shows where places are", ko: "지도",
      ex: "Secret {{maps}} are part of this story.", ex_ko: "비밀 지도가 이 이야기에 나와요.", pic: "🗺️" },
    { word: "secret",   pos: "adj.", en: "kept hidden so that other people do not know", ko: "비밀의",
      ex: "A {{secret}} map is not for everyone to see.", ex_ko: "비밀 지도는 아무나 보는 것이 아니에요.", pic: "🤫" },
    { word: "hidden",   pos: "adj.", en: "put somewhere so that nobody can find it", ko: "숨겨진",
      ex: "The treasure in this book is {{hidden}}.", ex_ko: "이 책의 보물은 숨겨져 있어요.", pic: "🔒" },
    { word: "buried",   pos: "adj.", en: "put under the ground and covered up", ko: "묻힌",
      ex: "Will the children find a {{buried}} treasure?", ex_ko: "아이들은 묻힌 보물을 찾게 될까요?", pic: "⛏️" },
    { word: "gold",     pos: "n.",   en: "a shiny yellow metal that costs a lot of money", ko: "금",
      ex: "The publisher calls the treasure hidden {{gold}}.", ex_ko: "출판사 소개글은 그 보물을 숨겨진 금이라고 불러요.", pic: "🪙" },
    { word: "stare",    pos: "v.",   en: "to look at something for a long time without moving your eyes", ko: "빤히 바라보다",
      ex: "At the start of the book, Jack {{stared}} out his window.", ex_ko: "책이 시작할 때 잭은 창밖을 빤히 내다보았어요.", pic: "👀" }
  ],

  // ── ①-2 문법 (영영문법 1장 + 입시문법 1장) ─────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 첫 문장("Jack stared out his bedroom window.")과 요약의 물음("Will the children find a
  // buried treasure?")만은 진짜 책·진짜 근거의 문장이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Plural -s", ko: "복수형",
        sent: "They go back to the days of deserted [[islands]], secret [[maps]], and ruthless [[pirates]].",
        why_ko: "하나보다 많으면 명사 끝에 -s 를 붙여요. island → islands, map → maps, pirate → pirates.",
        why: "Add -s to a noun when there is more than one.",
        try: "I see two {{maps}} and three {{islands}}." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"Jack [[stared]] out his bedroom window.\"",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. stare 처럼 e 로 끝나면 -d 만 붙여서 stared.",
        why: "Add -ed for something that already finished. If the verb ends in e, just add -d.",
        try: "Yesterday I {{stared}} at the sea and {{opened}} the map." },
      { name: "Will + 동사원형", ko: "미래·의문문의 will",
        sent: "[[Will]] the children [[find]] a buried treasure?",
        why_ko: "will 은 주어가 무엇이든 모양이 안 바뀌고, 뒤에는 꼭 동사원형이 와요. will finds(X), will find(O).",
        why: "\"Will\" never changes, and the verb after it stays in its base form.",
        try: "{{Will}} you {{read}} this book tonight?" }
    ],
    find: "책에서 -s 로 끝나는 복수 명사를 세 개 찾아 쓰세요. · Find three plural nouns ending in -s.",
    exam: {
      choose: [
        { q: "They go back to the days of deserted (island / islands).", a: "islands",
          why_ko: "섬이 여럿이에요. 하나보다 많으면 -s 를 붙여 islands." },
        { q: "The story has secret (map / maps), not just one.", a: "maps",
          why_ko: "not just one — 하나가 아니라고 했으니 복수 maps 예요." },
        { q: "Jack (stare / stared) out his bedroom window.", a: "stared",
          why_ko: "책의 첫 문장이에요. 이미 일어난 일이라 과거형 stared." },
        { q: "(Will / Wills) the children find a buried treasure?", a: "Will",
          why_ko: "will 은 주어가 the children 이어도 모양이 바뀌지 않아요." },
        { q: "Will the children (find / finds) a buried treasure?", a: "find",
          why_ko: "will 뒤에는 언제나 동사원형이에요. finds 가 아니라 find." }
      ],
      fix: [
        { q: "Jack [[stare]] out his bedroom window last night.", a: "stared",
          why_ko: "last night 은 지난 일이에요. 과거형 stared 로 고쳐요." },
        { q: "Will the children [[found]] a buried treasure?", a: "find",
          why_ko: "will 뒤는 동사원형이에요. found 가 아니라 find." },
        { q: "Ruthless [[pirate]] are waiting on the island.", a: "pirates",
          why_ko: "are 가 쓰였으니 주어가 여럿이에요. pirates 로 고쳐요." }
      ],
      write: [
        { ko: "잭은 침실 창밖을 빤히 내다보았다.", cond: "stare, 과거형", a: "Jack stared out his bedroom window.",
          why_ko: "stare 의 과거형은 stared. 이 문장이 바로 책의 첫 문장이에요." },
        { ko: "아이들은 묻힌 보물을 찾게 될까?", cond: "Will 로 시작하는 의문문", a: "Will the children find a buried treasure?",
          why_ko: "Will + 주어 + 동사원형. 문장 끝에 물음표를 꼭 붙이세요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "What takes Jack and Annie back in time?",
      frame: "{{The magic tree house}} takes them back in time." },
    { ref: "책 전체", skill: "사실찾기", q: "Our summary names four things from the time they travel to. What are they?",
      frame: "They are {{deserted islands}}, {{secret maps}}, {{hidden treasure}}, and {{ruthless pirates}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What kind of people are waiting in that time?",
      frame: "{{Ruthless pirates}} are waiting there." },
    { ref: "책 첫 문장", skill: "어휘", q: "The book begins, \"Jack stared out his bedroom window.\" The word is \"stared,\" not \"looked.\" What does that tell you about how Jack was looking?",
      frame: "It tells me he {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "Our summary ends with a question: \"Will the children find a buried treasure?\" Why do you think it stops there instead of telling us?",
      frame: "I think it is because {{                    }}." },
    { ref: "내 생각", skill: "추론·예측", q: "Before you read, make a guess: do you think Jack and Annie find the buried treasure? Say why.",
      frame: "I think they {{will / will not}} find it, because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If you found a secret map in your room, would you follow it all the way? Say why.",
      frame: "I {{would / would not}} follow it, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children in this book?",
      a: ["Jack and Annie", "Jack and a pirate", "Annie and her cousin", "Two sailors"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약과 소개글이 둘 다 \"Jack and Annie\" 라고 이름을 적어요.",
      why: "Jack and Annie. Both the catalog summary and the description name them." },
    { q: "What takes Jack and Annie back in time?",
      a: ["A pirate ship", "The magic tree house", "A hot-air balloon", "A secret map"], c: 1,
      why_ko: "마법의 나무 집이에요. 배도 지도도 아니에요. 요약이 \"The magic tree house takes Jack and Annie back\" 이라고 말해요.",
      why: "The magic tree house — not a ship, not a map." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#1", "#2", "#4", "#10"], c: 2,
      why_ko: "4권이에요. 장서 목록 제목이 \"#04. Pirates Past Noon\" 이고 요약 끝에도 Book #4 라고 적혀 있어요.",
      why: "Book #4 — the catalog title is \"#04. Pirates Past Noon.\"" },
    { q: "What kind of islands does the summary name?",
      a: ["Deserted islands", "Crowded islands", "Snowy islands", "Floating islands"], c: 0,
      why_ko: "deserted islands — 사람이 없는 섬이에요. 사람이 붐비는 섬도, 눈 덮인 섬도 아니에요.",
      why: "Deserted islands — empty, with nobody there." },
    { q: "What kind of maps does the summary name?",
      a: ["Torn maps", "Secret maps", "School maps", "Star maps"], c: 1,
      why_ko: "secret maps — 비밀 지도예요. 요약과 소개글에 똑같이 적혀 있어요.",
      why: "Secret maps. Both sources use the same two words." },
    { q: "Which word does our catalog summary use for the pirates?",
      a: ["Friendly", "Sleepy", "Ruthless", "Tiny"], c: 2,
      why_ko: "ruthless(무자비한)예요. 친절하지도, 졸립지도, 작지도 않아요.",
      why: "\"Ruthless\" is the catalog summary's own word." },
    { q: "The publisher's description uses a different word for the pirates. Which one?",
      a: ["Nasty", "Kind", "Quiet", "Clever"], c: 0,
      why_ko: "소개글은 nasty pirates 라고 해요. 요약은 ruthless, 소개글은 nasty — 둘 다 '고약한' 쪽 낱말이에요.",
      why: "The description says \"nasty pirates,\" while the catalog says \"ruthless.\"" },
    { q: "Our two sources use two different words for what is hidden. Which pair is right?",
      a: ["Treasure and gold", "Books and letters", "Food and water", "Ships and boats"], c: 0,
      why_ko: "장서 요약은 hidden treasure, 소개글은 hidden gold 라고 해요. 둘 다 같은 것을 가리켜요.",
      why: "The catalog says \"hidden treasure\"; the description says \"hidden gold.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"The sea was loud that morning.\"", "\"Jack stared out his bedroom window.\"", "\"Annie ran to the tree house.\"", "\"The pirates were coming.\""], c: 1,
      why_ko: "첫 문장은 \"Jack stared out his bedroom window.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. 창밖을 내다보는 잭에서 이야기가 시작돼요.",
      why: "\"Jack stared out his bedroom window.\" That is the recorded first line." },
    { q: "What does the word \"deserted\" mean?",
      a: ["Full of people", "Empty, with nobody there", "Very sweet", "Under the sea"], c: 1,
      why_ko: "deserted 는 사람이 아무도 없는, 버려진 이라는 뜻이에요. 디저트(dessert)와는 다른 낱말이에요.",
      why: "Deserted means empty, with nobody living there." },
    { q: "What does the word \"buried\" mean?",
      a: ["Put under the ground", "Thrown into the sea", "Given away", "Sold in a shop"], c: 0,
      why_ko: "buried 는 땅에 묻어 덮어 둔 이라는 뜻이에요. 그래서 보물을 찾으려면 땅을 파야 해요.",
      why: "Buried means put under the ground and covered up." },
    { q: "The title is \"Pirates Past Noon.\" What time of day does \"past noon\" mean?",
      a: ["Past midnight", "Past twelve o'clock in the day", "Past sunrise", "Past bedtime"], c: 1,
      why_ko: "noon 은 낮 열두 시, 정오예요. past noon 은 정오가 지난 때, 곧 이른 오후를 뜻해요.",
      why: "Noon is twelve o'clock in the day, so \"past noon\" is just after midday." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["What takes the children back in time", "What kind of pirates are there", "Whether the children find the buried treasure", "What the first sentence is"], c: 2,
      why_ko: "보물을 찾는지 못 찾는지예요. 우리 요약은 \"Will the children find a buried treasure?\" 하고 묻기만 하고 답하지 않아요. 답은 책 안에 있어요.",
      why: "Whether they find it. Our summary only asks the question — the book has the answer." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바랐는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house takes Jack and Annie back in time.",
        frame: "They go back to the days of {{deserted islands}} and {{secret maps}}." },
      { label: "The Pirates",
        given: "",
        frame: "In that time there are {{ruthless}} pirates." },
      { label: "The Treasure",
        given: "우리 자료는 '아이들이 묻힌 보물을 찾을까' 하고 묻기만 한다. 답은 적혀 있지 않다.",
        frame: "Do they find the buried {{treasure}}? Write what the book says: {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Pirates Past Noon",
    branches: [
      { label: "Jack",           ask: "The book's first sentence is \"Jack stared out his bedroom window.\" What do you learn about Jack from that one line?",
        deeper: "Why might a story start with a boy looking out of a window instead of running somewhere?" },
      { label: "Annie",          ask: "Annie travels with Jack. What is it like to go somewhere new with someone from your family?",
        deeper: "Is it easier or harder to be brave when you are not alone?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie?",
        deeper: "Why do you think a tree house — not a ship — is the thing that carries them to the pirates' time?" },
      { label: "The Pirates",    ask: "Our summary calls the pirates ruthless. What does that word make you expect?",
        deeper: "Why do stories so often put something wonderful and something dangerous in the same place?" },
      { label: "The Treasure",   ask: "A secret map, hidden treasure, a deserted island. Which of the three would you want to see first?",
        deeper: "Our summary asks whether the children find the treasure and never answers. Does not knowing make you want to read more, or less?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for the days of pirates?",
        deeper: "What would you take with you, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Adventure", "Danger", "Curiosity"],
    globalContext: "Orientation in space and time — 다른 때로 간다는 것은 무엇을 만난다는 뜻인가",
    statement: "A time that holds hidden treasure can also hold ruthless people, and you do not know which you will meet first.",
    factual: [
      "What takes Jack and Annie back in time?",
      "What four things does our summary name from that time?",
      "What does our summary ask at the end, and does it answer?"
    ],
    conceptual: [
      "Why would a map be kept secret?",
      "What makes a person ruthless, and how is that different from being angry?"
    ],
    debatable: [
      "Is treasure worth looking for if dangerous people are guarding it?",
      "Is it better to know how a story ends before you read it, or not to know?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "아이들이 묻힌 보물을 찾을까?" 라고 묻는 데서 멈춘다. 찾았는지는 적혀 있지 않으므로,
    // 그 판단이 아니라 "찾으러 갈 것인가"라는 아이 자신의 선택을 묻는 자리로 세웠다.
    prompt: "Our summary says there is hidden treasure, and also ruthless pirates. Would you go and look for the treasure anyway? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "이 책의 이야기에서 한 가지를 넣을 것 · Use one thing from this story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Treasure and Pirates", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I would go and look for the treasure.", lines: 2 },
      { part: "E — Evidence",    ask: "What does this story have in it? Write it.",
        eg: "In this book there are secret maps and hidden treasure, but also ruthless pirates.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the best things are often kept in the hardest places.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say pirates are too dangerous, but a secret map is not easy to find twice.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would take the risk and follow the map.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to the days of deserted islands, secret maps, hidden treasure and ruthless pirates, and then decide whether treasure is worth looking for when danger is there.",
      ko: "마법의 나무 집이 잭과 애니를 사람 없는 섬·비밀 지도·숨겨진 보물·무자비한 해적의 때로 데려가는 흐름을 말하고, 위험이 있어도 보물을 찾으러 갈 것인지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 특히 보물을 찾았는지 못 찾았는지는 우리 자료에 없다. 선생님도 답을 모른 채 묻는다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Say three things you expect in a pirate story.",
        do: "책을 펴기 전에 한다. 해적이라는 말을 아이 입에서 먼저 꺼내야 이 책이 읽힌다. 서너 명만.",
        exp: "A ship. A map. Gold.",
        stuck: "선생님이 먼저 하나 한다. \"A map.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Pirates Past Noon.\" Noon is twelve o'clock. So when do the pirates come?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "After twelve. In the afternoon.",
        stuck: "시계를 그려 12시를 가리킨 뒤 손가락을 조금 오른쪽으로 옮긴다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "해적 → pirate / 보물 → treasure / 묻힌 → buried",
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
        say: "The first sentence is \"Jack stared out his bedroom window.\" Not looked — stared. What is the difference?",
        do: "칠판에 looked 와 stared 를 나란히 쓴다. 낱말 하나 차이에서 얼마나 나오는지 보게 한다.",
        exp: "Stared is longer. He was thinking about something.",
        stuck: "선생님이 3초 동안 창밖을 빤히 본다. \"That was staring. Now what was I thinking about?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie — 나머지 네 칸은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Only the first box is filled. Four are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those four boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Treasure)", min: "",
        say: "Stop at The Treasure. Our summary asks if they find it — and then stops. Does that make you want to read more, or less?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 선생님도 답을 모른다고 솔직히 말한다.",
        exp: "More, because I want to know. / Less, because I don't like waiting.",
        stuck: "\"If I told you the ending right now, would you still read it?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is treasure worth looking for if ruthless people are guarding it? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because the map is already in their hands.",
        stuck: "손을 들게 한다. \"Go and dig? Or walk away?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say pirates are too dangerous, but a secret map does not come twice.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about pirates?", ko: "해적에 대해 이미 아는 게 있니?" },
        { en: "Why would anyone bury treasure instead of keeping it?", ko: "왜 보물을 가지고 있지 않고 땅에 묻을까?" },
        { en: "The title says the pirates come past noon. Why not at night?", ko: "해적은 왜 밤이 아니라 한낮이 지나서 올까?" }
      ],
      during: [
        { en: "The summary calls the pirates ruthless. Do they seem ruthless to you so far?", ko: "요약은 해적을 무자비하다고 했어. 읽어 보니 정말 그래 보이니?" },
        { en: "What would you do with a secret map you could not read?", ko: "읽을 수 없는 비밀 지도를 얻으면 너는 어떻게 하겠니?" }
      ],
      after: [
        { en: "Do the children find the buried treasure? Our summary only asked — you tell me.", ko: "아이들은 묻힌 보물을 찾았니? 우리 자료는 묻기만 했어. 네가 말해 줘." },
        { en: "Was there anything in the book that our summary never mentioned?", ko: "우리 요약에 없던 것이 책에 있었니?" },
        { en: "Where should the tree house go next, and why?", ko: "나무 집은 다음에 어디로 가야 할까? 왜?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Somebody 말고 네 칸이 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Treasure' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
    scene: "잭과 애니가 마법 나무집을 타고 해적과 보물의 때로 가는 이야기",
    text: "Jack [[looked|stared]] out his bedroom window. Then the magic tree house took him and Annie back in time. They went to the days of [[empty|deserted]] islands and [[hidden|secret]] maps. Somewhere there was [[hidden|buried]] [[gold|treasure]]. But [[mean|ruthless]] pirates were there too. Will the children find that treasure? Open the book and find out."
  }
};
