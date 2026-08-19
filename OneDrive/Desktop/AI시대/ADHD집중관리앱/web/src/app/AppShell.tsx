import { useEffect, useState, type ReactNode } from 'react'
import type { ProfileType } from '../core/model/settings'
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
import { applyCheckInResponse, buildNudgeLine, isQuietTime, selectNudgeTask } from '../features/nudges/nudgePolicy'
import { PersistentNowTask } from '../features/nudges/PersistentNowTask'
import { taskCheckInRepository, type TaskCheckInAction } from '../features/nudges/taskCheckIn'
import { nativeWidgetBridge } from '../features/widgets/nativeWidgetBridge'
import { mergeWidgetEvents } from '../features/widgets/mergeWidgetEvents'
import { buildWidgetSnapshot } from '../features/widgets/widgetSnapshot'

const appearanceRepository = createAppearanceRepository(createDatabase())
const shellTaskRepository = createTaskRepository(createDatabase())

function todayInSeoul(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

export function AppShell({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>('high_school')
  const [settings, setSettings] = useState(() => settingsRepository.load())
  const [companionEvent, setCompanionEvent] = useState<CompanionEvent | null>(null)
  const [appearance, setAppearance] = useState<AppearanceSettings>(defaultAppearanceSettings)
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null)
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [latestCheckIn, setLatestCheckIn] = useState(() => taskCheckInRepository.load())
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
      let saved = await shellTaskRepository.listForDay(todayInSeoul())
      const nativeEvents = await nativeWidgetBridge.getCompletionEvents()
      if (nativeEvents.available && nativeEvents.events.length > 0) {
        const merged = mergeWidgetEvents(saved, nativeEvents.events)
        await shellTaskRepository.putMany(merged)
        await nativeWidgetBridge.clearCompletionEvents()
        saved = merged
      }
      if (active) {
        setTodayTasks(saved)
        await nativeWidgetBridge.update(buildWidgetSnapshot(saved, '몽글이와 한 가지씩 해봐요'))
      }
    }
    const refreshSettings = () => setSettings(settingsRepository.load())
    void refreshTasks()
    window.addEventListener('monggle:tasks-changed', refreshTasks)
    window.addEventListener('monggle:settings-changed', refreshSettings)
    return () => {
      active = false
      window.removeEventListener('monggle:tasks-changed', refreshTasks)
      window.removeEventListener('monggle:settings-changed', refreshSettings)
    }
  }, [])
  const now = new Date()
  const nudgeTask = settings.nudgeIntervalMinutes === 0 || isQuietTime(now, settings.quietHoursStart, settings.quietHoursEnd)
    ? null
    : selectNudgeTask(todayTasks, now, latestCheckIn)
  const respondToTask = async (action: TaskCheckInAction, delayMinutes?: number) => {
    if (!nudgeTask) return
    const respondedAt = new Date()
    const response = {
      taskId: nudgeTask.id, action, respondedAt: respondedAt.toISOString(),
      remindAt: action === 'later' && delayMinutes ? new Date(respondedAt.getTime() + delayMinutes * 60_000).toISOString() : undefined,
    }
    const result = applyCheckInResponse(todayTasks, response, respondedAt)
    await shellTaskRepository.putMany(result.tasks)
    await nativeWidgetBridge.update(buildWidgetSnapshot(result.tasks, buildNudgeLine(result.tasks.find((task) => task.id === result.nextTaskId) ?? nudgeTask)))
    taskCheckInRepository.save(response)
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
        <h1>몽글</h1>
        <label className="profile-select">
          사용자 유형
          <select value={profile} onChange={(event) => setProfile(event.target.value as ProfileType)}>
            <option value="middle_school">중학생</option>
            <option value="high_school">고등학생</option>
            <option value="university">대학생</option>
            <option value="worker">성인·직장인</option>
          </select>
        </label>
      </header>
      <main>{children}</main>
      {nudgeTask && <PersistentNowTask task={nudgeTask} line={buildNudgeLine(nudgeTask)} onRespond={(action, delay) => void respondToTask(action, delay)} />}
      <MonggleCompanion reducedMotion={settings.reducedMotion} mascotVisible={settings.mascotVisible} event={companionEvent} sourceUrl={profileUrl} />
      <BottomNav />
    </div>
  )
}
