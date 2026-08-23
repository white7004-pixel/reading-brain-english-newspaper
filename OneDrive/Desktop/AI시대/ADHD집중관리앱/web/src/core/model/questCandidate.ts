import type { QuestCategory } from './recurrence'

export interface QuestCandidate {
  id: string
  source: 'kakaotalk' | 'kakaowork' | 'google_calendar'
  sourceRef: string
  title: string
  personaIds: string[]
  category: QuestCategory
  dueAt?: string
  estimateMinutes: number
  firstAction?: string
  status: 'pending_review' | 'accepted' | 'dismissed'
}

export interface ExternalCalendarEvent {
  id: string
  sourceRef: string
  title: string
  startsAt: string
  endsAt: string
  status: 'confirmed' | 'canceled'
}
