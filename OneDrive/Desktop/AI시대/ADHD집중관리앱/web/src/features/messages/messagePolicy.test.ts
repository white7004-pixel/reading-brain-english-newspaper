import { describe, expect, it } from 'vitest'
import { deliveryModeFor } from './messagePolicy'

describe('message capability policy', () => {
  it.each([
    ['slack', true, 'automatic'],
    ['telegram', true, 'automatic'],
    ['kakaowork', true, 'automatic'],
    ['kakaotalk', false, 'manual'],
  ] as const)('%s maps to %s', (platform, capability, expected) => {
    expect(deliveryModeFor(platform, capability)).toBe(expected)
  })
})
