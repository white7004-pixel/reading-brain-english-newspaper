import { fireEvent, render, screen, within } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { TodayScreen, type TodayDependencies } from './TodayScreen'
import { DEFAULT_CATEGORIES } from '../../core/model/category'
import { taskCheckInRepository } from '../nudges/taskCheckIn'
import type { Task } from '../../core/model/task'
import { initialPetGameState, type PetGameState } from '../pet/model'

function dependencies(): TodayDependencies {
  const pendingRewards = new Map<string, Parameters<TodayDependencies['savePendingReward']>[0]>()
  return {
    parse: vi.fn().mockReturnValue([
      { id: 'draft-1', title: '수학 숙제', day: '2026-08-20', priority: 2, categoryId: 'personal', estimateMinutes: 20, confidence: 0.9, needsReview: false },
      { id: 'draft-2', title: '병원 방문', day: '2026-08-20', priority: 2, categoryId: 'personal', estimateMinutes: 15, confidence: 0.9, needsReview: false },
    ]),
    saveMany: vi.fn().mockResolvedValue(undefined),
    updateWidget: vi.fn().mockResolvedValue(undefined),
    listCategories: vi.fn().mockResolvedValue(DEFAULT_CATEGORIES),
    addCategory: vi.fn(),
    loadPetState: vi.fn().mockResolvedValue({ ...initialPetGameState }),
    recordReward: vi.fn().mockResolvedValue(undefined),
    settleReward: vi.fn().mockResolvedValue({ ...initialPetGameState }),
    recoverRewards: vi.fn().mockResolvedValue({ ...initialPetGameState }),
    listPendingRewards: vi.fn(() => [...pendingRewards.values()]),
    savePendingReward: vi.fn((event) => { pendingRewards.set(event.id, event) }),
    removePendingReward: vi.fn((eventId) => { pendingRewards.delete(eventId) }),
  }
}

function openTask(id: string, title: string): Task {
  return {
    id, title, day: '2026-08-23', status: 'open', priority: 2, estimateMinutes: 15,
    category: 'life', categoryId: 'personal', source: 'manual',
    createdAt: '2026-08-23T00:00:00.000Z', updatedAt: '2026-08-23T00:00:00.000Z',
  }
}

afterEach(() => {
  window.history.replaceState({}, '', '/')
})

it('shows one quick-add row and rotates its example after submission', async () => {
  const deps = dependencies()
  render(<TodayScreen dependencies={deps} />)

  const slots = screen.getAllByRole('textbox', { name: /빠른 할 일 추가/ })
  expect(slots).toHaveLength(1)
  expect(slots[0]).toHaveAttribute('placeholder', '예: 오늘 꼭 끝낼 일')

  const input = slots[0]
  await userEvent.type(input, '우유 사기{Enter}')

  await waitFor(() => expect(deps.saveMany).toHaveBeenCalledWith([
    expect.objectContaining({ title: '우유 사기', status: 'open' }),
  ]))
  expect(input).toHaveValue('')
  expect(input).toHaveAttribute('placeholder', '예: 10분 안에 할 수 있는 일')
  expect(within(screen.getByRole('region', { name: '오늘 할 일' })).getByText('우유 사기')).toBeVisible()
})

it('keeps quick-add text and its suggestion when persistence fails, then allows retry', async () => {
  const deps = dependencies()
  deps.saveMany = vi.fn()
    .mockRejectedValueOnce(new Error('storage unavailable'))
    .mockResolvedValueOnce(undefined)
  render(<TodayScreen dependencies={deps} />)

  const quickAdd = screen.getByRole('region', { name: '빠른 할 일 입력' })
  const input = within(quickAdd).getByRole('textbox', { name: '빠른 할 일 추가' })
  await userEvent.type(input, '여유 챙기기{Enter}')

  expect(await within(quickAdd).findByRole('status')).toHaveTextContent('할 일을 저장하지 못했어요')
  expect(input).toHaveValue('여유 챙기기')
  expect(input).toHaveAttribute('placeholder', '예: 오늘 꼭 끝낼 일')
  expect(input).toBeEnabled()

  await userEvent.type(input, '{Enter}')

  await waitFor(() => expect(deps.saveMany).toHaveBeenCalledTimes(2))
  expect(input).toHaveValue('')
  expect(input).toHaveAttribute('placeholder', '예: 10분 안에 할 수 있는 일')
})

it('moves from recommended quest to one-time pet reward after persisting the task', async () => {
  window.history.replaceState({}, '', '/?now=2026-08-23T01:00:00.000Z')
  const deps = dependencies()
  deps.settleReward = vi.fn().mockResolvedValue({ ...initialPetGameState, xp: 10, coins: 5 })
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 한 통 답장하기')])

  render(<TodayScreen dependencies={deps} />)

  expect(await screen.findByRole('heading', { name: '메일 한 통 답장하기' })).toBeVisible()
  expect(screen.getByRole('button', { name: '3분만 시작' })).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: '메일 한 통 답장하기 완료' }))

  expect(await screen.findByRole('dialog', { name: '퀘스트 완료 보상' })).toHaveTextContent('경험치 +10')
  expect(deps.recordReward).toHaveBeenCalledWith(expect.objectContaining({
    id: 'mail@2026-08-23T01:00:00.000Z',
    taskId: 'mail',
    completedAt: '2026-08-23T01:00:00.000Z',
    grant: expect.objectContaining({ xp: 10, coins: 5 }),
  }))
  expect(deps.settleReward).toHaveBeenCalledOnce()
  expect(vi.mocked(deps.saveMany).mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(deps.recordReward).mock.invocationCallOrder[0])
  expect(vi.mocked(deps.recordReward).mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(deps.settleReward).mock.invocationCallOrder[0])
})

it('returns focus to quick add after dismissing a reward from Today', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 답장하기')])
  render(<TodayScreen dependencies={deps} />)

  const quickAdd = screen.getByRole('textbox', { name: '빠른 할 일 추가' })
  await userEvent.click(await screen.findByRole('button', { name: '메일 답장하기 완료' }))
  await userEvent.click(await screen.findByRole('button', { name: '계속하기' }))

  await waitFor(() => expect(quickAdd).toHaveFocus())
})

it('locks a task immediately while its first completion is being persisted', async () => {
  let releaseSave!: () => void
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 한 통 답장하기')])
  deps.saveMany = vi.fn(() => new Promise<void>((resolve) => { releaseSave = resolve }))
  deps.settleReward = vi.fn().mockResolvedValue({ ...initialPetGameState, xp: 10, coins: 5 })
  render(<TodayScreen dependencies={deps} />)

  const completion = await screen.findByRole('button', { name: '메일 한 통 답장하기 완료' })
  fireEvent.click(completion)
  fireEvent.click(completion)

  expect(completion).toBeDisabled()
  expect(deps.saveMany).toHaveBeenCalledOnce()
  releaseSave()
  expect(await screen.findByRole('dialog', { name: '퀘스트 완료 보상' })).toBeVisible()
  expect(deps.recordReward).toHaveBeenCalledOnce()
  expect(deps.settleReward).toHaveBeenCalledOnce()
  const [savedTask] = vi.mocked(deps.saveMany).mock.calls[0][0]
  const [event] = vi.mocked(deps.recordReward).mock.calls[0]
  expect(event.id).toBe(`${savedTask.id}@${savedTask.completedAt}`)
})

it('settles the reward when task storage succeeds but widget projection fails', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 한 통 답장하기')])
  deps.updateWidget = vi.fn().mockRejectedValue(new Error('native bridge unavailable'))
  deps.settleReward = vi.fn().mockResolvedValue({ ...initialPetGameState, xp: 10, coins: 5 })
  render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '메일 한 통 답장하기 완료' }))

  expect(await screen.findByRole('dialog', { name: '퀘스트 완료 보상' })).toBeVisible()
  expect(deps.saveMany).toHaveBeenCalledOnce()
  expect(deps.recordReward).toHaveBeenCalledOnce()
  expect(deps.settleReward).toHaveBeenCalledOnce()
})

it('recovers a completion reward from the durable outbox when ledger recording initially fails', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 답장하기')])
  deps.recordReward = vi.fn()
    .mockRejectedValueOnce(new Error('ledger unavailable'))
    .mockResolvedValueOnce(undefined)
  deps.settleReward = vi.fn().mockResolvedValue({ ...initialPetGameState, xp: 10, coins: 5 })
  const view = render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '메일 답장하기 완료' }))

  expect(await screen.findByRole('status')).toBeVisible()
  expect(deps.savePendingReward).toHaveBeenCalledOnce()
  expect(deps.listPendingRewards()).toHaveLength(1)
  expect(deps.settleReward).not.toHaveBeenCalled()

  view.rerender(<TodayScreen key="recover-outbox" dependencies={deps} />)

  expect(await screen.findByText('경험치 10')).toBeVisible()
  expect(deps.recordReward).toHaveBeenCalledTimes(2)
  expect(deps.settleReward).toHaveBeenCalledOnce()
  expect(deps.removePendingReward).toHaveBeenCalledOnce()
  expect(deps.listPendingRewards()).toHaveLength(0)
})

it('does not increase visible totals when the same completion ID is rendered again', async () => {
  window.history.replaceState({}, '', '/?now=2026-08-23T01:00:00.000Z')
  const deps = dependencies()
  let petState = { ...initialPetGameState }
  const settledIds = new Set<string>()
  deps.recoverRewards = vi.fn(async () => petState)
  deps.settleReward = vi.fn(async (eventId) => {
    if (!settledIds.has(eventId)) {
      settledIds.add(eventId)
      petState = { ...petState, xp: petState.xp + 10, coins: petState.coins + 5 }
    }
    return petState
  })
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 한 통 답장하기')])
  const view = render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '메일 한 통 답장하기 완료' }))
  expect(await screen.findByText('경험치 10')).toBeVisible()
  expect(screen.getByText('코인 5')).toBeVisible()

  view.rerender(<TodayScreen key="same-completion" dependencies={deps} />)
  await userEvent.click(await screen.findByRole('button', { name: '메일 한 통 답장하기 완료' }))

  expect(await screen.findByText('경험치 10')).toBeVisible()
  expect(screen.getByText('코인 5')).toBeVisible()
  expect(new Set(vi.mocked(deps.recordReward).mock.calls.map(([event]) => event.id))).toEqual(new Set(['mail@2026-08-23T01:00:00.000Z']))
})

it('recovers pending rewards before showing current pet totals', async () => {
  let resolveRecovery!: (state: PetGameState) => void
  const deps = dependencies()
  deps.recoverRewards = vi.fn(() => new Promise<PetGameState>((resolve) => { resolveRecovery = resolve }))

  render(<TodayScreen dependencies={deps} />)

  expect(screen.queryByText(/경험치 \d+/)).not.toBeInTheDocument()
  resolveRecovery({ ...initialPetGameState, xp: 25, coins: 12 })
  expect(await screen.findByText('경험치 25')).toBeVisible()
  expect(screen.getByText('코인 12')).toBeVisible()
  expect(deps.recoverRewards).toHaveBeenCalledOnce()
})

it('shows loading instead of an empty quest list and reports loader failures inline', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockRejectedValue(new Error('task database unavailable'))
  deps.listCategories = vi.fn().mockRejectedValue(new Error('category database unavailable'))

  render(<TodayScreen dependencies={deps} />)

  expect(screen.getByRole('status', { name: '오늘 퀘스트 불러오는 중' })).toBeVisible()
  expect(screen.queryByText('오늘 퀘스트가 없어요')).not.toBeInTheDocument()
  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent('오늘 퀘스트를 불러오지 못했어요')
  expect(alert).toHaveTextContent('분류를 불러오지 못했어요')
  expect(screen.queryByText('오늘 퀘스트가 없어요')).not.toBeInTheDocument()
})

it('keeps a completed task and explains that a recorded reward will recover later', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([openTask('mail', '메일 한 통 답장하기')])
  deps.settleReward = vi.fn().mockRejectedValue(new Error('transaction interrupted'))
  render(<TodayScreen dependencies={deps} />)

  await userEvent.click(await screen.findByRole('button', { name: '메일 한 통 답장하기 완료' }))

  expect(await screen.findByRole('status')).toHaveTextContent('보상은 다음 실행에서 다시 받을 수 있어요')
  expect(screen.getByRole('button', { name: '메일 한 통 답장하기 완료됨' })).toBePressed()
  expect(deps.recordReward).toHaveBeenCalledOnce()
})

it('organizes input but does not save before review confirmation', async () => {
  const deps = dependencies()
  render(<TodayScreen dependencies={deps} />)
  await userEvent.click(screen.getByRole('button', { name: '여러 할 일 한 번에 입력' }))
  await userEvent.type(screen.getByLabelText('오늘 할 일 한 번에 적기'), '수학 숙제하고 3시에 병원')
  await userEvent.click(screen.getByRole('button', { name: '정리하기' }))
  expect(screen.getAllByLabelText('할 일 제목')).toHaveLength(2)
  expect(deps.saveMany).not.toHaveBeenCalled()
})

it('saves reviewed tasks and shows the first focus action', async () => {
  const deps = dependencies()
  render(<TodayScreen dependencies={deps} />)
  await userEvent.click(screen.getByRole('button', { name: '여러 할 일 한 번에 입력' }))
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
  await userEvent.click(screen.getByText('계획 도구'))
  const priorityHeading = await screen.findByRole('heading', { name: '오늘의 우선순위' })
  const prioritySection = priorityHeading.closest('section')!
  expect(within(prioritySection).getByText('보고서 작성')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: '운동' }))
  expect(within(prioritySection).getByText('달리기')).toBeInTheDocument()
  expect(within(prioritySection).queryByText('보고서 작성')).not.toBeInTheDocument()
})

it('keeps quick add accessible before the work board', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([{
    id: 'now', title: '영어 단어 10개', day: '2026-08-20', status: 'open', priority: 1,
    estimateMinutes: 15, category: 'study', source: 'manual', createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z',
  }])
  render(<TodayScreen dependencies={deps} />)
  const board = await screen.findByRole('region', { name: '오늘 할 일' })
  const capture = screen.getAllByRole('textbox', { name: /빠른 할 일 추가/ })[0]
  expect(capture.compareDocumentPosition(board) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

it('shows no more than two upcoming scheduled tasks', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([1, 2, 3].map((index) => ({
    id: `scheduled-${index}`, title: `일정 ${index}`, day: '2026-08-20', dueAt: `2026-08-20T${10 + index}:00:00+09:00`,
    status: 'open' as const, priority: 2 as const, estimateMinutes: 15, category: 'life' as const,
    source: 'manual' as const, createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z',
  })))
  render(<TodayScreen dependencies={deps} />)
  await userEvent.click(screen.getByText('계획 도구'))
  expect(await screen.findAllByTestId('upcoming-item')).toHaveLength(2)
})

it('puts the pet and recommended quest before quick add and the quest list', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([
    { id: 'open', title: '수학 숙제', day: '2026-08-20', status: 'open', priority: 1, estimateMinutes: 20, category: 'study', source: 'manual', createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z' },
    { id: 'done', title: '물 마시기', day: '2026-08-20', status: 'completed', priority: 2, estimateMinutes: 5, category: 'life', source: 'manual', createdAt: '2026-08-20T07:00:00Z', updatedAt: '2026-08-20T07:10:00Z' },
  ])
  render(<TodayScreen dependencies={deps} />)
  const pet = await screen.findByRole('region', { name: '몽글이' })
  const featured = screen.getByRole('region', { name: '추천 퀘스트' })
  const capture = screen.getByRole('region', { name: '빠른 할 일 입력' })
  const list = screen.getByRole('region', { name: '오늘 할 일' })
  expect(screen.getByText('1개 완료 · 2개 중')).toBeVisible()
  expect(within(list).getByRole('button', { name: '수학 숙제 지금 하기' })).toBeVisible()
  expect(pet.compareDocumentPosition(featured) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(featured.compareDocumentPosition(capture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(capture.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(screen.queryByRole('heading', { name: '오늘의 우선순위' })).not.toBeInTheDocument()
})

it('does not reserve a large upcoming section when there are no scheduled tasks', async () => {
  const deps = dependencies()
  deps.listForDay = vi.fn().mockResolvedValue([{
    id: 'open', title: '책 읽기', day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 10,
    category: 'study', source: 'manual', createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z',
  }])
  render(<TodayScreen dependencies={deps} />)
  await screen.findByRole('button', { name: '책 읽기 지금 하기' })
  expect(screen.queryByRole('region', { name: '다음 일정' })).not.toBeInTheDocument()
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

  await userEvent.click(screen.getByText('계획 도구'))
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

  await userEvent.click(screen.getByText('계획 도구'))
  await userEvent.click(await screen.findByRole('button', { name: '일정 다시 잡기' }))
  await userEvent.click(screen.getByRole('button', { name: '5분으로 줄이기' }))

  expect(deps.saveMany).toHaveBeenCalledWith([expect.objectContaining({ id: 'required', estimateMinutes: 5, required: true })])
})
