export type KnowledgeDomain = "science" | "history" | "arts" | "philosophy" | "self-development" | "world-culture";
export type InterestBand = "lower-elementary" | "upper-elementary" | "teen" | "adult" | "all-ages";
export type ContentStatus = "draft" | "review" | "published" | "withdrawn";

export type Difficulty = {
  value: number;
  method: "external-user-entry" | "nonfiction-lab-estimate";
  label: string;
};

export type SourceRef = {
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;
};

export type ReviewRecord = {
  approvedBy: string;
  approvedAt: string;
  factsChecked: boolean;
  languageChecked: boolean;
  ageChecked: boolean;
};

export type VocabularyItem = {
  word: string;
  pronunciation: string;
  meaningKo: string;
  definitionEn: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ArticleImageMedia = {
  kind: "image";
  url: string;
  alt: string;
};

export type ArticleVideoMedia = {
  kind: "video";
  provider: "youtube" | "ted" | "cnn";
  embedUrl: string;
  alt: string;
};

export type ArticleMedia = ArticleImageMedia | ArticleVideoMedia;

export type ArticleHeroImage = {
  src: string;
  altKo: string;
  sourcePageUrl: string;
  title: string;
  creator: string;
  licenseName: "CC BY 2.0" | "CC BY 3.0" | "CC BY 4.0" | "CC BY-SA 2.0" | "CC BY-SA 3.0" | "CC BY-SA 4.0" | "Public domain";
  licenseUrl: string;
  isModified: false;
};

export type Article = {
  id: string;
  title: string;
  titleKo: string;
  summaryKo: string;
  domain: KnowledgeDomain;
  interestBand: InterestBand;
  difficulty: Difficulty;
  estimatedMinutes: 3;
  wordCount: number;
  status: ContentStatus;
  version: number;
  pages: string[];
  keySentence: string;
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
  sources: SourceRef[];
  review: ReviewRecord;
  connectedArticleId?: string;
  visualTheme: string;
  heroImage?: ArticleHeroImage;
  media: ArticleMedia[];
  audioUrl?: string;
};
