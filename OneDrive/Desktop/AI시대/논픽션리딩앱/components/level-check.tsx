"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import { AR_ENTRY_MAX, AR_ENTRY_MIN, PLACEMENT_QUESTIONS, estimateDifficulty, isValidArEntry } from "@/lib/placement-test";
import type { LearnerLevel } from "@/lib/learner-store";

export type LevelCheckMode = "choose" | "enter" | "test";

export function LevelCheck({
  onSubmit,
  onCancel,
  initialMode = "choose",
}: {
  onSubmit: (level: LearnerLevel) => void;
  onCancel: () => void;
  initialMode?: LevelCheckMode;
}) {
  const [mode, setMode] = useState<LevelCheckMode | "result">(initialMode);
  const [arValue, setArValue] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const back = () => {
    if (initialMode !== "choose") {
      onCancel();
      return;
    }
    setMode("choose");
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  if (mode === "enter") {
    const numeric = Number(arValue);
    const valid = arValue.trim() !== "" && isValidArEntry(numeric);
    return (
      <section className="onboarding onboarding--form">
        <button className="icon-button" type="button" aria-label="이전" onClick={back}>←</button>
        <p className="eyebrow">MY READING LEVEL</p>
        <h1>알고 있는 AR 지수를<br />입력해 주세요.</h1>
        <p className="support-copy">학교나 학원에서 받은 값을 입력하면 바로 맞춤 글을 추천해 드려요.</p>
        <label className="field-label" htmlFor="ar-value">AR 지수</label>
        <input id="ar-value" className="text-input" inputMode="decimal" value={arValue} onChange={(event) => setArValue(event.target.value)} placeholder="예: 2.4" />
        <p className="field-help">{AR_ENTRY_MIN.toFixed(1)}에서 {AR_ENTRY_MAX.toFixed(1)} 사이의 값을 입력할 수 있어요.</p>
        <Button fullWidth disabled={!valid} onClick={() => onSubmit({ enteredAr: numeric, estimatedDifficulty: null })}>이 수준으로 시작</Button>
      </section>
    );
  }

  if (mode === "test") {
    const question = PLACEMENT_QUESTIONS[questionIndex];
    const isLast = questionIndex === PLACEMENT_QUESTIONS.length - 1;
    return (
      <section className="onboarding onboarding--form">
        <div className="test-top"><button className="icon-button" type="button" aria-label="테스트 나가기" onClick={back}>×</button><span>{questionIndex + 1} / {PLACEMENT_QUESTIONS.length}</span></div>
        <ProgressBar value={questionIndex + 1} max={PLACEMENT_QUESTIONS.length} label="레벨 테스트 진행률" />
        <p className="eyebrow">3-MIN LEVEL CHECK</p>
        <h1 className="question-title">{question.prompt}</h1>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button key={option} type="button" aria-label={`선택지 ${index + 1}: ${option}`} className={`answer-option ${selectedAnswer === index ? "is-selected" : ""}`} onClick={() => setSelectedAnswer(index)}>{option}</button>
          ))}
        </div>
        <Button fullWidth disabled={selectedAnswer === null} onClick={() => {
          setAnswers((current) => [...current, selectedAnswer as number]);
          setSelectedAnswer(null);
          if (isLast) setMode("result"); else setQuestionIndex((index) => index + 1);
        }}>{isLast ? "결과 보기" : "다음 문제"}</Button>
      </section>
    );
  }

  if (mode === "result") {
    const estimated = estimateDifficulty(answers);
    return (
      <section className="onboarding onboarding--center">
        <div className="level-orb">{estimated.toFixed(1)}</div>
        <p className="eyebrow">LEVEL CHECK COMPLETE</p>
        <h1>논픽션랩 추정 난이도<br />{estimated.toFixed(1)}</h1>
        <p className="support-copy">공식 AR 인증 점수가 아닌 맞춤 콘텐츠 추천용 추정값이에요. 학습 결과에 따라 천천히 조절됩니다.</p>
        <Button fullWidth onClick={() => onSubmit({ enteredAr: null, estimatedDifficulty: estimated })}>추천 수준으로 시작</Button>
      </section>
    );
  }

  return (
    <section className="onboarding onboarding--form">
      <p className="eyebrow">MY READING LEVEL</p>
      <h1>읽기 수준을<br />어떻게 정할까요?</h1>
      <p className="support-copy">지금까지의 학습 기록은 그대로 유지돼요.</p>
      <div className="start-options">
        <Button fullWidth onClick={() => setMode("enter")}>내 AR 지수 입력</Button>
        <Button fullWidth variant="secondary" onClick={() => setMode("test")}>3분 레벨 테스트</Button>
        <Button fullWidth variant="ghost" onClick={onCancel}>돌아가기</Button>
      </div>
    </section>
  );
}
