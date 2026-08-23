import type { Task } from '../../core/model/task'
import { nextDayInSeoul, startOfSeoulDay } from '../../core/time/seoulDay'
import { uncommitMission } from '../missions/missionState'

export type RescueDecision = 'keep' | 'tomorrow' | 'five_minute' | 'cancel'

export function reschedulePlan(tasks: Task[], decisions: Record<string, RescueDecision>, now: Date) {
  const tomorrowDay = nextDayInSeoul(now)
  const tomorrowStart = startOfSeoulDay(tomorrowDay).toISOString()
  return {
    items: tasks.map((task): Task => {
      const decision = decisions[task.id] ?? 'keep'
      if (decision === 'tomorrow') return { ...task, day: tomorrowDay, status: 'deferred', scheduledStart: tomorrowStart, updatedAt: now.toISOString() }
      if (decision === 'five_minute') return { ...task, estimateMinutes: 5, status: 'open', updatedAt: now.toISOString() }
      if (decision === 'cancel') return { ...uncommitMission(task, now), status: 'canceled' }
      return task
    }),
  }
}
