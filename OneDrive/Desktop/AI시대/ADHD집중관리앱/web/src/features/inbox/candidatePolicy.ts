import type { QuestCandidate } from '../../core/model/questCandidate'
import type { QuestCategory } from '../../core/model/recurrence'
import type { Task, TaskCategory } from '../../core/model/task'
import type { CategoryId } from '../../core/model/category'
import { dayInSeoul } from '../../core/time/seoulDay'
import { normalizeQuestPhrase } from '../personas/personaClassifier'

export interface CandidateInput {
  id?: string
  source: QuestCandidate['source']
  sourceRef: string
  title: string
  personaIds?: string[]
  category?: QuestCategory
  dueAt?: string
  estimateMinutes?: number
  firstAction?: string
  status?: QuestCandidate['status']
}

export function normalizeCandidate(input: CandidateInput): QuestCandidate {
  const sourceRef = input.sourceRef.trim()
  const firstAction = input.firstAction?.normalize('NFC').trim().replace(/\s+/gu, ' ')
  return {
    id: `${input.source}:${sourceRef}`,
    source: input.source,
    sourceRef,
    title: normalizeQuestPhrase(input.title),
    personaIds: [...new Set(input.personaIds ?? [])],
    category: input.category ?? 'other',
    ...(input.dueAt ? { dueAt: input.dueAt } : {}),
    estimateMinutes: input.estimateMinutes ?? 15,
    ...(firstAction ? { firstAction } : {}),
    status: input.status ?? 'pending_review',
  }
}

const STATUS_PRIORITY: Record<QuestCandidate['status'], number> = {
  pending_review: 0,
  dismissed: 1,
  accepted: 2,
}

export function dedupeCandidates(items: QuestCandidate[]): QuestCandidate[] {
  const unique = new Map<string, QuestCandidate>()
  for (const item of items) {
    const normalized = normalizeCandidate(item)
    const existing = unique.get(normalized.id)
    if (!existing || STATUS_PRIORITY[normalized.status] > STATUS_PRIORITY[existing.status]) {
      unique.set(normalized.id, normalized)
    }
  }
  return [...unique.values()]
}

const CATEGORY_MAPPING: Record<QuestCategory, { category: TaskCategory; categoryId: CategoryId }> = {
  counseling: { category: 'work', categoryId: 'work' },
  operations: { category: 'work', categoryId: 'work' },
  curriculum: { category: 'study', categoryId: 'work' },
  marketing: { category: 'work', categoryId: 'work' },
  reading: { category: 'study', categoryId: 'reading' },
  exercise: { category: 'exercise', categoryId: 'exercise' },
  gathering_personal: { category: 'life', categoryId: 'personal' },
  other: { category: 'life', categoryId: 'personal' },
}

export function acceptCandidate(candidate: QuestCandidate, now: Date): Task {
  const mappedCategory = CATEGORY_MAPPING[candidate.category]
  const dueDate = candidate.dueAt ? new Date(candidate.dueAt) : undefined
  const daySource = dueDate && !Number.isNaN(dueDate.getTime()) ? dueDate : now
  const timestamp = now.toISOString()
  const firstAction = candidate.firstAction?.trim()
  return {
    id: `candidate:${candidate.source}:${candidate.sourceRef.trim()}`,
    title: candidate.title.trim(),
    day: dayInSeoul(daySource),
    ...(candidate.dueAt ? { dueAt: candidate.dueAt } : {}),
    status: 'open',
    priority: 2,
    estimateMinutes: candidate.estimateMinutes,
    ...mappedCategory,
    personaIds: [...candidate.personaIds],
    source: candidate.source,
    sourceRef: candidate.sourceRef,
    ...(firstAction ? { firstAction } : {}),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}
