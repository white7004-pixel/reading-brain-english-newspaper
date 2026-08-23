import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import type { AvailabilitySnapshot, CalendarConnection } from '../../core/model/calendarAvailability'
import { createDatabase } from '../../core/storage/database'
import { createAvailabilityRepository } from './availabilityRepository'

const databases: ReturnType<typeof createDatabase>[] = []

afterEach(async () => {
  await Promise.all(databases.map((database) => database.delete()))
  databases.length = 0
})

describe('availability repository', () => {
  it('replaces an account snapshot and clears connection data together', async () => {
    const database = createDatabase(`calendar-test-${crypto.randomUUID()}`)
    databases.push(database)
    const repository = createAvailabilityRepository(database)
    const connection: CalendarConnection = {
      accountId: 'account-1',
      displayName: '연결된 Google 계정',
      connectedAt: '2026-08-22T00:00:00.000Z',
      scope: 'https://www.googleapis.com/auth/calendar.events.freebusy',
    }
    const first: AvailabilitySnapshot = {
      accountId: connection.accountId,
      timeZone: 'Asia/Seoul',
      rangeStart: '2026-08-22T00:00:00.000Z',
      rangeEnd: '2026-08-23T00:00:00.000Z',
      fetchedAt: '2026-08-22T00:01:00.000Z',
      expiresAt: '2026-08-22T00:16:00.000Z',
      busy: [],
    }
    const latest = { ...first, fetchedAt: '2026-08-22T00:02:00.000Z' }

    await repository.saveConnection(connection)
    await repository.saveSnapshot(first)
    await repository.saveSnapshot(latest)

    expect(await repository.getConnection()).toEqual(connection)
    expect(await repository.latest(connection.accountId)).toEqual(latest)
    expect(await database.availabilitySnapshots.count()).toBe(1)

    await repository.clear(connection.accountId)
    expect(await repository.getConnection()).toBeUndefined()
    expect(await repository.latest(connection.accountId)).toBeUndefined()
  })
})
