// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.1)
// Tonight on the Titanic (Magic Tree House #17) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3261.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 타이타닉호의 갑판(the deck of the Titanic)으로 보낸다 /
//   거기서 신비한 선물(a mysterious gift)을 찾아야 한다 / 그 선물이 둘의 강아지(their puppy ·
//   a small dog)를 지독한 마법 주문(a terrible magic spell)에서 풀어 준다 /
//   책의 첫 문장은 "Jack opened his eyes."
// 선물이 무엇인지, 둘이 그것을 찾아내는지, 강아지가 풀려나는지는 어느 출처도 말하지 않는다.
// 장서 요약도 소개글도 "찾아야 한다"에서 끊긴다. 그래서 비워 두었다.
// 타이타닉은 실제로 있었던 배지만, 근거가 말하지 않는 것(빙산·침몰 시각·구명보트·사망자 수·
// 연도)은 우리가 따로 아는 것이라 해도 학습지 어디에도 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3261",
  slug: "magic-tree-house-tonight-on-the-titanic",
  title: "Tonight on the Titanic",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #17",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.1", lexile: "550L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424175-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 타이타닉에 대해 사람이 따로 아는 것은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3261 요약 + 오픈라이브러리 /works/OL81835W (소개글 · 첫 문장 \"Jack opened his eyes.\" · 주제어 Titanic (Steamship)/Magic/Shipwrecks/Time travel/Survival/Survival skills · 96쪽 · 1999년)",
    characters: ["Jack", "Annie", "their puppy (소개글에서는 a small dog)"],
    beats: [
      "the magic tree house takes Jack and Annie to the deck of the Titanic",
      "there they have to find a mysterious gift",
      "that gift will free their puppy from a terrible magic spell"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"they have to find a mysterious gift\" 에서 멈추고, 소개글도 \"to find a mysterious gift that will free a small dog from a magic spell\" 에서 끊긴다. 그 선물이 무엇인지, 두 아이가 그것을 찾아내는지, 강아지가 풀려나는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 장서 목록이 아이에게 던지라고 적어 둔 물음도 \"신비한 선물이 무엇일 것 같은지 써 보라\" 이다. 그래서 비워 둔다",
    checked: "장서 요약(\"the magic tree house takes Jack and Annie to the deck of the Titanic\", \"a mysterious gift\", \"free their puppy\", \"a terrible magic spell\", \"Book #17\")과 소개글(\"transports Jack and Annie to the deck of the Titanic\", \"a small dog\", \"a magic spell\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 다른 곳은 요약이 \"their puppy\", 소개글이 \"a small dog\" 이라고 적은 자리뿐인데, 둘 다 같은 강아지를 가리키므로 요약 쪽(둘의 강아지)을 따랐다. 주제어 Titanic (Steamship)/Magic/Time travel 이 같은 것을 가리켜 한 번 더 받쳐 주었다. 주제어에 Shipwrecks·Survival·Survival skills 가 있고 장소 태그에 Nordatlantik·Great Plains 가 있으나, 이야기 안에서 배가 어떻게 되는지·두 아이가 어디를 지나는지는 어느 출처도 말하지 않아 학습지 어디에도 쓰지 않았다. 배가 가라앉는지, 언제 일어난 일인지도 근거가 말하지 않아 한 글자도 쓰지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Tonight on the Titanic\" read aloud",
    searchUrl: "https://youtu.be/jGVe02TqOmQ",
    videos: [
      { url: "https://youtu.be/jGVe02TqOmQ", title: "Magic Tree House | #17 Tonight on the Titanic | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "16,331", length: "38:21" },
      { url: "https://youtu.be/QQpQCKPhn1M", title: "Magic Treehouse: Tonight on the Titanic Chapters 1 2 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "1,056", length: "8:22" },
      { url: "https://youtu.be/0nuTGxfy3HU", title: "S5 5033 Magic Tree House #17 Tonight on the Titanic Part A",
        channel: "Uncle John", views: "554", length: "23:27" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "deck",      pos: "n.",   en: "the flat floor of a ship that you can walk on", ko: "갑판",
      ex: "Jack and Annie stand on the {{deck}} of the Titanic.", ex_ko: "잭과 애니는 타이타닉호의 갑판에 서 있어요.", pic: "🚢" },
    { word: "steamship", pos: "n.",   en: "a large ship that is moved by the power of steam", ko: "증기선",
      ex: "The Titanic was a very large {{steamship}}.", ex_ko: "타이타닉은 아주 큰 증기선이었어요.", pic: "⚓" },
    { word: "tonight",   pos: "adv.", en: "on this evening or on this night", ko: "오늘 밤에",
      ex: "The title of this book is \"{{Tonight}} on the Titanic.\"", ex_ko: "이 책의 제목은 '오늘 밤 타이타닉에서'예요.", pic: "🌙" },
    { word: "mysterious",pos: "adj.", en: "strange, and not explained or understood yet", ko: "신비한, 알 수 없는",
      ex: "They have to find a {{mysterious}} gift.", ex_ko: "그들은 신비한 선물을 찾아야 해요.", pic: "🔮" },
    { word: "gift",      pos: "n.",   en: "something you give to somebody; a present", ko: "선물",
      ex: "The {{gift}} is hidden somewhere on the ship.", ex_ko: "그 선물은 배 어딘가에 있어요.", pic: "🎁" },
    { word: "free",      pos: "v.",   en: "to let a person or an animal go, so they are not held any more", ko: "풀어 주다, 자유롭게 하다",
      ex: "The gift will {{free}} their puppy.", ex_ko: "그 선물이 그들의 강아지를 풀어 줄 거예요.", pic: "🕊️" },
    { word: "spell",     pos: "n.",   en: "magic words that make something happen to a person or an animal", ko: "마법 주문",
      ex: "A terrible magic {{spell}} holds the puppy.", ex_ko: "지독한 마법 주문이 강아지를 붙들고 있어요.", pic: "✨" },
    { word: "puppy",     pos: "n.",   en: "a young dog", ko: "강아지",
      ex: "Jack and Annie want to save their {{puppy}}.", ex_ko: "잭과 애니는 자기들의 강아지를 구하고 싶어 해요.", pic: "🐶" },
    { word: "shipwreck", pos: "n.",   en: "a ship that has been broken or lost at sea", ko: "난파선, 난파",
      ex: "\"{{Shipwrecks}}\" is one of the subject words for this book.", ex_ko: "'난파'는 이 책의 주제어 가운데 하나예요.", pic: "🌊" },
    { word: "survival",  pos: "n.",   en: "staying alive when something dangerous happens", ko: "생존",
      ex: "\"{{Survival}}\" is also listed as a subject of this book.", ex_ko: "'생존'도 이 책의 주제어로 적혀 있어요.", pic: "🆘" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // opened 만은 책의 첫 문장("Jack opened his eyes.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The book begins, \"Jack [[opened]] his eyes.\"",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. open → opened, want → wanted.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{opened}} the door and {{walked}} inside." },
      { name: "have to + 동사원형", ko: "~해야 한다",
        sent: "On the Titanic, Jack and Annie [[have to find]] a mysterious gift.",
        why_ko: "꼭 해야 하는 일은 have to 예요. 뒤에는 반드시 동사원형! have to find (O), have to found (X).",
        why: "Use \"have to\" for something you must do. The base verb comes right after it.",
        try: "I {{have to}} read this book, and my sister {{has to}} help me." },
      { name: "to + 동사원형 (목적)", ko: "~하기 위해",
        sent: "The tree house takes them to the Titanic [[to find]] a mysterious gift.",
        why_ko: "'~하려고, ~하기 위해'는 to + 동사원형이에요. for find 가 아니라 to find!",
        why: "Use \"to + base verb\" to say why somebody does something.",
        try: "Annie went outside {{to look}} at the sea." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "The book begins, \"Jack (open / opened) his eyes.\"", a: "opened",
          why_ko: "이미 일어난 일이에요. open 에 -ed 를 붙여 opened!" },
        { q: "Jack and Annie (have to / have) find a mysterious gift.", a: "have to",
          why_ko: "'꼭 찾아야 한다'는 뜻이니 have to 예요." },
        { q: "They have to (find / found) a mysterious gift.", a: "find",
          why_ko: "have to 뒤에는 늘 동사원형이 와요. found 가 아니라 find!" },
        { q: "They go to the Titanic (for find / to find) a gift.", a: "to find",
          why_ko: "'찾기 위해'는 to + 동사원형이에요. for find 는 쓰지 않아요." },
        { q: "The gift will free their puppy (from / of) a magic spell.", a: "from",
          why_ko: "free A from B — '무엇에서 풀어 주다'에는 from 을 써요." }
      ],
      fix: [
        { q: "Jack [[open]] his eyes at the start of the book.", a: "opened",
          why_ko: "이미 지난 일이에요. 과거형 opened 로 고쳐요." },
        { q: "Jack and Annie [[has to]] find a mysterious gift.", a: "have to",
          why_ko: "Jack and Annie 는 두 사람, 복수예요. 복수 주어에는 have to." },
        { q: "The tree house takes them to the ship [[for find]] a gift.", a: "to find",
          why_ko: "'찾기 위해'는 to find 예요. for 뒤에 동사원형은 오지 않아요." }
      ],
      write: [
        { ko: "잭이 눈을 떴다.", cond: "open, 과거형", a: "Jack opened his eyes.",
          why_ko: "'떴다'는 지난 일이니 opened. 눈은 둘이라 eyes 로 써요." },
        { ko: "그들은 신비한 선물을 찾아야 한다.", cond: "have to, find", a: "They have to find a mysterious gift.",
          why_ko: "have to 뒤에는 동사원형 find 가 와요. gift 앞에는 a 를 붙여요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what takes them to the Titanic?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them there." },
    { ref: "책 소개글", skill: "사실찾기", q: "Where exactly on the Titanic does the tree house take Jack and Annie?",
      frame: "It takes them to {{the deck}} of the Titanic." },
    { ref: "장서 요약", skill: "사실찾기", q: "What do Jack and Annie have to find, and what will it do?",
      frame: "They have to find {{a mysterious gift}}, and it will {{free their puppy from a magic spell}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Tonight on the Titanic.\" What does \"tonight\" tell you about when the story happens?",
      frame: "\"Tonight\" means {{this evening or night}}, so the story happens {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book's first sentence is \"Jack opened his eyes.\" What do you think he saw first?",
      frame: "I think he saw {{                    }}, because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "The gift is called \"mysterious,\" so we are not told what it is. What do you think it turns out to be?",
      frame: "I think the gift is {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and a sailor", "Annie and a ship captain", "Two puppies"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"takes Jack and Annie to the deck of the Titanic\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What takes Jack and Annie to the Titanic?",
      a: ["The magic tree house", "A small boat", "A train", "A magic carpet"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약과 소개글이 둘 다 the magic tree house 라고 적고 있어요.",
      why: "The magic tree house — both the summary and the description say so." },
    { q: "Where on the ship does the tree house take them?",
      a: ["To the deck", "To the kitchen", "To the engine room", "To the captain's bed"], c: 0,
      why_ko: "갑판(the deck)이에요. \"to the deck of the Titanic\" 이라고 두 출처가 똑같이 적었어요.",
      why: "The deck. Both sources say \"to the deck of the Titanic.\"" },
    { q: "What kind of thing is the Titanic?",
      a: ["A ship", "A city", "A train", "A castle"], c: 0,
      why_ko: "배예요. 오픈라이브러리 주제어에 \"Titanic (Steamship)\" 이라고 적혀 있고, 갑판(deck)이 있는 것도 배니까요.",
      why: "A ship. The subject list records it as \"Titanic (Steamship)\", and it has a deck." },
    { q: "What do Jack and Annie have to find there?",
      a: ["A mysterious gift", "A treasure map", "A magic book", "A golden key"], c: 0,
      why_ko: "신비한 선물(a mysterious gift)이에요. 요약이 \"they have to find a mysterious gift\" 라고 말해요.",
      why: "A mysterious gift — \"they have to find a mysterious gift.\"" },
    { q: "Why do they have to find it?",
      a: ["To free their puppy from a magic spell", "To sell it", "To give it to the captain", "To take it home for fun"], c: 0,
      why_ko: "강아지를 마법 주문에서 풀어 주기 위해서예요. 그것 말고 다른 이유는 근거 어디에도 없어요.",
      why: "To free their puppy from a magic spell. No other reason appears in our sources." },
    { q: "Whose puppy is under the spell?",
      a: ["Jack and Annie's", "The captain's", "A sailor's", "A stranger's"], c: 0,
      why_ko: "장서 요약이 \"their puppy\" 라고 적었어요. 두 아이의 강아지예요. 소개글에서는 같은 강아지를 \"a small dog\" 라고 불러요.",
      why: "Theirs — the summary says \"their puppy.\" The description calls the same dog \"a small dog.\"" },
    { q: "Which word does the catalog summary use for the spell?",
      a: ["Terrible", "Tiny", "Friendly", "Funny"], c: 0,
      why_ko: "\"a terrible magic spell\" 이라고 적혀 있어요. 나머지 셋은 근거 어디에도 없어요.",
      why: "\"A terrible magic spell.\" The other three appear nowhere in our sources." },
    { q: "What does the word \"mysterious\" mean?",
      a: ["Strange and not explained yet", "Very heavy", "Brand new", "Very loud"], c: 0,
      why_ko: "아직 무엇인지 알 수 없고 알쏭달쏭하다는 뜻이에요. 그래서 우리도 그 선물이 무엇인지 모르는 거예요.",
      why: "Strange and not yet explained — which is why we are not told what the gift is." },
    { q: "What is the \"deck\" of a ship?",
      a: ["The flat floor you can walk on", "The room where the food is cooked", "The rope at the front", "The flag on top"], c: 0,
      why_ko: "갑판은 배 위에서 걸어 다닐 수 있는 평평한 바닥이에요. 두 아이가 도착한 곳이 바로 거기예요.",
      why: "The flat floor of a ship you can walk on — the place Jack and Annie arrive." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack opened his eyes.\"", "\"Annie ran to the ship.\"", "\"The sea was quiet.\"", "\"Jack and Annie were sitting on the porch.\""], c: 0,
      why_ko: "첫 문장은 \"Jack opened his eyes.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. \"Jack and Annie were sitting on the porch of their house.\" 는 10권의 첫 문장이에요.",
      why: "That is the recorded first line. The porch sentence opens book #10, not this one." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#7", "#10", "#17", "#27"], c: 2,
      why_ko: "17권이에요. 장서 목록 제목이 \"#17. Tonight on the Titanic\" 이고 요약 끝에도 Book #17 이라고 적혀 있어요.",
      why: "Book #17 — the catalog title is \"#17. Tonight on the Titanic.\"" },
    { q: "Which subject word tells us Jack and Annie move to another time?",
      a: ["Time travel", "Cooking", "Baseball", "School life"], c: 0,
      why_ko: "\"Time travel\" 이에요. 오픈라이브러리 주제어 목록에 Magic, Time travel 이 나란히 적혀 있어요.",
      why: "\"Time travel\" — it sits in the subject list next to \"Magic.\"" },
    { q: "Which of these does our information NOT tell us?",
      a: ["Who the two children are", "Where the tree house takes them", "What the mysterious gift is", "Why they need the gift"], c: 2,
      why_ko: "그 선물이 무엇인지예요. 우리가 가진 글은 '신비한 선물을 찾아야 한다' 에서 멈춰요. 무엇인지는 책을 읽어야 알 수 있어요.",
      why: "What the gift is. Our sources stop at \"they have to find a mysterious gift.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(막는 것·그 다음)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{the deck of the Titanic}}", time: "{{tonight — 우리 자료는 날짜를 말하지 않는다}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to find a mysterious gift}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house takes Jack and Annie away.",
        frame: "It takes them to {{the deck}} of {{the Titanic}}." },
      { label: "The Search",
        given: "",
        frame: "On the ship they have to find {{a mysterious gift}}." },
      { label: "The Spell",
        given: "",
        frame: "That gift will {{free}} their {{puppy}} from a terrible magic {{spell}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Tonight on the Titanic",
    branches: [
      { label: "Jack & Annie",  ask: "The book opens with \"Jack opened his eyes.\" What do you think he saw?",
        deeper: "Why might a writer start a story at the moment somebody wakes up?" },
      { label: "The Tree House",ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think it puts them on a ship instead of on land?" },
      { label: "The Deck",      ask: "What do you think you would see and hear standing on the deck of a huge ship at night?",
        deeper: "Why is a ship a hard place to search? You cannot just walk away from it." },
      { label: "The Gift",      ask: "The gift is called mysterious. What could a gift be, if it is strong enough to break a spell?",
        deeper: "Does a gift have to be big or costly to matter? Say why." },
      { label: "The Puppy",     ask: "Their puppy is held by a terrible magic spell. How would you feel if it were your pet?",
        deeper: "What would you be willing to do for an animal that cannot ask you for help?" },
      { label: "Me",            ask: "If the tree house came for you tonight, would you step onto the Titanic's deck? Why or why not?",
        deeper: "What would you look for first, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Mystery", "Loyalty", "Evidence"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 곳의 하룻밤은 지금 우리와 어떻게 다른가",
    statement: "People will go a long way, and into a strange place, for someone they love.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "What do they have to find there?",
      "What will that gift do for their puppy?"
    ],
    conceptual: [
      "Why is it harder to search for something when you do not know what it looks like?",
      "What is the difference between a present and a gift that really matters?"
    ],
    debatable: [
      "Should you take a risk for a pet the way you would for a person?",
      "Is it braver to go somewhere strange, or to go there without knowing what you are looking for?"
    ],
    learnerProfile: ["Inquirer", "Caring", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "신비한 선물을 찾아야 한다" 까지만 말한다. 두 아이가 찾았는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie go onto the deck of the Titanic to find a gift that will free their puppy. Would you do the same for your pet? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "For My Puppy", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I would go onto that ship for my pet.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie look for a gift to free their puppy.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they went to a strange place for an animal they love.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a ship at night is too dangerous, but the puppy cannot help itself.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a pet is worth the trouble.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to the deck of the Titanic, where they have to find a mysterious gift that will free their puppy from a terrible magic spell, then take a side on how far they would go for a pet.",
      ko: "마법의 나무 집이 잭과 애니를 타이타닉호 갑판으로 데려가고, 두 아이가 강아지를 지독한 마법 주문에서 풀어 줄 신비한 선물을 찾아야 하는 흐름을 말하고, 반려동물을 위해 어디까지 할 수 있는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 타이타닉에 대해 선생님이 따로 아는 것(빙산·침몰·연도)은 오늘 말하지 않는다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever heard the name Titanic before? What kind of thing is it?",
        do: "장서 목록이 적어 둔 물음 그대로다. 서너 명만 받는다. 아이가 아는 것을 말하면 받아 주되, 선생님이 침몰 이야기를 보태지 않는다.",
        exp: "A big ship. / A boat on the sea.",
        stuck: "제목을 손으로 짚는다. \"Tonight on the... what?\"" },

      { stage: "Warm-up", min: "",
        say: "The title says tonight. Not yesterday, not next year — tonight. What does that make you feel?",
        do: "제목 한 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "It sounds close. / It sounds like it is happening now.",
        stuck: "\"Say it again: tonight. Is that far away or very near?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "갑판 → deck / 선물 → gift / 마법 주문 → spell",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does it take them...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to the deck of the Titanic.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack opened his eyes.\" Four words. What do you think he saw?",
        do: "칠판에 그 한 문장만 쓴다. 답은 여럿이어도 좋다고 미리 말해 준다.",
        exp: "The sea. / The ship. / A dark sky.",
        stuck: "\"What is the first thing YOU see when you open your eyes in the morning?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to find a mysterious gift — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they looking for?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Gift)", min: "",
        say: "Stop at The Gift. Our book summary calls it mysterious — that means even we do not know what it is. So guess, and say why.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 아이의 추측을 칠판에 다 적어 둔다.",
        exp: "Maybe it is something small. / Maybe it belonged to someone on the ship.",
        stuck: "\"What kind of thing could be strong enough to break a spell?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Would you take that risk for a pet, the way you would for a person? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because a puppy cannot save itself.",
        stuck: "손을 들게 한다. \"Step onto the deck? Or stay in the tree house?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a ship at night is too dangerous, but the puppy cannot help itself.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What ship do you think Jack and Annie visit in this book?", ko: "이 책에서 잭과 애니는 어떤 배에 갈 것 같니?" },
        { en: "Have you ever heard the story of the Titanic before?", ko: "타이타닉 이야기를 들어 본 적 있니?" },
        { en: "If a spell held your pet, how far would you go to break it?", ko: "마법이 네 반려동물을 붙들고 있다면, 어디까지 갈 수 있겠니?" }
      ],
      during: [
        { en: "The gift is called mysterious. Write what you think it turns out to be.", ko: "선물을 '신비한' 것이라고 해. 그게 무엇일 것 같은지 써 보렴." },
        { en: "What is the hardest part of searching a huge ship at night?", ko: "밤에 거대한 배를 뒤지는 일에서 가장 어려운 건 뭘까?" }
      ],
      after: [
        { en: "What was the mysterious gift? Tell me what our summary did not tell us.", ko: "신비한 선물은 무엇이었니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did the gift free the puppy? How?", ko: "그 선물이 강아지를 풀어 주었니? 어떻게?" },
        { en: "How do Jack and Annie get away from the ship in the end?", ko: "잭과 애니는 마지막에 그 배에서 어떻게 빠져나오니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Gift' 가지에서 반드시 멈춘다. 추측을 칠판에 다 적어 둔다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 선물의 정체도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 타이타닉호 갑판에 내려 신비한 선물을 찾는 이야기",
    text: "Jack opened his eyes. The magic tree house had taken him and Annie to the [[floor of the ship|deck]] of the Titanic, a huge [[ship|steamship]]. Somewhere on board there was a [[strange|mysterious]] [[present|gift]]. They had to find it, because only that gift could [[let go|free]] their [[little dog|puppy]] from a terrible magic [[charm|spell]]. What was the gift? Did they find it in time? Open the book and find out."
  }
};
