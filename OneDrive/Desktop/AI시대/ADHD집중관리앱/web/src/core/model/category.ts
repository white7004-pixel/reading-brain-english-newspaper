export type CategoryId = string

export interface Category {
  id: CategoryId
  name: string
  color: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export const CATEGORY_COLORS = ['#6558D9', '#C24E7A', '#267A69', '#D17635', '#3F6FB5'] as const

const createdAt = '2026-01-01T00:00:00.000Z'

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '일', color: CATEGORY_COLORS[0], isDefault: true, createdAt, updatedAt: createdAt },
  { id: 'personal', name: '개인', color: CATEGORY_COLORS[1], isDefault: true, createdAt, updatedAt: createdAt },
  { id: 'exercise', name: '운동', color: CATEGORY_COLORS[2], isDefault: true, createdAt, updatedAt: createdAt },
  { id: 'reading', name: '독서', color: CATEGORY_COLORS[3], isDefault: true, createdAt, updatedAt: createdAt },
  { id: 'hobby', name: '취미', color: CATEGORY_COLORS[4], isDefault: true, createdAt, updatedAt: createdAt },
]
