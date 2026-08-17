"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import type { QuizQuestion } from "@/lib/types";

export type QuizResult = { correct: number; total: number; answers: number[] };

export function QuizScreen({ questions, onComplete, onExit }: { questions: QuizQuestion[]; onComplete: (result: QuizResult) => void; onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const question = questions[index];
  const isLast = index === questions.length - 1;

  return <section className="quiz-screen">
    <header className="reader-top"><button className="icon-button" type="button" aria-label="퀴즈 종료" onClick={onExit}>×</button><span>{index + 1} / {questions.length}</span><span>QUIZ</span></header>
    <ProgressBar value={index + 1} max={questions.length} label="퀴즈 진행률" />
    <p className="eyebrow">CHECK YOUR KNOWLEDGE</p><h1>{question.prompt}</h1>
    <div className="quiz-options">{question.options.map((option, optionIndex) => <button key={option} type="button" className={selected === optionIndex ? "is-selected" : ""} onClick={() => setSelected(optionIndex)}>{option}</button>)}</div>
    {selected !== null && <div className={`quiz-feedback ${selected === question.correctIndex ? "is-correct" : ""}`}><strong>{selected === question.correctIndex ? "좋아요!" : "다시 기억해 봐요."}</strong><p>{question.explanation}</p></div>}
    <div className="reader-action"><Button fullWidth disabled={selected === null} onClick={() => {
      const next = [...answers, selected as number];
      if (isLast) onComplete({ answers: next, total: questions.length, correct: next.filter((answer, answerIndex) => answer === questions[answerIndex].correctIndex).length });
      else { setAnswers(next); setSelected(null); setIndex((value) => value + 1); }
    }}>{isLast ? "결과 보기" : "다음 문제"}</Button></div>
  </section>;
}
