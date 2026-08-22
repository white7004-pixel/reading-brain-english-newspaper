export const GOOGLE_FREE_BUSY_SCOPE = 'https://www.googleapis.com/auth/calendar.events.freebusy'

export interface BusyBlock {
  start: string
  end: string
}

export interface CalendarConnection {
  accountId: string
  displayName: string
  connectedAt: string
  scope: typeof GOOGLE_FREE_BUSY_SCOPE
}

export interface AvailabilitySnapshot {
  accountId: string
  timeZone: string
  rangeStart: string
  rangeEnd: string
  fetchedAt: string
  expiresAt: string
  busy: BusyBlock[]
}

export interface MissionMove {
  taskId: string
  from?: string
  to: string
}

export type RescheduleProposal =
  | { kind: 'fresh'; createdAt: string; moves: MissionMove[] }
  | { kind: 'stale' | 'no_connection'; moves: [] }
