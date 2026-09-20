// 리딩브레인 원서프로그램 — 책 한 권 데이터
// 워크시트 4종이 모두 이 파일 하나를 읽는다. 책이 바뀌면 이 파일만 새로 만든다.
// {{}} 는 학생이 채우는 밑줄 칸이다. 인쇄하면 밑줄, 화면에서는 입력칸이 된다.

window.BOOK = {
  bookNo: "M3069",
  slug: "flat-stanley",
  title: "Flat Stanley: His Original Adventure!",
  author: "Jeff Brown",
  series: "Flat Stanley",
  publisher: "HarperCollins",
  level: { ar: "4.0", lexile: "750L", rb: "정독 2단계" },
  awards: [],
  defSource: "Wiktionary (CC BY-SA)",
  cover: "assets/covers/flat-stanley.jpg",

  shadowing: {
    query: "\"Flat Stanley: His Original Adventure!\" read aloud",
    searchUrl: "https://youtu.be/h8yY-lpg7Zk",
    qr: "assets/qr/flat-stanley.png",
    videos: [
      { url: "https://youtu.be/h8yY-lpg7Zk", title: "Flat Stanley - His Original Adventure - Kids Read Aloud Audiobook - NO ADS", channel: "Mr. Klein's Story Time", views: "41,031", length: "" },
      { url: "https://youtu.be/9BOLxBKy4MM", title: "Flat Stanley: His Original Adventure - Chapter 1:The Big Bulletin Board", channel: "Gabbi Benton", views: "8,004", length: "" },
      { url: "https://youtu.be/W2LZNWjRhEc", title: "Flat Stanley His Original Adventure", channel: "IHS Audio", views: "20,780", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "flat",       pos: "adj.", audio: "assets/audio/flat-stanley/flat.mp3", en: "Having a level surface with little or no depth; not thick", ko: "평평한", ex: "Stanley became {{flat}} when a bulletin board fell on him at night.", ex_ko: "밤에 게시판이 떨어져서 스탠리가 평평해졌어요.", pic: "📋" },
    { word: "envelope",   pos: "n.", audio: "assets/audio/flat-stanley/envelope.mp3", en: "A paper covering or container for holding a letter or document", ko: "봉투, 편지봉투", ex: "Stanley was mailed to California in an {{envelope}} to visit his friend.", ex_ko: "스탠리는 친구를 만나러 봉투에 들어가 캘리포니아로 우편으로 갔어요.", pic: "✉️" },
    { word: "squeeze",    pos: "v.", audio: "assets/audio/flat-stanley/squeeze.mp3", en: "To press or force something into a tight space", ko: "쥐어짜다, 눌러 넣다", ex: "Stanley could {{squeeze}} through a narrow grate to find his mother's ring.", ex_ko: "스탠리는 엄마의 반지를 찾기 위해 좁은 격자무늬 구멍을 통해 쥐어짜고 들어갔어요.", pic: "🤏" },
    { word: "kite",       pos: "n.", audio: "assets/audio/flat-stanley/kite.mp3", en: "A toy that flies in the wind on a long string", ko: "연, 연날리기", ex: "Arthur flew Stanley like a {{kite}}, but the string tangled.", ex_ko: "아서는 스탠리를 연처럼 날렸는데 줄이 엉켰어요.", pic: "🪁" },
    { word: "frame",      pos: "n.", audio: "assets/audio/flat-stanley/frame.mp3", en: "A border around a picture; the structure holding a painting in place", ko: "액자, 틀", ex: "At the museum, Stanley posed inside a picture {{frame}} to catch art thieves.", ex_ko: "박물관에서 스탠리는 그림 액자 안에 들어가 도둑을 잡았어요.", pic: "🖼️" },
    { word: "shepherdess",pos: "n.", audio: "assets/audio/flat-stanley/shepherdess.mp3", en: "A girl or woman who tends sheep", ko: "양치기 여인", ex: "Stanley dressed as a {{shepherdess}} and stood still in the museum painting.", ex_ko: "스탠리는 양치기 여인으로 변장해서 박물관의 그림 속에 서 있었어요.", pic: "👩‍🌾" },
    { word: "jealous",    pos: "adj.", audio: "assets/audio/flat-stanley/jealous.mp3", en: "Unhappy or angry because someone else has something you want", ko: "질투하는", ex: "Arthur became {{jealous}} when everyone treated Stanley as a hero.", ex_ko: "스탠리가 영웅처럼 대접받자 아서는 질투했어요.", pic: "😠" },
    { word: "clever",     pos: "adj.", audio: "assets/audio/flat-stanley/clever.mp3", en: "Smart and quick-thinking", ko: "영리한, 똑똑한", ex: "Stanley came up with a {{clever}} plan to catch the museum thieves.", ex_ko: "스탠리는 박물관 도둑을 잡기 위해 영리한 계획을 세웠어요.", pic: "🧠" },
    { word: "adventure",  pos: "n.", audio: "assets/audio/flat-stanley/adventure.mp3", en: "An exciting or unusual experience", ko: "모험", ex: "Stanley had many {{adventure}}s because of his flat shape.", ex_ko: "스탠리는 평평한 모양 때문에 많은 모험을 경험했어요.", pic: "🗺️" },
    { word: "grateful",   pos: "adj.", audio: "assets/audio/flat-stanley/grateful.mp3", en: "Feeling or showing thanks", ko: "감사하는", ex: "Stanley's family was {{grateful}} when Arthur pumped him back to normal.", ex_ko: "아서가 스탠리를 다시 부풀렸을 때 그의 가족은 감사했어요.", pic: "🙏" },
    { word: "pump",       pos: "n.", audio: "assets/audio/flat-stanley/pump.mp3", en: "A device that pushes air or liquid", ko: "펌프", ex: "Arthur used a bicycle {{pump}} to blow Stanley back to normal thickness.", ex_ko: "아서는 자전거 펌프로 스탠리를 다시 부풀렸어요.", pic: "🚲" },
    { word: "normal",     pos: "adj.", audio: "assets/audio/flat-stanley/normal.mp3", en: "Usual or ordinary; the way things typically are", ko: "정상적인, 평범한", ex: "By the end of the story, Stanley returned to {{normal}} and was no longer flat.", ex_ko: "이야기 끝에 스탠리는 정상이 되어 더 이상 평평하지 않게 되었어요.", pic: "👤" }
  ],

  // ── ①-2 문법 (영영문법 1장 + 입시문법 1장) ─────────────
  grammar: {
    points: [
      { name: "Past Simple", ko: "과거시제",
        sent: "A bulletin board [[fell]] on Stanley, and he [[became]] flat.",
        why_ko: "과거시제: 규칙은 -ed, 불규칙은 모양 변신! fall → fell, become → became, fly → flew. 불규칙은 꼭 따로 외워요.",
      why: "Use past simple to tell what happened. Most verbs add -ed, but some are irregular: fall → fell, become → became, get → got.",
        try: "Arthur {{flew}} Stanley as a kite, and the string {{tangled}}." },
      { name: "Passive voice", ko: "수동태",
        sent: "The sneak thieves [[were caught]] by Stanley, and he [[was called]] a hero.",
        why_ko: "수동태 = be동사 + 과거분사, '~되었다'. 주인공이 '당한' 일을 말할 때 써요. The thieves were caught = 도둑들이 잡혔다.",
      why: "Use be + past participle when the important thing is what happened, not who did it.",
        try: "Stanley {{was mailed}} to California, and he {{was flown}} like a kite." },
      { name: "could + verb", ko: "조동사 could",
        sent: "Because Stanley was flat, he [[could fit]] through small spaces and [[could go]] places others could not.",
        why_ko: "could + 동사원형 = '~할 수 있었다'. 과거의 능력을 말해요. could squeeze, could travel.",
      why: "Use could + verb to show ability in the past, or what was possible.",
        try: "Stanley {{could squeeze}} under doors, and he {{could travel}} in an envelope." }
    ],
    find: "책에서 could가 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences with \"could\".",
    exam: {
      choose: [
        {"q": "Last night a bulletin board (fell / falls) on Stanley.", "a": "fell", why_ko: "Last night는 과거예요. fall은 불규칙이라 과거형이 fell!" },
        {"q": "Stanley (was became / became) flat.", "a": "became", why_ko: "become은 일반동사라서 be동사와 함께 쓰지 않아요. was became이 아니라 became!" },
        {"q": "Stanley (could fit / could fits) in an envelope.", "a": "could fit", why_ko: "could 뒤에는 동사원형! fits가 아니라 fit이에요." },
        {"q": "The thieves (were caught / caught) by Stanley.", "a": "were caught", why_ko: "도둑들은 잡은 게 아니라 '잡힌' 쪽이에요. 수동태 were caught!" },
        {"q": "Arthur (flew / flied) Stanley like a kite.", "a": "flew", why_ko: "fly는 불규칙 동사예요. 과거형은 flied가 아니라 flew!" }
      ],
      fix: [
        {"q": "Stanley [[was become]] flat.", "a": "became", why_ko: "was와 become을 같이 쓰면 동사가 두 개예요. 과거형 became 하나만 써요!" },
        {"q": "He [[could goes]] down the grate.", "a": "could go", why_ko: "could 뒤에는 동사원형이에요. goes가 아니라 go!" },
        {"q": "The thieves [[were catch]] at night.", "a": "were caught", why_ko: "수동태는 be + 과거분사예요. catch의 과거분사는 caught, were caught!" }
      ],
      write: [
        {"ko": "게시판이 스탠리 위에 떨어졌다.", "cond": "fall, on", "a": "The bulletin board fell on Stanley.", why_ko: "fall의 과거형 fell! '~위에'는 on이에요. The bulletin board fell on Stanley." },
        {"ko": "그는 봉투 안에 들어갈 수 있었다.", "cond": "could, fit, envelope", "a": "He could fit in an envelope.", why_ko: "'~할 수 있었다'는 could + 동사원형이에요. He could fit in an envelope." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "ch. 1",    skill: "사실찾기",   q: "How did Stanley become flat?",
      frame: "A {{bulletin board fell out the window}} and {{landed on Stanley while he slept}}." },
    { ref: "ch. 1~2",  skill: "사실찾기",   q: "Who is Stanley's brother, and how does he react to Stanley being flat?",
      frame: "Stanley's brother is named {{Arthur}}, and he {{feels jealous when Stanley becomes special and famous}}." },
    { ref: "ch. 3",    skill: "어휘",       q: "What does Stanley do to help his mother when he is flat?",
      frame: "Stanley {{squeezes through a grate}} to {{retrieve his mother's lost ring}}." },
    { ref: "ch. 4",    skill: "사실찾기",   q: "How does Stanley travel to California, and why?",
      frame: "Stanley is {{mailed in an envelope}} to {{California to visit his friend}}." },
    { ref: "ch. 5~6",  skill: "추론·예측",  q: "How does Stanley catch the art thieves at the Famous Museum?",
      frame: "Stanley {{dresses as a shepherdess}} and {{poses inside a picture frame on the wall}}, then {{catches the thieves at night}}." },
    { ref: "ch. 6",    skill: "사실찾기",   q: "What happens when Arthur flies Stanley like a kite?",
      frame: "The kite {{flies high in the sky}}, but {{the string becomes tangled}} and {{Arthur feels jealous}}." },
    { ref: "ch. 7",    skill: "주제·요점",  q: "How does Stanley become normal again?",
      frame: "Arthur {{uses a bicycle pump}} to {{blow Stanley back to his normal shape}}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "What falls on Stanley during the night?",
      a: ["A door", "A bulletin board", "A bookcase", "A picture frame"], c: 1,
      why_ko: "게시판이에요! 창문 밖으로 떨어져서 자던 스탠리 위에 떨어져요. 이것이 스탠리를 평평하게 만드는 출발점이에요.",
      why: "A bulletin board falls through the window and lands on Stanley. This is how he becomes flat." },
    { q: "Who is Stanley's brother?",
      a: ["Arthur", "Henry", "George", "William"], c: 0,
      why_ko: "아서예요. 나중에 아서는 스탠리를 연처럼 날리려고 하고, 스탠리가 유명해지자 질투하게 돼요.",
      why: "Arthur is Stanley's brother. He flies Stanley as a kite and becomes jealous when Stanley becomes famous." },
    { q: "Why does Stanley mail himself to California?",
      a: ["To escape his problem", "To escape his brother", "To visit a friend", "To attend school"], c: 2,
      why_ko: "친구를 만나려고 봉투에 들어가 우편으로 간 거예요. 평평한 몸이 있어서 할 수 있는 모험이죠.",
      why: "Stanley wants to visit his friend, and being flat makes it possible to mail himself in an envelope." },
    { q: "What does Stanley do to help his mother?",
      a: ["He cleans the house", "He goes shopping", "He squeezes through a grate to get her ring", "He cooks dinner"], c: 2,
      why_ko: "엄마의 반지가 격자무늬 구멍으로 떨어졌는데, 스탠리가 평평해서 그 안으로 쥐어짜고 들어갈 수 있었어요.",
      why: "Stanley's mother drops her ring down a grate. Stanley squeezes through because he is flat." },
    { q: "How does Stanley catch the art thieves?",
      a: ["He hides behind a painting", "He dresses as a shepherdess and poses in a picture frame", "He calls the police first", "He fights them"], c: 1,
      why_ko: "양치기 여인으로 변장해서 박물관의 그림 액자 안에 서 있다가 밤에 도둑을 잡아요. 가장 창의적인 장면이에요.",
      why: "Stanley dresses as a shepherdess and stands inside a picture frame on the wall. When the thieves come at night, he catches them." },
    { q: "What happens when Arthur flies Stanley as a kite?",
      a: ["Stanley flies away forever", "The kite string breaks", "The string tangles and Arthur becomes jealous", "Nothing happens"], c: 2,
      why_ko: "스탠리가 높이 날아가고, 줄이 엉켜요. 아서는 스탠리가 유명해지는 걸 보고 질투하게 돼요.",
      why: "Stanley flies high in the air like a kite. The string tangles, and Arthur becomes jealous that everyone loves Stanley." },
    { q: "Why does Arthur want to pump Stanley back up?",
      a: ["He is being mean", "He wants to help his brother become normal again", "He is tired of Stanley being flat", "He wants to be famous"], c: 1,
      why_ko: "결국 아서는 동생을 도와주고 싶어해요. 자전거 펌프로 스탠리를 다시 부풀려서 정상이 되게 해줘요.",
      why: "Even though Arthur was jealous, he cares about Stanley and wants him to be normal again." },
    { q: "How does Stanley become normal?",
      a: ["He eats a lot", "The bulletin board falls off him", "Arthur pumps him up with a bicycle pump", "He waits a long time"], c: 2,
      why_ko: "아서가 자전거 펌프를 써서 스탠리를 부풀려요. 이건 재미있고 창의적인 해결책이에요.",
      why: "Arthur uses a bicycle pump to blow air into Stanley until he returns to normal thickness." },
    { q: "Why do people treat Stanley like a hero?",
      a: ["He is smart in school", "He catches dangerous art thieves", "He helps everyone get to California", "He becomes a kite champion"], c: 1,
      why_ko: "스탠리가 평평한 몸을 써서 박물관 도둑을 잡기 때문이에요. 자신의 약점을 강점으로 바꾼 거죠.",
      why: "Stanley catches the art thieves because his flat shape lets him do things no one else can do." },
    { q: "What is the main lesson of Flat Stanley?",
      a: ["Being flat is always fun", "Being different can be a strength", "Bulletin boards are dangerous", "Families always get along"], c: 1,
      why_ko: "주제 문제예요. 처음엔 재앙처럼 보였던 평평함이 스탠리의 강점이 되었어요. 다름이 꼭 나쁜 게 아니라는 거예요.",
      why: "What seems like a disaster at first becomes Stanley's greatest strength. Being different can be powerful." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{a city and California}}", time: "{{modern times}}" },
    swbst: [
      { k: "Somebody", v: "{{Stanley Lambchop, a flat boy}}" },
      { k: "Wanted",   v: "{{to become normal and find his place in the world}}" },
      { k: "But",      v: "{{his flatness gives him unique abilities that others cannot do}}" },
      { k: "So",       v: "{{he uses his flat shape to travel, help his family, and catch criminals}}" },
      { k: "Then",     v: "{{his brother pumps him back up, and Stanley learns that being different was actually special}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "A bulletin board falls and lands on Stanley.",
        frame: "Stanley {{wakes up flat}}, and his {{family is shocked}}." },
      { label: "1",
        given: "Stanley discovers he can squeeze through narrow spaces.",
        frame: "He {{helps his mother by retrieving her ring}} from {{a grate he can squeeze through}}." },
      { label: "2",
        given: "Stanley is mailed to California to visit a friend.",
        frame: "He {{travels in an envelope}} and {{has adventures there}}." },
      { label: "3",
        given: "Stanley poses inside a picture frame at the Famous Museum.",
        frame: "He {{catches art thieves at night}} and {{becomes a hero}}." },
      { label: "End",
        given: "Arthur flies Stanley like a kite, but the string tangles.",
        frame: "Arthur {{pumps Stanley back up}} with {{a bicycle pump}}, and Stanley {{returns to normal}} though {{he will remember being special}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Flat Stanley",
    branches: [
      { label: "Problem to Gift", ask: "At first Stanley hates being flat. Does he wish he could stay that way by the end?",
        deeper: "What changed his mind?" },
      { label: "Family", ask: "Arthur starts jealous. Does he stay that way, or does he change?",
        deeper: "What makes him help Stanley in the end?" },
      { label: "Abilities", ask: "What can Stanley do because he is flat that normal kids cannot do?",
        deeper: "Which ability do you think is the most useful?" },
      { label: "Choices", ask: "Stanley could have stayed flat, but he doesn't. Why not?",
        deeper: "Would you make the same choice?" },
      { label: "Me", ask: "Do you have something about yourself you think is a problem?",
        deeper: "Could it ever become a strength?" },
      { label: "The World", ask: "Why do we often see people's differences as problems instead of powers?",
        deeper: "How could that change?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Perspective", "Consequence", "Identity"],
    globalContext: "Personal and cultural expression — how obstacles shape who we become",
    statement: "When something we think is bad happens, it can teach us to see ourselves differently.",
    factual: [
      "What makes Stanley flat?",
      "What can Stanley do because he is flat?",
      "How does Stanley return to normal?"
    ],
    conceptual: [
      "Why does Stanley's flatness become an advantage instead of staying a disaster?",
      "How does the author show that Stanley's perspective on his problem changes?",
      "Why does Arthur become jealous, and what does that teach him?"
    ],
    debatable: [
      "Should Stanley have stayed flat if it meant he could keep being special and doing amazing things?",
      "Is being normal better than being different and useful?",
      "Does having an unusual talent give you a responsibility to use it?"
    ],
    learnerProfile: ["Thinker", "Open-minded", "Reflective"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Stanley's flat shape seemed like a disaster, but it turned into an opportunity. Was being flat good or bad for Stanley? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣고 챕터를 밝힐 것 · Use one scene from the book and name the chapter",
      "because 또는 This is because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Being Flat Was a Gift for Stanley", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think being flat was good for Stanley because it made him special and brave.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene and the chapter.",
        eg: "In ch. 5-6, Stanley caught the museum thieves by posing in a picture frame.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that his flat shape gave him the power to do something important.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say being flat was terrible, but Stanley helped catch real criminals.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe Stanley's flatness was a gift, not a curse.", lines: 2 }
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
      en: "Students retell the story and explore how a problem can become an opportunity.",
      ko: "줄거리를 말하고, 문제가 기회가 되는 과정을 탐구한다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Think of something unusual about yourself — real or silly. One sentence. Would you want to change it?",
        do: "책을 펴기 전에 한다. 스탠리의 처지를 먼저 아이 경험에서 꺼내야 한다.",
        exp: "I am very tall and sometimes I feel different, but maybe it is good.",
        stuck: "선생님이 먼저 한 문장 한다. 어른이 먼저 말하면 아이가 따라 말한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 확인만 3분. 열두 개를 다 묻지 말고 여섯 개만.",
        exp: "평평한 → flat / 봉투 → envelope / 연 → kite",
        stuck: "예문을 읽어 준다. \"Stanley was {{mailed}} in an {{envelope}} to California.\"" },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 방법을 설명하지 않는다. 5분 재고 끊는다.",
        stuck: "\"Read the whole sentence first, then think of the word.\"" },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'How did Stanley become flat?' becomes 'Stanley became flat because...'",
        do: "이 한 마디가 서술형의 전부다. 매 시간 같이 반복한다.",
        exp: "Stanley became flat because a bulletin board fell on him.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\" 라고만 한다." },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다. 못 짚으면 답이 맞아도 넘어가지 않는다.",
        stuck: "챕터를 알려 준다. \"It's in chapter 5. Find the museum.\"" },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. What is different about them?",
        do: "규칙을 먼저 말하지 않는다. 빨간 부분만 읽히고 아이가 먼저 알아채게 한다.",
        exp: "They are past. They use 'could' to show what was possible.",
        stuck: "두 문장으로 쪼개 준다. \"He was flat. Because he was flat, he could fit.\"" },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다. 바로 써 보게 한다.",
        exp: "Stanley could squeeze through the grate because he was flat.",
        stuck: "\"What was Stanley able to do? Because he was flat, he could...\"" },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find two sentences with \"could\". Three minutes.",
        do: "책을 다시 펴게 하는 것이 목적이다. 찾은 아이에게 읽게 한다.",
        stuck: "\"Look in the chapter where he travels or helps.\"" },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how your school test asks it. Write only the answer on the right.",
        do: "답만 쓰게 한다. 문장 전체를 옮겨 적는 아이가 나온다. 시작 전에 못을 박는다.",
        stuck: "1번을 같이 푼다. \"Fell or falls? Is it past or now?\"" },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Stanley / Wanted: to be normal / But: his flatness became useful",
        stuck: "\"Who does the work in this story?\" 주인공을 다시 잡아 준다." },

      { stage: "Mind Map", min: "62~70분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다. 여기서 시간을 쓰면 정작 중요한 → 칸을 못 한다.",
        stuck: "한 가지를 골라 같이 채운다. 나머지는 혼자 하게 둔다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't write what happened — write what it means.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "It shows that being different can become your strength.",
        stuck: "\"So what? Why does that matter to Stanley?\"" },

      { stage: "IB Inquiry", min: "70~78분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, the book cannot answer it — only you can.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"라고 되묻는다." },

      { stage: "IB Inquiry", min: "",
        say: "The hardest question: should Stanley have stayed flat? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think he was right to go back to normal, because he was happy with his family.",
        stuck: "손을 들게 한다. \"Stay flat? Go back to normal?\" 몸으로 편을 정하면 글이 나온다." },

      { stage: "Writing", min: "78~95분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means a scene and a chapter number. 'Stanley was special' is not evidence. 'In ch. 5, he caught the thieves at the museum' is.",
        do: "근거와 감상을 구분해 준다. 칠판에 두 문장을 나란히 써 둔다.",
        exp: "In chapter 5, Stanley posed in a picture frame and caught art thieves.",
        stuck: "\"Which chapter? Find it now.\"" },

      { stage: "Wrap-up", min: "95~100분",
        say: "One person, read only your Counter sentence. Just that one.",
        do: "반박 문장만 발표시킨다. 세 명이면 충분하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "Has something bad ever turned out to be good in your life?", ko: "나쁜 일이 좋은 일로 바뀐 적이 있니?" },
        { en: "What makes someone special? Do they have to be normal?", ko: "누가 특별할까? 평범해야 할까?" },
        { en: "Would you rather be special and different, or be like everyone else?", ko: "특별하고 다르기를 원할까, 아니면 다른 사람들처럼 평범하기를 원할까?" }
      ],
      during: [
        { en: "Stanley travels in an envelope and poses in a picture. Which adventure is more dangerous?", ko: "스탠리가 봉투 안에서 여행하고 그림 안에 들어간다. 어느 모험이 더 위험할까?" },
        { en: "Why does Arthur become jealous, and when does he stop?", ko: "아서는 왜 질투할까? 언제 그 마음이 바뀔까?" },
        { en: "Stanley could have stayed flat. Why do you think he let Arthur pump him back up?", ko: "스탠리가 평평한 채로 있을 수도 있었는데 왜 다시 부풀려고 했을까?" }
      ],
      after: [
        { en: "Was it right for Stanley to go back to normal? Why or why not?", ko: "스탠리가 정상으로 돌아가는 게 맞았을까?" },
        { en: "Do you think Stanley misses being special?", ko: "스탠리가 특별했던 때를 그리워할까?" },
        { en: "What is the most important thing Stanley learned?", ko: "스탠리가 배운 가장 중요한 것은 무엇일까?" }
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
window.BOOK.readAloud = {"scene": "납작해진 스탠리의 모험과 다시 돌아오는 장면", "text": "One morning, a big bulletin board fell on Stanley. He was fine, but now he was [[paper-thin|flat]]! Then he had a big [[journey|adventure]]. His parents mailed him to California in an envelope, and his brother Arthur flew him like a kite. But people began to laugh at him, and Arthur felt [[envious|jealous]]. Stanley wanted to be [[ordinary|normal]] again. So [[smart|clever]] Arthur used a bicycle [[air pump|pump]] to blow him back up. Stanley was very [[thankful|grateful]]."};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "Who We Are",
 "themeKo": "우리는 누구인가",
 "profile": [
  {
   "attr": "Open-minded",
   "how": "See being different as something useful, not only something strange."
  },
  {
   "attr": "Balanced",
   "how": "Talk about how Stanley and Arthur handle attention and jealousy."
  }
 ],
 "hook": [
  "Hold up a paper cut-out child: what could you do if you were this flat?",
  "Show a big envelope: where in the world would you mail yourself?"
 ],
 "connections": [
  {
   "subject": "Geography",
   "idea": "Mail a paper Stanley to a friend or relative and mark the place on a map."
  },
  {
   "subject": "Mathematics",
   "idea": "Measure: how thick, how tall? Compare flat and solid shapes."
  },
  {
   "subject": "Social skills",
   "idea": "Teasing and kindness: what should we say when someone looks different?"
  }
 ],
 "speaking": [
  "Debate: is being flat a good thing or a bad thing?",
  "Interview Arthur: how does it feel to be the brother?"
 ],
 "writing": [
  "Write a postcard from Flat Stanley's trip.",
  "Write about one thing that makes you different and why it is good."
 ]
};
