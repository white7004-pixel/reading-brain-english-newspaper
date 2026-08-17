"use client";

import { useEffect, useState } from "react";
import { Onboarding } from "@/components/onboarding";
import { LearnerApp } from "@/components/learner-app";
import { loadLearnerState, saveLearnerState, type LearnerState } from "@/lib/learner-store";

export default function Page() {
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
  return <LearnerApp initialState={state} storage={window.localStorage} />;
}
