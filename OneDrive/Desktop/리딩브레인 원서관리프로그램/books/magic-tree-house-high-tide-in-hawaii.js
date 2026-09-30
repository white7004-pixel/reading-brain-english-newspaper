// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.4)
// High Tide in Hawaii (Magic Tree House #28) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/M3089.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 시리즈 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 둘은 시간을 거슬러 하와이의 한 섬으로 보내진다 /
//   거기서 쓰나미(tsunami)를 마주한다 / 시리즈 28권 /
//   장소 주제어는 Hawaii · Südsee · Pazifik / 남매(Brothers and sisters) /
//   책의 첫 문장은 "Jack and Annie were sitting on their porch, reading books."
// 쓰나미를 마주한 뒤 무슨 일이 있었는지, 섬에서 누구를 만나는지, 어떻게 끝나는지는
// 어느 출처도 말하지 않는다. 장서 요약은 "encounter a tsunami" 에서 그대로 끊긴다.
// 그래서 비워 두었다.
// 하와이의 말·풍습·섬 이름은 근거에 한 글자도 없다. 그래서 한 글자도 쓰지 않았다.
// 쓰나미는 근거에 있지만, 피해를 그리는 말은 수업 대사 어디에도 넣지 않았다.
// 대비와 안전 쪽으로만 다룬다 — 장서 목록의 발문("What would you do to stay safe...")이
// 가리키는 방향이 그쪽이다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3089",
  slug: "magic-tree-house-high-tide-in-hawaii",
  title: "High Tide in Hawaii",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #28",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.4", lexile: "570L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/233646-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 첫 문장·주제어 목록·장소 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 M3089 요약 + 오픈라이브러리 /works/OL81784W (첫 문장 \"Jack and Annie were sitting on their porch, reading books.\" · 주제어 Tree houses/Brothers and sisters/Hawaii/Magic/Time travel · 장소 Hawaii·Südsee·Pazifik · 73쪽 · 2003년 · 독자가 쓴 시리즈 소개글)",
    characters: ["Jack", "Annie"],
    beats: [
      "Jack and Annie are sent back in time to a Hawaiian Island",
      "on that island they encounter a tsunami",
      "the book opens with the two of them sitting on their porch, reading books"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"where they encounter a tsunami\" 에서 그대로 멈춘다. 큰 물결이 어떻게 되었는지, 두 아이가 무엇을 했는지, 섬에서 누구를 만나는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"sent back in time\", \"a Hawaiian Island\", \"encounter a tsunami\", \"Book #28\")과 오픈라이브러리의 첫 문장·주제어·장소 목록을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 주제어 Tree houses/Magic/Time travel 이 '마법 나무집으로 시간을 거슬러 간다'를 받쳐 주고, 장소 Hawaii·Südsee·Pazifik 이 요약의 하와이를 받쳐 준다. 주제어 Brothers and sisters 로 두 아이가 남매라는 것까지만 썼다 — 누가 손위인지는 이 책 근거가 말하지 않아 쓰지 않았다. 오픈라이브러리의 소개글 칸에 든 글은 출판사가 쓴 것이 아니라 독자가 올린 시리즈 전체 안내글이고, 글 끝에 스스로 \"this is from a 9 year old so watch out\" 이라고 적혀 있으며 철자도 여러 군데 틀린다. 믿을 수 있는 출처가 아니라고 보아 그 글에서는 한 줄도 가져오지 않았다(프로그크리크 · 모건 르 페이 · 그림을 가리키는 법 · 두 아이의 나이 — 전부 쓰지 않았다). 그래서 이 책의 근거는 장서 한 줄 요약과 오픈라이브러리의 첫 문장 · 주제어 · 장소 목록뿐이다. 하와이의 말·풍습·섬 이름, 그리고 쓰나미가 무엇을 무너뜨렸는지는 어느 출처에도 없어 학습지 어디에도 쓰지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 세 편 모두 제목을 하나하나 확인했고, 셋 다 이 책(#28 High Tide in Hawaii)이다. 다른 권은 섞이지 않았다.
  // 세 번째는 1~3장까지만 읽은 짧은 영상(15:25)이라, 통본 두 편을 앞에 두고 맨 뒤로 보냈다.
  shadowing: {
    query: "\"High Tide in Hawaii\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/CtcRtw0_Zxc",
    videos: [
      { url: "https://youtu.be/CtcRtw0_Zxc", title: "Magic Tree House | #28 High Tide in Hawaii | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "1,159", length: "44:45" },
      { url: "https://youtu.be/icbQiVmhLi4", title: "magic tree house #28 High Tide in Hawwaii | by Mary Pope Osborne",
        channel: "reading time", views: "2,431", length: "46:58" },
      { url: "https://youtu.be/fsg7gnb9uis", title: "Chapters 1-3 High Tide in Hawaii Magic Treehouse #28 by Mary Pope Osborne",
        channel: "Tiffany Betterton", views: "1,514", length: "15:25" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·첫 문장·주제어·장소 목록·장서 목록 발문에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "tide",      pos: "n.",   en: "the rise and fall of the sea, which happens twice a day", ko: "조수, 밀물과 썰물",
      ex: "The title of this book is \"High {{Tide}} in Hawaii.\"", ex_ko: "이 책의 제목은 '하와이의 만조'예요.", pic: "🌊" },
    { word: "island",    pos: "n.",   en: "a piece of land with water all around it", ko: "섬",
      ex: "Jack and Annie are sent to a Hawaiian {{island}}.", ex_ko: "잭과 애니는 하와이의 한 섬으로 보내져요.", pic: "🏝️" },
    { word: "tsunami",   pos: "n.",   en: "a very large sea wave that can reach the shore after the sea floor moves", ko: "쓰나미, 지진해일",
      ex: "On the island they encounter a {{tsunami}}.", ex_ko: "그 섬에서 그들은 쓰나미를 마주해요.", pic: "🌊" },
    { word: "encounter", pos: "v.",   en: "to meet something, often without planning to", ko: "마주치다, 맞닥뜨리다",
      ex: "They {{encounter}} something they did not expect.", ex_ko: "그들은 생각지도 못한 것을 마주칩니다.", pic: "😯" },
    { word: "adventure", pos: "n.",   en: "an exciting trip where new and surprising things happen", ko: "모험",
      ex: "Jack and Annie have many exciting {{adventures}}.", ex_ko: "잭과 애니는 신나는 모험을 많이 해요.", pic: "🎒" },
    { word: "magic",     pos: "n.",   en: "a special power that makes impossible things happen", ko: "마법",
      ex: "The tree house is {{magic}}, so it can travel in time.", ex_ko: "나무 집은 마법이어서 시간을 거슬러 갈 수 있어요.", pic: "✨" },
    { word: "porch",     pos: "n.",   en: "a covered floor built onto the front of a house", ko: "현관, 앞마루",
      ex: "The book begins with the two of them on the {{porch}}.", ex_ko: "책은 두 아이가 현관에 있는 장면으로 시작해요.", pic: "🏠" },
    { word: "read",      pos: "v.",   en: "to look at words and understand what they say", ko: "읽다",
      ex: "Jack and Annie were sitting on their porch, {{reading}} books.", ex_ko: "잭과 애니는 앞마루에 앉아 책을 읽고 있었어요.", pic: "📖" },
    { word: "sit",       pos: "v.",   en: "to rest with your weight on your bottom, not standing", ko: "앉다",
      ex: "Jack and Annie were {{sitting}} on their porch.", ex_ko: "잭과 애니는 앞마루에 앉아 있었어요.", pic: "🪑" },
    { word: "safe",      pos: "adj.", en: "not in danger; away from harm", ko: "안전한",
      ex: "What would you do to stay {{safe}} near the sea?", ex_ko: "바다 가까이에서 안전하게 있으려면 어떻게 할까요?", pic: "🦺" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // were sitting 만은 책의 첫 문장("Jack and Annie were sitting on their porch, reading books.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure on [[a]] Hawaiian island.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a Hawaiian island.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I read {{a}} book about {{an}} island." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] back in time and [[wanted]] to be safe.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, want → wanted.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to the beach and {{watched}} the waves." },
      { name: "was / were + -ing", ko: "과거진행형",
        sent: "The book begins, \"Jack and Annie [[were sitting]] on their porch, reading books.\"",
        why_ko: "'그때 ~하고 있었다'는 was/were + 동사-ing 예요. 주어가 둘이면 were! Jack and Annie → were sitting.",
        why: "Use was/were + verb-ing for what was going on at that moment. Two people take \"were.\"",
        try: "I {{was reading}} a book while my friends {{were playing}} outside." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie go to (a / an) island in Hawaii.", a: "an",
          why_ko: "island 는 '아'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "They meet (a / an) tsunami there.", a: "a",
          why_ko: "tsunami 는 '쓰'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "The magic tree house (travel / traveled) back in time.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "Jack and Annie (want / wanted) to stay safe.", a: "wanted",
          why_ko: "지난 일이에요. want 에 -ed 를 붙여 wanted!" },
        { q: "Jack and Annie (was / were) sitting on their porch.", a: "were",
          why_ko: "Jack and Annie 는 두 사람, 복수예요. 복수 주어의 과거 be동사는 were." }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] back in time to a Hawaiian island.", a: "traveled",
          why_ko: "시간을 거슬러 이미 다녀온 일이에요. 과거형 traveled 로 고쳐요." },
        { q: "They [[meet]] a tsunami on the island.", a: "met",
          why_ko: "meet 은 불규칙 동사예요. 과거형은 meeted 가 아니라 met!" },
        { q: "Jack and Annie [[was]] reading books on the porch.", a: "were",
          why_ko: "주어가 둘이니 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "잭과 애니는 현관에 앉아 책을 읽고 있었다.", cond: "were, sit, read", a: "Jack and Annie were sitting on their porch, reading books.",
          why_ko: "'앉아 있었다'는 were + sitting 이에요. sit 은 t 를 하나 더 붙여 sitting." },
        { ko: "그들은 하와이의 한 섬으로 보내졌다.", cond: "were sent, island", a: "They were sent to a Hawaiian island.",
          why_ko: "'보내졌다'는 were + sent 예요. send 의 과거분사는 sent 입니다." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and where are they sent?",
      frame: "They are {{Jack and Annie}}, and they are sent to {{a Hawaiian island}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What do Jack and Annie encounter on the island?",
      frame: "They encounter {{a tsunami}}." },
    { ref: "첫 문장", skill: "사실찾기", q: "At the very start of the book, where are Jack and Annie, and what are they doing?",
      frame: "They are on {{their porch}}, and they are {{reading books}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"High Tide in Hawaii.\" What does \"tide\" mean, and why does a book about the sea use that word?",
      frame: "Tide means {{the rise and fall of the sea}}. I think the title uses it because {{                    }}." },
    { ref: "장서 요약", skill: "주제·요점", q: "Our summary says Jack and Annie are sent back in time and encounter a tsunami. In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book starts on a quiet porch with two children reading. What do you think happens right after that?",
      frame: "I think {{                    }} happens next." },
    { ref: "내 생각", skill: "평가·적용", q: "If you were near the sea and heard a warning about a big wave, what would you do first? Say why.",
      frame: "First I would {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and a surfer", "Annie and a sailor", "Two fishermen"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie are sent back in time\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "Where are Jack and Annie sent in this book?",
      a: ["To a Hawaiian island", "To the wild west", "To ancient Egypt", "To the moon"], c: 0,
      why_ko: "하와이의 한 섬이에요. 요약이 \"to a Hawaiian Island\" 라고 적고, 장소 주제어에도 Hawaii 가 있어요.",
      why: "A Hawaiian island — the summary says so, and \"Hawaii\" is a listed place." },
    { q: "What natural event do Jack and Annie encounter there?",
      a: ["A tsunami", "A snowstorm", "A sandstorm", "A forest fire"], c: 0,
      why_ko: "쓰나미예요. 요약이 \"they encounter a tsunami\" 라고 말해요.",
      why: "A tsunami. The summary says \"they encounter a tsunami.\"" },
    { q: "How do Jack and Annie travel to this place?",
      a: ["A magic tree house", "A ship", "An airplane", "A magic carpet"], c: 0,
      why_ko: "마법의 나무 집이에요. 주제어 목록에 Tree houses · Magic · Time travel 이 나란히 있어요.",
      why: "The magic tree house. \"Tree houses,\" \"Magic\" and \"Time travel\" are all listed subjects." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack and Annie were sitting on their porch, reading books.\"", "\"Jack couldn't sleep.\"", "\"The sea was very quiet that morning.\"", "\"Annie ran down to the beach.\""], c: 0,
      why_ko: "첫 문장은 \"Jack and Annie were sitting on their porch, reading books.\" 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line, exactly as Open Library has it." },
    { q: "In the first sentence, what are Jack and Annie doing?",
      a: ["Reading books", "Swimming", "Running", "Sleeping"], c: 0,
      why_ko: "책을 읽고 있어요. 첫 문장이 \"reading books\" 라고 끝나요.",
      why: "Reading books — the first sentence ends with \"reading books.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#28", "#40"], c: 2,
      why_ko: "28권이에요. 장서 목록 제목이 \"#28. High Tide in Hawaii\" 이고 요약 끝에도 Book #28 이라고 적혀 있어요.",
      why: "Book #28 — the catalog title is \"#28. High Tide in Hawaii.\"" },
    { q: "What does the word \"tide\" in the title mean?",
      a: ["The rise and fall of the sea", "A kind of boat", "A hot wind", "A mountain path"], c: 0,
      why_ko: "tide 는 바닷물이 차고 빠지는 일, 곧 조수예요. 제목 High Tide 는 물이 가장 많이 찬 때, 만조를 뜻해요.",
      why: "Tide is the rise and fall of the sea. \"High tide\" is when the water is highest." },
    { q: "The place tags for this book name Hawaii and which ocean?",
      a: ["The Pacific", "The Atlantic", "The Arctic", "The Indian Ocean"], c: 0,
      why_ko: "태평양이에요. 오픈라이브러리 장소 목록이 Hawaii · Südsee(남태평양) · Pazifik(태평양) 을 적고 있어요.",
      why: "The Pacific. The listed places are Hawaii, Südsee (South Seas) and Pazifik (Pacific)." },
    { q: "What are Jack and Annie to each other?",
      a: ["Brother and sister", "Cousins", "Classmates", "Neighbors"], c: 0,
      why_ko: "남매예요. 주제어 목록에 Brothers and sisters 가 있어요. 누가 손위인지는 이 책 근거가 말해 주지 않아요.",
      why: "Brother and sister — \"Brothers and sisters\" is a listed subject for this book." },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Sal Murdocca", "Jack", "Annie"], c: 0,
      why_ko: "메리 팝 오스본(Mary Pope Osborne)이에요. 장서 목록과 도서관 기록이 둘 다 그 이름을 적어요.",
      why: "Mary Pope Osborne — both the catalog and the library record give that name." },
    { q: "Which of these is a listed subject word for this book?",
      a: ["Time travel", "Baseball", "Dinosaurs", "Cooking"], c: 0,
      why_ko: "Time travel 이에요. 도서관 주제어 목록에 Tree houses · Magic · Time travel 이 나란히 있어요. 나머지 셋은 그 목록에 없어요.",
      why: "Time travel — it is in the listed subjects. The other three are not." },
    { q: "In the first sentence, where were Jack and Annie sitting?",
      a: ["On their porch", "In the tree house", "On the beach", "In a boat"], c: 0,
      why_ko: "현관 앞 마루(porch)에요. 첫 문장이 \"Jack and Annie were sitting on their porch, reading books.\" 라고 해요.",
      why: "On their porch — the first sentence says so." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie are sent", "What natural event they encounter", "What Jack and Annie do after they encounter the tsunami", "Which book number this is"], c: 2,
      why_ko: "쓰나미를 마주한 뒤의 이야기예요. 우리가 가진 요약은 \"encounter a tsunami\" 에서 그대로 멈춰요. 그 다음은 책을 읽어야 알 수 있어요.",
      why: "What happens after. Our summary stops at \"they encounter a tsunami.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(때 · 바라는 것 · 결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{a Hawaiian island}}", time: "{{                    }}" },   // 몇 년인지는 근거가 말하지 않는다. "back in time" 까지만 적혀 있다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바랐는지는 근거가 말하지 않는다
      { k: "But",      v: "{{they encounter a tsunami}}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Porch",
        given: "The book's first sentence tells us where the story starts.",
        frame: "Jack and Annie were sitting on {{their porch}}, {{reading books}}." },
      { label: "The Tree House",
        given: "",
        frame: "They are sent {{back in time}}, to {{a Hawaiian island}}." },
      { label: "The Big Wave",
        given: "",
        frame: "On the island they encounter {{a tsunami}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "High Tide in Hawaii",
    branches: [
      { label: "Jack & Annie",   ask: "The book opens with Jack and Annie reading on their porch. What are they doing right before the adventure starts?",
        deeper: "Why do you think an adventure so often begins on an ordinary, quiet day?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "If a tree house could take you anywhere, why might it pick a place you did not ask for?" },
      { label: "The Island",     ask: "What do you imagine an island in the Pacific looks like?",
        deeper: "How might living with the sea all around you change the way you live each day?" },
      { label: "High Tide",      ask: "The title says \"high tide.\" What do you know about the way the sea rises and falls?",
        deeper: "Why would people who live by the sea need to know the tide well?" },
      { label: "A Warning",      ask: "A tsunami is a very big sea wave. What kinds of warnings do people use today?",
        deeper: "Why is it better to know about something like this before it ever happens?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for an island? Why or why not?",
        deeper: "What would you want to learn there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Nature", "Safety", "Courage"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅은 지금 우리와 어떻게 다른가",
    statement: "Nature can change in a moment, and people who know it well are the ones who are ready.",
    factual: [
      "Where and when are Jack and Annie sent?",
      "What do they encounter on the island?",
      "Where are Jack and Annie, and what are they doing, in the first sentence?"
    ],
    conceptual: [
      "Why do people who live by the sea watch the tide so closely?",
      "What is the difference between being scared of nature and being ready for it?"
    ],
    debatable: [
      "When nature gives a warning, should people leave right away or wait and see?",
      "Is it braver to go toward something frightening, or to get everyone away from it?"
    ],
    learnerProfile: ["Inquirer", "Caring", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "쓰나미를 마주한다" 까지만 말한다. 두 아이가 무엇을 했는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie go to a Hawaiian island and encounter a tsunami. When nature gives a warning, should people leave right away or wait and see? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "leave 또는 wait 을 분명히 고를 것 · Choose leave or wait clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Go Now, Look Later", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people should leave right away when nature warns them.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie encounter a tsunami on a Hawaiian island.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the sea can change fast, even on a quiet island day.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a warning may be wrong, but leaving costs only time.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe it is better to move early than to wait.", lines: 2 }
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
      en: "Students retell how Jack and Annie are sent back in time to a Hawaiian island where they encounter a tsunami, name what the first sentence shows about the start of the book, and then take a side on what people should do when nature gives a warning.",
      ko: "잭과 애니가 시간을 거슬러 하와이의 한 섬으로 보내져 쓰나미를 마주하는 흐름을 말하고, 첫 문장이 책의 시작에 대해 무엇을 알려 주는지 짚고, 자연이 경고를 보낼 때 사람은 어떻게 해야 하는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // 쓰나미는 '큰 물결'과 '미리 알고 대비하는 일'로만 다룬다. 피해를 그리는 말은 하지 않는다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of a place with water all around it. What do you call it? What would you see there?",
        do: "책을 펴기 전에 한다. '섬'을 아이 입에서 먼저 꺼내야 제목이 읽힌다. 서너 명만.",
        exp: "An island. / Sand and water. / Boats.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would see water all around me.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"High Tide in Hawaii.\" What is a tide? When is it high?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "The sea goes up and down. High tide is when the water is highest.",
        stuck: "손바닥을 천천히 올렸다 내린다. \"The sea does this, twice every day.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "섬 → island / 조수 → tide / 마주치다 → encounter",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where are they sent...' becomes 'They are sent to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They are sent to a Hawaiian island.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack and Annie were sitting on their porch, reading books.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / But: they encounter a tsunami — Wanted·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What do they run into?\" 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (A Warning)", min: "",
        say: "Stop at A Warning. Don't just tell me a wave is big — tell me why knowing FIRST matters.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 무서운 장면을 그리지 않고, 미리 아는 일로 끌고 간다.",
        exp: "If you know early, you have time to walk to higher ground with everyone.",
        stuck: "\"What does a fire drill at school give you? Time. Time to do what?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "When nature gives a warning, leave right away or wait and see? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think leave, because you can always come back later.",
        stuck: "교실 한쪽은 leave, 다른 쪽은 wait. 서 보게 한다." },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a warning may be wrong, but leaving costs only time.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about islands in the Pacific?", ko: "태평양의 섬에 대해 이미 아는 게 있니?" },
        { en: "Have you ever watched the sea come in and go back out?", ko: "바닷물이 밀려왔다가 다시 빠지는 걸 본 적 있니?" },
        { en: "The title says high tide. What do you expect to read about?", ko: "제목이 만조라고 해. 어떤 이야기일 것 같니?" }
      ],
      during: [
        { en: "The tree house sent them to an island. What do you think they took with them?", ko: "나무 집이 둘을 섬으로 보냈어. 무엇을 챙겨 갔을 것 같니?" },
        { en: "How do you think people on the island knew the big wave was coming?", ko: "섬 사람들은 큰 물결이 온다는 걸 어떻게 알았을 것 같니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What did Jack and Annie do after they encountered the tsunami?", ko: "쓰나미를 마주한 뒤 잭과 애니는 무엇을 했니?" },
        { en: "Who did Jack and Annie meet on the island, and what did they learn there?", ko: "섬에서 잭과 애니는 누구를 만났고, 거기서 무엇을 배웠니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'A Warning' 가지에서 반드시 멈춘다. 무서운 장면 말고 '미리 아는 일'로 끌고 간다.", miss: "→ 칸에 피해 이야기를 쓴다. 대비 쪽으로 돌려 준다." },
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
  // 근거(장서 요약 · 첫 문장 · 주제어 · 장소 목록)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 쓰나미를 마주한 뒤를 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 시간을 거슬러 하와이의 한 섬으로 가서 큰 물결을 마주하는 이야기",
    text: "Jack and Annie were sitting on their [[front step|porch]], reading books. Then the [[wonder|magic]] tree house sent them back in time to a [[Hawaiian island|Hawaii]], far out in the [[Pacific|Pazifik]]. There the [[two children|brother and sister]] came face-to-face with a [[huge sea wave|tsunami]]. Our summary stops right there. What did Jack and Annie do next? Open the book and find out."
  }
};
