// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Good Morning, Gorillas (Magic Tree House #26) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3269.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 (소개글이 둘을 the siblings, 곧 남매라고 부른다) /
//   마법의 나무 집이 둘을 아프리카의 열대우림(an African rainforest)으로 데려간다 /
//   둘은 그곳에서 고릴라 무리(a group of gorillas)를 만난다 /
//   그리고 고릴라들과 뜻을 주고받는 법(learn to communicate with them)을 배운다 /
//   책의 첫 문장은 "One summer day in Frog Creek, Pennsylvania, a mysterious tree house
//   appeared in the woods."
// 어떻게 뜻을 주고받았는지도, 결말도 근거가 말하지 않는다. 장서 요약도 소개글도
// "learn to communicate with them" 에서 그대로 끊긴다. 그래서 비워 두었다.
// 10권과 달리 이 책의 근거에는 모건(Morgan)도, 수수께끼도, 임무도 한 번도 나오지 않는다.
// 그래서 쓰지 않았다. 고릴라의 생태(먹이 · 무리 생활 · 사는 나라)도 근거 밖이라 쓰지 않았다.
// 두 아이의 나이도, 누가 손위인지도 근거가 말하지 않아 쓰지 않았다.
// 고릴라를 몇 마리 만나는지도 근거는 "a group" 이상을 말하지 않는다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3269",
  slug: "magic-tree-house-good-morning-gorillas",
  title: "Good Morning, Gorillas",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #26",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)·19권(AR 3.1)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "510L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/233644-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3269 요약 + 오픈라이브러리 /works/OL15131144W (소개글 · 첫 문장 \"One summer day in Frog Creek, Pennsylvania, a mysterious tree house appeared in the woods.\" · 주제어 Magic/Gorilla/Tree houses/Human-animal communication/Time travel/Space and time/Juvenile fiction · 71쪽)",
    characters: ["Jack", "Annie", "a group of gorillas"],
    beats: [
      "the magic tree house takes Jack and Annie to an African rainforest",
      "there the siblings encounter a group of gorillas",
      "they learn to communicate with the gorillas"
    ],
    ending: "근거에 결말이 없다. 장서 요약도 출판사 소개글도 \"learn to communicate with them\" 에서 똑같이 멈춘다. 두 아이가 고릴라와 어떻게 뜻을 주고받았는지, 무슨 말을 주고받았는지, 왜 그 숲으로 갔는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"travel to an African rainforest in their magic tree house\", \"encounter a group of gorillas and learn to communicate with them\", \"Book #26\")과 소개글(\"takes Jack and Annie to an African rainforest\", \"the siblings encounter gorillas and learn to communicate with them\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(두 아이가 the siblings, 곧 남매라는 것)은 요약과 부딪히지 않아 남겼다. 요약에만 있는 것(고릴라가 a group, 곧 한 마리가 아니라 무리라는 것)도 남겼다. 주제어 Gorilla/Human-animal communication/Tree houses/Time travel/Space and time 이 같은 것을 가리켜 한 번 더 받쳐 주었다. 첫 문장에 나오는 Frog Creek, Pennsylvania 와 the woods 는 오픈라이브러리에 적힌 그대로만 썼다. 오픈라이브러리가 사람(people)과 장소(places) 칸을 비워 두어 고릴라 무리 말고는 이름이 하나도 없다. 그래서 하나도 쓰지 않았다. 오픈라이브러리의 다른 한 판(/works/OL39187445W)은 소개글도 첫 문장도 비어 있어 쓸 것이 없었다. 출간 연도는 두 판이 1991년과 2002년으로 어긋나 학습지에 쓰지 않았다 (2026-09-30)"
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 영상 세 편의 제목을 하나하나 확인해 모두 이 책(#26 Good Morning, Gorillas)인 것만 남겼다.
  // 다른 권의 낭독이 섞여 든 것은 없었다.
  // 두 번째·세 번째는 앞부분만·뒷부분만 읽은 영상이라(1~5장 / 6~10장), 책 한 권을 통으로 읽는
  // 첫 번째 영상을 맨 앞에 두었다. 둘을 이어 보면 처음부터 끝까지가 된다.
  // S3269.json 의 videos 에는 또 하나(jSsAHn_mrGQ)가 있으나 같은 1~5장 낭독이고
  // 채널·길이·조회수를 확인하지 못해 넣지 않았다.
  shadowing: {
    query: "\"Good Morning, Gorillas\" read aloud",
    searchUrl: "https://youtu.be/gcmAfU2mC1s",
    videos: [
      { url: "https://youtu.be/gcmAfU2mC1s", title: "Magic Tree House | #26 Good Morning, Gorillas | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "7,541", length: "45:36" },
      { url: "https://youtu.be/-B5juVEHY6g", title: "Magic Tree House: #26 Good Morning, Gorillas - Chapter 1-5",
        channel: "Quynh Giang English", views: "13,663", length: "19:52" },
      { url: "https://youtu.be/Yr2Zj9nLzF8", title: "Magic Tree House: #26 Good Morning, Gorillas - Chapter 6-10",
        channel: "Quynh Giang English", views: "6,469", length: "18:53" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "gorilla",     pos: "n.",   en: "the largest kind of ape, with black hair and long arms", ko: "고릴라",
      ex: "Jack and Annie meet a group of {{gorillas}}.", ex_ko: "잭과 애니는 고릴라 무리를 만나요.", pic: "🦍" },
    { word: "rainforest",  pos: "n.",   en: "a thick forest in a warm place where a lot of rain falls", ko: "열대우림",
      ex: "The tree house takes them to an African {{rainforest}}.", ex_ko: "나무 집은 둘을 아프리카 열대우림으로 데려가요.", pic: "🌴" },
    { word: "African",     pos: "adj.", en: "belonging to Africa, one of the seven continents", ko: "아프리카의",
      ex: "They travel to an {{African}} rainforest.", ex_ko: "그들은 아프리카의 열대우림으로 가요.", pic: "🌍" },
    { word: "communicate", pos: "v.",   en: "to let someone else know what you mean or feel", ko: "뜻을 주고받다, 의사소통하다",
      ex: "They learn to {{communicate}} with the gorillas.", ex_ko: "그들은 고릴라와 뜻을 주고받는 법을 배워요.", pic: "💬" },
    { word: "encounter",   pos: "v.",   en: "to meet someone or something, often without planning it", ko: "마주치다",
      ex: "The siblings {{encounter}} gorillas in the forest.", ex_ko: "남매는 숲에서 고릴라와 마주쳐요.", pic: "👀" },
    { word: "group",       pos: "n.",   en: "a number of people or animals that are together", ko: "무리, 떼",
      ex: "They find a {{group}} of gorillas, not just one.", ex_ko: "한 마리가 아니라 고릴라 무리를 만나요.", pic: "👨‍👩‍👧‍👦" },
    { word: "sibling",     pos: "n.",   en: "a brother or a sister in your family", ko: "형제자매, 남매",
      ex: "Jack and Annie are {{siblings}}.", ex_ko: "잭과 애니는 남매예요.", pic: "👫" },
    { word: "mysterious",  pos: "adj.", en: "strange, and hard to explain or understand", ko: "신비한, 알 수 없는",
      ex: "A {{mysterious}} tree house appeared in the woods.", ex_ko: "신비한 나무 집이 숲에 나타났어요.", pic: "✨" },
    { word: "appear",      pos: "v.",   en: "to come into sight, so that people can suddenly see it", ko: "나타나다",
      ex: "The tree house {{appeared}} one summer day.", ex_ko: "나무 집은 어느 여름날 나타났어요.", pic: "🌳" },
    { word: "woods",       pos: "n.",   en: "an area with many trees growing close together", ko: "숲",
      ex: "The tree house stood in the {{woods}} near Frog Creek.", ex_ko: "나무 집은 프로그크리크 근처 숲에 있었어요.", pic: "🌲" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // appeared 만은 책의 첫 문장("...a mysterious tree house appeared in the woods.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie meet [[a]] group of gorillas in [[an]] African rainforest.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. a group, an African rainforest.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} gorilla and {{an}} old tree." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"One summer day ... a mysterious tree house [[appeared]] in the woods.\"",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. appear → appeared, travel → traveled.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} into the woods and {{opened}} my book." },
      { name: "3인칭 단수 -s", ko: "현재형 -s",
        sent: "The magic tree house [[takes]] Jack and Annie to an African rainforest, and they [[travel]] far from home.",
        why_ko: "현재형에서 주어가 하나(he/she/it)면 동사에 -s 를 붙여요. The tree house → takes. 주어가 둘 이상(they)이면 그냥 travel!",
        why: "In the present, add -s when the subject is one thing (he/she/it). Use the plain verb for they.",
        try: "She {{reads}} every night, but her friends {{read}} in the morning." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie meet (a / an) group of gorillas.", a: "a",
          why_ko: "group 은 '그'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "The tree house takes them to (a / an) African rainforest.", a: "an",
          why_ko: "African 은 '애'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "A mysterious tree house (appear / appeared) in the woods.", a: "appeared",
          why_ko: "책의 첫 문장이 이미 일어난 일을 말해요. 과거형 appeared 예요." },
        { q: "The magic tree house (take / takes) Jack and Annie to a rainforest.", a: "takes",
          why_ko: "주어 The magic tree house 는 하나예요. 현재형에서는 -s 를 붙여 takes!" },
        { q: "Jack and Annie (learn / learns) to communicate with the gorillas.", a: "learn",
          why_ko: "주어가 두 사람이에요. 복수 주어에는 -s 를 붙이지 않아요." }
      ],
      fix: [
        { q: "One summer day a mysterious tree house [[appear]] in the woods.", a: "appeared",
          why_ko: "책의 첫 문장은 지난 일이에요. -ed 를 붙여 appeared 로 고쳐요." },
        { q: "The magic tree house [[take]] Jack and Annie to an African rainforest.", a: "takes",
          why_ko: "주어가 나무 집 하나예요. 현재형 3인칭 단수라서 takes." },
        { q: "The siblings encounter [[a]] African rainforest full of trees.", a: "an",
          why_ko: "African 은 모음 소리로 시작해요. a 가 아니라 an 이에요." }
      ],
      write: [
        { ko: "신비한 나무 집이 숲에 나타났다.", cond: "appear, 과거형", a: "A mysterious tree house appeared in the woods.",
          why_ko: "'나타났다'는 지난 일이니 appear 에 -ed 를 붙여 appeared 예요." },
        { ko: "그들은 고릴라와 뜻을 주고받는 법을 배운다.", cond: "learn, communicate", a: "They learn to communicate with the gorillas.",
          why_ko: "learn 뒤에는 to + 동사원형이 와요. learn to communicate." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and how do they travel?",
      frame: "They are {{Jack and Annie}}, and they travel in {{their magic tree house}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Where does the magic tree house take Jack and Annie?",
      frame: "It takes them to {{an African rainforest}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What animals do they meet there, and what do they learn to do with them?",
      frame: "They meet {{a group of gorillas}}, and they learn to {{communicate}} with them." },
    { ref: "첫 문장", skill: "어휘", q: "The first sentence calls the tree house \"mysterious.\" What does that word tell you about it?",
      frame: "It tells me the tree house is {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "추론·예측", q: "Gorillas do not speak English. How do you think two children could communicate with them?",
      frame: "I think they could {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If a group of wild gorillas walked up to you, would you stay or leave? Say why.",
      frame: "I {{would stay / would leave}}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a gorilla", "Two zookeepers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie travel to an African rainforest\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel in this story?",
      a: ["In their magic tree house", "By airplane", "On a boat", "In a jeep"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"in their magic tree house\" 라고 적고, 주제어에도 Tree houses 와 Time travel 이 있어요.",
      why: "The magic tree house — \"Tree houses\" and \"Time travel\" are both listed subjects." },
    { q: "Where does the magic tree house take them?",
      a: ["To an African rainforest", "To the wild west", "To the moon", "To a castle"], c: 0,
      why_ko: "아프리카의 열대우림이에요. 소개글이 \"takes Jack and Annie to an African rainforest\" 라고 말해요.",
      why: "An African rainforest, exactly as the description says." },
    { q: "What animals do Jack and Annie meet there?",
      a: ["Gorillas", "Tigers", "Dolphins", "Polar bears"], c: 0,
      why_ko: "고릴라예요. 제목도 Good Morning, Gorillas 이고 주제어에도 Gorilla 가 있어요. 호랑이는 19권, 돌고래는 9권 이야기예요.",
      why: "Gorillas — the title and the subject list both say so." },
    { q: "How many gorillas do they meet?",
      a: ["A group of them", "Exactly one", "Exactly two", "None at all"], c: 0,
      why_ko: "무리(a group)예요. 요약이 \"a group of gorillas\" 라고 적었어요. 몇 마리인지는 적혀 있지 않아요.",
      why: "A group. The summary says \"a group of gorillas\" without giving a number." },
    { q: "What do Jack and Annie learn to do with the gorillas?",
      a: ["Communicate with them", "Ride on them", "Feed them fruit", "Take them home"], c: 0,
      why_ko: "뜻을 주고받는 법(communicate)을 배워요. 요약과 소개글이 똑같이 \"learn to communicate with them\" 이라고 말해요.",
      why: "Communicate. Both sources say \"learn to communicate with them.\"" },
    { q: "How are Jack and Annie related to each other?",
      a: ["They are siblings", "They are cousins", "They are neighbors", "They are classmates"], c: 0,
      why_ko: "남매예요. 소개글이 둘을 \"the siblings\" 라고 부릅니다.",
      why: "Siblings — the description calls them \"the siblings.\"" },
    { q: "Which of these is a listed subject for this book?",
      a: ["Human-animal communication", "Deep sea diving", "Baking and cooking", "Space rockets"], c: 0,
      why_ko: "Human-animal communication 이에요. 오픈라이브러리 주제어 목록에 그대로 적혀 있어요. 나머지 셋은 어디에도 없어요.",
      why: "Human-animal communication is on the subject list; the other three are not." },
    { q: "What is the first sentence of this book?",
      a: ["\"One summer day in Frog Creek, Pennsylvania, a mysterious tree house appeared in the woods.\"", "\"Jack and Annie were sitting on the porch of their house.\"", "\"The rainforest was very quiet.\"", "\"Annie ran toward the gorillas.\""], c: 0,
      why_ko: "첫 문장은 \"One summer day in Frog Creek, Pennsylvania, a mysterious tree house appeared in the woods.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. 두 번째 보기는 10권의 첫 문장이에요.",
      why: "That is the recorded first line. The second choice opens book #10, not this one." },
    { q: "In the first sentence, which word describes the tree house?",
      a: ["Mysterious", "Broken", "Golden", "Tiny"], c: 0,
      why_ko: "mysterious 예요. 첫 문장이 고른 낱말이 바로 그것이고, 나머지 셋은 근거 어디에도 없어요.",
      why: "\"Mysterious\" is the first sentence's own word; the others appear nowhere." },
    { q: "Where did the tree house appear, according to the first sentence?",
      a: ["In the woods in Frog Creek, Pennsylvania", "In an African rainforest", "In a school playground", "On a mountain top"], c: 0,
      why_ko: "프로그크리크(펜실베이니아)의 숲이에요. 아프리카 열대우림은 나무 집이 나타난 곳이 아니라 두 아이가 가는 곳이에요.",
      why: "The woods in Frog Creek, Pennsylvania. The African rainforest is where they go, not where the tree house appeared." },
    { q: "What does the word \"rainforest\" mean?",
      a: ["A thick forest in a warm place with a lot of rain", "A desert with no trees", "A field of tall grass", "A frozen sea"], c: 0,
      why_ko: "비가 많이 내리는 따뜻한 곳의 우거진 숲이에요. 그래서 rain(비) + forest(숲) 라고 불러요.",
      why: "A thick forest in a warm, rainy place — that is why it is called a rain + forest." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#19", "#26", "#33"], c: 2,
      why_ko: "26권이에요. 장서 목록 제목이 \"#26. Good Morning, Gorillas\" 이고 요약 끝에도 Book #26 이라고 적혀 있어요.",
      why: "Book #26 — the catalog title is \"#26. Good Morning, Gorillas.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where the tree house takes them", "What animals they meet", "How they communicate with the gorillas", "Who the two children are"], c: 2,
      why_ko: "고릴라와 '어떻게' 뜻을 주고받았는지예요. 우리가 가진 글은 \"learn to communicate with them\" 에서 멈춰요. 그 방법은 책을 읽어야 알 수 있어요.",
      why: "How they communicate. Our sources stop at \"learn to communicate with them.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(두 아이가 무엇을 바랐는지 · 무엇이 막았는지 · 결말)은 채우지 않았다.
  summaryMap: {
    // 언제 일어난 일인지 근거가 말하지 않는다. 첫 문장의 "one summer day" 는 나무 집이 프로그크리크에
    // 나타난 날이지, 두 아이가 숲으로 가는 날이 아니다. 그래서 비워 둔다.
    setting: { place: "{{an African rainforest}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 왜 그 숲으로 갔는지 근거가 말하지 않는다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "One summer day in Frog Creek, Pennsylvania, a mysterious tree house appeared in the woods.",
        frame: "The magic tree house takes {{Jack and Annie}} to {{an African rainforest}}." },
      { label: "The Rainforest",
        given: "",
        frame: "There the siblings encounter {{a group of gorillas}}." },
      { label: "Talking Without Words",
        given: "",
        frame: "Jack and Annie learn to {{communicate}} with the gorillas." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Good Morning, Gorillas",
    branches: [
      { label: "Jack & Annie",    ask: "The description calls Jack and Annie \"the siblings.\" What does that word tell you about them?",
        deeper: "Why do you think a brother and a sister make good travelling partners in a scary place?" },
      { label: "The Tree House",  ask: "The tree house appeared one summer day in the woods. What does \"appeared\" tell you about how it got there?",
        deeper: "Why do you think the story calls it \"mysterious\" instead of just \"a tree house\"?" },
      { label: "The Rainforest",  ask: "What do you picture when you hear \"an African rainforest\"?",
        deeper: "How would a place with that much rain and that many trees change the way you move and listen?" },
      { label: "The Gorillas",    ask: "Jack and Annie meet a group of gorillas, not just one. How does that change the moment?",
        deeper: "Is meeting a group of animals more frightening, or less? Say why." },
      { label: "Communicating",   ask: "The book says they learn to communicate with the gorillas. How could you tell someone something without words?",
        deeper: "If you had to say \"I am your friend\" with no words at all, what would you do?" },
      { label: "Me",              ask: "If the tree house came for you, would you ask it for a rainforest? Why or why not?",
        deeper: "What would you want to understand there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Communication",
    relatedConcepts: ["Connection", "Understanding", "Respect"],
    globalContext: "Personal and cultural expression — 말이 통하지 않을 때 우리는 어떻게 뜻을 전하는가",
    statement: "When words do not work, people look for other ways to be understood.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What animals do the siblings encounter there?",
      "What do Jack and Annie learn to do with the gorillas?"
    ],
    conceptual: [
      "What is communication, if it is not words?",
      "Why is it harder to understand someone who cannot use your language?"
    ],
    debatable: [
      "Can a person and a wild animal really understand each other?",
      "Should people go into a rainforest to meet wild animals, or leave them alone?"
    ],
    learnerProfile: ["Communicator", "Open-minded", "Inquirer"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "뜻을 주고받는 법을 배운다" 까지만 말한다. 어떻게 배웠는지는 적혀 있지 않으므로,
    // 그 방법이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie learn to communicate with a group of gorillas. Can a person and a wild animal really understand each other? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Talking Without Words", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people and animals can understand each other a little.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie learn to communicate with a group of gorillas.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that two children and wild animals found a way to share meaning.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say animals cannot understand us, but the siblings still got through.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe understanding does not always need words.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to an African rainforest, where the siblings encounter a group of gorillas and learn to communicate with them, then take a side on whether a person and a wild animal can really understand each other.",
      ko: "마법의 나무 집이 잭과 애니를 아프리카 열대우림으로 데려가고, 남매가 그곳에서 고릴라 무리를 만나 뜻을 주고받는 법을 배우는 흐름을 말하고, 사람과 야생 동물이 서로를 정말 이해할 수 있는지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Say good morning to me — but you may not use your voice. Go.",
        do: "책을 펴기 전에 한다. 말 없이 뜻을 전하는 일을 아이 몸으로 먼저 겪게 해야 제목이 읽힌다. 30초.",
        exp: "(손을 흔든다 / 고개를 숙인다 / 웃는다)",
        stuck: "선생님이 먼저 손을 흔들어 보인다. \"Did you understand me? How?\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Good Morning, Gorillas.\" Who is saying good morning, and to whom?",
        do: "제목만 푼다. 줄거리는 말하지 않는다.",
        exp: "Someone is greeting gorillas.",
        stuck: "표지를 가리킨다. \"Look at the cover. Who is there?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "고릴라 → gorilla / 열대우림 → rainforest / 뜻을 주고받다 → communicate",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does the tree house take them?' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to an African rainforest.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The summary says \"a group of gorillas.\" Not one gorilla. Why does that one word change everything?",
        do: "group 한 낱말에서 멈춘다. 근거가 말하는 것과 말하지 않는 것의 차이를 여기서 가르친다.",
        exp: "There are many of them. It could feel scarier. We do not know how many.",
        stuck: "\"How many is a group? Does the book tell us?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie — Wanted·But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty today. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Communicating)", min: "",
        say: "Stop at Communicating. Don't just tell me they talked — tell me HOW you say something with no words.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "With my hands. With my face. By moving slowly so nobody is scared.",
        stuck: "\"Show me 'I am your friend' right now. No voice.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Can a person and a wild animal really understand each other? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie learned to communicate with the gorillas.",
        stuck: "손을 들게 한다. \"Yes? Or no?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say animals cannot understand us, but the siblings still got through.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      // before 의 두 번째 · during 의 첫 번째는 학원 장서 목록 S3269 에 적혀 있던 물음 그대로다.
      before: [
        { en: "What do you already know about gorillas?", ko: "고릴라에 대해 이미 아는 게 있니?" },
        { en: "Have you ever watched gorillas at a zoo?", ko: "동물원에서 고릴라를 본 적 있니?" },
        { en: "The title says \"Good Morning.\" How do you greet someone who does not speak your language?", ko: "제목이 '좋은 아침'이라고 해. 말이 안 통하는 사람에게는 어떻게 인사할까?" }
      ],
      during: [
        { en: "What animals do Jack and Annie learn to communicate with?", ko: "잭과 애니는 어떤 동물과 뜻을 주고받는 법을 배우니?" },
        { en: "The summary says \"a group\" of gorillas. How many do you think that is?", ko: "요약은 고릴라 '무리'라고만 해. 몇 마리쯤일 것 같니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "How exactly do Jack and Annie communicate with the gorillas?", ko: "잭과 애니는 정확히 어떤 방법으로 고릴라와 뜻을 주고받았니?" },
        { en: "Write what you think Jack and Annie say to the gorillas.", ko: "잭과 애니가 고릴라에게 무슨 말을 할지 네가 써 봐." }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'Communicating' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 뜻을 주고받은 방법도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 아프리카 열대우림으로 가 고릴라 무리를 만나는 이야기",
    text: "One summer day in Frog Creek, Pennsylvania, a [[strange|mysterious]] tree house [[showed up|appeared]] in the woods. The magic tree house took Jack and Annie to an African [[jungle|rainforest]]. There the [[brother and sister|siblings]] came face-to-face with a [[family|group]] of [[great apes|gorillas]]. Little by little, the two children learned to [[share their meaning|communicate]] with them. How did they do it? What did they say? Open the book and find out."
  }
};
