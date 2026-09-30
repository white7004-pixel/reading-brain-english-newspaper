// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.7)
// Time of the Turtle King (Magic Tree House #38) — 우리는 이 책을 읽지 않았다.
// 이 책은 33권만큼이나 근거가 얇다. 오픈라이브러리 기록이 두 건 있으나 두 건 모두
// 소개글(desc)이 비어 있고 첫 문장(first)도 없다. 주제어는 한 건에 "Children's fiction"
// 하나뿐이고 다른 한 건은 주제어조차 비어 있다. 인물·지명 목록도 둘 다 비어 있다.
// 우리가 가진 것은 학원 장서 목록의 한 줄 요약과 발문 세 개가 전부다.
// 그래서 분량을 채우지 않았다. 근거가 버티는 만큼만 만들고, 버티지 않는 자리는 비워 두었다.
// 근거가 말하는 것은 딱 여기까지다:
//   마법의 나무 집이 돌아온다(returns) / 그것이 잭과 애니를 갈라파고스 제도로 휙 데려간다(whisks) /
//   두 아이는 World Turtle Experts 가 된다(become) /
//   그리고 터지고 있는 화산에 위험에 처한 거북 한 마리(a tortoise)를 구해야 한다(must save) /
//   주제어는 Children's fiction · 2023년 · 이 시리즈의 38권 · 제목은 "Time of the Turtle King"
//
// 갈라파고스에 대해서는 한 글자도 쓰지 않았다. 다윈·진화·핀치새·이구아나·에콰도르·섬의 개수 —
// 어느 것도 근거에 없다. 쓸 수 있는 말은 지명 the Galapagos Islands 하나뿐이다.
// 거북에 대해서도 한 글자도 쓰지 않았다. 나이·크기·먹이·몇 마리 남았는지 — 근거에 없다.
//
// turtle 과 tortoise — 요약이 두 말을 함께 쓴다. 두 아이는 "World Turtle Experts" 가 되고,
// 구해야 하는 것은 "a tortoise" 다. 우리 근거는 이 둘이 같은 짐승인지 다른 짐승인지
// 한 줄도 설명하지 않는다. 그래서 같다고도 다르다고도 가르치지 않았다.
// 낱말 뜻 칸에는 근거가 쓴 그대로만 적고, 차이는 아이가 책에서 찾도록 물음으로 두었다.
//
// 제목의 "Turtle King" 이 누구인지·무엇인지도 어느 출처도 말하지 않는다. 구해야 하는 그
// 거북이 그 왕이라고 이 파일 어디에서도 단정하지 않았다. 그것도 아이가 책에서 찾는다.
//
// 화산은 근거의 말("an erupting volcano")만 쓰고 무섭게 그리지 않았다. 용암이 어떻게 흐르는지,
// 무엇이 타는지, 누가 다치는지 — 근거에 없고 쓰지 않았다. 장서 발문 ③이 "거북이 화산에서
// 빠져나오도록 도우려면 무엇을 하겠니" 라고 행동을 묻는다. 수업 대사도 무서움이 아니라
// "그럼 무엇을 할까" 쪽으로만 끌고 간다. (24권 Earthquake in the Early Morning 과 같은 방식이다.)
//
// 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 시작 줄을 모두 뺐다.
// 문법 자리는 근거 문장에 실제로 있는 짜임(When ... / become / must save)으로 채웠다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3942",
  slug: "magic-tree-house-time-of-the-turtle-king",
  title: "Time of the Turtle King",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #38",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 31권(AR 3.7)·33권(AR 3.4)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.7", lexile: "460L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/14421246-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약과 발문 세 개를 바닥으로 삼았다. 오픈라이브러리 기록 두 건은 열어 보았으나 가져올 것이 주제어 한 줄과 출간연도뿐이었다. 사람의 기억도, 갈라파고스에 대한 일반 지식도 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3942 요약(\"When the magic tree house returns, it whisks Jack and Annie away to the Galapagos Islands. They become World Turtle Experts and must save a tortoise in danger of an erupting volcano.\")과 발문 세 개(\"What must Jack and Annie save the tortoise from?\" / \"Have you ever learned about a place that had a volcano?\" / \"What would you do to help a tortoise escape a volcano?\") + 장서 목록의 갈래·주제(Chapter Books · Adventure/Expedition/Action · 논픽션 아님) + 오픈라이브러리 /works/OL34365945W (주제어 Children's fiction 하나 · 2023년 · 소개글 없음 · 첫 문장 없음 · 인물 목록 비어 있음 · 지명 목록 비어 있음) + 오픈라이브러리 /works/OL36478097W (주제어 없음 · 2023년 · 소개글 없음 · 첫 문장 없음)",
    characters: ["Jack", "Annie"],
    beats: [
      "when the magic tree house returns, it whisks Jack and Annie away to the Galapagos Islands",
      "they become World Turtle Experts",
      "they must save a tortoise in danger of an erupting volcano"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"must save a tortoise in danger of an erupting volcano\" 에서 그대로 끝난다. 두 아이가 그 거북을 구했는지, 어떻게 구했는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "우리가 모르는 것을 또렷이 적어 둔다. ① 제목의 \"Turtle King\" 이 누구인지·무엇인지 — 요약은 Turtle King 을 한 번도 말하지 않는다. 구해야 하는 그 거북이 그 왕인지, 아주 다른 무엇인지 어느 출처도 말하지 않는다. 단정하지 않았다. ② turtle 과 tortoise 가 같은 짐승인지 다른 짐승인지 — 요약은 두 말을 나란히 쓸 뿐 그 차이를 한 줄도 설명하지 않는다. 우리도 설명하지 않았다. ③ 구해야 하는 거북이 어떤 거북인지 — 크기·나이·빛깔·먹이·이름, 아무것도 없다. ④ 갈라파고스 제도가 어떤 곳인지 — 지명 the Galapagos Islands 말고는 한 줄도 없다. 섬이 몇 개인지, 어느 나라인지, 거기 무엇이 사는지 — 아무것도 없다. ⑤ 화산이 어느 화산인지, 터진 뒤 무슨 일이 일어나는지 — 없다. 요약은 \"an erupting volcano\" 라는 다섯 글자에서 끊긴다. ⑥ 두 아이가 거북을 구했는지 — 없다. ⑦ 두 아이가 World Turtle Experts 가 '된다' 는 것이 무슨 뜻인지 — 누가 그렇게 불러 주는지, 스스로 그리 나서는지 없다. ⑧ 임무를 누가 주었는지, 모건이나 수수께끼가 나오는지 — 없다. ⑨ 등장인물은 잭과 애니 둘이 전부다. 오픈라이브러리 인물 목록이 비어 있다. ⑩ 책의 첫 문장 — 두 기록 어디에도 없다. ⑪ 장(chapter) 구성과 각 장에서 무슨 일이 일어나는지 — 없다. 그래서 이 학습지에는 장 번호가 한 번도 나오지 않는다. ⑫ 쪽수 — 두 기록 모두 0쪽으로 비어 있다",
    checked: "장서 요약의 낱말(when / the magic tree house / returns / whisks / away / the Galapagos Islands / become / World Turtle Experts / must save / a tortoise / in danger / an erupting volcano)과 제목 낱말(Time · Turtle · King), 장서 발문 세 줄, 장서 갈래(Chapter Books · Adventure/Expedition/Action · 논픽션 아님), 오픈라이브러리 주제어(Children's fiction)를 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 오픈라이브러리 두 기록은 desc 와 first 가 모두 빈 칸이었다 — 없는 것을 있는 것처럼 적지 않았다. 갈라파고스 지식(다윈·진화·핀치새·이구아나·에콰도르·섬의 개수)과 거북 생태 지식(나이·크기·먹이·멸종위기), 화산 지식(용암·재·분화구)은 한 글자도 쓰지 않았다. turtle 과 tortoise 를 같다고도 다르다고도 쓰지 않았고, \"Turtle King\" 이 그 거북이라고 쓴 곳도 없다. 첫 문장이 없어 첫 문장을 묻는 문항과 문법 보기를 뺐고, 퀴즈는 14개가 아니라 12개로 줄였다 (2026-09-30)",
  },

  // 낭독 영상 — S3942.json 의 videos 에서 제목을 하나하나 확인해 골랐다 (2026-09-30).
  // 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 이 권은 통본(책 한 권 전체) 낭독 영상을 확인하지 못했다. 조각 영상뿐이라 장 차례대로 놓았다.
  // S3942.json 의 제목은 "- Cha" 에서 잘려 있었다. 따로 받아 둔 후보 목록(vid-S3942.json)의
  // 온전한 제목과 맞춰 보니 SNz8_uP7S2U 가 1~2장, Vk-xijKSLps 가 3~4장이었다.
  // 세 번째 Gz7ifBRs1Eo 는 제목이 이 책(#38 Time of the Turtle King)이 맞지만 후보 목록에
  // 없어 몇 장인지 맞춰 보지 못했다. 장 번호를 지어내지 않고 맨 뒤에 두었다.
  // 후보 목록에 있던 "Magic Tree House Time of the Turtle King 1"(The Halfling Storytime, 7:28)은
  // 근거로 모아 둔 S3942.json 의 videos 에 없어 넣지 않았다.
  // 뒷부분은 아이가 책으로 읽는다.
  shadowing: {
    query: "\"Time of the Turtle King\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/SNz8_uP7S2U",
    videos: [
      { url: "https://youtu.be/SNz8_uP7S2U", title: "Magic Tree House #38 Time of the Turtle King by Mary Pope Osborne - Chapter 1-2 | Kid books read aloud",
        channel: "Quynh Giang English", views: "1,071", length: "13:36" },
      { url: "https://youtu.be/Vk-xijKSLps", title: "Magic Tree House #38 Time of the Turtle King by Mary Pope Osborne - Chapter 3-4 | Kid books read aloud",
        channel: "Quynh Giang English", views: "783", length: "13:41" },
      { url: "https://youtu.be/Gz7ifBRs1Eo", title: "Magic Tree House #38 Time of the Turtle King by Mary Pope Osborne (장 번호는 확인하지 못했다)",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 장서 요약 한 줄 · 책 제목 · 장서 발문에 실제로 나오는 말에서만 골랐다.
  // 갈라파고스를 설명하는 낱말(Darwin, evolution, iguana, Ecuador ...)도,
  // 거북의 생태를 설명하는 낱말(shell, hatch, endangered ...)도 한 개도 끌어오지 않았다.
  // turtle 과 tortoise 는 뜻을 적지 않고 되물었다 — 우리 근거가 그 차이를 말해 주지 않기 때문이다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "magic",       pos: "adj.", en: "having special powers that cannot happen in real life", ko: "마법의",
      ex: "The {{magic}} tree house returns for Jack and Annie.", ex_ko: "마법의 나무 집이 잭과 애니에게 돌아와요.", pic: "🪄" },
    { word: "tree house",  pos: "n.",   en: "a small house built up in the branches of a tree", ko: "나무 위의 집",
      ex: "The magic {{tree house}} whisks them away.", ex_ko: "마법의 나무 집이 둘을 휙 데려가요.", pic: "🌳" },
    { word: "whisk",       pos: "v.",   en: "to take someone away quickly and suddenly", ko: "휙 데려가다",
      ex: "It {{whisks}} Jack and Annie away to the Galapagos Islands.", ex_ko: "그것이 잭과 애니를 갈라파고스 제도로 휙 데려가요.", pic: "💨" },
    { word: "the Galapagos Islands", pos: "n.", en: "the place the magic tree house takes Jack and Annie to in this book — our records say nothing else about it", ko: "갈라파고스 제도 — 이 책에서 나무 집이 두 아이를 데려가는 곳. 우리 자료는 그 밖의 것을 말해 주지 않는다",
      ex: "They travel to {{the Galapagos Islands}}.", ex_ko: "그들은 갈라파고스 제도로 갑니다.", pic: "📍" },
    { word: "expert",      pos: "n.",   en: "someone who knows a great deal about one thing", ko: "전문가",
      ex: "Jack and Annie become World Turtle {{Experts}}.", ex_ko: "잭과 애니는 World Turtle Experts 가 돼요.", pic: "🎓" },
    { word: "turtle",      pos: "n.",   en: "the word in the name Jack and Annie are given — \"World Turtle Experts.\" Our records do not say what a turtle is, so read the book and find out", ko: "우리 자료가 두 아이의 이름표에 쓴 말 — World Turtle Experts. 이 말이 무엇을 가리키는지는 적혀 있지 않다",
      ex: "They become World {{Turtle}} Experts.", ex_ko: "그들은 World Turtle Experts 가 돼요.", pic: "❓" },
    { word: "tortoise",    pos: "n.",   en: "the animal Jack and Annie must save in this book. Our records do not say how this word and the word \"turtle\" go together — read the book and find out", ko: "잭과 애니가 구해야 하는 동물. 이 말과 turtle 이 어떻게 이어지는지는 우리 자료에 적혀 있지 않다",
      ex: "They must save a {{tortoise}}.", ex_ko: "그들은 거북 한 마리를 구해야 해요.", pic: "❓" },
    { word: "save",        pos: "v.",   en: "to keep someone or something safe from harm", ko: "구하다",
      ex: "Jack and Annie must {{save}} a tortoise.", ex_ko: "잭과 애니는 거북 한 마리를 구해야 해요.", pic: "🆘" },
    { word: "erupt",       pos: "v.",   en: "to suddenly burst open", ko: "갑자기 터지다",
      ex: "The tortoise is in danger of an {{erupting}} volcano.", ex_ko: "그 거북은 터지고 있는 화산 때문에 위험해요.", pic: "💥" },
    { word: "volcano",     pos: "n.",   en: "a mountain that can burst open", ko: "화산",
      ex: "An erupting {{volcano}} puts the tortoise in danger.", ex_ko: "터지고 있는 화산이 거북을 위험에 빠뜨려요.", pic: "🌋" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아 '첫 문장으로 배우는 문법' 을 넣지 않았다.
  // 대신 장서 요약 한 줄에 실제로 들어 있는 세 짜임을 그대로 세웠다:
  //   When ... (때를 말하는 절) / become + 명사 / must + 동사원형
  grammar: {
    points: [
      { name: "When ~ (때를 말하는 절)", ko: "시간 부사절",
        sent: "[[When]] the magic tree house returns, it whisks Jack and Annie away.",
        why_ko: "'~할 때' 를 말할 때 When 으로 시작하는 덩어리를 앞에 붙여요. 그 덩어리가 앞에 오면 뒤에 쉼표(,)를 찍고 진짜 이야기를 이어요. When + 주어 + 동사 순서예요.",
        why: "Use \"When ...\" to say at what time something happens. If it comes first, put a comma after it.",
        try: "{{When}} the tree house returns, Jack and Annie go inside." },
      { name: "become + 명사", ko: "become 보어",
        sent: "Jack and Annie [[become]] World Turtle Experts.",
        why_ko: "become 은 '~가 되다' 예요. 뒤에 무엇이 되는지를 그대로 붙여요. become experts = 전문가가 되다. 주어가 둘 이상이면 -s 를 붙이지 않아요.",
        why: "\"Become\" means to turn into something. Put the new name right after it.",
        try: "They {{become}} World Turtle Experts." },
      { name: "must + 동사원형", ko: "의무의 조동사",
        sent: "They [[must save]] a tortoise.",
        why_ko: "must 는 '꼭 ~해야 한다' 예요. must 뒤에는 언제나 동사원형! must saves(X), must to save(X), must save(O).",
        why: "Use \"must\" plus the plain form of a verb to say something has to be done.",
        try: "They {{must save}} a tortoise from an erupting volcano." }
    ],
    find: "책에서 must 가 들어간 문장을 세 개 찾아 쓰세요. · Find three sentences with \"must.\"",
    exam: {
      choose: [
        { q: "(When / What) the magic tree house returns, it whisks Jack and Annie away.", a: "When",
          why_ko: "'나무 집이 돌아올 때' 라고 때를 말하고 있어요. 때를 말하는 덩어리는 When 으로 시작해요." },
        { q: "When the magic tree house returns, it (whisk / whisks) Jack and Annie away.", a: "whisks",
          why_ko: "주어 it 은 하나예요. 현재형에 -s 를 붙여 whisks!" },
        { q: "Jack and Annie (become / becomes) World Turtle Experts.", a: "become",
          why_ko: "주어가 두 사람이에요. 복수 주어에는 -s 를 붙이지 않아요." },
        { q: "They must (save / saves) a tortoise.", a: "save",
          why_ko: "must 뒤에는 언제나 동사원형이 와요. save 가 맞아요." },
        { q: "They must save a tortoise (in / on) danger of an erupting volcano.", a: "in",
          why_ko: "'위험에 처한' 은 in danger 라고 해요. 요약도 in danger 라고 적고 있어요." }
      ],
      fix: [
        { q: "[[What]] the magic tree house returns, it whisks Jack and Annie away.", a: "When",
          why_ko: "때를 말하는 덩어리예요. When 으로 고쳐요." },
        { q: "Jack and Annie [[becomes]] World Turtle Experts.", a: "become",
          why_ko: "주어가 두 사람이에요. -s 를 떼고 become 으로 고쳐요." },
        { q: "They must [[to save]] a tortoise.", a: "save",
          why_ko: "must 다음에는 동사원형만! to 를 떼고 save 로 고쳐요." }
      ],
      write: [
        { ko: "마법의 나무 집이 돌아올 때, 그것은 잭과 애니를 갈라파고스 제도로 휙 데려간다.", cond: "When, whisk, 현재형", a: "When the magic tree house returns, it whisks Jack and Annie away to the Galapagos Islands.",
          why_ko: "때를 말하는 When 덩어리를 앞에 놓고 쉼표를 찍어요. 주어 it 이 하나라서 whisks 가 돼요." },
        { ko: "그들은 거북 한 마리를 구해야 한다.", cond: "must, save", a: "They must save a tortoise.",
          why_ko: "'꼭 해야 한다' 는 must, 그 뒤에는 동사원형 save 예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 세 문항은 답을 비워 두었다. 우리 근거가 거기까지 말하지 않기 때문이다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what whisks them away?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} whisks them away." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where does the magic tree house whisk Jack and Annie?",
      frame: "It whisks them away to {{the Galapagos Islands}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What do Jack and Annie become, and what must they do there?",
      frame: "They become {{World Turtle Experts}}, and they must {{save a tortoise}}." },
    { ref: "장서 질문", skill: "사실찾기", q: "What must Jack and Annie save the tortoise from?",
      frame: "They must save it from {{an erupting volcano}}." },
    { ref: "책 제목", skill: "추론·예측", q: "The title is \"Time of the Turtle King.\" Our summary never says who or what the Turtle King is. Write your guess before you read. Then read the book and write what you find.",
      frame: "I guessed the Turtle King was {{                    }}. In the book the Turtle King is {{                    }}." },
    { ref: "장서 요약", skill: "어휘", q: "Our summary calls Jack and Annie \"World Turtle Experts,\" but the animal they must save is \"a tortoise.\" Our records do not tell us how those two words go together. Read the book and write what you find out.",
      frame: "In the book, a turtle and a tortoise are {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "What would you do to help a tortoise escape a volcano? Write the steps you would take.",
      frame: "First I would {{                    }}. Then I would {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 이 책은 근거가 얇아 12문항만 냈다. 억지로 14개를 채우지 않았다.
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장을 묻는 문항은 뺐다 — 두 기록 어디에도 이 책의 첫 문장이 없다.
  // 갈라파고스가 어떤 곳인지, 거북이 어떻게 생겼는지, Turtle King 이 누구인지 묻는 문항도
  // 내지 않았다. 우리가 답을 모른다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a sailor", "Two tortoises"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"whisks Jack and Annie away\" 라고 두 이름을 그대로 적어요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What whisks Jack and Annie away in this book?",
      a: ["A magic tree house", "A boat", "A plane", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"When the magic tree house returns, it whisks...\" 로 시작해요. 배도 비행기도 기계도 근거에 없어요.",
      why: "The magic tree house — the summary begins \"When the magic tree house returns, it whisks...\"" },
    { q: "Where does the magic tree house whisk Jack and Annie?",
      a: ["The Galapagos Islands", "Greenland", "Hawaii", "The wild west"], c: 0,
      why_ko: "갈라파고스 제도예요. 요약이 \"away to the Galapagos Islands\" 라고 적고 있어요. 그린란드는 33권, 하와이는 28권이에요.",
      why: "The Galapagos Islands. The summary says \"away to the Galapagos Islands.\"" },
    { q: "What do Jack and Annie become in this book?",
      a: ["World Turtle Experts", "Master Librarians", "Ship captains", "Volcano guides"], c: 0,
      why_ko: "World Turtle Experts 예요. 요약이 \"They become World Turtle Experts\" 라고 그대로 말해요.",
      why: "World Turtle Experts — \"They become World Turtle Experts.\"" },
    { q: "What must Jack and Annie save?",
      a: ["A tortoise", "A narwhal", "A tree house", "A treasure"], c: 0,
      why_ko: "거북 한 마리(a tortoise)예요. 요약이 \"must save a tortoise\" 라고 말해요. 일각고래는 33권이에요.",
      why: "A tortoise — \"must save a tortoise.\"" },
    { q: "What must Jack and Annie save the tortoise from?",
      a: ["An erupting volcano", "A storm at sea", "A pack of wolves", "A thief"], c: 0,
      why_ko: "터지고 있는 화산이에요. 요약이 \"in danger of an erupting volcano\" 라고 적고, 장서 발문도 같은 것을 물어요.",
      why: "An erupting volcano — \"in danger of an erupting volcano.\"" },
    { q: "In the summary, the tree house \"whisks\" Jack and Annie away. What does \"whisk\" mean here?",
      a: ["To take someone away quickly and suddenly", "To wait for a long time", "To hide someone", "To wake someone up"], c: 0,
      why_ko: "whisk 는 '휙 데려가다' 예요. 눈 깜짝할 사이에 데려간다는 뜻이에요.",
      why: "To whisk someone away is to take them off quickly and suddenly." },
    { q: "The summary calls them \"Experts.\" What is an expert?",
      a: ["Someone who knows a great deal about one thing", "Someone who is lost", "A kind of boat", "A young animal"], c: 0,
      why_ko: "expert 는 한 가지를 아주 잘 아는 사람, 곧 전문가예요.",
      why: "An expert is someone who knows a great deal about one thing." },
    { q: "The volcano is \"erupting.\" What does that tell us about it?",
      a: ["It is bursting open now", "It went quiet long ago", "It is made of ice", "It is a kind of tree"], c: 0,
      why_ko: "erupt 는 '갑자기 터지다' 예요. erupting 은 지금 터지고 있다는 말이에요.",
      why: "To erupt is to burst open suddenly. \"Erupting\" means it is happening now." },
    { q: "How many tortoises does the summary say Jack and Annie must save?",
      a: ["One", "Two", "Three", "A whole group"], c: 0,
      why_ko: "한 마리예요. 요약이 \"a tortoise\" 라고 한 마리를 말해요. 여러 마리라고는 적혀 있지 않아요.",
      why: "One. The summary says \"a tortoise,\" not tortoises." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#24", "#33", "#38"], c: 3,
      why_ko: "38권이에요. 장서 목록 제목이 \"#38 Time of the Turtle King\" 이에요.",
      why: "Book #38 — the catalog title is \"#38 Time of the Turtle King.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who or what the \"Turtle King\" is", "Who the two children are", "Where the tree house whisks them", "What they must save the tortoise from"], c: 0,
      why_ko: "\"Turtle King\" 이 누구인지·무엇인지예요. 요약은 Turtle King 을 한 번도 말하지 않아요. 구해야 하는 그 거북이 그 왕인지도 적혀 있지 않아요. 책을 읽어야 알 수 있어요.",
      why: "Who or what the \"Turtle King\" is. Our summary never mentions the Turtle King at all." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // But·So·Then 과 The Ending 은 근거가 말하지 않는다. 비워 두었다. 아이가 책을 읽고 채운다.
  // 때(time)도 비워 두었다 — 제목이 "Time of the Turtle King" 이지만 그것이 언제인지 어느 출처도 말하지 않는다.
  summaryMap: {
    setting: { place: "{{the Galapagos Islands}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to save a tortoise}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 가로막았는지는 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "When the magic tree house returns, it whisks Jack and Annie away.",
        frame: "They go to {{the Galapagos Islands}}." },
      { label: "The Experts",
        given: "",
        frame: "There they become {{World Turtle Experts}}." },
      { label: "The Tortoise",
        given: "우리 자료는 그 거북이 어떤 거북인지도, 어디에 있는지도 말해 주지 않는다.",
        frame: "They must {{save}} a tortoise in danger of {{an erupting volcano}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 'The Galapagos Islands' 가지와 'The Tortoise' 가지는 답을 주지 않고 되묻기만 한다.
  // 우리가 답을 모른다. 갈라파고스에 대해 선생님도 아무것도 덧붙이지 않는다.
  mindMap: {
    center: "Time of the Turtle King",
    branches: [
      { label: "Jack & Annie",   ask: "The magic tree house returns and whisks Jack and Annie away again. What do you think they take with them?",
        deeper: "Why do you think the same two children are sent again and again?" },
      { label: "The Galapagos Islands", ask: "The Galapagos Islands is the one place name our records give us. Find it on a map before you read. What does the name make you picture?",
        deeper: "Our records say nothing else about it. Write down one thing you want the book to tell you." },
      { label: "World Turtle Experts", ask: "Jack and Annie become World Turtle Experts. What do you think an expert has to know?",
        deeper: "Can you become an expert in one day? What would it take?" },
      { label: "The Tortoise",   ask: "They must save a tortoise. Our records call them turtle experts but call the animal a tortoise. What do you notice?",
        deeper: "Write your question down, then look for the answer in the book." },
      { label: "The Volcano",    ask: "The volcano is erupting. Forget how it looks for a moment — what is the first thing you would DO?",
        deeper: "A tortoise is slow. How does that change your plan?" },
      { label: "Me",             ask: "Have you ever learned about a place that had a volcano? Where was it, and what did you learn?",
        deeper: "If you had to leave a place in a hurry, what one thing would you take?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Responsibility",
    relatedConcepts: ["Expertise", "Rescue", "Danger"],
    globalContext: "Sharing the planet — 위험 앞에서 다른 생명에게 무엇을 할 것인가",
    statement: "Becoming an expert can mean you are the one who has to act when something is in danger.",
    factual: [
      "What whisks Jack and Annie away in this book?",
      "Where does the tree house whisk them, and what do they become there?",
      "What must they save the tortoise from?"
    ],
    conceptual: [
      "What is the difference between knowing about an animal and being able to help one?",
      "Why does calling yourself an expert give you a job to do?"
    ],
    debatable: [
      "Should people go toward danger to help an animal?",
      "Is it fair to send children on a mission like this one?"
    ],
    learnerProfile: ["Caring", "Knowledgeable", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "거북을 구해야 한다" 까지만 말한다. 두 아이가 구했는지 적혀 있지 않으므로,
    // 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    // 장서 발문 ③이 '무엇을 하겠니' 라고 행동을 묻는 것과 같은 방향이다.
    prompt: "Jack and Annie become World Turtle Experts and must save a tortoise from an erupting volcano. Should people go toward danger to help an animal? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Walking Toward the Volcano", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people should go toward danger to help an animal.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie must save a tortoise from an erupting volcano.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the tortoise cannot get away alone, so somebody has to go.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say it is too risky, but a plan makes the risk smaller.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would go and help too.", lines: 2 }
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
      en: "Students retell how the magic tree house returns and whisks Jack and Annie away to the Galapagos Islands, where they become World Turtle Experts and must save a tortoise from an erupting volcano; they say clearly what our sources do not tell them — above all who the Turtle King is — and then take a side on whether people should go toward danger to help an animal.",
      ko: "마법의 나무 집이 돌아와 잭과 애니를 갈라파고스 제도로 데려가고, 두 아이가 World Turtle Experts 가 되어 터지고 있는 화산에서 거북 한 마리를 구해야 한다는 흐름을 말하고, 우리 자료가 말해 주지 않는 것 — 무엇보다 Turtle King 이 누구인지 — 을 스스로 짚은 뒤, 동물을 돕기 위해 위험 쪽으로 가야 하는지에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이고, 그 양이 아주 적다.
    // 그래서 이 수업의 절반은 '모르는 것을 모른다고 말하는 연습' 이다.
    // 선생님도 갈라파고스를 설명하지 않는다. 다윈·진화·이구아나·에콰도르·섬의 개수 — 근거에 없다.
    // 거북도 설명하지 않는다. 크기·나이·먹이 — 근거에 없다.
    // turtle 과 tortoise 를 같다고도 다르다고도 말하지 않는다. 아이가 책에서 찾게 둔다.
    // 화산은 무섭게 그리지 않는다. 용암·재·다친 사람 — 근거에 없고 입에 올리지 않는다.
    // 화산 이야기가 나오면 언제나 "그럼 무엇을 할까" 쪽으로 돌린다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever learned about a place that had a volcano? Where was it?",
        do: "책을 펴기 전에 한다. 장서 발문 ② 그대로다. 서너 명만 받고 넘어간다.",
        exp: "Jeju. / Hawaii. / I saw one in a book.",
        stuck: "선생님이 먼저 한 문장 한다. \"I once saw a mountain that used to be a volcano.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Time of the Turtle King.\" A Turtle King. Who do you think that is?",
        do: "제목의 궁금한 점만 짚는다. 답을 주지 않는다 — 우리도 모른다. 궁금한 채로 책을 펴게 둔다.",
        exp: "A big turtle. / The oldest one. / Maybe a person.",
        stuck: "칠판에 제목을 쓰고 Turtle 과 King 두 낱말에만 동그라미를 친다." },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "전문가 → expert / 구하다 → save / 휙 데려가다 → whisk",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at turtle and tortoise. Both meaning boxes send you to the book instead of telling you. That is on purpose.",
        do: "두 빈 뜻 칸을 손가락으로 나란히 짚는다. 선생님도 우리 자료가 그 차이를 말해 주지 않는다고 그대로 말한다. 같다고도 다르다고도 말하지 않는다.",
        exp: "(아이가 '선생님은 알잖아요' 라고 한다. 그때 \"Our paper does not say. Yours will, tonight.\")",
        stuck: "\"Write your question in the margin. Bring me the answer tomorrow.\"" },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What must they save the tortoise from...' becomes 'They must save it from...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They must save it from an erupting volcano.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Questions five, six and seven have no answer on this sheet. Not because I hid it — because nobody wrote it down for us.",
        do: "이 수업에서 가장 중요한 한 마디다. 모르는 것을 모른다고 말하는 본보기를 선생님이 먼저 보인다.",
        exp: "(아이가 '그럼 어떻게 해요' 라고 묻는다. 그때 \"You read the book\" 한 마디면 된다)",
        stuck: "\"Our paper stops at 'an erupting volcano.' The book keeps going. You go with it.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. Today only the first two are filled.",
        do: "다섯 칸을 손가락으로 짚는다. 두 칸만 차 있는 것을 아이 눈으로 보게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to save a tortoise",
        stuck: "\"Who travels in this story? And what do they have to do?\" 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty, and so is the ending. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 때(time) 칸이 비어 있는 것도 함께 짚는다 — 제목에 Time 이 있지만 우리 자료는 언제인지 말하지 않는다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in our summary.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Volcano)", min: "",
        say: "Stop at The Volcano. I am not asking what it looks like. I am asking what you would DO.",
        do: "→ 이 칸에서 반드시 멈춘다. 무서운 장면을 그리게 하지 않는다. 행동을 적게 한다. 장서 발문 ③ 과 같은 방향이다. 겁이 많은 아이가 있으면 \"우리 교실에서 지금 무엇을 할까\" 로 바꿔 묻는다.",
        exp: "I would carry it. / I would find a cart. / I would call for help.",
        stuck: "\"A tortoise is slow. You are fast. What does that let you do?\"" },

      { stage: "Mind Map (The Galapagos Islands)", min: "",
        say: "Our paper gives us the name and nothing else. Write down one thing you want the book to tell you about it.",
        do: "선생님이 갈라파고스를 설명하지 않는다. 지명 하나 말고는 우리 근거에 아무것도 없다. 아이의 질문만 받아 적게 한다.",
        exp: "Where is it? / Who lives there? / Why turtles?",
        stuck: "지도를 펴고 이름만 찾게 한다. 그 이상은 말하지 않는다." },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, our summary answers it. Step 2, the summary helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "One tortoise. One erupting volcano. Go toward it, or stay away? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because the tortoise cannot run.",
        stuck: "손을 들게 한다. \"Go? Or stay?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say it is too risky, but a plan makes the risk smaller.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Who do you think the Turtle King is? Write your guess before you read.", ko: "Turtle King 은 누구일 것 같니? 읽기 전에 네 짐작을 적어 두자." },
        { en: "Where are the Galapagos Islands? Find them on a map before you open the book.", ko: "갈라파고스 제도는 어디일까? 책을 펴기 전에 지도에서 찾아보자." },
        { en: "What would you do to help a tortoise escape a volcano?", ko: "거북이 화산에서 빠져나오도록 도우려면 너는 무엇을 하겠니?" }
      ],
      during: [
        { en: "Have you met the Turtle King yet? Was your guess close?", ko: "Turtle King 이 나왔니? 네 짐작과 비슷했니?" },
        { en: "How are Jack and Annie helping the tortoise? What are they actually doing?", ko: "잭과 애니는 거북을 어떻게 돕고 있니? 정확히 무엇을 하고 있니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie save the tortoise? How?", ko: "잭과 애니는 거북을 구했니? 어떻게 했니?" },
        { en: "Now that you have read it — who is the Turtle King?", ko: "다 읽고 나니, Turtle King 은 누구였니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "whisk · expert · erupt 세 낱말은 요약 한 줄에 실제로 있는 말이다. 꼭 짚는다.", miss: "turtle 과 tortoise 의 차이를 선생님이 설명해 버린다. 우리 자료에 없는 말이다. 아이가 책에서 찾게 둔다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "뒤쪽 세 문항은 빈칸이 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 갈라파고스 이야기(다윈·이구아나 같은 것)를 대신 채워 준다. 그건 이 책의 내용이 아니다." },
      { sheet: "Summary Map",   point: "But·So·Then 과 The Ending, 그리고 때(time) 칸은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Volcano' 가지에서 반드시 멈춘다. 무서운 장면이 아니라 '무엇을 할까' 를 쓰게 한다.", miss: "화산이 얼마나 무서운지 이야기가 길어진다. 겁만 남고 할 일이 안 남는다." },
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
  // 이 책은 첫 문장이 남아 있지 않아, 책의 첫 줄로 시작하지 않는다.
  // Turtle King 이 누구인지도, 결말도 근거가 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "마법 나무집이 돌아와 잭과 애니를 갈라파고스 제도로 데려가고, 두 아이가 터지고 있는 화산에서 거북 한 마리를 구해야 하는 이야기",
    text: "When the [[wonderful|magic]] tree house [[came back|returned]], it [[carried|whisked]] Jack and Annie away to the Galapagos Islands. There they [[turned into|became]] World Turtle Experts. They had to [[rescue|save]] a tortoise in danger of an [[exploding|erupting]] volcano. The name of this book is \"Time of the Turtle King.\" Who is the Turtle King? What would you do to help a tortoise escape a volcano? Our [[papers|records]] do not say. Open the book and find out."
  }
};
