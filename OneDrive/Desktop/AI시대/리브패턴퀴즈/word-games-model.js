(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainWordGames = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const WORD_GAME_BANK = {
    nounDefinition: [
      { english: "book", korean: "책", answer: "countable" },
      { english: "rice", korean: "쌀/밥", answer: "uncountable" },
      { english: "pencil", korean: "연필", answer: "countable" },
      { english: "milk", korean: "우유", answer: "uncountable" },
      { english: "friend", korean: "친구", answer: "countable" },
      { english: "apple", korean: "사과", answer: "countable" },
      { english: "car", korean: "자동차", answer: "countable" },
      { english: "money", korean: "돈", answer: "uncountable" },
      { english: "water", korean: "물", answer: "uncountable" },
      { english: "bread", korean: "빵", answer: "uncountable" },
      { english: "chair", korean: "의자", answer: "countable" },
      { english: "desk", korean: "책상", answer: "countable" },
      { english: "student", korean: "학생", answer: "countable" },
      { english: "teacher", korean: "선생님", answer: "countable" },
      { english: "dog", korean: "개", answer: "countable" },
      { english: "cat", korean: "고양이", answer: "countable" },
      { english: "egg", korean: "달걀", answer: "countable" },
      { english: "orange", korean: "오렌지", answer: "countable" },
      { english: "bottle", korean: "병", answer: "countable" },
      { english: "computer", korean: "컴퓨터", answer: "countable" },
      { english: "idea", korean: "생각", answer: "countable" },
      { english: "story", korean: "이야기", answer: "countable" },
      { english: "city", korean: "도시", answer: "countable" },
      { english: "picture", korean: "그림/사진", answer: "countable" },
      { english: "sandwich", korean: "샌드위치", answer: "countable" },
      { english: "cookie", korean: "쿠키", answer: "countable" },
      { english: "juice", korean: "주스", answer: "uncountable" },
      { english: "coffee", korean: "커피", answer: "uncountable" },
      { english: "tea", korean: "차", answer: "uncountable" },
      { english: "cheese", korean: "치즈", answer: "uncountable" },
      { english: "butter", korean: "버터", answer: "uncountable" },
      { english: "sugar", korean: "설탕", answer: "uncountable" },
      { english: "salt", korean: "소금", answer: "uncountable" },
      { english: "flour", korean: "밀가루", answer: "uncountable" },
      { english: "homework", korean: "숙제", answer: "uncountable" },
      { english: "information", korean: "정보", answer: "uncountable" },
      { english: "music", korean: "음악", answer: "uncountable" },
      { english: "air", korean: "공기", answer: "uncountable" },
      { english: "weather", korean: "날씨", answer: "uncountable" },
      { english: "snow", korean: "눈", answer: "uncountable" },
      { english: "rain", korean: "비", answer: "uncountable" },
      { english: "advice", korean: "조언", answer: "uncountable" },
      { english: "time", korean: "시간", answer: "uncountable" },
      { english: "happiness", korean: "행복", answer: "uncountable" },
    ],
    partsOfSpeech: [
      { english: "slowly", korean: "천천히", answer: "adverb" },
      { english: "kind", korean: "친절한", answer: "adjective" },
      { english: "apple", korean: "사과", answer: "noun" },
      { english: "school", korean: "학교", answer: "noun" },
      { english: "on", korean: "~위에", answer: "preposition" },
      { english: "they", korean: "그들", answer: "pronoun" },
      { english: "or", korean: "또는", answer: "conjunction" },
      { english: "eat", korean: "먹다", answer: "verb" },
      { english: "run", korean: "달리다", answer: "verb" },
      { english: "Ouch", korean: "아야", answer: "interjection" },
      { english: "teacher", korean: "선생님", answer: "noun" },
      { english: "library", korean: "도서관", answer: "noun" },
      { english: "umbrella", korean: "우산", answer: "noun" },
      { english: "music", korean: "음악", answer: "noun" },
      { english: "breakfast", korean: "아침 식사", answer: "noun" },
      { english: "homework", korean: "숙제", answer: "noun" },
      { english: "write", korean: "쓰다", answer: "verb" },
      { english: "listen", korean: "듣다", answer: "verb" },
      { english: "jump", korean: "뛰다", answer: "verb" },
      { english: "borrow", korean: "빌리다", answer: "verb" },
      { english: "choose", korean: "고르다", answer: "verb" },
      { english: "remember", korean: "기억하다", answer: "verb" },
      { english: "happy", korean: "행복한", answer: "adjective" },
      { english: "brave", korean: "용감한", answer: "adjective" },
      { english: "delicious", korean: "맛있는", answer: "adjective" },
      { english: "quiet", korean: "조용한", answer: "adjective" },
      { english: "heavy", korean: "무거운", answer: "adjective" },
      { english: "bright", korean: "밝은", answer: "adjective" },
      { english: "quickly", korean: "빠르게", answer: "adverb" },
      { english: "always", korean: "항상", answer: "adverb" },
      { english: "often", korean: "자주", answer: "adverb" },
      { english: "carefully", korean: "조심스럽게", answer: "adverb" },
      { english: "here", korean: "여기에", answer: "adverb" },
      { english: "yesterday", korean: "어제", answer: "adverb" },
      { english: "I", korean: "나", answer: "pronoun" },
      { english: "you", korean: "너/너희", answer: "pronoun" },
      { english: "we", korean: "우리", answer: "pronoun" },
      { english: "she", korean: "그녀", answer: "pronoun" },
      { english: "he", korean: "그", answer: "pronoun" },
      { english: "it", korean: "그것", answer: "pronoun" },
      { english: "in", korean: "~안에", answer: "preposition" },
      { english: "under", korean: "~아래에", answer: "preposition" },
      { english: "between", korean: "~사이에", answer: "preposition" },
      { english: "after", korean: "~후에", answer: "preposition" },
      { english: "before", korean: "~전에", answer: "preposition" },
      { english: "with", korean: "~와 함께", answer: "preposition" },
      { english: "and", korean: "그리고", answer: "conjunction" },
      { english: "but", korean: "하지만", answer: "conjunction" },
      { english: "because", korean: "왜냐하면", answer: "conjunction" },
      { english: "so", korean: "그래서", answer: "conjunction" },
      { english: "when", korean: "~할 때", answer: "conjunction" },
      { english: "if", korean: "만약 ~라면", answer: "conjunction" },
      { english: "Wow", korean: "와", answer: "interjection" },
      { english: "Hooray", korean: "야호", answer: "interjection" },
      { english: "Oops", korean: "앗", answer: "interjection" },
      { english: "Hey", korean: "야/저기", answer: "interjection" },
      { english: "Oh", korean: "오", answer: "interjection" },
      { english: "Great", korean: "좋아", answer: "interjection" },
      { english: "garden", korean: "정원", answer: "noun" },
      { english: "question", korean: "질문", answer: "noun" },
      { english: "draw", korean: "그리다", answer: "verb" },
      { english: "clean", korean: "청소하다", answer: "verb" },
      { english: "small", korean: "작은", answer: "adjective" },
      { english: "interesting", korean: "흥미로운", answer: "adjective" },
      { english: "outside", korean: "밖에", answer: "adverb" },
      { english: "never", korean: "절대 ~않다", answer: "adverb" },
      { english: "me", korean: "나를/나에게", answer: "pronoun" },
      { english: "them", korean: "그들을/그들에게", answer: "pronoun" },
      { english: "beside", korean: "~옆에", answer: "preposition" },
      { english: "through", korean: "~을 통과하여", answer: "preposition" },
      { english: "while", korean: "~하는 동안", answer: "conjunction" },
      { english: "although", korean: "비록 ~이지만", answer: "conjunction" },
      { english: "Yes", korean: "응/네", answer: "interjection" },
      { english: "No", korean: "아니", answer: "interjection" },
    ],
    speaking: [
      { english: "apple", korean: "사과", hints: ["fruit", "red", "sweet"] },
      { english: "school", korean: "학교", hints: ["place", "study", "friends"] },
      { english: "pizza", korean: "피자", hints: ["food", "round", "cheese"] },
      { english: "rainy", korean: "비 오는", hints: ["weather", "umbrella", "wet"] },
      { english: "library", korean: "도서관", hints: ["books", "quiet", "read"] },
      { english: "soccer", korean: "축구", hints: ["sport", "ball", "kick"] },
      { english: "doctor", korean: "의사", hints: ["person", "hospital", "help"] },
      { english: "birthday", korean: "생일", hints: ["party", "cake", "happy"] },
      { english: "winter", korean: "겨울", hints: ["season", "cold", "snow"] },
      { english: "summer", korean: "여름", hints: ["season", "hot", "vacation"] },
      { english: "pencil", korean: "연필", hints: ["school", "write", "long"] },
      { english: "umbrella", korean: "우산", hints: ["rain", "use", "dry"] },
      { english: "elephant", korean: "코끼리", hints: ["animal", "big", "trunk"] },
      { english: "butterfly", korean: "나비", hints: ["insect", "wings", "fly"] },
      { english: "sandwich", korean: "샌드위치", hints: ["food", "bread", "lunch"] },
      { english: "museum", korean: "박물관", hints: ["place", "old", "see"] },
      { english: "violin", korean: "바이올린", hints: ["instrument", "music", "play"] },
      { english: "astronaut", korean: "우주비행사", hints: ["person", "space", "rocket"] },
      { english: "recycle", korean: "재활용하다", hints: ["earth", "trash", "again"] },
      { english: "friend", korean: "친구", hints: ["person", "kind", "play"] },
      { english: "market", korean: "시장", hints: ["place", "buy", "food"] },
      { english: "headache", korean: "두통", hints: ["sick", "head", "pain"] },
      { english: "homework", korean: "숙제", hints: ["school", "do", "after class"] },
      { english: "picnic", korean: "소풍", hints: ["outside", "food", "park"] },
      { english: "dinosaur", korean: "공룡", hints: ["animal", "old", "big"] },
      { english: "subway", korean: "지하철", hints: ["transportation", "train", "underground"] },
      { english: "chef", korean: "요리사", hints: ["person", "cook", "food"] },
      { english: "camera", korean: "카메라", hints: ["picture", "take", "memory"] },
    ],
    writing: [
      {
        title: "My favorite food",
        korean: "내가 좋아하는 음식",
        helpers: ["like", "yummy", "eat", "pizza", "because"],
        starter: "My favorite food is ___.",
      },
      {
        title: "My best friend",
        korean: "나의 친한 친구",
        helpers: ["kind", "funny", "play", "together", "because"],
        starter: "My best friend is ___.",
      },
      {
        title: "My weekend",
        korean: "나의 주말",
        helpers: ["go", "play", "read", "happy", "with"],
        starter: "On weekends, I ___.",
      },
      { title: "My family", korean: "우리 가족", helpers: ["mother", "father", "sister", "kind", "love"], starter: "My family is ___." },
      { title: "My school", korean: "우리 학교", helpers: ["class", "teacher", "friends", "study", "fun"], starter: "My school is ___." },
      { title: "My favorite animal", korean: "내가 좋아하는 동물", helpers: ["cute", "big", "small", "run", "because"], starter: "My favorite animal is ___." },
      { title: "My favorite season", korean: "내가 좋아하는 계절", helpers: ["spring", "summer", "fall", "winter", "weather"], starter: "My favorite season is ___." },
      { title: "A rainy day", korean: "비 오는 날", helpers: ["rain", "umbrella", "wet", "home", "listen"], starter: "On a rainy day, I ___." },
      { title: "At the park", korean: "공원에서", helpers: ["walk", "play", "tree", "friend", "sunny"], starter: "At the park, I ___." },
      { title: "My dream job", korean: "나의 장래희망", helpers: ["doctor", "teacher", "chef", "help", "want"], starter: "I want to be a ___." },
      { title: "My favorite sport", korean: "내가 좋아하는 운동", helpers: ["soccer", "basketball", "run", "team", "exciting"], starter: "My favorite sport is ___." },
      { title: "My lunch", korean: "나의 점심", helpers: ["rice", "sandwich", "milk", "eat", "delicious"], starter: "For lunch, I eat ___." },
      { title: "My room", korean: "내 방", helpers: ["bed", "desk", "books", "clean", "small"], starter: "My room has ___." },
      { title: "My favorite book", korean: "내가 좋아하는 책", helpers: ["story", "funny", "read", "character", "because"], starter: "My favorite book is ___." },
      { title: "A good friend", korean: "좋은 친구", helpers: ["kind", "listen", "help", "smile", "together"], starter: "A good friend is ___." },
      { title: "After school", korean: "방과 후", helpers: ["homework", "snack", "play", "read", "practice"], starter: "After school, I ___." },
      { title: "My birthday", korean: "내 생일", helpers: ["cake", "party", "gift", "happy", "family"], starter: "On my birthday, I ___." },
      { title: "At the zoo", korean: "동물원에서", helpers: ["animal", "lion", "monkey", "see", "big"], starter: "At the zoo, I see ___." },
      { title: "Helping Earth", korean: "지구 돕기", helpers: ["recycle", "water", "trash", "save", "clean"], starter: "I can help Earth by ___." },
      { title: "My morning", korean: "나의 아침", helpers: ["wake up", "wash", "breakfast", "school", "early"], starter: "In the morning, I ___." },
      { title: "A fun trip", korean: "즐거운 여행", helpers: ["go", "beach", "museum", "family", "take pictures"], starter: "I want to go to ___." },
      { title: "My favorite color", korean: "내가 좋아하는 색", helpers: ["red", "blue", "green", "bright", "because"], starter: "My favorite color is ___." },
      { title: "When I am sick", korean: "아플 때", helpers: ["doctor", "medicine", "rest", "water", "better"], starter: "When I am sick, I ___." },
      { title: "My classroom", korean: "우리 교실", helpers: ["teacher", "desk", "board", "friends", "learn"], starter: "In my classroom, there is ___." },
    ],
    sentences: [
      { text: "I like pizza", korean: "나는 피자를 좋아해요.", pattern: "I like ___." },
      { text: "She has a pencil", korean: "그녀는 연필을 가지고 있어요.", pattern: "She has ___." },
      { text: "We play soccer after school", korean: "우리는 방과 후 축구를 해요.", pattern: "We play ___ after school." },
      { text: "The cat is under the chair", korean: "고양이는 의자 아래에 있어요.", pattern: "The cat is ___ the chair." },
      { text: "My brother can swim fast", korean: "내 남동생은 빠르게 수영할 수 있어요.", pattern: "My brother can ___." },
      { text: "It is rainy today", korean: "오늘은 비가 와요.", pattern: "It is ___ today." },
      { text: "I want to be a doctor", korean: "나는 의사가 되고 싶어요.", pattern: "I want to be ___." },
      { text: "There are three apples", korean: "사과가 세 개 있어요.", pattern: "There are ___." },
      { text: "Please open the window", korean: "창문을 열어 주세요.", pattern: "Please ___ the window." },
      { text: "He is reading a book", korean: "그는 책을 읽고 있어요.", pattern: "He is ___ a book." },
      { text: "I go to the library", korean: "나는 도서관에 가요.", pattern: "I go to ___." },
      { text: "This sandwich is delicious", korean: "이 샌드위치는 맛있어요.", pattern: "This ___ is delicious." },
      { text: "They are my friends", korean: "그들은 내 친구들이에요.", pattern: "They are ___." },
      { text: "The ball is beside the desk", korean: "공은 책상 옆에 있어요.", pattern: "The ball is ___ the desk." },
      { text: "I brush my teeth every morning", korean: "나는 매일 아침 이를 닦아요.", pattern: "I brush ___ every morning." },
      { text: "My favorite season is winter", korean: "내가 좋아하는 계절은 겨울이에요.", pattern: "My favorite ___ is winter." },
      { text: "Can I borrow your eraser", korean: "네 지우개를 빌릴 수 있을까?", pattern: "Can I borrow ___?" },
      { text: "We should recycle bottles", korean: "우리는 병을 재활용해야 해요.", pattern: "We should ___ bottles." },
      { text: "The elephant has a long trunk", korean: "코끼리는 긴 코를 가지고 있어요.", pattern: "The elephant has ___." },
      { text: "I was tired yesterday", korean: "나는 어제 피곤했어요.", pattern: "I was ___ yesterday." },
      { text: "She carefully writes her name", korean: "그녀는 조심스럽게 이름을 써요.", pattern: "She carefully ___ her name." },
      { text: "Because it was cold we stayed home", korean: "추웠기 때문에 우리는 집에 있었어요.", pattern: "Because it was ___, we stayed home." },
      { text: "I saw a butterfly in the garden", korean: "나는 정원에서 나비를 봤어요.", pattern: "I saw ___ in the garden." },
      { text: "The museum is between the bank and the park", korean: "박물관은 은행과 공원 사이에 있어요.", pattern: "The museum is between ___." },
    ],
    dictation: [
      { text: "I am happy.", korean: "나는 행복해요.", level: "easy" },
      { text: "This is my book.", korean: "이것은 내 책이에요.", level: "easy" },
      { text: "Do you like apples?", korean: "너는 사과를 좋아하니?", level: "easy" },
      { text: "She can jump high.", korean: "그녀는 높이 뛸 수 있어요.", level: "easy" },
      { text: "It is sunny today.", korean: "오늘은 화창해요.", level: "easy" },
      { text: "I have a headache.", korean: "나는 머리가 아파요.", level: "easy" },
      { text: "The dog is under the table.", korean: "개는 식탁 아래에 있어요.", level: "medium" },
      { text: "My favorite subject is science.", korean: "내가 좋아하는 과목은 과학이에요.", level: "medium" },
      { text: "We are going to the museum.", korean: "우리는 박물관에 가고 있어요.", level: "medium" },
      { text: "Please speak slowly.", korean: "천천히 말해 주세요.", level: "medium" },
      { text: "I usually do homework after dinner.", korean: "나는 보통 저녁 후 숙제를 해요.", level: "medium" },
      { text: "Can you help me recycle this bottle?", korean: "이 병을 재활용하는 것을 도와줄 수 있니?", level: "medium" },
      { text: "The weather was cloudy yesterday.", korean: "어제 날씨는 흐렸어요.", level: "medium" },
      { text: "My grandmother is cooking spaghetti.", korean: "우리 할머니는 스파게티를 요리하고 있어요.", level: "medium" },
      { text: "I want to be an astronaut.", korean: "나는 우주비행사가 되고 싶어요.", level: "medium" },
      { text: "Because it rained, we stayed at home.", korean: "비가 와서 우리는 집에 있었어요.", level: "hard" },
      { text: "The library is next to the hospital.", korean: "도서관은 병원 옆에 있어요.", level: "hard" },
      { text: "She carefully carried the birthday cake.", korean: "그녀는 생일 케이크를 조심스럽게 들고 갔어요.", level: "hard" },
      { text: "Although I was tired, I practiced violin.", korean: "피곤했지만 나는 바이올린을 연습했어요.", level: "hard" },
      { text: "We should protect the environment.", korean: "우리는 환경을 보호해야 해요.", level: "hard" },
      { text: "The kangaroo jumped over the fence.", korean: "캥거루가 울타리를 뛰어넘었어요.", level: "hard" },
      { text: "I took many pictures during vacation.", korean: "나는 방학 동안 사진을 많이 찍었어요.", level: "hard" },
      { text: "Which word rhymes with hat?", korean: "hat과 운이 맞는 단어는 무엇인가요?", level: "hard" },
      { text: "There are two sandwiches on the plate.", korean: "접시에 샌드위치 두 개가 있어요.", level: "hard" },
    ],
    spelling: [
      { english: "apple", korean: "사과" },
      { english: "banana", korean: "바나나" },
      { english: "school", korean: "학교" },
      { english: "friend", korean: "친구" },
      { english: "teacher", korean: "선생님" },
      { english: "pencil", korean: "연필" },
      { english: "library", korean: "도서관" },
      { english: "weather", korean: "날씨" },
      { english: "umbrella", korean: "우산" },
      { english: "sandwich", korean: "샌드위치" },
      { english: "delicious", korean: "맛있는" },
      { english: "birthday", korean: "생일" },
      { english: "because", korean: "왜냐하면" },
      { english: "favorite", korean: "가장 좋아하는" },
      { english: "science", korean: "과학" },
      { english: "hospital", korean: "병원" },
      { english: "exercise", korean: "운동" },
      { english: "picture", korean: "그림/사진" },
      { english: "violin", korean: "바이올린" },
      { english: "environment", korean: "환경" },
      { english: "traditional", korean: "전통적인" },
      { english: "astronaut", korean: "우주비행사" },
      { english: "recycle", korean: "재활용하다" },
      { english: "museum", korean: "박물관" },
      { english: "vacation", korean: "방학" },
      { english: "headache", korean: "두통" },
      { english: "toothache", korean: "치통" },
      { english: "congratulations", korean: "축하해" },
      { english: "imaginative", korean: "상상력이 풍부한" },
      { english: "presentation", korean: "발표" },
      { english: "butterfly", korean: "나비" },
      { english: "dinosaur", korean: "공룡" },
    ],
  };

  function makePhonicsItems(rows) {
    return rows.map(([word, korean, sound, pattern, choices]) => ({
      word,
      korean,
      sound,
      pattern,
      choices: choices || [],
    }));
  }

  WORD_GAME_BANK.phonics = {
    shortVowels: makePhonicsItems([
      ["cat", "고양이", "short a", "CVC", ["cat", "cut", "cot"]], ["map", "지도", "short a", "CVC"], ["bag", "가방", "short a", "CVC"], ["hat", "모자", "short a", "CVC"], ["jam", "잼", "short a", "CVC"],
      ["bed", "침대", "short e", "CVC"], ["hen", "암탉", "short e", "CVC"], ["pen", "펜", "short e", "CVC"], ["red", "빨간색", "short e", "CVC"], ["ten", "10", "short e", "CVC"],
      ["pig", "돼지", "short i", "CVC"], ["sit", "앉다", "short i", "CVC"], ["pin", "핀", "short i", "CVC"], ["fish", "물고기", "short i", "CVCC"], ["six", "6", "short i", "CVC"],
      ["dog", "개", "short o", "CVC"], ["hop", "깡충 뛰다", "short o", "CVC"], ["pot", "냄비", "short o", "CVC"], ["box", "상자", "short o", "CVC"], ["fox", "여우", "short o", "CVC"],
      ["sun", "태양", "short u", "CVC"], ["cup", "컵", "short u", "CVC"], ["bug", "벌레", "short u", "CVC"], ["run", "달리다", "short u", "CVC"], ["mud", "진흙", "short u", "CVC"],
    ]),
    consonants: makePhonicsItems([
      ["bat", "박쥐", "/b/", "beginning b"], ["cap", "모자", "/c/", "beginning c"], ["dog", "개", "/d/", "beginning d"], ["fan", "선풍기", "/f/", "beginning f"], ["gum", "껌", "/g/", "beginning g"],
      ["hen", "암탉", "/h/", "beginning h"], ["jet", "제트기", "/j/", "beginning j"], ["kid", "아이", "/k/", "beginning k"], ["leg", "다리", "/l/", "beginning l"], ["man", "남자", "/m/", "beginning m"],
      ["net", "그물", "/n/", "beginning n"], ["pig", "돼지", "/p/", "beginning p"], ["rat", "쥐", "/r/", "beginning r"], ["sun", "태양", "/s/", "beginning s"], ["top", "팽이", "/t/", "beginning t"],
      ["van", "승합차", "/v/", "beginning v"], ["web", "거미줄", "/w/", "beginning w"], ["box", "상자", "/x/", "ending x"], ["yes", "네", "/y/", "beginning y"], ["zip", "지퍼", "/z/", "beginning z"],
    ]),
    blends: makePhonicsItems([
      ["black", "검은", "bl", "L-blend"], ["clap", "박수치다", "cl", "L-blend"], ["flag", "깃발", "fl", "L-blend"], ["glad", "기쁜", "gl", "L-blend"], ["plan", "계획", "pl", "L-blend"],
      ["slip", "미끄러지다", "sl", "L-blend"], ["brush", "솔", "br", "R-blend"], ["crab", "게", "cr", "R-blend"], ["drum", "드럼", "dr", "R-blend"], ["frog", "개구리", "fr", "R-blend"],
      ["grass", "풀", "gr", "R-blend"], ["print", "인쇄하다", "pr", "R-blend"], ["train", "기차", "tr", "R-blend"], ["stop", "멈추다", "st", "S-blend"], ["spin", "돌다", "sp", "S-blend"],
      ["skate", "스케이트", "sk", "S-blend"], ["snake", "뱀", "sn", "S-blend"], ["smile", "웃다", "sm", "S-blend"], ["swim", "수영하다", "sw", "S-blend"], ["twins", "쌍둥이", "tw", "T-blend"],
    ]),
    digraphs: makePhonicsItems([
      ["ship", "배", "sh", "digraph"], ["shop", "가게", "sh", "digraph"], ["fish", "물고기", "sh", "digraph"], ["chip", "칩", "ch", "digraph"], ["chin", "턱", "ch", "digraph"],
      ["lunch", "점심", "ch", "digraph"], ["thin", "얇은", "th", "digraph"], ["bath", "목욕", "th", "digraph"], ["this", "이것", "th", "digraph"], ["that", "저것", "th", "digraph"],
      ["when", "언제", "wh", "digraph"], ["whale", "고래", "wh", "digraph"], ["white", "하얀", "wh", "digraph"], ["phone", "전화기", "ph", "digraph"], ["photo", "사진", "ph", "digraph"], ["graph", "그래프", "ph", "digraph"],
    ]),
    longVowels: makePhonicsItems([
      ["cake", "케이크", "long a", "a_e"], ["name", "이름", "long a", "a_e"], ["game", "게임", "long a", "a_e"], ["late", "늦은", "long a", "a_e"], ["plane", "비행기", "long a", "a_e"],
      ["these", "이것들", "long e", "e_e"], ["theme", "주제", "long e", "e_e"], ["Pete", "피트", "long e", "e_e"], ["complete", "완성하다", "long e", "e_e"],
      ["bike", "자전거", "long i", "i_e"], ["kite", "연", "long i", "i_e"], ["time", "시간", "long i", "i_e"], ["five", "5", "long i", "i_e"], ["smile", "웃다", "long i", "i_e"],
      ["home", "집", "long o", "o_e"], ["rope", "밧줄", "long o", "o_e"], ["nose", "코", "long o", "o_e"], ["bone", "뼈", "long o", "o_e"],
      ["cube", "정육면체", "long u", "u_e"], ["cute", "귀여운", "long u", "u_e"], ["mule", "노새", "long u", "u_e"],
    ]),
    vowelTeams: makePhonicsItems([
      ["rain", "비", "ai", "vowel team"], ["train", "기차", "ai", "vowel team"], ["mail", "우편", "ai", "vowel team"], ["day", "날", "ay", "vowel team"], ["play", "놀다", "ay", "vowel team"],
      ["tree", "나무", "ee", "vowel team"], ["green", "초록색", "ee", "vowel team"], ["leaf", "잎", "ea", "vowel team"], ["sea", "바다", "ea", "vowel team"], ["boat", "배", "oa", "vowel team"],
      ["coat", "코트", "oa", "vowel team"], ["snow", "눈", "ow", "vowel team"], ["grow", "자라다", "ow", "vowel team"], ["moon", "달", "oo", "vowel team"], ["book", "책", "oo", "vowel team"],
      ["cloud", "구름", "ou", "vowel team"], ["house", "집", "ou", "vowel team"], ["coin", "동전", "oi", "vowel team"], ["boy", "소년", "oy", "vowel team"], ["sauce", "소스", "au", "vowel team"], ["draw", "그리다", "aw", "vowel team"],
    ]),
    rControlled: makePhonicsItems([
      ["car", "자동차", "ar", "r-controlled"], ["star", "별", "ar", "r-controlled"], ["park", "공원", "ar", "r-controlled"], ["her", "그녀를", "er", "r-controlled"], ["fern", "고사리", "er", "r-controlled"],
      ["bird", "새", "ir", "r-controlled"], ["girl", "소녀", "ir", "r-controlled"], ["fork", "포크", "or", "r-controlled"], ["corn", "옥수수", "or", "r-controlled"], ["nurse", "간호사", "ur", "r-controlled"],
      ["turn", "돌다", "ur", "r-controlled"], ["purple", "보라색", "ur", "r-controlled"],
    ]),
  };

  WORD_GAME_BANK.sightWords = "the a an I you he she we they it my your his her our their is are am was were be have has do does can will go come see look like want said here there where what who this that these those one two three for to of in on under with and but because so not no yes all some many little big good new old very".split(" ");
  WORD_GAME_BANK.basicWords = "apple banana book school friend teacher pencil desk chair bag dog cat bird fish rabbit house room bed door window car bus train bike park store market library milk rice bread water juice cake cookie pizza sandwich egg happy sad hot cold sunny rainy big small red blue green yellow run jump read write eat drink play help make open close listen speak walk sleep wash draw sing count learn".split(" ");

  function parseWordList(text) {
    return String(text || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split(",").map((part) => part.trim()))
      .filter(([english, korean]) => english && korean)
      .map(([english, korean]) => ({ english, korean }));
  }

  function getTeamOptions() {
    return [
      { value: 1, label: "개인전" },
      { value: 2, label: "2팀" },
      { value: 3, label: "3팀" },
      { value: 4, label: "4팀" },
    ];
  }

  function createTeamScores(teamCount = 1) {
    const count = Math.min(4, Math.max(1, Number(teamCount) || 1));
    return Array.from({ length: count }, (_, index) => ({
      team: index + 1,
      label: count === 1 ? "개인" : `${index + 1}팀`,
      score: 0,
    }));
  }

  function updateTeamScore(scores = [], teamNumber = 1, delta = 1) {
    return scores.map((score) => ({
      ...score,
      score: score.team === Number(teamNumber) ? Math.max(0, Number(score.score || 0) + delta) : score.score,
    }));
  }

  function formatTimer(seconds = 0) {
    const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
    const minutes = Math.floor(safeSeconds / 60);
    const rest = safeSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  }

  function normalizeAnswer(text = "") {
    return String(text)
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function scoreTextAnswer(answer = "", expected = "") {
    const normalizedAnswer = normalizeAnswer(answer);
    const normalizedExpected = normalizeAnswer(expected);
    return {
      passed: normalizedAnswer === normalizedExpected,
      answer: normalizedAnswer,
      expected: normalizedExpected,
    };
  }

  function shuffleSentenceWords(sentence = "") {
    const words = String(sentence).replace(/[.!?]+$/g, "").split(/\s+/).filter(Boolean);
    return words
      .map((word, index) => ({ word, sort: (word.charCodeAt(0) + index * 17) % 97 }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.word);
  }

  function spellingHint(word = "") {
    return String(word)
      .split("")
      .map((letter, index) => (index === 0 || index === String(word).length - 1 ? letter : "_"))
      .join(" ");
  }

  function scoreSpellingAnswer(answer = "", expected = "") {
    const normalizedAnswer = normalizeAnswer(answer).replace(/\s/g, "");
    const normalizedExpected = normalizeAnswer(expected).replace(/\s/g, "");
    return {
      passed: normalizedAnswer === normalizedExpected,
      hint: spellingHint(expected),
      answer: normalizedAnswer,
      expected: normalizedExpected,
    };
  }

  function scoreWordSort({ words = [], placements = {} } = {}) {
    const correct = words.reduce((sum, word) => {
      return sum + (placements[word.english] === word.answer ? 1 : 0);
    }, 0);
    return { correct, total: words.length };
  }

  function buildSpeakingPrompt(item) {
    const hints = Array.isArray(item?.hints) ? item.hints : [];
    return {
      instruction: "이 단어를 영어로 설명해요!",
      english: item?.english || "",
      korean: item?.korean || "",
      hints,
      starter: hints.map((hint, index) => `${index === 0 ? "It's a" : "It's"} ${hint}.`).join(" "),
    };
  }

  function scoreSpeakingAnswer(answer = "", hints = []) {
    const normalized = String(answer).toLowerCase();
    const expectedHints = Array.isArray(hints) ? hints : [];
    const matchedHints = expectedHints.filter((hint) => normalized.includes(String(hint).toLowerCase()));
    const percent = expectedHints.length ? Math.round((matchedHints.length / expectedHints.length) * 100) : 0;
    return {
      correctHints: matchedHints.length,
      totalHints: expectedHints.length,
      percent,
      passed: percent >= 60,
      matchedHints,
    };
  }

  function getWritingTopic(index = 0) {
    const topics = WORD_GAME_BANK.writing;
    return topics[((index % topics.length) + topics.length) % topics.length];
  }

  function getPhonicsItems(category = "shortVowels") {
    const phonics = WORD_GAME_BANK.phonics || {};
    return phonics[category] || phonics.shortVowels || [];
  }

  function buildPhonicsQuestion(item = {}, pool = []) {
    const answer = item.word || item.english || "";
    const distractors = (Array.isArray(pool) ? pool : [])
      .map((candidate) => candidate.word || candidate.english || "")
      .filter((word) => word && normalizeAnswer(word) !== normalizeAnswer(answer));
    const choices = Array.isArray(item.choices) && item.choices.length
      ? item.choices
      : [answer, ...distractors].slice(0, 4);
    return {
      answer,
      word: answer,
      korean: item.korean || "",
      sound: item.sound || "",
      pattern: item.pattern || "",
      choices,
    };
  }

  function scorePhonicsAnswer(answer = "", expected = "") {
    return scoreTextAnswer(answer, expected);
  }

  function wordCount(text = "") {
    return (String(text).match(/[A-Za-z']+/g) || []).length;
  }

  return {
    WORD_GAME_BANK,
    buildPhonicsQuestion,
    createTeamScores,
    formatTimer,
    getPhonicsItems,
    normalizeAnswer,
    parseWordList,
    getTeamOptions,
    scorePhonicsAnswer,
    scoreWordSort,
    buildSpeakingPrompt,
    getWritingTopic,
    scoreSpeakingAnswer,
    scoreSpellingAnswer,
    scoreTextAnswer,
    shuffleSentenceWords,
    updateTeamScore,
    wordCount,
  };
});
