import { useMemo, useState } from 'react'
import type { Task } from '../../core/model/task'
import { buildTimeline } from './buildTimeline'
import { NowCard } from './NowCard'
import { QuickCapture } from './QuickCapture'
import { recommendForEnergy, type Energy } from './selectNowTask'
import { Timeline } from './Timeline'

export function TodayScreen() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [energy, setEnergy] = useState<Energy>('medium')
  const nowTask = useMemo(() => recommendForEnergy(tasks, energy), [tasks, energy])
  const addTask = (title: string) => {
    const now = new Date()
    setTasks((current) => [...current, { id: crypto.randomUUID(), title, day: now.toISOString().slice(0, 10), status: 'open', priority: 2, estimateMinutes: 15, category: 'study', source: 'manual', createdAt: now.toISOString(), updatedAt: now.toISOString() }])
  }
  return <>
    <div className="energy"><span>지금 에너지는?</span>{(['low', 'medium', 'high'] as const).map((value, i) => <button aria-pressed={energy === value} key={value} onClick={() => setEnergy(value)}>{['낮음', '보통', '높음'][i]}</button>)}</div>
    <QuickCapture onTask={addTask} />
    <NowCard task={nowTask} />
    <Timeline items={buildTimeline(tasks, [])} />
  </>
}
