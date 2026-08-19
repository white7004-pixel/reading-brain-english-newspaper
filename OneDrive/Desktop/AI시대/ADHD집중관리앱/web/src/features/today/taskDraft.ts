import type { Task } from '../../core/model/task'

export interface TaskDraft {
  id: string
  title: string
  day: string
  dueAt?: string
  priority: Task['priority']
  estimateMinutes: number
  orderAfterDraftId?: string
  confidence: number
  needsReview: boolean
}
