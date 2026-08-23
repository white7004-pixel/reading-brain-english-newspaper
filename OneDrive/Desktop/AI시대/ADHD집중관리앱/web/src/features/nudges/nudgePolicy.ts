import type { Task } from '../../core/model/task'
import { completeMission } from '../missions/missionState'
import { selectCurrentMission, selectNowTask } from '../today/selectNowTask'
import type { TaskCheckInResponse } from './taskCheckIn'
import type { CoachAction, CoachContext, CoachDecision, CoachStage } from './taskMastery'

export type { TaskCheckInResponse } from './taskCheckIn'
export type { CoachAction, CoachContext, CoachDecision, CoachStage } from './taskMastery'

export function nextNudgeAt(now: Date, intervalMinutes: 30 | 60 | 120) {
  return new Date(now.getTime() + intervalMinutes * 60_000)
}

export function remindFiveAt(now: Date) {
  return new Date(now.getTime() + 5 * 60_000)
}

function stageFor(unansweredPrompts: number): CoachStage {
  if (unansweredPrompts >= 2) return 'decision'
  if (unansweredPrompts === 1) return 'direct'
  return 'gentle'
}

const actionsByStage: Record<CoachStage, CoachAction[]> = {
  gentle: ['start', 'remind_5'],
  direct: ['start', 'remind_5', 'reschedule'],
  decision: ['start', 'remind_5', 'reschedule', 'cancel'],
}

function lineFor({ task, focusActive }: CoachContext, stage: CoachStage) {
  if (focusActive) return `${task.title}에 집중하고 있어요. 지금 흐름을 편안하게 이어가요.`
  if (stage === 'decision') return `${task.title}을 지금 어떻게 이어갈지 함께 정해요.`
  if (stage === 'direct') return `하기로 한 ${task.title}을 기억하고 있어요. 가능한 첫 행동부터 이어가 볼까요?`
  return `${task.title}, ${task.firstAction ?? '가장 작은 첫 행동'}부터 가볍게 시작해 볼까요?`
}

export function buildCoachDecision(context: CoachContext): CoachDecision {
  const stage = stageFor(Math.max(0, context.unansweredPrompts))
  const actions = context.focusActive
    ? [...actionsByStage[stage].filter((action) => action !== 'start'), 'done' as const]
    : [...actionsByStage[stage]]
  const nextPromptAt = context.quiet || context.calendarBusy
    ? null
    : nextNudgeAt(context.now, context.determinedMode ? 30 : 60)

  return { stage, line: lineFor(context, stage), actions, nextPromptAt }
}

function timeInSeoul(now: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return Number(values.hour) * 60 + Number(values.minute)
}

function minutes(value: string) {
  const [hour, minute] = value.split(':').map(Number)
  return hour * 60 + minute
}

export function isQuietTime(now: Date, quietStart: string, quietEnd: string) {
  const current = timeInSeoul(now)
  const start = minutes(quietStart)
  const end = minutes(quietEnd)
  return start <= end ? current >= start && current < end : current >= start || current < end
}

export function selectNudgeTask(tasks: Task[], now: Date, latestResponse: TaskCheckInResponse | null = null) {
  const open = tasks.filter((task) => !['completed', 'canceled'].includes(task.status))
  if ((latestResponse?.action === 'later' || latestResponse?.action === 'remind_5') && latestResponse.remindAt) {
    const delayed = open.find((task) => task.id === latestResponse.taskId)
    if (new Date(latestResponse.remindAt) > now) {
      const withoutDelayed = open.filter((task) => task.id !== latestResponse.taskId)
      return selectCurrentMission(withoutDelayed, now) ?? (delayed?.required ? null : selectNowTask(withoutDelayed, now))
    }
  }
  return selectCurrentMission(open, now) ?? selectNowTask(open, now)
}

export function buildNudgeLine(task: Task) {
  if (task.status === 'active') return `${task.title} 하는 중이지? 지금 흐름만 이어가도 좋아.`
  return `${task.title} 했어? 한 단계만 해도 좋아.`
}

export function applyCheckInResponse(tasks: Task[], response: TaskCheckInResponse, now: Date) {
  const updatedAt = now.toISOString()
  const nextTasks = tasks.map((task) => {
    if (task.id !== response.taskId) return task
    if (response.action === 'done') {
      return task.required
        ? completeMission(task, now)
        : { ...task, status: 'completed' as const, completedAt: updatedAt, updatedAt }
    }
    if (response.action === 'in_progress' || response.action === 'start') return { ...task, status: 'active' as const, updatedAt }
    return task
  })
  const nextTask = response.action === 'in_progress' || response.action === 'start'
    ? nextTasks.find((task) => task.id === response.taskId) ?? null
    : selectNudgeTask(nextTasks, now, response)
  return { tasks: nextTasks, nextTaskId: nextTask?.id ?? null }
}
