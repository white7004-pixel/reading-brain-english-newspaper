"use client";

import { useMemo, useState } from "react";
import type { KnowledgeDomain } from "@/lib/types";
import type { StudioArticle, WorkflowStatus } from "@/lib/studio-types";

const WORKFLOW_META: Record<WorkflowStatus, { label: string; icon: string }> = {
  draft: { label: "초안", icon: "✎" },
  facts_reviewed: { label: "사실·출처 검수 완료", icon: "✓" },
  language_reviewed: { label: "영어·AR 검수 완료", icon: "✓" },
  age_reviewed: { label: "연령 적합성 검수 완료", icon: "✓" },
  approved: { label: "최종 승인", icon: "✓" },
  published: { label: "발행 완료", icon: "●" },
  withdrawn: { label: "발행 취소", icon: "↩" },
};

const DOMAIN_LABELS: Record<KnowledgeDomain, string> = {
  science: "과학",
  history: "역사",
  arts: "예술",
  philosophy: "철학",
  "self-development": "자기계발",
  "world-culture": "세계 문화",
};

type ArFilter = "all" | "under-500" | "500-699" | "700-and-over";

export type StudioFilter = {
  query: string;
  workflowStatus: WorkflowStatus | "all";
  domain: KnowledgeDomain | "all";
  ar: ArFilter;
  ageRange: string;
};

type StudioDashboardProps = {
  articles: StudioArticle[];
  onCreate: () => void;
  onOpen: (article: StudioArticle) => void;
};

const EMPTY_FILTER: StudioFilter = {
  query: "",
  workflowStatus: "all",
  domain: "all",
  ar: "all",
  ageRange: "all",
};

export function summarizeStudioArticles(articles: StudioArticle[]): Record<WorkflowStatus, number> {
  return articles.reduce<Record<WorkflowStatus, number>>((summary, article) => {
    summary[article.workflowStatus] += 1;
    return summary;
  }, {
    draft: 0,
    facts_reviewed: 0,
    language_reviewed: 0,
    age_reviewed: 0,
    approved: 0,
    published: 0,
    withdrawn: 0,
  });
}

export function StudioDashboard({ articles, onCreate, onOpen }: StudioDashboardProps) {
  const [filter, setFilter] = useState<StudioFilter>(EMPTY_FILTER);
  const summary = useMemo(() => summarizeStudioArticles(articles), [articles]);
  const ageRanges = useMemo(() => [...new Set(articles.map((article) => article.ageRange))].sort(), [articles]);
  const filteredArticles = useMemo(
    () => articles
      .filter((article) => matchesFilter(article, filter))
      .sort((first, second) => second.updatedAt.localeCompare(first.updatedAt)),
    [articles, filter],
  );
  const nextActions = useMemo(
    () => articles.flatMap((article) => {
      const action = nextRequiredAction(article.workflowStatus);
      return action ? [{ article, action }] : [];
    }),
    [articles],
  );

  const cards = [
    { label: "초안", icon: "✎", count: summary.draft },
    { label: "검수 중", icon: "◌", count: summary.facts_reviewed + summary.language_reviewed },
    { label: "승인 대기", icon: "✓", count: summary.age_reviewed },
    { label: "발행 완료", icon: "●", count: summary.published },
  ];

  return (
    <main className="studio-shell">
      <header className="studio-header">
        <div>
          <p className="eyebrow">CONTENT STUDIO</p>
          <h1>콘텐츠 스튜디오</h1>
          <p>3분 영어 논픽션을 검수하고 발행하세요.</p>
        </div>
        <button className="button button--primary studio-create" type="button" onClick={onCreate}>
          <span aria-hidden="true">＋</span> 새 콘텐츠
        </button>
      </header>

      <section aria-labelledby="studio-workflow-summary">
        <div className="studio-section-heading">
          <h2 id="studio-workflow-summary">검수 현황</h2>
          <span>총 {articles.length}개</span>
        </div>
        <div className="studio-summary-grid">
          {cards.map((card) => (
            <article className="studio-summary-card" key={card.label}>
              <span aria-hidden="true">{card.icon}</span>
              <strong>{card.label} {card.count}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-next-actions" aria-labelledby="studio-next-actions">
        <div className="studio-section-heading">
          <div>
            <h2 id="studio-next-actions">다음 검수 필요</h2>
            <p>다음 단계가 남은 콘텐츠예요.</p>
          </div>
          <span>{nextActions.length}개</span>
        </div>
        {nextActions.length === 0 ? (
          <p className="studio-next-actions__empty">다음 단계가 필요한 콘텐츠가 없어요.</p>
        ) : (
          <div className="studio-next-actions__list" role="list" aria-label="다음 검수 필요 목록">
            {nextActions.map(({ article, action }) => (
              <article className="studio-next-action" role="listitem" key={article.id}>
                <div><strong>{article.title}</strong><span>{action}</span></div>
                <button type="button" className="button button--ghost studio-open" onClick={() => onOpen(article)} aria-label={`${article.title} 열기`}>열기</button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="studio-content-section" aria-labelledby="studio-content-list">
        <div className="studio-section-heading">
          <div>
            <h2 id="studio-content-list">콘텐츠 목록</h2>
            <p>최근 수정순</p>
          </div>
          <span>{filteredArticles.length}개 표시</span>
        </div>

        <div className="studio-filters" aria-label="콘텐츠 필터">
          <label className="studio-search">
            <span>콘텐츠 검색</span>
            <input
              type="search"
              role="searchbox"
              value={filter.query}
              onChange={(event) => setFilter((current) => ({ ...current, query: event.target.value }))}
              placeholder="제목 또는 주제 검색"
            />
          </label>
          <FilterSelect label="상태" value={filter.workflowStatus} onChange={(value) => setFilter((current) => ({ ...current, workflowStatus: value as StudioFilter["workflowStatus"] }))}>
            <option value="all">전체 상태</option>
            {Object.entries(WORKFLOW_META).map(([status, meta]) => <option value={status} key={status}>{meta.label}</option>)}
          </FilterSelect>
          <FilterSelect label="분야" value={filter.domain} onChange={(value) => setFilter((current) => ({ ...current, domain: value as StudioFilter["domain"] }))}>
            <option value="all">전체 분야</option>
            {Object.entries(DOMAIN_LABELS).map(([domain, label]) => <option value={domain} key={domain}>{label}</option>)}
          </FilterSelect>
          <FilterSelect label="논픽션랩 추정 AR" value={filter.ar} onChange={(value) => setFilter((current) => ({ ...current, ar: value as ArFilter }))}>
            <option value="all">전체 AR</option>
            <option value="under-500">500 미만</option>
            <option value="500-699">500–699</option>
            <option value="700-and-over">700 이상</option>
          </FilterSelect>
          <FilterSelect label="권장 연령" value={filter.ageRange} onChange={(value) => setFilter((current) => ({ ...current, ageRange: value }))}>
            <option value="all">전체 연령</option>
            {ageRanges.map((ageRange) => <option value={ageRange} key={ageRange}>{ageRange}세</option>)}
          </FilterSelect>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="studio-empty-state"><p>조건에 맞는 콘텐츠가 없어요.</p><button type="button" onClick={() => setFilter(EMPTY_FILTER)}>필터 초기화</button></div>
        ) : (
          <div className="studio-article-list" role="list" aria-label="콘텐츠 목록">
            {filteredArticles.map((article) => <ArticleRow article={article} key={article.id} onOpen={onOpen} />)}
          </div>
        )}
      </section>
    </main>
  );
}

function FilterSelect({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <label className="studio-filter-select"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{children}</select></label>;
}

function ArticleRow({ article, onOpen }: { article: StudioArticle; onOpen: (article: StudioArticle) => void }) {
  const workflow = WORKFLOW_META[article.workflowStatus];
  return (
    <article className="studio-article-row" role="listitem">
      <div className="studio-article-row__main">
        <span className="studio-status" data-status={article.workflowStatus}><span aria-hidden="true">{workflow.icon}</span> {workflow.label}</span>
        <h3>{article.title}</h3>
        <p>{article.titleKo || article.keyConcept}</p>
      </div>
      <dl className="studio-article-row__details">
        <div><dt>분야</dt><dd>{DOMAIN_LABELS[article.domain]}</dd></div>
        <div><dt>추정 AR</dt><dd>{article.difficulty.value}</dd></div>
        <div><dt>권장 연령</dt><dd>{article.ageRange}세</dd></div>
        <div><dt>수정일</dt><dd>{formatUpdatedAt(article.updatedAt)}</dd></div>
      </dl>
      <button type="button" className="button button--ghost studio-open" onClick={() => onOpen(article)} aria-label={`${article.title} 열기`}>열기</button>
    </article>
  );
}

function matchesFilter(article: StudioArticle, filter: StudioFilter): boolean {
  const query = filter.query.trim().toLocaleLowerCase();
  const searchableText = [article.title, article.titleKo, article.summaryKo, article.keyConcept, article.learningGoal].join(" ").toLocaleLowerCase();
  return (!query || searchableText.includes(query))
    && (filter.workflowStatus === "all" || article.workflowStatus === filter.workflowStatus)
    && (filter.domain === "all" || article.domain === filter.domain)
    && (filter.ageRange === "all" || article.ageRange === filter.ageRange)
    && matchesAr(article.difficulty.value, filter.ar);
}

function matchesAr(value: number, filter: ArFilter): boolean {
  return filter === "all"
    || (filter === "under-500" && value < 500)
    || (filter === "500-699" && value >= 500 && value <= 699)
    || (filter === "700-and-over" && value >= 700);
}

function nextRequiredAction(workflowStatus: WorkflowStatus): string | null {
  switch (workflowStatus) {
    case "draft":
      return "사실·출처 검수 필요";
    case "facts_reviewed":
      return "영어·AR 검수 필요";
    case "language_reviewed":
      return "연령 적합성 검수 필요";
    case "age_reviewed":
      return "최종 승인 필요";
    case "approved":
      return "발행 필요";
    case "published":
    case "withdrawn":
      return null;
  }
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "numeric", day: "numeric" }).format(date);
}
