export type Category = { id: string; label: string; ko: string };

export type TopicSuggestion = { title: string; angle: string; ko: string };

export type CategoryTopics = {
  categoryId: string;
  categoryLabel: string;
  categoryKo: string;
  topics: TopicSuggestion[];
  error?: string;
};

export type Article = {
  headline: string;
  subheadline: string;
  byline: string;
  dateline: string;
  body_paragraphs: string[];
  word_count: number;
};

export type VocabItem = {
  word: string;
  pos: string;
  definition: string;
  ko: string;
  example: string;
  from_article?: boolean;
};

export type MCQ = { q: string; choices: string[]; answer: string; explanation?: string };
export type ShortQ = { q: string; answer: string };

export type WorkbookData = {
  article: Article;
  vocabulary: VocabItem[];
  comprehension_mc: MCQ[];
  comprehension_short: ShortQ[];
  summary_task: { instruction: string; main_idea_hint: string; model_summary: string };
  discussion: string[];
  writing_prompt: { prompt: string; checklist: string[] };
  grammar_focus: {
    point: string;
    explanation: string;
    examples_from_article: string[];
    practice: { q: string; answer: string }[];
  };
  meta: {
    ar: number;
    grade: number | string;
    length: string;
    category: string;
    category_ko: string;
    generated_at: string;
  };
};

export type BookData = {
  sections: WorkbookData[];
  meta: {
    ar: number;
    grade: number | string;
    length: string;
    generated_at: string;
    issue_label: string;
  };
};
