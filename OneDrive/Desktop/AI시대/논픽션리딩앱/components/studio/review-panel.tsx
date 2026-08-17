"use client";

import { useState } from "react";
import { approveArticle, completeStage, publishArticle, validateStage, withdrawArticle } from "@/lib/studio-workflow";
import { issueFieldLabel, issueMessage, studioControlId, studioIssueId } from "@/lib/studio-validation-ui";
import type { ArticlePersistenceResult, ReviewStage, StudioArticle, ValidationIssue } from "@/lib/studio-types";

type ReviewPanelProps = {
  article: StudioArticle;
  onArticleChange: (article: StudioArticle) => ArticlePersistenceResult | Promise<ArticlePersistenceResult> | void;
  actor?: string;
  now?: () => string;
};

const STAGES: Array<{ stage: ReviewStage; title: string; button: string; condition: string }> = [
  { stage: "facts", title: "사실·출처", button: "사실·출처 검수 완료", condition: "기본 정보와 출처를 확인합니다." },
  { stage: "language", title: "영어·AR", button: "영어·AR 검수 완료", condition: "본문, 어휘, 퀴즈와 난이도를 확인합니다." },
  { stage: "age", title: "연령 적합성", button: "연령 적합성 검수 완료", condition: "권장 연령과 학습 목표를 확인합니다." },
];

const REQUIRED_STATUS: Record<ReviewStage, StudioArticle["workflowStatus"]> = {
  facts: "draft",
  language: "facts_reviewed",
  age: "language_reviewed",
};

export function ReviewPanel({ article, onArticleChange, actor = article.editor, now = () => new Date().toISOString() }: ReviewPanelProps) {
  const [issues, setIssues] = useState<Partial<Record<ReviewStage, ValidationIssue[]>>>({});
  const [actionError, setActionError] = useState("");
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  const update = async (next: StudioArticle) => {
    try {
      const result = await onArticleChange(next);
      if (result && !result.ok) { setActionError(result.error); return; }
      setActionError("");
    } catch (error) {
      setActionError(errorMessage(error));
    }
  };

  const finishStage = (stage: ReviewStage) => {
    const validationIssues = validateStage(article, stage);
    setIssues((current) => ({ ...current, [stage]: validationIssues }));
    if (validationIssues.length > 0) return;

    try {
      void update(completeStage(article, stage, actor, now()));
    } catch (error) {
      setActionError(errorMessage(error));
    }
  };

  const runAction = (action: () => StudioArticle) => {
    try { void update(action()); } catch (error) { setActionError(errorMessage(error)); }
  };

  const published = article.workflowStatus === "published";

  return (
    <aside className="studio-review" aria-labelledby="review-heading">
      <div className="studio-review__heading"><div><p className="eyebrow">REVIEW</p><h2 id="review-heading">단계별 검수</h2></div><span className="studio-status" data-status={article.workflowStatus}>{workflowLabel(article.workflowStatus)}</span></div>
      <div className="studio-review__stages">
        {STAGES.map((item, index) => {
          const record = article.reviewRecords[item.stage];
          const stageIssues = issues[item.stage] ?? [];
          return (
            <section className="studio-review-stage" key={item.stage} aria-labelledby={`${item.stage}-review-heading`}>
              <div className="studio-review-stage__title"><span aria-hidden="true">{record ? "✓" : index + 1}</span><h3 id={`${item.stage}-review-heading`}>{item.title}</h3></div>
              <p>{item.condition}</p>
              {record ? (
                <div className="studio-review-complete"><strong>{item.button}됨</strong><span>{record.actor} · {formatTimestamp(record.completedAt)}</span></div>
              ) : (
                <button type="button" className="button button--secondary" disabled={article.workflowStatus !== REQUIRED_STATUS[item.stage]} onClick={() => finishStage(item.stage)}>{item.button}</button>
              )}
              {stageIssues.map((issue) => { const label = issueFieldLabel(issue.field); return <div className="studio-review-issue" key={`${issue.field}-${issue.code}`}><p id={studioIssueId(issue)}>{issueMessage(issue)}</p><a href={`#${studioControlId(issue.field)}`}>{label}{directionParticle(label)} 이동</a></div>; })}
            </section>
          );
        })}
      </div>

      {actionError && <p className="studio-field-error" role="alert">{actionError}</p>}
      {!published && article.workflowStatus !== "withdrawn" && (
        <div className="studio-review__actions">
          {article.workflowStatus === "age_reviewed" && (!article.previewReview || article.previewReview.workingVersion !== article.workingVersion) && <p className="studio-review-issue"><a href="#studio-preview-acknowledge">미리보기를 확인해 주세요.</a></p>}
          <button type="button" className="button button--secondary" disabled={article.workflowStatus !== "age_reviewed" || !article.previewReview || article.previewReview.workingVersion !== article.workingVersion} onClick={() => runAction(() => approveArticle(article, actor, now()))}>최종 승인</button>
          <button type="button" className="button button--primary" disabled={article.workflowStatus !== "approved" || !article.approval} onClick={() => runAction(() => publishArticle(article, now()))}>발행</button>
        </div>
      )}
      {published && !confirmWithdraw && <button type="button" className="button studio-withdraw" onClick={() => setConfirmWithdraw(true)}>발행 취소</button>}
      {published && confirmWithdraw && (
        <div className="studio-withdraw-confirm" role="group" aria-label="발행 취소 확인">
          <strong>학습자 목록에서 이 콘텐츠를 내릴까요?</strong>
          <div><button type="button" className="button button--ghost" onClick={() => setConfirmWithdraw(false)}>취소 유지</button><button type="button" className="button studio-withdraw" onClick={() => runAction(() => withdrawArticle(article, now()))}>발행 취소 확정</button></div>
        </div>
      )}
    </aside>
  );
}

function errorMessage(error: unknown): string { return error instanceof Error ? error.message : "작업을 완료하지 못했습니다."; }
function directionParticle(label: string): "로" | "으로" {
  const code = label.charCodeAt(label.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0 && code % 28 !== 8 ? "으로" : "로";
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ko-KR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function workflowLabel(status: StudioArticle["workflowStatus"]): string {
  return ({ draft: "초안", facts_reviewed: "사실 검수 완료", language_reviewed: "영어 검수 완료", age_reviewed: "전체 검수 완료", approved: "승인 완료", published: "발행 완료", withdrawn: "발행 취소" })[status];
}
