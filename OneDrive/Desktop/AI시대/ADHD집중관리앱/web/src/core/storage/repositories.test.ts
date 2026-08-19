import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import type { ScheduledMessage } from '../model/message'
import type { Task } from '../model/task'
import { createDatabase } from './database'
import { createMessageRepository } from './messageRepository'
import { createTaskRepository } from './taskRepository'

const databases: ReturnType<typeof createDatabase>[] = []

afterEach(async () => {
  await Promise.all(databases.map((database) => database.delete()))
  databases.length = 0
})

function setup() {
  const database = createDatabase(`monggle-test-${crypto.randomUUID()}`)
  databases.push(database)
  return {
    taskRepository: createTaskRepository(database),
    messageRepository: createMessageRepository(database),
  }
}

function task(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    title: '초안',
    day: '2026-08-20',
    status: 'open',
    priority: 2,
    estimateMinutes: 15,
    category: 'study',
    createdAt: '2026-08-20T00:00:00+09:00',
    updatedAt: '2026-08-20T00:00:00+09:00',
    ...overrides,
    source: overrides.source ?? 'manual',
  }
}

function message(overrides: Partial<ScheduledMessage> = {}): ScheduledMessage {
  return {
    id: 'msg-1',
    platform: 'slack',
    recipientLabel: '#study',
    body: '자료를 공유할게요.',
    scheduledAt: '2026-08-20T09:00:00+09:00',
    timeZone: 'Asia/Seoul',
    status: 'scheduled',
    deliveryMode: 'manual',
    createdAt: '2026-08-20T00:00:00+09:00',
    updatedAt: '2026-08-20T00:00:00+09:00',
    ...overrides,
  }
}

describe('local repositories', () => {
  it('updates a task without duplicating its id', async () => {
    const { taskRepository } = setup()
    await taskRepository.put(task())
    await taskRepository.put(task({ title: '보고서 초안' }))
    const tasks = await taskRepository.listForDay('2026-08-20')
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('보고서 초안')
  })

  it('stores scheduled messages without platform credentials', async () => {
    const { messageRepository } = setup()
    await messageRepository.put(message())
    const messages = await messageRepository.listByStatus('scheduled')
    expect(messages).toMatchObject([{ id: 'msg-1' }])
    expect(messages[0]).not.toHaveProperty('accessToken')
  })

  it('normalizes legacy tasks and preserves local parser metadata', async () => {
    const { taskRepository } = setup()
    await taskRepository.put(task() as Task)
    await taskRepository.put({
      ...task({ id: 'task-2' }),
      source: 'local_parser',
      parseConfidence: 0.86,
      orderAfterTaskId: 'task-1',
    } as Task)
    const tasks = await taskRepository.listForDay('2026-08-20')
    expect(tasks).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'task-1', source: 'manual' }),
      expect.objectContaining({ id: 'task-2', source: 'local_parser', parseConfidence: 0.86, orderAfterTaskId: 'task-1' }),
    ]))
  })

  it('saves a reviewed task list together', async () => {
    const { taskRepository } = setup()
    await taskRepository.putMany([task({ id: 'task-1' }), task({ id: 'task-2' })])
    expect(await taskRepository.listForDay('2026-08-20')).toHaveLength(2)
  })
})
