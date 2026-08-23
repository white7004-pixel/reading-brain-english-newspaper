import type { RecurringTaskTemplate } from '../../core/model/recurrence'

const daily = { kind: 'daily' } as const

export const DEFAULT_RECURRING_TEMPLATES: RecurringTaskTemplate[] = [
  { id: 'inbox-calendar-review', title: '카카오톡·카카오워크·구글 캘린더 새 일정 확인', personaIds: ['director'], category: 'operations', cadence: daily, targetCount: 1, estimateMinutes: 10, firstAction: '새 메시지부터 확인', carryForward: false, active: true },
  { id: 'naver-place-inquiry', title: '네이버 플레이스 상담 확인', personaIds: ['counseling'], category: 'counseling', cadence: daily, targetCount: 1, estimateMinutes: 10, firstAction: '새 문의 열기', carryForward: false, active: true },
  { id: 'parent-counseling', title: '학부모 상담 1건', personaIds: ['counseling'], category: 'counseling', cadence: daily, targetCount: 1, estimateMinutes: 20, firstAction: '상담 대상 정하기', carryForward: false, active: true },
  { id: 'student-counseling', title: '학생 상담 1건', personaIds: ['counseling'], category: 'counseling', cadence: daily, targetCount: 1, estimateMinutes: 15, firstAction: '학생 상태 확인', carryForward: false, active: true },
  { id: 'student-movement', title: '신입생·퇴원생 현황 체크', personaIds: ['education'], category: 'operations', cadence: daily, targetCount: 1, estimateMinutes: 10, firstAction: '변동 명단 보기', carryForward: false, active: true },
  { id: 'marketing-reactions', title: '마케팅 문의·반응 확인', personaIds: ['marketing'], category: 'marketing', cadence: daily, targetCount: 1, estimateMinutes: 10, firstAction: '반응 지표 열기', carryForward: false, active: true },
  { id: 'today-schedule', title: '오늘 일정·약속 확인', personaIds: ['director', 'personal'], category: 'gathering_personal', cadence: daily, targetCount: 1, estimateMinutes: 5, firstAction: '오늘 일정 훑기', carryForward: false, active: true },
  { id: 'unresolved-review', title: '미해결 업무 마감 점검', personaIds: ['director'], category: 'operations', cadence: daily, targetCount: 1, estimateMinutes: 10, firstAction: '남은 일 하나 정리', carryForward: false, active: true },
  { id: 'teacher-meetings', title: '교사 미팅 2건', personaIds: ['education'], category: 'curriculum', cadence: { kind: 'weekly', weekdays: [2, 4] }, targetCount: 2, estimateMinutes: 40, firstAction: '미팅할 교사 정하기', carryForward: true, active: true },
  { id: 'curriculum-review', title: '커리큘럼 운영 점검', personaIds: ['education'], category: 'curriculum', cadence: { kind: 'weekly', weekdays: [3] }, targetCount: 1, estimateMinutes: 30, firstAction: '이번 주 수업 보기', carryForward: true, active: true },
  { id: 'marketing-channel-review', title: '마케팅 채널 점검', personaIds: ['marketing'], category: 'marketing', cadence: { kind: 'weekly', weekdays: [5] }, targetCount: 1, estimateMinutes: 20, firstAction: '채널 반응 확인', carryForward: false, active: true },
  { id: 'monthly-planning', title: '월간 운영 계획', personaIds: ['director'], category: 'operations', cadence: { kind: 'monthly', timing: 'first_business_day' }, targetCount: 1, estimateMinutes: 45, firstAction: '이번 달 목표 적기', carryForward: true, active: true },
  { id: 'mid-month-review', title: '월중 운영 점검', personaIds: ['director'], category: 'operations', cadence: { kind: 'monthly', timing: 'mid_month' }, targetCount: 1, estimateMinutes: 30, firstAction: '중간 지표 확인', carryForward: true, active: true },
  { id: 'monthly-closing', title: '월말 운영 마감', personaIds: ['director'], category: 'operations', cadence: { kind: 'monthly', timing: 'last_business_day' }, targetCount: 1, estimateMinutes: 45, firstAction: '마감 자료 모으기', carryForward: true, active: true },
]
