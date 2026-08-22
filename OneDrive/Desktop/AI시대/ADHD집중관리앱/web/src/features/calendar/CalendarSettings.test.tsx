import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { CalendarSettings } from './CalendarSettings'

it('explains read-only access before connecting', async () => {
  const onConnect = vi.fn()
  render(<CalendarSettings state={{ kind: 'disconnected' }} onConnect={onConnect} onRefresh={vi.fn()} onDisconnect={vi.fn()} />)
  expect(screen.getByText('일정 내용은 읽지 않고 바쁜 시간만 확인해요')).toBeVisible()
  expect(screen.getByText('Google 일정은 변경하지 않아요')).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: 'Google Calendar 연결' }))
  expect(onConnect).toHaveBeenCalledOnce()
})
