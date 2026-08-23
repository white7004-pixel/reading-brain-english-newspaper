import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'

function calendarDate(day: string) {
  return new Date(`${day}T00:00:00.000Z`)
}

function formatDay(date: Date) {
  return date.toISOString().slice(0, 10)
}

function addDays(day: string, amount: number) {
  const date = calendarDate(day)
  date.setUTCDate(date.getUTCDate() + amount)
  return formatDay(date)
}

function isoWeekday(day: string) {
  return calendarDate(day).getUTCDay() || 7
}

function isoWeekMonday(day: string) {
  return addDays(day, 1 - isoWeekday(day))
}

function monthKey(day: string) {
  return day.slice(0, 7)
}

function isBusinessDay(day: string) {
  return isoWeekday(day) <= 5
}

function firstBusinessDay(month: string) {
  let day = `${month}-01`
  while (!isBusinessDay(day)) day = addDays(day, 1)
  return day
}

function midMonthBusinessDay(month: string) {
  let day = `${month}-15`
  while (!isBusinessDay(day)) day = addDays(day, 1)
  return day
}

function lastBusinessDay(month: string) {
  const [year, value] = month.split('-').map(Number)
  const day = formatDay(new Date(Date.UTC(year, value, 0)))
  let businessDay = day
  while (!isBusinessDay(businessDay)) businessDay = addDays(businessDay, -1)
  return businessDay
}

function duePeriod(template: RecurringTaskTemplate, day: string) {
  if (!template.active) return null
  if (template.cadence.kind === 'daily') return day
  if (template.cadence.kind === 'weekly') {
    return template.cadence.weekdays.includes(isoWeekday(day)) ? isoWeekMonday(day) : null
  }

  const month = monthKey(day)
  const scheduledDay = template.cadence.timing === 'first_business_day'
    ? firstBusinessDay(month)
    : template.cadence.timing === 'mid_month'
      ? midMonthBusinessDay(month)
      : lastBusinessDay(month)
  return scheduledDay === day ? month : null
}

export function isCarryForwardInstance(instance: RecurringTaskInstance) {
  return instance.id.includes('@carry@')
}

export function generateInstances(
  templates: RecurringTaskTemplate[],
  existing: RecurringTaskInstance[],
  day: string,
): RecurringTaskInstance[] {
  const records = new Map(existing.map((instance) => [instance.id, instance]))

  return templates.flatMap((template) => {
    const periodKey = duePeriod(template, day)
    if (!periodKey) return []
    const id = `${template.id}@${periodKey}`
    return [records.get(id) ?? {
      id,
      templateId: template.id,
      periodKey,
      scheduledDay: day,
      status: 'open' as const,
    }]
  })
}

export function closePastInstances(instances: RecurringTaskInstance[], today: string): RecurringTaskInstance[] {
  return instances.map((instance) => (
    instance.status === 'open' && instance.scheduledDay < today
      ? { ...instance, status: 'missed' as const }
      : instance
  ))
}

export function materializeCarryForward(
  instance: RecurringTaskInstance,
  template: RecurringTaskTemplate,
  today: string,
): RecurringTaskInstance | null {
  if (!template.carryForward || isCarryForwardInstance(instance)) return null
  return {
    id: `${instance.id}@carry@${today}`,
    templateId: template.id,
    periodKey: instance.periodKey,
    scheduledDay: today,
    status: 'open',
  }
}
