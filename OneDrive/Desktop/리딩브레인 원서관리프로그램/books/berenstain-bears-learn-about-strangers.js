// 리딩브레인 원서프로그램 — A갈래(9단계) 책, 근거 확인을 통과한 세 권 중 하나 (AR 3.6)
// 스캔한 쪽도, 확인된 낭독 영상도 없다. evidence(제목·저자·등장인물·사건 세 마디·결말)에
// 적힌 것과 책 제목·레벨이 말해 주는 것만으로 만들었다. evidence에 없는 세부 사건은 묻지 않는다.
// [2026-09-29 정정] 최초의 evidence는 두 사람의 기억만으로 만들었는데, 순서가 거꾸로였고
// "낯선 사람이 유인하고 시스터가 거절한다"는 장면은 통째로 지어낸 것이었다. 학원 장서 목록의
// 한 줄 요약을 바닥으로 다시 확인한 결과, 실제 이야기는 시스터가 낯선 사람과 이야기하는
// 나쁜 습관이 든 것에서 시작해 부모님이 안전 규칙을 가르쳐 주는 순서였다. 유인·거절 장면은
// 전부 들어냈다. 아래 모든 문항은 바로잡은 evidence 안에서만 다시 썼다.
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
    source: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 두 사람의 기억 중 요약과 어긋나지 않는 것만 남겼다",
    characters: ["Papa Bear", "Mama Bear", "Sister Bear"],
    beats: [
      "Sister Bear gets into a bad habit of talking to strangers she does not know",
      "Papa and Mama notice this habit",
      "they show her the important rules of safety around strangers"
    ],
    ending: "Sister learns the important safety rules so she can stay safe",
    checked: "두 사람의 기억을 학원 장서 목록의 한 줄 요약과 대조했고, 순서와 지어낸 유인·거절 장면을 요약에 맞춰 바로잡았다 (2026-09-29)"
  },

  shadowing: { query: "\"The Berenstain Bears Learn about Strangers\" read aloud" },

  // ── ① 단어 ─────────────────────────────────────────────
  // evidence 세 마디 안에서만 골랐다. 책에 없는 장면(공원에서 유인 등)을 예문으로 만들지 않는다.
  vocabulary: [
    { word: "stranger",    pos: "n.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/stranger.mp3",    en: "a person you do not know", ko: "낯선 사람", ex: "Sister Bear had a habit of talking to a {{stranger}} she did not know.", ex_ko: "시스터 베어는 낯선 사람과 이야기하는 습관이 있었어요.", pic: "👤" },
    { word: "habit",       pos: "n.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/habit.mp3",       en: "something you do often, almost without thinking", ko: "습관", ex: "Talking to strangers had become a {{habit}} for Sister.", ex_ko: "낯선 사람과 이야기하는 것이 시스터의 습관이 되었어요.", pic: "🔁" },
    { word: "notice",      pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/notice.mp3",      en: "to see or become aware of something", ko: "알아차리다, 눈치채다", ex: "Papa and Mama {{noticed}} Sister's habit of talking to strangers.", ex_ko: "아빠와 엄마는 시스터의 습관을 알아차렸어요.", pic: "👀" },
    { word: "rule",        pos: "n.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/rule.mp3",        en: "something you must do, or must not do, to stay safe", ko: "규칙", ex: "Sister's parents taught her the important {{rules}} of safety.", ex_ko: "시스터의 부모님은 중요한 안전 규칙을 가르쳐 주었어요.", pic: "📋" },
    { word: "safety",      pos: "n.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/safety.mp3",      en: "the state of being free from danger or harm", ko: "안전", ex: "The rules were all about {{safety}} around strangers.", ex_ko: "그 규칙들은 낯선 사람 주변에서의 안전에 관한 것이었어요.", pic: "🛡️" },
    { word: "important",   pos: "adj.", audio: "assets/audio/berenstain-bears-learn-about-strangers/important.mp3",   en: "having great value or meaning; serious", ko: "중요한", ex: "Her parents showed her the {{important}} rules of safety.", ex_ko: "부모님은 시스터에게 중요한 안전 규칙을 보여 주었어요.", pic: "❗" },
    { word: "teach",       pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/teach.mp3",       en: "to help someone learn something", ko: "가르치다", ex: "Her parents {{teach}} her the important rules of safety.", ex_ko: "부모님은 시스터에게 중요한 안전 규칙을 가르쳐 주었어요.", pic: "👩‍🏫" },
    { word: "learn",       pos: "v.",   audio: "assets/audio/berenstain-bears-learn-about-strangers/learn.mp3",       en: "to gain knowledge or a skill", ko: "배우다", ex: "Sister {{learns}} the rules so she can stay safe.", ex_ko: "시스터는 안전하게 지낼 수 있도록 규칙을 배웠어요.", pic: "📖" },
    { word: "careful",     pos: "adj.", audio: "assets/audio/berenstain-bears-learn-about-strangers/careful.mp3",     en: "paying close attention in order to avoid danger or mistakes", ko: "조심스러운, 신중한", ex: "You should be {{careful}} around a stranger.", ex_ko: "낯선 사람 주변에서는 조심해야 해요.", pic: "🧐" },
    { word: "safe",        pos: "adj.", audio: "assets/audio/berenstain-bears-learn-about-strangers/safe.mp3",        en: "free from danger or harm", ko: "안전한", ex: "Following the rules helps Sister stay {{safe}}.", ex_ko: "규칙을 따르는 것이 시스터가 안전하게 지내도록 도와줘요.", pic: "✅" }
  ],

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What habit does Sister Bear have at the start of the story?",
      frame: "She has gotten into the habit of {{talking to strangers}}." },
    { ref: "beginning", skill: "사실찾기",  q: "Who notices this habit?",
      frame: "{{Her parents, Papa and Mama Bear,}} notice it." },
    { ref: "middle", skill: "사실찾기",  q: "What do Papa and Mama do about it?",
      frame: "They {{show her the important rules of safety}}." },
    { ref: "middle", skill: "추론·예측", q: "Why do you think talking to strangers can be a bad habit? Say what you think.",
      frame: "I think it can be a bad habit because {{                    }}." },
    { ref: "end", skill: "사실찾기",  q: "What does Sister do with the rules her parents teach her?",
      frame: "She {{learns the important safety rules}}." },
    { ref: "end", skill: "평가·적용", q: "Do you think it is important for children to learn safety rules like these? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "Who has gotten into a bad habit of talking to strangers?",
      a: ["Brother Bear", "Sister Bear", "Papa Bear", "Mama Bear"], c: 1,
      why_ko: "브라더도 아빠도 엄마도 아니에요. 낯선 사람과 이야기하는 습관이 든 건 시스터 베어였어요.",
      why: "Not Brother, not Papa, not Mama. Sister Bear is the one with the habit." },
    { q: "What is Sister Bear's habit at the start of the story?",
      a: ["Talking to strangers", "Staying up too late", "Eating too much candy", "Running in the house"], c: 0,
      why_ko: "늦게까지 안 자거나 사탕을 많이 먹는 게 아니에요. 낯선 사람과 이야기하는 습관이었어요.",
      why: "Not staying up late, not eating candy. It is the habit of talking to strangers." },
    { q: "Who notices Sister's habit?",
      a: ["Her teacher", "Her parents", "A stranger", "Her friend"], c: 1,
      why_ko: "선생님도 친구도 아니에요. 시스터의 습관을 알아차린 건 부모님, 아빠와 엄마였어요.",
      why: "Not her teacher, not a friend. Her parents, Papa and Mama, are the ones who notice." },
    { q: "What do Papa and Mama do about Sister's habit?",
      a: ["Punish Sister", "Show her the important rules of safety", "Ignore the habit", "Move to a new town"], c: 1,
      why_ko: "벌을 주거나 무시한 게 아니에요. 부모님은 중요한 안전 규칙을 보여 주었어요.",
      why: "Not punishment, not ignoring it. They show her the important safety rules." },
    { q: "What do the rules mainly teach Sister about?",
      a: ["How to cook", "Safety around strangers", "How to ride a bike", "How to make more friends"], c: 1,
      why_ko: "요리나 자전거가 아니에요. 규칙은 낯선 사람 주변에서의 안전에 관한 것이었어요.",
      why: "Not cooking, not bike riding. The rules are about staying safe around strangers." },
    { q: "Who are the \"strangers\" in this story?",
      a: ["People Sister does not know", "Sister's teachers", "Sister's brothers", "Sister's best friends"], c: 0,
      why_ko: "'낯선 사람'은 모르는 사람이에요. 시스터가 이야기하던 대상은 자기가 모르는 사람들이었어요.",
      why: "A stranger is someone you do not know. The people Sister talks to are people she does not know." },
    { q: "What does Sister do with the rules her parents teach her?",
      a: ["She ignores them", "She learns them", "She forgets them right away", "She teaches them to a stranger"], c: 1,
      why_ko: "무시하거나 바로 잊어버린 게 아니에요. 시스터는 그 규칙들을 배웠어요.",
      why: "Not ignoring, not forgetting. Sister learns the rules her parents teach her." },
    { q: "How do the safety rules help Sister?",
      a: ["They make her afraid to leave the house", "They help her stay safe around people she does not know", "They help her make more friends", "They have nothing to do with safety"], c: 1,
      why_ko: "집 밖에 못 나가게 만드는 게 아니에요. 규칙은 낯선 사람 주변에서 안전하게 지내도록 도와줘요.",
      why: "The rules are not about fear of leaving the house — they help Sister stay safe around people she does not know." },
    { q: "What is the main lesson of this story?",
      a: ["Strangers are always kind", "Learning safety rules can help you stay safe", "Talking to strangers is always fine", "Rules are not important"], c: 1,
      why_ko: "주제 문제예요. 안전 규칙을 배우면 스스로를 지킬 수 있다는 게 이 책의 메시지예요.",
      why: "The theme: learning safety rules can help you stay safe." },
    { q: "What kind of book is this?",
      a: ["A scary story with no lesson", "A safety lesson taught through the Bear family", "A cookbook", "A book only about school rules"], c: 1,
      why_ko: "그냥 무서운 이야기가 아니라, 베어 가족을 통해 낯선 사람 안전 수칙을 가르쳐 주는 책이에요.",
      why: "It is not just a story — it is a safety lesson, taught through the Bear family." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Sister Bear}}" },
      { k: "Wanted",   v: "{{to keep talking to people she did not know}}" },
      { k: "But",      v: "{{talking to strangers was a bad habit}}" },
      { k: "So",       v: "{{Papa and Mama noticed her habit and showed her the important rules of safety}}" },
      { k: "Then",     v: "{{Sister learned the important rules of safety so she could stay safe}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Sister Bear has gotten into a habit of talking to strangers.",
        frame: "{{Her parents, Papa and Mama, notice this habit}}." },
      { label: "Middle",
        given: "",
        frame: "Papa and Mama {{show her}} {{the important rules of safety}}." },
      { label: "End",
        given: "Sister learns the rules her parents teach her.",
        frame: "She {{learns the rules}} so she can {{stay safe}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Berenstain Bears Learn about Strangers",
    branches: [
      { label: "Sister Bear", ask: "What habit does Sister have at the start of the story?",
        deeper: "Why do you think talking to people you do not know is a bad habit?" },
      { label: "Noticing",    ask: "What do Papa and Mama notice about Sister?",
        deeper: "Why is it important for parents to notice habits like this?" },
      { label: "The Rules",   ask: "What do the safety rules teach Sister?",
        deeper: "Why do you think safety rules matter when you meet someone you do not know?" },
      { label: "Learning",    ask: "What does Sister do with the rules her parents teach her?",
        deeper: "How can you remember a safety rule when you need it?" },
      { label: "Me",          ask: "What would you do if you met someone you did not know?",
        deeper: "Who are the trusted adults you could tell?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Responsibility",
    relatedConcepts: ["Safety", "Family"],
    globalContext: "Identities and relationships — how families teach each other to stay safe (가족은 서로에게 안전을 어떻게 가르치는가)",
    statement: "Learning safety rules can help you stay safe around people you do not know.",
    factual: [
      "What habit does Sister Bear have at the start of the story?",
      "Who are the strangers in this story?",
      "Who notices Sister's habit?",
      "What do Papa and Mama teach her?",
      "What does Sister do with the rules her parents teach her?"
    ],
    conceptual: [
      "Why might talking to people you do not know be unsafe?",
      "How can safety rules help a person stay safe?"
    ],
    debatable: [
      "Should children always be careful around people they do not know?",
      "Is it enough to learn a rule once, or do you need to practice it?"
    ],
    learnerProfile: ["Principled", "Communicator", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Sister Bear had a habit of talking to strangers, so her parents taught her the important safety rules. Why do you think it is important to learn these rules? Write your opinion.",
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
        eg: "In the book, Sister had a habit of talking to strangers, so Papa and Mama taught her the safety rules.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that talking to strangers can be a bad habit, and the rules help a child stay safe.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say rules are boring to learn, but they are what helps Sister stay safe.", lines: 2 },
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
      en: "Students retell how Sister Bear's habit of talking to strangers leads to Papa and Mama teaching her safety rules, then take a side on how children should treat people they do not know.",
      ko: "시스터 베어가 낯선 사람과 이야기하는 습관 때문에 부모님께 안전 규칙을 배우게 된 과정을 말하고, 아이가 모르는 사람을 어떻게 대해야 하는지 편을 정해 쓴다."
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
        exp: "낯선 사람 → stranger / 습관 → habit / 규칙 → rule",
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
        say: "Turn the question into the first half of your answer. 'What habit does Sister have...' becomes 'She has...'",
        do: "이 한 마디가 서술형의 전부다.",
        exp: "She has gotten into the habit of talking to strangers.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question four asks what YOU think. Why can talking to strangers be a bad habit? Any answer is fine if you give a reason.",
        do: "추론 문항에서는 혼자 두지 않는다. 같이 읽고 시작한다.",
        exp: "It can be a bad habit because you do not know if the person is safe.",
        stuck: "\"If you do not know a person, do you know if they are kind? What could go wrong?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Sister Bear / Wanted: to keep talking to people she did not know / But: talking to strangers was a bad habit",
        stuck: "\"Who is the story about? What habit does she have?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Rules)", min: "",
        say: "Stop at The Rules. Don't just tell me what the rules say — tell me why you think safety rules matter around people you don't know.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Because rules help you stay safe when you do not know the person.",
        stuck: "\"You said what the rules are. Now — why do they matter?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should children always be careful around people they don't know? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think you should always be careful, because you do not know if a stranger is safe.",
        stuck: "손을 들게 한다. \"Always careful? Or only sometimes?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say rules are boring, but they are what keeps Sister safe.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What would you do if a person you don't know started talking to you?", ko: "모르는 사람이 너에게 말을 걸면 어떻게 하겠니?" },
        { en: "Who are the adults you trust most?", ko: "네가 가장 믿는 어른은 누구니?" }
      ],
      during: [
        { en: "Why do you think Sister got into the habit of talking to strangers?", ko: "시스터는 왜 낯선 사람과 이야기하는 습관이 들었을까?" },
        { en: "What do you think Papa and Mama notice about Sister?", ko: "아빠와 엄마는 시스터에게서 무엇을 알아차렸을까?" }
      ],
      after: [
        { en: "Why do you think safety rules matter?", ko: "안전 규칙은 왜 중요하다고 생각하니?" },
        { en: "What is one rule from this book you want to remember?", ko: "이 책에서 꼭 기억하고 싶은 규칙 하나는 뭐니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "'The Rules' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
