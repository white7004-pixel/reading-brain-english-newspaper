"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LevelCheck } from "./level-check";
import type { LearnerLevel, LearnerState } from "@/lib/learner-store";

export function ProfileScreen({ state, onReset, onLevelChange }: { state: LearnerState; onReset: () => void; onLevelChange: (level: LearnerLevel) => void }) {
  const [confirming, setConfirming] = useState(false);
  const [checkingLevel, setCheckingLevel] = useState(false);
  const average = state.attempts.length ? Math.round(state.attempts.reduce((sum, item) => sum + item.correct / item.total, 0) / state.attempts.length * 100) : 0;

  if (checkingLevel) {
    return <LevelCheck
      onSubmit={(level) => { onLevelChange(level); setCheckingLevel(false); }}
      onCancel={() => setCheckingLevel(false)}
    />;
  }

  return <section className="profile-screen">
    <header><div className="profile-avatar">N</div><div><p className="eyebrow">MY KNOWLEDGE</p><h1>{state.profile.name}</h1></div></header>
    <div className="profile-summary"><div><span>완료한 지식</span><strong>{state.completedArticleIds.length}개</strong></div><div><span>평균 이해도</span><strong>{average}%</strong></div><div><span>연속 학습</span><strong>{state.profile.streak}일</strong></div></div>
    <section className="level-card"><h2>나의 읽기 수준</h2><div><span>입력한 AR 지수</span><strong>{state.profile.enteredAr?.toFixed(1) ?? "—"}</strong></div><div><span>논픽션랩 추정 난이도</span><strong>{state.profile.estimatedDifficulty?.toFixed(1) ?? "—"}</strong></div><p>추정값은 공식 AR 인증 점수가 아니며, 학습 결과를 바탕으로 천천히 조절됩니다.</p><Button variant="ghost" fullWidth onClick={() => setCheckingLevel(true)}>레벨 다시 확인하기</Button></section>
    <section className="profile-card"><h2>학습 데이터</h2><p>이 기기에 저장된 진행 기록과 설정을 관리합니다.</p>{confirming ? <div className="confirm-box"><strong>정말 모든 기록을 삭제할까요?</strong><Button variant="secondary" onClick={onReset}>삭제하기</Button><Button variant="ghost" onClick={() => setConfirming(false)}>취소</Button></div> : <Button variant="ghost" fullWidth onClick={() => setConfirming(true)}>모든 학습 데이터 삭제</Button>}</section>
  </section>;
}
