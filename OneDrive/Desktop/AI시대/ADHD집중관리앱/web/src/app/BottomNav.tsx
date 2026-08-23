import { NavLink } from 'react-router-dom'

const tabs = [
  { label: '오늘', href: '/', icon: <><path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5M10 20v-6h4v6" /></> },
  { label: '월간', href: '/monthly', icon: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4m8-4v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></> },
  { label: '몽글', href: '/pet', icon: <><circle cx="7" cy="8" r="2.2" /><circle cx="12" cy="5.7" r="2.2" /><circle cx="17" cy="8" r="2.2" /><path d="M6.5 15.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5c0 2.2-1.7 3.8-4 3.8-.6 0-1.1-.2-1.5-.5-.4.3-.9.5-1.5.5-2.3 0-4-1.6-4-3.8Z" /></> },
  { label: '집중', href: '/focus', icon: <><circle cx="12" cy="12" r="7" /><path d="M12 8v4l2.5 2.5M5 4 3 6m16-2 2 2" /></> },
  { label: '나', href: '/me', icon: <><circle cx="12" cy="8" r="4" /><path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6" /></> },
] as const

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {tabs.map(({ label, href, icon }) => (
        <NavLink key={href} to={href} end={href === '/'}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
