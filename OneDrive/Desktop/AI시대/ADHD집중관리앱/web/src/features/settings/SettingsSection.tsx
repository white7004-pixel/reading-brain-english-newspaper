import type { ReactNode } from 'react'

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="settings-section" role="group" aria-label={title}>
    <h3>{title}</h3><div className="settings-section__body">{children}</div>
  </section>
}
