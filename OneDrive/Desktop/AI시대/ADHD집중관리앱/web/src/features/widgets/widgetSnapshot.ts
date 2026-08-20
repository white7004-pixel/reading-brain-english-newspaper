import type { Task } from '../../core/model/task'
import { missionMode, type MissionEscalationLevel } from '../missions/extendedDay'
import { selectCurrentMission } from '../today/selectNowTask'

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
  const remaining = tasks.filter((task) => !['completed', 'canceled'].includes(task.status))
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
    escalationLevel: currentMission && missionMode(remaining, now) === 'extended' ? 'widget' : 'push',
  }
}
