"use client";

import { useState } from "react";
import {
  ELEMENTARY_GRADES,
  ROADMAP_DOMAIN_LABELS,
  roadmapForGrade,
  type ElementaryGrade,
  type RoadmapDomain,
} from "@/lib/knowledge-roadmap";
import type { Article } from "@/lib/types";

const domains = Object.keys(ROADMAP_DOMAIN_LABELS) as RoadmapDomain[];

export function KnowledgeRoadmap({ articles, onOpen }: { articles: Article[]; onOpen: (article: Article) => void }) {
  const [grade, setGrade] = useState<ElementaryGrade>(1);
  const topics = roadmapForGrade(grade);

  return (
    <section className="knowledge-roadmap" aria-labelledby="knowledge-roadmap-heading">
      <p className="eyebrow">ELEMENTARY ROADMAP</p>
      <h2 id="knowledge-roadmap-heading">학년별 논픽션 지식</h2>
      <p>학년마다 꼭 알아야 할 지식을 분야별로 차근차근 살펴보세요.</p>
      <div className="grade-tabs" role="tablist" aria-label="초등 학년 선택">
        {ELEMENTARY_GRADES.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={grade === item}
            className={grade === item ? "is-selected" : ""}
            onClick={() => setGrade(item)}
          >초{item}</button>
        ))}
      </div>
      <h3 className="roadmap-grade-heading">초등 {grade}학년</h3>
      {domains.map((domain) => (
        <section className="roadmap-domain" key={domain} aria-labelledby={`roadmap-${grade}-${domain}`}>
          <h4 id={`roadmap-${grade}-${domain}`}>{ROADMAP_DOMAIN_LABELS[domain]}</h4>
          <div className="roadmap-topic-grid">
            {topics.filter((item) => item.domain === domain).map((item) => {
              const article = item.articleId ? articles.find((candidate) => candidate.id === item.articleId) : undefined;
              return (
                <article className="roadmap-topic" data-testid="roadmap-topic" key={item.id}>
                  <div className="roadmap-topic__meta"><span>초등 {item.grade}학년</span><span>AR {item.arMin.toFixed(1)}–{item.arMax.toFixed(1)}</span></div>
                  <h5>{item.titleKo}</h5>
                  <p>{item.goal}</p>
                  {article
                    ? <button type="button" aria-label={`${item.titleKo} 읽기 시작`} onClick={() => onOpen(article)}>읽기 시작</button>
                    : <span className="roadmap-topic__status" aria-label={`${item.titleKo} 준비 중`}>준비 중</span>}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
