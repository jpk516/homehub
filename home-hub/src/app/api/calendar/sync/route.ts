import { mergeEvents, HubEvent } from '@/lib/calendar/merge'
import { getCalDavEvents } from '@/lib/calendar/caldav'

async function google(): Promise<HubEvent[]> { return [] } // wire later
async function microsoft(): Promise<HubEvent[]> { return [] } // wire later

export async function GET(){
  const [caldavEvents, gEvents, mEvents] = await Promise.all([
    getCalDavEvents().catch(()=>[]),
    google().catch(()=>[]),
    microsoft().catch(()=>[])
  ])

  const merged = mergeEvents(caldavEvents, gEvents, mEvents)

  // Fallback demo event if empty, so the UI isn’t blank in dev
  const events = merged.length ? merged : [
    { id: 'demo1', title: 'Sample Event', start: new Date(Date.now()+30*60*1000).toISOString(), end: new Date(Date.now()+90*60*1000).toISOString() }
  ]

  return Response.json({ events })
}