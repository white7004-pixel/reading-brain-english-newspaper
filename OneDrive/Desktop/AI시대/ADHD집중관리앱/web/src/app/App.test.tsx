import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { App } from './App'

it('renders the Monggle product name', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: '몽글' })).toBeVisible()
})
