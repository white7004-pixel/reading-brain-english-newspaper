// 리딩브레인 원서프로그램 — A갈래(9단계) 책, 근거 확인을 통과한 세 권 중 하나 (AR 4.0)
// 스캔한 쪽도, 확인된 낭독 영상도 없다. 그래서 evidence(제목·저자·등장인물·사건 세 마디·결말)에
// 적힌 것과 책 제목·레벨이 말해 주는 것만으로 만들었다. evidence에 없는 세부 사건은 묻지 않는다.
// 단어 10개 / 독해 6문항 / 퀴즈 10문항 / 마인드맵 5가지 / IB 질문 2~3개씩 / 논술 PEEL+반박 6단
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S4441",
  slug: "berenstain-bears-too-much-junk-food",
  title: "The Berenstain Bears and Too Much Junk Food",
  author: "Stan and Jan Berenstain",
  series: "The Berenstain Bears",
  level: { ar: "4.0", lexile: "550L", rb: "다독 4단계" },
  cover: "https://covers.openlibrary.org/b/id/6378038-M.jpg",
  awards: [],

  evidence: {
    by: "두 사람이 등장인물·사건 세 마디·결말을 각자 기억으로 적어 서로 맞춰 보았다",
    source: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 두 사람의 기억 중 요약과 어긋나지 않는 것만 남겼다",
    characters: ["Papa Bear", "Mama Bear", "Brother Bear", "Sister Bear"],
    beats: [
      "the family eats too much junk food and grows heavy and sluggish",
      "Mama Bear notices this and lays down the law, starting a healthy-eating campaign and clearing the junk food out",
      "Papa and the cubs join in with more exercise and healthier eating"
    ],
    ending: "the family settles into healthier eating and regular exercise",
    checked: "두 사람의 기억을 학원 장서 목록의 한 줄 요약과 대조했고, 요약과 어긋난 부분은 요약에 맞춰 바로잡았다 (2026-09-29)"
  },

  shadowing: { query: "\"The Berenstain Bears and Too Much Junk Food\" read aloud" },

  // ── ① 단어 ─────────────────────────────────────────────
  // evidence 세 마디 안에서만 골랐다. 책에 없는 장면을 예문으로 만들지 않는다.
  vocabulary: [
    { word: "junk food", pos: "n.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/junk-food.mp3", en: "food that is not good for your body, often high in sugar or fat", ko: "정크푸드, 불량식품", ex: "The Bear family ate too much {{junk food}}.", ex_ko: "베어 가족은 정크푸드를 너무 많이 먹었어요.", pic: "🍔" },
    { word: "heavy",     pos: "adj.", audio: "assets/audio/berenstain-bears-too-much-junk-food/heavy.mp3",     en: "having a lot of weight", ko: "무거운, 살이 찐", ex: "Eating too much junk food made the family feel {{heavy}}.", ex_ko: "정크푸드를 너무 많이 먹어서 가족은 몸이 무거워졌어요.", pic: "⚖️" },
    { word: "sluggish",  pos: "adj.", audio: "assets/audio/berenstain-bears-too-much-junk-food/sluggish.mp3",  en: "moving slowly and without much energy", ko: "굼뜬, 느릿느릿한", ex: "The cubs felt {{sluggish}} and tired all day.", ex_ko: "아이들은 하루 종일 굼뜨고 피곤함을 느꼈어요.", pic: "🐌" },
    { word: "healthy",   pos: "adj.", audio: "assets/audio/berenstain-bears-too-much-junk-food/healthy.mp3",   en: "good for your body", ko: "건강한, 건강에 좋은", ex: "Mama decided the family needed {{healthy}} food.", ex_ko: "엄마는 가족에게 건강한 음식이 필요하다고 결심했어요.", pic: "🥗" },
    { word: "campaign",  pos: "n.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/campaign.mp3",  en: "a planned set of actions to change something", ko: "캠페인, 운동", ex: "Mama started a {{campaign}} for healthy eating.", ex_ko: "엄마는 건강하게 먹기 캠페인을 시작했어요.", pic: "📣" },
    { word: "clear out", pos: "v.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/clear-out.mp3", en: "to remove things from a place completely", ko: "치우다, 없애다", ex: "Mama {{cleared out}} all the junk food from the house.", ex_ko: "엄마는 집에서 정크푸드를 모두 치웠어요.", pic: "🧹" },
    { word: "notice",    pos: "v.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/notice.mp3",    en: "to see or become aware of something", ko: "알아차리다, 눈치채다", ex: "Mama {{noticed}} that her family was getting heavy and sluggish.", ex_ko: "엄마는 가족이 무거워지고 굼떠진 것을 알아차렸어요.", pic: "👀" },
    { word: "exercise",  pos: "n.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/exercise.mp3",  en: "physical activity that keeps your body strong and healthy", ko: "운동", ex: "The family began to {{exercise}} together every day.", ex_ko: "가족은 매일 함께 운동을 하기 시작했어요.", pic: "🏃" },
    { word: "energy",    pos: "n.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/energy.mp3",    en: "the strength and power to be active and do things", ko: "에너지, 활력", ex: "Healthy food gave the family more {{energy}}.", ex_ko: "건강한 음식은 가족에게 더 많은 활력을 주었어요.", pic: "⚡" },
    { word: "habit",     pos: "n.",   audio: "assets/audio/berenstain-bears-too-much-junk-food/habit.mp3",     en: "something you do often and regularly, almost without thinking", ko: "습관", ex: "Healthy eating and exercise became a new {{habit}} for the family.", ex_ko: "건강하게 먹고 운동하는 것이 가족의 새로운 습관이 되었어요.", pic: "🔁" }
  ],

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "beginning", skill: "사실찾기",  q: "What happens to the Bear family because of eating junk food?",
      frame: "They eat too much junk food and become {{heavy and sluggish}}." },
    { ref: "middle", skill: "사실찾기",  q: "What does Mama decide to do about it?",
      frame: "Mama starts {{a healthy-eating campaign}} and {{clears the junk food out of the house}}." },
    { ref: "middle", skill: "추론·예측", q: "Why do you think Mama decides to lay down the law about food?",
      frame: "She probably decides this because {{the family has grown heavy and sluggish, and she wants them to be healthier}}." },
    { ref: "middle", skill: "사실찾기",  q: "What do Papa and the cubs do to help the family become healthier?",
      frame: "They {{join in with exercise}} along with eating healthier food." },
    { ref: "end", skill: "사실찾기",  q: "How does the family live by the end of the story?",
      frame: "The family settles into {{healthier eating and regular exercise}}." },
    { ref: "end", skill: "평가·적용", q: "Do you think it is hard to change eating habits the way the Bear family did? Say what you think.",
      frame: "I think {{yes / no}} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 (화면에서 푼다) ──────────────────
  quiz: [
    { q: "What happens to the Bear family because of junk food?",
      a: ["They become sick with a cold", "They grow heavy and sluggish", "They lose their appetite completely", "They stop talking to each other"], c: 1,
      why_ko: "감기에 걸린 것도, 입맛을 잃은 것도 아니에요. 정크푸드를 너무 많이 먹어서 몸이 무겁고 굼떠졌어요.",
      why: "Not a cold, not a lost appetite. Too much junk food makes the family heavy and sluggish." },
    { q: "Who starts the healthy-eating campaign?",
      a: ["Papa Bear", "Mama Bear", "Brother Bear", "Sister Bear"], c: 1,
      why_ko: "이 변화를 시작한 건 엄마예요. 가족이 무겁고 굼떠진 걸 알아차린 것도 엄마였어요.",
      why: "Mama is the one who starts the change — she is the one who notices the family has grown heavy and sluggish." },
    { q: "What does Mama do first?",
      a: ["She buys even more junk food", "She clears the junk food out of the house", "She calls a doctor right away", "She moves the family to a new house"], c: 1,
      why_ko: "엄마는 집 안의 정크푸드를 싹 치워 버려요. 이게 캠페인의 첫걸음이에요.",
      why: "Mama clears all the junk food out of the house. That is the first step of her campaign." },
    { q: "What do Papa and the cubs do to support the healthy changes?",
      a: ["They ignore the new rules completely", "They join in with exercise and healthier eating", "They move out of the house", "They complain to a neighbor"], c: 1,
      why_ko: "아빠와 아이들도 함께해요. 운동과 건강한 식사에 동참하죠.",
      why: "Papa and the cubs join in — they add exercise and healthier eating to their days." },
    { q: "What do Papa and the cubs do that helps the family become healthier?",
      a: ["They buy even more junk food", "They join in with exercise together", "They move to a new house", "They ignore Mama's rules completely"], c: 1,
      why_ko: "아빠와 아이들이 운동에 함께 동참하면서 가족은 더 건강해져요.",
      why: "Papa and the cubs join in with exercise together, and that helps the whole family become healthier." },
    { q: "Who exercises together as a family?",
      a: ["Only Mama exercises", "Only the cubs exercise", "Papa and the cubs join in with Mama", "Only Papa exercises alone"], c: 2,
      why_ko: "가족 전체가 함께 운동을 해요. 아빠와 아이들도 엄마와 함께 동참하죠.",
      why: "The whole family exercises together — Papa and the cubs join in with Mama." },
    { q: "How does the family look at the beginning of the story?",
      a: ["Thin and full of energy", "Heavy and sluggish", "Sick and coughing", "Exactly the same as always"], c: 1,
      why_ko: "이야기 시작 부분에서 가족은 정크푸드를 너무 많이 먹어서 무겁고 굼떠 보여요.",
      why: "At the start, the family looks heavy and sluggish from eating too much junk food." },
    { q: "What is different about the family by the end of the story?",
      a: ["Nothing has changed at all", "They eat healthier food and exercise regularly", "They eat even more junk food than before", "They stop eating meals together"], c: 1,
      why_ko: "결말에서 가족은 건강한 음식을 먹고 규칙적으로 운동하는 생활에 자리 잡아요.",
      why: "By the end, the family settles into healthier eating and regular exercise." },
    { q: "What is the main lesson of this story?",
      a: ["Junk food is fine in any amount", "Healthy eating and exercise can change a family for the better", "Exercise does not really matter", "Only children need to eat healthy food"], c: 1,
      why_ko: "주제 문제예요. 건강하게 먹고 운동하는 습관이 가족 전체를 더 좋게 바꿀 수 있다는 게 이 책의 메시지예요.",
      why: "The theme: healthy eating and exercise, done together as a family, can make a real change for the better." },
    { q: "Why does Mama start the campaign?",
      a: ["Because she is bored", "Because the family has grown heavy and sluggish from junk food", "Because Papa asked her to", "Because the cubs want more candy"], c: 1,
      why_ko: "가족이 정크푸드 때문에 무겁고 굼떠진 것을 보고 엄마가 나선 거예요.",
      why: "Mama sees the family has grown heavy and sluggish from junk food, and that is why she takes action." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  summaryMap: {
    setting: { place: "{{the Bear family's home}}", time: "{{several weeks}}" },
    swbst: [
      { k: "Somebody", v: "{{the Bear family}}" },
      { k: "Wanted",   v: "{{to feel good and have energy}}" },
      { k: "But",      v: "{{they had grown heavy and sluggish from eating too much junk food}}" },
      { k: "So",       v: "{{Mama started a healthy-eating campaign and cleared the junk food out}}" },
      { k: "Then",     v: "{{Papa and the cubs joined in with exercise, and the family settled into healthier habits}}" }
    ],
    scenes: [
      { label: "Beginning",
        given: "The Bear family eats too much junk food and grows heavy and sluggish.",
        frame: "The family starts to feel {{heavy and tired all the time}}." },
      { label: "Middle",
        given: "",
        frame: "Mama {{starts a healthy-eating campaign}} and {{clears the junk food out of the house}}." },
      { label: "End",
        given: "Mama's new healthy-eating rules take hold in the house.",
        frame: "Papa and the cubs {{join in with exercise}}, and the family settles into {{healthier eating and regular exercise}}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Berenstain Bears and Too Much Junk Food",
    branches: [
      { label: "The Family",       ask: "How does the family feel at the start of the story, and why?",
        deeper: "Why can eating too much junk food make you feel heavy and tired?" },
      { label: "Mama's Campaign",  ask: "What does Mama do to help the family change?",
        deeper: "Why does she need to clear the junk food out completely, not just eat less of it?" },
      { label: "Getting Healthy Together", ask: "What do Papa and the cubs do to join the new healthy changes?",
        deeper: "Why does exercise help alongside healthy eating?" },
      { label: "Exercise",         ask: "What do Papa and the cubs start doing along with healthy eating?",
        deeper: "How does exercise help alongside healthy eating?" },
      { label: "Me",               ask: "What is one healthy habit you could start this week?",
        deeper: "What makes a new habit hard to keep going?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Habits", "Well-being"],
    globalContext: "Identities and relationships — how families build healthy habits together (가족은 건강한 습관을 어떻게 함께 만드는가)",
    statement: "Changing a habit is hard at first, but a family can support each other to build a healthier way of living.",
    factual: [
      "What happens to the family because of eating too much junk food?",
      "What does Mama do to start the change?",
      "What do Papa and the cubs do to help the family become healthier?",
      "How does the family live by the end of the story?"
    ],
    conceptual: [
      "Why might a parent decide to change what the whole family eats?",
      "How does exercise help the family alongside healthy eating?"
    ],
    debatable: [
      "Should one parent decide what the whole family eats?",
      "Is it fair for Mama to clear out all the junk food at once, instead of little by little?"
    ],
    learnerProfile: ["Balanced", "Caring", "Principled"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    prompt: "Mama noticed her family was getting heavy and sluggish, so she cleared out the junk food and started a healthy-eating campaign. Do you think Mama did the right thing? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "책 속 장면을 한 가지 넣을 것 · Use one scene from the book",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "반대 의견을 한 문장 넣고 반박할 것 · Add one opposing idea and answer it"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Mama Made the Right Choice", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Mama did the right thing by starting the healthy-eating campaign.", lines: 2 },
      { part: "E — Evidence",    ask: "What happened in the book? Write the scene.",
        eg: "In the book, the family had grown heavy and sluggish, so Mama cleared the junk food out of the house.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that scene prove your point?",
        eg: "This shows that Mama took action because she cared about the family's health, not to be unfair.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say Mama should have let everyone choose slowly, but the family needed a clear change to begin.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe Mama's campaign was the right way to help her family become healthier.", lines: 2 }
    ],
    expressions: [
      "I think / In my opinion, ...",
      "This is because ...",
      "In the book, ...",
      "This shows that ...",
      "Some people say ..., but I believe ...",
      "For this reason, ..."
    ],
    rubric: [
      { c: "A 분석",  d: "책 속 장면을 근거로 들어 설명했나요? · Did I use a scene from the book as evidence?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  },

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  teaching: {
    goal: {
      en: "Students trace how the Bear family changes their eating and exercise habits, and take a side on whether Mama's campaign was the right way to do it.",
      ko: "베어 가족이 식습관과 운동 습관을 어떻게 바꾸는지 짚고, 엄마의 캠페인이 옳은 방법이었는지 편을 정해 쓴다."
    },
    // 실제 수업 대사 — 이것만 읽고도 수업이 되게 썼다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "What is your favorite healthy food, and what is your favorite junk food?",
        do: "책을 펴기 전에 한다. 건강한 음식과 정크푸드를 아이 스스로 구분해 보게 한다.",
        exp: "I like apples. / I like chips.",
        stuck: "선생님이 먼저 한 문장 한다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "정크푸드 → junk food / 운동 → exercise / 습관 → habit",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at the QR code. Scan it tonight and read along with the video. Three times.",
        do: "휴대폰으로 QR을 직접 찍어 보게 한다.",
        stuck: "교실 화면으로 30초만 같이 듣는다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first. Then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What happens to the family...' becomes 'They...'",
        do: "이 한 마디가 서술형의 전부다.",
        exp: "They eat too much junk food and become heavy and sluggish.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question three asks WHY Mama decides to lay down the law. Think about how the family was feeling before she acted.",
        do: "추론 문항에서는 혼자 두지 않는다. 같이 읽고 시작한다.",
        exp: "She decides this because the family has grown heavy and sluggish, and she wants them to be healthier.",
        stuck: "\"How did the family feel before Mama made the change? Why would that make a parent want to act?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: the Bear family / Wanted: to feel good / But: they had grown heavy and sluggish",
        stuck: "\"Who is the story about? What went wrong for them?\"" },

      { stage: "Summary Map", min: "",
        say: "Now read your five boxes out loud, in order. Does it sound like a story?",
        do: "소리 내어 읽히면 앞뒤가 안 맞는 칸을 아이가 스스로 찾는다.",
        stuck: "선생님이 대신 읽어 준다. 어색한 곳에서 멈추기만 하면 아이가 알아챈다." },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Getting Healthy Together)", min: "",
        say: "Stop at Getting Healthy Together. Don't just tell me what Papa and the cubs did — tell me why exercise helps alongside eating well.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Because moving your body and eating well work together to make you feel good.",
        stuck: "\"You said what they did. Now — why does exercise help too, not just food?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should one parent decide what the whole family eats? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think it is okay, because Mama was trying to keep everyone healthy, not just be strict.",
        stuck: "손을 들게 한다. \"One parent decides? Or everyone decides together?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say Mama should have let everyone choose slowly, but the family needed a clear change.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What is your favorite healthy food and your favorite junk food?", ko: "네가 제일 좋아하는 건강한 음식과 정크푸드는 뭐니?" },
        { en: "Is it easy or hard to change a habit? Why?", ko: "습관을 바꾸는 건 쉬울까, 어려울까? 왜 그럴까?" }
      ],
      during: [
        { en: "Why do you think Mama decides she has to make a change for the whole family?", ko: "엄마는 왜 가족 전체를 위해 변화를 결심했을까?" },
        { en: "How do Papa and the cubs help the change succeed?", ko: "아빠와 아이들은 이 변화가 잘 되도록 어떻게 도왔을까?" }
      ],
      after: [
        { en: "Do you think the family is happier by the end of the story? Why?", ko: "이야기 끝에서 가족은 더 행복해졌을까? 왜 그렇게 생각하니?" },
        { en: "What is one habit your own family could try to change?", ko: "너희 가족이 바꿔 보면 좋을 습관 하나는 뭐니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "다 쓴 뒤 책을 덮고 말로 다시 하게 한다.", miss: "책 문장을 그대로 베낀다." },
      { sheet: "Mind Map",      point: "'Getting Healthy Together' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 장면이 없으면 근거가 아니다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",     pt: 5, yes: "책 속 장면을 들어 설명했다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization", pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",        pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",     pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  }
};
