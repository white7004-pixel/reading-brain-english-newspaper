import { expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { mergeWidgetEvents } from './mergeWidgetEvents'

const task = (id: string): Task => ({ id, title: id, day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 20, category: 'life', source: 'manual', createdAt: '2026-08-20T00:00:00.000Z', updatedAt: '2026-08-20T00:00:00.000Z' })

it('merges done and working widget events in timestamp order', () => {
  const tasks = [task('one'), task('two')]
  const events = [
    { taskId: 'one', response: 'done' as const, completedAt: '2026-08-20T01:00:00.000Z' },
    { taskId: 'two', response: 'working' as const, completedAt: '2026-08-20T01:01:00.000Z' },
  ]

  const result = mergeWidgetEvents(tasks, events)

  expect(result.map((item) => item.status)).toEqual(['completed', 'active'])
  expect(result.map((item) => item.updatedAt)).toEqual(events.map((event) => event.completedAt))
})

it('ignores stale or unknown widget events', () => {
  const current = { ...task('one'), updatedAt: '2026-08-20T02:00:00.000Z' }
  const result = mergeWidgetEvents([current], [
    { taskId: 'one', response: 'done', completedAt: '2026-08-20T01:00:00.000Z' },
    { taskId: 'missing', response: 'done', completedAt: '2026-08-20T03:00:00.000Z' },
  ])
  expect(result).toEqual([current])
})
