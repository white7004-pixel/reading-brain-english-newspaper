// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.5)
// To the Future, Ben Franklin! (Magic Tree House #32) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3936.json 에 모아 둔 근거만으로 만들었다. 그 밖의 인물 이름·지명·
// 물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
//
// ★ 이 책은 근거가 유난히 얇다. 왜 얇은지 먼저 밝혀 둔다:
//   1) 오픈라이브러리 세 건 중 세 번째(/works/OL52267W)는 H. G. 웰스의 "The Time Machine"
//      이다. 이 책이 아니다. 시간여행이라는 주제가 비슷해 딸려 들어온 전혀 다른 책이라,
//      그 소개글("The Time Traveller...802701년...Eloi/Morlocks/Weena...")도 주제어도
//      인물도 장소도 한 글자도 쓰지 않았다.
//   2) 이 책의 실제 두 건(/works/OL20134068W, /works/OL39178085W)은 desc(소개글)와
//      first(첫 문장)가 둘 다 빈 칸이다. 그래서 S3936.json 끝의 verdict "충분 — 소개글과
//      요약이 둘 다 있다" 는 사실과 맞지 않는다. 그 verdict 를 따르지 않았다.
//      있는 줄 알았던 소개글은 웰스 책의 것이었을 뿐이다.
//   3) 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 첫 줄을 통째로 뺐다.
//   4) 주제어에 "Franklin, benjamin, 1706-1790, fiction" 이 있으나 1706-1790 은 도서관이
//      인물을 가려내려고 붙인 표목이지 이 책의 내용이 아니다. 어디에도 쓰지 않았다.
//      마찬가지로 연날리기·피뢰침·독립선언·100달러 지폐·발명품 같은, 우리가 따로 아는
//      프랭클린 이야기는 근거가 말하지 않으므로 한 줄도 넣지 않았다.
//
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 시간을 거슬러(back in time) 보낸다 /
//   Old Philadelphia 로 간다 / 거기서 Benjamin Franklin 을 만난다 /
//   주제어는 Children's fiction · Magic · Trees · Philadelphia (pa.) · Inventors ·
//   Space and time / 112쪽 · 2019년 / 장서 갈래는 Chapter Books, 주제는 History Related.
// 만난 다음에 무슨 일이 있었는지, 어떻게 돌아왔는지, 제목의 "To the Future" 가 무엇을
// 가리키는지는 어느 출처도 말하지 않는다. 그래서 비워 두었다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3936",
  slug: "magic-tree-house-to-the-future-ben-franklin",
  title: "To the Future, Ben Franklin!",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #32",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.5", lexile: "420L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/8784862-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 주제어 목록·쪽수·해를 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3936 요약 + 갈래(Chapter Books)·주제(History Related)·AR 3.5·Lexile 420L + 오픈라이브러리 /works/OL20134068W (주제어 Children's fiction/Franklin, benjamin, 1706-1790, fiction/Magic, fiction/Trees, fiction/Philadelphia (pa.), fiction/Inventors, fiction/Space and time, fiction · 112쪽 · 2019년 · 소개글과 첫 문장은 빈 칸)",
    characters: ["Jack", "Annie", "Benjamin Franklin"],
    beats: [
      "Jack and Annie are whisked back in time by the magic tree house",
      "they go to Old Philadelphia",
      "there they meet Benjamin Franklin"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"to meet Benjamin Franklin in Old Philadelphia\" 에서 그대로 끝난다. 만난 뒤에 무슨 일이 있었는지, 두 아이가 어떻게 집으로 돌아가는지, 제목의 \"To the Future\" 가 누구의 어느 미래를 가리키는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "오픈라이브러리 세 건을 한 건씩 읽어 보았다. 세 번째 /works/OL52267W 는 H. G. 웰스의 \"The Time Machine\" 으로, 제목도 지은이도 해(1895)도 다른 전혀 별개의 책이었다. 시간여행 주제가 겹쳐 딸려 온 것이라 보고 그 소개글·주제어·인물(Eloi, Morlocks, Weena)·장소(England)를 통째로 버렸다. 이 책의 실제 두 건은 desc 와 first 가 모두 빈 칸이어서, S3936.json 의 verdict \"충분 — 소개글과 요약이 둘 다 있다\" 는 사실과 맞지 않는다고 보고 따르지 않았다. 남은 근거는 장서 한 줄 요약과 주제어 목록·갈래·주제뿐이라, 퀴즈를 13개로 맞추되 모두 그 두 곳에서만 가져왔다. 첫 문장이 없으므로 첫 문장을 묻는 문항과 문법 보기, 낭독 첫 줄을 넣지 않았다. 주제어의 \"1706-1790\" 은 도서관 인물 표목이지 책 내용이 아니라 쓰지 않았고, 우리가 따로 아는 프랭클린의 발명·업적도 근거가 말하지 않아 넣지 않았다. 오픈라이브러리는 지은이를 \"Mary Pope Osborne, A. G. Ford\" 로 적고 있으나 각자의 몫이 적혀 있지 않아, 장서 목록과 같이 Mary Pope Osborne 만 지은이로 적었다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 제목을 하나씩 확인해 셋 모두 이 책(#32)임을 확인했다. 다른 권은 섞이지 않았다.
  // 다만 이 책은 통본(한 편에 책 전체)을 찾지 못했다. 셋 다 앞부분이거나 일부다 —
  // 1-2장 낭독 / 5-6장 낭독 / 오디오북 맛보기(preview). 책의 앞에서부터 이어지도록
  // 1-2장을 맨 앞에 두었고, 뒤의 둘도 책 전체를 들려주지는 않는다.
  shadowing: {
    query: "\"To the Future, Ben Franklin\" Magic Tree House 32 read aloud",
    searchUrl: "https://youtu.be/O-VKSDlIYKk",
    videos: [
      { url: "https://youtu.be/O-VKSDlIYKk", title: "Magic Tree House #32 To the Future, Ben Franklin by Mary Pope Osborne -Chapter 1-2 |Read aloud",
        channel: "Quynh Giang English", views: "2,950", length: "12:02" },
      { url: "https://youtu.be/jevAy0ca-Hc", title: "Magic Tree House #32 To the Future, Ben Franklin by Mary Pope Osborne -Chapter 5-6 |Read aloud",
        channel: "Quynh Giang English", views: "1,296", length: "11:02" },
      { url: "https://youtu.be/oJwNfZwIzH8", title: "To the Future, Ben Franklin! Book 32 by Mary Pope Osborne · Audiobook preview",
        channel: "Google Play Books", views: "312", length: "10:40" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·장서 질문·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "future",    pos: "n.",   en: "the time that is still to come, after now", ko: "미래, 앞날",
      ex: "The title of this book is \"To the {{Future}}, Ben Franklin!\"", ex_ko: "이 책의 제목은 '미래로, 벤 프랭클린!'이에요.", pic: "🚀" },
    { word: "whisk",     pos: "v.",   en: "to take someone away suddenly and very quickly", ko: "휙 데려가다",
      ex: "Jack and Annie are {{whisked}} back in time.", ex_ko: "잭과 애니는 시간을 거슬러 휙 옮겨져요.", pic: "💨" },
    { word: "magic",     pos: "adj.", en: "having strange powers that cannot be explained", ko: "마법의",
      ex: "The {{magic}} tree house takes them back in time.", ex_ko: "마법의 나무 집이 그들을 과거로 데려가요.", pic: "✨" },
    { word: "tree house",pos: "n.",   en: "a small house built up in the branches of a tree", ko: "나무 집",
      ex: "Jack and Annie travel in a magic {{tree house}}.", ex_ko: "잭과 애니는 마법의 나무 집을 타고 다녀요.", pic: "🌳" },
    { word: "meet",      pos: "v.",   en: "to come together with someone for the first time", ko: "만나다",
      ex: "They go back in time to {{meet}} Benjamin Franklin.", ex_ko: "그들은 벤저민 프랭클린을 만나러 과거로 가요.", pic: "🤝" },
    { word: "past",      pos: "n.",   en: "the time before now", ko: "과거, 지난날",
      ex: "The tree house sends them back into the {{past}}.", ex_ko: "나무 집은 그들을 과거로 되돌려 보내요.", pic: "⏳" },
    { word: "old",       pos: "adj.", en: "having been there for a long time; from long ago", ko: "오래된, 옛",
      ex: "Jack and Annie visit {{Old}} Philadelphia.", ex_ko: "잭과 애니는 옛 필라델피아에 가요.", pic: "🏛️" },
    { word: "history",   pos: "n.",   en: "everything that happened in the past", ko: "역사",
      ex: "Benjamin Franklin is someone from {{history}}.", ex_ko: "벤저민 프랭클린은 역사 속 인물이에요.", pic: "📜" },
    { word: "inventor",  pos: "n.",   en: "a person who makes something that nobody has made before", ko: "발명가",
      ex: "\"{{Inventors}}\" is one of the subjects listed for this book.", ex_ko: "'발명가'는 이 책의 주제어 가운데 하나예요.", pic: "💡" },
    { word: "fiction",   pos: "n.",   en: "a story that is made up, not a report of real events", ko: "지어낸 이야기, 소설",
      ex: "This book is listed as children's {{fiction}}.", ex_ko: "이 책은 어린이 소설로 분류되어 있어요.", pic: "📖" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아, 10권과 달리 첫 문장을 그대로 쓰는 보기를 넣지 않았다.
  // 대신 장서 요약 한 문장("...by the magic treehouse to meet Benjamin Franklin...")의
  // 짜임을 그대로 가져와 to + 동사원형을 가르친다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure in [[a]] magic tree house.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a magic tree house.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I read {{a}} book about {{an}} inventor." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The magic tree house [[whisked]] Jack and Annie back in time, and they [[visited]] Old Philadelphia.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. whisk → whisked, visit → visited.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "to + 동사원형", ko: "to부정사 — 목적",
        sent: "The tree house sent them back in time [[to meet]] Benjamin Franklin.",
        why_ko: "'~하기 위해'는 to + 동사원형으로 써요. to meet = 만나기 위해. to 뒤에는 늘 동사의 원래 모습이 와요.",
        why: "Use to + the base verb to say WHY someone does something: \"to meet\" = in order to meet.",
        try: "I went to the library {{to read}} a book about history." }
    ],
    find: "책에서 to + 동사원형이 들어간 문장을 세 개 찾아 쓰세요. · Find three sentences with \"to\" + a base verb.",
    exam: {
      choose: [
        { q: "Benjamin Franklin was (a / an) famous person from history.", a: "a",
          why_ko: "famous 는 '페'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie had (a / an) adventure in Old Philadelphia.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "The magic tree house (whisk / whisked) them back in time.", a: "whisked",
          why_ko: "이미 일어난 일이니 과거형 whisked 예요." },
        { q: "They (visit / visited) Old Philadelphia long ago.", a: "visited",
          why_ko: "지난 일이에요. visit 에 -ed 를 붙여 visited!" },
        { q: "They went back in time (to meet / to meeting) Benjamin Franklin.", a: "to meet",
          why_ko: "to 뒤에는 동사의 원래 모습이 와요. to meeting 이 아니라 to meet!" }
      ],
      fix: [
        { q: "The magic tree house [[whisk]] Jack and Annie back in time.", a: "whisked",
          why_ko: "이미 일어난 일이에요. 과거형 whisked 로 고쳐요." },
        { q: "The tree house [[take]] them to Old Philadelphia.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "Jack and Annie travel back in time [[to meeting]] Benjamin Franklin.", a: "to meet",
          why_ko: "to 다음에는 동사원형이에요. to meeting 이 아니라 to meet." }
      ],
      write: [
        { ko: "마법의 나무 집이 그들을 과거로 휙 데려갔다.", cond: "whisk, back in time, 과거형", a: "The magic tree house whisked them back in time.",
          why_ko: "'휙 데려갔다'는 whisk 의 과거형 whisked 예요. 뒤에 back in time 을 붙여요." },
        { ko: "그들은 벤저민 프랭클린을 만나러 옛 필라델피아에 갔다.", cond: "go, to meet, 과거형", a: "They went to Old Philadelphia to meet Benjamin Franklin.",
          why_ko: "go 의 과거형은 went. '만나러'는 목적을 말하니 to + 동사원형 to meet 이에요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where do Jack and Annie go, and who do they meet there?",
      frame: "They go to {{Old Philadelphia}}, and they meet {{Benjamin Franklin}}." },
    { ref: "책 제목", skill: "추론·예측", q: "The title is \"To the Future, Ben Franklin!\" but our summary says the tree house whisks them BACK in time. What do you think the title means?",
      frame: "I think the title means {{                    }}." },
    { ref: "주제어 목록", skill: "어휘", q: "One of this book's listed subjects is \"Inventors.\" What is an inventor?",
      frame: "An inventor is a person who {{                    }}." },
    { ref: "장서 요약", skill: "주제·요점", q: "Using only our one-sentence summary, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "책 전체", skill: "추론·예측", q: "Our summary stops the moment Jack and Annie meet Benjamin Franklin. What do you think happens next?",
      frame: "I think next {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If a magic tree house could take you to meet one person from history, who would you choose, and what would you ask?",
      frame: "I would meet {{                    }}, and I would ask {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장이 근거에 남아 있지 않아, 10권에 있던 '첫 문장 맞히기' 문항은 넣지 않았다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Ben", "Annie and Morgan", "Two inventors"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie are whisked back in time\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "What takes Jack and Annie back in time?",
      a: ["The magic tree house", "A train", "A ship", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 요약이 \"by the magic treehouse\" 라고 적고 있고, 주제어에도 Trees 와 Magic 이 있어요.",
      why: "The magic tree house — \"by the magic treehouse,\" and \"Trees\" and \"Magic\" are listed subjects." },
    { q: "Who do Jack and Annie meet in this book?",
      a: ["Benjamin Franklin", "Morgan le Fay", "A cowboy", "A knight"], c: 0,
      why_ko: "벤저민 프랭클린이에요. 요약과 장서 질문이 둘 다 그 이름을 적고 있어요.",
      why: "Benjamin Franklin — named in both the summary and the catalog question." },
    { q: "Where do Jack and Annie meet Benjamin Franklin?",
      a: ["Old Philadelphia", "Old London", "New York", "Boston"], c: 0,
      why_ko: "Old Philadelphia 예요. 요약이 \"in Old Philadelphia\" 라고 말하고, 주제어에도 Philadelphia 가 있어요.",
      why: "Old Philadelphia — the summary says so, and \"Philadelphia\" is a listed subject." },
    { q: "According to our summary, which way does the tree house send Jack and Annie in time?",
      a: ["Back in time", "Forward in time", "It does not move them in time", "Only across the sea"], c: 0,
      why_ko: "뒤로, 곧 과거로예요. 요약이 \"whisked back in time\" 이라고 적고 있어요. 제목에는 future 가 있지만, 우리가 가진 한 줄 요약이 말하는 것은 back in time 이에요.",
      why: "Back in time — the summary says \"whisked back in time,\" even though the title says \"future.\"" },
    { q: "The subject list says Philadelphia is in which state?",
      a: ["Pennsylvania (PA)", "California (CA)", "Texas (TX)", "Florida (FL)"], c: 0,
      why_ko: "펜실베이니아예요. 주제어가 \"Philadelphia (pa.), fiction\" 이라고 적혀 있고, pa. 는 Pennsylvania 를 줄인 말이에요.",
      why: "Pennsylvania. The subject heading reads \"Philadelphia (pa.), fiction.\"" },
    { q: "Which of these is one of this book's listed subjects?",
      a: ["Inventors", "Pirates", "Dinosaurs", "Volcanoes"], c: 0,
      why_ko: "Inventors(발명가)예요. 주제어 목록에 그대로 있어요. 해적·공룡·화산은 이 책의 주제어 어디에도 없어요.",
      why: "\"Inventors\" appears in the subject list. The other three appear nowhere in our sources." },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Tedd Arnold", "Jack", "Benjamin Franklin"], c: 0,
      why_ko: "메리 폽 오즈번이에요. 장서 목록이 지은이로 그 이름을 적어요. 벤저민 프랭클린은 책 속에서 만나는 사람이지 이 책을 쓴 사람이 아니에요.",
      why: "Mary Pope Osborne — the catalog gives her as the author. Benjamin Franklin is someone in the story, not the writer." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#20", "#32", "#52"], c: 2,
      why_ko: "32권이에요. 장서 목록 제목이 \"#32 To the Future, Ben Franklin!\" 이에요.",
      why: "Book #32 — the catalog title is \"#32 To the Future, Ben Franklin!\"" },
    { q: "Is this book fiction or nonfiction?",
      a: ["Fiction", "Nonfiction", "A dictionary", "A newspaper"], c: 0,
      why_ko: "지어낸 이야기(fiction)예요. 주제어가 \"Children's fiction\" 이고, 장서 목록에도 논픽션이 아니라고 적혀 있어요. 프랭클린은 실제 인물이지만 이 이야기는 지어낸 이야기예요.",
      why: "Fiction — the subject is \"Children's fiction\" and the catalog marks it as not nonfiction." },
    { q: "Our catalog lists this book's theme as...",
      a: ["History Related", "Science Fiction", "Sports", "Animals"], c: 0,
      why_ko: "History Related(역사 관련)예요. 장서 목록의 theme 칸에 그대로 적혀 있어요.",
      why: "History Related — that is the theme recorded in our catalog." },
    { q: "In the summary, Jack and Annie are \"whisked\" back in time. What does \"whisked\" mean?",
      a: ["Taken away suddenly and quickly", "Slowly walked", "Left behind", "Put to sleep"], c: 0,
      why_ko: "휙, 갑자기 빠르게 데려가진다는 뜻이에요. 천천히 걸어가는 것도, 남겨지는 것도 아니에요.",
      why: "Whisked means taken away suddenly and very quickly." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who Jack and Annie meet", "Where they meet him", "What happens after they meet him", "Who wrote the book"], c: 2,
      why_ko: "만난 다음의 이야기예요. 우리가 가진 글은 \"to meet Benjamin Franklin in Old Philadelphia\" 에서 그대로 끝나요. 그 뒤는 책을 읽어야 알 수 있어요.",
      why: "What happens after they meet him. Our sources stop at \"to meet Benjamin Franklin in Old Philadelphia.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(해·문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Old Philadelphia}}", time: "{{                    }}" },   // 몇 년인지는 근거가 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to meet Benjamin Franklin}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie back in time.",
        frame: "They are carried {{back in time}} by {{the magic tree house}}." },
      { label: "Old Philadelphia",
        given: "",
        frame: "They arrive in {{Old Philadelphia}}, a city in {{Pennsylvania}}." },
      { label: "Meeting Ben Franklin",
        given: "",
        frame: "There they meet {{Benjamin Franklin}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "To the Future, Ben Franklin!",
    branches: [
      { label: "Jack & Annie",   ask: "Jack and Annie are whisked back in time. What do you think that moment feels like?",
        deeper: "Would you want the trip to be sudden like that, or would you want a warning first? Why?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think a tree house — an ordinary thing — was chosen to do something so extraordinary?" },
      { label: "Old Philadelphia", ask: "The word \"Old\" is in front of Philadelphia. What does that tell you about the city they see?",
        deeper: "How might a city change between then and now? Name two things." },
      { label: "Ben Franklin",   ask: "Jack and Annie travel through time to meet one person. Why go to that much trouble to meet someone?",
        deeper: "What makes a person worth remembering hundreds of years later?" },
      { label: "The Title",      ask: "The title says \"To the Future\" but the summary says they go back in time. Who might be going to the future?",
        deeper: "Why would an author choose a title that seems to point the opposite way from the story?" },
      { label: "Me",             ask: "If the tree house came for you, which time would you ask it for — the past or the future?",
        deeper: "What would you want to find there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["History", "Innovation", "Curiosity"],
    globalContext: "Orientation in space and time — 다른 시대, 다른 땅은 지금 우리와 어떻게 다른가",
    statement: "Meeting someone from another time can change the way you see your own.",
    factual: [
      "What takes Jack and Annie back in time?",
      "Where do they go, and who do they meet there?",
      "Which direction in time does our summary say they travel?"
    ],
    conceptual: [
      "Why do people want to know about times they never lived in?",
      "What is the difference between reading about a person and meeting them?"
    ],
    debatable: [
      "Is it better to travel to the past or to the future?",
      "Can we really understand people who lived long before us?"
    ],
    learnerProfile: ["Inquirer", "Thinker", "Open-minded"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "만난다" 까지만 말한다. 두 아이가 무엇을 하고 무엇을 배웠는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    // 장서 목록의 토론 질문 "What would you like to ask Benjamin Franklin?" 에서 따왔다.
    prompt: "Jack and Annie travel back in time to meet Benjamin Franklin. If you could meet one person from history, who would you choose? Write your opinion and say why.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "만나고 싶은 사람을 한 명만 정할 것 · Name only one person",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "The Person I Would Meet", lines: 1 },
      { part: "P — Point",       ask: "Who would you meet? Say it in one clear sentence.",
        eg: "If I had a magic tree house, I would go back to meet one person.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, the tree house whisks Jack and Annie to Old Philadelphia.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that meeting a person can teach more than a book can.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people would rather see the future, but the past is already real.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I would use my one trip to meet that person.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and Annie back in time to Old Philadelphia to meet Benjamin Franklin, notice that our sources stop there, and then take a side on which person from history they would travel to meet.",
      ko: "마법의 나무 집이 잭과 애니를 시간을 거슬러 Old Philadelphia 로 보내 Benjamin Franklin 을 만나게 하는 흐름을 말하고, 우리 자료가 거기서 멈춘다는 것을 알아채고, 역사 속 누구를 만나러 가고 싶은지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 이 책은 소개글도 첫 문장도 남아 있지 않아 10권보다 더 비어 있다. 비어 있는 것이
    // 이 수업의 재료다. 아이가 책에서 찾아온 것은 칠판 한쪽에 적어 두고 다음 수업에 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "If you could meet one person who lived a long time ago, who would it be?",
        do: "책을 펴기 전에 한다. 서너 명만 받는다. 이름이 나오면 칠판 구석에 적어 둔다 — 마지막 글쓰기에서 그대로 쓴다.",
        exp: "세종대왕. / 이순신. / 아인슈타인.",
        stuck: "선생님이 먼저 한 사람 고르고 한 문장 한다. \"I would meet ___ because ___.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"To the Future, Ben Franklin!\" But our summary says the tree house takes them BACK in time. Which is it?",
        do: "제목과 요약이 서로 다른 쪽을 가리킨다는 것만 보여 준다. 답을 정해 주지 않는다. 이 물음이 오늘 수업 내내 살아 있어야 한다.",
        exp: "Maybe Ben Franklin goes to the future. / Maybe both.",
        stuck: "칠판에 화살표 두 개를 반대로 그린다. \"Title says this way. Summary says that way. Hmm.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "미래 → future / 휙 데려가다 → whisk / 발명가 → inventor",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where do they go...' becomes 'They go to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They go to Old Philadelphia, and they meet Benjamin Franklin.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question 6 asks what happens AFTER they meet him. I do not know. Our summary stops at the word 'Philadelphia.'",
        do: "선생님이 모른다는 것을 그대로 말한다. 이 수업의 태도가 여기서 정해진다. 아이의 추측을 받되 맞다·틀리다 하지 않는다.",
        exp: "(아이마다 다른 추측)",
        stuck: "\"Guess. Tonight the book will tell you if you were right.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to meet Benjamin Franklin — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Who are they going to meet?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. And the year is empty too. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Title)", min: "",
        say: "Stop at The Title. Don't just tell me they went back in time — tell me WHO might be going to the future.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Maybe Ben Franklin is the one who travels forward. / Maybe he sees our time.",
        stuck: "\"Read the title out loud. Who is being spoken TO in it?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Past or future — which would you travel to? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I would go to the past, because I want to meet someone who is already gone.",
        stuck: "손을 들게 한다. \"Past? Or future?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다. 워밍업 때 칠판에 적어 둔 이름들을 가리킨다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people would rather meet someone alive today, but the past cannot be visited again.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about Benjamin Franklin?", ko: "벤저민 프랭클린에 대해 이미 아는 게 있니?" },
        { en: "Have you ever wanted to meet someone from history?", ko: "역사 속 인물을 만나 보고 싶었던 적 있니?" },
        { en: "The city is called \"Old Philadelphia.\" What do you picture when you hear \"old city\"?", ko: "'옛 필라델피아'라고 해. '옛 도시'라고 하면 어떤 모습이 떠오르니?" }
      ],
      during: [
        { en: "The title says \"To the Future.\" Who do you think is going to the future?", ko: "제목이 '미래로'라고 해. 누가 미래로 가는 걸까?" },
        { en: "What would you like to ask Benjamin Franklin if you were there?", ko: "네가 그 자리에 있다면 벤저민 프랭클린에게 무엇을 묻고 싶니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Now that you have read it, what does the title mean?", ko: "다 읽고 나니 제목은 무슨 뜻이었니?" },
        { en: "What year were Jack and Annie in? Our summary never said.", ko: "잭과 애니는 몇 년도에 있었니? 우리 자료에는 없었어." }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 과 해(年) 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Title' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "IB Inquiry",    point: "1·2단은 말로, 3단만 글로.", miss: "Debatable에 '둘 다 맞다'라고 쓴다. 편을 정하게 한다." },
      { sheet: "Writing",       point: "조건 4개를 먼저 소리 내어 읽는다.", miss: "근거 대신 감상만 쓴다. 책 속 이야기가 없으면 근거가 아니다." },
      { sheet: "전체",          point: "이 책은 프랭클린을 안다고 먼저 말해 주지 않는다. 아이가 책에서 알아 오게 둔다.", miss: "선생님이 연날리기·피뢰침 이야기를 먼저 꺼낸다. 그러면 책을 읽을 이유가 사라진다." }
    ],
    scoring: [
      { c: "A 분석 Analysis",     pt: 5, yes: "책 속 이야기를 들어 설명했다", no: "'좋았다' 같은 감상만 있다" },
      { c: "B 구성 Organization", pt: 5, yes: "의견 → 근거 → 반박 → 마무리 순서가 보인다", no: "생각나는 대로 이어 썼다" },
      { c: "C 표현 Voice",        pt: 5, yes: "자기 생각이 드러나는 문장이 있다", no: "책 문장을 그대로 옮겼다" },
      { c: "D 언어 Language",     pt: 5, yes: "문장이 끝나고, 대문자·철자가 맞다", no: "한 문장이 끝없이 이어진다" }
    ]
  },

  // ── 낭독녹음 ───────────────────────────────────────────
  // 근거(장서 한 줄 요약 · 주제어 목록)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 근거에 남아 있지 않아, 10권과 달리 책의 첫 문장으로 시작하지 않는다.
  // 근거가 만난 뒤의 일도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 옛 필라델피아로 가 벤저민 프랭클린을 만나는 이야기",
    text: "The [[wonderful|magic]] tree house [[carried|whisked]] Jack and Annie back in [[the years|time]]. It set them down in [[long-ago|Old]] Philadelphia, a city in Pennsylvania. There they were going to [[see|meet]] a man named Benjamin Franklin. The cover of the book calls out to him: \"To the [[days to come|Future]], Ben Franklin!\" Our story list stops right here. What happened after they met him? Open the book and find out."
  }
};
