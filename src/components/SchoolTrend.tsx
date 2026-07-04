import { useMemo } from 'react'
import type { Exam } from '../types'
import { EXAM_KINDS, QUESTION_TYPES } from '../types'
import { examStats } from '../analysis'
import { TrendChart, StatTile } from './charts'

interface Props {
  school: string
  exams: Exam[]
  onBack: () => void
  onOpen: (id: string) => void
}

/** 한 학교의 시험 회차별 출제 경향 추이 */
export function SchoolTrend({ school, exams, onBack, onOpen }: Props) {
  const list = useMemo(
    () =>
      exams
        .filter((e) => e.school === school)
        .sort((a, b) => a.year - b.year || EXAM_KINDS.indexOf(a.kind) - EXAM_KINDS.indexOf(b.kind)),
    [exams, school],
  )
  const stats = useMemo(() => list.map((e) => examStats(e.questions)), [list])

  const pctOf = (f: (s: (typeof stats)[number]) => number) => stats.map((s) => Math.round(f(s) * 100))
  const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0)

  const essay = pctOf((s) => s.essayPointsRatio)
  const hard = pctOf((s) => s.hardRatio)
  const external = pctOf((s) => s.externalRatio)

  // 유형 × 시험 비교표 (한 번이라도 출제된 유형만)
  const typeCounts = list.map((e) => {
    const m = new Map<string, number>()
    for (const q of e.questions) m.set(q.type, (m.get(q.type) ?? 0) + 1)
    return m
  })
  const usedTypes = QUESTION_TYPES.filter((t) => typeCounts.some((m) => (m.get(t) ?? 0) > 0))

  return (
    <div>
      <div className="toolbar no-print">
        <button className="btn-secondary" onClick={onBack}>
          ← 목록
        </button>
      </div>

      <section className="card">
        <h2>{school} · 출제 경향 추이</h2>
        <div className="stat-row">
          <StatTile label="분석한 시험" value={`${list.length}회`} sub={list.length ? `${list[0].year}~${list[list.length - 1].year}년` : ''} />
          <StatTile label="평균 서술형 비중" value={`${avg(essay)}%`} sub="배점 기준" />
          <StatTile label="평균 고난도(상) 비율" value={`${avg(hard)}%`} sub="문항 수 기준" />
          <StatTile label="평균 교과서 외 출처" value={`${avg(external)}%`} sub="부교재·모의고사·외부·변형" />
        </div>
      </section>

      <section className="card">
        <h2>핵심 지표 추이</h2>
        {list.length < 2 && <p className="empty-note">시험이 2회 이상 등록되면 회차별 변화를 확인할 수 있습니다.</p>}
        <TrendChart
          xLabels={list.map((e) => `${e.year}`)}
          xSubLabels={list.map((e) => e.kind)}
          series={[
            { label: '서술형 비중', color: 'var(--series-1)', values: essay },
            { label: '고난도 비율', color: 'var(--series-2)', values: hard },
            { label: '교과서 외 출처', color: 'var(--series-3)', values: external },
          ]}
        />
      </section>

      <section className="card">
        <h2>유형별 출제 횟수 비교</h2>
        <div className="question-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>유형</th>
                {list.map((e) => (
                  <th key={e.id}>
                    <button className="link-btn" onClick={() => onOpen(e.id)} title="시험 상세 보기">
                      {e.year} {e.kind}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usedTypes.map((t) => (
                <tr key={t}>
                  <td>{t}</td>
                  {typeCounts.map((m, i) => {
                    const c = m.get(t) ?? 0
                    return (
                      <td key={i} className={c > 0 ? 'cell-hit' : 'cell-zero'}>
                        {c > 0 ? c : '·'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="empty-note">매 시험 반복 출제되는 유형이 이 학교의 고정 출제 패턴입니다. 열 제목을 누르면 해당 시험 상세로 이동합니다.</p>
      </section>
    </div>
  )
}
