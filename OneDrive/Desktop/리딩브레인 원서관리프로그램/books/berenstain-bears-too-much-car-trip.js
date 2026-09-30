// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.6)
// The Berenstain Bears and Too Much Car Trip — 우리는 이 책을 읽지 않았다.
// .superpowers/book/M3109.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 주제어 목록 · 장서 발문)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   엄마 곰과 아빠 곰은 Bear Country 의 볼거리(the wonders)를 둘러보고 싶어 한다 /
//   가족은 휴가로 차 여행을 떠나 Bear Country 를 더 본다 /
//   아이들(the cubs = Brother Bear 와 Sister Bear)은 그 여행이 달갑지 않고,
//   가족 차 뒷자리 말고 어디든 있고 싶어 한다 / 아이들은 지루할 거라고 확신한다 /
//   소개글은 "제 눈으로 Bear Country 의 이름난 곳들을 보고 나서도 같은 마음일까?" 라는
//   물음으로 끝난다.
// ① 결말을 모른다. 아이들이 여행을 좋아하게 되는지, 끝까지 지루해하는지 어느 출처도
//    말하지 않는다. summaryMap 의 The Ending 을 비워 두었고 어디에도 단정하지 않았다.
// ② Bear Country 의 "이름난 곳(the famous sights)" 이 무엇인지 한 글자도 나오지 않는다.
//    무엇을 보러 가는지는 아이가 책에서 찾도록 물음으로만 두었다.
// ③ 같은 시리즈 다른 책에서 아는 것(나무집·이웃·학교 등)은 이 책의 근거가 아니라 쓰지 않았다.
// ④ 오픈라이브러리에 이 책의 첫 문장이 비어 있다. 첫 문장을 묻는 문항·보기·낭독 줄을 모두 뺐다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3109",
  slug: "berenstain-bears-too-much-car-trip",
  title: "The Berenstain Bears and Too Much Car Trip",
  author: "Stan and Jan Berenstain",
  series: "The Berenstain Bears",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 in the Dark(AR 3.8)가 다독 3단계라 그에 맞췄다.
  level: { ar: "3.6", lexile: "570L", rb: "다독 3단계" },
  cover: "https://covers.openlibrary.org/b/id/30279-M.jpg",
  awards: [],

  evidence: {
    by: "근거 파일 .superpowers/book/M3109.json 에서 뽑았다. 학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·주제어 목록·장서 발문을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 M3109 요약 + 오픈라이브러리 /works/OL15108059W (소개글 · 주제어 Bears/Automobile travel/Family life/Berenstain Bears (Fictional characters)/Families · 2006년 · 첫 문장 기록 없음) + 장서 발문 3개",
    characters: ["Mama Bear", "Papa Bear", "Brother Bear", "Sister Bear"],
    beats: [
      "Mama and Papa Bear are eager to explore the wonders of Bear Country, so the family goes on a car trip for vacation to see more of it",
      "going on that car trip was not what Brother and Sister Bear had in mind — the cubs would rather be anywhere but the backseat of the family car",
      "the cubs are sure that they will be bored, and the question left open is whether they will feel the same once they see the famous sights of Bear Country with their own eyes"
    ],
    ending: "근거에 결말이 없다. 소개글이 물음표로 끝난다 — \"but will they feel the same once they see the famous sights of Bear Country with their own eyes?\" 아이들이 끝내 차 여행을 좋아하게 되는지, 지루한 채로 끝나는지, 무엇을 보았는지 어느 출처도 말하지 않는다. 그래서 비워 둔다. \"결국 즐거워졌다\" 같은 마무리는 한 군데도 쓰지 않았다",
    source_gap: "우리가 모르는 것을 번호를 붙여 또렷이 적어 둔다. ① 끝을 모른다 — 소개글이 물음표로 끝나 아이들이 끝내 차 여행을 좋아하게 되는지 어느 출처도 말하지 않는다. ② Bear Country 의 이름난 곳(the famous sights)이 무엇인지 한 곳도 적혀 있지 않다. ③ 얼마나 먼 길인지, 며칠이 걸리는지 모른다. ④ 첫 문장이 없다 — 오픈라이브러리 기록에 first 가 비어 있다. ⑤ 아기 곰들이 차 안에서 무엇을 하는지, 무엇 때문에 지루해하는지 모른다",
    checked: "장서 요약(\"eager to explore the wonders of Bear Country\", \"the cubs would rather be anywhere but the backseat of the family car\")과 소개글(\"a car trip for vacation to see more of Bear Country\", \"was not what Brother and Sister Bear had in mind\", \"sure that they will be bored\", \"the famous sights of Bear Country\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글이 the cubs 를 Brother and Sister Bear 로 풀어 주어 둘을 같은 것으로 보았다. 주제어 Automobile travel/Family life/Families 가 같은 것을 가리켜 한 번 더 받쳐 주었다. Bear Country 의 이름난 곳이 무엇인지, 얼마나 먼 길인지, 며칠이 걸리는지는 어느 출처도 말하지 않아 학습지 어디에도 쓰지 않았다. 같은 시리즈 다른 책에서 아는 이름과 설정도 전부 들어냈다 (2026-09-30)"
  },

  // 낭독 영상 — 근거 파일 M3109.json 의 videos 세 편을 제목으로 하나하나 확인했다 (2026-09-30).
  //   ① "Too Much Car Trip / Berenstain Bears (read aloud)" — 이 책 · 낭독 ✔
  //   ② "Berenstain Bears: Too Much Car Trip | Read Aloud Book for Kids | Funny" — 이 책 · 낭독 ✔
  //   ③ "THE BERENSTAIN BEARS AND TOO MUCH CAR TRIP | READ ALOUDS FOR KIDS" — 이 책 · 낭독 ✔
  // 다른 책이 섞여 들어온 것은 없었다. 세 편 모두 남겼다.
  // 채널명·조회수·길이는 근거 파일에 없어서 적지 않았다. 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"The Berenstain Bears and Too Much Car Trip\" read aloud",
    searchUrl: "https://www.youtube.com/watch?v=dsUHXEiUVgY",
    videos: [
      { url: "https://www.youtube.com/watch?v=dsUHXEiUVgY",
        title: "Too Much Car Trip / Berenstain Bears (read aloud)" },
      { url: "https://www.youtube.com/watch?v=RRSpv6O3q3s",
        title: "Berenstain Bears: Too Much Car Trip | Read Aloud Book for Kids | Funny" },
      { url: "https://www.youtube.com/watch?v=vZvs-ePBv_w",
        title: "THE BERENSTAIN BEARS AND TOO MUCH CAR TRIP | READ ALOUDS FOR KIDS" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·소개글·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  // Bear Country 의 이름난 곳이 무엇인지는 근거가 말하지 않아 예문에도 쓰지 않았다.
  vocabulary: [
    { word: "trip",      pos: "n.",   en: "a journey to a place and back again", ko: "여행, 나들이",
      ex: "The bear family goes on a car {{trip}} for vacation.", ex_ko: "곰 가족은 휴가로 차 여행을 떠나요.", pic: "🧳" },
    { word: "car",       pos: "n.",   en: "a vehicle with four wheels that a family drives", ko: "자동차",
      ex: "The four bears travel in the family {{car}}.", ex_ko: "네 마리 곰은 가족 자동차를 타고 다녀요.", pic: "🚗" },
    { word: "backseat",  pos: "n.",   en: "the seat behind the driver in a car", ko: "(차의) 뒷자리",
      ex: "The cubs would rather be anywhere but the {{backseat}}.", ex_ko: "아이들은 뒷자리 말고 어디든 있고 싶어 해요.", pic: "💺" },
    { word: "vacation",  pos: "n.",   en: "a time when you stop work or school and go somewhere for fun", ko: "휴가, 방학",
      ex: "They go on a car trip for {{vacation}}.", ex_ko: "그들은 휴가로 차 여행을 가요.", pic: "🏖️" },
    { word: "eager",     pos: "adj.", en: "wanting very much to do something", ko: "몹시 하고 싶어 하는",
      ex: "Mama and Papa Bear are {{eager}} to explore Bear Country.", ex_ko: "엄마 곰과 아빠 곰은 베어 컨트리를 둘러보고 싶어 해요.", pic: "✨" },
    { word: "explore",   pos: "v.",   en: "to travel around a place to find out what is there", ko: "탐험하다, 둘러보다",
      ex: "Papa Bear wants to {{explore}} the wonders of Bear Country.", ex_ko: "아빠 곰은 베어 컨트리의 볼거리를 둘러보고 싶어 해요.", pic: "🧭" },
    { word: "wonder",    pos: "n.",   en: "something so beautiful or surprising that people go to see it", ko: "볼거리, 경이로운 것",
      ex: "The summary calls them the {{wonders}} of Bear Country.", ex_ko: "요약은 그것들을 베어 컨트리의 볼거리라고 불러요.", pic: "🌄" },
    { word: "sight",     pos: "n.",   en: "a place that visitors come to look at", ko: "명소, 볼거리",
      ex: "The cubs will see the famous {{sights}} with their own eyes.", ex_ko: "아이들은 이름난 곳들을 제 눈으로 보게 될 거예요.", pic: "👀" },
    { word: "famous",    pos: "adj.", en: "known by many people", ko: "이름난, 유명한",
      ex: "Bear Country has {{famous}} sights.", ex_ko: "베어 컨트리에는 이름난 곳들이 있어요.", pic: "⭐" },
    { word: "bored",     pos: "adj.", en: "tired and unhappy because nothing interesting is happening", ko: "지루한, 심심한",
      ex: "The cubs are sure that they will be {{bored}}.", ex_ko: "아이들은 자기들이 지루할 거라고 확신해요.", pic: "😑" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 오픈라이브러리에 첫 문장 기록이 없어, 첫 문장을 쓴 보기를 하나도 넣지 않았다.
  // 대신 근거 문장에 실제로 있는 짜임 넷으로만 세웠다.
  grammar: {
    points: [
      { name: "be + adjective", ko: "be동사 + 형용사",
        sent: "Mama and Papa Bear [[are eager]] to explore Bear Country, and the cubs [[are sure]] that they will be bored.",
        why_ko: "'~한 상태다'는 be동사 뒤에 형용사를 놓아요. are eager(몹시 하고 싶다), are sure(확신한다). 주어가 둘 이상이면 is 가 아니라 are!",
        why: "Use be + adjective to say how someone is: are eager, are sure. Plural subjects take \"are.\"",
        try: "I {{am}} eager to go, but my brother {{is}} sure it will be boring." },
      { name: "to + verb", ko: "to부정사 (이유·목적)",
        sent: "They go on a car trip [[to see]] more of Bear Country, and Papa is eager [[to explore]] its wonders.",
        why_ko: "'무엇을 하려고' 하는지는 to + 동사원형으로 붙여요. to see(보려고), to explore(둘러보려고). to 뒤에는 꼭 원형!",
        why: "Use to + base verb to say the purpose: to see, to explore. Never \"to sees.\"",
        try: "We took the car {{to visit}} my grandmother, and I packed a book {{to read}}." },
      { name: "would rather", ko: "~하는 편이 낫다 (더 하고 싶다)",
        sent: "The cubs [[would rather]] be anywhere but the backseat of the family car.",
        why_ko: "둘 중 어느 쪽이 더 좋은지 말할 때 would rather + 동사원형을 써요. would rather be = 차라리 ~에 있고 싶다. to 를 붙이지 않아요!",
        why: "would rather + base verb says which you prefer. No \"to\" after rather.",
        try: "I {{would rather}} walk than sit in a car all day." },
      { name: "Will + subject + verb?", ko: "will 의문문 (미래를 묻기)",
        sent: "[[Will they be]] bored? [[Will they feel]] the same once they see the famous sights?",
        why_ko: "앞으로 어떨지 물을 때는 Will 을 문장 맨 앞에 놓고 주어, 그 다음 동사원형이에요. Will they be...? / Will they feel...?",
        why: "To ask about the future, put Will first, then the subject, then the base verb.",
        try: "{{Will}} you {{be}} bored in the car? {{Will}} we {{see}} the famous sights today?" }
    ],
    find: "책에서 to + 동사원형이 들어간 문장을 두 개 찾아 쓰세요. · Find two sentences with \"to\" + a base verb.",
    exam: {
      choose: [
        { q: "Mama and Papa Bear (is / are) eager to explore Bear Country.", a: "are",
          why_ko: "Mama and Papa 는 두 분, 복수예요. 복수 주어에는 are!" },
        { q: "The cubs are sure that they (will be / will are) bored.", a: "will be",
          why_ko: "will 뒤에는 동사원형이 와요. are 가 아니라 be 예요." },
        { q: "The family goes on a car trip (to see / seeing) more of Bear Country.", a: "to see",
          why_ko: "'보려고'라는 이유·목적은 to + 동사원형으로 적어요." },
        { q: "The cubs would rather (be / to be) anywhere but the backseat.", a: "be",
          why_ko: "would rather 뒤에는 to 없이 동사원형만 와요." },
        { q: "(Will / Do) they feel the same once they see the famous sights?", a: "Will",
          why_ko: "앞으로 어떨지 묻는 말이에요. 미래를 물을 때는 Will 로 시작해요." }
      ],
      fix: [
        { q: "Papa Bear is eager [[explore]] the wonders of Bear Country.", a: "to explore",
          why_ko: "eager 뒤에는 to + 동사원형이 와요. explore 앞에 to 를 붙여요." },
        { q: "The cubs [[is]] sure that they will be bored.", a: "are",
          why_ko: "the cubs 는 두 마리, 복수예요. is 가 아니라 are." },
        { q: "They would rather [[to be]] anywhere but the backseat.", a: "be",
          why_ko: "would rather 뒤에 to 는 넣지 않아요. 동사원형 be 만 써요." }
      ],
      write: [
        { ko: "아이들은 차 뒷자리에 있느니 차라리 다른 데 있고 싶어 한다.", cond: "would rather, backseat",
          a: "The cubs would rather be anywhere but the backseat.",
          why_ko: "would rather + 동사원형 be. rather 뒤에 to 를 붙이지 않아요." },
        { ko: "가족은 베어 컨트리를 더 보려고 차 여행을 간다.", cond: "to see, car trip",
          a: "The family goes on a car trip to see more of Bear Country.",
          why_ko: "'보려고'는 to see. 목적은 to + 동사원형으로 붙여요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who is eager to explore the wonders of Bear Country?",
      frame: "{{Mama and Papa Bear}} are eager to explore them." },
    { ref: "책 소개글", skill: "사실찾기", q: "Who are \"the cubs\" in this book, and how do they travel?",
      frame: "They are {{Brother and Sister Bear}}, and they travel in {{the backseat of the family car}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "Why is the bear family going on this car trip?",
      frame: "They are going on a trip for {{vacation}}, to see more of {{Bear Country}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "How are Brother and Sister Bear sure they will feel on the trip?",
      frame: "They are sure that they will be {{bored}}." },
    { ref: "책 제목", skill: "어휘", q: "The title says \"Too Much Car Trip.\" Whose feeling do you think those words show — the parents' or the cubs'? Say why.",
      frame: "I think they show {{                    }}, because {{                    }}." },
    { ref: "책 소개글", skill: "추론·예측", q: "Our description ends with a question: will the cubs feel the same once they see the famous sights with their own eyes? What do you think, and what makes you think so?",
      frame: "I think they will {{                    }}, because {{                    }}." },
    { ref: "장서 질문", skill: "평가·적용", q: "What would make a long car trip fun for you?",
      frame: "A long car trip would be fun for me if {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 결말을 묻는 문항은 없다. 근거가 결말을 말하지 않기 때문이다.
  quiz: [
    { q: "Who is eager to explore the wonders of Bear Country?",
      a: ["Mama and Papa Bear", "Brother and Sister Bear", "Only Papa Bear", "Only the cubs"], c: 0,
      why_ko: "엄마 곰과 아빠 곰이에요. 장서 요약이 \"Mama and Papa Bear are eager to explore the wonders of Bear Country\" 라고 그대로 말해요.",
      why: "Mama and Papa Bear — the catalog summary says so directly." },
    { q: "Where would the cubs rather NOT be?",
      a: ["In the backseat of the family car", "At school", "In their own room", "On a boat"], c: 0,
      why_ko: "가족 차의 뒷자리예요. 요약이 \"would rather be anywhere but the backseat of the family car\" 라고 적고 있어요.",
      why: "The backseat of the family car — \"anywhere but the backseat\" is the summary's own phrase." },
    { q: "Who are \"the cubs\" in this book?",
      a: ["Brother and Sister Bear", "Mama and Papa Bear", "Two bears from another family", "Three young bears"], c: 0,
      why_ko: "소개글이 the cubs 를 Brother and Sister Bear 로 풀어 줘요. 두 마리예요.",
      why: "The description names them: Brother and Sister Bear." },
    { q: "Why is the bear family going on a car trip?",
      a: ["For vacation, to see more of Bear Country", "To move to a new house", "To take the cubs to school", "To visit a doctor"], c: 0,
      why_ko: "소개글이 \"a car trip for vacation to see more of Bear Country\" 라고 말해요. 이사도 등교도 아니에요.",
      why: "\"A car trip for vacation to see more of Bear Country\" — straight from the description." },
    { q: "How does the bear family travel on this trip?",
      a: ["By car", "By train", "By plane", "By boat"], c: 0,
      why_ko: "자동차예요. 제목에도 car trip 이 있고, 주제어 목록에도 Automobile travel 이 있어요.",
      why: "By car. The title says \"Car Trip\" and a listed subject is \"Automobile travel.\"" },
    { q: "How are Brother and Sister Bear sure they will feel on the trip?",
      a: ["Bored", "Excited", "Hungry", "Frightened"], c: 0,
      why_ko: "소개글이 \"The cubs are sure that they will be bored\" 라고 해요. 신나거나 무서워하는 게 아니에요.",
      why: "Bored — \"The cubs are sure that they will be bored.\"" },
    { q: "Was going on this car trip what Brother and Sister Bear had in mind?",
      a: ["No, it was not what they had in mind", "Yes, they asked for it", "Yes, it was Sister's idea", "They never found out about it"], c: 0,
      why_ko: "아니에요. 소개글이 \"was not what Brother and Sister Bear had in mind\" 라고 분명히 적고 있어요.",
      why: "No — the description says it \"was not what Brother and Sister Bear had in mind.\"" },
    { q: "What will the cubs see in Bear Country?",
      a: ["Its famous sights", "A famous singer", "A school play", "A football game"], c: 0,
      why_ko: "베어 컨트리의 이름난 곳들(the famous sights)이에요. 소개글의 낱말 그대로예요.",
      why: "The famous sights of Bear Country — the description's own words." },
    { q: "What does our information tell us about the famous sights of Bear Country?",
      a: ["That the cubs will see them with their own eyes", "It names every one of them", "It says they are in another country", "It says the trip there takes three days"], c: 0,
      why_ko: "소개글은 \"see the famous sights of Bear Country with their own eyes\" 까지만 말해요. 그 명소가 무엇인지, 얼마나 먼지는 한 글자도 없어요. 책에서 찾아야 해요.",
      why: "Only that the cubs will see them with their own eyes. What those sights are is never said." },
    { q: "Which word does the summary use for how Mama and Papa feel about exploring Bear Country?",
      a: ["Eager", "Tired", "Angry", "Afraid"], c: 0,
      why_ko: "요약이 고른 낱말이 바로 eager 예요. 나머지 셋은 근거 어디에도 없어요.",
      why: "\"Eager.\" The other three appear nowhere in our sources." },
    { q: "What does the word \"backseat\" mean?",
      a: ["The seat behind the driver in a car", "The back door of a house", "A seat at the back of a classroom", "The trunk of a car"], c: 0,
      why_ko: "backseat 은 운전석 뒤쪽 자리예요. 아이들이 앉는 그 자리 말이에요.",
      why: "The seat behind the driver — where the cubs sit." },
    { q: "What does \"bored\" mean?",
      a: ["Tired and unhappy because nothing interesting is happening", "Very excited", "Very hungry", "Very sleepy after a long walk"], c: 0,
      why_ko: "bored 는 재미있는 일이 없어 지루하고 심심한 마음이에요. 신나는 것과 반대예요.",
      why: "Bored means nothing interesting is happening, so you feel flat — the opposite of excited." },
    { q: "Which of these is a listed subject for this book?",
      a: ["Automobile travel", "Space travel", "Pirates", "Dinosaurs"], c: 0,
      why_ko: "주제어 목록에 Automobile travel 과 Family life 가 있어요. 우주도 해적도 공룡도 없어요.",
      why: "\"Automobile travel\" is a listed subject; the other three are not." },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Who is eager to explore Bear Country", "How the cubs feel about the trip at the start", "Whether the cubs still feel bored at the end", "Who the cubs are"], c: 2,
      why_ko: "끝에 가서도 여전히 지루해하는지예요. 우리가 가진 소개글은 \"제 눈으로 이름난 곳들을 보고 나서도 같은 마음일까?\" 라는 물음으로 끝나요. 답은 책을 읽어야 알아요.",
      why: "Whether the cubs still feel bored at the end. Our description stops at that very question." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(막는 것·그래서·그다음·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Bear Country — in the family car}}", time: "{{vacation}}" },
    swbst: [
      { k: "Somebody", v: "{{Mama and Papa Bear}}" },
      { k: "Wanted",   v: "{{to explore the wonders of Bear Country}}" },
      { k: "But",      v: "{{the cubs would rather be anywhere but the backseat}}" },
      { k: "So",       v: "{{                    }}" },   // 그래서 무슨 일이 벌어지는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Plan",
        given: "Mama and Papa Bear are eager to explore the wonders of Bear Country.",
        frame: "The family goes on a {{car}} trip for {{vacation}}, to see more of {{Bear Country}}." },
      { label: "The Backseat",
        given: "",
        frame: "But the trip is not what {{Brother and Sister Bear}} had in mind. They would rather be anywhere but {{the backseat}}." },
      { label: "The Famous Sights",
        given: "",
        frame: "The cubs are sure that they will be {{bored}}. Then they see the {{famous sights}} of Bear Country with their own eyes." },
      { label: "The Ending",
        given: "우리 자료는 물음표에서 끝난다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Too Much Car Trip",
    branches: [
      { label: "Mama & Papa",   ask: "The summary says Mama and Papa are eager. What are they eager to do?",
        deeper: "Why do grown-ups so often want to show children a place they love?" },
      { label: "The Cubs",      ask: "Brother and Sister say the trip is not what they had in mind. What do you think they had in mind instead?",
        deeper: "Why is it hard to look forward to a plan that someone else made for you?" },
      { label: "The Backseat",  ask: "They would rather be anywhere but the backseat. What is hard about sitting in one seat for a long time?",
        deeper: "Is the backseat itself the problem, or is it something else? Say what you think." },
      { label: "Bored",         ask: "The cubs are sure they will be bored. How can you be sure of something before it happens?",
        deeper: "Have you ever been sure something would be boring, and then been wrong?" },
      { label: "Famous Sights", ask: "Our description does not tell us what the famous sights of Bear Country are. What do you expect them to be?",
        deeper: "Why does the description say \"with their own eyes\" instead of just \"see\"?" },
      { label: "Me",            ask: "Have you ever been on a long car trip? What was it like?",
        deeper: "What would make a long car trip fun for you, and why would that work?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Perspective",
    relatedConcepts: ["Journey", "Expectation", "Family"],
    globalContext: "Orientation in space and time — 같은 여행이 사람마다 왜 다르게 느껴지는가",
    statement: "The same trip can look like a wonder to one person and like too much to another.",
    factual: [
      "Who is eager to explore Bear Country, and who is not?",
      "Why is the family going on this car trip?",
      "How are the cubs sure they will feel in the backseat?"
    ],
    conceptual: [
      "Why can two people in the same car feel completely different about the same trip?",
      "What is the difference between being sure of something and knowing it?"
    ],
    debatable: [
      "Should parents plan a family trip, or should children help choose where to go?",
      "Is seeing a famous place with your own eyes better than seeing a picture of it?"
    ],
    learnerProfile: ["Open-minded", "Thinker", "Communicator"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 물음표에서 끝난다. 아이들이 끝내 여행을 좋아하게 되었는지 적혀 있지 않으므로,
    // 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Brother and Sister Bear are sure a long car trip will be boring. Do you think a long car trip can be fun? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "곰 가족 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Too Much Car Trip?", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think a long car trip can be fun.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in the bears' story? Write it.",
        eg: "In the book, the cubs are sure they will be bored in the backseat.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they decided how the trip would feel before it even started.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say sitting still for hours is boring, but you can watch the road.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a car trip is what you make of it.", lines: 2 }
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
      en: "Students retell how Mama and Papa Bear are eager to explore Bear Country while Brother and Sister would rather be anywhere but the backseat, and how the cubs are sure they will be bored — then take a side on whether a long car trip can be fun.",
      ko: "엄마 곰과 아빠 곰은 베어 컨트리를 둘러보고 싶어 하는데 아이들은 차 뒷자리 말고 어디든 있고 싶어 하고, 아이들이 지루할 거라고 확신하는 흐름을 말하고, 긴 차 여행이 재미있을 수 있는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 결말은 우리도 모른다 — 선생님도 단정해 말하지 않는다. 아이가 책에서 가져오게 한다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever been on a long car trip? How long were you in the car?",
        do: "책을 펴기 전에 한다. 장서 발문 그대로다. 서너 명만 받는다.",
        exp: "Two hours to my grandmother's. / All day to the beach.",
        stuck: "선생님이 먼저 한 문장 한다. \"Last summer I sat in a car for five hours.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Too Much Car Trip.\" Who do you think says \"too much\" — the parents, or the children?",
        do: "제목 세 낱말만 푼다. 줄거리는 말하지 않는다. 답을 알려 주지 않고 넘어간다.",
        exp: "The children. / The kids, because they don't want to go.",
        stuck: "표지를 가리킨다. \"Look at the faces. Who looks happy here?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "뒷자리 → backseat / 지루한 → bored / 몹시 하고 싶어 하는 → eager",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Grammar", min: "20~30분",
        say: "Two words together: would rather. It means 'I'd pick this one.' And after rather — no 'to.' Just the plain verb.",
        do: "칠판에 would rather be 만 크게 쓴다. to 를 쓰려는 아이가 반드시 나온다.",
        exp: "I would rather walk. / I would rather stay home.",
        stuck: "\"Pizza or rice? Say it: I would rather eat...\"" },

      { stage: "Grammar", min: "",
        say: "The cubs are SURE they will be bored. Sure about something that hasn't happened yet. Say it with me: they will be bored.",
        do: "will 뒤에 be 가 오는 자리를 손가락으로 짚어 준다. will are 라고 쓰는 실수가 여기서 나온다.",
        exp: "They will be bored.",
        stuck: "\"Will they ARE bored? Does that sound right? Try again.\"" },

      { stage: "Comprehension", min: "30~45분",
        say: "Turn the question into the first half of your answer. 'Who is eager...' becomes 'Mama and Papa Bear are eager...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "Mama and Papa Bear are eager to explore the wonders of Bear Country.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our description ends with a question mark. It asks whether the cubs will still feel the same. It never answers. So I cannot tell you the ending.",
        do: "이 수업의 태도가 여기서 정해진다. 모르는 것을 모른다고 그대로 말한다.",
        exp: "(아이들이 답을 궁금해한다 — 그 상태로 책으로 보낸다)",
        stuck: "\"Do you want to know? Then read it tonight and tell me tomorrow.\"" },

      { stage: "Summary Map", min: "45~55분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Mama and Papa Bear / Wanted: to explore Bear Country / But: 아이들은 뒷자리가 싫다",
        stuck: "\"Who wants to go? Who doesn't?\" 첫 세 칸만." },

      { stage: "Summary Map", min: "",
        say: "So and Then are empty, and so is The Ending. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those boxes tomorrow.\"" },

      { stage: "Mind Map", min: "55~65분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Bored)", min: "",
        say: "Stop at Bored. The cubs are SURE before the trip starts. How can you be sure of something that hasn't happened?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "They guessed. / They decided it first. / They thought it would be like last time.",
        stuck: "\"Have you ever been sure something would be boring — and then it wasn't?\"" },

      { stage: "IB Inquiry", min: "65~72분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should parents plan the family trip, or should children help choose? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think children should help, because they are in the car too.",
        stuck: "손을 들게 한다. \"Parents choose? Or everyone chooses?\"" },

      { stage: "Writing", min: "72~85분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say sitting for hours is boring, but you can look out the window.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "85~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Have you ever been on a long car trip?", ko: "긴 차 여행을 해 본 적 있니?" },
        { en: "Who decides where your family goes on vacation?", ko: "너희 가족은 휴가 때 어디 갈지 누가 정하니?" },
        { en: "The title says \"Too Much Car Trip.\" What do you think that means?", ko: "제목이 '너무 긴 차 여행'이라고 해. 무슨 뜻일 것 같니?" }
      ],
      during: [
        { en: "How did the cubs feel about the car trip?", ko: "아이들은 차 여행을 어떻게 생각했니?" },
        { en: "What do you think the famous sights of Bear Country look like?", ko: "베어 컨트리의 이름난 곳들은 어떻게 생겼을 것 같니?" }
      ],
      after: [
        { en: "How does the story end? Our summary stopped at a question — tell me the answer.", ko: "이야기는 어떻게 끝났니? 우리 자료는 물음에서 멈췄어. 답을 말해 줘." },
        { en: "What famous sights did the family actually see?", ko: "가족은 실제로 어떤 이름난 곳들을 보았니?" },
        { en: "What would make a long car trip fun for you?", ko: "너라면 긴 차 여행이 어떻게 하면 재미있을까?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Grammar",       point: "would rather 뒤에 to 를 붙이는 실수를 미리 짚는다.", miss: "would rather to be 라고 쓴다. 칠판에 틀린 문장을 한 번 써서 지운다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "So·Then·The Ending 은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 '결국 재미있어졌다'고 대신 채워 준다. 우리는 결말을 모른다." },
      { sheet: "Mind Map",      point: "'Bored' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거(장서 요약 · 출판사 소개글)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장 기록이 없어 책의 첫 문장으로 시작하지 않았다.
  // 근거가 결말을 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "엄마 곰과 아빠 곰은 베어 컨트리를 둘러보고 싶어 하는데, 뒷자리에 앉은 아이들은 지루할 거라고 확신하는 이야기",
    text: "Mama and Papa Bear were [[excited|eager]] to [[look around|explore]] the [[amazing places|wonders]] of Bear Country. So the family went on a car [[journey|trip]] for [[holiday|vacation]], to see more of it. But that was not what Brother and Sister Bear had in mind. The cubs would rather be anywhere but the [[back of the car|backseat]] of the family car. They were [[certain|sure]] that they would be [[fed up|bored]]. Then came the [[well-known places|famous sights]] of Bear Country, right in front of their own eyes. Did the cubs still feel the same? Open the book and find out."
  }
};
