"use client";

import { useEffect, useState } from "react";
import { AppShell, type Destination } from "@/components/app-shell";
import { Onboarding } from "@/components/onboarding";
import { HomeScreen } from "@/components/home-screen";
import { ReaderScreen } from "@/components/reader-screen";
import { getArticleById, getPublishedArticles } from "@/lib/content";
import { loadLearnerState, saveLearnerState, type LearnerState } from "@/lib/learner-store";

export default function Page() {
  const [active, setActive] = useState<Destination>("home");
  const [state, setState] = useState<LearnerState | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  useEffect(() => setState(loadLearnerState(window.localStorage)), []);

  if (!state) return <div className="splash"><span className="brand">nonfiction<em>lab.</em></span></div>;
  if (!state.profile.onboardingComplete) {
    return <Onboarding onComplete={(profile) => {
      const next = { ...state, profile };
      saveLearnerState(window.localStorage, next);
      setState(next);
    }} />;
  }
  return (
    <AppShell active={active} onNavigate={setActive}>
      {active === "home" ? <HomeScreen state={state} articles={getPublishedArticles()} onStart={(article) => { setSelectedArticleId(article.id); setActive("learn"); }} onExplore={() => setActive("explore")} />
        : active === "learn" && selectedArticleId && getArticleById(selectedArticleId) ? <ReaderScreen article={getArticleById(selectedArticleId)!} onBack={() => setActive("home")} onFinish={() => setSelectedArticleId(null)} onEvent={() => {}} />
          : <section><p className="eyebrow">Nonfiction Lab</p><h1>{active === "explore" ? "지식 탐험" : active === "learn" ? "학습" : "나의 기록"}</h1><p>다음 단계에서 이 화면을 연결합니다.</p></section>}
    </AppShell>
  );
}
