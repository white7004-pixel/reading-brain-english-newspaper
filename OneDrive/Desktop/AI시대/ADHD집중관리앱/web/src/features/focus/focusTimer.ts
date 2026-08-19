export interface FocusTimerState {
  taskId: string
  startedAt: string
  endsAt: string
  status: 'running' | 'paused' | 'completed'
}

export function startTimer(taskId: string, minutes: number, now = new Date(), active?: FocusTimerState): FocusTimerState {
  if (active?.status === 'running') throw new Error('FOCUS_TIMER_ACTIVE')
  return { taskId, startedAt: now.toISOString(), endsAt: new Date(now.getTime() + minutes * 60_000).toISOString(), status: 'running' }
}

export function remainingSeconds(timer: FocusTimerState, now = new Date()) {
  return Math.max(0, Math.ceil((new Date(timer.endsAt).getTime() - now.getTime()) / 1000))
}

export function extendTimer(timer: FocusTimerState, minutes: number): FocusTimerState {
  return { ...timer, endsAt: new Date(new Date(timer.endsAt).getTime() + minutes * 60_000).toISOString() }
}
