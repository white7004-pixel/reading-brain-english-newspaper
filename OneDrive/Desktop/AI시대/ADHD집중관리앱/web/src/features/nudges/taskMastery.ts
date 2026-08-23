import type { Task } from '../../core/model/task'

export type CoachStage = 'gentle' | 'direct' | 'decision'
export type CoachAction = 'start' | 'remind_5' | 'reschedule' | 'cancel' | 'done'

export interface CoachContext {
  task: Task
  unansweredPrompts: number
  now: Date
  quiet: boolean
  calendarBusy: boolean
  focusActive: boolean
  determinedMode: boolean
}

export interface CoachDecision {
  stage: CoachStage
  line: string
  actions: CoachAction[]
  nextPromptAt: Date | null
}

export const coachStageLabels: Record<CoachStage, string> = {
  gentle: '부드럽게 시작',
  direct: '한번 다시 보기',
  decision: '지금 결정하기',
}

export const coachActionLabels: Record<CoachAction, string> = {
  start: '지금 시작',
  remind_5: '5분 뒤 알림',
  reschedule: '일정 다시 잡기',
  cancel: '할 일 취소',
  done: '완료했어요',
}

export interface TaskMasteryState {
  taskId: string
  misses: number
  lastPromptAt?: string
  answeredAt?: string
}

export type MasteryEvent =
  | { type: 'prompt'; at: string }
  | { type: CoachAction | 'working' | 'later'; at: string }

export function masteryStage(state: TaskMasteryState): CoachStage {
  if (state.misses >= 2) return 'decision'
  if (state.misses >= 1) return 'direct'
  return 'gentle'
}

export function applyMasteryEvent(state: TaskMasteryState, event: MasteryEvent): TaskMasteryState {
  if (event.type === 'done') return { taskId: state.taskId, misses: 0, answeredAt: event.at }
  if (event.type === 'working' || event.type === 'start') return { ...state, answeredAt: event.at }
  if (event.type === 'later' || event.type === 'remind_5') {
    return { ...state, misses: state.misses + 1, answeredAt: event.at }
  }
  if (event.type !== 'prompt') return { ...state, answeredAt: event.at }

  const previousWasUnanswered = Boolean(state.lastPromptAt && (!state.answeredAt || state.answeredAt < state.lastPromptAt))
  return { ...state, misses: state.misses + (previousWasUnanswered ? 1 : 0), lastPromptAt: event.at, answeredAt: undefined }
}

export function masteryMessage(stage: CoachStage) {
  if (stage === 'decision') return '지금 시작할지, 5분 뒤에 다시 볼지, 일정을 바꿀지 함께 정해요.'
  if (stage === 'direct') return '하기로 한 일을 기억하고 있어요. 가능한 첫 행동부터 이어가 볼까요?'
  return '작은 첫 행동부터 가볍게 시작해 볼까요?'
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
