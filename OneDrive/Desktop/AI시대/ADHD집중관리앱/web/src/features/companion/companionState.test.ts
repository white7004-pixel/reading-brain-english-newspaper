import { expect, it } from 'vitest'
import { deriveCompanionMode, nextSafePoint } from './companionState'

it.each([
  ['top-right', 'middle-left'],
  ['middle-left', 'bottom-right'],
  ['bottom-right', 'top-right'],
] as const)('moves from %s to %s', (current, expected) => {
  expect(nextSafePoint(current)).toBe(expected)
})

it('prioritizes hidden and reduced motion modes', () => {
  expect(deriveCompanionMode(false, false, false)).toBe('hidden')
  expect(deriveCompanionMode(true, true, false)).toBe('resting')
})
