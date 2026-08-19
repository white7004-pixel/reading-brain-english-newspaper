import type { Task } from '../../core/model/task'

export interface WidgetTask {
  id: string
  title: string
  completed: boolean
  dueAt?: string
  updatedAt: string
}

export interface WidgetSnapshot {
  generatedAt: string
  remainingCount: number
  tasks: WidgetTask[]
  nudgeLine: string
}

export function buildWidgetSnapshot(tasks: Task[], nudgeLine: string, now = new Date()): WidgetSnapshot {
  const remaining = tasks.filter((task) => !['completed', 'canceled'].includes(task.status))
  return {
    generatedAt: now.toISOString(),
    remainingCount: remaining.length,
    tasks: remaining.slice(0, 3).map((task) => ({
      id: task.id,
      title: task.title,
      completed: false,
      dueAt: task.dueAt,
      updatedAt: task.updatedAt,
    })),
    nudgeLine,
  }
}
