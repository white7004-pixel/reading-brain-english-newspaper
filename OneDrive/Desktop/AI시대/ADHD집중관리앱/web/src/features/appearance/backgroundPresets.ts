import type { BuiltInBackground } from '../../core/model/appearance'

export const backgroundPresets: Record<BuiltInBackground, { label: string; className: string }> = {
  studio_purple: { label: '스튜디오 퍼플', className: 'appearance-bg--studio-purple' },
  lavender_glass: { label: '라벤더 글라스', className: 'appearance-bg--lavender-glass' },
  night_sky: { label: '고요한 밤하늘', className: 'appearance-bg--night-sky' },
  calm_desk: { label: '차분한 데스크', className: 'appearance-bg--calm-desk' },
}
