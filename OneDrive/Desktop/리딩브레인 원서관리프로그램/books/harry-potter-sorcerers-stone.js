// 리딩브레인 원서프로그램 — 책 한 권 데이터
// {{}} 는 학생이 채우는 밑줄 칸이다. 인쇄하면 밑줄, 화면에서는 입력칸이 된다.

window.BOOK = {
  bookNo: "S5084",
  slug: "harry-potter-sorcerers-stone",
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J. K. Rowling",
  series: "Harry Potter",
  publisher: "Scholastic",
  level: { ar: "5.5", lexile: "880L", rb: "정독 4단계" },
  awards: [],
  defSource: "Wiktionary (CC BY-SA)",
  cover: "assets/covers/harry-potter-sorcerers-stone.jpg",

  shadowing: {
    query: "\"Harry Potter and the Sorcerer's Stone\" read aloud",
    searchUrl: "https://youtu.be/kmjN3ntr9fE",
    qr: "assets/qr/harry-potter-sorcerers-stone.png",
    videos: [
      { url: "https://youtu.be/kmjN3ntr9fE", title: "FULL AUDIOBOOK | Harry Potter and the Sorcerer's Stone | Chapters 1-5 | Narrated by Jim Dale", channel: "Harry Potter", views: "73,087", length: "" },
      { url: "https://youtu.be/ly0lYvrGaP0", title: "Chapter 1: Harry Potter and the Sorcerer's Stone (Illustrated)", channel: "Lydia Taylor", views: "49,980", length: "" },
      { url: "https://youtu.be/52UUi51mZWE", title: "Chapter One of Harry Potter and the Sorcerer's Stone Read Aloud (Chapter 1)", channel: "Brittani Gatewood", views: "24,463", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "orphan",      pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/orphan.mp3", en: "A child whose parents are dead", ko: "고아", ex: "Harry became an {{orphan}} when his parents died, and his aunt and uncle raised him.", ex_ko: "해리의 부모가 죽으면서 {{고아}}가 되었고, 이모와 이모부에게 자라났어요.", pic: "😢" },
    { word: "mistreat",    pos: "v.", audio: "assets/audio/harry-potter-sorcerers-stone/mistreat.mp3", en: "To treat someone badly or cruelly", ko: "학대하다, 못하게 대우하다", ex: "The Dursleys {{mistreated}} Harry by treating him like a servant.", ex_ko: "더즐리 가족은 해리를 사용인처럼 {{못하게 대우했어요}}.", pic: "😠" },
    { word: "cupboard",    pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/cupboard.mp3", en: "A cabinet or small room built into a wall, used for storage", ko: "찬장, 작은 방", ex: "Harry slept in a small {{cupboard}} under the stairs with spiderwebs.", ex_ko: "해리는 거미줄이 있는 계단 아래의 작은 찬장에서 잤어요.", pic: "🕷️" },
    { word: "bewildered",  pos: "adj.", audio: "assets/audio/harry-potter-sorcerers-stone/bewildered.mp3", en: "Completely confused and puzzled", ko: "당황한, 어리둥절한", ex: "Harry was {{bewildered}} when he learned he was a wizard and famous among magical people.", ex_ko: "해리는 자신이 마법사이고 유명하다는 것을 알았을 때 {{당황했어요}}.", pic: "😲" },
    { word: "legacy",      pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/legacy.mp3", en: "Something that is left or remains from a person or the past", ko: "유산, 후대에 물려진 것", ex: "Harry inherited a {{legacy}} of fame and magic from his parents.", ex_ko: "해리는 부모로부터 유명함과 마법의 {{유산}}을 물려받았어요.", pic: "👑" },
    { word: "peril",       pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/peril.mp3", en: "Danger; risk of harm or loss", ko: "위험, 위험한 상황", ex: "The stone was hidden because it was in {{peril}} from those who wanted its power.", ex_ko: "그 돌은 그것의 힘을 원하는 자들로부터의 {{위험}}으로부터 숨겨졌어요.", pic: "⚠️" },
    { word: "incantation", pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/incantation.mp3", en: "A magical formula or spell spoken aloud", ko: "주문, 마법 주문", ex: "Wizards use {{incantations}} to make magic happen in the magical world.", ex_ko: "마법사들은 마법을 일으키기 위해 {{주문}}을 사용해요.", pic: "✨" },
    { word: "apparatus",   pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/apparatus.mp3", en: "Equipment, machines, or devices designed for a particular purpose", ko: "기구, 장비", ex: "The Hogwarts castle had magical {{apparatus}} in every room for learning magic.", ex_ko: "호그와트 성에는 마법을 배우기 위한 마법의 {{기구}}가 모든 방에 있었어요.", pic: "🔧" },
    { word: "mentor",      pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/mentor.mp3", en: "A trusted advisor or experienced person who teaches or guides a younger or less experienced person", ko: "스승, 멘토", ex: "Dumbledore became a {{mentor}} to Harry, guiding him through his magical education.", ex_ko: "덤블도어는 해리의 {{스승}}이 되어 마법 교육을 이끌어줬어요.", pic: "👨‍🏫" },
    { word: "treachery",   pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/treachery.mp3", en: "Betrayal; violation of trust", ko: "배신, 반역", ex: "The teacher's {{treachery}} was discovered when his hidden connection to evil was revealed.", ex_ko: "그 선생님의 {{배신}}이 드러났을 때 그의 숨겨진 악의 연결고리가 밝혀졌어요.", pic: "🗡️" },
    { word: "compassion",  pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/compassion.mp3", en: "Sympathetic concern for the sufferings of others", ko: "동정심, 연민", ex: "Harry showed {{compassion}} toward Neville even when Neville made mistakes in class.", ex_ko: "해리는 네빌이 수업에서 실수를 해도 {{동정심}}을 보였어요.", pic: "❤️" },
    { word: "sacrifice",   pos: "n.", audio: "assets/audio/harry-potter-sorcerers-stone/sacrifice.mp3", en: "The destruction or surrender of anything for the sake of something else regarded as more valuable", ko: "희생", ex: "Harry's mother made the ultimate {{sacrifice}} to protect her son from dark magic.", ex_ko: "해리의 엄마는 아들을 어둠의 마법으로부터 보호하기 위해 궁극의 {{희생}}을 했어요.", pic: "💫" }
  ],

  // ── ①-2 문법 ─────────────────────────────────
  grammar: {
    points: [
      { name: "Past Perfect — had + past participle", ko: "대과거 (had + 과거분사)",
        sent: "Before Harry learned he was a wizard, he [[had lived]] a difficult life with the Dursleys. Once he [[had arrived]] at Hogwarts, everything changed.",
        why_ko: "과거완료 had + 과거분사 = 과거보다 더 이전의 일(대과거). 호그와트에 오기 '전에' 이미 힘들게 살았던 것처럼요!",
      why: "Use had + past participle to show that one past action happened before another past action. The earlier action uses past perfect.",
        try: "Before the test, Harry {{had studied}} for days. Once the stone {{had been found}}, the danger increased." },
      { name: "Reported Speech — he said that...", ko: "간접 화법",
        sent: "Hagrid told Harry [[that he was]] a wizard. Dumbledore explained [[that Harry's parents had died]] protecting him.",
        why_ko: "간접화법: 남의 말을 옮길 땐 that을 쓰고, 시제를 한 칸 과거로! is → was, has died → had died. 인칭도 바꿔요.",
      why: "When you report what someone said, change the tense one step back: present → past, past → past perfect. Move the person to third person.",
        try: "Harry told Ron {{that he lived}} with his aunt. Dumbledore said {{that danger was}} coming." },
      { name: "Present Participle — -ing", ko: "현재분사",
        sent: "[[Searching]] through the castle, Harry discovered secrets. [[Using]] magic wisely, he learned to control his power.",
        why_ko: "분사구문 -ing: 주절과 '동시에' 일어난 일을 짧게 표현해요. Searching the castle, Harry ~ = 성을 뒤지면서 해리는 ~.",
      why: "Use -ing form to describe an action that happens AT THE SAME TIME as the main verb, or to describe what someone is doing.",
        try: "{{Walking}} down the corridor, Harry {{heard}} a mysterious voice. {{Learning}} to trust his friends, he became braver." }
    ],
    find: "책에서 had 가 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences with had in the book.",
    exam: {
      choose: [
        {"q": "Before Hogwarts, Harry (had lived / has lived) in a cupboard.", "a": "had lived", why_ko: "호그와트에 가기 '전'의 일, 더 앞선 과거예요. has lived가 아니라 had lived!" },
        {"q": "Hagrid told Harry that he (was / is) a wizard.", "a": "was", why_ko: "told(과거)로 전하는 말이니 시제도 한 칸 과거로! is가 아니라 was." },
        {"q": "(Searching / Searched) the castle, Harry found the mirror.", "a": "Searching", why_ko: "해리가 '뒤지면서' 찾은 거예요. 주어가 직접 하는 동작의 분사구문은 -ing, Searching!" },
        {"q": "Dumbledore said that the Stone (was / is) in danger.", "a": "was", why_ko: "said(과거)로 옮긴 말이에요. 시제를 맞춰 is가 아니라 was!" },
        {"q": "Harry realized that Quirrell (had lied / lies) to everyone.", "a": "had lied", why_ko: "거짓말은 깨닫기 '전에' 이미 한 일이에요. 더 앞선 과거 had lied!" }
      ],
      fix: [
        {"q": "Before he came to Hogwarts, Harry [[has lived]] with the Dursleys.", "a": "had lived", why_ko: "Before he came(과거)보다 더 먼저 일이에요. has lived를 had lived로 고쳐요." },
        {"q": "Hagrid told Harry that he [[is]] a wizard.", "a": "was", why_ko: "간접화법에서 told(과거) 뒤에는 시제를 한 칸 과거로! is를 was로 고쳐요." },
        {"q": "[[Walk]] down the corridor, Harry heard a voice.", "a": "Walking", why_ko: "해리가 '걸으면서' 들은 거예요. 분사구문은 동사원형이 아니라 -ing, Walking!" }
      ],
      write: [
        {"ko": "호그와트에 가기 전에 해리는 이모네 가족과 살았었다.", "cond": "before, had lived", "a": "Before Hogwarts, Harry had lived with his aunt's family.", why_ko: "호그와트 '전'의 더 앞선 과거는 had + 과거분사예요. Harry had lived ~." },
        {"ko": "해그리드는 해리에게 그가 마법사라고 말했다.", "cond": "told, that, was", "a": "Hagrid told Harry that he was a wizard.", why_ko: "남의 말을 전할 때는 told + 사람 + that + 주어 + 동사, 시제는 과거로! he was a wizard." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────
  comprehension: [
    { ref: "ch. 1~2",    skill: "사실찾기",   q: "Who were Harry's parents, and what happened to them?",
      frame: "Harry's parents {{were wizards}} and {{they were killed by a dark wizard when Harry was a baby}}." },
    { ref: "ch. 4",      skill: "사실찾기",   q: "How did Harry's life change when Hagrid came?",
      frame: "Hagrid told Harry {{he was a wizard}} and {{he was famous because he had survived an attack by an evil wizard}}." },
    { ref: "ch. 5~6",    skill: "어휘",       q: "What does the Sorting Hat do, and why is it important?",
      frame: "The Sorting Hat {{places each new student into one of four houses}}. This is important because {{it determines where students live and who they live with}}." },
    { ref: "ch. 7~8",    skill: "추론·예측",  q: "What clues suggest that something dangerous is happening at Hogwarts?",
      frame: "Harry notices {{his scar hurts, teachers seem worried, and something is being guarded in the school}}." },
    { ref: "ch. 9~10",   skill: "사실찾기",   q: "What are the obstacles guarding the stone inside the castle?",
      frame: "There is {{a three-headed dog, a magical plant, flying keys, a giant chess game, a logic puzzle, and a magical mirror}}." },
    { ref: "ch. 16",     skill: "추론·예측",  q: "What does Harry see in the Mirror of Erised, and why is it important?",
      frame: "Harry sees {{his parents alive}} in the mirror, which shows {{what he wants most in his heart}}." },
    { ref: "ch. 17",     skill: "주제·요점",  q: "How does Harry get the stone, and why does he try to protect it?",
      frame: "The stone {{appears in Harry's pocket because he wanted to find it but not use it}}. He {{tries to protect it because he believes someone evil is trying to steal it}}." }
  ],

  // ── ②-2 북퀴즈 10문제 ──────────────────────
  quiz: [
    { q: "Where did Harry live before going to Hogwarts?",
      a: ["In an orphanage", "With his parents", "In a cupboard under the stairs in the Dursleys' house", "In a magical community"], c: 2,
      why_ko: "더즐리 가족 집의 계단 아래 작은 찬장에서 살았어요. 이모와 이모부요. 따뜻한 집이 아니었다는 건 한눈에 알 수 있죠.",
      why: "In a cupboard under the stairs. That one detail tells you everything about how he was treated — not as family, but as a burden to hide away." },
    { q: "Who told Harry that he was a wizard?",
      a: ["His aunt", "Dumbledore", "Hagrid on his 11th birthday", "A letter from Hogwarts"], c: 2,
      why_ko: "해그리드예요. 그리고 해그리드는 해리가 고아라는 것도 처음 알려줘요. 그 순간이 얼마나 중요한지 상상해 보세요.",
      why: "Hagrid tells him on his 11th birthday. He is the first person to tell Harry the complete truth — his parents, his fame, his magical blood. Hagrid is the bridge between Harry's two worlds." },
    { q: "What makes Harry famous in the magical world?",
      a: ["He is very intelligent", "He defeated a dark wizard when he was a baby", "He is the richest wizard", "He invented powerful magic"], c: 1,
      why_ko: "아기일 때 어둠의 마법사를 이겼거든요. 자기도 모르게, 기적처럼. 그런데 모든 마법 세계가 그것을 기억하고 있어요. 얼마나 큰 일이었는지 알 수 있죠.",
      why: "He survived a dark wizard's curse when he was a baby. Nobody else had ever done that. The magical world saw him as their savior without him knowing it." },
    { q: "What is the Sorting Hat?",
      a: ["A magical object that grades students", "A hat that assigns students to one of four houses", "A hat that teaches magic", "A hat that tells your future"], c: 1,
      why_ko: "학생들을 네 집에 배치하는 거예요. 이 결정이 학교 생활의 거의 모든 걸 정해요. 친구도, 숙소도, 심지어 경쟁까지.",
      why: "It sorts each new student into one of four houses. That one moment shapes your entire school life. It is why houses matter so much." },
    { q: "Which house is Harry sorted into?",
      a: ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"], c: 2,
      why_ko: "그리핀도르요. 용감한 학생들이 모이는 집. 해리의 아빠도 여기 있었어요. 그래서 더 의미가 있는 거죠.",
      why: "Gryffindor. It is where brave students belong. Harry's father was in Gryffindor. That connection to his past matters more than Harry knows." },
    { q: "Who is secretly trying to steal the stone at Hogwarts?",
      a: ["Dumbledore", "Professor Snape", "Professor Quirrell with Voldemort on the back of his head", "A student from Slytherin House"], c: 2,
      why_ko: "퀴렐 교수예요. 그런데 뒷머리에 볼드모트가 있어요. 한 몸인 거죠. 이게 얼마나 끔찍한지 상상이 돼요.",
      why: "Professor Quirrell. But Voldemort is attached to the back of his head. That is the true horror — Quirrell is not even fully his own person anymore." },
    { q: "What protects the stone from being stolen or used?",
      a: ["A magical spell", "The Mirror of Erised — only someone who wants to find it but not use it can get it", "A locked box with no key", "Dumbledore standing guard"], c: 1,
      why_ko: "거울이 보호해요. 거울은 네 마음을 본다는 뜻이에요. 자기 것만 갖고 싶은 사람은 거울에서 돌을 못 꺼낼 수 있어요.",
      why: "The Mirror of Erised. It shows what your heart desires most. Only someone who wants to FIND the stone but does not want to USE it can take it. That is the most powerful protection of all." },
    { q: "Why can't Quirrell touch Harry?",
      a: ["Harry is stronger than Quirrell", "Harry has magical powers Quirrell doesn't know about", "Harry's mother's love created a protection that Quirrell cannot break", "Harry is protected by Dumbledore's magic"], c: 2,
      why_ko: "해리 엄마의 사랑이 만든 보호예요. 자기 아들을 지키기 위해 죽을 때 해리 몸에 그 사랑이 남겨졌어요. 그 사랑이 악을 밀어낼 수 있어요.",
      why: "Harry's mother's love. When she died to protect him, that love became a shield. Love is what Voldemort cannot understand. It is his greatest weakness." },
    { q: "What happens to the Sorcerer's Stone at the end?",
      a: ["Harry takes it home", "Dumbledore destroys it", "Quirrell steals it", "It is locked away in the castle forever"], c: 1,
      why_ko: "파괴되어요. 더 이상 아무도 쓸 수 없게. 그 돌로 인한 위험이 끝난 거예요.",
      why: "It is destroyed. The danger that came with it is gone. Immortality is no longer possible, and that is better for the world." },
    { q: "What does Harry learn by the end of his first year?",
      a: ["Magic is easy if you study hard", "Gryffindor is the best house", "He is important because of who his parents were, but his real power comes from his choices and the people who love him",
          "The wizarding world is all good and the non-magical world is all bad"], c: 2,
      why_ko: "자기 이름이 유명하다고 생각했어요. 하지만 배운 것은 다다예요. 진짜 중요한 건 나이고, 내 선택이고, 날 사랑하는 사람들이에요. 그게 진정한 힘이라는 거.",
      why: "He arrives thinking he is special because his parents were famous. He leaves knowing that his real power comes from his own heart, his own choices, and the love of his friends. That is the real magic." }
  ],

  // ── ③ 요약 지도 ───────────────────────────────
  summaryMap: {
    setting: { place: "{{the Dursleys' house and Hogwarts School of Witchcraft and Wizardry}}", time: "{{Harry's first year at magical school}}" },
    swbst: [
      { k: "Somebody", v: "{{Harry, a young wizard who does not know about his own magical past}}" },
      { k: "Wanted",   v: "{{to learn magic and find where he belonged}}" },
      { k: "But",      v: "{{danger was hidden inside Hogwarts in the form of something very valuable}}" },
      { k: "So",       v: "{{Harry discovered the danger and tried to stop it}}" },
      { k: "Then",     v: "{{Dumbledore revealed the truth, and Harry understood his mother's love protected him}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Harry lives a miserable life with the Dursleys, who keep his magical identity secret.",
        frame: "Harry sleeps {{in a cupboard under the stairs}} and {{is treated like a servant}}." },
      { label: "1",
        given: "",
        frame: "Hagrid arrives on Harry's 11th birthday and tells him {{that he is a wizard}} and {{that his parents were killed by an evil wizard when he was a baby}}." },
      { label: "2",
        given: "Harry goes to Diagon Alley and buys his supplies for Hogwarts.",
        frame: "Harry {{meets Hagrid, goes to Gringotts, buys his wand, and meets other students on the train to school}}." },
      { label: "3",
        given: "",
        frame: "Harry is sorted into Gryffindor House and {{makes his first real friends: Ron and Hermione}}." },
      { label: "4",
        given: "Harry discovers that something valuable and dangerous is hidden in the castle.",
        frame: "Harry, Ron, and Hermione learn about {{the Sorcerer's Stone}} and suspect that {{Snape wants to steal it}}." },
      { label: "End",
        given: "Harry confronts the danger he uncovered in the castle.",
        frame: "Harry learns {{that his mother's love protects him}} and {{that real power comes from his own choices, not his famous name}}." }
    ]
  },

  // ── ④ 마인드맵 ───────────────────────────────
  mindMap: {
    center: "Harry Potter and the Sorcerer's Stone",
    branches: [
      { label: "Harry", ask: "What do we KNOW about Harry? What does he NOT know about himself?",
        deeper: "How does learning the truth change who he thinks he is?" },
      { label: "Belonging", ask: "What does Harry have with the Dursleys? What does he find at Hogwarts?",
        deeper: "Is Hogwarts 'home' because of the place, or because of the people?" },
      { label: "Good vs. Evil", ask: "Who are the good characters? Who is evil? How can you tell?",
        deeper: "Is everyone either totally good or totally evil, or is it more complicated?" },
      { label: "The Stone", ask: "Why is the stone dangerous? Who wants it, and why?",
        deeper: "What does the stone represent in this story?" },
      { label: "Me", ask: "When have you discovered something about yourself that changed everything?",
        deeper: "How did that discovery change how you saw yourself?" },
      { label: "The World", ask: "In this book, magic is real and hidden. What in your world might be hidden and unknown?",
        deeper: "Does knowing a secret change how you see ordinary things?" }
    ]
  },

  // ── ⑤ IB 탐구 ───────────────────────────────
  ib: {
    keyConcept: "Identity",
    relatedConcepts: ["Heritage", "Belonging", "Truth", "Power"],
    globalContext: "Identities and relationships — who we are, where we come from, and where we belong (자신의 정체성, 어디서 왔는가, 어디에 속하는가)",
    statement: "A person's identity is shaped by their heritage, their choices, and the relationships they build — not by what others expect them to be.",
    factual: [
      "What happened to Harry's parents?",
      "Why is Harry famous in the magical world?",
      "What is hidden at Hogwarts, and why?"
    ],
    conceptual: [
      "How does Harry's understanding of himself change as the year progresses?",
      "Why does Rowling make Harry 'ordinary' in many ways, despite his fame?",
      "How do friendship and belonging help Harry discover who he really is?"
    ],
    debatable: [
      "Is Harry responsible for what he does to stop Quirrell?",
      "Does knowing your past help you, or does it limit your future?",
      "Who has more power — the person with magical ability, or the person with love and friendship?"
    ],
    learnerProfile: ["Thinker", "Caring", "Principled", "Reflective", "Open-minded", "Risk-taker", "Communicator"]
  },

  // ── ⑥ 논술형 ───────────────────────────────
  essay: {
    prompt: "Harry rushed to find the stone because he thought he had to protect it, but Dumbledore was watching over him all along. Did Harry make the right choice to act, or should he have trusted the adults? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣고 챕터를 밝힐 것 · Use one scene from the book and name the chapter",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",              ask: "What is your writing about?",
        eg: "Sometimes Courage Means Asking for Help", lines: 1 },
      { part: "P — Point",          ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Harry should have trusted Dumbledore instead of acting alone.", lines: 2 },
      { part: "E — Evidence",       ask: "What happened in the book? Write the scene and the chapter.",
        eg: "In ch. 17, Harry ran to find the stone without telling any adult what he discovered.", lines: 3 },
      { part: "E — Explanation",    ask: "Why does that scene prove your point?",
        eg: "This shows that Harry put himself in danger by trying to do everything alone.", lines: 2 },
      { part: "C — Counter",        ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say Harry was brave to act, but being brave and being reckless are not the same thing.", lines: 2 },
      { part: "L — Link",           ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe Harry learned that growing up means knowing when to ask for help.", lines: 2 }
    ],
    expressions: [
      "I think / In my opinion, ...",
      "This is because ...",
      "For example, in ch. __, ...",
      "This shows that ...",
      "Some people say ..., but I believe ...",
      "For this reason, ..."
    ],
    rubric: [
      { c: "A 분석",  d: "책 속 근거를 들어 설명했나요? · Did I use evidence from the book?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  },

  // ── ⑦ 교사용 ────────────
  teaching: {
    goal: {
      en: "Students trace how Harry's understanding of himself and the world changes, then argue what true courage means in the story.",
      ko: "해리의 성장을 따라가며, 진정한 용감함이 뭔지 판단해 쓴다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of something you believed about yourself that turned out to be wrong. How did you feel when you learned the truth?",
        do: "책을 펴기 전에 한다. 해리가 겪는 정체성의 충격을 아이 경험에서 먼저 꺼내야 한다.",
        exp: "I thought I was bad at art, but my teacher said I was good. / I thought my family was normal until I visited a friend's house.",
        stuck: "선생님이 먼저 한 문장 한다. 어른의 솔직함이 아이를 열게 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열두 개를 다 묻지 말고 여덟 개만 고른다.",
        exp: "고아 → orphan / 배신 → treachery / 희생 → sacrifice",
        stuck: "예문을 읽어 준다. \"Harry became an {{orphan}}.\" 문맥을 주면 대개 나온다." },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it at home tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다.",
        stuck: "폰이 없는 아이는 교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 5분 재고 끊는다.",
        stuck: "\"Read the whole sentence first, then think of the word.\"" },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Who were Harry's parents...' becomes 'Harry's parents were...'",
        do: "이 한 마디가 서술형의 전부다. 매 시간 반복한다.",
        exp: "Harry's parents were wizards who died when he was a baby.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다. 못 짚으면 답이 맞아도 넘어가지 않는다.",
        stuck: "챕터를 알려 준다. \"It's in chapter 1. Find Harry's life with the Dursleys.\"" },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. What is different about them?",
        do: "규칙을 먼저 말하지 않는다. 빨간 부분만 읽히고 아이가 먼저 알아채게 한다.",
        exp: "The first one has had twice. The second one changes the verb tense.",
        stuck: "타임라인을 그려 준다. \"First action, then second action. Which tense goes first?\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다. 바로 써 보게 한다.",
        exp: "Before he went to school, Harry had lived with his aunt.",
        stuck: "이전/이후를 손가락으로 보여 준다. \"Which happened first?\"" },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find two sentences with 'had'. Two is enough.",
        do: "책을 다시 펴게 하는 것이 목적이다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look at the scenes before Hogwarts and before the magic.\" 범위를 좁혀 준다." },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how your school test asks it. Write only the answer on the right.",
        do: "답만 쓰게 한다. 문장을 통째로 옮겨 적는 아이를 시작 전에 막는다.",
        stuck: "1번을 같이 푼다. \"Before means earlier. So what tense do you need?\"" },

      { stage: "Exam Grammar", min: "",
        say: "Section three is different. Korean on the left, and you must use the words in the grey box.",
        do: "조건 단어를 빠뜨리면 내신에서 0점이라고 분명히 말해 준다.",
        exp: "Before Harry went to Hogwarts, he had lived with the Dursleys.",
        stuck: "한국어를 영어 어순으로 다시 읽어 준다. \"해리는 / 호그와트 전에 / 더즐리와 함께 살았었다.\"" },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 리듬처럼 손가락으로 짚으며 외우게 한다.",
        exp: "Somebody: Harry / Wanted: to belong / But: danger was coming",
        stuck: "\"Who is trying to do something? Who is it really about?\" 주인공을 다시 잡아 준다." },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "62~72분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다. 여기서 시간을 쓰면 정작 중요한 → 칸을 못 한다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map (Identity)", min: "",
        say: "What does Harry KNOW about himself at the start? What does he LEARN about himself?",
        do: "두 개의 목록을 만들게 한다. 그 차이가 이 책의 주제다.",
        exp: "Knows: I am poor, I am unloved. Learns: I am a wizard, I am famous, I have a family history.",
        stuck: "칠판에 두 칸을 그리고 한 줄씩 써 준다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't write what happened — write what it means.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "It shows that we do not know who we really are until someone tells us the truth.",
        stuck: "\"You told me the facts. Now tell me: so what? Why does it matter?\"" },

      { stage: "IB Inquiry", min: "72~80분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you can answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\" 라고 되묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "Steps 1 and 2, we do out loud. Step 3, you write. Pick a side — you cannot sit in the middle.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think Harry was right to act because he was trying to protect his new home.",
        stuck: "손을 들게 한다. \"Act alone or trust adults?\" 몸으로 편을 정하면 글이 나온다." },

      { stage: "Writing", min: "80~95분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다. 내신 서·논술형은 조건 누락이 감점 1순위다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means a scene and a chapter number. 'Harry was brave' is not evidence. 'In ch. 17, Harry ran to find the stone' is.",
        do: "근거와 감상을 구분해 준다. 칠판에 두 문장을 나란히 써 둔다.",
        exp: "In ch. 4, Hagrid told Harry he was a wizard.",
        stuck: "\"Which chapter? Find it now.\" 못 찾으면 근거를 바꾸게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say children should act alone to be brave, but real bravery sometimes means asking for help.",
        stuck: "\"Some people say..., but...\" 틀만 있으면 채운다." },

      { stage: "Wrap-up", min: "95~100분",
        say: "One person, read only your Counter sentence. Just that one.",
        do: "반박 문장만 발표시킨다. 세 명이면 충분하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "If you discovered you were someone completely different than you thought, how would that change your life?", ko: "내가 전혀 다른 사람이라는 걸 알게 되면 어떨까?" },
        { en: "What makes a real family — blood, or the people who love you?", ko: "진짜 가족은 뭘까 — 피, 아니면 날 사랑하는 사람들?" },
        { en: "Is it brave to act alone, or brave to ask for help?", ko: "혼자 행동하는 게 용감한 걸까, 아니면 도움을 청하는 게 용감한 걸까?" }
      ],
      during: [
        { en: "Why does Dumbledore allow danger in the school? Is he protecting Harry, or putting him at risk?", ko: "덤블도어는 왜 위험을 허용하나? 해리를 보호하는 걸까, 위험에 빠뜨리는 걸까?" },
        { en: "Harry makes friends quickly. What does that tell us about him, and about the Dursleys?", ko: "해리는 빨리 친구를 사귀어요. 그게 뭘 말해주나?" },
        { en: "When Harry realizes something is hidden at Hogwarts, why does he feel responsible for stopping it?", ko: "해리는 왜 자신이 그걸 막아야 한다고 생각할까?" }
      ],
      after: [
        { en: "Does the book end with a victory, or with a beginning?", ko: "이 책은 승리로 끝날까, 시작으로 끝날까?" },
        { en: "Harry thought he had to do everything alone. What did he learn?", ko: "해리는 뭘 배웠나?" },
        { en: "The book is called 'The Sorcerer's Stone,' but is the stone the real story?", ko: "진짜 이야기가 뭘까?" }
      ]
    },
    notes: [
      { sheet: "Vocabulary",     point: "예문을 소리 내어 읽히고 넘어간다.", miss: "뜻만 외우고 예문을 건너뛴다." },
      { sheet: "Comprehension",  point: "질문을 문장으로 바꾸기(Restate)부터 시킨다.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",      point: "빨간 부분만 가지고 이야기하고 바로 쓰게 한다.", miss: "규칙을 먼저 설명하려 한다." },
      { sheet: "Exam Grammar", point: "답만 이다. 전체 문장은 안 된다.", miss: "괄호를 통째로 옮겨 적는다." },
      { sheet: "Summary Map",    point: "SWBST 를 먼저, 지도는 그 다음.", miss: "빈칸을 책에서 베껴 온다." },
      { sheet: "Mind Map",       point: "아래 → 칸에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",     point: "1·2단은 말로, 3단만 글로.", miss: "Debatable 에 'it depends' 라고 쓴다." },
      { sheet: "Writing",        point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상을 쓴다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",      pt: 5, yes: "책 속 장면을 들고 챕터를 밝혔다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization",  pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",         pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",      pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "해리가 마법사임을 알고 돌을 지키는 장면", "text": "Harry Potter was a [[parentless boy|orphan]]. The Dursleys [[treated him badly|mistreated]] and made him sleep in a [[closet|cupboard]] under the stairs. On his eleventh birthday, Hagrid told the [[confused|bewildered]] boy that he was a wizard. At Hogwarts, Harry learned many [[spells|incantations]]. But the Sorcerer's Stone was in [[danger|peril]]: Professor Quirrell wanted to steal it. It was a shocking [[betrayal|treachery]]. Harry stopped him. Later, Dumbledore, his wise [[guide|mentor]], said his mother's [[selfless gift|sacrifice]] had protected him."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Who We Are",
 "themeKo": "우리는 누구인가",
 "profile": [
  {
   "attr": "Risk-taker",
   "how": "Look at courage: Harry, Hermione, Ron, and Neville each show a different kind."
  },
  {
   "attr": "Principled",
   "how": "Ask why Harry turns down the wrong friends and the easy way."
  }
 ],
 "hook": [
  "Hand out a sealed envelope addressed to each student: what if this letter changed your life?",
  "Sorting question: which matters more, where you are placed or what you choose?"
 ],
 "connections": [
  {
   "subject": "Literature",
   "idea": "The hero's journey: map Harry's steps from the cupboard to the stone."
  },
  {
   "subject": "Ethics",
   "idea": "The Mirror of Erised: what we want most, and whether it is good for us."
  },
  {
   "subject": "Social studies",
   "idea": "Houses and belonging: how groups shape identity, for better and worse."
  }
 ],
 "speaking": [
  "Formal debate: was Dumbledore right to let Harry face the danger?",
  "Book talk in pairs: which character changed the most? Use evidence."
 ],
 "writing": [
  "Write what you would see in the Mirror of Erised and what it says about you.",
  "Write an essay on choice and identity with two pieces of evidence."
 ]
};
