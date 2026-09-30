// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Vacation Under the Volcano (Magic Tree House #13) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3258.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 로마 제국의 시대로 · 폼페이로 보낸다 /
//   베수비오 화산이 막 터지려는 참이다 / 둘은 로마 두루마리(a Roman scroll)를 찾아 서두른다 /
//   모든 것이 (타는) 재에 묻히기 전에 /
//   책의 첫 문장은 "Jack reached into his drawer and took out his secret library card."
// 두루마리를 찾았는지도, 결말도 근거가 말하지 않는다. 장서 요약은 "재에 묻히기 전에
// 서둘러 찾는다"에서 끊기고, 소개글도 "must find a Roman scroll"에서 멈춘다. 그래서 비워 두었다.
// 10권과 달리 이 책 근거에는 모건(Morgan)도, 수수께끼도 한 글자도 없다. 쓰지 않았다.
// 폼페이에서 만나는 사람도 근거의 people 칸이 비어 있어 한 명도 적지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3258",
  slug: "magic-tree-house-vacation-under-the-volcano",
  title: "Vacation Under the Volcano",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #13",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "410L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424167-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·장소 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3258 요약 + 오픈라이브러리 /works/OL15131314W (소개글 · 첫 문장 \"Jack reached into his drawer and took out his secret library card.\" · 주제어 Tree houses/Time travel/Magic/Eruption, 79/Volcanoes/Italy/Pompeii (extinct city)/Space and time · 장소 Pompeii · Vesuvius (Italy) · Italy · 74쪽)",
    characters: ["Jack", "Annie"],
    beats: [
      "in their magic tree house, Jack and Annie travel to the days of the Roman Empire — the tree house takes them to Pompeii",
      "they arrive just as Vesuvius is about to erupt",
      "they rush in search of a Roman scroll before everything is buried in burning ash"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"They rush in search of a Roman scroll before everything is buried in ash.\"에서 멈추고, 소개글도 \"they must find a Roman scroll before everything is covered with burning ash.\"에서 끊긴다. 두 아이가 두루마리를 찾았는지, 그 두루마리에 무엇이 적혀 있었는지, 어떻게 폼페이를 빠져나와 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"In their magic tree house\", \"the days of the Roman Empire\", \"Vesuvius is about to erupt\", \"a Roman scroll\", \"buried in ash\")과 소개글(\"takes Annie and Jack to Pompeii\", \"must find a Roman scroll\", \"covered with burning ash\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(폼페이라는 지명 · '타는' 재)은 요약과 부딪히지 않아 남겼다. 주제어 Tree houses/Time travel/Magic/Volcanoes/Italy/Pompeii 와 장소 Pompeii · Vesuvius (Italy) · Italy 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 주제어 목록에 Eruption, 79 가 있어 폼페이를 묻은 그 분화를 가리키지만, 아이가 79를 연도로 읽으리라 장담할 수 없어 학습지 문항으로는 쓰지 않았다. people 칸이 비어 있어 폼페이에서 누구를 만나는지는 한 줄도 쓰지 않았다. 10권 근거에 있던 모건과 수수께끼는 이 책 근거에 없어 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Vacation Under the Volcano\" read aloud",
    searchUrl: "https://youtu.be/_DKLmXFJCSA",
    videos: [
      { url: "https://youtu.be/_DKLmXFJCSA", title: "Magic Tree House | #13 Vacation Under the Volcano | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "16,974", length: "43:34" },
      { url: "https://youtu.be/bQb7_sCPsyo", title: "Vacation Under the Volcano — Magic Tree House Audiobook #13",
        channel: "Triple A English", views: "4,703", length: "40:15" },
      { url: "https://youtu.be/p5x_Ii0Hmjs", title: "Magic Tree House #13 Vacation Under the Volcano Readaloud Chapter 1~5",
        channel: "책벌레, 책볼래?!", views: "920", length: "23:02" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "volcano",  pos: "n.", en: "a mountain that can send out hot rock, smoke and ash", ko: "화산",
      ex: "The title of this book is \"Vacation Under the {{Volcano}}.\"", ex_ko: "이 책의 제목은 '화산 아래에서의 방학'이에요.", pic: "🌋" },
    { word: "erupt",    pos: "v.", en: "to burst out suddenly, the way a volcano throws out fire and ash", ko: "분출하다, 터지다",
      ex: "Vesuvius is about to {{erupt}}.", ex_ko: "베수비오 화산이 막 터지려고 해요.", pic: "💥" },
    { word: "ash",      pos: "n.", en: "the soft grey powder that is left after something burns", ko: "재",
      ex: "Everything is buried in burning {{ash}}.", ex_ko: "모든 것이 타는 재에 묻혀요.", pic: "🔥" },
    { word: "scroll",   pos: "n.", en: "a long piece of paper rolled up, used for writing long ago", ko: "두루마리",
      ex: "Jack and Annie must find a Roman {{scroll}}.", ex_ko: "잭과 애니는 로마 두루마리를 찾아야 해요.", pic: "📜" },
    { word: "Roman",    pos: "adj.", en: "belonging to ancient Rome or to its people", ko: "로마의",
      ex: "They are looking for a {{Roman}} scroll.", ex_ko: "그들은 로마 두루마리를 찾고 있어요.", pic: "🏛️" },
    { word: "empire",   pos: "n.", en: "a very large group of lands ruled by one government", ko: "제국",
      ex: "They travel to the days of the Roman {{Empire}}.", ex_ko: "그들은 로마 제국의 시대로 갑니다.", pic: "👑" },
    { word: "bury",     pos: "v.", en: "to cover something up so that it cannot be seen", ko: "묻다, 덮다",
      ex: "The ash will {{bury}} everything in the town.", ex_ko: "재가 마을의 모든 것을 묻어 버릴 거예요.", pic: "⛏️" },
    { word: "rush",     pos: "v.", en: "to go or do something very quickly because there is little time", ko: "서두르다",
      ex: "Jack and Annie {{rush}} to find the scroll.", ex_ko: "잭과 애니는 두루마리를 찾으려고 서둘러요.", pic: "🏃" },
    { word: "secret",   pos: "adj.", en: "kept hidden so that other people do not know about it", ko: "비밀의",
      ex: "Jack took out his {{secret}} library card.", ex_ko: "잭은 자신의 비밀 도서관 카드를 꺼냈어요.", pic: "🤫" },
    { word: "vacation", pos: "n.", en: "a time when you do not work or go to school and can travel", ko: "방학, 휴가",
      ex: "This book is called a {{vacation}} under the volcano.", ex_ko: "이 책은 '화산 아래에서의 방학'이라고 불려요.", pic: "🧳" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // reached / took out 만은 책의 첫 문장("Jack reached into his drawer and took out his
  // secret library card.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Past Simple (-ed / 불규칙)", ko: "과거형",
        sent: "Jack [[reached]] into his drawer and [[took]] out his secret library card.",
        why_ko: "이미 끝난 일은 과거형으로 써요. 대부분은 -ed 를 붙이지만(reach → reached), 모양이 통째로 바뀌는 동사도 있어요(take → took).",
        why: "Add -ed for the past, but some verbs change shape instead: take → took.",
        try: "Yesterday I {{opened}} the box and {{took}} out a book." },
      { name: "be about to + 동사원형", ko: "막 ~하려 하다",
        sent: "Vesuvius [[is about to]] erupt.",
        why_ko: "'바로 지금 막 ~하려는 참이다'는 be about to + 동사원형이에요. to 뒤에는 꼭 원형(erupt)이 와요. erupting 도 erupts 도 아니에요.",
        why: "Use be about to + base verb for something that will happen in a moment.",
        try: "Hurry! The bus {{is about to}} leave." },
      { name: "be + 과거분사", ko: "수동태",
        sent: "Everything [[is buried]] in burning ash.",
        why_ko: "'무엇이 ~된다'는 be + 과거분사예요. 재가 묻는 것이 아니라 마을이 묻히는 쪽이니 buries 가 아니라 is buried 예요.",
        why: "Use be + past participle when the subject has the action done to it.",
        try: "The town {{is covered}} with ash." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack (reach / reached) into his drawer.", a: "reached",
          why_ko: "책의 첫 문장이 reached 예요. 이미 일어난 일이니 과거형이에요." },
        { q: "He (took / taked) out his secret library card.", a: "took",
          why_ko: "take 는 불규칙 동사예요. taked 라는 말은 없고 과거형은 took 입니다." },
        { q: "Vesuvius is about to (erupt / erupting).", a: "erupt",
          why_ko: "be about to 뒤에는 동사원형이 와요. erupting 이 아니라 erupt!" },
        { q: "Everything (is buried / buries) in ash.", a: "is buried",
          why_ko: "마을이 '묻히는' 쪽이에요. 당하는 쪽은 be + 과거분사로 써요." },
        { q: "Jack and Annie (travel / traveled) to the days of the Roman Empire.", a: "traveled",
          why_ko: "나무 집을 타고 이미 다녀온 일이에요. travel 에 -ed 를 붙여 traveled." }
      ],
      fix: [
        { q: "Jack [[take]] out his secret library card.", a: "took",
          why_ko: "첫 문장은 과거예요. take 의 과거형은 불규칙, took 입니다." },
        { q: "The volcano is about to [[erupts]].", a: "erupt",
          why_ko: "be about to 다음은 언제나 동사원형이에요. -s 를 떼고 erupt." },
        { q: "The whole town [[bury]] in burning ash.", a: "is buried",
          why_ko: "마을이 스스로 묻는 게 아니라 묻히는 거예요. be + 과거분사, is buried 로 고쳐요." }
      ],
      write: [
        { ko: "잭과 애니는 로마 두루마리를 찾아야 한다.", cond: "must, find", a: "Jack and Annie must find a Roman scroll.",
          why_ko: "must 뒤에는 동사원형 find 가 와요. finds 도 to find 도 아니에요." },
        { ko: "베수비오 화산이 막 터지려고 한다.", cond: "be about to, erupt", a: "Vesuvius is about to erupt.",
          why_ko: "주어가 하나니까 is, 그 뒤에 about to + 원형 erupt 를 붙여요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "What town does the magic tree house take Jack and Annie to, and in what country is it?",
      frame: "It takes them to {{Pompeii}}, in {{Italy}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What are Jack and Annie searching for, and what must happen before they find it?",
      frame: "They are searching for {{a Roman scroll}}, before {{everything is buried in ash}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Vacation Under the Volcano.\" What does \"erupt\" mean, and why does that make this a hurried vacation?",
      frame: "To erupt means {{to burst out with fire and ash}}. It is hurried because {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "Everything Jack and Annie do is a race against the volcano. In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book opens with Jack taking a secret library card out of his drawer. Why do you think that card matters?",
      frame: "I think the card {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If a volcano were about to erupt, would you stay to look for one important paper? Say why.",
      frame: "I {{would / would not}} stay, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a Roman boy", "Two travelers from Rome"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie travel to the days of the Roman Empire\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["In their magic tree house", "On a Roman ship", "In a time machine", "On a horse"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"In their magic tree house\" 로 시작하고, 주제어 목록에도 Tree houses 와 Time travel 이 있어요.",
      why: "The magic tree house — the summary opens with \"In their magic tree house.\"" },
    { q: "Which town does the tree house take Jack and Annie to?",
      a: ["Pompeii", "Rome", "Rattlesnake Flats", "Venice"], c: 0,
      why_ko: "폼페이예요. 출판사 소개글이 \"takes Annie and Jack to Pompeii\" 라고 적고 있어요.",
      why: "Pompeii. The description says the tree house \"takes Annie and Jack to Pompeii.\"" },
    { q: "In which country is that town?",
      a: ["Italy", "Greece", "Egypt", "Spain"], c: 0,
      why_ko: "이탈리아예요. 장소 목록에 Pompeii 와 나란히 Italy, 그리고 Vesuvius (Italy) 가 적혀 있어요.",
      why: "Italy. The place list records \"Pompeii,\" \"Italy\" and \"Vesuvius (Italy).\"" },
    { q: "To what time do Jack and Annie travel?",
      a: ["The days of the Roman Empire", "The Middle Ages", "The wild west", "The time of the dinosaurs"], c: 0,
      why_ko: "로마 제국의 시대예요. 요약이 \"the days of the Roman Empire\" 라고 말해요. 서부는 10권이에요.",
      why: "The days of the Roman Empire, as the summary states. The wild west was book #10." },
    { q: "Which volcano is about to erupt in this story?",
      a: ["Vesuvius", "Etna", "Fuji", "Krakatoa"], c: 0,
      why_ko: "베수비오예요. 요약과 소개글이 둘 다 \"Vesuvius is about to erupt\" 라고 적어요.",
      why: "Vesuvius. Both the summary and the description name it." },
    { q: "What are Jack and Annie searching for?",
      a: ["A Roman scroll", "A magic key", "A gold coin", "A lost dog"], c: 0,
      why_ko: "로마 두루마리(a Roman scroll)예요. 두 근거가 똑같이 \"a Roman scroll\" 이라고 말해요.",
      why: "A Roman scroll — both sources use exactly that phrase." },
    { q: "Why must they hurry?",
      a: ["Everything will be buried in ash", "The tree house will fly away", "It will start to rain", "The library will close"], c: 0,
      why_ko: "모든 것이 재에 묻히기 전에 찾아야 하기 때문이에요. 요약이 \"before everything is buried in ash\" 라고 말해요.",
      why: "They must find it \"before everything is buried in ash.\"" },
    { q: "What word does the description use for the ash?",
      a: ["Burning", "Cold", "Wet", "Grey"], c: 0,
      why_ko: "소개글이 고른 낱말은 burning 이에요. \"covered with burning ash\" 라고 적혀 있어요.",
      why: "\"Burning.\" The description says \"covered with burning ash.\"" },
    { q: "What is a scroll?",
      a: ["A long piece of paper rolled up", "A small stone", "A kind of boat", "A wooden box"], c: 0,
      why_ko: "두루마리는 길게 말아 둔 종이예요. 옛날에는 책 대신 두루마리에 글을 적었어요.",
      why: "A scroll is a long piece of paper rolled up, used for writing long ago." },
    { q: "What does \"erupt\" mean?",
      a: ["To burst out with fire and ash", "To fall asleep", "To melt slowly", "To grow taller"], c: 0,
      why_ko: "erupt 는 화산이 불과 재를 터뜨려 내뿜는 것을 말해요. 제목의 volcano 와 짝을 이루는 낱말이에요.",
      why: "To erupt is to burst out suddenly, the way a volcano throws out fire and ash." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack reached into his drawer and took out his secret library card.\"", "\"Jack and Annie were sitting on the porch of their house.\"", "\"Jack couldn't sleep.\"", "\"The mountain was smoking.\""], c: 0,
      why_ko: "첫 문장은 \"Jack reached into his drawer and took out his secret library card.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. 현관에 앉아 있는 문장은 10권의 첫 문장이에요.",
      why: "That is the recorded first line. The porch sentence opens book #10, not this one." },
    { q: "What did Jack take out of his drawer?",
      a: ["His secret library card", "A map of Italy", "A Roman scroll", "A photograph"], c: 0,
      why_ko: "비밀 도서관 카드예요. 첫 문장이 \"his secret library card\" 라고 말해요. 두루마리는 폼페이에서 찾는 것이지 서랍에 있던 게 아니에요.",
      why: "His secret library card, named in the book's first sentence." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where the tree house takes them", "Which volcano is about to erupt", "Whether they find the scroll in the end", "What they are searching for"], c: 2,
      why_ko: "두루마리를 찾았는지예요. 우리가 가진 글은 '재에 묻히기 전에 찾아야 한다'에서 멈춰요. 찾았는지는 책을 읽어야 알 수 있어요.",
      why: "Whether they find the scroll. Our sources stop at \"must find a Roman scroll.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(So·Then·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Pompeii, in Italy}}", time: "{{the days of the Roman Empire}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to find a Roman scroll}}" },
      { k: "But",      v: "{{Vesuvius was about to erupt}}" },
      { k: "So",       v: "{{                    }}" },   // 두 아이가 어떻게 했는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Library Card",
        given: "The book begins, \"Jack reached into his drawer and took out his secret library card.\"",
        frame: "Then the magic tree house takes them to {{the days of the Roman Empire}}." },
      { label: "Pompeii",
        given: "",
        frame: "They arrive in {{Pompeii}}, in {{Italy}}, just as {{Vesuvius}} is about to erupt." },
      { label: "The Scroll",
        given: "",
        frame: "They rush in search of {{a Roman scroll}}, before everything is buried in {{burning ash}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Vacation Under the Volcano",
    branches: [
      { label: "Jack & Annie",   ask: "The book opens with Jack taking a secret library card out of his drawer. What does that tell you about how the journey starts?",
        deeper: "Why do you think a small, ordinary thing is often what opens the door to an adventure?" },
      { label: "The Tree House", ask: "Where and when does the magic tree house take Jack and Annie this time?",
        deeper: "Why would a tree house choose a town on the very day its volcano erupts?" },
      { label: "Pompeii",        ask: "Pompeii is a town in Italy. What do you already know about towns near a volcano?",
        deeper: "Why would people build a town so close to a mountain that can erupt?" },
      { label: "The Volcano",    ask: "Vesuvius is about to erupt. What do you picture when you hear that?",
        deeper: "What is the difference between a danger you can see coming and one that surprises you?" },
      { label: "The Scroll",     ask: "Jack and Annie rush to find a Roman scroll. Why would a piece of writing be worth a rush like that?",
        deeper: "If a town is about to be buried, why save writing instead of gold?" },
      { label: "Me",             ask: "If you had ten minutes before your town was covered in ash, what one thing would you carry out?",
        deeper: "What makes that one thing worth more to you than everything else you would leave behind?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Time", "Evidence", "Courage"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅은 지금 우리와 어떻게 다른가",
    statement: "When a place is about to change forever, people choose what is worth saving.",
    factual: [
      "Where and when does the magic tree house take Jack and Annie?",
      "What is about to happen to the town while they are there?",
      "What are they searching for before the ash covers everything?"
    ],
    conceptual: [
      "Why do people write things down instead of only remembering them?",
      "What is the difference between being in a hurry and being brave?"
    ],
    debatable: [
      "Is a piece of writing worth risking your life for?",
      "Should people be allowed to live next to a volcano?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "두루마리를 찾아야 한다" 까지만 말한다. 두 아이가 찾았는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie rush to find a Roman scroll while Vesuvius is about to erupt. Is a piece of writing worth that danger? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Worth the Ash", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think some writing is worth running into danger for.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, they rush to find a Roman scroll as Vesuvius is about to erupt.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they kept searching even when ash was about to bury the town.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say no paper is worth a life, but writing can last longer than a town.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe words can be worth the risk.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to Pompeii in the days of the Roman Empire, where they rush to find a Roman scroll before Vesuvius erupts and buries everything in burning ash, then take a side on whether writing is worth that danger.",
      ko: "마법의 나무 집이 잭과 애니를 로마 제국 시대의 폼페이로 데려가고, 베수비오 화산이 터져 모든 것이 타는 재에 묻히기 전에 두 아이가 로마 두루마리를 찾아 서두르는 흐름을 말하고, 글 한 장이 그만한 위험을 무릅쓸 값이 있는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "A mountain that throws out fire and ash. What do we call it? What would you do if you lived beside one?",
        do: "책을 펴기 전에 한다. 화산을 아이 입에서 먼저 꺼내야 제목이 읽힌다. 서너 명만.",
        exp: "A volcano. / I would run away. / I would move to another town.",
        stuck: "선생님이 먼저 한 문장 한다. \"It is a volcano, and I would run.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Vacation Under the Volcano.\" Does that sound like a good vacation to you?",
        do: "제목의 어긋남만 짚는다. 줄거리는 말하지 않는다.",
        exp: "No, it sounds dangerous. / A vacation should be safe.",
        stuck: "표지를 가리킨다. \"Look at the cover. Is anyone resting there?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "화산 → volcano / 두루마리 → scroll / 재 → ash",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What town...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to Pompeii, in Italy.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack reached into his drawer and took out his secret library card.\" No volcano yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 조용한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day at home. / The adventure has not started yet.",
        stuck: "\"What was in YOUR pocket before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to find a Roman scroll / But: Vesuvius was about to erupt — So·Then 은 아이가 책에서 가져온다",
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

      { stage: "Mind Map (The Scroll)", min: "",
        say: "Stop at The Scroll. Don't just tell me they looked for it — tell me why PAPER is worth running toward a volcano.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Writing keeps what people knew. If it burns, nobody can read it again.",
        stuck: "\"You told me what they did. Now — why not carry out gold instead?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is a piece of writing worth risking your life for? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie kept searching while the volcano was about to erupt.",
        stuck: "손을 들게 한다. \"Go back for the scroll? Or run?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say no paper is worth a life, but writing lasts longer than a town.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about volcanoes?", ko: "화산에 대해 이미 아는 게 있니?" },
        { en: "Have you ever had to grab one thing and leave in a hurry?", ko: "한 가지만 챙겨서 급히 나와야 했던 적이 있니?" },
        { en: "The title calls it a vacation. Why is that a strange word here?", ko: "제목은 이걸 '방학'이라고 불러. 왜 어울리지 않는 말일까?" }
      ],
      during: [
        { en: "What do you think is written on the Roman scroll?", ko: "그 로마 두루마리에는 무엇이 적혀 있을 것 같니?" },
        { en: "What would a town look like on the day its volcano is about to erupt?", ko: "화산이 터지려는 날의 마을은 어떤 모습일까?" }
      ],
      after: [
        { en: "Do Jack and Annie find the scroll? Tell me what our summary did not tell us.", ko: "잭과 애니는 두루마리를 찾았니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Who did they meet in Pompeii, and how did that help them?", ko: "폼페이에서 누구를 만났고, 그게 어떤 도움이 되었니?" },
        { en: "How did they get out before the ash covered everything?", ko: "재가 모든 것을 덮기 전에 두 아이는 어떻게 빠져나왔니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "So·Then 두 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Scroll' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 두루마리를 찾았는지도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 로마 제국 시대의 폼페이로 가는 이야기",
    text: "Jack reached into his drawer and took out his [[hidden|secret]] library card. Then the magic tree house took Jack and Annie to the days of the Roman [[kingdom|Empire]]. It set them down in Pompeii, a town in Italy. [[The volcano|Vesuvius]] was about to [[blow up|erupt]]. The two children had to [[hurry|rush]] in search of a Roman [[rolled-up paper|scroll]], before the whole town was [[covered|buried]] in burning [[dust|ash]]. Did they find it in time? Open the book and find out."
  }
};
