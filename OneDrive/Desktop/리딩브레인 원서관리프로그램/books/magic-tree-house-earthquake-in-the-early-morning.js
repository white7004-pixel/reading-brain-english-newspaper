// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Earthquake in the Early Morning (Magic Tree House #24) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3267.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 장서 목록의
// 질문 셋 · 오픈라이브러리 출판사 소개글 · 주제어 목록 · 지명 목록)만으로 만들었다.
// 그 밖의 인물 이름·지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는
// 지어내지 않고 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 실어 보낸다 / 1906년 캘리포니아 샌프란시스코 /
//   거기서 미국이 그때까지 겪은 가장 큰 지진 가운데 하나를 겪는다 /
//   주제어 목록이 이 이야기를 "San Francisco Earthquake and Fire, Calif., 1906" 에 묶어 둔다
// 이 책은 10권과 달리 오픈라이브러리에 **첫 문장이 비어 있다**. 그래서 첫 문장을 쓰는 자리를
// 이 파일 어디에도 두지 않았다. 지어내지 않는다.
// 두 아이가 무엇을 하는지, 어떻게 몸을 지키는지, 어떻게 끝나는지는 어느 출처도 말하지 않는다.
// 장서 요약은 "experience one of the biggest earthquakes" 에서, 소개글도 같은 자리에서 끊긴다.
// 실제 있었던 재난이 배경이지만, 근거 JSON 밖의 역사 사실(피해 규모·사망자·화재의 크기·지진
// 규모)은 한 글자도 쓰지 않았다. 수업 대사에서도 피해를 그리지 않고, 아이의 마음과 몸을
// 지키는 쪽으로만 말하게 했다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3267",
  slug: "magic-tree-house-earthquake-in-the-early-morning",
  title: "Earthquake in the Early Morning",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #24",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "590L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424182-M.jpg",
  // 장서 목록의 수상 칸이 비어 있다. 주제어에 "New York Times bestseller" 가 있으나 상이 아니라 분류다.
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 장서 목록에 함께 적힌 질문 셋과 오픈라이브러리 출판사 소개글·주제어 목록·지명 목록을 겹쳐 보았다. 사람의 기억도, 1906년에 대해 우리가 따로 아는 역사도 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3267 요약 + 오픈라이브러리 /works/OL81777W (소개글 · 주제어 Earthquakes/Magic/Tree houses/Time travel/Fires/San Francisco Earthquake and Fire, Calif., 1906 · 지명 San Francisco/California/USA · 72쪽 · 2001년 · 첫 문장 칸은 비어 있음)",
    characters: ["Jack", "Annie"],
    beats: [
      "the magic tree house takes Jack and Annie to San Francisco, California, in 1906",
      "they experience one of the biggest earthquakes the United States had ever known",
      "the library's subject list ties the story to the San Francisco Earthquake and Fire of 1906"
    ],
    ending: "근거에 결말이 없다. 장서 요약과 출판사 소개글이 똑같이 \"experience one of the biggest earthquakes the United States had ever known\" 에서 멈춘다. 두 아이가 지진이 오는 동안 무엇을 하는지, 어떻게 몸을 지키는지, 누구를 만나는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 장서 목록의 세 번째 질문 자체가 \"Write what you think Jack and Annie do to stay safe\" 라고 아이에게 되묻는 꼴이라, 그 답은 책에만 있다는 뜻이다. 그래서 비워 둔다",
    checked: "장서 요약(\"transported by the magic tree house\", \"San Francisco in 1906\", \"one of the biggest earthquakes the United States had ever known\", \"Book #24\")과 소개글(\"takes Jack and Annie to San Francisco in 1906\", \"in time for them to experience...\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 말은 없었다 — 두 글이 거의 같은 문장이다. 지명 목록의 California 와 USA 가 San Francisco 를 받쳐 주어 주(州)까지만 적었다. 주제어 Earthquakes/Magic/Tree houses/Time travel 이 같은 것을 가리킨다. 주제어에 Fires 와 \"San Francisco Earthquake and Fire, Calif., 1906\" 이 있으나, 불이 이야기 안에서 어떻게 나오는지·두 아이가 그것을 보는지는 어느 출처도 말하지 않아 학습지 어디에도 장면으로 쓰지 않았다. 10권과 달리 첫 문장 칸이 비어 있어 첫 문장을 묻는 문항·문법 보기·낭독 문장을 모두 넣지 않았다. 실제 재난의 피해 규모는 근거 밖이라 한 글자도 쓰지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 세 편의 제목을 하나하나 확인해 모두 이 책(#24 Earthquake in the Early Morning)임을 보았다.
  shadowing: {
    query: "\"Earthquake in the Early Morning\" read aloud",
    searchUrl: "https://youtu.be/3TNVcCTE8pw",
    videos: [
      { url: "https://youtu.be/3TNVcCTE8pw", title: "Magic Tree House| #24 Earthquake in the Early Morning| MARY POPE OSBORNE| New York Times Bestselling",
        channel: "EUNICE books and words", views: "5,629", length: "41:10" },
      { url: "https://youtu.be/_PM6UMHZE2o", title: "Magic Treehouse: Earthquake in the Early Morning  Chapters 1   2 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "198", length: "7:52" },
      { url: "https://youtu.be/q1MPdabTvQw", title: "Magic Treehouse: Earthquake in the Early Morning  Chapters 3   4 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "251", length: "9:02" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·장서 질문·출판사 소개글·주제어·지명에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "earthquake", pos: "n.",   en: "a sudden shaking of the ground", ko: "지진",
      ex: "Jack and Annie experience an {{earthquake}} in San Francisco.", ex_ko: "잭과 애니는 샌프란시스코에서 지진을 겪어요.", pic: "🌍" },
    { word: "early",      pos: "adj.", en: "near the beginning of a day or a period of time", ko: "이른",
      ex: "The title says it happens in the {{early}} morning.", ex_ko: "제목은 그 일이 이른 아침에 일어난다고 말해요.", pic: "⏰" },
    { word: "morning",    pos: "n.",   en: "the first part of the day, before noon", ko: "아침",
      ex: "This book is called \"Earthquake in the Early {{Morning}}.\"", ex_ko: "이 책의 제목은 '이른 아침의 지진'이에요.", pic: "🌅" },
    { word: "magic",      pos: "adj.", en: "having special powers that ordinary things do not have", ko: "마법의",
      ex: "The {{magic}} tree house takes them back in time.", ex_ko: "마법의 나무 집이 그들을 과거로 데려가요.", pic: "✨" },
    { word: "tree house", pos: "n.",   en: "a small house built up in a tree", ko: "나무 위의 집",
      ex: "Jack and Annie travel in a {{tree house}}.", ex_ko: "잭과 애니는 나무 집을 타고 여행해요.", pic: "🌳" },
    { word: "transport",  pos: "v.",   en: "to carry a person or thing from one place to another", ko: "실어 보내다, 옮기다",
      ex: "They get {{transported}} to San Francisco.", ex_ko: "그들은 샌프란시스코로 보내져요.", pic: "🚚" },
    { word: "experience", pos: "v.",   en: "to live through something and feel what it is like", ko: "겪다, 경험하다",
      ex: "They {{experience}} a very big earthquake.", ex_ko: "그들은 아주 큰 지진을 겪어요.", pic: "😮" },
    { word: "disaster",   pos: "n.",   en: "a sudden event in nature that causes great trouble", ko: "재난",
      ex: "An earthquake is a natural {{disaster}}.", ex_ko: "지진은 자연 재난이에요.", pic: "⚠️" },
    { word: "safe",       pos: "adj.", en: "not in danger; away from harm", ko: "안전한",
      ex: "What do Jack and Annie do to stay {{safe}}?", ex_ko: "잭과 애니는 안전하게 있으려고 무엇을 할까요?", pic: "🦺" },
    { word: "travel",     pos: "v.",   en: "to go from one place, or one time, to another", ko: "여행하다, 오가다",
      ex: "Jack and Annie {{travel}} through time to 1906.", ex_ko: "잭과 애니는 시간을 건너 1906년으로 갑니다.", pic: "⏳" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 10권과 달리 이 책은 오픈라이브러리에 첫 문장이 없다. 그래서 '책의 첫 문장' 보기를 넣지 않았다.
  grammar: {
    points: [
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] to San Francisco and [[experienced]] an earthquake.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, experience → experienced. e 로 끝나면 d 만 붙여요.",
        why: "Add -ed to the verb for something that already finished. If the verb ends in e, just add -d.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "the biggest (-est)", ko: "최상급",
        sent: "It was one of the [[biggest]] earthquakes the United States had ever known.",
        why_ko: "'가장 ~한' 은 the + 형용사-est 예요. big 은 g 를 하나 더 붙여 biggest. 여럿 가운데 하나면 one of the biggest.",
        why: "Use the + adjective-est for \"the most.\" Short words double the last letter: big → biggest.",
        try: "This is {{the tallest}} tree in our town." },
      { name: "in + place / in + year", ko: "전치사 in",
        sent: "The story happens [[in]] San Francisco, [[in]] 1906.",
        why_ko: "도시 이름 앞에도 in, 연도 앞에도 in 이에요. in San Francisco, in 1906. 날짜 하루 앞에는 on 을 써요.",
        why: "Use \"in\" before a city and before a year: in San Francisco, in 1906.",
        try: "I was born {{in}} Seoul, {{in}} 2016." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie (travel / traveled) to 1906.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "They (experience / experienced) a big earthquake.", a: "experienced",
          why_ko: "지난 일이에요. experience 는 e 로 끝나니 d 만 붙여 experienced!" },
        { q: "It was one of the (big / biggest) earthquakes.", a: "biggest",
          why_ko: "'가장 큰 것들 가운데 하나' 라는 뜻이니 최상급 biggest 예요." },
        { q: "The story happens (in / on) San Francisco.", a: "in",
          why_ko: "도시 이름 앞에는 in 을 써요. in San Francisco." },
        { q: "The earthquake came (in / at) 1906.", a: "in",
          why_ko: "연도 앞에는 in 이에요. in 1906." }
      ],
      fix: [
        { q: "The magic tree house [[take]] Jack and Annie to San Francisco.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "It was one of the [[bigest]] earthquakes.", a: "biggest",
          why_ko: "big 은 짧은 낱말이라 g 를 하나 더 붙여요. bigest 가 아니라 biggest." },
        { q: "Jack and Annie [[was]] transported by the tree house.", a: "were",
          why_ko: "주어가 둘이니 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "마법의 나무 집이 그들을 1906년으로 데려갔다.", cond: "take, 과거형, to 1906", a: "The magic tree house took them to 1906.",
          why_ko: "take 의 과거형은 took 이에요. '~로' 는 to 를 써요." },
        { ko: "그것은 가장 큰 지진들 가운데 하나였다.", cond: "one of the, big, -est", a: "It was one of the biggest earthquakes.",
          why_ko: "one of the + 최상급 + 복수명사! biggest 뒤에 earthquakes 처럼 s 가 붙어요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "책 소개글", skill: "사실찾기", q: "What city do Jack and Annie go to, and in what year?",
      frame: "They go to {{San Francisco}}, in {{1906}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What do Jack and Annie experience there? How big was it?",
      frame: "They experience {{an earthquake}}. It was one of {{the biggest}} the United States had ever known." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Earthquake in the Early Morning.\" What time of day does the title give you?",
      frame: "The title tells me it is {{the early morning}}." },
    { ref: "장서 요약", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "장서 질문", skill: "추론·예측", q: "Our summary stops at the moment of the earthquake. What do you think Jack and Annie do to stay safe?",
      frame: "I think they {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Have you ever felt the ground move, even a little? What is the first thing you would do?",
      frame: "The first thing I would do is {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and her teacher", "Two firefighters"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie get transported by the magic tree house\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie get to San Francisco?",
      a: ["The magic tree house transports them", "By train", "By ship", "They walk there"], c: 0,
      why_ko: "마법의 나무 집이 실어 보내요. 요약의 낱말이 바로 transported by the magic tree house 예요.",
      why: "The magic tree house. The summary says they \"get transported by the magic tree house.\"" },
    { q: "Which city do they go to?",
      a: ["San Francisco", "New York", "London", "Seoul"], c: 0,
      why_ko: "샌프란시스코예요. 요약과 소개글이 둘 다 San Francisco 라고 적고, 지명 목록에도 들어 있어요.",
      why: "San Francisco — both the summary and the description say so." },
    { q: "San Francisco is in which state?",
      a: ["California", "Texas", "Florida", "Alaska"], c: 0,
      why_ko: "캘리포니아예요. 오픈라이브러리 지명 목록에 San Francisco 와 California 가 나란히 적혀 있어요.",
      why: "California. The library's place list gives San Francisco, California, USA." },
    { q: "In what year does this story take place?",
      a: ["1776", "1895", "1906", "2001"], c: 2,
      why_ko: "1906년이에요. 2001년은 이 책이 나온 해지, 이야기가 일어난 해가 아니에요.",
      why: "1906. 2001 is the year the book was published, not the year of the story." },
    { q: "What natural disaster do Jack and Annie experience?",
      a: ["An earthquake", "A snowstorm", "A flood", "A hurricane"], c: 0,
      why_ko: "지진이에요. 제목에도 Earthquake 가 있고, 주제어 목록에도 Earthquakes 가 있어요.",
      why: "An earthquake — it is in the title and in the subject list." },
    { q: "How does our summary describe the size of the earthquake?",
      a: ["One of the biggest the United States had ever known", "A very small one", "The smallest on record", "Nobody noticed it"], c: 0,
      why_ko: "\"one of the biggest earthquakes the United States had ever known\" 이라고 적혀 있어요. 요약과 소개글이 똑같은 말을 써요.",
      why: "\"One of the biggest earthquakes the United States had ever known\" — the exact wording of both sources." },
    { q: "What time of day does the title point to?",
      a: ["The early morning", "Late at night", "Sundown", "Noon"], c: 0,
      why_ko: "제목이 Earthquake in the Early Morning 이에요. 이른 아침이에요. Sundown 은 같은 시리즈 10권의 제목이에요.",
      why: "The early morning, from the title. \"Sundown\" is the title of book #10." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#4", "#10", "#24", "#42"], c: 2,
      why_ko: "24권이에요. 장서 목록 제목이 \"#24. Earthquake in the Early Morning\" 이고 요약 끝에도 Book #24 라고 적혀 있어요.",
      why: "Book #24 — the catalog title is \"#24. Earthquake in the Early Morning.\"" },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Tedd Arnold", "Roald Dahl", "Dav Pilkey"], c: 0,
      why_ko: "메리 폽 어즈번이에요. 장서 목록과 오픈라이브러리가 둘 다 같은 이름을 적고 있어요.",
      why: "Mary Pope Osborne, in both the catalog and the library record." },
    { q: "Which of these is listed as a subject of this book?",
      a: ["Time travel", "Space travel", "Cooking", "Sports"], c: 0,
      why_ko: "Time travel 이에요. 주제어 목록에 Earthquakes, Magic, Tree houses, Time travel 이 적혀 있어요.",
      why: "Time travel. The subject list gives Earthquakes, Magic, Tree houses and Time travel." },
    { q: "What does the word \"transport\" mean?",
      a: ["To carry someone from one place to another", "To build something", "To read out loud", "To fall asleep"], c: 0,
      why_ko: "transport 는 어디에서 어디로 실어 나른다는 뜻이에요. 나무 집이 두 아이를 그렇게 보내요.",
      why: "To carry someone from one place to another — what the tree house does to Jack and Annie." },
    { q: "What is a \"tree house\"?",
      a: ["A small house built up in a tree", "A house made of paper", "A shop that sells trees", "A kind of boat"], c: 0,
      why_ko: "나무 위에 지은 작은 집이에요. 주제어 목록에도 Tree houses 가 들어 있어요.",
      why: "A small house built up in a tree. \"Tree houses\" is one of the listed subjects." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "What year the story happens", "What Jack and Annie do to stay safe", "What natural disaster they experience"], c: 2,
      why_ko: "두 아이가 어떻게 몸을 지키는지예요. 우리가 가진 글은 지진을 겪는다는 데서 멈춰요. 장서 목록의 세 번째 질문도 \"네 생각을 써 보라\" 고 되물어요. 답은 책에만 있어요.",
      why: "What they do to stay safe. Our sources stop at \"experience one of the biggest earthquakes.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·해결·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{San Francisco, California}}", time: "{{1906, in the early morning}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바라고 갔는지 근거가 말하지 않는다
      { k: "But",      v: "{{a huge earthquake shook the city}}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house transports Jack and Annie back in time.",
        frame: "They go to {{San Francisco}}, in {{California}}, in the year {{1906}}." },
      { label: "The Early Morning",
        given: "",
        frame: "The title tells us the time of day: {{the early morning}}." },
      { label: "The Earthquake",
        given: "",
        frame: "There they experience one of {{the biggest}} earthquakes the United States had ever known." },
      { label: "Staying Safe",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "To stay safe, Jack and Annie {{                    }}." },
      { label: "The Ending",
        given: "",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Earthquake in the Early Morning",
    branches: [
      { label: "Jack & Annie",   ask: "What do we know about the two children before the adventure starts?",
        deeper: "Why do you think the same two children are sent somewhere new in every book?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose San Francisco in 1906 for them?" },
      { label: "Early Morning",  ask: "The title says early morning. What are most people doing at that hour?",
        deeper: "Why would the same event feel different in the early morning than in the middle of the day?" },
      { label: "The Earthquake", ask: "What is an earthquake? Say it in your own words.",
        deeper: "Our summary calls it one of the biggest ever known. What makes one earthquake bigger than another?" },
      { label: "Staying Safe",   ask: "What should a person do when the ground starts to shake?",
        deeper: "Why is it easier to stay calm if you decided what to do BEFORE anything happens?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for a day like this one? Why or why not?",
        deeper: "What would you want to bring with you, and who would you want beside you?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Time", "Safety", "Evidence"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅에서 사람들은 무엇을 겪었나",
    statement: "The ground we trust to stay still can change in a moment, and people decide beforehand how they will meet it.",
    factual: [
      "Where and when does the magic tree house take Jack and Annie?",
      "What natural disaster do they experience there?",
      "How does our summary describe the size of it?"
    ],
    conceptual: [
      "Why do people give a name and a year to something that happened long ago?",
      "What is the difference between being frightened and being unprepared?"
    ],
    debatable: [
      "Should children be taught what to do in an earthquake, even where earthquakes are rare?",
      "Is it better to know that something frightening might happen, or not to know?"
    ],
    learnerProfile: ["Inquirer", "Knowledgeable", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "지진을 겪는다" 까지만 말한다. 두 아이가 무엇을 했는지는 적혀 있지 않으므로,
    // 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie experience one of the biggest earthquakes the United States had ever known. Should every child learn what to do when the ground shakes? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Ready Before It Shakes", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think every child should learn what to do in an earthquake.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie experience a huge earthquake in San Francisco.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows an earthquake can come with no warning, even in the early morning.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say it is scary to learn, but knowing what to do makes me calmer.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe we should practise before we ever need it.", lines: 2 }
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
      en: "Students retell how the magic tree house transports Jack and Annie to San Francisco in 1906, where they experience one of the biggest earthquakes the United States had ever known, then take a side on whether every child should learn what to do when the ground shakes.",
      ko: "마법의 나무 집이 잭과 애니를 1906년 샌프란시스코로 보내고, 두 아이가 미국이 그때까지 겪은 가장 큰 지진 가운데 하나를 겪는 흐름을 말하고, 모든 아이가 지진 때 할 일을 배워야 하는지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 실제 있었던 재난이라 피해를 자세히 그리지 않는다. 무서운 장면이 아니라 '무엇을 할까'로 끌고 간다.
    // 겁이 많은 아이가 있으면 먼저 "우리 교실에서 지금 무엇을 할까" 로 바꿔 묻는다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "The floor under your chair. Has it ever moved on its own? What would you do first?",
        do: "책을 펴기 전에 한다. 무서운 이야기가 아니라 '무엇을 할까'로 문을 연다. 서너 명만.",
        exp: "I would go under the desk. / I would stay away from the window.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would get under my desk and wait.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Earthquake in the Early Morning.\" What are most people doing early in the morning?",
        do: "제목 두 덩이만 푼다. 줄거리는 말하지 않는다.",
        exp: "Sleeping. / Just waking up. / Eating breakfast.",
        stuck: "\"What were you doing at six o'clock this morning?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "지진 → earthquake / 재난 → disaster / 안전한 → safe",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What city...' becomes 'They go to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They go to San Francisco, in 1906.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our summary says it was ONE OF THE BIGGEST the country had ever known. Not the biggest. Why does that little change matter?",
        do: "요약의 낱말 그대로를 칠판에 쓴다. 근거를 정확히 옮기는 훈련이다. 피해 이야기로 새지 않는다.",
        exp: "It means there were others too. / We cannot say it was number one.",
        stuck: "\"If I say you are one of the tallest, am I saying you are THE tallest?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / But: a huge earthquake — Wanted·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What happened to them there?\" 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Staying Safe)", min: "",
        say: "Stop at Staying Safe. Don't tell me it was scary — tell me what a person actually DOES.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 무서움이 아니라 행동으로 답하게 한다.",
        exp: "Get under something strong. Stay away from windows. Stay calm and wait.",
        stuck: "\"You told me how it feels. Now — what do your hands and feet do?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should every child learn what to do in an earthquake? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie had no warning at all.",
        stuck: "손을 들게 한다. \"Learn it now? Or wait and see?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say it is scary to learn about, but knowing makes me calmer.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about earthquakes?", ko: "지진에 대해 이미 아는 게 있니?" },
        { en: "Have you ever felt the ground move, even a little?", ko: "땅이 흔들리는 걸 아주 조금이라도 느껴 본 적 있니?" },
        { en: "The title says early morning. Why might that hour matter in this story?", ko: "제목이 이른 아침이라고 해. 이 이야기에서 그 시간이 왜 중요할까?" }
      ],
      during: [
        { en: "The tree house chose 1906 San Francisco. Why that day, do you think?", ko: "나무 집이 1906년 샌프란시스코를 골랐어. 왜 하필 그날일까?" },
        { en: "What would you put in your backpack before a day like this one?", ko: "이런 날이 오기 전에 가방에 무엇을 넣어 두겠니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What did Jack and Annie actually do to stay safe?", ko: "잭과 애니는 안전하게 있으려고 정말로 무엇을 했니?" },
        { en: "Did anyone help them? Who?", ko: "누가 그들을 도왔니? 누구였어?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'Staying Safe' 가지에서 반드시 멈춘다. 느낌이 아니라 행동을 받는다.", miss: "→ 칸에 '무서웠다' 만 쓴다." },
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
  // 근거가 결말도, 두 아이가 한 일도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 1906년 샌프란시스코로 가 지진을 겪는 이야기",
    text: "The [[wonder-working|magic]] tree house [[carried|transported]] Jack and Annie back through time. It took them to San Francisco, in California, in the year 1906. The title tells us the hour: the [[first light of day|early morning]]. There the ground began to move, and the two children would [[live through|experience]] one of the [[largest|biggest]] earthquakes the United States had ever known. What did Jack and Annie do to stay [[out of harm|safe]]? Our summary stops right here. Open the book and find out."
  }
};
