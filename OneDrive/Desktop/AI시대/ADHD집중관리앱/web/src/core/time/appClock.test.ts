import { describe, expect, it } from 'vitest'
import { nowFromSearch } from './appClock'

const actualNow = new Date('2026-08-21T09:00:00+09:00')

describe('app clock override', () => {
  it('accepts a valid now query only when the development test seam is enabled', () => {
    expect(nowFromSearch(actualNow, '?now=2026-08-22T00%3A10%3A00%2B09%3A00', true).toISOString())
      .toBe('2026-08-21T15:10:00.000Z')
    expect(nowFromSearch(actualNow, '?now=2026-08-22T00%3A10%3A00%2B09%3A00', false)).toBe(actualNow)
  })

  it('ignores an invalid now query', () => {
    expect(nowFromSearch(actualNow, '?now=not-a-date', true)).toBe(actualNow)
  })
})
