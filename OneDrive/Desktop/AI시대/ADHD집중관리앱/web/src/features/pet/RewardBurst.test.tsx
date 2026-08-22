import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { RewardBurst } from './RewardBurst'

it('lets the user dismiss reward feedback immediately', async () => {
  const onDismiss = vi.fn()
  render(<RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={onDismiss} />)

  expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-modal')
  await userEvent.click(screen.getByRole('button', { name: '보상 화면 닫기' }))

  expect(onDismiss).toHaveBeenCalledOnce()
})

it('moves focus to the immediate dismissal control', () => {
  render(<RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={vi.fn()} />)

  expect(screen.getByRole('button', { name: '보상 화면 닫기' })).toHaveFocus()
})

it('dismisses reward feedback with Escape', async () => {
  const onDismiss = vi.fn()
  const user = userEvent.setup()
  render(<RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={onDismiss} />)

  await user.keyboard('{Escape}')

  expect(onDismiss).toHaveBeenCalledOnce()
})

it('restores focus when reward feedback unmounts', () => {
  const { rerender } = render(<button type="button">퀘스트 완료</button>)
  const opener = screen.getByRole('button', { name: '퀘스트 완료' })
  opener.focus()

  rerender(<>
    <button type="button">퀘스트 완료</button>
    <RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={vi.fn()} />
  </>)
  expect(screen.getByRole('button', { name: '보상 화면 닫기' })).toHaveFocus()

  rerender(<button type="button">퀘스트 완료</button>)

  expect(opener).toHaveFocus()
})

it('uses unique title and description associations for each dialog', () => {
  render(<>
    <RewardBurst grant={{ xp: 15, coins: 7, food: 1, hearts: 1 }} onDismiss={vi.fn()} />
    <RewardBurst grant={{ xp: 10, coins: 4, food: 0, hearts: 0 }} onDismiss={vi.fn()} />
  </>)

  const dialogs = screen.getAllByRole('dialog')
  expect(new Set(dialogs.map(dialog => dialog.getAttribute('aria-labelledby'))).size).toBe(2)
  expect(new Set(dialogs.map(dialog => dialog.getAttribute('aria-describedby'))).size).toBe(2)
})
