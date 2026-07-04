import { useMemo, useRef, useState } from 'react'
import type { Exam } from '../types'
import { examStats } from '../analysis'
import { exportJson, importJson } from '../storage'

interface Props {
  exams: Exam[]
  onOpen: (id: string) => void
  onCreate: () => void
  onImport: (exams: Exam[]) => void
  onLoadDemo: () => void
}

export function ExamList({ exams, onOpen, onCreate, onImport, onLoadDemo }: Props) {
  const [school, setSchool] = useState('전체')
  const fileRef = useRef<HTMLInputElement>(null)

  const schools = useMemo(() => ['전체', ...new Set(exams.map((e) => e.school))], [exams])
  const filtered = useMemo(
    () =>
      exams
        .filter((e) => school === '전체' || e.school === school)
        .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1)),
    [exams, school],
  )

  return (
    <div>
      <div className="toolbar">
        <button className="btn-primary" onClick={onCreate}>
          + 새 시험 등록
        </button>
        {schools.length > 1 && (
          <select value={school} onChange={(e) => setSchool(e.target.value)} aria-label="학교 필터">
            {schools.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        )}
        <div className="toolbar-spacer" />
        <button className="btn-secondary" onClick={() => exportJson(exams)} disabled={exams.length === 0}>
          백업(JSON)
        </button>
        <button className="btn-secondary" onClick={() => fileRef.current?.click()}>
          가져오기
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0]
            if (!f) return
            try {
              onImport(await importJson(f))
            } catch {
              alert('JSON 파일을 읽을 수 없습니다.')
            }
            e.target.value = ''
          }}
        />
      </div>

      {exams.length === 0 ? (
        <div className="card empty-state">
          <h2>등록된 시험이 없습니다</h2>
          <p>학교 내신 시험의 문항을 입력하면 유형·출처·난이도 분석과 학습 전략 리포트가 자동으로 생성됩니다.</p>
          <div className="empty-actions">
            <button className="btn-primary" onClick={onCreate}>
              + 새 시험 등록
            </button>
            <button className="btn-secondary" onClick={onLoadDemo}>
              예시 데이터 보기
            </button>
          </div>
        </div>
      ) : (
        <div className="exam-grid">
          {filtered.map((e) => {
            const s = examStats(e.questions)
            return (
              <button key={e.id} className="exam-card" onClick={() => onOpen(e.id)}>
                <div className="exam-card-school">
                  {e.school} <span className="exam-card-grade">{e.grade}</span>
                </div>
                <div className="exam-card-kind">
                  {e.year}년 {e.kind}
                </div>
                <div className="exam-card-meta">
                  {s.total}문항 · {s.totalPoints}점 · 서술형 {Math.round(s.essayPointsRatio * 100)}%
                </div>
                {e.scope && <div className="exam-card-scope">{e.scope}</div>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
