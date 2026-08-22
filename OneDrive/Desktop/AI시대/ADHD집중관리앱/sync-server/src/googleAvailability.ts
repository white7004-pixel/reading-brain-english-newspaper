export interface BusyBlock { start: string; end: string }

export function normalizeBusyBlocks(value: unknown): BusyBlock[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return []
    const start = 'start' in entry && typeof entry.start === 'string' ? entry.start : ''
    const end = 'end' in entry && typeof entry.end === 'string' ? entry.end : ''
    if (!start || !end || new Date(end) <= new Date(start)) return []
    return [{ start: new Date(start).toISOString(), end: new Date(end).toISOString() }]
  }).sort((left, right) => left.start.localeCompare(right.start))
}
