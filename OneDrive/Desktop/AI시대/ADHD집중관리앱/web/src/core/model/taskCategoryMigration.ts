import type { CategoryId } from './category'

const known = new Set(['work', 'personal', 'exercise', 'reading', 'hobby'])
const legacy: Record<string, CategoryId> = {
  study: 'personal',
  life: 'personal',
  rest: 'hobby',
}

export function normalizeCategoryId(value?: string): CategoryId {
  if (!value) return 'personal'
  if (known.has(value)) return value
  return legacy[value] ?? 'personal'
}
