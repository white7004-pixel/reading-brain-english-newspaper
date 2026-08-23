import { beforeEach, expect, it } from 'vitest'
import { applyMasteryEvent, masteryStage, taskMasteryRepository, type TaskMasteryState } from './taskMastery'

const initial: TaskMasteryState = { taskId: 'task-1', misses: 0 }

beforeEach(() => localStorage.clear())

it('moves through humane coaching stages after explicit later responses', () => {
  const once = applyMasteryEvent(initial, { type: 'later', at: '2026-08-20T01:00:00.000Z' })
  const twice = applyMasteryEvent(once, { type: 'later', at: '2026-08-20T02:00:00.000Z' })
  const threeTimes = applyMasteryEvent(twice, { type: 'later', at: '2026-08-20T03:00:00.000Z' })

  expect([masteryStage(once), masteryStage(twice), masteryStage(threeTimes)]).toEqual(['direct', 'decision', 'decision'])
})

it('resets misses when the task is completed', () => {
  const escalated: TaskMasteryState = { taskId: 'task-1', misses: 4, lastPromptAt: '2026-08-20T03:00:00.000Z' }
  expect(applyMasteryEvent(escalated, { type: 'done', at: '2026-08-20T03:05:00.000Z' })).toEqual({ taskId: 'task-1', misses: 0, answeredAt: '2026-08-20T03:05:00.000Z' })
})

it('keeps the miss count while the user is working', () => {
  const current: TaskMasteryState = { taskId: 'task-1', misses: 2 }
  expect(applyMasteryEvent(current, { type: 'working', at: '2026-08-20T02:05:00.000Z' }).misses).toBe(2)
})

it('keeps the miss count when the user starts through the new coach action', () => {
  const current: TaskMasteryState = { taskId: 'task-1', misses: 2 }
  expect(applyMasteryEvent(current, { type: 'start', at: '2026-08-20T02:05:00.000Z' }).misses).toBe(2)
})

it('increments exactly once for an explicit five minute reminder', () => {
  const current: TaskMasteryState = { taskId: 'task-1', misses: 1 }
  expect(applyMasteryEvent(current, { type: 'remind_5', at: '2026-08-20T02:05:00.000Z' }).misses).toBe(2)
})

it('counts an unanswered previous prompt when a new prompt is shown', () => {
  const prompted = applyMasteryEvent(initial, { type: 'prompt', at: '2026-08-20T01:00:00.000Z' })
  const promptedAgain = applyMasteryEvent(prompted, { type: 'prompt', at: '2026-08-20T02:00:00.000Z' })
  expect(promptedAgain).toMatchObject({ misses: 1, lastPromptAt: '2026-08-20T02:00:00.000Z' })
})

it('persists mastery separately for each task', () => {
  taskMasteryRepository.save({ taskId: 'task-1', misses: 3 })
  expect(taskMasteryRepository.load('task-1').misses).toBe(3)
  expect(taskMasteryRepository.load('task-2')).toEqual({ taskId: 'task-2', misses: 0 })
})
