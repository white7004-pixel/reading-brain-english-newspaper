import Dexie, { type EntityTable } from 'dexie'
import type { ScheduledMessage } from '../model/message'
import type { Routine } from '../model/routine'
import type { MonggleSettings } from '../model/settings'
import type { Task } from '../model/task'

export class MonggleDatabase extends Dexie {
  tasks!: EntityTable<Task, 'id'>
  messages!: EntityTable<ScheduledMessage, 'id'>
  routines!: EntityTable<Routine, 'id'>
  settings!: EntityTable<MonggleSettings, 'key'>

  constructor(name = 'monggle') {
    super(name)
    this.version(1).stores({
      tasks: '&id,day,status,dueAt',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
    })
  }
}

export function createDatabase(name = 'monggle') {
  return new MonggleDatabase(name)
}
