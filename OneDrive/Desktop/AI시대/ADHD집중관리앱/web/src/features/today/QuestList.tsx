import type { Task } from '../../core/model/task'

const NO_COMPLETING_TASKS: ReadonlySet<string> = new Set()

export function QuestList({ tasks, completingTaskIds = NO_COMPLETING_TASKS, onStart, onComplete }: {
  tasks: Task[]
  completingTaskIds?: ReadonlySet<string>
  onStart: (task: Task) => void
  onComplete: (task: Task) => void
}) {
  const visible = tasks
    .filter((task) => task.status !== 'canceled' && task.status !== 'deferred')
    .sort((a, b) => Number(a.status === 'completed') - Number(b.status === 'completed') || b.priority - a.priority)

  return <section className="quest-list" aria-label="오늘 할 일">
    <div className="quest-list__heading">
      <h2>오늘의 퀘스트</h2>
      <span>{visible.filter((task) => task.status !== 'completed').length}개 남음</span>
    </div>
    {visible.length > 0 ? <ol>{visible.map((task) => {
      const completed = task.status === 'completed'
      const completing = completingTaskIds.has(task.id)
      return <li key={task.id} className={completed ? 'is-completed' : undefined}>
        <button
          className="task-check"
          type="button"
          aria-label={`${task.title} ${completed ? '완료됨' : completing ? '완료 저장 중' : '완료'}`}
          aria-pressed={completed}
          disabled={completed || completing}
          onClick={() => onComplete(task)}
        >{completed ? '✓' : ''}</button>
        <div>
          <strong>{task.title}</strong>
          <small>{task.dueAt ? new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(task.dueAt)) : '시간 미정'} · {task.estimateMinutes}분</small>
        </div>
        {!completed && <button className="task-start" type="button" aria-label={`${task.title} 지금 하기`} onClick={() => onStart(task)}>시작</button>}
      </li>
    })}</ol> : <div className="quest-list__empty">
      <strong>오늘 퀘스트가 없어요</strong>
      <span>작은 일 하나를 추가해 몽글이와 시작해 보세요.</span>
    </div>}
  </section>
}
