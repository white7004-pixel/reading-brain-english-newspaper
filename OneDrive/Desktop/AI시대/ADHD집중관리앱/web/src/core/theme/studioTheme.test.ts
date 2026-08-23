import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { App } from '../../app/App'
import { applyTheme, studioThemeTokens } from './theme'

const tokens = readFileSync('src/core/theme/tokens.css', 'utf8')
const globalStyles = readFileSync('src/core/theme/global.css', 'utf8')

function lastDeclaration(selector: string, property: string) {
  let value: string | undefined
  for (const match of globalStyles.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = match[1].split(',').map((candidate) => candidate.replace(/\/\*[\s\S]*?\*\//g, '').trim())
    if (!selectors.includes(selector)) continue
    const declaration = match[2].match(new RegExp(`(?:^|;)\\s*${property.replace('-', '\\-')}\\s*:\\s*([^;]+)`))
    if (declaration) value = declaration[1].trim()
  }
  return value
}

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
  expect(globalStyles).toMatch(/\.appearance-bg--studio-purple\s*{[^}]*background:\s*var\(--color-bg\)\s*!important;/s)
  expect(globalStyles).toMatch(/\.featured-quest\s*{[^}]*background:\s*var\(--color-quest\);/s)
  const matureOverrides = globalStyles.slice(globalStyles.indexOf('/* Mature dashboard shell */'))
  expect(matureOverrides).not.toMatch(/\.pet-hero\s*[,\{]/)
})

it('keeps late-loaded feature cards inside the mature surface contract', () => {
  for (const selector of ['.appearance-wizard', '.room-item']) {
    expect(lastDeclaration(selector, 'border'), selector).toBe('1px solid var(--color-line) !important')
    expect(lastDeclaration(selector, 'border-radius'), selector).toBe('var(--radius-card) !important')
    expect(lastDeclaration(selector, 'background'), selector).toBe('var(--color-surface) !important')
    expect(lastDeclaration(selector, 'box-shadow'), selector).toBe('var(--shadow-card-3d) !important')
    expect(lastDeclaration(selector, 'backdrop-filter'), selector).toBe('none !important')
  }
})

it('keeps every known undersized primary-route control at the 48px tap target', () => {
  const selectors = [
    '.persistent-now-task__actions button',
    '.control-only select',
    ".settings-row input[type='time']",
    '.settings-link',
    '.today-add',
    '.energy button',
    '.today-progress-copy select',
  ]

  for (const selector of selectors) {
    expect(lastDeclaration(selector, 'min-height'), selector).toBe('var(--tap-min) !important')
  }
  for (const control of ['button', 'a', 'select', 'textarea', 'summary']) {
    expect(lastDeclaration(`.app-shell ${control}`, 'min-height'), control).toBe('var(--tap-min) !important')
  }
  for (const input of [
    ".app-shell input:not([type])",
    ".app-shell input[type='text']",
    ".app-shell input[type='search']",
    ".app-shell input[type='email']",
    ".app-shell input[type='password']",
    ".app-shell input[type='url']",
    ".app-shell input[type='tel']",
    ".app-shell input[type='number']",
    ".app-shell input[type='date']",
    ".app-shell input[type='datetime-local']",
    ".app-shell input[type='month']",
    ".app-shell input[type='week']",
    ".app-shell input[type='time']",
  ]) {
    expect(lastDeclaration(input, 'min-height'), input).toBe('var(--tap-min) !important')
  }
})

it('preserves intrinsic checkbox, radio, file, and color input sizing', () => {
  expect(lastDeclaration('.app-shell input', 'min-height')).toBeUndefined()
  for (const type of ['checkbox', 'radio', 'file', 'color']) {
    const selector = `.app-shell input[type='${type}']`
    expect(lastDeclaration(selector, 'min-height'), selector).toBe('auto !important')
  }
})

it('provides a 48px hit area around intrinsic checkbox and radio controls', () => {
  for (const selector of [
    ".app-shell label:has(input[type='checkbox'])",
    ".app-shell label:has(input[type='radio'])",
    '.switch',
    '.mission-select',
    '.check-row',
    '.focus-screen li',
  ]) {
    expect(lastDeclaration(selector, 'min-height'), selector).toBe('var(--tap-min)')
  }
})

it('normalizes every reachable prompt and mission surface to the mature card contract', () => {
  const selectors = [
    '.extended-mission-entry',
    '.persistent-now-task',
    ".persistent-now-task[data-stage='direct']",
    ".persistent-now-task[data-stage='decision']",
    '.mission-reschedule',
  ]

  for (const selector of selectors) {
    expect(lastDeclaration(selector, 'border'), selector).toBe('1px solid var(--color-line)')
    expect(lastDeclaration(selector, 'border-radius'), selector).toBe('var(--radius-card)')
    expect(lastDeclaration(selector, 'background'), selector).toBe('var(--color-surface)')
    expect(lastDeclaration(selector, 'box-shadow'), selector).toBe('var(--shadow-card-3d)')
    expect(lastDeclaration(selector, 'backdrop-filter'), selector).toBe('none')
  }
})

it('keeps action lavender off decorative dashboard copy', () => {
  const selectors = [
    '.extended-mission-entry span',
    '.current-mission-card > span',
    '.now-card > span',
    '.timeline small',
    '.focus-screen > span',
    '.section-heading span',
    '.feature-screen > span',
    '.persistent-now-task span',
    '.priority-task-heading span',
  ]

  for (const selector of selectors) {
    expect(lastDeclaration(selector, 'color'), selector).toBe('var(--color-muted)')
  }
})
