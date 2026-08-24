import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Persona } from '../../core/model/persona'
import type { RecurringTaskInstance } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'
import { createDatabase, type MonggleDatabase } from '../../core/storage/database'
import { createPersonaMasteryRepository } from '../../core/storage/personaMasteryRepository'
import { createPetRepository } from '../pet/petRepository'
import { createQuestCompletionService, type CompleteQuestInput } from './completeQuest'

let database: MonggleDatabase | undefined

afterEach(async () => {
  await database?.delete()
  database = undefined
})

function setup() {
  database = createDatabase(`quest-completion-${crypto.randomUUID()}`)
  return {
    database,
    mastery: createPersonaMasteryRepository(database),
    service: createQuestCompletionService(database),
  }
}

function persona(id: string, status: Persona['status'] = 'active'): Persona {
  return {
    id,
    name: id,
    icon: '●',
    color: '#6558D9',
    kind: 'custom',
    status,
    order: 0,
    classificationKeywords: [],
  }
}

function task(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    title: '보고서 마무리',
    day: '2026-08-24',
    status: 'open',
    priority: 1,
    estimateMinutes: 30,
    category: 'work',
    categoryId: 'work',
    personaIds: ['director'],
    source: 'manual',
    createdAt: '2026-08-24T00:00:00.000Z',
    updatedAt: '2026-08-24T00:00:00.000Z',
    ...overrides,
  }
}

function completion(overrides: Partial<CompleteQuestInput> = {}): CompleteQuestInput {
  return {
    task: task(),
    focusMinutes: 30,
    completedAt: '2026-08-24T01:00:00.000Z',
    random: () => 1,
    ...overrides,
  }
}

describe('persona mastery repository', () => {
  it('returns an unpersisted stage-one projection for a persona without credits', async () => {
    const { database, mastery } = setup()

    await expect(mastery.get('director')).resolves.toEqual({
      personaId: 'director',
      completions: 0,
      stage: 1,
      weeklyCompleted: 0,
      monthlyConsistencyDays: 0,
      creditedEventIds: [],
    })
    await expect(database.personaMastery.count()).resolves.toBe(0)
  })

  it('derives weekly completions and monthly consistency days from Seoul completion dates', async () => {
    const { database, mastery } = setup()
    await database.personas.add(persona('director'))

    await mastery.creditPersonas('sunday@2026-08-23T14:59:00.000Z', ['director'], '2026-08-23T14:59:00.000Z')
    await mastery.creditPersonas('monday-a@2026-08-23T15:00:00.000Z', ['director'], '2026-08-23T15:00:00.000Z')
    const [projection] = await mastery.creditPersonas('monday-b@2026-08-24T03:00:00.000Z', ['director'], '2026-08-24T03:00:00.000Z')

    expect(projection).toMatchObject({
      completions: 3,
      weeklyCompleted: 2,
      monthlyConsistencyDays: 2,
    })
    expect(projection.creditedEventIds).toHaveLength(3)
  })
})

describe('quest completion service', () => {
  it('credits every unique linked persona while creating only one reward event', async () => {
    const { database, service } = setup()
    await database.personas.bulkAdd([persona('director'), persona('marketing')])

    const result = await service.complete(completion({
      task: task({ personaIds: ['director', 'marketing', 'director'] }),
    }))

    expect(result.mastery.map(({ personaId }) => personaId)).toEqual(['director', 'marketing'])
    expect(result.mastery).toEqual([
      expect.objectContaining({ personaId: 'director', completions: 1, creditedEventIds: ['task-1@2026-08-24T01:00:00.000Z'] }),
      expect.objectContaining({ personaId: 'marketing', completions: 1, creditedEventIds: ['task-1@2026-08-24T01:00:00.000Z'] }),
    ])
    await expect(database.rewardEvents.count()).resolves.toBe(1)
  })

  it('returns current projections without incrementing a duplicate completion event', async () => {
    const { database, service } = setup()
    await database.personas.add(persona('director'))
    const input = completion()

    const first = await service.complete(input)
    const replay = await service.complete({ ...input, random: () => 0 })

    expect(replay.rewardEvent).toEqual(first.rewardEvent)
    expect(replay.mastery).toEqual([expect.objectContaining({ completions: 1, creditedEventIds: [first.rewardEvent.id] })])
    await expect(database.tasks.count()).resolves.toBe(1)
    await expect(database.rewardEvents.count()).resolves.toBe(1)
    await expect(database.personaMastery.count()).resolves.toBe(1)
  })

  it('atomically completes the task and its open recurring instance with the reward and mastery credit', async () => {
    const { database, service } = setup()
    const recurringInstance: RecurringTaskInstance = {
      id: 'daily-review@2026-08-24',
      templateId: 'daily-review',
      periodKey: '2026-08-24',
      scheduledDay: '2026-08-24',
      status: 'open',
    }
    const linkedTask = task({ recurringInstanceId: recurringInstance.id })
    await database.personas.add(persona('director'))
    await database.recurringInstances.add(recurringInstance)

    const result = await service.complete(completion({ task: linkedTask }))

    expect(result.task).toMatchObject({ status: 'completed', completedAt: '2026-08-24T01:00:00.000Z' })
    expect(result.rewardEvent).toMatchObject({
      id: 'task-1@2026-08-24T01:00:00.000Z',
      taskId: 'task-1',
      focusMinutes: 30,
      grant: { xp: 25, coins: 12, food: 0, hearts: 1 },
    })
    expect(result.recurringInstance).toMatchObject({ status: 'completed', completedAt: '2026-08-24T01:00:00.000Z' })
    await expect(database.tasks.get('task-1')).resolves.toEqual(result.task)
    await expect(database.recurringInstances.get(recurringInstance.id)).resolves.toEqual(result.recurringInstance)
    await expect(database.rewardEvents.get(result.rewardEvent.id)).resolves.toEqual(result.rewardEvent)
    await expect(database.personaMastery.get('director')).resolves.toEqual(result.mastery[0])
  })

  it('completes and rewards a task with no linked personas without creating mastery rows', async () => {
    const { database, service } = setup()

    const result = await service.complete(completion({ task: task({ personaIds: [] }) }))

    expect(result.mastery).toEqual([])
    await expect(database.tasks.get('task-1')).resolves.toMatchObject({ status: 'completed' })
    await expect(database.rewardEvents.count()).resolves.toBe(1)
    await expect(database.personaMastery.count()).resolves.toBe(0)
  })

  it('credits a linked archived persona because archiving does not erase earned progress', async () => {
    const { database, service } = setup()
    await database.personas.add(persona('director', 'archived'))

    const result = await service.complete(completion())

    expect(result.mastery).toEqual([expect.objectContaining({ personaId: 'director', completions: 1 })])
  })

  it('rolls back task, recurrence, reward, and mastery when a late write fails', async () => {
    const { database, service } = setup()
    const recurringInstance: RecurringTaskInstance = {
      id: 'daily-review@2026-08-24',
      templateId: 'daily-review',
      periodKey: '2026-08-24',
      scheduledDay: '2026-08-24',
      status: 'open',
    }
    const openTask = task({ recurringInstanceId: recurringInstance.id })
    await database.personas.add(persona('director'))
    await database.tasks.add(openTask)
    await database.recurringInstances.add(recurringInstance)
    database.personaMastery.hook('creating', () => { throw new Error('mastery write interrupted') })

    await expect(service.complete(completion({ task: openTask }))).rejects.toThrow('mastery write interrupted')

    await expect(database.tasks.get(openTask.id)).resolves.toEqual(openTask)
    await expect(database.recurringInstances.get(recurringInstance.id)).resolves.toEqual(recurringInstance)
    await expect(database.rewardEvents.count()).resolves.toBe(0)
    await expect(database.personaMastery.count()).resolves.toBe(0)
  })

  it('replays safely after a settlement-style interruption and settles the recorded reward only once', async () => {
    const { database, service } = setup()
    await database.personas.add(persona('director'))
    const input = completion({ focusMinutes: 0 })
    const first = await service.complete(input)

    const replay = await service.complete(input)
    const pets = createPetRepository(database)
    const settled = await pets.settle(replay.rewardEvent.id)
    const settledAgain = await pets.settle(replay.rewardEvent.id)

    expect(replay).toEqual(first)
    expect(settled).toMatchObject({ xp: 10, coins: 5 })
    expect(settledAgain).toEqual(settled)
    await expect(database.rewardEvents.count()).resolves.toBe(1)
    await expect(database.personaMastery.get('director')).resolves.toMatchObject({ completions: 1 })
  })

  it('leaves every table unchanged when reward calculation fails inside the transaction', async () => {
    const { database, service } = setup()
    const openTask = task()
    await database.personas.add(persona('director'))
    await database.tasks.add(openTask)
    const random = vi.fn(() => { throw new Error('random source unavailable') })

    await expect(service.complete(completion({ task: openTask, random }))).rejects.toThrow('random source unavailable')

    await expect(database.tasks.get(openTask.id)).resolves.toEqual(openTask)
    await expect(database.rewardEvents.count()).resolves.toBe(0)
    await expect(database.personaMastery.count()).resolves.toBe(0)
  })
})
