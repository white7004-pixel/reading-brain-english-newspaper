import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'

export interface MonthlyDaySummary { day: string; completed: number; open: number; missed: number; total: number }
export interface MonthlyMetrics {
  parentCounseling: number; studentCounseling: number; teacherMeetings: number
  newStudents: number; withdrawnStudents: number; marketingPosts: number
  curriculumChecks: number; reading: number; exercise: number; carriedForward: number
}
export interface MonthlySummary { month: string; days: MonthlyDaySummary[]; metrics: MonthlyMetrics }

function daysInMonth(month: string) {
  const [year, monthNumber] = month.split('-').map(Number)
  return new Date(Date.UTC(year, monthNumber, 0)).getUTCDate()
}

function belongsToPersona(personaIds: string[] | undefined, selectedPersonaId: string) {
  return selectedPersonaId === 'all' || (personaIds ?? []).includes(selectedPersonaId)
}

export function buildMonthlySummary(tasks: Task[], instances: RecurringTaskInstance[], templates: RecurringTaskTemplate[], month: string, selectedPersonaId = 'all'): MonthlySummary {
  const templateById = new Map(templates.map((template) => [template.id, template]))
  const monthTasks = tasks.filter((task) => task.day.startsWith(`${month}-`) && belongsToPersona(task.personaIds, selectedPersonaId))
  const monthInstances = instances.filter((instance) => instance.scheduledDay.startsWith(`${month}-`) && belongsToPersona(templateById.get(instance.templateId)?.personaIds, selectedPersonaId))
  const completedTasks = monthTasks.filter((task) => task.status === 'completed')
  const completedInstances = monthInstances.filter((instance) => instance.status === 'completed')
  const countInstance = (templateId: string) => completedInstances.filter((instance) => instance.templateId === templateId).length
  const countTask = (categoryId: string, titlePattern?: RegExp) => completedTasks.filter((task) => task.categoryId === categoryId || Boolean(titlePattern?.test(task.title))).length
  const days = Array.from({ length: daysInMonth(month) }, (_, index) => {
    const day = `${month}-${String(index + 1).padStart(2, '0')}`
    const states = [
      ...monthTasks.filter((task) => task.day === day).map((task) => task.status),
      ...monthInstances.filter((instance) => instance.scheduledDay === day).map((instance) => instance.status),
    ]
    return {
      day,
      completed: states.filter((status) => status === 'completed').length,
      open: states.filter((status) => status === 'open' || status === 'active' || status === 'deferred').length,
      missed: states.filter((status) => status === 'missed').length,
      total: states.filter((status) => status !== 'canceled').length,
    }
  })
  return {
    month, days,
    metrics: {
      parentCounseling: countInstance('parent-counseling'), studentCounseling: countInstance('student-counseling'),
      teacherMeetings: countInstance('teacher-meetings'), newStudents: countTask('new_student', /신입|등록/),
      withdrawnStudents: countTask('withdrawn_student', /퇴원|퇴회/), marketingPosts: countTask('marketing_post', /블로그|인스타|게시|발행/),
      curriculumChecks: countInstance('curriculum-review'), reading: countTask('reading', /독서|읽기/),
      exercise: countTask('exercise', /운동/), carriedForward: monthInstances.filter((instance) => instance.id.includes('@carry@')).length,
    },
  }
}
