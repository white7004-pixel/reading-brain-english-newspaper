import { NavLink } from 'react-router-dom'

const tabs = [
  { label: '오늘', href: '/', icon: <><path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5M10 20v-6h4v6" /></> },
  { label: '계획', href: '/plan', icon: <><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4m8-4v4M8 11h8m-8 4h5" /></> },
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
