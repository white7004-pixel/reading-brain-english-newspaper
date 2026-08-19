import { useEffect, useMemo, useState } from 'react'
import type { Task } from '../../core/model/task'
import { createDatabase } from '../../core/storage/database'
import { createTaskRepository } from '../../core/storage/taskRepository'
import { buildTimeline } from './buildTimeline'
import { NowCard } from './NowCard'
import { parseTaskDrafts } from './parseTaskDrafts'
import { QuickCapture } from './QuickCapture'
import { recommendForEnergy, type Energy } from './selectNowTask'
import { TaskDraftReview } from './TaskDraftReview'
import type { TaskDraft } from './taskDraft'
import { Timeline } from './Timeline'
import { nativeWidgetBridge } from '../widgets/nativeWidgetBridge'
import { buildWidgetSnapshot, type WidgetSnapshot } from '../widgets/widgetSnapshot'

export interface TodayDependencies {
  parse(input: string, now: Date): TaskDraft[]
  saveMany(tasks: Task[]): Promise<unknown>
  listForDay?(day: string): Promise<Task[]>
  updateWidget(snapshot: WidgetSnapshot): Promise<unknown>
}

const taskRepository = createTaskRepository(createDatabase())
const defaultDependencies: TodayDependencies = {
  parse: parseTaskDrafts,
  saveMany: taskRepository.putMany,
  listForDay: taskRepository.listForDay,
  updateWidget: (snapshot) => nativeWidgetBridge.update(snapshot),
}

function dayFor(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(date)
}

export function TodayScreen({ dependencies = defaultDependencies }: { dependencies?: TodayDependencies }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [drafts, setDrafts] = useState<TaskDraft[]>([])
  const [energy, setEnergy] = useState<Energy>('medium')
  const nowTask = useMemo(() => recommendForEnergy(tasks, energy), [tasks, energy])

  useEffect(() => {
    let active = true
    if (dependencies.listForDay) void dependencies.listForDay(dayFor(new Date())).then((saved) => { if (active) setTasks(saved) })
    return () => { active = false }
  }, [dependencies])

  const saveTasks = async (next: Task[]) => {
    await dependencies.saveMany(next)
    const merged = [...tasks.filter((task) => !next.some(({ id }) => id === task.id)), ...next]
    setTasks(merged)
    await dependencies.updateWidget(buildWidgetSnapshot(merged, '', new Date()))
    window.dispatchEvent(new Event('monggle:tasks-changed'))
  }

  const addSingleTask = (title: string) => {
    const now = new Date()
    void saveTasks([{ id: crypto.randomUUID(), title, day: dayFor(now), status: 'open', priority: 2, estimateMinutes: 15, category: 'study', source: 'manual', createdAt: now.toISOString(), updatedAt: now.toISOString() }])
  }

  const saveDrafts = async (reviewed: TaskDraft[]) => {
    const now = new Date()
    const ids = new Map(reviewed.map((draft) => [draft.id, crypto.randomUUID()]))
    const next: Task[] = reviewed.map((draft) => ({
      id: ids.get(draft.id)!, title: draft.title.trim(), day: draft.day, dueAt: draft.dueAt,
      status: 'open', priority: draft.priority, estimateMinutes: draft.estimateMinutes,
      category: 'study', source: 'local_parser', parseConfidence: draft.confidence,
      orderAfterTaskId: draft.orderAfterDraftId ? ids.get(draft.orderAfterDraftId) : undefined,
      createdAt: now.toISOString(), updatedAt: now.toISOString(),
    }))
    await saveTasks(next)
    setDrafts([])
  }

  return <>
    <div className="energy"><span>지금 에너지는?</span>{(['low', 'medium', 'high'] as const).map((value, index) => <button aria-pressed={energy === value} key={value} onClick={() => setEnergy(value)}>{['낮음', '보통', '높음'][index]}</button>)}</div>
    <QuickCapture onOrganize={(input) => setDrafts(dependencies.parse(input, new Date()))} onSingleTask={addSingleTask} />
    {drafts.length > 0 && <TaskDraftReview drafts={drafts} onChange={setDrafts} onSave={(reviewed) => void saveDrafts(reviewed)} onCancel={() => setDrafts([])} />}
    <NowCard task={nowTask} />
    <Timeline items={buildTimeline(tasks, [])} />
  </>
}
