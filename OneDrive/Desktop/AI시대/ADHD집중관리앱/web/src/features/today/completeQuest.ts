import type { PersonaMastery } from '../../core/model/persona'
import type { RecurringTaskInstance } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'
import type { MonggleDatabase } from '../../core/storage/database'
import { createPersonaMasteryRepository } from '../../core/storage/personaMasteryRepository'
import type { RewardEvent } from '../pet/model'
import { calculateReward } from '../pet/rewardPolicy'

export interface CompleteQuestInput {
  task: Task
  focusMinutes: number
  completedAt: string
  random: () => number
}

export interface CompletionResult {
  task: Task
  rewardEvent: RewardEvent
  mastery: PersonaMastery[]
  recurringInstance?: RecurringTaskInstance
}

export function createQuestCompletionService(database: MonggleDatabase) {
  const masteryRepository = createPersonaMasteryRepository(database)

  return {
    complete(input: CompleteQuestInput): Promise<CompletionResult> {
      return database.transaction(
        'rw',
        database.tasks,
        database.recurringInstances,
        database.rewardEvents,
        database.personas,
        database.personaMastery,
        async () => {
          const completedTask: Task = {
            ...input.task,
            status: 'completed',
            completedAt: input.completedAt,
            updatedAt: input.completedAt,
          }
          await database.tasks.put(completedTask)

          let recurringInstance: RecurringTaskInstance | undefined
          if (completedTask.recurringInstanceId) {
            const current = await database.recurringInstances.get(completedTask.recurringInstanceId)
            if (current) {
              recurringInstance = current.status === 'open'
                ? { ...current, status: 'completed', completedAt: input.completedAt }
                : current
              if (current.status === 'open') await database.recurringInstances.put(recurringInstance)
            }
          }

          const eventId = `${completedTask.id}@${input.completedAt}`
          let rewardEvent = await database.rewardEvents.get(eventId)
          if (!rewardEvent) {
            rewardEvent = {
              id: eventId,
              taskId: completedTask.id,
              completedAt: input.completedAt,
              focusMinutes: input.focusMinutes,
              grant: calculateReward({ taskId: completedTask.id, focusMinutes: input.focusMinutes }, input.random),
            }
            await database.rewardEvents.add(rewardEvent)
          }

          const mastery = await masteryRepository.creditPersonas(
            eventId,
            completedTask.personaIds ?? [],
            input.completedAt,
          )

          return { task: completedTask, rewardEvent, mastery, recurringInstance }
        },
      )
    },
  }
}

export type QuestCompletionService = ReturnType<typeof createQuestCompletionService>
