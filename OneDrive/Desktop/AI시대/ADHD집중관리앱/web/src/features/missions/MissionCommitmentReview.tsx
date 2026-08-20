import { useState } from 'react'
import type { Task } from '../../core/model/task'
import { commitMission } from './missionState'

type CommitmentDraft = {
  firstAction: string
  scheduledStart?: string
  timeLocked: boolean
}

function initialDraft(task: Task): CommitmentDraft {
  return {
    firstAction: task.firstAction ?? '',
    scheduledStart: task.scheduledStart?.slice(0, 16),
    timeLocked: task.timeLocked ?? false,
  }
}

export function MissionCommitmentReview({ tasks, onConfirm, now = new Date() }: {
  tasks: Task[]
  onConfirm: (tasks: Task[]) => void
  now?: Date
}) {
  const [drafts, setDrafts] = useState(() => new Map(tasks.map((task) => [task.id, initialDraft(task)])))
  const update = (task: Task, patch: Partial<CommitmentDraft>) => {
    setDrafts((current) => new Map(current).set(task.id, { ...current.get(task.id)!, ...patch }))
  }

  return <section className="mission-commitment-review" aria-label="필수 미션 검토">
    <div className="section-heading"><div><span>오늘의 약속</span><h2>필수 미션을 정해요</h2></div></div>
    <p>완료 전까지 유지할 미션과 바로 할 첫 행동을 확인해 주세요.</p>
    <div className="mission-commitment-list">{tasks.map((task) => {
      const draft = drafts.get(task.id) ?? initialDraft(task)
      return <article key={task.id}>
        <strong>{task.title}</strong>
        <small>예상 {task.estimateMinutes}분</small>
        <label>첫 행동<input value={draft.firstAction} onChange={(event) => update(task, { firstAction: event.target.value })} /></label>
        <label>희망 시간<input type="datetime-local" value={draft.scheduledStart ?? ''} onChange={(event) => update(task, { scheduledStart: event.target.value || undefined })} /></label>
        <label className="check-row"><input type="checkbox" checked={draft.timeLocked} onChange={(event) => update(task, { timeLocked: event.target.checked })} />시간 고정</label>
      </article>
    })}</div>
    <div className="capture-actions"><button className="primary" type="button" onClick={() => onConfirm(tasks.map((task) => commitMission(task, drafts.get(task.id) ?? initialDraft(task), now)))}>필수 미션 확정</button></div>
  </section>
}
