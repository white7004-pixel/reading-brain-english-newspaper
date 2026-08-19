const tabs = [
  ['오늘', '/'],
  ['집중', '/focus'],
  ['메시지', '/messages'],
  ['루틴', '/routines'],
  ['설정', '/settings'],
] as const

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {tabs.map(([label, href], index) => (
        <a key={href} href={href} aria-current={index === 0 ? 'page' : undefined}>{label}</a>
      ))}
    </nav>
  )
}
