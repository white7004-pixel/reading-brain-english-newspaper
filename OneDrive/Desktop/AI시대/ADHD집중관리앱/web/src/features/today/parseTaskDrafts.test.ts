import { describe, expect, it } from 'vitest'
import { parseTaskDrafts } from './parseTaskDrafts'

const now = new Date('2026-08-20T09:00:00+09:00')

describe('local Korean task organizer', () => {
  it('splits tasks and extracts time and sequence without a network model', () => {
    const drafts = parseTaskDrafts('오늘 영어 단어 30개 외우고 3시에 병원 갔다가 저녁에 엄마에게 문자', now)
    expect(drafts.map(({ title }) => title)).toEqual(['영어 단어 30개 외우기', '병원 방문', '엄마에게 문자'])
    expect(drafts[1].dueAt).toBe('2026-08-20T15:00:00+09:00')
    expect(drafts[2].orderAfterDraftId).toBe(drafts[1].id)
  })

  it('extracts tomorrow and an explicit morning time', () => {
    const [draft] = parseTaskDrafts('내일 오전 9시에 치과 가기', now)
    expect(draft).toMatchObject({ day: '2026-08-21', dueAt: '2026-08-21T09:00:00+09:00', needsReview: false })
  })

  it('marks ambiguous timing instead of inventing a clock time', () => {
    const [draft] = parseTaskDrafts('나중에 보고서 쓰기', now)
    expect(draft).toMatchObject({ title: '보고서 쓰기', dueAt: undefined, needsReview: true })
  })

  it('returns no drafts for blank input', () => {
    expect(parseTaskDrafts('   ', now)).toEqual([])
  })
})
