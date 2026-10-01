// 리딩브레인 원서프로그램 — IB PYP 리더스 (Extend Education, Year 1 · Orange Band)
// 논픽션이다. 책 본문·삽화·용어 풀이·워크북 문항은 싣지 않았다. 책에 나오는 사실(성의 구조·사람들·낱말)로 문항을 새로 썼다.
// AR 지수가 없는 책이라 level.ar 은 WOW 커리큘럼 로드맵의 밴드 구간(Orange 2.5~3.3)에서 잡은 값이다 (레벨 탭에 세우려고 둔다).
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  slug: "life-in-a-castle",
  title: "Life in a Castle",
  author: "Adele Corry",
  series: "IB PYP Year 1 · Where We Are in Place and Time",
  publisher: "Extend Education",
  level: { ar: "2.5", lexile: "Orange Band", rb: "IB PYP Y1 · WOW 로드맵 AR 2.5~3.3" },
  awards: [],
  defSource: "",
  cover: "assets/covers/life-in-a-castle.jpg",

  shadowing: { query: "\"Life in a Castle\" Adele Corry read aloud", searchUrl: "", qr: "", videos: [],
    // E북: 원장이 받아 온 책 내지 PDF 를 쪽 그림으로 바꿔 넣었다 (p01~p24.jpg). 0쪽은 표지.
    ebook: { dir: "assets/ebook/life-in-a-castle/", pages: 24 },
    // 출판사 낭독 음원 (원장이 받아 온 파일). 쪽별로 듣고 따라 읽는다.
    audio: [
      { title: "전체 듣기", src: "assets/audio/life-in-a-castle/read/full.mp3", pages: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] },
      { title: "Title", src: "assets/audio/life-in-a-castle/read/title.mp3", pages: [0,1] },
      { title: "p.2–3", src: "assets/audio/life-in-a-castle/read/p02.mp3", pages: [2,3] },
      { title: "p.4–5", src: "assets/audio/life-in-a-castle/read/p04.mp3", pages: [4,5] },
      { title: "p.6–7", src: "assets/audio/life-in-a-castle/read/p06.mp3", pages: [6,7] },
      { title: "p.8–9", src: "assets/audio/life-in-a-castle/read/p08.mp3", pages: [8,9] },
      { title: "p.10–11", src: "assets/audio/life-in-a-castle/read/p10.mp3", pages: [10,11] },
      { title: "p.12–13", src: "assets/audio/life-in-a-castle/read/p12.mp3", pages: [12,13] },
      { title: "p.14–15", src: "assets/audio/life-in-a-castle/read/p14.mp3", pages: [14,15] },
      { title: "p.16–17", src: "assets/audio/life-in-a-castle/read/p16.mp3", pages: [16,17] },
      { title: "p.18–19", src: "assets/audio/life-in-a-castle/read/p18.mp3", pages: [18,19] },
      { title: "p.20–21", src: "assets/audio/life-in-a-castle/read/p20.mp3", pages: [20,21] },
      { title: "p.22–23", src: "assets/audio/life-in-a-castle/read/p22.mp3", pages: [22,23] },
      { title: "p.24 Glossary", src: "assets/audio/life-in-a-castle/read/p24.mp3", pages: [24] }
    ] },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "castle",      pos: "n.",   en: "a big, strong home built long ago for a king or queen", ko: "성", ex: "The king and queen lived in a {{castle}}.", ex_ko: "왕과 왕비는 성에 살았어요.", pic: "🏰" },
    { word: "thick",       pos: "adj.", en: "wide from one side to the other; not thin", ko: "두꺼운", ex: "The walls were very {{thick}}, so no one could break them.", ex_ko: "벽이 아주 두꺼워서 아무도 부술 수 없었어요.", pic: "🧱" },
    { word: "moat",        pos: "n.",   en: "a deep ring of water around a castle", ko: "해자 (성 둘레의 물길)", ex: "Enemies could not swim across the deep {{moat}}.", ex_ko: "적들은 깊은 해자를 헤엄쳐 건널 수 없었어요.", pic: "🌊" },
    { word: "drawbridge",  pos: "n.",   en: "a bridge that can go up so no one can cross", ko: "도개교 (들어 올리는 다리)", ex: "The soldiers pulled up the {{drawbridge}} at night.", ex_ko: "병사들은 밤에 도개교를 들어 올렸어요.", pic: "🌉" },
    { word: "enemy",       pos: "n.",   en: "a person who wants to fight you or hurt you", ko: "적", ex: "High walls kept every {{enemy}} out.", ex_ko: "높은 벽이 모든 적을 막아 주었어요.", pic: "⚔️" },
    { word: "servant",     pos: "n.",   en: "a person whose job is to work in another person's home", ko: "하인", ex: "A {{servant}} cooked food over the big fire.", ex_ko: "하인 한 명이 큰 불 위에서 음식을 만들었어요.", pic: "🧹" },
    { word: "feast",       pos: "n.",   en: "a very big meal for many people on a special day", ko: "잔치, 연회", ex: "They ate a huge {{feast}} in the Great Hall.", ex_ko: "그들은 대연회장에서 성대한 잔치 음식을 먹었어요.", pic: "🍗" },
    { word: "jester",      pos: "n.",   en: "a funny man whose job was to make the king laugh", ko: "어릿광대", ex: "The {{jester}} told a joke, and the queen laughed.", ex_ko: "어릿광대가 농담을 하자 왕비가 웃었어요.", pic: "🃏" },
    { word: "protect",     pos: "v.",   en: "to keep someone or something safe", ko: "보호하다, 지키다", ex: "Soldiers had to {{protect}} the castle.", ex_ko: "병사들은 성을 지켜야 했어요.", pic: "🛡️" },
    { word: "sword",       pos: "n.",   en: "a long, sharp metal blade with a handle, used for fighting", ko: "검, 칼", ex: "The soldier held a {{sword}} in his hand.", ex_ko: "병사는 손에 검을 들고 있었어요.", pic: "🗡️" },
    { word: "dungeon",     pos: "n.",   en: "a dark prison under a castle", ko: "지하 감옥", ex: "They locked the enemy in the {{dungeon}}.", ex_ko: "그들은 적을 지하 감옥에 가두었어요.", pic: "⛓️" },
    { word: "underground", pos: "adj.", en: "below the top of the ground", ko: "지하의", ex: "The {{underground}} rooms had no windows.", ex_ko: "지하 방에는 창문이 없었어요.", pic: "🕳️" }
  ],

  // ── ①-2 문법 ───────────────────────────────────────────
  grammar: {
    points: [
      { name: "Past Simple: was / were", ko: "be동사 과거형 was · were",
        sent: "The dungeon [[was]] dark, and the walls [[were]] very high.",
        why_ko: "옛날 이야기는 과거형으로 말해요. 하나(단수)면 was, 여럿(복수)이면 were! The dungeon was / The walls were.",
        why: "Use \"was\" for one thing and \"were\" for more than one when you talk about the past.",
        try: "The moat {{was}} deep, and the soldiers {{were}} brave." },
      { name: "There was / There were", ko: "~이 있었다",
        sent: "[[There were]] lots of rooms, and [[there was]] a big fire in the kitchen.",
        why_ko: "'~이 있었다'는 There was / There were예요. 뒤에 오는 명사가 하나면 was, 여럿이면 were로 맞춰요.",
        why: "Look at the noun after it: one thing takes \"there was\", many things take \"there were\".",
        try: "{{There was}} a jester in the hall, and {{there were}} many servants." },
      { name: "could + verb", ko: "could + 동사원형 (~할 수 있었다)",
        sent: "The drawbridge [[could be]] pulled up, so enemies [[could not get]] in.",
        why_ko: "could는 can의 과거형이에요. 뒤에는 늘 동사원형! could pulled (X) → could pull (O). 못 했다면 could not.",
        why: "\"Could\" is the past of \"can\". Always use the base verb after it.",
        try: "Enemies could not {{climb}} the high walls." }
    ],
    find: "책에서 was 와 were 를 각각 세 개씩 찾아 주어에 동그라미를 쳐 보세요. · Find three \"was\" and three \"were\". Circle each subject.",
    exam: {
      choose: [
        { q: "Castles (was / were) made a long time ago.", a: "were", why_ko: "Castles는 복수예요. 복수 주어의 be동사 과거형은 were!" },
        { q: "The dungeon (was / were) cold and damp.", a: "was", why_ko: "The dungeon은 하나(단수)예요. 단수에는 was!" },
        { q: "There (was / were) lots of servants in the castle.", a: "were", why_ko: "뒤의 명사 servants가 복수라서 There were예요." },
        { q: "The drawbridge could (pull / pulled) up.", a: "pull", why_ko: "could 뒤에는 늘 동사원형이 와요. pulled가 아니라 pull!" },
        { q: "The servants (look / looked) after the family.", a: "looked", why_ko: "옛날 성 이야기는 과거예요. 규칙동사는 -ed를 붙여 looked!" }
      ],
      fix: [
        { q: "The walls of the castle [[was]] very high.", a: "were", why_ko: "주어는 castle이 아니라 The walls(복수)예요. 그래서 were!" },
        { q: "There [[were]] a moat around the castle.", a: "was", why_ko: "a moat는 하나예요. 단수 명사 앞에는 There was!" },
        { q: "Enemies could not [[climbed]] over the walls.", a: "climb", why_ko: "could not 뒤에도 동사원형! climbed가 아니라 climb." }
      ],
      write: [
        { ko: "부엌에는 큰 불이 있었다.", cond: "There was, in the kitchen", a: "There was a big fire in the kitchen.", why_ko: "a big fire는 하나라서 There was, 장소는 문장 끝에 in the kitchen." },
        { ko: "병사들은 성을 지킬 수 있었다.", cond: "could, protect", a: "The soldiers could protect the castle.", why_ko: "could 뒤에는 동사원형 protect를 써요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "pp. 2–3", skill: "사실찾기",  q: "Who were castles made for?",
      frame: "Castles were made for {{kings and queens and their families}}." },
    { ref: "pp. 4–7", skill: "사실찾기",  q: "Name three things that kept a castle safe.",
      frame: "A castle had {{thick, high walls}}, a {{moat}}, and a {{drawbridge}}." },
    { ref: "pp. 9–11", skill: "사실찾기", q: "What did the servants do?",
      frame: "The servants {{looked after the family, cleaned, and cooked in the kitchens}}." },
    { ref: "pp. 17–19", skill: "추론·예측", q: "Why was the dungeon a terrible place to be?",
      frame: "It was terrible because it was {{underground, with no windows, and dark, cold and damp}}." },
    { ref: "pp. 22–23", skill: "평가·적용", q: "Would you like to live in a castle long ago? Why or why not?",
      frame: "I {{would / would not}} like to live in a castle because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 ──────────────────────────────────
  quiz: [
    { q: "What is a castle?",
      a: ["A small wooden house", "A strong building from long ago", "A kind of bridge", "A modern hotel"], c: 1,
      why_ko: "성은 아주 오래전에 지은 튼튼한 건물이에요. 왕과 왕비, 그 가족을 위해 만들었죠.",
      why: "A castle is a strong building that was made a long time ago for kings and queens." },
    { q: "Why were many castles built high up on a hill?",
      a: ["The air was cleaner", "It was cheaper", "Soldiers could see enemies coming, and it was hard to attack", "Kings liked climbing"], c: 2,
      why_ko: "언덕 위에 있으면 멀리서 오는 적이 잘 보이고, 적은 올라오느라 힘이 들어요. 성을 안전하게 지키는 방법이에요.",
      why: "From a hill, soldiers could see far away, and enemies had to climb up to attack." },
    { q: "What is a moat?",
      a: ["Deep water around the castle", "A room for feasts", "A kind of sword", "The castle kitchen"], c: 0,
      why_ko: "해자(moat)는 성을 빙 둘러싼 깊은 물길이에요. 적이 벽까지 오지 못하게 막아 줘요.",
      why: "A moat is a deep ditch of water around the castle. It stops enemies from reaching the walls." },
    { q: "What was special about a drawbridge?",
      a: ["It was made of gold", "It was under the ground", "It was only for horses", "It could be pulled up"], c: 3,
      why_ko: "도개교는 들어 올릴 수 있는 다리예요. 다리를 올리면 해자를 건널 길이 없어져요.",
      why: "A drawbridge could be pulled up, so nobody could cross the moat." },
    { q: "Who lived in the castle besides the king and queen?",
      a: ["Only their children", "Servants and soldiers", "Nobody else", "Farmers and their cows"], c: 1,
      why_ko: "성에는 왕의 가족만 산 게 아니에요. 하인과 병사도 아주 많이 살았어요.",
      why: "Lots of servants and soldiers lived in the castle too." },
    { q: "Where were the huge feasts held?",
      a: ["In the dungeon", "On the drawbridge", "In the Great Hall", "In the moat"], c: 2,
      why_ko: "음식은 부엌에서 만들고, 잔치는 대연회장(Great Hall)에서 열렸어요. 부엌과 헷갈리지 마세요!",
      why: "Food was cooked in the kitchens but served in the Great Hall." },
    { q: "What was a jester's job?",
      a: ["To make people laugh", "To cook the food", "To fight enemies", "To clean the rooms"], c: 0,
      why_ko: "어릿광대(jester)는 왕과 왕비를 웃게 만드는 사람이에요. 요리는 하인, 싸움은 병사의 일이죠.",
      why: "A jester told jokes and did funny things to make the king and queen laugh." },
    { q: "What did the soldiers use to protect the castle?",
      a: ["Spoons and forks", "Books and pens", "Ropes and nets", "Swords, and bows and arrows"], c: 3,
      why_ko: "병사들은 검과 활과 화살로 성을 지켰어요.",
      why: "The king's soldiers fought with swords and with bows and arrows." },
    { q: "What were the dungeons like?",
      a: ["Bright and warm", "Dark, cold and damp", "Full of food", "High up in a tower"], c: 1,
      why_ko: "지하 감옥은 땅속에 있고 창문이 없어서 어둡고, 춥고, 축축했어요.",
      why: "Dungeons were underground with no windows, so they were dark, cold and damp." },
    { q: "What was a garderobe?",
      a: ["A castle toilet", "A soldier's hat", "A big feast", "A type of bridge"], c: 0,
      why_ko: "garderobe는 성의 화장실이에요. 벽에 구멍이 뚫려 있을 뿐이어서 모두 바깥 해자로 떨어졌답니다!",
      why: "A garderobe was a castle toilet: just a hole in the wall that led outside to the moat." }
  ],

  // ── ③ 요약 지도 (논픽션) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{castles in many countries}}", time: "{{a long time ago}}" },
    swbst: [
      { k: "Topic",     v: "{{how people lived in a castle}}" },
      { k: "Main Idea", v: "{{a castle was a strong, safe home for a king and queen}}" },
      { k: "Example 1", v: "{{walls, a moat and a drawbridge kept enemies out}}" },
      { k: "Example 2", v: "{{servants and soldiers lived and worked inside}}" },
      { k: "Message",   v: "{{we can visit old castles to learn about the past}}" }
    ],
    scenes: [
      { label: "First",
        given: "The book tells what a castle is and how it was kept safe.",
        frame: "Castles had thick walls, a {{moat}}, and a {{drawbridge}}." },
      { label: "Middle",
        given: "",
        frame: "Inside, servants {{cooked and cleaned}}, and the king had {{feasts in the Great Hall}}." },
      { label: "Last",
        given: "The book ends with dungeons, toilets, and castles today.",
        frame: "Dungeons were {{dark, cold and damp}}, and today we can {{visit old castles}}." }
    ]
  },

  // ── ④ 마인드맵 ─────────────────────────────────────────
  mindMap: {
    center: "Life in a Castle",
    branches: [
      { label: "Keeping Safe", ask: "What kept the castle safe?",
        deeper: "Which one would be hardest to get past? Why?" },
      { label: "People",       ask: "Who lived and worked in the castle?",
        deeper: "Whose job would you choose? Why?" },
      { label: "Rooms",        ask: "What rooms were in the castle?",
        deeper: "Which room is most different from your home?" },
      { label: "Then and Now", ask: "How is a castle different from your home?",
        deeper: "What is the same? What do all homes need?" }
    ]
  },

  // ── ⑤ IB 탐구 ──────────────────────────────────────────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["History", "Home", "Protection"],
    globalContext: "Where We Are in Place and Time — 우리가 속한 공간과 시간 (역사·집·삶의 변화)",
    statement: "Homes from the past show us how people lived and what they needed to feel safe.",
    factual: [
      "Who were castles made for?",
      "What kept a castle safe from enemies?",
      "What jobs did people do inside a castle?",
      "Where were the huge feasts held?",
      "What were the dungeons like?"
    ],
    conceptual: [
      "How have homes changed over time, and why?",
      "How do we know what life was like long ago?"
    ],
    debatable: [
      "Was life in a castle better than life in a home today?",
      "Was it fair that servants did all the work while the king and queen had feasts?"
    ],
    learnerProfile: ["Inquirer", "Thinker", "Knowledgeable", "Reflective"]
  },

  // ── ⑥ 쓰기 ─────────────────────────────────────────────
  essay: {
    prompt: "Imagine you lived in a castle long ago. Who are you, and what is your day like?",
    conditions: [
      "4문장 이상 쓸 것 · Write at least 4 sentences",
      "was / were 를 두 번 이상 쓸 것 · Use \"was\" or \"were\" twice",
      "책에서 배운 낱말을 두 개 넣을 것 · Use two words from the book"
    ],
    steps: [
      { part: "Title",    ask: "Who are you in the castle?", eg: "A Day as a Castle Servant", lines: 1 },
      { part: "Who",      ask: "Who were you? Where did you live?", eg: "I was a servant in a big castle on a hill.", lines: 2 },
      { part: "My Day",   ask: "What did you do?", eg: "I cooked food over a big fire. There was a huge feast in the Great Hall.", lines: 2 },
      { part: "Feeling",  ask: "How was it? Why?", eg: "I was tired because there were so many plates.", lines: 2 },
      { part: "Ending",   ask: "Castle or your home today? Which is better?", eg: "I like my home today because it is warm.", lines: 2 }
    ],
    expressions: [
      "I was a ... in a castle.",
      "There was ... / There were ...",
      "I could ... / I could not ...",
      "I was ... because ..."
    ],
    rubric: [
      { c: "내용",  d: "성에서의 하루를 썼나요? · Did I tell about a day in the castle?" },
      { c: "과거",  d: "was / were 를 바르게 썼나요? · Did I use the past?" },
      { c: "낱말",  d: "책 낱말을 두 개 넣었나요? · Two words from the book?" },
      { c: "글씨",  d: "대문자와 마침표를 다시 봤나요? · Capitals and periods?" }
    ]
  },

  // ── ⑦ 교사용 (PYP 탐구 흐름) ───────────────────────────
  teaching: {
    goal: {
      en: "Students describe how a castle was kept safe, name who lived there and what they did, and compare castle life with their own home using was / were.",
      ko: "성을 어떻게 지켰는지, 누가 살며 무슨 일을 했는지 말하고, was·were 를 써서 성의 삶과 지금 우리 집을 비교한다."
    },
    script: [
      { stage: "Hook", min: "0~8분",
        say: "Look at this picture. Is it a house? Who do you think lived here? When?",
        do: "성 사진 한 장만 보여 준다. 제목은 가린다. 아이들의 추측을 칠판에 적는다.",
        exp: "A king! / A long time ago!",
        stuck: "\"Is it new or old? Big or small?\" 둘 중 하나를 고르게 한다." },
      { stage: "Tuning In", min: "8~15분",
        say: "What do you know about castles? What do you wonder? Tell your partner first.",
        do: "Know / Wonder 두 칸을 채운다. 아이들 질문을 그대로 적어 단원의 탐구 질문으로 삼는다.",
        exp: "I know kings. / Did they have toilets?",
        stuck: "선생님이 먼저 궁금한 것을 말한다. \"I wonder where they cooked.\"" },
      { stage: "Word List", min: "15~22분",
        say: "Read after me. Now draw it in the air: moat... drawbridge... up it goes!",
        do: "moat·drawbridge 는 칠판에 성을 그리며 자리를 짚어 준다. 그림이 뜻풀이보다 빠르다.",
        exp: "moat / drawbridge / dungeon",
        stuck: "그림에서 물은 어디? 다리는 어디? 손가락으로 짚게 한다." },
      { stage: "Guided Reading", min: "22~35분",
        say: "Pages 2 to 7. Stop at each question box. Why do you think castles were on hills?",
        do: "책 속 물음표 상자에서 꼭 멈춘다. 답은 하나가 아니다. because 를 붙여 말하게 한다.",
        exp: "Because they can see enemies.",
        stuck: "언덕 위·아래 그림을 그려 \"Who can see more?\"" },
      { stage: "Guided Reading", min: "",
        say: "Pages 8 to 21. For each part, tell me: WHO was there, and WHAT did they do?",
        do: "소제목(Inside a Castle, Protecting the Castle, Castle Toilets)을 먼저 읽어 내용을 예측하게 한다. 논픽션 읽기의 핵심 기술이다.",
        exp: "Servants cooked food. Soldiers used swords.",
        stuck: "문장 틀을 준다. \"The ___ ___ed ___.\"" },
      { stage: "Think-Pair-Share", min: "35~45분",
        say: "Hill, moat, or walls: which is hardest to get past? Think. Pair. Share.",
        do: "혼자 30초 → 짝 1분 → 발표. 짝의 생각을 대신 말하게 한다.",
        exp: "My partner said the moat because you can't swim with a sword.",
        stuck: "세 낱말 카드 중 하나를 집게 하고 because 를 붙여 준다." },
      { stage: "Sentence Work", min: "45~55분",
        say: "Long ago: The dungeon WAS dark. The walls WERE high. Now you: The kitchen...?",
        do: "was / were 를 주어 하나·여럿으로 나눠 연습한다. 형용사 셋을 나열하는 표현(dark, cold and damp)도 짚어 준다.",
        exp: "The kitchen was hot. The servants were busy.",
        stuck: "주어에 동그라미 → 하나? 여럿? 을 묻는다." },
      { stage: "Graphic Organizer", min: "55~65분",
        say: "Two circles: a castle long ago, and my home today. What goes in the middle?",
        do: "벤 다이어그램으로 그때와 지금을 비교한다. 가운데(둘 다)를 채우는 것이 개념 이해의 증거다.",
        exp: "Both: kitchen, toilet, family.",
        stuck: "\"Does your home have a kitchen? Did the castle?\"" },
      { stage: "Writing", min: "65~80분",
        say: "You live in a castle long ago. Who are you? Write about your day.",
        do: "조건 세 가지를 같이 읽고 시작한다. 역할(왕·하인·병사·어릿광대)을 먼저 고르게 하면 쓰기가 쉬워진다.",
        exp: "I was a jester. I could make the king laugh.",
        stuck: "\"I was a ___ in a castle.\" 을 칠판에 써 준다." },
      { stage: "Reflection", min: "80~90분",
        say: "Look at our wonder questions. Which can we answer now? How did we find out?",
        do: "처음 질문으로 돌아가 답한 것에 표시한다. '어떻게 알았나(책·그림·사진 설명)'를 꼭 묻는다.",
        exp: "Yes, they had toilets. I read it on page 21.",
        stuck: "질문 하나를 골라 같이 책에서 답을 찾는다." }
    ],
    booktalk: {
      before: [
        { en: "Have you ever seen a castle? Where?", ko: "성을 본 적 있니? 어디서?" },
        { en: "Who do you think lived in castles?", ko: "성에는 누가 살았을까?" },
        { en: "Why would someone need such thick walls?", ko: "왜 그렇게 두꺼운 벽이 필요했을까?" }
      ],
      during: [
        { en: "Which job in the castle looks the hardest?", ko: "성에서 가장 힘든 일은 무엇 같니?" },
        { en: "Why are there no photographs from that time?", ko: "그 시대 사진은 왜 없을까?" }
      ],
      after: [
        { en: "How is a castle different from your home? What is the same?", ko: "성은 우리 집과 무엇이 다르고 무엇이 같을까?" },
        { en: "Are there old castles or palaces in Korea? What do they tell us?", ko: "한국에도 오래된 성이나 궁이 있니? 무엇을 알려 줄까?" },
        { en: "Would you like to live in a castle? Why or why not?", ko: "성에서 살고 싶니? 왜?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "성 그림을 그리며 낱말 자리를 짚는다.", miss: "sword 의 w 를 소리 낸다. [sɔːrd] 로 같이 읽는다." },
      { sheet: "Word Test",     point: "5분 제한. 긴 낱말은 둘로 나눠 외운다 (draw+bridge, under+ground).", miss: "dungeon 을 dungen 으로 쓴다." },
      { sheet: "Comprehension", point: "소제목을 보고 답이 있을 쪽을 먼저 찾는다.", miss: "기억으로만 답한다. 손가락으로 문장을 짚게 한다." },
      { sheet: "Grammar",       point: "주어에 동그라미 → 하나면 was, 여럿이면 were.", miss: "The walls of the castle was. 주어는 walls 다." },
      { sheet: "Exam Grammar",  point: "답만 쓴다.", miss: "could 뒤에 과거형을 쓴다." },
      { sheet: "Summary Map",   point: "논픽션이다. 주제 → 중심 생각 → 예 두 개 → 전하는 말.", miss: "예 대신 느낌을 쓴다. 책에 나온 사실을 쓰게 한다." },
      { sheet: "Mind Map",      point: "Then and Now 칸이 이 단원의 핵심이다. 우리 집과 비교한다.", miss: "→ 칸을 비운다. 말로 먼저 묻고 받아 적게 한다." },
      { sheet: "Writing",       point: "4문장. 역할을 먼저 고른다. was / were 를 본다.", miss: "현재형으로 쓴다. \"long ago\" 를 첫 줄에 쓰게 한다." }
    ],
    scoring: [
      { c: "내용 Content",  pt: 5, yes: "성에서의 역할과 하루가 드러난다",     no: "누구인지, 무엇을 했는지 알 수 없다" },
      { c: "과거 Past",     pt: 5, yes: "was / were 를 두 번 이상 바르게 썼다", no: "현재형으로 썼다" },
      { c: "낱말 Words",    pt: 5, yes: "책 낱말을 두 개 이상 넣었다",         no: "책 낱말이 없다" },
      { c: "글씨 Writing",  pt: 5, yes: "대문자로 시작하고 마침표로 끝났다",    no: "대문자·마침표가 없다" }
    ]
  },

  // ── ⑧ PYP 유닛 플래너 ──────────────────────────────────
  pyp: {
    theme: "Where We Are in Place and Time", themeKo: "우리가 속한 공간과 시간", band: "Orange Band",
    centralIdeas: [
      "Homes are built to meet the needs of the people who live in them.",
      "Looking at homes from the past helps us understand how life has changed."
    ],
    profile: [
      { attr: "Inquirer",      how: "Ask questions about who lived in castles and why they were built." },
      { attr: "Thinker",       how: "Work out why a hill, a moat, and high walls made a castle safe." },
      { attr: "Knowledgeable", how: "Use new history words to explain life long ago." },
      { attr: "Reflective",    how: "Compare castle life with our own homes and say what we are thankful for." }
    ],
    keyWords: ["they", "people", "where", "were", "too", "was", "their", "there", "could", "some", "very"],
    phonics: ["a-e", "u-e", "i-e", "ck", "ou", "igh", "ll", "wh", "ee", "ar", "oo", "-ing"],
    inquiry: [
      "What is a castle, and who was it built for?",
      "How did people keep a castle safe?",
      "Who lived in a castle, and what jobs did they do?",
      "How is a castle different from my home? What is the same?",
      "How do we find out about life long ago?"
    ],
    outcomes: [
      "Describe the parts of a castle and explain what each part was for.",
      "Name the people who lived in a castle and tell what they did.",
      "Compare a home from the past with a home today.",
      "Use headings, captions, and question boxes to find information in a nonfiction book."
    ],
    hook: [
      "Show one castle photo with the title covered: Is it a house? Who lived here? When?",
      "Build a castle from blocks or boxes, then ask: how would you stop someone getting in?",
      "Bring a photo of a Korean palace or fortress (경복궁, 수원 화성) and compare it with the cover."
    ],
    guided: [
      { pages: "Before reading", ask: ["Read the headings first. What will each part tell us?", "Is this a story or an information book? How do you know?"] },
      { pages: "pp. 2–3",   ask: ["Who were castles made for?", "Nearly 1000 years old: is that older than your grandparents? Than Korea's palaces?"] },
      { pages: "pp. 4–7",   ask: ["Why put a castle high on a hill?", "Hill, moat, or walls: which is hardest to get past? Why?"] },
      { pages: "pp. 8–13",  ask: ["Who lived in the castle besides the king and queen?", "Why are there paintings but no photographs from that time?"] },
      { pages: "pp. 14–19", ask: ["What did soldiers use to protect the castle?", "Find the three describing words for the dungeon. How would you feel there?"] },
      { pages: "pp. 20–21", ask: ["How were castle toilets different from ours?", "Why do you think they were built over the moat?"] },
      { pages: "pp. 22–23", ask: ["How can we find out more about the past?", "Are there old castles or palaces where you live?"] }
    ],
    sentenceWork: [
      "Past simple with was / were: \"The dungeon was dark. The walls were high.\"",
      "There was / There were: \"There were lots of rooms inside the castle.\"",
      "A list of three adjectives: \"It was dark, cold and damp.\""
    ],
    speaking: [
      "Think-Pair-Share: hill, moat, or walls. Which is hardest to get past?",
      "Role play: be a servant, a soldier, a jester, or the queen, and tell about your day.",
      "Castle tour guide: point at a picture and explain it to visitors (\"This is the ... It was for ...\")."
    ],
    writing: [
      "Label a castle drawing, then write one sentence for each label.",
      "A day in the castle: choose a role and write a short diary.",
      "Then and Now: write two sentences that compare a castle with your home.",
      "Write a job advert: \"Wanted: a jester for the king!\""
    ],
    connections: [
      { subject: "History",     idea: "Make a simple timeline: castle times → grandparents → now." },
      { subject: "Geography",   idea: "Find the countries in the book on a map; why are castles on hills or by the sea?" },
      { subject: "Korean history", idea: "Compare with 수원 화성 or 경복궁: walls, gates, who lived there." },
      { subject: "Design",      idea: "Build a model drawbridge that really goes up and down." },
      { subject: "Art",         idea: "Draw a cut-away castle that shows every room and who is in it." }
    ],
    organizers: ["Venn diagram (castle long ago / my home today)", "Labelled diagram of a castle", "Report planner (topic → facts → ending)"],
    test: {
      yesno: [
        { q: "Castles were made a long time ago.", a: true },
        { q: "Only the king and queen lived in a castle.", a: false },
        { q: "A drawbridge could be pulled up.", a: true },
        { q: "The dungeons had big windows.", a: false },
        { q: "We can still visit old castles today.", a: true }
      ],
      writing: [
        { tag: "Language & History", task: "Choose one person who lived in a castle. Write about their day in 5–6 sentences.",
          hints: ["Who are you?", "Where do you work in the castle?", "What do you do in the morning?", "What do you eat?", "What is hard about your job?", "How do you feel at night?"],
          sample: "I was a servant in a big castle. I worked in the kitchen. I cooked meat over a big fire. There were many plates to clean. I was very tired at night.",
          focus: "Past tense, facts from the book, feeling." },
        { tag: "Design & Thinking", task: "Design your own safe castle. Write about it in 5–6 sentences.",
          hints: ["Where is your castle?", "How thick and high are the walls?", "Is there a moat or a drawbridge?", "Who protects it?", "What is your best idea to stop enemies?", "Why will it work?"],
          sample: "My castle is on a high hill by the sea. The walls are thick and very high. There is a deep moat with a drawbridge. Enemies cannot get in because the bridge goes up at night.",
          focus: "Use of castle vocabulary, reasoning with because." }
      ],
      speaking: [
        { tag: "Art & Communication", task: "Draw a castle and be a tour guide. Talk about it in 5–6 sentences.",
          hints: ["What is this part called?", "What was it for?", "Who worked here?", "What is the most interesting room?", "What would visitors like best?", "Would you live here?"],
          sample: "Welcome to my castle. This is the Great Hall. The king had feasts here. This is the dungeon. It was dark and cold. I would not like to sleep there!",
          focus: "Clear speaking, naming parts, explaining purpose." },
        { tag: "Social Studies & Reflection", task: "Compare a castle with your home. Talk in 5–6 sentences.",
          hints: ["What is the same?", "What is different?", "What does your home have that a castle did not?", "What did a castle have that your home does not?", "Which is more comfortable?", "Which would you choose? Why?"],
          sample: "A castle and my home both have a kitchen. A castle had a moat, but my home has a door lock. My home is warm, but a castle was cold. I choose my home because it has a real toilet.",
          focus: "Comparison (both / but), opinion with a reason." }
      ]
    }
  }
};

// 낭독녹음: 책 본문이 아니라 내용을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = { scene: "성은 어떻게 지켜졌을까", text: "Long ago, kings and queens lived in a [[fortress|castle]]. It sat high on a hill. The walls were [[wide|thick]] and tall. A [[water ring|moat]] went all around it, and the [[lifting bridge|drawbridge]] went up at night. Soldiers with a bow or a [[blade|sword]] had to [[guard|protect]] the gate. Inside, a [[helper|servant]] cooked for the big [[banquet|feast]]. If soldiers caught an [[attacker|enemy]], they locked him in the dark [[prison|dungeon]]. Would you like to live there?" };
