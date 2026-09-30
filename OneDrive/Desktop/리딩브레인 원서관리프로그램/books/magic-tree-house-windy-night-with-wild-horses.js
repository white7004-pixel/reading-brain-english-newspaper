// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.6)
// Windy Night with Wild Horses (Magic Tree House #39) — 우리는 이 책을 읽지 않았다.
// 이 책은 우리가 만든 책 가운데 근거가 가장 얇다. 33권(일각고래)보다도 얇다.
// 오픈라이브러리 기록이 세 건 있으나 세 건 모두 소개글(desc)이 비어 있고 첫 문장(first)도 없다.
// 주제어(subjects) 목록은 세 건 모두 통째로 비어 있다. 인물·지명 목록도 전부 비어 있다.
// 우리가 가진 것은 학원 장서 목록의 한 줄 요약과 발문 세 개가 전부다.
// 그래서 분량을 채우지 않았다. 근거가 버티는 만큼만 만들고, 버티지 않는 자리는 비워 두었다.
// 근거가 말하는 것은 딱 네 가지다:
//   잭과 애니 / 둘이 휙 데려가진다(are whisked away — 누가 데려가는지는 적혀 있지 않다) /
//   몽골(Mongolia)로 / 작은 말들(little horses)을 구하러
// 몽골에 대해서는 한 글자도 쓰지 않았다. 초원·게르·유목·칭기즈 칸·사막 — 어느 것도 근거에 없다.
// 쓸 수 있는 말은 지명 Mongolia 하나뿐이고, 어느 대륙인지조차 근거가 말하지 않는다.
// 말에 대해서도 한 글자도 쓰지 않았다. 어떤 종인지, 몇 마리 남았는지, 무엇을 먹는지 — 근거에 없다.
// 특히 조심한 것 하나: 제목은 "Wild Horses"(야생마)인데 요약은 "little horses"(작은 말들)라고만 한다.
//   둘이 같은 말인지 어느 출처도 말하지 않는다. 그래서 이 학습지는 어디에서도
//   그 말들을 '야생마'라고 단정하지 않는다. wild 는 제목 낱말로만 뜻을 달았다.
// 제목의 "Windy Night" 도 마찬가지다. 요약은 바람도 밤도 말하지 않는다.
//   낱말 뜻까지만 다루고, 이야기와 어떻게 이어지는지는 아이가 책에서 찾도록 물음으로 두었다.
// 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 시작 줄을 모두 뺐다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3943",
  slug: "magic-tree-house-windy-night-with-wild-horses",
  title: "Windy Night with Wild Horses",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #39",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)·31권(AR 3.7)·33권(AR 3.4)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.6", lexile: "470L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/14591676-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약과 발문 세 개를 바닥으로 삼았다. 오픈라이브러리 기록 세 건은 열어 보았으나 가져올 것이 쪽수와 출간연도뿐이었다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3943 요약(\"Jack and Annie are whisked away to Mongolia to rescue little horses.\")과 발문 세 개(\"Where do Jack and Annie go to rescue the little horses?\" / \"Have you ever seen a horse up close?\" / \"What would you do to help rescue a little horse?\") + 장서 목록 항목(제목 \"#39 Windy Night with Wild Horses\" · 저자 Mary Pope Osborne · 시리즈 Magic Tree House · AR 3.6 · 렉사일 470 · 픽션 · 갈래 Chapter Books · 주제 Animals · 수상 없음) + 오픈라이브러리 세 건. 오픈라이브러리는 세 건 모두 소개글(desc)이 빈 칸, 첫 문장(first)도 빈 칸, 주제어(subjects) 목록도 통째로 빈 칸이었다 — /works/OL37576337W (2024년 · 쪽수 기록 없음) · /works/OL42411623W (Mary Pope Osborne, A. G. Ford · 112쪽 · 2025년) · /works/OL37615897W (9권 진열대 상품 기록 · 2024년). 인물 목록과 지명 목록도 세 건 모두 비어 있었다",
    characters: ["Jack", "Annie"],
    beats: [
      "Jack and Annie are whisked away to Mongolia",
      "they are sent there to rescue little horses"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"to rescue little horses\" 에서 그대로 끝난다. 두 아이가 말들을 구했는지, 어떻게 구했는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "우리가 모르는 것을 번호를 붙여 또렷이 적어 둔다. ① 누가 두 아이를 데려가는지 — 요약이 \"are whisked away\" 라고 수동으로만 쓰고 데려가는 쪽을 적지 않는다. 이 시리즈의 다른 권처럼 나무 집이 데려갔다고 우리가 덧붙이지 않았다. ② 몽골이 어떤 곳인지 — 지명 Mongolia 말고는 한 줄도 없다. 어느 대륙인지, 날씨가 어떤지, 누가 사는지, 어떻게 생긴 땅인지 — 아무것도 없다. ③ 작은 말들이 어떤 말인지 — 요약이 쓰는 말은 \"little horses\" 뿐이다. 크기 말고는 아무 설명이 없다. ④ 제목의 \"Wild Horses\" 와 요약의 \"little horses\" 가 같은 말들인지 — 어느 출처도 말하지 않는다. 그래서 이 학습지는 그 말들을 야생마라고 단정하지 않는다. ⑤ 말이 몇 마리인지 — 요약은 복수형 horses 라고만 쓰고 수를 말하지 않는다. ⑥ 말들이 무엇에서 구해져야 하는지, 무엇이 말들을 위험에 빠뜨렸는지 — 없다. 요약은 \"구하러 간다\" 에서 끊긴다. ⑦ 두 아이가 끝내 말들을 구하는지 — 없다. ⑧ 제목의 \"Windy Night\" 가 이야기의 무엇을 가리키는지 — 없다. 바람도 밤도 요약에 한 번도 나오지 않는다. ⑨ 임무를 누가 주었는지, 모건이나 수수께끼가 나오는지 — 없다. ⑩ 등장인물은 잭과 애니 둘이 전부다. 오픈라이브러리 인물 목록이 세 건 모두 비어 있다. ⑪ 책의 첫 문장 — 세 기록 어디에도 없다. ⑫ 장(chapter) 구성과 각 장에서 무슨 일이 일어나는지 — 없다. 그래서 이 학습지에는 장 번호가 한 번도 나오지 않는다",
    checked: "장서 요약의 낱말(Jack / Annie / are whisked away / Mongolia / to rescue / little horses)과 제목 낱말(Windy · Night · Wild · Horses), 장서 발문 세 줄, 장서 목록 항목(#39 · AR 3.6 · 렉사일 470 · 픽션 · Chapter Books · Animals)을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 오픈라이브러리 세 기록은 desc 와 first 가 모두 빈 칸이었고 subjects 배열도 세 건 모두 빈 배열이었다 — 없는 것을 있는 것처럼 적지 않았다. 쪽수는 한 기록에만 112쪽이 있고 나머지 둘은 0이라 학습지에 쓰지 않았다. 출간연도가 2024년과 2025년으로 갈려 이것도 쓰지 않았다. A. G. Ford 는 한 기록에만 공동 저자로 적혀 있고 무슨 역할인지 기록이 말하지 않아 학습지에 넣지 않았다. 몽골 지식(초원·게르·유목·칭기즈 칸·사막)과 말 지식(품종·개체 수·먹이·서식지)은 한 글자도 쓰지 않았다. 제목의 wild 와 요약의 little 을 같은 말로 묶지 않았다 — 두 말이 같은 대상인지 어느 출처도 말하지 않기 때문이다. 첫 문장이 없어 첫 문장을 묻는 문항과 문법 보기를 뺐고, 퀴즈는 근거로 되짚을 수 있는 11문항까지만 냈다 (2026-09-30)",
  },

  // 낭독 영상 — S3943.json 의 videos 세 개를 제목으로 하나하나 확인해 골랐다 (2026-09-30).
  // 세 개 모두 이 책(Windy Night with Wild Horses · Mary Pope Osborne)이 맞고, 다른 권이 섞여 있지 않았다.
  // 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 이 권은 통본(책 한 권 전체) 낭독 영상을 확인하지 못했다. 같은 채널(The Halfling Storytime)의
  // 조각 영상 "1"(5:32)과 "2"(6:00)를 장 차례대로 앞에 놓고, 오디오북이라고 적힌 둘을 뒤에 두었다.
  // "2" 는 후보 목록(vid-S3943.json)에서 가져왔다 — 제목·채널이 "1" 과 같아 같은 낭독의 이어지는 조각이다.
  // 조각 둘을 합쳐도 11분 남짓이라 책 전체가 아니다. 뒷부분은 아이가 책으로 읽는다.
  shadowing: {
    query: "\"Windy Night with Wild Horses\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/840J-WIHVsU",
    videos: [
      { url: "https://youtu.be/840J-WIHVsU", title: "Magic Tree House   Windy Night with Wild Horses   1",
        channel: "The Halfling Storytime", views: "1,827", length: "5:32" },
      { url: "https://youtu.be/lO9EdKLp9pw", title: "Magic Tree House   Windy Night with Wild Horses   2",
        channel: "The Halfling Storytime", views: "1,228", length: "6:00" },
      { url: "https://youtu.be/H5DU0NO4f8M", title: "Windy Night with Wild Horses Book 39 by Mary Pope Osborne · Audiobook",
        channel: "", views: "", length: "" },
      { url: "https://youtu.be/e3Li184I4Rk", title: "Windy Night with Wild Horses by Mary Pope Osborne | Full Audiobook",
        channel: "", views: "", length: "" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 장서 요약 한 줄 · 책 제목 · 시리즈 이름 · 장서 발문에 실제로 나오는 말에서만 골랐다.
  // 몽골을 설명하는 낱말도, 말의 생태를 설명하는 낱말도 한 개도 끌어오지 않았다.
  // horse 는 뜻을 적지 않고 되물었다 — 어떤 말들인지 우리 근거가 말해 주지 않기 때문이다.
  // wild 는 제목 낱말이므로 낱말 뜻만 달았다. 이 말들이 야생마라는 뜻이 아니다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "magic",    pos: "adj.", en: "having special powers that cannot happen in real life", ko: "마법의",
      ex: "This book is number 39 in the {{Magic}} Tree House series.", ex_ko: "이 책은 '매직 트리 하우스' 시리즈의 39권이에요.", pic: "🪄" },
    { word: "whisk",    pos: "v.",   en: "to take someone away quickly and suddenly", ko: "휙 데려가다",
      ex: "Jack and Annie are {{whisked}} away to Mongolia.", ex_ko: "잭과 애니는 몽골로 휙 데려가져요.", pic: "💨" },
    { word: "away",     pos: "adv.", en: "to a different place, far from where you are now", ko: "다른 곳으로, 멀리",
      ex: "They are whisked {{away}} from home.", ex_ko: "그들은 집에서 멀리 데려가져요.", pic: "➡️" },
    { word: "Mongolia", pos: "n.",   en: "the place Jack and Annie are whisked away to in this book — our records say nothing else about it", ko: "몽골 — 이 책에서 잭과 애니가 휙 데려가지는 곳. 그 밖의 것은 우리 자료에 적혀 있지 않다",
      ex: "They are taken to {{Mongolia}}.", ex_ko: "그들은 몽골로 데려가져요.", pic: "📍" },
    { word: "rescue",   pos: "v.",   en: "to save someone or something from danger", ko: "구하다, 구조하다",
      ex: "They go to {{rescue}} little horses.", ex_ko: "그들은 작은 말들을 구하러 가요.", pic: "🆘" },
    { word: "little",   pos: "adj.", en: "small in size", ko: "작은",
      ex: "The summary calls them {{little}} horses.", ex_ko: "요약은 그들을 '작은 말들' 이라고 불러요.", pic: "🤏" },
    { word: "horse",    pos: "n.",   en: "our records do not say what kind of horses these are. The summary calls them \"little horses\" and the title says \"Wild Horses\" — nobody wrote down for us whether those are the same. Read the book and find out", ko: "말 — 어떤 말들인지 우리 자료에 적혀 있지 않다. 요약은 \"little horses\", 제목은 \"Wild Horses\" 라고 한다. 둘이 같은 말들인지는 어디에도 적혀 있지 않다",
      ex: "Jack and Annie go to rescue the little {{horses}}.", ex_ko: "잭과 애니는 작은 말들을 구하러 가요.", pic: "❓" },
    { word: "wild",     pos: "adj.", en: "living or growing on its own, not kept by people", ko: "야생의, 길들지 않은",
      ex: "The title of this book has the word {{Wild}} in it.", ex_ko: "이 책 제목에 들어 있는 낱말이에요.", pic: "🌾" },
    { word: "windy",    pos: "adj.", en: "with a lot of wind blowing", ko: "바람이 많이 부는",
      ex: "The title says it was a {{windy}} night.", ex_ko: "제목이 바람 부는 밤이라고 말해요.", pic: "🌬️" },
    { word: "night",    pos: "n.",   en: "the time between evening and morning, when the sky is dark", ko: "밤",
      ex: "The title names a time of day: a windy {{night}}.", ex_ko: "제목이 하루 중 한때를 말해요 — 밤이에요.", pic: "🌙" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아, 10권과 달리 '첫 문장으로 배우는 문법' 을 넣지 않았다.
  // 대신 장서 요약 한 줄에 실제로 들어 있는 짜임 셋으로 세웠다 —
  //   수동태(are whisked away) · 목적의 to부정사(to rescue) · 복수형(horses).
  grammar: {
    points: [
      { name: "수동태 (be + 과거분사)", ko: "당하는 문장",
        sent: "Jack and Annie [[are whisked]] away to Mongolia.",
        why_ko: "누가 무엇을 '하는' 게 아니라 '당할' 때는 be동사 + 과거분사를 써요. 잭과 애니가 데려가는 게 아니라, 데려가지는 거예요. 재미있는 건 이 문장이 '누가' 데려가는지 말해 주지 않는다는 점이에요.",
        why: "Use be + past participle when something is done TO the subject: they are whisked away.",
        try: "Jack and Annie {{are}} whisked away to Mongolia." },
      { name: "to + 동사원형 (~하러)", ko: "목적을 말하는 to부정사",
        sent: "They are whisked away to Mongolia [[to rescue]] little horses.",
        why_ko: "'무엇을 하러' 갔는지 말할 때 to + 동사원형을 써요. to rescue = 구하러. to 뒤에는 늘 동사원형! to rescued(X), to rescue(O).",
        why: "Use \"to\" plus the plain form of a verb to say why someone goes: to rescue.",
        try: "They go {{to rescue}} little horses." },
      { name: "복수형 -s", ko: "둘 이상일 때의 -s",
        sent: "The summary says little [[horses]], not little horse.",
        why_ko: "하나면 horse, 둘 이상이면 horses 예요. 요약이 horses 라고 썼으니 말은 한 마리가 아니에요. 다만 몇 마리인지는 적혀 있지 않아요.",
        why: "Add -s for more than one: one horse, two horses. The summary says horses.",
        try: "They rescue little {{horses}}, not one little {{horse}}." }
    ],
    find: "책에서 -s 로 끝나는 복수형 명사를 세 개 찾아 쓰세요. · Find three plural nouns ending in -s.",
    exam: {
      choose: [
        { q: "Jack and Annie (whisk / are whisked) away to Mongolia.", a: "are whisked",
          why_ko: "두 아이가 데려가는 게 아니라 데려가지는 거예요. 당하는 문장이니 be동사 + 과거분사!" },
        { q: "They go to Mongolia (to rescue / to rescued) little horses.", a: "to rescue",
          why_ko: "to 뒤에는 언제나 동사원형이 와요. to rescue 가 맞아요." },
        { q: "The summary says they rescue little (horse / horses).", a: "horses",
          why_ko: "요약이 horses 라고 복수형으로 썼어요. 한 마리가 아니에요." },
        { q: "Jack and Annie (is / are) whisked away together.", a: "are",
          why_ko: "주어가 두 사람이에요. 복수 주어에는 are 를 써요." },
        { q: "Mongolia (is / are) the place they are taken to.", a: "is",
          why_ko: "Mongolia 는 곳 하나예요. 하나짜리 주어에는 is 를 써요." }
      ],
      fix: [
        { q: "Jack and Annie [[is whisked]] away to Mongolia.", a: "are whisked",
          why_ko: "주어가 두 사람이에요. is 가 아니라 are 를 써서 are whisked 로 고쳐요." },
        { q: "They are whisked away [[to rescuing]] little horses.", a: "to rescue",
          why_ko: "to 다음에는 동사원형! to rescue 로 고쳐요." },
        { q: "They go to rescue little [[horse]].", a: "horses",
          why_ko: "요약은 여러 마리를 말해요. 복수형 horses 로 고쳐요." }
      ],
      write: [
        { ko: "잭과 애니는 몽골로 휙 데려가진다.", cond: "be whisked away, Mongolia", a: "Jack and Annie are whisked away to Mongolia.",
          why_ko: "데려가지는 것이니 be동사 + 과거분사, 주어가 둘이라 are whisked 예요." },
        { ko: "그들은 작은 말들을 구하러 간다.", cond: "to rescue, horses", a: "They go to rescue little horses.",
          why_ko: "'구하러' 는 to + 동사원형, 곧 to rescue 예요. 말은 복수형 horses 예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 네 문항은 답을 비워 두었다. 우리 근거가 거기까지 말하지 않기 때문이다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what happens to them?",
      frame: "They are {{Jack and Annie}}, and they are {{whisked away}}." },
    { ref: "장서 질문", skill: "사실찾기", q: "Where do Jack and Annie go to rescue the little horses?",
      frame: "They go to {{Mongolia}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "Why are Jack and Annie sent to Mongolia?",
      frame: "They are sent there {{to rescue little horses}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Windy Night with Wild Horses.\" Which word tells about the air, and which word tells the time of day?",
      frame: "The air word is {{windy}}, and the time word is {{night}}. Our summary never says anything about wind or night, so I want to find out {{                    }}." },
    { ref: "장서 요약", skill: "추론·예측", q: "The summary says \"little horses.\" The title says \"Wild Horses.\" Are they the same horses? Write your guess before you read, then write what the book says.",
      frame: "I guessed {{                    }}. In the book, {{                    }}." },
    { ref: "장서 요약", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Have you ever seen a horse up close? And what would you do to help rescue a little horse?",
      frame: "I {{have / have not}} seen a horse up close. To help rescue a little horse, I would {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 이 책은 근거가 얇아 11문항만 냈다. 억지로 14개를 채우지 않았다.
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장을 묻는 문항은 뺐다 — 세 기록 어디에도 이 책의 첫 문장이 없다.
  // 몽골이 어떤 곳인지 묻는 문항도, 말이 어떤 말인지 묻는 문항도 내지 않았다. 우리가 답을 모른다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a rider", "Two horses"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie are whisked away\" 라고 두 이름을 그대로 적어요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "Where are Jack and Annie whisked away to?",
      a: ["Mongolia", "Greenland", "Rome", "The wild west"], c: 0,
      why_ko: "몽골(Mongolia)이에요. 요약이 \"to Mongolia\" 라고 적고 있어요. 그린란드는 33권, 로마는 31권, 서부는 10권이에요.",
      why: "Mongolia. The summary says \"to Mongolia.\" Greenland is book #33, Rome is #31, the wild west is #10." },
    { q: "Why are Jack and Annie sent there?",
      a: ["To rescue little horses", "To find a treasure", "To meet a king", "To build a tree house"], c: 0,
      why_ko: "작은 말들을 구하기 위해서예요. 요약이 \"to rescue little horses\" 라고 말해요.",
      why: "To rescue little horses — \"whisked away to Mongolia to rescue little horses.\"" },
    { q: "In the summary, Jack and Annie \"are whisked away.\" What does \"whisk away\" mean here?",
      a: ["To take someone away quickly and suddenly", "To wait for a long time", "To wake someone up", "To hide someone"], c: 0,
      why_ko: "whisk away 는 '휙 데려가다' 예요. 눈 깜짝할 사이에 데려간다는 뜻이에요.",
      why: "To whisk someone away is to take them off quickly and suddenly." },
    { q: "The summary uses the word \"rescue.\" What does \"rescue\" mean?",
      a: ["To save someone or something from danger", "To draw a picture of something", "To buy something", "To run away from something"], c: 0,
      why_ko: "rescue 는 위험에서 구해 내는 것, 곧 구조하다 예요.",
      why: "To rescue is to save someone or something from danger." },
    { q: "In the summary, is the whisking something Jack and Annie do, or something done to them?",
      a: ["It is done to them", "They do it to someone else", "They do it to each other", "Our summary says they refuse to go"], c: 0,
      why_ko: "두 아이에게 일어나는 일이에요. \"are whisked away\" 는 당하는 문장(수동태)이에요. 게다가 요약은 '누가' 데려가는지 말해 주지 않아요.",
      why: "It is done to them. \"Are whisked away\" is passive, and the summary never says who does it." },
    { q: "Does the summary say Jack and Annie rescue one horse or more than one?",
      a: ["More than one", "Exactly one", "Exactly three", "The summary gives the number"], c: 0,
      why_ko: "한 마리보다 많아요. 요약이 복수형 \"horses\" 라고 썼거든요. 다만 몇 마리인지는 적혀 있지 않아요.",
      why: "More than one — the summary says \"horses,\" a plural. But it never gives the number." },
    { q: "The title says \"Wild Horses\" but the summary says \"little horses.\" What can we be sure of?",
      a: ["The summary's own words are \"little horses\"; only the title uses \"wild\"", "The summary calls them wild horses", "The title does not mention horses at all", "Our records say the two names are the same horses"], c: 0,
      why_ko: "요약이 쓴 말은 \"little horses\" 하나뿐이고, \"wild\" 는 제목에만 있어요. 둘이 같은 말들인지는 어느 자료도 말해 주지 않아요. 그러니 '야생마다' 라고 단정하면 안 돼요.",
      why: "The summary's words are \"little horses.\" \"Wild\" appears only in the title, and no source says the two are the same." },
    { q: "Which word in the title tells you about the air that night?",
      a: ["Windy", "Wild", "Horses", "Night"], c: 0,
      why_ko: "Windy 예요. 바람이 많이 분다는 뜻이에요. 제목은 \"Windy Night with Wild Horses\" 예요.",
      why: "Windy — it means with a lot of wind. The title is \"Windy Night with Wild Horses.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#31", "#33", "#39"], c: 3,
      why_ko: "39권이에요. 장서 목록 제목이 \"#39 Windy Night with Wild Horses\" 예요.",
      why: "Book #39 — the catalog title is \"#39 Windy Night with Wild Horses.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who the two children are", "Where they are whisked away to", "Why they are sent there", "Whether they rescue the horses in the end"], c: 3,
      why_ko: "말들을 끝내 구해 내는지예요. 우리 근거는 \"작은 말들을 구하러 간다\" 에서 딱 끊겨요. 구했는지, 어떻게 구했는지는 책을 읽어야 알 수 있어요.",
      why: "Whether they rescue the horses. Our summary stops at \"to rescue little horses\" and never says how it ends." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 채울 수 있는 칸은 Somebody 와 장소(Mongolia) 둘뿐이다.
  // Wanted·But·So·Then 네 칸과 The Ending 은 근거가 말하지 않는다. 비워 두었다. 아이가 책을 읽고 채운다.
  // 때(time)도 비워 두었다 — 제목에 night 가 있지만 요약은 언제인지 한 번도 말하지 않는다.
  summaryMap: {
    setting: { place: "{{Mongolia}}", time: "{{                    }}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 하려 했는지는 아이가 책에서 가져온다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "Whisked Away",
        given: "Jack and Annie are whisked away. Our summary does not say who or what whisks them.",
        frame: "They are taken to {{Mongolia}}." },
      { label: "The Mission",
        given: "",
        frame: "They are sent there {{to rescue}} little {{horses}}." },
      { label: "The Little Horses",
        given: "우리 자료는 그 말들이 어떤 말인지도, 왜 도움이 필요한지도 말해 주지 않는다.",
        frame: "In the book, the little horses are {{                    }}, and they need rescuing because {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 'Mongolia' 가지와 'The Little Horses' 가지, 'The Title' 가지는 답을 주지 않고 되묻기만 한다.
  // 우리가 답을 모른다. 선생님도 대신 채우지 않는다.
  mindMap: {
    center: "Windy Night with Wild Horses",
    branches: [
      { label: "Jack & Annie",      ask: "Jack and Annie are whisked away again. What do you think they take with them?",
        deeper: "Why do you think the same two children are sent again and again?" },
      { label: "Whisked Away",      ask: "The summary says they \"are whisked away\" — but it never says who does it. Who or what do you think whisks them?",
        deeper: "Why might a writer leave out who did something?" },
      { label: "Mongolia",          ask: "Mongolia is the one place name our records give us. What does that name make you picture?",
        deeper: "Find Mongolia on a map. Was it where you expected it to be?" },
      { label: "The Little Horses", ask: "Our summary only says \"little horses.\" Draw what you think they look like before you read.",
        deeper: "After reading, how close was your drawing? What surprised you?" },
      { label: "The Title",         ask: "The title says \"Windy Night with Wild Horses,\" but the summary says \"little horses\" and never mentions wind or night. What do you think the title is pointing at?",
        deeper: "Are the \"wild horses\" of the title the same as the \"little horses\" of the summary? Nobody wrote it down for us. What does the book say?" },
      { label: "Me",                ask: "Have you ever seen a horse up close? What was it like?",
        deeper: "What would you do to help rescue a little horse?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Responsibility", "Rescue", "Distance"],
    globalContext: "Sharing the planet — 사람과 다른 생명은 서로에게 무엇인가",
    statement: "You can be sent far from home to rescue living things you have never seen.",
    factual: [
      "Where are Jack and Annie whisked away to?",
      "Why are they sent there?",
      "Does the summary say one horse or more than one?"
    ],
    conceptual: [
      "What is the difference between being sent somewhere and choosing to go?",
      "Why is it harder to help something you have never seen?"
    ],
    debatable: [
      "Is it worth travelling far away to rescue animals you do not know?",
      "Should you say yes to a rescue before you know what the danger is?"
    ],
    learnerProfile: ["Caring", "Inquirer", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "작은 말들을 구하러 간다" 까지만 말한다. 두 아이가 구했는지 적혀 있지 않으므로,
    // 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie are whisked away to Mongolia to rescue little horses. Would you travel far from home to rescue animals you have never seen? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "A Long Way for Little Horses", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think animals I have never seen are still worth a long trip.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens to Jack and Annie? Write it.",
        eg: "Jack and Annie are whisked all the way to Mongolia to rescue little horses.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the rescue mattered more than how far away it was.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say home comes first, but I do not think so.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would go too.", lines: 2 }
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
      en: "Students retell that Jack and Annie are whisked away to Mongolia to rescue little horses, say clearly what our sources do not tell them — above all what those little horses are, and whether they are the \"wild horses\" of the title — and then take a side on travelling far to rescue animals they have never seen.",
      ko: "잭과 애니가 몽골로 휙 데려가져 작은 말들을 구하러 간다는 흐름을 말하고, 우리 자료가 말해 주지 않는 것 — 무엇보다 그 작은 말들이 어떤 말인지, 제목의 '야생마' 와 같은 말인지 — 을 스스로 짚은 뒤, 본 적 없는 동물을 구하러 멀리 가는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이고, 그 양이 아주 적다.
    // 그래서 이 수업의 절반은 '모르는 것을 모른다고 말하는 연습' 이다.
    // 선생님도 몽골을 설명하지 않는다. 초원·게르·유목·칭기즈 칸 — 근거에 없다.
    // 말도 설명하지 않는다. 품종·개체 수·먹이 — 근거에 없다.
    // 특히 '야생마' 라는 말을 선생님이 먼저 꺼내지 않는다. 요약은 '작은 말들' 이라고만 한다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever seen a horse up close? Tell me about it.",
        do: "책을 펴기 전에 한다. 오늘 글쓰기의 물음을 미리 입에 올려 두는 것이다. 서너 명만.",
        exp: "At a farm. / On a school trip. / Never.",
        stuck: "선생님이 먼저 한 문장 한다. \"I saw one at a fair once. It was taller than me.\"" },

      { stage: "Warm-up", min: "",
        say: "Our one-line summary says \"little horses.\" The title says \"Wild Horses.\" Are those the same?",
        do: "두 낱말을 칠판에 나란히 쓰고 그 사이를 비워 둔다. 답을 주지 않는다 — 우리도 모른다. 아이가 궁금해하는 채로 책을 펴게 둔다.",
        exp: "Maybe. / Little ones can be wild too. / I don't know.",
        stuck: "\"Nobody wrote it down for us. Tonight you find out and tell me.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "구하다 → rescue / 휙 데려가다 → whisk / 바람이 많이 부는 → windy",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Look at the word horse. Its meaning box does not tell you what kind. That is on purpose.",
        do: "빈 뜻 칸을 손가락으로 짚는다. 선생님도 모른다고 그대로 말한다. 여기서 이 수업의 태도가 정해진다.",
        exp: "(아이가 '선생님은 알잖아요' 라고 한다. 그때 \"Our paper does not say. Yours will, tonight.\")",
        stuck: "\"Guess now. Draw it in the margin. We check it tomorrow.\"" },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where do they go...' becomes 'They go to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They go to Mongolia.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Questions four, five, six and seven have no answer on this sheet. Not because I hid it — because nobody wrote it down for us.",
        do: "이 수업에서 가장 중요한 한 마디다. 모르는 것을 모른다고 말하는 본보기를 선생님이 먼저 보인다.",
        exp: "(아이가 '그럼 어떻게 해요' 라고 묻는다. 그때 \"You read the book\" 한 마디면 된다)",
        stuck: "\"Our paper stops at 'rescue little horses.' The book keeps going. You go with it.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. Today only the first one is filled.",
        do: "다섯 칸을 손가락으로 짚는다. 한 칸만 차 있는 것을 아이 눈으로 보게 한다.",
        exp: "Somebody: Jack and Annie — 나머지 네 칸은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Even the time box is empty. The title says night, but our summary never says when. So we leave it.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 제목만으로 때를 정하지 않는다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in our summary.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Little Horses)", min: "",
        say: "Stop at The Little Horses. Draw your guess in the box. A guess is allowed — as long as you call it a guess.",
        do: "→ 칸에서 반드시 멈춘다. 추측과 사실을 가르는 연습이 여기서 일어난다. 선생님은 답을 말하지 않는다. '야생마' 라는 말도 선생님이 먼저 꺼내지 않는다.",
        exp: "I guess they are small, because the summary calls them little horses.",
        stuck: "\"Say it like this: 'I guess..., because...' Then we check it in the book.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, our summary answers it. Step 2, the summary helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Animals you have never seen. All the way to Mongolia. Worth it or not? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because those horses have nobody else.",
        stuck: "손을 들게 한다. \"Go? Or stay home?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say home comes first, but I do not think so.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Our summary says \"little horses.\" What do you think they look like? Draw one before you read.", ko: "우리 요약은 '작은 말들' 이라고만 해. 어떻게 생겼을 것 같니? 읽기 전에 한 마리 그려 보자." },
        { en: "Where is Mongolia? Find it on a map before you open the book.", ko: "몽골은 어디일까? 책을 펴기 전에 지도에서 찾아보자." },
        { en: "The title says a windy night. Our summary never mentions wind. Why do you think it is in the title?", ko: "제목은 바람 부는 밤이라고 해. 그런데 요약에는 바람 이야기가 한 번도 없어. 왜 제목에 있을까?" }
      ],
      during: [
        { en: "Have you met the little horses yet? Was your drawing close?", ko: "작은 말들이 나왔니? 네가 그린 그림과 비슷했니?" },
        { en: "Why do the horses need rescuing?", ko: "말들은 왜 도움이 필요하니?" },
        { en: "Who or what whisked Jack and Annie away? Our summary never said.", ko: "잭과 애니를 휙 데려간 건 누구였니? 우리 요약은 말해 주지 않았어." }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie rescue the horses? How?", ko: "잭과 애니는 말들을 구했니? 어떻게 했니?" },
        { en: "Are the \"wild horses\" of the title the same as the \"little horses\" of the summary?", ko: "제목의 '야생마' 와 요약의 '작은 말들' 은 같은 말들이었니?" },
        { en: "Now that you have read it — why is the night windy?", ko: "다 읽고 나니, 그 밤은 왜 바람이 불었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "whisk 와 rescue 두 낱말은 요약 한 줄에 실제로 있는 말이다. 꼭 짚는다.", miss: "horse 의 뜻을 선생님이 설명해 버린다. 그러면 오늘 수업의 절반이 사라진다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "뒤쪽 네 문항은 빈칸이 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 몽골 이야기(초원·게르·유목)를 대신 채워 준다. 그건 이 책의 내용이 아니고, 우리 자료에도 없다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸과 때(time) 칸은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Little Horses' 가지에서 반드시 멈춘다. 그리게 하고, 정답은 주지 않는다.", miss: "'야생마' 라고 선생님이 정해 준다. 요약은 '작은 말들' 이라고만 했다. 둘이 같은지는 아무도 적어 두지 않았다." },
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
  // 요약이 "are whisked away" 라고 수동으로만 쓰고 데려가는 쪽을 말하지 않으므로, 여기서도 수동으로 두었다.
  // 말들이 어떤 말인지도, 결말도 근거가 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 몽골로 휙 데려가져 작은 말들을 구하러 가는 이야기",
    text: "Jack and Annie were [[carried|whisked]] away to Mongolia. They were sent there [[to save|to rescue]] [[small|little]] horses. The name of this book is \"Windy Night with Wild Horses.\" What are the little horses like? Why do they need rescuing? Are they the wild horses of the title? Why is the night windy? Our [[papers|records]] do not say. Open the book and find out."
  }
};
