// 리딩브레인 원서프로그램 — 1점대 책 (AR 1.5)
// 4점대(charlottes-web)와 같은 틀이지만 분량을 줄였다. 1점대는 이 정도가 한 주 분량이다.
//   단어 8개 / 독해 5문항 / 장면 3칸 / 마인드맵 4가지 / IB 질문 2개씩 / 논술 문장 4단
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S1212",
  slug: "green-eggs-and-ham",
  title: "Green Eggs and Ham",
  author: "Dr. Seuss",
  series: "Beginner Books",
  publisher: "Random House",
  level: { ar: "1.5", lexile: "210L", rb: "다독 1단계" },
  awards: [],
  defSource: "",   // 뜻을 직접 썼으면 비워 둔다.
  cover: "assets/covers/green-eggs-and-ham.jpg",

  shadowing: {
    query: "\"Green Eggs and Ham\" read aloud",
    searchUrl: "https://youtu.be/SZjZN7Rs3a8",
    qr: "assets/qr/green-eggs-and-ham.png",
    videos: [
      { url: "https://youtu.be/SZjZN7Rs3a8", title: "🍳Green Eggs and Ham Dr. Seuss best kids books read aloud", channel: "Toadstools and Fairy Dust", views: "3,960,354", length: "" },
      { url: "https://youtu.be/x1Kksn76jZk", title: "Green Eggs and Ham | Brand New Full Episode | Official Animated Read-Along | Dr. Seuss", channel: "Dr. Seuss", views: "4,803,852", length: "" },
      { url: "https://youtu.be/ItPdeUnu5UI", title: "Living Books - Green Eggs And Ham (Read To Me)", channel: "TSM Channel", views: "4,384,708", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "eggs",      pos: "n.", audio: "assets/audio/green-eggs-and-ham/eggs.mp3",       en: "the round or oval objects that baby birds, snakes, and fish come from", ko: "계란",            ex: "Sam-I-Am keeps offering {{eggs}} everywhere.", ex_ko: "샘 아이 앰은 계란을 계속 제안해요.", pic: "🥚" },
    { word: "ham",       pos: "n.", audio: "assets/audio/green-eggs-and-ham/ham.mp3",       en: "meat that comes from a pig", ko: "햄",             ex: "The {{ham}} comes with the eggs in the story.", ex_ko: "이야기에서 햄이 계란과 함께 나와요.", pic: "🍖" },
    { word: "green",     pos: "adj.", audio: "assets/audio/green-eggs-and-ham/green.mp3",   en: "the colour of grass and leaves", ko: "초록색의",      ex: "The {{green}} colour is unusual for eggs.", ex_ko: "초록색은 계란으로서는 특이한 색이에요.", pic: "💚" },
    { word: "try",       pos: "v.", audio: "assets/audio/green-eggs-and-ham/try.mp3",       en: "to do or taste something to see if you like it", ko: "(맛을) 보다",    ex: "Will you {{try}} tasting this new food?", ex_ko: "이 새로운 음식을 맛보고 싶니?", pic: "👅" },
    { word: "place",     pos: "n.", audio: "assets/audio/green-eggs-and-ham/place.mp3",     en: "a location or spot", ko: "장소",             ex: "Every {{place}} in the story is different.", ex_ko: "이야기 속 모든 장소가 달라요.", pic: "🏠" },
    { word: "here",      pos: "adv.", audio: "assets/audio/green-eggs-and-ham/here.mp3",    en: "in this spot; at this location", ko: "여기",            ex: "Will you stay {{here}} and eat with me?", ex_ko: "여기 있으면서 나와 함께 먹을래?", pic: "📍" },
    { word: "with",      pos: "prep.", audio: "assets/audio/green-eggs-and-ham/with.mp3",   en: "together with someone or something", ko: "함께, ~와 함께",  ex: "Come and share breakfast {{with}} me.", ex_ko: "와서 나와 함께 아침을 먹어 봐.", pic: "🤝" },
    { word: "like",      pos: "v.", audio: "assets/audio/green-eggs-and-ham/like.mp3",      en: "to enjoy or prefer something", ko: "좋아하다",       ex: "By the end, he discovers he {{like}}s it.", ex_ko: "마지막에 그는 그것이 좋다는 걸 깨달아요.", pic: "👍" }
  ],

  // ── ①-2 문법 ─────────────────────────
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "This is [[an]] egg and [[a]] meal.",
        why_ko: "모음 소리 앞에는 an, 나머지는 a! an egg, a meal. 철자가 아니라 소리로 판단해요.",
      why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "There is {{an}} apple on {{a}} table." },
      { name: "will", ko: "조동사 will",
        sent: "I [[will not]] eat it, but you [[will]] like it.",
        why_ko: "will은 미래 '~할 것이다', will not(won't)은 '안 할 거야!'라는 거절이에요. will 뒤에는 항상 동사원형!",
      why: "Use \"will\" to talk about the future. \"Will not\" means you refuse to do it.",
        try: "You {{will}} enjoy it, but I {{will not}} eat it." },
      { name: "Would you...?", ko: "의문문",
        sent: "[[Would you]] consider it? [[Would you]] taste this?",
        why_ko: "Would you ~? 는 '~하시겠어요?' 공손하게 권하는 말이에요. 뒤에는 동사원형: Would you try this?",
      why: "Start with \"Would you\" to ask someone politely to do something.",
        try: "{{Would you}} taste this? {{Would you}} come here?" }
    ],
    find: "책에서 would 가 들어간 문장을 세 개 찾아 쓰세요. · Find three sentences with \"would\".",
    exam: {
      choose: [
        {"q": "Would you eat (a / an) egg?", "a": "an", why_ko: "egg는 '에'라는 모음 소리로 시작해요. 모음 소리 앞에는 an! an egg." },
        {"q": "I (will not / not will) eat it here.", "a": "will not", why_ko: "부정은 조동사 바로 뒤에 not을 붙여요. not will이 아니라 will not!" },
        {"q": "Would you (try / tries) it with me?", "a": "try", why_ko: "Would you 뒤에는 동사원형! tries가 아니라 try를 써요." },
        {"q": "Now he (like / likes) green eggs and ham.", "a": "likes", why_ko: "he는 3인칭 단수예요. 현재형 동사에 -s를 붙여서 likes!" },
        {"q": "Sam-I-Am (is / are) very patient.", "a": "is", why_ko: "Sam-I-Am은 한 사람(단수)이에요. 그래서 are가 아니라 is!" }
      ],
      fix: [
        {"q": "I will not [[eats]] them in a box.", "a": "eat", why_ko: "will not 뒤에는 동사원형이에요. eats가 아니라 eat!" },
        {"q": "Would you [[likes]] them on a train?", "a": "like", why_ko: "Would you 뒤에는 동사원형이에요. likes가 아니라 like!" },
        {"q": "This is [[a]] egg.", "a": "an", why_ko: "egg는 모음 소리로 시작해요. a가 아니라 an egg로 고쳐야 해요." }
      ],
      write: [
        {"ko": "나는 그것을 먹지 않을 거야.", "cond": "will not, eat", "a": "I will not eat it.", why_ko: "'안 할 거야'는 will not + 동사원형이에요. I will not eat it." },
        {"ko": "기차에서 그것을 드시겠어요?", "cond": "Would you, on a train", "a": "Would you eat it on a train?", why_ko: "공손하게 '~하시겠어요?'는 Would you + 동사원형 ~? 이에요. Would you eat it on a train?" }
      ]
    }
  },

  // ── ② 독해 ────────────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What does the character refuse to eat?",
      frame: "The character refuses to eat {{green eggs and ham}}." },
    { ref: "beginning", skill: "사실찾기",  q: "Who keeps asking the character to try the food?",
      frame: "{{Sam-I-Am}} keeps asking him to eat it." },
    { ref: "middle", skill: "추론·예측", q: "Why does Sam-I-Am ask in many different situations?",
      frame: "He asks everywhere because {{he believes the character will eventually enjoy it}}." },
    { ref: "near end", skill: "사실찾기",  q: "What happens when the character finally eats it?",
      frame: "{{The character tastes it}} and {{discovers that he enjoys it}}." },
    { ref: "end", skill: "평가·적용", q: "Should you try something new before saying you do not like it? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제
  quiz: [
    { q: "Who is Sam-I-Am?",
      a: ["A pig", "A character who keeps offering green eggs and ham", "A green egg", "A farmer"], c: 1,
      why_ko: "샘 아이 앰은 계란과 햄을 자꾸 제안하는 등장인물이에요. 혼자 아무도 남은 게 아니지만 계속해요.",
      why: "Sam-I-Am is a character who keeps offering green eggs and ham to someone." },
    { q: "What colour are the eggs?",
      a: ["Yellow", "White", "Green", "Blue"], c: 2,
      why_ko: "제목부터 나와 있어요: Green Eggs and Ham. 초록색이 이 책의 가장 이상한 부분이에요.",
      why: "The title tells you. Green is the unusual thing about the eggs." },
    { q: "What is the character's answer when first asked?",
      a: ["Yes, I will", "Maybe later", "I will not try it", "Ask me again"], c: 2,
      why_ko: "처음엔 절대 거절해요. 하지만 이야기가 계속되면서 마음이 바뀌어요.",
      why: "He refuses at first. But his answer changes by the very end." },
    { q: "Where does everyone end up after the train crash?",
      a: ["In a house", "In the water", "On a hill", "At school"], c: 1,
      why_ko: "기차가 굴러떨어지면서 모두 물에 빠져요! 흠뻑 젖은 채로도 샘 아이 앰은 또 물어보죠. 끈질김 최강!",
      why: "The train crashes and everyone lands in the water. Even soaking wet, Sam-I-Am asks again." },
    { q: "Does the character ever like green eggs and ham?",
      a: ["No, never", "Yes, he likes them by the very end", "Maybe, he is not sure", "Only in one place"], c: 1,
      why_ko: "마지막에 그는 정말로 좋아한다는 걸 알게 돼요. 처음엔 절대 거절했지만요.",
      why: "By the end, he truly enjoys them. His \"no\" becomes a \"yes.\"" },
    { q: "Why does Sam-I-Am keep trying?",
      a: ["He has nothing else to do", "He believes the character will like it if he keeps asking", "He wants to be mean", "He is bored"], c: 1,
      why_ko: "샘 아이 앰은 상대방이 정말로 좋아할 거라고 생각해요. 그래서 절대 포기 안 해요.",
      why: "He genuinely believes his friend will enjoy it." },
    { q: "What would happen if the character never tried it?",
      a: ["Nothing would change", "He would never know he likes it", "He would be happy", "The story would be shorter"], c: 1,
      why_ko: "시도하지 않았으면 자신이 사실은 좋아한다는 걸 영원히 놓쳤을 거예요.",
      why: "He would never discover that he actually enjoys it." },
    { q: "Is this a realistic story?",
      a: ["Yes, it could happen to anyone", "Yes, trains often crash into water", "No, many silly things happen, like a fox and a goat on a train", "No, because nobody eats eggs"], c: 2,
      why_ko: "이건 현실이 아니라 말놀이 판타지예요. 여우, 쥐, 염소까지 등장하는 엉뚱한 장면이 줄줄이! 닥터 수스 책의 매력이죠.",
      why: "No. It is a playful, silly story with a fox, a mouse, and a goat along the way. That is the fun of Dr. Seuss." },
    { q: "What is the mood of this book?",
      a: ["Sad and angry", "Playful, fun, and silly", "Boring and quiet", "Scary and dark"], c: 1,
      why_ko: "닥터 수스는 웃기고 장난스러워요. 박자가 있고 리듬이 좋아요.",
      why: "It is playful and rhythmic. Dr. Seuss writes with fun and silly rhymes." },
    { q: "What is the main lesson of this book?",
      a: ["Green food is delicious", "Eggs and ham are perfect together", "Try new things before refusing them",
          "Cats should not eat eggs"], c: 2,
      why_ko: "새로운 것을 시도해 봐야 한다는 거예요. 단순히 거절하지 말고 용감해져야 해요.",
      why: "Try new things. Do not refuse without even tasting them." }
  ],

  // ── ③ 요약 지도 ─────────────────────────
  summaryMap: {
    setting: { place: "{{many different places in the story}}", time: "{{one day}}" },
    swbst: [
      { k: "Somebody", v: "{{Sam-I-Am}}" },
      { k: "Wanted",   v: "{{to get someone to try green eggs and ham}}" },
      { k: "But",      v: "{{the other character kept refusing}}" },
      { k: "So",       v: "{{Sam-I-Am asked in more and more places}}" },
      { k: "Then",     v: "{{the character finally tried it and liked it}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Sam-I-Am first asks if someone will try green eggs and ham.",
        frame: "The character answers {{\"I will not\"}} and {{refuses every time}}." },
      { label: "Middle",
        given: "",
        frame: "Sam-I-Am keeps asking {{in different places and situations}}, but the answer is {{still no}}." },
      { label: "End",
        given: "The character finally tastes the green eggs and ham.",
        frame: "He {{says he likes them}} and {{is glad he tried}}." }
    ]
  },

  // ── ④ 마인드맵 ───────────────────────────
  mindMap: {
    center: "Green Eggs and Ham",
    branches: [
      { label: "Sam-I-Am",   ask: "What does Sam-I-Am do in this story?",
        deeper: "Why does he never give up?" },
      { label: "The Other",  ask: "Why does he refuse at first?",
        deeper: "What makes him change his mind?" },
      { label: "Me",         ask: "When did you try something new and like it?",
        deeper: "What would you have missed if you said no?" },
      { label: "The World",  ask: "When do people refuse to try new things?",
        deeper: "What do they lose?" }
    ]
  },

  // ── ⑤ IB 탐구 ──────────────────────────────────────────
  ib: {
    keyConcept: "Perspective",
    relatedConcepts: ["Open-mindedness", "Experience"],
    globalContext: "Identities and relationships — being open to new experiences (새로운 경험에 열려 있기)",
    statement: "Refusing to try something new keeps you from discovering what you might love.",
    factual: [
      "What food does Sam-I-Am keep offering?",
      "What does the character say the first time Sam-I-Am asks?",
      "Where does Sam-I-Am ask him to try it?",
      "Where does everyone end up after the train crash?",
      "Does the character like it in the end?"
    ],
    conceptual: [
      "Why does the character change his mind?",
      "What does the book teach about trying new things?"
    ],
    debatable: [
      "Is it important to try new things?",
      "Who was right at the start — Sam-I-Am or the character?"
    ],
    learnerProfile: ["Thinker", "Open-minded", "Communicator"]
  },

  // ── ⑥ 쓰기 ─────────────────────────
  essay: {
    prompt: "Is it a good idea to try something new even if you think you will not like it? Write what you think.",
    conditions: [
      "3문장 이상 쓸 것 · Write at least 3 sentences",
      "because 를 한 번 쓸 것 · Use \"because\" once",
      "책에서 본 것을 한 가지 넣을 것 · Use one thing from the book"
    ],
    steps: [
      { part: "Title",       ask: "What is your writing about?",
        eg: "Trying New Things Is Good", lines: 1 },
      { part: "My Opinion",  ask: "What do you think? One sentence.",
        eg: "I think we should try new things.", lines: 2 },
      { part: "Because",     ask: "Why do you think so?",
        eg: "This is because we might like them.", lines: 2 },
      { part: "In the Book", ask: "What happened in the book?",
        eg: "In the book, the character found he liked green eggs and ham.", lines: 2 },
      { part: "Ending",      ask: "Say it again in a new way.",
        eg: "So I think trying is important.", lines: 2 }
    ],
    expressions: [
      "I think ...",
      "This is because ...",
      "In the book, ...",
      "So I think ..."
    ],
    rubric: [
      { c: "생각",  d: "내 생각을 한 문장으로 썼나요? · Did I write my opinion?" },
      { c: "까닭",  d: "because 를 써서 까닭을 말했나요? · Did I give a reason?" },
      { c: "근거",  d: "책에서 본 것을 넣었나요? · Did I use the book?" },
      { c: "글씨",  d: "대문자와 마침표를 다시 봤나요? · Capitals and periods?" }
    ]
  },

  // ── ⑦ 교사용 ───────────────────────────────────────────
  teaching: {
    goal: {
      en: "Students retell the story in three parts and say whether people should try new things, with one reason from the book.",
      ko: "이야기를 처음·가운데·끝 세 부분으로 말하고, 새로운 것을 시도해야 하는지 책 속 근거를 들어 말한다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "What is something new you tried and liked? Just say what it was.",
        do: "한 단어면 된다. 다섯 명쯤 빠르게 돌린다.",
        exp: "Pizza. / A new game. / Spicy food.",
        stuck: "선생님이 먼저 한 문장 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 여덟 개 중 네 개만 묻는다.",
        exp: "계란 → eggs / 햄 → ham / 초록색 → green",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "See this square? It is a QR code. Ask someone at home to scan it. Then read with the video, three times.",
        do: "1점대는 혼자 못 찍는다.",
        stuck: "교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Look at number one. It is already done, in grey. Now you do number two the same way.",
        do: "1번을 손가락으로 짚어 주고 2번으로 바로 넘긴다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~32분",
        say: "Read the question. Then read the grey words. The grey words start your answer for you.",
        do: "회색 글씨가 앞부분을 준다는 것을 알려 준다.",
        exp: "The character refuses to eat green eggs and ham.",
        stuck: "회색 부분을 선생님이 읽어 주고 \"Now finish it.\"" },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the picture that proves it.",
        do: "1점대는 글이 아니라 그림에서 찾는다.",
        stuck: "\"Find Sam-I-Am. Show me the picture.\"" },

      { stage: "Grammar", min: "32~42분",
        say: "Look at the red words. Read them out loud with me. A egg. An egg.",
        do: "같이 소리 내어 읽는다.",
        exp: "a / an",
        stuck: "손뼉을 치며 다시 읽는다. \"a-egg? No. an-egg. Yes.\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then YOU TRY. Write your own.",
        do: "규칙을 외우게 하지 않는다.",
        exp: "There is an apple on a table.",
        stuck: "\"Apple — a or an?\" 하나만 같이 하고 나머지는 맡긴다." },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book. Find three sentences with 'would'. Write them down.",
        do: "책을 다시 펴게 하는 것이 목적이다.",
        stuck: "\"Look at the beginning. 'Would you...'\"" },

      { stage: "Exam Grammar", min: "42~50분",
        say: "Same grammar, but this is how a test asks it. Write only the answer on the right.",
        do: "답만 쓰게 한다.",
        stuck: "1번을 같이 푼다." },

      { stage: "Exam Grammar", min: "",
        say: "Section three is Korean. Use the words in the grey box. All of them.",
        do: "조건 영작이다.",
        exp: "I will like it.",
        stuck: "한국어를 영어 순서로 다시 읽어 준다." },

      { stage: "Summary Map", min: "50~60분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. The whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 같이 외우게 한다.",
        exp: "Somebody: Sam-I-Am / Wanted: to get someone to try / But: they said no",
        stuck: "\"Who asks the questions?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다." },

      { stage: "Mind Map", min: "60~70분",
        say: "Top lines first. Those answers are in the book. Go fast.",
        do: "윗줄은 5분. 그림을 그려도 좋다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't tell me what he did — tell me why.",
        do: "→ 칸에서 반드시 멈춘다.",
        exp: "Because he believed the character would like it.",
        stuck: "\"You said what he did. Now — why?\"" },

      { stage: "IB Inquiry", min: "70~78분",
        say: "Step 1, the book answers it. Step 2, you think a little. Step 3, only you know.",
        do: "세 단을 아주 짧게 말한다.",
        stuck: "질문을 하나씩 읽어 주고 \"Book? Or you?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should you try new things? Yes or no. Pick one.",
        do: "1·2단은 말로만. 3단만 글로.",
        exp: "Yes, because the character found he liked green eggs and ham.",
        stuck: "손을 들게 한다. \"Yes? No?\"" },

      { stage: "Writing", min: "78~92분",
        say: "Read the conditions out loud with me. If one is missing, you are not finished.",
        do: "조건을 같이 소리 내어 읽는다.",
        stuck: "조건을 손가락으로 하나씩 세게 한다." },

      { stage: "Writing", min: "",
        say: "Say what you think first. Then tell me one thing from the book.",
        do: "의견 → 근거 순서만 잡아 준다.",
        exp: "I think we should try new things. In the book, the character liked it when he tried.",
        stuck: "\"I think...\" 를 칠판에 써 준다." },

      { stage: "Wrap-up", min: "92~100분",
        say: "Two people. Read your first sentence only.",
        do: "첫 문장만 발표시킨다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "Have you ever refused to try something and later wish you had?", ko: "거절했는데 나중에 후회한 게 있니?" },
        { en: "What makes it hard to try something new?", ko: "새로운 걸 시도하기 어렵게 하는 게 뭘까?" }
      ],
      during: [
        { en: "Why does Sam-I-Am not give up?", ko: "샘 아이 앰은 왜 포기하지 않을까?" },
        { en: "How does the character feel when he finally tries it?", ko: "마침내 먹었을 때 기분이 어떨까?" }
      ],
      after: [
        { en: "Was the character's mind change a good thing?", ko: "그의 마음이 바뀐 게 좋은 일이었을까?" },
        { en: "What does this book teach you?", ko: "이 책이 너한테 무엇을 가르칠까?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다." },
      { sheet: "Comprehension", point: "책을 펴 놓고 푼다.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",       point: "빨간 부분만 같이 읽고 바로 옆 칸을 시킨다.", miss: "규칙을 외우려 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Writing",       point: "3문장. 조건은 because 하나만 본다.", miss: "한 문장 쓰고 멈춘다." }
    ],
    scoring: [
      { c: "생각 Opinion", pt: 5, yes: "내 생각을 한 문장으로 썼다",       no: "무슨 생각인지 알 수 없다" },
      { c: "까닭 Reason",  pt: 5, yes: "because 를 써서 까닭을 말했다",    no: "까닭이 없다" },
      { c: "근거 Book",    pt: 5, yes: "책에서 본 것을 한 가지 넣었다",     no: "책과 상관없다" },
      { c: "글씨 Writing", pt: 5, yes: "대문자로 시작하고 마침표로 끝났다", no: "대문자·마침표가 없다" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "샘 아이 앰이 계속 권하는 장면", "text": "Sam-I-Am has a plate of green eggs and ham. He asks a grumpy fellow to [[taste|try]] it. \"No!\" says the fellow. \"I do not [[enjoy|like]] them!\" Sam asks in a house, in a box, and on a train. Every [[spot|place]] gets a no. At last, the fellow takes one small bite. \"I [[enjoy|like]] green eggs and ham!\" he says."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Who We Are",
 "themeKo": "우리는 누구인가",
 "profile": [
  {
   "attr": "Risk-taker",
   "how": "Try something new before saying 'I do not like it.'"
  },
  {
   "attr": "Open-minded",
   "how": "Notice how one small try changes a strong opinion."
  }
 ],
 "hook": [
  "Bring a covered plate: would you eat it if it were green? Hands up.",
  "Chart: foods I did not like before, but like now."
 ],
 "connections": [
  {
   "subject": "Health",
   "idea": "Healthy foods and trying new tastes. A class tasting chart."
  },
  {
   "subject": "Phonics",
   "idea": "Rhyme families from the book: -am, -ox, -ouse, -ain."
  },
  {
   "subject": "Mathematics",
   "idea": "Tally and graph: who likes which food?"
  }
 ],
 "speaking": [
  "Chant the rhyme in two groups: Sam and the grumpy friend.",
  "Ask a partner: Would you, could you ...? Answer with a reason."
 ],
 "writing": [
  "Write a new page: I will not eat them ... (add your own rhyme).",
  "Make a menu of three strange foods with describing words."
 ]
};
