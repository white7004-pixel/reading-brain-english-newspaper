import type { Persona } from '../model/persona'
import type { MonggleDatabase } from './database'

export const DEFAULT_PERSONAS: Persona[] = [
  {
    id: 'director', name: '원장·경영자', icon: '🏥', color: '#849A8C', kind: 'default', status: 'active', order: 0,
    classificationKeywords: ['원장', '경영', '운영', '매출', '직원'], masteryLabels: ['시작', '정리', '운영', '성장'],
  },
  {
    id: 'counseling', name: '상담 관리자', icon: '💬', color: '#9B8FA8', kind: 'default', status: 'active', order: 1,
    classificationKeywords: ['상담', '내담자', '예약', '기록', '후속'], masteryLabels: ['연결', '경청', '지원', '신뢰'],
  },
  {
    id: 'education', name: '교육 기획자', icon: '📚', color: '#8299AE', kind: 'default', status: 'active', order: 2,
    classificationKeywords: ['교육', '수업', '커리큘럼', '교안', '학습'], masteryLabels: ['구상', '설계', '실행', '완성'],
  },
  {
    id: 'marketing', name: '마케터', icon: '📣', color: '#B48C78', kind: 'default', status: 'active', order: 3,
    classificationKeywords: ['마케팅', '홍보', '콘텐츠', '브랜드', '캠페인'], masteryLabels: ['발견', '제작', '확산', '성과'],
  },
  {
    id: 'personal', name: '개인', icon: '🌱', color: '#9A9A82', kind: 'default', status: 'active', order: 4,
    classificationKeywords: ['개인', '생활', '건강', '가족', '휴식'], masteryLabels: ['돌봄', '습관', '균형', '회복'],
  },
]

export function comparePersonasByOrder(a: Persona, b: Persona) {
  return a.order - b.order || a.id.localeCompare(b.id)
}

export function createPersonaRepository(database: MonggleDatabase) {
  return {
    async ensureDefaults() {
      await database.transaction('rw', database.personas, async () => {
        for (const persona of DEFAULT_PERSONAS) {
          if (!await database.personas.get(persona.id)) await database.personas.add({ ...persona })
        }
      })
      return this.listActive()
    },
    async listActive() {
      return (await database.personas.where('status').equals('active').toArray()).sort(comparePersonasByOrder)
    },
    async save(persona: Persona) {
      await database.personas.put(persona)
    },
    async archive(id: string) {
      await database.personas.update(id, { status: 'archived' })
    },
    async restore(id: string) {
      await database.personas.update(id, { status: 'active' })
    },
    async reorder(ids: string[]) {
      const current = (await database.personas.toArray()).sort(comparePersonasByOrder)
      const records = new Map(current.map((persona) => [persona.id, persona]))
      const requested = ids.flatMap((id) => {
        const persona = records.get(id)
        records.delete(id)
        return persona ? [persona] : []
      })
      const reordered = [...requested, ...current.filter((persona) => records.has(persona.id))]
      await database.personas.bulkPut(reordered.map((persona, order) => ({ ...persona, order })))
    },
  }
}

export type PersonaRepository = ReturnType<typeof createPersonaRepository>
