import type { PersonaMastery } from '../model/persona'
import { stageFor } from '../../features/mastery/masteryPolicy'
import type { MonggleDatabase } from './database'

const seoulDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function emptyMastery(personaId: string): PersonaMastery {
  return {
    personaId,
    completions: 0,
    stage: 1,
    weeklyCompleted: 0,
    monthlyConsistencyDays: 0,
    creditedEventIds: [],
  }
}

function seoulDay(instant: string) {
  const parts = seoulDateFormatter.formatToParts(new Date(instant))
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value
  return `${value('year')}-${value('month')}-${value('day')}`
}

function weekStart(day: string) {
  const date = new Date(`${day}T00:00:00.000Z`)
  const daysSinceMonday = (date.getUTCDay() + 6) % 7
  date.setUTCDate(date.getUTCDate() - daysSinceMonday)
  return date.toISOString().slice(0, 10)
}

function completionDayForEvent(eventId: string) {
  const separator = eventId.lastIndexOf('@')
  if (separator === -1) return undefined
  const completedAt = eventId.slice(separator + 1)
  if (Number.isNaN(Date.parse(completedAt))) return undefined
  return seoulDay(completedAt)
}

function periodCounters(eventIds: string[], completedAt: string) {
  const referenceDay = seoulDay(completedAt)
  const referenceWeek = weekStart(referenceDay)
  const referenceMonth = referenceDay.slice(0, 7)
  const creditedDays = eventIds.flatMap((eventId) => completionDayForEvent(eventId) ?? [])

  return {
    weeklyCompleted: creditedDays.filter((day) => weekStart(day) === referenceWeek).length,
    monthlyConsistencyDays: new Set(creditedDays.filter((day) => day.startsWith(referenceMonth))).size,
  }
}

export function createPersonaMasteryRepository(database: MonggleDatabase) {
  return {
    async get(personaId: string): Promise<PersonaMastery> {
      return await database.personaMastery.get(personaId) ?? emptyMastery(personaId)
    },

    async creditPersonas(eventId: string, personaIds: string[], completedAt: string): Promise<PersonaMastery[]> {
      const uniquePersonaIds = [...new Set(personaIds.filter(Boolean))]
      if (uniquePersonaIds.length === 0) return []

      return database.transaction('rw', database.personas, database.personaMastery, async () => {
        const personas = await database.personas.bulkGet(uniquePersonaIds)
        const eligiblePersonaIds = uniquePersonaIds.filter((_, index) => {
          const status = personas[index]?.status
          return status === 'active' || status === 'archived'
        })

        return Promise.all(eligiblePersonaIds.map(async (personaId) => {
          const current = await database.personaMastery.get(personaId) ?? emptyMastery(personaId)
          if (current.creditedEventIds.includes(eventId)) return current

          const creditedEventIds = [...current.creditedEventIds, eventId]
          const completions = current.completions + 1
          const next: PersonaMastery = {
            ...current,
            completions,
            stage: stageFor(completions),
            ...periodCounters(creditedEventIds, completedAt),
            creditedEventIds,
          }
          await database.personaMastery.put(next)
          return next
        }))
      })
    },
  }
}

export type PersonaMasteryRepository = ReturnType<typeof createPersonaMasteryRepository>
