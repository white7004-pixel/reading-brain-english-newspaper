import type { Ref } from 'react'
import type { Persona } from '../../core/model/persona'
import type { QuestCandidate } from '../../core/model/questCandidate'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'
import { PersonaTabs } from '../personas/PersonaTabs'
import { CandidateInbox } from '../inbox/CandidateInbox'
import type { PetGameState } from '../pet/model'
import { calculateReward } from '../pet/rewardPolicy'
import { RecurringChecklist } from '../recurring/RecurringChecklist'
import { FeaturedQuest } from './FeaturedQuest'
import { InlineQuickAdd } from './InlineQuickAdd'
import { MonggleCoachPanel } from './MonggleCoachPanel'
import { QuestList } from './QuestList'
import { recommendForEnergy, type Energy } from './selectNowTask'
import { TodayHeader } from './TodayHeader'
import type { CoachAction, CoachDecision } from '../nudges/taskMastery'

export interface TodayDashboardProps {
  date: Date
  energy: Energy
  total: number
  completed: number
  personas: Persona[]
  selectedPersonaId: 'all' | string
  tasks: Task[]
  recurringTemplates: RecurringTaskTemplate[]
  recurringInstances: RecurringTaskInstance[]
  pendingCandidates: QuestCandidate[]
  petState: PetGameState | null
  coachLine: string
  coachDecision?: CoachDecision | null
  coachSuppressed?: boolean
  completingTaskIds?: ReadonlySet<string>
  acceptingCandidateIds?: ReadonlySet<string>
  tasksLoading?: boolean
  taskLoadError?: string
  quickAddInputRef?: Ref<HTMLInputElement>
  onEnergyChange: (energy: Energy) => void
  onSelectPersona: (id: 'all' | string) => void
  onCompleteRecurring: (instance: RecurringTaskInstance) => void
  onStartQuest: (task: Task) => void
  onCompleteQuest: (task: Task) => void
  onAcceptCandidate: (candidate: QuestCandidate) => void | Promise<void>
  onDismissCandidate: (id: string) => void | Promise<void>
  onAddTask: (title: string) => Promise<void>
  onOpenTools: () => void
  onCoachRespond?: (action: CoachAction, delayMinutes?: number) => void
  onCoachReschedule?: () => void
  onCoachCancel?: () => void
}

export function TodayDashboard({
  date, energy, total, completed, personas, selectedPersonaId, tasks, recurringTemplates, recurringInstances,
  pendingCandidates, petState, coachLine, coachDecision, coachSuppressed = false, completingTaskIds, acceptingCandidateIds, tasksLoading = false, taskLoadError = '', quickAddInputRef, onEnergyChange, onSelectPersona,
  onCompleteRecurring, onStartQuest, onCompleteQuest, onAcceptCandidate, onDismissCandidate, onAddTask, onOpenTools,
  onCoachRespond, onCoachReschedule, onCoachCancel,
}: TodayDashboardProps) {
  const visibleTasks = selectedPersonaId === 'all'
    ? tasks
    : tasks.filter((task) => task.personaIds?.includes(selectedPersonaId))
  const featured = recommendForEnergy(visibleTasks, energy, date)
  const remaining = visibleTasks.filter((task) => task.id !== featured?.id)
  const personaNames = new Map(personas.map((persona) => [persona.id, persona.name]))
  const pending = pendingCandidates.filter((candidate) => candidate.status === 'pending_review')

  return <div className="today-dashboard">
    <section aria-label="오늘 요약">
      <TodayHeader date={date} energy={energy} total={total} completed={completed} onEnergyChange={onEnergyChange} onAdd={onOpenTools} />
    </section>
    <section className="today-persona-picker" aria-label="페르소나 선택">
      <PersonaTabs personas={personas} selectedId={selectedPersonaId} onChange={onSelectPersona} onAdd={onOpenTools} />
    </section>
    {petState && <MonggleCoachPanel
      state={petState}
      coachLine={coachLine}
      decision={coachDecision ?? undefined}
      suppressed={coachSuppressed}
      onRespond={onCoachRespond}
      onReschedule={onCoachReschedule}
      onCancel={onCoachCancel}
    />}
    {featured && <FeaturedQuest
      task={featured}
      reward={calculateReward({ taskId: featured.id, focusMinutes: 0 }, () => 1)}
      personaNames={(featured.personaIds ?? []).flatMap((id) => personaNames.get(id) ?? [])}
      completing={completingTaskIds?.has(featured.id)}
      onStart={onStartQuest}
      onComplete={onCompleteQuest}
    />}
    <RecurringChecklist
      day={new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(date)}
      selectedPersonaId={selectedPersonaId}
      templates={recurringTemplates}
      instances={recurringInstances}
      onComplete={onCompleteRecurring}
    />
    <section className="remaining-quests" aria-label="남은 퀘스트">
      <InlineQuickAdd inputRef={quickAddInputRef} onAdd={onAddTask} />
      {tasksLoading || taskLoadError ? <section className="quest-list" aria-label="오늘 할 일">
        <div className="quest-list__heading"><h2>오늘의 퀘스트</h2></div>
        <div className="quest-list__empty">
          {tasksLoading
            ? <strong role="status" aria-label="오늘 퀘스트 불러오는 중">오늘 퀘스트를 불러오는 중이에요…</strong>
            : <strong>퀘스트를 표시할 수 없어요</strong>}
        </div>
      </section> : <QuestList tasks={remaining} completingTaskIds={completingTaskIds} onStart={onStartQuest} onComplete={onCompleteQuest} />}
    </section>
    {pending.length > 0 && <section className="external-candidates" aria-label="외부에서 가져온 할 일">
      <CandidateInbox candidates={pending} personas={personas} acceptingCandidateIds={acceptingCandidateIds} onAccept={onAcceptCandidate} onDismiss={onDismissCandidate} />
    </section>}
  </div>
}
