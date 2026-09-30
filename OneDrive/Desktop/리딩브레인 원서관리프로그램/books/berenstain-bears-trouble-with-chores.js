// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.7)
// The Berenstain Bears and the Trouble with Chores — 우리는 이 책을 읽지 않았다.
// .superpowers/book/M3119.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 주제어 목록 · 장서 발문)만으로 만들었다. 그 밖의 인물 이름·집안일 종류·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   아빠 곰과 아기 곰들은 집안일을 하지 않는 쪽을 더 좋아한다 /
//   마마 곰이 그들 쪽으로 돌아선다 — 장서 요약은 "마마 곰도 집안일을 안 하기로 한다",
//   소개글은 "마마 곰이 그들 생각을 따라가기로 한다" /
//   바로 그때 아빠 곰과 아기 곰들이 교훈을 하나 얻는다
// 그 교훈이 무엇인지는 어느 출처도 말하지 않는다. 장서 요약이 "They learn a lesson" 에서
// 그대로 끊긴다. 그래서 그 자리는 우리가 대신 채우지 않고 빈칸으로 두었다.
// 아기 곰들의 이름도, 몇 마리인지도 근거가 말하지 않는다(`the cubs` 뿐이다). 쓰지 않았다.
// 어떤 집안일이 나오는지도 근거에 없다. 주제어(Housekeeping · Cleanliness · Hygiene)는
// 도서관이 붙인 딱지일 뿐이라 줄거리로 바꾸어 쓰지 않았다.
// 오픈라이브러리 기록 네 건 모두 첫 문장(first)이 비어 있어, 첫 문장을 묻는 문항·보기·
// 낭독 첫 줄을 모두 뺐다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "M3119",
  slug: "berenstain-bears-trouble-with-chores",
  title: "The Berenstain Bears and the Trouble with Chores",
  author: "Stan and Jan Berenstain",
  series: "The Berenstain Bears",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 앞선 책들에 맞췄다.
  level: { ar: "3.7", lexile: "600L", rb: "다독 3단계" },
  cover: "https://covers.openlibrary.org/b/id/10468502-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·주제어 목록·장서 발문을 겹쳐 보았다. 근거 파일(.superpowers/book/M3119.json)에서 뽑은 것뿐이며 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 M3119 요약 + 오픈라이브러리 /works/OL15108052W (소개글 \"Papa Bear and the cubs really prefer not to do their chores, and Mama Bear decides to go along with their idea.\" · 주제어 Housekeeping/Cleanliness/Family life/Bears/Families/Hygiene · 2005년) 및 /works/OL22473588W (32쪽) · /works/OL27449199W · /works/OL17497210W (네 기록 모두 첫 문장 칸이 비어 있다)",
    characters: ["Papa Bear", "Mama Bear", "the cubs"],
    beats: [
      "Papa Bear and the cubs really prefer not to do their chores",
      "Mama Bear turns to their side — the catalog summary says she decides not to do the chores either, and the publisher description says she decides to go along with their idea",
      "Papa Bear and the cubs learn a lesson at that moment; what the lesson is, no source says"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"They learn a lesson when Mama Bear decides not to do the chores either.\" 에서 그대로 끝나고, 소개글은 \"Mama Bear decides to go along with their idea.\" 에서 끊긴다. 집안일을 결국 하게 되는지, 누가 먼저 항복하는지, 집이 어떻게 되는지, 그리고 그 교훈이 무엇인지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "① 무슨 교훈인지 모른다 — 요약이 \"They learn a lesson\" 에서 끊긴다. 장서 발문 첫 물음(\"What lesson did Papa Bear and the cubs learn?\")이 바로 그것을 묻고 있어, 우리가 대신 쓰지 않고 아이가 책에서 찾아 채우는 빈칸으로 두었다. ② 어떤 집안일인지 모른다 — 설거지·빨래·청소 같은 말이 근거에 하나도 없다. 주제어 Housekeeping·Cleanliness·Hygiene 는 도서관 분류일 뿐이라 줄거리로 옮기지 않았다. ③ 아기 곰들의 이름도 수도 모른다 — 두 출처 모두 `the cubs` 라고만 한다. 다른 Berenstain Bears 책에서 아는 이름을 끌어오지 않았다. ④ 두 출처가 마마 곰을 다르게 적는다 — 장서 요약은 \"not to do the chores either\", 소개글은 \"to go along with their idea\". 어긋나지는 않지만 같은 말도 아니라, 학습지에는 두 출처가 함께 말하는 것(마마 곰이 아빠 곰과 아기 곰들 쪽으로 돌아섰다)만 담고 두 표현을 각각 그 출처의 말로 밝혀 적었다. ⑤ 첫 문장이 없다 — 오픈라이브러리 네 기록 모두 first 칸이 비어 있어 첫 문장을 쓰는 문항·보기·낭독 줄을 전부 뺐다. ⑥ 배경(장소·때)을 말하는 줄이 하나도 없어 summaryMap 의 setting 을 비웠다",
    checked: "장서 요약(\"Papa Bear and the cubs really prefer not to do their chores\", \"They learn a lesson when Mama Bear decides not to do the chores either\")과 소개글(\"Papa Bear and the cubs really prefer not to do their chores, and Mama Bear decides to go along with their idea\")을 한 줄씩 맞춰 보았다. 앞 절은 낱말까지 똑같았고, 뒤 절만 서로 다른 말로 적혀 있어 어느 한쪽을 다른 쪽인 양 쓰지 않고 둘 다 출처를 밝혀 남겼다. 주제어 Housekeeping/Cleanliness/Family life/Families/Hygiene 는 '집안일과 한 가족'이라는 결을 받쳐 주지만 어떤 집안일인지는 말해 주지 않아 낱말 고르는 데까지만 썼다. 장서 발문 세 물음은 근거가 아니라 학원이 만든 물음이라 사실 진술로 쓰지 않고 발문 그대로만 썼다 (2026-09-30)"
  },

  // 낭독 영상 — 근거 파일의 세 편을 유튜브 oEmbed 로 제목과 채널을 하나하나 다시 확인했다
  // (2026-09-30). 셋 다 이 책이 맞고 셋 다 낭독이라 하나도 빼지 않았다.
  // 조회수·길이는 oEmbed 가 주지 않아 지어내지 않고 넣지 않았다.
  shadowing: {
    query: "\"The Berenstain Bears and the Trouble with Chores\" read aloud",
    searchUrl: "https://youtu.be/XKwjA7Niw80",
    videos: [
      { url: "https://youtu.be/XKwjA7Niw80", title: "Trouble with Chores / Berenstain Bears (read aloud)",
        channel: "Story Forest" },
      { url: "https://youtu.be/R8_SuYylftI", title: "Kids Books Read Aloud: The Berenstain Bears and the Trouble with Chores by Stan and Jan Berenstain",
        channel: "Storytime Magic Books 4 Kids" },
      { url: "https://youtu.be/6WHe8cqommE", title: "The Berenstain Bears and the TROUBLE WITH CHORES - by Stan and Jan Berenstain",
        channel: "Bedtime Anytime Stories" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·장서 요약·소개글·주제어에 실제로 나오는 말에서만 골랐다.
  // 집안일의 종류를 설명하는 낱말(설거지·빨래 따위)은 근거에 없어 하나도 넣지 않았다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "chore",       pos: "n.",   en: "a small job you have to do at home, like tidying or cleaning", ko: "집안일, 허드렛일",
      ex: "The cubs prefer not to do their {{chores}}.", ex_ko: "아기 곰들은 집안일을 하지 않는 쪽을 더 좋아해요.", pic: "🧹" },
    { word: "trouble",     pos: "n.",   en: "a problem, or something that makes things hard", ko: "골칫거리, 문제",
      ex: "The title is \"The Berenstain Bears and the {{Trouble}} with Chores.\"", ex_ko: "제목은 '베렌스타인 베어즈와 집안일 골칫거리'예요.", pic: "😣" },
    { word: "prefer",      pos: "v.",   en: "to like one thing more than another; to choose one over another", ko: "더 좋아하다, ~하는 쪽을 고르다",
      ex: "Papa Bear and the cubs {{prefer}} not to do their chores.", ex_ko: "아빠 곰과 아기 곰들은 집안일을 하지 않는 쪽을 고릅니다.", pic: "👍" },
    { word: "decide",      pos: "v.",   en: "to make up your mind about what you will do", ko: "결정하다, 마음을 정하다",
      ex: "Mama Bear {{decides}} to go along with their idea.", ex_ko: "마마 곰은 그들 생각을 따라가기로 결정해요.", pic: "🤔" },
    { word: "either",      pos: "adv.", en: "used at the end of a negative sentence to mean \"also\"", ko: "(부정문 끝에서) ~도 또한",
      ex: "Mama Bear does not do the chores, {{either}}.", ex_ko: "마마 곰도 집안일을 하지 않아요.", pic: "🙅" },
    { word: "lesson",      pos: "n.",   en: "something you come to understand from what happens to you", ko: "교훈",
      ex: "Papa Bear and the cubs learn a {{lesson}}.", ex_ko: "아빠 곰과 아기 곰들은 교훈을 하나 얻어요.", pic: "💡" },
    { word: "learn",       pos: "v.",   en: "to come to know or understand something new", ko: "배우다, 알게 되다",
      ex: "They {{learn}} a lesson when Mama Bear stops doing the chores.", ex_ko: "마마 곰이 집안일을 멈추자 그들은 교훈을 얻어요.", pic: "📖" },
    { word: "housekeeping", pos: "n.",  en: "the work of looking after a house", ko: "집안 살림",
      ex: "The library files this book under {{housekeeping}}.", ex_ko: "도서관은 이 책에 '집안 살림'이라는 주제어를 붙였어요.", pic: "🏡" },
    { word: "clean",       pos: "v.",   en: "to make something free of dirt and tidy", ko: "청소하다, 깨끗이 하다",
      ex: "One subject word for this book is cleanliness, from {{clean}}.", ex_ko: "이 책의 주제어 하나가 cleanliness 인데, clean 에서 온 말이에요.", pic: "🧼" },
    { word: "family",      pos: "n.",   en: "the people you live with, such as parents and children", ko: "가족",
      ex: "This story happens inside one bear {{family}}.", ex_ko: "이 이야기는 곰 가족 하나 안에서 일어나요.", pic: "🐻" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 다만 담긴 사실은 근거 안의 것뿐이고,
  // 짜임은 모두 근거 문장에 실제로 있는 것에서 가져왔다
  // (prefer not to do · decide to go along · when ... · 부정문의 either).
  // 이 책은 첫 문장이 남아 있지 않아 첫 문장을 쓰는 보기는 하나도 넣지 않았다.
  grammar: {
    points: [
      { name: "prefer not to + 동사원형", ko: "부정 부정사",
        sent: "Papa Bear and the cubs [[prefer not to]] do their chores.",
        why_ko: "'~하지 않는 쪽을 고르다'는 not 을 to 앞에 놓아요. prefer to not do 가 아니라 prefer not to do!",
        why: "To say you would rather NOT do something, put \"not\" before \"to\": prefer not to do.",
        try: "I {{prefer not to}} get up early on Sunday." },
      { name: "decide to + 동사원형", ko: "to부정사",
        sent: "Mama Bear [[decides to]] go along with their idea.",
        why_ko: "decide 뒤에는 to + 동사원형이 와요. decide going 이 아니라 decide to go!",
        why: "After \"decide,\" use to + the base verb: decide to go.",
        try: "She {{decided to}} stop and wait." },
      { name: "when ...", ko: "때를 잇는 접속사",
        sent: "They learn a lesson [[when]] Mama Bear decides not to do the chores.",
        why_ko: "두 가지 일을 '~할 때'로 이어 줄 때 when 을 써요. when 이 이끄는 쪽이 '언제'를 알려 줘요.",
        why: "\"When\" joins two things and tells you the moment one of them happens.",
        try: "I smiled {{when}} my friend came in." },
      { name: "not ... either", ko: "부정문의 either",
        sent: "Papa Bear does not do the chores, and Mama Bear does not do them [[either]].",
        why_ko: "'~도 역시'는 긍정문에서 too, 부정문 끝에서는 either 를 써요. 부정문에 too 를 쓰면 틀려요.",
        why: "Use \"too\" in a positive sentence, but \"either\" at the end of a negative one.",
        try: "I don't like mornings, and my friend doesn't {{either}}." }
    ],
    find: "책에서 not 이 들어간 문장을 세 개 찾아 쓰세요. · Find three sentences with \"not\" in them.",
    exam: {
      choose: [
        { q: "Papa Bear and the cubs prefer (not to do / to not do) their chores.", a: "not to do",
          why_ko: "not 은 to 앞에 와요. prefer not to do 가 바른 꼴이에요." },
        { q: "Mama Bear decides (to go / going) along with their idea.", a: "to go",
          why_ko: "decide 뒤에는 to + 동사원형이에요. decide to go!" },
        { q: "They learn a lesson (when / what) Mama Bear stops doing the chores.", a: "when",
          why_ko: "'~할 때'로 두 일을 이어 주는 말은 when 이에요." },
        { q: "Mama Bear does not do the chores, (too / either).", a: "either",
          why_ko: "부정문 끝에서는 too 가 아니라 either 를 써요." },
        { q: "Papa Bear and the cubs (learn / learns) a lesson.", a: "learn",
          why_ko: "주어가 여럿(Papa Bear and the cubs)이라 동사에 -s 를 붙이지 않아요." }
      ],
      fix: [
        { q: "Papa Bear and the cubs prefer [[to not do]] their chores.", a: "not to do",
          why_ko: "not 의 자리가 틀렸어요. to 앞으로 옮겨 prefer not to do 로 고쳐요." },
        { q: "Mama Bear decides [[going]] along with their idea.", a: "to go",
          why_ko: "decide 뒤에는 -ing 가 아니라 to + 동사원형이 와요." },
        { q: "Mama Bear does not do the chores [[too]].", a: "either",
          why_ko: "does not 이 들어간 부정문이에요. 끝에는 either 를 써요." }
      ],
      write: [
        { ko: "아빠 곰과 아기 곰들은 집안일을 하지 않는 쪽을 고른다.", cond: "prefer, not to", a: "Papa Bear and the cubs prefer not to do their chores.",
          why_ko: "prefer 다음에 not to + 동사원형을 그대로 이어 붙이면 돼요." },
        { ko: "마마 곰도 집안일을 하지 않는다.", cond: "either", a: "Mama Bear does not do the chores either.",
          why_ko: "'~도 역시'인데 부정문이니 끝에 either 를 놓아요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 쪽에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 셋은 근거가 말하지 않는 자리라 답을 비워 두었다. 아이가 책에서 가져온다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who prefers not to do the chores in this story?",
      frame: "{{Papa Bear}} and {{the cubs}} prefer not to do them." },
    { ref: "책 소개글", skill: "사실찾기", q: "What does Mama Bear decide to do?",
      frame: "She decides to {{go along with their idea}}, and not to do the chores {{either}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "When do Papa Bear and the cubs learn a lesson?",
      frame: "They learn it {{when Mama Bear decides not to do the chores either}}." },
    { ref: "책 제목", skill: "어휘", q: "The title says \"the Trouble with Chores.\" What is a chore, and why could chores turn into trouble in a house?",
      frame: "A chore is {{a small job you do at home}}. Chores can turn into trouble because {{                    }}." },
    { ref: "장서 질문", skill: "주제·요점", q: "Our summary says they learn a lesson, but it never says what the lesson is. Read the book and write it in your own words.",
      frame: "The lesson Papa Bear and the cubs learn is {{                    }}." },
    { ref: "책 전체", skill: "사실찾기", q: "Our information never says which chores this family has. Find two of them in the book and write them.",
      frame: "In the book I found {{                    }} and {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "What chores do you help with at home?",
      frame: "At home I help with {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 근거가 말하지 않는 것(교훈의 내용 · 집안일의 종류 · 아기 곰의 수)은
  // '우리 자료는 말해 주지 않는다'가 정답인 문항으로 만들어, 지어내지 않고 물었다.
  quiz: [
    { q: "Who prefers not to do their chores in this story?",
      a: ["Papa Bear and the cubs", "Mama Bear alone", "The cubs alone", "A neighbor"], c: 0,
      why_ko: "아빠 곰과 아기 곰들이에요. 장서 요약과 소개글이 똑같이 \"Papa Bear and the cubs really prefer not to do their chores\" 라고 적어요.",
      why: "Papa Bear and the cubs. Both sources open with the very same words." },
    { q: "What is the \"trouble\" in the title about?",
      a: ["Chores", "School", "A lost toy", "The weather"], c: 0,
      why_ko: "제목이 그대로 말해 줘요 — The Trouble with Chores, 곧 집안일을 둘러싼 골칫거리예요.",
      why: "The title says it: \"the Trouble with Chores.\"" },
    { q: "What does Mama Bear decide about the chores?",
      a: ["She decides not to do them either", "She decides to do them all by herself", "She decides to pay someone", "She decides to teach a class"], c: 0,
      why_ko: "장서 요약이 \"Mama Bear decides not to do the chores either\" 라고 말해요. 혼자 다 하기로 한 게 아니에요.",
      why: "The catalog summary says Mama Bear \"decides not to do the chores either.\"" },
    { q: "The book description says Mama Bear decides to do what with their idea?",
      a: ["Go along with it", "Argue against it", "Hide it", "Forget it"], c: 0,
      why_ko: "소개글이 고른 말이 바로 go along with their idea 예요. 맞서거나 숨기거나 잊은 게 아니에요.",
      why: "The description's own words are \"decides to go along with their idea.\"" },
    { q: "When do Papa Bear and the cubs learn a lesson?",
      a: ["When Mama Bear stops doing the chores too", "Before the story starts", "When they go on a trip", "When a visitor comes"], c: 0,
      why_ko: "요약이 \"They learn a lesson when Mama Bear decides not to do the chores either\" 라고 그 순간을 못 박아요.",
      why: "The summary pins the moment: \"when Mama Bear decides not to do the chores either.\"" },
    { q: "Who learns a lesson in this story?",
      a: ["Papa Bear and the cubs", "Mama Bear", "Nobody", "Only one cub"], c: 0,
      why_ko: "요약의 They 는 바로 앞 문장의 Papa Bear and the cubs 를 가리켜요. 마마 곰이 아니에요.",
      why: "\"They\" in the summary points back to Papa Bear and the cubs, not Mama Bear." },
    { q: "In \"Mama Bear does not do the chores either,\" what does \"either\" tell us?",
      a: ["She is doing the same as Papa Bear and the cubs", "She is doing the opposite of them", "She does the chores twice", "She does only half of them"], c: 0,
      why_ko: "either 는 부정문에서 '~도 역시'예요. 아빠 곰과 아기 곰들처럼 마마 곰도 안 한다는 뜻이에요.",
      why: "\"Either\" means \"also\" in a negative sentence: she is not doing them, just like them." },
    { q: "Does our information say WHAT lesson Papa Bear and the cubs learn?",
      a: ["No — the summary stops right there", "Yes, it says to share the work", "Yes, it says to clean up fast", "Yes, it says to ask for help"], c: 0,
      why_ko: "요약은 \"They learn a lesson\" 에서 그대로 끊겨요. 무슨 교훈인지는 어느 출처도 말하지 않아요. 그건 책을 읽고 네가 찾아야 해요.",
      why: "No. The summary stops at \"They learn a lesson\" and never says what it is." },
    { q: "Which chores does our information tell us this family has?",
      a: ["It does not say which chores", "Washing the dishes", "Doing the laundry", "Cutting the grass"], c: 0,
      why_ko: "근거 어디에도 집안일의 종류가 없어요. 주제어 Housekeeping·Cleanliness 는 도서관이 붙인 딱지일 뿐이에요. 어떤 집안일인지는 책에서 찾아요.",
      why: "None are named. \"Housekeeping\" and \"Cleanliness\" are library subject labels, not scenes from the book." },
    { q: "How many cubs are in this family?",
      a: ["One", "Two", "Three", "Our information does not say"], c: 3,
      why_ko: "두 출처 모두 the cubs 라고만 해요. 몇 마리인지, 이름이 무엇인지 적힌 곳이 없어요.",
      why: "Both sources say only \"the cubs.\" The number is never given." },
    { q: "What is a \"chore\"?",
      a: ["A small job you have to do at home", "A kind of game", "A school subject", "A type of food"], c: 0,
      why_ko: "chore 는 집에서 해야 하는 작은 일, 곧 집안일이에요. 제목과 주제어 Housekeeping 이 함께 가리키는 뜻이에요.",
      why: "A chore is a small job at home — which is why \"Housekeeping\" is one of this book's subjects." },
    { q: "Which pair of subject words did the library put on this book?",
      a: ["Housekeeping and Cleanliness", "Space and Rockets", "Sports and Games", "Music and Dance"], c: 0,
      why_ko: "오픈라이브러리 주제어 목록에 Housekeeping 과 Cleanliness 가 있어요. 나머지 셋은 근거 어디에도 없어요.",
      why: "Open Library lists Housekeeping and Cleanliness. The other three appear nowhere in our sources." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(배경 · 집이 어떻게 되었는지 · 교훈 · 결말)은 채우지 않았다.
  // 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{                    }}", time: "{{                    }}" },   // 근거에 장소도 때도 없다
    swbst: [
      { k: "Somebody", v: "{{Papa Bear and the cubs}}" },
      { k: "Wanted",   v: "{{not to do their chores}}" },
      { k: "But",      v: "{{Mama Bear decided not to do the chores either}}" },
      { k: "So",       v: "{{                    }}" },   // 그다음 집이 어떻게 되었는지는 근거가 말하지 않는다
      { k: "Then",     v: "{{Papa Bear and the cubs learned a lesson}}" }
    ],
    scenes: [
      { label: "Nobody Wants the Chores",
        given: "Papa Bear and the cubs really prefer not to do their chores.",
        frame: "In this house, {{Papa Bear}} and {{the cubs}} prefer not to do their {{chores}}." },
      { label: "Mama Bear Decides",
        given: "",
        frame: "Mama Bear decides to {{go along with their idea}}, and does not do the chores {{either}}." },
      { label: "What Happens Next",
        given: "우리 자료는 여기서 멈춘다. 집이 어떻게 되었는지는 책을 읽고 네가 채워라.",
        frame: "When nobody does the chores, {{                    }}." },
      { label: "The Lesson",
        given: "장서 요약은 \"They learn a lesson\" 에서 그대로 끊긴다. 무슨 교훈인지는 아무도 말해 주지 않는다.",
        frame: "Papa Bear and the cubs learn that {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 결말을 말하지 않는다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "The Trouble with Chores",
    branches: [
      { label: "Papa Bear",  ask: "Papa Bear prefers not to do his chores. What does that tell you about him at the start?",
        deeper: "Why is it harder for the cubs to do chores when a grown-up is skipping them too?" },
      { label: "The Cubs",   ask: "The cubs prefer not to do their chores. What do you think they would rather be doing?",
        deeper: "Is wanting to skip a job the same as being lazy? Say why or why not." },
      { label: "Mama Bear",  ask: "Mama Bear decides to go along with their idea and stop doing the chores. Why would she do that?",
        deeper: "One source says she goes along with their idea, the other says she stops doing the chores too. Are those the same thing?" },
      { label: "The House",  ask: "What do you think a house looks like after a few days with no chores done?",
        deeper: "Which would you notice first — the mess you can see, or the things that stop working?" },
      { label: "The Lesson", ask: "The summary says they learn a lesson, but never says what it is. What do you expect it to be?",
        deeper: "After you read the book, was your guess right? What made you guess that?" },
      { label: "Me",         ask: "What would happen if no one in your house did chores for a day?",
        deeper: "Which chore at your house would be missed the fastest, and why that one?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Responsibility", "Fairness", "Consequence"],
    globalContext: "Identities and relationships — 한집에 사는 사람들이 해야 할 일을 어떻게 나누는가",
    statement: "What one person decides to stop doing can change what everyone else feels about the work.",
    factual: [
      "Who prefers not to do their chores?",
      "What does Mama Bear decide to do?",
      "When do Papa Bear and the cubs learn a lesson?"
    ],
    conceptual: [
      "Why can one person's decision change what everyone else does?",
      "What makes a job feel like a chore instead of just a job?"
    ],
    debatable: [
      "Should every person in a home have to do chores?",
      "Is stopping your own work a fair way to show someone something?"
    ],
    learnerProfile: ["Reflective", "Principled", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "교훈을 얻는다" 까지만 말한다. 그 교훈이 무엇인지는 적혀 있지 않으므로,
    // 교훈의 내용이 아니라 마마 곰의 결정에 대한 아이 자신의 판단을 묻는 물음으로 세웠다.
    prompt: "Papa Bear and the cubs prefer not to do their chores, so Mama Bear decides not to do them either. Do you think that was a good idea? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "책에서 찾은 것을 한 가지 넣을 것 · Use one thing you found in the book"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "When Mama Bear Stopped", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think Mama Bear had a good idea.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in the bear family's story? Write it.",
        eg: "Papa Bear and the cubs would not do their chores, so Mama Bear stopped doing them too.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows they only understood the work once nobody was doing it.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a parent should keep working, but the book says they learned a lesson.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe her choice was worth it.", lines: 2 }
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
      en: "Students retell that Papa Bear and the cubs prefer not to do their chores, that Mama Bear then goes along with them and stops doing the chores too, and that a lesson follows at that moment; they read the book to find out what the lesson is, then take a side on whether Mama Bear's decision was a good idea.",
      ko: "아빠 곰과 아기 곰들이 집안일을 하지 않는 쪽을 고르고, 마마 곰이 그들 쪽으로 돌아서 집안일을 멈추며, 바로 그때 교훈이 따라온다는 흐름을 말한다. 그 교훈이 무엇인지는 책에서 찾아오게 하고, 마마 곰의 결정이 좋은 생각이었는지 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 특히 '무슨 교훈인지'와 '어떤 집안일인지'는 선생님도 모른다. 대신 채워 주지 않는다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "What would happen if no one in your house did chores for a day? Two days?",
        do: "책을 펴기 전에 한다. 아이 입에서 먼저 나와야 제목이 읽힌다. 서너 명만.",
        exp: "The dishes pile up. / Nobody has clean clothes. / It gets messy.",
        stuck: "선생님이 먼저 한 문장 한다. \"My kitchen would be full of dishes.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"The Trouble with Chores.\" What is a chore? What chores do you help with at home?",
        do: "제목의 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "A chore is a job at home. / I set the table.",
        stuck: "\"Name one thing you have to do at home even when you don't want to.\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "집안일 → chore / 교훈 → lesson / 결정하다 → decide",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Grammar", min: "20~30분",
        say: "\"Prefer not to do.\" Where does 'not' go? Before 'to' — always. Say it with me three times.",
        do: "칠판에 prefer / not / to / do 네 조각을 따로 써 두고 순서를 맞추게 한다.",
        exp: "prefer not to do",
        stuck: "틀린 것을 먼저 보여 준다. \"prefer to not do — does that sound right?\"" },

      { stage: "Grammar", min: "",
        say: "\"Mama Bear does not do the chores, ___.\" Too, or either? Look at 'does not' first.",
        do: "부정문이면 either 라는 것 하나만 남긴다. 예문 두 개면 충분하다.",
        exp: "Either. The sentence is negative.",
        stuck: "긍정문 하나를 나란히 써 준다. \"I like it too. / I don't like it either.\"" },

      { stage: "Comprehension", min: "30~42분",
        say: "Turn the question into the first half of your answer. 'What does Mama Bear decide...' becomes 'She decides to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "She decides to go along with their idea.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Question five asks what lesson they learned. I do not know the answer. Our summary stops before it.",
        do: "선생님이 모른다고 말하는 자리다. 이 한 마디가 아이를 책으로 보낸다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Tomorrow you tell me, not the other way around.\"" },

      { stage: "Summary Map", min: "42~52분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Papa Bear and the cubs / Wanted: not to do their chores / But: Mama Bear stopped too",
        stuck: "\"Who does not want to do the chores? What did Mama Bear do about it?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "The So box is empty, and so is The Lesson. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those two boxes tomorrow.\"" },

      { stage: "Mind Map", min: "52~62분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (Mama Bear)", min: "",
        say: "Stop at Mama Bear. One source says she went along with their idea. The other says she stopped doing the chores. Same thing, or not?",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다. 두 문장을 나란히 칠판에 쓴다.",
        exp: "Going along is about agreeing. Stopping is about doing. They fit together, but they are not the same.",
        stuck: "\"Can you agree with someone without doing what they do?\"" },

      { stage: "IB Inquiry", min: "62~72분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Is stopping your own work a fair way to show someone something? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because Papa Bear and the cubs learned a lesson from it.",
        stuck: "손을 들게 한다. \"Keep working quietly? Or stop and let them see?\"" },

      { stage: "Writing", min: "72~85분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a parent should keep working, but the book says they learned a lesson.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "85~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What chores do you help with at home?", ko: "집에서 어떤 집안일을 돕고 있니?" },
        { en: "Is there a job at home you would rather not do? Why that one?", ko: "집안일 중에 하기 싫은 게 있니? 왜 하필 그거야?" },
        { en: "What would happen if no one in your house did chores for a day?", ko: "하루 동안 아무도 집안일을 안 하면 어떻게 될까?" }
      ],
      during: [
        { en: "Mama Bear decides to go along with them instead of arguing. Why do you think she chose that?", ko: "마마 곰은 따지는 대신 그들을 따라가기로 해. 왜 그랬을 것 같니?" },
        { en: "Which chores do you see in the book? Our summary never told us.", ko: "책에는 어떤 집안일이 나오니? 우리 자료는 그걸 말해 주지 않았어." }
      ],
      after: [
        { en: "What lesson did Papa Bear and the cubs learn?", ko: "아빠 곰과 아기 곰들은 무슨 교훈을 얻었니?" },
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Who gives in first, and how did that feel to you?", ko: "누가 먼저 물러서니? 그게 너에게는 어떻게 느껴졌어?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Grammar",       point: "prefer not to do 의 not 자리와 부정문의 either, 둘만 남긴다.", miss: "네 짜임을 다 설명하려다 시간을 다 쓴다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "So 칸과 The Lesson 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 '집안일은 나눠야 한다' 같은 교훈을 대신 지어 채워 준다. 우리 자료에 그런 말은 없다." },
      { sheet: "Mind Map",      point: "'Mama Bear' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 이 책은 첫 문장이 남아 있지 않아 책의 첫 줄로 시작하지 않는다.
  // 근거가 교훈도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "아빠 곰과 아기 곰들이 집안일을 미루자 마마 곰까지 손을 놓는 이야기",
    text: "In this bear house, Papa Bear and the cubs really [[would rather not|prefer not to]] do their [[jobs at home|chores]]. So Mama Bear [[agrees with|goes along with]] their idea, and she does not do the chores [[as well|either]]. And that is when Papa Bear and the cubs [[get|learn]] a [[teaching|lesson]]. What lesson was it? Our summary stops right there. Open the book and find out."
  }
};
