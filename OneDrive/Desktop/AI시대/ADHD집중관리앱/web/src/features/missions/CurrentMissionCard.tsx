import type { Task } from '../../core/model/task'

export function CurrentMissionCard({ task, onStart, onDelay, onComplete, onReschedule }: {
  task: Task | null
  onStart: () => void
  onDelay: () => void
  onComplete: () => void
  onReschedule: () => void
}) {
  if (!task) return null

  return <section className="current-mission-card" aria-label="현재 필수 미션">
    <span>지금 할 한 가지</span>
    <h2>{task.title}</h2>
    <p><strong>첫 행동</strong> {task.firstAction ?? '첫 행동을 정해 주세요.'}</p>
    <small>예상 {task.estimateMinutes}분</small>
    <div>
      <button className="primary" type="button" onClick={onStart}>3분만 시작</button>
      <button type="button" onClick={onDelay}>5분 후 다시 알림</button>
      <button type="button" onClick={onReschedule}>일정 다시 잡기</button>
      <button type="button" onClick={onComplete}>완료했어요</button>
    </div>
  </section>
}
