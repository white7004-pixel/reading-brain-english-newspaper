import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { initialPetGameState } from './model'
import { PetHero } from './PetHero'

it('shows pet progress without making the illustration the only label', () => {
  render(<PetHero state={{ ...initialPetGameState, petName: '몽글이', level: 2, xp: 130, dailyHearts: 3 }} />)

  expect(screen.getByRole('img', { name: '기분 좋은 몽글이' })).toBeVisible()
  expect(screen.getByText('레벨 2')).toBeVisible()
  expect(screen.getByRole('progressbar', { name: '몽글이 성장 진행률' })).toHaveAttribute('aria-valuenow', '30')
})
