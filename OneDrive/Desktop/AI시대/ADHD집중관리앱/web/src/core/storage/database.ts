import Dexie, { type EntityTable } from 'dexie'
import type { AppearanceSettings, CharacterRender, PhotoAsset } from '../model/appearance'
import type { ScheduledMessage } from '../model/message'
import type { Routine } from '../model/routine'
import type { MonggleSettings } from '../model/settings'
import type { Task } from '../model/task'
import type { Category } from '../model/category'
import type { AvailabilitySnapshot, CalendarConnection } from '../model/calendarAvailability'
import type { PetGameState, RewardEvent } from '../../features/pet/model'
import type { Persona, PersonaMastery } from '../model/persona'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../model/recurrence'
import type { ExternalCalendarEvent, QuestCandidate } from '../model/questCandidate'

export class MonggleDatabase extends Dexie {
  tasks!: EntityTable<Task, 'id'>
  messages!: EntityTable<ScheduledMessage, 'id'>
  routines!: EntityTable<Routine, 'id'>
  settings!: EntityTable<MonggleSettings, 'key'>
  photoAssets!: EntityTable<PhotoAsset, 'id'>
  characterRenders!: EntityTable<CharacterRender, 'id'>
  appearanceSettings!: EntityTable<AppearanceSettings, 'key'>
  categories!: EntityTable<Category, 'id'>
  calendarConnections!: EntityTable<CalendarConnection, 'accountId'>
  availabilitySnapshots!: EntityTable<AvailabilitySnapshot, 'accountId'>
  petGameStates!: EntityTable<PetGameState, 'key'>
  rewardEvents!: EntityTable<RewardEvent, 'id'>
  personas!: EntityTable<Persona, 'id'>
  personaMastery!: EntityTable<PersonaMastery, 'personaId'>
  recurringTemplates!: EntityTable<RecurringTaskTemplate, 'id'>
  recurringInstances!: EntityTable<RecurringTaskInstance, 'id'>
  questCandidates!: EntityTable<QuestCandidate, 'id'>
  externalCalendarEvents!: EntityTable<ExternalCalendarEvent, 'id'>

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
    this.version(5).stores({
      tasks: '&id,day,status,dueAt,categoryId,required,commitmentDay',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
      photoAssets: '&id,createdAt',
      characterRenders: '&id,sourcePhotoId,preset,createdAt',
      appearanceSettings: '&key',
      categories: '&id,name,isDefault,createdAt',
      calendarConnections: '&accountId,connectedAt',
      availabilitySnapshots: '&accountId,fetchedAt,expiresAt',
    })
    this.version(6).stores({
      tasks: '&id,day,status,dueAt,categoryId,required,commitmentDay',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
      photoAssets: '&id,createdAt',
      characterRenders: '&id,sourcePhotoId,preset,createdAt',
      appearanceSettings: '&key',
      categories: '&id,name,isDefault,createdAt',
      calendarConnections: '&accountId,connectedAt',
      availabilitySnapshots: '&accountId,fetchedAt,expiresAt',
      petGameStates: '&key',
      rewardEvents: '&id,taskId,completedAt,settledAt',
    })
    this.version(7).stores({
      tasks: '&id,day,status,dueAt,categoryId,required,commitmentDay',
      messages: '&id,status,scheduledAt,platform',
      routines: '&id',
      settings: '&key',
      photoAssets: '&id,createdAt',
      characterRenders: '&id,sourcePhotoId,preset,createdAt',
      appearanceSettings: '&key',
      categories: '&id,name,isDefault,createdAt',
      calendarConnections: '&accountId,connectedAt',
      availabilitySnapshots: '&accountId,fetchedAt,expiresAt',
      petGameStates: '&key',
      rewardEvents: '&id,taskId,completedAt,settledAt',
      personas: '&id,status,order',
      personaMastery: '&personaId',
      recurringTemplates: '&id,active',
      recurringInstances: '&id,templateId,periodKey,scheduledDay,status',
      questCandidates: '&id,&sourceRef,status',
      externalCalendarEvents: '&id,&sourceRef,startsAt,status',
    })
  }
}

export function createDatabase(name = 'monggle') {
  return new MonggleDatabase(name)
}
