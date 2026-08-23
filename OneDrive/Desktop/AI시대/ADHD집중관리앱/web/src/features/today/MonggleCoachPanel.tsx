import type { PetGameState } from '../pet/model'
import { PetHero } from '../pet/PetHero'

export function MonggleCoachPanel({ state, coachLine }: { state: PetGameState; coachLine: string }) {
  return <section className="monggle-coach-panel" aria-label="몽글 코치">
    <PetHero state={state} />
    <div className="monggle-coach-panel__copy">
      <span aria-hidden="true">몽글 코치</span>
      <p role="status" aria-live="polite">{coachLine}</p>
      <small><span>경험치 {state.xp}</span><span>코인 {state.coins}</span></small>
    </div>
  </section>
}
