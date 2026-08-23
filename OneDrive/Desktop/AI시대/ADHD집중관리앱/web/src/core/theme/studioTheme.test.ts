import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { App } from '../../app/App'
import { applyTheme, studioThemeTokens } from './theme'

const tokens = readFileSync('src/core/theme/tokens.css', 'utf8')
const globalStyles = readFileSync('src/core/theme/global.css', 'utf8')

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

it('defines the mature dashboard color and card tokens', () => {
  expect(tokens).toMatch(/--color-bg:\s*#F4F3F1;/i)
  expect(tokens).toMatch(/--color-text:\s*#242329;/i)
  expect(tokens).toMatch(/--color-surface:\s*#FFFFFF;/i)
  expect(tokens).toMatch(/--color-accent-soft:\s*#E9E4F3;/i)
  expect(tokens).toMatch(/--color-accent:\s*#6E5AA8;/i)
  expect(tokens).toMatch(/--color-quest:\s*#292735;/i)
  expect(tokens).toMatch(/--radius-card:\s*16px;/)
})

it('uses Pretendard-first adult typography and keeps motion reduction', () => {
  expect(globalStyles).toMatch(/font-family:\s*"Pretendard Variable",\s*Pretendard/)
  expect(globalStyles).toMatch(/body\s*{[^}]*font-weight:\s*450;/s)
  expect(globalStyles).toMatch(/\.app-shell h1,\s*\.app-shell h2,\s*\.app-shell h3\s*{[^}]*font-weight:\s*680;/s)
  expect(globalStyles).toContain('@media (prefers-reduced-motion: reduce)')
})

it('uses the calm page and dark quest surfaces without flattening the pet hero', () => {
  expect(globalStyles).toMatch(/\.appearance-bg--studio-purple\s*{[^}]*background:\s*var\(--color-bg\);/s)
  expect(globalStyles).toMatch(/\.featured-quest\s*{[^}]*background:\s*var\(--color-quest\);/s)
  const matureOverrides = globalStyles.slice(globalStyles.indexOf('/* Mature dashboard shell */'))
  expect(matureOverrides).not.toMatch(/\.pet-hero\s*[,\{]/)
})
