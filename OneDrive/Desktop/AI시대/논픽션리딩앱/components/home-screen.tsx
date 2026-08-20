"use client";

import { Button } from "./ui/button";
import { Chip } from "./ui/chip";
import { DOMAIN_LABELS } from "@/lib/sample-content";
import { rankArticles } from "@/lib/recommendation";
import type { LearnerState } from "@/lib/learner-store";
import type { Article, KnowledgeDomain } from "@/lib/types";
import { ArticleHeroPhoto } from "./article-hero-photo";

const domainIcons: Record<KnowledgeDomain, string> = { science: "✦", history: "⌛", arts: "◒", philosophy: "?", "self-development": "↗", "world-culture": "◎" };

export function HomeScreen({ state, articles, onStart, onExplore }: { state: LearnerState; articles: Article[]; onStart: (article: Article) => void; onExplore: (domain?: KnowledgeDomain) => void }) {
  const ranked = rankArticles(articles, state, new Date().getDate());
  const daily = ranked[0];
  const difficulty = state.profile.estimatedDifficulty ?? state.profile.enteredAr ?? 0.5;
  const levelLabel = state.profile.estimatedDifficulty !== null ? `논픽션랩 추정 난이도 ${difficulty.toFixed(1)}` : `입력한 AR 지수 ${difficulty.toFixed(1)}`;

  if (!daily) return <section><h1>오늘의 글을 준비하고 있어요.</h1></section>;

  return (
    <section className="home-screen">
      <header className="home-header"><span className="brand">nonfiction<em>lab.</em></span><button type="button" className="avatar" aria-label="내 프로필">N</button></header>
      <p className="home-hello">좋은 하루예요, {state.profile.name}!</p>
      <h1>오늘도 세상을<br />하나 더 알아볼까요?</h1>
      <div className="metric-row"><Chip>🔥 {state.profile.streak}일 연속</Chip><Chip>{levelLabel}</Chip><Chip>⚡ {state.profile.xp} XP</Chip></div>
      <ArticleHeroPhoto heroImage={daily.heroImage} visualTheme={daily.visualTheme} variant="home">
        <p>TODAY&apos;S 3-MIN READ</p><div className="daily-card__spark" aria-hidden="true">✦</div>
        <h2>{daily.title}</h2><span>{DOMAIN_LABELS[daily.domain]} · {daily.difficulty.value.toFixed(1)} · 약 3분</span>
      </ArticleHeroPhoto>
      <Button fullWidth onClick={() => onStart(daily)}>오늘의 지식 시작하기</Button>
      <div className="section-heading"><h2>관심 분야 탐험</h2><button type="button" onClick={() => onExplore()}>전체보기</button></div>
      <div className="domain-grid">{state.profile.interests.slice(0, 4).map((domain) => <button key={domain} type="button" onClick={() => onExplore(domain)}><span aria-hidden="true">{domainIcons[domain]}</span>{DOMAIN_LABELS[domain]}</button>)}</div>
      <div className="section-heading"><h2>새로운 분야 발견</h2><span>30% 확장 추천</span></div>
      <div className="mini-cards">{ranked.slice(1, 3).map((article) => <button key={article.id} type="button" onClick={() => onStart(article)}><small>{DOMAIN_LABELS[article.domain]} · {article.difficulty.value.toFixed(1)}</small><strong>{article.title}</strong></button>)}</div>
    </section>
  );
}
