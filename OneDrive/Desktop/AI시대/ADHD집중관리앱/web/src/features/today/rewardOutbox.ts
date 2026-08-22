import type { RewardEvent } from '../pet/model'

const STORAGE_KEY = 'monggle:pending-completion-rewards'
const SCHEMA_VERSION = 1

interface RewardOutboxDocument {
  version: typeof SCHEMA_VERSION
  events: RewardEvent[]
}

function isRewardEvent(value: unknown): value is RewardEvent {
  if (!value || typeof value !== 'object') return false
  const event = value as Partial<RewardEvent>
  return typeof event.id === 'string'
    && typeof event.taskId === 'string'
    && typeof event.completedAt === 'string'
    && typeof event.focusMinutes === 'number'
    && Boolean(event.grant)
    && typeof event.grant?.xp === 'number'
    && typeof event.grant?.coins === 'number'
    && typeof event.grant?.food === 'number'
    && typeof event.grant?.hearts === 'number'
}

function read(): RewardEvent[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!parsed || typeof parsed !== 'object') return []
    const document = parsed as Partial<RewardOutboxDocument>
    return document.version === SCHEMA_VERSION && Array.isArray(document.events)
      ? document.events.filter(isRewardEvent)
      : []
  } catch {
    return []
  }
}

function write(events: RewardEvent[]) {
  if (typeof localStorage === 'undefined') throw new Error('Reward outbox storage is unavailable')
  const document: RewardOutboxDocument = { version: SCHEMA_VERSION, events }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(document))
}

export const rewardOutbox = {
  list: read,

  put(event: RewardEvent) {
    const events = read()
    const index = events.findIndex(({ id }) => id === event.id)
    if (index === -1) events.push(event)
    else events[index] = event
    write(events)
  },

  remove(eventId: string) {
    write(read().filter(({ id }) => id !== eventId))
  },
}
