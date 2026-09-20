// 리딩브레인 원서프로그램 — 3점대 책 (AR 3.4)
// 1점대(hi-fly-guy)와 4점대(charlottes-web) 사이다. 분량도 가운데로 잡았다.
//   단어 10개 / 독해 7문항 / 장면 5칸 / 마인드맵 6가지 / IB 질문 2~3개씩 / 논술 PEEL 5단
// AR 3.4 라서 글자 띠는 lv-mid 가 자동으로 붙는다 (4점대보다 크고 1점대보다 작다).
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3117",
  slug: "sarah-plain-and-tall",
  title: "Sarah, Plain and Tall",
  author: "Patricia MacLachlan",
  series: "Sarah, Plain and Tall #1",
  publisher: "HarperCollins",
  level: { ar: "3.4", lexile: "560L", rb: "정독 2단계" },
  awards: ["Newbery Medal 1986", "Scott O'Dell Award 1986"],
  defSource: "Wiktionary (CC BY-SA)",   // 뜻을 직접 썼으면 비워 둔다. 사전에서 가져왔으면 출처를 적는다.
  cover: "assets/covers/sarah-plain-and-tall.jpg",

  shadowing: {
    query: "\"Sarah, Plain and Tall\" read aloud",
    searchUrl: "https://youtu.be/a5qvR-0LCbE",
    qr: "assets/qr/sarah-plain-and-tall.png",
    videos: [
      { url: "https://youtu.be/a5qvR-0LCbE", title: "SARAH, PLAIN AND TALL Chapters 1 & 2 Read Aloud", channel: "MrsMorrisReads", views: "99,217", length: "" },
      { url: "https://youtu.be/q2HAn0WTQMg", title: "SARAH, PLAIN AND TALL Chapters 3 & 4 Read Aloud", channel: "MrsMorrisReads", views: "59,977", length: "" },
      { url: "https://youtu.be/PvTFyv70DT8", title: "SARAH, PLAIN AND TALL Chapters 7, 8 & 9 Read Aloud", channel: "MrsMorrisReads", views: "52,348", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // en = 영영 뜻, ko = 한글 뜻. 둘 다 한 칸에 위아래로 찍힌다.
  vocabulary: [
    { word: "plain",    pos: "adj.", audio: "assets/audio/sarah-plain-and-tall/plain.mp3", en: "simple and ordinary to look at; not pretty in a fancy way", ko: "수수한, 꾸미지 않은",   ex: "Sarah wrote that she was {{plain}} and tall.", ex_ko: "사라는 자신이 수수하고 키가 크다고 편지에 썼어요." },
    { word: "prairie",  pos: "n.", audio: "assets/audio/sarah-plain-and-tall/prairie.mp3",   en: "An extensive area of relatively flat grassland with few, if any, trees, especially in North America", ko: "대초원",              ex: "The farm stands alone in the middle of the {{prairie}}.", ex_ko: "농장은 대초원 한가운데에 홀로 서 있어요.", pic: "🌾" },
    { word: "squall",   pos: "n.", audio: "assets/audio/sarah-plain-and-tall/squall.mp3",   en: "a sudden storm with strong wind and hard rain", ko: "(갑자기 몰아치는) 폭풍우",   ex: "A {{squall}} came fast, and they hid in the barn.", ex_ko: "폭풍우가 갑자기 몰려와서 그들은 헛간에 숨었어요.", pic: "⛈️" },
    { word: "dune",     pos: "n.", audio: "assets/audio/sarah-plain-and-tall/dune.mp3",   en: "A ridge or hill of sand piled up by currents of wind or water", ko: "모래언덕",            ex: "Sarah slid down the haystack as if it were a sand {{dune}}.", ex_ko: "사라는 건초 더미를 모래언덕처럼 미끄러져 내려왔어요.", pic: "🏜️" },
    { word: "huddle",   pos: "v.", audio: "assets/audio/sarah-plain-and-tall/huddle.mp3",   en: "To crowd together", ko: "옹기종기 모이다",      ex: "The animals {{huddle}} together while the storm passes.", ex_ko: "폭풍이 지나가는 동안 동물들은 옹기종기 모여 있어요.", pic: "🐑" },
    { word: "eerie",    pos: "adj.", audio: "assets/audio/sarah-plain-and-tall/eerie.mp3", en: "Inspiring fear, especially in a mysterious or shadowy way", ko: "으스스한",            ex: "The light turned an {{eerie}} green before the squall.", ex_ko: "폭풍우가 오기 전에 하늘빛이 으스스한 초록색으로 변했어요.", pic: "👻" },
    { word: "pesky",    pos: "adj.", audio: "assets/audio/sarah-plain-and-tall/pesky.mp3", en: "Annoying, troublesome, irritating (usually of an animal or child)", ko: "성가신",              ex: "The {{pesky}} flies would not leave the sheep alone.", ex_ko: "성가신 파리들이 양들을 가만히 두지 않았어요.", pic: "🦟" },
    { word: "gleam",    pos: "v.", audio: "assets/audio/sarah-plain-and-tall/gleam.mp3",   en: "To shine, especially in an indistinct or intermittent manner", ko: "은은하게 빛나다",       ex: "The wet grass began to {{gleam}} after the rain.", ex_ko: "비가 그친 뒤 젖은 풀이 은은하게 빛나기 시작했어요.", pic: "💧" },
    { word: "stubborn", pos: "adj.", audio: "assets/audio/sarah-plain-and-tall/stubborn.mp3", en: "Refusing to move or to change one's opinion", ko: "고집 센",             ex: "Papa was too {{stubborn}} to say that he was afraid.", ex_ko: "아빠는 고집이 너무 세서 무섭다는 말을 하지 못했어요.", pic: "🐂" },
    { word: "mournful", pos: "adj.", audio: "assets/audio/sarah-plain-and-tall/mournful.mp3", en: "very sad, the way people feel when someone has died", ko: "구슬픈, 애달픈",        ex: "Papa had not sung a song, {{mournful}} or happy, since Mama died.", ex_ko: "엄마가 돌아가신 뒤로 아빠는 구슬픈 노래도 즐거운 노래도 부르지 않았어요.", pic: "😢" }
  ],

  // ── ①-2 문법 (영영문법 1장 + 입시문법 1장) ─────────────
  // 문장은 책의 장면으로 만든 것이다. [[ ]] 가 빨간 밑줄, {{ }} 가 학생이 채우는 칸.
  // 3점대는 중1~중2 내신에 바로 걸리는 것으로 고른다.
  grammar: {
    points: [
      { name: "Past Simple — irregular verbs", ko: "과거시제 (불규칙)",
        sent: "Papa [[wrote]] to the newspaper, and Sarah [[came]] from Maine.",
        why_ko: "-ed를 안 붙이고 모양이 통째로 바뀌는 동사가 불규칙 동사예요. write → wrote, come → came, bring → brought는 무조건 외우기!",
      why: "Some verbs do not add -ed. They change their shape: write → wrote, come → came, bring → brought.",
        try: "Sarah {{brought}} her cat, and she {{sang}} in the kitchen." },
      { name: "to + verb", ko: "to부정사",
        sent: "Sarah came [[to help]] the family, and Caleb wanted [[to sing]] again.",
        why_ko: "to + 동사원형은 '~하기 위해'(목적)나 want·hope·decide 뒤에 와요. 'came to help' = 도우려고 왔다. 목적 해석 꼭 챙기세요.",
      why: "\"to + verb\" can tell you WHY someone does something, or it can follow verbs like want, hope, decide.",
        try: "Papa wanted {{to marry}} again, so he wrote a letter {{to find}} a wife." },
      { name: "Comparatives", ko: "비교급",
        sent: "Caleb is [[younger]] than Anna, and the prairie is [[more beautiful]] than he thought.",
        why_ko: "짧은 단어는 -er, 긴 단어는 more를 앞에! 그리고 비교 대상 앞에는 than. younger than, more beautiful than.",
      why: "Short words add -er (young → younger). Long words take \"more\" in front (more beautiful).",
        try: "The sea is {{wider}} than the pond, and Maine is {{more colourful}} than the prairie." }
    ],
    find: "책에서 불규칙 과거형 동사를 세 개 찾아 원형과 함께 쓰세요. · Find three irregular past verbs and their base forms.",
    exam: {
      choose: [
        { q: "Papa (writed / wrote) a letter to Maine.", a: "wrote", why_ko: "write는 불규칙 동사예요. 과거형은 writed가 아니라 wrote!" },
        { q: "Sarah came (help / to help) the family.", a: "to help", why_ko: "'도우려고 왔다'처럼 목적을 말할 땐 to + 동사원형! came to help가 맞아요." },
        { q: "Caleb is (younger / more young) than Anna.", a: "younger", why_ko: "young은 짧은 단어라서 -er을 붙여요. more young이 아니라 younger!" },
        { q: "Anna and Caleb (was / were) afraid she would leave.", a: "were", why_ko: "Anna and Caleb은 두 사람, 복수예요. 그래서 was가 아니라 were!" },
        { q: "Sarah (bring / brought) a shell from the sea.", a: "brought", why_ko: "bring은 불규칙 동사예요. 과거형은 brought, 통째로 외워 두세요!" }
      ],
      fix: [
        { q: "Sarah [[comed]] from Maine in the spring.", a: "came", why_ko: "come의 과거형은 comed가 아니라 came이에요. 불규칙 동사는 모양이 바뀌어요!" },
        { q: "Papa wanted [[marry]] again.", a: "to marry", why_ko: "want 뒤에는 to부정사가 와요. wanted marry가 아니라 wanted to marry!" },
        { q: "The sea is [[more wide]] than the pond.", a: "wider", why_ko: "wide는 짧은 단어라서 more를 쓰지 않고 -r만 붙여요. wider than!" }
      ],
      write: [
        { ko: "사라는 바다를 그리워했다.", cond: "miss, the sea", a: "Sarah missed the sea.", why_ko: "miss(그리워하다)는 규칙 동사라서 -ed만 붙이면 과거형이에요. Sarah missed the sea." },
        { ko: "그녀는 아이들을 돕기 위해 왔다.", cond: "come, to help", a: "She came to help the children.", why_ko: "'돕기 위해'는 목적을 나타내는 to부정사예요. came to help, 동사 두 개를 to로 이어 주세요!" }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // skill: 사실찾기 | 어휘 | 주제·요점 | 추론·예측 | 평가·적용
  comprehension: [
    { ref: "ch. 1",    skill: "사실찾기",   q: "What happened to Anna and Caleb's mother?",
      frame: "Their mother died {{the day after Caleb was born}}." },
    { ref: "ch. 1~2",  skill: "사실찾기",   q: "Why did Papa put an advertisement in the newspaper?",
      frame: "Papa put an advertisement in the newspaper because he wanted {{a wife, and a mother for Anna and Caleb}}." },
    { ref: "ch. 2~3",  skill: "어휘",       q: "Sarah signed her letter \"Sarah, plain and tall.\" What was she telling them about herself?",
      frame: "She was telling them that she {{was not beautiful, and that she would not pretend to be}}." },
    { ref: "ch. 4~5",  skill: "추론·예측",  q: "Why did Caleb keep asking \"Will she stay?\" How do you know he was worried?",
      frame: "Caleb kept asking because {{he was afraid of losing another mother}}, and I know it because {{he asked the same question again and again}}." },
    { ref: "ch. 6~7",  skill: "사실찾기",   q: "What three colours did Sarah miss from her home in Maine?",
      frame: "Sarah missed {{blue, gray, and green}}, the colours of {{the sea}}." },
    { ref: "ch. 8~9",  skill: "추론·예측",  q: "When Sarah drove the wagon to town alone, what did the children think? Why?",
      frame: "They thought that {{Sarah was leaving them and going back to Maine}} because {{she had told them how much she missed the sea}}." },
    { ref: "ch. 9",    skill: "주제·요점",  q: "Sarah said, \"I will always miss my old home, but the truth of it is I would miss you more.\" What does this sentence mean?",
      frame: "It means that {{                                                      }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  // c = 정답 번호(0부터). why = 틀렸을 때 보여 주는 한 줄.
  quiz: [
    { q: "Where does this story take place?",
      a: ["By the sea in Maine", "On a prairie farm", "In a big city", "At a school"], c: 1,
      why_ko: "메인은 사라가 떠나온 곳이지, 이야기가 벌어지는 곳이 아니에요! 안나와 케일럽, 아빠가 사는 곳은 넓은 초원, prairie 의 농장이에요. 바다와 초원, 이 두 장소의 대비가 이 책 전체를 끌고 가요.",
      why: "Maine is where Sarah comes from, not where the story happens. Anna, Caleb, and Papa live on a prairie farm. Sea against prairie — that contrast carries the whole book." },
    { q: "What happened to Anna and Caleb's mother?",
      a: ["She went back to Maine", "She is away working", "She died the day after Caleb was born", "She is sick in bed"], c: 2,
      why_ko: "1장 첫 장면이에요. 케일럽이 태어난 바로 다음 날 엄마가 돌아가셨어요. 그래서 케일럽이 자꾸 그 이야기를 다시 해 달라고 조르는 거예요. 이 슬픔이 이야기의 출발점이에요.",
      why: "It is right at the start of chapter one. Their mother died the day after Caleb was born. That is why Caleb keeps asking Anna to tell the story again — and it is where the whole book begins." },
    { q: "Why does Papa write to a newspaper?",
      a: ["To sell the farm", "To find a wife", "To buy more sheep", "To look for a teacher"], c: 1,
      why_ko: "아빠는 신문에 광고 advertisement 를 냈어요. 아내를 찾는 광고요. 농장을 팔거나 양을 사려던 게 아니에요. 옛날에는 이렇게 편지로 사람을 만나기도 했답니다.",
      why: "Papa puts an advertisement in the paper — for a wife. Not to sell the farm, not to buy sheep. Long ago people really did meet this way." },
    { q: "Where does Sarah come from?",
      a: ["Maine", "Kansas", "Tennessee", "Boston"], c: 0,
      why_ko: "사라 엘리자베스 휘튼, 메인의 바닷가에서 편지를 보냈어요. 사라가 그리워하는 것이 전부 바다와 이어져 있다는 걸 기억하면 이 문제는 절대 안 틀려요.",
      why: "Sarah Elisabeth Wheaton writes from Maine, by the sea. Everything she misses comes back to that sea — remember that and you will never miss this one." },
    { q: "What does Sarah bring with her?",
      a: ["A dog", "A cat named Seal", "A horse", "A lamb"], c: 1,
      why_ko: "고양이 Seal 을 데리고 와요. 이름이 바다표범이라니, 이것도 바다예요! 사라는 바다를 조금씩 가지고 온 셈이죠.",
      why: "She brings her cat, Seal. Even the cat's name is a sea animal — Sarah carries little pieces of the sea with her." },
    { q: "How long does Sarah say she will stay at first?",
      a: ["One week", "One month", "One year", "Forever"], c: 1,
      why_ko: "딱 한 달이에요. 서로 맞는지 보려고요. 바로 이 한 달이라는 약속 때문에 아이들이 내내 마음을 졸이는 거예요. 사라가 떠날까 봐요.",
      why: "One month — to see if they all suit each other. That one month is why the children are anxious the whole way through: she might still leave." },
    { q: "Which three colours does Sarah miss most?",
      a: ["Red, white, and blue", "Black, brown, and gold", "Blue, gray, and green", "Pink, yellow, and white"], c: 2,
      why_ko: "파랑, 회색, 초록! 이 세 가지 색은 바다의 색이에요. 그냥 색 이름이 아니라 사라의 그리움이에요. 뒤에 색연필 장면에서 다시 나오니까 꼭 붙잡아 두세요.",
      why: "Blue, gray, and green — the colours of the sea. They are not just colours, they are her homesickness. Hold on to them; they come back with the pencils." },
    { q: "Why are Anna and Caleb afraid when Sarah drives to town alone?",
      a: ["The horses are wild", "A storm is coming", "They think she is going back to Maine", "She has no money"], c: 2,
      why_ko: "말이 사나워서도, 폭풍 때문도 아니에요. 사라가 바다로 돌아가 버릴까 봐 무서웠던 거예요. 앞에서 사라가 바다를 그리워한다고 말했던 게 여기서 터지는 거죠.",
      why: "Not the horses, not a storm. They are afraid she is going back to the sea. Everything she said about missing Maine comes crashing in right here." },
    { q: "What does Sarah bring back from town?",
      a: ["Coloured pencils", "A new dress", "A book of songs", "Flowers for the garden"], c: 0,
      why_ko: "파랑, 회색, 초록 색연필이에요. 여기서 소름! 바다로 돌아간 게 아니라, 바다를 여기서 그리려고 사 온 거예요. 사라가 남기로 한 마음이 이 색연필 안에 다 들어 있어요.",
      why: "Blue, gray, and green pencils. Here is the goosebump moment: she did not go back to the sea — she bought a way to draw it here. Her decision to stay is inside those pencils." },
    { q: "What is this book really about?",
      a: ["Farming is hard work", "Storms are dangerous on the prairie",
          "A family can be made by choosing each other", "Maine is better than Kansas"], c: 2,
      why_ko: "주제 문제예요. 사라는 바다보다 이 가족을 더 그리워할 것 같다고 말해요. 가족은 태어나면서 정해지는 것만이 아니라, 서로를 고르는 것이기도 해요. 그게 이 책의 심장이에요.",
      why: "The theme question. Sarah says she would miss them more than the sea. A family is not only what you are born into — it is also people choosing each other. That is the heart of the book." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{a farm on the prairie}}", time: "{{spring to summer, long ago}}" },
    swbst: [
      { k: "Somebody", v: "{{Anna and Caleb, two children on a prairie farm}}" },
      { k: "Wanted",   v: "{{a mother, and singing in the house again}}" },
      { k: "But",      v: "{{Sarah came from the sea and missed it very much}}" },
      { k: "So",       v: "{{they tried to make her happy so that she would stay}}" },
      { k: "Then",     v: "{{Sarah chose them, and stayed on the prairie}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Caleb asks Anna to tell him again how Mama died, and how Papa stopped singing.",
        frame: "Papa tells the children that {{he has written for a wife, and she is coming}}." },
      { label: "1",
        given: "",
        frame: "Sarah writes back from Maine and says {{she will come for one month}}, and she signs her letter {{\"Sarah, plain and tall\"}}." },
      { label: "2",
        given: "Sarah arrives with her cat, Seal, and a shell from the sea.",
        frame: "The children are happy but afraid, because {{they do not know if she will stay}}." },
      { label: "3",
        given: "",
        frame: "Sarah misses the sea. She says the missing colours are {{blue, gray, and green}}." },
      { label: "End",
        given: "Sarah drives the wagon to town alone, and the children are afraid she is leaving.",
        frame: "She comes back with {{three coloured pencils}} and says {{she would miss them more than the sea}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Sarah, Plain and Tall",
    branches: [
      { label: "Inside / Outside", ask: "Sarah — what do we SEE her do? What does she THINK and FEEL inside?",
        deeper: "Which does the writer show us more? Why?" },
      { label: "Two Homes",        ask: "Find three things from the sea and three things from the prairie.",
        deeper: "What does Sarah give up, and what does she get?" },
      { label: "Singing",          ask: "Who sings in this book, and when did the singing stop?",
        deeper: "What does singing stand for in this family?" },
      { label: "Turning Point",    ask: "Which one moment made you sure that Sarah would stay?",
        deeper: "What would have happened without that moment?" },
      { label: "Me",               ask: "When did you have to leave a place you loved?",
        deeper: "What did you carry with you from it?" },
      { label: "Family",           ask: "What makes a family in this book — blood, or choosing?",
        deeper: "Give one scene that proves your answer." }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Setting", "Character", "Point of view"],
    globalContext: "Identities and relationships — belonging, home, and how a family is made (소속·집·가족은 어떻게 만들어지는가)",
    statement: "A home is not only the place we come from; it can also be the place and the people we choose.",
    factual: [
      "Where does Sarah come from, and where does she go?",
      "What does Sarah bring with her to the prairie?",
      "What does Sarah buy in town at the end?"
    ],
    conceptual: [
      "How does the writer use colours to show what Sarah is feeling?",
      "Why does the writer tell the story through Anna's eyes, not Papa's?"
    ],
    debatable: [
      "Is a home a place, or the people in it?",
      "Did Sarah give up too much to stay on the prairie?"
    ],
    learnerProfile: ["Caring", "Open-minded", "Reflective", "Risk-taker", "Communicator"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Sarah left the sea she loved and stayed on the prairie with Anna, Caleb, and Papa. Did she make the right choice? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣고 챕터를 밝힐 것 · Use one scene from the book and name the chapter",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Sarah Chose the Right Home", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Sarah made the right choice when she stayed on the prairie.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene and the chapter.",
        eg: "In ch. 9, Sarah came back from town with blue, gray, and green pencils to draw the sea.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that she did not have to lose the sea, because she could keep it with her.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say she gave up her home, but she said she would miss the children more.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe Sarah found a new home instead of losing an old one.", lines: 2 }
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

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  teaching: {
    goal: {
      en: "Students trace how Sarah's feelings change through colour and song, then take a side on what makes a home.",
      ko: "색과 노래를 따라가며 사라의 마음이 어떻게 바뀌는지 짚고, '집이란 무엇인가'에 편을 정해 쓴다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of a place you had to leave. One sentence — what do you miss about it?",
        do: "책을 펴기 전에 한다. 사라의 마음을 아이 경험에서 먼저 꺼내야 이 책이 읽힌다. 두세 명만.",
        exp: "I miss my old school because my friends were there.",
        stuck: "선생님이 먼저 한 문장 한다. 어른이 먼저 말하면 아이가 따라 말한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 확인만 3분. 열 개를 다 묻지 말고 다섯 개만 고른다.",
        exp: "대초원 → prairie / 모래언덕 → dune / 고집 센 → stubborn",
        stuck: "예문을 읽어 준다. \"The farm stands alone in the middle of the ___.\"" },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다. 한 번 해 본 아이만 집에서도 한다.",
        stuck: "폰이 없는 아이는 교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 방법을 설명하지 않는다. 5분 재고 끊는다.",
        stuck: "\"Read the whole sentence first, then think of the word.\"" },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Why did Papa...' becomes 'Papa did it because...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 주고 매 시간 반복한다.",
        exp: "Papa put an advertisement in the newspaper because he wanted a wife.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다. 못 짚으면 답이 맞아도 넘어가지 않는다.",
        stuck: "챕터를 알려 준다. \"It's in chapter 6. Find the colours.\"" },

      { stage: "Comprehension", min: "",
        say: "Question seven we do together. Read Sarah's sentence out loud, slowly, twice.",
        do: "7번은 이 책 전체의 주제 문장이다. 혼자 두면 못 쓴다. 소리 내어 두 번 읽히고 같이 푼다.",
        exp: "It means she chose the family, even though she still loves the sea.",
        stuck: "쪼개서 묻는다. \"What will she always miss?\" → \"What would she miss MORE?\"" },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. What is different about them?",
        do: "규칙을 먼저 말하지 않는다. 빨간 부분만 읽히고 아이가 먼저 알아채게 한다.",
        exp: "They are past, but they don't have -ed.",
        stuck: "원형을 옆에 써 준다. \"write → wrote. come → came. See it now?\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다. 바로 써 보게 한다. 한 문장 쓰면 그 문법은 끝난 것이다.",
        exp: "Sarah brought her cat, and she sang in the kitchen.",
        stuck: "원형을 준다. \"bring → ? sing → ?\" 세 개만 같이 해 준다." },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find three irregular past verbs. Write the base form too.",
        do: "책을 다시 펴게 하는 것이 목적이다. 세 개면 충분하다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look at chapter 1. Almost every verb there is past.\" 범위를 좁혀 준다." },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how your school test asks it. Write only the answer on the right. Not the whole sentence.",
        do: "답만 쓰게 한다. 문장을 통째로 옮겨 적는 아이가 반드시 나온다. 시작 전에 못을 박는다.",
        stuck: "1번을 같이 푼다. \"Is 'writed' a real word? No. So...\"" },

      { stage: "Exam Grammar", min: "",
        say: "Section three is different. Korean on the left, and you must use the words in the grey box. All of them.",
        do: "조건 영작이다. 조건 단어를 빠뜨리면 내신에서 0점이라고 분명히 말해 준다.",
        exp: "Sarah missed the sea.",
        stuck: "한국어를 영어 어순으로 다시 읽어 준다. \"사라는 / 그리워했다 / 바다를.\"" },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다. 어떤 책이든 이 틀로 줄어든다.",
        exp: "Somebody: Anna and Caleb / Wanted: a mother / But: Sarah missed the sea",
        stuck: "\"Who is waiting in this story? Who is afraid?\" 주인공을 다시 잡아 준다." },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다. 고쳐 주지 말고 읽게만 한다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "62~72분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다. 여기서 시간을 쓰면 정작 중요한 → 칸을 못 한다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map (Two Homes)", min: "",
        say: "Make two lists. Things from the sea. Things from the prairie. Then look at both and tell me what Sarah is choosing between.",
        do: "감정을 묻지 말고 목록을 만들게 한다. 목록이 쌓이면 아이가 스스로 주제를 말한다.",
        exp: "Sea: shell, Seal the cat, blue and gray. Prairie: sheep, haystack, Anna and Caleb.",
        stuck: "칠판에 두 칸을 그리고 첫 줄씩 채워 준다. 그 다음은 아이가 채운다." },

      { stage: "Mind Map (Singing)", min: "",
        say: "Papa stopped singing when Mama died. Sarah wrote, 'Tell them I sing.' Why does that one line matter so much?",
        do: "노래는 이 책에서 슬픔과 회복의 표시다. 이 질문 하나로 주제가 열린다. 시간을 넉넉히 준다.",
        exp: "It means happiness could come back to the house.",
        stuck: "\"When does a house sing? When is it quiet?\" 아이 집으로 바꿔 묻는다." },

      { stage: "IB Inquiry", min: "72~80분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, the book cannot answer it — only you can.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\" 라고 되묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "Is a home a place, or the people in it? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다. 중립을 허용하면 논술이 안 나온다.",
        exp: "I think a home is the people, because Sarah chose Anna and Caleb over the sea.",
        stuck: "손을 들게 한다. \"Place? People?\" 몸으로 편을 정하면 글이 나온다." },

      { stage: "Writing", min: "80~95분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished — even if it is beautiful.",
        do: "조건 네 개를 같이 소리 내어 읽는다. 내신 서·논술형은 조건 누락이 감점 1순위다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다. 다 쓴 뒤에도 다시 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means a scene and a chapter number. 'Sarah was kind' is not evidence. 'In ch. 9, Sarah bought three pencils' is.",
        do: "근거와 감상을 구분해 준다. 칠판에 두 문장을 나란히 써 둔다.",
        exp: "In ch. 9, Sarah came back with blue, gray, and green pencils to draw the sea.",
        stuck: "\"Which chapter? Find it now.\" 못 찾으면 근거를 바꾸게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say she gave up her home, but she said she would miss the children more.",
        stuck: "\"Some people say..., but...\" 두 조각을 칠판에 써 준다. 틀만 있으면 채운다." },

      { stage: "Wrap-up", min: "95~100분",
        say: "One person, read only your Counter sentence. Just that one.",
        do: "반박 문장만 발표시킨다. 가장 어려운 부분이라 공유 효과가 가장 크다. 세 명이면 충분하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "If you had to leave your home tomorrow, what one thing would you take?", ko: "내일 집을 떠나야 한다면 딱 하나 무엇을 가져가겠니?" },
        { en: "Can someone who is not your blood family become your family?", ko: "피가 섞이지 않은 사람도 가족이 될 수 있을까?" },
        { en: "What does your house sound like when everyone is happy?", ko: "네 집이 행복할 때는 어떤 소리가 나니?" }
      ],
      during: [
        { en: "Why does Caleb ask the same question over and over?", ko: "케일럽은 왜 같은 질문을 계속할까?" },
        { en: "Sarah keeps talking about the sea. Is that a good sign or a bad sign?", ko: "사라가 자꾸 바다 이야기를 한다. 좋은 신호일까, 나쁜 신호일까?" },
        { en: "Papa does not say much. What do his actions say instead?", ko: "아빠는 말이 없다. 대신 행동이 무엇을 말하고 있니?" }
      ],
      after: [
        { en: "Sarah said she would miss them more than the sea. Do you believe her?", ko: "사라는 바다보다 이들이 더 그리울 거라 했다. 믿어지니?" },
        { en: "Why does the book end with pencils and not with a wedding?", ko: "이 책은 결혼식이 아니라 색연필로 끝난다. 왜일까?" },
        { en: "What makes a family — living together, or choosing each other?", ko: "가족은 무엇으로 되는 걸까 — 같이 사는 것, 아니면 서로를 택하는 것?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "숙제로 읽어 오게 한다. 수업에서는 확인만.", miss: "뜻만 외우고 예문을 건너뛴다. 예문이 서술형 문장의 재료다." },
      { sheet: "Word Test",     point: "보기 칸을 먼저 읽히면 설명이 필요 없다.", miss: "철자를 반만 쓴다. 끝 글자까지 쓰게 한다." },
      { sheet: "Comprehension", point: "7번은 다 같이. 나머지는 혼자.", miss: "단어 하나로 답한다. 'Because sad.' 같은 조각 문장." },
      { sheet: "Grammar",      point: "빨간 부분만 같이 읽고 바로 아래 칸을 시킨다.", miss: "규칙을 외우려 한다. 문장을 써 보게 하는 것으로 충분하다." },
      { sheet: "Exam Grammar", point: "답만 쓴다. 풀이 과정은 쓰게 하지 않는다.", miss: "괄호를 통째로 옮겨 적는다. 고른 것 하나만." },
      { sheet: "Summary Map",   point: "SWBST 를 먼저, 장면은 그 다음.", miss: "빈칸을 책에서 베껴 온다. 자기 말로 바꾸게 한다." },
      { sheet: "Mind Map",      point: "'두 개의 집' 과 '노래' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable 에 '둘 다 맞다' 라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상을 쓴다. 챕터 번호가 없으면 근거가 아니다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",     pt: 5, yes: "책 속 장면을 들고 챕터를 밝혔다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization", pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",        pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",     pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  }
};

// 낭독녹음: 책 본문이 아니라 핵심 장면을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = {"scene": "폭풍이 오고 사라가 마을에서 돌아오는 장면", "text": "Sarah came from Maine to the [[grassland|prairie]]. She said she was [[simple|plain]] and tall, and she missed the sea. One day, a [[sudden storm|squall]] came. The family and the animals [[crowded together|huddled]] in the barn. The sky was dark and [[spooky|eerie]]. Later, Sarah rode to town alone, and the children were afraid. But she came back with colored pencils, blue, gray, and green, the colors of the sea. She would miss the sea, but she would miss them more."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Where We Are in Place and Time",
 "themeKo": "우리가 속한 공간과 시간",
 "profile": [
  {
   "attr": "Risk-taker",
   "how": "Think about Sarah leaving the sea for a place she has never seen."
  },
  {
   "attr": "Caring",
   "how": "See how Anna and Caleb slowly make Sarah feel at home."
  }
 ],
 "hook": [
  "Show two photos, the Maine coast and the prairie: which would you miss more?",
  "Pack a small bag: what three things would you take to a new home? Why?"
 ],
 "connections": [
  {
   "subject": "Geography",
   "idea": "Trace Sarah's journey from Maine to the prairie on a map of the USA."
  },
  {
   "subject": "History",
   "idea": "Life in the 1800s: letters, wagons, farm work. Compare with today."
  },
  {
   "subject": "Art",
   "idea": "Sarah's colors: draw the sea and the prairie with only blue, gray and green."
  }
 ],
 "speaking": [
  "Hot seat: one student is Sarah; the class asks why she stayed.",
  "Think-Pair-Share: what does 'home' mean to you?"
 ],
 "writing": [
  "Write a letter from Caleb to Sarah before she arrives.",
  "Write a diary entry for Sarah's first night on the prairie."
 ]
};
