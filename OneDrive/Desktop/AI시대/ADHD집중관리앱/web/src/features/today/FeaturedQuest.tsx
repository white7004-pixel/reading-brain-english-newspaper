import type { Task } from '../../core/model/task'
import type { RewardGrant } from '../pet/model'

export function FeaturedQuest({ task, reward, onStart }: {
  task: Task
  reward: RewardGrant
  onStart: (task: Task) => void
}) {
  return <section className="featured-quest" aria-label="추천 퀘스트">
    <div className="featured-quest__copy">
      <span>추천 퀘스트</span>
      <h2>{task.title}</h2>
      <p>예상 {task.estimateMinutes}분 · 완료하면 경험치 +{reward.xp}, 코인 +{reward.coins}</p>
    </div>
    <button type="button" onClick={() => onStart(task)}>3분만 시작</button>
  </section>
}
