// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.5)
// Revolutionary War on Wednesday (Magic Tree House #22) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/M3142.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 주제어 목록 · 사람/장소 목록)만으로 만들었다. 그 밖의 인물 이름·지명·
// 물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법 나무집의 힘(by the power of the magic tree house)이 둘을
//   미국 독립혁명의 시대(the time of the American Revolution)로 돌려보낸다 /
//   둘은 조지 워싱턴 장군(General George Washington)을 마주친다 /
//   둘은 델라웨어강을 건너는 그의 이름난 도하(his famous crossing of the Delaware River)를 돕는다 /
//   주제어에 Brothers and sisters 가 있어 두 아이가 남매임을 알 수 있다 / 장소는 United States.
// 이 책의 근거에는 **첫 문장이 없다**(openLibrary first 가 빈 칸이다). 그래서 10권과 달리
// 첫 문장을 쓰는 자리를 아예 만들지 않았다.
// 연도(1776 같은 것) · 전투 이름 · 날씨 · 배 · 병사 수 · 결말은 어느 출처도 말하지 않는다.
// 선생님이 아시는 역사라도 근거 밖의 것은 학습지에 넣지 않았다.
// 전쟁을 다루는 책이지만 이 수업지는 싸움을 그리지 않는다. 강을 건너는 일과 곁에서 돕는
// 일, 그리고 무서운 순간의 용기만 다룬다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3142",
  slug: "magic-tree-house-revolutionary-war-on-wednesday",
  title: "Revolutionary War on Wednesday",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #22",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.5", lexile: "450L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424180-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·주제어 목록·사람 목록·장소 목록을 겹쳐 보았다. 사람의 기억으로 아는 미국사는 근거로 쓰지 않았다",
    source: "학원 장서 목록 M3142 요약 + 오픈라이브러리 /works/OL81801W (소개글 · 주제어 Tree houses/Revolutionary War/Magic/History/Time travel/Brothers and sisters/Voyages and travels/Space and time/Fantasy/Happiness · 사람 George Washington (1732-1799) · 장소 United States · 69쪽 · 2000년). 이 책의 첫 문장(first)은 오픈라이브러리에 비어 있다",
    characters: ["Jack", "Annie", "General George Washington"],
    beats: [
      "by the power of the magic tree house, Jack and Annie are sent back to the time of the American Revolution",
      "they happened to meet General George Washington",
      "they help him during his famous crossing of the Delaware River"
    ],
    ending: "근거에 결말이 없다. 장서 요약도 소개글도 \"help him during his famous crossing of the Delaware River\" 에서 그대로 멈춘다. 도하가 어떻게 되었는지, 두 아이가 무엇을 해서 도왔는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"By the power of the magic tree house\", \"sent back to the time of the American Revolution\", \"happened to meet General George Washington\", \"his famous crossing of the Delaware River\", \"Book #22\")과 소개글(\"Using their magic tree house\", \"travel back to the time of the American Revolution\", \"help General George Washington during his famous crossing of the Delaware River\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 주제어 Revolutionary War/History/Time travel/Tree houses 가 같은 것을 가리켜 한 번 더 받쳐 주었고, 주제어 Brothers and sisters 와 사람 목록 George Washington (1732-1799) 도 요약과 부딪히지 않아 남겼다. 반면 연도·전투 이름·계절·날씨·배·병사에 대해서는 어느 출처도 한 글자도 말하지 않아 학습지 어디에도 쓰지 않았다. 10권과 달리 이 책은 첫 문장이 비어 있어, 첫 문장을 묻는 문항과 칸을 통째로 뺐다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // vid-M3142.json 의 세 번째 항목은 #21 Civil War on Sunday 낭독이라 이 책의 것이 아니다.
  // 그 자리는 M3142.json 의 videos 에 있던 이 책 낭독(72cyChb2b9w)으로 바꿔 넣었다.
  // 그 영상은 채널·조회수·길이를 우리가 확인하지 못해 비워 두었다 — 지어내지 않는다.
  shadowing: {
    query: "\"Revolutionary War on Wednesday\" read aloud",
    searchUrl: "https://youtu.be/Kl-3Fdb73b8",
    videos: [
      { url: "https://youtu.be/Kl-3Fdb73b8", title: "Magic Tree House| #22 Revolutionary War on Wednesday| MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "9,556", length: "34:57" },
      { url: "https://youtu.be/iQpyWRBIabQ", title: "Magic Tree House: #22 Revolutionary War on Wednesday - Chapter 6-10 | Read by Quynh Giang",
        channel: "Quynh Giang English", views: "8,180", length: "12:05" },
      { url: "https://youtu.be/72cyChb2b9w", title: "Revolutionary War on Wednesday",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "revolution", pos: "n.",  en: "a time when the people of a country work to change who rules them", ko: "혁명",
      ex: "Jack and Annie go back to the time of the American {{Revolution}}.", ex_ko: "잭과 애니는 미국 독립혁명의 시대로 갑니다.", pic: "🇺🇸" },
    { word: "war",        pos: "n.",  en: "a long fight between countries or groups of people", ko: "전쟁",
      ex: "The title of this book is \"Revolutionary {{War}} on Wednesday.\"", ex_ko: "이 책의 제목은 '수요일의 독립전쟁'이에요.", pic: "🕊️" },
    { word: "general",    pos: "n.",  en: "an officer of the highest rank, who leads an army", ko: "장군",
      ex: "They meet {{General}} George Washington.", ex_ko: "그들은 조지 워싱턴 장군을 만나요.", pic: "🎖️" },
    { word: "famous",     pos: "adj.", en: "known about by very many people", ko: "유명한, 이름난",
      ex: "They help him during his {{famous}} crossing of the river.", ex_ko: "그들은 그 이름난 강 건너기를 돕습니다.", pic: "⭐" },
    { word: "crossing",   pos: "n.",  en: "the act of going from one side of something to the other side", ko: "건너감, 도하",
      ex: "The {{crossing}} of the Delaware River is in this story.", ex_ko: "델라웨어강을 건너는 일이 이 이야기에 나와요.", pic: "🛶" },
    { word: "river",      pos: "n.",  en: "a wide line of water that flows across the land", ko: "강",
      ex: "The Delaware is a {{river}}.", ex_ko: "델라웨어는 강이에요.", pic: "🌊" },
    { word: "magic",      pos: "n.",  en: "a power that makes impossible things happen in stories", ko: "마법",
      ex: "Jack and Annie use their {{magic}} tree house.", ex_ko: "잭과 애니는 마법 나무집을 씁니다.", pic: "✨" },
    { word: "power",      pos: "n.",  en: "the strength or ability to make something happen", ko: "힘, 능력",
      ex: "By the {{power}} of the tree house, they are sent back in time.", ex_ko: "나무집의 힘으로 그들은 과거로 보내집니다.", pic: "💪" },
    { word: "travel",     pos: "v.",  en: "to go from one place to another place", ko: "여행하다, 이동하다",
      ex: "They {{travel}} back to the time of the American Revolution.", ex_ko: "그들은 미국 독립혁명의 시대로 거슬러 갑니다.", pic: "🧭" },
    { word: "history",    pos: "n.",  en: "everything that happened in the past, and the study of it", ko: "역사",
      ex: "This book is about a moment in American {{history}}.", ex_ko: "이 책은 미국 역사의 한 장면을 다뤄요.", pic: "📜" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책의 근거에는 첫 문장이 없어, 10권과 달리 책 문장을 그대로 쓴 자리는 한 곳도 없다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "George Washington was [[a]] general in [[an]] American war.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. a general, an American war.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} river and {{an}} old boat." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] back in time and [[helped]] General Washington.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, help → helped.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "be + p.p. (수동태)", ko: "수동태",
        sent: "Jack and Annie [[are sent]] back to the time of the American Revolution.",
        why_ko: "'~을 한다'가 아니라 '~ 당한다·보내진다'일 때는 be동사 + 과거분사예요. send → sent, so are sent = 보내진다.",
        why: "Use be + past participle when something is done TO the subject: are sent = someone sends them.",
        try: "The letter {{is written}} by Annie, and the book {{is read}} by Jack." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "George Washington was (a / an) general.", a: "a",
          why_ko: "general 은 '제'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie went back to (a / an) American war.", a: "an",
          why_ko: "American 은 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "Jack and Annie (travel / traveled) back in time.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "They (help / helped) General Washington cross the river.", a: "helped",
          why_ko: "지난 일이에요. help 에 -ed 를 붙여 helped!" },
        { q: "Jack and Annie (send / are sent) back by the magic tree house.", a: "are sent",
          why_ko: "두 아이가 보내는 게 아니라 보내지는 거예요. be동사 + sent 로 씁니다." }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] back to the time of the American Revolution.", a: "traveled",
          why_ko: "한참 지난 시대로 간 일이에요. 과거형 traveled 로 고쳐요." },
        { q: "The magic tree house [[send]] them back in time.", a: "sent",
          why_ko: "send 는 불규칙 동사예요. 과거형은 sended 가 아니라 sent!" },
        { q: "They [[is]] sent back by the power of the magic tree house.", a: "are",
          why_ko: "주어가 Jack and Annie, 둘이에요. 복수 주어에는 is 가 아니라 are." }
      ],
      write: [
        { ko: "그들은 조지 워싱턴 장군을 만났다.", cond: "meet, 과거형", a: "They met General George Washington.",
          why_ko: "meet 은 불규칙 동사예요. 과거형은 meeted 가 아니라 met." },
        { ko: "잭과 애니는 마법 나무집에 의해 과거로 보내진다.", cond: "are sent, by", a: "Jack and Annie are sent back by the magic tree house.",
          why_ko: "보내지는 쪽이니 are + sent 예요. 누가 했는지는 by 뒤에 붙여요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what sends them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} sends them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "What time in history are Jack and Annie sent back to?",
      frame: "They are sent back to the time of {{the American Revolution}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Who do Jack and Annie meet, and what do they help him do?",
      frame: "They meet {{General George Washington}}, and they help him during his famous crossing of {{the Delaware River}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Revolutionary War on Wednesday.\" Which word tells you WHEN, and which word tells you WHAT?",
      frame: "{{Wednesday}} tells when, and {{war}} tells what." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "책 소개글", skill: "추론·예측", q: "The summary calls it his \"famous\" crossing. What does that word make you expect about this moment?",
      frame: "I think it means {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If you could stand beside someone from history for one day and help, who would it be? Say why.",
      frame: "I would help {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a general", "Two soldiers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie are sent back\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What sends Jack and Annie back in time?",
      a: ["The power of the magic tree house", "A ship", "A horse", "A time machine"], c: 0,
      why_ko: "마법 나무집의 힘이에요. 요약이 \"By the power of the magic tree house\" 로 시작해요.",
      why: "The summary opens with \"By the power of the magic tree house.\"" },
    { q: "What time in history are they sent back to?",
      a: ["The time of the American Revolution", "The Middle Ages", "Ancient Egypt", "The Ice Age"], c: 0,
      why_ko: "미국 독립혁명의 시대예요. 요약과 소개글이 둘 다 \"the time of the American Revolution\" 이라고 적어요.",
      why: "The time of the American Revolution — both sources use that exact phrase." },
    { q: "Who do Jack and Annie happen to meet?",
      a: ["General George Washington", "Morgan le Fay", "A rustler", "A knight"], c: 0,
      why_ko: "조지 워싱턴 장군이에요. 요약이 \"happened to meet General George Washington\" 이라고 말해요.",
      why: "General George Washington. The summary says they \"happened to meet\" him." },
    { q: "What do Jack and Annie help George Washington with?",
      a: ["His famous crossing of the Delaware River", "Building a tree house", "Writing a letter", "Finding a horse"], c: 0,
      why_ko: "델라웨어강을 건너는 이름난 도하를 돕습니다. 소개글에 그대로 적혀 있어요.",
      why: "They help him \"during his famous crossing of the Delaware River.\"" },
    { q: "Which river is named in this book's summary?",
      a: ["The Delaware", "The Nile", "The Amazon", "The Thames"], c: 0,
      why_ko: "델라웨어강이에요. 나머지 셋은 우리 근거 어디에도 나오지 않아요.",
      why: "The Delaware. The other three appear nowhere in our sources." },
    { q: "What title does the summary give George Washington?",
      a: ["General", "King", "Captain", "Doctor"], c: 0,
      why_ko: "장군(General)이에요. 요약이 \"General George Washington\" 이라고 씁니다.",
      why: "General — the summary writes \"General George Washington.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#22", "#40"], c: 2,
      why_ko: "22권이에요. 장서 목록 제목이 \"#22. Revolutionary War on Wednesday\" 이고 요약 끝에도 Book #22 라고 적혀 있어요.",
      why: "Book #22 — the catalog title is \"#22. Revolutionary War on Wednesday.\"" },
    { q: "Which day of the week is in the title of this book?",
      a: ["Sunday", "Wednesday", "Friday", "Saturday"], c: 1,
      why_ko: "수요일(Wednesday)이에요. 제목이 \"Revolutionary War on Wednesday\" 예요.",
      why: "Wednesday — it is right there in the title." },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Tedd Arnold", "Sal Murdocca", "George Washington"], c: 0,
      why_ko: "메리 폽 어즈번이에요. Sal Murdocca 는 그림을 그린 사람으로 오픈라이브러리에 함께 적혀 있어요.",
      why: "Mary Pope Osborne. Sal Murdocca is listed beside her as the illustrator." },
    { q: "Which of these is listed as a subject of this book?",
      a: ["Time travel", "Cooking", "Sports", "Dinosaurs"], c: 0,
      why_ko: "Time travel 이에요. 주제어 목록에 Tree houses · Revolutionary War · Magic · History · Time travel 이 있어요.",
      why: "Time travel. It is in the recorded subject list, along with Tree houses and History." },
    { q: "The subject list includes \"Brothers and sisters.\" What does that tell us about Jack and Annie?",
      a: ["They are brother and sister", "They are cousins", "They are classmates", "They are neighbours"], c: 0,
      why_ko: "남매라는 뜻이에요. 주제어 Brothers and sisters 가 두 아이의 사이를 말해 줍니다.",
      why: "They are brother and sister — that is what the subject \"Brothers and sisters\" records." },
    { q: "Which word does the summary use for Washington's crossing?",
      a: ["Famous", "Secret", "Short", "Easy"], c: 0,
      why_ko: "요약이 고른 낱말이 바로 famous 예요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The summary's own word is \"famous.\" The other three appear nowhere in our sources." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who Jack and Annie meet", "Which river is crossed", "How the story ends", "What sends them back in time"], c: 2,
      why_ko: "결말이에요. 우리가 가진 글은 '도하를 돕는다' 에서 멈춰요. 그 뒤에 무슨 일이 있었는지는 책을 읽어야 알 수 있어요.",
      why: "How the story ends. Our sources stop at \"help him during his famous crossing of the Delaware River.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{the Delaware River, in the United States}}", time: "{{the time of the American Revolution}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to help General George Washington}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "By the power of the magic tree house, Jack and Annie are sent back in time.",
        frame: "They travel back to the time of {{the American Revolution}}." },
      { label: "The Meeting",
        given: "",
        frame: "There they happen to meet {{General George Washington}}." },
      { label: "The Crossing",
        given: "",
        frame: "They help him during his famous crossing of {{the Delaware River}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Revolutionary War on Wednesday",
    branches: [
      { label: "Jack & Annie",  ask: "The subject list calls them brother and sister. What can a brother and sister do together that one child alone could not?",
        deeper: "Why do you think this series sends two children, and not just one?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "The summary says they are SENT back, not that they go. What is the difference?" },
      { label: "The Time",       ask: "They land in the time of the American Revolution. What do you already know about that time?",
        deeper: "What would be hardest about arriving in a time you have only read about?" },
      { label: "The General",    ask: "They happen to meet General George Washington. What does a general have to do for the people who follow him?",
        deeper: "Our summary says they MEET him by chance but HELP him on purpose. Which is harder, and why?" },
      { label: "The Crossing",   ask: "Crossing a wide river is slow and cold work. What would a group need to get everyone across safely?",
        deeper: "Why might getting to the other side matter more than anything else that day?" },
      { label: "Me",             ask: "If the tree house came for you, which moment in history would you ask for?",
        deeper: "Would you want to change that moment, or only to watch it? Say why." }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Courage", "Cooperation", "Evidence"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅은 지금 우리와 어떻게 다른가",
    statement: "A hard crossing is made possible by the people who help each other across it.",
    factual: [
      "What sends Jack and Annie back in time, and to what time in history?",
      "Who do they happen to meet there?",
      "What do they help him do?"
    ],
    conceptual: [
      "Why is a river hard to cross for a large group of people?",
      "What is the difference between watching history and helping in it?"
    ],
    debatable: [
      "Is the person who leads more important than the people who help?",
      "If you could visit the past, should you change anything you find there?"
    ],
    learnerProfile: ["Inquirer", "Caring", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "도하를 돕는다" 까지만 말한다. 도하가 어떻게 되었는지는 적혀 있지 않으므로,
    // 결과를 묻지 않고 '돕는다는 것'에 대한 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie help General George Washington cross the Delaware River. Is the helper as important as the leader? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "The Ones Who Help", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think the helpers matter just as much as the leader.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie help General Washington cross the Delaware River.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the crossing needed more than one person to happen.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say only the leader is remembered, but the work was shared.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe helpers deserve to be remembered too.", lines: 2 }
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
      en: "Students retell how the power of the magic tree house sends Jack and Annie back to the time of the American Revolution, where they happen to meet General George Washington and help him during his famous crossing of the Delaware River, then take a side on whether the helper matters as much as the leader.",
      ko: "마법 나무집의 힘이 잭과 애니를 미국 독립혁명의 시대로 보내고, 두 아이가 조지 워싱턴 장군을 마주쳐 델라웨어강을 건너는 그의 이름난 도하를 돕는 흐름을 말하고, 돕는 사람이 이끄는 사람만큼 중요한가에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 전쟁 이야기지만 싸움 장면은 다루지 않는다. 강을 건너는 일과 곁에서 돕는 일만 다룬다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "A wide, cold river, and a big group of people who all have to get to the other side. What would they need?",
        do: "책을 펴기 전에 한다. '건너기'가 아이 입에서 먼저 나와야 제목과 요약이 읽힌다. 서너 명만.",
        exp: "Boats. / Rope. / Someone to lead them. / Help from each other.",
        stuck: "선생님이 먼저 한 문장 한다. \"They would need boats and a lot of hands.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Revolutionary War on Wednesday.\" One word tells us WHAT, and one tells us WHEN. Which is which?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "War tells what. Wednesday tells when.",
        stuck: "시리즈의 다른 제목을 하나 떠올리게 한다. \"Every book has a time word. Find it.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "장군 → general / 혁명 → revolution / 건너감 → crossing",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Who do they meet...' becomes 'They meet...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They meet General George Washington.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our summary says Jack and Annie ARE SENT back. It does not say they go. Who is doing the sending?",
        do: "수동태 한 줄을 칠판에 쓴다. 문법 시간의 세 번째 항목과 여기서 이어 붙인다.",
        exp: "The magic tree house sends them. They do not choose it.",
        stuck: "\"Say it the other way round: The tree house ______ them.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to help General Washington — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Who do they want to help?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Crossing)", min: "",
        say: "Stop at The Crossing. Don't just tell me they crossed a river — tell me what a big group needs to get everyone across.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 싸움 이야기로 새면 강으로 되돌린다.",
        exp: "Boats, and people to row. Everyone has to wait and help each other.",
        stuck: "\"You told me what happened. Now — what would go wrong if only one person worked?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is the person who leads more important than the people who help? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think the helpers matter too, because the crossing needed many hands.",
        stuck: "손을 들게 한다. \"The leader? Or the helpers?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say only the leader is remembered, but the work was shared.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about George Washington?", ko: "조지 워싱턴에 대해 이미 아는 게 있니?" },
        { en: "Have you ever helped someone with something too big for one person?", ko: "혼자서는 못 할 만큼 큰 일을 누군가와 함께 해 본 적 있니?" },
        { en: "Why would crossing a wide river be hard for a whole group?", ko: "넓은 강을 여러 사람이 함께 건너는 일은 왜 어려울까?" }
      ],
      during: [
        { en: "The summary says they 'happened to' meet him. What does that word tell you?", ko: "요약은 두 아이가 그를 '우연히' 만났다고 해. 그 말이 무엇을 알려 줄까?" },
        { en: "What do you think two children could actually do to help a general?", ko: "아이 둘이 장군을 도울 수 있는 일이 무엇일까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What exactly did Jack and Annie do during the crossing?", ko: "도하 중에 잭과 애니는 정확히 무엇을 했니?" },
        { en: "Did meeting Washington change how Jack and Annie thought about him?", ko: "워싱턴을 직접 만난 뒤 두 아이의 생각이 달라졌니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Crossing' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다. 또는 싸움 이야기로 샌다. 강 건너기로 되돌린다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 중요하다'라고 쓴다. 편을 정하게 한다." },
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
  // 근거(장서 요약 · 출판사 소개글)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 근거에 없어, 10권과 달리 책의 첫 줄로 시작하지 않는다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집의 힘으로 미국 독립혁명의 시대로 가서 워싱턴 장군의 델라웨어강 도하를 돕는 이야기",
    text: "By the [[strength|power]] of the [[enchanted|magic]] tree house, Jack and Annie were sent back to the time of the American [[uprising|Revolution]]. They happened to meet [[Commander|General]] George Washington. They helped him during his [[well-known|famous]] crossing of the Delaware [[water|River]]. Our summary stops right there. How did the crossing go? What did Jack and Annie do next? Open the book and find out."
  }
};
