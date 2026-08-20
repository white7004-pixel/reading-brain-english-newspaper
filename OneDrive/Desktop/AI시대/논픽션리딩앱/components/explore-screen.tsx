"use client";

import { useState } from "react";
import { KnowledgeRoadmap } from "@/components/knowledge-roadmap";
import { ArticleHeroPhoto } from "./article-hero-photo";
import { DOMAIN_LABELS } from "@/lib/sample-content";
import { evaluateQuestReadiness } from "@/lib/quest-readiness";
import type { Article, KnowledgeDomain } from "@/lib/types";

type DifficultyRange = "all" | "0-2" | "2-4" | "4-6" | "6-20";
type ReadingTime = "all" | "3" | "4-5" | "6";
type Readiness = "all" | "ready" | "needs-review" | "legacy";
const domains = Object.keys(DOMAIN_LABELS) as KnowledgeDomain[];

export function filterArticles(
  articles: Article[],
  query: string,
  domain: KnowledgeDomain | null,
  range: DifficultyRange,
  collectionId = "all",
  readingTime: ReadingTime = "all",
  readiness: Readiness = "all",
): Article[] {
  const [min, max] = range === "all" ? [0, 20] : range.split("-").map(Number);
  const normalized = query.trim().toLowerCase();

  return articles.filter((article) => {
    if (article.status !== "published") return false;
    if (domain && article.domain !== domain) return false;
    if (article.difficulty.value < min || article.difficulty.value > max) return false;
    if (normalized && !`${article.title} ${article.titleKo} ${article.summaryKo}`.toLowerCase().includes(normalized)) return false;
    if (collectionId !== "all" && article.quest?.collectionId !== collectionId) return false;
    if (readingTime === "3" && article.estimatedMinutes > 3) return false;
    if (readingTime === "4-5" && (article.estimatedMinutes < 4 || article.estimatedMinutes > 5)) return false;
    if (readingTime === "6" && article.estimatedMinutes < 6) return false;
    if (readiness === "legacy") return !article.quest;
    if (readiness === "ready") return Boolean(article.quest && evaluateQuestReadiness(article).ready);
    if (readiness === "needs-review") return Boolean(article.quest && !evaluateQuestReadiness(article).ready);
    return true;
  });
}

function ArticleCards({ articles, onOpen }: { articles: Article[]; onOpen: (article: Article) => void }) {
  return <div className="article-list">{articles.map((article) => (
    <button data-testid="article-card" type="button" key={article.id} onClick={() => onOpen(article)}>
      <ArticleHeroPhoto heroImage={article.heroImage} visualTheme={article.visualTheme} variant="thumb"><span aria-hidden="true">✦</span></ArticleHeroPhoto>
      <div><small>{DOMAIN_LABELS[article.domain]} · AR {article.difficulty.value.toFixed(1)} · {article.estimatedMinutes}분</small><strong>{article.title}</strong><span>{article.titleKo}</span></div>
    </button>
  ))}</div>;
}

export function ExploreScreen({ articles, onOpen, initialDomain }: { articles: Article[]; onOpen: (article: Article) => void; initialDomain: KnowledgeDomain | null }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<KnowledgeDomain | null>(initialDomain);
  const [range, setRange] = useState<DifficultyRange>("all");
  const [collectionId, setCollectionId] = useState("all");
  const [readingTime, setReadingTime] = useState<ReadingTime>("all");
  const [readiness, setReadiness] = useState<Readiness>("all");
  const publishedArticles = articles.filter((article) => article.status === "published");
  const collections = [...new Set(publishedArticles.flatMap((article) => article.quest ? [article.quest.collectionId] : []))].sort();
  const results = filterArticles(publishedArticles, query, domain, range, collectionId, readingTime, readiness);
  const questResults = results.filter((article) => article.quest);
  const legacyResults = results.filter((article) => !article.quest);
  const reset = () => {
    setQuery("");
    setDomain(null);
    setRange("all");
    setCollectionId("all");
    setReadingTime("all");
    setReadiness("all");
  };

  return <section className="explore-screen">
    <KnowledgeRoadmap articles={publishedArticles} onOpen={onOpen} />
    <section className="knowledge-library" aria-labelledby="knowledge-library-heading">
      <p className="eyebrow">KNOWLEDGE LIBRARY</p><h1 id="knowledge-library-heading">무엇이 궁금한가요?</h1>
      <label className="search-field"><span className="sr-only">지식 검색</span><input aria-label="지식 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="주제나 제목을 검색해 보세요" /></label>
      <div className="filter-row"><button type="button" className={!domain ? "is-selected" : ""} onClick={() => setDomain(null)}>전체</button>{domains.map((item) => <button key={item} type="button" className={domain === item ? "is-selected" : ""} onClick={() => setDomain(item)}>{DOMAIN_LABELS[item]}</button>)}</div>
      <div className="explore-selects">
        <label className="select-label">읽기 난이도<select value={range} onChange={(event) => setRange(event.target.value as DifficultyRange)}><option value="all">전체 수준</option><option value="0-2">0.1–2.0</option><option value="2-4">2.0–4.0</option><option value="4-6">4.0–6.0</option><option value="6-20">6.0 이상</option></select></label>
        <label className="select-label">컬렉션<select aria-label="컬렉션" value={collectionId} onChange={(event) => setCollectionId(event.target.value)}><option value="all">모든 컬렉션</option>{collections.map((collection) => <option key={collection} value={collection}>{collection}</option>)}</select></label>
        <label className="select-label">읽기 시간<select aria-label="읽기 시간" value={readingTime} onChange={(event) => setReadingTime(event.target.value as ReadingTime)}><option value="all">모든 시간</option><option value="3">3분 이하</option><option value="4-5">4–5분</option><option value="6">6분 이상</option></select></label>
        <label className="select-label">퀘스트 상태<select aria-label="퀘스트 상태" value={readiness} onChange={(event) => setReadiness(event.target.value as Readiness)}><option value="all">모든 콘텐츠</option><option value="ready">준비된 퀘스트</option><option value="needs-review">준비 중인 퀘스트</option><option value="legacy">기존 라이브러리</option></select></label>
      </div>
      {questResults.length > 0 && <section className="explore-group" aria-labelledby="quest-library-heading"><h2 id="quest-library-heading">지식 퀘스트</h2><ArticleCards articles={questResults} onOpen={onOpen} /></section>}
      {legacyResults.length > 0 && <section className="explore-group" aria-labelledby="legacy-library-heading"><h2 id="legacy-library-heading">기존 라이브러리</h2><p>새로운 퀘스트 형식으로 바뀌기 전의 읽을거리도 계속 탐색할 수 있어요.</p><ArticleCards articles={legacyResults} onOpen={onOpen} /></section>}
      {!results.length && <div className="empty-state"><strong>조건에 맞는 지식이 없어요.</strong><p>필터를 줄이거나 다른 검색어를 입력해 보세요.</p><button type="button" onClick={reset}>필터 초기화</button></div>}
    </section>
  </section>;
}
