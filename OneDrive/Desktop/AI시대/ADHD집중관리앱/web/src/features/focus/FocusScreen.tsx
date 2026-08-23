import { useEffect, useMemo, useRef, useState } from 'react'
import { breakIntoSteps } from './taskBreakdown'
import { emitCompanionEvent } from '../companion/companionEvents'
import { extendTimer, remainingSeconds, startTimer, type FocusTimerState } from './focusTimer'

function clock(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export function FocusScreen({ title, minutes, taskId, autoStart = false, onComplete, onExit }: {
  title: string
  minutes: number
  taskId?: string
  autoStart?: boolean
  onComplete?: (result: { elapsedMinutes: number }) => void
  onExit?: () => void
}) {
  const [seconds, setSeconds] = useState(minutes * 60)
  const [timer, setTimer] = useState<FocusTimerState | null>(() => autoStart ? startTimer(taskId ?? title, minutes) : null)
  const completionReportedRef = useRef(false)
  const steps = useMemo(() => breakIntoSteps(title), [title])
  const reportCompletion = (remaining: number) => {
    if (completionReportedRef.current) return
    completionReportedRef.current = true
    const elapsedMinutes = Math.max(minutes, Math.floor((minutes * 60 - remaining) / 60))
    emitCompanionEvent('task_completed')
    onComplete?.({ elapsedMinutes })
  }
  useEffect(() => {
    if (!timer) return
    const tick = () => {
      const remaining = remainingSeconds(timer)
      setSeconds(remaining)
      if (remaining === 0) {
        setTimer(null)
        reportCompletion(remaining)
      }
    }
    tick()
    const interval = window.setInterval(tick, 1_000)
    return () => window.clearInterval(interval)
  }, [timer])
  const start = () => {
    if (timer) {
      setTimer(null)
      return
    }
    if (seconds === 0) setSeconds(minutes * 60)
    const duration = seconds === 0 ? minutes : seconds / 60
    setTimer(startTimer(taskId ?? title, duration))
    emitCompanionEvent('focus_started')
  }
  return <section className="focus-screen" aria-label="집중 세션">
    <span>이 목표를 완료로 바꾸기</span>
    <h2>{title}</h2>
    <div className="focus-clock" aria-label="남은 시간">{clock(seconds)}</div>
    <ol>{steps.map((step) => <li key={step.id}><input type="checkbox" aria-label={step.title} /> <span>{step.title}</span><small>{step.minutes}분</small></li>)}</ol>
    <div className="focus-actions">
      <button className="primary" onClick={start}>{timer ? '일시정지' : '시작'}</button>
      <button onClick={() => timer ? setTimer(extendTimer(timer, 5)) : setSeconds((value) => value + 300)}>5분 추가</button>
      <button onClick={() => { setTimer(null); reportCompletion(seconds) }}>완료</button>
      {onExit && <button onClick={onExit}>집중 나가기</button>}
    </div>
  </section>
}
