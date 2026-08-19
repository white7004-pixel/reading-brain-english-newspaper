import type { Task } from '../../core/model/task'

export function NowCard({ task }: { task: Task | null }) {
  return <section className="now-card">
    <span>오늘의 마스터 목표</span>
    {task ? <><h2>{task.title}</h2><p>약 {task.estimateMinutes}분 · 끝낼 때까지 한 가지에 집중</p><div><button className="primary">지금 시작</button><button>완료</button><button>10분 후 재도전</button></div></> : <><h2>오늘 끝낼 목표를 적어주세요</h2><p>목표를 등록하면 몽글이가 완료할 때까지 함께해요.</p></>}
  </section>
}
