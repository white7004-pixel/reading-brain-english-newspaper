import type { QuestCandidate } from '../model/questCandidate'
import type { MonggleDatabase } from './database'

function canonicalCandidate(candidate: QuestCandidate): QuestCandidate {
  const sourceRef = candidate.sourceRef.trim()
  return { ...candidate, id: `${candidate.source}:${sourceRef}`, sourceRef }
}

export function createQuestCandidateRepository(database: MonggleDatabase) {
  return {
    async put(candidate: QuestCandidate): Promise<QuestCandidate> {
      const canonical = canonicalCandidate(candidate)
      const existing = await database.questCandidates.get(canonical.id)
      if (existing) return existing
      await database.questCandidates.put(canonical)
      return canonical
    },

    async listPending(): Promise<QuestCandidate[]> {
      return (await database.questCandidates.where('status').equals('pending_review').toArray())
        .sort((a, b) => a.id.localeCompare(b.id))
    },

    async accept(candidate: QuestCandidate): Promise<void> {
      const canonical = canonicalCandidate(candidate)
      await database.transaction('rw', database.questCandidates, async () => {
        const existing = await database.questCandidates.get(canonical.id)
        if (!existing || existing.status !== 'pending_review') return
        await database.questCandidates.put({ ...canonical, id: existing.id, status: 'accepted' })
      })
    },

    async dismiss(id: string): Promise<void> {
      await database.transaction('rw', database.questCandidates, async () => {
        const existing = await database.questCandidates.get(id)
        if (!existing || existing.status !== 'pending_review') return
        await database.questCandidates.update(id, { status: 'dismissed' })
      })
    },
  }
}

export type QuestCandidateRepository = ReturnType<typeof createQuestCandidateRepository>
