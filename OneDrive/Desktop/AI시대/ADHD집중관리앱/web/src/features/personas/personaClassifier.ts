import type { Persona } from '../../core/model/persona'
import type { QuestCategory } from '../../core/model/recurrence'

export interface ClassificationCorrection {
  normalizedPhrase: string
  personaIds: string[]
  category: QuestCategory
}

const CATEGORY_KEYWORDS: ReadonlyArray<readonly [QuestCategory, readonly string[]]> = [
  ['counseling', ['상담', '내담자', '예약', '기록', '후속', '학부모']],
  ['operations', ['운영', '경영', '매출', '직원', '마감', '점검', '행정', '업무']],
  ['curriculum', ['커리큘럼', '교육', '수업', '교안', '학습', '강의']],
  ['marketing', ['마케팅', '홍보', '콘텐츠', '브랜드', '캠페인', '광고']],
  ['reading', ['독서', '책', '읽기', '읽다']],
  ['exercise', ['운동', '헬스', '달리기', '러닝', '요가', '수영', '산책']],
  ['gathering_personal', ['모임', '약속', '가족', '개인', '생활', '건강', '휴식', '친구']],
]

export function normalizeQuestPhrase(value: string) {
  return value.normalize('NFC').trim().replace(/\s+/gu, ' ').toLocaleLowerCase('ko-KR')
}

function matchedKeywords(title: string, keywords: string[]) {
  return [...new Set(keywords
    .map(normalizeQuestPhrase)
    .filter((keyword) => keyword && title.includes(keyword)))]
}

function classifyCategory(title: string): QuestCategory {
  let winner: QuestCategory = 'other'
  let winnerScore = 0
  for (const [category, keywords] of CATEGORY_KEYWORDS) {
    const score = keywords.filter((keyword) => title.includes(keyword)).length
    if (score > winnerScore) {
      winner = category
      winnerScore = score
    }
  }
  return winner
}

export function classifyQuest(
  title: string,
  personas: Persona[],
  corrections: ClassificationCorrection[],
): { personaIds: string[]; category: QuestCategory } {
  const normalizedTitle = normalizeQuestPhrase(title)
  const correction = corrections.find((item) => normalizeQuestPhrase(item.normalizedPhrase) === normalizedTitle)
  if (correction) return { personaIds: [...correction.personaIds], category: correction.category }

  const scored = personas
    .filter((persona) => persona.status === 'active')
    .map((persona) => ({ persona, keywords: matchedKeywords(normalizedTitle, persona.classificationKeywords) }))
    .filter(({ keywords }) => keywords.length > 0)
    .sort((a, b) => b.keywords.length - a.keywords.length
      || a.persona.order - b.persona.order
      || a.persona.id.localeCompare(b.persona.id))

  const claimedKeywords = new Set<string>()
  const personaIds = scored.flatMap(({ persona, keywords }) => {
    if (!keywords.some((keyword) => !claimedKeywords.has(keyword))) return []
    keywords.forEach((keyword) => claimedKeywords.add(keyword))
    return [persona.id]
  })

  return {
    personaIds: personaIds.length > 0 ? personaIds : ['personal'],
    category: classifyCategory(normalizedTitle),
  }
}
