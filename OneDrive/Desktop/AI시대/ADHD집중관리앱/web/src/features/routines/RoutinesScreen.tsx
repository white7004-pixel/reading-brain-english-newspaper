import { useState } from 'react'
import { advanceRoutine, type RoutineRunState } from './routineRunner'

const steps = [{ title: '책상 위 한 가지만 남기기', minutes: 2 }, { title: '오늘 할 일 펼치기', minutes: 3 }, { title: '첫 문제 시작하기', minutes: 10 }]

export function RoutinesScreen() {
  const [run, setRun] = useState<RoutineRunState | null>(null)
  const start = () => setRun({ currentStepIndex: 0, endsAt: new Date(Date.now() + 15 * 60_000).toISOString(), status: 'running' })
  const current = run && steps[run.currentStepIndex]
  return <section className="feature-screen"><span>루틴</span><h2>시작을 작게 만들어요</h2>
    {!run && <button className="primary" onClick={start}>루틴 시작</button>}
    {current && <article className="routine-card"><small>{run.currentStepIndex + 1}/{steps.length}</small><h3>{current.title}</h3><p>예상 종료 {new Date(run.endsAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</p><div>
      <button onClick={() => setRun(advanceRoutine(run, { type: 'COMPLETE_STEP', totalSteps: steps.length }))}>완료</button>
      <button onClick={() => setRun(advanceRoutine(run, { type: 'SKIP_STEP', totalSteps: steps.length }))}>건너뛰기</button>
      <button onClick={() => setRun(advanceRoutine(run, { type: 'ADD_MINUTES', minutes: 5 }))}>5분 추가</button>
    </div></article>}
    {run?.status === 'completed' && <p className="routine-card">루틴을 마쳤어요. 이제 한 가지만 시작해요.</p>}
  </section>
}
