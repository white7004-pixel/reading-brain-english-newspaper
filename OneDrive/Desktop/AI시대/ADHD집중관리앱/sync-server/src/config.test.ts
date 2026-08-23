import { describe, expect, it } from 'vitest'
import { buildGoogleScopes, loadConfig } from './config.js'

describe('calendar sync configuration', () => {
  it('requests only the freebusy scope', () => {
    expect(buildGoogleScopes()).toEqual(['https://www.googleapis.com/auth/calendar.events.freebusy'])
  })

  it('rejects an encryption key that is not exactly 32 bytes', () => {
    expect(() => loadConfig({
      GOOGLE_CLIENT_ID: 'client',
      GOOGLE_CLIENT_SECRET: 'secret',
      GOOGLE_REDIRECT_URI: 'http://localhost/callback',
      TOKEN_ENCRYPTION_KEY: Buffer.alloc(31).toString('base64'),
    })).toThrow('TOKEN_ENCRYPTION_KEY')
  })
})
