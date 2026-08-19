import type { Category } from '../../core/model/category'
import type { Task } from '../../core/model/task'
import { sortPriorityTasks } from './sortPriorityTasks'

const priorityLabel = { 1: '낮음', 2: '보통', 3: '높음' } as const

function deadlineLabel(dueAt?: string) {
  if (!dueAt) return null
  return new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(dueAt))
}

export function PriorityTaskList({ tasks, categories, activeTaskId, selectedCategoryId, onSelectCategory }: {
  tasks: Task[]
  categories: Category[]
  activeTaskId?: string | null
  selectedCategoryId: string
  onSelectCategory: (categoryId: string) => void
}) {
  const visibleTasks = sortPriorityTasks(tasks, selectedCategoryId)
  const categoriesById = new Map(categories.map((category) => [category.id, category]))

  return <section className="priority-task-section" aria-labelledby="priority-task-heading">
    <header className="priority-task-heading">
      <div><span>끝낼 순서</span><h2 id="priority-task-heading">오늘의 우선순위</h2></div>
      <strong>{visibleTasks.filter((task) => task.status !== 'completed').length}개 남음</strong>
    </header>
    <div className="category-tabs" aria-label="할 일 분류">
      <button type="button" aria-pressed={selectedCategoryId === 'all'} onClick={() => onSelectCategory('all')}>전체</button>
      {categories.map((category) => <button
        type="button"
        key={category.id}
        aria-pressed={selectedCategoryId === category.id}
        onClick={() => onSelectCategory(category.id)}
      ><i style={{ backgroundColor: category.color }} />{category.name}</button>)}
    </div>
    {visibleTasks.length === 0 ? <p className="priority-empty">이 분류에는 아직 할 일이 없어요.</p> : <ol className="priority-task-list">
      {visibleTasks.map((task, index) => {
        const category = categoriesById.get(task.categoryId ?? '') ?? categoriesById.get('personal')
        const isActive = task.id === activeTaskId || task.status === 'active'
        const isCompleted = task.status === 'completed'
        return <li key={task.id} className={isActive ? 'is-active' : isCompleted ? 'is-completed' : ''}>
          <span className="priority-rank">{index + 1}</span>
          <div className="priority-task-copy">
            <div className="priority-task-title"><strong>{task.title}</strong>{isActive && <em>지금 집중</em>}{isCompleted && <em>완료</em>}</div>
            <div className="priority-task-meta">
              <span><i style={{ backgroundColor: category?.color }} />{category?.name ?? '개인'}</span>
              <span className={`priority-level priority-${task.priority}`}>{priorityLabel[task.priority]}</span>
              <span>{task.estimateMinutes}분</span>
              {deadlineLabel(task.dueAt) && <span>마감 {deadlineLabel(task.dueAt)}</span>}
            </div>
          </div>
        </li>
      })}
    </ol>}
  </section>
}
