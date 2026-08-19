"use client";

import { useEffect, useState } from "react";
import { ReaderScreen } from "@/components/reader-screen";
import { acknowledgePreview } from "@/lib/studio-workflow";
import type { ArticlePersistenceResult, StudioArticle } from "@/lib/studio-types";
import type { Article } from "@/lib/types";

type Props = {
  article: StudioArticle;
  onArticleChange?: (article: StudioArticle) => ArticlePersistenceResult | Promise<ArticlePersistenceResult> | void;
  persistenceSuccessToken?: number;
  actor?: string;
  now?: () => string;
};

export function StudioPreview({ article, onArticleChange, persistenceSuccessToken = 0, actor = article.editor, now = () => new Date().toISOString() }: Props) {
  const acknowledged = article.previewReview?.workingVersion === article.workingVersion;
  const [saveError, setSaveError] = useState("");
  const [retryArticle, setRetryArticle] = useState<StudioArticle | null>(null);
  useEffect(() => { setSaveError(""); setRetryArticle(null); }, [article.id, article.workingVersion, persistenceSuccessToken]);
  const persistAcknowledgement = async (next: StudioArticle) => {
    if (!onArticleChange) return;
    setRetryArticle(next);
    try {
      const result = await onArticleChange(next);
      if (result && !result.ok) { setSaveError(result.error); return; }
      setSaveError(""); setRetryArticle(null);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "미리보기 확인을 저장하지 못했습니다.");
    }
  };
  return (
    <section className="studio-preview" aria-labelledby="studio-preview-heading">
      <div className="studio-preview__heading"><div><p className="eyebrow">PREVIEW</p><h2 id="studio-preview-heading">모바일 미리보기</h2></div><span>읽기 전용</span></div>
      <div className="studio-preview__phone">
        <ReaderScreen article={projectWorkingArticle(article)} onBack={() => {}} onFinish={() => {}} onEvent={() => {}} />
      </div>
      {onArticleChange && (acknowledged
        ? <p className="studio-preview__acknowledged">{article.previewReview?.actor} · 작업 버전 {article.workingVersion} 확인</p>
        : <button id="studio-preview-acknowledge" type="button" className="button button--secondary" onClick={() => void persistAcknowledgement(acknowledgePreview(article, actor, now()))}>미리보기 확인 완료</button>)}
      {saveError && <div className="studio-field-error" role="alert"><span>{saveError}</span>{retryArticle && <button type="button" onClick={() => void persistAcknowledgement(retryArticle)}>미리보기 확인 저장 재시도</button>}</div>}
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
    keySentence: article.keySentence || article.pages[0]?.split(/(?<=[.!?])\s+/)[0] || "핵심 문장을 입력해 주세요.",
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
    media: article.media.map((item) => item.kind === "image"
      ? { kind: "image", url: item.url, alt: item.alt }
      : { kind: "video", provider: item.provider, embedUrl: item.embedUrl, alt: item.alt }),
    ...(article.audioUrl ? { audioUrl: article.audioUrl } : {}),
  };
}
