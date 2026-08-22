import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { RewardBurst } from './RewardBurst'

it('lets the user dismiss reward feedback immediately', async () => {
  const onDismiss = vi.fn()
  render(<RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={onDismiss} />)

  await userEvent.click(screen.getByRole('button', { name: '보상 화면 닫기' }))

  expect(onDismiss).toHaveBeenCalledOnce()
})
