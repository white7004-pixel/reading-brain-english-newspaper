import { useEffect, useMemo, useState } from 'react'
import type { Task } from '../../core/model/task'
import { createDatabase } from '../../core/storage/database'
import { createTaskRepository } from '../../core/storage/taskRepository'
import { buildTimeline } from './buildTimeline'
import { NowCard } from './NowCard'
import { parseTaskDrafts } from './parseTaskDrafts'
import { QuickCapture } from './QuickCapture'
import { recommendForEnergy, selectCurrentMission, type Energy } from './selectNowTask'
import { TaskDraftReview } from './TaskDraftReview'
import type { TaskDraft } from './taskDraft'
import { Timeline } from './Timeline'
import { nativeWidgetBridge } from '../widgets/nativeWidgetBridge'
import { buildWidgetSnapshot, type WidgetSnapshot } from '../widgets/widgetSnapshot'
import type { Category } from '../../core/model/category'
import { DEFAULT_CATEGORIES } from '../../core/model/category'
import { createCategoryRepository } from '../../core/storage/categoryRepository'
import { PriorityTaskList } from './PriorityTaskList'
import { MissionCommitmentReview } from '../missions/MissionCommitmentReview'
import { CurrentMissionCard } from '../missions/CurrentMissionCard'
import { completeMission } from '../missions/missionState'
import { FocusScreen } from '../focus/FocusScreen'
import { taskCheckInRepository } from '../nudges/taskCheckIn'
import { reschedulePlan, type RescueDecision } from '../rescue/reschedulePlan'

export interface TodayDependencies {
  parse(input: string, now: Date): TaskDraft[]
  saveMany(tasks: Task[]): Promise<unknown>
  listForDay?(day: string): Promise<Task[]>
  listRequiredOpen?(): Promise<Task[]>
  updateWidget(snapshot: WidgetSnapshot): Promise<unknown>
  listCategories?(): Promise<Category[]>
  addCategory?(input: { name: string; color: string }): Promise<Category>
}

const database = createDatabase()
const taskRepository = createTaskRepository(database)
const categoryRepository = createCategoryRepository(database)
const defaultDependencies: TodayDependencies = {
  parse: parseTaskDrafts,
  saveMany: taskRepository.putMany,
  listForDay: taskRepository.listForDay,
  listRequiredOpen: taskRepository.listRequiredOpen,
  updateWidget: (snapshot) => nativeWidgetBridge.update(snapshot),
  listCategories: async () => {
    await categoryRepository.ensureDefaults()
    return categoryRepository.list()
  },
  addCategory: (input) => categoryRepository.add(input),
}

function dayFor(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(date)
}

export function TodayScreen({ dependencies = defaultDependencies }: { dependencies?: TodayDependencies }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [drafts, setDrafts] = useState<TaskDraft[]>([])
  const [energy, setEnergy] = useState<Energy>('medium')
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES)
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [focusMission, setFocusMission] = useState<Task | null>(null)
  const [reschedulingMission, setReschedulingMission] = useState<Task | null>(null)
  const nowTask = useMemo(() => recommendForEnergy(tasks, energy), [tasks, energy])
  const currentMission = useMemo(() => selectCurrentMission(tasks), [tasks])

  useEffect(() => {
    let active = true
    if (dependencies.listForDay || dependencies.listRequiredOpen) void Promise.all([
      dependencies.listForDay ? dependencies.listForDay(dayFor(new Date())) : Promise.resolve([]),
      dependencies.listRequiredOpen ? dependencies.listRequiredOpen() : Promise.resolve([]),
    ]).then(([forToday, required]) => {
      if (!active) return
      setTasks([...forToday, ...required.filter((task) => !forToday.some(({ id }) => id === task.id))])
    })
    if (dependencies.listCategories) void dependencies.listCategories().then((saved) => { if (active) setCategories(saved) })
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
    void saveTasks([{ id: crypto.randomUUID(), title, day: dayFor(now), status: 'open', priority: 2, estimateMinutes: 15, category: 'life', categoryId: 'personal', source: 'manual', createdAt: now.toISOString(), updatedAt: now.toISOString() }])
  }

  const saveDrafts = async (reviewed: TaskDraft[]) => {
    const now = new Date()
    const ids = new Map(reviewed.map((draft) => [draft.id, crypto.randomUUID()]))
    const next: Task[] = reviewed.map((draft) => ({
      id: ids.get(draft.id)!, title: draft.title.trim(), day: draft.day, dueAt: draft.dueAt,
      status: 'open', priority: draft.priority, estimateMinutes: draft.estimateMinutes,
      category: draft.categoryId === 'work' ? 'work' : draft.categoryId === 'exercise' ? 'exercise' : draft.categoryId === 'personal' ? 'life' : 'rest', categoryId: draft.categoryId, source: 'local_parser', parseConfidence: draft.confidence,
      orderAfterTaskId: draft.orderAfterDraftId ? ids.get(draft.orderAfterDraftId) : undefined,
      createdAt: now.toISOString(), updatedAt: now.toISOString(),
    }))
    await saveTasks(next)
    setDrafts([])
  }

  const startMission = (task: Task) => {
    void saveTasks([{ ...task, status: 'active', updatedAt: new Date().toISOString() }])
    setFocusMission(task)
  }

  const delayMission = (task: Task) => {
    const now = new Date()
    taskCheckInRepository.save({ taskId: task.id, action: 'later', respondedAt: now.toISOString(), remindAt: new Date(now.getTime() + 5 * 60_000).toISOString() })
  }

  const completeCurrentMission = (task: Task) => {
    void saveTasks([completeMission(task, new Date())])
  }

  const rescheduleMission = (task: Task, decision: RescueDecision) => {
    const next = reschedulePlan([task], { [task.id]: decision }, new Date()).items[0]
    void saveTasks([next])
    setReschedulingMission(null)
  }

  const reviewableTasks = tasks.filter((task) => !task.required && task.status !== 'completed' && task.status !== 'canceled')

  if (focusMission) return <FocusScreen title={focusMission.title} taskId={focusMission.id} minutes={3} autoStart onComplete={() => { completeCurrentMission(focusMission); setFocusMission(null) }} onExit={() => setFocusMission(null)} />

  return <>
    <div className="energy"><span>지금 에너지는?</span>{(['low', 'medium', 'high'] as const).map((value, index) => <button aria-pressed={energy === value} key={value} onClick={() => setEnergy(value)}>{['낮음', '보통', '높음'][index]}</button>)}</div>
    <QuickCapture onOrganize={(input) => setDrafts(dependencies.parse(input, new Date()))} onSingleTask={addSingleTask} />
    {drafts.length > 0 && <TaskDraftReview drafts={drafts} categories={categories} onCreateCategory={async (input) => {
      if (!dependencies.addCategory) throw new Error('분류를 추가할 수 없어요.')
      const category = await dependencies.addCategory(input)
      setCategories((current) => [...current, category])
      return category
    }} onChange={setDrafts} onSave={(reviewed) => void saveDrafts(reviewed)} onCancel={() => setDrafts([])} />}
    {reviewableTasks.length > 0 && <MissionCommitmentReview tasks={reviewableTasks} onConfirm={(committed) => void saveTasks(committed)} />}
    {currentMission ? <CurrentMissionCard task={currentMission} onStart={() => startMission(currentMission)} onDelay={() => delayMission(currentMission)} onReschedule={() => setReschedulingMission(currentMission)} onComplete={() => completeCurrentMission(currentMission)} /> : <NowCard task={nowTask} />}
    {reschedulingMission && <section className="mission-reschedule" aria-label="미션 일정 다시 잡기">
      <h2>{reschedulingMission.title}을 어떻게 다시 잡을까요?</h2>
      <p>필수 미션은 완료하거나 명시적으로 해제하기 전까지 유지돼요.</p>
      <div className="capture-actions">
        <button type="button" onClick={() => rescheduleMission(reschedulingMission, 'five_minute')}>5분으로 줄이기</button>
        <button type="button" onClick={() => rescheduleMission(reschedulingMission, 'tomorrow')}>내일로 미루기</button>
        <button type="button" onClick={() => rescheduleMission(reschedulingMission, 'cancel')}>미션 취소</button>
        <button type="button" onClick={() => setReschedulingMission(null)}>돌아가기</button>
      </div>
    </section>}
    <PriorityTaskList tasks={tasks} categories={categories} activeTaskId={nowTask?.id} selectedCategoryId={selectedCategoryId} onSelectCategory={setSelectedCategoryId} />
    <Timeline items={buildTimeline(tasks, [])} />
  </>
}
