import { afterEach, expect, it, vi } from 'vitest'
import { taskCheckInRepository } from './taskCheckIn'

afterEach(() => taskCheckInRepository.clear())

it('persists delayed check-ins and announces their change to the active nudge policy', () => {
  const changed = vi.fn()
  window.addEventListener('monggle:task-check-in-changed', changed)

  taskCheckInRepository.save({ taskId: 'read', action: 'later', respondedAt: '2026-08-21T09:00:00+09:00', remindAt: '2026-08-21T09:05:00+09:00' })

  expect(taskCheckInRepository.load()).toMatchObject({ taskId: 'read', action: 'later' })
  expect(changed).toHaveBeenCalledOnce()
  window.removeEventListener('monggle:task-check-in-changed', changed)
})

it.each(['done', 'in_progress', 'later'] as const)('reads a legacy %s record safely', (action) => {
  localStorage.setItem('monggle.task-check-in.v1', JSON.stringify({
    taskId: 'legacy-task',
    action,
    respondedAt: '2026-08-21T09:00:00+09:00',
  }))

  expect(taskCheckInRepository.load()).toMatchObject({ taskId: 'legacy-task', action })
})

it('rejects malformed saved records instead of trusting their shape', () => {
  localStorage.setItem('monggle.task-check-in.v1', JSON.stringify({ taskId: 4, action: 'unknown' }))

  expect(taskCheckInRepository.load()).toBeNull()
})
