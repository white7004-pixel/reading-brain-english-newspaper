// 리딩브레인 원서프로그램 — A갈래(9단계) 책 (AR 3.1)
// Tigers at Twilight (Magic Tree House #19) — 우리는 이 책을 읽지 않았다.
// .superpowers/book/S3263.json 에 모아 둔 근거(학원 장서 목록 한 줄 요약 · 오픈라이브러리
// 출판사 소개글 · 첫 문장 · 주제어 목록)만으로 만들었다. 그 밖의 인물 이름·지명·물건·
// 장면·결말은 한 줄도 쓰지 않았다. 근거가 말하지 않는 자리는 지어내지 않고 비워 두어
// 아이가 책을 읽고 채우게 했다.
// 근거가 말하는 것은 딱 여기까지다:
//   잭과 애니 / 마법의 나무 집이 둘을 인도(India)로 데려간다 /
//   둘은 개 테디(Teddy)를 주문(spell)에서 풀어 줄 선물(a gift)을 구하러 간다 /
//   그곳에서 호랑이 한 마리와, 사라져 가는 정글 동물들이 얽힌 모험을 겪는다 /
//   책의 첫 문장은 "Jack and Annie walked past the Frog Creek woods on their way home from the library."
// 선물이 무엇인지도, 테디가 풀려났는지도, 결말도 근거가 말하지 않는다. 장서 요약은
// "선물을 구하러 간다"에서, 소개글은 "have adventures involving a tiger and other
// endangered jungle animals"에서 끊긴다. 그래서 비워 두었다.
// 10권과 달리 이 책의 근거에는 모건(Morgan)이 한 번도 나오지 않는다. 그래서 쓰지 않았다.
// 두 아이의 나이도, 누가 손위인지도 근거가 말하지 않아 쓰지 않았다.
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  bookNo: "S3263",
  slug: "magic-tree-house-tigers-at-twilight",
  title: "Tigers at Twilight",
  author: "Mary Pope Osborne",
  series: "Magic Tree House #19",
  // rb 단계는 책의 사실이 아니라 우리 학원의 분류다. 같은 시리즈 10권(AR 3.0)이 정독 1단계라 그에 맞췄다.
  level: { ar: "3.1", lexile: "510L", rb: "정독 1단계" },
  cover: "https://covers.openlibrary.org/b/id/424177-M.jpg",
  awards: [],

  evidence: {
    by: "학원 장서 목록의 한 줄 요약을 바닥으로 삼고, 오픈라이브러리 출판사 소개글·첫 문장·주제어 목록을 겹쳐 보았다. 사람의 기억은 근거로 쓰지 않았다",
    source: "학원 장서 목록 S3263 요약 + 오픈라이브러리 /works/OL81834W (소개글 · 첫 문장 \"Jack and Annie walked past the Frog Creek woods on their way home from the library.\" · 주제어 Jungle animals/Magic/Tigers/Endangered species/India/Space and time/Dogs/Tree houses · 장소 India · 76쪽 · 1999년)",
    characters: ["Jack", "Annie", "Teddy (a dog under a spell)", "a tiger", "other endangered jungle animals"],
    beats: [
      "the magic tree house takes Jack and Annie to India",
      "they are on a mission to get a gift to help free the dog Teddy from a spell",
      "in India they have adventures involving a tiger and other endangered jungle animals"
    ],
    ending: "근거에 결말이 없다. 장서 요약은 \"선물을 구해 테디를 주문에서 풀어 주려 한다\"에서 멈추고, 소개글은 \"have adventures involving a tiger and other endangered jungle animals\"에서 끊긴다. 그 선물이 무엇인지, 두 아이가 그것을 구했는지, 테디가 풀려났는지, 어떻게 집으로 돌아가는지는 어느 출처도 말하지 않는다. 그래서 비워 둔다",
    checked: "장서 요약(\"takes Jack and Annie to India\", \"a mission to get a gift\", \"free the dog Teddy from a spell\", \"Book #19\")과 소개글(\"Having used their magic tree house to travel to India\", \"a tiger and other endangered jungle animals\")을 한 줄씩 맞춰 보았고 어긋나는 곳이 없었다. 소개글에만 있는 것(호랑이 · 사라져 가는 정글 동물들)은 요약과 부딪히지 않아 남겼다. 주제어 Jungle animals/Tigers/Endangered species/India/Dogs/Tree houses/Space and time 이 같은 것을 가리켜 한 번 더 받쳐 주었다. 첫 문장에 나오는 Frog Creek woods 와 the library 는 오픈라이브러리에 적힌 그대로만 썼다. 10권 소개글에 있던 모건(Morgan)은 이 책 근거 어디에도 없어 한 번도 쓰지 않았다. 주제어에 Spanish language materials 가 있으나 이는 번역본에 관한 것이라 학습지에 쓰지 않았다 (2026-09-30)",
  },

  // 낭독 영상 — 유튜브에서 찾아 붙였다 (2026-09-30). 영상을 내려받지 않고 유튜브가 그대로 재생한다.
  shadowing: {
    query: "\"Tigers at Twilight\" read aloud",
    searchUrl: "https://youtu.be/RrWJrwNZqEI",
    videos: [
      { url: "https://youtu.be/RrWJrwNZqEI", title: "Magic Tree House | #19 Tigers at Twilight | MARY POPE OSBORNE | New York Times Bestselling",
        channel: "EUNICE books and words", views: "9,584", length: "39:28" },
      { url: "https://youtu.be/RByhb4qwnKU", title: "Magic Treehouse: Tigers at Twilight Chapters 1 2 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "254", length: "7:00" },
      { url: "https://youtu.be/_yXA39UEUvo", title: "Magic Treehouse: Tigers at Twilight Chapters 8, 9, 10 by Mary Pope Osborne",
        channel: "CMRLS Libraries", views: "211", length: "10:16" }
    ]
  },

  // ── ① 단어 ─────────────────────────────────────────────
  // 낱말은 제목·요약·소개글·첫 문장·주제어에 실제로 나오는 말에서만 골랐다.
  // 예문(ex)은 우리가 지은 보기 문장이다. 책에서 따온 문장이 아니다.
  vocabulary: [
    { word: "tiger",      pos: "n.",   en: "a very large wild cat with orange fur and black stripes", ko: "호랑이",
      ex: "Jack and Annie have an adventure with a {{tiger}}.", ex_ko: "잭과 애니는 호랑이와 얽힌 모험을 해요.", pic: "🐯" },
    { word: "twilight",   pos: "n.",   en: "the soft, dim light at the end of the day, after the sun goes down", ko: "황혼, 땅거미",
      ex: "The title of this book is \"Tigers at {{Twilight}}.\"", ex_ko: "이 책의 제목은 '황혼의 호랑이들'이에요.", pic: "🌆" },
    { word: "jungle",     pos: "n.",   en: "a thick, wet forest in a hot country, full of trees and animals", ko: "정글, 밀림",
      ex: "They meet {{jungle}} animals in India.", ex_ko: "그들은 인도에서 정글 동물들을 만나요.", pic: "🌴" },
    { word: "spell",      pos: "n.",   en: "magic words that change someone or hold them under their power", ko: "주문, 마법",
      ex: "The dog Teddy is under a {{spell}}.", ex_ko: "개 테디는 주문에 걸려 있어요.", pic: "🪄" },
    { word: "free",       pos: "v.",   en: "to let someone out of something that is holding them", ko: "풀어 주다, 자유롭게 하다",
      ex: "They want to {{free}} Teddy from the spell.", ex_ko: "그들은 테디를 주문에서 풀어 주고 싶어 해요.", pic: "🔓" },
    { word: "gift",       pos: "n.",   en: "something you give to another person; a present", ko: "선물",
      ex: "Jack and Annie must get a {{gift}}.", ex_ko: "잭과 애니는 선물을 하나 구해야 해요.", pic: "🎁" },
    { word: "mission",    pos: "n.",   en: "an important job that someone is sent out to do", ko: "임무",
      ex: "They are on a {{mission}} to help Teddy.", ex_ko: "그들은 테디를 돕기 위한 임무 중이에요.", pic: "🎯" },
    { word: "endangered", pos: "adj.", en: "in danger of dying out, so that no more of them are left", ko: "멸종 위기의",
      ex: "The story is about {{endangered}} jungle animals.", ex_ko: "이 이야기는 멸종 위기의 정글 동물들에 관한 거예요.", pic: "🦏" },
    { word: "adventure",  pos: "n.",   en: "an exciting trip or experience, often with some danger in it", ko: "모험",
      ex: "Jack and Annie have an {{adventure}} in India.", ex_ko: "잭과 애니는 인도에서 모험을 해요.", pic: "🧭" },
    { word: "library",    pos: "n.",   en: "a building where books are kept for people to read or borrow", ko: "도서관",
      ex: "They walked home from the {{library}}.", ex_ko: "그들은 도서관에서 집으로 걸어왔어요.", pic: "📚" }
  ],

  // ── 문법 ───────────────────────────────────────────────
  // 보기 문장은 우리가 지었다. 책에서 따온 문장이 아니다 — 다만 담긴 사실은 근거 안의 것뿐이다.
  // walked 만은 책의 첫 문장("Jack and Annie walked past the Frog Creek woods...")이라 그대로 쓴다.
  grammar: {
    points: [
      { name: "a / an", ko: "부정관사",
        sent: "Jack and Annie had [[an]] adventure with [[a]] tiger.",
        why_ko: "모음 소리(아·에·이·오·우) 앞에는 an, 나머지는 a! 철자가 아니라 '소리'로 정해요. an adventure, a tiger.",
        why: "Use \"a\" before a consonant sound, and \"an\" before a vowel sound (a, e, i, o, u).",
        try: "I saw {{a}} jungle and {{an}} endangered animal." },
      { name: "Past Simple (-ed)", ko: "과거형",
        sent: "Jack and Annie [[walked]] past the Frog Creek woods and [[traveled]] to India.",
        why_ko: "이미 끝난 일은 동사 뒤에 -ed 를 붙여요. walk → walked, travel → traveled.",
        why: "Add -ed to the verb for something that already finished.",
        try: "Yesterday I {{walked}} home and {{opened}} my book." },
      { name: "to + 동사원형", ko: "to부정사 (왜 하는지)",
        sent: "They are on a mission [[to get]] a gift [[to help]] free Teddy.",
        why_ko: "'왜 그렇게 하는지'를 말할 때 to + 동사원형을 써요. to get = 구하려고, to help = 도우려고.",
        why: "Use to + base verb to say WHY someone does something.",
        try: "I opened the book {{to read}} the story and {{to find}} the answer." }
    ],
    find: "책에서 -ed 로 끝나는 과거형 동사를 세 개 찾아 쓰세요. · Find three verbs ending in -ed.",
    exam: {
      choose: [
        { q: "Jack and Annie have (a / an) adventure in India.", a: "an",
          why_ko: "adventure 는 '어'로 모음 소리로 시작해요. 모음 소리 앞에는 an!" },
        { q: "They meet (a / an) tiger in the jungle.", a: "a",
          why_ko: "tiger 는 '타'로 자음 소리로 시작해요. 자음 소리 앞에는 a!" },
        { q: "Jack and Annie (walk / walked) past the Frog Creek woods.", a: "walked",
          why_ko: "책의 첫 문장이 walked 예요. 이미 일어난 일이라 과거형이에요." },
        { q: "The magic tree house (take / took) them to India.", a: "took",
          why_ko: "take 는 불규칙 동사예요. 과거형은 taked 가 아니라 took!" },
        { q: "They are on a mission (get / to get) a gift.", a: "to get",
          why_ko: "'구하려고'라는 목적이에요. to + 동사원형을 써서 to get!" }
      ],
      fix: [
        { q: "Jack and Annie [[travel]] to India in this book.", a: "traveled",
          why_ko: "이미 일어난 일이에요. travel 에 -ed 를 붙여 traveled 로 고쳐요." },
        { q: "They want [[free]] Teddy from a spell.", a: "to free",
          why_ko: "want 뒤에는 to + 동사원형이 와요. free 가 아니라 to free!" },
        { q: "The magic tree house [[take]] Jack and Annie to India.", a: "took",
          why_ko: "지난 일이니 과거형이에요. take 의 과거형은 took." }
      ],
      write: [
        { ko: "잭과 애니는 도서관에서 집으로 걸어왔다.", cond: "walk, 과거형, home from", a: "Jack and Annie walked home from the library.",
          why_ko: "'걸어왔다'는 walk 에 -ed 를 붙여 walked. 뒤에 home from the library 를 붙여요." },
        { ko: "그들은 테디를 풀어 주려고 선물을 구해야 한다.", cond: "must, get, to help", a: "They must get a gift to help free Teddy.",
          why_ko: "'~해야 한다'는 must + 동사원형. '풀어 주려고'는 to help free 로 목적을 나타내요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  // ref 에 장(chapter) 번호를 쓰지 않는다. 우리는 어느 장에서 무슨 일이 일어나는지 확인하지 않았다.
  comprehension: [
    { ref: "장서 요약", skill: "사실찾기", q: "Who are the two children in this story, and what takes them to India?",
      frame: "They are {{Jack and Annie}}, and {{the magic tree house}} takes them there." },
    { ref: "장서 요약", skill: "사실찾기", q: "What country do Jack and Annie travel to in this book?",
      frame: "They travel to {{India}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "Who is Teddy, and what is wrong with him?",
      frame: "Teddy is {{a dog}}, and he is under {{a spell}}." },
    { ref: "장서 요약", skill: "사실찾기", q: "What are Jack and Annie on a mission to get, and why?",
      frame: "They must get {{a gift}}, to help {{free Teddy from a spell}}." },
    { ref: "책 소개글", skill: "사실찾기", q: "What kinds of animals are in Jack and Annie's adventures in India?",
      frame: "They have adventures with {{a tiger}} and other {{endangered jungle animals}}." },
    { ref: "책 제목", skill: "어휘", q: "The title is \"Tigers at Twilight.\" What does \"twilight\" mean, and why might a jungle feel different then?",
      frame: "Twilight means {{the dim light at the end of the day}}. I think a jungle feels {{                    }} then." },
    { ref: "내 생각", skill: "평가·적용", q: "Jack and Annie go a long way to help one dog. Would you travel that far to help an animal? Say why.",
      frame: "I {{would / would not}} go, because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 (화면에서 푼다) ──────────────────────────
  // 정답도 오답 셋도 모두 근거 안에서 가릴 수 있게 만들었다.
  quiz: [
    { q: "Who are the two children who travel in this book?",
      a: ["Jack and Annie", "Jack and Teddy", "Annie and a tiger", "Two jungle guides"], c: 0,
      why_ko: "잭과 애니예요. 장서 요약이 \"takes Jack and Annie to India\" 라고 분명히 말해요.",
      why: "Jack and Annie. The catalog summary names them directly." },
    { q: "How do Jack and Annie travel in this book?",
      a: ["In a magic tree house", "On an elephant", "By plane", "By boat"], c: 0,
      why_ko: "마법의 나무 집이에요. 소개글이 \"Having used their magic tree house to travel to India\" 라고 적고 있어요.",
      why: "The magic tree house — \"Having used their magic tree house to travel to India.\"" },
    { q: "What country does the magic tree house take them to?",
      a: ["India", "Japan", "Egypt", "Peru"], c: 0,
      why_ko: "인도(India)예요. 요약과 소개글이 둘 다 India 라고 하고, 주제어의 장소도 India 하나뿐이에요.",
      why: "India. Both the summary and the description say India, and it is the only listed place." },
    { q: "Who is Teddy in this story?",
      a: ["A dog", "A tiger", "A boy in the jungle", "Jack and Annie's teacher"], c: 0,
      why_ko: "개예요. 장서 요약이 \"the dog Teddy\" 라고 써 두었어요.",
      why: "A dog. The summary calls him \"the dog Teddy.\"" },
    { q: "What is holding Teddy?",
      a: ["A spell", "A rope", "A cage", "A river"], c: 0,
      why_ko: "주문(spell)이에요. 요약도 소개글도 \"free the dog Teddy from a spell\" 이라고 해요.",
      why: "A spell — \"free the dog Teddy from a spell.\"" },
    { q: "What must Jack and Annie get to help free Teddy?",
      a: ["A gift", "A key", "A map", "A magic word"], c: 0,
      why_ko: "선물(a gift)이에요. \"a mission to get a gift to help free the dog Teddy\" 라고 적혀 있어요.",
      why: "A gift — \"a mission to get a gift to help free the dog Teddy.\"" },
    { q: "Which big animal is part of their adventures in India?",
      a: ["A tiger", "A polar bear", "A whale", "A camel"], c: 0,
      why_ko: "호랑이예요. 소개글이 \"adventures involving a tiger\" 라고 하고, 제목도 Tigers at Twilight 예요.",
      why: "A tiger — \"adventures involving a tiger,\" and the title is \"Tigers at Twilight.\"" },
    { q: "How does the description describe the other jungle animals?",
      a: ["Endangered", "Friendly", "Sleepy", "Tame"], c: 0,
      why_ko: "소개글이 고른 낱말이 endangered 예요. 주제어 목록에도 Endangered species 가 있어요.",
      why: "The description's own word is \"endangered,\" and \"Endangered species\" is a listed subject." },
    { q: "What does the word \"twilight\" in the title mean?",
      a: ["The dim light at the end of the day", "The middle of the night", "Early morning", "Noon"], c: 0,
      why_ko: "twilight 은 해가 진 뒤 아직 조금 밝은 저녁 무렵이에요. 제목 Tigers at Twilight 은 '황혼의 호랑이들' 이라는 뜻이에요.",
      why: "Twilight is the dim light after sunset. The title means \"tigers at dusk.\"" },
    { q: "What is the first sentence of this book?",
      a: ["\"Jack and Annie walked past the Frog Creek woods on their way home from the library.\"", "\"Jack couldn't sleep.\"", "\"The jungle was very quiet.\"", "\"Annie opened the tree house window.\""], c: 0,
      why_ko: "첫 문장은 \"Jack and Annie walked past the Frog Creek woods on their way home from the library.\" 예요. 오픈라이브러리에 그대로 적혀 있어요.",
      why: "That is the recorded first line, exactly as Open Library has it." },
    { q: "In the first sentence, where are Jack and Annie coming home from?",
      a: ["The library", "School", "The jungle", "A friend's house"], c: 0,
      why_ko: "도서관이에요. 첫 문장이 \"on their way home from the library\" 라고 말해요.",
      why: "The library — \"on their way home from the library.\"" },
    { q: "What are the woods in the first sentence called?",
      a: ["The Frog Creek woods", "The Twilight woods", "The Tiger woods", "The Teddy woods"], c: 0,
      why_ko: "Frog Creek woods 예요. 첫 문장에 그대로 나오는 이름이에요.",
      why: "The Frog Creek woods, named in the first sentence." },
    { q: "Which number is this book in the Magic Tree House series?",
      a: ["#9", "#10", "#19", "#29"], c: 2,
      why_ko: "19권이에요. 장서 목록 제목이 \"#19. Tigers at Twilight\" 이고 요약 끝에도 Book #19 라고 적혀 있어요.",
      why: "Book #19 — the catalog title is \"#19. Tigers at Twilight.\"" },
    { q: "Which of these does our information NOT tell us about this book?",
      a: ["Where Jack and Annie go", "Who Teddy is", "What the gift is", "What animals they meet"], c: 2,
      why_ko: "선물이 무엇인지예요. 우리가 가진 글은 '선물을 구하러 간다' 에서 멈춰요. 그게 무엇인지는 책을 읽어야 알 수 있어요.",
      why: "What the gift is. Our sources stop at \"a mission to get a gift.\"" }
  ],

  // ── ③ 요약 지도 (서술형) ───────────────────────────────
  // 근거가 말하지 않는 칸(문제·결말)은 채우지 않았다. 아이가 책을 읽고 채운다.
  summaryMap: {
    setting: { place: "{{India — the jungle}}", time: "{{               }}" },   // 몇 년인지는 근거가 말하지 않는다
    swbst: [
      { k: "Somebody", v: "{{Jack and Annie}}" },
      { k: "Wanted",   v: "{{to get a gift to help free Teddy from a spell}}" },
      { k: "But",      v: "{{                    }}" },   // 무엇이 두 아이를 막았는지는 근거가 말하지 않는다. 아이가 책에서 가져온다
      { k: "So",       v: "{{                    }}" },
      { k: "Then",     v: "{{                    }}" }
    ],
    scenes: [
      { label: "Frog Creek",
        given: "The book begins, \"Jack and Annie walked past the Frog Creek woods on their way home from the library.\"",
        frame: "They were walking home from {{the library}}, past {{the Frog Creek woods}}." },
      { label: "The Tree House",
        given: "",
        frame: "The magic tree house takes them to {{India}}." },
      { label: "The Mission",
        given: "",
        frame: "They must get {{a gift}} to help free {{the dog Teddy}} from {{a spell}}." },
      { label: "The Jungle",
        given: "",
        frame: "There they have adventures with {{a tiger}} and other {{endangered jungle animals}}." },
      { label: "The Ending",
        given: "우리 자료는 여기까지만 말한다. 책을 읽고 네가 채워라.",
        frame: "In the end, {{                    }}." }
    ]
  },

  // ── ④ 마인드맵 (생각 고도화) ───────────────────────────
  mindMap: {
    center: "Tigers at Twilight",
    branches: [
      { label: "Jack & Annie",  ask: "The book opens with Jack and Annie walking home from the library. What are they doing right before the adventure starts?",
        deeper: "Why do you think a story like this so often begins on an ordinary, quiet day?" },
      { label: "The Tree House", ask: "What does the magic tree house do for Jack and Annie this time?",
        deeper: "Why do you think the tree house chose India for this mission?" },
      { label: "Teddy",          ask: "Teddy is a dog under a spell. What does that make you want to ask about him?",
        deeper: "Why would a story make the person you are helping unable to speak for himself?" },
      { label: "The Gift",       ask: "Jack and Annie must get a gift to help free Teddy. What kind of gift could break a spell?",
        deeper: "Why do you think the story makes them travel far to find it, instead of just handing it to them?" },
      { label: "The Tiger",      ask: "The title is \"Tigers at Twilight.\" How would you feel meeting a tiger as the light fades?",
        deeper: "Is something frightening always something dangerous? Say why." },
      { label: "Endangered",     ask: "The jungle animals in this book are called endangered. What does that word tell you about them?",
        deeper: "Whose job is it to look after animals that are disappearing? Say why you think so." },
      { label: "Me",             ask: "If the tree house came for you, would you ask it for the jungle? Why or why not?",
        deeper: "What would you want to see there, and what would you be careful about?" }
    ]
  },

  // ── ⑤ IB 탐구 (Factual → Conceptual → Debatable) ───────
  ib: {
    keyConcept: "Relationships",
    relatedConcepts: ["Survival", "Courage", "Responsibility"],
    globalContext: "Globalization and sustainability — 사람과 야생 동물은 같은 땅에서 어떻게 함께 사는가",
    statement: "Helping someone who cannot help himself can carry you far from home, and into the world of other living things.",
    factual: [
      "Where does the magic tree house take Jack and Annie, and why?",
      "Who is Teddy, and what must Jack and Annie get for him?",
      "What kinds of animals are in their adventures there?"
    ],
    conceptual: [
      "What does it mean for an animal to be endangered?",
      "What is the difference between an exciting animal and a dangerous one?"
    ],
    debatable: [
      "Should people work to save animals that are disappearing?",
      "Is it right to go somewhere dangerous in order to help one friend?"
    ],
    learnerProfile: ["Caring", "Inquirer", "Risk-taker"]
  },

  // ── ⑥ 논술형 (PEEL + 조건제시형 + 채점 자기점검) ───────
  essay: {
    // 근거는 "선물을 구하러 간다" 까지만 말한다. 두 아이가 그것을 구했는지는 적혀 있지
    // 않으므로, 그 판단이 아니라 아이 자신의 생각을 묻는 물음으로 세웠다.
    prompt: "In India, Jack and Annie meet a tiger and other endangered jungle animals. Should people work to save animals that are disappearing? Write your opinion.",
    conditions: [
      "5문장 이상 쓸 것 · Write at least 5 sentences",
      "yes 또는 no 를 분명히 할 것 · Say yes or no clearly",
      "because 를 한 번 이상 쓸 것 · Use \"because\" at least once",
      "잭과 애니의 이야기에서 한 가지를 넣을 것 · Use one thing from the story"
    ],
    steps: [
      { part: "Title",           ask: "What is your writing about?",
        eg: "Room for the Tiger", lines: 1 },
      { part: "P — Point",       ask: "What is your opinion? Say it in one clear sentence.",
        eg: "I think people should work to save endangered animals.", lines: 2 },
      { part: "E — Evidence",    ask: "What happens in Jack and Annie's story? Write it.",
        eg: "In the book, Jack and Annie meet a tiger and other endangered jungle animals.", lines: 2 },
      { part: "E — Explanation", ask: "Why does that show your point?",
        eg: "This shows the jungle is full of animals that could disappear.", lines: 2 },
      { part: "C — Counter",     ask: "What would someone who disagrees say? How do you answer them?",
        eg: "Some people say a tiger is too dangerous to save, but it still needs a home.", lines: 2 },
      { part: "L — Link",        ask: "Say your opinion again in different words.",
        eg: "For this reason, I believe we must look after wild animals.", lines: 2 }
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
      en: "Students retell how the magic tree house takes Jack and Annie to India, where they must get a gift to help free the dog Teddy from a spell and have adventures with a tiger and other endangered jungle animals, then take a side on whether people should work to save endangered animals.",
      ko: "마법의 나무 집이 잭과 애니를 인도로 데려가고, 두 아이가 개 테디를 주문에서 풀어 줄 선물을 구하러 가는 길에서 호랑이와 멸종 위기의 정글 동물들을 만나는 흐름을 말하고, 사라져 가는 동물을 지키는 일에 대해 편을 정해 쓴다."
    },
    // 이 수업지는 줄거리 세부를 묻지 않는다. 우리가 확인한 것은 위의 evidence 뿐이다.
    // 아이가 책에서 더 찾아온 것은 칠판 한쪽에 적어 두고, 다음 수업의 재료로 쓴다.
    // say = 따옴표 안을 그대로 읽는다 / do = 이때 하는 행동과 그 이유
    // exp = 아이에게서 나올 답 / stuck = 그 답이 안 나올 때 던지는 다음 말
    script: [
      { stage: "Warm-up", min: "0~5분",
        say: "An animal you would travel a long way to help. Which one, and why?",
        do: "책을 펴기 전에 한다. '동물을 돕는다'를 아이 입에서 먼저 꺼내야 임무가 읽힌다. 서너 명만.",
        exp: "A dog. / A tiger. / My cat.",
        stuck: "선생님이 먼저 한 문장 한다. \"I would go far to help a hurt dog.\"" },

      { stage: "Warm-up", min: "",
        say: "The title is \"Tigers at Twilight.\" What is twilight? Why not at noon?",
        do: "제목 두 낱말만 푼다. 줄거리는 말하지 않는다.",
        exp: "Twilight is after sunset. It is darker, so it feels scarier.",
        stuck: "표지를 가리킨다. \"Look at the cover. What time of day is it?\"" },

      { stage: "Word List", min: "5~12분",
        say: "You read this page at home. Cover the meaning with your hand. I say the Korean, you say the English word.",
        do: "1장은 숙제다. 열 개 중 다섯 개만 묻는다.",
        exp: "주문 → spell / 임무 → mission / 멸종 위기의 → endangered",
        stuck: "예문을 읽어 준다." },

      { stage: "Word Test", min: "12~20분",
        say: "Number one is already done for you, in grey. Look at it first, then do the rest the same way.",
        do: "보기 칸을 먼저 보게 한다. 설명은 하지 않는다. 5분 재고 끊는다.",
        stuck: "첫 글자를 알려 준다." },

      { stage: "Comprehension", min: "20~35분",
        say: "Turn the question into the first half of your answer. 'What country...' becomes 'They travel to...'",
        do: "이 한 마디가 서술형의 전부다. 칠판에 화살표로 한 번 보여 준다.",
        exp: "They travel to India.",
        stuck: "질문을 소리 내어 읽게 한 뒤 \"Now say it as an answer.\"" },

      { stage: "Comprehension", min: "",
        say: "The book's first sentence: \"Jack and Annie walked past the Frog Creek woods on their way home from the library.\" Nothing magic yet. Why start there?",
        do: "칠판에 그 한 문장만 쓴다. 평범한 시작에서 무엇이 나오는지 보게 한다.",
        exp: "It is a normal day. / The adventure has not started yet.",
        stuck: "\"What were YOU doing five minutes before something exciting happened to you?\"" },

      { stage: "Summary Map", min: "35~45분",
        say: "Somebody — Wanted — But — So — Then. Five boxes, and the whole book is inside.",
        do: "다섯 칸을 손가락으로 짚으며 리듬처럼 외우게 한다.",
        exp: "Somebody: Jack and Annie / Wanted: to get a gift to free Teddy — But·So·Then 은 아이가 책에서 가져온다",
        stuck: "\"Who travels in this story? What are they trying to get?\" 첫 두 칸만." },

      { stage: "Summary Map", min: "",
        say: "Three boxes are empty: But, So, and Then. I cannot fill them for you. Only the book can.",
        do: "빈 칸을 지어내지 않는다는 것을 아이에게 그대로 말한다. 이 수업의 태도가 여기서 정해진다.",
        exp: "(책을 읽고 온 아이가 채운다)",
        stuck: "\"Read tonight. Bring me those three boxes tomorrow.\"" },

      { stage: "Mind Map", min: "45~55분",
        say: "Top lines first, and go fast. Those answers are in the book.",
        do: "윗줄은 5분 안에 끝낸다.",
        stuck: "한 가지를 골라 같이 채운다." },

      { stage: "Mind Map (The Gift)", min: "",
        say: "Stop at The Gift. Don't just tell me they look for a present — tell me what kind of gift could break a spell.",
        do: "→ 칸에서 반드시 멈춘다. 여기가 오늘의 핵심이다.",
        exp: "Something the spell cannot stand. / Something only a friend would bring.",
        stuck: "\"You told me what they do. Now — why would a GIFT free anyone?\"" },

      { stage: "IB Inquiry", min: "55~65분",
        say: "Step 1, the book answers it. Step 2, the book helps but you finish it. Step 3, only you know the answer.",
        do: "세 단의 차이를 한 번에 말한다. 칠판에 1-2-3 계단을 그려 준다.",
        stuck: "각 단에서 질문 하나씩 읽어 주고 \"Which step is this?\"" },

      { stage: "IB Inquiry", min: "",
        say: "Should people work to save animals that are disappearing? Pick a side. You cannot sit in the middle today.",
        do: "1·2단은 말로만. 3단(Debatable)만 글로 받는다.",
        exp: "I think yes, because the jungle animals in this book are endangered.",
        stuck: "손을 들게 한다. \"Save them? Or leave them alone?\"" },

      { stage: "Writing", min: "65~80분",
        say: "Read the four conditions out loud with me. If one is missing, the writing is not finished.",
        do: "조건 네 개를 같이 소리 내어 읽는다.",
        stuck: "조건을 하나씩 손가락으로 세게 한다." },

      { stage: "Writing", min: "",
        say: "The hardest box is Counter. Write what someone who disagrees with you would say. Then answer them.",
        do: "반박 칸에서 대부분 멈춘다. 짝과 서로 반대편을 말해 주게 하면 바로 풀린다.",
        exp: "Some people say a tiger is too dangerous to save, but it still needs a home.",
        stuck: "\"Some people say..., but...\" 틀만 칠판에 써 준다." },

      { stage: "Wrap-up", min: "80~90분",
        say: "One person, read only your Point sentence. Just that one.",
        do: "첫 문장만 발표시킨다. 짧게 끝내야 다음 시간이 편하다.",
        stuck: "자원자가 없으면 선생님이 한 아이의 것을 읽어 준다. 이름은 말하지 않는다." }
    ],
    booktalk: {
      before: [
        { en: "What do you already know about India and about tigers?", ko: "인도와 호랑이에 대해 이미 아는 게 있니?" },
        { en: "Have you ever taken care of or helped an animal?", ko: "동물을 돌보거나 구해 준 적이 있니?" },
        { en: "The title says twilight. Why is evening a good time for a tiger story?", ko: "제목이 황혼이라고 해. 저녁은 왜 호랑이 이야기에 어울릴까?" }
      ],
      during: [
        { en: "Teddy is under a spell. What gift do you think will free him?", ko: "테디는 주문에 걸려 있어. 어떤 선물이 그를 풀어 줄 것 같니?" },
        { en: "Which endangered jungle animals do you expect them to meet?", ko: "멸종 위기의 정글 동물 중에 누구를 만날 것 같니?" }
      ],
      after: [
        { en: "How does the story end? Tell me what our summary did not tell us.", ko: "이야기는 어떻게 끝났니? 우리 자료가 말해 주지 않은 걸 말해 줘." },
        { en: "What was the gift, and did Teddy go free?", ko: "그 선물은 무엇이었고, 테디는 풀려났니?" },
        { en: "Was the tiger frightening in the end, or something else?", ko: "끝까지 읽고 나니 그 호랑이는 무서웠니, 아니면 다른 무엇이었니?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "집에서 세 번 읽어 온 칸을 꼭 확인한다.", miss: "체크만 하고 안 읽어 온다. 한 명씩 한 단어 읽혀 본다." },
      { sheet: "Word Test",     point: "5분 제한. 못 쓴 칸은 비워 두게 한다.", miss: "철자를 몰라 멈춰 있다. 넘어가라고 미리 말해 준다." },
      { sheet: "Comprehension", point: "질문을 답의 앞부분으로 바꾸는 훈련을 먼저 시킨다.", miss: "단어 하나로 답한다. 질문을 다시 읽고 문장으로 바꾸게 한다." },
      { sheet: "Summary Map",   point: "But·So·Then 세 칸은 비어 있는 게 맞다. 아이가 책에서 가져오게 한다.", miss: "선생님이 대신 지어 채워 준다. 그러면 아이가 책을 안 읽는다." },
      { sheet: "Mind Map",      point: "'The Gift' 가지에서 반드시 멈춘다.", miss: "→ 칸에 또 줄거리를 쓴다." },
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
  // 근거가 선물의 정체도 결말도 말하지 않으므로 마지막 줄에서 아이를 책으로 보낸다.
  // [[비슷한말|책낱말]] 의 오른쪽은 근거에 실제로 나오는 말만 넣었다.
  readAloud: {
    scene: "잭과 애니가 마법 나무집을 타고 인도로 가서, 개 테디를 주문에서 풀어 줄 선물을 구하는 이야기",
    text: "Jack and Annie walked past the Frog Creek woods on their way home from the library. Then the magic tree house took them all the way to [[a land far away|India]]. They were on a [[special job|mission]]: they had to get a [[present|gift]] that would help [[set free|free]] their dog Teddy from a [[magic charm|spell]]. In India they had adventures with a [[big striped cat|tiger]] and with other [[disappearing|endangered]] [[thick forest|jungle]] animals. What was the gift? Did Teddy go free? Open the book and find out."
  }
};
