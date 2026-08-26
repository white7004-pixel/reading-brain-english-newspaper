import { useEffect, useState, type ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { settingsRepository } from '../features/settings/settingsRepository'
import { AppBackground } from '../features/appearance/AppBackground'
import { createAppearanceRepository, defaultAppearanceSettings } from '../features/appearance/appearanceRepository'
import { createDatabase } from '../core/storage/database'
import type { AppearanceSettings } from '../core/model/appearance'
import type { Task } from '../core/model/task'
import type { AvailabilitySnapshot } from '../core/model/calendarAvailability'
import { createTaskRepository } from '../core/storage/taskRepository'
import { applyCheckInResponse, buildCoachDecision, buildNudgeLine, isCoachPromptDue, isQuietTime, remindFiveAt, selectNudgeTask } from '../features/nudges/nudgePolicy'
import { PersistentNowTask } from '../features/nudges/PersistentNowTask'
import { CoachRuntimeProvider } from '../features/nudges/CoachRuntime'
import { taskCheckInRepository } from '../features/nudges/taskCheckIn'
import { nativeWidgetBridge } from '../features/widgets/nativeWidgetBridge'
import { mergeWidgetEvents } from '../features/widgets/mergeWidgetEvents'
import { buildWidgetSnapshot } from '../features/widgets/widgetSnapshot'
import { applyMasteryEvent, taskMasteryRepository, type CoachAction, type TaskMasteryState } from '../features/nudges/taskMastery'
import { dayInSeoul, missionModeForMission } from '../features/missions/extendedDay'
import { selectCurrentMission } from '../features/today/selectNowTask'
import { appNow } from '../core/time/appClock'
import { createAvailabilityRepository } from '../features/calendar/availabilityRepository'
import { isBusyAt } from '../features/calendar/availabilityPlanner'

const appearanceRepository = createAppearanceRepository(createDatabase())
const shellDatabase = createDatabase()
const shellTaskRepository = createTaskRepository(shellDatabase)
const shellAvailabilityRepository = createAvailabilityRepository(shellDatabase)

export function AppShell({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(() => settingsRepository.load())
  const [appearance, setAppearance] = useState<AppearanceSettings>(defaultAppearanceSettings)
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null)
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [latestCheckIn, setLatestCheckIn] = useState(() => taskCheckInRepository.load())
  const [clockTick, setClockTick] = useState(() => appNow().getTime())
  const [mastery, setMastery] = useState<TaskMasteryState | null>(null)
  const [availability, setAvailability] = useState<{ checkedAt?: number; snapshot?: AvailabilitySnapshot }>({})
  useEffect(() => {
    let active = true
    const refreshTasks = async () => {
      const snapshotNow = appNow()
      const [forToday, required] = await Promise.all([
        shellTaskRepository.listForDay(dayInSeoul(snapshotNow)),
        shellTaskRepository.listRequiredOpen(),
      ])
      let saved = [...forToday, ...required.filter((task) => !forToday.some(({ id }) => id === task.id))]
      const nativeEvents = await nativeWidgetBridge.getCompletionEvents()
      if (nativeEvents.available && nativeEvents.events.length > 0) {
        const merged = mergeWidgetEvents(saved, nativeEvents.events)
        await shellTaskRepository.putMany(merged)
        await nativeWidgetBridge.clearCompletionEvents()
        saved = merged
      }
      if (active) {
        setTodayTasks(saved)
        await nativeWidgetBridge.update(buildWidgetSnapshot(saved, '몽글이와 한 가지씩 해봐요', snapshotNow))
      }
    }
    const refreshSettings = () => setSettings(settingsRepository.load())
    const refreshCheckIn = () => setLatestCheckIn(taskCheckInRepository.load())
    void refreshTasks()
    window.addEventListener('monggle:tasks-changed', refreshTasks)
    window.addEventListener('monggle:settings-changed', refreshSettings)
    window.addEventListener('monggle:task-check-in-changed', refreshCheckIn)
    return () => {
      active = false
      window.removeEventListener('monggle:tasks-changed', refreshTasks)
      window.removeEventListener('monggle:settings-changed', refreshSettings)
      window.removeEventListener('monggle:task-check-in-changed', refreshCheckIn)
    }
  }, [])
  useEffect(() => {
    let active = true
    const refreshAvailability = async () => {
      try {
        const connection = await shellAvailabilityRepository.getConnection()
        const snapshot = connection
          ? await shellAvailabilityRepository.latest(connection.accountId)
          : undefined
        if (active) setAvailability({ checkedAt: clockTick, snapshot })
      } catch {
        if (active) setAvailability({ checkedAt: clockTick })
      }
    }
    void refreshAvailability()
    return () => {
      active = false
    }
  }, [clockTick])
  useEffect(() => {
    const timer = window.setInterval(() => setClockTick(appNow().getTime()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  const now = new Date(clockTick)
  const currentMission = selectCurrentMission(todayTasks, now)
  const activeMissionMode = missionModeForMission(currentMission, now)
  const quiet = isQuietTime(now, settings.quietHoursStart, settings.quietHoursEnd)
  const calendarBusy = isBusyAt(availability.snapshot, now)
  const availabilityReady = availability.checkedAt === clockTick
  const interruptionsSuppressed = quiet || !availabilityReady || calendarBusy
  const nudgeTask = settings.nudgeIntervalMinutes === 0
    ? null
    : selectNudgeTask(todayTasks, now, latestCheckIn)
  useEffect(() => {
    if (!nudgeTask || settings.nudgeIntervalMinutes === 0) {
      setMastery(null)
      return
    }
    const current = taskMasteryRepository.load(nudgeTask.id)
    if (interruptionsSuppressed) {
      setMastery(current)
      return
    }
    if (!isCoachPromptDue(current.lastPromptAt, now, settings.determinedMonggle)) {
      setMastery(current)
      return
    }
    const promptAt = now.toISOString()
    const next = applyMasteryEvent(current, { type: 'prompt', at: promptAt })
    taskMasteryRepository.save(next)
    setMastery(next)
  }, [nudgeTask?.id, clockTick, interruptionsSuppressed, settings.determinedMonggle, settings.nudgeIntervalMinutes])
  const coachDecision = nudgeTask ? buildCoachDecision({
    task: nudgeTask,
    unansweredPrompts: mastery?.taskId === nudgeTask.id ? mastery.misses : 0,
    now,
    quiet,
    calendarBusy: !availabilityReady || calendarBusy,
    focusActive: nudgeTask.status === 'active',
    determinedMode: settings.determinedMonggle,
    lastPromptAt: mastery?.taskId === nudgeTask.id ? mastery.lastPromptAt : undefined,
  }) : null
  const respondToTask = async (action: CoachAction, delayMinutes?: number) => {
    if (!nudgeTask) return
    const respondedAt = appNow()
    const response = {
      taskId: nudgeTask.id, action, respondedAt: respondedAt.toISOString(),
      remindAt: action === 'remind_5'
        ? remindFiveAt(respondedAt).toISOString()
        : delayMinutes ? new Date(respondedAt.getTime() + delayMinutes * 60_000).toISOString() : undefined,
    }
    const result = applyCheckInResponse(todayTasks, response, respondedAt)
    await shellTaskRepository.putMany(result.tasks)
    await nativeWidgetBridge.update(buildWidgetSnapshot(result.tasks, buildNudgeLine(result.tasks.find((task) => task.id === result.nextTaskId) ?? nudgeTask), respondedAt))
    taskCheckInRepository.save(response)
    const nextMastery = applyMasteryEvent(taskMasteryRepository.load(nudgeTask.id), { type: action, at: respondedAt.toISOString() })
    taskMasteryRepository.save(nextMastery)
    setMastery(nextMastery)
    setTodayTasks(result.tasks)
    setLatestCheckIn(response)
    window.dispatchEvent(new Event('monggle:tasks-changed'))
  }
  useEffect(() => {
    let disposed = false
    let activeUrls: string[] = []
    const refreshAppearance = async () => {
      const loaded = await appearanceRepository.loadSettings()
      let nextBackgroundUrl: string | null = null
      if (loaded.background.kind !== 'preset') {
        const asset = loaded.background.kind === 'photo'
          ? await appearanceRepository.getPhoto(loaded.background.assetId)
          : await appearanceRepository.getRender(loaded.background.assetId)
        if (asset) nextBackgroundUrl = URL.createObjectURL(asset.blob)
      }
      if (disposed) {
        if (nextBackgroundUrl) URL.revokeObjectURL(nextBackgroundUrl)
        return
      }
      activeUrls.forEach((url) => URL.revokeObjectURL(url))
      activeUrls = [nextBackgroundUrl].filter((url): url is string => Boolean(url))
      setAppearance(loaded.background.kind !== 'preset' && !nextBackgroundUrl ? { ...loaded, background: defaultAppearanceSettings.background } : loaded)
      setBackgroundUrl(nextBackgroundUrl)
    }
    void refreshAppearance()
    window.addEventListener('monggle:appearance-changed', refreshAppearance)
    return () => {
      disposed = true
      window.removeEventListener('monggle:appearance-changed', refreshAppearance)
      activeUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])
  return (
    <div className="app-shell studio-surface">
      <AppBackground settings={appearance} assetUrl={backgroundUrl} />
      <header className="app-header">
        <div><h1>몽글</h1><span>오늘의 한 가지에 집중해요</span></div>
        <time dateTime={dayInSeoul(now)}>{new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', weekday: 'short' }).format(now)}</time>
      </header>
      {activeMissionMode === 'extended' && currentMission && <section className="extended-mission-entry" aria-label="오늘 연장 완료 모드" data-escalation-level="app-entry">
        <span>오늘 연장 완료 모드</span>
        <strong>{currentMission.title}</strong>
        <p>{currentMission.firstAction ?? '첫 행동부터 다시 시작해요.'}</p>
      </section>}
      <CoachRuntimeProvider value={{
        decision: coachDecision,
        suppressed: interruptionsSuppressed,
        onRespond: (action, delay) => void respondToTask(action, delay),
        onReschedule: () => void respondToTask('reschedule'),
        onCancel: () => void respondToTask('cancel'),
      }}>
        <main>{children}</main>
      </CoachRuntimeProvider>
      {nudgeTask && coachDecision && <PersistentNowTask
        task={nudgeTask}
        decision={coachDecision}
        suppressed={interruptionsSuppressed}
        onRespond={(action, delay) => void respondToTask(action, delay)}
        onReschedule={() => void respondToTask('reschedule')}
        onCancel={() => void respondToTask('cancel')}
      />}
      <BottomNav />
    </div>
  )
}
