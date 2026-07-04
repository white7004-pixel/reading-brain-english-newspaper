import type { Exam, Question } from './types'
import { QUESTION_TYPES, SOURCES, DIFFICULTIES } from './types'

export interface CountRow {
  label: string
  count: number
  points: number
}

function tally(questions: Question[], labels: readonly string[], key: (q: Question) => string): CountRow[] {
  const map = new Map<string, CountRow>(labels.map((l) => [l, { label: l, count: 0, points: 0 }]))
  for (const q of questions) {
    const row = map.get(key(q))
    if (row) {
      row.count += 1
      row.points += q.points
    }
  }
  return [...map.values()]
}

export function byType(qs: Question[]): CountRow[] {
  return tally(qs, QUESTION_TYPES, (q) => q.type).filter((r) => r.count > 0)
}
export function bySource(qs: Question[]): CountRow[] {
  return tally(qs, SOURCES, (q) => q.source).filter((r) => r.count > 0)
}
export function byDifficulty(qs: Question[]): CountRow[] {
  return tally(qs, DIFFICULTIES, (q) => q.difficulty)
}

export interface ExamStats {
  total: number
  totalPoints: number
  essayCount: number
  essayPoints: number
  essayPointsRatio: number // 0~1, 배점 기준
  hardCount: number
  hardRatio: number // 0~1, 문항 수 기준
  externalRatio: number // 교과서 외 출처 비율 (문항 수 기준)
}

export function examStats(qs: Question[]): ExamStats {
  const total = qs.length
  const totalPoints = qs.reduce((s, q) => s + q.points, 0)
  const essay = qs.filter((q) => q.format === '서술형')
  const essayPoints = essay.reduce((s, q) => s + q.points, 0)
  const hard = qs.filter((q) => q.difficulty === '상')
  const external = qs.filter((q) => q.source !== '교과서')
  return {
    total,
    totalPoints,
    essayCount: essay.length,
    essayPoints,
    essayPointsRatio: totalPoints ? essayPoints / totalPoints : 0,
    hardCount: hard.length,
    hardRatio: total ? hard.length / total : 0,
    externalRatio: total ? external.length / total : 0,
  }
}

/** 출제 경향을 바탕으로 한 규칙 기반 학습 전략 코멘트 */
export function strategyNotes(exam: Exam): string[] {
  const qs = exam.questions
  if (qs.length === 0) return ['문항을 입력하면 학습 전략이 자동으로 생성됩니다.']
  const s = examStats(qs)
  const types = byType(qs).sort((a, b) => b.count - a.count)
  const notes: string[] = []

  const top = types.slice(0, 3).filter((t) => t.count >= 2)
  if (top.length > 0) {
    notes.push(
      `최다 출제 유형은 ${top.map((t) => `${t.label}(${t.count}문항)`).join(', ')} 순입니다. 해당 유형 중심의 문제풀이 훈련을 우선 배치하세요.`,
    )
  }
  if (s.essayPointsRatio >= 0.3) {
    notes.push(
      `서술형 배점 비중이 ${Math.round(s.essayPointsRatio * 100)}%로 높습니다. 조건 영작·어법 서술형 감점 포인트(수일치, 시제, 어순)를 집중 점검해야 합니다.`,
    )
  } else if (s.essayCount > 0) {
    notes.push(`서술형은 ${s.essayCount}문항(배점 ${s.essayPoints}점)입니다. 기본 문장 전환·영작 연습으로 대비 가능합니다.`)
  }
  if (s.hardRatio >= 0.25) {
    notes.push(
      `고난도(상) 문항이 ${Math.round(s.hardRatio * 100)}%로 변별력이 높은 시험입니다. 상위권 목표라면 고난도 변형문제 훈련이 필요합니다.`,
    )
  }
  const hard = qs.filter((q) => q.difficulty === '상')
  if (hard.length > 0) {
    const byHardType = new Map<string, number>()
    for (const q of hard) byHardType.set(q.type, (byHardType.get(q.type) ?? 0) + 1)
    const focus = [...byHardType.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
    notes.push(
      `고난도 문항(${hard.map((q) => `${q.number}번`).join(', ')})은 ${focus.map(([t, n]) => `${t}(${n})`).join(', ')} 유형에 집중되어 있습니다. 이 유형을 고난도 변형으로 훈련하면 변별 구간을 잡을 수 있습니다.`,
    )
  }
  if (s.externalRatio >= 0.4) {
    notes.push(
      `교과서 외 출처(부교재·모의고사·외부지문) 비율이 ${Math.round(s.externalRatio * 100)}%입니다. 범위 내 부교재와 모의고사 지문 변형 대비가 필수입니다.`,
    )
  } else {
    notes.push('교과서 본문 중심 출제입니다. 본문 암기와 문장 단위 어법 분석이 가장 효율적인 전략입니다.')
  }
  return notes
}
