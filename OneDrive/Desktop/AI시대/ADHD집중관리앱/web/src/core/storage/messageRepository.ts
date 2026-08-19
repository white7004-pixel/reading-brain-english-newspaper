import type { MessageStatus, ScheduledMessage } from '../model/message'
import type { MonggleDatabase } from './database'

export function createMessageRepository(database: MonggleDatabase) {
  return {
    put(message: ScheduledMessage) {
      return database.messages.put(message)
    },
    listByStatus(status: MessageStatus) {
      return database.messages.where('status').equals(status).toArray()
    },
  }
}
