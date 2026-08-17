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
import { recordAttempt, saveLearnerState, type LearnerState } from "@/lib/learner-store";
import type { Article } from "@/lib/types";
import { createDefaultLearnerState } from "@/lib/learner-store";

type Session = { screen: "home" | "explore" | "profile" | "learn"; articleId?: string; phase?: "reader" | "quiz" | "completion"; events: ReaderEvent[]; result?: QuizResult; startedAt?: number };

const localDate = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; };

export function LearnerApp({ initialState, storage }: { initialState: LearnerState; storage: Storage }) {
  const [state, setState] = useState(initialState);
  const [session, setSession] = useState<Session>({ screen: "home", events: [] });
  const articles = getPublishedArticles(storage);
  const destination: Destination = session.screen === "learn" ? "learn" : session.screen;
  const article = session.articleId ? articles.find((item) => item.id === session.articleId) : undefined;
  const start = (next: Article) => setSession({ screen: "learn", articleId: next.id, phase: "reader", events: [], startedAt: Date.now() });
  const navigate = (next: Destination) => setSession({ screen: next, events: [] });

  const completeQuiz = (result: QuizResult) => {
    if (!article) return;
    const now = new Date();
    const xp = result.correct === result.total ? 35 : 25;
    const next = recordAttempt(state, { id: `${article.id}-${now.toISOString()}`, articleId: article.id, completedAt: now.toISOString(), localDate: localDate(), correct: result.correct, total: result.total, hintsUsed: session.events.filter((event) => event.type === "word_open").length, durationSeconds: Math.max(1, Math.round((Date.now() - (session.startedAt ?? Date.now())) / 1000)), xpAwarded: xp });
    saveLearnerState(storage, next); setState(next); setSession((current) => ({ ...current, phase: "completion", result }));
  };

  return <AppShell active={destination} onNavigate={navigate}>
    {session.screen === "home" && <HomeScreen state={state} articles={articles} onStart={start} onExplore={() => setSession({ screen: "explore", events: [] })} />}
    {session.screen === "learn" && article && session.phase === "reader" && <ReaderScreen article={article} onBack={() => navigate("home")} onFinish={() => setSession((current) => ({ ...current, phase: "quiz" }))} onEvent={(event) => setSession((current) => ({ ...current, events: [...current.events, event] }))} />}
    {session.screen === "learn" && article && session.phase === "quiz" && <QuizScreen questions={article.quiz} onExit={() => navigate("home")} onComplete={completeQuiz} />}
    {session.screen === "learn" && article && session.phase === "completion" && session.result && <CompletionScreen article={article} result={session.result} state={state} onHome={() => navigate("home")} onNext={() => { const next = articles.find((item) => item.id === article.connectedArticleId); if (next) start(next); }} />}
    {session.screen === "explore" && <ExploreScreen articles={articles} initialDomain={null} onOpen={start} />}
    {session.screen === "profile" && <ProfileScreen state={state} onReset={() => { const reset = createDefaultLearnerState(); saveLearnerState(storage, reset); setState(reset); setSession({ screen: "home", events: [] }); }} />}
    {session.screen === "learn" && !article && <section><p className="eyebrow">Nonfiction Lab</p><h1>학습</h1><p>홈이나 탐험에서 읽을 지식을 선택해 주세요.</p></section>}
  </AppShell>;
}
