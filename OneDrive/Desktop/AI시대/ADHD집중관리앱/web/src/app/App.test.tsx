import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it } from 'vitest'
import { App } from './App'

beforeEach(() => {
  window.history.replaceState({}, '', '/')
})

it('renders the Monggle product name', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: '몽글' })).toBeVisible()
})

it('opens the monthly operations screen from the primary navigation', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('link', { name: '월간' }))

  expect(screen.getByRole('heading', { name: '월간 운영' })).toBeVisible()
  expect(window.location.pathname).toBe('/monthly')
})
