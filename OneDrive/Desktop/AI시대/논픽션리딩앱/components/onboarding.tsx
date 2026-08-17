"use client";

import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import { createDefaultLearnerState, type LearnerProfile } from "@/lib/learner-store";
import type { KnowledgeDomain } from "@/lib/types";

type View = "welcome" | "enter" | "test" | "result";

const domains: Array<{ id: KnowledgeDomain; label: string }> = [
  { id: "science", label: "과학·우주" },
  { id: "history", label: "역사" },
  { id: "arts", label: "예술" },
  { id: "philosophy", label: "철학" },
  { id: "self-development", label: "자기계발" },
  { id: "world-culture", label: "세계문화" },
];

const questions = [
  { prompt: "A bird can ___.", options: ["fly", "table", "blue"], correct: 0, level: 0.8 },
  { prompt: "Plants need sunlight to ___.", options: ["grow", "sleep", "write"], correct: 0, level: 1.5 },
  { prompt: "The word ‘ancient’ means ___.", options: ["very old", "very loud", "very fast"], correct: 0, level: 2.3 },
  { prompt: "A habitat is the place where an animal ___.", options: ["lives", "counts", "paints"], correct: 0, level: 3.2 },
  { prompt: "Evidence helps a reader ___.", options: ["support an idea", "erase a page", "avoid a topic"], correct: 0, level: 4.3 },
  { prompt: "A consequence is most similar to a ___.", options: ["result", "question", "material"], correct: 0, level: 5.4 },
];

export function Onboarding({ onComplete }: { onComplete: (profile: LearnerProfile) => void }) {
  const [view, setView] = useState<View>("welcome");
  const [arValue, setArValue] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [interests, setInterests] = useState<KnowledgeDomain[]>(["science", "world-culture", "arts"]);

  const estimatedDifficulty = useMemo(() => {
    const passed = questions.filter((question, index) => answers[index] === question.correct);
    return passed.length ? passed[passed.length - 1].level : 0.5;
  }, [answers]);

  const complete = (enteredAr: number | null, estimate: number | null) => {
    const profile = createDefaultLearnerState().profile;
    onComplete({ ...profile, onboardingComplete: true, enteredAr, estimatedDifficulty: estimate, interests });
  };

  const toggleInterest = (domain: KnowledgeDomain) => {
    setInterests((current) => current.includes(domain)
      ? current.length === 1 ? current : current.filter((item) => item !== domain)
      : current.length < 4 ? [...current, domain] : current);
  };

  if (view === "enter") {
    const numeric = Number(arValue);
    const valid = arValue !== "" && numeric >= 0.1 && numeric <= 20;
    return (
      <section className="onboarding onboarding--form">
        <button className="icon-button" type="button" aria-label="이전" onClick={() => setView("welcome")}>←</button>
        <p className="eyebrow">MY READING LEVEL</p>
        <h1>알고 있는 AR 지수를<br />입력해 주세요.</h1>
        <p className="support-copy">학교나 학원에서 받은 값을 입력하면 바로 맞춤 글을 추천해 드려요.</p>
        <label className="field-label" htmlFor="ar-value">AR 지수</label>
        <input id="ar-value" className="text-input" inputMode="decimal" value={arValue} onChange={(event) => setArValue(event.target.value)} placeholder="예: 2.4" />
        <p className="field-help">0.1에서 20.0 사이의 값을 입력할 수 있어요.</p>
        <Button fullWidth disabled={!valid} onClick={() => complete(numeric, null)}>이 수준으로 시작</Button>
      </section>
    );
  }

  if (view === "test") {
    const question = questions[questionIndex];
    const isLast = questionIndex === questions.length - 1;
    return (
      <section className="onboarding onboarding--form">
        <div className="test-top"><button className="icon-button" type="button" aria-label="테스트 나가기" onClick={() => setView("welcome")}>×</button><span>{questionIndex + 1} / {questions.length}</span></div>
        <ProgressBar value={questionIndex + 1} max={questions.length} label="레벨 테스트 진행률" />
        <p className="eyebrow">3-MIN LEVEL CHECK</p>
        <h1 className="question-title">{question.prompt}</h1>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button key={option} type="button" aria-label={`선택지 ${index + 1}: ${option}`} className={`answer-option ${selectedAnswer === index ? "is-selected" : ""}`} onClick={() => setSelectedAnswer(index)}>{option}</button>
          ))}
        </div>
        <Button fullWidth disabled={selectedAnswer === null} onClick={() => {
          const next = [...answers, selectedAnswer as number];
          setAnswers(next);
          setSelectedAnswer(null);
          if (isLast) setView("result"); else setQuestionIndex((index) => index + 1);
        }}>{isLast ? "결과 보기" : "다음 문제"}</Button>
      </section>
    );
  }

  if (view === "result") {
    return (
      <section className="onboarding onboarding--center">
        <div className="level-orb">{estimatedDifficulty.toFixed(1)}</div>
        <p className="eyebrow">LEVEL CHECK COMPLETE</p>
        <h1>논픽션랩 추정 난이도<br />{estimatedDifficulty.toFixed(1)}</h1>
        <p className="support-copy">공식 AR 인증 점수가 아닌 맞춤 콘텐츠 추천용 추정값이에요. 학습 결과에 따라 천천히 조절됩니다.</p>
        <Button fullWidth onClick={() => complete(null, estimatedDifficulty)}>추천 수준으로 시작</Button>
      </section>
    );
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
        <Button fullWidth variant="ghost" onClick={() => complete(null, 0.5)}>가장 쉬운 단계부터</Button>
      </div>
    </section>
  );
}
