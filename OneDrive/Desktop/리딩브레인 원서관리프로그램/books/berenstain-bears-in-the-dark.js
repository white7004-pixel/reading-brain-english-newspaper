// 리딩브레인 원서프로그램 — A갈래(9단계) 책, 근거 확인을 통과한 세 권 중 하나 (AR 3.8)
// 스캔한 쪽도, 확인된 낭독 영상도 없다. 그래서 evidence(제목·저자·등장인물·사건 세 마디·결말)에
// 적힌 것과 책 제목·레벨이 말해 주는 것만으로 만들었다. evidence에 없는 세부 사건은 묻지 않는다.
// 단어 10개 / 독해 6문항 / 퀴즈 10문항 / 마인드맵 5가지 / IB 질문 2~3개씩 / 논술 PEEL+반박 6단
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3788",
  slug: "berenstain-bears-in-the-dark",
  title: "The Berenstain Bears in the Dark",
  author: "Stan and Jan Berenstain",
  series: "The Berenstain Bears",
  level: { ar: "3.8", lexile: "470L", rb: "다독 3단계" },
  cover: "https://covers.openlibrary.org/b/id/4272635-M.jpg",
  awards: [],

  evidence: {
    by: "두 사람이 등장인물·사건 세 마디·결말을 각자 기억으로 적어 서로 맞춰 보았다",
    characters: ["Papa Bear", "Mama Bear", "Brother Bear", "Sister Bear"],
    beats: [
      "Brother Bear becomes afraid of the dark and cannot sleep",
      "Papa tries to prove there is nothing to fear and ends up frightened himself",
      "Mama helps with a gentler approach — talking about the fear, a night light"
    ],
    ending: "Brother overcomes his fear of the dark and sleeps peacefully",
    checked: "확인하는 쪽이 제목·저자만 받고 따로 적은 것이 위와 같았다 (2026-09-29)"
  },

  shadowing: { query: "\"The Berenstain Bears in the Dark\" read aloud" },

  // ── ① 단어 ─────────────────────────────────────────────
  // evidence 세 마디 안에서만 골랐다. 책에 없는 장면을 예문으로 만들지 않는다.
  vocabulary: [
    { word: "afraid",     pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/afraid.mp3",     en: "feeling fear; worried that something bad might happen", ko: "무서워하는, 두려워하는", ex: "Brother Bear was {{afraid}} of the dark.", ex_ko: "브라더 베어는 어둠을 무서워했어요.", pic: "😨" },
    { word: "darkness",   pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/darkness.mp3",   en: "the state of having no light", ko: "어둠", ex: "He could not fall asleep in the {{darkness}}.", ex_ko: "그는 어둠 속에서 잠을 이룰 수 없었어요.", pic: "🌑" },
    { word: "shadow",     pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/shadow.mp3",     en: "a dark shape made on a surface when something blocks the light", ko: "그림자", ex: "Strange {{shadows}} moved across his bedroom wall.", ex_ko: "이상한 그림자들이 그의 방 벽에서 움직였어요.", pic: "👤" },
    { word: "frightened", pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/frightened.mp3", en: "feeling afraid, often suddenly", ko: "겁먹은, 놀란", ex: "Papa tried to show there was nothing to fear, but he ended up {{frightened}} himself.", ex_ko: "아빠는 무서울 게 없다는 걸 보여 주려다 오히려 자기가 겁을 먹고 말았어요.", pic: "😱" },
    { word: "brave",      pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/brave.mp3",      en: "not afraid to do something difficult or dangerous", ko: "용감한", ex: "Papa wanted to show Brother Bear how to be {{brave}}.", ex_ko: "아빠는 브라더 베어에게 용감해지는 법을 보여 주고 싶었어요.", pic: "🦁" },
    { word: "prove",      pos: "v.",   audio: "assets/audio/berenstain-bears-in-the-dark/prove.mp3",      en: "to show that something is true", ko: "증명하다, 보여 주다", ex: "Papa tried to {{prove}} that there was nothing to be afraid of.", ex_ko: "아빠는 무서워할 게 없다는 걸 증명하려고 했어요.", pic: "✅" },
    { word: "comfort",    pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/comfort.mp3",    en: "a good feeling that comes when worry or fear goes away", ko: "위로, 편안함", ex: "Mama's gentle words gave Brother {{comfort}}.", ex_ko: "엄마의 다정한 말이 브라더에게 위로가 되었어요.", pic: "🤗" },
    { word: "night light", pos: "n.",  audio: "assets/audio/berenstain-bears-in-the-dark/night-light.mp3", en: "a small, soft light that is left on in a room at night", ko: "취침등, 야간등", ex: "Mama gave Brother a {{night light}} for his room.", ex_ko: "엄마는 브라더의 방에 취침등을 놓아 주었어요.", pic: "🕯️" },
    { word: "calm",       pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/calm.mp3",       en: "quiet and peaceful, not worried or upset", ko: "차분한, 평온한", ex: "Talking about his fear helped Brother feel {{calm}}.", ex_ko: "자신의 두려움에 대해 이야기하고 나니 브라더는 차분해졌어요.", pic: "😌" },
    { word: "peacefully", pos: "adv.", audio: "assets/audio/berenstain-bears-in-the-dark/peacefully.mp3", en: "in a calm and quiet way, without trouble", ko: "평화롭게, 편안하게", ex: "At last, Brother slept {{peacefully}} through the night.", ex_ko: "마침내 브라더는 밤새 편안하게 잠을 잤어요.", pic: "😴" }
  ],

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What happens to Brother Bear at the start of the story?",
      frame: "Brother Bear becomes {{afraid of the dark}} and cannot {{fall asleep}}." },
    { ref: "middle", skill: "사실찾기",  q: "What does Papa do first to help Brother Bear?",
      frame: "Papa tries to {{prove there is nothing to fear}} in the dark." },
    { ref: "middle", skill: "추론·예측", q: "What happens to Papa when he tries to prove there is nothing scary in the dark?",
      frame: "Papa ends up {{frightened himself}}." },
    { ref: "middle", skill: "사실찾기",  q: "How does Mama help Brother Bear instead?",
      frame: "Mama {{talks with Brother about his fear}} and gives him {{a night light}}." },
    { ref: "end", skill: "추론·예측", q: "Why do you think Mama's way works better than Papa's way?",
      frame: "Mama's way works better because {{she listens to and talks about Brother's fear instead of just trying to prove it wrong}}." },
    { ref: "end", skill: "평가·적용", q: "Do you think a night light can really help someone who is afraid of the dark? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "Who becomes afraid of the dark in this story?",
      a: ["Papa Bear", "Brother Bear", "Sister Bear", "Mama Bear"], c: 1,
      why_ko: "무서워한 건 아빠도 여동생도 아니에요. 밤에 잠을 못 이룬 건 브라더 베어였어요.",
      why: "It is not Papa or Sister. Brother Bear is the one who cannot sleep because he is afraid of the dark." },
    { q: "What is Brother Bear's problem at night?",
      a: ["He is hungry", "He cannot sleep because he is afraid of the dark", "He hears thunder outside", "He cannot find his blanket"], c: 1,
      why_ko: "배가 고픈 것도, 천둥소리 때문도 아니에요. 어둠이 무서워서 잠을 못 자는 게 문제였어요.",
      why: "Not hunger, not thunder. His problem is simple — the dark scares him and he cannot sleep." },
    { q: "What does Papa try to do first?",
      a: ["He reads a book about bears", "He tries to prove there is nothing to fear in the dark", "He turns on every light in the house", "He calls a doctor"], c: 1,
      why_ko: "아빠는 어둠 속에 무서운 게 없다는 걸 직접 보여 주려고 했어요. 이게 아빠의 첫 번째 방법이에요.",
      why: "Papa's first plan is to prove, with his own actions, that there is nothing scary in the dark." },
    { q: "What happens to Papa when he tries to prove nothing is scary?",
      a: ["He falls asleep right away", "He laughs the whole time", "He ends up frightened himself", "He leaves the house"], c: 2,
      why_ko: "아이러니하죠? 자신 있게 나섰던 아빠가 오히려 겁을 먹고 말았어요. 이 반전이 이 책의 재미있는 부분이에요.",
      why: "The irony: the parent who tried to prove there was nothing to fear ends up scared instead. That twist is the fun part of this book." },
    { q: "Who helps Brother Bear in a gentler way?",
      a: ["Sister Bear", "Papa Bear", "Mama Bear", "A neighbor"], c: 2,
      why_ko: "아빠와는 다른 방식이에요. 엄마가 더 부드러운 방법으로 브라더를 도와줘요.",
      why: "Mama takes a different, gentler approach than Papa did." },
    { q: "What does Mama do first to help Brother Bear?",
      a: ["She turns off all the lights", "She talks with him about his fear", "She tells him to just be tough", "She sends him to Papa again"], c: 1,
      why_ko: "엄마는 무서움을 없애 버리려 하지 않고, 브라더와 그 마음에 대해 이야기를 나눠요.",
      why: "Mama does not try to erase the fear. She talks with Brother about how he feels." },
    { q: "What does Mama give Brother Bear?",
      a: ["A flashlight", "A new blanket", "A night light", "A teddy bear"], c: 2,
      why_ko: "엄마가 준 건 취침등이에요. 은은한 불빛 하나가 브라더의 밤을 바꿔 놓아요.",
      why: "Mama gives him a night light — one small, soft light that changes his night." },
    { q: "How is Mama's approach different from Papa's?",
      a: ["Papa listens and Mama proves; that is backward", "Papa tries to prove nothing is scary and ends up scared; Mama talks gently and comforts him", "Papa reads a story and Mama sings", "There is no difference between them"], c: 1,
      why_ko: "아빠는 증명하려다 실패했고, 엄마는 마음을 들어 주고 위로하는 방법으로 성공했어요. 이 대비가 핵심이에요.",
      why: "Papa's proving fails; Mama's listening and comforting works. That contrast is the heart of the story." },
    { q: "What happens to Brother Bear by the end of the story?",
      a: ["He is still afraid every night", "He moves to a different room", "He overcomes his fear and sleeps peacefully", "He asks for a new house"], c: 2,
      why_ko: "결국 브라더는 두려움을 이겨 내고 편안하게 잠을 자게 돼요. 좋은 결말이죠.",
      why: "Brother finally overcomes his fear and sleeps peacefully. A happy ending." },
    { q: "What is the lesson of this story?",
      a: ["Fear should always be ignored", "Talking about a fear and gentle comfort can help you feel better", "Parents should never help with fears", "Darkness is always dangerous"], c: 1,
      why_ko: "주제 문제예요. 무서움을 억지로 없애려 하기보다, 그 마음에 대해 이야기하고 부드럽게 위로받는 것이 도움이 된다는 게 이 책의 메시지예요.",
      why: "The theme: instead of forcing a fear away, talking about it and getting gentle comfort is what really helps." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{the Bear family's house}}", time: "{{one night}}" },
    swbst: [
      { k: "Somebody", v: "{{Brother Bear, a young cub}}" },
      { k: "Wanted",   v: "{{to sleep at night without being afraid of the dark}}" },
      { k: "But",      v: "{{he was too scared, and Papa's way of proving there was nothing there did not help}}" },
      { k: "So",       v: "{{Mama talked with him gently about his fear and gave him a night light}}" },
      { k: "Then",     v: "{{Brother overcame his fear and slept peacefully}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Brother Bear becomes afraid of the dark and cannot fall asleep at night.",
        frame: "He feels {{scared of the shadows in his room}}." },
      { label: "Middle",
        given: "",
        frame: "Papa tries to {{prove there is nothing to fear}}, but he {{ends up frightened himself}}." },
      { label: "End",
        given: "Mama takes a gentler approach — she talks with Brother about his fear and gives him a night light.",
        frame: "So Brother {{overcomes his fear and sleeps peacefully}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Berenstain Bears in the Dark",
    branches: [
      { label: "Brother Bear", ask: "How does Brother Bear feel at night, and why?",
        deeper: "Is being afraid of the dark a normal feeling? Why or why not?" },
      { label: "Papa's Way",   ask: "What does Papa do to help, and does it work?",
        deeper: "Why might proving a fear is silly not be enough to make it go away?" },
      { label: "Mama's Way",   ask: "What does Mama do differently from Papa?",
        deeper: "Why does listening to a fear sometimes help more than proving it wrong?" },
      { label: "The Night Light", ask: "What does the small night light do for Brother?",
        deeper: "What small things help you feel safe?" },
      { label: "Me",           ask: "Are you ever afraid of the dark? What helps you feel better?",
        deeper: "Who do you talk to when you feel afraid?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Perspective",
    relatedConcepts: ["Emotion", "Family"],
    globalContext: "Identities and relationships — how families help each other face fear (가족은 서로의 두려움을 어떻게 돕는가)",
    statement: "A fear feels smaller when it is talked about and understood, not just proven wrong.",
    factual: [
      "What is Brother Bear afraid of?",
      "What does Mama give Brother Bear?"
    ],
    conceptual: [
      "Why does Papa's way not work as well as Mama's way?",
      "How does talking about a fear change how big it feels?"
    ],
    debatable: [
      "Is it better to prove a fear is silly, or to listen to it?",
      "Can grown-ups be afraid of things too?"
    ],
    learnerProfile: ["Caring", "Open-minded", "Reflective"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Papa tried to prove there was nothing to fear, but Mama talked with Brother about his feelings instead. Which way do you think helps more? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣을 것 · Use one scene from the book",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Talking Helps More Than Proving", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Mama's gentle way helps more than Papa's way of proving.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene.",
        eg: "In the book, Papa tried to prove there was nothing to fear and ended up frightened himself.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that proving a fear wrong does not always work, even for a grown-up.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say Papa was brave to try, but Brother needed comfort, not proof.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe talking about a fear helps more than trying to prove it away.", lines: 2 }
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
      en: "Students retell how Brother Bear's fear of the dark is resolved and take a side on which parent's approach — proving or talking — helps more.",
      ko: "브라더 베어의 어둠에 대한 두려움이 어떻게 풀리는지 말하고, 증명하기와 이야기 나누기 중 어느 쪽이 더 도움이 되는지 편을 정해 쓴다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Are you ever afraid of the dark? What helps you feel better?",
        do: "책을 펴기 전에 한다. 아이 경험에서 두려움을 먼저 꺼내야 이 책이 읽힌다. 두세 명만.",
        exp: "I turn on a light. / I call my mom.",
        stuck: "선생님이 먼저 한 문장 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "무서워하는 → afraid / 그림자 → shadow / 위로 → comfort",
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
        say: "Turn the question into the first half of your answer. 'What happens to Brother...' becomes 'Brother becomes...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "Brother Bear becomes afraid of the dark and cannot fall asleep.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question five is different — you have to think about WHY. Read the last two questions two times before you answer.",
        do: "추론 문항에서는 혼자 두지 않는다. 소리 내어 두 번 읽히고 같이 시작한다.",
        exp: "Mama's way works better because she listens to Brother instead of just proving him wrong.",
        stuck: "쪼개서 묻는다. \"What did Papa try to do? What did Mama do instead?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Brother Bear / Wanted: to sleep without fear / But: he was too scared",
        stuck: "\"Who is afraid in this story? What does he want?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Papa vs. Mama)", min: "",
        say: "Stop at Papa's Way and Mama's Way. Don't just tell me what they did — tell me why one worked better.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Because Mama listened to how Brother felt instead of trying to prove it away.",
        stuck: "\"You said what they did. Now — why did it work, or not work?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is it better to prove a fear is silly, or to listen to it? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think listening is better, because Papa's proving did not work but Mama's listening did.",
        stuck: "손을 들게 한다. \"Prove? Listen?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say Papa was brave to try, but Brother needed comfort, not proof.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Are you ever afraid of the dark? What do you do about it?", ko: "어둠이 무서울 때가 있니? 그럴 때 어떻게 하니?" },
        { en: "Can grown-ups be afraid of things too?", ko: "어른들도 무서운 게 있을까?" }
      ],
      during: [
        { en: "Why does Papa's plan not work the way he hoped?", ko: "아빠의 계획은 왜 뜻대로 되지 않을까?" },
        { en: "What is different about the way Mama helps Brother?", ko: "엄마가 브라더를 돕는 방법은 뭐가 다를까?" }
      ],
      after: [
        { en: "Which way helped Brother more — proving or talking?", ko: "브라더에게 더 도움이 된 건 증명하기와 이야기하기 중 무엇일까?" },
        { en: "What helps you feel calm when you are scared?", ko: "무서울 때 너를 차분하게 만들어 주는 건 뭐니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "'Papa's Way'와 'Mama's Way' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
