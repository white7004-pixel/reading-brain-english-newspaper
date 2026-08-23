import type { ReactNode } from 'react'

export function SettingsRow({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return <div className="settings-row"><div><strong>{title}</strong>{description && <small>{description}</small>}</div><div className="settings-row__control">{children}</div></div>
}
