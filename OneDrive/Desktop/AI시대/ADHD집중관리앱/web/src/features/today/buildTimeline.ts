import type { ScheduledMessage } from '../../core/model/message'
import type { Task } from '../../core/model/task'

export interface TimelineItem { id: string; at: string; kind: 'task' | 'message'; title: string; statusLabel: string }

export function buildTimeline(tasks: Task[], messages: ScheduledMessage[]): TimelineItem[] {
  return [
    ...tasks.filter((task) => task.dueAt).map((task) => ({ id: task.id, at: task.dueAt!, kind: 'task' as const, title: task.title, statusLabel: '할 일' })),
    ...messages.map((message) => ({ id: message.id, at: message.scheduledAt, kind: 'message' as const, title: message.body, statusLabel: '예약 메시지' })),
  ].sort((a, b) => a.at.localeCompare(b.at))
}
