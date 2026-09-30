// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Polar Bears Past Bedtime (Magic Tree House #12) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3257.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 북극(the Arctic)으로 데려간다 /
//   그 모험에서 북극곰 한 마리가 아이들을 아주 얇은 얼음 위로 이끈다 /
//   책의 첫 문장은 "Whoo. The strange sound came from outside the open window."
// 그 뒤가 어떻게 되는지, 그 "Whoo" 소리가 무엇이었는지, 결말이 무엇인지는 어느 출처도
// 말하지 않는다. 장서 요약은 "onto very thin ice"에서 그대로 끊긴다. 그래서 비워 두었다.
// 10권과 마찬가지로 이 책의 근거는 두 아이의 나이도, 누가 손위인지도 말하지 않는다. 쓰지 않았다.
// 모건(Morgan)도 수수께끼도 이 책의 근거에는 없다. 그래서 한 번도 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3257",
  slug: "magic-tree-house-polar-bears-past-bedtime",
  title: "Polar Bears Past Bedtime",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #12",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "570L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424010-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·장소 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3257 요약 + 오픈라이브러리 /works/OL81799W (소개글 · 첫 문장 \"Whoo. The strange sound came from outside the open window.\" · 주제어 Fiction/Juvenile fiction/Magic/Polar bear/Tree houses/Bears/Time travel/Polar bears · 장소 Arctic regions/Polar · 80쪽 · 1998년)",
    characters: ["Jack", "Annie", "a polar bear"],
    beats: [
      "the book opens with a strange sound — \"Whoo.\" — coming from outside the open window",
      "in their magic tree house, Jack and Annie travel to the Arctic",
      "in the adventure, a polar bear leads the children onto very thin ice"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"a polar bear leads the children onto very thin ice\" 에서 멈추고, 출판사 소개글도 똑같이 \"onto very thin ice\" 에서 끊긴다. 얇은 얼음 위에서 무슨 일이 벌어지는지, 북극곰이 왜 아이들을 그리로 이끄는지, 두 아이가 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 첫 문장의 \"Whoo\" 가 무엇의 소리인지도 말하지 않는다. 그래서 비워 둔다",
    source_note: "제목의 Past Bedtime 은 '잠잘 시간이 지나서' 라는 뜻이지만, 이야기가 밤에 일어난다고 어느 출처도 말하지 않아 사실로 적지 않고 낱말 뜻으로만 다루었다",
    checked: "장서 요약(\"In their magic tree house\", \"travel to the Arctic\", \"a polar bear leads the children onto very thin ice\", \"Book #12\")과 출판사 소개글(\"Their magic tree house takes Jack and Annie to the Arctic, where a polar bear leads them onto very thin ice.\")을 한 줄씩 맞춰 보았고, 두 글이 같은 것을 말해 어긋나는 곳이 없었다. 장소 목록 Arctic regions/Polar 와 주제어 Polar bear/Bears/Tree houses/Magic/Time travel 이 그 위를 한 번 더 받쳐 주었다. 주제어에 \"Spanish language materials\" 와 \"New York Times bestseller\" 가 있으나 이야기와 상관없는 서지 정보라 학습지 어디에도 쓰지 않았다. 10권과 달리 이 책 근거에는 모건도 수수께끼도 없어 한 글자도 쓰지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Polar Bears Past Bedtime\" read aloud",
    searchUrl: "https://youtu.be/HXRkSfOVOZ0",
    videos: [
      { url: "https://youtu.be/HXRkSfOVOZ0", title: "Magic Tree House | #12 Polar Bears Past Bedtime | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "16,280", length: "40:21" },
      { url: "https://youtu.be/D6kTGIacHtg", title: "Magic Tree House Polar Bears Past Bedtime By Mary Pope Osborne | Chapter Book Read Aloud",
        channel: "Maya Talks", views: "671", length: "47:22" },
      { url: "https://youtu.be/t4dvQDeOMvo", title: "Magic Treehouse: Polar Bears Past Bedtime Chapters 1 2 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "574", length: "8:31" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어·장소 목록에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "polar",     pos: "adj.", en: "having to do with the very cold lands at the top or bottom of the Earth", ko: "극지의, 북극·남극의",
      ex: "A {{polar}} bear lives where it is very cold.", ex_ko: "북극곰은 아주 추운 곳에 살아요.", pic: "🧭" },
    { word: "Arctic",    pos: "n.",   en: "the very cold region around the North Pole", ko: "북극 지방",
      ex: "The magic tree house takes them to the {{Arctic}}.", ex_ko: "마법 나무집은 그들을 북극으로 데려가요.", pic: "❄️" },
    { word: "bear",      pos: "n.",   en: "a large, strong wild animal with thick fur", ko: "곰",
      ex: "A polar {{bear}} walks ahead of the children.", ex_ko: "북극곰 한 마리가 아이들 앞에서 걸어가요.", pic: "🐻‍❄️" },
    { word: "bedtime",   pos: "n.",   en: "the time when you usually go to bed", ko: "잘 시간, 취침 시간",
      ex: "The title of this book is \"Polar Bears Past {{Bedtime}}.\"", ex_ko: "이 책의 제목은 '잘 시간이 지난 북극곰들' 이에요.", pic: "🛏️" },
    { word: "thin",      pos: "adj.", en: "not thick; easy to break through", ko: "얇은",
      ex: "The bear leads them onto very {{thin}} ice.", ex_ko: "그 곰은 아이들을 아주 얇은 얼음 위로 이끌어요.", pic: "📏" },
    { word: "ice",       pos: "n.",   en: "water that has frozen hard", ko: "얼음",
      ex: "In the Arctic there is {{ice}} everywhere.", ex_ko: "북극에는 온통 얼음이에요.", pic: "🧊" },
    { word: "lead",      pos: "v.",   en: "to go in front so that others follow you", ko: "이끌다, 앞장서다",
      ex: "A polar bear {{leads}} the children onto the ice.", ex_ko: "북극곰 한 마리가 아이들을 얼음 위로 이끕니다.", pic: "👣" },
    { word: "strange",   pos: "adj.", en: "not usual; hard to explain", ko: "이상한, 낯선",
      ex: "The {{strange}} sound came from outside the open window.", ex_ko: "그 이상한 소리는 열린 창문 밖에서 들려왔어요.", pic: "😮" },
    { word: "magic",     pos: "adj.", en: "able to do things that cannot really happen in our world", ko: "마법의",
      ex: "Jack and Annie travel in their {{magic}} tree house.", ex_ko: "잭과 애니는 마법 나무집을 타고 여행해요.", pic: "✨" },
    { word: "adventure", pos: "n.",   en: "an exciting trip where something unusual happens", ko: "모험",
      ex: "In the {{adventure}}, the children meet a polar bear.", ex_ko: "그 모험에서 아이들은 북극곰을 만나요.", pic: "🗺️" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // came 만은 책의 첫 문장("Whoo. The strange sound came from outside the open window.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "-s / -es (3인칭 단수 현재)", ko: "3인칭 단수 현재형",
        sent: "A polar bear [[leads]] the children onto very thin ice, and the tree house [[takes]] them to the Arctic.",
        why_ko: "주어가 하나(he·she·it)이고 지금 일이면 동사 뒤에 -s 를 붙여요. a polar bear → leads, the tree house → takes.",
        why: "Add -s to the verb when the subject is one person or thing, in the present.",
        try: "My sister {{walks}} to school and {{reads}} a book on the way." },
      { name: "Past Simple (불규칙)", ko: "불규칙 과거형",
        sent: "The book begins, \"The strange sound [[came]] from outside the open window.\"",
        why_ko: "-ed 를 붙이지 않고 모양이 통째로 바뀌는 동사가 있어요. come → came, take → took, lead → led.",
        why: "Some verbs do not take -ed. Their past form changes shape: come → came, take → took, lead → led.",
        try: "Yesterday my dad {{came}} home late and {{took}} me outside." },
      { name: "형용사 + 명사", ko: "형용사는 명사 앞에",
        sent: "It was a [[strange]] sound, and the children walked on very [[thin]] ice.",
        why_ko: "영어는 꾸미는 말(형용사)이 꾸밈을 받는 말(명사) 앞에 와요. sound strange 가 아니라 strange sound, ice thin 이 아니라 thin ice!",
        why: "In English an adjective comes before the noun it describes: a strange sound, thin ice.",
        try: "I opened the {{open}} window and heard a {{strange}} sound." }
    ],
    find: "책에서 명사 앞에 붙은 형용사를 세 개 찾아 쓰세요. · Find three adjectives that come before a noun.",
    exam: {
      choose: [
        { q: "A polar bear (lead / leads) the children onto very thin ice.", a: "leads",
          why_ko: "주어 a polar bear 는 하나예요. 3인칭 단수 현재이니 leads." },
        { q: "Jack and Annie (travel / travels) to the Arctic.", a: "travel",
          why_ko: "Jack and Annie 는 두 사람, 복수예요. 복수 주어에는 -s 를 붙이지 않아요." },
        { q: "The strange sound (come / came) from outside the open window.", a: "came",
          why_ko: "책의 첫 문장에서 이미 일어난 일이에요. come 의 과거는 comed 가 아니라 came!" },
        { q: "The ice was very (thin / thinly).", a: "thin",
          why_ko: "be동사 was 뒤에는 형용사가 와요. thinly 는 부사라 여기 올 수 없어요." },
        { q: "Jack and Annie heard a (strange sound / sound strange).", a: "strange sound",
          why_ko: "형용사는 명사 앞! sound strange 가 아니라 strange sound 예요." }
      ],
      fix: [
        { q: "A polar bear [[lead]] the children onto very thin ice.", a: "leads",
          why_ko: "주어가 곰 한 마리예요. 3인칭 단수 현재이니 -s 를 붙여 leads." },
        { q: "The strange sound [[come]] from outside the open window.", a: "came",
          why_ko: "지난 일이에요. come 은 불규칙 동사라 과거형이 came." },
        { q: "The children walked on very [[ice thin]].", a: "thin ice",
          why_ko: "형용사가 명사 앞에 와요. ice thin 이 아니라 thin ice!" }
      ],
      write: [
        { ko: "북극곰 한 마리가 아이들을 아주 얇은 얼음 위로 이끈다.", cond: "polar bear, lead, thin ice", a: "A polar bear leads the children onto very thin ice.",
          why_ko: "주어가 하나라 leads. 형용사 thin 은 명사 ice 앞에 와요." },
        { ko: "그 이상한 소리는 열린 창문 밖에서 들려왔다.", cond: "strange, came, window", a: "The strange sound came from outside the open window.",
          why_ko: "come 의 과거는 came. strange 와 open 은 둘 다 명사 앞에 붙어요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them to the Arctic?",
      frame: "They are {{Jack and Annie}}, and {{their magic tree house}} takes them there." },
    { ref: "책 소개글", skill: "사실찾기", q: "Which animal leads Jack and Annie, and what does it lead them onto?",
      frame: "A {{polar bear}} leads them onto {{very thin ice}}." },
    { ref: "첫 문장", skill: "사실찾기", q: "The book begins, \"Whoo. The strange sound came from outside the open window.\" Where did the sound come from?",
      frame: "It came from {{outside the open window}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Polar Bears Past Bedtime.\" What does \"past bedtime\" mean, and how does that make you feel about the story?",
      frame: "\"Past bedtime\" means {{later than the time you go to bed}}. It makes me feel {{                    }}." },
    { ref: "장서 요약", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "추론", skill: "추론·예측", q: "Our summary stops at \"very thin ice.\" What do you think happens next out on that ice?",
      frame: "I think {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Would you follow a wild animal you had never met before? Say why or why not.",
      frame: "I {{would / would not}} follow it, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and a polar bear", "Annie and her teacher", "Two bears"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie travel to the Arctic\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },

    { q: "How do Jack and Annie travel in this book?",
      a: ["In their magic tree house", "On a ship", "In a plane", "On a sled"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"In their magic tree house\" 로 시작하고, 주제어에도 Tree houses 가 있어요.",
      why: "In their magic tree house. The summary opens with those very words." },

    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To the Arctic", "To the desert", "To the Amazon", "To the moon"], c: 0,
      why_ko: "북극(the Arctic)이에요. 소개글이 \"takes Jack and Annie to the Arctic\" 이라고 적고, 장소 목록에도 Arctic regions 가 있어요.",
      why: "The Arctic. The description says so, and \"Arctic regions\" is a listed place." },

    { q: "Which animal leads the children in this story?",
      a: ["A polar bear", "A wolf", "A reindeer", "A seal"], c: 0,
      why_ko: "북극곰이에요. 요약과 소개글이 둘 다 \"a polar bear leads\" 라고 말해요.",
      why: "A polar bear — both the summary and the description say \"a polar bear leads.\"" },

    { q: "What does the polar bear lead the children onto?",
      a: ["Very thin ice", "A high mountain", "A warm beach", "A long bridge"], c: 0,
      why_ko: "아주 얇은 얼음(very thin ice) 위예요. 소개글이 \"onto very thin ice\" 라고 끝맺어요.",
      why: "Very thin ice — the description ends with \"onto very thin ice.\"" },

    { q: "Which word does our description use for the ice?",
      a: ["Thin", "Thick", "Warm", "Blue"], c: 0,
      why_ko: "소개글이 고른 낱말이 바로 thin 이에요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The description's own word is \"thin.\" The other three appear nowhere in our sources." },

    { q: "What is the first sentence of this book?",
      a: ["\"Whoo. The strange sound came from outside the open window.\"", "\"Jack couldn't sleep.\"", "\"The ice was cracking.\"", "\"Annie ran to the tree house.\""], c: 0,
      why_ko: "첫 문장은 \"Whoo. The strange sound came from outside the open window.\" 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line, exactly as Open Library has it." },

    { q: "In the first sentence, where did the strange sound come from?",
      a: ["From outside the open window", "From inside the tree house", "From under the ice", "From the kitchen"], c: 0,
      why_ko: "열린 창문 밖에서 들려왔어요. 첫 문장이 \"from outside the open window\" 라고 말해요.",
      why: "From outside the open window — the book's first sentence says exactly that." },

    { q: "What does \"past bedtime\" in the title mean?",
      a: ["Later than the time you usually go to bed", "Early in the morning", "Right after lunch", "A long time ago"], c: 0,
      why_ko: "잘 시간이 지났다는 뜻이에요. 제목 \"Polar Bears Past Bedtime\" 은 '잘 시간이 지난 북극곰들' 이라는 말이에요.",
      why: "It means later than your usual bedtime. Bedtime is when you normally go to bed." },

    { q: "What is the Arctic?",
      a: ["The very cold region around the North Pole", "A kind of boat", "A big city", "A hot desert"], c: 0,
      why_ko: "북극 둘레의 아주 추운 지방이에요. 장소 목록에 Arctic regions 와 Polar 가 함께 적혀 있어요.",
      why: "The very cold region around the North Pole. \"Arctic regions\" and \"Polar\" are both listed places." },

    { q: "The listed subjects include \"Time travel\" and \"Tree houses.\" Together, what do they tell you?",
      a: ["A tree house carries Jack and Annie through time", "The children build a tree house", "The children study clocks", "The bears live in a tree house"], c: 0,
      why_ko: "나무 집이 두 아이를 시간을 건너 데려간다는 뜻이에요. 주제어 목록에 Tree houses 와 Time travel 이 나란히 있어요.",
      why: "A tree house carries them through time — \"Tree houses\" and \"Time travel\" are listed side by side." },

    { q: "Is this book a true book (nonfiction) or a story (fiction)?",
      a: ["A story — fiction", "A true book — nonfiction", "A dictionary", "A book of poems"], c: 0,
      why_ko: "이야기책, 곧 픽션이에요. 장서 목록이 nf: false 라 적고, 주제어에도 Fiction 과 Juvenile fiction 이 있어요.",
      why: "Fiction. The catalog marks it nf: false, and \"Fiction\" is a listed subject." },

    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#12", "#20"], c: 2,
      why_ko: "12권이에요. 장서 목록 제목이 \"#12. Polar Bears Past Bedtime\" 이고 요약 끝에도 Book #12 라고 적혀 있어요.",
      why: "Book #12 — the catalog title is \"#12. Polar Bears Past Bedtime.\"" },

    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "Which animal leads them", "What happens out on the thin ice", "How they travel"], c: 2,
      why_ko: "얇은 얼음 위에서 무슨 일이 일어나는지예요. 우리가 가진 글은 \"onto very thin ice\" 에서 그대로 멈춰요. 그 뒤는 책을 읽어야 알 수 있어요.",
      why: "What happens on the thin ice. Our sources stop at \"onto very thin ice.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(바라던 것 · 결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    // 때(time)는 어느 출처도 말하지 않는다. 제목의 "Past Bedtime" 은 낱말일 뿐 사실이 아니라 비워 둔다.
    setting: { place: "{{the Arctic}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바랐는지 근거가 말하지 않는다
      { k: "But",      v: "{{a polar bear leads them onto very thin ice}}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Strange Sound",
        given: "The book opens with a sound, before any magic happens.",
        frame: "It begins, \"{{Whoo}}. The {{strange}} sound came from outside the {{open window}}.\"" },
      { label: "The Tree House",
        given: "",
        frame: "In their {{magic tree house}}, Jack and Annie travel to {{the Arctic}}." },
      { label: "The Thin Ice",
        given: "",
        frame: "In the adventure, a {{polar bear}} leads the children onto very {{thin ice}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Polar Bears Past Bedtime",
    branches: [
      { label: "Jack & Annie",   ask: "The book opens with a strange sound outside an open window. What would you do if you heard it?",
        deeper: "Why do you think a story so often starts with something you can hear but cannot see?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose the coldest place on Earth for them?" },
      { label: "The Arctic",     ask: "What do you expect to see in the Arctic? Name three things.",
        deeper: "What would be the hardest part of a day in a place made of ice?" },
      { label: "The Polar Bear", ask: "A polar bear goes in front and the children follow. How would you feel walking behind it?",
        deeper: "Is an animal that leads you always trying to help you? Say why." },
      { label: "Thin Ice",       ask: "Why is very thin ice more dangerous than thick ice?",
        deeper: "People say \"you are on thin ice\" when someone is close to trouble. Why does that saying work?" },
      { label: "Me",             ask: "If the tree house came for you tonight, would you ask it for the Arctic? Why or why not?",
        deeper: "What would you want to find there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Trust", "Risk", "Environment"],
    globalContext: "Orientation in space and time — 얼음으로 된 땅은 우리가 사는 곳과 어떻게 다른가",
    statement: "Following someone into a cold, unknown place asks you to decide how much you trust them.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "Which animal leads them, and onto what?",
      "How does the book begin?"
    ],
    conceptual: [
      "What makes a place like the Arctic hard for people to live in?",
      "What is the difference between being brave and being careless?"
    ],
    debatable: [
      "Should you follow someone when you cannot see where they are taking you?",
      "Is a wild animal ever safe to walk beside?"
    ],
    learnerProfile: ["Inquirer", "Risk-taker", "Reflective"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "얇은 얼음 위로 이끈다" 까지만 말한다. 그 뒤에 무슨 일이 있었는지는 적혀 있지
    // 않으므로, 결말에 대한 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "A polar bear leads Jack and Annie onto very thin ice. Should they follow a wild animal they do not know? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Following the Bear", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think they should not follow a wild animal they do not know.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, a polar bear leads the children onto very thin ice.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the bear took them somewhere that could break under them.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say the bear knows the Arctic best, but the children do not.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would stop before stepping onto thin ice.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to the Arctic, where a polar bear leads them onto very thin ice, and then take a side on whether you should follow a wild animal you do not know.",
      ko: "마법의 나무 집이 잭과 애니를 북극으로 데려가고, 그곳에서 북극곰 한 마리가 아이들을 아주 얇은 얼음 위로 이끄는 흐름을 말하고, 모르는 야생 동물을 따라가야 하는지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "It is night. You are in bed. A strange sound comes from outside your window. What do you do?",
        do: "책을 펴기 전에 한다. 첫 문장의 자리를 아이 몸으로 먼저 겪게 한다. 서너 명만.",
        exp: "I hide. / I look out. / I call my mom.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would pull the blanket over my head.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Polar Bears Past Bedtime.\" What does \"past bedtime\" mean? When is your bedtime?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "It means later than the time you go to bed. My bedtime is nine.",
        stuck: "칠판에 시계를 그린다. \"Your bedtime is nine. Now it is eleven. That is...?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "단어장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "북극 → Arctic / 얇은 → thin / 이끌다 → lead",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Which animal leads...' becomes 'A polar bear leads...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "A polar bear leads them onto very thin ice.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Whoo. The strange sound came from outside the open window.\" Who made that sound? Careful — do we know?",
        do: "칠판에 그 한 문장만 쓴다. 아이들이 부엉이라고 외칠 것이다. 거기서 멈춘다.",
        exp: "An owl! / A bird! → 선생님: \"Maybe. But the sentence does not say. Read and tell me.\"",
        stuck: "\"What does the book actually say? Only three words about it: a strange sound.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / But: a polar bear leads them onto very thin ice",
        stuck: "\"Who travels in this story? What goes wrong out on the ice?\" 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Thin Ice)", min: "",
        say: "Stop at Thin Ice. In English we say \"you are on thin ice.\" Why does that saying work?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Because thin ice can break any second. You are close to trouble.",
        stuck: "\"Stand on thick ice. Now stand on thin ice. What is different in your stomach?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should you follow someone when you cannot see where they are taking you? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think no, because the bear walked onto ice that could break.",
        stuck: "손을 들게 한다. \"Follow the bear? Or stay where the ice is thick?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say the bear knows the Arctic best, but the children do not.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about polar bears and the Arctic?", ko: "북극곰과 북극에 대해 이미 아는 게 있니?" },
        { en: "Have you ever been awake long past your bedtime? What was it like?", ko: "잘 시간이 한참 지나도록 깨어 있어 본 적 있니? 어땠어?" },
        { en: "Have you ever walked on ice or deep snow? Was it safe?", ko: "얼음이나 두꺼운 눈 위를 걸어 본 적 있니? 안전했어?" }
      ],
      during: [
        { en: "The first sentence is just \"Whoo.\" What do you think made that sound?", ko: "첫 문장이 그냥 \"Whoo.\" 야. 무엇이 낸 소리였을까?" },
        { en: "Why do you think a polar bear would lead two children anywhere?", ko: "북극곰이 왜 아이 둘을 어딘가로 이끌었을까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What happened out on the thin ice?", ko: "얇은 얼음 위에서는 무슨 일이 있었니?" },
        { en: "Was the polar bear dangerous in the end, or something else?", ko: "끝까지 읽고 나니 그 북극곰은 위험했니, 아니면 다른 무엇이었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Comprehension", point: "첫 문장의 \"Whoo\" 가 무엇인지 우리는 모른다. 부엉이라고 단정하지 않는다.", miss: "선생님이 먼저 owl 이라고 말해 버린다. 아이가 책에서 확인할 일이 사라진다." },
      { sheet: "Summary Map",   point: "Wanted·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'Thin Ice' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장 · 제목)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 북극으로 가 북극곰을 따라가는 이야기",
    text: "\"Whoo.\" The [[odd|strange]] sound came from outside the open window. In their [[enchanted|magic]] tree house, Jack and Annie travelled to the [[far north|Arctic]]. In the [[exciting trip|adventure]], a [[white bear|polar bear]] went in front and [[took|led]] the children onto very [[not thick|thin]] ice. What happened out there on the ice? Our summary stops right here. Open the book and find out."
  }
};
