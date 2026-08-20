"use client";

import { TodayScreen } from "./today-screen";
import type { LearnerState } from "@/lib/learner-store";
import type { Article, KnowledgeDomain } from "@/lib/types";

/** @deprecated Use TodayScreen for the learner's primary destination. */
export function HomeScreen({ state, articles, onStart, onExplore, onOpenMap = () => {} }: {
  state: LearnerState;
  articles: Article[];
  onStart: (article: Article) => void;
  onExplore: (domain?: KnowledgeDomain) => void;
  onOpenMap?: () => void;
}) {
  return <TodayScreen state={state} articles={articles} onStart={onStart} onOpenMap={onOpenMap} onExplore={() => onExplore()} />;
}
