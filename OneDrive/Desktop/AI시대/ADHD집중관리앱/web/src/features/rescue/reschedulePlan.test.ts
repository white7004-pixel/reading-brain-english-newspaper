import { expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { reschedulePlan } from './reschedulePlan'

it('supports keep, tomorrow, five-minute, and cancel decisions', () => {
  const now = new Date('2026-08-20T20:00:00+09:00')
  const tasks = ['a', 'b', 'c', 'd'].map((id) => ({
    id, title: id, day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 20,
    category: 'study', createdAt: now.toISOString(), updatedAt: now.toISOString(),
  })) as Task[]
  const result = reschedulePlan(tasks, { a: 'keep', b: 'tomorrow', c: 'five_minute', d: 'cancel' }, now)
  expect(result.items.map((item) => item.status)).toEqual(['open', 'deferred', 'open', 'canceled'])
  expect(result.items.find((item) => item.id === 'c')?.estimateMinutes).toBe(5)
})
