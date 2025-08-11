import { mergeEvents, HubEvent } from '@/lib/calendar/merge'

async function google(): Promise<HubEvent[]> { return [] }
async function microsoft(): Promise<HubEvent[]> { return [] }
async function caldav(): Promise<HubEvent[]> { return [] }

export async function GET(){
  // TODO: fill provider fetchers; return static demo for now
  const now = new Date();
  const events: HubEvent[] = [
    { id: 'demo1', title: 'Sample Event', start: new Date(now.getTime()+30*60*1000).toISOString(), end: new Date(now.getTime()+90*60*1000).toISOString() }
  ]
  return Response.json({ events })
}