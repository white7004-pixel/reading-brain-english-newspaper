import type { LibrarySeed } from "./build-draft";

/** AR 1점대 4차 배치. 문장 10단어 이하, 90~140단어 기준. */
export const AR1_BATCH_04: LibrarySeed[] = [
  {
    id: "ar1-spider-webs", ar: 1.5, domain: "science", subtopic: "동물",
    title: "How Spider Webs Work", titleKo: "거미줄은 어떻게 일할까?",
    summaryEn: "Spider silk can form strong traps, safe paths, and egg covers.", summaryKo: "거미실이 덫과 길, 알집으로 쓰이는 원리를 알아봅니다.",
    learningGoal: "거미실의 여러 기능을 설명한다.", keyConcept: "한 가지 재료도 여러 일을 할 수 있다.", visualTheme: "web",
    pages: [
      "A spider makes silk inside its body. The silk leaves through tiny openings. At first, it is wet. Air makes the thin silk firm. The thread is light and strong. Many spiders build webs with it.",
      "A round web has many lines. Some lines hold the web together. Other lines carry sticky drops. A flying insect touches those drops. Then the insect cannot leave quickly. The spider feels each small shake.",
      "Not every spider builds a round web. Some make tunnels or flat sheets. Spiders also wrap eggs in silk. They may use silk as safety ropes. Old webs can become dirty. Then spiders often build fresh ones.",
    ],
    words: [
      ["silk", "/sɪlk/", "거미실", "a strong thread made by a spider", "A spider makes silk inside its body."],
      ["sticky", "/ˈstɪki/", "끈적한", "able to hold things that touch it", "Other lines carry sticky drops."],
      ["shake", "/ʃeɪk/", "흔들림", "a quick small movement", "The spider feels each small shake."],
      ["wrap", "/ræp/", "감싸다", "to cover something around all sides", "Spiders also wrap eggs in silk."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What makes wet silk firm?", options: ["Air", "Rain", "Darkness"], correct: 0, explanation: "Air firms the new silk.", evidence: "Air makes the thin silk firm." },
      { type: "inference", prompt: "How can a spider notice trapped food?", options: ["It feels the web shake", "It smells the sky", "It hears a bell"], correct: 0, explanation: "Movement travels through the web.", evidence: "The spider feels each small shake." },
      { type: "vocabulary", prompt: "What does sticky mean?", options: ["Able to hold touching things", "Easy to break", "Full of air"], correct: 0, explanation: "Sticky drops catch insects.", evidence: "Other lines carry sticky drops." },
    ],
    sources: [
      ["Spider Webs: Behavior, Function, and Evolution", "Smithsonian Institution", "https://www.si.edu/object/spider-webs-behavior-function-and-evolution%3Asiris_sil_1153251", "article", "거미줄은 포획 외에도 여러 기능을 한다."],
      ["Why Spiders Do Not Stick to Their Own Sticky Web Sites", "Smithsonian Institution", "https://www.si.edu/newsdesk/releases/why-spiders-do-not-stick-their-own-sticky-web-sites", "article", "원형 거미줄에는 끈끈한 부분과 그렇지 않은 부분이 있다."],
    ],
  },
  {
    id: "ar1-teeth", ar: 1.6, domain: "science", subtopic: "인체",
    title: "Inside a Tooth", titleKo: "치아 안에는 무엇이 있을까?",
    summaryEn: "Hard outer layers protect the living center inside each tooth.", summaryKo: "단단한 바깥층이 치아 속의 살아 있는 부분을 보호합니다.",
    learningGoal: "치아의 층과 역할을 구분한다.", keyConcept: "치아는 서로 다른 층으로 이루어진 기관이다.", visualTheme: "tooth",
    pages: [
      "A tooth looks like one hard piece. However, it has several different layers. Enamel covers the part you see. It is the body's hardest material. Enamel guards the softer parts below. It cannot grow back after damage.",
      "Dentin lies under the enamel. It is hard, but enamel is harder. The center is called the pulp. Blood vessels and nerves live there. Nerves can warn you about trouble. That warning may feel like pain.",
      "Germs use sugar left on teeth. They make acids that weaken enamel. A small hole can then begin. Brushing removes food and sticky germs. Fluoride helps enamel stay strong. Clean teeth still need regular checks.",
    ],
    words: [
      ["enamel", "/ɪˈnæməl/", "법랑질", "the hard outside covering of a tooth", "Enamel covers the part you see."],
      ["layer", "/ˈleɪər/", "층", "one level covering another", "However, it has several different layers."],
      ["nerve", "/nɜːrv/", "신경", "a body part carrying messages", "Blood vessels and nerves live there."],
      ["acid", "/ˈæsɪd/", "산", "a substance that can weaken tooth enamel", "They make acids that weaken enamel."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Which layer covers the visible tooth?", options: ["Enamel", "Pulp", "Blood"], correct: 0, explanation: "Enamel is the outside layer.", evidence: "Enamel covers the part you see." },
      { type: "inference", prompt: "Why can tooth trouble hurt?", options: ["Nerves live inside", "Enamel makes noise", "Dentin moves"], correct: 0, explanation: "Nerves carry warning messages.", evidence: "Blood vessels and nerves live there." },
      { type: "vocabulary", prompt: "What is a layer?", options: ["One level covering another", "A tiny germ", "A sweet food"], correct: 0, explanation: "A tooth has materials arranged in levels.", evidence: "However, it has several different layers." },
    ],
    sources: [
      ["The Tooth Decay Process", "National Institute of Dental and Craniofacial Research", "https://www.nidcr.nih.gov/health-info/tooth-decay/more-info/tooth-decay-process", "article", "세균과 당이 만든 산은 법랑질의 무기질을 잃게 한다."],
      ["Tooth", "Encyclopaedia Britannica", "https://www.britannica.com/science/tooth-anatomy", "article", "치아는 법랑질, 상아질, 치수 등 여러 조직으로 이루어진다."],
    ],
  },
  {
    id: "ar1-shadows", ar: 1.4, domain: "science", subtopic: "빛",
    title: "Why Shadows Move", titleKo: "그림자는 왜 움직일까?",
    summaryEn: "A shadow changes when the light, object, or surface moves.", summaryKo: "빛과 물체의 위치에 따라 그림자가 달라지는 원리를 배웁니다.",
    learningGoal: "그림자의 위치와 크기 변화를 예측한다.", keyConcept: "그림자는 빛이 막힌 곳에 생긴다.", visualTheme: "sun",
    pages: [
      "Light usually travels in straight lines. An object can block those lines. A dark shape then appears behind it. We call that shape a shadow. The shadow copies the object's rough outline. Clear light makes a clearer edge.",
      "Move a lamp near the object. The shadow grows much larger. Move the lamp farther away. The shadow becomes smaller again. Turning the lamp moves the shadow too. Light direction sets the shadow's place.",
      "The sun acts like a distant lamp. Morning shadows can look very long. Noon shadows are often much shorter. Earth turns under the shining sun. So sunlight seems to cross our sky. A sundial uses these moving shadows.",
    ],
    words: [
      ["block", "/blɑːk/", "막다", "to stop something from passing", "An object can block those lines."],
      ["shadow", "/ˈʃædoʊ/", "그림자", "a dark shape where light is blocked", "We call that shape a shadow."],
      ["outline", "/ˈaʊtlaɪn/", "윤곽", "the outside shape of something", "The shadow copies the object's rough outline."],
      ["distant", "/ˈdɪstənt/", "멀리 있는", "far away", "The sun acts like a distant lamp."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Where does a shadow appear?", options: ["Behind a blocking object", "Inside a lamp", "Above every cloud"], correct: 0, explanation: "The object blocks straight light lines.", evidence: "A dark shape then appears behind it." },
      { type: "inference", prompt: "How can you make a bigger shadow?", options: ["Move the lamp nearer", "Turn every light off", "Move the lamp farther"], correct: 0, explanation: "A nearer lamp makes the shadow larger.", evidence: "Move a lamp near the object. The shadow grows much larger." },
      { type: "vocabulary", prompt: "What does block mean?", options: ["Stop something passing", "Make something shine", "Draw a circle"], correct: 0, explanation: "An object stops some light.", evidence: "An object can block those lines." },
    ],
    sources: [
      ["Eclipse Snap", "NASA Space Place", "https://spaceplace.nasa.gov/eclipse-snap/en/", "article", "달이 태양빛을 가리면 지구에 그림자가 생긴다."],
      ["Light", "Encyclopaedia Britannica", "https://www.britannica.com/science/light", "article", "빛은 균일한 매질에서 직선으로 진행한다."],
    ],
  },
  {
    id: "ar1-first-paper", ar: 1.7, domain: "history", subtopic: "발명",
    title: "How Paper Began", titleKo: "종이는 어떻게 시작되었을까?",
    summaryEn: "Early Chinese papermakers turned plant fibers into thin writing sheets.", summaryKo: "고대 중국에서 식물 섬유를 얇은 기록 재료로 만든 과정을 알아봅니다.",
    learningGoal: "종이를 만드는 기본 과정과 영향을 설명한다.", keyConcept: "새 기록 재료는 생각의 이동을 바꾼다.", visualTheme: "paper",
    pages: [
      "People wrote before paper existed. They used clay, wood, silk, and bark. Some materials were heavy or costly. China developed an easier writing material. Workers gathered old cloth and plants. They broke these materials into fibers.",
      "The fibers soaked in water. Workers beat them into soft pulp. A screen lifted pulp from the tub. Water ran through the small holes. A thin fiber layer stayed behind. Drying turned that layer into paper.",
      "Paper was light and easy to carry. Makers slowly improved their tools. The craft traveled beyond China. More people could store words and pictures. Books still took much hand work. Later printing made paper even more useful.",
    ],
    words: [
      ["costly", "/ˈkɔːstli/", "비싼", "needing much money", "Some materials were heavy or costly."],
      ["fiber", "/ˈfaɪbər/", "섬유", "a thin thread from a plant", "They broke these materials into fibers."],
      ["pulp", "/pʌlp/", "펄프", "a soft wet mix used for paper", "Workers beat them into soft pulp."],
      ["screen", "/skriːn/", "체", "a frame with many small holes", "A screen lifted pulp from the tub."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What did workers make from fibers?", options: ["Soft pulp", "Hard stone", "Hot metal"], correct: 0, explanation: "Beating wet fibers created pulp.", evidence: "Workers beat them into soft pulp." },
      { type: "inference", prompt: "Why was paper useful for carrying ideas?", options: ["It was light", "It was made of clay", "It needed no words"], correct: 0, explanation: "Light sheets traveled more easily.", evidence: "Paper was light and easy to carry." },
      { type: "vocabulary", prompt: "What is pulp?", options: ["A soft wet paper mix", "A wooden pen", "A silk book"], correct: 0, explanation: "Workers spread pulp into sheets.", evidence: "Workers beat them into soft pulp." },
    ],
    sources: [
      ["Papermaking", "Encyclopaedia Britannica", "https://www.britannica.com/technology/papermaking", "article", "식물성 섬유를 물에 풀고 체로 떠서 종이를 만든다."],
      ["The Invention of Paper", "Library of Congress", "https://www.loc.gov/preservation/care/deterioratebrochure.html", "article", "종이는 섬유질 재료로 만들어지는 기록 매체이다."],
    ],
  },
  {
    id: "ar1-postal-road", ar: 1.5, domain: "history", subtopic: "통신",
    title: "How Letters Traveled", titleKo: "편지는 어떻게 여행했을까?",
    summaryEn: "Postal systems joined riders, roads, trains, and sorting workers.", summaryKo: "우편 제도가 사람과 교통수단을 연결해 편지를 옮긴 역사를 살펴봅니다.",
    learningGoal: "우편망의 역할을 순서대로 설명한다.", keyConcept: "먼 거리 소식은 연결된 사람들의 손을 거친다.", visualTheme: "mail",
    pages: [
      "Long ago, most letters traveled slowly. A messenger carried each written message. Rich rulers used riders between towns. Fresh horses waited along some roads. This made important news move faster. Ordinary people had fewer choices.",
      "Later, public post offices grew. A sender paid to mail a letter. Workers sorted letters by their destinations. Coaches carried bags between post offices. Trains and ships later joined them. Stamps made payment simple to see.",
      "Today, machines sort much of the mail. Trucks and planes cross long distances. Local carriers finish the final part. Every address guides the letter forward. Digital messages now arrive much faster. Yet paper mail still connects people.",
    ],
    words: [
      ["messenger", "/ˈmesɪndʒər/", "전령", "a person carrying a message", "A messenger carried each written message."],
      ["sort", "/sɔːrt/", "분류하다", "to put things into groups", "Workers sorted letters by their destinations."],
      ["stamp", "/stæmp/", "우표", "a small label showing mail payment", "Stamps made payment simple to see."],
      ["address", "/əˈdres/", "주소", "words showing where something should go", "Every address guides the letter forward."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Why did fresh horses wait along roads?", options: ["To move news faster", "To carry farm tools", "To block riders"], correct: 0, explanation: "Riders could change tired horses.", evidence: "This made important news move faster." },
      { type: "inference", prompt: "Why do workers sort letters?", options: ["They have different destinations", "They need new paper", "They are all empty"], correct: 0, explanation: "Sorting sends each letter toward its address.", evidence: "Workers sorted letters by their destinations." },
      { type: "vocabulary", prompt: "What does sort mean?", options: ["Put things into groups", "Write very slowly", "Ride a horse"], correct: 0, explanation: "Mail is grouped by destination.", evidence: "Workers sorted letters by their destinations." },
    ],
    sources: [
      ["Postal History", "United States Postal Service", "https://about.usps.com/who/profile/history/welcome.htm", "article", "우편 서비스는 교통과 분류 체계의 발달과 함께 변화했다."],
      ["Postal Facts: History", "United States Postal Service", "https://facts.usps.com/history/", "article", "우편 역사에는 역마, 철도, 항공 등 다양한 운송 수단이 등장한다."],
    ],
  },
  {
    id: "ar1-ancient-roads", ar: 1.8, domain: "history", subtopic: "교통",
    title: "Roads Joined the World", titleKo: "길이 세상을 이었어요",
    summaryEn: "Ancient roads moved armies, goods, messages, and everyday travelers.", summaryKo: "고대 도로가 물건과 소식, 사람을 연결한 방식을 알아봅니다.",
    learningGoal: "고대 도로가 사회에 준 변화를 설명한다.", keyConcept: "길은 장소뿐 아니라 사람과 생각을 연결한다.", visualTheme: "road",
    pages: [
      "Early paths followed feet across the land. Repeated travel pressed plants and soil down. Growing towns needed wider, stronger roads. Builders cleared rocks and filled holes. Some roads crossed hills with gentle turns. Others used bridges over water.",
      "Roman builders made famous stone roads. They dug deep road beds first. Layers of stone helped drain rainwater. A raised center moved water aside. Soldiers could travel quickly on them. Merchants also carried goods between towns.",
      "Roads changed more than travel time. Inns opened beside busy routes. News moved with passing riders. New foods reached distant markets. Languages and ideas traveled there too. Many modern roads follow older paths. Their journeys began centuries ago.",
    ],
    words: [
      ["route", "/ruːt/", "경로", "a way between two places", "Inns opened beside busy routes."],
      ["layer", "/ˈleɪər/", "층", "one level placed over another", "Layers of stone helped drain rainwater."],
      ["drain", "/dreɪn/", "물을 빼다", "to carry water away", "Layers of stone helped drain rainwater."],
      ["merchant", "/ˈmɜːrtʃənt/", "상인", "a person who buys and sells goods", "Merchants also carried goods between towns."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What helped drain rainwater?", options: ["Layers of stone", "Tall plants", "Wooden carts"], correct: 0, explanation: "Stone layers let water move away.", evidence: "Layers of stone helped drain rainwater." },
      { type: "inference", prompt: "Why did inns open near roads?", options: ["Travelers needed places to rest", "Roads needed roofs", "Stones needed food"], correct: 0, explanation: "Busy routes brought many possible guests.", evidence: "Inns opened beside busy routes." },
      { type: "vocabulary", prompt: "What is a merchant?", options: ["A person trading goods", "A road builder", "A bridge"], correct: 0, explanation: "Merchants moved goods between towns.", evidence: "Merchants also carried goods between towns." },
    ],
    sources: [
      ["Road", "Encyclopaedia Britannica", "https://www.britannica.com/technology/road", "article", "고대 도로는 여러 층과 배수 구조를 사용해 건설되었다."],
      ["Roman Roads", "World History Encyclopedia", "https://www.worldhistory.org/Roman_Roads/", "article", "로마 도로망은 군대와 물자, 사람의 이동을 도왔다."],
    ],
  },
  {
    id: "ar1-puppets", ar: 1.4, domain: "arts", subtopic: "공연",
    title: "When Puppets Tell Stories", titleKo: "인형이 이야기를 들려줄 때",
    summaryEn: "Puppeteers combine movement, voice, craft, and music to tell stories.", summaryKo: "인형극이 움직임과 목소리, 음악을 합쳐 이야기를 전하는 방식을 봅니다.",
    learningGoal: "인형극의 표현 요소를 찾는다.", keyConcept: "관객은 작은 움직임에도 마음과 뜻을 읽는다.", visualTheme: "puppet",
    pages: [
      "A puppet becomes alive through movement. A puppeteer may hide behind a screen. One hand can lift the puppet. Fingers can turn its head. Small moves show fear or joy. A voice gives the character words.",
      "Puppets come in many forms. Strings move some from above. Hands fit inside glove puppets. Rods guide other arms and bodies. Shadow puppets stand before a light. Their dark shapes cross a screen.",
      "Many communities keep old puppet stories. Music may guide each scene. Artists also paint clothes and faces. Children learn stories through the show. New puppeteers add their own ideas. The art changes but still connects generations.",
    ],
    words: [
      ["puppet", "/ˈpʌpɪt/", "인형", "a figure moved to tell a story", "A puppet becomes alive through movement."],
      ["screen", "/skriːn/", "막", "a flat surface hiding or showing action", "A puppeteer may hide behind a screen."],
      ["rod", "/rɑːd/", "막대", "a thin straight stick", "Rods guide other arms and bodies."],
      ["scene", "/siːn/", "장면", "one part of a play", "Music may guide each scene."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What gives a puppet words?", options: ["A voice", "A screen", "A string"], correct: 0, explanation: "The puppeteer supplies the character's voice.", evidence: "A voice gives the character words." },
      { type: "inference", prompt: "Why are small moves important?", options: ["They can show feelings", "They make lights brighter", "They paint clothes"], correct: 0, explanation: "Movement helps audiences read emotion.", evidence: "Small moves show fear or joy." },
      { type: "vocabulary", prompt: "What is a scene?", options: ["One part of a play", "A puppet's hand", "A kind of paint"], correct: 0, explanation: "Music can guide a section of the show.", evidence: "Music may guide each scene." },
    ],
    sources: [
      ["Wayang Puppet Theatre", "UNESCO", "https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063", "article", "인형극은 이야기, 음악, 공예가 결합된 공연 전통이다."],
      ["Traditional Hand Puppetry", "UNESCO", "https://ich.unesco.org/en/USL/traditional-hand-puppetry-01376", "article", "손인형극은 세대를 거쳐 공동체의 이야기와 기술을 전한다."],
    ],
  },
  {
    id: "ar1-dance-stories", ar: 1.7, domain: "arts", subtopic: "무용",
    title: "Dance Can Tell a Story", titleKo: "춤도 이야기를 들려줘요",
    summaryEn: "Dancers use shape, speed, space, and rhythm without spoken words.", summaryKo: "춤추는 사람이 몸과 공간, 리듬으로 뜻을 전하는 방법을 알아봅니다.",
    learningGoal: "춤의 움직임에서 표현 요소를 찾는다.", keyConcept: "몸의 움직임도 하나의 표현 언어이다.", visualTheme: "dance",
    pages: [
      "Dance can speak without spoken words. A dancer bends, reaches, turns, and jumps. Each action creates a new shape. Slow steps may feel calm or sad. Fast steps may show joy. Faces and hands add more meaning.",
      "Space matters in every dance. Dancers can move close together. They can also spread far apart. One dancer may follow another. A group can make lines or circles. These choices help build the story.",
      "Rhythm tells dancers when to move. Drums may mark a strong beat. Sometimes dancers make their own sounds. Feet stamp against the floor. Costumes can make movement easier to see. Practice joins every part together.",
    ],
    words: [
      ["bend", "/bend/", "구부리다", "to make part of the body curve", "A dancer bends, reaches, turns, and jumps."],
      ["space", "/speɪs/", "공간", "the area where movement happens", "Space matters in every dance."],
      ["rhythm", "/ˈrɪðəm/", "리듬", "a pattern of beats", "Rhythm tells dancers when to move."],
      ["stamp", "/stæmp/", "발을 구르다", "to bring a foot down hard", "Feet stamp against the floor."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What may fast steps show?", options: ["Joy", "Sleep", "Cold"], correct: 0, explanation: "Speed can help express emotion.", evidence: "Fast steps may show joy." },
      { type: "inference", prompt: "Why do costumes help audiences?", options: ["They make movement clearer", "They stop all sound", "They teach the beat"], correct: 0, explanation: "Moving cloth can highlight body actions.", evidence: "Costumes can make movement easier to see." },
      { type: "vocabulary", prompt: "What is rhythm?", options: ["A pattern of beats", "A dance shoe", "An empty room"], correct: 0, explanation: "Rhythm guides movement timing.", evidence: "Rhythm tells dancers when to move." },
    ],
    sources: [
      ["Dance", "Encyclopaedia Britannica", "https://www.britannica.com/art/dance", "article", "춤은 리듬에 맞춘 몸의 움직임으로 생각과 감정을 표현한다."],
      ["Performing Arts", "UNESCO", "https://ich.unesco.org/en/performing-arts-00054", "article", "무용과 음악 등 공연 예술은 공동체의 문화 표현을 전한다."],
    ],
  },
  {
    id: "ar1-courage", ar: 1.6, domain: "philosophy", subtopic: "덕",
    title: "What Makes Courage?", titleKo: "용기란 무엇일까?",
    summaryEn: "Courage means facing a worthy fear with care and good reasons.", summaryKo: "용기가 두려움이 없는 상태가 아니라 올바르게 마주하는 태도임을 생각합니다.",
    learningGoal: "용기와 무모함의 차이를 말한다.", keyConcept: "좋은 용기에는 두려움과 판단이 함께 있다.", visualTheme: "courage",
    pages: [
      "Courage does not mean feeling no fear. A brave person can feel very afraid. The person still faces something important. Maybe a friend needs help. Maybe truth needs a voice. Fear can show that something matters.",
      "But every risky act is not brave. Jumping from danger into greater danger is foolish. Courage uses thought before action. It asks what good may happen. It also asks who may get hurt. Good reasons guide the choice.",
      "Small acts can show real courage. You can admit a mistake. You can welcome someone left alone. You can ask for needed help. These actions may feel uncomfortable. Practice makes brave choices easier later.",
    ],
    words: [
      ["courage", "/ˈkɜːrɪdʒ/", "용기", "strength to face something difficult", "Courage does not mean feeling no fear."],
      ["risky", "/ˈrɪski/", "위험한", "likely to bring danger", "But every risky act is not brave."],
      ["foolish", "/ˈfuːlɪʃ/", "어리석은", "showing poor judgment", "Jumping from danger into greater danger is foolish."],
      ["admit", "/ədˈmɪt/", "인정하다", "to say something is true", "You can admit a mistake."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Can a brave person feel fear?", options: ["Yes", "No", "Only at night"], correct: 0, explanation: "Courage can exist with fear.", evidence: "A brave person can feel very afraid." },
      { type: "inference", prompt: "Why is every risky act not courageous?", options: ["Courage also needs judgment", "Risk is always easy", "Brave people never act"], correct: 0, explanation: "Good reasons and possible harm matter.", evidence: "Courage uses thought before action." },
      { type: "vocabulary", prompt: "What does admit mean?", options: ["Say something is true", "Hide a mistake", "Run from danger"], correct: 0, explanation: "Admitting means honestly accepting a fact.", evidence: "You can admit a mistake." },
    ],
    sources: [
      ["Virtue Ethics", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/ethics-virtue/", "paper", "용기는 상황에 맞는 감정과 행동을 요구하는 덕으로 다뤄진다."],
      ["Plato's Ethics", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/plato-ethics/", "paper", "용기와 지혜 같은 덕은 좋은 삶의 중요한 요소이다."],
    ],
  },
  {
    id: "ar1-kindness-unseen", ar: 1.8, domain: "philosophy", subtopic: "도덕",
    title: "Kind When Nobody Sees", titleKo: "아무도 보지 않을 때의 친절",
    summaryEn: "A kind choice can matter even without praise or a reward.", summaryKo: "칭찬이나 보상이 없어도 친절한 선택이 중요한 이유를 생각합니다.",
    learningGoal: "행동의 이유와 결과를 함께 살핀다.", keyConcept: "옳은 행동의 가치는 칭찬에만 달리지 않는다.", visualTheme: "kindness",
    pages: [
      "You find a lost toy outside. Nobody sees you pick it up. You could keep it easily. You could also find its owner. Which choice is kind? The answer does not need an audience.",
      "Kind actions notice another person's needs. Returning the toy stops someone's sadness. It also respects what belongs to others. Praise may feel good afterward. Still, praise is not the main reason. The owner's need comes first.",
      "Sometimes kindness costs time or effort. That does not make it worthless. Your hidden choice also shapes your habits. One fair act helps the next. You become someone others can trust. You also learn to trust yourself.",
    ],
    words: [
      ["owner", "/ˈoʊnər/", "주인", "the person something belongs to", "You could also find its owner."],
      ["audience", "/ˈɔːdiəns/", "보는 사람들", "people watching an event", "The answer does not need an audience."],
      ["praise", "/preɪz/", "칭찬", "words showing approval", "Praise may feel good afterward."],
      ["trust", "/trʌst/", "믿다", "to believe someone is honest and reliable", "You become someone others can trust."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What kind choice can follow finding the toy?", options: ["Find its owner", "Hide it", "Break it"], correct: 0, explanation: "Returning it meets the owner's need.", evidence: "You could also find its owner." },
      { type: "inference", prompt: "Why does hidden kindness still matter?", options: ["It helps others and shapes habits", "It always brings prizes", "It makes toys new"], correct: 0, explanation: "The action helps now and influences later choices.", evidence: "Your hidden choice also shapes your habits." },
      { type: "vocabulary", prompt: "What is praise?", options: ["Words showing approval", "A lost object", "A private habit"], correct: 0, explanation: "Praise is a positive response.", evidence: "Praise may feel good afterward." },
    ],
    sources: [
      ["Altruism", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/altruism/", "paper", "타인을 위한 행동은 행위자의 보상과 별개로 분석할 수 있다."],
      ["The Definition of Morality", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/morality-definition/", "paper", "도덕 판단은 타인에게 미치는 영향과 행동의 기준을 함께 다룬다."],
    ],
  },
  {
    id: "ar1-small-plan", ar: 1.4, domain: "self-development", subtopic: "계획",
    title: "Make a Small Plan", titleKo: "작은 계획을 세워요",
    summaryEn: "A clear small plan makes a large task easier to begin.", summaryKo: "큰 일을 작고 분명한 행동으로 나누는 방법을 익힙니다.",
    learningGoal: "목표를 실행 가능한 작은 단계로 바꾼다.", keyConcept: "좋은 계획은 다음 행동을 분명하게 만든다.", visualTheme: "steps",
    pages: [
      "A big job can feel like fog. You cannot see where to begin. A small plan clears one step. Name exactly what you will do. Do not write only, study science. Write, read two pages after dinner.",
      "Choose a time and place. Put needed tools there first. Make the first step very easy. Five minutes can be enough. Starting often brings more energy. You may continue after the timer rings.",
      "Check the plan when you finish. Mark what worked well. Change any step that felt too large. A changed plan is not failure. It is useful new information. Tomorrow's plan can fit you better.",
    ],
    words: [
      ["plan", "/plæn/", "계획", "steps chosen before doing something", "A small plan clears one step."],
      ["exactly", "/ɪɡˈzæktli/", "정확히", "in a clear and exact way", "Name exactly what you will do."],
      ["timer", "/ˈtaɪmər/", "타이머", "a tool that measures set time", "You may continue after the timer rings."],
      ["failure", "/ˈfeɪljər/", "실패", "not reaching a wanted result", "A changed plan is not failure."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What should a plan name?", options: ["Exactly what you will do", "Every future dream", "Only the subject"], correct: 0, explanation: "Specific actions are easier to begin.", evidence: "Name exactly what you will do." },
      { type: "inference", prompt: "Why put tools out first?", options: ["Starting becomes easier", "Tools need sleep", "The task becomes longer"], correct: 0, explanation: "Ready tools remove a starting barrier.", evidence: "Put needed tools there first." },
      { type: "vocabulary", prompt: "What is a timer?", options: ["A tool measuring set time", "A science book", "A large goal"], correct: 0, explanation: "It rings after the chosen time.", evidence: "You may continue after the timer rings." },
    ],
    sources: [
      ["Goal Setting", "Centers for Disease Control and Prevention", "https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html", "article", "구체적이고 관리 가능한 계획은 행동 실천을 돕는다."],
      ["Goal Setting", "American Psychological Association", "https://www.apa.org/topics/behavioral-health/healthy-habits", "article", "작은 행동과 환경 준비는 건강한 습관 형성에 활용된다."],
    ],
  },
  {
    id: "ar1-short-breaks", ar: 1.7, domain: "self-development", subtopic: "집중",
    title: "A Break Helps You Return", titleKo: "쉬고 나면 다시 집중해요",
    summaryEn: "A short active break can reset attention during long work.", summaryKo: "긴 작업 사이의 짧은 휴식이 집중을 되찾는 데 주는 도움을 배웁니다.",
    learningGoal: "효과적인 짧은 휴식을 계획한다.", keyConcept: "휴식은 일을 포기하는 것이 아니라 돌아올 준비이다.", visualTheme: "break",
    pages: [
      "Attention can fade during one long task. Words may stop making sense. You may read one line twice. That can be a break signal. Stop for a few minutes. Decide your return time before leaving.",
      "Stand up and move your body. Look at something far away. Drink water if you feel thirsty. Slow breaths can release tight muscles. These choices give your mind new input. Endless videos may pull attention elsewhere.",
      "Return when the short break ends. Read the last useful line again. Then choose one small next action. Notice whether your focus feels fresher. Different tasks may need different breaks. Test what truly helps you return.",
    ],
    words: [
      ["attention", "/əˈtenʃən/", "주의", "careful focus on something", "Attention can fade during one long task."],
      ["signal", "/ˈsɪɡnəl/", "신호", "something showing action may be needed", "That can be a break signal."],
      ["release", "/rɪˈliːs/", "풀어 주다", "to let something become loose", "Slow breaths can release tight muscles."],
      ["focus", "/ˈfoʊkəs/", "집중", "attention given to one thing", "Notice whether your focus feels fresher."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What should you decide before leaving?", options: ["Your return time", "A new subject", "Tomorrow's lunch"], correct: 0, explanation: "A return time keeps the break bounded.", evidence: "Decide your return time before leaving." },
      { type: "inference", prompt: "Why can endless videos be a poor break?", options: ["They may pull attention away", "They make water cold", "They strengthen muscles"], correct: 0, explanation: "They can make returning harder.", evidence: "Endless videos may pull attention elsewhere." },
      { type: "vocabulary", prompt: "What does focus mean?", options: ["Attention on one thing", "A long video", "A glass of water"], correct: 0, explanation: "Focus is directed attention.", evidence: "Notice whether your focus feels fresher." },
    ],
    sources: [
      ["Physical Activity Breaks for the Workplace", "Centers for Disease Control and Prevention", "https://www.cdc.gov/workplace-health-promotion/php/physical-activity/index.html", "article", "짧은 신체 활동은 오래 앉아 있는 시간을 나누는 방법이다."],
      ["Give Me a Break", "American Psychological Association", "https://www.apa.org/monitor/2019/01/break", "article", "휴식의 방식은 이후 집중과 회복에 영향을 줄 수 있다."],
    ],
  },
  {
    id: "ar1-school-days", ar: 1.5, domain: "world-culture", subtopic: "교육",
    title: "School Days Around the World", titleKo: "세계의 학교생활",
    summaryEn: "School days differ, but children everywhere learn with others.", summaryKo: "나라마다 다른 학교생활과 함께 배우는 공통점을 살펴봅니다.",
    learningGoal: "학교생활의 차이와 공통점을 비교한다.", keyConcept: "배움의 모습은 달라도 교육받을 권리는 같다.", visualTheme: "school",
    pages: [
      "School does not look the same everywhere. Some children walk through busy cities. Others travel along quiet country roads. Classes may begin early or later. Buildings can be large or very small. Weather also changes the school day.",
      "Students may wear uniforms in some places. Lunch can come from home or school. Some classrooms use many computers. Others share a few books carefully. Lessons may use different languages. Children still ask questions and practice skills.",
      "Not every child can attend safely. Distance, conflict, or cost may block learning. Communities create buses and flexible classes. They also train teachers and build schools. Education opens choices for the future. Every learner deserves that chance.",
    ],
    words: [
      ["uniform", "/ˈjuːnɪfɔːrm/", "교복", "special clothes worn by one group", "Students may wear uniforms in some places."],
      ["share", "/ʃer/", "함께 쓰다", "to use something with others", "Others share a few books carefully."],
      ["attend", "/əˈtend/", "다니다", "to go regularly to a place", "Not every child can attend safely."],
      ["education", "/ˌedʒuˈkeɪʃən/", "교육", "learning through teaching and study", "Education opens choices for the future."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What may students wear in some places?", options: ["Uniforms", "Space suits", "Rain boots only"], correct: 0, explanation: "Some schools use group clothing.", evidence: "Students may wear uniforms in some places." },
      { type: "inference", prompt: "Why create buses for students?", options: ["Distance may block learning", "Books are too quiet", "Lunch needs travel"], correct: 0, explanation: "Transport can make school reachable.", evidence: "Distance, conflict, or cost may block learning." },
      { type: "vocabulary", prompt: "What is education?", options: ["Learning through teaching", "A school lunch", "A country road"], correct: 0, explanation: "Education develops knowledge and skills.", evidence: "Education opens choices for the future." },
    ],
    sources: [
      ["Education", "UNICEF", "https://www.unicef.org/education", "article", "모든 어린이는 질 높은 교육을 받을 권리가 있다."],
      ["Education Case Studies", "UNICEF", "https://www.unicef.org/education/resources/case-studies", "article", "지역 상황에 맞춘 여러 교육 접근법이 활용된다."],
    ],
  },
  {
    id: "ar1-carrying-water", ar: 1.6, domain: "world-culture", subtopic: "생활",
    title: "Bringing Water Home", titleKo: "물을 집으로 가져오는 길",
    summaryEn: "Many families carry water, while safe nearby taps change daily life.", summaryKo: "물을 길어 오는 생활과 가까운 안전한 물의 중요성을 알아봅니다.",
    learningGoal: "안전한 식수 접근이 생활에 미치는 영향을 설명한다.", keyConcept: "가까운 깨끗한 물은 시간과 건강을 지킨다.", visualTheme: "water-pot",
    pages: [
      "Turn a tap, and water appears. Yet many homes have no nearby tap. Families may walk far for water. They carry cans, jars, or buckets. Water is heavy on the return trip. This work can take many hours.",
      "The water source must also be safe. Clear water can still hold harmful germs. Covered wells help keep dirt outside. Pumps can bring groundwater upward. Filters remove some unwanted materials. Safe storage protects water at home.",
      "A nearby water point changes daily life. Children have more time for school. Adults gain time for other work. Families can wash hands more often. Communities must maintain pipes and pumps. Clean water needs shared care.",
    ],
    words: [
      ["bucket", "/ˈbʌkɪt/", "양동이", "an open container with a handle", "They carry cans, jars, or buckets."],
      ["source", "/sɔːrs/", "원천", "the place something comes from", "The water source must also be safe."],
      ["filter", "/ˈfɪltər/", "거르개", "a tool removing unwanted material", "Filters remove some unwanted materials."],
      ["maintain", "/meɪnˈteɪn/", "관리하다", "to keep something working well", "Communities must maintain pipes and pumps."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What may families carry water in?", options: ["Buckets", "Pillows", "Books"], correct: 0, explanation: "Buckets are common water containers.", evidence: "They carry cans, jars, or buckets." },
      { type: "inference", prompt: "How can nearby water help school attendance?", options: ["Children spend less time carrying it", "Water writes lessons", "Pumps become teachers"], correct: 0, explanation: "Less travel leaves more learning time.", evidence: "Children have more time for school." },
      { type: "vocabulary", prompt: "What does maintain mean?", options: ["Keep something working", "Carry something home", "Make water dirty"], correct: 0, explanation: "Pipes and pumps need ongoing care.", evidence: "Communities must maintain pipes and pumps." },
    ],
    sources: [
      ["Water, Sanitation and Hygiene", "UNICEF", "https://www.unicef.org/wash", "article", "안전하고 가까운 물은 아동의 건강과 교육 기회에 영향을 준다."],
      ["Drinking-water", "World Health Organization", "https://www.who.int/news-room/fact-sheets/detail/drinking-water", "article", "오염된 식수는 질병을 퍼뜨릴 수 있으며 안전한 관리가 필요하다."],
    ],
  },
  {
    id: "ar1-world-music", ar: 1.8, domain: "world-culture", subtopic: "음악문화",
    title: "Music Travels With People", titleKo: "음악은 사람과 함께 여행해요",
    summaryEn: "Music carries memories, changes through meetings, and belongs to communities.", summaryKo: "음악이 사람과 함께 이동하며 만나고 변하는 과정을 살펴봅니다.",
    learningGoal: "음악과 공동체의 관계를 설명한다.", keyConcept: "음악은 이동하면서도 사람들의 기억을 이어 준다.", visualTheme: "world-music",
    pages: [
      "Every community makes some kind of music. People sing during work and rest. Music marks weddings, games, and holidays. Parents teach songs to children. Those songs hold names and memories. A familiar tune can feel like home.",
      "People also carry music when they move. Instruments travel to new places. Musicians meet different sounds and rhythms. They copy, change, and combine ideas. A new style may grow there. Music never stays inside one border.",
      "Recordings now let songs travel quickly. Listeners can hear distant traditions online. However, music belongs to real communities. Learning its story shows respect. Credit should follow the makers. Careful listening can connect people fairly.",
    ],
    words: [
      ["tune", "/tuːn/", "곡조", "a simple series of musical notes", "A familiar tune can feel like home."],
      ["rhythm", "/ˈrɪðəm/", "리듬", "a pattern of musical beats", "Musicians meet different sounds and rhythms."],
      ["border", "/ˈbɔːrdər/", "경계", "a line between countries or areas", "Music never stays inside one border."],
      ["credit", "/ˈkredɪt/", "공로 인정", "public notice of who made something", "Credit should follow the makers."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Who may teach songs to children?", options: ["Parents", "Only machines", "Road builders"], correct: 0, explanation: "Songs often pass through families.", evidence: "Parents teach songs to children." },
      { type: "inference", prompt: "How can a new music style grow?", options: ["Musicians combine ideas", "Borders stop every sound", "Recordings erase songs"], correct: 0, explanation: "Meetings can create new musical mixtures.", evidence: "They copy, change, and combine ideas." },
      { type: "vocabulary", prompt: "What is a tune?", options: ["A series of musical notes", "A country line", "A wedding meal"], correct: 0, explanation: "A tune is the part people may hum.", evidence: "A familiar tune can feel like home." },
    ],
    sources: [
      ["Performing Arts", "UNESCO", "https://ich.unesco.org/en/performing-arts-00054", "article", "음악은 공동체의 행사와 기억을 전하는 무형문화유산이다."],
      ["Smithsonian Folkways Recordings", "Smithsonian Institution", "https://folkways.si.edu/about", "article", "세계의 음악 기록은 음악과 그것을 만든 공동체의 맥락을 함께 보존한다."],
    ],
  },
];
