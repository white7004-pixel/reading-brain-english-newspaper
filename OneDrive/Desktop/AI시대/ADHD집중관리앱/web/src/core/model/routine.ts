export interface RoutineStep {
  id: string
  title: string
  minutes: number
}

export interface Routine {
  id: string
  title: string
  steps: RoutineStep[]
}
