export type TaskStatus = 'open' | 'active' | 'completed' | 'deferred' | 'canceled'
export type TaskCategory = 'study' | 'work' | 'life' | 'exercise' | 'rest'
export type TaskSource = 'manual' | 'local_parser' | 'kakaotalk' | 'kakaowork' | 'google_calendar'
import type { CategoryId } from './category'

export interface MissionCommitment {
  required: boolean
  commitmentDay: string
  firstAction: string
  scheduledStart?: string
  timeLocked: boolean
  committedAt: string
  completedAt?: string
}

export interface Task {
  id: string
  title: string
  day: string
  status: TaskStatus
  priority: 1 | 2 | 3
  estimateMinutes: number
  category: TaskCategory
  categoryId?: CategoryId
  personaIds?: string[]
  recurringInstanceId?: string
  sourceRef?: string
  dueAt?: string
  orderAfterTaskId?: string
  source: TaskSource
  parseConfidence?: number
  required?: boolean
  commitmentDay?: string
  firstAction?: string
  scheduledStart?: string
  timeLocked?: boolean
  committedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}
