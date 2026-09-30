// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Stage Fright on a Summer Night (Magic Tree House #25) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3268.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 장서 목록의
// 질문 셋 · 오픈라이브러리 출판사 소개글 · 주제어 목록 · 지명 목록)만으로 만들었다.
// 그 밖의 인물 이름·장소·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는
// 지어내지 않고 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 엘리자베스 시대의 런던(Elizabethan London)으로 보낸다 /
//   거기서 역사상 가장 위대한 작가 가운데 한 사람인 윌리엄 셰익스피어를 마주친다 /
//   두 아이는 A Midsummer Night's Dream 공연의 배우가 된다 /
//   길들여진 곰 한 마리를 구하려 한다(try to rescue) /
//   지명 목록은 England · Great Britain 이다
// 셰익스피어에 대해 근거가 말하는 것은 이름과 "one of the greatest writers of all time" 뿐이다.
// 그가 산 연도·극장 이름·다른 작품 이름·생김새·성격은 어느 출처도 말하지 않아 한 글자도 쓰지 않았다.
// A Midsummer Night's Dream 은 소개글에 그대로 적힌 작품 이름이라 썼다. 그 줄거리는 근거 밖이라 쓰지 않았다.
// 곰을 구했는지, 공연이 어떻게 끝났는지, 두 아이가 어떻게 돌아가는지는 어느 출처도 말하지 않는다.
// 장서 요약은 "encounter ... William Shakespeare" 에서, 소개글은 "try to rescue a tame bear" 에서 끊긴다.
// 이 책도 24권처럼 오픈라이브러리에 **첫 문장이 비어 있다**. 그래서 첫 문장을 묻는 문항도,
// 문법 보기도, 낭독의 첫 줄도 이 파일 어디에도 두지 않았다. 지어내지 않는다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3268",
  slug: "magic-tree-house-stage-fright-on-a-summer-night",
  title: "Stage Fright on a Summer Night",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #25",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "560L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/233641-M.jpg",
  // 장서 목록의 수상 칸이 비어 있다. 주제어에 "New York Times bestseller" 가 있으나 상이 아니라 분류다.
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 장서 목록에 함께 적힌 질문 셋과 오픈라이브러리 출판사 소개글·주제어 목록·지명 목록을 겹쳐 보았다. 사람의 기억도, 셰익스피어에 대해 우리가 따로 아는 것도 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3268 요약 + 오픈라이브러리 /works/OL81805W (소개글 · 주제어 Tree houses/Theater in fiction/Magic in fiction/England in fiction/Time travel in fiction/Theater/Magic · 지명 England/Great Britain · 71쪽 · 2002년 · 첫 문장 칸은 비어 있음)",
    characters: ["Jack", "Annie", "William Shakespeare", "a tame bear"],
    beats: [
      "the magic tree house sends Jack and Annie to Elizabethan London",
      "there they encounter one of the greatest writers of all time, William Shakespeare",
      "they become actors in a production of A Midsummer Night's Dream and try to rescue a tame bear"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 셰익스피어를 마주친다는 데서 멈추고, 소개글은 \"try to rescue a tame bear\" 에서 끊긴다. try 는 해 본다는 말일 뿐 해냈다는 말이 아니다. 곰이 무사한지, 두 아이가 무대에 올라 어떻게 했는지, 셰익스피어와 무슨 말을 주고받는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 장서 목록의 세 번째 질문 자체가 \"Write what you would ask Shakespeare if you met him\" 이라 아이에게 되묻는 꼴이다. 그래서 비워 둔다",
    checked: "장서 요약(\"The magic tree house sends Jack and Annie to Elizabethan London\", \"they encounter one of the greatest writers of all time, William Shakespeare\", \"Book #25\")과 소개글(\"travel in their magic tree house to Elizabethan London\", \"become actors in a production of A Midsummer Night's Dream\", \"try to rescue a tame bear\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(배우가 된다 · 작품 이름 · 길들여진 곰)은 요약과 부딪히지 않아 남겼다. 주제어 Theater/Theater in fiction/Magic/Tree houses/Time travel in fiction/England in fiction 이 같은 것을 가리켜 한 번 더 받쳐 주었다. 지명 목록의 England 와 Great Britain 이 런던을 받쳐 주어 나라까지만 적었다. 셰익스피어에 대해 두 출처가 말하는 것은 이름과 \"one of the greatest writers of all time\" 뿐이라, 연도·극장 이름·다른 작품·생애는 학습지 어디에도 쓰지 않았다. A Midsummer Night's Dream 은 이름만 쓰고 그 줄거리는 쓰지 않았다. 제목의 Summer Night 과 작품 이름이 닮은 것은 우리 눈에 보이는 것일 뿐 어느 출처도 그렇게 말하지 않아, 사실이 아니라 아이에게 물어보는 질문으로만 두었다. 10권과 달리 첫 문장 칸이 비어 있어 첫 문장을 묻는 문항·문법 보기·낭독 시작 줄을 모두 넣지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 세 편의 제목을 하나하나 확인해 모두 이 책(#25 Stage Fright on a Summer Night)임을 보았다.
  // 다른 권의 낭독이 섞여 들어온 것은 없었다. 첫 편은 장서 근거(S3268.json)의 영상 목록에도 같은 것이 있다.
  // 세 번째 The Halfling Storytime 은 4분 10초, 제목 끝의 "1" 이 말하듯 앞부분만 읽은 것이다.
  // 그래서 통본(44분·45분) 두 편을 앞에 놓고 그 뒤에 두었다.
  shadowing: {
    query: "\"Stage Fright on a Summer Night\" read aloud",
    searchUrl: "https://youtu.be/IyPYXP5rhmU",
    videos: [
      { url: "https://youtu.be/IyPYXP5rhmU", title: "Magic Tree House| #25 Stage Fright on a Summer Night| MARY POPE OSBORNE| New York Times Bestselling",
        channel: "EUNICE books and words", views: "5,323", length: "44:34" },
      { url: "https://youtu.be/JvdQF3DRGBU", title: "Magic Tree House (25) Stage Fright On A Summer Night",
        channel: "산타잉글리쉬", views: "1,017", length: "45:01" },
      { url: "https://youtu.be/VwtKAgfMxXM", title: "Stage Fright on a Summer Night   1 (앞부분만 — 통본이 아니다)",
        channel: "The Halfling Storytime", views: "318", length: "4:10" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·장서 질문·출판사 소개글·주제어·지명에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "stage",      pos: "n.",   en: "the raised floor in a theater where actors stand", ko: "무대",
      ex: "Actors stand on the {{stage}} in front of everyone.", ex_ko: "배우들은 모두 앞에서 무대 위에 서요.", pic: "🎭" },
    { word: "fright",     pos: "n.",   en: "a sudden strong feeling of fear", ko: "두려움, 겁",
      ex: "\"Stage {{fright}}\" is the fear of acting in front of people.", ex_ko: "'무대 공포'는 사람들 앞에서 연기하는 두려움이에요.", pic: "😨" },
    { word: "actor",      pos: "n.",   en: "a person who acts a part in a play", ko: "배우",
      ex: "Jack and Annie become {{actors}} in London.", ex_ko: "잭과 애니는 런던에서 배우가 돼요.", pic: "🎬" },
    { word: "play",       pos: "n.",   en: "a story that actors perform on a stage", ko: "연극",
      ex: "Have you ever watched a {{play}}?", ex_ko: "연극을 본 적이 있나요?", pic: "🎟️" },
    { word: "theater",    pos: "n.",   en: "a building where people go to watch plays", ko: "극장, 연극",
      ex: "\"Theater\" is one of the subjects of this book.", ex_ko: "'연극'은 이 책의 주제어 가운데 하나예요.", pic: "🏛️" },
    { word: "production", pos: "n.",   en: "one particular staging of a play", ko: "공연, 제작",
      ex: "They act in a {{production}} of a famous play.", ex_ko: "그들은 유명한 연극 공연에 나와요.", pic: "📜" },
    { word: "writer",     pos: "n.",   en: "a person who writes books, plays or stories", ko: "작가",
      ex: "Shakespeare was one of the greatest {{writers}} of all time.", ex_ko: "셰익스피어는 역사상 가장 위대한 작가 가운데 하나였어요.", pic: "✒️" },
    { word: "encounter",  pos: "v.",   en: "to meet someone, often without planning it", ko: "마주치다",
      ex: "In London they {{encounter}} William Shakespeare.", ex_ko: "런던에서 그들은 윌리엄 셰익스피어를 마주쳐요.", pic: "👋" },
    { word: "rescue",     pos: "v.",   en: "to save someone or something from danger", ko: "구하다",
      ex: "Jack and Annie try to {{rescue}} a bear.", ex_ko: "잭과 애니는 곰 한 마리를 구하려고 해요.", pic: "🆘" },
    { word: "tame",       pos: "adj.", en: "not wild; used to living near people", ko: "길들여진",
      ex: "The bear in this story is a {{tame}} one.", ex_ko: "이 이야기에 나오는 곰은 길들여진 곰이에요.", pic: "🐻" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 근거에 첫 문장이 없어, 책 문장을 그대로 옮긴 보기는 하나도 넣지 않았다.
  grammar: {
    points: [
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] to London and [[tried]] to rescue a bear.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled. 자음 + y 로 끝나면 y 를 i 로 바꿔요. try → tried.",
        why: "Add -ed for something already finished. If the verb ends in consonant + y, change y to i: try → tried.",
        try: "Yesterday I {{walked}} to school and {{studied}} for an hour." },
      { name: "불규칙 과거형", ko: "become → became",
        sent: "In London the two children [[became]] actors, and they [[met]] a great writer.",
        why_ko: "-ed 가 안 붙는 동사가 있어요. become → became, meet → met, send → sent. 외워 두는 수밖에 없어요!",
        why: "Some verbs do not take -ed. become → became, meet → met, send → sent.",
        try: "Last summer I {{became}} a better swimmer and {{met}} a new friend." },
      { name: "try to + 동사원형", ko: "to부정사",
        sent: "Jack and Annie try [[to rescue]] a tame bear.",
        why_ko: "'~하려고 하다' 는 try + to + 동사원형이에요. try to rescue. try 는 해 본다는 말이지, 해냈다는 말이 아니에요!",
        why: "Use try + to + base verb: try to rescue. \"Try\" means they attempt it, not that they succeed.",
        try: "I will try {{to help}} my little sister." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie (travel / traveled) to Elizabethan London.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "They (try / tried) to rescue a tame bear.", a: "tried",
          why_ko: "try 는 y 앞이 자음이라 y 를 i 로 바꾸고 -ed 를 붙여요. tried!" },
        { q: "In London they (become / became) actors.", a: "became",
          why_ko: "become 은 불규칙 동사예요. 과거형은 becomed 가 아니라 became." },
        { q: "Jack and Annie try (rescue / to rescue) the bear.", a: "to rescue",
          why_ko: "try 뒤에는 to + 동사원형이 와요. try to rescue!" },
        { q: "Shakespeare (was / were) one of the greatest writers of all time.", a: "was",
          why_ko: "Shakespeare 는 한 사람이에요. 단수 주어의 과거 be동사는 was." }
      ],
      fix: [
        { q: "The magic tree house [[send]] Jack and Annie to Elizabethan London.", a: "sent",
          why_ko: "send 는 불규칙 동사예요. 과거형은 sended 가 아니라 sent!" },
        { q: "Jack and Annie [[tryed]] to rescue a tame bear.", a: "tried",
          why_ko: "tryed 가 아니에요. y 를 i 로 바꿔 tried 로 씁니다." },
        { q: "The two children [[was]] actors in a play.", a: "were",
          why_ko: "주어가 둘이니 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "그들은 런던에서 배우가 되었다.", cond: "become, 과거형, in London", a: "They became actors in London.",
          why_ko: "become 의 과거형은 became 이에요. '배우가 되다' 는 become actors." },
        { ko: "잭과 애니는 길들여진 곰을 구하려고 했다.", cond: "try, to, rescue, 과거형", a: "Jack and Annie tried to rescue a tame bear.",
          why_ko: "try 의 과거형은 tried, 그 뒤에 to + 동사원형 rescue 가 와요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what sends them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} sends them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "What city do Jack and Annie go to, and whom do they encounter there?",
      frame: "They go to {{Elizabethan London}}, and they encounter {{William Shakespeare}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What do Jack and Annie become in London, and in a production of which play?",
      frame: "They become {{actors}}, in a production of {{A Midsummer Night's Dream}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What animal do Jack and Annie try to rescue? What word describes it?",
      frame: "They try to rescue {{a bear}}. The description calls it {{tame}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Stage Fright on a Summer Night.\" What do you think \"stage fright\" means?",
      frame: "I think stage fright means {{                    }}." },
    { ref: "장서 질문", skill: "추론·예측", q: "Our summary stops at the moment they meet Shakespeare. If you met him, what would you ask him?",
      frame: "I would ask him {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Have you ever been in a play, or watched one? How did it feel to be there?",
      frame: "I {{have / have not}}, and it felt {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and Shakespeare", "Two actors"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"sends Jack and Annie to Elizabethan London\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["In their magic tree house", "By ship", "In a carriage", "They walk there"], c: 0,
      why_ko: "마법의 나무 집이에요. 소개글이 \"travel in their magic tree house\" 라고 적어요. 주제어에도 Tree houses 와 Magic 이 있어요.",
      why: "The magic tree house — \"travel in their magic tree house,\" says the description." },
    { q: "Which city does the magic tree house send them to?",
      a: ["London", "Paris", "Rome", "New York"], c: 0,
      why_ko: "런던이에요. 요약과 소개글이 둘 다 Elizabethan London 이라고 적어요.",
      why: "London. Both sources say \"Elizabethan London.\"" },
    { q: "London is in which country?",
      a: ["England", "Spain", "Japan", "Mexico"], c: 0,
      why_ko: "잉글랜드예요. 오픈라이브러리 지명 목록에 England 와 Great Britain 이 적혀 있어요.",
      why: "England. The library's place list gives England and Great Britain." },
    { q: "Whom do Jack and Annie encounter in Elizabethan London?",
      a: ["William Shakespeare", "Morgan le Fay", "Mary Pope Osborne", "A misplaced cowboy"], c: 0,
      why_ko: "윌리엄 셰익스피어예요. 장서 요약이 그 이름을 그대로 적어요. 메리 폽 어즈번은 이 책을 쓴 작가예요.",
      why: "William Shakespeare — the catalog summary names him. Mary Pope Osborne is the author of this book." },
    { q: "How does our summary describe William Shakespeare?",
      a: ["One of the greatest writers of all time", "A famous king", "A sailor", "A tree house builder"], c: 0,
      why_ko: "\"one of the greatest writers of all time\" 이라고 적혀 있어요. 요약이 쓴 말 그대로예요.",
      why: "\"One of the greatest writers of all time\" — the summary's exact words." },
    { q: "What do Jack and Annie become while they are in London?",
      a: ["Actors", "Soldiers", "Sailors", "Teachers"], c: 0,
      why_ko: "배우가 돼요. 소개글이 \"they become actors in a production\" 이라고 말해요.",
      why: "Actors. The description says they \"become actors in a production.\"" },
    { q: "Which play are they in a production of?",
      a: ["A Midsummer Night's Dream", "Peter Pan", "The Wizard of Oz", "Cinderella"], c: 0,
      why_ko: "A Midsummer Night's Dream 이에요. 소개글에 그 이름이 그대로 적혀 있어요.",
      why: "A Midsummer Night's Dream, named in the description." },
    { q: "What animal do Jack and Annie try to rescue?",
      a: ["A tame bear", "A wild horse", "A lost dog", "A baby bird"], c: 0,
      why_ko: "길들여진 곰이에요. 소개글이 \"try to rescue a tame bear\" 라고 적어요.",
      why: "A tame bear — \"try to rescue a tame bear,\" says the description." },
    { q: "What does the word \"tame\" mean?",
      a: ["Not wild; used to living near people", "Very large", "Fast asleep", "Made of wood"], c: 0,
      why_ko: "tame 은 야생이 아니라 사람 곁에서 길들여졌다는 뜻이에요. 소개글이 곰을 그렇게 불러요.",
      why: "Not wild — used to living near people. It is the description's own word for the bear." },
    { q: "What does \"stage fright\" in the title mean?",
      a: ["Being afraid to perform in front of people", "A light above the stage", "A kind of play", "Running onto a stage"], c: 0,
      why_ko: "무대에서 사람들 앞에 서는 것이 무서운 마음이에요. 제목의 두 낱말 stage 와 fright 를 붙인 말이에요.",
      why: "The fear of performing in front of an audience — \"stage\" plus \"fright.\"" },
    { q: "Which of these is listed as a subject of this book?",
      a: ["Theater", "Space travel", "Cooking", "Football"], c: 0,
      why_ko: "Theater 예요. 주제어 목록에 Theater, Theater in fiction, Magic, Tree houses, Time travel in fiction 이 적혀 있어요.",
      why: "Theater. The subject list gives Theater, Magic, Tree houses and Time travel in fiction." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#24", "#25", "#45"], c: 2,
      why_ko: "25권이에요. 장서 목록 제목이 \"#25. Stage Fright on a Summer Night\" 이고 요약 끝에도 Book #25 라고 적혀 있어요.",
      why: "Book #25 — the catalog title is \"#25. Stage Fright on a Summer Night.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "Whom they meet there", "Whether they rescue the bear", "What play they act in"], c: 2,
      why_ko: "곰을 구했는지 어떤지예요. 우리가 가진 글은 \"try to rescue\"(구하려고 한다)에서 멈춰요. try 는 해 본다는 말일 뿐이에요. 답은 책에만 있어요.",
      why: "Whether they rescue the bear. Our sources stop at \"try to rescue a tame bear.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·해결·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Elizabethan London, in England}}", time: "{{a summer night}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to rescue a tame bear}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지 근거가 말하지 않는다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house sends Jack and Annie back in time.",
        frame: "They travel to {{Elizabethan London}}, in {{England}}." },
      { label: "The Great Writer",
        given: "",
        frame: "There they encounter {{William Shakespeare}}, one of the {{greatest writers}} of all time." },
      { label: "On the Stage",
        given: "",
        frame: "The two children become {{actors}} in a production of {{A Midsummer Night's Dream}}." },
      { label: "The Bear",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "They try to rescue {{a tame bear}}, and in the end {{                    }}." },
      { label: "The Ending",
        given: "",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Stage Fright on a Summer Night",
    branches: [
      { label: "Jack & Annie",   ask: "What do we know about the two children before this adventure starts?",
        deeper: "Why do you think the same two children are sent somewhere new in every book?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think it chose London, and a night in summer, for them?" },
      { label: "Shakespeare",    ask: "Our summary calls him one of the greatest writers of all time. What makes a writer great?",
        deeper: "If you met him, what would you ask him? Why that question and not another?" },
      { label: "The Stage",      ask: "Jack and Annie become actors. What is hard about standing on a stage?",
        deeper: "The title says stage fright. Is being afraid a reason to stop, or a reason to practise?" },
      { label: "The Tame Bear",  ask: "The description calls the bear tame. What does that tell you about its life?",
        deeper: "Why might a tame animal need rescuing more than a wild one would?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for a night like this one? Why?",
        deeper: "Would you rather be on the stage, or watching from a seat? Say why." }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Creativity",
    relatedConcepts: ["Time", "Courage", "Audience"],
    globalContext: "Personal and cultural expression — 사람들은 이야기를 어떻게 남들 앞에 내놓는가",
    statement: "A story reaches other people only when someone is brave enough to stand up and tell it.",
    factual: [
      "Where does the magic tree house send Jack and Annie?",
      "Whom do they encounter there, and how does our summary describe him?",
      "What do they become, and what do they try to rescue?"
    ],
    conceptual: [
      "Why do people still perform plays that were written long ago?",
      "What is the difference between being afraid and being unprepared?"
    ],
    debatable: [
      "Should every student have to stand up and perform in front of the class?",
      "Is a story worth more when it is read alone, or when it is acted for other people?"
    ],
    learnerProfile: ["Risk-taker", "Communicator", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "배우가 된다 · 곰을 구하려 한다" 까지만 말한다. 두 아이가 무대에서 어떻게 했는지도,
    // 곰이 무사한지도 적혀 있지 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie become actors on a stage in London. Should every student have to perform in front of other people? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Standing on the Stage", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think every student should perform at least once.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie become actors in a play in London.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that two ordinary children can stand up in front of people.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say stage fright is too hard, but it gets smaller each time.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a stage is a good place to be brave.", lines: 2 }
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
      en: "Students retell how the magic tree house sends Jack and Annie to Elizabethan London, where they encounter William Shakespeare, become actors in a production of A Midsummer Night's Dream and try to rescue a tame bear, then take a side on whether every student should perform in front of other people.",
      ko: "마법의 나무 집이 잭과 애니를 엘리자베스 시대 런던으로 보내고, 두 아이가 윌리엄 셰익스피어를 마주치며 A Midsummer Night's Dream 공연의 배우가 되고 길들여진 곰을 구하려 하는 흐름을 말하고, 모든 학생이 사람들 앞에서 발표해야 하는지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 셰익스피어에 대해 근거가 말하는 것은 이름과 "가장 위대한 작가 가운데 하나" 뿐이다.
    // 연도·극장·다른 작품을 덧붙이지 않는다. 아이가 물으면 "우리 자료엔 없다"고 말하고 함께 찾아보게 한다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Stand up here and say your name to the class. Hands go cold, right? What is that feeling called?",
        do: "책을 펴기 전에 한다. 제목의 stage fright 를 아이 몸에서 먼저 꺼낸다. 서너 명만.",
        exp: "Nervous. / Scared. / My heart beats fast.",
        stuck: "선생님이 먼저 한 문장 한다. \"My hands shake when everyone looks at me.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Stage Fright on a Summer Night.\" What is a stage? What is fright?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "A stage is where actors stand. Fright is being scared.",
        stuck: "표지를 가리킨다. \"Where do you think these two are standing?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "배우 → actor / 구하다 → rescue / 길들여진 → tame",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What city...' becomes 'They go to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They go to Elizabethan London, and they encounter William Shakespeare.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The description says they TRY TO rescue the bear. Not that they rescued it. Why does that little word matter?",
        do: "소개글의 낱말 그대로를 칠판에 쓴다. 근거를 정확히 옮기는 훈련이다.",
        exp: "Try means they attempt it. We do not know yet if it worked.",
        stuck: "\"If I say I tried to call you, did we talk?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to rescue a tame bear — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they trying to do?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Stage)", min: "",
        say: "Stop at The Stage. Don't tell me acting is scary — tell me what is actually HARD about it.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 느낌이 아니라 이유를 받는다.",
        exp: "Everyone is looking. You can forget your words. You cannot start again.",
        stuck: "\"You told me how it feels. Now — what could go wrong up there?\"" },

      { stage: "Mind Map (Shakespeare)", min: "",
        say: "Our summary says one thing about him: one of the greatest writers of all time. That is all we know. What would you ask him?",
        do: "아이가 셰익스피어에 대해 더 물으면 \"우리 자료엔 없다\" 고 그대로 말한다. 지어내지 않는 태도를 보여 주는 자리다.",
        exp: "Where do your stories come from? / Were you ever scared on a stage?",
        stuck: "\"Ask him something only HE could answer.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should every student have to perform in front of the class? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie were ordinary children and they did it.",
        stuck: "손을 들게 한다. \"Onto the stage? Or into a seat?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say stage fright is too hard, but it gets smaller each time.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Have you ever been in a play, or watched one?", ko: "연극에 나가 본 적이 있니? 아니면 본 적은?" },
        { en: "What do you already know about William Shakespeare?", ko: "윌리엄 셰익스피어에 대해 이미 아는 게 있니?" },
        { en: "The title says a summer night. What happens on summer nights where you live?", ko: "제목이 여름밤이라고 해. 너희 동네 여름밤에는 무슨 일이 있니?" }
      ],
      during: [
        { en: "Jack and Annie become actors. Would you want that part, or a seat in the audience?", ko: "잭과 애니는 배우가 돼. 너라면 무대에 서겠니, 객석에 앉겠니?" },
        { en: "The bear is tame. How do you think it ended up needing rescuing?", ko: "그 곰은 길들여진 곰이야. 왜 구해 줘야 하는 처지가 됐을까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie rescue the bear? What happened?", ko: "잭과 애니는 곰을 구했니? 어떻게 됐어?" },
        { en: "What was Shakespeare like in the book? Write what you would ask him.", ko: "책 속 셰익스피어는 어떤 사람이었니? 그에게 묻고 싶은 걸 써 봐." }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Stage' 가지에서 반드시 멈춘다. 느낌이 아니라 이유를 받는다.", miss: "→ 칸에 '무서웠다' 만 쓴다." },
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
  // 근거(장서 요약 · 장서 질문 · 출판사 소개글 · 주제어 · 지명)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 근거에 없어 책 문장을 한 줄도 옮기지 않았다.
  // 근거가 결말도, 곰이 무사한지도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 엘리자베스 시대의 런던으로 가 무대에 서는 이야기",
    text: "Jack and Annie traveled in their [[wonder-working|magic]] tree house, back through time to [[the London of long ago|Elizabethan London]], in England. There they [[met|encountered]] one of the [[finest|greatest]] writers of all time, William Shakespeare. In that city the two children [[turned into|became]] actors in a [[staging|production]] of A Midsummer Night's Dream. They also tried to [[save|rescue]] a [[gentle|tame]] bear. Did the bear come safely through? Did Jack and Annie get through the play? Our summary stops right here. Open the book and find out."
  }
};
