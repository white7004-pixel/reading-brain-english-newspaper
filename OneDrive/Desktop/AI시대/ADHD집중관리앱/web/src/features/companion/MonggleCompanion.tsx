import { useEffect, useState } from 'react'
import { deriveCompanionMode, nextSafePoint, type SafePoint } from './companionState'
import './companion.css'

export interface CompanionReaction {
  id: string
  type: string
}

interface MonggleCompanionProps {
  reducedMotion: boolean
  mascotVisible: boolean
  event: CompanionReaction | null
}

export function MonggleCompanion({ reducedMotion, mascotVisible, event }: MonggleCompanionProps) {
  const mode = deriveCompanionMode(mascotVisible, reducedMotion, event !== null)
  const [point, setPoint] = useState<SafePoint>('bottom-right')

  useEffect(() => {
    if (mode !== 'wandering') return
    const timer = window.setInterval(() => setPoint(nextSafePoint), 23_000)
    return () => window.clearInterval(timer)
  }, [mode])

  if (mode === 'hidden') return null
  return (
    <div className="monggle-companion" data-testid="monggle-companion" data-mode={mode} data-point={point} aria-hidden="true" inert>
      <span className="monggle-aura" />
      <img src="/assets/mascot/monggle-3d-approved-v1.png" alt="" />
    </div>
  )
}
