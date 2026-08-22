"use client";

import { QuestResultScreen } from "./quest-result-screen";
import type { LearnerState } from "@/lib/learner-store";
import type { QuestReward } from "@/lib/quest-rewards";
import type { Article } from "@/lib/types";
import type { QuizResult } from "./quiz-screen";

/** @deprecated Use QuestResultScreen with the reward calculated by LearnerApp. */
export function CompletionScreen({ article, state, reward, onNext, onHome }: {
  article: Article;
  result: QuizResult;
  state: LearnerState;
  reward?: QuestReward;
  onNext?: () => void;
  onHome: () => void;
}) {
  if (!reward) return <section className="completion-screen"><h1>퀘스트를 마쳤어요!</h1><button type="button" onClick={onHome}>오늘로 돌아가기</button></section>;
  return <QuestResultScreen article={article} reward={reward} state={state} onOpenMap={onNext ?? onHome} onHome={onHome} />;
}
