import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'

const STATUS_LABELS: Record<Exclude<RecurringTaskInstance['status'], 'open'>, string> = {
  completed: '완료',
  missed: '놓침',
  canceled: '취소',
}

export function RecurringChecklist({ day, selectedPersonaId, templates, instances, onComplete }: {
  day: string
  selectedPersonaId: 'all' | string
  templates: RecurringTaskTemplate[]
  instances: RecurringTaskInstance[]
  onComplete: (instance: RecurringTaskInstance) => void
}) {
  const templateById = new Map(templates.map((template) => [template.id, template]))
  const visible = instances.flatMap((instance) => {
    const template = templateById.get(instance.templateId)
    if (!template || !template.active) return []
    if (selectedPersonaId !== 'all' && !template.personaIds.includes(selectedPersonaId)) return []
    return [{ instance, template }]
  })

  if (visible.length === 0) return null

  return <section className="recurring-checklist" aria-label="매일 반복 업무">
    <div className="today-section-heading">
      <div><span>습관처럼 가볍게</span><h2>매일 반복 업무</h2></div>
      <strong>{visible.filter(({ instance }) => instance.status === 'completed').length}/{visible.length}</strong>
    </div>
    <ul>{visible.map(({ instance, template }) => {
      const completed = instance.status === 'completed'
      const actionable = instance.status === 'open' && instance.scheduledDay <= day
      const status = instance.status === 'open'
        ? instance.scheduledDay > day ? '예정' : '진행 중'
        : STATUS_LABELS[instance.status]
      return <li key={instance.id} aria-label={template.title} className={'recurring-checklist__item is-' + instance.status}>
        <input
          type="checkbox"
          aria-label={template.title + ' 반복 업무 완료'}
          checked={completed}
          disabled={!actionable}
          onChange={() => onComplete(instance)}
        />
        <div>
          <strong>{template.title}</strong>
          <small>{template.estimateMinutes}분{template.firstAction ? ' · 첫 행동: ' + template.firstAction : ''}</small>
        </div>
        <div className="recurring-checklist__state">
          <span>{status}</span>
          <strong>{completed ? template.targetCount : 0}/{template.targetCount}</strong>
        </div>
      </li>
    })}</ul>
  </section>
}
