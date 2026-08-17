"use client";

import { useEffect, useState } from "react";
import { ArticleEditor } from "@/components/studio/article-editor";
import { ReviewPanel } from "@/components/studio/review-panel";
import { StudioDashboard } from "@/components/studio/studio-dashboard";
import { StudioPreview } from "@/components/studio/studio-preview";
import { loadStudioState, saveStudioState, upsertStudioArticle, type StudioState } from "@/lib/studio-store";
import type { StudioArticle } from "@/lib/studio-types";

export function StudioApp({ storage }: { storage?: Storage }) {
  const [state, setState] = useState<StudioState | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  useEffect(() => {
    const activeStorage = storage ?? window.localStorage;
    const loadedState = loadStudioState(activeStorage);
    saveStudioState(activeStorage, loadedState);
    setState(loadedState);
  }, [storage]);

  if (!state) return <div className="studio-loading" role="status">콘텐츠 스튜디오를 불러오는 중이에요.</div>;

  const persistArticle = (article: StudioArticle) => {
    setState((current) => {
      if (!current) return current;
      const next = upsertStudioArticle(current, article);
      saveStudioState(storage ?? window.localStorage, next);
      return next;
    });
  };

  const createArticle = () => {
    const article = createBlankArticle(state.articles);
    persistArticle(article);
    setActiveArticleId(article.id);
  };

  const activeArticle = activeArticleId ? state.articles.find((article) => article.id === activeArticleId) : undefined;
  if (activeArticle) {
    return (
      <main className="studio-workspace">
        <header className="studio-workspace__header">
          <button type="button" className="button button--ghost" aria-label="목록으로" onClick={() => setActiveArticleId(null)}>← 목록으로</button>
          <div><p className="eyebrow">CONTENT STUDIO</p><h1>{activeArticle.title || "제목 없는 콘텐츠"} 편집</h1></div>
        </header>
        <div className="studio-workspace__grid">
          <ArticleEditor article={activeArticle} onArticleChange={persistArticle} />
          <div className="studio-workspace__rail">
            <ReviewPanel article={activeArticle} onArticleChange={persistArticle} />
            <StudioPreview article={activeArticle} />
          </div>
        </div>
      </main>
    );
  }

  return <StudioDashboard
    articles={state.articles}
    onCreate={createArticle}
    onOpen={(article) => setActiveArticleId(article.id)}
  />;
}

function createBlankArticle(articles: StudioArticle[]): StudioArticle {
  const baseId = `draft-${Date.now()}`;
  let id = baseId;
  let suffix = 1;
  while (articles.some((article) => article.id === id)) id = `${baseId}-${suffix++}`;
  const now = new Date().toISOString();

  return {
    id,
    title: "새 콘텐츠",
    titleKo: "",
    summaryKo: "",
    domain: "science",
    interestBand: "upper-elementary",
    difficulty: { value: 0, method: "nonfiction-lab-estimate", label: "논픽션랩 추정" },
    estimatedMinutes: 3,
    wordCount: 0,
    status: "draft",
    version: 1,
    pages: [""],
    vocabulary: [],
    quiz: [],
    sources: [],
    connectedArticleId: "pending",
    visualTheme: "forest",
    workingVersion: 1,
    publishedSnapshot: null,
    workflowStatus: "draft",
    reviewRecords: {},
    approval: null,
    withdrawnAt: null,
    editor: "content-editor",
    updatedAt: now,
    changeLog: [],
    ageRange: "10-12",
    learningGoal: "",
    keySentence: "",
    keyConcept: "",
    sourceNotes: "",
    media: [],
  };
}
