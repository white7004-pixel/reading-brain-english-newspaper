// 리딩브레인 원서 프로그램 — 첫걸음 (파닉스 1단계 · 단모음 a)
// Sam and the Cat · Story Phonics Level 1-1 (Langsoc, 2026) · 글 E. J. Lewis · 그림 Kate Daubney
// 원장이 받아 온 표지·내지 PDF 와 출판사 쪽(Jay Shim) 영상 두 개로 만들었다.
// 목표음 -ad / -am / -an / -at. 70낱말. 유치~초1.
// AR 은 출판사가 매기지 않았다. 비슷한 파닉스 리더 기준으로 0.3 으로 두어 첫걸음(Lv.0)에 넣는다 — 추정값이다.
window.BOOK = {
  bookNo: "",                       // 학원 장서 목록에 없는 책이라 서재와 잇지 않는다
  slug: "sam-and-the-cat",
  title: "Sam and the Cat",
  author: "E. J. Lewis · 그림 Kate Daubney",
  series: "Story Phonics Level 1-1 · Storybook & Workbook",
  publisher: "Langsoc",
  level: { ar: "0.3", lexile: "", rb: "파닉스 1단계 · 단모음 a (-ad -am -an -at)" },
  awards: [],
  defSource: "",
  cover: "assets/covers/sam-and-the-cat.jpg",

  shadowing: {
    query: "\"Sam and the Cat\" Story Phonics",
    searchUrl: "https://youtu.be/EOW9Re0hvb4",
    qr: "",
    // 출판사 쪽 공식 영상 (Jay Shim 채널). 먼저 이북으로 듣고, 챈트로 리듬을 탄다.
    videos: [
      { url: "https://youtu.be/EOW9Re0hvb4", title: "📺 이북 — 듣고 따라 읽기", channel: "Jay Shim", views: "", length: "" },
      { url: "https://youtu.be/ZrTK9i9J01E", title: "🎵 챈트 — 리듬 타며 읽기", channel: "Jay Shim", views: "", length: "" }
    ],
    // E북: 원장이 받아 온 내지 PDF 를 쪽 그림으로 만들었다 (scripts/make-ebook.py). 0쪽은 표지.
    ebook: { dir: "assets/ebook/sam-and-the-cat/", pages: 24 },
    // 쪽별 낭독 mp3 는 타입캐스트 크레딧이 채워지면 scripts/make-read-audio.mjs 로 만든다. 그때 src 를 붙이면 쪽마다 소리가 난다.
    // 지금은 소리 없이 책장만 넘긴다. 소리는 위의 이북 영상이 맡는다.
    audio: [
      { title: "📖 책 넘겨 보기", pages: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] }
    ]
  },

  // ── ⓪ 파닉스 — 이 책이 가르치려는 것 ───────────────────
  // 세 활동(말묶음 보기 · 첫소리 바꾸기 · 듣고 고르기)이 전부 이 families 하나에서 나온다.
  phonics: {
    target: "단모음 a — -ad, -am, -an, -at",
    target_ko: "가운데 소리 a(애)가 같은 낱말들. 끝소리가 같은 것끼리 묶어 읽으면 처음 보는 낱말도 읽을 수 있어요.",
    families: [
      { rime: "-ad", words: ["mad", "sad"] },
      { rime: "-am", words: ["ham", "jam"] },
      { rime: "-an", words: ["van"] },
      { rime: "-at", words: ["bat", "cat", "fat", "hat", "mat"] }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 유치~초1. 뜻은 그 나이 말로 직접 쓴다. 예문은 책 문장 그대로 — 이 책은 문장이 곧 낱말 연습이다.
  // 뒤의 다섯 개는 사이트워드(a, and, is, on, the): 파닉스로 안 읽히니 통째로 익힌다.
  vocabulary: [
    { word: "mad", pos: "adj.", en: "very angry", ko: "화난", ex: "Sam is {{mad}}.", ex_ko: "샘은 화가 났어요.", pic: "😠" },
    { word: "sad", pos: "adj.", en: "not happy; you may want to cry", ko: "슬픈", ex: "Pam is {{sad}}.", ex_ko: "팸은 슬퍼요.", pic: "😢" },
    { word: "ham", pos: "n.", en: "meat from a pig that you eat", ko: "햄", ex: "Ted and {{ham}}.", ex_ko: "테드와 햄.", pic: "🍖" },
    { word: "jam", pos: "n.", en: "sweet fruit spread you put on bread", ko: "잼", ex: "Sid and {{jam}}.", ex_ko: "시드와 잼.", pic: "🍯" },
    { word: "van", pos: "n.", en: "a big car with a box shape for carrying things", ko: "밴, 승합차", ex: "A {{van}}!", ex_ko: "밴이다!", pic: "🚐" },
    { word: "bat", pos: "n.", en: "a stick you use to hit a ball", ko: "방망이", ex: "Sam and a {{bat}}.", ex_ko: "샘과 방망이.", pic: "🏏" },
    { word: "cat", pos: "n.", en: "a small furry pet that says meow", ko: "고양이", ex: "A {{cat}} on the van.", ex_ko: "밴 위에 고양이 한 마리.", pic: "🐱" },
    { word: "fat", pos: "adj.", en: "big and round", ko: "뚱뚱한", ex: "The cat is {{fat}}.", ex_ko: "그 고양이는 뚱뚱해요.", pic: "🐷" },
    { word: "hat", pos: "n.", en: "you wear it on your head", ko: "모자", ex: "Pam and a {{hat}}.", ex_ko: "팸과 모자.", pic: "🎩" },
    { word: "mat", pos: "n.", en: "a flat thing you sit on, on the ground", ko: "매트, 돗자리", ex: "Sam and a {{mat}}.", ex_ko: "샘과 돗자리.", pic: "🧺" },
    { word: "a",   pos: "sight", en: "one (we say it before a thing)", ko: "하나의 (사이트워드)", ex: "Sam and {{a}} mat.", ex_ko: "샘과 돗자리 하나." },
    { word: "and", pos: "sight", en: "joins two things together", ko: "그리고, ~와 (사이트워드)", ex: "Ted {{and}} ham.", ex_ko: "테드와 햄." },
    { word: "is",  pos: "sight", en: "tells what someone is like", ko: "~이다 (사이트워드)", ex: "The cat {{is}} fat.", ex_ko: "그 고양이는 뚱뚱해요." },
    { word: "on",  pos: "sight", en: "on top of something", ko: "~위에 (사이트워드)", ex: "The jam {{on}} the mat.", ex_ko: "돗자리 위의 잼." },
    { word: "the", pos: "sight", en: "we say it before a thing we already know", ko: "그 (사이트워드)", ex: "{{The}} cat is fat.", ex_ko: "그 고양이는 뚱뚱해요." }
  ],

  // ── ①-2 문법 — 이 나이엔 '규칙'이 아니라 '문장 모양'이다 ──
  grammar: {
    points: [
      { name: "and", ko: "이어 주는 말",
        sent: "Sam [[and]] a mat.",
        why_ko: "and 는 둘을 이어 줘요. 샘 + 돗자리 → Sam and a mat. 그림책의 거의 모든 쪽이 '누구 and 무엇' 이에요.",
        why: "\"and\" joins two things: Sam and a mat.",
        try: "Ted {{and}} ham." },
      { name: "on", ko: "위에",
        sent: "The jam [[on]] the mat.",
        why_ko: "on 은 '위에' 예요. 잼이 돗자리 위에 있으면 The jam on the mat. 고양이가 밴 위에 있으면 A cat on the van.",
        why: "\"on\" means on top of: the jam on the mat.",
        try: "A cat {{on}} the van." },
      { name: "is", ko: "어떤지 말하기",
        sent: "The cat [[is]] fat.",
        why_ko: "'누구는 어떻다' 는 is 로 말해요. The cat is fat. Sam is mad. Pam is sad. 가운데 is 를 잊지 마세요.",
        why: "\"is\" tells what someone is like: The cat is fat.",
        try: "Sam {{is}} mad." }
    ],
    find: "책에서 on 이 들어간 문장을 두 개 찾아 읽어 보세요. · Find two sentences with \"on\".",
    exam: {
      choose: [
        { q: "Sam (and / on) a bat.", a: "and", why_ko: "샘과 방망이, 둘을 이어 주니까 and 예요." },
        { q: "A cat (is / on) the van.", a: "on", why_ko: "고양이가 밴 '위에' 있어요. 위에는 on!" },
        { q: "Pam (is / and) sad.", a: "is", why_ko: "팸이 어떤지(슬픈지) 말하니까 is 예요." }
      ],
      fix: [
        { q: "The cat [[on]] fat.", a: "is", why_ko: "고양이가 어떤지 말할 땐 is 예요. The cat is fat." },
        { q: "The ham [[and]] the mat.", a: "on", why_ko: "햄이 돗자리 위에 있으니 on 이에요. The ham on the mat." }
      ],
      write: [
        { ko: "샘은 화가 났다.", cond: "Sam, mad", a: "Sam is mad.", why_ko: "'누구는 어떻다' 는 가운데 is 를 넣어요. Sam is mad." },
        { ko: "돗자리 위의 잼.", cond: "jam, on, mat", a: "The jam on the mat.", why_ko: "위에 있으니 on. The jam on the mat." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "p.4–7", skill: "사실찾기",  q: "What does Pam have?",
      frame: "Pam has {{a hat}}." },
    { ref: "p.8–11", skill: "사실찾기", q: "Where is the cat?",
      frame: "The cat is {{on the van}}." },
    { ref: "p.12–13", skill: "사실찾기", q: "What is on the mat?",
      frame: "{{The jam and ham}} are on the mat." },
    { ref: "p.14–15", skill: "추론·예측", q: "Why is Sam mad?",
      frame: "Sam is mad because {{the fat cat came to the jam and ham}}." },
    { ref: "전체", skill: "평가·적용", q: "Is the cat bad? Say what you think.",
      frame: "I think the cat is {{bad / not bad}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 ──────────────────────────────────
  // 첫걸음이다. 문장 서너 낱말, 보기는 책 낱말로만.
  quiz: [
    { q: "Who has a hat?",
      a: ["Sam", "Pam", "Ted", "Sid"], c: 1,
      why_ko: "5쪽을 보세요. Pam and a hat. 모자는 팸 거예요.",
      why: "Page 5: Pam and a hat. The hat is Pam's." },
    { q: "Who has ham?",
      a: ["Ted", "Sam", "The cat", "Pam"], c: 0,
      why_ko: "6쪽 Ted and ham. 햄은 테드가 가져왔어요.",
      why: "Page 6: Ted and ham." },
    { q: "Who has jam?",
      a: ["Pam", "Ted", "Sid", "Sam"], c: 2,
      why_ko: "7쪽 Sid and jam. 아기 동생 시드가 잼을 들고 있어요.",
      why: "Page 7: Sid and jam. Sid is the baby brother." },
    { q: "What comes?",
      a: ["A bus", "A van", "A cat", "A dog"], c: 1,
      why_ko: "8쪽에 딱 두 낱말이 있어요. A van! 밴이 와요.",
      why: "Page 8 has two words: A van!" },
    { q: "Where is the cat?",
      a: ["On the mat", "On the hat", "On the van", "On the bat"], c: 2,
      why_ko: "11쪽 A cat on the van. 고양이가 밴 위에 앉아 있어요.",
      why: "Page 11: A cat on the van." },
    { q: "The cat is ___.",
      a: ["fat", "sad", "mad", "bad"], c: 0,
      why_ko: "The cat is fat. 고양이가 통통해요. 다 -at 로 끝나는 낱말이라 잘 들어야 해요!",
      why: "The cat is fat. Listen carefully — these words all end in -at." },
    { q: "What is on the mat?",
      a: ["The hat and bat", "The jam and ham", "The van", "The cat"], c: 1,
      why_ko: "12쪽 The jam and ham on the mat. 돗자리 위에 잼과 햄이 있어요.",
      why: "Page 12: The jam and ham on the mat." },
    { q: "Who is mad?",
      a: ["Pam", "Ted", "Sid", "Sam"], c: 3,
      why_ko: "14쪽 Sam is mad. 샘이 화났어요.",
      why: "Page 14: Sam is mad." },
    { q: "Who is sad?",
      a: ["Pam", "Sam", "Ted", "The cat"], c: 0,
      why_ko: "15쪽 Pam is sad. 팸이 슬퍼요.",
      why: "Page 15: Pam is sad." },
    { q: "Who is Sam's baby brother?",
      a: ["Ted", "Pam", "Sid", "The cat"], c: 2,
      why_ko: "3쪽 등장인물을 보세요. Sid 가 Sam's baby brother 예요. Ted 는 친구, Pam 은 누나.",
      why: "Page 3: Sid is Sam's baby brother. Ted is his friend, Pam is his sister." }
  ],

  // ── ③ 요약 지도 ─────────────────────────────────────────
  summaryMap: {
    setting: { place: "{{a picnic on a mat}}", time: "{{one day}}" },
    swbst: [
      { k: "Somebody", v: "{{Sam and Pam}}" },
      { k: "Wanted",   v: "{{to eat jam and ham on the mat}}" },
      { k: "But",      v: "{{a fat cat came on a van}}" },
      { k: "So",       v: "{{the cat got the jam and ham}}" },
      { k: "Then",     v: "{{Sam is mad and Pam is sad}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Sam, Pam, Ted, and Sid have a picnic.",
        frame: "They have a mat, a hat, ham, and {{jam}}." },
      { label: "Middle",
        given: "",
        frame: "A van comes. A {{fat cat}} is on the van." },
      { label: "End",
        given: "The cat goes to the jam and ham.",
        frame: "Sam is {{mad}}. Pam is {{sad}}." }
    ]
  },

  // ── ④ 마인드맵 ─────────────────────────────────────────
  mindMap: {
    center: "Sam and the Cat",
    branches: [
      { label: "Sam",     ask: "What does Sam have? What does he feel at the end?",
        deeper: "Why does he feel that way?" },
      { label: "The cat", ask: "Where does the cat come from? What does it want?",
        deeper: "Is the cat bad, or just hungry?" },
      { label: "Me",      ask: "What do you take on a picnic? Draw it.",
        deeper: "What if a cat came to your picnic?" },
      { label: "Sounds",  ask: "Say three words that end with -at.",
        deeper: "Can you make a new -at word?" }
    ]
  },

  // ── ⑤ IB 탐구 (첫걸음 — 질문은 한 줄, 답은 한 낱말이어도 된다) ──
  ib: {
    keyConcept: "Causation",
    relatedConcepts: ["Feelings", "Cause and effect"],
    globalContext: "Identities and relationships — how we feel when something is taken (내 것을 빼앗겼을 때의 마음)",
    statement: "When someone takes our things, we feel mad or sad.",
    factual: [
      "What is on the mat?",
      "Who is on the van?"
    ],
    conceptual: [
      "Why is Sam mad?",
      "Why is Pam sad, not mad?"
    ],
    debatable: [
      "Is the cat bad?",
      "Should Sam share the ham with the cat?"
    ],
    learnerProfile: ["Caring", "Communicator"]
  },

  // ── ⑥ 쓰기 (첫걸음 — 한 문장 그리고 쓰기) ────────────────
  essay: {
    prompt: "The cat got the jam. Is the cat bad? Draw the cat and write one sentence.",
    conditions: [
      "1문장 이상 쓸 것 · Write at least 1 sentence",
      "책 낱말을 하나 쓸 것 (cat, jam, ham, mad, sad …) · Use one word from the book",
      "대문자로 시작하고 마침표로 끝낼 것 · Capital letter and a period"
    ],
    steps: [
      { part: "Title",       ask: "What is your picture about?",
        eg: "The Fat Cat", lines: 1 },
      { part: "My Sentence", ask: "Say one thing about the cat.",
        eg: "The cat is fat.", lines: 2 },
      { part: "One More",    ask: "How does Sam feel? Or how do you feel?",
        eg: "Sam is mad. I am sad.", lines: 2 }
    ],
    expressions: [
      "The cat is ...",
      "Sam is ...",
      "I am ...",
      "I like ..."
    ]
  },

  // ── ⑦ 교사용 ────────────────────────────────────────────
  teaching: {
    goal: {
      en: "Students blend onset and rime to read -ad, -am, -an, -at words, and read the whole story aloud.",
      ko: "첫소리와 끝소리를 붙여 -ad·-am·-an·-at 낱말을 읽고, 이야기 전체를 소리 내어 읽는다."
    },
    // 첫걸음이다. 한 번에 하나만 시키고, 아이가 소리를 '내게' 한다. 선생님이 대신 읽어 주면 파닉스가 아니다.
    script: [
      { stage: "Warm-up", min: "0~3분",
        say: "Look at the cover. What animal is this? Say it in English.",
        do: "표지의 고양이를 가리킨다. cat 한 낱말이면 된다. 그 낱말을 칠판에 크게 쓴다 — 오늘의 첫 -at 낱말이다.",
        exp: "Cat!",
        stuck: "선생님이 먼저 /k/ /a/ /t/ 하고 천천히 붙여 읽는다. 따라 하게 한다." },

      { stage: "Phonics", min: "3~12분",
        say: "Listen. /a/. Say /a/. Now: m-at, mat. c-at, cat. Your turn.",
        do: "화면 파닉스 칸 ① 말묶음 보기. -at 줄부터. 낱말을 누르면 소리가 난다. 한 줄 끝나면 ② 첫소리 바꾸기로 b·c·f·h·m 을 아이가 눌러 읽게 한다.",
        exp: "bat, cat, fat, hat, mat",
        stuck: "끝소리 -at 만 먼저 열 번 말하게 한다. 그다음 첫소리 하나만 붙인다. 두 개를 한꺼번에 시키지 않는다." },

      { stage: "Phonics", min: "",
        say: "Now -ad, -am, -an. Same game.",
        do: "-ad(mad sad), -am(ham jam), -an(van) 순서. van 은 혼자라 -at 낱말 하나와 짝지어 비교한다(van / fan 은 책에 없으니 만들지 않는다).",
        exp: "mad, sad / ham, jam / van",
        stuck: "잘 안 되는 아이는 ③ 듣고 고르기를 시키지 말고 ①로 돌아간다." },

      { stage: "Sight Words", min: "12~15분",
        say: "These five words we just know: a, and, is, on, the. Read them fast.",
        do: "20쪽 사이트워드. 소리 내어 붙이지 않고 통째로 읽는다. 카드처럼 빠르게 다섯 번 돌린다.",
        exp: "a, and, is, on, the",
        stuck: "on 과 and 를 헷갈린다. 손가락으로 첫 글자를 짚어 준다." },

      { stage: "Read", min: "15~25분",
        say: "Open to page 4. Point to each word. Read.",
        do: "쉐도잉 칸의 이북 영상을 한 번 보고, 그다음 E북을 넘기며 아이가 읽는다. 한 쪽에 한 문장이라 한 명씩 한 쪽을 맡긴다.",
        exp: "Sam and a mat. Pam and a hat. …",
        stuck: "막히는 낱말은 끝소리부터: \"-at. Now put /m/ in front.\"" },

      { stage: "Chant", min: "25~30분",
        say: "Let's chant! Clap on every word.",
        do: "16~17쪽 챈트. 챈트 영상을 틀고 손뼉을 치며 따라 한다. 마지막 That's my jam! 은 크게.",
        exp: "Sam and a mat! Pam and a hat! …",
        stuck: "빠르면 영상 없이 선생님이 느리게 선창한다." },

      { stage: "Game", min: "30~38분",
        say: "Board game time. Roll, move, read the word. If you can't read it, go back.",
        do: "22~23쪽 Find the Cat. 주사위와 말은 교실 것. 규칙은 책 23쪽 그대로. 읽어야만 앞으로 간다 — 이게 이 게임의 목적이다.",
        exp: "mat! / jam! / fat!",
        stuck: "못 읽으면 옆 친구가 끝소리만 힌트 준다. 답을 말해 주지 않는다." },

      { stage: "Wrap-up", min: "38~40분",
        say: "Page 24. Find the hidden pictures. Say the word when you find one.",
        do: "숨은그림. 찾은 그림의 낱말을 말하게 한다(hat, bat, cat …). 다 못 찾아도 된다.",
        exp: "A hat! A cat!",
        stuck: "한 개만 찾아도 칭찬하고 끝낸다." }
    ],
    booktalk: {
      before: [
        { en: "What do you take on a picnic?", ko: "소풍 갈 때 뭘 가져가?" },
        { en: "Do you like cats?", ko: "고양이 좋아해?" }
      ],
      during: [
        { en: "Look at the cat. What does it want?", ko: "고양이를 봐. 뭘 원하는 것 같아?" },
        { en: "Sam is mad. Why?", ko: "샘이 화났어. 왜?" }
      ],
      after: [
        { en: "Is the cat bad?", ko: "고양이는 나쁜 걸까?" },
        { en: "What would you do?", ko: "너라면 어떻게 할래?" }
      ]
    },
    notes: [
      { sheet: "Phonics",   point: "아이가 소리를 낸다. 선생님은 첫소리만 준다.", miss: "낱말을 통째로 외워 읽는다. 첫소리를 바꿔 새 낱말을 시켜 확인한다." },
      { sheet: "Word List", point: "파닉스 낱말 10개는 소리로, 사이트워드 5개는 통째로.", miss: "the 를 /t/-/h/ 로 붙이려 한다. 사이트워드는 붙이지 않는다고 말해 준다." },
      { sheet: "Read",      point: "한 쪽에 한 문장. 손가락으로 짚으며 읽는다.", miss: "그림만 보고 말한다. 낱말을 짚게 한다." },
      { sheet: "Quiz",      point: "책을 펴 놓고 푼다. 쪽수를 알려 준다.", miss: "-at 낱말끼리 헷갈린다(fat/sad/mad). 소리를 다시 들려 준다." },
      { sheet: "Writing",   point: "한 문장이면 충분하다. 그림이 먼저다.", miss: "대문자·마침표를 빼먹는다. 예시문을 같이 읽고 시작한다." }
    ],
    scoring: [
      { c: "소리 Phonics", pt: 5, yes: "첫소리를 바꿔 -at 낱말 세 개를 읽었다", no: "낱말을 외워서만 읽는다" },
      { c: "읽기 Read",    pt: 5, yes: "이야기 전체를 소리 내어 읽었다",       no: "그림만 보고 말한다" },
      { c: "문장 Sentence", pt: 5, yes: "책 낱말로 한 문장을 썼다",            no: "낱말만 썼다" },
      { c: "글씨 Writing", pt: 5, yes: "대문자로 시작하고 마침표로 끝났다",   no: "대문자·마침표가 없다" }
    ]
  }
};

// 낭독녹음 — 첫걸음은 바꿔 쓰지 않고 책 문장 그대로 읽는다 (70낱말, 원장이 준 자료)
window.BOOK.readAloud = { scene: "소풍 돗자리에 잼과 햄, 그리고 뚱뚱한 고양이",
  text: "Sam and a mat. Pam and a hat. Ted and ham. Sid and jam. A van! The jam on the mat. The ham on the mat. Sam and a bat. A cat on the van. The cat is fat. The jam and ham on the mat. The jam and ham, and the fat cat. Sam is mad. Pam is sad." };
