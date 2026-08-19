import { useMemo, useState } from 'react'
import { breakIntoSteps } from './taskBreakdown'

function clock(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export function FocusScreen({ title, minutes }: { title: string; minutes: number }) {
  const [seconds, setSeconds] = useState(minutes * 60)
  const [running, setRunning] = useState(false)
  const steps = useMemo(() => breakIntoSteps(title), [title])
  return <section className="focus-screen">
    <span>지금 하나만</span>
    <h2>{title}</h2>
    <div className="focus-clock" aria-label="남은 시간">{clock(seconds)}</div>
    <ol>{steps.map((step) => <li key={step.id}><input type="checkbox" aria-label={step.title} /> <span>{step.title}</span><small>{step.minutes}분</small></li>)}</ol>
    <div className="focus-actions">
      <button className="primary" onClick={() => setRunning(!running)}>{running ? '일시정지' : '시작'}</button>
      <button onClick={() => setSeconds((value) => value + 300)}>5분 추가</button>
      <button>완료</button>
    </div>
  </section>
}
