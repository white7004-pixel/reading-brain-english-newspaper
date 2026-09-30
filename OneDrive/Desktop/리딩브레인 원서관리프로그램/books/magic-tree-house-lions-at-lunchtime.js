// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.0)
// Lions at Lunchtime (Magic Tree House #11) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3256.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록 · 장소 목록)만으로 만들었다. 그 밖의 인물 이름·
// 지명·부족 이름·동물 종류·장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는
// 지어내지 않고 비워 두어 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 아프리카로 데려간다 /
//   거기서 멋진 야생 동물들과, 몹시 배고픈 전사 한 사람을 만난다 /
//   그리고 수수께끼(riddle) 하나를 푼다 — 장서 요약은 같은 것을 mystery 라고 적었다 /
//   제목과 주제어에 사자(Lions)가 있고, 장소 목록에 Africa 와 Savanne(사바나)가 있다 /
//   책의 첫 문장은 "Jack and Annie were walking home from the grocery store."
// 수수께끼가 무엇이었는지, 그 답이 무엇인지, 어떻게 집으로 돌아가는지는 어느 출처도
// 말하지 않는다. 그래서 비워 두었다.
// 10권과 달리 이 책의 근거에는 모건(Morgan)이 나오지 않는다. 그래서 모건을 쓰지 않았다.
// 두 아이의 나이도, 누가 손위인지도 근거가 말하지 않는다. 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3256",
  slug: "magic-tree-house-lions-at-lunchtime",
  title: "Lions at Lunchtime",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #11",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.0", lexile: "550L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424009-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록·장소 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3256 요약 + 오픈라이브러리 /works/OL81827W (소개글 · 첫 문장 \"Jack and Annie were walking home from the grocery store.\" · 주제어 Tree houses/Magic/Time travel/Animals/Zoology/Lions · 장소 Africa/Savanne · 73쪽)",
    characters: ["Jack", "Annie", "wonderful wild animals", "a very hungry warrior"],
    beats: [
      "the magic tree house whisks Jack and Annie off to Africa",
      "there they meet up with wonderful wild animals, and a very hungry warrior",
      "they even solve a riddle — the catalog summary calls the same thing a mystery"
    ],
    ending: "근거는 두 아이가 수수께끼를 \"푼다(they even solve a riddle)\"는 데까지만 말한다. 그 수수께끼가 무엇이었는지, 답이 무엇인지, 사자와 전사를 만난 일이 어떻게 마무리되는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "제목에 Lions 가 있고 주제어에도 Lions/Lion 이 있어 사자가 이 책에 나온다는 것까지는 말할 수 있다. 그러나 사자가 무엇을 하는지, 제목의 \"at Lunchtime\" 이 누구의 점심을 말하는지는 어느 출처도 말하지 않아 학습지 어디에도 쓰지 않았다",
    checked: "장서 요약(\"the magic tree house whisks Jack and Annie off to Africa\", \"wonderful animals\", \"they even solve a mystery\", \"Book #11\")과 소개글(\"takes Jack and Annie to Africa\", \"wonderful wild animals\", \"a very hungry warrior\", \"they even solve a riddle\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(몹시 배고픈 전사 · riddle 이라는 낱말)은 요약과 부딪히지 않아 남겼다. 요약의 mystery 와 소개글의 riddle 은 같은 것을 가리키는 말로 보아 한 가지로 묶었다. 주제어 Tree houses/Magic/Time travel/Animals/Zoology/Lions 와 장소 Africa/Savanne 가 같은 것을 가리켜 한 번 더 받쳐 주었다. 주제어 목록의 \"Spanish language materials\" 는 스페인어판이 있다는 서지 정보이지 이야기가 아니어서 쓰지 않았고, 오픈라이브러리 첫 항목의 출판연도 1600 은 명백히 잘못된 값이라 어디에도 쓰지 않았다. 10권 소개글과 달리 이 책 근거에는 모건(Morgan)이 없어 모건을 한 번도 쓰지 않았다. 전사가 어느 부족인지, 동물이 사자 말고 무엇인지도 근거가 말하지 않아 비워 두었다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Lions at Lunchtime\" read aloud",
    searchUrl: "https://youtu.be/p0D4B_Rqvgg",
    videos: [
      { url: "https://youtu.be/p0D4B_Rqvgg", title: "Magic Tree House | #11 Lions at Lunchtime | MARY POPE OSBORNE | New York Times Bestselling Series",
        channel: "EUNICE books and words", views: "16,751", length: "37:12" },
      { url: "https://youtu.be/Opuyx2wZLas", title: "Lions at Lunch Time",
        channel: "Sarah Fernitz", views: "1,022", length: "29:13" },
      { url: "https://youtu.be/KOK1XZm06sU", title: "Magic Treehouse Lions at Lunchtime Chapters 1 2 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "527", length: "7:31" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어·장소 목록에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "lion",      pos: "n.",   en: "a large wild cat with a loud roar that lives in Africa", ko: "사자",
      ex: "The title of this book is \"{{Lions}} at Lunchtime.\"", ex_ko: "이 책의 제목은 '점심시간의 사자들'이에요.", pic: "🦁" },
    { word: "lunchtime", pos: "n.",   en: "the time in the middle of the day when people eat lunch", ko: "점심시간",
      ex: "Something happens at {{lunchtime}} in this story.", ex_ko: "이 이야기에서는 점심시간에 무슨 일이 일어나요.", pic: "🍽️" },
    { word: "Africa",    pos: "n.",   en: "a very large continent south of Europe", ko: "아프리카",
      ex: "The magic tree house takes Jack and Annie to {{Africa}}.", ex_ko: "마법의 나무 집은 잭과 애니를 아프리카로 데려가요.", pic: "🌍" },
    { word: "savanna",   pos: "n.",   en: "a wide, flat, grassy land with only a few trees", ko: "사바나, 초원",
      ex: "A {{savanna}} is one of the places listed for this book.", ex_ko: "사바나는 이 책의 장소로 적혀 있는 곳이에요.", pic: "🌾" },
    { word: "warrior",   pos: "n.",   en: "a person who is brave and trained to fight", ko: "전사",
      ex: "Jack and Annie meet a very hungry {{warrior}}.", ex_ko: "잭과 애니는 몹시 배고픈 전사를 만나요.", pic: "🛡️" },
    { word: "hungry",    pos: "adj.", en: "feeling that you want or need to eat", ko: "배고픈",
      ex: "The warrior they meet is very {{hungry}}.", ex_ko: "그들이 만나는 전사는 몹시 배가 고파요.", pic: "😋" },
    { word: "wild",      pos: "adj.", en: "living freely in nature, not kept by people", ko: "야생의",
      ex: "They meet up with wonderful {{wild}} animals.", ex_ko: "그들은 멋진 야생 동물들과 만나요.", pic: "🐘" },
    { word: "riddle",    pos: "n.",   en: "a puzzling question that you have to think hard to answer", ko: "수수께끼",
      ex: "Jack and Annie even solve a {{riddle}}.", ex_ko: "잭과 애니는 수수께끼까지 풀어요.", pic: "❓" },
    { word: "mystery",   pos: "n.",   en: "something strange that you cannot explain until you find out more", ko: "수수께끼, 미스터리",
      ex: "Our summary says they solve a {{mystery}}.", ex_ko: "우리 요약은 그들이 수수께끼를 푼다고 말해요.", pic: "🔍" },
    { word: "grocery",   pos: "n.",   en: "a shop that sells food and things for the house", ko: "식료품점",
      ex: "The book begins as they walk home from the {{grocery}} store.", ex_ko: "책은 그들이 식료품점에서 집으로 걸어오며 시작해요.", pic: "🛒" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // were walking 만은 책의 첫 문장("Jack and Annie were walking home from the grocery store.")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure in Africa and solved [[a]] riddle.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a riddle.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} lion and {{an}} old tree." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "The magic tree house [[whisked]] them off to Africa, and they [[solved]] a riddle.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. whisk → whisked, solve → solved. e 로 끝나면 d 만 붙여요.",
        why: "Add -ed to the verb for something that already finished. If it ends in e, just add d.",
        try: "Yesterday I {{walked}} home and {{closed}} the door." },
      { name: "was / were + -ing", ko: "과거진행형",
        sent: "The book begins, \"Jack and Annie [[were walking]] home from the grocery store.\"",
        why_ko: "'그때 ~하고 있었다'는 was/were + 동사-ing 예요. 주어가 둘이면 were! Jack and Annie → were walking.",
        why: "Use was/were + verb-ing for what was going on at that moment. Two people take \"were.\"",
        try: "I {{was reading}} a book while my friends {{were playing}} outside." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie had (a / an) adventure in Africa.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "They even solved (a / an) riddle.", a: "a",
          why_ko: "riddle 은 '리'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "The magic tree house (whisk / whisked) them off to Africa.", a: "whisked",
          why_ko: "이미 일어난 일이니 과거형 whisked 예요." },
        { q: "Jack and Annie (solve / solved) a mystery.", a: "solved",
          why_ko: "지난 일이에요. solve 는 e 로 끝나니 d 만 붙여 solved!" },
        { q: "Jack and Annie (was / were) walking home from the grocery store.", a: "were",
          why_ko: "Jack and Annie 는 두 사람, 복수예요. 복수 주어의 과거 be동사는 were." }
      ],
      fix: [
        { q: "The magic tree house [[take]] Jack and Annie to Africa.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "They [[meet]] a very hungry warrior.", a: "met",
          why_ko: "meet 도 불규칙 동사예요. 과거형은 meeted 가 아니라 met!" },
        { q: "Jack and Annie [[was]] walking home from the grocery store.", a: "were",
          why_ko: "주어가 둘이니 was 가 아니라 were 예요." }
      ],
      write: [
        { ko: "잭과 애니는 식료품점에서 집으로 걸어오고 있었다.", cond: "were, walk", a: "Jack and Annie were walking home from the grocery store.",
          why_ko: "'걸어오고 있었다'는 were + walking 이에요. 주어가 둘이라 was 가 아니라 were." },
        { ko: "그들은 수수께끼를 풀었다.", cond: "solve, 과거형", a: "They solved a riddle.",
          why_ko: "solve 는 e 로 끝나요. -ed 가 아니라 d 만 붙여 solved 가 돼요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "책 전체", skill: "사실찾기", q: "Who are the two children in this story, and what takes them to Africa?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them there." },
    { ref: "책 전체", skill: "사실찾기", q: "What continent do Jack and Annie travel to in this book?",
      frame: "They travel to {{Africa}}." },
    { ref: "책 전체", skill: "사실찾기", q: "Name the two kinds of meeting our description tells us about in Africa.",
      frame: "They meet up with {{wonderful wild animals}} and with {{a very hungry warrior}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Lions at Lunchtime.\" What does \"lunchtime\" mean, and what does that make you wonder about the lions?",
      frame: "Lunchtime means {{the middle of the day when people eat}}. It makes me wonder {{                    }}." },
    { ref: "책 소개글", skill: "주제·요점", q: "Our description says Jack and Annie \"even solve a riddle.\" In one sentence, what is this book mostly about?",
      frame: "This book is mostly about {{                    }}." },
    { ref: "책 소개글", skill: "추론·예측", q: "The warrior is called \"very hungry.\" What do you think that word tells us about him?",
      frame: "I think it tells us {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If the tree house took you to a savanna full of wild animals, would you step outside? Say why.",
      frame: "I {{would / would not}} step outside, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and a warrior", "Annie and a lion", "Two hunters"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"whisks Jack and Annie off to Africa\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel in this book?",
      a: ["A magic tree house", "A jeep", "A boat", "An airplane"], c: 0,
      why_ko: "마법의 나무 집이에요. 주제어 목록에도 Tree houses 와 Time travel 이 있어요.",
      why: "The magic tree house. \"Tree houses\" and \"Time travel\" are both listed subjects." },
    { q: "Where does the magic tree house take Jack and Annie?",
      a: ["To Africa", "To the wild west", "To the moon", "To ancient Egypt"], c: 0,
      why_ko: "아프리카예요. 요약과 소개글이 둘 다 Africa 라고 적고, 장소 목록에도 Africa 가 있어요.",
      why: "To Africa. Both the summary and the description say Africa, and it is a listed place." },
    { q: "Which animal is named in the title of this book?",
      a: ["Lions", "Dolphins", "Mummies", "Ninjas"], c: 0,
      why_ko: "사자예요. 제목이 \"Lions at Lunchtime\" 이고, 주제어 목록에도 Lions 와 Lion 이 있어요.",
      why: "Lions. The title is \"Lions at Lunchtime,\" and \"Lions\" is a listed subject." },
    { q: "Besides wild animals, who do Jack and Annie meet up with?",
      a: ["A very hungry warrior", "A pirate captain", "A knight", "A cowboy"], c: 0,
      why_ko: "몹시 배고픈 전사예요. 소개글이 \"a very hungry warrior\" 라고 적고 있어요.",
      why: "A very hungry warrior — the description says exactly that." },
    { q: "Which word does the description use for the warrior?",
      a: ["Hungry", "Sleepy", "Angry", "Famous"], c: 0,
      why_ko: "소개글이 고른 낱말이 바로 hungry 예요(\"a very hungry warrior\"). 나머지 셋은 근거 어디에도 없어요.",
      why: "The description's own word is \"hungry.\" The other three appear nowhere in our sources." },
    { q: "Which word does the description use for the animals Jack and Annie meet?",
      a: ["Wonderful", "Tiny", "Frightening", "Sleeping"], c: 0,
      why_ko: "소개글은 \"wonderful wild animals\" 라고 적어요. 무섭다고도, 작다고도 하지 않았어요.",
      why: "The description says \"wonderful wild animals\" — not frightening, tiny or sleeping." },
    { q: "What do Jack and Annie even manage to do in Africa?",
      a: ["Solve a riddle", "Build a house", "Win a race", "Find a treasure map"], c: 0,
      why_ko: "수수께끼를 풀어요. 소개글은 riddle, 장서 요약은 mystery 라고 적었지만 같은 것을 가리켜요.",
      why: "They solve a riddle. The description says \"riddle\"; our catalog summary calls it a \"mystery.\"" },
    { q: "What does the word \"lunchtime\" in the title mean?",
      a: ["The middle of the day, when people eat lunch", "Late at night", "Just before sunrise", "The end of the year"], c: 0,
      why_ko: "lunchtime 은 점심을 먹는 한낮이에요. 제목 Lions at Lunchtime 은 '점심시간의 사자들' 이라는 뜻이에요.",
      why: "Lunchtime is the middle of the day, when people eat lunch." },
    { q: "What is a \"riddle\"?",
      a: ["A puzzling question you must think hard to answer", "A kind of animal", "A long journey", "A type of food"], c: 0,
      why_ko: "riddle 은 머리를 써야 답이 나오는 알쏭달쏭한 물음, 곧 수수께끼예요.",
      why: "A riddle is a puzzling question that takes hard thinking to answer." },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack and Annie were walking home from the grocery store.\"", "\"Jack couldn't sleep.\"", "\"Jack and Annie were sitting on the porch of their house.\"", "\"The savanna was quiet.\""], c: 0,
      why_ko: "첫 문장은 \"Jack and Annie were walking home from the grocery store.\" 예요. 오픈라이브러리에 그대로 적혀 있어요. 현관(porch) 문장은 10권의 첫 문장이에요.",
      why: "That is the recorded first line. The \"porch\" sentence opens book #10, not this one." },
    { q: "Which wide, grassy African land is listed as a place in this book?",
      a: ["The savanna", "The desert", "The jungle", "The mountains"], c: 0,
      why_ko: "사바나예요. 오픈라이브러리 장소 목록에 Africa 와 함께 Savanne(사바나)가 적혀 있어요.",
      why: "The savanna. The listed places are Africa and \"Savanne\" (savanna)." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#2", "#10", "#11", "#20"], c: 2,
      why_ko: "11권이에요. 장서 목록 제목이 \"#11. Lions at Lunchtime\" 이고 요약 끝에도 Book #11 이라고 적혀 있어요.",
      why: "Book #11 — the catalog title is \"#11. Lions at Lunchtime.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "That they solve a riddle", "What the riddle was and what its answer is", "Which animal is in the title"], c: 2,
      why_ko: "수수께끼의 내용과 답이에요. 우리가 가진 글은 \"수수께끼를 푼다\" 에서 멈춰요. 무슨 수수께끼였는지는 책을 읽어야 알 수 있어요.",
      why: "What the riddle was. Our sources stop at \"they even solve a riddle.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(때·원하는 것·문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Africa — a savanna}}", time: "{{                    }}" },   // 언제인지는 근거가 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 원했는지는 근거가 말하지 않는다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{they even solve a riddle}}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie off to Africa.",
        frame: "They travel in {{the magic tree house}} and land in {{Africa}}." },
      { label: "The Animals",
        given: "",
        frame: "There they meet up with {{wonderful wild animals}}. The title names {{lions}}." },
      { label: "The Warrior",
        given: "",
        frame: "They also meet {{a very hungry warrior}}." },
      { label: "The Riddle",
        given: "우리 자료는 두 아이가 수수께끼를 푼다는 데까지만 말한다. 그다음은 책을 읽고 네가 채워라.",
        frame: "In the end, they even solve {{a riddle}}. The riddle was {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Lions at Lunchtime",
    branches: [
      { label: "The Tree House", ask: "The book opens with Jack and Annie walking home from the grocery store. What does the magic tree house do for them this time?",
        deeper: "Why do you think an adventure so often begins on an ordinary errand?" },
      { label: "Africa",         ask: "The tree house takes them to Africa, to a wide grassy savanna. What do you picture there?",
        deeper: "What would surprise you most if you stood in a place with no walls and no roads?" },
      { label: "The Lions",      ask: "The title puts lions and lunchtime in the same three words. What does that make you expect?",
        deeper: "A title can promise something before page one. What has this title promised you?" },
      { label: "The Animals",    ask: "Our description calls them \"wonderful wild animals.\" What makes a wild animal wonderful?",
        deeper: "Can something be wonderful and dangerous at the same time? Say why." },
      { label: "The Warrior",    ask: "Jack and Annie meet a very hungry warrior. What would you do if you met someone hungry far from home?",
        deeper: "Why might sharing food matter more in a place where food is hard to find?" },
      { label: "The Riddle",     ask: "They even solve a riddle. What makes a riddle hard?",
        deeper: "Why do you think a story sends children across the world to find an answer, instead of just telling them?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Connections",
    relatedConcepts: ["Curiosity", "Sharing", "Evidence"],
    globalContext: "Orientation in space and time — 멀리 떨어진 땅과 그곳의 동물은 우리와 어떻게 이어져 있는가",
    statement: "Going to a far place and meeting the ones who live there can change what you notice and what you ask.",
    factual: [
      "Where does the magic tree house take Jack and Annie?",
      "Who and what do they meet up with there?",
      "What do they even manage to solve?"
    ],
    conceptual: [
      "Why do people call a wild animal \"wonderful\" and \"dangerous\" at the same time?",
      "What is the difference between looking at an animal and meeting one?"
    ],
    debatable: [
      "Is it better to watch wild animals up close, or from far away?",
      "Should you share your food with a stranger who is hungry?"
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 두 아이가 "멋진 야생 동물들" 과 만난다는 것까지만 말한다. 사자가 무엇을 하는지는
    // 적혀 있지 않으므로, 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "In Africa, Jack and Annie meet wonderful wild animals up close. Is it better to watch wild animals up close, or from far away? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "up close 인지 far away 인지 분명히 할 것 · Say which one clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Close Enough to See", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think wild animals are better watched from far away.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie meet wonderful wild animals in Africa.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows that being close lets you see a lot, but the animals are still wild.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say you learn more up close, but you can also use your eyes from far off.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe a little distance is the better way to watch.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and Annie off to Africa, where they meet up with wonderful wild animals and a very hungry warrior and even solve a riddle, then take a side on whether wild animals are better watched up close or from far away.",
      ko: "마법의 나무 집이 잭과 애니를 아프리카로 데려가고, 두 아이가 멋진 야생 동물들과 몹시 배고픈 전사를 만나 수수께끼까지 푸는 흐름을 말하고, 야생 동물을 가까이서 볼지 멀리서 볼지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Africa. Say one animal you think of. Just one word each, go around.",
        do: "책을 펴기 전에 한다. 아프리카를 아이 입에서 먼저 꺼내야 제목이 읽힌다. 한 바퀴 빠르게.",
        exp: "Lion. / Elephant. / Giraffe.",
        stuck: "선생님이 먼저 한 낱말 한다. \"Lion.\" 그다음 옆 아이를 가리킨다." },

      { stage: "Warm-up", min: "",
        say: "The title is \"Lions at Lunchtime.\" Two words: lions, and lunchtime. Whose lunch do you think it is?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다. 답을 정해 주지 않는다 — 우리도 모른다.",
        exp: "The lions' lunch. / Maybe Jack and Annie's lunch!",
        stuck: "표지를 가리킨다. \"Look at the cover. Who looks hungry?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "사자 → lion / 전사 → warrior / 수수께끼 → riddle",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What continent...' becomes 'They travel to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They travel to Africa.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack and Annie were walking home from the grocery store.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 심부름에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Then: they even solve a riddle — Wanted·But·So 는 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What do they end up solving?\" 첫 칸과 마지막 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: Wanted, But, and So. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Warrior)", min: "",
        say: "Stop at The Warrior. Our book calls him 'very hungry.' What would YOU do if you met someone hungry far from home?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘 마음이 움직이는 자리다.",
        exp: "I would share my food. / I would be a little scared first.",
        stuck: "\"You have one sandwich and you are hungry too. Now what?\"" },

      { stage: "Mind Map (The Riddle)", min: "",
        say: "Don't just tell me they solved a riddle — tell me what makes a riddle HARD.",
        do: "수수께끼 가지도 짧게 한 번 짚는다. 답을 아는 척하지 않는다.",
        exp: "A riddle hides the answer in the words. You have to think about it in a new way.",
        stuck: "\"You told me what they did. Now — why could they not just look it up?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Up close, or far away? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think far away, because a wild animal is still wild.",
        stuck: "손을 들게 한다. \"Walk closer? Or stay where you are?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say you learn more up close, but you can use your eyes from far off too.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about Africa and the animals that live there?", ko: "아프리카와 거기 사는 동물에 대해 이미 아는 게 있니?" },
        { en: "Have you ever seen lions or other African animals at a zoo?", ko: "동물원에서 사자나 다른 아프리카 동물을 본 적 있니?" },
        { en: "The title says lunchtime. Why might that word matter in a book about lions?", ko: "제목에 점심시간이 나와. 사자 이야기에서 그 말이 왜 중요할까?" }
      ],
      during: [
        { en: "The warrior is called 'very hungry.' What do you think he will ask Jack and Annie for?", ko: "전사를 '몹시 배고픈' 이라고 해. 잭과 애니에게 무엇을 부탁할 것 같니?" },
        { en: "What kind of riddle do you think they have to solve this time?", ko: "이번에는 어떤 수수께끼를 풀어야 할 것 같니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was the riddle, and what was the answer?", ko: "수수께끼는 무엇이었고, 답은 무엇이었니?" },
        { en: "Write what mystery you thought Jack and Annie would solve. Were you right?", ko: "잭과 애니가 어떤 수수께끼를 풀 거라고 생각했는지 써 보자. 맞았니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "Wanted·But·So 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Warrior' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거(장서 요약 · 출판사 소개글 · 첫 문장 · 장소 목록)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 근거가 수수께끼의 내용도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 아프리카 초원으로 가는 이야기",
    text: "Jack and Annie were walking home from the [[food shop|grocery]] store. Then the magic tree house [[carried|whisked]] them off to [[a far continent|Africa]], to the wide grassy [[plain|savanna]]. There they met up with [[amazing|wonderful]] [[free|wild]] animals — the title names [[big cats|lions]] — and with a very [[not fed|hungry]] [[fighter|warrior]]. And they even solved a [[puzzle|riddle]]. What was the riddle? Open the book and find out."
  }
};
