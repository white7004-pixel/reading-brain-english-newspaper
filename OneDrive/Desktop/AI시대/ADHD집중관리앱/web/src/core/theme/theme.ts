import type { ThemeMode } from '../model/settings'

export const studioThemeTokens = [
  '--color-glass',
  '--color-glass-line',
  '--shadow-card-3d',
  '--shadow-control-3d',
  '--glow-lavender',
] as const

export function applyTheme(mode: ThemeMode) {
  const resolved = mode === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode
  document.documentElement.dataset.theme = resolved
}
