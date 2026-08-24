export type MasteryStage = 1 | 2 | 3 | 4 | 5 | 6

const DEFAULT_STAGE_LABELS: Record<MasteryStage, string> = {
  1: '입문',
  2: '실무',
  3: '숙련',
  4: '전문',
  5: '리더',
  6: '마스터',
}

export function stageFor(completions: number): MasteryStage {
  if (completions >= 100) return 6
  if (completions >= 60) return 5
  if (completions >= 30) return 4
  if (completions >= 15) return 3
  if (completions >= 5) return 2
  return 1
}

export function stageLabel(stage: MasteryStage, customLabels?: string[]) {
  const custom = customLabels?.[stage - 1]?.trim()
  return custom || DEFAULT_STAGE_LABELS[stage]
}
