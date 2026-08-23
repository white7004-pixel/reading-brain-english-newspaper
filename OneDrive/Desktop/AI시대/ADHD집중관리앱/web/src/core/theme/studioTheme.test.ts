import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { App } from '../../app/App'
import { applyTheme, studioThemeTokens } from './theme'

it('defines the approved Studio 3D surface contract', () => {
  for (const token of ['--color-glass', '--color-glass-line', '--shadow-card-3d', '--shadow-control-3d', '--glow-lavender']) {
    expect(studioThemeTokens).toContain(token)
  }
  render(App())
  expect(screen.getByRole('main').parentElement).toHaveClass('studio-surface')
})

it('falls back to light when system media information is unavailable', () => {
  expect(() => applyTheme('system')).not.toThrow()
  expect(document.documentElement.dataset.theme).toBe('light')
})

it('exposes the professional mobile layout tokens', () => {
  for (const token of ['--space-page', '--tap-min', '--radius-card', '--nav-clearance']) {
    expect(studioThemeTokens).toContain(token)
  }
})
