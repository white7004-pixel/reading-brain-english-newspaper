import type { Task } from '../../core/model/task'
import { dayInSeoul } from '../../core/time/seoulDay'
import { selectCurrentMission } from '../today/selectNowTask'

export { dayInSeoul } from '../../core/time/seoulDay'

export type MissionMode = 'normal' | 'extended'
export type MissionEscalationLevel = 'push' | 'widget' | 'app-entry'

export function missionModeForMission(mission: Task | null, now: Date): MissionMode {
  return mission?.required && mission.commitmentDay && mission.commitmentDay < dayInSeoul(now)
    ? 'extended'
    : 'normal'
}

export function missionMode(tasks: Task[], now: Date): MissionMode {
  return missionModeForMission(selectCurrentMission(tasks, now), now)
}
