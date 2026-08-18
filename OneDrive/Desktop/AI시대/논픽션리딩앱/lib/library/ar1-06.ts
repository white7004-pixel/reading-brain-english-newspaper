import type { LibrarySeed } from "./build-draft";

/** AR 1점대 6차 배치. 문장 10단어 이하, 90~140단어 기준. */
export const AR1_BATCH_06: LibrarySeed[] = [
  {
    id: "ar1-leaf-holes", ar: 1.5, domain: "science", subtopic: "식물",
    title: "Tiny Doors in a Leaf", titleKo: "잎의 작은 문",
    summaryEn: "Tiny leaf openings trade gases and release water vapor.", summaryKo: "잎의 작은 숨구멍이 기체와 수분을 주고받는 과정을 알아봅니다.",
    learningGoal: "기공의 역할을 설명한다.", keyConcept: "잎의 작은 구멍은 식물과 공기를 연결한다.", visualTheme: "leaf",
    pages: [
      "A leaf looks solid from far away. Up close, it has tiny openings. These openings are called stomata. Most are too small to see. Each opening has two guard cells. The cells can change the opening's size.",
      "Carbon dioxide enters through open stomata. The leaf uses this gas with light. Together, they help the plant make food. Oxygen can then leave the leaf. Water vapor also escapes through stomata. This process cools the plant.",
      "A plant must control these tiny doors. Open stomata allow useful gas exchange. However, they also let water escape. During dry times, many stomata close. The plant then saves more water. Leaves balance growth with staying safe.",
    ],
    words: [
      ["opening", "/ˈoʊpənɪŋ/", "구멍", "a space allowing passage", "Up close, it has tiny openings."],
      ["stomata", "/ˈstoʊmətə/", "기공", "tiny openings on plant leaves", "These openings are called stomata."],
      ["vapor", "/ˈveɪpər/", "수증기", "water present as a gas", "Water vapor also escapes through stomata."],
      ["balance", "/ˈbæləns/", "균형을 맞추다", "to keep needs in a useful relation", "Leaves balance growth with staying safe."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What enters through open stomata?", options: ["Carbon dioxide", "Soil", "Roots"], correct: 0, explanation: "The leaf needs this gas for food making.", evidence: "Carbon dioxide enters through open stomata." },
      { type: "inference", prompt: "Why may stomata close during dry times?", options: ["To save water", "To catch insects", "To make leaves larger"], correct: 0, explanation: "Closed openings reduce water loss.", evidence: "The plant then saves more water." },
      { type: "vocabulary", prompt: "What is vapor?", options: ["Water as a gas", "A guard cell", "Plant food"], correct: 0, explanation: "Water leaves the leaf in gas form.", evidence: "Water vapor also escapes through stomata." },
    ],
    sources: [
      ["Stoma", "Encyclopaedia Britannica", "https://www.britannica.com/science/stoma", "article", "기공은 잎의 기체 교환과 수분 증발을 조절한다."],
      ["Photosynthesis", "Khan Academy", "https://www.khanacademy.org/science/biology/photosynthesis-in-plants", "article", "식물은 이산화탄소와 빛을 이용해 유기물을 만든다."],
    ],
  },
  {
    id: "ar1-magnets", ar: 1.4, domain: "science", subtopic: "물리",
    title: "What Magnets Pull", titleKo: "자석은 무엇을 끌어당길까?",
    summaryEn: "Magnets pull certain metals and have two interacting poles.", summaryKo: "자석이 특정 금속을 끌어당기고 극끼리 힘을 주고받는 원리를 배웁니다.",
    learningGoal: "자석에 붙는 물질과 극의 성질을 구분한다.", keyConcept: "모든 금속이 자석에 붙는 것은 아니다.", visualTheme: "magnet",
    pages: [
      "A magnet can pull some objects closer. Iron and steel often respond strongly. A steel paper clip jumps toward it. Wood and plastic do not respond. Copper also shows little simple attraction. Not every metal sticks to magnets.",
      "Every magnet has two poles. We call them north and south. Opposite poles pull toward each other. Matching poles push away instead. This push can happen without touching. Magnetic force acts across a small space.",
      "Earth behaves like a huge magnet. A compass needle is a small magnet. It turns toward Earth's magnetic north. Travelers use that direction for guidance. Magnets also work inside many machines. Speakers and motors depend on magnetic forces.",
    ],
    words: [
      ["magnet", "/ˈmæɡnət/", "자석", "an object producing magnetic force", "A magnet can pull some objects closer."],
      ["attraction", "/əˈtrækʃən/", "끌어당김", "a force pulling things together", "Copper also shows little simple attraction."],
      ["pole", "/poʊl/", "극", "one end of a magnet", "Every magnet has two poles."],
      ["compass", "/ˈkʌmpəs/", "나침반", "a tool showing direction", "A compass needle is a small magnet."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What often responds strongly to magnets?", options: ["Iron and steel", "Wood and plastic", "Paper and glass"], correct: 0, explanation: "Those materials are commonly magnetic.", evidence: "Iron and steel often respond strongly." },
      { type: "inference", prompt: "What happens between matching poles?", options: ["They push apart", "They melt", "They become wood"], correct: 0, explanation: "Like poles repel each other.", evidence: "Matching poles push away instead." },
      { type: "vocabulary", prompt: "What is a compass?", options: ["A direction tool", "A steel clip", "A motor sound"], correct: 0, explanation: "Its needle points toward magnetic north.", evidence: "A compass needle is a small magnet." },
    ],
    sources: [
      ["Magnet", "Encyclopaedia Britannica", "https://www.britannica.com/science/magnet", "article", "자석은 철 같은 물질에 힘을 주며 두 극을 가진다."],
      ["Geomagnetism Frequently Asked Questions", "NOAA", "https://www.ncei.noaa.gov/products/geomagnetism-frequently-asked-questions", "article", "지구는 자기장을 가지며 나침반은 그 방향을 따른다."],
    ],
  },
  {
    id: "ar1-snail-travel", ar: 1.6, domain: "science", subtopic: "동물",
    title: "How a Snail Moves", titleKo: "달팽이는 어떻게 움직일까?",
    summaryEn: "A snail uses muscle waves and slippery mucus to glide.", summaryKo: "달팽이가 근육의 물결과 점액을 이용해 미끄러지듯 이동하는 모습을 봅니다.",
    learningGoal: "달팽이 이동에 근육과 점액이 하는 일을 설명한다.", keyConcept: "느린 이동에도 정교한 몸의 움직임이 필요하다.", visualTheme: "snail",
    pages: [
      "A snail has no walking legs. Its broad underside is called a foot. This foot holds many strong muscles. Muscle waves move from back to front. The waves push against the ground. The snail slowly slides forward.",
      "The foot also releases slippery mucus. Mucus reduces rough rubbing below. It helps the snail cross sharp surfaces. A shining trail stays behind. Making mucus uses water and energy. Dry ground can make travel difficult.",
      "Many land snails move during damp times. Night and rain help prevent drying. Feelers test the path ahead. The upper pair usually carries eyes. A snail can pull inward quickly. Its shell then offers useful protection.",
    ],
    words: [
      ["muscle", "/ˈmʌsəl/", "근육", "body tissue creating movement", "This foot holds many strong muscles."],
      ["mucus", "/ˈmjuːkəs/", "점액", "a slippery substance made by the body", "The foot also releases slippery mucus."],
      ["trail", "/treɪl/", "지나간 흔적", "a mark left behind", "A shining trail stays behind."],
      ["damp", "/dæmp/", "축축한", "slightly wet", "Many land snails move during damp times."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What moves along a snail's foot?", options: ["Muscle waves", "Tiny wheels", "Hard scales"], correct: 0, explanation: "Muscle waves push the snail forward.", evidence: "Muscle waves move from back to front." },
      { type: "inference", prompt: "Why is dry ground difficult?", options: ["Mucus needs water", "Shells become larger", "Feelers stop seeing"], correct: 0, explanation: "Travel mucus costs water.", evidence: "Making mucus uses water and energy." },
      { type: "vocabulary", prompt: "What does damp mean?", options: ["Slightly wet", "Very sharp", "Completely hidden"], correct: 0, explanation: "Snails often travel when moisture is available.", evidence: "Many land snails move during damp times." },
    ],
    sources: [
      ["Gastropod", "Encyclopaedia Britannica", "https://www.britannica.com/animal/gastropod", "article", "복족류는 근육질 발과 점액을 이용해 이동한다."],
      ["Snails", "Smithsonian Institution", "https://www.si.edu/spotlight/snails", "article", "육상 달팽이는 근육질 발과 점액으로 표면을 이동한다."],
    ],
  },
  {
    id: "ar1-first-calendars", ar: 1.7, domain: "history", subtopic: "시간",
    title: "Counting Days Long Ago", titleKo: "옛날에는 날짜를 어떻게 셌을까?",
    summaryEn: "Early calendars followed repeating moons, seasons, and the sun.", summaryKo: "옛사람들이 달과 계절, 태양의 반복을 관찰해 달력을 만든 과정을 알아봅니다.",
    learningGoal: "초기 달력이 자연의 반복을 사용한 이유를 설명한다.", keyConcept: "달력은 반복되는 자연 변화를 시간의 단위로 삼는다.", visualTheme: "calendar",
    pages: [
      "People needed to know when seasons returned. Farmers watched for planting and harvest times. Travelers watched changing weather. The sky offered repeating patterns. The moon grew round and thin again. This cycle helped count longer periods.",
      "Some early calendars followed moon cycles. Others tracked the sun and seasons. Twelve moon cycles are shorter than one solar year. Extra days or months fixed the difference. Careful watchers recorded sunrise positions. Priests and officials often kept these records.",
      "Different societies built different calendars. Their month names and new years varied. Holidays depended on these systems too. Today's common calendar follows the solar year. Other calendars remain important beside it. Calendars still organize shared time.",
    ],
    words: [
      ["harvest", "/ˈhɑːrvɪst/", "수확", "the gathering of ripe crops", "Farmers watched for planting and harvest times."],
      ["cycle", "/ˈsaɪkəl/", "주기", "a set of changes that repeats", "This cycle helped count longer periods."],
      ["solar", "/ˈsoʊlər/", "태양의", "related to the sun", "Twelve moon cycles are shorter than one solar year."],
      ["varied", "/ˈverid/", "서로 달랐다", "were different", "Their month names and new years varied."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What sky object helped count periods?", options: ["The moon", "A bridge", "A coin"], correct: 0, explanation: "Its changing shape repeats regularly.", evidence: "This cycle helped count longer periods." },
      { type: "inference", prompt: "Why were extra days sometimes added?", options: ["Moon cycles and solar years differ", "Harvests needed longer names", "Sunrise stopped moving"], correct: 0, explanation: "Calendar cycles did not match exactly.", evidence: "Extra days or months fixed the difference." },
      { type: "vocabulary", prompt: "What is a cycle?", options: ["Repeating changes", "A ripe crop", "A month name"], correct: 0, explanation: "The moon's changes repeat.", evidence: "This cycle helped count longer periods." },
    ],
    sources: [
      ["Calendar", "Encyclopaedia Britannica", "https://www.britannica.com/science/calendar", "article", "달력은 태양년과 달의 주기 같은 천문 현상을 바탕으로 발전했다."],
      ["Calendars and Their History", "NASA", "https://eclipse.gsfc.nasa.gov/SEhelp/calendars.html", "article", "달력 체계는 달의 주기와 태양년의 차이를 여러 방식으로 조정한다."],
    ],
  },
  {
    id: "ar1-old-wells", ar: 1.5, domain: "history", subtopic: "생활 기술",
    title: "Water From a Deep Well", titleKo: "깊은 우물에서 얻은 물",
    summaryEn: "Wells gave communities steady access to groundwater below dry soil.", summaryKo: "사람들이 땅속 물을 찾고 우물을 관리하며 살아온 방법을 살펴봅니다.",
    learningGoal: "우물의 구조와 공동체에서의 역할을 설명한다.", keyConcept: "땅속 물에 닿는 시설은 마을의 생활을 바꾼다.", visualTheme: "well",
    pages: [
      "Rivers do not flow beside every home. Yet water also hides underground. Rain sinks through soil and rock. Some water gathers in wet layers. People learned to dig toward those layers. A deep hole could reach groundwater.",
      "Builders lined many wells with stone. The lining kept loose soil outside. A bucket dropped on a rope. People pulled heavy water upward. Later pumps made lifting easier. A cover helped block dirt and animals.",
      "A reliable well could support a village. Homes often gathered near its water. Travelers stopped there with thirsty animals. People shared rules for keeping it clean. Broken walls needed quick repair. Safe wells required work from everyone.",
    ],
    words: [
      ["groundwater", "/ˈɡraʊndwɔːtər/", "지하수", "water stored below the ground", "A deep hole could reach groundwater."],
      ["lining", "/ˈlaɪnɪŋ/", "안쪽 벽", "material covering an inside surface", "The lining kept loose soil outside."],
      ["bucket", "/ˈbʌkɪt/", "양동이", "a container with a handle", "A bucket dropped on a rope."],
      ["reliable", "/rɪˈlaɪəbəl/", "믿을 수 있는", "working well when needed", "A reliable well could support a village."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Why did wells have stone linings?", options: ["To keep loose soil outside", "To heat the water", "To cut the rope"], correct: 0, explanation: "The lining supported the hole's sides.", evidence: "The lining kept loose soil outside." },
      { type: "inference", prompt: "Why did homes gather near wells?", options: ["Water was easier to reach", "Stone grew there", "Buckets made music"], correct: 0, explanation: "Nearby water supported daily life.", evidence: "Homes often gathered near its water." },
      { type: "vocabulary", prompt: "What is groundwater?", options: ["Water below ground", "Rain in clouds", "A stone wall"], correct: 0, explanation: "Wells reach hidden water layers.", evidence: "A deep hole could reach groundwater." },
    ],
    sources: [
      ["Well", "Encyclopaedia Britannica", "https://www.britannica.com/technology/well", "article", "우물은 땅을 파 지하수에 접근하는 시설이다."],
      ["Groundwater Wells", "U.S. Geological Survey", "https://www.usgs.gov/special-topics/water-science-school/science/groundwater-wells", "article", "우물의 깊이와 구조는 지하수층과 안전에 영향을 준다."],
    ],
  },
  {
    id: "ar1-glass-windows", ar: 1.8, domain: "history", subtopic: "건축",
    title: "When Windows Got Glass", titleKo: "창문에 유리가 생겼을 때",
    summaryEn: "Glass windows slowly changed homes from dark shelters into brighter spaces.", summaryKo: "유리창이 귀한 물건에서 일상적인 건축 재료가 된 역사를 알아봅니다.",
    learningGoal: "유리창 제작 기술이 건물에 준 변화를 설명한다.", keyConcept: "재료 기술의 발전은 생활 공간을 바꾼다.", visualTheme: "window",
    pages: [
      "Early buildings needed openings for air and light. Open holes also let rain enter. Wooden shutters could block bad weather. However, closed shutters made rooms dark. Thin animal horn covered some openings. It let through only weak light.",
      "Ancient Romans sometimes used window glass. Those pieces were thick and cloudy. Clear glass remained difficult and costly. Medieval churches used many colored pieces. Lead strips held the small shapes together. Sunlight filled rooms with colored light.",
      "Better glassmaking later produced larger flat sheets. More homes slowly gained clear windows. People enjoyed light while keeping weather outside. Factories made window glass less expensive. Modern buildings now use enormous glass walls. This change took many centuries.",
    ],
    words: [
      ["shutter", "/ˈʃʌtər/", "덧문", "a solid cover for a window", "Wooden shutters could block bad weather."],
      ["cloudy", "/ˈklaʊdi/", "흐린", "not clear to see through", "Those pieces were thick and cloudy."],
      ["lead", "/led/", "납", "a soft heavy metal", "Lead strips held the small shapes together."],
      ["sheet", "/ʃiːt/", "판", "a broad thin flat piece", "Better glassmaking later produced larger flat sheets."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What problem did closed shutters create?", options: ["Rooms became dark", "Rain entered faster", "Glass became clear"], correct: 0, explanation: "Shutters blocked both weather and light.", evidence: "However, closed shutters made rooms dark." },
      { type: "inference", prompt: "Why did glass windows improve homes?", options: ["They admitted light and blocked weather", "They removed every wall", "They made wood grow"], correct: 0, explanation: "Glass solved two needs together.", evidence: "People enjoyed light while keeping weather outside." },
      { type: "vocabulary", prompt: "What does cloudy mean here?", options: ["Not clear", "Full of rain", "Very colorful"], correct: 0, explanation: "Early glass was hard to see through.", evidence: "Those pieces were thick and cloudy." },
    ],
    sources: [
      ["Window", "Encyclopaedia Britannica", "https://www.britannica.com/technology/window", "article", "창문은 빛과 환기를 제공하며 덧문과 유리로 날씨를 막아 왔다."],
      ["Stained Glass", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/glas/hd_glas.htm", "article", "중세 스테인드글라스는 작은 색유리 조각을 납으로 연결했다."],
    ],
  },
  {
    id: "ar1-perspective", ar: 1.7, domain: "arts", subtopic: "미술",
    title: "Making Distance on Paper", titleKo: "종이 위에 거리를 그리는 법",
    summaryEn: "Artists use size, overlap, and converging lines to suggest depth.", summaryKo: "화가가 크기와 겹침, 선을 이용해 평면에 깊이를 표현하는 방법을 봅니다.",
    learningGoal: "그림에서 원근감을 만드는 단서를 찾는다.", keyConcept: "평평한 화면도 시각적 단서로 깊어 보일 수 있다.", visualTheme: "perspective",
    pages: [
      "Paper is flat, but pictures can feel deep. Artists use several visual clues. Nearby objects usually look larger. Far objects look smaller. One shape can overlap another shape. The covered shape then seems farther away.",
      "Lines can also create distance. Imagine two edges of a straight road. They seem to move closer far away. Artists draw them toward one meeting point. This method is linear perspective. It makes spaces feel carefully ordered.",
      "Not every art tradition uses this method. Some pictures show important people larger. Others stack places from bottom upward. These choices communicate different ideas. Perspective is one useful artistic tool. Artists choose tools for their purpose.",
    ],
    words: [
      ["flat", "/flæt/", "평평한", "level without depth", "Paper is flat, but pictures can feel deep."],
      ["overlap", "/ˌoʊvərˈlæp/", "겹치다", "to cover part of something", "One shape can overlap another shape."],
      ["perspective", "/pərˈspektɪv/", "원근법", "a method for showing depth", "This method is linear perspective."],
      ["purpose", "/ˈpɜːrpəs/", "목적", "the reason for doing something", "Artists choose tools for their purpose."],
    ],
    quiz: [
      { type: "comprehension", prompt: "How do far objects usually look?", options: ["Smaller", "Louder", "Softer"], correct: 0, explanation: "Size is one depth clue.", evidence: "Far objects look smaller." },
      { type: "inference", prompt: "Why draw road edges toward one point?", options: ["To suggest distance", "To erase the road", "To show sound"], correct: 0, explanation: "Converging lines imitate distant vision.", evidence: "They seem to move closer far away." },
      { type: "vocabulary", prompt: "What does overlap mean?", options: ["Cover part of something", "Become very small", "Draw a straight line"], correct: 0, explanation: "A front shape hides part of another.", evidence: "One shape can overlap another shape." },
    ],
    sources: [
      ["Perspective", "Encyclopaedia Britannica", "https://www.britannica.com/art/perspective-art", "article", "선 원근법은 평면에 공간과 깊이의 느낌을 만든다."],
      ["Linear Perspective", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/ropi/hd_ropi.htm", "article", "수렴하는 선과 소실점은 거리감을 표현하는 데 사용된다."],
    ],
  },
  {
    id: "ar1-weaving", ar: 1.4, domain: "arts", subtopic: "공예",
    title: "Threads Cross Into Cloth", titleKo: "실이 천이 되는 방법",
    summaryEn: "Weavers cross two thread sets to make strong patterned cloth.", summaryKo: "두 방향의 실을 교차해 튼튼하고 무늬 있는 천을 짜는 원리를 알아봅니다.",
    learningGoal: "날실과 씨실의 역할을 구분한다.", keyConcept: "반복되는 실의 교차가 하나의 천을 만든다.", visualTheme: "loom",
    pages: [
      "A single thread cannot cover much space. Weaving joins many threads into cloth. One thread set stretches straight on a loom. These threads are called the warp. They stay tight during the work. The loom holds them apart.",
      "Another thread crosses over and under. This crossing thread is the weft. A tool pushes each row close. The weaver repeats the same movement. Crossed threads lock each other together. The cloth slowly grows longer.",
      "Colors can create stripes and pictures. Different crossings make different textures. Some cloth feels smooth and light. Other cloth feels thick and warm. Weavers may use wool, cotton, or silk. Every finished cloth holds many careful choices.",
    ],
    words: [
      ["loom", "/luːm/", "베틀", "a frame used for weaving", "One thread set stretches straight on a loom."],
      ["warp", "/wɔːrp/", "날실", "threads held lengthwise on a loom", "These threads are called the warp."],
      ["weft", "/weft/", "씨실", "thread crossing over and under", "This crossing thread is the weft."],
      ["texture", "/ˈtekstʃər/", "질감", "how a surface feels", "Different crossings make different textures."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What holds warp threads tight?", options: ["A loom", "A picture", "A sheep"], correct: 0, explanation: "The loom supports the working threads.", evidence: "The loom holds them apart." },
      { type: "inference", prompt: "How can weavers change texture?", options: ["Use different crossings", "Remove every thread", "Stop using rows"], correct: 0, explanation: "Thread structure affects surface feel.", evidence: "Different crossings make different textures." },
      { type: "vocabulary", prompt: "What is weft?", options: ["The crossing thread", "The loom frame", "A cloth picture"], correct: 0, explanation: "Weft passes across the warp.", evidence: "This crossing thread is the weft." },
    ],
    sources: [
      ["Weaving", "Encyclopaedia Britannica", "https://www.britannica.com/technology/weaving", "article", "직조는 날실과 씨실을 교차해 천을 만드는 과정이다."],
      ["Textiles", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/txt/hd_txt.htm", "article", "실의 재료와 교차 방식은 천의 무늬와 질감을 바꾼다."],
    ],
  },
  {
    id: "ar1-forgiving-mistakes", ar: 1.6, domain: "philosophy", subtopic: "용서",
    title: "When Can We Forgive?", titleKo: "실수는 언제 용서할 수 있을까?",
    summaryEn: "Forgiveness can follow honesty, repair, safety, and real change.", summaryKo: "잘못을 인정하고 고치며 안전을 지키는 용서의 조건을 생각합니다.",
    learningGoal: "용서와 문제를 무시하는 행동을 구분한다.", keyConcept: "용서는 잘못이 없었다고 말하는 것이 아니다.", visualTheme: "forgiveness",
    pages: [
      "A friend breaks your favorite pencil. The friend admits the mistake quickly. You still feel upset. Forgiveness does not erase that feeling. It also does not call damage good. It can mean releasing lasting anger.",
      "Honesty can make forgiveness easier. A sincere apology names the harm. Repair matters too. The friend may replace the pencil. Changed behavior matters even more. Careful actions can rebuild trust slowly.",
      "Some harm is serious or repeated. Safety must come before quick forgiveness. You can seek help and set boundaries. Forgiving does not require staying close. It may take a long time. Each person can choose when they feel ready.",
    ],
    words: [
      ["forgiveness", "/fərˈɡɪvnəs/", "용서", "letting go of lasting anger", "Forgiveness does not erase that feeling."],
      ["sincere", "/sɪnˈsɪr/", "진심인", "honest and truly meant", "A sincere apology names the harm."],
      ["repair", "/rɪˈper/", "바로잡기", "action that fixes damage", "Repair matters too."],
      ["boundaries", "/ˈbaʊndəriz/", "경계", "limits protecting safety", "You can seek help and set boundaries."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can a sincere apology name?", options: ["The harm", "A new game", "The weather"], correct: 0, explanation: "A real apology recognizes damage.", evidence: "A sincere apology names the harm." },
      { type: "inference", prompt: "Why can trust take time?", options: ["Changed actions must be seen", "Pencils grow slowly", "Anger is always good"], correct: 0, explanation: "Reliable behavior rebuilds trust gradually.", evidence: "Careful actions can rebuild trust slowly." },
      { type: "vocabulary", prompt: "What is a boundary?", options: ["A protective limit", "An apology", "A broken pencil"], correct: 0, explanation: "Boundaries help preserve safety.", evidence: "You can seek help and set boundaries." },
    ],
    sources: [
      ["Forgiveness", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/forgiveness/", "paper", "용서는 잘못의 인정, 분노, 관계와 책임을 함께 다루는 개념이다."],
      ["Forgiveness", "American Psychological Association", "https://www.apa.org/topics/forgiveness", "article", "용서는 해로운 행동을 정당화하거나 안전 경계를 없애는 것과 다르다."],
    ],
  },
  {
    id: "ar1-equal-or-fair", ar: 1.8, domain: "philosophy", subtopic: "공정성",
    title: "Equal or Fair?", titleKo: "똑같이 나누면 항상 공정할까?",
    summaryEn: "Fairness may require equal shares or attention to different needs.", summaryKo: "같은 몫과 서로 다른 필요를 고려하는 공정성의 차이를 생각합니다.",
    learningGoal: "평등한 분배와 필요에 따른 분배를 비교한다.", keyConcept: "공정함은 상황과 관련된 차이를 살펴야 한다.", visualTheme: "balance",
    pages: [
      "Three plants receive one cup of water. That sounds perfectly equal. However, one plant is much larger. Another grows in very dry soil. Equal amounts may not meet equal needs. Is the watering still fair?",
      "Fairness sometimes means giving identical shares. Every player gets one turn. Nobody receives a secret extra turn. Other situations consider different needs. A hurt player may need more help. That difference has a clear reason.",
      "Not every difference is fair. Reasons must connect to the real situation. Friendship alone is not enough. Good rules can explain relevant differences. People may still disagree about the answer. Careful discussion makes the reasons visible.",
    ],
    words: [
      ["equal", "/ˈiːkwəl/", "동등한", "the same in amount", "That sounds perfectly equal."],
      ["identical", "/aɪˈdentɪkəl/", "똑같은", "exactly the same", "Fairness sometimes means giving identical shares."],
      ["relevant", "/ˈreləvənt/", "관련 있는", "connected to the matter", "Good rules can explain relevant differences."],
      ["disagree", "/ˌdɪsəˈɡriː/", "동의하지 않다", "to have a different opinion", "People may still disagree about the answer."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Who may need more help?", options: ["A hurt player", "A secret turn", "Dry soil"], correct: 0, explanation: "Relevant need can justify different support.", evidence: "A hurt player may need more help." },
      { type: "inference", prompt: "Why might equal water be unfair?", options: ["The plants have different needs", "Water is always harmful", "Cups cannot measure"], correct: 0, explanation: "Size and soil affect water need.", evidence: "Equal amounts may not meet equal needs." },
      { type: "vocabulary", prompt: "What does relevant mean?", options: ["Connected to the matter", "Exactly the same", "Kept secret"], correct: 0, explanation: "Fair differences need related reasons.", evidence: "Good rules can explain relevant differences." },
    ],
    sources: [
      ["Equality", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/equality/", "paper", "평등은 동일한 대우와 관련 차이를 고려한 대우를 구분한다."],
      ["Distributive Justice", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/justice-distributive/", "paper", "분배 정의는 평등, 필요, 기여 같은 기준을 비교한다."],
    ],
  },
  {
    id: "ar1-check-understanding", ar: 1.5, domain: "self-development", subtopic: "학습",
    title: "Ask to Check Understanding", titleKo: "질문으로 이해 확인하기",
    summaryEn: "Explaining and asking specific questions reveals gaps in understanding.", summaryKo: "설명하고 구체적으로 질문하며 이해의 빈틈을 찾는 방법을 익힙니다.",
    learningGoal: "이해를 확인하는 구체적인 질문을 만든다.", keyConcept: "안다고 느끼는 것과 설명할 수 있는 것은 다르다.", visualTheme: "question",
    pages: [
      "A lesson may feel clear while reading. Close the page and explain it. Suddenly, one step may disappear. This gap is useful information. It shows exactly where learning stopped. You can now ask a focused question.",
      "Avoid saying only, I understand nothing. Point to the confusing step instead. Ask why the water changed form. Ask how the two events connect. Specific questions help others answer clearly. They also organize your own thinking.",
      "After hearing an answer, explain it back. Use your own simple words. The listener can correct any mistake. Then try one new example alone. A correct example shows stronger understanding. Good questions turn confusion into a next step.",
    ],
    words: [
      ["gap", "/ɡæp/", "빈틈", "a missing part", "This gap is useful information."],
      ["focused", "/ˈfoʊkəst/", "초점이 분명한", "directed at one clear thing", "You can now ask a focused question."],
      ["specific", "/spəˈsɪfɪk/", "구체적인", "clear and exact", "Specific questions help others answer clearly."],
      ["correct", "/kəˈrekt/", "바로잡다", "to fix a mistake", "The listener can correct any mistake."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can explaining reveal?", options: ["A missing step", "A new book", "A louder voice"], correct: 0, explanation: "Recall exposes gaps in knowledge.", evidence: "Suddenly, one step may disappear." },
      { type: "inference", prompt: "Why ask specific questions?", options: ["Answers can be clearer", "Confusion becomes larger", "Pages close faster"], correct: 0, explanation: "A focused question identifies the exact need.", evidence: "Specific questions help others answer clearly." },
      { type: "vocabulary", prompt: "What is a gap?", options: ["A missing part", "A full answer", "A new example"], correct: 0, explanation: "The learner discovers missing understanding.", evidence: "This gap is useful information." },
    ],
    sources: [
      ["Metacognition", "Vanderbilt University Center for Teaching", "https://cft.vanderbilt.edu/guides-sub-pages/metacognition/", "article", "자신의 이해를 점검하고 설명하는 활동은 학습 조절을 돕는다."],
      ["Retrieval Practice", "The Learning Scientists", "https://www.learningscientists.org/retrieval-practice", "article", "기억에서 내용을 꺼내 설명하면 이해의 빈틈을 확인할 수 있다."],
    ],
  },
  {
    id: "ar1-tidy-rule", ar: 1.7, domain: "self-development", subtopic: "정리",
    title: "One Home for Each Thing", titleKo: "물건마다 자리를 정해요",
    summaryEn: "Simple storage rules reduce searching and make tidying easier.", summaryKo: "물건마다 일정한 자리를 정해 찾고 정리하는 부담을 줄입니다.",
    learningGoal: "자주 쓰는 물건의 보관 규칙을 만든다.", keyConcept: "정리는 의지보다 반복 가능한 자리가 중요하다.", visualTheme: "tidy",
    pages: [
      "Searching for lost things wastes time. A simple rule can help. Give each common object one home. Keys always rest in one bowl. School papers enter one folder. The rule removes a daily decision.",
      "Choose homes near where objects are used. A coat hook belongs near the door. Pencils stay beside the desk. Heavy items need low, strong shelves. Clear labels help everyone follow the system. Easy storage gets used more often.",
      "Reset the space for five minutes daily. Return only things left outside. Do not reorganize the whole room. Notice which homes are hard to use. Move them when the rule fails repeatedly. A useful system should fit real behavior.",
    ],
    words: [
      ["object", "/ˈɑːbdʒekt/", "물건", "a thing you can see or touch", "Give each common object one home."],
      ["folder", "/ˈfoʊldər/", "서류철", "a cover holding papers", "School papers enter one folder."],
      ["label", "/ˈleɪbəl/", "이름표", "words showing where things belong", "Clear labels help everyone follow the system."],
      ["reset", "/ˌriːˈset/", "원래 상태로 돌리다", "to return something to readiness", "Reset the space for five minutes daily."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Where should keys always rest?", options: ["In one bowl", "Under every paper", "On a high roof"], correct: 0, explanation: "A fixed home prevents searching.", evidence: "Keys always rest in one bowl." },
      { type: "inference", prompt: "Why store objects near their use?", options: ["The system becomes easier", "Labels become heavier", "Rooms become larger"], correct: 0, explanation: "Convenient storage is more likely repeated.", evidence: "Easy storage gets used more often." },
      { type: "vocabulary", prompt: "What does reset mean?", options: ["Return to readiness", "Lose an object", "Buy a shelf"], correct: 0, explanation: "The short tidy restores the space.", evidence: "Reset the space for five minutes daily." },
    ],
    sources: [
      ["Healthy Habits", "American Psychological Association", "https://www.apa.org/topics/behavioral-health/healthy-habits", "article", "환경 단서와 작고 반복 가능한 행동은 습관 형성을 돕는다."],
      ["Decluttering and Mental Health", "Mayo Clinic", "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/clutter/art-20045014", "article", "정돈된 환경과 관리 가능한 정리 과정은 일상 부담을 줄일 수 있다."],
    ],
  },
  {
    id: "ar1-fermented-foods", ar: 1.6, domain: "world-culture", subtopic: "음식",
    title: "Foods Changed by Tiny Helpers", titleKo: "작은 생물이 바꾸는 음식",
    summaryEn: "Fermentation uses microbes to change flavor, texture, and storage life.", summaryKo: "미생물이 여러 지역의 음식을 발효시키는 과정을 알아봅니다.",
    learningGoal: "발효가 음식에 만드는 변화를 설명한다.", keyConcept: "눈에 보이지 않는 미생물도 음식 문화를 만든다.", visualTheme: "fermentation",
    pages: [
      "People have fermented food for thousands of years. Tiny microbes drive this change. Yeasts and bacteria eat parts of food. They produce acids, gases, or alcohol. These products change flavor and texture. Some also slow harmful microbes.",
      "Milk can become yogurt or cheese. Cabbage can become kimchi or sauerkraut. Soybeans become many sauces and pastes. Flour dough rises through yeast activity. Each tradition controls salt, warmth, and time. The exact methods differ widely.",
      "Fermentation needs clean tools and safe methods. Not every food change is helpful. Bad smells or strange growth can warn us. Experienced makers follow tested steps. Families pass these skills across generations. Science now explains their tiny helpers.",
    ],
    words: [
      ["ferment", "/fərˈment/", "발효시키다", "to change food using microbes", "People have fermented food for thousands of years."],
      ["microbe", "/ˈmaɪkroʊb/", "미생물", "a living thing too small to see", "Tiny microbes drive this change."],
      ["texture", "/ˈtekstʃər/", "질감", "how food feels", "These products change flavor and texture."],
      ["tradition", "/trəˈdɪʃən/", "전통", "a practice passed through generations", "Each tradition controls salt, warmth, and time."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What drives fermentation?", options: ["Tiny microbes", "Metal spoons", "Cold stones"], correct: 0, explanation: "Yeasts and bacteria change food.", evidence: "Tiny microbes drive this change." },
      { type: "inference", prompt: "Why follow tested methods?", options: ["Not every change is safe", "All microbes are harmful", "Salt removes flavor"], correct: 0, explanation: "Safe fermentation needs controlled conditions.", evidence: "Not every food change is helpful." },
      { type: "vocabulary", prompt: "What is a microbe?", options: ["A tiny living thing", "A food bowl", "A family recipe"], correct: 0, explanation: "Microbes include yeasts and bacteria.", evidence: "Tiny microbes drive this change." },
    ],
    sources: [
      ["Fermentation", "Encyclopaedia Britannica", "https://www.britannica.com/science/fermentation", "article", "미생물은 당을 분해하며 산, 기체, 알코올 등을 만든다."],
      ["Yogurt", "Harvard T.H. Chan School of Public Health", "https://nutritionsource.hsph.harvard.edu/food-features/yogurt/", "article", "미생물 발효는 우유를 요구르트로 바꾸고 맛과 질감을 만든다."],
    ],
  },
  {
    id: "ar1-world-hats", ar: 1.4, domain: "world-culture", subtopic: "복식",
    title: "Hats Made for a Place", titleKo: "지역에 맞게 만든 모자",
    summaryEn: "Hat shapes and materials respond to weather, work, and identity.", summaryKo: "여러 지역의 모자가 날씨와 일, 정체성에 맞춰진 모습을 살펴봅니다.",
    learningGoal: "모자의 형태를 환경과 용도에 연결한다.", keyConcept: "옷의 디자인에는 지역 생활의 필요가 담긴다.", visualTheme: "hats",
    pages: [
      "People wear hats for many reasons. A wide brim can block sunlight. Thick wool holds warm air nearby. Woven fibers allow some air through. Waterproof coverings keep rain away. Local weather helps shape each design.",
      "Work changes hats too. Hard hats protect building workers. Some farmers need shade around the neck. Sailors need hats that stay secure. Special uniforms show a person's role. A hat can carry both safety and meaning.",
      "Celebration hats may use bright colors. Some show age, region, or family. Makers choose local wool, straw, felt, or cloth. Skills pass from older makers onward. Today people also mix old and new styles. One hat can tell many stories.",
    ],
    words: [
      ["brim", "/brɪm/", "챙", "the edge around a hat", "A wide brim can block sunlight."],
      ["woven", "/ˈwoʊvən/", "짜인", "made by crossing fibers", "Woven fibers allow some air through."],
      ["secure", "/sɪˈkjʊr/", "단단히 고정된", "unlikely to come loose", "Sailors need hats that stay secure."],
      ["felt", "/felt/", "펠트", "cloth made from pressed fibers", "Makers choose local wool, straw, felt, or cloth."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can a wide brim block?", options: ["Sunlight", "Every sound", "Cold water"], correct: 0, explanation: "The brim creates shade.", evidence: "A wide brim can block sunlight." },
      { type: "inference", prompt: "Why do sailors need secure hats?", options: ["Wind may loosen them", "Hats guide ships", "Cloth cannot float"], correct: 0, explanation: "Open-water work can be windy.", evidence: "Sailors need hats that stay secure." },
      { type: "vocabulary", prompt: "What is a brim?", options: ["A hat's outer edge", "Pressed cloth", "A worker's role"], correct: 0, explanation: "Wide brims shade the wearer.", evidence: "A wide brim can block sunlight." },
    ],
    sources: [
      ["Hat", "Encyclopaedia Britannica", "https://www.britannica.com/topic/hat", "article", "모자는 보호, 직업 표시, 장식 등 여러 기능을 한다."],
      ["Hats", "Smithsonian National Museum of American History", "https://americanhistory.si.edu/collections/object-groups/hats", "article", "모자의 재료와 형태는 시대, 지역, 용도에 따라 달라진다."],
    ],
  },
  {
    id: "ar1-shared-courtyards", ar: 1.8, domain: "world-culture", subtopic: "주거",
    title: "A Yard Shared by Many", titleKo: "함께 사용하는 마당",
    summaryEn: "Courtyards bring light, air, work, play, and neighbors together.", summaryKo: "여러 문화권의 안마당이 집과 공동체 생활을 연결하는 방식을 알아봅니다.",
    learningGoal: "공동 마당의 환경적·사회적 기능을 설명한다.", keyConcept: "건물 사이의 빈 공간도 중요한 생활 장소가 된다.", visualTheme: "courtyard",
    pages: [
      "Some homes turn inward around an open yard. Rooms face this central courtyard. The outer walls may have fewer windows. Inside, sunlight reaches many doors. Moving air can cool the space. The yard feels protected from busy streets.",
      "Daily work often happens there. Families dry clothes and prepare food. Children play where adults can watch. Neighbors exchange news across the yard. Plants may offer shade and fruit. A well can provide shared water.",
      "Courtyards appear in many world regions. Their shapes match climate and custom. Hot places often value shade and airflow. Cold places may seek sunny corners. Shared space also needs shared rules. People decide who cleans and repairs it.",
    ],
    words: [
      ["courtyard", "/ˈkɔːrtjɑːrd/", "안마당", "an open yard surrounded by buildings", "Rooms face this central courtyard."],
      ["central", "/ˈsentrəl/", "가운데의", "located near the middle", "Rooms face this central courtyard."],
      ["exchange", "/ɪksˈtʃeɪndʒ/", "주고받다", "to give and receive", "Neighbors exchange news across the yard."],
      ["custom", "/ˈkʌstəm/", "관습", "a usual practice in a community", "Their shapes match climate and custom."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What faces the central courtyard?", options: ["Rooms", "Only streets", "Outer roofs"], correct: 0, explanation: "The home is arranged around the yard.", evidence: "Rooms face this central courtyard." },
      { type: "inference", prompt: "Why do hot places value courtyards?", options: ["They can offer shade and airflow", "They remove every plant", "They close all doors"], correct: 0, explanation: "Courtyards can improve comfort.", evidence: "Hot places often value shade and airflow." },
      { type: "vocabulary", prompt: "What is a courtyard?", options: ["A yard surrounded by buildings", "A busy outer street", "A cold roof"], correct: 0, explanation: "Rooms open toward this shared space.", evidence: "Rooms face this central courtyard." },
    ],
    sources: [
      ["Courtyard", "Encyclopaedia Britannica", "https://www.britannica.com/technology/courtyard", "article", "안마당은 건물로 둘러싸인 열린 공간으로 빛과 공기를 제공한다."],
      ["Courtyard House", "Encyclopaedia Britannica", "https://www.britannica.com/technology/courtyard-house", "article", "중정형 주거는 여러 지역에서 기후와 공동생활에 맞게 발전했다."],
    ],
  },
];
