import type { Task } from '../../core/model/task'
import { missionModeForMission, type MissionEscalationLevel } from '../missions/extendedDay'
import { isTaskEligible, selectCurrentMission } from '../today/selectNowTask'

export interface WidgetTask {
  id: string
  title: string
  completed: boolean
  dueAt?: string
  updatedAt: string
}

export interface WidgetSnapshot {
  generatedAt: string
  remainingCount: number
  tasks: WidgetTask[]
  nudgeLine: string
  currentMissionId?: string
  commitmentDay?: string
  firstAction?: string
  escalationLevel: MissionEscalationLevel
}

export function buildWidgetSnapshot(tasks: Task[], nudgeLine: string, now = new Date()): WidgetSnapshot {
  const remaining = tasks.filter((task) => isTaskEligible(task, now))
  const currentMission = selectCurrentMission(remaining, now)
  const ordered = currentMission
    ? [currentMission, ...remaining.filter((task) => task.id !== currentMission.id)]
    : remaining
  return {
    generatedAt: now.toISOString(),
    remainingCount: remaining.length,
    tasks: ordered.slice(0, 3).map((task) => ({
      id: task.id,
      title: task.title,
      completed: false,
      dueAt: task.dueAt,
      updatedAt: task.updatedAt,
    })),
    nudgeLine,
    currentMissionId: currentMission?.id,
    commitmentDay: currentMission?.commitmentDay,
    firstAction: currentMission?.firstAction,
    escalationLevel: missionModeForMission(currentMission, now) === 'extended' ? 'widget' : 'push',
  }
}
