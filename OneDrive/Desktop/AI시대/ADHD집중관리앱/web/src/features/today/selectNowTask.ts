import type { Task } from '../../core/model/task'
import { dayInSeoul } from '../../core/time/seoulDay'

export type Energy = 'low' | 'medium' | 'high'

export function isTaskEligible(task: Task, now = new Date()) {
  if (task.status === 'completed' || task.status === 'canceled') return false
  if (task.status !== 'deferred') return true
  if (task.scheduledStart) {
    const scheduledStart = new Date(task.scheduledStart).getTime()
    if (!Number.isNaN(scheduledStart)) return scheduledStart <= now.getTime()
  }
  return task.day <= dayInSeoul(now)
}

function compareDueAndPriority(a: Task, b: Task, now: Date) {
  const aDue = a.dueAt ? new Date(a.dueAt).getTime() : Number.POSITIVE_INFINITY
  const bDue = b.dueAt ? new Date(b.dueAt).getTime() : Number.POSITIVE_INFINITY
  const aOverdue = aDue < now.getTime()
  const bOverdue = bDue < now.getTime()
  if (aOverdue !== bOverdue) return aOverdue ? -1 : 1
  if (aDue !== bDue) return aDue - bDue
  return b.priority - a.priority
}

export function selectNowTask(tasks: Task[], now = new Date()): Task | null {
  const candidates = tasks.filter((task) => isTaskEligible(task, now))
  const active = candidates.find((task) => task.status === 'active')
  if (active) return active
  return candidates.sort((a, b) => compareDueAndPriority(a, b, now))[0] ?? null
}

export function selectCurrentMission(tasks: Task[], now = new Date()): Task | null {
  return tasks
    .filter((task) => task.required && isTaskEligible(task, now))
    .sort((a, b) => {
      const aActive = a.status === 'active'
      const bActive = b.status === 'active'
      if (aActive !== bActive) return aActive ? -1 : 1
      const commitmentOrder = (a.commitmentDay ?? a.day).localeCompare(b.commitmentDay ?? b.day)
      return commitmentOrder || compareDueAndPriority(a, b, now)
    })[0] ?? null
}

export function recommendForEnergy(tasks: Task[], energy: Energy, now = new Date()): Task | null {
  const eligible = tasks.filter((task) => isTaskEligible(task, now))
  const locked = eligible.filter((task) => task.status === 'active' || (task.dueAt && new Date(task.dueAt) < now))
  if (locked.length) return selectNowTask(locked, now)
  if (energy === 'low') return eligible.sort((a, b) => a.estimateMinutes - b.estimateMinutes)[0] ?? null
  if (energy === 'high') return eligible.sort((a, b) => b.priority - a.priority)[0] ?? null
  return selectNowTask(eligible, now)
}
