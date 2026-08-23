import { describe, expect, it } from 'vitest'
import { DEFAULT_CATEGORIES } from './category'
import { normalizeCategoryId } from './taskCategoryMigration'

describe('task category migration', () => {
  it('maps legacy categories without losing tasks', () => {
    expect(normalizeCategoryId('study')).toBe('personal')
    expect(normalizeCategoryId('life')).toBe('personal')
    expect(normalizeCategoryId('rest')).toBe('hobby')
    expect(normalizeCategoryId('work')).toBe('work')
    expect(normalizeCategoryId('missing')).toBe('personal')
  })

  it('provides the five stable default categories', () => {
    expect(DEFAULT_CATEGORIES.map(({ id }) => id)).toEqual([
      'work',
      'personal',
      'exercise',
      'reading',
      'hobby',
    ])
  })
})
