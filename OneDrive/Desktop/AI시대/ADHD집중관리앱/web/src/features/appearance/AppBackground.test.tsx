import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import type { AppearanceSettings } from '../../core/model/appearance'
import { AppBackground } from './AppBackground'
import { defaultAppearanceSettings } from './appearanceRepository'

it('uses Studio purple when there is no personal asset', () => {
  render(<AppBackground settings={defaultAppearanceSettings} assetUrl={null} />)
  expect(screen.getByTestId('app-background')).toHaveAttribute('data-background', 'studio_purple')
})

it('applies a personal URL and readable overlay controls', () => {
  const settings: AppearanceSettings = {
    ...defaultAppearanceSettings,
    background: { kind: 'photo', assetId: 'photo-1' },
    brightness: 0.8,
    blur: 4,
    violetOverlay: 0.45,
  }
  render(<AppBackground settings={settings} assetUrl="blob:photo" />)
  expect(screen.getByTestId('app-background')).toHaveStyle({ backgroundImage: 'url(blob:photo)' })
  expect(screen.getByTestId('app-background-overlay')).toHaveStyle({ opacity: '0.45' })
})

it('falls back to Studio purple if a personal asset is missing', () => {
  const settings: AppearanceSettings = {
    ...defaultAppearanceSettings,
    background: { kind: 'character', assetId: 'missing' },
  }
  render(<AppBackground settings={settings} assetUrl={null} />)
  expect(screen.getByTestId('app-background')).toHaveAttribute('data-background', 'studio_purple')
})
