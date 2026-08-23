import type { Task } from '../../core/model/task'
import { completeMission } from '../missions/missionState'
import type { WidgetCompletionEvent } from './nativeWidgetBridge'

export function mergeWidgetEvents(tasks: Task[], events: WidgetCompletionEvent[]) {
  return [...events]
    .sort((left, right) => left.completedAt.localeCompare(right.completedAt))
    .reduce((current, event) => current.map((task) => {
      if (task.id !== event.taskId || task.updatedAt >= event.completedAt) return task
      if (event.response === 'later') return task
      if (event.response === 'working') return { ...task, status: 'active' as const, updatedAt: event.completedAt }
      return task.required
        ? completeMission(task, new Date(event.completedAt))
        : { ...task, status: 'completed' as const, completedAt: event.completedAt, updatedAt: event.completedAt }
    }), tasks)
}
