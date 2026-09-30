// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Buffalo Before Breakfast (Magic Tree House #18) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3262.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 지명 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과, 잭의 여동생 애니 / 마법의 나무 집이 둘을 대평원(the Great Plains)으로 보낸다 /
//   거기서 두 아이는 라코타(Lakota) 사람들의 삶에 대해 배운다 /
//   책의 첫 문장은 "Jack finished tying his sneakers." / 1999년에 나온 96쪽 책 /
//   주제어에 Tree houses · Time travel · Magic 이 있다
// 제목에 buffalo 가 들어 있다는 것 말고, 버펄로가 이야기 속에서 무엇을 하는지는 어느
// 출처도 말하지 않는다. 그래서 버펄로가 나오는 장면을 한 줄도 쓰지 않았다.
// 라코타 사람들의 살림살이·집·먹을거리·풍습도 근거 밖이라 학습지 어디에도 쓰지 않았다.
// 근거는 "그들의 삶에 대해 배운다" 까지만 말한다. 무엇을 배웠는지는 책이 말한다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3262",
  slug: "magic-tree-house-buffalo-before-breakfast",
  title: "Buffalo Before Breakfast",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #18",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "560L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424176-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·지명 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3262 요약 + 오픈라이브러리 /works/OL81822W (소개글 · 첫 문장 \"Jack finished tying his sneakers.\" · 주제어 Dakota Indians/Indians of North America/Magic/Time travel/Tree houses/Teton Indians · 지명 Great Plains · 96쪽 · 1999년)",
    characters: ["Jack", "Annie (Jack's sister)", "the Lakota Indians"],
    beats: [
      "the magic tree house whisks Jack and his sister Annie off to the Great Plains",
      "there they learn about the life of the Lakota Indians",
      "the book opens with an ordinary moment: \"Jack finished tying his sneakers.\""
    ],
    ending: "근거에 결말이 없다. 장서 요약도 소개글도 \"거기서 라코타 사람들의 삶에 대해 배운다\"에서 그대로 멈춘다. 두 아이가 무엇을 배웠는지, 누구를 만났는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"whisks Jack and Annie off to the Great Plains\", \"they learn about the life of the Lakota Indians\", \"Book #18\")과 소개글(\"takes Jack and his sister Annie to the Great Plains\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(애니가 잭의 여동생이라는 말)은 요약과 부딪히지 않아 남겼다. 주제어 Tree houses/Time travel/Magic 과 지명 Great Plains 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 제목에 Buffalo 가 있으나 버펄로가 이야기에서 무엇을 하는지는 어느 출처도 말하지 않아 장면으로 쓰지 않고 제목 낱말로만 다루었다. 주제어에 Dakota Indians · Teton Indians 가 있으나 그 말들이 라코타와 어떤 사이인지 우리 근거가 설명하지 않아 학습지에 쓰지 않았다. 주제어 Spanish language materials 는 이 책의 스페인어판을 가리키는 도서관 표시라 이야기와 상관이 없어 뺐다. 라코타 사람들의 집·먹을거리·풍습처럼 근거 밖의 일반 지식은 한 줄도 넣지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Buffalo Before Breakfast\" read aloud",
    searchUrl: "https://youtu.be/epTbGr3tLHk",
    videos: [
      { url: "https://youtu.be/epTbGr3tLHk", title: "Magic Tree House | #18 Buffalo Before Breakfast | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "10,856", length: "41:55" },
      { url: "https://youtu.be/wXbIO5Cdxk0", title: "Magic Tree House (18) Buffalo Before Breakfast",
        channel: "산타잉글리쉬", views: "752", length: "39:31" },
      { url: "https://youtu.be/BRR3oHAKF1E", title: "The Magic Tree House #18 Buffalo Before Breakfast Read Aloud • Prologue",
        channel: "Kids Read Aloud", views: "315", length: "1:56" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어·지명에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "buffalo",   pos: "n.",   en: "a very large wild animal like a cow, with a big shaggy head", ko: "버펄로, 들소",
      ex: "The title of this book is \"{{Buffalo}} Before Breakfast.\"", ex_ko: "이 책의 제목은 '아침 먹기 전의 버펄로'예요.", pic: "🦬" },
    { word: "breakfast", pos: "n.",   en: "the first meal you eat in the morning", ko: "아침 식사",
      ex: "Something happens before {{breakfast}} in this story's title.", ex_ko: "이 이야기의 제목에서는 아침 식사 전에 무슨 일이 일어나요.", pic: "🍳" },
    { word: "plain",     pos: "n.",   en: "a large piece of flat land with few trees on it", ko: "평원, 들판",
      ex: "Jack and Annie go to the Great {{Plains}}.", ex_ko: "잭과 애니는 대평원으로 갑니다.", pic: "🌾" },
    { word: "great",     pos: "adj.", en: "very large in size, or very important", ko: "큰, 위대한",
      ex: "The Great Plains is a very {{great}} stretch of flat land.", ex_ko: "대평원은 아주 넓게 펼쳐진 평지예요.", pic: "🗺️" },
    { word: "magic",     pos: "adj.", en: "having strange powers that cannot be explained", ko: "마법의",
      ex: "The {{magic}} tree house whisks them off to the Great Plains.", ex_ko: "마법의 나무 집이 둘을 대평원으로 데려가요.", pic: "✨" },
    { word: "travel",    pos: "v.",   en: "to go from one place to another, often far away", ko: "여행하다, 이동하다",
      ex: "Jack and Annie {{travel}} through time in every book.", ex_ko: "잭과 애니는 매 권에서 시간을 넘어 이동해요.", pic: "🧳" },
    { word: "learn",     pos: "v.",   en: "to come to know something you did not know before", ko: "배우다",
      ex: "There they {{learn}} about the life of the Lakota Indians.", ex_ko: "거기서 그들은 라코타 사람들의 삶에 대해 배워요.", pic: "📖" },
    { word: "life",      pos: "n.",   en: "the way a person or a people live from day to day", ko: "삶, 생활",
      ex: "They learn about the {{life}} of the Lakota Indians.", ex_ko: "그들은 라코타 사람들의 삶에 대해 배웁니다.", pic: "🏕️" },
    { word: "sneakers",  pos: "n.",   en: "soft shoes with rubber bottoms that you wear to run or play", ko: "운동화",
      ex: "At the start of the book, Jack finished tying his {{sneakers}}.", ex_ko: "책이 시작할 때 잭은 운동화 끈을 다 묶었어요.", pic: "👟" },
    { word: "tie",       pos: "v.",   en: "to fasten something with a string or a lace", ko: "묶다, 매다",
      ex: "Jack finished {{tying}} his sneakers.", ex_ko: "잭은 운동화 끈 묶기를 마쳤어요.", pic: "🪢" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // finished tying 만은 책의 첫 문장("Jack finished tying his sneakers.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure on [[a]] great flat plain.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a plain.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} buffalo and {{an}} open field." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack [[finished]] tying his sneakers, and the tree house [[whisked]] them away.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. finish → finished, whisk → whisked.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "finish + -ing", ko: "동명사 목적어",
        sent: "The book begins, \"Jack [[finished tying]] his sneakers.\"",
        why_ko: "finish 뒤에는 to부정사가 아니라 동사-ing 가 와요. finish to tie(X), finish tying(O). 내신 단골이에요!",
        why: "After \"finish,\" use verb-ing, not \"to\" + verb. We say \"finished tying.\"",
        try: "I {{finished reading}} the book and {{finished writing}} my name." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "The Great Plains is (a / an) very flat place.", a: "a",
          why_ko: "very 는 '베'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie had (a / an) adventure on the Great Plains.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "The magic tree house (whisk / whisked) them off to the Great Plains.", a: "whisked",
          why_ko: "이미 일어난 일이니 과거형 whisked 예요." },
        { q: "They (learn / learned) about the life of the Lakota Indians.", a: "learned",
          why_ko: "지난 일이에요. learn 에 -ed 를 붙여 learned!" },
        { q: "Jack finished (to tie / tying) his sneakers.", a: "tying",
          why_ko: "finish 뒤에는 동사-ing 가 와요. 책의 첫 문장도 finished tying 이에요." }
      ],
      fix: [
        { q: "Jack [[finish]] tying his sneakers at the start of the book.", a: "finished",
          why_ko: "책의 첫 문장은 과거형이에요. finish 에 -ed 를 붙여 finished." },
        { q: "The magic tree house [[take]] them to the Great Plains.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "Jack finished [[to tie]] his sneakers.", a: "tying",
          why_ko: "finish 뒤에는 to부정사가 못 와요. tying 으로 고쳐요." }
      ],
      write: [
        { ko: "잭은 운동화 끈 묶기를 마쳤다.", cond: "finish, tie, 과거형", a: "Jack finished tying his sneakers.",
          why_ko: "finish 를 과거형 finished 로, 뒤에는 tie 의 -ing 형 tying 을 써요." },
        { ko: "그들은 라코타 사람들의 삶에 대해 배웠다.", cond: "learn, about, 과거형", a: "They learned about the life of the Lakota.",
          why_ko: "learn 의 과거형은 learned 예요. '~에 대해'는 about 을 씁니다." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 소개글", skill: "사실찾기", q: "Who are the two children in this story, and how are they related?",
      frame: "They are {{Jack}} and {{Annie}}, and Annie is Jack's {{sister}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What takes Jack and Annie away, and where does it take them?",
      frame: "{{The magic tree house}} takes them to {{the Great Plains}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What do Jack and Annie learn about on the Great Plains?",
      frame: "They learn about {{the life of the Lakota Indians}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Buffalo Before Breakfast.\" What is a buffalo, and what does \"before breakfast\" tell you about the time of day?",
      frame: "A buffalo is {{a very large wild animal}}, and \"before breakfast\" means {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book's first sentence is \"Jack finished tying his sneakers.\" What does that tell you about the moment the story starts?",
      frame: "I think it tells us {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "Jack and Annie travel to a place far from home and learn about how other people live. In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If the tree house took you somewhere far away, what would you most want to learn about the people who live there?",
      frame: "I would want to learn about {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a cowboy", "Two brothers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"whisks Jack and Annie off to the Great Plains\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How is Annie related to Jack?",
      a: ["She is his sister", "She is his cousin", "She is his friend from school", "She is his neighbor"], c: 0,
      why_ko: "여동생이에요. 출판사 소개글이 \"Jack and his sister Annie\" 라고 적고 있어요.",
      why: "His sister. The description says \"Jack and his sister Annie.\"" },
    { q: "How do Jack and Annie get to the place in this story?",
      a: ["The magic tree house", "A train", "A horse", "A hot air balloon"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"The magic tree house whisks Jack and Annie off\" 라고 말하고, 주제어에도 Tree houses 와 Magic 이 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Magic\" are both listed subjects." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To the Great Plains", "To the wild west town of 1895", "To ancient Egypt", "To the moon"], c: 0,
      why_ko: "대평원(the Great Plains)이에요. 요약과 소개글이 둘 다 그렇게 적었고, 오픈라이브러리 지명 목록에도 Great Plains 가 있어요.",
      why: "The Great Plains — both the summary and the description say so, and it is the listed place." },
    { q: "What do Jack and Annie learn about there?",
      a: ["The life of the Lakota Indians", "How to build a tree house", "How to ride a train", "The rules of a game"], c: 0,
      why_ko: "라코타 사람들의 삶이에요. 요약이 \"they learn about the life of the Lakota Indians\" 라고 말해요.",
      why: "The life of the Lakota Indians, exactly as the summary says." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack finished tying his sneakers.\"", "\"Jack couldn't sleep.\"", "\"Jack and Annie were sitting on the porch of their house.\"", "\"The grass moved in the wind.\""], c: 0,
      why_ko: "첫 문장은 \"Jack finished tying his sneakers.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. 세 번째 보기는 10권의 첫 문장이에요.",
      why: "That is the recorded first line. The third choice opens book #10, not this one." },
    { q: "In the first sentence, what had Jack just finished doing?",
      a: ["Tying his sneakers", "Eating his breakfast", "Packing his bag", "Reading a book"], c: 0,
      why_ko: "운동화 끈을 다 묶은 참이에요. \"Jack finished tying his sneakers.\" 가 그대로 말해 줍니다.",
      why: "Tying his sneakers — the first sentence says it word for word." },
    { q: "Which animal's name is in the title of this book?",
      a: ["Buffalo", "Horse", "Wolf", "Eagle"], c: 0,
      why_ko: "버펄로예요. 제목이 \"Buffalo Before Breakfast\" 이니까요.",
      why: "Buffalo. The title is \"Buffalo Before Breakfast.\"" },
    { q: "What does the word \"plains\" mean?",
      a: ["A large flat piece of land", "A tall mountain", "A deep lake", "A thick forest"], c: 0,
      why_ko: "plains 는 나무가 거의 없는 넓고 평평한 땅이에요. 그래서 Great Plains 를 '대평원' 이라고 옮겨요.",
      why: "Plains are a large flat stretch of land, which is why \"Great Plains\" means a huge flat region." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#8", "#10", "#18", "#28"], c: 2,
      why_ko: "18권이에요. 장서 목록 제목이 \"#18. Buffalo Before Breakfast\" 이고 요약 끝에도 Book #18 이라고 적혀 있어요.",
      why: "Book #18 — the catalog title is \"#18. Buffalo Before Breakfast.\"" },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Tedd Arnold", "Dav Pilkey", "Barbara Park"], c: 0,
      why_ko: "메리 폽 오즈번이에요. 장서 목록과 오픈라이브러리 둘 다 저자를 그렇게 적었어요.",
      why: "Mary Pope Osborne, as both the catalog and Open Library record." },
    { q: "Which of these is a listed subject word for this book?",
      a: ["Time travel", "Space flight", "Baseball", "Cooking"], c: 0,
      why_ko: "Time travel 이에요. 주제어 목록에 Time travel · Tree houses · Magic 이 나란히 있어요.",
      why: "Time travel. The subject list holds Time travel, Tree houses and Magic." },
    { q: "In what year was this book published?",
      a: ["1979", "1989", "1999", "2009"], c: 2,
      why_ko: "1999년이에요. 오픈라이브러리 기록이 1999년, 96쪽이라고 적고 있어요.",
      why: "1999 — the Open Library record gives 1999 and 96 pages." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where the tree house takes Jack and Annie", "What they learn about there", "What the buffalo do in the story", "Who wrote the book"], c: 2,
      why_ko: "버펄로가 이야기에서 무엇을 하는지예요. 우리가 가진 글은 제목에 buffalo 가 있다는 것까지만 말해요. 그건 책을 읽어야 알 수 있어요.",
      why: "What the buffalo do. Our sources only tell us the word \"buffalo\" is in the title." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{the Great Plains}}", time: "{{                    }}" },   // 몇 년도인지 근거가 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and his sister Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 원했는지 근거가 말하지 않는다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie off.",
        frame: "They go to {{the Great Plains}}." },
      { label: "The Great Plains",
        given: "",
        frame: "There they learn about the life of {{the Lakota Indians}}." },
      { label: "The Title",
        given: "The title of the book is \"Buffalo Before Breakfast.\"",
        frame: "우리 자료는 버펄로가 무엇을 하는지 말해 주지 않는다. 책에서 찾아 써라. {{                    }}" },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Buffalo Before Breakfast",
    branches: [
      { label: "Jack & Annie",    ask: "The book opens with Jack finishing tying his sneakers. What is he doing right before the adventure starts?",
        deeper: "Why do you think an adventure so often begins on an ordinary, quiet day?" },
      { label: "The Tree House",  ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose the Great Plains for them?" },
      { label: "The Great Plains", ask: "The Great Plains is a huge flat land. What do you picture when you hear that?",
        deeper: "How would living on a wide open plain be different from living where you live?" },
      { label: "Learning",        ask: "Jack and Annie learn about the life of the Lakota. What does it mean to learn about someone's way of life?",
        deeper: "What is the difference between reading about people and meeting them?" },
      { label: "The Title",       ask: "The title says \"Buffalo Before Breakfast.\" What do you expect from a title like that?",
        deeper: "Why do you think the writer put an animal and a meal in the same title?" },
      { label: "Me",              ask: "If the tree house came for you, where would you ask it to go? Why?",
        deeper: "What would you want to learn there, and how would you show respect while you learned it?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Culture",
    relatedConcepts: ["Perspective", "Respect", "Community"],
    globalContext: "Identities and relationships — 다른 곳 사람들의 삶의 방식을 알아 가는 일",
    statement: "Traveling somewhere far away can teach you how other people live.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What do they learn about there?",
      "How is Annie related to Jack?"
    ],
    conceptual: [
      "What does it mean to learn about a people's way of life?",
      "Why can you understand a place better by going there than by only hearing about it?"
    ],
    debatable: [
      "Is it important to learn how people far away from you live?",
      "Can you really understand a way of life after only a short visit?"
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "라코타 사람들의 삶에 대해 배운다" 까지만 말한다. 무엇을 배웠는지는 적혀 있지
    // 않으므로, 배운 내용이 아니라 '배우는 일' 자체를 묻는 물음으로 세웠다.
    prompt: "Jack and Annie travel to the Great Plains and learn about the life of the Lakota. Is it important to learn how other people live? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Worth Knowing", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think it is important to learn how other people live.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie go to the Great Plains and learn about the life of the Lakota.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that going somewhere new can teach you about people you have never met.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say you should learn about your own home first, but Jack and Annie did both.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe learning about other lives is worth the journey.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and his sister Annie off to the Great Plains, where they learn about the life of the Lakota Indians, and then take a side on whether it matters to learn how other people live.",
      ko: "마법의 나무 집이 잭과 여동생 애니를 대평원으로 보내고, 두 아이가 거기서 라코타 사람들의 삶에 대해 배우는 흐름을 말하고, 다른 사람들이 어떻게 사는지 아는 일이 중요한가에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // 라코타 사람들의 삶에 대해 선생님이 먼저 설명하지 않는다. 우리가 확인하지 않은 것이다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Close your eyes. A flat land, so wide you cannot see the end of it. No buildings. What do you see?",
        do: "책을 펴기 전에 한다. 대평원을 아이 입에서 먼저 꺼내야 Great Plains 가 읽힌다. 서너 명만.",
        exp: "Grass. / Wind. / Sky everywhere. / Animals far away.",
        stuck: "선생님이 먼저 한 문장 한다. \"I see grass moving in the wind.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Buffalo Before Breakfast.\" What is a buffalo? And what time of day is before breakfast?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다. 버펄로가 무엇을 하는지는 우리도 모른다.",
        exp: "A big animal like a cow. / Early morning.",
        stuck: "표지를 가리킨다. \"Look at the cover. What animal is that?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "평원 → plain / 아침 식사 → breakfast / 운동화 → sneakers",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does it take them...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "The magic tree house takes them to the Great Plains.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack finished tying his sneakers.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / He is about to go outside. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and his sister Annie — Wanted·But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Who is Annie to Jack?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Learning)", min: "",
        say: "Stop at Learning. Don't just tell me they learned something — tell me what it MEANS to learn how someone lives.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 라코타에 대해 선생님이 설명하지 않는다. 아이가 책에서 가져오게 둔다.",
        exp: "It means knowing what they eat, where they sleep, what matters to them.",
        stuck: "\"If someone visited your house for one day, what would they learn about your life?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is it important to learn how people far away from you live? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie learned about people they had never met.",
        stuck: "손을 들게 한다. \"Important? Or not important?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say you should learn about your own home first, but Jack and Annie did both.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about the Great Plains of North America?", ko: "북아메리카 대평원에 대해 이미 아는 게 있니?" },
        { en: "Have you ever learned about a Native American people in school?", ko: "학교에서 아메리카 원주민에 대해 배워 본 적 있니?" },
        { en: "The title says \"Buffalo Before Breakfast.\" What do you expect to happen early in the morning?", ko: "제목이 '아침 먹기 전의 버펄로'야. 이른 아침에 무슨 일이 일어날 것 같니?" }
      ],
      during: [
        { en: "What do you think Jack writes in his notebook about this place?", ko: "잭은 이곳에 대해 공책에 무엇을 적을 것 같니?" },
        { en: "Jack and Annie are learning about a way of life very different from theirs. How would you behave as a visitor?", ko: "잭과 애니는 자기들과 아주 다른 삶의 방식을 배우고 있어. 너라면 손님으로서 어떻게 행동할까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Write one thing you learned about the Lakota way of life from the book.", ko: "책에서 알게 된 라코타 사람들의 삶에 대해 한 가지만 적어 줘." },
        { en: "What did the buffalo have to do with the story? Our summary never said.", ko: "버펄로는 이야기와 무슨 상관이었니? 우리 자료는 말해 주지 않았어." }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'Learning' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 이야기가 없으면 근거가 아니다." },
      { sheet: "수업 전체",      point: "라코타 사람들의 삶에 대해 선생님이 먼저 설명하지 않는다. 우리가 확인한 것은 '두 아이가 그것을 배운다' 까지다.", miss: "어디서 들은 이야기를 사실처럼 보탠다. 아이가 책에서 가져온 것만 칠판에 적는다." }
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
  // 근거가 결말도, 버펄로가 하는 일도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 대평원으로 가서 라코타 사람들의 삶을 배우는 이야기",
    text: "The book begins quietly. Jack finished [[fastening|tying]] his [[running shoes|sneakers]]. Then the [[wonder-working|magic]] tree house [[swept|whisked]] Jack and his sister Annie off to the Great [[flatlands|Plains]]. There the two children [[came to know|learned]] about the [[way of living|life]] of the Lakota Indians. The title of the book is \"Buffalo Before Breakfast.\" What happens before breakfast? Open the book and find out."
  }
};
