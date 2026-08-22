import type { AvailabilitySnapshot, CalendarConnection } from '../../core/model/calendarAvailability'
import type { MonggleDatabase } from '../../core/storage/database'

export function createAvailabilityRepository(database: MonggleDatabase) {
  return {
    saveConnection(connection: CalendarConnection) {
      return database.calendarConnections.put(connection)
    },
    getConnection() {
      return database.calendarConnections.toCollection().first()
    },
    saveSnapshot(snapshot: AvailabilitySnapshot) {
      return database.availabilitySnapshots.put(snapshot)
    },
    latest(accountId: string) {
      return database.availabilitySnapshots.get(accountId)
    },
    async clear(accountId: string) {
      await database.transaction('rw', database.calendarConnections, database.availabilitySnapshots, async () => {
        await database.calendarConnections.delete(accountId)
        await database.availabilitySnapshots.delete(accountId)
      })
    },
  }
}

export type AvailabilityRepository = ReturnType<typeof createAvailabilityRepository>
