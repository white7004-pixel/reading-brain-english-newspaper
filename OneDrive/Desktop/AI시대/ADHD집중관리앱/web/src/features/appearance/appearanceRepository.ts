import type { AppearanceSettings, CharacterRender, PhotoAsset } from '../../core/model/appearance'
import type { MonggleDatabase } from '../../core/storage/database'

export const defaultAppearanceSettings: AppearanceSettings = {
  key: 'main',
  background: { kind: 'preset', preset: 'studio_purple' },
  profile: { kind: 'default_monggle' },
  brightness: 1,
  blur: 0,
  violetOverlay: 0.35,
}

function copyDefaults(): AppearanceSettings {
  return {
    ...defaultAppearanceSettings,
    background: { ...defaultAppearanceSettings.background },
    profile: { ...defaultAppearanceSettings.profile },
  }
}

export function createAppearanceRepository(database: MonggleDatabase) {
  return {
    savePhoto: (asset: PhotoAsset) => database.photoAssets.put(asset),
    saveRender: (render: CharacterRender) => database.characterRenders.put(render),
    getPhoto: (id: string) => database.photoAssets.get(id),
    getRender: (id: string) => database.characterRenders.get(id),
    async loadSettings() {
      return (await database.appearanceSettings.get('main')) ?? copyDefaults()
    },
    apply(settings: AppearanceSettings) {
      return database.appearanceSettings.put({ ...settings, key: 'main' })
    },
    deleteAllPersonalization() {
      return database.transaction(
        'rw',
        database.photoAssets,
        database.characterRenders,
        database.appearanceSettings,
        async () => {
          await database.photoAssets.clear()
          await database.characterRenders.clear()
          await database.appearanceSettings.put(copyDefaults())
        },
      )
    },
  }
}
