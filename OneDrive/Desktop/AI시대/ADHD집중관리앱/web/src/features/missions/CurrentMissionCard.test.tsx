import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { CurrentMissionCard } from './CurrentMissionCard'

const task: Task = {
  id: 'read', title: '독서', day: '2026-08-21', status: 'open', priority: 2,
  estimateMinutes: 20, category: 'study', source: 'manual', required: true,
  firstAction: '책 펼치기', createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
}

it('keeps completion explicit while offering one-mission execution actions', async () => {
  const onStart = vi.fn()
  const onDelay = vi.fn()
  const onComplete = vi.fn()
  const onReschedule = vi.fn()
  const user = userEvent.setup()
  render(<CurrentMissionCard task={task} onStart={onStart} onDelay={onDelay} onComplete={onComplete} onReschedule={onReschedule} />)

  expect(screen.getByText('책 펼치기')).toBeVisible()
  await user.click(screen.getByRole('button', { name: '3분만 시작' }))
  await user.click(screen.getByRole('button', { name: '5분 후 다시 알림' }))
  await user.click(screen.getByRole('button', { name: '일정 다시 잡기' }))
  expect(onStart).toHaveBeenCalledOnce()
  expect(onDelay).toHaveBeenCalledOnce()
  expect(onReschedule).toHaveBeenCalledOnce()
  expect(onComplete).not.toHaveBeenCalled()

  await user.click(screen.getByRole('button', { name: '완료했어요' }))
  expect(onComplete).toHaveBeenCalledOnce()
})
