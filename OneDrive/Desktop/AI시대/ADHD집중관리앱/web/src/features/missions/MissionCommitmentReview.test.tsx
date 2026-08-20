import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { MissionCommitmentReview } from './MissionCommitmentReview'

const task: Task = {
  id: 'read', title: '독서', day: '2026-08-21', status: 'open', priority: 2,
  estimateMinutes: 20, category: 'study', source: 'manual',
  createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
}

it('requires explicit confirmation before tasks become required missions', async () => {
  const confirm = vi.fn()
  const user = userEvent.setup()
  render(<MissionCommitmentReview tasks={[task]} onConfirm={confirm} />)

  await user.type(screen.getByLabelText('첫 행동'), '책 펼치기')
  expect(confirm).not.toHaveBeenCalled()

  await user.click(screen.getByRole('button', { name: '필수 미션 확정' }))
  expect(confirm).toHaveBeenCalledWith([expect.objectContaining({ required: true, firstAction: '책 펼치기' })])
})
