import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { MonthlyScreen } from './MonthlyScreen'

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
  expect(calendar).toHaveTextContent('월간 작업')
})
