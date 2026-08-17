"use client";

import { useState } from "react";
import { AppShell, type Destination } from "./app-shell";
import { HomeScreen } from "./home-screen";
import { ReaderScreen, type ReaderEvent } from "./reader-screen";
import { QuizScreen, type QuizResult } from "./quiz-screen";
import { CompletionScreen } from "./completion-screen";
import { getArticleById, getPublishedArticles } from "@/lib/content";
import { recordAttempt, saveLearnerState, type LearnerState } from "@/lib/learner-store";
import type { Article } from "@/lib/types";

type Session = { screen: "home" | "explore" | "profile" | "learn"; articleId?: string; phase?: "reader" | "quiz" | "completion"; events: ReaderEvent[]; result?: QuizResult; startedAt?: number };

const localDate = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; };

export function LearnerApp({ initialState, storage }: { initialState: LearnerState; storage: Storage }) {
  const [state, setState] = useState(initialState);
  const [session, setSession] = useState<Session>({ screen: "home", events: [] });
  const destination: Destination = session.screen === "learn" ? "learn" : session.screen;
  const article = session.articleId ? getArticleById(session.articleId) : undefined;
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
    {session.screen === "home" && <HomeScreen state={state} articles={getPublishedArticles()} onStart={start} onExplore={() => setSession({ screen: "explore", events: [] })} />}
    {session.screen === "learn" && article && session.phase === "reader" && <ReaderScreen article={article} onBack={() => navigate("home")} onFinish={() => setSession((current) => ({ ...current, phase: "quiz" }))} onEvent={(event) => setSession((current) => ({ ...current, events: [...current.events, event] }))} />}
    {session.screen === "learn" && article && session.phase === "quiz" && <QuizScreen questions={article.quiz} onExit={() => navigate("home")} onComplete={completeQuiz} />}
    {session.screen === "learn" && article && session.phase === "completion" && session.result && <CompletionScreen article={article} result={session.result} state={state} onHome={() => navigate("home")} onNext={() => { const next = getArticleById(article.connectedArticleId); if (next) start(next); }} />}
    {(session.screen === "explore" || session.screen === "profile" || (session.screen === "learn" && !article)) && <section><p className="eyebrow">Nonfiction Lab</p><h1>{session.screen === "explore" ? "지식 탐험" : session.screen === "profile" ? "나의 기록" : "학습"}</h1><p>다음 단계에서 이 화면을 연결합니다.</p></section>}
  </AppShell>;
}
