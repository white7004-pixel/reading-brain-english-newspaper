import { expect, it } from 'vitest'
import { createTokenVault } from './tokenVault.js'

it('encrypts refresh tokens with authenticated encryption', () => {
  const vault = createTokenVault(Buffer.alloc(32, 7))
  const sealed = vault.seal('refresh-token')
  expect(sealed).not.toContain('refresh-token')
  expect(vault.open(sealed)).toBe('refresh-token')
  expect(() => vault.open(`${sealed.slice(0, -2)}aa`)).toThrow()
})
