import { describe, expect, it } from 'vitest'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'
import { buildMonthlySummary } from './monthlySummary'

const template = (id: string, category: RecurringTaskTemplate['category']): RecurringTaskTemplate => ({
  id, title: id, personaIds: ['director'], category, cadence: { kind: 'daily' },
  targetCount: 1, estimateMinutes: 10, carryForward: false, active: true,
})

const instance = (templateId: string, day: string, status: RecurringTaskInstance['status'], suffix = ''): RecurringTaskInstance => ({
  id: `${templateId}@${day}${suffix}`, templateId, periodKey: day, scheduledDay: day, status,
})

const task = (id: string, day: string, categoryId: string, personaIds = ['director']): Task => ({
  id, title: id, day, status: 'completed', priority: 2, estimateMinutes: 10,
  category: 'work', categoryId, personaIds, source: 'manual',
  createdAt: `${day}T00:00:00.000Z`, updatedAt: `${day}T01:00:00.000Z`, completedAt: `${day}T01:00:00.000Z`,
})

describe('monthly academy summary', () => {
  it('counts exact operating metrics and carry-forward instances', () => {
    const templates = [
      template('parent-counseling', 'counseling'), template('student-counseling', 'counseling'),
      template('teacher-meetings', 'curriculum'), template('curriculum-review', 'curriculum'),
    ]
    const instances = [
      ...[1, 2, 3].map((day) => instance('parent-counseling', `2026-08-0${day}`, 'completed')),
      ...[4, 5].map((day) => instance('student-counseling', `2026-08-0${day}`, 'completed')),
      ...[6, 7].map((day) => instance('teacher-meetings', `2026-08-0${day}`, 'completed')),
      ...[8, 9].map((day) => instance('curriculum-review', `2026-08-0${day}`, 'completed')),
      instance('teacher-meetings', '2026-08-10', 'open', '@carry@2026-08-10'),
    ]
    const tasks = [
      task('new', '2026-08-11', 'new_student'),
      ...[1, 2, 3, 4].map((day) => task(`post-${day}`, `2026-08-${10 + day}`, 'marketing_post', ['marketing'])),
      ...[1, 2, 3, 4, 5].map((day) => task(`read-${day}`, `2026-08-${15 + day}`, 'reading', ['personal'])),
      ...[1, 2, 3].map((day) => task(`exercise-${day}`, `2026-08-${20 + day}`, 'exercise', ['personal'])),
    ]

    expect(buildMonthlySummary(tasks, instances, templates, '2026-08').metrics).toEqual({
      parentCounseling: 3, studentCounseling: 2, teacherMeetings: 2,
      newStudents: 1, withdrawnStudents: 0, marketingPosts: 4,
      curriculumChecks: 2, reading: 5, exercise: 3, carriedForward: 1,
    })
  })

  it('filters multi-persona work inclusively and reports daily completion fractions', () => {
    const tasks = [task('shared', '2026-08-24', 'marketing_post', ['director', 'marketing'])]
    const summary = buildMonthlySummary(tasks, [], [], '2026-08', 'marketing')

    expect(summary.days.find(({ day }) => day === '2026-08-24')).toMatchObject({ completed: 1, total: 1 })
    expect(summary.metrics.marketingPosts).toBe(1)
  })
})
