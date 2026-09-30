// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.7)
// Hurricane Heroes in Texas (Magic Tree House #30) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3934.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 장서 목록의
// 질문 셋 · 오픈라이브러리 출판사 소개글 · 주제어 목록 · 지명 목록)만으로 만들었다.
// 그 밖의 인물 이름·지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는
// 지어내지 않고 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집을 타고 간다 / 텍사스주 갤버스턴(Galveston, Texas) /
//   1900년 9월 8일 / 그날이 "미국 역사상 가장 큰 자연 재난"의 날이라고 요약이 말한다 /
//   제목이 그 재난을 hurricane 이라 부르고, 주제어 목록에도 Hurricanes 가 있다 /
//   제목에 heroes 라는 말이 있다
// 이 책도 24권처럼 오픈라이브러리에 **첫 문장이 비어 있다**(first 칸이 빈 칸). 그래서 첫 문장을
// 묻는 문항도, 첫 문장을 쓴 문법 보기도, 낭독 시작 줄도 이 파일 어디에도 두지 않았다. 지어내지 않는다.
// 제목의 '영웅들(heroes)'이 누구인지, 두 아이가 거기서 무엇을 하는지, 어떻게 끝나는지는
// 어느 출처도 말하지 않는다. 장서 요약도 소개글도 "the day of the worst natural disaster in
// U.S. history" 에서 똑같이 끊긴다. 그래서 비워 두었다.
// 실제 있었던 재난이 배경이지만, 근거 JSON 밖의 역사 사실(사망자 수 · 피해 규모 · 바람 세기 ·
// 물 높이 · 그 뒤에 일어난 일)은 한 글자도 쓰지 않았다. 수업 대사에서도 피해를 그리지 않고,
// 24권과 같이 '무엇을 할까 · 누가 돕는가' 쪽으로만 말하게 했다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3934",
  slug: "magic-tree-house-hurricane-heroes-in-texas",
  title: "Hurricane Heroes in Texas",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #30",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)·24권(AR 3.3)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.7", lexile: "470L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/10953015-M.jpg",
  // 장서 목록의 수상 칸이 비어 있다.
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 장서 목록에 함께 적힌 질문 셋과 오픈라이브러리 출판사 소개글·주제어 목록·지명 목록을 겹쳐 보았다. 사람의 기억도, 1900년 갤버스턴에 대해 우리가 따로 아는 역사도 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3934 요약 + 오픈라이브러리 /works/OL19748828W (소개글 · 주제어 Tree houses/Hurricanes/Magic/History/Time travel/Texas, fiction · 지명 Galveston (Tex.)/Galveston/Texas · 88쪽 · 2018년 · 첫 문장 칸은 비어 있음 · 지은이 칸에 Mary Pope Osborne 과 함께 A. G. Ford 도 올라 있으나 무엇을 맡았는지는 적혀 있지 않다)",
    characters: ["Jack", "Annie"],
    beats: [
      "Jack and Annie travel in the magic tree house to Galveston, Texas",
      "they arrive on September 8, 1900",
      "our summary calls that day the day of the worst natural disaster in U.S. history"
    ],
    ending: "근거에 결말이 없다. 장서 요약과 출판사 소개글이 똑같이 \"the day of the worst natural disaster in U.S. history\" 에서 멈춘다. 제목이 말하는 '영웅들(heroes)'이 누구인지, 두 아이가 그날 무엇을 하는지, 누구를 만나는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 장서 목록의 세 번째 질문 자체가 \"What do you think Jack and Annie will see on that day?\" 라고 아이에게 되묻는 꼴이라, 그 답은 책에만 있다는 뜻이다. 그래서 비워 둔다",
    checked: "출판사 소개글을 먼저 의심하며 읽었다 — 큰따옴표로 묶인 한 문단이고, 이 책 한 권만 말하며, 시리즈 전체 안내도 개인 감상도 없고, 철자가 틀린 곳도 없으며, 끝이 출판사 소개글 특유의 '--\"' 로 닫힌다. 28권처럼 독자가 올린 글이 들어온 흔적이 없어 근거로 썼다. 다만 소개글은 장서 요약과 거의 같은 한 문장이라 새로 보태 주는 사실이 없다(요약의 treehouse 가 소개글에서는 tree house 로 띄어져 있는 것 말고는 같다). 장서 요약(\"Jack and Annie\", \"the magic treehouse\", \"Galveston, Texas\", \"September 8, 1900\", \"the worst natural disaster in U.S. history\")과 소개글을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 지명 목록의 Galveston (Tex.)/Galveston/Texas 와 주제어 Texas, fiction 이 장소를 받쳐 준다. 주제어 Tree houses/Magic/Time travel 이 이동 수단을 받쳐 준다. 요약은 그날의 재난이 무엇인지 이름 붙이지 않지만, 제목의 Hurricane 과 주제어 Hurricanes 가 그것을 말해 주어 '허리케인'까지만 적었다. 제목의 heroes 는 낱말로만 쓰고 누구인지는 어디에도 쓰지 않았다 — 근거가 말하지 않는다. 10권과 달리(24권과 같이) 첫 문장 칸이 비어 있어 첫 문장을 묻는 문항·문법 보기·낭독 시작 줄을 통째로 뺐다. 실제 재난의 사망자 수·피해 규모·바람 세기는 근거 밖이라 한 글자도 쓰지 않았고, 요약이 쓴 \"the worst natural disaster in U.S. history\" 라는 말만 그 표현 그대로 옮겼다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 세 편의 제목을 하나하나 확인해 모두 이 책(#30 Hurricane Heroes in Texas)임을 보았다.
  // 이 책은 통본(책 한 권을 끝까지 읽은) 낭독을 찾지 못했다 — 세 편 모두 장(chapter) 단위로 끊긴
  // 짧은 영상이다. 그래서 장 차례대로 1장을 맨 앞에 두었다. 세 번째 영상은 장서 기록에 제목이
  // "-C" 에서 잘려 있어 몇 장인지 확인하지 못했고, 채널·조회수·길이도 우리 기록에 없어 비워 두었다.
  // (따로 돌던 영상 목록에 "Hurricane Heroes in Texas 2"(The Halfling Storytime) 한 편이 더 있었으나,
  //  장서 근거 S3934.json 의 videos 에 없는 영상이라 쓰지 않았다.)
  shadowing: {
    query: "\"Hurricane Heroes in Texas\" read aloud",
    searchUrl: "https://youtu.be/0KnO-U1OAIU",
    videos: [
      { url: "https://youtu.be/0KnO-U1OAIU", title: "Magic Tree House #30 Hurricane Heroes in Texas by Mary Pope Osborne -Chapter 1 |Read aloud",
        channel: "Quynh Giang English", views: "3,249", length: "6:36" },
      { url: "https://youtu.be/xzlnwODhMTM", title: "Magic Tree House #30 Hurricane Heroes in Texas by Mary Pope Osborne -Chapter 3 |Read aloud",
        channel: "Quynh Giang English", views: "1,241", length: "8:11" },
      { url: "https://youtu.be/8qeMlaILudA", title: "Magic Tree House #30 Hurricane Heroes in Texas by Mary Pope Osborne -C" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·장서 질문·출판사 소개글·주제어·지명에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "hurricane", pos: "n.",   en: "a very big storm with strong turning winds that comes in from the sea", ko: "허리케인, 큰 폭풍",
      ex: "The title of this book says {{hurricane}}.", ex_ko: "이 책의 제목에 '허리케인'이라는 말이 있어요.", pic: "🌀" },
    { word: "hero",      pos: "n.",   en: "a person who is brave and helps other people", ko: "영웅",
      ex: "The title also says {{heroes}}.", ex_ko: "제목에는 '영웅들'이라는 말도 있어요.", pic: "🦸" },
    { word: "disaster",  pos: "n.",   en: "a sudden event that causes great trouble for many people", ko: "재난",
      ex: "Our summary calls that day a natural {{disaster}}.", ex_ko: "우리 요약은 그날을 자연 재난이라고 불러요.", pic: "⚠️" },
    { word: "natural",   pos: "adj.", en: "made by nature, not by people", ko: "자연의",
      ex: "A storm is a {{natural}} event.", ex_ko: "폭풍은 자연이 일으키는 일이에요.", pic: "🌿" },
    { word: "worst",     pos: "adj.", en: "more bad than all the others; bad, worse, worst", ko: "가장 나쁜, 최악의",
      ex: "Our summary says it was the {{worst}} natural disaster in U.S. history.", ex_ko: "우리 요약은 그것이 미국 역사상 가장 큰 자연 재난이었다고 말해요.", pic: "📉" },
    { word: "history",   pos: "n.",   en: "everything that happened in the past, and the study of it", ko: "역사",
      ex: "September 8, 1900 is a day in U.S. {{history}}.", ex_ko: "1900년 9월 8일은 미국 역사 속의 하루예요.", pic: "📜" },
    { word: "magic",     pos: "adj.", en: "having special powers that ordinary things do not have", ko: "마법의",
      ex: "Jack and Annie travel in the {{magic}} tree house.", ex_ko: "잭과 애니는 마법의 나무 집을 타고 가요.", pic: "✨" },
    { word: "tree house", pos: "n.",  en: "a small house built up in a tree", ko: "나무 위의 집",
      ex: "The {{tree house}} takes them to Texas.", ex_ko: "나무 집이 그들을 텍사스로 데려가요.", pic: "🌳" },
    { word: "travel",    pos: "v.",   en: "to go from one place, or one time, to another", ko: "여행하다, 오가다",
      ex: "Jack and Annie {{travel}} back to the year 1900.", ex_ko: "잭과 애니는 1900년으로 건너갑니다.", pic: "⏳" },
    { word: "September", pos: "n.",   en: "the ninth month of the year", ko: "9월",
      ex: "They arrive on {{September}} 8, 1900.", ex_ko: "그들은 1900년 9월 8일에 도착해요.", pic: "📅" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 10권과 달리(24권과 같이) 이 책은 오픈라이브러리에 첫 문장이 없다. 그래서 '책의 첫 문장' 보기를 넣지 않았다.
  grammar: {
    points: [
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] to Galveston and [[arrived]] on September 8, 1900.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, arrive → arrived. e 로 끝나면 d 만 붙여요.",
        why: "Add -ed to the verb for something that already finished. If the verb ends in e, just add -d.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "the worst", ko: "불규칙 최상급",
        sent: "Our summary calls it [[the worst]] natural disaster in U.S. history.",
        why_ko: "bad 는 -est 가 붙지 않아요. bad → worse → worst 로 통째로 바뀌어요. '가장 ~한' 이니 앞에 the 를 꼭 붙여요.",
        why: "\"Bad\" does not take -est. It changes shape: bad - worse - worst. Use \"the\" in front.",
        try: "That was {{the worst}} rain of the whole year." },
      { name: "on + date / in + place", ko: "전치사 on 과 in",
        sent: "The story happens [[in]] Galveston, [[in]] Texas, [[on]] September 8, 1900.",
        why_ko: "도시·주 이름 앞에는 in, 날짜 하루 앞에는 on 이에요. in Galveston, in Texas, on September 8. 연도만 말할 때는 in 1900.",
        why: "Use \"in\" before a city or a state, and \"on\" before one date: in Texas, on September 8.",
        try: "I was born {{in}} Seoul, {{on}} May 5." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie (travel / traveled) to Galveston.", a: "traveled",
          why_ko: "이미 일어난 일이니 과거형 traveled 예요." },
        { q: "They (arrive / arrived) on September 8, 1900.", a: "arrived",
          why_ko: "지난 일이에요. arrive 는 e 로 끝나니 d 만 붙여 arrived!" },
        { q: "It was the (baddest / worst) natural disaster in U.S. history.", a: "worst",
          why_ko: "bad 의 최상급은 baddest 가 아니라 worst 예요. bad - worse - worst!" },
        { q: "Galveston is (in / on) Texas.", a: "in",
          why_ko: "주(州) 이름 앞에는 in 을 써요. in Texas." },
        { q: "They arrive (in / on) September 8, 1900.", a: "on",
          why_ko: "날짜 하루 앞에는 on 이에요. on September 8." }
      ],
      fix: [
        { q: "The magic tree house [[take]] Jack and Annie to Texas.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "It was the [[worse]] natural disaster in U.S. history.", a: "worst",
          why_ko: "둘을 견주면 worse, 모두 가운데 으뜸이면 worst 예요. 여기서는 worst." },
        { q: "Jack and Annie [[was]] in Galveston that day.", a: "were",
          why_ko: "주어가 둘이니 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "마법의 나무 집이 그들을 텍사스로 데려갔다.", cond: "take, 과거형, to Texas", a: "The magic tree house took them to Texas.",
          why_ko: "take 의 과거형은 took 이에요. '~로' 는 to 를 써요." },
        { ko: "그들은 1900년 9월 8일에 도착했다.", cond: "arrive, 과거형, on", a: "They arrived on September 8, 1900.",
          why_ko: "arrive 는 e 로 끝나니 d 만 붙여 arrived. 날짜 하루 앞에는 on 이에요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what do they travel in?",
      frame: "They are {{Jack and Annie}}, and they travel in {{the magic tree house}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What city and state do Jack and Annie travel to?",
      frame: "They travel to {{Galveston}}, in {{Texas}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "On what date do they arrive, and what does our summary call that day?",
      frame: "They arrive on {{September 8, 1900}}. Our summary calls it the day of {{the worst natural disaster in U.S. history}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Hurricane Heroes in Texas.\" What kind of weather does the first word name?",
      frame: "The first word names {{a hurricane}}, a very big storm." },
    { ref: "장서 요약", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "장서 질문", skill: "추론·예측", q: "Our summary stops at the date. What do you think Jack and Annie will see on that day?",
      frame: "I think they will see {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "The title calls someone a hero. When a big storm is coming, what could one person do that would help others?",
      frame: "One person could {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and her teacher", "Two sailors"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie travel in the magic treehouse\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What do Jack and Annie travel in?",
      a: ["The magic tree house", "A ship", "A train", "A hot air balloon"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약의 낱말이 바로 \"travel in the magic treehouse\" 예요. 주제어 목록에도 Tree houses 와 Magic 이 있어요.",
      why: "The magic tree house — the summary's own words. \"Tree houses\" and \"Magic\" are listed subjects too." },
    { q: "Which city do they travel to?",
      a: ["Galveston", "San Francisco", "New York", "Seoul"], c: 0,
      why_ko: "갤버스턴이에요. 요약과 소개글이 둘 다 Galveston 이라고 적고, 오픈라이브러리 지명 목록에도 들어 있어요.",
      why: "Galveston — both the summary and the description say so, and it is in the library's place list." },
    { q: "Galveston is in which state?",
      a: ["Texas", "California", "Florida", "Alaska"], c: 0,
      why_ko: "텍사스예요. 요약이 \"Galveston, Texas\" 라고 적고, 지명 목록에도 Galveston (Tex.) 와 Texas 가 나란히 있어요.",
      why: "Texas. The summary says \"Galveston, Texas\" and the place list gives Galveston (Tex.) and Texas." },
    { q: "On what date does this story take place?",
      a: ["September 8, 1900", "July 4, 1776", "April 18, 1906", "December 1, 2018"], c: 0,
      why_ko: "1900년 9월 8일이에요. 요약과 소개글이 똑같이 그 날짜를 적어요. 1906년 4월은 같은 시리즈 24권의 지진 이야기예요.",
      why: "September 8, 1900 — both sources give that exact date. April 1906 belongs to book #24." },
    { q: "How does our summary describe that day?",
      a: ["The day of the worst natural disaster in U.S. history", "An ordinary quiet day", "The first day of school", "A holiday with a parade"], c: 0,
      why_ko: "\"the day of the worst natural disaster in U.S. history\" 라고 적혀 있어요. 요약과 소개글이 똑같은 말을 써요.",
      why: "\"The day of the worst natural disaster in U.S. history\" — the exact wording of both sources." },
    { q: "What kind of storm does the title name?",
      a: ["A hurricane", "A snowstorm", "A sandstorm", "A thunderstorm"], c: 0,
      why_ko: "허리케인이에요. 제목이 Hurricane Heroes in Texas 이고, 주제어 목록에도 Hurricanes 가 있어요.",
      why: "A hurricane — it is the first word of the title and \"Hurricanes\" is a listed subject." },
    { q: "What is a hurricane?",
      a: ["A very big storm with strong turning winds", "A dry hot day", "A kind of boat", "A song people sing"], c: 0,
      why_ko: "허리케인은 바다에서 몰려오는, 바람이 세게 도는 아주 큰 폭풍이에요.",
      why: "A very big storm with strong turning winds that comes in from the sea." },
    { q: "What does the word \"hero\" in the title mean?",
      a: ["A person who is brave and helps others", "A person who tells stories", "A person who sells things", "A person who is always first"], c: 0,
      why_ko: "영웅은 용감하게 남을 돕는 사람이에요. 제목의 Heroes 가 바로 그 말의 복수형이에요.",
      why: "A person who is brave and helps others. \"Heroes\" in the title is the plural of that word." },
    { q: "Which of these is listed as a subject of this book?",
      a: ["Time travel", "Space travel", "Cooking", "Sports"], c: 0,
      why_ko: "Time travel 이에요. 주제어 목록에 Tree houses, Hurricanes, Magic, History, Time travel 이 적혀 있어요.",
      why: "Time travel. The subject list gives Tree houses, Hurricanes, Magic, History and Time travel." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#3", "#10", "#24", "#30"], c: 3,
      why_ko: "30권이에요. 장서 목록 제목이 \"#30 Hurricane Heroes in Texas\" 예요.",
      why: "Book #30 — the catalog title is \"#30 Hurricane Heroes in Texas.\"" },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Tedd Arnold", "Roald Dahl", "A. G. Ford"], c: 0,
      why_ko: "메리 폽 어즈번이에요. 오픈라이브러리 기록에 A. G. Ford 라는 이름도 함께 올라 있지만, 장서 목록이 글쓴이로 적은 사람은 Mary Pope Osborne 한 사람이에요.",
      why: "Mary Pope Osborne — the name our catalog gives as the author. A. G. Ford also appears in the library record, but the catalog names only Osborne." },
    { q: "The story happens in 1900. What is 2018 in the library record?",
      a: ["The year this book came out", "The year of the storm", "Jack's age", "The number of pages"], c: 0,
      why_ko: "2018년은 이 책이 나온 해예요. 이야기가 일어난 해는 1900년이에요. 쪽수는 88쪽이에요.",
      why: "2018 is the year the book was published. The story is set in 1900, and the book has 88 pages." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "What date they arrive", "Who the heroes of the title are", "What kind of storm the title names"], c: 2,
      why_ko: "제목의 '영웅들'이 누구인지예요. 우리가 가진 글은 그날의 날짜에서 멈춰요. 장서 목록의 세 번째 질문도 \"네 생각에는 무엇을 볼 것 같니\" 라고 되물어요. 답은 책에만 있어요.",
      why: "Who the heroes are. Our sources stop at \"the day of the worst natural disaster in U.S. history.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(바람·해결·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Galveston, Texas}}", time: "{{September 8, 1900}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 바라고 갔는지 근거가 말하지 않는다
      { k: "But",      v: "{{it was the day of the worst natural disaster in U.S. history}}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "Jack and Annie travel in the magic tree house.",
        frame: "It takes them to {{Galveston}}, in {{Texas}}." },
      { label: "The Date",
        given: "",
        frame: "They arrive on {{September 8}}, in the year {{1900}}." },
      { label: "The Storm",
        given: "",
        frame: "Our summary calls that day the day of {{the worst natural disaster}} in U.S. history." },
      { label: "The Heroes",
        given: "우리 자료는 여기까지만 말한다. 제목이 영웅들이라고만 하고 누구인지는 말하지 않는다. 책을 읽고 네가 채워라.",
        frame: "The heroes of this story are {{                    }}." },
      { label: "The Ending",
        given: "",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Hurricane Heroes in Texas",
    branches: [
      { label: "Jack & Annie",   ask: "What do we know about the two children before the adventure starts?",
        deeper: "Why do you think the same two children are sent somewhere new in every book?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose Galveston in 1900 for them?" },
      { label: "The Date",       ask: "Our summary gives one exact day: September 8, 1900. Why give the day and not just the year?",
        deeper: "What does it tell you when a whole book is built on one single day?" },
      { label: "The Hurricane",  ask: "What is a hurricane? Say it in your own words.",
        deeper: "Why is it safer to know a big storm is coming than to be surprised by it?" },
      { label: "The Heroes",     ask: "The title says heroes. What does a person have to DO to be called one?",
        deeper: "Can someone be a hero without being the strongest or the bravest person there?" },
      { label: "Me",             ask: "If you knew a big storm was coming tomorrow, what would you get ready today?",
        deeper: "Who would you check on first, and why that person?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Communities",
    relatedConcepts: ["Time", "Courage", "Evidence"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅에서 사람들은 서로를 어떻게 도왔나",
    statement: "A day people remember for a storm is also remembered for what people did for each other.",
    factual: [
      "Where and when do Jack and Annie travel to in this book?",
      "What do they travel in?",
      "How does our summary describe that day?"
    ],
    conceptual: [
      "Why do people put a name and a date on a day long past?",
      "What is the difference between being brave and being helpful?"
    ],
    debatable: [
      "Should a town practise what to do before a storm ever comes?",
      "Is helping one person enough to make someone a hero?"
    ],
    learnerProfile: ["Inquirer", "Caring", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "그날이 어떤 날이었는지" 까지만 말한다. 영웅이 누구인지도, 두 아이가 한 일도
    // 적혀 있지 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "The title calls this book \"Hurricane Heroes,\" but our summary never says who the heroes are. What makes a person a hero when a big storm comes? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "무엇이 영웅을 만드는지 한 가지를 분명히 할 것 · Name one thing clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "이 책의 제목이나 요약에서 한 가지를 넣을 것 · Use one thing from the title or summary"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "What Makes a Hero", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think a hero is someone who helps other people first.", lines: 2 },
      { part: "E — Evidence",    ask: "What do the title and the summary tell you? Write it.",
        eg: "The book is called \"Hurricane Heroes,\" and it happens on one stormy day in Texas.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the day is remembered for the people, not only for the storm.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say only the strongest can help, but small help is still help.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe anyone who helps can be called a hero.", lines: 2 }
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
      en: "Students retell how Jack and Annie travel in the magic tree house to Galveston, Texas, arriving on September 8, 1900 — the day our summary calls the worst natural disaster in U.S. history — then take a side on what makes a person a hero when a big storm comes.",
      ko: "잭과 애니가 마법의 나무 집을 타고 텍사스 갤버스턴으로 가 1900년 9월 8일, 우리 요약이 '미국 역사상 가장 큰 자연 재난의 날' 이라 부른 그날에 닿는 흐름을 말하고, 큰 폭풍 앞에서 무엇이 사람을 영웅으로 만드는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 실제 있었던 재난이라 피해를 자세히 그리지 않는다. 무서운 장면이 아니라 '무엇을 할까 ·
    // 누가 돕는가' 로 끌고 간다 (24권과 같은 방식). 사망자 수나 피해 규모는 말하지 않는다.
    // 겁이 많은 아이가 있으면 먼저 "우리 동네에 큰비가 온다면 오늘 무엇을 해 둘까" 로 바꿔 묻는다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "A really big storm is coming tomorrow. What would you get ready today?",
        do: "책을 펴기 전에 한다. 무서운 이야기가 아니라 '무엇을 할까'로 문을 연다. 서너 명만.",
        exp: "Water and food. / A flashlight. / Bring the bikes inside.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would fill bottles with water.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Hurricane Heroes in Texas.\" Two words there. One is the weather. What is the other one about?",
        do: "제목 두 덩이만 푼다. 줄거리는 말하지 않는다. heroes 가 아이 입에서 나와야 오늘 수업이 열린다.",
        exp: "Heroes — people. / People who help.",
        stuck: "제목을 손가락으로 짚는다. \"Hurricane is the storm. And HEROES?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "허리케인 → hurricane / 영웅 → hero / 재난 → disaster",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What city...' becomes 'They travel to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They travel to Galveston, in Texas.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our summary gives ONE day: September the eighth, nineteen hundred. Not a month, not a year. One day. Why write it that way?",
        do: "요약의 날짜를 칠판에 그대로 쓴다. 근거를 정확히 옮기는 훈련이다. 피해 이야기로 새지 않는다.",
        exp: "Everything happens on that one day. / It is a real date, so it really happened.",
        stuck: "\"If I say 'last year' and then 'September 8' — which one can you look up?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / But: 그날이 큰 재난의 날이었다 — Wanted·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What kind of day did they land on?\" 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Heroes)", min: "",
        say: "Stop at The Heroes. Don't tell me they were brave — tell me what a hero actually DOES.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 느낌이 아니라 행동으로 답하게 한다. 재난의 장면은 그리지 않는다.",
        exp: "They warn other people. They carry someone. They share what they have. They stay with a smaller child.",
        stuck: "\"You told me how a hero feels. Now — what do their hands and feet do?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is helping just one person enough to make someone a hero? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because that one person needed help right then.",
        stuck: "손을 들게 한다. \"One person — enough? Or not enough?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say only the strongest can help, but small help is still help.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about hurricanes and big storms?", ko: "허리케인이나 큰 폭풍에 대해 이미 아는 게 있니?" },
        { en: "Have you ever had strong wind or heavy rain where you live?", ko: "네가 사는 곳에 센 바람이나 큰비가 온 적 있니?" },
        { en: "The title says heroes. Who do you think they will turn out to be?", ko: "제목이 영웅들이라고 해. 그게 누구일 것 같니?" }
      ],
      during: [
        { en: "The tree house chose Galveston in 1900. Why that day, do you think?", ko: "나무 집이 1900년 갤버스턴을 골랐어. 왜 하필 그날일까?" },
        { en: "What would you want to have with you on a day like that?", ko: "그런 날 네 곁에 무엇이 있으면 좋겠니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Who were the heroes of the title, and what did they do?", ko: "제목의 영웅들은 누구였고, 무엇을 했니?" },
        { en: "Did anyone help Jack and Annie? Who?", ko: "누가 잭과 애니를 도왔니? 누구였어?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Heroes' 가지에서 반드시 멈춘다. 느낌이 아니라 행동을 받는다.", miss: "→ 칸에 '용감했다' 만 쓴다." },
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
  // 근거(장서 요약 · 장서 질문 · 출판사 소개글 · 주제어 · 지명)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 근거에 없어 책 문장을 한 줄도 옮기지 않았다 — 시작 줄도 우리 문장이다.
  // 근거가 결말도, 영웅이 누구인지도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 1900년 9월 8일 텍사스 갤버스턴으로 가는 이야기",
    text: "Jack and Annie [[went|traveled]] in the [[wonder-working|magic]] tree house, far back through time. It carried them to Galveston, in Texas, on September 8, 1900. Our summary calls that day the [[very worst|worst]] [[made by nature|natural]] disaster in United States [[the past|history]]. The title of the book names the storm — a [[great windstorm|hurricane]] — and it names something else too: [[people who help|heroes]]. Who were they, and what did they do? Our summary stops right here. Open the book and find out."
  }
};
