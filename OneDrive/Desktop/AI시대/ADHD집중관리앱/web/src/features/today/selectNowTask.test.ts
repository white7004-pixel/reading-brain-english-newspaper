import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { recommendForEnergy, selectNowTask } from './selectNowTask'

const now = new Date('2026-08-20T09:00:00+09:00')
const makeTask = (id: string, overrides: Partial<Task> = {}): Task => ({
  id, title: id, day: '2026-08-20', status: 'open', priority: 2,
  estimateMinutes: 20, category: 'study',
  createdAt: now.toISOString(), updatedAt: now.toISOString(), ...overrides,
})

describe('Now One Thing selection', () => {
  it('selects active, overdue, nearest due, then highest priority', () => {
    const active = makeTask('active', { status: 'active' })
    const overdue = makeTask('overdue', { dueAt: '2026-08-20T08:00:00+09:00', priority: 1 })
    const tomorrow = makeTask('tomorrow', { dueAt: '2026-08-21T09:00:00+09:00', priority: 3 })
    expect(selectNowTask([tomorrow, overdue, active], now)?.id).toBe('active')
    expect(selectNowTask([tomorrow, overdue], now)?.id).toBe('overdue')
  })

  it('uses energy only after active and overdue constraints', () => {
    const overdueHard = makeTask('overdue', { dueAt: '2026-08-20T08:00:00+09:00', estimateMinutes: 60 })
    const shortEasy = makeTask('easy', { estimateMinutes: 5, priority: 1 })
    expect(recommendForEnergy([overdueHard, shortEasy], 'low', now)?.id).toBe('overdue')
    expect(recommendForEnergy([makeTask('hard', { estimateMinutes: 60 }), shortEasy], 'low', now)?.id).toBe('easy')
  })
})
