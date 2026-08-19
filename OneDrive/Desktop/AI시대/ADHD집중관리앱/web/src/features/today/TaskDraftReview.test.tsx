import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { TaskDraft } from './taskDraft'
import { TaskDraftReview } from './TaskDraftReview'

const drafts: TaskDraft[] = [
  { id: 'draft-1', title: '수학 숙제', day: '2026-08-20', priority: 2, estimateMinutes: 20, confidence: 0.9, needsReview: false },
  { id: 'draft-2', title: '병원 방문', day: '2026-08-20', dueAt: '2026-08-20T15:00:00+09:00', priority: 2, estimateMinutes: 15, confidence: 0.9, needsReview: false },
]

it('keeps drafts pending until the user confirms all', async () => {
  const onSave = vi.fn()
  render(<TaskDraftReview drafts={drafts} onChange={vi.fn()} onSave={onSave} onCancel={vi.fn()} />)
  expect(screen.getAllByLabelText('할 일 제목')).toHaveLength(2)
  expect(onSave).not.toHaveBeenCalled()
  await userEvent.click(screen.getByRole('button', { name: '모두 저장' }))
  expect(onSave).toHaveBeenCalledWith(drafts)
})

it('returns edited titles for review before saving', async () => {
  const onChange = vi.fn()
  render(<TaskDraftReview drafts={drafts} onChange={onChange} onSave={vi.fn()} onCancel={vi.fn()} />)
  const title = screen.getAllByLabelText('할 일 제목')[0]
  await userEvent.clear(title)
  await userEvent.type(title, '수학 10문제')
  expect(onChange).toHaveBeenLastCalledWith(expect.arrayContaining([expect.objectContaining({ id: 'draft-1', title: '수학 10문제' })]))
})
