import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { MessagesScreen } from './MessagesScreen'

it('saves a reviewed local message schedule', async () => {
  render(<MessagesScreen />)
  await userEvent.click(screen.getByRole('button', { name: '새 예약' }))
  await userEvent.selectOptions(screen.getByLabelText('플랫폼'), 'slack')
  await userEvent.type(screen.getByLabelText('받는 곳'), '#study-team')
  await userEvent.type(screen.getByLabelText('메시지'), '자료를 오전에 공유할게요.')
  await userEvent.type(screen.getByLabelText('예약 시각'), '2026-08-21T09:00')
  await userEvent.click(screen.getByRole('button', { name: '예약 저장' }))
  expect(screen.getByText('예약됨')).toBeVisible()
  expect(screen.getByText('#study-team')).toBeVisible()
})
