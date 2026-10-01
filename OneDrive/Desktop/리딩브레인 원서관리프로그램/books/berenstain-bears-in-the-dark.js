// 리딩브레인 원서프로그램 — A갈래(9단계) 책, 근거 확인을 통과한 세 권 중 하나 (AR 3.8)
// 스캔한 쪽도, 확인된 낭독 영상도 없다. evidence(제목·저자·등장인물·사건 세 마디·결말)에
// 적힌 것과 책 제목·레벨이 말해 주는 것만으로 만들었다. evidence에 없는 세부 사건은 묻지 않는다.
// [2026-09-29 정정] 최초의 evidence는 두 사람의 기억만으로 만들었는데, 둘 다 브라더가
// 무서워하고 엄마가 도와준다고 똑같이 잘못 기억했다. 학원 장서 목록의 한 줄 요약을 바닥으로
// 다시 확인한 결과 무서워한 건 시스터, 도와준 건 아빠였고, 계기는 무서운 책을 읽은 것이었다.
// 그 전 버전에 있던 "아빠가 증명하려다 겁먹고 엄마가 대신 도와준다"는 줄거리는 통째로
// 지어낸 것이라 전부 들어냈다. 아래 모든 문항은 바로잡은 evidence 안에서만 다시 썼다.
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
    source: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 두 사람의 기억 중 요약과 어긋나지 않는 것만 남겼다",
    characters: ["Papa Bear", "Sister Bear"],
    beats: [
      "Sister Bear reads a scary book",
      "afterward, she becomes afraid of the dark and cannot sleep at night",
      "Papa Bear comes up with good ideas to help her face and conquer her fear"
    ],
    ending: "Sister conquers her fear of the dark, thanks to Papa's help",
    checked: "두 사람의 기억을 학원 장서 목록의 한 줄 요약과 대조했고, 요약과 어긋난 부분(무서워한 인물·도와준 인물·발단)은 요약에 맞춰 바로잡았다 (2026-09-29)"
  },

  shadowing: { query: "\"The Berenstain Bears in the Dark\" read aloud" },

  // ── ① 단어 ─────────────────────────────────────────────
  // evidence 세 마디 안에서만 골랐다. 책에 없는 소품(야간등·그림자 등)을 예문으로 만들지 않는다.
  vocabulary: [
    { word: "scary",      pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/scary.mp3",      en: "frightening; causing fear", ko: "무서운", ex: "Sister Bear read a {{scary}} book before bed.", ex_ko: "시스터 베어는 자기 전에 무서운 책을 읽었어요.", pic: "📕" },
    { word: "afraid",     pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/afraid.mp3",     en: "feeling fear; worried that something bad might happen", ko: "무서워하는, 두려워하는", ex: "After that, she felt {{afraid}} of the dark.", ex_ko: "그 후로 그녀는 어둠을 무서워하게 되었어요.", pic: "😨" },
    { word: "darkness",   pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/darkness.mp3",   en: "the state of having no light", ko: "어둠", ex: "She could not sleep in the {{darkness}}.", ex_ko: "그녀는 어둠 속에서 잠을 이룰 수 없었어요.", pic: "🌑" },
    { word: "fear",       pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/fear.mp3",       en: "a strong feeling of being afraid", ko: "두려움, 공포", ex: "Sister could not shake off her {{fear}} of the dark.", ex_ko: "시스터는 어둠에 대한 두려움을 떨쳐낼 수 없었어요.", pic: "😟" },
    { word: "idea",       pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/idea.mp3",       en: "a plan or thought about what to do", ko: "생각, 아이디어", ex: "Papa Bear had some good {{ideas}} to help her.", ex_ko: "아빠 베어는 그녀를 도울 좋은 생각들이 있었어요.", pic: "💡" },
    { word: "helpful",    pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/helpful.mp3",    en: "useful; giving help", ko: "도움이 되는", ex: "Papa Bear had {{helpful}} ideas to help Sister.", ex_ko: "아빠 베어에게는 시스터를 도울 도움이 되는 생각들이 있었어요.", pic: "🤲" },
    { word: "comfort",    pos: "n.",   audio: "assets/audio/berenstain-bears-in-the-dark/comfort.mp3",    en: "a good feeling that comes when worry or fear goes away", ko: "위로, 편안함", ex: "A kind word can give a scared child {{comfort}}.", ex_ko: "다정한 말 한마디는 무서워하는 아이에게 위로가 될 수 있어요.", pic: "🤗" },
    { word: "face",       pos: "v.",   audio: "assets/audio/berenstain-bears-in-the-dark/face.mp3",       en: "to deal with something difficult instead of avoiding it", ko: "(문제·두려움에) 맞서다", ex: "With Papa's help, Sister learned to {{face}} her fear.", ex_ko: "아빠의 도움으로 시스터는 두려움에 맞서는 법을 배웠어요.", pic: "🧭" },
    { word: "conquer",    pos: "v.",   audio: "assets/audio/berenstain-bears-in-the-dark/conquer.mp3",    en: "to successfully deal with and overcome a problem or fear", ko: "극복하다, 이겨 내다", ex: "In the end, Sister {{conquered}} her fear of the dark.", ex_ko: "결국 시스터는 어둠에 대한 두려움을 극복했어요.", pic: "🏆" },
    { word: "calm",       pos: "adj.", audio: "assets/audio/berenstain-bears-in-the-dark/calm.mp3",       en: "quiet and peaceful, not worried or afraid", ko: "차분한, 평온한", ex: "It is hard to feel {{calm}} when you are afraid of the dark.", ex_ko: "어둠이 무서울 때는 차분한 마음을 갖기 어려워요.", pic: "😌" }
  ],

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What does Sister Bear do right before she becomes afraid of the dark?",
      frame: "She {{reads a scary book}}." },
    { ref: "beginning", skill: "사실찾기",  q: "How does Sister Bear feel afterward?",
      frame: "She becomes {{afraid of the dark}} and cannot {{sleep at night}}." },
    { ref: "middle", skill: "사실찾기",  q: "Who helps Sister Bear with her fear?",
      frame: "{{Papa Bear}} helps her by coming up with {{good ideas}}." },
    { ref: "middle", skill: "추론·예측", q: "Why do you think reading a scary book made Sister afraid of the dark?",
      frame: "It probably happened because {{the scary story stayed in her mind after the lights went out}}." },
    { ref: "end", skill: "사실찾기",  q: "What happens to Sister's fear by the end of the story?",
      frame: "She {{conquers her fear of the dark}}, thanks to Papa's help." },
    { ref: "end", skill: "평가·적용", q: "Do you think reading a scary book right before bed is a good idea? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "Who becomes afraid of the dark in this story?",
      a: ["Papa Bear", "Brother Bear", "Sister Bear", "Mama Bear"], c: 2,
      why_ko: "무서워한 건 브라더도 아빠도 아니에요. 어둠을 무서워하게 된 건 시스터 베어였어요.",
      why: "Not Brother, not Papa. Sister Bear is the one who becomes afraid of the dark." },
    { q: "What does Sister Bear do right before she becomes afraid of the dark?",
      a: ["She watches a movie", "She reads a scary book", "She hears a loud noise outside", "She gets lost in the woods"], c: 1,
      why_ko: "무서운 영화도, 큰 소리도 아니에요. 시스터가 무서운 책을 읽은 게 시작이었어요.",
      why: "Not a movie, not a loud noise. Reading a scary book is what starts it all." },
    { q: "How does Sister feel after reading the scary book?",
      a: ["Excited", "Afraid of the dark", "Hungry", "Bored"], c: 1,
      why_ko: "책을 읽고 난 뒤 시스터는 어둠이 무서워졌어요. 흥분하거나 배고픈 게 아니었어요.",
      why: "After the book, Sister feels afraid of the dark — not excited, not hungry." },
    { q: "What is Sister's problem at night?",
      a: ["She is too hot", "She cannot sleep because she is afraid of the dark", "She cannot find her toy", "She has a stomachache"], c: 1,
      why_ko: "더워서도 장난감을 못 찾아서도 아니에요. 어둠이 무서워서 잠을 못 자는 게 문제였어요.",
      why: "Not the heat, not a lost toy. Her problem is simple — the dark scares her and she cannot sleep." },
    { q: "Who helps Sister Bear with her fear?",
      a: ["Sister's friend", "Papa Bear", "A teacher", "Brother Bear"], c: 1,
      why_ko: "친구도 선생님도 아니에요. 시스터를 도와준 건 아빠 베어였어요.",
      why: "Not a friend, not a teacher. Papa Bear is the one who helps Sister." },
    { q: "What does Papa Bear do to help Sister?",
      a: ["He tells her to just ignore it", "He comes up with good ideas to help her", "He reads her another scary book", "He sends her to bed with no help at all"], c: 1,
      why_ko: "무시하라고 하거나 또 무서운 책을 읽어 준 게 아니에요. 아빠는 시스터를 도울 좋은 생각들을 냈어요.",
      why: "Not \"just ignore it,\" not another scary book. Papa comes up with good ideas to help her." },
    { q: "Why does Sister Bear need Papa's ideas?",
      a: ["She is afraid of the dark after reading a scary book", "She lost her favorite toy", "She wants to learn to cook", "She is late for school"], c: 0,
      why_ko: "무서운 책을 읽고 어둠이 무서워졌기 때문이에요. 아빠는 그 두려움을 이겨 내도록 도우려고 좋은 생각들을 냈어요.",
      why: "Sister reads a scary book and becomes afraid of the dark. Papa has good ideas to help her conquer that fear." },
    { q: "What happens to Sister's fear by the end of the story?",
      a: ["It gets worse", "She conquers her fear of the dark", "She moves to a new room", "She stays afraid forever"], c: 1,
      why_ko: "결국 시스터는 어둠에 대한 두려움을 극복해요. 좋은 결말이죠.",
      why: "Sister finally conquers her fear of the dark. A happy ending." },
    { q: "What is the main lesson of this story?",
      a: ["Scary books should never be read", "Good ideas and a caring parent can help you face a fear", "Fear never really goes away", "Only grown-ups can be afraid"], c: 1,
      why_ko: "주제 문제예요. 좋은 생각과 곁에서 도와주는 어른이 있으면 두려움에 맞설 수 있다는 게 이 책의 메시지예요.",
      why: "The theme: good ideas and a caring adult can help a child face a fear." },
    { q: "What might be a reason not to read a scary book right before bed?",
      a: ["Scary books are always boring", "A scary story can stay in your mind and make it hard to fall asleep", "Scary books never have pictures", "Scary books are too long to finish"], c: 1,
      why_ko: "무서운 이야기는 불을 끈 뒤에도 머릿속에 계속 남아서 잠들기 어렵게 만들 수 있어요. 이 책이 보여 준 것과 같은 이유예요.",
      why: "A scary story can linger in your mind after the lights go out. It fits what happens to Sister: she reads a scary book, then becomes afraid of the dark." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Sister Bear}}" },
      { k: "Wanted",   v: "{{to feel calm and fall asleep at night}}" },
      { k: "But",      v: "{{a scary book she read made her afraid of the dark}}" },
      { k: "So",       v: "{{Papa Bear came up with good ideas to help her face the fear}}" },
      { k: "Then",     v: "{{Sister conquered her fear of the dark}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Sister Bear reads a scary book.",
        frame: "Afterward, she becomes {{afraid of the dark}} and cannot {{fall asleep}}." },
      { label: "Middle",
        given: "",
        frame: "Papa Bear {{comes up with good ideas}} to help her." },
      { label: "End",
        given: "With Papa's help, Sister faces her fear.",
        frame: "She {{conquers her fear of the dark}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Berenstain Bears in the Dark",
    branches: [
      { label: "Sister Bear",    ask: "How does Sister feel after reading the scary book, and why?",
        deeper: "Can a story affect how we feel even after it ends?" },
      { label: "The Scary Book", ask: "What happens to Sister after she reads the scary book?",
        deeper: "Why might reading something scary right before bed make a fear feel bigger?" },
      { label: "Papa's Ideas",   ask: "What kind of person is Papa in this story?",
        deeper: "Why does having a caring helper make a fear easier to face?" },
      { label: "Conquering Fear", ask: "What does it mean to \"conquer\" a fear?",
        deeper: "Is a fear gone forever once you conquer it once?" },
      { label: "Me",             ask: "What helps you feel calm when you are scared?",
        deeper: "Who do you turn to when you are afraid?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Courage",
    relatedConcepts: ["Emotion", "Support"],
    globalContext: "Identities and relationships — how the people who care for us help us face our fears (우리를 돌보는 사람들은 두려움을 어떻게 함께 이겨 내도록 돕는가)",
    statement: "A caring adult's good ideas can help a child face and conquer a fear.",
    factual: [
      "Who becomes afraid of the dark in this story?",
      "What makes Sister Bear afraid of the dark?",
      "Who helps Sister Bear face her fear?",
      "What does Papa Bear do to help Sister?",
      "What happens to Sister's fear by the end of the story?"
    ],
    conceptual: [
      "Why might a scary story make it harder to feel calm at night?",
      "How can a good idea from someone who cares help a person feel braver?"
    ],
    debatable: [
      "Should children read scary books before bed?",
      "Can everyone conquer their fears, or are some fears too big?"
    ],
    learnerProfile: ["Caring", "Reflective", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Papa Bear came up with good ideas to help Sister conquer her fear of the dark. What do you think is the best way to help someone who is scared? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣을 것 · Use one scene from the book",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "A Caring Idea Can Help", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think a caring idea from someone you trust is the best way to help a person who is scared.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene.",
        eg: "In the book, Sister Bear became afraid of the dark after reading a scary book, and Papa came up with good ideas to help her.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that having someone who understands your fear and offers real help makes a big difference.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say you should just get used to being scared on your own, but Sister needed Papa's help to conquer her fear.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe caring help from someone you trust is the best way to face a fear.", lines: 2 }
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
      en: "Students retell how Sister Bear's fear of the dark begins with a scary book and how Papa helps her conquer it, then take a side on the best way to help someone who is scared.",
      ko: "시스터 베어가 무서운 책을 읽고 어둠을 두려워하게 된 과정과 아빠의 도움으로 극복하는 과정을 말하고, 무서워하는 사람을 돕는 가장 좋은 방법에 대해 편을 정해 쓴다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever felt scared after reading or watching something scary? What did you do?",
        do: "책을 펴기 전에 한다. 아이 경험에서 두려움을 먼저 꺼내야 이 책이 읽힌다. 두세 명만.",
        exp: "I turned on a light. / I told my mom.",
        stuck: "선생님이 먼저 한 문장 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "무서운 → scary / 두려움 → fear / 극복하다 → conquer",
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
        say: "Turn the question into the first half of your answer. 'What does Sister do...' becomes 'She...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "She reads a scary book.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question four asks WHY. Think about what happens in your own mind after you read something scary.",
        do: "추론 문항에서는 혼자 두지 않는다. 소리 내어 두 번 읽히고 같이 시작한다.",
        exp: "It probably happened because the scary story stayed in her mind after the lights went out.",
        stuck: "\"What did Sister read? What happens in your head after a scary story, even after you close the book?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Sister Bear / Wanted: to feel calm and sleep / But: a scary book made her afraid",
        stuck: "\"Who is afraid in this story? What does she want at night?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Papa's Ideas)", min: "",
        say: "Stop at Papa's Ideas. Don't just tell me that he helped — tell me why having a caring helper matters.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Because someone who cares can help a fear feel smaller and easier to face.",
        stuck: "\"You said what Papa did. Now — why did it help Sister feel braver?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should children read scary books before bed? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think it is not a good idea, because Sister's scary book is exactly what made her afraid at night.",
        stuck: "손을 들게 한다. \"Read scary books at night? Or not?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say you should just get used to being scared on your own, but Sister needed Papa's help.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Have you ever read or watched something scary right before bed? What happened?", ko: "자기 전에 무서운 걸 보거나 읽은 적이 있니? 어떻게 됐어?" },
        { en: "Who do you go to when you feel scared?", ko: "무서울 때 너는 누구에게 가니?" }
      ],
      during: [
        { en: "Why do you think the scary book made Sister afraid even after she closed it?", ko: "무서운 책을 덮은 뒤에도 시스터는 왜 계속 무서웠을까?" },
        { en: "What kind of ideas do you think Papa might come up with to help her?", ko: "아빠는 시스터를 돕기 위해 어떤 생각을 떠올렸을까?" }
      ],
      after: [
        { en: "What helped Sister conquer her fear?", ko: "무엇이 시스터가 두려움을 극복하도록 도왔을까?" },
        { en: "What helps you feel calm when you are scared?", ko: "무서울 때 너를 차분하게 만들어 주는 건 뭐니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "'Papa's Ideas' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
