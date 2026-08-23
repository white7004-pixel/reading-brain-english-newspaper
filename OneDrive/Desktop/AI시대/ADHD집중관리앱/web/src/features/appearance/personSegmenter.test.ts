import { expect, it, vi } from 'vitest'
import { createPersonSegmenter, PersonNotFoundError } from './personSegmenter'

it('configures MediaPipe with bundled local paths', async () => {
  const close = vi.fn()
  const maskClose = vi.fn()
  const segment = vi.fn().mockReturnValue({
    confidenceMasks: [{ width: 2, height: 1, getAsFloat32Array: () => new Float32Array([0.9, 0.1]), close: maskClose }],
  })
  const forVisionTasks = vi.fn().mockResolvedValue({ files: 'local' })
  const createFromOptions = vi.fn().mockResolvedValue({ segment, close })

  const adapter = await createPersonSegmenter({
    FilesetResolver: { forVisionTasks },
    ImageSegmenter: { createFromOptions },
  })
  const result = await adapter.segment({} as CanvasImageSource)

  expect(forVisionTasks).toHaveBeenCalledWith('/mediapipe/wasm')
  expect(createFromOptions).toHaveBeenCalledWith({ files: 'local' }, expect.objectContaining({
    baseOptions: { modelAssetPath: '/models/selfie_segmenter.tflite' },
    runningMode: 'IMAGE',
    outputConfidenceMasks: true,
  }))
  expect(result).toMatchObject({ width: 2, height: 1 })
  expect(maskClose).toHaveBeenCalledOnce()
  adapter.close()
  expect(close).toHaveBeenCalledOnce()
})

it('reports a clear failure when no person confidence is present', async () => {
  const runtime = {
    FilesetResolver: { forVisionTasks: vi.fn().mockResolvedValue({}) },
    ImageSegmenter: { createFromOptions: vi.fn().mockResolvedValue({
      segment: () => ({ confidenceMasks: [{ width: 1, height: 1, getAsFloat32Array: () => new Float32Array([0.01]), close: vi.fn() }] }),
      close: vi.fn(),
    }) },
  }
  const adapter = await createPersonSegmenter(runtime)
  await expect(adapter.segment({} as CanvasImageSource)).rejects.toBeInstanceOf(PersonNotFoundError)
})
