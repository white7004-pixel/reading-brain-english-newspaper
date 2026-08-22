import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

export function createTokenVault(key: Buffer) {
  if (key.length !== 32) throw new Error('Token vault key must be 32 bytes')
  return {
    seal(value: string) {
      const iv = randomBytes(12)
      const cipher = createCipheriv('aes-256-gcm', key, iv)
      const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
      return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url')
    },
    open(value: string) {
      const packed = Buffer.from(value, 'base64url')
      if (packed.length < 29) throw new Error('Invalid sealed token')
      const decipher = createDecipheriv('aes-256-gcm', key, packed.subarray(0, 12))
      decipher.setAuthTag(packed.subarray(12, 28))
      return Buffer.concat([decipher.update(packed.subarray(28)), decipher.final()]).toString('utf8')
    },
  }
}
