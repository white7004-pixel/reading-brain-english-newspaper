import type { Task } from '../../core/model/task'

export function NowCard({ task }: { task: Task | null }) {
  return <section className="now-card">
    <span>지금 하나만</span>
    {task ? <><h2>{task.title}</h2><p>약 {task.estimateMinutes}분</p><div><button className="primary">집중 시작</button><button>완료</button><button>10분 미루기</button></div></> : <><h2>가볍게 하나 적어볼까요?</h2><p>시작할 일이 생기면 여기에 하나만 보여드려요.</p></>}
  </section>
}
