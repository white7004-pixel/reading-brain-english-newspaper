import { describe, expect, it } from 'vitest'
import type { Persona } from '../../core/model/persona'
import { DEFAULT_PERSONAS } from '../../core/storage/personaRepository'
import { classifyQuest } from './personaClassifier'

function persona(overrides: Partial<Persona>): Persona {
  return {
    id: 'custom',
    name: '사용자 역할',
    icon: '✨',
    color: '#849A8C',
    kind: 'custom',
    status: 'active',
    order: 10,
    classificationKeywords: [],
    ...overrides,
  }
}

describe('persona quest classifier', () => {
  it('classifies an academy counseling phrase with the normal defaults', () => {
    expect(classifyQuest('신입생 상담 일정 잡기', DEFAULT_PERSONAS, [])).toEqual({
      personaIds: ['counseling'],
      category: 'counseling',
    })
  })

  it('keeps multiple roles only when separate keywords match each role', () => {
    expect(classifyQuest('학부모 상담 기록과 마케팅 콘텐츠 준비', DEFAULT_PERSONAS, [])).toEqual({
      personaIds: ['counseling', 'marketing'],
      category: 'counseling',
    })
  })

  it('lets an exact normalized saved correction override keyword suggestions', () => {
    expect(classifyQuest('  CAFE\u0301   상담  ', DEFAULT_PERSONAS, [{
      normalizedPhrase: 'café 상담',
      personaIds: ['marketing'],
      category: 'marketing',
    }])).toEqual({ personaIds: ['marketing'], category: 'marketing' })
  })

  it('excludes archived personas from keyword classification', () => {
    const archivedCounseling = DEFAULT_PERSONAS.map((item) => item.id === 'counseling'
      ? { ...item, status: 'archived' as const }
      : item)

    expect(classifyQuest('상담 예약 확인', archivedCounseling, [])).toEqual({
      personaIds: ['personal'],
      category: 'counseling',
    })
  })

  it('uses lower persona order as the stable tie-break for the same match', () => {
    const personas = [
      persona({ id: 'later', order: 4, classificationKeywords: ['보고'] }),
      persona({ id: 'earlier', order: 1, classificationKeywords: ['보고'] }),
    ]

    expect(classifyQuest('주간 보고 준비', personas, [])).toEqual({
      personaIds: ['earlier'],
      category: 'other',
    })
  })

  it('defaults unclassified work to the personal persona and other category', () => {
    expect(classifyQuest('우산 챙기기', DEFAULT_PERSONAS, [])).toEqual({
      personaIds: ['personal'],
      category: 'other',
    })
  })

  it.each([
    ['내담자 상담 기록', 'counseling'],
    ['월말 운영 마감', 'operations'],
    ['다음 주 커리큘럼 교안', 'curriculum'],
    ['브랜드 홍보 캠페인', 'marketing'],
    ['책 읽기', 'reading'],
    ['저녁 달리기 운동', 'exercise'],
    ['가족 모임 약속', 'gathering_personal'],
    ['우산 챙기기', 'other'],
  ] as const)('maps %s to the %s quest category', (title, category) => {
    expect(classifyQuest(title, DEFAULT_PERSONAS, []).category).toBe(category)
  })
})
