import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { initialPetGameState, type PetGameState } from './model'
import { PetScreen, type PetScreenDependencies } from './PetScreen'

function petDependencies(initialState: PetGameState): PetScreenDependencies {
  let state = { ...initialState }
  return {
    loadState: vi.fn(async () => state),
    feedPet: vi.fn(async () => {
      if (state.food > 0) state = { ...state, food: state.food - 1, affinity: state.affinity + 1 }
      return state
    }),
    equipItem: vi.fn(async (itemId: string) => {
      state = { ...state, equippedItemIds: [...state.equippedItemIds, itemId] }
      return state
    }),
  }
}

it('feeds the pet only when food is available', async () => {
  render(<PetScreen dependencies={petDependencies({ ...initialPetGameState, food: 1 })} />)

  await userEvent.click(await screen.findByRole('button', { name: '몽글이에게 먹이 주기' }))

  expect(screen.getByText('친밀도 1')).toBeVisible()
  expect(screen.getByText('먹이 0개')).toBeVisible()
})

it('shows premium room items as non-purchasable previews', async () => {
  render(<PetScreen dependencies={petDependencies(initialPetGameState)} />)

  expect(await screen.findByRole('button', { name: '별빛 침대 출시 준비 중' })).toBeDisabled()
})

it('shows room item failures inline without clearing pet state', async () => {
  const dependencies = petDependencies({ ...initialPetGameState, coins: 10 })
  dependencies.equipItem = vi.fn(async () => { throw new Error('코인이 부족해요') })
  render(<PetScreen dependencies={dependencies} />)

  await userEvent.click(await screen.findByRole('button', { name: '구름 방석 20코인' }))

  expect(await screen.findByRole('status')).toHaveTextContent('코인이 부족해요')
  expect(screen.getByText('코인 10개')).toBeVisible()
})
