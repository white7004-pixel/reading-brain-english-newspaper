import { describe, expect, it } from 'vitest'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import { closePastInstances, generateInstances, materializeCarryForward } from './recurrencePolicy'

function template(overrides: Partial<RecurringTaskTemplate> = {}): RecurringTaskTemplate {
  return {
    id: 'daily-review',
    title: '일일 점검',
    personaIds: ['director'],
    category: 'operations',
    cadence: { kind: 'daily' },
    targetCount: 1,
    estimateMinutes: 10,
    carryForward: false,
    active: true,
    ...overrides,
  }
}

function instance(overrides: Partial<RecurringTaskInstance> = {}): RecurringTaskInstance {
  return {
    id: 'daily-review@2026-08-23',
    templateId: 'daily-review',
    periodKey: '2026-08-23',
    scheduledDay: '2026-08-23',
    status: 'open',
    ...overrides,
  }
}

describe('recurrence policy', () => {
  it('does not duplicate a daily instance for the same calendar day', () => {
    const once = generateInstances([template()], [], '2026-08-24')

    expect(once).toEqual([{
      id: 'daily-review@2026-08-24',
      templateId: 'daily-review',
      periodKey: '2026-08-24',
      scheduledDay: '2026-08-24',
      status: 'open',
    }])
    expect(generateInstances([template()], once, '2026-08-24')).toEqual(once)
  })

  it('uses the ISO Monday date as a weekly key across the Sunday and Monday boundary', () => {
    const weekly = template({ id: 'weekly-review', cadence: { kind: 'weekly', weekdays: [1, 7] } })

    expect(generateInstances([weekly], [], '2026-08-23')[0]).toMatchObject({
      id: 'weekly-review@2026-08-17', periodKey: '2026-08-17', scheduledDay: '2026-08-23',
    })
    expect(generateInstances([weekly], [], '2026-08-24')[0]).toMatchObject({
      id: 'weekly-review@2026-08-24', periodKey: '2026-08-24', scheduledDay: '2026-08-24',
    })
  })

  it('adjusts monthly business-day timings away from weekends', () => {
    const first = template({ id: 'first', cadence: { kind: 'monthly', timing: 'first_business_day' } })
    const middle = template({ id: 'middle', cadence: { kind: 'monthly', timing: 'mid_month' } })
    const last = template({ id: 'last', cadence: { kind: 'monthly', timing: 'last_business_day' } })

    expect(generateInstances([first], [], '2026-08-03')).toHaveLength(1)
    expect(generateInstances([first], [], '2026-08-01')).toHaveLength(0)
    expect(generateInstances([middle], [], '2026-08-17')).toHaveLength(1)
    expect(generateInstances([last], [], '2026-08-31')).toHaveLength(1)
  })

  it('marks only past open instances as missed', () => {
    const closed = closePastInstances([
      instance(),
      instance({ id: 'complete', status: 'completed' }),
      instance({ id: 'canceled', status: 'canceled' }),
    ], '2026-08-24')

    expect(closed).toEqual([
      expect.objectContaining({ id: 'daily-review@2026-08-23', status: 'missed' }),
      expect.objectContaining({ id: 'complete', status: 'completed' }),
      expect.objectContaining({ id: 'canceled', status: 'canceled' }),
    ])
  })

  it('records a missed daily instance without adding it to the next day backlog', () => {
    const yesterday = closePastInstances([instance()], '2026-08-24')

    expect(generateInstances([template()], yesterday, '2026-08-24')).toEqual([
      expect.objectContaining({ id: 'daily-review@2026-08-24', scheduledDay: '2026-08-24' }),
    ])
  })

  it('materializes an enabled carry-forward once with the original identity and target day in its id', () => {
    const missed = instance({ id: 'weekly-review@2026-08-17', templateId: 'weekly-review', periodKey: '2026-08-17', status: 'missed' })
    const enabled = template({ id: 'weekly-review', cadence: { kind: 'weekly', weekdays: [1] }, carryForward: true })

    expect(materializeCarryForward(missed, enabled, '2026-08-24')).toEqual({
      id: 'weekly-review@2026-08-17@carry@2026-08-24',
      templateId: 'weekly-review',
      periodKey: '2026-08-17',
      scheduledDay: '2026-08-24',
      status: 'open',
    })
    expect(materializeCarryForward(missed, enabled, '2026-08-24')).toEqual(
      materializeCarryForward(missed, enabled, '2026-08-24'),
    )
    expect(materializeCarryForward(missed, template({ id: 'weekly-review' }), '2026-08-24')).toBeNull()
  })

  it('creates one weekly count-based instance for a period instead of one instance per target', () => {
    const meetings = template({
      id: 'teacher-meetings',
      cadence: { kind: 'weekly', weekdays: [2, 4] },
      targetCount: 2,
    })
    const tuesday = generateInstances([meetings], [], '2026-08-25')

    expect(tuesday).toHaveLength(1)
    expect(tuesday[0]).toMatchObject({ id: 'teacher-meetings@2026-08-24' })
    expect(generateInstances([meetings], tuesday, '2026-08-27')).toEqual(tuesday)
  })
})
