import { useEffect, useId, useRef } from 'react'
import type { RewardGrant } from './model'
import { PetAvatar } from './PetAvatar'
import './pet.css'

interface RewardBurstProps {
  grant: RewardGrant
  onDismiss: () => void
}

const confettiPieces = Array.from({ length: 12 }, (_, index) => index)

export function RewardBurst({ grant, onDismiss }: RewardBurstProps) {
  const titleId = useId()
  const summaryId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  const restoreFocus = () => {
    if (previouslyFocusedRef.current?.isConnected) previouslyFocusedRef.current.focus()
  }

  const dismiss = () => {
    onDismiss()
    restoreFocus()
  }

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()
    return restoreFocus
  }, [])

  return <div className="reward-burst__backdrop">
    <section
      className="reward-burst"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      aria-live="polite"
      onKeyDown={event => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        event.stopPropagation()
        dismiss()
      }}
    >
      <div className="reward-burst__confetti" aria-hidden="true">
        {confettiPieces.map(piece => <i key={piece} />)}
      </div>
      <button ref={closeButtonRef} className="reward-burst__close" type="button" onClick={dismiss} aria-label="보상 화면 닫기">닫기</button>
      <PetAvatar level={1} mood="celebrating" label="보상을 기뻐하는 몽글이" />
      <p className="reward-burst__eyebrow">퀘스트 완료</p>
      <h2 id={titleId}>잘했어요!</h2>
      <p id={summaryId}>몽글이와 함께 한 뼘 더 성장했어요.</p>
      <ul className="reward-burst__rewards" aria-label="획득한 보상">
        <li><span>XP</span><strong>+{grant.xp}</strong></li>
        <li><span>코인</span><strong>+{grant.coins}</strong></li>
        {grant.food > 0 && <li><span>먹이</span><strong>+{grant.food}</strong></li>}
        {grant.hearts > 0 && <li><span>하트</span><strong>+{grant.hearts}</strong></li>}
      </ul>
      <button className="reward-burst__continue" type="button" onClick={dismiss}>계속하기</button>
    </section>
  </div>
}
