"use client";

import { KnowledgeCard } from "./knowledge-card";
import { Button } from "./ui/button";
import type { LearnerState } from "@/lib/learner-store";
import type { QuestReward } from "@/lib/quest-rewards";
import type { Article } from "@/lib/types";

export function QuestResultScreen({ article, reward, state, onOpenMap, onHome }: {
  article: Article;
  reward: QuestReward;
  state: LearnerState;
  onOpenMap: () => void;
  onHome: () => void;
}) {
  return (
    <section className="quest-result-screen completion-screen" aria-labelledby="quest-result-heading">
      <div className="completion-check" aria-hidden="true">✓</div>
      <p className="eyebrow">QUEST COMPLETE</p>
      <h1 id="quest-result-heading">새로운 지식을 발견했어요!</h1>
      <p className="quest-result-screen__mastery" role="status" aria-live="polite">{reward.masteryLabelKo}</p>
      <div className="quest-result-screen__stats" aria-label="퀘스트 결과">
        <div><span>획득 XP</span><strong>+{reward.xp}</strong></div>
        <div><span>퀴즈 정확도</span><strong>정답률 {reward.accuracyPercent}%</strong></div>
        <div><span>연속 학습</span><strong>{state.profile.streak}일</strong></div>
      </div>
      <KnowledgeCard article={article} />
      <div className="quest-result-screen__actions">
        <Button fullWidth onClick={onOpenMap}>지식 지도에서 확인</Button>
        <Button fullWidth variant="ghost" onClick={onHome}>오늘로 돌아가기</Button>
      </div>
    </section>
  );
}
