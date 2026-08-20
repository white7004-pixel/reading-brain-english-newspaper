export const SEOUL_TIME_ZONE = 'Asia/Seoul'

export function dayInSeoul(now: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SEOUL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

export function addSeoulDays(day: string, amount: number) {
  const date = new Date(`${day}T00:00:00.000Z`)
  date.setUTCDate(date.getUTCDate() + amount)
  return date.toISOString().slice(0, 10)
}

export function startOfSeoulDay(day: string) {
  return new Date(`${day}T00:00:00+09:00`)
}

export function nextDayInSeoul(now: Date) {
  return addSeoulDays(dayInSeoul(now), 1)
}
