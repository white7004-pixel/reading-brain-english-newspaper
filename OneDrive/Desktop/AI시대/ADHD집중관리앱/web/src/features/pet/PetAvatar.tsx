import './pet.css'

export type PetMood = 'calm' | 'happy' | 'celebrating'

interface PetAvatarProps {
  level: number
  mood: PetMood
  reducedMotion?: boolean
  label?: string
}

const moodLabels: Record<PetMood, string> = {
  calm: '편안한 반려동물',
  happy: '기분 좋은 반려동물',
  celebrating: '기뻐하는 반려동물',
}

function PetFace({ mood }: { mood: PetMood }) {
  if (mood === 'calm') {
    return <g className="pet-avatar__face">
      <path d="M83 105q9 7 18 0" />
      <path d="M139 105q9 7 18 0" />
      <path d="M111 124q9 5 18 0" />
    </g>
  }

  if (mood === 'celebrating') {
    return <g className="pet-avatar__face">
      <path d="m82 102 10 8 10-9" />
      <path d="m138 101 10 9 10-8" />
      <path className="pet-avatar__mouth-fill" d="M108 122q12-8 24 0-1 22-12 22t-12-22Z" />
    </g>
  }

  return <g className="pet-avatar__face">
    <path d="M81 108q10-14 21 0" />
    <path d="M138 108q10-14 21 0" />
    <path d="M109 122q11 14 22 0" />
  </g>
}

export function PetAvatar({ level, mood, reducedMotion = false, label }: PetAvatarProps) {
  return <span
    className="pet-avatar"
    data-level={Math.max(1, level)}
    data-mood={mood}
    data-reduced-motion={reducedMotion || undefined}
    role="img"
    aria-label={label ?? moodLabels[mood]}
  >
    <svg viewBox="0 0 240 220" aria-hidden="true" focusable="false">
      <ellipse className="pet-avatar__ground" cx="120" cy="191" rx="72" ry="17" />
      <path className="pet-avatar__tuft" d="M105 51c-2-15 8-26 20-31-1 12 7 18 15 24-13-1-22 2-35 7Z" />
      <path className="pet-avatar__body" d="M48 123c0-51 31-88 72-88s72 37 72 88c0 47-27 77-72 77s-72-30-72-77Z" />
      <path className="pet-avatar__wing pet-avatar__wing--left" d="M53 119c-19 10-24 33-12 47 12-3 25-14 31-30" />
      <path className="pet-avatar__wing pet-avatar__wing--right" d="M187 119c19 10 24 33 12 47-12-3-25-14-31-30" />
      <ellipse className="pet-avatar__cheek" cx="75" cy="127" rx="15" ry="9" />
      <ellipse className="pet-avatar__cheek" cx="165" cy="127" rx="15" ry="9" />
      <PetFace mood={mood} />
      <path className="pet-avatar__feet" d="M90 192q-4 11-16 13m76-13q4 11 16 13" />
      {level >= 5 && <path className="pet-avatar__level-mark" d="m120 65 4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1Z" />}
    </svg>
  </span>
}
