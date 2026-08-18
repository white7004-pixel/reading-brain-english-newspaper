import type { LibrarySeed } from "./build-draft";

/** AR 1점대 5차 배치. 문장 10단어 이하, 90~140단어 기준. */
export const AR1_BATCH_05: LibrarySeed[] = [
  {
    id: "ar1-echoes", ar: 1.5, domain: "science", subtopic: "소리",
    title: "When Sound Comes Back", titleKo: "소리가 돌아올 때",
    summaryEn: "An echo forms when sound reflects from a distant hard surface.", summaryKo: "소리가 단단한 표면에 부딪혀 되돌아오는 메아리의 원리를 알아봅니다.",
    learningGoal: "메아리가 생기는 조건을 설명한다.", keyConcept: "소리도 표면에서 반사될 수 있다.", visualTheme: "echo",
    pages: [
      "Clap inside a large empty hall. You may hear the clap again. That second sound is an echo. Your first clap makes air vibrate. The vibrations travel outward as sound waves. They move very quickly.",
      "A hard wall can reflect sound. The waves strike it and return. Your ears then receive them again. A far wall makes a clear delay. Nearby walls return sound too quickly. The sounds may blend together instead.",
      "Soft things absorb much more sound. Curtains and carpets reduce strong echoes. Empty rooms often sound bright and noisy. Bats use returning sounds very carefully. They can find objects in darkness. People also use echoes under water.",
    ],
    words: [
      ["echo", "/ˈekoʊ/", "메아리", "a sound heard again after reflection", "That second sound is an echo."],
      ["vibrate", "/ˈvaɪbreɪt/", "진동하다", "to move quickly back and forth", "Your first clap makes air vibrate."],
      ["reflect", "/rɪˈflekt/", "반사하다", "to send something back", "A hard wall can reflect sound."],
      ["absorb", "/əbˈzɔːrb/", "흡수하다", "to take in something", "Soft things absorb much more sound."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can reflect sound?", options: ["A hard wall", "A soft curtain", "A quiet thought"], correct: 0, explanation: "Hard surfaces send sound waves back.", evidence: "A hard wall can reflect sound." },
      { type: "inference", prompt: "Why can a far wall make clearer echoes?", options: ["The returning sound has a delay", "The wall makes new air", "Far walls are always soft"], correct: 0, explanation: "The delay separates both sounds.", evidence: "A far wall makes a clear delay." },
      { type: "vocabulary", prompt: "What does absorb mean?", options: ["Take something in", "Send it back", "Make it louder"], correct: 0, explanation: "Soft materials take in sound energy.", evidence: "Soft things absorb much more sound." },
    ],
    sources: [
      ["Sound", "Encyclopaedia Britannica", "https://www.britannica.com/science/sound-physics", "article", "소리는 진동으로 생기며 파동으로 전달된다."],
      ["Echolocation", "Encyclopaedia Britannica", "https://www.britannica.com/science/echolocation", "article", "박쥐는 반사되어 돌아오는 소리를 이용해 물체를 찾는다."],
    ],
  },
  {
    id: "ar1-ant-trails", ar: 1.6, domain: "science", subtopic: "동물 행동",
    title: "How Ants Mark a Trail", titleKo: "개미는 어떻게 길을 표시할까?",
    summaryEn: "Many ants leave chemical trails that guide nestmates toward food.", summaryKo: "개미들이 화학 물질로 먹이까지의 길을 알리는 방법을 살펴봅니다.",
    learningGoal: "개미의 흔적 신호가 작동하는 과정을 설명한다.", keyConcept: "작은 화학 신호가 집단의 이동을 이끈다.", visualTheme: "ant-trail",
    pages: [
      "An ant leaves its nest alone. It searches the ground for food. Its eyes are not the main guide. Ants use their feelers very often. The feelers touch and smell nearby things. At last, the ant finds crumbs.",
      "The ant walks back toward home. It leaves a chemical trail behind. Other ants smell this trail. They follow it toward the crumbs. Each returning ant adds more chemical. The useful path grows easier to follow.",
      "A trail does not last forever. The chemical slowly fades away. A path without food becomes weaker. Ants then stop following that route. Different ant kinds use different signals. Their simple messages help the colony work.",
    ],
    words: [
      ["feeler", "/ˈfiːlər/", "더듬이", "a thin sense organ on an insect", "Ants use their feelers very often."],
      ["chemical", "/ˈkemɪkəl/", "화학 물질", "a substance with a special makeup", "It leaves a chemical trail behind."],
      ["trail", "/treɪl/", "흔적 길", "a marked path to follow", "Other ants smell this trail."],
      ["colony", "/ˈkɑːləni/", "군체", "a group of ants living together", "Their simple messages help the colony work."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What guides other ants toward food?", options: ["A chemical trail", "A loud song", "A bright feather"], correct: 0, explanation: "Nestmates smell the marked path.", evidence: "Other ants smell this trail." },
      { type: "inference", prompt: "Why does a useful path grow stronger?", options: ["More ants add chemical", "The crumbs start moving", "The ground becomes softer"], correct: 0, explanation: "Returning ants reinforce the trail.", evidence: "Each returning ant adds more chemical." },
      { type: "vocabulary", prompt: "What is a colony?", options: ["A group living together", "A single crumb", "An ant's eye"], correct: 0, explanation: "The ants cooperate as one group.", evidence: "Their simple messages help the colony work." },
    ],
    sources: [
      ["Ant", "Encyclopaedia Britannica", "https://www.britannica.com/animal/ant", "article", "개미는 군체를 이루고 화학 신호로 의사소통한다."],
      ["Ants", "National Geographic", "https://www.nationalgeographic.com/animals/invertebrates/facts/ants", "article", "개미는 더듬이와 냄새 신호를 활용해 환경을 탐색한다."],
    ],
  },
  {
    id: "ar1-skin", ar: 1.4, domain: "science", subtopic: "인체",
    title: "What Skin Does", titleKo: "피부가 하는 일",
    summaryEn: "Skin protects the body, senses touch, and helps control temperature.", summaryKo: "피부가 몸을 보호하고 감각과 체온 조절을 돕는 방식을 배웁니다.",
    learningGoal: "피부의 세 가지 주요 기능을 말한다.", keyConcept: "피부는 몸을 감싸는 살아 있는 기관이다.", visualTheme: "skin",
    pages: [
      "Skin covers almost your whole body. It forms a strong outer barrier. This barrier keeps many germs outside. It also slows water loss. Small cuts can break the barrier. New cells then help close them.",
      "Skin also helps you feel. Tiny nerves notice pressure and temperature. They warn you about sharp objects. They also sense a gentle touch. Different body areas have different sensitivity. Fingertips notice very small details.",
      "Your skin helps control body heat. Sweat carries heat toward the surface. Moving air helps sweat dry. Blood flow near skin can also change. Always protect skin from strong sunlight. Shade and clothing offer useful cover.",
    ],
    words: [
      ["barrier", "/ˈbæriər/", "장벽", "something that blocks passage", "It forms a strong outer barrier."],
      ["germ", "/dʒɜːrm/", "세균", "a tiny living thing that may cause illness", "This barrier keeps many germs outside."],
      ["pressure", "/ˈpreʃər/", "압력", "force pushing against something", "Tiny nerves notice pressure and temperature."],
      ["sweat", "/swet/", "땀", "water released through the skin", "Sweat carries heat toward the surface."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What keeps many germs outside?", options: ["The skin barrier", "The fingertips", "Moving air"], correct: 0, explanation: "Skin forms the body's outside defense.", evidence: "This barrier keeps many germs outside." },
      { type: "inference", prompt: "Why are fingertips useful for details?", options: ["They are very sensitive", "They make more sunlight", "They have no nerves"], correct: 0, explanation: "Sensitive areas notice smaller changes.", evidence: "Fingertips notice very small details." },
      { type: "vocabulary", prompt: "What is pressure?", options: ["Force pushing something", "A skin cell", "Cool shade"], correct: 0, explanation: "Nerves detect pushing force.", evidence: "Tiny nerves notice pressure and temperature." },
    ],
    sources: [
      ["Skin", "Encyclopaedia Britannica", "https://www.britannica.com/science/human-skin", "article", "피부는 보호, 감각, 체온 조절에 관여하는 기관이다."],
      ["Keep Your Skin Healthy", "National Institutes of Health", "https://newsinhealth.nih.gov/2015/11/keep-your-skin-healthy", "article", "피부는 외부 환경을 막고 체온 조절을 돕는다."],
    ],
  },
  {
    id: "ar1-first-coins", ar: 1.7, domain: "history", subtopic: "화폐",
    title: "When Coins Were New", titleKo: "동전이 처음 생겼을 때",
    summaryEn: "Stamped metal coins made some ancient trades faster and easier.", summaryKo: "금속 동전이 고대의 거래 방식을 어떻게 바꾸었는지 살펴봅니다.",
    learningGoal: "동전이 교환을 단순하게 만든 이유를 설명한다.", keyConcept: "공통으로 믿는 표시가 교환을 돕는다.", visualTheme: "coin",
    pages: [
      "People traded long before coins existed. They swapped grain, cloth, animals, and tools. A trade needed both people to agree. Goods could also be hard to divide. Metal pieces offered another choice. Metal lasted and was easy to carry.",
      "The first coins appeared in ancient Lydia. That region stood in today's Turkey. Rulers stamped marks onto metal pieces. A mark showed who supported the coin. It also promised a known weight. Traders did not weigh every piece.",
      "Coins spread through many nearby lands. Different cities made different pictures. Faces, animals, and plants appeared. These pictures showed power and local stories. Coins also traveled far through trade. Old coins now help historians study the past.",
    ],
    words: [
      ["swap", "/swɑːp/", "맞바꾸다", "to trade one thing for another", "They swapped grain, cloth, animals, and tools."],
      ["divide", "/dɪˈvaɪd/", "나누다", "to separate into smaller parts", "Goods could also be hard to divide."],
      ["stamp", "/stæmp/", "표시를 찍다", "to press a mark onto something", "Rulers stamped marks onto metal pieces."],
      ["weight", "/weɪt/", "무게", "how heavy something is", "It also promised a known weight."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Where did the first coins appear?", options: ["Ancient Lydia", "Modern Canada", "A Roman ship"], correct: 0, explanation: "Lydia was an early coin-making region.", evidence: "The first coins appeared in ancient Lydia." },
      { type: "inference", prompt: "How did stamped coins speed trade?", options: ["Traders knew their weight", "They grew food", "They carried animals"], correct: 0, explanation: "Trusted marks reduced repeated weighing.", evidence: "Traders did not weigh every piece." },
      { type: "vocabulary", prompt: "What does swap mean?", options: ["Trade one thing for another", "Make a metal mark", "Study the past"], correct: 0, explanation: "People exchanged different goods.", evidence: "They swapped grain, cloth, animals, and tools." },
    ],
    sources: [
      ["Coin", "Encyclopaedia Britannica", "https://www.britannica.com/topic/coin", "article", "초기 주화는 리디아 지역에서 나타났으며 금속에 표시를 찍었다."],
      ["The Origins of Coinage", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/coin/hd_coin.htm", "article", "고대 주화의 무게와 도안은 교환과 권위를 나타냈다."],
    ],
  },
  {
    id: "ar1-lighthouses", ar: 1.5, domain: "history", subtopic: "항해",
    title: "Lights Beside the Sea", titleKo: "바닷가의 불빛",
    summaryEn: "Lighthouses warned sailors and helped them recognize dangerous coasts.", summaryKo: "등대가 밤바다의 배들에게 위치와 위험을 알린 역사를 알아봅니다.",
    learningGoal: "등대의 불빛과 위치가 주는 정보를 설명한다.", keyConcept: "멀리 보이는 규칙적인 신호는 안전한 길을 돕는다.", visualTheme: "lighthouse",
    pages: [
      "Sailors once traveled without electric lights. Dark coasts could hide rocks and cliffs. People built fires on high ground. The flames warned ships near shore. A tall tower made fire easier to see. This became an early lighthouse.",
      "One famous lighthouse stood at Alexandria. It guided ancient ships toward the harbor. Later towers used lamps and mirrors. Glass lenses made beams much brighter. Turning parts created flashing patterns. Each lighthouse could show a special pattern.",
      "Sailors learned those patterns from charts. A flash identified one part of coast. Fog sometimes hid the light. Bells and horns then added sound warnings. Modern ships use electronic navigation too. Lighthouses still mark many dangerous places.",
    ],
    words: [
      ["cliff", "/klɪf/", "절벽", "a high steep wall of rock", "Dark coasts could hide rocks and cliffs."],
      ["harbor", "/ˈhɑːrbər/", "항구", "a safe place for ships", "It guided ancient ships toward the harbor."],
      ["lens", "/lenz/", "렌즈", "curved glass that bends light", "Glass lenses made beams much brighter."],
      ["identified", "/aɪˈdentɪfaɪd/", "알아보게 했다", "showed what something was", "A flash identified one part of coast."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What did early coastal fires do?", options: ["Warn ships", "Catch fish", "Move cliffs"], correct: 0, explanation: "Visible flames marked dangerous shores.", evidence: "The flames warned ships near shore." },
      { type: "inference", prompt: "Why did lighthouses use special patterns?", options: ["Sailors could identify locations", "Every lamp needed music", "Patterns stopped fog"], correct: 0, explanation: "Different flashes marked different coasts.", evidence: "Each lighthouse could show a special pattern." },
      { type: "vocabulary", prompt: "What is a harbor?", options: ["A safe place for ships", "A glass lens", "A warning horn"], correct: 0, explanation: "Ships enter harbors for shelter.", evidence: "It guided ancient ships toward the harbor." },
    ],
    sources: [
      ["Lighthouse", "Encyclopaedia Britannica", "https://www.britannica.com/technology/lighthouse", "article", "등대는 빛과 식별 가능한 신호로 항해를 돕는다."],
      ["Lighthouses", "National Park Service", "https://www.nps.gov/subjects/maritimeheritage/lighthouses.htm", "article", "등대와 음향 신호는 미국 해안 항해의 안전에 활용되었다."],
    ],
  },
  {
    id: "ar1-first-libraries", ar: 1.8, domain: "history", subtopic: "기록",
    title: "The First Libraries", titleKo: "도서관의 시작",
    summaryEn: "Early libraries stored clay tablets before books filled shelves.", summaryKo: "점토판 보관소에서 오늘날 도서관으로 이어진 기록의 역사를 알아봅니다.",
    learningGoal: "초기 도서관이 보관한 자료와 역할을 설명한다.", keyConcept: "도서관은 공동체의 기록을 모아 다음 세대로 전한다.", visualTheme: "library",
    pages: [
      "The first libraries held no paper books. Ancient workers wrote on wet clay. They pressed small signs into tablets. Dry tablets became firm records. Rooms stored them in careful groups. Labels helped people find each subject.",
      "Some collections served rulers and temples. They kept laws, lists, prayers, and stories. One great collection belonged to Ashurbanipal. He ruled ancient Assyria. Thousands of tablets survived from his library. They preserve very old writing today.",
      "Later libraries collected scrolls and books. Some allowed only chosen scholars inside. Public libraries eventually welcomed more readers. Shelves and catalogs organized growing collections. Digital files now join printed works. The main purpose still remains shared knowledge.",
    ],
    words: [
      ["tablet", "/ˈtæblət/", "점토판", "a flat piece used for writing", "They pressed small signs into tablets."],
      ["label", "/ˈleɪbəl/", "표시", "words showing what something contains", "Labels helped people find each subject."],
      ["collection", "/kəˈlekʃən/", "소장품", "a group of gathered things", "Some collections served rulers and temples."],
      ["catalog", "/ˈkætəlɔːɡ/", "목록", "an organized list of materials", "Shelves and catalogs organized growing collections."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What did early writers use?", options: ["Wet clay", "Plastic screens", "Glass pages"], correct: 0, explanation: "Signs were pressed into clay tablets.", evidence: "Ancient workers wrote on wet clay." },
      { type: "inference", prompt: "Why were labels useful?", options: ["They helped find subjects", "They softened clay", "They made rulers taller"], correct: 0, explanation: "Labels organized stored records.", evidence: "Labels helped people find each subject." },
      { type: "vocabulary", prompt: "What is a catalog?", options: ["An organized list", "A clay room", "An ancient ruler"], correct: 0, explanation: "Catalogs guide readers through collections.", evidence: "Shelves and catalogs organized growing collections." },
    ],
    sources: [
      ["Library", "Encyclopaedia Britannica", "https://www.britannica.com/topic/library", "article", "초기 도서관은 점토판과 두루마리 같은 기록물을 수집했다."],
      ["Ashurbanipal Library Project", "British Museum", "https://www.britishmuseum.org/research/projects/ashurbanipal-library-project", "article", "아슈르바니팔 도서관의 수천 점 점토판이 고대 문헌을 전한다."],
    ],
  },
  {
    id: "ar1-mixing-colors", ar: 1.4, domain: "arts", subtopic: "미술",
    title: "New Colors From Old", titleKo: "색을 섞어 새 색 만들기",
    summaryEn: "Artists mix pigments to create new colors, shades, and moods.", summaryKo: "물감의 색을 섞어 새로운 색과 느낌을 만드는 방법을 알아봅니다.",
    learningGoal: "물감 혼색의 결과를 관찰하고 설명한다.", keyConcept: "색의 양과 밝기가 결과를 바꾼다.", visualTheme: "paint",
    pages: [
      "Artists can buy many paint colors. They can also mix their own. Paint holds tiny colored particles called pigments. Mixing brings different pigments together. Yellow and blue paint can make green. The exact green can change greatly.",
      "More yellow makes a warmer green. More blue makes a cooler green. White paint makes colors lighter. Black can make them much darker. Too much black can hide color quickly. Artists add small amounts first.",
      "Painters test mixes on spare paper. Wet paint may look different when dry. Nearby colors also change what we notice. A gray can seem blue near orange. Artists use these effects for mood. Careful mixing takes practice and observation.",
    ],
    words: [
      ["pigment", "/ˈpɪɡmənt/", "색소", "a material giving paint its color", "Paint holds tiny colored particles called pigments."],
      ["exact", "/ɪɡˈzækt/", "정확한", "completely correct or particular", "The exact green can change greatly."],
      ["spare", "/sper/", "여분의", "extra and ready for use", "Painters test mixes on spare paper."],
      ["mood", "/muːd/", "분위기", "the feeling created by something", "Artists use these effects for mood."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can yellow and blue paint make?", options: ["Green", "Red", "White"], correct: 0, explanation: "Those pigments combine into green paint.", evidence: "Yellow and blue paint can make green." },
      { type: "inference", prompt: "Why add black in small amounts?", options: ["It darkens colors quickly", "It always makes green", "It dries every brush"], correct: 0, explanation: "A little black has a strong effect.", evidence: "Too much black can hide color quickly." },
      { type: "vocabulary", prompt: "What is pigment?", options: ["Material giving paint color", "A painting frame", "A wet brush"], correct: 0, explanation: "Pigments create paint colors.", evidence: "Paint holds tiny colored particles called pigments." },
    ],
    sources: [
      ["Pigment", "Encyclopaedia Britannica", "https://www.britannica.com/technology/pigment", "article", "안료는 물감 등에 색을 주는 물질이다."],
      ["Color", "Encyclopaedia Britannica", "https://www.britannica.com/science/color", "article", "색의 혼합과 주변 색의 관계는 보이는 결과에 영향을 준다."],
    ],
  },
  {
    id: "ar1-pottery", ar: 1.7, domain: "arts", subtopic: "공예",
    title: "From Clay to Pot", titleKo: "흙이 그릇이 되기까지",
    summaryEn: "Potters shape, dry, fire, and decorate clay into lasting objects.", summaryKo: "도예가가 점토를 빚고 구워 단단한 그릇을 만드는 과정을 살펴봅니다.",
    learningGoal: "도자기를 만드는 주요 단계를 순서대로 말한다.", keyConcept: "부드러운 점토는 불을 거치며 단단한 도자기가 된다.", visualTheme: "pottery",
    pages: [
      "Clay feels soft when mixed with water. A potter presses out trapped air. Then shaping can begin. Hands may pinch a small bowl. Long clay ropes can form walls. A spinning wheel makes round forms.",
      "The shaped pot must dry slowly. Fast drying may cause cracks. Dry clay is still quite fragile. A kiln heats it very strongly. Heat changes clay into hard pottery. This first heating is called firing.",
      "Some pots receive a glassy glaze. Glaze can add color and shine. It can also seal the surface. The pot returns to the kiln. Patterns may show plants or stories. Finished pottery can last for centuries.",
    ],
    words: [
      ["clay", "/kleɪ/", "점토", "soft earth used for making pottery", "Clay feels soft when mixed with water."],
      ["fragile", "/ˈfrædʒəl/", "깨지기 쉬운", "easy to break", "Dry clay is still quite fragile."],
      ["kiln", "/kɪln/", "가마", "a very hot oven for pottery", "A kiln heats it very strongly."],
      ["glaze", "/ɡleɪz/", "유약", "a glassy covering on pottery", "Some pots receive a glassy glaze."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What changes clay into hard pottery?", options: ["Strong heat", "Cool water", "Moving air alone"], correct: 0, explanation: "Firing changes the clay material.", evidence: "Heat changes clay into hard pottery." },
      { type: "inference", prompt: "Why must a pot dry slowly?", options: ["Fast drying may cause cracks", "Slow pots become blue", "Kilns need wet clay"], correct: 0, explanation: "Even drying protects the shape.", evidence: "Fast drying may cause cracks." },
      { type: "vocabulary", prompt: "What is a kiln?", options: ["A hot pottery oven", "A clay rope", "A painted plant"], correct: 0, explanation: "Pottery is fired inside a kiln.", evidence: "A kiln heats it very strongly." },
    ],
    sources: [
      ["Pottery", "Encyclopaedia Britannica", "https://www.britannica.com/art/pottery", "article", "도자기는 점토를 성형하고 건조한 뒤 가마에서 구워 만든다."],
      ["Ceramics in the Ancient World", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/ceram/hd_ceram.htm", "article", "도예 과정에는 성형, 건조, 소성, 표면 장식이 포함된다."],
    ],
  },
  {
    id: "ar1-keeping-promises", ar: 1.6, domain: "philosophy", subtopic: "책임",
    title: "Why Keep a Promise?", titleKo: "왜 약속을 지켜야 할까?",
    summaryEn: "Promises create trust, but serious harm can change our duty.", summaryKo: "약속이 신뢰를 만드는 이유와 예외를 판단하는 방법을 생각합니다.",
    learningGoal: "약속의 책임과 가능한 예외를 구분한다.", keyConcept: "약속은 다른 사람이 내 행동을 믿게 만든다.", visualTheme: "promise",
    pages: [
      "A promise is more than a guess. You tell someone what you will do. That person may plan around your words. You promise to bring the team ball. Everyone then expects the ball. Your words have created a responsibility.",
      "Keeping promises builds trust over time. People learn that your words are reliable. Breaking one can waste another person's effort. Sometimes you simply forget. Then honesty and an apology matter. You should also repair the problem.",
      "But some promises should not be kept. Imagine promising to hide serious danger. Protecting someone may matter more then. Good judgment asks about possible harm. It also seeks help when needed. Promises guide choices, but reasons still matter.",
    ],
    words: [
      ["promise", "/ˈprɑːmɪs/", "약속", "a firm statement about future action", "A promise is more than a guess."],
      ["expect", "/ɪkˈspekt/", "기대하다", "to believe something will happen", "Everyone then expects the ball."],
      ["reliable", "/rɪˈlaɪəbəl/", "믿을 만한", "able to be trusted", "People learn that your words are reliable."],
      ["repair", "/rɪˈper/", "바로잡다", "to fix damage or a problem", "You should also repair the problem."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What does keeping promises build?", options: ["Trust", "Danger", "Silence"], correct: 0, explanation: "Reliable action supports trust.", evidence: "Keeping promises builds trust over time." },
      { type: "inference", prompt: "Why can a dangerous promise be broken?", options: ["Preventing harm matters more", "Promises are only guesses", "Trust never matters"], correct: 0, explanation: "Safety can outweigh the earlier commitment.", evidence: "Protecting someone may matter more then." },
      { type: "vocabulary", prompt: "What does reliable mean?", options: ["Able to be trusted", "Likely to disappear", "Hard to explain"], correct: 0, explanation: "Reliable words match later actions.", evidence: "People learn that your words are reliable." },
    ],
    sources: [
      ["Promises", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/promises/", "paper", "약속은 상대에게 기대와 의무를 만드는 행위로 논의된다."],
      ["Theories of the Common Law of Contracts", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/contracts-theories/", "paper", "약속과 신뢰는 의무의 근거를 설명하는 핵심 개념이다."],
    ],
  },
  {
    id: "ar1-different-views", ar: 1.8, domain: "philosophy", subtopic: "관점",
    title: "Two Views of One Thing", titleKo: "하나를 다르게 볼 수 있을까?",
    summaryEn: "Different viewpoints can reveal different true parts of one situation.", summaryKo: "같은 상황을 본 사람들의 설명이 달라질 수 있는 이유를 생각합니다.",
    learningGoal: "사실과 관점의 차이를 사례로 설명한다.", keyConcept: "서로 다른 설명이 모두 일부 사실을 담을 수 있다.", visualTheme: "viewpoint",
    pages: [
      "Two children watch the same soccer game. One stands near the blue goal. Another sits beside the red team. Both see the whole field differently. Their places shape what they notice. Neither child sees every detail.",
      "Afterward, they describe one close play. One remembers a strong kick. The other remembers a quick block. These reports sound different. However, both events really happened. Each child noticed a different part.",
      "A viewpoint is not always a mistake. It shows where attention and experience begin. Still, some claims can be checked. A video may show the ball's path. Listening to several views adds information. Careful thinkers compare before deciding.",
    ],
    words: [
      ["detail", "/ˈdiːteɪl/", "세부 사항", "a small part of something larger", "Neither child sees every detail."],
      ["report", "/rɪˈpɔːrt/", "설명", "an account of what happened", "These reports sound different."],
      ["viewpoint", "/ˈvjuːpɔɪnt/", "관점", "a way of seeing something", "A viewpoint is not always a mistake."],
      ["compare", "/kəmˈper/", "비교하다", "to examine how things differ", "Careful thinkers compare before deciding."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Why do the children notice different things?", options: ["They stand in different places", "Only one watches", "The field disappears"], correct: 0, explanation: "Position changes what is easiest to see.", evidence: "Their places shape what they notice." },
      { type: "inference", prompt: "Can both reports contain truth?", options: ["Yes, each noticed one part", "No, only kicks happen", "No, views are always mistakes"], correct: 0, explanation: "Different details occurred in the same play.", evidence: "However, both events really happened." },
      { type: "vocabulary", prompt: "What is a viewpoint?", options: ["A way of seeing something", "A soccer goal", "A video camera"], correct: 0, explanation: "It describes a person's perspective.", evidence: "A viewpoint is not always a mistake." },
    ],
    sources: [
      ["Relativism", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/relativism/", "paper", "판단과 설명은 관점이나 틀에 따라 달라질 수 있다."],
      ["Disagreement", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/disagreement/", "paper", "같은 증거를 접한 사람들도 서로 다른 판단에 이를 수 있다."],
    ],
  },
  {
    id: "ar1-review-memory", ar: 1.5, domain: "self-development", subtopic: "학습",
    title: "Review Before You Forget", titleKo: "잊기 전에 다시 보기",
    summaryEn: "Short reviews spread across time can strengthen a new memory.", summaryKo: "짧은 복습을 여러 날에 나누어 기억을 단단하게 만드는 방법을 배웁니다.",
    learningGoal: "간격을 둔 복습 계획을 세운다.", keyConcept: "한 번 오래 보기보다 여러 번 떠올리기가 도움이 된다.", visualTheme: "memory",
    pages: [
      "New learning can fade surprisingly fast. Reading once may feel easy. That feeling does not guarantee later memory. Close the book after one section. Try saying the main idea aloud. This effort shows what remains.",
      "Review the idea again the next day. Wait longer before another review. Each return asks memory to work. That work can strengthen the path. Short reviews are often enough. They also fit easily into busy days.",
      "Do not only reread every line. Cover answers and test yourself. Make one question for each idea. Mix older questions with newer ones. Mistakes show what needs another look. A simple schedule keeps reviews from disappearing.",
    ],
    words: [
      ["fade", "/feɪd/", "희미해지다", "to slowly become weaker", "New learning can fade surprisingly fast."],
      ["guarantee", "/ˌɡærənˈtiː/", "보장하다", "to promise that something will happen", "That feeling does not guarantee later memory."],
      ["review", "/rɪˈvjuː/", "복습", "another look at learned material", "Review the idea again the next day."],
      ["schedule", "/ˈskedʒuːl/", "일정", "a plan showing when things happen", "A simple schedule keeps reviews from disappearing."],
    ],
    quiz: [
      { type: "comprehension", prompt: "When should the next review happen?", options: ["The next day", "Never again", "Before first reading"], correct: 0, explanation: "The passage begins spacing after one day.", evidence: "Review the idea again the next day." },
      { type: "inference", prompt: "Why cover answers while reviewing?", options: ["Memory must retrieve them", "Books need darkness", "Questions become shorter"], correct: 0, explanation: "Self-testing requires active recall.", evidence: "Cover answers and test yourself." },
      { type: "vocabulary", prompt: "What is a schedule?", options: ["A plan of times", "A memory mistake", "A book cover"], correct: 0, explanation: "It records when reviews happen.", evidence: "A simple schedule keeps reviews from disappearing." },
    ],
    sources: [
      ["Improving Students' Learning With Effective Learning Techniques", "Association for Psychological Science", "https://journals.sagepub.com/doi/10.1177/1529100612453266", "paper", "분산 학습과 연습 시험은 학습을 돕는 효과적인 기법이다."],
      ["The Science of Effective Learning with Spacing and Retrieval Practice", "The Learning Scientists", "https://www.learningscientists.org/blog/2016/7/21-1", "article", "간격을 둔 회상 연습은 장기 기억을 강화하는 데 활용된다."],
    ],
  },
  {
    id: "ar1-starting-hard-things", ar: 1.7, domain: "self-development", subtopic: "실행",
    title: "Start the Hard Thing", titleKo: "어려운 일을 시작하는 법",
    summaryEn: "A tiny first action can lower the barrier to difficult work.", summaryKo: "어려운 일을 아주 작은 첫 행동으로 시작하는 방법을 익힙니다.",
    learningGoal: "막막한 과제를 첫 행동으로 나눈다.", keyConcept: "동기는 시작 전보다 시작한 뒤 생기기도 한다.", visualTheme: "first-step",
    pages: [
      "A hard task can feel enormous. Your mind may search for easier activities. Waiting for perfect energy rarely helps. Instead, shrink the first action. Open the document and write one heading. That action takes less than one minute.",
      "The first action creates a clear path. One heading can lead to one sentence. A sentence can lead to another. You do not promise endless work. Set a short stopping point first. Ten focused minutes may build momentum.",
      "Remove one distraction before starting. Put the phone across the room. Keep only needed materials nearby. When you stop, mark the next action. This makes tomorrow's beginning easier. Small starts still move real work forward.",
    ],
    words: [
      ["enormous", "/ɪˈnɔːrməs/", "거대한", "very large", "A hard task can feel enormous."],
      ["shrink", "/ʃrɪŋk/", "줄이다", "to make something smaller", "Instead, shrink the first action."],
      ["momentum", "/moʊˈmentəm/", "추진력", "growing energy that keeps action moving", "Ten focused minutes may build momentum."],
      ["distraction", "/dɪˈstrækʃən/", "방해 요소", "something pulling attention away", "Remove one distraction before starting."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What is one tiny first action?", options: ["Write one heading", "Finish everything", "Wait for perfect energy"], correct: 0, explanation: "A heading is quick and concrete.", evidence: "Open the document and write one heading." },
      { type: "inference", prompt: "Why mark the next action?", options: ["Tomorrow becomes easier to start", "The phone becomes quieter", "The task disappears"], correct: 0, explanation: "You already know the next move.", evidence: "This makes tomorrow's beginning easier." },
      { type: "vocabulary", prompt: "What is a distraction?", options: ["Something pulling attention away", "A completed task", "A short heading"], correct: 0, explanation: "Distractions interrupt focused work.", evidence: "Remove one distraction before starting." },
    ],
    sources: [
      ["Procrastination", "American Psychological Association", "https://www.apa.org/gradpsych/2010/01/procrastination", "article", "미루기는 감정과 행동 조절의 문제로 다룰 수 있다."],
      ["Healthy Habits", "American Psychological Association", "https://www.apa.org/topics/behavioral-health/healthy-habits", "article", "작고 구체적인 행동과 환경 조정은 습관 실천을 돕는다."],
    ],
  },
  {
    id: "ar1-world-noodles", ar: 1.4, domain: "world-culture", subtopic: "음식",
    title: "Noodles in Many Bowls", titleKo: "여러 나라의 국수",
    summaryEn: "Noodles take many shapes and join local grains, broths, and customs.", summaryKo: "세계 여러 지역의 국수가 재료와 먹는 방식에 따라 달라지는 모습을 봅니다.",
    learningGoal: "여러 국수 문화의 차이와 공통점을 찾는다.", keyConcept: "비슷한 음식도 지역 재료와 생활에 맞게 달라진다.", visualTheme: "noodles",
    pages: [
      "Noodles appear in many parts of Asia. They also appear far beyond Asia. Cooks make long dough in different ways. Some roll and cut thin strips. Others pull dough by hand. Small shapes can be pressed or pinched.",
      "Wheat noodles are common in many regions. Rice makes smooth noodles too. Buckwheat adds a darker color and taste. Some noodles swim in hot broth. Others arrive cold or fried. Sauces can taste sweet, sour, or spicy.",
      "People eat noodles with different tools. Chopsticks lift long strands easily. Forks can twist them together. Some families serve noodles during celebrations. Long noodles may suggest a long life. One simple food carries many local stories.",
    ],
    words: [
      ["dough", "/doʊ/", "반죽", "a soft flour mixture", "Cooks make long dough in different ways."],
      ["strip", "/strɪp/", "가느다란 조각", "a long narrow piece", "Some roll and cut thin strips."],
      ["broth", "/brɔːθ/", "국물", "a thin soup from cooked ingredients", "Some noodles swim in hot broth."],
      ["strand", "/strænd/", "가닥", "one long thin piece", "Chopsticks lift long strands easily."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What grain can make smooth noodles?", options: ["Rice", "Corn only", "No grain"], correct: 0, explanation: "Rice flour makes many noodle types.", evidence: "Rice makes smooth noodles too." },
      { type: "inference", prompt: "Why might long noodles appear at celebrations?", options: ["They may suggest long life", "They always taste sweet", "They need no cooking"], correct: 0, explanation: "The shape can carry a hopeful meaning.", evidence: "Long noodles may suggest a long life." },
      { type: "vocabulary", prompt: "What is broth?", options: ["A thin soup", "A cutting tool", "A grain field"], correct: 0, explanation: "Noodles can be served in soup.", evidence: "Some noodles swim in hot broth." },
    ],
    sources: [
      ["Noodle", "Encyclopaedia Britannica", "https://www.britannica.com/topic/noodle", "article", "국수는 곡물 반죽을 여러 형태로 만들어 조리하는 음식이다."],
      ["Noodles", "Smithsonian Institution", "https://asia.si.edu/learn/for-educators/teaching-china-with-the-smithsonian/lesson-plans/noodles/", "article", "중국의 국수는 재료, 형태, 지역 전통에 따라 다양하다."],
    ],
  },
  {
    id: "ar1-rain-clothes", ar: 1.6, domain: "world-culture", subtopic: "옷과 날씨",
    title: "Clothes for the Rain", titleKo: "비 오는 날의 옷",
    summaryEn: "Communities use local materials and designs to keep rain away.", summaryKo: "여러 지역에서 재료와 생활 방식에 맞춰 비옷을 만든 방법을 살펴봅니다.",
    learningGoal: "비를 막는 옷의 재료와 구조를 비교한다.", keyConcept: "옷의 모양과 재료는 환경과 활동에 맞춰진다.", visualTheme: "rainwear",
    pages: [
      "Rainy weather creates the same basic problem. People need to keep bodies and clothing dry. Different places found different answers. Some used tightly woven plant fibers. Others treated cloth with oil or wax. Water then rolled from the surface.",
      "Wide hats protect the head and face. A sloping shape sends drops outward. Long coats cover the arms and legs. Hoods protect hair while leaving hands free. Fishers need room for pulling ropes. Farmers need easy movement in fields.",
      "Modern rainwear often uses plastic materials. Tiny layers can block liquid water. Some fabrics still let water vapor escape. This helps reduce sweat inside. Old and new designs share one goal. Good clothing fits both weather and work.",
    ],
    words: [
      ["woven", "/ˈwoʊvən/", "짜인", "made by crossing threads", "Some used tightly woven plant fibers."],
      ["wax", "/wæks/", "밀랍", "a water-resistant solid material", "Others treated cloth with oil or wax."],
      ["sloping", "/ˈsloʊpɪŋ/", "기울어진", "going downward at an angle", "A sloping shape sends drops outward."],
      ["vapor", "/ˈveɪpər/", "수증기", "water present as a gas", "Some fabrics still let water vapor escape."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can treat cloth against water?", options: ["Oil or wax", "Dry sand", "Paper labels"], correct: 0, explanation: "Those coatings help water roll away.", evidence: "Others treated cloth with oil or wax." },
      { type: "inference", prompt: "Why should vapor escape from rainwear?", options: ["It reduces sweat inside", "It makes rain heavier", "It closes every hood"], correct: 0, explanation: "Breathable layers release body moisture.", evidence: "This helps reduce sweat inside." },
      { type: "vocabulary", prompt: "What does woven mean?", options: ["Made by crossing threads", "Covered in metal", "Filled with water"], correct: 0, explanation: "Woven fibers form cloth or mats.", evidence: "Some used tightly woven plant fibers." },
    ],
    sources: [
      ["Raincoat", "Encyclopaedia Britannica", "https://www.britannica.com/topic/raincoat", "article", "비옷은 방수 처리된 재료와 구조로 비를 막는다."],
      ["Waterproof Breathable Fabrics", "Smithsonian Institution", "https://invention.si.edu/waterproof-breathable-fabric", "article", "현대 방수 투습 소재는 액체 물을 막고 수증기 이동을 돕는다."],
    ],
  },
  {
    id: "ar1-crossing-rivers", ar: 1.8, domain: "world-culture", subtopic: "이동",
    title: "Ways Across a River", titleKo: "강을 건너는 여러 방법",
    summaryEn: "People cross rivers with boats, bridges, ferries, and seasonal knowledge.", summaryKo: "지역 환경과 필요에 따라 강을 건너는 방법이 달라지는 모습을 알아봅니다.",
    learningGoal: "강을 건너는 방법과 환경 조건을 연결한다.", keyConcept: "이동 방법은 물의 깊이와 흐름, 재료에 맞춰진다.", visualTheme: "river-crossing",
    pages: [
      "A river can connect places and separate them. People need safe ways across. Shallow water may allow careful walking. Deep water usually needs another answer. A small boat can carry people. A ferry follows the same route repeatedly.",
      "Bridges create a path above water. Stone bridges can last for centuries. Wood is lighter and easier to shape. Rope bridges can cross steep valleys. Floating bridges rest on boats or pontoons. Every design answers local conditions.",
      "River knowledge matters as much as tools. Water levels change after heavy rain. Ice may form during cold months. Strong currents can move hidden objects. Local guides watch these changes closely. Safe travelers respect warnings and changing seasons.",
    ],
    words: [
      ["shallow", "/ˈʃæloʊ/", "얕은", "not deep", "Shallow water may allow careful walking."],
      ["ferry", "/ˈferi/", "나룻배", "a boat carrying people across regularly", "A ferry follows the same route repeatedly."],
      ["pontoon", "/pɑːnˈtuːn/", "부교 받침", "a floating support for a bridge", "Floating bridges rest on boats or pontoons."],
      ["current", "/ˈkɜːrənt/", "물살", "water moving in one direction", "Strong currents can move hidden objects."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What follows the same route repeatedly?", options: ["A ferry", "A stone", "A current"], correct: 0, explanation: "Ferries travel back and forth across water.", evidence: "A ferry follows the same route repeatedly." },
      { type: "inference", prompt: "Why do local guides watch water levels?", options: ["Crossing safety can change", "Bridges need songs", "Boats dislike seasons"], correct: 0, explanation: "Rain and currents alter river danger.", evidence: "Water levels change after heavy rain." },
      { type: "vocabulary", prompt: "What does shallow mean?", options: ["Not deep", "Moving quickly", "Made of rope"], correct: 0, explanation: "People may walk only where water is low.", evidence: "Shallow water may allow careful walking." },
    ],
    sources: [
      ["Bridge", "Encyclopaedia Britannica", "https://www.britannica.com/technology/bridge-engineering", "article", "다리는 재료와 지형에 맞춘 여러 구조로 물길을 건넌다."],
      ["Ferry", "Encyclopaedia Britannica", "https://www.britannica.com/technology/ferry", "article", "나룻배는 정해진 수로를 오가며 사람과 물건을 운반한다."],
    ],
  },
];
