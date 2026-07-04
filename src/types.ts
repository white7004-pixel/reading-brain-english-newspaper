// 도메인 모델: 시험(Exam)과 문항(Question)

export const GRADES = ['중1', '중2', '중3', '고1', '고2', '고3'] as const
export type Grade = (typeof GRADES)[number]

export const EXAM_KINDS = ['1학기 중간', '1학기 기말', '2학기 중간', '2학기 기말'] as const
export type ExamKind = (typeof EXAM_KINDS)[number]

export const QUESTION_TYPES = [
  '어법',
  '어휘',
  '빈칸추론',
  '주제·제목',
  '요지·주장',
  '내용일치',
  '순서배열',
  '문장삽입',
  '흐름·무관문장',
  '지칭추론',
  '함축의미',
  '요약문',
  '대의파악(듣기·대화)',
  '영작(서술형)',
  '어법·어휘(서술형)',
  '요약·설명(서술형)',
  '기타',
] as const
export type QuestionType = (typeof QUESTION_TYPES)[number]

export const SOURCES = ['교과서', '부교재', '모의고사', '외부지문', '변형문항'] as const
export type Source = (typeof SOURCES)[number]

export const DIFFICULTIES = ['하', '중', '상'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const FORMATS = ['객관식', '서술형'] as const
export type Format = (typeof FORMATS)[number]

export interface Question {
  id: string
  number: string // 문항 번호 (예: "3", "서술형 1")
  type: QuestionType
  source: Source
  difficulty: Difficulty
  format: Format
  points: number // 배점
  note: string // 출제 포인트 메모
}

export interface Exam {
  id: string
  school: string
  grade: Grade
  year: number
  kind: ExamKind
  scope: string // 시험 범위 (교과서 단원, 부교재 등)
  questions: Question[]
  createdAt: string
  updatedAt: string
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export function emptyQuestion(number: string): Question {
  return {
    id: newId(),
    number,
    type: '빈칸추론',
    source: '교과서',
    difficulty: '중',
    format: '객관식',
    points: 4,
    note: '',
  }
}

export function examLabel(e: Exam): string {
  return `${e.year} ${e.kind}`
}
