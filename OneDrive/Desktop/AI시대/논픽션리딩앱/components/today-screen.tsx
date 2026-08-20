"use client";

import { ArticleHeroPhoto } from "./article-hero-photo";
import { Button } from "./ui/button";
import { Chip } from "./ui/chip";
import { DOMAIN_LABELS } from "@/lib/sample-content";
import { buildKnowledgeMap } from "@/lib/knowledge-quest-map";
import { rankArticles } from "@/lib/recommendation";
import type { LearnerState } from "@/lib/learner-store";
import type { Article } from "@/lib/types";

type TodayScreenProps = {
  state: LearnerState;
  articles: Article[];
  onStart: (article: Article) => void;
  onOpenMap: () => void;
  onExplore: () => void;
};

function mapCompletionLabel(articles: Article[], completedArticleIds: string[]): string {
  const nodes = buildKnowledgeMap(articles, completedArticleIds);
  const percent = nodes.length === 0 ? 0 : Math.round((nodes.filter((node) => node.state === "completed").length / nodes.length) * 100);
  return `지식 지도 ${percent}% 완성`;
}

export function TodayScreen({ state, articles, onStart, onOpenMap, onExplore }: TodayScreenProps) {
  const learnerArticles = articles.filter((article) => article.status === "published");
  const ranked = rankArticles(learnerArticles, state, new Date().getDate());
  const resumedArticle = state.activeQuest
    ? learnerArticles.find((article) => article.id === state.activeQuest?.articleId)
    : undefined;
  const daily = resumedArticle ?? ranked[0];
  const completionLabel = mapCompletionLabel(learnerArticles, state.completedArticleIds);

  if (!daily) {
    return (
      <section className="today-screen today-screen--empty">
        <p className="eyebrow">KNOWLEDGE QUEST</p>
        <h1>오늘의 발견을 준비하고 있어요</h1>
        <p>새로운 읽을거리가 공개되면 여기에서 바로 시작할 수 있어요.</p>
        <Button fullWidth onClick={onExplore}>탐색으로 이동</Button>
      </section>
    );
  }

  const isResuming = Boolean(resumedArticle);
  const difficulty = state.profile.estimatedDifficulty ?? state.profile.enteredAr ?? daily.difficulty.value;

  return (
    <section className="today-screen">
      <header className="today-header">
        <span className="brand">nonfiction<em>lab.</em></span>
        <button type="button" className="avatar" aria-label="내 프로필">{state.profile.name.slice(0, 1)}</button>
      </header>
      <p className="today-hello">좋은 하루예요, {state.profile.name}!</p>
      <h1>{isResuming ? "멈춘 곳에서\n다시 이어가 볼까요?" : "오늘의 발견을\n시작해 볼까요?"}</h1>
      <div className="metric-row" aria-label="학습 현황">
        <Chip>🔥 {state.profile.streak}일 연속</Chip>
        <Chip>AR {difficulty.toFixed(1)}</Chip>
        <Chip>✦ {state.profile.xp} XP</Chip>
      </div>
      <ArticleHeroPhoto heroImage={daily.heroImage} visualTheme={daily.visualTheme} variant="home">
        <p>{isResuming ? "RESUME YOUR QUEST" : "TODAY'S KNOWLEDGE QUEST"}</p>
        <h2>{daily.title}</h2>
        <span>{DOMAIN_LABELS[daily.domain]} · AR {daily.difficulty.value.toFixed(1)} · 약 {daily.estimatedMinutes}분</span>
      </ArticleHeroPhoto>
      <Button fullWidth className="today-primary-action" onClick={() => onStart(daily)}>{isResuming ? "이어서 읽기" : "오늘의 발견 시작하기"}</Button>
      <div className="today-progress-card">
        <div>
          <p>KNOWLEDGE MAP</p>
          <strong>{completionLabel}</strong>
        </div>
        <button type="button" onClick={onOpenMap}>지식 지도 열기</button>
      </div>
      <div className="today-secondary-actions">
        <div>
          <p className="eyebrow">MORE TO DISCOVER</p>
          <h2>다른 주제도 살펴보세요</h2>
        </div>
        <button type="button" onClick={onExplore}>탐색하기</button>
      </div>
      <div className="today-recommendations" aria-label="다음 추천">
        {ranked.filter((article) => article.id !== daily.id).slice(0, 2).map((article) => (
          <article key={article.id}>
            <small>{DOMAIN_LABELS[article.domain]} · AR {article.difficulty.value.toFixed(1)}</small>
            <strong>{article.title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
