import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { App } from '../../app/App'
import { studioThemeTokens } from './theme'

it('defines the approved Studio 3D surface contract', () => {
  for (const token of ['--color-glass', '--color-glass-line', '--shadow-card-3d', '--shadow-control-3d', '--glow-lavender']) {
    expect(studioThemeTokens).toContain(token)
  }
  render(App())
  expect(screen.getByRole('main').parentElement).toHaveClass('studio-surface')
})
