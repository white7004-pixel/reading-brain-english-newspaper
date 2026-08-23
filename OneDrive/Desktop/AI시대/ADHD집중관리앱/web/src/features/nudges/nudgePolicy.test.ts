import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import {
  applyCheckInResponse,
  buildCoachDecision,
  buildNudgeLine,
  coachPromptDueAt,
  isCoachPromptDue,
  isQuietTime,
  nextNudgeAt,
  remindFiveAt,
  selectNudgeTask,
} from './nudgePolicy'

const now = new Date('2026-08-20T10:00:00+09:00')
const task = (id: string, overrides: Partial<Task> = {}): Task => ({
  id, title: id === 'task-1' ? '수학 숙제' : '영어 단어', day: '2026-08-20', status: 'open', priority: 2,
  estimateMinutes: 15, category: 'study', source: 'manual', createdAt: now.toISOString(), updatedAt: now.toISOString(), ...overrides,
})

const coachBase = {
  task: task('task-1', { firstAction: '문제집 첫 페이지 펴기' }),
  unansweredPrompts: 0,
  now,
  quiet: false,
  calendarBusy: false,
  focusActive: false,
  determinedMode: false,
}

describe('supportive nudge policy', () => {
  it.each([30, 60, 120] as const)('schedules the supported %i minute interval', (minutes) => {
    expect(nextNudgeAt(now, minutes).toISOString()).toBe(new Date(now.getTime() + minutes * 60_000).toISOString())
  })

  it.each([
    { unansweredPrompts: 0, stage: 'gentle', actions: ['start', 'remind_5'] },
    { unansweredPrompts: 1, stage: 'direct', actions: ['start', 'remind_5', 'reschedule'] },
    { unansweredPrompts: 2, stage: 'decision', actions: ['start', 'remind_5', 'reschedule', 'cancel'] },
    { unansweredPrompts: 7, stage: 'decision', actions: ['start', 'remind_5', 'reschedule', 'cancel'] },
  ] as const)('builds the $stage stage after $unansweredPrompts unanswered prompts', ({ unansweredPrompts, stage, actions }) => {
    expect(buildCoachDecision({ ...coachBase, unansweredPrompts })).toMatchObject({ stage, actions })
  })

  it('offers the committed small first action in the gentle line', () => {
    expect(buildCoachDecision(coachBase).line).toContain('문제집 첫 페이지 펴기')
  })

  it('explicitly recalls the agreed task in the direct line', () => {
    const decision = buildCoachDecision({ ...coachBase, unansweredPrompts: 1 })
    expect(decision.line).toContain('하기로 한')
    expect(decision.line).toContain('수학 숙제')
  })

  it.each(['quiet', 'calendarBusy'] as const)('suppresses the next interruption while %s', (key) => {
    expect(buildCoachDecision({ ...coachBase, [key]: true }).nextPromptAt).toBeNull()
  })

  it('supports an active focus without offering a competing start action', () => {
    const decision = buildCoachDecision({ ...coachBase, focusActive: true })
    expect(decision.line).toContain('이어가')
    expect(decision.actions).not.toContain('start')
    expect(decision.actions).toContain('done')
  })

  it('uses a 60 minute interval normally and 30 minutes in determined mode', () => {
    expect(buildCoachDecision(coachBase).nextPromptAt?.toISOString()).toBe(nextNudgeAt(now, 60).toISOString())
    expect(buildCoachDecision({ ...coachBase, determinedMode: true }).nextPromptAt?.toISOString()).toBe(nextNudgeAt(now, 30).toISOString())
  })

  it('anchors the next normal prompt to the actual previous prompt instead of a wall-clock bucket', () => {
    const promptedAt = '2026-08-20T10:59:00+09:00'
    expect(coachPromptDueAt(promptedAt, now, false).toISOString()).toBe('2026-08-20T02:59:00.000Z')
    expect(isCoachPromptDue(promptedAt, new Date('2026-08-20T11:00:00+09:00'), false)).toBe(false)
    expect(isCoachPromptDue(promptedAt, new Date('2026-08-20T11:59:00+09:00'), false)).toBe(true)
  })

  it('anchors the determined prompt exactly 30 minutes after the actual previous prompt', () => {
    const promptedAt = '2026-08-20T10:59:00+09:00'
    expect(isCoachPromptDue(promptedAt, new Date('2026-08-20T11:28:59+09:00'), true)).toBe(false)
    expect(isCoachPromptDue(promptedAt, new Date('2026-08-20T11:29:00+09:00'), true)).toBe(true)
  })

  it('uses particle-neutral copy for a vowel-ending task title', () => {
    const decision = buildCoachDecision({ ...coachBase, task: task('reading', { title: '독서' }), unansweredPrompts: 2 })
    expect(decision.line).toContain('독서')
    expect(decision.line).not.toContain('독서을')
  })

  it('schedules a five-minute reminder exactly five minutes later', () => {
    expect(remindFiveAt(now).toISOString()).toBe('2026-08-20T01:05:00.000Z')
  })

  it('keeps every coaching stage free of shaming or threatening copy', () => {
    const banned = /(화나|짜증|한심|게으|실망|죄책감|창피|혼나|벌을|또 미뤘|왜 못|반드시 해)/
    const lines = [0, 1, 2].map((unansweredPrompts) => buildCoachDecision({ ...coachBase, unansweredPrompts }).line)
    expect(lines).toSatisfy((values: string[]) => values.every((line) => !banned.test(line)))
  })

  it('recognizes overnight quiet hours without replaying a missed alert', () => {
    expect(isQuietTime(new Date('2026-08-20T23:30:00+09:00'), '23:00', '07:00')).toBe(true)
    expect(isQuietTime(new Date('2026-08-21T07:01:00+09:00'), '23:00', '07:00')).toBe(false)
  })

  it('asks about one task and advances after 했어', () => {
    const result = applyCheckInResponse([task('task-1', { required: true }), task('task-2')], { taskId: 'task-1', action: 'done', respondedAt: now.toISOString() }, now)
    expect(result.tasks[0]).toMatchObject({ status: 'completed', completedAt: now.toISOString(), updatedAt: now.toISOString() })
    expect(result.nextTaskId).toBe('task-2')
  })

  it('keeps the same active task after 하는 중', () => {
    const result = applyCheckInResponse([task('task-1'), task('task-2')], { taskId: 'task-1', action: 'in_progress', respondedAt: now.toISOString() }, now)
    expect(result.tasks[0].status).toBe('active')
    expect(result.nextTaskId).toBe('task-1')
  })

  it('starts the same task through the new coach action', () => {
    const result = applyCheckInResponse([task('task-1'), task('task-2')], { taskId: 'task-1', action: 'start', respondedAt: now.toISOString() }, now)
    expect(result.tasks[0].status).toBe('active')
    expect(result.nextTaskId).toBe('task-1')
  })

  it('does not ask again before a 나중에 reminder', () => {
    const response = { taskId: 'task-1', action: 'later', remindAt: '2026-08-20T11:00:00+09:00', respondedAt: now.toISOString() } as const
    expect(selectNudgeTask([task('task-1')], new Date('2026-08-20T10:30:00+09:00'), response)).toBeNull()
  })

  it('does not ask again before a five-minute coach reminder', () => {
    const response = { taskId: 'task-1', action: 'remind_5', remindAt: '2026-08-20T10:05:00+09:00', respondedAt: now.toISOString() } as const
    expect(selectNudgeTask([task('task-1')], new Date('2026-08-20T10:04:59+09:00'), response)).toBeNull()
  })

  it('does not replace a delayed current mission with an optional nudge', () => {
    const response = { taskId: 'task-1', action: 'later', remindAt: '2026-08-20T11:00:00+09:00', respondedAt: now.toISOString() } as const
    const required = task('task-1', { required: true })

    expect(selectNudgeTask([required, task('task-2')], new Date('2026-08-20T10:30:00+09:00'), response)).toBeNull()
  })

  it('returns the same required mission first when its delayed reminder is due', () => {
    const response = { taskId: 'task-1', action: 'later', remindAt: '2026-08-20T10:05:00+09:00', respondedAt: now.toISOString() } as const
    const higherPriorityTask = task('task-2', { priority: 3 })
    const delayedRequiredTask = task('task-1', { required: true, priority: 1 })

    expect(selectNudgeTask([higherPriorityTask, delayedRequiredTask], new Date('2026-08-20T10:05:00+09:00'), response)?.id).toBe('task-1')
  })

  it('uses the shared current required mission before an optional task', () => {
    const optional = task('task-2', { priority: 3, dueAt: '2026-08-20T09:00:00+09:00' })
    const required = task('task-1', { required: true, priority: 1, commitmentDay: '2026-08-19' })

    expect(selectNudgeTask([optional, required], now)?.id).toBe('task-1')
  })

  it('skips a future-deferred required mission until tomorrow while allowing another nudge', () => {
    const deferred = task('task-1', {
      required: true,
      status: 'deferred',
      day: '2026-08-21',
      commitmentDay: '2026-08-19',
      scheduledStart: '2026-08-20T15:00:00.000Z',
    })
    const optional = task('task-2')

    expect(selectNudgeTask([deferred, optional], new Date('2026-08-20T23:59:00+09:00'))?.id).toBe('task-2')
  })

  it('uses the shared active-then-oldest commitment precedence for nudges', () => {
    const prior = task('prior', { required: true, commitmentDay: '2026-08-19', priority: 1 })
    const currentDue = task('current-due', {
      required: true,
      commitmentDay: '2026-08-20',
      dueAt: '2026-08-20T09:00:00+09:00',
      priority: 3,
    })
    expect(selectNudgeTask([currentDue, prior], now)?.id).toBe('prior')

    const active = task('active', { required: true, commitmentDay: '2026-08-20', status: 'active' })
    expect(selectNudgeTask([prior, active], now)?.id).toBe('active')
  })

  it('uses a supportive one-action question', () => {
    expect(buildNudgeLine(task('task-1'))).toBe('수학 숙제 했어? 한 단계만 해도 좋아.')
  })
})
