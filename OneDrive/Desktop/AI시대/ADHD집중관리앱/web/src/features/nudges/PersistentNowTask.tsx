import type { Task } from '../../core/model/task'
import type { MissionEscalationLevel } from '../missions/extendedDay'
import {
  coachActionLabels,
  coachStageLabels,
  type CoachAction,
  type CoachDecision,
  type CoachStage,
} from './taskMastery'

export interface PersistentNowTaskProps {
  task: Task
  decision?: CoachDecision
  line?: string
  stage?: CoachStage
  suppressed?: boolean
  escalationLevel?: MissionEscalationLevel
  onRespond: (action: CoachAction, delayMinutes?: number) => void
  onReschedule?: () => void
  onCancel?: () => void
}

export function PersistentNowTask({
  task,
  decision,
  line,
  stage = 'gentle',
  suppressed = false,
  escalationLevel = 'push',
  onRespond,
  onReschedule,
  onCancel,
}: PersistentNowTaskProps) {
  const activeDecision: CoachDecision = decision ?? {
    stage,
    line: line ?? `${task.title}, 작은 첫 행동부터 시작해 볼까요?`,
    actions: ['start', 'remind_5'],
    nextPromptAt: new Date(),
  }
  const announcementSuppressed = suppressed || activeDecision.nextPromptAt === null

  const respond = (action: CoachAction) => {
    if (action === 'reschedule') return onReschedule?.()
    if (action === 'cancel') return onCancel?.()
    if (action === 'remind_5') return onRespond(action, 5)
    onRespond(action)
  }

  return <aside
    className="persistent-now-task"
    data-testid="persistent-now-task"
    data-stage={activeDecision.stage}
    data-escalation-level={escalationLevel}
    aria-label="몽글이의 지금 할 일 확인"
  >
    <img src="/assets/mascot/monggle-3d-approved-v1.png" alt="" />
    <div>
      <span aria-hidden="true">몽글 코치</span>
      <div role={announcementSuppressed ? undefined : 'status'} aria-live={announcementSuppressed ? 'off' : 'polite'}>
        <span className="persistent-now-task__stage">{coachStageLabels[activeDecision.stage]}</span>
        <strong>{activeDecision.line}</strong>
      </div>
      <div className="persistent-now-task__actions" aria-label="코칭 행동">
        {activeDecision.actions.map((action) => <button
          className="coach-action"
          key={action}
          type="button"
          onClick={() => respond(action)}
        >{coachActionLabels[action]}</button>)}
      </div>
    </div>
  </aside>
}
