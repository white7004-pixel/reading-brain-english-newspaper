import type { TaskDraft } from './taskDraft'

interface Clause {
  text: string
  followsPrevious: boolean
}

function dateInSeoul(now: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now)
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

function addDays(day: string, count: number) {
  const date = new Date(`${day}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + count)
  return date.toISOString().slice(0, 10)
}

function splitClauses(input: string): Clause[] {
  const marked = input
    .replace(/[,.\n]+/g, '|||next|||')
    .replace(/갔다가|(?:한|한\s*)?후에/g, '|||after|||')
    .replace(/(?:외우|쓰|하|보내|정리하)고\s+/g, (match) => `${match.replace(/고\s+$/, '')}|||next|||`)
    .replace(/\s+(?:그리고|하고)\s+/g, '|||next|||')
  const tokens = marked.split('|||').map((token) => token.trim()).filter(Boolean)
  const clauses: Clause[] = []
  let followsPrevious = false
  for (const token of tokens) {
    if (token === 'next' || token === 'after') {
      followsPrevious = token === 'after'
    } else {
      clauses.push({ text: token, followsPrevious })
      followsPrevious = false
    }
  }
  return clauses
}

function normalizeTitle(clause: string) {
  let title = clause
    .replace(/(?:오늘|내일|모레)/g, '')
    .replace(/(?:오전|오후)?\s*\d{1,2}시(?:\s*\d{1,2}분)?에?/g, '')
    .replace(/(?:아침|점심|저녁|밤|나중에)(?:에)?/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (title === '병원') title = '병원 방문'
  if (title.endsWith('외우')) title += '기'
  return title || clause.trim()
}

function extractClock(text: string) {
  const clock = text.match(/(오전|오후)?\s*(\d{1,2})시(?:\s*(\d{1,2})분)?/)
  if (clock) {
    const qualifier = clock[1]
    let hour = Number(clock[2])
    const minute = Number(clock[3] ?? 0)
    if (qualifier === '오후' && hour < 12) hour += 12
    if (qualifier === '오전' && hour === 12) hour = 0
    if (!qualifier && hour <= 7) hour += 12
    return { hour, minute, certain: Boolean(qualifier) || hour >= 13 }
  }
  if (/저녁/.test(text)) return { hour: 19, minute: 0, certain: true }
  if (/아침/.test(text)) return { hour: 8, minute: 0, certain: true }
  if (/점심/.test(text)) return { hour: 12, minute: 0, certain: true }
  return null
}

function estimateMinutes(text: string) {
  const count = text.match(/(\d+)\s*개/)
  return count ? Math.max(5, Math.min(120, Number(count[1]))) : 15
}

export function parseTaskDrafts(input: string, now: Date): TaskDraft[] {
  if (!input.trim()) return []
  const baseDay = dateInSeoul(now)
  let inheritedDay = baseDay
  const drafts: TaskDraft[] = []
  for (const clause of splitClauses(input)) {
    if (/내일/.test(clause.text)) inheritedDay = addDays(baseDay, 1)
    else if (/모레/.test(clause.text)) inheritedDay = addDays(baseDay, 2)
    else if (/오늘/.test(clause.text)) inheritedDay = baseDay
    const clock = extractClock(clause.text)
    const ambiguous = /나중에/.test(clause.text)
    const id = crypto.randomUUID()
    drafts.push({
      id,
      title: normalizeTitle(clause.text),
      day: inheritedDay,
      dueAt: clock ? `${inheritedDay}T${String(clock.hour).padStart(2, '0')}:${String(clock.minute).padStart(2, '0')}:00+09:00` : undefined,
      priority: 2,
      estimateMinutes: estimateMinutes(clause.text),
      orderAfterDraftId: clause.followsPrevious ? drafts.at(-1)?.id : undefined,
      confidence: ambiguous ? 0.55 : clock && !clock.certain ? 0.72 : 0.88,
      needsReview: ambiguous || Boolean(clock && !clock.certain),
    })
  }
  return drafts
}
