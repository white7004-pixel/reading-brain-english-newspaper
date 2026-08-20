import type { Task } from '../../core/model/task'

export type MissionMode = 'normal' | 'extended'
export type MissionEscalationLevel = 'push' | 'widget' | 'app-entry'

export function dayInSeoul(now: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

export function missionMode(tasks: Task[], now: Date): MissionMode {
  const today = dayInSeoul(now)
  return tasks.some((task) => task.required && task.status !== 'completed' && task.status !== 'canceled' && task.commitmentDay && task.commitmentDay < today)
    ? 'extended'
    : 'normal'
}
