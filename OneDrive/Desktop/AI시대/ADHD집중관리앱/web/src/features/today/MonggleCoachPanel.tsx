import type { PetGameState } from '../pet/model'
import { PetHero } from '../pet/PetHero'
import {
  coachActionLabels,
  coachStageLabels,
  type CoachAction,
  type CoachDecision,
} from '../nudges/taskMastery'

export interface MonggleCoachPanelProps {
  state: PetGameState
  coachLine: string
  decision?: CoachDecision
  suppressed?: boolean
  onRespond?: (action: CoachAction, delayMinutes?: number) => void
  onReschedule?: () => void
  onCancel?: () => void
}

export function MonggleCoachPanel({
  state,
  coachLine,
  decision,
  suppressed = false,
  onRespond,
  onReschedule,
  onCancel,
}: MonggleCoachPanelProps) {
  const announcementSuppressed = suppressed || decision?.nextPromptAt === null
  const respond = (action: CoachAction) => {
    if (action === 'reschedule') return onReschedule?.()
    if (action === 'cancel') return onCancel?.()
    if (action === 'remind_5') return onRespond?.(action, 5)
    onRespond?.(action)
  }

  return <section className="monggle-coach-panel" aria-label="몽글 코치">
    <PetHero state={state} />
    <div className="monggle-coach-panel__copy">
      <span aria-hidden="true">몽글 코치</span>
      <div role={announcementSuppressed ? undefined : 'status'} aria-live={announcementSuppressed ? 'off' : 'polite'}>
        {decision && <strong>{coachStageLabels[decision.stage]}</strong>}
        <p>{decision?.line ?? coachLine}</p>
      </div>
      {decision && <div className="monggle-coach-panel__actions" aria-label="코칭 행동">
        {decision.actions.map((action) => <button
          className="coach-action"
          key={action}
          type="button"
          onClick={() => respond(action)}
        >{coachActionLabels[action]}</button>)}
      </div>}
      <small><span>경험치 {state.xp}</span><span>코인 {state.coins}</span></small>
    </div>
  </section>
}
