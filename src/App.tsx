import { useEffect, useState } from 'react'
import type { Exam } from './types'
import { newId, GRADES, EXAM_KINDS } from './types'
import { loadExams, saveExams } from './storage'
import { demoExams } from './seed'
import { ExamList } from './components/ExamList'
import { ExamDetail } from './components/ExamDetail'

function blankExam(): Exam {
  const now = new Date()
  return {
    id: newId(),
    school: '',
    grade: GRADES[3], // 고1
    year: now.getFullYear(),
    kind: EXAM_KINDS[0],
    scope: '',
    questions: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

export default function App() {
  const [exams, setExams] = useState<Exam[]>(() => loadExams())
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    saveExams(exams)
  }, [exams])

  const current = exams.find((e) => e.id === openId) ?? null

  return (
    <div className="app">
      <header className="app-header no-print">
        <div className="brand" onClick={() => setOpenId(null)} role="button" tabIndex={0}>
          <span className="brand-mark">RB</span>
          <div>
            <h1>리딩브레인 영어 학교시험 분석</h1>
            <p>내신 기출 문항을 입력하면 출제 경향과 학습 전략을 분석합니다</p>
          </div>
        </div>
      </header>

      <main>
        {current ? (
          <ExamDetail
            exam={current}
            onChange={(e) => setExams(exams.map((x) => (x.id === e.id ? e : x)))}
            onBack={() => setOpenId(null)}
            onDelete={() => {
              setExams(exams.filter((x) => x.id !== current.id))
              setOpenId(null)
            }}
          />
        ) : (
          <ExamList
            exams={exams}
            onOpen={setOpenId}
            onCreate={() => {
              const e = blankExam()
              setExams([...exams, e])
              setOpenId(e.id)
            }}
            onImport={(imported) => {
              if (exams.length === 0 || confirm(`가져온 ${imported.length}개 시험으로 현재 데이터를 덮어쓸까요?`)) {
                setExams(imported)
              }
            }}
            onLoadDemo={() => setExams(demoExams())}
          />
        )}
      </main>

      <footer className="app-footer no-print">데이터는 이 브라우저에만 저장됩니다 · 백업(JSON)으로 내보내기를 권장합니다</footer>
    </div>
  )
}
