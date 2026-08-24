import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { ConnectorSettings } from './ConnectorSettings'

it('keeps cached items available when a connector becomes stale', async () => {
  const retry = vi.fn()
  render(<ConnectorSettings states={{
    kakaotalk: { kind: 'disconnected' },
    kakaowork: { kind: 'stale', account: '리딩브레인', lastSuccessfulSync: '2026-08-24T01:00:00Z' },
    google: { kind: 'connected', account: 'owner@example.com', lastSuccessfulSync: '2026-08-24T02:00:00Z' },
  }} onConnect={vi.fn()} onRetry={retry} onDisconnect={vi.fn()} />)

  expect(screen.getByText(/저장된 항목은 계속 볼 수 있어요/)).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: '카카오워크 다시 시도' }))
  expect(retry).toHaveBeenCalledWith('kakaowork')
  expect(screen.getByText(/검토 전에는 퀘스트가 되지 않아요/)).toBeVisible()
})
