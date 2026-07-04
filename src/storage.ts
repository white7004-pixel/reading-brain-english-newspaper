import type { Exam } from './types'

const KEY = 'reading-brain-exams-v1'

export function loadExams(): Exam[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveExams(exams: Exam[]): void {
  localStorage.setItem(KEY, JSON.stringify(exams))
}

export function exportJson(exams: Exam[]): void {
  const blob = new Blob([JSON.stringify(exams, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reading-brain-exams-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importJson(file: File): Promise<Exam[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result))
        if (!Array.isArray(data)) throw new Error('형식이 올바르지 않습니다')
        resolve(data as Exam[])
      } catch (e) {
        reject(e)
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
