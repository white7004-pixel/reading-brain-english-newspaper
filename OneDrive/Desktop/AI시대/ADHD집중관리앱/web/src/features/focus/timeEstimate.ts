export function personalEstimate(records: number[]): number | null {
  if (records.length < 3) return null
  const [a, b, c] = records.slice(-3)
  return Math.round(a * 0.25 + b * 0.35 + c * 0.4)
}
