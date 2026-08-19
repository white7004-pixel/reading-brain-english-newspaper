import { describe, expect, it } from 'vitest'
import { photoErrorMessage, validatePhoto } from './photoValidation'

describe('validatePhoto', () => {
  it.each(['image/jpeg', 'image/png', 'image/webp'])('accepts %s', (type) => {
    expect(validatePhoto(new File(['x'], 'photo', { type }))).toEqual({ ok: true })
  })

  it('rejects unsupported formats before decoding', () => {
    expect(validatePhoto(new File(['x'], 'a.heic', { type: 'image/heic' }))).toEqual({
      ok: false,
      reason: 'unsupported_type',
    })
  })

  it('rejects files over 12MB', () => {
    const file = new File([new Uint8Array(12 * 1024 * 1024 + 1)], 'a.jpg', { type: 'image/jpeg' })
    expect(validatePhoto(file)).toEqual({ ok: false, reason: 'too_large' })
  })

  it('provides Korean recovery messages separately from validation logic', () => {
    expect(photoErrorMessage('unsupported_type')).toContain('JPG')
    expect(photoErrorMessage('too_large')).toContain('12MB')
  })
})
