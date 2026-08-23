import { describe, expect, it } from 'vitest'
import type { AvailabilitySnapshot } from '../../core/model/calendarAvailability'
import type { Task } from '../../core/model/task'
import { applyMissionMoves, isBusyAt, planMissionMoves, undoMissionMoves } from './availabilityPlanner'

const now = new Date('2026-08-22T09:00:00+09:00')

function mission(id: string, overrides: Partial<Task> = {}): Task {
  return {
    id,
    title: id,
    day: '2026-08-22',
    status: 'open',
    priority: 2,
    estimateMinutes: 30,
    category: 'study',
    source: 'manual',
    required: true,
    commitmentDay: '2026-08-22',
    firstAction: 'start',
    scheduledStart: '2026-08-22T10:00:00+09:00',
    timeLocked: false,
    committedAt: '2026-08-22T08:00:00+09:00',
    createdAt: '2026-08-22T08:00:00+09:00',
    updatedAt: '2026-08-22T08:00:00+09:00',
    ...overrides,
  }
}

function snapshot(overrides: Partial<AvailabilitySnapshot> = {}): AvailabilitySnapshot {
  return {
    accountId: 'account-1',
    timeZone: 'Asia/Seoul',
    rangeStart: '2026-08-22T09:00:00+09:00',
    rangeEnd: '2026-08-22T18:00:00+09:00',
    fetchedAt: '2026-08-22T08:59:00+09:00',
    expiresAt: '2026-08-22T09:15:00+09:00',
    busy: [{ start: '2026-08-22T10:00:00+09:00', end: '2026-08-22T11:00:00+09:00' }],
    ...overrides,
  }
}

describe('calendar availability planner', () => {
  it('reports a current conflict only from a fresh intersecting busy block', () => {
    expect(isBusyAt(snapshot({ expiresAt: '2026-08-22T12:00:00+09:00' }), new Date('2026-08-22T10:30:00+09:00'))).toBe(true)
    expect(isBusyAt(snapshot({ expiresAt: '2026-08-22T12:00:00+09:00' }), new Date('2026-08-22T11:00:00+09:00'))).toBe(false)
    expect(isBusyAt(snapshot({ expiresAt: '2026-08-22T10:15:00+09:00' }), new Date('2026-08-22T10:30:00+09:00'))).toBe(false)
    expect(isBusyAt(undefined, new Date('2026-08-22T10:30:00+09:00'))).toBe(false)
  })
  it('rejects stale availability for automatic proposals', () => {
    const result = planMissionMoves(
      [mission('unlocked')],
      snapshot({ expiresAt: '2026-08-22T08:59:59+09:00' }),
      now,
    )
    expect(result).toEqual({ kind: 'stale', moves: [] })
  })

  it('moves only unlocked missions and restores their exact prior times', () => {
    const locked = mission('locked', { timeLocked: true })
    const unlocked = mission('unlocked')
    const proposal = planMissionMoves([locked, unlocked], snapshot(), now)

    expect(proposal.kind).toBe('fresh')
    expect(proposal.moves).toEqual([{
      taskId: 'unlocked',
      from: '2026-08-22T10:00:00+09:00',
      to: '2026-08-22T02:00:00.000Z',
    }])

    const applied = applyMissionMoves([locked, unlocked], proposal, now)
    expect(applied.find((task) => task.id === 'locked')?.scheduledStart).toBe('2026-08-22T10:00:00+09:00')
    expect(applied.find((task) => task.id === 'unlocked')?.scheduledStart).toBe('2026-08-22T02:00:00.000Z')

    const restored = undoMissionMoves(applied, proposal, new Date('2026-08-22T09:05:00+09:00'))
    expect(restored.find((task) => task.id === 'unlocked')?.scheduledStart).toBe('2026-08-22T10:00:00+09:00')
  })
})
