import { useEffect, useMemo, useRef, useState } from 'react'
import type { Task } from '../../core/model/task'
import type { Persona } from '../../core/model/persona'
import type { QuestCandidate } from '../../core/model/questCandidate'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
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
import { createPersonaRepository } from '../../core/storage/personaRepository'
import { createRecurringRepository } from '../../core/storage/recurringRepository'
import { createQuestCandidateRepository } from '../../core/storage/questCandidateRepository'
import { PriorityTaskList } from './PriorityTaskList'
import { MissionCommitmentReview } from '../missions/MissionCommitmentReview'
import { CurrentMissionCard } from '../missions/CurrentMissionCard'
import { FocusScreen } from '../focus/FocusScreen'
import { taskCheckInRepository } from '../nudges/taskCheckIn'
import { reschedulePlan, type RescueDecision } from '../rescue/reschedulePlan'
import { appNow } from '../../core/time/appClock'
import { UpcomingPreview } from './UpcomingPreview'
import { RewardBurst } from '../pet/RewardBurst'
import { createPetRepository } from '../pet/petRepository'
import { calculateReward } from '../pet/rewardPolicy'
import type { PetGameState, RewardEvent, RewardGrant } from '../pet/model'
import { rewardOutbox } from './rewardOutbox'
import { TodayDashboard } from './TodayDashboard'
import { acceptCandidate as convertCandidateToTask } from '../inbox/candidatePolicy'

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
  ensurePersonas?(): Promise<Persona[]>
  ensureRecurringTemplates?(): Promise<RecurringTaskTemplate[]>
  ensureRecurringForDay?(day: string): Promise<RecurringTaskInstance[]>
  listPendingCandidates?(): Promise<QuestCandidate[]>
  completeRecurring?(instance: RecurringTaskInstance, completedAt: string): Promise<void>
  acceptCandidate?(candidate: QuestCandidate): Promise<void>
  dismissCandidate?(id: string): Promise<void>
}

const database = createDatabase()
const taskRepository = createTaskRepository(database)
const categoryRepository = createCategoryRepository(database)
const petRepository = createPetRepository(database)
const personaRepository = createPersonaRepository(database)
const recurringRepository = createRecurringRepository(database)
const candidateRepository = createQuestCandidateRepository(database)
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
  ensurePersonas: personaRepository.ensureDefaults.bind(personaRepository),
  ensureRecurringTemplates: recurringRepository.ensureDefaults.bind(recurringRepository),
  ensureRecurringForDay: async (day) => {
    await recurringRepository.ensureDefaults()
    return recurringRepository.ensureForDay(day)
  },
  listPendingCandidates: candidateRepository.listPending,
  completeRecurring: async (instance, completedAt) => {
    await recurringRepository.complete(instance.id, completedAt)
  },
  acceptCandidate: candidateRepository.accept,
  dismissCandidate: candidateRepository.dismiss,
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
  const [personas, setPersonas] = useState<Persona[]>([])
  const [selectedPersonaId, setSelectedPersonaId] = useState<'all' | string>('all')
  const [recurringTemplates, setRecurringTemplates] = useState<RecurringTaskTemplate[]>([])
  const [recurringInstances, setRecurringInstances] = useState<RecurringTaskInstance[]>([])
  const [pendingCandidates, setPendingCandidates] = useState<QuestCandidate[]>([])
  const [dashboardError, setDashboardError] = useState('')
  const [tasksLoading, setTasksLoading] = useState(Boolean(dependencies.listForDay || dependencies.listRequiredOpen))
  const [taskLoadError, setTaskLoadError] = useState('')
  const [categoryLoadError, setCategoryLoadError] = useState('')
  const completionInFlightRef = useRef(new Set<string>())
  const candidateAcceptanceInFlightRef = useRef(new Set<string>())
  const quickAddInputRef = useRef<HTMLInputElement>(null)
  const [completingTaskIds, setCompletingTaskIds] = useState<ReadonlySet<string>>(new Set())
  const [acceptingCandidateIds, setAcceptingCandidateIds] = useState<ReadonlySet<string>>(new Set())
  const nowTask = useMemo(() => recommendForEnergy(tasks, energy, appNow()), [tasks, energy])
  const currentMission = useMemo(() => selectCurrentMission(tasks, appNow()), [tasks])

  useEffect(() => {
    let active = true
    const hasTaskLoaders = Boolean(dependencies.listForDay || dependencies.listRequiredOpen)
    setTasksLoading(hasTaskLoaders)
    setTaskLoadError('')
    setCategoryLoadError('')
    setDashboardError('')
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
    if (dependencies.ensurePersonas) void dependencies.ensurePersonas()
      .then((saved) => { if (active) setPersonas(saved.filter((persona) => persona.status === 'active')) })
      .catch(() => { if (active) setDashboardError('페르소나를 불러오지 못했어요') })
    if (dependencies.ensureRecurringTemplates) {
      const templatesPromise = dependencies.ensureRecurringTemplates()
      void templatesPromise
        .then(async (templates) => {
          const instances = dependencies.ensureRecurringForDay
            ? await dependencies.ensureRecurringForDay(dayFor(appNow()))
            : []
          if (!active) return
          setRecurringTemplates(templates)
          setRecurringInstances(instances)
        })
        .catch(() => { if (active) setDashboardError('반복 업무를 불러오지 못했어요') })
    } else if (dependencies.ensureRecurringForDay) {
      void dependencies.ensureRecurringForDay(dayFor(appNow()))
        .then((instances) => { if (active) setRecurringInstances(instances) })
        .catch(() => { if (active) setDashboardError('반복 업무를 불러오지 못했어요') })
    }
    if (dependencies.listPendingCandidates) void dependencies.listPendingCandidates()
      .then((saved) => { if (active) setPendingCandidates(saved.filter((candidate) => candidate.status === 'pending_review')) })
      .catch(() => { if (active) setDashboardError('외부 할 일을 불러오지 못했어요') })
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

  useEffect(() => {
    if (selectedPersonaId !== 'all' && !personas.some((persona) => persona.id === selectedPersonaId && persona.status === 'active')) {
      setSelectedPersonaId('all')
    }
  }, [personas, selectedPersonaId])

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
      personaIds: draft.personaIds ?? [],
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

  const completeRecurring = async (instance: RecurringTaskInstance) => {
    if (!dependencies.completeRecurring || instance.status !== 'open') return
    const completedAt = appNow().toISOString()
    setDashboardError('')
    try {
      await dependencies.completeRecurring(instance, completedAt)
      setRecurringInstances((current) => current.map((item) => (
        item.id === instance.id ? { ...item, status: 'completed', completedAt } : item
      )))
    } catch {
      setDashboardError('반복 업무 완료를 저장하지 못했어요')
    }
  }

  const acceptQuestCandidate = async (candidate: QuestCandidate) => {
    if (!dependencies.acceptCandidate) return
    if (candidateAcceptanceInFlightRef.current.has(candidate.id)) return
    candidateAcceptanceInFlightRef.current.add(candidate.id)
    setAcceptingCandidateIds(new Set(candidateAcceptanceInFlightRef.current))
    setDashboardError('')
    try {
      const task = convertCandidateToTask(candidate, appNow())
      await saveTasks([task])
      await dependencies.acceptCandidate(candidate)
      setPendingCandidates((current) => current.filter((item) => item.id !== candidate.id))
    } catch {
      setDashboardError('후보를 반영하지 못했어요. 내용을 유지했으니 다시 시도해 주세요.')
    } finally {
      candidateAcceptanceInFlightRef.current.delete(candidate.id)
      setAcceptingCandidateIds(new Set(candidateAcceptanceInFlightRef.current))
    }
  }

  const dismissQuestCandidate = async (id: string) => {
    if (!dependencies.dismissCandidate) return
    setDashboardError('')
    try {
      await dependencies.dismissCandidate(id)
      setPendingCandidates((current) => current.filter((candidate) => candidate.id !== id))
    } catch {
      setDashboardError('후보를 닫지 못했어요. 다시 시도해 주세요.')
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
    <TodayDashboard
      date={appNow()}
      energy={energy}
      total={dashboardTasks.length}
      completed={completedCount}
      personas={personas}
      selectedPersonaId={selectedPersonaId}
      tasks={dashboardTasks}
      recurringTemplates={recurringTemplates}
      recurringInstances={recurringInstances}
      pendingCandidates={pendingCandidates}
      petState={petState}
      coachLine="지금 할 수 있는 가장 작은 행동부터 시작해 봐요."
      completingTaskIds={completingTaskIds}
      acceptingCandidateIds={acceptingCandidateIds}
      tasksLoading={tasksLoading}
      taskLoadError={taskLoadError}
      quickAddInputRef={quickAddInputRef}
      onEnergyChange={setEnergy}
      onSelectPersona={setSelectedPersonaId}
      onCompleteRecurring={(instance) => { void completeRecurring(instance) }}
      onStartQuest={startMission}
      onCompleteQuest={(task) => { void completeQuest(task) }}
      onAcceptCandidate={acceptQuestCandidate}
      onDismissCandidate={dismissQuestCandidate}
      onAddTask={addSingleTask}
      onOpenTools={() => {
        setCaptureExpanded(true)
        setPlanningExpanded(true)
      }}
    />
    {(taskLoadError || categoryLoadError || dashboardError) && <div className="today-load-error" role="alert">
      {taskLoadError && <span>{taskLoadError}</span>}
      {categoryLoadError && <span>{categoryLoadError}</span>}
      {dashboardError && <span>{dashboardError}</span>}
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
