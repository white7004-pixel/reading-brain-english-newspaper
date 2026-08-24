import { useEffect, useMemo, useState } from 'react'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'
import { MonthlyCalendar } from './MonthlyCalendar'
import { buildMonthlySummary, type MonthlyMetrics } from './monthlySummary'
import { createDatabase } from '../../core/storage/database'
import { createTaskRepository } from '../../core/storage/taskRepository'
import { createRecurringRepository } from '../../core/storage/recurringRepository'

type Month = { year: number; month: number }

function monthInSeoul(date: Date): Month {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric' }).formatToParts(date)
  return { year: Number(parts.find((part) => part.type === 'year')!.value), month: Number(parts.find((part) => part.type === 'month')!.value) }
}

function moveMonth(current: Month, offset: -1 | 1): Month {
  const monthIndex = current.year * 12 + current.month - 1 + offset
  return { year: Math.floor(monthIndex / 12), month: (monthIndex % 12 + 12) % 12 + 1 }
}

const METRIC_LABELS: Record<keyof MonthlyMetrics, string> = {
  parentCounseling: '학부모 상담', studentCounseling: '학생 상담', teacherMeetings: '교사 미팅',
  newStudents: '신입생', withdrawnStudents: '퇴원생', marketingPosts: '마케팅 발행',
  curriculumChecks: '커리큘럼 점검', reading: '독서', exercise: '운동', carriedForward: '이어가기',
}

export interface MonthlyDependencies {
  listTasks(startDay: string, endDay: string): Promise<Task[]>
  listInstances(startDay: string, endDay: string): Promise<RecurringTaskInstance[]>
  listTemplates(): Promise<RecurringTaskTemplate[]>
}

const database = createDatabase()
const taskRepository = createTaskRepository(database)
const recurringRepository = createRecurringRepository(database)
const defaultDependencies: MonthlyDependencies = {
  listTasks: taskRepository.listBetween,
  listInstances: recurringRepository.listBetween,
  listTemplates: recurringRepository.listTemplates,
}

export function MonthlyScreen({ initialDate = new Date(), tasks, instances, templates, selectedPersonaId = 'all', dependencies = defaultDependencies }: {
  initialDate?: Date
  tasks?: Task[]
  instances?: RecurringTaskInstance[]
  templates?: RecurringTaskTemplate[]
  selectedPersonaId?: string
  dependencies?: MonthlyDependencies
}) {
  const [currentMonth, setCurrentMonth] = useState(() => monthInSeoul(initialDate))
  const [loadedTasks, setLoadedTasks] = useState<Task[]>(tasks ?? [])
  const [loadedInstances, setLoadedInstances] = useState<RecurringTaskInstance[]>(instances ?? [])
  const [loadedTemplates, setLoadedTemplates] = useState<RecurringTaskTemplate[]>(templates ?? [])
  const month = `${currentMonth.year}-${String(currentMonth.month).padStart(2, '0')}`
  useEffect(() => {
    if (tasks || instances || templates) return
    const endDay = `${month}-${String(new Date(Date.UTC(currentMonth.year, currentMonth.month, 0)).getUTCDate()).padStart(2, '0')}`
    void Promise.all([
      dependencies.listTasks(`${month}-01`, endDay), dependencies.listInstances(`${month}-01`, endDay), dependencies.listTemplates(),
    ]).then(([nextTasks, nextInstances, nextTemplates]) => {
      setLoadedTasks(nextTasks); setLoadedInstances(nextInstances); setLoadedTemplates(nextTemplates)
    })
  }, [currentMonth.month, currentMonth.year, dependencies, instances, month, tasks, templates])
  const summary = useMemo(() => buildMonthlySummary(loadedTasks, loadedInstances, loadedTemplates, month, selectedPersonaId), [loadedTasks, loadedInstances, loadedTemplates, month, selectedPersonaId])

  return <section className="feature-screen monthly-screen">
    <span>월별 운영 보드</span><h2>월간 운영</h2>
    <div className="monthly-screen__toolbar">
      <button type="button" aria-label="이전 달" onClick={() => setCurrentMonth((value) => moveMonth(value, -1))}><span aria-hidden="true">‹</span></button>
      <strong aria-live="polite">{currentMonth.year}년 {currentMonth.month}월</strong>
      <button type="button" aria-label="다음 달" onClick={() => setCurrentMonth((value) => moveMonth(value, 1))}><span aria-hidden="true">›</span></button>
    </div>
    <MonthlyCalendar month={month} days={summary.days} />
    <section aria-label="운영 지표" className="monthly-metrics">
      <h3>이번 달 운영 지표</h3>
      <dl>{Object.entries(summary.metrics).map(([key, value]) => <div key={key}><dt>{METRIC_LABELS[key as keyof MonthlyMetrics]}</dt><dd>{value}</dd></div>)}</dl>
    </section>
  </section>
}
