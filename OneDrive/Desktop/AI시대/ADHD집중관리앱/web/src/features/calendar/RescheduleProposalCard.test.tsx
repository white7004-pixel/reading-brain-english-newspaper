import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { RescheduleProposalCard } from './RescheduleProposalCard'

const task: Task = {
  id: 'math', title: '수학 숙제', day: '2026-08-22', status: 'open', priority: 3,
  estimateMinutes: 30, category: 'study', source: 'manual', required: true,
  scheduledStart: '2026-08-22T19:00:00+09:00', timeLocked: false,
  createdAt: '2026-08-22T00:00:00.000Z', updatedAt: '2026-08-22T00:00:00.000Z',
}

it('shows every proposed local move before applying it', async () => {
  const onApply = vi.fn()
  render(<RescheduleProposalCard
    proposal={{ kind: 'fresh', createdAt: '2026-08-22T00:00:00.000Z', moves: [{ taskId: 'math', from: task.scheduledStart, to: '2026-08-22T20:00:00+09:00' }] }}
    tasks={[task]}
    onApply={onApply}
    onDismiss={vi.fn()}
  />)
  expect(screen.getByText('Google 일정에 맞춘 새 배치안')).toBeVisible()
  expect(screen.getByText('수학 숙제')).toBeVisible()
  expect(screen.getByText('오후 7:00 → 오후 8:00')).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: '이 배치 적용' }))
  expect(onApply).toHaveBeenCalledOnce()
})
