import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { PersistentNowTask } from './PersistentNowTask'
import type { CoachDecision } from './taskMastery'

const task: Task = { id: 'task-1', title: '수학 숙제', day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 15, category: 'study', source: 'manual', createdAt: '2026-08-20T00:00:00Z', updatedAt: '2026-08-20T00:00:00Z' }

const decision: CoachDecision = {
  stage: 'decision',
  line: '수학 숙제를 지금 어떻게 이어갈지 함께 정해요.',
  actions: ['start', 'remind_5', 'reschedule', 'cancel'],
  nextPromptAt: new Date('2026-08-20T01:30:00Z'),
}

it('shows a polite live decision with accessible 48px actions', () => {
  render(<PersistentNowTask task={task} decision={decision} onRespond={vi.fn()} onReschedule={vi.fn()} onCancel={vi.fn()} />)
  const prompt = screen.getByRole('status')
  expect(prompt).toHaveAttribute('aria-live', 'polite')
  expect(prompt).toHaveTextContent('지금 결정하기')
  expect(prompt).toHaveTextContent(decision.line)
  expect(screen.getByTestId('persistent-now-task')).toHaveAttribute('data-escalation-level', 'push')
  expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual(['지금 시작', '5분 뒤 알림', '일정 다시 잡기', '할 일 취소'])
  for (const button of screen.getAllByRole('button')) expect(button).toHaveClass('coach-action')
})

it('dispatches start and exact five-minute reminder actions', async () => {
  const onRespond = vi.fn()
  render(<PersistentNowTask task={task} decision={decision} onRespond={onRespond} onReschedule={vi.fn()} onCancel={vi.fn()} />)
  await userEvent.click(screen.getByRole('button', { name: '지금 시작' }))
  await userEvent.click(screen.getByRole('button', { name: '5분 뒤 알림' }))
  expect(onRespond).toHaveBeenNthCalledWith(1, 'start')
  expect(onRespond).toHaveBeenNthCalledWith(2, 'remind_5', 5)
})

it('keeps reschedule and cancel behind explicit callbacks', async () => {
  const onRespond = vi.fn()
  const onReschedule = vi.fn()
  const onCancel = vi.fn()
  render(<PersistentNowTask task={task} decision={decision} onRespond={onRespond} onReschedule={onReschedule} onCancel={onCancel} />)

  await userEvent.click(screen.getByRole('button', { name: '일정 다시 잡기' }))
  await userEvent.click(screen.getByRole('button', { name: '할 일 취소' }))

  expect(onReschedule).toHaveBeenCalledOnce()
  expect(onCancel).toHaveBeenCalledOnce()
  expect(onRespond).not.toHaveBeenCalled()
})

it('keeps the task visible without exposing a live announcement when suppressed', () => {
  render(<PersistentNowTask task={task} decision={{ ...decision, nextPromptAt: null }} suppressed onRespond={vi.fn()} />)
  expect(screen.getByTestId('persistent-now-task')).toHaveTextContent(decision.line)
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
  expect(screen.getByTestId('persistent-now-task').querySelector('[aria-live]')).toHaveAttribute('aria-live', 'off')
})
