// 리딩브레인 원서프로그램 — 2점대 책 (AR 2.9)
// Frog and Toad Are Friends - exactly 5 stories: Spring, The Story, A Lost Button, A Swim, The Letter
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S2040",
  slug: "frog-and-toad-are-friends",
  title: "Frog and Toad Are Friends",
  author: "Arnold Lobel",
  series: "I Can Read Level 2",
  publisher: "HarperCollins",
  level: { ar: "2.9", lexile: "400L", rb: "다독 2단계" },
  awards: ["Caldecott Honor 1971"],
  defSource: "",
  cover: "assets/covers/frog-and-toad-are-friends.jpg",

  shadowing: {
    query: "\"Frog and Toad Are Friends\" read aloud",
    searchUrl: "https://youtu.be/Gn6SgP52GZQ",
    qr: "assets/qr/frog-and-toad-are-friends.png",
    videos: [
      { url: "https://youtu.be/Gn6SgP52GZQ", title: "Frog and Toad are Friends by Arnold Lobel: Spring & The Story", channel: "Mrs. E's Audiobooks", views: "303,287", length: "" },
      { url: "https://youtu.be/NpPc8Y5UBss", title: "Frog and Toad are Friends", channel: "ReadToMeDad", views: "149,176", length: "" },
      { url: "https://youtu.be/3MNRcSp8_3w", title: "Frog and Toad Are Friends | Read-Along | 1976 Scholastic Record and Book | Read by Arnold Lobel", channel: "Grandma Mo Story Time", views: "73,115", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "friend",   pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/friend.mp3", en: "a person you know and like very much", ko: "친구",            ex: "Frog and Toad were {{friend}}s.", ex_ko: "개구리와 두꺼비는 친구였어요.", pic: "🤝" },
    { word: "sleep",    pos: "v.", audio: "assets/audio/frog-and-toad-are-friends/sleep.mp3", en: "to rest with your eyes closed", ko: "자다",            ex: "Toad {{sleep}}s all winter long.", ex_ko: "두꺼비는 겨울 내내 자요.", pic: "😴" },
    { word: "spring",   pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/spring.mp3", en: "the warm season when plants begin to grow", ko: "봄",             ex: "When {{spring}} comes, Frog wakes up Toad.", ex_ko: "봄이 오면 개구리가 두꺼비를 깨워요.", pic: "🌱" },
    { word: "calendar", pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/calendar.mp3", en: "a chart showing the days and months of the year", ko: "달력",            ex: "Frog tears pages from the {{calendar}}.", ex_ko: "개구리는 달력의 페이지를 떨어뜨려요.", pic: "📅" },
    { word: "letter",   pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/letter.mp3", en: "a written message that you send to someone", ko: "편지",            ex: "Frog writes a {{letter}} to Toad.", ex_ko: "개구리는 두꺼비에게 편지를 써요.", pic: "💌" },
    { word: "button",   pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/button.mp3", en: "a round piece of plastic or metal that holds clothing together", ko: "단추",            ex: "Toad loses a {{button}} from his jacket.", ex_ko: "두꺼비는 재킷에서 단추를 잃어버려요.", pic: "🔘" },
    { word: "jacket",   pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/jacket.mp3", en: "a short coat you wear to stay warm", ko: "재킷",            ex: "Toad's {{jacket}} has many buttons.", ex_ko: "두꺼비의 재킷에는 많은 단추가 있어요.", pic: "🧥" },
    { word: "snail",    pos: "n.", audio: "assets/audio/frog-and-toad-are-friends/snail.mp3", en: "a small animal with a soft body and a shell", ko: "달팽이",            ex: "The {{snail}} delivers the letter very slowly.", ex_ko: "달팽이는 편지를 매우 느리게 배달해요.", pic: "🐌" },
    { word: "sick",     pos: "adj.", audio: "assets/audio/frog-and-toad-are-friends/sick.mp3", en: "feeling unwell or ill", ko: "아픈",            ex: "Frog feels {{sick}} when he does not move.", ex_ko: "개구리는 움직이지 않으면 아파요.", pic: "🤒" },
    { word: "story",    pos: "n.", en: "a spoken or written tale about things that happen", ko: "이야기",         ex: "Toad tries to think of a good {{story}}.", ex_ko: "두꺼비는 좋은 이야기를 생각해 보려고 해요.", pic: "📖" }
  ],

  // ── ①-2 문법 ─────────────────────────────────────────────
  grammar: {
    points: [
      { name: "Past tense with -ed", ko: "과거형",
        sent: "Toad [[wanted]] to sleep, and Frog [[helped]] him.",
        why_ko: "규칙 동사 과거형은 -ed! want → wanted, help → helped. 끝난 일에는 과거형, 잊지 마세요.",
      why: "When something already finished, add -ed: want → wanted, help → helped.",
        try: "Frog {{walked}} to Toad's house, and Toad {{opened}} the door." },
      { name: "Can + verb", ko: "can 조동사",
        sent: "Frog [[can wake]] Toad up, and Toad [[can find]] his button.",
        why_ko: "can 뒤에는 동사원형! can wake(O), can wakes(X). '~할 수 있다'로 해석해요.",
      why: "After can, the verb never changes: can wake, can find, can swim.",
        try: "Toad {{can get}} a letter, but the snail {{can deliver}} it slowly." },
      { name: "because", ko: "이유를 나타내는 because",
        sent: "Toad was sad [[because]] he never got mail, and Frog helped him [[because]] he was a good friend.",
        why_ko: "because는 '왜냐하면', 이유를 이어 주는 말이에요. because 뒤에는 주어 + 동사! Toad was sad because he got no mail.",
      why: "Use because to show WHY something happened.",
        try: "Frog {{tore}} the calendar {{because}} Toad {{wanted}} to sleep until May." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        {"q": "Toad (want / wanted) to sleep until May.", "a": "wanted", why_ko: "이야기 속 지난 일이니 과거형이에요. want에 -ed를 붙여 wanted!" },
        {"q": "Frog (can tear / can tears) the calendar pages.", "a": "can tear", why_ko: "can 뒤에는 동사원형! tears가 아니라 tear예요." },
        {"q": "Toad was sad (because / but) he never got mail.", "a": "because", why_ko: "편지를 못 받은 건 슬픈 '이유'예요. 이유는 but이 아니라 because!" },
        {"q": "Frog (help / helped) Toad look for the button.", "a": "helped", why_ko: "지난 일이니 과거형 helped예요. help에 -ed를 붙여요." },
        {"q": "The snail (can deliver / can delivers) the letter.", "a": "can deliver", why_ko: "can 뒤에는 동사원형! delivers가 아니라 deliver예요." }
      ],
      fix: [
        {"q": "Yesterday Frog [[walk]] to Toad's house.", "a": "walked", why_ko: "Yesterday는 과거 신호예요. walk를 walked로 고쳐요." },
        {"q": "Toad [[can finds]] his button.", "a": "can find", why_ko: "can 뒤에는 동사원형이에요. finds가 아니라 find!" },
        {"q": "Toad was happy [[because of]] he got a letter.", "a": "because", why_ko: "뒤에 he got a letter처럼 '주어 + 동사'가 오면 because! because of 뒤에는 명사만 와요." }
      ],
      write: [
        {"ko": "개구리는 두꺼비를 도왔다.", "cond": "help", "a": "Frog helped Toad.", why_ko: "help의 과거형은 -ed를 붙인 helped! Frog helped Toad." },
        {"ko": "두꺼비는 편지를 한 번도 받지 못해서 슬펐다.", "cond": "sad, because, mail", "a": "Toad was sad because he never got mail.", why_ko: "'~해서 슬펐다'는 이유를 because로 이어요. because 뒤에 he never got mail(주어 + 동사)!" }
      ]
    }
  },

  // ── ② 독해 ────────────────────────────────────────────────
  comprehension: [
    { ref: "Spring",     skill: "사실찾기",   q: "Why did Frog want to wake up Toad in the spring?",
      frame: "Frog wanted to {{wake Toad up}} because {{it was spring and time to be awake}}." },
    { ref: "Spring",     skill: "추론·예측",  q: "What did Toad want to do until May?",
      frame: "Toad {{wanted to sleep}} until {{May came}}." },
    { ref: "The Story",  skill: "사실찾기",   q: "How did Toad try to think of a story?",
      frame: "Toad {{walked around}}, {{stood on his head}}, {{poured water on his head}}, and {{banged his head on the wall}}." },
    { ref: "A Lost Button", skill: "어휘",       q: "What did Toad lose?",
      frame: "Toad {{lost a button}} from {{his jacket}}." },
    { ref: "A Lost Button", skill: "추론·예측",  q: "What did Toad do with all the buttons they found?",
      frame: "Toad {{sewed all the buttons}} onto {{his jacket}} and {{gave it to Frog}}." },
    { ref: "The Letter", skill: "사실찾기",   q: "Why was Toad sad?",
      frame: "Toad {{was sad because}} {{he never got any mail}}." },
    { ref: "The Letter", skill: "사실찾기",   q: "Who delivered the letter to Toad?",
      frame: "The {{snail}} delivered {{Frog's letter}} to {{Toad}}." },
    { ref: "All Stories", skill: "주제·요점",  q: "What does Frog do in all these stories?",
      frame: "Frog {{helps Toad}} when {{Toad is sad or needs help}}." }
  ],

  // ── ②-2 북퀴즈 ────────────────────────────────────────────
  quiz: [
    { q: "What season does Toad wake up in?",
      a: ["Winter", "Spring", "Summer", "Fall"], c: 1,
      why_ko: "봄이에요. 겨울 내내 자고 있다가 봄이 되면 깨는 거죠. 개구리는 봄이라는 걸 보여 주기 위해 달력을 먼저 깨물어 먹어요.",
      why: "Spring. Toad sleeps all winter and wakes when Frog tells him it is spring." },
    { q: "Why did Frog tear pages from the calendar?",
      a: ["He was angry", "He wanted to reach May", "He did not like the calendar", "It was broken"], c: 1,
      why_ko: "두꺼비가 5월까지 자고 싶다고 했거든요. 개구리는 달력의 페이지를 떼어서 날짜를 빨리 진행시킨 거예요. 친구를 도와주려고.",
      why: "Toad wanted to sleep until May, so Frog tore off the pages to speed up the calendar." },
    { q: "In the story about the story, what happens to Toad?",
      a: ["He learns to read", "He tells a good story", "He gets sick too", "He runs away"], c: 2,
      why_ko: "두꺼비가 아파해요! 개구리의 이야기를 듣다가 자기도 아파지는 거예요. 그런데 아이러니하게도, 개구리가 두꺼비가 이야기를 생각하기 위해 한 일들(머리 부으르기, 벽에 부딪히기)을 이야기로 해 주니까 둘 다 웃으면서 나아요.",
      why: "Toad gets sick too. But when Frog tells him what Toad did to think of a story, both of them laugh and feel better." },
    { q: "Where did Toad find his lost button?",
      a: ["On the road", "At Frog's house", "In the pond", "At home on the floor"], c: 3,
      why_ko: "집의 바닥에 떨어져 있었어요! 그리고 그동안 찾던 다른 단추들은 모두 틀린 단추들이었죠. 그래서 두꺼비는 그 단추들을 모두 자기 재킷에 달아서 개구리에게 선물로 줘요.",
      why: "On the floor at home. After searching for the wrong buttons, the real one was there all along." },
    { q: "Why did Toad not want to go swimming?",
      a: ["He could not swim", "He did not like water", "He did not want to be seen in his bathing suit", "He was sick"], c: 2,
      why_ko: "자기 수영복 차림이 남들에게 보이는 게 싫었어요. 그런데 다른 동물들이 봤어요. 그리고 그들이 웃었어요. 그래도 두꺼비는 개구리와 수영했어요. 친구가 옆에 있으니까.",
      why: "He was shy about his bathing suit. But with Frog there, he went swimming anyway." },
    { q: "Why was Toad sad before he got the letter?",
      a: ["He lost his button", "He had no friends", "He never got any mail", "He could not read"], c: 2,
      why_ko: "편지를 받은 적이 없었어요. 누구도 자기에게 편지를 안 썼다고 생각했죠. 그런데 개구리가 편지를 써 줬어요. 그리고 그 편지가 도착했을 때 두꺼비는 정말 행복했어요.",
      why: "He had never received any mail, so he thought nobody cared about him. Getting a letter from Frog made him very happy." },
    { q: "How long did it take the snail to deliver the letter?",
      a: ["One day", "Two days", "Three days", "Four days"], c: 3,
      why_ko: "넷째 날에 도착했어요! 달팽이는 정말 느려요. 하지만 그래도 편지를 전달했어요. 그것이 중요한 거죠. 얼마나 오래 걸리든 친구의 마음이 전달되는 것.",
      why: "Four days. The snail is slow, but what matters is that the letter finally arrives." },
    { q: "What do all five stories in this book have in common?",
      a: ["They are all scary", "Frog helps Toad or they do things together",
          "They all happen in the spring", "Toad is always in danger"], c: 1,
      why_ko: "개구리가 항상 두꺼비를 도와줘요. 달력 페이지 떼기, 이야기 들려주기, 단추 찾기, 수영하기, 편지 기다리기... 모든 순간에 개구리는 두꺼비 옆에 있어요. 그게 친구라는 거죠.",
      why: "In every story, Frog is there for Toad. That is what true friendship means." },
    { q: "Which story shows that Toad is silly?",
      a: ["Spring", "The Story", "A Lost Button", "A Swim"], c: 1,
      why_ko: "이야기 생각 이야기에서죠. 개구리를 도와주기 위해 머리 위에 물을 붓고, 벽에 머리를 부딪혀요. 그게 우리를 웃기는 장면이에요. 그런데 그 '어리석음' 때문에 둘이 더 가까워지는 거예요.",
      why: "In The Story. Toad does silly things (pours water on his head, bangs his head) to think of a story. Frog loves him for it." },
    { q: "What is this book really about?",
      a: ["Animals having fun", "Being brave in danger",
          "Friends being there for each other", "Learning from mistakes"], c: 2,
      why_ko: "친구가 있다는 것, 친구를 위해 무엇이든 하는 것. 개구리와 두꺼비는 서로 다르지만, 함께 있을 때 그 차이가 문제가 아니에요. 그게 이 책의 심장이에요.",
      why: "Friendship. Through every story, Frog and Toad show that being there for someone is what friendship is." }
  ],

  // ── ③ 요약 지도 ────────────────────────────────────────────
  summaryMap: {
    setting: { place: "{{their homes and the places nearby}}", time: "{{spring}}" },
    swbst: [
      { k: "Somebody", v: "{{Frog and Toad}}" },
      { k: "Wanted",   v: "{{to be together and help each other}}" },
      { k: "But",      v: "{{small problems came: Toad wanted to sleep, needed a story, lost a button, felt shy, was lonely}}" },
      { k: "So",       v: "{{Frog helped solve each problem}}" },
      { k: "Then",     v: "{{they stayed together as true friends}}" }
    ],
    scenes: [
      { label: "Spring",
        given: "Toad wakes up and Frog tells him it is spring.",
        frame: "But Toad {{wants to sleep more}}, so {{Frog tears pages from the calendar to make it May}}." },
      { label: "The Story",
        given: "Frog is sick and cannot move, so Toad tries to think of a story.",
        frame: "Toad {{walks, stands on his head, pours water on himself}} to {{think hard}}, and {{then Toad gets sick too}}." },
      { label: "A Lost Button",
        given: "Toad loses a button from his jacket.",
        frame: "They {{search everywhere}} and {{find many wrong buttons}}, but {{Toad finds his real button at home on the floor}}." },
      { label: "A Swim",
        given: "Toad does not want to go swimming because he is shy.",
        frame: "Toad {{does not want to be seen}} in {{his bathing suit}}, but {{he goes swimming with Frog anyway}}." },
      { label: "The Letter",
        given: "Toad is sad because he never gets any mail.",
        frame: "Frog {{writes him a letter}} and {{gives it to the snail}}, and {{they wait together until Snail delivers it}}." }
    ]
  },

  // ── ④ 마인드맵 ────────────────────────────────────────────
  mindMap: {
    center: "Frog and Toad Are Friends",
    branches: [
      { label: "Frog",        ask: "What does Frog do to help Toad in each story?",
        deeper: "Why does he always know how to help?" },
      { label: "Toad",        ask: "What problems does Toad have?",
        deeper: "Is Toad always unhappy or scared?" },
      { label: "Five Stories",  ask: "What is the problem in each story?",
        deeper: "Can problems be solved with a friend?" },
      { label: "Patience",    ask: "Who is patient? Frog or Toad?",
        deeper: "Why does patience matter in friendship?" },
      { label: "Me",          ask: "When have you needed a friend's help?",
        deeper: "What kind of friend do you want to be?" },
      { label: "Friendship",  ask: "What makes Frog and Toad such good friends?",
        deeper: "Can a frog and a toad really be best friends?" }
    ]
  },

  // ── ⑤ IB 탐구 ────────────────────────────────────────────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Connection", "Support", "Character"],
    globalContext: "Identities and relationships — how we show care for people we love",
    statement: "True friendship means being present for someone through small and big moments.",
    factual: [
      "What are the five stories in this book?",
      "What does Frog do to help in each story?"
    ],
    conceptual: [
      "Why does Frog stay with Toad even when Toad is silly or sad?",
      "How do differences make Frog and Toad better friends?"
    ],
    debatable: [
      "Is it harder to be a good friend or to have a good friend?",
      "Does patience make friendship stronger?"
    ],
    learnerProfile: ["Caring", "Thoughtful", "Communicator", "Reflective"]
  },

  // ── ⑥ 논술형 ────────────────────────────────────────────
  essay: {
    prompt: "Frog was always there for Toad. What makes someone a good friend? Use one story from the book to explain.",
    conditions: [
      "4문장 이상 쓸 것 · Write at least 4 sentences",
      "책의 한 장면을 넣을 것 · Use one story from the book",
      "because 를 한 번 쓸 것 · Use \"because\" once",
      "good friend 가 무엇인지 정의할 것 · Say what a good friend does"
    ],
    steps: [
      { part: "Title",       ask: "What is your writing about?",
        eg: "A Good Friend Helps", lines: 1 },
      { part: "Opinion",     ask: "What does a good friend do? One sentence.",
        eg: "A good friend is always there when you need help.", lines: 2 },
      { part: "Example",     ask: "What did Frog do? Write one story.",
        eg: "In the Lost Button story, Frog searched everywhere for Toad's button.", lines: 2 },
      { part: "Because",     ask: "Why is that being a good friend?",
        eg: "This is good friendship because Frog did not give up.", lines: 2 },
      { part: "Ending",      ask: "Say it again in a new way.",
        eg: "So Frog is a good friend.", lines: 1 }
    ],
    expressions: [
      "A good friend ...",
      "In the (story) ...",
      "This is because ...",
      "So ... is a good friend."
    ],
    rubric: [
      { c: "생각",  d: "좋은 친구가 뭔지 설명했나요? · Did I say what a good friend does?" },
      { c: "근거",  d: "책의 한 장면을 썼나요? · Did I use a story from the book?" },
      { c: "까닭",  d: "왜 그게 좋은 친구인지 말했나요? · Did I explain why?" },
      { c: "글씨",  d: "대문자와 마침표를 다시 봤나요? · Did I check capitals and periods?" }
    ]
  },

  // ── ⑦ 교사용 ────────────────────────────────────────────
  teaching: {
    goal: {
      en: "Students name the five stories and what Frog does in each, then explain what friendship means.",
      ko: "다섯 이야기를 말하고, 각각에서 개구리가 한 일을 설명한 뒤, 친구란 무엇인지 자기말로 말한다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Do you have a best friend? What is their name?",
        do: "책을 펴기 전에 아이의 경험을 먼저 꺼낸다. 다섯 명쯤.",
        exp: "My best friend is Sam.",
        stuck: "선생님이 먼저 말한다. \"My best friend is Alex.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning. I say the Korean, you say the English word.",
        do: "숙제 확인. 열 개 중 다섯 개만.",
        exp: "친구 → friend / 편지 → letter / 단추 → button",
        stuck: "예문을 읽어 준다. \"Toad lost a button from his jacket.\"" },

      { stage: "Comprehension", min: "12~25분",
        say: "Read the question. Turn it into the first half of your answer.",
        do: "화살표로 한 번 보여 준다.",
        exp: "Toad wanted to sleep until May because Frog tore the calendar.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "책을 펴게 하고 손가락을 확인한다.",
        stuck: "\"It is in the Spring story. Find the calendar.\"" },

      { stage: "Grammar", min: "25~35분",
        say: "Look at the red words. Read them out loud. What changed?",
        do: "규칙을 먼저 말하지 않는다. 아이가 먼저 알아차리게.",
        exp: "They end with -ed. They are past tense.",
        stuck: "원형을 만든다. \"tear → tore / want → wanted\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then YOU TRY. Write one sentence with a past verb.",
        do: "한 문장만 쓰면 끝.",
        exp: "Frog tore the calendar and Toad was happy.",
        stuck: "주어를 준다. \"Frog {{___}} ... Toad {{___}} ...\"" },

      { stage: "Summary Map", min: "35~43분",
        say: "Somebody — Wanted — But — So — Then. The whole book in five boxes.",
        do: "다섯 칸을 손가락으로 짚으며 외운다.",
        exp: "Somebody: Frog and Toad / Wanted: to be together",
        stuck: "\"Who are they? What do they want?\" 첫 두 칸만." },

      { stage: "Mind Map", min: "43~53분",
        say: "Top lines first. Those answers are in the book. Go fast.",
        do: "윗줄은 5분.",
        stuck: "한 가지를 고르고 같이 채운다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow. Don't tell me what happened — tell me what it MEANS.",
        do: "→ 칸에서 멈춘다.",
        exp: "It means Frog always knows how to help because he cares.",
        stuck: "\"You told me the action. Now — so what? Why does it matter?\"" },

      { stage: "IB Inquiry", min: "53~61분",
        say: "Does patience make friendship stronger? Yes or no. Pick one.",
        do: "1·2단은 말로. 3단만 글로.",
        exp: "Yes, because in the book Frog waits for Toad without getting angry.",
        stuck: "손을 들게 한다. \"Yes? No?\" 몸으로 정하면 글이 나온다." },

      { stage: "Writing", min: "61~73분",
        say: "Read the four conditions out loud with me.",
        do: "조건 넷을 소리 내어 읽는다.",
        stuck: "조건을 손가락으로 세게 한다." },

      { stage: "Wrap-up", min: "73~78분",
        say: "One person, read your first sentence. Just the first one.",
        do: "첫 문장만 발표.",
        stuck: "자원자가 없으면 선생님이 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "Do you have a friend who helps you?", ko: "너를 도와주는 친구가 있니?" },
        { en: "What do you do when your friend is sad?", ko: "친구가 슬프면 넌 뭘 해 주니?" },
        { en: "Is it hard to be a good friend? Why?", ko: "좋은 친구가 되기는 힘들까? 왜?" }
      ],
      during: [
        { en: "Why does Frog always help Toad?", ko: "개구리는 왜 항상 두꺼비를 도워?" },
        { en: "Does Toad always ask for help or does Frog just know?", ko: "두꺼비가 도움을 청할까, 아니면 개구리가 알아서 도와줄까?" }
      ],
      after: [
        { en: "Which story shows the best friendship? Why?", ko: "어느 이야기가 제일 좋은 친구 관계를 보여 줄까? 왜?" },
        { en: "Can you be like Frog? How?", ko: "넌 개구리처럼 될 수 있을까? 어떻게?" },
        { en: "What would you tell Toad if he was sad?", ko: "두꺼비가 슬프면 넌 뭐라고 말해 주겠니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "숙제로 세 번 읽어 오게 한다.", miss: "뜻만 외운다. 예문이 재료다." },
      { sheet: "Comprehension", point: "질문을 문장으로 바꾸기부터.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",      point: "빨간 부분만 읽고 규칙을 아이가.", miss: "규칙을 읽어 주려 한다." },
      { sheet: "Summary Map",   point: "SWBST를 먼저.", miss: "책에서 베낀다. 자기 말로 바꾸게." },
      { sheet: "Mind Map",      point: "→ 칸에서 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상을 쓴다." }
    ],
    scoring: [
      { c: "생각 Opinion", pt: 5, yes: "좋은 친구가 뭔지 설명했다", no: "뭔가 모호하다" },
      { c: "근거 Example", pt: 5, yes: "책에서 한 가지 이야기를 썼다", no: "책과 상관없다" },
      { c: "까닭 Reason",  pt: 5, yes: "왜 그게 좋은 친구인지 말했다", no: "까닭이 없다" },
      { c: "글씨 Writing", pt: 5, yes: "대문자·마침표를 다시 봤다", no: "빠진 부분이 있다" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "개구리가 두꺼비를 깨우는 봄 장면", "text": "It is [[springtime|spring]]. Frog runs to the house of his best [[pal|friend]], Toad. \"Wake up, Toad!\" But Toad wants to [[snooze|sleep]] until May. Frog has an idea. He pulls the old pages off Toad's calendar, one by one, until it says May. Toad looks at it. \"It is May already!\" he says. The two [[pals|friends]] go outside together into the warm sun."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Who We Are",
 "themeKo": "우리는 누구인가",
 "profile": [
  {
   "attr": "Caring",
   "how": "Find the small things Frog and Toad do for each other."
  },
  {
   "attr": "Communicator",
   "how": "Talk about feelings: waiting, being embarrassed, being sick."
  }
 ],
 "hook": [
  "Show an empty mailbox: how does it feel when nobody writes to you?",
  "Two friend puppets: one wants to play, one wants to sleep. What should they do?"
 ],
 "connections": [
  {
   "subject": "Science",
   "idea": "Seasons and hibernation: why does Toad sleep until spring?"
  },
  {
   "subject": "Social skills",
   "idea": "A friendship recipe: what goes into a good friend?"
  },
  {
   "subject": "Language",
   "idea": "Letter writing: parts of a friendly letter."
  }
 ],
 "speaking": [
  "Role play one story with a partner; swap roles.",
  "Think-Pair-Share: tell about a time a friend helped you."
 ],
 "writing": [
  "Write a letter to a friend, like Frog's letter to Toad.",
  "Write a new short Frog and Toad story in three parts."
 ]
};
