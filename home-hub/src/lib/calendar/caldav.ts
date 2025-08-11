import { createDAVClient } from 'tsdav'
import ical from 'ical'
import { HubEvent } from './merge'

export async function getCalDavEvents(): Promise<HubEvent[]> {
  const url = process.env.ICLOUD_CALDAV_URL || 'https://caldav.icloud.com'
  const username = process.env.ICLOUD_CALDAV_USERNAME
  const password = process.env.ICLOUD_CALDAV_APP_PASSWORD

  if (!username || !password) return []

  const client = await createDAVClient({
    serverUrl: url,
    credentials: { username, password },
    authMethod: 'Basic',
    defaultAccountType: 'caldav',
  })

  const calendars = await client.fetchCalendars()
  if (!calendars?.length) return []

  // Query a time window (now → +24h). Adjust as needed.
  const start = new Date()
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)

  const all: HubEvent[] = []
  for (const cal of calendars) {
    const objects = await client.fetchCalendarObjects({
      calendar: cal,
      timeRange: { start, end },
    })

    for (const obj of objects || []) {
      const ics = typeof obj.data === 'string' ? obj.data : new TextDecoder().decode(obj.data)
      const parsed = ical.parseICS(ics)
      for (const key of Object.keys(parsed)) {
        const ev: any = parsed[key]
        if (ev?.type === 'VEVENT' && ev.start && ev.end) {
          all.push({
            id: ev.uid || `${obj.url}-${ev.start?.toISOString?.() || ''}`,
            title: ev.summary || 'Event',
            start: new Date(ev.start).toISOString(),
            end: new Date(ev.end).toISOString(),
            location: ev.location || undefined,
            allDay: Boolean(ev.datetype === 'date' || ev['x-microsoft-cdo-alldayevent'] === 'TRUE'),
          })
        }
      }
    }
  }

  // Sort by start
  return all.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}