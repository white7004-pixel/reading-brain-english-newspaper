export type MessageTone = 'polite' | 'business' | 'friendly'

const transformBody = (body: string, tone: MessageTone) => {
  const clean = body.trim().replace(/[.!?]+$/, '')
  if (tone === 'business') return `[업무 안내] ${clean}. 확인 부탁드립니다.`
  if (tone === 'polite') return `${clean}. 부탁드려요.`
  return `${clean}! 🙂`
}

export function transformDraft<T extends { body: string; status: string }>(
  draft: T,
  tone: MessageTone,
): Omit<T, 'body' | 'status'> & { body: string; status: 'draft' } {
  return { ...draft, body: transformBody(draft.body, tone), status: 'draft' }
}
