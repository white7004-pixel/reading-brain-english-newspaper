import type { Task } from '../../core/model/task'

export type Energy = 'low' | 'medium' | 'high'

const open = (task: Task) => task.status !== 'completed' && task.status !== 'canceled'

export function selectNowTask(tasks: Task[], now = new Date()): Task | null {
  const candidates = tasks.filter(open)
  const active = candidates.find((task) => task.status === 'active')
  if (active) return active
  return candidates.sort((a, b) => {
    const aDue = a.dueAt ? new Date(a.dueAt).getTime() : Number.POSITIVE_INFINITY
    const bDue = b.dueAt ? new Date(b.dueAt).getTime() : Number.POSITIVE_INFINITY
    const aOverdue = aDue < now.getTime()
    const bOverdue = bDue < now.getTime()
    if (aOverdue !== bOverdue) return aOverdue ? -1 : 1
    if (aDue !== bDue) return aDue - bDue
    return b.priority - a.priority
  })[0] ?? null
}

export function selectCurrentMission(tasks: Task[], now = new Date()): Task | null {
  return selectNowTask(tasks.filter((task) => task.required && task.status !== 'completed' && task.status !== 'canceled'), now)
}

export function recommendForEnergy(tasks: Task[], energy: Energy, now = new Date()): Task | null {
  const locked = tasks.filter((task) => task.status === 'active' || (task.dueAt && new Date(task.dueAt) < now))
  if (locked.length) return selectNowTask(locked, now)
  if (energy === 'low') return [...tasks].filter(open).sort((a, b) => a.estimateMinutes - b.estimateMinutes)[0] ?? null
  if (energy === 'high') return [...tasks].filter(open).sort((a, b) => b.priority - a.priority)[0] ?? null
  return selectNowTask(tasks, now)
}
