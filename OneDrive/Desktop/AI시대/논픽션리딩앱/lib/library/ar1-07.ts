import type { LibrarySeed, SeedQuiz, SeedSource, SeedWord } from "./build-draft";
import { AR1_BATCH_07_IMAGES } from "./ar1-07-images";

type CompactSeed = Omit<LibrarySeed, "words" | "quiz" | "sources"> & {
  words: SeedWord[];
  quiz: SeedQuiz[];
  sources: SeedSource[];
};

const seed = (value: CompactSeed): LibrarySeed => value;

/** AR 1점대 7차 배치. 문장 10단어 이하, 90~140단어 기준. */
const AR1_BATCH_07_CANDIDATES: LibrarySeed[] = [
  seed({
    id: "ar1-owl-flight", ar: 1.6, domain: "science", subtopic: "동물",
    title: "How Owls Fly Quietly", titleKo: "올빼미는 어떻게 조용히 날까",
    summaryEn: "Special feathers soften the sound of an owl's flight.", summaryKo: "올빼미 깃털의 특별한 구조가 비행 소리를 줄이는 원리를 알아봅니다.",
    learningGoal: "깃털 구조와 조용한 비행의 관계를 설명한다.", keyConcept: "부드럽고 갈라진 깃털 가장자리는 공기 소리를 줄인다.", visualTheme: "owl",
    pages: [
      "Most birds make sound while flying. Their wings push quickly through the air. Owls can fly with much less noise. This helps them approach small animals. It also helps owls hear clearly.",
      "An owl has broad, rounded wings. Large wings support slow flight. Its flight feathers have comb-like front edges. Soft fringes line their back edges. These shapes break air into smaller streams.",
      "Velvety feather surfaces soften more sound. Less noise gives an owl an advantage. However, silent feathers are not magic. Wing shape and slow movement also help. Several features work together during flight.",
    ],
    words: [
      ["approach", "/əˈproʊtʃ/", "다가가다", "to move closer", "This helps them approach small animals."],
      ["fringes", "/ˈfrɪndʒɪz/", "술 모양 가장자리", "soft edges made of thin parts", "Soft fringes line their back edges."],
      ["streams", "/striːmz/", "흐름", "moving flows of air", "These shapes break air into smaller streams."],
      ["advantage", "/ədˈvæntɪdʒ/", "이점", "something that helps success", "Less noise gives an owl an advantage."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What lines the back feather edges?", options: ["Soft fringes", "Hard shells", "Long scales"], correct: 0, explanation: "The back edges carry soft fringes.", evidence: "Soft fringes line their back edges." },
      { type: "inference", prompt: "Why does quiet flight help hunting?", options: ["Owls approach unseen", "Owls grow larger", "Owls change color"], correct: 0, explanation: "Less sound hides an approaching owl.", evidence: "This helps them approach small animals." },
      { type: "vocabulary", prompt: "What is an advantage?", options: ["Something helpful", "A wing sound", "A small animal"], correct: 0, explanation: "An advantage helps success.", evidence: "Less noise gives an owl an advantage." },
    ],
    sources: [
      ["Owl", "Encyclopaedia Britannica", "https://www.britannica.com/animal/owl", "article", "올빼미의 넓은 날개와 깃털은 조용한 비행을 돕는다."],
      ["Owls", "Smithsonian's National Zoo", "https://nationalzoo.si.edu/animals/news/why-are-owls-such-good-hunters", "article", "올빼미는 조용한 비행과 뛰어난 청각을 사냥에 활용한다."],
    ],
  }),
  seed({
    id: "ar1-ocean-tides", ar: 1.7, domain: "science", subtopic: "지구과학",
    title: "Why Ocean Water Rises", titleKo: "바닷물은 왜 오르내릴까",
    summaryEn: "The moon's gravity helps create repeating ocean tides.", summaryKo: "달과 태양의 중력이 바닷물의 주기적인 움직임을 만드는 과정을 배웁니다.",
    learningGoal: "달의 중력과 조수의 관계를 설명한다.", keyConcept: "달의 당기는 힘은 바닷물 높이를 주기적으로 바꾼다.", visualTheme: "tide",
    pages: [
      "Ocean water rises and falls near coasts. These changes are called tides. High tide brings water farther onto shore. Low tide pulls the waterline outward. The pattern repeats each day.",
      "The moon's gravity pulls on Earth. It pulls strongly on nearby ocean water. Water forms a bulge toward the moon. Another bulge forms across Earth. Earth turns through both watery bulges.",
      "The sun also pulls ocean water. Its effect changes the tide's size. Coast shapes can change local timing. Winds and storms change water levels too. Tide tables help people plan safely.",
    ],
    words: [
      ["tides", "/taɪdz/", "조수", "repeating rises and falls of ocean water", "These changes are called tides."],
      ["gravity", "/ˈɡrævəti/", "중력", "a force pulling objects together", "The moon's gravity pulls on Earth."],
      ["bulge", "/bʌldʒ/", "불룩한 부분", "a part that sticks outward", "Water forms a bulge toward the moon."],
      ["timing", "/ˈtaɪmɪŋ/", "시기", "the time when something happens", "Coast shapes can change local timing."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What pulls strongly on nearby ocean water?", options: ["The moon's gravity", "Tide tables", "Coast sand"], correct: 0, explanation: "Lunar gravity pulls the water.", evidence: "It pulls strongly on nearby ocean water." },
      { type: "inference", prompt: "Why do people use tide tables?", options: ["To plan safely", "To move the moon", "To stop storms"], correct: 0, explanation: "Tables predict changing water levels.", evidence: "Tide tables help people plan safely." },
      { type: "vocabulary", prompt: "What are tides?", options: ["Ocean rises and falls", "Only strong winds", "Lines in sand"], correct: 0, explanation: "Tides are repeating water-level changes.", evidence: "These changes are called tides." },
    ],
    sources: [
      ["Tide", "Encyclopaedia Britannica", "https://www.britannica.com/science/tide", "article", "조수는 달과 태양의 인력에 영향을 받는 바닷물의 주기적 움직임이다."],
      ["What Causes Tides?", "NOAA", "https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html", "article", "달의 중력이 지구의 조수 형성에 큰 영향을 준다."],
    ],
  }),
  seed({
    id: "ar1-fingerprints", ar: 1.5, domain: "science", subtopic: "인체",
    title: "Patterns on Our Fingers", titleKo: "손가락 끝의 무늬",
    summaryEn: "Raised skin ridges form useful and highly varied fingerprints.", summaryKo: "손끝의 융선이 물건 잡기와 지문 구별에 어떻게 쓰이는지 알아봅니다.",
    learningGoal: "지문의 구조와 기능을 구분한다.", keyConcept: "손끝의 융선은 마찰을 돕고 서로 다른 무늬를 만든다.", visualTheme: "fingerprint",
    pages: [
      "Look closely at your fingertips. Raised lines curve across the skin. These lines are called friction ridges. They form before a baby is born. The ridges grow with the fingers.",
      "Ridges help skin grip some surfaces. Tiny sweat openings cover each ridge. Touching a surface can leave a print. Sweat and skin oils make the mark. Loops, arches, and whorls often appear.",
      "Every fingerprint has many small details. Even twins have different ridge details. Injuries may change part of a print. Deep damage can leave a scar. Fingerprints help identify people carefully.",
    ],
    words: [
      ["ridges", "/ˈrɪdʒɪz/", "융선", "raised narrow lines", "These lines are called friction ridges."],
      ["grip", "/ɡrɪp/", "단단히 잡다", "to hold something firmly", "Ridges help skin grip some surfaces."],
      ["whorls", "/wɜːrlz/", "소용돌이무늬", "rounded spiral patterns", "Loops, arches, and whorls often appear."],
      ["identify", "/aɪˈdentɪfaɪ/", "식별하다", "to recognize who someone is", "Fingerprints help identify people carefully."],
    ],
    quiz: [
      { type: "comprehension", prompt: "When do friction ridges form?", options: ["Before birth", "During school", "After an injury"], correct: 0, explanation: "The ridges begin before birth.", evidence: "They form before a baby is born." },
      { type: "inference", prompt: "Why can deep damage change prints?", options: ["It may leave scars", "It adds sweat", "It grows fingers"], correct: 0, explanation: "Scars alter ridge details.", evidence: "Deep damage can leave a scar." },
      { type: "vocabulary", prompt: "What are ridges?", options: ["Raised narrow lines", "Drops of oil", "Finger bones"], correct: 0, explanation: "Ridges rise above nearby skin.", evidence: "These lines are called friction ridges." },
    ],
    sources: [
      ["Fingerprint", "Encyclopaedia Britannica", "https://www.britannica.com/topic/fingerprint", "article", "지문은 손가락 융선이 만드는 고유한 무늬이다."],
      ["The Fingerprint Sourcebook", "National Institute of Justice", "https://nij.ojp.gov/library/publications/fingerprint-sourcebook", "paper", "마찰 융선의 형성과 지문 비교 원리를 설명한다."],
    ],
  }),
  seed({
    id: "ar1-ancient-bridges", ar: 1.6, domain: "history", subtopic: "기술",
    title: "Bridges Before Machines", titleKo: "기계가 없던 시대의 다리",
    summaryEn: "Early builders used wood, stone, and arches for bridges.", summaryKo: "옛사람들이 나무와 돌, 아치 구조로 다리를 만든 방법을 살펴봅니다.",
    learningGoal: "재료와 다리 구조의 관계를 설명한다.", keyConcept: "아치는 다리의 무게를 양옆 지지대로 보낸다.", visualTheme: "bridge",
    pages: [
      "People have crossed water for thousands of years. A fallen tree made a simple bridge. Builders later placed logs across narrow streams. Rope could support light walking bridges. Each material had limits.",
      "Stone lasted longer than many wooden bridges. However, flat stone spans could break. Builders learned to shape strong arches. An arch sends weight toward both sides. Thick supports hold that force.",
      "Roman builders made many stone bridges. Some still stand after many centuries. Their bridges carried roads over rivers. Good foundations resisted moving water. Careful design mattered without modern machines.",
    ],
    words: [
      ["material", "/məˈtɪriəl/", "재료", "a substance used to make something", "Each material had limits."],
      ["spans", "/spænz/", "걸쳐진 부분", "parts reaching across a space", "However, flat stone spans could break."],
      ["arch", "/ɑːrtʃ/", "아치", "a curved supporting shape", "An arch sends weight toward both sides."],
      ["foundations", "/faʊnˈdeɪʃənz/", "기초", "strong bases under structures", "Good foundations resisted moving water."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Where does an arch send weight?", options: ["Toward both sides", "Into the sky", "Only downward"], correct: 0, explanation: "Arches move force sideways.", evidence: "An arch sends weight toward both sides." },
      { type: "inference", prompt: "Why were foundations important?", options: ["Water was moving", "Stone was colorful", "Roads were narrow"], correct: 0, explanation: "Strong bases resisted the river.", evidence: "Good foundations resisted moving water." },
      { type: "vocabulary", prompt: "What is an arch?", options: ["A curved support", "A rope knot", "A fallen tree"], correct: 0, explanation: "An arch is a curved structure.", evidence: "Builders learned to shape strong arches." },
    ],
    sources: [
      ["Bridge", "Encyclopaedia Britannica", "https://www.britannica.com/technology/bridge-engineering", "article", "초기 다리는 목재와 석재를 사용했고 아치 구조가 발전했다."],
      ["Roman Bridge", "Encyclopaedia Britannica", "https://www.britannica.com/technology/Roman-bridge", "article", "로마의 석조 아치교는 도로망의 중요한 부분이었다."],
    ],
  }),
  seed({
    id: "ar1-early-glass", ar: 1.7, domain: "history", subtopic: "생활사",
    title: "When Glass Was Rare", titleKo: "유리가 귀했던 때",
    summaryEn: "Early glassmakers shaped hot mixtures into valued objects.", summaryKo: "초기 유리 제작자들이 뜨거운 재료를 다루어 물건을 만든 과정을 배웁니다.",
    learningGoal: "초기 유리 제작 과정의 핵심 단계를 찾는다.", keyConcept: "모래 성분과 다른 재료를 녹이고 식혀 유리를 만든다.", visualTheme: "glass",
    pages: [
      "Glass seems common in modern life. Long ago, it was very valuable. Early makers mixed sand with other materials. Hot furnaces melted the mixture. Cooling changed it into hard glass.",
      "The first glass objects were often small. Makers created beads and colored decorations. They shaped glass around a clay center. Later, workers learned glassblowing. Air expanded hot glass into hollow forms.",
      "Glassblowing made cups faster to produce. More people could then own glassware. Traders carried glass across long distances. Colors came from added minerals. Old glass shows both science and skill.",
    ],
    words: [
      ["furnaces", "/ˈfɜːrnɪsɪz/", "용광로", "very hot ovens", "Hot furnaces melted the mixture."],
      ["beads", "/biːdz/", "구슬", "small objects with holes", "Makers created beads and colored decorations."],
      ["hollow", "/ˈhɑːloʊ/", "속이 빈", "having an empty space inside", "Air expanded hot glass into hollow forms."],
      ["minerals", "/ˈmɪnərəlz/", "광물", "natural substances from rocks", "Colors came from added minerals."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What melted the glass mixture?", options: ["Hot furnaces", "Cold water", "Moving air"], correct: 0, explanation: "Furnaces supplied strong heat.", evidence: "Hot furnaces melted the mixture." },
      { type: "inference", prompt: "Why did more people own glassware?", options: ["Production became faster", "Glass became softer", "Traders stopped moving"], correct: 0, explanation: "Glassblowing increased production speed.", evidence: "Glassblowing made cups faster to produce." },
      { type: "vocabulary", prompt: "What does hollow mean?", options: ["Empty inside", "Very colorful", "Made of clay"], correct: 0, explanation: "Blown glass holds an inner space.", evidence: "Air expanded hot glass into hollow forms." },
    ],
    sources: [
      ["Glass", "Encyclopaedia Britannica", "https://www.britannica.com/technology/glass", "article", "유리는 규사 등의 재료를 녹이고 식혀 만든다."],
      ["Glassmaking in Antiquity", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/glas/hd_glas.htm", "article", "고대 유리 제작에는 심재 성형과 유리 불기 등이 사용되었다."],
    ],
  }),
  seed({
    id: "ar1-ink-writing", ar: 1.5, domain: "history", subtopic: "기록",
    title: "Making Marks With Ink", titleKo: "잉크로 남긴 기록",
    summaryEn: "People made early inks from soot, water, and plants.", summaryKo: "사람들이 여러 재료를 섞어 기록용 잉크를 만든 역사를 알아봅니다.",
    learningGoal: "초기 잉크의 재료와 용도를 설명한다.", keyConcept: "잉크는 색을 내는 물질과 액체를 섞어 만든다.", visualTheme: "ink",
    pages: [
      "Writing needs a mark that remains visible. Ancient people made ink in several ways. Some black ink began with soot. Makers mixed soot with water and gum. The gum helped ink stay together.",
      "Writers used brushes or cut reeds. They placed ink on papyrus or cloth. Other inks came from plants and minerals. Different recipes produced different colors. Iron salts later made dark writing ink.",
      "A good ink had to flow smoothly. It also needed to dry clearly. Scribes prepared tools with great care. Their records carried laws and stories. Many old marks still remain today.",
    ],
    words: [
      ["soot", "/sʊt/", "그을음", "black powder from burning", "Some black ink began with soot."],
      ["gum", "/ɡʌm/", "식물성 접착 물질", "a sticky substance from plants", "Makers mixed soot with water and gum."],
      ["recipes", "/ˈresəpiz/", "제조법", "sets of making instructions", "Different recipes produced different colors."],
      ["scribes", "/skraɪbz/", "서기관", "people who copied writing", "Scribes prepared tools with great care."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What helped ink stay together?", options: ["Gum", "Cloth", "Iron tools"], correct: 0, explanation: "Gum bound the mixture.", evidence: "The gum helped ink stay together." },
      { type: "inference", prompt: "Why did scribes prepare carefully?", options: ["Clear records mattered", "Ink was food", "Reeds made laws"], correct: 0, explanation: "Their writing needed to last.", evidence: "Their records carried laws and stories." },
      { type: "vocabulary", prompt: "What is soot?", options: ["Black burning powder", "A writing cloth", "A plant color"], correct: 0, explanation: "Soot forms during burning.", evidence: "Some black ink began with soot." },
    ],
    sources: [
      ["Ink", "Encyclopaedia Britannica", "https://www.britannica.com/technology/ink-writing-medium", "article", "초기 잉크는 그을음, 물, 접착 성분 등을 사용했다."],
      ["The History of Ink", "Library of Congress", "https://www.loc.gov/preservation/scientists/projects/iron_gall_ink.html", "article", "역사적 기록에는 탄소 잉크와 철 갈산 잉크 등이 쓰였다."],
    ],
  }),
  seed({
    id: "ar1-stone-sculpture", ar: 1.6, domain: "arts", subtopic: "조각",
    title: "A Shape Inside Stone", titleKo: "돌 속에서 찾는 모양",
    summaryEn: "Sculptors remove stone slowly to reveal planned forms.", summaryKo: "조각가가 도구로 돌을 덜어내며 형태를 만드는 과정을 살펴봅니다.",
    learningGoal: "석조 조각의 순서와 도구 역할을 설명한다.", keyConcept: "돌 조각은 재료를 조금씩 제거해 형태를 만든다.", visualTheme: "sculpture",
    pages: [
      "A stone block can become a sculpture. The artist first studies its shape. A drawing may guide the plan. Then the sculptor removes unwanted stone. Large tools begin the rough form.",
      "A hammer strikes different metal chisels. Pointed chisels remove larger pieces. Flat chisels smooth the new surfaces. The artist works slowly around the block. One deep mistake cannot be replaced.",
      "Rasps can soften smaller marks. Sand and polish finish the surface. Some stone remains rough on purpose. Texture changes how light meets the work. Patient choices reveal the final form.",
    ],
    words: [
      ["sculpture", "/ˈskʌlptʃər/", "조각", "art shaped in solid material", "A stone block can become a sculpture."],
      ["chisels", "/ˈtʃɪzəlz/", "끌", "cutting tools with sharp edges", "A hammer strikes different metal chisels."],
      ["texture", "/ˈtekstʃər/", "질감", "how a surface looks or feels", "Texture changes how light meets the work."],
      ["reveal", "/rɪˈviːl/", "드러내다", "to make something visible", "Patient choices reveal the final form."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What removes larger stone pieces?", options: ["Pointed chisels", "Soft brushes", "Colored sand"], correct: 0, explanation: "Pointed chisels cut rough stone.", evidence: "Pointed chisels remove larger pieces." },
      { type: "inference", prompt: "Why must the artist work slowly?", options: ["Stone cannot be replaced", "Tools need sunlight", "Drawings change color"], correct: 0, explanation: "Removed stone cannot return.", evidence: "One deep mistake cannot be replaced." },
      { type: "vocabulary", prompt: "What is texture?", options: ["Surface quality", "A stone plan", "A metal hammer"], correct: 0, explanation: "Texture describes a surface.", evidence: "Texture changes how light meets the work." },
    ],
    sources: [
      ["Sculpture", "Encyclopaedia Britannica", "https://www.britannica.com/art/sculpture", "article", "조각은 돌과 같은 재료를 깎거나 다듬어 형태를 만든다."],
      ["Stone Working", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/marb/hd_marb.htm", "article", "석조 조각에는 망치, 끌, 연마 도구가 사용된다."],
    ],
  }),
  seed({
    id: "ar1-orchestra", ar: 1.7, domain: "arts", subtopic: "음악",
    title: "Many Instruments, One Sound", titleKo: "여러 악기, 하나의 소리",
    summaryEn: "Orchestra sections combine under a conductor's shared plan.", summaryKo: "서로 다른 악기군이 지휘를 따라 하나의 음악을 만드는 과정을 배웁니다.",
    learningGoal: "오케스트라의 악기군과 지휘자 역할을 설명한다.", keyConcept: "악기군은 서로 다른 소리를 맡고 지휘자가 연주를 조율한다.", visualTheme: "orchestra",
    pages: [
      "An orchestra brings many instruments together. String players often sit near the front. Violins, violas, cellos, and basses belong there. Woodwinds add many clear colors. Brass instruments can sound bright and strong.",
      "Percussion players strike, shake, or scrape instruments. Some pieces use only a few sections. Others call for the whole orchestra. Each musician reads a written part. Those parts fit into one composition.",
      "The conductor stands where everyone can see. Hand movements show speed and musical shape. Players also listen closely to each other. Practice helps the sections balance. Many voices then become one performance.",
    ],
    words: [
      ["orchestra", "/ˈɔːrkɪstrə/", "오케스트라", "a large group of musicians", "An orchestra brings many instruments together."],
      ["percussion", "/pərˈkʌʃən/", "타악기", "instruments played by striking or shaking", "Percussion players strike, shake, or scrape instruments."],
      ["composition", "/ˌkɑːmpəˈzɪʃən/", "악곡", "a complete piece of music", "Those parts fit into one composition."],
      ["conductor", "/kənˈdʌktər/", "지휘자", "a person guiding musicians", "The conductor stands where everyone can see."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Who shows speed with hand movements?", options: ["The conductor", "The audience", "The builder"], correct: 0, explanation: "The conductor guides the group.", evidence: "Hand movements show speed and musical shape." },
      { type: "inference", prompt: "Why must players listen closely?", options: ["To balance together", "To change seats", "To build instruments"], correct: 0, explanation: "Listening supports ensemble balance.", evidence: "Practice helps the sections balance." },
      { type: "vocabulary", prompt: "What is percussion?", options: ["Struck or shaken instruments", "Only string instruments", "Written music"], correct: 0, explanation: "Percussion sounds through striking or shaking.", evidence: "Percussion players strike, shake, or scrape instruments." },
    ],
    sources: [
      ["Orchestra", "Encyclopaedia Britannica", "https://www.britannica.com/art/orchestra-music", "article", "오케스트라는 여러 악기군으로 구성된 대규모 연주 집단이다."],
      ["Instruments of the Orchestra", "Philharmonia Orchestra", "https://philharmonia.co.uk/resources/instruments/", "article", "오케스트라 악기는 현악기, 목관악기, 금관악기, 타악기로 나뉜다."],
    ],
  }),
  seed({
    id: "ar1-paper-folding", ar: 1.4, domain: "arts", subtopic: "공예",
    title: "Paper Changes Shape", titleKo: "접으면 달라지는 종이",
    summaryEn: "Folds turn a flat sheet into structured forms.", summaryKo: "평평한 종이가 접는 순서와 방향에 따라 입체 형태가 되는 원리를 알아봅니다.",
    learningGoal: "접기 순서와 완성 형태의 관계를 설명한다.", keyConcept: "정확한 접힘이 쌓여 복잡한 종이 형태를 만든다.", visualTheme: "origami",
    pages: [
      "A flat paper sheet seems very simple. Folding gives the sheet new structure. One crease divides the paper. More creases create corners and layers. Their order changes the final shape.",
      "Paper folding appears in many cultures. Japanese origami became widely known worldwide. Traditional folders often began with square paper. They made birds, boxes, and flowers. Many designs used no cuts or glue.",
      "Modern artists explore very complex forms. Engineers also study folding patterns. Folded shapes can open from small spaces. Maps and space equipment use this idea. Simple creases can solve practical problems.",
    ],
    words: [
      ["structure", "/ˈstrʌktʃər/", "구조", "the way parts are arranged", "Folding gives the sheet new structure."],
      ["crease", "/kriːs/", "접힌 선", "a line made by folding", "One crease divides the paper."],
      ["layers", "/ˈleɪərz/", "겹", "sheets placed over each other", "More creases create corners and layers."],
      ["practical", "/ˈpræktɪkəl/", "실용적인", "useful for real tasks", "Simple creases can solve practical problems."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What changes the final folded shape?", options: ["The crease order", "The paper name", "The room size"], correct: 0, explanation: "Fold order controls the result.", evidence: "Their order changes the final shape." },
      { type: "inference", prompt: "Why do engineers study folding?", options: ["Forms fit small spaces", "Paper becomes metal", "Maps need glue"], correct: 0, explanation: "Folded objects can pack compactly.", evidence: "Folded shapes can open from small spaces." },
      { type: "vocabulary", prompt: "What is a crease?", options: ["A folding line", "A paper bird", "A glue mark"], correct: 0, explanation: "A crease is left by folding.", evidence: "One crease divides the paper." },
    ],
    sources: [
      ["Origami", "Encyclopaedia Britannica", "https://www.britannica.com/art/origami", "article", "종이접기는 종이를 접어 형태를 만드는 공예이다."],
      ["Between the Folds", "PBS", "https://www.pbs.org/independentlens/documentaries/between-the-folds/", "video", "현대 종이접기는 예술, 수학, 과학과 연결된다."],
    ],
  }),
  seed({
    id: "ar1-telling-truth", ar: 1.5, domain: "philosophy", subtopic: "윤리",
    title: "Why Tell the Truth?", titleKo: "왜 진실을 말할까",
    summaryEn: "Truth supports trust, responsibility, and informed choices.", summaryKo: "진실한 말이 신뢰와 책임 있는 선택에 왜 중요한지 생각합니다.",
    learningGoal: "진실과 신뢰의 관계를 사례로 설명한다.", keyConcept: "정확한 정보는 사람들이 서로 믿고 선택하도록 돕는다.", visualTheme: "truth",
    pages: [
      "People depend on information from others. True words help them make good choices. A false answer can cause harm. It can also weaken trust. Trust takes time to build again.",
      "Telling truth can sometimes feel difficult. A mistake may make us embarrassed. We may fear another person's reaction. Still, honesty accepts responsibility. It gives people the real situation.",
      "Truth does not require cruel speech. Kind words can still be accurate. Private information also deserves careful protection. People need facts when they act. Good judgment considers truth, care, and safety. Honesty works best with respect.",
    ],
    words: [
      ["depend", "/dɪˈpend/", "의존하다", "to need help or support", "People depend on information from others."],
      ["trust", "/trʌst/", "신뢰", "belief that someone is reliable", "It can also weaken trust."],
      ["honesty", "/ˈɑːnəsti/", "정직", "the practice of being truthful", "Still, honesty accepts responsibility."],
      ["accurate", "/ˈækjərət/", "정확한", "correct and free from errors", "Kind words can still be accurate."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can false answers weaken?", options: ["Trust", "Privacy", "Kindness"], correct: 0, explanation: "Falsehood makes belief harder.", evidence: "It can also weaken trust." },
      { type: "inference", prompt: "Can truth still be kind?", options: ["Yes, with careful words", "No, never", "Only in private"], correct: 0, explanation: "Accuracy and care can coexist.", evidence: "Kind words can still be accurate." },
      { type: "vocabulary", prompt: "What is honesty?", options: ["Being truthful", "Feeling afraid", "Keeping every secret"], correct: 0, explanation: "Honesty means telling truth.", evidence: "Still, honesty accepts responsibility." },
    ],
    sources: [
      ["Truth", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/truth/", "article", "진실은 믿음과 진술이 사실에 맞는지 다루는 철학의 핵심 개념이다."],
      ["Honesty", "Character Lab", "https://characterlab.org/playbooks/honesty/", "article", "정직은 사실대로 말하고 행동에 책임지는 습관과 관련된다."],
    ],
  }),
  seed({
    id: "ar1-group-decisions", ar: 1.7, domain: "philosophy", subtopic: "공동체",
    title: "Choosing Together", titleKo: "함께 선택하는 방법",
    summaryEn: "Groups can listen, compare reasons, and choose fairly.", summaryKo: "여러 사람이 이유를 나누고 공정하게 결정하는 방법을 생각합니다.",
    learningGoal: "공동 결정에서 듣기와 이유의 역할을 설명한다.", keyConcept: "좋은 공동 결정은 목소리뿐 아니라 이유와 영향을 살핀다.", visualTheme: "decision",
    pages: [
      "Groups often need to choose one plan. Members may want different things. A quick vote can show numbers. However, numbers do not explain every reason. Listening should happen before choosing.",
      "Each person can state a view. Others can ask respectful questions. The group can compare benefits and problems. Some choices affect certain members more. Their needs deserve careful attention.",
      "No method makes every choice perfect. Voting works well in many cases. Discussion may reveal a better option. Sometimes a fair compromise helps everyone. Clear reasons also help absent members. Good decisions include reasons people understand.",
    ],
    words: [
      ["members", "/ˈmembərz/", "구성원", "people belonging to a group", "Members may want different things."],
      ["benefits", "/ˈbenəfɪts/", "이점", "helpful results", "The group can compare benefits and problems."],
      ["compromise", "/ˈkɑːmprəmaɪz/", "타협", "an agreement where sides adjust", "Sometimes a fair compromise helps everyone."],
      ["reasons", "/ˈriːzənz/", "이유", "explanations for a choice", "Good decisions include reasons people understand."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What should happen before choosing?", options: ["Listening", "Leaving", "Drawing"], correct: 0, explanation: "Groups should hear views first.", evidence: "Listening should happen before choosing." },
      { type: "inference", prompt: "Why discuss before voting?", options: ["To understand reasons", "To remove members", "To avoid choices"], correct: 0, explanation: "Discussion reveals reasons and effects.", evidence: "However, numbers do not explain every reason." },
      { type: "vocabulary", prompt: "What is a compromise?", options: ["An adjusted agreement", "A fast vote", "A private plan"], correct: 0, explanation: "Sides adjust to reach agreement.", evidence: "Sometimes a fair compromise helps everyone." },
    ],
    sources: [
      ["Democracy", "Encyclopaedia Britannica", "https://www.britannica.com/topic/democracy", "article", "민주적 결정은 시민의 참여와 집단 선택을 포함한다."],
      ["Deliberative Democracy", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/democracy/", "article", "숙의는 공적 결정에서 이유를 주고받는 과정을 중시한다."],
    ],
  }),
  seed({
    id: "ar1-school-bag", ar: 1.3, domain: "self-development", subtopic: "준비",
    title: "Pack Tomorrow Tonight", titleKo: "내일 가방은 오늘 밤에",
    summaryEn: "A short evening routine makes mornings easier.", summaryKo: "저녁의 짧은 준비 습관이 아침의 실수와 부담을 줄이는 방법을 배웁니다.",
    learningGoal: "전날 준비가 아침 행동을 돕는 이유를 설명한다.", keyConcept: "필요한 물건을 미리 확인하면 다음 행동이 쉬워진다.", visualTheme: "school-bag",
    pages: [
      "Busy mornings can make small tasks difficult. A missing book causes extra searching. An empty bottle needs quick filling. These problems use time and attention. Evening preparation can reduce them.",
      "First, check tomorrow's schedule. Put each needed book in your bag. Add finished homework and school supplies. Place the bag near your shoes. Prepare clothing for the weather.",
      "Keep the routine short and repeatable. A simple checklist can guide you. Cross off each finished task. Then your mind can rest. This creates a calmer start. Morning begins with fewer decisions.",
    ],
    words: [
      ["attention", "/əˈtenʃən/", "주의", "focused thought", "These problems use time and attention."],
      ["preparation", "/ˌprepəˈreɪʃən/", "준비", "work done before something", "Evening preparation can reduce them."],
      ["schedule", "/ˈskedʒuːl/", "일정", "a plan of activities", "First, check tomorrow's schedule."],
      ["repeatable", "/rɪˈpiːtəbəl/", "반복 가능한", "easy to do again", "Keep the routine short and repeatable."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What should you check first?", options: ["Tomorrow's schedule", "The classroom", "A friend's bag"], correct: 0, explanation: "The schedule shows needed items.", evidence: "First, check tomorrow's schedule." },
      { type: "inference", prompt: "Why place the bag near shoes?", options: ["To find it easily", "To clean the books", "To change the weather"], correct: 0, explanation: "Nearby items reduce morning searching.", evidence: "Morning begins with fewer decisions." },
      { type: "vocabulary", prompt: "What is preparation?", options: ["Work done beforehand", "A missing book", "A busy morning"], correct: 0, explanation: "Preparation happens before an event.", evidence: "Evening preparation can reduce them." },
    ],
    sources: [
      ["Back-to-School Tips", "American Academy of Pediatrics", "https://www.healthychildren.org/English/ages-stages/gradeschool/school/Pages/back-to-school-tips.aspx", "article", "전날 준비와 규칙적인 일과는 등교 준비를 돕는다."],
      ["Creating Healthy Routines", "CDC", "https://www.cdc.gov/child-development/about/index.html", "article", "예측 가능한 일과는 아동의 생활 기술과 안정감을 지원한다."],
    ],
  }),
  seed({
    id: "ar1-reading-focus", ar: 1.6, domain: "self-development", subtopic: "집중",
    title: "Make a Place to Read", titleKo: "읽기에 맞는 자리 만들기",
    summaryEn: "A prepared space reduces distractions during reading.", summaryKo: "읽기 전에 공간과 도구를 준비해 산만함을 줄이는 방법을 알아봅니다.",
    learningGoal: "환경 준비와 집중의 관계를 설명한다.", keyConcept: "방해 요소를 미리 줄이면 읽기에 주의를 쓰기 쉽다.", visualTheme: "reading-space",
    pages: [
      "Attention can move toward nearby sights and sounds. A buzzing phone may interrupt reading. A noisy video can pull attention away. Finding focus then takes more effort. The space around us matters.",
      "Choose a place with enough light. Steady light can reduce eye strain. Keep only useful tools nearby. Put the phone outside easy reach. Close extra screens and tabs. Set water beside you before starting.",
      "A perfect room is not necessary. Small changes can still help. Try one reading period in the space. Notice what interrupts you. Adjust the setup for next time.",
    ],
    words: [
      ["interrupt", "/ˌɪntəˈrʌpt/", "방해하다", "to stop something briefly", "A buzzing phone may interrupt reading."],
      ["effort", "/ˈefərt/", "노력", "energy used for a task", "Finding focus then takes more effort."],
      ["nearby", "/ˌnɪrˈbaɪ/", "가까이에", "close to a place", "Keep only useful tools nearby."],
      ["adjust", "/əˈdʒʌst/", "조정하다", "to change something slightly", "Adjust the setup for next time."],
    ],
    quiz: [
      { type: "comprehension", prompt: "Where should the phone go?", options: ["Outside easy reach", "On the book", "Beside every screen"], correct: 0, explanation: "Distance reduces phone distraction.", evidence: "Put the phone outside easy reach." },
      { type: "inference", prompt: "Why notice interruptions?", options: ["To improve the setup", "To end all reading", "To add more screens"], correct: 0, explanation: "Noticing problems guides changes.", evidence: "Adjust the setup for next time." },
      { type: "vocabulary", prompt: "What does interrupt mean?", options: ["Stop briefly", "Read quickly", "Light a room"], correct: 0, explanation: "An interruption breaks attention.", evidence: "A buzzing phone may interrupt reading." },
    ],
    sources: [
      ["Multitasking: Switching Costs", "American Psychological Association", "https://www.apa.org/topics/research/multitasking", "article", "과제 전환은 시간과 주의 비용을 만든다."],
      ["Healthy Habits", "American Psychological Association", "https://www.apa.org/topics/behavioral-health/healthy-habits", "article", "환경을 조정하고 작은 행동을 반복하면 습관 실천을 돕는다."],
    ],
  }),
  seed({
    id: "ar1-world-tea", ar: 1.6, domain: "world-culture", subtopic: "음식문화",
    title: "Tea in Many Places", titleKo: "여러 지역의 차 문화",
    summaryEn: "Tea leaves travel through varied traditions and recipes.", summaryKo: "같은 차나무 잎이 지역별 재료와 예절을 만나 달라지는 모습을 살펴봅니다.",
    learningGoal: "차 문화의 공통점과 차이점을 찾는다.", keyConcept: "차는 같은 식물에서 시작하지만 지역별 방식은 다양하다.", visualTheme: "tea",
    pages: [
      "Most true tea comes from one plant. Its leaves become green or black tea. Processing changes their color and flavor. People carried tea across trade routes. New places created new tea customs.",
      "In China, tea may highlight leaf flavors. Japanese tea gatherings value careful movements. Indian masala chai often includes milk and spices. British tea may come with milk. Moroccan mint tea is sweet and fragrant.",
      "Methods differ, but tea often welcomes guests. A shared cup creates time for conversation. Cups and pots reflect local craft. Climate also shapes added ingredients. Tea connects plants, trade, and community.",
    ],
    words: [
      ["processing", "/ˈprɑːsesɪŋ/", "가공", "steps changing a raw material", "Processing changes their color and flavor."],
      ["customs", "/ˈkʌstəmz/", "관습", "traditional ways of doing things", "New places created new tea customs."],
      ["fragrant", "/ˈfreɪɡrənt/", "향기로운", "having a pleasant smell", "Moroccan mint tea is sweet and fragrant."],
      ["community", "/kəˈmjuːnəti/", "공동체", "people connected in a place", "Tea connects plants, trade, and community."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What changes tea color and flavor?", options: ["Processing", "The cup", "Conversation"], correct: 0, explanation: "Processing changes the leaf.", evidence: "Processing changes their color and flavor." },
      { type: "inference", prompt: "What common role can tea have?", options: ["Welcoming guests", "Building roads", "Measuring rain"], correct: 0, explanation: "Many cultures share tea socially.", evidence: "Methods differ, but tea often welcomes guests." },
      { type: "vocabulary", prompt: "What does fragrant mean?", options: ["Pleasant-smelling", "Very cold", "Without color"], correct: 0, explanation: "Mint tea has a notable smell.", evidence: "Moroccan mint tea is sweet and fragrant." },
    ],
    sources: [
      ["Tea", "Encyclopaedia Britannica", "https://www.britannica.com/topic/tea-beverage", "article", "차는 차나무 잎을 여러 방식으로 가공해 만든 음료이다."],
      ["Tea", "Smithsonian Institution", "https://asia.si.edu/learn/tea/", "article", "차는 무역과 이동을 통해 다양한 지역 문화와 연결되었다."],
    ],
  }),
  seed({
    id: "ar1-kites", ar: 1.5, domain: "world-culture", subtopic: "놀이문화",
    title: "Kites Across the Sky", titleKo: "하늘을 건너간 연",
    summaryEn: "Kites spread across cultures for play, messages, and study.", summaryKo: "연이 여러 지역으로 퍼지며 놀이와 신호, 연구에 활용된 역사를 배웁니다.",
    learningGoal: "연의 구조와 다양한 쓰임을 설명한다.", keyConcept: "가벼운 틀과 바람의 힘이 연을 하늘에 띄운다.", visualTheme: "kite",
    pages: [
      "A kite needs moving air to rise. Wind pushes against its light surface. The string holds the kite's position. A frame keeps its shape steady. A tail can improve balance.",
      "Early kites appeared in ancient China. Builders used bamboo and silk or paper. Kites later spread through many regions. People made local shapes and decorations. Festivals filled skies with bright designs.",
      "Kites were not only toys. Armies once used them for signals. Scientists lifted tools with large kites. Weather observers carried instruments upward. Today, kites join art, sport, and science.",
    ],
    words: [
      ["surface", "/ˈsɜːrfɪs/", "표면", "the outside part of something", "Wind pushes against its light surface."],
      ["frame", "/freɪm/", "틀", "a structure supporting a shape", "A frame keeps its shape steady."],
      ["signals", "/ˈsɪɡnəlz/", "신호", "actions or signs carrying messages", "Armies once used them for signals."],
      ["instruments", "/ˈɪnstrəmənts/", "기구", "tools used for measurement", "Weather observers carried instruments upward."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What can improve kite balance?", options: ["A tail", "A book", "A cup"], correct: 0, explanation: "A tail helps stabilize the kite.", evidence: "A tail can improve balance." },
      { type: "inference", prompt: "Why did observers use kites?", options: ["To lift instruments", "To stop wind", "To make bamboo"], correct: 0, explanation: "Kites carried tools upward.", evidence: "Weather observers carried instruments upward." },
      { type: "vocabulary", prompt: "What is a frame?", options: ["A supporting structure", "A wind message", "A paper color"], correct: 0, explanation: "Frames hold shapes steady.", evidence: "A frame keeps its shape steady." },
    ],
    sources: [
      ["Kite", "Encyclopaedia Britannica", "https://www.britannica.com/technology/kite-aeronautics", "article", "연은 바람과 줄의 힘으로 비행하며 여러 문화권에서 발전했다."],
      ["Kites", "Smithsonian National Air and Space Museum", "https://airandspace.si.edu/exhibitions/kites", "article", "연은 놀이, 군사 신호, 과학 관측 등 다양한 용도로 쓰였다."],
    ],
  }),
  seed({
    id: "ar1-public-baths", ar: 1.7, domain: "world-culture", subtopic: "생활문화",
    title: "Bathing Together Long Ago", titleKo: "옛사람들의 공동 목욕탕",
    summaryEn: "Public baths joined washing, rest, and community life.", summaryKo: "여러 문화의 공동 목욕탕이 위생과 휴식, 만남의 장소였음을 알아봅니다.",
    learningGoal: "공동 목욕탕의 여러 사회적 기능을 설명한다.", keyConcept: "공동 목욕 공간은 씻기뿐 아니라 휴식과 교류에도 쓰였다.", visualTheme: "bathhouse",
    pages: [
      "Many old cities had shared bathing places. Homes often lacked private baths. Public buildings offered water and warmth. People washed after work or exercise. They also rested and met friends.",
      "Roman baths used rooms with different temperatures. Furnaces heated air under some floors. Water moved through pipes and channels. Bath buildings could include gardens and libraries. Visiting became part of city life.",
      "Other regions developed different bath traditions. Turkish hammams used warm rooms and steam. Japanese sento served neighborhood bathers. Rules protected cleanliness and shared comfort. Bathhouses reflected each local community.",
    ],
    words: [
      ["private", "/ˈpraɪvət/", "개인용의", "used by one person or group", "Homes often lacked private baths."],
      ["furnaces", "/ˈfɜːrnɪsɪz/", "화덕", "ovens producing strong heat", "Furnaces heated air under some floors."],
      ["channels", "/ˈtʃænəlz/", "수로", "paths carrying water", "Water moved through pipes and channels."],
      ["comfort", "/ˈkʌmfərt/", "편안함", "a pleasant and safe feeling", "Rules protected cleanliness and shared comfort."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What heated some Roman bath floors?", options: ["Hot air", "Sunlight", "Library lamps"], correct: 0, explanation: "Furnaces sent heat below floors.", evidence: "Furnaces heated air under some floors." },
      { type: "inference", prompt: "Why were bathhouses social places?", options: ["People met friends", "Homes had many baths", "Rules stopped talking"], correct: 0, explanation: "Bathing included rest and meetings.", evidence: "They also rested and met friends." },
      { type: "vocabulary", prompt: "What are channels?", options: ["Paths carrying water", "Warm rooms", "Cleaning rules"], correct: 0, explanation: "Channels guide moving water.", evidence: "Water moved through pipes and channels." },
    ],
    sources: [
      ["Bath", "Encyclopaedia Britannica", "https://www.britannica.com/technology/bath", "article", "공동 목욕 시설은 위생과 사회생활에 활용되었다."],
      ["Roman Baths", "The Metropolitan Museum of Art", "https://www.metmuseum.org/toah/hd/ther/hd_ther.htm", "article", "로마 목욕장은 온도가 다른 방과 바닥 난방 시설을 갖추었다."],
    ],
  }),
  seed({
    id: "ar1-shadow-theater", ar: 1.5, domain: "world-culture", subtopic: "공연문화",
    title: "Stories Made of Shadows", titleKo: "그림자로 들려주는 이야기",
    summaryEn: "Light and flat puppets create moving shadow stories.", summaryKo: "빛과 평면 인형, 음악이 만나 그림자극 이야기를 만드는 방식을 배웁니다.",
    learningGoal: "그림자극의 재료와 공연 방식을 설명한다.", keyConcept: "빛 앞에서 움직이는 인형이 막에 그림자를 만든다.", visualTheme: "shadow-theater",
    pages: [
      "A bright light shines behind a screen. A puppeteer holds a flat figure nearby. The figure blocks part of the light. Its dark shadow appears on the screen. Moving the figure moves the shadow.",
      "Shadow theater grew in several Asian cultures. Indonesian wayang uses detailed leather puppets. Chinese traditions use colored, jointed figures. Music and voices support each story. Skilled hands control thin rods.",
      "Audiences may see only the screen. Yet many artists work behind it. They coordinate movement, speech, and sound. Old stories can gain new versions. Light turns simple shapes into living characters.",
    ],
    words: [
      ["puppeteer", "/ˌpʌpəˈtɪr/", "인형 조종자", "a person controlling puppets", "A puppeteer holds a flat figure nearby."],
      ["blocks", "/blɑːks/", "가리다", "stops something from passing", "The figure blocks part of the light."],
      ["jointed", "/ˈdʒɔɪntɪd/", "관절이 있는", "having connected moving parts", "Chinese traditions use colored, jointed figures."],
      ["coordinate", "/koʊˈɔːrdɪneɪt/", "조율하다", "to organize parts together", "They coordinate movement, speech, and sound."],
    ],
    quiz: [
      { type: "comprehension", prompt: "What appears on the screen?", options: ["A dark shadow", "A real animal", "A written book"], correct: 0, explanation: "The figure blocks the light.", evidence: "Its dark shadow appears on the screen." },
      { type: "inference", prompt: "Why must artists coordinate?", options: ["Many parts happen together", "The screen is heavy", "Light needs leather"], correct: 0, explanation: "Movement, speech, and sound must align.", evidence: "They coordinate movement, speech, and sound." },
      { type: "vocabulary", prompt: "Who is a puppeteer?", options: ["A puppet controller", "A music listener", "A screen maker"], correct: 0, explanation: "Puppeteers move figures.", evidence: "A puppeteer holds a flat figure nearby." },
    ],
    sources: [
      ["Shadow Play", "Encyclopaedia Britannica", "https://www.britannica.com/art/shadow-play", "article", "그림자극은 빛과 평면 인형으로 막에 그림자를 만든다."],
      ["Wayang Puppet Theatre", "UNESCO", "https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063", "article", "인도네시아 와양은 인형, 음악, 구연이 결합된 공연 전통이다."],
    ],
  }),
];

const BATCH_07_EXPANSIONS: Record<string, string> = {
  "ar1-owl-flight": "Scientists compare owl feathers with other bird feathers. Smooth wings often create louder moving air. Owl feathers spread that air more gently. Their soft surfaces can wear down quickly. Owls must care for these useful feathers. They clean them with their beaks. Young owls practice controlling broad wings. Quiet flight improves as their skills develop. Darkness alone does not hide every sound. Special feathers make nighttime hunting more effective.",
  "ar1-ocean-tides": "Tide timing changes slightly from place to place. Many coasts receive two high tides daily. Some places follow a different local pattern. Bays can make tidal changes much larger. Narrow channels may create fast tidal currents. Boats need enough water below their hulls. Shore animals also follow changing water levels. Crabs hide when exposed rocks become dry. Birds search those rocks during low tide. The repeating cycle shapes busy coastal habitats.",
  "ar1-fingerprints": "Investigators compare ridge endings and small branches. They do not judge only large patterns. A clear print shows many useful details. Wet or dirty surfaces can blur marks. Gloves may prevent a print from forming. Scientists photograph prints before careful comparison. Computers can search large groups of records. Trained people still examine possible matches. A fingerprint is one piece of evidence. Other facts must support a responsible conclusion.",
  "ar1-ancient-bridges": "Bridge builders first studied the crossing place. Firm ground helped support heavy stone. Workers sometimes redirected water during construction. Wooden frames held arch stones temporarily. Builders placed a final stone near the top. This locking stone helped complete the arch. Workers then removed the wooden frame. The arch carried its own weight afterward. Regular repairs protected roads and stone surfaces. Building one bridge required organized teamwork. Measurements guided every step.",
  "ar1-early-glass": "Glassmakers controlled heat with practiced judgment. Too little heat left rough pieces. Too much heat could ruin a shape. Workers turned blowing pipes while shaping glass. Wooden tools helped form warm surfaces. Finished objects cooled slowly inside special ovens. Sudden cooling could crack the glass. Workshops often guarded their best methods carefully. Apprentices learned through years of close practice. Their knowledge traveled with skilled makers. Trade spread new styles widely.",
  "ar1-ink-writing": "Ink recipes had to match writing surfaces. Thick ink might work poorly with reeds. Thin ink could spread across rough fibers. Writers tested mixtures before important work. They stored ink in small covered containers. Dried ink sometimes needed added water. Dark marks made reading easier indoors. Colored inks highlighted titles and important lines. Careful copying preserved knowledge across generations. Durable ink helped distant voices reach us.",
  "ar1-stone-sculpture": "Different stones demand different working methods. Marble can hold smooth and detailed forms. Granite is harder and wears tools faster. Hidden cracks may surprise the sculptor. Artists inspect stone before major cuts. Dust can also harm eyes and lungs. Modern workers use masks and safer equipment. Some machines now remove rough material quickly. Hand tools still guide many final details. Each surface records choices made by the artist. Shadows reveal depth.",
  "ar1-orchestra": "Before concerts, musicians tune their instruments together. One steady note gives everyone a reference. Section leaders help coordinate similar instruments. Printed music includes notes and special directions. Soft passages require careful control from everyone. Loud passages still need balance and clarity. Concert halls change how sounds travel. Musicians adjust after hearing the room. The audience hears only the final result. Cooperation makes that shared result possible.",
  "ar1-paper-folding": "Every fold changes later possibilities. A misplaced crease can shift several parts. Folders often press creases with a fingernail. They rotate paper to follow directions clearly. Diagrams use arrows and dotted lines. These symbols show each next movement. Beginners learn common folds before complex models. Practice builds accuracy and spatial thinking. Some creators design models with computer tools. Others discover forms by folding freely. Both approaches reward patience.",
  "ar1-telling-truth": "Imagine someone breaks a shared classroom tool. Hiding the mistake delays a useful repair. Telling the truth allows action sooner. An apology can also recognize the harm. The speaker should explain without inventing excuses. Listeners should leave room for honest correction. Harsh punishment may encourage more hiding later. Fair responses can support future honesty. Truthful communities still make many mistakes. They improve by facing those mistakes together.",
  "ar1-group-decisions": "A classroom might choose a shared activity. First, students suggest several possible plans. They explain costs, time, and needed materials. The group removes choices that are unsafe. Members then compare the remaining options. A vote may select the final activity. Afterwards, everyone can review the process. Did each person get speaking time? Did the group consider important needs? Reflection improves the next shared decision. Listening builds trust.",
  "ar1-school-bag": "Preparation works best with a regular place. Keep school supplies together after using them. Replace empty pencils before they become urgent. Return signed papers directly to the bag. Special events may require unusual items. Add those items beside the normal checklist. Parents can remind younger students at first. Over time, students can lead the routine. Independent preparation grows through repeated practice. Missing something occasionally still offers useful feedback. Improvement stays gradual.",
  "ar1-reading-focus": "Some readers focus better with gentle background sound. Others need a very quiet place. Testing different settings reveals personal needs. A timer can define a short reading block. Begin with a realistic amount of time. Take a brief movement break afterward. Longer reading grows from several steady sessions. Difficult passages may require slower attention. Marking questions keeps confusion from wandering. A prepared space supports these reading choices.",
  "ar1-world-tea": "Tea preparation also changes with water temperature. Very hot water suits some dark teas. Cooler water can protect delicate green flavors. Steeping time changes strength and bitterness. Families may follow their own preferences. Serving tools can carry special meanings. Some cups are small and handleless. Other cups are large and decorated. Learning tea customs requires respectful curiosity. No single custom represents an entire country.",
  "ar1-kites": "Successful flyers watch the weather before launching. Very strong wind can damage light frames. Trees and wires create serious dangers. Open fields provide safer flying space. The flyer slowly releases more string. Small pulls can guide the kite. Teams sometimes fly huge festival kites together. Makers balance beauty with stable construction. Recycled paper can form simple practice kites. Careful testing improves each new design. Every flight teaches the maker something new.",
};

const BATCH_07_EXTRA_COMPREHENSION: Record<string, SeedQuiz> = {
  "ar1-owl-flight": { type: "comprehension", prompt: "What do young owls practice controlling?", options: ["Broad wings", "Ocean tides", "Stone arches"], correct: 0, explanation: "Young owls build flight control through practice.", evidence: "Young owls practice controlling broad wings." },
  "ar1-ocean-tides": { type: "comprehension", prompt: "What can make tidal changes much larger?", options: ["Bays", "Bird feathers", "Glass cups"], correct: 0, explanation: "The shape of a bay can increase tidal change.", evidence: "Bays can make tidal changes much larger." },
  "ar1-fingerprints": { type: "comprehension", prompt: "What small details do investigators compare?", options: ["Ridge endings and branches", "Finger bones and nails", "Glove colors and sizes"], correct: 0, explanation: "Investigators compare small ridge features.", evidence: "Investigators compare ridge endings and small branches." },
  "ar1-ancient-bridges": { type: "comprehension", prompt: "What held arch stones temporarily?", options: ["Wooden frames", "Moving water", "Road surfaces"], correct: 0, explanation: "Frames supported the stones during construction.", evidence: "Wooden frames held arch stones temporarily." },
  "ar1-early-glass": { type: "comprehension", prompt: "What could sudden cooling do to glass?", options: ["Crack it", "Color it", "Stretch it"], correct: 0, explanation: "Glass needed to cool slowly to avoid cracks.", evidence: "Sudden cooling could crack the glass." },
  "ar1-ink-writing": { type: "comprehension", prompt: "What highlighted titles and important lines?", options: ["Colored inks", "Covered containers", "Rough fibers"], correct: 0, explanation: "Writers used color to mark important text.", evidence: "Colored inks highlighted titles and important lines." },
  "ar1-stone-sculpture": { type: "comprehension", prompt: "What may surprise a sculptor inside stone?", options: ["Hidden cracks", "Soft wool", "Moving water"], correct: 0, explanation: "Cracks can remain unseen before carving.", evidence: "Hidden cracks may surprise the sculptor." },
  "ar1-orchestra": { type: "comprehension", prompt: "What do musicians do before concerts?", options: ["Tune together", "Fold paper", "Build frames"], correct: 0, explanation: "Tuning gives the group a shared pitch reference.", evidence: "Before concerts, musicians tune their instruments together." },
  "ar1-paper-folding": { type: "comprehension", prompt: "What symbols show the next movement?", options: ["Arrows and dotted lines", "Loops and whorls", "Pipes and channels"], correct: 0, explanation: "Origami diagrams use these symbols as directions.", evidence: "Diagrams use arrows and dotted lines." },
  "ar1-telling-truth": { type: "comprehension", prompt: "What does telling the truth allow?", options: ["Action sooner", "More hiding", "A broken tool"], correct: 0, explanation: "Knowing the truth lets people respond promptly.", evidence: "Telling the truth allows action sooner." },
  "ar1-group-decisions": { type: "comprehension", prompt: "Which choices does the group remove?", options: ["Unsafe choices", "Every possible plan", "All shared activities"], correct: 0, explanation: "Safety is checked before the final comparison.", evidence: "The group removes choices that are unsafe." },
  "ar1-school-bag": { type: "comprehension", prompt: "Where should signed papers be returned?", options: ["Directly to the bag", "Under a desk", "Beside the door"], correct: 0, explanation: "Returning papers immediately supports preparation.", evidence: "Return signed papers directly to the bag." },
  "ar1-reading-focus": { type: "comprehension", prompt: "What can define a short reading block?", options: ["A timer", "A difficult passage", "Background sound"], correct: 0, explanation: "A timer gives the reading period a clear boundary.", evidence: "A timer can define a short reading block." },
  "ar1-world-tea": { type: "comprehension", prompt: "What changes tea strength and bitterness?", options: ["Steeping time", "Cup handles", "Local trade"], correct: 0, explanation: "The time in water affects the finished tea.", evidence: "Steeping time changes strength and bitterness." },
  "ar1-kites": { type: "comprehension", prompt: "What can very strong wind damage?", options: ["Light frames", "Open fields", "Careful testing"], correct: 0, explanation: "Strong wind can overpower a light kite structure.", evidence: "Very strong wind can damage light frames." },
};

export const AR1_BATCH_07: LibrarySeed[] = AR1_BATCH_07_CANDIDATES.slice(0, 15).map((item) => ({
  ...item,
  pages: [...item.pages, BATCH_07_EXPANSIONS[item.id]],
  quiz: [...item.quiz, BATCH_07_EXTRA_COMPREHENSION[item.id]],
  heroImage: AR1_BATCH_07_IMAGES[item.id],
}));
