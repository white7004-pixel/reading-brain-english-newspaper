import type { ThemeMode } from '../model/settings'

export function applyTheme(mode: ThemeMode) {
  const resolved = mode === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode
  document.documentElement.dataset.theme = resolved
}
