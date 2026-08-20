"use client";

import { useState } from "react";
import { AppShell, type Destination } from "./app-shell";
import { HomeScreen } from "./home-screen";
import { ReaderScreen, type ReaderEvent } from "./reader-screen";
import { QuizScreen, type QuizResult } from "./quiz-screen";
import { CompletionScreen } from "./completion-screen";
import { ExploreScreen } from "./explore-screen";
import { ProfileScreen } from "./profile-screen";
import { getPublishedArticles } from "@/lib/content";
import { recordAttempt, saveLearnerState, updateLearnerLevel, type LearnerLevel, type LearnerState } from "@/lib/learner-store";
import { advanceActiveQuest, clearActiveQuest, setActiveQuest } from "@/lib/quest-progress";
import type { Article } from "@/lib/types";
import { createDefaultLearnerState } from "@/lib/learner-store";

type Session = { screen: "home" | "explore" | "profile" | "learn"; articleId?: string; phase?: "reader" | "quiz" | "completion"; events: ReaderEvent[]; result?: QuizResult; startedAt?: number };

const localDate = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; };

export function LearnerApp({ initialState, storage }: { initialState: LearnerState; storage: Storage }) {
  const [state, setState] = useState(initialState);
  const articles = getPublishedArticles(storage);
  const [session, setSession] = useState<Session>(() => {
    const activeQuest = initialState.activeQuest;
    if (activeQuest && articles.some((article) => article.id === activeQuest.articleId)) {
      return { screen: "learn", articleId: activeQuest.articleId, phase: activeQuest.phase, events: [], startedAt: Date.now() };
    }
    return { screen: "home", events: [] };
  });
  const destination: Destination = session.screen === "learn" ? "learn" : session.screen;
  const article = session.articleId ? articles.find((item) => item.id === session.articleId) : undefined;
  const connectedArticle = article?.connectedArticleId
    ? articles.find((item) => item.id === article.connectedArticleId)
    : undefined;
  const start = (next: Article) => {
    const activeQuest = state.activeQuest;
    if (activeQuest && articles.some((article) => article.id === activeQuest.articleId)) {
      setSession({ screen: "learn", articleId: activeQuest.articleId, phase: activeQuest.phase, events: [], startedAt: Date.now() });
      return;
    }
    const nextState = setActiveQuest(state, next.id);
    saveLearnerState(storage, nextState);
    setState(nextState);
    setSession({ screen: "learn", articleId: next.id, phase: "reader", events: [], startedAt: Date.now() });
  };
  const navigate = (next: Destination) => setSession({ screen: next, events: [] });
  const exitQuest = () => {
    const next = clearActiveQuest(state);
    saveLearnerState(storage, next);
    setState(next);
    setSession({ screen: "home", events: [] });
  };

  const completeQuiz = (result: QuizResult) => {
    if (!article) return;
    const now = new Date();
    const xp = result.correct === result.total ? 35 : 25;
    const recorded = recordAttempt(state, { id: `${article.id}-${now.toISOString()}`, articleId: article.id, articleTitle: article.title, articleVersion: article.version, completedAt: now.toISOString(), localDate: localDate(), correct: result.correct, total: result.total, hintsUsed: session.events.filter((event) => event.type === "word_open").length, durationSeconds: Math.max(1, Math.round((Date.now() - (session.startedAt ?? Date.now())) / 1000)), xpAwarded: xp });
    const next = clearActiveQuest(recorded);
    saveLearnerState(storage, next); setState(next); setSession((current) => ({ ...current, phase: "completion", result }));
  };

  return <AppShell active={destination} onNavigate={navigate}>
    {session.screen === "home" && <HomeScreen state={state} articles={articles} onStart={start} onExplore={() => setSession({ screen: "explore", events: [] })} />}
    {session.screen === "learn" && article && session.phase === "reader" && <ReaderScreen article={article} initialPageIndex={state.activeQuest?.articleId === article.id ? state.activeQuest.pageIndex : 0} onBack={exitQuest} onFinish={() => {
      const next = advanceActiveQuest(state, { articleId: article.id, phase: "quiz", pageIndex: article.pages.length - 1 });
      saveLearnerState(storage, next);
      setState(next);
      setSession((current) => ({ ...current, phase: "quiz" }));
    }} onEvent={(event) => setSession((current) => ({ ...current, events: [...current.events, event] }))} onPageChange={(pageIndex) => {
      const next = advanceActiveQuest(state, { articleId: article.id, phase: "reader", pageIndex });
      saveLearnerState(storage, next);
      setState(next);
    }} />}
    {session.screen === "learn" && article && session.phase === "quiz" && <QuizScreen questions={article.quiz} onExit={exitQuest} onComplete={completeQuiz} />}
    {session.screen === "learn" && article && session.phase === "completion" && session.result && <CompletionScreen article={article} result={session.result} state={state} onHome={() => navigate("home")} onNext={connectedArticle ? () => start(connectedArticle) : undefined} />}
    {session.screen === "explore" && <ExploreScreen articles={articles} initialDomain={null} onOpen={start} />}
    {session.screen === "profile" && <ProfileScreen
      state={state}
      onReset={() => { const reset = createDefaultLearnerState(); saveLearnerState(storage, reset); setState(reset); setSession({ screen: "home", events: [] }); }}
      onLevelChange={(level: LearnerLevel) => { const next = updateLearnerLevel(state, level); saveLearnerState(storage, next); setState(next); }}
    />}
    {session.screen === "learn" && !article && <section><p className="eyebrow">Nonfiction Lab</p><h1>학습</h1><p>홈이나 탐험에서 읽을 지식을 선택해 주세요.</p></section>}
  </AppShell>;
}
