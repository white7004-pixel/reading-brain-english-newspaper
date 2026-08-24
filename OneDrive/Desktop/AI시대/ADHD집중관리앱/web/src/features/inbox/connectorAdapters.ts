import type { ExternalCalendarEvent, QuestCandidate } from '../../core/model/questCandidate'
import { normalizeCandidate } from './candidatePolicy'

export function importKakaoShare(text: string, sourceRef: string): QuestCandidate[] {
  return text.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean).map((title, index) => normalizeCandidate({
    source: 'kakaotalk', sourceRef: `${sourceRef.trim()}:${index + 1}`, title,
  }))
}

export function importKakaoWork(items: Array<{ sourceId?: string; text: string }>): QuestCandidate[] {
  return items.filter((item): item is { sourceId: string; text: string } => Boolean(item.sourceId?.trim() && item.text.trim()))
    .map((item) => normalizeCandidate({ source: 'kakaowork', sourceRef: item.sourceId, title: item.text }))
}

export interface GoogleEventResponse { id: string; summary?: string; start: string; end: string; status?: 'confirmed' | 'canceled' }

export function syncGoogleEventsResponse(items: GoogleEventResponse[]): ExternalCalendarEvent[] {
  return items.filter((item) => item.id && item.start && item.end).map((item) => ({
    id: `google:${item.id}`, sourceRef: item.id, title: item.summary?.trim() || '제목 없는 일정',
    startsAt: item.start, endsAt: item.end, status: item.status ?? 'confirmed',
  }))
}
