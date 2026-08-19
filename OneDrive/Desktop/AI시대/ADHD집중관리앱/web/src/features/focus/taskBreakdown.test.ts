import { expect, it } from 'vitest'
import { breakIntoSteps } from './taskBreakdown'

it('turns a report into small local steps without an API', () => {
  expect(breakIntoSteps('과학 보고서 작성').map((step) => step.title)).toEqual([
    '과학 보고서 파일 열기',
    '목차 3개 적기',
    '첫 문단 작성하기',
    '검토하고 제출하기',
  ])
})
