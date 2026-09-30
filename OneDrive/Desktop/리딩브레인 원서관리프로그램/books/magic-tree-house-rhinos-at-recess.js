// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.4)
// Rhinos at Recess (Magic Tree House #37) — 우리는 이 책을 읽지 않았다.
// 이 책은 33권보다도 근거가 얇다. 오픈라이브러리 기록이 두 건 있으나 두 건 모두
// 소개글(desc)이 비어 있고 첫 문장(first)도 없다. 그리고 두 건 모두 주제어 목록이
// 통째로 비어 있다 — 33권에는 그나마 "Children's fiction" 한 줄이 있었는데 여기엔 그것도 없다.
// 인물·지명 목록도 둘 다 비어 있다.
// 우리가 가진 것은 학원 장서 목록의 한 줄 요약과 발문 세 개가 전부다.
// 그래서 분량을 채우지 않았다. 근거가 버티는 만큼만 만들고, 버티지 않는 자리는 비워 두었다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 남아프리카(South Africa)로 데려간다(transports) /
//   거기서 두 아이는 늠름한(majestic) 코뿔소 한 마리를 밀렵꾼(poachers)들로부터
//   지켜야(must protect) 한다 / 86쪽(다른 기록은 96쪽) · 2023년 /
//   장서 목록의 갈래는 Chapter Books, 주제는 Animals, 지어낸 이야기(nf: false) /
//   이 시리즈의 37권 · 제목은 "Rhinos at Recess"
//
// ★ 이 학습지는 밀렵을 그리지 않는다.
//   poachers 는 근거에 있는 낱말이라 쓴다. 그러나 그들이 무엇을 노리는지, 코뿔소에게
//   무슨 일이 일어나는지는 한 글자도 쓰지 않았다. 근거도 그런 말을 하지 않는다.
//   아홉 살 아이가 보는 종이다. 이 학습지가 다루는 방향은 "지키는 일" 하나다 —
//   장서 발문 자체가 "동물을 지켜 주고 싶었던 적이 있니", "코뿔소를 안전하게 하려면
//   무엇을 하겠니" 라고 묻는다. 그 방향을 그대로 이어받았다.
//
// 코뿔소에 대해서는 한 글자도 설명하지 않았다. 어떻게 생겼는지, 무엇을 먹는지,
// 몇 마리가 남았는지 — 어느 것도 근거에 없다. 33권에서 일각고래를 되물었던 것과 같다.
// 남아프리카도 마찬가지다. 어느 대륙인지, 사파리·초원·다른 동물 — 한 글자도 쓰지 않았다.
// 쓸 수 있는 말은 지명 South Africa 하나뿐이다.
// 제목의 "Recess" 는 요약이 한 번도 말하지 않는다. 낱말 뜻까지만 다루고,
// 이야기와 어떻게 이어지는지는 단정하지 않고 아이가 책에서 찾도록 물음으로 두었다.
// 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 시작 줄을 모두 뺐다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3941",
  slug: "magic-tree-house-rhinos-at-recess",
  title: "Rhinos at Recess",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #37",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 33권(AR 3.4)과 AR 이 같아 그에 맞췄다.
  level: { ar: "3.4", lexile: "390L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/13536946-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약과 발문 세 개를 바닥으로 삼았다. 오픈라이브러리 기록 두 건은 열어 보았으나 가져올 것이 쪽수·출간연도뿐이었다 — 주제어 목록이 두 건 다 비어 있었다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3941 요약(\"The magic tree house transports Jack and Annie to South Africa where they must protect a majestic rhino from poachers.\")과 발문 세 개(\"What must Jack and Annie protect the rhino from?\" / \"Have you ever wanted to protect an animal?\" / \"What would you do to keep a rhino safe from poachers?\") + 장서 목록의 갈래 Chapter Books · 주제 Animals · nf false(지어낸 이야기) · 제목 \"#37 Rhinos at Recess\" + 오픈라이브러리 /works/OL28409296W (주제어 목록이 비어 있음 · 인물 목록 비어 있음 · 지명 목록 비어 있음 · 96쪽 · 2023년 · 소개글 없음 · 첫 문장 없음 · 그림 A. G. Ford) + 오픈라이브러리 /works/OL39182585W (주제어 목록이 비어 있음 · 86쪽 · 2023년 · 소개글 없음 · 첫 문장 없음). 주제어가 비어 있었다는 사실을 그대로 적는다 — 없는 것을 있는 것처럼 적지 않았다",
    characters: ["Jack", "Annie"],
    beats: [
      "the magic tree house transports Jack and Annie to South Africa",
      "there, they must protect a majestic rhino from poachers"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"they must protect a majestic rhino from poachers\" 에서 그대로 끝난다. 두 아이가 지켜 냈는지, 어떤 방법으로 지켰는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "우리가 모르는 것을 또렷이 적어 둔다. ① 제목의 \"Recess\" 가 이야기와 어떻게 이어지는지 — 요약이 그 말을 한 번도 하지 않는다. 학교 쉬는 시간인지 다른 뜻인지 어느 출처도 말하지 않는다. 그래서 낱말 뜻까지만 다루고 단정하지 않았다. ② 코뿔소가 어떻게 생겼는지 — 한 글자도 없다. 크기·빛깔·생김새 어느 것도 근거에 없다. ③ 코뿔소가 무엇을 먹고 어디에 사는지 — 없다. ④ 왜 \"majestic\"(늠름한) 이라고 불리는지 — 요약이 그 낱말만 던지고 설명하지 않는다. ⑤ 두 아이가 어떤 방법으로 지키는지 — 없다. 요약은 \"지켜야 한다\" 에서 끊긴다. ⑥ 지켜 냈는지 — 없다. ⑦ 남아프리카가 어떤 곳인지 — 지명 South Africa 말고는 한 줄도 없다. 날씨·땅·사는 사람들·다른 동물 — 아무것도 없다. ⑧ 임무를 누가 주었는지, 모건이나 수수께끼가 나오는지 — 없다. ⑨ 등장인물은 잭과 애니 둘이 전부다. 오픈라이브러리 인물 목록이 비어 있다. ⑩ 책의 첫 문장 — 두 기록 어디에도 없다. ⑪ 주제어 — 두 기록 다 목록이 통째로 비어 있었다. ⑫ 장(chapter) 구성과 각 장에서 무슨 일이 일어나는지 — 없다. 그래서 이 학습지에는 장 번호가 한 번도 나오지 않는다",
    checked: "장서 요약의 낱말(magic tree house / transports / South Africa / must protect / a majestic rhino / poachers)과 제목 낱말(Rhinos · Recess), 장서 발문 세 줄, 장서 목록의 갈래(Chapter Books)·주제(Animals)·nf(false)를 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 오픈라이브러리 두 기록은 desc 와 first 가 모두 빈 칸이었고 subjects 도 빈 목록이었다. 쪽수가 96쪽과 86쪽으로 서로 달라 판이 다른 것으로 보고 어느 쪽도 학습지에 쓰지 않았다. 코뿔소를 '동물' 로 부른 것은 장서 발문이 \"protect a rhino\" 바로 옆에 \"protect an animal\" 을 나란히 놓았기 때문이고, 거기까지가 우리 근거다. 밀렵이 무엇을 노리는 일인지는 근거가 말하지 않으므로 이 종이 어디에도 적지 않았다 — poacher 는 낱말 뜻(법이 허락하지 않는데 야생 동물을 잡아가는 사람)에서 멈추고, 다루는 방향을 장서 발문이 가리키는 '지키는 일' 로 돌렸다. 그 밖의 코뿔소 지식과 남아프리카 지식은 한 글자도 쓰지 않았다. 33권과 마찬가지로 첫 문장이 없어 첫 문장을 묻는 문항과 문법 보기를 뺐고, 퀴즈는 14개가 아니라 11개로 줄였다 (2026-09-30)",
  },

  // 낭독 영상 — S3941.json 의 videos 에서 제목을 하나하나 확인해 골랐다 (2026-09-30).
  // 세 편 모두 제목에 "Rhinos at Recess" 가 들어 있어 이 권이 맞다. 다른 권이 섞인 영상은 없었다.
  // 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 이 권은 통본(책 한 권 전체) 낭독 영상을 확인하지 못했다. 조각 영상뿐이라 장 차례대로
  // 1~2장 → 3장 → 7장 순으로 놓았다. 사이가 비는 장과 뒷부분은 아이가 책으로 읽는다.
  // 따로 받아 둔 영상 후보 목록(vid-S3941.json)에는 The Halfling Storytime 의 5분대 영상 두 편도
  // 있었으나, 고르는 자리는 S3941.json 의 videos 라 거기서만 골랐다.
  shadowing: {
    query: "\"Rhinos at Recess\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/MXFkCc1LXIQ",
    videos: [
      { url: "https://youtu.be/MXFkCc1LXIQ", title: "Magic Tree House #37 Rhinos at Recess by Mary Pope Osborne - Chapter 1 - 2 | Kid books read aloud",
        channel: "Quynh Giang English", views: "2,601", length: "14:37" },
      { url: "https://youtu.be/LqX01r2KzF4", title: "Magic Tree House #37 Rhinos at Recess by Mary Pope Osborne - Chapter 3",
        channel: "", views: "", length: "" },
      { url: "https://youtu.be/FrAkdMBJYK4", title: "Magic Tree House #37 Rhinos at Recess by Mary Pope Osborne - Chapter 7",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 장서 요약 한 줄 · 책 제목 · 장서 발문에 실제로 나오는 말에서만 골랐다.
  // 코뿔소의 생태를 설명하는 낱말(grass, Africa, safari, wild ...)은 한 개도 끌어오지 않았다.
  // rhino 는 뜻을 적지 않고 되물었다 — 생김새가 우리 근거에 없기 때문이다.
  // poacher 는 근거의 낱말이라 넣었으나 낱말 뜻에서 멈췄다. 그 일이 어떤 일인지는 적지 않는다.
  // recess 는 낱말 뜻만 적고, 이야기와 어떻게 이어지는지는 되물었다 — 요약이 그 말을 하지 않는다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "magic",        pos: "adj.", en: "having special powers that cannot happen in real life", ko: "마법의",
      ex: "The {{magic}} tree house takes Jack and Annie away.", ex_ko: "마법의 나무 집이 잭과 애니를 데려가요.", pic: "🪄" },
    { word: "tree house",   pos: "n.",   en: "a small house built up in the branches of a tree", ko: "나무 위의 집",
      ex: "The magic {{tree house}} transports them to South Africa.", ex_ko: "마법의 나무 집이 둘을 남아프리카로 데려가요.", pic: "🌳" },
    { word: "transport",    pos: "v.",   en: "to carry someone or something from one place to another", ko: "실어 나르다, 데려가다",
      ex: "The tree house {{transports}} Jack and Annie to South Africa.", ex_ko: "나무 집이 잭과 애니를 남아프리카로 데려가요.", pic: "🌀" },
    { word: "South Africa", pos: "n.",   en: "the place the magic tree house takes Jack and Annie to in this book", ko: "남아프리카 — 이 책에서 나무 집이 두 아이를 데려가는 곳",
      ex: "They travel to {{South Africa}}.", ex_ko: "그들은 남아프리카로 갑니다.", pic: "📍" },
    { word: "protect",      pos: "v.",   en: "to keep someone or something safe", ko: "지키다, 보호하다",
      ex: "Jack and Annie must {{protect}} a rhino.", ex_ko: "잭과 애니는 코뿔소 한 마리를 지켜야 해요.", pic: "🛡️" },
    { word: "majestic",     pos: "adj.", en: "so grand and beautiful that people look up to it", ko: "늠름한, 위풍당당한",
      ex: "The summary calls it a {{majestic}} rhino.", ex_ko: "요약은 '늠름한 코뿔소' 라고 불러요.", pic: "👑" },
    { word: "rhino",        pos: "n.",   en: "the animal Jack and Annie must protect in this book — our records do not say what it looks like, so read the book and find out", ko: "코뿔소 — 잭과 애니가 지켜야 하는 동물. 생김새는 우리 자료에 적혀 있지 않다",
      ex: "They must protect a majestic {{rhino}}.", ex_ko: "그들은 늠름한 코뿔소 한 마리를 지켜야 해요.", pic: "❓" },
    { word: "poacher",      pos: "n.",   en: "a person who takes wild animals from a place where the law does not allow it", ko: "밀렵꾼 — 법이 허락하지 않는데 야생 동물을 잡아가는 사람",
      ex: "They must protect the rhino from {{poachers}}.", ex_ko: "그들은 밀렵꾼들로부터 코뿔소를 지켜야 해요.", pic: "🚫" },
    { word: "safe",         pos: "adj.", en: "not in danger", ko: "안전한",
      ex: "What would you do to keep a rhino {{safe}}?", ex_ko: "코뿔소를 안전하게 하려면 무엇을 하겠니?", pic: "✅" },
    { word: "recess",       pos: "n.",   en: "a short break between lessons or work — our records do not say how this word fits the story, so read the book and find out", ko: "쉬는 시간 — 다만 이 말이 이야기와 어떻게 이어지는지는 우리 자료에 적혀 있지 않다",
      ex: "The title of this book is \"Rhinos at {{Recess}}.\"", ex_ko: "이 책의 제목에 들어 있는 낱말이에요.", pic: "❓" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아, 10권과 달리 '첫 문장으로 배우는 과거진행형' 을 넣지 않았다.
  // 대신 장서 요약 한 줄에 실제로 들어 있는 짜임 셋 — transports · must protect · protect A from B —
  // 을 그대로 세 자리에 세웠다.
  grammar: {
    points: [
      { name: "3인칭 단수 현재형 -s", ko: "현재형 동사의 -s",
        sent: "The magic tree house [[transports]] Jack and Annie to South Africa.",
        why_ko: "주어가 he·she·it 처럼 '하나' 이고 지금 이야기하듯 말할 때는 동사 뒤에 -s 를 붙여요. The tree house (=it) → transports. 주어가 둘 이상이면 붙이지 않아요.",
        why: "Add -s to the verb when the subject is one person or thing: the tree house transports.",
        try: "The tree house {{transports}} them away, but the children {{travel}} together." },
      { name: "must + 동사원형", ko: "조동사 must",
        sent: "They [[must protect]] a majestic rhino.",
        why_ko: "must 는 '꼭 ~해야 한다' 예요. must 뒤에는 언제나 동사원형! must protects(X), must protect(O). 주어가 하나여도 -s 를 붙이지 않아요.",
        why: "After \"must,\" always use the plain form of the verb: must protect.",
        try: "Jack and Annie {{must protect}} the rhino." },
      { name: "protect A from B", ko: "from — ~로부터",
        sent: "They must protect a majestic rhino [[from]] poachers.",
        why_ko: "누구를 '무엇으로부터' 지키는지 말할 때 from 을 써요. protect + 지킬 대상 + from + 막아야 할 쪽. to 나 of 를 쓰면 안 돼요.",
        why: "Use \"from\" to say what you are keeping something safe from: protect the rhino from poachers.",
        try: "They protect the rhino {{from}} poachers." }
    ],
    find: "책에서 must 가 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences with \"must\" in them.",
    exam: {
      choose: [
        { q: "The magic tree house (transport / transports) Jack and Annie to South Africa.", a: "transports",
          why_ko: "주어 The magic tree house 는 하나(it)예요. 현재형에 -s 를 붙여 transports!" },
        { q: "Jack and Annie (travel / travels) to South Africa together.", a: "travel",
          why_ko: "주어가 두 사람이에요. 복수 주어에는 -s 를 붙이지 않아요." },
        { q: "They must (protect / protects) a majestic rhino.", a: "protect",
          why_ko: "must 뒤에는 언제나 동사원형이 와요. protect 가 맞아요." },
        { q: "They must protect the rhino (from / to) poachers.", a: "from",
          why_ko: "'~로부터 지키다' 는 protect ... from ... 이에요." },
        { q: "They must protect (a / an) majestic rhino.", a: "a",
          why_ko: "majestic 은 '머'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" }
      ],
      fix: [
        { q: "The magic tree house [[transport]] Jack and Annie to South Africa.", a: "transports",
          why_ko: "주어가 하나예요. 현재형 동사에 -s 를 붙여 transports 로 고쳐요." },
        { q: "They must [[protects]] a majestic rhino.", a: "protect",
          why_ko: "must 다음에는 동사원형! protect 로 고쳐요." },
        { q: "They must protect the rhino [[of]] poachers.", a: "from",
          why_ko: "지켜 내는 쪽을 말할 때는 of 가 아니라 from 이에요." }
      ],
      write: [
        { ko: "마법의 나무 집이 잭과 애니를 남아프리카로 데려간다.", cond: "transport, South Africa, 현재형", a: "The magic tree house transports Jack and Annie to South Africa.",
          why_ko: "주어가 하나라서 transport 에 -s 를 붙여 transports 가 돼요." },
        { ko: "그들은 늠름한 코뿔소 한 마리를 밀렵꾼들로부터 지켜야 한다.", cond: "must, protect, from", a: "They must protect a majestic rhino from poachers.",
          why_ko: "must 뒤에는 동사원형 protect, 그리고 '~로부터' 는 from 이에요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 네 문항은 답을 비워 두었다. 우리 근거가 거기까지 말하지 않기 때문이다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what transports them?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} transports them." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where does the magic tree house transport Jack and Annie?",
      frame: "It transports them to {{South Africa}}." },
    { ref: "장서 질문", skill: "사실찾기", q: "What must Jack and Annie protect the rhino from?",
      frame: "They must protect it from {{poachers}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Rhinos at Recess.\" A recess is a short break between lessons. Our records never say how that word fits this story. What is your guess?",
      frame: "I think \"recess\" is in the title because {{                    }}. After reading, I found out {{                    }}." },
    { ref: "장서 요약", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "장서 요약", skill: "추론·예측", q: "The summary calls the rhino \"majestic.\" Write your guess about what makes it majestic. Then read the book and write what you found.",
      frame: "I guessed it was majestic because {{                    }}. In the book, {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Have you ever wanted to protect an animal? What would you do to keep a rhino safe?",
      frame: "I {{have / have not}} wanted to protect an animal. To keep a rhino safe, I would {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 이 책은 근거가 얇아 11문항만 냈다. 억지로 14개를 채우지 않았다.
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장을 묻는 문항은 뺐다 — 두 기록 어디에도 이 책의 첫 문장이 없다.
  // 코뿔소가 어떻게 생겼는지, 밀렵꾼이 무엇을 노리는지 묻는 문항은 내지 않았다. 근거에 없다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a ranger", "Two rhinos"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"transports Jack and Annie to South Africa\" 라고 두 이름을 그대로 적어요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What transports Jack and Annie in this book?",
      a: ["A magic tree house", "A jeep", "A plane", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"The magic tree house transports...\" 로 시작해요. 차도 비행기도 기계도 근거에 없어요.",
      why: "The magic tree house — the summary begins \"The magic tree house transports...\"" },
    { q: "Where does the magic tree house transport Jack and Annie?",
      a: ["South Africa", "Greenland", "Rome", "The wild west"], c: 0,
      why_ko: "남아프리카(South Africa)예요. 요약이 \"to South Africa\" 라고 적고 있어요. 그린란드는 33권, 로마는 31권, 서부는 10권이에요.",
      why: "South Africa. The summary says \"to South Africa.\" Greenland is book #33, Rome is #31, the wild west is #10." },
    { q: "What must Jack and Annie do in South Africa?",
      a: ["Protect a rhino", "Find a treasure", "Meet an emperor", "Build a tree house"], c: 0,
      why_ko: "코뿔소를 지키는 것이에요. 요약이 \"they must protect a majestic rhino\" 라고 말해요.",
      why: "Protect a rhino — \"they must protect a majestic rhino.\"" },
    { q: "Who must Jack and Annie protect the rhino from?",
      a: ["Poachers", "A thunderstorm", "A snowstorm", "A flood"], c: 0,
      why_ko: "밀렵꾼(poachers)들이에요. 요약이 \"from poachers\" 라고 끝나요. 폭풍·눈보라·홍수는 근거에 없어요.",
      why: "Poachers. The summary ends \"from poachers.\"" },
    { q: "The summary calls it \"a majestic rhino.\" What does \"majestic\" mean?",
      a: ["So grand and beautiful that people look up to it", "Very small and quiet", "Angry and noisy", "Quick and clever"], c: 0,
      why_ko: "majestic 은 '늠름한, 위풍당당한' 이에요. 보는 사람이 우러러볼 만큼 크고 멋지다는 뜻이에요.",
      why: "Majestic means grand and beautiful enough that people look up to it." },
    { q: "In the summary, the tree house \"transports\" Jack and Annie. What does \"transport\" mean here?",
      a: ["To carry someone from one place to another", "To wake someone up", "To hide someone", "To teach someone"], c: 0,
      why_ko: "transport 는 '데려가다, 실어 나르다' 예요. 한 곳에서 다른 곳으로 옮긴다는 뜻이에요.",
      why: "To transport someone is to carry them from one place to another." },
    { q: "How many rhinos does the summary say Jack and Annie must protect?",
      a: ["One", "Two", "Three", "A whole group"], c: 0,
      why_ko: "한 마리예요. 요약이 \"a majestic rhino\" 라고 한 마리를 말해요. 여러 마리라고는 적혀 있지 않아요.",
      why: "One. The summary says \"a majestic rhino,\" not rhinos." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#31", "#33", "#37"], c: 3,
      why_ko: "37권이에요. 장서 목록 제목이 \"#37 Rhinos at Recess\" 예요.",
      why: "Book #37 — the catalog title is \"#37 Rhinos at Recess.\"" },
    { q: "Our catalog lists this book's theme as \"Animals\" and marks it as a made-up story. What does that tell us?",
      a: ["An animal matters a lot in this made-up story", "It is a true science book", "It is a book of poems", "It is a book about machines"], c: 0,
      why_ko: "장서 목록의 주제가 Animals 이고, 지어낸 이야기(nf: false)로 적혀 있어요. 그러니 동물이 크게 나오는 이야기책이에요.",
      why: "The catalog theme is \"Animals\" and the book is marked as fiction, not nonfiction." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who the two children are", "Where the tree house takes them", "Who they must protect the rhino from", "How the word \"recess\" fits the story"], c: 3,
      why_ko: "제목의 \"recess\" 가 이야기와 어떻게 이어지는지예요. 요약은 그 말을 한 번도 하지 않아요. 나머지 셋은 요약 한 줄에 그대로 적혀 있어요. 이건 책을 읽어야 알 수 있어요.",
      why: "How \"recess\" fits the story. The summary never uses that word, but it does name the children, the place, and the poachers." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // But·So·Then 과 The Ending 은 근거가 말하지 않는다. 비워 두었다. 아이가 책을 읽고 채운다.
  // 시간(time) 칸도 비워 두었다 — 제목의 "at Recess" 가 때를 말하는지 어느 출처도 말하지 않는다.
  summaryMap: {
    setting: { place: "{{South Africa}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to protect a majestic rhino}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 막아섰는지는 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house transports Jack and Annie away.",
        frame: "They go to {{South Africa}}." },
      { label: "The Job",
        given: "",
        frame: "There, they must {{protect}} a {{majestic}} rhino from {{poachers}}." },
      { label: "The Rhino",
        given: "우리 자료는 코뿔소가 어떻게 생겼는지도, 두 아이가 어떤 방법으로 지키는지도 말해 주지 않는다.",
        frame: "In the book, the rhino is {{                    }}, and Jack and Annie keep it safe by {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 'The Rhino' 가지와 'South Africa' 가지와 '"Recess"' 가지는 답을 주지 않고 되묻기만 한다.
  // 우리가 답을 모른다.
  mindMap: {
    center: "Rhinos at Recess",
    branches: [
      { label: "Jack & Annie",  ask: "The magic tree house transports Jack and Annie away again. What do you think they take with them?",
        deeper: "Why do you think the same two children are sent again and again?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "\"Transports\" is a moving word. Why not say the tree house \"showed\" them South Africa?" },
      { label: "South Africa",  ask: "South Africa is the one place name our records give us. What does that name make you picture?",
        deeper: "Find South Africa on a map. Was it where you expected it to be?" },
      { label: "Protecting",    ask: "They must protect the rhino. What is the difference between watching an animal and protecting one?",
        deeper: "Our records do not say how they do it. What is your guess — and what would you try?" },
      { label: "The Rhino",     ask: "What do you think a majestic rhino looks like? Draw it before you read.",
        deeper: "After reading, how close was your drawing? What surprised you?" },
      { label: "\"Recess\"",    ask: "Recess means a short break. The title says \"Rhinos at Recess.\" What do you think that has to do with the story?",
        deeper: "After reading, was your guess right? Write what the title really means." },
      { label: "Me",            ask: "Have you ever wanted to protect an animal? What did you do, or what would you do?",
        deeper: "What would you do to keep a rhino safe? Name one thing you could really do from here." }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Responsibility", "Protection", "Courage"],
    globalContext: "Sharing the planet — 사람과 다른 생명은 서로에게 무엇인가",
    statement: "Keeping another living thing safe can ask more of you than keeping yourself safe.",
    factual: [
      "What transports Jack and Annie in this book?",
      "Where does the tree house take them?",
      "What must they protect the rhino from?"
    ],
    conceptual: [
      "What is the difference between liking an animal and protecting one?",
      "Our summary calls the rhino \"majestic.\" Does calling something majestic change how we treat it?"
    ],
    debatable: [
      "Whose job is it to keep a wild animal safe?",
      "Should children be given a job as big as protecting an animal?"
    ],
    learnerProfile: ["Caring", "Principled", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "지켜야 한다" 까지만 말한다. 두 아이가 지켜 냈는지 적혀 있지 않으므로,
    // 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie must protect a majestic rhino in South Africa. Whose job is it to keep a wild animal safe? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "누구의 일인지 분명히 할 것 · Say clearly whose job you think it is",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Keeping One Rhino Safe", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think everyone shares the job of keeping a wild animal safe.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "The tree house transports Jack and Annie to South Africa to protect one rhino.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that even two children can take the job when they are the ones there.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say only grown-ups can do it, but I do not think so.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would help keep the rhino safe too.", lines: 2 }
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
      en: "Students retell how the magic tree house transports Jack and Annie to South Africa, where they must protect a majestic rhino from poachers; they say clearly what our sources do not tell them — above all what the rhino is like and what \"recess\" has to do with the story — and then take a side on whose job it is to keep a wild animal safe.",
      ko: "마법의 나무 집이 잭과 애니를 남아프리카로 데려가 늠름한 코뿔소 한 마리를 밀렵꾼들로부터 지키게 한다는 흐름을 말하고, 우리 자료가 말해 주지 않는 것 — 무엇보다 코뿔소가 어떤 모습인지, 제목의 recess 가 이야기와 어떻게 이어지는지 — 을 스스로 짚은 뒤, 야생 동물을 지키는 일이 누구의 일인지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이고, 그 양이 아주 적다.
    // 그래서 이 수업의 절반은 '모르는 것을 모른다고 말하는 연습' 이다.
    // 선생님도 코뿔소를 설명하지 않는다. 생김새·먹이·남은 수 — 근거에 없다.
    // 남아프리카의 땅·날씨·다른 동물도 꺼내지 않는다. 우리가 가진 것은 지명 하나뿐이다.
    // 밀렵이 어떤 일인지도 설명하지 않는다. 낱말 뜻에서 멈추고 '지키는 일' 로 돌린다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever wanted to protect an animal? What did you want to do?",
        do: "책을 펴기 전에 한다. 오늘 글쓰기의 물음을 미리 입에 올려 두는 것이다. 서너 명만.",
        exp: "A bird hit our window. / A cat was out in the rain.",
        stuck: "선생님이 먼저 한 문장 한다. \"I once moved a snail off the road.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Rhinos at Recess.\" Recess. A break between lessons. What could a rhino have to do with recess?",
        do: "제목의 이상한 점만 짚는다. 답을 주지 않는다 — 우리도 모른다. 아이가 궁금해하는 채로 책을 펴게 둔다.",
        exp: "Maybe it happens at school. / Maybe recess means something else.",
        stuck: "제목을 칠판에 쓰고 Rhinos 와 Recess 두 낱말에만 동그라미를 친다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "지키다 → protect / 늠름한 → majestic / 데려가다 → transport",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at the word rhino. Its meaning box does not tell you what it looks like. That is on purpose.",
        do: "빈 뜻 칸을 손가락으로 짚는다. 선생님도 모른다고 그대로 말한다. 여기서 이 수업의 태도가 정해진다.",
        exp: "(아이가 '선생님은 알잖아요' 라고 한다. 그때 \"Our paper does not say. Yours will, tonight.\")",
        stuck: "\"Guess now. Draw it in the margin. We check it tomorrow.\"" },

      { stage: "Word List", min: "",
        say: "One more word: poacher. Read the meaning box once, and that is all we do with it today.",
        do: "낱말 뜻 한 줄만 읽고 바로 넘어간다. 아이가 더 물으면 \"Our paper does not say more\" 한 마디로 닫고, 발문 쪽(지키는 일)으로 돌린다.",
        exp: "(아이가 '왜 잡아가요?' 라고 묻는다. 그때 \"Our records do not say. Our question today is the other one — how do you keep it safe?\")",
        stuck: "칠판에 protect 와 safe 두 낱말을 크게 쓰고 거기로 눈을 돌린다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What must they protect the rhino from...' becomes 'They must protect it from...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They must protect it from poachers.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Questions four, five, six and seven have no answer on this sheet. Not because I hid it — because nobody wrote it down for us.",
        do: "이 수업에서 가장 중요한 한 마디다. 모르는 것을 모른다고 말하는 본보기를 선생님이 먼저 보인다.",
        exp: "(아이가 '그럼 어떻게 해요' 라고 묻는다. 그때 \"You read the book\" 한 마디면 된다)",
        stuck: "\"Our paper stops at 'protect a rhino from poachers.' The book keeps going. You go with it.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. Today only the first two are filled.",
        do: "다섯 칸을 손가락으로 짚는다. 두 칸만 차 있는 것을 아이 눈으로 보게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to protect a majestic rhino",
        stuck: "\"Who travels in this story? And what must they do?\" 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in our summary.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Rhino · Recess)", min: "",
        say: "Stop at The Rhino. Draw your guess in the box. Then stop again at Recess and write your guess there. A guess is allowed — as long as you call it a guess.",
        do: "두 칸에서 반드시 멈춘다. 추측과 사실을 가르는 연습이 여기서 일어난다. 선생님은 답을 말하지 않는다.",
        exp: "I guess recess means school, because kids have recess at school.",
        stuck: "\"Say it like this: 'I guess..., because...' Then we check it in the book.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, our summary answers it. Step 2, the summary helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Whose job is it to keep a wild animal safe? Two children? Grown-ups? Everyone? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think everyone, because the rhino cannot ask for help.",
        stuck: "손을 들게 한다. \"Only grown-ups? Or everyone?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say only grown-ups can do it, but I do not think so.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you think a majestic rhino looks like? Draw it before you read.", ko: "늠름한 코뿔소는 어떻게 생겼을 것 같니? 읽기 전에 그려 보자." },
        { en: "Where is South Africa? Find it on a map before you open the book.", ko: "남아프리카는 어디일까? 책을 펴기 전에 지도에서 찾아보자." },
        { en: "The title says \"at Recess.\" What could a rhino have to do with recess?", ko: "제목이 '쉬는 시간에' 라고 해. 코뿔소가 쉬는 시간과 무슨 상관일까?" }
      ],
      during: [
        { en: "Have you met the rhino yet? Was your drawing close?", ko: "코뿔소가 나왔니? 네가 그린 그림과 비슷했니?" },
        { en: "What are Jack and Annie doing to keep the rhino safe?", ko: "잭과 애니는 코뿔소를 지키려고 무엇을 하고 있니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie keep the rhino safe? How did they do it?", ko: "잭과 애니는 코뿔소를 안전하게 지켰니? 어떻게 했니?" },
        { en: "Now that you have read it — what did \"recess\" mean in this book?", ko: "다 읽고 나니, 이 책에서 'recess' 는 무엇이었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "protect 와 majestic 두 낱말은 요약 한 줄에 실제로 있는 말이다. 꼭 짚는다.", miss: "rhino 의 생김새를 선생님이 설명해 버린다. 그러면 오늘 수업의 절반이 사라진다." },
      { sheet: "Word List",     point: "poacher 는 낱말 뜻 한 줄에서 멈추고 바로 protect · safe 로 돌린다.", miss: "선생님이 밀렵 실태를 설명한다. 하지 않는다 — 근거에도 없고, 아홉 살이 보는 종이다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "뒤쪽 네 문항은 빈칸이 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 아프리카·야생 동물 이야기를 대신 채워 준다. 그건 이 책의 내용이 아니다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸과 The Ending 은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Rhino' 와 '\"Recess\"' 두 가지에서 반드시 멈춘다. 그리고 쓰게 하되 정답은 주지 않는다.", miss: "추측을 사실처럼 적는다. 'I guess' 를 붙이게 한다." },
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
  // 근거(장서 요약 한 줄 · 장서 발문 · 책 제목)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 남아 있지 않아, 10권처럼 책의 첫 줄로 시작하지 않는다.
  // 코뿔소가 어떻게 생겼는지도, recess 가 무엇인지도, 결말도 근거가 말하지 않으므로
  // 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "마법 나무집이 잭과 애니를 남아프리카로 데려가 늠름한 코뿔소 한 마리를 지키게 하는 이야기",
    text: "The [[wonderful|magic]] tree house [[carries|transports]] Jack and Annie to South Africa. There they [[have to|must]] protect a [[grand|majestic]] rhino from poachers. The name of this book is \"Rhinos at Recess.\" What does the rhino look like? How do Jack and Annie keep it safe? What does \"recess\" have to do with the story? Our [[papers|records]] do not say. Open the book and find out."
  }
};
