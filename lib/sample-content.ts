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
  return {
    ...seed,
    interestBand: "all-ages",
    estimatedMinutes: 3,
    wordCount: seed.pages.join(" ").split(/\s+/).length,
    status: "published",
    version: 1,
    vocabulary: seed.words.map(([word, pronunciation, meaningKo, definitionEn]) => ({ word, pronunciation, meaningKo, definitionEn })),
    quiz: [
      { id: `${seed.id}-q1`, prompt: "What is the main idea?", options: [seed.summaryKo, "The topic cannot be explained.", "Only experts can learn this."], correctIndex: 0, explanation: `The passage explains ${seed.title.toLowerCase()} in a short, connected way.` },
      { id: `${seed.id}-q2`, prompt: `Which word is important to this topic?`, options: ["table", key, "window"], correctIndex: 1, explanation: `${key} is introduced and explained as a key word in the passage.` },
      { id: `${seed.id}-q3`, prompt: "Which statement is supported by the passage?", options: [first.split(".")[0] + ".", "Nothing changes over time.", "There is no evidence in the text."], correctIndex: 0, explanation: "The first option repeats a fact stated directly in the reading." },
    ],
    review,
  };
}

export const SAMPLE_ARTICLES: Article[] = [
  makeArticle({
    id: "stars-shine", title: "Why Do Stars Shine?", titleKo: "별은 왜 빛날까?", summaryKo: "별이 스스로 빛과 에너지를 만드는 원리를 알아봅니다.", domain: "science", difficulty: { value: 1.8, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 1.8" }, connectedArticleId: "great-wave", visualTheme: "space",
    pages: ["Stars look like tiny lights, but they are huge balls of hot gas. Our Sun is a star, too.", "Deep inside a star, tiny particles join together. This process releases energy as heat and light.", "The light travels across space. When it reaches Earth, we see a shining point in the night sky."],
    words: [["star", "/stɑːr/", "별", "a huge ball of hot gas"], ["energy", "/ˈenərdʒi/", "에너지", "power that can make light or heat"], ["particle", "/ˈpɑːrtɪkəl/", "입자", "a very small piece of matter"], ["release", "/rɪˈliːs/", "방출하다", "to let something out"]],
    sources: [source("Stars", "NASA Space Place", "https://spaceplace.nasa.gov/stars/en/"), source("Star", "Encyclopaedia Britannica", "https://www.britannica.com/science/star-astronomy")],
  }),
  makeArticle({
    id: "silk-road", title: "What Was the Silk Road?", titleKo: "실크로드는 무엇이었을까?", summaryKo: "물건과 생각이 오간 고대 교역망의 역할을 살펴봅니다.", domain: "history", difficulty: { value: 2.8, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 2.8" }, connectedArticleId: "tea-cultures", visualTheme: "desert",
    pages: ["The Silk Road was not one road. It was a wide network of routes joining Asia, Europe, and Africa.", "Traders carried silk, spices, glass, and paper. Travel was slow, so goods often passed through many hands.", "Ideas, inventions, art, and beliefs also moved along the routes. Trade connected people who lived far apart."],
    words: [["route", "/ruːt/", "경로", "a way from one place to another"], ["trader", "/ˈtreɪdər/", "상인", "a person who buys and sells goods"], ["network", "/ˈnetwɜːrk/", "망", "many connected paths or people"], ["connect", "/kəˈnekt/", "연결하다", "to join things together"]],
    sources: [source("The Silk Road", "UNESCO", "https://en.unesco.org/silkroad/about-silk-roads"), source("Silk Road", "Encyclopaedia Britannica", "https://www.britannica.com/topic/Silk-Road-trade-route")],
  }),
  makeArticle({
    id: "great-wave", title: "How Did the Great Wave Travel?", titleKo: "거대한 파도 그림은 어떻게 세계로 갔을까?", summaryKo: "호쿠사이의 판화가 세계 미술에 준 영향을 알아봅니다.", domain: "arts", difficulty: { value: 3.2, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 3.2" }, connectedArticleId: "silk-road", visualTheme: "wave",
    pages: ["Hokusai created The Great Wave as a woodblock print in Japan. Many copies could be made from carved blocks.", "The picture shows a powerful wave, small boats, and Mount Fuji. Its strong shape makes the scene feel alive.", "Prints traveled to Europe and inspired artists there. One image became a bridge between different art traditions."],
    words: [["print", "/prɪnt/", "판화", "a picture made by pressing an inked surface"], ["carve", "/kɑːrv/", "새기다", "to cut a shape into a surface"], ["inspire", "/ɪnˈspaɪər/", "영감을 주다", "to give someone a creative idea"], ["tradition", "/trəˈdɪʃən/", "전통", "a way of doing things over time"]],
    sources: [source("Under the Wave off Kanagawa", "The Metropolitan Museum of Art", "https://www.metmuseum.org/art/collection/search/45434"), source("Hokusai", "The British Museum", "https://www.britishmuseum.org/exhibitions/hokusai-great-picture-book-everything")],
  }),
  makeArticle({
    id: "stoic-control", title: "What Can We Control?", titleKo: "우리가 통제할 수 있는 것은 무엇일까?", summaryKo: "스토아 철학의 통제 개념을 일상적인 선택과 연결합니다.", domain: "philosophy", difficulty: { value: 4.3, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 4.3" }, connectedArticleId: "small-habits", visualTheme: "stone",
    pages: ["Stoic thinkers separated events into two groups: things we can control and things we cannot.", "We cannot control the weather or another person's choice. We can control how carefully we prepare and how we respond.", "This idea does not mean ignoring problems. It means using our effort where it can make a real difference."],
    words: [["control", "/kənˈtroʊl/", "통제하다", "to direct what happens"], ["respond", "/rɪˈspɑːnd/", "대응하다", "to act after something happens"], ["effort", "/ˈefərt/", "노력", "physical or mental work"], ["difference", "/ˈdɪfrəns/", "차이", "a way in which things are not the same"]],
    sources: [source("Stoicism", "Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/stoicism/"), source("Epictetus", "Internet Encyclopedia of Philosophy", "https://iep.utm.edu/epictet/")],
  }),
  makeArticle({
    id: "small-habits", title: "Why Do Small Habits Grow?", titleKo: "작은 습관은 왜 커질까?", summaryKo: "반복되는 작은 행동이 변화를 만드는 과정을 이해합니다.", domain: "self-development", difficulty: { value: 5.1, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 5.1" }, connectedArticleId: "stoic-control", visualTheme: "sprout",
    pages: ["A habit is a behavior repeated in a familiar situation. Repetition can make the behavior easier to begin.", "Small actions reduce the effort needed to start. Reading one page may feel possible even on a busy day.", "A useful habit needs a clear cue and a realistic action. Progress grows when the action is repeated, reviewed, and adjusted."],
    words: [["habit", "/ˈhæbɪt/", "습관", "a behavior repeated regularly"], ["repetition", "/ˌrepəˈtɪʃən/", "반복", "doing something again"], ["cue", "/kjuː/", "신호", "a signal to begin an action"], ["adjust", "/əˈdʒʌst/", "조정하다", "to change something slightly"]],
    sources: [source("The role of habit", "National Institutes of Health", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409/"), source("Making health habitual", "British Journal of General Practice", "https://bjgp.org/content/62/605/664")],
  }),
  makeArticle({
    id: "tea-cultures", title: "How Does Tea Tell a Story?", titleKo: "차 한 잔은 어떤 이야기를 담을까?", summaryKo: "차 문화가 지역의 역사와 관계 맺는 방식을 비교합니다.", domain: "world-culture", difficulty: { value: 6.2, method: "nonfiction-lab-estimate", label: "논픽션랩 추정 난이도 6.2" }, connectedArticleId: "stars-shine", visualTheme: "tea",
    pages: ["Tea is a drink, but it is also a cultural practice. The way people prepare and share it reflects local history.", "In different places, tea may welcome a guest, create a quiet pause, or bring a community together.", "Trade carried tea leaves, tools, and customs across borders. Each community adapted them and created new traditions."],
    words: [["culture", "/ˈkʌltʃər/", "문화", "shared ways of life and meaning"], ["reflect", "/rɪˈflekt/", "반영하다", "to show an idea or quality"], ["community", "/kəˈmjuːnəti/", "공동체", "people connected by place or interest"], ["adapt", "/əˈdæpt/", "맞게 바꾸다", "to change for a new use or situation"]],
    sources: [source("Tea traditions", "Smithsonian Institution", "https://www.si.edu/spotlight/tea"), source("Tea", "Encyclopaedia Britannica", "https://www.britannica.com/topic/tea-beverage")],
  }),
];

export const DOMAIN_LABELS: Record<KnowledgeDomain, string> = {
  science: "과학", history: "역사", arts: "예술", philosophy: "철학", "self-development": "자기계발", "world-culture": "세계문화",
};
