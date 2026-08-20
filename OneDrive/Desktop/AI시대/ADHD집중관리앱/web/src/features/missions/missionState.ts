import type { MissionCommitment, Task } from '../../core/model/task'

type MissionCommitmentInput = Pick<MissionCommitment, 'firstAction' | 'scheduledStart' | 'timeLocked'>

export function commitMission(task: Task, input: MissionCommitmentInput, now: Date): Task {
  const timestamp = now.toISOString()
  return {
    ...task,
    required: true,
    commitmentDay: input.scheduledStart?.slice(0, 10) ?? task.day,
    firstAction: input.firstAction,
    scheduledStart: input.scheduledStart,
    timeLocked: input.timeLocked,
    committedAt: timestamp,
    updatedAt: timestamp,
  }
}

export function uncommitMission(task: Task, now: Date): Task {
  return {
    ...task,
    required: false,
    updatedAt: now.toISOString(),
  }
}

export function completeMission(task: Task, now: Date): Task {
  if (!task.required) throw new Error('MISSION_NOT_COMMITTED')
  return { ...task, status: 'completed', completedAt: now.toISOString(), updatedAt: now.toISOString() }
}
