import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { createDatabase } from '../../core/storage/database'
import { createPetRepository } from './petRepository'

const databases: ReturnType<typeof createDatabase>[] = []

afterEach(async () => {
  await Promise.all(databases.map((database) => database.delete()))
  databases.length = 0
})

function setup() {
  const database = createDatabase(`pet-${crypto.randomUUID()}`)
  databases.push(database)
  return { database, repository: createPetRepository(database) }
}

function rewardEvent(overrides = {}) {
  return {
    id: 'task-1@2026-08-23T10:00:00Z',
    taskId: 'task-1',
    completedAt: '2026-08-23T10:00:00Z',
    focusMinutes: 3,
    grant: { xp: 15, coins: 7, food: 1, hearts: 1 },
    ...overrides,
  }
}

describe('pet repository', () => {
  it('settles the same completion event only once', async () => {
    const { repository } = setup()
    const event = rewardEvent()
    await repository.record(event)
    await repository.settle(event.id)
    await repository.settle(event.id)

    expect(await repository.loadState()).toMatchObject({ xp: 15, coins: 7, food: 1, dailyHearts: 1 })
  })

  it('keeps a recorded event recoverable until it is settled', async () => {
    const { repository } = setup()
    const event = rewardEvent()
    await repository.record(event)

    expect(await repository.listUnsettled()).toMatchObject([{ id: event.id }])
  })

  it('resets daily hearts using the completion day in Asia/Seoul', async () => {
    const { repository } = setup()
    await repository.record(rewardEvent({ id: 'first', completedAt: '2026-08-23T14:59:00Z', grant: { xp: 0, coins: 0, food: 0, hearts: 3 } }))
    await repository.settle('first')
    await repository.record(rewardEvent({ id: 'second', completedAt: '2026-08-23T15:00:00Z', grant: { xp: 0, coins: 0, food: 0, hearts: 1 } }))
    await repository.settle('second')

    expect(await repository.loadState()).toMatchObject({ dailyHearts: 1, heartDay: '2026-08-24' })
  })

  it('derives level from total accumulated xp', async () => {
    const { repository } = setup()
    await repository.record(rewardEvent({ grant: { xp: 205, coins: 0, food: 0, hearts: 0 } }))
    await repository.settle('task-1@2026-08-23T10:00:00Z')

    expect(await repository.loadState()).toMatchObject({ xp: 205, level: 3 })
  })

  it('rejects an unknown completion event', async () => {
    const { repository } = setup()

    await expect(repository.settle('missing')).rejects.toThrow('Unknown reward event: missing')
  })

  it('does not create or mutate pet state for an already settled event', async () => {
    const { database, repository } = setup()
    await database.rewardEvents.add({ ...rewardEvent(), settledAt: '2026-08-23T10:01:00Z' })

    await repository.settle('task-1@2026-08-23T10:00:00Z')

    expect(await database.petGameStates.get('primary')).toBeUndefined()
  })

  it('feeding never penalizes an empty inventory', async () => {
    const { repository } = setup()

    expect(await repository.feedPet()).toMatchObject({ food: 0, affinity: 0 })
  })

  it('feeds the pet by consuming one food and increasing affinity', async () => {
    const { repository } = setup()
    await repository.record(rewardEvent({ grant: { xp: 0, coins: 0, food: 1, hearts: 0 } }))
    await repository.settle('task-1@2026-08-23T10:00:00Z')

    expect(await repository.feedPet()).toMatchObject({ food: 0, affinity: 1 })
  })

  it('equips only an owned item without duplicating it', async () => {
    const { database, repository } = setup()
    await database.petGameStates.put({
      ...(await repository.loadState()),
      ownedItemIds: ['sunny-rug'],
    })

    await repository.equipItem('sunny-rug')
    await repository.equipItem('sunny-rug')

    expect(await repository.loadState()).toMatchObject({ equippedItemIds: ['sunny-rug'] })
  })

  it('leaves equipped items unchanged when the item is not owned', async () => {
    const { repository } = setup()

    await expect(repository.equipItem('missing-item')).rejects.toThrow('Unknown room item: missing-item')

    expect(await repository.loadState()).toMatchObject({ equippedItemIds: [] })
  })

  it('buys a coin item once and equips it again without another charge', async () => {
    const { database, repository } = setup()
    await database.petGameStates.put({ ...(await repository.loadState()), coins: 50 })

    await repository.equipItem('cloud-cushion')
    await repository.equipItem('cloud-cushion')

    expect(await repository.loadState()).toMatchObject({
      coins: 30,
      ownedItemIds: ['cloud-cushion'],
      equippedItemIds: ['cloud-cushion'],
    })
  })

  it('rejects premium previews and purchases without enough coins', async () => {
    const { repository } = setup()

    await expect(repository.equipItem('starlight-bed')).rejects.toThrow('Premium room item is not available: starlight-bed')
    await expect(repository.equipItem('cloud-cushion')).rejects.toThrow('Not enough coins for room item: cloud-cushion')
    expect(await repository.loadState()).toMatchObject({ coins: 0, ownedItemIds: [], equippedItemIds: [] })
  })
})
