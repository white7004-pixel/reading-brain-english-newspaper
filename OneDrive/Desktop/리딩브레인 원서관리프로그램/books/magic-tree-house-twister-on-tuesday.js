// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.2)
// Twister on Tuesday (Magic Tree House #23) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3266.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 지명 목록)만으로 만들었다. 그 밖의 인물 이름·
// 마을 이름·해·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 캔자스 대초원(the Kansas prairie)으로 데려간다 /
//   거기서 "something to learn"(배울 무엇)을 찾아야 한다 / 개척자(pioneers)의 삶이
//   얼마나 고단했는지 이해하게 된다 / 토네이도의 공포(the terror of a tornado)를 겪는다 /
//   책의 첫 문장은 "Jack opened his eyes."
// 배울 무엇이 결국 무엇이었는지도, 결말도 근거가 말하지 않는다. 장서 요약은 "찾아야 한다"에서,
// 소개글은 "experience the terror of a tornado"에서 끊긴다. 그래서 비워 두었다.
// 이야기가 몇 년도 일인지 어느 출처도 말하지 않는다 (2001년은 책이 나온 해다). 쓰지 않았다.
// 토네이도가 어떻게 생기는지·캔자스가 어떤 곳인지 같은 기상·지리 지식은 근거 밖이라 넣지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3266",
  slug: "magic-tree-house-twister-on-tuesday",
  title: "Twister on Tuesday",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #23",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.2", lexile: "570L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424181-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3266 요약 + 오픈라이브러리 /works/OL81815W (소개글 · 첫 문장 \"Jack opened his eyes.\" · 주제어 Tornadoes/Magic/Frontier and pioneer life/Tree houses/Time travel · 지명 Kansas, USA · 70쪽 · 2001년)",
    characters: ["Jack", "Annie", "pioneers"],
    beats: [
      "the magic tree house takes Jack and Annie back to the Kansas prairie",
      "on the prairie they must find \"something to learn\"",
      "they gain an understanding of how hard life was for pioneers, and they experience the terror of a tornado"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"they must find 'something to learn'\" 에서 멈추고, 소개글은 \"they experience the terror of a tornado\" 에서 끊긴다. 그 '배울 무엇'이 무엇으로 드러나는지, 두 아이가 토네이도를 어떻게 넘기는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"the magic tree house\", \"back to the Kansas prairie\", \"must find 'something to learn'\")과 소개글(\"travel back to the Kansas prairie\", \"in search of 'something to learn'\", \"how hard life was for pioneers\", \"the terror of a tornado\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(개척자들의 고단한 삶 · 토네이도의 공포)은 요약과 부딪히지 않아 남겼다. 주제어 Tornadoes/Frontier and pioneer life/Tree houses/Time travel 이 같은 것을 가리켜 한 번 더 받쳐 주었다. 인물 목록(people)은 비어 있어 잭과 애니 말고 이름을 가진 사람은 한 명도 쓰지 않았다. 지명은 Kansas·USA 만 썼다(목록의 'Nordamerika' 는 같은 곳을 독일어로 적은 도서관 표기라 쓰지 않았다). 이야기의 연도는 어느 출처도 말하지 않아 비워 두었고, 2001년은 출간년도로만 다루었다. 낭독 영상 세 편은 제목을 하나씩 확인해 모두 이 책(#23 Twister on Tuesday)임을 보았다 (2026-09-30)",
  },

  // 낭독 영상 — .superpowers/book/vid-S3266.json 에서 가져와 제목을 한 편씩 확인했다 (2026-09-30).
  // 세 편 모두 제목에 Twister on Tuesday 가 있어 다른 권이 섞이지 않았다.
  // 두 번째 영상은 3분짜리 '앞부분만' 낭독이다. 통으로 들을 때는 첫 번째나 세 번째를 쓴다.
  shadowing: {
    query: "\"Twister on Tuesday\" read aloud",
    searchUrl: "https://youtu.be/5EkaF1_31Xw",
    videos: [
      { url: "https://youtu.be/5EkaF1_31Xw", title: "MAGIC TREE HOUSE #23 TWISTER ON TUESDAY | STORYTIME FOR KIDS | READ ALOUD FOR KIDS",
        channel: "Storytime With Miss Crystal", views: "8,033", length: "35:56" },
      { url: "https://youtu.be/C0ENgS8lNHM", title: "Magic Tree House | #23 Twister on Tuesday | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "5,704", length: "37:36" },
      { url: "https://youtu.be/xKazpXJ6REM", title: "Twister on Tuesday   1",
        channel: "The Halfling Storytime", views: "340", length: "3:17" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "twister",       pos: "n.",   en: "another word for a tornado", ko: "회오리바람, 토네이도",
      ex: "The title of this book is \"{{Twister}} on Tuesday.\"", ex_ko: "이 책의 제목은 '화요일의 회오리바람'이에요.", pic: "🌪️" },
    { word: "tornado",       pos: "n.",   en: "a very strong wind that spins round and round", ko: "토네이도",
      ex: "Jack and Annie experience the terror of a {{tornado}}.", ex_ko: "잭과 애니는 토네이도의 공포를 겪어요.", pic: "🌀" },
    { word: "prairie",       pos: "n.",   en: "a wide area of flat land covered with grass", ko: "대초원",
      ex: "The magic tree house takes them to the Kansas {{prairie}}.", ex_ko: "마법의 나무 집이 그들을 캔자스 대초원으로 데려가요.", pic: "🌾" },
    { word: "pioneer",       pos: "n.",   en: "one of the first people to go and live in a new land", ko: "개척자",
      ex: "They learn how hard life was for the {{pioneers}}.", ex_ko: "그들은 개척자들의 삶이 얼마나 고단했는지 알게 돼요.", pic: "🏕️" },
    { word: "terror",        pos: "n.",   en: "a very great fear", ko: "공포",
      ex: "They experience the {{terror}} of a tornado.", ex_ko: "그들은 토네이도의 공포를 겪어요.", pic: "😱" },
    { word: "learn",         pos: "v.",   en: "to come to know something new", ko: "배우다",
      ex: "On the prairie they must find something to {{learn}}.", ex_ko: "대초원에서 그들은 배울 무언가를 찾아야 해요.", pic: "📖" },
    { word: "understanding", pos: "n.",   en: "the knowing of what something is really like", ko: "이해",
      ex: "They gain an {{understanding}} of how hard pioneer life was.", ex_ko: "그들은 개척자의 삶이 얼마나 고단했는지 이해하게 돼요.", pic: "💡" },
    { word: "frontier",      pos: "n.",   en: "the far edge of a settled land, where few people have lived yet", ko: "변경, 개척지",
      ex: "\"{{Frontier}} and pioneer life\" is one of this book's subjects.", ex_ko: "'개척지와 개척자의 삶'은 이 책의 주제어 가운데 하나예요.", pic: "🌄" },
    { word: "magic",         pos: "n.",   en: "a special power that makes impossible things happen", ko: "마법",
      ex: "The {{magic}} tree house takes them back in time.", ex_ko: "마법의 나무 집이 그들을 과거로 데려갑니다.", pic: "✨" },
    { word: "travel",        pos: "v.",   en: "to go from one place to another", ko: "여행하다, 이동하다",
      ex: "Jack and Annie {{travel}} back to the Kansas prairie.", ex_ko: "잭과 애니는 캔자스 대초원으로 거슬러 갑니다.", pic: "🧳" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // opened 만은 책의 첫 문장("Jack opened his eyes.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure on the prairie and saw [[a]] tornado.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a tornado.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I read {{a}} book about {{an}} adventure." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"Jack [[opened]] his eyes.\" He and Annie [[traveled]] back to the Kansas prairie.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. open → opened, travel → traveled.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{opened}} my book and {{learned}} a new word." },
      { name: "must + 동사원형", ko: "~해야 한다",
        sent: "On the Kansas prairie, Jack and Annie [[must find]] \"something to learn.\"",
        why_ko: "must 는 '꼭 ~해야 한다'예요. 뒤에는 늘 동사원형이 오고, 주어가 누구든 모양이 바뀌지 않아요. musts 는 없어요.",
        why: "\"Must\" means you have to. The verb after it never changes: must find, must go, must read.",
        try: "I {{must go}} home now, and you {{must read}} this book." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie had (a / an) adventure on the prairie.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "They experience the terror of (a / an) tornado.", a: "a",
          why_ko: "tornado 는 '토'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "At the start of the book, Jack (open / opened) his eyes.", a: "opened",
          why_ko: "이미 일어난 일이니 과거형 opened 예요." },
        { q: "Jack and Annie (travel / traveled) back to the Kansas prairie.", a: "traveled",
          why_ko: "지난 일이에요. travel 에 -ed 를 붙여 traveled!" },
        { q: "On the prairie they (must / musts) find something to learn.", a: "must",
          why_ko: "must 는 주어가 누구든 -s 가 붙지 않아요. musts 라는 말은 없어요." }
      ],
      fix: [
        { q: "Jack [[open]] his eyes.", a: "opened",
          why_ko: "책의 첫 문장은 과거형이에요. open 에 -ed 를 붙여 opened 로 고쳐요." },
        { q: "The magic tree house [[take]] Jack and Annie to the Kansas prairie.", a: "takes",
          why_ko: "the magic tree house 는 하나, 3인칭 단수예요. 현재형 동사에 -s 를 붙여 takes!" },
        { q: "They [[gains]] an understanding of pioneer life.", a: "gain",
          why_ko: "주어 They 는 복수예요. 복수 주어에는 -s 를 붙이지 않아요." }
      ],
      write: [
        { ko: "잭은 눈을 떴다.", cond: "open, 과거형", a: "Jack opened his eyes.",
          why_ko: "'떴다'는 지난 일이에요. open 에 -ed 를 붙여 opened." },
        { ko: "그들은 개척자들의 삶이 얼마나 고단했는지 알게 되었다.", cond: "how hard, life, was", a: "They learned how hard life was for the pioneers.",
          why_ko: "'얼마나 ~했는지'는 how + 형용사 로 씁니다. how hard 뒤에는 보통 문장 순서(life was)가 와요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "책 전체", skill: "사실찾기", q: "Where does the magic tree house take Jack and Annie?",
      frame: "It takes them back to {{the Kansas prairie}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What must Jack and Annie find there?",
      frame: "They must find {{\"something to learn\"}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Name the two things Jack and Annie go through on the prairie.",
      frame: "They gain an understanding of {{how hard life was for pioneers}}, and they experience the terror of {{a tornado}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Twister on Tuesday.\" What is a twister, and what day does the title name?",
      frame: "A twister is {{a tornado}}, and the day is {{Tuesday}}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book's first sentence is \"Jack opened his eyes.\" What does that make you wonder?",
      frame: "It makes me wonder {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Jack and Annie must find \"something to learn.\" What do you think it turns out to be? Say why.",
      frame: "I think it turns out to be {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and a pioneer", "Annie and her teacher", "Two farmers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"takes Jack and Annie back to the Kansas prairie\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["A magic tree house", "A train", "A wagon", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 기차도 마차도 기계도 아니에요. 주제어 목록에도 Tree houses 와 Time travel 이 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Time travel\" are both listed subjects." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To the Kansas prairie", "To the moon", "To ancient Egypt", "To the sea"], c: 0,
      why_ko: "캔자스 대초원이에요. 요약과 소개글이 둘 다 \"the Kansas prairie\" 라고 적고 있어요.",
      why: "The Kansas prairie — both the summary and the description say so." },
    { q: "What must Jack and Annie find on the prairie?",
      a: ["Something to learn", "Something to eat", "A lost horse", "A hidden key"], c: 0,
      why_ko: "\"something to learn\", 곧 '배울 무엇'이에요. 요약이 그 말을 따옴표까지 넣어 그대로 적고 있어요.",
      why: "\"Something to learn\" — the summary puts those exact words in quotation marks." },
    { q: "Whose hard life do Jack and Annie come to understand?",
      a: ["The pioneers'", "The pirates'", "The knights'", "The teachers'"], c: 0,
      why_ko: "개척자들(pioneers)의 삶이에요. 소개글이 \"how hard life was for pioneers\" 라고 말해요.",
      why: "The pioneers'. The description says \"how hard life was for pioneers.\"" },
    { q: "What frightening thing do Jack and Annie experience?",
      a: ["A tornado", "A flood", "A fire", "A snowstorm"], c: 0,
      why_ko: "토네이도예요. 소개글이 \"they experience the terror of a tornado\" 라고 말합니다.",
      why: "A tornado — \"they experience the terror of a tornado.\"" },
    { q: "What does the word \"twister\" in the title mean?",
      a: ["A tornado", "A rope", "A puzzle", "A dance"], c: 0,
      why_ko: "twister 는 토네이도를 가리키는 또 다른 말이에요. 이 책의 주제어에도 Tornadoes 가 있어요.",
      why: "A twister is another word for a tornado. \"Tornadoes\" is a listed subject of this book." },
    { q: "Which day of the week is in the title of this book?",
      a: ["Monday", "Tuesday", "Friday", "Sunday"], c: 1,
      why_ko: "화요일이에요. 제목이 \"Twister on Tuesday\" 예요.",
      why: "Tuesday. The title is \"Twister on Tuesday.\"" },
    { q: "Kansas is a place in which country?",
      a: ["The USA", "England", "Australia", "Egypt"], c: 0,
      why_ko: "미국이에요. 오픈라이브러리의 지명 목록에 Kansas 와 USA 가 나란히 적혀 있어요.",
      why: "The USA. The library record lists the places as \"Kansas\" and \"USA.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack opened his eyes.\"", "\"Jack couldn't sleep.\"", "\"The wind began to blow.\"", "\"Annie ran outside.\""], c: 0,
      why_ko: "첫 문장은 \"Jack opened his eyes.\" 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line of this book." },
    { q: "What is a pioneer?",
      a: ["One of the first people to live in a new land", "A person who flies a plane", "A kind of wind", "A farm animal"], c: 0,
      why_ko: "개척자는 새 땅에 처음 들어가 사는 사람이에요. 이 책의 주제어에 \"Frontier and pioneer life\" 가 있어요.",
      why: "A pioneer is one of the first settlers in a new land. \"Frontier and pioneer life\" is a subject of this book." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#3", "#10", "#23", "#30"], c: 2,
      why_ko: "23권이에요. 장서 목록 제목이 \"#23. Twister on Tuesday\" 이고 요약 끝에도 Book #23 이라고 적혀 있어요.",
      why: "Book #23 — the catalog title is \"#23. Twister on Tuesday.\"" },
    { q: "What does the year 2001 tell us about this book?",
      a: ["The year the story happens", "The year the book was published", "The number of pages", "The year Jack was born"], c: 1,
      why_ko: "책이 나온 해예요. 이야기가 몇 년도 일인지는 우리가 가진 어느 글도 말해 주지 않아요.",
      why: "It is the publication year. None of our sources says what year the story takes place in." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where the tree house takes them", "What frightening weather they meet", "What the \"something to learn\" turns out to be", "Whose hard life they come to understand"], c: 2,
      why_ko: "'배울 무엇'이 결국 무엇인지예요. 우리가 가진 글은 '찾아야 한다'에서 멈춰요. 답은 책을 읽어야 알 수 있어요.",
      why: "What the \"something to learn\" turns out to be. Our sources stop at \"they must find\" it." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(연도·문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    // 이야기의 연도는 어느 출처도 말하지 않는다. 비워 둔다.
    setting: { place: "{{the Kansas prairie}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to find \"something to learn\"}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house takes Jack and Annie back in time.",
        frame: "They travel back to the {{Kansas}} {{prairie}}, where they must find \"{{something to learn}}\"." },
      { label: "The Pioneers",
        given: "",
        frame: "There they gain an understanding of how hard life was for {{pioneers}}." },
      { label: "The Twister",
        given: "",
        frame: "They also experience the terror of a {{tornado}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Twister on Tuesday",
    branches: [
      { label: "Jack & Annie",  ask: "The book's first line is \"Jack opened his eyes.\" What do you think he sees first?",
        deeper: "Why do you think a writer might begin a story at the moment someone opens their eyes?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think it chose the Kansas prairie for them, and not a city?" },
      { label: "The Prairie",   ask: "What do you picture when you hear the word prairie?",
        deeper: "How would living far away from other people change an ordinary day?" },
      { label: "The Pioneers",  ask: "Jack and Annie come to understand how hard life was for pioneers. What do you think was hard?",
        deeper: "Why is understanding someone's hard life different from just being told about it?" },
      { label: "The Twister",   ask: "The book calls the tornado a twister. What would be frightening about being near one?",
        deeper: "Why do people remember a frightening day for years, long after it ends?" },
      { label: "Me",            ask: "If the tree house sent you somewhere to find \"something to learn,\" where would you go?",
        deeper: "What would you want to learn there, and who would you tell about it afterwards?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Time", "Hardship", "Evidence"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅의 하루는 지금 우리와 어떻게 달랐나",
    statement: "To understand how hard another life was, you may have to stand where those people stood.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What must they find there?",
      "What do they come to understand, and what do they experience?"
    ],
    conceptual: [
      "What is the difference between hearing about a hard life and understanding it?",
      "Why can something frightening also teach you something?"
    ],
    debatable: [
      "Is a hard day a better teacher than an easy one?",
      "Should children be shown how difficult other people's lives are?"
    ],
    learnerProfile: ["Inquirer", "Thinker", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "배울 무엇을 찾아야 한다" 와 "개척자의 고단한 삶을 이해하게 된다" 까지만 말한다.
    // 그 '배울 무엇'이 무엇이었는지는 적혀 있지 않으므로, 그것을 묻지 않고 아이 자신의 판단을 물었다.
    prompt: "On the Kansas prairie, Jack and Annie learn how hard life was for pioneers. Is a hard day a good teacher? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "A Hard Day Teaches", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think a hard day can teach more than an easy one.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "On the prairie, Jack and Annie learn how hard life was for pioneers.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that living through a hard day taught them what a book could not.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a hard day only hurts, but Jack and Annie came away understanding more.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a hard day can be a good teacher.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie back to the Kansas prairie to find \"something to learn,\" where they come to understand how hard life was for pioneers and experience the terror of a tornado, then take a side on whether a hard day is a good teacher.",
      ko: "마법의 나무 집이 잭과 애니를 캔자스 대초원으로 데려가 '배울 무엇'을 찾게 하고, 두 아이가 개척자들의 고단한 삶을 이해하게 되며 토네이도의 공포를 겪는 흐름을 말하고, 고단한 하루가 좋은 스승인지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever been outside in a very strong wind? Tell me one thing you remember.",
        do: "책을 펴기 전에 한다. 바람 이야기를 아이 입에서 먼저 꺼내야 제목이 읽힌다. 서너 명만.",
        exp: "The wind pushed me. / My umbrella broke. / It was loud.",
        stuck: "선생님이 먼저 한 문장 한다. \"The wind was so loud I could not hear my friend.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Twister on Tuesday.\" What is a twister? And why Tuesday, do you think?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "A twister is a tornado. / Tuesday is just a day, maybe the day it happens.",
        stuck: "표지를 가리킨다. \"Look at the cover. What is that in the sky?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "대초원 → prairie / 개척자 → pioneer / 공포 → terror",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does the tree house take them...' becomes 'It takes them back to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them back to the Kansas prairie.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack opened his eyes.\" Five words, and nothing else. What does it make you want to ask?",
        do: "칠판에 그 한 문장만 쓴다. 짧은 첫 줄이 무엇을 여는지 보게 한다.",
        exp: "Where is he? / What does he see? / Was he asleep?",
        stuck: "\"If I say only 'You opened your eyes' — what is your first question?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to find something to learn — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they looking for?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Summary Map", min: "",
        say: "Look at Setting. The place is the Kansas prairie. The time box is empty — and I am leaving it empty.",
        do: "연도 칸을 비워 둔 까닭을 말한다. 우리 자료가 연도를 말하지 않는다는 것을 아이가 알아야 한다.",
        exp: "It does not say the year. / We have to read it.",
        stuck: "\"Our book list says 2001. Is that the year of the story, or the year of the book?\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Pioneers)", min: "",
        say: "Stop at The Pioneers. Don't just tell me life was hard — tell me WHAT was hard about it.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "No shops. No doctors. You grow your own food. The weather can ruin everything.",
        stuck: "\"Name one thing in your room today that a pioneer child did not have.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is a hard day a better teacher than an easy one? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie understood pioneer life only after living one hard day.",
        stuck: "손을 들게 한다. \"Hard day? Or easy day?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a hard day only hurts, but Jack and Annie came away understanding more.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about tornadoes?", ko: "토네이도에 대해 이미 아는 게 있니?" },
        { en: "How do you think people lived before there were shops and cars?", ko: "가게도 자동차도 없던 시절에 사람들은 어떻게 살았을 것 같니?" },
        { en: "If someone told you to go and find \"something to learn,\" where would you start?", ko: "누가 너에게 '배울 무언가를 찾아오라' 하면, 어디부터 찾아보겠니?" }
      ],
      during: [
        { en: "What do you think the \"something to learn\" will turn out to be?", ko: "'배울 무엇'이 결국 무엇으로 드러날 것 같니?" },
        { en: "What is the hardest part of pioneer life so far?", ko: "여기까지 읽은 중에 개척자의 삶에서 가장 힘들어 보이는 건 뭐니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was the \"something to learn\" in the end?", ko: "결국 '배울 무엇'은 무엇이었니?" },
        { en: "What did the tornado change for Jack and Annie?", ko: "토네이도는 잭과 애니에게 무엇을 바꾸어 놓았니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸과 연도 칸은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Pioneers' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 '배울 무엇'의 정체도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 캔자스 대초원으로 가 '배울 무엇'을 찾는 이야기",
    text: "Jack opened his eyes. The [[wonderful|magic]] tree house had taken him and Annie back to the Kansas [[grassland|prairie]]. There they had to find \"something to [[study|learn]].\" On that land they came to see how hard life was for the [[first settlers|pioneers]], and they felt the [[great fear|terror]] of a [[twister|tornado]]. What was the \"something to learn\"? Open the book and find out."
  }
};
