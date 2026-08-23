import { useEffect, useMemo, useRef, useState } from 'react'
import type { Task } from '../../core/model/task'
import { createDatabase } from '../../core/storage/database'
import { createTaskRepository } from '../../core/storage/taskRepository'
import { buildTimeline } from './buildTimeline'
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
import { FocusScreen } from '../focus/FocusScreen'
import { taskCheckInRepository } from '../nudges/taskCheckIn'
import { reschedulePlan, type RescueDecision } from '../rescue/reschedulePlan'
import { appNow } from '../../core/time/appClock'
import { TodayHeader } from './TodayHeader'
import { UpcomingPreview } from './UpcomingPreview'
import { InlineQuickAdd } from './InlineQuickAdd'
import { PetHero } from '../pet/PetHero'
import { RewardBurst } from '../pet/RewardBurst'
import { createPetRepository } from '../pet/petRepository'
import { calculateReward } from '../pet/rewardPolicy'
import type { PetGameState, RewardEvent, RewardGrant } from '../pet/model'
import { FeaturedQuest } from './FeaturedQuest'
import { QuestList } from './QuestList'
import { rewardOutbox } from './rewardOutbox'

export interface TodayDependencies {
  parse(input: string, now: Date): TaskDraft[]
  saveMany(tasks: Task[]): Promise<unknown>
  listForDay?(day: string): Promise<Task[]>
  listRequiredOpen?(): Promise<Task[]>
  updateWidget(snapshot: WidgetSnapshot): Promise<unknown>
  listCategories?(): Promise<Category[]>
  addCategory?(input: { name: string; color: string }): Promise<Category>
  loadPetState(): Promise<PetGameState>
  recordReward(event: RewardEvent): Promise<void>
  settleReward(eventId: string): Promise<PetGameState>
  recoverRewards(): Promise<PetGameState>
  listPendingRewards(): RewardEvent[]
  savePendingReward(event: RewardEvent): void
  removePendingReward(eventId: string): void
}

const database = createDatabase()
const taskRepository = createTaskRepository(database)
const categoryRepository = createCategoryRepository(database)
const petRepository = createPetRepository(database)
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
  loadPetState: petRepository.loadState,
  recordReward: async (event) => { await petRepository.record(event) },
  settleReward: petRepository.settle,
  recoverRewards: async () => {
    const pending = await petRepository.listUnsettled()
    let state = await petRepository.loadState()
    for (const event of pending) state = await petRepository.settle(event.id)
    return state
  },
  listPendingRewards: rewardOutbox.list,
  savePendingReward: rewardOutbox.put,
  removePendingReward: rewardOutbox.remove,
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
  const [captureExpanded, setCaptureExpanded] = useState(false)
  const [planningExpanded, setPlanningExpanded] = useState(false)
  const [petState, setPetState] = useState<PetGameState | null>(null)
  const [rewardGrant, setRewardGrant] = useState<RewardGrant | null>(null)
  const [rewardStatus, setRewardStatus] = useState('')
  const [tasksLoading, setTasksLoading] = useState(Boolean(dependencies.listForDay || dependencies.listRequiredOpen))
  const [taskLoadError, setTaskLoadError] = useState('')
  const [categoryLoadError, setCategoryLoadError] = useState('')
  const completionInFlightRef = useRef(new Set<string>())
  const quickAddInputRef = useRef<HTMLInputElement>(null)
  const [completingTaskIds, setCompletingTaskIds] = useState<ReadonlySet<string>>(new Set())
  const nowTask = useMemo(() => recommendForEnergy(tasks, energy, appNow()), [tasks, energy])
  const currentMission = useMemo(() => selectCurrentMission(tasks, appNow()), [tasks])
  const featuredReward = useMemo(() => nowTask
    ? calculateReward({ taskId: nowTask.id, focusMinutes: 0 }, () => 1)
    : null, [nowTask])

  useEffect(() => {
    let active = true
    const hasTaskLoaders = Boolean(dependencies.listForDay || dependencies.listRequiredOpen)
    setTasksLoading(hasTaskLoaders)
    setTaskLoadError('')
    setCategoryLoadError('')
    if (hasTaskLoaders) void Promise.all([
      dependencies.listForDay ? dependencies.listForDay(dayFor(appNow())) : Promise.resolve([]),
      dependencies.listRequiredOpen ? dependencies.listRequiredOpen() : Promise.resolve([]),
    ])
      .then(([forToday, required]) => {
        if (!active) return
        setTasks([...forToday, ...required.filter((task) => !forToday.some(({ id }) => id === task.id))])
      })
      .catch(() => { if (active) setTaskLoadError('오늘 퀘스트를 불러오지 못했어요') })
      .finally(() => { if (active) setTasksLoading(false) })
    if (dependencies.listCategories) void dependencies.listCategories()
      .then((saved) => { if (active) setCategories(saved) })
      .catch(() => { if (active) setCategoryLoadError('분류를 불러오지 못했어요') })
    const recoverAllRewards = async () => {
      let state = await dependencies.recoverRewards()
      for (const event of dependencies.listPendingRewards()) {
        await dependencies.recordReward(event)
        state = await dependencies.settleReward(event.id)
        dependencies.removePendingReward(event.id)
      }
      return state
    }
    void recoverAllRewards()
      .then((state) => { if (active) setPetState(state) })
      .catch(async () => {
        if (!active) return
        setRewardStatus('보상은 다음 실행에서 다시 받을 수 있어요')
        try {
          const state = await dependencies.loadPetState()
          if (active) setPetState(state)
        } catch {
          if (active) setRewardStatus('몽글이 상태를 불러오지 못했어요')
        }
      })
    return () => { active = false }
  }, [dependencies])

  const saveTasks = async (next: Task[]) => {
    await dependencies.saveMany(next)
    const merged = [...tasks.filter((task) => !next.some(({ id }) => id === task.id)), ...next]
    setTasks(merged)
    try {
      await dependencies.updateWidget(buildWidgetSnapshot(merged, '', appNow()))
    } catch {
      // Widget state is a best-effort projection. A failed projection must not
      // turn an already-persisted task change into a failed save.
    }
    window.dispatchEvent(new Event('monggle:tasks-changed'))
  }

  const addSingleTask = async (title: string) => {
    const now = appNow()
    await saveTasks([{ id: crypto.randomUUID(), title, day: dayFor(now), status: 'open', priority: 2, estimateMinutes: 15, category: 'life', categoryId: 'personal', source: 'manual', createdAt: now.toISOString(), updatedAt: now.toISOString() }])
  }

  const saveDrafts = async (reviewed: TaskDraft[]) => {
    const now = appNow()
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
    void saveTasks([{ ...task, status: 'active', updatedAt: appNow().toISOString() }])
      .catch(() => setRewardStatus('시작 상태를 저장하지 못했어요. 다시 시도해 주세요.'))
    setFocusMission(task)
  }

  const delayMission = (task: Task) => {
    const now = appNow()
    taskCheckInRepository.save({ taskId: task.id, action: 'later', respondedAt: now.toISOString(), remindAt: new Date(now.getTime() + 5 * 60_000).toISOString() })
  }

  const completeQuest = async (task: Task, focusMinutes = 0) => {
    if (completionInFlightRef.current.has(task.id)) return
    completionInFlightRef.current.add(task.id)
    setCompletingTaskIds(new Set(completionInFlightRef.current))
    const completedAt = appNow().toISOString()
    const completedTask: Task = { ...task, status: 'completed', completedAt, updatedAt: completedAt }
    setRewardStatus('')

    try {
      try {
        await saveTasks([completedTask])
      } catch {
        setRewardStatus('완료를 저장하지 못했어요. 다시 시도해 주세요.')
        return
      }

      const grant = calculateReward({ taskId: task.id, focusMinutes }, Math.random)
      const event: RewardEvent = {
        id: `${completedTask.id}@${completedTask.completedAt}`,
        taskId: completedTask.id,
        completedAt: completedTask.completedAt!,
        focusMinutes,
        grant,
      }

      try {
        dependencies.savePendingReward(event)
      } catch {
        setRewardStatus('보상 복구 정보를 저장하지 못했어요. 다시 시도해 주세요.')
        return
      }

      try {
        await dependencies.recordReward(event)
      } catch {
        setRewardStatus('퀘스트는 완료했지만 보상을 저장하지 못했어요')
        return
      }

      try {
        const state = await dependencies.settleReward(event.id)
        dependencies.removePendingReward(event.id)
        setPetState(state)
        setRewardGrant(grant)
      } catch {
        setRewardStatus('보상은 다음 실행에서 다시 받을 수 있어요')
      }
    } finally {
      completionInFlightRef.current.delete(task.id)
      setCompletingTaskIds(new Set(completionInFlightRef.current))
    }
  }

  const rescheduleMission = (task: Task, decision: RescueDecision) => {
    const next = reschedulePlan([task], { [task.id]: decision }, appNow()).items[0]
    void saveTasks([next])
    setReschedulingMission(null)
  }

  const reviewableTasks = tasks.filter((task) => !task.required && task.status !== 'completed' && task.status !== 'canceled')
  const dashboardTasks = tasks.filter((task) => task.status !== 'canceled' && task.status !== 'deferred')
  const completedCount = dashboardTasks.filter((task) => task.status === 'completed').length

  if (focusMission) return <FocusScreen title={focusMission.title} taskId={focusMission.id} minutes={3} autoStart onComplete={({ elapsedMinutes }) => { void completeQuest(focusMission, elapsedMinutes); setFocusMission(null) }} onExit={() => setFocusMission(null)} />

  return <>
    <TodayHeader date={appNow()} energy={energy} total={dashboardTasks.length} completed={completedCount} onEnergyChange={setEnergy} onAdd={() => {
      setCaptureExpanded(true)
      setPlanningExpanded(true)
    }} />
    {petState ? <div className="pet-home-status">
      <PetHero state={petState} />
      <p aria-label="몽글이 보유 보상"><span>경험치 {petState.xp}</span><span>코인 {petState.coins}</span></p>
    </div> : <p className="pet-state-loading">몽글이를 깨우고 있어요…</p>}
    {nowTask && featuredReward && <FeaturedQuest task={nowTask} reward={featuredReward} onStart={startMission} />}
    <InlineQuickAdd inputRef={quickAddInputRef} onAdd={addSingleTask} />
    {tasksLoading || taskLoadError ? <section className="quest-list" aria-label="오늘 할 일">
      <div className="quest-list__heading"><h2>오늘의 퀘스트</h2></div>
      <div className="quest-list__empty">
        {tasksLoading
          ? <strong role="status" aria-label="오늘 퀘스트 불러오는 중">오늘 퀘스트를 불러오는 중이에요…</strong>
          : <strong>퀘스트를 표시할 수 없어요</strong>}
      </div>
    </section> : <QuestList tasks={dashboardTasks} completingTaskIds={completingTaskIds} onStart={startMission} onComplete={(task) => { void completeQuest(task) }} />}
    {(taskLoadError || categoryLoadError) && <div className="today-load-error" role="alert">
      {taskLoadError && <span>{taskLoadError}</span>}
      {categoryLoadError && <span>{categoryLoadError}</span>}
    </div>}
    {rewardStatus && <p className="reward-status" role="status">{rewardStatus}</p>}
    {rewardGrant && <RewardBurst grant={rewardGrant} returnFocusRef={quickAddInputRef} onDismiss={() => setRewardGrant(null)} />}
    <details className="today-details" open={planningExpanded} onToggle={(event) => setPlanningExpanded(event.currentTarget.open)}><summary>계획 도구</summary>
      {planningExpanded && <>
      {captureExpanded && <QuickCapture onOrganize={(input) => setDrafts(dependencies.parse(input, appNow()))} onSingleTask={(title) => {
        void addSingleTask(title).catch(() => setRewardStatus('할 일을 저장하지 못했어요. 다시 시도해 주세요.'))
      }} />}
      {currentMission && <CurrentMissionCard task={currentMission} onStart={() => startMission(currentMission)} onDelay={() => delayMission(currentMission)} onReschedule={() => setReschedulingMission(currentMission)} onComplete={() => { void completeQuest(currentMission) }} />}
      <UpcomingPreview tasks={tasks} />
      {drafts.length > 0 && <TaskDraftReview drafts={drafts} categories={categories} onCreateCategory={async (input) => {
        if (!dependencies.addCategory) throw new Error('분류를 추가할 수 없어요.')
        const category = await dependencies.addCategory(input)
        setCategories((current) => [...current, category])
        return category
      }} onChange={setDrafts} onSave={(reviewed) => void saveDrafts(reviewed)} onCancel={() => setDrafts([])} />}
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
      {reviewableTasks.length > 0 && <MissionCommitmentReview tasks={reviewableTasks} onConfirm={(committed) => void saveTasks(committed)} now={appNow()} />}
      <PriorityTaskList tasks={tasks} categories={categories} activeTaskId={nowTask?.id} selectedCategoryId={selectedCategoryId} onSelectCategory={setSelectedCategoryId} />
      <Timeline items={buildTimeline(tasks, [])} />
      </>}
    </details>
  </>
}
