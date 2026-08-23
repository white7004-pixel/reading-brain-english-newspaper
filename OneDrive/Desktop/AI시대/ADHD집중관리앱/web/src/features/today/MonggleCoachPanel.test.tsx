import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { initialPetGameState } from '../pet/model'
import type { CoachDecision } from '../nudges/taskMastery'
import { MonggleCoachPanel } from './MonggleCoachPanel'

const decision: CoachDecision = {
  stage: 'direct',
  line: '하기로 한 수학 숙제를 기억하고 있어요.',
  actions: ['start', 'remind_5', 'reschedule'],
  nextPromptAt: new Date('2026-08-20T02:00:00Z'),
}

it('announces the textual stage and coach line politely', () => {
  render(<MonggleCoachPanel state={initialPetGameState} coachLine={decision.line} decision={decision} />)
  const status = screen.getByRole('status')
  expect(status).toHaveAttribute('aria-live', 'polite')
  expect(status).toHaveTextContent('한번 다시 보기')
  expect(status).toHaveTextContent(decision.line)
})

it('routes actions through the response and explicit reschedule callbacks', async () => {
  const onRespond = vi.fn()
  const onReschedule = vi.fn()
  render(<MonggleCoachPanel state={initialPetGameState} coachLine={decision.line} decision={decision} onRespond={onRespond} onReschedule={onReschedule} />)

  await userEvent.click(screen.getByRole('button', { name: '지금 시작' }))
  await userEvent.click(screen.getByRole('button', { name: '5분 뒤 알림' }))
  await userEvent.click(screen.getByRole('button', { name: '일정 다시 잡기' }))

  expect(onRespond).toHaveBeenNthCalledWith(1, 'start')
  expect(onRespond).toHaveBeenNthCalledWith(2, 'remind_5', 5)
  expect(onReschedule).toHaveBeenCalledOnce()
  for (const button of screen.getAllByRole('button')) expect(button).toHaveClass('coach-action')
})

it('does not announce a suppressed quiet or busy prompt', () => {
  render(<MonggleCoachPanel state={initialPetGameState} coachLine={decision.line} decision={{ ...decision, nextPromptAt: null }} suppressed />)
  expect(screen.getByText(decision.line)).toBeVisible()
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
  expect(screen.getByText(decision.line).closest('[aria-live]')).toHaveAttribute('aria-live', 'off')
})
