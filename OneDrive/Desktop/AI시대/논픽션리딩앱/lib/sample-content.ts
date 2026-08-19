import type { Article, KnowledgeDomain, SourceRef } from "./types";

const review = {
  approvedBy: "논픽션랩 편집팀",
  approvedAt: "2026-08-17",
  factsChecked: true,
  languageChecked: true,
  ageChecked: true,
};

const source = (title: string, publisher: string, url: string): SourceRef => ({ title, publisher, url });

type Seed = Pick<Article, "id" | "title" | "titleKo" | "summaryKo" | "domain" | "difficulty" | "pages" | "connectedArticleId" | "visualTheme"> & {
  words: Array<[string, string, string, string]>;
  sources: SourceRef[];
};

function makeArticle(seed: Seed): Article {
  const first = seed.pages[0];
  const key = seed.words[0][0];
  const { words, ...articleFields } = seed;
  return {
    ...articleFields,
    interestBand: "all-ages",
    estimatedMinutes: 3,
    wordCount: seed.pages.join(" ").split(/\s+/).length,
    status: "published",
    version: 1,
    vocabulary: words.map(([word, pronunciation, meaningKo, definitionEn]) => ({ word, pronunciation, meaningKo, definitionEn })),
    quiz: [
      { id: `${seed.id}-q1`, prompt: "What is the main idea?", options: [seed.summaryKo, "The topic cannot be explained.", "Only experts can learn this."], correctIndex: 0, explanation: `The passage explains ${seed.title.toLowerCase()} in a short, connected way.` },
      { id: `${seed.id}-q2`, prompt: `Which word is important to this topic?`, options: ["table", key, "window"], correctIndex: 1, explanation: `${key} is introduced and explained as a key word in the passage.` },
      { id: `${seed.id}-q3`, prompt: "Which statement is supported by the passage?", options: [first.split(".")[0] + ".", "Nothing changes over time.", "There is no evidence in the text."], correctIndex: 0, explanation: "The first option repeats a fact stated directly in the reading." },
    ],
    media: [],
    review,
  };
}

export const SAMPLE_ARTICLES: Article[] = [
  makeArticle({
    id: "stars-shine", title: "Why Do Stars Shine?", titleKo: "별은 왜 빛날까?", summaryKo: "별이 스스로 빛과 에너지를 만드는 원리를 알아봅니다.", domain: "science", difficulty: { value: 1.8, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 1.8" }, connectedArticleId: "great-wave", visualTheme: "space",
    pages: ["Stars look like tiny lights in the night sky, but they are enormous balls of hot gas. Our Sun is a star, too, and it looks larger only because it is much closer to Earth. Other stars are so far away that even giant stars appear to us as small points. A star also seems to twinkle because its light passes through moving air around our planet.", "Deep inside a star, gravity presses gas together until the center becomes extremely hot and dense. There, tiny particles join through a process called nuclear fusion. Fusion changes hydrogen into helium and releases a great amount of energy. That energy slowly moves from the center toward the star's surface, where it escapes into space as heat and light.", "Starlight travels across space at an astonishing speed, yet the distances are so great that the journey can take years. Light from the Sun reaches Earth in about eight minutes, while light from the next nearest star takes more than four years. When that light finally enters our eyes, we see a shining point and learn what the star was like long ago."],
    words: [["star", "/stɑːr/", "별", "a huge ball of hot gas"], ["energy", "/ˈenərdʒi/", "에너지", "power that can make light or heat"], ["particle", "/ˈpɑːrtɪkəl/", "입자", "a very small piece of matter"], ["release", "/rɪˈliːs/", "방출하다", "to let something out"]],
    sources: [source("Stars", "NASA Space Place", "https://spaceplace.nasa.gov/stars/en/"), source("Star", "Encyclopaedia Britannica", "https://www.britannica.com/science/star-astronomy")],
  }),
  makeArticle({
    id: "silk-road", title: "What Was the Silk Road?", titleKo: "실크로드는 무엇이었을까?", summaryKo: "물건과 생각이 오간 고대 교역망의 역할을 살펴봅니다.", domain: "history", difficulty: { value: 2.8, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 2.8" }, connectedArticleId: "tea-cultures", visualTheme: "desert",
    pages: ["The Silk Road was not one road. It was a wide network of land and sea routes that joined communities across Asia, Europe, and Africa. Some paths crossed deserts, while others climbed mountains or followed rivers. The network changed over time as rulers, wars, and weather made certain routes safer or more useful.", "Traders carried silk, spices, glass, paper, metalwork, horses, and many other goods. Few people traveled the entire distance. A product might pass through many hands and markets before reaching its final buyer. Travel was slow and dangerous, so merchants often joined caravans for protection and carried goods that were valuable enough to repay the cost of the journey.", "More than objects moved along these routes. Travelers shared languages, stories, inventions, artistic styles, religious beliefs, and scientific knowledge. Paper-making techniques, for example, spread far beyond the places where they began. Disease could travel with people as well. The Silk Road therefore connected distant societies and changed them, even when their people never met face to face."],
    words: [["route", "/ruːt/", "경로", "a way from one place to another"], ["trader", "/ˈtreɪdər/", "상인", "a person who buys and sells goods"], ["network", "/ˈnetwɜːrk/", "망", "many connected paths or people"], ["connect", "/kəˈnekt/", "연결하다", "to join things together"]],
    sources: [source("The Silk Road", "UNESCO", "https://en.unesco.org/silkroad/about-silk-roads"), source("Silk Road", "Encyclopaedia Britannica", "https://www.britannica.com/topic/Silk-Road-trade-route")],
  }),
  makeArticle({
    id: "great-wave", title: "How Did the Great Wave Travel?", titleKo: "거대한 파도 그림은 어떻게 세계로 갔을까?", summaryKo: "호쿠사이의 판화가 세계 미술에 준 영향을 알아봅니다.", domain: "arts", difficulty: { value: 3.2, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 3.2" }, connectedArticleId: "silk-road", visualTheme: "wave",
    pages: ["Katsushika Hokusai created The Great Wave off Kanagawa in Japan in the early 1830s. It was a woodblock print, not a single painting. An artist prepared the design, carvers cut wooden blocks, and printers pressed paper against inked surfaces. Because the blocks could be reused, many people could own a copy.", "The picture shows a towering wave curling above three narrow boats. Mount Fuji appears small and calm in the distance, even though it is Japan's highest mountain. The sharp foam looks almost like claws, while the curves guide the viewer's eye around the scene. Hokusai used strong outlines and a rich imported blue pigment to create motion, depth, and a feeling of danger.", "Japanese prints reached Europe in large numbers during the nineteenth century. Artists collected them and studied their unusual viewpoints, flat areas of color, and bold shapes. The Great Wave later appeared in books, posters, music, clothing, and advertisements around the world. Through travel and reproduction, one image became a bridge between different artistic traditions and remains recognizable today."],
    words: [["print", "/prɪnt/", "판화", "a picture made by pressing an inked surface"], ["carve", "/kɑːrv/", "새기다", "to cut a shape into a surface"], ["inspire", "/ɪnˈspaɪər/", "영감을 주다", "to give someone a creative idea"], ["tradition", "/trəˈdɪʃən/", "전통", "a way of doing things over time"]],
    sources: [source("Under the Wave off Kanagawa", "The Metropolitan Museum of Art", "https://www.metmuseum.org/art/collection/search/45434"), source("Hokusai", "The British Museum", "https://www.britishmuseum.org/exhibitions/hokusai-great-picture-book-everything")],
  }),
  makeArticle({
    id: "stoic-control", title: "What Can We Control?", titleKo: "우리가 통제할 수 있는 것은 무엇일까?", summaryKo: "스토아 철학의 통제 개념을 일상적인 선택과 연결합니다.", domain: "philosophy", difficulty: { value: 4.3, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 4.3" }, connectedArticleId: "small-habits", visualTheme: "stone",
    pages: ["Stoic thinkers in ancient Greece and Rome separated life into two groups: things within our control and things outside it. Our judgments, choices, and actions belong mostly to the first group. Other people's opinions, unexpected events, and many final results do not. The boundary is not perfect, but noticing it can make a situation clearer.", "We cannot command the weather, guarantee a high score, or decide how another person will behave. We can choose how carefully we prepare, whether we act honestly, and how we respond when plans fail. An athlete cannot control every referee or opponent, for example, but can control practice, attention, and effort. This shift turns worry into a question about the next useful action.", "The idea does not mean becoming passive, ignoring injustice, or pretending that painful events do not matter. Stoic writers encouraged people to work for good outcomes while accepting that outcomes are never completely theirs to command. We can plan, cooperate, speak up, and try again. By placing effort where it can make a real difference, we protect our attention and act with greater purpose."],
    words: [["control", "/kənˈtroʊl/", "통제하다", "to direct what happens"], ["respond", "/rɪˈspɑːnd/", "대응하다", "to act after something happens"], ["effort", "/ˈefərt/", "노력", "physical or mental work"], ["difference", "/ˈdɪfrəns/", "차이", "a way in which things are not the same"]],
    sources: [source("Stoicism", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/stoicism/"), source("Epictetus", "Internet Encyclopedia of Philosophy", "https://iep.utm.edu/epictet/")],
  }),
  makeArticle({
    id: "small-habits", title: "Why Do Small Habits Grow?", titleKo: "작은 습관은 왜 커질까?", summaryKo: "반복되는 작은 행동이 변화를 만드는 과정을 이해합니다.", domain: "self-development", difficulty: { value: 5.1, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 5.1" }, connectedArticleId: "stoic-control", visualTheme: "sprout",
    pages: ["A habit is a behavior repeated in a familiar situation. At first, the action requires a decision, but repetition can make it easier to begin. A regular cue, such as finishing breakfast or placing a book on a desk, reminds the brain what comes next. Over time, the cue and action become linked, so less planning is needed.", "Small actions often work well because they reduce the effort needed to start. Reading one page may feel possible even on a busy day, while a goal of fifty pages may invite delay. Finishing a tiny action also gives quick evidence that the plan is realistic. Once a person begins, continuing for a little longer may feel easier, but the small starting point still counts on difficult days.", "A useful habit needs a clear cue, a specific action, and an environment that supports it. Progress is rarely perfectly smooth. Travel, illness, or changing schedules can interrupt a routine without erasing what was learned. Instead of depending on motivation alone, people can review what happened and adjust the plan. Repeated small choices can grow into meaningful change because they are easier to practice consistently."],
    words: [["habit", "/ˈhæbɪt/", "습관", "a behavior repeated regularly"], ["repetition", "/ˌrepəˈtɪʃən/", "반복", "doing something again"], ["cue", "/kjuː/", "신호", "a signal to begin an action"], ["adjust", "/əˈdʒʌst/", "조정하다", "to change something slightly"]],
    sources: [source("The role of habit", "National Institutes of Health", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409/"), source("Making health habitual", "British Journal of General Practice", "https://bjgp.org/content/62/605/664")],
  }),
  makeArticle({
    id: "tea-cultures", title: "How Does Tea Tell a Story?", titleKo: "차 한 잔은 어떤 이야기를 담을까?", summaryKo: "차 문화가 지역의 역사와 관계 맺는 방식을 비교합니다.", domain: "world-culture", difficulty: { value: 6.2, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 6.2" }, connectedArticleId: "stars-shine", visualTheme: "tea",
    pages: ["Tea is a drink made by steeping leaves, but it is also a cultural practice. The way people grow, prepare, serve, and share tea reflects local history and values. Climate affects which tea can be produced, while fuel, water, tools, and trade shape how it is brewed. Even the cups used for tea can carry meaning.", "In different places, tea may welcome a guest, create a quiet pause, or bring a community together. Some traditions emphasize careful movements and simple utensils. Others serve strong tea with milk, sugar, spices, or salt. There is no single correct tea culture. Each custom answers local needs and helps people show hospitality, respect, celebration, comfort, or connection in a familiar way.", "Trade carried tea leaves, seeds, tools, and customs across mountains, seas, and political borders. As tea entered new regions, communities adapted it to local tastes and created new traditions. Its history also includes competition, taxation, empire, and difficult labor, so the story is not only peaceful. Following a cup of tea from farm to table reveals links among geography, work, power, memory, and everyday life."],
    words: [["culture", "/ˈkʌltʃər/", "문화", "shared ways of life and meaning"], ["reflect", "/rɪˈflekt/", "반영하다", "to show an idea or quality"], ["community", "/kəˈmjuːnəti/", "공동체", "people connected by place or interest"], ["adapt", "/əˈdæpt/", "맞게 바꾸다", "to change for a new use or situation"]],
    sources: [source("Tea traditions", "Smithsonian Institution", "https://www.si.edu/spotlight/tea"), source("Tea", "Encyclopaedia Britannica", "https://www.britannica.com/topic/tea-beverage")],
  }),
];

export const DOMAIN_LABELS: Record<KnowledgeDomain, string> = {
  science: "과학", history: "역사", arts: "예술", philosophy: "철학", "self-development": "자기계발", "world-culture": "세계문화",
};
