import { useMemo } from 'react'
import type { Exam } from '../types'
import { GRADES, EXAM_KINDS } from '../types'
import { byType, bySource, byDifficulty, examStats, strategyNotes } from '../analysis'
import { HBarChart, StackedBar, StatTile } from './charts'
import { QuestionTable } from './QuestionTable'

interface Props {
  exam: Exam
  onChange: (exam: Exam) => void
  onBack: () => void
  onDelete: () => void
}

export function ExamDetail({ exam, onChange, onBack, onDelete }: Props) {
  const patch = (p: Partial<Exam>) => onChange({ ...exam, ...p, updatedAt: new Date().toISOString() })

  const stats = useMemo(() => examStats(exam.questions), [exam.questions])
  const typeRows = useMemo(() => [...byType(exam.questions)].sort((a, b) => b.count - a.count), [exam.questions])
  const sourceRows = useMemo(() => bySource(exam.questions), [exam.questions])
  const diffRows = useMemo(() => byDifficulty(exam.questions), [exam.questions])
  const notes = useMemo(() => strategyNotes(exam), [exam])

  const pct = (x: number) => `${Math.round(x * 100)}%`

  return (
    <div>
      <div className="toolbar no-print">
        <button className="btn-secondary" onClick={onBack}>
          ← 목록
        </button>
        <div className="toolbar-spacer" />
        <button className="btn-secondary" onClick={() => window.print()}>
          리포트 인쇄
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            if (confirm(`'${exam.school} ${exam.grade} ${exam.year} ${exam.kind}' 시험을 삭제할까요?`)) onDelete()
          }}
        >
          시험 삭제
        </button>
      </div>

      {/* 인쇄 시 리포트 머리글 */}
      <div className="print-header print-only">
        <strong>리딩브레인 영어 내신 분석 리포트</strong>
        <span>
          {exam.school} · {exam.grade} · {exam.year}년 {exam.kind}
        </span>
      </div>

      <section className="card no-print">
        <h2>시험 정보</h2>
        <div className="form-grid">
          <label>
            학교명
            <input value={exam.school} onChange={(e) => patch({ school: e.target.value })} placeholder="예: 리딩고등학교" />
          </label>
          <label>
            학년
            <select value={exam.grade} onChange={(e) => patch({ grade: e.target.value as Exam['grade'] })}>
              {GRADES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <label>
            연도
            <input type="number" value={exam.year} onChange={(e) => patch({ year: Number(e.target.value) || exam.year })} />
          </label>
          <label>
            시험
            <select value={exam.kind} onChange={(e) => patch({ kind: e.target.value as Exam['kind'] })}>
              {EXAM_KINDS.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
          <label className="form-wide">
            시험 범위
            <input
              value={exam.scope}
              onChange={(e) => patch({ scope: e.target.value })}
              placeholder="예: 능률(김성곤) 1~3과, 올림포스 1~6강, 3월 모의고사"
            />
          </label>
        </div>
      </section>

      <section className="card no-print">
        <h2>문항 입력</h2>
        <QuestionTable questions={exam.questions} onChange={(questions) => patch({ questions })} />
      </section>

      <section className="card">
        <h2>시험 개요</h2>
        <p className="report-scope">
          {exam.school} {exam.grade} · {exam.year}년 {exam.kind}
          {exam.scope && <> · 범위: {exam.scope}</>}
        </p>
        <div className="stat-row">
          <StatTile label="총 문항" value={`${stats.total}문항`} sub={`총 ${stats.totalPoints}점`} />
          <StatTile label="서술형 비중" value={pct(stats.essayPointsRatio)} sub={`${stats.essayCount}문항 · ${stats.essayPoints}점 (배점 기준)`} />
          <StatTile label="고난도(상) 비율" value={pct(stats.hardRatio)} sub={`${stats.hardCount}문항 (문항 수 기준)`} />
          <StatTile label="교과서 외 출처" value={pct(stats.externalRatio)} sub="부교재·모의고사·외부·변형" />
        </div>
      </section>

      <section className="card">
        <h2>유형별 출제 분포</h2>
        <HBarChart rows={typeRows} color="var(--series-1)" />
      </section>

      <div className="card-pair">
        <section className="card">
          <h2>출처 분포</h2>
          <HBarChart rows={sourceRows} color="var(--series-2)" compact />
        </section>
        <section className="card">
          <h2>난이도 분포</h2>
          <HBarChart rows={diffRows} rowColors={['var(--ord-1)', 'var(--ord-2)', 'var(--ord-3)']} compact />
        </section>
      </div>

      <section className="card">
        <h2>배점 구성 (객관식 vs 서술형)</h2>
        <StackedBar
          segments={[
            { label: '객관식', value: stats.totalPoints - stats.essayPoints, color: 'var(--series-1)' },
            { label: '서술형', value: stats.essayPoints, color: 'var(--series-2)' },
          ]}
        />
      </section>

      <section className="card">
        <h2>출제 경향 및 학습 전략</h2>
        <ul className="strategy-list">
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </section>

      {/* 인쇄용 문항 표 (읽기 전용) */}
      <section className="card print-only">
        <h2>문항 구성표</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>유형</th>
              <th>출처</th>
              <th>난이도</th>
              <th>형식</th>
              <th>배점</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            {exam.questions.map((q) => (
              <tr key={q.id}>
                <td>{q.number}</td>
                <td>{q.type}</td>
                <td>{q.source}</td>
                <td>{q.difficulty}</td>
                <td>{q.format}</td>
                <td>{q.points}</td>
                <td>{q.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
