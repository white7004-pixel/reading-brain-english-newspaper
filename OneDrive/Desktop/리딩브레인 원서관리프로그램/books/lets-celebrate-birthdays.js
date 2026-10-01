// 리딩브레인 원서프로그램 — IB PYP 리더스 (Extend Education, Year 1 · Green Band)
// 논픽션이다. 책 본문·삽화·워크북 문항은 싣지 않았다. 책에 나오는 사실(나라별 생일 전통·낱말)로 문항을 새로 썼다.
// AR 지수가 없는 책이라 level.ar 은 WOW 커리큘럼 로드맵의 밴드 구간(Green 1.2~2.6)에서 잡은 값이다 (레벨 탭에 세우려고 둔다).
// {{}} 는 학생이 채우는 밑줄 칸이다.

window.BOOK = {
  slug: "lets-celebrate-birthdays",
  title: "Let's Celebrate Birthdays",
  author: "Adele Corry",
  series: "IB PYP Year 1 · Who We Are",
  publisher: "Extend Education",
  level: { ar: "1.5", lexile: "Green Band", rb: "IB PYP Y1 · WOW 로드맵 AR 1.2~2.6" },
  awards: [],
  defSource: "",
  cover: "assets/covers/lets-celebrate-birthdays.jpg",

  shadowing: { query: "\"Let's Celebrate Birthdays\" Adele Corry read aloud", searchUrl: "", qr: "", videos: [],
    // E북: 원장이 받아 온 책 내지 PDF 를 쪽 그림으로 바꿔 넣었다 (p01~p24.jpg). 0쪽은 표지.
    ebook: { dir: "assets/ebook/lets-celebrate-birthdays/", pages: 24 },
    // 출판사 낭독 음원 (원장이 받아 온 파일). 쪽별로 듣고 따라 읽는다.
    audio: [
      { title: "전체 듣기", src: "assets/audio/lets-celebrate-birthdays/read/full.mp3", pages: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] },
      { title: "Title", src: "assets/audio/lets-celebrate-birthdays/read/title.mp3", pages: [0,1] },
      { title: "p.2–3", src: "assets/audio/lets-celebrate-birthdays/read/p02.mp3", pages: [2,3] },
      { title: "p.4–5", src: "assets/audio/lets-celebrate-birthdays/read/p04.mp3", pages: [4,5] },
      { title: "p.6–7", src: "assets/audio/lets-celebrate-birthdays/read/p06.mp3", pages: [6,7] },
      { title: "p.8–9", src: "assets/audio/lets-celebrate-birthdays/read/p08.mp3", pages: [8,9] },
      { title: "p.10–11", src: "assets/audio/lets-celebrate-birthdays/read/p10.mp3", pages: [10,11] },
      { title: "p.12–13", src: "assets/audio/lets-celebrate-birthdays/read/p12.mp3", pages: [12,13] },
      { title: "p.14–15", src: "assets/audio/lets-celebrate-birthdays/read/p14.mp3", pages: [14,15] },
      { title: "p.16–17", src: "assets/audio/lets-celebrate-birthdays/read/p16.mp3", pages: [16,17] },
      { title: "p.18–19", src: "assets/audio/lets-celebrate-birthdays/read/p18.mp3", pages: [18,19] },
      { title: "p.20–21", src: "assets/audio/lets-celebrate-birthdays/read/p20.mp3", pages: [20,21] },
      { title: "p.22–23", src: "assets/audio/lets-celebrate-birthdays/read/p22.mp3", pages: [22,23] },
      { title: "p.24 Glossary", src: "assets/audio/lets-celebrate-birthdays/read/p24.mp3", pages: [24] }
    ] },

  // ── ① 단어 ─────────────────────────────────────────────
  vocabulary: [
    { word: "birthday",  pos: "n.", en: "the day of the year when you were born", ko: "생일", ex: "My {{birthday}} is in June.", ex_ko: "내 생일은 6월이에요.", pic: "🎂" },
    { word: "celebrate", pos: "v.", en: "to do something fun because a day is special", ko: "축하하다, 기념하다", ex: "We {{celebrate}} with cake and songs.", ex_ko: "우리는 케이크와 노래로 축하해요.", pic: "🎉" },
    { word: "candle",    pos: "n.", en: "a stick of wax that you light to make a small fire", ko: "초, 양초", ex: "Each {{candle}} on the cake means one year.", ex_ko: "케이크 위의 초 하나는 한 살을 뜻해요.", pic: "🕯️" },
    { word: "present",   pos: "n.", en: "something nice you give to a person on a special day", ko: "선물", ex: "I got a {{present}} from my grandma.", ex_ko: "할머니에게서 선물을 받았어요.", pic: "🎁" },
    { word: "tradition", pos: "n.", en: "something people have done the same way for a very long time", ko: "전통", ex: "Eating long noodles is a birthday {{tradition}} in China.", ex_ko: "긴 국수를 먹는 것은 중국의 생일 전통이에요.", pic: "🎎" },
    { word: "country",   pos: "n.", en: "a land with its own people and its own leaders", ko: "나라", ex: "Each {{country}} celebrates in its own way.", ex_ko: "나라마다 자기만의 방식으로 축하해요.", pic: "🗺️" },
    { word: "noodles",   pos: "n.", en: "long, thin pieces of food made from flour", ko: "국수, 면", ex: "In China, people eat long {{noodles}} on their birthday.", ex_ko: "중국에서는 생일에 긴 국수를 먹어요.", pic: "🍜" },
    { word: "sweets",    pos: "n.", en: "small sugary things to eat, like candy", ko: "사탕, 단 과자", ex: "In India, children take {{sweets}} to school.", ex_ko: "인도에서는 아이들이 학교에 단 과자를 가져가요.", pic: "🍬" },
    { word: "pull",      pos: "v.", en: "to hold something and move it toward you", ko: "잡아당기다", ex: "In Spain, friends {{pull}} your ear on your birthday.", ex_ko: "스페인에서는 생일에 친구들이 귀를 잡아당겨요.", pic: "👂" },
    { word: "born",      pos: "adj.", en: "having come into the world as a baby", ko: "태어난", ex: "I was {{born}} in October.", ex_ko: "나는 10월에 태어났어요.", pic: "👶" }
  ],

  // ── ①-2 문법 ───────────────────────────────────────────
  grammar: {
    points: [
      { name: "Present Simple", ko: "현재시제 (늘 하는 일)",
        sent: "In Mexico, people [[celebrate]] with a piñata, and everyone [[eats]] sweets.",
        why_ko: "해마다, 늘 하는 일은 현재형으로 말해요. 주어가 he·she·everyone처럼 한 사람이면 동사에 -s! people·we·they는 그대로 써요.",
        why: "Use the present simple for things people always do. Add -s when the subject is he, she, or everyone.",
        try: "In China, people {{eat}} long noodles, and my friend {{likes}} them." },
      { name: "in / on", ko: "전치사 in · on",
        sent: "[[In]] Spain, children get a tug [[on]] their birthday.",
        why_ko: "나라·달(month) 앞에는 in, 날짜·요일·생일 같은 '하루' 앞에는 on! in Korea, in June, on June 9th, on my birthday.",
        why: "Use \"in\" with countries and months. Use \"on\" with days and dates.",
        try: "My birthday is {{on}} June 9th, and I live {{in}} Korea." },
      { name: "because", ko: "이유를 말하는 because",
        sent: "I like birthdays [[because]] I see my friends.",
        why_ko: "because는 '왜냐하면'이에요. 뒤에는 꼭 '주어 + 동사'가 있는 문장이 와요. 내 생각 + because + 이유, 이 순서를 기억해요!",
        why: "\"Because\" gives the reason. After it, write a full sentence with a subject and a verb.",
        try: "People eat long noodles {{because}} they want a long life." }
    ],
    find: "책에서 나라 이름 앞에 쓰인 In 을 세 개 찾아 문장을 읽어 보세요. · Find three sentences that start with \"In\" and a country.",
    exam: {
      choose: [
        { q: "In Greece, people (have / has) two birthdays.", a: "have", why_ko: "people은 여러 사람(복수)이에요. 복수 주어에는 -s 없이 have!" },
        { q: "My sister (like / likes) birthday cake.", a: "likes", why_ko: "My sister는 한 사람(3인칭 단수)이에요. 현재형 동사에 -s를 붙여 likes!" },
        { q: "My birthday is (in / on) March 3rd.", a: "on", why_ko: "March 3rd처럼 '날짜' 앞에는 on을 써요. 달만 말할 때는 in March!" },
        { q: "(In / On) Mexico, children break a piñata.", a: "In", why_ko: "나라 이름 앞에는 in이에요. In Mexico, in Korea!" },
        { q: "I am happy (because / so) it is my birthday.", a: "because", why_ko: "생일이라는 것은 기쁜 '이유'예요. 이유 앞에는 because! so는 결과 앞에 써요." }
      ],
      fix: [
        { q: "Everyone [[celebrate]] on the same day in Vietnam.", a: "celebrates", why_ko: "everyone은 뜻은 '모두'지만 문법으로는 단수예요. 그래서 celebrates!" },
        { q: "We wear new clothes [[in]] our birthday.", a: "on", why_ko: "생일은 '하루'예요. 하루 앞에는 in이 아니라 on!" },
        { q: "I like sweets [[because of]] they are yummy.", a: "because", why_ko: "뒤에 they are yummy처럼 '주어 + 동사'가 오면 because! because of 뒤에는 명사만 와요." }
      ],
      write: [
        { ko: "나는 내 생일에 케이크를 먹는다.", cond: "eat, on my birthday", a: "I eat cake on my birthday.", why_ko: "늘 하는 일은 현재형 eat, '생일에'는 on my birthday예요." },
        { ko: "중국에서는 사람들이 긴 국수를 먹는다.", cond: "In China, long noodles", a: "In China, people eat long noodles.", why_ko: "나라 앞에는 In, 주어 people은 복수라서 eat에 -s를 붙이지 않아요." }
      ]
    }
  },

  // ── ② 독해 (서술형) ────────────────────────────────────
  comprehension: [
    { ref: "pp. 2–5", skill: "사실찾기",  q: "What is a birthday?",
      frame: "A birthday is the day when {{you were born}}." },
    { ref: "pp. 6–7", skill: "사실찾기",  q: "How many candles go on a birthday cake?",
      frame: "There is one candle for {{every year of your life}}." },
    { ref: "pp. 10–11", skill: "사실찾기", q: "Why do people in Greece have two special days?",
      frame: "One is their birthday, and the other is their {{name day}}." },
    { ref: "pp. 14–17", skill: "추론·예측", q: "Why do people in China eat long noodles on their birthday?",
      frame: "They eat long noodles because {{they hope for a long life}}." },
    { ref: "pp. 22–23", skill: "평가·적용", q: "Which birthday tradition would you like to try? Why?",
      frame: "I would like to try the tradition from {{          }} because {{                    }}." }
  ],

  // ── ②-2 북퀴즈 10문제 ──────────────────────────────────
  quiz: [
    { q: "What is a birthday?",
      a: ["The first day of school", "The day you were born", "New Year's Day", "A day with no school"], c: 1,
      why_ko: "생일은 내가 태어난 날이에요. 해마다 한 번씩 돌아오죠. 새해 첫날과 헷갈리지 마세요!",
      why: "A birthday is the day you were born. It comes once every year." },
    { q: "What does \"celebrate\" mean?",
      a: ["To feel sad", "To go to sleep", "To have fun on a special day", "To clean the house"], c: 2,
      why_ko: "celebrate는 특별한 날에 즐겁게 보내는 거예요. 케이크, 노래, 선물이 다 축하하는 방법이죠.",
      why: "To celebrate is to have fun and be happy because a day is special." },
    { q: "How many candles are on a birthday cake?",
      a: ["Always ten", "One for every year of your life", "Two for every year", "Only one"], c: 1,
      why_ko: "초는 나이만큼 꽂아요. 일곱 살이면 일곱 개! 한 살에 한 개씩이에요.",
      why: "There is one candle for each year. Seven years old means seven candles." },
    { q: "In which country do people also celebrate a name day?",
      a: ["Greece", "China", "India", "Mexico"], c: 0,
      why_ko: "그리스 사람들은 생일 말고도 '이름의 날(name day)'이 있어요. 그날 친구들에게 단 과자를 줘요.",
      why: "In Greece, people have a birthday and a name day. On the name day, they give sweets to friends." },
    { q: "What is inside a piñata?",
      a: ["Noodles", "Candles", "Water", "Sweets"], c: 3,
      why_ko: "피냐타는 종이로 만든 장난감인데 안에 사탕이 가득 들어 있어요. 깨뜨려야 사탕이 쏟아져요!",
      why: "A piñata is made of paper and filled with sweets. You break it to get them." },
    { q: "Why do people in China eat long noodles on their birthday?",
      a: ["They are cheap", "They hope for a long life", "They do not like cake", "Noodles are sweet"], c: 1,
      why_ko: "긴 국수는 '긴 삶', 오래 살라는 뜻이에요. 그렇다고 케이크를 안 먹는 건 아니에요. 케이크도 먹어요!",
      why: "Long noodles stand for a long life. People in China have birthday cakes too." },
    { q: "What happens to children in Spain on their birthday?",
      a: ["Their ear is pulled", "Their hair is cut", "They wear new shoes", "They hit a piñata"], c: 0,
      why_ko: "스페인에서는 나이만큼 귀를 살짝 잡아당겨요. 그리고 내년의 행운을 위해 한 번 더 당긴답니다.",
      why: "In Spain, you get one tug on the ear for each year, plus one more for good luck." },
    { q: "When does everyone in Vietnam celebrate their birthday?",
      a: ["On their own birthday", "On the first day of school", "At Vietnamese New Year", "In summer"], c: 2,
      why_ko: "베트남에서는 모두가 베트남 설날에 함께 한 살을 먹어요. 나라 전체의 큰 생일잔치 같아요.",
      why: "In Vietnam, everyone celebrates together at Vietnamese New Year, like one big party." },
    { q: "What do children in India do on their birthday?",
      a: ["Eat long noodles", "Pull their ears", "Break a piñata", "Wear new clothes and share sweets at school"], c: 3,
      why_ko: "인도 아이들은 새 옷을 입고, 학교에 단 과자를 가져가 친구들과 나눠요. 받는 날이 아니라 나누는 날이네요!",
      why: "In India, children wear new clothes and take sweets to school for their friends." },
    { q: "What is the big idea of this book?",
      a: ["Cake is the best food", "Only some people have birthdays",
          "People celebrate in different ways, but all show love", "Birthdays are the same everywhere"], c: 2,
      why_ko: "나라마다 방법은 다르지만, 생일을 축하하는 마음은 같아요. 사랑을 보여 주는 거죠. 이게 이 책의 중심 생각이에요.",
      why: "The ways are different, but the reason is the same: a birthday shows someone that they are loved." }
  ],

  // ── ③ 요약 지도 (논픽션: 주제 → 중심 생각 → 예 → 전하는 말) ──
  summaryMap: {
    setting: { place: "{{countries around the world}}", time: "{{once every year}}" },
    swbst: [
      { k: "Topic",     v: "{{birthdays around the world}}" },
      { k: "Main Idea", v: "{{people celebrate birthdays in different ways}}" },
      { k: "Example 1", v: "{{in Mexico, children break a piñata}}" },
      { k: "Example 2", v: "{{in China, people eat long noodles}}" },
      { k: "Message",   v: "{{a birthday shows someone that we love them}}" }
    ],
    scenes: [
      { label: "First",
        given: "The book tells what a birthday is.",
        frame: "A birthday is the day you were born, and it is a day to {{celebrate}}." },
      { label: "Middle",
        given: "",
        frame: "In Greece people have a {{name day}}, and in Spain people get a {{tug on the ear}}." },
      { label: "Last",
        given: "The book ends with a question for the reader.",
        frame: "All birthdays show {{love}}, and the book asks how {{you celebrate}}." }
    ]
  },

  // ── ④ 마인드맵 ─────────────────────────────────────────
  mindMap: {
    center: "Birthdays",
    branches: [
      { label: "Food",        ask: "What birthday foods are in the book?",
        deeper: "Why do people eat special food on special days?" },
      { label: "Traditions",  ask: "Which country has the most surprising tradition?",
        deeper: "Why do you think it started?" },
      { label: "Me",          ask: "How does your family celebrate your birthday?",
        deeper: "Which part matters most to you? Why?" },
      { label: "The World",   ask: "What is the same in every country in the book?",
        deeper: "What does that tell us about people?" }
    ]
  },

  // ── ⑤ IB 탐구 ──────────────────────────────────────────
  ib: {
    keyConcept: "Connection",
    relatedConcepts: ["Tradition", "Culture", "Identity"],
    globalContext: "Who We Are — 우리는 누구인가 (문화·전통·정체성)",
    statement: "People everywhere celebrate birthdays, but each culture shows love in its own way.",
    factual: [
      "How many candles go on a birthday cake?",
      "Why do people in Greece have two special days?",
      "What do people in Mexico do on a birthday?",
      "When does everyone in Vietnam celebrate their birthday?",
      "What do children in India do on their birthday?"
    ],
    conceptual: [
      "Why do different countries celebrate in different ways?",
      "How does a birthday bring people together?"
    ],
    debatable: [
      "Is it better to get presents or to give sweets to friends on your birthday?",
      "Should everyone in a country celebrate their birthday on the same day?"
    ],
    learnerProfile: ["Inquirer", "Open-minded", "Communicator", "Caring"]
  },

  // ── ⑥ 쓰기 ─────────────────────────────────────────────
  essay: {
    prompt: "How do you celebrate your birthday? Tell about it, and add one tradition from the book you want to try.",
    conditions: [
      "4문장 이상 쓸 것 · Write at least 4 sentences",
      "because 를 한 번 쓸 것 · Use \"because\" once",
      "책에 나온 나라를 하나 넣을 것 · Name one country from the book"
    ],
    steps: [
      { part: "Title",        ask: "What is your writing about?", eg: "My Birthday and the World", lines: 1 },
      { part: "My Birthday",  ask: "When is your birthday? What do you do?", eg: "My birthday is on May 2nd. I eat seaweed soup and cake.", lines: 2 },
      { part: "Because",      ask: "What do you like best? Why?", eg: "I like the candles best because I can make a wish.", lines: 2 },
      { part: "In the Book",  ask: "Which tradition do you want to try?", eg: "In the book, children in Mexico break a piñata. I want to try it.", lines: 2 },
      { part: "Ending",       ask: "What are birthdays for?", eg: "Birthdays are for showing love.", lines: 2 }
    ],
    expressions: [
      "My birthday is on ...",
      "I like ... best because ...",
      "In the book, people in ... ",
      "I want to try ..."
    ],
    rubric: [
      { c: "내용",  d: "내 생일 이야기를 썼나요? · Did I tell about my birthday?" },
      { c: "까닭",  d: "because 로 까닭을 말했나요? · Did I give a reason?" },
      { c: "근거",  d: "책에 나온 나라를 넣었나요? · Did I use the book?" },
      { c: "글씨",  d: "대문자와 마침표를 다시 봤나요? · Capitals and periods?" }
    ]
  },

  // ── ⑦ 교사용 (PYP 탐구 흐름: 끌어들이기 → 질문 → 읽기 → 말하기 → 쓰기 → 돌아보기) ──
  teaching: {
    goal: {
      en: "Students explain what a birthday is, compare two countries' traditions, and tell how their own family celebrates, with one reason.",
      ko: "생일이 무엇인지 말하고, 두 나라의 전통을 비교하며, 우리 가족의 생일을 까닭과 함께 말한다."
    },
    script: [
      { stage: "Hook", min: "0~8분",
        say: "Look inside my bag. A candle... a card... a party hat. What are we going to learn about today?",
        do: "생일 물건을 하나씩 꺼낸다. 답을 말해 주지 않고 아이들이 추측하게 둔다. 탐구 수업은 궁금증에서 시작한다.",
        exp: "Birthday! / Party!",
        stuck: "케이크 그림을 칠판에 그린다. \"When do we eat this?\"" },
      { stage: "Tuning In", min: "8~15분",
        say: "What do you already know about birthdays? What do you WANT to know? Tell your partner first.",
        do: "칠판을 둘로 나눠 Know / Want to know 를 적는다. 아이들 질문을 그대로 받아 적는다. 이 질문이 단원의 탐구 질문이 된다.",
        exp: "I know cake. / Do all people eat cake?",
        stuck: "선생님이 질문 하나를 먼저 낸다. \"I wonder: is a birthday the same in every country?\"" },
      { stage: "Word List", min: "15~22분",
        say: "Read the word after me. Then show me with your hands. Celebrate! Tug!",
        do: "낱말을 몸짓과 함께 익힌다. tug 는 귀를 살짝 당기는 시늉, candle 은 후 부는 시늉.",
        exp: "celebrate / candle / tradition",
        stuck: "그림 이모지를 가리키며 다시 말해 준다." },
      { stage: "Guided Reading", min: "22~35분",
        say: "Before we read: look at the title. What does 'celebrate' mean? Now read pages 2 to 9 with me.",
        do: "한 번에 다 읽지 않는다. 앞부분(생일이 무엇인가)만 읽고 멈춘다. 같은 쪽을 여러 번 읽을 기회를 준다.",
        exp: "A birthday is the day you were born.",
        stuck: "그림을 짚으며 묻는다. \"What can you see on the cake?\"" },
      { stage: "Guided Reading", min: "",
        say: "Pages 10 to 21. Every time we meet a new country, stop. Find it on the map. Then tell me ONE thing they do.",
        do: "나라가 나올 때마다 세계 지도에서 찾는다. 한 나라에 한 가지 사실만 말하게 한다. 말풍선과 사진 설명도 읽는다.",
        exp: "In Spain, they pull your ear.",
        stuck: "문장 틀을 준다. \"In ___, people ___.\"" },
      { stage: "Think-Pair-Share", min: "35~45분",
        say: "Which tradition is most like yours? Which is most different? Think. Tell your partner. Then share.",
        do: "혼자 생각 30초 → 짝과 1분 → 전체 발표. 발표는 짝의 생각을 대신 말하게 하면 듣기 훈련이 된다.",
        exp: "My partner said China is like Korea because we eat noodles too.",
        stuck: "\"Same or different?\" 둘 중 하나만 고르게 한 뒤 because 를 붙이게 한다." },
      { stage: "Sentence Work", min: "45~55분",
        say: "When is your birthday? Say it like this: My birthday is on the 12th of June.",
        do: "날짜 말하기는 서수(first, second, 12th)를 연습할 기회다. 말하고 → 쓰고 → 읽는 순서로 한다.",
        exp: "My birthday is on the 3rd of March.",
        stuck: "칠판에 1st 2nd 3rd 4th 를 적어 두고 가리키게 한다." },
      { stage: "Graphic Organizer", min: "55~65분",
        say: "Birthdays in the middle. Around it, write everything we found out. One bubble, one fact.",
        do: "가운데 주제 하나에 사실을 둘러 적는 거품 지도다. 나라 하나를 골라 따로 만들면 보고서 쓰기의 재료가 된다.",
        exp: "Mexico — piñata — sweets inside",
        stuck: "책을 다시 펴고 나라 이름만 먼저 적게 한다." },
      { stage: "Writing", min: "65~80분",
        say: "Now write about YOUR birthday. Then add one tradition from the book you want to try.",
        do: "조건 세 가지를 같이 소리 내어 읽고 시작한다. 생일 카드·초대장 쓰기로 바꿔도 좋다.",
        exp: "My birthday is on May 2nd. I want to try a piñata because it looks fun.",
        stuck: "\"My birthday is on...\" 을 칠판에 써 준다." },
      { stage: "Reflection", min: "80~90분",
        say: "Look at our questions from the start. Which ones can we answer now? What do we still wonder?",
        do: "처음 적은 Want to know 질문으로 돌아가 답한 것에 표시한다. 남은 질문은 집에서 알아 오는 과제로 준다.",
        exp: "Now I know not all people eat cake.",
        stuck: "질문 하나를 골라 같이 책에서 답을 찾는다." }
    ],
    booktalk: {
      before: [
        { en: "When is your birthday? How old will you be?", ko: "생일이 언제야? 몇 살이 되니?" },
        { en: "What do you do on your birthday?", ko: "생일에 무엇을 하니?" },
        { en: "Do you think everyone in the world eats cake on their birthday?", ko: "세상 모든 사람이 생일에 케이크를 먹을까?" }
      ],
      during: [
        { en: "Can you find this country on the map?", ko: "이 나라를 지도에서 찾을 수 있니?" },
        { en: "Would you like an ear tug on your birthday? Why or why not?", ko: "생일에 귀를 잡아당기면 좋을까? 왜?" }
      ],
      after: [
        { en: "What is the same in all the countries?", ko: "모든 나라에서 똑같은 것은 무엇일까?" },
        { en: "Are some birthdays more important than others? Which ones in Korea?", ko: "더 중요한 생일이 있을까? 한국에서는 어떤 생일일까?" },
        { en: "How can a birthday show that we care about someone?", ko: "생일은 어떻게 누군가를 아낀다는 걸 보여 줄까?" }
      ]
    },
    notes: [
      { sheet: "Word List",     point: "몸짓과 함께 읽는다. 집에서 세 번 읽어 온다.", miss: "celebrate 의 강세를 뒤에 둔다. CE-le-brate 로 같이 읽는다." },
      { sheet: "Word Test",     point: "5분 제한. 나라 이름은 철자를 보지 않는다.", miss: "celebrate 를 celebrat 로 쓴다. 끝의 e 를 짚어 준다." },
      { sheet: "Comprehension", point: "쪽수를 보고 책에서 찾아 쓴다. 정보 찾기가 이 단원의 독해 목표다.", miss: "기억으로만 답한다. 손가락으로 그 문장을 짚게 한다." },
      { sheet: "Grammar",       point: "in 과 on 은 내 생일 날짜로 연습한다.", miss: "in my birthday 라고 쓴다. 날짜·하루는 on." },
      { sheet: "Exam Grammar",  point: "답만 쓴다.", miss: "everyone 뒤에 -s 를 빼먹는다." },
      { sheet: "Summary Map",   point: "논픽션이다. 주제 → 중심 생각 → 예 두 개 → 전하는 말 순서로 채운다.", miss: "예를 하나만 쓴다. 나라 두 개를 고르게 한다." },
      { sheet: "Mind Map",      point: "Me 칸은 우리 가족 이야기를 쓴다. 미역국도 좋은 답이다.", miss: "→ 칸을 비운다. 말로 먼저 묻고 받아 적게 한다." },
      { sheet: "Writing",       point: "4문장. 날짜 표현과 because 를 본다.", miss: "책 이야기를 빼먹는다. 나라 이름에 동그라미를 치게 한다." }
    ],
    scoring: [
      { c: "내용 Content",  pt: 5, yes: "내 생일을 날짜와 함께 소개했다",       no: "무엇을 하는지 알 수 없다" },
      { c: "까닭 Reason",   pt: 5, yes: "because 를 써서 까닭을 말했다",       no: "까닭이 없다" },
      { c: "근거 Book",     pt: 5, yes: "책에 나온 나라와 전통을 하나 넣었다",  no: "책과 이어지지 않는다" },
      { c: "글씨 Writing",  pt: 5, yes: "대문자로 시작하고 마침표로 끝났다",    no: "대문자·마침표가 없다" }
    ]
  },

  // ── ⑧ PYP 유닛 플래너 (교사용 가이드 첫 두 장) ──────────
  pyp: {
    theme: "Who We Are", themeKo: "우리는 누구인가", band: "Green Band",
    centralIdeas: [
      "People mark important days in their lives with celebrations.",
      "The way we celebrate shows our culture, our traditions, and who we are."
    ],
    profile: [
      { attr: "Inquirer",     how: "Find out how birthdays are celebrated in other countries." },
      { attr: "Open-minded",  how: "Respect ways of celebrating that are different from our own." },
      { attr: "Communicator", how: "Tell others about our own birthday and listen to theirs." },
      { attr: "Caring",       how: "Notice how a birthday can show someone that they matter." }
    ],
    keyWords: ["every", "people", "your", "have", "some", "other", "their", "our", "when"],
    phonics: ["a-e", "i-e", "ay", "ow", "ar", "ee", "wh", "ll"],
    inquiry: [
      "What is a birthday, and why do people celebrate it?",
      "What does my family do on a birthday? Is it the same in my friend's family?",
      "How do people in other countries celebrate?",
      "What is the same in every celebration?",
      "Are some birthdays more special than others?"
    ],
    outcomes: [
      "Say what a birthday is and tell how my own birthday is celebrated.",
      "Understand that traditions are different from family to family and country to country.",
      "Name one thing that is the same and one thing that is different between two countries.",
      "Find information in the text by using page numbers, pictures, and captions."
    ],
    hook: [
      "Mystery bag: pull out birthday items one by one (candle, card, party hat) and let students guess the topic.",
      "Birthday memory: each student brings a photo or card from a birthday and tells one feeling about it.",
      "Put up a world map and ask: do you think everyone eats cake on their birthday?"
    ],
    guided: [
      { pages: "Before reading", ask: ["Look at the title. What does 'celebrate' mean?", "Why do we put candles on a cake?"] },
      { pages: "pp. 2–5",   ask: ["When is your birthday? Say the date with an ordinal number.", "Is your birthday on the same day of the week every year?"] },
      { pages: "pp. 6–9",   ask: ["What do we need for a birthday? Make a bubble map on the board.", "Does everyone celebrate the same way?"] },
      { pages: "pp. 10–13", ask: ["Find Greece and Mexico on the map.", "Read the captions and speech bubbles. What is the mark on the n in piñata?"] },
      { pages: "pp. 14–17", ask: ["Why long noodles? What could 'long' stand for?", "Is an ear tug kind or unkind? Why?"] },
      { pages: "pp. 18–21", ask: ["What is good and not so good about one birthday for everyone?", "What do all these countries share?"] },
      { pages: "pp. 22–23", ask: ["What is the message of the last pages?", "Go back to our questions. Which can we answer now?"] }
    ],
    sentenceWork: [
      "Dates with ordinal numbers: \"My birthday is on the 12th of June.\"",
      "Giving a reason with because: \"I like birthdays because I see my friends.\"",
      "Describing with two adjectives: \"We ate delicious cake and played fun games.\""
    ],
    speaking: [
      "Think-Pair-Share: tell a partner how your family celebrates, then report what your partner said.",
      "Birthday line-up: students ask \"When is your birthday?\" and stand in month order.",
      "Say 'Happy Birthday' in another language and teach it to the class."
    ],
    writing: [
      "Write a party invitation or a birthday card.",
      "Write a 'recipe' for the perfect birthday party (First..., Next..., Then...).",
      "Make a bubble map for one country, then turn it into a short report.",
      "Invite a dream guest to your party and say why."
    ],
    connections: [
      { subject: "Geography",   idea: "Find every country in the book on a world map." },
      { subject: "Mathematics", idea: "Months in order, dates, ordinal numbers, a class birthday graph." },
      { subject: "Languages",   idea: "Collect 'Happy Birthday' in different languages." },
      { subject: "Korean culture", idea: "Compare with 미역국, 돌잔치, and 환갑. Why are some birthdays bigger?" },
      { subject: "Art",         idea: "Design a birthday card or a piñata." }
    ],
    organizers: ["Bubble map (one topic, many facts)", "Report planner (topic → facts → ending)", "Timeline of a birthday"],
    test: {
      yesno: [
        { q: "Everyone has a birthday.", a: true },
        { q: "Your birthday falls on the same day of the week every year.", a: false },
        { q: "A piñata is made of wood.", a: false },
        { q: "In Vietnam, everyone celebrates on the same day.", a: true },
        { q: "In India, children share sweets with friends at school.", a: true }
      ],
      writing: [
        { tag: "Language & Social Studies", task: "Choose one country's birthday tradition from the book. Write about it in 5–6 sentences.",
          hints: ["What do people do in that country?", "What do they eat or play?", "Do you like this tradition? Why or why not?", "If you could try it, what would you do?", "How would you feel?", "Would you share it with your friends?"],
          sample: "I like the piñata in Mexico. Children break it with a stick. Sweets fall out. I like it because it is fun and I love sweets. I want to try it with my friends.",
          focus: "Facts from the book, personal opinion, a reason with because." },
        { tag: "Math & Imagination", task: "Write about your birthday cake in 5–6 sentences.",
          hints: ["How old are you now? How many candles?", "What does your cake look like?", "What flavor is it?", "Who eats it with you?", "How do you feel?", "What will your cake look like when you are 20?"],
          sample: "I am eight, so my cake has eight candles. It is a chocolate cake with strawberries. I eat it with my family. I feel happy. When I am 20, my cake will have 20 candles and it will be very big!",
          focus: "Number sense (one candle per year), describing, imagination." }
      ],
      speaking: [
        { tag: "Art & Communication", task: "Draw your dream birthday card. Then talk about it in 5–6 sentences.",
          hints: ["What picture is on the card?", "What colors did you use?", "What words are on the card?", "Who will you give it to?", "Why did you choose this person?", "How will they feel?"],
          sample: "I drew a cake and my family on the card. I used bright colors because I feel happy. It says 'Happy Birthday, Mom.' I will give it to my mom because I love her.",
          focus: "Creativity, explanation, clear speaking." },
        { tag: "Science & Culture", task: "In China, people eat noodles for a long life. Talk about birthday food in 5–6 sentences.",
          hints: ["What food do you eat on your birthday?", "What does it taste like?", "Who makes it for you?", "Why is it special?", "If an animal had a birthday, what would it eat?", "Would you try that food too?"],
          sample: "In Korea, we eat seaweed soup on our birthday. My mom makes it for me. It is warm and healthy. It is special because it reminds us of our mothers.",
          focus: "Cultural connection, explanation, clear speaking." }
      ]
    }
  }
};

// 낭독녹음: 책 본문이 아니라 내용을 새로 쓴 글. [[바꾼 말|책 단어장 낱말]]
window.BOOK.readAloud = { scene: "세계 여러 나라의 생일 전통", text: "Everyone has a [[special day|birthday]] once a year. Around the world, people [[have fun|celebrate]] in different ways. In Mexico, children break a piñata full of [[candy|sweets]]. In China, families eat long [[pasta strings|noodles]] and hope for a long life. In Spain, friends [[tug|pull]] your ear once for every year since you were [[brought into the world|born]]. In India, children put on new clothes. Each [[nation|country]] has its own [[custom|tradition]], but every birthday says, \"We love you.\"" };
