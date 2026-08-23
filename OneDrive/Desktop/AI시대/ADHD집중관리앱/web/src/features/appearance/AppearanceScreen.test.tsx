import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { AppearanceScreen, type AppearanceDependencies } from './AppearanceScreen'

function dependencies(): AppearanceDependencies {
  return {
    normalize: vi.fn().mockResolvedValue({ blob: new Blob(['photo'], { type: 'image/webp' }), mimeType: 'image/webp', width: 800, height: 600 }),
    processCharacter: vi.fn().mockResolvedValue(new Blob(['render'], { type: 'image/webp' })),
    savePhoto: vi.fn().mockResolvedValue(undefined),
    saveRender: vi.fn().mockResolvedValue(undefined),
    apply: vi.fn().mockResolvedValue(undefined),
    resetAll: vi.fn().mockResolvedValue(undefined),
  }
}

it('does not replace the default Monggle when upload is canceled', async () => {
  const deps = dependencies()
  render(<AppearanceScreen dependencies={deps} initialTarget="profile" onClose={vi.fn()} />)
  await userEvent.upload(screen.getByLabelText('사진 선택'), new File(['x'], 'person.webp', { type: 'image/webp' }))
  await userEvent.click(screen.getByRole('button', { name: '취소' }))
  expect(deps.apply).not.toHaveBeenCalled()
})

it('applies a Studio 3D character to both targets only after confirmation', async () => {
  const deps = dependencies()
  render(<AppearanceScreen dependencies={deps} initialTarget="both" onClose={vi.fn()} />)
  await userEvent.upload(screen.getByLabelText('사진 선택'), new File(['x'], 'person.webp', { type: 'image/webp' }))
  await userEvent.click(screen.getByLabelText('몽글 캐릭터'))
  await userEvent.click(screen.getByLabelText('세련된 Studio 3D'))
  expect(deps.apply).not.toHaveBeenCalled()
  await userEvent.click(screen.getByRole('button', { name: '적용하기' }))
  expect(deps.processCharacter).toHaveBeenCalledWith(expect.any(Blob), 'studio_3d')
  expect(deps.apply).toHaveBeenCalledWith(expect.objectContaining({
    background: expect.objectContaining({ kind: 'character' }),
    profile: expect.objectContaining({ kind: 'character' }),
  }))
})
