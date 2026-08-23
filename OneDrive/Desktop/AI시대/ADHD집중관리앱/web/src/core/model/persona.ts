export type PersonaKind = 'default' | 'custom'
export type PersonaStatus = 'active' | 'archived'

export interface Persona {
  id: string
  name: string
  icon: string
  color: string
  kind: PersonaKind
  status: PersonaStatus
  order: number
  classificationKeywords: string[]
  masteryLabels?: string[]
}

export interface PersonaMastery {
  personaId: string
  completions: number
  stage: number
  weeklyCompleted: number
  monthlyConsistencyDays: number
  creditedEventIds: string[]
}
