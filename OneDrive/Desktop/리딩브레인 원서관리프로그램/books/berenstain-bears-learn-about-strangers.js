// 리딩브레인 원서프로그램 — A갈래(9단계) 책, 근거 확인을 통과한 세 권 중 하나 (AR 3.6)
// 스캔한 쪽도, 확인된 낭독 영상도 없다. 그래서 evidence(제목·저자·등장인물·사건 세 마디·결말)에
// 적힌 것과 책 제목·레벨이 말해 주는 것만으로 만들었다. evidence에 없는 세부 사건은 묻지 않는다.
// 단어 10개 / 독해 6문항 / 퀴즈 10문항 / 마인드맵 5가지 / IB 질문 2~3개씩 / 논술 PEEL+반박 6단
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3779",
  slug: "berenstain-bears-learn-about-strangers",
  title: "The Berenstain Bears Learn about Strangers",
  author: "Stan and Jan Berenstain",
  series: "The Berenstain Bears",
  level: { ar: "3.6", lexile: "500L", rb: "다독 3단계" },
  cover: "https://covers.openlibrary.org/b/id/4196958-M.jpg",
  awards: [],

  evidence: {
    by: "두 사람이 등장인물·사건 세 마디·결말을 각자 기억으로 적어 서로 맞춰 보았다",
    characters: ["Papa Bear", "Mama Bear", "Brother Bear", "Sister Bear"],
    beats: [
      "the parents teach the cubs rules about dealing with strangers",
      "a stranger approaches Sister Bear and tries to lure her",
      "she follows the rules, refuses, and tells her parents right away"
    ],
    ending: "the cubs confirm the safety rules and stay safe",
    checked: "확인하는 쪽이 제목·저자만 받고 따로 적은 것이 위와 같았다 (2026-09-29)"
  },

  shadowing: { query: "\"The Berenstain Bears Learn about Strangers\" read aloud" },

  // ── ① 단어 ─────────────────────────────────────────────
  // evidence 세 마디 안에서만 골랐다. 책에 없는 장면을 예문으로 만들지 않는다.
  vocabulary: [
    { word: "stranger",  pos: "n.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/stranger.mp3",  en: "a person you do not know", ko: "낯선 사람", ex: "Papa and Mama taught the cubs the rules about talking to a {{stranger}}.", ex_ko: "아빠와 엄마는 아이들에게 낯선 사람을 대하는 규칙을 가르쳐 주었어요.", pic: "👤" },
    { word: "rule",      pos: "n.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/rule.mp3",      en: "something you must do, or must not do, to stay safe or be fair", ko: "규칙", ex: "The cubs learned important {{rules}} for safety.", ex_ko: "아이들은 안전을 위한 중요한 규칙을 배웠어요.", pic: "📋" },
    { word: "approach",  pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/approach.mp3",  en: "to come near or close to someone", ko: "다가오다, 접근하다", ex: "A stranger began to {{approach}} Sister Bear at the park.", ex_ko: "낯선 사람이 공원에서 시스터 베어에게 다가오기 시작했어요.", pic: "🚶" },
    { word: "lure",      pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/lure.mp3",      en: "to try to attract someone, often in order to trick them", ko: "(꾀어) 유인하다", ex: "The stranger tried to {{lure}} Sister Bear away.", ex_ko: "그 낯선 사람은 시스터 베어를 꾀어 데려가려 했어요.", pic: "🎣" },
    { word: "refuse",    pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/refuse.mp3",    en: "to say no and not agree to do something", ko: "거절하다", ex: "Sister Bear firmly {{refused}} to go with the stranger.", ex_ko: "시스터 베어는 낯선 사람을 따라가지 않겠다고 단호히 거절했어요.", pic: "🙅" },
    { word: "safe",      pos: "adj.", audio: "assets/audio/berenstain-bears-learn-about-strangers/safe.mp3",      en: "free from danger or harm", ko: "안전한", ex: "Following the rules kept Sister Bear {{safe}}.", ex_ko: "규칙을 따른 덕분에 시스터 베어는 안전할 수 있었어요.", pic: "🛡️" },
    { word: "trust",     pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/trust.mp3",     en: "to believe that someone is honest and will not hurt you", ko: "신뢰하다, 믿다", ex: "The cubs learned which adults they could {{trust}}.", ex_ko: "아이들은 어떤 어른을 믿을 수 있는지 배웠어요.", pic: "🤝" },
    { word: "warn",      pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/warn.mp3",      en: "to tell someone about a danger before it happens", ko: "경고하다, 주의를 주다", ex: "Mama and Papa {{warned}} the cubs about talking to strangers.", ex_ko: "엄마와 아빠는 아이들에게 낯선 사람을 조심하라고 미리 말해 주었어요.", pic: "⚠️" },
    { word: "immediately", pos: "adv.", audio: "assets/audio/berenstain-bears-learn-about-strangers/immediately.mp3", en: "right away, without waiting", ko: "즉시, 곧바로", ex: "Sister Bear told her parents {{immediately}} after the stranger left.", ex_ko: "시스터 베어는 낯선 사람이 떠나자마자 부모님께 바로 말했어요.", pic: "⏱️" },
    { word: "proud",     pos: "adj.", audio: "assets/audio/berenstain-bears-learn-about-strangers/proud.mp3",     en: "feeling pleased about something you or someone else has done well", ko: "자랑스러운", ex: "Papa and Mama were {{proud}} of Sister Bear for following the rules.", ex_ko: "아빠와 엄마는 규칙을 잘 따른 시스터 베어를 자랑스러워했어요.", pic: "🌟" }
  ],

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What do Papa and Mama teach the cubs at the start of the story?",
      frame: "They teach the cubs {{rules about dealing with strangers}}." },
    { ref: "middle", skill: "사실찾기",  q: "What happens when Sister Bear is out and about?",
      frame: "A {{stranger}} approaches her and tries to {{lure her away}}." },
    { ref: "middle", skill: "추론·예측", q: "Why do you think the stranger tries to lure Sister Bear?",
      frame: "The stranger probably wants {{to trick her into going somewhere with him or her}}, which is exactly why the rules matter." },
    { ref: "middle", skill: "사실찾기",  q: "What does Sister Bear do when the stranger approaches her?",
      frame: "She {{follows the safety rules and refuses to go with the stranger}}." },
    { ref: "end", skill: "사실찾기",  q: "What does Sister Bear do right after the stranger leaves?",
      frame: "She {{tells her parents right away}}." },
    { ref: "end", skill: "평가·적용", q: "Do you think the rules the cubs learned really helped Sister Bear stay safe? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "Who approaches Sister Bear?",
      a: ["Her teacher", "A stranger", "Brother Bear", "A neighbor she knows well"], c: 1,
      why_ko: "선생님도, 아는 이웃도 아니에요. 시스터 베어에게 다가온 건 낯선 사람이었어요.",
      why: "Not her teacher, not a neighbor she knows. A stranger — someone she does not know — approaches her." },
    { q: "What do Papa and Mama teach the cubs at the beginning of the story?",
      a: ["How to cook", "Rules about dealing with strangers", "How to ride a bike", "How to read a map"], c: 1,
      why_ko: "요리도 자전거도 아니에요. 부모님이 처음에 가르친 건 낯선 사람을 대하는 규칙이었어요.",
      why: "Not cooking, not bike riding. At the very start, the parents teach the cubs rules about strangers." },
    { q: "What does the stranger try to do?",
      a: ["Ask for directions and leave", "Lure Sister Bear away", "Sell her candy honestly", "Borrow a book from her"], c: 1,
      why_ko: "그냥 길을 묻고 떠난 게 아니에요. 낯선 사람은 시스터 베어를 꾀어 데려가려 했어요.",
      why: "This is not an innocent stranger asking directions. This one tries to lure Sister Bear away." },
    { q: "What does Sister Bear do when the stranger approaches her?",
      a: ["She goes with the stranger", "She follows the safety rules and refuses", "She hides and says nothing", "She starts to cry and freezes"], c: 1,
      why_ko: "시스터 베어는 배운 규칙을 그대로 따랐어요. 따라가지 않고 단호히 거절했어요.",
      why: "She remembers exactly what she was taught — she follows the safety rules and refuses to go." },
    { q: "What does Sister Bear do right after the stranger leaves?",
      a: ["She keeps playing as if nothing happened", "She tells her parents right away", "She forgets about it completely", "She follows the stranger to see where he goes"], c: 1,
      why_ko: "규칙에는 거절하는 것만이 아니라, 바로 어른에게 알리는 것도 들어 있어요. 시스터 베어는 그것도 지켰어요.",
      why: "The rule is not only \"refuse\" — it is also \"tell a trusted adult right away.\" Sister Bear does exactly that." },
    { q: "How do Papa and Mama feel about what Sister Bear did?",
      a: ["Angry that she talked to a stranger at all", "Proud of her", "Confused about what happened", "Worried that she did something wrong"], c: 1,
      why_ko: "부모님은 시스터 베어를 자랑스러워해요. 규칙을 잘 지켰으니까요.",
      why: "They are proud of her, because she followed the rules exactly the way they had taught her." },
    { q: "What is the main lesson of this story?",
      a: ["Never talk to anyone at all", "All strangers are dangerous, with no exceptions", "Following safety rules and telling a trusted adult keeps you safe", "Playing outside alone is never allowed"], c: 2,
      why_ko: "이 책의 메시지는 무조건 겁먹으라는 게 아니에요. 규칙을 알고 지키고, 믿을 수 있는 어른에게 바로 말하는 게 안전을 지켜 준다는 거예요.",
      why: "The book's message is not blind fear. Knowing the rules, following them, and telling a trusted adult right away is what keeps you safe." },
    { q: "Why is it important that Sister Bear tells her parents immediately?",
      a: ["So they are not bored at home", "So they know what happened and can help keep her safe", "So she does not get in trouble later", "So they can go meet the stranger"], c: 1,
      why_ko: "부모님이 상황을 알아야 계속 딸을 지켜 줄 수 있어요. 바로 말하는 것 자체가 안전을 지키는 행동이에요.",
      why: "Telling right away means her parents know what happened and can help protect her. Telling itself is a safety action." },
    { q: "What kind of book is this?",
      a: ["A scary story with no clear lesson", "A safety lesson taught through the Bear family", "A cookbook", "A book only about school rules"], c: 1,
      why_ko: "이건 그냥 무서운 이야기가 아니라, 베어 가족을 통해 낯선 사람 안전 수칙을 가르쳐 주는 책이에요.",
      why: "It is not just a scary tale — it is a safety lesson, taught through the Bear family's story." },
    { q: "At the end of the story, how do the cubs feel about the rules?",
      a: ["They think the rules are silly", "They confirm the rules are important and feel safe", "They forget the rules right away", "They decide to break the rules next time"], c: 1,
      why_ko: "이야기 끝에서 아이들은 규칙이 정말 중요하다는 걸 확인하고 안심해요.",
      why: "By the end, the cubs confirm that the rules really matter, and they feel safe." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{the Bear family's neighborhood}}", time: "{{one day}}" },
    swbst: [
      { k: "Somebody", v: "{{the Bear cubs, especially Sister Bear}}" },
      { k: "Wanted",   v: "{{to stay safe while playing and going about their day}}" },
      { k: "But",      v: "{{a stranger approached Sister Bear and tried to lure her away}}" },
      { k: "So",       v: "{{Sister Bear remembered the rules Papa and Mama taught her and refused to go}}" },
      { k: "Then",     v: "{{she told her parents right away, and the family confirmed the safety rules together}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Papa and Mama teach the cubs rules about dealing with strangers.",
        frame: "The cubs learn {{what to do if a stranger talks to them}}." },
      { label: "Middle",
        given: "",
        frame: "A stranger {{approaches Sister Bear}} and tries to {{lure her away}}." },
      { label: "End",
        given: "Sister Bear follows the rules and refuses to go with the stranger.",
        frame: "She {{tells her parents immediately}}, and the family {{confirms the safety rules together}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Berenstain Bears Learn about Strangers",
    branches: [
      { label: "Sister Bear",     ask: "What does Sister Bear do when the stranger approaches her?",
        deeper: "Why does remembering the rules help her stay calm?" },
      { label: "The Rules",       ask: "What rules did the cubs learn from Papa and Mama?",
        deeper: "Why do these rules work even when you are scared?" },
      { label: "The Stranger",    ask: "What does the stranger try to do?",
        deeper: "Why might a stranger try to lure a child away?" },
      { label: "Telling an Adult", ask: "What does Sister Bear do right after the stranger leaves?",
        deeper: "Why is telling a trusted adult right away so important?" },
      { label: "Me",              ask: "What would you do if a stranger talked to you?",
        deeper: "Who are the trusted adults in your own life?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Responsibility",
    relatedConcepts: ["Safety", "Communication"],
    globalContext: "Identities and relationships — how families keep each other safe (가족은 서로를 어떻게 안전하게 지키는가)",
    statement: "Knowing the safety rules and telling a trusted adult right away can keep you safe.",
    factual: [
      "What do Papa and Mama teach the cubs?",
      "What does Sister Bear do right after the stranger leaves?"
    ],
    conceptual: [
      "Why does Sister Bear stay calm when the stranger approaches her?",
      "How does telling a trusted adult help keep a family safe?"
    ],
    debatable: [
      "Should children be afraid of everyone they do not know?",
      "Is it enough to know the rules, or do you also need to practice them?"
    ],
    learnerProfile: ["Principled", "Communicator", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Sister Bear remembered the safety rules and refused to go with the stranger. Why do you think it is important to know these rules? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣을 것 · Use one scene from the book",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Rules Can Keep You Safe", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think it is very important to know the safety rules about strangers.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene.",
        eg: "In the book, a stranger tried to lure Sister Bear away, but she remembered the rules and refused.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that knowing the rules helped her make the right choice quickly, without panicking.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say rules are boring to learn, but they are what kept Sister Bear safe.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe every child should learn and remember these safety rules.", lines: 2 }
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
      { c: "A 분석",  d: "책 속 장면을 근거로 들어 설명했나요? · Did I use a scene from the book as evidence?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  },

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  teaching: {
    goal: {
      en: "Students retell how Sister Bear used the safety rules with a stranger and take a side on how much children should trust rules versus adults.",
      ko: "시스터 베어가 낯선 사람 앞에서 안전 수칙을 어떻게 지켰는지 말하고, 아이가 규칙과 어른 중 무엇에 더 의지해야 하는지 편을 정해 쓴다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "If someone you don't know talks to you on the street, what should you do first?",
        do: "책을 펴기 전에 한다. 아이들이 이미 아는 안전 상식을 먼저 꺼낸다.",
        exp: "Say no. / Tell my mom.",
        stuck: "선생님이 먼저 한 문장 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "낯선 사람 → stranger / 규칙 → rule / 거절하다 → refuse",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다.",
        stuck: "교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What do Papa and Mama teach...' becomes 'They teach...'",
        do: "이 한 마디가 서술형의 전부다.",
        exp: "They teach the cubs rules about dealing with strangers.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question three asks WHY. Think about what the stranger wanted, and why the rules exist.",
        do: "추론 문항에서는 혼자 두지 않는다. 같이 읽고 시작한다.",
        exp: "The stranger wanted to trick her into going somewhere with him.",
        stuck: "\"What did the stranger try to do? Why would someone do that?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Sister Bear / Wanted: to stay safe / But: a stranger tried to lure her away",
        stuck: "\"Who is the story about? What almost happened to her?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Telling an Adult)", min: "",
        say: "Stop at Telling an Adult. Don't just tell me what Sister Bear did — tell me why it matters so much.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Because her parents can only help her if they know what happened.",
        stuck: "\"You said what she did. Now — why does telling matter?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should children be afraid of everyone they don't know? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think you should not be afraid of everyone, but you should always follow the safety rules.",
        stuck: "손을 들게 한다. \"Afraid of everyone? Or careful, but not afraid?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say rules are boring, but they are what kept Sister Bear safe.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What would you do if a person you don't know talked to you alone?", ko: "모르는 사람이 너 혼자 있을 때 말을 걸면 어떻게 하겠니?" },
        { en: "Who are the adults you trust most?", ko: "네가 가장 믿는 어른은 누구니?" }
      ],
      during: [
        { en: "Why does the stranger try to talk to Sister Bear when she is alone?", ko: "낯선 사람은 왜 시스터 베어가 혼자 있을 때 말을 걸까?" },
        { en: "How does Sister Bear stay calm instead of panicking?", ko: "시스터 베어는 어떻게 당황하지 않고 침착할 수 있었을까?" }
      ],
      after: [
        { en: "Why did telling her parents matter just as much as refusing the stranger?", ko: "낯선 사람을 거절한 것만큼 부모님께 말한 것도 왜 중요했을까?" },
        { en: "What is one rule from this book you want to remember?", ko: "이 책에서 꼭 기억하고 싶은 규칙 하나는 뭐니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "'Telling an Adult' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 장면이 없으면 근거가 아니다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",     pt: 5, yes: "책 속 장면을 들어 설명했다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization", pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",        pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",     pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  }
};
