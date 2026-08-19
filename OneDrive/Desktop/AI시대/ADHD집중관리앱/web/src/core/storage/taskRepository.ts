import type { Task } from '../model/task'
import type { MonggleDatabase } from './database'

export function createTaskRepository(database: MonggleDatabase) {
  const normalize = (task: Task): Task => ({ ...task, source: task.source ?? 'manual' })
  return {
    put(task: Task) {
      return database.tasks.put(normalize(task))
    },
    putMany(tasks: Task[]) {
      return database.transaction('rw', database.tasks, () => database.tasks.bulkPut(tasks.map(normalize)))
    },
    async listForDay(day: string) {
      return (await database.tasks.where('day').equals(day).toArray()).map(normalize)
    },
  }
}
