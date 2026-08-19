import { afterEach, expect, it, vi } from 'vitest'
import type { CharacterPreset } from '../../core/model/appearance'
import { composeCharacter } from './composeCharacter'

afterEach(() => vi.restoreAllMocks())

it.each(['cloud_suit', 'studio_3d', 'lavender_figure'] as CharacterPreset[])('composes %s without network calls', async (preset) => {
  const context = {
    clearRect: vi.fn(), fillRect: vi.fn(), drawImage: vi.fn(), putImageData: vi.fn(),
    save: vi.fn(), restore: vi.fn(), beginPath: vi.fn(), arc: vi.fn(), ellipse: vi.fn(), fill: vi.fn(),
    createLinearGradient: () => ({ addColorStop: vi.fn() }),
    globalCompositeOperation: 'source-over', fillStyle: '', filter: '', globalAlpha: 1,
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D)
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => callback(new Blob(['character'], { type: 'image/webp' })))
  const fetchSpy = vi.spyOn(globalThis, 'fetch')
  const source = { width: 320, height: 480 } as CanvasImageSource
  const mask = new ImageData(320, 480)

  const blob = await composeCharacter(source, mask, preset)

  expect(blob.type).toBe('image/webp')
  expect(fetchSpy).not.toHaveBeenCalled()
  expect(context.drawImage).toHaveBeenCalled()
})
