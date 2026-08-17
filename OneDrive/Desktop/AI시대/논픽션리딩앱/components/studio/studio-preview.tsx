"use client";

import { ReaderScreen } from "@/components/reader-screen";
import type { StudioArticle } from "@/lib/studio-types";
import type { Article } from "@/lib/types";

export function StudioPreview({ article }: { article: StudioArticle }) {
  return (
    <section className="studio-preview" aria-labelledby="studio-preview-heading">
      <div className="studio-preview__heading"><div><p className="eyebrow">PREVIEW</p><h2 id="studio-preview-heading">모바일 미리보기</h2></div><span>읽기 전용</span></div>
      <div className="studio-preview__phone">
        <ReaderScreen article={projectWorkingArticle(article)} onBack={() => {}} onFinish={() => {}} onEvent={() => {}} />
      </div>
    </section>
  );
}

export function projectWorkingArticle(article: StudioArticle): Article {
  const approval = article.approval;
  return {
    id: article.id,
    title: article.title || "제목 없는 콘텐츠",
    titleKo: article.titleKo,
    summaryKo: article.summaryKo,
    domain: article.domain,
    interestBand: article.interestBand,
    difficulty: { ...article.difficulty },
    estimatedMinutes: article.estimatedMinutes,
    wordCount: article.wordCount,
    status: article.workflowStatus === "published" ? "published" : "review",
    version: article.workingVersion,
    pages: article.pages.length > 0 ? [...article.pages] : ["미리보기에 표시할 본문을 입력해 주세요."],
    vocabulary: article.vocabulary.map((item) => ({ ...item })),
    quiz: article.quiz.map((question) => ({ ...question, options: [...question.options] })),
    sources: article.sources.map((source) => ({ ...source })),
    review: {
      approvedBy: approval?.actor ?? article.editor,
      approvedAt: approval?.approvedAt ?? article.updatedAt,
      factsChecked: Boolean(article.reviewRecords.facts),
      languageChecked: Boolean(article.reviewRecords.language),
      ageChecked: Boolean(article.reviewRecords.age),
    },
    connectedArticleId: article.connectedArticleId,
    visualTheme: article.visualTheme,
    ...(article.audioUrl ? { audioUrl: article.audioUrl } : {}),
  };
}
