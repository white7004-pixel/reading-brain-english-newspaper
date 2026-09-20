// 리딩브레인 원서프로그램 — 책 한 권 데이터
// 워크시트 4종이 모두 이 파일 하나를 읽는다. 책이 바뀌면 이 파일만 새로 만든다.
// {{}} 는 학생이 채우는 밑줄 칸이다. 인쇄하면 밑줄, 화면에서는 입력칸이 된다.

window.BOOK = {
  bookNo: "S4191",
  slug: "holes",
  title: "Holes",
  author: "Louis Sachar",
  series: "",
  publisher: "Farrar, Straus and Giroux",
  level: { ar: "4.6", lexile: "660L", rb: "정독 3단계" },
  awards: ["Newbery Medal 1999", "National Book Award 1998"],
  defSource: "Wiktionary (CC BY-SA)",
  cover: "assets/covers/holes.jpg",

  shadowing: {
    query: "\"Holes\" read aloud",
    searchUrl: "https://youtu.be/r7t6Fv1j3Q0",
    qr: "assets/qr/holes.png",
    videos: [
      { url: "https://youtu.be/r7t6Fv1j3Q0", title: "Holes chapters 1-3", channel: "Mr. Daniels' Classroom", views: "315,316", length: "" },
      { url: "https://youtu.be/c0xSexjKnmg", title: "Holes Chapter 1", channel: "Miss Carney", views: "234,262", length: "" },
      { url: "https://youtu.be/l4k9TvtHlD8", title: "Holes Chapter 7", channel: "Miss Carney", views: "155,557", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "dig",        pos: "v.", audio: "assets/audio/holes/dig.mp3", en: "To make a hole in the ground by removing soil", ko: "파다", ex: "Every boy at Camp Green Lake {{digs}} one hole five feet deep and five feet wide each day.", ex_ko: "그린 레이크 캠프의 모든 소년들은 매일 깊이 5피트, 너비 5피트의 구멍을 한 개씩 파요.", pic: "🔨" },
    { word: "curse",      pos: "n.", audio: "assets/audio/holes/curse.mp3", en: "A spell or wish that bad things will happen to someone", ko: "저주", ex: "Stanley's family carries a {{curse}} from generations past because his great-great-grandfather broke a promise.", ex_ko: "스탠리의 증증할아버지가 약속을 어겨서 그의 가족은 대대로 저주를 받고 있어요.", pic: "👻" },
    { word: "justice",    pos: "n.", audio: "assets/audio/holes/justice.mp3", en: "Fair treatment and what is morally right", ko: "정의", ex: "The story shows {{justice}} when the truth finally comes out and innocence is proven.", ex_ko: "진실이 드러나고 무죄가 증명될 때 정의가 나타나요.", pic: "⚖️" },
    { word: "suitcase",   pos: "n.", audio: "assets/audio/holes/suitcase.mp3", en: "A bag or container for carrying belongings when traveling", ko: "여행가방", ex: "Stanley and Zero find a {{suitcase}} buried in the ground with Stanley's name on it.", ex_ko: "스탠리와 제로는 스탠리의 이름이 쓰인 여행가방을 땅 속에서 찾아요.", pic: "💼" },
    { word: "lizard",     pos: "n.", audio: "assets/audio/holes/lizard.mp3", en: "A reptile with four legs, a tail, and dry skin", ko: "도마뱀", ex: "The yellow-spotted {{lizard}}s are deadly and dangerous at Camp Green Lake.", ex_ko: "노란 점이 있는 도마뱀들은 그린 레이크 캠프에서 위험해요.", pic: "🦎" },
    { word: "onion",      pos: "n.", audio: "assets/audio/holes/onion.mp3", en: "A round vegetable with layers and a strong smell", ko: "양파", ex: "Stanley and Zero survive the deadly lizards because they ate {{onion}}s and the lizards do not bite them.", ex_ko: "스탠리와 제로는 양파를 먹어서 도마뱀에게 물리지 않고 살아남아요.", pic: "🧅" },
    { word: "promise",    pos: "n.", audio: "assets/audio/holes/promise.mp3", en: "A serious commitment to do something", ko: "약속", ex: "Elya Yelnats broke his {{promise}} to Madame Zeroni, creating a curse that follows his family.", ex_ko: "엘야 옐나츠가 마담 제로니와의 약속을 어겨서 그의 가족에게 저주가 생겼어요.", pic: "🤝" },
    { word: "innocent",   pos: "adj.", audio: "assets/audio/holes/innocent.mp3", en: "Not guilty; not responsible for a crime", ko: "무죄의, 억울한", ex: "Stanley is {{innocent}} of stealing the sneakers, but no one believes him at first.", ex_ko: "스탠리는 운동화를 훔친 죄가 없지만, 처음엔 아무도 그를 믿지 않아요.", pic: "😇" },
    { word: "bury",       pos: "v.", audio: "assets/audio/holes/bury.mp3", en: "To place something in the ground and cover it up", ko: "묻다, 숨기다", ex: "Did the outlaw {{bury}} her treasure somewhere at Camp Green Lake?", ex_ko: "보물이 그린 레이크 캠프에 묻혀 있고, 감시관은 그것을 찾고 있어요.", pic: "⛰️" },
    { word: "mountain",   pos: "n.", audio: "assets/audio/holes/mountain.mp3", en: "A very tall landform that rises high above the surrounding land", ko: "산", ex: "Stanley carries Zero up the {{mountain}} called God's Thumb to break the curse.", ex_ko: "스탠리는 저주를 풀기 위해 제로를 '신의 엄지손가락'이라는 산으로 옮겨 올려요.", pic: "⛰️" }
  ],

  // ── ①-2 문법 (영영문법 1장 + 입시문법 1장) ─────────────
  grammar: {
    points: [
      { name: "Past Perfect", ko: "과거완료",
        sent: "Before Stanley came to the camp, his family [[had had]] bad luck for many years.",
        why_ko: "과거완료 had + 과거분사는 '더 먼저 일어난 과거'예요. 두 과거 사건 중 앞선 쪽에 had p.p.! 시간 순서 파악이 핵심이에요.",
      why: "Use had + past participle to show that one past action happened before another past action.",
        try: "Stanley {{had dug}} many holes before he learned why the Warden wanted them." },
      { name: "Conditional (if..., ...)", ko: "조건문",
        sent: "[[If]] Stanley [[had not been]] sent to the camp, he [[would never have met]] Zero.",
        why_ko: "가정법 과거완료: If + had p.p., would have p.p. = '(그때) ~했더라면 ~했을 텐데'. 실제로는 일어나지 않은 일이에요!",
      why: "Use if + past perfect to talk about situations that did not happen and the imaginary results.",
        try: "{{If}} you {{had been}} wrongly accused, you {{would have}} understood Stanley's pain." },
      { name: "Relative clauses", ko: "관계대명사절",
        sent: "Zero is a boy [[whose]] real name is Hector, and the suitcase [[which]] they find has Stanley's name on it.",
        why_ko: "관계사: 사람의 ~이면 whose, 사물은 which/that, 장소는 where. 앞에 있는 명사가 무엇인지부터 보세요!",
      why: "Use whose (for people) and which (for things) to add information about a noun.",
        try: "Zero is the boy {{whose}} family was cursed, and onions are the food {{which}} saved them." }
    ],
    find: "책에서 과거완료(had + verb)가 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences with \"had\".",
    exam: {
      choose: [
        {"q": "Before Stanley came to camp, his family (had had / has) bad luck for years.", "a": "had had", why_ko: "캠프에 온 것보다 '더 먼저' 있었던 일이에요. 더 앞선 과거는 had + 과거분사, had had!" },
        {"q": "If Stanley had not gone to camp, he (would never have met / will never meet) Zero.", "a": "would never have met", why_ko: "if절에 had not gone(과거완료)이 있으면 결과는 would have + 과거분사예요. would never have met!" },
        {"q": "Zero is a boy (whose / which) real name is Hector.", "a": "whose", why_ko: "'소년의 이름'처럼 '누구의'를 말할 때는 whose예요. which는 사물에만 써요." },
        {"q": "The suitcase (which / who) they found had Stanley's name on it.", "a": "which", why_ko: "suitcase(여행가방)는 사물이에요. 사물 뒤에는 who가 아니라 which!" },
        {"q": "Camp Green Lake is a place (where / which) boys dig holes.", "a": "where", why_ko: "Camp Green Lake는 장소예요. 장소 뒤에서 '거기서 ~하는'은 where!" }
      ],
      fix: [
        {"q": "If Stanley had not carried Zero, the curse [[would not break]].", "a": "would not have broken", why_ko: "If + had p.p. 가정법 과거완료에서 결과는 would have + 과거분사예요. would not have broken!" },
        {"q": "Zero is a boy [[which]] could not read.", "a": "who", why_ko: "Zero는 사람이에요. 사람 뒤에는 which가 아니라 who!" },
        {"q": "Yesterday Stanley [[dig]] a hole.", "a": "dug", why_ko: "Yesterday는 과거 신호예요. dig는 불규칙이라 과거형이 dug!" }
      ],
      write: [
        {"ko": "제로는 진짜 이름이 헥터인 소년이었다.", "cond": "whose, real name", "a": "Zero was a boy whose real name was Hector.", why_ko: "'이름이 헥터인 소년'처럼 '누구의'는 whose + 명사예요. a boy whose real name was Hector." },
        {"ko": "스탠리가 캠프에 가지 않았더라면 제로를 만나지 못했을 것이다.", "cond": "if, had not gone, would have", "a": "If Stanley had not gone to camp, he would not have met Zero.", why_ko: "과거에 일어나지 않은 일을 가정할 때는 If + had not p.p., would not have p.p.예요!" }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "ch. 1~2",  skill: "사실찾기",   q: "Why is Stanley sent to the camp?",
      frame: "Stanley {{is wrongly accused of stealing}} the sneakers of baseball star {{Clyde \"Sweet Feet\" Livingston}}, even though {{he is innocent}}." },
    { ref: "ch. 3~4",  skill: "사실찾기",   q: "What is the boys' daily job at Camp Green Lake?",
      frame: "Every boy {{must dig one hole}} that is {{five feet wide and five feet deep}} {{every single day}}." },
    { ref: "ch. 5~6",  skill: "어휘",       q: "Who is Zero, and what does Stanley discover about him?",
      frame: "Zero's {{real name is Hector Zeroni}} and {{he cannot read}}, but {{Stanley teaches him}}." },
    { ref: "ch. 10~15", skill: "추론·예측",  q: "Why does the Warden really make the boys dig holes every day?",
      frame: "The {{official reason is to build character}}, but the {{real reason is that the Warden is searching for buried treasure}}." },
    { ref: "ch. 15~20", skill: "사실찾기",   q: "What family curse affects Stanley, and how did it begin?",
      frame: "Stanley's {{great-great-grandfather Elya Yelnats broke a promise}} to {{Madame Zeroni}}, so {{her curse followed his family}}." },
    { ref: "ch. 25~30", skill: "추론·예측",  q: "How does Stanley help Zero escape, and what happens then?",
      frame: "Stanley {{carries Zero up a mountain called God's Thumb}} which {{breaks the curse}} because {{it fulfills the promise that was broken}}." },
    { ref: "ch. 31~33", skill: "주제·요점",  q: "What do Stanley and Zero find in the hole, and what does it mean?",
      frame: "They {{find a suitcase}} {{with Stanley's name on it}}, which {{belongs to Stanley's family}} and {{makes them rich again}}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "Why is Stanley arrested at the beginning?",
      a: ["He stole money from school", "A baseball star's sneakers fell on him and he was blamed", "He ran away from home", "He hurt another person"], c: 1,
      why_ko: "야구 선수의 신전한 운동화가 육교에서 떨어져서 그 위에 떨어졌어요. 운이 나빴지만 억울하게 고소당한 거예요.",
      why: "The sneakers of Clyde \"Sweet Feet\" Livingston fall from an overpass and land on Stanley. He is wrongly blamed for stealing them." },
    { q: "Where does the story take place?",
      a: ["By the sea", "In a cold city", "At Camp Green Lake, a dried-up lake in Texas", "In a jungle"], c: 2,
      why_ko: "그린 레이크는 물이 없는 마른 호수예요. 사막처럼 뜨겁고 건조한 곳에서 소년들이 구멍을 파는 거죠.",
      why: "Camp Green Lake is a dried-up lake in the Texas desert. Despite its name, there is no water." },
    { q: "Who is Zero in the story?",
      a: ["A worker at the camp", "A boy named Hector who cannot read and becomes Stanley's friend", "The Warden's son", "A police officer"], c: 1,
      why_ko: "제로는 헥터라는 실명이 있는 소년이에요. 학교에서 배운 적이 없어서 읽고 쓸 수 없지만 지능이 높아요. 스탠리와 제로의 우정이 이 책의 핵심이에요.",
      why: "Zero's real name is Hector Zeroni. He never learned to read, but he is very smart. He and Stanley become close friends." },
    { q: "What does Stanley dig for each day?",
      a: ["Gold coins", "One hole five feet deep and five feet wide", "Water for the camp", "Treasure maps"], c: 1,
      why_ko: "정확히 지정된 크기예요: 깊이 5피트, 너비 5피트. 매일 한 개씩 파는 거죠. 이 일이 겉으로는 성격을 다지는 것 같지만 뭔가 숨겨진 이유가 있어요.",
      why: "Each day, Stanley digs exactly one hole that is five feet deep and five feet wide. This seems like character-building, but there is a real reason." },
    { q: "Why does the Warden really make the boys dig?",
      a: ["To build their strength", "To teach them a lesson", "To search for buried treasure", "To find water"], c: 2,
      why_ko: "감시관은 매장된 보물을 찾고 있어요. 공식적인 이유는 성격 단련이지만 정말로는 보물을 원하는 거예요.",
      why: "The Warden is searching for buried treasure. That is why she forces the boys to dig specific patterns in the desert." },
    { q: "What is the curse that follows Stanley's family?",
      a: ["An illness", "Bad luck from a broken promise to Madame Zeroni", "A ghost", "A mystery"], c: 1,
      why_ko: "스탠리의 증증할아버지 엘야가 마담 제로니와의 약속을 어겨서 저주가 생겼어요. 그 저주가 대대로 내려온 거죠. 이 책의 큰 신비예요.",
      why: "Stanley's great-great-grandfather Elya Yelnats broke a promise to Madame Zeroni. The curse follows his family through generations." },
    { q: "How do Stanley and Zero survive the yellow-spotted lizards?",
      a: ["They run away quickly", "They eat onions, which make the lizards not bite them", "They hide in the suitcase", "The Warden saves them"], c: 1,
      why_ko: "양파를 먹으면 도마뱀들이 물지 않아요! 스탠리와 제로는 양파를 많이 먹으면서 산에서 살아남아요. 음식의 냄새가 도마뱀들을 물치 않게 하는 거죠.",
      why: "They eat onions, and the onion blood makes the deadly lizards refuse to bite them. It is a clever survival trick." },
    { q: "How does Stanley break the curse?",
      a: ["He finds the treasure", "He carries Zero up a mountain", "He tells the truth", "He leaves the camp"], c: 1,
      why_ko: "스탠리가 제로를 산 위로 옮겨 올리는 것이 대대로 내려온 저주를 푸는 거예요. 엘야가 마담 제로니를 산에 옮겨 올리지 않았던 약속이 마침내 이루어진 셈이죠.",
      why: "Stanley carries Zero (Hector Zeroni) up a mountain called God's Thumb. This fulfills the promise that was broken long ago, breaking the curse." },
    { q: "What do Stanley and Zero find when digging?",
      a: ["Gold coins and jewels", "A map to treasure", "A suitcase with Stanley's name on it", "Letters from the past"], c: 2,
      why_ko: "여행가방이에요! 그것도 스탠리라는 이름이 쓰인 여행가방이에요. 이것은 스탠리의 증할아버지 스탠리 옐나츠 1세의 것으로 보여요. 이것이 스탠리가 무죄라는 증거가 돼요.",
      why: "They find a suitcase with Stanley Yelnats written on it. This suitcase contains items that prove Stanley is innocent." },
    { q: "What is the main lesson of Holes?",
      a: ["Digging is hard work", "The past always catches up with you", "Truth and friendship can break a curse", "Treasure is worth any price"], c: 2,
      why_ko: "주제를 묻는 문제예요. 이 책은 진실이 얼마나 중요한지, 그리고 진정한 우정이 어떻게 모든 것을 바꿀 수 있는지 말해요. 스탠리와 제로의 우정이 저주를 풀어요.",
      why: "This book teaches that truth and friendship are powerful enough to break even a generations-old curse. Stanley's loyalty to Zero changes everything." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{Camp Green Lake, a dried-up lake in Texas}}", time: "{{present day and the past}}" },
    swbst: [
      { k: "Somebody", v: "{{Stanley Yelnats, a boy wrongly accused of stealing}}" },
      { k: "Wanted",   v: "{{to prove his innocence and break his family's curse}}" },
      { k: "But",      v: "{{he is sent to dig holes in a desert, and a family curse has followed him}}" },
      { k: "So",       v: "{{he makes friends with Zero and they dig together}}" },
      { k: "Then",     v: "{{they discover treasure and carry Zero up a mountain, breaking the curse and proving Stanley innocent}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Stanley is arrested for stealing sneakers he did not take.",
        frame: "He is {{sent to Camp Green Lake}} where {{boys dig holes}} and {{the Warden watches them}}." },
      { label: "1",
        given: "Stanley meets Zero, a boy who cannot read.",
        frame: "Zero {{helps Stanley dig}} and {{Stanley teaches him to read}}." },
      { label: "2",
        given: "Stanley learns about his family's curse from a broken promise to Madame Zeroni.",
        frame: "Stanley's {{great-great-grandfather Elya}} {{broke a promise}} and {{her curse followed his family for generations}}." },
      { label: "3",
        given: "Stanley and Zero discover an old gold tube and follow it to a suitcase.",
        frame: "They {{find a suitcase}} {{with Stanley's name on it}} that {{the Warden cannot keep}}." },
      { label: "End",
        given: "Stanley carries Zero up a mountain to break the curse.",
        frame: "This {{fulfills the broken promise}}, {{the curse breaks}}, {{Stanley is freed}} and {{Zero is reunited with his mother}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Holes",
    branches: [
      { label: "Curse vs. Choice", ask: "Is the curse real, or is it the choices people make that matter?",
        deeper: "What actually breaks the curse?" },
      { label: "Innocent vs. Guilty", ask: "Stanley is called a thief. Is he guilty, and who decides?",
        deeper: "When is it okay to give up on someone you think is guilty?" },
      { label: "The Hole", ask: "Why does the author make digging so central to the story?",
        deeper: "Is the hole punishment, or is it part of the solution?" },
      { label: "Friendship", ask: "What does Zero give Stanley, and what does Stanley give Zero?",
        deeper: "How does friendship break a 100-year-old curse?" },
      { label: "Me", ask: "Have you been blamed for something you did not do?",
        deeper: "How did you prove your innocence?" },
      { label: "The World", ask: "Why does this book mix past and present stories together?",
        deeper: "What does that teach us about time and justice?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Justice",
    relatedConcepts: ["Consequence", "Truth", "Relationship"],
    globalContext: "Fairness and development — how injustice affects lives across generations",
    statement: "When one person acts unfairly, it can create a chain of suffering that reaches far into the future unless someone has the courage to find the truth and repair the wrong.",
    factual: [
      "Why is Stanley sent to the camp?",
      "What do Stanley and Zero find when they dig?",
      "How does Stanley break his family's curse?"
    ],
    conceptual: [
      "Why does the author tell stories from the past and present at the same time?",
      "How does being wrongly accused change who Stanley is?",
      "What makes Stanley trust and help Zero when Zero cannot even read?"
    ],
    debatable: [
      "Is it fair to punish Stanley for a crime he did not commit, even if his family did something wrong long ago?",
      "Was the Warden wrong to make the boys dig holes every day just to find the treasure she wanted?",
      "Is seeking revenge for a past wrong ever justified, or does it just create more suffering?"
    ],
    learnerProfile: ["Thinker", "Principled", "Caring", "Reflective"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Stanley was blamed for stealing when he was innocent. Was he wrong to keep searching for the truth, or was he right? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣고 챕터를 밝힐 것 · Use one scene from the book and name the chapter",
      "because 또는 This is because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Stanley Was Right to Search for the Truth", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Stanley was right to persist in finding the truth.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene and the chapter.",
        eg: "In ch. 30-32, Stanley and Zero found the suitcase that proved Stanley innocent.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that the truth was worth the risk and hard work.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some say he should accept the punishment, but innocent people should not suffer.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe Stanley had the right to seek the truth.", lines: 2 }
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
      en: "Students trace how the past affects the present, and explore whether truth is worth the cost of seeking it.",
      ko: "과거가 현재에 미치는 영향을 따라가고, 진실을 찾는 것이 그 대가를 치를 만한 가치가 있는지 탐구한다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of an unfair rule or punishment. One sentence: would you break it or follow it?",
        do: "책을 펴기 전에 한다. 스탠리의 상황을 아이 경험에서 먼저 꺼내야 한다.",
        exp: "I would try to prove I was right, because accepting punishment for something I did not do is wrong.",
        stuck: "선생님이 먼저 한 문장 한다. 어른이 먼저 말하면 아이가 따라 말한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 확인만 3분. 열 개를 다 묻지 말고 다섯 개만.",
        exp: "파다 → dig / 저주 → curse / 여행가방 → suitcase",
        stuck: "예문을 읽어 준다. \"Every boy {{digs}} one hole five feet deep every day.\"" },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 방법을 설명하지 않는다. 5분 재고 끊는다.",
        stuck: "\"Read the whole sentence first, then think of the word.\"" },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Why is Stanley sent to camp?' becomes 'Stanley is sent to camp because...'",
        do: "이 한 마디가 서술형의 전부다. 매 시간 같이 반복한다.",
        exp: "Stanley is sent to camp because he was wrongly accused of stealing.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다. 못 짚으면 답이 맞아도 넘어가지 않는다.",
        stuck: "챕터를 알려 준다. \"It's in chapter 1. Find where he is arrested.\"" },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. What is different about them?",
        do: "규칙을 먼저 말하지 않는다. 빨간 부분만 읽히고 아이가 먼저 알아채게 한다.",
        exp: "They all use 'had'. They show the past before the past.",
        stuck: "두 문장으로 쪼개 준다. \"First this happened. Then that happened.\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다. 바로 써 보게 한다.",
        exp: "Stanley had been arrested before he arrived at the camp.",
        stuck: "\"What happened first? What happened next?\"" },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find two sentences with \"had\". Three minutes.",
        do: "책을 다시 펴게 하는 것이 목적이다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look in the beginning chapters where Stanley learns about the curse.\"" },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how your school test asks it. Write only the answer on the right.",
        do: "답만 쓰게 한다. 문장 전체를 옮겨 적는 아이가 나온다. 시작 전에 못을 박는다.",
        stuck: "1번을 같이 푼다. \"Had or has? Is it before or now?\"" },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Stanley / Wanted: to prove innocence / But: his family is cursed",
        stuck: "\"Who is the story about? What does he want most?\"" },

      { stage: "Mind Map", min: "62~72분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다. 여기서 시간을 쓰면 정작 중요한 → 칸을 못 한다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow questions. Don't write what happened — write what it means.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "It means that truth is stronger than any curse or punishment.",
        stuck: "\"So what? Why does that matter?\" 깊이 있게 묻는다." },

      { stage: "IB Inquiry", min: "72~80분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, the book cannot answer it — only you can.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"라고 되묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "The hardest one: was Stanley right to keep searching? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think Stanley was right because innocent people deserve justice and truth.",
        stuck: "손을 들게 한다. \"Right to search? Wrong to search?\" 몸으로 편을 정하면 글이 나온다." },

      { stage: "Writing", min: "80~95분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means a scene and a chapter number. 'Stanley was sad' is not evidence. 'In ch. 30, Stanley found the suitcase' is.",
        do: "근거와 감상을 구분해 준다. 칠판에 두 문장을 나란히 써 둔다.",
        exp: "In chapter 30-32, Stanley and Zero discovered the suitcase with Stanley's name on it.",
        stuck: "\"Which chapter? Find it now.\"" },

      { stage: "Wrap-up", min: "95~100분",
        say: "One person, read only your Counter sentence. Just that one.",
        do: "반박 문장만 발표시킨다. 세 명이면 충분하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "Have you ever been blamed for something you did not do? How did you feel?", ko: "너는 절대 하지 않은 일로 비난받은 적이 있니? 그 기분이 어땠니?" },
        { en: "When is it okay to break a rule? Is it ever okay?", ko: "언제 규칙을 어길 수 있을까? 정말 괜찮을 때가 있을까?" },
        { en: "Can the past change the present? Give an example.", ko: "과거가 현재를 바꿀 수 있을까? 한 가지 예를 들어 봐." }
      ],
      during: [
        { en: "Why does the author keep stopping to tell stories from the past?", ko: "작가는 왜 계속 이야기를 멈추고 옛날 이야기를 할까?" },
        { en: "Is Stanley's family really cursed, or is something else happening?", ko: "스탠리의 가족이 정말 저주받은 걸까, 아니면 다른 일이 일어나고 있는 걸까?" },
        { en: "What would you do if you were Stanley? Would you dig, escape, or something else?", ko: "너라면 스탠리처럼 어떻게 할래? 파고 있을까, 탈출할까, 아니면 다른 것을 할까?" }
      ],
      after: [
        { en: "Why does finding the suitcase matter more than just escaping?", ko: "탈출하는 것보다 여행가방을 찾는 게 더 중요한 걸까?" },
        { en: "What was the curse really? Was it magic or something else?", ko: "저주가 정말로 무엇이었을까? 마법이었을까, 아니면 다른 것이었을까?" },
        { en: "What did Stanley learn? What did you learn from this book?", ko: "스탠리가 뭘 배웠을까? 너는 뭘 배웠니?" }
      ]
    },
    notes: [
      { sheet: "Vocabulary",     point: "예문을 소리 내어 읽히고 넘어간다.", miss: "뜻만 외우고 예문을 건너뛴다." },
      { sheet: "Comprehension",  point: "질문을 문장으로 바꾸기(Restate)부터 시킨다.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",      point: "빨간 부분만 같이 읽고 바로 쓴다.", miss: "규칙을 설명하려 한다." },
      { sheet: "Summary Map",    point: "SWBST 를 먼저, 장면은 그 다음.", miss: "빈칸을 책에서 베껴 온다." },
      { sheet: "Mind Map",       point: "→ 칸에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",     point: "1·2단은 말로, 3단만 글로.", miss: "Debatable 에 'It depends' 라고 쓴다." },
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
window.BOOK.readAloud = {"scene": "스탠리와 제로가 산에 오르고 여행가방을 찾는 장면", "text": "Stanley Yelnats was [[not guilty|innocent]], but he was sent to Camp Green Lake. Every day, the boys had to [[shovel out|dig]] a big hole. Stanley's family had a [[bad-luck spell|curse]] because an old [[vow|promise]] was broken long ago. When his friend Zero ran away, Stanley went after him. Stanley carried Zero up a tall [[peak|mountain]], and they ate wild [[bulbs|onions]]. Later, they found a [[travel case|suitcase]] [[hidden|buried]] in a hole, with [[reptiles|lizards]] all around them."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "How We Organize Ourselves",
 "themeKo": "우리는 어떻게 조직하는가",
 "profile": [
  {
   "attr": "Principled",
   "how": "Judge what is fair at Camp Green Lake and who is responsible."
  },
  {
   "attr": "Reflective",
   "how": "Trace how Stanley changes, and how past choices shape the present."
  }
 ],
 "hook": [
  "Put a shovel picture on the board: 'Dig a hole five feet deep every day.' Does that build character?",
  "Show a dry lake photo: what happened here, and who decides the rules?"
 ],
 "connections": [
  {
   "subject": "Social studies",
   "idea": "Justice systems: punishment and rehabilitation. What is a fair consequence?"
  },
  {
   "subject": "Science",
   "idea": "Deserts and drought: water, heat, survival."
  },
  {
   "subject": "History",
   "idea": "Three timelines in one book: map how the past explains the present."
  }
 ],
 "speaking": [
  "Formal debate on a debatable question with claim, evidence, and rebuttal.",
  "Hot seat: question the Warden or Mr. Pendanski."
 ],
 "writing": [
  "Write a letter from Stanley to his mother that hides the truth, then the true version.",
  "Write an essay: is fate or choice more important in Holes?"
 ]
};
