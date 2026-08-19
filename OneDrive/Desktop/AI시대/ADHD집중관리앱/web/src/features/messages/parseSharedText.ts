export interface SharedTextResult {
  body: string
  receivedAt: string
  requiresDateConfirmation: boolean
}

const ambiguousDatePattern = /다음\s*주|나중에|언제든|조만간/

export function parseSharedText(body: string, receivedAt = new Date()): SharedTextResult {
  return {
    body: body.trim(),
    receivedAt: receivedAt.toISOString(),
    requiresDateConfirmation: ambiguousDatePattern.test(body),
  }
}
