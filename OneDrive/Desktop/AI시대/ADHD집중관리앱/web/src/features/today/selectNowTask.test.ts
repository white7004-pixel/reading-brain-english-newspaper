import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { recommendForEnergy, selectCurrentMission, selectNowTask } from './selectNowTask'

const now = new Date('2026-08-20T09:00:00+09:00')
const makeTask = (id: string, overrides: Partial<Task> = {}): Task => ({
  id, title: id, day: '2026-08-20', status: 'open', priority: 2,
  estimateMinutes: 20, category: 'study',
  createdAt: now.toISOString(), updatedAt: now.toISOString(), ...overrides,
  source: overrides.source ?? 'manual',
})

describe('Now One Thing selection', () => {
  it('selects only unfinished required missions', () => {
    const required = makeTask('required', { required: true, priority: 1 })
    const optional = makeTask('optional', { priority: 3 })
    const completed = makeTask('completed', { required: true, status: 'completed' })
    const canceled = makeTask('canceled', { required: true, status: 'canceled' })

    expect(selectCurrentMission([optional, completed, canceled, required], now)?.id).toBe('required')
  })

  it('keeps a tomorrow-deferred required mission ineligible until its Seoul reminder time', () => {
    const deferred = makeTask('deferred', {
      required: true,
      status: 'deferred',
      day: '2026-08-21',
      commitmentDay: '2026-08-20',
      scheduledStart: '2026-08-20T15:00:00.000Z',
    })

    expect(selectCurrentMission([deferred], new Date('2026-08-20T23:59:59+09:00'))).toBeNull()
    expect(selectNowTask([deferred], new Date('2026-08-20T23:59:59+09:00'))).toBeNull()
    expect(selectCurrentMission([deferred], new Date('2026-08-21T00:00:00+09:00'))?.id).toBe('deferred')
  })

  it('selects active first, then the oldest commitment day, then due time and priority', () => {
    const prior = makeTask('prior', { required: true, commitmentDay: '2026-08-19', priority: 1 })
    const currentDue = makeTask('current-due', {
      required: true,
      commitmentDay: '2026-08-20',
      dueAt: '2026-08-20T08:00:00+09:00',
      priority: 3,
    })
    expect(selectCurrentMission([currentDue, prior], now)?.id).toBe('prior')

    const currentActive = makeTask('current-active', {
      required: true,
      commitmentDay: '2026-08-20',
      status: 'active',
    })
    expect(selectCurrentMission([prior, currentActive], now)?.id).toBe('current-active')

    const sameDayLater = makeTask('same-day-later', {
      required: true,
      commitmentDay: '2026-08-19',
      dueAt: '2026-08-20T12:00:00+09:00',
      priority: 3,
    })
    const sameDaySooner = makeTask('same-day-sooner', {
      required: true,
      commitmentDay: '2026-08-19',
      dueAt: '2026-08-20T11:00:00+09:00',
      priority: 1,
    })
    expect(selectCurrentMission([sameDayLater, sameDaySooner], now)?.id).toBe('same-day-sooner')
  })

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
