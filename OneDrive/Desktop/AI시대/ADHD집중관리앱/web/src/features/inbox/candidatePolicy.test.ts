import { describe, expect, it } from 'vitest'
import type { QuestCandidate } from '../../core/model/questCandidate'
import type { QuestCategory } from '../../core/model/recurrence'
import { acceptCandidate, dedupeCandidates, normalizeCandidate } from './candidatePolicy'

function candidate(overrides: Partial<QuestCandidate> = {}): QuestCandidate {
  return {
    id: 'provided-id',
    source: 'kakaotalk',
    sourceRef: 'room-1/message-4',
    title: ' 상담 일정 확인 ',
    personaIds: ['counseling'],
    category: 'counseling',
    estimateMinutes: 20,
    status: 'pending_review',
    ...overrides,
  }
}

describe('quest candidate policy', () => {
  it('derives identity from the source reference and supplies review defaults', () => {
    expect(normalizeCandidate({
      id: 'ignored',
      source: 'kakaowork',
      sourceRef: ' channel-2/message-8 ',
      title: '  월말   운영 점검  ',
    })).toEqual({
      id: 'kakaowork:channel-2/message-8',
      source: 'kakaowork',
      sourceRef: 'channel-2/message-8',
      title: '월말 운영 점검',
      personaIds: [],
      category: 'other',
      estimateMinutes: 15,
      status: 'pending_review',
    })
  })

  it('collapses duplicate identities and deterministically preserves a terminal status', () => {
    expect(dedupeCandidates([
      candidate({ id: 'wrong-pending', title: '다시 가져온 제목' }),
      candidate({ id: 'wrong-dismissed', title: '사용자가 닫은 제목', status: 'dismissed' }),
      candidate({ id: 'wrong-accepted', title: '수락한 제목', status: 'accepted' }),
    ])).toEqual([
      expect.objectContaining({
        id: 'kakaotalk:room-1/message-4',
        title: '수락한 제목',
        status: 'accepted',
      }),
    ])
  })

  it('converts an accepted candidate to an open task using its Seoul due day and source metadata', () => {
    const task = acceptCandidate(candidate({
      dueAt: '2026-08-23T16:30:00.000Z',
      firstAction: '  상담 기록 열기  ',
      personaIds: ['counseling', 'director'],
    }), new Date('2026-08-23T15:30:00.000Z'))

    expect(task).toEqual(expect.objectContaining({
      title: '상담 일정 확인',
      day: '2026-08-24',
      dueAt: '2026-08-23T16:30:00.000Z',
      status: 'open',
      priority: 2,
      estimateMinutes: 20,
      category: 'work',
      categoryId: 'work',
      personaIds: ['counseling', 'director'],
      source: 'kakaotalk',
      sourceRef: 'room-1/message-4',
      firstAction: '상담 기록 열기',
      createdAt: '2026-08-23T15:30:00.000Z',
      updatedAt: '2026-08-23T15:30:00.000Z',
    }))
  })

  it.each([
    ['counseling', 'work', 'work'],
    ['operations', 'work', 'work'],
    ['curriculum', 'study', 'work'],
    ['marketing', 'work', 'work'],
    ['reading', 'study', 'reading'],
    ['exercise', 'exercise', 'exercise'],
    ['gathering_personal', 'life', 'personal'],
    ['other', 'life', 'personal'],
  ] as const)('maps %s to legacy %s and category ID %s', (category, legacy, categoryId) => {
    expect(acceptCandidate(candidate({ category: category as QuestCategory }), new Date('2026-08-23T00:00:00Z')))
      .toMatchObject({ category: legacy, categoryId })
  })

  it('uses the current Seoul day when the candidate has no deadline', () => {
    expect(acceptCandidate(candidate({ dueAt: undefined }), new Date('2026-08-23T16:00:00.000Z')).day)
      .toBe('2026-08-24')
  })
})
