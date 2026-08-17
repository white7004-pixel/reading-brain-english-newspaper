"use client";

import { useEffect, useRef, useState } from "react";
import { ArticleEditor, type ArticleEditorHandle } from "@/components/studio/article-editor";
import { ReviewPanel } from "@/components/studio/review-panel";
import { StudioDashboard } from "@/components/studio/studio-dashboard";
import { StudioPreview } from "@/components/studio/studio-preview";
import { loadStudioState, saveStudioState, upsertStudioArticle, type StudioLoadResult, type StudioState } from "@/lib/studio-store";
import { studioControlId } from "@/lib/studio-validation-ui";
import type { ArticlePersistenceResult, StudioArticle, ValidationIssue } from "@/lib/studio-types";

export function StudioApp({ storage }: { storage?: Storage }) {
  const [state, setState] = useState<StudioState | null>(null);
  const stateRef = useRef<StudioState | null>(null);
  const [recovery, setRecovery] = useState<Extract<StudioLoadResult, { kind: "read-failed" | "recovery-failed" }> | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [workspaceDraft, setWorkspaceDraft] = useState<StudioArticle | null>(null);
  const [initialSaveError, setInitialSaveError] = useState("");
  const [pendingPersistence, setPendingPersistence] = useState<{ article: StudioArticle; error: string } | null>(null);
  const [persistenceSuccessToken, setPersistenceSuccessToken] = useState(0);
  const [displayedIssues, setDisplayedIssues] = useState<ValidationIssue[]>([]);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("edit");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const editorRef = useRef<ArticleEditorHandle | null>(null);
  const mobile = useMobileWorkspace();

  useEffect(() => {
    const activeStorage = storage ?? window.localStorage;
    initializeFromStorage(activeStorage, setState, stateRef, setRecovery, setInitialSaveError);
  }, [storage]);

  if (recovery) return <StudioRecovery result={recovery} onRetry={() => initializeFromStorage(storage ?? window.localStorage, setState, stateRef, setRecovery, setInitialSaveError)} />;
  if (!state) return <div className="studio-loading" role="status">콘텐츠 스튜디오를 불러오는 중이에요.</div>;

  const persistArticle = async (article: StudioArticle): Promise<ArticlePersistenceResult> => {
    setWorkspaceDraft(article);
    try {
      const currentState = stateRef.current ?? state;
      const next = upsertStudioArticle(currentState, article);
      saveStudioState(storage ?? window.localStorage, next);
      stateRef.current = next;
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

  const retryPendingPersistence = async () => {
    if (!pendingPersistence) return;
    const result = await persistArticle(pendingPersistence.article);
    if (result.ok) setPersistenceSuccessToken((token) => token + 1);
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
    const selectTab = async (tab: WorkspaceTab, focus = false) => {
      const flushed = await (editorRef.current?.flush() ?? Promise.resolve({ ok: true as const }));
      if (!flushed.ok) return;
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
      void selectTab(tabs[next].id, true);
    };
    const persistWorkflowArticle = async (article: StudioArticle): Promise<ArticlePersistenceResult> => {
      const flushed = await (editorRef.current?.flush() ?? Promise.resolve({ ok: true as const }));
      if (!flushed.ok) return flushed;
      return persistArticle(article);
    };
    return (
      <main className="studio-workspace">
        <header className="studio-workspace__header">
          <button type="button" className="button button--ghost" aria-label="목록으로" disabled={Boolean(pendingPersistence)} onClick={async () => { const flushed = await (editorRef.current?.flush() ?? Promise.resolve({ ok: true as const })); if (!flushed.ok) return; setActiveArticleId(null); setWorkspaceDraft(null); setDisplayedIssues([]); }}>← 목록으로</button>
          <div><p className="eyebrow">CONTENT STUDIO</p><h1>{activeArticle.title || "제목 없는 콘텐츠"} 편집</h1></div>
        </header>
        {pendingPersistence && <div className="studio-persistence-alert" role="alert" aria-label="보류된 저장"><span>{pendingPersistence.error}</span><button type="button" onClick={() => void retryPendingPersistence()}>보류된 저장 재시도</button></div>}
        {mobile && <div className="studio-workspace__tabs" role="tablist" aria-label="스튜디오 작업 보기">
          {tabs.map((tab, index) => <button key={tab.id} id={`studio-tab-${tab.id}`} ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`studio-panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => void selectTab(tab.id)} onKeyDown={(event) => handleTabKey(event, index)}>{tab.label}</button>)}
        </div>}
        <div className="studio-workspace__grid">
          <div role={mobile ? "tabpanel" : undefined} id="studio-panel-edit" aria-label={mobile ? "편집" : undefined} aria-labelledby={mobile ? "studio-tab-edit" : undefined} hidden={mobile && activeTab !== "edit"}>
            <ArticleEditor ref={editorRef} article={activeArticle} onArticleChange={persistArticle} onDraftChange={setWorkspaceDraft} connectionOptions={state.articles.filter((item) => item.id !== activeArticle.id && item.activePublicationVersion !== null).map((item) => ({ id: item.id, title: item.versionHistory.find((entry) => entry.version === item.activePublicationVersion)?.snapshot.title ?? item.title }))} displayedIssues={displayedIssues} persistenceSuccessToken={persistenceSuccessToken} />
          </div>
          <div className="studio-workspace__rail">
            <div role={mobile ? "tabpanel" : undefined} id="studio-panel-review" aria-label={mobile ? "검수" : undefined} aria-labelledby={mobile ? "studio-tab-review" : undefined} hidden={mobile && activeTab !== "review"}>
              <ReviewPanel article={activeArticle} onArticleChange={persistWorkflowArticle} onIssuesChange={setDisplayedIssues} onNavigateToField={(field) => navigateToControl("edit", studioControlId(field))} onNavigateToPreview={() => navigateToControl("preview", "studio-preview-acknowledge")} persistenceSuccessToken={persistenceSuccessToken} />
            </div>
            <div role={mobile ? "tabpanel" : undefined} id="studio-panel-preview" aria-label={mobile ? "미리보기" : undefined} aria-labelledby={mobile ? "studio-tab-preview" : undefined} hidden={mobile && activeTab !== "preview"}>
              <StudioPreview article={activeArticle} onArticleChange={persistWorkflowArticle} persistenceSuccessToken={persistenceSuccessToken} />
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
    pages: [""],
    vocabulary: [],
    quiz: [],
    sources: [],
    visualTheme: "forest",
    workingVersion: 1,
    workflowStatus: "draft",
    reviewRecords: {},
    checklistAttestations: {},
    approval: null,
    previewReview: null,
    activePublicationVersion: null,
    versionHistory: [],
    auditHistory: [],
    editor: "content-editor",
    updatedAt: now,
    changeLog: [],
    learningGoal: "",
    keySentence: "",
    keyConcept: "",
    sourceNotes: "",
    reconstructionConfirmed: false,
    rightsNotes: "",
    media: [],
  };
}

function initializeFromStorage(
  storage: Storage,
  setState: React.Dispatch<React.SetStateAction<StudioState | null>>,
  stateRef: React.MutableRefObject<StudioState | null>,
  setRecovery: React.Dispatch<React.SetStateAction<Extract<StudioLoadResult, { kind: "read-failed" | "recovery-failed" }> | null>>,
  setInitialSaveError: React.Dispatch<React.SetStateAction<string>>,
): void {
  const result = loadStudioState(storage);
  if (result.kind === "read-failed" || result.kind === "recovery-failed") {
    setRecovery(result);
    return;
  }
  setRecovery(null);
  stateRef.current = result.state;
  setState(result.state);
  if (result.kind === "loaded" || result.kind === "corrupt-backed-up") {
    setInitialSaveError("");
    return;
  }
  try {
    saveStudioState(storage, result.state);
    setInitialSaveError("");
  } catch {
    setInitialSaveError(result.kind === "missing" ? "초기 저장에 실패했습니다." : "복구된 데이터를 저장하지 못했습니다.");
  }
}

function StudioRecovery({ result, onRetry }: { result: Extract<StudioLoadResult, { kind: "read-failed" | "recovery-failed" }>; onRetry: () => void }) {
  const exportOriginal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (result.kind !== "recovery-failed") return;
    event.preventDefault();
    const url = URL.createObjectURL(new Blob([result.raw], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "nonfiction-lab-studio-recovery.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return <main className="studio-recovery" role="alert" aria-label="저장 데이터 복구 필요">
    <h1>저장 데이터를 안전하게 열 수 없습니다.</h1>
    <p>원본은 변경하지 않았습니다. 저장소 접근 또는 백업을 다시 시도해 주세요.</p>
    <button type="button" className="button button--primary" onClick={onRetry}>백업 및 복구 재시도</button>
    {result.kind === "recovery-failed" && <a href="#" download="nonfiction-lab-studio-recovery.json" onClick={exportOriginal}>원본 JSON 내보내기</a>}
  </main>;
}

function persistenceError(error: unknown): string {
  return error instanceof Error ? error.message : "브라우저 저장소에 저장하지 못했습니다.";
}
