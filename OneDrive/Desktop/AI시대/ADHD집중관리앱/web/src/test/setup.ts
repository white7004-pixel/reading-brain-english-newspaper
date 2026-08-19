import '@testing-library/jest-dom/vitest'
import 'fake-indexeddb/auto'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

if (!globalThis.ImageData) {
  class TestImageData {
    readonly colorSpace = 'srgb' as const
    readonly data: Uint8ClampedArray
    readonly width: number
    readonly height: number
    constructor(width: number, height: number)
    constructor(data: Uint8ClampedArray, width: number, height?: number)
    constructor(dataOrWidth: Uint8ClampedArray | number, widthOrHeight: number, height?: number) {
      if (typeof dataOrWidth === 'number') {
        this.width = dataOrWidth
        this.height = widthOrHeight
        this.data = new Uint8ClampedArray(this.width * this.height * 4)
      } else {
        this.data = dataOrWidth
        this.width = widthOrHeight
        this.height = height ?? dataOrWidth.length / 4 / widthOrHeight
      }
    }
  }
  Object.defineProperty(globalThis, 'ImageData', { value: TestImageData, configurable: true })
}

afterEach(cleanup)
