// 리딩브레인 원서프로그램 — 책 한 권 데이터
// {{}} 는 학생이 채우는 밑줄 칸이다. 인쇄하면 밑줄, 화면에서는 입력칸이 된다.

window.BOOK = {
  bookNo: "S4309",
  slug: "charlie-and-the-chocolate-factory",
  title: "Charlie and the Chocolate Factory",
  author: "Roald Dahl",
  series: "",
  publisher: "Puffin",
  level: { ar: "4.8", lexile: "810L", rb: "정독 3단계" },
  awards: [],
  defSource: "Wiktionary (CC BY-SA)",
  cover: "assets/covers/charlie-and-the-chocolate-factory.jpg",

  shadowing: {
    query: "\"Charlie and the Chocolate Factory\" read aloud",
    searchUrl: "https://youtu.be/v_KqzYDYE2w",
    qr: "assets/qr/charlie-and-the-chocolate-factory.png",
    videos: [
      { url: "https://youtu.be/v_KqzYDYE2w", title: "CHARLIE and the CHOCOLATE FACTORY by ROALD DAHL [ Full Audio Book ]", channel: "Saya Saw - SHWE Education", views: "205,126", length: "" },
      { url: "https://youtu.be/KeziKhyqPZ0", title: "Sandy Reads aloud \"Charlie and The Chocolate Factory\" By Roald Dahl - Preschool Kids story time", channel: "Storytime With Sandy", views: "159,618", length: "" },
      { url: "https://youtu.be/fonnorhoAog", title: "Charlie and the Chocolate Factory - Roald Dahl - Read by Kerry Shale - 1989 Audiobook", channel: "The Monkey Grinder", views: "81,907", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "poverty",     pos: "n.", audio: "assets/audio/charlie-and-the-chocolate-factory/poverty.mp3", en: "The state of being extremely poor", ko: "빈곤, 가난", ex: "Charlie's family lived in {{poverty}}, struggling to afford basic food.", ex_ko: "찰리의 가족은 {{빈곤}} 속에서 살며 기본 식량을 겨우 구할 수 있었어요.", pic: "💔" },
    { word: "ticket",      pos: "n.", audio: "assets/audio/charlie-and-the-chocolate-factory/ticket.mp3", en: "A piece of paper or card that gives you permission to do or watch something", ko: "표, 티켓", ex: "Finding a golden {{ticket}} in the chocolate bar changed Charlie's life forever.", ex_ko: "초콜릿 안에서 황금 {{표}}를 찾은 것이 찰리의 인생을 바꿔 놓았어요.", pic: "🎟️" },
    { word: "exotic",      pos: "adj.", audio: "assets/audio/charlie-and-the-chocolate-factory/exotic.mp3", en: "Strikingly unusual or different, often from a foreign place", ko: "이국적인, 특이한", ex: "Inside the factory, Charlie saw {{exotic}} rooms with strange and wonderful things.", ex_ko: "공장 안에서 찰리는 {{이국적인}} 방들을 봤어요.", pic: "🌴" },
    { word: "whimsy",      pos: "n.", audio: "assets/audio/charlie-and-the-chocolate-factory/whimsy.mp3", en: "Playfully and unexpectedly humorous or fanciful; capriciousness", ko: "기발함, 괴상함", ex: "Willy Wonka's {{whimsy}} made the factory feel like a place where anything could happen.", ex_ko: "윌리 웡카의 {{기발함}}이 공장을 신비로운 곳으로 만들었어요.", pic: "✨" },
    { word: "contempt",    pos: "n.", audio: "assets/audio/charlie-and-the-chocolate-factory/contempt.mp3", en: "A feeling that someone or something is not worthy of respect", ko: "경멸, 무시", ex: "The spoiled children showed {{contempt}} for the rules and misbehaved throughout the tour.", ex_ko: "응석받이 아이들은 규칙에 {{경멸}}을 드러내며 투어 내내 나쁜 행동을 했어요.", pic: "😠" },
    { word: "testament",   pos: "n.", audio: "assets/audio/charlie-and-the-chocolate-factory/testament.mp3", en: "Clear evidence or proof of something", ko: "증거, 증명", ex: "The factory's wonders were a {{testament}} to the owner's creativity and imagination.", ex_ko: "공장의 경이로움은 소유자의 창의성에 대한 {{증명}}이었어요.", pic: "📜" },
    { word: "indulge",     pos: "v.", audio: "assets/audio/charlie-and-the-chocolate-factory/indulge.mp3", en: "To allow yourself to enjoy the pleasure of something without limitation", ko: "탐닉하다, 빠져 있다", ex: "The children wanted to {{indulge}} in chocolate and candy the moment they arrived.", ex_ko: "아이들은 도착하자마자 초콜릿과 사탕에 {{탐닉}}하고 싶어 했어요.", pic: "🍫" },
    { word: "peculiar",    pos: "adj.", audio: "assets/audio/charlie-and-the-chocolate-factory/peculiar.mp3", en: "Strange or odd in a way that is interesting or memorable", ko: "특이한, 괴상한", ex: "The {{peculiar}} candy room had rivers of chocolate flowing down the walls.", ex_ko: "{{특이한}} 사탕 방에는 벽을 타고 흐르는 초콜릿 강이 있었어요.", pic: "🎭" },
    { word: "virtue",      pos: "n.", audio: "assets/audio/charlie-and-the-chocolate-factory/virtue.mp3", en: "Moral excellence; a quality of being morally good or righteous", ko: "미덕, 덕성", ex: "Charlie's {{virtue}} and kindness eventually led to his reward.", ex_ko: "찰리의 {{미덕}}과 친절함이 결국 보상으로 이어졌어요.", pic: "👼" },
    { word: "wretched",    pos: "adj.", audio: "assets/audio/charlie-and-the-chocolate-factory/wretched.mp3", en: "In a very unhappy or unfortunate situation; miserable", ko: "비참한, 처량한", ex: "Despite the {{wretched}} conditions of his life, Charlie remained hopeful.", ex_ko: "비참한 삶의 조건에도 불구하고 찰리는 희망을 잃지 않았어요.", pic: "😔" },
    { word: "ingenious",   pos: "adj.", audio: "assets/audio/charlie-and-the-chocolate-factory/ingenious.mp3", en: "Very clever, creative, or inventive", ko: "기발한, 천재적인", ex: "Willy Wonka's {{ingenious}} inventions amazed everyone who visited the factory.", ex_ko: "윌리 웡카의 {{기발한}} 발명품들이 방문객을 놀라게 했어요.", pic: "🧠" },
    { word: "devour",      pos: "v.", audio: "assets/audio/charlie-and-the-chocolate-factory/devour.mp3", en: "To eat food quickly and hungrily", ko: "탐욕스럽게 먹다", ex: "The greedy child tried to {{devour}} all the candy without sharing.", ex_ko: "탐욕쟁이 아이는 사탕을 모두 {{탐욕스럽게 먹으려}} 했어요.", pic: "😋" }
  ],

  // ── ①-2 문법 ─────────────────────────────
  grammar: {
    points: [
      { name: "Conditional — if + will", ko: "조건부 (if + will)",
        sent: "[[If]] Charlie [[finds]] a golden ticket, he [[will visit]] the factory.",
        why_ko: "조건문 If + 현재, will + 동사원형 = '만약 ~하면 ~할 거야'. if절에는 will을 쓰지 않는 게 내신 함정 포인트!",
      why: "Use \"if\" + simple present to talk about real possibilities, then \"will\" or another future form. This shows what will happen if the condition is true.",
        try: "{{If}} you {{find}} a golden ticket, {{you will}} experience something magical." },
      { name: "Passive voice — was / were + past participle", ko: "수동태",
        sent: "The factory [[was hidden]] behind walls, and the visitors [[were surprised]] by what they saw.",
        why_ko: "수동태 = be동사 + 과거분사. 과거면 was/were! The chocolate was made by Wonka = 초콜릿은 웡카에 의해 만들어졌다.",
      why: "Use be + past participle when the important thing is what happened, not who did it.",
        try: "The chocolate {{was made}} by Wonka, and the children {{were amazed}} by everything." },
      { name: "Adverbs of manner", ko: "양태 부사 (how)",
        sent: "Charlie walked [[slowly]] into the room, and Wonka spoke [[mysteriously]] about his plans.",
        why_ko: "양태 부사는 '어떻게' 했는지 말해요. 대부분 형용사 + ly: slow → slowly, excited → excitedly. 동사 뒤에 와요.",
      why: "Adverbs describe HOW an action is done. Most end in -ly. They usually go after the verb.",
        try: "The children ran {{excitedly}} into the room, and Charlie listened {{quietly}}." }
    ],
    find: "책에서 if 가 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences with if in the book.",
    exam: {
      choose: [
        {"q": "If Charlie (finds / will find) a golden ticket, he will visit the factory.", "a": "finds", why_ko: "조건을 나타내는 if절에서는 미래라도 현재형을 써요! will find가 아니라 finds." },
        {"q": "The factory (was hidden / hid) behind high walls.", "a": "was hidden", why_ko: "공장은 숨긴 게 아니라 '숨겨진' 거예요. 수동태 was hidden!" },
        {"q": "Wonka spoke (mysterious / mysteriously).", "a": "mysteriously", why_ko: "'어떻게' 말했는지 동사를 꾸밀 때는 부사예요. mysterious에 -ly를 붙인 mysteriously!" },
        {"q": "The children (was / were) amazed by the chocolate river.", "a": "were", why_ko: "The children은 복수예요. 그래서 was가 아니라 were!" },
        {"q": "Charlie waited (patient / patiently) for his turn.", "a": "patiently", why_ko: "'어떻게' 기다렸는지 꾸미는 말은 부사예요. patient가 아니라 patiently!" }
      ],
      fix: [
        {"q": "If Charlie [[will find]] a ticket, he will go to the factory.", "a": "finds", why_ko: "if절에는 will을 쓰지 않아요! will find를 현재형 finds로 고쳐요." },
        {"q": "The chocolate [[was make]] by Wonka.", "a": "was made", why_ko: "수동태는 be + 과거분사예요. make의 과거분사는 made, was made!" },
        {"q": "Augustus ate [[greedy]].", "a": "greedily", why_ko: "ate(먹었다)를 꾸미는 말이니 부사여야 해요. greedy에 -ly를 붙여 greedily!" }
      ],
      write: [
        {"ko": "그 공장은 높은 벽 뒤에 숨겨져 있었다.", "cond": "was hidden, behind", "a": "The factory was hidden behind high walls.", why_ko: "'숨겨져 있었다'는 수동태 was hidden이에요. '~뒤에'는 behind!" },
        {"ko": "찰리가 황금 티켓을 찾으면, 그는 공장에 갈 것이다.", "cond": "if, find, will", "a": "If Charlie finds a golden ticket, he will go to the factory.", why_ko: "If + 현재형, 주어 + will + 동사원형! If Charlie finds ~, he will go ~." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────
  comprehension: [
    { ref: "ch. 1",      skill: "사실찾기",   q: "What makes Charlie's life difficult at the beginning of the story?",
      frame: "Charlie's life is difficult because {{his family is very poor and lives in a tiny house with his parents and four grandparents}}." },
    { ref: "ch. 2~3",    skill: "사실찾기",   q: "How does Willy Wonka announce his golden ticket contest?",
      frame: "Willy Wonka {{hides five golden tickets inside chocolate bars}}." },
    { ref: "ch. 4~5",    skill: "어휘",       q: "Why is finding the golden ticket so important to Charlie?",
      frame: "The golden ticket {{gives Charlie a chance to visit the magical factory}}." },
    { ref: "ch. 6~8",    skill: "추론·예측",  q: "What can you tell about the other children's character from how they behave?",
      frame: "The other children {{give in to temptation and break the rules whenever they can}}." },
    { ref: "ch. 9~11",   skill: "사실찾기",   q: "What happens to each child who breaks the rules?",
      frame: "Augustus {{falls in the chocolate river}}, Veruca {{is thrown down a garbage chute}}, Violet {{turns into a blueberry}}, and Mike {{is shrunk by a machine}}." },
    { ref: "ch. 12~15",  skill: "추론·예측",  q: "Why does Wonka allow each child to face these consequences?",
      frame: "Wonka {{is testing the children's character and showing them that choices have consequences}}." },
    { ref: "ch. 16~25",  skill: "주제·요점",  q: "What does Charlie receive at the end of the story, and why?",
      frame: "Charlie {{inherits the factory and his whole family moves in because he was the only child who showed goodness}}." }
  ],

  // ── ②-2 북퀴즈 10문제 ──────────────────────
  quiz: [
    { q: "Who does Charlie live with at the beginning of the story?",
      a: ["His aunt and uncle", "His parents and grandparents", "An orphanage", "Alone"], c: 1,
      why_ko: "엄마, 아빠, 그리고 네 명의 할아버지, 할머니예요. 모두 한 침대에서 살아요. 얼마나 좁은 집인지 상상해 보세요.",
      why: "Charlie lives with his parents and four grandparents — all in one tiny house. That detail shows you exactly how poor the family is." },
    { q: "How does Charlie get money to buy the chocolate bar with the golden ticket?",
      a: ["He works as a newspaper boy", "Grandpa Joe gives him money", "He finds money in the snow", "He wins a prize"], c: 2,
      why_ko: "눈 속에서 돈을 찾아요. 우연 같지만, 그게 찰리의 운을 바꾸는 순간이에요. 가난한 아이가 받을 수 있는 선물이라면 바로 이런 기적이죠.",
      why: "He finds money in the snow. It is luck, yes, but it is luck that comes to someone who deserves it. That is the story's message in one moment." },
    { q: "What are the names of the other four ticket winners?",
      a: ["Mike, Violet, Augustus, and Veruca", "Augustus, Veruca, Mike, and Joe", "Charlie, Mike, Violet, and Augustus", "Grandpa, Veruca, Mike, and Augustus"], c: 0,
      why_ko: "마이크, 바이올렛, 어거스터스, 베루카예요. 네 아이 모두 탐욕쟁이거나 제멋대로예요. 찰리와는 완전히 다른 아이들이죠.",
      why: "Mike Teavee, Violet Beauregarde, Augustus Gloop, and Veruca Salt. Four different children, four different faults, four different fates. Each one represents greed in a different form." },
    { q: "What happens to Augustus Gloop?",
      a: ["He is shrunk by a machine", "He turns into a blueberry", "He falls into the chocolate river and is sucked up a pipe", "He is thrown down a garbage chute"], c: 2,
      why_ko: "초콜릿 강에 빠져서 파이프로 빨려 올라가요. 굉장히 이상한 일이지만, 그건 그 아이가 한 일의 결과예요.",
      why: "He falls into the chocolate river and is sucked up a pipe. The punishment fits his greed — he wanted chocolate so badly." },
    { q: "Why does Veruca Salt go down the garbage chute?",
      a: ["She wants to leave the factory", "She tries to steal the secrets", "She wants a squirrel as a prize and the squirrels attack her", "She breaks the rules on purpose"], c: 2,
      why_ko: "다람쥐를 원해요. 당신 꺺라고 하면 자기 아빠가 줄 거라고 생각해요. 하지만 다람쥐들은 다르게 생각해요.",
      why: "She demands a squirrel. She thinks she can have anything, but the factory has its own rules. The squirrels judge her and find her bad." },
    { q: "What does Violet Beauregarde do that causes her fate?",
      a: ["She steals candy", "She chews gum against the rules and turns into a blueberry", "She speaks rudely to Wonka", "She tries to escape the factory"], c: 1,
      why_ko: "실험 중인 껌을 씹어요. 하지 말라고 했는데 말이에요. 결과는 끔찍해요. 규칙을 무시한 대가죠.",
      why: "She chews experimental gum against orders. Consequences matter. She becomes a giant blueberry. Wonka tried to stop her, but she would not listen." },
    { q: "What does Grandpa Joe do in the story?",
      a: ["He stays home because he is sick", "He goes with Charlie through the factory", "He teaches Charlie about magic", "He warns Charlie not to break rules"], c: 1,
      why_ko: "할아버지가 찰리와 함께 공장을 다녀요. 찰리의 할아버지예요. 이게 중요한 이유는 찰리가 혼자가 아니라는 뜻이기 때문이에요.",
      why: "Grandpa Joe accompanies Charlie. He is not just a character — he is proof that Charlie has family who loves him. That matters." },
    { q: "What does Wonka give to the child who shows the best character?",
      a: ["A lifetime supply of chocolate", "A large sum of money", "The entire factory and everything in it", "A seat on Wonka's council"], c: 2,
      why_ko: "공장 전체를 줘요! 겨우 초콜릿이 아니라 모든 거. 그리고 가족까지 같이 살 수 있어요. 착한 아이가 가장 큰 상을 받는 거죠.",
      why: "He gives Charlie the factory itself — not just money or chocolate, but the entire creation and everything inside it. His family moves in to live there." },
    { q: "How does Charlie show his goodness different from the other children?",
      a: ["He is more intelligent than them", "He does not give in to temptation, even when allowed to", "He is born with magic powers", "He is richer than the others"], c: 1,
      why_ko: "유혹을 못 이기지 않아요. 다른 아이들은 각자 유혹을 이기지 못해요. 찰리는 이겨요. 그것만으로도 충분해요.",
      why: "While the others cannot resist, Charlie can. That is everything. He is not smarter or stronger or richer — he is simply better." },
    { q: "What is this book really about?",
      a: ["How chocolate is made", "Why rich people are better than poor people",
          "Character and goodness matter more than greed or desire", "Why children should obey adults"], c: 2,
      why_ko: "착함이 탐욕보다 더 크다는 거. 가난한 찰리가 모든 걸 받는 이유가 바로 그것. 가진 게 없어도 좋은 마음이 가장 큰 재산이라는 거.",
      why: "Goodness wins. Not luck, not wealth, not cleverness — just being good. The book believes this completely. That is its whole message." }
  ],

  // ── ③ 요약 지도 ───────────────────────────────
  summaryMap: {
    setting: { place: "{{a small town and Willy Wonka's chocolate factory}}", time: "{{an ordinary day that becomes extraordinary}}" },
    swbst: [
      { k: "Somebody", v: "{{Charlie, a poor but kind boy living with his large family}}" },
      { k: "Wanted",   v: "{{to find a golden ticket and visit the magical chocolate factory}}" },
      { k: "But",      v: "{{four other children also found tickets, and they were greedy and selfish}}" },
      { k: "So",       v: "{{Charlie found money in the snow and bought a ticket through luck, not greed}}" },
      { k: "Then",     v: "{{Charlie was the only child who showed goodness, so Wonka gave him the factory}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Charlie is poor and dreams about chocolate and the mysterious factory.",
        frame: "Charlie's {{birthday present}} is {{a single chocolate bar}}, which is a rare luxury." },
      { label: "1",
        given: "",
        frame: "Willy Wonka announces his golden ticket contest by {{hiding five tickets inside chocolate bars}}." },
      { label: "2",
        given: "Other children quickly find their golden tickets.",
        frame: "Charlie {{finds money in the snow}} and {{buys a chocolate bar that contains the fifth ticket}}." },
      { label: "3",
        given: "",
        frame: "The five ticket winners and Grandpa Joe {{enter the factory and see amazing, impossible rooms}}." },
      { label: "4",
        given: "Each child breaks a rule and gives in to temptation.",
        frame: "{{Augustus falls into the chocolate river, Veruca is thrown down a garbage chute, Violet turns into a blueberry, and Mike is shrunk.}}" },
      { label: "End",
        given: "Charlie is the last child remaining in the factory.",
        frame: "Wonka {{gives the entire factory to Charlie}} because {{Charlie showed goodness when the other children showed only greed}}." }
    ]
  },

  // ── ④ 마인드맵 ───────────────────────────────
  mindMap: {
    center: "Charlie and the Chocolate Factory",
    branches: [
      { label: "Charlie", ask: "What do we see Charlie DO? What does he THINK and FEEL?",
        deeper: "Which matters more in this story — what Charlie does or what Charlie thinks?" },
      { label: "The Factory", ask: "What are three things Charlie sees that seem impossible?",
        deeper: "What does the factory say about the person who built it?" },
      { label: "The Other Children", ask: "Give each child a one-word label for their worst trait.",
        deeper: "Does each child's problem come from outside, or from inside themselves?" },
      { label: "The Test", ask: "Is Wonka punishing the bad children, or teaching them?",
        deeper: "If he wanted to teach them, is this the best way?" },
      { label: "Me", ask: "When have you wanted something badly but had to wait?",
        deeper: "How did waiting change what you wanted, or who you were?" },
      { label: "The World", ask: "Are good people rewarded in real life the way Charlie is here?",
        deeper: "What does this book want us to believe about goodness?" }
    ]
  },

  // ── ⑤ IB 탐구 ───────────────────────────
  ib: {
    keyConcept: "Character",
    relatedConcepts: ["Choice", "Consequence", "Creativity", "Greed"],
    globalContext: "Identities and relationships — what makes a person good, and whether goodness is rewarded (좋은 사람은 누구인가, 착함은 보상받는가)",
    statement: "A person's character is shown through their choices, not their wealth or luck. Small acts of kindness and self-control matter more than talent.",
    factual: [
      "Who are the five children who find golden tickets?",
      "What happens to each of the four children who break the rules?",
      "Who inherits the factory at the end?"
    ],
    conceptual: [
      "Why does Wonka make the children face consequences rather than simply lecturing them?",
      "How does poverty make Charlie different from the other children?",
      "Why does Wonka give the factory to a child instead of an adult?"
    ],
    debatable: [
      "Is Wonka cruel to the children, or is he fair?",
      "Does Charlie deserve the factory more than a smarter or richer child?",
      "Is it enough to be good, or do you also need to be lucky?"
    ],
    learnerProfile: ["Thinker", "Principled", "Caring", "Reflective", "Communicator", "Open-minded"]
  },

  // ── ⑥ 논술형 ───────────────────────────────
  essay: {
    prompt: "Charlie inherited the factory because he was kind and obedient, not because he was the richest or most clever. Is this the right reason to give someone such a great reward? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣고 챕터를 밝힐 것 · Use one scene from the book and name the chapter",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",              ask: "What is your writing about?",
        eg: "Goodness Is More Valuable Than Wealth", lines: 1 },
      { part: "P — Point",          ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Charlie deserved the factory because he showed goodness and self-control.", lines: 2 },
      { part: "E — Evidence",       ask: "What happened in the book? Write the scene and the chapter.",
        eg: "In ch. 2, Charlie found money in the snow and bought chocolate without greed.", lines: 3 },
      { part: "E — Explanation",    ask: "Why does that scene prove your point?",
        eg: "This shows that goodness is rare and valuable, more important than cleverness or money.", lines: 2 },
      { part: "C — Counter",        ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a rich or smart person might run the factory better, but Wonka believed character matters most.", lines: 2 },
      { part: "L — Link",           ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe the best reward goes to the best person, not the richest one.", lines: 2 }
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
      en: "Students trace how character determines outcome in the story, then argue whether goodness deserves the greatest reward.",
      ko: "선택과 결말의 연결을 따라가며, 착함이 최고의 상을 받아야 하는지 판단해 쓴다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of someone you know who is very kind. What do they get because of that? Good things, or hard things, or both?",
        do: "책을 펴기 전에 한다. 아이 경험에서 먼저 질문을 꺼내야 찰리의 이야기가 읽힌다.",
        exp: "My teacher is kind and people trust her. / My friend is kind but sometimes people take advantage.",
        stuck: "선생님이 먼저 한 문장 한다. 어른의 솔직한 대답이 아이를 열게 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개를 다 묻지 말고 일곱 개만 고른다.",
        exp: "빈곤 → poverty / 경멸 → contempt / 기발한 → ingenious",
        stuck: "예문을 읽어 준다. \"Charlie's family lived in {{poverty}}.\" 문맥을 주면 대개 나온다." },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it at home tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다.",
        stuck: "폰이 없는 아이는 교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 5분 재고 끊는다.",
        stuck: "\"Read the whole sentence first, then think of the word.\"" },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Why is Charlie unhappy...' becomes 'Charlie is unhappy because...'",
        do: "이 한 마디가 서술형의 전부다. 매 시간 반복한다.",
        exp: "Charlie is unhappy because his family is very poor.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다. 못 짚으면 답이 맞아도 넘어가지 않는다.",
        stuck: "챕터를 알려 준다. \"It's in chapter 1. Find the family's house.\"" },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. What is different about them?",
        do: "규칙을 먼저 말하지 않는다. 빨간 부분만 읽히고 아이가 먼저 알아채게 한다.",
        exp: "The word \"if\" starts a choice, and then \"will\" shows what happens.",
        stuck: "두 문장으로 쪼개 준다. \"Charlie found the ticket. He visits the factory.\" → \"Now join them with if.\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다. 바로 써 보게 한다.",
        exp: "If you find the ticket, you will see the factory.",
        stuck: "\"What comes first, the condition or the result?\" 순서로 다시 묻는다." },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find two sentences with if. Two is enough.",
        do: "책을 다시 펴게 하는 것이 목적이다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look at the scenes where Charlie is thinking about the factory.\" 범위를 좁혀 준다." },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how your school test asks it. Write only the answer on the right.",
        do: "답만 쓰게 한다. 문장을 통째로 옮겨 적는 아이를 시작 전에 막는다.",
        stuck: "1번을 같이 푼다. \"find or finds? This is about possibility, so...\"" },

      { stage: "Exam Grammar", min: "",
        say: "Section three is different. Korean on the left, and you must use the words in the grey box.",
        do: "조건 단어를 빠뜨리면 내신에서 0점이라고 분명히 말해 준다.",
        exp: "The factory was hidden behind high walls.",
        stuck: "한국어를 영어 어순으로 다시 읽어 준다. \"공장은 / 숨겨져 있었다 / 높은 벽 뒤에.\"" },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 리듬처럼 손가락으로 짚으며 외우게 한다.",
        exp: "Somebody: Charlie / Wanted: the ticket / But: other children also wanted it",
        stuck: "\"Who is the story following? Who do we care about most?\" 주인공을 다시 잡아 준다." },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "62~70분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다. 여기서 시간을 쓰면 정작 중요한 → 칸을 못 한다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't write what happened — write what it means.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "It shows that a person's heart matters more than their bank account.",
        stuck: "\"You told me what happened. Now tell me: so what? Why does the writer want us to know this?\"" },

      { stage: "Mind Map", min: "",
        say: "'Me' and 'The World' — there is no right answer. But there is a weak answer and a strong one.",
        do: "이 두 가지는 발표시킨다. 다른 아이의 답을 들으면 자기 답이 바뀐다.",
        stuck: "선생님이 먼저 자기 이야기를 한 문장 한다. 어른이 먼저 말하면 아이가 따라 말한다." },

      { stage: "IB Inquiry", min: "70~78분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you can answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\" 라고 되묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "Steps 1 and 2, we do out loud. Step 3, you write. Pick a side — you cannot sit in the middle.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think Wonka is fair because he tests character, not luck.",
        stuck: "손을 들게 한다. \"Fair or cruel?\" 몸으로 편을 정하면 글이 나온다." },

      { stage: "Writing", min: "78~95분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다. 내신 서·논술형은 조건 누락이 감점 1순위다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means a scene and a chapter number. 'Charlie was good' is not evidence. 'In ch. 2, Charlie found money' is.",
        do: "근거와 감상을 구분해 준다. 칠판에 두 문장을 나란히 써 둔다.",
        exp: "In ch. 2, Charlie found money in the snow.",
        stuck: "\"Which chapter? Find it now.\" 못 찾으면 근거를 바꾸게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a rich person would run the factory better, but Wonka chose goodness.",
        stuck: "\"Some people say..., but...\" 틀만 있으면 채운다." },

      { stage: "Wrap-up", min: "95~100분",
        say: "One person, read only your Counter sentence. Just that one.",
        do: "반박 문장만 발표시킨다. 세 명이면 충분하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "If you could inherit something valuable tomorrow, what would matter most — being rich, being smart, or being good?", ko: "내일 귀한 것을 물려받는다면, 무엇이 가장 중요할까 — 부자인 것, 똑똑한 것, 착한 것?" },
        { en: "Can a poor person ever beat a rich person fairly? How?", ko: "가난한 사람이 부자를 공정하게 이길 수 있을까?" },
        { en: "Is it possible to have fun and be good at the same time? Why or why not?", ko: "즐겁고 동시에 착할 수 있을까?" }
      ],
      during: [
        { en: "Why does Wonka allow the children to eat and break things? Is he being kind or mean?", ko: "웡카는 왜 아이들이 먹고 물건을 부수게 놔두나?" },
        { en: "When Charlie sees amazing things, he does not grab and eat like the others. What does that tell us?", ko: "찰리는 신기한 것을 봐도 독점하지 않는다. 뭘 말해주나?" },
        { en: "Each child loses in a different way. Does each one deserve it?", ko: "각 아이가 다른 방식으로 진다. 각각 맞을까?" }
      ],
      after: [
        { en: "Charlie inherited the factory. Do you think he will run it the same way Wonka did?", ko: "찰리가 공장을 물려받았다. 그는 웡카처럼 할까?" },
        { en: "What is the difference between a poor person who is good and a rich person who is good?", ko: "착한 빈사람과 착한 부자는 뭐가 다를까?" },
        { en: "Is this book real, or is it a dream? Why does that question matter?", ko: "이 책은 실제일까, 꿈일까? 왜 그 질문이 중요할까?" }
      ]
    },
    notes: [
      { sheet: "Vocabulary",     point: "예문을 소리 내어 읽히고 넘어간다.", miss: "뜻만 외우고 예문을 건너뛴다." },
      { sheet: "Comprehension",  point: "질문을 문장으로 바꾸기(Restate)부터 시킨다.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",      point: "빨간 부분만 가지고 이야기하고 바로 쓰게 한다.", miss: "규칙을 먼저 설명하려 한다." },
      { sheet: "Exam Grammar", point: "답만 이다. 전체 문장은 안 된다.", miss: "괄호를 통째로 옮겨 적는다." },
      { sheet: "Summary Map",    point: "SWBST 를 먼저, 지도는 그 다음.", miss: "빈칸을 책에서 베껴 온다." },
      { sheet: "Mind Map",       point: "아래 → 칸에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",     point: "1·2단은 말로, 3단만 글로.", miss: "Debatable 에 'both could be right' 라고 쓴다." },
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
window.BOOK.readAloud = {"scene": "찰리가 황금 티켓을 찾는 장면", "text": "Charlie Bucket lived in [[hardship|poverty]] with his parents and four grandparents. Every day, he walked past Willy Wonka's [[strange|peculiar]] chocolate factory. When Wonka hid five golden [[passes|tickets]], the whole world went wild. Augustus Gloop, who loved to [[gobble|devour]] food, found one. Charlie was cold and [[miserable|wretched]]. But one snowy day, he found money on the street and bought some chocolate. Inside was the last golden ticket! In the end, Wonka gave him the factory because of his [[goodness|virtue]]."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Who We Are",
 "themeKo": "우리는 누구인가",
 "profile": [
  {
   "attr": "Principled",
   "how": "Compare Charlie's choices with the other four children's."
  },
  {
   "attr": "Balanced",
   "how": "Talk about wanting things and knowing when enough is enough."
  }
 ],
 "hook": [
  "Hide one 'golden ticket' under a chair: how did it feel to find it, or not to?",
  "Show five empty seats: five children go in, one comes out the winner. What decides it?"
 ],
 "connections": [
  {
   "subject": "Science",
   "idea": "Where chocolate comes from: cacao bean to bar; melting and cooling."
  },
  {
   "subject": "Design",
   "idea": "Invent a new sweet: name, package, and what it does."
  },
  {
   "subject": "Ethics",
   "idea": "Are the punishments fair? Who is responsible, the children or the parents?"
  }
 ],
 "speaking": [
  "Debate: did the four children deserve what happened to them?",
  "Sell your invented sweet in a 30-second pitch."
 ],
 "writing": [
  "Write a newspaper report on the day the last ticket was found.",
  "Write a character sketch: which child are you most and least like?"
 ]
};
