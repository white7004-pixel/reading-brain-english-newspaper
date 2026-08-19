export type TaskStatus = 'open' | 'active' | 'completed' | 'deferred' | 'canceled'
export type TaskCategory = 'study' | 'work' | 'life' | 'exercise' | 'rest'
export type TaskSource = 'manual' | 'local_parser'

export interface Task {
  id: string
  title: string
  day: string
  status: TaskStatus
  priority: 1 | 2 | 3
  estimateMinutes: number
  category: TaskCategory
  dueAt?: string
  orderAfterTaskId?: string
  source: TaskSource
  parseConfidence?: number
  createdAt: string
  updatedAt: string
}
