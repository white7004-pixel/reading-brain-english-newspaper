// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.3)
// Hour of the Olympics (Magic Tree House #16) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/M3070.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·물건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고
// 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 고대 그리스(ancient Greece)로 보낸다 /
//   잃어버린 이야기(a lost story) 하나를 되찾아 오는 것이 할 일이다 /
//   거기서 아주 첫 번째 올림픽 경기를 눈으로 본다 /
//   그 시절 여자아이들에게 허락되지 않던 무언가를 알고 놀란다 /
//   책의 첫 문장은 "You awake?"
// 잃어버린 이야기가 무엇인지, 두 아이가 그것을 되찾았는지, 여자아이들에게 허락되지
// 않던 그 무언가가 정확히 무엇인지는 어느 출처도 말하지 않는다. 소개글은 "what girls
// of the time were not allowed to do" 에서 그대로 끊긴다. 그래서 비워 두었다.
// 10권과 마찬가지로 이 책 근거도 두 아이의 나이나 손위손아래를 말하지 않는다. 쓰지 않았다.
// 오픈라이브러리 people 목록이 비어 있어, 잭과 애니 말고는 사람 이름을 한 개도 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3070",
  slug: "magic-tree-house-hour-of-the-olympics",
  title: "Hour of the Olympics",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #16",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.3", lexile: "380L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424174-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·장소 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 M3070 요약 + 오픈라이브러리 /works/OL81825W (소개글 · 첫 문장 \"You awake?\" · 주제어 Olympic games/Olympics/Magic/Tree houses/Time travel/Sex role/Juvenile fiction · 장소 Greece · 80쪽 · 기록된 해 1986년)",
    characters: ["Jack", "Annie"],
    beats: [
      "the magic tree house sends Jack and Annie back to ancient Greece to retrieve a lost story",
      "there they witness the very first Olympic games",
      "they are surprised to find what girls of the time were not allowed to do"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"they witness the very first Olympic games\" 에서 멈추고, 소개글은 \"what girls of the time were not allowed to do\" 에서 끊긴다. 잃어버린 이야기가 무엇이었는지, 두 아이가 그것을 되찾았는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"back to Ancient Greece\", \"retrieve a lost story\", \"the very first Olympic games\", \"Book #16\")과 소개글(\"takes Jack and Annie back to retrieve a lost story in ancient Greece\", \"the original Olympic games\", \"surprised to find what girls of the time were not allowed to do\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(여자아이들 이야기)은 요약과 부딪히지 않아 남겼다. 주제어 Olympic games/Olympics/Tree houses/Time travel/Sex role 과 장소 Greece 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 오픈라이브러리 people 목록이 비어 있어 잭과 애니 말고는 어떤 인물도 학습지에 쓰지 않았다. 기록된 출판 연도 1986년은 우리 장서 정보와 맞는지 확인하지 못해 학습지 어디에도 쓰지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Hour of the Olympics\" read aloud",
    searchUrl: "https://youtu.be/Ll7E78sESGo",
    videos: [
      { url: "https://youtu.be/Ll7E78sESGo", title: "Magic Tree House | #16 Hour of the Oympics | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "12,717", length: "40:27" },
      { url: "https://youtu.be/lS1zKWygasw", title: "Hour of the Olympics",
        channel: "Sarah Fernitz", views: "4,365", length: "26:36" },
      { url: "https://youtu.be/VscZc0_4gNA", title: "Read Aloud with Mrs. Bunker-Magic Treehouse #16, Hour of the Olympics- Chapters 1 2",
        channel: "REBECCA BUNKER", views: "295", length: "10:35" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "hour",      pos: "n.",   en: "a length of time of sixty minutes; also a special moment in time", ko: "시간, 한 시간; (어떤 일이 일어나는) 때",
      ex: "The title of this book is \"{{Hour}} of the Olympics.\"", ex_ko: "이 책의 제목은 '올림픽의 시간'이에요.", pic: "⏰" },
    { word: "ancient",   pos: "adj.", en: "from a time very, very long ago", ko: "고대의, 아주 오래된",
      ex: "Jack and Annie go back to {{ancient}} Greece.", ex_ko: "잭과 애니는 고대 그리스로 갑니다.", pic: "🏛️" },
    { word: "Greece",    pos: "n.",   en: "a country in southern Europe where the Olympic games began", ko: "그리스",
      ex: "The tree house sends them to {{Greece}}.", ex_ko: "나무 집은 그들을 그리스로 보냅니다.", pic: "🇬🇷" },
    { word: "retrieve",  pos: "v.",   en: "to go and bring something back", ko: "되찾아 오다",
      ex: "They must {{retrieve}} a lost story.", ex_ko: "그들은 잃어버린 이야기를 되찾아 와야 해요.", pic: "📜" },
    { word: "lost",      pos: "adj.", en: "missing; not able to be found", ko: "잃어버린, 사라진",
      ex: "A {{lost}} story is waiting in ancient Greece.", ex_ko: "잃어버린 이야기 하나가 고대 그리스에 있어요.", pic: "🔍" },
    { word: "witness",   pos: "v.",   en: "to see something happen with your own eyes", ko: "목격하다, 직접 보다",
      ex: "They {{witness}} the very first Olympic games.", ex_ko: "그들은 아주 첫 번째 올림픽 경기를 직접 봐요.", pic: "👀" },
    { word: "Olympic",   pos: "adj.", en: "belonging to the Olympic games, a big meeting of sports contests", ko: "올림픽의",
      ex: "Jack and Annie see the first {{Olympic}} games.", ex_ko: "잭과 애니는 첫 올림픽 경기를 봅니다.", pic: "🏅" },
    { word: "first",     pos: "adj.", en: "coming before all the others", ko: "첫 번째의, 맨 처음의",
      ex: "These are the very {{first}} Olympic games.", ex_ko: "이것은 아주 첫 번째 올림픽 경기예요.", pic: "1️⃣" },
    { word: "surprised", pos: "adj.", en: "feeling something you did not expect", ko: "놀란",
      ex: "Jack and Annie are {{surprised}} by what they find.", ex_ko: "잭과 애니는 알게 된 사실에 놀랍니다.", pic: "😮" },
    { word: "allow",     pos: "v.",   en: "to let someone do something", ko: "허락하다",
      ex: "Girls of that time were not {{allowed}} to do it.", ex_ko: "그 시절 여자아이들에게는 그것이 허락되지 않았어요.", pic: "🚫" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  grammar: {
    points: [
      { name: "동사 + -s (3인칭 단수)", ko: "3인칭 단수 현재형",
        sent: "The magic tree house [[sends]] Jack and Annie to Greece, and there they [[witness]] the games.",
        why_ko: "주어가 하나(he·she·it·나무 집)면 동사 뒤에 -s 를 붙여요. 주어가 둘 이상(they)이면 그냥 둬요. the tree house sends / they witness.",
        why: "Add -s to the verb for one person or thing. Use the plain verb for \"they.\"",
        try: "My sister {{reads}} a book, and my friends {{read}} comics." },
      { name: "to + 동사원형 (~하기 위해)", ko: "부정사 (목적)",
        sent: "The tree house takes them back [[to retrieve]] a lost story.",
        why_ko: "'왜 갔는데?' 에 답할 때는 to + 동사원형이에요. to retrieve = 되찾아 오려고. to 뒤에는 언제나 원형!",
        why: "Use \"to + base verb\" to say WHY someone does something.",
        try: "I went to the library {{to find}} a book." },
      { name: "was / were + not allowed to", ko: "과거 수동 + 부정",
        sent: "Girls of the time [[were not allowed]] to do it.",
        why_ko: "'~하는 것이 허락되지 않았다'는 was/were + not allowed to 예요. 사람이 여럿(girls)이면 were! 뒤에는 to + 동사원형이 와요.",
        why: "Use was/were + not allowed to + base verb for something people were not permitted to do.",
        try: "We {{were not allowed}} to run in the hallway." }
    ],
    find: "책에서 to + 동사원형이 '~하기 위해'로 쓰인 곳을 두 군데 찾아 쓰세요. · Find two places where \"to + verb\" means \"in order to.\"",
    exam: {
      choose: [
        { q: "The magic tree house (send / sends) Jack and Annie to ancient Greece.", a: "sends",
          why_ko: "주어가 the magic tree house 하나예요. 하나면 동사에 -s 를 붙여 sends!" },
        { q: "In Greece they (witness / witnesses) the very first Olympic games.", a: "witness",
          why_ko: "주어가 they 로 여럿이에요. 여럿이면 -s 를 붙이지 않고 그냥 witness." },
        { q: "They go back (to retrieve / retrieve) a lost story.", a: "to retrieve",
          why_ko: "'되찾아 오려고' 라는 이유를 말하고 있어요. 이럴 때는 to + 동사원형!" },
        { q: "Girls of the time (was / were) not allowed to do it.", a: "were",
          why_ko: "girls 는 여럿이에요. 복수 주어의 과거 be동사는 were." },
        { q: "Jack and Annie are (surprise / surprised) by what they find.", a: "surprised",
          why_ko: "사람이 놀란 기분을 말할 때는 -ed 를 붙인 surprised 예요." }
      ],
      fix: [
        { q: "The magic tree house [[take]] Jack and Annie to ancient Greece.", a: "takes",
          why_ko: "주어가 하나예요. 동사에 -s 를 붙여 takes 로 고쳐요." },
        { q: "They went back Greece [[retrieve]] a lost story.", a: "to retrieve",
          why_ko: "이유를 말하는 자리예요. 동사 앞에 to 를 붙여 to retrieve!" },
        { q: "Girls of that time [[was]] not allowed to do it.", a: "were",
          why_ko: "girls 는 복수라서 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "잭과 애니는 아주 첫 번째 올림픽 경기를 직접 본다.", cond: "witness, the very first", a: "Jack and Annie witness the very first Olympic games.",
          why_ko: "주어가 둘이라 witness 에 -s 를 붙이지 않아요. '아주 첫 번째'는 the very first." },
        { ko: "그들은 잃어버린 이야기를 되찾아 오려고 그리스로 간다.", cond: "to retrieve, lost story", a: "They go to Greece to retrieve a lost story.",
          why_ko: "'되찾아 오려고' 라는 이유는 to + 동사원형 to retrieve 로 써요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what sends them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} sends them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where does the magic tree house send Jack and Annie, and what must they bring back?",
      frame: "It sends them to {{ancient Greece}}, and they must retrieve {{a lost story}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What do Jack and Annie witness in Greece?",
      frame: "They witness {{the very first Olympic games}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "The description says Jack and Annie are surprised. What surprises them?",
      frame: "They are surprised to find {{what girls of the time were not allowed to do}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Hour of the Olympics.\" What do you think the word \"hour\" points to here?",
      frame: "I think \"hour\" points to {{                    }}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The book's first words are \"You awake?\" What does that tell you about how the story begins?",
      frame: "It tells me {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If you could witness the very first Olympic games, what would you most want to see? Say why.",
      frame: "I would most want to see {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a runner", "Two Greek boys"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"sends Jack and Annie back to Ancient Greece\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["A magic tree house", "A ship", "A chariot", "A time machine"], c: 0,
      why_ko: "마법의 나무 집이에요. 주제어 목록에도 Tree houses 와 Time travel 이 나란히 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Time travel\" are both listed subjects." },
    { q: "Where does the magic tree house send Jack and Annie?",
      a: ["Ancient Greece", "The wild west", "Ancient Egypt", "The Middle Ages"], c: 0,
      why_ko: "고대 그리스예요. 요약도 소개글도 ancient Greece 라고 말하고, 장소 목록에도 Greece 가 적혀 있어요.",
      why: "Ancient Greece — both the summary and the description say so, and \"Greece\" is the listed place." },
    { q: "What are Jack and Annie sent to bring back?",
      a: ["A lost story", "A gold medal", "A magic book of spells", "A gift for Morgan"], c: 0,
      why_ko: "잃어버린 이야기(a lost story)예요. 요약이 \"to retrieve a lost story\" 라고 적고 있어요.",
      why: "A lost story — the summary says \"to retrieve a lost story.\"" },
    { q: "What do Jack and Annie witness in Greece?",
      a: ["The very first Olympic games", "A great sea battle", "The building of a temple", "A king's wedding"], c: 0,
      why_ko: "아주 첫 번째 올림픽 경기예요. 요약은 \"the very first Olympic games\", 소개글은 \"the original Olympic games\" 라고 말해요.",
      why: "The very first Olympic games. The description calls them \"the original Olympic games.\"" },
    { q: "Which of these is a listed subject (topic) of this book?",
      a: ["Time travel", "Dinosaurs", "Pirates", "Outer space"], c: 0,
      why_ko: "Time travel 이에요. 주제어 목록에 Olympic games · Olympics · Magic · Tree houses · Time travel · Sex role 이 있어요. 공룡·해적·우주는 없어요.",
      why: "Time travel. The listed subjects are Olympic games, Olympics, Magic, Tree houses, Time travel and Sex role." },
    { q: "According to the description, what surprises Jack and Annie in ancient Greece?",
      a: ["What girls of the time were not allowed to do", "How cold the weather was", "That nobody spoke English", "That the games lasted one hour"], c: 0,
      why_ko: "그 시절 여자아이들에게 허락되지 않던 일이에요. 소개글이 \"surprised to find what girls of the time were not allowed to do\" 라고 말해요.",
      why: "What girls of the time were not allowed to do — the description says exactly that." },
    { q: "Girls of that time were not ______ to do it.",
      a: ["allowed", "ready", "awake", "surprised"], c: 0,
      why_ko: "allowed 예요. '허락되지 않았다'는 were not allowed to 라고 써요. 소개글의 말 그대로예요.",
      why: "\"Allowed.\" The description's own words are \"were not allowed to do.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"You awake?\"", "\"Jack couldn't sleep.\"", "\"The stadium was full.\"", "\"Annie ran down the road.\""], c: 0,
      why_ko: "첫 문장은 \"You awake?\" 예요. 오픈라이브러리에 그대로 적혀 있어요. \"Jack couldn't sleep.\" 은 다른 권의 첫 문장이에요.",
      why: "\"You awake?\" is the recorded first line of this book." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#6", "#10", "#16", "#26"], c: 2,
      why_ko: "16권이에요. 장서 목록 제목이 \"#16. Hour of the Olympics\" 이고 요약 끝에도 Book #16 이라고 적혀 있어요.",
      why: "Book #16 — the catalog title is \"#16. Hour of the Olympics.\"" },
    { q: "What does the word \"ancient\" mean?",
      a: ["From a time very long ago", "Very far away", "Very cold", "Very crowded"], c: 0,
      why_ko: "ancient 는 아주 오래전의, 고대의 라는 뜻이에요. ancient Greece 는 '고대 그리스'예요.",
      why: "Ancient means from a time very long ago. \"Ancient Greece\" is Greece long, long ago." },
    { q: "In \"to retrieve a lost story,\" what does \"retrieve\" mean?",
      a: ["To go and bring something back", "To write something new", "To hide something", "To read something aloud"], c: 0,
      why_ko: "retrieve 는 '가서 되찾아 오다'예요. 잃어버린 이야기를 되찾아 오는 것이 두 아이의 할 일이에요.",
      why: "Retrieve means to go and bring something back — here, a lost story." },
    { q: "In \"they witness the very first Olympic games,\" what does \"witness\" mean?",
      a: ["To see something happen", "To win something", "To lose something", "To start something"], c: 0,
      why_ko: "witness 는 제 눈으로 직접 보다, 목격하다 라는 뜻이에요. 두 아이는 경기를 한 것이 아니라 본 거예요.",
      why: "Witness means to see something happen with your own eyes — they watch, they do not compete." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where the tree house sends them", "What they must bring back", "Whether they find the lost story", "What games they witness"], c: 2,
      why_ko: "잃어버린 이야기를 되찾았는지는 알 수 없어요. 우리가 가진 글은 '되찾으러 간다'와 '첫 올림픽을 본다'에서 멈춰요. 그 답은 책을 읽어야 알 수 있어요.",
      why: "Whether they find the lost story. Our sources stop at \"to retrieve a lost story\" and never say how it ends." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{ancient Greece}}", time: "{{long, long ago — the time of the very first Olympic games}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to retrieve a lost story}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house sends Jack and Annie back in time.",
        frame: "They go to {{ancient Greece}}, and their task is to retrieve {{a lost story}}." },
      { label: "The Games",
        given: "",
        frame: "In Greece they witness {{the very first Olympic games}}." },
      { label: "The Surprise",
        given: "",
        frame: "They are surprised to find {{what girls of the time were not allowed to do}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Hour of the Olympics",
    branches: [
      { label: "Jack & Annie",  ask: "The book opens with two words: \"You awake?\" What do you think is happening at that moment?",
        deeper: "Why do you think so many adventures start with someone waking another person up?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose ancient Greece for this task?" },
      { label: "The Lost Story", ask: "Their job is to retrieve a lost story. How can a story get lost?",
        deeper: "If a story is never written down and nobody tells it again, is it gone? Say why." },
      { label: "The First Games", ask: "They witness the very first Olympic games. What would the very first games look like?",
        deeper: "Why do you think people kept holding the games for thousands of years after that?" },
      { label: "Not Allowed",    ask: "Jack and Annie are surprised by something girls of that time were not allowed to do. Why would that surprise them?",
        deeper: "What makes a rule fair, and what makes a rule unfair?" },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for ancient Greece? Why or why not?",
        deeper: "What would you want to bring back from there, and why that?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Fairness", "Tradition", "Evidence"],
    globalContext: "Fairness and development — 누구에게 무엇이 허락되는가, 그것은 누가 정하는가",
    statement: "Every tradition began once, in one place, with rules that someone decided.",
    factual: [
      "Where and when does the magic tree house send Jack and Annie?",
      "What are they sent to bring back?",
      "What do they witness in Greece, and what surprises them there?"
    ],
    conceptual: [
      "Why do people keep a tradition going for thousands of years?",
      "What is the difference between a rule that protects people and a rule that shuts people out?"
    ],
    debatable: [
      "Should an old tradition be changed when we think it is unfair?",
      "Is a story worth travelling a very long way to save?"
    ],
    learnerProfile: ["Inquirer", "Principled", "Open-minded"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "여자아이들에게 허락되지 않던 무언가" 까지만 말하고 그것이 무엇인지는 말하지 않는다.
    // 그래서 책 속 사실을 맞히게 하지 않고, 아이 자신의 판단을 묻는 물음으로 세웠다.
    prompt: "In ancient Greece there was something girls were not allowed to do. Should anyone be stopped from doing something just for being a girl or a boy? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Who Gets to Play", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think nobody should be stopped just for being a girl or a boy.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, they are surprised by what girls of that time were not allowed to do.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "Their surprise shows the rule felt strange and unfair to them.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say old rules should stay, but a rule can be old and still be wrong.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe the door should be open to everyone.", lines: 2 }
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
      en: "Students retell how the magic tree house sends Jack and Annie to ancient Greece to retrieve a lost story, where they witness the very first Olympic games and are surprised by what girls of the time were not allowed to do, then take a side on whether anyone should be shut out for being a girl or a boy.",
      ko: "마법의 나무 집이 잭과 애니를 고대 그리스로 보내 잃어버린 이야기를 되찾게 하고, 두 아이가 아주 첫 번째 올림픽 경기를 보며 그 시절 여자아이들에게 허락되지 않던 일에 놀라는 흐름을 말하고, 여자아이·남자아이라는 이유로 무언가를 막는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "The Olympic games happen every four years. Somebody held the very first one. What do you think it looked like?",
        do: "책을 펴기 전에 한다. '첫 번째'라는 말을 아이 입에서 먼저 꺼내야 제목이 읽힌다. 서너 명만.",
        exp: "Fewer people. / No TV. / Running races.",
        stuck: "선생님이 먼저 한 문장 한다. \"I think there were no cameras and no medals yet.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Hour of the Olympics.\" Why an hour, do you think, and not a day or a year?",
        do: "제목 낱말만 푼다. 줄거리는 말하지 않는다. 답을 맞힐 필요는 없다.",
        exp: "Maybe one important moment. / Maybe they only have a short time.",
        stuck: "표지를 가리킨다. \"Look at the cover. What are they watching?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "고대의 → ancient / 되찾아 오다 → retrieve / 목격하다 → witness",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where does the tree house send...' becomes 'It sends them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It sends them to ancient Greece, and they must retrieve a lost story.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first words are just two: \"You awake?\" No magic yet, no Greece yet. Why start there?",
        do: "칠판에 그 두 낱말만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "Somebody is waking somebody up. / It is still night at home.",
        stuck: "\"Who do you think is asking? And who is being asked?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to retrieve a lost story — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they sent to bring back?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Not Allowed)", min: "",
        say: "Stop at Not Allowed. Don't just tell me they were surprised — tell me what makes a rule unfair.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "A rule is unfair when it shuts someone out for something they did not choose.",
        stuck: "\"You told me they were surprised. Now — why would that surprise them?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should an old tradition change when we think it is unfair? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because a rule can be very old and still be wrong.",
        stuck: "손을 들게 한다. \"Keep the old rule? Or change it?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say old rules should stay, but a rule can be old and still be wrong.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about the Olympic games?", ko: "올림픽에 대해 이미 아는 게 있니?" },
        { en: "Have you ever gone somewhere to bring back something that was lost?", ko: "잃어버린 것을 찾으러 어디까지 가 본 적 있니?" },
        { en: "The book is set in ancient Greece. How long ago do you think that is?", ko: "이 책은 고대 그리스가 배경이야. 얼마나 오래전일 것 같니?" }
      ],
      during: [
        { en: "What kind of story do you think the lost story is?", ko: "잃어버린 이야기는 어떤 이야기일 것 같니?" },
        { en: "What do you think girls of that time were not allowed to do?", ko: "그 시절 여자아이들에게 허락되지 않은 일은 무엇이었을까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Did Jack and Annie retrieve the lost story? What was it?", ko: "잭과 애니는 잃어버린 이야기를 되찾았니? 그건 무슨 이야기였니?" },
        { en: "Now that you have read it — what were girls not allowed to do, and what did you think about it?", ko: "다 읽고 나니, 여자아이들에게 허락되지 않은 일은 무엇이었고 너는 그걸 어떻게 생각했니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'Not Allowed' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 잃어버린 이야기의 정체도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 고대 그리스로 가 첫 올림픽을 보는 이야기",
    text: "The book begins with two small words: \"You awake?\" Soon the magic tree house takes Jack and Annie back to [[very old|ancient]] [[the land of the games|Greece]]. Their task is to [[bring back|retrieve]] a [[missing|lost]] story. In Greece they [[see with their own eyes|witness]] the very [[earliest|first]] [[Games|Olympic]] games. And they are [[amazed|surprised]] to find something girls of that time were not [[permitted|allowed]] to do. What was it? Did they bring the story home? Open the book and find out."
  }
};
