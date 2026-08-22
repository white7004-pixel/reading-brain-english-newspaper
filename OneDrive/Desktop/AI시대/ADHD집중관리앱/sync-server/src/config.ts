export const GOOGLE_FREE_BUSY_SCOPE = 'https://www.googleapis.com/auth/calendar.events.freebusy'

export function buildGoogleScopes() {
  return [GOOGLE_FREE_BUSY_SCOPE]
}

export function loadConfig(environment: Record<string, string | undefined>) {
  const required = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI', 'TOKEN_ENCRYPTION_KEY'] as const
  for (const key of required) if (!environment[key]) throw new Error(`${key} is required`)
  const encryptionKey = Buffer.from(environment.TOKEN_ENCRYPTION_KEY!, 'base64')
  if (encryptionKey.length !== 32) throw new Error('TOKEN_ENCRYPTION_KEY must decode to exactly 32 bytes')
  return {
    clientId: environment.GOOGLE_CLIENT_ID!,
    clientSecret: environment.GOOGLE_CLIENT_SECRET!,
    redirectUri: environment.GOOGLE_REDIRECT_URI!,
    encryptionKey,
  }
}
