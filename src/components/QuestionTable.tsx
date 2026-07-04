import type { Question } from '../types'
import { QUESTION_TYPES, SOURCES, DIFFICULTIES, FORMATS, emptyQuestion } from '../types'

interface Props {
  questions: Question[]
  onChange: (questions: Question[]) => void
}

export function QuestionTable({ questions, onChange }: Props) {
  const update = (id: string, patch: Partial<Question>) => {
    onChange(questions.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }
  const remove = (id: string) => onChange(questions.filter((q) => q.id !== id))
  const add = () => {
    const nextNo = String(
      questions.reduce((m, q) => {
        const n = parseInt(q.number, 10)
        return Number.isFinite(n) ? Math.max(m, n) : m
      }, 0) + 1,
    )
    onChange([...questions, emptyQuestion(nextNo)])
  }

  return (
    <div className="question-table-wrap">
      <table className="question-table">
        <thead>
          <tr>
            <th style={{ width: 64 }}>번호</th>
            <th>유형</th>
            <th>출처</th>
            <th style={{ width: 72 }}>난이도</th>
            <th style={{ width: 84 }}>형식</th>
            <th style={{ width: 72 }}>배점</th>
            <th>출제 포인트 메모</th>
            <th style={{ width: 44 }}></th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>
                <input value={q.number} onChange={(e) => update(q.id, { number: e.target.value })} aria-label="문항 번호" />
              </td>
              <td>
                <select value={q.type} onChange={(e) => update(q.id, { type: e.target.value as Question['type'] })} aria-label="유형">
                  {QUESTION_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </td>
              <td>
                <select value={q.source} onChange={(e) => update(q.id, { source: e.target.value as Question['source'] })} aria-label="출처">
                  {SOURCES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={q.difficulty}
                  onChange={(e) => update(q.id, { difficulty: e.target.value as Question['difficulty'] })}
                  aria-label="난이도"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </td>
              <td>
                <select value={q.format} onChange={(e) => update(q.id, { format: e.target.value as Question['format'] })} aria-label="형식">
                  {FORMATS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={q.points}
                  onChange={(e) => update(q.id, { points: Number(e.target.value) || 0 })}
                  aria-label="배점"
                />
              </td>
              <td>
                <input value={q.note} onChange={(e) => update(q.id, { note: e.target.value })} placeholder="예: 3월 모고 31번 변형" aria-label="메모" />
              </td>
              <td>
                <button className="btn-icon" onClick={() => remove(q.id)} title="문항 삭제" aria-label="문항 삭제">
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-secondary" onClick={add}>
        + 문항 추가
      </button>
    </div>
  )
}
