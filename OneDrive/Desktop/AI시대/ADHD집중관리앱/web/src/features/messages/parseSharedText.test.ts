import { expect, it } from 'vitest'
import { parseSharedText } from './parseSharedText'

it('requires confirmation when a date phrase is ambiguous', () => {
  expect(parseSharedText('다음 주에 보내줘', new Date('2026-08-20T09:00:00+09:00')).requiresDateConfirmation).toBe(true)
})
