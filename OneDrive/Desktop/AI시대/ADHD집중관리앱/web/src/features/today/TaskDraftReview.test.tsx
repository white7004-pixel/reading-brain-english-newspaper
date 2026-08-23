import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { TaskDraft } from './taskDraft'
import { TaskDraftReview } from './TaskDraftReview'
import { DEFAULT_CATEGORIES } from '../../core/model/category'

const drafts: TaskDraft[] = [
  { id: 'draft-1', title: '수학 숙제', day: '2026-08-20', priority: 2, categoryId: 'personal', estimateMinutes: 20, confidence: 0.9, needsReview: false },
  { id: 'draft-2', title: '병원 방문', day: '2026-08-20', dueAt: '2026-08-20T15:00:00+09:00', priority: 2, categoryId: 'personal', estimateMinutes: 15, confidence: 0.9, needsReview: false },
]

it('keeps drafts pending until the user confirms all', async () => {
  const onSave = vi.fn()
  render(<TaskDraftReview drafts={drafts} onChange={vi.fn()} onSave={onSave} onCancel={vi.fn()} />)
  expect(screen.getAllByLabelText('할 일 제목')).toHaveLength(2)
  expect(onSave).not.toHaveBeenCalled()
  await userEvent.click(screen.getByRole('button', { name: '모두 저장' }))
  expect(onSave).toHaveBeenCalledWith(drafts)
})

it('updates the selected category before saving', async () => {
  const onChange = vi.fn()
  render(<TaskDraftReview drafts={drafts} categories={DEFAULT_CATEGORIES} onCreateCategory={vi.fn()} onChange={onChange} onSave={vi.fn()} onCancel={vi.fn()} />)
  await userEvent.selectOptions(screen.getAllByLabelText('분류')[0], 'exercise')
  expect(onChange).toHaveBeenLastCalledWith(expect.arrayContaining([
    expect.objectContaining({ id: 'draft-1', categoryId: 'exercise' }),
  ]))
})

it('returns edited titles for review before saving', async () => {
  const onChange = vi.fn()
  render(<TaskDraftReview drafts={drafts} onChange={onChange} onSave={vi.fn()} onCancel={vi.fn()} />)
  const title = screen.getAllByLabelText('할 일 제목')[0]
  await userEvent.clear(title)
  await userEvent.type(title, '수학 10문제')
  expect(onChange).toHaveBeenLastCalledWith(expect.arrayContaining([expect.objectContaining({ id: 'draft-1', title: '수학 10문제' })]))
})

it('retains explicit multi-persona selections in reviewed drafts', async () => {
  const onChange = vi.fn()
  const onSave = vi.fn()
  const personaDrafts: TaskDraft[] = [{ ...drafts[0], personaIds: ['director'] }]
  render(<TaskDraftReview
    drafts={personaDrafts}
    personas={[
      { id: 'director', name: '원장·경영자', icon: '🏥', color: '#849A8C', kind: 'default', status: 'active', order: 0, classificationKeywords: ['운영'] },
      { id: 'counseling', name: '상담 관리자', icon: '💬', color: '#9B8FA8', kind: 'default', status: 'active', order: 1, classificationKeywords: ['상담'] },
    ]}
    onChange={onChange}
    onSave={onSave}
    onCancel={vi.fn()}
  />)

  await userEvent.click(screen.getByLabelText('역할 상담 관리자'))
  expect(onChange).toHaveBeenLastCalledWith([
    expect.objectContaining({ personaIds: ['director', 'counseling'] }),
  ])

  await userEvent.click(screen.getByRole('button', { name: '모두 저장' }))
  expect(onSave).toHaveBeenCalledWith([
    expect.objectContaining({ personaIds: ['director', 'counseling'] }),
  ])
})
