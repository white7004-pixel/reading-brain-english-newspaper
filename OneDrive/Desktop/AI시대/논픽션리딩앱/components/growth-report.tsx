import { DOMAIN_LABELS } from "@/lib/sample-content";
import type { WeeklyGrowth } from "@/lib/growth-report";
import type { KnowledgeDomain } from "@/lib/types";

const dayLabels = ["월", "화", "수", "목", "금", "토", "일"];

export type ArMovement = {
  current: number | null;
  previous: number | null;
};

function daySummary(growth: WeeklyGrowth): string {
  return growth.dailyMinutes.map((day, index) => `${dayLabels[index]} ${day.minutes}분`).join(", ");
}

function nextWeekSuggestion(growth: WeeklyGrowth): string {
  if (growth.questCount === 0) return "다음 주에는 첫 탐험을 시작해 보세요.";
  const topDomain = (Object.entries(growth.domainCounts) as Array<[KnowledgeDomain, number]>).sort(([, leftCount], [, rightCount]) => rightCount - leftCount)[0]?.[0];
  return topDomain ? `다음 주에는 하루 5분, ${DOMAIN_LABELS[topDomain]} 주제부터 이어 읽어 보세요.` : "다음 주에는 하루 5분, 관심 있는 주제부터 이어 읽어 보세요.";
}

function arMovementSummary(arMovement: ArMovement): string {
  if (arMovement.current === null) return "AR 수준: 현재 AR 수준을 아직 설정하지 않았어요. 이전 AR 기록이 없어 변화는 알 수 없어요.";
  if (arMovement.previous === null) return `AR 수준: 현재 AR ${arMovement.current.toFixed(1)}. 이전 AR 기록이 없어 변화는 알 수 없어요.`;
  const change = arMovement.current - arMovement.previous;
  if (change === 0) return `AR 수준: AR ${arMovement.current.toFixed(1)}로 변화가 없어요.`;
  return `AR 수준: AR ${arMovement.previous.toFixed(1)}에서 ${arMovement.current.toFixed(1)}로 ${Math.abs(change).toFixed(1)} ${change > 0 ? "올랐어요" : "내려갔어요"}.`;
}

export function GrowthReport({ growth, arMovement = { current: null, previous: null } }: { growth: WeeklyGrowth; arMovement?: ArMovement }) {
  const empty = growth.questCount === 0;
  const readingChartSummary = `이번 주 읽기 시간: ${daySummary(growth)}`;
  const domainEntries = Object.entries(growth.domainCounts) as Array<[KnowledgeDomain, number]>;
  return (
    <section className="growth-report" aria-labelledby="growth-report-heading">
      <p className="eyebrow">WEEKLY GROWTH</p><h2 id="growth-report-heading">이번 주 성장</h2>
      {empty ? <p className="growth-report__empty" role="status">이번 주 읽기 기록이 아직 없어요.</p> : <p className="growth-report__summary">이번 주 {growth.questCount}개 탐험을 완료하고, {growth.activeDays}일 동안 {growth.totalMinutes}분 읽었어요.</p>}
      <dl className="growth-report__metrics"><div><dt>읽은 날</dt><dd>{growth.activeDays}일</dd></div><div><dt>읽은 시간</dt><dd>{growth.totalMinutes}분</dd></div><div><dt>퀴즈 이해도</dt><dd>{growth.quizAccuracyPercent}%</dd></div></dl>
      <p className="growth-report__key-finder">핵심 찾기: {growth.keyFinderAccuracyPercent === null ? "기록을 쌓으면 확인할 수 있어요" : `${growth.keyFinderAccuracyPercent}%`}</p>
      <figure className="growth-report__chart" aria-label={readingChartSummary}><figcaption className="sr-only">{readingChartSummary}</figcaption>{growth.dailyMinutes.map((day, index) => <div key={day.localDate}><span>{dayLabels[index]}</span><strong>{day.minutes}분</strong></div>)}</figure>
      <section className="growth-report__coverage" aria-labelledby="growth-report-coverage-heading"><h3 id="growth-report-coverage-heading">이번 주 분야</h3>{domainEntries.length ? <ul aria-label="이번 주 분야별 탐험">{domainEntries.map(([domain, count]) => <li key={domain}>{DOMAIN_LABELS[domain]} {count}개</li>)}</ul> : <p>분야 정보가 없는 이전 읽기 기록도 안전하게 보관하고 있어요.</p>}</section>
      <p className="growth-report__ar">{arMovementSummary(arMovement)}</p>
      <p className="growth-report__suggestion">{nextWeekSuggestion(growth)}</p>
    </section>
  );
}
