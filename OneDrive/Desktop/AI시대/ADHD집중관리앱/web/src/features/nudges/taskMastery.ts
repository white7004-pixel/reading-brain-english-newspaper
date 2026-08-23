export type MasteryTone = 'supportive' | 'firm' | 'angry'

export interface TaskMasteryState {
  taskId: string
  misses: number
  lastPromptAt?: string
  answeredAt?: string
}

export type MasteryEvent =
  | { type: 'prompt'; at: string }
  | { type: 'done' | 'working' | 'later'; at: string }

export function masteryTone(state: TaskMasteryState): MasteryTone {
  if (state.misses >= 3) return 'angry'
  if (state.misses >= 2) return 'firm'
  return 'supportive'
}

export function applyMasteryEvent(state: TaskMasteryState, event: MasteryEvent): TaskMasteryState {
  if (event.type === 'done') return { taskId: state.taskId, misses: 0, answeredAt: event.at }
  if (event.type === 'working') return { ...state, answeredAt: event.at }
  if (event.type === 'later') return { ...state, misses: state.misses + 1, answeredAt: event.at }
  const previousWasUnanswered = Boolean(state.lastPromptAt && (!state.answeredAt || state.answeredAt < state.lastPromptAt))
  return { ...state, misses: state.misses + (previousWasUnanswered ? 1 : 0), lastPromptAt: event.at, answeredAt: undefined }
}

export function masteryMessage(tone: MasteryTone) {
  if (tone === 'angry') return '또 미뤘지? 지금 딱 5분만 시작해!'
  if (tone === 'firm') return '이번에는 넘어가지 않을 거야. 지금 시작해서 완료로 바꾸자.'
  return '오늘 목표는 끝까지 마스터해요. 지금 첫 단계를 시작해요.'
}

const masteryStorageKey = 'monggle.task-mastery.v1'

function loadAll() {
  const saved = localStorage.getItem(masteryStorageKey)
  return saved ? JSON.parse(saved) as Record<string, TaskMasteryState> : {}
}

export const taskMasteryRepository = {
  load(taskId: string): TaskMasteryState {
    return loadAll()[taskId] ?? { taskId, misses: 0 }
  },
  save(state: TaskMasteryState) {
    localStorage.setItem(masteryStorageKey, JSON.stringify({ ...loadAll(), [state.taskId]: state }))
  },
}
