import type { CSSProperties } from 'react'
import type { AppearanceSettings, BuiltInBackground } from '../../core/model/appearance'
import { backgroundPresets } from './backgroundPresets'
import './appearance.css'

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

export function AppBackground({ settings, assetUrl }: { settings: AppearanceSettings; assetUrl: string | null }) {
  const personal = settings.background.kind !== 'preset' && Boolean(assetUrl)
  const preset: BuiltInBackground = settings.background.kind === 'preset'
    ? settings.background.preset
    : 'studio_purple'
  const style = personal ? {
    backgroundImage: `url(${assetUrl})`,
    '--appearance-brightness': clamp(settings.brightness, 0.45, 1).toString(),
    '--appearance-blur': `${clamp(settings.blur, 0, 8)}px`,
  } as CSSProperties : undefined

  return (
    <div
      className={`appearance-background ${personal ? 'appearance-bg--personal' : backgroundPresets[preset].className}`}
      data-background={personal ? settings.background.kind : preset}
      data-testid="app-background"
      style={style}
      aria-hidden="true"
    >
      <div
        className="appearance-background__overlay"
        data-testid="app-background-overlay"
        style={{ opacity: clamp(settings.violetOverlay, 0.2, 0.75) }}
      />
    </div>
  )
}
