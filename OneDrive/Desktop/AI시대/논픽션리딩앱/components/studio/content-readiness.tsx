import { evaluateQuestReadiness } from "@/lib/quest-readiness";
import { studioControlId } from "@/lib/studio-validation-ui";
import type { Article } from "@/lib/types";

export function ContentReadiness({ article }: { article: Article }) {
  const readiness = evaluateQuestReadiness(article);
  return <section className="content-readiness" aria-labelledby="content-readiness-heading">
    <div className="content-readiness__heading"><div><p className="eyebrow">QUEST READINESS</p><h2 id="content-readiness-heading">퀘스트 준비도</h2></div><strong role="status">{readiness.passed}/{readiness.total} {readiness.ready ? "준비 완료" : "확인 필요"}</strong></div>
    <ol className="content-readiness__checks">{readiness.checks.map((check) => <li key={check.id} data-testid="readiness-check" data-passed={check.passed}>
      <span aria-hidden="true">{check.passed ? "✓" : "○"}</span><div><strong>{check.labelKo}</strong><p>{check.passed ? "준비됨" : check.messageKo}</p></div><a href={`#${studioControlId(check.field)}`} aria-label={`${check.labelKo} 수정`}>수정</a>
    </li>)}</ol>
    <p className="content-readiness__note">준비도는 콘텐츠 품질 안내입니다. 기존 사실·언어·연령 검수와 최종 승인을 모두 거쳐야 발행할 수 있습니다.</p>
  </section>;
}
