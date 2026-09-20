// 리딩브레인 원서프로그램 — 2점대 책 (AR 2.0)
// 1점대(hi-fly-guy)와 3점대(sarah-plain-and-tall) 사이다. 분량도 가운데로 잡았다.
//   단어 9개 / 독해 6문항 / 장면 4칸 / 마인드맵 5가지 / IB 질문 2~3개씩
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M2187",
  slug: "nate-the-great",
  title: "Nate the Great",
  author: "Marjorie Weinman Sharmat",
  series: "Nate the Great",
  publisher: "Yearling / Random House",
  level: { ar: "2.0", lexile: "340L", rb: "다독 2단계" },
  awards: [],
  defSource: "",   // 뜻을 직접 썼으면 비워 둔다.
  cover: "assets/covers/nate-the-great.jpg",

  shadowing: {
    query: "\"Nate the Great\" read aloud",
    searchUrl: "https://youtu.be/HRk7tpEWx0k",
    qr: "assets/qr/nate-the-great.png",
    videos: [
      { url: "https://youtu.be/HRk7tpEWx0k", title: "영어원서읽기/Read Aloud_Nate the Great", channel: "잉스유니버스", views: "48,110", length: "" },
      { url: "https://youtu.be/rUIsSrUFZzw", title: "Nate the Great (Nate the Great)", channel: "Readers are Leaders", views: "120,532", length: "" },
      { url: "https://youtu.be/UPjkC8X_oBk", title: "Nate the Great: The Case of the Fleeing Fang", channel: "아인이 아빠", views: "89,059", length: "" },
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "detective",  pos: "n.", audio: "assets/audio/nate-the-great/detective.mp3",   en: "a person who finds out the truth by looking for clues", ko: "탐정",           ex: "Nate is {{a detective}} who solves mysteries.", ex_ko: "네이트는 미스터리를 푸는 탐정이에요.", pic: "🔍" },
    { word: "clue",       pos: "n.", audio: "assets/audio/nate-the-great/clue.mp3",       en: "a piece of information that helps solve a mystery", ko: "단서",           ex: "Every {{clue}} helps Nate solve the case.", ex_ko: "모든 단서가 네이트를 도와요.", pic: "🗝️" },
    { word: "mystery",    pos: "n.", audio: "assets/audio/nate-the-great/mystery.mp3",     en: "something that is hard to understand or explain", ko: "미스터리",       ex: "The {{mystery}} is why Annie's picture disappeared.", ex_ko: "미스터리는 애니의 그림이 왜 없어졌는지 하는 거예요.", pic: "❓" },
    { word: "picture",    pos: "n.", audio: "assets/audio/nate-the-great/picture.mp3",    en: "a painting or drawing", ko: "그림",             ex: "Annie painted {{a picture}} of her dog.", ex_ko: "애니가 자기 개의 그림을 그렸어요.", pic: "🖼️" },
    { word: "paint",      pos: "v.", audio: "assets/audio/nate-the-great/paint.mp3",      en: "to cover a surface with colour using a brush", ko: "칠하다, 그리다", ex: "Harry {{paints}} over Annie's work.", ex_ko: "해리가 애니의 그림 위에 칠해요.", pic: "🎨" },
    { word: "suspect",    pos: "n.", audio: "assets/audio/nate-the-great/suspect.mp3",    en: "a person who may have done something wrong", ko: "용의자",          ex: "At first, Nate thinks Rosamond is {{a suspect}}.", ex_ko: "처음에 네이트는 로자몬드가 용의자라고 생각해요.", pic: "👤" },
    { word: "solution",   pos: "n.", audio: "assets/audio/nate-the-great/solution.mp3",   en: "the answer to a problem or mystery", ko: "해답",             ex: "Nate finds the {{solution}} by thinking hard.", ex_ko: "네이트는 열심히 생각해서 해답을 찾아요.", pic: "✅" },
    { word: "pancake",    pos: "n.", audio: "assets/audio/nate-the-great/pancake.mp3",    en: "a flat, round food made from flour and eggs, cooked in a pan", ko: "팬케이크",      ex: "After solving the mystery, Nate eats {{pancakes}}.", ex_ko: "미스터리를 푼 뒤 네이트는 팬케이크를 먹어요.", pic: "🥞" },
    { word: "yellow",     pos: "adj.", audio: "assets/audio/nate-the-great/yellow.mp3",   en: "the colour of the sun and ripe lemons", ko: "노란색의",      ex: "Annie's picture was {{yellow}}.", ex_ko: "애니의 그림은 노란색이었어요.", pic: "💛" }
  ],

  // ── ①-2 문법 ─────────────────────────
  grammar: {
    points: [
      { name: "Past Simple — regular & irregular", ko: "과거시제",
        sent: "Nate [[found]] a clue, and he [[asked]] a question.",
        why_ko: "과거형은 두 가지! 규칙 동사는 -ed(asked), 불규칙 동사는 모양이 바뀌어요(find → found, leave → left).",
      why: "Regular verbs add -ed (asked), but some change their form (found, saw, went).",
        try: "He {{painted}} the picture and {{left}} it there." },
      { name: "could", ko: "조동사 could",
        sent: "He [[could]] solve the mystery, and nobody else [[could]] do it.",
        why_ko: "could는 can의 과거, '~할 수 있었다'예요. 뒤에는 동사원형! could solve, could not find.",
      why: "\"Could\" shows ability in the past: was able to, was possible to.",
        try: "Nate {{could}} figure it out when others {{could}} not." },
      { name: "Why...? Because...", ko: "이유를 묻고 답하기",
        sent: "[[Why]] was the picture missing? [[Because]] Harry painted over it.",
        why_ko: "Why로 물으면 Because로 답해요. Because 뒤에는 '주어 + 동사'가 오는 완전한 문장! 이유 말하기 기본 공식이에요.",
      why: "Ask with \"Why\" and answer with \"Because\" to explain reasons.",
        try: "{{Why}} did Nate search? {{Because}} he wanted to help Annie." }
    ],
    find: "책에서 과거형 동사를 세 개 찾아 원형과 함께 쓰세요. · Find three past verbs and their base forms.",
    exam: {
      choose: [
        {"q": "Nate (find / found) a clue yesterday.", "a": "found", why_ko: "yesterday가 있으니 과거형! find는 불규칙이라 found예요." },
        {"q": "At first, he (could / can) not find the picture.", "a": "could", why_ko: "At first(처음에)는 과거 이야기예요. can의 과거형 could를 써요." },
        {"q": "Annie (painted / paints) a picture of Fang last week.", "a": "painted", why_ko: "last week(지난주)는 과거예요. paint에 -ed를 붙여 painted!" },
        {"q": "Nate (eat / ate) pancakes after the case.", "a": "ate", why_ko: "eat은 불규칙 동사예요. 과거형은 ate, 외워 두세요!" },
        {"q": "Nate (could solve / could solved) the case.", "a": "could solve", why_ko: "could 뒤에는 동사원형! solved가 아니라 solve예요." }
      ],
      fix: [
        {"q": "Nate [[finded]] the answer.", "a": "found", why_ko: "find의 과거형은 finded가 아니라 found예요. 불규칙 동사!" },
        {"q": "He [[could sees]] the clue.", "a": "could see", why_ko: "could 뒤에는 동사원형이에요. sees가 아니라 see!" },
        {"q": "Yesterday Harry [[paint]] over the picture.", "a": "painted", why_ko: "Yesterday는 과거 신호예요. paint를 painted로 고쳐요." }
      ],
      write: [
        {"ko": "네이트는 그림을 찾았다.", "cond": "find, picture", "a": "Nate found the picture.", why_ko: "find의 과거형 found를 써요. Nate found the picture." },
        {"ko": "그림은 왜 없어졌나요? 해리가 그 위에 칠했기 때문이에요.", "cond": "Why, Because, paint over", "a": "Why was the picture missing? Because Harry painted over it.", why_ko: "Why로 물으면 Because + 주어 + 동사로 답해요. paint over의 과거는 painted over!" }
      ]
    }
  },

  // ── ② 독해 ────────────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What is lost at the start?",
      frame: "{{Annie's picture}} is lost." },
    { ref: "beginning", skill: "사실찾기",  q: "Who asks Nate to find it?",
      frame: "{{Annie}} comes to Nate and asks him to find her picture." },
    { ref: "middle", skill: "추론·예측", q: "Who does Nate think might have taken the picture?",
      frame: "Nate thinks {{Rosamond might have taken it}}, but he also considers {{Harry}}." },
    { ref: "middle", skill: "추론·예측", q: "What does Nate notice about the colours?",
      frame: "Nate sees {{yellow paint}} and {{red paint and figures out that yellow and red make orange}}." },
    { ref: "near end", skill: "사실찾기",  q: "How does Nate finally solve the mystery?",
      frame: "Nate realizes {{Harry painted over Annie's yellow picture with red paint}} and {{the picture is hidden under Harry's red painting}}." },
    { ref: "end", skill: "평가·적용", q: "Is Nate a good detective? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제
  quiz: [
    { q: "What is Nate?",
      a: ["A teacher", "A boy detective", "A painter", "Annie's brother"], c: 1,
      why_ko: "네이트는 어린 탐정이에요. 미스터리를 푸는 게 그의 일이죠.",
      why: "Nate is a boy who loves solving mysteries. He is a detective." },
    { q: "What is lost?",
      a: ["A dog", "A yellow picture", "Pancakes", "Paint"], c: 1,
      why_ko: "애니가 그린 그림이 사라져요. 그건 노란색이었어요.",
      why: "Annie's picture disappears. It was yellow." },
    { q: "Who is Annie?",
      a: ["Nate's sister", "A girl who painted a picture", "A suspect", "Rosamond's friend"], c: 1,
      why_ko: "애니는 자기 개 팡의 그림을 그린 여자아이예요.",
      why: "Annie is the girl who painted a picture of her dog Fang." },
    { q: "What kind of dog is Fang?",
      a: ["A small dog", "A big dog", "A white dog", "Annie's pet"], c: 1,
      why_ko: "팡은 크고 큰 개예요. 애니가 그림에 그렸어요.",
      why: "Fang is a big dog that Annie painted." },
    { q: "Who is Rosamond?",
      a: ["Annie's sister", "A girl with four cats", "The one who took the picture", "Nate's mother"], c: 1,
      why_ko: "로자몬드는 네 마리의 고양이를 가진 특이한 여자아이예요. 한 마리는 수퍼 헥스라고 해요.",
      why: "Rosamond has four cats, one named Super Hex. She is a suspect but not the thief." },
    { q: "Who is Harry?",
      a: ["Nate's friend", "A suspect", "Annie's little brother", "Rosamond's brother"], c: 2,
      why_ko: "해리는 애니의 남은오빠예요. 그는 미스터리의 핵심이 돼요.",
      why: "Harry is Annie's little brother. He is central to solving the mystery." },
    { q: "What did Harry do?",
      a: ["He stole the picture", "He hid the picture", "He painted over it with red paint", "He lost it"], c: 2,
      why_ko: "해리가 애니의 노란 그림 위에 빨간색으로 칠했어요. 그게 답이예요.",
      why: "Harry painted red over Annie's yellow picture. That is the solution." },
    { q: "What colour was Annie's picture?",
      a: ["Red", "Yellow", "Orange", "Blue"], c: 1,
      why_ko: "노란색이었어요. 이게 미스터리를 푸는 데 아주 중요한 단서예요.",
      why: "Yellow. This is the key clue Nate uses to solve it." },
    { q: "What happens to yellow paint when red paint is added?",
      a: ["It turns orange", "It disappears", "It stays yellow", "It becomes darker"], c: 0,
      why_ko: "노란색 위에 빨간색을 칠하면 주황색이 돼요. 네이트는 이걸 알았어요.",
      why: "It becomes orange. Nate realizes this and solves the mystery." },
    { q: "What does Nate do after solving the mystery?",
      a: ["He goes home", "He eats pancakes", "He plays with Fang", "He visits Rosamond"], c: 1,
      why_ko: "네이트는 문제를 풀고 집에 가서 팬케이크를 먹어요. 이게 책의 끝이예요.",
      why: "Nate eats pancakes. He loves pancakes, and that is how the story ends." }
  ],

  // ── ③ 요약 지도 ─────────────────────────
  summaryMap: {
    setting: { place: "{{Nate's town}}", time: "{{one day}}" },
    swbst: [
      { k: "Somebody", v: "{{Nate, a boy detective}}" },
      { k: "Wanted",   v: "{{to find Annie's lost picture}}" },
      { k: "But",      v: "{{there were suspects and hidden clues}}" },
      { k: "So",       v: "{{Nate searched and asked questions carefully}}" },
      { k: "Then",     v: "{{he figured out Harry painted over it, and the case was solved}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "Annie comes to Nate asking him to find her lost picture of Fang.",
        frame: "Nate {{agrees}} and {{starts to investigate}}." },
      { label: "1",
        given: "",
        frame: "Nate {{talks to Rosamond}} and {{looks for paint colours}} as clues." },
      { label: "2",
        given: "Nate thinks about yellow and red paint.",
        frame: "He {{realizes}} that {{red + yellow = orange}}." },
      { label: "End",
        given: "Nate understands what Harry did.",
        frame: "He {{finds the picture}} and {{goes home to eat pancakes}}." }
    ]
  },

  // ── ④ 마인드맵 ───────────────────────────
  mindMap: {
    center: "Nate the Great",
    branches: [
      { label: "Nate",     ask: "What makes Nate a good detective?",
        deeper: "Does he give up easily?" },
      { label: "Clues",    ask: "What colours are important clues?",
        deeper: "How do the colours help solve the mystery?" },
      { label: "Suspects", ask: "Who might have taken the picture?",
        deeper: "Why does Nate suspect them?" },
      { label: "Solution", ask: "What really happened to the picture?",
        deeper: "How does Nate figure it out?" },
      { label: "Me",       ask: "Could you solve a mystery like Nate?",
        deeper: "What would you do first?" }
    ]
  },

  // ── ⑤ IB 탐구 ──────────────────────────────────────────
  ib: {
    keyConcept: "Problem-solving",
    relatedConcepts: ["Logic", "Observation"],
    globalContext: "Personal and cultural expression — finding answers through careful thinking (신중하게 생각해서 답 찾기)",
    statement: "A mystery is solved not by guessing, but by gathering clues and thinking carefully about what they mean.",
    factual: [
      "What picture is missing?",
      "What does Harry do?"
    ],
    conceptual: [
      "How do colours help Nate solve the mystery?",
      "Why is observation important for a detective?"
    ],
    debatable: [
      "Can anyone be a detective, or must you be born clever?",
      "Is Harry bad for painting over the picture?"
    ],
    learnerProfile: ["Thinker", "Inquirer", "Reflective"]
  },

  // ── ⑥ 쓰기 ─────────────────────────
  essay: {
    prompt: "Is Nate a good detective? Write what you think and why.",
    conditions: [
      "4문장 이상 쓸 것 · Write at least 4 sentences",
      "because 를 한 번 쓸 것 · Use \"because\" once",
      "책에서 본 것을 한 가지 넣을 것 · Use one thing from the book"
    ],
    steps: [
      { part: "Title",       ask: "What is your writing about?",
        eg: "Nate Is a Good Detective", lines: 1 },
      { part: "My Opinion",  ask: "What do you think? One sentence.",
        eg: "I think Nate is a good detective.", lines: 2 },
      { part: "Because",     ask: "Why do you think so?",
        eg: "This is because he solves hard mysteries.", lines: 2 },
      { part: "In the Book", ask: "What did Nate do in the book?",
        eg: "In the book, Nate figured out that Harry painted over Annie's picture.", lines: 2 },
      { part: "Ending",      ask: "Say it again in a new way.",
        eg: "So Nate proved he is a good detective.", lines: 2 }
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
      en: "Students retell how Nate solved the mystery and take a side on whether anyone can be a detective.",
      ko: "네이트가 미스터리를 어떻게 풀었는지 말하고, 누구나 탐정이 될 수 있는지에 편을 정해 쓴다."
    },
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever lost something and had to find it? How did you figure out where it was?",
        do: "책을 펴기 전에 한다. 아이들의 경험에서 탐정의 방법을 이미 꺼낸다.",
        exp: "I looked under the bed. / I asked my mom. / I remembered where I left it.",
        stuck: "선생님이 먼저 한 문장 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 아홉 개 중 다섯 개만 묻는다.",
        exp: "탐정 → detective / 단서 → clue / 그림 → picture",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다.",
        stuck: "교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What is lost?' becomes 'Annie's picture is lost because...'",
        do: "이 한 마디가 서술형의 전부다.",
        exp: "Annie's picture is lost.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Show me the page. Put your finger on the line that proves it.",
        do: "돌아다니며 손가락을 확인한다.",
        stuck: "페이지를 알려 준다." },

      { stage: "Grammar", min: "35~45분",
        say: "Don't write yet. Just read the red words out loud. Found. Took. Asked.",
        do: "규칙을 먼저 말하지 않는다.",
        exp: "They are past, but they do not have -ed.",
        stuck: "원형을 옆에 써 준다." },

      { stage: "Grammar", min: "",
        say: "Now read the rule. Then do YOU TRY. Same pattern, your own sentence.",
        do: "규칙을 외우게 하지 않는다.",
        exp: "He painted the picture and left it there.",
        stuck: "원형을 준다." },

      { stage: "Grammar", min: "",
        say: "Find It Yourself. Open the book and find three irregular past verbs. Write the base form too.",
        do: "책을 다시 펴게 하는 것이 목적이다.",
        stuck: "범위를 좁혀 준다." },

      { stage: "Exam Grammar", min: "45~52분",
        say: "Same grammar, but this is how a test asks it. Write only the answer on the right.",
        do: "답만 쓰게 한다.",
        stuck: "1번을 같이 푼다." },

      { stage: "Exam Grammar", min: "",
        say: "Section three is Korean. Use the words in the grey box. All of them.",
        do: "조건 영작이다.",
        exp: "Nate found the picture.",
        stuck: "한국어를 영어 순서로 다시 읽어 준다." },

      { stage: "Summary Map", min: "52~62분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Nate / Wanted: to find the picture / But: there were suspects",
        stuck: "\"Who is the detective?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다." },

      { stage: "Mind Map", min: "62~72분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map", min: "",
        say: "Stop. The arrow question. Don't tell me what Nate did — tell me why it works.",
        do: "→ 칸에서 반드시 멈춘다.",
        exp: "Because careful thinking helps solve problems.",
        stuck: "\"You said what he did. Now — why does it work?\"" },

      { stage: "IB Inquiry", min: "72~80분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, the book cannot answer it — only you can.",
        do: "세 단을 아주 짧게 말한다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Can anyone be a detective? Yes or no. Pick one.",
        do: "1·2단은 말로만. 3단만 글로.",
        exp: "Yes, because Nate is just a regular boy who asks good questions.",
        stuck: "손을 들게 한다. \"Yes? No?\"" },

      { stage: "Writing", min: "80~95분",
        say: "Read the conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건을 같이 소리 내어 읽는다.",
        stuck: "조건을 손가락으로 하나씩 세게 한다." },

      { stage: "Writing", min: "",
        say: "Evidence means what Nate did. 'He was smart' is not evidence. 'He figured out that Harry painted over it' is.",
        do: "근거와 감상을 구분해 준다.",
        exp: "In the book, Nate figured out that Harry painted over Annie's picture.",
        stuck: "\"What did Nate do?\"" },

      { stage: "Wrap-up", min: "95~100분",
        say: "Two people. Read your first sentence only.",
        do: "첫 문장만 발표시킨다.",
        stuck: "자원자가 없으면 선생님이 읽어 준다." }
    ],
    booktalk: {
      before: [
        { en: "If something goes missing, how would you find it?", ko: "뭔가 없어지면 어떻게 찾을까?" },
        { en: "What makes a good detective?", ko: "좋은 탐정이 되려면 뭐가 필요할까?" }
      ],
      during: [
        { en: "Why does Nate ask so many questions?", ko: "네이트는 왜 자꾸 물어볼까?" },
        { en: "Is Nate smarter than other children?", ko: "네이트가 다른 아이들보다 똑똑할까?" }
      ],
      after: [
        { en: "Did you guess the answer before Nate found it?", ko: "네이트가 풀기 전에 너는 알았어?" },
        { en: "What did this book teach you?", ko: "이 책에서 뭘 배웠어?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다." },
      { sheet: "Comprehension", point: "책을 펴 놓고 푼다.", miss: "단어 하나로 답한다." },
      { sheet: "Grammar",       point: "빨간 부분만 같이 읽고 바로 옆 칸을 시킨다.", miss: "규칙을 외우려 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "→ 칸에서 '왜'를 꼭 물어 본다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "Writing",       point: "4문장. 조건은 because 하나만 본다.", miss: "한두 문장 쓰고 멈춘다." }
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
window.BOOK.readAloud = {"scene": "네이트가 애니의 그림을 찾는 장면", "text": "Nate is a [[sleuth|detective]]. His friend Annie lost her [[drawing|picture]] of her dog, Fang. First, Nate eats some [[flapjacks|pancakes]]. Then he looks for [[hints|clues]]. He visits Rosamond and her cats. He looks in Annie's room. At last, Nate finds the [[answer|solution]]. Annie's brother Harry had [[colored|painted]] red over the [[golden|yellow]] picture!"};

// IB PYP 유닛 플래너 (교사용 가이드 앞 세 장). 비운 칸은 ib·독해·문법·쓰기에서 끌어다 쓴다.
window.BOOK.pyp = {
 "theme": "How the World Works",
 "themeKo": "세상은 어떻게 돌아가는가",
 "profile": [
  {
   "attr": "Inquirer",
   "how": "Ask good questions like a detective and look for clues."
  },
  {
   "attr": "Thinker",
   "how": "Put clues in order and explain how you know."
  }
 ],
 "hook": [
  "Hide an object in the room and leave three clues. Who can solve it?",
  "Show a magnifying glass and a notebook: what job uses these?"
 ],
 "connections": [
  {
   "subject": "Science",
   "idea": "Observation and evidence: what did you see, what do you think?"
  },
  {
   "subject": "Art",
   "idea": "Color mixing: why did the yellow picture disappear under red paint?"
  },
  {
   "subject": "Mathematics",
   "idea": "Logic puzzles: cross out what cannot be true."
  }
 ],
 "speaking": [
  "Be Nate: report the case to the class in order (First, Then, So).",
  "Partner interview: the detective questions a witness."
 ],
 "writing": [
  "Write a note like Nate's note to his mother.",
  "Write a three-clue mystery for a friend to solve."
 ]
};
