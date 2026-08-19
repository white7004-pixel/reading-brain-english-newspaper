export type TaskCheckInAction = 'done' | 'in_progress' | 'later'

export interface TaskCheckInResponse {
  taskId: string
  action: TaskCheckInAction
  remindAt?: string
  respondedAt: string
}

const storageKey = 'monggle.task-check-in.v1'

export const taskCheckInRepository = {
  load(): TaskCheckInResponse | null {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) as TaskCheckInResponse : null
  },
  save(response: TaskCheckInResponse) {
    localStorage.setItem(storageKey, JSON.stringify(response))
  },
  clear() {
    localStorage.removeItem(storageKey)
  },
}
