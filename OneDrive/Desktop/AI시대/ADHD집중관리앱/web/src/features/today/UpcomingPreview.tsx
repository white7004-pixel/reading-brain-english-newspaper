import type { Task } from '../../core/model/task'

export function UpcomingPreview({ tasks, limit = 2 }: { tasks: Task[]; limit?: number }) {
  const upcoming = tasks.filter((task) => task.dueAt && task.status !== 'completed' && task.status !== 'canceled')
    .sort((a, b) => a.dueAt!.localeCompare(b.dueAt!)).slice(0, limit)
  return <section className="upcoming-preview" aria-labelledby="upcoming-heading">
    <div className="section-heading"><h2 id="upcoming-heading">다음 일정</h2><span>{upcoming.length ? `${upcoming.length}개 미리보기` : '여유 있는 하루'}</span></div>
    {upcoming.length ? <ol>{upcoming.map((task) => <li key={task.id} data-testid="upcoming-item">
      <time dateTime={task.dueAt}>{new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(task.dueAt!))}</time>
      <strong>{task.title}</strong><span>{task.estimateMinutes}분</span>
    </li>)}</ol> : <p>시간이 정해진 일정이 없어요.</p>}
  </section>
}
