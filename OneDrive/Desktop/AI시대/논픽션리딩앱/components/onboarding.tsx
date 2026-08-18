"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LevelCheck } from "./level-check";
import { createDefaultLearnerState, type LearnerLevel, type LearnerProfile } from "@/lib/learner-store";
import { DEFAULT_ESTIMATED_DIFFICULTY } from "@/lib/placement-test";
import type { KnowledgeDomain } from "@/lib/types";

type View = "welcome" | "enter" | "test";

const domains: Array<{ id: KnowledgeDomain; label: string }> = [
  { id: "science", label: "과학·우주" },
  { id: "history", label: "역사" },
  { id: "arts", label: "예술" },
  { id: "philosophy", label: "철학" },
  { id: "self-development", label: "자기계발" },
  { id: "world-culture", label: "세계문화" },
];

export function Onboarding({ onComplete }: { onComplete: (profile: LearnerProfile) => void }) {
  const [view, setView] = useState<View>("welcome");
  const [interests, setInterests] = useState<KnowledgeDomain[]>(["science", "world-culture", "arts"]);

  const complete = (level: LearnerLevel) => {
    const profile = createDefaultLearnerState().profile;
    onComplete({ ...profile, onboardingComplete: true, enteredAr: level.enteredAr, estimatedDifficulty: level.estimatedDifficulty, interests });
  };

  const toggleInterest = (domain: KnowledgeDomain) => {
    setInterests((current) => current.includes(domain)
      ? current.length === 1 ? current : current.filter((item) => item !== domain)
      : current.length < 4 ? [...current, domain] : current);
  };

  if (view !== "welcome") {
    return <LevelCheck initialMode={view} onSubmit={complete} onCancel={() => setView("welcome")} />;
  }

  return (
    <section className="onboarding">
      <div className="onboarding__brand"><span className="brand">nonfiction<em>lab.</em></span></div>
      <div className="onboarding__visual" aria-hidden="true"><span>✦</span><span>?</span><span>◌</span></div>
      <p className="eyebrow">3 MINUTES A DAY</p>
      <h1>영어로 읽을수록<br />세상이 넓어져요.</h1>
      <p className="support-copy">나에게 맞는 방법으로 시작하세요. 언제든 다시 설정할 수 있어요.</p>
      <div className="interest-box">
        <strong>관심 분야를 골라 주세요 <small>1~4개</small></strong>
        <div className="interest-grid">{domains.map((domain) => <button key={domain.id} type="button" className={interests.includes(domain.id) ? "is-selected" : ""} onClick={() => toggleInterest(domain.id)}>{domain.label}</button>)}</div>
      </div>
      <div className="start-options">
        <Button fullWidth onClick={() => setView("enter")}>내 AR 지수 입력</Button>
        <Button fullWidth variant="secondary" onClick={() => setView("test")}>3분 레벨 테스트</Button>
        <Button fullWidth variant="ghost" onClick={() => complete({ enteredAr: null, estimatedDifficulty: DEFAULT_ESTIMATED_DIFFICULTY })}>가장 쉬운 단계부터</Button>
      </div>
    </section>
  );
}
