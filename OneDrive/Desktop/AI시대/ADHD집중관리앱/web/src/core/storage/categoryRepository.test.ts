import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import type { Task } from '../model/task'
import { createCategoryRepository } from './categoryRepository'
import { createDatabase, type MonggleDatabase } from './database'
import { createTaskRepository } from './taskRepository'

let database: MonggleDatabase | undefined

afterEach(async () => {
  await database?.delete()
  database = undefined
})

function setup() {
  database = createDatabase(`category-test-${crypto.randomUUID()}`)
  return {
    categories: createCategoryRepository(database),
    tasks: createTaskRepository(database),
  }
}

const task = (categoryId: string): Task => ({
  id: 'task-1', title: '기획서 작성', day: '2026-08-20', status: 'open', priority: 3,
  estimateMinutes: 30, category: 'work', categoryId, source: 'manual',
  createdAt: '2026-08-20T00:00:00.000Z', updatedAt: '2026-08-20T00:00:00.000Z',
})

describe('category repository', () => {
  it('initializes defaults idempotently', async () => {
    const { categories } = setup()
    await categories.ensureDefaults()
    await categories.ensureDefaults()
    expect((await categories.list()).map(({ id }) => id)).toEqual([
      'work', 'personal', 'exercise', 'reading', 'hobby',
    ])
  })

  it('rejects blank and normalized duplicate names', async () => {
    const { categories } = setup()
    await categories.ensureDefaults()
    await expect(categories.add({ name: '  ', color: '#6558D9' })).rejects.toThrow('분류 이름')
    await categories.add({ name: '프로젝트', color: '#6558D9' })
    await expect(categories.add({ name: ' 프로젝트 ', color: '#C24E7A' })).rejects.toThrow('이미 있는 분류')
  })

  it('moves linked tasks to personal before deleting a custom category', async () => {
    const { categories, tasks } = setup()
    await categories.ensureDefaults()
    const custom = await categories.add({ name: '프로젝트', color: '#6558D9' })
    await tasks.put(task(custom.id))
    await categories.remove(custom.id)
    expect((await tasks.listForDay('2026-08-20'))[0].categoryId).toBe('personal')
    expect((await categories.list()).some(({ id }) => id === custom.id)).toBe(false)
  })

  it('does not delete a default category', async () => {
    const { categories } = setup()
    await categories.ensureDefaults()
    await expect(categories.remove('work')).rejects.toThrow('기본 분류')
  })
})
