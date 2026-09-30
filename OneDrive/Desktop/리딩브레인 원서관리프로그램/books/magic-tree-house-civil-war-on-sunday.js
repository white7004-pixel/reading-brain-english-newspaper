// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.4)
// Civil War on Sunday (Magic Tree House #21) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3265.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 인물 목록 · 장소 목록)만으로 만들었다.
// 그 밖의 인물 이름·지명·전투·사건·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는
// 자리는 지어내지 않고 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 남북전쟁(the Civil War) 시대로 보낸다 /
//   거기서 유명한 간호사 클라라 바턴(Clara Barton)을 만난다 / 이야기의 나라는 미국 /
//   책의 첫 문장은 "Jack looked out his window."
// 두 아이가 왜 갔는지, 클라라 바턴과 무엇을 했는지, 어떻게 끝나는지는 어느 출처도
// 말하지 않는다. 그래서 비워 두었다.
// 전쟁이 배경인 책이지만 근거는 전투도 다친 사람도 말하지 않는다. 우리도 쓰지 않았다.
// 이 학습지는 "돕는 사람"을 보게 한다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3265",
  slug: "magic-tree-house-civil-war-on-sunday",
  title: "Civil War on Sunday",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #21",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.4", lexile: "580L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424179-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·인물 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3265 요약 + 오픈라이브러리 /works/OL81769W (소개글 · 첫 문장 \"Jack looked out his window.\" · 주제어 History/Tree houses/Magic/Time travel/United States Civil War, 1861-1865/Brothers and sisters · 인물 Clara Barton (1821-1912) · 장소 United States · 75쪽 · 2000년)",
    characters: ["Jack", "Annie", "Clara Barton"],
    beats: [
      "the magic tree house transports Jack and Annie to the time of the Civil War",
      "the children encounter the famous nurse, Clara Barton",
      "the story is set in the United States"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"The children encounter the famous nurse, Clara Barton.\" 에서 멈추고, 소개글은 \"where they meet Clara Barton\" 에서 끊긴다. 두 아이가 왜 그 시대로 갔는지, 클라라 바턴과 무엇을 했는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"the magic tree house transports Jack and Annie to the time of the Civil War\", \"the famous nurse, Clara Barton\", \"Book #21\")과 소개글(\"transported by their magic tree house to the time of the Civil War where they meet Clara Barton\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 주제어 History/Tree houses/Magic/Time travel 과 장소 United States 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 일부러 쓰지 않은 것: 인물 목록의 생몰년 (1821-1912) 과 주제어의 연도 (1861-1865) 는 책의 이야기가 아니라 분류 정보라 학습지에 넣지 않았다. 주제어 \"Brothers and sisters\" 가 있으나 두 아이가 남매인지, 누가 손위인지는 어느 문장도 말하지 않아 '오빠·여동생' 같은 말을 쓰지 않았다. 전투 이름·다친 사람·어느 편인지도 근거에 없어 학습지 어디에도 없다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Civil War on Sunday\" read aloud",
    searchUrl: "https://youtu.be/kyIXzSKbH3k",
    videos: [
      { url: "https://youtu.be/kyIXzSKbH3k", title: "Magic Tree House | #21 Civil War on Sunday  | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "8,788", length: "41:06" },
      { url: "https://youtu.be/KfBVymrF3Zk", title: "Magic Tree House #21 Civil War on Sunday - Chapters 1 and 2,  READ ALOUD",
        channel: "sjamn14", views: "876", length: "9:36" },
      { url: "https://youtu.be/4dpY08DAb9M", title: "Magic Tree House #21 Civil War on Sunday - Chapters 3 and 4,  READ ALOUD",
        channel: "sjamn14", views: "593", length: "12:22" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "civil war", pos: "n.",   en: "a war fought between groups of people inside one country", ko: "내전, 남북전쟁",
      ex: "The tree house takes them to the time of the {{Civil War}}.", ex_ko: "나무 집은 그들을 남북전쟁 시대로 데려가요.", pic: "🏳️" },
    { word: "nurse",     pos: "n.",   en: "a person whose job is to take care of people who are sick or hurt", ko: "간호사",
      ex: "Clara Barton was a famous {{nurse}}.", ex_ko: "클라라 바턴은 유명한 간호사였어요.", pic: "🩺" },
    { word: "famous",    pos: "adj.", en: "known by very many people", ko: "유명한",
      ex: "Jack and Annie meet a {{famous}} nurse.", ex_ko: "잭과 애니는 유명한 간호사를 만나요.", pic: "⭐" },
    { word: "transport", pos: "v.",   en: "to carry a person or thing from one place to another", ko: "실어 나르다, 데려가다",
      ex: "The magic tree house {{transports}} the children.", ex_ko: "마법의 나무 집이 아이들을 데려갑니다.", pic: "🚚" },
    { word: "encounter", pos: "v.",   en: "to meet someone you did not plan to meet", ko: "우연히 마주치다",
      ex: "The children {{encounter}} Clara Barton.", ex_ko: "아이들은 클라라 바턴을 마주칩니다.", pic: "🤝" },
    { word: "magic",     pos: "n.",   en: "a special power that makes impossible things happen", ko: "마법",
      ex: "The tree house works by {{magic}}.", ex_ko: "그 나무 집은 마법으로 움직여요.", pic: "✨" },
    { word: "travel",    pos: "v.",   en: "to go from one place, or one time, to another", ko: "여행하다, 이동하다",
      ex: "Jack and Annie {{travel}} through time.", ex_ko: "잭과 애니는 시간을 건너 이동해요.", pic: "🧭" },
    { word: "history",   pos: "n.",   en: "everything that happened in the past, and the study of it", ko: "역사",
      ex: "This book is filed under {{history}}.", ex_ko: "이 책은 역사로 분류되어 있어요.", pic: "📜" },
    { word: "window",    pos: "n.",   en: "an opening in a wall with glass in it that you can look through", ko: "창문",
      ex: "The book begins, \"Jack looked out his {{window}}.\"", ex_ko: "책은 \"잭은 창밖을 내다보았다\" 로 시작해요.", pic: "🪟" },
    { word: "Sunday",    pos: "n.",   en: "the day of the week that comes after Saturday", ko: "일요일",
      ex: "The title of this book is \"Civil War on {{Sunday}}.\"", ex_ko: "이 책의 제목은 '일요일의 남북전쟁' 이에요.", pic: "📅" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // looked out his window 만은 책의 첫 문장("Jack looked out his window.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie met [[a]] famous nurse and had [[an]] amazing trip.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. a famous nurse, an amazing trip.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I read {{a}} book about {{an}} old story." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack [[looked]] out his window, and the tree house [[transported]] them back in time.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. look → looked, transport → transported.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{opened}} the door and {{walked}} outside." },
      { name: "his / her / their", ko: "소유격",
        sent: "Jack looked out [[his]] window, and later the children rode in [[their]] magic tree house.",
        why_ko: "소유격은 명사 앞에 붙어 '누구의' 것인지 알려 줘요. he → his, she → her, they → their. 뒤에는 꼭 명사가 와요.",
        why: "Use his / her / their in front of a noun to show who it belongs to.",
        try: "She closed {{her}} book, and the boys packed {{their}} bags." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie met (a / an) famous nurse.", a: "a",
          why_ko: "famous 는 '페'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie had (a / an) amazing trip through time.", a: "an",
          why_ko: "amazing 은 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "Jack (look / looked) out his window.", a: "looked",
          why_ko: "책의 첫 문장이에요. 이미 일어난 일이니 과거형 looked 예요." },
        { q: "The magic tree house (transport / transported) them back in time.", a: "transported",
          why_ko: "지난 일이에요. transport 에 -ed 를 붙여 transported!" },
        { q: "Jack looked out (his / her) window.", a: "his",
          why_ko: "Jack 은 남자아이니까 his 예요. her 는 여자 한 사람의 것을 가리켜요." }
      ],
      fix: [
        { q: "Jack [[look]] out his window at the start of the book.", a: "looked",
          why_ko: "이미 지나간 장면이에요. 과거형 looked 로 고쳐요." },
        { q: "The children [[meet]] Clara Barton in the time of the Civil War.", a: "met",
          why_ko: "meet 은 불규칙 동사예요. 과거형은 meeted 가 아니라 met!" },
        { q: "Jack and Annie were transported by [[his]] magic tree house.", a: "their",
          why_ko: "나무 집은 두 아이의 것이에요. 여럿의 것이니 his 가 아니라 their." }
      ],
      write: [
        { ko: "잭은 창밖을 내다보았다.", cond: "look, out, his window", a: "Jack looked out his window.",
          why_ko: "'내다보았다' 는 과거형 looked. '창밖을' 은 out his window 로 씁니다." },
        { ko: "그들은 유명한 간호사를 만났다.", cond: "meet, famous nurse, 과거형", a: "They met a famous nurse.",
          why_ko: "meet 의 과거형은 met. famous 앞에는 자음 소리라서 a 를 씁니다." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "장서 요약", skill: "사실찾기", q: "To what time does the magic tree house take Jack and Annie?",
      frame: "It takes them to {{the time of the Civil War}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Who do Jack and Annie meet there, and what was her job?",
      frame: "They meet {{Clara Barton}}, and she was {{a famous nurse}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Civil War on Sunday.\" What does \"civil war\" mean?",
      frame: "A civil war is {{a war between groups inside one country}}." },
    { ref: "첫 문장", skill: "추론·예측", q: "The first sentence is \"Jack looked out his window.\" What do you think he saw out there?",
      frame: "I think Jack saw {{                    }}." },
    { ref: "책 전체", skill: "주제·요점", q: "In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If the tree house took you to any time in history, when would you go, and who would you want to meet?",
      frame: "I would go to {{                    }}, and I would meet {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Clara", "Annie and a nurse", "Two soldiers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"transports Jack and Annie\" 라고 두 이름을 그대로 적어요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel in this book?",
      a: ["By magic tree house", "By train", "By ship", "By horse"], c: 0,
      why_ko: "마법의 나무 집이에요. 주제어 목록에도 Tree houses 와 Time travel 과 Magic 이 나란히 있어요.",
      why: "The magic tree house. \"Tree houses,\" \"Magic\" and \"Time travel\" are all listed subjects." },
    { q: "To what time does the magic tree house take them?",
      a: ["To the time of the Civil War", "To the Middle Ages", "To ancient Egypt", "To the future"], c: 0,
      why_ko: "남북전쟁 시대예요. 소개글이 \"to the time of the Civil War\" 라고 말해요. 중세는 이 시리즈 2권이에요.",
      why: "To the time of the Civil War, exactly as the description says." },
    { q: "Who do Jack and Annie meet there?",
      a: ["Morgan", "Clara Barton", "Mary Pope Osborne", "A cowboy"], c: 1,
      why_ko: "클라라 바턴이에요. 요약이 \"the famous nurse, Clara Barton\" 이라 적고, 인물 목록에도 그 이름 하나만 있어요.",
      why: "Clara Barton. She is the only person named in our sources." },
    { q: "What was Clara Barton's job?",
      a: ["A nurse", "A teacher", "A writer", "A ship captain"], c: 0,
      why_ko: "간호사예요. 요약이 \"the famous nurse, Clara Barton\" 이라고 직업을 붙여 적어 두었어요.",
      why: "A nurse — the summary calls her \"the famous nurse, Clara Barton.\"" },
    { q: "Which word does the summary use for Clara Barton?",
      a: ["Famous", "Angry", "Young", "Sleepy"], c: 0,
      why_ko: "요약이 고른 낱말이 바로 famous 예요. 나머지 셋은 근거 어디에도 없어요.",
      why: "The summary's own word is \"famous.\" The other three appear nowhere in our sources." },
    { q: "What does a nurse do?",
      a: ["Takes care of people who are sick or hurt", "Drives a train", "Builds houses", "Teaches math"], c: 0,
      why_ko: "간호사는 아프거나 다친 사람을 돌보는 사람이에요. 전쟁 시대에 더 많이 필요했겠죠.",
      why: "A nurse takes care of people who are sick or hurt." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack looked out his window.\"", "\"Jack couldn't sleep.\"", "\"Annie ran down the road.\"", "\"The tree house was gone.\""], c: 0,
      why_ko: "첫 문장은 \"Jack looked out his window.\" 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line of the book." },
    { q: "In which country does this story take place?",
      a: ["The United States", "England", "Japan", "Egypt"], c: 0,
      why_ko: "미국이에요. 장소 목록에 United States 하나만 적혀 있고, 주제어에도 United States 가 있어요.",
      why: "The United States — the only place listed in our sources." },
    { q: "Which day of the week is in the title of this book?",
      a: ["Monday", "Friday", "Saturday", "Sunday"], c: 3,
      why_ko: "일요일이에요. 제목이 \"Civil War on Sunday\" 잖아요. 제목을 천천히 다시 읽어 보세요.",
      why: "Sunday. The title is \"Civil War on Sunday.\"" },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#10", "#15", "#21", "#30"], c: 2,
      why_ko: "21권이에요. 장서 목록 제목이 \"#21. Civil War on Sunday\" 이고 요약 끝에도 Book #21 이라고 적혀 있어요.",
      why: "Book #21 — the catalog title is \"#21. Civil War on Sunday.\"" },
    { q: "Who wrote this book?",
      a: ["Mary Pope Osborne", "Clara Barton", "Tedd Arnold", "Jack"], c: 0,
      why_ko: "메리 폽 오즈번이에요. 클라라 바턴은 책 속에서 만나는 사람이지 글쓴이가 아니에요.",
      why: "Mary Pope Osborne. Clara Barton is a person in the story, not the writer." },
    { q: "Which of these is listed as a subject of this book?",
      a: ["Time travel", "Space rockets", "Dinosaurs", "Cooking"], c: 0,
      why_ko: "Time travel 이에요. 주제어 목록에 History, Tree houses, Magic, Time travel 이 들어 있어요.",
      why: "Time travel is one of the listed subjects, along with History, Tree houses and Magic." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who the two children are", "Who they meet", "What time they go to", "How the story ends"], c: 3,
      why_ko: "결말이에요. 우리가 가진 글은 '클라라 바턴을 만난다' 에서 멈춰요. 그다음은 책을 읽어야 알 수 있어요.",
      why: "How the story ends. Our sources stop at \"where they meet Clara Barton.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(두 아이가 무엇을 원했는지·문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{the United States, in the time of the Civil War}}", time: "{{the time of the Civil War}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 하러 갔는지는 근거가 말하지 않는다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Window",
        given: "The book begins, \"Jack looked out his window.\"",
        frame: "At the start, Jack is {{at home}}, and nothing magic has happened {{yet}}." },
      { label: "The Tree House",
        given: "",
        frame: "The magic tree house transports Jack and Annie to {{the time of the Civil War}}, in {{the United States}}." },
      { label: "Clara Barton",
        given: "",
        frame: "There the children encounter {{Clara Barton}}, the famous {{nurse}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Civil War on Sunday",
    branches: [
      { label: "Jack & Annie",   ask: "The book opens with Jack looking out his window. What do you think a normal morning looks like for them?",
        deeper: "Why do you think a big adventure so often starts on an ordinary day at home?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "If a tree house could take you to any time, how would you decide where to go first?" },
      { label: "A Time of War",  ask: "A civil war is a war between groups inside one country. What do you think is hardest for ordinary families then?",
        deeper: "Why do you think a story for children would choose such a hard time to visit?" },
      { label: "Clara Barton",   ask: "Jack and Annie meet Clara Barton, a famous nurse. What does a nurse do all day?",
        deeper: "Why might a country need nurses most at exactly the time it is hardest to be one?" },
      { label: "Being Famous",   ask: "Our summary calls Clara Barton \"famous.\" What makes a person famous?",
        deeper: "Is being famous the same as being important? Say why you think so." },
      { label: "Me",             ask: "Have you ever taken care of someone who was sick or sad? What did you do?",
        deeper: "What is one small way you could help someone this week?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Care", "Courage", "History"],
    globalContext: "Orientation in space and time — 지난 시대의 사람들은 어떻게 살았고, 우리는 그들을 어떻게 기억하는가",
    statement: "A person who chooses to care for others can be remembered long after her own time has passed.",
    factual: [
      "Where and to what time does the magic tree house take Jack and Annie?",
      "Who do they encounter there, and what was her job?",
      "In which country does this story take place?"
    ],
    conceptual: [
      "Why do people need helpers most in the hardest times?",
      "What is the difference between being famous and being remembered?"
    ],
    debatable: [
      "Should we learn about hard times in history, or only about happy ones?",
      "Is the bravest person the one who fights, or the one who helps?"
    ],
    learnerProfile: ["Inquirer", "Caring", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "클라라 바턴을 만난다" 까지만 말한다. 두 아이가 무엇을 했는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie meet Clara Barton, a famous nurse, in the time of the Civil War. What makes a person worth remembering for a long time? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "네 생각을 한 문장으로 분명히 할 것 · State your idea in one clear sentence",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "이 책에서 한 가지를 넣을 것 · Use one thing from this book"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Remembered for Helping", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people are remembered for helping others.", lines: 2 },
      { part: "E — Evidence",    ask: "What does this book show? Write it.",
        eg: "In this book, Jack and Annie meet Clara Barton, a famous nurse.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows we still know her name because she took care of people.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say the famous are the strongest, but helpers are remembered too.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe kindness lasts longer than strength.", lines: 2 }
    ],
    expressions: [
      "I think / In my opinion, ...",
      "This is because ...",
      "In this book, ...",
      "This shows that ...",
      "Some people say ..., but I believe ...",
      "For this reason, ..."
    ],
    rubric: [
      { c: "A 분석",  d: "책 속 이야기를 근거로 들어 설명했나요? · Did I use the book as evidence?" },
      { c: "B 구성",  d: "의견 → 근거 → 반박 → 마무리 순서로 썼나요? · Point → Evidence → Counter → Link?" },
      { c: "C 표현",  d: "내 생각이 드러나는 문장을 썼나요? · Can the reader hear my own idea?" },
      { c: "D 언어",  d: "문장 끝, 대문자, 철자를 다시 봤나요? · Did I check periods, capitals, spelling?" }
    ]
  },

  // ── ⑦ 교사용 (수업 흐름 · 대사 · 북토킹 · 채점) ────────
  teaching: {
    goal: {
      en: "Students retell how the magic tree house transports Jack and Annie to the time of the Civil War in the United States, where they encounter the famous nurse Clara Barton, and then write their own opinion about what makes a person worth remembering.",
      ko: "마법의 나무 집이 잭과 애니를 미국의 남북전쟁 시대로 보내고, 두 아이가 유명한 간호사 클라라 바턴을 만나는 흐름을 말하고, 어떤 사람이 오래 기억되는가에 대해 자기 생각을 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 전쟁이 배경이지만 전투·부상은 다루지 않는다. 돌보는 사람 쪽으로 이야기를 돌린다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "When someone gets hurt or sick, who comes to help? Name the jobs you know.",
        do: "책을 펴기 전에 한다. '돕는 사람' 을 아이 입에서 먼저 꺼내야 간호사가 읽힌다. 서너 명만.",
        exp: "A doctor. / A nurse. / An ambulance driver.",
        stuck: "선생님이 먼저 한 문장 한다. \"A nurse takes care of people who are sick.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Civil War on Sunday.\" A civil war is a war inside one country. Why is that extra sad?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다. 전투 이야기로 새지 않게 30초 안에 끊는다.",
        exp: "Because the two sides live in the same country. / People who know each other.",
        stuck: "\"If two groups in ONE school argued, how would that feel?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "간호사 → nurse / 유명한 → famous / 마주치다 → encounter",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Who do they meet...' becomes 'They meet...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They meet Clara Barton, and she was a famous nurse.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack looked out his window.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie — Wanted·But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? Start with just that one box.\"" },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty today. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those four boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Clara Barton)", min: "",
        say: "Stop at Clara Barton. Don't just tell me she was a nurse — tell me what a nurse DOES all day.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 다친 장면을 묘사하지 않고 '돌보는 일' 로만 끌고 간다.",
        exp: "She takes care of people. She brings water and bandages. She stays calm.",
        stuck: "\"When you were sick, what did someone do for you? Say it in English.\"" },

      { stage: "Mind Map (Being Famous)", min: "",
        say: "Our summary says 'famous.' Is famous the same as important? Think before you answer.",
        do: "둘을 칠판 양쪽에 쓰고 아이들이 예를 올리게 한다. 1분.",
        exp: "Some famous people are not important. Some important people are not famous.",
        stuck: "\"Name someone important that most people do NOT know.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is the bravest person the one who fights, or the one who helps? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think the helper, because Clara Barton is the one we still remember.",
        stuck: "손을 들게 한다. \"Helper? Or fighter? Hands up now.\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say only winners are remembered, but we still know a nurse's name.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about a time when a country was at war with itself?", ko: "한 나라가 둘로 갈라져 싸운 시대에 대해 이미 아는 게 있니?" },
        { en: "Have you ever been taken care of by a nurse or a doctor? What was it like?", ko: "간호사나 의사에게 돌봄을 받아 본 적 있니? 어땠어?" },
        { en: "The title says Sunday. What do you usually do on a Sunday?", ko: "제목에 일요일이 들어 있어. 너는 일요일에 보통 뭘 하니?" }
      ],
      during: [
        { en: "Clara Barton is called 'famous.' What do you think she did to become famous?", ko: "클라라 바턴을 '유명한' 사람이라고 해. 무엇을 해서 유명해졌을까?" },
        { en: "Why do you think the tree house chose this time for Jack and Annie?", ko: "나무 집은 왜 하필 이 시대를 잭과 애니에게 골라 주었을까?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What did Jack and Annie actually do with Clara Barton?", ko: "잭과 애니는 클라라 바턴과 무엇을 했니?" },
        { en: "After reading, what one word would you use for Clara Barton?", ko: "다 읽고 나서, 클라라 바턴을 한 낱말로 말한다면 뭐라고 할래?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'Clara Barton' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
      { sheet: "전쟁 이야기",    point: "전투·부상은 수업에서 그리지 않는다. 아이가 물으면 '그 시대에 다친 사람이 많았고, 그래서 돌보는 사람이 필요했다' 한 문장으로 끊는다.", miss: "아이들이 무기와 전투로 빠져 20분을 쓴다." },
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
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장 · 장소 목록)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 남북전쟁 시대의 미국으로 가서 유명한 간호사 클라라 바턴을 만나는 이야기",
    text: "Jack looked out his [[glass opening|window]]. Then the [[wonder-working|magic]] tree house [[carried|transported]] Jack and Annie far back in time, to the time of the [[war inside one country|Civil War]]. The place was the United States, long ago. There the children [[ran into|encountered]] a woman whose name people still know today: Clara Barton, the [[well-known|famous]] [[care-giver|nurse]]. What did she do that day? What did Jack and Annie do beside her? Our summary stops right here. Open the book and find out."
  }
};
