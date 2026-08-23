import { randomUUID } from 'node:crypto'
import cookie from '@fastify/cookie'
import Fastify from 'fastify'
import { normalizeBusyBlocks, type BusyBlock } from './googleAvailability.js'

export interface GoogleAvailabilityGateway {
  authorizationUrl(state: string): string
  exchangeCode(code: string): Promise<{ accountId: string; displayName: string; refreshToken: string }>
  freeBusy(refreshToken: string, input: { timeMin: string; timeMax: string; timeZone: string }): Promise<BusyBlock[]>
  revoke(refreshToken: string): Promise<void>
}

interface ServerOptions {
  gateway: GoogleAvailabilityGateway
  now?: () => Date
}

export function buildServer({ gateway, now = () => new Date() }: ServerOptions) {
  const app = Fastify({ logger: false })
  const states = new Map<string, number>()
  const sessions = new Map<string, { accountId: string; displayName: string; refreshToken: string }>()
  void app.register(cookie)

  app.get('/oauth/google/start', async (_request, reply) => {
    const state = randomUUID()
    states.set(state, now().getTime() + 10 * 60_000)
    return reply.redirect(gateway.authorizationUrl(state))
  })

  app.get<{ Querystring: { code?: string; state?: string } }>('/oauth/google/callback', async (request, reply) => {
    const { code, state } = request.query
    const expiresAt = state ? states.get(state) : undefined
    if (!code || !state || !expiresAt || expiresAt < now().getTime()) return reply.code(400).send({ error: 'invalid_oauth_state' })
    states.delete(state)
    const account = await gateway.exchangeCode(code)
    const sessionId = randomUUID()
    sessions.set(sessionId, account)
    reply.setCookie('monggle_calendar_session', sessionId, { httpOnly: true, sameSite: 'lax', path: '/' })
    return { connected: true, accountId: account.accountId, displayName: account.displayName }
  })

  function session(request: { cookies: Record<string, string | undefined> }) {
    const id = request.cookies.monggle_calendar_session
    return id ? sessions.get(id) : undefined
  }

  app.get('/calendar/status', async (request, reply) => {
    const account = session(request)
    return account ? { connected: true, accountId: account.accountId, displayName: account.displayName } : reply.code(401).send({ connected: false })
  })

  app.post<{ Body: { timeMin?: string; timeMax?: string; timeZone?: string } }>('/calendar/availability', async (request, reply) => {
    const account = session(request)
    if (!account) return reply.code(401).send({ error: 'authentication_required' })
    const { timeMin, timeMax, timeZone } = request.body ?? {}
    if (!timeMin || !timeMax || !timeZone || new Date(timeMax) <= new Date(timeMin)) return reply.code(400).send({ error: 'invalid_window' })
    try {
      const busy = normalizeBusyBlocks(await gateway.freeBusy(account.refreshToken, { timeMin, timeMax, timeZone }))
      return { accountId: account.accountId, timeZone, busy, fetchedAt: now().toISOString() }
    } catch (error) {
      const status = typeof error === 'object' && error && 'status' in error ? Number(error.status) : 503
      if (status === 401) return reply.code(401).send({ error: 'authentication_expired' })
      if (status === 429) return reply.code(429).send({ error: 'quota_exceeded' })
      return reply.code(503).send({ error: 'google_temporarily_unavailable' })
    }
  })

  app.delete('/calendar/connection', async (request, reply) => {
    const sessionId = request.cookies.monggle_calendar_session
    const account = sessionId ? sessions.get(sessionId) : undefined
    if (account) {
      sessions.delete(sessionId!)
      try { await gateway.revoke(account.refreshToken) } catch { /* local disconnect still succeeds */ }
    }
    reply.clearCookie('monggle_calendar_session', { path: '/' })
    return { connected: false }
  })

  return app
}
