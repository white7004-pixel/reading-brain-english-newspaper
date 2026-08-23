import { useEffect, useState } from 'react'
import { deriveCompanionMode, nextSafePoint, type SafePoint } from './companionState'
import './companion.css'
import { masteryMessage, type CoachStage } from '../nudges/taskMastery'

export interface CompanionReaction {
  id: string
  type: string
}

interface MonggleCompanionProps {
  reducedMotion: boolean
  mascotVisible: boolean
  event: CompanionReaction | null
  sourceUrl?: string | null
  intensity?: CoachStage
  suppressed?: boolean
}

export function MonggleCompanion({ reducedMotion, mascotVisible, event, sourceUrl = null, intensity = 'gentle', suppressed = false }: MonggleCompanionProps) {
  const [systemReducedMotion, setSystemReducedMotion] = useState(() => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const mode = deriveCompanionMode(mascotVisible, reducedMotion || systemReducedMotion, event !== null)
  const [point, setPoint] = useState<SafePoint>('bottom-right')

  useEffect(() => {
    const query = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return
    const update = () => setSystemReducedMotion(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (mode !== 'wandering') return
    const timer = window.setInterval(() => setPoint(nextSafePoint), 23_000)
    return () => window.clearInterval(timer)
  }, [mode])

  if (mode === 'hidden') return null
  return <>
    <div className="monggle-companion" data-testid="monggle-companion" data-mode={mode} data-point={point} data-source={sourceUrl ? 'personal' : 'default'} data-intensity={intensity} aria-hidden="true" inert>
      <span className="monggle-aura" />
      <img src={sourceUrl ?? '/assets/mascot/monggle-3d-approved-v1.png'} alt="" />
    </div>
    {intensity !== 'gentle' && <div
      className="monggle-companion__message"
      data-intensity={intensity}
      role={suppressed ? undefined : 'status'}
      aria-live={suppressed ? 'off' : 'polite'}
    >{masteryMessage(intensity)}</div>}
  </>
}
