import type { Task } from '../../core/model/task'

export function TodayTaskBoard({ tasks, recommendedTaskId, onStart, onComplete }: {
  tasks: Task[]
  recommendedTaskId?: string
  onStart: (task: Task) => void
  onComplete: (task: Task) => void
}) {
  const visible = tasks.filter((task) => task.status !== 'canceled' && task.status !== 'deferred')
    .sort((a, b) => Number(a.status === 'completed') - Number(b.status === 'completed') || a.priority - b.priority)
  return <section className="today-task-board" aria-label="오늘 할 일">
    <div className="task-board-heading"><h2>오늘 할 일</h2><span>{visible.filter((task) => task.status !== 'completed').length}개 남음</span></div>
    {visible.length ? <ol>{visible.map((task) => {
      const completed = task.status === 'completed'
      return <li key={task.id} className={`${completed ? 'is-completed' : ''} ${task.id === recommendedTaskId ? 'is-recommended' : ''}`}>
        <button className="task-check" type="button" aria-label={`${task.title} ${completed ? '완료됨' : '완료'}`} aria-pressed={completed} onClick={() => { if (!completed) onComplete(task) }}>{completed ? '✓' : ''}</button>
        <div><strong>{task.title}</strong><small>{task.dueAt ? new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(task.dueAt)) : '시간 미정'} · {task.estimateMinutes}분</small></div>
        {!completed && <button className="task-start" type="button" aria-label={`${task.title} 지금 하기`} onClick={() => onStart(task)}>{task.id === recommendedTaskId ? '지금 하기' : '시작'}</button>}
      </li>
    })}</ol> : <div className="task-board-empty"><strong>오늘 할 일이 없어요</strong><span>오른쪽 위 추가 버튼으로 첫 할 일을 적어보세요.</span></div>}
  </section>
}
