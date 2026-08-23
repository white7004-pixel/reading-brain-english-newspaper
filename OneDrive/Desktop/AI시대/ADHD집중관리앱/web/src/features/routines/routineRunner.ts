export interface RoutineRunState {
  currentStepIndex: number
  endsAt: string
  status: 'idle' | 'running' | 'completed'
}

export type RoutineAction =
  | { type: 'ADD_MINUTES'; minutes: number }
  | { type: 'COMPLETE_STEP'; totalSteps: number }
  | { type: 'SKIP_STEP'; totalSteps: number }

export function advanceRoutine(state: RoutineRunState, action: RoutineAction): RoutineRunState {
  if (action.type === 'ADD_MINUTES') {
    const offset = state.endsAt.match(/([+-]\d\d:\d\d|Z)$/)?.[1] ?? 'Z'
    const next = new Date(new Date(state.endsAt).getTime() + action.minutes * 60_000)
    const iso = next.toISOString().slice(0, 19)
    const local = offset === 'Z' ? `${iso}Z` : new Date(next.getTime() + Number(offset.slice(0, 3)) * 3_600_000).toISOString().slice(0, 19) + offset
    return { ...state, endsAt: local }
  }
  const nextIndex = state.currentStepIndex + 1
  return { ...state, currentStepIndex: nextIndex, status: nextIndex >= action.totalSteps ? 'completed' : state.status }
}
