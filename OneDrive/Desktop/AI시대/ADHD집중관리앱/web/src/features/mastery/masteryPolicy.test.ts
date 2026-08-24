import { describe, expect, it } from 'vitest'
import { stageFor, stageLabel } from './masteryPolicy'

describe('persona mastery policy', () => {
  it.each([
    [0, 1], [4, 1],
    [5, 2], [14, 2],
    [15, 3], [29, 3],
    [30, 4], [59, 4],
    [60, 5], [99, 5],
    [100, 6], [500, 6],
  ] as const)('maps %i completions to stage %i', (completions, expected) => {
    expect(stageFor(completions)).toBe(expected)
  })

  it('uses the six default labels in stage order', () => {
    expect([1, 2, 3, 4, 5, 6].map((stage) => stageLabel(stage as 1 | 2 | 3 | 4 | 5 | 6)))
      .toEqual(['입문', '실무', '숙련', '전문', '리더', '마스터'])
  })

  it('uses a non-empty custom label at the matching stage and falls back for blank or missing entries', () => {
    const customLabels = ['첫걸음', '', '  ', '전문가']

    expect(stageLabel(1, customLabels)).toBe('첫걸음')
    expect(stageLabel(2, customLabels)).toBe('실무')
    expect(stageLabel(3, customLabels)).toBe('숙련')
    expect(stageLabel(4, customLabels)).toBe('전문가')
    expect(stageLabel(6, customLabels)).toBe('마스터')
  })
})
