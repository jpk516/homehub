'use client'
import useSWR from 'swr'

export default function ChecklistView(){
  const fetcher = (u:string)=>fetch(u).then(r=>r.json())
  const { data, mutate } = useSWR('/api/checklists', fetcher)
  const items = data?.items || []

  const toggle = async (id:string)=>{
    await fetch('/api/checklists', { method:'PATCH', body: JSON.stringify({ id }) })
    mutate()
  }

  return (
    <div className="space-y-3">
      {items.map((it:any)=> (
        <label key={it.id} className="flex gap-3 items-center">
          <input type="checkbox" checked={it.done} onChange={()=>toggle(it.id)} className="w-6 h-6" />
          <span className="text-xl">{it.title}</span>
        </label>
      ))}
      {!items.length && <div>No items for today yet.</div>}
    </div>
  )
}