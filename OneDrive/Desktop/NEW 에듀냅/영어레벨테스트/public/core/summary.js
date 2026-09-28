// 리포트용 사실 정리와 틀 문장. AI 가 없거나 실패해도 리포트는 이 문장으로 나온다.
import { SECTIONS, SECTION_KO, SECTION_TOPIC, labelOf, positionText, nextUnit, unitName, currentStep } from './scale.js';
import { position } from './progress.js';

export function estLabel(est) {
  if (est.unit == null) return labelOf(est.step);
  if (est.unit === 0) return `${labelOf(est.step)} 시작 전`;
  return `${labelOf(est.step)} ${est.unit}단원`;
}

export function nextLabel(section, est) {
  const n = nextUnit(est);
  return n ? `${labelOf(n.step)} ${n.unit}단원(${unitName(section, n.step, n.unit)})` : '고3 과정 복습';
}

// 1마당에서 틀린 가장 낮은 학기 ~ 맞힌 가장 높은 학기. 겹치지 않으면 null.
export function shaky(log) {
  const p1 = log.filter((r) => r.phase === 1);
  const wrong = p1.filter((r) => !r.correct).map((r) => r.step);
  const right = p1.filter((r) => r.correct).map((r) => r.step);
  if (!wrong.length || !right.length) return null;
  const from = Math.min(...wrong);
  const to = Math.max(...right);
  return from <= to ? { from, to } : null;
}

export function bookFor(books, section, step) {
  return (books?.[section] ?? []).find((b) => step >= b.from && step <= b.to)?.name ?? '';
}

// gap = 지금 학기 가운데에서 몇 학기 앞(+)·뒤(−)인지, 0.5 단위
export function commentFacts(result, proj) {
  const now = currentStep(result.grade, result.date) + 0.5;
  const sections = SECTIONS.filter((k) => result.sections[k]?.est).map((k) => {
    const est = result.sections[k].est;
    return { key: k, name: SECTION_KO[k], position: positionText(k, est), level: estLabel(est), next: nextLabel(k, est), gap: Math.round((position(est) - now) * 2) / 2 };
  });
  const skipped = SECTIONS.filter((k) => !result.sections[k]?.est).map((k) => SECTION_KO[k]);
  return { grade: result.grade, sections, skipped, overall: proj?.overall.label ?? '', pace: proj?.pace ?? null };
}

export function templateComment(facts) {
  const s = [...facts.sections].sort((a, b) => b.gap - a.gap);
  if (!s.length) return { summary: '응시한 영역이 없어 결과를 낼 수 없습니다.', directions: [] };
  const top = s[0];
  const low = s.at(-1);
  const parts = [s.length > 1
    ? `가장 앞선 영역은 ${top.name}(${top.level})이고, 가장 보완이 필요한 영역은 ${low.name}(${low.level})입니다.`
    : `${SECTION_TOPIC[top.key]} ${top.level} 수준입니다.`];
  if (facts.overall === '고3 과정 완료') parts.push('이미 고3 과정 수준에 도달했습니다.');
  else if (facts.overall) parts.push(`우리 학원 진도로 공부하면 ${facts.overall}에 고3 과정을 마칠 것으로 예상합니다.`);
  const directions = [...s].reverse().slice(0, 3).map((x) => `${SECTION_TOPIC[x.key]} ${x.next}부터 수업을 시작합니다.`);
  return { summary: parts.join(' '), directions };
}
