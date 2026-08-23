import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { sortPriorityTasks } from './sortPriorityTasks'

const task = (id: string, overrides: Partial<Task> = {}): Task => ({
  id, title: id, day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 20,
  category: 'life', categoryId: 'personal', source: 'manual',
  createdAt: '2026-08-20T09:00:00.000Z', updatedAt: '2026-08-20T09:00:00.000Z',
  ...overrides,
})

describe('sortPriorityTasks', () => {
  it('orders active, priority, deadline, creation time, then completed tasks', () => {
    const tasks = [
      task('completed', { status: 'completed', priority: 3 }),
      task('low', { priority: 1 }),
      task('medium', { priority: 2 }),
      task('high-no-due', { priority: 3, createdAt: '2026-08-20T08:00:00.000Z' }),
      task('high-due', { priority: 3, dueAt: '2026-08-20T18:00:00.000Z' }),
      task('active', { status: 'active', priority: 1 }),
    ]
    const originalIds = tasks.map(({ id }) => id)
    expect(sortPriorityTasks(tasks, 'all').map(({ id }) => id)).toEqual([
      'active', 'high-due', 'high-no-due', 'medium', 'low', 'completed',
    ])
    expect(tasks.map(({ id }) => id)).toEqual(originalIds)
  })

  it('filters by category before sorting', () => {
    const tasks = [task('run', { categoryId: 'exercise' }), task('report', { categoryId: 'work' })]
    expect(sortPriorityTasks(tasks, 'exercise').map(({ id }) => id)).toEqual(['run'])
  })
})
