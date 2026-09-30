// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.0)
// Sunset of the Sabertooth (Magic Tree House #7) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3253.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집 / 빙하기(the Ice Age)로 가는 임무(a mission) /
//   거기서 크로마뇽인 · 동굴곰 · 검치호랑이 · 털매머드를 만난다(encounter) /
//   책의 첫 문장은 "Let's go to the tree house," said Annie.
// 2권과 달리 이 책의 근거는 두 아이의 나이도, 누가 손위인지도 말하지 않는다.
// 주제어에 Brothers and sisters 가 있을 뿐이다. 그래서 "여동생"이라 쓰지 않았다.
// 결말도 근거가 말하지 않는다. 그래서 evidence.ending 에 그대로 적어 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3253",
  slug: "magic-tree-house-sunset-of-the-sabertooth",
  title: "Sunset of the Sabertooth",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #7",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 2권(AR 2.9)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.0", lexile: "520L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/423893-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3253 요약 + 오픈라이브러리 /works/OL81833W (소개글 · 첫 문장 \"Let's go to the tree house,\" said Annie. · 주제어 Magic/Prehistoric peoples/Prehistoric animals/Time travel/Tree houses/Saber-toothed tigers/Prehistoric Man/Brothers and sisters · 74쪽 · 1996년)",
    characters: ["Jack", "Annie", "Cro-Magnons"],
    beats: [
      "the magic tree house takes Jack and Annie on an adventure — a mission to the Ice Age",
      "in the Ice Age they meet Cro-Magnons, the prehistoric people of that time",
      "they encounter cave bears, sabertooth tigers, and woolly mammoths"
    ],
    ending: "근거에 결말이 없다. 소개글이 \"빙하기에서 크로마뇽인·동굴곰·검치호랑이·털매머드를 만난다\"는 데서 멈추고, 그 뒤 두 아이가 어떻게 되는지·어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"the Ice Age\", \"Cro-Magnons\", \"woolly mammoths\", \"magic tree house\")과 소개글(\"a mission to the Ice Age\", \"Cro-Magnons\", \"woolly mammoths\", \"the magic tree house\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(임무 mission · 동굴곰 cave bears · 검치호랑이 sabertooth tigers)은 요약과 부딪히지 않아 남겼다. 주제어 Prehistoric peoples/Prehistoric animals/Saber-toothed tigers/Time travel/Tree houses 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 두 아이의 나이와 손위손아래는 어느 출처도 말하지 않아 쓰지 않았다(주제어에 Brothers and sisters 만 있다). 여기 밖의 사건·인물·결말은 전부 들어냈다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Sunset of the Sabertooth\" read aloud",
    searchUrl: "https://youtu.be/wQA8YNCXt08",
    videos: [
      { url: "https://youtu.be/wQA8YNCXt08", title: "Sunset of the Sabertooth - Magic Tree House 7 - Audiobook",
        channel: "Triple A English 👏", views: "5,352", length: "40:35" },
      { url: "https://youtu.be/1SX7gvtSidg", title: "[영어 원서] 매직 트리 하우스 7권 읽기 챕터 1 - 5 🌳 Magic Tree House - 7. Sunset of the Sabertooth #매트하 #MTH",
        channel: "올리비아Olivia", views: "5,192", length: "22:07" },
      { url: "https://youtu.be/r6TwSlMgjd4", title: "Magic Tree House |#7 Sunset of the Sabertooth | MARY POPE OSBORNE |New York Times Bestselling Series",
        channel: "EUNICE books and words", views: "16,226", length: "35:36" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "sunset",      pos: "n.",   en: "the time in the evening when the sun goes down", ko: "해 질 녘, 일몰",
      ex: "The title of this book is \"{{Sunset}} of the Sabertooth.\"", ex_ko: "이 책의 제목은 '검치호랑이의 해 질 녘'이에요.", pic: "🌇" },
    { word: "sabertooth",  pos: "n.",   en: "a big wild cat of long ago with two very long, sharp teeth", ko: "검치호랑이",
      ex: "Jack and Annie meet {{sabertooth}} tigers.", ex_ko: "잭과 애니는 검치호랑이를 만나요.", pic: "🐅" },
    { word: "mission",     pos: "n.",   en: "an important job that someone is sent to do", ko: "임무",
      ex: "The tree house takes them on a {{mission}} to the Ice Age.", ex_ko: "나무 집은 그들을 빙하기로 가는 임무에 데려가요.", pic: "🎯" },
    { word: "encounter",   pos: "v.",   en: "to meet someone or something, often without planning it", ko: "마주치다, 만나다",
      ex: "They {{encounter}} cave bears in the Ice Age.", ex_ko: "그들은 빙하기에서 동굴곰과 마주쳐요.", pic: "👀" },
    { word: "mammoth",     pos: "n.",   en: "a huge animal of long ago that looked like an elephant with long hair", ko: "매머드",
      ex: "A woolly {{mammoth}} lived in the Ice Age.", ex_ko: "털매머드는 빙하기에 살았어요.", pic: "🦣" },
    { word: "woolly",      pos: "adj.", en: "covered with thick, soft hair like a sheep's wool", ko: "털이 북슬북슬한",
      ex: "Jack and Annie see {{woolly}} mammoths.", ex_ko: "잭과 애니는 털매머드를 봐요.", pic: "🧶" },
    { word: "cave",        pos: "n.",   en: "a large hole in a hill or under rock that animals or people can live in", ko: "동굴",
      ex: "{{Cave}} bears are one of the animals they meet.", ex_ko: "동굴곰은 그들이 만나는 동물 가운데 하나예요.", pic: "🕳️" },
    { word: "prehistoric", pos: "adj.", en: "from a time so long ago that no one wrote anything down yet", ko: "선사 시대의",
      ex: "Cro-Magnons were {{prehistoric}} people.", ex_ko: "크로마뇽인은 선사 시대 사람들이었어요.", pic: "🦴" },
    { word: "transport",   pos: "v.",   en: "to carry a person or thing from one place to another", ko: "실어 나르다, 데려다주다",
      ex: "The magic tree house {{transports}} Jack and Annie.", ex_ko: "마법의 나무 집이 잭과 애니를 데려다줘요.", pic: "🚚" },
    { word: "magic",       pos: "adj.", en: "using powers that seem impossible or mysterious", ko: "마법의, 신기한",
      ex: "Annie says, \"Let's go to the {{magic}} tree house.\"", ex_ko: "애니가 말해요. \"마법의 나무 집으로 가자.\"", pic: "✨" }
  ],

  // ── ①-2 문법 ───────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // Let's 만은 책의 첫 문장("Let's go to the tree house," said Annie.)이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Let's ~", ko: "'우리 ~하자' (제안)",
        sent: "The book begins, \"[[Let's]] go to the tree house,\" said Annie. [[Let's]] means [[let us]].",
        why_ko: "Let's 는 let us 를 줄인 말이에요. '우리 함께 ~하자' 하고 권할 때 써요. Let's 뒤에는 꼭 동사원형!",
        why: "\"Let's\" is short for \"let us.\" It means \"we should do this together.\" A plain verb comes right after it.",
        try: "{{Let's}} go to the tree house. = {{Let us}} go to the tree house." },
      { name: "a / an", ko: "부정관사",
        sent: "The tree house takes Jack and Annie on [[an]] adventure — [[a]] mission to the Ice Age.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a mission.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I read {{a}} book and ate {{an}} orange." },
      { name: "Plural nouns (-s)", ko: "복수 명사",
        sent: "In the Ice Age they meet cave [[bears]], sabertooth [[tigers]], and woolly [[mammoths]].",
        why_ko: "하나가 아니라 여럿이면 명사 끝에 -s 를 붙여요. bear → bears, tiger → tigers, mammoth → mammoths.",
        why: "When there is more than one, add -s to the noun: bear → bears.",
        try: "One {{mammoth}}, two {{mammoths}}." }
    ],
    find: "책에서 -s 로 끝나는 복수 명사를 세 개 찾아 쓰세요. · Find three plural nouns ending in -s.",
    exam: {
      choose: [
        { q: "Annie said, \"(Let's / Lets) go to the tree house.\"", a: "Let's",
          why_ko: "let us 의 us 에서 u 가 빠진 자리에 줄임표(')가 와요. 그래서 Let's 예요." },
        { q: "The tree house took them on (a / an) mission.", a: "a",
          why_ko: "mission 은 '미'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "It took them on (a / an) adventure to the Ice Age.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "In the Ice Age they see woolly (mammoth / mammoths).", a: "mammoths",
          why_ko: "한 마리가 아니라 여러 마리예요. 소개글도 woolly mammoths 라고 복수로 적어요." },
        { q: "Sabertooth (tiger / tigers) are animals they encounter.", a: "tigers",
          why_ko: "are 가 보이면 주어가 복수예요. sabertooth tigers 가 맞아요." }
      ],
      fix: [
        { q: "Annie said, \"[[Lets]] go to the tree house.\"", a: "Let's",
          why_ko: "줄임표(')를 빠뜨렸어요. let us → Let's." },
        { q: "They encounter cave [[bear]] and woolly [[mammoth]].", a: "bears, mammoths",
          why_ko: "소개글이 cave bears, woolly mammoths 라고 여럿으로 적어요. 둘 다 -s 를 붙여요." },
        { q: "The tree house took them on [[a]] adventure.", a: "an",
          why_ko: "adventure 는 모음 소리로 시작해요. an adventure 가 맞아요." }
      ],
      write: [
        { ko: "나무 집으로 가자.", cond: "Let's", a: "Let's go to the tree house.",
          why_ko: "'우리 ~하자'는 Let's + 동사원형이에요. 책의 첫 문장이기도 해요." },
        { ko: "그들은 털매머드들을 만난다.", cond: "woolly mammoths, 복수형", a: "They meet woolly mammoths.",
          why_ko: "여러 마리이니 mammoth 에 -s 를 붙여 mammoths 라고 써요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story?",
      frame: "They are {{Jack and Annie}}." },
    { ref: "책 전체", skill: "사실찾기", q: "What takes Jack and Annie on this adventure?",
      frame: "{{The magic tree house}} takes them." },
    { ref: "책 전체", skill: "사실찾기", q: "What time in history do they travel to?",
      frame: "They go to {{the Ice Age}}." },
    { ref: "책 전체", skill: "사실찾기", q: "Name three things Jack and Annie encounter in the Ice Age.",
      frame: "They encounter {{cave bears}}, {{sabertooth tigers}}, and {{woolly mammoths}}." },
    { ref: "책 첫 문장", skill: "어휘", q: "The book begins, \"Let's go to the tree house,\" said Annie. What does \"Let's\" tell us about how Annie says it?",
      frame: "\"Let's\" means {{                    }}, so Annie is {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "Our description calls this trip a \"mission,\" not a holiday. What is the difference between a mission and a holiday?",
      frame: "A mission is {{                    }}, but a holiday is {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "The Ice Age has cave bears, sabertooth tigers and woolly mammoths in it. Would you go there if the tree house came for you? Say why.",
      frame: "I {{would / would not}} go, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and his friend", "Annie and her cousin", "Two Cro-Magnons"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약과 소개글이 둘 다 \"Jack and Annie\" 라고 말해요.",
      why: "Jack and Annie. Both the catalog summary and the description name them." },
    { q: "What takes Jack and Annie on this adventure?",
      a: ["A time machine", "The magic tree house", "A woolly mammoth", "A boat"], c: 1,
      why_ko: "마법의 나무 집이에요. 요약은 \"The magic tree house takes Jack and Annie\", 소개글은 \"The magic tree house transports Jack and Annie\" 라고 해요.",
      why: "The magic tree house. The summary says it takes them; the description says it transports them." },
    { q: "What time in history do Jack and Annie travel to?",
      a: ["The Middle Ages", "Ancient Egypt", "The Ice Age", "The future"], c: 2,
      why_ko: "빙하기(the Ice Age)예요. 중세는 이 시리즈 2권이고, 이 책은 빙하기예요.",
      why: "The Ice Age. The Middle Ages was book #2; this one is the Ice Age." },
    { q: "The description calls this trip a ___ to the Ice Age.",
      a: ["holiday", "mission", "race", "dream"], c: 1,
      why_ko: "소개글이 고른 낱말이 mission(임무)이에요. 휴가도 경주도 꿈도 아니에요.",
      why: "The description's own word is \"a mission to the Ice Age.\"" },
    { q: "Which people do Jack and Annie meet in the Ice Age?",
      a: ["Knights", "Cro-Magnons", "Pirates", "Astronauts"], c: 1,
      why_ko: "크로마뇽인이에요. 요약과 소개글이 둘 다 Cro-Magnons 라고 적고, 주제어에도 Prehistoric peoples 가 있어요.",
      why: "Cro-Magnons. Both sources name them, and \"Prehistoric peoples\" is one of the subjects." },
    { q: "Which of these animals do Jack and Annie encounter?",
      a: ["Dinosaurs", "Dragons", "Woolly mammoths", "Camels"], c: 2,
      why_ko: "털매머드예요. 소개글이 만나는 것을 넷으로 못박아요 — 크로마뇽인, 동굴곰, 검치호랑이, 털매머드. 공룡도 용도 낙타도 그 안에 없어요.",
      why: "Woolly mammoths. The description lists exactly four: Cro-Magnons, cave bears, sabertooth tigers and woolly mammoths." },
    { q: "What kind of bears do they encounter?",
      a: ["Polar bears", "Cave bears", "Brown bears", "Panda bears"], c: 1,
      why_ko: "동굴곰(cave bears)이에요. 소개글이 그렇게 적어요.",
      why: "Cave bears — the word the description uses." },
    { q: "What animal is in the title of this book?",
      a: ["A sabertooth", "A mammoth", "A cave bear", "A tree frog"], c: 0,
      why_ko: "제목이 \"Sunset of the Sabertooth\" 예요. 검치호랑이가 제목에 들어 있어요.",
      why: "The title is \"Sunset of the Sabertooth.\"" },
    { q: "What does the word \"sunset\" in the title mean?",
      a: ["The first light of morning", "The middle of the night", "The time the sun goes down", "A snowstorm"], c: 2,
      why_ko: "sunset 은 해가 지는 때예요. 아침이 밝는 때(dawn)와 반대예요.",
      why: "Sunset is the time in the evening when the sun goes down." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack couldn't sleep.\"", "\"Let's go to the tree house,\" said Annie.", "\"The snow was deep,\" said Jack.", "\"Look at the mammoth!\" said Annie."], c: 1,
      why_ko: "첫 문장은 \"Let's go to the tree house,\" said Annie. 예요. 오픈라이브러리에 그대로 적혀 있어요. (첫 번째 보기는 이 시리즈 2권의 첫 문장이에요.)",
      why: "\"Let's go to the tree house,\" said Annie. That is the recorded first line. The first choice is book #2's first line." },
    { q: "Who speaks the first sentence of the book?",
      a: ["Jack", "Annie", "A Cro-Magnon", "Their mother"], c: 1,
      why_ko: "애니예요. 첫 문장 끝에 said Annie 라고 적혀 있어요.",
      why: "Annie — the recorded first line ends with \"said Annie.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#5", "#7", "#12"], c: 2,
      why_ko: "7권이에요. 장서 목록 제목이 \"#07. Sunset of the Sabertooth\" 이고 요약 끝에도 Book #7 이라고 적혀 있어요.",
      why: "Book #7 — the catalog title is \"#07. Sunset of the Sabertooth.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["What time they travel to", "Who they meet there", "Which animals they encounter", "How the story ends"], c: 3,
      why_ko: "결말이에요. 우리가 가진 소개글은 '빙하기에서 크로마뇽인과 동물들을 만난다' 에서 멈춰요. 이야기가 어떻게 끝나는지는 책을 읽어야 알 수 있어요.",
      why: "The ending. Our description stops at what they encounter — you have to read the book to find out how it ends." },
    { q: "Is Annie Jack's older sister or his younger sister?",
      a: ["Older sister", "Younger sister", "Our information does not say", "She is his cousin"], c: 2,
      why_ko: "우리 자료는 말해 주지 않아요. 주제어에 Brothers and sisters 가 있어 남매인 것만 알 수 있고, 누가 손위인지는 책을 읽어야 알아요. 모르는 것을 모른다고 말하는 것도 답이에요.",
      why: "Our sources do not say. The subject list only tells us \"Brothers and sisters.\" Read the book to find out." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(두 아이가 바란 것·문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{the Ice Age}}" },   // 빙하기라는 '때'는 근거가 말한다. 어느 '곳'인지는 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바랐는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The book begins, \"Let's go to the tree house,\" said Annie.",
        frame: "The magic tree house takes Jack and Annie on a {{mission}} to {{the Ice Age}}." },
      { label: "The People",
        given: "",
        frame: "In the Ice Age they meet {{Cro-Magnons}}." },
      { label: "The Animals",
        given: "",
        frame: "They encounter {{cave bears}}, {{sabertooth tigers}}, and {{woolly mammoths}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Sunset of the Sabertooth",
    branches: [
      { label: "Jack & Annie",   ask: "Annie speaks the very first sentence: \"Let's go to the tree house.\" What does that tell you about her?",
        deeper: "Our information does not say who is older. Read the book — what do you find out, and how?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie?",
        deeper: "Why do you think a tree house — not a machine — is the thing that carries them through time?" },
      { label: "The Ice Age",    ask: "What would the air, the ground and the sky be like in the Ice Age?",
        deeper: "What would be the very hardest thing about living there for one day?" },
      { label: "Cro-Magnons",    ask: "Cro-Magnons were prehistoric people. What could Jack and Annie learn from them?",
        deeper: "How do you talk with someone whose language you do not know at all?" },
      { label: "The Sabertooth", ask: "The book is named after the sabertooth, not the mammoth. Why might the author choose that animal for the title?",
        deeper: "\"Sunset\" is in the title too. What feeling do the two words make together?" },
      { label: "Me",             ask: "If the tree house gave you a mission, what would you want it to be?",
        deeper: "What would you pack, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Adventure", "Survival", "Discovery"],
    globalContext: "Orientation in space and time — 아주 먼 옛날의 세상은 지금과 어떻게 다른가",
    statement: "Travelling to a time long before our own turns every ordinary thing — the weather, the animals, the people — into something new to learn.",
    factual: [
      "What takes Jack and Annie on this adventure?",
      "What time in history do they travel to?",
      "Which people and which animals do they encounter there?"
    ],
    conceptual: [
      "Why is a trip called a \"mission\" different from a trip called a holiday?",
      "What makes an animal like the sabertooth frightening to us even today?"
    ],
    debatable: [
      "Is it worth going somewhere dangerous in order to learn something new?",
      "Would you rather meet the people of the Ice Age, or its animals?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Knowledgeable"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "빙하기에서 크로마뇽인·동굴곰·검치호랑이·털매머드를 만난다" 까지만 말한다.
    // 그래서 위험을 무릅쓸 가치가 있는가 하는 판단을 아이에게 맡기는 물음으로 세웠다.
    prompt: "In the Ice Age, Jack and Annie encounter cave bears, sabertooth tigers and woolly mammoths. Is it worth going somewhere dangerous to learn something new? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "A Dangerous Mission", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think it is worth going somewhere dangerous if you learn something new.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie go to the Ice Age and meet Cro-Magnons.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they could not learn about the Ice Age by staying home.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say cave bears are too dangerous, but Jack and Annie went anyway.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe some risks are worth taking.", lines: 2 }
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
      { c: "A 분석",  d: "책 속 이야기를 근거로 들어 설명했나요? · Did I use the story as evidence?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  },

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  teaching: {
    goal: {
      en: "Students retell how the magic tree house takes Jack and Annie on a mission to the Ice Age, where they meet Cro-Magnons and encounter cave bears, sabertooth tigers and woolly mammoths, then take a side on whether danger is worth new learning.",
      ko: "마법의 나무 집이 잭과 애니를 빙하기로 데려가 크로마뇽인을 만나고 동굴곰·검치호랑이·털매머드와 마주치는 흐름을 말하고, 새로 배우기 위해 위험을 무릅쓸 가치가 있는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "This book goes to the Ice Age — a time long, long before ours. What do you think you would see there?",
        do: "책을 펴기 전에 한다. 빙하기를 아이 입에서 먼저 꺼내야 이 책이 읽힌다. 서너 명만.",
        exp: "Snow and ice. / Big animals. / Nothing green.",
        stuck: "선생님이 먼저 한 문장 한다. \"I think I would see snow everywhere.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Sunset of the Sabertooth.\" What is a sabertooth? What is sunset?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "A sabertooth is a big cat with long teeth. Sunset is when the sun goes down.",
        stuck: "표지를 가리킨다. \"Look at the cover. What do you see?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "임무 → mission / 동굴 → cave / 마주치다 → encounter",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Grammar", min: "20~28분",
        say: "The book's very first words are Annie's: \"Let's go to the tree house.\" Let's is two words squeezed into one. Which two?",
        do: "칠판에 let us → let's 를 화살표로 쓴다. 줄임표가 빠진 글자 자리라는 것만 보여 준다.",
        exp: "Let us.",
        stuck: "can not → can't 를 먼저 보여 주고 같은 것을 시킨다." },

      { stage: "Comprehension", min: "28~42분",
        say: "Turn the question into the first half of your answer. 'What takes them...' becomes 'The magic tree house takes...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "The magic tree house takes them.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our description says a mission, not a holiday. What is the difference?",
        do: "칠판을 둘로 갈라 mission | holiday 로 적고 아이 말을 양쪽에 받아 적는다.",
        exp: "A mission is a job someone has to do. A holiday is for fun.",
        stuck: "\"Who sends you on a mission? Who sends you on a holiday?\"" },

      { stage: "Summary Map", min: "42~52분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie — Wanted·But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? When do they go?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty today. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those four boxes tomorrow.\"" },

      { stage: "Mind Map", min: "52~62분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Sabertooth)", min: "",
        say: "Stop at The Sabertooth. The book could have been named after the mammoth. Why the sabertooth?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "A sabertooth hunts. A mammoth just walks. The sabertooth makes it scary.",
        stuck: "\"Which of the two would you run from? Now — why does a title want that one?\"" },

      { stage: "IB Inquiry", min: "62~72분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is it worth going somewhere dangerous to learn something new? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because they could never see a woolly mammoth at home.",
        stuck: "손을 들게 한다. \"Go to the Ice Age? Or stay home?\"" },

      { stage: "Writing", min: "72~85분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say cave bears are far too dangerous, but Jack and Annie went anyway.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "85~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about the Ice Age?", ko: "빙하기에 대해 이미 아는 게 있니?" },
        { en: "Which would you rather meet: a woolly mammoth or a sabertooth tiger?", ko: "털매머드와 검치호랑이 중에 어느 쪽을 만나고 싶니?" },
        { en: "The title says sunset, not sunrise. What feeling does that give you?", ko: "제목이 해돋이가 아니라 해 질 녘이야. 어떤 느낌이 드니?" }
      ],
      during: [
        { en: "Cro-Magnons lived long before writing. How would Jack and Annie talk with them?", ko: "크로마뇽인은 글자보다 훨씬 전 사람들이야. 잭과 애니는 어떻게 말을 나눌까?" },
        { en: "Which of the four — Cro-Magnons, cave bears, sabertooth tigers, woolly mammoths — would you meet first?", ko: "크로마뇽인·동굴곰·검치호랑이·털매머드 중 누구를 먼저 만나고 싶니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Our record never said who is older, Jack or Annie. What did the book tell you?", ko: "우리 자료는 잭과 애니 중 누가 손위인지 말해 주지 않았어. 책은 뭐라고 하던?" },
        { en: "Where should the tree house go next, and why?", ko: "나무 집은 다음에 어디로 가야 할까? 왜?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Grammar",       point: "Let's 는 책의 첫 문장에서 그대로 가져왔다. 책을 펴서 확인시킨다.", miss: "Lets 로 쓴다. 줄임표 자리를 손으로 짚어 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Sabertooth' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 이야기가 없으면 근거가 아니다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",     pt: 5, yes: "책 속 이야기를 들어 설명했다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization", pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",        pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",     pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  },

  // ── 낭독녹음 ───────────────────────────────────────────
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 빙하기로 가서 크로마뇽인과 큰 짐승들을 만나는 이야기",
    text: "\"Let's go to the tree house,\" said Annie. The [[wonderful|magic]] tree house carried Jack and Annie away on a [[special job|mission]] to the [[time of ice|Ice Age]]. There they met the [[early people|Cro-Magnons]]. They also [[met|encountered]] cave bears and [[long-toothed|sabertooth]] tigers. Great [[hairy|woolly]] mammoths were there too. What happened after that? Open the book and find out."
  }
};
