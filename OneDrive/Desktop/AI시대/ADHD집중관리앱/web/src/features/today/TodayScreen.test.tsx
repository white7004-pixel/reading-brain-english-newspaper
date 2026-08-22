import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { TodayScreen, type TodayDependencies } from './TodayScreen'
import { DEFAULT_CATEGORIES } from '../../core/model/category'
import { taskCheckInRepository } from '../nudges/taskCheckIn'
import type { Task } from '../../core/model/task'

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
  await userEvent.click(screen.getByRole('button', { name: /할 일 빠르게 적기/ }))
  await userEvent.type(screen.getByLabelText('오늘 할 일 한 번에 적기'), '수학 숙제하고 3시에 병원')
  await userEvent.click(screen.getByRole('button', { name: '정리하기' }))
  expect(screen.getAllByLabelText('할 일 제목')).toHaveLength(2)
  expect(deps.saveMany).not.toHaveBeenCalled()
})

it('saves reviewed tasks and shows the first focus action', async () => {
  const deps = dependencies()
  render(<TodayScreen dependencies={deps} />)
  await userEvent.click(screen.getByRole('button', { name: /할 일 빠르게 적기/ }))
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

it('puts the current action before task capture and planning details', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([{
    id: 'now', title: '영어 단어 10개', day: '2026-08-20', status: 'open', priority: 1,
    estimateMinutes: 15, category: 'study', source: 'manual', createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z',
  }])
  render(<TodayScreen dependencies={deps} />)
  const current = await screen.findByRole('region', { name: '지금 할 일' })
  const capture = screen.getByRole('button', { name: /할 일 빠르게 적기/ })
  expect(current.compareDocumentPosition(capture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

it('shows no more than two upcoming scheduled tasks', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([1, 2, 3].map((index) => ({
    id: `scheduled-${index}`, title: `일정 ${index}`, day: '2026-08-20', dueAt: `2026-08-20T${10 + index}:00:00+09:00`,
    status: 'open' as const, priority: 2 as const, estimateMinutes: 15, category: 'life' as const,
    source: 'manual' as const, createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z',
  })))
  render(<TodayScreen dependencies={deps} />)
  expect(await screen.findAllByTestId('upcoming-item')).toHaveLength(2)
})

const requiredTask: Task = {
  id: 'required', title: '독서', day: '2026-08-21', status: 'open', priority: 2,
  estimateMinutes: 20, category: 'study', source: 'manual', required: true, firstAction: '책 펼치기',
  createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
}

it('starts a required mission in a real three-minute focus session', async () => {
  const deps = dependencies()
  deps.listRequiredOpen = vi.fn().mockResolvedValue([requiredTask])
  render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '3분만 시작' }))

  expect(await screen.findByLabelText('집중 세션')).toBeVisible()
  expect(screen.getByText('03:00')).toBeVisible()
  expect(deps.saveMany).toHaveBeenCalledWith([expect.objectContaining({ id: 'required', status: 'active' })])
})

it('persists a five-minute mission delay for the existing quiet-hour-aware nudge flow', async () => {
  taskCheckInRepository.clear()
  const deps = dependencies()
  deps.listRequiredOpen = vi.fn().mockResolvedValue([requiredTask])
  render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '5분 후 다시 알림' }))

  const delayed = taskCheckInRepository.load()
  expect(delayed).toMatchObject({ taskId: 'required', action: 'later' })
  expect(new Date(delayed!.remindAt!).getTime() - new Date(delayed!.respondedAt).getTime()).toBe(5 * 60_000)
  taskCheckInRepository.clear()
})

it('opens a reschedule path and persists the selected recovery action', async () => {
  const deps = dependencies()
  deps.listRequiredOpen = vi.fn().mockResolvedValue([requiredTask])
  render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '일정 다시 잡기' }))
  await userEvent.click(screen.getByRole('button', { name: '5분으로 줄이기' }))

  expect(deps.saveMany).toHaveBeenCalledWith([expect.objectContaining({ id: 'required', estimateMinutes: 5, required: true })])
})
