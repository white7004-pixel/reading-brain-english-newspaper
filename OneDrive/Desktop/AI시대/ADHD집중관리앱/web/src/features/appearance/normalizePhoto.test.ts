import { afterEach, expect, it, vi } from 'vitest'
import { normalizePhoto } from './normalizePhoto'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('keeps the aspect ratio, caps the long edge, and closes decoded memory', async () => {
  const close = vi.fn()
  vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue({ width: 4096, height: 2048, close }))
  const drawImage = vi.fn()
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage } as unknown as CanvasRenderingContext2D)
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback, type) => {
    callback(new Blob(['normalized'], { type }))
  })

  const result = await normalizePhoto(new File(['photo'], 'wide.jpg', { type: 'image/jpeg' }))

  expect(result).toMatchObject({ width: 2048, height: 1024, mimeType: 'image/jpeg' })
  expect(drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 2048, 1024)
  expect(close).toHaveBeenCalledOnce()
})

it('does not upscale small photos and preserves WebP output', async () => {
  const close = vi.fn()
  vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue({ width: 640, height: 480, close }))
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage: vi.fn() } as unknown as CanvasRenderingContext2D)
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback, type) => {
    callback(new Blob(['normalized'], { type }))
  })

  const result = await normalizePhoto(new File(['photo'], 'small.webp', { type: 'image/webp' }))

  expect(result).toMatchObject({ width: 640, height: 480, mimeType: 'image/webp' })
  expect(close).toHaveBeenCalledOnce()
})
