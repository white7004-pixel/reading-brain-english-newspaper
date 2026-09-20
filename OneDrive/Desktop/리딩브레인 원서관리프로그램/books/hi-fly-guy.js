// 리딩브레인 원서프로그램 — 1점대 책 (AR 1.5)
// 4점대(charlottes-web)와 같은 틀이지만 분량을 줄였다. 1점대는 이 정도가 한 주 분량이다.
//   단어 12개 → 8개 / 독해 8문항 → 5문항 / 장면 7칸 → 3칸 / 마인드맵 6가지 → 4가지
//   IB 질문 3개씩 → 2개씩 / 논술 PEEL 5단 → 문장 4단
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S1624",
  slug: "hi-fly-guy",
  title: "Hi! Fly Guy",
  author: "Tedd Arnold",
  series: "Fly Guy #1 · Scholastic Reader Level 2",
  publisher: "Scholastic",
  level: { ar: "1.5", lexile: "380L", rb: "다독 1단계" },
  awards: ["Theodor Seuss Geisel Honor 2006"],
  defSource: "",   // 뜻을 직접 썼으면 비워 둔다. 사전에서 가져왔으면 출처를 적는다.
  cover: "assets/covers/hi-fly-guy.jpg",

  shadowing: {
    query: "\"Hi! Fly Guy\" read aloud",
    searchUrl: "https://youtu.be/nsei6emyifQ",
    qr: "assets/qr/hi-fly-guy.png",
    videos: [
      { url: "https://youtu.be/nsei6emyifQ", title: "Fly Guy #1:  Hi! Fly Guy", channel: "KidTimeStoryTime", views: "229,585", length: "" },
      { url: "https://youtu.be/_6W1VoZTOZY", title: "Hi fly guy.", channel: "Bryan Ramirez", views: "134,233", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 1점대는 사전 문장을 쓰지 않는다. 사전의 fly 첫 뜻은 "물레의 실 꼬는 팔" 이고
  // 파리 뜻도 "insect of the order Diptera" 라 8살이 못 읽는다. 그 나이 말로 직접 쓴다.
  vocabulary: [
    { word: "pet",    pos: "n.", audio: "assets/audio/hi-fly-guy/pet.mp3",   en: "an animal you keep at home and take care of", ko: "반려동물",        ex: "Buzz wanted a {{pet}} for the show.", ex_ko: "버즈는 대회에 데려갈 반려동물을 원했어요.", pic: "🐶" },
    { word: "fly",    pos: "n.", audio: "assets/audio/hi-fly-guy/fly.mp3",   en: "a small insect with wings that buzzes around", ko: "파리",            ex: "A {{fly}} flew around the trash can.", ex_ko: "파리 한 마리가 쓰레기통 주위를 날아다녔어요.", pic: "🪰" },
    { word: "jar",    pos: "n.", audio: "assets/audio/hi-fly-guy/jar.mp3",   en: "a glass container with a wide mouth and a lid", ko: "병, 단지",         ex: "Buzz caught the fly in a {{jar}}.", ex_ko: "버즈는 병으로 파리를 잡았어요.", pic: "🍯" },
    { word: "lid",    pos: "n.", audio: "assets/audio/hi-fly-guy/lid.mp3",   en: "the top that covers a jar, box, or pot", ko: "뚜껑",            ex: "He put a {{lid}} on the jar.", ex_ko: "그는 병에 뚜껑을 덮었어요." },
    { word: "smart",  pos: "adj.", audio: "assets/audio/hi-fly-guy/smart.mp3", en: "able to learn and understand things quickly", ko: "똑똑한",           ex: "Buzz said his fly was very {{smart}}.", ex_ko: "버즈는 자기 파리가 아주 똑똑하다고 말했어요.", pic: "🧠" },
    { word: "judge",  pos: "n.", audio: "assets/audio/hi-fly-guy/judge.mp3",   en: "a person who decides who wins", ko: "심사위원",         ex: "The {{judge}} looked at every pet.", ex_ko: "심사위원이 반려동물을 하나하나 살펴봤어요.", pic: "🧑‍⚖️" },
    { word: "prize",  pos: "n.", audio: "assets/audio/hi-fly-guy/prize.mp3",   en: "something you win when you do well", ko: "상, 상품",         ex: "Fly Guy won a {{prize}} at the show.", ex_ko: "플라이 가이는 대회에서 상을 받았어요.", pic: "🏆" },
    { word: "trick",  pos: "n.", audio: "assets/audio/hi-fly-guy/trick.mp3",   en: "a clever thing a person or animal can do", ko: "재주",            ex: "Fly Guy did a {{trick}} for everyone.", ex_ko: "플라이 가이는 모두에게 재주를 보여 줬어요.", pic: "🎩" }
  ],

  // ── ①-2 문법 (영영문법 1장 + 입시문법 1장) ─────────────
  // 문장은 책의 장면으로 만든 것이다. [[ ]] 가 빨간 밑줄, {{ }} 가 학생이 채우는 칸.
  // 1점대는 관사·조동사·과거형 셋이면 충분하다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Buzz wanted [[a]] pet, and he found [[an]] amazing one.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 판단하는 게 포인트예요. an amazing, a pet.",
      why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I have {{a}} dog and {{an}} apple." },
      { name: "Past Simple (-ed)", ko: "과거형 (규칙)",
        sent: "Buzz [[looked]] everywhere and [[opened]] the jar.",
        why_ko: "이미 끝난 일은 동사 끝에 -ed를 붙여요. look → looked, open → opened. 시험에 '어제(yesterday)'가 보이면 과거형 신호!",
      why: "When something already finished, most verbs add -ed: look → looked.",
        try: "Yesterday Buzz {{wanted}} a pet and {{called}} his friend." },
      { name: "can", ko: "조동사 can",
        sent: "Fly Guy [[can say]] one word, and it is \"BUZZ!\"",
        why_ko: "can 뒤에는 동사원형만 와요. can says(X), can say(O). 부정은 cannot, 이것만 기억하면 내신 만점!",
      why: "After \"can\", the verb never changes: can say, can fly, can go.",
        try: "A fly {{can fly}}, but it {{cannot talk}} like us." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Buzz caught (a / an) fly in the jar.", a: "a", why_ko: "fly는 '플'로 자음 소리로 시작해요. 자음 소리 앞에는 a! 그래서 a fly예요." },
        { q: "Fly Guy (can say / can says) his name.", a: "can say", why_ko: "can 뒤에는 무조건 동사원형! says가 아니라 say를 써야 해요." },
        { q: "Buzz (look / looked) for a pet yesterday.", a: "looked", why_ko: "yesterday(어제)가 보이면 과거형 신호예요. look에 -ed를 붙여 looked!" },
        { q: "The judges (was / were) very surprised.", a: "were", why_ko: "judges는 여러 명(복수)이에요. 복수 주어의 과거 be동사는 were!" },
        { q: "This is (a / an) amazing pet!", a: "an", why_ko: "amazing은 '어'라는 모음 소리로 시작해요. 모음 소리 앞에는 an! 그래서 an amazing pet." }
      ],
      fix: [
        { q: "Fly Guy [[can flies]] very fast.", a: "can fly", why_ko: "can 뒤에는 동사원형이에요. flies가 아니라 fly! can fly가 맞아요." },
        { q: "Buzz [[want]] a pet last week.", a: "wanted", why_ko: "last week(지난주)는 과거예요. want에 -ed를 붙여 wanted로 고쳐야 해요." },
        { q: "A fly is [[a]] insect.", a: "an", why_ko: "insect는 '인'이라는 모음 소리로 시작해요. 그래서 a가 아니라 an insect!" }
      ],
      write: [
        { ko: "파리도 애완동물이 될 수 있다.", cond: "can, be a pet", a: "A fly can be a pet.", why_ko: "'~할 수 있다'는 can + 동사원형이에요. A fly can be a pet. be를 빠뜨리지 마세요!" },
        { ko: "버즈는 어제 파리를 잡았다.", cond: "catch, yesterday", a: "Buzz caught a fly yesterday.", why_ko: "catch는 불규칙 동사라서 과거형이 caught예요. catched라고 쓰면 틀려요!" }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // 1점대는 쪽수로 적는다. 챕터가 짧아 쪽수가 더 찾기 쉽다.
  comprehension: [
    { ref: "ch. 1", skill: "사실찾기",  q: "What did Buzz want to find?",
      frame: "Buzz wanted to find {{a pet}} for the pet show." },
    { ref: "ch. 1", skill: "사실찾기",  q: "Where did Buzz put the fly?",
      frame: "Buzz put the fly {{in a jar}}." },
    { ref: "ch. 1", skill: "추론·예측", q: "Why did Buzz think the fly was smart?",
      frame: "Buzz thought the fly was smart because {{it said his name}}." },
    { ref: "ch. 2", skill: "사실찾기",  q: "What did people say about a fly as a pet?",
      frame: "People said that {{a fly cannot be a pet}}." },
    { ref: "ch. 3", skill: "평가·적용", q: "Was Fly Guy a good pet? Say what you think.",
      frame: "I think Fly Guy {{was / was not}} a good pet because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  // 1점대다. 문장을 짧게, 보기도 짧게. 한 줄 안에 들어가야 한다.
  quiz: [
    { q: "What is the boy's name?",
      a: ["Buzz", "Fly Guy", "Sam", "Tedd"], c: 0,
      why_ko: "헷갈리기 딱 좋은 문제예요! 남자아이가 Buzz, 파리가 Fly Guy 랍니다. 아이 이름과 파리 이름을 바꿔 쓰면 안 돼요. 표지 그림을 떠올려 보세요.",
      why: "Careful here. The boy is Buzz. The fly is Fly Guy. Do not swap the two names." },
    { q: "What was Buzz looking for?",
      a: ["A jar", "A pet", "His mom", "A prize"], c: 1,
      why_ko: "버즈가 병을 들고 뛰어다닌 이유가 뭐였죠? 애완동물 대회에 나갈 pet 을 찾으려던 거예요. 병은 그냥 도구일 뿐이에요.",
      why: "Why is Buzz running around with a jar? He wants a pet for the pet show. The jar is only a tool." },
    { q: "What did Buzz catch?",
      a: ["A bee", "A frog", "A bird", "A fly"], c: 3,
      why_ko: "벌도 아니고 개구리도 아니에요. 버즈가 병에 잡은 건 파리, fly 예요. 제목에도 Fly Guy 라고 딱 나와 있죠!",
      why: "Not a bee, not a frog. He catches a fly and puts it in the jar. The title says it: Fly Guy!" },
    { q: "Where did Buzz put the fly?",
      a: ["In a jar", "In a box", "In his pocket", "In a cage"], c: 0,
      why_ko: "병 in a jar 에 넣고 뚜껑까지 딱 닫았어요. 날아가지 못하게요. 상자도 주머니도 아니에요.",
      why: "In a jar, with a lid on top so it cannot fly away. Not a box, not a pocket." },
    { q: "What can Fly Guy say?",
      a: ["\"HI\"", "\"PET\"", "\"BUZZ\"", "Nothing"], c: 2,
      why_ko: "여기가 이 책에서 제일 재미있는 부분이에요! 파리가 BUZZ 하고 소리를 내는데, 그게 바로 남자아이 이름이에요. 그래서 그냥 파리가 아니라 특별한 파리가 된 거죠.",
      why: "This is the fun part. The fly buzzes \"BUZZ\" — and that is the boy's name. That is what makes him special." },
    { q: "What did people say about a fly?",
      a: ["A fly is smart", "A fly cannot be a pet", "A fly is pretty", "A fly is big"], c: 1,
      why_ko: "어른들은 파리는 애완동물이 될 수 없다고 했어요. 그런데 버즈가 보여 줬죠? 어른들이 틀렸다는 걸요. 이 장면 꼭 기억하세요.",
      why: "The grown-ups say a fly cannot be a pet. Buzz proves them wrong. Remember that scene." },
    { q: "What did Fly Guy do at the pet show?",
      a: ["He flew away", "He went to sleep", "He said Buzz's name", "He ate the food"], c: 2,
      why_ko: "모두가 보는 앞에서 BUZZ 하고 이름을 불렀어요. 도망간 것도, 잠든 것도 아니에요. 바로 이 순간에 심사위원들 마음이 바뀌었어요.",
      why: "In front of everyone he says \"BUZZ\". He does not fly away and he does not sleep. That is the moment the judges change their minds." },
    { q: "What did Fly Guy win?",
      a: ["A prize", "A jar", "Some food", "Nothing"], c: 0,
      why_ko: "상, prize 를 받았어요! 세상에서 제일 작은 애완동물이 상을 탄 거예요. 통쾌하죠?",
      why: "He wins a prize. The smallest pet at the show takes home an award." },
    { q: "How did Buzz feel at the end?",
      a: ["Sad", "Angry", "Scared", "Happy"], c: 3,
      why_ko: "내 친구가 상을 받고, 모두가 특별하다고 인정해 줬어요. 그럼 기분이 어떻겠어요? 당연히 happy 죠!",
      why: "His friend wins and everyone sees he is special. Of course he feels happy." },
    { q: "What is this story really about?",
      a: ["Flies are dirty", "Pet shows are fun",
          "Something small can still be special", "Jars are good for pets"], c: 2,
      why_ko: "주제 문제는 늘 한 걸음 뒤에서 봐야 해요. 파리는 작아요. 하지만 진짜 친구였죠. 작아도 특별할 수 있다, 이게 이 책이 하고 싶은 말이에요.",
      why: "Step back for the theme. A fly is tiny — but he is a real friend. Something small can still be special." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 1점대는 처음·가운데·끝 세 칸이면 충분하다.
  summaryMap: {
    setting: { place: "{{Buzz's house and the pet show}}", time: "{{one day}}" },
    swbst: [
      { k: "Somebody", v: "{{Buzz, a boy}}" },
      { k: "Wanted",   v: "{{to find a pet for the pet show}}" },
      { k: "But",      v: "{{people said a fly cannot be a pet}}" },
      { k: "So",       v: "{{Buzz showed them that the fly knew his name}}" },
      { k: "Then",     v: "{{Fly Guy won a prize}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Buzz looks for a pet for the pet show.",
        frame: "He catches a fly and calls him {{Fly Guy}}." },
      { label: "Middle",
        given: "",
        frame: "People say {{a fly cannot be a pet}}, but Buzz says {{Fly Guy is smart}}." },
      { label: "End",
        given: "Fly Guy says Buzz's name in front of everyone.",
        frame: "So Fly Guy {{wins a prize at the pet show}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 1점대는 네 가지. 윗줄은 책에서 찾고, → 칸에서 한 발 더 들어간다.
  mindMap: {
    center: "Hi! Fly Guy",
    branches: [
      { label: "Buzz",      ask: "What does Buzz do to keep Fly Guy?",
        deeper: "Why does he try so hard?" },
      { label: "Fly Guy",   ask: "What can Fly Guy do that other flies cannot?",
        deeper: "Does that make him a pet?" },
      { label: "Me",        ask: "What pet do you want? Draw or write it.",
        deeper: "Why that one and not another?" },
      { label: "The World", ask: "Which animals do people call 'bad'?",
        deeper: "Is that fair to the animal?" }
    ]
  },

  // ── ⑤ IB 탐구 ──────────────────────────────────────────
  ib: {
    keyConcept: "Perspective",
    relatedConcepts: ["Point of view", "Character"],
    globalContext: "Identities and relationships — who counts as a friend (누구를 친구라 부르는가)",
    statement: "The same animal can be a pest to one person and a friend to another.",
    factual: [
      "What kind of animal is Fly Guy?",
      "What word does Fly Guy say?"
    ],
    conceptual: [
      "Why do most people not want a fly?",
      "How does Buzz change their minds?"
    ],
    debatable: [
      "Can a fly be a pet?",
      "Is an animal bad just because we do not like it?"
    ],
    learnerProfile: ["Thinker", "Caring", "Open-minded", "Communicator"]
  },

  // ── ⑥ 쓰기 (1점대 — 문장 쓰기) ─────────────────────────
  essay: {
    prompt: "Can a fly be a pet? Write what you think.",
    conditions: [
      "3문장 이상 쓸 것 · Write at least 3 sentences",
      "because 를 한 번 쓸 것 · Use \"because\" once",
      "책에서 본 것을 한 가지 넣을 것 · Use one thing from the book"
    ],
    steps: [
      { part: "Title",       ask: "What is your writing about?",
        eg: "Fly Guy Is a Real Pet", lines: 1 },
      { part: "My Opinion",  ask: "What do you think? One sentence.",
        eg: "I think a fly can be a pet.", lines: 2 },
      { part: "Because",     ask: "Why do you think so?",
        eg: "This is because Fly Guy knows Buzz's name.", lines: 2 },
      { part: "In the Book", ask: "What happened in the book?",
        eg: "In the book, Fly Guy said \"BUZZ\" in front of everyone.", lines: 2 },
      { part: "Ending",      ask: "Say it again in a new way.",
        eg: "So I think Fly Guy is a good pet.", lines: 2 }
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
      en: "Students retell the story in three parts and say whether a fly can be a pet, with one reason from the book.",
      ko: "이야기를 처음·가운데·끝 세 부분으로 말하고, 파리가 반려동물이 될 수 있는지 책 속 근거를 들어 말한다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    // 1점대다. 말을 짧게 하고, 한 번에 하나만 시킨다.
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Do you have a pet? What is it? Just say the animal.",
        do: "한 단어면 된다. 문장으로 말하라고 하지 않는다. 다섯 명쯤 빠르게 돌린다.",
        exp: "A dog. / A cat. / No pet.",
        stuck: "선생님이 먼저 말한다. \"I have a cat. Her name is Nabi.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 여덟 개 중 네 개만 묻는다. 다 물으면 지친다.",
        exp: "뚜껑 → lid / 상 → prize / 재주 → trick",
        stuck: "그림처럼 설명한다. \"It goes on top of a jar. What is it?\"" },

      { stage: "Word List", min: "",
        say: "See this square? It is a QR code. Ask someone at home to scan it. Then read with the video, three times.",
        do: "1점대는 혼자 못 찍는다. '집에 있는 어른에게 부탁해라'까지 말해 준다.",
        stuck: "교실 화면으로 30초만 같이 듣는다. 소리를 한 번 들려주는 것이 목적이다." },

      { stage: "Word Test", min: "12~20분",
        say: "Look at number one. It is already done, in grey. Now you do number two the same way.",
        do: "1번을 손가락으로 짚어 주고 2번으로 바로 넘긴다. 설명은 하지 않는다.",
        stuck: "첫 글자를 알려 준다. \"It starts with p.\" 1점대는 첫 글자면 충분하다." },

      { stage: "Comprehension", min: "20~32분",
        say: "Read the question. Then read the grey words. The grey words start your answer for you.",
        do: "회색 글씨가 앞부분을 준다는 것을 알려 준다. 이게 이 학년의 서술형 훈련이다.",
        exp: "Buzz wanted to find a pet for the pet show.",
        stuck: "회색 부분을 선생님이 읽어 주고 \"Now finish it.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the picture that proves it.",
        do: "1점대는 글이 아니라 그림에서 찾는다. 그림을 짚게 하는 것으로 충분하다.",
        stuck: "\"Find the jar. What page?\" 찾을 물건을 하나 정해 준다." },

      { stage: "Grammar", min: "32~42분",
        say: "Look at the red words. Read them out loud with me. A pet. An amazing pet.",
        do: "같이 소리 내어 읽는다. 1점대는 귀로 먼저 안다. 설명은 그 다음이다.",
        exp: "a / an",
        stuck: "손뼉을 치며 다시 읽는다. \"a-pet. an-apple.\" 소리 차이를 몸으로 느끼게 한다." },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then YOU TRY. Write your own.",
        do: "규칙을 외우게 하지 않는다. 한 문장만 쓰면 그 문법은 끝난 것이다.",
        exp: "I have a dog and an apple.",
        stuck: "\"Dog — d. Is d a vowel? No. So...\" 하나만 같이 하고 나머지는 맡긴다." },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book. Find three words ending in -ed. Write them down.",
        do: "책을 다시 펴게 하는 것이 목적이다. 세 개면 충분하다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look at the first page. Buzz looked...\" 하나를 찾아 준다." },

      { stage: "Exam Grammar", min: "42~50분",
        say: "Same grammar, but this is how a test asks it. Write only the answer on the right. One word is enough.",
        do: "답만 쓰게 한다. 문장을 통째로 옮겨 적는 아이가 반드시 나온다. 시작 전에 말해 둔다.",
        stuck: "1번을 같이 푼다. \"fly — f. a or an?\"" },

      { stage: "Exam Grammar", min: "",
        say: "Section three is Korean. Use the words in the grey box. All of them.",
        do: "조건 영작이다. 조건 단어를 다 썼는지만 본다. 철자는 넘어간다.",
        exp: "A fly can be a pet.",
        stuck: "한국어를 영어 순서로 다시 읽어 준다. \"파리는 / 될 수 있다 / 애완동물이.\"" },

      { stage: "Summary Map", min: "50~60분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. The whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 같이 소리 내어 읽는다. 리듬으로 외우게 한다.",
        exp: "Somebody: Buzz / Wanted: a pet / But: people said a fly is not a pet",
        stuck: "\"Who is the boy? What did he want?\" 두 칸만 채우면 나머지가 따라온다." },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like the story?",
        do: "소리 내어 읽히면 안 맞는 칸을 아이가 스스로 찾는다. 고쳐 주지 않는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 된다." },

      { stage: "Mind Map", min: "60~70분",
        say: "Top lines first. Those answers are in the book. Go fast.",
        do: "윗줄은 5분. 그림을 그려도 좋다고 말해 준다. 1점대는 글보다 그림이 먼저다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't tell me what happened. Tell me why.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 한 단어로 답해도 받아 준다.",
        exp: "Because Fly Guy knows his name.",
        stuck: "\"You said what he did. Now — why?\" 'why' 하나만 반복한다." },

      { stage: "Mind Map", min: "",
        say: "'Me' and 'The World' — no wrong answer. But tell me one reason. Just one.",
        do: "이 두 가지는 발표시킨다. 다른 아이 답을 들으면 자기 답이 자란다.",
        stuck: "선생님이 먼저 자기 답을 한 문장 한다. 어른이 먼저 말하면 아이가 따라 한다." },

      { stage: "IB Inquiry", min: "70~78분",
        say: "Step 1, the book tells you. Step 2, you think a little. Step 3, only you know the answer.",
        do: "세 단을 아주 짧게 말한다. 1점대는 이 한 줄이면 된다. 칠판에 계단 세 개를 그려 준다.",
        stuck: "질문을 하나씩 읽어 주고 \"Book? Or you?\" 두 가지로만 묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "Can a fly be a pet? Yes or no. Pick one. You cannot say 'maybe' today.",
        do: "1·2단은 말로만. 3단만 글로 받는다. 중립을 허용하면 글이 안 나온다.",
        exp: "Yes, because Fly Guy can say Buzz's name.",
        stuck: "손을 들게 한다. \"Yes? No?\" 몸으로 정하면 글이 나온다." },

      { stage: "Writing", min: "78~92분",
        say: "Read the conditions out loud with me. If one is missing, you are not finished.",
        do: "조건을 같이 소리 내어 읽는다. 1점대도 조건 세기는 지금부터 훈련한다.",
        stuck: "조건을 손가락으로 하나씩 세게 한다. 다 쓴 뒤에도 다시 세게 한다." },

      { stage: "Writing", min: "",
        say: "Say what you think first. Then tell me one thing from the book.",
        do: "의견 → 근거 순서만 잡아 준다. 1점대는 이 두 칸이면 논술의 시작이다.",
        exp: "I think a fly can be a pet. In the book, Fly Guy said BUZZ.",
        stuck: "\"I think...\" 를 칠판에 써 준다. 앞 세 글자만 있으면 쓴다." },

      { stage: "Wrap-up", min: "92~100분",
        say: "Two people. Read your first sentence. Just the first one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Do you have a pet? What is its name?", ko: "반려동물이 있니? 이름이 뭐야?" },
        { en: "What animal would NOT be a good pet? Why?", ko: "어떤 동물은 반려동물로 안 좋을까? 왜?" },
        { en: "Is a fly a good animal or a bad animal?", ko: "파리는 좋은 동물일까, 나쁜 동물일까?" }
      ],
      during: [
        { en: "Why does Buzz think this fly is special?", ko: "버즈는 왜 이 파리가 특별하다고 생각하지?" },
        { en: "How would you feel if nobody believed you?", ko: "아무도 네 말을 믿어 주지 않으면 기분이 어떨까?" }
      ],
      after: [
        { en: "Who was right — Buzz or the grown-ups?", ko: "누가 맞았을까 — 버즈일까, 어른들일까?" },
        { en: "What makes an animal a pet?", ko: "무엇이 동물을 '반려동물'로 만들까?" },
        { en: "Is there something you love that others think is strange?", ko: "남들은 이상하다는데 네가 좋아하는 게 있니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "책을 펴 놓고 푼다.", miss: "단어 하나로 답한다. 문장 앞부분을 같이 읽어 준다." },
      { sheet: "Grammar",      point: "빨간 부분만 같이 읽고 바로 아래 칸을 시킨다.", miss: "규칙을 외우려 한다. 문장을 써 보게 하는 것으로 충분하다." },
      { sheet: "Exam Grammar", point: "답만 쓴다. 풀이 과정은 쓰게 하지 않는다.", miss: "괄호를 통째로 옮겨 적는다. 고른 것 하나만." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "Me 칸은 그림도 허용한다.", miss: "→ 칸을 비워 둔다. 말로 먼저 물어보고 받아 적게 한다." },
      { sheet: "Writing",       point: "3문장. 조건은 because 하나만 본다.", miss: "한 문장 쓰고 멈춘다. 예시문을 같이 읽고 시작한다." }
    ],
    scoring: [
      { c: "생각 Opinion", pt: 5, yes: "내 생각을 한 문장으로 썼다",       no: "무슨 생각인지 알 수 없다" },
      { c: "까닭 Reason",  pt: 5, yes: "because 를 써서 까닭을 말했다",    no: "까닭이 없다" },
      { c: "근거 Book",    pt: 5, yes: "책에서 본 것을 한 가지 넣었다",     no: "책과 상관없는 이야기만 있다" },
      { c: "글씨 Writing", pt: 5, yes: "대문자로 시작하고 마침표로 끝났다", no: "대문자·마침표가 없다" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "버즈가 파리를 만나 애완동물 쇼에 나가는 장면", "text": "Buzz wanted an [[animal buddy|pet]] for the pet show. One day, a fly flew near him. Buzz caught it in a [[container|jar]] and shut the [[cover|lid]]. The fly said, \"Buzz!\" \"You are so [[clever|smart]]!\" said Buzz. At the show, some people laughed. But Fly Guy did a [[stunt|trick]] and said Buzz's name. He won an [[award|prize]]!"};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Who We Are",
 "themeKo": "우리는 누구인가",
 "profile": [
  {
   "attr": "Open-minded",
   "how": "Ask whether a pet has to be a dog or a cat, and listen to other ideas."
  },
  {
   "attr": "Caring",
   "how": "Notice how Buzz looks after Fly Guy and stands up for him."
  }
 ],
 "hook": [
  "Bring an empty jar with a lid: what could live in here? Could it be a pet?",
  "Class vote: which animals can be pets? Put a fly on the list last and watch the reaction."
 ],
 "connections": [
  {
   "subject": "Science",
   "idea": "Insects: six legs, wings, what flies eat. Draw and label a fly."
  },
  {
   "subject": "Mathematics",
   "idea": "Make a class pet graph and read it together."
  },
  {
   "subject": "Social skills",
   "idea": "What makes a good friend? List what Buzz and Fly Guy do for each other."
  }
 ],
 "speaking": [
  "Think-Pair-Share: is a fly a real pet? Give one reason.",
  "Role play the judges and Buzz at the pet show."
 ],
 "writing": [
  "Make a 'Pet Show' entry card for an unusual pet.",
  "Write three sentences: My pet can ..."
 ]
};
