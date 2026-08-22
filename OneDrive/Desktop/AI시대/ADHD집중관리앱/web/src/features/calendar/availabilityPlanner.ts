import type { AvailabilitySnapshot, BusyBlock, RescheduleProposal } from '../../core/model/calendarAvailability'
import type { Task } from '../../core/model/task'

const toMillis = (value: string) => new Date(value).getTime()

function mergedBusy(blocks: BusyBlock[]) {
  const sorted = blocks
    .map((block) => ({ start: toMillis(block.start), end: toMillis(block.end) }))
    .filter((block) => Number.isFinite(block.start) && block.end > block.start)
    .sort((left, right) => left.start - right.start)
  return sorted.reduce<Array<{ start: number; end: number }>>((result, block) => {
    const previous = result.at(-1)
    if (!previous || block.start > previous.end) result.push({ ...block })
    else previous.end = Math.max(previous.end, block.end)
    return result
  }, [])
}

function nextSlot(start: number, duration: number, rangeEnd: number, busy: Array<{ start: number; end: number }>) {
  let cursor = start
  for (const block of busy) {
    if (block.end <= cursor) continue
    if (cursor + duration <= block.start) return cursor
    cursor = Math.max(cursor, block.end)
  }
  return cursor + duration <= rangeEnd ? cursor : null
}

export function planMissionMoves(tasks: Task[], snapshot: AvailabilitySnapshot | undefined, now = new Date()): RescheduleProposal {
  if (!snapshot) return { kind: 'no_connection', moves: [] }
  if (toMillis(snapshot.expiresAt) <= now.getTime()) return { kind: 'stale', moves: [] }
  const busy = mergedBusy(snapshot.busy)
  const rangeStart = Math.max(toMillis(snapshot.rangeStart), now.getTime())
  const rangeEnd = toMillis(snapshot.rangeEnd)
  const moves = []

  for (const task of tasks) {
    if (!task.required || task.timeLocked || !task.scheduledStart || task.status === 'completed' || task.status === 'canceled') continue
    const currentStart = toMillis(task.scheduledStart)
    const duration = task.estimateMinutes * 60_000
    const conflicts = busy.some((block) => currentStart < block.end && currentStart + duration > block.start)
    if (!conflicts) continue
    const available = nextSlot(Math.max(currentStart, rangeStart), duration, rangeEnd, busy)
    if (available == null) return { kind: 'fresh', createdAt: now.toISOString(), moves: [] }
    moves.push({ taskId: task.id, from: task.scheduledStart, to: new Date(available).toISOString() })
    busy.push({ start: available, end: available + duration })
    busy.sort((left, right) => left.start - right.start)
  }

  return { kind: 'fresh', createdAt: now.toISOString(), moves }
}

export function applyMissionMoves(tasks: Task[], proposal: RescheduleProposal, now = new Date()) {
  if (proposal.kind !== 'fresh') return tasks
  const moves = new Map(proposal.moves.map((move) => [move.taskId, move]))
  return tasks.map((task) => {
    const move = moves.get(task.id)
    return move ? { ...task, scheduledStart: move.to, updatedAt: now.toISOString() } : task
  })
}

export function undoMissionMoves(tasks: Task[], proposal: RescheduleProposal, now = new Date()) {
  if (proposal.kind !== 'fresh') return tasks
  const moves = new Map(proposal.moves.map((move) => [move.taskId, move]))
  return tasks.map((task) => {
    const move = moves.get(task.id)
    return move ? { ...task, scheduledStart: move.from, updatedAt: now.toISOString() } : task
  })
}
