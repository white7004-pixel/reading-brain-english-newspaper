import { expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { buildWidgetSnapshot } from './widgetSnapshot'

const now = new Date('2026-08-20T10:00:00+09:00')
const task: Task = { id: 'task-1', title: '수학 숙제', day: '2026-08-20', status: 'open', priority: 3, estimateMinutes: 30, category: 'study', source: 'local_parser', parseConfidence: 0.93, dueAt: '2026-08-20T15:00:00+09:00', createdAt: now.toISOString(), updatedAt: now.toISOString() }

it('copies only minimum display fields into the home widget snapshot', () => {
  expect(buildWidgetSnapshot([task], '수학 숙제 했어?', now)).toEqual({
    generatedAt: now.toISOString(),
    remainingCount: 1,
    tasks: [{ id: 'task-1', title: '수학 숙제', completed: false, dueAt: '2026-08-20T15:00:00+09:00', updatedAt: now.toISOString() }],
    nudgeLine: '수학 숙제 했어?',
    escalationLevel: 'push',
  })
})

it('excludes completed tasks and limits widget detail to three tasks', () => {
  const tasks = [task, ...['2', '3', '4'].map((id) => ({ ...task, id: `task-${id}` })), { ...task, id: 'done', status: 'completed' as const }]
  expect(buildWidgetSnapshot(tasks, '', now)).toMatchObject({ remainingCount: 4, tasks: [{ id: 'task-1' }, { id: 'task-2' }, { id: 'task-3' }] })
})

it('puts the shared current mission first with extension metadata for widget emphasis', () => {
  const required = {
    ...task, id: 'required', title: '독서', required: true, priority: 1 as const,
    commitmentDay: '2026-08-19', firstAction: '책 펼치기',
  }

  const snapshot = buildWidgetSnapshot([task, required], '', new Date('2026-08-20T10:00:00+09:00'))
  expect(snapshot).toMatchObject({
    currentMissionId: 'required',
    commitmentDay: '2026-08-19',
    firstAction: '책 펼치기',
    escalationLevel: 'widget',
  })
  expect(snapshot.tasks[0]).toMatchObject({ id: 'required' })
})
