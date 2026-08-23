import { useEffect, useState, type ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { MonggleCompanion } from '../features/companion/MonggleCompanion'
import { settingsRepository } from '../features/settings/settingsRepository'
import { subscribeCompanionEvents, type CompanionEvent } from '../features/companion/companionEvents'
import { AppBackground } from '../features/appearance/AppBackground'
import { createAppearanceRepository, defaultAppearanceSettings } from '../features/appearance/appearanceRepository'
import { createDatabase } from '../core/storage/database'
import type { AppearanceSettings } from '../core/model/appearance'
import type { Task } from '../core/model/task'
import { createTaskRepository } from '../core/storage/taskRepository'
import { applyCheckInResponse, buildCoachDecision, buildNudgeLine, isQuietTime, remindFiveAt, selectNudgeTask } from '../features/nudges/nudgePolicy'
import { PersistentNowTask } from '../features/nudges/PersistentNowTask'
import { taskCheckInRepository } from '../features/nudges/taskCheckIn'
import { nativeWidgetBridge } from '../features/widgets/nativeWidgetBridge'
import { mergeWidgetEvents } from '../features/widgets/mergeWidgetEvents'
import { buildWidgetSnapshot } from '../features/widgets/widgetSnapshot'
import { applyMasteryEvent, masteryStage, taskMasteryRepository, type CoachAction, type CoachStage, type TaskMasteryState } from '../features/nudges/taskMastery'
import { dayInSeoul, missionModeForMission } from '../features/missions/extendedDay'
import { selectCurrentMission } from '../features/today/selectNowTask'
import { appNow } from '../core/time/appClock'
import { useLocation } from 'react-router-dom'

const appearanceRepository = createAppearanceRepository(createDatabase())
const shellTaskRepository = createTaskRepository(createDatabase())

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [settings, setSettings] = useState(() => settingsRepository.load())
  const [companionEvent, setCompanionEvent] = useState<CompanionEvent | null>(null)
  const [appearance, setAppearance] = useState<AppearanceSettings>(defaultAppearanceSettings)
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null)
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [latestCheckIn, setLatestCheckIn] = useState(() => taskCheckInRepository.load())
  const [clockTick, setClockTick] = useState(() => appNow().getTime())
  const [mastery, setMastery] = useState<TaskMasteryState | null>(null)
  useEffect(() => {
    let expiry: number | undefined
    const unsubscribe = subscribeCompanionEvents((event) => {
      window.clearTimeout(expiry)
      setCompanionEvent(event)
      expiry = window.setTimeout(() => setCompanionEvent(null), 1_800)
    })
    return () => { unsubscribe(); window.clearTimeout(expiry) }
  }, [])
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
    const timer = window.setInterval(() => setClockTick(appNow().getTime()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  const now = new Date(clockTick)
  const currentMission = selectCurrentMission(todayTasks, now)
  const activeMissionMode = missionModeForMission(currentMission, now)
  const quiet = isQuietTime(now, settings.quietHoursStart, settings.quietHoursEnd)
  const coachIntervalMinutes = settings.determinedMonggle ? 30 : 60
  const nudgeTask = settings.nudgeIntervalMinutes === 0
    ? null
    : selectNudgeTask(todayTasks, now, latestCheckIn)
  const nudgeBucket = settings.nudgeIntervalMinutes === 0 ? 0 : Math.floor(clockTick / (coachIntervalMinutes * 60_000))
  useEffect(() => {
    if (!nudgeTask || settings.nudgeIntervalMinutes === 0) {
      setMastery(null)
      return
    }
    const current = taskMasteryRepository.load(nudgeTask.id)
    if (quiet) {
      setMastery(current)
      return
    }
    const promptAt = new Date(nudgeBucket * coachIntervalMinutes * 60_000).toISOString()
    if (current.lastPromptAt === promptAt) {
      setMastery(current)
      return
    }
    const next = applyMasteryEvent(current, { type: 'prompt', at: promptAt })
    taskMasteryRepository.save(next)
    setMastery(next)
  }, [nudgeTask?.id, nudgeBucket, quiet, coachIntervalMinutes, settings.nudgeIntervalMinutes])
  const activeStage: CoachStage = mastery && mastery.taskId === nudgeTask?.id ? masteryStage(mastery) : 'gentle'
  const coachDecision = nudgeTask ? buildCoachDecision({
    task: nudgeTask,
    unansweredPrompts: mastery?.taskId === nudgeTask.id ? mastery.misses : 0,
    now,
    quiet,
    calendarBusy: false,
    focusActive: nudgeTask.status === 'active',
    determinedMode: settings.determinedMonggle,
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
      let nextProfileUrl: string | null = null
      if (loaded.background.kind !== 'preset') {
        const asset = loaded.background.kind === 'photo'
          ? await appearanceRepository.getPhoto(loaded.background.assetId)
          : await appearanceRepository.getRender(loaded.background.assetId)
        if (asset) nextBackgroundUrl = URL.createObjectURL(asset.blob)
      }
      if (loaded.profile.kind !== 'default_monggle') {
        const asset = loaded.profile.kind === 'photo'
          ? await appearanceRepository.getPhoto(loaded.profile.assetId)
          : await appearanceRepository.getRender(loaded.profile.assetId)
        if (asset) nextProfileUrl = URL.createObjectURL(asset.blob)
      }
      if (disposed) {
        ;[nextBackgroundUrl, nextProfileUrl].forEach((url) => { if (url) URL.revokeObjectURL(url) })
        return
      }
      activeUrls.forEach((url) => URL.revokeObjectURL(url))
      activeUrls = [nextBackgroundUrl, nextProfileUrl].filter((url): url is string => Boolean(url))
      setAppearance(loaded.background.kind !== 'preset' && !nextBackgroundUrl ? { ...loaded, background: defaultAppearanceSettings.background } : loaded)
      setBackgroundUrl(nextBackgroundUrl)
      setProfileUrl(nextProfileUrl)
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
      <main>{children}</main>
      {nudgeTask && coachDecision && <PersistentNowTask
        task={nudgeTask}
        decision={coachDecision}
        suppressed={quiet}
        onRespond={(action, delay) => void respondToTask(action, delay)}
        onReschedule={() => void respondToTask('reschedule')}
        onCancel={() => void respondToTask('cancel')}
      />}
      {location.pathname === '/' && <MonggleCompanion reducedMotion={settings.reducedMotion} mascotVisible={settings.mascotVisible} event={companionEvent} sourceUrl={profileUrl} intensity={activeStage} />}
      <BottomNav />
    </div>
  )
}
