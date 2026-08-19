import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { TodayScreen, type TodayDependencies } from './TodayScreen'
import { DEFAULT_CATEGORIES } from '../../core/model/category'

function dependencies(): TodayDependencies {
  return {
    parse: vi.fn().mockReturnValue([
      { id: 'draft-1', title: '수학 숙제', day: '2026-08-20', priority: 2, categoryId: 'personal', estimateMinutes: 20, confidence: 0.9, needsReview: false },
      { id: 'draft-2', title: '병원 방문', day: '2026-08-20', priority: 2, categoryId: 'personal', estimateMinutes: 15, confidence: 0.9, needsReview: false },
    ]),
    saveMany: vi.fn().mockResolvedValue(undefined),
    updateWidget: vi.fn().mockResolvedValue(undefined),
    listCategories: vi.fn().mockResolvedValue(DEFAULT_CATEGORIES),
    addCategory: vi.fn(),
  }
}

it('organizes input but does not save before review confirmation', async () => {
  const deps = dependencies()
  render(<TodayScreen dependencies={deps} />)
  await userEvent.type(screen.getByLabelText('오늘 할 일 한 번에 적기'), '수학 숙제하고 3시에 병원')
  await userEvent.click(screen.getByRole('button', { name: '정리하기' }))
  expect(screen.getAllByLabelText('할 일 제목')).toHaveLength(2)
  expect(deps.saveMany).not.toHaveBeenCalled()
})

it('saves reviewed tasks and shows the first focus action', async () => {
  const deps = dependencies()
  render(<TodayScreen dependencies={deps} />)
  await userEvent.type(screen.getByLabelText('오늘 할 일 한 번에 적기'), '수학 숙제하고 병원')
  await userEvent.click(screen.getByRole('button', { name: '정리하기' }))
  await userEvent.click(screen.getByRole('button', { name: '모두 저장' }))
  expect(deps.saveMany).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ title: '수학 숙제', source: 'local_parser' })]))
  expect(deps.updateWidget).toHaveBeenCalledWith(expect.objectContaining({ remainingCount: 2 }))
  expect(screen.getByRole('heading', { name: '수학 숙제' })).toBeVisible()
})

it('loads all tasks into a category-filtered priority list', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([
    { id: 'work', title: '보고서 작성', day: '2026-08-20', status: 'open', priority: 3, estimateMinutes: 30, category: 'work', categoryId: 'work', source: 'manual', createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z' },
    { id: 'run', title: '달리기', day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 20, category: 'exercise', categoryId: 'exercise', source: 'manual', createdAt: '2026-08-20T09:00:00Z', updatedAt: '2026-08-20T09:00:00Z' },
  ])
  render(<TodayScreen dependencies={deps} />)
  const priorityHeading = await screen.findByRole('heading', { name: '오늘의 우선순위' })
  const prioritySection = priorityHeading.closest('section')!
  expect(within(prioritySection).getByText('보고서 작성')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: '운동' }))
  expect(within(prioritySection).getByText('달리기')).toBeInTheDocument()
  expect(within(prioritySection).queryByText('보고서 작성')).not.toBeInTheDocument()
})
