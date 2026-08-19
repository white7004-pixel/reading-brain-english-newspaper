import type { Task } from '../../core/model/task'
import type { WidgetCompletionEvent } from './nativeWidgetBridge'

export function mergeWidgetEvents(tasks: Task[], events: WidgetCompletionEvent[]) {
  return [...events]
    .sort((left, right) => left.completedAt.localeCompare(right.completedAt))
    .reduce((current, event) => current.map((task) => {
      if (task.id !== event.taskId || task.updatedAt >= event.completedAt) return task
      if (event.response === 'later') return task
      return { ...task, status: event.response === 'working' ? 'active' as const : 'completed' as const, updatedAt: event.completedAt }
    }), tasks)
}
