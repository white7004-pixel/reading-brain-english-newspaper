import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MonggleCompanion } from './MonggleCompanion'

it('rests instead of wandering when motion is reduced', () => {
  render(<MonggleCompanion reducedMotion mascotVisible event={null} />)
  expect(screen.getByTestId('monggle-companion')).toHaveAttribute('data-mode', 'resting')
})

it('shows a calm decision state and humane message after repeated misses', () => {
  render(<MonggleCompanion reducedMotion={false} mascotVisible event={null} intensity="decision" />)
  expect(screen.getByTestId('monggle-companion')).toHaveAttribute('data-intensity', 'decision')
  expect(screen.getByRole('status')).toHaveTextContent('함께 정해요')
})

it('is absent when the user hides it', () => {
  render(<MonggleCompanion reducedMotion={false} mascotVisible={false} event={null} />)
  expect(screen.queryByTestId('monggle-companion')).not.toBeInTheDocument()
})

it('is decorative and cannot intercept input', () => {
  render(<MonggleCompanion reducedMotion={false} mascotVisible event={null} />)
  const companion = screen.getByTestId('monggle-companion')
  expect(companion).toHaveAttribute('aria-hidden', 'true')
  expect(companion).toHaveClass('monggle-companion')
  expect(companion.querySelector('img')).toHaveAttribute('alt', '')
})

it('uses a locally created profile when one is applied', () => {
  render(<MonggleCompanion reducedMotion mascotVisible event={null} sourceUrl="blob:profile" />)
  expect(screen.getByTestId('monggle-companion')).toHaveAttribute('data-source', 'personal')
  expect(screen.getByTestId('monggle-companion').querySelector('img')).toHaveAttribute('src', 'blob:profile')
})
