import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { applyCheckInResponse, buildNudgeLine, isQuietTime, nextNudgeAt, selectNudgeTask } from './nudgePolicy'

const now = new Date('2026-08-20T10:00:00+09:00')
const task = (id: string, overrides: Partial<Task> = {}): Task => ({
  id, title: id === 'task-1' ? '수학 숙제' : '영어 단어', day: '2026-08-20', status: 'open', priority: 2,
  estimateMinutes: 15, category: 'study', source: 'manual', createdAt: now.toISOString(), updatedAt: now.toISOString(), ...overrides,
})

describe('supportive nudge policy', () => {
  it.each([30, 60, 120] as const)('schedules the supported %i minute interval', (minutes) => {
    expect(nextNudgeAt(now, minutes).toISOString()).toBe(new Date(now.getTime() + minutes * 60_000).toISOString())
  })

  it('recognizes overnight quiet hours without replaying a missed alert', () => {
    expect(isQuietTime(new Date('2026-08-20T23:30:00+09:00'), '23:00', '07:00')).toBe(true)
    expect(isQuietTime(new Date('2026-08-21T07:01:00+09:00'), '23:00', '07:00')).toBe(false)
  })

  it('asks about one task and advances after 했어', () => {
    const result = applyCheckInResponse([task('task-1'), task('task-2')], { taskId: 'task-1', action: 'done', respondedAt: now.toISOString() }, now)
    expect(result.tasks[0].status).toBe('completed')
    expect(result.nextTaskId).toBe('task-2')
  })

  it('keeps the same active task after 하는 중', () => {
    const result = applyCheckInResponse([task('task-1'), task('task-2')], { taskId: 'task-1', action: 'in_progress', respondedAt: now.toISOString() }, now)
    expect(result.tasks[0].status).toBe('active')
    expect(result.nextTaskId).toBe('task-1')
  })

  it('does not ask again before a 나중에 reminder', () => {
    const response = { taskId: 'task-1', action: 'later', remindAt: '2026-08-20T11:00:00+09:00', respondedAt: now.toISOString() } as const
    expect(selectNudgeTask([task('task-1')], new Date('2026-08-20T10:30:00+09:00'), response)).toBeNull()
  })

  it('returns the same required mission first when its delayed reminder is due', () => {
    const response = { taskId: 'task-1', action: 'later', remindAt: '2026-08-20T10:05:00+09:00', respondedAt: now.toISOString() } as const
    const higherPriorityTask = task('task-2', { priority: 3 })
    const delayedRequiredTask = task('task-1', { required: true, priority: 1 })

    expect(selectNudgeTask([higherPriorityTask, delayedRequiredTask], new Date('2026-08-20T10:05:00+09:00'), response)?.id).toBe('task-1')
  })

  it('uses a supportive one-action question', () => {
    expect(buildNudgeLine(task('task-1'))).toBe('수학 숙제 했어? 한 단계만 해도 좋아.')
  })
})
