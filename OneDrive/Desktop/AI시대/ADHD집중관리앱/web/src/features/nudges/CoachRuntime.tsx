import { createContext, useContext, type ReactNode } from 'react'
import type { CoachAction, CoachDecision } from './taskMastery'

export interface CoachRuntimeValue {
  decision: CoachDecision | null
  suppressed: boolean
  onRespond: (action: CoachAction, delayMinutes?: number) => void
  onReschedule: () => void
  onCancel: () => void
}

const CoachRuntimeContext = createContext<CoachRuntimeValue | null>(null)

export function CoachRuntimeProvider({ value, children }: { value: CoachRuntimeValue; children: ReactNode }) {
  return <CoachRuntimeContext.Provider value={value}>{children}</CoachRuntimeContext.Provider>
}

export function useCoachRuntime() {
  return useContext(CoachRuntimeContext)
}
