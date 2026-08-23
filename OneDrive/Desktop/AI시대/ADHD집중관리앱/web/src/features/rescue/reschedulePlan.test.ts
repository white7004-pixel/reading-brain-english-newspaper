import { expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { reschedulePlan } from './reschedulePlan'

it('supports keep, tomorrow, five-minute, and cancel decisions', () => {
  const now = new Date('2026-08-20T20:00:00+09:00')
  const tasks = ['a', 'b', 'c', 'd'].map((id) => ({
    id, title: id, day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 20,
    category: 'study', required: id === 'd', createdAt: now.toISOString(), updatedAt: now.toISOString(),
  })) as Task[]
  const result = reschedulePlan(tasks, { a: 'keep', b: 'tomorrow', c: 'five_minute', d: 'cancel' }, now)
  expect(result.items.map((item) => item.status)).toEqual(['open', 'deferred', 'open', 'canceled'])
  expect(result.items.find((item) => item.id === 'c')?.estimateMinutes).toBe(5)
  expect(result.items.find((item) => item.id === 'd')).toMatchObject({ required: false, status: 'canceled' })
})

it('defers a required mission until the next Seoul day before 09:00 KST without uncommitting it', () => {
  const now = new Date('2026-08-21T08:30:00+09:00')
  const mission = {
    id: 'required', title: 'required', day: '2026-08-21', status: 'open', priority: 2,
    estimateMinutes: 20, category: 'study', source: 'manual', required: true,
    commitmentDay: '2026-08-21', firstAction: 'open the book',
    createdAt: now.toISOString(), updatedAt: now.toISOString(),
  } as Task

  const deferred = reschedulePlan([mission], { required: 'tomorrow' }, now).items[0]

  expect(deferred).toMatchObject({
    required: true,
    commitmentDay: '2026-08-21',
    day: '2026-08-22',
    status: 'deferred',
    scheduledStart: '2026-08-21T15:00:00.000Z',
  })
})
