// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.5)
// A Big Day for Baseball (Magic Tree House #29) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3933.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 주제어/인물/지명 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 도서관 사서 모건이 둘에게 '전문가로 만들어 주는' 마법 야구 모자를 준다 /
//   그 모자를 쓰고 브루클린의 특별한 경기에 가기만 하면 된다 / 마법 나무집이 둘을
//   1947년 뉴욕 브루클린으로 보낸다 / 가 보니 둘은 선수가 아니라 배트보이다 /
//   그 경기는 브루클린 다저스에서 치르는 재키 로빈슨의 첫 경기이고, 상대는 보스턴 브레이브스다 /
//   모건이 무엇을 배우게 하려는지 알아낼 시간은 9이닝뿐이다.
// 모건이 가르치려 한 것이 무엇인지, 그 경기가 왜 특별한지, 결말이 어떤지는 근거가
// 말하지 않는다. 소개글이 "What exactly does Morgan want them to learn? And what's so
// special about this game?" 라는 물음 자체에서 끊기기 때문이다. 그래서 비워 두었다.
// 야구 이야기지만 근거에 없는 선수 이름·기록·구단·연도는 한 곳에도 쓰지 않았다.
// 근거가 말하는 실제 인물은 재키 로빈슨 하나, 구단은 브루클린 다저스와 보스턴 브레이브스
// 둘, 연도는 1947년(이야기)과 2017년(출간)뿐이다.
// 오픈라이브러리 소개글에는 영어 소개글 뒤에 독일어 글이 이어 붙어 있는데, 그 독일어 글은
// 이 한 권이 아니라 시리즈 전체를 광고하는 글이고 주인공 이름도 다르게(Anne · Philipp)
// 적혀 있다. 그래서 독일어 부분에서는 한 줄도 가져오지 않았다. (evidence.checked 참고)
// 이 책은 오픈라이브러리에 첫 문장(first)이 비어 있다. 그래서 첫 문장을 묻는 문항도,
// 첫 문장을 쓰는 문법 보기도, 낭독 시작 줄도 넣지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3933",
  slug: "magic-tree-house-a-big-day-for-baseball",
  title: "A Big Day for Baseball",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #29",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.5", lexile: "400L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/8447833-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글(영어 부분만)·주제어·인물·지명 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3933 요약 + 오픈라이브러리 /works/OL19336251W (영어 소개글 · 주제어 Magic/Brooklyn Dodgers (Baseball team)/Tree houses/Baseball/History/African Americans/Time travel · 인물 Jackie Robinson (1919-1972) · 지명 New York · 96쪽 · 2017년). 첫 문장 칸은 비어 있었다",
    characters: ["Jack", "Annie", "Morgan the librarian", "Jackie Robinson"],
    beats: [
      "Jack and Annie aren't great baseball players yet, so Morgan the librarian gives them magical baseball caps that will make them experts; they just need to wear the caps to a special ballgame in Brooklyn, New York",
      "the magic tree house whisks them back to 1947 Brooklyn, New York",
      "when they arrive they find out that they will be batboys in the game, not ballplayers, at Jackie Robinson's first game with the Brooklyn Dodgers against the Boston Braves, and they only have nine innings to find out what Morgan wants them to learn"
    ],
    ending: "근거에 결말이 없다. 소개글은 \"What exactly does Morgan want them to learn? And what's so special about this game? They only have nine innings to find out!\" 라는 물음에서 그대로 끊기고, 장서 요약도 두 아이가 배트보이 노릇을 한다는 데서 멈춘다. 모건이 무엇을 가르치려 했는지, 그 경기가 왜 특별한지, 마법 모자가 정말 쓸모가 있었는지, 경기가 어떻게 끝나는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "소개글이 믿을 만한지 먼저 읽고 판단했다. 영어 부분은 이 한 권만을 말하고(모건의 마법 모자 · 브루클린 · 1947년 · 배트보이 · 9이닝), 철자가 틀린 곳도 개인 감상도 없으며, 장서 요약(\"1947 Brooklyn\", \"pretend to be batboys\", \"Jackie Robinson's first game with the Brooklyn Dodgers, against the Boston Braves\")과 한 줄씩 맞춰 보아도 어긋나지 않아 그대로 썼다. 다만 소개글 뒤에 붙은 독일어 글은 이 책이 아니라 시리즈 전체 광고글이고(주인공을 Anne · Philipp 로 적고 \"10 Millionen verkaufte Bücher\" 같은 판매 문구가 들어 있다) 이 권의 내용을 하나도 말하지 않아 한 줄도 가져오지 않았다. 주제어 African Americans 와 History 가 목록에 있으나, 이 경기가 역사에서 왜 특별한지는 어느 출처도 설명하지 않아 학습지 어디에도 그 설명을 쓰지 않고 아이가 책에서 찾도록 물음으로만 남겼다. 인물 목록의 재키 로빈슨 생몰년(1919-1972)은 책의 내용이 아니라 도서관 표목이라 쓰지 않았다. 근거에 없는 선수 이름·기록·구단은 오답 보기에도 넣지 않았다. 오픈라이브러리 첫 문장 칸이 비어 있어 첫 문장을 묻는 문항·문법 보기·낭독 시작 줄을 모두 뺐다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 세 편 모두 제목을 하나하나 확인해 이 책(#29 A Big Day for Baseball)이 맞는 것만 남겼다.
  // 맨 앞은 출판사(Random House Kids) 채널의 스토리타임으로, 제목에 장 번호가 없어 통본에 가장 가깝다.
  // 뒤의 두 편은 제목이 스스로 밝히듯 앞 장만 읽은 것이다(Chapters 1-3 · Chapters 1 2).
  // 장서 자료에 있던 또 한 편(iOmCP6P2glM)도 같은 낭독자의 다른 장 조각이라 넣지 않았다.
  shadowing: {
    query: "\"A Big Day for Baseball\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/yLIjdX3HpvU",
    videos: [
      { url: "https://youtu.be/yLIjdX3HpvU", title: "Magic Tree House Storytime: A Big Day for Baseball",
        channel: "Random House Kids", views: "2,190", length: "18:32" },
      { url: "https://youtu.be/C35nLjkQSGI", title: "Mr. Carroll Reading Magic Tree House #29 A Big Day For Baseball Chapters 1-3",
        channel: "Oran Carroll", views: "1,512", length: "20:23" },
      { url: "https://youtu.be/kiOQE5iPhOs", title: "Magic Tree House #29 - A Big Day For Baseball Chapters 1 2",
        channel: "Mrs. Bragg's First Grade Channel", views: "3,047", length: "12:11" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·출판사 소개글·주제어 목록에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "baseball",   pos: "n.",   en: "a game played with a bat and a ball by two teams of nine players", ko: "야구",
      ex: "Jack and Annie aren't great {{baseball}} players yet.", ex_ko: "잭과 애니는 아직 야구를 잘하지 못해요.", pic: "⚾" },
    { word: "batboy",     pos: "n.",   en: "a boy who carries and looks after the bats for a baseball team", ko: "배트보이",
      ex: "They find out that they will be {{batboys}} in the game.", ex_ko: "두 아이는 경기에서 배트보이가 된다는 걸 알게 돼요.", pic: "🧢" },
    { word: "ballplayer", pos: "n.",   en: "a person who plays on a baseball team", ko: "야구 선수",
      ex: "They are batboys, not {{ballplayers}}.", ex_ko: "둘은 선수가 아니라 배트보이예요.", pic: "🏃" },
    { word: "expert",     pos: "n.",   en: "a person who is very good at something and knows a lot about it", ko: "전문가, 달인",
      ex: "The magic caps will make them {{experts}}.", ex_ko: "마법 모자는 둘을 달인으로 만들어 줄 거예요.", pic: "🥇" },
    { word: "inning",     pos: "n.",   en: "one of the nine parts that a baseball game is divided into", ko: "이닝, 회",
      ex: "They only have nine {{innings}} to find out.", ex_ko: "알아낼 시간은 9이닝뿐이에요.", pic: "🔢" },
    { word: "cap",        pos: "n.",   en: "a soft hat with a curved part at the front", ko: "(챙 달린) 모자",
      ex: "Morgan gives them magical baseball {{caps}}.", ex_ko: "모건은 둘에게 마법 야구 모자를 줘요.", pic: "🧢" },
    { word: "librarian",  pos: "n.",   en: "a person who works in a library and takes care of the books", ko: "사서, 도서관 선생님",
      ex: "Morgan the {{librarian}} gives them the caps.", ex_ko: "사서 모건이 둘에게 모자를 줍니다.", pic: "📚" },
    { word: "magical",    pos: "adj.", en: "having magic powers", ko: "마법의",
      ex: "The {{magical}} caps are supposed to make them experts.", ex_ko: "마법 모자는 둘을 달인으로 만들어 준대요.", pic: "✨" },
    { word: "special",    pos: "adj.", en: "not ordinary; different from the usual in an important way", ko: "특별한",
      ex: "They wear the caps to a {{special}} ballgame.", ex_ko: "둘은 모자를 쓰고 특별한 경기에 가요.", pic: "⭐" },
    { word: "pretend",    pos: "v.",   en: "to act as if something is true when it is not", ko: "~인 척하다",
      ex: "Jack and Annie {{pretend}} to be batboys at the game.", ex_ko: "잭과 애니는 경기에서 배트보이인 척해요.", pic: "🎭" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 근거에 첫 문장이 없어, 10권과 달리 '책의 첫 문장' 보기 문장은 쓰지 않았다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Annie wore [[a]] magic cap and became [[an]] expert.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. a magic cap, an expert.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} baseball and {{an}} old cap." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[traveled]] back to 1947 and [[pretended]] to be batboys.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. travel → traveled, pretend → pretended.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} to school and {{opened}} the door." },
      { name: "will + 동사원형", ko: "미래형",
        sent: "The caps [[will make]] them experts, and they [[will be]] batboys in the game.",
        why_ko: "아직 오지 않은 일은 will 뒤에 동사원형을 그대로 써요. will makes (X) → will make (O), will is (X) → will be (O).",
        why: "For something that has not happened yet, use will + the plain form of the verb.",
        try: "Tomorrow I {{will read}} the book and I {{will be}} ready." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Morgan gives them (a / an) magic cap.", a: "a",
          why_ko: "magic 은 '매'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "The cap will make Jack (a / an) expert.", a: "an",
          why_ko: "expert 는 '엑'으로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "The magic tree house (whisk / whisked) them back to 1947.", a: "whisked",
          why_ko: "이미 일어난 일이니 과거형 whisked 예요." },
        { q: "Jack and Annie (pretend / pretended) to be batboys at the game.", a: "pretended",
          why_ko: "지난 일이에요. pretend 에 -ed 를 붙여 pretended!" },
        { q: "The caps will (make / makes) them experts.", a: "make",
          why_ko: "will 뒤에는 언제나 동사원형이에요. will makes 라고 쓰지 않아요." }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] back to 1947 Brooklyn.", a: "traveled",
          why_ko: "1947년은 한참 지난 일이에요. 과거형 traveled 로 고쳐요." },
        { q: "Morgan [[give]] them magical baseball caps.", a: "gave",
          why_ko: "give 는 불규칙 동사예요. 과거형은 gived 가 아니라 gave!" },
        { q: "They will [[are]] batboys, not ballplayers.", a: "be",
          why_ko: "will 뒤에는 동사원형이 와요. are 가 아니라 be 예요." }
      ],
      write: [
        { ko: "모건은 그들에게 마법 야구 모자를 주었다.", cond: "give, 과거형", a: "Morgan gave them magical baseball caps.",
          why_ko: "give 의 과거형은 gave. 'them + 물건' 순서로 이어 써요." },
        { ko: "그들은 경기에서 배트보이가 될 것이다.", cond: "will, be", a: "They will be batboys in the game.",
          why_ko: "아직 오지 않은 일이니 will, 그 뒤에는 동사원형 be 예요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them back in time?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them back." },
    { ref: "책 소개글", skill: "사실찾기", q: "Who gives Jack and Annie the magical baseball caps, and what are the caps supposed to do?",
      frame: "{{Morgan the librarian}} gives them the caps, and the caps will make them {{experts}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "Where and when does the magic tree house take Jack and Annie?",
      frame: "It takes them to {{Brooklyn, New York}}, in {{1947}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "When they arrive, what do Jack and Annie find out they will be at the game?",
      frame: "They find out that they will be {{batboys}}, not {{ballplayers}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "Whose first game with the Brooklyn Dodgers do they see, and who do the Dodgers play against?",
      frame: "It is {{Jackie Robinson's}} first game, against the {{Boston Braves}}." },
    { ref: "책 소개글", skill: "추론·예측", q: "Morgan sends them with caps that make them experts, but they end up carrying bats. What do you think Morgan wants them to learn?",
      frame: "I think Morgan wants them to learn {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "Would you rather play in a big game or watch a big game from very close up? Say why.",
      frame: "I would rather {{play / watch}}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 근거에 없는 선수 이름·기록·구단은 오답 보기에도 쓰지 않았다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Morgan", "Annie and a batboy", "Two ballplayers"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"Jack and Annie use the magic treehouse to travel back in time\" 이라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel back in time?",
      a: ["In the magic tree house", "On an airplane", "On a train", "By wearing a baseball cap"], c: 0,
      why_ko: "마법 나무집이에요. 소개글이 \"The magic tree house whisks them back to 1947\" 이라고 해요. 모자는 시간을 옮기는 게 아니라 달인으로 만들어 주는 물건이에요.",
      why: "The magic tree house. The description says it \"whisks them back to 1947.\"" },
    { q: "What year does the magic tree house take them to?",
      a: ["1847", "1947", "1974", "2017"], c: 1,
      why_ko: "1947년이에요. 2017년은 이 책이 나온 해지, 이야기가 일어난 해가 아니에요.",
      why: "1947. 2017 is the year the book was published, not the year of the story." },
    { q: "Which city do Jack and Annie go to?",
      a: ["Brooklyn, New York", "Chicago", "London", "Boston"], c: 0,
      why_ko: "뉴욕의 브루클린이에요. 보스턴은 상대 팀(보스턴 브레이브스)의 이름에만 나와요.",
      why: "Brooklyn, New York. Boston only appears in the name of the other team." },
    { q: "Who gives Jack and Annie the magical baseball caps?",
      a: ["Morgan the librarian", "Jackie Robinson", "A batboy", "A ballplayer"], c: 0,
      why_ko: "사서 모건이에요. 소개글이 \"Morgan the librarian gives them magical baseball caps\" 라고 적고 있어요.",
      why: "Morgan the librarian — \"Morgan the librarian gives them magical baseball caps.\"" },
    { q: "What are the magical baseball caps supposed to do?",
      a: ["Make Jack and Annie experts", "Make them invisible", "Take them home", "Make them taller"], c: 0,
      why_ko: "둘을 달인(experts)으로 만들어 주는 모자예요. 소개글에 \"caps that will make them experts\" 라고 있어요.",
      why: "Make them experts — \"magical baseball caps that will make them experts.\"" },
    { q: "At the beginning, how good are Jack and Annie at baseball?",
      a: ["They aren't great players yet", "They are the best players in Brooklyn", "They have never seen a ball", "They already play for a team"], c: 0,
      why_ko: "소개글 첫 줄이 \"Jack and Annie aren't great baseball players...yet!\" 이에요. 아직 잘하지 못한다는 뜻이에요.",
      why: "The description opens with \"Jack and Annie aren't great baseball players...yet!\"" },
    { q: "When they arrive, what do Jack and Annie find out they will be?",
      a: ["Batboys", "Ballplayers", "Coaches", "Librarians"], c: 0,
      why_ko: "선수가 아니라 배트보이예요. 소개글이 \"they will be batboys in the game, not ballplayers\" 라고 해요.",
      why: "Batboys — \"they will be batboys in the game, not ballplayers.\"" },
    { q: "Whose first game with the Brooklyn Dodgers do Jack and Annie see?",
      a: ["Jackie Robinson's", "Jack's", "Annie's", "Morgan's"], c: 0,
      why_ko: "재키 로빈슨의 첫 경기예요. 장서 요약에 \"Jackie Robinson's first game with the Brooklyn Dodgers\" 라고 있어요.",
      why: "Jackie Robinson's — the summary says \"Jackie Robinson's first game with the Brooklyn Dodgers.\"" },
    { q: "Which team do the Brooklyn Dodgers play against in this game?",
      a: ["The Boston Braves", "The Brooklyn Dodgers", "A team of batboys", "A team of librarians"], c: 0,
      why_ko: "보스턴 브레이브스예요. 브루클린 다저스는 재키 로빈슨이 뛰는 팀이니 상대가 될 수 없어요.",
      why: "The Boston Braves. The Dodgers are Robinson's own team, so they cannot be the opponent." },
    { q: "How many innings do Jack and Annie have to find out what Morgan wants?",
      a: ["Three", "Six", "Nine", "Twelve"], c: 2,
      why_ko: "9이닝이에요. 소개글 마지막 줄이 \"They only have nine innings to find out!\" 이에요.",
      why: "Nine — \"They only have nine innings to find out!\"" },
    { q: "What is an \"inning\"?",
      a: ["One of the parts a baseball game is divided into", "A player who carries the bats", "A kind of baseball cap", "The name of a team"], c: 0,
      why_ko: "이닝은 야구 경기를 나눈 한 회예요. 한 경기는 보통 9이닝이라 \"nine innings\" 가 곧 경기 하나예요.",
      why: "An inning is one part of a baseball game; a full game is usually nine innings." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#29", "#50"], c: 2,
      why_ko: "29권이에요. 장서 목록 제목이 \"#29 A Big Day for Baseball\" 이에요.",
      why: "Book #29 — the catalog title is \"#29 A Big Day for Baseball.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "What year they travel to", "What job they do at the game", "What Morgan wants them to learn"], c: 3,
      why_ko: "모건이 무엇을 가르치려 했는지예요. 우리가 가진 글은 \"What exactly does Morgan want them to learn?\" 이라고 묻고 그대로 끝나요. 답은 책을 읽어야 알 수 있어요.",
      why: "What Morgan wants them to learn. Our sources ask that question and stop there." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(막는 것 · 결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Brooklyn, New York}}", time: "{{1947}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to wear Morgan's magic caps to a special ballgame}}" },
      { k: "But",      v: "{{they found out they would be batboys, not ballplayers}}" },
      { k: "So",       v: "{{                    }}" },   // 배트보이가 된 뒤 무엇을 했는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Caps",
        given: "Jack and Annie aren't great baseball players yet.",
        frame: "Then {{Morgan the librarian}} gives them {{magical baseball caps}} that will make them {{experts}}." },
      { label: "The Tree House",
        given: "",
        frame: "The magic tree house whisks them back to {{1947}}, to {{Brooklyn, New York}}." },
      { label: "The Ballgame",
        given: "",
        frame: "They find out they will be {{batboys}}, not {{ballplayers}}, at {{Jackie Robinson's}} first game with the Brooklyn Dodgers, against the {{Boston Braves}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, Morgan wanted them to learn {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "A Big Day for Baseball",
    branches: [
      { label: "Jack & Annie",  ask: "At the start, Jack and Annie aren't great baseball players yet. How does that feel, to want to be good at something?",
        deeper: "Does a magic cap make you good at something, or does something else?" },
      { label: "Morgan's Caps", ask: "Morgan gives them caps that will make them experts. What would you want your magic cap to make you an expert at?",
        deeper: "If a cap made you an expert at once, would you still be proud of it? Say why." },
      { label: "The Tree House", ask: "Where and when does the tree house take them this time?",
        deeper: "Why do you think Morgan chose that one game, out of every game ever played?" },
      { label: "Batboys",       ask: "They wanted to be ballplayers, but they became batboys. What does a batboy do?",
        deeper: "Can you learn more by watching close up than by playing? Say why." },
      { label: "The Big Day",   ask: "It is Jackie Robinson's first game with the Brooklyn Dodgers. Why might a first game be a big day?",
        deeper: "Our information does not tell us why this game was so special. What do you think, and what will you look for in the book?" },
      { label: "Me",            ask: "If the tree house came for you, which game or day in history would you ask to see?",
        deeper: "Would you want to be in it, or to stand close and watch it happen?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Change",
    relatedConcepts: ["Fairness", "Skill", "Courage"],
    globalContext: "Fairness and development — 어떤 날은 왜 한 사람의 하루를 넘어 모두의 일이 되는가",
    statement: "Some days are remembered not because of who won, but because of who was allowed to play.",
    factual: [
      "Who gives Jack and Annie the magic caps, and what are the caps supposed to do?",
      "Where and when does the magic tree house take them?",
      "What job do they end up doing at the ballgame?"
    ],
    conceptual: [
      "What is the difference between being an expert and being given the power of one?",
      "Why can watching something up close teach you more than doing it?"
    ],
    debatable: [
      "Would you take a magic cap that made you an expert right away, or practice for years? Which is better?",
      "Is a game ever about more than the game?"
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Thinker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "모건이 무엇을 가르치려 했는가" 라는 물음에서 끊긴다. 그 답을 묻지 않고,
    // 근거가 확실히 말하는 것(마법 모자 · 배트보이) 위에서 아이 자신의 생각을 묻는다.
    prompt: "Morgan's magic caps were supposed to make Jack and Annie experts, but at the game they were batboys. Is it better to get a skill by magic or by practice? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "magic 과 practice 중 하나를 고를 것 · Choose magic or practice",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "The Cap or the Practice", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think practice is better than a magic cap.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "Morgan gave them magic caps, but at the game they were batboys, not players.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the caps did not decide what they would do at the game.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say magic is faster, but a skill you practiced stays with you.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe practice beats a magic cap.", lines: 2 }
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
      en: "Students retell how Morgan's magical caps and the magic tree house take Jack and Annie to 1947 Brooklyn, where they become batboys, not ballplayers, at Jackie Robinson's first game with the Brooklyn Dodgers against the Boston Braves, and then take a side on magic versus practice.",
      ko: "모건의 마법 모자와 마법 나무집이 잭과 애니를 1947년 브루클린으로 보내고, 두 아이가 선수가 아니라 배트보이가 되어 브루클린 다저스에서 치르는 재키 로빈슨의 첫 경기(상대는 보스턴 브레이브스)를 보게 되는 흐름을 말하고, 마법과 연습 중 어느 쪽인지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 이 경기가 역사에서 왜 특별한지는 우리 자료가 말하지 않는다. 선생님이 대신 설명하지 말고
    // 아이가 책에서 찾아오게 한다. 찾아온 것은 칠판 한쪽에 적어 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "What is something you are not good at...yet? Just yet. Say it in one sentence.",
        do: "책을 펴기 전에 한다. 소개글 첫 줄의 'yet' 을 아이 입에서 먼저 꺼내야 첫 장이 읽힌다. 서너 명만.",
        exp: "I am not good at swimming yet. / I am not good at drawing yet.",
        stuck: "선생님이 먼저 한 문장 한다. \"I am not good at running...yet.\"" },

      { stage: "Warm-up", min: "",
        say: "Now imagine a magic cap. You put it on and you are an expert at that thing. Would you wear it?",
        do: "손을 들게 한다. 찬반만 보고 설명은 아직 받지 않는다. 뒤의 논술 주제가 여기서 시작된다.",
        exp: "Yes, it is fast. / No, it is not really me.",
        stuck: "\"Put your hand up if you would wear it. Down if you would not.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "배트보이 → batboy / 이닝 → inning / 달인 → expert",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'Where and when...' becomes 'It takes them to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "It takes them to Brooklyn, New York, in 1947.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "They wanted to be ballplayers. They became batboys. Read that line again — what changed, and what did not?",
        do: "'batboys, not ballplayers' 를 칠판에 그대로 쓴다. 이 대비가 오늘 독해의 축이다.",
        exp: "They still went to the game, but they carried bats instead of playing.",
        stuck: "\"What did they want? What did they get? Two answers.\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: 모건의 마법 모자를 쓰고 특별한 경기에 가는 것 / But: 선수가 아니라 배트보이였다",
        stuck: "\"Who travels in this story? What were they supposed to do?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Two boxes are empty: So and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those two boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Big Day)", min: "",
        say: "Stop at The Big Day. The title says A BIG day. Our information does not say why it was big. That is your job tonight.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 선생님이 답을 대신 말하지 않는다.",
        exp: "It was Jackie Robinson's first game with the Dodgers. Why that mattered, I will find in the book.",
        stuck: "\"What do we know for sure? Now — what do we NOT know? Write the question down.\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Magic cap, or years of practice? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I choose practice, because the caps did not make Jack and Annie players at that game.",
        stuck: "교실을 반으로 나눠 세운다. \"Cap side here. Practice side there.\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say magic is faster, but a skill you practiced stays with you.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about baseball? How many innings are in a game?", ko: "야구에 대해 이미 아는 게 있니? 한 경기는 몇 이닝일까?" },
        { en: "If a magic cap made you an expert at once, what would you choose?", ko: "마법 모자가 단번에 달인으로 만들어 준다면 무엇을 고르겠니?" },
        { en: "The title says A Big Day. What makes a day 'big' for you?", ko: "제목이 '큰 날'이라고 해. 너에게 큰 날은 어떤 날이니?" }
      ],
      during: [
        { en: "They are batboys, not ballplayers. Why do you think Morgan let that happen?", ko: "둘은 선수가 아니라 배트보이야. 모건은 왜 그렇게 두었을까?" },
        { en: "They only have nine innings. What would you watch for, if you had nine innings?", ko: "시간은 9이닝뿐이야. 너라면 그 안에 무엇을 지켜보겠니?" }
      ],
      after: [
        { en: "What exactly did Morgan want them to learn? Tell me what our summary could not tell us.", ko: "모건은 무엇을 가르치려 했니? 우리 자료가 말해 주지 못한 걸 말해 줘." },
        { en: "What was so special about this game? Show me where the book says it.", ko: "그 경기는 왜 그렇게 특별했니? 책의 어디에 그렇게 나오는지 보여 줘." },
        { en: "Did the magic caps end up mattering? Why or why not?", ko: "마법 모자는 결국 쓸모가 있었니? 왜 그렇게 생각하니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "'batboys, not ballplayers' 대비를 먼저 잡아 준다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "So·Then 두 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Big Day' 가지에서 반드시 멈춘다. 그 경기가 왜 특별한지는 선생님이 말하지 않는다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거(장서 요약 · 출판사 소개글 영어 부분)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 근거에 첫 문장이 없어, 10권과 달리 책의 첫 문장으로 시작하지 않는다.
  // 근거가 모건의 뜻도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 모건의 마법 모자를 쓰고 1947년 브루클린의 야구장으로 가는 이야기",
    text: "Jack and Annie were not great baseball players — not yet. Then Morgan the [[library teacher|librarian]] gave them [[magic|magical]] baseball [[hats|caps]] that would make them [[masters|experts]]. All they had to do was wear the caps to a [[very important|special]] ballgame in Brooklyn, New York. The magic tree house [[carried|whisked]] them back to 1947. When they arrived, Jack and Annie found out that they would be [[bat carriers|batboys]] in the game, not [[baseball players|ballplayers]]. It was Jackie Robinson's first game with the Brooklyn Dodgers, against the Boston Braves. What exactly did Morgan want them to learn? What was so [[unusual|special]] about this game? They had only nine [[rounds|innings]] to find out. Open the book and see."
  }
};
