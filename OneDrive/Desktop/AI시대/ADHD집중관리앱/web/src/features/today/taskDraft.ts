import type { Task } from '../../core/model/task'
import type { CategoryId } from '../../core/model/category'

export interface TaskDraft {
  id: string
  title: string
  day: string
  dueAt?: string
  priority: Task['priority']
  categoryId: CategoryId
  estimateMinutes: number
  orderAfterDraftId?: string
  confidence: number
  needsReview: boolean
}
