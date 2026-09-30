// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.2)
// Dingoes at Dinnertime (Magic Tree House #20) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3264.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·동물·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 호주(Australia)로 데려간다 /
//   둘은 산불(wildfire)에서 동물들을 구하는 임무를 맡는다 /
//   책의 첫 문장은 "Annie sat on the porch steps." /
//   주제어 목록: Animals · Zoology · Droughts · Fires · Magic · Space and time ·
//   Brothers and sisters · Fantasy / 장소 목록: Australia / 80쪽 · 2000년
// 어떤 동물인지, 딩고가 이야기에서 무엇을 하는지, 두 아이가 동물들을 구했는지,
// 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 두었다.
// 호주가 배경이지만 근거가 말하지 않는 호주의 동물·사람·지명은 한 곳에도 쓰지 않았다.
// 낱말 뜻풀이(dingo 등)는 제목에 나오는 낱말의 사전적 뜻일 뿐, 줄거리가 아니다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3264",
  slug: "magic-tree-house-dingoes-at-dinnertime",
  title: "Dingoes at Dinnertime",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #20",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.2", lexile: "570L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/7092577-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·장소 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3264 요약 + 오픈라이브러리 /works/OL81772W (소개글 · 첫 문장 \"Annie sat on the porch steps.\" · 주제어 Animals/Zoology/Droughts/Fires/Magic/Space and time/Brothers and sisters/Fantasy · 장소 Australia · 80쪽 · 2000년)",
    characters: ["Jack", "Annie"],
    beats: [
      "the book opens with Annie sitting on the porch steps",
      "the magic tree house takes Jack and Annie away to Australia",
      "there they are on a mission to save some animals from a wildfire"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"on a mission to save some animals from wildfire\" 에서 멈추고, 소개글은 \"where they must save some animals from a wildfire\" 에서 끊긴다. 어떤 동물인지, 두 아이가 그 동물들을 구했는지, 딩고가 이야기에서 무엇을 하는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"takes Jack and Annie away to Australia\", \"on a mission to save some animals from wildfire\", \"Book #20\")과 소개글(\"whisks Jack and Annie away to Australia\", \"they must save some animals from a wildfire\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 주제어 Animals/Zoology/Droughts/Fires 와 장소 Australia 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 제목의 dingoes 는 제목에만 나올 뿐, 딩고가 이야기에서 무엇을 하는지는 어느 출처도 말하지 않아 '딩고가 나온다'는 것 이상을 쓰지 않았다. 주제어에 Brothers and sisters 가 있으나 누가 손위인지·둘이 남매인지를 소개글이 말하지 않아 '오빠·여동생' 같은 말은 어디에도 쓰지 않았다. 호주가 배경이지만 근거가 말하지 않는 호주의 동물·부족·지명은 한 곳에도 넣지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Dingoes at Dinnertime\" read aloud",
    searchUrl: "https://youtu.be/CZJYnXmzSa8",
    videos: [
      { url: "https://youtu.be/CZJYnXmzSa8", title: "Magic Tree House | #20 Dingoes at Dinnertime | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "9,014", length: "39:07" },
      { url: "https://youtu.be/3u9P3KVR1Fk", title: "Magic Tree House: Dingoes at Dinnertime, Ch 1",
        channel: "Rita Gazewood", views: "210", length: "4:53" },
      { url: "https://youtu.be/vGoB_qRFGBE", title: "Magic Tree House: Dingoes at Dinnertime, Ch 4",
        channel: "Rita Gazewood", views: "160", length: "3:51" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어·장소 목록에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "dingo",      pos: "n.",   en: "a wild dog that lives in Australia", ko: "딩고(호주의 들개)",
      ex: "The title of this book names {{dingoes}}.", ex_ko: "이 책의 제목에는 딩고가 나와요.", pic: "🐕" },
    { word: "dinnertime", pos: "n.",   en: "the time of day when people sit down to eat dinner", ko: "저녁 식사 시간",
      ex: "The book is called \"Dingoes at {{Dinnertime}}.\"", ex_ko: "이 책의 제목은 '저녁 식사 시간의 딩고들'이에요.", pic: "🍽️" },
    { word: "Australia",  pos: "n.",   en: "a large country in the southern part of the world", ko: "호주",
      ex: "The tree house takes them away to {{Australia}}.", ex_ko: "나무 집은 그들을 호주로 데려가요.", pic: "🗺️" },
    { word: "wildfire",   pos: "n.",   en: "a large fire that spreads fast across dry land", ko: "산불, 들불",
      ex: "They must save some animals from a {{wildfire}}.", ex_ko: "그들은 산불에서 동물들을 구해야 해요.", pic: "🔥" },
    { word: "drought",    pos: "n.",   en: "a long time with no rain, so the land becomes very dry", ko: "가뭄",
      ex: "\"{{Droughts}}\" is one of the subjects of this book.", ex_ko: "'가뭄'은 이 책의 주제어 가운데 하나예요.", pic: "☀️" },
    { word: "mission",    pos: "n.",   en: "an important job that someone is sent to do", ko: "임무",
      ex: "Jack and Annie are on a {{mission}} in Australia.", ex_ko: "잭과 애니는 호주에서 임무를 맡고 있어요.", pic: "🎯" },
    { word: "save",       pos: "v.",   en: "to take someone or something out of danger", ko: "구하다",
      ex: "They try to {{save}} some animals.", ex_ko: "그들은 동물들을 구하려고 해요.", pic: "🆘" },
    { word: "whisk",      pos: "v.",   en: "to take someone somewhere very quickly", ko: "휙 데려가다",
      ex: "The magic tree house {{whisks}} them away.", ex_ko: "마법의 나무 집이 그들을 휙 데려가요.", pic: "💨" },
    { word: "magic",      pos: "n.",   en: "a special power that makes impossible things happen", ko: "마법",
      ex: "The tree house is full of {{magic}}.", ex_ko: "그 나무 집에는 마법이 가득해요.", pic: "✨" },
    { word: "porch",      pos: "n.",   en: "a covered floor built onto the front of a house", ko: "현관, 앞마루",
      ex: "At the start of the book, Annie sat on the {{porch}} steps.", ex_ko: "책이 시작할 때 애니는 현관 계단에 앉아 있었어요.", pic: "🏠" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // sat 만은 책의 첫 문장("Annie sat on the porch steps.")에서 온 말이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie are on [[a]] mission, and [[an]] animal needs their help.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. a mission, an animal.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} dingo and {{an}} old tree." },
      { name: "Past Simple", ko: "과거형 (규칙 -ed · 불규칙)",
        sent: "Annie [[sat]] on the porch steps, and then the tree house [[whisked]] them away.",
        why_ko: "끝난 일은 과거형! 대부분은 -ed 를 붙여요(whisk → whisked). 그런데 sit 은 불규칙이라 sitted 가 아니라 sat 이에요.",
        why: "Most verbs add -ed for the past (whisk → whisked), but some are irregular: sit → sat.",
        try: "Yesterday I {{walked}} home and {{sat}} on the steps." },
      { name: "must + 동사원형", ko: "조동사 must",
        sent: "In Australia, Jack and Annie [[must save]] some animals from a wildfire.",
        why_ko: "must 는 '꼭 ~해야 한다'예요. 뒤에는 언제나 동사원형만! must saves(X), must to save(X), must save(O).",
        why: "After \"must\", the verb never changes and never takes \"to\": must save, must go.",
        try: "We {{must help}} the animals, and we {{must hurry}}." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Australia is (a / an) country far away.", a: "a",
          why_ko: "country 는 '컨'으로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie are on (a / an) important mission.", a: "an",
          why_ko: "important 는 '임'으로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "Annie (sit / sat) on the porch steps.", a: "sat",
          why_ko: "책의 첫 문장이 sat 이에요. sit 은 불규칙 동사라 과거형이 sat!" },
        { q: "The magic tree house (whisk / whisked) them away to Australia.", a: "whisked",
          why_ko: "이미 일어난 일이에요. whisk 에 -ed 를 붙여 whisked!" },
        { q: "They (must save / must saves) some animals.", a: "must save",
          why_ko: "must 뒤에는 무조건 동사원형! saves 가 아니라 save 예요." }
      ],
      fix: [
        { q: "The magic tree house [[take]] Jack and Annie away to Australia.", a: "took",
          why_ko: "지난 일이에요. take 는 불규칙 동사라 과거형이 taked 가 아니라 took!" },
        { q: "Annie [[sitted]] on the porch steps.", a: "sat",
          why_ko: "sit 에는 -ed 를 붙이지 않아요. 과거형은 sat 이에요." },
        { q: "They [[must to save]] some animals from a wildfire.", a: "must save",
          why_ko: "must 뒤에는 to 를 쓰지 않아요. 바로 동사원형 save 가 와요." }
      ],
      write: [
        { ko: "애니는 현관 계단에 앉았다.", cond: "sit, 과거형", a: "Annie sat on the porch steps.",
          why_ko: "sit 의 과거형은 sat 이에요. 이 문장이 바로 책의 첫 문장이에요." },
        { ko: "그들은 산불에서 동물들을 구해야 한다.", cond: "must, save", a: "They must save some animals from a wildfire.",
          why_ko: "'~해야 한다'는 must + 동사원형이에요. must save 로 쓰고 to 는 넣지 않아요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what takes them away?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them away." },
    { ref: "책 전체", skill: "사실찾기", q: "Which country does the magic tree house take Jack and Annie to?",
      frame: "It takes them to {{Australia}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What is Jack and Annie's mission there, and what is the danger?",
      frame: "Their mission is to save {{some animals}}, and the danger is {{a wildfire}}." },
    { ref: "첫 문장", skill: "사실찾기", q: "The book begins, \"Annie sat on the porch steps.\" Where is Annie at the very start?",
      frame: "At the start, Annie is {{on the porch steps}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Dingoes at Dinnertime.\" What two things does the title put together?",
      frame: "It puts {{dingoes}} together with {{dinnertime}}." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "A wildfire is coming and animals are in danger. Would you go closer to help them? Say why.",
      frame: "I {{would / would not}} go closer, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a ranger", "Two dingoes"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"takes Jack and Annie away to Australia\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel in this story?",
      a: ["A magic tree house", "A plane", "A boat", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 비행기도 배도 기계도 아니에요. 주제어 목록에도 Magic 과 Space and time 이 있어요.",
      why: "The magic tree house. \"Magic\" and \"Space and time\" are both listed subjects." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["Australia", "Egypt", "Japan", "The wild west"], c: 0,
      why_ko: "호주(Australia)예요. 요약과 소개글이 모두 Australia 라고 적고, 장소 목록에도 Australia 하나뿐이에요.",
      why: "Australia — both the summary and the description say so, and it is the only listed place." },
    { q: "What is Jack and Annie's mission in this book?",
      a: ["To save some animals", "To find gold", "To build a house", "To win a race"], c: 0,
      why_ko: "동물들을 구하는 일이에요. 요약이 \"on a mission to save some animals\" 라고 말해요.",
      why: "To save some animals — \"on a mission to save some animals.\"" },
    { q: "What are the animals in danger from?",
      a: ["A wildfire", "A flood", "A storm", "A hunter"], c: 0,
      why_ko: "산불(wildfire)이에요. 요약과 소개글이 둘 다 wildfire 라고 적고 있어요. 주제어에도 Fires 가 있어요.",
      why: "A wildfire. Both sources say \"wildfire,\" and \"Fires\" is a listed subject." },
    { q: "Which animal is named in the title of this book?",
      a: ["Dingoes", "Tigers", "Penguins", "Horses"], c: 0,
      why_ko: "딩고(dingoes)예요. 제목이 \"Dingoes at Dinnertime\" 이에요. 나머지 셋은 근거 어디에도 없어요.",
      why: "Dingoes — the title is \"Dingoes at Dinnertime.\" The other three appear nowhere in our sources." },
    { q: "What is a dingo?",
      a: ["A wild dog", "A large bird", "A kind of fish", "A tall tree"], c: 0,
      why_ko: "딩고는 호주에 사는 들개예요. 낱말의 뜻이 그렇다는 것이고, 딩고가 이야기에서 무엇을 하는지는 책을 읽어야 알아요.",
      why: "A dingo is a wild dog. That is what the word means — what dingoes DO in the story, only the book tells." },
    { q: "What time of day does the title name?",
      a: ["Dinnertime", "Sunrise", "Midnight", "Lunchtime"], c: 0,
      why_ko: "저녁 식사 시간(dinnertime)이에요. 제목의 뒤쪽 낱말을 그대로 읽으면 돼요.",
      why: "Dinnertime — just read the second half of the title." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#20", "#35"], c: 2,
      why_ko: "20권이에요. 장서 목록 제목이 \"#20. Dingoes at Dinnertime\" 이고 요약 끝에도 Book #20 이라고 적혀 있어요.",
      why: "Book #20 — the catalog title is \"#20. Dingoes at Dinnertime.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Annie sat on the porch steps.\"", "\"Jack couldn't sleep.\"", "\"The fire was close.\"", "\"Jack and Annie ran to the woods.\""], c: 0,
      why_ko: "첫 문장은 \"Annie sat on the porch steps.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. \"Jack couldn't sleep.\" 은 다른 권의 첫 문장이에요.",
      why: "That is the recorded first line. \"Jack couldn't sleep.\" opens a different book in the series." },
    { q: "Which word does the description use for how the tree house moves them?",
      a: ["Whisks", "Drags", "Pushes", "Carries"], c: 0,
      why_ko: "소개글이 고른 낱말이 바로 whisks 예요. \"whisks Jack and Annie away to Australia\" 라고 적혀 있어요.",
      why: "The description's own word: \"whisks Jack and Annie away to Australia.\"" },
    { q: "Which of these is one of the listed subjects of this book?",
      a: ["Droughts", "Pirates", "Dinosaurs", "Knights"], c: 0,
      why_ko: "가뭄(Droughts)이에요. 주제어 목록에 Animals · Zoology · Droughts · Fires 가 나란히 있어요. 가뭄과 산불은 붙어 다니는 말이에요.",
      why: "Droughts. The subject list runs Animals, Zoology, Droughts, Fires — drought and wildfire go together." },
    { q: "In what year was this book first published?",
      a: ["1997", "2000", "2007", "2020"], c: 1,
      why_ko: "2000년이에요. 오픈라이브러리에 2000년, 80쪽으로 적혀 있어요. 2007년은 뉴욕타임스 목록에 오른 날짜이지 출간 연도가 아니에요.",
      why: "2000, as recorded with the 80-page entry. 2007 is a bestseller-list date, not the publication year." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "What their mission is", "Whether they save the animals", "What danger the animals face"], c: 2,
      why_ko: "동물들을 구했는지예요. 우리가 가진 글은 '구해야 한다(must save)' 에서 멈춰요. 구했는지는 책을 읽어야 알 수 있어요.",
      why: "Whether they save the animals. Our sources stop at \"they must save some animals from a wildfire.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(때 · 막는 것 · 결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Australia}}", time: "{{                    }}" },   // 언제의 호주인지는 근거가 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to save some animals from a wildfire}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Porch Steps",
        given: "The book begins with Annie sitting on the porch steps.",
        frame: "At the very start, {{Annie}} sat on the {{porch steps}}." },
      { label: "The Tree House",
        given: "",
        frame: "The magic tree house whisks Jack and Annie away to {{Australia}}." },
      { label: "The Mission",
        given: "",
        frame: "There they must {{save}} some {{animals}} from a {{wildfire}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Dingoes at Dinnertime",
    branches: [
      { label: "Jack & Annie",  ask: "The book opens with Annie sitting on the porch steps. What is she doing right before the adventure starts?",
        deeper: "Why do you think an adventure so often begins on an ordinary, quiet day?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "The description says it \"whisks\" them away. What does that word make you picture?" },
      { label: "Australia",     ask: "The tree house takes them all the way to Australia. What do you already know about Australia?",
        deeper: "What would you want to find out first if you landed in a country you had never seen?" },
      { label: "The Wildfire",  ask: "What do you think a wildfire looks like and sounds like?",
        deeper: "Why is a fire in dry land so much harder to stop than a small fire?" },
      { label: "The Animals",   ask: "Jack and Annie are on a mission to save some animals. What would animals do when a fire comes?",
        deeper: "Who should be the one to help animals in danger — and why?" },
      { label: "Me",            ask: "If the tree house came for you, would you ask it for Australia? Why or why not?",
        deeper: "What would you want to see there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Environment", "Responsibility", "Danger"],
    globalContext: "Globalization and sustainability — 땅이 메마르고 불이 날 때, 그곳에 사는 것들은 어떻게 되는가",
    statement: "When fire changes a land, the animals that live there depend on someone choosing to help.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What is their mission when they get there?",
      "What danger are the animals in?"
    ],
    conceptual: [
      "Why does a long time with no rain make a fire so much more dangerous?",
      "What is the difference between being brave and being careless?"
    ],
    debatable: [
      "Should people put themselves in danger to save animals?",
      "When a wild place is burning, is it our job to step in, or to leave it alone?"
    ],
    learnerProfile: ["Caring", "Risk-taker", "Inquirer"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "동물들을 구해야 한다" 까지만 말한다. 두 아이가 구했는지는 적혀 있지 않으므로,
    // 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie go to Australia on a mission to save some animals from a wildfire. Should people risk danger to save animals? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Worth the Risk", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people should help animals when a fire comes.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie go to Australia to save animals from a wildfire.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they went a long way to help animals that were in danger.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a fire is too dangerous, but Jack and Annie went anyway.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe helping animals in a fire is the right thing.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and Annie away to Australia, where they must save some animals from a wildfire, then take a side on whether people should risk danger to save animals.",
      ko: "마법의 나무 집이 잭과 애니를 호주로 데려가고, 두 아이가 산불에서 동물들을 구해야 하는 임무를 맡는 흐름을 말하고, 동물을 구하려고 위험을 무릅쓰는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Imagine a fire moving across dry land. Who is in the most trouble?",
        do: "책을 펴기 전에 한다. 동물이 아이 입에서 먼저 나와야 임무가 읽힌다. 서너 명만.",
        exp: "The animals. / They cannot run fast enough. / They have nowhere to go.",
        stuck: "선생님이 먼저 한 문장 한다. \"I think the animals are in the most trouble.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Dingoes at Dinnertime.\" What is a dingo? What is dinnertime?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "A dingo is a wild dog. Dinnertime is when you eat dinner.",
        stuck: "표지를 가리킨다. \"Look at the cover. What animal do you see?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "산불 → wildfire / 임무 → mission / 가뭄 → drought",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Which country...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to Australia.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Annie sat on the porch steps.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to save some animals from a wildfire — But·So·Then 은 아이가 책에서 가져온다",
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

      { stage: "Mind Map (The Animals)", min: "",
        say: "Stop at The Animals. Don't just tell me they saved animals — tell me WHO should help, and why.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "The people nearby should help, because the animals cannot call anyone.",
        stuck: "\"You told me what they did. Now — why them and not somebody else?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should people put themselves in danger to save animals? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Jack and Annie went to the fire for the animals.",
        stuck: "손을 들게 한다. \"Go toward the fire? Or stay back?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a fire is too dangerous, but Jack and Annie went anyway.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about Australia?", ko: "호주에 대해 이미 아는 게 있니?" },
        { en: "Have you ever heard about a wildfire on the news? What did you see?", ko: "뉴스에서 산불 이야기를 들어 본 적 있니? 무엇을 보았니?" },
        { en: "The title says dinnertime. Whose dinner do you think it means?", ko: "제목에 저녁 식사 시간이 나와. 누구의 저녁일 것 같니?" }
      ],
      during: [
        { en: "What kind of animals do you think Jack and Annie are trying to save?", ko: "잭과 애니가 구하려는 동물은 어떤 동물일 것 같니?" },
        { en: "Write what you think Jack and Annie do to save the animals.", ko: "잭과 애니가 동물들을 구하려고 무엇을 할지 네 생각을 써 보렴." }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Which animals were they saving, and did they save them?", ko: "어떤 동물들을 구하려던 거였고, 결국 구했니?" },
        { en: "What do the dingoes in the title turn out to be doing?", ko: "제목에 나온 딩고들은 결국 무엇을 하고 있었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Animals' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장 · 주제어)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 호주로 날아가, 산불에서 동물들을 구하는 임무를 맡는 이야기",
    text: "Annie sat on the [[front step|porch]] steps. Then the [[wonder|magic]] tree house [[took|whisked]] Jack and Annie away to [[a country far from home|Australia]]. There they were given a [[job|mission]]: they must [[rescue|save]] some [[creatures|animals]] from a [[huge, fast fire|wildfire]]. The title of the book names [[wild dogs|dingoes]] at [[suppertime|dinnertime]]. Did Jack and Annie save the animals? Open the book and find out."
  }
};
