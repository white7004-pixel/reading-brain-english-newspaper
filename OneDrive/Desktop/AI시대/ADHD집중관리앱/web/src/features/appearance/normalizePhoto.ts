import { validatePhoto, type AcceptedPhotoType, type PhotoValidationReason } from './photoValidation'

export interface NormalizedPhoto {
  blob: Blob
  mimeType: AcceptedPhotoType
  width: number
  height: number
}

export class InvalidPhotoError extends Error {
  constructor(public readonly reason: PhotoValidationReason) {
    super(reason)
    this.name = 'InvalidPhotoError'
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: AcceptedPhotoType) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('사진을 변환할 수 없어요.')),
      type,
      type === 'image/jpeg' || type === 'image/webp' ? 0.9 : undefined,
    )
  })
}

export async function normalizePhoto(file: File, maxEdge = 2048): Promise<NormalizedPhoto> {
  const validation = validatePhoto(file)
  if (!validation.ok) throw new InvalidPhotoError(validation.reason)

  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) throw new Error('사진 처리 화면을 만들 수 없어요.')
    context.drawImage(bitmap, 0, 0, width, height)
    const mimeType = file.type as AcceptedPhotoType
    const blob = await canvasToBlob(canvas, mimeType)
    canvas.width = 0
    canvas.height = 0
    return { blob, mimeType, width, height }
  } finally {
    bitmap.close()
  }
}
