import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import type { QuestCandidate } from '../model/questCandidate'
import { createDatabase, type MonggleDatabase } from './database'
import { createQuestCandidateRepository } from './questCandidateRepository'

let database: MonggleDatabase | undefined

afterEach(async () => {
  await database?.delete()
  database = undefined
})

function setup() {
  database = createDatabase(`quest-candidate-repository-${crypto.randomUUID()}`)
  return createQuestCandidateRepository(database)
}

function candidate(overrides: Partial<QuestCandidate> = {}): QuestCandidate {
  return {
    id: 'wrong-id',
    source: 'kakaotalk',
    sourceRef: 'room-1/message-4',
    title: '상담 일정 확인',
    personaIds: ['counseling'],
    category: 'counseling',
    estimateMinutes: 20,
    status: 'pending_review',
    ...overrides,
  }
}

describe('quest candidate repository', () => {
  it('suppresses duplicate canonical identities and returns the existing record', async () => {
    const repository = setup()
    const first = await repository.put(candidate())
    const duplicate = await repository.put(candidate({ id: 'another-id', title: '다시 가져온 제목' }))

    expect(first.id).toBe('kakaotalk:room-1/message-4')
    expect(duplicate).toEqual(first)
    await expect(database!.questCandidates.count()).resolves.toBe(1)
  })

  it('preserves accepted candidates and their edited source record without deleting it', async () => {
    const repository = setup()
    const stored = await repository.put(candidate())

    await repository.accept({ ...stored, title: '학부모 상담 확정', estimateMinutes: 30 })

    await expect(repository.listPending()).resolves.toEqual([])
    await expect(database!.questCandidates.get(stored.id)).resolves.toMatchObject({
      title: '학부모 상담 확정',
      estimateMinutes: 30,
      status: 'accepted',
    })
    await expect(database!.questCandidates.count()).resolves.toBe(1)

    await expect(repository.put(candidate({ title: '재수집된 제목' }))).resolves.toMatchObject({
      title: '학부모 상담 확정',
      status: 'accepted',
    })
  })

  it('marks a candidate dismissed while retaining its source reference', async () => {
    const repository = setup()
    const stored = await repository.put(candidate())

    await repository.dismiss(stored.id)

    await expect(repository.listPending()).resolves.toEqual([])
    await expect(database!.questCandidates.get(stored.id)).resolves.toMatchObject({
      id: 'kakaotalk:room-1/message-4',
      sourceRef: 'room-1/message-4',
      status: 'dismissed',
    })
    await expect(database!.questCandidates.count()).resolves.toBe(1)

    await expect(repository.put(candidate())).resolves.toMatchObject({ status: 'dismissed' })
  })

  it('lists only pending candidates in stable identity order', async () => {
    const repository = setup()
    await repository.put(candidate({ sourceRef: 'room-2/message-1' }))
    const first = await repository.put(candidate({ sourceRef: 'room-1/message-1' }))
    const dismissed = await repository.put(candidate({ sourceRef: 'room-0/message-1' }))
    await repository.dismiss(dismissed.id)

    expect((await repository.listPending()).map(({ id }) => id)).toEqual([
      first.id,
      'kakaotalk:room-2/message-1',
    ])
  })

  it('keeps the same source reference distinct across providers and updates only the canonical identity', async () => {
    const repository = setup()
    const talk = await repository.put(candidate({ source: 'kakaotalk', sourceRef: 'shared-X', title: '카카오톡 후보' }))
    const work = await repository.put(candidate({ source: 'kakaowork', sourceRef: 'shared-X', title: '카카오워크 후보' }))

    expect([talk.id, work.id]).toEqual(['kakaotalk:shared-X', 'kakaowork:shared-X'])
    await repository.accept({ ...talk, title: '카카오톡 후보 확정' })

    await expect(database!.questCandidates.get('kakaotalk:shared-X')).resolves.toMatchObject({
      source: 'kakaotalk',
      title: '카카오톡 후보 확정',
      status: 'accepted',
    })
    await expect(database!.questCandidates.get('kakaowork:shared-X')).resolves.toMatchObject({
      source: 'kakaowork',
      title: '카카오워크 후보',
      status: 'pending_review',
    })
    await expect(database!.questCandidates.count()).resolves.toBe(2)
  })
})
