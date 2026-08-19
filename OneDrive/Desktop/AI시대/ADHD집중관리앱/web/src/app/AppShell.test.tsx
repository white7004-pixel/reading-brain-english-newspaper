import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { App } from './App'

it('keeps the five tabs in the approved order', () => {
  render(<App />)
  expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
    '오늘',
    '집중',
    '메시지',
    '루틴',
    '설정',
  ])
})

it('does not change navigation when profile type changes', async () => {
  render(<App />)
  const before = screen.getAllByRole('link').map((link) => link.getAttribute('href'))
  await userEvent.selectOptions(screen.getByLabelText('사용자 유형'), 'worker')
  expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual(before)
})
