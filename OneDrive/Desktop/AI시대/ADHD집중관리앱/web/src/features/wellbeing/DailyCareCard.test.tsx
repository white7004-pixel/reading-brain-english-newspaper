import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import { DailyCareCard } from './DailyCareCard'

const templates: RecurringTaskTemplate[] = [
  { id: 'daily-reading', title: '독서', personaIds: ['personal'], category: 'reading', cadence: { kind: 'daily' }, targetCount: 1, estimateMinutes: 10, firstAction: '책 한 쪽 펼치기', carryForward: false, active: true },
  { id: 'daily-exercise', title: '운동', personaIds: ['personal'], category: 'exercise', cadence: { kind: 'daily' }, targetCount: 1, estimateMinutes: 10, firstAction: '자리에서 가볍게 스트레칭', carryForward: false, active: true },
]

const instances: RecurringTaskInstance[] = templates.map((template) => ({
  id: `${template.id}@2026-08-24`, templateId: template.id, periodKey: '2026-08-24', scheduledDay: '2026-08-24', status: 'open',
}))

beforeEach(() => localStorage.clear())

it('shows reading and exercise as gentle ten-minute routines', () => {
  render(<DailyCareCard day="2026-08-24" templates={templates} instances={instances} onComplete={vi.fn()} />)
  const card = screen.getByRole('region', { name: '나를 챙기는 루틴' })
  expect(card).toHaveTextContent('독서')
  expect(card).toHaveTextContent('운동')
  expect(card).toHaveTextContent('10분')
})

it('lets a busy user shrink a routine to three minutes without marking failure', async () => {
  render(<DailyCareCard day="2026-08-24" templates={templates} instances={instances} onComplete={vi.fn()} />)
  await userEvent.click(screen.getByRole('button', { name: '독서 3분으로 줄이기' }))
  expect(screen.getByLabelText('독서 루틴')).toHaveTextContent('3분')
  expect(screen.queryByText(/실패|연속 기록/)).not.toBeInTheDocument()
})

it('shows one daily quote and can hide it for today', async () => {
  render(<DailyCareCard day="2026-08-24" templates={templates} instances={instances} onComplete={vi.fn()} />)
  expect(screen.getByRole('blockquote')).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: '오늘은 명언 숨기기' }))
  expect(screen.queryByRole('blockquote')).not.toBeInTheDocument()
  expect(localStorage.getItem('monggle.quote.hidden-day')).toBe('2026-08-24')
})

it('respects disabled routines, custom minutes, and the motivation preference', () => {
  localStorage.setItem('monggle.settings.v1', JSON.stringify({ readingMinutes: 5, exerciseEnabled: false, motivationEnabled: false }))
  render(<DailyCareCard day="2026-08-24" templates={templates} instances={instances} onComplete={vi.fn()} />)
  expect(screen.getByLabelText('독서 루틴')).toHaveTextContent('5분')
  expect(screen.queryByLabelText('운동 루틴')).not.toBeInTheDocument()
  expect(screen.queryByRole('blockquote')).not.toBeInTheDocument()
})
