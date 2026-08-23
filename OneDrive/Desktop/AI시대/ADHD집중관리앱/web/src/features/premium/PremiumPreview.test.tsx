import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PremiumPreview } from './PremiumPreview'

it('labels locked features without presenting a working purchase', () => {
  render(<PremiumPreview features={['새로운 펫', '별빛 방']} />)

  expect(screen.getByText('출시 준비 중')).toBeVisible()
  expect(screen.getByText('새로운 펫')).toBeVisible()
  expect(screen.getByText('별빛 방')).toBeVisible()
  expect(screen.queryByRole('button', { name: /구매|구독|결제/ })).not.toBeInTheDocument()
})
