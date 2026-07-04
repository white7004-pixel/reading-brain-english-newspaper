export type TabKey = "newspaper" | "nblog" | "insta" | "newsletter" | "sms";

export interface NewspaperArticle {
  headline: string;
  subhead: string;
  byline: string;
  body: string[];
  imageCaption?: string;
}

export interface VocabItem {
  word: string;
  pos: string;
  meaningKo: string;
  example: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface NewspaperContent {
  masthead: string;
  date: string;
  issueNo: string;
  levelLabel: string;
  articles: NewspaperArticle[];
  vocabulary: VocabItem[];
  quiz: QuizItem[];
  teacherTip: string;
}

export interface BlogContent {
  title: string;
  sections: { heading: string; body: string }[];
  hashtags: string[];
  seoKeywords: string[];
}

export interface InstaContent {
  caption: string;
  slides: { title: string; body: string }[];
  hashtags: string[];
}

export interface NewsletterContent {
  title: string;
  greeting: string;
  sections: { heading: string; body: string }[];
  closing: string;
}

export interface SmsContent {
  variants: string[];
}

export type GeneratedContent =
  | { type: "newspaper"; data: NewspaperContent }
  | { type: "nblog"; data: BlogContent }
  | { type: "insta"; data: InstaContent }
  | { type: "newsletter"; data: NewsletterContent }
  | { type: "sms"; data: SmsContent };

export interface HistoryEntry {
  id: string;
  type: TabKey;
  title: string;
  createdAt: string;
  content: GeneratedContent;
}
