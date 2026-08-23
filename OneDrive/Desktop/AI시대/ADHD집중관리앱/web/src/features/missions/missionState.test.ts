import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { commitMission, completeMission, uncommitMission } from './missionState'

const now = new Date('2026-08-21T09:00:00+09:00')

function task(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    title: '초안',
    day: '2026-08-21',
    status: 'open',
    priority: 2,
    estimateMinutes: 15,
    category: 'study',
    source: 'manual',
    createdAt: '2026-08-21T00:00:00+09:00',
    updatedAt: '2026-08-21T00:00:00+09:00',
    ...overrides,
  }
}

describe('mission state', () => {
  it('does not complete without explicit completion', () => {
    expect(commitMission(task(), { firstAction: '책 펼치기', timeLocked: false }, now).status).toBe('open')
  })

  it('removes the required state when explicitly uncommitted', () => {
    const committed = commitMission(task(), { firstAction: '책 펼치기', timeLocked: false }, now)

    expect(uncommitMission(committed, now)).toMatchObject({ required: false, status: 'open', updatedAt: now.toISOString() })
  })

  it('completes only a committed mission', () => {
    const committed = commitMission(task(), { firstAction: '책 펼치기', timeLocked: false }, now)

    expect(completeMission(committed, now)).toMatchObject({
      status: 'completed',
      completedAt: now.toISOString(),
      updatedAt: now.toISOString(),
    })
    expect(() => completeMission(task(), now)).toThrow('MISSION_NOT_COMMITTED')
  })
})
