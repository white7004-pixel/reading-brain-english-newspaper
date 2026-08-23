export type CompanionMode = 'resting' | 'wandering' | 'reacting' | 'hidden'
export type SafePoint = 'top-right' | 'middle-left' | 'bottom-right'

const safePoints: SafePoint[] = ['top-right', 'middle-left', 'bottom-right']

export function nextSafePoint(current: SafePoint): SafePoint {
  return safePoints[(safePoints.indexOf(current) + 1) % safePoints.length]
}

export function deriveCompanionMode(mascotVisible: boolean, reducedMotion: boolean, reacting: boolean): CompanionMode {
  if (!mascotVisible) return 'hidden'
  if (reacting) return 'reacting'
  if (reducedMotion) return 'resting'
  return 'wandering'
}
