"use client";

import { useEffect, useRef, useState } from "react";
import { ArticleEditor } from "@/components/studio/article-editor";
import { ReviewPanel } from "@/components/studio/review-panel";
import { StudioDashboard } from "@/components/studio/studio-dashboard";
import { StudioPreview } from "@/components/studio/studio-preview";
import { loadStudioState, saveStudioState, upsertStudioArticle, type StudioState } from "@/lib/studio-store";
import { studioControlId } from "@/lib/studio-validation-ui";
import type { ArticlePersistenceResult, StudioArticle, ValidationIssue } from "@/lib/studio-types";

export function StudioApp({ storage }: { storage?: Storage }) {
  const [state, setState] = useState<StudioState | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [workspaceDraft, setWorkspaceDraft] = useState<StudioArticle | null>(null);
  const [initialSaveError, setInitialSaveError] = useState("");
  const [pendingPersistence, setPendingPersistence] = useState<{ article: StudioArticle; error: string } | null>(null);
  const [displayedIssues, setDisplayedIssues] = useState<ValidationIssue[]>([]);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("edit");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobile = useMobileWorkspace();

  useEffect(() => {
    const activeStorage = storage ?? window.localStorage;
    const loadedState = loadStudioState(activeStorage);
    setState(loadedState);
    try {
      saveStudioState(activeStorage, loadedState);
      setInitialSaveError("");
    } catch {
      setInitialSaveError("초기 저장에 실패했습니다.");
    }
  }, [storage]);

  if (!state) return <div className="studio-loading" role="status">콘텐츠 스튜디오를 불러오는 중이에요.</div>;

  const persistArticle = async (article: StudioArticle): Promise<ArticlePersistenceResult> => {
    setWorkspaceDraft(article);
    const next = upsertStudioArticle(state, article);
    try {
      saveStudioState(storage ?? window.localStorage, next);
      setState(next);
      setPendingPersistence(null);
      return { ok: true };
    } catch (error) {
      const message = persistenceError(error);
      setPendingPersistence({ article, error: message });
      return { ok: false, error: message };
    }
  };

  const retryInitialSave = () => {
    try {
      saveStudioState(storage ?? window.localStorage, state);
      setInitialSaveError("");
    } catch {
      setInitialSaveError("초기 저장에 실패했습니다.");
    }
  };

  const createArticle = async () => {
    const article = createBlankArticle(state.articles);
    setWorkspaceDraft(article);
    setActiveArticleId(article.id);
    const result = await persistArticle(article);
    if (!result.ok) return;
  };

  const activeArticle = activeArticleId
    ? workspaceDraft?.id === activeArticleId ? workspaceDraft : state.articles.find((article) => article.id === activeArticleId)
    : undefined;
  if (activeArticle) {
    const tabs: Array<{ id: WorkspaceTab; label: string }> = [{ id: "edit", label: "편집" }, { id: "review", label: "검수" }, { id: "preview", label: "미리보기" }];
    const selectTab = (tab: WorkspaceTab, focus = false) => {
      setActiveTab(tab);
      if (focus) tabRefs.current[tabs.findIndex((item) => item.id === tab)]?.focus();
    };
    const navigateToControl = (tab: WorkspaceTab, controlId: string) => {
      setActiveTab(tab);
      requestAnimationFrame(() => document.getElementById(controlId)?.focus());
    };
    const handleTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[next].id, true);
    };
    return (
      <main className="studio-workspace">
        <header className="studio-workspace__header">
          <button type="button" className="button button--ghost" aria-label="목록으로" disabled={Boolean(pendingPersistence)} onClick={() => { setActiveArticleId(null); setWorkspaceDraft(null); setDisplayedIssues([]); }}>← 목록으로</button>
          <div><p className="eyebrow">CONTENT STUDIO</p><h1>{activeArticle.title || "제목 없는 콘텐츠"} 편집</h1></div>
        </header>
        {pendingPersistence && <div className="studio-persistence-alert" role="alert" aria-label="보류된 저장"><span>{pendingPersistence.error}</span><button type="button" onClick={() => void persistArticle(pendingPersistence.article)}>보류된 저장 재시도</button></div>}
        {mobile && <div className="studio-workspace__tabs" role="tablist" aria-label="스튜디오 작업 보기">
          {tabs.map((tab, index) => <button key={tab.id} id={`studio-tab-${tab.id}`} ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`studio-panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => selectTab(tab.id)} onKeyDown={(event) => handleTabKey(event, index)}>{tab.label}</button>)}
        </div>}
        <div className="studio-workspace__grid">
          <div role={mobile ? "tabpanel" : undefined} id="studio-panel-edit" aria-label={mobile ? "편집" : undefined} aria-labelledby={mobile ? "studio-tab-edit" : undefined} hidden={mobile && activeTab !== "edit"}>
            <ArticleEditor article={activeArticle} onArticleChange={persistArticle} displayedIssues={displayedIssues} />
          </div>
          <div className="studio-workspace__rail">
            <div role={mobile ? "tabpanel" : undefined} id="studio-panel-review" aria-label={mobile ? "검수" : undefined} aria-labelledby={mobile ? "studio-tab-review" : undefined} hidden={mobile && activeTab !== "review"}>
              <ReviewPanel article={activeArticle} onArticleChange={persistArticle} onIssuesChange={setDisplayedIssues} onNavigateToField={(field) => navigateToControl("edit", studioControlId(field))} onNavigateToPreview={() => navigateToControl("preview", "studio-preview-acknowledge")} />
            </div>
            <div role={mobile ? "tabpanel" : undefined} id="studio-panel-preview" aria-label={mobile ? "미리보기" : undefined} aria-labelledby={mobile ? "studio-tab-preview" : undefined} hidden={mobile && activeTab !== "preview"}>
              <StudioPreview article={activeArticle} onArticleChange={persistArticle} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <>
    {initialSaveError && <div className="studio-persistence-alert" role="alert"><span>{initialSaveError}</span><button type="button" onClick={retryInitialSave}>초기 저장 재시도</button></div>}
    <StudioDashboard
      articles={state.articles}
      onCreate={() => void createArticle()}
      onOpen={(article) => { setActiveTab("edit"); setDisplayedIssues([]); setWorkspaceDraft(article); setActiveArticleId(article.id); }}
    />
  </>;
}

type WorkspaceTab = "edit" | "review" | "preview";

function useMobileWorkspace(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(max-width: 760px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
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
    summaryEn: "",
    summaryKo: "",
    domain: "science",
    subtopic: "",
    interestBand: "upper-elementary",
    difficulty: { value: 0, method: "nonfiction-lab-estimate", label: "논픽션랩 추정" },
    minAge: 10,
    maxAge: 12,
    estimatedReadingSeconds: 180,
    safetyFlags: [],
    safetyReviewed: false,
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
    previewReview: null,
    withdrawnAt: null,
    editor: "content-editor",
    updatedAt: now,
    changeLog: [],
    ageRange: "10-12",
    learningGoal: "",
    keySentence: "",
    keyConcept: "",
    sourceNotes: "",
    reconstructionConfirmed: false,
    rightsNotes: "",
    media: [],
  };
}

function persistenceError(error: unknown): string {
  return error instanceof Error ? error.message : "브라우저 저장소에 저장하지 못했습니다.";
}
