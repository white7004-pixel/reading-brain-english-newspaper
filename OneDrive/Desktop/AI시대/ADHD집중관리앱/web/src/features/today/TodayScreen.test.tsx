import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { TodayScreen } from './TodayScreen'

it('creates a task and exposes one focus action', async () => {
  render(<TodayScreen />)
  await userEvent.type(screen.getByLabelText('빠른 캡처'), '영어 수행평가 자료 열기')
  await userEvent.click(screen.getByRole('button', { name: '할 일로 저장' }))
  expect(await screen.findByRole('heading', { name: '영어 수행평가 자료 열기' })).toBeVisible()
  expect(screen.getByRole('button', { name: '집중 시작' })).toBeVisible()
})
