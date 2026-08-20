import type { LearnerState } from "./learner-store";

export type ActiveQuestProgress = {
  articleId: string;
  phase: "reader" | "quiz";
  pageIndex: number;
};

function assertPageIndex(pageIndex: number): void {
  if (!Number.isInteger(pageIndex) || pageIndex < 0) {
    throw new Error("Quest page index must be a non-negative integer.");
  }
}

export function setActiveQuest(state: LearnerState, articleId: string): LearnerState {
  return { ...state, activeQuest: { articleId, phase: "reader", pageIndex: 0 } };
}

export function advanceActiveQuest(state: LearnerState, progress: ActiveQuestProgress): LearnerState {
  assertPageIndex(progress.pageIndex);
  if (!state.activeQuest) throw new Error("Cannot advance without an active quest.");
  if (state.activeQuest.articleId !== progress.articleId) {
    throw new Error("Quest progress can only advance on the same article.");
  }
  return { ...state, activeQuest: progress };
}

export function clearActiveQuest(state: LearnerState): LearnerState {
  return { ...state, activeQuest: null };
}
