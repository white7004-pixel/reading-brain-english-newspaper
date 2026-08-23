export type QuestCategory =
  | 'counseling'
  | 'operations'
  | 'curriculum'
  | 'marketing'
  | 'reading'
  | 'exercise'
  | 'gathering_personal'
  | 'other'

export type RecurrenceCadence =
  | { kind: 'daily' }
  | { kind: 'weekly'; weekdays: number[] }
  | { kind: 'monthly'; timing: 'first_business_day' | 'mid_month' | 'last_business_day' }

export interface RecurringTaskTemplate {
  id: string
  title: string
  personaIds: string[]
  category: QuestCategory
  cadence: RecurrenceCadence
  targetCount: number
  estimateMinutes: number
  firstAction?: string
  carryForward: boolean
  active: boolean
}

export interface RecurringTaskInstance {
  id: string
  templateId: string
  periodKey: string
  scheduledDay: string
  status: 'open' | 'completed' | 'missed' | 'canceled'
  completedAt?: string
}
