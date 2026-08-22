import type { BusyBlock } from '../../core/model/calendarAvailability'

export class CalendarClient {
  constructor(private readonly baseUrl = '') {}
  status() { return this.request('/calendar/status') }
  availability(input: { timeMin: string; timeMax: string; timeZone: string }) {
    return this.request<{ accountId: string; timeZone: string; busy: BusyBlock[]; fetchedAt: string }>('/calendar/availability', { method: 'POST', body: JSON.stringify(input), headers: { 'content-type': 'application/json' } })
  }
  disconnect() { return this.request('/calendar/connection', { method: 'DELETE' }) }
  connectUrl() { return `${this.baseUrl}/oauth/google/start` }
  private async request<T = unknown>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, { credentials: 'include', ...init })
    if (!response.ok) throw new Error(`calendar_${response.status}`)
    return response.json() as Promise<T>
  }
}
