import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import type { Persona, PersonaMastery } from '../model/persona'
import type { ExternalCalendarEvent, QuestCandidate } from '../model/questCandidate'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../model/recurrence'
import type { Task } from '../model/task'
import { createDatabase } from './database'
import { createTaskRepository } from './taskRepository'

const databases: ReturnType<typeof createDatabase>[] = []

afterEach(async () => {
  await Promise.all(databases.map((database) => database.delete()))
  databases.length = 0
})

function setup() {
  const database = createDatabase(`monggle-persona-migration-${crypto.randomUUID()}`)
  databases.push(database)
  return { database, taskRepository: createTaskRepository(database) }
}

describe('persona dashboard migration', () => {
  it('reads a legacy task with persona and source defaults without rewriting it', async () => {
    const { database, taskRepository } = setup()
    const legacyTask = {
      id: 'legacy-task',
      title: '기존 할 일',
      day: '2026-08-23',
      status: 'open' as const,
      priority: 2 as const,
      estimateMinutes: 15,
      category: 'study' as const,
      createdAt: '2026-08-23T00:00:00.000Z',
      updatedAt: '2026-08-23T00:00:00.000Z',
    }

    await database.tasks.put(legacyTask as Task)

    await expect(taskRepository.listForDay('2026-08-23')).resolves.toEqual([
      expect.objectContaining({ id: 'legacy-task', personaIds: [], source: 'manual', categoryId: 'personal', required: false }),
    ])
    await expect(database.tasks.get('legacy-task')).resolves.not.toHaveProperty('personaIds')
  })

  it('stores one record for every persona dashboard entity table', async () => {
    const { database } = setup()
    const persona: Persona = { id: 'persona-1', name: '독서가', icon: '📚', color: '#6558D9', kind: 'default', status: 'active', order: 1, classificationKeywords: ['독서'] }
    const mastery: PersonaMastery = { personaId: 'persona-1', completions: 3, stage: 1, weeklyCompleted: 2, monthlyConsistencyDays: 4, creditedEventIds: ['reward-1'] }
    const template: RecurringTaskTemplate = { id: 'template-1', title: '주간 독서', personaIds: ['persona-1'], category: 'reading', cadence: { kind: 'weekly', weekdays: [1, 3] }, targetCount: 2, estimateMinutes: 30, carryForward: false, active: true }
    const instance: RecurringTaskInstance = { id: 'instance-1', templateId: 'template-1', periodKey: '2026-W34', scheduledDay: '2026-08-23', status: 'open' }
    const candidate: QuestCandidate = { id: 'candidate-1', source: 'kakaotalk', sourceRef: 'kakao:1', title: '상담 준비', personaIds: ['persona-1'], category: 'counseling', estimateMinutes: 20, status: 'pending_review' }
    const event: ExternalCalendarEvent = { id: 'event-1', sourceRef: 'google:1', title: '수업', startsAt: '2026-08-23T09:00:00+09:00', endsAt: '2026-08-23T10:00:00+09:00', status: 'confirmed' }

    await Promise.all([
      database.personas.put(persona),
      database.personaMastery.put(mastery),
      database.recurringTemplates.put(template),
      database.recurringInstances.put(instance),
      database.questCandidates.put(candidate),
      database.externalCalendarEvents.put(event),
    ])

    await expect(Promise.all([
      database.personas.count(),
      database.personaMastery.count(),
      database.recurringTemplates.count(),
      database.recurringInstances.count(),
      database.questCandidates.count(),
      database.externalCalendarEvents.count(),
    ])).resolves.toEqual([1, 1, 1, 1, 1, 1])
  })
})
