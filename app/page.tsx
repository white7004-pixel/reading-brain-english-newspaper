"use client";

import { useEffect, useState } from "react";
import { AppShell, type Destination } from "@/components/app-shell";
import { Onboarding } from "@/components/onboarding";
import { loadLearnerState, saveLearnerState, type LearnerState } from "@/lib/learner-store";

export default function Page() {
  const [active, setActive] = useState<Destination>("home");
  const [state, setState] = useState<LearnerState | null>(null);

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
      <p className="eyebrow">Nonfiction Lab</p>
      <h1 className="brand">논픽션<em>랩.</em></h1>
      <p>매일 3분, 영어로 세상을 읽다</p>
    </AppShell>
  );
}
