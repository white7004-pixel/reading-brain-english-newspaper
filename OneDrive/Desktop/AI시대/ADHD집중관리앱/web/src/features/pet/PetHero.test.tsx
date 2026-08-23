import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { initialPetGameState } from './model'
import { PetHero } from './PetHero'

it('labels the 3D coach once while keeping progress available as text', () => {
  render(<PetHero state={{ ...initialPetGameState, petName: '몽글이', level: 2, xp: 130, dailyHearts: 3 }} />)

  const coach = screen.getByRole('region', { name: '3D 몽글 코치' })
  expect(coach).toBeVisible()
  expect(getComputedStyle(coach).minHeight).toBe('200px')
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
  expect(screen.getByText('레벨 2')).toBeVisible()
  expect(screen.getByRole('progressbar', { name: '몽글이 성장 진행률' }))
    .toHaveAttribute('aria-valuenow', '30')
  expect(screen.getByRole('progressbar', { name: '몽글이 성장 진행률' }))
    .toHaveAttribute('aria-valuetext', '성장 진행률 30%')
})

it('keeps the coach label stable when more than one pet hero is rendered', () => {
  render(<>
    <PetHero state={{ ...initialPetGameState, petName: '몽글이' }} />
    <PetHero state={{ ...initialPetGameState, petName: '보리' }} />
  </>)

  expect(screen.getAllByRole('region', { name: '3D 몽글 코치' })).toHaveLength(2)
})
