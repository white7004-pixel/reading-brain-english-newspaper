// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.2)
// Sunlight on the Snow Leopard (Magic Tree House #36) — 우리는 이 책을 읽지 않았다.
// 이 책은 31권(Warriors in Winter)보다도 근거가 얇다. 오픈라이브러리에 소개글이 없고,
// 첫 문장도 없고, 주제어는 "Children's fiction" 하나뿐이다.
// 우리가 가진 것은 학원 장서 목록의 한 줄 요약과 발문 세 개뿐이다.
// 그래서 분량을 채우지 않았다. 근거가 버티는 만큼만 만들고, 버티지 않는 자리는 비워 두었다.
// 근거가 말하는 것은 딱 여기까지다:
//   모건 르 페이가 잭과 애니에게 "The Gray Ghost" 를 찾아(seek out) 그녀의 이야기를 들으라 한다 /
//   둘은 네팔(Nepal)로 휙 보내진다(are whisked away) /
//   거기서 등반가(a climber) 텐징(Tenzin)을 만난다 /
//   텐징이 둘을 산 위로(up the mountain) 데려가 눈표범 한 마리(a snow leopard)를 만나게 한다 /
//   86쪽 · 2022년 · 이 시리즈의 36권 · 주제어는 Children's fiction 하나 · 그림 A. G. Ford
//
// ── 이 책에서 특히 조심한 것 세 가지 ──────────────────────────────
// ① "The Gray Ghost" 가 무엇인지 우리는 모른다.
//    그것이 눈표범을 가리키는 말인지, 다른 무엇인지 어느 출처도 말하지 않는다.
//    이 파일 어디에서도 둘을 같다고 단정하지 않았다. 아이가 책에서 알아 오게 물음으로 두었다.
// ② 텐징(Tenzin)에 대해 근거가 말하는 것은 "등반가(a climber)" 까지다.
//    에베레스트를 오른 텐징 노르게이(Tenzing Norgay)는 다른 사람이고 이 책 근거에 없다.
//    텐징의 나이·사는 곳·가족·에베레스트 — 한 글자도 쓰지 않았다.
// ③ 눈표범 생태(사는 곳·먹이·남은 수)와 네팔·히말라야 지식을 한 줄도 끌어오지 않았다.
//    쓴 말은 Nepal · the mountain · a snow leopard 뿐이다.
//    다만 근거가 눈표범을 "her" 라고 부르므로(장서 질문 3) 암컷이라는 것만 썼다.
//
// 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 시작 줄을 모두 뺐다.
// 문법 자리는 근거 문장에 실제로 있는 짜임(tells ... to seek out / are whisked / who takes them)으로 채웠다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3940",
  slug: "magic-tree-house-sunlight-on-the-snow-leopard",
  title: "Sunlight on the Snow Leopard",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #36",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)·31권(AR 3.7)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.2", lexile: "540L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/13145614-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약과 발문 세 개를 바닥으로 삼고, 오픈라이브러리 /works/OL26589634W 의 주제어·쪽수·연도만 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3940 요약(\"Morgan le Fay tells Jack and Annie to seek out \\\"The Gray Ghost\\\" and listen to her story. They are whisked away to Nepal where they meet Tenzin, a climber, who takes them up the mountain to meet a snow leopard.\") + 장서 질문 3개 + 오픈라이브러리 /works/OL26589634W (주제어 Children's fiction 하나 · 2022년 · 그림 A. G. Ford · 소개글 없음 · 첫 문장 없음) / /works/OL39184502W (86쪽 · 2022년 · 주제어 없음 · 소개글 없음)",
    characters: ["Jack", "Annie", "Morgan le Fay", "Tenzin", "a snow leopard"],
    beats: [
      "Morgan le Fay tells Jack and Annie to seek out \"The Gray Ghost\" and listen to her story",
      "they are whisked away to Nepal",
      "in Nepal they meet Tenzin, a climber",
      "Tenzin takes them up the mountain to meet a snow leopard"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"to meet a snow leopard\" 에서 그대로 끝난다. 두 아이가 눈표범을 만나 무엇을 하는지, \"The Gray Ghost\" 의 이야기를 정말 듣는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "우리가 모르는 것을 또렷이 적어 둔다. ① \"The Gray Ghost\" 가 무엇인지 — 회색 유령이 눈표범을 가리키는 말인지, 다른 무엇인지 어느 출처도 말하지 않는다. 둘 다 \"her\" 라고 불리지만, 같다고 말한 출처는 없다. 그래서 이 학습지는 둘을 같다고 적지 않았다. ② \"The Gray Ghost\" 가 들려준다는 이야기(her story)의 내용 — 없다. ③ 텐징(Tenzin)에 대한 것 — 근거는 '등반가(a climber)' 까지다. 나이·사는 곳·가족·어느 산을 올랐는지 아무것도 없다. 에베레스트를 오른 텐징 노르게이는 다른 사람이고 이 책 근거에 나오지 않는다. ④ 눈표범에 대한 것 — 사는 곳·먹이·크기·남은 수, 아무것도 없다. 근거가 말하는 것은 '눈표범 한 마리' 와 그녀가 암컷이라는 것(장서 질문이 her 라고 부른다)뿐이다. ⑤ 네팔과 그 산에 대한 것 — 어느 대륙인지, 산 이름이 무엇인지, 히말라야인지 아무것도 없다. ⑥ 제목의 sunlight(햇빛)이 이야기에서 무엇을 뜻하는지 — 없다. 제목에 있는 낱말일 뿐이다. ⑦ 모건 르 페이가 왜 그런 심부름을 시키는지, 잭과 애니가 어떻게 네팔로 가는지(나무 집이 나오는지조차) — 없다. ⑧ 책의 첫 문장 — 어느 기록에도 없다. ⑨ 장(chapter) 구성과 각 장에서 무슨 일이 일어나는지 — 없다. 그래서 이 학습지에는 장 번호가 한 번도 나오지 않는다",
    checked: "장서 요약의 낱말(Morgan le Fay / seek out / The Gray Ghost / her story / are whisked away / Nepal / Tenzin / a climber / up the mountain / a snow leopard)과 장서 질문 세 개, 오픈라이브러리 주제어(Children's fiction)를 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 장서 질문 1 \"Who takes Jack and Annie up the mountain to meet the snow leopard?\" 는 요약의 \"who takes them up the mountain\" 을 한 번 더 받쳐 주었다. 장서 질문 3 \"...if you met her?\" 가 눈표범을 her 라고 부르므로 암컷이라는 것만 썼다. 오픈라이브러리 기록 두 건(/works/OL26589634W, /works/OL39184502W)은 둘 다 이 책이지만 소개글도 첫 문장도 비어 있어, 제목·연도·쪽수·주제어 말고는 가져올 것이 없었다. 첫 문장이 없으므로 첫 문장을 쓴 문항을 모두 뺐고, 근거가 31권보다도 얇아 퀴즈를 13개로 맞췄다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 제목을 하나하나 확인해 이 책(#36)이 아닌 영상은 넣지 않았다. 셋 다 제목에 "#36 Sunlight on the
  // snow leopard by Mary Pope Osborne" 이 그대로 들어 있어 다른 권이 섞이지 않았다.
  // 다만 세 영상의 제목이 서로 똑같고 장(chapter) 표시도 길이 표시도 없어, 어느 것이 통본(책 한 권
  // 전체) 낭독인지 우리는 확인하지 못했다. 그래서 순서를 장 차례로 놓았다고 말할 수 없다 —
  // 목록에 실린 차례 그대로 두었다. 아이에게는 첫 영상부터 열어 보고 이어지는 데까지 듣게 한다.
  shadowing: {
    query: "\"Sunlight on the Snow Leopard\" Magic Tree House read aloud",
    searchUrl: "https://www.youtube.com/watch?v=S0SQudGLbI8",
    videos: [
      { url: "https://www.youtube.com/watch?v=S0SQudGLbI8", title: "Magic Tree House #36 Sunlight on the snow leopard by Mary Pope Osborne",
        channel: "", views: "", length: "" },
      { url: "https://www.youtube.com/watch?v=YlS4JAWDK-Q", title: "Magic Tree House #36 Sunlight on the snow leopard by Mary Pope Osborne",
        channel: "", views: "", length: "" },
      { url: "https://www.youtube.com/watch?v=sQrRiSlEsuI", title: "Magic Tree House #36 Sunlight on the snow leopard by Mary Pope Osborne",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 장서 요약 한 줄 · 책 제목 · 장서 질문에 실제로 나오는 말에서만 골랐다.
  // 눈표범 생태를 설명하는 낱말(prey, fur, endangered, habitat ...)과 네팔·히말라야 낱말은
  // 한 개도 끌어오지 않았다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "sunlight",    pos: "n.",   en: "the light that comes from the sun", ko: "햇빛",
      ex: "The name of this book is \"{{Sunlight}} on the Snow Leopard.\"", ex_ko: "이 책의 제목은 '눈표범 위의 햇빛' 이에요.", pic: "☀️" },
    { word: "snow leopard",pos: "n.",   en: "a kind of large wild cat", ko: "눈표범",
      ex: "Tenzin takes Jack and Annie up the mountain to meet a {{snow leopard}}.", ex_ko: "텐징이 잭과 애니를 산 위로 데려가 눈표범을 만나게 해요.", pic: "🐆" },
    { word: "gray",        pos: "adj.", en: "having the color between black and white", ko: "회색의",
      ex: "Morgan le Fay calls it \"The {{Gray}} Ghost.\"", ex_ko: "모건 르 페이는 그것을 '회색 유령' 이라고 불러요.", pic: "🩶" },
    { word: "ghost",       pos: "n.",   en: "the spirit of someone who has died, which some people believe they can see", ko: "유령",
      ex: "Jack and Annie must seek out \"The Gray {{Ghost}}.\"", ex_ko: "잭과 애니는 '회색 유령' 을 찾아내야 해요.", pic: "👻" },
    { word: "seek out",    pos: "v.",   en: "to look for someone or something until you find them", ko: "찾아내다",
      ex: "Morgan le Fay tells them to {{seek out}} \"The Gray Ghost.\"", ex_ko: "모건 르 페이가 둘에게 '회색 유령' 을 찾아내라고 해요.", pic: "🔍" },
    { word: "story",       pos: "n.",   en: "something that someone tells about things that happened", ko: "이야기",
      ex: "Morgan le Fay tells them to listen to her {{story}}.", ex_ko: "모건 르 페이가 둘에게 그녀의 이야기를 들으라고 해요.", pic: "📖" },
    { word: "whisk",       pos: "v.",   en: "to take someone away quickly and suddenly", ko: "휙 데려가다",
      ex: "Jack and Annie are {{whisked}} away to Nepal.", ex_ko: "잭과 애니는 네팔로 휙 보내져요.", pic: "💨" },
    { word: "Nepal",       pos: "n.",   en: "the country Jack and Annie are whisked away to in this story", ko: "네팔 (나라 이름)",
      ex: "They are whisked away to {{Nepal}}.", ex_ko: "그들은 네팔로 휙 보내져요.", pic: "🗺️" },
    { word: "climber",     pos: "n.",   en: "a person who climbs up things such as mountains", ko: "등반가",
      ex: "In Nepal they meet Tenzin, a {{climber}}.", ex_ko: "네팔에서 그들은 등반가 텐징을 만나요.", pic: "🧗" },
    { word: "mountain",    pos: "n.",   en: "a very high piece of land, much higher than a hill", ko: "산",
      ex: "Tenzin takes them up the {{mountain}}.", ex_ko: "텐징이 그들을 산 위로 데려가요.", pic: "⛰️" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아, 첫 문장으로 배우는 문법을 넣지 않았다.
  // 대신 장서 요약 한 줄에 실제로 들어 있는 세 가지 짜임을 그대로 가져왔다:
  //   tells ... to seek out  /  are whisked  /  who takes them
  grammar: {
    points: [
      { name: "tell + 사람 + to + 동사원형", ko: "~에게 …하라고 말하다",
        sent: "Morgan le Fay [[tells]] Jack and Annie [[to seek]] out \"The Gray Ghost.\"",
        why_ko: "누구에게 무엇을 하라고 시킬 때 tell 뒤에 '사람' 을 먼저 쓰고, 그다음 to + 동사원형을 써요. tell to Jack(X), tell Jack to seek(O). 순서가 시험에 그대로 나옵니다.",
        why: "After \"tell,\" name the person first, then use \"to\" plus the plain form of the verb.",
        try: "Morgan le Fay {{tells}} them {{to listen}} to her story." },
      { name: "수동태 (be + 과거분사)", ko: "당하는 문장",
        sent: "Jack and Annie [[are whisked]] away to Nepal.",
        why_ko: "누가 했는지보다 '당하는 쪽' 이 중요할 때 be동사 + 과거분사를 써요. 잭과 애니가 누구를 데려간 게 아니라 데려가진 거예요. are whisk(X), are whisked(O).",
        why: "Use \"be\" plus the past participle when the important thing is what happens TO someone.",
        try: "The two children {{are whisked}} away to Nepal." },
      { name: "관계대명사 who", ko: "사람을 이어 주는 말",
        sent: "They meet Tenzin, a climber, [[who]] takes them up the mountain.",
        why_ko: "앞에 나온 '사람' 을 뒤 문장과 이어 줄 때 who 를 써요. 물건이면 which 예요. 여기서 who 는 앞의 Tenzin 을 가리켜요. who 뒤에는 바로 동사가 옵니다.",
        why: "Use \"who\" to join a sentence to a person you just named. A verb comes right after it.",
        try: "They meet Tenzin, a climber, {{who}} takes them up the mountain." }
    ],
    find: "책에서 who 로 이어지는 문장을 두 개 찾아 쓰세요. · Find two sentences joined with \"who.\"",
    exam: {
      choose: [
        { q: "Morgan le Fay tells (to Jack and Annie / Jack and Annie) to seek out \"The Gray Ghost.\"", a: "Jack and Annie",
          why_ko: "tell 뒤에는 사람이 바로 와요. tell to Jack 이 아니라 tell Jack 이에요." },
        { q: "Morgan le Fay tells them (to listen / listen) to her story.", a: "to listen",
          why_ko: "tell + 사람 다음에는 to + 동사원형! to listen 이 맞아요." },
        { q: "Jack and Annie (are whisk / are whisked) away to Nepal.", a: "are whisked",
          why_ko: "be동사 뒤에는 과거분사가 와요. are whisked 가 맞아요." },
        { q: "They meet Tenzin, a climber, (who / which) takes them up the mountain.", a: "who",
          why_ko: "텐징은 사람이에요. 사람을 이어 줄 때는 who 를 써요." },
        { q: "Tenzin is a climber (who / whose) takes them up the mountain.", a: "who",
          why_ko: "who 뒤에는 바로 동사(takes)가 와요. whose 뒤에는 명사가 옵니다." }
      ],
      fix: [
        { q: "Morgan le Fay tells [[to Jack and Annie]] to seek out \"The Gray Ghost.\"", a: "Jack and Annie",
          why_ko: "tell 뒤에는 to 없이 사람을 바로 써요." },
        { q: "Jack and Annie [[are whisk]] away to Nepal.", a: "are whisked",
          why_ko: "be + 과거분사예요. whisk 를 whisked 로 고쳐요." },
        { q: "They meet Tenzin, a climber, [[which]] takes them up the mountain.", a: "who",
          why_ko: "텐징은 사람이니까 which 가 아니라 who 예요." }
      ],
      write: [
        { ko: "모건 르 페이가 잭과 애니에게 '회색 유령' 을 찾아내라고 말한다.", cond: "tell, seek out", a: "Morgan le Fay tells Jack and Annie to seek out \"The Gray Ghost.\"",
          why_ko: "tell + 사람 + to + 동사원형 순서로 씁니다." },
        { ko: "그들은 네팔로 휙 보내진다.", cond: "수동태, whisk", a: "They are whisked away to Nepal.",
          why_ko: "데려가진 것이니 be + 과거분사, 곧 are whisked 예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 세 문항은 답을 비워 두었다. 우리 근거가 거기까지 말하지 않기 때문이다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who tells Jack and Annie to seek out \"The Gray Ghost\"?",
      frame: "{{Morgan le Fay}} tells them to seek out \"The Gray Ghost.\"" },
    { ref: "장서 요약", skill: "사실찾기", q: "Morgan le Fay asks them to do two things. What are they?",
      frame: "She tells them to {{seek out \"The Gray Ghost\"}} and to {{listen to her story}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where are Jack and Annie whisked away to, and whom do they meet there?",
      frame: "They are whisked away to {{Nepal}}, and there they meet {{Tenzin}}, a {{climber}}." },
    { ref: "장서 질문", skill: "사실찾기", q: "Who takes Jack and Annie up the mountain to meet the snow leopard?",
      frame: "{{Tenzin}} takes them up the mountain." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Sunlight on the Snow Leopard.\" Two things are named in it. What are they, and what do you picture?",
      frame: "The title names {{sunlight}} and a {{snow leopard}}. I picture {{                    }}." },
    { ref: "장서 요약", skill: "추론·예측", q: "Our summary never says what \"The Gray Ghost\" is. What do you guess it is? Read the book and check.",
      frame: "I guessed \"The Gray Ghost\" was {{                    }}. In the book it is {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Have you ever climbed a mountain or a high hill? What would you like to say to the snow leopard if you met her?",
      frame: "I {{                    }} climbed a high place. I would say to her, \"{{                    }}\"" }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 이 책은 근거가 얇아 13문항만 냈다. 억지로 더 채우지 않았다.
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장을 묻는 문항은 뺐다 — 어느 기록에도 이 책의 첫 문장이 없다.
  // "The Gray Ghost" 가 눈표범이라고 단정하는 문항은 한 개도 넣지 않았다. 우리는 모른다.
  quiz: [
    { q: "Who tells Jack and Annie to seek out \"The Gray Ghost\"?",
      a: ["Morgan le Fay", "Tenzin", "Mary Pope Osborne", "A snow leopard"], c: 0,
      why_ko: "모건 르 페이예요. 장서 요약이 \"Morgan le Fay tells Jack and Annie to seek out...\" 이라고 이름을 그대로 적어요. Mary Pope Osborne 은 이 책을 쓴 작가예요.",
      why: "Morgan le Fay. The catalog summary begins with her name." },
    { q: "What does Morgan le Fay tell Jack and Annie to do after they find \"The Gray Ghost\"?",
      a: ["Listen to her story", "Take her picture", "Bring her home", "Give her a name"], c: 0,
      why_ko: "그녀의 이야기를 들으라고 해요. 요약이 \"and listen to her story\" 라고 말해요. 사진·집·이름은 근거에 없어요.",
      why: "Listen to her story — the summary says \"and listen to her story.\"" },
    { q: "Where are Jack and Annie whisked away to?",
      a: ["Nepal", "Rome", "Japan", "The moon"], c: 0,
      why_ko: "네팔이에요. 요약이 \"They are whisked away to Nepal\" 이라고 나라 이름을 그대로 적어요.",
      why: "Nepal. The summary says \"They are whisked away to Nepal.\"" },
    { q: "Whom do Jack and Annie meet in Nepal?",
      a: ["Tenzin", "Morgan le Fay", "Marcus Aurelius", "A misplaced cowboy"], c: 0,
      why_ko: "텐징이에요. 요약이 \"where they meet Tenzin\" 이라고 말해요.",
      why: "Tenzin. The summary says \"where they meet Tenzin.\"" },
    { q: "What does our summary tell us about Tenzin?",
      a: ["He is a climber", "He is a teacher", "He is a king", "He is a doctor"], c: 0,
      why_ko: "등반가(a climber)예요. 요약이 \"Tenzin, a climber\" 라고 딱 그만큼만 말해요. 그 밖에 텐징이 누구인지는 우리 자료에 없어요.",
      why: "A climber. The summary says only \"Tenzin, a climber\" — nothing more about him." },
    { q: "Where does Tenzin take Jack and Annie?",
      a: ["Up the mountain", "Down to the sea", "Into a cave", "Back to the tree house"], c: 0,
      why_ko: "산 위로 데려가요. 요약이 \"who takes them up the mountain\" 이라고 말해요.",
      why: "Up the mountain — \"who takes them up the mountain.\"" },
    { q: "Whom do Jack and Annie go up the mountain to meet?",
      a: ["A snow leopard", "A climber", "A queen", "A ghost town sheriff"], c: 0,
      why_ko: "눈표범 한 마리예요. 요약이 \"to meet a snow leopard\" 에서 딱 끝나요.",
      why: "A snow leopard. The summary ends with \"to meet a snow leopard.\"" },
    { q: "In the summary, Jack and Annie \"are whisked away\" to Nepal. What does \"whisk\" mean here?",
      a: ["To take someone away quickly and suddenly", "To wait a long time", "To walk slowly", "To wake someone up"], c: 0,
      why_ko: "whisk 는 '휙 데려가다' 예요. 눈 깜짝할 사이에 데려간다는 뜻이에요.",
      why: "To whisk someone away is to take them off quickly and suddenly." },
    { q: "Morgan le Fay tells them to \"seek out\" \"The Gray Ghost.\" What does \"seek out\" mean?",
      a: ["To look for someone until you find them", "To run away from someone", "To forget about someone", "To draw someone"], c: 0,
      why_ko: "seek out 은 '찾아내다' 예요. 찾을 때까지 찾는다는 뜻이에요.",
      why: "To seek someone out is to look for them until you find them." },
    { q: "Which two things are named in the title of this book?",
      a: ["Sunlight and a snow leopard", "A mountain and a ghost", "Nepal and a climber", "Winter and warriors"], c: 0,
      why_ko: "햇빛과 눈표범이에요. 제목이 \"Sunlight on the Snow Leopard\" 예요. 'Warriors in Winter' 는 이 시리즈의 다른 권이에요.",
      why: "Sunlight and a snow leopard — the title is \"Sunlight on the Snow Leopard.\"" },
    { q: "Our records call the snow leopard \"her.\" What does that tell us about her?",
      a: ["She is female", "She is old", "She is small", "She is friendly"], c: 0,
      why_ko: "암컷이라는 거예요. 장서 질문이 \"...if you met her?\" 라고 her 를 써요. 나이나 크기나 성격은 우리 자료에 없어요.",
      why: "She is female. Our question sheet asks what you would say \"if you met her.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#6", "#16", "#26", "#36"], c: 3,
      why_ko: "36권이에요. 장서 목록 제목이 \"#36 Sunlight on the Snow Leopard\" 예요.",
      why: "Book #36 — the catalog title is \"#36 Sunlight on the Snow Leopard.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie are whisked away to", "Who takes them up the mountain", "What \"The Gray Ghost\" is", "Who sends them on the errand"], c: 2,
      why_ko: "\"회색 유령\" 이 무엇인지예요. 모건이 그것을 찾아 이야기를 들으라고 말할 뿐, 그것이 무엇인지 우리 자료는 한 마디도 하지 않아요. 눈표범을 가리키는 말인지 아닌지도 적혀 있지 않아요. 책을 읽어야 알 수 있어요.",
      why: "What \"The Gray Ghost\" is. Our summary names it but never says what it is." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // But·So·Then 과 The Ending 은 근거가 말하지 않는다. 비워 두었다. 아이가 책을 읽고 채운다.
  // Somebody 와 Wanted 만 요약 첫 문장으로 채울 수 있었다.
  summaryMap: {
    setting: { place: "{{Nepal, up the mountain}}", time: "{{                    }}" },   // 언제 일어난 일인지 근거가 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to seek out \"The Gray Ghost\" and listen to her story}}" },
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Errand",
        given: "Morgan le Fay tells Jack and Annie to seek out \"The Gray Ghost\" and listen to her story.",
        frame: "{{Morgan le Fay}} sends them to find \"The {{Gray}} Ghost\" and listen to her {{story}}." },
      { label: "Nepal",
        given: "They are whisked away to Nepal.",
        frame: "They are {{whisked}} away to {{Nepal}}." },
      { label: "The Climber",
        given: "",
        frame: "There they meet {{Tenzin}}, a {{climber}}, who takes them up the {{mountain}}." },
      { label: "The Gray Ghost",
        given: "우리 자료는 이름만 알려 준다. 그것이 무엇인지는 말해 주지 않는다. 눈표범인지 아닌지도 적혀 있지 않다.",
        frame: "Our records call it \"The {{Gray}} Ghost.\" In the book, \"The Gray Ghost\" is {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 \"to meet a snow leopard\" 에서 끝난다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Sunlight on the Snow Leopard",
    branches: [
      { label: "Morgan le Fay", ask: "Morgan le Fay tells Jack and Annie to seek out something and listen. What kind of errand is that?",
        deeper: "Why do you think she says \"listen\" instead of \"bring it back\"?" },
      { label: "The Gray Ghost", ask: "Before you read: what do you guess \"The Gray Ghost\" is? Say it as a guess.",
        deeper: "After reading: was your guess right? What in the book told you?" },
      { label: "Nepal",        ask: "Jack and Annie are whisked away to a country called Nepal. What would you want to look at first?",
        deeper: "What is the difference between being whisked somewhere and choosing to go?" },
      { label: "Tenzin",       ask: "Our records say only that Tenzin is a climber. What does a climber have to be good at?",
        deeper: "Why would two children need a climber with them?" },
      { label: "The Snow Leopard", ask: "They go up the mountain to meet a snow leopard. What would you do in the first minute?",
        deeper: "\"Sunlight on the Snow Leopard\" — why might sunlight be in the title of her story?" },
      { label: "Me",           ask: "Have you ever climbed a mountain or a high hill? What was the hardest part?",
        deeper: "If someone told you to find something and just listen, could you do it? Why or why not?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Perspective",
    relatedConcepts: ["Curiosity", "Journey", "Listening"],
    globalContext: "Orientation in space and time — 멀리 떨어진 곳의 다른 생명과 나는 어떻게 이어지는가",
    statement: "Being told to find something and simply listen to it is a different kind of errand from being told to bring it back.",
    factual: [
      "Who tells Jack and Annie to seek out \"The Gray Ghost\"?",
      "Where are they whisked away to, and whom do they meet there?",
      "Who takes them up the mountain, and whom do they go to meet?"
    ],
    conceptual: [
      "What is the difference between finding something and listening to it?",
      "Our summary names \"The Gray Ghost\" but never says what it is. Why might a name alone not be enough?"
    ],
    debatable: [
      "Is it better to be whisked somewhere suddenly, or to plan the trip yourself?",
      "Can an animal tell you a story? Take a side and say why."
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Reflective"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "눈표범을 만나러 산에 올라간다" 까지만 말한다. 만나서 무엇을 하는지 적혀 있지 않으므로,
    // 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    // 장서 질문 3번("What would you like to say to the snow leopard if you met her?")을 그대로 살렸다.
    prompt: "Tenzin takes Jack and Annie up the mountain to meet a snow leopard. If you met her, what would you like to say to her? Write your opinion and give your reason.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "하고 싶은 말을 한 가지만 고를 것 · Choose just one thing to say",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "What I Would Say to Her", lines: 1 },
      { part: "P — Point",       ask: "What would you say to the snow leopard? Say it in one clear sentence.",
        eg: "I would ask her to tell me her story.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "Tenzin takes Jack and Annie up the mountain to meet a snow leopard.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they climbed so far just to meet her, so she must be worth hearing.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people would say nothing and just watch, but I would rather ask.", lines: 2 },
      { part: "L — Link",        ask: "Say your choice again in different words.",
        eg: "For this reason, those are the words I would use first.", lines: 2 }
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
      en: "Students retell how Morgan le Fay sends Jack and Annie to seek out \"The Gray Ghost,\" how they are whisked away to Nepal, and how Tenzin the climber takes them up the mountain to meet a snow leopard; they say clearly what our sources do not tell them; then they choose one thing they would say to her and defend it.",
      ko: "모건 르 페이가 잭과 애니에게 '회색 유령' 을 찾아 이야기를 들으라 하고, 둘이 네팔로 휙 보내져 등반가 텐징을 만나 산 위로 올라가 눈표범을 만난다는 흐름을 말하고, 우리 자료가 말해 주지 않는 것이 무엇인지 스스로 짚은 뒤, 눈표범에게 하고 싶은 말 한 가지를 골라 그 까닭을 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이고, 그 양이 아주 적다.
    // 그래서 이 수업의 절반은 '모르는 것을 모른다고 말하는 연습' 이다.
    // 눈표범 생태(사는 곳·먹이·멸종위기)와 네팔·히말라야·에베레스트는 이 수업에서 꺼내지 않는다. 근거에 없다.
    // 텐징을 실존 산악인과 겹쳐 말하지 않는다. 우리가 아는 것은 '등반가' 까지다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever climbed a mountain or a high hill? What was the hardest part?",
        do: "책을 펴기 전에 한다. 서너 명만 받는다. 오늘 이야기가 산으로 올라가는 이야기라는 것만 깔아 둔다.",
        exp: "My legs hurt. / I could not breathe well. / The top was windy.",
        stuck: "선생님이 먼저 한 문장 한다. \"I climbed a hill behind my school, and the last part was the hardest.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Sunlight on the Snow Leopard.\" Two things are named. What are they?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다 — 우리도 모른다.",
        exp: "Sunlight. / A snow leopard.",
        stuck: "표지를 가리킨다. \"Where is the light coming from?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "찾아내다 → seek out / 등반가 → climber / 휙 데려가다 → whisk",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Seek out. Not just look — seek out means keep looking until you find it. Morgan le Fay uses that word.",
        do: "이 한 낱말이 오늘 어휘의 핵심이다. 요약 첫 문장에 실제로 들어 있는 말이다.",
        exp: "It means you do not stop. / You have to really find it.",
        stuck: "교실에서 물건 하나를 숨기고 \"Seek it out\" 한 번 시켜 본다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Who takes them up the mountain?' becomes 'Tenzin takes them...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "Tenzin takes them up the mountain.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our paper says only this about Tenzin: he is a climber. That is all. Do not add anything we do not know.",
        do: "아이가 텐징에 대해 이야기를 지어내려 하면 여기서 멈춘다. 선생님도 보태지 않는다.",
        exp: "(아이가 '몇 살이에요?' 라고 묻는다. \"Our paper does not say\" 한 마디면 된다)",
        stuck: "\"Point to the word on your sheet that tells us about Tenzin.\" — a climber, 한 낱말이다." },

      { stage: "Comprehension", min: "",
        say: "Questions five, six and seven have no answer on this sheet. Not because I hid it — because nobody wrote it down for us.",
        do: "이 수업에서 가장 중요한 한 마디다. 모르는 것을 모른다고 말하는 본보기를 선생님이 먼저 보인다.",
        exp: "(아이가 '그럼 어떻게 해요' 라고 묻는다. 그때 \"You read the book\" 한 마디면 된다)",
        stuck: "\"Our paper stops after 'meet a snow leopard.' The book keeps going. You go with it.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. Today only the first two are filled.",
        do: "다섯 칸을 손가락으로 짚는다. 두 칸만 차 있는 것을 아이 눈으로 보게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to seek out \"The Gray Ghost\" and listen to her story",
        stuck: "\"Who travels in this story? And what were they told to do?\" 앞 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in our summary.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Gray Ghost)", min: "",
        say: "Stop at The Gray Ghost. This is a guess, and a guess is allowed — as long as you call it a guess.",
        do: "→ 이 칸에서 반드시 멈춘다. 추측과 사실을 가르는 연습이 여기서 일어난다. 아이들 여럿이 \"눈표범이요!\" 라고 말할 것이다. 그때 선생님이 \"Maybe. Our paper never says so. Write it as a guess.\" 라고 받는다. 선생님도 단정하지 않는다.",
        exp: "I guess The Gray Ghost is the snow leopard, because both are called \"her.\"",
        stuck: "\"Say it like this: 'I guess..., because...' Then we check it in the book.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, our summary answers it. Step 2, the summary helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Can an animal tell you a story? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "Yes, because a story can be shown, not only spoken.",
        stuck: "손을 들게 한다. \"Yes? Or no?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people would say nothing and just watch, but I would rather ask.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Morgan le Fay says \"seek out The Gray Ghost.\" What do you guess that is?", ko: "모건이 '회색 유령을 찾아내라' 고 해. 그게 뭘까? 네 짐작을 말해 봐." },
        { en: "Jack and Annie are whisked away to Nepal. What do you already know about Nepal?", ko: "잭과 애니가 네팔로 휙 보내져. 네팔에 대해 아는 게 있니?" },
        { en: "The title says sunlight. Why might light be in the title of this story?", ko: "제목에 햇빛이 있어. 이야기 제목에 왜 빛이 들어갔을까?" }
      ],
      during: [
        { en: "Have you found out what \"The Gray Ghost\" is yet?", ko: "'회색 유령' 이 뭔지 이제 나왔니?" },
        { en: "What is Tenzin like? Our paper only said he is a climber.", ko: "텐징은 어떤 사람이니? 우리 자료엔 '등반가' 라는 말뿐이었어." },
        { en: "What is the climb up the mountain like for Jack and Annie?", ko: "잭과 애니에게 산을 오르는 길은 어땠니?" }
      ],
      after: [
        { en: "So — what is \"The Gray Ghost\"? Tell me what our summary did not tell us.", ko: "그래서 '회색 유령' 은 뭐였니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What story does she tell, and did Jack and Annie really listen?", ko: "그녀는 어떤 이야기를 들려줬고, 잭과 애니는 정말 들었니?" },
        { en: "How does the story end? Where do Jack and Annie go after the mountain?", ko: "이야기는 어떻게 끝났니? 산에서 내려와 둘은 어디로 갔니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "seek out 과 whisk 두 낱말은 요약 한 줄에 실제로 있는 말이다. 꼭 짚는다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "뒤쪽 세 문항은 빈칸이 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 눈표범 생태나 네팔 지리를 대신 채워 준다. 그건 이 책의 내용이 아니다." },
      { sheet: "Comprehension", point: "텐징은 '등반가' 까지다. 실존 산악인 이야기를 꺼내지 않는다.", miss: "에베레스트를 오른 사람 이야기를 곁들인다. 그 사람은 이 책에 나오지 않는다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Gray Ghost' 가지에서 반드시 멈춘다. 추측은 추측이라고 말하게 한다.", miss: "'회색 유령 = 눈표범' 이라고 선생님이 확인해 준다. 우리 자료는 그렇게 말한 적이 없다." },
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
  // 근거(장서 요약 한 줄 · 장서 질문 · 책 제목)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 남아 있지 않아, 책의 첫 줄로 시작하지 않는다.
  // 근거가 결말도 "The Gray Ghost" 의 정체도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "모건 르 페이가 잭과 애니에게 '회색 유령' 을 찾아 이야기를 들으라 하고, 둘이 네팔에서 등반가 텐징을 만나 산 위로 올라가는 이야기",
    text: "Morgan le Fay [[asked|told]] Jack and Annie to [[look for|seek out]] \"The Gray Ghost\" and listen to her [[tale|story]]. Then the two children [[were carried|were whisked]] away to Nepal. There they met Tenzin, a [[mountain walker|climber]]. Tenzin took them up the [[high land|mountain]] to meet a snow leopard. What is \"The Gray Ghost\"? What story does she tell? Our [[papers|records]] do not say. Open the book and find out."
  }
};
