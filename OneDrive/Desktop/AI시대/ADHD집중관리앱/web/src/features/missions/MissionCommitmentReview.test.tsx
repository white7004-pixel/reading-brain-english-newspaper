import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { MissionCommitmentReview } from './MissionCommitmentReview'

const task: Task = {
  id: 'read', title: '독서', day: '2026-08-21', status: 'open', priority: 2,
  estimateMinutes: 20, category: 'study', source: 'manual',
  createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
}

it('requires explicit confirmation before selected tasks become required missions', async () => {
  const confirm = vi.fn()
  const user = userEvent.setup()
  render(<MissionCommitmentReview tasks={[task]} onConfirm={confirm} />)

  await user.click(screen.getByRole('checkbox', { name: '독서 선택' }))
  await user.type(screen.getByLabelText('첫 행동'), '책 펼치기')
  expect(confirm).not.toHaveBeenCalled()

  await user.click(screen.getByRole('button', { name: '필수 미션 확정' }))
  expect(confirm).toHaveBeenCalledWith([expect.objectContaining({ required: true, firstAction: '책 펼치기' })])
})

it('commits only the missions selected by the user without a count limit', async () => {
  const second = { ...task, id: 'write', title: '글쓰기' }
  const confirm = vi.fn()
  const user = userEvent.setup()
  render(<MissionCommitmentReview tasks={[task, second]} onConfirm={confirm} />)

  await user.click(screen.getByRole('checkbox', { name: '글쓰기 선택' }))
  await user.type(within(screen.getByText('글쓰기').closest('article')!).getByLabelText('첫 행동'), '문서 열기')
  await user.click(screen.getByRole('button', { name: '필수 미션 확정' }))

  expect(confirm).toHaveBeenCalledWith([expect.objectContaining({ id: 'write', required: true, firstAction: '문서 열기' })])
})

it('does not confirm a selected mission without a first action', async () => {
  const confirm = vi.fn()
  const user = userEvent.setup()
  render(<MissionCommitmentReview tasks={[task]} onConfirm={confirm} />)

  await user.click(screen.getByRole('checkbox', { name: '독서 선택' }))
  expect(screen.getByRole('button', { name: '필수 미션 확정' })).toBeDisabled()
  expect(confirm).not.toHaveBeenCalled()
})
