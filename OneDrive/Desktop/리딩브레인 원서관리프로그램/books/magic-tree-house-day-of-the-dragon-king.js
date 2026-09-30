// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Day of the Dragon King (Magic Tree House #14) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3259.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 배경 지명)만으로 만들었다. 그 밖의 인물 이름·
// 지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 2000년 전 고대 중국으로 데려간다 /
//   둘의 임무는 옛 전설의 원본(the original copy of an old legend)을 찾는 것이다 /
//   황실 도서관(the Imperial Library)이 사악한 드래곤 킹(the evil Dragon King)에게
//   불타 없어지기 전에 찾아야 한다 / 이 책은 시리즈 14권이다 /
//   책의 첫 문장은 "Annie peeked into Jack's room."
// 둘이 원본을 찾았는지, 그 전설이 무슨 이야기인지, 어떻게 집으로 돌아가는지는 근거가
// 말하지 않는다. 그래서 비워 두었다.
// 10권과 달리 이 책의 근거에는 모건(Morgan)도, 사람 이름 목록(people)도 없다. 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3259",
  slug: "magic-tree-house-day-of-the-dragon-king",
  title: "Day of the Dragon King",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #14",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "380L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/6978834-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·배경 지명을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3259 요약 + 오픈라이브러리 /works/OL2648893W (소개글 · 첫 문장 \"Annie peeked into Jack's room.\" · 주제어 Tree houses/Magic/Time travel/History/Ancient Civilizations/Chapter Books · 배경 지명 China · 80쪽 · 1998년)",
    characters: ["Jack", "Annie", "the evil Dragon King"],
    beats: [
      "the magic tree house takes Jack and Annie back two thousand years to ancient China",
      "they are on a mission to find the original copy of an old legend",
      "they must find it before the Imperial Library is burned down by the evil Dragon King"
    ],
    ending: "근거에 결말이 없다. 장서 요약도 소개글도 \"황실 도서관이 불타기 전에 옛 전설의 원본을 찾아야 한다\"에서 끊긴다. 두 아이가 그 원본을 제때 찾았는지, 그 전설이 무슨 이야기인지, 도서관이 정말 불탔는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"back 2000 years to ancient China\", \"the magic tree house\", \"the original copy of an old legend\", \"before the Imperial Library gets burned down by the evil king\", \"Book #14\")과 소개글(\"back two thousand years to ancient China\", \"the original copy of an old legend\", \"before the Imperial Library is burned down by the evil Dragon King\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 요약은 \"the evil king\" 까지만 말하고 소개글이 \"the evil Dragon King\" 이라고 한 걸음 더 적는데, 제목 Day of the Dragon King 과 맞아떨어져 남겼다. 주제어 Tree houses/Time travel/History/Ancient Civilizations 와 배경 지명 China 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 오픈라이브러리 people 칸은 비어 있어 잭·애니·드래곤 킹 말고는 어떤 이름도 쓰지 않았다. 10권과 달리 이 책 근거는 모건(Morgan)을 말하지 않아 수수께끼·모건은 학습지 어디에도 넣지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Day of the Dragon King\" read aloud",
    searchUrl: "https://youtu.be/RlOKyUsHCps",
    videos: [
      { url: "https://youtu.be/RlOKyUsHCps", title: "Magic Tree House | #14 Day of the Dragon King | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "14,016", length: "40:42" },
      { url: "https://youtu.be/NycScKzSxqw", title: "Day of the Dragon King — Magic Tree House Audiobook #14",
        channel: "Triple A English", views: "1,801", length: "38:39" },
      { url: "https://youtu.be/HmOJyqa_nsI", title: "Magic Treehouse: Day of the Dragon King Chapters 1-2 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "654", length: "7:52" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // dragon 과 king 도 제목에 있지만 이 단계 아이들이 이미 아는 말이라 빼고 열 개를 채웠다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "peek",      pos: "v.",   en: "to look at something quickly or secretly, often through a small opening", ko: "살짝 들여다보다",
      ex: "The book begins, \"Annie {{peeked}} into Jack's room.\"", ex_ko: "책은 \"애니가 잭의 방을 살짝 들여다보았다\"로 시작해요.", pic: "👀" },
    { word: "ancient",   pos: "adj.", en: "belonging to a time very long ago in history", ko: "고대의, 아주 오래된",
      ex: "Jack and Annie go to {{ancient}} China.", ex_ko: "잭과 애니는 고대 중국으로 가요.", pic: "🏯" },
    { word: "legend",    pos: "n.",   en: "an old story from long ago that people have told again and again", ko: "전설",
      ex: "They look for an old {{legend}}.", ex_ko: "그들은 옛 전설을 찾습니다.", pic: "📜" },
    { word: "original",  pos: "adj.", en: "the very first one, the one that everything else was copied from", ko: "원래의, 원본의",
      ex: "They must find the {{original}} copy.", ex_ko: "그들은 원본을 찾아야 해요.", pic: "🖋️" },
    { word: "copy",      pos: "n.",   en: "something made to be the same as another thing", ko: "사본, 한 부",
      ex: "Jack and Annie need the original {{copy}} of the legend.", ex_ko: "잭과 애니에게는 전설의 원본이 필요해요.", pic: "📄" },
    { word: "library",   pos: "n.",   en: "a place where many books are kept", ko: "도서관",
      ex: "The Imperial {{Library}} is in danger.", ex_ko: "황실 도서관이 위험에 빠져요.", pic: "📚" },
    { word: "imperial",  pos: "adj.", en: "belonging to an emperor or an empire", ko: "황제의, 황실의",
      ex: "The story is about the {{Imperial}} Library.", ex_ko: "이야기는 황실 도서관에 관한 것이에요.", pic: "👑" },
    { word: "burn",      pos: "v.",   en: "to be destroyed by fire", ko: "불타다, 태우다",
      ex: "The library may {{burn}} down.", ex_ko: "도서관이 불타 없어질지도 몰라요.", pic: "🔥" },
    { word: "evil",      pos: "adj.", en: "very bad, wanting to hurt other people", ko: "사악한, 나쁜",
      ex: "The {{evil}} Dragon King wants to burn the library.", ex_ko: "사악한 드래곤 킹이 도서관을 태우려 해요.", pic: "😈" },
    { word: "mission",   pos: "n.",   en: "an important job that someone is sent to do", ko: "임무",
      ex: "Jack and Annie are on a {{mission}}.", ex_ko: "잭과 애니는 임무를 맡고 있어요.", pic: "🎯" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // peeked 만은 책의 첫 문장("Annie peeked into Jack's room.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"Annie [[peeked]] into Jack's room.\"",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. peek → peeked, want → wanted.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{opened}} the door and {{looked}} inside." },
      { name: "must + 동사원형", ko: "의무 조동사",
        sent: "Jack and Annie [[must find]] the original copy of an old legend.",
        why_ko: "'꼭 ~해야 한다'는 must 예요. must 뒤에는 to 없이 동사원형만! must find (O), must to find (X).",
        why: "Use must + the base verb for something you have to do. No \"to\" after must.",
        try: "You {{must read}} the book, and you {{must write}} your name." },
      { name: "before + 주어 + 동사", ko: "시간 접속사",
        sent: "They must find it [[before]] the Imperial Library is burned down.",
        why_ko: "before 뒤에는 '주어 + 동사'가 통째로 와요. '~하기 전에'라는 뜻으로 두 가지 일의 순서를 알려 줘요.",
        why: "\"Before\" can join two sentences and tells you which thing happens first.",
        try: "I wash my hands {{before}} I eat dinner." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Annie (peek / peeked) into Jack's room.", a: "peeked",
          why_ko: "책의 첫 문장이에요. 이미 일어난 일이니 과거형 peeked 예요." },
        { q: "Jack and Annie must (find / to find) the original copy.", a: "find",
          why_ko: "must 뒤에는 to 없이 동사원형만 와요. must find!" },
        { q: "They go back two thousand years to (ancient / ancienter) China.", a: "ancient",
          why_ko: "ancient 는 '아주 오래된'이라는 뜻의 형용사예요. 소개글 그대로 ancient China 예요." },
        { q: "They must hurry (before / after) the library is burned down.", a: "before",
          why_ko: "도서관이 불타기 '전에' 찾아야 하니 before 예요." },
        { q: "The magic tree house (take / takes) Jack and Annie back in time.", a: "takes",
          why_ko: "주어 The magic tree house 는 하나(3인칭 단수)예요. 현재형 동사에 -s 를 붙여요." }
      ],
      fix: [
        { q: "Annie [[peek]] into Jack's room.", a: "peeked",
          why_ko: "책의 첫 문장은 과거형이에요. peek 에 -ed 를 붙여 peeked!" },
        { q: "They must [[to find]] the original copy of an old legend.", a: "find",
          why_ko: "must 뒤에는 to 가 붙지 않아요. 동사원형 find 만 씁니다." },
        { q: "The magic tree house [[take]] them back two thousand years.", a: "takes",
          why_ko: "주어가 3인칭 단수라서 현재형에 -s 가 붙어요. takes!" }
      ],
      write: [
        { ko: "애니가 잭의 방을 살짝 들여다보았다.", cond: "peek, 과거형", a: "Annie peeked into Jack's room.",
          why_ko: "peek 의 과거형은 peeked 예요. '~ 안을 들여다보다'는 peek into 로 씁니다." },
        { ko: "그들은 옛 전설의 원본을 찾아야 한다.", cond: "must, find", a: "They must find the original copy of an old legend.",
          why_ko: "'찾아야 한다'는 must find 예요. must 뒤에는 동사원형만 옵니다." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "책 소개글", skill: "사실찾기", q: "How far back do Jack and Annie go, and where do they land?",
      frame: "They go back {{two thousand years}}, to {{ancient China}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What is Jack and Annie's mission in this book?",
      frame: "Their mission is to find {{the original copy of an old legend}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What must happen before the Imperial Library is burned down, and who wants to burn it?",
      frame: "They must find {{the original copy}} first. {{The evil Dragon King}} wants to burn the library." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Day of the Dragon King.\" What does the word \"day\" make you expect about this story?",
      frame: "I expect {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book opens, \"Annie peeked into Jack's room.\" Why might someone peek instead of walking straight in?",
      frame: "I think she peeked because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "A library full of old books is about to burn. If you could carry out only one thing, what would it be? Say why.",
      frame: "I would carry out {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and the Dragon King", "Annie and an emperor", "Two librarians"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie are taken back 2000 years\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["A magic tree house", "A dragon", "A boat", "A magic book"], c: 0,
      why_ko: "마법의 나무 집이에요. 주제어 목록에도 Tree houses 와 Time travel 이 나란히 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Time travel\" are both listed subjects." },
    { q: "How far back in time do Jack and Annie go?",
      a: ["Two hundred years", "Two thousand years", "Twenty years", "Two million years"], c: 1,
      why_ko: "2000년이에요. 요약은 \"back 2000 years\", 소개글은 \"back two thousand years\" 라고 똑같이 말해요.",
      why: "Two thousand years — both the summary and the description say so." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To ancient Egypt", "To ancient China", "To medieval England", "To old Japan"], c: 1,
      why_ko: "고대 중국이에요. 오픈라이브러리 배경 지명도 China 하나예요. 고대 이집트는 3권 Mummies in the Morning, 중세 영국은 2권 The Knight at Dawn, 옛 일본은 5권 Night of the Ninjas 예요.",
      why: "Ancient China. The recorded place for this book is China." },
    { q: "What are Jack and Annie trying to find?",
      a: ["The original copy of an old legend", "A dragon's egg", "A lost crown", "A treasure map"], c: 0,
      why_ko: "옛 전설의 원본이에요. 요약과 소개글이 똑같이 \"the original copy of an old legend\" 이라고 적어요.",
      why: "The original copy of an old legend — the exact words of both sources." },
    { q: "Which building is about to be burned down?",
      a: ["The palace", "The tree house", "The Imperial Library", "The city gate"], c: 2,
      why_ko: "황실 도서관(the Imperial Library)이에요. 다른 셋은 근거 어디에도 나오지 않아요.",
      why: "The Imperial Library. The other three appear nowhere in our sources." },
    { q: "Who wants to burn the Imperial Library down?",
      a: ["The evil Dragon King", "Jack", "Annie", "A dragon"], c: 0,
      why_ko: "사악한 드래곤 킹이에요. 소개글이 \"burned down by the evil Dragon King\" 이라고 말해요. 진짜 용이 태운다는 말은 어디에도 없어요.",
      why: "The evil Dragon King — \"burned down by the evil Dragon King.\"" },
    { q: "Which word does the description use for the Dragon King?",
      a: ["Evil", "Kind", "Sleepy", "Young"], c: 0,
      why_ko: "소개글이 고른 낱말이 바로 evil 이에요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The description's own word is \"evil.\" The other three appear nowhere in our sources." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#4", "#10", "#14", "#40"], c: 2,
      why_ko: "14권이에요. 장서 목록 제목이 \"#14. Day of the Dragon King\" 이고 요약 끝에도 Book #14 라고 적혀 있어요.",
      why: "Book #14 — the catalog title is \"#14. Day of the Dragon King.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Annie peeked into Jack's room.\"", "\"Jack couldn't sleep.\"", "\"The library was on fire.\"", "\"Jack and Annie ran to the woods.\""], c: 0,
      why_ko: "첫 문장은 \"Annie peeked into Jack's room.\" 이에요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line of this book." },
    { q: "What does \"ancient\" mean?",
      a: ["From a time very long ago", "Brand new", "Very far away", "Very large"], c: 0,
      why_ko: "ancient 는 '아주 오래전의'라는 뜻이에요. 그래서 ancient China 는 2000년 전의 중국을 말해요.",
      why: "Ancient means from a time very long ago — hence \"ancient China,\" two thousand years back." },
    { q: "What is a \"legend\"?",
      a: ["An old story told again and again", "A kind of map", "A school subject", "A king's crown"], c: 0,
      why_ko: "legend 는 옛날부터 전해 내려오는 이야기, 곧 전설이에요. 두 아이가 찾는 것은 그 전설의 원본이에요.",
      why: "A legend is an old story handed down. The children search for its original copy." },
    { q: "What does \"the original copy\" mean here?",
      a: ["The very first one", "The newest one", "The shortest one", "The prettiest one"], c: 0,
      why_ko: "original 은 '맨 처음의'라는 뜻이에요. 나중에 베낀 것이 아니라 가장 처음 쓰인 것을 찾아야 해요.",
      why: "Original means the very first one — not a later copy." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "What they are looking for", "Whether they find it in time", "Who wants to burn the library"], c: 2,
      why_ko: "둘이 제때 찾았는지예요. 우리가 가진 글은 '도서관이 불타기 전에 찾아야 한다'에서 멈춰요. 찾았는지는 책을 읽어야 알 수 있어요.",
      why: "Whether they find it in time. Our sources stop at \"before the Imperial Library is burned down.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(막는 것·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{ancient China}}", time: "{{two thousand years ago}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to find the original copy of an old legend}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house takes Jack and Annie back in time.",
        frame: "They go back {{two thousand years}}, to {{ancient China}}." },
      { label: "The Mission",
        given: "",
        frame: "Their mission is to find {{the original copy}} of an old {{legend}}." },
      { label: "The Library",
        given: "",
        frame: "They must find it before {{the Imperial Library}} is burned down by {{the evil Dragon King}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Day of the Dragon King",
    branches: [
      { label: "Jack & Annie",   ask: "The book opens with Annie peeking into Jack's room. What do you think she came to tell him?",
        deeper: "Why do you think so many adventures begin with one person coming to find the other?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose ancient China, two thousand years back?" },
      { label: "Ancient China",  ask: "What do you already know about China two thousand years ago?",
        deeper: "What would be the hardest part of living in a time with no cars, no phones and no printing?" },
      { label: "The Legend",     ask: "Jack and Annie look for the original copy of an old legend. What makes a story worth keeping?",
        deeper: "If only one copy exists, what happens to the story when that copy is gone?" },
      { label: "The Library",    ask: "A library is about to be burned down. Why would someone want to burn books?",
        deeper: "Is burning a book the same as burning a building? Say why or why not." },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for ancient China? Why or why not?",
        deeper: "What would you want to bring back with you, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["History", "Courage", "Evidence"],
    globalContext: "Orientation in space and time — 2000년 전의 세상은 지금 우리와 어떻게 다른가",
    statement: "A story can outlive the people who told it, but only if someone keeps the copy safe.",
    factual: [
      "Where and when does the magic tree house take Jack and Annie?",
      "What are they on a mission to find?",
      "Who wants the Imperial Library burned down?"
    ],
    conceptual: [
      "Why would anyone want to destroy a library full of old books?",
      "What is lost when the last copy of a story disappears?"
    ],
    debatable: [
      "Is saving an old story as important as saving a building?",
      "Should children be allowed to take a risk to protect something important?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "도서관이 불타기 전에 원본을 찾아야 한다" 까지만 말한다. 두 아이가 찾았는지는
    // 적혀 있지 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie must find the original copy of an old legend before the Imperial Library burns. Is an old story worth saving? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "The Last Copy", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think an old story is worth saving.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "Jack and Annie must find the original copy of a legend before the library burns.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the story matters enough to travel two thousand years for.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say old stories are just words, but words can teach us.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe we should keep old stories safe.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie back two thousand years to ancient China, where they are on a mission to find the original copy of an old legend before the Imperial Library is burned down by the evil Dragon King, then take a side on whether an old story is worth saving.",
      ko: "마법의 나무 집이 잭과 애니를 2000년 전 고대 중국으로 데려가고, 두 아이가 황실 도서관이 사악한 드래곤 킹에게 불타기 전에 옛 전설의 원본을 찾아야 하는 흐름을 말하고, 옛 이야기를 지킬 만한 가치가 있는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Two thousand years ago there were no printers. If you wanted a book, what did you have to do?",
        do: "책을 펴기 전에 한다. '원본 하나뿐'이라는 감각이 서야 이 책의 임무가 이해된다. 서너 명만.",
        exp: "Write it by hand. / Copy every word yourself.",
        stuck: "선생님이 먼저 한 문장 한다. \"You had to write every word by hand.\"" },

      { stage: "Warm-up", min: "",
        say: "Now imagine there is only ONE copy in the whole world, and a fire is coming. What happens to that story?",
        do: "제목을 말하기 전에 여기까지 간다. 아이가 '사라진다'고 말하면 바로 책으로 넘어간다.",
        exp: "It is gone forever. / Nobody can ever read it again.",
        stuck: "\"Can you rewrite a story you have never read?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "전설 → legend / 도서관 → library / 임무 → mission",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'How far back...' becomes 'They go back...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They go back two thousand years, to ancient China.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Annie peeked into Jack's room.\" No magic yet, no China. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day at home. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to find the original copy of an old legend — But·So·Then 은 아이가 책에서 가져온다",
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

      { stage: "Mind Map (The Library)", min: "",
        say: "Stop at The Library. Don't just tell me a king wants to burn it — tell me WHY anyone burns books.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "He does not want people to read it. / He wants his own story to be the only one.",
        stuck: "\"If you wanted everyone to forget something, what would you do with the last copy?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is an old story as important as a building? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because a building can be built again but a lost story cannot.",
        stuck: "손을 들게 한다. \"Save the library, or save one old scroll?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say old stories are just words, but words can teach us.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about China long, long ago?", ko: "아주 오래전 중국에 대해 이미 아는 게 있니?" },
        { en: "Why would a library be an important place two thousand years ago?", ko: "2000년 전에 도서관은 왜 중요한 곳이었을까?" },
        { en: "The title says \"Dragon King.\" What kind of king do you imagine?", ko: "제목이 '드래곤 킹'이야. 어떤 왕일 것 같니?" }
      ],
      during: [
        { en: "The legend has only one original copy. Why does that make it so hard to save?", ko: "전설의 원본은 하나뿐이래. 그래서 지키기가 왜 그렇게 어려울까?" },
        { en: "How do you think two children can get inside an Imperial Library?", ko: "아이 둘이 황실 도서관에 어떻게 들어갈 수 있을까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was the old legend about, and did Jack and Annie find it in time?", ko: "그 옛 전설은 무슨 이야기였고, 잭과 애니는 제때 찾았니?" },
        { en: "Was the Dragon King only evil, or was there more to him?", ko: "끝까지 읽고 나니 드래곤 킹은 그저 나쁘기만 했니, 아니면 다른 무엇이 있었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Library' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
    scene: "잭과 애니가 마법 나무집을 타고 2000년 전 고대 중국으로 가 옛 전설의 원본을 찾는 이야기",
    text: "Annie [[looked quickly|peeked]] into Jack's room. Then the magic tree house took Jack and Annie back two thousand years, to [[very old|ancient]] China. They were on a [[job|mission]] to find the [[very first|original]] copy of an old [[story|legend]]. They had to find it before the [[emperor's|Imperial]] Library was [[destroyed by fire|burned down]] by the [[wicked|evil]] Dragon King. Did they find it in time? Open the book and find out."
  }
};
