"use client";

import { useState } from "react";
import {
  ROADMAP_DOMAIN_LABELS,
  roadmapForGrade,
  type ElementaryGrade,
  type RoadmapDomain,
} from "@/lib/knowledge-roadmap";
import type { Article } from "@/lib/types";
import { GRADE_GROUPS, gradeLabel, type GradeLevel } from "@/lib/grade-levels";

const domains = Object.keys(ROADMAP_DOMAIN_LABELS) as RoadmapDomain[];
const fullGradeLabel = (level: GradeLevel) => {
  const [school, year] = level.split("-");
  const schoolLabel = school === "elementary" ? "초등" : school === "middle" ? "중등" : "고등";
  return `${schoolLabel} ${year}학년`;
};

export function KnowledgeRoadmap({ articles, onOpen }: { articles: Article[]; onOpen: (article: Article) => void }) {
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>("elementary-1");
  const elementaryGrade = gradeLevel.startsWith("elementary-")
    ? Number(gradeLevel.split("-")[1]) as ElementaryGrade
    : null;
  const topics = elementaryGrade ? roadmapForGrade(elementaryGrade) : [];
  const stages = [...new Map(topics.map((item) => [`${item.arMin}-${item.arMax}`, { arMin: item.arMin, arMax: item.arMax }])).values()];

  return (
    <section className="knowledge-roadmap" aria-labelledby="knowledge-roadmap-heading">
      <p className="eyebrow">ELEMENTARY ROADMAP</p>
      <h2 id="knowledge-roadmap-heading">학년별 논픽션 지식</h2>
      <p>학년마다 꼭 알아야 할 지식을 분야별로 차근차근 살펴보세요.</p>
      {GRADE_GROUPS.map((group) => <div className="grade-tabs" role="tablist" aria-label={`${group.label} 학년 선택`} key={group.id}>
        {group.grades.map((item) => <button key={item} type="button" role="tab" aria-selected={gradeLevel === item} className={gradeLevel === item ? "is-selected" : ""} onClick={() => setGradeLevel(item)}>{gradeLabel(item)}</button>)}
      </div>)}
      <h3 className="roadmap-grade-heading">{fullGradeLabel(gradeLevel)}</h3>
      {!elementaryGrade ? <div className="roadmap-empty"><strong>{fullGradeLabel(gradeLevel)} 콘텐츠 준비 중</strong><p>콘텐츠를 추가하면 이곳에 학습 경로가 자동으로 표시됩니다.</p></div> : <div className="knowledge-growth-map" data-testid="knowledge-growth-map">
        <div className="ar-stage-row" aria-label="AR 학습 단계">
          {stages.map((stage, index) => <div className={`ar-stage ar-stage--${index === 0 ? "basic" : "challenge"}`} data-testid="ar-stage" key={`${stage.arMin}-${stage.arMax}`}>
            <span>{index === 0 ? "기초 단계" : "도전 단계"}</span>
            <strong>AR {stage.arMin.toFixed(1)}–{stage.arMax.toFixed(1)}</strong>
          </div>)}
        </div>
        <div className="roadmap-lanes">
          {domains.map((domain, domainIndex) => (
            <section className={`roadmap-lane roadmap-lane--${domain}`} data-testid="roadmap-lane" key={domain} aria-labelledby={`roadmap-${elementaryGrade}-${domain}`}>
              <header className="roadmap-lane__header"><span aria-hidden="true">{domainIndex + 1}</span><h4 id={`roadmap-${elementaryGrade}-${domain}`}>{ROADMAP_DOMAIN_LABELS[domain]}</h4></header>
              <div className="roadmap-lane__track" aria-label={`${ROADMAP_DOMAIN_LABELS[domain]} 지문 경로`}>
                {topics.filter((item) => item.domain === domain).map((item, index) => {
                  const article = item.articleId ? articles.find((candidate) => candidate.id === item.articleId) : undefined;
                  return (
                    <article className={`passage-node${article ? " is-available" : " is-preparing"}`} data-testid="passage-node" key={item.id}>
                      <span className="passage-node__marker" aria-hidden="true">{article ? "●" : "○"}</span>
                      <div
                        className="passage-node__card"
                        data-testid="roadmap-topic"
                        role={article ? "button" : undefined}
                        tabIndex={article ? 0 : undefined}
                        onClick={article ? () => onOpen(article) : undefined}
                        onKeyDown={article ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onOpen(article);
                          }
                        } : undefined}
                      >
                        <div className="roadmap-topic__meta"><span>초등 {item.grade}학년</span><span>AR {item.arMin.toFixed(1)}–{item.arMax.toFixed(1)}</span></div>
                        <h5>{item.titleKo}</h5>
                        <p>{item.goal}</p>
                        {article
                          ? <span className="passage-node__action">읽기 시작</span>
                          : <span className="roadmap-topic__status" aria-label={`${item.titleKo} 준비 중`}>준비 중</span>}
                      </div>
                      {index === 0 && <span className="passage-node__connector" aria-hidden="true" />}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>}
    </section>
  );
}
