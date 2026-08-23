import type { Task } from '../../core/model/task'
import type { RewardGrant } from '../pet/model'

export function FeaturedQuest({ task, reward, personaNames = [], completing = false, onStart, onComplete }: {
  task: Task
  reward: RewardGrant
  personaNames?: string[]
  completing?: boolean
  onStart: (task: Task) => void
  onComplete?: (task: Task) => void
}) {
  return <section className="featured-quest" aria-label="메인 퀘스트">
    <div className="featured-quest__copy">
      <span>메인 퀘스트{personaNames.length > 0 ? ' · ' + personaNames.join(' · ') : ''}</span>
      <h2>{task.title}</h2>
      {task.firstAction && <p>첫 행동: {task.firstAction}</p>}
      <p>예상 {task.estimateMinutes}분 · 완료하면 경험치 +{reward.xp}, 코인 +{reward.coins}</p>
    </div>
    <div className="featured-quest__actions">
      {onComplete && <button type="button" aria-label={task.title + ' 완료'} disabled={completing} onClick={() => onComplete(task)}>{completing ? '완료 저장 중' : '완료'}</button>}
      <button type="button" disabled={completing} onClick={() => onStart(task)}>3분만 시작</button>
    </div>
  </section>
}
