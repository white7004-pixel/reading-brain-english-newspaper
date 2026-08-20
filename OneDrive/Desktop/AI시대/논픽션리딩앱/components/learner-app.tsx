"use client";

import { useRef, useState } from "react";
import { AppShell, type Destination } from "./app-shell";
import { ExploreScreen } from "./explore-screen";
import { KnowledgeMapScreen } from "./knowledge-map-screen";
import { ProfileScreen } from "./profile-screen";
import { QuestResultScreen } from "./quest-result-screen";
import { QuizScreen, type QuizResult } from "./quiz-screen";
import { ReaderScreen, type ReaderEvent } from "./reader-screen";
import { TodayScreen } from "./today-screen";
import { getPublishedArticles } from "@/lib/content";
import { buildWeeklyGrowth } from "@/lib/growth-report";
import { buildKnowledgeMap } from "@/lib/knowledge-quest-map";
import { createDefaultLearnerState, recordAttempt, saveLearnerState, updateLearnerLevel, type LearnerLevel, type LearnerState } from "@/lib/learner-store";
import { advanceActiveQuest, clearActiveQuest, setActiveQuest } from "@/lib/quest-progress";
import { calculateQuestReward, type QuestReward } from "@/lib/quest-rewards";
import type { Article } from "@/lib/types";

type Session = { screen: Destination; articleId?: string; phase?: "reader" | "quiz" | "completion"; events: ReaderEvent[]; result?: QuizResult; reward?: QuestReward; startedAt?: number };

const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

export function LearnerApp({ initialState, storage }: { initialState: LearnerState; storage: Storage }) {
  const [state, setState] = useState(initialState);
  const articles = getPublishedArticles(storage);
  const completedArticleIdRef = useRef<string | null>(null);
  const [session, setSession] = useState<Session>(() => {
    const activeQuest = initialState.activeQuest;
    if (activeQuest && articles.some((article) => article.id === activeQuest.articleId)) return { screen: "learn", articleId: activeQuest.articleId, phase: activeQuest.phase, events: [], startedAt: Date.now() };
    return { screen: "today", events: [] };
  });
  const article = session.articleId ? articles.find((item) => item.id === session.articleId) : undefined;
  const knowledgeMap = buildKnowledgeMap(articles, state.completedArticleIds);
  const weeklyGrowth = buildWeeklyGrowth(state.attempts, localDate());

  const start = (next: Article) => {
    const activeQuest = state.activeQuest;
    if (activeQuest && articles.some((article) => article.id === activeQuest.articleId)) {
      setSession({ screen: "learn", articleId: activeQuest.articleId, phase: activeQuest.phase, events: [], startedAt: Date.now() });
      return;
    }
    completedArticleIdRef.current = null;
    const nextState = setActiveQuest(state, next.id);
    saveLearnerState(storage, nextState);
    setState(nextState);
    setSession({ screen: "learn", articleId: next.id, phase: "reader", events: [], startedAt: Date.now() });
  };

  const navigate = (next: Destination) => setSession({ screen: next, events: [] });
  const exitQuest = () => {
    completedArticleIdRef.current = null;
    const next = clearActiveQuest(state);
    saveLearnerState(storage, next);
    setState(next);
    setSession({ screen: "today", events: [] });
  };
  const completeQuiz = (result: QuizResult) => {
    if (!article || completedArticleIdRef.current === article.id) return;
    completedArticleIdRef.current = article.id;
    const now = new Date();
    const keyFinderEvent = [...session.events].reverse().find((event) => event.type === "key_finder_check");
    const reward = calculateQuestReward({ correct: result.correct, total: result.total, keyFinderCorrect: keyFinderEvent?.detail === "correct" });
    const recorded = recordAttempt(state, { id: `${article.id}-${now.toISOString()}`, articleId: article.id, articleTitle: article.title, articleVersion: article.version, completedAt: now.toISOString(), localDate: localDate(), correct: result.correct, total: result.total, hintsUsed: session.events.filter((event) => event.type === "word_open").length, durationSeconds: Math.max(1, Math.round((Date.now() - (session.startedAt ?? Date.now())) / 1000)), xpAwarded: reward.xp, domain: article.domain, keyFinderCorrect: keyFinderEvent?.detail === "correct", keyFinderSelections: keyFinderEvent?.keyFinderSelections ?? [] });
    const next = clearActiveQuest(recorded);
    saveLearnerState(storage, next);
    setState(next);
    setSession((current) => ({ ...current, phase: "completion", result, reward }));
  };

  return <AppShell active={session.screen} onNavigate={navigate}>
    {session.screen === "today" && <TodayScreen state={state} articles={articles} onStart={start} onOpenMap={() => navigate("map")} onExplore={() => navigate("explore")} />}
    {session.screen === "map" && <KnowledgeMapScreen nodes={knowledgeMap} onStart={start} />}
    {session.screen === "learn" && article && session.phase === "reader" && <ReaderScreen article={article} initialPageIndex={state.activeQuest?.articleId === article.id ? state.activeQuest.pageIndex : 0} onBack={exitQuest} onFinish={() => { const next = advanceActiveQuest(state, { articleId: article.id, phase: "quiz", pageIndex: article.pages.length - 1 }); saveLearnerState(storage, next); setState(next); setSession((current) => ({ ...current, phase: "quiz" })); }} onEvent={(event) => setSession((current) => ({ ...current, events: [...current.events, event] }))} onPageChange={(pageIndex) => { const next = advanceActiveQuest(state, { articleId: article.id, phase: "reader", pageIndex }); saveLearnerState(storage, next); setState(next); }} />}
    {session.screen === "learn" && article && session.phase === "quiz" && <QuizScreen questions={article.quiz} onExit={exitQuest} onComplete={completeQuiz} />}
    {session.screen === "learn" && article && session.phase === "completion" && session.reward && <QuestResultScreen article={article} reward={session.reward} state={state} onOpenMap={() => navigate("map")} onHome={() => navigate("today")} />}
    {session.screen === "explore" && <ExploreScreen articles={articles} initialDomain={null} onOpen={start} />}
    {session.screen === "profile" && <ProfileScreen state={state} growth={weeklyGrowth} onReset={() => { const reset = createDefaultLearnerState(); saveLearnerState(storage, reset); setState(reset); setSession({ screen: "today", events: [] }); }} onLevelChange={(level: LearnerLevel) => { const next = updateLearnerLevel(state, level); saveLearnerState(storage, next); setState(next); }} />}
    {session.screen === "learn" && !article && <section className="destination-placeholder"><p className="eyebrow">NONFICTION LAB</p><h1>학습</h1><p>오늘 또는 탐험에서 읽을 지식을 선택해 주세요.</p></section>}
  </AppShell>;
}
