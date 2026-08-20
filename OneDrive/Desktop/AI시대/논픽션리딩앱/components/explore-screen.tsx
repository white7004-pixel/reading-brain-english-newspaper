"use client";

import { useState } from "react";
import { KnowledgeRoadmap } from "@/components/knowledge-roadmap";
import { DOMAIN_LABELS } from "@/lib/sample-content";
import type { Article, KnowledgeDomain } from "@/lib/types";
import { ArticleHeroPhoto } from "./article-hero-photo";

type DifficultyRange = "all" | "0-2" | "2-4" | "4-6" | "6-20";
const domains = Object.keys(DOMAIN_LABELS) as KnowledgeDomain[];

export function filterArticles(articles: Article[], query: string, domain: KnowledgeDomain | null, range: DifficultyRange): Article[] {
  const [min, max] = range === "all" ? [0, 20] : range.split("-").map(Number);
  const normalized = query.trim().toLowerCase();
  return articles.filter((article) => (!domain || article.domain === domain) && article.difficulty.value >= min && article.difficulty.value <= max && (!normalized || `${article.title} ${article.titleKo} ${article.summaryKo}`.toLowerCase().includes(normalized)));
}

export function ExploreScreen({ articles, onOpen, initialDomain }: { articles: Article[]; onOpen: (article: Article) => void; initialDomain: KnowledgeDomain | null }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<KnowledgeDomain | null>(initialDomain);
  const [range, setRange] = useState<DifficultyRange>("all");
  const results = filterArticles(articles, query, domain, range);
  const reset = () => { setQuery(""); setDomain(null); setRange("all"); };
  return <section className="explore-screen">
    <KnowledgeRoadmap articles={articles} onOpen={onOpen} />
    <section className="knowledge-library" aria-labelledby="knowledge-library-heading">
      <p className="eyebrow">KNOWLEDGE LIBRARY</p><h1 id="knowledge-library-heading">무엇이 궁금한가요?</h1>
      <label className="search-field"><span className="sr-only">지식 검색</span><input aria-label="지식 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="주제나 제목을 검색해 보세요" /></label>
      <div className="filter-row"><button type="button" className={!domain ? "is-selected" : ""} onClick={() => setDomain(null)}>전체</button>{domains.map((item) => <button key={item} type="button" className={domain === item ? "is-selected" : ""} onClick={() => setDomain(item)}>{DOMAIN_LABELS[item]}</button>)}</div>
      <label className="select-label">읽기 난이도<select value={range} onChange={(event) => setRange(event.target.value as DifficultyRange)}><option value="all">전체 수준</option><option value="0-2">0.1–2.0</option><option value="2-4">2.0–4.0</option><option value="4-6">4.0–6.0</option><option value="6-20">6.0 이상</option></select></label>
      <div className="article-list">{results.map((article) => <button data-testid="article-card" type="button" key={article.id} onClick={() => onOpen(article)}><ArticleHeroPhoto heroImage={article.heroImage} visualTheme={article.visualTheme} variant="thumb"><span aria-hidden="true">✦</span></ArticleHeroPhoto><div><small>{DOMAIN_LABELS[article.domain]} · {article.difficulty.value.toFixed(1)} · 3분</small><strong>{article.title}</strong><span>{article.titleKo}</span></div></button>)}</div>
      {!results.length && <div className="empty-state"><strong>조건에 맞는 지식이 없어요.</strong><p>필터를 줄이거나 다른 검색어를 입력해 보세요.</p><button type="button" onClick={reset}>필터 초기화</button></div>}
    </section>
  </section>;
}
