export interface TaskStep { id: string; title: string; minutes: number }

export function breakIntoSteps(title: string): TaskStep[] {
  const subject = title.replace(/\s*(작성|하기)\s*$/, '').trim()
  if (/보고서/.test(title)) {
    return [
      { id: 'open', title: `${subject} 파일 열기`, minutes: 2 },
      { id: 'outline', title: '목차 3개 적기', minutes: 5 },
      { id: 'draft', title: '첫 문단 작성하기', minutes: 10 },
      { id: 'review', title: '검토하고 제출하기', minutes: 5 },
    ]
  }
  return [
    { id: 'open', title: `${subject}에 필요한 화면 열기`, minutes: 2 },
    { id: 'first', title: '가장 작은 첫 행동 하기', minutes: 5 },
    { id: 'finish', title: '확인하고 마무리하기', minutes: 5 },
  ]
}
