export function nowFromSearch(actualNow: Date, search: string, allowOverride: boolean) {
  if (!allowOverride) return actualNow
  const value = new URLSearchParams(search).get('now')
  if (!value) return actualNow
  const overridden = new Date(value)
  return Number.isNaN(overridden.getTime()) ? actualNow : overridden
}

export function appNow(actualNow = new Date()) {
  if (typeof window === 'undefined') return actualNow
  return nowFromSearch(actualNow, window.location.search, import.meta.env.DEV || import.meta.env.MODE === 'test')
}
