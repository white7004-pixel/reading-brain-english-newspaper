import { describe, expect, it, vi } from 'vitest'
import { buildServer, type GoogleAvailabilityGateway } from './server.js'

const gateway: GoogleAvailabilityGateway = {
  authorizationUrl: vi.fn((state) => `https://accounts.google.test/auth?state=${state}`),
  exchangeCode: vi.fn(async () => ({ accountId: 'account-1', displayName: 'Google 계정', refreshToken: 'refresh' })),
  freeBusy: vi.fn(async () => [{ start: '2026-08-22T01:00:00.000Z', end: '2026-08-22T02:00:00.000Z' }]),
  revoke: vi.fn(async () => undefined),
}

describe('calendar availability routes', () => {
  it('returns normalized busy blocks without event details', async () => {
    const app = buildServer({ gateway, now: () => new Date('2026-08-22T00:00:00.000Z') })
    const start = await app.inject({ method: 'GET', url: '/oauth/google/start' })
    const state = new URL(start.headers.location!).searchParams.get('state')!
    const callback = await app.inject({ method: 'GET', url: `/oauth/google/callback?code=code&state=${state}` })
    const cookie = callback.cookies[0].name + '=' + callback.cookies[0].value
    const response = await app.inject({
      method: 'POST',
      url: '/calendar/availability',
      headers: { cookie },
      payload: { timeMin: '2026-08-22T00:00:00.000Z', timeMax: '2026-08-23T00:00:00.000Z', timeZone: 'Asia/Seoul' },
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      accountId: 'account-1',
      timeZone: 'Asia/Seoul',
      busy: [{ start: '2026-08-22T01:00:00.000Z', end: '2026-08-22T02:00:00.000Z' }],
      fetchedAt: '2026-08-22T00:00:00.000Z',
    })
    expect(response.body).not.toContain('summary')
    await app.close()
  })
})
