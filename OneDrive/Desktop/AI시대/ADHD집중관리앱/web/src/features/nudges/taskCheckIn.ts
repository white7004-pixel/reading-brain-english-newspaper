import type { CoachAction } from './taskMastery'

export type LegacyTaskCheckInAction = 'done' | 'in_progress' | 'later'
export type TaskCheckInAction = CoachAction | LegacyTaskCheckInAction

export interface TaskCheckInResponse {
  taskId: string
  action: TaskCheckInAction
  remindAt?: string
  respondedAt: string
}

const storageKey = 'monggle.task-check-in.v1'
const actions = new Set<TaskCheckInAction>([
  'start', 'remind_5', 'reschedule', 'cancel', 'done', 'in_progress', 'later',
])

function parseResponse(saved: string | null): TaskCheckInResponse | null {
  if (!saved) return null
  try {
    const value = JSON.parse(saved) as Partial<TaskCheckInResponse>
    if (typeof value.taskId !== 'string' || typeof value.respondedAt !== 'string') return null
    if (typeof value.action !== 'string' || !actions.has(value.action as TaskCheckInAction)) return null
    if (value.remindAt !== undefined && typeof value.remindAt !== 'string') return null
    return value as TaskCheckInResponse
  } catch {
    return null
  }
}

export const taskCheckInRepository = {
  load(): TaskCheckInResponse | null {
    return parseResponse(localStorage.getItem(storageKey))
  },
  save(response: TaskCheckInResponse) {
    localStorage.setItem(storageKey, JSON.stringify(response))
    window.dispatchEvent(new Event('monggle:task-check-in-changed'))
  },
  clear() {
    localStorage.removeItem(storageKey)
  },
}
