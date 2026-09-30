// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Thanksgiving on Thursday (Magic Tree House #27) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3270.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·사건·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니(남매) / 마법의 나무 집이 둘을 1621년으로 데려간다 /
//   New Plymouth Colony 에서 순례자(the Pilgrims)들 · 왐파노아그(the Wampanoag Indians)와
//   첫 추수감사절을 함께 기념한다 / 도서관 기록의 장소는 Plymouth (Mass.), Massachusetts /
//   책의 첫 문장은 "Come on," said Annie.
// 첫 추수감사절이 배경이지만, 근거 밖의 역사는 한 줄도 넣지 않았다.
//   1621년 말고 다른 연도, 배를 타고 온 이야기, 순례자들이 어디서 왔는지, 왐파노아그의
//   생활·풍습, 그날 먹은 음식 — 어느 것도 우리 근거가 말하지 않아 학습지 어디에도 없다.
//   왐파노아그는 소개글이 적은 이름 그대로만 한 번 쓰고, 그 밖의 설명을 붙이지 않았다.
// 결말도 근거가 말하지 않는다. 요약도 소개글도 "첫 추수감사절을 함께 기념한다"에서 끊긴다.
//   두 아이가 왜 그리로 갔는지, 무엇을 얻어 오는지, 어떻게 집에 돌아가는지는 비워 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3270",
  slug: "magic-tree-house-thanksgiving-on-thursday",
  title: "Thanksgiving on Thursday",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #27",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "590L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/233645-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어·장소 목록을 겹쳐 보았다. 사람의 기억과 교과서에서 배운 추수감사절 역사는 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3270 요약 + 오픈라이브러리 /works/OL81813W (소개글 · 첫 문장 \"Come on,\" said Annie. · 주제어 Thanksgiving Day/Pilgrims (New Plymouth Colony)/Time travel/History/Magic/Brothers and sisters/Fantasy/Space and time · 장소 Plymouth (Mass.)/Massachusetts · 73쪽 · 2002년)",
    characters: ["Jack", "Annie", "the Pilgrims", "the Wampanoag Indians"],
    beats: [
      "the magic tree house takes Jack and Annie to the year 1621",
      "the siblings travel to the New Plymouth Colony",
      "there they celebrate the first Thanksgiving with the Pilgrims and Wampanoag Indians"
    ],
    ending: "근거에 결말이 없다. 장서 요약도 소개글도 \"celebrate the first Thanksgiving with the Pilgrims ... in the New Plymouth Colony\" 에서 멈춘다. 두 아이가 왜 그 해로 보내졌는지, 그곳에서 무엇을 하고 무엇을 얻는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"the year 1621\", \"the siblings\", \"the first Thanksgiving\", \"the Pilgrims\", \"the New Plymouth Colony\", \"Book #27\")과 오픈라이브러리 소개글(\"travel in their magic treehouse\", \"the Pilgrims and Wampanoag Indians\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(Wampanoag Indians)은 요약과 부딪히지 않아 이름만 남겼고, 그들의 생활·풍습은 어느 출처도 말하지 않아 쓰지 않았다. 주제어 Thanksgiving Day/Pilgrims (New Plymouth Colony)/Time travel/History/Brothers and sisters 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 장소 목록의 Plymouth (Mass.)·Massachusetts 는 도서관 기록이라 그대로 썼다. 그날 먹은 음식은 장서 목록 질문이 \"어떤 음식이 나왔을지 써 보라\" 고 아이에게 묻고 있을 만큼 우리 근거에 없어서, 학습지 어디에도 음식 이름을 넣지 않았다. 배·항해·순례자들이 떠나온 곳·부족의 풍습도 마찬가지로 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 검색 결과에 "Magic Tree House #26 Thanksgiving On Thursday A"(Uncle John, 22:33) 가 섞여 있었으나
  // 제목의 권 번호가 #26 으로 이 책과 달라 확인이 되지 않아 뺐다. 대신 장서 자료(S3270.json)에 적힌
  // 이 책의 영상을 셋째로 넣었다. 셋째 영상은 제목 그대로 1~5장까지만 읽은 앞부분 영상이라
  // 통본(44분·45분) 둘을 앞에 놓았다.
  shadowing: {
    query: "\"Thanksgiving on Thursday\" read aloud",
    searchUrl: "https://youtu.be/fpTf0jUXalY",
    videos: [
      { url: "https://youtu.be/fpTf0jUXalY", title: "Magic Tree House | #27 Thanksgiving on Thursday | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "3,387", length: "44:24" },
      { url: "https://youtu.be/40EdW3BySKI", title: "A Trip to the First Thanksgiving! | Magic Tree House #27 Read Aloud",
        channel: "The Story Harbor", views: "16,903", length: "45:57" },
      { url: "https://youtu.be/TUHmLQ3Gs-8", title: "Magic Tree House: #27 Thanksgiving on Thursday - Chapter 1-5 (앞부분만 읽은 영상)",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어·장소 목록에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "celebrate",   pos: "v.",   en: "to do something special because the day is important", ko: "기념하다, 축하하다",
      ex: "Jack and Annie {{celebrate}} the first Thanksgiving.", ex_ko: "잭과 애니는 첫 추수감사절을 함께 기념해요.", pic: "🎉" },
    { word: "Thanksgiving", pos: "n.",  en: "a day when people come together to give thanks", ko: "추수감사절",
      ex: "This book is about the first {{Thanksgiving}}.", ex_ko: "이 책은 첫 추수감사절에 대한 이야기예요.", pic: "🍽️" },
    { word: "Thursday",    pos: "n.",   en: "the day of the week that comes after Wednesday", ko: "목요일",
      ex: "The title of this book is \"Thanksgiving on {{Thursday}}.\"", ex_ko: "이 책의 제목은 '목요일의 추수감사절'이에요.", pic: "📅" },
    { word: "pilgrim",     pos: "n.",   en: "a person who travels a long way to a place that matters to them; in this book, the Pilgrims are the people of the New Plymouth Colony", ko: "순례자",
      ex: "Jack and Annie meet the {{Pilgrims}}.", ex_ko: "잭과 애니는 순례자들을 만나요.", pic: "🧳" },
    { word: "colony",      pos: "n.",   en: "a new town or settlement built by people who came from far away", ko: "식민지, 정착지",
      ex: "The story happens in the New Plymouth {{Colony}}.", ex_ko: "이야기는 뉴플리머스 식민지에서 펼쳐져요.", pic: "🏘️" },
    { word: "sibling",     pos: "n.",   en: "a brother or a sister", ko: "형제자매, 남매",
      ex: "Jack and Annie are {{siblings}}.", ex_ko: "잭과 애니는 남매예요.", pic: "👦👧" },
    { word: "magic",       pos: "adj.", en: "having a power that cannot be explained", ko: "마법의",
      ex: "The {{magic}} tree house takes them back in time.", ex_ko: "마법의 나무 집이 그들을 과거로 데려가요.", pic: "✨" },
    { word: "travel",      pos: "v.",   en: "to go from one place to another, often a long way", ko: "여행하다, 이동하다",
      ex: "They {{travel}} to the year 1621.", ex_ko: "그들은 1621년으로 이동해요.", pic: "🧭" },
    { word: "first",       pos: "adj.", en: "coming before all the others; happening at the start", ko: "첫 번째의, 처음의",
      ex: "They celebrate the {{first}} Thanksgiving.", ex_ko: "그들은 첫 번째 추수감사절을 기념해요.", pic: "1️⃣" },
    { word: "history",     pos: "n.",   en: "the story of things that happened long ago", ko: "역사",
      ex: "\"History\" is one of the subjects listed for this book.", ex_ko: "'역사'는 이 책의 주제어 가운데 하나예요.", pic: "📜" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // "Come on," said Annie. 만은 책의 첫 문장이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure in [[a]] colony far from home.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a colony.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} tree house and {{an}} old book." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] to 1621 and [[celebrated]] the first Thanksgiving.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, celebrate → celebrated (e 로 끝나면 d 만!).",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "\" \" + said", ko: "따옴표와 said",
        sent: "The book begins, [[\"Come on,\"]] said Annie.",
        why_ko: "사람이 한 말은 따옴표 \" \" 안에 넣어요. 말이 먼저 나오면 따옴표 안 끝에 마침표가 아니라 쉼표(,)를 쓰고, 그다음에 said + 이름이 와요.",
        why: "Put spoken words inside quotation marks. When the words come first, end them with a comma, then write said + the name.",
        try: "{{\"}}Let's go,{{\"}} said Jack." }
    ],
    find: "책에서 따옴표 \" \" 안에 든 말을 세 개 찾아 쓰세요. · Find three lines inside quotation marks.",
    exam: {
      choose: [
        { q: "Jack and Annie went to (a / an) colony in 1621.", a: "a",
          why_ko: "colony 는 '카'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "They had (a / an) amazing day with the Pilgrims.", a: "an",
          why_ko: "amazing 은 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "Jack and Annie (travel / traveled) to the year 1621.", a: "traveled",
          why_ko: "1621년은 이미 지난 일이니 과거형 traveled 예요." },
        { q: "They (celebrate / celebrated) the first Thanksgiving.", a: "celebrated",
          why_ko: "지난 일이에요. celebrate 는 e 로 끝나니 d 만 붙여 celebrated!" },
        { q: "The book begins, (\"Come on,\" / Come on,) said Annie.", a: "\"Come on,\"",
          why_ko: "애니가 한 말이니 따옴표 \" \" 안에 넣어요. 그리고 끝은 쉼표(,) 예요." }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] to the year 1621.", a: "traveled",
          why_ko: "1621년은 한참 지난 일이에요. 과거형 traveled 로 고쳐요." },
        { q: "The magic tree house [[take]] them to the New Plymouth Colony.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "Annie [[say]], \"Come on.\"", a: "said",
          why_ko: "say 도 불규칙 동사예요. 과거형은 sayed 가 아니라 said." }
      ],
      write: [
        { ko: "\"어서 와.\" 하고 애니가 말했다.", cond: "said, 따옴표", a: "\"Come on,\" said Annie.",
          why_ko: "말한 내용을 따옴표 안에 넣고 끝에 쉼표, 그다음 said + 이름이에요. 책의 첫 문장 그대로예요." },
        { ko: "그들은 1621년에 첫 추수감사절을 기념했다.", cond: "celebrate, 과거형", a: "They celebrated the first Thanksgiving in 1621.",
          why_ko: "celebrate 는 e 로 끝나니 -ed 가 아니라 d 만 붙여 celebrated 예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "책 소개글", skill: "사실찾기", q: "What year do Jack and Annie travel to, and what do they celebrate there?",
      frame: "They travel to {{1621}}, and they celebrate {{the first Thanksgiving}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Who do Jack and Annie celebrate with, and in what colony?",
      frame: "They celebrate with {{the Pilgrims}} and {{the Wampanoag Indians}}, in {{the New Plymouth Colony}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Thanksgiving on Thursday.\" What day of the week is in the title, and what does \"celebrate\" mean?",
      frame: "The day is {{Thursday}}, and \"celebrate\" means {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book begins, \"Come on,\" said Annie. Who do you think she is talking to, and what do you think she wants?",
      frame: "I think she is talking to {{                    }}, and she wants {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If the tree house took you to a big meal with people you had never met, what would you say first? Say why.",
      frame: "I would say {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a Pilgrim", "Two children of the colony"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"takes Jack and Annie to the year 1621\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["In their magic tree house", "On a horse", "In a time machine", "On a train"], c: 0,
      why_ko: "마법의 나무 집이에요. 소개글이 \"travel in their magic treehouse\" 라고 적고 있어요.",
      why: "The magic tree house — the description says \"travel in their magic treehouse.\"" },
    { q: "What year does the magic tree house take them to?",
      a: ["1492", "1621", "1776", "2002"], c: 1,
      why_ko: "1621년이에요. 2002년은 이 책이 나온 해지, 이야기가 일어난 해가 아니에요.",
      why: "1621. 2002 is the year the book was published, not the year of the story." },
    { q: "What do Jack and Annie celebrate in this book?",
      a: ["The first Thanksgiving", "A birthday", "New Year's Day", "A wedding"], c: 0,
      why_ko: "첫 추수감사절이에요. 요약과 소개글이 둘 다 \"the first Thanksgiving\" 이라고 말해요.",
      why: "The first Thanksgiving. Both the summary and the description say so." },
    { q: "Who do Jack and Annie celebrate it with?",
      a: ["The Pilgrims and the Wampanoag Indians", "Cowboys and rustlers", "Knights and a king", "Their teacher and their class"], c: 0,
      why_ko: "순례자들(the Pilgrims)과 왐파노아그 사람들(the Wampanoag Indians)이에요. 소개글이 둘을 나란히 적어 두었어요.",
      why: "The Pilgrims and the Wampanoag Indians — the description lists both." },
    { q: "In what colony does the story take place?",
      a: ["The New Plymouth Colony", "The Roanoke Colony", "The Jamestown Colony", "The Hudson Colony"], c: 0,
      why_ko: "뉴플리머스 식민지(the New Plymouth Colony)예요. 우리 자료가 이름을 대는 곳은 이 한 곳뿐이에요.",
      why: "The New Plymouth Colony — the only colony our sources name." },
    { q: "According to the library record, which place is this book set in?",
      a: ["Massachusetts", "Texas", "California", "New York"], c: 0,
      why_ko: "매사추세츠예요. 도서관 기록의 장소 칸에 Plymouth (Mass.) 와 Massachusetts 가 적혀 있어요.",
      why: "Massachusetts. The library record lists \"Plymouth (Mass.)\" and \"Massachusetts.\"" },
    { q: "Which day of the week is in the title of this book?",
      a: ["Monday", "Tuesday", "Thursday", "Sunday"], c: 2,
      why_ko: "목요일(Thursday)이에요. 제목이 \"Thanksgiving on Thursday\" 니까요.",
      why: "Thursday — the title is \"Thanksgiving on Thursday.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Come on,\" said Annie.", "\"Wait for me!\" said Jack.", "Jack could not sleep.", "The colony was quiet."], c: 0,
      why_ko: "첫 문장은 \"Come on,\" said Annie. 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line of the book." },
    { q: "Who speaks the first line of the book?",
      a: ["Annie", "Jack", "a Pilgrim", "Morgan"], c: 0,
      why_ko: "애니예요. 첫 문장이 said Annie 로 끝나요.",
      why: "Annie. The first line ends with \"said Annie.\"" },
    { q: "What is Jack and Annie's relationship?",
      a: ["They are siblings", "They are cousins", "They are neighbors", "They are classmates"], c: 0,
      why_ko: "남매예요. 장서 요약이 두 아이를 \"the siblings\" 라고 부르고, 주제어에도 Brothers and sisters 가 있어요.",
      why: "Siblings. The summary calls them \"the siblings,\" and \"Brothers and sisters\" is a listed subject." },
    { q: "What does \"celebrate\" mean?",
      a: ["To do something special on an important day", "To run away quickly", "To read very slowly", "To build a house"], c: 0,
      why_ko: "celebrate 는 중요한 날에 특별한 일을 하며 기념한다는 뜻이에요.",
      why: "To celebrate is to do something special because the day is important." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#7", "#17", "#27", "#37"], c: 2,
      why_ko: "27권이에요. 장서 목록 제목이 \"#27. Thanksgiving on Thursday\" 이고 요약 끝에도 Book #27 이라고 적혀 있어요.",
      why: "Book #27 — the catalog title is \"#27. Thanksgiving on Thursday.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["What year Jack and Annie go to", "Who they celebrate with", "What food was served that day", "Which colony they are in"], c: 2,
      why_ko: "그날 어떤 음식이 나왔는지예요. 우리 자료는 음식을 한 가지도 말하지 않아요. 장서 목록도 그건 아이에게 \"어떤 음식이 나왔을지 써 보라\" 고 묻고 있어요. 책을 읽어야 알 수 있어요.",
      why: "What food was served. None of our sources names a single dish — the catalog even asks the reader to imagine it." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(두 아이가 원한 것 · 문제 · 결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{the New Plymouth Colony, in Massachusetts}}", time: "{{the year 1621}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 왜 1621년으로 갔는지 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The First Line",
        given: "The book begins with Annie speaking.",
        frame: "She says, {{\"Come on.\"}}" },
      { label: "The Tree House",
        given: "The magic tree house takes Jack and Annie back in time.",
        frame: "They go to the year {{1621}}, to {{the New Plymouth Colony}}." },
      { label: "The First Thanksgiving",
        given: "",
        frame: "There the {{siblings}} celebrate {{the first Thanksgiving}} with {{the Pilgrims}} and {{the Wampanoag Indians}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Thanksgiving on Thursday",
    branches: [
      { label: "Jack & Annie",    ask: "Our summary calls Jack and Annie \"the siblings.\" What does that word tell you about them?",
        deeper: "Why do you think this series sends two children together, and not one alone?" },
      { label: "The Tree House",  ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "If a place could take you to any year, what would be hard about coming back?" },
      { label: "The Year 1621",   ask: "Jack and Annie land in the year 1621. How long ago is that from today?",
        deeper: "What would surprise a child from 1621 the most about your day?" },
      { label: "The Colony",      ask: "The story happens in the New Plymouth Colony. What do you think a brand-new town needs first?",
        deeper: "Why would starting a town far from home be hard?" },
      { label: "The First Thanksgiving", ask: "Jack and Annie celebrate with the Pilgrims and the Wampanoag Indians — two groups, one day. What would be hard about that?",
        deeper: "How can people who do not know each other share one celebration?" },
      { label: "Me",              ask: "Which day do you celebrate with your family, and what makes it different from other days?",
        deeper: "If you could invite someone from long ago to that day, who would it be, and why?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Celebration", "Community", "History"],
    globalContext: "Orientation in space and time — 400년 전의 하루는 오늘 우리의 하루와 어떻게 다른가",
    statement: "A celebration can bring together people who did not start out sharing the same home.",
    factual: [
      "What year does the magic tree house take Jack and Annie to?",
      "What do they celebrate there, and in what colony?",
      "Who do they celebrate it with?"
    ],
    conceptual: [
      "Why do people set aside one day of the year and call it special?",
      "What makes the very first time something happens different from all the times after?"
    ],
    debatable: [
      "Is a celebration better with people you know well, or with new people?",
      "Do we need to know how a holiday began in order to enjoy it?"
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Communicator"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "첫 추수감사절을 함께 기념한다" 까지만 말한다. 그날 무슨 일이 있었는지는 적혀
    // 있지 않으므로, 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "In 1621 Jack and Annie celebrate the first Thanksgiving with people they have just met. Is a celebration better with people you know well, or with new people?",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "어느 쪽인지 분명히 할 것 · Choose one side clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "A Table for New Friends", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think a celebration is better when new people join it.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie celebrate the first Thanksgiving with people from 1621.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that a day can be shared by people who only just met.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say family days should stay small, but Jack and Annie were welcomed.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a bigger table makes a better day.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to the year 1621, where the siblings celebrate the first Thanksgiving with the Pilgrims and Wampanoag Indians in the New Plymouth Colony, then take a side on whether a celebration is better with people you know or with new people.",
      ko: "마법의 나무 집이 잭과 애니를 1621년으로 데려가고, 두 남매가 뉴플리머스 식민지에서 순례자들·왐파노아그 사람들과 첫 추수감사절을 함께 기념하는 흐름을 말하고, 아는 사람과 보내는 날과 처음 만난 사람과 보내는 날 가운데 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 추수감사절의 역사도 수업에서 설명하지 않는다 — 우리 자료에 없는 것을 선생님이 채우면
    // 아이가 책을 읽지 않는다. 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of one day your family makes special every year. What do you do on that day?",
        do: "책을 펴기 전에 한다. '기념하는 날'을 아이 입에서 먼저 꺼내야 제목이 읽힌다. 서너 명만.",
        exp: "My birthday. / Seollal. / Chuseok — we eat together.",
        stuck: "선생님이 먼저 한 문장 한다. \"On that day my family eats together.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Thanksgiving on Thursday.\" Which word is the day of the week? Which word is the celebration?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Thursday is the day. Thanksgiving is the celebration.",
        stuck: "요일 일곱 개를 함께 세어 본다. \"Where does Thursday come?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "기념하다 → celebrate / 남매 → siblings / 정착지 → colony",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What year...' becomes 'They travel to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They travel to 1621, and they celebrate the first Thanksgiving.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Come on,\" said Annie. Two words, and the story starts. Who is she talking to?",
        do: "칠판에 그 한 문장만 쓴다. 답을 정해 주지 않는다 — 우리는 모른다.",
        exp: "Jack. / Someone who is slower than her.",
        stuck: "\"Who is always with Annie in these books?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie — Wanted·But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those four boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The First Thanksgiving)", min: "",
        say: "Stop here. Two groups, one day, and they do not know each other. What would be hard about that?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 역사 설명으로 새지 않는다.",
        exp: "They speak differently. / They eat different food. / They have to be careful and kind.",
        stuck: "\"Think of a new student on the first day. What is hard for them?\"" },

      { stage: "Mind Map (The Year 1621)", min: "",
        say: "1621. Count with me — how many years ago is that?",
        do: "칠판에 뺄셈 한 줄만 쓴다. 그 시대가 어땠는지는 말하지 않는다. 우리 자료에 없다.",
        exp: "About four hundred years ago.",
        stuck: "\"What year is it now? Now take 1621 away.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is a celebration better with people you know well, or with new people? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think new people, because Jack and Annie were strangers and still joined the day.",
        stuck: "손을 들게 한다. \"Only your family? Or open the door?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say family days should stay small, but Jack and Annie were welcomed.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What does your family do on the day you celebrate together?", ko: "너희 가족이 함께 기념하는 날에는 무엇을 하니?" },
        { en: "Have you ever joined a celebration where you knew almost nobody?", ko: "아는 사람이 거의 없는 자리에 끼어 본 적 있니?" },
        { en: "The title says Thursday. Why would a story name a day of the week?", ko: "제목이 목요일이라고 해. 이야기가 왜 요일을 제목에 넣었을까?" }
      ],
      during: [
        { en: "The tree house sent them to 1621. What do you think surprised Jack first?", ko: "나무 집이 둘을 1621년으로 보냈어. 잭은 무엇에 가장 놀랐을까?" },
        { en: "Annie says \"Come on\" on the very first page. What is she like, do you think?", ko: "애니는 첫 쪽에서 \"어서 와\" 라고 해. 애니는 어떤 아이일 것 같니?" }
      ],
      after: [
        { en: "What food was served that day? Our summary never says — tell me what the book says.", ko: "그날 어떤 음식이 나왔니? 우리 자료엔 없어. 책이 뭐라고 하는지 말해 줘." },
        { en: "Why did the tree house send Jack and Annie to 1621? Our summary does not tell us.", ko: "나무 집은 왜 둘을 1621년으로 보냈을까? 우리 자료는 말해 주지 않아." },
        { en: "How does the story end, and how do they get home?", ko: "이야기는 어떻게 끝나고, 둘은 어떻게 집으로 돌아가니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The First Thanksgiving' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "역사 이야기",    point: "선생님도 추수감사절의 유래를 설명하지 않는다. 우리 자료에 없다.", miss: "배·항해·음식 이야기를 곁들인다. 그러면 아이가 책에서 확인할 일이 없어진다." },
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
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장 · 장소 목록)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 그날의 음식도, 결말도 근거가 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 1621년 뉴플리머스로 가서 첫 추수감사절을 함께 보내는 이야기",
    text: "\"Come on,\" said Annie. The [[wonder-working|magic]] tree house took Jack and Annie back to the year 1621. The two [[brother and sister|siblings]] came to the New Plymouth Colony, in Massachusetts. There they [[kept the day with|celebrated]] the [[very earliest|first]] Thanksgiving, together with the Pilgrims and the Wampanoag Indians. What was that day like? What did they eat, and what did they say to one another? Our summary stops here. Open the book and find out."
  }
};
