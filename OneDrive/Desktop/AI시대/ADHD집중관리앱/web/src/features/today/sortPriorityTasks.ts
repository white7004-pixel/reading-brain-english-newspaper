import type { Task } from '../../core/model/task'

const completed = (task: Task) => task.status === 'completed' ? 1 : 0
const active = (task: Task) => task.status === 'active' ? 0 : 1

export function sortPriorityTasks(tasks: Task[], categoryId: string | 'all'): Task[] {
  return tasks
    .map((task, index) => ({ task, index }))
    .filter(({ task }) => categoryId === 'all' || task.categoryId === categoryId)
    .sort((a, b) => {
      const byCompletion = completed(a.task) - completed(b.task)
      if (byCompletion) return byCompletion
      const byActive = active(a.task) - active(b.task)
      if (byActive) return byActive
      const byPriority = b.task.priority - a.task.priority
      if (byPriority) return byPriority
      if (a.task.dueAt && !b.task.dueAt) return -1
      if (!a.task.dueAt && b.task.dueAt) return 1
      const byDue = (a.task.dueAt ?? '').localeCompare(b.task.dueAt ?? '')
      if (byDue) return byDue
      const byCreated = a.task.createdAt.localeCompare(b.task.createdAt)
      return byCreated || a.index - b.index
    })
    .map(({ task }) => task)
}
