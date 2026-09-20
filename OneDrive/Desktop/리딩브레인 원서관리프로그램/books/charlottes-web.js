// 리딩브레인 원서프로그램 — 책 한 권 데이터
// 워크시트 4종이 모두 이 파일 하나를 읽는다. 책이 바뀌면 이 파일만 새로 만든다.
// {{}} 는 학생이 채우는 밑줄 칸이다. 인쇄하면 밑줄, 화면에서는 입력칸이 된다.

window.BOOK = {
  bookNo: "S4154",
  slug: "charlottes-web",
  title: "Charlotte's Web",
  author: "E.B. White",
  series: "Classic Chapter Book",
  publisher: "HarperCollins",
  level: { ar: "4.4", lexile: "680L", rb: "정독 3단계" },
  awards: ["Newbery Honor 1953"],
  defSource: "Wiktionary (CC BY-SA)",   // 영영 뜻을 어디서 가져왔는지. 직접 썼으면 "" 로 둔다.   // 칼데콧·뉴베리 등 수상 내역. 없으면 [] 로 둔다.
  cover: "assets/covers/charlottes-web.jpg", // 표지 이미지 경로 (비어 있으면 자리만 잡는다)

  shadowing: {
    query: "\"Charlotte's Web\" read aloud",
    searchUrl: "https://youtu.be/TgsD-xdJdoM",
    qr: "assets/qr/charlottes-web.png",
    videos: [
      { url: "https://youtu.be/TgsD-xdJdoM", title: "Charlotte's Web (Full Audiobook)", channel: "Life With Wisdom", views: "1,827,045", length: "" },
      { url: "https://youtu.be/voEvfc-pQJc", title: "🐷🕷️ CHARLOTTE'S WEB (Audiobook FULL TEXT Read-along) 🕷️🐷", channel: "Inglês Essencial", views: "579,191", length: "" },
      { url: "https://youtu.be/MbnJzVF0FRY", title: "🐷🕷️ CHARLOTTE'S WEB Chapter 1 (Audiobook Full Text Read-along) 🕷️🐷", channel: "Inglês Essencial", views: "129,877", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // en = 영영 뜻, ko = 한글 뜻. 둘 다 한 칸에 위아래로 찍힌다.
  // en 은 Wiktionary(CC BY-SA) 에서 가져온다. 사전에 뜻이 여럿이면
  // 반드시 "이 책에서 쓰인 뜻" 을 고른다 — terrific 을 "공포를 일으키는" 으로 두면 안 된다.
  vocabulary: [
    { word: "runt",        pos: "n.", audio: "assets/audio/charlottes-web/runt.mp3",   en: "The smallest animal of a litter", ko: "(한배에서) 가장 작은 새끼", ex: "Wilbur was the {{runt}} of the litter.", ex_ko: "윌버는 한배 새끼 중에서 가장 작은 새끼였어요.", pic: "🐷" },
    { word: "barn",        pos: "n.", audio: "assets/audio/charlottes-web/barn.mp3",   en: "A building, often found on a farm, used for storage or keeping animals such as cattle", ko: "헛간, 외양간",             ex: "The animals sleep in the {{barn}} at night.", ex_ko: "동물들은 밤에 헛간에서 잠을 자요.", pic: "🛖" },
    { word: "litter",      pos: "n.", audio: "assets/audio/charlottes-web/litter.mp3",   en: "The whole group of live young born at the same time", ko: "(동물의) 한배 새끼",        ex: "The pig had a {{litter}} of eleven piglets.", ex_ko: "그 돼지는 한배에 새끼를 열한 마리 낳았어요.", pic: "🐖" },
    { word: "salutations", pos: "n.", audio: "assets/audio/charlottes-web/salutations.mp3",   en: "A greeting, salute, or address", ko: "인사말",                   ex: "Charlotte said {{salutations}} when she first met Wilbur.", ex_ko: "샬롯은 윌버를 처음 만났을 때 인사말을 건넸어요.", pic: "👋" },
    { word: "web",         pos: "n.", audio: "assets/audio/charlottes-web/web.mp3",   en: "The silken structure which a spider builds", ko: "거미줄",                   ex: "The spider spun a new {{web}} in the doorway.", ex_ko: "거미가 문간에 새 거미줄을 쳤어요.", pic: "🕸️" },
    { word: "terrific",    pos: "adj.", audio: "assets/audio/charlottes-web/terrific.mp3", en: "Extremely good", ko: "굉장한, 대단한",            ex: "The second word in the web was {{terrific}}.", ex_ko: "거미줄에 쓰인 두 번째 단어는 '굉장한'이었어요.", pic: "🤩" },
    { word: "radiant",     pos: "adj.", audio: "assets/audio/charlottes-web/radiant.mp3", en: "Strikingly beautiful", ko: "빛나는, 환한",              ex: "Wilbur looked {{radiant}} after his buttermilk bath.", ex_ko: "윌버는 버터밀크 목욕을 하고 나서 환하게 빛나 보였어요.", pic: "✨" },
    { word: "humble",      pos: "adj.", audio: "assets/audio/charlottes-web/humble.mp3", en: "Having a low position or a low opinion of oneself", ko: "겸손한",                   ex: "Charlotte chose the word {{humble}} for the fair.", ex_ko: "샬롯은 박람회를 위해 '겸손한'이라는 단어를 골랐어요.", pic: "🙇" },
    { word: "miracle",     pos: "n.", audio: "assets/audio/charlottes-web/miracle.mp3",   en: "An event that appears inexplicable by the laws of nature", ko: "기적",                     ex: "The farmers believed the writing was a {{miracle}}.", ex_ko: "농부들은 그 글씨가 기적이라고 믿었어요.", pic: "🌟" },
    { word: "sac",         pos: "n.", audio: "assets/audio/charlottes-web/sac.mp3",   en: "A bag or pouch inside a plant or animal that typically contains a fluid", ko: "주머니, 알주머니",           ex: "Charlotte laid her eggs in a small {{sac}}.", ex_ko: "샬롯은 작은 알주머니에 알을 낳았어요.", pic: "🥚" },
    { word: "loyal",       pos: "adj.", audio: "assets/audio/charlottes-web/loyal.mp3", en: "Faithful to a person or cause", ko: "충실한, 의리 있는",          ex: "A {{loyal}} friend never leaves you alone.", ex_ko: "의리 있는 친구는 절대 너를 혼자 두지 않아요.", pic: "🤝" },
    { word: "sacrifice",   pos: "n.", audio: "assets/audio/charlottes-web/sacrifice.mp3",   en: "The destruction or surrender of anything for the sake of something else regarded as more valuable", ko: "희생",                     ex: "Charlotte's {{sacrifice}} saved Wilbur's life.", ex_ko: "샬롯의 희생이 윌버의 목숨을 구했어요.", pic: "💝" }
  ],

  // ── ①-2 문법 (영영문법 1장 + 입시문법 1장) ─────────────
  // 문장은 책의 장면으로 만든 것이다. [[ ]] 가 빨간 밑줄, {{ }} 가 학생이 채우는 칸.
  // 4점대는 중3~고1 내신 어법 단골 셋으로 고른다.
  grammar: {
    points: [
      { name: "Relative pronouns — who / which", ko: "관계대명사",
        sent: "Charlotte was a spider [[who]] could write, and the web [[which]] she made saved a pig.",
        why_ko: "관계대명사는 두 문장을 이어 주는 접착제예요. 사람·인물이면 who, 사물이면 which. 앞 명사(선행사)를 보고 고르세요!",
      why: "A relative pronoun joins two sentences about the same thing. Use \"who\" for people and characters, \"which\" for things.",
        try: "Wilbur was a pig {{who}} everyone loved, and the word {{which}} Charlotte wrote was HUMBLE." },
      { name: "Passive voice", ko: "수동태",
        sent: "Wilbur [[was saved]] by a spider, and the words [[were written]] in the night.",
        why_ko: "수동태 = be동사 + 과거분사. '~되었다'로 해석해요. 누가 했는지는 by 뒤에! was saved by a spider = 거미에 의해 구해졌다.",
      why: "Use be + past participle when the important thing is what happened, not who did it.",
        try: "The prize {{was given}} to Wilbur, and Charlotte's eggs {{were carried}} home." },
      { name: "to + verb / verb-ing", ko: "to부정사와 동명사",
        sent: "Charlotte decided [[to help]] Wilbur, and she never stopped [[writing]].",
        why_ko: "decide·want·hope 뒤엔 to부정사, stop·enjoy·finish 뒤엔 동명사(-ing). 이 짝꿍은 내신 단골이니 통째로 외워요!",
      why: "Some verbs take to + verb (decide, want, hope). Others take verb-ing (stop, enjoy, finish).",
        try: "Wilbur enjoyed {{talking}} to Charlotte, and he hoped {{to see}} her again." }
    ],
    find: "책에서 who 또는 which 가 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences using who or which.",
    exam: {
      choose: [
        { q: "Charlotte was a spider (who / which) could write.", a: "who", why_ko: "Charlotte는 이야기 속 인물(사람처럼 말하는 거미)이에요. 인물 뒤에는 which가 아니라 who!" },
        { q: "Wilbur (saved / was saved) by Charlotte's words.", a: "was saved", why_ko: "윌버는 구함을 '받은' 쪽이에요. 당한 일은 수동태 be + 과거분사, was saved!" },
        { q: "Charlotte decided (help / to help) her friend.", a: "to help", why_ko: "decide 뒤에는 to부정사가 와요. decided to help가 짝꿍이에요!" },
        { q: "Templeton never stopped (to eat / eating).", a: "eating", why_ko: "stop 뒤에 -ing가 오면 '~하던 것을 멈추다'예요. 먹는 걸 멈추지 않았다는 뜻이니 stopped eating!" },
        { q: "The web (which / who) Charlotte made became famous.", a: "which", why_ko: "web(거미줄)은 사물이에요. 사물 뒤에는 who가 아니라 which!" }
      ],
      fix: [
        { q: "Fern was a girl [[which]] loved animals.", a: "who", why_ko: "Fern은 사람이에요. 사람 뒤에는 which가 아니라 who를 써요." },
        { q: "The words [[wrote]] in the web by Charlotte.", a: "were written", why_ko: "글자는 스스로 쓰는 게 아니라 '쓰여진' 거예요. 수동태 were + written! words가 복수라 were예요." },
        { q: "Charlotte finished [[to write]] the last word.", a: "writing", why_ko: "finish 뒤에는 동명사(-ing)만 와요. finished to write가 아니라 finished writing!" }
      ],
      write: [
        { ko: "윌버는 샬롯에 의해 구해졌다.", cond: "save, by", a: "Wilbur was saved by Charlotte.", why_ko: "'~에 의해 구해졌다'는 수동태예요. was + saved + by Charlotte!" },
        { ko: "샬롯은 글을 쓸 수 있는 거미였다.", cond: "a spider, who, write", a: "Charlotte was a spider who could write.", why_ko: "샬롯은 인물이라 관계대명사 who로 이어요. a spider who could write!" }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 는 챕터로 적는다. 페이지 번호는 판본마다 달라서 챕터가 안전하다.
  // skill: 사실찾기 | 어휘 | 주제·요점 | 추론·예측 | 평가·적용  (팔에듀 4영역 + 사고수준)
  // 쉬운 것부터 어려운 것 순으로 놓는다. 뒤로 갈수록 생각을 더 해야 한다.
  comprehension: [
    { ref: "ch. 1",      skill: "사실찾기",   q: "Why did Mr. Arable want to kill the new little pig?",
      frame: "Mr. Arable wanted to kill the little pig because {{it was born very small and weak}}." },
    { ref: "ch. 1",      skill: "사실찾기",   q: "What did Fern do to save Wilbur?",
      frame: "Fern {{cried and stopped her father}}, and she asked him to {{let her keep the pig}}." },
    { ref: "ch. 5",      skill: "어휘",       q: "What was the first word Charlotte said to Wilbur, and what does it mean?",
      frame: "Charlotte greeted Wilbur by saying {{\"Salutations!\"}}, which means {{hello / a greeting}}." },
    { ref: "ch. 3~4",    skill: "추론·예측",  q: "How did Wilbur feel when he moved to the Zuckermans' barn? How do you know?",
      frame: "When Wilbur moved to the barn, he felt {{lonely}} because {{he had no friend to play with}}." },
    { ref: "ch. 7",      skill: "사실찾기",   q: "What news made Wilbur cry?",
      frame: "Wilbur cried because the old sheep told him that {{the Zuckermans planned to kill him before winter}}." },
    { ref: "ch. 11",     skill: "추론·예측",  q: "What did Charlotte write in her web, and why did it change the farmers' minds?",
      frame: "Charlotte wrote the words {{SOME PIG}} in her web, and the people {{believed Wilbur was special because the writing looked like a miracle}}." },
    { ref: "ch. 19~21",  skill: "주제·요점",  q: "Why could Charlotte not go home from the fair?",
      frame: "Charlotte could not go home because {{she had used all her strength and was dying}}." },
    { ref: "ch. 22",     skill: "평가·적용",  q: "Charlotte gave everything for a friend. Was it worth it? Say what you think.",
      frame: "I think it {{was / was not}} worth it because {{                              }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  // c = 정답 번호(0부터). why = 틀렸을 때 보여 주는 한 줄.
  // 쉬운 것부터 어려운 것 순. 10번은 늘 주제를 묻는다.
  // 틀렸을 때 읽어 주는 해설. why_ko 는 한국어, why 는 영어 — 둘 다 선생님이 짚어 주듯 쓴다.
  quiz: [
    { q: "Who saves the little pig when he is born?",
      a: ["Fern", "Charlotte", "Templeton", "Mr. Zuckerman"], c: 0,
      why_ko: "자, 1장으로 돌아가 볼까요? 도끼를 든 아빠를 울면서 붙잡은 사람, 펀이죠. 샬롯은 아직 나오지도 않았어요. 헛간에서 한참 뒤에 만나요. 순서만 기억하면 절대 안 틀려요. 펀이 먼저, 샬롯은 나중!",
      why: "Go back to chapter one. Fern cries and grabs the ax to stop her father. Charlotte is not in the story yet — she comes later, in the barn. Remember the order: Fern first, Charlotte second." },
    { q: "Why does Mr. Arable want to kill the new pig?",
      a: ["It is sick", "It is the runt of the litter", "It bit him", "There is no food"], c: 1,
      why_ko: "아픈 게 아니에요! 한배에서 가장 작게 태어난 새끼, 바로 runt 라서예요. 옛날 농장에서는 작은 새끼는 못 산다고 생각했거든요. runt 이 단어, 이 책에 계속 나오니까 꼭 잡고 가세요.",
      why: "The pig is not sick. He is the smallest of the litter — the runt. Farmers thought a runt was too weak to live. Keep the word runt; it comes back again and again." },
    { q: "Where does Wilbur live after he leaves Fern's house?",
      a: ["In the woods", "At the county fair", "In the Zuckermans' barn", "In Fern's room"], c: 2,
      why_ko: "펀의 삼촌, 주커만 아저씨가 윌버를 사 가요. 그때부터 윌버의 집은 헛간이에요. 이 책 사건의 대부분이 이 헛간에서 일어나요. 헛간은 이 이야기의 무대다! 이렇게 외워 두세요.",
      why: "Fern's uncle, Mr. Zuckerman, buys Wilbur. From then on the barn is his home — and almost every scene happens there. The barn is the stage of this book." },
    { q: "What is the first word Charlotte says to Wilbur?",
      a: ["\"Terrific!\"", "\"Good night.\"", "\"Salutations!\"", "\"Some pig.\""], c: 2,
      why_ko: "샬롯이 건넨 첫 마디, Salutations! 딱 이 한 마디예요. 윌버가 깜짝 놀라죠? 아무도 그렇게 인사하지 않으니까요. 첫 만남은 Salutations, 이렇게 붙여서 기억하세요.",
      why: "Her very first word is \"Salutations!\" It surprises Wilbur, because nobody says hello like that. First meeting equals Salutations." },
    { q: "What does the word \"salutations\" mean?",
      a: ["A greeting", "A promise", "A kind of web", "A prize"], c: 0,
      why_ko: "샬롯이 직접 설명해 줘요. 멋을 부린 인사말, 그러니까 Hello 예요. 상 이름도 아니고 거미줄 종류도 아니에요. 인사말!",
      why: "Charlotte explains it herself: it is just a fancy way of saying hello. Not a prize, not a kind of web — a greeting." },
    { q: "Who tells Wilbur that he will be killed before winter?",
      a: ["Templeton", "The old sheep", "Fern", "Charlotte"], c: 1,
      why_ko: "늙은 양이 알려 줘요. 이 장면이 중요해요! 윌버가 울기 시작하고, 바로 그때 샬롯이 내가 살려 주겠다고 약속하거든요. 이야기가 확 꺾이는 자리예요.",
      why: "The old sheep tells him the farmers' plan. This is the turning point: Wilbur cries, and right then Charlotte promises to save him." },
    { q: "Which word does Charlotte write FIRST in her web?",
      a: ["TERRIFIC", "RADIANT", "HUMBLE", "SOME PIG"], c: 3,
      why_ko: "순서를 묻는 문제는 꼭 나와요. SOME PIG, 그다음 TERRIFIC, RADIANT, 마지막이 HUMBLE! 첫 번째는 SOME PIG. 네 단어를 입으로 세 번만 소리 내어 외워 보세요.",
      why: "The order is SOME PIG, then TERRIFIC, then RADIANT, then HUMBLE. The first one is SOME PIG. Say the four words out loud three times." },
    { q: "Why do the people change their minds about Wilbur?",
      a: ["He grows very big", "They think the writing is a miracle", "Fern begs them", "He wins a race"], c: 1,
      why_ko: "여기가 핵심이에요! 윌버는 하나도 변하지 않았어요. 변한 건 사람들의 마음이죠. 거미줄에 나타난 글씨를 기적이라고 믿은 거예요. 이 책이 하고 싶은 말이 바로 여기 숨어 있어요.",
      why: "Here is the key: Wilbur does not change at all. The people change. They believe the words in the web and call it a miracle. That is what this book is really pointing at." },
    { q: "What does Charlotte do at the fair before she dies?",
      a: ["She goes home with Wilbur", "She writes one more word", "She lays her eggs in a sac", "She eats Templeton's food"], c: 2,
      why_ko: "샬롯은 마지막 힘으로 알주머니를 만들어요. 그걸 윌버가 집으로 가져가죠. 그래서 샬롯의 아이들이 헛간에서 살게 돼요. 슬프지만 이어지는 장면이에요.",
      why: "With her last strength she makes an egg sac. Wilbur carries it home, so her children grow up in the barn. Sad, but the story keeps going." },
    { q: "What is this book really about?",
      a: ["Farm animals are dangerous", "Friendship can mean giving up something for someone else",
          "Spiders are clever insects", "Fairs are fun places"], c: 1,
      why_ko: "주제를 묻는 문제예요. 샬롯은 친구를 위해 마지막 힘까지 썼어요. 친구를 위해 내 것을 내어 주는 것, 그게 이 책의 심장이에요. 거미 이야기도, 농장 이야기도 아니에요.",
      why: "This is the theme question. Charlotte spends her last strength for a friend. Giving something up for someone else — that is the heart of the book, not spiders and not farms." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // given 은 인쇄된 문장, frame 은 학생이 이어 쓰는 문장. 한 칸 주고 한 칸 비운다.
  summaryMap: {
    setting: { place: "{{a farm in Maine / the Zuckermans' barn}}", time: "{{spring to the next spring}}" },
    // SWBST — 이야기 전체를 다섯 칸으로 줄이는 표준 요약 틀
    swbst: [
      { k: "Somebody", v: "{{Charlotte, a grey spider}}" },
      { k: "Wanted",   v: "{{to save her friend Wilbur from being killed}}" },
      { k: "But",      v: "{{a spider cannot fight the farmers}}" },
      { k: "So",       v: "{{she wrote words about Wilbur in her web}}" },
      { k: "Then",     v: "{{the people saved Wilbur, and Charlotte died at the fair}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Fern saves a small, weak pig from her father and names him Wilbur.",
        frame: "Fern takes care of Wilbur by {{feeding him from a bottle every day}}." },
      { label: "1",
        given: "",
        frame: "Wilbur moves to the Zuckermans' barn, where he {{feels lonely and wants a friend}}." },
      { label: "2",
        given: "One night a voice in the dark says, \"I will be your friend.\"",
        frame: "In the morning Wilbur meets {{Charlotte, a large grey spider}}." },
      { label: "3",
        given: "",
        frame: "Wilbur learns that {{the farmer will kill him before winter}}, so Charlotte says {{she will save him}}." },
      { label: "4",
        given: "Charlotte writes SOME PIG, TERRIFIC, and RADIANT in her web.",
        frame: "The people who see the words think {{Wilbur is a very special pig}}." },
      { label: "5",
        given: "",
        frame: "At the county fair Charlotte writes {{HUMBLE}}, and Wilbur {{wins a special prize}}." },
      { label: "End",
        given: "Charlotte lays her eggs and dies at the fair.",
        frame: "Wilbur brings the egg sac home, and {{he never forgets his best friend}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 가지마다 두 단이다. fact = 책에서 찾은 것, deeper = 한 발 더 들어가는 질문.
  mindMap: {
    center: "Charlotte's Web",
    branches: [
      { label: "Inside / Outside", ask: "Charlotte — what do we SEE (looks, actions)? What does she THINK and FEEL?",
        deeper: "Which one does the writer show us more? Why?" },
      { label: "Turning Point", ask: "Which one moment changes everything in this story?",
        deeper: "What would have happened without that moment?" },
      { label: "Why?",       ask: "Why do the farmers believe the words in the web?",
        deeper: "What does that tell us about people?" },
      { label: "Theme",      ask: "What is this book really about, besides a pig and a spider?",
        deeper: "Write one scene that proves it." },
      { label: "Me",         ask: "When have you helped someone when it was hard for you?",
        deeper: "What did it cost you? Was it worth it?" },
      { label: "The World",  ask: "Where do we see 'words changing what people believe' today?",
        deeper: "Is that a good thing or a dangerous thing?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  // IB MYP 의 3단 질문 사다리다. 사실 → 개념 → 논쟁 순으로 올라간다.
  ib: {
    keyConcept: "Communication",
    relatedConcepts: ["Purpose", "Point of view", "Theme"],
    globalContext: "Identities and relationships — friendship, sacrifice, and who I am to others (우정·희생·내가 남에게 어떤 존재인가)",
    statement: "Words can change what people believe, and that power can save a life or mislead a crowd.",
    factual: [   // What ... ? 책에 답이 그대로 있다
      "What words does Charlotte write in her web?",
      "Who reads the words, and what do they do next?",
      "What does Charlotte give up to help Wilbur?"
    ],
    conceptual: [ // How / Why ... ? 책 밖의 개념으로 넓힌다
      "How do words change what people believe?",
      "Why does the writer make a spider — not a person — the hero?",
      "How is friendship shown differently by Fern, Charlotte, and Templeton?"
    ],
    debatable: [  // 답이 갈린다. 근거를 들어 편을 정해야 한다
      "Is it ever right to say something untrue in order to help someone?",
      "Who saves Wilbur — Charlotte, or the people who believe her?",
      "Does a life have more value because others say it is special?"
    ],
    learnerProfile: ["Thinker", "Caring", "Principled", "Open-minded", "Reflective", "Communicator"]
  },

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  // script 의 say 는 수업에서 그대로 읽으면 되는 말이다. ko 는 그 말의 의도다.
  teaching: {
    goal: {
      en: "Students retell the story in full sentences, then take a side on a debatable question with evidence from the book.",
      ko: "줄거리를 문장으로 다시 말하고, 답이 갈리는 질문에 책 속 근거를 들어 편을 정해 쓴다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Books closed. In one sentence — what happened last time? Just one sentence, no more.",
        do: "책을 덮게 하고 두세 명만 시킨다. 받아 적지 않는다. '한 문장'으로 못을 박아야 정리가 된다.",
        exp: "Charlotte wrote words in her web to save Wilbur.",
        stuck: "이름부터 준다. \"Start with 'Charlotte...'\" 첫 단어를 주면 나머지는 따라 나온다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 확인만 3분. 손으로 뜻을 가리게 하고 한글→영어로 묻는다. 12개를 다 묻지 말고 5개만.",
        exp: "겸손한 → humble / 기적 → miracle / 충실한 → loyal",
        stuck: "예문을 읽어 준다. \"Charlotte chose the word ___ for the fair.\" 문맥을 주면 대개 나온다." },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it at home tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다. 한 번 해 본 아이만 집에서도 한다. 숙제로 못을 박는다.",
        stuck: "폰이 없는 아이는 교실 화면으로 30초만 같이 듣는다. 소리를 한 번 들려주는 것이 목적이다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 방법을 설명하지 않는다. 5분 재고, 다 못 해도 끊는다.",
        stuck: "\"Read the whole sentence first, then think of the word.\" 단어부터 찾는 아이를 문장으로 돌린다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Why did Mr. Arable...' becomes 'Mr. Arable wanted to... because...'",
        do: "이 한 마디가 서술형의 전부다. 매 시간 똑같이 반복한다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "Mr. Arable wanted to kill the pig because it was born very small and weak.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다. 기억으로 답하는 습관을 여기서 끊는다. 못 짚으면 답이 맞아도 넘어가지 않는다.",
        stuck: "챕터를 알려 준다. \"It's in chapter 11. Find the web.\" 페이지까지는 알려 주지 않는다." },

      { stage: "Comprehension", min: "",
        say: "Last question — nobody is wrong here. But a weak answer just says yes or no. A strong answer gives a reason.",
        do: "8번(평가·적용)은 정답이 없다. '정답 없음'이라고 하면 아무렇게나 쓴다. '약한 답 / 강한 답'으로 바꿔 말한다.",
        exp: "I think it was worth it because Charlotte chose to give her life for a friend.",
        stuck: "\"Finish this: It was worth it because...\" 앞부분을 주면 뒤는 아이가 만든다." },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. What is different about them?",
        do: "규칙을 먼저 말하지 않는다. 빨간 부분만 소리 내어 읽히고 아이가 먼저 알아채게 한다.",
        exp: "\"who\" and \"which\" — they join two sentences.",
        stuck: "두 문장으로 쪼개 준다. \"Charlotte was a spider. She could write.\" → \"Now join them.\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다. 바로 써 보게 한다. 한 문장 쓰면 그 문법은 끝난 것이다.",
        exp: "Wilbur was a pig who everyone loved.",
        stuck: "빈칸 앞 단어를 짚어 준다. \"Is a pig a person or a thing in this story?\"" },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find two more sentences with who or which. Three minutes.",
        do: "책을 다시 펴게 하는 것이 목적이다. 두 개면 충분하다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look at the pages where Charlotte talks.\" 범위를 좁혀 준다." },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how your school test asks it. Write only the answer on the right. Not the whole sentence.",
        do: "답만 쓰게 한다. 문장을 통째로 옮겨 적는 아이가 반드시 나온다. 시작 전에 못을 박는다.",
        stuck: "1번을 같이 푼다. \"who or which? Charlotte is a character, so...\"" },

      { stage: "Exam Grammar", min: "",
        say: "Section three is different. Korean on the left, and you must use the words in the grey box. All of them.",
        do: "조건 영작이다. 조건 단어를 빠뜨리면 내신에서 0점이라고 분명히 말해 준다.",
        exp: "Wilbur was saved by Charlotte.",
        stuck: "한국어를 영어 어순으로 다시 읽어 준다. \"윌버는 / 구해졌다 / 샬롯에 의해.\"" },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 리듬처럼 손가락으로 짚으며 외우게 한다. 어떤 책이든 이 틀로 줄어든다는 것을 알려 준다.",
        exp: "Somebody: Charlotte / Wanted: to save Wilbur / But: a spider cannot fight farmers",
        stuck: "\"Who is the story about? Not Wilbur — who does the work?\" 주인공을 다시 잡아 준다." },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다. 고쳐 주지 말고 읽게만 한다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "62~70분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다. 여기서 시간을 쓰면 정작 중요한 → 칸을 못 한다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't write what happened — write what it means.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 아이들은 여기서 또 줄거리를 쓴다.",
        exp: "It tells us that people believe what they read, even when it is not true.",
        stuck: "\"You told me what happened. Now tell me: so what? Why does it matter?\"" },

      { stage: "Mind Map", min: "",
        say: "'Me' and 'The World' — there is no right answer. But there is a weak answer and a strong one. A strong one gives a reason.",
        do: "이 두 가지는 발표시킨다. 다른 아이의 답을 들으면 자기 답이 바뀐다. 그게 목적이다.",
        stuck: "선생님이 먼저 자기 이야기를 한 문장 한다. 어른이 먼저 말하면 아이가 따라 말한다." },

      { stage: "IB Inquiry", min: "70~78분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, the book cannot answer it — only you can.",
        do: "세 단의 차이를 한 번에 말한다. 이 구분이 IB 수업의 기본이다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\" 라고 되묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "Steps 1 and 2, we do out loud. Step 3, you write. Pick a side — you cannot sit in the middle today.",
        do: "1·2단은 말로만. 쓰게 하면 시간이 다 간다. 3단(Debatable)만 글로 받는다.",
        exp: "I think it is right to say something untrue if it saves a life.",
        stuck: "손을 들게 한다. \"Who says yes? Who says no?\" 몸으로 편을 정하면 글이 나온다." },

      { stage: "Writing", min: "78~95분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished — even if it is beautiful.",
        do: "조건 네 개를 같이 소리 내어 읽는다. 내신 서·논술형은 조건 누락이 감점 1순위다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다. 다 쓴 뒤에도 손가락으로 다시 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means a scene and a chapter number. 'Charlotte was kind' is not evidence. 'In ch. 11, Charlotte wrote SOME PIG' is.",
        do: "근거와 감상을 구분해 준다. 이걸 안 잡으면 끝까지 감상문이 된다. 칠판에 두 문장을 나란히 써 둔다.",
        exp: "In ch. 11, Charlotte wrote SOME PIG, and Mr. Zuckerman decided not to kill Wilbur.",
        stuck: "\"Which chapter? Find it now.\" 챕터를 못 찾으면 근거를 바꾸게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say lying is always wrong, but Wilbur would have died without Charlotte's words.",
        stuck: "\"Some people say..., but...\" 두 조각을 칠판에 써 준다. 틀만 있으면 채운다." },

      { stage: "Wrap-up", min: "95~100분",
        say: "One person, read only your Counter sentence. Just that one.",
        do: "반박 문장만 발표시킨다. 가장 어려운 부분이라 공유 효과가 가장 크다. 세 명이면 충분하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    // 북토킹 — 읽기 전 / 읽는 중 / 읽은 후
    booktalk: {
      before: [
        { en: "Do you have a friend who helped you when it was hard for them?", ko: "힘든데도 너를 도와준 친구가 있니?" },
        { en: "What would you do to save someone you love?", ko: "사랑하는 이를 살리기 위해 너는 무엇을 하겠니?" },
        { en: "Can an animal be a real friend? Why or why not?", ko: "동물도 진짜 친구가 될 수 있을까? 왜 그렇게 생각하니?" }
      ],
      during: [
        { en: "Why does Charlotte help Wilbur? She gets nothing.", ko: "샬롯은 얻는 게 없는데 왜 윌버를 돕지?" },
        { en: "Are the farmers right to want to kill Wilbur?", ko: "농부들이 윌버를 잡으려는 것은 옳은 일일까?" },
        { en: "Templeton only helps when he gets something. Is he a bad character?", ko: "템플턴은 대가가 있어야 돕는다. 나쁜 인물일까?" }
      ],
      after: [
        { en: "What is the most important lesson in this story?", ko: "이 이야기에서 가장 중요한 배움은 무엇이니?" },
        { en: "Charlotte dies, but the book is not sad at the end. Why not?", ko: "샬롯은 죽는데 결말이 슬프지만은 않다. 왜일까?" },
        { en: "Can a small person change a big thing? Give one example from your life.", ko: "작은 사람이 큰 일을 바꿀 수 있을까? 네 삶에서 한 가지 예를 들어 보렴." }
      ]
    },
    // 시트별 지도 포인트와 학생들이 꼭 틀리는 곳
    notes: [
      { sheet: "Vocabulary",     point: "예문을 소리 내어 읽히고 넘어간다.", miss: "뜻만 외우고 예문을 건너뛴다. 예문이 서술형 문장의 재료다." },
      { sheet: "Comprehension",  point: "질문을 문장으로 바꾸기(Restate)부터 시킨다.", miss: "단어 하나로 답한다. 'Because he was weak.' 같은 조각 문장." },
      { sheet: "Grammar",      point: "빨간 부분만 같이 읽고 바로 아래 칸을 시킨다.", miss: "규칙을 외우려 한다. 문장을 써 보게 하는 것으로 충분하다." },
      { sheet: "Exam Grammar", point: "답만 쓴다. 풀이 과정은 쓰게 하지 않는다.", miss: "괄호를 통째로 옮겨 적는다. 고른 것 하나만." },
      { sheet: "Summary Map",    point: "SWBST 를 먼저, 지도는 그 다음.", miss: "빈칸을 책에서 베껴 온다. 자기 말로 바꾸게 한다." },
      { sheet: "Mind Map",       point: "아래 → 칸에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",     point: "1·2단은 말로, 3단만 글로.", miss: "Debatable 에 'It depends.' 라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",        point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상을 쓴다. 챕터 번호가 없으면 근거가 아니다." }
    ],
    // 논술 채점 (20점)
    scoring: [
      { c: "A 분석 Analysis",      pt: 5, yes: "책 속 장면을 들고 챕터를 밝혔다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization",  pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",         pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",      pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Charlotte wrote words in her web that were not true, so that people would save Wilbur's life. Was she right to do it? Write your opinion.",
    // 조건제시형 — 한국 내신 서·논술형은 조건을 주고 쓰게 한다
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣고 챕터를 밝힐 것 · Use one scene from the book and name the chapter",
      "because 또는 This is because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",              ask: "What is your writing about?",
        eg: "Charlotte's Words Were the Right Choice", lines: 1 },
      { part: "P — Point",          ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Charlotte was right to write the words in her web.", lines: 2 },
      { part: "E — Evidence",       ask: "What happened in the book? Write the scene and the chapter.",
        eg: "In ch. 11, Charlotte wrote SOME PIG, and Mr. Zuckerman decided Wilbur was too special to kill.", lines: 3 },
      { part: "E — Explanation",    ask: "Why does that scene prove your point?",
        eg: "This shows that her words did not harm anyone — they gave Wilbur a chance to live.", lines: 2 },
      { part: "C — Counter",        ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say lying is always wrong, but Wilbur would have died without Charlotte's words.", lines: 2 },
      { part: "L — Link",           ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe Charlotte made the right choice for her friend.", lines: 2 }
    ],
    expressions: [
      "I think / In my opinion, ...",
      "This is because ...",
      "For example, in ch. __, ...",
      "This shows that ...",
      "Some people say ..., but I believe ...",
      "For this reason, ..."
    ],
    // 쓰고 나서 학생이 스스로 표시한다 (IB 평가 준거 A~D 를 아이 말로 줄인 것)
    rubric: [
      { c: "A 분석",  d: "책 속 근거를 들어 설명했나요? · Did I use evidence from the book?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "샬롯이 거미줄에 글자를 써서 윌버를 구하는 장면", "text": "Wilbur was the [[smallest pig|runt]] of the [[batch of piglets|litter]]. Later, he lived in a big [[stable|barn]]. One night he heard a voice: \"[[Greetings|Salutations]]!\" It was Charlotte, a grey spider. When Wilbur learned he might be killed, Charlotte made a plan. She wrote words in her [[spiderweb|web]]: \"Some Pig,\" \"[[Amazing|Terrific]],\" \"[[Glowing|Radiant]],\" and \"[[Modest|Humble]].\" People called it a [[wonder|miracle]]. Wilbur was saved, but Charlotte died after the fair. Wilbur was a [[faithful|loyal]] friend and took her egg [[pouch|sac]] home."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Sharing the Planet",
 "themeKo": "함께 사는 지구",
 "profile": [
  {
   "attr": "Caring",
   "how": "Follow how Charlotte uses her skill to save a friend's life."
  },
  {
   "attr": "Principled",
   "how": "Ask what is fair for farm animals, starting from Fern's first argument."
  }
 ],
 "hook": [
  "Write SOME PIG on the board with no explanation. Who wrote this, and why?",
  "Show a real spider web photo: how long would it take to weave one word?"
 ],
 "connections": [
  {
   "subject": "Science",
   "idea": "Spiders and life cycles: eggs, spiderlings, ballooning."
  },
  {
   "subject": "Social studies",
   "idea": "Where does our food come from? The farm through the seasons."
  },
  {
   "subject": "Language",
   "idea": "Persuasive words: choose a new word for Wilbur and defend it."
  }
 ],
 "speaking": [
  "Debate: was it right to trick people with the words in the web?",
  "Retell one chapter as Templeton would tell it."
 ],
 "writing": [
  "Write a web message for a friend and explain your word choice.",
  "Write a thank-you letter from Wilbur to Charlotte."
 ]
};
