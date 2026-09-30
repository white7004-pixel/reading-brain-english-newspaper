// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.5)
// Camp Time in California (Magic Tree House #35) — 우리는 이 책을 읽지 않았다.
// 이 책은 근거가 얇다. 오픈라이브러리에 소개글이 있기는 하지만 학원 장서 요약과 글자까지 같은
// 한 문장이라(끝에 -- 만 더 붙어 있다) 보태 주는 사실이 하나도 없다. 첫 문장도 없다.
// 우리가 가진 것은 그 한 문장과 주제어 목록뿐이다.
// 그래서 분량을 채우지 않았다. 근거가 버티는 만큼만 만들고, 버티지 않는 자리는 비워 두었다.
// 근거가 말하는 것은 딱 여기까지다:
//   마법의 나무 집이 잭과 애니를 시간을 거슬러(back in time) 데려간다 /
//   둘은 캘리포니아 요세미티에서 가장 큰 나무(the tallest tree in Yosemite, California)에 내린다 /
//   거기서 자연을 지키는 사람(nature conservationist) 존 뮤어와
//   미국 대통령(US President) 테디 루스벨트와 함께한다(join) /
//   역사에 남을 숲길 여행(a historic trip through the woods)을 한다 /
//   주제어는 Children's fiction · Time travel · Fiction · Nature · Magic · Tree houses · History /
//   114쪽 · 2021년 · 이 시리즈의 35권 · 제목은 "Camp Time in California"
//
// ★ 이 책에서 가장 조심한 곳 — 실존 인물 둘.
//   존 뮤어에 대해 근거가 말하는 것은 "nature conservationist" 한 마디,
//   테디 루스벨트에 대해 근거가 말하는 것은 "US President" 한 마디,
//   그리고 둘과 함께 "a historic trip through the woods" 를 한다는 것. 그게 전부다.
//   연도, 몇 대 대통령인지, 국립공원, 시에라 클럽, 두 사람의 생애·업적·나눈 이야기 —
//   한 글자도 쓰지 않았다.
//   'historic'(역사에 남을) 이라는 낱말은 근거에 있으므로 썼다. 그러나 왜 역사에 남는 여행인지는
//   어느 출처도 말하지 않는다. 설명을 지어 넣지 않고 물음으로만 남겼다.
//   요세미티도 마찬가지다. 캘리포니아에 있다는 것과 그곳에 가장 큰 나무가 있다는 것까지가 근거다.
//   폭포·바위·나무 종류·넓이는 채우지 않았다.
//
// 오픈라이브러리 기록 두 건 가운데 소개글이 있는 것은 /works/OL22049699W 하나다.
//   /works/OL39178745W 는 같은 책의 다른 판(91쪽)이고 소개글도 주제어도 비어 있어
//   가져올 것이 없었다.
// 첫 문장이 없으므로 첫 문장을 묻는 퀴즈·문법 보기·낭독 시작 줄을 모두 뺐다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3939",
  slug: "magic-tree-house-camp-time-in-california",
  title: "Camp Time in California",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #35",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권·31권과 나란히 맞췄다.
  level: { ar: "3.5", lexile: "430L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/10670099-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 /works/OL22049699W 의 소개글과 주제어를 겹쳐 보았다. 소개글은 장서 요약과 글자까지 같아 보태 주는 사실이 없었다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3939 요약(\"When the magic tree house whisks Jack and Annie back in time, they land in the tallest tree in Yosemite, California where they join nature conservationist, John Muir, and US President Teddy Roosevelt on a historic trip through the woods.\") + 오픈라이브러리 /works/OL22049699W (같은 문장의 소개글 · 주제어 Children's fiction / Time travel / Fiction / Nature / Magic / Tree houses / History · 114쪽 · 2021년 · 첫 문장 없음)",
    characters: ["Jack", "Annie", "John Muir", "Teddy Roosevelt"],
    beats: [
      "the magic tree house whisks Jack and Annie back in time",
      "they land in the tallest tree in Yosemite, California",
      "they join nature conservationist John Muir and US President Teddy Roosevelt",
      "they go on a historic trip through the woods"
    ],
    ending: "근거에 결말이 없다. 요약은 \"on a historic trip through the woods\" 에서 그대로 끝난다. 숲길 여행에서 무슨 일이 있었는지, 두 아이가 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    source_gap: "우리가 모르는 것을 또렷이 적어 둔다. ① 그 여행이 왜 역사에 남는지(historic) — 근거는 'historic' 이라는 낱말 하나를 줄 뿐, 까닭을 한 마디도 말하지 않는다. 이 학습지에서 가장 큰 빈칸이다. ② 존 뮤어에 대해 아는 것은 '자연을 지키는 사람(nature conservationist)' 한 마디뿐이다. 그가 언제 살았는지, 무슨 일을 했는지, 어떤 단체를 만들었는지 — 없다. ③ 테디 루스벨트에 대해 아는 것은 '미국 대통령(US President)' 한 마디뿐이다. 몇 대 대통령인지, 언제 대통령이었는지, 다른 무슨 일을 했는지 — 없다. ④ 두 사람이 숲에서 무슨 이야기를 나눴는지 — 없다. ⑤ 요세미티의 모습 — 폭포·바위·나무의 종류·넓이·국립공원 여부 — 어느 것도 근거에 없다. 근거는 '캘리포니아에 있다' 와 '그곳에 가장 큰 나무가 있다' 까지다. ⑥ 제목의 camp(야영)가 무엇을 가리키는지 — 요약에 camp 라는 말이 한 번도 나오지 않는다. ⑦ 이야기가 일어난 연도 — 없다. ⑧ 잭과 애니가 왜 그곳으로 보내졌는지, 모건이나 수수께끼가 나오는지 — 없다. ⑨ 책의 첫 문장 — 어느 기록에도 없다. ⑩ 장(chapter) 구성과 각 장의 내용 — 없다. 그래서 이 학습지에는 장 번호가 한 번도 나오지 않는다",
    checked: "장서 요약의 낱말(magic tree house / whisks / back in time / land / tallest tree / Yosemite, California / join / nature conservationist / John Muir / US President / Teddy Roosevelt / historic trip / woods)과 오픈라이브러리 주제어를 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 주제어 Time travel 은 요약의 'back in time' 을, Tree houses 는 'the magic tree house' 를, Nature 는 'nature conservationist' 와 'through the woods' 를, History 는 'historic' 을 한 번 더 받쳐 주었다. 오픈라이브러리 소개글은 장서 요약과 글자까지 같은 한 문장이라(끝에 -- 만 붙어 있다) 새로 얻은 사실이 하나도 없었다 — 그래서 '출처가 둘' 이라고 세지 않았다. /works/OL39178745W 는 같은 책의 91쪽짜리 다른 판으로 소개글도 주제어도 비어 있어 가져온 것이 없다. 실존 인물 둘에 대해서는 근거 문장에 붙은 두 마디(nature conservationist / US President) 밖으로 한 글자도 나가지 않았는지 문항을 하나씩 되짚었다. 소개글이 사실상 없는 것과 같고 첫 문장도 없어, 퀴즈를 14개가 아니라 12개로 줄였다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  // 제목을 하나하나 확인해 이 책(#35 Camp Time in California)이 아닌 영상은 넣지 않았다.
  // 이 권은 통본(책 한 권 전체) 낭독 영상을 확인하지 못했다. 모두 조각 영상뿐이다.
  // 장 차례대로 놓으려 했으나, 장서 자료의 영상 제목이 "... -Cha" 에서 잘려 있어
  // 각 영상이 몇 장인지 확인할 수 없었다. 그래서 장(chapter) 번호가 확인되는 것(1)을 맨 앞에 두고,
  // 번호를 알 수 없는 세 개를 자료에 적힌 차례대로 이어 두었다. 마지막은 출판사 낭독 한 토막이다.
  // 아이는 영상이 끊긴 뒤부터는 책으로 읽는다.
  // "Magic Tree House Club: Camp Time in California" (도서관 영상, 18:15) 은 제목이 낭독이 아니라
  // 독서모임(Club)이라고 말하고 있어 넣지 않았다. 낭독인지 확인하지 못했다.
  shadowing: {
    query: "\"Camp Time in California\" Magic Tree House read aloud",
    searchUrl: "https://youtu.be/f7yvV6a9-KI",
    videos: [
      { url: "https://youtu.be/f7yvV6a9-KI", title: "Magic Tree House - Camp Time in California - 1",
        channel: "The Halfling Storytime", views: "2,788", length: "5:34" },
      { url: "https://www.youtube.com/watch?v=c579ivNbu5g", title: "Magic Tree House #35 Camp Time in California by Mary Pope Osborne - Cha",
        channel: "", views: "", length: "" },
      { url: "https://www.youtube.com/watch?v=AjAyS7taM4k", title: "Magic Tree House #35 Camp Time in California by Mary Pope Osborne - Cha",
        channel: "", views: "", length: "" },
      { url: "https://www.youtube.com/watch?v=cazDnNKeTkA", title: "Magic Tree House #35 Camp Time in California by Mary Pope Osborne - Cha",
        channel: "", views: "", length: "" },
      { url: "https://youtu.be/2jg15-42yhg", title: "Magic Tree House Storytime: Camp Time in California",
        channel: "Random House Kids", views: "755", length: "7:32" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 근거 문장 한 줄 · 책 제목 · 주제어에 실제로 나오는 말에서만 골랐다.
  // 두 사람의 업적을 설명하는 낱말(park, forest ranger, club, national ...)은 한 개도 끌어오지 않았다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "magic",       pos: "adj.", en: "having special powers that cannot happen in real life", ko: "마법의",
      ex: "The {{magic}} tree house takes Jack and Annie back in time.", ex_ko: "마법의 나무 집이 잭과 애니를 시간을 거슬러 데려가요.", pic: "🪄" },
    { word: "tree house",  pos: "n.",   en: "a small house built up in the branches of a tree", ko: "나무 위의 집",
      ex: "The magic {{tree house}} whisks them away.", ex_ko: "마법의 나무 집이 둘을 데려가요.", pic: "🌳" },
    { word: "whisk",       pos: "v.",   en: "to take someone away quickly and suddenly", ko: "휙 데려가다",
      ex: "The tree house {{whisks}} Jack and Annie back in time.", ex_ko: "나무 집이 잭과 애니를 시간을 거슬러 휙 데려가요.", pic: "💨" },
    { word: "land",        pos: "v.",   en: "to come down and stop on the ground or on something", ko: "내려앉다, 도착하다",
      ex: "They {{land}} in the tallest tree in Yosemite.", ex_ko: "그들은 요세미티에서 가장 큰 나무에 내려앉아요.", pic: "🪂" },
    { word: "tallest",     pos: "adj.", en: "taller than all the others", ko: "가장 큰, 가장 높은",
      ex: "They land in the {{tallest}} tree, not a short one.", ex_ko: "그들은 낮은 나무가 아니라 가장 큰 나무에 내려요.", pic: "📏" },
    { word: "join",        pos: "v.",   en: "to go along with other people and do something with them", ko: "함께하다, 합류하다",
      ex: "Jack and Annie {{join}} two men on a trip.", ex_ko: "잭과 애니는 두 사람과 함께 여행을 떠나요.", pic: "🤝" },
    { word: "nature",      pos: "n.",   en: "trees, plants, animals and land that people did not make", ko: "자연",
      ex: "John Muir is a {{nature}} conservationist.", ex_ko: "존 뮤어는 자연을 지키는 사람이에요.", pic: "🍃" },
    { word: "president",   pos: "n.",   en: "the leader chosen by the people of a country", ko: "대통령",
      ex: "Teddy Roosevelt was a US {{President}}.", ex_ko: "테디 루스벨트는 미국 대통령이었어요.", pic: "🇺🇸" },
    { word: "historic",    pos: "adj.", en: "important enough to be remembered later", ko: "역사에 남을",
      ex: "They go on a {{historic}} trip through the woods.", ex_ko: "그들은 역사에 남을 숲길 여행을 떠나요.", pic: "📜" },
    { word: "woods",       pos: "n.",   en: "an area with many trees growing close together", ko: "숲",
      ex: "Their trip goes through the {{woods}}.", ex_ko: "그들의 여행은 숲을 지나가요.", pic: "🌲" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // 이 책은 첫 문장이 남아 있지 않아 '첫 문장으로 배우는 문법' 을 넣지 않았다.
  // 대신 근거 문장에 실제로 들어 있는 짜임 셋으로 채웠다:
  //   When ~ , ~  /  the tallest (최상급)  /  whisks - land - join (현재형 -s)
  grammar: {
    points: [
      { name: "When ~ , ~", ko: "때를 말하는 접속사",
        sent: "[[When]] the magic tree house whisks Jack and Annie back in time, they land in a tall tree.",
        why_ko: "'언제 그 일이 일어났는지' 를 앞에 붙일 때 When 을 써요. When 으로 시작한 부분이 앞에 오면 그 끝에 쉼표(,)를 찍고 본 문장을 이어요.",
        why: "Use \"When ...\" to say at what moment something happens. If it comes first, put a comma after it.",
        try: "{{When}} the tree house stops{{,}} Jack looks out." },
      { name: "the + 최상급 (-est)", ko: "최상급",
        sent: "They land in [[the tallest]] tree in Yosemite, California.",
        why_ko: "여럿 가운데 '가장 ~한' 하나를 말할 때 -est 를 붙이고 앞에 the 를 꼭 써요. tall → the tallest. 가장 하나뿐이니까 the 가 필요해요.",
        why: "Add -est and put \"the\" in front to say one thing is more than all the others.",
        try: "That is {{the tallest}} tree of them all." },
      { name: "현재형 동사의 -s", ko: "주어와 동사 맞추기",
        sent: "The tree house [[whisks]] them away, and Jack and Annie [[land]] in a tree and [[join]] two men.",
        why_ko: "지금 일어나는 일을 말할 때, 주어가 하나(the tree house)면 동사에 -s 를 붙이고, 주어가 둘 이상(Jack and Annie)이면 그냥 씁니다. whisks(하나) / land, join(둘).",
        why: "In the present, add -s when the subject is one thing, and no -s when it is more than one.",
        try: "The tree house {{whisks}} them away. They {{join}} two men." }
    ],
    find: "책에서 -est 로 끝나는 낱말을 두 개 찾아 쓰세요. · Find two words ending in -est.",
    exam: {
      choose: [
        { q: "(When / What) the tree house whisks them away, they land in a tree.", a: "When",
          why_ko: "'~할 때' 를 말하고 있어요. 때를 말할 때는 When 을 써요." },
        { q: "They land in (the tallest / tallest) tree in Yosemite.", a: "the tallest",
          why_ko: "최상급 앞에는 the 를 꼭 붙여요. 가장 큰 나무는 하나뿐이니까요." },
        { q: "That tree is (taller / the tallest) of them all.", a: "the tallest",
          why_ko: "'그 모두 가운데 가장' 이니까 최상급 the tallest 예요." },
        { q: "The magic tree house (whisk / whisks) Jack and Annie back in time.", a: "whisks",
          why_ko: "주어 the magic tree house 는 하나예요. 현재형이니 -s 를 붙여 whisks!" },
        { q: "Jack and Annie (joins / join) two men on a trip through the woods.", a: "join",
          why_ko: "주어가 둘(Jack and Annie)이에요. -s 를 붙이지 않아요." }
      ],
      fix: [
        { q: "[[When]] the tree house whisks them back in time they land in a tree.", a: "When ... time, they",
          why_ko: "When 으로 시작한 부분이 끝나는 자리에 쉼표(,)를 찍어요. time 뒤에 , 를 넣습니다." },
        { q: "They land in [[tallest]] tree in Yosemite.", a: "the tallest",
          why_ko: "최상급 앞에 the 가 빠졌어요. the tallest 로 고쳐요." },
        { q: "The magic tree house [[whisk]] Jack and Annie back in time.", a: "whisks",
          why_ko: "주어가 하나이고 현재형이니 -s 를 붙여 whisks 로 고쳐요." }
      ],
      write: [
        { ko: "나무 집이 둘을 데려갈 때, 그들은 나무에 내려앉는다.", cond: "When, land", a: "When the tree house whisks them away, they land in a tree.",
          why_ko: "때를 말하는 When 절을 앞에 두고 끝에 쉼표를 찍어요." },
        { ko: "그들은 요세미티에서 가장 큰 나무에 내려앉는다.", cond: "the tallest, Yosemite", a: "They land in the tallest tree in Yosemite.",
          why_ko: "최상급은 -est 에 the 를 붙여 the tallest 로 써요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  // 뒤쪽 네 문항은 답을 비워 두었다. 우리 근거가 거기까지 말하지 않기 때문이다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "What whisks Jack and Annie back in time, and where do they land?",
      frame: "{{The magic tree house}} whisks them back in time, and they land in {{the tallest tree}} in Yosemite, California." },
    { ref: "장서 요약", skill: "사실찾기", q: "Whom do Jack and Annie join, and what is each man called in our summary?",
      frame: "They join {{John Muir}}, a {{nature conservationist}}, and {{Teddy Roosevelt}}, a {{US President}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What kind of trip do the four of them go on, and where does it go?",
      frame: "They go on a {{historic}} trip, and it goes through {{the woods}}." },
    { ref: "주제어", skill: "사실찾기", q: "Our records list seven subjects for this book. Which one names the way Jack and Annie travel?",
      frame: "The subject is {{Time travel}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Camp Time in California.\" Our summary never uses the word camp. What do you think camping has to do with this story?",
      frame: "I think camp means {{                    }}, because {{                    }}." },
    { ref: "장서 요약", skill: "추론·예측", q: "Our summary calls the trip historic, but it never says why. Guess a reason, then read the book and check.",
      frame: "I guessed the trip was historic because {{                    }}. In the book, it was because {{                    }}." },
    { ref: "내 생각", skill: "평가·적용", q: "If you landed in the tallest tree in a forest, what would you do first, and why?",
      frame: "First I would {{                    }}, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 이 책은 근거가 얇아 12문항만 냈다. 억지로 14개를 채우지 않았다.
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  // 첫 문장을 묻는 문항은 뺐다 — 어느 기록에도 이 책의 첫 문장이 없다.
  // 두 사람에 대해서는 근거가 붙여 준 두 마디(nature conservationist / US President) 밖으로 나가지 않았다.
  quiz: [
    { q: "What whisks Jack and Annie back in time?",
      a: ["A train", "A magic tree house", "A hot air balloon", "A river boat"], c: 1,
      why_ko: "마법의 나무 집이에요. 요약이 \"the magic tree house whisks Jack and Annie back in time\" 이라고 말해요.",
      why: "The magic tree house — the summary says it \"whisks Jack and Annie back in time.\"" },
    { q: "Where do Jack and Annie land?",
      a: ["On a beach", "In the shortest tree in Yosemite", "In the tallest tree in Yosemite", "In a cave"], c: 2,
      why_ko: "요세미티에서 가장 큰 나무예요. 요약이 \"they land in the tallest tree in Yosemite\" 라고 적어요. 가장 낮은 나무가 아니에요.",
      why: "In the tallest tree in Yosemite — the summary says \"they land in the tallest tree.\"" },
    { q: "Which state is Yosemite in, according to our summary?",
      a: ["Texas", "New York", "California", "Hawaii"], c: 2,
      why_ko: "캘리포니아예요. 요약이 \"in Yosemite, California\" 라고 두 이름을 나란히 적어요. 책 제목에도 California 가 있어요.",
      why: "California. The summary says \"in Yosemite, California,\" and the title names it too." },
    { q: "In our summary, what is John Muir called?",
      a: ["A nature conservationist", "A US President", "A tree house builder", "Jack and Annie's teacher"], c: 0,
      why_ko: "자연을 지키는 사람(nature conservationist)이에요. 요약이 \"nature conservationist, John Muir\" 라고 이름 앞에 그대로 붙여 놓았어요.",
      why: "A nature conservationist — the summary says \"nature conservationist, John Muir.\"" },
    { q: "In our summary, what is Teddy Roosevelt called?",
      a: ["A nature conservationist", "A US President", "A park guide", "The owner of the tree house"], c: 1,
      why_ko: "미국 대통령(US President)이에요. 요약이 \"US President Teddy Roosevelt\" 라고 적어요. 자연을 지키는 사람은 존 뮤어 쪽이에요.",
      why: "A US President — the summary says \"US President Teddy Roosevelt.\"" },
    { q: "What do Jack and Annie do with John Muir and Teddy Roosevelt?",
      a: ["They race them up the tree", "They teach them to read", "They join them on a trip through the woods", "They sail a boat with them"], c: 2,
      why_ko: "둘과 함께 숲길 여행을 해요. 요약이 \"they join ... on a historic trip through the woods\" 라고 말해요.",
      why: "They join them on a trip through the woods, says the summary." },
    { q: "The summary says the tree house \"whisks\" Jack and Annie back in time. What does \"whisk\" mean here?",
      a: ["To wait a long time", "To take someone away quickly and suddenly", "To wake someone up", "To carry something heavy"], c: 1,
      why_ko: "whisk 는 '휙 데려가다' 예요. 눈 깜짝할 사이에 데려간다는 뜻이에요.",
      why: "To whisk someone away is to take them off quickly and suddenly." },
    { q: "They land in \"the tallest\" tree. What does \"tallest\" tell you?",
      a: ["It is the oldest tree", "It is the thickest tree", "It is the only tree", "It is taller than all the other trees"], c: 3,
      why_ko: "-est 는 '여럿 가운데 가장' 이라는 뜻이에요. tallest 는 다른 어떤 나무보다 키가 크다는 말이에요. 나이나 굵기를 말하는 게 아니에요.",
      why: "The -est ending means more than all the rest: taller than every other tree." },
    { q: "The summary calls it a \"historic\" trip. What does \"historic\" mean?",
      a: ["Very short", "Important enough to be remembered later", "Very quiet", "Happening every year"], c: 1,
      why_ko: "historic 은 '역사에 남을' 이에요. 나중에도 사람들이 기억할 만큼 중요하다는 뜻이에요. 다만 왜 그런지는 우리 자료가 말해 주지 않아요.",
      why: "Historic means important enough that people remember it later." },
    { q: "Which of these is listed as a subject of this book?",
      a: ["Cooking", "Sports", "Time travel", "Robots"], c: 2,
      why_ko: "Time travel 이에요. 오픈라이브러리 주제어에 \"Time travel\" 이 있어요. 요리·운동·로봇은 어디에도 없어요.",
      why: "Time travel is one of the listed subjects." },
    { q: "Which of these is also listed as a subject of this book?",
      a: ["Money", "Music", "Machines", "Nature"], c: 3,
      why_ko: "Nature(자연)예요. 주제어 목록에 있어요. 요약의 \"nature conservationist\" 와 \"through the woods\" 가 그것을 받쳐 줘요.",
      why: "Nature is a listed subject, matching \"nature conservationist\" and \"the woods.\"" },
    { q: "Which of these does our information NOT tell us?",
      a: ["What whisks Jack and Annie back in time", "Where they land", "Why the trip is historic", "Whom they join"], c: 2,
      why_ko: "왜 그 여행이 역사에 남는지예요. 우리 자료는 'historic' 이라는 낱말 하나를 줄 뿐, 까닭은 한 마디도 말하지 않아요. 그건 책을 읽어야 알 수 있어요.",
      why: "Why the trip is historic. Our summary gives the word but never the reason." }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // Wanted·But·So·Then 과 The Ending 은 근거가 말하지 않는다. 비워 두었다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{Yosemite, California}}", time: "{{back in time}}" },
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{                    }}" },   // 두 아이가 무엇을 하려 했는지 근거가 말하지 않는다
      { k: "But",      v: "{{                    }}" },
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "The Tree House",
        given: "The magic tree house whisks Jack and Annie back in time.",
        frame: "They travel {{back in time}}, not forward." },
      { label: "The Tallest Tree",
        given: "",
        frame: "They land in the {{tallest}} tree in {{Yosemite}}, {{California}}." },
      { label: "The Two Men",
        given: "",
        frame: "They join {{John Muir}}, a nature {{conservationist}}, and {{Teddy Roosevelt}}, a US {{President}}." },
      { label: "The Historic Trip",
        given: "우리 자료는 '역사에 남을 숲길 여행' 이라고만 한다. 왜 역사에 남는지는 말해 주지 않는다.",
        frame: "They go on a {{historic}} trip through {{the woods}}. It is historic because {{                    }}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  // 가지의 물음은 모두 근거 안의 낱말에서 출발한다. 두 사람의 생애나 업적은 묻지 않는다 — 우리가 모른다.
  mindMap: {
    center: "Camp Time in California",
    branches: [
      { label: "Jack & Annie", ask: "The magic tree house whisks Jack and Annie back in time again. What do you think they pack?",
        deeper: "Why do you think the same two children are sent again and again?" },
      { label: "The Tallest Tree", ask: "They land in the tallest tree, not on the ground. How would that feel?",
        deeper: "Why might a story start a trip up high instead of down below?" },
      { label: "Yosemite", ask: "Our summary says Yosemite is in California, and nothing more. What would you want to look at first?",
        deeper: "What is one thing you would need to see with your own eyes before you could describe it?" },
      { label: "John Muir", ask: "Our summary calls him a nature conservationist. What do you think such a person does all day?",
        deeper: "Who takes care of the trees and animals near your home?" },
      { label: "Teddy Roosevelt", ask: "Our summary calls him a US President. What does a president do?",
        deeper: "Why might a president leave his work and walk into the woods?" },
      { label: "A Historic Trip", ask: "Historic means people remember it later. What makes a day worth remembering?",
        deeper: "Our summary never says why this trip is historic. Where can you find out?" },
      { label: "Me", ask: "If you could walk through the woods with any two people, whom would you take?",
        deeper: "What one question would you ask them on the way, and why that one?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Time",
    relatedConcepts: ["Nature", "Journey", "Memory"],
    globalContext: "Orientation in space and time — 옛날에 있었던 하루가 어떻게 지금까지 기억되는가",
    statement: "A walk through the woods can be remembered long afterward, even when our records do not say why.",
    factual: [
      "What whisks Jack and Annie back in time, and where do they land?",
      "Whom do they join, and what is each man called?",
      "What kind of trip do they go on, and where does it go?"
    ],
    conceptual: [
      "What makes one ordinary day become a historic day?",
      "What is the difference between taking care of nature and simply enjoying it?"
    ],
    debatable: [
      "Is it better to see a forest with your own eyes or to read about it?",
      "Who should take care of the woods — every person, or the leaders of a country?"
    ],
    learnerProfile: ["Inquirer", "Thinker", "Caring"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "역사에 남을 숲길 여행을 한다" 까지만 말한다. 여행에서 무슨 일이 있었는지 적혀 있지 않으므로,
    // 줄거리 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "Jack and Annie land in the tallest tree and then join two men on a trip through the woods. Would you rather stay up in the tallest tree or walk the woods? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "한쪽만 고를 것 · Choose just one side",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Up in the Tree or Into the Woods", lines: 1 },
      { part: "P — Point",       ask: "Which one do you choose? Say it in one clear sentence.",
        eg: "I would walk through the woods with Jack and Annie.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "They join two men on a historic trip through the woods.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the woods are where the trip really begins.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some would stay in the tallest tree to see far, but I want to walk.", lines: 2 },
      { part: "L — Link",        ask: "Say your choice again in different words.",
        eg: "For this reason, I would climb down and follow the path.", lines: 2 }
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
      en: "Students retell how the magic tree house whisks Jack and Annie into the tallest tree in Yosemite, California, where they join a nature conservationist and a US President on a historic trip through the woods; they say clearly what our sources do not tell them, and then choose the tree or the woods and defend the choice.",
      ko: "마법의 나무 집이 잭과 애니를 캘리포니아 요세미티에서 가장 큰 나무로 데려가고, 거기서 자연을 지키는 사람과 미국 대통령과 함께 역사에 남을 숲길 여행을 한다는 흐름을 말하고, 우리 자료가 말해 주지 않는 것이 무엇인지 스스로 짚은 뒤, 나무 위와 숲길 가운데 하나를 골라 그 까닭을 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이고, 그 양이 아주 적다.
    // 그래서 이 수업의 절반은 '모르는 것을 모른다고 말하는 연습' 이다.
    // ★ 존 뮤어와 루스벨트의 생애·업적·연도·국립공원 이야기는 이 수업에서 꺼내지 않는다. 근거에 없다.
    //   아이가 물으면 "우리 자료는 두 마디만 알려 준다 — 자연을 지키는 사람, 그리고 미국 대통령" 이라고
    //   그대로 답하고 책으로 보낸다. 선생님이 아는 것을 채워 넣으면 이 수업이 무너진다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "Have you ever taken a trip through the woods? Tell me one thing you saw.",
        do: "책을 펴기 전에 한다. 장서 자료가 이 책에 붙여 둔 물음이다. 서너 명만.",
        exp: "I saw a squirrel. / It was very quiet. / The path was muddy.",
        stuck: "선생님이 먼저 한 문장 한다. \"I once walked in the woods and heard only birds.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Camp Time in California.\" Three ideas. What does each one make you picture?",
        do: "제목 낱말만 푼다. 줄거리는 말하지 않는다 — 우리도 모른다. camp 는 요약에 한 번도 나오지 않는다는 것을 기억해 둔다.",
        exp: "Camping is sleeping outside. / California is far away. / Time means it is time to go.",
        stuck: "표지를 가리킨다. \"Look at the cover. Where are they?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "역사에 남을 → historic / 함께하다 → join / 휙 데려가다 → whisk",
        stuck: "예문을 읽어 준다." },

      { stage: "Word List", min: "",
        say: "Tallest. Not tall — tallest. What does that one extra ending tell you?",
        do: "오늘 문법(최상급)과 곧장 이어지는 낱말이다. 여기서 한 번 짚어 두면 문법 시간이 빨라진다.",
        exp: "It means more than all the others. / It is the biggest one.",
        stuck: "교실에서 가장 키 큰 아이를 가리킨다. \"Who is the tallest here?\"" },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Grammar", min: "20~30분",
        say: "The tree house whisks. Jack and Annie land. One gets an -s, two do not. Say both out loud.",
        do: "칠판에 두 줄로 나란히 쓴다. 근거 문장에 실제로 있는 짜임이라 예문을 지어낼 필요가 없다.",
        exp: "whisks has -s because it is one tree house. Land has none because they are two.",
        stuck: "주어에 동그라미를 치고 \"One? Or two?\" 만 묻는다." },

      { stage: "Comprehension", min: "30~45분",
        say: "Turn the question into the first half of your answer. 'Whom do they join...' becomes 'They join...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They join John Muir, a nature conservationist, and Teddy Roosevelt, a US President.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "Our paper calls it a historic trip. It never says why. That blank is not a mistake.",
        do: "이 수업에서 가장 중요한 한 마디다. 모르는 것을 모른다고 말하는 본보기를 선생님이 먼저 보인다. 아는 척 채워 주지 않는다.",
        exp: "(아이가 '그럼 왜 역사에 남아요?' 라고 묻는다. 그때 \"You read the book and tell me\" 한 마디면 된다)",
        stuck: "\"Our paper stops after 'through the woods.' The book keeps going. You go with it.\"" },

      { stage: "Summary Map", min: "45~55분",
        say: "Somebody — Wanted — But — So — Then. Five boxes. Today only the first one is filled.",
        do: "다섯 칸을 손가락으로 짚는다. 한 칸만 차 있는 것을 아이 눈으로 보게 한다.",
        exp: "Somebody: Jack and Annie — 나머지 네 칸은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story?\" 첫 칸만." },

      { stage: "Summary Map", min: "",
        say: "Four boxes are empty. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those four boxes tomorrow.\"" },

      { stage: "Mind Map", min: "55~65분",
        say: "Top lines first, and go fast. Those answers are in our summary.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (A Historic Trip)", min: "",
        say: "Stop at 'A Historic Trip.' This is a guess, and a guess is allowed — as long as you call it a guess.",
        do: "→ 칸에서 반드시 멈춘다. 추측과 사실을 가르는 연습이 여기서 일어난다. 선생님도 답을 모른다고 말한다.",
        exp: "I guess it was historic because two famous people walked together, but I am not sure.",
        stuck: "\"Say it like this: 'I guess..., because...' Then we check it in the book.\"" },

      { stage: "IB Inquiry", min: "65~75분",
        say: "Step 1, our summary answers it. Step 2, the summary helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "Writing", min: "75~85분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다. 반박(Counter) 칸에서 대부분 멈추니 짝과 서로 반대편을 말하게 한다.",
        exp: "Some would stay in the tallest tree to see far, but I want to walk.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "85~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "Which two famous people do Jack and Annie join in Yosemite?", ko: "잭과 애니는 요세미티에서 유명한 두 사람과 함께해. 누구일까?" },
        { en: "Have you ever taken a trip through the woods?", ko: "숲길을 걸어 본 적 있니?" },
        { en: "What would you like to see on a trip through Yosemite?", ko: "요세미티를 걷는다면 무엇을 보고 싶니?" }
      ],
      during: [
        { en: "Has the trip through the woods started yet? Who is leading?", ko: "숲길 여행이 시작됐니? 누가 앞장서고 있니?" },
        { en: "What is Jack writing in his notebook this time?", ko: "잭은 이번에 공책에 무엇을 적고 있니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "Why was the trip through the woods historic? Our paper never said.", ko: "그 숲길 여행은 왜 역사에 남았니? 우리 자료는 끝내 말해 주지 않았어." },
        { en: "The title says camp. What did camping have to do with it?", ko: "제목에 camp 가 있어. 야영이 이야기와 무슨 상관이었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "whisk · tallest · historic 세 낱말은 근거 한 줄에 실제로 있는 말이다. 꼭 짚는다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Grammar",       point: "whisks(하나) / land·join(둘)을 나란히 쓴다. 근거 문장 그대로라 예문을 더 만들 필요가 없다.", miss: "최상급에서 the 를 빠뜨린다. the tallest 를 통째로 외우게 한다." },
      { sheet: "Comprehension", point: "뒤쪽 세 문항은 빈칸이 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 존 뮤어와 루스벨트에 대해 아는 것을 대신 채워 준다. 우리 자료에 없는 말이면 이 수업에서는 꺼내지 않는다." },
      { sheet: "Summary Map",   point: "Wanted·But·So·Then 네 칸은 비어 있는 게 맞다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'A Historic Trip' 가지에서 반드시 멈춘다. 추측은 추측이라고 말하게 한다.", miss: "추측을 사실처럼 적는다. 'I guess' 를 붙이게 한다." },
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
  // 근거(장서 요약 한 줄 · 주제어 · 책 제목)가 말하는 것만 우리 말로 다시 쓴 글이다.
  // 이 책은 첫 문장이 남아 있지 않아, 책의 첫 줄로 시작하지 않는다.
  // 근거가 결말도, 왜 역사에 남는 여행인지도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "마법 나무집이 잭과 애니를 요세미티에서 가장 큰 나무로 데려가, 자연을 지키는 사람과 미국 대통령과 함께 숲길을 걷는 이야기",
    text: "The [[wonderful|magic]] tree house [[carried|whisked]] Jack and Annie [[to long ago|back in time]]. They [[came down|landed]] in the [[highest|tallest]] tree in Yosemite, California. There they [[went along with|joined]] two men. One was John Muir, who [[looks after|conserves]] nature. One was Teddy Roosevelt, a US [[leader|President]]. Together they walked on a [[long-remembered|historic]] trip through the [[forest|woods]]. Why was that walk historic? Our [[papers|records]] do not say. Open the book and find out."
  }
};
