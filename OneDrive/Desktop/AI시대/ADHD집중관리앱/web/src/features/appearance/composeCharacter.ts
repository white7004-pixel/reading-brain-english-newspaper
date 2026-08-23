import type { CharacterPreset } from '../../core/model/appearance'

const presetColors: Record<CharacterPreset, { top: string; bottom: string; glow: string }> = {
  cloud_suit: { top: '#fbfaff', bottom: '#c8bde8', glow: '#ffffff' },
  studio_3d: { top: '#ded3ff', bottom: '#7863ad', glow: '#d9c9ff' },
  lavender_figure: { top: '#f0e7ff', bottom: '#a88bcf', glow: '#e8d7ff' },
}

function dimensions(source: CanvasImageSource) {
  const value = source as CanvasImageSource & { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number; videoWidth?: number; videoHeight?: number }
  return {
    width: value.naturalWidth ?? value.videoWidth ?? value.width ?? 1024,
    height: value.naturalHeight ?? value.videoHeight ?? value.height ?? 1024,
  }
}

function exportCanvas(canvas: HTMLCanvasElement, type: 'image/webp' | 'image/png') {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('캐릭터 이미지를 저장하지 못했어요.')), type, 0.9)
  })
}

export async function composeCharacter(source: CanvasImageSource, mask: ImageData, preset: CharacterPreset) {
  const sourceSize = dimensions(source)
  const outputSize = Math.min(1536, Math.max(512, Math.max(sourceSize.width, sourceSize.height)))
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const context = canvas.getContext('2d')
  if (!context) throw new Error('캐릭터 처리 화면을 만들 수 없어요.')

  const colors = presetColors[preset]
  const background = context.createLinearGradient(0, 0, outputSize, outputSize)
  background.addColorStop(0, colors.top)
  background.addColorStop(1, colors.bottom)
  context.fillStyle = background
  context.fillRect(0, 0, outputSize, outputSize)
  context.beginPath()
  context.arc(outputSize * 0.5, outputSize * 0.46, outputSize * 0.42, 0, Math.PI * 2)
  context.fillStyle = colors.glow
  context.globalAlpha = 0.42
  context.fill()
  context.globalAlpha = 1

  const personCanvas = document.createElement('canvas')
  personCanvas.width = outputSize
  personCanvas.height = outputSize
  const personContext = personCanvas.getContext('2d')
  if (!personContext) throw new Error('사진 레이어를 만들 수 없어요.')
  personContext.drawImage(source, 0, 0, outputSize, outputSize)

  const maskCanvas = document.createElement('canvas')
  maskCanvas.width = mask.width
  maskCanvas.height = mask.height
  const maskContext = maskCanvas.getContext('2d')
  if (!maskContext) throw new Error('인물 마스크를 만들 수 없어요.')
  maskContext.putImageData(mask, 0, 0)
  personContext.globalCompositeOperation = 'destination-in'
  personContext.drawImage(maskCanvas, 0, 0, outputSize, outputSize)
  personContext.globalCompositeOperation = 'source-over'
  context.drawImage(personCanvas, 0, 0)

  const rim = context.createLinearGradient(0, 0, outputSize, outputSize)
  rim.addColorStop(0, 'rgba(255,255,255,.5)')
  rim.addColorStop(1, 'rgba(185,153,255,.28)')
  context.fillStyle = rim
  context.globalCompositeOperation = 'screen'
  context.fillRect(0, 0, outputSize, outputSize)
  context.globalCompositeOperation = 'source-over'

  let blob = await exportCanvas(canvas, 'image/webp')
  if (blob.type !== 'image/webp') blob = await exportCanvas(canvas, 'image/png')
  personCanvas.width = 0
  personCanvas.height = 0
  maskCanvas.width = 0
  maskCanvas.height = 0
  canvas.width = 0
  canvas.height = 0
  return blob
}
