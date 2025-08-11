'use client'
import useSWR from 'swr'
const fetcher = (u:string)=>fetch(u).then(r=>r.json())

export default function CalendarView({ compact=false }: { compact?: boolean }){
  const { data } = useSWR('/api/calendar/sync', fetcher, { refreshInterval: 60000 })
  const events = data?.events || []
  return (
    <div className="space-y-3">
      {events.slice(0, compact? 6 : 20).map((e:any)=> (
        <div key={e.id} className="flex gap-3 items-center">
          <div className="text-sm opacity-70 w-40">{new Date(e.start).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}–{new Date(e.end).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
          <div className="text-lg">{e.title}</div>
        </div>
      ))}
      {!events.length && <div>No upcoming events.</div>}
    </div>
  )
}