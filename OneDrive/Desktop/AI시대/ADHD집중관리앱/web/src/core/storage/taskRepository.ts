import type { Task } from '../model/task'
import type { MonggleDatabase } from './database'

export function createTaskRepository(database: MonggleDatabase) {
  return {
    put(task: Task) {
      return database.tasks.put(task)
    },
    listForDay(day: string) {
      return database.tasks.where('day').equals(day).toArray()
    },
  }
}
