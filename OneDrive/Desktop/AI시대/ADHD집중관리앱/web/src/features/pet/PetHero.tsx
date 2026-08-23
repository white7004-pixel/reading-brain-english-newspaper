import type { PetGameState } from './model'
import { PetAvatar } from './PetAvatar'
import './pet.css'

interface PetHeroProps {
  state: PetGameState
}

export function PetHero({ state }: PetHeroProps) {
  const levelProgress = Math.max(0, state.xp % 100)
  return <section className="pet-hero" aria-label="3D 몽글 코치" style={{ minHeight: 200 }}>
    <div className="pet-hero__portrait" aria-hidden="true">
      <PetAvatar level={state.level} mood="happy" label={`기분 좋은 ${state.petName}`} />
    </div>
    <div className="pet-hero__status">
      <p className="pet-hero__eyebrow">오늘도 같이 한 걸음</p>
      <h2>{state.petName}</h2>
      <div className="pet-hero__summary">
        <strong>레벨 {state.level}</strong>
        <span>오늘의 하트 {state.dailyHearts}개</span>
      </div>
      <div
        className="pet-progress"
        role="progressbar"
        aria-label={`${state.petName} 성장 진행률`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={levelProgress}
        aria-valuetext={`성장 진행률 ${levelProgress}%`}
      >
        <span style={{ transform: `scaleX(${levelProgress / 100})` }} />
      </div>
    </div>
  </section>
}
