export type CharacterPreset = 'cloud_suit' | 'studio_3d' | 'lavender_figure'

export type BuiltInBackground = 'studio_purple' | 'lavender_glass' | 'night_sky' | 'calm_desk'

export type AppearanceTarget = 'background' | 'profile' | 'both'

export interface PhotoAsset {
  id: string
  blob: Blob
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp'
  width: number
  height: number
  createdAt: string
}

export interface CharacterRender {
  id: string
  sourcePhotoId: string
  preset: CharacterPreset
  blob: Blob
  createdAt: string
}

export type BackgroundSource =
  | { kind: 'preset'; preset: BuiltInBackground }
  | { kind: 'photo' | 'character'; assetId: string }

export type ProfileSource =
  | { kind: 'default_monggle' }
  | { kind: 'photo' | 'character'; assetId: string }

export interface AppearanceSettings {
  key: 'main'
  background: BackgroundSource
  profile: ProfileSource
  brightness: number
  blur: number
  violetOverlay: number
}
