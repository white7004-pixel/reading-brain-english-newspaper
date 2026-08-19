import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { FocusScreen } from './FocusScreen'

it('shows one task, timer, steps, and focus controls', () => {
  render(<FocusScreen title="과학 보고서 작성" minutes={25} />)
  expect(screen.getByRole('heading', { name: '과학 보고서 작성' })).toBeVisible()
  expect(screen.getByText('25:00')).toBeVisible()
  expect(screen.getByRole('button', { name: '시작' })).toBeVisible()
  expect(screen.getByRole('button', { name: '5분 추가' })).toBeVisible()
})
