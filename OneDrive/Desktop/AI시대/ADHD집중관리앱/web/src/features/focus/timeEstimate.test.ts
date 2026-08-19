import { expect, it } from 'vitest'
import { personalEstimate } from './timeEstimate'

it('waits for three samples before suggesting an estimate', () => {
  expect(personalEstimate([20, 25])).toBeNull()
  expect(personalEstimate([20, 25, 30])).toBe(26)
})
