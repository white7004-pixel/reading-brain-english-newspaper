import type { Task } from '../../core/model/task'
import { completeMission } from '../missions/missionState'
import { selectCurrentMission, selectNowTask } from '../today/selectNowTask'
import type { TaskCheckInResponse } from './taskCheckIn'

export type { TaskCheckInResponse } from './taskCheckIn'

export function nextNudgeAt(now: Date, intervalMinutes: 30 | 60 | 120) {
  return new Date(now.getTime() + intervalMinutes * 60_000)
}

function timeInSeoul(now: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return Number(values.hour) * 60 + Number(values.minute)
}

function minutes(value: string) {
  const [hour, minute] = value.split(':').map(Number)
  return hour * 60 + minute
}

export function isQuietTime(now: Date, quietStart: string, quietEnd: string) {
  const current = timeInSeoul(now)
  const start = minutes(quietStart)
  const end = minutes(quietEnd)
  return start <= end ? current >= start && current < end : current >= start || current < end
}

export function selectNudgeTask(tasks: Task[], now: Date, latestResponse: TaskCheckInResponse | null = null) {
  const open = tasks.filter((task) => !['completed', 'canceled'].includes(task.status))
  if (latestResponse?.action === 'later' && latestResponse.remindAt) {
    const delayed = open.find((task) => task.id === latestResponse.taskId)
    if (new Date(latestResponse.remindAt) > now) {
      const withoutDelayed = open.filter((task) => task.id !== latestResponse.taskId)
      return selectCurrentMission(withoutDelayed, now) ?? (delayed?.required ? null : selectNowTask(withoutDelayed, now))
    }
  }
  return selectCurrentMission(open, now) ?? selectNowTask(open, now)
}

export function buildNudgeLine(task: Task) {
  if (task.status === 'active') return `${task.title} 하는 중이지? 지금 흐름만 이어가도 좋아.`
  return `${task.title} 했어? 한 단계만 해도 좋아.`
}

export function applyCheckInResponse(tasks: Task[], response: TaskCheckInResponse, now: Date) {
  const updatedAt = now.toISOString()
  const nextTasks = tasks.map((task) => {
    if (task.id !== response.taskId) return task
    if (response.action === 'done') {
      return task.required
        ? completeMission(task, now)
        : { ...task, status: 'completed' as const, completedAt: updatedAt, updatedAt }
    }
    if (response.action === 'in_progress') return { ...task, status: 'active' as const, updatedAt }
    return task
  })
  const nextTask = response.action === 'in_progress'
    ? nextTasks.find((task) => task.id === response.taskId) ?? null
    : selectNudgeTask(nextTasks, now, response)
  return { tasks: nextTasks, nextTaskId: nextTask?.id ?? null }
}
