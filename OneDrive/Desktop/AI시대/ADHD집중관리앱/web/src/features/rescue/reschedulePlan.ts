import type { Task } from '../../core/model/task'

export type RescueDecision = 'keep' | 'tomorrow' | 'five_minute' | 'cancel'

export function reschedulePlan(tasks: Task[], decisions: Record<string, RescueDecision>, now: Date) {
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowDay = tomorrow.toISOString().slice(0, 10)
  return {
    items: tasks.map((task): Task => {
      const decision = decisions[task.id] ?? 'keep'
      if (decision === 'tomorrow') return { ...task, day: tomorrowDay, status: 'deferred', updatedAt: now.toISOString() }
      if (decision === 'five_minute') return { ...task, estimateMinutes: 5, status: 'open', updatedAt: now.toISOString() }
      if (decision === 'cancel') return { ...task, status: 'canceled', updatedAt: now.toISOString() }
      return task
    }),
  }
}
