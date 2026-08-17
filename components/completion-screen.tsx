"use client";

import { Button } from "./ui/button";
import type { Article } from "@/lib/types";
import type { LearnerState } from "@/lib/learner-store";
import type { QuizResult } from "./quiz-screen";

export function CompletionScreen({ article, result, state, onNext, onHome }: { article: Article; result: QuizResult; state: LearnerState; onNext: () => void; onHome: () => void }) {
  const score = Math.round(result.correct / result.total * 100);
  const earned = result.correct === result.total ? 35 : 25;
  return <section className="completion-screen">
    <div className="completion-check" aria-hidden="true">✓</div><p className="eyebrow">TODAY COMPLETE</p><h1>새로운 지식 발견!</h1><p>{article.titleKo} 주제를 영어로 설명할 수 있어요.</p>
    <div className="completion-stats"><div><span>이해도</span><strong>{score}%</strong></div><div><span>획득 XP</span><strong>+{earned}</strong></div><div><span>새 단어</span><strong>{article.vocabulary.length}</strong></div><div><span>연속 학습</span><strong>{state.profile.streak}일</strong></div></div>
    <div className="next-topic"><strong>지식 연결 추천</strong><p>오늘의 주제와 연결된 새로운 글을 만나보세요.</p></div>
    <Button fullWidth onClick={onNext}>다음 지식 탐험하기</Button><Button fullWidth variant="ghost" onClick={onHome}>오늘은 여기까지</Button>
  </section>;
}
