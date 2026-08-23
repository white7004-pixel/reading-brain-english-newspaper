import type { ImageSource } from '@mediapipe/tasks-vision'

interface ConfidenceMask {
  width: number
  height: number
  getAsFloat32Array(): Float32Array
  close(): void
}

interface SegmenterInstance {
  segment(source: ImageSource): { confidenceMasks?: ConfidenceMask[] }
  close(): void
}

interface VisionRuntime {
  FilesetResolver: { forVisionTasks(path: string): Promise<unknown> }
  ImageSegmenter: {
    createFromOptions(fileset: unknown, options: object): Promise<SegmenterInstance>
  }
}

export class PersonNotFoundError extends Error {
  constructor() {
    super('사진에서 사람을 찾지 못했어요.')
    this.name = 'PersonNotFoundError'
  }
}

export class SegmenterModelLoadError extends Error {
  constructor(cause?: unknown) {
    super('기기 안의 인물 분리 모델을 불러오지 못했어요.', { cause })
    this.name = 'SegmenterModelLoadError'
  }
}

export async function createPersonSegmenter(injectedRuntime?: VisionRuntime) {
  try {
    const runtime = injectedRuntime ?? await import('@mediapipe/tasks-vision') as unknown as VisionRuntime
    const fileset = await runtime.FilesetResolver.forVisionTasks('/mediapipe/wasm')
    const segmenter = await runtime.ImageSegmenter.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: '/models/selfie_segmenter.tflite' },
      runningMode: 'IMAGE',
      outputConfidenceMasks: true,
      outputCategoryMask: false,
    })
    return {
      async segment(source: unknown) {
        const result = segmenter.segment(source as ImageSource)
        const mask = result.confidenceMasks?.[0]
        if (!mask) throw new PersonNotFoundError()
        try {
          const confidence = mask.getAsFloat32Array()
          let highest = 0
          const pixels = new Uint8ClampedArray(confidence.length * 4)
          for (let index = 0; index < confidence.length; index += 1) {
            const value = Math.max(0, Math.min(1, confidence[index]))
            highest = Math.max(highest, value)
            const offset = index * 4
            pixels[offset] = 255
            pixels[offset + 1] = 255
            pixels[offset + 2] = 255
            pixels[offset + 3] = Math.round(value * 255)
          }
          if (highest < 0.15) throw new PersonNotFoundError()
          return new ImageData(pixels, mask.width, mask.height)
        } finally {
          mask.close()
        }
      },
      close: () => segmenter.close(),
    }
  } catch (error) {
    if (error instanceof PersonNotFoundError) throw error
    throw new SegmenterModelLoadError(error)
  }
}
