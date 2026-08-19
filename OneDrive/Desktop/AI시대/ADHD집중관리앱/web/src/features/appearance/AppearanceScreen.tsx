import { useState } from 'react'
import type { AppearanceSettings, AppearanceTarget, CharacterPreset, PhotoAsset, CharacterRender, BuiltInBackground } from '../../core/model/appearance'
import { createDatabase } from '../../core/storage/database'
import { composeCharacter } from './composeCharacter'
import { normalizePhoto, type NormalizedPhoto } from './normalizePhoto'
import { createPersonSegmenter } from './personSegmenter'
import { createAppearanceRepository, defaultAppearanceSettings } from './appearanceRepository'
import { photoErrorMessage } from './photoValidation'
import { backgroundPresets } from './backgroundPresets'
import { AppearancePreview } from './AppearancePreview'

export type AppearanceWizardState = 'idle' | 'validating' | 'previewing' | 'segmenting' | 'composing' | 'saving' | 'applied' | 'error'

export interface AppearanceDependencies {
  normalize(file: File): Promise<NormalizedPhoto>
  processCharacter(blob: Blob, preset: CharacterPreset): Promise<Blob>
  savePhoto(asset: PhotoAsset): Promise<unknown>
  saveRender(render: CharacterRender): Promise<unknown>
  apply(settings: AppearanceSettings): Promise<unknown>
  resetAll(): Promise<unknown>
}

const repository = createAppearanceRepository(createDatabase())
const defaultDependencies: AppearanceDependencies = {
  normalize: normalizePhoto,
  async processCharacter(blob, preset) {
    const bitmap = await createImageBitmap(blob)
    const segmenter = await createPersonSegmenter()
    try {
      const mask = await segmenter.segment(bitmap)
      return await composeCharacter(bitmap, mask, preset)
    } finally {
      segmenter.close()
      bitmap.close()
    }
  },
  savePhoto: repository.savePhoto,
  saveRender: repository.saveRender,
  apply: repository.apply,
  resetAll: repository.deleteAllPersonalization,
}

const presetLabels: Record<CharacterPreset, string> = {
  cloud_suit: '몽글 구름 슈트',
  studio_3d: '세련된 Studio 3D',
  lavender_figure: '부드러운 라벤더 피규어',
}

export function AppearanceScreen({ dependencies = defaultDependencies, initialTarget = 'background', onClose = () => undefined }: {
  dependencies?: AppearanceDependencies
  initialTarget?: AppearanceTarget
  onClose?: () => void
}) {
  const [state, setState] = useState<AppearanceWizardState>('idle')
  const [normalized, setNormalized] = useState<NormalizedPhoto | null>(null)
  const [mode, setMode] = useState<'photo' | 'character'>('photo')
  const [preset, setPreset] = useState<CharacterPreset>('studio_3d')
  const [target, setTarget] = useState<AppearanceTarget>(initialTarget)
  const [error, setError] = useState('')

  const chooseFile = async (file?: File) => {
    if (!file) return
    setState('validating')
    setError('')
    try {
      setNormalized(await dependencies.normalize(file))
      setState('previewing')
    } catch (caught) {
      const reason = (caught as { reason?: 'unsupported_type' | 'too_large' }).reason
      setError(reason ? photoErrorMessage(reason) : '사진을 불러오지 못했어요. 다른 사진으로 다시 시도해 주세요.')
      setState('error')
    }
  }

  const applyPersonal = async () => {
    if (!normalized) return
    setError('')
    try {
      const photoId = crypto.randomUUID()
      await dependencies.savePhoto({ id: photoId, ...normalized, createdAt: new Date().toISOString() })
      let assetId = photoId
      if (mode === 'character') {
        setState('segmenting')
        const blob = await dependencies.processCharacter(normalized.blob, preset)
        setState('composing')
        assetId = crypto.randomUUID()
        await dependencies.saveRender({ id: assetId, sourcePhotoId: photoId, preset, blob, createdAt: new Date().toISOString() })
      }
      setState('saving')
      const source = { kind: mode, assetId } as const
      await dependencies.apply({
        ...defaultAppearanceSettings,
        background: target === 'profile' ? defaultAppearanceSettings.background : source,
        profile: target === 'background' ? defaultAppearanceSettings.profile : source,
      })
      setState('applied')
      window.dispatchEvent(new Event('monggle:appearance-changed'))
      onClose()
    } catch (caught) {
      const name = (caught as Error).name
      setError(name === 'PersonNotFoundError' ? '사람을 찾지 못했어요. 얼굴과 상반신이 잘 보이는 사진을 골라 주세요.' : '기기 안에서 처리하지 못했어요. 기본 몽글이는 그대로 유지됩니다.')
      setState('error')
    }
  }

  const applyPreset = async (selected: BuiltInBackground) => {
    setState('saving')
    await dependencies.apply({ ...defaultAppearanceSettings, background: { kind: 'preset', preset: selected } })
    window.dispatchEvent(new Event('monggle:appearance-changed'))
    setState('applied')
    onClose()
  }

  const reset = async () => {
    if (!window.confirm('개인 사진과 만든 캐릭터를 모두 삭제할까요?')) return
    await dependencies.resetAll()
    window.dispatchEvent(new Event('monggle:appearance-changed'))
    onClose()
  }

  return <section className="appearance-wizard" aria-label="배경과 캐릭터 꾸미기">
    <div className="appearance-wizard__heading"><div><span>내 스타일</span><h3>배경과 몽글이 꾸미기</h3></div><button type="button" onClick={onClose}>취소</button></div>
    <AppearancePreview blob={normalized?.blob ?? null} />
    <fieldset><legend>기본 배경 선택</legend><div className="appearance-choice-grid">{Object.entries(backgroundPresets).map(([key, item]) => <button type="button" key={key} onClick={() => void applyPreset(key as BuiltInBackground)}>{item.label}</button>)}</div></fieldset>
    <label className="appearance-upload">사진 선택<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void chooseFile(event.target.files?.[0])} /></label>
    {normalized && <>
      <fieldset><legend>사진 사용 방식</legend><label><input type="radio" name="photo-mode" checked={mode === 'photo'} onChange={() => setMode('photo')} /> 원본 사진</label><label><input type="radio" name="photo-mode" aria-label="몽글 캐릭터" checked={mode === 'character'} onChange={() => setMode('character')} /> 몽글 캐릭터</label></fieldset>
      {mode === 'character' && <fieldset><legend>캐릭터 스타일</legend>{(Object.keys(presetLabels) as CharacterPreset[]).map((key) => <label key={key}><input type="radio" name="character-preset" aria-label={presetLabels[key]} checked={preset === key} onChange={() => setPreset(key)} /> {presetLabels[key]}</label>)}</fieldset>}
      <fieldset><legend>적용 위치</legend><label><input type="radio" name="target" checked={target === 'background'} onChange={() => setTarget('background')} /> 배경</label><label><input type="radio" name="target" checked={target === 'profile'} onChange={() => setTarget('profile')} /> 프로필</label><label><input type="radio" name="target" checked={target === 'both'} onChange={() => setTarget('both')} /> 배경과 프로필 모두</label></fieldset>
      <button className="primary" type="button" disabled={['segmenting', 'composing', 'saving'].includes(state)} onClick={() => void applyPersonal()}>적용하기</button>
    </>}
    <p className="appearance-privacy">사진과 얼굴 정보는 이 기기 밖으로 전송되지 않아요.</p>
    {state !== 'idle' && state !== 'previewing' && <p role="status">{state === 'validating' ? '사진 확인 중…' : state === 'segmenting' ? '기기 안에서 인물 찾는 중…' : state === 'composing' ? '몽글 캐릭터 만드는 중…' : state === 'saving' ? '안전하게 저장 중…' : state === 'applied' ? '적용했어요.' : error}</p>}
    <button className="danger-link" type="button" onClick={() => void reset()}>개인 사진 모두 삭제</button>
  </section>
}
