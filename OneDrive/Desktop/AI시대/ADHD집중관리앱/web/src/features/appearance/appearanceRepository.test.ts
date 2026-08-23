import 'fake-indexeddb/auto'
import { afterEach, beforeEach, expect, it } from 'vitest'
import type { AppearanceSettings, CharacterRender, PhotoAsset } from '../../core/model/appearance'
import { createDatabase, type MonggleDatabase } from '../../core/storage/database'
import { createAppearanceRepository, defaultAppearanceSettings } from './appearanceRepository'

let database: MonggleDatabase

beforeEach(() => { database = createDatabase(`appearance-test-${crypto.randomUUID()}`) })
afterEach(() => database.delete())

const photo: PhotoAsset = {
  id: 'photo-1', blob: new Blob(['photo'], { type: 'image/webp' }), mimeType: 'image/webp',
  width: 1024, height: 768, createdAt: '2026-08-20T00:00:00.000Z',
}
const render: CharacterRender = {
  id: 'render-1', sourcePhotoId: photo.id, preset: 'studio_3d',
  blob: new Blob(['render'], { type: 'image/webp' }), createdAt: '2026-08-20T00:01:00.000Z',
}
const personalSettings: AppearanceSettings = {
  key: 'main', background: { kind: 'character', assetId: render.id },
  profile: { kind: 'character', assetId: render.id }, brightness: 0.8, blur: 4, violetOverlay: 0.45,
}

it('starts with default Monggle and Studio purple', async () => {
  const repository = createAppearanceRepository(database)
  expect(await repository.loadSettings()).toEqual(defaultAppearanceSettings)
})

it('stores photo and render blobs locally', async () => {
  const repository = createAppearanceRepository(database)
  await repository.savePhoto(photo)
  await repository.saveRender(render)
  expect(await database.photoAssets.get(photo.id)).toMatchObject({ id: photo.id, width: 1024 })
  expect(await database.characterRenders.get(render.id)).toMatchObject({ sourcePhotoId: photo.id, preset: 'studio_3d' })
})

it('deletes personal blobs and atomically restores defaults', async () => {
  const repository = createAppearanceRepository(database)
  await repository.savePhoto(photo)
  await repository.saveRender(render)
  await repository.apply(personalSettings)
  await repository.deleteAllPersonalization()
  expect(await database.photoAssets.count()).toBe(0)
  expect(await database.characterRenders.count()).toBe(0)
  expect(await repository.loadSettings()).toEqual(defaultAppearanceSettings)
})
