import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { MonthlyScreen } from './MonthlyScreen'
import type { Task } from '../../core/model/task'

it('moves from December into January and back across the year boundary', async () => {
  const user = userEvent.setup()
  render(<MonthlyScreen initialDate={new Date('2026-12-15T00:00:00+09:00')} />)

  expect(screen.getByText('2026년 12월')).toBeVisible()

  await user.click(screen.getByRole('button', { name: '다음 달' }))
  expect(screen.getByText('2027년 1월')).toBeVisible()

  await user.click(screen.getByRole('button', { name: '이전 달' }))
  expect(screen.getByText('2026년 12월')).toBeVisible()
})

it('moves from January into the previous December', async () => {
  const user = userEvent.setup()
  render(<MonthlyScreen initialDate={new Date('2027-01-15T00:00:00+09:00')} />)

  await user.click(screen.getByRole('button', { name: '이전 달' }))

  expect(screen.getByText('2026년 12월')).toBeVisible()
})

it('exposes an accessible monthly calendar empty state', () => {
  render(<MonthlyScreen initialDate={new Date('2026-08-15T00:00:00+09:00')} />)

  const calendar = screen.getByRole('region', { name: '월간 달력' })
  expect(calendar).toHaveTextContent('0/0 완료')
})

it('shows date completion text and links a selected date back to Today', async () => {
  const completed: Task = {
    id: 'task-1', title: '학부모 상담', day: '2026-08-24', status: 'completed', priority: 1,
    estimateMinutes: 20, category: 'work', categoryId: 'counseling', personaIds: ['counseling'],
    source: 'manual', createdAt: '2026-08-24T00:00:00.000Z', updatedAt: '2026-08-24T01:00:00.000Z',
  }
  render(<MonthlyScreen initialDate={new Date('2026-08-15T00:00:00+09:00')} tasks={[completed]} />)

  expect(screen.getByRole('link', { name: /24일.*1개 완료.*1개 중/ })).toHaveAttribute('href', '/?day=2026-08-24')
  expect(screen.getByRole('region', { name: '운영 지표' })).toBeVisible()
})
