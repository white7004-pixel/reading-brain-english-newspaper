import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import type { RecurringTaskTemplate } from '../model/recurrence'
import { createDatabase, type MonggleDatabase } from './database'
import { createRecurringRepository } from './recurringRepository'

let database: MonggleDatabase | undefined

afterEach(async () => {
  await database?.delete()
  database = undefined
})

function setup() {
  database = createDatabase(`recurring-repository-${crypto.randomUUID()}`)
  return createRecurringRepository(database)
}

function dailyTemplate(overrides: Partial<RecurringTaskTemplate> = {}): RecurringTaskTemplate {
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

describe('recurring repository', () => {
  it('seeds organized defaults once and preserves an edited existing template', async () => {
    const repository = setup()
    await database!.recurringTemplates.put(dailyTemplate({
      id: 'inbox-calendar-review',
      title: '내가 수정한 점검',
    }))

    const defaults = await repository.ensureDefaults()
    await repository.ensureDefaults()

    expect(defaults.map(({ id }) => id)).toEqual(expect.arrayContaining([
      'inbox-calendar-review', 'naver-place-inquiry', 'teacher-meetings',
    ]))
    await expect(database!.recurringTemplates.get('inbox-calendar-review')).resolves.toMatchObject({
      title: '내가 수정한 점검',
    })
    expect(await database!.recurringTemplates.count()).toBe(defaults.length)
  })

  it('atomically closes past work and creates only one current daily instance across retries', async () => {
    const repository = setup()
    await database!.recurringTemplates.put(dailyTemplate())
    await database!.recurringInstances.put({
      id: 'daily-review@2026-08-23',
      templateId: 'daily-review',
      periodKey: '2026-08-23',
      scheduledDay: '2026-08-23',
      status: 'open',
    })

    expect(await repository.ensureForDay('2026-08-24')).toEqual([
      expect.objectContaining({ id: 'daily-review@2026-08-24', scheduledDay: '2026-08-24', status: 'open' }),
    ])
    expect(await repository.ensureForDay('2026-08-24')).toHaveLength(1)
    await expect(database!.recurringInstances.get('daily-review@2026-08-23')).resolves.toMatchObject({ status: 'missed' })
    expect(await database!.recurringInstances.count()).toBe(2)
  })

  it('returns one idempotent carry-forward for an enabled missed weekly task', async () => {
    const repository = setup()
    await database!.recurringTemplates.put(dailyTemplate({
      id: 'weekly-review', cadence: { kind: 'weekly', weekdays: [1] }, carryForward: true,
    }))
    await database!.recurringInstances.put({
      id: 'weekly-review@2026-08-17', templateId: 'weekly-review', periodKey: '2026-08-17', scheduledDay: '2026-08-17', status: 'missed',
    })

    await expect(repository.ensureForDay('2026-08-25')).resolves.toEqual([
      expect.objectContaining({ id: 'weekly-review@2026-08-17@carry@2026-08-25', scheduledDay: '2026-08-25' }),
    ])
    expect(await repository.ensureForDay('2026-08-25')).toHaveLength(1)
  })

  it('returns a regular weekly instance and its carry-forward together on the next due Monday', async () => {
    const repository = setup()
    await database!.recurringTemplates.put(dailyTemplate({
      id: 'weekly-review', cadence: { kind: 'weekly', weekdays: [1] }, carryForward: true,
    }))
    await database!.recurringInstances.put({
      id: 'weekly-review@2026-08-17', templateId: 'weekly-review', periodKey: '2026-08-17', scheduledDay: '2026-08-17', status: 'missed',
    })

    await expect(repository.ensureForDay('2026-08-24')).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'weekly-review@2026-08-24', scheduledDay: '2026-08-24' }),
      expect.objectContaining({ id: 'weekly-review@2026-08-17@carry@2026-08-24', scheduledDay: '2026-08-24' }),
    ]))
    expect(await repository.ensureForDay('2026-08-24')).toHaveLength(2)
  })

  it('does not automatically carry an already carried original into a second consecutive day', async () => {
    const repository = setup()
    await database!.recurringTemplates.put(dailyTemplate({
      id: 'weekly-review', cadence: { kind: 'weekly', weekdays: [1] }, carryForward: true,
    }))
    await database!.recurringInstances.put({
      id: 'weekly-review@2026-08-17', templateId: 'weekly-review', periodKey: '2026-08-17', scheduledDay: '2026-08-17', status: 'missed',
    })

    await expect(repository.ensureForDay('2026-08-25')).resolves.toEqual([
      expect.objectContaining({ id: 'weekly-review@2026-08-17@carry@2026-08-25', scheduledDay: '2026-08-25' }),
    ])
    await expect(repository.ensureForDay('2026-08-26')).resolves.toEqual([])
    await expect(database!.recurringInstances.get('weekly-review@2026-08-17@carry@2026-08-25')).resolves.toMatchObject({ status: 'missed' })
    expect(await database!.recurringInstances.count()).toBe(2)
  })

  it('completes the recurring instance itself with the supplied timestamp', async () => {
    const repository = setup()
    const open = {
      id: 'daily-review@2026-08-23', templateId: 'daily-review', periodKey: '2026-08-23',
      scheduledDay: '2026-08-23', status: 'open' as const,
    }
    await database!.recurringInstances.put(open)

    await repository.complete(open.id, '2026-08-23T01:00:00.000Z')

    await expect(database!.recurringInstances.get(open.id)).resolves.toMatchObject({
      status: 'completed',
      completedAt: '2026-08-23T01:00:00.000Z',
    })
  })
})
