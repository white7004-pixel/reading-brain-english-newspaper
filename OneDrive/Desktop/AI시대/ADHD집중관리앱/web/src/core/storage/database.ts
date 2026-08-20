import Dexie, { type EntityTable } from 'dexie'
import type { AppearanceSettings, CharacterRender, PhotoAsset } from '../model/appearance'
import type { ScheduledMessage } from '../model/message'
import type { Routine } from '../model/routine'
import type { MonggleSettings } from '../model/settings'
import type { Task } from '../model/task'
import type { Category } from '../model/category'

export class MonggleDatabase extends Dexie {
  tasks!: EntityTable<Task, 'id'>
  messages!: EntityTable<ScheduledMessage, 'id'>
  routines!: EntityTable<Routine, 'id'>
  settings!: EntityTable<MonggleSettings, 'key'>
  photoAssets!: EntityTable<PhotoAsset, 'id'>
  characterRenders!: EntityTable<CharacterRender, 'id'>
  appearanceSettings!: EntityTable<AppearanceSettings, 'key'>
  categories!: EntityTable<Category, 'id'>

  constructor(name = 'monggle') {
    super(name)
    this.version(1).stores({
      tasks: '&id,day,status,dueAt',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
    })
    this.version(2).stores({
      tasks: '&id,day,status,dueAt',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
      photoAssets: '&id,createdAt',
      characterRenders: '&id,sourcePhotoId,preset,createdAt',
      appearanceSettings: '&key',
    })
    this.version(3).stores({
      tasks: '&id,day,status,dueAt,categoryId',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
      photoAssets: '&id,createdAt',
      characterRenders: '&id,sourcePhotoId,preset,createdAt',
      appearanceSettings: '&key',
      categories: '&id,name,isDefault,createdAt',
    })
    this.version(4).stores({
      tasks: '&id,day,status,dueAt,categoryId,required,commitmentDay',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
      photoAssets: '&id,createdAt',
      characterRenders: '&id,sourcePhotoId,preset,createdAt',
      appearanceSettings: '&key',
      categories: '&id,name,isDefault,createdAt',
    })
  }
}

export function createDatabase(name = 'monggle') {
  return new MonggleDatabase(name)
}
