export type TaskStatus = 'open' | 'active' | 'completed' | 'deferred' | 'canceled'
export type TaskCategory = 'study' | 'work' | 'life' | 'exercise' | 'rest'

export interface Task {
  id: string
  title: string
  day: string
  status: TaskStatus
  priority: 1 | 2 | 3
  estimateMinutes: number
  category: TaskCategory
  dueAt?: string
  createdAt: string
  updatedAt: string
}
