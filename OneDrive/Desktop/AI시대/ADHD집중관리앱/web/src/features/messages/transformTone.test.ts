import { expect, it } from 'vitest'
import { transformDraft } from './transformTone'

it('keeps tone transformations in draft status', () => {
  const original = { body: '자료 보내줘', status: 'scheduled' as const }
  const result = transformDraft(original, 'business')
  expect(result.status).toBe('draft')
  expect(result.body).not.toBe(original.body)
})
