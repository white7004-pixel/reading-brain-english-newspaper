import type { RecurringTaskInstance } from '../model/recurrence'
import type { MonggleDatabase } from './database'
import { DEFAULT_RECURRING_TEMPLATES } from '../../features/recurring/defaultTemplates'
import { closePastInstances, generateInstances, isCarryForwardInstance, materializeCarryForward } from '../../features/recurring/recurrencePolicy'

function changedRecords(
  previous: Map<string, RecurringTaskInstance>,
  next: Iterable<RecurringTaskInstance>,
) {
  return [...next].filter((instance) => {
    const current = previous.get(instance.id)
    return !current || current.status !== instance.status || current.scheduledDay !== instance.scheduledDay
  })
}

export function createRecurringRepository(database: MonggleDatabase) {
  return {
    async ensureDefaults() {
      await database.transaction('rw', database.recurringTemplates, async () => {
        for (const template of DEFAULT_RECURRING_TEMPLATES) {
          if (!await database.recurringTemplates.get(template.id)) {
            await database.recurringTemplates.add({ ...template, personaIds: [...template.personaIds] })
          }
        }
      })
      return database.recurringTemplates.toArray()
    },

    async ensureForDay(day: string) {
      return database.transaction('rw', database.recurringTemplates, database.recurringInstances, async () => {
        const templates = (await database.recurringTemplates.toArray()).filter((template) => template.active)
        const existing = await database.recurringInstances.toArray()
        const before = new Map(existing.map((instance) => [instance.id, instance]))
        const records = new Map(closePastInstances(existing, day).map((instance) => [instance.id, instance]))

        for (const instance of generateInstances(templates, [...records.values()], day)) records.set(instance.id, instance)

        for (const template of templates) {
          if (template.cadence.kind === 'daily') continue
          const latestMissed = [...records.values()]
            .filter((instance) => (
              instance.templateId === template.id
              && instance.status === 'missed'
              && instance.scheduledDay < day
              && !isCarryForwardInstance(instance)
            ))
            .sort((a, b) => b.scheduledDay.localeCompare(a.scheduledDay))[0]
          if (!latestMissed) continue
          if ([...records.values()].some((instance) => instance.id.startsWith(`${latestMissed.id}@carry@`))) continue
          const carryForward = materializeCarryForward(latestMissed, template, day)
          if (carryForward) records.set(carryForward.id, carryForward)
        }

        const changed = changedRecords(before, records.values())
        if (changed.length) await database.recurringInstances.bulkPut(changed)
        return [...records.values()].filter((instance) => instance.scheduledDay === day)
      })
    },

    async complete(id: string, completedAt: string) {
      await database.transaction('rw', database.recurringInstances, async () => {
        const instance = await database.recurringInstances.get(id)
        if (!instance || instance.status !== 'open') return
        await database.recurringInstances.update(id, { status: 'completed', completedAt })
      })
    },

    listTemplates() {
      return database.recurringTemplates.toArray()
    },

    listBetween(startDay: string, endDay: string) {
      return database.recurringInstances.where('scheduledDay').between(startDay, endDay, true, true).sortBy('scheduledDay')
    },
  }
}

export type RecurringRepository = ReturnType<typeof createRecurringRepository>
