export const MAX_PHOTO_BYTES = 12 * 1024 * 1024

export const acceptedPhotoTypes = ['image/jpeg', 'image/png', 'image/webp'] as const
export type AcceptedPhotoType = (typeof acceptedPhotoTypes)[number]
export type PhotoValidationReason = 'unsupported_type' | 'too_large'
export type PhotoValidationResult = { ok: true } | { ok: false; reason: PhotoValidationReason }

export function validatePhoto(file: File): PhotoValidationResult {
  if (!acceptedPhotoTypes.includes(file.type as AcceptedPhotoType)) {
    return { ok: false, reason: 'unsupported_type' }
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return { ok: false, reason: 'too_large' }
  }
  return { ok: true }
}

export function photoErrorMessage(reason: PhotoValidationReason) {
  if (reason === 'too_large') return '사진은 12MB 이하로 선택해 주세요.'
  return 'JPG, PNG 또는 WebP 사진만 사용할 수 있어요.'
}
