import type { Task } from '../model/task'
import type { MonggleDatabase } from './database'
import { normalizeCategoryId } from '../model/taskCategoryMigration'

export function createTaskRepository(database: MonggleDatabase) {
  const normalize = (task: Task): Task => ({
    ...task,
    categoryId: task.categoryId ?? normalizeCategoryId(task.category),
    personaIds: task.personaIds ?? [],
    source: task.source ?? 'manual',
    required: task.required ?? false,
  })
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
    async listRequiredOpen() {
      return (await database.tasks.toArray())
        .map(normalize)
        .filter((task) => task.required && task.status !== 'completed')
    },
  }
}
