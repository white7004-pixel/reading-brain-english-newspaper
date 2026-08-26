import { expect, it } from 'vitest'
import { DEFAULT_RECURRING_TEMPLATES } from './defaultTemplates'

it('includes adjustable daily reading and exercise defaults for personal care', () => {
  expect(DEFAULT_RECURRING_TEMPLATES).toEqual(expect.arrayContaining([
    expect.objectContaining({ id: 'daily-reading', category: 'reading', estimateMinutes: 10, carryForward: false }),
    expect.objectContaining({ id: 'daily-exercise', category: 'exercise', estimateMinutes: 10, carryForward: false }),
  ]))
})
