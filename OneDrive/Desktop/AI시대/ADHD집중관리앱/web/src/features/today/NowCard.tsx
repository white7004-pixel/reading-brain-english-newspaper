import type { Task } from '../../core/model/task'

export function NowCard({ task }: { task: Task | null }) {
  return <section className="now-card" aria-label="지금 할 일">
    <span>지금 할 일</span>
    {task ? <><h2>{task.title}</h2><p>약 {task.estimateMinutes}분 · 지금은 이것만 봐요</p><div><button className="primary">집중 시작</button></div></> : <><h2>아직 정한 일이 없어요</h2><p>작은 일 하나부터 가볍게 추가해 보세요.</p></>}
  </section>
}
